chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "getDomValue") {
    let divElement = document.querySelector(
      'div[style="line-height: 1.5; word-break: break-word; white-space: pre-wrap; display: flex; flex-wrap: wrap;"]'
    );
    let spanElement = divElement.querySelector("span");
    let textContent = spanElement.textContent;
    chrome.runtime.sendMessage({ message: "domValue", content: textContent });
  }
});
