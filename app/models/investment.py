from .db import db, SCHEMA, environment, add_prefix_for_prod


class Investment(db.Model):
    __tablename__ = 'investments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String, db.ForeignKey(
        add_prefix_for_prod("stock.ticker")), nullable=False)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("portfolio.id")), nullable=False)
    value = db.Column(db.Float(), nullable=False)
    shares = db.Column(db.Integer(), nullable=False)

    # relationships
    portfolio = db.relationship(
        "Portfolio", back_populates="investments")
    stock = db.relationship(
        "Stock", back_populates="investments")


    @property
    def price_per_share(self):
        return self.shares/self.value

    def to_dict(self):
        return {
            'id': self.id,
            'ticker': self.ticker,
            'portfolio_id': self.portfolio_id,
            'value': self.value,
            'shares': self.shares,
            'price_per_share': self.price_per_share
        }
