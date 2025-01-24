from httpx import HTTPStatusError, Response
from typing import TYPE_CHECKING

from pydantic import EmailStr

from core.smtp_link.schemas.verification_model import EmailUsernameModel
from httpx import AsyncClient

if TYPE_CHECKING:
    from core.smtp_link.schemas.smtp_url import SMTPServiceURL

from core.smtp_link.schemas.smtp_url import smtp_service_url


async def send_verification_request(
    username: str,
    email: EmailStr,
    smtp_url: "SMTPServiceURL" = smtp_service_url,
) -> Response:
    data = EmailUsernameModel(
        email=email,
        username=username,
    )
    async with AsyncClient() as client:
        try:
            response = await client.post(
                url=smtp_url.verification_request,
                json=data.model_dump(),
            )
            response.raise_for_status()
            return response.json()
        except HTTPStatusError as exc:
            print(f"HTTP error occurred: {exc}")
            raise
