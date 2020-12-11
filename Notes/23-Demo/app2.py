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
# pip install pylint-sqlalchemy
# pip install python-dotenv
#    then make a .flaskenv in root directory
# pip freeze > requirements.txt

#   flask run

from flask import Flask, request, render_template, redirect, flash, session
from flask_sqlalchemy import SQLAlchemy
from models2 import db, connect_db, Department, Employee, Project, EmployeeProject

app = Flask(__name__)
app.config['SECRET_KEY']="mykey"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///employees_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

@app.route('/phones')
def list_phones():
    emps = Employee.query.all()
    return render_template('phones.html', emps=emps)