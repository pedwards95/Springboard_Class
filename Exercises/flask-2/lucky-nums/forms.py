from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, IntegerField, RadioField, SelectField
from wtforms.validators import InputRequired, Optional, Email, ValidationError

def check_year(form, field):
    if field.data > 2000 or field.data < 1900:
        raise ValidationError('Date must be between 1900 and 2000')

class RequestNumberForm(FlaskForm):
    name = StringField("User Name", validators=[InputRequired()])
    email = StringField("Email", validators=[InputRequired(), Email()])
    year = IntegerField("Birth Year", validators=[InputRequired(), check_year])
    color = SelectField("Favorite Color", choices=[('red','Red'), ('green','Green'), ('orange','Orange'),  ('blue','Blue')])
