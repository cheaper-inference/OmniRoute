# Plugin Marketplace (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Vir resnice:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` in
> `src/app/(dashboard)/dashboard/plugins/`
> **Nazadnje posodobljeno:** 2026-06-28 — v3.8.40

OmniRoute vključuje sistem vtičnikov po vzoru WordPressa. Vtičniki so samostojni
imeniki — vsak z manifestom `plugin.json` in vstopno datoteko — ki se vključujejo
v cevovod zahtev (`onRequest` / `onResponse` / `onError`) in dogodke
življenjskega cikla (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Tržnica vtičnikov** je plast za odkrivanje nad tem sistemom. Ponuja katalog
vtičnikov, ki jih je mogoče namestiti in pregledovati. Katalog je privzeto
majhen, vgrajen začetni register; skrbnik ga lahko usmeri na URL oddaljenega
registra po meri. V tem primeru pridobivanje varuje zaščita pred SSRF, ki
razrešuje DNS (glejte [Varnost](#security)).

Vse poti vtičnikov so **dostopne samo prek povratne zanke** (1. raven —
`LOCAL_ONLY`): vtičniki nalagajo in izvajajo kodo v podrejenih procesih, zato
poti niso dosegljive iz izvora, ki ni povratna zanka, ne glede na preverjanje
pristnosti. Glejte
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Kako se prilega Together

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

- **Plast registra** — `src/lib/plugins/marketplace.ts`: izpiše/išče po katalogu in se vrne v semenski register ob kakršni koli napaki.
- **Plast življenjskega cikla** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): namestitev, nadgradnja, aktiviranje, deaktiviranje, odstranitev, skeniranje, nalaganje ob zagonu.
- **Manifestni sloj** — `src/lib/plugins/manifest.ts`: Zod nastavitve + za `plugin.json`.
- **Skener** — `src/lib/plugins/scanner.ts`: odkrije vtičnike na disku v imeniku vtičnikov.
- **Nakladalec** — `src/lib/plugins/loader.ts`: sproži vsak vtičnik v ločenem podrejenem procesu Node.js, posredniki pa klice prek IPC. Otrok ni peskovnik (glejte "Izolacija izvajanja vtičnika" spodaj).

## Katalog tržnice

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) vrne seznam
objektov `MarketplaceEntry`:

| Polje         | Vrsta    | Opombe                                       |
| ------------- | -------- | -------------------------------------------- |
| `name`        | string   | Ime vtičnika v zapisu kebab-case             |
| `version`     | string   | semver                                       |
| `description` | string   | Kratek povzetek                              |
| `author`      | string   | Avtor/organizacija                           |
| `license`     | string   | Identifikator licence v slogu SPDX           |
| `downloadUrl` | string   | URL za prenos izvorne kode (lahko je prazen) |
| `repository`  | string?  | Izbirni URL repozitorija                     |
| `tags`        | string[] | Oznake za iskanje/filtriranje                |
| `downloads`   | number   | Število prenosov                             |
| `rating`      | number   | 0–5                                          |
| `verified`    | boolean  | Ali je vnos označen kot preverjen            |
| `lastUpdated` | string   | Datumski niz v obliki, podobni ISO           |

Če URL registra po meri ni konfiguriran, se kot katalog uporabi vgrajeni
`SEED_REGISTRY` (trenutno `request-logger`, `rate-limiter`, `cost-tracker` in
`theme-manager`). Začetni register je vedno na voljo — če konfigurirani oddaljeni
register ni dosegljiv, vrne stanje, ki ni `200`, ali vrne neprepoznano telo
odgovora, `listMarketplacePlugins()` zabeleži opozorilo in uporabi začetni
seznam.

> Opomba: **katalog** tržnice (brskanje/iskanje) je v celoti povezan, vendar
> namestitev z enim klikom iz kataloga tržnice še ni implementirana — gumb
> »Namesti« na vnosu tržnice na nadzorni plošči trenutno prikaže obvestilo
> »kmalu na voljo«. Namestitev trenutno poteka prek postopka namestitve iz
> lokalne poti (`POST /api/plugins`) in odkrivanja na disku
> (`POST /api/plugins/scan`).

## REST API

Vse končne točke zahtevajo avtorizacijo upravljanja (`requireManagementAuth`)** in** sta samo povratna zanka — `/api/plugins` in `/api/plugins/` sta navedena v `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Končna točka                     | Metoda | Opis                                                        |
| -------------------------------- | ------ | ----------------------------------------------------------- |
| `/api/plugins`                   | GET    | Seznam nameščenih vtičnikov (izbirni filter `?status=` )    |
| `/api/plugins`                   | POST   | Namestite vtičnik iz izvornega imenika vtičnikov            |
| `/api/plugins/scan`              | POST   | Preglejte imenik vtičnikov in registrirajte nove vtičnike   |
| `/api/plugins/marketplace`       | GET    | Seznam vnosov v katalog tržnice                             |
| `/api/plugins/[name]`            | GET    | Pridobite podrobnosti nameščenega vtičnika                  |
| `/api/plugins/[name]`            | DELETE | Odstranite vtičnik                                          |
| `/api/plugins/[name]/activate`   | POST   | Aktiviraj (naloži kljuke registra + )                       |
| `/api/plugins/[name]/deactivate` | POST   | Deaktiviraj (proži `onDeactivate`, odjavi kljuke)           |
| `/api/plugins/[name]/config`     | GET    | Pridobite konfiguracijsko + za konfiguracijo vtičnika       |
| `/api/plugins/[name]/config`     | PUT    | Posodobi konfiguracijo vtičnika (preverjeno glede na shemo) |

Filter `GET /api/plugins` `status` sprejme enega od `installed` / `active` / `inactive` / `error`. Neveljavna vrednost vrne `400`.

### Seznam nameščenih vtičnikov

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Namestite z lokalne poti

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` mora biti** absolutno** pot do imenika** znotraj imenika virov vtičnika** : `plugin-sources` poleg korena vtičnika, torej `~/.omniroute/plugin-sources/` privzeto ali `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` ko je ta spremenljivka nastavljena (`getPluginSourcesDir()` v `src/lib/plugins/installSource.ts`). Tam najprej kopirajte ali klonirajte vtičnik. Namestitev je z `400` zavrnjena, če pot vsebuje `..` ali ničelni bajt, leži zunaj tega imenika, se razreši zunaj njega prek simbolne povezave, vsebuje simbolno povezavo, katere cilj je zunaj njega, ali ko imenik ne obstaja. Izvorni imenik mora vsebovati veljaven `plugin.json` (ali biti nadrejeni enemu). Ob uspehu je odgovor `201` z nameščeno vrstico vtičnika.

Za razliko od drugih poti vtičnika ta zahteva poverilnico za upravljanje (sejo nadzorne plošče ali ključ API z obsegom upravljanja), tudi če je prijava onemogočena (`requireLogin=false`): namestitev kode ni nikoli anonimno dejanje.

### Pobrskajte po tržnici

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Posodobite konfiguracijo vtičnika

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` preveri vsako podano vrednost glede na `configSchema` vtičnika (deklarirano v manifestu): polja `number` upoštevajo `min`/`max`, polja `select` se morajo ujemati z deklariranim `enum`. Ključi, ki niso prisotni v shemi, so dovoljeni skozi.

## Konfiguracija

### Imenik vtičnikov

Vtičniki so shranjeni v podatkovnem imeniku OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (ali katera koli datoteka, na katero kaže manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) ta imenik določi v
treh korakih:

1. **`OMNIROUTE_PLUGINS_DIR`**, če je nastavljen — uporabi se dobesedno, ne glede na
   vrednost `HOME`. To je izrecna nastavitev za Docker/K8s, kjer je drevo vtičnikov
   vpeto na poti, ki običajno nima nobene zveze z domačim imenikom vsebnika (#11827).
2. `<home>/.omniroute/plugins`, kjer je `<home>` pridobljen iz okoljskih spremenljivk
   `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, kadar proces sploh ne izvozi domačega imenika.

Določeni imenik se ob zagonu enkrat zabeleži kot `scanner.dir_resolved`, pri čemer je
naveden uporabljeni vhod (`OMNIROUTE_PLUGINS_DIR`, `home` ali `no-home-fallback`) — zato
slika, ki neopazno pristane pri 3. koraku, to izrecno sporoči, namesto da bi prikazala
samo prazen seznam vtičnikov. `POST /api/plugins/scan` v njem odkrije vsak podimenik,
ki vsebuje veljavno datoteko `plugin.json`, in ga registrira; isti imenik je tudi
korenski imenik, v katerega `pluginManager.install()` kopira vtičnike, zato
preglasitev hkrati premakne odkrivanje in namestitev.

> **`OMNIROUTE_PLUGINS_DIR` ni `OMNIROUTE_PLUGIN_PATH`.** Slednjo bere samo nalagalnik
> ukaznih vtičnikov CLI (`bin/cli/plugins.mjs`), da poišče pakete npm `omniroute-cmd-*`,
> ki dodajajo podukaze `omniroute` — na tukaj opisani pregledovalnik med izvajanjem
> nima nobenega vpliva. Za to področje glejte [PLUGINS.md](./PLUGINS.md).

### URL registra tržnice po meri

Vir kataloga tržnice se prebere iz nastavitve `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` bere `settings.pluginMarketplaceUrl`). Ko je
nastavljena na URL `http(s)`, `listMarketplacePlugins()` pridobi vsebino s tega URL-ja
in sprejme bodisi vrhnjo matriko JSON z vnosi bodisi objekt z matriko `plugins`;
vnosi brez vrednosti `name` vrste niz so izločeni. Ko nastavitev ni določena (ali ko
pridobivanje ne prestane zaščite SSRF oziroma vrne neveljaven odgovor), se uporabi
vgrajeni začetni register.

