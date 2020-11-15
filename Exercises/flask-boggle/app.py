from object_classes.boggle import Boggle
from helper_classes import helpers
from flask import Flask, render_template, session, request, flash, redirect, jsonify


app = Flask(__name__)
app.config['SECRET_KEY'] = "lalala"

boggle_game = Boggle()

@app.route("/")
def home_page():
    helpers.reset_data()
    session.pop("board",None)
    return render_template("home.html")

@app.route("/board", methods=["GET"])
def board_page():
    my_boggle = Boggle()
    my_board = session.get("board",my_boggle.make_board())
    session["board"] = my_board
    return render_template("board.html",board=my_board)

@app.route("/board", methods=["POST"])
def board_guess():
    guess = request.form['guess'].upper()
    response = boggle_game.check_valid_word(session.get("board"),guess)
    helpers.output_result_boggle(response=response["result"], guess=guess)
    return redirect("/board")

@app.route("/board_guess", methods=["POST"])
def board_guess_JSON():
    guess = request.json['guess'].upper()
    response = boggle_game.check_valid_word(session.get("board"),guess)
    helpers.output_result_boggle(response=response["result"], guess=guess)
    print(response)
    return jsonify(response)

@app.route("/instructions")
def instructions_page():
    return render_template("howToPlay.html")

@app.route("/finish")
def game_over_page():
    session["num_times"] = session.get("num_times",0)+1
    if session["points"] >= session.get("high_score",0):
        session["high_score"] = session["points"]
    return render_template("game_over.html")
