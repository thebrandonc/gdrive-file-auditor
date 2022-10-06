/** ------------------------------------------------------------------------------
/** MAKE SURE THE TAB NAMES BELOW MATCH YOUR SPREADSHEET
/** ------------------------------------------------------------------------------*/

const SPREADSHEET_TAB_NAME = 'file_audit'  // tab name containing the file audit

/** ------------------------------------------------------------------------------
/** BEWARE: EDITING BELOW THIS LINE MAY BREAK THE SCRIPT
/** ------------------------------------------------------------------------------*/

const DEBUG = false;

class Notification {
  send(type, msg) {
    const title = type === 'success' ? 
    '🏆 Success!' : 
    '😞 Something went wrong...'
    if (!DEBUG) {
      this.ui = SpreadsheetApp.getUi();
      this.ui.alert(title, msg, this.ui.ButtonSet.OK);
    } else {
      console.log(msg);
    };
  };
};

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🔐 File Auditor')
      .addItem('▶️ Run File Audit', 'main')
      .addToUi();
};

function main() {
  try {
    const fileAudit = new FileAuditor();

    if (fileAudit.isComplete) {
      new SheetManager(fileAudit.data).setValues();
      const msg = `Your file audit is complete.`;
      new Notification().send('success', msg);
    };
    
  } catch(err) {
    const msg = `There was a problem running the audit. ${err}`;
    new Notification().send('error', msg);
  };
};
