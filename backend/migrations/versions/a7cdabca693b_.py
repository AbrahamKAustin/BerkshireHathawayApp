"""empty message

Revision ID: a7cdabca693b
Revises: 369f3ef97f5f
Create Date: 2023-07-28 15:45:21.522009

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'a7cdabca693b'
down_revision = '369f3ef97f5f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('realtor_task', schema=None) as batch_op:
        batch_op.add_column(sa.Column('DatePublished', sa.DateTime(), nullable=True))
        batch_op.drop_column('CompletionDate')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('realtor_task', schema=None) as batch_op:
        batch_op.add_column(sa.Column('CompletionDate', mysql.DATETIME(), nullable=True))
        batch_op.drop_column('DatePublished')

    # ### end Alembic commands ###