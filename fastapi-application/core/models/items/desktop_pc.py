from datetime import datetime
from typing import Optional, TYPE_CHECKING
from uuid import UUID, uuid4
from sqlalchemy import Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import JSON
from core.models import Base

if TYPE_CHECKING:
    from core.models import User


class DesktopPC(Base):
    id: Mapped[UUID] = mapped_column(
        default=uuid4,
        primary_key=True,
    )
    name: Mapped[str]  #
    price: Mapped[float]  #
    diagonal: Mapped[Optional[float]]  #
    cpu_model: Mapped[Optional[str]]  #
    ram_size: Mapped[Optional[int]]  #
    storage_size: Mapped[Optional[int]]  #
    gpu_maker: Mapped[Optional[str]]  #
    gpu_model: Mapped[Optional[str]]  #
    image: Mapped[str]  #
    is_available: Mapped[bool]  #

    description: Mapped[str] = mapped_column(Text)  #
    maker: Mapped[str]  #
    is_for_gaming: Mapped[bool]  #
    is_for_home_studying: Mapped[bool]  #
    is_for_office: Mapped[bool]  #
    has_screen: Mapped[bool]  #
    is_mini: Mapped[bool]  #
    ram_type: Mapped[Optional[str]]  #
    ram_frequency: Mapped[Optional[str]]  #
    cpu_maker: Mapped[str]  #
    cpu_class: Mapped[Optional[str]]  #
    cpu_frequency: Mapped[Optional[float]]  #
    cpu_max_frequency: Mapped[Optional[float]]  #
    cpu_cores: Mapped[Optional[int]]  #
    cpu_threads: Mapped[Optional[int]]  #
    resolution: Mapped[Optional[str]]  #
    gpu_memory: Mapped[Optional[int]]  #
    gpu_memory_type: Mapped[Optional[str]]  #
    power_supply_name: Mapped[Optional[str]]
    power_supply: Mapped[Optional[int]]
    storage_type: Mapped[Optional[str]]
    storage_connection: Mapped[Optional[str]]
    extra_hardware: Mapped[Optional[str]]
    usb_a_2_0: Mapped[Optional[int]]
    usb_a_3_1: Mapped[Optional[int]]
    usb_type_c: Mapped[Optional[int]]
    vga_connection: Mapped[Optional[int]]
    hdmi_connection: Mapped[Optional[int]]
    dp_connection: Mapped[Optional[int]]
    # PC Case
    case_name: Mapped[Optional[str]]
    case_type: Mapped[Optional[str]]
    motherboard: Mapped[Optional[str]]
    # Connectivity
    ethernet: Mapped[Optional[int]]
    bluetooth: Mapped[Optional[str]]
    wireless: Mapped[Optional[str]]

    warranty: Mapped[Optional[int]]
    installed_os: Mapped[Optional[str]]
    weight: Mapped[Optional[float]]
    width: Mapped[Optional[float]]
    height: Mapped[Optional[float]]
    depth: Mapped[Optional[float]]
    color: Mapped[Optional[str]]
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
        back_populates="desktoppcs",
    )
