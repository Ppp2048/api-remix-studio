import { clamp } from "@/lib/utils";

type MvpScoreInput = {
  compatibility: number;
  problemClarity: number;
  demoValue: number;
  buildSimplicity: number;
  deployability: number;
};

export function calculateMvpScore({
  compatibility,
  problemClarity,
  demoValue,
  buildSimplicity,
  deployability,
}: MvpScoreInput) {
  const breakdown = {
    compatibility: clamp(Math.round(compatibility), 0, 100),
    problemClarity: clamp(Math.round(problemClarity), 0, 100),
    demoValue: clamp(Math.round(demoValue), 0, 100),
    buildSimplicity: clamp(Math.round(buildSimplicity), 0, 100),
    deployability: clamp(Math.round(deployability), 0, 100),
  };

  const total = Math.round(
    breakdown.compatibility * 0.3 +
      breakdown.problemClarity * 0.2 +
      breakdown.demoValue * 0.2 +
      breakdown.buildSimplicity * 0.15 +
      breakdown.deployability * 0.15,
  );

  return {
    total,
    ...breakdown,
  };
}
