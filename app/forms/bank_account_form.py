from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Length, ValidationError

def validate_account_number(form, field):
    account_num = field.data
    if not account_num.isdigit():
        raise ValidationError("Account number should contain numbers only")

class BankAccountForm(FlaskForm):
    bank = SelectField('Bank', choices=["Wells Fargo", "Chase", "Capital One", "Bank of America", "TD Bank", "Citigroup"], validators=[DataRequired()])
    account_type = SelectField('Account Type', choices=["Checking", "Saving"], validators=[DataRequired()])
    account_number = StringField('Account Number', validators=[DataRequired(), Length(min=10, max=12, message="Please enter a valid 10-12 digit account number"), validate_account_number])
