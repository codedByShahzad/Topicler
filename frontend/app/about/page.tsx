import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiBookOpen,
  FiCompass,
  FiGlobe,
  FiLayers,
} from "react-icons/fi";

const stats = [
  { id: 1, value: "500+", label: "Articles Published" },
  { id: 2, value: "20+", label: "Categories Covered" },
  { id: 3, value: "10k+", label: "Monthly Readers" },
  { id: 4, value: "100%", label: "Reader-First Focus" },
];

const pillars = [
  {
    id: 1,
    icon: FiBookOpen,
    title: "Useful Content",
    text: "We publish articles that help readers understand ideas clearly and without unnecessary complexity.",
  },
  {
    id: 2,
    icon: FiGlobe,
    title: "Wide Coverage",
    text: "From politics and finance to technology and home improvement, we cover topics people actually care about.",
  },
  {
    id: 3,
    icon: FiLayers,
    title: "Clean Experience",
    text: "Our platform is designed to feel modern, readable, and distraction-free across desktop and mobile devices.",
  },
  {
    id: 4,
    icon: FiCompass,
    title: "Thoughtful Direction",
    text: "We focus on content that informs, explains, and makes discovery easier for curious readers.",
  },
];

const topics = [
  "Politics",
  "Finance",
  "Real Estate",
  "Technology",
  "Digital Marketing",
  "Home Improvement",
  "Plumbing",
];

