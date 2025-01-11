from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from uuid import UUID


class LaptopBase(BaseModel):
    name: str
    price: float
    diagonal: str
    resolution: str
    screen_type: Optional[str]
    cpu_model: str
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
    screen_frequency: Optional[str]
    # CPU
    # cpu_maker: str
    cpu_class: str
    cpu_frequency: Optional[str]
    cpu_cores: Optional[int]
    cpu_threads: Optional[int]
    # GPU
    # gpu_maker: Optional[str]
    gpu_model: Optional[str]
    # gpu_memory: Optional[int]
    gpu_memory: Optional[str]
    gpu_memory_type: Optional[str]
    # RAM
    # ram_size: Optional[int]
    ram_size: Optional[str]
    ram_type: Optional[str]
    # ram_frequency: Optional[int]
    ram_frequency: Optional[str]
    # Storage
    # storage_size: Optional[int]
    storage_size: Optional[str]
    storage_type: Optional[str]
    # Hardware
    hardware_type: Optional[str]

    # warranty: Optional[int]
    warranty: Optional[str]
    installed_os: Optional[str]
    weight: float
    color: Optional[str]
    description: Optional[str]
    extra_image: Optional[str]


class LaptopUpdate(LaptopCreate):
    pass


class LaptopUpdatePartial(LaptopUpdate):
    name: Optional[str] = None
    price: Optional[float] = None
    diagonal: Optional[str] = None
    resolution: Optional[str] = None
    screen_type: Optional[str] = None
    cpu_model: Optional[str] = None
    image: Optional[str] = None
    is_available: Optional[bool] = None

    maker: Optional[str] = None
    screen_frequency: Optional[str] = None
    # CPU
    cpu_class: Optional[str] = None
    cpu_frequency: Optional[str] = None
    cpu_cores: Optional[int] = None
    cpu_threads: Optional[int] = None
    # GPU
    gpu_model: Optional[str] = None
    gpu_memory: Optional[str] = None
    gpu_memory_type: Optional[str] = None
    # RAM
    ram_size: Optional[str] = None
    ram_type: Optional[str] = None
    ram_frequency: Optional[str] = None
    # Storage
    storage_size: Optional[str] = None
    storage_type: Optional[str] = None
    # Hardware
    hardware_type: Optional[str] = None

    warranty: Optional[str] = None
    installed_os: Optional[str] = None
    weight: Optional[float] = None
    color: Optional[str] = None
    description: Optional[str] = None
    extra_image: Optional[str] = None


class LaptopFullModel(LaptopCreate):
    id: UUID


class LaptopDetail(LaptopCreate):
    user_id: int
    created_at: datetime
    updated_at: datetime
