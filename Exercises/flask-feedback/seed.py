"Seed File"

from models import User
from sqlalchemy_utils.functions import database_exists, drop_database, create_database

def seed(my_db):
    "Simple seeding template"

    if database_exists('postgresql:///users_db'):
        drop_database('postgresql:///users_db')
    create_database('postgresql:///users_db')
    my_db.drop_all()
    my_db.create_all()

    User.query.delete()

    
    # my_db.session.add(duke)

    # my_db.session.commit()