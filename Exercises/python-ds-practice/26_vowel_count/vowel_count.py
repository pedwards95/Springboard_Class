def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}

        >>> vowel_count('HOW ARE YOU? i am great!')
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """

    my_return = {}
    for letter in phrase:
        if my_return.get(letter.lower()) and letter.lower() in "aeiou":
            my_return[letter.lower()] = my_return[letter.lower()]+1
        elif letter.lower() in "aeiou":
            my_return[letter.lower()] = 1
    return my_return

print(vowel_count('rithm school'))
print(vowel_count('HOW ARE YOU? i am great!'))