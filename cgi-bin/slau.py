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

ATA = A.T.dot(A)
rangMatrix = np.linalg.matrix_rank(A)

print("Content-type: application/json")
print()
#print(json.dumps([a_matrix]))
print(json.dumps({'ATA': {'matrix': ATA.tolist(),
                          'label': "Транспонируем матрицу \'A\': "}}))