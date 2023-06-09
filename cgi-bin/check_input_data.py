import numpy as np



def input_data_is_correct(matrix):
    '''
    Для импорта функции нужно использовать такую строку
    from <название_файла> import check_input_data
    '''
    def gauss_elimination(A):
        """
        Функция, которая приводит матрицу A к ступенчатому виду методом Гаусса
        """
        nrows, ncols = A.shape
        for r in range(min(nrows, ncols)):
            if A[r, r] == 0:
                for i in range(r + 1, nrows):
                    if A[i, r] != 0:
                        A[[r, i]] = A[[i, r]]
                        break
                else:
                    continue
            for i in range(r + 1, nrows):
                A[i] = A[i] - A[i, r] / A[r, r] * A[r]
        return A

    def has_zero_row(matrix):
        for row in matrix:
            if all(element == 0 for element in row):
                return True
        return False

    triangle_matrix = gauss_elimination(matrix)
    data_is_correct = not has_zero_row(triangle_matrix)

    return data_is_correct

def tests():
    A = np.array([[1, 2, 4],
                  [1, 3, 5],
                  [4, 5, 7],
                  [2, 4, 6]])

    has = input_data_is_correct(A)
    print(has)

# tests()