# Plugin Marketplace (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Izvor istine:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` i
> `src/app/(dashboard)/dashboard/plugins/`
> **Posljednje ažuriranje:** 2026-06-28 — v3.8.40

OmniRoute dolazi sa sustavom dodataka nalik onome u WordPressu. Dodaci su samostalni
direktoriji — svaki s manifestom `plugin.json` i ulaznom datotekom — koji se povezuju
s tijekom obrade zahtjeva (`onRequest` / `onResponse` / `onError`) i
događajima životnog ciklusa (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Trgovina dodataka** sloj je za otkrivanje izgrađen povrh tog sustava. Ona
nudi katalog dostupnih dodataka koji se može pregledavati. Prema zadanim postavkama katalog je
mali ugrađeni početni registar; operator ga može usmjeriti na prilagođeni URL
udaljenog registra, pri čemu je dohvaćanje zaštićeno SSRF zaštitom s razrješavanjem DNS-a
(pogledajte [Sigurnost](#security)).

Sve rute dodataka dostupne su **samo preko povratne petlje** (razina 1 — `LOCAL_ONLY`): dodaci učitavaju
i izvršavaju kôd u podređenim procesima, stoga rute nisu dostupne iz izvora koji nije
povratna petlja, bez obzira na autentifikaciju. Pogledajte
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Kako odgovara Together

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

- **Sloj registra** — `src/lib/plugins/marketplace.ts`: ispisuje / pretražuje katalog, vraćajući se na registar sjemena u slučaju bilo kakvog kvara.
- **Sloj životnog ciklusa** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): instaliraj, nadogradi, aktiviraj, deaktiviraj, deinstaliraj, skeniraj, učitaj pri pokretanju.
- **Manifestni sloj** — `src/lib/plugins/manifest.ts`: Zod shema + zadane postavke za `plugin.json`.
- **Skener** — `src/lib/plugins/scanner.ts`: otkriva dodatke na disku u direktoriju dodataka.
- **Utovarivač** — `src/lib/plugins/loader.ts`: stvara svaki dodatak u zasebnom Node.js podređenom procesu i brokeri spajaju pozive preko IPC. Dijete nije sandbox (pogledajte "Izolacija izvršavanja dodatka" u nastavku).

## Katalog trgovine

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) vraća popis
objekata `MarketplaceEntry`:

| Polje         | Vrsta    | Napomene                                     |
| ------------- | -------- | -------------------------------------------- |
| `name`        | string   | Naziv dodatka u formatu kebab-case           |
| `version`     | string   | semver                                       |
| `description` | string   | Kratak sažetak                               |
| `author`      | string   | Autor / organizacija                         |
| `license`     | string   | Identifikator licence u stilu SPDX-a         |
| `downloadUrl` | string   | URL za preuzimanje izvora (može biti prazan) |
| `repository`  | string?  | Neobavezni URL repozitorija                  |
| `tags`        | string[] | Oznake za pretraživanje/filtriranje          |
| `downloads`   | number   | Broj preuzimanja                             |
| `rating`      | number   | 0–5                                          |
| `verified`    | boolean  | Je li unos označen kao provjeren             |
| `lastUpdated` | string   | Datumski niz približno u ISO formatu         |

Kada nije konfiguriran prilagođeni URL registra, katalog je ugrađeni
`SEED_REGISTRY` (trenutačno `request-logger`, `rate-limiter`, `cost-tracker` i
`theme-manager`). Početni registar uvijek je dostupan — ako je konfigurirani udaljeni
registar nedostupan, vrati status koji nije `200` ili vrati neprepoznato
tijelo, `listMarketplacePlugins()` bilježi upozorenje i vraća se na početni popis.

> Napomena: **katalog** trgovine (pregledavanje/pretraživanje) povezan je od početka do kraja, ali
> **instalacija** jednim klikom iz kataloga još nije implementirana —
> gumb "Instaliraj" na unosu trgovine na nadzornoj ploči trenutačno prikazuje
> obavijest "uskoro dostupno". Instalacija se trenutačno obavlja putem postupka instalacije
> s lokalne putanje (`POST /api/plugins`) i otkrivanja na disku (`POST /api/plugins/scan`).

## REST API

Sve krajnje točke zahtijevaju autorizaciju upravljanja (`requireManagementAuth`)** i** su samo povratna petlja — `/api/plugins` i `/api/plugins/` navedeni su u `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Krajnja točka                    | metoda | Opis                                                        |
| -------------------------------- | ------ | ----------------------------------------------------------- |
| `/api/plugins`                   | GET    | Popis instaliranih dodataka (opcijski `?status=` filter)    |
| `/api/plugins`                   | POST   | Instalirajte dodatak iz direktorija izvora dodataka         |
| `/api/plugins/scan`              | POST   | Skenirajte direktorij dodataka i registrirajte nove dodatke |
| `/api/plugins/marketplace`       | GET    | Popis unosa kataloga tržišta                                |
| `/api/plugins/[name]`            | GET    | Dobijte pojedinosti instaliranog dodatka                    |
| `/api/plugins/[name]`            | DELETE | Deinstalirajte dodatak                                      |
| `/api/plugins/[name]/activate`   | POST   | Aktiviraj (učitaj kuke + registra)                          |
| `/api/plugins/[name]/deactivate` | POST   | Deaktiviraj (isključi `onDeactivate`, odjavi kuke)          |
| `/api/plugins/[name]/config`     | GET    | Nabavite shemu konfiguracije dodatka +                      |
| `/api/plugins/[name]/config`     | PUT    | Ažuriranje konfiguracije dodatka (provjereno prema shemi)   |

`GET /api/plugins` `status` filtar prihvaća jedan od `installed` / `active` / `inactive` / `error`. Nevažeća vrijednost vraća `400`.

### Popis instaliranih dodataka

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Instaliraj s lokalnog puta

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` mora biti an** apsolutni** put do imenika** unutar direktorija izvora dodataka** : `plugin-sources` pored korijena dodatka, dakle `~/.omniroute/plugin-sources/` prema zadanim postavkama ili `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` kada je ta varijabla postavljena (`getPluginSourcesDir()` u `src/lib/plugins/installSource.ts`). Najprije tamo kopirajte ili klonirajte dodatak. Instalacija se odbija sa `400` kada staza sadrži `..` ili null bajt, leži izvan tog direktorija, rješava se izvan njega kroz simboličku vezu, sadrži simboličku vezu čiji je cilj izvan njega ili kada direktorij ne postoji. Izvorni direktorij mora sadržavati važeći `plugin.json` (ili biti roditelj jednog). Nakon uspjeha odgovor je `201` s redom instaliranog dodatka.

Za razliku od drugih smjerova dodatka, ovaj zahtijeva vjerodajnicu za upravljanje (sesija nadzorne ploče ili API ključ s opsegom upravljanja) čak i kada je prijava onemogućena (`requireLogin=false`): instaliranje koda nikada nije anonimna radnja.

### Pregledajte tržište

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Ažurirajte konfiguraciju dodatka

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` provjerava svaku danu vrijednost prema `configSchema` dodatka (deklarisanom u manifestu): `number` polja poštuju `min`/`max`, `select` polja moraju odgovarati deklariranom `enum`. Ključevi koji nisu prisutni u shemi su dopušteni.

## Konfiguracija

### Direktorij dodataka

Dodaci se nalaze unutar podatkovnog direktorija OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (ili bilo što na što upućuje manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) određuje taj direktorij u
tri koraka:

1. **`OMNIROUTE_PLUGINS_DIR`**, kada je postavljen — koristi se doslovno, neovisno o vrijednosti `HOME`. To je
   izričita postavka za Docker/K8s, gdje je stablo dodataka vezano montirano na putanji
   koja obično nema nikakve veze s početnim direktorijem spremnika (#11827).
2. `<home>/.omniroute/plugins`, gdje se `<home>` dobiva iz varijabli okruženja `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, kada proces uopće ne izvozi početni direktorij.

Određeni direktorij zapisuje se jednom pri pokretanju kao `scanner.dir_resolved`, uz navođenje
odabranog ulaza (`OMNIROUTE_PLUGINS_DIR`, `home` ili `no-home-fallback`) — tako slika
koja neprimjetno završi na 3. koraku to izričito navodi, umjesto da samo prijavi prazan popis dodataka.
`POST /api/plugins/scan` otkriva svaki poddirektorij koji sadržava valjanu datoteku
`plugin.json` i registrira ga; isti je direktorij korijen u koji
`pluginManager.install()` kopira dodatke, pa nadjačavanje zajedno premješta otkrivanje i
instalaciju.

> **`OMNIROUTE_PLUGINS_DIR` nije `OMNIROUTE_PLUGIN_PATH`.** Potonju vrijednost čita samo
> učitavač naredbenih dodataka CLI-ja (`bin/cli/plugins.mjs`) kako bi pronašao npm
> pakete `omniroute-cmd-*` koji dodaju podnaredbe naredbi `omniroute` — ona nema utjecaja na skener tijekom izvođenja
> opisan ovdje. Za taj dio pogledajte [PLUGINS.md](./PLUGINS.md).

### Prilagođeni URL registra trgovine dodataka

Izvor kataloga trgovine dodataka čita se iz postavke `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` čita `settings.pluginMarketplaceUrl`). Kada
je postavljen na `http(s)` URL, `listMarketplacePlugins()` dohvaća taj URL i prihvaća
ili JSON polje stavki najviše razine ili objekt s poljem `plugins`;
stavke bez znakovnog `name` filtriraju se. Kada nije postavljen (ili kada dohvaćanje
ne prođe SSRF zaštitu / vrati neispravan odgovor), upotrebljava se ugrađeni početni registar.

