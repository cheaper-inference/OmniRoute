# Plugin Marketplace (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Patiesais avots:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` un
> `src/app/(dashboard)/dashboard/plugins/`
> **Pēdējoreiz atjaunināts:** 2026-06-28 — v3.8.40

OmniRoute ietver WordPress stila spraudņu sistēmu. Spraudņi ir pašpietiekami
direktoriji — katram ir `plugin.json` manifests un ieejas fails —, kas pieslēdzas
pieprasījumu apstrādes konveijeram (`onRequest` / `onResponse` / `onError`) un
dzīves cikla notikumiem (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Spraudņu tirgus** ir uz šīs sistēmas balstīts atklāšanas slānis. Tas
nodrošina pārlūkojamu instalējamo spraudņu katalogu. Pēc noklusējuma katalogs ir
neliels iebūvēts sākotnējais reģistrs; operators var norādīt pielāgota attālā
reģistra URL, un šādā gadījumā ielāde tiek aizsargāta ar DNS atrisinošu SSRF
aizsardzību (skatiet sadaļu [Drošība](#security)).

Katrs spraudņu maršruts ir **pieejams tikai no atgriezeniskās cilpas**
(1. līmenis — `LOCAL_ONLY`): spraudņi ielādē un izpilda kodu pakārtotajos
procesos, tāpēc maršruti nav sasniedzami no avota, kas nav atgriezeniskās cilpas
avots, neatkarīgi no autentifikācijas. Skatiet
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Kā tas der Together

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

- **Reģistra slānis** — `src/lib/plugins/marketplace.ts`: uzskaita/meklē katalogu, atgriežoties sēklu reģistrā, ja rodas kāda kļūme.
- **Dzīves cikla slānis** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): instalēšana, jaunināšana, aktivizēšana, deaktivizēšana, atinstalēšana, skenēšana, startēšanas ielāde.
- **Manifests slānis** — `src/lib/plugins/manifest.ts`: Zod shēma + noklusējuma iestatījumi priekš `plugin.json`.
- **Skeneris** — `src/lib/plugins/scanner.ts`: atklāj spraudņus diskā spraudņu direktorijā.
- **Iekrāvējs** — `src/lib/plugins/loader.ts`: izveido katru spraudni atsevišķā Node.js pakārtotā procesā un starpnieki piesaista zvanus, izmantojot IPC. Bērns nav smilšu kaste (skatiet tālāk sadaļu "Spraudņa izpildes izolācija").

## Tirgus katalogs

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) atgriež
`MarketplaceEntry` objektu sarakstu:

| Lauks         | Tips     | Piezīmes                               |
| ------------- | -------- | -------------------------------------- |
| `name`        | string   | Spraudņa nosaukums kebab-case formātā  |
| `version`     | string   | semver                                 |
| `description` | string   | Īss kopsavilkums                       |
| `author`      | string   | Autors / organizācija                  |
| `license`     | string   | SPDX stila licences identifikators     |
| `downloadUrl` | string   | Avota lejupielādes URL (var būt tukšs) |
| `repository`  | string?  | Neobligāts repozitorija URL            |
| `tags`        | string[] | Meklēšanas/filtrēšanas birkas          |
| `downloads`   | number   | Lejupielāžu skaits                     |
| `rating`      | number   | 0–5                                    |
| `verified`    | boolean  | Vai ieraksts ir atzīmēts kā verificēts |
| `lastUpdated` | string   | ISO tipa datuma virkne                 |

Ja nav konfigurēts pielāgota reģistra URL, katalogs izmanto iebūvēto
`SEED_REGISTRY` (pašlaik `request-logger`, `rate-limiter`, `cost-tracker` un
`theme-manager`). Sākotnējais reģistrs ir pieejams vienmēr — ja konfigurētais
attālais reģistrs nav sasniedzams, atgriež statusu, kas nav `200`, vai atgriež
neatpazītu saturu, `listMarketplacePlugins()` reģistrē brīdinājumu un izmanto
sākotnējo sarakstu.

> Piezīme: tirgus **katalogs** (pārlūkošana/meklēšana) ir pilnībā integrēts, taču
> tirgus **instalēšana** ar vienu klikšķi no kataloga vēl nav ieviesta —
> informācijas paneļa poga "Instalēt" tirgus ierakstā pašlaik parāda paziņojumu
> "drīzumā". Pašlaik instalēšana notiek, izmantojot instalēšanas plūsmu no lokāla
> ceļa (`POST /api/plugins`) un atrašanu diskā (`POST /api/plugins/scan`).

## REST API

Visiem galapunktiem ir nepieciešama pārvaldības autentifikācija (`requireManagementAuth`)** un** ir tikai atgriezeniskās saites — `/api/plugins` un `/api/plugins/` ir norādīti `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Galapunkts                       | Metode | Apraksts                                                          |
| -------------------------------- | ------ | ----------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Uzskaitiet instalētos spraudņus (izvēles `?status=` filtrs)       |
| `/api/plugins`                   | POST   | Instalējiet spraudni no spraudņa avotu direktorijas               |
| `/api/plugins/scan`              | POST   | Skenējiet spraudņu direktoriju un reģistrējiet jaunus spraudņus   |
| `/api/plugins/marketplace`       | GET    | Uzskaitiet tirgus laukuma kataloga ierakstus                      |
| `/api/plugins/[name]`            | GET    | Iegūstiet informāciju par instalēto spraudni                      |
| `/api/plugins/[name]`            | DELETE | Atinstalējiet spraudni                                            |
| `/api/plugins/[name]/activate`   | POST   | Aktivizēt (ielādēt + reģistra āķus)                               |
| `/api/plugins/[name]/deactivate` | POST   | Deaktivizēt (aizdedzināt `onDeactivate`, atcelt āķu reģistrāciju) |
| `/api/plugins/[name]/config`     | GET    | Iegūt spraudņa konfigurācijas + konfigurācijas shēmu              |
| `/api/plugins/[name]/config`     | PUT    | Atjaunināt spraudņa konfigurāciju (validēta saskaņā ar shēmu)     |

Filtrs `GET /api/plugins` `status` pieņem vienu no `installed` / `active` / `inactive` / `error`. Nederīga vērtība atgriež `400`.

### Uzskaitiet instalētos spraudņus

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Instalējiet no vietējā ceļa

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` ir jābūt an** absolūts** ceļš uz direktoriju** spraudņa avotu direktorijā** : `plugin-sources` blakus spraudņa saknei, tātad `~/.omniroute/plugin-sources/` pēc noklusējuma vai `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/`, ja šis mainīgais ir iestatīts (`getPluginSourcesDir()` in `src/lib/plugins/installSource.ts`). Vispirms nokopējiet vai klonējiet spraudni tur. Instalēšana tiek atteikta ar `400` ja ceļš satur `..` vai nulles baitu, atrodas ārpus šī direktorija, tiek atrisināts ārpus tā, izmantojot simbolisko saiti, satur simbolu saiti, kuras mērķis atrodas ārpus tā, vai ja direktorija neeksistē. Avota direktorijā ir jābūt derīgam `plugin.json` (vai jābūt tā vecākam). Ja tas ir izdevies, atbilde ir `201` ar instalēto spraudņa rindu.

Atšķirībā no citiem spraudņu maršrutiem, šim ir nepieciešami pārvaldības akreditācijas dati (informācijas paneļa sesija vai pārvaldības tvēruma API atslēga) pat tad, ja pieteikšanās ir atspējota (`requireLogin=false`): koda instalēšana nekad nav anonīma darbība.

### Pārlūkojiet tirgu

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Atjaunināt spraudņa konfigurāciju

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` pārbauda katru norādīto vērtību, salīdzinot ar spraudņa `configSchema` (norādīts manifestā): `number` lauki ievēro `min`/`max`, `select` laukiem ir jāatbilst deklarētajam `enum`. Atslēgas, kas nav iekļautas shēmā, ir atļautas.

## Konfigurācija

### Spraudņu direktorijs

Spraudņi atrodas OmniRoute datu direktorijā:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (vai jebkurš fails, uz kuru norāda manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) nosaka šo direktoriju
trīs soļos:

1. **`OMNIROUTE_PLUGINS_DIR`**, ja tas ir iestatīts — tiek izmantots burtiski neatkarīgi no `HOME` vērtības. Šī ir
   tiešā vadības opcija Docker/K8s videi, kur spraudņu koks ir piesaistīts ceļam,
   kam parasti nav nekāda sakara ar konteinera mājas direktoriju (#11827).
2. `<home>/.omniroute/plugins`, kur `<home>` tiek iegūts no `HOME` / `USERPROFILE`
   vides mainīgajiem.
3. `/tmp/.omniroute/plugins`, ja process vispār neeksportē mājas direktoriju.

Noteiktais direktorijs tiek vienreiz reģistrēts žurnālā palaišanas laikā kā `scanner.dir_resolved`, norādot
izvēlēto ievadi (`OMNIROUTE_PLUGINS_DIR`, `home` vai `no-home-fallback`) — tādējādi attēls,
kas nemanāmi nonāk līdz 3. solim, par to paziņo, nevis tikai ziņo par tukšu spraudņu sarakstu.
`POST /api/plugins/scan` atrod jebkuru apakšdirektoriju, kurā ir derīgs
`plugin.json`, un to reģistrē; šis pats direktorijs ir saknes direktorijs, kurā
`pluginManager.install()` kopē spraudņus, tāpēc pārrakstīšana kopā pārvieto gan atklāšanu, gan
instalēšanu.

> **`OMNIROUTE_PLUGINS_DIR` nav `OMNIROUTE_PLUGIN_PATH`.** Pēdējo nolasa tikai
> CLI komandu spraudņu ielādētājs (`bin/cli/plugins.mjs`), lai atrastu `omniroute-cmd-*` npm
> pakotnes, kas pievieno `omniroute` apakškomandas — tas neietekmē šeit aprakstīto izpildlaika skeneri.
> Informāciju par šo daļu skatiet dokumentā [PLUGINS.md](./PLUGINS.md).

### Pielāgots tirgus reģistra URL

Tirgus kataloga avots tiek nolasīts no iestatījuma `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` nolasa `settings.pluginMarketplaceUrl`). Ja tam ir
iestatīts `http(s)` URL, `listMarketplacePlugins()` izgūst šo URL un pieņem
vai nu augstākā līmeņa JSON ierakstu masīvu, vai objektu ar `plugins` masīvu;
ieraksti bez virknes tipa `name` tiek izfiltrēti. Ja vērtība nav iestatīta (vai ja pieprasījumu
noraida SSRF aizsardzība / tiek saņemta nederīga atbilde), tiek izmantots iebūvētais sākotnējais reģistrs.

Informācijas paneļa cilnē "Tirgus" ir pieejams šī URL lauks (tas tiek nolasīts no
`GET /api/settings`).

> Ieviešanas piezīme: informācijas paneļa darbība "Saglabāt" nosūta
> `pluginMarketplaceUrl` uz `PATCH /api/settings`. Šī teksta rakstīšanas brīdī šī
> atslēga nav deklarēta shēmā `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), tāpēc pirms paļaušanās uz to pārbaudiet datu saglabāšanu savā
> laidienā — **lasīšanas** ceļš (`getSettings()` →
> `listMarketplacePlugins()`) ņem vērā šo atslēgu, tiklīdz tā ir pieejama iestatījumu
> krātuvē.

