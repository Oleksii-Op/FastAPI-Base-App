from uuid import UUID
from typing import Annotated, List, Sequence
from fastapi import (
    APIRouter,
    status,
    Path,
    Query,
    Depends,
    HTTPException,
)
from sqlalchemy.ext.asyncio import AsyncSession

from api.api_v1.check_perms_loggin import check_if_item_belongs
from api.api_v1.items.filters.monitor_filter import (
    MonitorFilterParams,
    get_monitors_filter,
    get_monitor_attrs,
)
from api.dependencies.authentication.fastapi_users_ import (
    current_verified_user,
)
from core.config import settings
from core.models import User
from core.models.items import Monitor
from core.schemas.items import (
    MonitorCreate,
    MonitorFullModel,
    MonitorPreviewWithID,
    MonitorUpdatePartial,
)
from crud.items_crud.monitors import crud_monitor as crud_monitor_class
from core.models import db_helper
from core.redis_helper import redis
import orjson

user_state = current_verified_user
router = APIRouter(
    prefix=settings.api.v1.monitors,
    tags=["Monitors"],
)


@router.get(
    "/get-unique-attrs",
)
async def get_unique_monitor_attr(
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ]
):
    cached_data = await redis.get("monitors_attrs")
    if cached_data:
        return orjson.loads(cached_data)
    result = await get_monitor_attrs(
        session=session,
    )
    await redis.set(
        "monitors_attrs",
        orjson.dumps(result),
        ex=settings.redis.redis_expire,
    )
    return result


@router.post(
    "/create-monitor",
    response_model=MonitorCreate,
    status_code=status.HTTP_201_CREATED,
)
async def create_monitor(
    user: Annotated[
        User,
        Depends(user_state),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    model_in: MonitorCreate,
):
    return await crud_monitor_class.create(
        session,
        user_id=user.id,
        data=model_in.model_dump(),
    )


@router.get(
    "/get-monitor-by-uuid/{uuid}",
    response_model=MonitorFullModel,
)
async def get_monitor_by_uuid(
    uuid: Annotated[UUID, Path],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
) -> Monitor | None:
    monitor: Monitor = await crud_monitor_class.get_by_uuid(
        session=session,
        item_uuid=uuid,
    )
    if monitor is not None:
        return monitor
    raise HTTPException(
        status_code=404,
        detail=f"Monitor {uuid} not found",
    )


@router.get(
    "/get-monitors-filtered/",
    response_model=List[MonitorPreviewWithID],
)
async def get_monitors_filtered(
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    filters: MonitorFilterParams = Depends(),
    offset: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
) -> Sequence[Monitor]:
    result: Sequence[Monitor] = await get_monitors_filter(
        session=session,
        filters=filters,
        offset=offset,
        limit=limit,
    )
    return result


@router.get(
    "/get-monitors-detail",
    response_model=list[MonitorFullModel],
)
async def get_monitors_detail(
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    offset: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
) -> Sequence["Monitor"] | None:
    return await crud_monitor_class.get_all(
        session=session,
        offset=offset,
        limit=limit,
    )


@router.get(
    "/get-all-monitors-preview/",
    response_model=list[MonitorPreviewWithID],
)
async def get_all_monitors_preview(
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
):
    return await crud_monitor_class.get_all(
        session=session,
    )


@router.get(
    "/get-monitors-preview/",
    response_model=list[MonitorPreviewWithID],
)
async def get_monitors_preview(
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
    offset: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
) -> Sequence["Monitor"] | None:
    monitors: Sequence["Monitor"] = await crud_monitor_class.get_all(
        session=session,
        offset=offset,
        limit=limit,
    )
    return monitors


@router.get(
    "/get-my-monitors",
    response_model=list[MonitorPreviewWithID],
)
async def get_my_monitors(
    user: Annotated[
        User,
        Depends(user_state),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
) -> Sequence[Monitor] | None:
    return await crud_monitor_class.get_users(
        session=session,
        user_id=user.id,
    )


@router.patch(
    "/patch-monitor/{uuid}",
    response_model=MonitorUpdatePartial,
)
async def update_monitor_partial(
    uuid: Annotated[
        UUID,
        Path,
    ],
    monitor_update: MonitorUpdatePartial,
    user: Annotated[
        User,
        Depends(user_state),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
) -> Monitor:
    monitor: Monitor | None = await crud_monitor_class.get_by_uuid(
        session=session,
        item_uuid=uuid,
    )
    check_if_item_belongs(
        user=user,
        model=monitor,
        message="updated",
    )
    return await crud_monitor_class.update(
        session=session,
        model_update=monitor_update,
        model_instance=monitor,
        partial=True,
    )


@router.delete(
    "/delete-monitor/{uuid}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_monitor(
    uuid: Annotated[UUID, Path],
    user: Annotated[
        User,
        Depends(user_state),
    ],
    session: Annotated[
        AsyncSession,
        Depends(db_helper.session_getter),
    ],
) -> None:
    monitor: Monitor = await crud_monitor_class.get_by_uuid(
        session=session,
        item_uuid=uuid,
    )
    check_if_item_belongs(
        user=user,
        model=monitor,
        message="deleted",
    )
    await crud_monitor_class.delete(
        session=session,
        model_instance=monitor,
    )
