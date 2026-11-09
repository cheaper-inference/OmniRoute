# CLI Integrations (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

Para sa nakabahaging executable na manifest, mga pinaghihigpitang child environment at patuloy na pag-setup Gemini, tingnan [ang mga kontrata sa paglulunsad CLI](./CLI-LAUNCH-CONTRACTS.md).

Nagpapadala OmniRoute ng pamilya ng mga `setup-*` command na nagko-configure ng coding CLI (Codex, Claude Code, OpenCode, Cline, …) para gamitin OmniRoute bilang backend nito — kaya ang tool ay nakikipag-usap sa** isa** mga ruta ng endpoint at OmniRoute sa tamang provider na may auto-fallback. Bawat utos ay nagbabasa ng** mabuhay** model catalog mula sa isang tumatakbong OmniRoute (lokal o remote) at isinusulat ang sariling config file ng tool sa** iyong** makina. Ang API key ay nire-reference ng isang environment variable kung saan man ito sinusuportahan ng tool. Ang mga utos na nagpapatuloy sa isang tool-local na environment file ay nakatala sa ibaba.

Mayroon ding generic na launcher — `omniroute run <target>` — na naglalabas ng `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` o `whycodes` na may tamang env na na-inject, nang hindi nagsusulat ng anumang config. Ang mga target at ang kanilang mga alias ay nagmula sa canonical manifest `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`), at `omniroute completion` ay nag-aalok ng parehong manifest-derived na target na salita. Ang legacy per-tool launcher — `omniroute launch` (Claude Code) at `omniroute launch-codex` (Codex) — ay nananatiling available.

Available ang onboarding ng provider mula sa parehong konteksto local/remote. Pinapanatili ng mga API-first na command sa ibaba ang pagpapatotoo ng pamamahala na hiwalay sa mga kredensyal ng provider at hindi kailanman magpi-print ng kredensyal sa structured na output:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Para sa mga script, mas gusto ang `--credential-stdin` o `--credential-env`; `--credential` ay pinanatili para sa kinokontrol na lokal na paggamit. Nangangailangan ang `providers remove` `--yes` sa isang non-interactive na terminal, at lahat ng limang command ay pinarangalan ang aktibong konteksto o ang pandaigdigang `--base-url`/`--api-key` na mga opsyon.

Tinatanggihan ng mga tagapili ng provider ang mga hindi maliwanag na prefix ID, pangalan o pangalan ng provider; gumamit ng buong koneksyon ID kapag nagtutugma ang ilang koneksyon. Gumawa at mag-edit ng mga command basahin ang naka-save na koneksyon pabalik, at ang pag-alis ay nagpapatunay na hindi na ito nababasa. Nilaktawan ng isang import ang isang umiiral na pares provider/name. Hindi ma-override ng mga na-import na entry ang endpoint ng pamamahala, konteksto o mga kredensyal ng pamamahala na ibinigay sa CLI.

Para sa isang beses, nakasulat-kamay na base setup ng dalawang pinakamayamang pagsasama, tingnan ang bawat-tool deep dives:

- [Claude Code configuration](./CLAUDE-CODE-CONFIGURATION.md)
- [pagsasaayos ng Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Remote Mode](./REMOTE-MODE.md) — magmaneho ng remote OmniRoute (VPS / Tailnet) mula sa iyong laptop
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — ang OmniCopilot extension; maaari din nitong patakbuhin ang mga `setup-*` command na ito para sa iyo mula sa loob ng editor

---

## Master table

Ang bawat utos ay nagpaparangal sa** aktibong konteksto** (itakda sa `omniroute connect`, tingnan ang [Remote Mode](./REMOTE-MODE.md) ) o tahasang mga flag `--remote <url> --api-key <key>`. Ang ibig sabihin ng "Local vs remote" sa ibaba ay: na walang mga flag na tina-target nito ang `http://localhost:20128`; na may `--remote` (o isang aktibong remote na konteksto) kinukuha nito ang catalog mula sa server na iyon at isinusulat ang config nang lokal.

