from typing import TypeVar
from core.models import Laptop, Monitor, DesktopPC
from pydantic import BaseModel

SQLModel = TypeVar(
    "SQLModel",
    Monitor,
    Laptop,
    DesktopPC,
)
Update = TypeVar(
    "Update",
    bound=BaseModel,
)
UpdatePartial = TypeVar(
    "UpdatePartial",
    bound=BaseModel,
)
