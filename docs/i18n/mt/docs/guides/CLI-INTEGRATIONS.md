# CLI Integrations (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

Għall-manifest eżekutibbli kondiviż, ambjenti tfal ristretti u setup persistenti Gemini, ara [CLI launch contracts](./CLI-LAUNCH-CONTRACTS.md).

OmniRoute jibgħat familja ta’ kmandi `setup-*` li jikkonfiguraw kodifikazzjoni CLI (Codex, Claude Code, OpenCode, Cline, …) biex tuża OmniRoute bħala backend tagħha — sabiex l-għodda titkellem ma’** wieħed** endpoint u rotot OmniRoute lejn il-fornitur it-tajjeb b'auto-fallback. Kull kmand jaqra l** ħajjin** katalgu tal-mudell minn OmniRoute li qed jaħdem (lokali jew remot) u jikteb il-fajl tal-konfigurazzjoni tal-għodda stess fuq** tiegħek** magna. Iċ-ċavetta API hija referenzjata minn varjabbli ambjentali kull fejn l-għodda tappoġġjaha. Kmandi li jippersistu fajl għodda-ambjent lokali huma nnutati hawn taħt.

Hemm ukoll lanċjar ġeneriku — `omniroute run <target>` — li jbid `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` jew `whycodes` bl-env dritt injettat, mingħajr ma tikteb l-ebda konfigurazzjoni. Il-miri u l-psewdonomi tagħhom jiġu mill-manifest kanoniku `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`), u `omniroute completion` joffri l-istess kliem fil-mira derivati mill-manifest. Il-lanċjar għal kull għodda tal-legat — `omniroute launch` (Claude Code) u `omniroute launch-codex` (Codex) — jibqgħu disponibbli.

L-onboarding tal-fornitur huwa disponibbli mill-istess kuntest local/remote. Il-kmandi tal-ewwel API hawn taħt iżommu l-awtentikazzjoni tal-ġestjoni separata mill-kredenzjali tal-fornitur u qatt ma tipprintja kredenzjali fi output strutturat:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Għall-iskripts, jippreferu `--credential-stdin` jew `--credential-env`; `--credential` jinżamm għal użu lokali kkontrollat. `providers remove` jeħtieġ `--yes` fuq terminal mhux interattiv, u l-ħames kmandi kollha jonoraw il-kuntest attiv jew l-għażliet globali `--base-url`/`--api-key`.

Is-seletturi tal-fornituri jirrifjutaw prefissi, ismijiet jew ismijiet tal-fornituri ambigwi ID ; uża konnessjoni sħiħa ID meta diversi konnessjonijiet jaqblu. Oħloq u editja kmandi aqra l-konnessjoni salvata lura, u t-tneħħija tivverifika li ma tkunx aktar tinqara. Importazzjoni taqbeż par provider/name eżistenti. L-entrati importati ma jistgħux jegħlbu l-endpoint tal-ġestjoni, il-kuntest jew il-kredenzjali tal-ġestjoni fornuti liż CLI.

Għas-setup bażi ta' darba, miktuba bl-idejn taż-żewġ integrazzjonijiet l-aktar sinjuri, ara l-għaddasi fil-fond għal kull għodda:

- [Claude Konfigurazzjoni tal-Kodiċi](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI konfigurazzjoni](./CODEX-CLI-CONFIGURATION.md)
- [Modalità Remota](./REMOTE-MODE.md) — issuq OmniRoute remot (VPS / Tailnet) mill-laptop tiegħek
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — l-estensjoni OmniCopilot ; jista 'wkoll imexxi dawn il-kmandi `setup-*` għalik minn ġewwa l-editur

---

## Mejda kaptan

Kull kmand jonora l-** kuntest attiv** (issettjat `omniroute connect`, ara [Remote Mode](./REMOTE-MODE.md) ) jew bnadar `--remote <url> --api-key <key>` espliċiti. "Lokali vs remoti" hawn taħt tfisser: bla bnadar hija timmira `http://localhost:20128`; `--remote` (jew kuntest remot attiv) iġib il-katalgu minn dak is-server u jikteb il-konfigurazzjoni lokalment.

