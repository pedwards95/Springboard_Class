import score

def make_person(name, favColor):
    return {
        'name': name,
        'favColor': favColor,
        'birth_year': score.get_rand_year(),
        'birth_month': score.get_rand_month()
    }