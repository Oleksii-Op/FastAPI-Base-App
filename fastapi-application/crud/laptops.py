from typing import Sequence
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from core.schemas.laptop import LaptopCreate
from core.models.laptop import Laptop


async def get_all_laptops(
    session: AsyncSession,
) -> Sequence[Laptop]:
    stmt = select(Laptop).order_by(Laptop.maker)
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
    stmt = select(Laptop).where(Laptop.id == laptop_id)
    result = await session.scalar(stmt)
    return result


async def delete_laptop(
    session: AsyncSession,
    laptop_model: Laptop,
) -> None:
    await session.delete(laptop_model)
    await session.rollback()


async def patch_laptop(
    session: AsyncSession,
    laptop_model: Laptop,
):
    pass
