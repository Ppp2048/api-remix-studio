# API Remix Studio

API Remix Studio is a Codex-powered MVP generation layer that turns free public API combinations and design inspiration into buildable software prototypes.

## Demo Flow

1. Open `/studio` and choose 2-3 APIs from the curated library.
2. Connect APIs on the React Flow canvas and review the compatibility score.
3. Pick a built-in template, optionally add an inspiration URL, and upload a screenshot reference.
4. Generate the `/preview` MVP pack with product idea, score breakdown, data flow, UI direction, file tree, Codex prompt, and deployment checklist.
5. Open `/demo/travel-cost-planner` to explore the live working prototype.

## Features

- Futuristic landing page with lightweight 3D hero accent
- Studio builder with API library, React Flow canvas, and inspector panel
- Local TypeScript catalog for 12 free public APIs
- Built-in template preset system with manual style remix controls
- Compatibility engine with reasons, warnings, and free-tier risk notes
- Idea generator with special-case mashups and fallback concept generation
- MVP quality scoring model and feature prioritization
- Working Travel Cost Planner demo backed by server-side route handlers
- Production-friendly docs, CI, GitHub templates, and Vercel-ready setup

## Screenshots

- `docs/screenshots/landing-placeholder.png` (placeholder)
- `docs/screenshots/studio-placeholder.png` (placeholder)
- `docs/screenshots/preview-placeholder.png` (placeholder)
- `docs/screenshots/demo-placeholder.png` (placeholder)

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- React Flow via `@xyflow/react`
- Recharts
- Lucide React
- Framer Motion
- React Three Fiber + Drei for the optional hero object

## Local Setup

```bash
npm install
npm run build
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Free APIs Used

- REST Countries
- Open-Meteo
- Frankfurter
- NASA APOD
- PokéAPI
- Open Library
- Jikan Anime API
- Nager.Date Public Holidays
- GitHub REST API
- Hipolabs Universities API
- JokeAPI
- CoinGecko public API

## Template Inspiration System

- Built-in presets live in [`lib/template-presets.ts`](/C:/Users/KIIT0001/Desktop/Projects/api-remix-studio/lib/template-presets.ts:1).
- Inspiration URLs are carried into the generated style guide and Codex build prompt.
- Screenshot uploads are lightweight MVP references only. The app stores the filename and surfaces a placeholder style profile instead of running image analysis.

## Deployment

The project is designed for the Vercel Hobby plan:

1. Import the repository into Vercel.
2. Keep the default `npm run build` build command.
3. No database or paid API setup is required for the MVP.
4. Optional secrets can be added later if you choose to extend NASA or GitHub usage beyond public/demo limits.

See [`docs/DEPLOYMENT.md`](/C:/Users/KIIT0001/Desktop/Projects/api-remix-studio/docs/DEPLOYMENT.md:1) for the full checklist.

## Codex Workflow

- Use the studio to explore API pairings.
- Review the generated preview for scope, data flow, and template direction.
- Copy the Codex build prompt from `/preview`.
- Implement or extend the generated concept inside the same repo.

See [`docs/CODEX_WORKFLOW.md`](/C:/Users/KIIT0001/Desktop/Projects/api-remix-studio/docs/CODEX_WORKFLOW.md:1) for the detailed loop.

## Future Scope

- Persist remix sessions in local storage or a hosted database
- Add multi-demo generation beyond the travel prototype
- Add downloadable proposal exports
- Expand screenshot analysis into real vision-assisted style extraction
- Introduce shareable remix URLs and collaboration workflows
