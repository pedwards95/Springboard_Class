from flask import Flask, render_template, session, flash

def reset_data():
    session.pop("board",None)
    session.pop("points",None)

def output_result_boggle(response, guess):
    if response == "ok":
        points = session.get("points",0) + len(guess)-2
        session["points"] = points
        # flash(f"{guess} was correct!",'success')
    else:
        # flash(f"{guess} is {response.replace('-',' ')}",'error')
        print("else")