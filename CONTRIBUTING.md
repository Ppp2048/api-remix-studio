# Contributing

## Workflow

1. Fork or branch from `main`.
2. Install dependencies with `npm install`.
3. Run `npm run build` before opening a pull request.
4. Keep all external API access free-tier safe and server-side when secrets or reliability matter.
5. Update docs when architecture, templates, or API flows change.

## Engineering Guardrails

- Use Next.js App Router and TypeScript.
- Keep React Flow inside client components.
- Prefer free public APIs and avoid exposing secrets in the frontend.
- Preserve responsive behavior and graceful error states.
- Keep the app deployable on the Vercel Hobby plan.

## Pull Requests

- Describe the user-facing change and the reasoning behind it.
- Include screenshots or screen recordings for UI changes when possible.
- List any new API risks, fallback behaviors, or deployment notes.
