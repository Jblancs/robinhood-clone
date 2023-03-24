from app.models import db, SCHEMA, environment
from app.models.watchlist_stocks import watchlists_stocks
from sqlalchemy import insert
from sqlalchemy.sql import text
import random


def seed_watchlist_stock():

    join_list = []
    for id in range(1, 4):

        watch = insert(watchlists_stocks).values(
            watchlist_id=id,
            ticker="AAPL"
        )
        db.session.execute(watch)

    db.session.commit()


def undo_watchlist_stock():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.watchlists_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists_stocks"))

    db.session.commit()
