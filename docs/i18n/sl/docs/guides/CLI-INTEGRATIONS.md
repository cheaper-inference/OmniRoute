# CLI Integrations (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

Za manifest izvršljive datoteke v skupni rabi, omejena podrejena okolja in vztrajno nastavitev Gemini glejte [pogodbe o zagonu CLI](./CLI-LAUNCH-CONTRACTS.md).

OmniRoute pošilja družino ukazov `setup-*`, ki konfigurirajo kodirni CLI (Codex, Claude koda, OpenCode, Cline, …), da uporablja OmniRoute kot zaledni — tako da se orodje pogovarja z** eno** končna točka in OmniRoute poti do pravega ponudnika s samodejnim nadomestnim postopkom. Nastavitveni ukazi uporabljajo vaš aktivni lokalni ali oddaljeni kontekst OmniRoute in konfigurirajo orodje** tvoje** stroj. Recepti, ki temeljijo na katalogu, pridobijo modele s strežnika; recepti z enim modelom sprejemajo `--model` ali zahtevajo model ID. Na ključ API se sklicuje spremenljivka okolja, kjer koli ga orodje podpira. Ukazi, ki vztrajajo v datoteki lokalnega okolja orodja, so navedeni spodaj.

Katalog in ukazi za avtomatizacijo zajemajo različne sklope orodij:

| Površina                       | štetje | Kaj to pomeni                                                                                      |
| ------------------------------ | ------ | -------------------------------------------------------------------------------------------------- |
| Katalog orodij                 | 39     | Dokumentirana orodja in agenti za kodiranje, vključno z ročnimi integracijami in integracijami IDE |
| `omniroute run <target>`       | 8      | Zagon adapterjev, ki zagotavljajo ciljno končno točko, poverilnice in model                        |
| `omniroute configure <target>` | 12     | Interaktivni konfiguracijski recepti, podprti z ukazi `setup-*`                                    |
| ukazi `setup-*`                | 16     | Registrirani nastavitveni ukazi, vključno z nastavitvijo urejevalnika guided/manual                |

Število odraža [manifest orodja](../../config/cli-tools-manifest.json) in [register ukazov](../../bin/cli/commands/registry.mjs) dne 2026-11-17. Vnos v katalog ne pomeni adapterja za zagon. Oglejte si [katalog orodij CLI](../reference/CLI-TOOLS.md) za celoten inventar.

Obstaja tudi generični zaganjalnik — `omniroute run <target>` —, ki sproži `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` ali `whycodes` z vstavljenim pravim env, brez pisanja kakršne koli konfiguracije. Cilji in njihovi vzdevki izhajajo iz kanoničnega manifesta `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`), `omniroute completion` pa ponuja iste ciljne besede, izpeljane iz manifesta. `omniroute launch <tool>` zažene podprto orodje za kodiranje z žetonom seje za zagon in seznamom modelov, zgrajenim iz ponudnikov, ki ste jih povezali, in samodejno zažene lokalni prehod, ko se noben ne zažene (glejte [LAUNCH.md](./LAUNCH.md) ). Starejši zaganjalniki za posamezna orodja — `omniroute launch` brez imena orodja (koda Claude ) in `omniroute launch-codex` (Codex) — ostajajo na voljo.

Vključevanje ponudnika je na voljo iz istega konteksta local/remote. Spodnji ukazi API-ja ohranjajo preverjanje pristnosti upravljanja ločeno od poverilnic ponudnika in nikoli ne natisnejo poverilnice v strukturiranem izpisu:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Za skripte raje `--credential-stdin` ali `--credential-env`; `--credential` se hrani za nadzorovano lokalno uporabo. `providers remove` zahteva `--yes` na neinteraktivnem terminalu in vseh pet ukazov upošteva aktivni kontekst ali globalne možnosti `--base-url`/`--api-key`.

Izbirniki ponudnikov zavračajo dvoumne predpone ID, imena ali imena ponudnikov; uporabite polno povezavo ID ko se ujema več povezav. Ukazi za ustvarjanje in urejanje preberejo shranjeno povezavo nazaj, odstranitev pa potrdi, da ni več berljiva. Uvoz preskoči obstoječi par provider/name. Uvoženi vnosi ne morejo preglasiti končne točke upravljanja, konteksta ali poverilnic za upravljanje, posredovanih CLI.

