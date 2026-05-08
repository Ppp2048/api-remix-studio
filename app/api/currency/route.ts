import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const amount = request.nextUrl.searchParams.get("amount") ?? "1000";
  const from = request.nextUrl.searchParams.get("from") ?? "USD";
  const to = request.nextUrl.searchParams.get("to") ?? "EUR";

  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`,
      { next: { revalidate: 1800 } },
    );

    if (!response.ok) {
      throw new Error("Failed to load conversion");
    }

    const data = (await response.json()) as {
      amount?: number;
      rates?: Record<string, number>;
    };

    return NextResponse.json({
      baseAmount: Number(amount),
      convertedAmount: data.rates?.[to] ?? Number(amount),
      baseCurrency: from,
      targetCurrency: to,
    });
  } catch {
    return NextResponse.json(
      {
        baseAmount: Number(amount),
        convertedAmount: Number(amount) * 0.92,
        baseCurrency: from,
        targetCurrency: to,
      },
      { status: 200 },
    );
  }
}
