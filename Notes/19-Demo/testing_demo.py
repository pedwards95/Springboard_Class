from flask import session

def adder(x,y):
    return x+y


# to run without asserts, python -O file_name.py

assert adder(2,5) == 7
# assert adder(2,5) == 10, "expected 2+5 to be 10"
assert adder(2,3) == 5, "expected 2+3 to be 5"

# can also use doctests
#     python -m doctest file_name.py
# adding -v gives more info about what is going on
#     python -m doctest -v file_name.py


# instead, unittest module
# test methods MUST start with test_
# run with:
#    python -m unittest file_name.py
from unittest import TestCase
class AdditionTestCase(TestCase):
    def test_adder(self):
        assert adder(2,3) == 5
    def test_adder_2(self):
        self.assertEqual(adder(2,2),4)


# more

def reverse_str(s):
    return s[::-1]

def is_palindrome(s):
    rev = reverse_str(s)
    return s.lower() == rev.lower()

def factorial(n):
    if not (isinstance(n, int) and n >= 0):
        raise ValueError("'n' must be a non-negative integer.")
    if n==0:
        return 1
    result = 1
    for i in range(2, n+1):
        result *= i
    return result

class AlgorithsTestCase(TestCase):
    def test_revers(self):
        self.assertEqual(reverse_str("hello"),"olleh")
        self.assertEqual(reverse_str("Apple"),"elppA")

    def test_is_palindrome(self):
        self.assertTrue(is_palindrome('racecar'))
        self.assertTrue(is_palindrome('Kayak'))
        self.assertFalse(is_palindrome('taco'))

    def test_factorial(self):
        self.assertEqual(factorial(5),120)
        self.assertEqual(factorial(3),6)
        self.assertRaises(ValueError,factorial,"hello")

# can run tests in vscode
# ctrl + shift + p
# python run all tests
#   visual interface on left hand side



# INTEGRATION TESTING
from app import app

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']
class ViewsTestCase(TestCase):
#test GET
    def test_home_page(self):
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code,200)
            self.assertIn('<h1> HOME PAGE </h1>',html)

#test POST
    def test_form(self):
        with app.test_client() as client:
            res = client.post('/add-comment', data={'comment': "HELLO WORLD!"})
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code,200)
            self.assertIn('HELLO WORLD',html)

#test REDIRECT
    def test_redirect(self):
        with app.test_client() as client:
            res = client.get('/old-home-page')

            self.assertEqual(res.status_code,302)
            self.assertEqual(res.location,"http://localhost/")

    def test_redirect_followed(self):
        with app.test_client() as client:
            res = client.get('/old-home-page', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code,200)
            self.assertIn('<h1> HOME PAGE </h1>',html)

#test session
#this one isn't fully working because I didn't set up this route to have session data. It doesnt increment on page.
    def test_session_count(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['count'] = 999
                change_session['count'] = 1000 #this increment should happen on the page but it isnt in my example

            res= client.get('/')

            self.assertEqual(res.status_code,200)
            self.assertEqual(session['count'],1000)

    @classmethod
    def setUpClass(cls):
        print("INSIDE SET UP CLASS")

    @classmethod
    def tearDownClass(cls):
        print("INSIDE TEAR DOWN CLASS")

    def setUp(self):
        print("INSIDE SET UP")

    def tearDown(self):
        print("INSIDE TEAR DOWN")