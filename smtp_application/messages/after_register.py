from pydantic import EmailStr
from service.transport import email_sender, EmailSender
import os
from core.config import settings


async def send_after_register_email(
        username: str,
        recipient_email: EmailStr,
        transport: "EmailSender",
) -> None:
    subject = "Account Registered"
    context = {
        "username": username,
        "redirect_url": settings.domain.domain_url,
    }

    template_path = os.path.join(
        os.getcwd(),
        "templates",
        "after_register.html",
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

    await transport.send(msg)
