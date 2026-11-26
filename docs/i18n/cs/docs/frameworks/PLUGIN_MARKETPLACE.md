# Plugin Marketplace (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Zdroj pravdy:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` a
> `src/app/(dashboard)/dashboard/plugins/`
> **Poslední aktualizace:** 2026-06-28 — v3.8.40

OmniRoute obsahuje systém pluginů ve stylu WordPressu. Pluginy jsou samostatné
adresáře — každý se souborem manifestu `plugin.json` a vstupním souborem — které
se napojují na zpracování požadavků (`onRequest` / `onResponse` / `onError`) a na
události životního cyklu (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Tržiště pluginů** představuje nad tímto systémem vrstvu pro vyhledávání.
Zpřístupňuje katalog dostupných pluginů, které lze procházet a instalovat. Ve
výchozím nastavení katalog tvoří malý vestavěný základní registr; provozovatel
jej může nasměrovat na vlastní adresu URL vzdáleného registru. V takovém případě
je načítání zabezpečeno ochranou proti SSRF s překladem DNS (viz
[Zabezpečení](#security)).

Všechny trasy pluginů jsou přístupné **pouze přes loopback** (úroveň 1 —
`LOCAL_ONLY`): pluginy načítají a spouštějí kód v podřízených procesech, takže
trasy nejsou bez ohledu na ověření přístupné z jiného zdroje než loopback.
Viz [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Jak to sedí Together

```
Dashboard (/dashboard/plugins)
  ├─ "Installed" tab  → GET /api/plugins            (listPlugins)
  │                     POST /api/plugins/scan      (pluginManager.scan)
  │                     POST /api/plugins/{name}/activate|deactivate
  │                     DELETE /api/plugins/{name}   (uninstall)
  └─ "Marketplace" tab → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ no custom URL → built-in SEED_REGISTRY
                            └─ custom URL → isSafeMarketplaceUrl() SSRF guard
                                          → safeOutboundFetch(guard:"public-only")
```

- **Vrstva registru** — `src/lib/plugins/marketplace.ts`: vypíše / prohledá katalog, při jakémkoli selhání se vrátí do registru seed.
- **Vrstva životního cyklu** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): instalace, upgrade, aktivace, deaktivace, odinstalace, skenování, zatížení při spuštění.
- **Zjevná vrstva** — `src/lib/plugins/manifest.ts`: schéma Zod výchozí + pro `plugin.json`.
- **Skener** — `src/lib/plugins/scanner.ts`: objeví pluginy na disku v adresáři pluginů.
- **Nakladač** — `src/lib/plugins/loader.ts`: vytvoří každý plugin v samostatném podřízeném procesu Node.js a makléři zachytí volání přes IPC. Dítě není karanténa (viz „Izolace spuštění pluginů“ níže).

## Katalog tržiště

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) vrací seznam
objektů `MarketplaceEntry`:

| Pole          | Typ      | Poznámky                                        |
| ------------- | -------- | ----------------------------------------------- |
| `name`        | string   | Název pluginu ve formátu kebab-case             |
| `version`     | string   | semver                                          |
| `description` | string   | Stručný popis                                   |
| `author`      | string   | Autor / organizace                              |
| `license`     | string   | Identifikátor licence ve stylu SPDX             |
| `downloadUrl` | string   | Adresa URL zdroje ke stažení (může být prázdná) |
| `repository`  | string?  | Volitelná adresa URL repozitáře                 |
| `tags`        | string[] | Značky pro vyhledávání/filtrování               |
| `downloads`   | number   | Počet stažení                                   |
| `rating`      | number   | 0–5                                             |
| `verified`    | boolean  | Zda je položka označena jako ověřená            |
| `lastUpdated` | string   | Datumový řetězec ve formátu podobném ISO        |

Pokud není nakonfigurována vlastní adresa URL registru, katalog tvoří vestavěný
`SEED_REGISTRY` (aktuálně `request-logger`, `rate-limiter`, `cost-tracker` a
`theme-manager`). Základní registr je vždy k dispozici — pokud je nakonfigurovaný
vzdálený registr nedostupný, vrátí jiný stav než `200` nebo vrátí nerozpoznaný
obsah, `listMarketplacePlugins()` zaznamená upozornění a použije základní seznam.

> Poznámka: **katalog** tržiště (procházení/vyhledávání) je kompletně propojen,
> ale instalace z katalogu jedním kliknutím zatím není implementována — tlačítko
> „Instalovat“ na položce tržiště v řídicím panelu momentálně zobrazí oznámení
> „již brzy“. Instalace dnes probíhá prostřednictvím instalačního postupu
> z místní cesty (`POST /api/plugins`) a vyhledávání na disku
> (`POST /api/plugins/scan`).

## REST API

Všechny koncové body vyžadují ověření správy (`requireManagementAuth`)** a** jsou pouze pro zpětnou smyčku — `/api/plugins` a `/api/plugins/` jsou uvedeny v `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Koncový bod                      | Metoda | Popis                                                           |
| -------------------------------- | ------ | --------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Seznam nainstalovaných pluginů (volitelný filtr `?status=` )    |
| `/api/plugins`                   | POST   | Nainstalujte plugin z adresáře zdrojů pluginů                   |
| `/api/plugins/scan`              | POST   | Prohledejte adresář pluginů a zaregistrujte nové pluginy        |
| `/api/plugins/marketplace`       | GET    | Seznam položek katalogu tržiště                                 |
| `/api/plugins/[name]`            | GET    | Získejte podrobnosti o nainstalovaném pluginu                   |
| `/api/plugins/[name]`            | DELETE | Odinstalujte plugin                                             |
| `/api/plugins/[name]/activate`   | POST   | Aktivovat (načíst háčky registru + )                            |
| `/api/plugins/[name]/deactivate` | POST   | Deaktivovat (vystřelit `onDeactivate`, zrušit registraci háčků) |
| `/api/plugins/[name]/config`     | GET    | Získejte konfiguraci pluginu + konfigurační schéma              |
| `/api/plugins/[name]/config`     | PUT    | Aktualizovat konfiguraci pluginu (ověřeno podle schématu)       |

Filtr `GET /api/plugins` `status` přijímá jeden z `installed` / `active` / `inactive` / `error`. Neplatná hodnota vrátí `400`.

### Seznam nainstalovaných pluginů

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Instalace z místní cesty

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` musí být an** absolutní** cesta k adresáři** uvnitř adresáře zdrojů pluginů** : `plugin-sources` vedle kořenového adresáře pluginu, takže `~/.omniroute/plugin-sources/` ve výchozím nastavení nebo `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` když je tato proměnná nastavena (`getPluginSourcesDir()` v `src/lib/plugins/installSource.ts`). Nejprve tam zkopírujte nebo naklonujte plugin. Instalace je odmítnuta pomocí `400`, pokud cesta obsahuje `..` nebo prázdný bajt, leží mimo tento adresář, řeší se mimo něj prostřednictvím symbolického odkazu, obsahuje symbolický odkaz, jehož cíl je mimo něj, nebo když adresář neexistuje. Zdrojový adresář musí obsahovat platné `plugin.json` (nebo být jeho rodičem). Po úspěchu je odpověď `201` s nainstalovaným řádkem pluginu.

Na rozdíl od jiných cest zásuvných modulů tato vyžaduje pověření pro správu (relaci řídicího panelu nebo klíč API v rozsahu správy), i když je přihlášení zakázáno (`requireLogin=false`): instalace kódu není nikdy anonymní akcí.

### Procházet tržiště

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Aktualizujte konfiguraci pluginu

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` ověřuje každou poskytnutou hodnotu proti `configSchema` pluginu (deklarovanému v manifestu): pole `number` respektují `min`/`max`, pole `select` musí odpovídat deklarovanému `enum`. Klíče, které nejsou ve schématu, jsou povoleny.

## Konfigurace

### Adresář pluginů

Pluginy jsou umístěny v datovém adresáři OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (nebo soubor, na který odkazuje manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) určuje tento adresář ve
třech krocích:

1. **`OMNIROUTE_PLUGINS_DIR`**, pokud je nastavena — použije se beze změny bez ohledu na
   hodnotu `HOME`. Jde o explicitní nastavení pro Docker/K8s, kde je strom pluginů
   připojen pomocí bind mountu do cesty, která obvykle nemá nic společného s domovským
   adresářem kontejneru (#11827).
2. `<home>/.omniroute/plugins`, kde `<home>` pochází z proměnných prostředí `HOME` /
   `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, pokud proces vůbec neexportuje domovský adresář.

Určený adresář se při spuštění jednou zapíše do protokolu jako
`scanner.dir_resolved` spolu se vstupem, který byl použit (`OMNIROUTE_PLUGINS_DIR`,
`home` nebo `no-home-fallback`) — image, který bez upozornění skončí u kroku 3, to tak
výslovně uvede, místo aby pouze ohlásil prázdný seznam pluginů.
`POST /api/plugins/scan` vyhledá všechny podadresáře, které obsahují platný soubor
`plugin.json`, a zaregistruje je; stejný adresář je kořenem, do kterého
`pluginManager.install()` kopíruje pluginy, takže přepsání této cesty přesune
vyhledávání i instalaci společně.

> **`OMNIROUTE_PLUGINS_DIR` není `OMNIROUTE_PLUGIN_PATH`.** Druhou z nich používá pouze
> zavaděč příkazových pluginů CLI (`bin/cli/plugins.mjs`) k vyhledání npm balíčků
> `omniroute-cmd-*`, které přidávají podpříkazy `omniroute` — nemá žádný vliv na zde
> popsaný runtime skener. Informace o této části najdete v [PLUGINS.md](./PLUGINS.md).

### Vlastní URL registru tržiště

Zdroj katalogu tržiště se načítá z nastavení `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` čte `settings.pluginMarketplaceUrl`). Pokud je
nastaveno na URL `http(s)`, `listMarketplacePlugins()` tuto URL načte a přijme buď
JSON pole položek na nejvyšší úrovni, nebo objekt s polem `plugins`; položky bez
řetězcové hodnoty `name` jsou odfiltrovány. Pokud hodnota není nastavena (nebo pokud
načtení neprojde ochranou proti SSRF či vrátí neplatnou odpověď), použije se vestavěný
výchozí registr.

Karta „Marketplace“ na dashboardu obsahuje pole pro tuto URL (zpětně načítanou z
`GET /api/settings`).

> Poznámka k implementaci: akce „Save“ na dashboardu odesílá
> `pluginMarketplaceUrl` do `PATCH /api/settings`. V době psaní tohoto textu není
> tento klíč deklarován v `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), proto předtím, než se na něj začnete
> spoléhat, ověřte ve své verzi jeho perzistenci — cesta pro **čtení**
> (`getSettings()` → `listMarketplacePlugins()`) tento klíč respektuje, jakmile je
> přítomen v úložišti nastavení.

## Zabezpečení

### Pouze smyčka — na úrovni trasy

Pluginy spouštějí kód v vytvořených podřízených procesech, takže celý povrch `/api/plugins` je klasifikován `LOCAL_ONLY` (úroveň 1). Vynucení zpětné smyčky běží bezpodmínečně** před** jakoukoli kontrolu ověření, takže uniklý token správy, který se dostane do krabice přes tunel, stále nemůže nainstalovat, aktivovat nebo odinstalovat plugin. Viz [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) a Tvrdá pravidla #15 / #17.

### Registr SSRF strážce tržiště

Vlastní registr URL je konfigurace ovlivnitelná útočníkem, takže před jeho načtením jej `listMarketplacePlugins()` projde dvěma vrstvami:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Odmítne vše, co není `http:` / `https:`.
   - Odmítne doslovné hostitele private/loopback/link-local/ULA (IPv4** a** IPv6, včetně IPv4-mapped) prostřednictvím kanonické `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Řeší** obě** `A` a `AAAA` zaznamenává a odmítne if** žádný** vyřešená adresa je soukromá — zavírá obcházení veřejné adresy → privátní adresy IP.
   - **Selhání zavřeno** : selhání rozlišení DNS odmítne URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): znovu použije ochranu URL pouze pro veřejnost v době načítání a** blokuje přesměrování** (žádný veřejný → soukromý `30x` pivot).

