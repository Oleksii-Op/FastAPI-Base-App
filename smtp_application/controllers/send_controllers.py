import logging
from fastapi import APIRouter
from messages.after_register import send_after_register_email
from messages.approved_verification import send_approved_verification_email
from messages.verification_request import send_verification_email
from messages.forgot_password import send_forgot_password_email
from messages.reset_password import send_password_reset
from service.transport import email_sender
from core.schemas.emailverification import ResetPassModel, EmailUsernameModel
from fastapi import status

router = APIRouter(
    tags=["Controllers"],
    prefix="/controllers",
)

logger = logging.getLogger(__name__)


@router.post(
    "/after-registration",
    status_code=status.HTTP_200_OK,
)
async def send_after_registration(
    user: EmailUsernameModel,
):
    send_after_register_email(
        username=user.username,
        recipient_email=user.email,
        transport=email_sender,
    )
    logger.warning(
        "Registration confirmation has been sent to email: email(%r),username: (%r).",
        user.email,
        user.username,
    )
    return status.HTTP_200_OK


@router.post(
    "/verification-request",
    status_code=status.HTTP_200_OK,
)
async def send_verification_request(
    user: EmailUsernameModel,
):
    send_verification_email(
        username=user.username,
        recipient_email=user.email,
        transport=email_sender,
    )
    logger.warning(
        "Verification request has been sent to email: email(%r),username: (%r).",
        user.email,
        user.username,
    )
    return status.HTTP_200_OK


@router.post(
    "/verification-approved",
    status_code=status.HTTP_200_OK,
)
async def send_verification_approved(
    user: EmailUsernameModel,
):
    send_approved_verification_email(
        username=user.username,
        recipient_email=user.email,
        transport=email_sender,
    )
    logger.warning(
        "Verification approved message has been sent to email: email(%r),username: (%r).",
        user.email,
        user.username,
    )
    return status.HTTP_200_OK


@router.post(
    "/forgot-password",
    status_code=status.HTTP_200_OK,
)
async def send_forgot_password(
    user: ResetPassModel,
):
    send_forgot_password_email(
        username=user.username,
        recipient_email=user.email,
        token=user.token,
        transport=email_sender,
    )
    logger.warning(
        "Verification request has been sent to email: email(%r),username: (%r).",
        user.email,
        user.username,
    )
    return status.HTTP_200_OK


@router.post(
    "/after-reset-password",
    status_code=status.HTTP_200_OK,
)
async def send_after_reset_password(
    user: EmailUsernameModel,
):
    send_password_reset(
        username=user.username,
        recipient_email=user.email,
        transport=email_sender,
    )
    logger.warning(
        "Password has been reset for email: email(%r),username: (%r).",
        user.email,
        user.username,
    )
    return status.HTTP_200_OK
