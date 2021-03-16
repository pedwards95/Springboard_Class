from flask import Flask, render_template, request, jsonify, flash, redirect
import requests
import random
from forms import RequestNumberForm

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
# pip install requests

# pip freeze > requirements.txt

#    flask run
# if app is not named app.py, use :
#    FLASK_APP=app_name.py flask run


app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"


@app.route("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")

@app.route("/get-lucky-num", methods=["POST"])
def get_num():
    "get the lucky number"

    form = RequestNumberForm()

    name = request.json["name"]
    email = request.json["email"]
    year = request.json["year"]
    color = request.json["color"]
    flash(f"Lucky number successfully requested.")
    num = random.randint(1,100)

    errors = validate(name=name,email=email,year=year,color=color)

    if not errors:
        factNum = requests.get(f'http://numbersapi.com/{num}/trivia').content
        factYear = requests.get(f'http://numbersapi.com/{year}/year').content
        myReturn = {
            "num" : {
                "fact": f"{factNum}",
                "num": f"{num}"
            },
            "year": {
                "fact": f"{factYear}",
                "num": f"{year}"
            }
        }
        message = {
            'status': 201,
            'message': 'OK',
            'facts': myReturn
        }
        resp = jsonify(message)
        resp.status_code = 201
        print(resp)
        return resp
    else:
        return jsonify(errors)

# ! METHODS

def validate(name, email, year, color):
    errors = {}
    if not name:
        errors["name"] = "Name is required!"
    if not email:
        errors["email"] = "Email is required!"
    if not year:
        errors["year"] = "Year is required!"
    elif int(year) < 1900 or int(year) > 2000:
        errors["year"] = "Year must be between 1900 and 2000!"
    if not color:
        errors["color"] = "Invalid value, must be one of: red, green, orange, blue."
    return errors