## Drošība

### Tikai maršruta līmeņa — loopback

Spraudņi izpilda kodu radītajos bērnu procesos, tāpēc visa `/api/plugins` virsma tiek klasificēta kā `LOCAL_ONLY` (1. līmenis). Cilpas izpilde darbojas bez nosacījumiem** pirms tam** jebkāda autentifikācijas pārbaude, tāpēc noplūdis pārvaldības marķieris, kas sasniedz lodziņu pa tuneli, joprojām nevar instalēt, aktivizēt vai atinstalēt spraudni. Skatiet [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) un cietos noteikumus #15 / #17.

### Tirgus reģistra SSRF aizsargs

Pielāgota reģistra URL konfigurācija ir uzbrucēju ietekmējama, tāpēc pirms tā iegūšanas `listMarketplacePlugins()` palaiž to cauri diviem slāņiem:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Noraida visu, kas nav `http:` / `https:`.
   - Noraida burtiskus private/loopback/link-local/ULA saimniekus (IPv4** un** IPv6, ieskaitot IPv4-mapped), izmantojot kanonisko `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Atrisina** gan** `A` un `AAAA` ieraksta un noraida, ja** jebkura** atrisinātā adrese ir privāta — kas aizver publiskā resursdatora nosaukuma → privātā IP apiešanu.
   - **Neizdevās slēgts** : DNS izšķirtspējas kļūme noraida URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): atkārtoti lieto tikai publiski pieejamo URL aizsardzību nolasīšanas laikā un** bloķē novirzīšanu** (nav publiska → privātā `30x` pivot).

URL, kas neizdodas nevienā no slāņiem, neatceļ pieprasījumu. — tirgus klusi atgriežas iebūvētajā sēklu reģistrā un reģistrē brīdinājumu.

> Šis aizsargs tika īpaši nostiprināts PR #3774, lai atrisinātu A + AAAA un izmantotu kanonisko `isPrivateHost`, nevis IPv4-only pārbaudi.

### Spraudņa izpildes izolācija

> **Spraudņi nav smilškastes.** Bērns ir parasts Node.js process, kas darbojas kā OmniRoute lietotājs, bez VM konteksta un bez Node.js atļauju karodziņiem, tāpēc spraudņa kods var lasīt un rakstīt jebkuru failu, ko lietotājs var, palaist programmas un sasniegt tīklu. `requires.permissions` tikai izlemj, kādus vides mainīgos bērns saņem; pārējās atļaujas netiek izpildītas. Instalējiet tikai spraudņus, kuriem uzticaties. Tālāk norādītā procesa robeža ietver avārijas un uzkaras; tā nav drošības robeža.

- **Procesa izolācija** — `loadPlugin()` (`src/lib/plugins/loader.ts`) izveido katru spraudni atsevišķā Node.js bērnprocesā un sazinās, izmantojot IPC. Āķa zvaniem ir noildze ar `SIGTERM` → `SIGKILL` eskalāciju.
- **Env atļaušanas saraksts** — bērns saņem tikai atļauto vides mainīgo kopu; plašāka kopa tiek piešķirta tikai tad, ja manifestā tiek pieprasīta `env` atļauja.
- **Instalējiet avota ierobežošanu** — `POST /api/plugins` lasa tikai no spraudņa avotu direktorija (skatiet sadaļu "Instalēšana no vietējā ceļa"): ceļš ir kanonizēts ar `realpath`, tam ir stingri jāpaliek šajā direktorijā, un avota koks, kas satur simbolisku saiti, kas no tā tiek izvadīts, tiek noraidīts, pirms kaut kas tiek kopēts.
- **Ceļa ierobežošana** — install/upgrade/uninstall apgalvo, ka spraudņa direktorijs un `manifest.main` tiek atrisināti** ietvaros** pārvaldītā spraudņa sakne pirms jebkuras kopēšanas vai rekursīvas dzēšanas (aizsargā pret manipulētiem DB ceļiem un `../` šķērsošanu `manifest.main`). Aktivizēšana atrisina simboliskās saites, izmantojot `realpath`, un atsakās ielādēt ieejas punktu, kas iziet no spraudņa direktorijas.
- **Papildu integritātes tapa** — manifestā var būt norādīts `integrity` (`sha256-<base64>`, SRI formāts) lauks. Ja ir, ielādētājs pārbauda ievades faila jaucējkodu ielādes laikā un atsakās aktivizēt neatbilstības gadījumā. Tā ir izvēles viltojuma noteikšana,** nē** drošības robeža: tas neierobežo to, ko var darīt ielādēts spraudnis.
- **Nav klientu akreditācijas datu** — kontekstam, kas nodots `onRequest`, `onResponse` un `onError` ir noņemtas galvenes `authorization`, `x-api-key`, `proxy-authorization` un `cookie`, un atslēgas API ierakstam nav atslēgas vērtības (`redactPluginContext()` in `src/lib/plugins/hooks.ts`).

## Manifests (`plugin.json`)

Apstiprinājis `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Lauks              | Tips       | Piezīmes                                                          |
| ------------------ | ---------- | ----------------------------------------------------------------- |
| `name`             | virkne     | Obligāti; kebaba futrālis (`^[a-z0-9-]+$`), 1–100 rakstzīmes      |
| `version`          | virkne     | Obligāti; semvers (`MAJOR.MINOR.PATCH`)                           |
| `description`      | aukla?     | ≤ 500 rakstzīmes                                                  |
| `author`           | aukla?     | ≤ 200 rakstzīmes                                                  |
| `license`          | aukla?     | Pēc noklusējuma `MIT`                                             |
| `main`             | aukla?     | Ieejas fails; noklusējuma vērtība ir `index.js`                   |
| `source`           | enum?      | `local` \| `marketplace` (pēc noklusējuma `local`)                |
| `tags`             | string[]?  | Meklēt tagus                                                      |
| `requires`         | objekts?   | `{ omniroute?, permissions[] }`                                   |
| `hooks`            | objekts?   | Būla vērtības, kas nosaka, kuri āķi tiek ieviesti spraudnis       |
| `skills`           | objekts[]? | Izvēles prasmju definīcijas                                       |
| `enabledByDefault` | Būla?      | Automātiska aktivizēšana instalēšanas laikā                       |
| `configSchema`     | objekts?   | Konfigurācijas lauku karte (`string`/`number`/`boolean`/`select`) |
| `integrity`        | aukla?     | Izvēles `sha256-<base64>` ievades faila tapa                      |

