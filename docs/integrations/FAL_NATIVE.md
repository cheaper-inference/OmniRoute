---
title: "Fal native multimodal model APIs"
---

# Fal native multimodal model APIs

Everything on this page needs the `FAL_NATIVE_ENABLED` feature flag, which is off by default.
Turn it on under **Dashboard → Settings → Feature Flags** or set `FAL_NATIVE_ENABLED=true`. With
the flag off, `/v1/fal/*` and `/api/providers/{id}/fal` answer 404, the provider page has no
native panel, and Fal requests on the image, video and music routes keep their established
request shape, endpoint mapping and response format.

Add a Fal.ai API-key connection under **Dashboard → Providers → Fal.ai**. The provider
page contains a native model panel with catalog search, category filtering, pagination,
schema loading, typed controls, ordered reference uploads, JSON input, job retrieval,
cancellation, and artifact downloads. Select the connection before loading its schema.

OmniRoute's provider ID is `fal-ai`. The native `endpoint_id` is a separate value such as
`openai/gpt-image-2.5/sunburst/edit`. Qualified publisher IDs are preserved. Historical
short IDs have explicit mappings in `open-sse/config/falEndpoint.ts`.
Seedream, Dreamina and Recraft historical selections map explicitly to their `fal-ai/`
endpoints. Native `google/...`, `xai/...` and `openai/...` publishers remain unchanged.
On the image, video and music routes, a selection whose first segment is not a known publisher
is a first-party app and gets the `fal-ai/` owner, so `fal-ai/aura-flow` reaches
`fal-ai/aura-flow`. Use `POST /v1/fal/run` for a publisher outside that list; it takes the
`endpoint_id` unchanged.
The retained Bria 3.2 alias keeps its historical destination; both its old and prefixed
OpenAPI URLs returned 404 on 2026-11-03. This is upstream availability evidence, not a
reason to remove the registry entry or route it to a different publisher.

## Discover and validate

`GET /v1/fal/models` accepts `q`, `category`, `cursor`, `limit`, and `status`. Pass the returned
`next_cursor` with the same filters to retrieve another page. Discovery does not prove that
an account can run a paid model. Missing metadata does not prevent native execution.

`GET /v1/fal/models?endpoint_id=...` lazily loads the endpoint's OpenAPI schema and returns its
inputs, required fields, documented reasoning controls, category, kind, and transports.
Schemas are cached for one hour per provider connection. `refresh=true` reloads an automatic
cache entry. `connection_id` selects a connection within the caller's permitted scope.
Schema errors stop execution; they do not become permissive input validation.

The authenticated management API at `/api/providers/{id}/fal` supports:

- `GET`: catalog search or schema loading for that connection.
- `PUT`: register `{ "endpoint_id": "owner/app", "openapi": { ... }, "metadata": { ... } }`.
  Registration compiles and validates the supplied OpenAPI input schema before storing it.
  Use this for private endpoints or incomplete discovery. It does not perform paid inference.
- `DELETE ?endpoint_id=...`: remove an override/cache entry so the next schema read uses
  upstream discovery again. Manual overrides otherwise remain pinned during refresh.

These management operations require the existing management authorization policy. All
execution URLs are pinned to Fal hosts; neither a registered endpoint nor a job can act as
an arbitrary URL proxy. External schema references are rejected without fetching them.

## Execute native inputs

The examples use the same JSON envelopes exercised by `tests/unit/fal-native-routes.test.ts`.
They require a real Fal connection and may incur upstream charges when executed.

```bash
curl "$OMNIROUTE_URL/v1/fal/run" \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: my-3d-request-1' \
  -d '{
    "endpoint_id": "fal-ai/hunyuan3d-v21",
    "transport": "queue",
    "input": {"input_image_url": "https://example.com/source.png"}
  }'
```

The request accepts an optional `connection_id`. `input` contains exactly the model's
documented fields. Values are validated without coercion, default insertion, clamping,
or removal. Explicit `false`, `0`, nullable values, arrays, and nested objects are retained.
Unsupported controls produce a validation error. Model-native limits come from its schema.
When an upstream dependency is expressed only in prose, upstream remains authoritative;
an operator can encode the dependency in a schema override.

