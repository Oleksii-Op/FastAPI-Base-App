from pydantic import BaseModel

from core.config import settings


class SMTPServiceURL(BaseModel):
    url: str = (
        settings.smtp_service.host
        + ":"
        + str(settings.smtp_service.port)
        + settings.smtp_service.endpoint
    )


smtp_service_url = SMTPServiceURL()
