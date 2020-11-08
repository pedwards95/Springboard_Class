from flask import Flask, request # pylint: disable=import-error
app = Flask(__name__)

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
    html = """
    <html>
        <body>
            <h1> HELLO! </h1>
            <p>This is the hello page.</p>
        </body>
    </html>
    """
    return html

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

