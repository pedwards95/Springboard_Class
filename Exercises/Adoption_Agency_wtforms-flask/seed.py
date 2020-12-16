"Seed File"

from models import Pet
from sqlalchemy_utils.functions import database_exists, drop_database, create_database

def seed(my_db):
    "Simple seeding template"

    if database_exists('postgresql:///pets_db'):
        drop_database('postgresql:///pets_db')
    create_database('postgresql:///pets_db')
    my_db.drop_all()
    my_db.create_all()

    Pet.query.delete()

    duke = Pet(name="Duke", species="dog", photo_url="https://i.pinimg.com/originals/95/0d/20/950d20561dbb4881cd1c99d5dc99ce0d.jpg", age=8, available=True)
    lily = Pet(name="Lily", species="dog", photo_url="https://i.pinimg.com/564x/cb/a9/b8/cba9b80a1aa7889864c0acf86687dd2e.jpg", age=4, notes="Very Sweet, likes to cuddle.", available=True)
    portia = Pet(name="Portia", species="dog", photo_url="https://i.pinimg.com/originals/ab/30/13/ab3013eaed5b64012933f2e38c955064.jpg", age=1, notes="Wild and very shy.", available=True)
    sammy = Pet(name="Sammy", species="dog", photo_url="https://www.anythinglabrador.com/wp-content/uploads/2019/03/Chocolate-Labrador-Retriever.jpg", age=6, available=True)
    lola = Pet(name="Lola", species="dog", photo_url="https://worlddogfinder.com/imager/880x495/upload/articles/australian_cattle_dog_junior_1.jpg", age=5, notes="Not good with other dogs, but very protective of home and family.", available=True)

    my_db.session.add(duke)
    my_db.session.add(lily)
    my_db.session.add(portia)
    my_db.session.add(sammy)
    my_db.session.add(lola)

    my_db.session.commit()