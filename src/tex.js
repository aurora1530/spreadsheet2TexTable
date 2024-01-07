/**
 * @see {@link ./array.js}
 */

/**
 * Converts a 2D array into a table-formatted string.
 * If a 1D array is passed, it's converted as a single row table.
 * If a non-array value is passed, it's converted as a single cell table.
 * @param {any[][]} array - The array to convert
 * @param {TableOptions} options - Optional parameters
 * @returns {string} A string formatted as a table
 *
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
 * @property {Number[]} [rowsRequiringHline] - Specifies the indices of rows that require a horizontal line.
 * @property {boolean} [doesAddHlineToAll] - Specifies whether to add a horizontal line to all rows. If true, rowsRequiringHline is ignored. Defaults to false.
 */

function array2TexTable(array, options) {
  array = toMatrix(array);
  array = formatEachCellOfMatrix(array, options?.dateFormatOptions);
  array = uniformMatrix(array, options?.matrixOptions?.doesAddingFromEnd);

  const numOfColumns = array[0].length;
  const tabularOption = validateColumnParameters(options?.tabularOptions, numOfColumns);
  const tabularBody = array
    .map((row, i) => {
      const hline =
        options?.tabularOptions?.doesAddHlineToAll ||
        options?.tabularOptions?.rowsRequiringHline?.includes(i)
          ? '\\hline'
          : '';
      return row.join(' & ') + ' \\\\' + hline;
    })
    .join('\n');

  const tabular = `\\begin{tabular}{${tabularOption}}\n${tabularBody}\n\\end{tabular}`;
  const tableLocation = options?.tableLocation ?? 'h';
  const title = options?.caption ? `\\caption{${options.caption}}\n` : '';
  const table = `\\begin{table}[${tableLocation}]\n${title}${tabular}\n\\end{table}`;
  return table;
}

/**
 * Escapes TeX characters in a string.
 * @param {string} str - The string to escape
 * @returns {string} The escaped string
 */
function escapeTexChar(str) {
  const escapeRules = [
    ['\\', '\\textbackslash'], //must be first
    ['\\textbackslashn', '\\\\ '],
    ['&', '\\&'],
    ['$', '\\$'],
    ['%', '\\%'],
    ['#', '\\#'],
    ['_', '\\_'],
    ['{', '\\{'],
    ['}', '\\}'],
    ['~', '\\textasciitilde'],
    ['^', '\\textasciicircum'],
    ['<', '\\textless'],
    ['>', '\\textgreater'],
    ['|', '\\textbar'],
    ['"', '\\textquotedbl'],
    ["'", '\\textquotesingle'],
    ['`', '\\textasciigrave'],
  ];
  escapeRules.forEach(([char, escapedChar]) => (str = str.replaceAll(char, escapedChar)));
  return str;
}

/**
 * Validates column parameters.
 * Inappropriate parameters are replaced with 'c'.
 * If there are fewer column parameters than columns, 'c' is added.
 * If there are more column parameters than columns, the excess parameters are removed.
 * @param {TabularOptions} tabularOptions - The column parameter string
 * @param {number} numOfCol - The number of columns
 * @returns {string} The validated column parameter string
 */
function validateColumnParameters(tabularOptions, numOfCol) {
  const columnParameters = tabularOptions?.columnParameters ?? '';
  const doesAddVerticalRuleToAll = tabularOptions?.doesAddVerticalRuleToAll ?? false;
  const parameters = columnParameters.replaceAll(' ', '').split('');
  const paramsWithoutBar = parameters.filter((v) => v !== '|');
  if (paramsWithoutBar.length < numOfCol) {
    parameters.push(...Array(numOfCol - paramsWithoutBar.length).fill('c'));
  } else if (paramsWithoutBar.length > numOfCol) {
    let paramCount = 0;
    parameters.forEach((c, i) => {
      if (c !== '|') paramCount++;
      if (paramCount > numOfCol) {
        parameters.splice(i);
        return;
      }
    });
  }

  const validParameters = ['l', 'c', 'r'];
  parameters.forEach((param, i) => {
    if (param !== '|' && !validParameters.includes(param)) parameters[i] = 'c';
  });
  if (doesAddVerticalRuleToAll) {
    return `|${parameters.filter((p) => p !== '|').join('|')}|`;
  }

  return parameters.join('');
}

/**
 * Converts a date to a specified format.
 * If date is not a Date object, returns undefined.
 * If timezone or format has invalid values, defaults are used for formatting.
 * @param {Date} date - The date to format
 * @param {String} [timezone="GMT"] - The timezone
 * @param {String} [format="yyyy-MM-dd"] - The format
 * @returns {String} - The formatted date string
 */
function formatDate(date, timezone = 'GMT', format = 'yyyy-MM-dd') {
  if (!isDate(date)) return undefined;
  let formattedDate = '';
  try {
    formattedDate = Utilities.formatDate(date, timezone, format);
  } catch (e) {
    // If timezone or format is invalid, defaults are used for formatting.
    formattedDate = Utilities.formatDate(date, 'GMT', 'yyyy-MM-dd');
  }
  return formattedDate;
}

/**
 * Applies escape and date format processing to each cell of a 2D array.
 * @param {any[][]} matrix - The matrix to process
 * @param {DateFormatOptions} dateFormatOptions - Options for date formatting
 */
function formatEachCellOfMatrix(matrix, dateFormatOptions) {
  return matrix.map((row) =>
    row.map((cell) => {
      if (typeof cell === 'string') return escapeTexChar(cell.toString());
      if (isDate(cell)) {
        return formatDate(cell, dateFormatOptions?.timezone, dateFormatOptions?.format);
      }
      return cell;
    })
  );
}

/**
 * Use this as, for some reason, instanceof Date does not work correctly in the library ahead.
 * @param {any} value
 * @returns {boolean} Whether the value is a Date object
 */
function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]';
}
