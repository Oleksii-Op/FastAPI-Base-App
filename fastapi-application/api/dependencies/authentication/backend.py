from fastapi_users.authentication import AuthenticationBackend
from .strategy import get_redis_strategy
from core.authentication.transport import bearer_transport


authentication_backend = AuthenticationBackend(
    name="fastapi_users_token",
    transport=bearer_transport,
    get_strategy=get_redis_strategy,
)
