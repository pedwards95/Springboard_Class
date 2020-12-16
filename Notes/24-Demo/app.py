# python -m venv venv
# source venv/Scripts/activate
# pip install pylint
# pip install ipython
# pip install flask
# pip install flask-wtf
# pip install flask_debugtoolbar
# pip install pylint-flask
# pip install psycopg2-binary
# pip install flask-sqlalchemy
# pip install pylint_flask_sqlalchemy
# pip install pylint-sqlalchemy
# pip install python-dotenv
#    then make a .flaskenv in root directory
# pip install email_validator
# pip freeze > requirements.txt

#   flask run

from flask import Flask, request, render_template, redirect, flash, session
from flask_sqlalchemy import SQLAlchemy
from models import db, connect_db
from forms import AddSnackForm

app = Flask(__name__)
app.config['SECRET_KEY']="mykey"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///employees_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

@app.route("/")
def home_page():
    return render_template("home.html")

@app.route('/snacks/new', methods=['GET','POST'])
def add_snack():
    form = AddSnackForm()

    if form.validate_on_submit():
        name= form.name.data
        price = form.price.data
        flash(f"Added {name} at ${price}")
        return redirect("/")
    else:
        return render_template("add_snack_form.html", form=form)

app.route("/example")
def handle_snack_form():
    form = AddSnackForm()

    snacks = [(s.id, s.name) for s in Snack.query.all()]
    form.snack.choices = snacks