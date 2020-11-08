# Put your app in here.
from flask import Flask, request # pylint: disable=import-error
import operations

app=Flask(__name__)

@app.route("/add")
def add():
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(operations.add(a,b))

@app.route("/sub")
def sub():
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(operations.sub(a,b))

@app.route("/mult")
def mult():
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(operations.mult(a,b))

@app.route("/div")
def div():
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(operations.div(a,b))

@app.route("/math/<operation>")
def do_math(operation):
    a = int(request.args["a"])
    b = int(request.args["b"])
    my_operations = {
        "add" : operations.add,
        "sub" : operations.sub,
        "mult" : operations.mult,
        "div" : operations.div
    }
    function = my_operations.get(operation,None)
    return str(function(a,b))
