# Plugin Marketplace (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Tõeallikas:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` ja
> `src/app/(dashboard)/dashboard/plugins/`
> **Viimati uuendatud:** 2026-06-28 — v3.8.40

OmniRoute sisaldab WordPressi-laadset pistikprogrammisüsteemi. Pistikprogrammid on iseseisvad
kataloogid — igaühes on `plugin.json` manifest ja sisendfail —, mis haakuvad
päringutöötlusahelasse (`onRequest` / `onResponse` / `onError`) ning
elutsüklisündmustesse (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Pistikprogrammide turuplats** on selle süsteemi peal olev avastuskiht. See
pakub sirvitavat installitavate pistikprogrammide kataloogi. Vaikimisi on kataloogiks
väike sisseehitatud algregister; operaator saab määrata kohandatud kaugregistri
URL-i, mille puhul turvatakse päring DNS-i lahendava SSRF-kaitsega
(vt [Turvalisus](#security)).

Kõik pistikprogrammide marsruudid on **ainult tagasisideaadressilt ligipääsetavad** (1. tase — `LOCAL_ONLY`):
pistikprogrammid laadivad ja käivitavad koodi alamprotsessides, mistõttu pole marsruudid
tagasisideaadressivälisest päritolust autentimisest olenemata ligipääsetavad. Vt
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Kuidas see sobib Together

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

- **Registrikiht** — `src/lib/plugins/marketplace.ts`: loetleb/otsib kataloogi, naases seemneregistrisse iga tõrke korral.
- **Elutsükli kiht** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): installimine, uuendamine, aktiveerimine, deaktiveerimine, desinstallimine, skannimine, käivituslaadimine.
- **Ilmne kiht** — `src/lib/plugins/manifest.ts`: Zod skeemi + vaikeseaded `plugin.json` jaoks.
- **Skänner** — `src/lib/plugins/scanner.ts`: avastab pistikprogrammide kataloogi alt kettalt pluginad.
- **Laadija** — `src/lib/plugins/loader.ts`: loob iga pistikprogrammi eraldi Node.js alamprotsessina ja vahendab kõnesid IPC kaudu. Laps ei ole liivakast (vt allpool "Plugina täitmise isoleerimine").

## Turuplatsi kataloog

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) tagastab loendi
`MarketplaceEntry` objektidest:

| Väli          | Tüüp     | Märkused                                      |
| ------------- | -------- | --------------------------------------------- |
| `name`        | string   | kebab-case-vormingus pistikprogrammi nimi     |
| `version`     | string   | semver                                        |
| `description` | string   | Lühikokkuvõte                                 |
| `author`      | string   | Autor / organisatsioon                        |
| `license`     | string   | SPDX-stiilis litsentsi ID                     |
| `downloadUrl` | string   | Lähtekoodi allalaadimise URL (võib olla tühi) |
| `repository`  | string?  | Valikuline hoidla URL                         |
| `tags`        | string[] | Otsingu-/filtreerimissildid                   |
| `downloads`   | number   | Allalaadimiste arv                            |
| `rating`      | number   | 0–5                                           |
| `verified`    | boolean  | Kas kirje on märgitud kontrollituks           |
| `lastUpdated` | string   | ISO-laadne kuupäevastring                     |

Kui kohandatud registri URL-i pole seadistatud, kasutatakse kataloogina sisseehitatud
`SEED_REGISTRY`-t (praegu `request-logger`, `rate-limiter`, `cost-tracker` ja
`theme-manager`). Algregister on alati saadaval — kui seadistatud kaugregister
pole kättesaadav, tagastab muu kui `200` oleku või tundmatu kehaga vastuse,
logib `listMarketplacePlugins()` hoiatuse ja kasutab algloendit.

> Märkus: turuplatsi **kataloog** (sirvimine/otsing) on täielikult ühendatud, kuid
> ühe klõpsuga turuplatsilt **installimine** pole veel rakendatud — turuplatsi kirje
> nupp „Installi“ kuvab praegu teate „peagi saadaval“. Praegu toimub installimine
> kohaliku tee installivoo (`POST /api/plugins`) ja kettalt tuvastamise
> (`POST /api/plugins/scan`) kaudu.

## REST API

Kõik lõpp-punktid nõuavad haldamise autentimist (`requireManagementAuth`)** ja** on ainult loopback — `/api/plugins` ja `/api/plugins/` on loetletud `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Lõpp-punkt                         | meetod | Kirjeldus                                                                        |
| ---------------------------------- | ------ | -------------------------------------------------------------------------------- |
| `/api/plugins`                     | GET    | Loetlege installitud pistikprogrammid (valikuline `?status=` filter)             |
| `/api/plugins`                     | POST   | Installige pistikprogrammi allikate kataloogist                                  |
| `/api/plugins/scan`                | POST   | Kontrollige pistikprogrammide kataloogi ja registreerige uued pluginad           |
| `/api/plugins/marketplace`         | GET    | Loetlege turuplatsi kataloogi kirjed                                             |
| `/api/plugins/marketplace/install` | POST   | Installige Marketplace'i pistikprogramm nime järgi                               |
| `/api/plugins/[name]`              | GET    | Hankige installitud pistikprogrammi üksikasjad                                   |
| `/api/plugins/[name]`              | DELETE | Desinstallige pistikprogramm                                                     |
| `/api/plugins/[name]/activate`     | POST   | Aktiveeri (laadige + registrikonksud)                                            |
| `/api/plugins/[name]/deactivate`   | POST   | Deaktiveerimine (tulekahju `onDeactivate`, konksude registreerimisest loobumine) |
| `/api/plugins/[name]/config`       | GET    | Hankige pistikprogrammi konfiguratsioon + konfiguratsiooniskeem                  |
| `/api/plugins/[name]/config`       | PUT    | Värskenda pistikprogrammi konfiguratsiooni (valideeritud skeemi alusel)          |

Filter `GET /api/plugins` `status` aktsepteerib ühte järgmistest: `installed` / `active` / `inactive` / `error`. Kehtetu väärtus tagastab `400`.

### Loetlege installitud pistikprogrammid

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Installige kohalikult teelt

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` peab olema an** absoluutne** tee kataloogi** plugina allikate kataloogis** : `plugin-sources` pistikprogrammi juure kõrval, seega vaikimisi `~/.omniroute/plugin-sources/` või `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/`, kui see muutuja on määratud (`getPluginSourcesDir()` in `src/lib/plugins/installSource.ts`). Esmalt kopeerige või kloonige plugin sinna. Paigaldamisest keeldutakse `400`, kui tee sisaldab `..` või nullbaiti, asub väljaspool seda kataloogi, lahendatakse sellest väljaspool sümlingi kaudu, sisaldab sümbollinki, mille sihtmärk on sellest väljaspool, või kui kataloogi pole olemas. Lähtekataloog peab sisaldama kehtivat `plugin.json` (või olema selle emakataloog). Edu korral on vastuseks installitud pistikprogrammi rea `201`.

Erinevalt teistest pistikprogrammide marsruutidest nõuab see haldusmandaati (armatuurlaua seanss või hallatava ulatusega API võti) isegi siis, kui sisselogimine on keelatud (`requireLogin=false`): koodi installimine ei ole kunagi anonüümne toiming. Sama kehtib `POST /api/plugins/marketplace/install` (keha `{ "name": "<plugin>" }`) kohta.

### Sirvige turgu

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Värskenda pistikprogrammi konfiguratsiooni

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` validates the body against the plugin's `configSchema` (declared in the manifest) with `validatePluginConfig()` from `src/lib/plugins/manifest.ts`: every key must be declared in the schema, values must match the declared type, `number` fields honor `min`/`max`, and `select` fields must match the declared `enum`. Any violation returns `400` and nothing is stored. A plugin that declares no `configSchema` has no configurable keys, so the request is refused with `400` ("Plugin does not declare any configurable keys").

## Konfiguratsioon

### Pluginate kataloog

Pluginad asuvad OmniRoute'i andmekataloogis:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (või mis tahes fail, millele manifest.main osutab)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) määrab selle kataloogi
kolmes etapis:

1. **`OMNIROUTE_PLUGINS_DIR`**, kui see on määratud — kasutatakse muutmata kujul sõltumata `HOME` väärtusest. See on
   selgesõnaline seadistus Docker/K8s-i jaoks, kus pluginate kataloogipuu on bind-mount'itud teele,
   millel pole tavaliselt konteineri kodukataloogiga mingit seost (#11827).
2. `<home>/.omniroute/plugins`, kus `<home>` pärineb keskkonnamuutujatest `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, kui protsess ei ekspordi üldse kodukataloogi.

Määratud kataloog logitakse käivitamisel üks kord sündmusena `scanner.dir_resolved`, nimetades
valituks osutunud sisendi (`OMNIROUTE_PLUGINS_DIR`, `home` või `no-home-fallback`) — nii annab
vaikselt 3. etapile langev tõmmis sellest teada, selle asemel et teatada ainult tühjast pluginate loendist.
`POST /api/plugins/scan` leiab sealt kõik alamkataloogid, mis sisaldavad kehtivat
faili `plugin.json`, ja registreerib need; sama kataloog on juur, kuhu
`pluginManager.install()` pluginad kopeerib, seega teisaldab ülekirjutus nii tuvastamise kui ka
installimise.

> **`OMNIROUTE_PLUGINS_DIR` ei ole `OMNIROUTE_PLUGIN_PATH`.** Viimast loeb ainult
> CLI käsupluginate laadija (`bin/cli/plugins.mjs`), et leida `omniroute-cmd-*` npm-i
> pakette, mis lisavad `omniroute` alamkäske — see ei mõjuta siin kirjeldatud käitusaegset skannerit.
> Selle kohta vaadake [PLUGINS.md](./PLUGINS.md).

### Kohandatud turuplatsi registri URL

Turuplatsi kataloogi allikat loetakse sättest `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` loeb väärtust `settings.pluginMarketplaceUrl`). Kui
selle väärtuseks on määratud `http(s)` URL, hangib `listMarketplacePlugins()` selle URL-i ja aktsepteerib
kas tipptaseme JSON-kirjete massiivi või objekti, millel on massiiv `plugins`;
kirjed, millel puudub string-tüüpi `name`, filtreeritakse välja. Kui väärtus on määramata (või kui päring
ei läbi SSRF-kaitset / tagastab sobimatu vastuse), kasutatakse sisseehitatud algregistrit.

