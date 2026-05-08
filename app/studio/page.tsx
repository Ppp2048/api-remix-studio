import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StudioBuilder } from "@/components/StudioBuilder";

export default function StudioPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-brand">Main Builder</p>
            <h1 className="text-4xl font-semibold text-white">Compose the API remix</h1>
            <p className="max-w-3xl text-lg text-slate-300">
              Add APIs from the library, connect them on the canvas, and tune the design direction before generating a complete MVP pack.
            </p>
          </div>
          <StudioBuilder />
        </div>
      </main>
      <Footer />
    </div>
  );
}
