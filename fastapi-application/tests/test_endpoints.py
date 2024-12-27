from fastapi.testclient import TestClient
from main import main_app

client = TestClient(main_app)


def test_index_page():
    response = client.get("/index")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello, user!"}


def test_root():
    response = client.get("/")
    assert response.status_code == 404
    assert response.json() == {"detail": "Not Found"}


def test_users_me():
    response = client.get("api/v1/users/me")
    response.headers["accept"] = "application/json"
    assert response.status_code == 401
    assert response.json() == {"detail": "Unauthorized"}


def test_auth_wrong_email_register():
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "lox@.com",
            "password": "qwerty123456",
            "is_active": True,
            "is_superuser": False,
            "is_verified": False,
            "username": "QWERTY12",
            "first_name": "QWERTY12",
            "last_name": "QWERTY12",
            "phone_number": "+380442821950",
        },
    )
    response.headers["accept"] = "application/json"
    response.headers["Content-Type"] = "application/json"
    assert response.status_code == 422
