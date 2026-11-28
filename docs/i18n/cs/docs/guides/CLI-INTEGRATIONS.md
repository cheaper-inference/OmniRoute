# CLI Integrations (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

Informace o sdíleném spustitelném manifestu, omezených podřízených prostředích a trvalém nastavení Gemini naleznete v tématu [spouštěcí smlouvy CLI](./CLI-LAUNCH-CONTRACTS.md).

OmniRoute dodává rodinu příkazů `setup-*`, které konfigurují kódování CLI (Codex, Claude Code, OpenCode, Cline, …) pro použití OmniRoute jako svého backendu — takže nástroj komunikuje s** jeden** směruje koncový bod a OmniRoute ke správnému poskytovateli s automatickým návratem. Příkazy nastavení používají váš aktivní místní nebo vzdálený kontext OmniRoute a nakonfigurují nástroj** vaše** stroj. Recepty založené na katalogu načítají modely ze serveru; receptury pro jeden model přijímají `--model` nebo vyžadují model ID. Na klíč API odkazuje proměnná prostředí všude tam, kde to nástroj podporuje. Příkazy, které přetrvávají v souboru místního prostředí nástroje, jsou uvedeny níže.

Katalog a automatizační příkazy pokrývají různé sady nástrojů:

| Povrch                         | Počítat | Co to znamená                                                               |
| ------------------------------ | ------- | --------------------------------------------------------------------------- |
| Katalog nářadí                 | 39      | Dokumentované kódovací nástroje a agenti, včetně manuálních a IDE integrací |
| `omniroute run <target>`       | 8       | Spusťte adaptéry, které poskytují cílový koncový bod, pověření a model      |
| `omniroute configure <target>` | 12      | Interaktivní konfigurační receptury podporované příkazy `setup-*`           |
| příkazy `setup-*`              | 16      | Registrované příkazy nastavení, včetně nastavení editoru guided/manual      |

Počty odrážejí [manifest nástroje](../../config/cli-tools-manifest.json) a [registr příkazů](../../bin/cli/commands/registry.mjs) 2026-11-17. Položka katalogu neznamená spouštěcí adaptér. Úplný inventář naleznete [v katalogu nástrojů CLI](../reference/CLI-TOOLS.md).

Existuje také generický spouštěč — `omniroute run <target>` —, který vytváří `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` nebo `whycodes` s vloženým správným env, aniž by musel psát jakoukoli konfiguraci. Cíle a jejich aliasy pocházejí z kanonického manifestu `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`) a `omniroute completion` nabízí stejná cílová slova odvozená z manifestu. `omniroute launch <tool>` spustí podporovaný kódovací nástroj s tokenem relace pro spuštění a seznamem modelů sestaveným z poskytovatelů, které jste připojili, a automaticky spustí místní bránu, když žádná neběží (viz [LAUNCH.md](./LAUNCH.md) ). Starší spouštěče pro jednotlivé nástroje — `omniroute launch` bez názvu nástroje (Claude Code) a `omniroute launch-codex` (Codex) — zůstávají dostupné.

Registrace poskytovatele je dostupná ve stejném kontextu local/remote. Níže uvedené příkazy API-first udržují ověření správy oddělené od přihlašovacích údajů poskytovatele a nikdy nevytisknou přihlašovací údaje ve strukturovaném výstupu:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

U skriptů preferujte `--credential-stdin` nebo `--credential-env`; `--credential` je zachován pro kontrolované místní použití. `providers remove` vyžaduje `--yes` na neinteraktivním terminálu a všech pět příkazů respektuje aktivní kontext nebo globální možnosti `--base-url`/`--api-key`.

Selektor poskytovatelů odmítne nejednoznačné předpony ID, jména nebo jména poskytovatelů; použijte úplné připojení ID když se shoduje několik připojení. Příkazy pro vytváření a úpravy přečtou uložené připojení zpět a odstraněním se ověří, že již není čitelné. Import přeskočí existující pár provider/name. Importované položky nemohou přepsat koncový bod správy, kontext nebo pověření pro správu dodané do CLI.

