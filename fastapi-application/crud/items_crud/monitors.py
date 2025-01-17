from core.models.items import Monitor
from crud.items_crud.crud_helper import CRUDBase

# crud_monitor: CRUDBase[Monitor] = CRUDBase(Monitor)
# crud_monitor = CRUDBase[Monitor](Monitor)


class CRUDMonitor(CRUDBase[Monitor]):
    pass


crud_monitor = CRUDMonitor(model=Monitor)
