---
title: "MiniMax Code Provider"
version: 3.8.53
lastUpdated: 2026-10-28
---

# MiniMax Code Provider

`minimax-code` (alias `mmcode`) routes OpenAI-compatible chat completions to
MiniMax Code: the subscription product behind the MiniMax Code desktop app and
the `mcode` CLI. It is a **no-auth** provider — a request needs no credential in
OmniRoute. Every request runs on the managed MiniMax subscription gateway, which
speaks the native tool protocol: a request that carries client `tools` comes back
as OpenAI `tool_calls`, a plain chat turn comes back as the text of the
assistant.

OmniRoute does not persist a separate provider credential in its connection
database. During a request, the provider reads the access and refresh tokens
from your local MiniMax Code profile (`~/.minimax`) to authenticate with the
gateway; when the account rotates a token, it **writes the refreshed credential
back** to that profile.

## Setup

Sign in to your MiniMax account — from the provider page (below) or with `mcode
login`; the credential lives in `~/.minimax/auth/prod/<region>/mcode-public/auth.json`.
Then add the provider in **Dashboard → Providers → Add Provider** (**MiniMax Code**,
no API key) and send a chat completion with the model `minimax-code/MiniMax-M3.1-Flash`
or `minimax-code/MiniMax-M3` — the only ids the provider accepts.

## Signing in from the dashboard

**Dashboard → Providers → MiniMax Code → Add connection** runs the MiniMax account
device-code flow — the same flow the CLI uses, so no extra tool is needed. The
panel asks the account service for a device code, shows the verification URL and
the code to confirm there, polls the service and, on success, writes the
credential into your local MiniMax Code profile — the same file the CLI reads.

The provider stays a **no-auth** provider: it can be enabled without any
connection, and the credential a request uses is the one in your local profile.
The dashboard connection is the account entry — it stores no access or refresh
token (those stay in the local profile only), it can be re-authenticated from
the panel, and it never routes a request. The profile is created when it is
missing, and the credential that was there before is kept: the account service
returns no account identity, so a sign-in never destroys an account the operator
cannot get back — pin the record with `MINIMAX_CODE_AUTH_RECORD` to go back to
the previous one. The account host follows the region: `MINIMAX_CODE_REGION=en`
(the default) talks to `account.minimax.io`, `cn` to `account.minimax.cn`, and
the region also decides which profile the credential is written to. Two instances
that share `~/.minimax` fight over the token — point `MINIMAX_CODE_PROFILE_DIR`
at a separate directory if you run more than one.

## Settings

| Setting                           | Default               | What it does                                                                 |
| --------------------------------- | --------------------- | ---------------------------------------------------------------------------- |
| `MINIMAX_CODE_GATEWAY_URL`        | the MiniMax endpoint  | Endpoint of the managed gateway (see below).                                 |
| `MINIMAX_CODE_GATEWAY_TIMEOUT_MS` | `60000`               | Budget (ms) of one gateway call: the refresh, the attempt and one retry.     |
| `MINIMAX_CODE_GATEWAY_RETRIES`    | `1`                   | Retries of a call that failed with a transient error.                        |
| `MINIMAX_CODE_MAX_INPUT_TOKENS`   | `1000000`             | Ceiling (input tokens) of one request. A larger one is refused with a `413`. |
| `MINIMAX_CODE_CONTEXT_WINDOW`     | `1000000`             | Window the gateway is asked for. `512000` narrows it to the catalog default. |
| `MINIMAX_CODE_MAX_TOKENS`         | `8192`                | Maximum number of tokens the gateway may answer with.                        |
| `MINIMAX_CODE_AUTH_FILE`          | the profile path      | Path of the auth profile that holds the access and the refresh token.        |
| `MINIMAX_CODE_PROFILE_DIR`        | `~/.minimax`          | Directory of the MiniMax Code profile.                                       |
| `MINIMAX_CODE_AUTH_RECORD`        | _(newest generation)_ | Record of the profile to use when it holds several accounts.                 |
| `MINIMAX_CODE_REGION`             | `en`                  | Region of the account: it decides the account endpoint and the profile.      |

A refusal above the ceiling of the gateway is request-scoped: it answers `413`,
not `400`, because a `400` with a model scope is classified as a model failure
and locks the model out of every fallback combo it belongs to.

## The gateway endpoint

The managed gateway URL is an **internal endpoint of the MiniMax Code app**, not
a documented public API — it is a subscription endpoint, not a published one.
OmniRoute identifies itself with the app's own user agent (`MiniMaxAgent`) and
the refresh call with the CLI's user agent (`minimax-code-cli`), because that is
what the endpoint expects.

The endpoint can change without notice. When it does, the request fails with the
status of the failure and names the transport — it never changes meaning
silently. The whole gateway call is bounded: the token refresh, one attempt, a
backoff and one retry share one budget (`MINIMAX_CODE_GATEWAY_TIMEOUT_MS`), so an
unreachable gateway cannot hold a model slot for long. `MINIMAX_CODE_GATEWAY_URL`
overrides the endpoint if your account or a proxy uses another one.

## Ownership and support

This provider is maintained in the OmniRoute repository: the provider code, this
page and the tests live there, and provider-specific defects belong in its issue
tracker. The gateway endpoint, the subscription and the credential belong to
**MiniMax** — a change on MiniMax's side shows up here as a transport error, not
as a provider defect.
