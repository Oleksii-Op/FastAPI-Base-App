from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class Image(BaseModel):
    url: str


class DesktopPCBase(BaseModel):
    name: str
    price: float
    diagonal: float | None
    cpu_model: str | None
    # RAM
    ram_size: int | None
    # Storage
    storage_size: int | None
    # GPU
    gpu_maker: str | None
    gpu_model: str | None
    image: str
    is_available: bool

    class Config:
        from_attributes = True


class DesktopPCPreview(DesktopPCBase):
    pass


class DesktopPCPreviewModelWithID(DesktopPCPreview):
    id: UUID


class DesktopPCCreate(DesktopPCBase):
    description: str
    maker: str
    is_for_gaming: bool
    is_for_home_studying: bool
    is_for_office: bool
    has_screen: bool
    is_mini: bool
    # RAM
    ram_type: str | None
    ram_frequency: int | None
    # CPU
    cpu_maker: str
    cpu_class: str | None
    cpu_frequency: float | None
    cpu_max_frequency: float | None
    cpu_cores: int | None
    cpu_threads: int | None
    # IF HAS SCREEN
    resolution: str | None
    # GPU
    gpu_memory: int | None
    gpu_memory_type: str | None
    # POWER
    power_supply_name: str | None
    power_supply: int | None
    # Storage
    storage_type: str | None
    storage_connection: str | None
    # Hardware and ports
    extra_hardware: str | None
    usb_a_2_0: int | None
    usb_a_3_1: int | None
    usb_type_c: int | None
    vga_connection: int | None
    hdmi_connection: int | None
    dp_connection: int | None
    # PC Case
    case_name: str | None
    case_type: str | None
    motherboard: str | None
    # Connectivity
    ethernet: int | None
    bluetooth: str | None
    wireless: str | None

    warranty: int | None
    installed_os: str | None
    weight: float | None
    width: float | None
    height: float | None
    depth: float | None
    color: str | None
    images_url: list[Image] | None


class DesktopPCUpdate(DesktopPCCreate):
    pass


class DesktopPCUpdatePartial(DesktopPCCreate):
    pass


class DesktopPCFullModel(DesktopPCCreate):
    pass


class DesktopPCDetail(DesktopPCCreate):
    user_id: int
    created_at: datetime
    updated_at: datetime
