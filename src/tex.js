//@ts-check

/**
 * @see {@link ./array.js}
 * @see {@link ./utils.js}
 * @see {@link ./validation.js}`
 */

/**
 * Converts a 2D array into a table-formatted string.
 * If a 1D array is passed, it's converted as a single row table.
 * If a non-array value is passed, it's converted as a single cell table.
 * @param {any[][]} array - The array to convert
 * @param {TableOptions} options - Optional parameters
 * @returns {string} A string formatted as a table
 */

function array2TexTable(array, options) {
  array = toMatrix(array);
  array = formatEachCellOfMatrix(
    array,
    options?.dateFormatOptions,
    options?.tabularOptions?.cellFormats
  );
  array = toUniformMatrix(array, options?.matrixOptions?.doesAddingFromEnd);
  if (options?.tabularOptions?.doesAlignWidth) array = alignWidthOfMatrix(array);
  const numOfColumns = array[0].length;
  const tabularOption = validateColumnParameters(options?.tabularOptions, numOfColumns);
  const columnParameters = createTabularBody(array, options?.tabularOptions);

  const tabular = `\\begin{tabular}{${tabularOption}}\n${columnParameters}\n\\end{tabular}`;
  const tableLocation = options?.tableLocation ?? 'h';
  const title = options?.caption ? `\\caption{${options.caption}}\n` : '';
  const table = `\\begin{table}[${tableLocation}]\n${title}${tabular}\n\\end{table}`;
  return table;
}

/**
 *
 * @param {any[][]} array
 * @param {TabularOptions} tabularOptions
 * @returns {string}
 */
function createTabularBody(array, tabularOptions) {
  const doesAddHlineToAll = tabularOptions?.doesAddHlineToAll ?? false;
  const rowsRequiringHline = tabularOptions?.rowsRequiringHline ?? [];
  const topHline =
    doesAddHlineToAll || rowsRequiringHline.includes(-1) ? '\\hline\n' : '';
  const body = array
    .map((row, i) => {
      const hline = doesAddHlineToAll || rowsRequiringHline.includes(i) ? '\\hline' : '';
      return `${row.join(' & ')} \\\\ ${hline}`;
    })
    .join('\n');
  return topHline + body;
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
  return escapeRules.reduce(
    (acc, [char, escapedChar]) => acc.replaceAll(char, escapedChar),
    str
  );
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
 * Applies escape and date format processing to each cell of a 2D array.
 * @param {any[][]} matrix - The matrix to process
 * @param {DateFormatOptions} dateFormatOptions - Options for date formatting
 * @param {CellFormat[][]} cellFormats - Specifies the format of each cell.
 * @param {(string|undefined)[][]}
 */
function formatEachCellOfMatrix(matrix, dateFormatOptions, cellFormats) {
  return matrix.map((row, i) =>
    row.map((cell, j) => {
      if (isDate(cell))
        cell = formatDate(cell, dateFormatOptions?.timezone, dateFormatOptions?.format);
      else if (['boolean', 'number'].includes(typeof cell)) cell = cell.toString();
      else cell = String(cell);

      cell = escapeTexChar(cell);
      if (cellFormats?.[i]?.[j]) cell = applyCellFormat(cell, cellFormats[i][j]);
      return cell;
    })
  );
}

/**
 *
 * @param {String} cell
 * @param {CellFormat} cellFormat
 * @returns {String}
 */
function applyCellFormat(cell, cellFormat) {
  if (cellFormat?.isBold) cell = `\\textbf{${cell}}`;
  if (cellFormat?.isItalic) cell = `\\textit{${cell}}`;
  return cell;
}
