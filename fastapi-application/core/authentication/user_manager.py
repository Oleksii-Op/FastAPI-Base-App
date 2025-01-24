import logging
from typing import Optional, TYPE_CHECKING

from fastapi_users import BaseUserManager, IntegerIDMixin

from common_logger.logger_config import configure_logger
from core.models import User
from core.config import settings
from core.types.user_id import UserIdType
from ..smtp_link.send_after_registration import send_after_registration_notice
from ..smtp_link.send_forgot_pass_token import send_forgot_pass_token
from ..smtp_link.send_verification_request import send_verification_request
from ..smtp_link.send_approved_verification import send_approved_verification
from ..smtp_link.send_password_reset import send_password_reset

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
    ) -> None:
        log.warning(
            "User id(%r) | username(%r) has registered.",
            user.id,
            user.username,
        )

        await send_after_registration_notice(
            username=user.username,
            email=user.email,
        )

    async def on_after_request_verify(
        self,
        user: User,
        token: str,
        request: Optional["Request"] = None,
    ) -> None:
        log.warning(
            "Verification requested for user id(%r) | username(%r) | email(%r). Verification token: %r",
            user.id,
            user.username,
            user.email,
            token,
        )
        await send_verification_request(
            username=user.username,
            email=user.email,
        )

    async def on_after_verify(
        self, user: User, request: Optional["Request"] = None
    ) -> None:
        log.warning(
            "User id(%r) | username(%r) | email(%r) has been verified.",
            user.id,
            user.username,
            user.email,
        )

        await send_approved_verification(
            username=user.username,
            email=user.email,
        )

    async def on_after_forgot_password(
        self,
        user: User,
        token: str,
        request: Optional["Request"] = None,
    ) -> None:
        log.warning(
            "User id(%r) | username(%r) has forgot their password. Reset token: %r",
            user.id,
            user.username,
            token,
        )
        await send_forgot_pass_token(
            username=user.username,
            email=user.email,
            token=token,
        )

    async def on_after_reset_password(
        self,
        user: User,
        request: Optional["Request"] = None,
    ) -> None:
        log.warning(
            "User id(%r) | username(%r) has reset their password.",
            user.id,
            user.username,
        )
        await send_password_reset(
            username=user.username,
            email=user.email,
        )
