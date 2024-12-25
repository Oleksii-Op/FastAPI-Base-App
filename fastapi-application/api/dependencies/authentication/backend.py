from fastapi_users.authentication import AuthenticationBackend


from fastapi import Response, status

from fastapi_users import models
from fastapi_users.authentication.strategy import (
    Strategy,
    StrategyDestroyNotSupportedError,
)
from fastapi_users.authentication.transport import (
    Transport,
    TransportLogoutNotSupportedError,
)

from .strategy import get_database_strategy
from core.authentication.transport import bearer_transport


class CustomTransport(Transport):
    pass

class CustomAuthenticationBackend(AuthenticationBackend):
    async def logout(
        self, strategy: Strategy[models.UP, models.ID], user: models.UP, token: str
    ) -> Response:
        try:
            await strategy.destroy_token(token, user)
        except StrategyDestroyNotSupportedError:
            pass

        try:
            response = await self.transport.get_logout_response()
        except TransportLogoutNotSupportedError:
            response = Response(status_code=status.HTTP_204_NO_CONTENT)

        return response


authentication_backend = AuthenticationBackend(
    name="access-tokens-db",
    transport=bearer_transport,
    get_strategy=get_database_strategy,
)
