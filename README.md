Phishing Detection using Machine Learning

Overview

This project aims to detect phishing websites using machine learning techniques. It analyzes various features of URLs and predicts whether a website is legitimate or fraudulent. The model is trained on a phishing dataset and evaluates its performance using multiple classification metrics.

Features

Data preprocessing and feature engineering

Implementation of Logistic Regression and Gradient Boosting Classifier

Performance evaluation using accuracy, F1-score, precision, and recall

Visualizations for data insights

Prediction of phishing websites based on URL attributes

Technologies Used

Python

Pandas, NumPy

Scikit-learn

Matplotlib, Seaborn

Dataset

The dataset used in this project contains various website attributes that help in identifying phishing sites. It includes features such as:

URL length

Presence of special characters

Domain age

SSL certificate usage
These attributes are extracted and processed to create a feature set that enables accurate classification.

Model Training and Evaluation

Two machine learning models were implemented and tested:

1. Logistic Regression

A simple and effective baseline model for classification.

Achieved an accuracy of approximately 92% on the test dataset.

Provides interpretable feature importance, allowing us to understand which factors contribute most to classification.

2. Gradient Boosting Classifier

An advanced ensemble model that improves accuracy by combining multiple weak learners.

Achieved an accuracy of approximately 96%, outperforming logistic regression.

Offers better recall and F1-score, making it highly effective in detecting phishing websites.

Thinking Process and Approach

Understanding the Problem: Phishing attacks trick users into revealing sensitive information. Identifying patterns in phishing websites can help mitigate these threats.

Data Collection & Cleaning: The dataset is processed to remove inconsistencies, handle missing values, and transform categorical features into numerical values.

Feature Engineering: Important URL-based features are extracted, such as the presence of HTTPS, subdomain count, and length.

Model Selection & Training: Logistic Regression was used as a baseline model, followed by Gradient Boosting for improved results.

Performance Evaluation: Models are assessed using accuracy, precision, recall, and F1-score to ensure reliability.

Visualization & Insights: Key insights are drawn using heatmaps, feature importance graphs, and accuracy curves.

Installation

To set up the project locally, follow these steps:

Clone the repository:

git clone https://github.com/yourusername/phishing-detection.git
cd phishing-detection

Install required dependencies:

pip install -r requirements.txt

Run the Jupyter Notebook:

jupyter notebook

Usage

Open the Phishing_detection.ipynb notebook.

Load the dataset and preprocess the data.

Train the Logistic Regression and Gradient Boosting models.

Evaluate model performance and visualize results.

Predict whether a given URL is phishing or legitimate.

Results

Logistic Regression: Achieved high accuracy (92%) and precision for phishing detection.

Gradient Boosting Classifier: Improved prediction performance with a 96% accuracy and better F1-score.

Visualizations highlight key features influencing the classification.
