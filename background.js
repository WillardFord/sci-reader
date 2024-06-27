chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "sendText",
      title: "Send text to API",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sendText" && info.selectionText) {
      fetch('http://your-api-endpoint.com/your-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: info.selectionText })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    }
  });
  