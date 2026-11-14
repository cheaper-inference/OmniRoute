---
title: "Launching coding tools with omnirouter launch"
version: 3.8.54
lastUpdated: 2026-11-13
---

# Launching coding tools with `omnirouter launch`

`omnirouter launch <tool>` starts an AI coding tool (Claude Code, Codex, OpenCode and others)
pointed at your OmniRoute gateway, for one session. It:

- starts a local gateway if none is running, and stops it again after the last launch exits,
- mints a short-lived launch session token for the tool, so every request is tagged to this launch,
- shows the tool a model list built for it (protocol, tool calling, context window, your favorites),
- writes any tool config it needs to a private temp directory, never to your own tool config,
- prints a usage and cost line for the session when the tool exits.

Nothing about your other clients changes: the tailored model list is visible only to the tool
the launch started.

`omnirouter` is a second bin of the `omniroute` package. The older `omniroute launch` and
`omniroute run <tool>` commands keep working as before (see
[CLI-LAUNCH-CONTRACTS.md](./CLI-LAUNCH-CONTRACTS.md)).

## Quick start

```bash
omnirouter launch --list                     # which tools are installed and launchable
omnirouter launch claude                     # start Claude Code; gateway auto-starts
omnirouter launch codex -m openai/gpt-5.2    # pick the model on the command line
omnirouter launch opencode --dry-run         # show what would run, change nothing
omnirouter launch claude -- --resume         # everything after -- goes to the tool
```

You need at least one provider connected in OmniRoute (`omniroute setup`). With none, the launch
stops with `NoProviders` (exit 69).

## Supported tools

`core` tools are golden-tested and listed first. `supported` tools are golden-tested and smoke
tested on demand. `omnirouter launch --help` prints the same list with aliases (for example `cc`
for `claude`, `dsh` for `deepseek`, `cn` for `continue`).

"Model list" says how the tool learns its models: `inject` writes the list into the tool's own
config for this launch, `server-view` makes the gateway's `/v1/models` answer with the list for
this session only, `both` does both.