Kartica "Trgovina dodataka" na nadzornoj ploči prikazuje polje za ovaj URL (koje se ponovno učitava putem
`GET /api/settings`).

> Napomena o implementaciji: radnja "Spremi" na nadzornoj ploči šalje
> `pluginMarketplaceUrl` na `PATCH /api/settings`. U trenutku pisanja ovaj
> ključ nije deklariran u `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), stoga prije oslanjanja na njega provjerite trajnost postavke u svojem
> izdanju — putanja za **čitanje** (`getSettings()` →
> `listMarketplacePlugins()`) poštuje ključ nakon što je prisutan u spremištu
> postavki.

## Sigurnost

### Ruta samo — povratna petlja

Dodaci izvršavaju kod u stvorenim podređenim procesima, tako da je cijela `/api/plugins` površina klasificirana kao `LOCAL_ONLY` (Tier 1). Provedba povratne petlje radi bezuvjetno** prije** bilo kakvu provjeru autentifikacije, tako da procurili upravljački token koji stigne do okvira preko tunela i dalje ne može instalirati, aktivirati ili deinstalirati dodatak. Pogledajte [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) i čvrsta pravila #15 / #17.

### SSRF registra tržišta

Prilagođeni registar URL je konfiguracija na koju napadač može utjecati, pa ga `listMarketplacePlugins()` prije dohvaćanja provodi kroz dva sloja:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Odbija sve što nije `http:` / `https:`.
   - Odbacuje doslovne private/loopback/link-local/ULA hostove (IPv4** i** IPv6, uključujući IPv4-mapped) preko kanonskog `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Rješava** oba** `A` i `AAAA` bilježi i odbija if** bilo koji** razriješena adresa je privatna — zatvaranje public-hostname → private-IP premosnice.
   - **Neuspješno zatvoreno** : neuspjeh razlučivanja DNS odbacuje URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): ponovno primjenjuje zaštitu samo za javnost URL u vrijeme dohvaćanja i** blokira preusmjeravanja** (nema javnog → privatnog `30x` pivota).