| Kmand                      | Għodda                            | Dak li jikteb                                                                                                                                                     | Bnadar ewlenin                                                                                                                             | Lokali vs remoti |
| -------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                  | `~/.codex/<name>.config.toml` — profil wieħed għal kull mudell ta' test kompatibbli (`codex --profile <name>`)                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | It-tnejn         |
| `omniroute setup-claude`   | Claude Code                       | `~/.claude/profiles/<name>/settings.json` — profil wieħed għal kull mudell imqabbel (`CLAUDE_CONFIG_DIR`)                                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | It-tnejn         |
| `omniroute setup-opencode` | OpenCode (kompatibbli mal-openai) | `~/.config/opencode/opencode.json` — fornitur `omniroute` b'kull mudell ta' katalgu (`opencode -m omniroute/<model>`)                                             | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | It-tnejn         |
| `omniroute setup-cline`    | Cline                             | `~/.cline/data/{globalState,secrets}.json` (mod CLI ) + jistampa VS is-settings tal-estensjoni tal-Kodiċi                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | It-tnejn         |
| `omniroute setup-kilo`     | Kilo Kodiċi                       | `~/.local/share/kilo/auth.json` (CLI) + jingħaqad `kilocode.*` VS Kodiċi `settings.json` jekk preżenti                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | It-tnejn         |
| `omniroute setup-continue` | Kompli / `cn` CLI                 | `~/.continue/config.yaml` — mudelli `provider: openai`, ċavetta permezz `${{ secrets.OMNIROUTE_API_KEY }}`                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | It-tnejn         |
| `omniroute setup-cursor`   | Cursor                            | Xejn — jistampa l-passi fl-app (Cursor config hija opaka SQLite)                                                                                                  | `--remote` `--api-key` `--only` `--port`                                                                                                   | It-tnejn         |
| `omniroute setup-roo`      | Kodiċi Roo                        | `~/.omniroute/roo-settings.json` (dokument ta' importazzjoni) + jistabbilixxi `roo-cline.autoImportSettingsPath` jekk jeżisti Kodiċi VS `settings.json`           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | It-tnejn         |
| `omniroute setup-crush`    | Għaffeġ                           | `~/.config/crush/crush.json` — fornitur `openai-compat`, ċavetta permezz `$OMNIROUTE_API_KEY`                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | It-tnejn         |
| `omniroute setup-zed`      | Zed                               | `~/.config/zed/settings.json` — fornitur `openai_compatible.omniroute` (≤ 25 mudelli li kapaċi jużaw għodda), ċavetta permezz `$OMNIROUTE_API_KEY`                | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | It-tnejn         |
| `omniroute setup-goose`    | Wiżż                              | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + prints env recipe                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | It-tnejn         |
| `omniroute setup-aider`    | Aider                             | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + prints env recipe                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | It-tnejn         |
| `omniroute setup-qwen`     | Qwen Code                         | `~/.qwen/settings.json` — V4 `modelProviders.openai` array + `OMNIROUTE_API_KEY` in `~/.qwen/.env`                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | It-tnejn         |
| `omniroute setup-5dive`    | 5 dive (flotta tal-aġent)         | Xejn taħt `$HOME` — jikteb 5dive** profil awth** (`/var/lib/5dive/auth-profiles/<name>/`) via `5dive agent auth set`; root-only, timxi fuq l-ospitanti tal-flotta | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | It-tnejn         |
| `omniroute setup-whycodes` | WhyCodes                          | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); mogħdija hija `$WHYCODES_HOME/config.toml` jew `~/.whycodes/config.toml`                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | It-tnejn         |
| `omniroute run <target>`   | Tnedija ta' runtime (ġeneriku)    | Xejn — spawn `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` bl-env u l-args it-tajba; Qwen u Gemini jużaw dar iżolata temporanja          | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | It-tnejn         |
| `omniroute launch`         | Claude Code                       | Xejn — ibid `claude` `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` injettat                                                                                         | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | It-tnejn         |
| `omniroute launch-codex`   | OpenAI Codex CLI                  | Xejn — ibid `codex` bil-fornitur `omniroute` injettat permezz tal-bnadar `-c`                                                                                     | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | It-tnejn         |

