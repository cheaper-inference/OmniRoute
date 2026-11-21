# Plugin Marketplace (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Zdroj pravdy:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` a
> `src/app/(dashboard)/dashboard/plugins/`
> **Posledná aktualizácia:** 2026-06-28 — v3.8.40

OmniRoute obsahuje systém pluginov v štýle WordPressu. Pluginy sú samostatné
adresáre — každý so súborom manifestu `plugin.json` a vstupným súborom — ktoré sa
pripájajú k spracovaniu požiadaviek (`onRequest` / `onResponse` / `onError`) a k
udalostiam životného cyklu (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Trhovisko pluginov** je vrstva na vyhľadávanie nad týmto systémom. Poskytuje
prehľadávateľný katalóg pluginov dostupných na inštaláciu. V predvolenom nastavení
je katalóg malým vstavaným počiatočným registrom; prevádzkovateľ ho môže nasmerovať
na vlastnú adresu URL vzdialeného registra. V takom prípade je načítanie zabezpečené
ochranou proti SSRF s prekladom DNS (pozrite si časť [Zabezpečenie](#security)).

Každá trasa pluginov je dostupná **iba cez loopback** (úroveň 1 — `LOCAL_ONLY`):
pluginy načítavajú a spúšťajú kód v podriadených procesoch, takže trasy sú bez
ohľadu na autentifikáciu nedostupné z akéhokoľvek zdroja mimo loopbacku. Pozrite si
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Ako sa to hodí Together

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

- **Vrstva registra** — `src/lib/plugins/marketplace.ts`: vypíše/vyhľadá katalóg a pri akomkoľvek zlyhaní sa vráti do registra semien.
- **Vrstva životného cyklu** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): inštalácia, aktualizácia, aktivácia, deaktivácia, odinštalovanie, skenovanie, zaťaženie pri spustení.
- **Zjavná vrstva** — `src/lib/plugins/manifest.ts`: predvolená hodnota schémy Zod + pre `plugin.json`.
- **Skener** — `src/lib/plugins/scanner.ts`: nájde pluginy na disku v adresári pluginov.
- **Nakladač** — `src/lib/plugins/loader.ts`: vytvorí každý plugin v samostatnom Node.js podriadenom procese a sprostredkuje hovory cez IPC. Dieťa nie je pieskovisko (pozri „Izolácia spúšťania zásuvných modulov“ nižšie).

## Katalóg trhoviska

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) vracia zoznam
objektov `MarketplaceEntry`:

| Pole          | Typ      | Poznámky                                           |
| ------------- | -------- | -------------------------------------------------- |
| `name`        | string   | Názov pluginu vo formáte kebab-case                |
| `version`     | string   | semver                                             |
| `description` | string   | Stručný opis                                       |
| `author`      | string   | Autor/organizácia                                  |
| `license`     | string   | Identifikátor licencie v štýle SPDX                |
| `downloadUrl` | string   | Adresa URL zdroja na stiahnutie (môže byť prázdna) |
| `repository`  | string?  | Voliteľná adresa URL repozitára                    |
| `tags`        | string[] | Značky na vyhľadávanie/filtrovanie                 |
| `downloads`   | number   | Počet stiahnutí                                    |
| `rating`      | number   | 0–5                                                |
| `verified`    | boolean  | Či je položka označená ako overená                 |
| `lastUpdated` | string   | Reťazec dátumu približne vo formáte ISO            |

Ak nie je nakonfigurovaná vlastná adresa URL registra, katalóg používa vstavaný
`SEED_REGISTRY` (aktuálne `request-logger`, `rate-limiter`, `cost-tracker` a
`theme-manager`). Počiatočný register je vždy dostupný — ak je nakonfigurovaný
vzdialený register nedostupný, vráti stav odlišný od `200` alebo vráti
nerozpoznané telo odpovede, funkcia `listMarketplacePlugins()` zaznamená
upozornenie a použije počiatočný zoznam.

> Poznámka: **katalóg** trhoviska (prehľadávanie/vyhľadávanie) je plne prepojený,
> ale inštalácia z katalógu trhoviska **jedným kliknutím** zatiaľ nie je
> implementovaná — tlačidlo „Inštalovať“ na položke trhoviska na ovládacom paneli
> momentálne zobrazuje oznámenie „už čoskoro“. Inštalácia v súčasnosti prebieha
> prostredníctvom procesu inštalácie z lokálnej cesty (`POST /api/plugins`) a
> vyhľadávania na disku (`POST /api/plugins/scan`).

## REST API

Všetky koncové body vyžadujú autorizáciu správy (`requireManagementAuth`)** a** sú len pre spätnú slučku — `/api/plugins` a `/api/plugins/` sú uvedené v `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Koncový bod                        | Metóda | Popis                                                            |
| ---------------------------------- | ------ | ---------------------------------------------------------------- |
| `/api/plugins`                     | GET    | Zoznam nainštalovaných doplnkov (voliteľný filter `?status=` )   |
| `/api/plugins`                     | POST   | Nainštalujte doplnok z adresára zdrojov doplnkov                 |
| `/api/plugins/scan`                | POST   | Naskenujte adresár doplnkov a zaregistrujte nové doplnky         |
| `/api/plugins/marketplace`         | GET    | Zoznam položiek katalógu trhovísk                                |
| `/api/plugins/marketplace/install` | POST   | Nainštalujte si doplnok Marketplace podľa názvu                  |
| `/api/plugins/[name]`              | GET    | Získajte podrobnosti o nainštalovanom doplnku                    |
| `/api/plugins/[name]`              | DELETE | Odinštalujte doplnok                                             |
| `/api/plugins/[name]/activate`     | POST   | Aktivovať (načítať háčiky registra + )                           |
| `/api/plugins/[name]/deactivate`   | POST   | Deaktivovať (vystreliť `onDeactivate`, zrušiť registráciu hákov) |
| `/api/plugins/[name]/config`       | GET    | Získajte schému konfigurácie pluginu +                           |
| `/api/plugins/[name]/config`       | PUT    | Aktualizujte konfiguráciu doplnku (overené podľa schémy)         |

Filter `GET /api/plugins` `status` akceptuje jednu z možností `installed` / `active` / `inactive` / `error`. Neplatná hodnota vráti `400`.

### Zoznam nainštalovaných doplnkov

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Inštalácia z lokálnej cesty

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` musí byť an** absolútne** cestu k adresáru** v adresári zdrojov doplnku** : `plugin-sources` vedľa koreňa pluginu, takže `~/.omniroute/plugin-sources/` predvolene, alebo `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` keď je táto premenná nastavená (`getPluginSourcesDir()` v `src/lib/plugins/installSource.ts`). Najprv tam skopírujte alebo naklonujte doplnok. Inštalácia je odmietnutá pomocou `400`, keď cesta obsahuje `..` alebo nulový bajt, leží mimo tohto adresára, rieši sa mimo neho prostredníctvom symbolického odkazu, obsahuje symbolický odkaz, ktorého cieľ je mimo neho, alebo ak adresár neexistuje. Zdrojový adresár musí obsahovať platné `plugin.json` (alebo byť rodičom jedného). Po úspechu je odpoveď `201` s riadkom nainštalovaného pluginu.

Na rozdiel od iných trás doplnkov, táto vyžaduje poverenie na správu (reláciu dashboardu alebo kľúč API v rozsahu správy), aj keď je prihlásenie zakázané (`requireLogin=false`): inštalácia kódu nikdy nie je anonymná akcia. To isté platí pre `POST /api/plugins/marketplace/install` (body `{ "name": "<plugin>" }`).

### Prehľadávať trhovisko

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Aktualizujte konfiguráciu pluginu

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` overí telo oproti `configSchema` doplnku (deklarované v manifeste) pomocou `validatePluginConfig()` z `src/lib/plugins/manifest.ts`: každý kľúč musí byť deklarovaný v schéme, hodnoty musia zodpovedať deklarovanému typu, polia `number` rešpektujú `min`/`max` a polia `select` sa musia zhodovať s deklarovaným `enum`. Akékoľvek porušenie vráti `400` a nič sa neuloží. Doplnok, ktorý nedeklaruje žiadne `configSchema` nemá žiadne konfigurovateľné kľúče, takže požiadavka je zamietnutá pomocou `400` („Plugin nedeklaruje žiadne konfigurovateľné kľúče“).

## Konfigurácia

### Adresár pluginov

Pluginy sa nachádzajú v dátovom adresári OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (alebo ľubovoľný súbor, na ktorý odkazuje manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) určuje tento adresár v
troch krokoch:

1. **`OMNIROUTE_PLUGINS_DIR`**, ak je nastavená — použije sa doslovne bez ohľadu na hodnotu `HOME`. Ide o
   explicitné nastavenie pre Docker/K8s, kde je strom pluginov pripojený pomocou bind mount do cesty,
   ktorá zvyčajne nijako nesúvisí s domovským adresárom kontajnera (#11827).
2. `<home>/.omniroute/plugins`, kde `<home>` pochádza z premenných prostredia `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, ak proces vôbec neexportuje domovský adresár.

Určený adresár sa pri spustení raz zaznamená do logu ako `scanner.dir_resolved` s uvedením
vstupu, ktorý sa použil (`OMNIROUTE_PLUGINS_DIR`, `home` alebo `no-home-fallback`) — obraz,
ktorý potichu skončí pri kroku 3, to teda uvedie namiesto toho, aby hlásil iba prázdny zoznam pluginov.
`POST /api/plugins/scan` vyhľadá každý podadresár, ktorý obsahuje platný
`plugin.json`, a zaregistruje ho; ten istý adresár je koreňovým adresárom, do ktorého
`pluginManager.install()` kopíruje pluginy, takže prepísanie nastavenia presunie zisťovanie aj
inštaláciu spoločne.

> **`OMNIROUTE_PLUGINS_DIR` nie je `OMNIROUTE_PLUGIN_PATH`.** Druhú premennú číta iba
> načítavač príkazových pluginov CLI (`bin/cli/plugins.mjs`) na vyhľadanie npm balíkov
> `omniroute-cmd-*`, ktoré pridávajú podpríkazy `omniroute` — nemá žiadny vplyv na skener za behu
> opísaný v tejto časti. Informácie o tejto oblasti nájdete v [PLUGINS.md](./PLUGINS.md).

### Vlastná URL registra trhoviska

Zdroj katalógu trhoviska sa načítava z nastavenia `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` číta `settings.pluginMarketplaceUrl`). Keď je
nastavené na URL typu `http(s)`, `listMarketplacePlugins()` načíta danú URL a akceptuje
buď JSON pole položiek najvyššej úrovne, alebo objekt s poľom `plugins`;
položky bez reťazca `name` sa odfiltrujú. Ak hodnota nie je nastavená (alebo ak načítanie
neprejde ochranou proti SSRF / vráti chybnú odpoveď), použije sa vstavaný predvolený register.