| Tool       | Name               | Tier      | Binary                 | Model list  | How the tool is configured                                           | Notes                                                                                     |
| ---------- | ------------------ | --------- | ---------------------- | ----------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `aider`    | Aider              | core      | `aider`                | inject      | Temp `--env-file` (key, base URL) and `--model-metadata-file`        | Model required. Model, weak and editor model pinned to one id.                            |
| `claude`   | Claude Code        | core      | `claude`               | inject      | Routing in process env, temp `--settings` file with `modelPicker`    | Min 2.1.83, picker 2.1.242+. Profiles. Min context 32k.                                   |
| `cline`    | Cline              | core      | `cline`                | inject      | `CLINE_SANDBOX=1`, temp data dir with providers/models JSON          | Min 3.0.67. Sandbox mode drops task history and global settings.                          |
| `codex`    | OpenAI Codex CLI   | core      | `codex`                | both        | `-c` runtime overrides, model catalog in state dir, key in child env | Min 0.134.0. Model required. Profiles. Min context 32k.                                   |
| `crush`    | Crush              | core      | `crush`                | inject      | Launcher-owned `crush.json` in a Crush data dir                      | Min 0.101.0. Only models with known context are listed.                                   |
| `deepseek` | DeepSeek Harness   | core      | `dsh`                  | inject      | `dsh web --patch` with a temp YAML patch, key in env                 | Model required. Node >=24.9.0. Min context 98304.                                         |
| `hermes`   | Hermes Agent       | core      | `hermes`               | inject      | Temp `HERMES_HOME` with one `config.yaml`, key by env reference      | Min context 64k. Runs `hermes gateway stop` on exit.                                      |
| `omp`      | Oh My Pi           | core      | `omp`                  | inject      | `-e` extension file plus `--config` overlay in temp/state dirs       | Min 18.8.5. Min context 32k.                                                              |
| `openclaw` | OpenClaw           | core      | `openclaw`, `clawdbot` | inject      | Temp config and state, embedded `tui --local`                        | Min 2026.11.0. Node >=24.16.0 <25 or >=26.1.0. Min context 4k.                            |
| `opencode` | OpenCode           | core      | `opencode`             | inject      | `OPENCODE_CONFIG_CONTENT` env (inline JSON config)                   | Min 1.18.30. v2 launches with `--standalone`. Min context 32k.                            |
| `pi`       | Pi                 | core      | `pi`                   | inject      | `-e` extension file registers the provider, key in env               | Min 0.85.1. Min context 32k.                                                              |
| `qwen`     | Qwen Code          | core      | `qwen`                 | inject      | Temp system settings file via `QWEN_CODE_SYSTEM_SETTINGS_PATH`       | Model required. Recommended 0.27.0, no hard minimum.                                      |
| `continue` | Continue CLI       | supported | `cn`                   | inject      | `cn --config` with a temp YAML, `CONTINUE_GLOBAL_DIR` in temp dir    | Node >=20. Recommended 1.5.0. Lists up to 20 models.                                      |
| `copilot`  | GitHub Copilot CLI | supported | `copilot`              | inject      | `COPILOT_PROVIDER_*` env vars, `COPILOT_OFFLINE=true`                | Min 1.0.109. Model required, one model only. Errors if `COPILOT_PROVIDERS_CONFIG` is set. |
| `gemini`   | Gemini CLI         | supported | `gemini`               | inject      | `GEMINI_CLI_HOME` temp dir with settings, base URL and key in env    | Min 0.25.0, recommended 0.68.0. Model required.                                           |
| `goose`    | Goose              | supported | `goose`                | server-view | Env only, `GOOSE_PATH_ROOT` temp dir, OpenAI chat provider           | Min 1.59.0. Model required. Min context 32k.                                              |
| `kilo`     | Kilo Code CLI      | supported | `kilo`, `kilocode`     | inject      | `KILO_CONFIG_CONTENT` env (inline JSON config)                       | Min 7.8.27. Min context 32k. Lists up to 100 models.                                      |
| `kimi`     | Kimi Code CLI      | supported | `kimi`                 | inject      | `KIMI_MODEL_*` env overlay, nothing written to config                | Min 2.0.0, recommended 2.6.2. Model required.                                             |
| `pool`     | Poolside Pool      | supported | `pool`                 | server-view | Env only (`POOLSIDE_STANDALONE_*`), no files                         | Model required. macOS and Linux only. Never auto-installed (EULA).                        |

## Per-tool notes

- `claude`: Claude Code can save a default model into your `settings.json` when you pick one with `/model` and press Enter. The launcher never writes that file, but it compares the `model` key after exit and warns if it changed. Versions 2.1.83 to 2.1.241 get one custom model row and a warning instead of the full picker. A managed `availableModels` allowlist still filters the picker rows.
- `codex`: Everything rides on `-c` overrides, so your `config.toml` is not edited. The launcher warns after exit if Codex changed it (project trust or `/model`). Launched sessions pass `-c features.plugins=false`, because Codex otherwise starts a background clone of its plugin catalog that keeps running after the launch exits. This also turns off Codex plugins you installed, for that session only; add `-- -c features.plugins=true` to the launch to turn them back on.
- `copilot`: Only the chosen model is available in the session. Models under 128k context get a warning.
- `gemini`: Folder trust stays on, so trust the folder in Gemini CLI first or it will prompt (or fail headless). Non-Gemini models have `google_web_search` and `web_fetch` disabled. Auxiliary model alias names come from research and were not all verified live.
- `hermes`: Sessions, memory and skills live in a temp home and are discarded on exit. Teardown runs `hermes gateway stop` so the background gateway does not outlive the launch. The temp-home recipe and teardown are not verified on Windows (a warning is shown).
- `openclaw`: Preflight refuses Node outside `>=24.16.0 <25 || >=26.1.0`, because OpenClaw rejects other versions. Gateway-attach flags are rejected since the launch uses `tui --local`.
- `deepseek`: Needs Node 24.9 or newer. Only the `web` profile is launched, and `--patch` and `--profile` are rejected.
- `opencode`: With OpenCode v2 the launcher adds `--standalone`, so the shared background service does not hide the injected config. `--server` attaches elsewhere and will not route through OmniRoute.
- `kilo`: `--attach` and `kilo attach` point at another server that ignores the OmniRoute config.
- `cline`: Rules, skills and hooks under `~/.cline` still load. After exit the launcher checks that the real Cline settings files were not changed.
- `qwen`: Qwen Code still writes to `~/.qwen` (settings migration, projects, memories). The launcher does not isolate it.
- `pool`: The installer is EULA-gated, so the launcher only prints the install command. Windows is rejected until the beta is checked.
- `goose`: Isolated config, sessions and keyring (`GOOSE_PATH_ROOT`). If the model's context is unknown, `GOOSE_CONTEXT_LIMIT` is left unset and a warning is shown.
- `crush`: Models without a known context window are left out of the list.
- `continue`: Needs Node 20 or newer (preflight).

