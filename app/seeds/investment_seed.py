from app.models import db, Investment, SCHEMA, environment
from sqlalchemy.sql import text
from datetime import datetime


def seed_investment():

    invest_list = []
    for portfolio_id in range(1, 4):
        invest = Investment(
            ticker="AAPL",
            portfolio_id=portfolio_id,
            value=150,
            shares=1
        )
        invest_list.append(invest)

    db.session.add_all(invest_list)
    db.session.commit()


def undo_investment():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.investments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM investments"))

    db.session.commit()
