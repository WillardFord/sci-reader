chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "textResponse") {
        const responseElement = document.getElementById("response");
        responseElement.textContent = `Response from server: ${message.data.text}`;
    }
  });
  