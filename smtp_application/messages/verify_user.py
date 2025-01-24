from pydantic import EmailStr
from service.transport import email_sender, EmailSender
import os


async def send_verification_email(
    username: str,
    token: str,
    recipient_email: EmailStr,
    transport: "EmailSender",
) -> None:
    subject = "Account verification"
    confirm_url = f"http://example.com/api/v1/auth/verify?token={token}"

    context = {
        "username": username,
        "token": token,
        "confirm_url": confirm_url,
    }

    template_path = os.path.join(
        os.getcwd(),
        "templates",
        "index.html",
    )
    html_content = email_sender.load_and_render_template(
        template_path,
        context,
    )

    msg = transport.create_message(
        to_email=recipient_email,
        subject=subject,
        html_content=html_content,
    )

    await transport.send(msg)
