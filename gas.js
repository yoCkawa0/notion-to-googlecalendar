const notion_token = "";
const notion_page_prefix = "https://api.notion.com/v1/pages/";

function doGet(e) {
  const para = e.parameter;
  const task_id = para.taskId;
  const page_id = para.originId;
  testingParameters(task_id, page_id);
  createEvents(getNotionData(task_id, page_id));
  notion_data = getNotionData(task_id, page_id);
  testingParameters(notion_data);
}

function getNotionData(task_id, page_id) {
  const url = notion_page_prefix + page_id;
  let headers = {
    "content-type": "application/json; charset=UTF-8",
    Authorization: "Bearer " + notion_token,
    "Notion-Version": "2021-08-16",
  };
  let options = {
    headers: headers,
    muteHttpExceptions: true,
  };
  let response = UrlFetchApp.fetch(url, options);
  let notion_data = JSON.parse(response.getContentText());
  var notion_data_obj = {};
  notion_data_obj.task_id = task_id;
  notion_data_obj.event_title =
    notion_data.properties.title.title[0].plain_text;
  notion_data_obj.start_time =
    notion_data.properties.Start.rich_text[0].text.content;
  notion_data_obj.end_time =
    notion_data.properties.End.rich_text[0].text.content;
  notion_data_obj.url = notion_data.url;
  return notion_data_obj;
}

function createEvents(obj) {
  const calendar = CalendarApp.getCalendarById("18nc047@gmail.com");
  const startTime = new Date(obj.start_time);
  const endTime = new Date(obj.end_time);
  const title = "【" + obj.task_id + "】" + obj.event_title;
  const option = {
    description: obj.url,
  };
  calendar.createEvent(title, startTime, endTime, option);
}

function testingParameters(...arry) {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("test");
  const addArray = [...arry];
  sheet.appendRow(addArray);
}
