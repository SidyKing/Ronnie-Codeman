from flask import Flask, request, render_template
import datetime
import hashlib

app = Flask(__name__)

def hashcsrf(ip, useragent):
    sha256 = hashlib.sha256(f"{ip}//{useragent}".encode()).hexdigest()[::-1][4:16]
    md5 = hashlib.md5(ip.encode()).hexdigest()[::-1][4:16]
    return sha256 + md5

def dos(csrf):
    with open("log.csv", "r") as f:
        lines = f.read().splitlines()
        difference = 0
        counter = 0
        timestamplist = []
        for line in lines:
            if csrf in line:
                timestamplist.append(line.split(";")[2])
        for i in range(len(timestamplist)-1):
            difference += int(timestamplist[i+1]) - int(timestamplist[i])
            counter += 1
        if counter >= 5 and difference <= 200:
            return True
            
@app.route("/register")
def register(mail, hash, csrf):
    with open("register.csv", "a") as f:
        f.write(f"{mail};{hash};{csrf}\n")
    return "OK"

@app.route("/login")
def login(mail, hash, csrf):
    with open("register.csv", "r") as f:
        lines = f.read().splitlines()
        for line in lines:
            if mail in line:
                if hash in line:
                    if csrf in line:
                        return "OK"
    return "Invalid"
    
@app.route("/")
def log():
    client_ip = request.remote_addr
    useragent = request.headers.get("User-Agent").replace(";", "")
    timestamp = int(datetime.datetime.timestamp(datetime.datetime.now()))
    requests_type = request.method

    csrf = hashcsrf(client_ip, useragent)
    if dos(csrf):
        with open("ban.csv", "a") as f:
            f.write(f"{client_ip};dos;{csrf}\n")
            
        return render_template("honeypot.html")
    print(f"{client_ip};{useragent};{timestamp}")
    with open("log.csv", "a") as f:
        f.write(f"{client_ip};{useragent};{timestamp};{requests_type};{csrf}\n")
    return "OK"


@app.route("/honeypot")
def honeypot():
    return render_template("honeypot.html")

if __name__ == "__main__":
    
    app.run()
