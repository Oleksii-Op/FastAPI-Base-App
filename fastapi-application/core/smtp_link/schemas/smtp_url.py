from pydantic import BaseModel

from core.config import settings


class SMTPServiceURL(BaseModel):
    @property
    def url(self) -> str:
        return str(
            settings.smtp_service.host
            + ":"
            + str(settings.smtp_service.port)
            + settings.smtp_service.prefix
        )

    @property
    def verification_request(self) -> str:
        return str(self.url + settings.smtp_service.verification_request)

    @property
    def verification_approved(self) -> str:
        return str(self.url + settings.smtp_service.verification_approved)

    @property
    def after_registration(self) -> str:
        return str(self.url + settings.smtp_service.after_registration)

    @property
    def forgot_password(self) -> str:
        return str(self.url + settings.smtp_service.forgot_password)

    @property
    def reset_password(self) -> str:
        return str(self.url + settings.smtp_service.after_reset_password)


smtp_service_url = SMTPServiceURL()
