"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export type FaqItem = {
  question: string;
  answer: string;
};

export default function FAQ({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-[#E5E7EB] rounded-2xl border border-[#E5E7EB] bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-[#171717] transition-colors hover:text-[#C2410C] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#F97316] sm:px-6 sm:py-5"
              >
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`size-5 shrink-0 text-[#F97316] transition-transform duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>

            {/* Height animates from 0fr to 1fr; visibility keeps closed answers out of tab order and screen readers */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`max-w-3xl px-5 pb-5 leading-relaxed text-[#525252] transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none sm:px-6 ${
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                  }`}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}