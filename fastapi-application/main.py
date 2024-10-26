import uvicorn

import logging

from starlette.responses import JSONResponse

from common_logger.logger_config import configure_logger
from core.config import settings

from api import router as api_router
from create_fastapi_app import create_app
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

logger = logging.getLogger(__name__)


main_app = create_app(
    create_custom_static_urls=True,
)

main_app.include_router(
    api_router,
)


@main_app.get("/index")
async def index_page():
    return {"message": "Hello, user!"}


async def check_ip_middleware(
    request: Request,
    call_next,
) -> JSONResponse:
    try:
        client_ip = request.client.host
        logging.info(f"Request URL: {request.url}")
        logging.info(f"Request Method: {request.method}")
        logging.info(f"Client IP: {client_ip}")

        if request.url.path == "/metrics":
            if client_ip != "10.10.103.5":
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


main_app.add_middleware(
    BaseHTTPMiddleware,
    dispatch=check_ip_middleware,
)

main_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Instrumentator().instrument(main_app).expose(main_app)


if __name__ == "__main__":
    configure_logger(level=logging.INFO)
    logger.info("Starting FastAPI application")
    uvicorn.run(
        "main:main_app",
        host=settings.run.host,
        port=settings.run.port,
        # set reload=False if to be run in docker container
        reload=False,
        log_config="log_conf.yaml",
    )
    logger.info("FastAPI application stopped")
