from pydantic import EmailStr
from service.transport import email_sender, EmailSender
import os


def send_verification_email(
        username: str,
        recipient_email: EmailStr,
        transport: "EmailSender",
) -> None:
    subject = "Account Verification Request"

    context = {
        "username": username,
    }

    template_path = os.path.join(
        os.getcwd(),
        "templates",
        "verification_request.html",
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
