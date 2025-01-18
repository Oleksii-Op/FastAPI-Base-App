from typing import TYPE_CHECKING, Sequence
from pydantic import BaseModel, Field

from core.models.items import Monitor
from sqlalchemy import select, or_, and_
from fastapi import Query
from .range_distinct_funcs import (
    get_distinct_values,
    get_range_values,
)

if TYPE_CHECKING:
    from sqlalchemy.ext.asyncio import AsyncSession


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


async def get_monitors_filter(
    session: "AsyncSession",
    filters: MonitorFilterParams,
    offset: int,
    limit: int,
) -> Sequence[Monitor]:
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


async def get_monitor_attrs(
    session: "AsyncSession",
):

    response_dict = {
        "price_range": await get_range_values(
            session,
            Monitor.price,
        ),
        "diagonal_range": await get_range_values(
            session,
            Monitor.diagonal,
        ),
        "brightness": await get_range_values(
            session,
            Monitor.brightness,
        ),
        "response_time": await get_range_values(
            session,
            Monitor.response_time,
        ),
        "refresh_rate": await get_range_values(
            session,
            Monitor.refresh_rate,
        ),
        "makers": await get_distinct_values(
            session,
            Monitor.maker,
        ),
        "resolution": await get_distinct_values(
            session,
            Monitor.resolution,
        ),
        "panel_type": await get_distinct_values(
            session,
            Monitor.panel_type,
        ),
        "contrast_ratio": await get_distinct_values(
            session,
            Monitor.contrast_ratio,
        ),
        "aspect_ratio": await get_distinct_values(
            session,
            Monitor.aspect_ratio,
        ),
        "vesa": await get_distinct_values(
            session,
            Monitor.vesa_mounting,
        ),
        "hdmi_connection": await get_distinct_values(
            session,
            Monitor.hdmi_connection,
        ),
        "dp_connection": await get_distinct_values(
            session,
            Monitor.dp_connection,
        ),
        "vga_connection": await get_distinct_values(
            session,
            Monitor.vga_connection,
        ),
        "usb_2": await get_distinct_values(
            session,
            Monitor.usb_2,
        ),
        "usb_type_c": await get_distinct_values(
            session,
            Monitor.usb_type_c,
        ),
        "usb_type_c_thunderbolt": await get_distinct_values(
            session,
            Monitor.usb_type_c_thunderbolt,
        ),
    }
    return response_dict
