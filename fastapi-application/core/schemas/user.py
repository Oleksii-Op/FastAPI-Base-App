from __future__ import annotations
from datetime import datetime
from pydantic import Field, field_validator
from fastapi_users import schemas

from core.types.user_id import UserIdType

from phonenumbers import (
    is_possible_number,
    parse,
    NumberParseException,
)


class UserRead(schemas.BaseUser[UserIdType]):
    username: str
    first_name: str
    last_name: str
    updated_at: datetime
    phone_number: str


class UserCreate(schemas.BaseUserCreate):
    username: str = Field(
        max_length=20,
        min_length=8,
    )
    first_name: str = Field(
        max_length=20,
    )
    last_name: str = Field(
        max_length=20,
    )
    phone_number: str

    @field_validator("phone_number")
    @classmethod
    def validate_phone_number(
        cls,
        number: str,
    ) -> str:
        # if isinstance(number, str):
        #     return number
        try:
            check_num = parse(number, None)
        except NumberParseException as ex:
            raise ValueError(f"Invalid phone number: {number}") from ex
        if not is_possible_number(check_num):
            raise ValueError(f"Invalid phone number: {number}")
        return number


class UserUpdate(schemas.BaseUserUpdate):
    username: str = Field(
        max_length=20,
        min_length=8,
    )
    first_name: str = Field(
        max_length=20,
    )
    last_name: str = Field(
        max_length=20,
    )
