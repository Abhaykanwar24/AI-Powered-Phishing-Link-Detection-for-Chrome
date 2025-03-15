from flask import Flask, request, jsonify
import re
import socket
import whois
import requests
import numpy as np
import joblib
from urllib.parse import urlparse
from datetime import datetime
from bs4 import BeautifulSoup

app = Flask(__name__)

try:
    model = joblib.load("phishing_model.pkl")
except FileNotFoundError:
    print("Error: Model file 'phishing_model.pkl' not found.")
    exit()

feature_names = [
    "having_IP_Address", "URL_Length", "Shortining_Service", "having_At_Symbol",
    "double_slash_redirecting", "Prefix_Suffix", "having_Sub_Domain",
    "SSLfinal_State", "HTTPS_token", "Redirect", "on_mouseover", "RightClick",
    "Iframe", "Domain_Age", "Domain_End", "Web_Traffic", "Google_Index",
    "Page_Rank", "Links_Pointing", "Statistical_Report", "URL_of_Anchor",
    "SFH", "Submitting_to_Email", "Abnormal_URL", "DNS_Record", "Favicon",
    "Port", "HTTPS_in_URL", "Request_URL", "Anchor_URL"
]

def get_domain_age(domain):
    try:
        domain_info = whois.whois(domain)
        creation_date = domain_info.creation_date
        expiration_date = domain_info.expiration_date
        if isinstance(creation_date, list): creation_date = creation_date[0]
        if isinstance(expiration_date, list): expiration_date = expiration_date[0]
        if creation_date and expiration_date:
            domain_age = (datetime.now() - creation_date).days // 30
            domain_end = (expiration_date - datetime.now()).days // 30
            return domain_age, domain_end
    except:
        return -1, -1
    return -1, -1

def get_alexa_rank(domain):
    try:
        response = requests.get(f"https://www.alexa.com/minisiteinfo/{domain}")
        soup = BeautifulSoup(response.text, "html.parser")
        rank = soup.find("strong", class_="metrics-data")
        return int(rank.text.replace(",", "")) if rank else -1
    except:
        return -1

def extract_features(url):
    parsed_url = urlparse(url)
    domain = parsed_url.netloc
    path = parsed_url.path

    features = {
        "having_IP_Address": 1 if re.match(r"^\d{1,3}(\.\d{1,3}){3}$", domain) else 0,
        "URL_Length": len(url),
        "Shortining_Service": 1 if any(short in url for short in ["bit.ly", "tinyurl", "goo.gl"]) else 0,
        "having_At_Symbol": 1 if "@" in url else 0,
        "double_slash_redirecting": 1 if "//" in path else 0,
        "Prefix_Suffix": 1 if "-" in domain else 0,
        "having_Sub_Domain": domain.count('.') - 1,
        "SSLfinal_State": 1 if parsed_url.scheme == "https" else 0,
        "HTTPS_token": 1 if "https" in domain else 0,
        "Redirect": url.count("//"),
        "on_mouseover": 0,
        "RightClick": 0,
        "Iframe": 0,
        "Page_Rank": 1,
        "Links_Pointing": 1,
        "Statistical_Report": 0,
        "URL_of_Anchor": 0,
        "SFH": 0,
        "Submitting_to_Email": 0,
        "Abnormal_URL": 0,
        "Favicon": 1,
        "Port": 1 if parsed_url.port in [80, 443, None] else 0,
        "HTTPS_in_URL": 1 if "https" in url.lower() else 0,
        "Request_URL": 0,
        "Anchor_URL": 0,
        "Google_Index": 1 if requests.get(f"https://www.google.com/search?q=site:{domain}").status_code == 200 else 0,
        "DNS_Record": 1 if socket.gethostbyname(domain) else 0
    }

    domain_age, domain_end = get_domain_age(domain)
    features["Domain_Age"] = domain_age
    features["Domain_End"] = domain_end
    features["Web_Traffic"] = get_alexa_rank(domain)

    return np.array([features[feat] for feat in feature_names]).reshape(1, -1)

@app.route('/check', methods=['POST'])
def check_url():
    data = request.get_json()
    url = data.get('url', '')
    if not url:
        return jsonify({'error': 'No URL provided'}), 400

    features = extract_features(url)
    phishing_prob = model.predict_proba(features)[:, 0][0]
    return jsonify({'phishing_prob': float(phishing_prob)})

if __name__ == '__main__':
    app.run(host='localhost', port=5000)