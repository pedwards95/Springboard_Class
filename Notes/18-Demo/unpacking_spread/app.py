# 17.8

#Packing / Unpacking

#UNPACKING
names = ["Charlie","Lucy"]
name1, name2 = names
print(name1)
print(name2)

sorted_scores = [2400,2350,2100,1960]
top_score, *scores = sorted_scores
print(top_score)
print(scores)
print(sorted_scores)

point = (40,50,20)
x,y,z = point
(x,y,z) = (40,50,20)

color_pairs = [["red","green"],["purple","orange"]]
((primary1,secondary1), (primary2,secondary2)) = color_pairs
print(primary1)
print(primary2)
print(secondary1)
print(secondary2)

#Spread Sets
set1 = {*'hello'}
set2 = {*'hello', 45, 'good', *'bye'}
print(set1)
print(set2)

#Spread Dictionary
rainfall = { "Jan": 2.5, "Feb":4.9}
print({*rainfall})
print({**rainfall})
