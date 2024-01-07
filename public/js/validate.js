/**
 * @returns {Boolean}
 */
function canConvert() {
  if (!isValidA1Notation(document.getElementById('dataRange').value)) return false;
  return true;
}
/**
 * if string is empty,return true.
 * @param {String} string
 * @returns {Boolean}
 */
function isValidA1Notation(string) {
  if (string === '') return true;
  const regex = /^[A-Z]+[1-9]\d*(:[A-Z]+[1-9]\d*)?$/;
  return regex.test(string);
}

function validateTableOptions() {
  const dataRange = document.getElementById('dataRange').value;
  const tableLocation = document.getElementById('tableLocation').value;
  const caption = document.getElementById('caption').value;
  const timezone = document.getElementById('timezone').value;
  const format = document.getElementById('format').value;
  const columnParameters = document.getElementById('columnParameters').value;
  const doesAddVerticalRuleToAll = document.getElementById(
    'doesAddVerticalRuleToAll'
  ).checked;
  let rowsRequiringHline = document.getElementById('rowsRequiringHline').value;
  const doesAddHlineToAll = document.getElementById('doesAddHlineToAll').checked;

  rowsRequiringHline = rowsRequiringHline
    .split(',')
    .map((num) => parseInt(num))
    .filter((num) => !isNaN(num));

  const tableOptions = {
    tableLocation: tableLocation,
    caption: caption,
    dateFormatOptions: {
      timezone: timezone,
      format: format,
    },
    tabularOptions: {
      columnParameters: columnParameters,
      doesAddVerticalRuleToAll: doesAddVerticalRuleToAll,
      rowsRequiringHline: rowsRequiringHline,
      doesAddHlineToAll: doesAddHlineToAll,
    },
  };
  console.log(tableOptions);
  return { dataRange, tableOptions };
}
