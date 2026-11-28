---
title: "ChatPlayground Provider Integration"
version: 3.8.54
lastUpdated: 2026-11-16
---

# Providers — ChatPlayground

OmniRoute supports **ChatPlayground** (`chatplayground`, alias `cpl`): one unified chat endpoint at `web.chatplayground.ai` covering the whole chat catalog, with automated Clerk session JWT minting and live model discovery.

The contract below was verified against the live site on 2026-11-16. It replaces the earlier per-endpoint surface (`app.chatplayground.ai/api/chat/{azure,lmsys,perplexity}`), which is gone — `app.chatplayground.ai` no longer answers and those routes 404 on the new origin.

---

## Authentication & Cookie Setup

ChatPlayground requires a short-lived Clerk session JWT (`Authorization: Bearer …`) for every API request. OmniRoute handles the token lifecycle automatically via browserless auto-minting.

### Required Cookies

To configure a ChatPlayground connection, you only need **two cookies**, both obtainable directly from **`web.chatplayground.ai`** (you do **not** need to inspect `clerk.chatplayground.ai` separately):

1. **`__client`**: Long-lived Clerk client authorization token.
2. **`__session`**: A Clerk JWT (`eyJhbGciOi...`). OmniRoute decodes its payload to extract your active session ID (`sid: "sess_..."`).

### How to Capture Your Cookies

