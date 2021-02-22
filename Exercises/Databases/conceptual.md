### Conceptual Exercise

Answer the following questions below:

- What is PostgreSQL?

PostgreSQL is a database management language used to interact with a store data in relational tables.

- What is the difference between SQL and PostgreSQL?

PostgreSQL is an advanced version of SQL. They both have similar structure, and in most cases can be used in place of each other with no convertion,
but PostgreSQL has some more complex and advanced features, like extra data types and JSON support.

- In `psql`, how do you connect to a database?

\c databasename

- What is the difference between `HAVING` and `WHERE`?

The WHERE clause is a condition that data is compared against when originally selected. 
The HAVING clause is used to filter out data after it has been selected, usually used in conjunction with its aggragated form. 
WHERE is a Pre-Filter and HAVING is a Post-Filter

- What is the difference between an `INNER` and `OUTER` join?

An INNER join takes only data where both tables have a match. 
An OUTER join uses one or both sides of the tables no matter what.
OUTER joins often generate blank or null data points in the joined table, as one side had data, but the other side did not have a match.

- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?

LEFT uses the first table as the reference point, and includes all of the left, and any of the right that have matches.
RIGHT does the opposite, including all of the right and any of the left that have matches.

- What is an ORM? What do they do?

An ORM, or an Object Relational Mapper, is a tool or framework within most programming languages for turning relational databases, like SQL, to and from objects within that language.

- What are some differences between making HTTP requests using AJAX 
  and from the server side using a library like `requests`?

I don't think there is really a difference, other than where the request is coming from. When using AJAX, the request is coming from the user. When using a library, the request is coming from the server. I suppose that when dealing with CORS, requesting from a stable address like a server using a library is the most effective method. Regardless, the clientside will still be making requests to the server... its just the server will be getting the infor for them instead of them getting the info directly.

- What is CSRF? What is the purpose of the CSRF token?

Cross Site Request Forgery. When one website makes a requests from your computer to a completely different and unrelated address, often without you realizing it. 
The token helps to stop things like this from happening by requiring two keys, one that is stored on a cookie, and one that is included in the form that is submitted.
These two keys must arrive at the same time, and match the keys the server is expecting, or else the request is rejected.

- What is the purpose of `form.hidden_tag()`?

This includes hidden data in the form request, including tokens and cookies.
