import logging

import uvicorn
from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

from core.config import settings
from messages.verify_token_sender import send_verification_email
from service.transport import email_sender
from core.schemas.emailverification import EmailVerify

from common_logger.logger_config import configure_logger


logger = logging.getLogger(__name__)
app = FastAPI()


@app.post("/send/verifytoken")
async def send_verification_token(
    email_data: EmailVerify,
) -> dict[str, str]:
    send_verification_email(
        username=email_data.username,
        token=email_data.token,
        recipient_email=email_data.email,
        transport=email_sender,
    )
    logger.warning(
        "Verification token has been sent to email: email(%r),username: (%r).",
        email_data.email,
        email_data.username,
    )
    return {"message": "Verification email sent successfully"}


async def check_ip_middleware(
    request: Request,
    call_next,
) -> JSONResponse:
    try:
        client_ip = request.client.host
        logging.info(f"Request URL: {request.url}")
        logging.info(f"Request Method: {request.method}")
        logging.info(f"Client IP: {client_ip}")

        if request.url.path == "/send/verifytoken":
            if client_ip != settings.backend_allowed.ip_address:
                logging.warning(f"Forbidden access attempt from IP: {client_ip}")
                return JSONResponse(
                    status_code=403,
                    content={"detail": "Forbidden"},
                )

        return await call_next(request)

    except Exception as e:
        logging.error(f"Unexpected error occurred: {str(e)}")
        return JSONResponse(
            status_code=500, content={"detail": "Internal Server Error"}
        )


app.add_middleware(
    BaseHTTPMiddleware,
    dispatch=check_ip_middleware,
)


if __name__ == "__main__":
    configure_logger(level=logging.INFO)
    logger.info("Starting SMTP/FastAPI application")
    uvicorn.run(
        "main:app",
        host=settings.run.host,
        port=settings.run.port,
        reload=False,
    )
    logger.info("FastAPI SMTP/FastAPI application stopped")
