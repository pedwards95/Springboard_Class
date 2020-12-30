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
# pip install flask_bcrypt

# pip freeze > requirements.txt

#    flask run
# if app is not named app.py, use :
#    FLASK_APP=app_name.py flask run

from flask import Flask, render_template, flash, redirect, request, session
from models import db, connect_db, User
from forms import AddUserForm, LoginUserForm
from seed import seed

app = Flask(__name__)
app.config['SECRET_KEY']="mykey"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///users_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False

connect_db(app)
seed(db)

@app.route("/")
def register_redirect():
    return redirect("/register")

@app.route("/register", methods=["GET"])
def register_get():
    form=AddUserForm()
    return render_template("register.html", form=form)

@app.route("/register", methods=["POST"])
def register_post():
    form=AddUserForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        hashed_password = User.hash_pass(password)
        first_name = form.first_name.data
        last_name = form.first_name.data
        email = form.email.data

        new_user = User(username=username,password=hashed_password,first_name=first_name,last_name=last_name,email=email)
        db.session.add(new_user)
        try:
            db.session.commit()
        except:
            flash(f"Something went wrong when creating the new user! Please wait a bit and then try again.", "error")
            db.session.rollback()
        user = User.authenticate(username, password)
        print(user)
        if user:
            flash(f"Welcome, {user.username}!", "success")
            session['user_id'] = user.username
            return redirect('/secret')
        else:
            form.username.errors = ['Invalid username/password.']
    return render_template("register.html", form=form)

@app.route("/login", methods=["GET"])
def login_get():
    form=LoginUserForm()
    return render_template("login.html", form=form)

@app.route("/login", methods=["POST"])
def login_post():
    form=LoginUserForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = User.authenticate(username, password)
        if user:
            flash(f"Welcome back, {user.username}!", "success")
            session['user_id'] = user.username
            return redirect('/secret')
        else:
            form.username.errors = ['Invalid username/password.']
    return render_template("login.html", form=form)

@app.route("/secret", methods=["GET"])
def secret_get():
    if(session.get('user_id')):
        return render_template("secret.html")
    else:
        return redirect("/login")


@app.route("/logout", methods=["GET"])
def logout():
    if(session.get('user_id')):
        session.pop('user_id')
    flash(f"Logged out!", "success")
    return redirect("/login")