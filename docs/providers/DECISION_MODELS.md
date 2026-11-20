---
title: "Decision Models"
version: 3.8.53
lastUpdated: 2026-11-04
---

# Decision models

Decision models evaluate evidence and return typed answers. They use native
decision endpoints, independently of chat executors and combo strategies.

| Gateway endpoint           | Native protocol  | Request questions                   | Response answers     |
| -------------------------- | ---------------- | ----------------------------------- | -------------------- |
| `POST /v1/decisions`       | OpenAI Decisions | Array of predicate, choice, score   | Array                |
| `POST /v1/systemone`       | System One       | Named object of noul, choice, score | Named object         |
| `GET /v1/systemone/models` | Gateway catalog  | None                                | Qualified model rows |

Inference through the new adapters and the new discovery endpoint require a
valid OmniRoute client API key, including with keyless chat enabled. The existing
TypeSafe/OpenRouter route retains its established authentication policy. The `decisions` endpoint category controls inference
and discovery. Normal key model restrictions, budgets, rate limits, connection
scope and quota preflight apply. An upstream credential is never a client key.

## Configure existing provider connections

Create connections using the dashboard or the authenticated `POST /api/providers`
management API. Store provider credentials in the connection's normal `apiKey`
field. Use the existing `providerSpecificData` object for operator configuration:

```json
{
  "provider": "basal",
  "name": "Local decisions",
  "allowNoCredential": true,
  "providerSpecificData": {
    "baseUrl": "http://basal:8000/v1"
  }
}
```

This is a management request, not an inference body. `allowNoCredential` is
supported for local providers; omit it and supply `apiKey` when authentication
is configured. Protect the management API and keep credentials out of logs.

### OpenAI

Use an existing **OpenAI API** connection (`provider: openai`). ChatGPT
subscriptions and OAuth credentials do not grant OpenAI API access. The gateway
uses `https://api.openai.com/v1/decisions`; discovery checks the account's
`/v1/models` and currently exposes `openai/gpt-6-luna` for Decisions. This model
may also support other endpoints; its ordinary chat classification is preserved.

```bash
curl http://localhost:20128/v1/decisions \
  -H "Authorization: Bearer $OMNIROUTE_CLIENT_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"model":"openai/gpt-6-luna","input":"Please refund the duplicate charge.","questions":[{"type":"predicate","name":"refund","instructions":"Is a refund requested?"},{"type":"choice","name":"team","instructions":"Choose a team","choices":[{"value":"billing"},{"value":"support"}]},{"type":"score","name":"urgency","instructions":"Rate urgency","levels":[{"label":"routine"},{"label":"urgent"}]}]}'
```

Native input messages, tool calls and outputs, image/JSON parts, instruction
content parts and cache fields are forwarded intact. The upstream validates
the full native content contract. Only the gateway model prefix is removed.
An example predicate response shape is:

```json
{
  "model": "gpt-6-luna",
  "answers": [{ "type": "predicate", "name": "refund", "probability": 0.95 }],
  "usage": { "input_tokens": 42, "output_tokens": 0, "total_tokens": 42 }
}
```

Values here illustrate the shape; they are not a live inference receipt.
Native confidence, probability, refusal and usage fields are returned unchanged.

### Ollama

Use the existing `ollama-local` connection with, for example,
`providerSpecificData.baseUrl: http://ollama:11434/v1`. The default is
`http://localhost:11434/v1`. Inside a container, `localhost` addresses that
container: use your operator-managed network hostname and port when needed.

