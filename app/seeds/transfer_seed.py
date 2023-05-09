from app.models import db, Transfer, SCHEMA, environment
from sqlalchemy.sql import text
from datetime import datetime


def seed_transfer():

    transfer_list = []
    for portfolio_id in range(1, 4):
        transfer = Transfer(
            portfolio_id=portfolio_id,
            bank_account_id=portfolio_id,
            user_id=portfolio_id,
            amount=100,
            date=datetime(2023, 1, 21)
        )
        transfer_list.append(transfer)

    db.session.add_all(transfer_list)
    db.session.commit()


def undo_transfer():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.transfers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transfers"))

    db.session.commit()
