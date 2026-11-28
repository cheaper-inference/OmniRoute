# CLI Integrations (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

För det delade körbara manifestet, begränsade underordnade miljöer och beständiga Gemini inställningar, se [CLI lanseringskontrakt](./CLI-LAUNCH-CONTRACTS.md).

OmniRoute skickar en familj av `setup-*` -kommandon som konfigurerar en kodande CLI (Codex, Claude Code, OpenCode, Cline, …) för att använda OmniRoute som sin backend — så att verktyget pratar med** en** slutpunkts- och OmniRoute -rutter till rätt leverantör med automatisk reserv. Inställningskommandon använder ditt aktiva lokala eller fjärranslutna OmniRoute kontext och konfigurerar verktyget på** din** maskin. Katalogbaserade recept hämtar modeller från servern; enkelmodellsrecept accepterar `--model` eller frågar efter en modell ID. API nyckeln refereras av en miljövariabel varhelst verktyget stöder den. Kommandon som kvarstår i en verktygslokal miljöfil noteras nedan.

Katalogen och automationskommandona täcker olika uppsättningar verktyg:

| Yta                            | Räkna | Vad det betyder                                                                      |
| ------------------------------ | ----- | ------------------------------------------------------------------------------------ |
| Verktygskatalog                | 39    | Dokumenterade kodningsverktyg och agenter, inklusive manuella och IDE -integrationer |
| `omniroute run <target>`       | 8     | Starta adaptrar som tillhandahåller målets slutpunkt, referenser och modell          |
| `omniroute configure <target>` | 12    | Interaktiva konfigurationsrecept uppbackade av `setup-*` -kommandon                  |
| `setup-*` kommandon            | 16    | Registrerade inställningskommandon, inklusive guided/manual editor-inställning       |

Antalet återspeglar [verktygsmanifestet](../../config/cli-tools-manifest.json) och [kommandoregistret](../../bin/cli/commands/registry.mjs) 2026-11-17. En katalogpost innebär inte en startadapter. Se [CLI -verktygskatalogen](../reference/CLI-TOOLS.md) för hela inventeringen.

Det finns också en generisk launcher — `omniroute run <target>` — som skapar `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` eller `whycodes` med rätt env injicerad, utan att skriva någon konfiguration alls. Mål och deras alias kommer från det kanoniska manifestet `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`), och `omniroute completion` erbjuder samma manifest-härledda målord. `omniroute launch <tool>` startar ett kodningsverktyg som stöds med en sessionstoken per lansering och en modelllista byggd från de leverantörer du anslutit, och startar automatiskt en lokal gateway när ingen körs (se [LAUNCH.md](./LAUNCH.md) ). De äldre startverktygen — `omniroute launch` utan verktygsnamn (Claude -kod) och `omniroute launch-codex` (Codex) — förblir tillgängliga.

Providerintroduktion är tillgänglig från samma local/remote kontext. API-först-kommandona nedan håller hanteringsautentisering åtskild från leverantörsuppgifter och skriv aldrig ut autentiseringsuppgifter i strukturerad utdata:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

För skript, föredra `--credential-stdin` eller `--credential-env`; `--credential` behålls för kontrollerad lokal användning. `providers remove` kräver `--yes` på en icke-interaktiv terminal, och alla fem kommandon respekterar det aktiva sammanhanget eller de globala `--base-url`/`--api-key` alternativen.

Providerväljare avvisar tvetydiga ID prefix, namn eller leverantörsnamn; använd en fullständig anslutning ID när flera anslutningar matchar. Skapa och redigera kommandon läser tillbaka den sparade anslutningen och borttagning verifierar att den inte längre är läsbar. En import hoppar över ett befintligt provider/name par. Importerade poster kan inte åsidosätta hanteringens slutpunkt, kontext eller hanteringsuppgifter som tillhandahålls till CLI.

För engångshandskrivna grundinställningar för de två rikaste integrationerna, se djupdykningarna per verktyg:

- [Claude -kodkonfiguration](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI -konfiguration](./CODEX-CLI-CONFIGURATION.md)
- [Fjärrläge](./REMOTE-MODE.md) — kör en fjärrkontroll OmniRoute (VPS / Tailnet) från din bärbara dator
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot -tillägget; den kan också köra dessa `setup-*` kommandon åt dig inifrån redigeraren

---

## Mästarbord

