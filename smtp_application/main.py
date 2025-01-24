import logging

import uvicorn
from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
from controllers.send_controllers import router as send_router

from core.config import settings

from common_logger.logger_config import configure_logger

logger = logging.getLogger(__name__)
app = FastAPI()
app.include_router(send_router)


async def check_ip_middleware(
        request: Request,
        call_next,
) -> JSONResponse:
    try:
        client_ip = request.client.host
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
