"""empty message

Revision ID: 094a9470b5b6
Revises:
Create Date: 2023-03-23 19:50:47.191652

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '094a9470b5b6'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('stocks',
                    sa.Column('ticker', sa.String(), nullable=False),
                    sa.Column('name', sa.String(), nullable=False),
                    sa.Column('description', sa.String(
                        length=5000), nullable=False),
                    sa.Column('employees', sa.Integer(), nullable=False),
                    sa.Column('headquarters', sa.String(), nullable=False),
                    sa.Column('listed', sa.Integer(), nullable=False),
                    sa.PrimaryKeyConstraint('ticker')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE stocks SET SCHEMA {SCHEMA};")

    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('username', sa.String(
                        length=40), nullable=False),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('hashed_password', sa.String(
                        length=255), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('portfolios',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('buying_power', sa.Float(), nullable=False),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE portfolios SET SCHEMA {SCHEMA};")

    op.create_table('watchlists',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=100), nullable=False),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE watchlists SET SCHEMA {SCHEMA};")

    op.create_table('investments',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('ticker', sa.String(), nullable=False),
                    sa.Column('portfolio_id', sa.Integer(), nullable=False),
                    sa.Column('value', sa.Float(), nullable=False),
                    sa.Column('shares', sa.Float(), nullable=False),
                    sa.ForeignKeyConstraint(
                        ['portfolio_id'], ['portfolios.id'], ),
                    sa.ForeignKeyConstraint(['ticker'], ['stocks.ticker'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE investments SET SCHEMA {SCHEMA};")

    op.create_table('portfolio_histories',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('portfolio_id', sa.Integer(), nullable=False),
                    sa.Column('value_at_time', sa.Float(), nullable=False),
                    sa.Column('date', sa.DateTime(), nullable=False),
                    sa.ForeignKeyConstraint(
                        ['portfolio_id'], ['portfolios.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE portfolio_histories SET SCHEMA {SCHEMA};")

    op.create_table('transactions',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('ticker', sa.String(), nullable=False),
                    sa.Column('portfolio_id', sa.Integer(), nullable=False),
                    sa.Column('total_cost', sa.Float(), nullable=False),
                    sa.Column('shares', sa.Float(), nullable=False),
                    sa.Column('date', sa.DateTime(), nullable=False),
                    sa.ForeignKeyConstraint(
                        ['portfolio_id'], ['portfolios.id'], ),
                    sa.ForeignKeyConstraint(['ticker'], ['stocks.ticker'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE transactions SET SCHEMA {SCHEMA};")

    op.create_table('transfers',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('portfolio_id', sa.Integer(), nullable=False),
                    sa.Column('deposit', sa.Float(), nullable=False),
                    sa.Column('date', sa.DateTime(), nullable=False),
                    sa.ForeignKeyConstraint(
                        ['portfolio_id'], ['portfolios.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE transfers SET SCHEMA {SCHEMA};")

    op.create_table('watchlists_stocks',
                    sa.Column('watchlist_id', sa.Integer(), nullable=False),
                    sa.Column('ticker', sa.String(), nullable=False),
                    sa.ForeignKeyConstraint(['ticker'], ['stocks.ticker'], ),
                    sa.ForeignKeyConstraint(
                        ['watchlist_id'], ['watchlists.id'], ),
                    sa.PrimaryKeyConstraint('watchlist_id', 'ticker')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE watchlists_stocks SET SCHEMA {SCHEMA};")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('watchlists_stocks')
    op.drop_table('transfers')
    op.drop_table('transactions')
    op.drop_table('portfolio_histories')
    op.drop_table('investments')
    op.drop_table('watchlists')
    op.drop_table('portfolios')
    op.drop_table('users')
    op.drop_table('stocks')
    # ### end Alembic commands ###
