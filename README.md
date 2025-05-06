# Random Facts Dashboard

An Angular 19 app that fetches, displays, and manages “useless” and “history” facts. Designed for extensibility, responsiveness, and polished UX with unit and end‑to‑end tests.

## Features

* **Fact Sources**: Switch between:

  * **Useless Facts API** (`uselessfacts.jsph.pl`)
  * **History Facts** (in‑memory stub)
* **Random Fact Viewer**

  * Loading skeleton and error states
* **Favorites Management**

  * Add/remove/clear favorites persisted in `localStorage`
  * Recent‑picks preview
* **Search Autocomplete** over saved favorites
* **Responsive Layouts**: List/grid toggle, mobile‑friendly views
* **Accessibility**: keyboard support and ARIA roles

## Setup & Run

1. **Install dependencies**

   ```bash
   npm install
   ```
2. **Run development server**

   ```bash
   ng serve
   # visit http://localhost:4200
   ```

## Testing

* **Lint**: `ng lint`
* **Unit**: `ng test`
* **E2E (Cypress)**: `npx cypress open` or `npx cypress run`

## Architecture

* **Angular 19 Components**: feature‑driven structure under `src/app/features`
* **FactsService**: single service with a source registry for easy extension
* **State**: RxJS `BehaviorSubject` for favorites stream
* **Styling**: Tailwind CSS utility classes
* **Routing**: Angular Router for viewer and favorites views

## Extensibility

To add a new fact source, in `FactsService` add your key to the `sources` record:

```ts
this.sources['newKey'] = {
  displayName: 'New API',
  fetchOne: () => this.http.get<...>('YOUR_URL').pipe(
    map(...), catchError(...)
  )
};
```

The dropdown will pick it up automatically.
