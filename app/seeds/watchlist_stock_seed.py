from app.models import db, WatchlistStocks, SCHEMA, environment
from sqlalchemy.sql import text
import random


def seed_watchlist_stock():

    join_list = []
    for id in range(1, 4):
        join = WatchlistStocks(
            watchlist_id=id,
            ticker="AAPL",
        )
        join_list.append(join)

    db.session.add_all(join_list)
    db.session.commit()


def undo_watchlist_stock():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.watchlists_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists_stocks"))

    db.session.commit()
