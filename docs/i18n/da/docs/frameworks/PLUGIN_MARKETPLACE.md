# Plugin Marketplace (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Sandhedskilde:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` og
> `src/app/(dashboard)/dashboard/plugins/`
> **Senest opdateret:** 2026-06-28 — v3.8.40

OmniRoute leveres med et WordPress-lignende pluginsystem. Plugins er selvstændige
mapper — hver med et `plugin.json`-manifest og en startfil — som kobler sig på
forespørgselspipelinen (`onRequest` / `onResponse` / `onError`) og
livscyklushændelser (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Pluginmarkedspladsen** er registreringslaget oven på dette system. Den
giver adgang til et katalog over plugins, der kan installeres. Som standard er
kataloget et lille, indbygget basisregister. En operatør kan konfigurere en URL
til et brugerdefineret fjernregister, og i så fald sikres hentningen af en
DNS-resolverende SSRF-beskyttelse (se [Sikkerhed](#security)).

Alle pluginruter er **begrænset til loopback** (niveau 1 — `LOCAL_ONLY`): Plugins
indlæser og afvikler kode i underprocesser, så ruterne er utilgængelige fra en
oprindelse uden for loopback, uanset godkendelse. Se
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Sådan passer det Together

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

- **Registreringslag** — `src/lib/plugins/marketplace.ts`: lister / søger i kataloget og falder tilbage til frøregistret ved enhver fejl.
- **Livscyklus lag** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): installere, opgradere, aktivere, deaktivere, afinstallere, scanne, starte opstart.
- **Manifest lag** — `src/lib/plugins/manifest.ts`: Zod skema + standarder for `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: opdager plugins på disken under plugin-mappen.
- **Loader** — `src/lib/plugins/loader.ts`: afføder hvert plugin i en separat Node.js underordnet proces og mæglere tilslutter opkald over IPC. Barnet er ikke en sandkasse (se "Isolering af plugin-udførelse" nedenfor).

## Markedspladskatalog

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) returnerer en liste
over `MarketplaceEntry`-objekter:

| Felt          | Type     | Bemærkninger                                 |
| ------------- | -------- | -------------------------------------------- |
| `name`        | string   | Pluginnavn i kebab-case                      |
| `version`     | string   | semver                                       |
| `description` | string   | Kort beskrivelse                             |
| `author`      | string   | Forfatter/organisation                       |
| `license`     | string   | Licens-id i SPDX-stil                        |
| `downloadUrl` | string   | URL til download af kildekode (kan være tom) |
| `repository`  | string?  | Valgfri URL til repository                   |
| `tags`        | string[] | Tags til søgning/filtrering                  |
| `downloads`   | number   | Antal downloads                              |
| `rating`      | number   | 0–5                                          |
| `verified`    | boolean  | Om posten er markeret som verificeret        |
| `lastUpdated` | string   | ISO-lignende datostreng                      |

Når der ikke er konfigureret en URL til et brugerdefineret register, er kataloget
det indbyggede `SEED_REGISTRY` (i øjeblikket `request-logger`, `rate-limiter`,
`cost-tracker` og `theme-manager`). Basisregistret er altid tilgængeligt — hvis
et konfigureret fjernregister ikke kan nås, returnerer en status, der ikke er
`200`, eller returnerer et ukendt indhold, logger `listMarketplacePlugins()` en
advarsel og falder tilbage til basislisten.

> Bemærk: Markedspladsens **katalog** (gennemse/søge) er fuldt integreret, men
> installation med ét klik fra markedspladsens **katalog** er endnu ikke
> implementeret — kontrolpanelets knap "Installer" på en markedspladspost viser
> i øjeblikket en meddelelse om, at funktionen "kommer snart". Installation
> foregår i dag via installation fra en lokal sti (`POST /api/plugins`) og
> registrering på disken (`POST /api/plugins/scan`).

## REST API

Alle slutpunkter kræver administrationsgodkendelse (`requireManagementAuth`)** og** er loopback-only — `/api/plugins` og `/api/plugins/` er angivet i `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Slutpunkt                          | Metode | Beskrivelse                                                  |
| ---------------------------------- | ------ | ------------------------------------------------------------ |
| `/api/plugins`                     | GET    | Liste over installerede plugins (valgfrit `?status=` filter) |
| `/api/plugins`                     | POST   | Installer et plugin fra plugin-kildebiblioteket              |
| `/api/plugins/scan`                | POST   | Scan plugin-biblioteket og registrer nye plugins             |
| `/api/plugins/marketplace`         | GET    | Liste markedspladskatalogposter                              |
| `/api/plugins/marketplace/install` | POST   | Installer et markedsplads-plugin efter navn                  |
| `/api/plugins/[name]`              | GET    | Få installeret plugin detaljer                               |
| `/api/plugins/[name]`              | DELETE | Afinstaller et plugin                                        |
| `/api/plugins/[name]/activate`     | POST   | Aktiver (indlæs + registerkroge)                             |
| `/api/plugins/[name]/deactivate`   | POST   | Deaktiver (fire `onDeactivate`, afregistrer kroge)           |
| `/api/plugins/[name]/config`       | GET    | Hent plugin config + config skema                            |
| `/api/plugins/[name]/config`       | PUT    | Opdater plugin-konfiguration (valideret mod skema)           |

`GET /api/plugins` `status` filteret accepterer en af `installed` / `active` / `inactive` / `error`. En ugyldig værdi returnerer `400`.

### Liste over installerede plugins

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Installer fra en lokal sti

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` skal være en** absolut** stien til en mappe** inde i plugin-kildebiblioteket** : `plugin-sources` ved siden af plugin-roden, så `~/.omniroute/plugin-sources/` som standard, eller `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` når den variabel er indstillet (`getPluginSourcesDir()` i `src/lib/plugins/installSource.ts`). Kopier eller klon plugin'et der først. Installationen afvises med `400`, når stien indeholder `..` eller en null-byte, ligger uden for den mappe, løses uden for den gennem et symlink, indeholder et symlink, hvis mål er uden for det, eller når biblioteket ikke eksisterer. Kildemappen skal indeholde en gyldig `plugin.json` (eller være forælder til en). Ved succes er svaret `201` med den installerede plugin-række.

I modsætning til de andre plugin-ruter kræver denne administrationslegitimationsoplysninger (en dashboard-session eller en API -nøgle med administrationsomfang), selv når login er deaktiveret (`requireLogin=false`): installation af kode er aldrig en anonym handling. Det samme gælder for `POST /api/plugins/marketplace/install` (body `{ "name": "<plugin>" }`).

### Gennemse markedspladsen

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Opdater plugin-konfiguration

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` validerer kroppen mod plugin's `configSchema` (erklæret i manifestet) med `validatePluginConfig()` fra `src/lib/plugins/manifest.ts`: hver nøgle skal deklareres i skemaet, værdier skal matche den deklarerede type, `number` -felter respekterer `min`/`max`, og `select` felter skal matche den erklærede `enum`. Enhver overtrædelse returnerer `400` og intet er gemt. Et plugin, der erklærer ingen `configSchema` har ingen konfigurerbare nøgler, så anmodningen afvises med `400` ("Plugin erklærer ikke nogen konfigurerbare nøgler").

## Konfiguration

### Pluginmappe

Plugins findes under OmniRoutes datamappe:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (eller det, som manifest.main peger på)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) finder denne mappe i
tre trin:

1. **`OMNIROUTE_PLUGINS_DIR`**, når den er angivet — bruges ordret, uanset hvad `HOME` siger. Dette er
   den eksplicitte indstilling for Docker/K8s, hvor plugintræet bind-monteres på en sti,
   der normalt ikke har noget med containerens hjemmemappe at gøre (#11827).
2. `<home>/.omniroute/plugins`, hvor `<home>` kommer fra miljøvariablerne `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, når processen slet ikke eksporterer nogen hjemmemappe.

Den fundne mappe logges én gang ved opstart som `scanner.dir_resolved` med navnet på det
input, der blev valgt (`OMNIROUTE_PLUGINS_DIR`, `home` eller `no-home-fallback`) — så et image,
der ubemærket ender på trin 3, oplyser dette i stedet for blot at rapportere en tom pluginliste.
`POST /api/plugins/scan` finder enhver undermappe dér, som indeholder en gyldig
`plugin.json`, og registrerer den. Den samme mappe er den rodmappe, som
`pluginManager.install()` kopierer plugins til, så en tilsidesættelse flytter registrering og
installation samlet.

> **`OMNIROUTE_PLUGINS_DIR` er ikke `OMNIROUTE_PLUGIN_PATH`.** Sidstnævnte læses kun af
> CLI'ens command-plugin-indlæser (`bin/cli/plugins.mjs`) for at finde `omniroute-cmd-*`-npm-
> pakker, der tilføjer `omniroute`-underkommandoer — den påvirker ikke runtime-scanneren,
> der er beskrevet her. Se [PLUGINS.md](./PLUGINS.md) for den del.

### Brugerdefineret URL til markedspladsregister

Kilden til markedspladskataloget læses fra indstillingen `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` læser `settings.pluginMarketplaceUrl`). Når den
er angivet til en `http(s)`-URL, henter `listMarketplacePlugins()` denne URL og accepterer
enten et JSON-array af poster på øverste niveau eller et objekt med et `plugins`-array.
Poster uden en `name` af typen string filtreres fra. Når den ikke er angivet (eller når hentningen
afvises af SSRF-beskyttelsen / returnerer et ugyldigt svar), bruges det indbyggede
startregister.

Dashboardets fane "Markedsplads" indeholder et felt til denne URL (læses tilbage fra
`GET /api/settings`).

> Implementeringsbemærkning: Dashboardets handling "Gem" sender
> `pluginMarketplaceUrl` til `PATCH /api/settings`. I skrivende stund er denne
> nøgle ikke erklæret i `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), så kontrollér persistens i din
> udgivelse, før du er afhængig af den — **læse**stien (`getSettings()` →
> `listMarketplacePlugins()`) respekterer nøglen, når den først findes i
> indstillingslageret.

## Sikkerhed

### Rute tier — loopback kun

Plugins udfører kode i affødte underordnede processer, så hele `/api/plugins` overfladen er klassificeret `LOCAL_ONLY` (Tier 1). Loopback-håndhævelse kører ubetinget** før** enhver godkendelseskontrol, så et lækket administrationstoken, der når boksen over en tunnel, kan stadig ikke installere, aktivere eller afinstallere et plugin. Se [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) og hårde regler #15 / #17.

### Markedsplads registry SSRF guard

En brugerdefineret registreringsdatabase URL er en konfiguration, der kan påvirkes af angribere, så før den hentes, kører `listMarketplacePlugins()` den gennem to lag:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Afviser alt, der ikke er `http:` / `https:`.
   - Afviser bogstavelige private/loopback/link-local/ULA værter (IPv4** og** IPv6, inklusive IPv4-mapped) via den kanoniske `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Løser** begge** `A` og `AAAA` optager og afviser if** enhver** løst adresse er privat — lukker det offentlige værtsnavn → private-IP bypass.
   - **Mislykkes lukket** : en DNS -opløsningsfejl afviser URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): genbruger den offentlige-kun URL vagt på hentetidspunkt og** blokerer omdirigeringer** (ingen offentlig → privat `30x` pivot).

En URL, der fejler et af lagene, afbryder ikke anmodningen — markedspladsen falder lydløst tilbage til det indbyggede seed-register og logger en advarsel.

> Denne vagt blev hærdet i PR #3774 specifikt for at løse A + AAAA og bruge den kanoniske `isPrivateHost` i stedet for en IPv4-only check.

### Isolering af plugin-udførelse

> **Plugins er ikke sandboxed som standard.** Barnet er en almindelig Node.js proces, der kører som OmniRoute brugeren, uden VM kontekst og ingen Node.js tilladelsesflag, så plugin-kode kan læse og skrive enhver fil, som brugeren kan, køre programmer og nå netværket. `requires.permissions` bestemmer kun hvilke miljøvariabler barnet modtager; de andre tilladelser håndhæves ikke. Opt-in `PLUGIN_PERMISSION_MODEL_ENABLED` -funktionsflaget (fra som standard) kører hvert plugin under Node.js -tilladelsesmodellen bygget ud fra disse tilladelser, undtagen `network`, som Node.js ikke kan begrænse (se [`PLUGIN_SDK.md`](./PLUGIN_SDK.md#permission-system) ). Installer kun plugins, du har tillid til. Procesgrænsen nedenfor indeholder nedbrud og hænger; det er ikke en sikkerhedsgrænse.

- **Proces isolation** — `loadPlugin()` (`src/lib/plugins/loader.ts`) afføder hvert plugin i en separat Node.js underordnet proces og kommunikerer over IPC. Hook-opkald har en timeout med `SIGTERM` → `SIGKILL` eskalering.
- **Env tilladelsesliste** — barnet modtager kun et godkendt sæt af miljøvariabler; det bredere sæt gives kun, når manifestet anmoder om `env` tilladelsen.
- **Installer kildeindeslutning** — `POST /api/plugins` læser kun fra plugin-kildebiblioteket (se "Installer fra en lokal sti"): stien kanoniseres med `realpath`, skal forblive strengt inde i den mappe, og et kildetræ med et symbolsk link, der undslipper det, afvises før noget kopieres.
- **Indeslutning af stien** — install/upgrade/uninstall hævder, at plugin-mappen og `manifest.main` løser sig** inden for** det administrerede plugin-rod før enhver kopi eller rekursiv sletning (beskytter mod manipulerede DB -stier og `../` -gennemgang i `manifest.main`). Aktivering løser symbollinks via `realpath` og nægter at indlæse et indgangspunkt, der undslipper plugin-mappen.
- **Valgfri integritetsstift** — et manifest kan erklære et `integrity` (`sha256-<base64>`, SRI format) felt. Når den er til stede, verificerer loaderen indgangsfilens hash ved indlæsningstidspunktet og nægter at aktivere ved mismatch. Det er opt-in sabotage-detektion,** ikke** en sikkerhedsgrænse: det begrænser ikke, hvad et indlæst plugin kan gøre.
- **Ingen klientoplysninger i kroge** — konteksten sendt til `onRequest`, `onResponse` og `onError` har `authorization`, `x-api-key`, `proxy-authorization` og `cookie` overskrifterne fjernet, og API -nøgleposten har ingen nøgleværdi (`redactPluginContext()` i `src/lib/plugins/hooks.ts`).

## Manifest (`plugin.json`)

Valideret af `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Felt               | Type      | Noter                                                                 |
| ------------------ | --------- | --------------------------------------------------------------------- |
| `name`             | snor      | Påkrævet; kebab-etui (`^[a-z0-9-]+$`), 1-100 tegn                     |
| `version`          | snor      | Påkrævet; semver (`MAJOR.MINOR.PATCH`)                                |
| `description`      | snor?     | ≤ 500 tegn                                                            |
| `author`           | snor?     | ≤ 200 tegn                                                            |
| `license`          | snor?     | Standard er `MIT`                                                     |
| `main`             | snor?     | Indtastningsfil; standard til `index.js`                              |
| `source`           | enum?     | `local` \| `marketplace` (standard til `local`)                       |
| `tags`             | snor[]?   | Søg tags                                                              |
| `requires`         | objekt?   | `{ omniroute?, permissions[] }`                                       |
| `hooks`            | objekt?   | Booleans erklærer, hvilke kroge plugin'et implementerer               |
| `skills`           | objekt[]? | Valgfri færdighedsdefinitioner                                        |
| `enabledByDefault` | boolesk?  | Automatisk aktivering ved installation                                |
| `configSchema`     | objekt?   | Kort over konfigurationsfelter (`string`/`number`/`boolean`/`select`) |
| `integrity`        | snor?     | Valgfri `sha256-<base64>` entry-fil pin                               |

Tilladelser er hentet fra enum `network` / `file-read` / `file-write` / `env` / `exec`. Kun `env` har en runtime-effekt (en lidt større miljøvariabel tilladelsesliste for barnet); de andre er erklæringer og håndhæves ikke.

## Livscyklusflow

```
install (POST /api/plugins, sti)
  → scan/valider manifest → kopiér til staging → kontrollér, at main er inden for mappen
  → atomisk omdøbning til ~/.omniroute/plugins/<name> → indsæt DB-række
  → udløs onInstall → hvis enabledByDefault: aktivér

activate (POST /api/plugins/{name}/activate)
  → realpath-indeslutningskontrol → loadPlugin() (start underproces)
  → registrér deklarerede hooks → status = "active" → udløs onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → udløs onDeactivate (FØR afregistrering) → afregistrér hooks
  → afslut underproces → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deaktivér, hvis aktiv → udløs onUninstall
  → indeslutningskontrolleret rekursiv sletning af plugin-mappen → slet DB-række
```

Hvis `install` køres igen mod en mappe, hvis manifestversion er **strengt
nyere** end den installerede version, opgraderes der automatisk (ren geninstallation; konfigurationen nulstilles
til standardværdierne). En identisk eller ældre version afvises.

## Database

Tabellen `plugins` (migrering `076_create_plugins.sql`):

| Kolonne         | Type    | Bemærkninger                                              |
| --------------- | ------- | --------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                      |
| `name`          | TEXT    | Unik                                                      |
| `version`       | TEXT    | semver; standardværdi `1.0.0`                             |
| `description`   | TEXT    | Valgfri                                                   |
| `author`        | TEXT    | Valgfri                                                   |
| `license`       | TEXT    | Standardværdi `MIT`                                       |
| `main`          | TEXT    | Startfil; standardværdi `index.js`                        |
| `source`        | TEXT    | Standardværdi `local`                                     |
| `tags`          | TEXT    | JSON-array; standardværdi `[]`                            |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`          |
| `enabled`       | INT     | 0/1; standardværdi 0                                      |
| `manifest`      | TEXT    | Fuldt manifest i JSON-format                              |
| `config`        | TEXT    | JSON; standardværdi `{}`                                  |
| `config_schema` | TEXT    | JSON; standardværdi `{}`                                  |
| `hooks`         | TEXT    | JSON-array med deklarerede hook-navne; standardværdi `[]` |
| `permissions`   | TEXT    | JSON-array; standardværdi `[]`                            |
| `plugin_dir`    | TEXT    | Absolut installationsmappe                                |
| `error_message` | TEXT    | Angives, når `status = "error"`                           |
| `installed_at`  | TEXT    | `datetime('now')`                                         |
| `updated_at`    | TEXT    | `datetime('now')`                                         |
| `activated_at`  | TEXT    | Angives ved aktivering                                    |

Plugin-metrikker og -analyser spores i yderligere tabeller
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dashboard

Dashboardsiden på `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) indeholder to faner:

- **Installeret** — lister installerede plugins med deres erklærede hooks, en activate/deactivate -skift, en afinstallationsknap og en "Scan efter plugins"-handling (`POST /api/plugins/scan`).
- **Markedsplads** — viser kataloget fra `GET /api/plugins/marketplace` med et felt til at indstille den brugerdefinerede registreringsdatabasen URL.

Siden viser altid en advarsel om, at plugins kører med de fulde privilegier fra OmniRoute processen.

En per-plugin-konfigurationsside lever på `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Se også

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  hvorfor `/api/plugins` kun er tilgængelig via loopback (niveau 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — det relaterede framework for færdigheder
  (`src/lib/skills/`); plugins kan deklarere færdigheder i deres manifest
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — hændelsesdrevne udgående
  integrationer
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  det `buildErrorBody()`-mønster, som hver pluginrute bruger til fejlsvar
