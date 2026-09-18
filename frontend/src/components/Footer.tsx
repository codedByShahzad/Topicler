import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Mail,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const toolLinks = [
  {
    label: "Random Topic Generator",
    href: "/tools/random-topic-generator/",
  },
];

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Connect", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-[#fffaf7]">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-8">

        {/* CTA */}
        <div className="border-b border-slate-200 py-10 sm:py-12 lg:py-16">
          <div className="relative overflow-hidden rounded-[28px] border border-[#FFE1D2] bg-[#FFF4EE] px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
            
            {/* Decorative elements */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#FF5A14]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-40 w-40 rounded-full bg-[#FF5A14]/5 blur-3xl" />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFD5C2] bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#FF5A14]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Built for better ideas
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-[#0B1220] sm:text-3xl">
                  Turn a blank page into your next great idea.
                </h2>

                <p className="mt-3 max-w-xl text-[15px] leading-7 text-slate-600">
                  Discover useful tools designed to help you generate ideas,
                  explore topics, and create with more clarity.
                </p>
              </div>

              <Link
                href="/tools/random-topic-generator/"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#FF5A14] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e94f0d] hover:shadow-lg"
              >
                Try Random Topic Generator
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-10 sm:py-12 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

            {/* Brand */}
            <div className="max-w-md">
              <Link
                href="/"
                className="inline-flex items-center"
              >
                <Image
                  src="/images/logo.png"
                  alt="Topicler Logo"
                  width={180}
                  height={50}
                  className="h-11 w-auto object-contain"
                />
              </Link>

              <p className="mt-5 text-[15px] leading-7 text-slate-600">
                Topicler is a modern platform for discovering ideas, generating
                topics, and exploring useful tools built to make creating
                easier.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 shadow-sm">
                <WandSparkles className="h-3.5 w-3.5 text-[#FF5A14]" />
                Tools for creators & thinkers
              </div>
            </div>

            {/* Tools — Desktop only */}
            <div className="hidden lg:block">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1220]">
                Tools
              </h3>

              <ul className="mt-5 space-y-3">
                {toolLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-[15px] text-slate-600 transition-colors duration-200 hover:text-[#FF5A14]"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources — Desktop only */}
            <div className="hidden lg:block">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1220]">
                Resources
              </h3>

              <ul className="mt-5 space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-[15px] text-slate-600 transition-colors duration-200 hover:text-[#FF5A14]"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect — Desktop only */}
            <div className="hidden lg:block">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1220]">
                Connect
              </h3>

              <div className="mt-5">
                <a
                  href="mailto:hello@topicler.com"
                  className="group inline-flex items-center gap-3 text-[15px] text-slate-600 transition-colors duration-200 hover:text-[#FF5A14]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white transition-colors duration-200 group-hover:border-[#FFD5C2] group-hover:bg-[#FFF4EE]">
                    <Mail className="h-4 w-4 text-[#FF5A14]" />
                  </span>

                  <span>hello@topicler.com</span>
                </a>

                <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
                  Have a question, suggestion, or idea? We'd love to hear from
                  you.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="mt-10 border-t border-slate-200 pt-6 sm:mt-12 sm:pt-7">
            
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              
              <p className="text-sm text-slate-500">
                © 2026 Topicler by Soldevix Solutions. All rights reserved.
              </p>

              {/* Legal links — Desktop only */}
              <div className="hidden lg:flex flex-wrap items-center gap-x-5 gap-y-2">
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors duration-200 hover:text-[#FF5A14]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;