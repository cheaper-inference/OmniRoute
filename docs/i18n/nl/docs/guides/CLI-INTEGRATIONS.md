# CLI Integrations (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

Zie [CLI launch contracts](./CLI-LAUNCH-CONTRACTS.md) voor het gedeelde uitvoerbare manifest, de beperkte onderliggende omgevingen en de permanente Gemini installatie.

OmniRoute levert een familie van `setup-*` -opdrachten die een codering CLI configureren (Codex, Claude Code, OpenCode, Cline, ...) om OmniRoute als backend te gebruiken - zodat de tool praat met** een** endpoint- en OmniRoute -routes naar de juiste provider met automatische terugval. Elke opdracht leest de** live** modelcatalogus van een actieve OmniRoute (lokaal of extern) en schrijft het eigen configuratiebestand van de tool erop** jouw** machine. Er wordt naar de API sleutel verwezen door een omgevingsvariabele, waar de tool deze ook ondersteunt. Hieronder worden opdrachten vermeld die een tool-local omgevingsbestand behouden.

Er is ook een generieke launcher — `omniroute run <target>` — die `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` of `whycodes` voortbrengt met de juiste env geïnjecteerd, zonder enige configuratie te schrijven. Doelen en hun aliassen komen uit het canonieke manifest `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`), en `omniroute completion` biedt dezelfde van het manifest afgeleide doelwoorden. De oude per-tool-launchers — `omniroute launch` (Claude Code) en `omniroute launch-codex` (Codex) — blijven beschikbaar.

Onboarding van providers is beschikbaar vanuit dezelfde local/remote context. De onderstaande API-first-opdrachten houden de beheerauthenticatie gescheiden van de providerreferenties en drukken nooit een credential af in gestructureerde uitvoer:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Voor scripts geeft u de voorkeur aan `--credential-stdin` of `--credential-env`; `--credential` wordt bewaard voor gecontroleerd lokaal gebruik. `providers remove` vereist `--yes` op een niet-interactieve terminal, en alle vijf opdrachten respecteren de actieve context of de globale `--base-url`/`--api-key` -opties.

Providerselectors wijzen dubbelzinnige ID voorvoegsels, namen of providernamen af; gebruik een volledige verbinding ID wanneer meerdere verbindingen overeenkomen. Door opdrachten te maken en te bewerken wordt de opgeslagen verbinding teruggelezen, en door het verwijderen wordt geverifieerd dat deze niet langer leesbaar is. Bij een import wordt een bestaand provider/name paar overgeslagen. Geïmporteerde vermeldingen kunnen het beheereindpunt, de context of de beheerreferenties die aan de CLI zijn geleverd, niet overschrijven.

Voor de eenmalige, handgeschreven basisconfiguratie van de twee rijkste integraties, bekijk de deep dives per tool:

- [Claude -codeconfiguratie](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI -configuratie](./CODEX-CLI-CONFIGURATION.md)
- [Externe modus](./REMOTE-MODE.md) — bestuur een externe OmniRoute (VPS / Tailnet) vanaf uw laptop
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — de OmniCopilot -extensie; het kan deze `setup-*` opdrachten ook voor u uitvoeren vanuit de editor

---

## Hoofdtafel

Elke opdracht eert de** actieve context** (ingesteld met `omniroute connect`, zie [Remote Mode](./REMOTE-MODE.md) ) of expliciete `--remote <url> --api-key <key>` vlaggen. "Lokaal vs. op afstand" betekent hieronder: zonder vlaggen is het gericht op `http://localhost:20128`; met `--remote` (of een actieve externe context) haalt het de catalogus van die server op en schrijft de configuratie lokaal.

