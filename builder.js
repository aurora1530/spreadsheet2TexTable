const fs = require('fs');
const path = require('path');

const getPathsMatchExt = (dir, ext) => {
  return fs
    .readdirSync(dir)
    .filter((filename) => path.extname(filename) === ext)
    .map((filename) => path.join(dir, filename));
};

const readCode = (filePaths) => {
  return filePaths.map((filePath) => fs.readFileSync(filePath, 'utf8')).join('\n');
};

const replacePlaceholders = (html, fileType, code) => {
  const placeHolder = new RegExp(
    `(<!-- ${fileType}-import-start -->)(.*?)(<!-- ${fileType}-import-end -->)`,
    's'
  );
  const openTag = fileType === 'js' ? '<script>' : '<style>';
  const closeTag = fileType === 'js' ? '</script>' : '</style>';
  return html.replace(
    placeHolder,
    (_, start, __, end) => `${start}\n${openTag}\n${code}\n${closeTag}\n${end}`
  );
};

const createFileListMessage = (filePaths) => {
  return filePaths.map((filePath) => '└─ ' + path.basename(filePath)).join('\n');
};

/**
 * Main function that reads HTML, JavaScript, and CSS files, replaces import placeholders with actual code,
 * and writes the modified HTML back to the file.
 */
function main() {
  const html = fs.readFileSync(path.join(__dirname, './public/index.html'), 'utf-8');
  const publicPath = path.join(__dirname, './public/');
  const jsPaths = getPathsMatchExt(path.join(publicPath, 'js/'), '.js');
  const cssPaths = getPathsMatchExt(path.join(publicPath, 'css/'), '.css');
  const jsCode = readCode(jsPaths);
  const cssCode = readCode(cssPaths);
  let replacedHtml = replacePlaceholders(html, 'js', jsCode);
  replacedHtml = replacePlaceholders(replacedHtml, 'css', cssCode);

  fs.writeFileSync(path.join(__dirname, './public/index.html'), replacedHtml);
  const message =
    `Successfully built HTML file.\n` +
    `js files:\n${createFileListMessage(jsPaths)}\n` +
    `css files:\n${createFileListMessage(cssPaths)}`;
  console.log(message);
}

main();
