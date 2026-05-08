import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-medium text-slate-100">API Remix Studio</p>
          <p>Mix APIs. Generate MVPs. Ship on Vercel.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/studio">Studio</Link>
          <Link href="/preview">Preview</Link>
          <Link href="/demo/travel-cost-planner">Travel Demo</Link>
          <a href="https://vercel.com/new" target="_blank" rel="noreferrer">
            Deploy
          </a>
        </div>
      </div>
    </footer>
  );
}