Use multipart form data for uploads: `endpoint_id`, `transport`, and `input` (a JSON string)
are envelope fields. File field names are native input names. A name ending in `[]` creates
an ordered array, including when only one file is uploaded. Files become data URIs and
are then checked against the endpoint schema. Existing public URLs, data URIs, and native
Base64 strings can be supplied in JSON when the endpoint accepts them. OmniRoute does not
fetch client-supplied URLs while preparing native requests.

The existing image generation/edit routes retain compatibility envelopes. New qualified
image endpoints use their schemas; `size` maps to documented `image_size`, `n` to
`num_images`, and `mask` to `mask_url`. Use `fal_input` for complex native fields. Image edits
preserve additional JSON and multipart options instead of rebuilding a prompt-only body.
Known historical FLUX and video/music routes retain their existing defaults. Other native
music models do not receive ACE-Step's `tags` request shape. Use `/v1/fal/run` for TTS,
transcription, audio transformations, 3D, analysis, workflow/training jobs, and capabilities
that do not fit an existing compatibility response.

## Job lifecycle and recovery

Queue submission returns HTTP 202 with a local `id`, upstream `request_id`, job `kind`, and
gateway status/result/cancellation URLs. Job ownership and the selected provider connection
are persisted in SQLite's existing `key_value` table; no migration is needed.

```bash
curl "$OMNIROUTE_URL/v1/fal/jobs/$JOB_ID?result=true" \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY"
curl -X DELETE "$OMNIROUTE_URL/v1/fal/jobs/$JOB_ID" \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY"
```

GET only polls/retrieves the original job. It never submits a generation or records another
dispatch. DELETE uses the upstream cancellation URL when provided. An in-progress
"CANCELLATION_REQUESTED" response does not claim that generation has stopped. Retrieval and
cancellation continue after a key's spend allowance is exhausted, while key status, model,
endpoint, and connection authorization still apply.

Use a stable `Idempotency-Key` for queue requests. OmniRoute reserves its receipt before
dispatch. Repeating the same key and input returns the receipt; changing the input is an
error. Transport failures retain "SUBMISSION_UNKNOWN" rather than retrying an uncertain
submission. Retry with the same key to recover the local ID after a disconnect. If Fal did
not return an upstream request ID, the gateway cannot determine whether the job ran; inspect
the Fal account's request history before issuing a new idempotency key. Cancellation is
unavailable when upstream did not provide a cancellation URL.

The dashboard reserves an immutable submission snapshot before dispatch and reads
`X-Request-ID` on every response status before parsing its body. **Recover original
submission** reuses the original queue input and key, including after an error or abort.
**New generation** explicitly allocates another key and can incur another charge. Editing
the draft never changes the retained recovery snapshot. A synchronous lock prevents
concurrent clicks from creating separate submissions.

This tab keeps up to 20 recovery receipts in session storage: endpoint, connection,
transport, key, local job ID, status and a SHA-256 input fingerprint. Credentials and input
payloads are not persisted. After reload, restore the exact draft before recovery; reordered
object keys are equivalent, while array order, null, false and zero remain significant.
Switch back to the original connection to recover its receipt. "SUBMISSION_UNKNOWN" stays
visibly uncertain. A receipt without an upstream ID cannot recover a missing upstream result.

Only GET requests retry on 429/503, at most twice. Retry-After delays up to five seconds are
honored; longer delays are returned to the client instead of retrying early. Inference POSTs
and WebSocket messages are not retried. Client abort/deadline signals stop HTTP waits and
close realtime sockets. A queue timeout/disconnect does not mean upstream work was cancelled.

## Streaming and realtime

`transport: "stream"` forwards actual Fal SSE output in order. It requires a documented
`/stream` schema path or catalog `metadata.stream_url`; a management override can supply
that metadata when catalog discovery omits it. Streaming preserves native partial/final
and separate reasoning fields. Queue logs/status are never presented as generated tokens.

