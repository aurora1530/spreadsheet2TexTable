// server side code sample

/**
 * add menu to spreadsheet
 */
function onOpen(e) {
  Sheet2TexTable.createMenu();
}

/**
 * inputted options from sidebar are received by this function name.
 * this function name is specified in sidebar.html.
 * @param {string} dataRange
 * @param {TableOptions} tableOptions
 * @returns {string} A string formatted as a table
 */
function tableOptionsHandler(dataRange, tableOptions) {
  return Sheet2TexTable.getTableWithTableOptions(dataRange, tableOptions);
}