Jednorázové, ručně psané základní nastavení dvou nejbohatších integrací, viz hloubkové ponory pro jednotlivé nástroje:

- [Konfigurace kódu Claude](./CLAUDE-CODE-CONFIGURATION.md)
- [konfigurace Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Vzdálený režim](./REMOTE-MODE.md) — spusťte vzdálený OmniRoute (VPS / Tailnet) z vašeho notebooku
- [VS kód Copilot chat](./VSCODE-COPILOT.md) — rozšíření OmniCopilot ; může také spouštět tyto příkazy `setup-*` z editoru

---

## Mistrovský stůl

Každý příkaz ctí** aktivní kontext** (nastaveno pomocí `omniroute connect`, viz [Vzdálený režim](./REMOTE-MODE.md) ) nebo explicitní příznaky `--remote <url> --api-key <key>`. "Místní versus vzdálené" níže znamená: bez příznaků cílí `http://localhost:20128`; pomocí `--remote` (nebo aktivního vzdáleného kontextu) nakonfiguruje tento server jako backend a zapíše konfiguraci lokálně. Recepty založené na katalogu také načítají modely z tohoto serveru.

| Příkaz                     | Nástroj                          | Co to píše                                                                                                                                                        | Klíčové příznaky                                                                                                                           | Místní versus vzdálené |
| -------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                 | `~/.codex/<name>.config.toml` — jeden profil na kompatibilní textový model (`codex --profile <name>`)                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Obě                    |
| `omniroute setup-claude`   | Claude kód                       | `~/.claude/profiles/<name>/settings.json` — jeden profil na odpovídající model (`CLAUDE_CONFIG_DIR`)                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Obě                    |
| `omniroute setup-opencode` | OpenCode (kompatibilní s openai) | poskytovatel `~/.config/opencode/opencode.json` — `omniroute` s každým katalogovým modelem (`opencode -m omniroute/<model>`)                                      | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Obě                    |
| `omniroute setup-cline`    | Cline                            | `~/.cline/data/{globalState,secrets}.json` (režim CLI ) + vytiskne nastavení rozšíření kódu VS                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Obě                    |
| `omniroute setup-kilo`     | Kilový kód                       | `~/.local/share/kilo/auth.json` (CLI) + sloučí `kilocode.*` do VS Kód `settings.json` pokud je přítomen                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Obě                    |
| `omniroute setup-continue` | Pokračovat / `cn` CLI            | `~/.continue/config.yaml` — `provider: openai` modely, klíč přes `${{ secrets.OMNIROUTE_API_KEY }}`                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Obě                    |
| `omniroute setup-cursor`   | Cursor                           | Nic — nevytiskne kroky v aplikaci (konfigurace Cursor je neprůhledná SQLite)                                                                                      | `--remote` `--api-key` `--only` `--port`                                                                                                   | Obě                    |
| `omniroute setup-roo`      | Roo kód                          | `~/.omniroute/roo-settings.json` (import doc) + nastavuje `roo-cline.autoImportSettingsPath` pokud existuje kód VS `settings.json`                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Obě                    |
| `omniroute setup-crush`    | Rozdrtit                         | poskytovatel `~/.config/crush/crush.json` — `openai-compat`, klíč přes `$OMNIROUTE_API_KEY`                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Obě                    |
| `omniroute setup-zed`      | Zed                              | poskytovatel `~/.config/zed/settings.json` — `openai_compatible.omniroute` (modely s nástroji ≤ 25), klíč přes `$OMNIROUTE_API_KEY`                               | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | Obě                    |
| `omniroute setup-goose`    | Husa                             | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + tiskne recept env                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Obě                    |
| `omniroute setup-aider`    | Aider                            | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + tiskne env recept                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Obě                    |
| `omniroute setup-qwen`     | Qwen kód                         | `~/.qwen/settings.json` — V4 `modelProviders.openai` pole + `OMNIROUTE_API_KEY` v `~/.qwen/.env`                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Obě                    |
| `omniroute setup-gemini`   | Gemini CLI (nativní Gemini API)  | výběr a model ověření `~/.gemini/settings.json` — ; klíč `~/.gemini/.env` —, kořen serveru a prostředí Gemini                                                     | `--remote` `--context` `--api-key` `--model` `--yes` `--dry-run` `--port` `--gemini-home` `--settings-path` `--env-path`                   | Obě                    |
| `omniroute setup-5dive`    | 5 ponorů (agentská flotila)      | Nic pod `$HOME` — nepíše 5dive** autentizační profil** (`/var/lib/5dive/auth-profiles/<name>/`) přes `5dive agent auth set`; root-only, běží na hostiteli flotily | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Obě                    |
| `omniroute setup-whycodes` | WhyCodes                         | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); cesta je `$WHYCODES_HOME/config.toml` nebo `~/.whycodes/config.toml`                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Obě                    |
| `omniroute run <target>`   | Spuštění runtime (obecné)        | Nic — spawnuje `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` se správným env a args; Qwen a Gemini používají dočasný izolovaný domov     | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Obě                    |
| `omniroute launch`         | Claude kód                       | Nic — nevyvolá `claude` s injekcí `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                     | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Obě                    |
| `omniroute launch <tool>`  | Jakýkoli spustitelný nástroj     | Nic ve vaší vlastní konfiguraci: konfigurace pro spuštění v soukromém dočasném adresáři, token relace                                                             | `--model` `--all-models` `--list` `--remote` `--port` `--api-key` `--profile` `--dry-run` `--json`                                         | Obě                    |
| `omniroute launch-codex`   | OpenAI Codex CLI                 | Nic — nevytvoří `codex` s poskytovatelem `omniroute` vloženým přes příznaky `-c`                                                                                  | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Obě                    |

Poznámky k příznakům (ověřeno ve zdroji příkazu):

- `--remote <url>` — použít vzdálené OmniRoute (přepíše `--port` a aktivní kontext). `--api-key <key>` dodává pověření pro tento server (výchozí je `OMNIROUTE_API_KEY` env var nebo token aktivního kontextu).
- `--only <patterns>` — podřetězce oddělené čárkou; ponechte pouze model IDs který odpovídá (např. `--only glm,kimi`). Dostupné na `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed`.
- `--dry-run` — vytiskne přesně to, co by bylo zapsáno, aniž byste se dotkli souborového systému. Dostupné u každého příkazu `setup-*`** kromě** `setup-cursor` (který nikdy nezapisuje soubor).
- `--model <id>` — vyžadováno (nebo vybráno interaktivně) pro nástroje, které nemají žádné automatické zjišťování modelu: Cline, Kilo, Roo, Goose, Qwen, Gemini, Aider, 5dive, WhyCodes. Tyto nástroje také přijímají `--yes` pro neinteraktivní běhy (které pak vyžadují `--model`). `setup-opencode` bere `--model` k nastavení výchozího modelu nejvyšší úrovně.
- `--model <id>` na `omniroute run` se řídí kabeláží pro jednotlivé cíle manifestu (`bin/cli/cli-manifest.mjs`):** pomocník** přijímá `--model openai/<id>` a** opencode** `--model omniroute/<id>` (předpona je přidána pouze tehdy, když ji id ještě nenese);** qwen** a** Blíženci** přijímat id doslovně;** claude** dostane to přes `ANTHROPIC_MODEL`,** husa** přes `GOOSE_MODEL`,** proč kódy** přes `-P omniroute -m <id>` a** kodex** přes `-c model_providers.omniroute.*` args.**Qwen je jediný cíl běhu, který pevně vyžaduje `--model`** — `omniroute run qwen` bez něj ukončí `2` s explicitní chybou.
- `--port <port>` — místní port OmniRoute (výchozí `20128`, ignorováno, když je nastaveno `--remote` ). Přítomen na všech `setup-*` a obou launcherech.
- `omniroute run` výstupní kódy: vlastní výstupní kód podřízeného CLI je šířen doslovně; `2` = neplatné argumenty (nepodporovaný cíl, chybějící povinné `--model`, ochrana kontejneru); `127` = cílový binární soubor není v `PATH`; `130`/`143`/`129`, když je spuštění ukončeno příkazem `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = selhání spuštění jiného běhového prostředí.
- Dva spouštěče (`launch`, `launch-codex`) přijímají `--profile <name>` pro výběr profilu zapsaného `setup-claude` / `setup-codex` plus argy pass-through pro základní binární `claude` / `codex`.

