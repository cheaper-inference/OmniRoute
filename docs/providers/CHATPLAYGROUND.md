---
title: "ChatPlayground Provider Integration"
version: 3.8.53
lastUpdated: 2026-10-24
---

# ChatPlayground Provider Integration

OmniRoute supports **ChatPlayground** (`chatplayground`, alias `cpl`), allowing access to diverse model endpoints (Azure, LMSYS, and Perplexity) routed through ChatPlayground with automated Clerk session JWT minting and model discovery.

---

## Authentication & Cookie Setup

ChatPlayground requires short-lived Clerk session JWTs (`Authorization: Bearer <jwt>`) for all API requests. OmniRoute handles the entire token lifecycle automatically via browserless auto-minting.

### Required Cookies

To configure a ChatPlayground connection, you only need **two cookies**, both obtainable directly from **`web.chatplayground.ai`** (you do **not** need to inspect `clerk.chatplayground.ai` separately):

1. **`__client`**: Long-lived Clerk client authorization token.
2. **`__session`**: A Clerk JWT (`eyJhbGciOi...`). OmniRoute automatically decodes its payload to extract your active session ID (`sid: "sess_..."`).

### How to Capture Your Cookies

1. Log in to your account at **https://web.chatplayground.ai/**.
2. Open Browser DevTools (**F12** or right-click → **Inspect**).
3. Use either of the following methods:

#### Method A (Easiest — Network Tab)

- Switch to the **Network** tab in DevTools.
- Refresh the page or click any action (e.g. model picker or settings).
- Click on any request sent to `web.chatplayground.ai` or `app.chatplayground.ai` (such as `models` or `user`).
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
   - OmniRoute extracts `sid` from `__session` and posts to Clerk's token mint endpoint (`https://clerk.chatplayground.ai/v1/client/sessions/{sid}/tokens`) using `__client`.
   - The returned short-lived Bearer JWT is cached in memory.
   - OmniRoute decodes the JWT's `exp` claim and automatically mints a fresh token ~15 seconds before expiration.

2. **Direct Bearer JWT**:
   - Alternatively, you can paste an active Clerk Bearer JWT directly.

3. **Multi-Account Management (Native OmniRoute)**:
   - To use multiple ChatPlayground accounts, add them as separate provider connections in the OmniRoute dashboard (e.g. `ChatPlayground 1`, `ChatPlayground 2`).
   - OmniRoute's native Combo Router (`round-robin`, `priority`, `least-used`, `headroom`, `reset-aware`) automatically distributes queries across accounts.
   - If an account encounters rate limits (429) or quota limits, OmniRoute's automated account fallback system (`open-sse/services/accountFallback.ts`) switches to the next healthy account transparently.
   - Each connection independently monitors its own usage, plan, and daily/monthly allowances on the dashboard Limits page.

---

## Supported Endpoints & Model Catalog

ChatPlayground routes models to three distinct backend paths. The **authoritative model roster is discovered at runtime** — OmniRoute resolves every request's model against the live, unauthenticated `GET https://app.chatplayground.ai/api/models` catalog, so new/retired models and endpoint moves take effect without a release:

- The live catalog is cached in memory for **10 minutes** (single in-flight fetch guard, 15s timeout).
- On a discovery outage (network failure, timeout, malformed payload), OmniRoute falls back to the **last good live catalog**, or to a **bundled offline catalog** (`CHATPLAYGROUND_FALLBACK_MODELS` in `open-sse/services/chatplaygroundModels.ts`, snapshot captured 2026-10-20) if none was ever loaded.
- The catalog feeds endpoint routing (`azure` / `lmsys` / `perplexity`), the upstream `model`/`modelName`/`botId` values, and model discovery through `/api/providers/{id}/models`.

The three endpoint families (with catalog rows from the bundled snapshot as of 2026-10-20 — the live catalog is the source of truth):

### 1. Azure Endpoint (`https://app.chatplayground.ai/api/chat/azure`)

- **GPT**: `gpt-6.1-sol`, `gpt-6-luna`
- **Claude**: `claude-sonnet-5-5`, `claude-haiku-5-5`, `claude-opus-5-5`, `claude-fable-5-1`
- **Gemini**: `gemini-3.8-flash-l`, `gemini-3.8-flash`, `gemini-3.1-pro`
- **DeepSeek**: `deepseek-v4-pro`, `deepseek-v4-flash`
- **Kimi**: `kimi-k2.6`
- **xAI**: `grok-4.6`, `grok-4.7`
- **Mistral**: `mistral-large-3`

### 2. LMSYS Endpoint (`https://app.chatplayground.ai/api/chat/lmsys`)

- **Kimi**: `kimi-k3`
- **Llama**: `llama-4-scout`, `llama-4-maverick`
- **Qwen**: `qwen3.8-max`, `qwen3.7-plus`, `qwen3.6-flash`
- **DeepSeek**: `deepseek-r1`
- **Cohere**: `command-a`, `command-r-plus`
- **GLM**: `glm-5.3`, `glm-5.3-flash`
- **Other**: `minimax-m3`, `nova-2-lite-v1`, `mimo-v2.6-pro`, `hy3`

