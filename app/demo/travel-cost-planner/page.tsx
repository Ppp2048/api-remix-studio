import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TravelPlannerDemo } from "@/components/TravelPlannerDemo";

export default function TravelCostPlannerPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-brand">Working Demo Prototype</p>
            <h1 className="text-4xl font-semibold text-white">Travel Cost Planner</h1>
            <p className="max-w-3xl text-lg text-slate-300">
              A live mashup of REST Countries, Open-Meteo, and Frankfurter with fallback states for resilient demos.
            </p>
          </div>
          <TravelPlannerDemo />
        </div>
      </main>
      <Footer />
    </div>
  );
}
