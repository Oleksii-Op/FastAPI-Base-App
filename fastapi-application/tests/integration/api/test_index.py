from fastapi.testclient import TestClient
from main import main_app

client = TestClient(main_app)


def test_index_page() -> None:
    response = client.get("/index")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello, user!"}