URL koji ne uspije bilo koji sloj ne prekida zahtjev — tržište se tiho vraća na ugrađeni početni registar i bilježi upozorenje.

> Ova zaštita je ojačana u PR #3774 posebno za rješavanje A + AAAA i korištenje kanonske `isPrivateHost` umjesto IPv4-only provjere.

### Izolacija izvođenja dodataka

> **Dodaci nisu u sandboxu.** Dijete je običan Node.js proces koji se izvodi kao OmniRoute korisnik, bez VM konteksta i Node.js oznaka dopuštenja, tako da kod dodatka može čitati i pisati bilo koju datoteku koju korisnik može, pokretati programe i doseći mrežu. `requires.permissions` samo odlučuje koje varijable okruženja dijete prima; ostale se dozvole ne provode. Instalirajte samo dodatke kojima vjerujete. Granica procesa ispod sadrži padove i zastoje; to nije sigurnosna granica.

- **Izolacija procesa** — `loadPlugin()` (`src/lib/plugins/loader.ts`) pokreće svaki dodatak u zasebnom procesu djeteta Node.js i komunicira preko IPC. Hook pozivi imaju vremensko ograničenje s `SIGTERM` → `SIGKILL` eskalacijom.
- **Env popis dopuštenih** — dijete prima samo dopušteni skup varijabli okoline; širi skup se odobrava samo kada manifest zahtijeva dopuštenje `env`.
- **Ugradite zaštitu izvora** — `POST /api/plugins` čita samo iz izvornog direktorija dodatka (pogledajte "Instalacija s lokalne staze"): staza je kanonizirana sa `realpath`, mora ostati strogo unutar tog direktorija, a izvorno stablo koje nosi simboličku vezu koja izmiče odbija se prije nego što se išta kopira.
- **Ograničenje staze** — install/upgrade/uninstall tvrdi da direktorij dodataka i `manifest.main` rješavaju** unutar** upravljani korijen dodatka prije bilo kakvog kopiranja ili rekurzivnog brisanja (štiti od neovlaštenih DB staza i `../` traversal u `manifest.main`). Aktivacija rješava simboličke veze putem `realpath` i odbija učitavanje ulazne točke koja izbjegava direktorij dodataka.
- **Dodatna igla za integritet** — manifest može deklarirati `integrity` (`sha256-<base64>`, SRI format) polje. Kada je prisutan, učitavač provjerava hash ulazne datoteke u vrijeme učitavanja i odbija se aktivirati u slučaju neslaganja. To je opt-in otkrivanje neovlaštenog otvaranja,** ne** sigurnosna granica: ne ograničava ono što učitani dodatak može učiniti.
- **Nema vjerodajnica klijenta u kukicama** — kontekst proslijeđen `onRequest`, `onResponse` i `onError` ima uklonjena zaglavlja `authorization`, `x-api-key`, `proxy-authorization` i `cookie`, a zapis ključa API ne nosi vrijednost ključa (`redactPluginContext()` u `src/lib/plugins/hooks.ts`).

