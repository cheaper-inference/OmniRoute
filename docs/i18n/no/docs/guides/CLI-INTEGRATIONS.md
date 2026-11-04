# CLI Integrations (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

For det delte kjørbare manifestet, begrensede underordnede miljøer og vedvarende Gemini oppsett, se [CLI lanseringskontrakter](./CLI-LAUNCH-CONTRACTS.md).

OmniRoute sender en familie av `setup-*` -kommandoer som konfigurerer en kodende CLI (Codex, Claude Code, OpenCode, Cline, ...) for å bruke OmniRoute som backend - slik at verktøyet snakker med** en** endepunkt- og OmniRoute -ruter til riktig leverandør med automatisk fallback. Hver kommando leser** bo** modellkatalog fra en kjørende OmniRoute (lokal eller ekstern) og skriver verktøyets egen konfigurasjonsfil på** din** maskin. API nøkkelen refereres til av en miljøvariabel uansett hvor verktøyet støtter den. Kommandoer som vedvarer en verktøy-lokal miljøfil er notert nedenfor.

Det er også en generisk oppstarter – `omniroute run <target>` – som skaper `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` eller `whycodes` med riktig env injisert, uten å skrive noen konfigurasjon i det hele tatt. Mål og deres aliaser kommer fra det kanoniske manifestet `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`), og `omniroute completion` tilbyr de samme manifest-avledede målordene. De eldre lanseringene per verktøy - `omniroute launch` (Claude -kode) og `omniroute launch-codex` (Codex) - forblir tilgjengelige.

Leverandørintroduksjon er tilgjengelig fra samme local/remote kontekst. API-først-kommandoene nedenfor holder administrasjonsautentisering atskilt fra leverandørlegitimasjon og skriver aldri ut en legitimasjon i strukturert utdata:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

For skript, foretrekk `--credential-stdin` eller `--credential-env`; `--credential` beholdes for kontrollert lokal bruk. `providers remove` krever `--yes` på en ikke-interaktiv terminal, og alle fem kommandoene respekterer den aktive konteksten eller de globale `--base-url`/`--api-key` -alternativene.

Leverandørvelgere avviser tvetydige ID prefikser, navn eller leverandørnavn; bruk en full tilkobling ID når flere tilkoblinger samsvarer. Opprett og rediger kommandoer les den lagrede tilkoblingen tilbake, og fjerning bekrefter at den ikke lenger er lesbar. En import hopper over et eksisterende provider/name par. Importerte oppføringer kan ikke overstyre administrasjonsendepunktet, konteksten eller administrasjonslegitimasjonen som er levert til CLI.

For engangs, håndskrevne grunnoppsett av de to rikeste integrasjonene, se dypdykkene per verktøy:

- [Claude -kodekonfigurasjon](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI -konfigurasjon](./CODEX-CLI-CONFIGURATION.md)
- [Remote Mode](./REMOTE-MODE.md) — kjør en fjernkontroll OmniRoute (VPS / Tailnet) fra den bærbare datamaskinen
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot utvidelsen; den kan også kjøre disse `setup-*` kommandoene for deg fra innsiden av editoren

---

## Mesterbord

Hver kommando hedrer** aktiv kontekst** (sett med `omniroute connect`, se [Remote Mode](./REMOTE-MODE.md) ) eller eksplisitte `--remote <url> --api-key <key>` flagg. "Lokal vs ekstern" nedenfor betyr: uten flagg retter den mot `http://localhost:20128`; med `--remote` (eller en aktiv ekstern kontekst) henter den katalogen fra den serveren og skriver konfigurasjonen lokalt.

