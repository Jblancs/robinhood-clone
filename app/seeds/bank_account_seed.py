from app.models import db, BankAccount, SCHEMA, environment
from sqlalchemy.sql import text


def seed_bank_account():

    bank_account_list = []
    for user_id in range(1, 4):
        bank_account = BankAccount(
            user_id=user_id,
            bank="Wells Fargo",
            account_type="Checking",
            account_number=1234567890+int(user_id),
        )
        bank_account_list.append(bank_account)

    db.session.add_all(bank_account_list)
    db.session.commit()


def undo_bank_account():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.bank_accounts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bank_accounts"))

    db.session.commit()
