from fastapi import APIRouter, Response

router = APIRouter(prefix="/utils", tags=["utils"])


@router.get("/health-check")
async def health_check() -> Response:
    return Response(status_code=200)
