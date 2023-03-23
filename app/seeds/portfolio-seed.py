from app.models import db, Portfolio, SCHEMA, environment
from sqlalchemy.sql import text
import random


def seed_portfolio():

    portfolio_list = []
    for user_id in range(1, 4):
        portfolio = Portfolio(
            user_id=user_id,
            current_value=0,
            buying_power=random.randint(9500, 10500),
        )
        portfolio_list.append(portfolio)

    db.session.add_all(portfolio_list)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.portfolios RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM portfolios")

    db.session.commit()
