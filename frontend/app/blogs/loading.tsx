/**
 * Loading skeleton for /blogs.
 *
 * app/blogs/page.tsx waits for the Solvix API before it can render, so
 * without this file Next.js keeps the previous page on screen ("frozen")
 * until the response arrives. This file is the route's loading boundary:
 * it is shown immediately on navigation and replaced by BlogListClient as
 * soon as the data is ready. It mirrors BlogListClient's layout (masthead,
 * category bar, featured article, card grid) so the swap causes no jump.
 */

function Bar({ className = "" }: { className?: string }) {
  return <div className={`rounded-md bg-slate-200/70 ${className}`} />;
}

function CardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-[#E8EBF0] bg-white">
      <div className="aspect-[16/10] w-full bg-[#FFF4EE]" />
      <div className="flex flex-1 flex-col p-5">
        <Bar className="h-5 w-20 rounded-full" />
        <Bar className="mt-4 h-5 w-full" />
        <Bar className="mt-2 h-5 w-3/4" />
        <Bar className="mt-4 h-4 w-full" />
        <Bar className="mt-2 h-4 w-5/6" />
        <Bar className="mt-5 h-4 w-32" />
      </div>
    </div>
  );
}

export default function BlogsLoading() {
  return (
    <div className="min-h-[92vh] bg-white" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Loading articles…</span>

      <div aria-hidden="true" className="motion-safe:animate-pulse">
        {/* Masthead */}
        <header className="border-b border-[#E8EBF0] bg-[#FFF4EE]">
          <div className="relative mx-auto max-w-360 px-5 py-6 text-center sm:py-20 lg:px-8 lg:py-14">
            <div className="flex justify-center">
              <div className="h-9 w-[52px] rounded-full border border-[#FFD5C2] bg-white/80" />
            </div>
            <div className="mx-auto mt-4 h-10 w-[min(100%,30rem)] rounded-xl bg-[#FFE3D5] sm:h-12 lg:h-[62px] lg:w-[min(100%,36rem)]" />
            {/* two lines on the description's line height (leading-7 / sm:leading-8) */}
            <div className="mx-auto mt-5 flex max-w-2xl flex-col items-center">
              <div className="flex h-7 w-full items-center justify-center sm:h-8">
                <div className="h-4 w-[min(100%,36rem)] rounded-md bg-[#FFE3D5]" />
              </div>
              <div className="flex h-7 w-full items-center justify-center sm:h-8">
                <div className="h-4 w-[min(90%,26rem)] rounded-md bg-[#FFE3D5]" />
              </div>
            </div>
          </div>
        </header>

        {/* Category filters */}
        <div className="border-b border-[#E8EBF0] bg-white">
          <div className="mx-auto flex max-w-360 items-center gap-4 px-5 py-3.5 lg:px-8">
            <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
              {["w-14", "w-24", "w-28", "w-20", "w-24"].map((w, i) => (
                <div key={i} className={`h-[38px] shrink-0 rounded-full border border-[#E8EBF0] bg-slate-100 ${w}`} />
              ))}
            </div>
            <Bar className="hidden h-4 w-14 shrink-0 sm:block" />
          </div>
        </div>

        <main className="mx-auto max-w-360 px-5 py-12 lg:px-8 lg:py-16">
          {/* Featured article */}
          <section className="mb-14 lg:mb-20">
            <Bar className="mb-2 h-8 w-44 lg:mb-6" />
            <div className="grid overflow-hidden rounded-xl border border-[#E8EBF0] bg-white lg:grid-cols-[1.15fr_1fr]">
              <div className="aspect-[16/10] w-full bg-[#FFF4EE] lg:aspect-auto lg:min-h-[420px]" />
              <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-16 rounded-full bg-[#FFF4EE]" />
                  <Bar className="h-4 w-20" />
                </div>
                <Bar className="mt-5 h-8 w-full sm:h-10 lg:h-12" />
                <Bar className="mt-3 h-8 w-2/3 sm:h-10 lg:h-12" />
                <Bar className="mt-5 h-4 w-full max-w-[60ch]" />
                <Bar className="mt-3 h-4 w-4/5 max-w-[60ch]" />
                <Bar className="mt-7 h-4 w-44" />
                <div className="mt-7 h-11 w-40 rounded-full bg-slate-200/70" />
              </div>
            </div>
          </section>

          {/* Article grid */}
          <section>
            <Bar className="h-8 w-48" />
            <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}