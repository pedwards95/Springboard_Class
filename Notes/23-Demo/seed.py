from models import Pet, db
from app import app

db.drop_all()
db.create_all()

Pet.query.delete()

whiskey = Pet(name="Whiskey", species="dog")
bowser = Pet(name="Bowser", species="dog", hunger=10)
spike = Pet(name="Spike", species="porcupine")

db.session.add(whiskey)
db.session.add(bowser)
db.session.add(spike)

db.session.commit()