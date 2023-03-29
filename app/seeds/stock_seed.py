from app.models import db, Stock, SCHEMA, environment
from sqlalchemy.sql import text
import random


def seed_stock():

    stock = Stock(
        ticker="AAPL",
        name="Apple Inc.",
        description="Apple designs a wide variety of consumer electronic devices, including smartphones (iPhone), tablets (iPad), PCs (Mac), smartwatches (Apple Watch), and AirPods. The iPhone makes up most of Apple's total revenue. In addition, Apple offers its customers a variety of services such as Apple Music, iCloud, Apple Care, Apple TV+, Apple Arcade, Apple Fitness, Apple Card, and Apple Pay, among others. Apple's products include internally developed software and semiconductors, and the firm is well known for its integration of hardware, software, semiconductors, and services. Apple's products are distributed online as well as through company-owned stores and third-party retailers. The company generates roughly 40% of its revenue from the Americas, with the remainder earned internationally.",
        employees=164000,
        listed="1980-12-12"
    )

    db.session.add(stock)
    db.session.commit()


def undo_stock():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks"))

    db.session.commit()
