def multiply_even_numbers(nums):
    """Multiply the even numbers.

        >>> multiply_even_numbers([2, 3, 4, 5, 6])
        48

        >>> multiply_even_numbers([3, 4, 5])
        4

    If there are no even numbers, return 1.

        >>> multiply_even_numbers([1, 3, 5])
        1
    """
    total = 0
    for num in nums:
        if num == 0:
            return 0
        elif num %2 == 0 and total == 0:
            total = num
        elif num%2 == 0:
            total = total*num
    if not total:
        return 1
    else:
        return total

print(multiply_even_numbers([2, 3, 4, 5, 6]))
print(multiply_even_numbers([3, 4, 5]))
print(multiply_even_numbers([1, 3, 5]))