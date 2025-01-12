from core.models import DesktopPC
from crud.items_crud.crud_helper import CRUDBase


class CRUDDesktop(CRUDBase[DesktopPC]):
    pass


crud_desktop = CRUDDesktop(model=DesktopPC)
