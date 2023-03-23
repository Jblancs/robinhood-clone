from .db import db, SCHEMA, environment, add_prefix_for_prod


class Stock(db.Model):
    __tablename__ = 'stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    ticker = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String(5000), nullable=False)
    employees = db.Column(db.Integer, nullable=False)
    headquarters = db.Column(db.String, nullable=False)
    founded = db.Column(db.Integer, nullable=False)

    # relationships
    investments = db.relationship(
        "Investment", back_populates="stock")
    watchlists = db.relationship(
        "Watchlist",secondary="watchlist_stocks", back_populates="stocks", cascade="all, delete-orphan")
    transactions = db.relationship(
        "Transaction", back_populates="stock")

    def to_dict(self):
        return {
            'ticker': self.ticker,
            'name': self.name,
            'description': self.description,
            'employees': self.employees,
            'headquarters': self.headquarters,
            'founded': self.founded,
        }
