from typing import Annotated

from fastapi import APIRouter, Depends

from api.dependencies.authentication.fastapi_users_ import (
    current_active_user,
    current_superuser,
)
from core.config import settings
from core.models import User
from core.schemas.user import UserRead

router = APIRouter(
    prefix=settings.api.v1.messages,
    tags=["Messages"],
)


@router.get("")
def get_user_messages(
    user: Annotated[
        User,
        Depends(current_active_user),
    ]
):
    return {
        "messages": ["m1", "m2", "m3"],
        "user": UserRead.model_validate(user),
    }


@router.get("/sercrets")
def get_superuser_messages(
    user: Annotated[
        User,
        Depends(current_superuser),
    ]
):
    return {
        "messages": ["sercret-m1", "secret-m2", "secret-m3"],
        "user": UserRead.model_validate(user),
    }
