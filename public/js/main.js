document.getElementById('convertBtn').addEventListener('click', () => {
  const tableOptions = validateTableOptions();
  toggleLoadingIcon();
  google.script.run
    .withSuccessHandler(successHandler)
    .withFailureHandler(failureHandler)
    .tableOptionsHandler(tableOptions);
});

function toggleLoadingIcon() {
  const loadingIcon = document.getElementById('loading-icon');
  const convertBtnText = document.getElementById('convertBtnText');
  if (loadingIcon.style.display === 'none') {
    loadingIcon.style.display = 'inline-block';
    convertBtnText.style.display = 'none';
  } else {
    loadingIcon.style.display = 'none';
    convertBtnText.style.display = 'inline-block';
  }
}

function validateTableOptions() {
  const tableLocation = document.getElementById('tableLocation').value;
  const caption = document.getElementById('caption').value;
  const timezone = document.getElementById('timezone').value;
  const format = document.getElementById('format').value;
  const columnParameters = document.getElementById('columnParameters').value;
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
      rowsRequiringHline: rowsRequiringHline,
      doesAddHlineToAll: doesAddHlineToAll,
    },
  };
  console.log(tableOptions);
  return tableOptions;
}

function successHandler(val) {
  toggleLoadingIcon();
  copyToClipboard(val);
}
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert('copied!');
    })
    .catch((err) => {
      alert(`failed to copy.\nClient error:${err}`);
    });
}

function failureHandler(err) {
  toggleLoadingIcon();
  alert(`failed to copy.\nServer error:${err}`);
}
