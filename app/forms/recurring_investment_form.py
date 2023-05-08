from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, SelectField, DateTimeField
from wtforms.validators import DataRequired, Length, ValidationError
from ..utils import current_user_portfolio, print_data
from datetime import datetime

def validate_shares(form, field):
    if field.data <= 0:
        raise ValidationError("Not Enough Shares: Enter at least 0.000001 shares.")


class RecurringInvestmentForm(FlaskForm):
    ticker = StringField('Ticker', validators=[DataRequired()])
    shares = FloatField('Shares', validators=[DataRequired(), validate_shares])
    start_date = DateTimeField('Start Date', validators=[DataRequired()])
    frequency = SelectField('Frequency', choices=["Every Market Day","Every Week", "Every Two Weeks", "Every Month"], validators=[DataRequired()])
    payment = SelectField('Payment', choices=["Buying power"], validators=[DataRequired()])
