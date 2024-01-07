// server side code sample

/**
 * add menu to spreadsheet
 */
function onOpen(e) {
  Sheet2TexTable.createMenu();
}

/**
 * data input from sidebar is received by this function name.
 * this function name is specified in index.html.
 * Must return table string.
 */
function tableOptionsHandler(dataRange, tableOptions) {
  return Sheet2TexTable.getTableWithTableOptions(dataRange, tableOptions);
}
