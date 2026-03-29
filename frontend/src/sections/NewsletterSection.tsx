import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, CheckCircle2, TrendingUp, Newspaper, Sparkles } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-12 lg:px-8">
      <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-start">
        {/* LEFT CONTENT */}
        <div className="w-full lg:max-w-[58%]">
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <Image
                src="/images/sectionicon.svg"
                alt="section icon"
                width={25}
                height={25}
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5A14]">
                Newsletter
              </span>
            </div>

            <h2 className="mt-3 max-w-[760px] text-4xl font-bold leading-[1.08] tracking-tight text-[#0B1220] md:text-5xl">
              Stay updated with the latest insights, trends, and practical blog
              updates.
            </h2>

            <p className="mt-5 max-w-[760px] text-[17px] leading-8 text-slate-600">
              Get fresh articles from politics, finance, real estate,
              technology, digital marketing, home improvements, and more —
              straight to your inbox.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Weekly curated updates",
                "No spam, only quality content",
                "Modern insights that matter",
                "Unsubscribe anytime",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-[0_6px_18px_rgba(15,23,42,0.035)]"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#FF5A14]" />
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* extra content */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#FF5A14]/10">
                  <TrendingUp className="h-5 w-5 text-[#FF5A14]" />
                </div>
                <h3 className="text-base font-semibold text-[#0B1220]">
                  Fresh weekly insights
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Stay ahead with practical updates and trending topics from the
                  categories you care about.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#FF5A14]/10">
                  <Newspaper className="h-5 w-5 text-[#FF5A14]" />
                </div>
                <h3 className="text-base font-semibold text-[#0B1220]">
                  Curated blog digest
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  We send quality content, not noise — only useful articles,
                  guides, and editorial picks.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#FF5A14]/10">
                  <Sparkles className="h-5 w-5 text-[#FF5A14]" />
                </div>
                <h3 className="text-base font-semibold text-[#0B1220]">
                  Built for readers
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  A clean reading experience, thoughtful picks, and easy access
                  to the latest useful content.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex w-full justify-end lg:max-w-[38%]">
          <div className="w-full max-w-[560px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] sm:p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF5A14]/10">
                <Mail className="h-6 w-6 text-[#FF5A14]" />
              </div>

              <h3 className="text-2xl font-bold text-[#0B1220]">
                Join our newsletter
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Subscribe to receive the latest blog articles and curated
                updates.
              </p>

              <form className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="newsletter-name"
                    className="mb-2 block text-sm font-semibold text-[#0B1220]"
                  >
                    Name
                  </label>
                  <input
                    id="newsletter-name"
                    type="text"
                    placeholder="Enter your name"
                    className="h-12 w-full rounded-full border border-slate-200 bg-white px-4 text-sm text-[#0B1220] outline-none transition focus:border-[#FF5A14] focus:ring-4 focus:ring-[#FF5A14]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="newsletter-email"
                    className="mb-2 block text-sm font-semibold text-[#0B1220]"
                  >
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 w-full rounded-full border border-slate-200 bg-white px-4 text-sm text-[#0B1220] outline-none transition focus:border-[#FF5A14] focus:ring-4 focus:ring-[#FF5A14]/10"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#FF5A14] px-5 text-sm font-semibold text-white transition duration-300 hover:bg-[#e14d0c]"
                >
                  Subscribe Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>

              <p className="mt-4 text-xs leading-5 text-slate-500">
                By subscribing, you agree to receive email updates. No spam.
                Only useful insights and blog updates.
              </p>

              <div className="mt-5">
                <Link
                  href="/privacy-policy"
                  className="text-xs font-semibold text-[#FF5A14] transition hover:text-[#e14d0c]"
                >
                  Read our privacy policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;