Interaktivní výběr je také sdílen s recepturami nastavení:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
omniroute configure gemini
omniroute configure whycodes
```

`configure` aktuálně deleguje na testované receptury pro `codex`, `claude`, `opencode`, `qwen`, `gemini`, `aider`, `goose`, `cline`, `continue`, `kilo`, `5dive` a `whycodes`. Položky katalogu pouze IDE, MITM a pouze průvodce zůstávají explicitními toky `setup-*`/manual a nejsou prezentovány jako spouštěcí cíle.

> `setup-opencode` je** lehký kompatibilní s openai** integrace OpenCode. K dispozici je také bohatší integrace pluginu — `omniroute setup opencode` —, který nainstaluje `@omniroute/opencode-plugin`. Jsou to různé příkazy; výše uvedená tabulka dokumenty `setup-opencode`.
>
> Plugin je dodáván ve dvou balíčcích, jeden na OpenCode major, protože dva zavaděče očekávají různé vstupní body: `@omniroute/opencode-plugin` pro OpenCode v1 a `@omniroute/opencode-plugin-v2` pro OpenCode v2. Balíček v2 je nový (`0.1.0`) a řídí se hostitelskou smlouvou, která je stále v pohybu, takže čte tvar OpenCode semena do konceptu katalogu, místo aby nějaký přebíral. Nainstalujte jej přidáním položky `plugins` do `opencode.json`; `omniroute setup opencode` stále nainstaluje balíček v1. Možnosti a pořadí vyhledávání pověření jsou v balíčku README.

---

## Lokální použití

Když OmniRoute běží na `localhost:20128`, stačí spustit příkaz pro nastavení vašeho
nástroje. Katalog se načte z lokálního serveru.

```bash
# Codex: zapsat profil pro každý odpovídající model do ~/.codex/
omniroute setup-codex
codex --profile glm52            # použít vygenerovaný profil

