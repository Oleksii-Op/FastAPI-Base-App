from typing import TYPE_CHECKING, Sequence
from pydantic import BaseModel, Field
from sqlalchemy import select, or_, and_
from fastapi import Query
from core.models.items import DesktopPC
from .range_distinct_funcs import (
    get_distinct_values,
    get_range_values,
)

if TYPE_CHECKING:
    from sqlalchemy.ext.asyncio import AsyncSession


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
    gpu_memory: list[int] = Field(Query(default=[]))
    # CPU
    cpu_maker: list[str] = Field(Query(default=[]))
    cpu_class: list[str] = Field(Query(default=[]))
    cpu_cores: list[int] = Field(Query(default=[]))
    # Storage
    storage_size: list[int] = Field(Query(default=[]))
    storage_type: list[str] = Field(Query(default=[]))


async def get_desktops_filter(
    session: "AsyncSession",
    filters: DesktopFilterParams,
    offset: int,
    limit: int,
) -> Sequence[DesktopPC]:
    conditions = []

    range_fields = {
        "price": (filters.price_min, filters.price_max),
    }

    for field, (min_val, max_val) in range_fields.items():
        if min_val is not None and max_val is not None:
            conditions.append(
                getattr(DesktopPC, field).between(
                    min_val,
                    max_val,
                ),
            )
        elif min_val is not None:
            conditions.append(
                getattr(DesktopPC, field) >= min_val,
            )
        elif max_val is not None:
            conditions.append(
                getattr(DesktopPC, field) <= max_val,
            )

    bool_fields = {
        "is_for_gaming": filters.is_for_gaming,
        "is_for_home_studying": filters.is_for_home_studying,
        "is_for_office": filters.is_for_office,
        "has_screen": filters.has_screen,
        "is_mini": filters.is_mini,
    }

    for field, value in bool_fields.items():
        if value is not None:
            conditions.append(
                getattr(DesktopPC, field) == value,
            )

    list_fields = {
        "maker": filters.maker,
        "ram_type": filters.ram_type,
        "gpu_maker": filters.gpu_maker,
        "gpu_model": filters.gpu_model,
        "cpu_maker": filters.cpu_maker,
        "cpu_class": filters.cpu_class,
        "storage_type": filters.storage_type,
        "ram_frequency": filters.ram_frequency,  # int
        "ram_size": filters.ram_size,  # int
        "cpu_cores": filters.cpu_cores,  # int
        "storage_size": filters.storage_size,  # int
    }

    for field, values in list_fields.items():
        if values:
            column = getattr(DesktopPC, field)
            if isinstance(values[0], str):
                conditions.append(or_(*[column.ilike(f"%{val}%") for val in values]))
            else:
                conditions.append(or_(*[column == val for val in values]))

    stmt = select(DesktopPC).filter(and_(*conditions)).offset(offset).limit(limit)
    result = await session.scalars(stmt)
    return result.all()


async def get_desktop_attrs(
    session: "AsyncSession",
):

    response_dict = {
        "gpu_models": await get_distinct_values(
            session,
            DesktopPC.gpu_model,
        ),
        "price_range": await get_range_values(
            session,
            DesktopPC.price,
        ),
        "makers": await get_distinct_values(
            session,
            DesktopPC.maker,
        ),
        "cpu_makers": await get_distinct_values(
            session,
            DesktopPC.cpu_maker,
        ),
        "cpu_models": await get_distinct_values(
            session,
            DesktopPC.cpu_model,
        ),
        "cpu_cores": await get_distinct_values(
            session,
            DesktopPC.cpu_cores,
        ),
        "gpu_makers": await get_distinct_values(
            session,
            DesktopPC.gpu_maker,
        ),
        "gpu_memories": await get_distinct_values(
            session,
            DesktopPC.gpu_memory,
        ),
        "ram_sizes": await get_distinct_values(
            session,
            DesktopPC.ram_size,
        ),
        "ram_types": await get_distinct_values(
            session,
            DesktopPC.ram_type,
        ),
        "ram_frequency": await get_distinct_values(
            session,
            DesktopPC.ram_frequency,
        ),
        "storage_sizes": await get_distinct_values(
            session,
            DesktopPC.storage_size,
        ),
        "storage_types": await get_distinct_values(
            session,
            DesktopPC.storage_type,
        ),
    }
    return response_dict
