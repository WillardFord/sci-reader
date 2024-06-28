chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "textResponse") {
        const responseElement = document.getElementById("response");
        responseElement.textContent = `Response from server: ${message.data.text}`;
        const historyElement = document.getElementById("history");
        const newMessageElement = document.createElement("p");
        newMessageElement.textContent = message.data.text;
        historyElement.appendChild(newMessageElement);
    }
  });

//chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //  if (message.type === "moreReferences") {
    //    const referencesElement = document.getElementById("references");
      //  const linkElement = document.createElement("a");
        //linkElement.href = `https://pubmed.ncbi.nlm.nih.gov/?term=${message.data.text}`;
        //linkElement.textContent = `Search PubMed: ${message.data.text}`;
        //referencesElement.appendChild(linkElement);
    //}
//});
