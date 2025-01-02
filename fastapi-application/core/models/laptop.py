from typing import TYPE_CHECKING
from uuid import UUID, uuid4
from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .user import User
from .base import Base

if TYPE_CHECKING:
    from .user import User


class Laptop(Base):
    id: Mapped[UUID] = mapped_column(
        default=uuid4,
        primary_key=True,
    )
    name: Mapped[str]
    price: Mapped[float] = mapped_column()
    # Screen
    screen_frequency: Mapped[str]
    diagonal: Mapped[str]
    resolution: Mapped[str]
    screen_type: Mapped[str]
    # CPU
    cpu_model: Mapped[str]
    cpu_class: Mapped[str] = mapped_column()
    cpu_frequency: Mapped[str] = mapped_column()
    # GPU
    gpu_model: Mapped[str] = mapped_column()
    gpu_memory: Mapped[str] = mapped_column()
    # RAM
    ram_size: Mapped[str] = mapped_column()
    ram_type: Mapped[str] = mapped_column()
    ram_frequency: Mapped[str] = mapped_column()

    is_available: Mapped[bool]
    maker: Mapped[str]

    storage_size: Mapped[str] = mapped_column()
    installed_os: Mapped[str] = mapped_column()
    weight: Mapped[float] = mapped_column()
    color: Mapped[str] = mapped_column()
    description: Mapped[str] = mapped_column()
    # Images
    image: Mapped[str] = mapped_column()
    extra_image: Mapped[str] = mapped_column()

    created_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow,
        index=True,
    )
    updated_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship(back_populates="laptops")