## Manifest (`plugin.json`)

Potvrdio `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Polje              | Tip         | Bilješke                                                            |
| ------------------ | ----------- | ------------------------------------------------------------------- |
| `name`             | niz         | Potreban; kutija za ćevape (`^[a-z0-9-]+$`), 1–100 znakova          |
| `version`          | niz         | Potreban; semver (`MAJOR.MINOR.PATCH`)                              |
| `description`      | niz?        | ≤ 500 znakova                                                       |
| `author`           | niz?        | ≤ 200 znakova                                                       |
| `license`          | niz?        | Zadano je `MIT`                                                     |
| `main`             | niz?        | Ulazna datoteka; zadano je `index.js`                               |
| `source`           | nabrajanje? | `local` \| `marketplace` (zadano `local`)                           |
| `tags`             | niz[]?      | Oznake za pretraživanje                                             |
| `requires`         | objekt?     | `{ omniroute?, permissions[] }`                                     |
| `hooks`            | objekt?     | Booleovi znaci koji deklariraju koje zakačice implementira dodatak  |
| `skills`           | objekt[]?   | Izborne definicije vještina                                         |
| `enabledByDefault` | Booleov?    | Automatsko aktiviranje pri instalaciji                              |
| `configSchema`     | objekt?     | Karta konfiguracijskih polja (`string`/`number`/`boolean`/`select`) |
| `integrity`        | niz?        | Dodatni `sha256-<base64>` pin ulazne datoteke                       |

Dozvole se izvlače iz enuma `network` / `file-read` / `file-write` / `env` / `exec`. Samo `env` ima učinak vremena izvođenja (malo veći popis dopuštenih varijabli okruženja za dijete); ostali su deklaracije i ne provode se.

## Tijek životnog ciklusa

```
instalacija (POST /api/plugins, putanja)
  → skeniraj/provjeri manifest → kopiraj u pripremni direktorij → potvrdi da je glavna datoteka unutar direktorija
  → atomski preimenuj u ~/.omniroute/plugins/<name> → umetni redak u bazu podataka
  → pokreni onInstall → ako je enabledByDefault: aktiviraj

