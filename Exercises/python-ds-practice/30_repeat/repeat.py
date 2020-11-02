def repeat(phrase, num):
    """Return phrase, repeated num times.

        >>> repeat('*', 3)
        '***'

        >>> repeat('abc', 2)
        'abcabc'

        >>> repeat('abc', 0)
        ''

    Ignore illegal values of num and return None:

        >>> repeat('abc', -1) is None
        True

        >>> repeat('abc', 'nope') is None
        True
    """
    myReturn =''
    if isinstance(num,int):
        if num < 0:
            return None
        while num>0:
            myReturn = myReturn+phrase
            num = num-1
    else:
        return None
    return myReturn

print(repeat('*', 3))
print(repeat('abc', 2))
print(repeat('abc', 0))
print(repeat('abc', -1))
print(repeat('abc', 'nope'))