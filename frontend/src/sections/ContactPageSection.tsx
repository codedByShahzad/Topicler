"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Mail,
  MessageSquare,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

const MESSAGE_LIMIT = 2000;
const CONTACT_EMAIL = "contact@topicler.com";

/* =========================================================
   CONTACT INFORMATION

   Three real answers to the three questions people actually
   have before writing: where does this go, when do I hear
   back, and what should I include.
========================================================= */

const contactCards = [
  {
    icon: Mail,
    title: "Where it goes",
    value: CONTACT_EMAIL,
    text: "Every message lands in one inbox, read by the person who builds Topicler.",
  },
  {
    icon: Clock3,
    title: "When you hear back",
    value: "24–48 hours",
    text: "Usually sooner. If something is broken, say so in the subject and it jumps the queue.",
  },
  {
    icon: ShieldCheck,
    title: "What to include",
    value: "Browser and steps",
    text: "For a bug, what you did and what happened. For an idea, what you were trying to do.",
  },
];

const nextSteps = [
  {
    number: "01",
    title: "You send the form",
    text: "It goes straight to the Topicler inbox — no ticketing system in between.",
  },
  {
    number: "02",
    title: "It gets read",
    text: "Every message is read by a person, not sorted by a bot.",
  },
  {
    number: "03",
    title: "You get a reply",
    text: "Usually within a day or two, to the address you enter below.",
  },
];

const topics = [
  "Something is broken",
  "An idea for a new tool",
  "Feedback on what exists",
  "Anything else",
];

/* =========================================================
   SECTION LABEL
========================================================= */

function SectionLabel({ title }: { title: string }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#FFD8C7] bg-[#FFF4EE] py-1.5 pl-2 pr-4">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
        <Sparkles className="h-3.5 w-3.5 text-[#C63D08]" />
      </span>

      <span className="text-[13px] font-semibold text-[#C63D08]">
        {title}
      </span>
    </div>
  );
}

/* =========================================================
   CONTACT PAGE
========================================================= */

