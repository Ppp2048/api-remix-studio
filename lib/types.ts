export type ApiCatalogEntry = {
  id: string;
  name: string;
  category: string;
  description: string;
  authType: "none" | "optional" | "oauth" | "apiKey";
  baseUrl: string;
  docsUrl: string;
  inputs: string[];
  outputs: string[];
  tags: string[];
  sampleUseCases: string[];
  difficulty: "easy" | "medium" | "advanced";
  corsRisk: "low" | "medium" | "high";
  rateLimitRisk: "low" | "medium" | "high";
  frontendSafe: boolean;
  recommendedUsage: string;
};

export type TemplatePreset = {
  id: string;
  name: string;
  category: string;
  description: string;
  bestForApiTags: string[];
  layout: string[];
  colorSystem: string[];
  typography: string[];
  components: string[];
  animationStyle: string;
  promptInstructions: string;
};

export type CompatibilityResult = {
  score: number;
  reasons: string[];
  warnings: string[];
  freeResourceRiskNotes: string[];
};

export type ProductIdea = {
  name: string;
  oneLinePitch: string;
  targetUsers: string[];
  problemSolved: string;
  mustHaveFeatures: string[];
  shouldHaveFeatures: string[];
  wowFeatures: string[];
  dataFlow: string[];
  uiSections: string[];
  dashboardWidgets: string[];
  buildDifficulty: "easy" | "medium" | "advanced";
  wowFactor: number;
  codexPrompt: string;
};

export type MvpScoreBreakdown = {
  total: number;
  compatibility: number;
  problemClarity: number;
  demoValue: number;
  buildSimplicity: number;
  deployability: number;
};

export type BuilderSelection = {
  apiIds: string[];
  templateId: string;
  stylePreset: string;
  templateUrl?: string;
  screenshotName?: string;
};
