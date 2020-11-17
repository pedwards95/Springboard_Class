from flask import Flask, request, render_template, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from helper_python import help_currency, help_display

app = Flask(__name__)
app.config["SECRET_KEY"] = "mykey"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False
debug = DebugToolbarExtension(app)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/convert", methods=["POST"])
def convert_currency():
    from_currency = request.form["from-currency"]
    to_currency = request.form["to-currency"]
    amount_currency = request.form["amount-currency"]

    validation = help_currency.validate(to=to_currency,frm=from_currency,amount=amount_currency)
    for val in validation:
        if validation[val][0] == False:
            help_display.display_error(error=validation[val][1],preface="There was an error with your submission:",postface="Please try again.")
            return redirect("/")
    result = help_currency.convert(frm=from_currency,to=to_currency,amount=amount_currency)

    return render_template("home.html",converted_value=result)