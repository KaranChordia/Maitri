# Website book sources

This folder is the canonical import boundary for Maitri's website book content. Presentation components may change independently; book facts, copy, illustration order, release status, and asset paths should come from these modules.

## Available source

`manuAndBadalBook` documents the complete illustrated source for **Manu & Badal: A Big, Brave Heart**, currently known in parts of the website as **Manu: The Horse Nobody Could Ride**.

The source deliberately retains `horse` as a legacy ID so the current homepage and Story Universe can migrate without breaking their existing references. It is marked `publicRelease: "not-announced"`; adding the source does not publish a release date or availability claim.

## Consumer contract

```jsx
import { manuAndBadalBook } from "./content/books";

function BookSpread({ spread = manuAndBadalBook.spreads[0] }) {
  return (
    <figure>
      <img src={spread.image.src} alt={spread.image.alt} />
      <figcaption>
        {spread.copyLines.map((line) => <span key={line}>{line}</span>)}
      </figcaption>
    </figure>
  );
}
```

Consumers should:

- render `spread.copyLines` without expanding the copy beyond five lines;
- place copy in the quiet atmospheric area on the right;
- preserve image aspect ratio and keep the center gutter clear;
- use `book.status` to avoid implying that the title is released or purchasable;
- resolve current `horse` references through `getBookById("horse")` during migration;
- avoid duplicating book metadata in view components.

The Story Library reads this registry as its canonical source for the approved cover-first preview. Keep release and availability language governed by the source metadata rather than duplicating it in view components.
The Story Library and page layouts intentionally remain unchanged while their redesign tasks are in progress.
