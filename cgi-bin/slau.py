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
rangMatrix = np.linalg.matrix_rank(a_matrix)


print("Content-type: application/json")
print()
print(json.dumps([a_matrix, b_matrix]))
