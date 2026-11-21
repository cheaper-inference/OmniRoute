# Plugin Marketplace (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Totuuden lähde:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` ja
> `src/app/(dashboard)/dashboard/plugins/`
> **Päivitetty viimeksi:** 2026-06-28 — v3.8.40

OmniRoute sisältää WordPress-tyylisen lisäosajärjestelmän. Lisäosat ovat
itsenäisiä hakemistoja, joista jokainen sisältää `plugin.json`-manifestin ja
aloitustiedoston. Ne kytkeytyvät pyyntöputkeen (`onRequest` / `onResponse` /
`onError`) ja elinkaaritapahtumiin (`onInstall` / `onActivate` / `onDeactivate` /
`onUninstall`).

**Lisäosakauppa** toimii tämän järjestelmän löytämiskerroksena. Se tarjoaa
selattavan luettelon asennettavista lisäosista. Oletusarvoisesti luettelo on
pieni sisäänrakennettu alustava rekisteri. Operaattori voi määrittää käyttöön
mukautetun etärekisterin URL-osoitteen, jolloin nouto suojataan DNS-selvitystä
käyttävällä SSRF-suojauksella (katso [Tietoturva](#security)).

Kaikki lisäosareitit ovat käytettävissä **vain loopback-osoitteesta** (taso 1 —
`LOCAL_ONLY`): lisäosat lataavat ja suorittavat koodia aliprosesseissa, joten
reitit eivät ole käytettävissä muista kuin loopback-lähteistä todennuksesta
riippumatta. Katso
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Kuinka se sopii Together

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

- **Rekisteritaso** — `src/lib/plugins/marketplace.ts`: luetteloi / etsii luetteloa ja palaa siemenrekisteriin virheiden sattuessa.
- **Elinkaarikerros** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): asenna, päivitä, aktivoi, deaktivoi, poista, skannaa, käynnistä lataus.
- **Ilmeinen kerros** — `src/lib/plugins/manifest.ts`: Zod -skeema + oletusarvot `plugin.json`.
- **Skanneri** — `src/lib/plugins/scanner.ts`: löytää laajennuksia levyltä laajennushakemistosta.
- **Loader** — `src/lib/plugins/loader.ts`: synnyttää jokaisen laajennuksen erillisessä Node.js -alaprosessissa ja välittää puhelut IPC kautta. Lapsi ei ole hiekkalaatikko (katso "Lisäosien suorittamisen eristäminen" alla).

## Lisäosakaupan luettelo

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) palauttaa luettelon
`MarketplaceEntry`-objekteja:

| Kenttä        | Tyyppi   | Huomautukset                        |
| ------------- | -------- | ----------------------------------- |
| `name`        | string   | kebab-case-muotoinen lisäosan nimi  |
| `version`     | string   | semver                              |
| `description` | string   | Lyhyt yhteenveto                    |
| `author`      | string   | Tekijä / organisaatio               |
| `license`     | string   | SPDX-tyylinen lisenssitunniste      |
| `downloadUrl` | string   | Lähteen lataus-URL (voi olla tyhjä) |
| `repository`  | string?  | Valinnainen tietovaraston URL       |
| `tags`        | string[] | Haku- ja suodatustunnisteet         |
| `downloads`   | number   | Latausten määrä                     |
| `rating`      | number   | 0–5                                 |
| `verified`    | boolean  | Onko kohde merkitty vahvistetuksi   |
| `lastUpdated` | string   | ISO-tyylinen päivämäärämerkkijono   |

Kun mukautetun rekisterin URL-osoitetta ei ole määritetty, luettelona käytetään
sisäänrakennettua `SEED_REGISTRY`-rekisteriä (tällä hetkellä `request-logger`,
`rate-limiter`, `cost-tracker` ja `theme-manager`). Alustava rekisteri on aina
käytettävissä — jos määritettyä etärekisteriä ei voida tavoittaa, se palauttaa
muun kuin `200`-tilan tai tunnistamattoman rungon, `listMarketplacePlugins()`
kirjaa varoituksen ja käyttää alustavaa luetteloa.

