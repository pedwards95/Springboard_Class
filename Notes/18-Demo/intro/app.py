# ipython


#numbers
like_this = "python variable name convention"
chickens = 13
chickens = 20

num1 = 5
num2 = 5.0
print(type(num1))
print(type(num2))

print(6/4)
print(6//4)

print(int(4.3546))
print(float(7))

print(3**2)

print(4.56.is_integer())
print(4.0000.is_integer())


#strings
print(''' stufff
stuff rtmnvtrjknbtkjbnt
nrbhjgvrthgbt
rgvtjtrbgtgt
rgtryhgjugb
trbghthtb
ferbghvjtg ''')

food = 'cheese'
print(f'I love {food}')

# \n = new line
# \t = tab

#lists (like js arrays)
people = ['John', 'Ringo', 45]
print(people)

#booleans
#capitol T
yes = True
no = False
print(yes,no)

print(3<=3)

print([1,2,3] == [1,2,3])
print([1,2,3] == [1,2,4])

print([1,2,3] is [1,2,3])
nums = [1,2,3]
copy = nums
print(nums is copy)
print(nums is not copy)

#indents
age = 23
if age >= 18:
    print("please go vote")
elif age == 0:
    print: "BABY WHAAAAAAAA!"
else:
    print("too young")
    print("you need to")
print("grow up")

#run with:   python filename

#or.. : ipython
#       %run filename


#ternary operations
msg = "go vote!" if (age >=18) else "go play!"
print(msg)

color = "teal"
print("GOOD CHOICE") if color == 'teal' else print("MEH")

#boolean operators
print (True and False)

x=103
print(x== 103 or x > 100)

print (not False)
print (not True)

#truthy falsy
#falsy = 0,0.0,"",None,False,[](empty list),{}(empty dictionary),set()(empty set)

guess = input('enter your guess  \n')
print(f"You guessed {guess}")

colors = ["red","orange","yellow","green"]
for color in colors:
    print(color)

for char in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
    print(char)

for n in range(10):
    print(n)

print(list(range(10)))

print(list(range(10,100,10)))

def divide(a,b):
    """THIS IS A DOC STRING THAT ONLY SHOWS WHEN USING HELP COMMAND"""
    if type(a) is int and type(b) is int:
        return a/b
    return "A and B must be ints!"

#getting help
#dir(input) returns all methods of passed in object
#help() goes to python's help utility (ctrl+d to exit)
#help(input) shows a lot of documentation about input, including the signature of it