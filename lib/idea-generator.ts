import { templatePresetMap } from "@/lib/template-presets";
import { calculateCompatibility, getSelectedApis } from "@/lib/compatibility";
import type { BuilderSelection, ProductIdea } from "@/lib/types";
import { unique } from "@/lib/utils";

function buildFallbackIdeas(selection: BuilderSelection): ProductIdea[] {
  const apis = getSelectedApis(selection.apiIds);
  const tags = unique(apis.flatMap((api) => api.tags));
  const template = templatePresetMap[selection.templateId];
  const categoryLabel = unique(apis.map((api) => api.category)).join(", ");
  const coreNouns = unique(tags.slice(0, 4));

  const basePrompt = [
    `Build a Next.js MVP called "${apis.map((api) => api.name).join(" + ")} Remix".`,
    `Use the ${template?.name ?? "selected"} template direction with ${selection.stylePreset} styling.`,
    `Selected APIs: ${apis.map((api) => `${api.name} (${api.baseUrl})`).join(", ")}.`,
    selection.templateUrl ? `Reference this inspiration URL for layout clues: ${selection.templateUrl}.` : null,
    selection.screenshotName
      ? `Use the uploaded screenshot inspiration named "${selection.screenshotName}" for layout, spacing, and visual mood.`
      : null,
    "Generate server-side route handlers for public API calls, responsive UI, and fallback demo data.",
  ]
    .filter(Boolean)
    .join(" ");

  return [
    {
      name: `${coreNouns[0] ?? "API"} Signal Desk`,
      oneLinePitch: `A ${categoryLabel} control panel that turns ${coreNouns.join(", ")} data into fast operator decisions.`,
      targetUsers: ["Hackathon teams", "Product builders", "Analyst-heavy startups"],
      problemSolved: "Teams need a fast way to validate whether mixed public datasets can become a coherent MVP.",
      mustHaveFeatures: [
        "Multi-source API aggregation",
        "Primary decision dashboard",
        "Clear empty, loading, and fallback states",
      ],
      shouldHaveFeatures: ["Saved presets", "Shareable preview link", "Template-specific widget swaps"],
      wowFeatures: ["Animated insight panels", "AI-style build prompt pack"],
      dataFlow: [
        `${apis[0]?.name ?? "API 1"} provides the primary lookup context.`,
        `${apis[1]?.name ?? "API 2"} enriches each result with secondary signals.`,
        `${apis[2]?.name ?? "API 3"} adds monetization, timing, or comparative insight when available.`,
      ],
      uiSections: ["Hero summary", "Insights grid", "Workflow checklist", "Builder prompt drawer"],
      dashboardWidgets: ["Trend line", "Readiness dial", "Top entity leaderboard"],
      buildDifficulty: apis.length >= 3 ? "medium" : "easy",
      wowFactor: 81,
      codexPrompt: basePrompt,
    },
    {
      name: `${coreNouns[1] ?? "Remix"} Concierge`,
      oneLinePitch: `A guided planning product that combines ${coreNouns.join(", ")} context into an actionable journey.`,
      targetUsers: ["Independent makers", "Operations teams", "Curious end users"],
      problemSolved: "Users want recommendations, not raw API responses, when evaluating a new concept.",
      mustHaveFeatures: ["Recommendation engine", "Explainer panels", "Actionable checklist"],
      shouldHaveFeatures: ["Scenario compare mode", "User notes", "Downloadable summary"],
      wowFeatures: ["Template-aware UI style guide", "Data-driven hero banner"],
      dataFlow: [
        "User submits a query or target entity.",
        "The app collects context from the selected APIs.",
        "A scoring layer turns mixed API data into ranked recommendations.",
      ],
      uiSections: ["Search rail", "Scenario cards", "Widget shelf", "Execution plan panel"],
      dashboardWidgets: ["Priority matrix", "Risk tracker", "Recommendation spotlight"],
      buildDifficulty: "medium",
      wowFactor: 78,
      codexPrompt: `${basePrompt} Focus the MVP on guided recommendations and an operator-ready dashboard.`,
    },
    {
      name: `${coreNouns[2] ?? "Launch"} Planner`,
      oneLinePitch: `An MVP planning workspace that turns ${categoryLabel} APIs into a demo-ready launch concept.`,
      targetUsers: ["Hackathon judges", "Founders", "Agency teams"],
      problemSolved: "Founders need a sharper, buildable scope before investing engineering time in a public API idea.",
      mustHaveFeatures: ["Scope planner", "Data flow map", "Deployment checklist"],
      shouldHaveFeatures: ["Template remix suggestions", "Feature priority ladder", "Demo script"],
      wowFeatures: ["Auto-generated file tree", "Codex build pack"],
      dataFlow: [
        "API capabilities are mapped to features.",
        "Feature feasibility rolls into a quality score.",
        "The final output becomes a prompt-backed implementation plan.",
      ],
      uiSections: ["Concept overview", "Feature ladder", "Architecture section", "Build pack"],
      dashboardWidgets: ["Effort vs value chart", "API risk heat map", "Checklist progress"],
      buildDifficulty: "easy",
      wowFactor: 75,
      codexPrompt: `${basePrompt} Keep the implementation deployable on Vercel without any database dependency.`,
    },
  ];
}