Noti dwar il-bnadar (verifikati fis-sors tal-kmand):

- `--remote <url>` — iġib il-katalgu minn OmniRoute remot (jibqa' fuq `--port` u l-kuntest attiv). `--api-key <key>` jipprovdi l-kredenzjali għal dak is-server (defaults għall- `OMNIROUTE_API_KEY` env var, jew it-token tal-kuntest attiv).
- `--only <patterns>` — substrings separati minn virgola; żomm biss mudell IDs li jaqblu (eż. `--only glm,kimi`). Disponibbli fuq `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed`.
- `--dry-run` — ipprintja eżattament dak li jinkiteb mingħajr ma tmiss is-sistema tal-fajls. Disponibbli fuq kull kmand `setup-*`** ħlief** `setup-cursor` (li qatt ma jikteb fajl).
- `--model <id>` — meħtieġa (jew magħżula b'mod interattiv) għall-għodod li m'għandhom l-ebda mudell ta' skoperta awtomatika: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive, WhyCodes. Dawk l-għodod jaċċettaw ukoll `--yes` għal ġirjiet mhux interattivi (li mbagħad jeħtieġ `--model`). `setup-opencode` jieħu `--model` biex jistabbilixxi l-mudell tal-ogħla livell default.
- `--model <id>` fuq `omniroute run` isegwi l-wiring għal kull mira tal-manifest (`bin/cli/cli-manifest.mjs`):** aider** jirċievi `--model openai/<id>` u** kodiċi miftuħ** `--model omniroute/<id>` (il-prefiss jiżdied biss meta l-id ma jkunx diġà jġorrha);** qwen** u** gemini** tirċievi l-id verbatim;** claude** ġġibu permezz `ANTHROPIC_MODEL`,** wiżż** permezz ta `GOOSE_MODEL`,** whycodes** permezz ta `-P omniroute -m <id>`, u** kodex** via `-c model_providers.omniroute.*` args.**Qwen hija l-unika mira tal-ġirja li tirrikjedi `--model`** — `omniroute run qwen` mingħajr ma joħroġ minn `2` bi żball espliċitu.
- `--port <port>` — port OmniRoute lokali (default `20128`, injorat meta `--remote` ikun issettjat). Preżenti fuq `setup-*` kollha u ż-żewġ launchers.
- kodiċi tal-ħruġ `omniroute run` : il-kodiċi tal-ħruġ tat-tifel stess CLI huwa propagat verbatim; `2` = argumenti invalidi (mira mhux sostnuta, `--model` meħtieġa nieqsa , gwardja tal-kontejners); `127` = il-mira binarja mhix `PATH`; `130`/`143`/`129` meta t-tnedija tintemm minn `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = ieħor runtime tnedija falliment.
- Iż-żewġ launchers (`launch`, `launch-codex`) jaċċettaw `--profile <name>` biex jagħżlu profil miktub minn `setup-claude` / `setup-codex`, flimkien ma 'pass-through args għall-binarju `claude` / `codex` sottostanti.

Il-picker interattiv huwa kondiviż ukoll mir-riċetti tas-setup:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` bħalissa tiddelega għar-riċetti ttestjati għal `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo`, u `5dive`. L-entrati tal-katalgu IDE-only, MITM, u gwida biss jibqgħu `setup-*`/flussi manwali espliċiti u mhumiex ippreżentati bħala miri li jistgħu jiġu varati.

> `setup-opencode` hija l** ħfief openai-kompatibbli** OpenCode integrazzjoni. Hemm ukoll integrazzjoni tal-plugin aktar għanja — `omniroute setup opencode` — li tinstalla `@omniroute/opencode-plugin`. Huma kmandi differenti; it-tabella t'hawn fuq tiddokumenta `setup-opencode`.
>
> Il-plugin jiġi f'żewġ pakketti, wieħed għal kull OpenCode maġġuri, minħabba li ż-żewġ loaders jistennew punti ta 'dħul differenti: `@omniroute/opencode-plugin` għal OpenCode v1 u `@omniroute/opencode-plugin-v2` għal OpenCode v2. Il-pakkett v2 huwa ġdid (`0.1.0`) u jsegwi kuntratt ospitanti li għadu miexi, għalhekk jaqra l-forma OpenCode seeds fl-abbozz tal-katalgu aktar milli jassumi waħda. Installaha billi żżid dħul `plugins` ma' `opencode.json`; `omniroute setup opencode` għadu jinstalla l-pakkett v1. L-għażliet u l-ordni tat-tiftix tal-kredenzjali jinsabu fil-pakkett README.

---

## Użu lokali

B'OmniRoute jaħdem fuq `localhost:20128`, sempliċement ħaddem il-kmand tas-setup għall-għodda tiegħek. Il-katalgu jinġieb mis-server lokali.

```bash
# Codex: ikteb profil għal kull mudell imqabbel f'~/.codex/
omniroute setup-codex
codex --profile glm52            # uża profil iġġenerat

# Claude Code: ikteb profili għal kull mudell, imbagħad niedi wieħed
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: ikteb il-fornitur kompatibbli ma' openai bil-mudelli kollha tal-katalgu
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # referenzjat permezz ta' {env:OMNIROUTE_API_KEY}, qatt fuq id-disk
opencode -m omniroute/glm/glm-5.2 "..."

# Għodod mingħajr skoperta awtomatika jeħtieġu mudell espliċitu:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Preview mingħajr ma tikteb xejn:
omniroute setup-continue --dry-run
```

Niedi mingħajr ma tikteb l-ebda konfigurazzjoni (injezzjoni tal-ambjent biss):

```bash
omniroute launch                 # Claude Code → OmniRoute lokali
omniroute launch-codex           # Codex CLI → OmniRoute lokali
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Mogħdija tal-kmand espliċita: għaddi dak kollu li jiġi wara --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Użu mill-bogħod

Indika kwalunkwe kummerċ setup għal OmniRoute mill-bogħod b `--remote` + `--api-key`. Il-
katalogu jitniżżel mill-bogħod; il-konfigurazzjoni titniżżel fil-magna lokali tiegħek.

```bash
# OpenCode against a remote VPS, keep only glm/kimi models
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # export OMNIROUTE_API_KEY first

# Codex profiles from a remote catalog
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Launch a CLI straight against the remote
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Minflok jgħaddi `--remote`/`--api-key` kull darba, idħol darba u ħalli l-
**kontatt attiv** japprovixxihom awtomatikament:

```bash
omniroute connect 192.168.0.15        # mints a scoped token, stores the context
omniroute setup-codex                 # ← now uses the remote catalog
omniroute setup-opencode              # ← same
omniroute launch                      # ← Claude Code against the remote
```

Ara [Remote Mode](./REMOTE-MODE.md) għal kontatt, skopijiet, u ġestjoni tat-tokens.

---

## Flotta ta' aġenti 5dive

[5dive](https://5dive.ai) jimxi b'flotta ta' aġenti tal-programmar fit-tul, kull wieħed
unità ta' sistema taħt l-utent Unix tagħha stess. Mhuwiex għodda CLI tal-programmar b'saħħitha stess, għalhekk
mhux hemm x'jittella `omniroute run` — `5dive` huwa magħmudija biss.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Iż-żewġ forom jiktbu **profil ta' awtentikazzjoni** wieħed ta' 5dive, u kull pjan `claude` marbut mal-
profil jitkellem mal-OmniRoute. Tliet affarijiet huma speċifiċi għal din il-mira:

- **Jiġi żviluppat fuq il-flotta host, bħala root.** Istampi ta' 5dive joperaw fuq unitajiet lokali tas-sistema
  u fuq direttorju stat bl-isem tal-root; mhuwiex hemm modalità mill-bogħod. Ir-riċetta terġa' taħdem mill-
  `sudo` meta mhuwiex diġà root (`--no-sudo` tħalli dik u tipprintja l-
  kummerċ minflokha).
- **Iż-żewġ puntijiet iridu jkunu `https/` sakemm mhumiex loopback.** L-awtentikazzjoni tal-aġenti titla' f'dan l-URL fuq kull talba, u 5dive jirrifjuta punt off-box mingħajr protezzjoni. Indirizz LAN privat mhux eċċezzjoni.
- **Kull pjan għandu mudell wieħed li jipprevali fuq il-profil.** Il-profil iġorr
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, imma pjan għadu marbut b'mudell standard
  jifail l-ewwel karozza tiegħu bi _"Hemm problema mal-mudell magħżul"_. Agħti `--agent <isem>` (tista' terġa' tużah) biex twaħħal il-pjanijiet ukoll; ir-riċetta tipprintja l-
  kummerċ meta ma tagħmilx.

L-awtentikazzjoni tal-API tingħata lill-5dive fuq **stdin** (`--api-key=-`), hekk li qatt tidher fil-
output tal-`ps`.

Il-profil imur lejn kombinazzjoni **OmniRoute** minflok mudell wieħed biss li jġib il-falliment tal-fornitur tal-flotta: meta l-punt ewlieni waqa' waqt karozza f'run irreġistrat fuq
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), l-aġent lesta il-passi li fadal fuq il-fallback u qatt ma ħareġ in-breakout.

---

## Bażi konvenzjonijiet URL (liema għodda jridu `/v1`)

OmniRoute jesponi l-wiċċ OpenAI `/v1`, il-wiċċ Anthropic fl-għerq, u wiċċ Gemini nattiv `/v1beta`. Kull integrazzjoni hija fili għall-forma li tistenna l-għodda tagħha (verifikata fis-sors tal-kmand):

| Integrazzjoni                                                              | Base URL miktuba | `/v1`?                                       |
| -------------------------------------------------------------------------- | ---------------- | -------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | għerq            | Le — Cline tehmeż `/v1/chat/completions`     |
| `setup-goose` (`OPENAI_HOST`)                                              | għerq            | Le — Il-wiżż iżid it-triq                    |
| `setup-aider` (`OPENAI_API_BASE`)                                          | għerq            | Le — LiteLLM tehmeż `/v1/chat/completions`   |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1`            | Iva                                          |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | `/v1`            | Iva                                          |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | għerq            | Le — Claude Kodiċi jehmeż `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1`            | Iva                                          |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1`            | Iva                                          |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | għerq            | Le — iż- SDK tehmeż `/v1beta/models/…`       |
| `setup-5dive` (`ANTHROPIC_BASE_URL` fil-profil awt)                        | għerq            | Le — Claude Kodiċi jehmeż `/v1/messages`     |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | `/v1`            | Iva — WhyCodes postijiet `/chat/completions` |

---

## It-tħażin ta' dipendenzi nattivi waqt it-tġdid: `--include=optional`

Meta tġdid b'`omniroute update` (wara li tikkonferma, jew b'`--apply`), OmniRoute jimmoda l-installazzjoni b'`--include=optional` internament:

```bash
npm install -g omniroute@latest --include=optional
```

Dan **mhux** flemma li tagħti lil `omniroute update` — huwa applikat dejjem mill-ġdid. Dan jiżgura li l-`optionalDependencies` (`better-sqlite3`, `keytar`, `tls-client`, il-pakkett tal-LLMLingua SLM) jibqgħu ma' l-aġġornament anki jekk il-konfigurazzjoni npm tiegħek għandha `omit=optional` sett, li b'xi mod iħalli l-pilotaġġ nattiv tal-SQLite u r-rabta tal-kċina tal-OS biex jitwarrab b'sik. Biex tara l-kmand eżatt mingħajr ma tapplikah:

```bash
omniroute update --dry-run
# [DRY RUN] Sejjer jirrikjedi: npm install -g omniroute@latest --include=optional
```

Flemm oħra ta' `omniroute update` (verifikati fil-kodiċi): `--check` (ħarġa 1 jekk skaduta), `--apply` (tinstalla mingħajr jekk tagħmel il-mistoqsija), `--changelog`, `--no-backup`, `--yes`.

---

## Google Gemini CLI permezz ta' `omniroute run gemini`

Il-kuntratt verifikat kontra `@google/gemini-cli` 0.50.0: il-CLI jirrikonoxxi `GOOGLE_GEMINI_BASE_URL` u jagħmel `POST /v1beta/models/<model>:generateContent` (u `:streamGenerateContent?alt=sse`) fuq dan — eżatt is-superfiċċja nativa ta' OmniRoute (`/v1beta`). `omniroute run gemini` iqabbad dan awtomatikament:

- `GOOGLE_GEMINI_BASE_URL` → il-URL bażi attiv ta' OmniRoute (rads, bla `/v1`);
- `GEMINI_API_KEY` → i-kredenzjali risolta ta' OmniRoute (għażla/madwar/kuntest);
- **`GEMINI_CLI_HOME` temporanju iżolat** li fih il-`.gemini/settings.json` jagħżel awtentikazzjoni ta' `gemini-api-key`, sabiessi ħlas Google OAuth maħżun (Code Assist) qatt ma jiskontra l-ħruġ immexxi minn OmniRoute — jitneħħa wara l-ħruġ;
- **iġjene tal-madwar**: l-madwar tat-tifel jitħassar minn `GOOGLE_API_KEY`, `GOOGLE_GENAI_USE_VERTEXAI` u `GOOGLE_GENAI_USE_GCA` (li jiddirott l-awtentikazzjoni għal Vertex/Code Assist), u `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` jiġi stabbilit bħalaappoġġż added — il-miri oħra `run` jirċievu l-istess trattament għal l-ilħna konfliġġenti tagħhom stess;
- injettjar `--model <id>` minn `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Is-sentunzja tal-fiduċja tax-xogħol ta' Gemini għadha tapplika fil-modalità b'ras— jgħaddi `--skip-trust` (jew tafda direttorju interattivament) int stess; il-pilota deliberatament mhux se jingħaddha. Dan il-pilota huwa distint mill-**reġistrazzjoni ACP** (`src/lib/acp/registry.ts`, `gemini --acp`), li jibqa' l-integrazzjoni tal-protokoll tal-aġenzija għal `/dashboard/acp-agents`.

---

## Swejjar tal-mħagna reali (b'għażula)

Il-jiċċekkjani reġressivi deterministiċi tal-pjan ta' tnedija jseħħu fl-CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Biex jivvaluta l-binarji REALI kontra Server OmniRoute REALI, hemm ġgħastra b'għażula fis-
`tests/integration/upstream-cli-smoke.int.test.ts`. Qatt m'għandha taħdem awtomatikament
(kull sub-test jispiċċa sakemm `RUN_CLI_SMOKE=1`), tgħaddi l-kredenzjali permezz tal-isem tal-varjabbli tal-ambjent
(qatt bil-valur), tħassar iż-żġunijiet f'forma ta' sieħa minn kwalunkwe output irrekordjat, tispiċċa
it-testi li l-binarju tagħhom mhuwiex installat, u tikklassifika l-fallimenti bħala
auth / upstream / config minflok Booleana裸:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128"OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Fakultattiv: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` jirrestrinġi s-swejjar;
`OMNIROUTE_SMOKE_TIMEOUT_MS` jaqbad it-timeout ta' 120s kull destinazzjoni.

---

## Ara wkoll

- [Konfigurazzjoni ta' Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — il-gwida aktar profonda ta' Claude Code
- [Konfigurazzjoni tal-CLI ta' Codex](./CODEX-CLI-CONFIGURATION.md) — is-sistema waħda tal-bażi `[model_providers.omniroute]`
- [Modalità ta' Distanza](./REMOTE-MODE.md) — il-kuntesti, it-tokeni ta' aċċess skopati, it-tirressi ta' server ta' distanza
- [Referenza għall-Għodod tal-CLI](../reference/CLI-TOOLS.md) — il-katalgu sħiħ tal-għodod appoġġjati + il-paġni tad-dashboard
- [Gwida tal-Installazzjoni](./SETUP_GUIDE.md) - il-metodi tal-installazzjoni u l-onboarding tal-ewwel darba
