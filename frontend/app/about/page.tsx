import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Compass,
  Lightbulb,
  Sparkles,
  WandSparkles,
  Zap,
  Layers3,
} from "lucide-react";

export const metadata: Metadata = {
  metadataBase: new URL("https://topicler.com"),

  title: "About Topicler | Discover Better Ideas",

  description:
    "Learn more about Topicler, a modern platform built to help you discover ideas, generate topics, and explore useful tools.",

  keywords: [
    "Topicler",
    "Topicler tools",
    "topic generator",
    "random topic generator",
    "content ideas",
    "idea generator",
    "topic ideas",
    "content creation tools",
  ],

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "About Topicler | Discover Better Ideas",
    description:
      "Discover Topicler, a modern platform designed to make finding ideas and generating topics simple.",
    url: "https://topicler.com/about",
    siteName: "Topicler",
    images: [
      {
        url: "https://topicler.com/images/ogImage.png",
        width: 1200,
        height: 630,
        alt: "About Topicler",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About Topicler | Discover Better Ideas",
    description:
      "Discover Topicler, a modern platform for discovering ideas and useful tools.",
    images: ["https://topicler.com/images/ogImage.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* =========================================================
   DATA
========================================================= */

const features = [
  {
    icon: WandSparkles,
    number: "01",
    title: "Discover ideas",
    text: "Find fresh directions when you know what you want to explore but don't know where to begin.",
  },
  {
    icon: Compass,
    number: "02",
    title: "Explore freely",
    text: "Move through different possibilities and discover topics you may not have thought about.",
  },
  {
    icon: Layers3,
    number: "03",
    title: "Useful tools",
    text: "Focused tools designed around real problems instead of adding unnecessary complexity.",
  },
  {
    icon: Zap,
    number: "04",
    title: "Move faster",
    text: "Spend less time searching and more time doing something meaningful with the idea you found.",
  },
];

const steps = [
  {
    number: "01",
    title: "Start with something",
    text: "A keyword, subject, interest, or even a completely blank page.",
  },
  {
    number: "02",
    title: "Let Topicler explore",
    text: "Use our tools to generate possibilities and uncover new directions.",
  },
  {
    number: "03",
    title: "Take the idea further",
    text: "Choose what feels useful and turn that starting point into something real.",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#FFD8C7] bg-[#FFF4EE]">
        <Sparkles className="h-4 w-4 text-[#FF5A14]" />
      </div>

      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF5A14] sm:text-[11px]">
        {children}
      </span>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white text-[#0B1220]">

      {/* =====================================================
          GLOBAL ANIMATION SYSTEM
      ===================================================== */}

      <style>{`
        @keyframes topiclerFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -10px, 0);
          }
        }

        @keyframes topiclerFloatSide {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(8px, -8px, 0);
          }
        }

        @keyframes topiclerPulse {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(1);
          }

          50% {
            opacity: 0.65;
            transform: scale(1.08);
          }
        }

        @keyframes topiclerReveal {
          from {
            opacity: 0;
            transform: translateY(28px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes topiclerRevealLeft {
          from {
            opacity: 0;
            transform: translateX(-28px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes topiclerRevealRight {
          from {
            opacity: 0;
            transform: translateX(28px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .topicler-float {
          animation: topiclerFloat 5s ease-in-out infinite;
        }

        .topicler-float-side {
          animation: topiclerFloatSide 7s ease-in-out infinite;
        }

        .topicler-pulse {
          animation: topiclerPulse 6s ease-in-out infinite;
        }

        /*
          Scroll reveal
          Uses the browser's View Timeline when available.
          The fallback animation still gives a clean entrance
          on browsers that don't support scroll timelines.
        */

        .topicler-reveal {
          animation: topiclerReveal linear both;
          animation-timeline: view();
          animation-range: entry 0% cover 30%;
        }

        .topicler-reveal-left {
          animation: topiclerRevealLeft linear both;
          animation-timeline: view();
          animation-range: entry 0% cover 30%;
        }

        .topicler-reveal-right {
          animation: topiclerRevealRight linear both;
          animation-timeline: view();
          animation-range: entry 0% cover 30%;
        }

        .topicler-delay-1 {
          animation-delay: 0.08s;
        }

        .topicler-delay-2 {
          animation-delay: 0.16s;
        }

        .topicler-delay-3 {
          animation-delay: 0.24s;
        }

        .topicler-delay-4 {
          animation-delay: 0.32s;
        }

        @supports not (animation-timeline: view()) {
          .topicler-reveal,
          .topicler-reveal-left,
          .topicler-reveal-right {
            animation-duration: 0.7s;
            animation-fill-mode: both;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .topicler-float,
          .topicler-float-side,
          .topicler-pulse,
          .topicler-reveal,
          .topicler-reveal-left,
          .topicler-reveal-right {
            animation: none !important;
          }
        }
      `}</style>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-[#FFE1D3] bg-[#FFF7F2]">

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(11,18,32,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,18,32,0.045) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Ambient background */}
        <div className="topicler-pulse pointer-events-none absolute -left-48 -top-48 h-[520px] w-[520px] rounded-full bg-[#FF5A14]/10 blur-3xl" />

        <div className="topicler-float-side pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full bg-[#FF5A14]/[0.06] blur-3xl" />

        {/* Decorative circles */}
        <div className="topicler-float pointer-events-none absolute right-[9%] top-24 hidden h-24 w-24 rounded-full border border-[#FF5A14]/15 lg:block" />

        <div className="topicler-float-side pointer-events-none absolute bottom-12 left-[6%] hidden h-12 w-12 rounded-full border border-[#FF5A14]/15 lg:block" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-16 lg:px-8 lg:py-24">

          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">

            {/* =================================================
                HERO CONTENT
            ================================================= */}

            <div className="topicler-reveal-left max-w-3xl">

              <SectionLabel>About Topicler</SectionLabel>

              <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.045em] text-[#0B1220] sm:text-5xl lg:text-[64px]">

                Better ideas.
                <br />

                <span className="text-[#FF5A14]">
                  Less searching.
                </span>

              </h1>

              <p className="mt-7 max-w-2xl text-[16px] leading-8 text-slate-600 sm:text-[17px]">
                Topicler is a modern platform built to make discovering ideas
                easier. From finding a topic to exploring new possibilities,
                our tools help you move from a blank page to something useful.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <Link
                  href="/tools/random-topic-generator/"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5A14] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,90,20,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E94F0D] hover:shadow-[0_15px_35px_rgba(255,90,20,0.22)]"
                >
                  Try Random Topic Generator

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-[#0B1220] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF5A14] hover:text-[#FF5A14]"
                >
                  Explore Resources
                </Link>

              </div>
            </div>

            {/* =================================================
                HERO VISUAL
            ================================================= */}

            <div className="topicler-reveal-right relative mx-auto w-full max-w-[600px]">

              {/* Outer decorative ring */}
              <div className="topicler-float-side pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border border-[#FF5A14]/15" />

              {/* Main visual */}
              <div className="relative">

                <div className="relative rounded-[34px] border border-[#FFD8C6] bg-white p-3 shadow-[0_30px_80px_rgba(15,23,42,0.10)]">

                  <div className="relative overflow-hidden rounded-[27px] bg-[#0B1220] px-6 py-7 sm:px-8 sm:py-9">

                    {/* Glow */}
                    <div className="topicler-pulse pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FF5A14]/20 blur-3xl" />

                    <div className="relative">

                      {/* Top line */}
                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5A14]" />
                        </div>

                        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/35">
                          TOPICLER
                        </span>

                      </div>

                      {/* Main message */}
                      <div className="mt-10">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF5A14] text-white shadow-lg shadow-[#FF5A14]/20">
                          <Lightbulb className="h-6 w-6" />
                        </div>

                        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                          START WITH AN IDEA
                        </p>

                        <h2 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl">
                          What could you explore next?
                        </h2>

                      </div>

                      {/* Idea cards */}
                      <div className="mt-8 space-y-3">

                        <div className="topicler-float rounded-2xl border border-[#FF5A14]/25 bg-[#FF5A14]/10 px-4 py-4">
                          <div className="flex items-center gap-3">
                            <Sparkles className="h-4 w-4 shrink-0 text-[#FF8052]" />

                            <span className="text-sm font-medium text-white/90">
                              Technology & everyday life
                            </span>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4">
                          <div className="flex items-center gap-3">
                            <Sparkles className="h-4 w-4 shrink-0 text-white/30" />

                            <span className="text-sm text-white/60">
                              Creative ideas worth exploring
                            </span>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4">
                          <div className="flex items-center gap-3">
                            <Sparkles className="h-4 w-4 shrink-0 text-white/30" />

                            <span className="text-sm text-white/60">
                              Something completely new
                            </span>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>

                </div>

                {/* Floating mini card */}
                <div className="topicler-float absolute -bottom-6 -left-4 rounded-2xl border border-[#FFD9C8] bg-white px-4 py-3 shadow-[0_15px_40px_rgba(15,23,42,0.12)] sm:-left-8">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF1E9]">
                      <WandSparkles className="h-4 w-4 text-[#FF5A14]" />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[#0B1220]">
                        Idea found.
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        Keep exploring
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="relative py-20 md:py-28">

        <div className="mx-auto max-w-[1440px] px-5 lg:px-8">

          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            <div className="topicler-reveal-left">

              <SectionLabel>Why Topicler Exists</SectionLabel>

              <h2 className="max-w-xl text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-[#0B1220] sm:text-4xl lg:text-5xl">
                Sometimes the hardest part is simply knowing where to start.
              </h2>

            </div>

            <div className="topicler-reveal-right max-w-3xl">

              <p className="text-[16px] leading-8 text-slate-600 sm:text-[17px]">
                Whether you're creating something, learning something, or just
                looking for something interesting, getting started can be the
                hardest part.
              </p>

              <p className="mt-5 text-[16px] leading-8 text-slate-600 sm:text-[17px]">
                Topicler exists to make that first step easier. We build simple
                tools that help you discover possibilities without forcing you
                through complicated workflows.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                {["Simple", "Fast", "Useful", "Focused"].map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF5A14]/40 hover:shadow-md"
                  >
                    <Check className="h-3.5 w-3.5 text-[#FF5A14]" />
                    {item}
                  </div>
                ))}

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          FEATURE SECTION
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#F8F4EE] py-20 md:py-28">

        {/* Background decoration */}
        <div className="topicler-pulse pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-[#FF5A14]/[0.06] blur-3xl" />

        <div className="mx-auto max-w-[1440px] px-5 lg:px-8">

          <div className="topicler-reveal mx-auto mb-14 max-w-2xl text-center">

            <div className="flex justify-center">
              <SectionLabel>What We Build</SectionLabel>
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-[#0B1220] sm:text-4xl lg:text-5xl">
              Useful tools without the unnecessary stuff.
            </h2>

            <p className="mt-5 text-[16px] leading-7 text-slate-600">
              Topicler focuses on small, practical experiences that solve a
              clear problem and stay easy to use.
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.number}
                  className={`topicler-reveal topicler-delay-${index + 1} group rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#FF5A14]/35 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]`}
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1E9] text-[#FF5A14] transition-transform duration-500 group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="text-xs font-bold text-slate-300">
                      {feature.number}
                    </span>

                  </div>

                  <h3 className="mt-7 text-xl font-bold text-[#0B1220]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {feature.text}
                  </p>

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="py-20 md:py-28">

        <div className="mx-auto max-w-[1440px] px-5 lg:px-8">

          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">

            {/* Left */}
            <div className="topicler-reveal-left max-w-xl">

              <SectionLabel>How It Works</SectionLabel>

              <h2 className="text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-[#0B1220] sm:text-4xl lg:text-5xl">
                Start with an idea.
                <br />
                <span className="text-[#FF5A14]">
                  See where it goes.
                </span>
              </h2>

              <p className="mt-6 text-[16px] leading-8 text-slate-600">
                Topicler keeps the process simple. You don't need a perfect
                idea before you start.
              </p>

              <Link
                href="/tools/random-topic-generator/"
                className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#FF5A14]"
              >
                Try the Random Topic Generator

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

            </div>

            {/* Right */}
            <div className="topicler-reveal-right relative">

              {/* Connecting line */}
              <div className="absolute left-6 top-8 hidden h-[calc(100%-64px)] w-px bg-slate-200 sm:block" />

              <div className="space-y-4">

                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`topicler-reveal topicler-delay-${index + 1} group relative flex gap-5 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF5A14]/35 hover:shadow-lg sm:p-6`}
                  >

                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B1220] text-xs font-bold text-white transition-colors duration-300 group-hover:bg-[#FF5A14]">
                      {step.number}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#0B1220]">
                        {step.title}
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">
                        {step.text}
                      </p>
                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          DARK VISION SECTION
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#0B1220] py-20 text-white md:py-28">

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "58px 58px",
          }}
        />

        {/* Orange ambient glow */}
        <div className="topicler-pulse pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#FF5A14]/15 blur-3xl" />

        <div className="topicler-float-side pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#FF5A14]/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1050px] px-5 text-center lg:px-8">

          <div className="topicler-reveal">

            <div className="flex justify-center">
              <SectionLabel>Our Direction</SectionLabel>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
              Make discovering what&apos;s next{" "}
              <span className="text-[#FF7040]">
                easier.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-8 text-slate-300 sm:text-[17px]">
              Topicler is growing into a collection of focused tools designed
              to help people discover ideas, explore possibilities, and get
              useful things done with less friction.
            </p>

            <Link
              href="/tools/random-topic-generator/"
              className="group mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5A14] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E94F0D]"
            >
              Explore Topicler

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

          </div>

        </div>
      </section>



    </main>
  );
}