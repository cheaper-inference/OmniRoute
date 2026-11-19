# Plugin Marketplace (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Autoritativ kilde:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` og
> `src/app/(dashboard)/dashboard/plugins/`
> **Sist oppdatert:** 2026-06-28 — v3.8.40

OmniRoute leveres med et programtilleggssystem i WordPress-stil. Programtillegg er selvstendige
kataloger — hver med et `plugin.json`-manifest og en inngangsfil — som kobler seg
til forespørselsflyten (`onRequest` / `onResponse` / `onError`) og til
livssyklushendelser (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Markedsplassen for programtillegg** er oppdagelseslaget oppå dette systemet. Den
tilbyr en katalog over programtillegg som kan installeres. Som standard er katalogen et
lite, innebygd startregister. En operatør kan konfigurere den til å bruke URL-en til et egendefinert
eksternt register. I så fall sikres hentingen av et DNS-oppløsende SSRF-vern
(se [Sikkerhet](#security)).

Alle ruter for programtillegg er **kun tilgjengelige via loopback** (nivå 1 — `LOCAL_ONLY`): Programtillegg laster inn
og kjører kode i underprosesser, så rutene er utilgjengelige fra en
opprinnelse som ikke er loopback, uavhengig av autentisering. Se
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Hvordan det passer Together

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

- **Registerlag** — `src/lib/plugins/marketplace.ts`: lister / søker i katalogen, og faller tilbake til frøregisteret ved eventuelle feil.
- **Livssykluslag** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): installer, oppgrader, aktiver, deaktiver, avinstaller, skann, oppstart last.
- **Manifest lag** — `src/lib/plugins/manifest.ts`: Zod -skjema + er standard for `plugin.json`.
- **Skanner** — `src/lib/plugins/scanner.ts`: oppdager plugins på disken under plugin-katalogen.
- **Laster** — `src/lib/plugins/loader.ts`: skaper hvert plugin i en separat Node.js underordnet prosess og meglere kobler opp samtaler over IPC. Barnet er ikke en sandkasse (se "Isolering av plugin-utførelse" nedenfor).

## Markedsplasskatalog

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) returnerer en liste med
`MarketplaceEntry`-objekter:

| Felt          | Type     | Merknader                                  |
| ------------- | -------- | ------------------------------------------ |
| `name`        | string   | Programtilleggsnavn i kebab-case           |
| `version`     | string   | semver                                     |
| `description` | string   | Kort sammendrag                            |
| `author`      | string   | Forfatter / organisasjon                   |
| `license`     | string   | Lisens-ID i SPDX-stil                      |
| `downloadUrl` | string   | URL for nedlasting av kilde (kan være tom) |
| `repository`  | string?  | Valgfri URL til kodelager                  |
| `tags`        | string[] | Tagger for søk/filtrering                  |
| `downloads`   | number   | Antall nedlastinger                        |
| `rating`      | number   | 0–5                                        |
| `verified`    | boolean  | Om oppføringen er merket som verifisert    |
| `lastUpdated` | string   | ISO-lignende datostreng                    |

Når ingen egendefinert register-URL er konfigurert, er katalogen den innebygde
`SEED_REGISTRY` (for øyeblikket `request-logger`, `rate-limiter`, `cost-tracker` og
`theme-manager`). Startregisteret er alltid tilgjengelig — hvis et konfigurert eksternt
register ikke kan nås, returnerer en annen status enn `200` eller returnerer et ukjent
innhold, logger `listMarketplacePlugins()` en advarsel og faller tilbake til startlisten.

> Merk: Markedsplassens **katalog** (bla gjennom/søk) er koblet opp fra ende til ende, men
> ettklikks-**installasjon** fra markedsplasskatalogen er ennå ikke implementert —
> «Installer»-knappen for en markedsplassoppføring i kontrollpanelet viser for øyeblikket et
> «kommer snart»-varsel. Installasjon utføres i dag gjennom installasjonsflyten fra en lokal bane
> (`POST /api/plugins`) og søk etter programtillegg på disken (`POST /api/plugins/scan`).

## REST API

Alle endepunkter krever administrasjonsgodkjenning (`requireManagementAuth`)** og** er loopback-bare — `/api/plugins` og `/api/plugins/` er oppført i `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endepunkt                        | Metode | Beskrivelse                                             |
| -------------------------------- | ------ | ------------------------------------------------------- |
| `/api/plugins`                   | GET    | Liste installerte plugins (valgfritt `?status=` filter) |
| `/api/plugins`                   | POST   | Installer en plugin fra plugin-kildekatalogen           |
| `/api/plugins/scan`              | POST   | Skann plugin-katalogen og registrer nye plugins         |
| `/api/plugins/marketplace`       | GET    | List markedsplasskatalogoppføringer                     |
| `/api/plugins/[name]`            | GET    | Få installert plugin-detaljer                           |
| `/api/plugins/[name]`            | DELETE | Avinstaller en plugin                                   |
| `/api/plugins/[name]/activate`   | POST   | Aktiver (last inn + registerkroker)                     |
| `/api/plugins/[name]/deactivate` | POST   | Deaktiver (fire `onDeactivate`, avregistrer kroker)     |
| `/api/plugins/[name]/config`     | GET    | Få plugin config + config skjema                        |
| `/api/plugins/[name]/config`     | PUT    | Oppdater plugin-konfigurasjon (validert mot skjema)     |

`GET /api/plugins` `status` filteret godtar en av `installed` / `active` / `inactive` / `error`. En ugyldig verdi returnerer `400`.

### Liste installerte plugins

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Installer fra en lokal bane

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` må være en** absolutt** banen til en katalog** inne i plugin-kildekatalogen** : `plugin-sources` ved siden av plugin-roten, så `~/.omniroute/plugin-sources/` som standard, eller `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` når den variabelen er satt (`getPluginSourcesDir()` in `src/lib/plugins/installSource.ts`). Kopier eller klon plugin-en der først. Installasjonen avvises med `400` når banen inneholder `..` eller en nullbyte, ligger utenfor den katalogen, løses utenfor den gjennom en symbolkobling, inneholder en symbolkobling hvis mål er utenfor den, eller når katalogen ikke eksisterer. Kildekatalogen må inneholde en gyldig `plugin.json` (eller være en forelder til en). Ved suksess er svaret `201` med den installerte plugin-raden.

I motsetning til de andre plugin-rutene, krever denne administrasjonslegitimasjonen (en dashbord-økt eller en API -nøkkel med administreringsomfang) selv når pålogging er deaktivert (`requireLogin=false`): å installere kode er aldri en anonym handling.

### Bla gjennom markedsplassen

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Oppdater plugin-konfigurasjonen

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` validerer hver oppgitt verdi mot pluginens `configSchema` (erklært i manifestet): `number` feltene respekterer `min`/`max`, `select` -feltene må samsvare med det deklarerte `enum`. Nøkler som ikke er til stede i skjemaet tillates gjennom.

## Konfigurasjon

### Programtilleggskatalog

Programtillegg ligger under OmniRoute-datakatalogen:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (eller det manifest.main peker til)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) finner denne katalogen i
tre trinn:

1. **`OMNIROUTE_PLUGINS_DIR`**, når den er angitt — brukes ordrett, uansett hva `HOME` sier. Dette er
   den eksplisitte innstillingen for Docker/K8s, der programtilleggstreet er bind-montert på en bane
   som vanligvis ikke har noe med containerens hjemmekatalog å gjøre (#11827).
2. `<home>/.omniroute/plugins`, der `<home>` kommer fra miljøvariablene `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, når prosessen ikke eksporterer noen hjemmekatalog i det hele tatt.

Den fastsatte katalogen logges én gang ved oppstart som `scanner.dir_resolved`, med navnet på
inndataverdien som vant (`OMNIROUTE_PLUGINS_DIR`, `home` eller `no-home-fallback`) — slik at et image
som uten varsel ender på trinn 3, opplyser om dette i stedet for bare å rapportere en tom programtilleggsliste.
`POST /api/plugins/scan` finner alle underkataloger der som inneholder en gyldig
`plugin.json`, og registrerer dem. Den samme katalogen er roten som
`pluginManager.install()` kopierer programtillegg til, slik at en overstyring flytter oppdagelse og
installasjon sammen.

> **`OMNIROUTE_PLUGINS_DIR` er ikke `OMNIROUTE_PLUGIN_PATH`.** Sistnevnte leses bare av
> CLI-lasteren for kommandoprogramtillegg (`bin/cli/plugins.mjs`) for å finne npm-pakker av typen `omniroute-cmd-*`
> som legger til `omniroute`-underkommandoer — den påvirker ikke kjøretidsskanneren
> som beskrives her. Se [PLUGINS.md](./PLUGINS.md) for denne delen.

### Egendefinert URL til markedsplassregisteret

Kilden til markedsplasskatalogen leses fra innstillingen `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` leser `settings.pluginMarketplaceUrl`). Når den
er satt til en `http(s)`-URL, henter `listMarketplacePlugins()` denne URL-en og godtar
enten en JSON-matrise med oppføringer på toppnivå eller et objekt med en `plugins`-matrise;
oppføringer uten en `name` av typen streng filtreres bort. Når den ikke er angitt (eller når hentingen
avvises av SSRF-vernet / returnerer en ugyldig respons), brukes det innebygde
startregisteret.