| Utos                       | Tool                         | Kung ano ang isinusulat nito                                                                                                                                                              | Mga susing watawat                                                                                                                         | Lokal vs remote |
| -------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — isang profile sa bawat katugmang modelo ng teksto (`codex --profile <name>`)                                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | pareho          |
| `omniroute setup-claude`   | Claude Code                  | `~/.claude/profiles/<name>/settings.json` — isang profile sa bawat katugmang modelo (`CLAUDE_CONFIG_DIR`)                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | pareho          |
| `omniroute setup-opencode` | OpenCode (openai-compatible) | `~/.config/opencode/opencode.json` — `omniroute` provider sa bawat modelo ng catalog (`opencode -m omniroute/<model>`)                                                                    | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | pareho          |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (CLI mode) + prints VS Code extension settings                                                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | pareho          |
| `omniroute setup-kilo`     | Kilo Code                    | Pinagsasama `~/.local/share/kilo/auth.json` (CLI) + `kilocode.*` sa VS Code `settings.json` kung mayroon                                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | pareho          |
| `omniroute setup-continue` | Magpatuloy / `cn` CLI        | `~/.continue/config.yaml` — mga modelo `provider: openai`, susi sa pamamagitan `${{ secrets.OMNIROUTE_API_KEY }}`                                                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | pareho          |
| `omniroute setup-cursor`   | Cursor                       | Wala — nagpi-print ng mga in-app na hakbang (Cursor config ay opaque SQLite)                                                                                                              | `--remote` `--api-key` `--only` `--port`                                                                                                   | pareho          |
| `omniroute setup-roo`      | Roo Code                     | `~/.omniroute/roo-settings.json` (import doc) + set `roo-cline.autoImportSettingsPath` kung may VS Code `settings.json`                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | pareho          |
| `omniroute setup-crush`    | Crush                        | `~/.config/crush/crush.json` — `openai-compat` provider, susi sa pamamagitan ng `$OMNIROUTE_API_KEY`                                                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | pareho          |
| `omniroute setup-zed`      | Zed                          | `~/.config/zed/settings.json` — `openai_compatible.omniroute` provider (≤ 25 tool-capable models), key sa pamamagitan ng `$OMNIROUTE_API_KEY`                                             | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | pareho          |
| `omniroute setup-goose`    | Gansa                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + prints env recipe                                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | pareho          |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + prints env recipe                                                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | pareho          |
| `omniroute setup-qwen`     | Qwen Code                    | `~/.qwen/settings.json` — V4 `modelProviders.openai` array + `OMNIROUTE_API_KEY` sa `~/.qwen/.env`                                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | pareho          |
| `omniroute setup-5dive`    | 5dive (agent fleet)          | Wala sa ilalim ng `$HOME` — nagsusulat ng 5dive** profile ng auth** (`/var/lib/5dive/auth-profiles/<name>/`) sa pamamagitan ng `5dive agent auth set`; root-only, tumatakbo sa fleet host | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | pareho          |
| `omniroute setup-whycodes` | WhyCodes                     | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); ang landas ay `$WHYCODES_HOME/config.toml` o `~/.whycodes/config.toml`                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | pareho          |
| `omniroute run <target>`   | Runtime launch (generic)     | Wala — mag-spawn `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` na may tamang env at args; Qwen at Gemini ay gumagamit ng pansamantalang nakahiwalay na tahanan   | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | pareho          |
| `omniroute launch`         | Claude Code                  | Wala — nag-spawns `claude` na may `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` injected                                                                                                    | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | pareho          |
| `omniroute launch-codex`   | OpenAI Codex CLI             | Wala — nagbubunga ng `codex` sa provider `omniroute` na na-inject sa pamamagitan ng mga flag `-c`                                                                                         | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | pareho          |

Mga tala sa mga flag (na-verify sa source ng command):