Zavihek »Tržnica« na nadzorni plošči vsebuje polje za ta URL (ki se prebere iz
`GET /api/settings`).

> Opomba glede implementacije: dejanje »Shrani« na nadzorni plošči pošlje
> `pluginMarketplaceUrl` na `PATCH /api/settings`. V času pisanja ta ključ ni
> deklariran v `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), zato v svoji izdaji preverite
> trajnost shranjevanja, preden se nanjo zanesete — pot za **branje**
> (`getSettings()` → `listMarketplacePlugins()`) ključ upošteva, ko je prisoten v
> shrambi nastavitev.

## Varnost

### Samo povratna zanka ravni —

Vtičniki izvajajo kodo v ustvarjenih podrejenih procesih, zato je celotna površina `/api/plugins` razvrščena kot `LOCAL_ONLY` (stopnja 1). Uveljavljanje povratne zanke teče brezpogojno** prej** kakršno koli preverjanje pristnosti, tako da žeton upravljanja, ki je ušel, doseže polje preko tunela, še vedno ne more namestiti, aktivirati ali odstraniti vtičnika. Glejte [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) in trda pravila #15 / #17.

### Tržni register SSRF guard

Registrski URL po meri je konfiguracija, na katero lahko vpliva napadalec, zato ga `listMarketplacePlugins()` preden ga pridobi, izvede skozi dve plasti:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Zavrača vse, kar ni `http:` / `https:`.
   - Zavrača dobesedne gostitelje private/loopback/link-local/ULA (IPv4** in** IPv6, vključno z IPv4-mapped) prek kanoničnega `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Rešuje** oboje** `A` in `AAAA` zabeleži in zavrne if** katerikoli** razrešen naslov je zasebni — zapiranje javnega imena gostitelja → zasebnega IP obvoda.
   - **Ne uspe zaprto** : napaka razrešitve DNS zavrne URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): ponovno uporabi javno zaščito URL ob času pridobivanja in** blokira preusmeritve** (brez javnega → zasebnega `30x` pivota).

