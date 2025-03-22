from flask import Flask, request, jsonify, send_from_directory
import requests
from collections import deque
import os

app = Flask(__name__)

# Configure the moving window size
WINDOW_SIZE = 10

# Dictionary to store number sequences for different types
window_data = {
    "p": deque(maxlen=WINDOW_SIZE),
    "f": deque(maxlen=WINDOW_SIZE),
    "e": deque(maxlen=WINDOW_SIZE),
    "r": deque(maxlen=WINDOW_SIZE),
}

# Test Server API Endpoints
API_URLS = {
    "p": "http://20.244.56.144/test/primes",
    "f": "http://20.244.56.144/test/fibo",
    "e": "http://20.244.56.144/test/fibo",  # Correct this if wrong
    "r": "http://20.244.56.144/test/rand",
}

@app.route("/numbers/<string:numberid>", methods=["GET"])
def get_numbers(numberid):
    if numberid not in API_URLS:
        return jsonify({"error": "Invalid number ID"}), 400

    # Fetch numbers from the third-party API
    try:
        response = requests.get(API_URLS[numberid], timeout=0.5)
        response.raise_for_status()
        new_numbers = response.json().get("numbers", [])
    except (requests.exceptions.RequestException, ValueError):
        return jsonify({"error": "Failed to fetch numbers"}), 500

    # Ensure unique numbers and update the window
    prev_state = list(window_data[numberid])
    for num in new_numbers:
        if num not in window_data[numberid]:  
            window_data[numberid].append(num)

    curr_state = list(window_data[numberid])

    # Calculate average
    avg_value = round(sum(curr_state) / len(curr_state), 2) if curr_state else 0

    return jsonify({
        "windowPrevState": prev_state,
        "windowCurrState": curr_state,
        "numbers": new_numbers,
        "avg": avg_value
    })

# Serve frontend (index.html)
@app.route("/")
def home():
    return send_from_directory(os.getcwd(), "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9876, debug=True)
