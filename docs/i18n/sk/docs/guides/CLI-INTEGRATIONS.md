# CLI Integrations (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

Pre zdieľaný spustiteľný manifest, obmedzené podradené prostredia a trvalé nastavenie Gemini si pozrite [zmluvy o spustení CLI](./CLI-LAUNCH-CONTRACTS.md).

OmniRoute dodáva rodinu príkazov `setup-*`, ktoré konfigurujú kódovanie CLI (Codex, Claude Code, OpenCode, Cline, ...) na použitie OmniRoute ako jeho backend – takže nástroj hovorí s** jeden** koncový bod a OmniRoute smerujú k správnemu poskytovateľovi s automatickým vrátením. Každý príkaz číta** naživo** katalóg modelov zo spusteného OmniRoute (lokálneho alebo vzdialeného) a zapíše vlastný konfiguračný súbor nástroja** tvoj** stroj. Na kľúč API odkazuje premenná prostredia všade tam, kde to nástroj podporuje. Príkazy, ktoré pretrvávajú v súbore miestneho prostredia nástroja, sú uvedené nižšie.

Existuje aj generický spúšťač – `omniroute run <target>` – ktorý vytvorí `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` alebo `whycodes` s vloženým správnym env, bez toho, aby písal akúkoľvek konfiguráciu. Ciele a ich aliasy pochádzajú z kanonického manifestu `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`) a `omniroute completion` ponúka rovnaké cieľové slová odvodené z manifestu. Staršie spúšťače jednotlivých nástrojov – `omniroute launch` (Claude Code) a `omniroute launch-codex` (Codex) – zostávajú dostupné.

Registrácia poskytovateľa je dostupná v rovnakom kontexte local/remote. Nasledujúce príkazy API-first uchovávajú overenie správy oddelené od poverení poskytovateľa a nikdy nevytlačia poverenie v štruktúrovanom výstupe:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Pre skripty uprednostňujte `--credential-stdin` alebo `--credential-env`; `--credential` sa uchováva na kontrolované miestne použitie. `providers remove` vyžaduje `--yes` na neinteraktívnom termináli a všetkých päť príkazov rešpektuje aktívny kontext alebo globálne možnosti `--base-url`/`--api-key`.

Selektor poskytovateľa odmieta nejednoznačné predpony ID, názvy alebo názvy poskytovateľov; použite úplné pripojenie ID keď sa zhoduje niekoľko pripojení. Príkazy na vytvorenie a úpravu načítajú späť uložené pripojenie a odstránením sa overí, že už nie je čitateľné. Import preskočí existujúci pár provider/name. Importované položky nemôžu prepísať koncový bod správy, kontext alebo poverenia správy dodané do CLI.

Jednorazové, ručne písané základné nastavenie dvoch najbohatších integrácií nájdete v hĺbkových ponoroch pre jednotlivé nástroje:

- [Konfigurácia kódu Claude](./CLAUDE-CODE-CONFIGURATION.md)
- [konfigurácia Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Vzdialený režim](./REMOTE-MODE.md) — ovládajte vzdialený OmniRoute (VPS / Tailnet) zo svojho notebooku
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — rozšírenie OmniCopilot ; môže tiež spustiť tieto príkazy `setup-*` z editora

---

## Majstrovský stôl

Každý príkaz ctí** aktívny kontext** (nastavte pomocou `omniroute connect`, pozrite si [Remote Mode](./REMOTE-MODE.md) ) alebo explicitné príznaky `--remote <url> --api-key <key>`. "Lokálne verzus vzdialené" nižšie znamená: bez príznakov sa zameriava na `http://localhost:20128`; so `--remote` (alebo aktívnym vzdialeným kontextom) získa katalóg z tohto servera a lokálne zapíše konfiguráciu.