aktivacija (POST /api/plugins/{name}/activate)
  → provjera sadržanosti pomoću realpath → loadPlugin() (pokreni podređeni proces)
  → registriraj deklarirane kuke → status = "active" → pokreni onActivate

deaktivacija (POST /api/plugins/{name}/deactivate)
  → pokreni onDeactivate (PRIJE poništavanja registracije) → poništi registraciju kuka
  → prekini podređeni proces → status = "inactive"

deinstalacija (DELETE /api/plugins/{name})
  → deaktiviraj ako je aktivan → pokreni onUninstall
  → rekurzivno izbriši direktorij dodatka uz provjeru sadržanosti → izbriši redak iz baze podataka
```

Ponovno pokretanje naredbe `install` nad direktorijem čija je verzija manifesta **strogo
novija** od instalirane verzije automatski izvršava nadogradnju (čista ponovna instalacija; konfiguracija se vraća
na zadane vrijednosti). Ista ili starija verzija se odbija.

## Baza podataka

Tablica `plugins` (migracija `076_create_plugins.sql`):

| Stupac          | Vrsta   | Napomene                                         |
| --------------- | ------- | ------------------------------------------------ |
| `id`            | TEXT PK | UUID                                             |
| `name`          | TEXT    | Jedinstveno                                      |
| `version`       | TEXT    | semver; zadano `1.0.0`                           |
| `description`   | TEXT    | Neobavezno                                       |
| `author`        | TEXT    | Neobavezno                                       |
| `license`       | TEXT    | Zadano `MIT`                                     |
| `main`          | TEXT    | Ulazna datoteka; zadano `index.js`               |
| `source`        | TEXT    | Zadano `local`                                   |
| `tags`          | TEXT    | JSON polje; zadano `[]`                          |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error` |
| `enabled`       | INT     | 0/1; zadano 0                                    |
| `manifest`      | TEXT    | Cijeli JSON manifesta                            |
| `config`        | TEXT    | JSON; zadano `{}`                                |
| `config_schema` | TEXT    | JSON; zadano `{}`                                |
| `hooks`         | TEXT    | JSON polje deklariranih naziva kuka; zadano `[]` |
| `permissions`   | TEXT    | JSON polje; zadano `[]`                          |
| `plugin_dir`    | TEXT    | Apsolutni instalacijski direktorij               |
| `error_message` | TEXT    | Postavlja se kada je `status = "error"`          |
| `installed_at`  | TEXT    | `datetime('now')`                                |
| `updated_at`    | TEXT    | `datetime('now')`                                |
| `activated_at`  | TEXT    | Postavlja se pri aktivaciji                      |

Metrike i analitika dodataka prate se u dodatnim tablicama
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Nadzorna ploča

Stranica nadzorne ploče na `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) nudi dvije kartice:

- **instalirano** — navodi instalirane dodatke s njihovim deklariranim kukicama, activate/deactivate prekidačem, gumbom za deinstalaciju i radnjom "Skeniraj dodatke" (`POST /api/plugins/scan`).
- **Tržnica** — prikazuje katalog iz `GET /api/plugins/marketplace` s poljem za postavljanje prilagođenog registra URL.

Stranica uvijek prikazuje upozorenje da se dodaci pokreću s punim privilegijama OmniRoute procesa.

Konfiguracijska stranica za svaki dodatak nalazi se na `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Vidi također

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  zašto je `/api/plugins` dostupan samo putem povratne petlje (razina 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — povezani okvir vještina
  (`src/lib/skills/`); dodaci mogu deklarirati vještine u svojem manifestu
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — izlazne integracije
  pokretane događajima
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  obrazac `buildErrorBody()` koji svaka ruta dodatka koristi za odgovore o pogreškama
