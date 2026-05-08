import { apiCatalogMap } from "@/lib/api-catalog";
import type { ApiCatalogEntry, CompatibilityResult } from "@/lib/types";
import { clamp, unique } from "@/lib/utils";

function riskValue(level: ApiCatalogEntry["corsRisk"]) {
  if (level === "high") return 14;
  if (level === "medium") return 8;
  return 3;
}

export function getSelectedApis(apiIds: string[]) {
  return apiIds
    .map((id) => apiCatalogMap[id])
    .filter(Boolean)
    .slice(0, 3);
}

export function calculateCompatibility(apiIds: string[]): CompatibilityResult {
  const selectedApis = getSelectedApis(apiIds);

  if (selectedApis.length < 2) {
    return {
      score: 32,
      reasons: ["Choose at least two APIs to unlock meaningful mashup analysis."],
      warnings: ["Compatibility scoring becomes more accurate when 2-3 APIs are selected."],
      freeResourceRiskNotes: ["Free APIs are best for MVPs but still need caching and fallbacks."],
    };
  }

  const combinedInputs = unique(selectedApis.flatMap((api) => api.inputs.map((item) => item.toLowerCase())));
  const combinedOutputs = unique(selectedApis.flatMap((api) => api.outputs.map((item) => item.toLowerCase())));
  const combinedTags = unique(selectedApis.flatMap((api) => api.tags.map((item) => item.toLowerCase())));
  const sharedTags = combinedTags.filter(
    (tag) => selectedApis.filter((api) => api.tags.map((item) => item.toLowerCase()).includes(tag)).length > 1,
  );

  const bridgeMatches = selectedApis.flatMap((api) =>
    api.outputs.flatMap((output) =>
      selectedApis
        .filter((candidate) => candidate.id !== api.id)
        .flatMap((candidate) =>
          candidate.inputs
            .filter((input) => input.toLowerCase().includes(output.toLowerCase().split(" ")[0]))
            .map((input) => `${api.name} can feed ${candidate.name} through ${output} -> ${input}`),
        ),
    ),
  );

  const categorySpread = unique(selectedApis.map((api) => api.category)).length;
  const safetyBoost = selectedApis.filter((api) => api.frontendSafe).length * 6;
  const semanticBoost = sharedTags.length * 8;
  const bridgeBoost = clamp(bridgeMatches.length * 7, 0, 28);
  const dataCoverageBoost = clamp(combinedOutputs.length + combinedInputs.length, 0, 18);
  const diversityBoost = categorySpread > 1 ? 10 : 4;
  const riskPenalty =
    selectedApis.reduce((sum, api) => sum + riskValue(api.corsRisk) + riskValue(api.rateLimitRisk), 0) / 3;

  const score = clamp(
    Math.round(28 + safetyBoost + semanticBoost + bridgeBoost + dataCoverageBoost + diversityBoost - riskPenalty),
    0,
    100,
  );

  const reasons = unique([
    sharedTags.length
      ? `Shared intent across APIs via ${sharedTags.slice(0, 4).join(", ")} improves product coherence.`
      : "The APIs span distinct domains, which creates room for differentiated workflows.",
    bridgeMatches[0] ?? "The selected APIs can be chained through lightweight transformation logic in route handlers.",
    categorySpread > 1
      ? "Cross-domain coverage increases demo richness and makes the MVP feel more complete."
      : "A focused category spread keeps the first MVP tighter and easier to build.",
  ]);

  const warnings = unique(
    selectedApis.flatMap((api) => {
      const list: string[] = [];
      if (!api.frontendSafe) {
        list.push(`${api.name} should be proxied through a server route before UI consumption.`);
      }
      if (api.corsRisk !== "low") {
        list.push(`${api.name} has ${api.corsRisk} CORS risk; add fallbacks and cacheable server routes.`);
      }
      if (api.rateLimitRisk !== "low") {
        list.push(`${api.name} has ${api.rateLimitRisk} rate-limit risk; reduce polling and batch requests.`);
      }
      return list;
    }),
  );

  const freeResourceRiskNotes = unique(
    selectedApis.map(
      (api) =>
        `${api.name}: use request caching, retries, and demo fallback data to protect the free-tier experience.`,
    ),
  );

  return {
    score,
    reasons,
    warnings,
    freeResourceRiskNotes,
  };
}
