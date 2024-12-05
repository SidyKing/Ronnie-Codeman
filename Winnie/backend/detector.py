from flask import Flask, request
import datetime
app = Flask(__name__)

@app.route("/")
def log():
    client_ip = request.remote_addr
    useragent = request.headers.get("User-Agent")
    timestamp = datetime
    print(f"{client_ip};{useragent};{timestamp}")
    with open("log.csv", "a") as f:
        f.write(f"{client_ip};{useragent};{timestamp}\n")
    return "OK"

if __name__ == "__main__":
    app.run()