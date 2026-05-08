import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CodePromptPanel } from "@/components/CodePromptPanel";
import { DashboardWidgetSuggestions } from "@/components/DashboardWidgetSuggestions";
import { DataFlowView } from "@/components/DataFlowView";
import { DeploymentChecklist } from "@/components/DeploymentChecklist";
import { FeaturePrioritizer } from "@/components/FeaturePrioritizer";
import { FileTreeView } from "@/components/FileTreeView";
import { MvpQualityScore } from "@/components/MvpQualityScore";
import { ProductIdeaCard } from "@/components/ProductIdeaCard";
import { buildPreviewModel } from "@/lib/idea-generator";
import { calculateMvpScore } from "@/lib/mvp-score";
import { selectionFromQuery } from "@/lib/preview-query";

type PreviewPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PreviewPage({ searchParams }: PreviewPageProps) {
  const params = await searchParams;
  const selection = selectionFromQuery(params);
  const preview = buildPreviewModel(selection);
  const score = calculateMvpScore({
    compatibility: preview.compatibility.score,
    ...preview.metrics,
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <ProductIdeaCard idea={preview.primaryIdea} />
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <MvpQualityScore {...score} />
            <div className="glass-panel rounded-[2rem] p-5">
              <p className="text-sm font-medium text-white">API Compatibility Reasons</p>
              <div className="mt-4 space-y-3">
                {preview.compatibility.reasons.map((reason) => (
                  <div key={reason} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                    {reason}
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {preview.compatibility.freeResourceRiskNotes.map((note) => (
                  <div key={note} className="rounded-[1.5rem] border border-amber-400/10 bg-amber-400/5 p-4 text-sm text-amber-100">
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <FeaturePrioritizer
            mustHave={preview.primaryIdea.mustHaveFeatures}
            shouldHave={preview.primaryIdea.shouldHaveFeatures}
            wow={preview.primaryIdea.wowFeatures}
          />
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <DataFlowView items={preview.primaryIdea.dataFlow} />
            <DashboardWidgetSuggestions widgets={preview.primaryIdea.dashboardWidgets} />
          </div>
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <section className="glass-panel rounded-[2rem] p-5">
              <p className="text-sm font-medium text-white">UI Style Guide</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-brand">Template</p>
                  <p className="mt-2 text-xl font-semibold text-white">{preview.template?.name}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{preview.template?.description}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-brand">Style Profile</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Preset: {selection.stylePreset}. Inspiration URL: {selection.templateUrl ?? "None provided"}.
                    Screenshot: {selection.screenshotName ?? "None uploaded"}.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-brand">Color system</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{preview.template?.colorSystem.join(", ")}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-brand">Key components</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{preview.template?.components.join(", ")}</p>
                </div>
              </div>
            </section>
            <FileTreeView apiNames={preview.apis.map((api) => api.name)} />
          </div>
          <CodePromptPanel prompt={preview.primaryIdea.codexPrompt} />
          <DeploymentChecklist warnings={preview.compatibility.warnings} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
