"""drop laptop table

Revision ID: fb28fc5b45d0
Revises: f4584e824c7c
Create Date: 2025-01-17 22:07:13.173980

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "fb28fc5b45d0"
down_revision: Union[str, None] = "f4584e824c7c"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_table("laptops")


def downgrade() -> None:
    pass