Töölaua vahekaart „Turuplats” sisaldab selle URL-i välja (loetakse tagasi lõpp-punktist
`GET /api/settings`).

> Teostuse märkus: töölaua toiming „Salvesta” saadab väärtuse
> `pluginMarketplaceUrl` lõpp-punktile `PATCH /api/settings`. Kirjutamise ajal ei ole see
> võti deklareeritud skeemis `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), seega kontrollige enne sellele lootmist oma
> väljalaskes väärtuse püsimist — **lugemistee** (`getSettings()` →
> `listMarketplacePlugins()`) arvestab võtmega, kui see on sätete
> hoidlas olemas.

## Turvalisus

### Ainult marsruudi tasandi — loopback

Pluginad käivitavad loodud alamprotsessides koodi, seega klassifitseeritakse kogu `/api/plugins` pind `LOCAL_ONLY` (Tier 1). Loopback jõustamine töötab tingimusteta** enne** mis tahes autentimiskontrolli, nii et lekkinud haldusmärk, mis jõuab kasti üle tunneli, ei saa ikkagi pistikprogrammi installida, aktiveerida ega desinstallida. Vt [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) ja kõvad reeglid #15 / #17.

### Turu registri SSRF valvur

Kohandatud registri URL konfiguratsioon on ründaja poolt mõjutatav, nii et enne selle toomist käivitab `listMarketplacePlugins()` selle läbi kahe kihi:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Lükkab tagasi kõik, mis ei ole `http:` / `https:`.
   - Lükkab tagasi sõnasõnalised private/loopback/link-local/ULA hostid (IPv4** ja** IPv6, sealhulgas IPv4-mapped) kanoonilise `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`) kaudu.
   - Lahendab** mõlemad** `A` ja `AAAA` salvestavad ja lükkavad tagasi, kui** ükskõik milline** lahendatud aadress on privaatne —, mis sulgeb avaliku hostinime → privaat-IP ümbersõidu.
   - **Ebaõnnestunud sulgemine** : DNS eraldusvõime tõrge lükkab URL tagasi.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): rakendab toomise ajal uuesti ainult avaliku URL kaitse** blokeerib ümbersuunamised** (avalikku → privaatset `30x` pivotit pole).

Kummagi kihi ebaõnnestunud URL ei katkesta taotlust. — turg langeb vaikselt tagasi sisseehitatud seemneregistrisse ja logib hoiatuse.

> Seda kaitset tugevdati PR #3774 spetsiaalselt A + AAAA lahendamiseks ja IPv4-only -kontrolli asemel kanoonilise `isPrivateHost` kasutamiseks.

### Plugina täitmise isoleerimine

> **Pistikprogrammid ei ole vaikimisi liivakastis.** Laps on tavaline Node.js protsess, mis töötab OmniRoute kasutajana, ilma VM konteksti ja Node.js -lubadeta, seega saab pistikprogrammi kood lugeda ja kirjutada mis tahes faile, mida kasutaja saab, käivitada programme ja jõuda võrku. `requires.permissions` otsustab ainult, millised keskkonnamuutujad laps saab; teisi õigusi ei jõustata. Valitud `PLUGIN_PERMISSION_MODEL_ENABLED` -funktsiooni lipp (vaikimisi välja lülitatud) käivitab iga pistikprogrammi Node.js -lubade mudeli alusel, mis on ehitatud nendest õigustest, välja arvatud `network`, mida Node.js ei saa piirata (vt [`PLUGIN_SDK.md`](./PLUGIN_SDK.md#lubade-s%C3%BCsteem) ). Installige ainult usaldusväärsed pistikprogrammid. Allpool olev protsessipiir sisaldab kokkujooksmisi ja hangumist; see ei ole turvapiir.

- **Protsessi isoleerimine** — `loadPlugin()` (`src/lib/plugins/loader.ts`) loob iga pistikprogrammi eraldi Node.js alamprotsessina ja suhtleb IPC kaudu. Konkskõnedel on ajalõpp koos `SIGTERM` → `SIGKILL` eskalatsiooniga.
- **Env lubade loend** — laps saab ainult lubatud keskkonnamuutujate komplekti; laiem komplekt antakse ainult siis, kui manifest nõuab `env` luba.
- **Installige allika kaitse** — `POST /api/plugins` loeb ainult pistikprogrammi allikate kataloogist (vt "Installi kohalikult teelt"): tee kanoniseeritakse `realpath`, see peab jääma rangelt sellesse kataloogi ja lähtepuust, mis kannab sümboli linki, mis sellest välja pääseb, keeldutakse enne kui midagi kopeeritakse.
- **Tee piiramine** — install/upgrade/uninstall kinnitab, et pistikprogrammide kataloog ja `manifest.main` lahendavad** sees** hallatava pistikprogrammi juur enne mis tahes kopeerimist või rekursiivset kustutamist (kaitseb rikutud DB teede ja `../` läbipääsu eest `manifest.main` is). Aktiveerimine lahendab sümbollingid `realpath` kaudu ja keeldub laadimast sisenemispunkti, mis väljub pistikprogrammide kataloogist.
- **Valikuline terviklikkuse tihvt** — manifest võib deklareerida välja `integrity` (`sha256-<base64>`, SRI vorming). Kui see on olemas, kontrollib laadija sisestusfaili räsi laadimise ajal ja keeldub mittevastavuse korral aktiveerimast. See on lubatav võltsimise tuvastamine,** mitte** turvapiir: see ei piira seda, mida laaditud pistikprogramm saab teha.
- **Kliendi mandaate pole konksus** — `onRequest`, `onResponse` ja `onError` edastatud kontekstist on eemaldatud päised `authorization`, `x-api-key`, `proxy-authorization` ja `cookie` ning API võtmekirje ei kanna võtmeväärtust (`redactPluginContext()` in `src/lib/plugins/hooks.ts`).

## Manifest (`plugin.json`)

Kinnitanud `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Väli               | Tüüp        | Märkmed                                                                   |
| ------------------ | ----------- | ------------------------------------------------------------------------- |
| `name`             | string      | Nõutav; kebabikarp (`^[a-z0-9-]+$`), 1–100 tähemärki                      |
| `version`          | string      | Nõutav; semver (`MAJOR.MINOR.PATCH`)                                      |
| `description`      | string?     | ≤ 500 tähemärki                                                           |
| `author`           | string?     | ≤ 200 tähemärki                                                           |
| `license`          | string?     | Vaikimisi `MIT`                                                           |
| `main`             | string?     | sisestusfail; vaikimisi `index.js`                                        |
| `source`           | enum?       | `local` \| `marketplace` (vaikimisi `local`)                              |
| `tags`             | string[]?   | Otsi silte                                                                |
| `requires`         | objekt?     | `{ omniroute?, permissions[] }`                                           |
| `hooks`            | objekt?     | Booleanid, mis deklareerivad, millised konksud pistikprogrammi rakendavad |
| `skills`           | objekt[]?   | Valikulised oskuste määratlused                                           |
| `enabledByDefault` | tõeväärtus? | Automaatne aktiveerimine installimisel                                    |
| `configSchema`     | objekt?     | Konfiguratsiooniväljade kaart (`string`/`number`/`boolean`/`select`)      |
| `integrity`        | string?     | Valikuline `sha256-<base64>` sisestusfaili tihvt                          |

