# Travels Off The Eaten Track

A prototype for a family travel archive presented as an editorial travel journal.

The current prototype tests three connected formats:

- an editorial homepage organised around culture, food and nature;
- a personal journey story based on two days in Prague;
- a cross-country feature about foods worth travelling back for.

## Preview locally

```sh
python3 -m http.server 4173 --directory dist
```

Then open `http://localhost:4173`.

## Structure

The site is buildless static HTML, CSS and JavaScript. Deploy the contents of `dist/` as the web root.

