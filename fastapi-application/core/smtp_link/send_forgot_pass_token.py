from httpx import HTTPStatusError, Response
from typing import TYPE_CHECKING
from fastapi import status
from pydantic import EmailStr

from core.smtp_link.schemas.verification_model import ResetPassModel
from httpx import AsyncClient

if TYPE_CHECKING:
    from core.smtp_link.schemas.smtp_url import SMTPServiceURL

from core.smtp_link.schemas.smtp_url import smtp_service_url


async def send_forgot_pass_token(
    username: str,
    email: EmailStr,
    token: str,
    smtp_url: "SMTPServiceURL" = smtp_service_url,
) -> Response:
    data = ResetPassModel(
        email=email,
        username=username,
        token=token,
    )
    async with AsyncClient() as client:
        try:
            response = await client.post(
                url=smtp_url.forgot_password,
                json=data.model_dump(),
            )
            response.raise_for_status()
            return status.HTTP_200_OK
        except HTTPStatusError as exc:
            print(f"HTTP error occurred: {exc}")
            raise