URL která selže na kterékoli vrstvě, nezruší požadavek — tržiště se tiše vrátí do vestavěného registru seed a zaznamená varování.

> Tento kryt byl zesílen v PR #3774 speciálně pro vyřešení A + AAAA a použití kanonického `isPrivateHost` místo kontroly IPv4-only.

### Izolace spuštění pluginu

> **Pluginy nejsou v sandboxu.** Dítě je obyčejný proces Node.js běžící jako uživatel OmniRoute, bez kontextu VM a bez příznaků oprávnění Node.js, takže kód pluginu může číst a zapisovat jakýkoli soubor, který uživatel může, spouštět programy a dostat se do sítě. `requires.permissions` pouze rozhoduje o tom, které proměnné prostředí dítě obdrží; ostatní oprávnění nejsou vynucována. Instalujte pouze pluginy, kterým důvěřujete. Níže uvedená hranice procesu obsahuje selhání a zablokování; není to bezpečnostní hranice.

- **Procesní izolace** — `loadPlugin()` (`src/lib/plugins/loader.ts`) vytvoří každý plugin v samostatném podřízeném procesu Node.js a komunikuje přes IPC. Hook hovory mají časový limit s eskalací `SIGTERM` → `SIGKILL`.
- **Env seznam povolených** — dítě obdrží pouze povolenou sadu proměnných prostředí; širší sada je udělena pouze tehdy, když manifest vyžaduje oprávnění `env`.
- **Nainstalujte zdrojový obal** — `POST /api/plugins` čte pouze z adresáře zdrojů zásuvných modulů (viz "Instalace z místní cesty"): cesta je kanonizována pomocí `realpath`, musí zůstat přísně uvnitř tohoto adresáře a zdrojový strom obsahující symbolický odkaz, který z něj uniká, je odmítnut, než se cokoli zkopíruje.
- **Zadržování cesty** — install/upgrade/uninstall tvrdí, že adresář pluginu a `manifest.main` se vyřeší** v** spravovaný kořen zásuvného modulu před jakýmkoli kopírováním nebo rekurzivním odstraněním (chrání před zfalšovanými cestami DB a průchodem `../` v `manifest.main`). Aktivace řeší symbolické odkazy přes `realpath` a odmítá načíst vstupní bod, který uniká z adresáře pluginu.
- **Volitelný kolík integrity** — manifest může deklarovat pole `integrity` (formát `sha256-<base64>`, SRI ). Pokud je přítomen, zavaděč ověří hash vstupního souboru při načítání a odmítne se aktivovat při neshodě. Je to opt-in detekce manipulace,** ne** bezpečnostní hranice: neomezuje to, co může načtený plugin dělat.
- **Žádné přihlašovací údaje klienta v hácích** — kontext předaný `onRequest`, `onResponse` a `onError` má odstraněné záhlaví `authorization`, `x-api-key`, `proxy-authorization` a `cookie` a záznam klíče API nenese žádnou hodnotu klíče (`redactPluginContext()` v `src/lib/plugins/hooks.ts`).

