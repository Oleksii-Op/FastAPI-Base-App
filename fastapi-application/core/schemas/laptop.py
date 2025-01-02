from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from uuid import UUID


class LaptopPreview(BaseModel):
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


class LaptopCreate(LaptopPreview):
    maker: str
    screen_frequency: Optional[str]
    # CPU
    cpu_class: str
    cpu_frequency: Optional[str]
    cpu_cores: Optional[int]
    cpu_threads: Optional[int]
    # GPU
    gpu_model: Optional[str]
    gpu_memory: Optional[str]
    gpu_memory_type: Optional[str]
    # RAM
    ram_size: Optional[str]
    ram_type: Optional[str]
    ram_frequency: Optional[str]
    # Storage
    storage_size: Optional[str]
    storage_type: Optional[str]
    # Hardware
    hardware_type: Optional[str]

    warranty: Optional[str]
    installed_os: Optional[str]
    weight: float
    color: Optional[str]
    description: Optional[str]
    extra_image: Optional[str]


class LaptopFullModel(LaptopCreate):
    id: UUID


class LaptopPreviewModelWithID(LaptopPreview):
    id: UUID


class LaptopDetail(LaptopCreate):
    user_id: int
    created_at: datetime
    updated_at: datetime
