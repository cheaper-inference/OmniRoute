# CLI Integrations (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

A megosztott végrehajtható jegyzékfájlról, a korlátozott gyermekkörnyezetekről és a tartós Gemini beállításról lásd [CLI indítási szerződéseit](./CLI-LAUNCH-CONTRACTS.md).

OmniRoute `setup-*` parancsok családját szállítja, amelyek beállítják a CLI kódolást (Codex, Claude Code, OpenCode, Cline, …), hogy OmniRoute használja — háttérprogramjaként, így az eszköz beszél** egy** végpont és OmniRoute útvonalak a megfelelő szolgáltatóhoz automatikus visszaállítással. A beállítási parancsok az aktív helyi vagy távoli OmniRoute környezetet használják, és bekapcsolják az eszközt** a te** gép. A katalógus alapú receptek modelleket kérnek le a szerverről; Az egymodellreceptek elfogadják `--model` vagy a ID modellt kérik. A API kulcsra egy környezeti változó hivatkozik, ahol az eszköz támogatja. Az alábbiakban felsoroljuk azokat a parancsokat, amelyek megmaradnak egy tool-local környezetfájlban.

A katalógus és az automatizálási parancsok különböző eszközkészleteket fednek le:

| Felület                        | Gróf | Mit jelent                                                                                     |
| ------------------------------ | ---- | ---------------------------------------------------------------------------------------------- |
| Szerszámkatalógus              | 39   | Dokumentált kódolóeszközök és ügynökök, beleértve a kézi és IDE integrációkat                  |
| `omniroute run <target>`       | 8    | Indítson el adaptereket, amelyek biztosítják a cél végpontját, hitelesítő adatait és modelljét |
| `omniroute configure <target>` | 12   | Interaktív konfigurációs receptek `setup-*` parancsokkal                                       |
| `setup-*` parancsol            | 16   | Regisztrált beállítási parancsok, beleértve guided/manual szerkesztő beállítását               |

A számok az [eszközjegyzék-](../../config/cli-tools-manifest.json) és [parancs-nyilvántartást](../../bin/cli/commands/registry.mjs) tükrözik, 2026-11-17. A katalógusbejegyzés nem jelent indítási adaptert. Tekintse meg a [CLI szerszámkatalógust](../reference/CLI-TOOLS.md) a teljes készletért.

