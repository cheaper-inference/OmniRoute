---
title: Rosebud AI
description: Native Rosebud asset generation, credits, authorization and MCP tools.
---

# Rosebud AI

Rosebud is an asset provider, not a chat model. OmniRoute uses the official
`@rosebudai/cli` and the connected account's existing Rosebud credits. It never
converts those credits into tokens or an invented USD price, buys credits, or
falls back to another provider. There is no default spending cap. `maxCredits`
is an optional caller-selected safeguard.

## Installation and authorization

Install Node.js 22 or newer and the official CLI on the **OmniRoute server**:

```sh
npm install --global @rosebudai/cli@0.2.0
```

Set `ROSEBUD_CLI_BIN` to the executable, or `ROSEBUD_CLI_SCRIPT` to the absolute
path of the package's `dist/cli.js` (executed with OmniRoute's Node runtime).
The executable cannot be selected by an HTTP request.

Open **Providers → Rosebud AI → Connect Rosebud account**. Follow the private
approval link, then click **Check authorization and credits**. Refresh models to
populate the image catalog. Each connection has a separate server-side CLI
credential directory; approving the same logged-in browser account twice does
not provide another subscription. Check the returned Rosebud display name.

For containers, persist `ROSEBUD_DATA_DIR` (default `$DATA_DIR/rosebud`) on a private
volume owned by the server UID. Credentials are in `accounts/<profile>` beneath
that root and must not be sent to clients, committed, or included in images.
The CLI enforces private file permissions. Mount the CLI package read-only and
the data volume read/write. A login on a laptop is not a login in the container.

`ROSEBUD_CONCURRENCY` controls local CLI concurrency (default 2). This is a process
resource limit, not a credit allowance. Model schemas, current credit prices and
licenses come from `rosebud assets models`, not a baked-in model list.

## Native images

```http
POST /v1/images/generations
Authorization: Bearer <OMNIROUTE_API_KEY>
Idempotency-Key: city-v1
Content-Type: application/json

{
  "model": "rosebud/flux-2-flash",
  "prompt": "A futuristic city at sunset",
  "response_format": "b64_json",
  "rosebud_inputs": {"asset_type": "background", "output_format": "png"}
}
```

The request must originate from trusted loopback/LAN, just like OmniRoute's
other CLI-backed generation handlers. Normal API-key model and connection
policies still apply. The handler validates the live model's inputs, quotes,
starts a durable job, waits, validates the output's format and returns Base64.
`n` must be 1. Unknown parameters (including unsupported size options) are
rejected instead of silently ignored. SVG and image transformations without a
text prompt use the specialized asset API. No public file hosting is created.

The response includes `rosebud_usage` with the job identifier and native credit
accounting. Unknown actual charges/refunds remain absent; USD cost is `null`.

## Specialized assets and MCP

The local management API is `POST /api/rosebud/<action>`. It requires management
authorization; these process-spawning endpoints are classified local-only.
Actions: `connect`, `authorize`, `account`, `models`, `quote`, `generate`, `status`,
`recover`, `list`, `download`, `publish`, `update`, `game_status`, `pull`.

```json
{
  "connectionId": "<connection UUID>",
  "request": {
    "model": "rosebud/rosebud-skybox",
    "category": "skybox",
    "input": { "prompt": "A peaceful mountain valley", "mode": "surface" },
    "idempotencyKey": "valley-sky-v1"
  }
}
```

`generate` returns a job ID, usually with HTTP 202. Submit
`{"connectionId":"...","jobId":"..."}` to `status`, then `download` when
succeeded. Download returns validated Base64, MIME type and SHA-256, never a
server filesystem path. Job IDs are bound to the account profile. A started request never rotates to a different Rosebud account. Keep job IDs
and idempotency keys to resume after a timeout. A different payload using the
same idempotency key returns 409.

MCP tools (management scope required): `rosebud_models`, `rosebud_account`,
`rosebud_quote`, `rosebud_generate_image`, `rosebud_generate_sprite`,
`rosebud_generate_skybox`, `rosebud_generate_3d_model`, `rosebud_generate_sound`,
`rosebud_generate_music`, `rosebud_generate_video`, `rosebud_generate_speech`,
`rosebud_asset_status`, `rosebud_recover_asset`, `rosebud_list_assets`,
`rosebud_download_asset`, `rosebud_publish_game`, `rosebud_update_game`,
`rosebud_game_status`, `rosebud_pull`.

Inspect the live catalog first: categories can require inputs such as skybox
`mode`, a source image or a source 3D model. Sprite generation uses an image
model with its supported `asset_type` input; it does not promise animation.
These tools use OmniRoute's existing authenticated MCP HTTP client and scope
checks. They do not start a second router. There is no dedicated A2A skill yet;
A2A clients may use an authorized MCP-capable agent or these HTTP endpoints.