Za enkratno, ročno napisano osnovno nastavitev dveh najbogatejših integracij si oglejte podrobne potope za posamezno orodje:

- [Konfiguracija kode Claude](./CLAUDE-CODE-CONFIGURATION.md)
- [konfiguracija Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Oddaljeni način](./REMOTE-MODE.md) — upravljajte oddaljeni OmniRoute (VPS / Tailnet) iz vašega prenosnika
- [koda VS Copilot Klepet](./VSCODE-COPILOT.md) — razširitev OmniCopilot ; te ukaze `setup-*` lahko zažene tudi namesto vas iz urejevalnika

---

## Glavna miza

Vsak ukaz spoštuje** aktivni kontekst** (nastavljeno z `omniroute connect`, glejte [Oddaljeni način](./REMOTE-MODE.md) ) ali eksplicitne zastavice `--remote <url> --api-key <key>`. "Lokalno proti oddaljenemu" spodaj pomeni: brez zastavic cilja `http://localhost:20128`; z `--remote` (ali aktivnim oddaljenim kontekstom) konfigurira ta strežnik kot zaledje in zapiše konfiguracijo lokalno. Recepti, ki temeljijo na katalogu, prav tako pridobijo modele s tega strežnika.

| Ukaz                       | Orodje                           | Kaj piše                                                                                                                                                           | Ključne zastavice                                                                                                                          | Lokalno proti oddaljenemu |
| -------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                 | `~/.codex/<name>.config.toml` — en profil na združljiv besedilni model (`codex --profile <name>`)                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Oba                       |
| `omniroute setup-claude`   | koda Claude                      | `~/.claude/profiles/<name>/settings.json` — en profil na ujemajoči se model (`CLAUDE_CONFIG_DIR`)                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Oba                       |
| `omniroute setup-opencode` | OpenCode (združljiv z openai)    | `~/.config/opencode/opencode.json` — `omniroute` ponudnik z vsakim kataloškim modelom (`opencode -m omniroute/<model>`)                                            | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Oba                       |
| `omniroute setup-cline`    | Cline                            | `~/.cline/data/{globalState,secrets}.json` ( način CLI ) + natisne nastavitve razširitve kode VS                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Oba                       |
| `omniroute setup-kilo`     | Koda Kilo                        | `~/.local/share/kilo/auth.json` (CLI) + združi `kilocode.*` v VS Koda `settings.json`, če je prisotna                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Oba                       |
| `omniroute setup-continue` | Nadaljuj / `cn` CLI              | `~/.continue/config.yaml` — `provider: openai` modeli, ključ preko `${{ secrets.OMNIROUTE_API_KEY }}`                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Oba                       |
| `omniroute setup-cursor`   | Cursor                           | Nič — natisne korakov v aplikaciji (konfiguracija Cursor je neprozorna SQLite)                                                                                     | `--remote` `--api-key` `--only` `--port`                                                                                                   | Oba                       |
| `omniroute setup-roo`      | Koda Roo                         | `~/.omniroute/roo-settings.json` (uvozni dokument) + nastavi `roo-cline.autoImportSettingsPath`, če obstaja koda VS `settings.json`                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Oba                       |
| `omniroute setup-crush`    | Zdrobite                         | `~/.config/crush/crush.json` — ponudnik `openai-compat`, ključ prek `$OMNIROUTE_API_KEY`                                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Oba                       |
| `omniroute setup-zed`      | Zed                              | `~/.config/zed/settings.json` — `openai_compatible.omniroute` ponudnik (≤ 25 modeli, ki podpirajo orodje), ključ prek `$OMNIROUTE_API_KEY`                         | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | Oba                       |
| `omniroute setup-goose`    | Gos                              | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + natisne env recept                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Oba                       |
| `omniroute setup-aider`    | Aider                            | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + natisne env recept                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Oba                       |
| `omniroute setup-qwen`     | koda Qwen                        | `~/.qwen/settings.json` — V4 `modelProviders.openai` polje + `OMNIROUTE_API_KEY` v `~/.qwen/.env`                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Oba                       |
| `omniroute setup-gemini`   | Gemini CLI (izvorni Gemini API)  | `~/.gemini/settings.json` — auth izbira in model; ključ `~/.gemini/.env` —, koren strežnika in okolje Gemini                                                       | `--remote` `--context` `--api-key` `--model` `--yes` `--dry-run` `--port` `--gemini-home` `--settings-path` `--env-path`                   | Oba                       |
| `omniroute setup-5dive`    | 5dive (agentska flota)           | Nič pod `$HOME` — ne piše 5dive** avtorski profil** (`/var/lib/5dive/auth-profiles/<name>/`) preko `5dive agent auth set`; samo root, deluje na gostitelju flote   | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Oba                       |
| `omniroute setup-whycodes` | WhyCodes                         | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); pot je `$WHYCODES_HOME/config.toml` ali `~/.whycodes/config.toml`                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Oba                       |
| `omniroute run <target>`   | Zagon med izvajanjem (generično) | Nič — ne ustvari `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` s pravim env in argumenti; Qwen in Gemini uporabljata začasen izoliran dom | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Oba                       |
| `omniroute launch`         | koda Claude                      | Nič — ne ustvari `claude` z vstavljenim `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Oba                       |
| `omniroute launch <tool>`  | Vsako orodje za zagon            | Nič v vaši lastni konfiguraciji: konfiguracija za zagon v zasebnem začasnem imeniku, žeton seje                                                                    | `--model` `--all-models` `--list` `--remote` `--port` `--api-key` `--profile` `--dry-run` `--json`                                         | Oba                       |
| `omniroute launch-codex`   | OpenAI Codex CLI                 | Nič — ne ustvari `codex` s ponudnikom `omniroute` vstavljenim prek zastavic `-c`                                                                                   | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Oba                       |

Opombe o zastavicah (preverjeno v viru ukazov):

- `--remote <url>` — uporablja oddaljeni OmniRoute (preglasi `--port` in aktivni kontekst). `--api-key <key>` zagotovi poverilnico za ta strežnik (privzeto je `OMNIROUTE_API_KEY` env var ali žeton aktivnega konteksta).
- `--only <patterns>` — podnizi, ločeni z vejicami; obdrži samo model IDs, ki se ujema (npr. `--only glm,kimi`). Na voljo na `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed`.
- `--dry-run` — natisne točno tisto, kar bi bilo zapisano, ne da bi se dotaknil datotečnega sistema. Na voljo pri vsakem ukazu `setup-*`** razen** `setup-cursor` (ki nikoli ne zapiše datoteke).
- `--model <id>` — je potreben (ali izbran interaktivno) za orodja, ki nimajo samodejnega odkrivanja modela: Cline, Kilo, Roo, Goose, Qwen, Gemini, Aider, 5dive, WhyCodes. Ta orodja sprejemajo tudi `--yes` za neinteraktivne zagone (ki nato zahtevajo `--model`). `setup-opencode` vzame `--model` za nastavitev privzetega modela najvišje ravni.
- `--model <id>` na `omniroute run` sledi ožičenju manifesta na cilj (`bin/cli/cli-manifest.mjs`):** pomočnik** prejme `--model openai/<id>` in** odprta koda** `--model omniroute/<id>` (predpona se doda le, če je ID še ne nosi);** qwen** in** dvojčka** prejeti osebni dokument dobesedno;** claude** dobi preko `ANTHROPIC_MODEL`,** gos** prek `GOOSE_MODEL`,** whycodes** prek `-P omniroute -m <id>` in** kodeks** prek `-c model_providers.omniroute.*` args.**Qwen je edini cilj izvajanja, ki težko zahteva `--model`** — `omniroute run qwen` brez njega zapusti `2` z eksplicitno napako.
- `--port <port>` — lokalna vrata OmniRoute (privzeto `20128`, prezrto, ko je nastavljen `--remote` ). Prisoten na vseh `setup-*` in obeh zaganjalnikih.
- izhodne kode `omniroute run` : lastna izhodna koda podrejenega CLI se prenese dobesedno; `2` = neveljavni argumenti (nepodprt cilj, manjka zahtevani `--model`, zaščita vsebnika); `127` = ciljna dvojiška datoteka ni v `PATH`; `130`/`143`/`129`, ko zagon konča `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = druga napaka pri zagonu izvajalnega okolja.
- Oba zaganjalnika (`launch`, `launch-codex`) sprejmeta `--profile <name>` za izbiro profila, ki ga je napisal `setup-claude` / `setup-codex`, in argumente prehoda za osnovno dvojiško datoteko `claude` / `codex`.

