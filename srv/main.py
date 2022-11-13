import cgi
import csv
from http.server import BaseHTTPRequestHandler, HTTPServer
import json

count = 0

with open('data\heartData.csv', mode='r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    rows = list(csv_reader)
    

overall = []

# for i in range(len(rows)):
#     #Fetches the first instance of average smoking risk
#     if rows[i]['locationabbr'] == "USM" and rows[i]['topic'] == "Smoking" and rows[i]['break_out'] == "Overall":
#         overall.append(i)
#         break



class MyServer(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST')
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
    
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("Hello!", "utf-8"))
        global count
        count += 1
        print("Request #" + str(count) + " fulfilled.")
        
    
    def do_POST(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST')
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        print("Request")
        # give these better names if you want
        body = self.rfile.read(int(self.headers.get('Content-Length')))
        decode = body.decode('utf8').replace("\n", '')
        jsondata = json.loads(decode)
        var = jsondata["age"]#use this to get values from json
        calulations()
        print(f"parsed json?{jsondata}")
        print(f"Age: {var}")
        response = bytes("I DID IT :) Put the percentages and stuff here kingston i think", "utf-8") #create response
        self.wfile.write(response)

hostName = "localhost"
serverPort = 8080

def calulations():
    ...


if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")