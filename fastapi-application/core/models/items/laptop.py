from typing import TYPE_CHECKING, Optional
from uuid import UUID, uuid4
from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models import Base

if TYPE_CHECKING:
    from core.models import User


class Laptop(Base):
    id: Mapped[UUID] = mapped_column(
        default=uuid4,
        primary_key=True,
    )
    name: Mapped[str] = mapped_column()
    price: Mapped[float] = mapped_column()
    # Screen
    screen_frequency: Mapped[Optional[str]]
    diagonal: Mapped[str] = mapped_column()
    resolution: Mapped[str] = mapped_column()
    screen_type: Mapped[Optional[str]]
    # CPU
    cpu_model: Mapped[str]
    cpu_class: Mapped[str]
    cpu_frequency: Mapped[Optional[str]]
    cpu_cores: Mapped[Optional[int]]
    cpu_threads: Mapped[Optional[int]]
    # GPU
    gpu_model: Mapped[Optional[str]]
    gpu_memory: Mapped[Optional[str]]
    gpu_memory_type: Mapped[Optional[str]]
    # RAM
    ram_size: Mapped[Optional[str]]
    ram_type: Mapped[Optional[str]]
    ram_frequency: Mapped[Optional[str]]
    # Storage
    storage_size: Mapped[Optional[str]]
    storage_type: Mapped[Optional[str]]
    # Hardware
    hardware_type: Mapped[Optional[str]]

    is_available: Mapped[bool]
    maker: Mapped[str] = mapped_column()

    warranty: Mapped[Optional[str]]
    installed_os: Mapped[Optional[str]]
    weight: Mapped[float] = mapped_column()
    color: Mapped[Optional[str]]
    description: Mapped[Optional[str]]
    # Images
    image: Mapped[str] = mapped_column()
    extra_image: Mapped[Optional[str]]

    created_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow,
        index=True,
    )
    updated_at: Mapped[datetime] = mapped_column(
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
    )
    user: Mapped["User"] = relationship(
        back_populates="laptops",
    )
