"REST demo app"

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
# pip install pylint_flask_sqlalchemy
# pip install pylint-sqlalchemy
# pip install requests
# pip install python-dotenv
#    then make a .flaskenv in root directory
# pip install email_validator
# pip freeze > requirements.txt

#   flask run

from flask import Flask, request, jsonify, render_template
from models import db, connect_db, Todo

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///todos_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'mySecret'

connect_db(app)

@app.route('/')
def index_page():
    return render_template('index.html')







@app.route('/api/todos')
def list_todos():
    "List all todos in JSON format"
    all_todos = [todo.serialize() for todo in Todo.query.all()]
    return jsonify(todos=all_todos)

@app.route('/api/todos/<int:id>')
def get_todo(id):
    "List one todos in JSON format"
    todo = Todo.query.get_or_404(id)
    return jsonify(todo=todo.serialize())

@app.route('/api/todos', methods = ['POST'])
def create_todo():
    "New Todo"
    new_todo = Todo(title=request.json['title'])
    db.session.add(new_todo)
    db.session.commit()
    response_json= jsonify(todo=new_todo.serialize())
    return jsonify(response_json, 201)

@app.route('/api/todos/<int:id>', methods=["PATCH"])
def update_todo(id):
    "Update one todo"
    todo = Todo.query.get_or_404(id)
    todo.title = request.json.get('title',todo.title)
    todo.done = request.json.get("done", todo.done)
    db.session.commit()
    return jsonify(todo=todo.serialize())

@app.route('/api/todos/<int:id>', methods=["DELETE"])
def delete_todo(id):
    "Update one todo"
    todo = Todo.query.get_or_404(id)
    db.session.delete(todo)
    db.session.commit()
    return jsonify(message="deleted")
