---
title: "MiniMax Code Provider"
version: 3.8.53
lastUpdated: 2026-10-22
---

# MiniMax Code Provider

`minimax-code` (alias `mmcode`) routes OpenAI-compatible chat completions to
MiniMax Code: the subscription product behind the MiniMax Code desktop app and
the `mcode` CLI. It is a **no-auth** provider — a run needs no credential in
OmniRoute. It reads the credential from your own local MiniMax Code profile
(`~/.minimax`) and gives the run the same models the profile is entitled to.
You can also sign in to your MiniMax account from the provider page; the
credential that comes back is written into that same local profile.

## Transports

| Transport | What it does | When it is used |
| --- | --- | --- |
| `gateway` (default) | One call to the managed MiniMax subscription gateway. It speaks the native tool protocol, so a request that carries client tools comes back as OpenAI `tool_calls`. **No fallback**: a failing gateway answers with a `502` that names the transport. | Every request. |
| `cli` | Runs the locally installed MiniMax Code CLI (`mcode exec --output-format stream-json`) in the lightweight conversation profile — or on the shared agent below, when `MINIMAX_CODE_SHARED_AGENT` is on. | Opt-in (`MINIMAX_CODE_TRANSPORT=cli`). |
| `auto` | Requests with client tools to the gateway, plain chat to the CLI. | Opt-in (`MINIMAX_CODE_TRANSPORT=auto`). |

The gateway transport has **no fallback**: a request that cannot be answered
by the gateway fails with a `502` that names the transport. The local CLI stays
available as an explicit transport (`MINIMAX_CODE_TRANSPORT=cli`, or `auto` for
a plain chat turn) — but it never answers a request that asked for the gateway,
and it cannot honour the protocol of a request that carries client tools: the
CLI has no way to hand a tool call back to the client, so answering with prose
would make the client believe the turn is over without a single tool having
run.

## Setup

1. Install the MiniMax Code CLI and sign in (`mcode login`), or use an
   existing MiniMax Code session on the machine. The credential lives in
   `~/.minimax/auth/prod/<region>/mcode-public/auth.json`.
2. Add the provider in **Dashboard → Providers → Add Provider** and pick
   **MiniMax Code**. No API key is asked for.
3. Send a chat completion with the model `minimax-code/MiniMax-M3.1-Flash` or
   `minimax-code/MiniMax-M3`.

Models: `MiniMax-M3.1-Flash` and `MiniMax-M3`. The provider accepts only
these ids — a request for another model is rejected before it reaches MiniMax.

## Signing in from the dashboard

The provider page carries a sign-in action that runs the MiniMax account
device-code flow — the same flow the CLI uses, so no extra tool is needed:

1. **Dashboard → Providers → MiniMax Code → Add connection**. The panel asks the
   account service for a device code and shows the verification URL and the
   code to confirm there.
2. Open the URL, sign in to your MiniMax account and confirm the code.
3. The panel polls the account service. On success the credential is written
   into your local MiniMax Code profile — the same file the CLI reads — and the
   account appears in the panel as a connection.

The provider stays a **no-auth** provider: it can be enabled without any
connection, and the credential a run uses is the one in your local profile.
The dashboard connection is the account entry — it can be re-authenticated
from the panel, but it never routes a request.

Two things worth knowing:

- **The local profile has to exist.** A host that never ran `mcode login` has
  no `~/.minimax/auth/prod/<region>/mcode-public/auth.json` to write into:
  the dashboard account is created, but the credential cannot be placed in
  the profile until that profile exists.
- **The account host follows the region.** `MINIMAX_CODE_REGION=en` (the
  default) talks to `account.minimax.io`, `cn` to `account.minimax.cn`. The
  region also decides which profile the credential is written to.

## The credential is shared, and OmniRoute writes to it

OmniRoute **reads** the access and refresh token from your MiniMax Code
profile and, when the account rotates the token, **writes the refreshed
credential back** into that same profile, and keeps the CLI's session state
file in sync. Two consequences worth knowing:

- A request through this provider can re-authenticate your MiniMax Code
  desktop session.
- A second OmniRoute instance that shares `~/.minimax` will fight over the
  token with the first one. Point `MINIMAX_CODE_PROFILE_DIR` at a separate
  profile directory if you run more than one instance.

When the profile holds several accounts, the provider uses the record with
the newest generation — the one the CLI itself refreshes. Pin a specific
record with `MINIMAX_CODE_AUTH_RECORD` (the record key inside `auth.json`).

## The gateway has its own input ceiling

The two transports do not have the same limits. The local MiniMax Code
transport runs the models with their full context (1M for
`MiniMax-M3.1-Flash`, 512k for `MiniMax-M3`), and no OmniRoute setting
lowers it.

The managed gateway transport has a ceiling of its own. A request above
`MINIMAX_CODE_MAX_INPUT_TOKENS` (200000 by default) is refused locally
with a 413, because the gateway answers such a request with
`limit_exceeded` after minutes of work, and that failure locks the model
out of every fallback combo it belongs to. The refusal is request-scoped:
it says nothing about the health of the model, which is why it answers 413
and not 400.

