from typing import Annotated
from uuid import UUID

from fastapi import Depends, Path, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from core.models import Laptop, db_helper
from crud import laptops as crud_laptops


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
