from uuid import UUID
from typing import Annotated, Sequence
from sqlalchemy.ext.asyncio import AsyncSession
from api.api_v1.check_perms_loggin import check_if_item_belongs
from fastapi import (
    APIRouter,
    status,
    Path,
    Query,
    Depends,
    HTTPException,
)
from api.dependencies.authentication.fastapi_users_ import (
    current_verified_user,
    current_superuser,
)
from core.config import settings  # type: ignore
from core.redis_helper import redis
from core.schemas.items import (
    DesktopPCCreate,
    DesktopPCFullModel,
    DesktopPCPreviewModelWithID,
    DesktopPCUpdatePartial,
)
from crud.items_crud.desktops import crud_desktop
from core.models import db_helper, User
from core.models.items import DesktopPC
from api.api_v1.items.filters.desktop_filter import (
    get_desktops_filter,
    DesktopFilterParams,
    get_desktop_attrs,
)
import orjson

user_state = current_verified_user

router = APIRouter(
    prefix=settings.api.v1.desktops,
    tags=["Desktops"],
)


@router.get(
    "/get-unique-attrs",
)
async def get_unique_desktop_attr(
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ]
):
    cached_data = await redis.get("desktop_attrs")
    if cached_data:
        return orjson.loads(cached_data)
    result = await get_desktop_attrs(
        session=session,
    )
    await redis.set(
        "desktop_attrs",
        orjson.dumps(result),
        ex=settings.redis.redis_expire,
    )
    return result


@router.post(
    "/create-desktop",
    response_model=DesktopPCCreate,
    status_code=status.HTTP_201_CREATED,
)
async def create_desktop(
    user: Annotated[
        User,
        Depends(user_state),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    model_in: DesktopPCCreate,
) -> DesktopPC:
    desktop: DesktopPC = await crud_desktop.create(
        session,
        user_id=user.id,
        data=model_in.model_dump(),
    )
    return desktop


@router.get(
    "/get-desktop-by-uuid/{uuid}",
    response_model=DesktopPCFullModel,
)
async def get_desktop_by_uuid(
    uuid: Annotated[UUID, Path],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
) -> DesktopPC | None:
    desktop: DesktopPC | None = await crud_desktop.get_by_uuid(
        session=session,
        item_uuid=uuid,
    )
    if desktop is not None:
        return desktop
    raise HTTPException(
        status_code=404,
        detail=f"Desktop {uuid} not found",
    )


@router.get(
    "/get-desktops-filtered/",
    response_model=list[DesktopPCPreviewModelWithID],
)
async def get_desktops_filtered(
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    filters: DesktopFilterParams = Depends(),
    offset: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
) -> Sequence[DesktopPC]:
    result: Sequence[DesktopPC] = await get_desktops_filter(
        session=session,
        filters=filters,
        offset=offset,
        limit=limit,
    )
    return result


@router.get(
    "/get-desktops-detail",
    response_model=list[DesktopPCFullModel],
)
async def get_desktops_detail(
    user: Annotated[
        User,
        Depends(current_superuser),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    offset: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
) -> Sequence["DesktopPC"]:
    """
    Dumps all full desktop models from DB
    available only for superuser
    :param user:
    :param session:
    :param offset:
    :param limit:
    :return:
    """
    desktops: Sequence[DesktopPC] = await crud_desktop.get_all(
        session=session,
        offset=offset,
        limit=limit,
    )
    return desktops


@router.get(
    "/get-all-desktops-preview/",
    response_model=list[DesktopPCPreviewModelWithID],
)
async def get_all_desktops_preview(
    user: Annotated[
        User,
        Depends(current_superuser),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
) -> Sequence[DesktopPC]:
    """
    Dumps all preview desktop models from DB
    available only for superuser
    :param user:
    :param session:
    :return:
    """
    desktops: Sequence[DesktopPC] = await crud_desktop.get_all(
        session=session,
    )
    return desktops


@router.get(
    "/get-desktops-preview/",
    response_model=list[DesktopPCPreviewModelWithID],
)
async def get_desktops_preview(
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    offset: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
) -> Sequence["DesktopPC"]:
    desktops: Sequence["DesktopPC"] = await crud_desktop.get_all(
        session=session,
        offset=offset,
        limit=limit,
    )
    return desktops


@router.get(
    "/get-my-desktops",
    response_model=list[DesktopPCPreviewModelWithID],
)
async def get_my_desktops(
    user: Annotated[
        User,
        Depends(user_state),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
) -> Sequence[DesktopPC]:
    desktops: Sequence[DesktopPC] = await crud_desktop.get_users(
        session=session,
        user_id=user.id,
    )
    return desktops


@router.patch(
    "/patch-desktop/{uuid}",
    response_model=DesktopPCUpdatePartial,
)
async def update_desktop_partial(
    uuid: Annotated[
        UUID,
        Path,
    ],
    monitor_update: DesktopPCUpdatePartial,
    user: Annotated[
        User,
        Depends(user_state),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
) -> DesktopPC:
    desktop: DesktopPC | None = await crud_desktop.get_by_uuid(
        session=session,
        item_uuid=uuid,
    )
    check_if_item_belongs(
        user=user,
        model=desktop,
        message="updated",
    )
    result: DesktopPC = await crud_desktop.update(
        session=session,
        model_update=monitor_update,
        model_instance=desktop,
        partial=True,
    )
    return result


@router.delete(
    "/delete-desktop/{uuid}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_desktop(
    uuid: Annotated[UUID, Path],
    user: Annotated[
        User,
        Depends(user_state),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
) -> None:
    desktop: DesktopPC = await crud_desktop.get_by_uuid(
        session=session,
        item_uuid=uuid,
    )
    check_if_item_belongs(
        user=user,
        model=desktop,
        message="deleted",
    )
    await crud_desktop.delete(
        session=session,
        model_instance=desktop,
    )
