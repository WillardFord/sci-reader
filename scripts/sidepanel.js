chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "textResponse") {
        const responseElement = document.getElementById("response");
        responseElement.textContent = `Response from server: ${message.data.text}`;
        const historyElement = document.getElementById("history");
        const newMessageElement = document.createElement("p");
        newMessageElement.textContent = message.data.text;
        historyElement.appendChild(newMessageElement);
    }
  });

