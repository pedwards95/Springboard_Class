"Main App"
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
# pip install pylint-sqlalchemy
# pip install pylint_flask_sqlalchemy
# pip install sqlalchemy-utils
# pip install python-dotenv
#    then make a .flaskenv in root directory
# pip install email_validator

# pip freeze > requirements.txt

#    flask run
# if app is not named app.py, use :
#    FLASK_APP=app_name.py flask run

# pylint: disable=too-few-public-methods,invalid-name,unnecessary-pass,wrong-import-order

from flask import Flask, render_template, flash, redirect, request
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm
from seed import seed

app = Flask(__name__)
app.config['SECRET_KEY']="mykey"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pets_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False

connect_db(app)
seed(db)

@app.route("/")
def home():
    "Home route"
    pets = Pet.query.all()
    return render_template("home.html", pets=pets)

@app.route("/add", methods=["GET"])
def add_pet():
    form = AddPetForm()
    return render_template("add_pet_form.html", form=form)

@app.route("/add", methods=["POST"])
def submit_add_pet():
    form = AddPetForm()
    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        age = form.age.data
        photo_url = form.photo_url.data
        notes = form.notes.data
        db.session.add(Pet(name=name,species=species,age=age,photo_url=photo_url,notes=notes))
        db.session.commit()
        flash(f"Added {name}")
        return redirect("/")
    else:
        return render_template("add_pet_form.html", form=form)

@app.route("/<int:pet_id>", methods=["GET"])
def pet_info(pet_id):
    pet = Pet.query.get(pet_id)
    return render_template("pet_info.html", pet=pet)

@app.route("/<int:pet_id>/edit", methods=["GET"])
def edit_pet_info(pet_id):
    pet = Pet.query.get(pet_id)
    form = EditPetForm(obj=pet)
    return render_template("edit_pet_info.html", pet=pet, form=form)

@app.route("/<int:pet_id>", methods=["POST"])
def edit_pet_info_submit(pet_id):
    pet = Pet.query.get(pet_id)
    form = EditPetForm(obj=pet)
    if form.validate_on_submit():
        pet.photo_url = request.form["photo_url"]
        pet.notes = request.form["notes"]
        try:
            my_bool = request.form["available"]
            pet.available = True
        except:
            pet.available = False
        db.session.commit()
        flash(f"Edited {pet.name}")
        return redirect(f"/{pet_id}")
    else:
        return render_template("edit_pet_form.html",pet=pet, form=form)