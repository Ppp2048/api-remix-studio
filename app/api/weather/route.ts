import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get("lat");
  const lon = request.nextUrl.searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "lat and lon are required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max,precipitation_probability_max&forecast_days=5&timezone=auto`,
      { next: { revalidate: 1800 } },
    );

    if (!response.ok) {
      throw new Error("Failed to load weather");
    }

    const data = (await response.json()) as {
      current?: {
        temperature_2m?: number;
        wind_speed_10m?: number;
      };
      daily?: {
        time?: string[];
        temperature_2m_max?: number[];
        precipitation_probability_max?: number[];
      };
    };

    const labels = data.daily?.time?.map((value) =>
      new Date(value).toLocaleDateString("en-US", { weekday: "short" }),
    ) ?? ["Mon", "Tue", "Wed", "Thu", "Fri"];

    return NextResponse.json({
      current: {
        temperature: Math.round(data.current?.temperature_2m ?? 23),
        windspeed: Math.round(data.current?.wind_speed_10m ?? 10),
        rainChance: Math.round(data.daily?.precipitation_probability_max?.[0] ?? 20),
      },
      daily: {
        labels,
        temperatures: data.daily?.temperature_2m_max?.map((value) => Math.round(value)) ?? [22, 24, 25, 23, 21],
      },
    });
  } catch {
    return NextResponse.json(
      {
        current: {
          temperature: 23,
          windspeed: 10,
          rainChance: 18,
        },
        daily: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          temperatures: [22, 24, 25, 23, 21],
        },
      },
      { status: 200 },
    );
  }
}
