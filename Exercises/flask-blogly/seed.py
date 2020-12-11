"Seed File"

from models import User, Post

def seed(my_db):
    "Simple seeding template"
    my_db.drop_all()
    my_db.create_all()

    User.query.delete()

    bob = User(first_name="Bob", last_name="Sagget")
    george = User(first_name="George", last_name="Sagget")
    adam = User(first_name="Adam", last_name="Sagget")
    oliver = User(first_name="Oliver", last_name="Twist")
    barbarah = User(first_name="Barbarah", last_name="Harris")
    anthony = User(first_name="Anthony", last_name="Jackson")
    clint = User(first_name="Clint", last_name="Eastwood")
    steve = User(first_name="Steve", last_name="Austin")
    steve2 = User(first_name="Steve", last_name="Irwin")

    my_db.session.add(bob)
    my_db.session.add(george)
    my_db.session.add(adam)
    my_db.session.add(oliver)
    my_db.session.add(barbarah)
    my_db.session.add(anthony)
    my_db.session.add(clint)
    my_db.session.add(steve)
    my_db.session.add(steve2)

    my_db.session.commit()

    post1 = Post(title="Hello", content="I just wanted to say...", posted_by=1)
    post2 = Post(title="Goodbye", content="You say hello, I say...", posted_by=1)
    post3 = Post(title="22 ducks", content="Here are some duck pictures", posted_by=2)
    post4 = Post(title="I love cats", content="please comment below if you also love cats", posted_by=3)
    post5 = Post(title="Why so many animals?", content="I think everyone on this site is an animal lover! What is going on here??", posted_by=1)
    post6 = Post(title="How to unclog a toilet (IN DEPTH)", content="Step 1: Get someone else to do it. Finished.", posted_by=4)
    post7 = Post(title="The most interesting man", content="SPOILERS:!!!!   Its me.", posted_by=4)
    post8 = Post(title="No title", content="No content", posted_by=6)
    post9 = Post(title="Lorem ipsum", content="Tab completion didnt work.....", posted_by=7)

    my_db.session.add(post1)
    my_db.session.add(post2)
    my_db.session.add(post3)
    my_db.session.add(post4)
    my_db.session.add(post5)
    my_db.session.add(post6)
    my_db.session.add(post7)
    my_db.session.add(post8)
    my_db.session.add(post9)

    my_db.session.commit()