Varje kommando hedrar** aktivt sammanhang** (ställ med `omniroute connect`, se [Fjärrläge](./REMOTE-MODE.md) ) eller explicita `--remote <url> --api-key <key>` flaggor. "Local vs remote" nedan betyder: utan flaggor riktar den sig mot `http://localhost:20128`; med `--remote` (eller en aktiv fjärrkontext) konfigurerar den den servern som backend och skriver konfigurationen lokalt. Katalogbaserade recept hämtar också modeller från den servern.

| Kommando                   | Verktyg                        | Vad den skriver                                                                                                                                                       | Nyckelflaggor                                                                                                                              | Lokal vs fjärrkontroll |
| -------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI               | `~/.codex/<name>.config.toml` — en profil per kompatibel textmodell (`codex --profile <name>`)                                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Både                   |
| `omniroute setup-claude`   | Claude kod                     | `~/.claude/profiles/<name>/settings.json` — en profil per matchad modell (`CLAUDE_CONFIG_DIR`)                                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Både                   |
| `omniroute setup-opencode` | OpenCode (openai-kompatibel)   | `~/.config/opencode/opencode.json` — `omniroute` leverantör med varje katalogmodell (`opencode -m omniroute/<model>`)                                                 | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Både                   |
| `omniroute setup-cline`    | Cline                          | `~/.cline/data/{globalState,secrets}.json` (CLI -läge) + skriver ut VS -kodförlängningsinställningar                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Både                   |
| `omniroute setup-kilo`     | Kilokod                        | `~/.local/share/kilo/auth.json` (CLI) + slår samman `kilocode.*` till VS Code `settings.json` om den finns                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Både                   |
| `omniroute setup-continue` | Fortsätt / `cn` CLI            | `~/.continue/config.yaml` — `provider: openai` modeller, nyckel via `${{ secrets.OMNIROUTE_API_KEY }}`                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Både                   |
| `omniroute setup-cursor`   | Cursor                         | Ingenting — skriver ut stegen i appen (Cursor config är ogenomskinlig SQLite)                                                                                         | `--remote` `--api-key` `--only` `--port`                                                                                                   | Både                   |
| `omniroute setup-roo`      | Roo kod                        | `~/.omniroute/roo-settings.json` (import doc) + ställer in `roo-cline.autoImportSettingsPath` om en VS -kod `settings.json` finns                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Både                   |
| `omniroute setup-crush`    | Krossa                         | `~/.config/crush/crush.json` — `openai-compat` leverantör, nyckel via `$OMNIROUTE_API_KEY`                                                                            | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Både                   |
| `omniroute setup-zed`      | Zed                            | `~/.config/zed/settings.json` — `openai_compatible.omniroute` leverantör (≤ 25 verktygskompatibla modeller), nyckel via `$OMNIROUTE_API_KEY`                          | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | Både                   |
| `omniroute setup-goose`    | Gås                            | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + skriver ut env-recept                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Både                   |
| `omniroute setup-aider`    | Aider                          | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + skriver ut env recept                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Både                   |
| `omniroute setup-qwen`     | Qwen kod                       | `~/.qwen/settings.json` — V4 `modelProviders.openai` array + `OMNIROUTE_API_KEY` i `~/.qwen/.env`                                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Både                   |
| `omniroute setup-gemini`   | Gemini CLI (native Gemini API) | `~/.gemini/settings.json` — auth val och modell; `~/.gemini/.env` — nyckel, serverrot och Gemini -miljö                                                               | `--remote` `--context` `--api-key` `--model` `--yes` `--dry-run` `--port` `--gemini-home` `--settings-path` `--env-path`                   | Både                   |
| `omniroute setup-5dive`    | 5dive (agentflotta)            | Ingenting under `$HOME` — skriver ett 5dive** auth-profil** (`/var/lib/5dive/auth-profiles/<name>/`) via `5dive agent auth set`; root-only, körs på flottans värd     | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Både                   |
| `omniroute setup-whycodes` | WhyCodes                       | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); sökvägen är `$WHYCODES_HOME/config.toml` eller `~/.whycodes/config.toml`                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Både                   |
| `omniroute run <target>`   | Runtime launch (generisk)      | Ingenting — spawn `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` med rätt env och args; Qwen och Gemini använder ett tillfälligt isolerat hem | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Både                   |
| `omniroute launch`         | Claude kod                     | Ingenting — skapar `claude` med `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` injicerade                                                                                | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Både                   |
| `omniroute launch <tool>`  | Alla startbara verktyg         | Inget i din egen konfiguration: per-lanseringskonfiguration i en privat temp dir, en sessionstoken                                                                    | `--model` `--all-models` `--list` `--remote` `--port` `--api-key` `--profile` `--dry-run` `--json`                                         | Både                   |
| `omniroute launch-codex`   | OpenAI Codex CLI               | Ingenting — skapar `codex` med `omniroute` leverantören injicerad via `-c` -flaggor                                                                                   | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Både                   |

