from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, DecimalField
from wtforms.validators import DataRequired, Length, ValidationError

def validate_amount(form, field):
    if field.data <= 0:
        raise ValidationError("Amount cannot be less than $0.00")

class TransferForm(FlaskForm):
    bank_account_id = SelectField('Bank Account Id', validators=[DataRequired()])
    amount = DecimalField('Amount', validators=[DataRequired(), validate_amount])
