const SPREADSHEET_ID = '1rmEJKNXKh7NUQgpFlhtBCaUrtnvJbK4PC6zVIqsbXmo';
const SHEET_NAME = 'Waitlist';
const SHARED_SECRET = '__REPLACE_WITH_THE_SINGLE_VERCEL_SECRET__';
const HEADERS = ['Submitted At', 'Name', 'Email', 'Source'];

function doGet() {
  return jsonResponse_({ ok: true, service: 'maitri-waitlist' });
}

function doPost(e) {
  let stage = 'request';
  let lock = null;

  try {
    const suppliedSecret = (e && e.parameter && e.parameter.secret) || '';

    if (!SHARED_SECRET || suppliedSecret !== SHARED_SECRET) {
      return jsonResponse_({ ok: false, error: 'Unauthorized' });
    }

    stage = 'parse';
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const name = normalizeText_(payload.name, 120);
    const email = normalizeText_(payload.email, 200).toLowerCase();
    const source = normalizeText_(payload.source, 300) || '/';

    if (!name || !isValidEmail_(email)) {
      return jsonResponse_({ ok: false, error: 'Please enter a valid name and email.' });
    }

    stage = 'lock';
    lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) {
      return jsonResponse_({ ok: false, error: 'Waitlist is busy. Please try again.' });
    }

    stage = 'sheet';
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error('MISSING_WAITLIST_TAB');
    }

    verifyHeaders_(sheet);

    stage = 'duplicate-check';
    const lastRow = sheet.getLastRow();
    const existingEmails = lastRow > 1
      ? sheet.getRange(2, 3, lastRow - 1, 1).getDisplayValues().flat()
      : [];
    const duplicate = existingEmails.some(function (value) {
      return String(value).trim().toLowerCase() === email;
    });

    if (!duplicate) {
      stage = 'append';
      const nextRow = sheet.getLastRow() + 1;
      sheet.getRange(nextRow, 1, 1, 4).setValues([[
        new Date(),
        safeCell_(name),
        safeCell_(email),
        safeCell_(source),
      ]]);
      sheet.getRange(nextRow, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    }

    console.log(JSON.stringify({ event: 'waitlist_processed', duplicate: duplicate }));
    return jsonResponse_({ ok: true, duplicate: duplicate });
  } catch (error) {
    console.error(JSON.stringify({
      event: 'waitlist_error',
      stage: stage,
      errorType: error && error.name ? error.name : 'Error',
    }));
    return jsonResponse_({ ok: false, error: 'Unable to save this signup right now.' });
  } finally {
    if (lock && lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function verifyHeaders_(sheet) {
  const current = sheet.getRange(1, 1, 1, HEADERS.length).getDisplayValues()[0];
  const isBlank = current.every(function (value) { return !value; });

  if (isBlank) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    return;
  }

  const matches = HEADERS.every(function (header, index) {
    return current[index] === header;
  });

  if (!matches) {
    throw new Error('WAITLIST_HEADERS_MISMATCH');
  }
}

function normalizeText_(value, maxLength) {
  return String(value == null ? '' : value)
    .normalize('NFKC')
    .trim()
    .slice(0, maxLength);
}

function isValidEmail_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function safeCell_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
