/**
 * @typedef {Object} TableOptions - Options to format the table.
 * @property {'h' | 't' | 'b' | 'p' | 'H'} [tableLocation] - The location of the table. Options are 'h' (here), 't' (top), 'b' (bottom), 'p' (page), and 'H' (exactly here).
 * @property {string} [caption] - The caption of the table.
 * @property {TabularOptions} [tabularOptions] - Options specific to the tabular environment.
 * @property {MatrixOptions} [matrixOptions] - Options specific to matrix manipulation.
 * @property {DateFormatOptions} [dateFormatOptions] - Options for formatting dates.
 *
 * @typedef {Object} DateFormatOptions
 * @property {string} [timezone] - The timezone to format dates. Default is 'GMT'.
 * @property {string} [format] - The format to format dates. Default is 'yyyy-MM-dd'.
 *
 * @typedef {Object} MatrixOptions
 * @property {boolean} [doesAddingFromEnd] - Specifies whether to add elements to the end (true) or the beginning (false) of each row in a non-uniform 2D array. Defaults to true.
 *
 * @typedef {Object} TabularOptions
 * @property {string} [columnParameters] - Specifies the column parameters. Inappropriate parameters are replaced with 'c'. If there are fewer column parameters than columns, 'c' is added. If there are more column parameters than columns, excess parameters are removed.
 * @property {boolean} [doesAddVerticalRuleToAll] - Specifies whether to add a vertical rule to all columns. If true, '|' of columnParameters is ignored. Defaults to false.
 * @property {Number[]} [rowsRequiringHline] - Specifies the indices of rows that require a horizontal line.if -1 is included,top hline is added. Defaults to [].
 * @property {boolean} [doesAddHlineToAll] - Specifies whether to add a horizontal line to all rows. If true, rowsRequiringHline is ignored. Defaults to false.
 * @property {boolean} [doesAlignWidth] - Specifies whether to align the width of the columns. Defaults to false.
 * @property {CellFormat[][]} [cellFormats] - Specifies the format of each cell.
 *
 * @typedef {Object} CellFormat
 * @property {boolean} [isBold] - Specifies whether to bold the cell. Defaults to false.
 * @property {boolean} [isItalic] - Specifies whether to italicize the cell. Defaults to false.
 */
const defaultTableOptions = {
  tableLocation: 'h',
  caption: '',
  tabularOptions: {
    columnParameters: '',
    doesAddVerticalRuleToAll: false,
    rowsRequiringHline: [],
    doesAddHlineToAll: false,
    doesAlignWidth: false,
    cellFormats: [],
  },
  matrixOptions: {
    doesAddingFromEnd: true,
  },
  dateFormatOptions: {
    timezone: 'GMT',
    format: 'yyyy-MM-dd',
  },
};

// /**
//  *
//  * @param {TabularOptions} tabularOptions
//  */
// function validateTabularOptions(tabularOptions){
//   if(tabularOptions.tableLocation)
// }

// /**
//  *
//  * @param {MatrixOptions} matrixOptions
//  * @returns {MatrixOptions}
//  */
// function validateMatrixOptions(matrixOptions) {
//   if (typeof matrixOptions.doesAddingFromEnd !== 'boolean') {
//     matrixOptions.doesAddingFromEnd = defaultTableOptions.matrixOptions.doesAddingFromEnd;
//   }
//   return matrixOptions;
// }

// /**
//  * @param {DateFormatOptions} dateFormatOptions
//  * @returns {DateFormatOptions}
//  */
// function validateDateFormatOptions(dateFormatOptions) {
//   if (typeof dateFormatOptions.timezone !== 'string') {
//     dateFormatOptions.timezone = defaultTableOptions.dateFormatOptions.timezone;
//   }
//   if (typeof dateFormatOptions.format !== 'string') {
//     dateFormatOptions.format = defaultTableOptions.dateFormatOptions.format;
//   }
//   return dateFormatOptions;
// }

// function validateTableOptions(tableOptions) {
//   tableOptions = Object.assign(defaultTableOptions, tableOptions);

//   return tableOptions;
// }
