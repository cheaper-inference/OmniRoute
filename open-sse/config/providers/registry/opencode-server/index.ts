import type { RegistryEntry } from "../../shared.ts";

// The opencode CLI's own headless server (`opencode serve`, see
// https://opencode.ai/docs/server/). The TUI is just a client of that server,
// which is why this is a first-class provider rather than a client-side tool.
//
// Unlike opencode-zen this is NOT an OpenAI-shaped HTTP API: the server speaks
// `POST /session` + `POST /session/:id/message` -> { info, parts[] }, with
// `GET /event` (SSE) for live parts. Probing /v1/chat/completions returns the
// web app's index.html with HTTP 200, so it can never be pointed at from a
// generic OpenAI-compatible node.
//
// baseUrl is the server address (not a /v1 path). The executor rewrites the
// incoming body into an opencode session turn and the reply back into OpenAI
// chat/Responses, so no operator-facing endpoint paths leak into the registry.
export const opencode_serverProvider: RegistryEntry = {
  id: "opencode-server",
  alias: "ocs",
  format: "openai",
  executor: "opencode-server",
  baseUrl: "http://127.0.0.1:4096",
  modelsUrl: "http://127.0.0.1:4096/config/providers",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 200_000,
  models: [
    // The free lineup is served through the opencode server's own catalog
    // (GET /config/providers), not through this list; these entries declare the
    // window/capability contract for the ids that are stable enough to pin.
    // Cost is 0 upstream (cost.input/cost.output), so they route as free tier.
    { id: "big-pickle", name: "Big Pickle", supportsReasoning: true, interleavedField: "reasoning_content" },
    { id: "space-bunny-free", name: "Space Bunny Free", supportsReasoning: true, contextLength: 1048576 },
    { id: "muse-spark-1.3-contributor-free", name: "Muse Spark 1.3 Contributor Free", supportsReasoning: true },
    { id: "nemotron-3-ultra-free", name: "Nemotron 3 Ultra Free", supportsReasoning: true, contextLength: 1000000 },
    { id: "mimo-v2.6-flash-free", name: "MiMo V2.6 Flash Free", supportsReasoning: true, contextLength: 1048576 },
    { id: "deepseek-v4.1-flash-free", name: "DeepSeek V4.1 Flash Free", supportsReasoning: true },
  ],
};