| Kommando                   | Verktøy                      | Hva den skriver                                                                                                                                                    | Nøkkelflagg                                                                                                                                | Lokal vs fjernkontroll |
| -------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — én profil per kompatibel tekstmodell (`codex --profile <name>`)                                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Både                   |
| `omniroute setup-claude`   | Claude kode                  | `~/.claude/profiles/<name>/settings.json` — én profil per matchet modell (`CLAUDE_CONFIG_DIR`)                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Både                   |
| `omniroute setup-opencode` | OpenCode (openai-kompatibel) | `~/.config/opencode/opencode.json` — `omniroute` leverandør med hver katalogmodell (`opencode -m omniroute/<model>`)                                               | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Både                   |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (CLI -modus) + skriver ut VS -kodeutvidelsesinnstillinger                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Både                   |
| `omniroute setup-kilo`     | Kilo kode                    | `~/.local/share/kilo/auth.json` (CLI) + slår sammen `kilocode.*` til VS koden `settings.json` hvis den finnes                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Både                   |
| `omniroute setup-continue` | Fortsett / `cn` CLI          | `~/.continue/config.yaml` — `provider: openai` modeller, nøkkel via `${{ secrets.OMNIROUTE_API_KEY }}`                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Både                   |
| `omniroute setup-cursor`   | Cursor                       | Ingenting - skriver ut trinnene i appen (Cursor config er ugjennomsiktig SQLite)                                                                                   | `--remote` `--api-key` `--only` `--port`                                                                                                   | Både                   |
| `omniroute setup-roo`      | Roo kode                     | `~/.omniroute/roo-settings.json` (import doc) + setter `roo-cline.autoImportSettingsPath` hvis en VS kode `settings.json` eksisterer                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Både                   |
| `omniroute setup-crush`    | Knus                         | `~/.config/crush/crush.json` — `openai-compat` leverandør, nøkkel via `$OMNIROUTE_API_KEY`                                                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Både                   |
| `omniroute setup-zed`      | Zed                          | `~/.config/zed/settings.json` — `openai_compatible.omniroute` leverandør (≤ 25 verktøykompatible modeller), nøkkel via `$OMNIROUTE_API_KEY`                        | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | Både                   |
| `omniroute setup-goose`    | Gås                          | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + skriver ut env-oppskrift                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Både                   |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + ut env-oppskrift                                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Både                   |
| `omniroute setup-qwen`     | Qwen kode                    | `~/.qwen/settings.json` — V4 `modelProviders.openai` array + `OMNIROUTE_API_KEY` i `~/.qwen/.env`                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Både                   |
| `omniroute setup-5dive`    | 5dive (agentflåte)           | Ingenting under `$HOME` — skriver et 5dive** auth-profil** (`/var/lib/5dive/auth-profiles/<name>/`) via `5dive agent auth set`; root-only, kjører på flåteverten   | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Både                   |
| `omniroute setup-whycodes` | WhyCodes                     | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); banen er `$WHYCODES_HOME/config.toml` eller `~/.whycodes/config.toml`                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Både                   |
| `omniroute run <target>`   | Runtime lansering (generisk) | Ingenting — spawn `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` med riktig env og args; Qwen og Gemini bruker et midlertidig isolert hjem | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Både                   |
| `omniroute launch`         | Claude kode                  | Ingenting — skaper `claude` med `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` injisert                                                                               | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Både                   |
| `omniroute launch-codex`   | OpenAI Codex CLI             | Ingenting — skaper `codex` med `omniroute` leverandøren injisert via `-c` flagg                                                                                    | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Både                   |

Merknader om flagg (verifisert i kommandokilden):

