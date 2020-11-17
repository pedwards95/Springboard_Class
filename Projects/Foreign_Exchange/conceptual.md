# Conceptual Exercise

Answer the following questions below:

-   What are important differences between Python and JavaScript?
    Python is strongly typed – no implicit conversion between types whereas JavaScript is weakly typed. JavaScript can be used to run on frontend whereas python is on server-sidprogramming or backend. The code blocks are slightly different, and the data structures are slightly different. Errors in Python are treated much more harshly.

-   Given a dictionary like `{"a": 1, "b": 2}`: , list two ways you
    can try to get a missing key (like "c") _without_ your programming
    crashing.

1. dictionary.get("c")
2. try:
   dictionary["c"]
   catch:
   ...

-   What is a unit test?

It is a test of a single part, usually just a single function, in your code. The purpose is for functionality.

-   What is an integration test?

It is a test of how two parts of your code flow together. It will involve multiple functions and/or process and/or files.

-   What is the role of web application framework, like Flask?

Application frameworks make programing far easier by providing a lot of the functionality prewritten, and enforcing rules on how to interact with it. Flask is for setting up controllers and servers in Python.

-   You can pass information to Flask either as a parameter in a route URL
    (like '/foods/pretzel') or using a URL query param (like
    'foods?type=pretzel'). How might you choose which one is a better fit
    for an application?

Baking the information into the url would suggest that the entire page is about whatever that info is. In this case, pretzels. Query string information is more of an add-on that helps shape the page, but not nessisary is just it. For example, searching for pictures of differents preztels.

-   How do you collect data from a URL placeholder parameter using Flask?

The route will have <param_name> and that is passed into the function as a named variable.

-   How do you collect data from the query string using Flask?

The info is passed in the request object, and be be reached with request.args["param_name"]

-   How do you collect data from the body of the request using Flask?

That data can also be found in the request object that is passed in. request.form["param_name"] or request.json["param_name"]

-   What is a cookie and what kinds of things are they commonly used for?

A cookie is a small bit of information, stored as a string, that is sent to the server with every request. It is used to keep track of information, usually preferences.

-   What is the session object in Flask?

It is a special type of clientside data storage that is encrypted so that it can not be messed with through JavaScript. It stores data in key value pairs, similar to cookies, but has more storage space, similar to local storage.

-   What does Flask's `jsonify()` do?

It converts the data structure into JSON read-able format.
