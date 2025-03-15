# 🛡️ Phishing Website Detection

This project detects phishing websites using machine learning. It includes a trained model and a Flask-based web application for real-time detection.

---

## 📚 Overview

Phishing attacks trick users into revealing sensitive information through deceptive websites. This project aims to classify URLs as **phishing** or **legitimate** based on extracted features.

- **Feature Extraction**: Analyzing URL structure, domain details, and security indicators.
- **Machine Learning**: Training a model to distinguish phishing websites.
- **Web App**: A Flask-based interface to test URLs in real-time.

---

## 📁 Repository Contents

- **`Phishing_detection.ipynb`**: Jupyter Notebook for data processing, feature extraction, model training, and evaluation.
- **`app.py`**: Flask web application for real-time phishing detection.
- **`phishing_model.pkl`**: Pre-trained model used in the Flask app.
- **`templates/index.html`**: HTML file for the web interface.
- **`static/`**: Contains CSS and JS files for styling and interactivity.

---

## 🤖 Machine Learning Models Used

- **Logistic Regression**
- **Random Forest Classifier**


The best-performing model is saved as `phishing_model.pkl` and used in the web app.

---

## 📜 Results

- **Best Model Accuracy**: 97%
- **F1 Score**: 0.94

# DetectThePhisher - Chrome Extension

A Chrome extension that detects phishing URLs in real-time, displaying a probability score in a popup.

## Features
- Detects phishing traits (e.g., IP addresses, shorteners).
- Built from logic inspired by my [Phishing Detection Model]([https://github.com/yourusername/phishing-detection-model](https://github.com/Abhaykanwar24/AI-Powered-Phishing-Link-Detection-for-Chrome/blob/main/Phishing_detection.ipynb)).

## Installation
- Load this folder in Chrome via `chrome://extensions/` (Developer mode).
- Future: Available on Chrome Web Store (TBD).

For a detailed analysis, check the [notebook](./Phishing_detection.ipynb).

---


