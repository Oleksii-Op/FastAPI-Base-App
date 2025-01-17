from uuid import UUID
from typing import Annotated, Sequence

from pydantic import BaseModel, Field
from sqlalchemy import func, select
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
)
from core.config import settings  # type: ignore
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
)

user_state = current_verified_user

router = APIRouter(
    prefix=settings.api.v1.desktops,
    tags=["Desktops"],
)


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


class DesktopFilterParams(BaseModel):
    price_min: float | None = None
    price_max: float | None = None
    maker: list[str] = Field(Query(default=[]))
    is_for_gaming: bool | None = None
    is_for_home_studying: bool | None = None
    is_for_office: bool | None = None
    has_screen: bool | None = None
    is_mini: bool | None = None
    # RAM
    ram_type: list[str] = Field(Query(default=[]))
    ram_frequency: list[int] = Field(Query(default=[]))
    ram_size: list[int] = Field(Query(default=[]))
    # GPU
    gpu_maker: list[str] = Field(Query(default=[]))
    gpu_model: list[str] = Field(Query(default=[]))
    # CPU
    cpu_maker: list[str] = Field(Query(default=[]))
    cpu_class: list[str] = Field(Query(default=[]))
    cpu_cores: list[int] = Field(Query(default=[]))
    # Storage
    storage_size: list[int] = Field(Query(default=[]))
    storage_type: list[str] = Field(Query(default=[]))


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
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    offset: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
) -> Sequence["DesktopPC"]:
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
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
) -> Sequence[DesktopPC]:
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


@router.get("/pc-price-range")
async def get_pc_price_range(
    session: AsyncSession = Depends(db_helper.session_getter),
) -> dict[str, float]:
    stmt = select(
        func.min(DesktopPC.price).label("min_price"),
        func.max(DesktopPC.price).label("max_price"),
    )

    result = await session.execute(stmt)
    min_price, max_price = result.one()

    return {
        "min_price": min_price,
        "max_price": max_price,
    }
