import { access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { books, getBookById } from "../src/content/books/index.js";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(scriptDirectory, "..");

const errors = [];

for (const book of books) {
  if (book.spreads.length !== book.format.spreads) {
    errors.push(`${book.id}: expected ${book.format.spreads} spreads, found ${book.spreads.length}`);
  }

  const spreadIds = new Set();
  for (const spread of book.spreads) {
    if (spreadIds.has(spread.id)) errors.push(`${book.id}: duplicate spread id ${spread.id}`);
    spreadIds.add(spread.id);

    if (spread.copyLines.length < 2 || spread.copyLines.length > 5) {
      errors.push(`${book.id}/${spread.id}: copy must contain 2-5 lines`);
    }

    try {
      await access(resolve(appRoot, "public", spread.image.assetPath));
    } catch {
      errors.push(`${book.id}/${spread.id}: missing ${spread.image.assetPath}`);
    }
  }

  for (const legacyId of book.legacyIds) {
    if (getBookById(legacyId) !== book) errors.push(`${book.id}: unresolved legacy id ${legacyId}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated ${books.length} book source with ${books.reduce((sum, book) => sum + book.spreads.length, 0)} spreads.`);
}
