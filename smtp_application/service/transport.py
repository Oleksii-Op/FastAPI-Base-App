import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from jinja2 import Template
import logging
from core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class EmailSender:
    def __init__(
        self,
        smtp_host: str,
        smtp_port: int,
        email: str,
        password: str,
    ) -> None:
        self.smtp_host = smtp_host
        self.smtp_port = smtp_port
        self.email = email
        self.password = password

    @staticmethod
    def load_and_render_template(
        template_path: str,
        context: dict,
    ) -> str:
        try:
            with open(template_path, "r", encoding="utf-8") as file:
                template_content = file.read()
            template = Template(template_content)
            return template.render(context)
        except FileNotFoundError as e:
            logger.error(f"Template file not found: {e}")
            raise
        except Exception as e:
            logger.error(f"Error rendering template: {e}")
            raise

    def create_message(
        self,
        to_email: str,
        subject: str,
        html_content: str,
    ) -> MIMEMultipart:
        msg = MIMEMultipart("alternative")
        msg["From"] = self.email
        msg["To"] = to_email
        msg["Subject"] = subject

        html_part = MIMEText(
            html_content,
            "html",
        )
        msg.attach(html_part)

        return msg

    def send(self, msg: MIMEMultipart) -> None:
        try:
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.ehlo()
                server.starttls()
                server.login(
                    self.email,
                    self.password,
                )
                server.sendmail(
                    msg["From"],
                    msg["To"],
                    msg.as_string(),
                )
                # logger.info("Successfully sent the mail to %s", msg["To"])
        except smtplib.SMTPException as exc:
            logger.error(
                "Failed to send mail due to SMTP error: %s",
                exc,
            )
            raise
        except Exception as exc:
            logger.error(
                "Failed to send mail: %s",
                exc,
            )
            raise


email_sender = EmailSender(
    smtp_host=settings.smtp.host,
    smtp_port=settings.smtp.port,
    email=settings.credentials.email,
    password=settings.credentials.password,
)
