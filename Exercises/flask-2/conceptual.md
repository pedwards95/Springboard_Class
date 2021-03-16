### Conceptual Exercise

Answer the following questions below:

- What is RESTful routing?
A RESTful route is a route that provides mapping from HTTP verbs (get, post, put, delete, patch) to controller CRUD actions (create, read, update, delete).

- What is a resource?
A resource is a piece of data that is being used for the purpose of storing information. Resources are encapsulated within objects that use them, such as a file object having a field whose value is a file descriptor

- When building a JSON API why do you not include routes to render a form that when submitted creates a new user?
I do not really understand what this question is asking. The answer could be because the JSON API only responds with JSON, not HTML, so redering the response would only output plain text with JSON syntax. Another answer could be cause you need authentification to create a new user, and you would not want to have that route open publically. Another answer could be that a JSON API is usually meant to be used internally, and would connect with another backend, and not a front end. 

- What does idempotent mean? Which HTTP verbs are idempotent?
Idempotent means that the result of the request is the same no matter how many times the request is recieved/sent. Some examples are PUT, DELETE, GET

- What is the difference between PUT and PATCH?
The PUT method sends a modified version of the requested resource, which replaces the original version of the resource. 
The PATCH method supplies a set of instructions to modify the original resource.

- What is one way encryption?
Given a hash value, or any other result of an encrytion, it is statistically infeasible to re-create a document that would produce this value.

- What is the purpose of a `salt` when hashing a password?
A salt is random bits added to each password instance before its hashing. Salts create unique passwords even in the instance of two users choosing the same passwords.

- What is the purpose of the Bcrypt module?
The bcrypt hashing function allows us to build a password security platform that can be scaled exponentially by always hashing every password with a set length of salt.

- What is the difference between authorization and authentication?
Authorization is being allowed to do something.
Authentication is proving you are who you claim to be.
