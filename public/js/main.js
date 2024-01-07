document.getElementById('convertBtn').addEventListener('click', () => {
  const { dataRange, tableOptions } = validateTableOptions();
  toggleLoadingIcon();
  google.script.run
    .withSuccessHandler(successHandler)
    .withFailureHandler(failureHandler)
    .tableOptionsHandler(dataRange, tableOptions);
});

document.getElementById('dataRange').addEventListener('input', function () {
  const messageElement = document.getElementById('dataRangeMessage');
  if (!isValidA1Notation(this.value)) {
    this.classList.add('invalid');
    messageElement.hidden = false;
  } else {
    this.classList.remove('invalid');
    messageElement.hidden = true;
  }
  toggleConvertBtn();
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

function toggleConvertBtn() {
  const btn = document.getElementById('convertBtn');
  if (canConvert()) btn.disabled = false;
  else btn.disabled = true;
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
