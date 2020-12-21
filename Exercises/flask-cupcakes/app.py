"""Flask app for Cupcakes"""

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

from flask import Flask, render_template, flash, redirect, request, jsonify
from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SECRET_KEY']="mykey"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False

connect_db(app)

@app.route('/api/cupcakes')
def get_cupcakes():
    all_cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=all_cupcakes)

@app.route('/api/cupcakes/<int:my_id>')
def get_cupcake(my_id):
    cupcake = Cupcake.query.get_or_404(my_id)
    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes', methods=["POST"])
def add_cupcake():
    new_cupcake = Cupcake(
        flavor=request.json['flavor'],
        size=request.json['size'],
        rating=request.json['rating'],
        image=request.json['image']
        )
    db.session.add(new_cupcake)
    db.session.commit()
    response_json= jsonify(cupcake=new_cupcake.serialize())
    return (response_json, 201)

@app.route('/api/cupcakes/<int:my_id>', methods=["PATCH"])
def edit_cupcake(my_id):
    cupcake = Cupcake.query.get_or_404(my_id)
    cupcake.flavor=request.json.get('flavor', cupcake.flavor)
    cupcake.size=request.json.get('size', cupcake.size)
    cupcake.rating=request.json.get('rating', cupcake.rating)
    cupcake.image=request.json.get('image', cupcake.image)
    db.session.commit()
    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes/<int:my_id>', methods=["DELETE"])
def delete_cupcake(my_id):
    cupcake = Cupcake.query.get_or_404(my_id)
    db.session.delete(cupcake)
    db.session.commit()
    return jsonify(message="Deleted.")