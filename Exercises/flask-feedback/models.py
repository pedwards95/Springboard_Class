"Models File"

from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

def connect_db(app):
    "Connection to database"
    db.app = app
    db.init_app(app)


class User(db.Model):
    "User representation"
    def __repr__(self):
        return f"""
        <User {self.username} Name:{self.full_name} Email:{self.email} Password:{self.password}>
        """

    username = db.Column(
        db.VARCHAR(length=20),
        primary_key=True
    )
    password = db.Column(
        db.String,
        nullable=False
    )
    email = db.Column(
        db.VARCHAR(length=50),
        nullable=False,
        unique=True
    )
    first_name = db.Column(
        db.VARCHAR(length=30),
        nullable=False
    )
    last_name = db.Column(
        db.VARCHAR(length=30),
        nullable=False
    )

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    full_name = property(get_full_name)

    @classmethod
    def hash_pass(cls, password):

        hashed = bcrypt.generate_password_hash(password)
        hashed_utf8 = hashed.decode("utf8")

        return hashed_utf8

    @classmethod
    def authenticate(cls, username, password):
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None
