const task_id = document.getElementById("taskId");
let google_url = "your google apps scripts url";
let origin_id = '';
const regex = /\bp=([a-f0-9]+)\b/;

chrome.tabs.query( {active:true, currentWindow:true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {message: 'getname'}, (content) => {
        if(!content){
            alert('Cannot Get! Try Reload First!');
            return;
        }
        document.getElementById('taskId').value = content
    });
});


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
