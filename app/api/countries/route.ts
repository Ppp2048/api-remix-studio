import { NextResponse } from "next/server";
import { fallbackDestinations } from "@/lib/travel-demo";

export async function GET() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2,capital,capitalInfo,currencies,region,flags",
      { next: { revalidate: 86400 } },
    );

    if (!response.ok) {
      throw new Error("Failed to load countries");
    }

    const payload = (await response.json()) as Array<{
      name?: { common?: string };
      cca2?: string;
      capital?: string[];
      capitalInfo?: { latlng?: [number, number] };
      currencies?: Record<string, unknown>;
      region?: string;
      flags?: { png?: string };
    }>;

    const countries = payload
      .map((country) => ({
        name: country.name?.common ?? "Unknown",
        code: country.cca2 ?? "XX",
        capital: country.capital?.[0] ?? "Unknown",
        latlng: country.capitalInfo?.latlng ?? [0, 0],
        currencyCode: Object.keys(country.currencies ?? {})[0] ?? "USD",
        region: country.region ?? "Other",
        flag: country.flags?.png ?? "",
      }))
      .filter((country) => country.name !== "Unknown" && country.capital !== "Unknown")
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 80);

    return NextResponse.json({ countries });
  } catch {
    return NextResponse.json({ countries: fallbackDestinations }, { status: 200 });
  }
}