Atļaujas tiek iegūtas no enum `network` / `file-read` / `file-write` / `env` / `exec`. Tikai `env` ir izpildlaika efekts (mazliet lielāks vides mainīgo atļaušanas saraksts bērnam); pārējās ir deklarācijas un netiek izpildītas.

## Dzīves cikla plūsma

```
instalēšana (POST /api/plugins, ceļš)
  → manifesta skenēšana/validēšana → kopēšana pagaidu direktorijā → pārbaude, vai galvenais fails atrodas direktorijā
  → atomāra pārdēvēšana uz ~/.omniroute/plugins/<name> → rindas ievietošana datubāzē
  → onInstall izsaukšana → ja enabledByDefault: aktivizēšana

aktivizēšana (POST /api/plugins/{name}/activate)
  → realpath ietveršanas pārbaude → loadPlugin() (atvasinātā procesa palaišana)
  → deklarēto āķu reģistrēšana → statuss = "active" → onActivate izsaukšana

deaktivizēšana (POST /api/plugins/{name}/deactivate)
  → onDeactivate izsaukšana (PIRMS reģistrācijas atcelšanas) → āķu reģistrācijas atcelšana
  → atvasinātā procesa apturēšana → statuss = "inactive"

atinstalēšana (DELETE /api/plugins/{name})
  → deaktivizēšana, ja aktīvs → onUninstall izsaukšana
  → spraudņa direktorijas rekursīva dzēšana ar ietveršanas pārbaudi → datubāzes rindas dzēšana
```

