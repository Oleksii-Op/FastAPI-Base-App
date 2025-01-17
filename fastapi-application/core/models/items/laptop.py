from typing import TYPE_CHECKING, Optional
from uuid import UUID, uuid4
from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models import Base

if TYPE_CHECKING:
    from core.models import User


class Laptop(Base):
    id: Mapped[UUID] = mapped_column(
        default=uuid4,
        primary_key=True,
    )
    name: Mapped[str]
    price: Mapped[float]
    maker: Mapped[str]
    # Screen
    screen_frequency: Mapped[Optional[int]]
    diagonal: Mapped[Optional[float]]
    resolution: Mapped[Optional[str]]
    screen_type: Mapped[Optional[str]]
    # CPU
    cpu_maker: Mapped[str]
    cpu_model: Mapped[Optional[str]]
    cpu_class: Mapped[Optional[str]]
    cpu_frequency: Mapped[Optional[float]]
    cpu_max_frequency: Mapped[Optional[float]]
    cpu_cores: Mapped[Optional[int]]
    cpu_threads: Mapped[Optional[int]]
    # GPU
    gpu_maker: Mapped[Optional[str]]
    gpu_model: Mapped[Optional[str]]
    gpu_memory: Mapped[Optional[int]]
    gpu_memory_type: Mapped[Optional[str]]
    # RAM
    ram_size: Mapped[Optional[int]]
    ram_type: Mapped[Optional[str]]
    ram_frequency: Mapped[Optional[int]]
    # Storage
    storage_size: Mapped[Optional[int]]
    storage_type: Mapped[Optional[str]]
    # Hardware
    extra_hardware: Mapped[Optional[str]]
    usb_a_2_0: Mapped[Optional[int]]
    usb_a_3_1: Mapped[Optional[int]]
    usb_type_c: Mapped[Optional[int]]
    vga_connection: Mapped[Optional[int]]
    hdmi_connection: Mapped[Optional[int]]
    dp_connection: Mapped[Optional[int]]
    # Connectivity
    ethernet: Mapped[Optional[int]]
    bluetooth: Mapped[Optional[str]]
    wireless: Mapped[Optional[str]]

    is_available: Mapped[bool]
    is_for_gaming: Mapped[bool]
    is_for_home_studying: Mapped[bool]
    is_for_office: Mapped[bool]

    warranty: Mapped[Optional[int]]
    installed_os: Mapped[Optional[str]]
    weight: Mapped[Optional[float]]
    width: Mapped[Optional[float]]
    height: Mapped[Optional[float]]
    depth: Mapped[Optional[float]]
    color: Mapped[Optional[str]]
    description: Mapped[Optional[str]]
    # Images
    image: Mapped[str]
    images_url: Mapped[Optional[list[str]]] = mapped_column(
        JSON,
        nullable=True,
        default=None,
    )

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