- `--remote <url>` — kunin ang catalog mula sa isang malayuang OmniRoute (i-override `--port` at ang aktibong konteksto). `--api-key <key>` ay nagbibigay ng kredensyal para sa server na iyon (mga default sa `OMNIROUTE_API_KEY` env var, o ang token ng aktibong konteksto).
- `--only <patterns>` - mga substring na pinaghihiwalay ng kuwit; panatilihin lamang ang modelong IDs na tumutugma (hal `--only glm,kimi`). Available sa `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed`.
- `--dry-run` — i-print nang eksakto kung ano ang isusulat nang hindi hinahawakan ang filesystem. Available sa bawat `setup-*` command** maliban sa** `setup-cursor` (na hindi kailanman nagsusulat ng isang file).
- `--model <id>` — kinakailangan (o interactive na pinili) para sa mga tool na walang modelong auto-discovery: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive, WhyCodes. Ang mga tool na iyon ay tumatanggap din `--yes` para sa mga hindi interactive na pagtakbo (na pagkatapos ay nangangailangan `--model`). `setup-opencode` ay tumatagal ng `--model` upang itakda ang default na top-level na modelo.
- `--model <id>` sa `omniroute run` ay sumusunod sa per-target na mga wiring ng manifest (`bin/cli/cli-manifest.mjs`):** katulong** tumatanggap `--model openai/<id>` at** opencode** `--model omniroute/<id>` (ang prefix ay idinaragdag lamang kapag hindi pa ito dinadala ng id);** qwen** at** Gemini** tumanggap ng id verbatim;** claude** nakukuha ito sa pamamagitan ng `ANTHROPIC_MODEL`,** gansa** sa pamamagitan ng `GOOSE_MODEL`,** whycodes** sa pamamagitan ng `-P omniroute -m <id>`, at** codex** sa pamamagitan ng `-c model_providers.omniroute.*` args.**Qwen ay ang tanging target na tumakbo na nangangailangan ng `--model`** — `omniroute run qwen` nang wala ito ay lumalabas `2` na may tahasang error.
- `--port <port>` — lokal OmniRoute port (default `20128`, hindi pinansin kapag nakatakda ang `--remote` ). Ipakita sa lahat `setup-*` at parehong launcher.
- `omniroute run` exit codes: ang sariling exit code ng CLI ay pinalaganap ng verbatim; `2` = di-wastong mga argumento (hindi sinusuportahang target, nawawala ang kinakailangang `--model`, container guard); `127` = ang target na binary ay wala sa `PATH`; `130`/`143`/`129` kapag ang paglulunsad ay natapos ng `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = ibang runtime na pagkabigo sa paglulunsad.
- Ang dalawang launcher (`launch`, `launch-codex`) ay tumatanggap ng `--profile <name>` para pumili ng profile na isinulat ng `setup-claude` / `setup-codex`, kasama ang pass-through na args para sa pinagbabatayan na `claude` / `codex` binary.

Ang interactive na tagapili ay ibinabahagi rin ng mga recipe ng pag-setup:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

Kasalukuyang nagdedelegate `configure` sa nasubok na mga recipe para sa `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo`, at `5dive`. Ang IDE-only, MITM, at guide-only na mga entry sa catalog ay nananatiling tahasang `setup-*`/manual na daloy at hindi ipinakita bilang mga nailunsad na target.

> `setup-opencode` ay ang** magaan na openai-compatible** pagsasama ng OpenCode. Mayroon ding mas mahusay na pagsasama ng plugin — `omniroute setup opencode` — na nag-i-install `@omniroute/opencode-plugin`. Ang mga ito ay iba't ibang mga utos; ang talahanayan sa itaas ay mga dokumento `setup-opencode`.
>
> Ang plugin ay may dalawang pakete, isa sa bawat OpenCode major, dahil ang dalawang loader ay umaasa sa magkaibang mga entrypoint: `@omniroute/opencode-plugin` para sa OpenCode v1 at `@omniroute/opencode-plugin-v2` para sa OpenCode v2. Ang v2 package ay bago (`0.1.0`) at sumusunod sa isang host contract na gumagalaw pa rin, kaya binabasa nito ang hugis OpenCode seeds sa draft ng catalog sa halip na ipagpalagay ang isa. I-install ito sa pamamagitan ng pagdaragdag ng `plugins` entry sa `opencode.json`; Ini-install pa rin ng `omniroute setup opencode` ang v1 package. Ang mga opsyon at ang pagkakasunod-sunod ng paghahanap ng kredensyal ay nasa package README.

---

## Lokal na paggamit

Kapag tumatakbo ang OmniRoute sa `localhost:20128`, patakbuhin lang ang setup command para sa iyong tool. Kinukuha ang catalog mula sa lokal na server.

```bash
# Codex: magsulat ng isang profile para sa bawat tumugmang model sa ~/.codex/
omniroute setup-codex
codex --profile glm52            # gumamit ng nabuong profile