> Huomautus: lisäosakaupan **luettelo** (selaaminen/haku) on toteutettu päästä
> päähän, mutta yhden napsautuksen **asennusta** luettelosta ei ole vielä
> toteutettu — hallintapaneelin lisäosakauppakohteen "Asenna"-painike näyttää
> tällä hetkellä ilmoituksen tulevasta toiminnosta. Asennus tehdään nykyisin
> paikallisen polun asennusprosessin (`POST /api/plugins`) ja levyltä tehtävän
> haun (`POST /api/plugins/scan`) kautta.

## REST API

Kaikki päätepisteet vaativat hallinnan todennuksen (`requireManagementAuth`)** ja** ovat vain silmukoita — `/api/plugins` ja `/api/plugins/` on lueteltu kohdassa `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Päätepiste                         | Menetelmä | Kuvaus                                                                   |
| ---------------------------------- | --------- | ------------------------------------------------------------------------ |
| `/api/plugins`                     | GET       | Listaa asennetut laajennukset (valinnainen `?status=` suodatin)          |
| `/api/plugins`                     | POST      | Asenna laajennus laajennuslähteiden hakemistosta                         |
| `/api/plugins/scan`                | POST      | Tarkista laajennushakemisto ja rekisteröi uudet lisäosat                 |
| `/api/plugins/marketplace`         | GET       | Listaa markkinapaikan luettelomerkinnät                                  |
| `/api/plugins/marketplace/install` | POST      | Asenna Marketplace-laajennus nimellä                                     |
| `/api/plugins/[name]`              | GET       | Hanki asennetun laajennuksen tiedot                                      |
| `/api/plugins/[name]`              | DELETE    | Poista laajennus                                                         |
| `/api/plugins/[name]/activate`     | POST      | Aktivoi (lataa + -rekisterikoukut)                                       |
| `/api/plugins/[name]/deactivate`   | POST      | Poista käytöstä (sammuta `onDeactivate`, poista koukkujen rekisteröinti) |
| `/api/plugins/[name]/config`       | GET       | Hae plugin config + config schema                                        |
| `/api/plugins/[name]/config`       | PUT       | Päivitä laajennuksen kokoonpano (vahvistettu mallia vastaan)             |

`GET /api/plugins` `status` suodatin hyväksyy jonkin seuraavista : `installed` / `active` / `inactive` / `error`. Virheellinen arvo palauttaa `400`.

### Listaa asennetut laajennukset

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Asenna paikalliselta polulta

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` on oltava an** ehdoton** polku hakemistoon** laajennuksen lähdehakemiston sisällä** : `plugin-sources` laajennuksen juuren vieressä, joten oletuksena `~/.omniroute/plugin-sources/` tai `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/`, kun kyseinen muuttuja on asetettu (`getPluginSourcesDir()` in `src/lib/plugins/installSource.ts`). Kopioi tai kloonaa laajennus ensin sinne. Asennus hylätään komennolla `400`, kun polku sisältää `..` tai nollatavun, sijaitsee kyseisen hakemiston ulkopuolella, ratkaisee sen ulkopuolella symlinkin kautta, sisältää symlinkin, jonka kohde on sen ulkopuolella, tai kun hakemistoa ei ole olemassa. Lähdehakemiston on sisällettävä kelvollinen `plugin.json` (tai sen on oltava sen ylätaso). Onnistuessa vastaus on `201` asennetulla liitännäisrivillä.

Toisin kuin muut liitännäisreitit, tämä vaatii hallintatiedot (kojelaudan istunnon tai hallintalaajuisen API avaimen), vaikka sisäänkirjautuminen olisi estetty (`requireLogin=false`): koodin asentaminen ei ole koskaan anonyymi toimenpide. Sama koskee `POST /api/plugins/marketplace/install` (body `{ "name": "<plugin>" }`).

