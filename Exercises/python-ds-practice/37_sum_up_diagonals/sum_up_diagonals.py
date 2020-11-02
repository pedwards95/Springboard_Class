def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return sum of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

        >>> m1 = [
        ...     [1,   2],
        ...     [30, 40],
        ... ]
        >>> sum_up_diagonals(m1)
        73

        >>> m2 = [
        ...    [1, 2, 3],
        ...    [4, 5, 6],
        ...    [7, 8, 9],
        ... ]
        >>> sum_up_diagonals(m2)
        30
    """

    height = len(matrix)
    index = 0
    my_sum = 0

    while index < height:
        print(f"{my_sum} + {matrix[height-index-1][index]} + {matrix[index][index]}")
        my_sum = my_sum + matrix[height-index-1][index] + matrix[index][index]
        index = index+1
    return my_sum

m1 = [
    [1,   2],
    [30, 40],
    ]
print(sum_up_diagonals(m1))

m2 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ]
print(sum_up_diagonals(m2))

m3 = [
    [1, 2, 3, 2, 5, 3],
    [4, 5, 6, 1, 7, 4],
    [7, 8, 9, 3, 2, 2],
    [2, 5, 2, 1, 5, 7],
    [4, 1, 8, 9, 1, 1],
    [2, 9, 3, 2, 4, 1],
    ]
print(sum_up_diagonals(m3))