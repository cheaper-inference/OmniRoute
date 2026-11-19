---
title: "VS Code Copilot Chat — OmniCopilot extension"
version: 3.8.55
lastUpdated: 2026-11-17
---

# VS Code Copilot Chat — OmniCopilot extension

**OmniCopilot** adds your OmniRoute chat models and combos to the native Copilot Chat
model picker. Use the editor's existing chat and agent workflows, with tool calling
and vision when supported by the selected model.

|                        |                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Install (VS Code)**  | [Marketplace → `diegosouzapw.omnicopilot`](https://marketplace.visualstudio.com/items?itemName=diegosouzapw.omnicopilot)        |
| **Install (Open VSX)** | [Open VSX](https://open-vsx.org/extension/diegosouzapw/omnicopilot) — requires compatible language-model provider and chat APIs |
| **Source / issues**    | [github.com/cheaper-inference/OmniCopilot](https://github.com/cheaper-inference/OmniCopilot) (MIT)                              |
| **Requires**           | VS Code 1.104+ (1.122+ to use it without a GitHub sign-in or Copilot plan)                                                      |
| **Current release**    | OmniCopilot v1.5 on both stores (released 2026-11-15)                                                                           |

Store snapshot on **2026-11-17 (00:11 UTC)**, current release: **49,189 Marketplace
installs** and **18,948 Open VSX downloads**. These are different store metrics, not a
combined user count. Sources: [Marketplace](https://marketplace.visualstudio.com/items?itemName=diegosouzapw.omnicopilot)
and [Open VSX API](https://open-vsx.org/api/diegosouzapw/omnicopilot/latest).

Open VSX availability does not by itself establish compatibility with every editor
using that registry. Check the editor's chat and language-model API support.

> **No Copilot subscription is needed for BYOK chat in VS Code 1.122+.** Microsoft
> supports chat, tools and MCP without GitHub sign-in when a provider is configured.
> On VS Code 1.104–1.121 the extension still works, but VS Code requires a signed-in
> Copilot plan. Inline suggestions and embeddings-based features stay outside the
> provider API and still require Copilot; Copilot Business/Enterprise admins can disable
> third-party model providers by policy; a fork shows the models only if it implements
> the chat-provider API. Upstream provider usage can still incur charges. See the
> [VS Code 1.122 release notes](https://code.visualstudio.com/updates/v1_122#_use-byok-without-a-github-sign-in)
> and [language-model guide](https://code.visualstudio.com/docs/agent-customization/language-models).

---

## Setup

1. **Run OmniRoute** — `npm install -g omniroute && omniroute` (dashboard on `http://localhost:20128`).
2. **Install the extension** — search "OmniRoute" in the Extensions view.
3. **Connect** — keep the default `http://localhost:20128` or set your server URL and API key through **OmniRoute: Manage Connection**.
4. **Pick a model** — Copilot Chat → model picker → **Manage Models…** → **OmniRoute**, then tick
   what you want.

For connection settings, open the
**OmniRoute icon in the Activity Bar** (or run `OmniRoute: Manage Connection`) and set:

- **Server URL** — the server root, e.g. `http://omniroute.example.com:20128`. The `/v1` suffix is
  appended by the extension; do not include it.
- **API key** — required when the server's inference authentication policy requires one.
  Stored through VS Code SecretStorage, never in `settings.json`; workspace-specific
  keys are available. Use a key authorized for the models you want to expose.

The extension also provides a connection indicator, model refresh, model context and
pricing metadata (combos included), streamed reasoning with a **Thinking effort** menu on
VS Code 1.120+, a status-bar daily-limit indicator and usage panel (OmniRoute 3.8.50+),
CLI configuration and an optional dashboard tab. The selected model and server policy
determine the capabilities you can use.

---

## What the picker will show

The extension does not show the raw `GET /v1/models` payload — it shapes it, and the count you
see is lower than the catalog size for two deliberate reasons.

### It asks for one id per model

`MODELS_CATALOG_PREFIX_MODE` defaults to **`dual`**, which advertises every model twice — once
under the short alias prefix and once under the canonical provider prefix — so older client
configs keep resolving either form:

```
cc/claude-sonnet-4-6        ← alias prefix
claude/claude-sonnet-4-6    ← canonical prefix, same model
```

The extension requests **`GET /v1/models?prefix=alias`** so one id arrives per model, without
changing the server-wide setting for your other clients. The number of entries depends
on your configured providers and key permissions.

If you would rather fix it server-wide for _every_ client, set the
`MODELS_CATALOG_PREFIX_MODE` feature flag to `alias` in the dashboard. See
[API_REFERENCE → prefix](../reference/API_REFERENCE.md#model-id-prefixes-prefix) for the
query parameter and the per-mode table.

### It hides models that cannot chat

The catalog also lists image, video, audio, rerank, embedding and moderation models. Those are
rejected on a chat request anyway:

```
HTTP 400 — Model '<id>' is an image-generation model and cannot be used on
/v1/chat/completions. Use POST /v1/images/generations instead.
```

so they are filtered out by their `type` field before reaching the picker. Chat-capable
Responses API models can remain in the picker: OmniRoute translates the compatible
requests for its chat endpoint.

### Providers you never configured

The visible catalog follows your server's configured connections, eligible keyless
providers and API-key policies. A keyless catalog entry does not guarantee that its
upstream service is currently available. Manage exposure on the server; the extension
uses the catalog returned for its connection. See the
[model exposure guide](../routing/MODEL_EXPOSURE_LIST.md) and
[free-tier guide](../getting-started/FREE-TIERS-GUIDE.md).

---

## Dashboard inside a VS Code tab

`omnicopilot.dashboardOpen: "editor"` renders the OmniRoute dashboard in an editor tab via the
Simple Browser instead of an external browser. Embedding is **opt-in on the server** through
`DASHBOARD_ALLOW_EMBED=vscode`, which serves the HTML pages with
`frame-ancestors 'self' vscode-webview:` instead of the default `frame-ancestors 'none'` +
`X-Frame-Options: DENY`. The API surface (`/api`, `/v1`, `/v1beta`, `/a2a`, `/healthz`) keeps the
strict headers either way.

> **Embedding requires a build-time flag.** Next.js compiles `headers()` into the route
> manifest, so `next.config.mjs` reads the variable while the bundle is built
> (`next.config.mjs` → `resolveDashboardEmbedMode`, `scripts/build/dashboardEmbed.mjs`).
> Exporting it in front of an already-built server changes nothing — the headers are baked.

```bash
# the variable has to be present on the BUILD command
DASHBOARD_ALLOW_EMBED=vscode npm run build        # or npm run build:release
npm start
```

| How you installed          | Can you enable embedding?                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| From source                | Set the variable on the build command, as above                                                                                      |
| `npm install -g omniroute` | The published package ships a prebuilt bundle — build from source instead                                                            |
| Docker image               | `docker build --build-arg DASHBOARD_ALLOW_EMBED=vscode -t omniroute:embed .` — the prebuilt image on Docker Hub is not embed-enabled |

Without an embed-enabled build the page refuses to frame, the extension detects that from the
response headers and falls back to the external browser — nothing breaks, and it says so once.
See [`ENVIRONMENT.md`](../reference/ENVIRONMENT.md) and issue
[#10273](https://github.com/cheaper-inference/OmniRoute/issues/10273).

---

## Configuring your other tools from inside VS Code

**`OmniRoute: Configure Coding CLI`** drives the `omniroute` CLI to write ready-to-use profiles
for 16 tools: Codex CLI, Claude Code, Cline, Continue, Cursor, Aider, OpenCode, Goose,
Crush, Qwen Code, Kilo, Roo, Gemini CLI, Zed, WhyCodes and 5dive. The extension invokes
`setup-*` commands in the integrated terminal; install a version of the OmniRoute CLI
that includes the selected command. See the [CLI integration guide](CLI-INTEGRATIONS.md)
for the files and flags each recipe uses and the
[extension's tool registry](https://github.com/cheaper-inference/OmniCopilot/blob/main/src/cliBridge.ts).

The API key is handed to the CLI through `OMNIROUTE_API_KEY`, never on the command
line. Setup recipes can persist credentials in the target tool's configuration. When
sharing a workspace-specific key with a tool's user-level configuration, the extension
asks for confirmation first.

---

## Troubleshooting

| Symptom                                              | Cause / fix                                                                                                                                                                                                                                              |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No OmniRoute models in the picker                    | Server unreachable. The status-bar dot goes grey; run `OmniRoute: Check Connection`. Discovery is silent by design and contributes no models rather than prompting.                                                                                      |
| Every model appears twice                            | You are on an OmniCopilot older than 1.0.1 — update. The extension now requests `?prefix=alias`.                                                                                                                                                         |
| An image/audio model used to be listed and is gone   | Intentional since 1.0.1 — it could never answer a chat request.                                                                                                                                                                                          |
| Panel missing from the Activity Bar                  | VS Code moves extra view containers into the **"…"** overflow at the bottom of the Activity Bar, and a container hidden via right-click stays hidden. Right-click the Activity Bar → tick **OmniRoute**, or open it with `OmniRoute: Manage Connection`. |
| Dashboard opens in the browser despite `editor` mode | The server was not **built** with `DASHBOARD_ALLOW_EMBED=vscode` (see above) — setting it at startup on a prebuilt install does nothing. The fallback is deliberate.                                                                                     |
| Models list is stale after changing providers        | `OmniRoute: Refresh Models`, or the ↻ link in the panel.                                                                                                                                                                                                 |

---

## See also

- [`CLI-INTEGRATIONS.md`](CLI-INTEGRATIONS.md) — every other coding tool
- [`REMOTE-MODE.md`](REMOTE-MODE.md) — driving a remote OmniRoute
- [`../reference/API_REFERENCE.md`](../reference/API_REFERENCE.md) — the `/v1/models` contract
- [`docs/CATALOG.md`](https://github.com/cheaper-inference/OmniCopilot/blob/main/docs/CATALOG.md) — the extension's own catalog notes
