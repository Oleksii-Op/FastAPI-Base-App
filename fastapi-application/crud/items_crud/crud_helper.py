from uuid import UUID
from typing import Generic, Optional, Sequence, Any
from sqlalchemy.ext.asyncio import AsyncSession
from crud.items_crud.typevars import SQLModel
from crud.items_crud.crud_funcs import (
    get_all,
    get_item_by_uuid,
    create_item,
    delete_item,
    update_item,
    get_users_item,
)


class CRUDBase(Generic[SQLModel]):
    def __init__(self, model: type[SQLModel]):
        self.model: type[SQLModel] = model

    async def get_all(
        self,
        session: AsyncSession,
        offset: int | None = None,
        limit: int | None = None,
    ) -> Sequence[SQLModel]:
        return await get_all(
            session=session,
            model=self.model,
            offset=offset,
            limit=limit,
            order_by=self.model.maker,
        )

    async def get_by_uuid(
        self,
        session: AsyncSession,
        item_uuid: UUID,
    ) -> SQLModel | None:
        return await get_item_by_uuid(
            session=session,
            model=self.model,
            item_uuid=item_uuid,
        )

    async def get_users(
        self, session: AsyncSession, user_id: int
    ) -> Sequence[SQLModel] | None:
        return await get_users_item(
            session=session,
            model=self.model,
            user_id=user_id,
        )

    async def create(
        self,
        session: AsyncSession,
        data: dict[str, Any],
        user_id: Optional[int] = None,
    ):
        return await create_item(
            session=session,
            model=self.model,
            data=data,
            user_id=user_id,
        )

    async def delete(
        self,
        session: AsyncSession,
        model_instance: type[SQLModel],
    ) -> None:
        await delete_item(
            session=session,
            model_instance=model_instance,
        )

    async def update(
        self,
        session: AsyncSession,
        model_instance: SQLModel,
        model_update,
        partial: bool = False,
    ) -> SQLModel:
        return await update_item(
            session=session,
            model_instance=model_instance,
            model_update=model_update,
            partial=partial,
        )
