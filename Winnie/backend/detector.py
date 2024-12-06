from flask import Flask, request, render_template, jsonify
from flask_cors import CORS, cross_origin
import datetime
import hashlib

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def hashcsrf(ip, useragent):
    """Generate a secure CSRF token."""
    sha256 = hashlib.sha256(f"{ip}//{useragent}".encode()).hexdigest()[::-1][5:25]
    md5 = hashlib.md5(ip.encode()).hexdigest()[::-1][5:25]
    return sha256 + md5


def hash_password(password):
    """Hash passwords using SHA-256."""
    return hashlib.sha256(password.encode()).hexdigest()


def read_logs():
    """Read log file and return entries."""
    with open("log.csv", "r") as f:
        return [line.split(";") for line in f.read().splitlines()]


def bruteforce_detection(ip):
    logs = read_logs()
    timestamps = [
        int(entry[2]) for entry in logs if "/login" in entry[4] and ip == entry[0]
    ]
    return detect_attack(timestamps, limit=5, timeframe=30)


def enumeration_detection(ip):
    logs = read_logs()
    timestamps = [
        int(entry[2]) for entry in logs if "admin" in entry[4].lower() and ip == entry[0]
    ]
    return detect_attack(timestamps, limit=5, timeframe=30)


def dos(csrf):
    logs = read_logs()
    timestamps = [
        int(entry[2]) for entry in logs if csrf in entry[5]
    ]
    return detect_attack(timestamps, limit=25, timeframe=3)


def detect_attack(timestamps, limit, timeframe):
    """Generalized attack detection logic."""
    if len(timestamps) < limit:
        return False

    timestamps.sort()
    for i in range(len(timestamps) - limit + 1):
        if timestamps[i + limit - 1] - timestamps[i] <= timeframe:
            return True

    return False


def ban(ip, ban_type, date, useragent):
    """Add a client IP to the ban list."""
    with open("ban.csv", "r") as f:
        if any(ip in line for line in f):
            return
    with open("ban.csv", "a") as f:
        f.write(f"{ip};{ban_type};{date};{useragent}\n")


def check_ban(ip):
    """Check if an IP is banned."""
    with open("ban.csv", "r") as f:
        return any(ip in line for line in f)


@app.before_request
def log_and_check():
    """Log requests and check for attacks or banned IPs."""
    client_ip = request.headers.get("X-Real-IP", request.remote_addr)
    useragent = request.headers.get("User-Agent", "").replace(";", "")
    timestamp = int(datetime.datetime.timestamp(datetime.datetime.now()))
    csrf_token = hashcsrf(client_ip, useragent)

    # Log the request
    with open("log.csv", "a") as f:
        f.write(f"{client_ip};{useragent};{timestamp};{request.method};{request.path};{csrf_token}\n")

    # Check if IP is banned
    if check_ban(client_ip):
        return {"error": "You are banned"}, 403

    # Detect attacks
    if bruteforce_detection(client_ip):
        ban(client_ip, "Bruteforce", timestamp, useragent)
        return render_template("honeypot.html"), 403
    if enumeration_detection(client_ip):
        ban(client_ip, "Enumeration", timestamp, useragent)
        return render_template("honeypot.html"), 403
    if dos(csrf_token):
        ban(client_ip, "DOS", timestamp, useragent)
        return render_template("honeypot.html"), 403


@app.route("/register", methods=["POST"])
@cross_origin(origins=all)
def register():
    """Register a new user."""
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    with open("sql.txt", "r", encoding="utf-8") as f:
        sql_data = f.read()
        for line in sql_data.split("\n"):
            if username == line or password == line:
                ban(request.remote_addr, "SQL Injection", int(datetime.datetime.timestamp(datetime.datetime.now())), request.headers.get('User-Agent'))
                return render_template("honeypot.html"), 403
    with open("register.csv", "r") as f:
        for line in f:
            if username in line:
                return jsonify({"error": "Username already exists"}), 409

    hashed_password = hash_password(password)
    csrf_token = hashcsrf(request.remote_addr, request.headers.get('User-Agent'))
    with open("register.csv", "a") as f:
        f.write(f"{username};{hashed_password};{csrf_token};{request.remote_addr};{request.headers.get('User-Agent')}\n")

    return jsonify({"message": " successful"}), 201


@app.route("/login", methods=["POST"])
@cross_origin(origins=all)
def login():
    """Log in a user."""
    data = request.json
    email = data.get("username")
    password = data.get("password")
    client_ip = request.headers.get("X-Real-IP", request.remote_addr)
    useragent = request.headers.get("User-Agent", "").replace(";", "")
    csrf = hashcsrf(client_ip, useragent)

    if not email or not password:
        return jsonify({"error": "Missing username or password"}), 400

    hashed_password = hash_password(password)

    with open("register.csv", "r") as f:
        for line in f:
            if email in line and hashed_password in line:
                return jsonify({"message": "Login successful", "csrf": csrf}), 200

    return jsonify({"error": "Invalid credentials"}), 403


@app.errorhandler(404)
def page_not_found(_):
    """Handle 404 errors."""
    return render_template("404.html"), 404


if __name__ == "__main__":
    app.run(debug=True)
