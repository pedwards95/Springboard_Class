def find_factors(num):
    """Find factors of num, in increasing order.

    >>> find_factors(10)
    [1, 2, 5, 10]

    >>> find_factors(11)
    [1, 11]

    >>> find_factors(111)
    [1, 3, 37, 111]

    >>> find_factors(321421)
    [1, 293, 1097, 321421]
    """

    my_return = []
    for myNum in range(1,num+1):
        if (num/myNum).is_integer():
            my_return.append(myNum)
    return my_return

print(find_factors(10))
print(find_factors(11))
print(find_factors(111))
print(find_factors(321421))
