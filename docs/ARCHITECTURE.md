# Architecture

## App Router structure

- `/` landing page with marketing narrative and optional lightweight 3D accent
- `/studio` client-heavy builder experience
- `/preview` server-rendered MVP output using query-driven state
- `/demo/travel-cost-planner` working client demo with route-handler backed data
- `/api/*` route handlers that proxy public APIs and supply safe fallback responses

## Data layer

- `lib/api-catalog.ts` stores the curated API metadata catalog
- `lib/template-presets.ts` stores reusable template directions
- `lib/compatibility.ts` scores API fit and risks
- `lib/idea-generator.ts` creates product ideas and preview models
- `lib/mvp-score.ts` computes weighted MVP quality totals

## UI layer

- Shared layout pieces live in `components/`
- React Flow stays isolated inside client components
- Recharts is used only inside client widgets
- Route handlers prevent the UI from depending directly on unstable upstream APIs
