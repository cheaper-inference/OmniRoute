export const COMBO_ENDPOINTS = [
  "chat",
  "search",
  "web-fetch",
  "embeddings",
  "rerank",
  "images",
  "image-edits",
  "videos",
  "music",
  "ocr",
  "audio-speech",
  "audio-transcriptions",
  "audio-translations",
  "audio-generation",
] as const;

export type ComboEndpoint = (typeof COMBO_ENDPOINTS)[number];

export const COMBO_NON_CHAT_STRATEGIES = [
  "priority",
  "fill-first",
  "round-robin",
  "weighted",
  "random",
  "strict-random",
  "least-used",
  "p2c",
] as const;