# Claude Code: magsulat ng mga profile para sa bawat model, pagkatapos ay maglunsad ng isa
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: isulat ang provider na compatible sa openai kasama ang lahat ng model sa catalog
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # nire-reference sa pamamagitan ng {env:OMNIROUTE_API_KEY}, hindi kailanman nasa disk
opencode -m omniroute/glm/glm-5.2 "..."

# Kailangan ng tahasang model ang mga tool na walang auto-discovery:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Mag-preview nang walang isinusulat:
omniroute setup-continue --dry-run
```

Maglunsad nang hindi nagsusulat ng anumang config (env-injection lamang):

```bash
omniroute launch                 # Claude Code → lokal na OmniRoute
omniroute launch-codex           # Codex CLI → lokal na OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Tahasang path ng command: ipasa nang walang pagbabago ang anumang kasunod ng --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Malayuang paggamit

Ituro ang anumang setup command sa isang malayuang OmniRoute gamit ang `--remote` + `--api-key`. Kinukuha ang catalog mula sa remote; isinusulat ang config sa iyong lokal na machine.

```bash
# OpenCode laban sa isang malayuang VPS, panatilihin lamang ang mga glm/kimi model
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # i-export muna ang OMNIROUTE_API_KEY

# Mga Codex profile mula sa isang malayuang catalog
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Direktang maglunsad ng CLI laban sa remote
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Sa halip na ipasa ang `--remote`/`--api-key` sa bawat pagkakataon, mag-log in nang isang beses at hayaang awtomatikong ibigay ng **aktibong context** ang mga ito:

```bash
omniroute connect 192.168.0.15        # lumilikha ng scoped token at iniimbak ang context
omniroute setup-codex                 # ← ginagamit na ngayon ang malayuang catalog
omniroute setup-opencode              # ← gayundin
omniroute launch                      # ← Claude Code laban sa remote
```

Tingnan ang [Remote Mode](./REMOTE-MODE.md) para sa mga context, scope, at pamamahala ng token.

---

## Mga fleet ng 5dive agent

Ang [5dive](https://5dive.ai) ay nagpapatakbo ng fleet ng mga coding agent na matagal tumatakbo, na ang bawat isa ay isang systemd unit sa ilalim ng sarili nitong Unix user. Hindi ito isang coding CLI, kaya walang mailulunsad ang `omniroute run` — ang `5dive` ay isang target na **configure-only**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Ang dalawang anyo ay parehong nagsusulat ng isang **auth profile** ng 5dive, at pagkatapos ay kumokonekta sa OmniRoute ang bawat `claude` seat na nakatali sa profile na iyon. Tatlong bagay ang natatangi sa target na ito:

- **Tumatakbo ito sa fleet host bilang root.** Kumikilos ang mga verb ng 5dive sa mga lokal na systemd unit at sa isang state dir na pag-aari ng root; walang remote mode. Muling pinapatakbo ng recipe ang sarili nito sa pamamagitan ng `sudo` kapag hindi pa ito root (`--no-sudo` ang nag-o-off nito at sa halip ay nagpi-print ng command).
- **Dapat ay `https://` ang endpoint maliban kung loopback ito.** Sumasama ang API key ng agent sa URL na iyon sa bawat request, at hindi tinatanggap ng 5dive ang isang plaintext na endpoint sa labas ng machine. Hindi eksepsiyon ang isang pribadong LAN address.
- **Mas mataas ang priyoridad ng sariling model pin ng bawat seat kaysa sa profile.** Taglay ng profile ang `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, ngunit ang isang seat na naka-pin pa rin sa stock model id ay mabibigo sa unang turn nito na may _"There's an issue with the selected model"_. Ipasa ang `--agent <name>` (maaaring ulitin) upang i-pin din ang mga seat; ipi-print ng recipe ang command kapag hindi mo ito ginawa.

Ipinapasa ang API key sa 5dive sa pamamagitan ng **stdin** (`--api-key=-`), kaya hindi ito kailanman lumilitaw sa output ng `ps`.

Ang pagtutok ng profile sa isang **combo** ng OmniRoute sa halip na sa iisang model ang nagbibigay sa fleet ng provider failover: nang tuluyang bumagsak ang pangunahing endpoint sa kalagitnaan ng turn sa run na naitala sa [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), tinapos ng agent ang mga natitirang hakbang nito gamit ang fallback at hindi kailanman inilantad ang outage.

---

## Base URL convention (kung aling mga tool ang gusto `/v1`)

Inilalantad OmniRoute ang OpenAI surface sa `/v1`, ang Anthropic surface sa ugat, at isang native Gemini surface sa `/v1beta`. Ang bawat pagsasama ay naka-wire sa form na inaasahan ng tool nito (na-verify sa source ng command):

| Pagsasama                                                                  | Base URL ang nakasulat | `/v1`?                                                |
| -------------------------------------------------------------------------- | ---------------------- | ----------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | ugat                   | Hindi — idinaragdag ng Cline `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | ugat                   | Hindi — Idinaragdag ni Goose ang landas               |
| `setup-aider` (`OPENAI_API_BASE`)                                          | ugat                   | Hindi — idinaragdag ng LiteLLM `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | kasama si `/v1`        | Oo                                                    |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | kasama si `/v1`        | Oo                                                    |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | ugat                   | Hindi — idinaragdag ng Claude Code `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | kasama si `/v1`        | Oo                                                    |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | kasama si `/v1`        | Oo                                                    |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | ugat                   | Hindi — ang SDK ay nagdaragdag `/v1beta/models/…`     |
| `setup-5dive` (`ANTHROPIC_BASE_URL` sa auth profile)                       | ugat                   | Hindi — idinaragdag ng Claude Code `/v1/messages`     |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | kasama si `/v1`        | Oo — WhyCodes posts `/chat/completions`               |

