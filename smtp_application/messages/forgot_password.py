from pydantic import EmailStr
from service.transport import email_sender, EmailSender
import os
from core.config import settings


async def send_forgot_password_email(
    username: str,
    token: str,
    recipient_email: EmailStr,
    transport: "EmailSender",
) -> None:
    subject = "Reset Password | Forgot Password"
    context = {
        "username": username,
        "redirect_url": settings.domain.forgot_password_page_url,
        "token": token,
    }

    template_path = os.path.join(
        os.getcwd(),
        "templates",
        "forgot_password.html",
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
