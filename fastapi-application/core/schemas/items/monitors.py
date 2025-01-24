from datetime import datetime
from uuid import UUID

from pydantic import BaseModel
from enum import Enum


class EnergyClass(str, Enum):
    Triple_A = "A+++"
    Double_A = "A++"
    Single_A = "A+"
    A = "A"
    B = "B"
    C = "C"
    D = "D"
    E = "E"
    F = "F"
    G = "G"


class MonitorBase(BaseModel):
    name: str
    maker: str
    price: float
    diagonal: float
    resolution: str
    panel_type: str
    refresh_rate: int
    image: str
    is_available: bool

    class Config:
        from_attributes = True


class MonitorPreview(MonitorBase):
    pass


class MonitorPreviewWithID(MonitorBase):
    id: UUID


class Image(BaseModel):
    url: str


class MonitorCreate(MonitorBase):
    description: str
    images_url: list[Image]
    # Tech details
    brightness: int
    response_time: int
    contrast_ratio: str
    aspect_ratio: str
    color_gamut: int | None = None
    # Connectivity
    hdmi_connection: int | None = None
    dp_connection: int | None = None
    jack_connection: int | None = None
    vga_connection: int | None = None
    usb_2: int | None = None
    usb_type_c: int | None = None
    usb_type_c_thunderbolt: int | None = None
    # Extra info
    is_curved: bool
    vesa_mounting: str
    has_speaker: bool | None = None
    pivot: bool | None = None
    is_adjustable_height: bool | None = None
    has_touchscreen: bool | None = None
    accessories: str | None = None

    energy_class: EnergyClass | None = None

    # Dimensions mm
    width: float | None = None
    height: float | None = None
    depth: float | None = None
    weight: float | None = None

    warranty: int  # months


class MonitorUpdate(MonitorCreate):
    pass


class MonitorUpdatePartial(MonitorUpdate):
    name: str | None = None
    maker: str | None = None
    price: float | None = None
    diagonal: float | None = None
    resolution: str | None = None
    panel_type: str | None = None
    refresh_rate: int | None = None
    image: str | None = None
    is_available: bool | None = None
    description: str | None = None
    images_url: list[Image] | None = None
    # Tech details
    brightness: int | None = None
    response_time: int | None = None
    contrast_ratio: str | None = None
    aspect_ratio: str | None = None
    is_curved: bool | None = None
    vesa_mounting: str | None = None
    warranty: int | None = None


class MonitorFullModel(MonitorCreate):
    id: UUID


class MonitorDetail(MonitorCreate):
    user_id: int
    created_at: datetime
    updated_at: datetime
