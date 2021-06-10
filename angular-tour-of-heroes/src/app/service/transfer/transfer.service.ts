import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor() { }


  uploadFileExcel(tb,callback) {
    var self = this;
    var oFile = tb.files[0];
    // var sFilename = oFile.name;

    var reader = new FileReader();

    reader.onload = function (e) {
      var data = e.target.result;
      var cfb = XLSX.read(data, { type: 'binary' });
      var oJS = [];
      cfb.SheetNames.forEach(function (sheetName) {
        oJS = XLSX.utils.sheet_to_json(cfb.Sheets[sheetName]);
      });
      callback(oJS);
    };
    reader.readAsBinaryString(oFile);
  }

  exportExcel(data) {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "skins");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
