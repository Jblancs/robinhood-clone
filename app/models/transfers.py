from .db import db, SCHEMA, environment, add_prefix_for_prod


class Transfer(db.Model):
    __tablename__ = 'transfers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("portfolios.id")), nullable=False)
    bank_account_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("bank_accounts.id")), nullable=False)
    deposit = db.Column(db.Float(), nullable=False)
    date = db.Column(db.DateTime(), nullable=False)

    # relationships
    portfolio = db.relationship("Portfolio", back_populates="transfers")
    bank_account = db.relationship("BankAccount", back_populates="transfers")

    def to_dict(self):
        return {
            'id': self.id,
            'portfolio_id': self.portfolio_id,
            'bank_account_id': self.bank_account_id,
            'deposit': self.deposit,
            'date': self.date,
        }
