# Replicate and Cerebrium chat providers

Added from the [Free-LLM](https://github.com/nejib1/Free-LLM) directory. Neither speaks the
OpenAI wire format out of the box, so each has its own handling. Request/response shapes
were taken from the vendors' public documentation and covered with mocked-fetch tests only;
they have not been exercised against the live services.

## Replicate (`replicate`)

- Executor: `open-sse/executors/replicate.ts`.
- Request: `POST {base}/models/{owner}/{name}/predictions` with `Prefer: wait=60`; if the
  prediction is still running it is polled via `urls.get` every second for up to 120 s.
- Safety: the Bearer token is only sent to the origin of the original request. A `urls.get`
  or `urls.cancel` on another origin is refused. On timeout the prediction is cancelled
  (best effort) so it stops billing and a combo fallback does not duplicate the work.
- Errors keep the upstream status and `Retry-After`; messages go through `buildErrorBody`.
- Registered for chat in addition to the existing Replicate video registry entry.

### Known limitations

- **Streaming is synthesized.** The whole prediction finishes first, then one content chunk is
  emitted. No bytes reach the client until then (up to about 3 minutes). Replicate's native
  SSE (`urls.stream`) is not used.
- **Usage is estimated** (characters / 4) instead of using `metrics.input_token_count` and
  `output_token_count`; streaming responses report no usage.
- **Text only.** Image parts, `tool` messages, `stop`, `tools` and `response_format` are
  ignored, and `finish_reason` is always `stop`.
- **Official models only.** Versioned (`owner/name:version`) and community model IDs are not
  supported by the `/models/{owner}/{name}/predictions` route.
- **Not advertised as free** (`hasFree: false`); trial runs are unverified.

## Cerebrium (`cerebrium`)

- Executor: `open-sse/executors/cerebrium.ts` (extends the default OpenAI-format executor).
- There is no shared endpoint. Each deployment has its own OpenAI-compatible URL ending in
  `/run`, for example `https://api.cerebrium.ai/v4/<project-id>/<app-name>/run`. Set it as
  the connection's **Base URL**; it is used verbatim (no `/chat/completions` suffix).
- A connection without a Base URL gets an immediate 400, so it never trips the connection
  cooldown or the provider circuit breaker.
- The seeded model ID (`meta-llama/Meta-Llama-3.1-8B-Instruct`) is only an example; use the
  model your deployment serves.
- Live model discovery is not enabled (the deployment's `/models` support is unknown).