| Commando                   | Hulpmiddel                   | Wat het schrijft                                                                                                                                                                  | Sleutel vlaggen                                                                                                                            | Lokaal versus op afstand |
| -------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — één profiel per compatibel tekstmodel (`codex --profile <name>`)                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Beide                    |
| `omniroute setup-claude`   | Claude -code                 | `~/.claude/profiles/<name>/settings.json` — één profiel per gekoppeld model (`CLAUDE_CONFIG_DIR`)                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Beide                    |
| `omniroute setup-opencode` | OpenCode (openai-compatibel) | `~/.config/opencode/opencode.json` — `omniroute` provider bij elk catalogusmodel (`opencode -m omniroute/<model>`)                                                                | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Beide                    |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (CLI modus) + drukt VS -code-extensie-instellingen af                                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Beide                    |
| `omniroute setup-kilo`     | Kilo-code                    | `~/.local/share/kilo/auth.json` (CLI) + voegt `kilocode.*` samen met VS Code `settings.json` indien aanwezig                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Beide                    |
| `omniroute setup-continue` | Ga verder / `cn` CLI         | `~/.continue/config.yaml` — `provider: openai` modellen, sleutel via `${{ secrets.OMNIROUTE_API_KEY }}`                                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Beide                    |
| `omniroute setup-cursor`   | Cursor                       | Niets - drukt de in-app-stappen af (Cursor config is ondoorzichtig SQLite)                                                                                                        | `--remote` `--api-key` `--only` `--port`                                                                                                   | Beide                    |
| `omniroute setup-roo`      | Roo-code                     | `~/.omniroute/roo-settings.json` (importdocument) + stelt `roo-cline.autoImportSettingsPath` in als er een VS code `settings.json` bestaat                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Beide                    |
| `omniroute setup-crush`    | Verbrijzeling                | `~/.config/crush/crush.json` — `openai-compat` provider, sleutel via `$OMNIROUTE_API_KEY`                                                                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Beide                    |
| `omniroute setup-zed`      | Zed                          | `~/.config/zed/settings.json` — `openai_compatible.omniroute` provider (≤ 25 tool-compatibele modellen), sleutel via `$OMNIROUTE_API_KEY`                                         | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | Beide                    |
| `omniroute setup-goose`    | Gans                         | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + drukt env-recept af                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Beide                    |
| `omniroute setup-aider`    | Hulp                         | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + drukt env-recept af                                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Beide                    |
| `omniroute setup-qwen`     | Qwen -code                   | `~/.qwen/settings.json` — V4 `modelProviders.openai` array + `OMNIROUTE_API_KEY` in `~/.qwen/.env`                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Beide                    |
| `omniroute setup-5dive`    | 5dive (agentvloot)           | Niets onder `$HOME` – schrijft een 5-duik** auth profiel** (`/var/lib/5dive/auth-profiles/<name>/`) via `5dive agent auth set`; alleen root, draait op de vloothost               | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Beide                    |
| `omniroute setup-whycodes` | WhyCodes                     | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); pad is `$WHYCODES_HOME/config.toml` of `~/.whycodes/config.toml`                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Beide                    |
| `omniroute run <target>`   | Runtime-lancering (algemeen) | Niets — spawn `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` met de juiste env en args; Qwen en Gemini maken gebruik van een tijdelijk geïsoleerde woning | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Beide                    |
| `omniroute launch`         | Claude -code                 | Niets - spawnt `claude` met `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` geïnjecteerd                                                                                              | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Beide                    |
| `omniroute launch-codex`   | OpenAI Codex CLI             | Niets - spawnt `codex` met de `omniroute` provider geïnjecteerd via `-c` vlaggen                                                                                                  | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Beide                    |

Opmerkingen over vlaggen (geverifieerd in de opdrachtbron):

