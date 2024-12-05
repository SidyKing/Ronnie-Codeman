from flask import Flask, request, render_template
import datetime
import hashlib

app = Flask(__name__)


def hashcsrf(ip, useragent):
    sha256 = hashlib.sha256(f"{ip}//{useragent}".encode()).hexdigest()[::-1][5:25]
    md5 = hashlib.md5(ip.encode()).hexdigest()[::-1][5:25]
    return sha256 + md5


def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()


def enumeration_detection(ip):
    with open("log.csv", "r") as f:
        lines = f.read().splitlines()
        difference = 0
        counter = 0
        timestamplist = []
        for line in lines:
            if "admin" in line and ip in line:
                timestamplist.append(line.split(";")[2])
        for i in range(len(timestamplist) - 1):
            difference += int(timestamplist[i + 1]) - int(timestamplist[i])
            counter += 1
        if counter >= 10 and difference <= 1:
            return True
    return False


def bruteforce_detection(ip):
    with open("log.csv", "r") as f:
        lines = f.read().splitlines()
        difference = 0
        counter = 0
        timestamplist = []
        for line in lines:
            if "/login" in line and ip in line:
                timestamplist.append(line.split(";")[2])
        for i in range(len(timestamplist) - 1):
            difference += int(timestamplist[i + 1]) - int(timestamplist[i])
            counter += 1
        if counter >= 10 and difference <= 15:
            return True
    return False


def dos(csrf):
    with open("log.csv", "r") as f:
        lines = f.read().splitlines()
        difference = 0
        counter = 0
        timestamplist = []
        for line in lines:
            if csrf in line:
                timestamplist.append(line.split(";")[2])
        for i in range(len(timestamplist) - 1):
            difference += int(timestamplist[i + 1]) - int(timestamplist[i])
            counter += 1
        if counter >= 25 and difference <= 3:
            return True
    return False


def ban(ip, type, date, useragent):
    with open("ban.csv", "r") as f:
        for line in f.read().splitlines():
            if ip in line:
                return
    with open("ban.csv", "a") as f:
        f.write(f"{ip};{type};{date};{useragent}\n")


@app.route("/register", methods=["POST"])
def register(username, passw, csrf, ip, useragent):
    with open("sql.txt", "r") as f:
        sql = f.read()
        for line in sql.splitlines():
            if passw in line or username in line:
                return render_template("honeypot.html"), 403
    with open("register.csv", "a") as f:
        f.write(f"{username};{passw};{csrf};{ip};{useragent}\n")
    return "OK"


def check_ban(ip):
    with open("ban.csv", "r") as f:
        for line in f.read().splitlines():
            if ip in line:
                return True
    return False


@app.route("/login", methods=["POST"])
def login(mail, password):
    with open("register.csv", "r") as f:
        lines = f.read().splitlines()
        for line in lines:
            if mail in line:
                if hash_password(password) in line:
                    return "OK"
    return "Invalid"


@app.route("/")
def main():

    return "OK"


@app.before_request
def bancheck():
    if check_ban(request.remote_addr):
        return (
            "<script>alert('You are banned');window.location.replace('about:blank')</script>",
            301,
        )


@app.before_request
def log_route():
    client_ip = request.remote_addr
    useragent = request.headers.get("User-Agent").replace(";", "")
    timestamp = int(datetime.datetime.timestamp(datetime.datetime.now()))
    requests_type = request.method
    route = request.path

    with open("log.csv", "a") as f:
        f.write(f"{client_ip};{useragent};{timestamp};{requests_type};{route}\n")


@app.before_request
def check_attack():
    client_ip = request.remote_addr
    useragent = request.headers.get("User-Agent").replace(";", "")
    timestamp = int(datetime.datetime.timestamp(datetime.datetime.now()))

    csrf = hashcsrf(client_ip, useragent)
    if dos(csrf):
        ban(client_ip, "DOS", timestamp, useragent)
        return render_template("honeypot.html"), 403
    if bruteforce_detection(client_ip):
        ban(client_ip, "Bruteforce", timestamp, useragent)
        return render_template("honeypot.html"), 403
    if enumeration_detection(client_ip):
        ban(client_ip, "Enumeration", timestamp, useragent)
        return render_template("honeypot.html"), 403


@app.errorhandler(404)
def page_not_found(_):
    return render_template("404.html"), 404


if __name__ == "__main__":

    app.run()
