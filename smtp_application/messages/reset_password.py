from pydantic import EmailStr

from core.config import settings
from service.transport import email_sender, EmailSender
import os


def send_password_reset(
    username: str,
    recipient_email: EmailStr,
    transport: "EmailSender",
) -> None:
    subject = "Password has been reset"

    context = {
        "username": username,
        "redirect_url": settings.domain.domain_url,
    }

    template_path = os.path.join(
        os.getcwd(),
        "templates",
        "password_reset.html",
    )
    html_content = email_sender.load_and_render_template(
        template_path,
        context,
    )

    msg = transport.create_message(
        to_email=str(recipient_email),
        subject=subject,
        html_content=html_content,
    )

    transport.send(msg)
