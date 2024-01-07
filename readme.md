# Sheet2TexTable

A Google Apps Script that converts tables from spreadsheets into LaTeX tables. It functions as a library.

## Usage

1. Open the spreadsheet and select "Extensions" → "Apps Script" from the menu.
2. Next to Libraries, click Add a library.
3. Enter the following ID into "Script ID" and click "Add":

```
1xjQcXX6-e963wsZ9k1p-otQI2UI6qcR4DFXs_YnzV8wDXR7Hdtx7qsyu
```

4. In the _Version_ dropdown, select the latest version, and then click _Add_.
5. Be sure to set the ID as _Sheet2TexTable_.
6. Paste the code from `sample/sample.js` into the script editor.
7. Run onOpen once from the editor to approve permissions.
8. With the sheet you want to convert into a Tex table open, select "Sheet2TexTable" → "Show Sidebar" from the menu.
9. Make the appropriate settings changes and click "convert".

If you want to set up your own ui,`array2TexTable(array,TableOptions)`.
This will convert a two-dimensional array array into a Tex Table.

## Options

```ts
type tableOptions = {
  tableLocation: 'h' | 't' | 'b' | 'p' | 'H'; //Specifies the insertion location in the tex table.
  caption: string; //Specifies the caption in the tex table.
  dateFormatOptions: {
    timezone: string; // Specifies the timezone used when formatting dates if the data includes 'date type' cells.
    format: string; //Specifies the format used when formatting dates if the data includes 'date type' cells.
  };
  matrixOptions: {
    doesAddingFromEnd: boolean; // When the columns in the sheet data are uneven, blank columns are inserted to match the length of the longest column. This specifies whether to insert from the beginning or the end.
  };
  tabularOptions: {
    columnParameters: string; // Specifies the column parameters in tex's tabular.
    rowsRequiringHline: number[]; // Specifies the rows to insert hline in tex's tabular. Specify the row indices as an array. For example: `[0, 2]` will insert hline at rows 0 and 2. In the sidebar, specify it as `0,2`.
    doesAddHlineToAll: boolean; // Specifies whether to insert hline in all rows in tex's tabular. If set to `true`, `rowsRequiringHline` is ignored.
  };
};
```

## LICENSE

MIT
