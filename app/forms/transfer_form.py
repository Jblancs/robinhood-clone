from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Length

class TransferForm(FlaskForm):
    bank_account_id = SelectField('Bank Account Id', validators=[DataRequired()])
    deposit