Raise the ceiling only for a deployment whose gateway accepts more than
the default. A request that is too large for the gateway transport does
not become valid by raising the number.

## The gateway endpoint

The managed gateway URL is an **internal endpoint of the MiniMax Code app**,
not a documented public API. OmniRoute identifies itself with the app's own
user agent (`MiniMaxAgent`) and the refresh call with the CLI's user agent
(`minimax-code-cli`), because that is what the endpoint expects.

That has two practical consequences:

- The endpoint can change without notice. When it does, the request fails with
  a `502` that names the transport — it never changes meaning silently.
  `MINIMAX_CODE_TRANSPORT=cli` (or `auto`) is the way to keep working against
  the local CLI.
- The whole gateway call is bounded: one attempt of 60 s, a backoff and one
  retry. An unreachable gateway cannot hold a model slot for long.

`MINIMAX_CODE_GATEWAY_URL` overrides the endpoint if your account or a proxy
uses another one.

## One shared agent for every request

The local transport can run on **one shared agent** instead of one agent per
request. A MiniMax Code runtime costs a few hundred megabytes and a few
seconds of start-up; with one agent per request every concurrent request paid
that cost again, and each one added its own copy to the instance.

With `MINIMAX_CODE_SHARED_AGENT=true` the local transport speaks the **Agent
Client Protocol** (`mcode acp`) and keeps one agent per profile for the whole
process:

- only the **session** is per request, the process cost is paid once;
- an idle agent is closed after `MINIMAX_CODE_SHARED_AGENT_IDLE_MS`, which
  releases its memory;
- an agent that dies is replaced instead of handed out again;
- an aborted request cancels its turn in the agent and ends at once — it does
  not wait for the turn timeout.

The switch is a **deployment setting**, not a code constant: a host that wants
one process per request keeps the one-shot CLI run. The profile of the agent
is `MINIMAX_CODE_SHARED_AGENT_DATA_DIR`; empty uses the profile of the
credential.

The shared agent changes the transport, never the protocol: like the one-shot
CLI run it cannot answer a request that carries client tools — such a request
belongs to the gateway transport.

Three things the shared agent does differently from the one-shot CLI run, worth
knowing before it is switched on:

- **The one-shot CLI flags do not reach it.** `MINIMAX_CODE_PERMISSION`,
  `MINIMAX_CODE_MODE` and `MINIMAX_CODE_MAX_STEPS` configure the one-shot run;
  a shared agent session has its own permission model and runs as one turn.
  The host-tools opt-in (`MINIMAX_CODE_ALLOW_HOST_TOOLS`) still applies.
- **Usage is estimated.** The Agent Client Protocol carries no token counts, so
  the answer reports estimated usage (`usage.estimated = true`) instead of the
  real counts the one-shot run reports.
- **Every turn opens a session.** The protocol has no `session/close`, so the
  agent keeps the session state of the last turns until the idle timeout
  closes it.

## Host tools need an explicit opt-in

A CLI run in the **`standard` context** gives the agent the host tools (shell,
file, memory, web) — that context is what an agentic client asks for, and
`MINIMAX_CODE_MODE=standard` pins it for every run. Either way the host tools
are opt-in:

```
MINIMAX_CODE_ALLOW_HOST_TOOLS=true
```

Without it, a CLI run in the `standard` context is refused with a `400`. The
managed gateway never needs the opt-in — it only relays tool calls to the
client.

A CLI run works in `~/.omniroute/minimax-code-workspace` (or
`MINIMAX_CODE_CWD`), never in the server's own working directory, and the
resolved path is written to the run log. The run log also names the CLI binary
it used and the version that binary reported — pin the binary with
`MINIMAX_CODE_BIN=/absolute/path/to/mcode` to keep the run independent of
`PATH`.

## Ownership and support

This provider is maintained in the OmniRoute repository: the provider code,
this page and the tests live there, and provider-specific defects belong in
the repository's issue tracker. The gateway endpoint, the subscription and the
credential itself belong to **MiniMax** — OmniRoute talks to an internal
endpoint of the MiniMax Code app, so a change on MiniMax's side shows up here
as a transport error, not as a provider defect. Anything that needs a MiniMax
account (a subscription, a token, the app itself) is a MiniMax support
question.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| `MiniMax Code auth profile not found — run 'mcode login' first` | The profile is not where the provider looks. | `mcode login`, or set `MINIMAX_CODE_PROFILE_DIR` / `MINIMAX_CODE_AUTH_FILE`. A CN account needs `MINIMAX_CODE_REGION=cn`. |
| `502` on a request | The gateway is unreachable, or the request carries client tools on the CLI transport, which cannot execute them. | Check the gateway URL and the run log; the message names the transport. `MINIMAX_CODE_TRANSPORT=cli` answers a plain chat turn through the local CLI. |
| `400` on a CLI run in the `standard` context | The host tools are not allowed. | `MINIMAX_CODE_ALLOW_HOST_TOOLS=true`, or use the gateway transport. |