## How the model list is scoped

Each launch builds one view of the gateway catalog for the tool:

1. The launcher mints a launch session (`olx_...` token) with your credential and reads
   `/v1/models` through it, so it sees exactly what your key may use.
2. By default it keeps only the models of providers you have a stored key or OAuth connection
   for (read once per launch from `GET /api/launch/providers`). Free keyless providers and the
   built-in `auto/*` routes are left out; your own combos stay. `--all-models` turns this off
   and shows the whole catalog. A gateway without that route (older or remote) gets the whole
   catalog and one warning line.
3. It filters that list for the tool: chat models callable over the tool's protocol, with tool
   calling, and at least the tool's minimum context window. Some tools (crush, hermes, openclaw)
   also need a known context window per model. A few tools cap the list (Claude Code's picker,
   continue at 20, opencode and kilo at 300 so their one-variable config stays under 100 KB,
   codex at 500). When opencode, kilo or codex hit their cap, rows are taken round robin across
   providers, so every connected provider stays in the list.
4. It orders the list: your favorites, then recent models, then catalog order.
5. Depending on the tool, the list is written into the tool's temp config (`inject`), attached
   to the session on the gateway (`server-view`), or both. Both paths use the same list.

Model ids are raw OmniRoute ids (`openai/gpt-5.2`, `auto/best-coding`), with no extra prefix.

The model is chosen in this order:

1. `-m, --model <id>` (with `--provider <id>` as a prefix when the id has no `/`). It is kept
   even when it comes from a provider you have no key for, or when a cap would cut it. An id
   that is not in the catalog fails with `ModelNotFound` and up to three close ids.
2. The default you saved with `--set-default`.
3. The model of your last launch of this tool.
4. The interactive picker, when stdin and stdout are a terminal and neither `--yes` nor `--json`
   is set. `--pick` opens it even when 2 or 3 apply.
5. `auto/best-coding` when it is in the view (only with `--all-models`), else the first model in
   the view.

Favorites are shared with the rest of the CLI (`DATA_DIR/model-preferences.json`); `--favorite`
and `--unfavorite` change them for the chosen model. The last model and the saved default live
in `DATA_DIR/launch/<tool>/`.

## Gateway lifecycle

With a local target (no `--remote`, no remote context):

- If a healthy gateway already answers on the port, the launch uses it. A gateway you started
  yourself is never stopped by a launch.
- If none is running, the launch starts one with `omniroute serve --headless --no-open` bound
  to `127.0.0.1` on the port (default `PORT` or 20128), under a small detached reaper process,
  and waits for it to become healthy (60 s, `--start-timeout <ms>` or
  `OMNIROUTE_READY_TIMEOUT_MS`).
- Every running launch holds a lease in `DATA_DIR/launch/leases/`, refreshed every 15 s. A lease
  whose process died or that is older than 45 s counts as gone.
- When no lease has been live for the idle grace (10 s, `OMNIROUTE_LAUNCH_IDLE_GRACE_MS`), the
  reaper stops the gateway it started. Back-to-back launches within the grace reuse it.
- Several launches at once share one gateway. A second launcher that finds the gateway still
  starting waits for it instead of starting another.
- If the launcher is killed (`kill -9`, closed terminal), its lease goes stale and the gateway is
  still stopped after the grace.

The gateway log is `DATA_DIR/launch/gateway.log`.

### Keeping or stopping a launcher gateway

