// Shared types and limits used by both the API route and the client UI.
// Nothing secret lives here — this file is safe to import in the browser.

export type Topic = {
  title: string;
  category: string;
  angle: string;
};

export type GenerateTopicsResponse = {
  topics: Topic[];
};

export type GenerateTopicsError = {
  error: string;
};

export const TOPIC_COUNT = 20;
export const MIN_INPUT_LENGTH = 2;
export const MAX_INPUT_LENGTH = 200;

/** Returns an error message, or null when the input is usable. */
export function validateTopicInput(value: unknown): string | null {
  if (typeof value !== "string" || value.trim().length === 0) {
    return "Please enter an industry, niche, keyword, or idea.";
  }

  const trimmed = value.trim();

  if (trimmed.length < MIN_INPUT_LENGTH || !/[\p{L}\p{N}]/u.test(trimmed)) {
    return "Please enter a real word or phrase, like “home workouts” or “AI tools”.";
  }

  if (trimmed.length > MAX_INPUT_LENGTH) {
    return `Please keep your input under ${MAX_INPUT_LENGTH} characters.`;
  }

  return null;
}