export default function ContactPageSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  /*
    Honeypot. Bots fill every field they find; people never see this one.
    Kept out of formData so it can never be sent in the template params.
  */
  const [website, setWebsite] = useState("");

  const [status, setStatus] = useState<Status>("idle");

  const isSending = status === "sending";
  const isSuccess = status === "success";

  /* =========================================================
     EMAILJS CONFIG

     These values should exist in your .env.local:

     NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...

     The EmailJS public key is designed to be public, so this is not a
     credential leak. Do lock it down in the EmailJS dashboard by adding
     topicler.com to the allowed domains, or anyone can send through it.
  ========================================================= */

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear a previous error as soon as the person starts fixing things.
    if (status === "error") setStatus("idle");
  };

  /* =========================================================
     RESET
  ========================================================= */

  const resetFields = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    });
    setWebsite("");
  };

  const clearForm = () => {
    resetFields();
    setStatus("idle");
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot tripped — act as though it worked and send nothing.
    if (website.trim()) {
      resetFields();
      setStatus("success");
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      toast.error(
        "The email service is not configured. Please write to " +
          CONTACT_EMAIL +
          " directly."
      );
      return;
    }

    setStatus("sending");

    try {
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`.trim(),
        first_name: formData.firstName,
        last_name: formData.lastName,
        from_email: formData.email,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: CONTACT_EMAIL,
      };

      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey,
      });

      resetFields();
      setStatus("success");
      toast.success("Message sent. You will hear back within a day or two.");
    } catch (error: unknown) {
      console.error("Topicler contact form error:", error);

      let errorMessage =
        "That did not send. Please try again, or write to " +
        CONTACT_EMAIL +
        " directly.";

      if (error && typeof error === "object" && "text" in error) {
        errorMessage = String(
          (error as { text?: string }).text || errorMessage
        );
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setStatus("error");
      toast.error(errorMessage);
    }

    /*
      No `finally` block here on purpose. The previous version reset the
      status to "idle" in `finally`, which ran immediately after the success
      and error branches and wiped the state they had just set — so "success"
      and "error" never survived to a render.
    */
  };

  const inputClass =
    "h-14 w-full rounded-2xl border border-slate-200 bg-[#FCFCFD] px-4 text-sm text-[#0B1220] outline-none transition-[border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-slate-400 focus:border-[#FF5A14] focus:bg-white focus:ring-4 focus:ring-[#FF5A14]/[0.10]";

  return (
    <main className="overflow-hidden bg-white text-[#0B1220]">

      {/* =====================================================
          ANIMATION SYSTEM

          Matches the About page exactly so the two feel like one site.

            .tp-in*  page-load sequence for the hero
            .tp-rv*  scroll-linked reveal below the fold

          Smoothness comes from: translate3d keyframes (own compositor
          layer, no layout or paint), expo-out easing, short 14-20px
          travel, wide scroll ranges, and slow low-amplitude ambient loops.

          Stagger uses animation-range, not animation-delay — delays in
          seconds are ignored on a scroll timeline, which is why the
          inline animationDelay on the cards below never did anything.
      ===================================================== */}

      <style>{`
        @keyframes tpRise {
          from { opacity: 0; transform: translate3d(0, 16px, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes tpFadeUp {
          from { opacity: 0; transform: translate3d(0, 18px, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes tpFadeLeft {
          from { opacity: 0; transform: translate3d(-20px, 0, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes tpFadeRight {
          from { opacity: 0; transform: translate3d(20px, 0, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        @keyframes tpDrift {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50%      { transform: translate3d(0, -6px, 0); }
        }

        @keyframes tpGlow {
          0%, 100% { opacity: 0.40; transform: scale(1); }
          50%      { opacity: 0.55; transform: scale(1.04); }
        }

        @keyframes tpPop {
          from { opacity: 0; transform: translate3d(0, 10px, 0) scale(0.98); }
          to   { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
        }

        /* ---- Hero load sequence ---- */

        .tp-in {
          animation: tpRise 1s cubic-bezier(0.16, 1, 0.3, 1) both;
          backface-visibility: hidden;
        }

        .tp-in-1 { animation-delay: 0.06s; }
        .tp-in-2 { animation-delay: 0.18s; }
        .tp-in-3 { animation-delay: 0.30s; }
        .tp-in-4 { animation-delay: 0.42s; }

        /* ---- Scroll reveal ---- */

        .tp-rv,
        .tp-rv-l,
        .tp-rv-r {
          animation: tpFadeUp linear both;
          animation-timeline: view();
          animation-range: entry 5% cover 42%;
          backface-visibility: hidden;
        }

        .tp-rv-l { animation-name: tpFadeLeft; }
        .tp-rv-r { animation-name: tpFadeRight; }

        /* Stagger — declared after the base so it wins on equal specificity. */
        .tp-s1 { animation-range: entry 5% cover 48%; }
        .tp-s2 { animation-range: entry 5% cover 54%; }
        .tp-s3 { animation-range: entry 5% cover 60%; }

        @supports not (animation-timeline: view()) {
          .tp-rv,
          .tp-rv-l,
          .tp-rv-r {
            animation-duration: 0.95s;
            animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          }

          .tp-s1 { animation-delay: 0.10s; }
          .tp-s2 { animation-delay: 0.20s; }
          .tp-s3 { animation-delay: 0.30s; }
        }

        /* ---- Ambient + state ---- */

        .tp-drift { animation: tpDrift 10s ease-in-out infinite; }
        .tp-glow  { animation: tpGlow 16s ease-in-out infinite; }
        .tp-pop   { animation: tpPop 0.55s cubic-bezier(0.16, 1, 0.3, 1) both; }

        @media (prefers-reduced-motion: reduce) {
          .tp-in,
          .tp-rv,
          .tp-rv-l,
          .tp-rv-r,
          .tp-drift,
          .tp-glow,
          .tp-pop {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-[#FFE1D3] bg-[#FFF7F2]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(11,18,32,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,18,32,0.045) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div
          aria-hidden
          className="tp-glow pointer-events-none absolute -left-48 -top-48 h-[500px] w-[500px] rounded-full bg-[#FF5A14]/[0.08] blur-3xl"
        />

        <div className="relative mx-auto max-w-[1440px] px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">

            {/* ---------- Hero copy ---------- */}
            <div className="max-w-2xl">
              <div className="tp-in tp-in-1">
                <SectionLabel title="Contact Topicler" />
              </div>

              <h1 className="tp-in tp-in-2 text-4xl font-bold leading-[1.04] tracking-[-0.045em] text-[#0B1220] sm:text-5xl lg:text-[62px]">
                Write to a person, not a helpdesk.
              </h1>

              <p className="tp-in tp-in-3 mt-7 max-w-xl text-[16px] leading-8 text-slate-600 sm:text-[17px]">
                Topicler is a one-person project, so your message goes to the
                same inbox as everything else and gets read by the person who
                built the tools. Bugs, ideas, complaints — all welcome.
              </p>

              <div className="tp-in tp-in-4 mt-8 flex flex-wrap gap-4">
                <a
                  href="#contact-form"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5A14] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,90,20,0.16)] transition-[background-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-[#E94F0D] hover:shadow-[0_18px_40px_rgba(255,90,20,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A14] focus-visible:ring-offset-2"
                >
                  Write a message
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
                </a>

                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-[#0B1220] backdrop-blur-sm transition-[border-color,color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#FF5A14] hover:text-[#C63D08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A14] focus-visible:ring-offset-2"
                >
                  <Mail className="h-4 w-4" />
                  Email instead
                </a>
              </div>
            </div>

            {/* ---------- Hero visual: what actually happens ---------- */}
            <div className="tp-in tp-in-3 relative mx-auto w-full max-w-[720px]">
              <div className="relative rounded-[32px] border border-[#FFD9C8] bg-white p-7 shadow-[0_25px_70px_rgba(15,23,42,0.08)] sm:p-9">
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <h2 className="text-lg font-bold text-[#0B1220]">
                    What happens after you send
                  </h2>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFF1E9]">
                    <MessageSquare className="h-5 w-5 text-[#C63D08]" />
                  </div>
                </div>

                <ol className="mt-7 space-y-5">
                  {nextSteps.map((step) => (
                    <li key={step.number} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0B1220] text-[11px] font-bold text-white">
                        {step.number}
                      </span>

                      <div>
                        <p className="text-sm font-semibold text-[#0B1220]">
                          {step.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {step.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-7 flex items-center gap-3 rounded-2xl border border-[#FFDCCB] bg-[#FFF4EE] p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
                    <Mail className="h-4 w-4 text-[#C63D08]" />
                  </div>

                  <div className="min-w-0">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="block truncate text-sm font-semibold text-[#0B1220] underline-offset-2 transition-colors duration-300 hover:text-[#C63D08] hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Or skip the form entirely
                    </p>
                  </div>
                </div>
              </div>

              <div className="tp-drift absolute -bottom-5 -left-5 hidden rounded-2xl border border-[#FFD9C8] bg-white px-4 py-3 shadow-[0_15px_40px_rgba(15,23,42,0.10)] sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF1E9]">
                    <Clock3 className="h-4 w-4 text-[#C63D08]" />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#0B1220]">
                      24–48 hours
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Typical reply time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT DETAILS
      ===================================================== */}

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
          <div className="tp-rv mb-12 max-w-2xl">
            <SectionLabel title="Before you write" />

            <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-[#0B1220] sm:text-4xl">
              Three things worth knowing.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {contactCards.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`tp-rv tp-s${index + 1} group rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.04)] transition-[border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#FF5A14]/25 hover:shadow-[0_16px_42px_rgba(15,23,42,0.065)]`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1E9] text-[#C63D08] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-[#0B1220]">
                    {item.title}
                  </h3>

                  <p className="mt-2 break-words text-sm font-semibold text-[#C63D08]">
                    {item.value}
                  </p>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT FORM
      ===================================================== */}

      <section
        id="contact-form"
        className="relative overflow-hidden border-t border-slate-100 bg-[#F8F4EE] py-20 md:py-28"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(11,18,32,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,18,32,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div
          aria-hidden
          className="tp-glow pointer-events-none absolute -right-40 top-10 h-80 w-80 rounded-full bg-[#FF5A14]/[0.08] blur-3xl"
        />

        <div className="relative mx-auto max-w-[1440px] px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">

            {/* ---------- Intro ---------- */}
            <div className="tp-rv-l max-w-xl lg:sticky lg:top-28">
              <SectionLabel title="Send a message" />

              <h2 className="text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-[#0B1220] sm:text-4xl lg:text-5xl">
                Tell me what is on your mind.
              </h2>

              <p className="mt-6 text-[16px] leading-8 text-slate-600">
                No wrong reason to write. If something is broken a short
                description of what you did beats a long apology for bothering
                anyone.
              </p>

              <ul className="mt-8 space-y-3">
                {topics.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-600"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                      <Check className="h-3.5 w-3.5 text-[#C63D08]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm leading-7 text-slate-600">
                Looking for the tools instead?{" "}
                <Link
                  href="/tools/random-topic-generator/"
                  className="font-medium text-[#C63D08] underline underline-offset-2 transition-colors duration-300 hover:text-[#0B1220]"
                >
                  Random Topic Generator
                </Link>{" "}
                or the{" "}
                <Link
                  href="/blogs/"
                  className="font-medium text-[#C63D08] underline underline-offset-2 transition-colors duration-300 hover:text-[#0B1220]"
                >
                  blog
                </Link>
                .
              </p>
            </div>

            {/* ---------- Form ---------- */}
            <div className="tp-rv-r">
              <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_25px_70px_rgba(15,23,42,0.07)] sm:p-8 lg:p-10">

                {isSuccess ? (
                  /* ---------- Success panel ---------- */
                  <div className="tp-pop py-10 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ECFDF3]">
                      <CheckCircle2 className="h-7 w-7 text-[#0E9F6E]" />
                    </div>

                    <h3 className="mt-6 text-2xl font-bold tracking-[-0.02em] text-[#0B1220]">
                      Message sent
                    </h3>

                    <p className="mx-auto mt-3 max-w-[44ch] text-[15px] leading-7 text-slate-600">
                      It is in the inbox. You should get a reply within a day or
                      two — check spam if nothing arrives by then.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={clearForm}
                        className="inline-flex h-12 items-center justify-center rounded-full bg-[#FF5A14] px-7 text-sm font-semibold text-white transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-[#E94F0D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A14] focus-visible:ring-offset-2"
                      >
                        Send another message
                      </button>

                      <Link
                        href="/tools/random-topic-generator/"
                        className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 px-7 text-sm font-semibold text-[#0B1220] transition-[border-color,color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#FF5A14] hover:text-[#C63D08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A14] focus-visible:ring-offset-2"
                      >
                        Back to the generator
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* ---------- Form ---------- */
                  <form className="space-y-5" onSubmit={handleSubmit} noValidate={false}>

                    {/* Honeypot — hidden from people, visible to bots */}
                    <div
                      aria-hidden="true"
                      className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                    >
                      <label htmlFor="website">Leave this field empty</label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>

                    {/* Names */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-2 block text-sm font-semibold text-[#0B1220]"
                        >
                          First name
                        </label>

                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder="Your first name"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          autoComplete="given-name"
                          disabled={isSending}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="lastName"
                          className="mb-2 block text-sm font-semibold text-[#0B1220]"
                        >
                          Last name
                        </label>

                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="Your last name"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          autoComplete="family-name"
                          disabled={isSending}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Email / subject */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-semibold text-[#0B1220]"
                        >
                          Email address
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          inputMode="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          autoComplete="email"
                          disabled={isSending}
                          aria-describedby="email-help"
                          className={inputClass}
                        />

                        <p id="email-help" className="mt-2 text-xs text-slate-500">
                          The reply goes here.
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="mb-2 block text-sm font-semibold text-[#0B1220]"
                        >
                          Subject
                        </label>

                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="What is this about?"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          disabled={isSending}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <div className="mb-2 flex items-baseline justify-between gap-3">
                        <label
                          htmlFor="message"
                          className="block text-sm font-semibold text-[#0B1220]"
                        >
                          Message
                        </label>

                        <span
                          id="message-count"
                          className={`text-xs tabular-nums transition-colors duration-300 ${
                            formData.message.length > MESSAGE_LIMIT * 0.9
                              ? "text-[#C63D08]"
                              : "text-slate-400"
                          }`}
                        >
                          {formData.message.length} / {MESSAGE_LIMIT}
                        </span>
                      </div>

                      <textarea
                        id="message"
                        name="message"
                        rows={7}
                        maxLength={MESSAGE_LIMIT}
                        placeholder="What happened, what you expected, or what you would like to see."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={isSending}
                        aria-describedby="message-count"
                        className="w-full rounded-2xl border border-slate-200 bg-[#FCFCFD] px-4 py-4 text-sm leading-7 text-[#0B1220] outline-none transition-[border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-slate-400 focus:border-[#FF5A14] focus:bg-white focus:ring-4 focus:ring-[#FF5A14]/[0.10]"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                      <button
                        type="submit"
                        disabled={isSending}
                        className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FF5A14] px-7 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(255,90,20,0.15)] transition-[background-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-[#E94F0D] hover:shadow-[0_16px_34px_rgba(255,90,20,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A14] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                      >
                        {isSending ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Sending
                          </>
                        ) : (
                          <>
                            Send message
                            <Send className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={clearForm}
                        disabled={isSending}
                        className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-7 text-sm font-semibold text-[#0B1220] transition-[border-color,color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#FF5A14] hover:text-[#C63D08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A14] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                      >
                        Clear form
                      </button>
                    </div>

                    {/*
                      Screen readers get the status here. A toast alone is not
                      reliably announced, and it disappears after a few seconds.
                    */}
                    <p aria-live="polite" className="sr-only">
                      {isSending ? "Sending your message." : ""}
                      {status === "error"
                        ? "Your message did not send. Please try again."
                        : ""}
                    </p>

                    <p className="pt-1 text-xs leading-5 text-slate-400">
                      Your message goes to {CONTACT_EMAIL}. Nothing else is
                      collected and nothing is shared.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        closeButton={false}
      />
    </main>
  );
}