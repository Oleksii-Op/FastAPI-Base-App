"""Added phone number field

Revision ID: 8a21a0ba53c3
Revises: 8177e32cf823
Create Date: 2024-08-07 22:28:11.491811

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "8a21a0ba53c3"
down_revision: Union[str, None] = "8177e32cf823"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("users", sa.Column("phone_number", sa.String(), nullable=False))


def downgrade() -> None:
    op.drop_column("users", "phone_number")
