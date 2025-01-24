from typing import Annotated
from fastapi import Depends, Path, HTTPException

from core.models import Laptop, db_helper
from crud.items_crud import laptops as crud_laptops


from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from crud.items_crud.typevars import SQLModel


async def get_laptops_by_uuid(
    laptop_id: Annotated[UUID, Path],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
) -> Laptop | None:
    laptop = await crud_laptops.get_laptop_by_id(
        session=session,
        laptop_id=laptop_id,
    )
    if laptop is not None:
        return laptop
    raise HTTPException(
        status_code=404,
        detail=f"Laptop {laptop_id} not found",
    )


# async def crud_item_by_uuid(
#     item_uuid: UUID,
#     session: AsyncSession,
#     model: SQLModel,
# ) -> SQLModel | None:
#     item = await crud.get_item_by_uuid(
#         session=session,
#         item_uuid=item_uuid,
#         model=model,
#     )
#     if item is not None:
#         return item
#     raise HTTPException(
#         status_code=404,
#         detail=f"Item:{model.__name__} UUID:{item_uuid} not found",
#     )
