from .db import db, SCHEMA, environment, add_prefix_for_prod


class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String, db.ForeignKey(
        add_prefix_for_prod("stocks.ticker")), nullable=False)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("portfolios.id")), nullable=False)
    total_cost = db.Column(db.Float, nullable=False)
    shares = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    # relationships
    portfolio = db.relationship(
        "Portfolio", back_populates="transactions")
    stock = db.relationship(
        "Stock", back_populates="transactions")

    @property
    def price_per_share(self):
        return self.shares/self.value

    def to_dict(self):
        return {
            'id': self.id,
            'ticker': self.ticker,
            'portfolio_id': self.portfolio_id,
            'total_cost': self.total_cost,
            'shares': self.shares,
            'date': self.date,
            'price_per_share': self.price_per_share
        }
