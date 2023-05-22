from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def validate_amount(form, field):
    if field.data <= 0:
        raise ValidationError("Amount cannot be less than $0.00")

def validate_limit(form, field):
    if field.data > 50000:
        raise ValidationError("Transfers may not exceed $50,000.00.")

class TransferForm(FlaskForm):
    bank_account_id = IntegerField('Bank Account Id', validators=[DataRequired()])
    amount = FloatField('Amount', validators=[DataRequired(), validate_amount, validate_limit])
