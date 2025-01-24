from datetime import datetime
from pydantic import BaseModel
from uuid import UUID

from core.schemas.items.desktop_pc import Image


class LaptopBase(BaseModel):
    name: str
    price: float
    diagonal: float
    resolution: str
    screen_type: str | None
    cpu_model: str | None
    image: str
    is_available: bool

    class Config:
        from_attributes = True


class LaptopPreview(LaptopBase):
    pass


class LaptopPreviewModelWithID(LaptopPreview):
    id: UUID


class LaptopCreate(LaptopBase):
    maker: str
    screen_frequency: int | None
    # CPU
    cpu_maker: str
    cpu_class: str | None
    cpu_frequency: float | None
    cpu_max_frequency: float | None
    cpu_cores: int | None
    cpu_threads: int | None
    # GPU
    gpu_maker: str | None
    gpu_model: str | None
    gpu_memory: int | None
    gpu_memory_type: str | None
    # RAM
    ram_size: int | None
    ram_type: str | None
    ram_frequency: int | None
    # Storage
    storage_size: int | None
    storage_type: str | None
    # Hardware
    extra_hardware: str | None
    usb_a_2_0: int | None
    usb_a_3_1: int | None
    usb_type_c: int | None
    vga_connection: int | None
    hdmi_connection: int | None
    dp_connection: int | None
    # Connectivity
    ethernet: int | None
    bluetooth: str | None
    wireless: str | None

    is_for_gaming: bool
    is_for_home_studying: bool
    is_for_office: bool

    warranty: int | None
    installed_os: str | None
    weight: float | None
    width: float | None
    height: float | None
    depth: float | None
    color: str | None
    description: str | None
    images_url: list[Image] | None


class LaptopUpdate(LaptopCreate):
    pass


class LaptopUpdatePartial(LaptopUpdate):
    name: str | None = None
    price: float | None = None
    diagonal: float | None = None
    resolution: str | None = None
    screen_type: str | None = None
    cpu_model: str | None = None
    image: str | None = None
    is_available: bool | None = None

    maker: str | None = None
    screen_frequency: int | None = None
    # CPU
    cpu_maker: str | None = None
    cpu_class: str | None = None
    cpu_frequency: float | None = None
    cpu_max_frequency: float | None = None
    cpu_cores: int | None = None
    cpu_threads: int | None = None
    # GPU
    gpu_maker: str | None = None
    gpu_model: str | None = None
    gpu_memory: int | None = None
    gpu_memory_type: str | None = None
    # RAM
    ram_size: int | None = None
    ram_type: str | None = None
    ram_frequency: int | None = None
    # Storage
    storage_size: int | None = None
    storage_type: str | None = None
    # Hardware
    extra_hardware: str | None = None
    usb_a_2_0: int | None = None
    usb_a_3_1: int | None = None
    usb_type_c: int | None = None
    vga_connection: int | None = None
    hdmi_connection: int | None = None
    dp_connection: int | None = None
    # Connectivity
    ethernet: int | None = None
    bluetooth: str | None = None
    wireless: str | None = None

    is_for_gaming: bool | None = None
    is_for_home_studying: bool | None = None
    is_for_office: bool | None = None

    warranty: int | None = None
    installed_os: str | None = None
    weight: float | None = None
    width: float | None = None
    height: float | None = None
    depth: float | None = None
    color: str | None = None
    description: str | None = None
    images_url: list[Image] | None = None


class LaptopFullModel(LaptopCreate):
    id: UUID


class LaptopDetail(LaptopCreate):
    user_id: int
    created_at: datetime
    updated_at: datetime
