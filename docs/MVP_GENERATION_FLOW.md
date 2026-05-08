# MVP Generation Flow

1. The user selects 2-3 APIs from the local catalog.
2. The builder computes compatibility based on tags, inputs, outputs, and risk signals.
3. Template selections and inspiration inputs are captured into a lightweight selection model.
4. `buildPreviewModel()` creates product ideas, special-case overrides, metrics, and prompt material.
5. `/preview` renders the final plan, feature ladder, data flow, style guide, file tree, and checklist.

## Special-case idea mappings

- REST Countries + Open-Meteo + Frankfurter -> Travel Cost Planner
- NASA APOD + Open-Meteo -> Stargazing Planner
- PokéAPI + JokeAPI -> Pokemon Battle Quiz
- GitHub REST + CoinGecko -> Developer Market Pulse
- Open Library + Hipolabs Universities -> Student Reading Explorer

If no special case matches, the fallback generator uses category and tag overlap to synthesize ideas.
