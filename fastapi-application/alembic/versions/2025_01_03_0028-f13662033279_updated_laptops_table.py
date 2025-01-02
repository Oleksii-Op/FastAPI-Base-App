"""updated laptops table

Revision ID: f13662033279
Revises: 66983ff6a075
Create Date: 2025-01-03 00:28:55.465984

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "f13662033279"
down_revision: Union[str, None] = "66983ff6a075"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:

    op.add_column("laptops", sa.Column("cpu_cores", sa.Integer(), nullable=True))
    op.add_column("laptops", sa.Column("cpu_threads", sa.Integer(), nullable=True))
    op.add_column("laptops", sa.Column("gpu_memory_type", sa.String(), nullable=True))
    op.add_column("laptops", sa.Column("storage_type", sa.String(), nullable=True))
    op.add_column("laptops", sa.Column("hardware_type", sa.String(), nullable=True))
    op.add_column("laptops", sa.Column("warranty", sa.String(), nullable=True))
    op.alter_column(
        "laptops",
        "screen_frequency",
        existing_type=sa.VARCHAR(),
        nullable=True,
    )
    op.alter_column("laptops", "screen_type", existing_type=sa.VARCHAR(), nullable=True)
    op.alter_column(
        "laptops", "cpu_frequency", existing_type=sa.VARCHAR(), nullable=True
    )
    op.alter_column("laptops", "gpu_model", existing_type=sa.VARCHAR(), nullable=True)
    op.alter_column("laptops", "gpu_memory", existing_type=sa.VARCHAR(), nullable=True)
    op.alter_column("laptops", "ram_size", existing_type=sa.VARCHAR(), nullable=True)
    op.alter_column("laptops", "ram_type", existing_type=sa.VARCHAR(), nullable=True)
    op.alter_column(
        "laptops", "ram_frequency", existing_type=sa.VARCHAR(), nullable=True
    )
    op.alter_column(
        "laptops", "storage_size", existing_type=sa.VARCHAR(), nullable=True
    )
    op.alter_column(
        "laptops", "installed_os", existing_type=sa.VARCHAR(), nullable=True
    )
    op.alter_column("laptops", "color", existing_type=sa.VARCHAR(), nullable=True)
    op.alter_column("laptops", "description", existing_type=sa.VARCHAR(), nullable=True)
    op.alter_column("laptops", "extra_image", existing_type=sa.VARCHAR(), nullable=True)


def downgrade() -> None:

    op.alter_column(
        "laptops", "extra_image", existing_type=sa.VARCHAR(), nullable=False
    )
    op.alter_column(
        "laptops", "description", existing_type=sa.VARCHAR(), nullable=False
    )
    op.alter_column("laptops", "color", existing_type=sa.VARCHAR(), nullable=False)
    op.alter_column(
        "laptops", "installed_os", existing_type=sa.VARCHAR(), nullable=False
    )
    op.alter_column(
        "laptops", "storage_size", existing_type=sa.VARCHAR(), nullable=False
    )
    op.alter_column(
        "laptops", "ram_frequency", existing_type=sa.VARCHAR(), nullable=False
    )
    op.alter_column("laptops", "ram_type", existing_type=sa.VARCHAR(), nullable=False)
    op.alter_column("laptops", "ram_size", existing_type=sa.VARCHAR(), nullable=False)
    op.alter_column("laptops", "gpu_memory", existing_type=sa.VARCHAR(), nullable=False)
    op.alter_column("laptops", "gpu_model", existing_type=sa.VARCHAR(), nullable=False)
    op.alter_column(
        "laptops", "cpu_frequency", existing_type=sa.VARCHAR(), nullable=False
    )
    op.alter_column(
        "laptops", "screen_type", existing_type=sa.VARCHAR(), nullable=False
    )
    op.alter_column(
        "laptops",
        "screen_frequency",
        existing_type=sa.VARCHAR(),
        nullable=False,
    )
    op.drop_column("laptops", "warranty")
    op.drop_column("laptops", "hardware_type")
    op.drop_column("laptops", "storage_type")
    op.drop_column("laptops", "gpu_memory_type")
    op.drop_column("laptops", "cpu_threads")
    op.drop_column("laptops", "cpu_cores")