| Príkaz                     | Nástroj                          | Čo píše                                                                                                                                                         | Kľúčové príznaky                                                                                                                           | Miestne vs vzdialené |
| -------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                 | `~/.codex/<name>.config.toml` — jeden profil na kompatibilný textový model (`codex --profile <name>`)                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Obaja                |
| `omniroute setup-claude`   | Claude kód                       | `~/.claude/profiles/<name>/settings.json` — jeden profil na zodpovedajúci model (`CLAUDE_CONFIG_DIR`)                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Obaja                |
| `omniroute setup-opencode` | OpenCode (kompatibilné s openai) | `~/.config/opencode/opencode.json` — poskytovateľ `omniroute` s každým katalógovým modelom (`opencode -m omniroute/<model>`)                                    | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Obaja                |
| `omniroute setup-cline`    | Cline                            | `~/.cline/data/{globalState,secrets}.json` (režim CLI ) + vytlačí nastavenia rozšírenia kódu VS                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Obaja                |
| `omniroute setup-kilo`     | Kilový kód                       | `~/.local/share/kilo/auth.json` (CLI) + zlúči `kilocode.*` do VS Kód `settings.json` ak je prítomný                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Obaja                |
| `omniroute setup-continue` | Pokračovať / `cn` CLI            | `~/.continue/config.yaml` — modely `provider: openai`, kľúč cez `${{ secrets.OMNIROUTE_API_KEY }}`                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Obaja                |
| `omniroute setup-cursor`   | Cursor                           | Nič – vytlačí kroky v aplikácii (konfigurácia Cursor je nepriehľadná SQLite)                                                                                    | `--remote` `--api-key` `--only` `--port`                                                                                                   | Obaja                |
| `omniroute setup-roo`      | Roo Code                         | `~/.omniroute/roo-settings.json` (import doc) + nastavuje `roo-cline.autoImportSettingsPath`, ak existuje VS kód `settings.json`                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Obaja                |
| `omniroute setup-crush`    | Rozdrviť                         | `~/.config/crush/crush.json` — poskytovateľ `openai-compat`, kľúč cez `$OMNIROUTE_API_KEY`                                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Obaja                |
| `omniroute setup-zed`      | Zed                              | `~/.config/zed/settings.json` — poskytovateľ `openai_compatible.omniroute` (modely s 25 nástrojmi ≤ ), kľúč cez `$OMNIROUTE_API_KEY`                            | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | Obaja                |
| `omniroute setup-goose`    | hus                              | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + vytlačí env recept                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Obaja                |
| `omniroute setup-aider`    | Aider                            | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + vytlačí env recept                                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Obaja                |
| `omniroute setup-qwen`     | Qwen kód                         | `~/.qwen/settings.json` — V4 `modelProviders.openai` pole + `OMNIROUTE_API_KEY` v `~/.qwen/.env`                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Obaja                |
| `omniroute setup-5dive`    | 5 ponorov (agentská flotila)     | Nič pod `$HOME` — píše 5dive** autorizačný profil** (`/var/lib/5dive/auth-profiles/<name>/`) cez `5dive agent auth set`; root-only, beží na hostiteľovi flotily | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Obaja                |
| `omniroute setup-whycodes` | WhyCodes                         | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); cesta je `$WHYCODES_HOME/config.toml` alebo `~/.whycodes/config.toml`                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Obaja                |
| `omniroute run <target>`   | Spustenie runtime (všeobecné)    | Nič — spawn `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` so správnym env a args; Qwen a Gemini používajú dočasný izolovaný domov      | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Obaja                |
| `omniroute launch`         | Claude kód                       | Nič – vytvorí sa `claude` s injekciou `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                               | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Obaja                |
| `omniroute launch-codex`   | OpenAI Codex CLI                 | Nič – vytvorí `codex` s poskytovateľom `omniroute` vloženým cez príznaky `-c`                                                                                   | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Obaja                |

Poznámky k príznakom (overené v zdroji príkazov):

- `--remote <url>` — získa katalóg zo vzdialeného OmniRoute (prepíše `--port` a aktívny kontext). `--api-key <key>` dodáva poverenia pre tento server (predvolené je var `OMNIROUTE_API_KEY` env alebo token aktívneho kontextu).
- `--only <patterns>` — podreťazce oddelené čiarkou; ponechajte iba model IDs ktorý sa zhoduje (napr. `--only glm,kimi`). Dostupné na `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed`.
- `--dry-run` — vytlačte presne to, čo by bolo napísané bez toho, aby ste sa dotkli súborového systému. Dostupné pri každom príkaze `setup-*`** okrem** `setup-cursor` (ktorý nikdy nezapisuje súbor).
- `--model <id>` — vyžadované (alebo vybrané interaktívne) pre nástroje, ktoré nemajú automatické zisťovanie modelu: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive, WhyCodes. Tieto nástroje tiež akceptujú `--yes` pre neinteraktívne behy (ktoré potom vyžadujú `--model`). `setup-opencode` trvá `--model` na nastavenie predvoleného modelu najvyššej úrovne.
- `--model <id>` na `omniroute run` sa riadi zapojením manifestu podľa cieľa (`bin/cli/cli-manifest.mjs`):** pomocníka** prijíma `--model openai/<id>` a** opencode** `--model omniroute/<id>` (predpona sa pridá len vtedy, keď ju id ešte nenesie);** qwen** a** Blíženci** prijať id doslovne;** claude** dostane to cez `ANTHROPIC_MODEL`,** hus** cez `GOOSE_MODEL`,** prečo kódy** cez `-P omniroute -m <id>` a** kódexu** cez `-c model_providers.omniroute.*` args.**Qwen je jediný cieľ spustenia, ktorý si vyžaduje `--model`** — `omniroute run qwen` bez neho ukončí `2` s explicitnou chybou.
- `--port <port>` — lokálny port OmniRoute (predvolený `20128`, ignorovaný, keď je nastavené `--remote` ). Prítomný na všetkých `setup-*` a oboch spúšťačoch.
- `omniroute run` výstupné kódy: vlastný výstupný kód podriadeného CLI sa šíri doslovne; `2` = neplatné argumenty (nepodporovaný cieľ, chýbajúce povinné `--model`, ochrana kontajnera); `127` = cieľový binárny súbor nie je v `PATH`; `130`/`143`/`129`, keď je spustenie ukončené príkazom `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = zlyhanie spustenia iného runtime.
- Dva spúšťače (`launch`, `launch-codex`) akceptujú `--profile <name>` na výber profilu napísaného `setup-claude` / `setup-codex` plus argy pass through pre základnú binárnu `claude` / `codex`.