## Publishing

Publishing and asset generation are separate operations. Publishing accepts an
explicit, stable `game.gameId` UUID and a map of relative filenames to UTF-8
contents in `game.files`, plus optional title/description. Use the same ID for
updates/status/pull; updates preserve the CLI's conflict/version checks. Do not
retry an uncertain first publish with a new ID. The CLI's saved project handle
is authoritative. Binary game-bundle uploads are not exposed by this adapter.
The Rosebud editor and Rosie chat are not exposed as chat endpoints.

## Recovery and accounting

Rosebud's CLI stores the upstream idempotency key before sending a paid request.
OmniRoute additionally persists its own job and account binding. Recovery can
re-run a submission only when the CLI's matching durable pending record still
exists. A lost acknowledgement without that record requires reconciliation;
OmniRoute will not guess and pay twice. Cancellation stops waiting, not a remote
Rosebud job. The official CLI does not offer remote job cancellation.

Insufficient credit is returned as HTTP 402, authentication failures as 401,
throttling as 429. The CLI handles its documented bounded throttling waits.
Credit events are upserted by job ID, so repeated status reads do not double
count. The account panel exposes the live balance and native-credit history.
Completed artifacts and job records are retained in the private data volume;
operators must include it in their storage/backup policy. No cleanup removes
uncertain or in-flight jobs.

## Validation

```sh
node --import tsx/esm --test --test-force-exit tests/unit/rosebud-*.test.ts
```

Fixtures cover schema rejection, prompt argument safety, account isolation,
idempotency conflicts, uncertain outcomes, credit exhaustion, native image
dispatch and private artifact responses. Live verification requires an approved
Rosebud account. A successful CLI-only invocation is not endpoint acceptance.

Official references: [asset instructions](https://rosebud.ai/developer-assets/AGENTS.md),
[CLI](https://github.com/rosebudai/rosebud-cli), and
[publishing documentation](https://rosebud.ai/developers/agent-publishing/docs).

Live image verification (spends existing account credits): set `ROSEBUD_LIVE_TEST=1`,
`OMNIROUTE_BASE_URL`, `OMNIROUTE_API_KEY` (management scope), and
`ROSEBUD_CONNECTION_ID`, then run
`node --test tests/integration/rosebud-live.test.mjs`.
Use an account without concurrent external generation when comparing balances.
The private job directory is owned by one OmniRoute server process; sharing it
between independently running servers is unsupported. A missing or malformed
crashed-worker lease requires operator reconciliation rather than guessed retries.

MCP artifact downloads place intact Base64 data in `structuredContent.b64_data`; the text block contains only metadata so accessibility text shortening cannot corrupt the artifact. HTTP downloads return their existing Base64 JSON field.

## Retry and account permissions

Image requests carrying an `Idempotency-Key` header (or `idempotency_key` field)
are pinned durably to the original connection, scoped to the client API key.
Retries cannot switch to another account, including when that account is unavailable.
Reusing a key with changed inputs returns 409. Supply a stable key for retryable
client requests; a request without a key represents a new generation.
After submission, pending or artifact-failure responses include `rosebud_usage.job_id`
and return 422 with `x-should-retry: false` so clients can retrieve the original job instead of submitting again.
Definitively unpaid transient failures may be retried with the same key.

Every Rosebud HTTP operation requires authenticated management access even when
ordinary dashboard login is disabled. Management API keys must also include the
requested connection in their connection scope. HTTP MCP calls inherit that same
check. Dashboard administrators retain their normal management authority. The
upstream CLI independently enforces asset and game-publishing authorization scopes.

After an uncertain publish, use `rosebud_game_status` to inspect the original game.
Status remains available while its mutation lock is retained. Reconcile the official
CLI project state before an operator removes a retained `operation.lock`; never
remove it solely to retry a potentially successful publication.

Deleting an OmniRoute connection does not erase retained jobs, artifacts, or the
external CLI grant. Revoke the grant with the official `rosebud logout` command,
using that connection's private `ROSEBUD_CREDENTIALS_DIR`, before removing its
credential directory. Retain uncertain job evidence until it is reconciled.

Client idempotency keys are namespaced consistently across the image and tool APIs.
Requests from different API keys cannot accidentally reuse each other's generation.
Accounts are selected only from model-capable connections. A newly introduced
artifact format without a supported signature is rejected before submission,
not charged and discarded afterward. Retrying jobs made by pre-release versions
without caller-scoped keys requires their original job IDs.

MCP generation tools require a stable `idempotencyKey`; reuse it when retrying
that operation. Image models listing both raster and non-raster output formats
require an explicit raster `rosebud_inputs.output_format` for the native image
endpoint. Prompt-free transforms remain available through the specialized tools.
For a retained `reclaim` directory, verify that no worker owns the operation and
reconcile its upstream state before an operator removes the stale marker.
