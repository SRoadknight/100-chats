"""create_profile_model

Revision ID: 2466a2f834ff
Revises:
Create Date: 2024-11-22 15:15:26.024514

"""

import sqlalchemy as sa
import sqlmodel
from alembic import op

# revision identifiers, used by Alembic.
revision = "2466a2f834ff"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "profiles",
        sa.Column("user_id", sa.Uuid(), nullable=False),
        sa.Column("discord_handle", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.Column("avatar_url", sqlmodel.sql.sqltypes.AutoString(), nullable=False),
        sa.PrimaryKeyConstraint("user_id"),
    )
    op.execute("SELECT enable_rls_alembic_version()")
    op.execute("ALTER TABLE profiles ENABLE ROW LEVEL SECURITY")
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("profiles")
    # ### end Alembic commands ###
