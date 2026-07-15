const SHEET_NAME = 'Waitlist';
const SHARED_SECRET = 'REPLACE_WITH_THE_SAME_LONG_RANDOM_SECRET_USED_IN_VERCEL';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const suppliedSecret = (e && e.parameter && e.parameter.secret) || '';

    if (!SHARED_SECRET || suppliedSecret !== SHARED_SECRET) {
      return response_({ ok: false, error: 'Unauthorized' });
    }

    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const name = cleanText_(payload.name, 120);
    const email = cleanText_(payload.email, 200).toLowerCase();
    const source = cleanText_(payload.source, 300) || '/';

    if (!name || !isValidEmail_(email)) {
      return response_({ ok: false, error: 'Please enter a valid name and email.' });
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error('Missing sheet tab: ' + SHEET_NAME);
    }

    ensureHeaders_(sheet);

    const lastRow = sheet.getLastRow();
    const existingEmails = lastRow > 1
      ? sheet.getRange(2, 3, lastRow - 1, 1).getDisplayValues().flat()
      : [];
    const isDuplicate = existingEmails.some(function (value) {
      return String(value).trim().toLowerCase() === email;
    });

    if (!isDuplicate) {
      sheet.appendRow([
        new Date(),
        safeCell_(name),
        safeCell_(email),
        safeCell_(source),
      ]);
      sheet.getRange(sheet.getLastRow(), 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    }

    return response_({ ok: true, duplicate: isDuplicate });
  } catch (error) {
    console.error(error);
    return response_({ ok: false, error: 'Unable to save this signup right now.' });
  } finally {
    lock.releaseLock();
  }
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Submitted At', 'Name', 'Email', 'Source']);
    sheet.setFrozenRows(1);
  }
}

function cleanText_(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function isValidEmail_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function safeCell_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function response_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