- `--remote <url>` — haal de catalogus op van een externe OmniRoute (overschrijft `--port` en de actieve context). `--api-key <key>` levert de referentie voor die server (standaard is de `OMNIROUTE_API_KEY` env var, of het token van de actieve context).
- `--only <patterns>` — door komma's gescheiden subtekenreeksen; bewaar alleen het model IDs dat overeenkomt (bijvoorbeeld `--only glm,kimi`). Beschikbaar op `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed`.
- `--dry-run` — druk precies af wat er zou worden geschreven zonder het bestandssysteem aan te raken. Beschikbaar op elke `setup-*` opdracht** behalve** `setup-cursor` (die nooit een bestand schrijft).
- `--model <id>` — vereist (of interactief gekozen) voor de tools die geen automatische detectie van modellen hebben: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive, WhyCodes. Deze tools accepteren ook `--yes` voor niet-interactieve uitvoeringen (waarvoor dan `--model` vereist is). `setup-opencode` heeft `--model` nodig om het standaardmodel op het hoogste niveau in te stellen.
- `--model <id>` op `omniroute run` volgt de per-doel bedrading van het manifest (`bin/cli/cli-manifest.mjs`):** hulp** ontvangt `--model openai/<id>` en** opencode** `--model omniroute/<id>` (het voorvoegsel wordt alleen toegevoegd als de id dit nog niet bevat);** qwen** En** tweeling** ontvang de id woordelijk;** claude** krijgt het via `ANTHROPIC_MODEL`,** gans** via `GOOSE_MODEL`,** waaromcodes** via `-P omniroute -m <id>`, en** codex** via `-c model_providers.omniroute.*` args.**Qwen is het enige hardloopdoel dat `--model` vereist** — `omniroute run qwen` zonder dat `2` wordt afgesloten met een expliciete fout.
- `--port <port>` — lokale OmniRoute poort (standaard `20128`, genegeerd wanneer `--remote` is ingesteld). Aanwezig op alle `setup-*` en beide draagraketten.
- `omniroute run` exitcodes: de eigen exitcode van het kind CLI wordt woordelijk doorgegeven; `2` = ongeldige argumenten (niet-ondersteund doel, ontbrekende vereiste `--model`, containerwacht); `127` = het binaire doelbestand bevindt zich niet in `PATH`; `130`/`143`/`129` wanneer de lancering wordt beëindigd door `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = andere runtime-startfout.
- De twee draagraketten (`launch`, `launch-codex`) accepteren `--profile <name>` om een profiel te selecteren dat is geschreven door `setup-claude` / `setup-codex`, plus pass-through args voor het onderliggende `claude` / `codex` binaire bestand.

De interactieve kiezer wordt ook gedeeld door de installatierecepten:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` delegeert momenteel de geteste recepten voor `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` en `5dive`. IDE-only, MITM en guide-only catalogusitems blijven expliciete `setup-*`/manual-stromen en worden niet gepresenteerd als startbare doelen.

> `setup-opencode` is de** lichtgewicht openai-compatibel** OpenCode integratie. Er is ook een rijkere plug-in-integratie – `omniroute setup opencode` – die `@omniroute/opencode-plugin` installeert. Het zijn verschillende commando's; de tabel hierboven documenten `setup-opencode`.
>
> De plug-in wordt geleverd in twee pakketten, één per OpenCode major, omdat de twee laders verschillende toegangspunten verwachten: `@omniroute/opencode-plugin` voor OpenCode v1 en `@omniroute/opencode-plugin-v2` voor OpenCode v2. Het v2-pakket is nieuw (`0.1.0`) en volgt een hostcontract dat nog steeds in beweging is, dus het leest de vorm OpenCode seeds in het catalogusontwerp in plaats van er een aan te nemen. Installeer het door een `plugins` item toe te voegen aan `opencode.json`; `omniroute setup opencode` installeert nog steeds het v1-pakket. Opties en de opzoekvolgorde van de referenties bevinden zich in het pakket README.

---

## Lokaal gebruik

Als OmniRoute op `localhost:20128` draait, voer je gewoon de installatieopdracht voor je
tool uit. De catalogus wordt opgehaald van de lokale server.

```bash
# Codex: schrijf voor elk overeenkomend model een profiel naar ~/.codex/
omniroute setup-codex
codex --profile glm52            # gebruik een gegenereerd profiel

# Claude Code: schrijf profielen per model en start er vervolgens één
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: schrijf de OpenAI-compatibele provider met alle modellen uit de catalogus
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # benaderd via {env:OMNIROUTE_API_KEY}, nooit op schijf
opencode -m omniroute/glm/glm-5.2 "..."

# Tools zonder automatische detectie vereisen een expliciet model:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Voorbeeld bekijken zonder iets te schrijven:
omniroute setup-continue --dry-run
```

Start zonder configuratie te schrijven (alleen injectie via omgevingsvariabelen):

```bash
omniroute launch                 # Claude Code → lokale OmniRoute
omniroute launch-codex           # Codex CLI → lokale OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Expliciet opdrachtpad: geef alles na -- ongewijzigd door
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Gebruik op afstand

Richt een installatieopdracht op een externe OmniRoute met `--remote` + `--api-key`. De
catalogus wordt opgehaald van de externe server; de configuratie wordt op je lokale machine geschreven.

```bash
# OpenCode met een externe VPS; behoud alleen glm/kimi-modellen
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # exporteer eerst OMNIROUTE_API_KEY

# Codex-profielen uit een externe catalogus
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Start een CLI rechtstreeks tegen de externe server
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