```bash
omnirouter launch claude --keep-gateway   # the gateway this launch starts outlives it
omnirouter gateway status                 # running? started by a launcher? active launches
omnirouter gateway keep                   # keep the current launcher gateway running
omnirouter gateway stop                   # stop the launcher gateway now
```

After `gateway keep` (or `--keep-gateway`) the gateway is a normal gateway: launches never stop
it, and you stop it with `omniroute stop`. `omnirouter gateway stop` only stops a gateway a
launcher started; for one you started yourself it fails and points you at `omniroute stop`.
`omniroute stop` also works on a launcher gateway; running tools then lose their connection.

`--no-start` never starts a gateway and fails with `GatewayUnreachable` (exit 69) when none is
running.

### Remote gateways

`--remote <url>` (alias `--base-url`), or an active context whose URL is not loopback, targets a
remote gateway. Nothing is started or stopped; the gateway must be reachable and must support
launch sessions (`/api/launch/sessions`), otherwise the launch fails with `GatewayTooOld`
(exit 69). Use `omniroute run <tool>` against an older gateway.

The credential is taken from `--api-key` / `--token`, then `--api-key-env <NAME>`, then the
context's stored token (only for the context's own origin), then `OMNIROUTE_API_KEY`.

## Options

| Option                               | Meaning                                                                       |
| ------------------------------------ | ----------------------------------------------------------------------------- |
| `-m, --model <id>`                   | Model id. Default: saved default, last used, picker.                          |
| `--provider <id>`                    | Provider prefix for `--model`.                                                |
| `--pick`                             | Open the interactive picker even with a saved or last model.                  |
| `--all-models`                       | List every catalog model, not only providers you have a key for.              |
| `--favorite`, `--unfavorite`         | Add or remove the chosen model from favorites.                                |
| `--set-default`                      | Save the chosen model as this tool's default.                                 |
| `-p, --profile <name>`               | Tool profile, for tools that support it (claude, codex).                      |
| `--port <n>`                         | Local gateway port. Default `PORT` or 20128.                                  |
| `--remote <url>`, `--base-url <url>` | Remote gateway. No lifecycle.                                                 |
| `--context <name>`                   | Named context. Default `OMNIROUTE_CONTEXT`.                                   |
| `--api-key <key>`, `--token <key>`   | Credential for the gateway.                                                   |
| `--api-key-env <NAME>`               | Read the credential from this environment variable.                           |
| `--no-start`                         | Never auto-start the gateway; fail if it is down.                             |
| `--keep-gateway`                     | Keep a gateway this launch started running afterwards.                        |
| `--start-timeout <ms>`               | Gateway readiness wait.                                                       |
| `--inherit-env`                      | Pass the full parent environment to the tool.                                 |
| `--dry-run`                          | Print the launch plan (argv, env, temp files, secrets redacted). No effects.  |
| `--doctor`                           | Run checks for the tool (gateway, catalog, view, binary, version, preflight). |
| `--json`                             | Machine-readable plan, result, list, doctor report or error.                  |
| `-y, --yes`                          | Never prompt. Also the default when there is no terminal.                     |
| `--tag <name>`                       | Session tag for logs and cost. Default `launch:<tool>:<sessionId>`.           |
| `--no-summary`                       | Skip the usage line on exit (or `OMNIROUTE_LAUNCH_SUMMARY=0`).                |
| `--private`                          | Also turn off the tool's telemetry and nonessential traffic (claude).         |
| `--cleanup`                          | Remove stale leases and launcher temp dirs older than a day.                  |
| `--list`                             | List tools: tier, installed, version, why not launchable.                     |

Everything after `--` goes to the tool unchanged. Unknown options before `--` are an error.
`--budget`, `--budget-fallback`, `--mode`, `--compression`, `--mcp`, `--statusline`, `--exec`,
`--install` and `@<preset>` are reserved for a later release and fail with exit 2.

`--dry-run` and `--doctor` never start a gateway, mint a session or run the tool. If the gateway
is up they read its catalog to show the real view.

With `--json` on a real launch, the launcher prints
`{tool, sessionId, exitCode, summary, warnings}` to stdout after the tool exits. Errors print
`{error: {code, message, hint}}`.

