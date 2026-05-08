import { clamp } from "@/lib/utils";

export const fallbackDestinations = [
  {
    name: "Japan",
    code: "JP",
    capital: "Tokyo",
    latlng: [35.6762, 139.6503] as [number, number],
    currencyCode: "JPY",
    region: "Asia",
    flag: "https://flagcdn.com/w320/jp.png",
  },
  {
    name: "Portugal",
    code: "PT",
    capital: "Lisbon",
    latlng: [38.7223, -9.1393] as [number, number],
    currencyCode: "EUR",
    region: "Europe",
    flag: "https://flagcdn.com/w320/pt.png",
  },
  {
    name: "Canada",
    code: "CA",
    capital: "Ottawa",
    latlng: [45.4215, -75.6972] as [number, number],
    currencyCode: "CAD",
    region: "North America",
    flag: "https://flagcdn.com/w320/ca.png",
  },
];

export function calculateTravelReadiness(input: {
  temperature: number;
  rainChance: number;
  budgetConverted: number;
  budgetBase: number;
}) {
  const weatherScore = clamp(100 - Math.abs(22 - input.temperature) * 3 - input.rainChance * 0.4, 25, 100);
  const budgetScore = clamp(100 - ((input.budgetConverted - input.budgetBase) / input.budgetBase) * 40, 35, 100);
  return Math.round(weatherScore * 0.55 + budgetScore * 0.45);
}

export function generatePackingTips(temperature: number, rainChance: number) {
  const tips = ["Bring a compact charger and a universal adapter."];
  if (temperature < 14) tips.push("Pack a thermal layer or lightweight jacket.");
  if (temperature > 26) tips.push("Carry breathable outfits and refillable water gear.");
  if (rainChance > 45) tips.push("Add a foldable umbrella and water-resistant shoes.");
  if (rainChance < 20) tips.push("Good chance for outdoor plans, so keep sunglasses handy.");
  return tips;
}
