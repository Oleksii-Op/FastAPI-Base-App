"""create laptop model

Revision ID: 66983ff6a075
Revises: 54e5bb89802b
Create Date: 2025-01-02 06:21:34.318019

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "66983ff6a075"
down_revision: Union[str, None] = "54e5bb89802b"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "laptops", sa.Column("user_id", sa.Integer(), nullable=False)
    )
    op.drop_constraint(
        "fk_laptops_created_by_id_users", "laptops", type_="foreignkey"
    )
    op.create_foreign_key(
        op.f("fk_laptops_user_id_users"),
        "laptops",
        "users",
        ["user_id"],
        ["id"],
    )
    op.drop_column("laptops", "created_by_id")
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "laptops",
        sa.Column(
            "created_by_id", sa.INTEGER(), autoincrement=False, nullable=False
        ),
    )
    op.drop_constraint(
        op.f("fk_laptops_user_id_users"), "laptops", type_="foreignkey"
    )
    op.create_foreign_key(
        "fk_laptops_created_by_id_users",
        "laptops",
        "users",
        ["created_by_id"],
        ["id"],
    )
    op.drop_column("laptops", "user_id")
    # ### end Alembic commands ###
