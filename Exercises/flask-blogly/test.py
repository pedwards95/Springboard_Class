"Test File"

from app import app, my_db
from models import User
from unittest import TestCase

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']
class RoutesGetTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        "Add a user"
        my_db.session.add(User(first_name="Joe", last_name="Smith"))
        my_db.session.commit()

    @classmethod
    def tearDownClass(cls):
        "Add a user"
        joe = User.query.filter(User.first_name.like("Joe"), User.last_name.like("Smith")).first()
        my_db.session.delete(joe)
        my_db.session.commit()

    def test_home_page(self):
        with app.test_client() as client:
            res = client.get('/home')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code,200)
            self.assertIn('Home',html)
    def test_all_users(self):
        with app.test_client() as client:
            res = client.get('/all_users')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code,200)
            self.assertIn('Joe Smith',html)
    def test_get_user(self):
        with app.test_client() as client:
            my_id = User.query.filter(User.first_name.like("Joe"), User.last_name.like("Smith")).first().id
            res = client.get(f'/user/{my_id}')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code,200)
            self.assertIn('Joe Smith',html)
    def test_get_edit_user(self):
        with app.test_client() as client:
            my_id = User.query.filter(User.first_name.like("Joe"), User.last_name.like("Smith")).first().id
            res = client.get(f'/user/edit/{my_id}')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code,200)
            self.assertIn('Joe Smith',html)
            self.assertIn('Submit Edit',html)