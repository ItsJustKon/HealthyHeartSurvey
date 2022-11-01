from http.server import BaseHTTPRequestHandler, HTTPServer
import resource
import time
import cgi
import csv

with open('../data/heartData.csv', mode='r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    rows = list(csv_reader)
    

overall = []

for i in range(len(rows)):
    if rows[i]['locationabbr'] == "USM" and rows[i]['topic'] == "Smoking" and rows[i]['break_out'] == "Overall":
        overall.append(i)

print(overall)
print(rows[0])

hostName = "localhost"
serverPort = 8080

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("Hello!", "utf-8"))
    
    def do_POST(self):
        self.send_response(200)
        self.end_headers()
        
        form = cgi.FieldStorage(
            fp = self.rfile,
            headers = self.headers,
            environ = {"REQUEST_METHOD": "POST"}
        )
        
        usage = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
        print(usage)


if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")