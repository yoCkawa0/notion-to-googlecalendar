const task_id = document.getElementById("taskId");
let google_url = "google app script url";
let origin_id = '';

document.getElementById("btn").onclick = () => {
    const taskId = task_id.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let url = tabs[0].url;
        let dashIndex = url.lastIndexOf("-");
        origin_id = url.substring(dashIndex + 1);
        google_url += "?originId=" + origin_id + "&taskId=" + taskId;

        fetch(google_url, {
            method: "GET",
            mode: "cors"
        });
    });
};
