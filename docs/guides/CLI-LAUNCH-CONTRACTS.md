---
title: "Shared CLI launch and configuration contracts"
version: 3.8.51
lastUpdated: 2026-09-21
---

# Shared CLI launch and configuration contracts

The neutral `config/cli-tools-manifest.json` contract declares canonical IDs,
aliases, binary candidates, setup recipes, model arguments and capabilities.
The plain Node adapter in `bin/cli/cli-manifest.mjs` and the TypeScript adapter
in `src/shared/constants/cliIntegrationManifest.ts` read the same file.
Runtime, catalog, configure, completion, generators and backend registration
are checked together by `tests/unit/cli/cli-manifest-drift.test.ts`.
Being cataloged does not mean that a tool can be launched or configured.
In particular, 5dive remains configure-only.

## Child environment and lifecycle

`omniroute run`, `omniroute launch` and `omniroute launch-codex` inherit an
OS/terminal compatibility allowlist and inject the selected target's credentials.
Unrelated provider and database secrets are not inherited by default.
`--inherit-env` explicitly restores full parent-environment inheritance; only
use it when the selected third-party process should receive those values.
This is environment filtering, not an OS sandbox: the process still runs with
the caller's filesystem permissions.

Interrupt and termination signals are forwarded to the child. The launcher
waits for the child's close event before removing temporary configuration.
`OMNIROUTE_CHILD_SIGNAL_TIMEOUT_MS` controls the grace period before forced
termination (default 5000 milliseconds).

## Gemini persistent setup

```bash
omniroute setup-gemini --remote https://omni.example --model provider/model --yes
omniroute configure gemini --model provider/model --yes
omniroute run gemini --model provider/model --dry-run --json
```

The first two commands configure this machine for the selected local or remote
server. Setup preserves unrelated JSON settings, selects Gemini API-key auth,
and writes the endpoint and credential to a private `.gemini/.env` file.
It refuses invalid JSON rather than overwriting it. Endpoint URLs must be
HTTP(S), without embedded credentials, query parameters or fragments.
Dry-run prints paths, not credential values.

`GEMINI_CLI_HOME` or `--gemini-home` selects the persistent home root.
An actual `run gemini` creates and later removes its own temporary home.
Neither mode bypasses Gemini's workspace-trust checks.

## Codex profiles

`configure codex` writes a private `<name>.config.toml` with a model and its
OmniRoute provider endpoint. Credentials are referenced through
`OMNIROUTE_API_KEY`, never embedded. The launch command sets the selected
model at the top-level `model` key, not inside `model_providers`.

Separate profile files are the current documented Codex contract; they overlay
the user configuration when selected with `codex --profile <name>`.
See [the official profile reference](https://learn.chatgpt.com/docs/config-file/config-advanced#profiles)
and [the OmniRoute Codex guide](./CODEX-CLI-CONFIGURATION.md).

## Hermetic command execution

With an explicit `DATA_DIR`, setting
`OMNIROUTE_CLI_SKIP_DEFAULT_DATA_ENV=1` prevents startup from falling through
to the default user data directory's credential environment. This is useful for
isolated tests. It does not disable other explicitly selected environment files.

## Working-directory `.env`

The CLI reads `.env` files in this order, and the first file to set a key wins:
the explicit `DATA_DIR`, the default data directory, the current working
directory, then the package directory. Shell variables always win.

The working directory may belong to someone else (a cloned repository, an
unpacked archive), and `omniroute serve` passes the CLI environment on to the
server and to every tool the server runs. So a `.env` there may set only these
keys, listed in `bin/cli/utils/untrustedCwdEnv.mjs`:

| Key                                  | Accepted values                                                       |
| ------------------------------------ | --------------------------------------------------------------------- |
| `PORT`, `API_PORT`, `DASHBOARD_PORT` | a number from 1 to 65535                                              |
| `REQUIRE_API_KEY`                    | exactly `true`, `1` or `yes`, the values the server treats as on      |
| `LANG`, `LC_ALL`, `LC_MESSAGES`      | up to 64 letters, digits, `_`, `.`, `@` or `-`                        |
| `LANGUAGE`                           | the same, plus `:`                                                    |
| `TZ`                                 | up to 64 letters, digits, `_`, `+`, `-` or `/`, not starting with `/` |
| `NO_COLOR`, `FORCE_COLOR`            | up to 16 letters and digits                                           |

Every value `REQUIRE_API_KEY` accepts turns the check on, so the file cannot
turn the check off itself. It does not decide the result, though: the server
reads a `REQUIRE_API_KEY` override stored in the database before the
environment, while the startup warning about listening on all interfaces
without an API key reads only the environment. With a stored override of
`false`, a working-directory `REQUIRE_API_KEY=true` leaves the API open and
hides that warning. The `TZ` rule is narrower than POSIX: it rejects `.`, `:`,
`,` and `<>`, so the `:Area/City` form and rules such as
`EST5EDT,M3.2.0,M11.1.0` have to be set in the shell or in `<DATA_DIR>/.env`.

Names must match exactly, in upper case. Any other line, a value that fails its
check, and a name that is not plain ASCII letters, digits and `_` (for example
one with a NUL byte or a look-alike letter) are skipped. The CLI prints one
warning that names the keys it cannot set and one that names allowed keys it
ignored, each with what to change (`PORT (expected a port number from 1 to
65535)`, `port (write the name as PORT)`). Neither prints the values. File
paths in these messages, and the `.env` path `omniroute doctor` reports, are
escaped when they contain control or bidi characters. The restriction does not apply when the working directory is the
data directory or the package directory.

A port from that file still decides which local port the CLI talks to. A
process that listens on that port receives the CLI's API key, the context
token, and the CLI machine token (`x-omniroute-cli-token`, see
[CLI_TOKEN.md](../security/CLI_TOKEN.md)), which the local server accepts for
management calls from loopback. On a machine shared with other users, do not
run `omniroute` in a directory whose `.env` sets a port you did not choose.

The parser has no `export` syntax. A line such as `export LD_PRELOAD=...` names
a variable `export LD_PRELOAD`; from the working directory it is skipped, and
in other `.env` files it sets that literal name, which nothing reads.

The CLI pairs a context's stored token (access token or legacy API key) only
with that context's own origin: scheme, host and port, compared as
`URL.origin`. This applies to requests made through the CLI's HTTP client
(`--base-url`, `OMNIROUTE_BASE_URL`, `omniroute connect <new-url>`) and to the
`launch`, `launch codex`, `configure` and `setup-*` commands that write a base
URL and key into another tool's config. Pointed at another server with
`--remote`, they use an explicit `--api-key` or `OMNIROUTE_API_KEY` if one is
set, and no context token. The comparison is exact, so `localhost` and
`127.0.0.1`, or a host with and without a trailing dot, count as different
servers and get no context token. A URL with userinfo, a backslash or
whitespace never matches, because other URL parsers (Python's `urllib` and
`httpx`, for example) can read a different host from it.