URL ki ne uspe na kateri koli plasti, ne prekine zahteve — tržnica se tiho vrne k vgrajenemu semenskemu registru in zabeleži opozorilo.

> Ta zaščita je bila okrepljena v PR #3774 posebej za razrešitev + AAAA in uporabo kanoničnega `isPrivateHost` namesto preverjanja IPv4-only.

### Izolacija izvajanja vtičnika

> **Vtičniki niso v peskovniku.** Otrok je navaden proces Node.js ki se izvaja kot uporabnik OmniRoute, brez konteksta VM in zastavic za dovoljenje Node.js, tako da lahko koda vtičnika bere in piše katero koli datoteko, ki jo lahko uporabnik, izvaja programe in doseže omrežje. `requires.permissions` samo odloči, katere spremenljivke okolja otrok prejme; druga dovoljenja niso uveljavljena. Namestite samo vtičnike, ki jim zaupate. Spodnja meja procesa vsebuje zrušitve in zastoje; to ni varnostna meja.

- **Izolacija procesa** — `loadPlugin()` (`src/lib/plugins/loader.ts`) sproži vsak vtičnik v ločenem podrejenem procesu Node.js in komunicira prek IPC. Klici na kljukico imajo časovno omejitev z `SIGTERM` → `SIGKILL` stopnjevanjem.
- **Env dovoljeni seznam** — otrok prejme samo niz dovoljenih spremenljivk okolja; širši nabor je odobren le, ko manifest zahteva dovoljenje `env`.
- **Namestite zadrževanje vira** — `POST /api/plugins` bere samo iz izvornega imenika vtičnika (glejte »Namestitev z lokalne poti«): pot je kanonializirana z `realpath`, mora ostati strogo znotraj tega imenika in izvorno drevo, ki nosi simbolno povezavo, ki ji uide, je zavrnjeno, preden se karkoli kopira.
- **Zadrževanje poti** — install/upgrade/uninstall trdi, da imenik vtičnikov in `manifest.main` razrešita** znotraj** upravljani koren vtičnika pred kakršno koli kopijo ali rekurzivnim brisanjem (ščiti pred spremenjenimi potmi DB in prehodom `../` v `manifest.main`). Aktivacija razreši simbolne povezave prek `realpath` in zavrne nalaganje vstopne točke, ki uide iz imenika vtičnikov.
- **Izbirni zatič za celovitost** — lahko manifest deklarira polje `integrity` (format `sha256-<base64>`, SRI ). Ko je prisoten, nalagalnik preveri zgoščeno vrednost vnosne datoteke ob času nalaganja in zavrne aktiviranje ob neujemanju. Je opt-in zaznavanje posegov,** ne** varnostna meja: ne omejuje, kaj lahko naredi naložen vtičnik.
- **V kavljih ni poverilnic odjemalca** — kontekst, posredovan v `onRequest`, `onResponse` in `onError` ima odstranjene glave `authorization`, `x-api-key`, `proxy-authorization` in `cookie`, zapis ključa API pa nima vrednosti ključa (`redactPluginContext()` v `src/lib/plugins/hooks.ts`).

