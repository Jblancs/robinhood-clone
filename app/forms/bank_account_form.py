from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Length

class BankAccountForm(FlaskForm):
    bank = SelectField('Bank', choices=["Wells Fargo", "Chase", "Capital One", "Bank of America", "TD Bank", "Citigroup"], validators=[DataRequired()])
    account_type = SelectField('Account Type', choices=["Checking", "Savings"], validators=[DataRequired()])
    account_number = StringField('Account Number', validators=[DataRequired(), Length(min=10, max=12, message="Please enter a valid 10-12 digit account number")])
