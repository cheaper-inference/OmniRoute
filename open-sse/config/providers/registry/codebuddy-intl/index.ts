import { CODEBUDDY_INTL_USER_AGENT } from "../../../providerHeaderProfiles.ts";
import type { RegistryEntry } from "../../shared.ts";

/**
 * CodeBuddy International (codebuddy.ai).
 *
 * Unified OpenAI-compatible gateway behind the CodeBuddy International service.
 * Carries live-probed models (GLM, Kimi, MiniMax, DeepSeek, Hunyuan, GPT, Gemini)
 * and reasons via OpenAI-style `reasoning_effort` (not vendor-native thinking shapes).
 * Streaming is forced by the executor because non-stream requests are rejected
 * with code 11101.
 *
 * Client profile: the gateway's channel verification keys on the **CLI** client
 * (`CLI/2.175.0`, `X-IDE-Type: CLI`, `X-Agent-*`), not the IDE. The executor
 * layers the rest of the captured profile on top of these base headers.
 *
 * Catalog: `GET /v3/config?repos[]=` is the authoritative, authenticated model
 * list; `open-sse/executors/codebuddy-intl/catalog.ts` merges it into this
 * curated list at runtime. This list is the offline fallback and the source of
 * the hand-written metadata (names, context windows, capabilities).
 *
 * Short alias "cbai" matches the reserved alias convention.
 */
export const codebuddy_intlProvider: RegistryEntry = {
  id: "codebuddy-intl",
  alias: "cbai",
  format: "openai",
  executor: "codebuddy-intl",
  // The gateway rejects a non-streaming upstream call (code 11101), and the CLI
  // body always sets `stream: true` (see codebuddy-intl/body.ts). Declaring it
  // here is what makes chatCore treat a forced SSE reply as EXPECTED for a
  // `stream: false` client: it drains the stream through the byte-capped SSE
  // reader instead of buffering it with `response.text()` and logging an
  // "Unexpected SSE response" warning on every non-streaming request.
  forceStream: true,
  baseUrl: "https://www.codebuddy.ai/v2/chat/completions",
  authType: "oauth",
  authHeader: "bearer",
  // The gateway's 429 states its own unlock instant in prose
  // ("...your usage will reset at YYYY-MM-DD HH:MM:SS"), which the shared body
  // parser already reads as UTC. Opt this provider in so that date freezes the
  // account instead of degrading to the 5s OAuth transient cooldown.
  // VERIFIED live 2026-10-26 against a real 429 capture.
  trustUpstreamResetDate: true,
  headers: {
    "User-Agent": CODEBUDDY_INTL_USER_AGENT,
    "X-Product": "SaaS",
    "X-IDE-Type": "CLI",
    "X-IDE-Name": "CLI",
    "X-IDE-Version": "2.175.0",
    "x-requested-with": "XMLHttpRequest",
    "x-codebuddy-request": "1",
  },
  models: [
    {
      id: "hy4-preview",
      name: "Hy4-Preview",
      contextLength: 256000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "hy3",
      name: "Hy3",
      contextLength: 192000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "gpt-6-astra",
      name: "GPT 6.0 Astra",
      contextLength: 1000000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gpt-6-luna",
      name: "GPT-6-Luna",
      contextLength: 1000000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gpt-6-sol",
      name: "GPT-6-Sol",
      contextLength: 1000000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gpt-6.1-sol",
      name: "GPT-6.1-Sol",
      contextLength: 1000000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gpt-5.6-sol",
      name: "GPT-5.6-Sol",
      contextLength: 512000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gpt-5.6-terra",
      name: "GPT-5.6-Terra",
      contextLength: 256000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gpt-5.6-luna",
      name: "GPT-5.6-Luna",
      contextLength: 256000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gpt-5.5",
      name: "GPT-5.5",
      contextLength: 256000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gpt-5.4",
      name: "GPT-5.4",
      contextLength: 256000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
    },
    {
      id: "gemini-3.8-flash",
      name: "Gemini-3.8-Flash",
      contextLength: 1000000,
      maxOutputTokens: 64000,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "glm-5.3",
      name: "GLM-5.3",
      contextLength: 1000000,
      maxOutputTokens: 48000,
      supportsReasoning: true,
    },
    {
      id: "glm-5.3-flash",
      name: "GLM-5.3-Flash",
      contextLength: 1000000,
      maxOutputTokens: 48000,
      supportsReasoning: true,
    },
    {
      id: "glm-5.2",
      name: "GLM-5.2",
      contextLength: 1000000,
      maxOutputTokens: 48000,
      supportsReasoning: true,
    },
    {
      id: "minimax-m3.1-flash",
      name: "MiniMax-M3.1-Flash",
      contextLength: 512000,
      maxOutputTokens: 48000,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "kimi-k3",
      name: "Kimi-K3",
      contextLength: 256000,
      maxOutputTokens: 32000,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "kimi-k3.1-pro",
      name: "Kimi-K3.1-Pro",
      contextLength: 256000,
      maxOutputTokens: 32000,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "kimi-k3.1-pro-highspeed",
      name: "Kimi-K3.1-Pro-Highspeed",
      contextLength: 256000,
      maxOutputTokens: 32000,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "grok-4.7",
      name: "Grok-4.7",
      contextLength: 256000,
      maxOutputTokens: 32000,
      supportsReasoning: true,
    },
    {
      id: "deepseek-v4.1-flash",
      name: "DeepSeek-V4.1-Flash",
      contextLength: 1000000,
      maxOutputTokens: 50000,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "deepseek-v4.1-flash-sg",
      name: "DeepSeek-V4.1-Flash-SG",
      contextLength: 1000000,
      maxOutputTokens: 50000,
      supportsReasoning: true,
      supportsVision: true,
    },
  ],
};

export default codebuddy_intlProvider;
