from core.config import settings
from fastapi_users.authentication import BearerTransport
from fastapi import Response, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi_users.openapi import OpenAPIResponseType
from fastapi_users.schemas import model_dump


class CustomBearerResponse(BaseModel):
    access_token: str


class CustomBearerTransport(BearerTransport):
    async def get_login_response(self, token: str) -> Response:
        bearer_response = CustomBearerResponse(access_token=token)
        return JSONResponse(model_dump(bearer_response))

    async def get_logout_response(self) -> Response:
        # Logout successful response
        return Response(status_code=status.HTTP_200_OK)

    @staticmethod
    def get_openapi_login_responses_success() -> OpenAPIResponseType:
        return {
            status.HTTP_200_OK: {
                "model": CustomBearerResponse,
                "content": {
                    "application/json": {
                        "example": {
                            "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1"
                                            "c2VyX2lkIjoiOTIyMWZmYzktNjQwZi00MzcyLTg2Z"
                                            "DMtY2U2NDJjYmE1NjAzIiwiYXVkIjoiZmFzdGFwaS"
                                            "11c2VyczphdXRoIiwiZXhwIjoxNTcxNTA0MTkzfQ."
                                            "M10bjOe45I5Ncu_uXvOmVV8QxnL-nZfcH96U90JaocI"
                        }
                    }
                },
            },
        }

    @staticmethod
    def get_openapi_logout_responses_success() -> OpenAPIResponseType:
        return {
            status.HTTP_200_OK: {}
        }

bearer_transport = CustomBearerTransport(
    tokenUrl=settings.api.bearer_token_url,
)
