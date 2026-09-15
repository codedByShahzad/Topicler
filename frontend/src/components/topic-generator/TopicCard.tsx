"use client";

import { Check, Copy } from "lucide-react";
import type { Topic } from "@/src/lib/topics";

type TopicCardProps = {
  topic: Topic;
  index: number;
  isCopied: boolean;
  copyFailed: boolean;
  onCopy: (title: string, index: number) => void;
};

export default function TopicCard({
  topic,
  index,
  isCopied,
  copyFailed,
  onCopy,
}: TopicCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <li className="group flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-colors hover:border-[#FDBA74]">
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="shrink-0 text-sm font-semibold tabular-nums text-[#C2410C]"
        >
          {number}
        </span>
        <h3 className="min-w-0 flex-1 text-base font-semibold leading-snug text-[#171717] [overflow-wrap:anywhere]">
          <span className="sr-only">Idea {index + 1}: </span>
          {topic.title}
        </h3>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pl-0 sm:pl-8">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-[#FFF7ED] px-2.5 py-1 font-medium text-[#C2410C]">
            {topic.category}
          </span>
          <span className="text-[#525252]">{topic.angle}</span>
        </div>

        <button
          type="button"
          onClick={() => onCopy(topic.title, index)}
          aria-label={
            isCopied ? `Copied: ${topic.title}` : `Copy topic: ${topic.title}`
          }
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[#E5E7EB] px-3 text-sm font-medium text-[#525252] transition-colors hover:border-[#F97316] hover:text-[#C2410C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
        >
          {isCopied ? (
            <>
              <Check className="size-4 text-[#C2410C]" aria-hidden="true" />
              Copied
            </>
          ) : copyFailed ? (
            <>
              <Copy className="size-4" aria-hidden="true" />
              Copy failed
            </>
          ) : (
            <>
              <Copy className="size-4" aria-hidden="true" />
              Copy
            </>
          )}
        </button>
      </div>
    </li>
  );
}