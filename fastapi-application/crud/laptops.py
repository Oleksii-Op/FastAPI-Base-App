from typing import Sequence
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from core.schemas.laptop import LaptopCreate, LaptopUpdate, LaptopUpdatePartial
from core.models.laptop import Laptop


async def get_all_laptops(
    session: AsyncSession,
) -> Sequence[Laptop]:
    stmt = select(Laptop).order_by(Laptop.maker)
    result = await session.scalars(stmt)
    return result.all()


async def get_all_laptops_with_offset(
    session: AsyncSession, offset: int, limit: int
) -> Sequence[Laptop]:
    stmt = select(Laptop).order_by(Laptop.maker).offset(offset).limit(limit)
    result = await session.scalars(stmt)
    return result.all()


async def get_all_laptops_preview(
    session: AsyncSession,
) -> Sequence[Laptop]:
    stmt = select(
        Laptop.id,
        Laptop.name,
        Laptop.price,
        Laptop.diagonal,
        Laptop.resolution,
        Laptop.screen_type,
        Laptop.cpu_model,
        Laptop.image,
        Laptop.is_available,
    ).order_by(Laptop.maker)
    result = await session.scalars(stmt)
    return result.all()


async def create_laptop(
    session: AsyncSession,
    laptop_create: LaptopCreate,
    user_id: int,
) -> Laptop:
    laptop = Laptop(
        **laptop_create.model_dump(),
        user_id=user_id,
    )
    session.add(laptop)
    await session.commit()
    # await session.refresh(user)
    return laptop


async def get_laptop_by_id(
    session: AsyncSession,
    laptop_id: UUID,
) -> Laptop | None:
    return await session.get(Laptop, laptop_id)


async def get_users_laptops(
    session: AsyncSession,
    user_id: int,
) -> Sequence[Laptop] | None:
    stmt = select(Laptop).where(Laptop.user_id == user_id)
    result = await session.scalars(stmt)
    return result.all()


async def delete_laptop(
    session: AsyncSession,
    laptop_model: Laptop,
) -> None:
    await session.delete(laptop_model)
    await session.rollback()


async def update_laptop(
    session: AsyncSession,
    laptop: Laptop,
    laptop_update: LaptopUpdate | LaptopUpdatePartial,
    partial: bool = False,
) -> Laptop:
    for field, value in laptop_update.model_dump(exclude_unset=partial).items():
        setattr(laptop, field, value)
    await session.commit()
    return laptop
