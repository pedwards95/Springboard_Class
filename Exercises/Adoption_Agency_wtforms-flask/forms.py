"Forms"

from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, IntegerField, RadioField, SelectField, ValidationError
from wtforms.validators import InputRequired, Optional, Email, URL

def validate_age(form, field):
    if isinstance(field.data,int):
        if field.data > 10 or field.data < 0:
            raise ValidationError('Age must be between 0 and 30')

def validate_species(form, field):
    if field.data != "dog" and field.data != "porcupine" and field.data != "cat":
        raise ValidationError('This center only takes Dogs, Cats, and Porcupines')

class AddPetForm(FlaskForm):
    "Form for adding a pet"

    name = StringField("Pet Name",validators=[InputRequired()])
    species = StringField("Pet Species",validators=[InputRequired(),validate_species])
    age = IntegerField("Pet Age",validators=[Optional(),validate_age])
    photo_url = StringField("Photo URL (Optional)",validators=[Optional(),URL()])
    notes = StringField("Pet Notes (Optional)",validators=[Optional()])

class EditPetForm(FlaskForm):
    "Form for editing a pet"

    photo_url = StringField("Photo URL (Optional)",validators=[Optional(),URL()])
    notes = StringField("Pet Notes (Optional)",validators=[Optional()])
    available = BooleanField("Available?")