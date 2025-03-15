document.addEventListener('DOMContentLoaded', () => {
    console.log("Popup loaded");
    chrome.storage.local.get('currentURL', (data) => {
      if (data.currentURL) {
        console.log("URL retrieved:", data.currentURL);
        document.getElementById('url').textContent = `${data.currentURL}`;
        analyzeURL(data.currentURL);
      } else {
        console.log("No URL found in storage");
        document.getElementById('url').textContent = 'No URL detected.';
        document.getElementById('probability').textContent = 'Please click a link or navigate.';
      }
    });
  });
  
  function analyzeURL(url) {
    console.log("Analyzing URL:", url);
    try {
      if (typeof extractFeatures !== 'function') {
        throw new Error('extractFeatures is not defined. Ensure feature_extraction.js is loaded.');
      }
      const features = extractFeatures(url);
      console.log("Features extracted:", features);
  
      const phishingProb = predictPhishing(features, url); // Pass URL for testing
      console.log("Phishing probability:", phishingProb);
      displayResult(phishingProb);
    } catch (error) {
      console.error("Exception in analyzeURL:", error);
      document.getElementById('probability').textContent = 'Analysis failed.';
      document.getElementById('result').textContent = error.message;
    }
  }
  
  function displayResult(phishingProb) {
    console.log("Displaying result for probability:", phishingProb);
    const probElement = document.getElementById('probability');
    const resultElement = document.getElementById('result');
    
    probElement.textContent = `Phishing Probability: ${(phishingProb * 100).toFixed(2)}%`;
    if (phishingProb > 0.5) {
      resultElement.textContent = 'Warning: Likely Phishing!';
      resultElement.className = 'phishing';
    } else {
      resultElement.textContent = 'Seems Safe';
      resultElement.className = 'safe';
    }
  }
  
  // Simulate phishing detection based on URL patterns
  function predictPhishing(features, url) {
    // Simulate phishing detection based on common phishing traits
    if (url.includes('bit.ly') || url.includes('tinyurl') || url.includes('@') || 
        /^(\d{1,3}\.){3}\d{1,3}$/.test(new URL(url).hostname) || 
        url.includes('//') > 1) {
      return 0.75; // 75% probability for phishing-like URLs
    }
    return 0.0; // 0% for safe URLs
  }