`transport: "realtime"` opens a server-side WebSocket and returns native results as SSE.
The built-in fast-LCM contract uses the official `/realtime` OpenAPI components, with the
optional string/URI `image_url` from Fal's official realtime guide. That guide and the
published components differ: the latter omit `image_url`. The two sources, retrieval date,
required prompt and published field limits are recorded in `realtimeSchema.json`; the
unmodified upstream document is a test fixture. HTTP validation remains separate and strict.
Fast-turbo currently has no discoverable usable schema (404 on 2026-11-03), so it is not
advertised solely because the guide mentions its transport.

For another verified realtime endpoint, register an OpenAPI override containing
`"x-fal-realtime": {"path": "/realtime", "input_schema": {"type":"object", ...}}`.
The same transport-specific compiled validator checks the initial and every later message.
Cached HTTP definitions do not supply realtime validators. Overrides remain scoped to their
connection and pinned during refresh. Existing path-only overrides remain stored, but do
not advertise realtime; upgrade them with a valid `input_schema`. Registration rejects an
invalid upgrade. Ordinary direct/queue/HTTP-WebSocket inputs continue using the HTTP schema.

The response's `X-Request-ID` is the realtime job ID. Send additional inputs with
`POST /v1/fal/jobs/{id}` and `{ "input": { ... } }`. Each message passes the gateway's
authorization, quota, budget, and schema checks before it is sent on the existing socket.
DELETE or disconnect closes the socket. API keys never leave the server. Native MessagePack
output is decoded; native binary values remain available as `binary_base64`, and binary
image content additionally gets an authenticated download. No completion semantics are
invented for a persistent connection.

Realtime sockets are process-local and expire at the configured upstream request deadline.
Repeated messages must reach the same worker; a restart or another worker returns 410
instead of silently opening a new billable session. HTTP(S) CONNECT proxies are supported;
edge relays and other proxy transports explicitly reject realtime. The dashboard can start
and stop a realtime stream; repeated-message clients use the native POST API.

### HTTP over WebSockets

`transport: "http-websocket"` implements Fal's separate JSON/HTTP wire protocol at
`wss://ws.fal.run/{endpoint_id}`. It works with the ordinary HTTP input schema. The server
sends the input object directly, receives `start` with request ID/status/headers, then raw
body chunks and `end` with matching request ID/status/timing. MessagePack is not involved.
The gateway emits `http-start` and native SSE events where applicable. SSE response completion
emits `http-end` with HTTP metadata, without replacing the model's final snapshot; failed HTTP
responses emit `error`. JSON/text and binary responses emit `final` or `error` with the output
and HTTP metadata. Cumulative model output replaces the previous snapshot. Non-JSON error
text and upstream status/content type remain available.

Binary responses are delivered through authenticated
`GET /v1/fal/jobs/{id}?artifact={file_id}` downloads with their content type and filename;
the event contains an artifact URL. This avoids converting binary HTTP response bodies into
text. Files expire after 10 minutes, reside on the same worker, have a 32 MiB response limit
and a shared 128 MiB cache limit (oldest files may be evicted sooner). Fetch promptly.

Registered exact operation IDs such as `fal-ai/any-llm/stream` retain their own HTTP input
schema and path; the gateway never appends a second `/stream`. Register the operation's
schema when discovery exposes only the parent app. Final snapshots preserve explicit
null, false, zero and empty text; these values do not mean that completion is missing.

After `end`, clients can submit another invocation with `POST /v1/fal/jobs/{id}`. Every
invocation repeats authorization, quota, budget and schema checks and records one attributed
dispatch. A pending invocation returns 409 rather than accepting a duplicate. Each invocation
has a deadline; the socket also has the request lifetime limit. Disconnects never reconnect
or replay input. Cancellation, worker affinity and proxy limitations match realtime.

The dashboard incrementally decodes UTF-8/SSE across chunk boundaries, preserves native
event names, extracts and deduplicates downloads, and retains the latest 40 native events.
Partial, final and reasoning values remain separate. Truncated frames or upstream errors
remain visible without deleting files already received. Stopping the reader releases it
and closes a socket; it does not claim that a queued generation was cancelled. The JSON
editor accepts only a non-null object; invalid text remains editable and blocks execution.