### 3. Perplexity Endpoint (`https://app.chatplayground.ai/api/chat/perplexity`)

- `perplexity-sonar`, `perplexity-sonar-pro`, `perplexity-sonar-reasoning-pro`

### Model ID Resolution (Strict — No Pass-Through)

A request's `model` string is resolved against the catalog with **no synthesis fallback**; unrecognized models are rejected up front with `400: ChatPlayground model not found or invalid`. Resolution order:

1. Provider prefixes `chatplayground/`, `cpl/`, `cpl.`, `cp.`, `cpl:`, `cp:` are stripped first (chained prefixes collapse, e.g. `cpl/chatplayground/gpt-6-luna` → `gpt-6-luna`).
2. Case-insensitive match against the catalog's `id`, then `modelName`, then `displayName`.
3. Vendor-prefixed IDs fall back by suffix: `openai/gpt-6-luna` resolves to `gpt-6-luna`.
4. If nothing matches in the live catalog, the bundled fallback catalog is tried before rejecting — so a model the live roster just dropped still routes rather than erroring.

Only catalog rows with `group: "chat"` are considered.

### Dynamic Model Discovery, Pricing Plans & Credit Weights

#### Official Subscription Plans (`chatplayground.ai/checkout`)

1. **Pro ($15/mo)**:
   - 5,000 basic model queries / month
   - 1,500 advanced model queries / month
   - 300 document uploads / month
   - 300 image generations / month
   - Compare 4 models side-by-side
2. **Unlimited ($25/mo)**:
   - Unlimited basic model queries / month
   - Unlimited advanced model queries / month (enforced via a fair-use sliding limit of **300 credits daily**)
   - Unlimited document uploads / month
   - 1,000 image generations / month
   - Compare 6 models side-by-side

#### StackSocial Lifetime Subscription Tiers

ChatPlayground also offers lifetime deals on platforms like StackSocial:

1. **Basic Plan (Lifetime)**:
   - 500 messages / month
   - Geared toward casual prompting and exploration
2. **Pro Plan (Lifetime)**:
   - 2,000 messages / month
   - Geared toward higher-volume workflows
3. **Unlimited Plan (Lifetime)**:
   - Unlimited messages / month (subject to fair use: **300 credits daily**)
   - Access to full AI model catalog side-by-side

#### Upstream API Flags (`GET https://app.chatplayground.ai/api/models`)

While ChatPlayground's public marketing organizes models into "Basic" vs "Advanced", the internal API exposes:

- `premiumOnly: boolean`: Upstream subscriber-gate boolean. Models with `premiumOnly: true` (e.g. `gpt-6.1-sol`, `claude-sonnet-5-5`, `claude-opus-5-5`, `kimi-k3`, `qwen3.8-max`) require an active paid plan (Pro or Unlimited/Lifetime). When accessed from a free account, the API rejects with HTTP 403: _"This model is only available to active subscribers. Please upgrade your plan."_ Models with `premiumOnly: false` (e.g. `gpt-6-luna`, `deepseek-v4-pro`, `grok-4.7`, `glm-5.3-flash`) are accessible across all tiers.
- `creditWeight: number`: Deductions multiplier per query against your plan allowance. Current catalog weights range from `1` to `10`:
  - `1`: Standard models (`gpt-6-luna`, `deepseek-v4-pro`, `deepseek-v4-flash`, `kimi-k2.6`, `llama-4-scout`, `qwen3.7-plus`, `command-a`, `mistral-large-3`, `nova-2-lite-v1`, all `perplexity-*`)
  - `2`: Mid-tier (`grok-4.6`, `grok-4.7`, `gemini-3.8-flash-l`, `glm-5.3`, `glm-5.3-flash`)
  - `3–5`: Flagship (`gemini-3.8-flash`, `gemini-3.1-pro`, `gpt-6.1-sol`, `kimi-k3`)
  - `7–10`: Heavy reasoning (`claude-haiku-5-5`: 7, `claude-sonnet-5-5` / `claude-opus-5-5` / `claude-fable-5-1`: 10)
- `active: boolean`: Upstream availability toggle. OmniRoute's resolver does not filter on this flag — inactive rows still route — but the upstream API may reject requests for them.
- `group: string`: Filtered to `"chat"` for conversational text completions.

---

## Quota & Limits Dashboard

OmniRoute automatically connects ChatPlayground to its Limits & Quotas dashboard:

- **Endpoint**: `GET https://app.chatplayground.ai/api/user` (authenticated via minted Clerk Bearer JWT).
- **Unlimited Plan (Lifetime / Monthly $25)**: Tracked at **300 credits daily** under fair-use. Displays daily used queries (`user.dailyQueriesCount`), remaining allowance, percentage, and daily midnight UTC resets.
- **Pro Plan**: Displays **2,000 queries/month** (StackSocial Lifetime) or **1,500 advanced queries/month** (Monthly Pro), tracking used queries against the monthly limit and billing period end (`stripeCurrentPeriodEnd`).
- **Basic Plan**: Displays **500 queries/month** (StackSocial Lifetime), tracking used queries and resets.
- **Free Accounts**: Displays base usage metrics and upgrade notices.