Interaktivni izbirnik si delijo tudi nastavitveni recepti:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
omniroute configure gemini
omniroute configure whycodes
```

`configure` trenutno prenaša preizkušene recepte za `codex`, `claude`, `opencode`, `qwen`, `gemini`, `aider`, `goose`, `cline`, `continue`, `kilo`, `5dive` in `whycodes`. Vnosi v kataloge samo za IDE, MITM in samo za vodiče ostajajo eksplicitni tokovi `setup-*`/manual in niso predstavljeni kot cilji, ki jih je mogoče zagnati.

> `setup-opencode` je** lahek openai združljiv** integracija OpenCode. Obstaja tudi bogatejša integracija vtičnika — `omniroute setup opencode` —, ki namesti `@omniroute/opencode-plugin`. So različni ukazi; tabela zgoraj dokumenti `setup-opencode`.
>
> Vtičnik je na voljo v dveh paketih, po enem za OpenCode major, ker oba nalagalnika pričakujeta različne vstopne točke: `@omniroute/opencode-plugin` za OpenCode v1 in `@omniroute/opencode-plugin-v2` za OpenCode v2. Paket v2 je nov (`0.1.0`) in sledi gostiteljski pogodbi, ki se še vedno premika, zato prebere seme oblike OpenCode v osnutek kataloga, namesto da bi ga prevzel. Namestite ga tako, da v `opencode.json` dodate vnos `plugins` ; `omniroute setup opencode` še vedno namesti paket v1. Možnosti in vrstni red iskanja poverilnic so v paketu README.

---

## Lokalna uporaba

Ko OmniRoute deluje na `localhost:20128`, preprosto zaženite ukaz za nastavitev
svojega orodja. Katalog se pridobi iz lokalnega strežnika.

```bash
# Codex: za vsak ustrezen model zapiši profil v ~/.codex/
omniroute setup-codex
codex --profile glm52            # uporabi ustvarjeni profil

