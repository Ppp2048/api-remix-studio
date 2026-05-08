# Deployment

## Local verification

```bash
npm install
npm run build
```

## Vercel deployment

1. Push the repo to GitHub.
2. Import the repository into Vercel.
3. Use the default Next.js framework detection.
4. Keep `npm run build` as the production build command.
5. Deploy without additional environment variables for the MVP.

## Operational notes

- Route handlers already provide fallback responses for the travel demo.
- Public APIs can still rate-limit or change behavior, so keep the documented limitations visible.
- If you later add authenticated GitHub or NASA access, store secrets only in Vercel environment variables.
