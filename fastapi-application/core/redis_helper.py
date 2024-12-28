import redis.asyncio
from core.config import settings


redis = redis.asyncio.from_url(
    url=str(settings.redis.url)[:-1],
    decode_responses=True,
)
