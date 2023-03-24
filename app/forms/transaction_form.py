from flask_wtf import FlaskForm
from wtforms import IntegerField, DecimalField
from wtforms.validators import DataRequired, ValidationError
from ..utils import current_user_portfolio


def validate_shares(form, field):
    if field.data < 0:
        raise ValidationError("Not Enough Shares")


def validate_cost(form, field):
    portfolio = current_user_portfolio()
    if field.data > portfolio.buying_power:
        raise ValidationError("Not Enough Buying Power")


class TransactionForm(FlaskForm):
    shares = IntegerField('Shares', validators=[DataRequired(), validate_shares])
    total_cost = DecimalField('Total Cost', places=2, validators=[DataRequired(), validate_cost])