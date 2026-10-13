# Fullstack Web lessons

This Vite + React app keeps the M1 web-basics lesson on the Home page and adds a
tutoring-session scheduler.

## Run locally

```sh
npm install
npm run dev
```

Use the Home/Tutoring scheduler navigation to see the two routes. The scheduler reads
available sessions from `src/catalog.json`; add an entry with a unique `id`, `tutor`,
`subject`, ISO 8601 `startTime` (including a timezone), `durationMinutes`, and numeric
`price`. Vite reloads the catalog during development without requiring a code change.
The scheduled sessions are held in React state, and duplicate or overlapping sessions
cannot be added.

## Check

```sh
npm run lint
npm test
npm run build
```
