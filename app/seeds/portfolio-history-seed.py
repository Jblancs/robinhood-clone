from app.models import db, Portfolio, SCHEMA, environment
from sqlalchemy.sql import text
import random
from datetime import datetime, timedelta


def seed_portfolio_history():

    portfolio_list = []

    # user 1 portfolio history seeder (5 years)
    for num_of_days in range(1825, 0, -1):
        portfolio = Portfolio(
            portfolio_id=1,
            value_at_time=random.randint(9500, 10500),
            date=datetime(2023, 3, 21) - timedelta(days=num_of_days),
        )
        portfolio_list.append(portfolio)

    # user 2 portfolio history seeder (5 years)
    for num_of_days in range(1825, 0, -1):
        portfolio = Portfolio(
            portfolio_id=2,
            value_at_time=random.randint(9500, 10500),
            date=datetime(2023, 3, 21) - timedelta(days=num_of_days),
        )
        portfolio_list.append(portfolio)

    # user 3 portfolio history seeder (5 years)
    for num_of_days in range(1825, 0, -1):
        portfolio = Portfolio(
            portfolio_id=3,
            value_at_time=random.randint(9500, 10500),
            date=datetime(2023, 3, 21) - timedelta(days=num_of_days),
        )
        portfolio_list.append(portfolio)

    db.session.add_all(portfolio_list)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.portfolio_histories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM portfolio_histories")

    db.session.commit()
