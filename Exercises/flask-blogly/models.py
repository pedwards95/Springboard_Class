"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

def connect_db(app):
    "Function for connecting to DB"
    db.app = app
    db.init_app(app)
    return db


# Models

class User(db.Model):
    "User model"

    __tablename__ = "users"

    id = db.Column(
        db.Integer,
        primary_key = True,
        autoincrement = True
    )
    first_name = db.Column(
        db.String(30),
        nullable = False
    )
    last_name = db.Column(
        db.String(30),
        nullable = False
    )
    profile_img = db.Column(
        db.String,
        default = "/static/resources/blank_profile_picture.png"
    )
    posts = db.relationship("Post", backref="poster", cascade="all, delete-orphan")


    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    full_name = property(get_full_name)

class Post(db.Model):
    "User's posts model"

    __tablename__ = "posts"

    id = db.Column(
        db.Integer,
        primary_key = True,
        autoincrement = True
    )
    title = db.Column(
        db.String(60),
        nullable = False
    )
    content = db.Column(
        db.String(1000),
        nullable = False
    )
    created_at = db.Column(
        db.DateTime,
        default = datetime.now,
    )
    posted_by = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        nullable = False
    )