# Claude Code: zapsat profily pro jednotlivé modely a poté jeden spustit
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: zapsat poskytovatele kompatibilního s OpenAI se všemi modely katalogu
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # odkazováno přes {env:OMNIROUTE_API_KEY}, nikdy se neukládá na disk
opencode -m omniroute/glm/glm-5.2 "..."

# Nástroje bez automatického zjišťování vyžadují explicitní model:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Náhled bez jakéhokoli zápisu:
omniroute setup-continue --dry-run
```

Spuštění zcela bez zápisu konfigurace (pouze předání přes proměnné prostředí):

```bash
omniroute launch                 # Claude Code → lokální OmniRoute
omniroute launch-codex           # Codex CLI → lokální OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Explicitní cesta k příkazu: vše za -- předejte beze změny
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Vzdálené použití

Nasměrujte libovolný příkaz pro nastavení na vzdálený OmniRoute pomocí `--remote` + `--api-key`.
Katalog se načte ze vzdáleného serveru a konfigurace se zapíše na váš lokální počítač.

```bash
# OpenCode proti vzdálenému VPS, zachovat pouze modely glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # nejprve exportovat OMNIROUTE_API_KEY

# Profily Codex ze vzdáleného katalogu
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Spustit CLI přímo proti vzdálenému serveru
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Místo předávání `--remote`/`--api-key` při každém spuštění se jednou přihlaste a nechte
je automaticky poskytovat prostřednictvím **aktivního kontextu**:

```bash
omniroute connect 192.168.0.15        # vytvoří token s omezeným rozsahem a uloží kontext
omniroute setup-codex                 # ← nyní používá vzdálený katalog
omniroute setup-opencode              # ← totéž
omniroute launch                      # ← Claude Code proti vzdálenému serveru
```

Informace o kontextech, rozsazích a správě tokenů najdete v dokumentu [Vzdálený režim](./REMOTE-MODE.md).

---

## 5 potápěčských agentských flotil

[5dive](https://5dive.ai) provozuje flotilu dlouhotrvajících kódovacích agentů, z nichž každý je systémovou jednotkou pod vlastním uživatelem Unixu. Nejedná se o samotné kódování CLI, takže pro `omniroute run` není co spustit — `5dive` je** pouze konfigurovat** cíl.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Oba tvary píší jeden 5 ponor** autentizační profil** a každé místo `claude` vázané na tento profil pak mluví se OmniRoute. Pro tento cíl jsou specifické tři věci:

- **Běží na hostiteli flotily jako root.** Slovesa 5dive působí na místní systémové jednotky a státní dir vlastněný kořenem; neexistuje žádný dálkový režim. Recept se znovu spustí přes `sudo`, když ještě není root (`--no-sudo` to vypne a místo toho vypíše příkaz).
- **Koncový bod musí být `https://` pokud se nejedná o zpětnou smyčku.** Agentův klíč API jede na tomto URL při každém požadavku a 5dive odmítne koncový bod s otevřeným textem. Soukromá adresa LAN není výjimkou.
- **Vlastní model každého sedadla předčí profil.** Profil nese `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, ale sedadlo stále připojené k sériovému ID modelu selže při prvním otočení s _"Vyskytl se problém s vybraným modelem"_. Předejte `--agent <name>` (opakovatelné), abyste přišpendlili i sedadla; recept vytiskne příkaz, když to neuděláte.

Klíč API je předán 5dive** stdin** (`--api-key=-`), takže se nikdy neobjeví ve výstupu `ps`.

Nasměrování profilu na OmniRoute** kombo** spíše než jediný model je to, co zajišťuje převzetí služeb při selhání poskytovatele vozového parku: když se primární koncový bod v polovině kola v běhu zaznamenaném na [#11578](https://github.com/cheaper-inference/OmniRoute/issues/11578) zhroutil, agent dokončil zbývající kroky v nouzovém režimu a výpadek se nikdy neozval.

---

## Základní konvence URL (které nástroje chtějí `/v1`)

OmniRoute odkryje povrch OpenAI v `/v1`, povrch Anthropic v kořenu a nativní povrch Gemini v `/v1beta`. Každá integrace je připojena k formuláři, který jeho nástroj očekává (ověřeno ve zdroji příkazů):

| Integrace                                                                  | Základ URL psaný | `/v1`?                                        |
| -------------------------------------------------------------------------- | ---------------- | --------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | vykořenit        | Ne — Cline připojuje `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | vykořenit        | Ne – Husa připojí cestu                       |
| `setup-aider` (`OPENAI_API_BASE`)                                          | vykořenit        | Ne — LiteLLM připojuje `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | se `/v1`         | Ano                                           |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | se `/v1`         | Ano                                           |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | vykořenit        | Ne – Claude kód připojuje `/v1/messages`      |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | se `/v1`         | Ano                                           |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | se `/v1`         | Ano                                           |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | vykořenit        | Ne – SDK připojuje `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` v auth profilu)                        | vykořenit        | Ne – Claude kód připojuje `/v1/messages`      |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | se `/v1`         | Ano – WhyCodes příspěvky `/chat/completions`  |

---

## Zachování nativních závislostí při aktualizaci: `--include=optional`

Při aktualizaci pomocí `omniroute update` (po potvrzení nebo s `--apply`)
OmniRoute spustí instalaci se zabudovaným parametrem `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Toto **není** parametr, který předáváte příkazu `omniroute update` — aktualizační
nástroj jej použije vždy. Zaručuje, že `optionalDependencies` (`better-sqlite3`,
`keytar`, `tls-client`, zásobník SLM LLMLingua) přežijí aktualizaci, i když je
v konfiguraci npm nastaveno `omit=optional`, což by jinak bez upozornění odstranilo
nativní ovladač SQLite a vazbu na systémové úložiště klíčů. Chcete-li zobrazit
přesný příkaz bez jeho spuštění:

