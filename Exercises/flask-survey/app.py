from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
import surveys

app = Flask(__name__)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = "whyisthisrequired"
debug = DebugToolbarExtension(app)

responses = []
my_survey = surveys.satisfaction_survey

@app.route('/')
def home():
    session['answers'] = []
    return render_template('home.html',title=my_survey.title,instructions=my_survey.instructions)

@app.route('/questions/<int:num>')
def ask_question(num):
    responses = session['answers']
    if num == len(responses):
        return render_template('question.html',question=my_survey.questions[num],num=num)
    elif len(responses) != len(my_survey.questions):
        flash("Invalid url attempt!",'error')
        return redirect(f'/questions/{len(responses)}')
    else:
        flash("Invalid url attempt!",'error')
        return redirect('/end')

@app.route('/questions/<int:num>', methods=["POST"])
def recieved_answer(num):
    answer = request.form['choice']
    responses = session['answers']
    responses.append(answer)
    session['answers'] = responses
    if num+1<len(my_survey.questions):
        return redirect(f'/questions/{num+1}')
    else:
        return redirect('/end')

@app.route('/end')
def thanks_end():
    responses = session['answers']
    if len(responses) == 0:
        return redirect('/')
    elif len(responses) != len(my_survey.questions):
        flash("Something went wrong!")
        return redirect('/')
    else:
        session['answers'] = []
        return render_template('thanks.html',answers=responses)