function applySpecialCases(selection: BuilderSelection, ideas: ProductIdea[]) {
  const key = [...selection.apiIds].sort().join("+");

  const specialCaseIdeas: Record<string, ProductIdea> = {
    "frankfurter+open-meteo+rest-countries": {
      name: "Travel Cost Planner",
      oneLinePitch:
        "Compare destinations by weather, currency, and country context before committing to a trip.",
      targetUsers: ["Remote workers", "Budget travelers", "Trip planners"],
      problemSolved: "Travelers need one place to assess destination suitability and budget in minutes.",
      mustHaveFeatures: ["Country selector", "Forecast summary", "Budget converter", "Travel readiness score"],
      shouldHaveFeatures: ["Holiday overlays", "Packing checklist", "Capital city snapshots"],
      wowFeatures: ["Multi-country compare mode", "Auto-generated trip brief"],
      dataFlow: [
        "REST Countries provides country facts, currency code, and capital coordinates.",
        "Open-Meteo uses the coordinates to return destination weather signals.",
        "Frankfurter converts user budget into the destination currency for affordability checks.",
      ],
      uiSections: ["Destination hero", "Weather and budget grid", "Readiness score", "Packing assistant"],
      dashboardWidgets: ["Forecast sparkline", "Budget conversion chart", "Readiness gauge"],
      buildDifficulty: "easy",
      wowFactor: 88,
      codexPrompt:
        "Build a travel planning MVP in Next.js using REST Countries, Open-Meteo, and Frankfurter. Add a country selector, weather summary, budget conversion, readiness score, packing tips, and fallback data. Keep the UI polished, responsive, and ready for Vercel.",
    },
    "nasa-apod+open-meteo": {
      name: "Stargazing Planner",
      oneLinePitch: "Help astronomy fans choose the best nights to watch the sky with weather plus NASA context.",
      targetUsers: ["Astronomy clubs", "Weekend explorers", "Science educators"],
      problemSolved: "Clear-sky opportunities are scattered across disconnected tools and media feeds.",
      mustHaveFeatures: ["Sky conditions view", "NASA feature card", "Best night score"],
      shouldHaveFeatures: ["Location presets", "Observation notes", "Educational tips"],
      wowFeatures: ["Night-sky theme generator", "Event reminder brief"],
      dataFlow: [
        "Open-Meteo supplies forecast clarity, wind, and temperature.",
        "NASA APOD adds a daily astronomy story and visual context.",
      ],
      uiSections: ["Night score hero", "Forecast strip", "APOD story card", "Planning notes"],
      dashboardWidgets: ["Visibility dial", "Temperature trend", "Best observation window"],
      buildDifficulty: "easy",
      wowFactor: 84,
      codexPrompt:
        "Create a stargazing planner MVP that combines Open-Meteo forecasts with NASA APOD storytelling. Focus on clear-night scoring, educational visuals, and a premium dark UI.",
    },
    "jokeapi+pokeapi": {
      name: "Pokemon Battle Quiz",
      oneLinePitch: "A playful quiz battler that mixes Pokemon stats with surprise humor prompts.",
      targetUsers: ["Fans", "Streamers", "Casual gamers"],
      problemSolved: "Quiz apps often lack personality and replay value.",
      mustHaveFeatures: ["Pokemon card reveal", "Battle quiz prompt", "Score tracker"],
      shouldHaveFeatures: ["Difficulty levels", "Shareable streaks", "Character categories"],
      wowFeatures: ["Boss round mode", "Animated reward moments"],
      dataFlow: [
        "PokéAPI provides character stats and move data.",
        "JokeAPI injects humor prompts or twist cards into each battle round.",
      ],
      uiSections: ["Arena stage", "Quiz deck", "Streak panel", "Reward banner"],
      dashboardWidgets: ["Win streak meter", "Type distribution chart", "Reward tracker"],
      buildDifficulty: "easy",
      wowFactor: 90,
      codexPrompt:
        "Build a playful Pokemon Battle Quiz using PokéAPI and JokeAPI with animated cards, score tracking, and a fun arcade UI.",
    },
    "coingecko+github-rest": {
      name: "Developer Market Pulse",
      oneLinePitch: "Track open-source momentum alongside crypto market signals to spot where builders are moving.",
      targetUsers: ["Developer investors", "Research teams", "OSS operators"],
      problemSolved: "Trend analysts lack a lightweight view that merges code community signals with market narratives.",
      mustHaveFeatures: ["Repo activity cards", "Market watchlist", "Signal summary"],
      shouldHaveFeatures: ["Topic filters", "Momentum watchlists", "Daily briefing"],
      wowFeatures: ["Narrative score", "Builder sentiment snapshot"],
      dataFlow: [
        "GitHub REST API provides repository activity and contributor signals.",
        "CoinGecko adds market trend context and asset movement data.",
      ],
      uiSections: ["Pulse summary", "Repo leaderboard", "Market panels", "Narrative tracker"],
      dashboardWidgets: ["Commit vs price trend", "Market movers", "OSS momentum index"],
      buildDifficulty: "medium",
      wowFactor: 86,
      codexPrompt:
        "Create a Developer Market Pulse dashboard with GitHub REST API and CoinGecko. Show repo momentum, market movement, and trend analysis in a polished terminal-style UI.",
    },
    "hipolabs-universities+open-library": {
      name: "Student Reading Explorer",
      oneLinePitch: "Help students discover universities and curated reading lists in one guided research workspace.",
      targetUsers: ["Students", "Advisors", "Academic counselors"],
      problemSolved: "Education research is fragmented across school listings and reading discovery tools.",
      mustHaveFeatures: ["University lookup", "Reading suggestions", "Saved shortlist"],
      shouldHaveFeatures: ["Country filter", "Subject paths", "Advisor notes"],
      wowFeatures: ["Program inspiration board", "Topic-based starter kits"],
      dataFlow: [
        "Hipolabs surfaces universities by country and institution name.",
        "Open Library layers in books and subject references for each learning path.",
      ],
      uiSections: ["Research hero", "Institution list", "Book shelf", "Planning sidebar"],
      dashboardWidgets: ["Country distribution", "Subject interest chart", "Reading queue"],
      buildDifficulty: "easy",
      wowFactor: 80,
      codexPrompt:
        "Build a Student Reading Explorer using Hipolabs Universities and Open Library. Focus on research discovery, subject-led recommendations, and a calm academic interface.",
    },
  };

  return specialCaseIdeas[key] ? [specialCaseIdeas[key], ...ideas.slice(0, 2)] : ideas;
}

