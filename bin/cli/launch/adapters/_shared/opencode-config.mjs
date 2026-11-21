// Shared OpenCode v1 config pieces (opencode v1 and its fork kilo).
// Pure: no fs, process or os reads.

import { toolCallModels } from "./inject.mjs";

/**
 * The provider options: the base URL, plus the env-referenced key unless keyless.
 * @param {string} baseUrl
 * @param {boolean} keyless
 */
export function openCodeOptions(baseUrl, keyless) {
  const options = { baseURL: baseUrl };
  if (!keyless) options.apiKey = "{env:OMNIROUTE_API_KEY}";
  return options;
}

/**
 * The leading v1 config fields: $schema, share, autoupdate, model and small_model.
 * @param {string} schema
 * @param {string} modelId
 */
export function openCodeV1Head(schema, modelId) {
  return {
    $schema: schema,
    share: "disabled",
    autoupdate: false,
    model: `omniroute/${modelId}`,
    small_model: `omniroute/${modelId}`,
  };
}

/**
 * The v1 `provider` block with the "omniroute" entry and its models map.
 * @param {{ baseURL: string, apiKey?: string }} options
 * @param {import("../../contract.d.ts").LaunchModelRow[]} rows
 */
export function openCodeV1Provider(options, rows) {
  return {
    omniroute: {
      npm: "@ai-sdk/openai-compatible",
      name: "OmniRoute",
      options,
      models: toolCallModels(rows),
    },
  };
}

/**
 * The warning for a user --model that is not an OmniRoute model, else null.
 * @param {{ value?: string | null } | null} flag a findFlag result
 * @returns {string | null}
 */
export function foreignModelWarning(flag) {
  if (!flag || typeof flag.value !== "string" || flag.value.startsWith("omniroute/")) return null;
  return (
    `--model ${flag.value} is not an OmniRoute model; that provider is not ` +
    "routed through OmniRoute"
  );
}
