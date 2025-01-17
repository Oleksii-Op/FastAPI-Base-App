"""create desktop table

Revision ID: f4584e824c7c
Revises: 7b63217c66ea
Create Date: 2025-01-17 12:21:49.135332

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "f4584e824c7c"
down_revision: Union[str, None] = "7b63217c66ea"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "desktop_pcs",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("price", sa.Float(), nullable=False),
        sa.Column("diagonal", sa.Float(), nullable=True),
        sa.Column("cpu_model", sa.String(), nullable=True),
        sa.Column("ram_size", sa.Integer(), nullable=True),
        sa.Column("storage_size", sa.Integer(), nullable=True),
        sa.Column("gpu_maker", sa.String(), nullable=True),
        sa.Column("gpu_model", sa.String(), nullable=True),
        sa.Column("image", sa.String(), nullable=False),
        sa.Column("is_available", sa.Boolean(), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("maker", sa.String(), nullable=False),
        sa.Column("is_for_gaming", sa.Boolean(), nullable=False),
        sa.Column("is_for_home_studying", sa.Boolean(), nullable=False),
        sa.Column("is_for_office", sa.Boolean(), nullable=False),
        sa.Column("has_screen", sa.Boolean(), nullable=False),
        sa.Column("is_mini", sa.Boolean(), nullable=False),
        sa.Column("ram_type", sa.String(), nullable=True),
        sa.Column("ram_frequency", sa.Integer(), nullable=True),
        sa.Column("cpu_maker", sa.String(), nullable=False),
        sa.Column("cpu_class", sa.String(), nullable=True),
        sa.Column("cpu_frequency", sa.Float(), nullable=True),
        sa.Column("cpu_max_frequency", sa.Float(), nullable=True),
        sa.Column("cpu_cores", sa.Integer(), nullable=True),
        sa.Column("cpu_threads", sa.Integer(), nullable=True),
        sa.Column("resolution", sa.String(), nullable=True),
        sa.Column("gpu_memory", sa.Integer(), nullable=True),
        sa.Column("gpu_memory_type", sa.String(), nullable=True),
        sa.Column("power_supply_name", sa.String(), nullable=True),
        sa.Column("power_supply", sa.Integer(), nullable=True),
        sa.Column("storage_type", sa.String(), nullable=True),
        sa.Column("storage_connection", sa.String(), nullable=True),
        sa.Column("extra_hardware", sa.String(), nullable=True),
        sa.Column("usb_a_2_0", sa.Integer(), nullable=True),
        sa.Column("usb_a_3_1", sa.Integer(), nullable=True),
        sa.Column("usb_type_c", sa.Integer(), nullable=True),
        sa.Column("vga_connection", sa.Integer(), nullable=True),
        sa.Column("hdmi_connection", sa.Integer(), nullable=True),
        sa.Column("dp_connection", sa.Integer(), nullable=True),
        sa.Column("case_name", sa.String(), nullable=True),
        sa.Column("case_type", sa.String(), nullable=True),
        sa.Column("motherboard", sa.String(), nullable=True),
        sa.Column("ethernet", sa.Integer(), nullable=True),
        sa.Column("bluetooth", sa.String(), nullable=True),
        sa.Column("wireless", sa.String(), nullable=True),
        sa.Column("warranty", sa.Integer(), nullable=True),
        sa.Column("installed_os", sa.String(), nullable=True),
        sa.Column("weight", sa.Float(), nullable=True),
        sa.Column("width", sa.Float(), nullable=True),
        sa.Column("height", sa.Float(), nullable=True),
        sa.Column("depth", sa.Float(), nullable=True),
        sa.Column("color", sa.String(), nullable=True),
        sa.Column(
            "images_url", postgresql.JSON(astext_type=sa.Text()), nullable=True
        ),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
            name=op.f("fk_desktop_pcs_user_id_users"),
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_desktop_pcs")),
    )
    op.create_index(
        op.f("ix_desktop_pcs_created_at"),
        "desktop_pcs",
        ["created_at"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_desktop_pcs_created_at"), table_name="desktop_pcs")
    op.drop_table("desktop_pcs")