Létezik egy általános — `omniroute run <target>` — indító is, amely `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini` vagy `whycodes` hozza létre a megfelelő env beadásával anélkül, hogy bármiféle konfigurációt írna. A célok és álneveik a kanonikus `bin/cli/cli-manifest.mjs` manifestből származnak (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`, `why-codes|why`), és `omniroute completion` ugyanazokat a manifeszt-eredetű célszavakat kínálja. `omniroute launch <tool>` elindít egy támogatott kódolóeszközt indításonkénti munkamenet-tokennel és a csatlakoztatott szolgáltatókból összeállított modelllistával, és automatikusan elindít egy helyi átjárót, ha egyik sem fut (lásd [LAUNCH.md](./LAUNCH.md) ). A régi eszközönkénti indítók, — `omniroute launch` eszköznév nélkül (Claude Code) és `omniroute launch-codex` (Codex) — továbbra is elérhetők.

A szolgáltató beépítése ugyanabból a local/remote környezetből érhető el. Az alábbi API-first parancsok elkülönítik a felügyeleti hitelesítést a szolgáltatói hitelesítési adatoktól, és soha nem nyomtatnak hitelesítő adatokat a strukturált kimenetben:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Szkriptek esetén előnyben részesítse `--credential-stdin` vagy `--credential-env`; `--credential` megmarad ellenőrzött helyi használatra. `providers remove` megköveteli `--yes` egy nem interaktív terminálon, és mind az öt parancs tiszteletben tartja az aktív környezetet vagy a globális `--base-url`/`--api-key` beállításokat.

A szolgáltatóválasztók elutasítják a kétértelmű ID előtagokat, neveket vagy szolgáltatóneveket; használjon teljes ID kapcsolatot, ha több kapcsolat egyezik. A létrehozási és szerkesztési parancsok visszaolvassák a mentett kapcsolatot, és az eltávolítás ellenőrzi, hogy az már nem olvasható. Az importálás kihagy egy meglévő provider/name párt. Az importált bejegyzések nem írhatják felül a CLI számára biztosított felügyeleti végpontot, környezetet vagy felügyeleti hitelesítési adatokat.

A két leggazdagabb integráció egyszeri, kézzel írott alapbeállításához lásd a szerszámonkénti mélyrepülést:

- [Claude kód konfiguráció](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI konfiguráció](./CODEX-CLI-CONFIGURATION.md)
- [Remote Mode](./REMOTE-MODE.md) — vezessen egy távoli OmniRoute (VPS / Tailnet) a laptopjáról
- [VS kód Copilot Chat](./VSCODE-COPILOT.md) — a OmniCopilot kiterjesztés; ezeket a `setup-*` parancsokat a szerkesztőből is le tudja futtatni

---

## Mester asztal

Minden parancs tiszteletben tartja a** aktív kontextus** (beállítva `omniroute connect`-val, lásd: [Távoli mód](./REMOTE-MODE.md) ) vagy explicit `--remote <url> --api-key <key>` jelzők. A "helyi vs távoli" az alábbiakat jelenti: zászlók nélkül `http://localhost:20128` t célozza meg; `--remote` vel (vagy egy aktív távoli környezettel) azt a szervert konfigurálja háttérként, és helyileg írja meg a konfigurációt. A katalógus alapú receptek modelleket is lekérnek erről a szerverről.

| Parancs                    | Eszköz                         | Amit ír                                                                                                                                                                          | Kulcs zászlók                                                                                                                              | Helyi vs távoli |
| -------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI               | `~/.codex/<name>.config.toml` — egy profil kompatibilis szövegmodellenként (`codex --profile <name>`)                                                                            | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Mindkét         |
| `omniroute setup-claude`   | Claude kód                     | `~/.claude/profiles/<name>/settings.json` — egy profil megfelelő modellenként (`CLAUDE_CONFIG_DIR`)                                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Mindkét         |
| `omniroute setup-opencode` | OpenCode (Openai-kompatibilis) | `~/.config/opencode/opencode.json` — `omniroute` szolgáltató minden katalógusmodellel (`opencode -m omniroute/<model>`)                                                          | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Mindkét         |
| `omniroute setup-cline`    | Cline                          | `~/.cline/data/{globalState,secrets}.json` (CLI mód) + kiírja VS kódkiterjesztés beállításait                                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Mindkét         |
| `omniroute setup-kilo`     | Kilo kód                       | `~/.local/share/kilo/auth.json` (CLI) + egyesíti `kilocode.*` - t VS kóddal `settings.json` kóddal , ha van                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Mindkét         |
| `omniroute setup-continue` | Folytatás / `cn` CLI           | `~/.continue/config.yaml` — `provider: openai` modellek, kulcs a `${{ secrets.OMNIROUTE_API_KEY }}` n keresztül                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Mindkét         |
| `omniroute setup-cursor`   | Cursor                         | — nem nyomtatja ki az alkalmazáson belüli lépéseket (Cursor konfigurációja átlátszatlan SQLite)                                                                                  | `--remote` `--api-key` `--only` `--port`                                                                                                   | Mindkét         |
| `omniroute setup-roo`      | Roo Code                       | `~/.omniroute/roo-settings.json` (dokumentum importálása) + beállítja `roo-cline.autoImportSettingsPath`, ha létezik `settings.json` VS kód                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Mindkét         |
| `omniroute setup-crush`    | Összetörni                     | `~/.config/crush/crush.json` — `openai-compat` szolgáltató, kulcs a `$OMNIROUTE_API_KEY` n keresztül                                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Mindkét         |
| `omniroute setup-zed`      | Zed                            | `~/.config/zed/settings.json` — `openai_compatible.omniroute` szolgáltató (≤ 25 szerszámmal használható modellek), kulcs `$OMNIROUTE_API_KEY` keresztül                          | `--remote` `--api-key` `--only` `--reset` `--dry-run` `--port` `--config-path`                                                             | Mindkét         |
| `omniroute setup-goose`    | Liba                           | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + nyomtat env receptet                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Mindkét         |
| `omniroute setup-aider`    | Aider                          | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + nyomtat env receptet                                                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Mindkét         |
| `omniroute setup-qwen`     | Qwen kód                       | `~/.qwen/settings.json` — V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` in `~/.qwen/.env`                                                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Mindkét         |
| `omniroute setup-gemini`   | Gemini CLI (natív Gemini API)  | `~/.gemini/settings.json` — hitelesítés kiválasztása és modellje; `~/.gemini/.env` — kulcs, kiszolgáló gyökér és Gemini környezet                                                | `--remote` `--context` `--api-key` `--model` `--yes` `--dry-run` `--port` `--gemini-home` `--settings-path` `--env-path`                   | Mindkét         |
| `omniroute setup-5dive`    | 5 merülés (ügynökflotta)       | `$HOME` alatt semmi — nem ír 5dive-t** hitelesítési profil** (`/var/lib/5dive/auth-profiles/<name>/`) a `5dive agent auth set` n keresztül; root-only, fut a flotta gazdagépen   | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Mindkét         |
| `omniroute setup-whycodes` | WhyCodes                       | WhyCodes `config.toml` (`[providers.omniroute]` + `[default_model]`); az elérési út `$WHYCODES_HOME/config.toml` vagy `~/.whycodes/config.toml`                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Mindkét         |
| `omniroute run <target>`   | Futásidejű indítás (általános) | Semmi — spawn `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`/`whycodes` a megfelelő env-vel és args-okkal; Qwen és Gemini ideiglenes elszigetelt otthont használnak | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Mindkét         |
| `omniroute launch`         | Claude kód                     | Semmi — nem hoz létre `claude` `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` beadásával                                                                                            | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Mindkét         |
| `omniroute launch <tool>`  | Bármilyen indítható eszköz     | Semmi a saját konfigurációjában: indításonkénti konfiguráció egy privát temp könyvtárban, munkamenet-token                                                                       | `--model` `--all-models` `--list` `--remote` `--port` `--api-key` `--profile` `--dry-run` `--json`                                         | Mindkét         |
| `omniroute launch-codex`   | OpenAI Codex CLI               | — semmi sem hoz létre `codex` ha a `omniroute` szolgáltatót `-c` zászlókkal injektálják                                                                                          | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Mindkét         |

Megjegyzések a zászlókkal kapcsolatban (ellenőrizve a parancsforrásban):

- `--remote <url>` — használjon távoli OmniRoute (felülbírálja `--port` és az aktív környezetet). `--api-key <key>` biztosítja a kiszolgáló hitelesítő adatait (alapértelmezett a `OMNIROUTE_API_KEY` env var, vagy az aktív környezet tokenje).
- `--only <patterns>` — vesszővel elválasztott részkarakterláncok; csak a megfelelő IDs modellt tartsa meg (pl. `--only glm,kimi`). Elérhető `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`, `setup-zed` alatt.
- `--dry-run` — pontosan azt írja ki, ami a fájlrendszer érintése nélkül lenne írva. Minden `setup-*` parancsnál elérhető** kivéve** `setup-cursor` (ami soha nem ír fájlt).
- `--model <id>` — kötelező (vagy interaktívan kiválasztott) azokhoz az eszközökhöz, amelyek nem rendelkeznek automatikus modellfelderítéssel: Cline, Kilo, Roo, Goose, Qwen, Gemini, Aider, 5dive, WhyCodes. Ezek az eszközök `--yes` is elfogadják a nem interaktív futtatásokhoz (amihez aztán `--model` szükséges). `setup-opencode` `--model` használja az alapértelmezett legfelső szintű modell beállításához.
- `--model <id>` a `omniroute run` -n követi a jegyzék cél szerinti vezetékezését (`bin/cli/cli-manifest.mjs`):** segítő** kap `--model openai/<id>` és** nyílt kód** `--model omniroute/<id>` (az előtag csak akkor kerül hozzáadásra, ha az azonosító még nem tartalmazza);** qwen** és** Ikrek** szó szerint megkapja az azonosítót;** claude** `ANTHROPIC_MODEL`-n keresztül kapja meg,** liba** `GOOSE_MODEL` keresztül,** miértkódok** `-P omniroute -m <id>` keresztül, és** kódex** keresztül `-c model_providers.omniroute.*` args.**Qwen az egyetlen futtatott cél, amelyhez keményen szükséges `--model`** — `omniroute run qwen` nélküle explicit hibával lép ki `2`.
- `--port <port>` — helyi OmniRoute port (alapértelmezett `20128`, figyelmen kívül hagyva, ha `--remote` be van állítva). Jelen van az összes `setup-*` és mindkét indítón.
- `omniroute run` kilépési kódok: a gyermek CLI saját kilépési kódja szó szerint terjed; `2` = érvénytelen argumentumok (nem támogatott cél, hiányzik a szükséges `--model`, konténervédő); `127` = a cél bináris nincs a `PATH` ban; `130`/`143`/`129`, ha az indítást `SIGINT`/`SIGTERM`/`SIGHUP` fejezi be ; `1` = egyéb futásidejű indítási hiba.
- A két indítóprogram (`launch`, `launch-codex`) elfogadja `--profile <name>` `setup-claude` / `setup-codex` által írt profil kiválasztásához, valamint a mögöttes `claude` / `codex` bináris átjelentkezési paramétereit.

Az interaktív válogatót a beállítási receptek is megosztják:

```bash
# Pick from the active local or remote model catalog and configure the target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
omniroute configure gemini
omniroute configure whycodes
```

`configure` jelenleg a `codex`, `claude`, `opencode`, `qwen`, `gemini`, `aider`, `goose`, `cline`, `continue`, `kilo`, `5dive` és `whycodes` tesztelt receptjeihez delegálódik . A csak IDE, MITM és csak útmutató katalógusbejegyzések explicit `setup-*`/manuális folyamok maradnak, és nem jelennek meg indítható célként.

> `setup-opencode` az** könnyű, openai kompatibilis** OpenCode integráció. Van egy gazdagabb beépülő modul integráció is, — `omniroute setup opencode` —, amely telepíti `@omniroute/opencode-plugin`. Ezek különböző parancsok; a fenti táblázat `setup-opencode` dokumentumot tartalmazza.
>
> A beépülő modul két csomagban érkezik, OpenCode majoronként egy, mert a két betöltő eltérő belépési pontokat vár: `@omniroute/opencode-plugin` OpenCode v1-hez és `@omniroute/opencode-plugin-v2` OpenCode v2-hez. A v2 csomag új (`0.1.0`), és egy még mozgó gazdagépszerződést követ, így a OpenCode seeds alakot beolvassa a katalógustervezetbe, nem pedig feltételezi azt. Telepítse úgy, hogy hozzáad egy `plugins` bejegyzést `opencode.json`; `omniroute setup opencode` továbbra is telepíti a v1 csomagot. Az opciók és a hitelesítő adatok keresési sorrendje a README csomagban található.

---

## Helyi használat

Ha az OmniRoute a `localhost:20128` címen fut, csak futtasd az eszközödhöz tartozó beállítási parancsot. A katalógus a helyi kiszolgálóról töltődik le.

```bash
# Codex: minden illeszkedő modellhez profilt ír a ~/.codex/ könyvtárba
omniroute setup-codex
codex --profile glm52            # egy létrehozott profil használata

# Claude Code: modellenkénti profilokat ír, majd elindít egyet
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: beírja az OpenAI-kompatibilis szolgáltatót a katalógus összes modelljével
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # hivatkozás: {env:OMNIROUTE_API_KEY}; soha nem kerül lemezre
opencode -m omniroute/glm/glm-5.2 "..."

# Az automatikus felderítést nem támogató eszközöknél explicit modellt kell megadni:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Előnézet fájlírás nélkül:
omniroute setup-continue --dry-run
```

Indítás konfiguráció írása nélkül (csak környezetiinjekcióval):

```bash
omniroute launch                 # Claude Code → helyi OmniRoute
omniroute launch-codex           # Codex CLI → helyi OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Explicit parancsútvonal: változtatás nélkül továbbít mindent a -- után
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Távoli használat

Bármely beállítási parancsot egy távoli OmniRoute-példányra irányíthatsz a `--remote` és a `--api-key` megadásával. A katalógus a távoli példányról töltődik le, a konfiguráció pedig a helyi gépedre íródik.

```bash
# OpenCode egy távoli VPS használatával, csak a glm/kimi modellek megtartásával
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # előbb exportáld az OMNIROUTE_API_KEY változót

# Codex-profilok egy távoli katalógusból
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# CLI közvetlen indítása a távoli példány használatával
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Ahelyett, hogy minden alkalommal megadnád a `--remote`/`--api-key` kapcsolókat, jelentkezz be egyszer, és hagyd, hogy az **aktív kontextus** automatikusan biztosítsa ezeket:

```bash
omniroute connect 192.168.0.15        # hatókörrel rendelkező tokent hoz létre, és eltárolja a kontextust
omniroute setup-codex                 # ← most már a távoli katalógust használja
omniroute setup-opencode              # ← ugyanez
omniroute launch                      # ← Claude Code a távoli példánnyal
```

A kontextusokról, hatókörökről és tokenkezelésről lásd a [Távoli mód](./REMOTE-MODE.md) című dokumentumot.

---

## 5 búvárügynök flotta

[Az 5dive](https://5dive.ai) régóta működő kódoló ágensek flottáját futtatja, mindegyik egy rendszeregység a saját Unix felhasználója alatt. Ez nem maga CLI kódolása, így `omniroute run` nincs értelme — elindításához. A `5dive` egy** csak konfigurálható** cél.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Mindkét űrlap egy 5 merülést ír** hitelesítési profil** , és minden ehhez a profilhoz kötött `claude` ülés beszél OmniRoute-vel. Három dolog jellemző erre a célra:

- **A flotta gazdagépen rootként fut.** Az 5dive igék helyi rendszeregységekre és gyökértulajdonú állami dirre hatnak; nincs távoli mód. A recept újra végrehajtódik `sudo` keresztül, ha még nem root (`--no-sudo` kikapcsolja, és helyette kiírja a parancsot).
- **A végpontnak `https://` kell lennie, hacsak nem loopback.** Az ügynök API kulcsa minden kérésre ezt a URL választja, és az 5dive visszautasítja a sima szöveges off-box végpontot. A privát LAN -cím sem kivétel.
- **Minden ülés saját modelltűje felülmúlja a profilt.** A profil tartalmazza `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, de a részvénymodell-azonosítóhoz még mindig rögzített ülés meghiúsítja az első kanyart a következővel: _"Probléma van a kiválasztott modellel"_. Adja át `--agent <name>` (ismételhető) az ülések rögzítéséhez; a recept kiírja a parancsot, ha nem.

A API kulcsot átadjuk az 5dive on** stdin** (`--api-key=-`), így soha nem jelenik meg a `ps` kimenetben.

A profilt egy OmniRoute ra irányítva** kombó** a flottaszolgáltató feladatátvételét nem egyetlen modell teszi lehetővé: amikor az elsődleges végpont [#11578](https://github.com/cheaper-inference/OmniRoute/issues/11578) n rögzített futás közepén keményen leállt, az ügynök befejezte a hátralévő lépéseit a visszalépésen, és soha nem fedezte fel a leállást.

---

## Alapvető URL konvenciók (mely eszközökre van szükség `/v1`)

OmniRoute a OpenAI felületet `/v1` nél, a Anthropic felületet a gyökérnél, és egy natív Gemini felületet `/v1beta` nél. Minden integráció az eszköz által elvárt formához van kötve (ellenőrizve a parancsforrásban):

| Integráció                                                                 | Alap URL írva | `/v1`?                                         |
| -------------------------------------------------------------------------- | ------------- | ---------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | gyökér        | Nem – Cline hozzáfűzi `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | gyökér        | Nem – Goose hozzáfűzi az utat                  |
| `setup-aider` (`OPENAI_API_BASE`)                                          | gyökér        | Nem – LiteLLM hozzáfűzi `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1`         | Igen                                           |
| `setup-zed` (`language_models.openai_compatible.omniroute.api_url`)        | `/v1`         | Igen                                           |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | gyökér        | Nem – Claude kód hozzáfűzi `/v1/messages`      |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1`         | Igen                                           |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1`         | Igen                                           |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | gyökér        | Nem – a SDK hozzáfűzi `/v1beta/models/…`       |
| `setup-5dive` (`ANTHROPIC_BASE_URL` a hitelesítési profilban)              | gyökér        | Nem – Claude kód hozzáfűzi `/v1/messages`      |
| `setup-whycodes` (`[providers.omniroute].base_url`)                        | `/v1`         | Igen – WhyCodes `/chat/completions` ír         |

---

## Natív függőségek megtartása frissítéskor: `--include=optional`

Amikor az `omniroute update` paranccsal frissít (megerősítés után vagy az `--apply`
kapcsolóval), az OmniRoute a beépített `--include=optional` kapcsolóval futtatja
a telepítést:

```bash
npm install -g omniroute@latest --include=optional
```

Ez **nem** egy olyan kapcsoló, amelyet az `omniroute update` parancsnak kell átadni —
a frissítő mindig alkalmazza. Ez garantálja, hogy az `optionalDependencies`
(`better-sqlite3`, `keytar`, `tls-client`, az LLMLingua SLM-verem) a frissítés után
is megmaradjanak, még akkor is, ha az npm konfigurációjában az `omit=optional` van
beállítva, ami egyébként észrevétlenül eltávolítaná a natív SQLite-illesztőprogramot
és az operációs rendszer kulcstartójához tartozó kötést. A pontos parancs alkalmazás
nélküli előnézetéhez:

```bash
omniroute update --dry-run
# [PRÓBAFUTÁS] Futtatandó parancs: npm install -g omniroute@latest --include=optional
```

Az `omniroute update` további kapcsolói (a forráskódban ellenőrizve): `--check`
(1-es kilépési kód, ha elavult), `--apply` (telepítés megerősítés kérése nélkül),
`--changelog`, `--no-backup`, `--yes`.

---

## Google Gemini CLI az `omniroute run gemini` paranccsal

A szerződés az `@google/gemini-cli` 0.50.0 verziója alapján ellenőrizve: a CLI
figyelembe veszi a `GOOGLE_GEMINI_BASE_URL` értékét, és a
`POST /v1beta/models/<model>:generateContent` (valamint a
`:streamGenerateContent?alt=sse`) kéréseket erre küldi — pontosan az OmniRoute
natív Gemini-felületére (`/v1beta`). Az `omniroute run gemini` ezt automatikusan
beállítja:

- `GOOGLE_GEMINI_BASE_URL` → az aktív OmniRoute alap-URL (gyökér, `/v1` nélkül);
- `GEMINI_API_KEY` → a feloldott OmniRoute-hitelesítő adat (opció/környezet/kontextus);
- egy **ideiglenes, elkülönített `GEMINI_CLI_HOME`**, amelynek
  `.gemini/settings.json` fájlja a `gemini-api-key` hitelesítést választja ki, így
  egy tárolt Google OAuth-munkamenet (Code Assist) soha nem írja felül az
  OmniRoute-ra irányított indítást — kilépés után eltávolításra kerül;
- **környezeti higiénia**: a gyermekfolyamat környezetéből eltávolításra kerül a
  `GOOGLE_API_KEY`, a `GOOGLE_GENAI_USE_VERTEXAI` és a `GOOGLE_GENAI_USE_GCA`
  (amelyek a hitelesítést a Vertex/Code Assist felé irányítanák), továbbá
  tartalék biztonsági megoldásként beállításra kerül a
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` — a többi `run` célpont saját ütköző
  változói ugyanezt a kezelést kapják;
- `--model <id>` beillesztése a `--provider`/`--model` alapján.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

A Gemini munkaterület-megbízhatósági védelme fej nélküli módban is érvényes —
adja át saját maga a `--skip-trust` kapcsolót (vagy interaktív módon nyilvánítsa
megbízhatónak a könyvtárat); az indító szándékosan nem kerüli meg ezt. Ez az indító
különbözik az **ACP-regisztrációtól** (`src/lib/acp/registry.ts`, `gemini --acp`),
amely továbbra is a `/dashboard/acp-agents` ügynökprotokoll-integrációja.

---

## Valódi smoke tesztkör (opcionális)

A determinisztikus indításiterv-regressziós tesztek a CI-ban futnak (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). A VALÓDI binárisok VALÓDI
OmniRoute-kiszolgálóval történő ellenőrzéséhez egy opcionálisan aktiválható tesztkeret érhető el a
`tests/integration/upstream-cli-smoke.int.test.ts` fájlban. Soha nem fut automatikusan
(minden részteszt kimarad, hacsak nincs beállítva a `RUN_CLI_SMOKE=1`), a hitelesítő adatot a környezeti változó
NEVÉVEL adja át (soha nem az értékével), minden rögzített kimenetből kitakarja a kulcsformájú karakterláncokat, kihagyja
azokat a célokat, amelyek binárisa nincs telepítve, és a hibákat egyszerű logikai érték helyett
auth / upstream / config kategóriákba sorolja:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opcionális: az `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` a tesztkört a megadott célokra korlátozza;
az `OMNIROUTE_SMOKE_TIMEOUT_MS` felülírja a célonkénti 120 másodperces időkorlátot.

---

## Lásd még

- [Claude Code konfigurálása](./CLAUDE-CODE-CONFIGURATION.md) — részletesebb útmutató a Claude Code használatához
- [Codex CLI konfigurálása](./CODEX-CLI-CONFIGURATION.md) — az egyszeri `[model_providers.omniroute]` alapbeállítás
- [Távoli mód](./REMOTE-MODE.md) — környezetek, hatókörrel rendelkező hozzáférési tokenek és távoli kiszolgáló vezérlése
- [CLI-eszközök referenciája](../reference/CLI-TOOLS.md) — a támogatott eszközök és irányítópult-oldalak teljes katalógusa
- [Telepítési útmutató](./SETUP_GUIDE.md) — telepítési módszerek és az első indítás beállításai