- `--remote <url>` — hent katalogen fra en ekstern OmniRoute (overstyrer `--port` og den aktive konteksten). `--api-key <key>` gir legitimasjonen for den serveren (standard til `OMNIROUTE_API_KEY` env var, eller den aktive kontekstens token).
- `--only <patterns>` — kommaseparerte delstrenger; behold bare modellen IDs som samsvarer (f.eks. `--only glm,kimi`). Tilgjengelig på `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed`.
- `--dry-run` — skriv ut nøyaktig det som ville blitt skrevet uten å berøre filsystemet. Tilgjengelig på hver `setup-*` -kommando** unntatt** `setup-cursor` (som aldri skriver en fil).
- `--model <id>` — kreves (eller valgt interaktivt) for verktøyene som ikke har noen automatisk oppdagelsesmodell: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive, WhyCodes. Disse verktøyene godtar også `--yes` for ikke-interaktive kjøringer (som da krever `--model`). `setup-opencode` bruker `--model` for å angi standard toppnivåmodell.
- `--model <id>` på `omniroute run` følger manifestets per-mål ledninger (`bin/cli/cli-manifest.mjs`):** hjelpemann** mottar `--model openai/<id>` og** åpen kode** `--model omniroute/<id>` (prefikset legges bare til når ID-en ikke allerede har den);** qwen** og** Gemini** motta id-en ordrett;** claude** får det via `ANTHROPIC_MODEL`,** gås** via `GOOSE_MODEL`,** hvorfor-koder** via `-P omniroute -m <id>`, og** kodeks** via `-c model_providers.omniroute.*` args.**Qwen er det eneste kjøremålet som hardt krever `--model`** — `omniroute run qwen` uten den avslutter `2` med en eksplisitt feil.
- `--port <port>` — lokal OmniRoute port (standard `20128`, ignorert når `--remote` er satt). Til stede på alle `setup-*` og begge bæreraketter.
- `omniroute run` exit-koder: barnets CLI egen exit-kode formidles ordrett; `2` = ugyldige argumenter (ikke støttet mål, mangler nødvendig `--model`, container guard); `127` = målbinæren er ikke i `PATH`; `130`/`143`/`129` når lanseringen er avsluttet med `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = annen kjøretidsstartfeil.
- De to lanseringene (`launch`, `launch-codex`) aksepterer `--profile <name>` for å velge en profil skrevet av `setup-claude` / `setup-codex`, pluss pass-through args for den underliggende `claude` / `codex` binærfilen.

Den interaktive velgeren deles også av oppsettsoppskriftene:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` delegerer for øyeblikket til de testede oppskriftene for `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` og `5dive`. Katalogoppføringer kun for IDE, MITM og kun veiledning forblir eksplisitte `setup-*`/manuelle flyter og presenteres ikke som lanserbare mål.

> `setup-opencode` er** lett openai-kompatibel** OpenCode integrasjon. Det er også en rikere plugin-integrasjon — `omniroute setup opencode` — som installerer `@omniroute/opencode-plugin`. De er forskjellige kommandoer; tabellen ovenfor dokumenterer `setup-opencode`.
>
> Programtillegget kommer i to pakker, en per OpenCode major, fordi de to lasterne forventer forskjellige inngangspunkter: `@omniroute/opencode-plugin` for OpenCode v1 og `@omniroute/opencode-plugin-v2` for OpenCode v2. V2-pakken er ny (`0.1.0`) og følger en vertskontrakt som fortsatt er i bevegelse, så den leser formen OpenCode frø inn i katalogutkastet i stedet for å anta en. Installer den ved å legge til en `plugins` oppføring i `opencode.json`; `omniroute setup opencode` installerer fortsatt v1-pakken. Alternativer og oppslagsrekkefølgen for legitimasjon er i pakken README.

---

## Lokal bruk

Når OmniRoute kjører på `localhost:20128`, trenger du bare å kjøre konfigurasjonskommandoen for verktøyet ditt. Katalogen hentes fra den lokale serveren.

```bash
# Codex: skriv én profil per samsvarende modell til ~/.codex/
omniroute setup-codex
codex --profile glm52            # bruk en generert profil

# Claude Code: skriv profiler per modell, og start deretter én av dem
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: skriv den OpenAI-kompatible leverandøren med alle katalogmodellene
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # refereres via {env:OMNIROUTE_API_KEY}, aldri på disk
opencode -m omniroute/glm/glm-5.2 "..."

# Verktøy uten automatisk oppdagelse krever en eksplisitt modell:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Forhåndsvis uten å skrive noe:
omniroute setup-continue --dry-run
```

Start uten å skrive noen konfigurasjon i det hele tatt (kun miljøvariabelinjeksjon):

```bash
omniroute launch                 # Claude Code → lokal OmniRoute
omniroute launch-codex           # Codex CLI → lokal OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Eksplisitt kommandobane: videresend alt som kommer etter --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Ekstern bruk

Pek en hvilken som helst konfigurasjonskommando mot en ekstern OmniRoute med `--remote` + `--api-key`. Katalogen hentes fra den eksterne serveren, og konfigurasjonen skrives på den lokale maskinen din.

```bash
# OpenCode mot en ekstern VPS, behold bare glm/kimi-modeller
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # eksporter OMNIROUTE_API_KEY først

