import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiClock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";

const contactCards = [
  {
    id: 1,
    icon: FiMail,
    title: "Email Address",
    value: "hello@topicler.com",
    subtext: "Send us your questions anytime",
  },
  {
    id: 2,
    icon: FiPhone,
    title: "Phone Number",
    value: "+1 (234) 567-890",
    subtext: "Mon - Fri from 9:00 AM to 6:00 PM",
  },
  {
    id: 3,
    icon: FiMapPin,
    title: "Office Location",
    value: "New York, United States",
    subtext: "Available for online communication",
  },
  {
    id: 4,
    icon: FiClock,
    title: "Working Hours",
    value: "Mon - Fri / 9AM - 6PM",
    subtext: "Weekend responses may take longer",
  },
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

export default function ContactPage() {
  return (
    <main className="bg-[#f8fafc] text-[#0B1220]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#fcfcfd]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,90,20,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.04),transparent_24%)]" />
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#FF5A14]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-slate-200/70 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-14 lg:px-8 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-3xl">
              <SectionLabel title="Contact Us" />

              <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <Link href="/" className="transition hover:text-[#0B1220]">
                  Home
                </Link>
                <span>/</span>
                <span className="font-medium text-[#0B1220]">Contact</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-[#0B1220] md:text-5xl lg:text-6xl lg:leading-[1.02]">
                Let’s Start a
                <span className="block text-[#FF5A14]">Conversation</span>
              </h1>

              <p className="mt-6 max-w-2xl text-[16px] leading-8 text-slate-600 md:text-[17px]">
                Have a question, feedback, partnership idea, or just want to get
                in touch? We’d love to hear from you. Reach out through the form
                below or use our direct contact details.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="#contact-form"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5A14] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e85110]"
                >
                  Send a Message
                  <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] transition-all duration-300 hover:border-[#FF5A14] hover:text-[#FF5A14]"
                >
                  Explore Articles
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-2 hover:border-[#FF5A14]">
                <img
                  src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1400&q=80"
                  alt="Contact workspace"
                  className="block h-[320px] w-full object-cover md:h-[520px]"
                />
              </div>

              <div className="absolute left-5 top-5 rounded-2xl bg-white/90 px-5 py-4 shadow-xl backdrop-blur-md">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF5A14]">
                  Get In Touch
                </div>
                <p className="mt-2 max-w-[220px] text-sm leading-6 text-slate-600">
                  We’re always open to hearing your ideas, questions, and
                  feedback.
                </p>
              </div>

              <div className="absolute bottom-5 right-5 rounded-2xl bg-[#FF5A14] px-5 py-4 text-white shadow-xl">
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/80">
                  Contact Page
                </div>
                <div className="mt-1 text-lg font-bold">Simple. Clear. Helpful.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <SectionLabel title="Reach Out" />
            <h2 className="text-3xl font-bold tracking-tight text-[#0B1220] md:text-4xl">
              Multiple ways to connect with us.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {contactCards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-2 hover:border-[#FF5A14] hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF5A14]/10 text-[#FF5A14]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-[#0B1220]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base font-medium text-[#0B1220]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.subtext}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section id="contact-form" className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            {/* LEFT */}
            <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-2 hover:border-[#FF5A14] lg:p-10">
              <SectionLabel title="Contact Information" />

              <h2 className="text-3xl font-bold tracking-tight text-[#0B1220] md:text-4xl">
                We’d love to hear from you.
              </h2>

              <p className="mt-5 text-[16px] leading-8 text-slate-600">
                Whether you want to share feedback, ask a question, discuss
                collaboration, or simply connect, our team is here to help.
              </p>

              <div className="mt-8 space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-[#fcfcfd] p-5 transition-all duration-300 hover:border-2 hover:border-[#FF5A14]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF5A14]/10 text-[#FF5A14]">
                      <FiMail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0B1220]">Email Us</h3>
                      <p className="mt-1 text-sm text-slate-600">
                        hello@topicler.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-[#fcfcfd] p-5 transition-all duration-300 hover:border-2 hover:border-[#FF5A14]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF5A14]/10 text-[#FF5A14]">
                      <FiPhone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0B1220]">Call Us</h3>
                      <p className="mt-1 text-sm text-slate-600">
                        +1 (234) 567-890
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-[#fcfcfd] p-5 transition-all duration-300 hover:border-2 hover:border-[#FF5A14]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF5A14]/10 text-[#FF5A14]">
                      <FiClock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0B1220]">
                        Office Hours
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        Monday to Friday, 9:00 AM to 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-2 hover:border-[#FF5A14] lg:p-10">
              <SectionLabel title="Send Message" />

              <h2 className="text-3xl font-bold tracking-tight text-[#0B1220] md:text-4xl">
                Fill out the form below.
              </h2>

              <p className="mt-5 text-[16px] leading-8 text-slate-600">
                We’ll review your message and get back to you as soon as
                possible.
              </p>

              <form className="mt-8 space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#0B1220]">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-[#fcfcfd] px-4 text-sm text-[#0B1220] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#FF5A14]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#0B1220]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-[#fcfcfd] px-4 text-sm text-[#0B1220] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#FF5A14]"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#0B1220]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-[#fcfcfd] px-4 text-sm text-[#0B1220] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#FF5A14]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#0B1220]">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Enter subject"
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-[#fcfcfd] px-4 text-sm text-[#0B1220] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#FF5A14]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#0B1220]">
                    Message
                  </label>
                  <textarea
                    rows={7}
                    placeholder="Write your message here..."
                    className="w-full rounded-2xl border border-slate-200 bg-[#fcfcfd] px-4 py-4 text-sm text-[#0B1220] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#FF5A14]"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5A14] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e85110]"
                >
                  Send Message
                  <FiSend className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* MAP / EXTRA CTA */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-2 hover:border-[#FF5A14]">
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="p-8 lg:p-12">
                <SectionLabel title="Stay Connected" />

                <h2 className="text-3xl font-bold tracking-tight text-[#0B1220] md:text-4xl lg:text-5xl">
                  Let’s keep the conversation going.
                </h2>

                <p className="mt-5 max-w-2xl text-[16px] leading-8 text-slate-600">
                  We value meaningful communication and are always happy to hear
                  from readers, partners, and collaborators.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/blog"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5A14] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e85110]"
                  >
                    Read Articles
                    <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-[#0B1220] transition-all duration-300 hover:border-[#FF5A14] hover:text-[#FF5A14]"
                  >
                    Learn About Us
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[320px] lg:min-h-full">
                <img
                  src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80"
                  alt="Contact and communication"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}