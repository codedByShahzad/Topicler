"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowRight, Mail, Check } from "lucide-react";

const NewsletterSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!serviceId || !templateId || !publicKey) {
      toast.error(
        "EmailJS environment variables are missing. Please add Service ID, Template ID, and Public Key."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        first_name: formData.name,
        subject: "Newsletter Subscription",
        message: `Please subscribe this email to the newsletter: ${formData.email}`,
        to_email: "contact@topicler.com",
      };

      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey,
      });

      clearForm();
      toast.success("Subscribed successfully.");
    } catch (error: unknown) {
      console.error("Newsletter subscription failed:", error);

      let message = "Failed to subscribe. Please try again.";

      if (error && typeof error === "object" && "text" in error) {
        message = String((error as { text?: string }).text || message);
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-center">
        {/* LEFT */}
        <div className="w-full lg:max-w-[55%]">
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

          <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-[#0B1220] md:text-5xl">
            Stay updated with insights that actually matter.
          </h2>

          <p className="mt-5 max-w-xl text-[16px] leading-7 text-slate-600">
            Get curated blog updates across key industries — delivered straight
            to your inbox.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Check className="h-4 w-4 text-[#FF5A14]" />
              Weekly curated content
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Check className="h-4 w-4 text-[#FF5A14]" />
              No spam, unsubscribe anytime
            </div>
          </div>

          <div className="mt-8 flex items-center gap-8 text-sm text-slate-500">
            <div>
              <span className="block text-xl font-semibold text-[#0B1220]">
                5K+
              </span>
              Readers
            </div>
            <div>
              <span className="block text-xl font-semibold text-[#0B1220]">
                10+
              </span>
              Categories
            </div>
            <div>
              <span className="block text-xl font-semibold text-[#0B1220]">
                Weekly
              </span>
              Updates
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full lg:max-w-[38%]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF5A14]/10">
              <Mail className="h-6 w-6 text-[#FF5A14]" />
            </div>

            <h3 className="text-2xl font-bold text-[#0B1220]">
              Join our newsletter
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Get the latest blog articles and insights.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-12 w-full rounded-full border border-slate-200 px-4 text-sm outline-none transition focus:border-[#FF5A14] focus:ring-4 focus:ring-[#FF5A14]/10"
              />

              <input
                name="email"
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12 w-full rounded-full border border-slate-200 px-4 text-sm outline-none transition focus:border-[#FF5A14] focus:ring-4 focus:ring-[#FF5A14]/10"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#FF5A14] text-sm font-semibold text-white transition hover:bg-[#e14d0c] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </form>

            <p className="mt-4 text-xs text-slate-500">
              No spam. Only useful insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;