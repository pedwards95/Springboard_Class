def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase.

        >>> multiple_letter_count('yay')
        {'y': 2, 'a': 1}

        >>> multiple_letter_count('Yay')
        {'Y': 1, 'a': 1, 'y': 1}
    """
    return_dict = {}
    for letter in phrase:
        if return_dict.get(letter):
            return_dict[letter] = return_dict[letter]+1
        else:
            return_dict[letter] = 1
    return return_dict

print(multiple_letter_count('yay'))
print(multiple_letter_count('Yay'))
