from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import datetime
import hashlib

app = Flask(__name__)
CORS(app)  # Allow CORS for all domains on all routes.
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


def detect_attack(ip, route, limit, timeframe):
    """
    Generic function to detect repeated activity in a timeframe.
    Args:
        ip: Client IP address
        route: Target route or pattern
        limit: Max allowed attempts
        timeframe: Timeframe in seconds
    Returns:
        True if attack detected, False otherwise.
    """
    logs = read_logs()
    timestamps = [
        int(entry[2]) for entry in logs if entry[0] == ip and route in entry[4]
    ]
    timestamps.sort()

    if len(timestamps) < limit:
        return False

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
    """Log requests and check for banned IPs."""
    client_ip = request.headers.get("X-Real-IP", request.remote_addr)
    useragent = request.headers.get("User-Agent", "").replace(";", "")
    timestamp = int(datetime.datetime.timestamp(datetime.datetime.now()))
    csrf = hashcsrf(client_ip, useragent)

    # Log request
    with open("log.csv", "a") as f:
        f.write(f"{client_ip};{useragent};{timestamp};{request.method};{request.path};{csrf}\n")

    # Check if IP is banned
    if check_ban(client_ip):
        return jsonify({"error": "You are banned"}), 403

    # Check for attacks
    if detect_attack(client_ip, "/login", 5, 30):
        ban(client_ip, "BruteForce", timestamp, useragent)
        return render_template("honeypot.html"), 403
    if detect_attack(client_ip, "admin", 5, 30):
        ban(client_ip, "Enumeration", timestamp, useragent)
        return render_template("honeypot.html"), 403
    if detect_attack(hashcsrf(client_ip, useragent), "CSRF", 25, 3):
        ban(client_ip, "DOS", timestamp, useragent)
        return render_template("honeypot.html"), 403


@app.route("/register", methods=["POST"])
def register():
    """Register a new user."""
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    with open("sql.txt", "r") as f:
        sql_data = f.read()
        if username in sql_data or password in sql_data:
            return render_template("honeypot.html"), 403

    hashed_password = hash_password(password)
    with open("register.csv", "a") as f:
        f.write(f"{username};{hashed_password};{hashcsrf(request.remote_addr, request.headers.get('User-Agent'))};{request.remote_addr};{request.headers.get('User-Agent')}\n")

    return jsonify({"message": "Registration successful"}), 201


@app.route("/login", methods=["POST"])
def login():
    """Log in a user."""
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    hashed_password = hash_password(password)

    with open("register.csv", "r") as f:
        for line in f:
            if email in line and hashed_password in line:
                return jsonify({"message": "Login successful"}), 200

    return jsonify({"error": "Invalid credentials"}), 403


@app.errorhandler(404)
def page_not_found(_):
    """Handle 404 errors."""
    return render_template("404.html"), 404


if __name__ == "__main__":
    app.run(debug=True)
