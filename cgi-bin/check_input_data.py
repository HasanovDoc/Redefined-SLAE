import numpy as np



def check_input_data(matrix):
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

    print(np.linalg.matrix_rank(matrix))
    print(gauss_elimination(matrix))

def tests():
    A = np.array([[1, 2, 4],
                  [1, 3, 5],
                  [1, 5, 7],
                  [1, 4, 6]])

    check_input_data(A)

#tests()