#!/usr/bin/env python3
#!/usr/bin/env python
import json
import cgi
import sys
import os
import numpy as np

content_len = int(os.environ.get('CONTENT_LENGTH', 0))
post_body = sys.stdin.read(content_len)

# Преобразуем JSON-строку в объект Python
data = json.loads(post_body)

# Далее можно работать с данными, например:
a_matrix = data['aMatrix']
b_matrix = data['bMatrix']

A = np.array(a_matrix)
b = np.array(b_matrix)

A = A.astype(int)
b = b.astype(int)

AT = A.T
ATA = A.T.dot(A)
ATAD = np.linalg.det(ATA)
ATb = AT.dot(b)
ATA_1 = np.linalg.inv(ATA)
X = ATA_1.dot(ATb)
#rangMatrix = np.linalg.matrix_rank(A)

print("Content-type: application/json")
print()
resultMNK = {
    'result': {
        'AT': {
            'matrix': AT.tolist(),
            'label': "Транспонируем матрицу \'A\': "
        },
        'ATA': {
            'matrix': ATA.tolist(),
            'label': "Умножаем тринспонированную матрицу \'A\' на пераоначальную матрицу \'A\': "
        },
        'ATAD': {
            'matrix': ATAD.tolist(),
            'label': "Находим определитель: "
        },
        'ATA_1': {
            'matrix': ATA_1.tolist(),
            'label': "Находим обратную матрицу: "
        },
        'ATb': {
            'matrix': ATb.tolist(),
            'label': "Умножаем транспонированную матрицу \'A\' на вектор \'b\': "
        },
        'X': {
            'matrix': X.tolist(),
            'label': "Умножаем обратную матрицу на произведение, транспонированой матирцы и вектора \'b\': "
        }
    }
}


print(json.dumps(resultMNK))