import uvicorn

from core.config import settings

from api import router as api_router
from create_fastapi_app import create_app

from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator


main_app = create_app(
    create_custom_static_urls=True,
)

main_app.include_router(
    api_router,
)


@main_app.get("/index")
async def index_page():
    return {"message": "Hello, user!"}


main_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Instrumentator().instrument(main_app).expose(main_app)


if __name__ == "__main__":
    uvicorn.run(
        "main:main_app",
        host=settings.run.host,
        port=settings.run.port,
        # set reload=False if to be run in docker container
        reload=False,
    )
