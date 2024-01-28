document.addEventListener("DOMContentLoaded", (event) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { message: "getDomValue" });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "domValue") {
    document.getElementById("taskId").value = request.content;
  }
});

let google_url = "";
let origin_id = "";
const regex = /\bp=([a-f0-9]+)\b/;

document.addEventListener("DOMContentLoaded", () => {
  const task_id = document.getElementById("taskId");
  const actionButton = document.getElementById("btn");
  actionButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let url = tabs[0].url;
      let dashIndex = url.lastIndexOf("-");
      if (url.match(regex)) {
        origin_id = url.match(regex)[1];
      } else if (dashIndex === -1) {
        dashIndex = url.lastIndexOf("/");
        origin_id = url.substring(dashIndex + 1);
      } else {
        origin_id = url.substring(dashIndex + 1);
      }
      // create request url
      google_url += "?originId=" + origin_id + "&taskId=" + task_id.value;
      alert(google_url);
      // send request
      fetch(google_url, {
        method: "GET",
        mode: "cors",
      }).catch((error) => {
        console.error(error);
      });
    });
  });
});
