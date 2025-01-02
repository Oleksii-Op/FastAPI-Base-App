from typing import Annotated, Sequence
from uuid import UUID
import logging
from common_logger.logger_config import configure_logger

logger = logging.getLogger(__name__)

from fastapi import APIRouter, Depends, HTTPException, Response

from api.dependencies.authentication.fastapi_users_ import (
    current_superuser,
    current_active_user,
    current_verified_user,
)
from core.config import settings
from core.models import User, db_helper, Laptop
from core.schemas.laptop import LaptopFullModel, LaptopCreate, LaptopPreviewModelWithID
from sqlalchemy.ext.asyncio import AsyncSession
from crud import laptops as crud_laptops

user_state = current_active_user


configure_logger(level=logging.INFO)
router = APIRouter(
    prefix=settings.api.v1.laptops,
    tags=["Laptops"],
)


@router.post("/create-laptop", response_model=LaptopCreate)
async def create_laptop(
    user: Annotated[
        User,
        Depends(user_state),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    model: LaptopCreate,
) -> "Laptop":
    user_id, username = user.id, user.username
    new_laptop = await crud_laptops.create_laptop(
        session=session,
        laptop_create=model,
        user_id=user_id,
    )
    logger.warning(
        "User id(%r) | username(%r) has created a laptop with name: %r.",
        user_id,
        username,
        model.name,
    )
    return new_laptop


@router.get("/get-laptops-preview", response_model=list[LaptopPreviewModelWithID])
async def get_laptops_preview(
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ]
) -> Sequence["Laptop"]:
    laptops: Sequence["Laptop"] = await crud_laptops.get_all_laptops(
        session=session,
    )
    return laptops


@router.get("/get-laptops-detail", response_model=list[LaptopFullModel])
async def get_laptops_detail(
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ]
) -> Sequence["Laptop"]:
    laptops: Sequence["Laptop"] = await crud_laptops.get_all_laptops(
        session=session,
    )
    return laptops


@router.patch("/patch-laptop/{laptop_id}")
async def patch_laptop(
    user: Annotated[
        User,
        Depends(user_state),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    laptop_id: UUID,
) -> Response:
    user_id, username = user.id, user.username
    laptop = await crud_laptops.get_laptop_by_id(
        session=session,
        laptop_id=laptop_id,
    )
    if not laptop:
        raise HTTPException(
            status_code=404, detail=f"Laptop with ID {laptop_id} not found"
        )
    if laptop.user_id != user_id:
        raise HTTPException(
            status_code=401,
            detail="This item does not belong to you.",
        )
    await crud_laptops.patch_laptop(
        session=session,
        laptop_model=laptop,
    )
    logger.warning(
        "User id(%r) | username(%r) has deleted laptop %r.",
        user_id,
        username,
        laptop_id,
    )
    return Response(status_code=204)


@router.delete("/delete-laptop/{laptop_id}")
async def delete_laptop(
    user: Annotated[
        User,
        Depends(user_state),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    laptop_id: UUID,
) -> Response:
    user_id, username = user.id, user.username
    laptop = await crud_laptops.get_laptop_by_id(
        session=session,
        laptop_id=laptop_id,
    )
    if not laptop:
        raise HTTPException(
            status_code=404, detail=f"Laptop with ID {laptop_id} not found"
        )
    if laptop.user_id != user_id:
        raise HTTPException(
            status_code=401,
            detail="This item does not belong to you.",
        )
    await crud_laptops.delete_laptop(
        session=session,
        laptop_model=laptop,
    )
    logger.warning(
        "User id(%r) | username(%r) has deleted laptop %r.",
        user_id,
        username,
        laptop_id,
    )
    return Response(status_code=204)