In plaats van telkens `--remote`/`--api-key` mee te geven, meld je je één keer aan en laat je de
**actieve context** deze automatisch leveren:

```bash
omniroute connect 192.168.0.15        # maakt een token met beperkt bereik aan en slaat de context op
omniroute setup-codex                 # ← gebruikt nu de externe catalogus
omniroute setup-opencode              # ← hetzelfde
omniroute launch                      # ← Claude Code tegen de externe server
```

Zie [Externe modus](./REMOTE-MODE.md) voor contexten, bereiken en tokenbeheer.

---

## 5dive-agentvloten

[5dive](https://5dive.ai) beheert een vloot van langlopende programmeeragents, elk als een
systemd-unit onder een eigen Unix-gebruiker. Het is zelf geen programmeer-CLI, dus er is
niets dat `omniroute run` kan starten — `5dive` is een doel **uitsluitend voor configuratie**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Beide vormen schrijven één 5dive-**authenticatieprofiel**, waarna elke `claude`-seat die aan dat
profiel is gekoppeld met OmniRoute communiceert. Drie zaken zijn specifiek voor dit doel:

- **Het draait op de vloothost, als root.** De opdrachten van 5dive werken op lokale systemd-units
  en een statusmap die eigendom is van root; er is geen externe modus. Het recept start zichzelf opnieuw via
  `sudo` wanneer het nog niet als root draait (`--no-sudo` schakelt dat uit en toont in plaats daarvan de
  opdracht).
- **Het eindpunt moet `https://` gebruiken, tenzij het loopback is.** De API-sleutel van de agent
  wordt bij elk verzoek via die URL verzonden en 5dive weigert een onbeveiligd eindpunt buiten de host.
  Een privé-LAN-adres vormt hierop geen uitzondering.
- **De eigen modelvastlegging van elke seat heeft voorrang op het profiel.** Het profiel bevat
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, maar een seat die nog aan een standaard
  model-id is vastgelegd, faalt bij de eerste beurt met _"There's an issue with the selected model"_.
  Geef `--agent <name>` door (herhaalbaar) om ook de seats vast te leggen; het recept toont de
  opdracht wanneer je dit niet doet.

De API-sleutel wordt via **stdin** aan 5dive doorgegeven (`--api-key=-`), zodat deze nooit in
de uitvoer van `ps` verschijnt.

Door het profiel naar een OmniRoute-**combo** te laten verwijzen in plaats van naar één model,
krijgt de providervloot failover: toen het primaire eindpunt halverwege een beurt volledig uitviel
tijdens de uitvoering die is vastgelegd in
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), voltooide de agent
de resterende stappen via de fallback zonder de storing ooit zichtbaar te maken.

---

## Basis URL conventies (welke tools willen `/v1`)

OmniRoute stelt het OpenAI oppervlak bloot aan `/v1`, het Anthropic -oppervlak aan de root en een eigen Gemini oppervlak aan `/v1beta`. Elke integratie is aangesloten op de vorm die de tool verwacht (geverifieerd in de opdrachtbron):

| Integratie                                                                 | Basis URL geschreven | `/v1`?                                     |
| -------------------------------------------------------------------------- | -------------------- | ------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | wortel               | Nee – Cline voegt `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | wortel               | Nee – Gans voegt het pad toe               |
| `setup-aider` (`OPENAI_API_BASE`)                                          | wortel               | Nee – LiteLLM voegt `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | met `/v1`            | Ja                                         |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | met `/v1`            | Ja                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | wortel               | Nee — Claude Code voegt `/v1/messages` toe |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | met `/v1`            | Ja                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | met `/v1`            | Ja                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | wortel               | Nee – de SDK voegt `/v1beta/models/…`      |
| `setup-5dive` (`ANTHROPIC_BASE_URL` in het auth-profiel)                   | wortel               | Nee — Claude Code voegt `/v1/messages` toe |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | met `/v1`            | Ja – WhyCodes plaatst `/chat/completions`  |

---

## Native afhankelijkheden behouden bij updates: `--include=optional`

Wanneer u bijwerkt met `omniroute update` (na bevestiging of met `--apply`),
voert OmniRoute de installatie standaard uit met `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Dit is **geen** vlag die u aan `omniroute update` doorgeeft — deze wordt altijd door het
updateprogramma toegepast. Dit garandeert dat de `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, de LLMLingua SLM-stack) de update overleven, zelfs als in uw npm-configuratie
`omit=optional` is ingesteld. Anders zouden het native SQLite-stuurprogramma en de
OS-sleutelringkoppeling ongemerkt worden verwijderd. Gebruik het volgende om een voorbeeld van
de exacte opdracht te bekijken zonder deze uit te voeren:

```bash
omniroute update --dry-run
# [PROEFBETREKKING] Zou uitvoeren: npm install -g omniroute@latest --include=optional
```

Andere vlaggen voor `omniroute update` (geverifieerd in de broncode): `--check` (afsluitcode 1 als
de versie verouderd is), `--apply` (installeren zonder om bevestiging te vragen), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI via `omniroute run gemini`

Contract geverifieerd aan de hand van `@google/gemini-cli` 0.50.0: de CLI respecteert
`GOOGLE_GEMINI_BASE_URL` en verstuurt `POST /v1beta/models/<model>:generateContent`
(en `:streamGenerateContent?alt=sse`) ernaartoe — exact de native Gemini-interface
van OmniRoute (`/v1beta`). `omniroute run gemini` configureert dit automatisch:

- `GOOGLE_GEMINI_BASE_URL` → de actieve OmniRoute-basis-URL (hoofdpad, zonder `/v1`);
- `GEMINI_API_KEY` → de opgeloste OmniRoute-referentie (optie/omgeving/context);
- een **tijdelijke, geïsoleerde `GEMINI_CLI_HOME`** waarvan `.gemini/settings.json`
  `gemini-api-key`-authenticatie selecteert, zodat een opgeslagen Google OAuth-sessie (Code Assist)
  de op OmniRoute gerichte start nooit overschrijft — verwijderd na afsluiten;
- **omgevingshygiëne**: `GOOGLE_API_KEY`, `GOOGLE_GENAI_USE_VERTEXAI` en
  `GOOGLE_GENAI_USE_GCA` worden uit de onderliggende omgeving verwijderd (omdat deze de
  authenticatie zouden omleiden naar Vertex/Code Assist), en
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` wordt ingesteld als extra voorzorgsmaatregel —
  de andere `run`-doelen krijgen dezelfde behandeling voor hun eigen conflicterende variabelen;
- injectie van `--model <id>` vanuit `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

De controle voor werkruimtevertrouwen van Gemini blijft ook in headless-modus van toepassing — geef zelf
`--skip-trust` door (of vertrouw de map interactief); het startprogramma omzeilt deze controle
bewust niet. Dit startprogramma staat los van de **ACP-registratie**
(`src/lib/acp/registry.ts`, `gemini --acp`), die de
agentprotocolintegratie voor `/dashboard/acp-agents` blijft.

---

## Echte smoke-sweep (opt-in)

Deterministische regressietests voor het opstartplan worden uitgevoerd in CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Om de ECHTE binaire bestanden te valideren tegen een ECHTE
OmniRoute-server, is er een opt-in testharnas beschikbaar op
`tests/integration/upstream-cli-smoke.int.test.ts`. Dit wordt nooit automatisch uitgevoerd
(elke subtest wordt overgeslagen tenzij `RUN_CLI_SMOKE=1`), geeft de referentie via de NAAM van een
omgevingsvariabele door (nooit via de waarde), redigeert sleutelachtige tekenreeksen uit alle
vastgelegde uitvoer, slaat doelen over waarvan het binaire bestand niet is geïnstalleerd en classificeert
fouten als auth / upstream / config in plaats van als een kale booleaanse waarde:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Optioneel: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` beperkt de sweep;
`OMNIROUTE_SMOKE_TIMEOUT_MS` overschrijft de time-out van 120 seconden per doel.

---

## Zie ook

- [Claude Code-configuratie](./CLAUDE-CODE-CONFIGURATION.md) — de uitgebreidere handleiding voor Claude Code
- [Codex CLI-configuratie](./CODEX-CLI-CONFIGURATION.md) — de eenmalige basisconfiguratie voor `[model_providers.omniroute]`
- [Externe modus](./REMOTE-MODE.md) — contexten, toegangstokens met een beperkt bereik en het aansturen van een externe server
- [CLI Tools-referentie](../reference/CLI-TOOLS.md) — de volledige catalogus van ondersteunde tools en dashboardpagina's
- [Installatiehandleiding](./SETUP_GUIDE.md) — installatiemethoden en onboarding bij de eerste uitvoering