Atkārtoti palaižot `install` direktorijam, kura manifesta versija ir **strikti
jaunāka** par instalēto versiju, tiek veikta automātiska jaunināšana (tīra
pārinstalēšana; konfigurācija tiek atiestatīta uz noklusējuma vērtībām).
Tāda pati vai vecāka versija tiek noraidīta.

## Datubāze

Tabula `plugins` (migrācija `076_create_plugins.sql`):

| Kolonna         | Tips    | Piezīmes                                              |
| --------------- | ------- | ----------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                  |
| `name`          | TEXT    | Unikāls                                               |
| `version`       | TEXT    | semver; noklusējums `1.0.0`                           |
| `description`   | TEXT    | Neobligāts                                            |
| `author`        | TEXT    | Neobligāts                                            |
| `license`       | TEXT    | Noklusējums `MIT`                                     |
| `main`          | TEXT    | Ieejas fails; noklusējums `index.js`                  |
| `source`        | TEXT    | Noklusējums `local`                                   |
| `tags`          | TEXT    | JSON masīvs; noklusējums `[]`                         |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`      |
| `enabled`       | INT     | 0/1; noklusējums 0                                    |
| `manifest`      | TEXT    | Pilns manifesta JSON                                  |
| `config`        | TEXT    | JSON; noklusējums `{}`                                |
| `config_schema` | TEXT    | JSON; noklusējums `{}`                                |
| `hooks`         | TEXT    | Deklarēto āķu nosaukumu JSON masīvs; noklusējums `[]` |
| `permissions`   | TEXT    | JSON masīvs; noklusējums `[]`                         |
| `plugin_dir`    | TEXT    | Absolūtais instalēšanas direktorijs                   |
| `error_message` | TEXT    | Iestatīts, ja `status = "error"`                      |
| `installed_at`  | TEXT    | `datetime('now')`                                     |
| `updated_at`    | TEXT    | `datetime('now')`                                     |
| `activated_at`  | TEXT    | Iestatīts aktivizēšanas laikā                         |

Spraudņu metrika un analītika tiek uzskaitīta papildu tabulās
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Informācijas panelis

Informācijas paneļa lapa vietnē `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) nodrošina divas cilnes:

- **Uzstādīts** — uzskaita instalētos spraudņus ar to deklarētajiem āķiem, activate/deactivate slēdzi, atinstalēšanas pogu un darbību "Skenēt spraudņus" (`POST /api/plugins/scan`).
- **Tirgus laukums** — parāda katalogu no `GET /api/plugins/marketplace` ar lauku pielāgotā reģistra iestatīšanai URL.

Lapā vienmēr tiek rādīts brīdinājums, ka spraudņi darbojas ar pilnām OmniRoute procesa privilēģijām.

Katra spraudņa konfigurācijas lapa atrodas `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Skatiet arī

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  kāpēc `/api/plugins` ir pieejams tikai no atgriezeniskās cilpas (1. līmenis)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — saistītais prasmju ietvars
  (`src/lib/skills/`); spraudņi var deklarēt prasmes savā manifestā
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — notikumu vadītas izejošās
  integrācijas
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  `buildErrorBody()` modelis, ko kļūdu atbildēm izmanto katrs spraudņa maršruts
