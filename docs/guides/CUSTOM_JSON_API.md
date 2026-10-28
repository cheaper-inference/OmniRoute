---
title: "Custom JSON API provider nodes"
version: 3.8.53
lastUpdated: 2026-10-27
---

# Custom JSON API provider nodes

A custom JSON API node connects a JSON business endpoint that does not speak the OpenAI or
Anthropic protocol. OmniRoute fills a JSON request template, sends it to the complete endpoint
URL, reads the reply from a response path and returns it to the client in the client's own
format (Chat Completions, Responses, Messages, ...).

It is an OpenAI-compatible node with `apiType: "custom-json"`; its id has the form
`openai-compatible-custom-json-<suffix>`. The dashboard form is not available yet. Create and
edit these nodes through the provider-node API below.

## Create a node

`POST /api/provider-nodes` (management auth):

```json
{
  "type": "openai-compatible",
  "apiType": "custom-json",
  "name": "Business API",
  "prefix": "biz",
  "baseUrl": "https://api.example.com/v1/answer",
  "customHeaders": { "X-Tenant": "demo" },
  "customJson": {
    "method": "POST",
    "authType": "api-key",
    "authHeader": "X-Service-Key",
    "requestTemplate": {
      "project_id": "demo-project",
      "question": "{{prompt}}",
      "history": "{{messages}}"
    },
    "responsePath": "data.answer"
  }
}
```

- `baseUrl` is the **complete** endpoint URL. Nothing is appended (no `/chat/completions`, no
  `/models`) and, unlike other OpenAI-compatible nodes, there is no default URL. It must be
  `http(s)`, without embedded credentials or a `#fragment`, and it passes the same outbound URL
  guard as every provider node, both when the node is saved and on every request.
- `customJson` is validated with Zod; unknown keys are rejected. Every field is optional:

| Field             | Values                                | Default                                                |
| ----------------- | ------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`           | `bearer`                                               |
| `authHeader`      | header name used when `api-key`       | `X-API-Key`                                            |
| `requestTemplate` | JSON object (≤ 64 KB, depth ≤ 32)     | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | field path, or `$` for the whole body | `choices[0].message.content`                           |

- The secret stays in the connection's API key, never in the template. `bearer` sends
  `Authorization: Bearer <key>`; `api-key` sends `<authHeader>: <key>`. The auth header cannot
  be `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`,
  `Cookie` or a hop-by-hop header. With `none`, connections need no key.
- Extra static headers use the node's regular `customHeaders` (same validation as every other
  compatible node; auth headers are not allowed there).

`PUT /api/provider-nodes/<id>` accepts the same `customJson` and rewrites `baseUrl` and the
config on every existing connection of the node. Omitting `customJson` keeps the stored config;
switching `apiType` to `chat` or `responses` removes it from the node and its connections.

Then add a connection to the node as usual (`POST /api/providers` with the node id) and request
`<prefix>/<model>`, for example `biz/assistant-v1`. The endpoint exposes no model list, so add the
model ids by hand.

## Request templates

Templates are plain JSON. A string value may contain `{{placeholder}}` markers; nothing is
evaluated or executed, and object keys are never substituted.

| Placeholder          | Value                                                             |
| -------------------- | ----------------------------------------------------------------- |
| `{{prompt}}`         | Text of the latest user message (text parts joined with newlines) |
| `{{messages}}`       | The conversation in OpenAI chat format                            |
| `{{model}}`          | The requested model id, without the provider prefix               |
| `{{stream}}`         | Always `false` — the endpoint answers with one JSON document      |
| `{{request.<path>}}` | A field of the translated (OpenAI chat format) request            |

- A value that is exactly one placeholder keeps its JSON type (`"{{messages}}"` becomes an
  array); a placeholder inside a longer string is inserted as text.
- A placeholder that resolves to nothing fails the request with HTTP 400 instead of sending an
  incomplete payload.
- Paths use dot notation and numeric indexes (`data.items[0].text`). `__proto__`,
  `prototype` and `constructor` are rejected in keys and paths.

## Responses

The value at `responsePath` becomes the assistant reply: strings pass through, other JSON values
are serialized. A missing or `null` field, or a body that is not JSON, returns HTTP 502. Upstream
error statuses are passed through. For streaming clients OmniRoute waits for the whole JSON
response and then emits it as one content chunk plus the finish chunk; this is not token
streaming. Tool calls and usage fields are not mapped.

## Never replayed

A business request can have side effects even when it fails. OmniRoute therefore sends it once:

- no transport retry and no redirect following;
- no retry on another connection (account fallback) — the failure is returned as-is and the
  connection is not cooled down;
- no fallback to the next combo target, even for an empty or failed reply.

Separate client requests, and fusion panels that explicitly call several models, still invoke
the endpoint independently.

## Testing a node

Saving a connection, the connection **Test** button and background health checks never call the
endpoint: they only validate the stored config and report the connection as not verifiable.

`POST /api/provider-nodes/validate` with `"apiType": "custom-json"` and the node fields
(`baseUrl`, `apiKey`, `customJson`, optional `customHeaders` and `modelId`) sends exactly one real
request, with `ping` as the latest user text. It answers `{ "valid": true }` or the upstream
status (never the upstream body).

## Storage

The config is stored in `provider_nodes.custom_json_config_json` (migration
`215_provider_node_custom_json_config.sql`) and copied into each connection's
`providerSpecificData.customJson`.

Implementation: `open-sse/utils/customJson.ts` (validation and templating),
`open-sse/executors/customJson.ts` (executor), `open-sse/services/combo/noReplayLatch.ts` and
`src/sse/handlers/chat/responsePolicies.ts` (no-replay).
