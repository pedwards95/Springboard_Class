from flask import Flask, request, render_template # pylint: disable=import-error
app = Flask(__name__)

@app.route('/')
def index():
    """Return homepage."""

    return render_template("hello.html")