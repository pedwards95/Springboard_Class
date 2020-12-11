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

"""Blogly application."""

from flask import Flask, redirect, render_template, request, flash
from models import connect_db, User, Post
from seed import seed

app = Flask(__name__)
app.config['SECRET_KEY']="mykey"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

my_db = connect_db(app)
seed(my_db)

@app.route("/")
def redirect_blogly_home():
    "Redirects to home route"
    return redirect("/home")

@app.route("/home")
def blogly_home():
    "Home route"
    my_posts = Post.query.order_by(Post.created_at.desc()).limit(5).all()
    return render_template("home.html", my_posts=my_posts)

@app.route("/all_users")
def blogly_users():
    "Show all users"
    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template("all_users.html", users=users)

@app.route("/user/<int:user_id>", methods=["GET"])
def blogly_user_info(user_id):
    "Show one user"
    my_user = User.query.get_or_404(user_id)
    return render_template("user_details.html", user=my_user)

@app.route("/user/<int:user_id>/delete", methods=["POST"])
def blogly_delete_user(user_id):
    "Delete user"
    my_user = User.query.get_or_404(user_id)
    my_db.session.delete(my_user)
    my_db.session.commit()
    flash("User deleted", "success")
    return redirect("/all_users")

@app.route("/user/edit/<int:user_id>", methods=["GET"])
def blogly_edit_user_info(user_id):
    "Edit one user form"
    my_user = User.query.get_or_404(user_id)
    return render_template("user_details_edit.html", user=my_user)

@app.route("/user/edit/<int:user_id>", methods=["POST"])
def blogly_submit_edit_user_info(user_id):
    "Edit one user submit"
    my_user = User.query.get_or_404(user_id)
    my_user.first_name = request.form["first_name"]
    my_user.last_name = request.form["last_name"]
    my_user.profile_img = request.form["img_url"]

    my_db.session.commit()
    flash("Edit Successful", "success")
    return redirect(f"/user/{my_user.id}")

@app.route("/new_user", methods = ["GET"])
def blogly_new_user_form():
    "Show the user creation form"
    return render_template("new_user.html")

@app.route("/new_user", methods = ["POST"])
def blogly_new_user_submit():
    "Create a new user"
    fname = request.form["first_name"]
    lname = request.form["last_name"]
    img = request.form["img_url"]
    if not img:
        img = None

    new_user = User(first_name=fname,last_name=lname, profile_img=img)

    my_db.session.add(new_user)
    my_db.session.commit()
    return redirect("/all_users")

@app.route("/user/<int:user_id>/posts/create")
def blogly_add_post_form(user_id):
    my_user = User.query.get_or_404(user_id)
    return render_template("new_post.html", user=my_user)

@app.route("/posts/<int:post_id>")
def blogly_show_post(post_id):
    my_post = Post.query.get_or_404(post_id)
    return render_template("post_details.html", post=my_post, user=my_post.poster)

@app.route("/posts", methods=["POST"])
def blogly_add_post():
    title = request.form["title"]
    content = request.form["content"]
    user_id = int(request.form["user"])

    new_post = Post(title=title,content=content, posted_by=user_id)

    my_db.session.add(new_post)
    my_db.session.commit()
    flash("Post Added", "success")
    return redirect(f"/user/{user_id}")

@app.route("/posts/<int:post_id>/delete")
def blogly_delete_post(post_id):
    "Delete post"
    my_post = Post.query.get_or_404(post_id)
    user_id = my_post.poster.id
    my_db.session.delete(my_post)
    my_db.session.commit()
    flash("Post deleted", "success")
    return redirect(f"/user/{user_id}")

@app.route("/posts/edit/<int:post_id>", methods=["GET"])
def blogly_edit_post_form(post_id):
    my_post = Post.query.get_or_404(post_id)
    return render_template("post_details_edit.html", post=my_post, user=my_post.poster)

@app.route("/posts/edit/<int:post_id>", methods=["POST"])
def blogly_edit_post(post_id):
    "Edit one post submit"
    my_post = Post.query.get_or_404(post_id)
    my_post.title = request.form["title"]
    my_post.content = request.form["content"]

    my_db.session.commit()
    flash("Edit Successful", "success")
    return redirect(f"/posts/{my_post.id}")