// server side code sample

/**
 * add menu to spreadsheet
 */
function onOpen(e) {
  Sheet2TexTable.createMenu();
}

function getSheetData(dataRange) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = dataRange ? sheet.getRange(dataRange) : sheet.getDataRange();
  return range.getValues();
}

/**
 * data input from sidebar is received by this function name.
 * this function name is specified in index.html.
 * Must return table string.
 */
function tableOptionsHandler(dataRange, tableOptions) {
  const data = getSheetData(dataRange);
  const table = Sheet2TexTable.array2TexTable(data, tableOptions);
  return table;
}