The tool gets a filtered environment: OS and terminal variables plus what the launch sets.
Unrelated provider and database secrets are not passed on unless you use `--inherit-env`. See
[CLI-LAUNCH-CONTRACTS.md](./CLI-LAUNCH-CONTRACTS.md#child-environment-and-lifecycle).

## Exit codes

When the tool runs, the launcher exits with the tool's own code (130, 143 or 129 when it
forwarded SIGINT, SIGTERM or SIGHUP). Otherwise:

| Exit | Codes                                                                                                              | Typical cause                                                             |
| ---- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| 2    | `UsageError`, `ModelRequired`, `ModelNotFound`, `ModelUnsuitable`, `ConfigConflict`, `UnsupportedPlatform`         | Bad flag, unknown tool, reserved flag, model not in the view or too small |
| 69   | `GatewayUnreachable`, `GatewayTooOld`, `ToolVersionTooOld`, `FeatureUnsupported`, `PreflightFailed`, `NoProviders` | Gateway down or too old, tool too old, preflight failed, empty catalog    |
| 70   | `ViewInvalid`, `Internal`                                                                                          | Adapter or launcher bug; please report it                                 |
| 75   | `PortInUse`, `GatewayStartTimeout`, `StateLocked`                                                                  | Port held by another program, slow start, another launch holds the lock   |
| 77   | `AuthFailed`                                                                                                       | The gateway refused the credential (HTTP 401 or 403)                      |
| 127  | `ToolNotFound`                                                                                                     | Tool binary not found; the message shows the install command              |

`--doctor` exits 69 when any check fails, 0 otherwise. Warnings (for example a teardown step
that failed) never change the exit code.

## Troubleshooting

**Claude Code: `/model` + Enter changes your saved default.** Claude Code saves the model you
pick with `/model` and Enter into your own `settings.json`. The launcher never writes that file,
but it checks the `model` key after exit and warns if it changed, with how to restore it. Press
`s` in `/model` to switch for this launch only. Claude Code below 2.1.242 shows only one
OmniRoute model in its picker; upgrade for the full list.

**Hermes: "no model fits" or `ModelUnsuitable`.** Hermes refuses models under 64,000 tokens of
context, and the launcher needs a known context window to pass to it. Pick a model with a
larger, known context, or connect one.

**OpenClaw: `PreflightFailed` about Node.** OpenClaw needs Node `>=24.16.0 <25` or `>=26.1.0`.
Switch Node (for example with nvm) before launching.

**`GatewayStartTimeout` (75).** Read `DATA_DIR/launch/gateway.log`. A cold first start can take
longer than 60 s on slow disks: raise it with `--start-timeout 120000`.

**`PortInUse` (75).** Something other than OmniRoute holds the port. Free it or pass
`--port <other>`.

**"A launcher-started gateway already runs on port N".** A launcher gateway is up on another
port. Use `--port N` or stop it with `omnirouter gateway stop`.

**`StateLocked` (75).** Another launch held `DATA_DIR/launch/lock` for too long. If no other
launch is running, remove that file.

**`GatewayTooOld` (69).** The gateway has no launch-session API. Upgrade it, or use
`omniroute run <tool>`.

**`NoProviders` (69).** The catalog is empty, no provider you have a key for has a model that
fits the tool, or no model fits the tool at all (tool calling, context). Add a provider key with
`omniroute setup`, or pass `--all-models` to also list free keyless providers and `auto/*`, then
check with `omnirouter launch <tool> --doctor`.

**Leftover temp directories after a crash.** Run `omnirouter launch --cleanup`.

**Slow startup.** Set `OMNIROUTE_LAUNCH_TRACE=1` to print one stderr line per launch step
(module load, target resolve, gateway acquire, capabilities, session mint, catalog fetch,
connected providers, view compute, view patch, model pick, binary resolve, version probe, plan,
temp files, spawn) with the milliseconds since the process started. The lines name steps only,
never tokens or URLs. The tool version is cached in `DATA_DIR/launch/version-cache.json` per
binary path, size and modification time, so a changed binary is probed again; `--doctor` always
probes.
