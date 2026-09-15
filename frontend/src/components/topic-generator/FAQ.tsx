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
                  className={`size-5 shrink-0 text-[#F97316] transition-transform motion-reduce:transition-none ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 sm:px-6"
            >
              <p className="max-w-3xl leading-relaxed text-[#525252]">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}