«Marketplace»-fanen i kontrollpanelet inneholder et felt for denne URL-en (leses tilbake fra
`GET /api/settings`).

> Implementasjonsmerknad: Handlingen «Save» i kontrollpanelet sender
> `pluginMarketplaceUrl` til `PATCH /api/settings`. I skrivende stund er denne
> nøkkelen ikke deklarert i `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), så kontroller at verdien vedvarer i din
> utgivelse før du baserer deg på den — **lesebanen** (`getSettings()` →
> `listMarketplacePlugins()`) respekterer nøkkelen når den først finnes i innstillingslageret.

## Sikkerhet

### Bare rute tier — loopback

Plugins kjører kode i skapte barneprosesser, slik at hele `/api/plugins` overflaten er klassifisert `LOCAL_ONLY` (Tier 1). Loopback-håndhevelse kjører ubetinget** før** enhver autentiseringssjekk, så et lekket administrasjonstoken som når boksen over en tunnel kan fortsatt ikke installere, aktivere eller avinstallere en plugin. Se [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) og harde regler #15 / #17.

### Marketplace register SSRF guard

Et tilpasset register URL er angriperpåvirkelig konfigurasjon, så før du henter det, kjører `listMarketplacePlugins()` det gjennom to lag:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Avviser alt som ikke er `http:` / `https:`.
   - Avviser bokstavelige private/loopback/link-local/ULA verter (IPv4** og** IPv6, inkludert IPv4-mapped) via den kanoniske `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Løser** både** `A` og `AAAA` registrerer og avviser if** noen** løst adresse er privat — lukker det offentlige vertsnavnet → private-IP-bypass.
   - **Mislykkes lukket** : en DNS -oppløsningsfeil avviser URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): bruker den offentlige-bare URL vakten på nytt ved henting og** blokkerer omdirigeringer** (ingen offentlig → privat `30x` pivot).

