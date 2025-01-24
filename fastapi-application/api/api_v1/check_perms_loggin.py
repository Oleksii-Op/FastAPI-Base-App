from core.models import User
from fastapi import HTTPException
from crud.items_crud.typevars import SQLModel
import logging

logger = logging.getLogger(__name__)


def check_if_item_belongs(
    user: User,
    model: SQLModel,
    message: str,
) -> None:
    user_id, username, superuser = user.id, user.username, user.is_superuser
    class_name = model.__class__.__name__
    model_id = model.id
    if model is None:
        raise HTTPException(
            status_code=404,
            detail=f"Item:{class_name} UUID:{model_id} not found",
        )
    if not superuser and model.user_id != user_id:
        raise HTTPException(
            status_code=401,
            detail="This item does not belong to you.",
        )
    logger.warning(
        "User id(%r) | username(%r) has %r %r %r.",
        user_id,
        username,
        message,
        class_name,
        model_id,
    )
