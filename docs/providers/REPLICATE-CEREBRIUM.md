# Replicate and Cerebrium chat providers

Added from the [Free-LLM](https://github.com/nejib1/Free-LLM) directory. Replicate does not speak the
OpenAI wire format, and Cerebrium needs a per-deployment URL, so each has its own handling.

## Replicate (`replicate`)

- Executor: `open-sse/executors/replicate.ts`.
- **Non-streaming:** `POST {base}/models/{owner}/{name}/predictions` with `Prefer: wait=60`; if the
  prediction is still running it is polled via `urls.get` every second for up to 120 s.
- **Streaming:** the prediction is created with `stream: true` and tokens are relayed from
  Replicate's native SSE endpoint (`urls.stream`, fetched without credentials). If the client
  disconnects, the running prediction is cancelled. If no usable stream URL is returned the
  executor falls back to polling and emits the finished answer as one chunk.
- **Usage and finish reason:** token counts come from the prediction's `metrics`
  (`input_token_count`, `output_token_count`), falling back to a length estimate.
  `finish_reason` is `length` when output reached `max_tokens`.
- **Models:** `owner/name` uses the official-model route; `owner/name:version` (pinned or
  community models) goes to `/predictions` with a `version` field. Other shapes get a 400.
- **Input mapping:** system prompt becomes `system_prompt`; `tool` results and assistant
  `tool_calls` are kept in the transcript as text; the first image part is sent as `image`
  for vision models.
- **Safety:** the Bearer token is only sent to the origin of the original request. Poll or
  cancel URLs on another origin are refused, and stream URLs must be https on `replicate.com`.
  On timeout the prediction is cancelled. Errors keep the upstream status and `Retry-After`
  and go through `buildErrorBody`.
- Registered for chat in addition to the existing Replicate video registry entry.

### Remaining limitations

- Replicate language models have no native tool/function calling; a request's `tools` list
  is not forwarded (tool messages are only carried as transcript text).
- `stop`, `response_format` and extra images are not mapped (input names differ per model).
- Replicate's own `metrics` are only present once a prediction has finished, so a streamed
  response reports usage from a final lookup (falls back to an estimate if that lookup fails).
- Not advertised as free (`hasFree: false`); trial runs are unverified.
- The request and response shapes follow Replicate's public docs and are covered by
  mocked-fetch tests; they have not been exercised against the live service.

## Cerebrium (`cerebrium`)

- Executor: `open-sse/executors/cerebrium.ts` (extends the default OpenAI-format executor).
- There is no shared endpoint. Each deployment has its own OpenAI-compatible URL ending in
  `/run`, for example `https://api.cerebrium.ai/v4/<project-id>/<app-name>/run`. Set it as
  the connection's **Base URL**; it is used verbatim (no `/chat/completions` suffix).
- A connection without a Base URL gets an immediate 400, so it never trips the connection
  cooldown or the provider circuit breaker.
- The seeded model ID (`meta-llama/Meta-Llama-3.1-8B-Instruct`) is only an example; use the
  model your deployment serves.
- Live model discovery is not enabled (each deployment defines its own routes).
- The Base URL field shows a hint with the expected `/run` format.