Karta „Trhovisko“ na paneli poskytuje pole pre túto URL (spätne sa načíta z
`GET /api/settings`).

> Poznámka k implementácii: akcia „Uložiť“ na paneli odosiela
> `pluginMarketplaceUrl` do `PATCH /api/settings`. V čase písania tohto textu tento
> kľúč nie je deklarovaný v `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), preto pred tým, ako sa naň spoľahnete, overte jeho
> pretrvávanie vo svojom vydaní — cesta **čítania** (`getSettings()` →
> `listMarketplacePlugins()`) tento kľúč rešpektuje, keď sa už nachádza v úložisku
> nastavení.

## Bezpečnosť

### Iba slučka — úrovne trasy

Doplnky spúšťajú kód v vytvorených podriadených procesoch, takže celý povrch `/api/plugins` je klasifikovaný `LOCAL_ONLY` (Tier 1). Vynucovanie spätnej slučky prebieha bezpodmienečne** predtým** akúkoľvek kontrolu overenia, takže uniknutý token správy, ktorý sa dostane do krabice cez tunel, stále nemôže nainštalovať, aktivovať alebo odinštalovať doplnok. Pozrite si [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) a tvrdé pravidlá #15 / #17.

### Strážca registra SSRF na trhovisku

Vlastný register URL je konfigurácia ovplyvniteľná útočníkom, takže pred jeho načítaním ho `listMarketplacePlugins()` spustí cez dve vrstvy:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Odmietne všetko, čo nie je `http:` / `https:`.
   - Odmietne doslovných hostiteľov private/loopback/link-local/ULA (IPv4** a** IPv6 vrátane IPv4-mapped) prostredníctvom kanonického `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Vyrieši** oboje** `A` a `AAAA` zaznamenáva a odmieta ak** akékoľvek** vyriešená adresa je súkromná — čím sa zatvára verejný názov hostiteľa → premostenie súkromnej adresy IP.
   - **Zlyhanie zatvorené** : zlyhanie rozlíšenia DNS odmietne URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): znovu použije ochranu URL určenú len pre verejnosť v čase načítania a** blokuje presmerovania** (žiadny verejný → súkromný `30x` pivot).

