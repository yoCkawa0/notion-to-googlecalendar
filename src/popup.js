const task_id = document.getElementById("taskId");
let google_url = "google app script url";
let origin_id = '';
const regex = /\bp=([a-f0-9]+)\b/;

document.getElementById("btn").onclick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let url = tabs[0].url;
        let dashIndex = url.lastIndexOf("-");
        if(url.match(regex)){
            origin_id = url.match(regex)[1];
        }else if (dashIndex === -1) {
            dashIndex = url.lastIndexOf("/");
            origin_id = url.substring(dashIndex + 1);
        }else{
            origin_id = url.substring(dashIndex + 1);
        }

        // create request url
        google_url += "?originId=" + origin_id + "&taskId=" + task_id.value;
        alert(google_url);

        // send request
        fetch(google_url, {
            method: "GET",
            mode: "cors"
        });
    });
};
