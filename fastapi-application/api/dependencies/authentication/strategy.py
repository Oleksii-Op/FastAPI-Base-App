from typing import TYPE_CHECKING, Annotated

from fastapi import Depends
from fastapi_users.authentication.strategy.db import (
    DatabaseStrategy,
)

# from .access_tokens import get_access_tokens_db
from core.config import settings

# if TYPE_CHECKING:
#     from core.models import AccessToken
#     from fastapi_users.authentication.strategy.db import AccessTokenDatabase

import redis.asyncio
from fastapi_users.authentication import RedisStrategy

redis = redis.asyncio.from_url(
    "redis://localhost:6379",
    decode_responses=True,
)


def get_redis_strategy() -> RedisStrategy:
    return RedisStrategy(
        redis=redis,
        lifetime_seconds=settings.access_token.lifetime_seconds,
    )


# def get_database_strategy(
#     access_token_db: Annotated[
#         "AccessTokenDatabase[AccessToken]",
#         Depends(get_access_tokens_db),
#     ]
# ) -> DatabaseStrategy:
#     return DatabaseStrategy(
#         access_token_db,
#         lifetime_seconds=settings.access_token.lifetime_seconds,
#     )