Install a decision-capable model on an Ollama version supporting System One
(consult the current [Ollama decision documentation](https://github.com/ollama/ollama/blob/main/docs/capabilities/decision.mdx)).
For example, `ollama pull clef-flash`. The gateway enumerates `/api/tags` and
reads each model's native Ollama show endpoint capabilities. Only models declaring `decision`
are eligible. There is no model-name allowlist; missing models and chat-only
models receive 404. Vision capability is discovered, not guessed from a name.

```bash
curl http://localhost:20128/v1/systemone \
  -H "Authorization: Bearer $OMNIROUTE_CLIENT_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"model":"ollama-local/clef-flash","state":"Please refund the duplicate charge.","questions":{"refund":{"type":"noul","instructions":"Is a refund requested?"}}}'
```

### Basal

Start `basal-serve --model <installed-model-id>` according to the
[Basal server documentation](https://github.com/rkinas/basal/blob/main/docs/API.md).
Create a `basal` connection pointing at its base URL. Defaults are
`http://localhost:8000/v1/systemone` and discovery via `/v1/models`.
Both `models[].name` and OpenAI-shaped `data[].id` catalogs are supported.
No Basal version or variant is hardcoded. Select the discovered identifier:

```json
{
  "model": "basal/<discovered-model-id>",
  "state": { "ticket": "A critical service is unavailable" },
  "questions": {
    "urgency": {
      "type": "score",
      "instructions": "Rate urgency",
      "criteria": ["Routine", "Soon", "Immediate"]
    },
    "team": {
      "type": "choice",
      "instructions": "Choose a team",
      "criteria": { "billing": "Payments", "technical": "Software" }
    }
  }
}
```

The initial gateway supports the common System One question types `noul`,
`choice` and `score`. Basal-specific question types such as `multi`, `act` and
`tool` are rejected. Additional native fields on supported questions and bodies
are preserved and validated by the configured upstream. Answers and refusal
fields are never converted, rounded or synthesized.

### Supersonic Labs Julia-1

The **Decision Models** category follows Search in Providers and reuses the existing
accounts for Supersonic Labs, Ollama Cloud, OpenAI, OpenRouter, Cloudflare Workers AI,
and OrcaRouter. Its summary filter also works in compact display. Provider cards
use the original brand assets; a card alone does not prove account/model access.

Choose **Supersonic Labs** and save its API key. The native provider uses
`https://api.supersoniclabs.ai/v1/systemone` and declares `julia-1`; call the gateway
with `model: supersoniclabs/julia-1`. The declared catalog does not verify the key or
server reachability. Context/output limits and pricing remain unknown until an
upstream contract supplies them. Julia never routes through the chat executor,
including as a combo leaf and with the optional capability gate disabled.

Each new native inference attempt receives a fresh `Idempotency-Key`. This satisfies
servers requiring that header; it does not deduplicate separate client requests.
Ambiguous network failures are not automatically retried.

### OpenRouter and OrcaRouter Jev

Use the actual native model identifier `typesafe/jev-1.13`; a chat router with a
similar name is a different model. Existing TypeSafe/OpenRouter aliases keep their
established behavior. To explicitly configure a native connection, set its
`providerSpecificData.decision` to:

```json
{
  "format": "systemone",
  "endpoint": "https://api.orcarouter.ai/v1/systemone",
  "models": ["typesafe/jev-1.13"]
}
```

For OpenRouter use `https://openrouter.ai/api/alpha/decisions` instead. Call the
common System One gateway with `orcarouter/typesafe/jev-1.13` or
`openrouter/typesafe/jev-1.13`. These explicit lists are declarations, even if the
ordinary chat catalog does not list the model. Verify access with a scoped client
key. See the [OrcaRouter model page](https://www.orcarouter.ai/models/typesafe/jev-1.13)
and [OpenRouter Jev guide](https://openrouter.ai/docs/guides/community/jev-tutorial).

### Julia and other configured engines

Julia-1 is a model family, not a promise of one standard HTTP server. Serve it
behind a System One-compatible implementation. Create a `julia-local`
connection with an explicit endpoint and model identifier:

```json
{
  "provider": "julia-local",
  "name": "Julia server",
  "allowNoCredential": true,
  "providerSpecificData": {
    "decision": {
      "format": "systemone",
      "endpoint": "http://julia:9000/custom/systemone",
      "models": ["julia-1"],
      "timeoutMs": 30000
    }
  }
}
```

Call `/v1/systemone` with `model: julia-local/julia-1`. An explicit `models` list
is an operator declaration, not a server discovery or inference receipt. If
the server supports discovery, configure `modelsEndpoint` and omit `models`.
Ollama always uses actual capability discovery, even with an explicit list.

The same `decision` block can opt an existing provider connection into either
native protocol. The merged TypeSafe/OpenRouter System One route remains available, including
bare `jev-*` aliases, its default model and `GET /v1/systemone`. Operators must select the actual native
protocol and URL; similarly named Decisions APIs are not wire-compatible.

## Discovery, routing and limits

`GET /v1/systemone/models` returns qualified IDs and explicit `api_format`
(`decisions` or `systemone`) on every row, including legacy TypeSafe/OpenRouter
models. Clients select the native endpoint from this field, without guessing
from provider names. Native rows have `type: decisions`, `supported_endpoints`,
decision/vision capability and `pricing: null`. OpenRouter models with both
text and decision output retain `type: chat` and both `chat` and `systemone`
endpoints; decision-only models remain outside chat selection.

The catalog includes both native protocols and applies the caller's connection
and model restrictions before pagination. Optional `limit` and `after` parameters
page the final combined catalog in ID order. Paged responses include `has_more`
and, for a nonempty page, `last_id`; use that exact ID as the next `after` value.
Without these parameters the response contains the complete authorized list.
Catalogs are live, so a backend or configuration change between requests can
change the available rows.

`X-OmniRoute-Catalog-Status: complete` means all queried catalog sources succeeded,
not that one page contains all rows or that the account has inference entitlement.
Backend failures, stale OpenRouter or unified-catalog fallback, or malformed connection records produce
`partial` with HTTP 200 when some authorized results survive. If no results survive,
the response is HTTP 503 with status `unavailable`. `has_more: false` on a partial
catalog describes only the available results; it does not prove completeness.
Enumeration does not rotate account selection. Catalog visibility does not prove
successful inference.

A failed per-model capability lookup leaves other verified catalog rows available
with partial status. Inference verifies the requested model only, so an unrelated
model's failed capability lookup cannot block an otherwise valid request. Failure
to verify the requested model still prevents inference.

No cross-format translation is implemented. Sending OpenAI input to a System
One model, or vice versa, returns 400. New adapters require qualified IDs; existing TypeSafe aliases remain supported. Default
routing never substitutes another model. An operator can configure up to four
qualified `fallbackModels` in the primary connection's `decision` block. Each
fallback is independently authorized, scoped, discovered and quota-checked.
Only explicit upstream HTTP 429/500/502/503 failures trigger fallback; ambiguous
timeouts, cancellation, invalid bodies and connection failures are not replayed.
Fallbacks must use the same native protocol. Existing combo selection is separate.

Requests and responses are capped at 16 MiB of decoded bytes. Request intake
is bounded to 10 seconds. Attempts default to 30 seconds, configurable from
100 ms to 120 seconds. Discovery has an additional total 30-second catalog
deadline. The normal provider proxy, DNS/SSRF guard and local-provider policy
apply; redirects are disabled and cloud metadata addresses remain blocked.
Clients cannot choose upstream URLs: unknown native request fields are data
forwarded to the configured server and never control the gateway transport.

Logs contain metadata only: provider/model/endpoint, status, latency, request ID,
selected connection and failure category. No prompts, state, questions, native
answers or credentials are supplied to the log artifact store. Native token
usage is tracked when present. Provider-reported USD cost, including explicit
zero, is authoritative; missing costs remain unknown. Decision usage does not
inherit a chat token price for the same model. The existing unknown-spend budget
policy applies to usage-limited keys. Response headers include
`X-OmniRoute-Request-Id`, `X-OmniRoute-Provider`, `X-OmniRoute-Model`,
`X-OmniRoute-Latency-Ms`, `X-OmniRoute-Cost-Status`, `X-OmniRoute-Usage-Status`
and `X-OmniRoute-Response-Cost` when cost is reported.

No new environment variables are required. Existing local-provider flags are
documented in [Environment reference](../reference/ENVIRONMENT.md).

## Verification boundary

The hard-session-lease inventory classifies native credential selection as a
scoped quota-preflight site (B) and catalog connection enumeration as read-only
discovery (C). The catalog filters connection scope before contacting backends;
it never selects an inference connection or changes affinity.

Mocked transport, policy and billing tests require no provider credentials or
paid services. They prove protocol behavior, not live integration. No live
OpenAI, Ollama, Basal or Julia inference is claimed by these tests.

## Upstream integration

This change extends merged [PR #17994](https://github.com/cheaper-inference/OmniRoute/pull/17994)
without replacing its TypeSafe/OpenRouter proxy, default aliases or GET catalog.
The new OpenAI `/v1/decisions` route uses the native OpenAI array contract. It is
not an alias for OpenRouter's System One protocol.

PRs [#14667](https://github.com/cheaper-inference/OmniRoute/pull/14667),
[#18555](https://github.com/cheaper-inference/OmniRoute/pull/18555),
[#15279](https://github.com/cheaper-inference/OmniRoute/pull/15279) and
[#14498](https://github.com/cheaper-inference/OmniRoute/pull/14498) were open when
reviewed on 2026-11-03. No unfinished routing strategy is merged here. A later
combo integration can consume the native gateway after explicit protocol and
fallback-policy selection; this contribution adds no parallel combo engine.

## Universal provider setup and dashboard

Decision models use normal provider connections and per-model metadata. In
Providers, add or edit a compatible provider and choose **System One (typed
decisions)** or **Decisions (OpenAI)** as its API type. Set its base URL to the
server API root (for example `https://decider.example/v1`). The default inference
path is `/systemone` or `/decisions`; the default model-discovery path is
`/models`. Advanced endpoint and model paths override these defaults. Import or
add models through the normal provider model list. Their native endpoint metadata
is retained and decision-only rows are typed `decisions`, separately from chat.

This works for an operator-hosted Julia-1, Basal, or any server implementing one
of these protocols; no provider-name allowlist is needed. Servers without model
discovery may instead declare `providerSpecificData.decision.models` explicitly,
with `format` and the full `endpoint`. A declaration does not prove reachability.

The Endpoints page always shows `/v1/decisions`, `/v1/systemone`, and the scoped
`/v1/systemone/models` catalog. Counts come from the management catalog with typed endpoint metadata, including when
public model discovery is configured to expose only combos. Copy uses
the same selected base URL as other endpoints. Matching a protocol does not grant
access: normal model/connection/key restrictions remain mandatory.

Ollama Cloud uses the existing account connection and its native capability proof,
then calls `https://ollama.com/v1/systemone`; it does not require a local Ollama
server. A name containing `clef` is not capability evidence. Cloudflare Workers AI
uses the existing token/account ID, discovers documented Clef/Clef Flash entries,
calls the per-model Workers endpoint and unwraps its response envelope. Existing
TypeSafe Jev and OpenRouter routes are preserved; their scoped catalog entries
are included in the common decision-model catalog. Protocol payloads are never translated to chat.

Sources: [Ollama decisions](https://docs.ollama.com/capabilities/decision),
[Cloudflare Clef](https://developers.cloudflare.com/workers-ai/models/clef/),
[Cloudflare discovery](https://developers.cloudflare.com/api/resources/ai/subresources/models/methods/list/).
These source changes require a new deployment. Tests using mocked providers do
not establish live inference or the billing terms of an individual account.

The connection Test/Test All health probe currently skips native decision models
with an explicit 422/skipped result and names the matching endpoint. It never
sends a chat request or marks a configuration-only check as successful inference.
Use that endpoint with an authorized, scoped client key for a real decision test.
