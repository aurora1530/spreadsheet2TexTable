/**
 * Returns the template HTML content for the sidebar.
 * @returns {GoogleAppsScript.HTML.HtmlOutput} The HTML content for the sidebar.
 */
function getHtmlForSidebar() {
  const html = HtmlService.createTemplateFromFile('public/index.html').evaluate();
  html.setTitle('Sidebar');
  return html;
}

function include(filename) {
  return HtmlService.createTemplateFromFile(filename).evaluate().getContent();
}