### Selaa markkinapaikkaa

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Päivitä laajennuksen kokoonpano

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` vahvistaa rungon laajennuksen `configSchema` vastaan (ilmoitettu luettelossa) komennolla `validatePluginConfig()` alkaen `src/lib/plugins/manifest.ts`: jokainen avain on ilmoitettava skeemassa, arvojen on vastattava ilmoitettua tyyppiä, `number` kentät kunnioittavat `min`/`max`-kenttiä ja `select` -kenttien on vastattava ilmoitettua `enum`. Mikä tahansa rikkomus palauttaa `400`, eikä mitään tallenneta. Pluginilla, joka ilmoittaa, ettei `configSchema` ole konfiguroitavia avaimia, joten pyyntö hylätään `400` ("Plugin ei ilmoitta mitään konfiguroitavia avaimia").

## Määritykset

### Lisäosahakemisto

Lisäosat sijaitsevat OmniRouten datahakemistossa:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (tai tiedosto, johon manifest.main viittaa)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) määrittää hakemiston
kolmessa vaiheessa:

1. **`OMNIROUTE_PLUGINS_DIR`**, kun se on asetettu — käytetään sellaisenaan riippumatta `HOME`-arvosta. Tämä on
   nimenomainen asetus Docker-/K8s-ympäristöille, joissa lisäosapuu liitetään bind-mountilla polkuun,
   jolla ei yleensä ole mitään tekemistä säilön kotihakemiston kanssa (#11827).
2. `<home>/.omniroute/plugins`, jossa `<home>` saadaan `HOME`- / `USERPROFILE`-
   ympäristömuuttujista.
3. `/tmp/.omniroute/plugins`, kun prosessi ei vie lainkaan kotihakemistotietoa.

Ratkaistu hakemisto kirjataan lokiin kerran käynnistyksen yhteydessä tapahtumana `scanner.dir_resolved`, ja
lokimerkintä nimeää valitun syötteen (`OMNIROUTE_PLUGINS_DIR`, `home` tai `no-home-fallback`) — näin vaiheeseen 3
hiljaisesti päätyvä levykuva ilmoittaa asiasta sen sijaan, että se raportoisi vain tyhjän lisäosaluettelon.
`POST /api/plugins/scan` etsii kaikki kyseisen hakemiston alihakemistot, jotka sisältävät kelvollisen
`plugin.json`-tiedoston, ja rekisteröi ne; sama hakemisto on juuri, johon
`pluginManager.install()` kopioi lisäosat, joten ohitus siirtää etsinnän ja
asennuksen yhdessä.

> **`OMNIROUTE_PLUGINS_DIR` ei ole `OMNIROUTE_PLUGIN_PATH`.** Jälkimmäistä lukee vain
> CLI:n komentolisäosien lataaja (`bin/cli/plugins.mjs`) löytääkseen `omniroute-cmd-*` npm-
> paketit, jotka lisäävät `omniroute`-alikomentoja — se ei vaikuta tässä kuvattuun suorituksenaikaiseen skanneriin.
> Katso tätä osuutta koskevat tiedot tiedostosta [PLUGINS.md](./PLUGINS.md).

### Mukautettu markkinapaikkarekisterin URL-osoite

Markkinapaikan luettelon lähde luetaan `pluginMarketplaceUrl`-asetuksesta
(`src/lib/plugins/marketplace.ts` lukee arvon `settings.pluginMarketplaceUrl`). Kun
asetuksena on `http(s)`-URL-osoite, `listMarketplacePlugins()` noutaa kyseisen URL-osoitteen ja hyväksyy
joko ylätason JSON-taulukon, joka sisältää merkinnät, tai objektin, jossa on `plugins`-taulukko;
merkinnät, joilla ei ole merkkijonomuotoista `name`-arvoa, suodatetaan pois. Kun asetusta ei ole määritetty
(tai kun nouto ei läpäise SSRF-suojausta / palauttaa virheellisen vastauksen), käytetään
sisäänrakennettua alkurekisteriä.

Hallintapaneelin "Markkinapaikka"-välilehti sisältää kentän tälle URL-osoitteelle (arvo luetaan takaisin
`GET /api/settings` -pyynnöllä).

> Toteutushuomautus: hallintapaneelin "Tallenna"-toiminto lähettää
> `pluginMarketplaceUrl`-arvon `PATCH /api/settings` -pyynnöllä. Tätä kirjoitettaessa kyseistä
> avainta ei ole määritetty `updateSettingsSchema`-skeemassa
> (`src/shared/validation/settingsSchemas.ts`), joten varmista arvon säilyminen omassa
> julkaisussasi ennen kuin luotat siihen — **lukupolku** (`getSettings()` →
> `listMarketplacePlugins()`) huomioi avaimen, kun se on asetustietovarastossa.

## Turvallisuus

### Vain reittitason — loopback

Pluginit suorittavat koodia synnytetyissä lapsiprosesseissa, joten koko `/api/plugins` pinta luokitellaan `LOCAL_ONLY` (Tier 1). Loopback-valvonta suoritetaan ehdoitta** ennen** mitään todennustarkistusta, joten tunnelin kautta laatikkoon saapuva vuotanut hallintatunnus ei voi silti asentaa, aktivoida tai poistaa laajennusta. Katso [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) ja kovat säännöt #15 / #17.

### Markkinapaikan rekisterin SSRF vartija

Mukautettu rekisteri URL on kokoonpano, johon hyökkääjä voi vaikuttaa, joten ennen sen hakemista `listMarketplacePlugins()` suorittaa sen kahden kerroksen läpi:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Hylkää kaiken, mikä ei ole `http:` / `https:`.
   - Hylkää kirjaimelliset private/loopback/link-local/ULA isännät (IPv4** ja** IPv6, mukaan lukien IPv4-mapped) kanonisen `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`) kautta.
   - Ratkaisee** molemmat** `A` ja `AAAA` tallentavat ja hylkäävät jos** mikä tahansa** ratkaistu osoite on yksityinen — joka sulkee julkisen isäntänimen → yksityisen IP-osoitteen ohituksen.
   - **Epäonnistuu kiinni** : DNS -resoluutiovirhe hylkää URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): ottaa uudelleen käyttöön vain julkisen URL suojan noutohetkellä ja** estää uudelleenohjaukset** (ei julkista → yksityistä `30x` pivotia).

URL, joka epäonnistuu jommassakummassa tasossa, ei keskeytä pyyntöä — markkinapaikka palaa hiljaa sisäänrakennettuun siemenrekisteriin ja kirjaa varoituksen.

> Tämä suoja on karkaistu PR #3774 :ssä erityisesti A + AAAA ratkaisemiseksi ja kanonisen `isPrivateHost` käyttämiseksi IPv4-only -tarkistuksen sijaan.

### Laajennuksen suorittamisen eristäminen

> **Plugins ei ole oletuksena hiekkalaatikko.** Lapsi on tavallinen Node.js prosessi, joka toimii OmniRoute käyttäjänä, ilman VM kontekstia eikä Node.js käyttöoikeuslippuja, joten liitännäiskoodi voi lukea ja kirjoittaa mitä tahansa tiedostoja, joita käyttäjä voi, suorittaa ohjelmia ja päästä verkkoon. `requires.permissions` vain päättää, mitkä ympäristömuuttujat lapsi saa; muita käyttöoikeuksia ei pakoteta. Opt-in `PLUGIN_PERMISSION_MODEL_ENABLED` -ominaisuuden lippu (oletusarvoisesti pois päältä) suorittaa jokaisen laajennuksen Node.js käyttöoikeusmallilla, joka on rakennettu näistä käyttöoikeuksista, paitsi `network`, jota Node.js ei voi rajoittaa (katso [`PLUGIN_SDK.md`](./PLUGIN_SDK.md#lupaj%C3%A4rjestelm%C3%A4) ). Asenna vain laajennuksia, joihin luotat. Alla oleva prosessiraja sisältää kaatumisia ja jumiutumia; se ei ole turvallisuusraja.

- **Prosessin eristäminen** — `loadPlugin()` (`src/lib/plugins/loader.ts`) synnyttää jokaisen liitännäisen erillisessä Node.js -lapsiprosessissa ja kommunikoi IPC kautta. Hook-puheluissa on aikakatkaisu `SIGTERM` → `SIGKILL` eskalaatiolla.
- **Env sallittujen lista** — lapsi saa vain sallittujen ympäristömuuttujien joukon; laajempi joukko myönnetään vain, kun luettelo pyytää `env` lupaa.
- **Asenna lähteen suojaus** — `POST /api/plugins` lukee vain laajennuksen lähdehakemistosta (katso "Asenna paikallisesta polusta"): polku kanonisoidaan `realpath` llä, sen on pysyttävä tiukasti kyseisen hakemiston sisällä, ja lähdepuu, joka sisältää symlinkin, joka pakottaa sen, hylätään ennen kuin mitään kopioidaan.
- **Polun rajoitus** — install/upgrade/uninstall väittävät, että laajennushakemisto ja `manifest.main` ratkaisevat** sisällä** hallitun laajennuksen juuri ennen kopiointia tai rekursiivista poistoa (suojaa peukaloituja DB -polkuja ja `../` -läpikulkua `manifest.main` ssä). Aktivointi ratkaisee symbolilinkit `realpath` kautta ja kieltäytyy lataamasta sisääntulopistettä, joka pakenee laajennushakemistosta.
- **Valinnainen eheysnasta** — luettelo voi ilmoittaa `integrity` (`sha256-<base64>`, SRI muoto) -kentän. Kun se on olemassa, lataaja tarkistaa syöttötiedoston tiivisteen latausaikana ja kieltäytyy aktivoimasta, jos se ei täsmää. Se on valinnainen peukaloinnin tunnistus,** ei** turvallisuusraja: se ei rajoita ladatun laajennuksen toimintaa.
- **Ei asiakkaan tunnistetietoja koukuissa** — `onRequest`, `onResponse` ja `onError` välitetystä kontekstista on poistettu otsikot `authorization`, `x-api-key`, `proxy-authorization` ja `cookie`, eikä API -avaintietue sisällä avainarvoa (`redactPluginContext()` in `src/lib/plugins/hooks.ts`).

## Manifesti (`plugin.json`)

Vahvistanut `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Ala                | Tyyppi        | Huomautuksia                                                   |
| ------------------ | ------------- | -------------------------------------------------------------- |
| `name`             | merkkijono    | Pakollinen; kebab-kotelo (`^[a-z0-9-]+$`), 1-100 merkkiä       |
| `version`          | merkkijono    | Pakollinen; semver (`MAJOR.MINOR.PATCH`)                       |
| `description`      | merkkijono?   | ≤ 500 merkkiä                                                  |
| `author`           | merkkijono?   | ≤ 200 merkkiä                                                  |
| `license`          | merkkijono?   | Oletusarvo on `MIT`                                            |
| `main`             | merkkijono?   | Tulotiedosto; oletuksena `index.js`                            |
| `source`           | enum?         | `local` \| `marketplace` (oletus on `local`)                   |
| `tags`             | merkkijono[]? | Hae tunnisteita                                                |
| `requires`         | esine?        | `{ omniroute?, permissions[] }`                                |
| `hooks`            | esine?        | Booleans ilmoittaa mitkä koukut plugin toteuttaa               |
| `skills`           | esine[]?      | Valinnaiset taitojen määritelmät                               |
| `enabledByDefault` | boolean?      | Aktivoi automaattisesti asennuksen yhteydessä                  |
| `configSchema`     | esine?        | Määrityskenttien kartta (`string`/`number`/`boolean`/`select`) |
| `integrity`        | merkkijono?   | Valinnainen `sha256-<base64>` -syöttötiedostonasta             |

