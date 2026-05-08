# AGENTS.md

## Project

This project is API Remix Studio, a Codex-powered API mashup and MVP planning studio.

## Build rules

- Use Next.js App Router.
- Use TypeScript.
- Use Tailwind CSS.
- Use React Flow only in client components.
- Use server-side route handlers for public API calls.
- Do not expose secret keys in frontend code.
- Prefer free/no-key APIs.
- Keep the app deployable on Vercel.
- Ensure `npm run build` passes before finalizing changes.

## UI rules

- Minimal but futuristic UI.
- Dark premium theme.
- Responsive layout.
- Smooth interactions.
- Use Lucide icons.
- Use Framer Motion only where useful.
- Keep 3D lightweight and optional.

## Review guidelines

- Check for broken imports.
- Check for client/server component mistakes.
- Check for unsafe API key usage.
- Check for bad loading/error states.
- Check for mobile usability.