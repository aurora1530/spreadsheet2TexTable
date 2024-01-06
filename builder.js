const fs = require('fs');
const path = require('path');

/**
 * Main function that reads HTML, JavaScript, and CSS files, replaces import placeholders with actual code,
 * and writes the modified HTML back to the file.
 */
function main() {
  const html = fs.readFileSync(path.join(__dirname, './public/index.html'), 'utf-8');
  const jsPathes = fs
    .readdirSync(path.join(__dirname, './public/js/'))
    .filter((filename) => path.extname(filename) === '.js')
    .map((filename) => path.join(__dirname, './public/js/', filename));
  const cssPathes = fs
    .readdirSync(path.join(__dirname, './public/css/'))
    .filter((filename) => path.extname(filename) === '.css')
    .map((filename) => path.join(__dirname, './public/css/', filename));

  const jsCode = jsPathes.map((path) => fs.readFileSync(path, 'utf-8')).join('\n');
  const cssCode = cssPathes.map((path) => fs.readFileSync(path, 'utf-8')).join('\n');
  const replacedHtml = html
    .replace(
      /(<!-- js-import-start -->)(.*?)(<!-- js-import-end -->)/s,
      (_, start, code, end) => `${start}\n<script>\n${jsCode}\n</script>\n${end}`
    )
    .replace(
      /(<!-- css-import-start -->)(.*?)(<!-- css-import-end -->)/s,
      (_, start, code, end) => `${start}\n<style>\n${cssCode}\n</style>\n${end}`
    );

  fs.writeFileSync(path.join(__dirname, './public/index.html'), replacedHtml);
}

main();
