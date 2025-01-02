from fastapi.testclient import TestClient
from main import main_app


client = TestClient(main_app)


def test_denied_users_me() -> None:
    response = client.get("api/v1/users/me")
    response.headers["accept"] = "application/json"
    assert response.status_code == 401
    assert response.json() == {"detail": "Unauthorized"}
