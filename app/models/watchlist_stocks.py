from .db import db, SCHEMA, environment, add_prefix_for_prod


watchlists_stocks = db.Table(
    'watchlists_stocks',
    db.Column('watchlist_id', db.Integer, db.ForeignKey(add_prefix_for_prod("watchlists.id")), primary_key=True),
    db.Column('ticker', db.String, db.ForeignKey(add_prefix_for_prod("stocks.ticker")), primary_key=True),
    db.ForeignKeyConstraint(['watchlist_id'], [add_prefix_for_prod("watchlists.id")], ondelete='CASCADE',),
        extend_existing=True,
)

if environment == "production":
    watchlists_stocks.schema = SCHEMA
