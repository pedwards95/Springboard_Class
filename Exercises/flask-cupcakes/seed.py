from app import app
from models import db, Cupcake
from sqlalchemy_utils.functions import database_exists, drop_database, create_database

if database_exists('postgresql:///cupcakes'):
    drop_database('postgresql:///cupcakes')
create_database('postgresql:///cupcakes')
db.drop_all()
db.create_all()

c1 = Cupcake(
    flavor="cherry",
    size="large",
    rating=5,
)

c2 = Cupcake(
    flavor="chocolate",
    size="small",
    rating=9,
    image="https://www.bakedbyrachel.com/wp-content/uploads/2018/01/chocolatecupcakesccfrosting1_bakedbyrachel.jpg"
)

db.session.add_all([c1, c2])
db.session.commit()