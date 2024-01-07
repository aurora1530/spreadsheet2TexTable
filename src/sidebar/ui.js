/**
 * Returns the template HTML content for the sidebar.
 * @returns {GoogleAppsScript.HTML.HtmlOutput} The HTML content for the sidebar.
 */
function getHtmlForSidebar() {
  const html = HtmlService.createTemplateFromFile('public/index.html').evaluate();
  html.setTitle('Sidebar');
  return html;
}

function createMenu() {
  SpreadsheetApp.getUi()
    .createMenu('Sheet2TexTable')
    .addItem('Show sidebar', 'Sheet2TexTable.showSidebar')
    .addToUi();
}

function showSidebar() {
  const html = getHtmlForSidebar();
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * @param {String} dataRange - A1 notation of data range.
 * @returns {any[][]}
 */
function getSheetData(dataRange) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = dataRange ? sheet.getRange(dataRange) : sheet.getDataRange();
  return range.getValues();
}

/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Range} dataRange
 * @returns {CellFormat[][]}
 */
function getCellFormats(dataRange) {
  const cellFormats = [];
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = dataRange ? sheet.getRange(dataRange) : sheet.getDataRange();
  const textStyles = range.getTextStyles();
  for (let i = 0; i < textStyles.length; i++) {
    cellFormats[i] = [];
    for (let j = 0; j < textStyles[i].length; j++) {
      const textStyle = textStyles[i][j];
      const isBold = textStyle.isBold();
      const isItalic = textStyle.isItalic();
      cellFormats[i][j] = { isBold, isItalic };
    }
  }
  return cellFormats;
}

/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Range} dataRange
 * @param {TableOptions} tableOptions
 * @returns
 */
function getTableWithTableOptions(dataRange, tableOptions) {
  tableOptions = Object.assign(defaultTableOptions, tableOptions);
  const data = getSheetData(dataRange);
  const cellFormats = getCellFormats(dataRange);
  tableOptions.tabularOptions.cellFormats = cellFormats;

  const table = array2TexTable(data, tableOptions);
  return table;
}