# Claude Code: zapiši profile za posamezne modele in nato zaženi enega
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: zapiši ponudnika, združljivega z OpenAI, z vsemi modeli iz kataloga
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # uporabljen prek {env:OMNIROUTE_API_KEY}, nikoli na disku
opencode -m omniroute/glm/glm-5.2 "..."

# Orodja brez samodejnega odkrivanja potrebujejo izrecno določen model:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Predogled brez zapisovanja:
omniroute setup-continue --dry-run
```

Zagon brez zapisovanja kakršne koli konfiguracije (samo vstavljanje spremenljivk okolja):

```bash
omniroute launch                 # Claude Code → lokalni OmniRoute
omniroute launch-codex           # Codex CLI → lokalni OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Izrecna pot do ukaza: nespremenjeno posreduj vse, kar sledi za --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Oddaljena uporaba

Poljuben ukaz za nastavitev usmerite na oddaljeni OmniRoute z `--remote` + `--api-key`.
Katalog se pridobi z oddaljenega strežnika, konfiguracija pa se zapiše v vaš lokalni računalnik.

```bash
# OpenCode z oddaljenim VPS-jem, obdrži samo modele glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # najprej izvozi OMNIROUTE_API_KEY

# Profili Codex iz oddaljenega kataloga
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Zaženi CLI neposredno proti oddaljenemu strežniku
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Namesto vsakokratnega podajanja `--remote`/`--api-key` se enkrat prijavite in pustite,
da ju **aktivni kontekst** zagotovi samodejno:

```bash
omniroute connect 192.168.0.15        # ustvari žeton z omejenim obsegom in shrani kontekst
omniroute setup-codex                 # ← zdaj uporablja oddaljeni katalog
omniroute setup-opencode              # ← enako
omniroute launch                      # ← Claude Code proti oddaljenemu strežniku
```

Za kontekste, obsege in upravljanje žetonov glejte [Oddaljeni način](./REMOTE-MODE.md).

---

## 5 flote potapljaških agentov

[5dive](https://5dive.ai) upravlja floto dolgotrajnih kodirnih agentov, od katerih je vsak enota systemd pod lastnim uporabnikom Unixa. Ne gre za kodiranje CLI, zato `omniroute run` ne more zagnati — `5dive`** samo za konfiguracijo** tarča.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Obe obliki pišeta en 5dive** avtorski profil** in vsak sedež `claude` vezan na ta profil, potem govori z OmniRoute. Tri stvari so specifične za ta cilj:

- **Zažene se na gostitelju flote kot root.** Glagoli 5dive delujejo na lokalne sistemske enote in korenski imenik stanja; ni oddaljenega načina. Recept se znova izvede prek `sudo`, ko še ni root (`--no-sudo` to izklopi in namesto tega natisne ukaz).
- **Končna točka mora biti `https://` razen če je povratna zanka.** Agentov ključ API upravlja ta URL pri vsaki zahtevi, 5dive pa zavrne končno točko z navadnim besedilom. Zasebni naslov LAN ni izjema.
- **Zatič modela vsakega sedeža prehiteva profil.** Profil nosi `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, vendar sedež, ki je še vedno pripet na ID standardnega modela, ne uspe pri prvem obratu z _"Prišlo je do težave z izbranim modelom"_. Prestopite `--agent <name>` (ponovljivo), da pripnete tudi sedeže; recept natisne ukaz, ko ga vi ne.

Ključ API se izroči 5dive on** stdin** (`--api-key=-`), zato se nikoli ne prikaže v izhodu `ps`.

Usmerjanje profila na OmniRoute** kombinacija** namesto enega samega modela je tisto, kar ponudniku voznega parka omogoči preklop v primeru napake: ko se je primarna končna točka močno spustila sredi obrata v teku, zabeleženem na [#11578](https://github.com/cheaper-inference/OmniRoute/issues/11578), je agent dokončal svoje preostale korake v nadomestnem načinu in nikoli ni odkril izpada.

---

## Osnovne konvencije URL (katera orodja želijo `/v1`)

OmniRoute izpostavi površino OpenAI pri `/v1`, površino Anthropic pri korenu in izvorno površino Gemini pri `/v1beta`. Vsaka integracija je povezana z obliko, ki jo pričakuje njeno orodje (preverjeno v viru ukaza):

| Integracija                                                                | Napisana osnova URL | `/v1`?                                     |
| -------------------------------------------------------------------------- | ------------------- | ------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | korenina            | Ne — Cline doda `/v1/chat/completions`     |
| `setup-goose` (`OPENAI_HOST`)                                              | korenina            | Ne — Goose doda pot                        |
| `setup-aider` (`OPENAI_API_BASE`)                                          | korenina            | Ne — LiteLLM doda `/v1/chat/completions`   |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | z `/v1`             | ja                                         |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | z `/v1`             | ja                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | korenina            | Ne — koda Claude doda `/v1/messages`       |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | z `/v1`             | ja                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | z `/v1`             | ja                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | korenina            | Ne — SDK doda `/v1beta/models/…`           |
| `setup-5dive` (`ANTHROPIC_BASE_URL` v auth profilu)                        | korenina            | Ne — koda Claude doda `/v1/messages`       |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | z `/v1`             | Da — WhyCodes objavlja `/chat/completions` |

---

## Ohranjanje nativnih odvisnosti pri posodobitvi: `--include=optional`

Ko izvedete posodobitev z `omniroute update` (po potrditvi ali z `--apply`),
OmniRoute zažene namestitev z vključenim `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

