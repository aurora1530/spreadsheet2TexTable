/**
 * Determines if the argument is a 2D array.
 * @param {any} value - The value to be checked
 * @returns {boolean} - Returns true if the value is a 2D array, otherwise false
 */
function isMatrix(value) {
  if (!Array.isArray(value)) return false;
  return value.every((row) => Array.isArray(row));
}

/**
 * Converts a value to a matrix.
 * If the value is already a matrix, it returns the value as is.
 * If the value is an array, it wraps it in a matrix.
 * If the value is neither a matrix nor an array, it wraps it in a matrix with a single element.
 * @param {*} value - The value to convert to a matrix.
 * @returns {Array<Array<*>>} The converted matrix.
 */
function toMatrix(value) {
  if (isMatrix(value)) return value;
  if (Array.isArray(value)) return [value];
  return [[value]];
}

/**
 * Checks if all rows in a 2D array have the same size.
 * Returns false if the argument is not a 2D array.
 * @param {any[][]} matrix - The 2D array to be checked
 * @returns {boolean} - Returns true if all rows are of uniform size, otherwise false
 */
function isUniformColumnSize(matrix) {
  if (!isMatrix(matrix)) return false;
  const colSize = matrix[0].length;
  // slice(1) to skip the first row. If the matrix has only one row, it returns true.
  return matrix.slice(1).every((row) => row.length === colSize);
}

/**
 * Uniforms the number of elements in each row of a 2D array to the longest row by adding `undefined`.
 * If the argument is not a 2D array, it returns the argument without throwing an Error.
 * By default, elements are added to the end of each row. If false is passed, it adds elements to the beginning of the row, which is slower due to the use of array.unshift.
 * @param {any[][]} matrix - The 2D array to be uniformed
 * @param {boolean} doesAddingFromEnd - Specifies whether to add elements to the end (true) or the beginning (false) of each row. Default is true.
 * @returns {any[][]} - The uniformed 2D array
 */
function toUniformMatrix(matrix, doesAddingFromEnd = true) {
  if (isUniformColumnSize(matrix)) return matrix;

  const maxColSize = Math.max(...matrix.map((row) => row.length));
  return matrix.map((row, _) => {
    if (row.length === maxColSize) return row;
    const addElements = Array(maxColSize - row.length).fill(undefined);
    if (doesAddingFromEnd) row.push(...addElements);
    else row.unshift(...addElements);
    return row;
  });
}

/**
 *
 * @param {any[][]} matrix uniformed matrix
 * @returns {any[][]}
 */
function transpose(matrix) {
  return matrix[0].map((_, c) => matrix.map((r) => r[c]));
}

/**
 *
 * @param {string[][]} matrix - uniformed matrix
 * @returns {string[][]}
 */
function alignWidthOfMatrix(matrix) {
  const maxWidthOfEachColumn = transpose(matrix).map((col) =>
    Math.max(...col.map((cell) => cell.length))
  );
  return matrix.map((row) =>
    row.map((cell, colIndex) => cell.padStart(maxWidthOfEachColumn[colIndex], ' '))
  );
}
