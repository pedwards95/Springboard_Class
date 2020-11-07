import math
import random

class Triangle:
    "Right Triangle."

    def __init__(self,a,b):
        "Create triangle from a and b sides."
        self.a = a
        self.b = b

    @classmethod
    def random(cls):
        return cls(random.randint(1,20), random.randint(1,20))
    
    def get_hypotenuse(self):
        "Get hypotenuse (length of 3rd side)"
        return math.sqrt(self.a ** 2 + self.b ** 2)
    
    def get_area(self):
        "Get area of triangle."
        return (self.a * self.b) / 2

    def describe(self):
        return f"My area is {self.get_area()}"

    def __eq___(self,other):
        "Redefines == operator for Triangle"
        return self.a == other.a and self.b == other.b