class SheetManager {
  constructor(fileData) {
    this.doc = SpreadsheetApp.getActiveSpreadsheet();
    this.sheet = this.doc.getSheetByName(SPREADSHEET_TAB_NAME);
    this.sheetLength = this.sheet.getDataRange().getHeight();
    this.fileData = fileData;
  };

  clearSheet() {
    try {
      if (this.sheetLength > 1) {
        console.log(this.sheetLength);
        this.sheet.getRange(2,1,this.sheetLength, 9).setValue('');
      };
    } catch(err) {
      const msg = `Could not clear spreadsheet. ${err}`;
      new Notification().send('error', msg);
    };
  };

  setValues() {
    try {
      this.formatFileData();
      this.clearSheet();
      this.sheet.getRange(2, 1, this.files.length, 9).setValues(this.files);

    } catch(err) {
      const msg = `Could not update spreadsheet values. ${err}`;
      new Notification().send('error', msg);
    };
  };

  formatFileData() {
    const files = [];

    this.fileData.forEach(file => {
      files.push([
        file.created,
        file.modified,
        file.name,
        file.type,
        file.permissions,
        file.owner,
        file.parent,
        file.viewers,
        file.editors
      ]);
    });

    this.files = files;
  };
};
