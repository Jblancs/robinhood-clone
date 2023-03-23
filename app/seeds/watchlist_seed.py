from app.models import db, Watchlist, SCHEMA, environment
from sqlalchemy.sql import text
import random


def seed_watchlist():

    watch_list = []
    for user_id in range(1, 4):
        watch = Watchlist(
            user_id=user_id,
            name="favs",
        )
        watch_list.append(watch)

    db.session.add_all(watch_list)
    db.session.commit()


def undo_watchlist():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists"))

    db.session.commit()
