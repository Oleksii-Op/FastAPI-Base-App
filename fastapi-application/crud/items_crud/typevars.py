from typing import TypeVar
from core.models.items import Laptop, Monitor, DesktopPC
from pydantic import BaseModel

SQLModel = TypeVar(
    "SQLModel",
    Monitor,
    Laptop,
    DesktopPC,
)
# SQLModel = TypeVar("SQLModel", bound=Base)
Update = TypeVar(
    "Update",
    bound=BaseModel,
)
UpdatePartial = TypeVar(
    "UpdatePartial",
    bound=BaseModel,
)