Õigused saadakse loendist `network` / `file-read` / `file-write` / `env` / `exec`. Ainult `env` on käitusaegne efekt (lapse jaoks veidi suurem keskkonnamuutuja lubade loend); teised on deklaratsioonid ja neid ei täideta.

## Elutsükli voog

```
install (POST /api/plugins, tee)
  → manifesti skannimine/valideerimine → kopeerimine ettevalmistusalasse → kontroll, et main asuks kataloogis
  → atomaarne ümbernimetamine asukohta ~/.omniroute/plugins/<name> → rea lisamine andmebaasi
  → onInstall käivitamine → kui enabledByDefault: aktiveerimine

activate (POST /api/plugins/{name}/activate)
  → realpath-i põhine kataloogis püsimise kontroll → loadPlugin() (alamprotsessi käivitamine)
  → deklareeritud hook'ide registreerimine → status = "active" → onActivate käivitamine

deactivate (POST /api/plugins/{name}/deactivate)
  → onDeactivate käivitamine (ENNE registreeringute eemaldamist) → hook'ide registreeringute eemaldamine
  → alamprotsessi lõpetamine → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → kui aktiivne, siis deaktiveerimine → onUninstall käivitamine
  → kontrollitud kataloogikuuluvusega pluginakataloogi rekursiivne kustutamine → andmebaasirea kustutamine
```