## Manifest (`plugin.json`)

Potrjeno z `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Polje              | Vrsta       | Opombe                                                                 |
| ------------------ | ----------- | ---------------------------------------------------------------------- |
| `name`             | niz         | Obvezno; kebab-case (`^[a-z0-9-]+$`), 1–100 znakov                     |
| `version`          | niz         | Obvezno; semver (`MAJOR.MINOR.PATCH`)                                  |
| `description`      | niz?        | ≤ 500 znakov                                                           |
| `author`           | niz?        | ≤ 200 znakov                                                           |
| `license`          | niz?        | Privzeto je `MIT`                                                      |
| `main`             | niz?        | Vstopna datoteka; privzeto je `index.js`                               |
| `source`           | enum?       | `local` \| `marketplace` (privzeto `local`)                            |
| `tags`             | niz []?     | Iskanje oznak                                                          |
| `requires`         | predmet?    | `{ omniroute?, permissions[] }`                                        |
| `hooks`            | predmet?    | Logične vrednosti, ki navajajo, katere kljuke implementira vtičnik     |
| `skills`           | predmet []? | Izbirne definicije spretnosti                                          |
| `enabledByDefault` | logično?    | Samodejno aktiviraj ob namestitvi                                      |
| `configSchema`     | predmet?    | Zemljevid konfiguracijskih polj (`string`/`number`/`boolean`/`select`) |
| `integrity`        | niz?        | Izbirni pin za vstopno datoteko `sha256-<base64>`                      |

Dovoljenja so črpana iz enuma `network` / `file-read` / `file-write` / `env` / `exec`. Samo `env` ima učinek izvajalnega časa (nekoliko večji seznam dovoljenih spremenljivk okolja za otroka); drugi so deklaracije in se ne uveljavljajo.

## Potek življenjskega cikla

```
install (POST /api/plugins, pot)
  → pregled/preverjanje manifesta → kopiranje v začasno območje → preverjanje, ali je main znotraj imenika
  → atomsko preimenovanje v ~/.omniroute/plugins/<name> → vstavljanje vrstice v podatkovno zbirko
  → sprožitev onInstall → če je enabledByDefault: aktiviranje

