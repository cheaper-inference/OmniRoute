import type { RegistryEntry } from "../../shared.ts";

export const groqProvider: RegistryEntry = {
  id: "groq",
  alias: "groq",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.groq.com/openai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    // Decommissioned on Groq for free/developer-tier keys (console.groq.com/docs/deprecations) and
    // therefore NOT listed: llama-4-maverick (2026-03-09), llama-4-scout and qwen3-32b
    // (2026-07-17), llama-3.3-70b-versatile (2026-08-16). Live discovery still lists whatever a
    // given key can reach. Guarded by tests/unit/groq-catalog-retired-models.test.ts.
    // Non-reasoning models: Groq returns HTTP 400 if reasoning_effort is sent (#3258, #12134) —
    // declare them here, since undeclared models default to reasoning-capable via the heuristic.
    { id: "groq/compound", name: "Groq Compound", supportsReasoning: false },
    { id: "allam-2-7b", name: "ALLaM 2 7B", supportsReasoning: false },
    { id: "openai/gpt-oss-120b", name: "GPT-OSS 120B" },
    { id: "openai/gpt-oss-20b", name: "GPT-OSS 20B" },
    { id: "qwen/qwen3.6-27b", name: "Qwen3.6 27B" },
    { id: "qwen/qwen3.8-27b", name: "Qwen3.8 27B" },
    { id: "openai/gpt-oss-safeguard-20b", name: "GPT-OSS Safeguard 20B" },
  ],
};
