// server side code sample

/**
 * add menu to spreadsheet
 */
function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu('Sheet2TexTable')
    .addItem('Show sidebar', 'showSidebar')
    .addToUi();
}

/**
 * show sidebar
 */
function showSidebar() {
  const html = Sheet2TexTable.getHtmlForSidebar();
  SpreadsheetApp.getUi().showSidebar(html);
}

function showAlertDialog(text) {
  SpreadsheetApp.getUi().alert(text);
}

function getSheetDate() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  return data;
}

/**
 * data input from sidebar is received by this function name.
 * this function name is specified in index.html.
 * Must return table string.
 */
function tableOptionsHandler(tableOptions) {
  const data = getSheetDate();
  const table = Sheet2TexTable.array2TexTable(data, tableOptions);
  return table;
}
