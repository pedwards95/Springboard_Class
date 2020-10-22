def print_upper_words(words,must_start_with):
    """Print input array of strings out in all caps"""
    # for word in words:
    #     print(str.upper(word))

    for word in words:
        if  word[0] in must_start_with:
            print(str.upper(word))

print_upper_words(['cat','dog','BuNnY','eggs'],must_start_with=["a","e","i","o","u"])