function SectionLabel({ title }: { title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <Image
        src="/images/sectionIcon.svg"
        alt="section icon"
        width={22}
        height={22}
      />
      <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FF5A14]">
        {title}
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-[#f8fafc] text-[#0B1220]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#fcfcfd]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,90,20,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.04),transparent_24%)]" />
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#FF5A14]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-slate-200/70 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-14 lg:px-8 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl">
              <SectionLabel title="About Topicler" />

              <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <Link href="/" className="transition hover:text-[#0B1220]">
                  Home
                </Link>
                <span>/</span>
                <span className="font-medium text-[#0B1220]">About</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-[#0B1220] md:text-5xl lg:text-6xl lg:leading-[1.02]">
                A Modern Blog For
                <span className="block text-[#FF5A14]">
                  Useful Ideas & Smart Reading
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-[16px] leading-8 text-slate-600 md:text-[17px]">
                Topicler is a modern content platform built to make exploring
                ideas easier. We publish informative, readable, and organized
                articles across categories that matter to everyday readers.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/blog"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5A14] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e85110]"
                >
                  Explore Articles
                  <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/categories"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] transition-all duration-300 hover:border-[#FF5A14] hover:text-[#FF5A14]"
                >
                  Browse Categories
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[30px] border-2 border-transparent bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-[#FF5A14] hover:shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
                <img
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80"
                  alt="Modern blog workspace"
                  className="block h-[320px] w-full object-cover md:h-[520px]"
                />
              </div>

              <div className="absolute left-5 top-5 rounded-2xl bg-white/90 px-5 py-4 shadow-xl backdrop-blur-md">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5A14]">
                  Editorial Vision
                </div>
                <p className="mt-2 max-w-[220px] text-sm leading-6 text-slate-600">
                  Clear ideas, curated topics, and a reading experience that
                  feels modern and intuitive.
                </p>
              </div>

              <div className="absolute bottom-5 right-5 rounded-2xl bg-[#FF5A14] px-5 py-4 text-white shadow-xl">
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/80">
                  Blog Platform
                </div>
                <div className="mt-1 text-lg font-bold">
                  Clean. Useful. Modern.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-5">
                <div className="relative h-[420px] overflow-hidden rounded-[28px] border-2 border-transparent shadow-sm transition-all duration-300 hover:border-[#FF5A14] hover:shadow-lg md:h-[520px]">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
                    alt="People reading and researching"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                <div className="relative mt-10 h-[420px] overflow-hidden rounded-[28px] border-2 border-transparent shadow-sm transition-all duration-300 hover:border-[#FF5A14] hover:shadow-lg md:h-[520px]">
                  <img
                    src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80"
                    alt="Writing and editorial work"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 z-10 w-[270px] -translate-x-1/2 rounded-[24px] bg-white/95 p-5 shadow-[0_15px_50px_rgba(15,23,42,0.12)] backdrop-blur-md md:w-[320px]">
                <h3 className="text-2xl font-bold text-[#0B1220] md:text-4xl">
                  Reader Focused
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 md:text-[15px]">
                  Built to make discovering ideas simple, enjoyable, and easy to
                  navigate.
                </p>
              </div>
            </div>

            <div>
              <SectionLabel title="Who We Are" />

              <h2 className="text-3xl font-bold tracking-tight text-[#0B1220] md:text-4xl lg:text-5xl">
                A content destination built to inform, simplify, and inspire.
              </h2>

              <p className="mt-6 text-[16px] leading-8 text-slate-600">
                Topicler brings together articles across multiple categories in a
                clean, structured, and enjoyable format. Instead of cluttered
                pages and overwhelming layouts, we focus on strong readability,
                simple navigation, and thoughtful presentation.
              </p>

              <p className="mt-5 text-[16px] leading-8 text-slate-600">
                Whether readers are exploring politics, finance, real estate,
                technology, or practical lifestyle topics, our goal is to make
                each visit feel useful and worth their time.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Clear and readable article layouts",
                  "Well-organized blog categories",
                  "Modern browsing experience",
                  "Useful topics for everyday readers",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border-2 border-transparent bg-white px-4 py-4 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 hover:border-[#FF5A14] hover:shadow-md"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-slate-200 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <SectionLabel title="Our Platform" />

            <h2 className="text-3xl font-bold tracking-tight text-[#0B1220] md:text-4xl">
              Built around consistency, readability, and quality content.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.id}
                className="rounded-[24px] border-2 border-transparent bg-[#fcfcfd] p-6 transition-all duration-300 hover:border-[#FF5A14] hover:shadow-lg"
              >
                <div className="text-3xl font-bold text-[#0B1220]">
                  {item.value}
                </div>
                <div className="mt-2 text-sm text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <SectionLabel title="What We Stand For" />

            <h2 className="text-3xl font-bold tracking-tight text-[#0B1220] md:text-4xl lg:text-5xl">
              The principles behind our editorial approach.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="rounded-[24px] border-2 border-transparent bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#FF5A14] hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF5A14]/10 text-[#FF5A14]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-[#0B1220]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TOPICS STRIP */}
      <section className="relative overflow-hidden border-y border-slate-200 bg-[#0B1220] py-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,90,20,0.14),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_26%)]" />

        <div className="relative mx-auto max-w-[1440px] px-5 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <SectionLabel title="Categories We Cover" />

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Diverse topics, one clean reading experience.
            </h2>
            <p className="mt-5 text-[16px] leading-8 text-slate-300">
              Topicler brings together a range of categories so readers can move
              from one interest to another without losing clarity or structure.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
            {topics.map((topic) => (
              <div
                key={topic}
                className="rounded-[20px] border-2 border-transparent bg-white/5 px-5 py-5 text-center text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-[#FF5A14] hover:bg-white/10"
              >
                {topic}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
          <div className="grid gap-8 rounded-[32px] border-2 border-transparent bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-[#FF5A14] hover:shadow-[0_24px_80px_rgba(15,23,42,0.10)] lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
            <div className="max-w-3xl">
              <SectionLabel title="Keep Exploring" />

              <h2 className="text-3xl font-bold tracking-tight text-[#0B1220] md:text-4xl lg:text-5xl">
                Discover more stories, insights, and ideas.
              </h2>

              <p className="mt-5 text-[16px] leading-8 text-slate-600">
                Browse our latest posts and category pages to keep exploring
                useful content across a wide range of topics.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/blog"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5A14] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e85110]"
              >
                Read Articles
                <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/categories"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-[#0B1220] transition-all duration-300 hover:border-[#FF5A14] hover:text-[#FF5A14]"
              >
                View Categories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}