---

## Message Character Limit (15,000 Characters)

ChatPlayground enforces a strict server-side boundary of **15,000 characters per message**:

- If an individual message's `content` exceeds 15,000 characters (15,001+ characters), ChatPlayground's upstream API rejects the turn with `HTTP 400: "Message cannot exceed 15,000 characters"`.
- This limit is evaluated per message turn in the conversation array, not as a total request payload size.
- **Pre-Validation**: OmniRoute's `ChatPlaygroundExecutor` validates message character lengths before dispatch and surfaces an actionable error if any turn exceeds 15,000 characters.
- **Mitigation Strategies**:
  - Enable OmniRoute's prompt compression (e.g. `RTK` or `lite` mode) to condense large contexts, system instructions, and tool outputs.
  - Chunk or split large codebases, files, or multi-turn histories across separate prompts.

---

## Streaming & Protocol Details

- ChatPlayground streams chunks appending or containing sentinel tokens in the form of `CHAT_ID:[a-zA-Z0-9_-]+`.
- OmniRoute's `ChatPlaygroundExecutor` strips these sentinel tokens on the fly and translates the output into OpenAI-standard Server-Sent Events (`data: {"choices":[{"delta":{"content":"..."}}]}\n\n`) terminating with `data: [DONE]\n\n`.
- For non-streaming requests, a standard `chat.completion` response envelope is returned.
- Upstream returns a complete response for Perplexity queries rather than incremental SSE chunks; when `stream: true` is requested on Perplexity queries, OmniRoute synthesizes standard SSE chunks so streaming OpenAI clients remain fully compatible.
- **CITATIONS stripping**: The Perplexity endpoint appends a `CITATIONS:[...]` metadata blob to its answer stream (the web client parses it for citation links rather than rendering it). OmniRoute removes both whole `CITATIONS:` lines and inline `CITATIONS:` runs to end-of-line (e.g. `…Canberra**.[1]CITATIONS:[…]`), so clients never see the raw marker. Citation text before the marker is preserved; the structured citation list itself is dropped.
- **Per-endpoint payload contract**: request bodies mirror what web.chatplayground.ai sends per endpoint family — `azure`: `messages`, `model`, `chatId`, `isRegenerate`, `promptTemplate`, `fileUrl`, `botId`, `submissionId`, `noSave`; `lmsys`: `messages`, `model`, `botId` (required — the API 500s without it); `perplexity`: `messages`, `modelName`, `botId` (required).

---

## Tool Functions & Thinking / Reasoning Content

### 1. Tool Functions (Not Supported Upstream)

- **Ignored by Upstream**: ChatPlayground's web backend does not support native function calling or tool execution. When an OpenAI-format `tools` parameter is passed, the upstream API returns HTTP 200, but models **ignore the tool definitions** and produce standard conversational text without generating structured `tool_calls`.
- **Emulated Support**: Classified with `toolCalling: "emulated"` in `src/shared/constants/providers/web-cookie-chatplayground.ts`. If tool calling is required by an agentic client, OmniRoute handles it via prompt-based tool emulation.

### 2. Thinking & Reasoning Content

- **Inline `<think>` Blocks**: Reasoning models (such as DeepSeek R1 / DeepSeek V4, Kimi K3, and Sonar Reasoning Pro) include their internal chain-of-thought directly in the generated output, typically enclosed within `<think>...</think>` blocks.
- **Pass-Through**: These reasoning messages are preserved and streamed verbatim as part of the assistant response text.

---

## Terms of Service, Compliance & Operator Risk

ChatPlayground (operated by Yaseen AI) includes specific restrictions in its Terms of Service:

- **Section 11 (Excessive / Exploitative Usage)**: Strictly prohibits _"sharing of accounts among multiple individuals or bots"_ and _"running scripts to exploit the AI on Yaseen AI"_. Accounts violating these provisions may be suspended immediately without refund.
- **Section 12 (Right to Terminate Usage Temporarily)**: Daily usage that exceeds **$10 in internal costs** triggers temporary suspension for that day, and usage exceeding **$80 in monthly internal costs** triggers termination for the remainder of the month.

### OmniRoute Posture & Safety Recommendations

- **Categorization**: ChatPlayground is explicitly classified as a web-session provider with `subscriptionRisk: true` and `riskNoticeVariant: "webCookie"`. The OmniRoute dashboard presents a risk notice modal upon setup.
- **Single-User Workflows**: Do not share a single ChatPlayground session cookie across a public proxy or multi-user team. Use it for personal assistant/coding sessions.
- **Stay Under Daily Budget**: Do not flood the provider with high-volume benchmarks or batch automation. The 300 queries/day fair-use cap helps stay safely below the internal $10/day cost threshold.
- **Browser-Identical Headers**: OmniRoute automatically attaches standard desktop browser User-Agents, origins, and referrers (`https://web.chatplayground.ai/`) and removes internal `CHAT_ID` tokens to avoid unnecessary anomalies.