## Manifest (`plugin.json`)

Ověřeno `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Pole               | Typ         | Poznámky                                                        |
| ------------------ | ----------- | --------------------------------------------------------------- |
| `name`             | řetězec     | Požadovaný; kebab-case (`^[a-z0-9-]+$`), 1–100 znaků            |
| `version`          | řetězec     | Požadovaný; semver (`MAJOR.MINOR.PATCH`)                        |
| `description`      | řetězec?    | ≤ 500 znaků                                                     |
| `author`           | řetězec?    | ≤ 200 znaků                                                     |
| `license`          | řetězec?    | Výchozí hodnota je `MIT`                                        |
| `main`             | řetězec?    | Vstupní soubor; výchozí je `index.js`                           |
| `source`           | enum?       | `local` \| `marketplace` (výchozí `local`)                      |
| `tags`             | řetězec[]?  | Hledat značky                                                   |
| `requires`         | objekt?     | `{ omniroute?, permissions[] }`                                 |
| `hooks`            | objekt?     | Booleans deklarující, které háčky plugin implementuje           |
| `skills`           | objekt[]?   | Volitelné definice dovedností                                   |
| `enabledByDefault` | booleovský? | Automatická aktivace při instalaci                              |
| `configSchema`     | objekt?     | Mapa konfiguračních polí (`string`/`number`/`boolean`/`select`) |
| `integrity`        | řetězec?    | Volitelný pin `sha256-<base64>` vstupního souboru               |

Oprávnění se čerpají z výčtu `network` / `file-read` / `file-write` / `env` / `exec`. Pouze `env` má běhový efekt (trochu větší seznam povolených proměnných prostředí pro potomka); ostatní jsou prohlášení a nejsou vymáhána.

## Průběh životního cyklu

```
instalace (POST /api/plugins, cesta)
  → načtení/ověření manifestu → zkopírování do přípravného adresáře → ověření, že main je uvnitř adresáře
  → atomické přejmenování do ~/.omniroute/plugins/<name> → vložení řádku do DB
  → spuštění onInstall → pokud enabledByDefault: aktivace

