---
title: "OpenCode Integration"
version: 3.8.40
lastUpdated: 2027-07-27
---

# OpenCode Integration

> **Status:** Generally available.
> **Audience:** Operators wiring OpenCode to an OmniRoute deployment.
> **Source of truth (config schema):** `src/shared/services/opencodeConfig.ts`
> **Recommended npm packages:** `@omniroute/opencode-plugin/` (OpenCode v1, installed by
> `omniroute setup opencode`) and `@omniroute/opencode-plugin-v2/` (OpenCode v2). The older
> `@omniroute/opencode-provider/` package is **deprecated** (see Path 2).

[OpenCode](https://opencode.ai) is an agentic CLI/desktop AI client. It reads its provider catalog from `~/.config/opencode/opencode.json` (or `opencode.jsonc`) and follows the schema at `https://opencode.ai/config.json`. OmniRoute exposes itself to OpenCode as one of those providers — every request flows through OmniRoute's standard OpenAI-compatible `/v1` surface, so OpenCode automatically benefits from Auto-Combo routing, circuit breakers, key policies, observability, etc.

This page documents the two static-config paths below; both generate the same config. For a
model list that follows your live catalog, use the plugin instead: `omniroute setup opencode`
installs `@omniroute/opencode-plugin` (OpenCode v1), and `@omniroute/opencode-plugin-v2` targets
OpenCode v2 (see [CLI integrations](../guides/CLI-INTEGRATIONS.md) and the
[OpenCode v2 plugin guide](../guides/OPENCODE-V2-PLUGIN.md)).

---

## Path 1 — CLI generator (no npm install)

Recommended for end users. Ships with OmniRoute. Writes `opencode.json` in place.

```bash
# After installing OmniRoute (npm i -g omniroute or local clone)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Behind the scenes the CLI calls `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), so an existing `opencode.json` keeps its other providers and comments. The OmniRoute entry is added/replaced atomically.

Resulting file (default model catalog):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<your-key>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## Path 2 — npm package `@omniroute/opencode-provider` (deprecated)

> **Deprecated.** The package writes a static model list that drifts behind your live
> OmniRoute catalog. Its README recommends migrating to `@omniroute/opencode-plugin`
> (or `@omniroute/opencode-plugin-v2` on OpenCode v2). The API below is kept for existing
> scripts only.

Used when scripting the config from Node/TS (CI pipelines, monorepos, custom installer flows).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Optional: override the model catalog exposed to OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

For a non-destructive merge against an existing file, replicate `mergeOpenCodeConfigText()` from `opencodeConfig.ts` or call the CLI generator.

See the [package README](../../@omniroute/opencode-provider/README.md) for the full API.

---

## What the runtime actually does

Both paths produce the same `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. At runtime, OpenCode loads `@ai-sdk/openai-compatible` (already a transitive dependency of OpenCode) and configures it with `baseURL` + `apiKey`. From there:

```
OpenCode UI/agent
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoute OpenAI surface)
         → OmniRoute /v1/chat/completions handler     (open-sse/handlers/chatCore.ts)
            → combo routing / Auto-Combo / executor
               → upstream provider
```

The plugin never touches HTTP. It only emits configuration.

---

## Model catalog defaults

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

You can override via `models: [...]`. Recommended additions:

- `"auto"` — surfaces OmniRoute's [Auto-Combo](../routing/AUTO-COMBO.md) zero-config router. Lets OpenCode pick "the best available model" without you hard-coding the catalog.
- `"<combo-name>"` — any combo you've defined in the dashboard; OmniRoute resolves it transparently.

---

## URL normalisation

The helper accepts both forms and emits exactly one `/v1`:

| Input                          | Output (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

This deduplication is **the most common breakage** seen in older configs. If you have an `opencode.json` from before v3.8.0 that points at `/v1/v1/...`, re-run the generator or call `createOmniRouteProvider` again.

---

## Authentication modes

| OmniRoute setting                           | Recommended `apiKey` value                         |
| ------------------------------------------- | -------------------------------------------------- |
| `REQUIRE_API_KEY=false` (default for local) | `sk_omniroute` (literal placeholder)               |
| `REQUIRE_API_KEY=true`                      | A real per-user API key from Dashboard → API Keys. |

For Anthropic-style clients that send `x-api-key` + `anthropic-version`, OmniRoute's `extractApiKey` also honours the key from `x-api-key`. OpenCode uses the OpenAI surface, so it'll always send `Authorization: Bearer ${apiKey}` — no Anthropic special-case applies here.

---

## Troubleshooting

| Symptom                                              | Cause                                                               | Fix                                                                                                  |
| ---------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `404` on every request with URL containing `/v1/v1/` | Stale config from pre-v3.8 plugin that double-suffixed `/v1`.       | Regenerate via Path 1 or 2.                                                                          |
| `401 Invalid API key`                                | OmniRoute has `REQUIRE_API_KEY=true` and the key is unknown.        | Create the key in the dashboard, or set `REQUIRE_API_KEY=false` (local only) and use `sk_omniroute`. |
| Model list empty in OpenCode UI                      | All 4 default models are hidden in OmniRoute's provider visibility. | Pass `models: ["auto", ...]` to surface ones you've enabled.                                         |
| OpenCode 500 with `cannot read property 'models'`    | Older OpenCode (< 0.1.x) didn't accept inline `models`.             | Upgrade OpenCode to a version that follows the v1 schema (`opencode.ai/config.json`).                |

---

## See also

- [API reference](../reference/API_REFERENCE.md) — full OmniRoute REST surface
- [Auto-Combo](../routing/AUTO-COMBO.md) — what `model: "auto"` means
- [`@omniroute/opencode-plugin` README](../../@omniroute/opencode-plugin/README.md) (recommended)
- [`@omniroute/opencode-plugin-v2` README](../../@omniroute/opencode-plugin-v2/README.md)
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md) (deprecated)
- Source: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
