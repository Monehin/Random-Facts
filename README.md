# Random Facts Dashboard

An Angular 19 app that fetches, displays, and manages "useless" and "history" facts. Designed for extensibility, responsiveness, and polished UX—complete with unit and end‑to‑end tests.

## Features

* **Fact Sources**: Switch between:

  * **Useless Facts API** (`uselessfacts.jsph.pl`)
  * **History Facts** (in‑memory stub)
* **Random Fact Viewer**

  * Loading skeleton and error states
* **Favorites Management**: add, remove, clear, recent picks
* **Search Autocomplete** over saved favorites
* **Responsive List/Grid** views with select and bulk-delete
* **Animations** for smooth transitions
* **Unit Tests** (Karma/Jasmine) and **E2E Tests** (Cypress)

## Live Demo

Try it live on Vercel:[https://random-facts-ruby.vercel.app/](https://random-facts-ruby.vercel.app/)

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

**Current approach (simple registry):**

* All sources live in a `sources: Record<string,SourceDef>` map inside `FactsService`.
* Switching source just changes an `activeKey` used by `fetchRandom()`.

## Improvements

* As the number of APIs grows, a single map in one service can become hard to maintain.
* Adding per-source caching, retry policies, authentication, or configuration will clutter this file.

**Future improved design:**

1. **Provider-based plugin system**

   * Define an `InjectionToken<SourceDef>` and allow each source to register itself via Angular DI.
   * Each source lives in its own file/module with its own service implementing a `FactSource` interface.
   * At bootstrap, Angular collects all `FactSource` providers into an array.
2. **Per-source configuration**

   * Move API URLs, headers, cache settings into environment or a config service.
   * Allow each source to declare its own retry, backoff, or caching strategy.
3. **Lazy loading & feature modules**

   * Put each source in its own Angular feature module that can be lazy‑loaded when selected.
   * Reduces initial bundle size when only one source is needed.
4. **Testing & isolation**

   * Each `FactSourceService` can be tested in isolation, with its own mocks.
   * The core `FactsService` simply iterates over injected sources.