1. Log in to your account at [web.chatplayground.ai](https://web.chatplayground.ai/).
2. Open Browser DevTools (**F12** or right-click → **Inspect**).
3. Use either of the following methods:

#### Method A (Easiest — Network Tab)

- Switch to the **Network** tab in DevTools.
- Refresh the page or click any action (e.g. model picker or settings).
- Click on any request sent to `web.chatplayground.ai` (such as `models` or `me`).
- In the right-hand panel, go to **Headers** → **Request Headers**.
- Copy the entire value of the **`Cookie:`** header and paste it into OmniRoute's connection credential field. OmniRoute automatically extracts `__client` and `__session`.

#### Method B (Application Tab)

- In DevTools, go to **Application** (Chrome/Edge) or **Storage** (Firefox) → **Cookies** → `https://web.chatplayground.ai`.
- Copy the values for `__client` and `__session`.
- Paste them into OmniRoute formatted as:

  ```text
  __client=<value>; __session=<value>
  ```

---

## Token Minting & Rotation Lifecycle

1. **Auto-Minting**:
   - OmniRoute extracts `sid` from `__session` and posts to Clerk's token mint endpoint (`https://clerk.chatplayground.ai/v1/client/sessions/{sid}/tokens?__clerk_api_version=2026-08-20&_clerk_js_version=6.43.0`) using `__client`.
   - The returned short-lived Bearer JWT is cached in memory, keyed by session id.
   - OmniRoute decodes the JWT's `exp` claim and automatically mints a fresh token ~15 seconds before expiration.

2. **Direct Bearer JWT**:
   - Alternatively, you can paste an active Clerk Bearer JWT directly.

3. **Multi-Account Management (Native OmniRoute)**:
   - To use multiple ChatPlayground accounts, add them as separate provider connections in the OmniRoute dashboard (e.g. `ChatPlayground 1`, `ChatPlayground 2`).
   - OmniRoute's native Combo Router (`round-robin`, `priority`, `least-used`, `headroom`, `reset-aware`) automatically distributes queries across accounts.
   - If an account encounters rate limits (429) or quota limits, OmniRoute's automated account fallback system (`open-sse/services/accountFallback.ts`) switches to the next healthy account transparently.
   - Each connection independently reports its plan and usage buckets on the dashboard Limits page.

---

## The Unified Chat API

Every chat request is one `POST https://web.chatplayground.ai/api/chat`. The body is validated by a strict schema, so OmniRoute sends exactly:

```json
{
  "modelSlug": "gpt-6-luna",
  "submissionId": "<fresh uuid per request>",
  "message": { "text": "...", "attachments": [{ "fileId": "..." }] },
  "conversationId": "<uuid, only when the caller supplied one>",
  "noSave": true
}
```

- `submissionId` is a new UUID on every call.
- `message.attachments` is sent only when the last message carries uploaded file IDs (`fileId`).
- `conversationId` is forwarded only when the caller passes a UUID via `conversationId` or `chatId`; anything else is dropped (the API rejects it with "Invalid UUID").
- `noSave` is sent only when `CHATPLAYGROUND_NO_SAVE=true`, matching the web client's "don't save chats" preference.
- Any other top-level key (`temperature`, `max_tokens`, `stream`, `messages`, `model`, `botId`, …) makes the API answer `400 Unrecognized key`, so none of them are forwarded.

### Conversation history

The API accepts exactly one message per request. OmniRoute renders an OpenAI `messages[]` array into that single `message.text`: a one-turn request is sent as-is, and a multi-turn request becomes a plain transcript of the earlier turns followed by the final turn. System, tool, and assistant turns are all included, so context is never silently dropped.

### Images

The API accepts images only as uploaded file IDs inside `message.attachments`. An inline OpenAI `image_url` (or any other non-text) content part cannot be represented, so OmniRoute rejects the request with `400` naming the unsupported part type instead of sending a text-only prompt and pretending the image was seen. Upload the file through ChatPlayground first and pass its `fileId`.

---

## Model Catalog

The authoritative roster is discovered at runtime from the unauthenticated `GET https://web.chatplayground.ai/api/models`, so new and retired models take effect without a release:

- The live catalog is cached in memory for **10 minutes** (single in-flight fetch guard, 15s timeout).
- On a discovery outage (network failure, timeout, malformed payload), OmniRoute falls back to the **last good live catalog**, or to a **bundled offline catalog** (`CHATPLAYGROUND_FALLBACK_MODELS` in `open-sse/services/chatplaygroundModels.ts`, snapshot captured 2026-11-16) if none was ever loaded.
- Rows are `{slug, displayName, provider, group, tier, capabilities}`. The parser still accepts the older `{botId, modelName, creditWeight}` shape, but `endpoint` is no longer part of the model — there is only one route.
- Only `group: "chat"` rows are routable. `group: "image"` models (e.g. `gpt-image-2.6-sunburst`) are excluded because `/api/chat` rejects them with `MODEL_NOT_FOUND`.

The bundled snapshot (2026-11-16) contains 28 chat models, among them `gpt-6.1-sol`, `gpt-6-luna`, `gemini-3.5-flash-lite`, `gemini-3.8-flash`, `gemini-3.1-pro`, `claude-opus-5-5`, `claude-sonnet-5-5`, `claude-haiku-5-5`, `claude-fable-5-2`, `deepseek-v4-pro`, `deepseek-v4.1-flash`, `kimi-k3`, `grok-4.7`, `glm-5.3`, `qwen3.8-max`, and `perplexity-sonar`. The live catalog is the source of truth; this list only shows what routes while discovery is down.

### Model ID Resolution (Strict — No Pass-Through)

A request's `model` string is resolved against the catalog with **no synthesis fallback**; unrecognized models are rejected up front with `400: ChatPlayground model not found or invalid`. Resolution order:

1. Provider prefixes `chatplayground/`, `cpl/`, `cpl.`, `cp.`, `cpl:`, `cp:` are stripped first (chained prefixes collapse, e.g. `cpl/chatplayground/gpt-6-luna` → `gpt-6-luna`).
2. Case-insensitive match against the catalog's `slug` (and its legacy `id` / `modelName` aliases).
3. Vendor-prefixed IDs fall back by suffix: `openai/gpt-6-luna` resolves to `gpt-6-luna`.
4. If nothing matches in the live catalog, the bundled fallback catalog is tried before rejecting — so a model the live roster just dropped still routes rather than erroring.

### Capabilities

Each row carries `capabilities.{vision, fileInput, reasoning, imageGen}`, which drive context sizing: vision models get a 1,000,000-token window, image-generation models 65,536, everything else 128,000 (with per-slug overrides such as `claude-fable-5-1` at 200,000). `tier` is `basic` or `advanced` as reported by the catalog.

`creditWeight` is read from legacy catalog rows when present, but the current API does not return it, so it is no longer used for routing or quota math.

---

## Quota & Limits Dashboard

OmniRoute reads usage from `GET https://web.chatplayground.ai/api/me` (authenticated with the minted Clerk Bearer JWT). One payload carries the user, the plan, and the `usage` buckets — `dailyQueries`, `pro`, `documents`, and `images` — each with `used`, `limit`, and `periodEnd`.

- A numeric `limit` is reported as a quota with `remaining = limit - used`.
- A `limit` of `"unlimited"` is reported as an unlimited quota that still shows `used`.
- A payload with no `usage` buckets reports **no quota** rather than inventing one. The old `app.chatplayground.ai/api/user` route only carried flat counters and is no longer called.

---

## Message Character Limit (15,000 Characters)

ChatPlayground enforces a strict server-side boundary of **15,000 characters per message** (upstream error MESSAGE_TOO_LONG):

- The limit applies to the rendered `message.text`, so a multi-turn transcript counts as one message.
- **Pre-Validation**: OmniRoute checks each input message and the rendered transcript before dispatch, and returns `400` naming the offending message (or the serialized conversation) when either exceeds 15,000 characters.
- **Mitigation**: enable OmniRoute's prompt compression (e.g. `RTK` or `lite` mode), or split large contexts across separate prompts.

---

## Streaming & Response Format

The reply is an AI-SDK JSON event stream wrapped in SSE framing, regardless of the `Accept` header:

```text
data: {"type":"start","messageId":"…"}
data: {"type":"start-step"}
data: {"type":"text-start","id":"0"}
data: {"type":"text-delta","id":"0","delta":"Hello"}
data: {"type":"text-end","id":"0"}
data: {"type":"finish-step"}
data: {"type":"finish","finishReason":"stop","messageMetadata":{"usage":{"inputTokens":2,"outputTokens":9,"reasoningTokens":0}}}
data: [DONE]
```

- Token usage is nested under `finish.messageMetadata.usage` (`inputTokens`, `outputTokens`, `reasoningTokens`), not on the event itself. OmniRoute maps it to OpenAI `usage`.
- Reasoning models emit `reasoning-start` / `reasoning-delta` / `reasoning-end`, which OmniRoute forwards as `reasoning_content`.
- A `text-delta` with an empty `delta` plus `providerMetadata` (e.g. a thought signature) carries no visible text and is skipped.
- An in-band `{"type":"error","message":"…"}` frame is returned as an error, never as an empty successful completion.
- For `stream: false`, the same body is parsed into one `chat.completion` response.

---

## Tool Functions

ChatPlayground's web backend does not support native function calling. A `tools` parameter is not part of the unified request schema, so it is not forwarded; models produce plain conversational text. The provider is classified with `toolCalling: "emulated"` in `src/shared/constants/providers/web-cookie-chatplayground.ts`, and OmniRoute handles tool use via prompt-based emulation when an agentic client requires it.

---

## Terms of Service, Compliance & Operator Risk

ChatPlayground (operated by Yaseen AI) includes specific restrictions in its Terms of Service:

- **Section 11 (Excessive / Exploitative Usage)**: Strictly prohibits _"sharing of accounts among multiple individuals or bots"_ and _"running scripts to exploit the AI on Yaseen AI"_. Accounts violating these provisions may be suspended immediately without refund.
- **Section 12 (Right to Terminate Usage Temporarily)**: Daily usage that exceeds **$10 in internal costs** triggers temporary suspension for that day, and usage exceeding **$80 in monthly internal costs** triggers termination for the remainder of the month.

### OmniRoute Posture & Safety Recommendations

- **Categorization**: ChatPlayground is explicitly classified as a web-session provider with `subscriptionRisk: true` and `riskNoticeVariant: "webCookie"`. The OmniRoute dashboard presents a risk notice modal upon setup.
- **Single-User Workflows**: Do not share a single ChatPlayground session cookie across a public proxy or multi-user team. Use it for personal assistant/coding sessions.
- **Stay Under Daily Budget**: Do not flood the provider with high-volume benchmarks or batch automation.
- **Browser-Identical Headers**: OmniRoute attaches standard desktop browser headers and the `https://web.chatplayground.ai/` origin and referrer on the Clerk mint call.
- **Don't save chats**: set `CHATPLAYGROUND_NO_SAVE=true` to send `noSave: true` on every request, so ChatPlayground does not persist the conversation server-side. Unset, saving stays on. See [Environment Variables](../reference/ENVIRONMENT.md).