---

## Pagpapanatili ng mga native dep sa pag-update: `--include=optional`

Kapag nag-update ka gamit ang `omniroute update` (pagkatapos magkumpirma, o gamit ang `--apply`),
pinapatakbo ng OmniRoute ang pag-install na may nakapaloob nang `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

**Hindi** ito isang flag na ipinapasa mo sa `omniroute update` — palagi itong inilalapat ng
updater. Tinitiyak nitong mananatili ang `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, ang LLMLingua SLM stack) pagkatapos ng update kahit nakatakda ang npm config mo
sa `omit=optional`, na kung hindi ay tahimik na mag-aalis sa native SQLite
driver at OS-keyring binding. Upang i-preview ang eksaktong command nang hindi ito inilalapat:

```bash
omniroute update --dry-run
# [DRY RUN] Patatakbuhin sana ang: npm install -g omniroute@latest --include=optional
```

Iba pang mga flag ng `omniroute update` (na-verify sa source): `--check` (mag-exit nang 1 kung
luma na), `--apply` (mag-install nang hindi nagtatanong), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI sa pamamagitan ng `omniroute run gemini`

Na-verify ang contract laban sa `@google/gemini-cli` 0.50.0: sinusunod ng CLI ang
`GOOGLE_GEMINI_BASE_URL` at nagpapadala ng `POST /v1beta/models/<model>:generateContent`
(at `:streamGenerateContent?alt=sse`) dito — eksaktong native
Gemini surface (`/v1beta`) ng OmniRoute. Awtomatikong kino-configure iyon ng `omniroute run gemini`:

