"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ArrowRight,
  Check,
  Clock3,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

/* =========================================================
   CONTACT INFORMATION
========================================================= */

const contactCards = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@topicler.com",
    text: "For general questions, feedback, suggestions, and support.",
  },
  {
    icon: MessageSquare,
    title: "Feedback",
    value: "Share your thoughts",
    text: "Tell us what you like, what can improve, or what you want to see.",
  },
  {
    icon: Clock3,
    title: "Response",
    value: "24–48 hours",
    text: "We aim to review and respond to messages as quickly as possible.",
  },
];

/* =========================================================
   SECTION LABEL
========================================================= */

function SectionLabel({ title }: { title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#FFD8C7] bg-[#FFF4EE]">
        <Sparkles className="h-4 w-4 text-[#FF5A14]" />
      </div>

      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF5A14] sm:text-[11px]">
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

  const [status, setStatus] = useState<Status>("idle");

  const isSending = status === "sending";

  /* =========================================================
     EMAILJS CONFIG
     
     These values should exist in your .env.local:
     
     NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
  ========================================================= */

  const serviceId =
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";

  const templateId =
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";

  const publicKey =
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     CLEAR FORM
  ========================================================= */

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    });

    setStatus("idle");
  };

  /* =========================================================
     SUBMIT FORM
  ========================================================= */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    /* -------------------------------------------------------
       Check EmailJS environment variables
    ------------------------------------------------------- */

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");

      toast.error(
        "Email service is not configured correctly. Please try again later."
      );

      return;
    }

    setStatus("sending");

    try {
      /* -----------------------------------------------------
         EmailJS template parameters

         IMPORTANT:
         All submitted messages are sent to:

         contact@topicler.com
      ----------------------------------------------------- */

      const templateParams = {
        from_name:
          `${formData.firstName} ${formData.lastName}`.trim(),

        first_name: formData.firstName,

        last_name: formData.lastName,

        from_email: formData.email,

        reply_to: formData.email,

        subject: formData.subject,

        message: formData.message,

        to_email: "contact@topicler.com",
      };

      /* -----------------------------------------------------
         Send email
      ----------------------------------------------------- */

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        {
          publicKey,
        }
      );

      /* -----------------------------------------------------
         Success
      ----------------------------------------------------- */

      clearForm();

      setStatus("success");

      toast.success(
        "Message sent successfully. We’ll get back to you soon."
      );
    } catch (error: unknown) {
      console.error(
        "Topicler contact form error:",
        error
      );

      let errorMessage =
        "Failed to send your message. Please try again.";

      if (
        error &&
        typeof error === "object" &&
        "text" in error
      ) {
        errorMessage =
          String(
            (error as { text?: string }).text ||
              errorMessage
          );
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setStatus("error");

      toast.error(errorMessage);
    } finally {
      setStatus("idle");
    }
  };

  return (
    <main className="overflow-hidden bg-white text-[#0B1220]">

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`
        @keyframes topiclerReveal {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes topiclerRevealLeft {
          from {
            opacity: 0;
            transform: translateX(-24px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes topiclerRevealRight {
          from {
            opacity: 0;
            transform: translateX(24px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes topiclerFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -8px, 0);
          }
        }

        @keyframes topiclerPulse {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(1);
          }

          50% {
            opacity: 0.55;
            transform: scale(1.08);
          }
        }

        .topicler-reveal {
          animation: topiclerReveal linear both;
          animation-timeline: view();
          animation-range: entry 0% cover 28%;
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

        .topicler-float {
          animation: topiclerFloat 6s ease-in-out infinite;
        }

        .topicler-pulse {
          animation: topiclerPulse 6s ease-in-out infinite;
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
          .topicler-reveal,
          .topicler-reveal-left,
          .topicler-reveal-right,
          .topicler-float,
          .topicler-pulse {
            animation: none !important;
          }
        }
      `}</style>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-[#FFE1D3] bg-[#FFF7F2]">

        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(11,18,32,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,18,32,0.045) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Soft orange glow */}
        <div className="topicler-pulse pointer-events-none absolute -left-48 -top-48 h-[500px] w-[500px] rounded-full bg-[#FF5A14]/[0.055] blur-3xl" />

        <div className="topicler-pulse pointer-events-none absolute -bottom-48 -right-40 h-[500px] w-[500px] rounded-full bg-[#FF5A14]/[0.045] blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-16 sm:py-20 lg:px-8 lg:py-24">

          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">

            {/* =================================================
                HERO TEXT
            ================================================= */}

            <div className="topicler-reveal-left max-w-2xl">

              <SectionLabel title="Contact Topicler" />

              <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.045em] text-[#0B1220] sm:text-5xl lg:text-[62px]">

                Have something
                <br />

                <span className="text-[#FF5A14]">
                  to say?
                </span>

              </h1>

              <p className="mt-7 max-w-xl text-[16px] leading-8 text-slate-600 sm:text-[17px]">
                Questions, suggestions, feedback, or just want
                to say hello? Send us a message and let us know
                what&apos;s on your mind.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm">
                  <Check className="h-3.5 w-3.5 text-[#FF5A14]" />
                  Simple communication
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm">
                  <Check className="h-3.5 w-3.5 text-[#FF5A14]" />
                  Real feedback
                </div>

              </div>

            </div>

            {/* =================================================
                HERO VISUAL
            ================================================= */}

            <div className="topicler-reveal-right relative mx-auto w-full max-w-[720px]">

              <div className="topicler-float pointer-events-none absolute -right-5 -top-5 h-24 w-24 rounded-full border border-[#FF5A14]/15" />

              <div className="relative rounded-[32px] border border-[#FFD9C8] bg-white p-7 shadow-[0_25px_70px_rgba(15,23,42,0.08)] sm:p-9">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF5A14]">
                      Topicler
                    </p>

                    <h2 className="mt-1 text-lg font-bold text-[#0B1220]">
                      Let&apos;s connect
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF1E9]">
                    <MessageSquare className="h-5 w-5 text-[#FF5A14]" />
                  </div>

                </div>

                {/* Message preview */}
                <div className="mt-7 space-y-4">

                  <div className="rounded-2xl bg-[#F8F9FB] p-4">

                    <div className="h-2.5 w-20 rounded-full bg-slate-200" />

                    <div className="mt-3 h-3 w-full rounded-full bg-slate-100" />

                    <div className="mt-2 h-3 w-[78%] rounded-full bg-slate-100" />

                  </div>

                  <div className="rounded-2xl border border-[#FFDCCB] bg-[#FFF4EE] p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
                        <Mail className="h-4 w-4 text-[#FF5A14]" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-[#0B1220]">
                          contact@topicler.com
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-500">
                          We&apos;re listening.
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

                {/* Bottom */}
                <div className="mt-7 flex items-center justify-between">

                  <span className="text-xs text-slate-400">
                    Usually replies within 24–48 hours
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF5A14] text-white">
                    <ArrowRight className="h-4 w-4" />
                  </div>

                </div>

              </div>

              {/* Floating accent */}
              <div className="topicler-float absolute -bottom-5 -left-5 rounded-2xl border border-[#FFD9C8] bg-white px-4 py-3 shadow-[0_15px_40px_rgba(15,23,42,0.10)]">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF1E9]">
                    <Sparkles className="h-4 w-4 text-[#FF5A14]" />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#0B1220]">
                      Your voice matters.
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-500">
                      Help us improve Topicler
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT METHODS
      ===================================================== */}

      <section className="py-20 md:py-24">

        <div className="mx-auto max-w-[1440px] px-5 lg:px-8">

          <div className="topicler-reveal mb-12 max-w-2xl">

            <SectionLabel title="Reach Out" />

            <h2 className="text-3xl font-bold leading-tight tracking-[-0.035em] text-[#0B1220] sm:text-4xl">
              Choose the easiest way to connect.
            </h2>

          </div>

          <div className="grid gap-5 md:grid-cols-3">

            {contactCards.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="topicler-reveal group rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#FF5A14]/35 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1E9] text-[#FF5A14] transition-transform duration-500 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-[#0B1220]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-[#FF5A14]">
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
        className="relative overflow-hidden bg-[#F8F4EE] py-20 md:py-28"
      >

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(11,18,32,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,18,32,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="topicler-pulse pointer-events-none absolute -right-40 top-10 h-80 w-80 rounded-full bg-[#FF5A14]/[0.06] blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-5 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">

            {/* =================================================
                FORM INTRO
            ================================================= */}

            <div className="topicler-reveal-left max-w-xl lg:sticky lg:top-28">

              <SectionLabel title="Send a Message" />

              <h2 className="text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-[#0B1220] sm:text-4xl lg:text-5xl">
                Tell us what&apos;s on your mind.
              </h2>

              <p className="mt-6 text-[16px] leading-8 text-slate-600">
                We read every message. Whether it&apos;s feedback
                about one of our tools, a suggestion for something
                new, or simply a question, feel free to reach out.
              </p>

              <div className="mt-8 space-y-3">

                {[
                  "Questions about Topicler",
                  "Suggestions for new tools",
                  "Feedback and improvements",
                  "General messages",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-600"
                  >

                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm">
                      <Check className="h-3.5 w-3.5 text-[#FF5A14]" />
                    </div>

                    {item}

                  </div>
                ))}

              </div>

            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <div className="topicler-reveal-right">

              <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_25px_70px_rgba(15,23,42,0.07)] sm:p-8 lg:p-10">

                <form
                  className="space-y-5"
                  onSubmit={handleSubmit}
                >

                  {/* =================================================
                      FIRST / LAST NAME
                  ================================================= */}

                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-2 block text-sm font-semibold text-[#0B1220]"
                      >
                        First Name
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
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-[#FCFCFD] px-4 text-sm text-[#0B1220] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#FF5A14] focus:bg-white focus:ring-4 focus:ring-[#FF5A14]/[0.08]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-2 block text-sm font-semibold text-[#0B1220]"
                      >
                        Last Name
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
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-[#FCFCFD] px-4 text-sm text-[#0B1220] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#FF5A14] focus:bg-white focus:ring-4 focus:ring-[#FF5A14]/[0.08]"
                      />
                    </div>

                  </div>

                  {/* =================================================
                      EMAIL / SUBJECT
                  ================================================= */}

                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-[#0B1220]"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-[#FCFCFD] px-4 text-sm text-[#0B1220] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#FF5A14] focus:bg-white focus:ring-4 focus:ring-[#FF5A14]/[0.08]"
                      />
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
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-[#FCFCFD] px-4 text-sm text-[#0B1220] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#FF5A14] focus:bg-white focus:ring-4 focus:ring-[#FF5A14]/[0.08]"
                      />
                    </div>

                  </div>

                  {/* =================================================
                      MESSAGE
                  ================================================= */}

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-[#0B1220]"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={7}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full resize-none rounded-2xl border border-slate-200 bg-[#FCFCFD] px-4 py-4 text-sm leading-7 text-[#0B1220] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#FF5A14] focus:bg-white focus:ring-4 focus:ring-[#FF5A14]/[0.08]"
                    />
                  </div>

                  {/* =================================================
                      BUTTONS
                  ================================================= */}

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">

                    <button
                      type="submit"
                      disabled={isSending}
                      className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FF5A14] px-7 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(255,90,20,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E94F0D] hover:shadow-[0_14px_30px_rgba(255,90,20,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSending ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message

                          <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={clearForm}
                      disabled={isSending}
                      className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-7 text-sm font-semibold text-[#0B1220] transition-all duration-300 hover:border-[#FF5A14] hover:text-[#FF5A14] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Clear Form
                    </button>

                  </div>

                  <p className="pt-1 text-xs leading-5 text-slate-400">
                    Your message will be sent securely to
                    contact@topicler.com.
                  </p>

                </form>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          TOAST CONTAINER
      ===================================================== */}

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