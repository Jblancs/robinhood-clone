from .db import db, SCHEMA, environment, add_prefix_for_prod


class Portfolio(db.Model):
    __tablename__ = 'portfolios'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    buying_power = db.Column(db.Float(), nullable=False)

    # relationships
    user = db.relationship("User", uselist=False, back_populates="portfolio")
    investments = db.relationship(
        "Investment", back_populates="portfolio", cascade="all, delete-orphan")
    histories = db.relationship(
        "PortfolioHistory", back_populates="portfolio", cascade="all, delete-orphan")
    transactions = db.relationship("Transaction", back_populates="portfolio")
    transfers = db.relationship("Transfer", back_populates="portfolio")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'buying_power': self.buying_power,
            'history': [hist.to_dict() for hist in self.histories],
            'investments': [inv.to_dict() for inv in self.investments],
            'portfolio_total': sum([inv.to_dict()["value"] for inv in self.investments])+self.buying_power
        }
