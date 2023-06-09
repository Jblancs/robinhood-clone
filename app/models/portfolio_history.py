from .db import db, SCHEMA, environment, add_prefix_for_prod


class PortfolioHistory(db.Model):
    __tablename__ = 'portfolio_histories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("portfolios.id")), nullable=False)
    value_at_time = db.Column(db.Float(), nullable=False)
    date = db.Column(db.DateTime(), nullable=False)

    # relationships
    portfolio = db.relationship("Portfolio", back_populates="histories")

    def to_dict(self):
        return {
            'id': self.id,
            'portfolio_id': self.portfolio_id,
            'value_at_time': self.value_at_time,
            'date': self.date,
        }
