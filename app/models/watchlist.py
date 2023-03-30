from .db import db, SCHEMA, environment, add_prefix_for_prod


class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(100), nullable=False)

    # relationships
    user = db.relationship("User", uselist=False, back_populates="watchlists")
    stocks = db.relationship(
        "Stock", secondary="watchlists_stocks", back_populates="watchlists")
    # watchlist_stocks = db.relationship(
    #     "WatchlistStocks", back_populates="watchlist")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'stocks': [stock.to_dict() for stock in self.stocks]
        }