- `GOOGLE_GEMINI_BASE_URL` → ang aktibong OmniRoute base URL (root, walang `/v1`);
- `GEMINI_API_KEY` → ang na-resolve na kredensiyal ng OmniRoute (option/env/context);
- isang **pansamantala at nakahiwalay na `GEMINI_CLI_HOME`** na ang `.gemini/settings.json`
  ay pumipili ng `gemini-api-key` auth, upang hindi kailanman ma-override ng nakaimbak na Google OAuth session (Code Assist)
  ang launch na nakadirekta sa OmniRoute — inaalis pagkatapos mag-exit;
- **kalinisan ng env**: inaalis sa child env ang `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` at `GOOGLE_GENAI_USE_GCA` (na magre-redirect
  ng auth sa Vertex/Code Assist), at itinatakda ang `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  bilang karagdagang fallback — tumatanggap din ang iba pang mga target ng `run` ng parehong
  pagtrato para sa kani-kanilang magkasalungat na variable;
- pag-inject ng `--model <id>` mula sa `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Nalalapat pa rin ang workspace-trust guard ng Gemini sa headless mode — ikaw mismo ang magpasa ng
`--skip-trust` (o interaktibong pagkatiwalaan ang directory); sadyang hindi ito
bina-bypass ng launcher. Naiiba ang launcher na ito sa **ACP
registration** (`src/lib/acp/registry.ts`, `gemini --acp`), na nananatiling
agent-protocol integration para sa `/dashboard/acp-agents`.

---

## Aktuwal na smoke sweep (opt-in)

Tumatakbo sa CI ang mga deterministic na launch-plan regression (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Upang i-validate ang mga AKTUWAL na binary laban sa isang AKTUWAL na
OmniRoute server, may opt-in harness sa
`tests/integration/upstream-cli-smoke.int.test.ts`. Hindi ito kailanman awtomatikong tumatakbo
(nilalaktawan ang bawat sub-test maliban kung `RUN_CLI_SMOKE=1`), ipinapasa ang credential sa pamamagitan ng PANGALAN ng env-var
(hindi kailanman sa pamamagitan ng value), nire-redact ang mga string na mukhang key mula sa anumang naitalang output, nilalaktawan ang
mga target na walang naka-install na binary, at inuuri ang mga pagkabigo bilang
auth / upstream / config sa halip na isang simpleng boolean:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opsyonal: nililimitahan ng `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` ang sweep;
ino-override ng `OMNIROUTE_SMOKE_TIMEOUT_MS` ang 120s na timeout sa bawat target.

---

## Tingnan din

- [Configuration ng Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — ang mas detalyadong gabay sa Claude Code
- [Configuration ng Codex CLI](./CODEX-CLI-CONFIGURATION.md) — ang minsanang paunang setup ng `[model_providers.omniroute]`
- [Remote Mode](./REMOTE-MODE.md) — mga context, scoped access token, at pagkontrol sa isang remote server
- [Reference ng CLI Tools](../reference/CLI-TOOLS.md) — ang kumpletong catalog ng mga sinusuportahang tool + mga dashboard page
- [Gabay sa Pag-setup](./SETUP_GUIDE.md) — mga paraan ng pag-install at onboarding sa unang pagpapatakbo
