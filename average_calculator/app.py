from flask import Flask, jsonify, request
import requests
from collections import deque

app = Flask(_name_)

API_URLS = {
    "p": "http://20.244.56.144/test/primes",
    "f": "http://20.244.56.144/test/fibo",
    "e": "http://20.244.56.144/test/even",
    "r": "http://20.244.56.144/test/rand",
}

window_data = {key: deque(maxlen=10) for key in API_URLS}

@app.route('/numbers/<string:numberid>', methods=['GET'])
def get_numbers(numberid):
    if numberid not in API_URLS:
        return jsonify({"error": "Invalid number ID"}), 400

    try:
        response = requests.get(API_URLS[numberid], timeout=0.5)
        response.raise_for_status()
        data = response.json()
        new_numbers = data.get("numbers", [])
    except (requests.exceptions.RequestException, ValueError):
        return jsonify({"error": "Failed to fetch numbers"}), 500

    prev_state = list(window_data[numberid])

    for num in new_numbers:
        if num not in window_data[numberid]:
            window_data[numberid].append(num)

    curr_state = list(window_data[numberid])
    avg_value = round(sum(curr_state) / len(curr_state), 2) if curr_state else 0

    return jsonify({
        "windowPrevState": prev_state,
        "windowCurrState": curr_state,
        "numbers": new_numbers,
        "avg": avg_value
    })

if _name_ == '_main_':
    app.run(host='0.0.0.0', port=9876)
