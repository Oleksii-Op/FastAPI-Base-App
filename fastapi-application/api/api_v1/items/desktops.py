from uuid import UUID
from typing import Annotated, Sequence
from sqlalchemy.ext.asyncio import AsyncSession
from api.api_v1.check_perms_loggin import check_if_item_belongs
from fastapi import APIRouter, status, Path, Query, Depends, HTTPException
from api.dependencies.authentication.fastapi_users_ import (
    current_verified_user,
)
from core.config import settings
from core.schemas.items.desktop_pc import (
    DesktopPCCreate,
    DesktopPCFullModel,
    DesktopPCPreviewModelWithID,
    DesktopPCUpdatePartial,
    DesktopPCPreview,
)
from crud.items_crud.desktops import crud_desktop
from core.models import db_helper, User, DesktopPC


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
):
    return await crud_desktop.create(
        session,
        user_id=user.id,
        data=model_in.model_dump(),
    )


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
    desktop: DesktopPC = await crud_desktop.get_by_uuid(
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
) -> Sequence["DesktopPC"] | None:
    return await crud_desktop.get_all(
        session=session,
        offset=offset,
        limit=limit,
    )


@router.get(
    "/get-all-desktops-preview/",
    response_model=list[DesktopPCPreviewModelWithID],
)
async def get_all_desktops_preview(
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
):
    return await crud_desktop.get_all(
        session=session,
    )


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
) -> Sequence["DesktopPC"] | None:
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
) -> Sequence[DesktopPC] | None:
    return await crud_desktop.get_users(
        session=session,
        user_id=user.id,
    )


@router.patch("/patch-desktop/{uuid}")
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
):
    desktop: DesktopPC | None = await crud_desktop.get_by_uuid(
        session=session,
        item_uuid=uuid,
    )
    check_if_item_belongs(
        user=user,
        model=desktop,
        message="updated",
    )
    return await crud_desktop.update(
        session=session,
        model_update=monitor_update,
        model_instance=desktop,
        partial=True,
    )


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
