def get_days_alive(person):
    try:
        days = person['age']*365
        print(f"{person['name']} has been alive for {days} days")
    except KeyError as exc:
        print(f"Missing key: {exc}")
    except TypeError:
        print("Expected person to be a dictionary")
    except:
        print("Something else went wrong")

get_days_alive({})
get_days_alive({'age':20})
get_days_alive({'age':19,'name':'Princess Kitty'})

try:
    raise ValueError("I dont like that value")
except ValueError as exc:
    print(exc)