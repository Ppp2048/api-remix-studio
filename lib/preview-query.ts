import type { BuilderSelection } from "@/lib/types";

export const defaultSelection: BuilderSelection = {
  apiIds: ["rest-countries", "open-meteo", "frankfurter"],
  templateId: "travel-planner-ui",
  stylePreset: "futuristic",
};

export function selectionToQuery(selection: BuilderSelection) {
  const params = new URLSearchParams();
  params.set("apis", selection.apiIds.join(","));
  params.set("template", selection.templateId);
  params.set("style", selection.stylePreset);
  if (selection.templateUrl) params.set("templateUrl", selection.templateUrl);
  if (selection.screenshotName) params.set("screenshot", selection.screenshotName);
  return params.toString();
}

export function selectionFromQuery(
  searchParams: Record<string, string | string[] | undefined>,
): BuilderSelection {
  const rawApis = typeof searchParams.apis === "string" ? searchParams.apis : undefined;
  const apiIds = rawApis?.split(",").filter(Boolean) ?? defaultSelection.apiIds;
  const templateId =
    typeof searchParams.template === "string" ? searchParams.template : defaultSelection.templateId;
  const stylePreset =
    typeof searchParams.style === "string" ? searchParams.style : defaultSelection.stylePreset;
  const templateUrl = typeof searchParams.templateUrl === "string" ? searchParams.templateUrl : undefined;
  const screenshotName = typeof searchParams.screenshot === "string" ? searchParams.screenshot : undefined;

  return {
    apiIds,
    templateId,
    stylePreset,
    templateUrl,
    screenshotName,
  };
}
