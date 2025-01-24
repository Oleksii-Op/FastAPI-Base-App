import uvicorn
import logging

from middleware_related.check_ip import check_ip_middleware
from common_logger.logger_config import configure_logger
from core.config import settings
from api import router as api_router
from create_fastapi_app import create_app
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from utils.healthcheck import router as utils_router
from before_start_up.check_env_file import find_env
from before_start_up.check_python_version import check_version


logger = logging.getLogger(__name__)

main_app = create_app(
    create_custom_static_urls=True,
)

main_app.include_router(
    api_router,
)
main_app.include_router(
    utils_router,
)


# @main_app.get("/get-ip-info")
# async def index_page(request: Request, ip: str):
#     import httpx
#
#     client_ip = request.client.host
#     async with httpx.AsyncClient() as client:
#         get = await client.get(
#             url=f"https://api.ipapi.is/?q={ip}",
#         )
#         if get.status_code == httpx.codes.OK:
#             return get.json()


if settings.all_cors_origins:
    main_app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.all_cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    # main_app.add_middleware(
    #     BaseHTTPMiddleware,
    #     dispatch=check_ip_middleware,
    # )
    # main_app.add_middleware(
    #     CORSMiddleware,
    #     allow_origins=["*"],
    #     allow_credentials=True,
    #     allow_methods=["*"],
    #     allow_headers=["*"],
    # )


Instrumentator().instrument(main_app).expose(main_app)

if __name__ == "__main__":
    configure_logger(level=logging.INFO)
    check_version()
    find_env(".env")
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
