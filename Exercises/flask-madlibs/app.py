from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from random import randint, choice, sample
import stories

app = Flask(__name__)
app.config['SECRET_KEY'] = "randomKey"
debug = DebugToolbarExtension(app)

@app.route('/')
def home():
    myStory = stories.story
    return render_template('story_form.html',story=myStory)

@app.route('/story')
def story():
    myStory = stories.story
    answers = {}
    for prompt in myStory.prompts:
        answers[prompt] = request.args[f"{prompt}"]
    result = myStory.generate(answers)

    return render_template('story.html',story=result)
