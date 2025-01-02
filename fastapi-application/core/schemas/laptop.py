from pydantic import BaseModel
from uuid import UUID


class LaptopPreview(BaseModel):
    id: UUID
    name: str
    price: float
    diagonal: str
    resolution: str
    screen_type: str
    cpu_model: str
    image: str
    is_available: bool

    class Config:
        from_attributes = True


class LaptopCreate(LaptopPreview):
    maker: str
    screen_frequency: str
    cpu_class: str
    cpu_frequency: str
    gpu_model: str
    gpu_memory: str
    ram_size: str
    ram_type: str
    ram_frequency: str
    storage_size: str
    installed_os: str
    weight: float
    color: str
    description: str
    extra_image: str


class LaptopDetail(LaptopCreate):
    user_id: int
