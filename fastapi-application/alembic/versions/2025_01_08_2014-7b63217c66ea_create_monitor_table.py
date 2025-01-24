"""create monitor table

Revision ID: 7b63217c66ea
Revises: f13662033279
Create Date: 2025-01-08 20:14:18.686932

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "7b63217c66ea"
down_revision: Union[str, None] = "f13662033279"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "monitors",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("maker", sa.String(), nullable=False),
        sa.Column("price", sa.Float(), nullable=False),
        sa.Column("diagonal", sa.Float(), nullable=False),
        sa.Column("resolution", sa.String(), nullable=False),
        sa.Column("panel_type", sa.String(), nullable=False),
        sa.Column("refresh_rate", sa.Integer(), nullable=False),
        sa.Column("image", sa.String(), nullable=False),
        sa.Column("is_available", sa.Boolean(), nullable=False),
        sa.Column("images_url", postgresql.JSON(astext_type=sa.Text()), nullable=True),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("brightness", sa.Integer(), nullable=False),
        sa.Column("response_time", sa.Integer(), nullable=False),
        sa.Column("contrast_ratio", sa.String(), nullable=False),
        sa.Column("aspect_ratio", sa.String(), nullable=False),
        sa.Column("color_gamut", sa.Integer(), nullable=True),
        sa.Column("hdmi_connection", sa.Integer(), nullable=True),
        sa.Column("dp_connection", sa.Integer(), nullable=True),
        sa.Column("jack_connection", sa.Integer(), nullable=True),
        sa.Column("vga_connection", sa.Integer(), nullable=True),
        sa.Column("usb_2", sa.Integer(), nullable=True),
        sa.Column("usb_type_c", sa.Integer(), nullable=True),
        sa.Column("usb_type_c_thunderbolt", sa.Integer(), nullable=True),
        sa.Column("is_curved", sa.Boolean(), nullable=False),
        sa.Column("vesa_mounting", sa.String(), nullable=False),
        sa.Column("has_speaker", sa.Boolean(), nullable=True),
        sa.Column("pivot", sa.Boolean(), nullable=True),
        sa.Column("is_adjustable_height", sa.Boolean(), nullable=True),
        sa.Column("has_touchscreen", sa.Boolean(), nullable=True),
        sa.Column("accessories", sa.String(), nullable=True),
        sa.Column(
            "energy_class",
            sa.Enum(
                "Triple_A",
                "Double_A",
                "Single_A",
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                name="energy_class_enum",
            ),
            nullable=True,
        ),
        sa.Column("width", sa.Float(), nullable=True),
        sa.Column("height", sa.Float(), nullable=True),
        sa.Column("depth", sa.Float(), nullable=True),
        sa.Column("weight", sa.Float(), nullable=True),
        sa.Column("warranty", sa.Integer(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"], ["users.id"], name=op.f("fk_monitors_user_id_users")
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_monitors")),
    )
    op.create_index(
        op.f("ix_monitors_created_at"),
        "monitors",
        ["created_at"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_monitors_created_at"), table_name="monitors")
    op.drop_table("monitors")
    # DROP TYPE energy_class_enum manually!!!
