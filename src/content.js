chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let title = document.querySelector('div[style="line-height: 1.5; word-break: break-word; white-space: pre-wrap; pointer-events: none;"]').textContent
    sendResponse(title);
});
