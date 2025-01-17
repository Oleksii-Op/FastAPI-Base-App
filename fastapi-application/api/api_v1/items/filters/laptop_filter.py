from typing import TYPE_CHECKING, Sequence
from sqlalchemy import select, and_, or_, func
from pydantic import BaseModel, Field
from fastapi import Query

from core.models import Laptop

if TYPE_CHECKING:
    from sqlalchemy.ext.asyncio import AsyncSession


class LaptopFilterParams(BaseModel):
    price_min: float | None = None
    price_max: float | None = None
    maker: list[str] = Field(Query(default=[]))  #
    is_for_gaming: bool | None = None
    is_for_home_studying: bool | None = None
    is_for_office: bool | None = None
    diagonal_min: float | None = None
    diagonal_max: float | None = None
    resolution: list[str] = Field(Query(default=[]))  #
    screen_frequency_min: int | None = None
    screen_frequency_max: int | None = None
    cpu_maker: list[str] = Field(Query(default=[]))  #
    cpu_model: list[str] = Field(Query(default=[]))  #
    cpu_cores: list[int] = Field(Query(default=[]))  #
    gpu_maker: list[str] = Field(Query(default=[]))  #
    gpu_model: list[str] = Field(Query(default=[]))  #
    gpu_memory: list[int] = Field(Query(default=[]))  #
    ram_size: list[int] = Field(Query(default=[]))  #
    ram_type: list[str] = Field(Query(default=[]))  #
    storage_size: list[int] = Field(Query(default=[]))  #
    storage_type: list[str] = Field(Query(default=[]))  #
    hdmi_connection: list[int] = Field(Query(default=[]))  #
    dp_connection: list[int] = Field(Query(default=[]))  #
    installed_os: list[str] = Field(Query(default=[]))  #
    screen_type: list[str] = Field(Query(default=[]))


async def filter_laptops(
    session: "AsyncSession",
    filters: LaptopFilterParams,
    offset: int,
    limit: int,
) -> Sequence[Laptop]:
    conditions = []

    range_fields = {
        "price": (filters.price_min, filters.price_max),
        "diagonal": (filters.diagonal_min, filters.diagonal_max),
        "screen_frequency": (
            filters.screen_frequency_min,
            filters.screen_frequency_max,
        ),
    }
    for field, (min_val, max_val) in range_fields.items():
        if min_val is not None and max_val is not None:
            conditions.append(
                getattr(Laptop, field).between(
                    min_val,
                    max_val,
                ),
            )
        elif min_val is not None:
            conditions.append(
                getattr(Laptop, field) >= min_val,
            )
        elif max_val is not None:
            conditions.append(
                getattr(Laptop, field) <= max_val,
            )

    bool_fields = {
        "is_for_gaming": filters.is_for_gaming,
        "is_for_home_studying": filters.is_for_home_studying,
        "is_for_office": filters.is_for_office,
    }

    for field, value in bool_fields.items():
        if value is not None:
            conditions.append(
                getattr(Laptop, field) == value,
            )

    list_fields = {
        "maker": filters.maker,  #
        "ram_type": filters.ram_type,  #
        "gpu_maker": filters.gpu_maker,  #
        "gpu_model": filters.gpu_model,  #
        "gpu_memory": filters.gpu_memory,  #
        "cpu_maker": filters.cpu_maker,  #
        "cpu_model": filters.cpu_model,  #
        "storage_type": filters.storage_type,  #
        "ram_size": filters.ram_size,  # int
        "cpu_cores": filters.cpu_cores,  # int
        "storage_size": filters.storage_size,  # int
        "resolution": filters.resolution,
        "hdmi_connection": filters.hdmi_connection,
        "dp_connection": filters.dp_connection,
        "installed_os": filters.installed_os,
        "screen_type": filters.screen_type,
    }

    for field, values in list_fields.items():
        if values:
            column = getattr(Laptop, field)
            if isinstance(values[0], str):
                conditions.append(or_(*[column.ilike(f"%{val}%") for val in values]))
            else:
                conditions.append(or_(*[column == val for val in values]))

    stmt = select(Laptop).filter(and_(*conditions)).offset(offset).limit(limit)
    result = await session.scalars(stmt)
    return result.all()


async def get_distinct_values(
    session: "AsyncSession",
    field,
):
    stmt = select(field).distinct()
    result = await session.scalars(stmt)
    return result.all()


async def get_range_values(
    session: "AsyncSession",
    field,
):
    stmt = select(
        func.min(field).label("min_value"),
        func.max(field).label("max_value"),
    )
    result = await session.execute(stmt)
    min_value, max_value = result.one()
    return {"min": min_value, "max": max_value}


async def get_laptops_attrs(session: "AsyncSession"):

    response_dict = {
        "gpu_models": await get_distinct_values(
            session,
            Laptop.gpu_model,
        ),
        "price_range": await get_range_values(
            session,
            Laptop.price,
        ),
        "diagonal_range": await get_range_values(
            session,
            Laptop.diagonal,
        ),
        "screen_frequency_range": await get_range_values(
            session, Laptop.screen_frequency
        ),
        "makers": await get_distinct_values(
            session,
            Laptop.maker,
        ),
        "resolutions": await get_distinct_values(
            session,
            Laptop.resolution,
        ),
        "cpu_makers": await get_distinct_values(
            session,
            Laptop.cpu_maker,
        ),
        "cpu_models": await get_distinct_values(
            session,
            Laptop.cpu_model,
        ),
        "cpu_cores": await get_distinct_values(
            session,
            Laptop.cpu_cores,
        ),
        "gpu_makers": await get_distinct_values(
            session,
            Laptop.gpu_maker,
        ),
        "gpu_memories": await get_distinct_values(
            session,
            Laptop.gpu_memory,
        ),
        "ram_sizes": await get_distinct_values(
            session,
            Laptop.ram_size,
        ),
        "ram_types": await get_distinct_values(
            session,
            Laptop.ram_type,
        ),
        "storage_sizes": await get_distinct_values(
            session,
            Laptop.storage_size,
        ),
        "storage_types": await get_distinct_values(
            session,
            Laptop.storage_type,
        ),
        "hdmi_connections": await get_distinct_values(
            session,
            Laptop.hdmi_connection,
        ),
        "dp_connections": await get_distinct_values(
            session,
            Laptop.dp_connection,
        ),
        "installed_os": await get_distinct_values(
            session,
            Laptop.installed_os,
        ),
        "screen_types": await get_distinct_values(
            session,
            Laptop.screen_type,
        ),
    }
    return response_dict