To **ni** zastavica, ki jo posredujete ukazu `omniroute update` — program za
posodabljanje jo vedno uporabi. Zagotavlja, da se `optionalDependencies`
(`better-sqlite3`, `keytar`, `tls-client`, sklad SLM LLMLingua) ohranijo med
posodobitvijo, tudi če je v vaši konfiguraciji npm nastavljeno `omit=optional`,
kar bi sicer brez opozorila odstranilo nativni gonilnik SQLite in povezavo s
sistemsko shrambo ključev. Za predogled natančnega ukaza brez izvedbe:

```bash
omniroute update --dry-run
# [POSKUSNI ZAGON] Izvedel bi: npm install -g omniroute@latest --include=optional
```

Druge zastavice ukaza `omniroute update` (preverjeno v izvorni kodi): `--check`
(izhod s kodo 1, če je različica zastarela), `--apply` (namestitev brez poziva),
`--changelog`, `--no-backup`, `--yes`.

---

## Google Gemini CLI prek `omniroute run gemini`

Pogodba je preverjena z `@google/gemini-cli` 0.50.0: CLI upošteva
`GOOGLE_GEMINI_BASE_URL` in nanj pošilja zahteve `POST /v1beta/models/<model>:generateContent`
(in `:streamGenerateContent?alt=sse`) — natanko na nativni vmesnik Gemini
(`/v1beta`) storitve OmniRoute. `omniroute run gemini` to nastavi samodejno:

