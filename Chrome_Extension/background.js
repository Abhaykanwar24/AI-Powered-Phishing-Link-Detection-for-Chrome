// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'checkURL') {
      console.log("Background received URL:", request.url);
      chrome.storage.local.set({ currentURL: request.url }, () => {
        // Open the popup programmatically (optional)
        chrome.action.openPopup && chrome.action.openPopup();
        sendResponse({ allowNavigation: true }); // Allow navigation after processing
      });
      return true; // Keep the message channel open for async response
    }
  });
  
  // Monitor navigation events (optional)
  chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    chrome.storage.local.set({ currentURL: details.url });
  });