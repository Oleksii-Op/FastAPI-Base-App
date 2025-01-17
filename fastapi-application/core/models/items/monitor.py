from datetime import datetime
from typing import Optional, TYPE_CHECKING
from uuid import UUID, uuid4
from sqlalchemy import Enum, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import JSON
from core.models import Base
from core.schemas.items.monitors import EnergyClass

if TYPE_CHECKING:
    from core.models import User

pgEnum = Enum(
    EnergyClass,
    name="energy_class_enum",
)


class Monitor(Base):
    id: Mapped[UUID] = mapped_column(
        default=uuid4,
        primary_key=True,
    )
    name: Mapped[str]
    maker: Mapped[str]
    price: Mapped[float]
    diagonal: Mapped[float]
    resolution: Mapped[str]
    panel_type: Mapped[str]
    refresh_rate: Mapped[int]
    image: Mapped[str]
    is_available: Mapped[bool]

    images_url: Mapped[Optional[list[str]]] = mapped_column(
        JSON,
        nullable=True,
        default=None,
    )
    description: Mapped[str] = mapped_column(Text)
    # Tech details
    brightness: Mapped[int]
    response_time: Mapped[int]
    contrast_ratio: Mapped[str]
    aspect_ratio: Mapped[str]
    color_gamut: Mapped[Optional[int]]
    # Connectivity
    hdmi_connection: Mapped[Optional[int]]
    dp_connection: Mapped[Optional[int]]
    jack_connection: Mapped[Optional[int]]
    vga_connection: Mapped[Optional[int]]
    usb_2: Mapped[Optional[int]]
    usb_type_c: Mapped[Optional[int]]
    usb_type_c_thunderbolt: Mapped[Optional[int]]
    # Extra info
    is_curved: Mapped[bool]
    vesa_mounting: Mapped[str]
    has_speaker: Mapped[Optional[bool]]
    pivot: Mapped[Optional[bool]]
    is_adjustable_height: Mapped[Optional[bool]]
    has_touchscreen: Mapped[Optional[bool]]
    accessories: Mapped[Optional[str]]

    energy_class: Mapped[EnergyClass] = mapped_column(
        pgEnum,
        nullable=True,
    )

    # Dimensions mm
    width: Mapped[Optional[float]]
    height: Mapped[Optional[float]]
    depth: Mapped[Optional[float]]
    weight: Mapped[Optional[float]]

    warranty: Mapped[Optional[int]]

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
        back_populates="monitors",
    )
