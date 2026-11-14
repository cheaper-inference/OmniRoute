# Live launch smoke

`tests/launch-smoke/run.mjs` runs `omnirouter launch <tool>` against real tool installs. It is
advisory and never part of the default unit run.

Every run gets a fresh temp root with its own `HOME`, XDG dirs, `TMPDIR` and `DATA_DIR`. The
smoke never touches the real `HOME`: it snapshots the paths each tool would write to by default
(the `realHome` list in `tools/<id>.mjs`) before and after the run and fails when they change.

## Phases

| phase | gateway                                                        | keys               | cost |
| ----- | -------------------------------------------------------------- | ------------------ | ---- |
| A     | smoke stub (`smokeStub.mjs`), canned reply `OMNI-SMOKE-OK`     | none               | free |
| B     | real OmniRoute dev server + mock upstream (`mockUpstream.mjs`) | none               | free |
| C     | real OmniRoute dev server + your real provider connections     | real provider keys | real |

- **A**: one fresh stub per tool. Checks the protocol, the key header, the reply on stdout, the
  minted session, that the launcher temp dir is gone and no process is left. By default it also
  runs `--dry-run --json` first and checks it mints, revokes and sends no inference.
- **B**: starts the real gateway from this checkout (temp `DATA_DIR`, `127.0.0.1`), registers the
  mock upstream as a provider, then launches every tool that passed phase A and reads the
  session back from the gateway. Also checks the gateway lifecycle (auto start and stop when it
  is down).
- **C**: starts the real gateway, imports every `provider-*.json` file from the secrets dir with
  `omniroute providers import`, picks ONE real model (the cheapest priced, tool capable model
  with at least 64k context, or `--c-model`) and launches every tool with a marker prompt plus a
  tool use prompt. **Phase C uses real provider keys and costs real money.** Key values are only
  read by the gateway import, never printed or stored; the gateway `DATA_DIR` is deleted at the
  end.

## Configuration

| env var                | flag              | default                                                          |
| ---------------------- | ----------------- | ---------------------------------------------------------------- |
| `LAUNCH_SMOKE_SANDBOX` |                   | unset: no sandbox, tools are found on `PATH`                     |
| `LAUNCH_SMOKE_OUT`     | `--out <dir>`     | `<os tmpdir>/omniroute-launch-smoke` (`--out` wins over the env) |
| `LAUNCH_SMOKE_SECRETS` | `--secrets <dir>` | unset: phase C is skipped                                        |

`LAUNCH_SMOKE_SANDBOX` points at a tool install root. When set, `npm/bin`, `venv/bin` and `bin`
inside it are prepended to `PATH`, and the installed tools and versions come from
`tools.json` in it (`{ "<id>": { "status": "installed" | "global", "version": "..." } }`).
When unset, every tool with an expectation file whose executable is on `PATH` is run.

Other flags:

- `--phase a|b|c|all|a,b,c`: phases to run (default `a`; `all` means `a,b`)
- `--only claude,codex`: limit to these tool ids
- `--no-dry-run`: skip the phase A dry run check
- `--c-model <id>`: phase C model instead of the cheapest eligible one

Results go to `<out>/results.json` and `<out>/results.md`, logs to `<out>/logs`. Exit status
is 1 when any run failed.

## Running

```sh
npm run test:launch:smoke                                   # phase A, every installed tool
node tests/launch-smoke/run.mjs --phase b --only pi         # phase B for one tool
LAUNCH_SMOKE_SECRETS=<dir> node tests/launch-smoke/run.mjs --phase c --only pi
```

Without a secrets dir, phase C prints
`phase C skipped: set LAUNCH_SMOKE_SECRETS to a dir of provider-*.json exports` and does not
change the exit status.

Per tool expectations live in `tools/<id>.mjs`; the fields are described in `tools/SCHEMA.md`.
