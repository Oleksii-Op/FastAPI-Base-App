from typing import Annotated, Sequence
import logging


from common_logger.logger_config import configure_logger

logger = logging.getLogger(__name__)

from fastapi import APIRouter, Depends, HTTPException, Query, status

from api.dependencies.authentication.fastapi_users_ import (
    current_superuser,
    current_active_user,
    current_verified_user,
)
from core.config import settings
from core.models import User, db_helper, Laptop
from core.schemas.laptop import (
    LaptopFullModel,
    LaptopCreate,
    LaptopPreviewModelWithID,
    LaptopUpdatePartial,
)
from sqlalchemy.ext.asyncio import AsyncSession
from crud import laptops as crud_laptops

from .dependencies import get_laptops_by_uuid

user_state = current_verified_user


configure_logger(level=logging.INFO)
router = APIRouter(
    prefix=settings.api.v1.laptops,
    tags=["Laptops"],
)


@router.post(
    "/create-laptop",
    response_model=LaptopCreate,
    status_code=status.HTTP_201_CREATED,
)
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


@router.get(
    "/get-laptop-by-uuid/{uuid}",
    response_model=LaptopFullModel,
)
async def get_laptop(
    laptop: Laptop = Depends(get_laptops_by_uuid),
) -> Laptop | None:
    return laptop


@router.get(
    "/get-laptops-preview/",
    response_model=list[LaptopPreviewModelWithID],
)
async def get_laptops_preview(
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    offset: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
) -> Sequence["Laptop"]:
    laptops: Sequence["Laptop"] = await crud_laptops.get_all_laptops_with_offset(
        session=session, offset=offset, limit=limit
    )
    return laptops


@router.get(
    "/get-my-laptops",
    response_model=list[LaptopPreviewModelWithID],
)
async def get_my_laptops(
    user: Annotated[
        User,
        Depends(user_state),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
):
    user_id = user.id
    laptops = await crud_laptops.get_users_laptops(
        session=session,
        user_id=user_id,
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
async def update_laptop_partial(
    laptop_update: LaptopUpdatePartial,
    user: Annotated[
        User,
        Depends(user_state),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    laptop: Laptop = Depends(get_laptops_by_uuid),
):
    user_id, username, superuser = user.id, user.username, user.is_superuser
    laptop_id = laptop.id
    if not superuser and laptop.user_id != user_id:
        raise HTTPException(
            status_code=401,
            detail="This item does not belong to you.",
        )
    logger.warning(
        "User id(%r) | username(%r) has updated laptop %r.",
        user_id,
        username,
        laptop_id,
    )
    return await crud_laptops.update_laptop(
        session=session,
        laptop=laptop,
        laptop_update=laptop_update,
        partial=True,
    )


@router.delete(
    "/delete-laptop/{laptop_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_laptop(
    user: Annotated[
        User,
        Depends(user_state),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    laptop: Laptop = Depends(get_laptops_by_uuid),
) -> None:
    user_id, username, superuser = user.id, user.username, user.is_superuser
    laptop_id = laptop.id
    if not superuser and laptop.user_id != user_id:
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
