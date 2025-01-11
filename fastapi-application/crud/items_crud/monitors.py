from core.models.monitor import Monitor

from crud.items_crud.crud_helper import CRUDBase


class CRUDMonitor(CRUDBase[Monitor]):
    pass


crud_monitor = CRUDMonitor(model=Monitor)
