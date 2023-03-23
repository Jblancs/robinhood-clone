from app.models import db, Transaction, SCHEMA, environment
from sqlalchemy.sql import text
from datetime import datetime


def seed_transaction():

    transaction_list = []
    for portfolio_id in range(1, 4):
        transaction = Transaction(
            ticker="AAPL",
            portfolio_id=portfolio_id,
            total_cost=150,
            shares=1,
            date=datetime(2023, 1, 21)
        )
        transaction_list.append(transaction)

    db.session.add_all(transaction_list)
    db.session.commit()


def undo_transaction():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()