Interaktívny výber zdieľajú aj recepty nastavenia:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` v súčasnosti deleguje na testované recepty pre `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` a `5dive`. Položky katalógu iba IDE, MITM a iba sprievodca zostávajú explicitnými tokmi `setup-*`/manual a nie sú prezentované ako spúšťateľné ciele.

> `setup-opencode` je** ľahký kompatibilný s openai** integrácia OpenCode. K dispozícii je tiež bohatšia integrácia doplnkov — `omniroute setup opencode` — ktorá inštaluje `@omniroute/opencode-plugin`. Sú to rôzne príkazy; tabuľky vyššie dokumenty `setup-opencode`.
>
> Doplnok sa dodáva v dvoch balíkoch, jeden na OpenCode major, pretože dva zavádzače očakávajú rôzne vstupné body: `@omniroute/opencode-plugin` pre OpenCode v1 a `@omniroute/opencode-plugin-v2` pre OpenCode v2. Balík v2 je nový (`0.1.0`) a riadi sa hostiteľskou zmluvou, ktorá sa stále pohybuje, takže do konceptu katalógu načítava semená tvaru OpenCode namiesto toho, aby nejaký preberal. Nainštalujte ho pridaním položky `plugins` do `opencode.json`; `omniroute setup opencode` stále nainštaluje balík v1. Možnosti a poradie vyhľadania poverení sú v balíku README.

---

## Lokálne použitie

Keď OmniRoute beží na `localhost:20128`, stačí spustiť príkaz na nastavenie vášho
nástroja. Katalóg sa načíta z lokálneho servera.

```bash
# Codex: zapíše profil pre každý zodpovedajúci model do ~/.codex/
omniroute setup-codex
codex --profile glm52            # použije vygenerovaný profil

# Claude Code: zapíše profily pre jednotlivé modely a potom jeden spustí
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: zapíše poskytovateľa kompatibilného s OpenAI so všetkými modelmi z katalógu
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # odkazuje sa naň cez {env:OMNIROUTE_API_KEY}, nikdy nie je uložený na disku
opencode -m omniroute/glm/glm-5.2 "..."

# Nástroje bez automatického zisťovania vyžadujú explicitný model:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Náhľad bez zapisovania čohokoľvek:
omniroute setup-continue --dry-run
```

Spustenie bez zapísania akejkoľvek konfigurácie (iba vloženie premenných prostredia):

```bash
omniroute launch                 # Claude Code → lokálny OmniRoute
omniroute launch-codex           # Codex CLI → lokálny OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Explicitná cesta k príkazu: všetko za -- sa odovzdá bez zmeny
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Vzdialené použitie

Nasmerujte ľubovoľný nastavovací príkaz na vzdialený OmniRoute pomocou `--remote` + `--api-key`.
Katalóg sa načíta zo vzdialeného servera a konfigurácia sa zapíše na vašom lokálnom počítači.

