from main import main_app
from fastapi.testclient import TestClient

client = TestClient(main_app)


def test_healthcheck() -> None:
    response = client.get("/utils/health-check")
    assert response.status_code == 200
