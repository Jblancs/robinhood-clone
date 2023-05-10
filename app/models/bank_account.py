from .db import db, SCHEMA, environment, add_prefix_for_prod

class BankAccount(db.Model):
    __tablename__ = 'bank_accounts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    bank = db.Column(db.String(100), nullable=False)
    account_type = db.Column(db.String(100), nullable=False)
    account_number = db.Column(db.Integer, nullable=False)

    # relationships
    user = db.relationship("User", back_populates="bank_accounts")
    transfers = db.relationship("Transfer", back_populates="bank_account")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'bank': self.bank,
            'account_type': self.account_type,
            'account_number': self.account_number
        }