## Outputs, reasoning, and accounting

Native JSON responses contain `output` (the original structured result) and `artifacts`
(all discovered media/file URLs with their original metadata and location in the result).
Meshes, textures, previews, filenames, MIME types, formats, dimensions, and durations remain
available without format conversion. The dashboard links every artifact for download;
interactive 3D rendering is not required. Fal media expiration still applies.

Sunburst's `quality=max` does not add an undocumented thinking flag. Wan's `enable_thinking`
and any-LLM's `reasoning` boolean retain their separate meanings. Reasoning controls appear
only when present in the schema. Reasoning output remains inside native `output`, separate
from the final answer where Fal provides separate fields.

Native dispatches use existing credential selection, connection scopes, account proxies,
key rate/quota/budget checks, sanitized errors, and attributed call logs. A schema/catalog
entry is not pricing evidence. Native calls with unknown prices invoke OmniRoute's existing
unpriced-usage policy; a limited key fails closed for subsequent inference until its allowance
is reset or pricing/policy is configured. This also covers uncertain, potentially billable
submissions. Unlimited keys remain usable. Retrieval does not charge the same job again.
This implementation does not report invented dollar costs for catalog-only models.

## Capability and verification matrix

| Capability                                                  | Execution / delivery                                                                         | Verification                                                                         |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Four GPT Image 2.5 Sunburst/Flare generation/edit endpoints | Compatibility images and native inputs; ordered references, masks, dimensions, `quality=max` | Official schemas; mocked adapter regressions                                         |
| Wan 3.0 reference-to-video                                  | Native queue/direct; image/video/audio references and thinking booleans                      | Official schema; mocked validation                                                   |
| Music / TTS / transcription / audio transformation          | Separate native schemas; ACE-Step, Kokoro, Whisper, Demucs and isolation fixtures            | Official schemas; mocked validation                                                  |
| 3D and multiple assets                                      | Native queue/direct; mesh, textures and preview downloads                                    | Hunyuan3D schema; mocked route/result lifecycle                                      |
| Text / vision / mixed analysis                              | Schema-driven native input and unmodified structured output                                  | Any-LLM reasoning fixture; other discovered schemas validated on demand              |
| Workflows / training / future categories                    | Native schema-driven model APIs, preserving catalog kind                                     | Adapter path available; account-specific endpoints not live-tested                   |
| Direct execution                                            | One Fal HTTP POST                                                                            | Mock-tested                                                                          |
| Queue submit / status / result / cancel                     | Persisted receipt; trusted upstream tracking URLs; no regeneration on GET                    | Mock-tested, including scope, cancellation and budget recovery                       |
| Generation/token SSE                                        | Native SSE; explicit schema/metadata transport declaration                                   | Mock-tested framing and ordering; no paid live test                                  |
| Realtime WebSocket                                          | Validated MessagePack inputs; native SSE output; per-message gateway checks                  | Official transport guide; mocked socket protocol and abort cleanup                   |
| HTTP over WebSockets                                        | Ordinary HTTP schema; start/body/end; native text/SSE and authenticated binary downloads     | Official wire documentation; mock peer and real-route authorization/accounting tests |
| Other/undocumented transports                               | Explicitly unavailable until supported schema/transport information exists                   | Unsupported, not inferred from category names                                        |

Fixtures in `tests/fixtures/fal/` were fetched from Fal's official model API on 2026-11-03.
They are discovery/schema evidence. All inference tests use mocked upstream responses;
**no paid upstream inference or live transport validation was performed**. Account access,
upstream behavior, prose-only constraints, and client rendering support remain separate
from schema validation and mocked protocol coverage.

Sources: [model search and OpenAPI](https://fal.ai/docs/platform-apis/v1/models),
[queue](https://fal.ai/docs/documentation/model-apis/inference/queue),
[streaming](https://fal.ai/docs/documentation/model-apis/inference/streaming),
[realtime](https://fal.ai/docs/documentation/model-apis/inference/real-time),
[HTTP over WebSockets](https://fal.ai/docs/documentation/model-apis/inference/websockets).
