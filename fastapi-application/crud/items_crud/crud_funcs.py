from typing import Sequence, Optional
from uuid import UUID
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from crud.items_crud.typevars import (
    SQLModel,
    Update,
    UpdatePartial,
)


async def get_all(
    session: AsyncSession,
    model: "SQLModel",
    offset: Optional[int] = None,
    limit: Optional[int] = None,
    order_by=None,
) -> Sequence["SQLModel"]:
    stmt = select(model)
    if order_by:
        stmt = stmt.order_by(order_by)
    if offset is not None:
        stmt = stmt.offset(offset)
    if limit is not None:
        stmt = stmt.limit(limit)
    result = await session.scalars(stmt)
    results_list: Sequence["SQLModel"] = result.all()
    return results_list


async def create_item(
    session: AsyncSession,
    model: "SQLModel",
    data: dict,
    user_id: Optional[int] = None,
) -> "SQLModel":
    if user_id:
        data["user_id"] = user_id
    item = model(**data)
    session.add(item)
    await session.commit()
    await session.refresh(item)
    return item


async def get_item_by_uuid(
    session: AsyncSession,
    model: "SQLModel",
    item_uuid: UUID,
) -> SQLModel | None:
    return await session.get(model, item_uuid)


async def get_users_item(
    session: AsyncSession,
    model: "SQLModel",
    user_id: int,
) -> Sequence["SQLModel"]:
    stmt = select(model).where(model.user_id == user_id)
    result = await session.scalars(stmt)
    return result.all()


async def get_filtered_items(
    session: AsyncSession,
    model: "SQLModel",
    filters: dict,
) -> Sequence["SQLModel"]:
    stmt = select(model)
    for field, value in filters.items():
        stmt = stmt.where(getattr(model, field) == value)
    result = await session.scalars(stmt)
    return result.all()


async def delete_item(
    session: AsyncSession,
    model_instance: type["SQLModel"],
) -> None:
    await session.delete(model_instance)
    await session.commit()


async def update_item(
    session: AsyncSession,
    model_instance: "SQLModel",
    model_update: Update | UpdatePartial,
    partial: bool = False,
) -> "SQLModel":
    for field, value in model_update.model_dump(exclude_unset=partial).items():
        setattr(model_instance, field, value)
    await session.commit()
    return model_instance