En URL som mislykkes i begge lagene avbryter ikke forespørselen — markedsplassen faller stille tilbake til det innebygde frøregisteret og logger en advarsel.

> Denne guarden ble herdet i PR #3774 spesielt for å løse A + AAAA og bruke den kanoniske `isPrivateHost` i stedet for en IPv4-only -sjekk.

### Isolering av plugin-utførelse

> **Plugins er ikke i sandkasse.** Barnet er en vanlig Node.js prosess som kjører som OmniRoute brukeren, uten VM kontekst og ingen Node.js tillatelsesflagg, så plugin-kode kan lese og skrive hvilken som helst fil som brukeren kan, kjøre programmer og nå nettverket. `requires.permissions` bestemmer bare hvilke miljøvariabler barnet mottar; de andre tillatelsene håndheves ikke. Installer kun plugins du stoler på. Prosessgrensen nedenfor inneholder krasj og henger; det er ikke en sikkerhetsgrense.

- **Prosessisolasjon** — `loadPlugin()` (`src/lib/plugins/loader.ts`) skaper hvert plugin i en separat Node.js underordnet prosess og kommuniserer over IPC. Hook-anrop har en tidsavbrudd med `SIGTERM` → `SIGKILL` eskalering.
- **Env tillatelsesliste** — barnet mottar bare et godkjent sett med miljøvariabler; det bredere settet gis bare når manifestet ber om `env` tillatelse.
- **Installer kildebegrensning** — `POST /api/plugins` leser kun fra plugin-kildekatalogen (se "Installer fra en lokal bane"): banen er kanonisert med `realpath`, må holde seg strengt inne i den katalogen, og et kildetre som har en symbolkobling som unnslipper den, blir avvist før noe kopieres.
- **Inneslutning av stien** — install/upgrade/uninstall hevder at plugin-katalogen og `manifest.main` løser seg** innenfor** den administrerte plugin-roten før kopiering eller rekursiv sletting (beskytter mot manipulerte DB -baner og `../` -kryssing i `manifest.main`). Aktivering løser symbolkoblinger via `realpath` og nekter å laste inn et inngangspunkt som unnslipper plugin-katalogen.
- **Valgfri integritetspinne** — et manifest kan erklære et `integrity` (`sha256-<base64>`, SRI format) felt. Når den er tilstede, verifiserer lasteren hash for oppføringsfilen ved lastetid og nekter å aktiveres ved mismatch. Det er opt-in sabotasjedeteksjon,** ikke** en sikkerhetsgrense: den begrenser ikke hva en lastet plugin kan gjøre.
- **Ingen klientlegitimasjon i kroker** — konteksten som sendes til `onRequest`, `onResponse` og `onError` har `authorization`, `x-api-key`, `proxy-authorization` og `cookie` -overskriftene fjernet, og API nøkkelposten har ingen nøkkelverdi (`redactPluginContext()` i `src/lib/plugins/hooks.ts`).