# Codex-profiler fra en ekstern katalog
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Start et CLI direkte mot den eksterne serveren
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

I stedet for å angi `--remote`/`--api-key` hver gang kan du logge inn én gang og la den **aktive konteksten** oppgi dem automatisk:

```bash
omniroute connect 192.168.0.15        # oppretter et token med begrenset omfang og lagrer konteksten
omniroute setup-codex                 # ← bruker nå den eksterne katalogen
omniroute setup-opencode              # ← det samme
omniroute launch                      # ← Claude Code mot den eksterne serveren
```

Se [Ekstern modus](./REMOTE-MODE.md) for kontekster, omfang og tokenadministrasjon.

---

## 5dive-agentflåter

[5dive](https://5dive.ai) kjører en flåte med langvarige kodeagenter, der hver agent er en systemd-enhet under sin egen Unix-bruker. Det er ikke selv et CLI for koding, så det finnes ikke noe `omniroute run` kan starte — `5dive` er et mål **kun for konfigurering**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Begge formene skriver én 5dive-**autentiseringsprofil**, og hvert `claude`-sete som er knyttet til denne profilen, kommuniserer deretter med OmniRoute. Tre ting er spesifikke for dette målet:

- **Det kjører på flåteverten som root.** Verbene til 5dive opererer på lokale systemd-enheter og en root-eid tilstandskatalog. Det finnes ingen ekstern modus. Oppskriften kjører seg selv på nytt gjennom `sudo` når den ikke allerede kjører som root (`--no-sudo` deaktiverer dette og skriver ut kommandoen i stedet).
- **Endepunktet må bruke `https://`, med mindre det er loopback.** Agentens API-nøkkel følger denne URL-en i hver forespørsel, og 5dive avviser et ukryptert endepunkt utenfor verten. En privat LAN-adresse er ikke et unntak.
- **Hvert setes egen modellfesting har høyere prioritet enn profilen.** Profilen inneholder `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, men et sete som fortsatt er festet til en standard modell-ID, mislykkes i sin første runde med _"Det er et problem med den valgte modellen"_. Angi `--agent <name>` (kan gjentas) for å feste setene også. Oppskriften skriver ut kommandoen når du ikke gjør det.

API-nøkkelen sendes til 5dive via **stdin** (`--api-key=-`), slik at den aldri vises i utdataene fra `ps`.

Ved å peke profilen mot en OmniRoute-**kombinasjon** i stedet for én enkelt modell får flåten failover mellom leverandører: Da det primære endepunktet gikk helt ned midt i en runde under kjøringen som er dokumentert i [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), fullførte agenten de gjenværende trinnene via reserveløsningen uten noen gang å synliggjøre driftsavbruddet.

---

## Base URL -konvensjoner (hvilke verktøy vil ha `/v1`)

OmniRoute eksponerer OpenAI overflaten ved `/v1`, Anthropic overflaten ved roten og en naturlig Gemini overflate ved `/v1beta`. Hver integrasjon er koblet til den formen verktøyet forventer (verifisert i kommandokilden):

| Integrering                                                                | Base URL skrevet | `/v1`?                                          |
| -------------------------------------------------------------------------- | ---------------- | ----------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | rot              | Nei — Cline legger til `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | rot              | Nei — Gås legger til banen                      |
| `setup-aider` (`OPENAI_API_BASE`)                                          | rot              | Nei — LiteLLM legger til `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | med `/v1`        | Ja                                              |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | med `/v1`        | Ja                                              |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | rot              | Nei — Claude -koden legger til `/v1/messages`   |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | med `/v1`        | Ja                                              |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | med `/v1`        | Ja                                              |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | rot              | Nei – SDK legger til `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` i auth-profilen)                       | rot              | Nei — Claude -koden legger til `/v1/messages`   |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | med `/v1`        | Ja — WhyCodes poster `/chat/completions`        |

---

## Beholde native avhengigheter ved oppdatering: `--include=optional`

Når du oppdaterer med `omniroute update` (etter bekreftelse eller med `--apply`),
kjører OmniRoute installasjonen med `--include=optional` innebygd:

```bash
npm install -g omniroute@latest --include=optional
```

Dette er **ikke** et flagg du sender til `omniroute update` — det brukes alltid av
oppdateringsprogrammet. Det sikrer at `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM-stakken) beholdes gjennom oppdateringen, selv om npm-konfigurasjonen
din har `omit=optional` angitt, noe som ellers i stillhet ville fjernet den native SQLite-driveren
og OS-nøkkelringbindingen. Slik forhåndsviser du den nøyaktige kommandoen uten å utføre den:

