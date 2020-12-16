"Model File"

# pylint: disable=too-few-public-methods,invalid-name,unnecessary-pass,wrong-import-order

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    "Connection to database"
    db.app = app
    db.init_app(app)

class Pet(db.Model):
    "Pet representation"
    def __repr__(self):
        return f"""
        <Pet {self.id} Name:{self.name} Breed:{self.species} Age:{self.age} 
        Notes:{self.notes} 
        Available:{self.available}>
        """

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )
    name = db.Column(
        db.String,
        nullable=False
    )
    species = db.Column(
        db.String,
        nullable=False
    )
    photo_url = db.Column(
        db.String,
        nullable=True
    )
    age = db.Column(
        db.Integer,
        nullable=True
    )
    notes = db.Column(
        db.String,
        nullable=True
    )
    available = db.Column(
        db.Boolean,
        nullable=False,
        default=True
    )