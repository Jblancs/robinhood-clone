from .db import db, SCHEMA, environment, add_prefix_for_prod


class RecurringInvestment(db.Model):
    __tablename__ = 'recurring_investments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String, db.ForeignKey(add_prefix_for_prod("stocks.ticker")), nullable=False)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("portfolios.id")), nullable=False)
    shares = db.Column(db.Float, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    frequency = db.Column(db.String, nullable=False)
    paused = db.Column(db.Boolean, nullable=False)

    # relationships
    portfolio = db.relationship("Portfolio", back_populates="recurring_investments")
    stock = db.relationship("Stock", back_populates="recurring_investments")

    def to_dict(self):
        return {
            'id': self.id,
            'ticker': self.ticker,
            'portfolio_id': self.portfolio_id,
            'shares': self.shares,
            'start_date': self.start_date,
            'frequency': self.frequency,
            'paused': self.paused,
        }
