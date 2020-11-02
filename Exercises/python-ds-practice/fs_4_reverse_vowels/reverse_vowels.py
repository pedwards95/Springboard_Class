def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """
    first_vowel = ''
    last_vowel = ''
    forward_index = 0
    backward_index = len(s)-1
    new_s = []
    new_s[:0] = s
    s = new_s


    while forward_index < backward_index:
        while (not first_vowel or not last_vowel) and forward_index < backward_index:
            if not first_vowel:
                if s[forward_index].lower() in "aeiou":
                    first_vowel = s[forward_index]
                forward_index = forward_index+1
            if not last_vowel:
                if s[backward_index].lower() in "aeiou":
                    last_vowel = s[backward_index]
                backward_index = backward_index-1
        if first_vowel and last_vowel:
            s[forward_index-1] = last_vowel
            s[backward_index+1] = first_vowel
            first_vowel = ''
            last_vowel = ''
    return "".join(s)

print(reverse_vowels("Hello!"))
print(reverse_vowels("Tomatoes"))
print(reverse_vowels("Reverse Vowels In A String"))
print(reverse_vowels("aeiou"))
print(reverse_vowels("why try, shy fly?"))
