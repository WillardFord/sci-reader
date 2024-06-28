// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "sendText",
      title: "Send text to API",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sendText" && info.selectionText) {
      fetch('http://10.192.4.16:3500/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: info.selectionText })
      })
      .then(response => response.json())
      .then(data => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: (data) => {
            chrome.runtime.sendMessage({ type: "textResponse", data: data });
          },
          args: [data]
        });
      })
      .catch(error => console.error('Error:', error));
    }
  });
  