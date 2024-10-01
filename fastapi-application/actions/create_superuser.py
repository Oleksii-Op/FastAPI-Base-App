import asyncio
import contextlib

from fastapi_users.exceptions import UserAlreadyExists

from api.dependencies.authentication.users import get_users_db
from api.dependencies.authentication.user_manager import get_user_manager
from core.authentication.user_manager import UserManager
from core.models import db_helper, User
from core.schemas.user import UserCreate
from core.config import settings


get_users_db_context = contextlib.asynccontextmanager(get_users_db)
get_user_manager_context = contextlib.asynccontextmanager(get_user_manager)


async def create_user(
    user_manager: UserManager,
    user_create: UserCreate,
) -> User:
    user = await user_manager.create(
        user_create=user_create,
        safe=False,
    )
    return user


async def create_superuser(
    email: str = settings.admin_user.default_email,
    password: str = settings.admin_user.default_password,
    is_active: bool = True,
    is_superuser: bool = True,
    is_verified: bool = True,
):
    user_create = UserCreate(
        email=email,
        username="FastAPIAdmin",
        first_name="Admin",
        last_name="User",
        phone_number="+380992921960",
        password=password,
        is_active=is_active,
        is_superuser=is_superuser,
        is_verified=is_verified,
    )
    async with db_helper.session_factory() as session:
        async with get_users_db_context(session) as users_db:
            async with get_user_manager_context(users_db) as user_manager:
                return await create_user(
                    user_manager,
                    user_create,
                )


if __name__ == "__main__":
    try:
        asyncio.run(create_superuser())
    except UserAlreadyExists:
        print("Superuser already exists. Skipping...")