- `GOOGLE_GEMINI_BASE_URL` → aktivni osnovni URL storitve OmniRoute (koren, brez `/v1`);
- `GEMINI_API_KEY` → razrešena poverilnica OmniRoute (možnost/okolje/kontekst);
- **začasni izolirani `GEMINI_CLI_HOME`**, katerega `.gemini/settings.json`
  izbere overjanje `gemini-api-key`, zato shranjena seja Google OAuth (Code Assist)
  nikoli ne preglasi zagona, usmerjenega v OmniRoute — po koncu se odstrani;
- **higiena okolja**: iz okolja podrejenega procesa se odstranijo
  `GOOGLE_API_KEY`, `GOOGLE_GENAI_USE_VERTEXAI` in `GOOGLE_GENAI_USE_GCA`
  (ki bi overjanje preusmerile na Vertex/Code Assist), spremenljivka
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` pa se nastavi kot dodatna varovalka
  — drugi cilji `run` so enako obravnavani glede svojih konfliktnih spremenljivk;
- dodajanje `--model <id>` iz `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Geminin mehanizem preverjanja zaupanja delovnemu prostoru velja tudi v brezglavem
načinu — sami posredujte `--skip-trust` (ali imeniku interaktivno izkažite
zaupanje); zaganjalnik ga namenoma ne zaobide. Ta zaganjalnik se razlikuje od
**registracije ACP** (`src/lib/acp/registry.ts`, `gemini --acp`), ki ostaja
integracija protokola agentov za `/dashboard/acp-agents`.

---

## Resnični preizkus delovanja (ob izrecni vključitvi)

Deterministični regresijski preizkusi načrta zagona se izvajajo v CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Za preverjanje RESNIČNIH izvršljivih datotek z RESNIČNIM
strežnikom OmniRoute je na voljo ogrodje, ki ga je treba izrecno vključiti, na naslovu
`tests/integration/upstream-cli-smoke.int.test.ts`. Nikoli se ne zažene samodejno
(vsak podpreizkus je preskočen, razen če je nastavljeno `RUN_CLI_SMOKE=1`), poverilnico posreduje prek IMENA
okoljske spremenljivke (nikoli prek vrednosti), iz vseh zabeleženih izhodnih podatkov zakrije nize,
ki so videti kot ključi, preskoči cilje, katerih izvršljiva datoteka ni nameščena, in napake
razvrsti kot auth / upstream / config namesto zgolj logične vrednosti:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Izbirno: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` omeji nabor preverjanj;
`OMNIROUTE_SMOKE_TIMEOUT_MS` preglasi 120-sekundno časovno omejitev za posamezen cilj.

---

## Glejte tudi

- [Konfiguracija Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — podrobnejši vodnik za Claude Code
- [Konfiguracija Codex CLI](./CODEX-CLI-CONFIGURATION.md) — enkratna osnovna nastavitev `[model_providers.omniroute]`
- [Oddaljeni način](./REMOTE-MODE.md) — konteksti, dostopni žetoni z omejenim obsegom in upravljanje oddaljenega strežnika
- [Referenca orodij CLI](../reference/CLI-TOOLS.md) — celoten katalog podprtih orodij in strani nadzorne plošče
- [Vodnik za nastavitev](./SETUP_GUIDE.md) — načini namestitve in uvodno nastavljanje ob prvem zagonu
