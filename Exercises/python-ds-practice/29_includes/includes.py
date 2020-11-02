def includes(collection, sought, start=None):
    """Is sought in collection, starting at index start?

    Return True/False if sought is in the given collection:
    - lists/strings/sets/tuples: returns True/False if sought present
    - dictionaries: return True/False if *value* of sought in dictionary

    If string/list/tuple and `start` is provided, starts searching only at that
    index. This `start` is ignored for sets/dictionaries, since they aren't
    ordered.

        >>> includes([1, 2, 3], 1)
        True

        >>> includes([1, 2, 3], 1, 2)
        False

        >>> includes("hello", "o")
        True

        >>> includes(('Elmo', 5, 'red'), 'red', 1)
        True

        >>> includes({1, 2, 3}, 1)
        True

        >>> includes({1, 2, 3}, 1, 3)  # "start" ignored for sets!
        True

        >>> includes({"apple": "red", "berry": "blue"}, "blue")
        True
    """

    if start and (isinstance(collection,tuple) or isinstance(collection,str) or isinstance(collection,list)):
        for num in range(start,len(collection)):
            if collection[num] == sought:
                return True
    elif isinstance(collection,dict):
        for val in collection.values():
            if val == sought:
                return True
    elif sought in collection:
        return True
    return False

print(includes([1, 2, 3], 1))
print(includes([1, 2, 3], 1, 2))
print(includes("hello", "o"))
print(includes(('Elmo', 5, 'red'), 'red', 1))
print(includes({1, 2, 3}, 1))
print(includes({1, 2, 3}, 1, 3))
print(includes({"apple": "red", "berry": "blue"}, "blue"))