import pytest
from pydantic import ValidationError
from core.schemas.user import UserCreate


def test_wrong_email_create_user() -> None:
    with pytest.raises(ValidationError) as exc_info:
        UserCreate(
            email="wrong_email.com",
            username="TestUser",
            first_name="TestFirstName",
            last_name="TestLastName",
            password="testpassword",
            phone_number="+380992321454",
            is_active=True,
            is_superuser=False,
            is_verified=False,
        )

    assert "value is not a valid email address" in str(exc_info.value)


def test_correct_create_user() -> None:
    user = UserCreate(
        email="testuser@example.com",
        username="TestUser",
        first_name="TestFirstName",
        last_name="TestLastName",
        password="testpassword",
        phone_number="+380992321454",
        is_active=True,
        is_superuser=False,
        is_verified=False,
    )

    assert user.email == "testuser@example.com"
    assert user.username == "TestUser"
    assert user.first_name == "TestFirstName"
    assert user.last_name == "TestLastName"
    assert user.password == "testpassword"
    assert user.phone_number == "+380992321454"
    assert user.is_active is True
    assert user.is_superuser is False
    assert user.is_verified is False


def test_too_short_username_create_user() -> None:
    with pytest.raises(ValidationError) as exc_info:
        UserCreate(
            email="testuser@example.com",
            username="User",
            first_name="TestFirstName",
            last_name="TestLastName",
            password="testpassword",
            phone_number="+380992321454",
            is_active=True,
            is_superuser=False,
            is_verified=False,
        )
        assert "String should have at least 8 characters" in str(exc_info.value)


def test_too_long_username_create_user() -> None:
    with pytest.raises(ValidationError) as exc_info:
        UserCreate(
            email="testuser@example.com",
            username="UserWithVeryLongUsername",
            first_name="TestFirstName",
            last_name="TestLastName",
            password="testpassword",
            phone_number="+380992321454",
            is_active=True,
            is_superuser=False,
            is_verified=False,
        )
        assert "String should have at most 20 characters" in str(exc_info.value)


def test_wrong_phonenumber_create_user() -> None:
    with pytest.raises(ValidationError) as exc_info:
        UserCreate(
            email="testuser@example.com",
            username="TestUser",
            first_name="TestFirstName",
            last_name="TestLastName",
            password="testpassword",
            phone_number="random_data",
            is_active=True,
            is_superuser=False,
            is_verified=False,
        )
    assert "Invalid phone number:" in str(exc_info.value)