```bash
omniroute update --dry-run
# [TØRRKJØRING] Ville kjørt: npm install -g omniroute@latest --include=optional
```

Andre flagg for `omniroute update` (verifisert i kilden): `--check` (avslutt med 1 hvis
utdatert), `--apply` (installer uten å spørre), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI via `omniroute run gemini`

Kontrakten er verifisert mot `@google/gemini-cli` 0.50.0: CLI-en respekterer
`GOOGLE_GEMINI_BASE_URL` og sender `POST /v1beta/models/<model>:generateContent`
(og `:streamGenerateContent?alt=sse`) til den — nøyaktig OmniRoutes native
Gemini-grensesnitt (`/v1beta`). `omniroute run gemini` konfigurerer dette automatisk:

- `GOOGLE_GEMINI_BASE_URL` → den aktive basis-URL-en for OmniRoute (rot, uten `/v1`);
- `GEMINI_API_KEY` → den utledede OmniRoute-legitimasjonen (alternativ/miljø/kontekst);
- en **midlertidig, isolert `GEMINI_CLI_HOME`** der `.gemini/settings.json`
  velger `gemini-api-key`-autentisering, slik at en lagret Google OAuth-økt (Code Assist)
  aldri overstyrer den OmniRoute-styrte oppstarten — fjernes etter avslutning;
- **miljøhygiene**: underprosessens miljø tømmes for `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` og `GOOGLE_GENAI_USE_GCA` (som ville omdirigert
  autentiseringen til Vertex/Code Assist), og `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  angis som en ekstra sikkerhetsmekanisme — de andre `run`-målene får samme
  behandling for sine egne motstridende variabler;
- injisering av `--model <id>` fra `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Geminis vern for godkjenning av arbeidsområdet gjelder fortsatt i hodeløs modus — oppgi
`--skip-trust` (eller godkjenn katalogen interaktivt) selv; oppstartsprogrammet
omgår det bevisst ikke. Dette oppstartsprogrammet er atskilt fra **ACP-registreringen**
(`src/lib/acp/registry.ts`, `gemini --acp`), som fortsatt er
agentprotokollintegrasjonen for `/dashboard/acp-agents`.

---

## Reell smoke-testkjøring (valgfri)

Deterministiske regresjonstester av oppstartsplanen kjøres i CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). For å validere de REELLE kjørbare filene mot en REELL
OmniRoute-server finnes det et valgfritt testrammeverk i
`tests/integration/upstream-cli-smoke.int.test.ts`. Det kjøres aldri automatisk
(hver deltest hoppes over med mindre `RUN_CLI_SMOKE=1`), sender akkreditivets miljøvariabel-NAVN
(aldri verdien), sladder nøkkelformede strenger fra alle registrerte utdata, hopper over
mål der den kjørbare filen ikke er installert, og klassifiserer feil som
autentisering / oppstrøms / konfigurasjon i stedet for en enkel boolsk verdi:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Valgfritt: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` begrenser testkjøringen;
`OMNIROUTE_SMOKE_TIMEOUT_MS` overstyrer tidsavbruddet på 120 sekunder per mål.

---

## Se også

- [Konfigurasjon av Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — den mer inngående veiledningen for Claude Code
- [Konfigurasjon av Codex CLI](./CODEX-CLI-CONFIGURATION.md) — engangsoppsettet av `[model_providers.omniroute]`
- [Ekstern modus](./REMOTE-MODE.md) — kontekster, avgrensede tilgangstokener og styring av en ekstern server
- [Referanse for CLI-verktøy](../reference/CLI-TOOLS.md) — den komplette katalogen over støttede verktøy og dashboardsider
- [Installasjonsveiledning](./SETUP_GUIDE.md) — installasjonsmetoder og førstegangsoppsett
