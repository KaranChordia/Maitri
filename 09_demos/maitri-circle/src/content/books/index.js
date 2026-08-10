export { default as manuAndBadalBook } from "./manuAndBadal.js";

import manuAndBadalBook from "./manuAndBadal.js";

export const books = Object.freeze([manuAndBadalBook]);

export const booksById = Object.freeze(
  books.reduce((catalog, book) => {
    catalog[book.id] = book;
    book.legacyIds.forEach((legacyId) => {
      catalog[legacyId] = book;
    });
    return catalog;
  }, {}),
);

export const getBookById = (id) => booksById[id] || null;