```bash
omniroute update --dry-run
# [ZKUŠEBNÍ BĚH] Spustil by se příkaz: npm install -g omniroute@latest --include=optional
```

Další parametry příkazu `omniroute update` (ověřeno ve zdrojovém kódu): `--check`
(ukončí se s kódem 1, pokud je verze zastaralá), `--apply` (instalace bez dotazu),
`--changelog`, `--no-backup`, `--yes`.

---

## Google Gemini CLI prostřednictvím `omniroute run gemini`

Kontrakt ověřený vůči `@google/gemini-cli` 0.50.0: CLI respektuje
`GOOGLE_GEMINI_BASE_URL` a odesílá na tuto adresu požadavky
`POST /v1beta/models/<model>:generateContent` (a
`:streamGenerateContent?alt=sse`) — přesně na nativní rozhraní Gemini služby
OmniRoute (`/v1beta`). Příkaz `omniroute run gemini` vše nakonfiguruje automaticky:

- `GOOGLE_GEMINI_BASE_URL` → aktivní základní URL služby OmniRoute (kořen, bez `/v1`);
- `GEMINI_API_KEY` → zjištěné přihlašovací údaje OmniRoute (volba/prostředí/kontext);
- **dočasný izolovaný adresář `GEMINI_CLI_HOME`**, jehož soubor
  `.gemini/settings.json` vybírá ověřování `gemini-api-key`, takže uložená relace
  Google OAuth (Code Assist) nikdy nepřepíše spuštění směrované přes OmniRoute —
  po ukončení je adresář odstraněn;
