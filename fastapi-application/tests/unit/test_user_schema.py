import pytest
from pydantic import ValidationError
from core.schemas.user import UserCreate  # type: ignore

valid_user_data = {
    "email": "testuser@example.com",
    "username": "TestUser",
    "first_name": "TestFirstName",
    "last_name": "TestLastName",
    "password": "testpassword",
    "phone_number": "+380992321454",
    "is_active": True,
    "is_superuser": False,
    "is_verified": False,
}


def test_correct_create_user() -> None:
    user = UserCreate(**valid_user_data)  # type: ignore

    assert user.email == valid_user_data["email"]
    assert user.username == valid_user_data["username"]
    assert user.first_name == valid_user_data["first_name"]
    assert user.last_name == valid_user_data["last_name"]
    assert user.password == valid_user_data["password"]
    assert user.phone_number == valid_user_data["phone_number"]
    assert user.is_active is valid_user_data["is_active"]
    assert user.is_superuser is valid_user_data["is_superuser"]
    assert user.is_verified is valid_user_data["is_verified"]


@pytest.mark.parametrize(
    "invalid_email",
    [
        "wrong_email.com",
        "plainaddress",
        "@missingusername.com",
    ],
)
def test_wrong_email_create_user(
    invalid_email: str,
) -> None:
    data = valid_user_data.copy()
    data["email"] = invalid_email

    with pytest.raises(
        ValidationError,
        match="value is not a valid email address",
    ):
        UserCreate(**data)


@pytest.mark.parametrize(
    "invalid_username, error_message",
    [
        ("User", "String should have at least 8 characters"),
        (
            "UserWithVeryLongUsername",
            "String should have at most 20 characters",
        ),
    ],
)
def test_invalid_username_create_user(
    invalid_username: str,
    error_message: str,
) -> None:
    data = valid_user_data.copy()
    data["username"] = invalid_username

    with pytest.raises(
        ValidationError,
        match=error_message,
    ):
        UserCreate(**data)


@pytest.mark.parametrize(
    "invalid_phone",
    [
        "random_data",
        "12345",
        "not_a_phone",
    ],
)
def test_wrong_phonenumber_create_user(invalid_phone: str) -> None:
    data = valid_user_data.copy()
    data["phone_number"] = invalid_phone

    with pytest.raises(
        ValidationError,
        match="Invalid phone number:",
    ):
        UserCreate(**data)