activate (POST /api/plugins/{name}/activate)
  → preverjanje vsebovanosti z realpath → loadPlugin() (zagon podrejenega procesa)
  → registracija navedenih kavljev → status = "active" → sprožitev onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → sprožitev onDeactivate (PRED odjavo) → odjava kavljev
  → zaustavitev podrejenega procesa → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deaktiviranje, če je aktiven → sprožitev onUninstall
  → rekurzivno brisanje imenika vtičnika s preverjanjem vsebovanosti → brisanje vrstice iz podatkovne zbirke
```

Ponovni zagon `install` za imenik, katerega različica manifesta je **strogo
novejša** od nameščene različice, samodejno izvede nadgradnjo (čista ponovna namestitev; konfiguracija se
ponastavi na privzete vrednosti). Enaka ali starejša različica je zavrnjena.

## Podatkovna zbirka

Tabela `plugins` (migracija `076_create_plugins.sql`):

| Stolpec         | Vrsta   | Opombe                                               |
| --------------- | ------- | ---------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                 |
| `name`          | TEXT    | Enolično                                             |
| `version`       | TEXT    | semver; privzeto `1.0.0`                             |
| `description`   | TEXT    | Izbirno                                              |
| `author`        | TEXT    | Izbirno                                              |
| `license`       | TEXT    | Privzeto `MIT`                                       |
| `main`          | TEXT    | Vstopna datoteka; privzeto `index.js`                |
| `source`        | TEXT    | Privzeto `local`                                     |
| `tags`          | TEXT    | Polje JSON; privzeto `[]`                            |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`     |
| `enabled`       | INT     | 0/1; privzeto 0                                      |
| `manifest`      | TEXT    | Celoten JSON manifesta                               |
| `config`        | TEXT    | JSON; privzeto `{}`                                  |
| `config_schema` | TEXT    | JSON; privzeto `{}`                                  |
| `hooks`         | TEXT    | Polje JSON z navedenimi imeni kavljev; privzeto `[]` |
| `permissions`   | TEXT    | Polje JSON; privzeto `[]`                            |
| `plugin_dir`    | TEXT    | Absolutni namestitveni imenik                        |
| `error_message` | TEXT    | Nastavljeno, ko je `status = "error"`                |
| `installed_at`  | TEXT    | `datetime('now')`                                    |
| `updated_at`    | TEXT    | `datetime('now')`                                    |
| `activated_at`  | TEXT    | Nastavljeno ob aktiviranju                           |

Metrike in analitika vtičnikov se spremljajo v dodatnih tabelah
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Nadzorna plošča

Stran nadzorne plošče na `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) ponuja dva zavihka:

- **Nameščeno** — navaja nameščene vtičnike z njihovimi deklariranimi kljukicami, preklopom activate/deactivate, gumbom za odstranitev in dejanjem »Išči vtičnike« (`POST /api/plugins/scan`).
- **Tržnica** — prikazuje katalog iz `GET /api/plugins/marketplace` s poljem za nastavitev registra po meri URL.

Na strani je vedno prikazano opozorilo, da se vtičniki izvajajo s polnimi pravicami procesa OmniRoute.

Konfiguracijska stran za vsak vtičnik je na `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Glejte tudi

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  zakaj je `/api/plugins` dostopen samo prek povratne zanke (1. raven)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — povezano ogrodje veščin
  (`src/lib/skills/`); vtičniki lahko deklarirajo veščine v svojem manifestu
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — izhodne integracije,
  ki jih sprožajo dogodki
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  vzorec `buildErrorBody()`, ki ga za odgovore o napakah uporablja vsaka pot vtičnika