Oikeudet haetaan luettelosta `network` / `file-read` / `file-write` / `env` / `exec`. Vain `env` llä on ajonaikainen vaikutus (hieman suurempi ympäristömuuttujien sallittu luettelo lapselle); muut ovat julistuksia eikä niitä panna täytäntöön.

## Elinkaaren kulku

```
install (POST /api/plugins, polku)
  → tarkista/validoi manifesti → kopioi valmistelualueelle → varmista, että main on hakemiston sisällä
  → nimeä atomisesti uudelleen kohteeseen ~/.omniroute/plugins/<name> → lisää tietokantarivi
  → suorita onInstall → jos enabledByDefault: aktivoi

activate (POST /api/plugins/{name}/activate)
  → tarkista realpath-polun pysyminen hakemiston sisällä → loadPlugin() (käynnistä aliprosessi)
  → rekisteröi määritetyt koukut → status = "active" → suorita onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → suorita onDeactivate (ENNEN rekisteröinnin poistamista) → poista koukkujen rekisteröinti
  → lopeta aliprosessi → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deaktivoi, jos aktiivinen → suorita onUninstall
  → poista liitännäishakemisto rekursiivisesti polun pysyminen tarkistaen → poista tietokantarivi
```

Kun `install` suoritetaan uudelleen hakemistolle, jonka manifestiversio on **aidosti
uudempi** kuin asennettu versio, liitännäinen päivitetään automaattisesti (puhdas
uudelleenasennus; määritykset palautetaan oletusarvoihin). Sama tai vanhempi versio
hylätään.