## Manifest (`plugin.json`)

Validert av `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Felt               | Type         | Notater                                                             |
| ------------------ | ------------ | ------------------------------------------------------------------- |
| `name`             | streng       | Påkrevd; kebab-etui (`^[a-z0-9-]+$`), 1–100 tegn                    |
| `version`          | streng       | Påkrevd; semver (`MAJOR.MINOR.PATCH`)                               |
| `description`      | streng?      | ≤ 500 tegn                                                          |
| `author`           | streng?      | ≤ 200 tegn                                                          |
| `license`          | streng?      | Standard er `MIT`                                                   |
| `main`             | streng?      | Oppføringsfil; standard til `index.js`                              |
| `source`           | enum?        | `local` \| `marketplace` (standard er `local`)                      |
| `tags`             | streng[]?    | Søk koder                                                           |
| `requires`         | gjenstand?   | `{ omniroute?, permissions[] }`                                     |
| `hooks`            | gjenstand?   | Boolere som erklærer hvilke kroker plugin-en implementerer          |
| `skills`           | gjenstand[]? | Valgfrie ferdighetsdefinisjoner                                     |
| `enabledByDefault` | boolsk?      | Automatisk aktivert ved installasjon                                |
| `configSchema`     | gjenstand?   | Kart over konfigurasjonsfelt (`string`/`number`/`boolean`/`select`) |
| `integrity`        | streng?      | Valgfri `sha256-<base64>` -oppføringsfil-pin                        |

Tillatelser er hentet fra enum `network` / `file-read` / `file-write` / `env` / `exec`. Bare `env` har en kjøretidseffekt (en litt større miljøvariabel godkjenningsliste for barnet); de andre er erklæringer og håndheves ikke.

## Livssyklusflyt

```
installer (POST /api/plugins, bane)
  → skann/valider manifest → kopier til staging → kontroller at main er i katalogen
  → atomisk navneendring til ~/.omniroute/plugins/<name> → sett inn rad i databasen
  → utløs onInstall → hvis enabledByDefault: aktiver