- **hygiena prostředí**: z prostředí podřízeného procesu jsou odstraněny proměnné
  `GOOGLE_API_KEY`, `GOOGLE_GENAI_USE_VERTEXAI` a `GOOGLE_GENAI_USE_GCA` (které by
  ověřování přesměrovaly na Vertex/Code Assist) a jako dodatečné bezpečnostní
  opatření je nastavena proměnná `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` —
  ostatní cíle příkazu `run` jsou stejně ošetřeny proti vlastním konfliktním
  proměnným;
- vložení `--model <id>` z `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Ochrana důvěryhodnosti pracovního prostoru Gemini se uplatňuje i v bezobslužném
režimu — předejte sami `--skip-trust` (nebo adresáři interaktivně udělte důvěru);
spouštěč ji záměrně neobchází. Tento spouštěč se liší od **registrace ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), která zůstává integrací protokolu
agentů pro `/dashboard/acp-agents`.

---

## Skutečný smoke test (volitelný)

Deterministické regresní testy plánu spuštění běží v CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Pro ověření SKUTEČNÝCH binárních souborů vůči SKUTEČNÉMU
serveru OmniRoute je k dispozici volitelný testovací nástroj v
`tests/integration/upstream-cli-smoke.int.test.ts`. Nikdy se nespouští automaticky
(každý dílčí test je přeskočen, pokud není nastaveno `RUN_CLI_SMOKE=1`), předává přihlašovací údaj prostřednictvím NÁZVU
proměnné prostředí (nikoli její hodnoty), rediguje řetězce připomínající klíče ve všech zaznamenaných výstupech, přeskakuje
cíle, jejichž binární soubor není nainstalován, a klasifikuje selhání jako
ověření / upstream / konfigurace namísto pouhé booleovské hodnoty:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Volitelně: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` omezí testování;
`OMNIROUTE_SMOKE_TIMEOUT_MS` přepíše časový limit 120 s pro každý cíl.

---

## Viz také

- [Konfigurace Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — podrobnější průvodce pro Claude Code
- [Konfigurace Codex CLI](./CODEX-CLI-CONFIGURATION.md) — jednorázové základní nastavení `[model_providers.omniroute]`
- [Vzdálený režim](./REMOTE-MODE.md) — kontexty, přístupové tokeny s omezeným rozsahem a ovládání vzdáleného serveru
- [Referenční příručka nástrojů CLI](../reference/CLI-TOOLS.md) — úplný katalog podporovaných nástrojů a stránek řídicího panelu
- [Průvodce nastavením](./SETUP_GUIDE.md) — způsoby instalace a úvodní nastavení při prvním spuštění
