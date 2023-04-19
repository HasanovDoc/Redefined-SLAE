#!/usr/bin/env python3
#!/usr/bin/env python
import cgi

our_form = cgi.FieldStorage()
A = our_form.getlist("arrA")

print("Content-type: text/html")
print()
print(A)