import pytest
from pydantic import ValidationError
from core.schemas.items.laptop import LaptopCreate


valid_laptop_data = {
    "name": "Dell PowerFull Laptop",
    "price": 1000.0,
    "diagonal": 15.6,
    "resolution": "1920x1080",
    "screen_type": "IPS",
    "cpu_model": "Intel Core i7 12500H",
    "image": "https://example.com/image.png",
    "is_available": True,
    "maker": "Dell",
    "screen_frequency": 144,
    "cpu_maker": "Intel",
    "cpu_class": "Core i7",
    "cpu_frequency": 2.6,
    "cpu_max_frequency": 4.5,
    "cpu_cores": 8,
    "cpu_threads": 16,
    "gpu_maker": "NVIDIA",
    "gpu_model": "RTX 3060",
    "gpu_memory": 6,
    "gpu_memory_type": "GDDR6",
    "ram_size": 16,
    "ram_type": "DDR4",
    "ram_frequency": 3200,
    "storage_size": 512,
    "storage_type": "SSD",
    "extra_hardware": "RGB Keyboard",
    "usb_a_2_0": 2,
    "usb_a_3_1": 1,
    "usb_type_c": 1,
    "vga_connection": 0,
    "hdmi_connection": 1,
    "dp_connection": 1,
    "ethernet": 1,
    "bluetooth": "5.1",
    "wireless": "WiFi 6",
    "is_for_gaming": True,
    "is_for_home_studying": False,
    "is_for_office": True,
    "warranty": 24,
    "installed_os": "Windows 11",
    "weight": 2.5,
    "width": 35.7,
    "height": 2.1,
    "depth": 24.3,
    "color": "Black",
    "description": "Powerful gaming laptop",
    "images_url": None,
}


def test_correct_create_laptop() -> None:
    laptop = LaptopCreate(**valid_laptop_data)
    assert laptop.maker == valid_laptop_data["maker"]
    assert laptop.cpu_maker == valid_laptop_data["cpu_maker"]
    assert laptop.ram_size == valid_laptop_data["ram_size"]
    assert laptop.is_for_gaming is True


def test_invalid_screen_frequency() -> None:
    data = valid_laptop_data.copy()
    data["screen_frequency"] = -144
    with pytest.raises(ValidationError):
        LaptopCreate(**data)


@pytest.mark.parametrize(
    "invalid_price",
    [
        "thousand",
        -10.0,
        0,
    ],
)
def test_invalid_price(invalid_price) -> None:
    data = valid_laptop_data.copy()
    data["price"] = invalid_price
    with pytest.raises(ValidationError):
        LaptopCreate(**data)


@pytest.mark.parametrize(
    "invalid_cpu_cores",
    [
        "eight",
        -10,
        0,
    ],
)
def test_invalid_cpu_cores(invalid_cpu_cores) -> None:
    data = valid_laptop_data.copy()
    data["cpu_cores"] = invalid_cpu_cores
    with pytest.raises(ValidationError):
        LaptopCreate(**data)


@pytest.mark.parametrize(
    "invalid_gpu_memory",
    [
        "six",
        -6,
        0,
    ],
)
def test_invalid_gpu_memory(invalid_gpu_memory) -> None:
    data = valid_laptop_data.copy()
    data["gpu_memory"] = invalid_gpu_memory
    with pytest.raises(ValidationError):
        LaptopCreate(**data)


@pytest.mark.parametrize(
    "invalid_weight",
    [
        "heavy",
        -1.5,
        0,
    ],
)
def test_invalid_weight(invalid_weight) -> None:
    data = valid_laptop_data.copy()
    data["weight"] = invalid_weight
    with pytest.raises(ValidationError):
        LaptopCreate(**data)


@pytest.mark.parametrize(
    "invalid_warranty",
    [
        "3 months",
        "two years",
        -3,
        0,
    ],
)
def test_invalid_warranty(invalid_warranty) -> None:
    data = valid_laptop_data.copy()
    data["warranty"] = invalid_warranty
    with pytest.raises(ValidationError):
        LaptopCreate(**data)
