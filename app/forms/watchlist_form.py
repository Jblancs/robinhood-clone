from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class WatchlistForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=1, max=64, message="Your list name must be less than 64 characters.")])
