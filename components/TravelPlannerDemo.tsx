"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AlertCircle, LoaderCircle, Plane, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { calculateTravelReadiness, fallbackDestinations, generatePackingTips } from "@/lib/travel-demo";

type Country = {
  name: string;
  code: string;
  capital: string;
  latlng: [number, number];
  currencyCode: string;
  region: string;
  flag: string;
};

type WeatherResponse = {
  current: {
    temperature: number;
    windspeed: number;
    rainChance: number;
  };
  daily: {
    labels: string[];
    temperatures: number[];
  };
};

export function TravelPlannerDemo() {
  const [countries, setCountries] = useState<Country[]>(fallbackDestinations);
  const [selectedCode, setSelectedCode] = useState(fallbackDestinations[0].code);
  const [budget, setBudget] = useState(1200);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [conversion, setConversion] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const selectedCountry = useMemo(
    () => countries.find((country) => country.code === selectedCode) ?? fallbackDestinations[0],
    [countries, selectedCode],
  );

  useEffect(() => {
    async function loadCountries() {
      try {
        const response = await fetch("/api/countries");
        if (!response.ok) throw new Error("Country API unavailable");
        const data = (await response.json()) as { countries: Country[] };
        if (data.countries.length) setCountries(data.countries);
      } catch {
        setCountries(fallbackDestinations);
      }
    }

    loadCountries();
  }, []);

  useEffect(() => {
    async function loadDestinationInsights() {
      setLoading(true);
      setError(null);

      try {
        const [weatherResponse, currencyResponse] = await Promise.all([
          fetch(
            `/api/weather?lat=${selectedCountry.latlng[0]}&lon=${selectedCountry.latlng[1]}&label=${encodeURIComponent(selectedCountry.capital)}`,
          ),
          fetch(
            `/api/currency?from=${baseCurrency}&to=${selectedCountry.currencyCode}&amount=${budget}`,
          ),
        ]);

        if (!weatherResponse.ok || !currencyResponse.ok) {
          throw new Error("Upstream route failed");
        }

        const weatherData = (await weatherResponse.json()) as WeatherResponse;
        const currencyData = (await currencyResponse.json()) as { convertedAmount: number };
        setWeather(weatherData);
        setConversion(currencyData.convertedAmount);
      } catch {
        setError("Live data was temporarily unavailable, so fallback destination insights are displayed.");
        setWeather({
          current: { temperature: 23, windspeed: 10, rainChance: 18 },
          daily: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            temperatures: [22, 24, 25, 23, 21],
          },
        });
        setConversion(Number((budget * 0.92).toFixed(2)));
      } finally {
        setLoading(false);
      }
    }

    loadDestinationInsights();
  }, [selectedCountry, budget, baseCurrency]);

  const readinessScore =
    weather && conversion
      ? calculateTravelReadiness({
          temperature: weather.current.temperature,
          rainChance: weather.current.rainChance,
          budgetConverted: conversion,
          budgetBase: budget,
        })
      : 72;

  const packingTips = generatePackingTips(weather?.current.temperature ?? 23, weather?.current.rainChance ?? 18);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[0.75fr_1.25fr]">
        <section className="glass-panel rounded-[2rem] p-5">
          <p className="text-sm font-medium text-white">Destination Setup</p>
          <div className="mt-4 space-y-4">
            <select
              value={selectedCode}
              onChange={(event) => setSelectedCode(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code} className="bg-slate-950">
                  {country.name}
                </option>
              ))}
            </select>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="number"
                value={budget}
                onChange={(event) => setBudget(Number(event.target.value))}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
              />
              <select
                value={baseCurrency}
                onChange={(event) => setBaseCurrency(event.target.value)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
              >
                {["USD", "EUR", "GBP", "INR"].map((currency) => (
                  <option key={currency} value={currency} className="bg-slate-950">
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            {error ? (
              <div className="flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </div>
            ) : null}
          </div>
        </section>
        <section className="glass-panel rounded-[2rem] p-5">
          {loading ? (
            <div className="flex h-full min-h-[220px] items-center justify-center gap-3 text-slate-300">
              <LoaderCircle className="h-5 w-5 animate-spin" />
              Loading destination intelligence...
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-brand">{selectedCountry.region}</p>
                    <h2 className="mt-2 text-3xl font-semibold text-white">{selectedCountry.name}</h2>
                    <p className="mt-2 text-sm text-slate-300">
                      Capital city: {selectedCountry.capital} • Currency: {selectedCountry.currencyCode}
                    </p>
                  </div>
                  <div className="relative h-16 w-24 overflow-hidden rounded-2xl border border-white/10">
                    <Image src={selectedCountry.flag} alt={`${selectedCountry.name} flag`} fill className="object-cover" />
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-950/70 p-4">
                    <p className="text-sm text-muted">Weather</p>
                    <p className="mt-2 text-3xl font-semibold text-white">{weather?.current.temperature}°C</p>
                    <p className="mt-2 text-sm text-slate-300">
                      Rain chance {weather?.current.rainChance}% • Wind {weather?.current.windspeed} km/h
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-950/70 p-4">
                    <p className="text-sm text-muted">Converted budget</p>
                    <p className="mt-2 text-3xl font-semibold text-white">
                      {selectedCountry.currencyCode} {conversion?.toFixed(2)}
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      Based on {baseCurrency} {budget}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-3">
                      <Plane className="h-5 w-5 text-brand" />
                      <p className="text-sm text-muted">Travel readiness</p>
                    </div>
                    <p className="mt-4 text-5xl font-semibold text-white">{readinessScore}</p>
                    <p className="mt-2 text-sm text-slate-300">A balanced score from weather comfort and budget fit.</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-emerald-400" />
                      <p className="text-sm text-muted">Packing tips</p>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm text-slate-300">
                      {packingTips.map((tip) => (
                        <li key={tip}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-medium text-white">5-day weather curve</p>
                  <div className="mt-4 h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={weather?.daily.labels.map((label, index) => ({
                          label,
                          temperature: weather.daily.temperatures[index],
                        }))}
                      >
                        <defs>
                          <linearGradient id="travelFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                        <XAxis dataKey="label" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip />
                        <Area type="monotone" dataKey="temperature" stroke="#7dd3fc" fill="url(#travelFill)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
