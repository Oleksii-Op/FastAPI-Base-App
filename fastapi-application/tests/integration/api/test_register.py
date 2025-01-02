from fastapi.testclient import TestClient
from main import main_app

client = TestClient(main_app)


def test_auth_right_register() -> None:
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "exampleuser@example.com",
            "password": "qwerty123456",
            "is_active": True,
            "is_superuser": False,
            "is_verified": False,
            "username": "ExampleUser",
            "first_name": "ExampleUser",
            "last_name": "ExampleUser",
            "phone_number": "+380442821950",
        },
    )
    response.headers["accept"] = "application/json"
    response.headers["Content-Type"] = "application/json"
    assert response.status_code == 201


def test_too_short_username_register() -> None:
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "exampleuser@example.com",
            "password": "qwerty123456",
            "is_active": True,
            "is_superuser": False,
            "is_verified": False,
            "username": "User",
            "first_name": "ExampleUser",
            "last_name": "ExampleUser",
            "phone_number": "+380442821950",
        },
    )
    response.headers["accept"] = "application/json"
    response.headers["Content-Type"] = "application/json"
    assert response.status_code == 422


def test_too_long_username_register() -> None:
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "exampleuser@example.com",
            "password": "qwerty123456",
            "is_active": True,
            "is_superuser": False,
            "is_verified": False,
            "username": "ExampleSuperLongUsername",
            "first_name": "ExampleUser",
            "last_name": "ExampleUser",
            "phone_number": "+380442821950",
        },
    )
    response.headers["accept"] = "application/json"
    response.headers["Content-Type"] = "application/json"
    assert response.status_code == 422


def test_wrong_email_register() -> None:
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "wrong.email.com",
            "password": "qwerty123456",
            "is_active": True,
            "is_superuser": False,
            "is_verified": False,
            "username": "ExampleUser",
            "first_name": "ExampleUser",
            "last_name": "ExampleUser",
            "phone_number": "+380442821950",
        },
    )
    response.headers["accept"] = "application/json"
    response.headers["Content-Type"] = "application/json"
    assert response.status_code == 422
