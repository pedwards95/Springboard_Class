from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from random import randint, choice, sample

# python -m venv venv
# source venv/Scripts/activate

#if app is not named app.py, use :
#   FLASH_APP=app_name.py flask run
# else:
#   flask run

# FLASK_ENV=development flask run
# OR
# export FLASK_ENV=development
# both are temporary

# pip install flask_debugtoolbar
# pip freeze > requirements.txt

app = Flask(__name__)
app.config['SECRET_KEY'] = "chickenzarecool"
debug = DebugToolbarExtension(app)

print("Restarting...")

@app.route('/')
def home_page():
    html = """
    <html>
        <body>
            <h1> HOME PAGE </h1>
            <p>Welcome to my simple app.</p>
            <a href='/hello'>Go to hello page</a>
        </body>
    </html>
    """
    return html

@app.route('/hello')
def say_hello():
    return render_template("hello.html")

@app.route('/goodbye')
def say_bye():
    return "GOOD BYE!!!"

@app.route('/search')
def search():
    term = request.args["term"]
    sort = request.args["sort"]
    return f"<h1>Search results for: {term}</h1> <p>Sorting by: {sort}</p>"

@app.route("/post", methods=["POST"])
def post_demo():
    return "YOU MADE A POST REQUEST!"

@app.route("/post", methods=["GET"])
def get_demo():
    return "YOU MADE A GET REQUEST!"

@app.route("/add-comment")
def add_comment_form():
    return """
    <form method = "POST">
        <input name="comment">
        <button>Submit</button>
    </form>
    """

@app.route("/add-comment", methods=["POST"])
def add_comment():
    comment = request.form["comment"]
    return f"<h1>Recieved '{comment}'.</h1>"

@app.route('/r/<subreddit>')
def show_subreddit(subreddit):
    return f"<h1>THIS IS THE SUBREDDIT FOR {subreddit.upper()}</h1>"


POSTS = {
    1: "Hello",
    2: "Chickens are cool.",
    3: "Bob has bad burgers.",
    4: "haha AhaHAa ahaHAHAHAAHAHAHAahasHASgSGVSHAHAhAAHA",
}

@app.route('/posts/<int:id>')
def find_post(id):
    post = POSTS.get(id,"Post not found")
    return f"<p>{post}</p>"
print("...Done!")

@app.route('/form')
def show_form():
    return render_template("form.html")

@app.route('/form-2')
def show_form_2():
    return render_template("form_2.html")

@app.route('/lucky')
def lucky_number():
    num = randint(1,20)
    msg="You are so lucky!"
    return render_template('lucky.html',lucky_num=num, msg=msg)

COMPLIMENTS = ["cool", "clever", "tenacious", "awesome", "Pythonic", "awesome", "rad", "super", "terrific", "nice", "the best"]

@app.route('/greet')
def get_greeting():
    username = request.args["username"]
    nice_thing = choice(COMPLIMENTS)
    return render_template('greet.html',username=username, compliment=nice_thing)

@app.route('/greet-2')
def get_greeting_2():
    username = request.args["username"]
    wants_compliments = request.args.get("wants_compliments")
    nice_things = sample(COMPLIMENTS, 3)
    return render_template('greet_2.html',username=username, wants_compliments=wants_compliments, compliments=nice_things)

@app.route('/spell/<word>')
def spell_word(word):
    return render_template('spell_word.html', word=word.upper())



