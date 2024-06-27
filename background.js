chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "sendText",
      title: "Send text to API",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sendText" && info.selectionText) {
      fetch('http://localhost:4500/whats-this', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: info.selectionText })
      })
      .then(response => response.json())
      .then(data => {
        chrome.tabs.sendMessage(tab.id, { type: "textResponse", data: data });
      })
      .catch(error => console.error('Error:', error));
    }
  });
  