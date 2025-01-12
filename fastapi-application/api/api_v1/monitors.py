from uuid import UUID
from typing import Annotated, List, Sequence
from pydantic import BaseModel, Field
from fastapi import APIRouter, status, Path, Query, Depends, HTTPException
from sqlalchemy import select, or_, and_
from sqlalchemy.ext.asyncio import AsyncSession

from api.api_v1.check_perms_loggin import check_if_item_belongs
from api.dependencies.authentication.fastapi_users_ import (
    current_verified_user,
)
from core.config import settings
from core.models import User, Monitor
from core.schemas.monitors import (
    MonitorCreate,
    MonitorFullModel,
    MonitorPreviewWithID,
    MonitorUpdatePartial,
)
from crud.items_crud.monitors import crud_monitor as crud_monitor_class
from core.models import db_helper

user_state = current_verified_user
router = APIRouter(
    prefix=settings.api.v1.monitors,
    tags=["Monitors"],
)


@router.post(
    "/create-monitor",
    response_model=MonitorCreate,
    status_code=status.HTTP_201_CREATED,
)
async def create_monitor(
    user: Annotated[
        User,
        Depends(user_state),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    model_in: MonitorCreate,
):
    return await crud_monitor_class.create(
        session,
        user_id=user.id,
        data=model_in.model_dump(),
    )


@router.get(
    "/get-monitor-by-uuid/{uuid}",
    response_model=MonitorFullModel,
)
async def get_monitor_by_uuid(
    uuid: Annotated[UUID, Path],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
) -> Monitor | None:
    monitor: Monitor = await crud_monitor_class.get_by_uuid(
        session=session,
        item_uuid=uuid,
    )
    if monitor is not None:
        return monitor
    raise HTTPException(
        status_code=404,
        detail=f"Monitor {uuid} not found",
    )


class MonitorFilterParams(BaseModel):
    maker: list[str] = Field(Query(default=[]))
    resolution: list[str] = Field(Query(default=[]))
    panel_type: list[str] = Field(Query(default=[]))
    contrast_ratio: list[str] = Field(Query(default=[]))
    aspect_ratio: list[str] = Field(Query(default=[]))
    vesa_mounting: list[str] = Field(Query(default=[]))
    price_min: float | None = None
    price_max: float | None = None
    diagonal_min: float | None = None
    diagonal_max: float | None = None
    brightness_min: int | None = None
    brightness_max: int | None = None
    response_time_min: int | None = None
    response_time_max: int | None = None
    refresh_rate_min: int | None = None
    refresh_rate_max: int | None = None
    hdmi_connection: int | None = None
    dp_connection: int | None = None
    vga_connection: int | None = None
    usb_2: int | None = None
    usb_type_c: int | None = None
    usb_type_c_thunderbolt: int | None = None
    has_touchscreen: bool | None = None
    pivot: bool | None = None
    is_adjustable_height: bool | None = None


@router.get(
    "/get-monitors-filtered/",
    response_model=List[MonitorPreviewWithID],
)
async def get_monitors_filtered(
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    filters: MonitorFilterParams = Depends(),
    offset: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
):
    conditions = []

    range_fields = {
        "price": (filters.price_min, filters.price_max),
        "diagonal": (filters.diagonal_min, filters.diagonal_max),
        "brightness": (filters.brightness_min, filters.brightness_max),
        "response_time": (filters.response_time_min, filters.response_time_max),
        "refresh_rate": (filters.refresh_rate_min, filters.refresh_rate_max),
    }

    for field, (min_val, max_val) in range_fields.items():
        if min_val is not None and max_val is not None:
            conditions.append(getattr(Monitor, field).between(min_val, max_val))
        elif min_val is not None:
            conditions.append(getattr(Monitor, field) >= min_val)
        elif max_val is not None:
            conditions.append(getattr(Monitor, field) <= max_val)

    bool_fields = {
        "has_touchscreen": filters.has_touchscreen,
        "pivot": filters.pivot,
        "is_adjustable_height": filters.is_adjustable_height,
    }

    for field, value in bool_fields.items():
        if value is not None:
            conditions.append(getattr(Monitor, field) == value)

    exact_fields = {
        "hdmi_connection": filters.hdmi_connection,
        "dp_connection": filters.dp_connection,
        "vga_connection": filters.vga_connection,
        "usb_2": filters.usb_2,
        "usb_type_c": filters.usb_type_c,
        "usb_type_c_thunderbolt": filters.usb_type_c_thunderbolt,
    }

    for field, value in exact_fields.items():
        if value is not None:
            conditions.append(getattr(Monitor, field) == value)

    list_fields = {
        "maker": filters.maker,
        "panel_type": filters.panel_type,
        "contrast_ratio": filters.contrast_ratio,
        "aspect_ratio": filters.aspect_ratio,
        "vesa_mounting": filters.vesa_mounting,
        "resolution": filters.resolution,
    }

    for field, values in list_fields.items():
        if values:
            conditions.append(or_(*[getattr(Monitor, field) == val for val in values]))

    stmt = select(Monitor).filter(and_(*conditions)).offset(offset).limit(limit)
    result = await session.scalars(stmt)
    return result.all()


@router.get(
    "/get-monitors-detail",
    response_model=list[MonitorFullModel],
)
async def get_monitors_detail(
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    offset: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
) -> Sequence["Monitor"] | None:
    return await crud_monitor_class.get_all(
        session=session,
        offset=offset,
        limit=limit,
    )


@router.get(
    "/get-all-monitors-preview/",
    response_model=list[MonitorPreviewWithID],
)
async def get_all_monitors_preview(
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
):
    return await crud_monitor_class.get_all(
        session=session,
    )


@router.get(
    "/get-monitors-preview/",
    response_model=list[MonitorPreviewWithID],
)
async def get_monitors_preview(
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    offset: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
) -> Sequence["Monitor"] | None:
    monitors: Sequence["Monitor"] = await crud_monitor_class.get_all(
        session=session,
        offset=offset,
        limit=limit,
    )
    return monitors


@router.get(
    "/get-my-monitors",
    response_model=list[MonitorPreviewWithID],
)
async def get_my_monitors(
    user: Annotated[
        User,
        Depends(user_state),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
) -> Sequence[Monitor] | None:
    return await crud_monitor_class.get_users(
        session=session,
        user_id=user.id,
    )


@router.patch("/patch-monitor/{uuid}")
async def update_monitor_partial(
    uuid: Annotated[
        UUID,
        Path,
    ],
    monitor_update: MonitorUpdatePartial,
    user: Annotated[
        User,
        Depends(user_state),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
):
    monitor: Monitor | None = await crud_monitor_class.get_by_uuid(
        session=session,
        item_uuid=uuid,
    )
    check_if_item_belongs(
        user=user,
        model=monitor,
        message="updated",
    )
    return await crud_monitor_class.update(
        session=session,
        model_update=monitor_update,
        model_instance=monitor,
        partial=True,
    )


@router.delete(
    "/delete-monitor/{uuid}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_monitor(
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
    monitor: Monitor = await crud_monitor_class.get_by_uuid(
        session=session,
        item_uuid=uuid,
    )
    check_if_item_belongs(
        user=user,
        model=monitor,
        message="deleted",
    )
    await crud_monitor_class.delete(
        session=session,
        model_instance=monitor,
    )
