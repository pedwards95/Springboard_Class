### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
  JSON web token, used for authentification

- What is the signature portion of the JWT?  What does it do?
  The signiture is used to verify the sender, and ensure that the contents of the token were not changed along the way. 
  It is the result of the header,body, and a secret key.

- If a JWT is intercepted, can the attacker see what's inside the payload?
  Yes, they can.

- How can you implement authentication with a JWT?  Describe how it works at a high level.
  Because the JWT has the signiture, you can have all login/authentification requests be accompanied by this JWT.
  It ensures that it was a friendly the created that JWT, and that the user is a real user.

- Compare and contrast unit, integration and end-to-end tests.
  Unit testing tests a single blockof code, usually just a single function.
  Integration tests check how code flows together, for example from frontend to backend or vice versa.
  end-to-end test check the whole flow, and follow a path like a real user or consumer would.
  Unit testing is the easiest, but creates "gaps" between functions and processes. 
  Integration is good for catching those gaps, but take a bit longer to create. Also may require mocks.
  End-to-end testing gives the best coverage, but takes a really long time to create, and is very prone to having to be 'fixed' with very minor code changes.

- What is a mock? What are some things you would mock?
  A mock is a function or object that is created to simulate a dependency. For example, a repository. The mock would return the same thing every time. 
  Assumedly the mock is being tested elsewhere, and doesnt need to be tested again.

- What is continuous integration?
  Continuous integration is a development strategy where you are pushing to the finished product every day.
  You write small blocks of code, tests are run on it, and then it is re-deployed for the public/use.

- What is an environment variable and what are they used for?
  Environment variables are like global variables that can be seen pretty much anywhere in the program. 
  These are often used for settings or secret keys.

- What is TDD? What are some benefits and drawbacks?
  Test-driven development (TDD) is a style of programming where coding, testing, and design are tightly interwoven. 
  You write the tests first, and then write the minimum code to make them pass. Then you write a new test. And repeat.
  This method takes much longer, but ensures the program is working as intended all the way through, and you dont end up with strange bugs slipping through the cracks that you then have to go back and fix later.

- What is the value of using JSONSchema for validation?
  JSONSchema can help to enforce types and parameters. It helps to keep your code cleaner, and puts the parameters in an easy to change place, should you wish to later.

- What are some ways to decide which code to test?
  Test everything.

- What are some differences between Web Sockets and HTTP?
  No idea. I know they are both communication protocals, but that is about it.


- Did you prefer using Flask over Express? Why or why not (there is no right 
  answer here --- we want to see how you think about technology)?
  I did not have a preference between the two, however I will say that I tend to get in one "mode" so it is hard to work with both at the same time.
