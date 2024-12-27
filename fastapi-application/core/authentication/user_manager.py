import logging
from typing import Optional, TYPE_CHECKING

from fastapi_users import BaseUserManager, IntegerIDMixin, models

from common_logger.logger_config import configure_logger
from core.models import User
from core.config import settings
from core.types.user_id import UserIdType


from core.smtp_link.send_verify_token import send_verification_token

if TYPE_CHECKING:
    from fastapi import Request

log = logging.getLogger(__name__)
configure_logger(level=logging.INFO)


class UserManager(
    IntegerIDMixin,
    BaseUserManager[User, UserIdType],
):
    reset_password_token_secret = settings.access_token.reset_password_token_secret
    verification_token_secret = settings.access_token.verification_token_secret

    async def on_after_register(
        self,
        user: User,
        request: Optional["Request"] = None,
    ):
        log.warning(
            "User id(%r) | username(%r) has registered.",
            user.id,
            user.username,
        )

        # await UserManager.request_verify(self, user, request)

    async def on_after_request_verify(
        self,
        user: User,
        token: str,
        request: Optional["Request"] = None,
    ):
        log.warning(
            "Verification requested for user id(%r) | username(%r). Verification token: %r",
            user.id,
            user.username,
            token,
        )
        # await send_verification_token(
        #     username=user.username,
        #     token=token,
        #     email=user.email,
        # )

    async def on_after_verify(
        self, user: User, request: Optional["Request"] = None
    ) -> None:
        log.warning(
            "User id(%r) | username(%r) has been verified.",
            user.id,
            user.username,
        )

    async def on_after_forgot_password(
        self,
        user: User,
        token: str,
        request: Optional["Request"] = None,
    ):
        log.warning(
            "User id(%r) | username(%r) has forgot their password. Reset token: %r",
            user.id,
            user.username,
            token,
        )