## Tietokanta

Taulu `plugins` (migraatio `076_create_plugins.sql`):

| Sarake          | Tyyppi  | Huomautukset                                              |
| --------------- | ------- | --------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                      |
| `name`          | TEXT    | Yksilöllinen                                              |
| `version`       | TEXT    | semver; oletus `1.0.0`                                    |
| `description`   | TEXT    | Valinnainen                                               |
| `author`        | TEXT    | Valinnainen                                               |
| `license`       | TEXT    | Oletus `MIT`                                              |
| `main`          | TEXT    | Aloitustiedosto; oletus `index.js`                        |
| `source`        | TEXT    | Oletus `local`                                            |
| `tags`          | TEXT    | JSON-taulukko; oletus `[]`                                |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`          |
| `enabled`       | INT     | 0/1; oletus 0                                             |
| `manifest`      | TEXT    | Täydellinen manifesti-JSON                                |
| `config`        | TEXT    | JSON; oletus `{}`                                         |
| `config_schema` | TEXT    | JSON; oletus `{}`                                         |
| `hooks`         | TEXT    | Määritettyjen koukkujen nimien JSON-taulukko; oletus `[]` |
| `permissions`   | TEXT    | JSON-taulukko; oletus `[]`                                |
| `plugin_dir`    | TEXT    | Absoluuttinen asennushakemisto                            |
| `error_message` | TEXT    | Asetetaan, kun `status = "error"`                         |
| `installed_at`  | TEXT    | `datetime('now')`                                         |
| `updated_at`    | TEXT    | `datetime('now')`                                         |
| `activated_at`  | TEXT    | Asetetaan aktivoinnin yhteydessä                          |

Liitännäisten mittareita ja analytiikkaa seurataan erillisissä tauluissa
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Kojelauta

Kojelautasivulla osoitteessa `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) on kaksi välilehteä:

- **Asennettu** — luettelee asennetut laajennukset niiden ilmoitetuilla koukuilla, activate/deactivate -kytkimellä, asennuksen poistopainikkeella ja "Scan for plugins" -toiminnolla (`POST /api/plugins/scan`).
- **Markkinapaikka** — näyttää luettelon `GET /api/plugins/marketplace` stä ja kentän mukautetun rekisterin URL määrittämistä varten.

Sivu näyttää aina varoituksen, että laajennukset toimivat OmniRoute -prosessin kaikilla oikeuksilla.

Plugin-kohtainen konfigurointisivu sijaitsee osoitteessa `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Katso myös

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  miksi `/api/plugins` on käytettävissä vain loopback-osoitteesta (taso 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — siihen liittyvä taitokehys
  (`src/lib/skills/`); liitännäiset voivat määrittää taitoja manifestissaan
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — tapahtumapohjaiset lähtevät
  integraatiot
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  `buildErrorBody()`-malli, jota jokainen liitännäisreitti käyttää virhevastauksissa
