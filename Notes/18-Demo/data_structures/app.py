print(len("hello"))
print(len([1,2,3,4]))

#lists
vegan_no_nos = ["pork","taco","everything","cowFarts"]
if "taco" in vegan_no_nos:
    print("NOT SAFE")
else:
    print("SAFE")

vegan_no_nos = ["pork","taco","everything","cowFarts"]
print(vegan_no_nos[-1])
print(vegan_no_nos[-2])

vegan_no_nos = ["pork","taco","everything","cowFarts"]
print(vegan_no_nos[0:2:1])
print(vegan_no_nos[2:])
print(vegan_no_nos[2::])

#splice
colors = ["Red","Blue","Magenta","Mustard","Amethyst"]
colors[2:4] = ["Purple","Black"]
print(colors)
print(colors.count("Red"))


myNum = '3'
myNum = myNum.zfill(6)
print(myNum)

myLaugh = ".".join('LOOOOOOOL')
print(myLaugh)

myNewLaugh = myLaugh.replace("L","HOOOOO")
myNewNewLaugh = myNewLaugh.replace(".","HO")
print(myNewNewLaugh)


#dictionaries
person = {"first":"Henry","second":"Bob"}
random = {
    "apple":"red",
    "name":"butters",
    "age":"6 months",
    "breed": "Silkie"
}
stuff = {
    True: 34,
    100: "AWESOME",
}
print("apple" in random)
print("butters" in random)
print(random["breed"])
random["age"] = 12
print(random["age"])
print(random.get("NotAKey","haha"))


#set
languages = {'ruby', 'python', 'javascript'}
print(languages)

languages = {'ruby', 'python', 'javascript', 'ruby'}
print(languages)

numbers = [1,2,5,7,4,1,3,45,65,7,87,5,34,5,6,65,6,7,8,9,67,5,3,343,4,55,6,7,8,9,3,1,2,3,4,44,45,5,6,7,8,8,8,8,8,86,235,5456,7,7587]
print(set(numbers))

#these operators only work on sets, but the actual methods accepts any iterable and turns it into a set
lemon = {"Sour","Yellow","Fruit","Bumpy"}
banana = {"Sweet","Yellow","Fruit","Smooth"}
print(lemon | banana) #all
print(lemon | banana | {"Yucky","Smelly"}) #all
print(lemon & banana) #all sames
print(lemon - banana) #only first not sames
print(banana - lemon) #only first not sames
print(banana ^ lemon) #all differents

#tuple
colors = ("red","yellow","green")
print(type(colors))

myTuple = tuple([1,2,3,4])
print(type(myTuple))


#comprehentions
nums = [1,2,3,4,5,6,7,8,9,10,11,12,13]
evens =[]
for num in nums:
    if num %2 == 0:
        evens.append(num)
print(evens)
evens = [num for num in nums if num % 2 == 0]
print(evens)
doubled = [num * 2 for num in nums]
print(doubled)

print([n*n for n in [2,4,6,8]])

print([char.upper() + '.' for char in 'lmafo'])

print([[0 for y in range(3)] for x in range(3)])

print({day:0 for day in "MTWRFSU"})