Käsu `install` korduv käivitamine kataloogi jaoks, mille manifesti versioon on installitud versioonist **rangelt
uuem**, teeb automaatse versiooniuuenduse (puhas uuesti installimine; konfiguratsioon lähtestatakse
vaikeväärtustele). Sama või vanem versioon lükatakse tagasi.

## Andmebaas

Tabel `plugins` (migratsioon `076_create_plugins.sql`):

| Veerg           | Tüüp    | Märkused                                                   |
| --------------- | ------- | ---------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                       |
| `name`          | TEXT    | Unikaalne                                                  |
| `version`       | TEXT    | semver; vaikimisi `1.0.0`                                  |
| `description`   | TEXT    | Valikuline                                                 |
| `author`        | TEXT    | Valikuline                                                 |
| `license`       | TEXT    | Vaikimisi `MIT`                                            |
| `main`          | TEXT    | Käivitusfail; vaikimisi `index.js`                         |
| `source`        | TEXT    | Vaikimisi `local`                                          |
| `tags`          | TEXT    | JSON-massiiv; vaikimisi `[]`                               |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`           |
| `enabled`       | INT     | 0/1; vaikimisi 0                                           |
| `manifest`      | TEXT    | Täielik manifest JSON-vormingus                            |
| `config`        | TEXT    | JSON; vaikimisi `{}`                                       |
| `config_schema` | TEXT    | JSON; vaikimisi `{}`                                       |
| `hooks`         | TEXT    | Deklareeritud hook'ide nimede JSON-massiiv; vaikimisi `[]` |
| `permissions`   | TEXT    | JSON-massiiv; vaikimisi `[]`                               |
| `plugin_dir`    | TEXT    | Absoluutne installikataloog                                |
| `error_message` | TEXT    | Määratakse, kui `status = "error"`                         |
| `installed_at`  | TEXT    | `datetime('now')`                                          |
| `updated_at`    | TEXT    | `datetime('now')`                                          |
| `activated_at`  | TEXT    | Määratakse aktiveerimisel                                  |

Pluginate mõõdikuid/analüütikat jälgitakse täiendavates tabelites
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Armatuurlaud

Armatuurlaua lehel aadressil `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) on kaks vahekaarti.

- **Paigaldatud** — loetleb installitud pistikprogrammid koos nende deklareeritud konksude, activate/deactivate lüliti, desinstallimisnupu ja toiminguga "Otsi pluginaid" (`POST /api/plugins/scan`).
- **Turg** — näitab kataloogi `GET /api/plugins/marketplace` -st koos väljaga kohandatud registri URL määramiseks.

Lehel kuvatakse alati hoiatus, et pistikprogrammid töötavad OmniRoute protsessi kõigi õigustega.

Pluginapõhine konfiguratsioonileht asub aadressil `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Vaata ka

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  miks `/api/plugins` on juurdepääsetav ainult loopback-liidese kaudu (1. tase)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — seotud oskuste raamistik
  (`src/lib/skills/`); pluginad võivad oma manifestis oskusi deklareerida
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — sündmuspõhised väljaminevad
  integratsioonid
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  muster `buildErrorBody()`, mida iga plugina marsruut veavastuste jaoks kasutab
