from typing import TYPE_CHECKING
from sqlalchemy import select, func

if TYPE_CHECKING:
    from sqlalchemy.ext.asyncio import AsyncSession


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
