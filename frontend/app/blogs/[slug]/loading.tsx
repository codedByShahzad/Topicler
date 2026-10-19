/**
 * Loading skeleton for /blogs/[slug].
 *
 * The article page waits for the Solvix API before it can render. This
 * route-level loading boundary is shown immediately on navigation and is
 * replaced by the article when the data is ready. It mirrors page.tsx:
 * hero image with title block, the 8/12 article card (same padding and
 * reading width as the real article) and the 4/12 sidebar with the table of
 * contents, so the swap causes no layout jump.
 */

function Bar({ className = "" }: { className?: string }) {
  return <div className={`rounded-md bg-slate-200/70 ${className}`} />;
}

/** A paragraph's worth of text lines (h-4 bars on the article's 30px rhythm). */
function Paragraph({ lines }: { lines: string[] }) {
  return (
    <div className="space-y-3.5">
      {lines.map((w, i) => (
        <Bar key={i} className={`h-4 ${w}`} />
      ))}
    </div>
  );
}

export default function BlogArticleLoading() {
  return (
    <div className="relative min-h-[92vh] bg-gray-50" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading article…</span>

      <div aria-hidden="true" className="mx-auto max-w-360 px-3 py-4 motion-safe:animate-pulse sm:px-4 md:px-6 md:py-10">
        {/* Hero */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-sm">
          <div className="relative h-[420px] bg-slate-200 md:h-[520px]">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-300 via-slate-200/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-10">
              <div className="h-6 w-28 rounded-full bg-white/80" />
              <div className="mt-3 h-8 w-[min(100%,40rem)] rounded-lg bg-white/70 md:h-10" />
              <div className="mt-2 h-8 w-[min(70%,26rem)] rounded-lg bg-white/70 md:h-10" />
              <div className="mt-3 h-4 w-[min(100%,32rem)] rounded-md bg-white/60" />
              <div className="mt-4 flex gap-4">
                <div className="h-4 w-32 rounded-md bg-white/60" />
                <div className="h-4 w-20 rounded-md bg-white/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <section className="mt-6 md:mt-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm sm:p-7 md:p-10 lg:px-12">
                <div className="mx-auto max-w-[44rem] space-y-6">
                  <Paragraph lines={["w-full", "w-full", "w-11/12", "w-2/3"]} />
                  <Bar className="!mt-11 h-7 w-3/5" />
                  <Paragraph lines={["w-full", "w-full", "w-full", "w-4/5"]} />
                  <Paragraph lines={["w-full", "w-11/12", "w-1/2"]} />
                  <Bar className="!mt-11 h-7 w-1/2" />
                  <Paragraph lines={["w-full", "w-full", "w-5/6"]} />
                  <div className="space-y-3.5 pl-7">
                    <Bar className="h-4 w-3/4" />
                    <Bar className="h-4 w-2/3" />
                    <Bar className="h-4 w-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar / table of contents */}
            <aside className="hidden self-start lg:col-span-4 lg:block">
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Bar className="h-4 w-28" />
                    <Bar className="h-4 w-24" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Bar className="h-4 w-24" />
                    <Bar className="h-4 w-16" />
                  </div>
                </div>
                <Bar className="mt-6 h-4 w-32" />
                <div className="mt-3 space-y-2">
                  {["w-3/4", "w-2/3", "w-4/5", "w-1/2"].map((w, i) => (
                    <div key={i} className="flex h-[38px] items-center rounded-2xl border border-slate-200 bg-white/70 px-3">
                      <Bar className={`h-3.5 ${w}`} />
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}