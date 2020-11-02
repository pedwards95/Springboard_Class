def is_palindrome(phrase):
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and
    forwards).

        >>> is_palindrome('tacocat')
        True

        >>> is_palindrome('noon')
        True

        >>> is_palindrome('robert')
        False

    Should ignore capitalization/spaces when deciding:

        >>> is_palindrome('taco cat')
        True

        >>> is_palindrome('Noon')
        True
    """

    new_phrase = phrase.replace(" ", "").lower()
    counter = 0
    while counter < len(new_phrase)-counter-1:
        if new_phrase[counter] != new_phrase[len(new_phrase)-counter-1]:
            return False
        counter= counter+1
    return True


print(is_palindrome('tacocat'))
print(is_palindrome('noon'))
print(is_palindrome('robert'))
print(is_palindrome('taco cat'))
print(is_palindrome('Noon'))
