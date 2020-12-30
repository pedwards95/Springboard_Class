"Forms"

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, ValidationError
from wtforms.validators import InputRequired, Email
from models import db, connect_db, User


def validate_name(form, field):
    if len(field.data) > 30:
        raise ValidationError('Name must be shorter than 30 characters!')

def validate_email(form, field):
    if len(field.data) > 50:
        raise ValidationError('Email must be shorter than 50 characters!')

def validate_username(form, field):
    if len(field.data) > 20:
        raise ValidationError('Username must be shorter than 20 characters!')
    user = User.query.filter("username"==field.data).first()
    if user:
        raise ValidationError('Username is already taken!')

class AddUserForm(FlaskForm):
    "Form for adding a User"

    first_name = StringField("First Name",validators=[InputRequired(),validate_name])
    last_name = StringField("Last Name",validators=[InputRequired(),validate_name])
    username = StringField("Username",validators=[InputRequired(),validate_username])
    password = PasswordField("Password",validators=[InputRequired()])
    email = StringField("Email",validators=[InputRequired(),Email(),validate_email])

class LoginUserForm(FlaskForm):
    "Form for logging in an existing User"

    username = StringField("Username",validators=[InputRequired(),validate_username])
    password = PasswordField("Password",validators=[InputRequired()])