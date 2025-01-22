from pydantic import EmailStr
from service.transport import email_sender, EmailSender
import os
from core.config import settings


def send_approved_verification_email(
        username: str,
        recipient_email: EmailStr,
        transport: "EmailSender",
) -> None:
    subject = "Verification Approved"
    context = {
        "username": username,
        "redirect_url": settings.domain.domain_url,
    }

    template_path = os.path.join(
        os.getcwd(),
        "templates",
        "verification_approved.html",
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
