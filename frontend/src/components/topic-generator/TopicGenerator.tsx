"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, Lightbulb, Loader2, RefreshCw, Sparkles } from "lucide-react";
import TopicCard from "./TopicCard";
import {
  MAX_INPUT_LENGTH,
  TOPIC_COUNT,
  validateTopicInput,
  type GenerateTopicsError,
  type GenerateTopicsResponse,
  type Topic,
} from "@/src/lib/topics";

const GENERIC_ERROR =
  "Something went wrong while generating your topics. Please try again.";

const EXAMPLES = ["AI tools for developers", "Home fitness", "Personal finance for students"];

type Status = "idle" | "loading" | "success" | "error";

export default function TopicGenerator() {
  const [input, setInput] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copyFailedIndex, setCopyFailedIndex] = useState<number | null>(null);

  const inFlight = useRef(false);
  const seenTitles = useRef<string[]>([]);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultsRef = useRef<HTMLElement>(null);

  const inputId = useId();
  const hintId = useId();
  const errorId = useId();

  const isLoading = status === "loading";

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  async function generate(query: string, isRegeneration: boolean) {
    if (inFlight.current) return; // block duplicate simultaneous requests

    const validationError = validateTopicInput(query);
    if (validationError) {
      setInputError(validationError);
      return;
    }

    const trimmed = query.trim();
    if (!isRegeneration) seenTitles.current = [];

    inFlight.current = true;
    setInputError(null);
    setError(null);
    setStatus("loading");
    setCopiedIndex(null);
    setCopyFailedIndex(null);

    // On small screens the results sit below the fold; bring them into view.
    if (window.matchMedia("(max-width: 767px)").matches) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    try {
      const res = await fetch("https://gemini-api-lime.vercel.app/api/generate-topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: trimmed,
          previousTitles: isRegeneration ? seenTitles.current : [],
        }),
      });

      const data = (await res.json().catch(() => null)) as
        | GenerateTopicsResponse
        | GenerateTopicsError
        | null;

      if (!res.ok || !data || !("topics" in data) || !Array.isArray(data.topics)) {
        const message = data && "error" in data ? data.error : GENERIC_ERROR;

        // Validation problems belong next to the input, not in the results area.
        if (res.status === 400) {
          setInputError(message);
          setStatus(topics.length > 0 ? "success" : "idle");
        } else {
          setError(message);
          setStatus("error");
        }
        return;
      }

      setTopics(data.topics);
      setLastQuery(trimmed);
      seenTitles.current = [...data.topics.map((t) => t.title), ...seenTitles.current].slice(0, 60);
      setStatus("success");
    } catch {
      setError(GENERIC_ERROR);
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isSameQuery = input.trim() === lastQuery && topics.length > 0;
    void generate(input, isSameQuery);
  }

  function handleRetry() {
    const query = lastQuery || input;
    void generate(query, query === lastQuery && topics.length > 0);
  }

  async function handleCopy(title: string, index: number) {
    if (copyTimer.current) clearTimeout(copyTimer.current);
    try {
      await navigator.clipboard.writeText(title);
      setCopyFailedIndex(null);
      setCopiedIndex(index);
    } catch {
      setCopiedIndex(null);
      setCopyFailedIndex(index);
    }
    copyTimer.current = setTimeout(() => {
      setCopiedIndex(null);
      setCopyFailedIndex(null);
    }, 2000);
  }

  const describedBy = [hintId, inputError ? errorId : null].filter(Boolean).join(" ");

  return (
    <div className="mx-auto max-w-[1440px] lg:grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]    lg:items-start lg:gap-10 lg:px-6">
      {/* Generate Ideas */}
      <section
        id="generate"
        aria-labelledby="generate-heading"
        className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:max-w-none lg:px-0"
      >
        <div className="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(23,23,23,0.04),0_12px_32px_-12px_rgba(234,88,12,0.18)] sm:p-8">
          <h2 id="generate-heading" className="text-xl font-semibold text-[#171717] sm:text-2xl">
            Generate Ideas
          </h2>
          <p className="mt-1.5 text-[#525252]">
            Enter an industry, niche, keyword, or idea to generate fresh topic opportunities.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-6">
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor={inputId} className="text-sm font-medium text-[#171717]">
                Industry or Niche
              </label>
              <span
                id={hintId}
                className={`text-xs tabular-nums ${
                  input.length > MAX_INPUT_LENGTH ? "text-red-700" : "text-[#525252]"
                }`}
              >
                <span className="sr-only">Characters used: </span>
                {input.length}/{MAX_INPUT_LENGTH}
              </span>
            </div>

            <input
              id={inputId}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (inputError) setInputError(null);
              }}
              placeholder="e.g. Digital marketing, AI tools, fitness, gaming..."
              maxLength={MAX_INPUT_LENGTH + 20}
              autoComplete="off"
              aria-invalid={inputError ? true : undefined}
              aria-describedby={describedBy}
              className={`mt-2 block min-h-14 w-full rounded-xl border bg-white px-4 text-base text-[#171717] placeholder:text-[#8A8A8A] transition-colors focus:outline-none focus-visible:ring-4 ${
                inputError
                  ? "border-red-400 focus-visible:ring-red-100"
                  : "border-[#E5E7EB] hover:border-[#D4D4D4] focus-visible:border-[#F97316] focus-visible:ring-[#FFEDD5]"
              }`}
            />

            {inputError && (
              <p id={errorId} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-700">
                <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                {inputError}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-sm text-[#525252]">Try:</span>
              {EXAMPLES.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => {
                    setInput(example);
                    setInputError(null);
                  }}
                  className="rounded-full border border-[#E5E7EB] px-3 py-1 text-sm text-[#525252] transition-colors hover:border-[#FDBA74] hover:bg-[#FFF7ED] hover:text-[#171717] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]"
                >
                  {example}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#EA580C] px-6 text-base font-semibold text-white transition-colors hover:bg-[#C2410C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Sparkles className="size-5" aria-hidden="true" />
                  Get Topic Ideas
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Topic Ideas */}
      <section
        ref={resultsRef}
        id="topic-ideas"
        aria-labelledby="ideas-heading"
        aria-busy={isLoading}
        className="mx-auto mt-16 w-full max-w-6xl scroll-mt-6 px-4 sm:px-6 lg:mt-0 lg:max-w-none lg:px-0 "
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="ideas-heading" className="text-2xl font-semibold text-[#171717] sm:text-3xl">
              Topic Ideas
            </h2>
            <p className="mt-1.5 text-[#525252]" aria-live="polite">
              {status === "loading" && "Brainstorming ideas…"}
              {status === "success" && (
                <>
                  {topics.length} ideas generated for{" "}
                  <span className="font-medium text-[#171717] [overflow-wrap:anywhere]">
                    “{lastQuery}”
                  </span>
                </>
              )}
              {(status === "idle" || status === "error") &&
                (topics.length > 0 && lastQuery
                  ? `Showing your last ${topics.length} ideas for “${lastQuery}”`
                  : "Your generated ideas will appear here.")}
            </p>
          </div>

          {topics.length > 0 && status !== "loading" && (
            <button
              type="button"
              onClick={() => void generate(lastQuery, true)}
              className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl border border-[#FDBA74] bg-[#FFF7ED] px-4 text-sm font-semibold text-[#C2410C] transition-colors hover:border-[#F97316] hover:bg-[#FFEDD5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316] sm:self-auto"
            >
              <RefreshCw className="size-4" aria-hidden="true" />
              Generate Again
            </button>
          )}
        </div>

        <div className="mt-6">
          {status === "error" && (
            <div
              role="alert"
              className="mb-6 flex flex-col items-start gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="flex items-start gap-2 text-sm text-red-800">
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {error ?? GENERIC_ERROR}
              </p>
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-red-800 ring-1 ring-red-200 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <RefreshCw className="size-4" aria-hidden="true" />
                Try Again
              </button>
            </div>
          )}

          {isLoading ? (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-1" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
                  <div className="flex gap-4">
                    <div className="h-4 w-5 rounded bg-[#FFEDD5] motion-safe:animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-11/12 rounded bg-[#F3F4F6] motion-safe:animate-pulse" />
                      <div className="h-4 w-2/3 rounded bg-[#F3F4F6] motion-safe:animate-pulse" />
                    </div>
                  </div>
                  <div className="mt-5 flex justify-between sm:pl-9">
                    <div className="h-6 w-24 rounded-full bg-[#FFF7ED] motion-safe:animate-pulse" />
                    <div className="h-9 w-20 rounded-lg bg-[#F3F4F6] motion-safe:animate-pulse" />
                  </div>
                </li>
              ))}
            </ul>
          ) : topics.length > 0 ? (
            <ol
  className="grid max-h-[620px] gap-4 overflow-y-auto pr-2 md:grid-cols-2 lg:grid-cols-1"
  aria-label={`${topics.length} topic ideas`}
>
  {topics.map((topic, index) => (
    <TopicCard
      key={`${topic.title}-${index}`}
      topic={topic}
      index={index}
      isCopied={copiedIndex === index}
      copyFailed={copyFailedIndex === index}
      onCopy={handleCopy}
    />
  ))}
</ol>
          ) : (
            status !== "error" && (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#FED7AA] bg-[#FFF7ED]/60 px-6 py-14 text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-white text-[#F97316] ring-1 ring-[#FED7AA]">
                  <Lightbulb className="size-6" aria-hidden="true" />
                </span>
                <p className="mt-4 font-medium text-[#171717]">No ideas yet</p>
                <p className="mt-1 max-w-sm text-sm text-[#525252]">
                  Enter a niche and we&apos;ll suggest {TOPIC_COUNT} topics across different formats and angles.
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}