```bash
# OpenCode so vzdialeným VPS, ponechá iba modely glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # najskôr exportujte OMNIROUTE_API_KEY

# Profily Codex zo vzdialeného katalógu
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Spustenie CLI priamo voči vzdialenému serveru
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Namiesto opakovaného zadávania `--remote`/`--api-key` sa raz prihláste a nechajte
**aktívny kontext**, aby ich poskytoval automaticky:

```bash
omniroute connect 192.168.0.15        # vytvorí token s obmedzeným rozsahom a uloží kontext
omniroute setup-codex                 # ← teraz používa vzdialený katalóg
omniroute setup-opencode              # ← rovnako
omniroute launch                      # ← Claude Code voči vzdialenému serveru
```

Informácie o kontextoch, rozsahoch a správe tokenov nájdete v časti [Vzdialený režim](./REMOTE-MODE.md).

---

## Flotily agentov 5dive

[5dive](https://5dive.ai) prevádzkuje flotilu dlhodobo bežiacich programovacích agentov, pričom každý z nich je
jednotkou systemd pod vlastným používateľom systému Unix. Sám osebe nie je programovacím CLI, takže
`omniroute run` nemá čo spustiť — `5dive` je cieľ **iba na konfiguráciu**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Obe formy zapíšu jeden **autorizačný profil** 5dive a každé pracovné miesto `claude` naviazané na tento
profil potom komunikuje s OmniRoute. Pre tento cieľ sú špecifické tri veci:

- **Spúšťa sa na hostiteľovi flotily ako root.** Príkazy 5dive pracujú s lokálnymi jednotkami systemd
  a stavovým adresárom vlastneným používateľom root; vzdialený režim nie je k dispozícii. Recept sa opätovne spustí cez
  `sudo`, ak už nebeží ako root (`--no-sudo` to vypne a namiesto toho vypíše
  príkaz).
- **Koncový bod musí používať `https://`, pokiaľ nejde o loopback.** API kľúč agenta
  sa cez túto URL prenáša pri každej požiadavke a 5dive odmieta nešifrovaný koncový bod mimo hostiteľa.
  Súkromná adresa LAN nie je výnimkou.
- **Vlastné pripnutie modelu každého pracovného miesta má prednosť pred profilom.** Profil obsahuje
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, ale pracovné miesto, ktoré je stále pripnuté k štandardnému
  identifikátoru modelu, zlyhá pri prvej interakcii s hlásením _"There's an issue with the selected model"_.
  Zadajte `--agent <name>` (možno opakovať), aby ste pripli aj pracovné miesta; ak tak neurobíte, recept
  vypíše príslušný príkaz.

API kľúč sa odovzdáva nástroju 5dive cez **stdin** (`--api-key=-`), takže sa nikdy nezobrazí vo
výstupe `ps`.

Nasmerovanie profilu na **kombináciu** OmniRoute namiesto jedného modelu poskytne
flotile prepnutie pri zlyhaní poskytovateľa: keď primárny koncový bod počas interakcie úplne prestal fungovať
v behu zaznamenanom v
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), agent dokončil
zostávajúce kroky cez záložný koncový bod bez toho, aby používateľovi oznámil výpadok.

---

## Základné konvencie URL (ktoré nástroje chcú `/v1`)

OmniRoute odhaľuje povrch OpenAI v `/v1`, povrch Anthropic v koreni a natívny povrch Gemini v `/v1beta`. Každá integrácia je prepojená s formulárom, ktorý nástroj očakáva (overené v zdroji príkazov):

| integrácia                                                                 | Základ URL napísaný | `/v1`?                                       |
| -------------------------------------------------------------------------- | ------------------- | -------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | koreň               | Nie — Cline pripája `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | koreň               | Nie – Hus pripojí cestu                      |
| `setup-aider` (`OPENAI_API_BASE`)                                          | koreň               | Nie — LiteLLM pripája `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | so `/v1`            | áno                                          |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | so `/v1`            | áno                                          |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | koreň               | Nie – kód Claude pripája `/v1/messages`      |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | so `/v1`            | áno                                          |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | so `/v1`            | áno                                          |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | koreň               | Nie – SDK pripája `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` v autorizačnom profile)                | koreň               | Nie – kód Claude pripája `/v1/messages`      |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | so `/v1`            | Áno – WhyCodes príspevky `/chat/completions` |

---

## Zachovanie natívnych závislostí pri aktualizácii: `--include=optional`

Keď vykonáte aktualizáciu pomocou `omniroute update` (po potvrdení alebo s `--apply`),
OmniRoute spustí inštaláciu so zabudovaným parametrom `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Toto **nie je** parameter, ktorý odovzdávate príkazu `omniroute update` — aktualizačný
nástroj ho použije vždy. Zaručuje, že `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, zásobník SLM LLMLingua) zostanú zachované aj po aktualizácii, a to aj vtedy,
keď je v konfigurácii npm nastavené `omit=optional`, čo by inak bez upozornenia odstránilo
natívny ovládač SQLite a prepojenie na úložisko kľúčov operačného systému. Ak chcete
zobraziť presný príkaz bez jeho vykonania:

```bash
omniroute update --dry-run
# [SKÚŠOBNÉ SPUSTENIE] Spustil by sa príkaz: npm install -g omniroute@latest --include=optional
```

Ďalšie parametre príkazu `omniroute update` (overené v zdrojovom kóde): `--check`
(ukončenie s kódom 1, ak je verzia zastaraná), `--apply` (inštalácia bez výzvy na
potvrdenie), `--changelog`, `--no-backup`, `--yes`.

---

## Google Gemini CLI prostredníctvom `omniroute run gemini`

Kontrakt bol overený voči `@google/gemini-cli` 0.50.0: CLI rešpektuje
`GOOGLE_GEMINI_BASE_URL` a odosiela požiadavky `POST /v1beta/models/<model>:generateContent`
(a `:streamGenerateContent?alt=sse`) na túto adresu — presne na natívne rozhranie
Gemini v OmniRoute (`/v1beta`). Príkaz `omniroute run gemini` to nakonfiguruje automaticky:

- `GOOGLE_GEMINI_BASE_URL` → aktívna základná URL OmniRoute (koreňová cesta, bez `/v1`);
- `GEMINI_API_KEY` → určené prihlasovacie údaje OmniRoute (voľba/prostredie/kontext);
- **dočasný izolovaný adresár `GEMINI_CLI_HOME`**, ktorého `.gemini/settings.json`
  vyberá autentifikáciu `gemini-api-key`, takže uložená relácia Google OAuth (Code Assist)
  nikdy neprepíše spustenie smerované na OmniRoute — po ukončení sa adresár odstráni;
- **hygiena prostredia**: z prostredia podradeného procesu sa odstránia
  `GOOGLE_API_KEY`, `GOOGLE_GENAI_USE_VERTEXAI` a `GOOGLE_GENAI_USE_GCA` (ktoré by
  presmerovali autentifikáciu na Vertex/Code Assist) a ako dodatočná poistka sa nastaví
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` — s ostatnými cieľmi príkazu `run` sa
  zaobchádza rovnako pri ich vlastných konfliktných premenných;
- vloženie `--model <id>` z `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Ochrana dôveryhodnosti pracovného priestoru v Gemini sa uplatňuje aj v bezobslužnom
režime — parameter `--skip-trust` musíte odovzdať sami (alebo interaktívne označiť
adresár ako dôveryhodný); spúšťací nástroj ju zámerne neobchádza. Tento spúšťací nástroj
sa líši od **registrácie ACP** (`src/lib/acp/registry.ts`, `gemini --acp`), ktorá zostáva
integráciou protokolu agentov pre `/dashboard/acp-agents`.

---

## Reálny smoke test (voliteľný)

Deterministické regresné testy plánu spúšťania sa vykonávajú v CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Na overenie SKUTOČNÝCH binárnych súborov voči SKUTOČNÉMU
serveru OmniRoute je k dispozícii voliteľný testovací nástroj v
`tests/integration/upstream-cli-smoke.int.test.ts`. Nikdy sa nespúšťa automaticky
(každý čiastkový test sa preskočí, pokiaľ nie je nastavené `RUN_CLI_SMOKE=1`), prihlasovací údaj odovzdáva pomocou
NÁZVU premennej prostredia (nikdy nie pomocou jej hodnoty), z každého zaznamenaného výstupu odstraňuje reťazce
vyzerajúce ako kľúče, preskakuje ciele, ktorých binárny súbor nie je nainštalovaný, a zlyhania klasifikuje ako
autentifikačné / upstream / konfiguračné namiesto jednoduchej booleovskej hodnoty:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Voliteľné: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` obmedzuje rozsah testu;
`OMNIROUTE_SMOKE_TIMEOUT_MS` mení 120-sekundový časový limit pre každý cieľ.

---

## Pozrite si tiež

- [Konfigurácia Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — podrobnejšia príručka ku Claude Code
- [Konfigurácia Codex CLI](./CODEX-CLI-CONFIGURATION.md) — jednorazové základné nastavenie `[model_providers.omniroute]`
- [Vzdialený režim](./REMOTE-MODE.md) — kontexty, prístupové tokeny s obmedzeným rozsahom a ovládanie vzdialeného servera
- [Referenčná príručka nástrojov CLI](../reference/CLI-TOOLS.md) — úplný katalóg podporovaných nástrojov a stránok ovládacieho panela
- [Sprievodca nastavením](./SETUP_GUIDE.md) — spôsoby inštalácie a úvodné nastavenie pri prvom spustení
