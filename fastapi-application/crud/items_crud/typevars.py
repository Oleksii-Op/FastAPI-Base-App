from typing import TypeVar
from core.models import Laptop, Monitor
from pydantic import BaseModel

SQLModel = TypeVar("SQLModel", Monitor, Laptop)
Update = TypeVar("Update", bound=BaseModel)
UpdatePartial = TypeVar("UpdatePartial", bound=BaseModel)