aktiver (POST /api/plugins/{name}/activate)
  → realpath-inneslutningskontroll → loadPlugin() (start underprosess)
  → registrer deklarerte hooks → status = "active" → utløs onActivate

deaktiver (POST /api/plugins/{name}/deactivate)
  → utløs onDeactivate (FØR avregistrering) → avregistrer hooks
  → avslutt underprosessen → status = "inactive"

avinstaller (DELETE /api/plugins/{name})
  → deaktiver hvis aktiv → utløs onUninstall
  → inneslutningskontrollert rekursiv sletting av plugin-katalogen → slett raden i databasen
```

Hvis `install` kjøres på nytt mot en katalog der manifestversjonen er **strengt
nyere** enn den installerte versjonen, utføres en automatisk oppgradering (ren
reinstallasjon; konfigurasjonen tilbakestilles til standardverdiene). En identisk
eller eldre versjon avvises.

## Database

Tabellen `plugins` (migrering `076_create_plugins.sql`):

| Kolonne         | Type    | Merknader                                                 |
| --------------- | ------- | --------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                      |
| `name`          | TEXT    | Unik                                                      |
| `version`       | TEXT    | semver; standardverdi `1.0.0`                             |
| `description`   | TEXT    | Valgfri                                                   |
| `author`        | TEXT    | Valgfri                                                   |
| `license`       | TEXT    | Standardverdi `MIT`                                       |
| `main`          | TEXT    | Startfil; standardverdi `index.js`                        |
| `source`        | TEXT    | Standardverdi `local`                                     |
| `tags`          | TEXT    | JSON-matrise; standardverdi `[]`                          |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`          |
| `enabled`       | INT     | 0/1; standardverdi 0                                      |
| `manifest`      | TEXT    | Fullstendig manifest-JSON                                 |
| `config`        | TEXT    | JSON; standardverdi `{}`                                  |
| `config_schema` | TEXT    | JSON; standardverdi `{}`                                  |
| `hooks`         | TEXT    | JSON-matrise med deklarerte hook-navn; standardverdi `[]` |
| `permissions`   | TEXT    | JSON-matrise; standardverdi `[]`                          |
| `plugin_dir`    | TEXT    | Absolutt installasjonskatalog                             |
| `error_message` | TEXT    | Angis når `status = "error"`                              |
| `installed_at`  | TEXT    | `datetime('now')`                                         |
| `updated_at`    | TEXT    | `datetime('now')`                                         |
| `activated_at`  | TEXT    | Angis ved aktivering                                      |

Plugin-metrikker og -analyse spores i flere tabeller
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dashbord

Dashboardsiden på `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) har to faner:

- **Installert** — viser installerte plugins med de deklarerte krokene, en activate/deactivate -veksler, en avinstalleringsknapp og en "Skann etter plugins"-handling (`POST /api/plugins/scan`).
- **Markedsplass** — viser katalogen fra `GET /api/plugins/marketplace` med et felt for å angi det tilpassede registeret URL.

Siden viser alltid en advarsel om at plugins kjører med alle rettighetene til OmniRoute prosessen.

En konfigurasjonsside per plugin lever på `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Se også

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  hvorfor `/api/plugins` bare er tilgjengelig via loopback (nivå 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — det tilknyttede rammeverket for ferdigheter
  (`src/lib/skills/`); programtillegg kan deklarere ferdigheter i manifestet sitt
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — hendelsesdrevne utgående
  integrasjoner
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  `buildErrorBody()`-mønsteret som alle rutene til programtillegg bruker for feilresponser
