from datetime import datetime
from typing import TYPE_CHECKING

from fastapi_users.db import (
    SQLAlchemyUserDatabase,
    SQLAlchemyBaseUserTable,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base
from .mixins.int_id_pk import IntIdPkMixin

from core.types.user_id import UserIdType

if TYPE_CHECKING:
    from sqlalchemy.ext.asyncio import AsyncSession
    from core.models.items import Laptop, Monitor, DesktopPC


class User(
    Base,
    IntIdPkMixin,
    SQLAlchemyBaseUserTable[UserIdType],
):
    username: Mapped[str] = mapped_column(
        unique=True,
        index=True,
    )
    first_name: Mapped[str]
    last_name: Mapped[str]
    created_at: Mapped[datetime] = mapped_column(
        default=datetime.now,
    )
    updated_at: Mapped[datetime] = mapped_column(
        default=datetime.now,
        onupdate=datetime.now,
    )

    phone_number: Mapped[str]
    laptops: Mapped[list["Laptop"]] = relationship(
        cascade="all, delete-orphan", back_populates="user"
    )
    monitors: Mapped[list["Monitor"]] = relationship(
        cascade="all, delete-orphan", back_populates="user"
    )
    desktoppcs: Mapped[list["DesktopPC"]] = relationship(
        cascade="all, delete-orphan", back_populates="user"
    )

    @classmethod
    def get_db(cls, session: "AsyncSession"):
        return SQLAlchemyUserDatabase(session, cls)
