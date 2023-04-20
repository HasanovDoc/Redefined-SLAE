#!/usr/bin/env python3
#!/usr/bin/env python
import json
import cgi
import sys
import os

content_len = int(os.environ.get('CONTENT_LENGTH', 0))
post_body = sys.stdin.read(content_len)

# Преобразуем JSON-строку в объект Python
data = json.loads(post_body)

# Далее можно работать с данными, например:
a_matrix = data['aMatrix']
b_matrix = data['bMatrix']

print("Content-type: application/json")
print()
print(a_matrix)
print(b_matrix)