Anteckningar om flaggor (verifierad i kommandokällan):

- `--remote <url>` — använder en fjärransluten OmniRoute (åsidosätter `--port` och det aktiva sammanhanget). `--api-key <key>` tillhandahåller autentiseringsuppgifterna för den servern (standard till `OMNIROUTE_API_KEY` env var, eller det aktiva sammanhangets token).
- `--only <patterns>` — kommaseparerade delsträngar; behåll bara modell IDs som matchar (t.ex. `--only glm,kimi`). Tillgänglig på `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed`.
- `--dry-run` — skriv ut exakt vad som skulle skrivas utan att röra filsystemet. Tillgängligt för varje `setup-*` -kommando** utom** `setup-cursor` (som aldrig skriver en fil).
- `--model <id>` — krävs (eller väljs interaktivt) för de verktyg som inte har någon automatisk upptäckt av modeller: Cline, Kilo, Roo, Goose, Qwen, Gemini, Aider, 5dive, WhyCodes. Dessa verktyg accepterar även `--yes` för icke-interaktiva körningar (som då kräver `--model`). `setup-opencode` tar `--model` för att ställa in standardmodellen på toppnivån.
- `--model <id>` på `omniroute run` följer manifestets ledningar per mål (`bin/cli/cli-manifest.mjs`):** medhjälpare** tar emot `--model openai/<id>` och** öppen kod** `--model omniroute/<id>` (prefixet läggs bara till när id:t inte redan har det);** qwen** och** gemini** ta emot id:t ordagrant;** claude** får det via `ANTHROPIC_MODEL`,** gås** via `GOOSE_MODEL`,** varförkoder** via `-P omniroute -m <id>`, och** kodex** via `-c model_providers.omniroute.*` args.**Qwen är det enda körmålet som hårt kräver `--model`** — `omniroute run qwen` utan det avslutar `2` med ett explicit fel.
- `--port <port>` — lokal OmniRoute port (standard `20128`, ignoreras när `--remote` är inställd). Finns på alla `setup-*` och båda launchers.
- `omniroute run` exit-koder: barnets CLI egen exit-kod sprids ordagrant; `2` = ogiltiga argument (mål som inte stöds, saknas krävs `--model`, containerskydd); `127` = målbinären är inte i `PATH`; `130`/`143`/`129` när lanseringen avslutas med `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = annat körningsstartsfel.
- De två startprogrammen (`launch`, `launch-codex`) accepterar `--profile <name>` för att välja en profil skriven av `setup-claude` / `setup-codex`, plus pass-through args för den underliggande binären `claude` / `codex`.

Den interaktiva väljaren delas också av installationsrecepten:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
omniroute configure gemini
omniroute configure whycodes
```

`configure` delegerar för närvarande till de testade recepten för `codex`, `claude`, `opencode`, `qwen`, `gemini`, `aider`, `goose`, `cline`, `continue`, `kilo`, `5dive` och `whycodes`. Katalogposter för endast IDE, MITM och endast guide förblir explicita `setup-*`/manuella flöden och presenteras inte som startbara mål.

> `setup-opencode` är** lätt openai-kompatibel** OpenCode integration. Det finns också en rikare plugin-integration — `omniroute setup opencode` — som installerar `@omniroute/opencode-plugin`. De är olika kommandon; tabellen ovan dokument `setup-opencode`.
>
> Insticksprogrammet kommer i två paket, ett per OpenCode major, eftersom de två laddarna förväntar sig olika ingångspunkter: `@omniroute/opencode-plugin` för OpenCode v1 och `@omniroute/opencode-plugin-v2` för OpenCode v2. V2-paketet är nytt (`0.1.0`) och följer ett värdkontrakt som fortfarande rör sig, så det läser in formen OpenCode -frön i katalogutkastet istället för att anta ett. Installera den genom att lägga till en `plugins` post till `opencode.json`; `omniroute setup opencode` installerar fortfarande v1-paketet. Alternativ och referensuppslagsordningen finns i paketet README.

---

## Lokal användning

När OmniRoute körs på `localhost:20128` behöver du bara köra installationskommandot för ditt
verktyg. Katalogen hämtas från den lokala servern.

