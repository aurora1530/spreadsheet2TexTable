/**
 * Returns the template HTML content for the sidebar.
 * @returns {GoogleAppsScript.HTML.HtmlOutput} The HTML content for the sidebar.
 */
function getHtmlForSidebar() {
  const html = HtmlService.createTemplateFromFile('public/index.html')
    .evaluate()
    .setTitle('TableOptions Settings');
  return html;
}

function createMenu() {
  SpreadsheetApp.getUi()
    .createMenu('Sheet2TexTable')
    .addItem('Options Settings', 'Sheet2TexTable.showSidebar')
    .addItem('Quick convert', 'Sheet2TexTable.quickConvert')
    .addToUi();
}

function showSidebar() {
  const html = getHtmlForSidebar();
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Range} range
 * @returns {CellFormat[][]}
 */
function getCellFormats(range) {
  const cellFormats = [];
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
 * @param {String} dataRange
 * @returns {GoogleAppsScript.Spreadsheet.Range}
 */
function getTargetRange(dataRange) {
  const sheet = SpreadsheetApp.getActiveSheet();
  return dataRange ? sheet.getRange(dataRange) : sheet.getDataRange();
}

/**
 *
 * @param {String} dataRange
 * @param {TableOptions} tableOptions
 * @returns
 */
function getTableWithTableOptions(dataRange, tableOptions) {
  const range = getTargetRange(dataRange);
  const data = range.getValues();
  const cellFormats = getCellFormats(range);

  tableOptions = Object.assign(defaultTableOptions, tableOptions);
  tableOptions.tabularOptions.cellFormats = cellFormats;

  return array2TexTable(data, tableOptions);
}

function quickConvert() {
  const tableOptions = defaultTableOptions;
  const table = getTableWithTableOptions('', tableOptions);
  const html = createHtmlOutputForModal(table);
  showModal(html, 'Quick convert');
}

/**
 * @param {String} string
 * @returns {GoogleAppsScript.HTML.HtmlOutput}
 */
function createHtmlOutputForModal(string) {
  const htmlStr = string.replace(/\n/g, '<br>');
  const html = HtmlService.createHtmlOutput(htmlStr).setWidth(700).setHeight(500);
  return html;
}

/**
 *
 * @param {GoogleAppsScript.HTML.HtmlOutput} htmlOutput
 * @param {String} title
 */
function showModal(htmlOutput, title) {
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, title);
}
