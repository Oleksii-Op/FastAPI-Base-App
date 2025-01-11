from core.models.laptop import Laptop
from crud.items_crud.crud_helper import CRUDBase


class CRUDLaptop(CRUDBase[Laptop]):
    pass


crud_laptop = CRUDLaptop(model=Laptop)