```bash
# Codex: skriv en profil per matchad modell till ~/.codex/
omniroute setup-codex
codex --profile glm52            # använd en genererad profil

# Claude Code: skriv profiler per modell och starta sedan en
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: skriv den OpenAI-kompatibla providern med alla katalogmodeller
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # refereras via {env:OMNIROUTE_API_KEY}, aldrig på disk
opencode -m omniroute/glm/glm-5.2 "..."

# Verktyg utan automatisk identifiering behöver en explicit modell:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Förhandsgranska utan att skriva något:
omniroute setup-continue --dry-run
```

Starta utan att skriva någon konfiguration alls (endast miljövariabelinjektion):

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

# Explicit kommandosökväg: vidarebefordra allt som kommer efter --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Fjärranvändning

Rikta valfritt installationskommando mot en fjärransluten OmniRoute med `--remote` + `--api-key`. Katalogen
hämtas från fjärrservern och konfigurationen skrivs på din lokala dator.

```bash
# OpenCode mot en fjärr-VPS, behåll endast glm/kimi-modeller
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # exportera OMNIROUTE_API_KEY först

# Codex-profiler från en fjärrkatalog
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Starta ett CLI direkt mot fjärrservern
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

I stället för att ange `--remote`/`--api-key` varje gång kan du logga in en gång och låta den
**aktiva kontexten** tillhandahålla dem automatiskt:

```bash
omniroute connect 192.168.0.15        # skapar en avgränsad token och lagrar kontexten
omniroute setup-codex                 # ← använder nu fjärrkatalogen
omniroute setup-opencode              # ← samma sak
omniroute launch                      # ← Claude Code mot fjärrservern
```

Se [Fjärrläge](./REMOTE-MODE.md) för kontexter, behörighetsomfång och tokenhantering.

---

## 5 dykagentflottor

[5dive](https://5dive.ai) driver en flotta av långvariga kodningsagenter, var och en en systemd enhet under sin egen Unix-användare. Det är inte en kodande CLI i sig, så det finns inget för `omniroute run` att starta — `5dive` är en** endast konfigurera** mål.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Båda formerna skriver ett 5-dyk** auth-profil** , och varje `claude` plats som är bunden till den profilen pratar sedan med OmniRoute. Tre saker är specifika för detta mål:

- **Den körs på flottans värd, som root.** 5dives verb verkar på lokala systemd-enheter och en rotägd statlig dir; det finns inget fjärrläge. Receptet körs om genom `sudo` när det inte redan är root (`--no-sudo` stänger av det och skriver ut kommandot istället).
- **Slutpunkten måste vara `https://` om den inte är loopback.** Agentens API nyckel kör den URL på varje begäran, och 5dive vägrar en klartext off-box-slutpunkt. En privat LAN -adress är inget undantag.
- **Varje stols egen modellstift överträffar profilen.** Profilen bär `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, men ett säte som fortfarande är fäst vid ett lagermodell-id misslyckas sin första tur med _"Det är ett problem med den valda modellen"_. Passera `--agent <name>` (repeterbar) för att fästa sätena också; receptet skriver ut kommandot när du inte gör det.

API nyckeln lämnas till 5dive on** stdin** (`--api-key=-`), så det visas aldrig i `ps` utdata.

Pekar profilen mot en OmniRoute** kombo** snarare än en enda modell är det som får flottans leverantör failover: när den primära slutpunkten gick hårt ner i mitten av svängen inspelad på [#11578](https://github.com/cheaper-inference/OmniRoute/issues/11578), avslutade agenten sina återstående steg på reservsidan och kom aldrig upp till avbrottet.

---

## Basera URL konventioner (vilka verktyg vill ha `/v1`)

OmniRoute exponerar OpenAI ytan vid `/v1`, Anthropic -ytan vid roten och en naturlig Gemini -yta vid `/v1beta`. Varje integration kopplas till den form som verktyget förväntar sig (verifierad i kommandokällan):

| Integration                                                                | Basen URL skriven | `/v1`?                                           |
| -------------------------------------------------------------------------- | ----------------- | ------------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | rot               | Nej — Cline lägger till `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | rot               | Nej — Gåsen lägger till vägen                    |
| `setup-aider` (`OPENAI_API_BASE`)                                          | rot               | Nej — LiteLLM lägger till `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | med `/v1`         | Ja                                               |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | med `/v1`         | Ja                                               |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | rot               | Nej — Claude Koden lägger till `/v1/messages`    |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | med `/v1`         | Ja                                               |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | med `/v1`         | Ja                                               |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | rot               | Nej – SDK lägger till `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` i auth-profilen)                       | rot               | Nej — Claude Koden lägger till `/v1/messages`    |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | med `/v1`         | Ja — WhyCodes inlägg `/chat/completions`         |

---

## Behåll inbyggda beroenden vid uppdatering: `--include=optional`

När du uppdaterar med `omniroute update` (efter bekräftelse eller med `--apply`)
kör OmniRoute installationen med `--include=optional` inbyggt:

```bash
npm install -g omniroute@latest --include=optional
```

Detta är **inte** en flagga som du skickar till `omniroute update` — den tillämpas alltid av
uppdateringsprogrammet. Det garanterar att `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM-stacken) finns kvar efter uppdateringen även om din npm-konfiguration
har `omit=optional` inställt, vilket annars utan förvarning skulle ta bort den inbyggda SQLite-
drivrutinen och kopplingen till operativsystemets nyckelring. För att förhandsgranska det exakta kommandot utan att tillämpa det:

