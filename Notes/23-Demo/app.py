# python -m venv venv
# source venv/Scripts/activate
# pip install pylint
# pip install ipython
# pip install flask
# pip install flask_debugtoolbar
# pip install pylint-flask
# pip install psycopg2-binary
# pip install flask-sqlalchemy
# pip install pylint_flask_sqlalchemy
# pip install python-dotenv
#    then make a .flaskenv in root directory
# pip freeze > requirements.txt

#   flask run

from flask import Flask, request, render_template, redirect, flash, session
from flask_sqlalchemy import SQLAlchemy
from models import db, connect_db, Pet

app= Flask(__name__)
app.config['SECRET_KEY']="mykey"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_shop_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

@app.route('/')
def list_pets():
    """Shows list of all pets in db"""
    pets = Pet.query.all()

    return render_template('list.html', pets=pets)

@app.route('/', methods=["POST"])
def create_pet():
    name = request.form["name"]
    hunger = request.form["hunger"]
    species = request.form["species"]
    hunger = int(hunger) if hunger else None

    new_pet = Pet(name=name, species=species, hunger=hunger)
    db.session.add(new_pet)
    db.session.commit()

    return redirect(f"/{new_pet.id}")

@app.route('/<int:pet_id>')
def show_pet(pet_id):
    """Show details about a single pet"""
    pet = Pet.query.get_or_404(pet_id)
    return render_template("details.html", pet=pet)

@app.route("/species/<species_id>")
def show_pets_by_species(species_id):
    pets = Pet.get_by_species(species_id)
    return render_template("species.html",pets=pets, species=species_id)