export function generateIdeas(selection: BuilderSelection) {
  const compatibility = calculateCompatibility(selection.apiIds);
  const ideas = buildFallbackIdeas(selection).map((idea, index) => ({
    ...idea,
    wowFactor: Math.max(70, idea.wowFactor - index + Math.round(compatibility.score / 20)),
  }));

  return applySpecialCases(selection, ideas).slice(0, 3);
}

export function buildPreviewModel(selection: BuilderSelection) {
  const apis = getSelectedApis(selection.apiIds);
  const template = templatePresetMap[selection.templateId];
  const compatibility = calculateCompatibility(selection.apiIds);
  const ideas = generateIdeas(selection);
  const primaryIdea = ideas[0];

  const problemClarity = Math.min(100, 55 + apis.length * 10 + primaryIdea.mustHaveFeatures.length * 3);
  const demoValue = Math.min(100, compatibility.score + primaryIdea.wowFactor / 4);
  const buildSimplicity =
    primaryIdea.buildDifficulty === "easy" ? 88 : primaryIdea.buildDifficulty === "medium" ? 73 : 58;
  const deployability = Math.min(
    100,
    84 - compatibility.warnings.filter((warning) => warning.includes("rate-limit")).length * 5,
  );

  return {
    apis,
    template,
    compatibility,
    ideas,
    primaryIdea,
    metrics: {
      problemClarity,
      demoValue,
      buildSimplicity,
      deployability,
    },
  };
}
