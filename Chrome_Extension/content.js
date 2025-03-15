console.log("Content script loaded");

document.addEventListener('click', (event) => {
  const target = event.target.closest('a');
  if (target && target.href) {
    event.preventDefault(); // Prevent navigation temporarily
    const url = target.href;
    console.log("Link clicked:", url);

    // Check if the runtime context is valid
    if (chrome.runtime && chrome.runtime.id) {
      chrome.runtime.sendMessage({ action: 'checkURL', url: url }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Runtime error:", chrome.runtime.lastError.message);
          window.location.href = url; // Fallback navigation
          return;
        }
        console.log("Response from background:", response);
        // Allow navigation after response if desired
        if (response && response.allowNavigation) {
          window.location.href = url;
        }
      });
    } else {
      console.error("Extension context invalidated. Reloading may be required.");
      window.location.href = url; // Fallback to allow navigation
    }
  }
});