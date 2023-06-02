from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError
from ..utils import current_user_portfolio, print_data
from datetime import datetime

def validate_shares(form, field):
    if field.data <= 0:
        raise ValidationError("Please enter a valid share amount")


class RecurringInvestmentForm(FlaskForm):
    ticker = StringField('Ticker', validators=[DataRequired()])
    shares = FloatField('Shares', validators=[DataRequired(), validate_shares])
    start_date = StringField('Start Date', validators=[DataRequired()])
    frequency = SelectField('Frequency', choices=["Daily","Weekly", "Bi-Weekly", "Monthly"], validators=[DataRequired()])
    portfolio_id = IntegerField('Payment', validators=[DataRequired()])