```bash
omniroute update --dry-run
# [TORRKÖRNING] Skulle köra: npm install -g omniroute@latest --include=optional
```

Andra flaggor för `omniroute update` (verifierade i källkoden): `--check` (avsluta med 1 om
versionen är inaktuell), `--apply` (installera utan att fråga), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI via `omniroute run gemini`

Kontraktet har verifierats mot `@google/gemini-cli` 0.50.0: CLI:n respekterar
`GOOGLE_GEMINI_BASE_URL` och skickar `POST /v1beta/models/<model>:generateContent`
(och `:streamGenerateContent?alt=sse`) till den — exakt OmniRoutes inbyggda
Gemini-gränssnitt (`/v1beta`). `omniroute run gemini` konfigurerar detta automatiskt:

- `GOOGLE_GEMINI_BASE_URL` → den aktiva OmniRoute-bas-URL:en (rot, inget `/v1`);
- `GEMINI_API_KEY` → den fastställda OmniRoute-autentiseringsuppgiften (alternativ/miljö/kontext);
- en **tillfällig isolerad `GEMINI_CLI_HOME`** vars `.gemini/settings.json`
  väljer autentisering med `gemini-api-key`, så att en lagrad Google OAuth-session (Code Assist)
  aldrig åsidosätter den OmniRoute-styrda starten — tas bort efter avslut;
- **miljöhygien**: den underordnade processens miljö rensas från `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` och `GOOGLE_GENAI_USE_GCA` (som annars skulle styra om
  autentiseringen till Vertex/Code Assist), och `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  ställs in som en extra säkerhetsåtgärd — de andra `run`-målen får samma
  behandling för sina egna motstridiga variabler;
- injicering av `--model <id>` från `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Geminis skydd för betrodda arbetsytor gäller fortfarande i huvudlöst läge — skicka
`--skip-trust` (eller markera katalogen som betrodd interaktivt) själv; startprogrammet
kringgår det avsiktligt inte. Detta startprogram skiljer sig från **ACP-
registreringen** (`src/lib/acp/registry.ts`, `gemini --acp`), som fortfarande är
agentprotokollsintegrationen för `/dashboard/acp-agents`.

---

## Verklig smoke-testsvit (valfri)

Deterministiska regressionstester av startplanen körs i CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). För att validera de VERKLIGA binärfilerna mot en VERKLIG
OmniRoute-server finns en valfri testsvit i
`tests/integration/upstream-cli-smoke.int.test.ts`. Den körs aldrig automatiskt
(varje deltest hoppas över om inte `RUN_CLI_SMOKE=1`), skickar autentiseringsuppgiften via miljövariabelns
NAMN (aldrig via värdet), maskerar nyckelliknande strängar i all loggad utdata, hoppar över
mål vars binärfil inte är installerad och klassificerar fel som
autentisering/uppströms/konfiguration i stället för ett enkelt booleskt värde:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Valfritt: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` begränsar testsviten;
`OMNIROUTE_SMOKE_TIMEOUT_MS` åsidosätter tidsgränsen på 120 s per mål.

---

## Se även

- [Konfiguration av Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — den mer djupgående guiden till Claude Code
- [Konfiguration av Codex CLI](./CODEX-CLI-CONFIGURATION.md) — den inledande grundkonfigurationen av `[model_providers.omniroute]`
- [Fjärrläge](./REMOTE-MODE.md) — kontexter, åtkomsttoken med begränsad omfattning och styrning av en fjärrserver
- [Referens för CLI-verktyg](../reference/CLI-TOOLS.md) — den fullständiga katalogen över verktyg som stöds samt dashboardsidor
- [Installationsguide](./SETUP_GUIDE.md) — installationsmetoder och introduktion vid första körningen
