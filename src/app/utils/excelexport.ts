import * as XLSX from "xlsx";

const getFileName = (name: string) => {
  let timeSpan = new Date().toString();
  let sheetName = name || "ExportResult";
  let fileName = `${sheetName}-${timeSpan}`;
  return {
    sheetName,
    fileName
  };
};
export class TableUtil {
  static exportTableToExcel(tableId: string, name: string) {
    let { sheetName, fileName } = getFileName(name);
    let targetTableElm = document.getElementById(tableId);
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{
      sheet: sheetName
    });
    // const ws = wb.Sheets[sheetName];


    // ws['!cols'] = [
    //   { wpx: 200 }, // Program Name
    //   { wpx: 150 }, // Session
    //   { wpx: 150 }, // Registration Status
    //   { wpx: 150 }, // Payment Status
    //   { wpx: 100 }  // Count
    // ];
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  static exportArrayToExcel(arr: any[], name: string) {
    let { sheetName, fileName } = getFileName(name);

    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(arr);
 // Create an array of column widths dynamically based on the content
    const colWidths = arr.reduce((acc, row) => {
      Object.values(row).forEach((val: any, i: number) => {
        const cellLength = val ? val.toString().length : 10;  // Default width for empty cells
        if (!acc[i] || cellLength > acc[i].wch) {
          acc[i] = { wch: cellLength + 10 };  // Add extra space to avoid tight fit
        }
      });
      return acc;
    }, []);

    // Set dynamic column widths
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}
