chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "textResponse") {
      alert(`Response from server: ${message.data.text}`);
    }
  });
  