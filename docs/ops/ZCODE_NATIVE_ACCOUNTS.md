---
title: "ZCode subscription accounts"
version: 3.8.54
lastUpdated: 2026-11-08
---

# ZCode subscription accounts

OmniRoute can use an authorized Z.ai or BigModel account through the official
ZCode native server runtime. Each stored account has isolated runtime state.
The runtime is an external dependency: this project does not distribute a
vendor executable, modify its authorization checks, or supply a subscription.

## Install the runtime

Install ZCode using its official distribution and obtain a compatible runtime
directory containing `node`, `server-core.js`, `zcode.cjs`, and their adjacent
dependencies. Use the runtime for the operating system and architecture of the
OmniRoute service. The tested deployment used an official Linux native runtime.

Pin a complete runtime outside the application checkout before updating OmniRoute:

```sh
node scripts/ops/install-zcode-native-runtime.mjs \
  --source /absolute/path/to/official/runtime \
  --data-dir /absolute/path/to/omniroute-data --activate
```

Run this from the installed OmniRoute package directory or a source checkout.
The installer hashes and copies the runtime, rejects escaping symlinks, and
activates it through an atomic manifest. It retains the previous runtime pointer.
Use the same data directory as the service's `DATA_DIR`; for containers, persist
that directory and use a Linux-compatible runtime. Copy only a runtime you are
entitled to use; the installer does not download or license one.

`ZCODE_NATIVE_RUNTIME` can select an explicit runtime directory instead. Without
an activated manifest, the manager also checks the service user's local
`~/.zcode/server/releases/` installation. Missing or incompatible runtimes fail
with a service error, without switching to an unrelated provider.

## Authorize accounts and choose tariffs

Open the ZCode provider page, choose **Add Account**, select International Z.ai
or China BigModel, and complete the provider's ordinary browser authorization.
OmniRoute polls the official login flow; passwords stay on the provider's site.
Stored access, refresh and ID tokens use the existing encrypted connection store.
The native host keeps refreshed account state across ordinary restarts.

The four executable model namespaces are:

| Account region | Start                          | Individual                          |
| -------------- | ------------------------------ | ----------------------------------- |
| International  | `zcode-start/glm-5.3-flash`    | `zcode-individual/glm-5.3-flash`    |
| China          | `zcode-cn-start/glm-5.3-flash` | `zcode-cn-individual/glm-5.3-flash` |

Use `glm-5.3` in the same namespaces when it is present in that tariff's native
catalog. Availability is checked at request time. A missing GLM-5.3 model is
never substituted with GLM-5.3-Flash. Pin a saved connection in a combo when
account identity matters. Unpinned region aliases select that region's account
pool. Start and Individual quota failures are scoped separately.

The existing unpinned `zcode` / `zc` local profile and its opt-in
`ZCODE_TRANSPORT=gateway` behavior remain available. Managed OAuth connections
use the native host; adding one does not replace the legacy local profile.

## Tools, buffering and resources

Model tool calls are returned to the calling application. The application runs
the tool and sends the result back. OmniRoute validates pending call identities
and recovers a native continuation when the caller's history or developer context
changes. It does not run the caller's shell tools itself.

The native account path waits for a complete model step before returning its
JSON or SSE representation. SSE is therefore buffered per step, rather than
incremental upstream token streaming. Reasoning is kept separate from visible
answer text. Token usage comes from native statistics, including per-turn deltas;
failure of an auxiliary usage read does not discard a completed tool call.

Native hosts and their worker processes consume substantial additional RAM.
Hosts are reused per account; request engines are disposed after completion.
Cold startup, model time, registry hydration and retries all affect latency.
Do not infer a latency or memory improvement over direct API access from the
presence of an SSE response. Measure the complete process tree under your own
workload, including concurrent accounts.
