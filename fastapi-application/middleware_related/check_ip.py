from fastapi import Request
from starlette.responses import JSONResponse
import logging

logger = logging.getLogger(__name__)


async def check_ip_middleware(
    request: Request,
    call_next,
) -> JSONResponse:
    # try:
    client_ip = request.client.host
    if request.url.path == "/metrics":
        if client_ip != "10.10.103.5":
            logger.warning(f"Forbidden access attempt from IP: {client_ip}")
            return JSONResponse(
                status_code=403,
                content={"detail": "Forbidden"},
            )

    return await call_next(request)


#
# except Exception as e:
#     logger.error(f"Unexpected error occurred: {str(e)}")
#     return JSONResponse(
#         status_code=500, content={"detail": "Internal Server Error"}
#     )