URL ktorá zlyhá na niektorej z vrstiev, nezruší požiadavku — trh sa ticho vráti do vstavaného registra semien a zaznamená varovanie.

> Tento kryt bol zosilnený v PR #3774 špeciálne na rozlíšenie A + AAAA a použitie kanonického `isPrivateHost` namiesto kontroly IPv4-only.

### Izolácia spustenia pluginu

> **Doplnky nie sú v predvolenom nastavení v karanténe.** Dieťa je obyčajný proces Node.js ktorý beží ako používateľ OmniRoute, bez kontextu VM a bez príznakov povolenia Node.js, takže kód zásuvného modulu môže čítať a zapisovať akýkoľvek súbor, ktorý môže používateľ, spúšťať programy a dostať sa do siete. `requires.permissions` rozhoduje len o tom, ktoré premenné prostredia dieťa dostane; ostatné povolenia sa nevynucujú. Príznak aktivácie funkcie `PLUGIN_PERMISSION_MODEL_ENABLED` (štandardne vypnutý) spúšťa každý doplnok podľa modelu povolení Node.js zostaveného z týchto povolení, okrem `network`, ktoré Node.js nemôže obmedziť (pozri [`PLUGIN_SDK.md`](./PLUGIN_SDK.md#syst%C3%A9m-povolen%C3%AD) ). Inštalujte iba doplnky, ktorým dôverujete. Nižšie uvedená hranica procesu obsahuje zlyhania a zamrznutia; nie je to hranica bezpečnosti.

- **Procesná izolácia** — `loadPlugin()` (`src/lib/plugins/loader.ts`) vytvorí každý doplnok v samostatnom podradenom procese Node.js a komunikuje cez IPC. Hook hovory majú časový limit s eskaláciou `SIGTERM` → `SIGKILL`.
- **Env zoznam povolených** — dieťa dostane iba povolenú množinu premenných prostredia; širšia množina je udelená iba vtedy, keď manifest vyžaduje povolenie `env`.
- **Nainštalujte zdrojový obal** — `POST /api/plugins` číta iba z adresára zdrojov pluginov (pozri "Inštalácia z lokálnej cesty"): cesta je kanonizovaná pomocou `realpath`, musí zostať striktne v tomto adresári a zdrojový strom nesúci symbolický odkaz, ktorý z neho uniká, je odmietnutý skôr, ako sa čokoľvek skopíruje.
- **Obmedzenie cesty** — install/upgrade/uninstall tvrdí, že adresár pluginu a `manifest.main` sa vyriešia** v rámci** spravovaný koreň pluginu pred akoukoľvek kópiou alebo rekurzívnym odstránením (chráni pred narušenými cestami DB a prechodom `../` v `manifest.main`). Aktivácia vyrieši symbolické odkazy cez `realpath` a odmietne načítať vstupný bod, ktorý unikne z adresára pluginu.
- **Voliteľný kolík integrity** — manifest môže deklarovať pole `integrity` (formát `sha256-<base64>`, SRI ). Ak je prítomný, zavádzač overí hodnotu hash súboru záznamu v čase načítania a odmietne sa aktivovať v prípade nesúladu. Ide o voliteľnú detekciu manipulácie,** nie** bezpečnostná hranica: neobmedzuje to, čo dokáže načítaný doplnok.
- **Žiadne prihlasovacie údaje klienta v hákoch** — kontext odovzdaný do `onRequest`, `onResponse` a `onError` má odstránené hlavičky `authorization`, `x-api-key`, `proxy-authorization` a `cookie` a záznam kľúča API nenesie žiadnu kľúčovú hodnotu (`redactPluginContext()` v `src/lib/plugins/hooks.ts`).

## Manifest (`plugin.json`)

Overené `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Pole               | Typ                | Poznámky                                                        |
| ------------------ | ------------------ | --------------------------------------------------------------- |
| `name`             | reťazec            | Povinné; kufrík na kebab (`^[a-z0-9-]+$`), 1–100 znakov         |
| `version`          | reťazec            | Povinné; semver (`MAJOR.MINOR.PATCH`)                           |
| `description`      | reťazec?           | ≤ 500 znakov                                                    |
| `author`           | reťazec?           | ≤ 200 znakov                                                    |
| `license`          | reťazec?           | Predvolená hodnota je `MIT`                                     |
| `main`             | reťazec?           | Vstupný súbor; predvolená hodnota je `index.js`                 |
| `source`           | enum?              | `local` \| `marketplace` (predvolená hodnota je `local`)        |
| `tags`             | reťazec[]?         | Hľadať značky                                                   |
| `requires`         | objekt?            | `{ omniroute?, permissions[] }`                                 |
| `hooks`            | objekt?            | Booleans deklarujúce, ktoré háčiky implementuje doplnok         |
| `skills`           | objekt[]?          | Voliteľné definície zručností                                   |
| `enabledByDefault` | boolovská hodnota? | Automatická aktivácia pri inštalácii                            |
| `configSchema`     | objekt?            | Mapa konfiguračných polí (`string`/`number`/`boolean`/`select`) |
| `integrity`        | reťazec?           | Voliteľný kolík vstupného súboru `sha256-<base64>`              |

Povolenia sa získavajú z výčtu `network` / `file-read` / `file-write` / `env` / `exec`. Iba `env` má runtime efekt (trochu väčší zoznam povolených premenných prostredia pre dieťa); ostatné sú vyhlásenia a nevykonávajú sa.

## Tok životného cyklu

```
inštalácia (POST /api/plugins, cesta)
  → skenovanie/overenie manifestu → skopírovanie do dočasného adresára → kontrola, že hlavný súbor je v adresári
  → atómové premenovanie do ~/.omniroute/plugins/<name> → vloženie riadka do databázy
  → spustenie onInstall → ak enabledByDefault: aktivácia

aktivácia (POST /api/plugins/{name}/activate)
  → kontrola umiestnenia pomocou realpath → loadPlugin() (spustenie podriadeného procesu)
  → registrácia deklarovaných hookov → status = "active" → spustenie onActivate

deaktivácia (POST /api/plugins/{name}/deactivate)
  → spustenie onDeactivate (PRED zrušením registrácie) → zrušenie registrácie hookov
  → ukončenie podriadeného procesu → status = "inactive"

odinštalovanie (DELETE /api/plugins/{name})
  → deaktivácia, ak je aktívny → spustenie onUninstall
  → rekurzívne odstránenie adresára pluginu s kontrolou umiestnenia → odstránenie riadka z databázy
```

Opätovné spustenie `install` pre adresár, ktorého verzia v manifeste je **striktne
novšia** než nainštalovaná verzia, vykoná automatickú aktualizáciu (čistú reinštaláciu;
konfigurácia sa obnoví na predvolené hodnoty). Rovnaká alebo staršia verzia je odmietnutá.

## Databáza

Tabuľka `plugins` (migrácia `076_create_plugins.sql`):

| Stĺpec          | Typ     | Poznámky                                                          |
| --------------- | ------- | ----------------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                              |
| `name`          | TEXT    | Jedinečný                                                         |
| `version`       | TEXT    | semver; predvolená hodnota `1.0.0`                                |
| `description`   | TEXT    | Voliteľný                                                         |
| `author`        | TEXT    | Voliteľný                                                         |
| `license`       | TEXT    | Predvolená hodnota `MIT`                                          |
| `main`          | TEXT    | Vstupný súbor; predvolená hodnota `index.js`                      |
| `source`        | TEXT    | Predvolená hodnota `local`                                        |
| `tags`          | TEXT    | Pole JSON; predvolená hodnota `[]`                                |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`                  |
| `enabled`       | INT     | 0/1; predvolená hodnota 0                                         |
| `manifest`      | TEXT    | Úplný manifest JSON                                               |
| `config`        | TEXT    | JSON; predvolená hodnota `{}`                                     |
| `config_schema` | TEXT    | JSON; predvolená hodnota `{}`                                     |
| `hooks`         | TEXT    | Pole JSON s názvami deklarovaných hookov; predvolená hodnota `[]` |
| `permissions`   | TEXT    | Pole JSON; predvolená hodnota `[]`                                |
| `plugin_dir`    | TEXT    | Absolútny inštalačný adresár                                      |
| `error_message` | TEXT    | Nastaví sa, keď `status = "error"`                                |
| `installed_at`  | TEXT    | `datetime('now')`                                                 |
| `updated_at`    | TEXT    | `datetime('now')`                                                 |
| `activated_at`  | TEXT    | Nastaví sa pri aktivácii                                          |

Metriky a analytické údaje pluginov sa sledujú v ďalších tabuľkách
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dashboard

Stránka informačného panela na `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) obsahuje dve karty:

- **Nainštalované** — uvádza zoznam nainštalovaných doplnkov s ich deklarovanými háčikmi, prepínačom activate/deactivate, tlačidlom na odinštalovanie a akciou „Vyhľadať doplnky“ (`POST /api/plugins/scan`).
- **Trhovisko** — zobrazuje katalóg z `GET /api/plugins/marketplace` s poľom na nastavenie vlastného registra URL.

Stránka vždy zobrazuje varovanie, že doplnky bežia s plnými oprávneniami procesu OmniRoute.

Konfiguračná stránka pre jednotlivé doplnky žije na `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Pozri tiež

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  prečo je `/api/plugins` prístupné iba cez loopback (úroveň 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — súvisiaci framework zručností
  (`src/lib/skills/`); pluginy môžu deklarovať zručnosti vo svojom manifeste
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — odchádzajúce integrácie
  riadené udalosťami
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  vzor `buildErrorBody()`, ktorý používa každá trasa pluginu pre chybové odpovede
