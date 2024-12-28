from core.config import settings
from core.redis_helper import redis
from fastapi_users.authentication import RedisStrategy


def get_redis_strategy() -> RedisStrategy:
    return RedisStrategy(
        redis=redis,
        lifetime_seconds=settings.access_token.lifetime_seconds,
    )