aktivace (POST /api/plugins/{name}/activate)
  → kontrola umístění pomocí realpath → loadPlugin() (spuštění podřízeného procesu)
  → registrace deklarovaných hooků → status = "active" → spuštění onActivate

deaktivace (POST /api/plugins/{name}/deactivate)
  → spuštění onDeactivate (PŘED zrušením registrace) → zrušení registrace hooků
  → ukončení podřízeného procesu → status = "inactive"

odinstalace (DELETE /api/plugins/{name})
  → deaktivace, pokud je aktivní → spuštění onUninstall
  → rekurzivní odstranění adresáře pluginu s kontrolou umístění → odstranění řádku z DB
```

Opětovné spuštění `install` nad adresářem, jehož verze v manifestu je **striktně
novější** než nainstalovaná verze, provede automatický upgrade (čistou
reinstalaci; konfigurace se obnoví na výchozí hodnoty). Stejná nebo starší verze
je odmítnuta.

## Databáze

Tabulka `plugins` (migrace `076_create_plugins.sql`):

| Sloupec         | Typ     | Poznámky                                            |
| --------------- | ------- | --------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                |
| `name`          | TEXT    | Jedinečný                                           |
| `version`       | TEXT    | semver; výchozí `1.0.0`                             |
| `description`   | TEXT    | Volitelný                                           |
| `author`        | TEXT    | Volitelný                                           |
| `license`       | TEXT    | Výchozí `MIT`                                       |
| `main`          | TEXT    | Vstupní soubor; výchozí `index.js`                  |
| `source`        | TEXT    | Výchozí `local`                                     |
| `tags`          | TEXT    | Pole JSON; výchozí `[]`                             |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`    |
| `enabled`       | INT     | 0/1; výchozí 0                                      |
| `manifest`      | TEXT    | Kompletní JSON manifestu                            |
| `config`        | TEXT    | JSON; výchozí `{}`                                  |
| `config_schema` | TEXT    | JSON; výchozí `{}`                                  |
| `hooks`         | TEXT    | Pole JSON s názvy deklarovaných hooků; výchozí `[]` |
| `permissions`   | TEXT    | Pole JSON; výchozí `[]`                             |
| `plugin_dir`    | TEXT    | Absolutní instalační adresář                        |
| `error_message` | TEXT    | Nastaveno, když `status = "error"`                  |
| `installed_at`  | TEXT    | `datetime('now')`                                   |
| `updated_at`    | TEXT    | `datetime('now')`                                   |
| `activated_at`  | TEXT    | Nastaveno při aktivaci                              |

Metriky a analytické údaje pluginů jsou sledovány v dalších tabulkách
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dashboard

Stránka řídicího panelu na `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) obsahuje dvě karty:

- **Instalováno** — uvádí nainstalované pluginy s jejich deklarovanými háčky, přepínačem activate/deactivate, tlačítkem pro odinstalaci a akcí „Vyhledat pluginy“ (`POST /api/plugins/scan`).
- **Tržiště** — zobrazuje katalog ze `GET /api/plugins/marketplace` s polem pro nastavení vlastního registru URL.

Stránka vždy zobrazuje varování, že pluginy běží s plnými právy procesu OmniRoute.

Konfigurační stránka pro každý plugin žije na `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Viz také

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  proč je `/api/plugins` přístupné pouze přes loopback (úroveň 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — související framework dovedností
  (`src/lib/skills/`); pluginy mohou deklarovat dovednosti ve svém manifestu
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — odchozí integrace řízené
  událostmi
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  vzor `buildErrorBody()`, který každá trasa pluginu používá pro chybové odpovědi
