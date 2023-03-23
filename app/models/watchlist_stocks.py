from .db import db, SCHEMA, environment, add_prefix_for_prod


class WatchlistStocks(db.Model):
    __tablename__ = 'watchlist_stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    watchlist_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("watchlists.id")), nullable=False)
    ticker = db.Column(db.String, db.ForeignKey(
        add_prefix_for_prod("stocks.ticker")), nullable=False)

    # relationships
    watchlist = db.relationship("Watchlist", back_populates="watchlist_stocks")
    stock = db.relationship("Stock", back_populates="watchlist_stocks")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name
        }
