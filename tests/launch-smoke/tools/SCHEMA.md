# Per-tool smoke expectations

One file per tool: `tests/launch-smoke/tools/<id>.mjs`, `export default { ... }`:

| field           | type                      | meaning                                                                                                                                                         |
| --------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`            | string                    | launcher tool id (matches tools.json key and `bin/cli/launch/adapters/<id>.mjs`)                                                                                |
| `mode`          | `"headless"` \| `"pty"`   | headless: one-shot run, must exit 0. pty: run under `script -qfc`, type `pty.input`, SIGINT after `pty.waitMs`                                                  |
| `model`         | string                    | fixture model id passed as `--model` (see `tests/launch-smoke/smokeStub.mjs` SMOKE_MODELS)                                                                      |
| `args`          | string[]                  | passthrough args after `--`, prompt text `reply with OK`                                                                                                        |
| `stdin`         | `"ignore"` \| `"newline"` | headless stdin: closed (`/dev/null`) or a pipe that receives one `\n` then EOF                                                                                  |
| `env`           | object                    | extra env for the launcher process; values may use `{ROOT}` (sandbox root) and `{HOME}` (sandbox HOME)                                                          |
| `realHome`      | string[]                  | paths relative to the REAL `$HOME` the tool would write to by default (snapshotted before/after)                                                                |
| `protocols`     | string[]                  | expected inference kinds: `chat`, `messages`, `responses`, `gemini:generateContent`, `gemini:streamGenerateContent`                                             |
| `keyHeaders`    | string[]                  | acceptable credential carriers: `authorization`, `x-api-key`, `x-goog-api-key`, `?key`                                                                          |
| `expectStdout`  | string                    | text that must appear on stdout (default `OMNI-SMOKE-OK`); `null` to skip (pty)                                                                                 |
| `timeoutMs`     | number                    | default 120000                                                                                                                                                  |
| `pty`           | object                    | `{ waitMs: 20000, inputDelayMs: 6000, input: "reply with OK\r" }` (pty mode only)                                                                               |
| `knownIssue`    | string                    | optional one line: a known launcher/adapter limitation the run is expected to surface                                                                           |
| `notes`         | string                    | optional: why these args/env (dossier section reference)                                                                                                        |
| `headlessProbe` | string[]                  | pty tools only: the tools.json one-shot args, run once headless (stdin closed, 60 s) to record why headless does not work; informational, does not fail the run |
