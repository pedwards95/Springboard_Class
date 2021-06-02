### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
Asyc functions with await, working with promise.resolve, multithreading.

- What is a Promise?
It is an object that is returned that basically says that there will eventually be a value, when the asynchronous code completes.

- What are the differences between an async function and a regular function?
An async function can run simultaniously to each other and to the main regular thread. The regular function runs in line, and the code does not proceed until it is complete.

- What is the difference between Node.js and Express.js?
Node.js is an open source and cross-platform runtime environment for executing JavaScript code outside of a browser. Express is a small framework that sits on top of Node.js’s web server functionality to simplify its APIs and add helpful new features. It makes it easier to organize your application’s functionality with middleware and routing.

- What is the error-first callback pattern?
The error-first pattern consists of executing a function when the asynchronous operation ends which takes as the first argument an error, if one occurred, and the result of the request as extra arguments.

- What is middleware?
Middleware are functions and operations that occur in addition to the controllers endpoints, often on every call to the server. This could include things like logging or data gathering.

- What does the `next` function do?
The next function allows the call to pass to the next valid enpoint. Without calling next, and without return an answer to the request, a request would sit at an endpoint forever, waiting for a reply that will never come.

- What does `RETURNING` do in SQL? When would you use it?
The RETURNING clause allows you to retrieve values of columns that were modified by an insert, delete or update.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

The main thing wrong with this is that it is a named function that really only is to be used once. Without any input to the users gathered, this is more of a 'on load' function, which can be put into an anonymous function within an event handler. Also, with the way it is, it will re-request the same people every single time, which is not the best  and a huge waste if you only wanted one.
