from http.server import HTTPServer, CGIHTTPRequestHandler

server_adress = ("localhost", 5501)
httpd = HTTPServer(server_adress, CGIHTTPRequestHandler)
httpd.serve_forever()