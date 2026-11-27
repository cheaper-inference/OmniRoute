# Plugin Marketplace (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

# Tržište dodataka

> **Izvor istine:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/`, i
> `src/app/(dashboard)/dashboard/plugins/`
> **Posljednje ažurirano:** 2026-06-28 — v3.8.40

OmniRoute isporučuje sistem dodataka u WordPress stilu. Dodaci su samostalni direktoriji — svaki sa `plugin.json` manifestom i ulaznom datotekom — koji se povezuju na cjevovod zahtjeva (`onRequest` / `onResponse` / `onError`) i na događaje životnog ciklusa (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Tržište dodataka** (Plugin Marketplace) je sloj za otkrivanje iznad tog sistema. Ono izlaže katalog dodataka koji se mogu instalirati i koji se može pregledavati. Po zadanim postavkama, katalog je mali ugrađeni početni registar; operater ga može usmjeriti na prilagođeni URL udaljenog registra, u kojem slučaju je dohvaćanje ojačano SSRF zaštitom koja razrješava DNS (pogledajte [Sigurnost](#security)).

Svaka ruta dodatka je **samo za povratnu petlju (loopback)** (Nivo 1 — `LOCAL_ONLY`): dodaci učitavaju i izvršavaju kod u podprocesima, tako da su rute nedostupne iz izvora koji nije povratna petlja bez obzira na autentifikaciju. Pogledajte [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

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

- **Sloj registra** — `src/lib/plugins/marketplace.ts`: lista / pretražuje katalog, vraćajući se u početni registar u slučaju bilo kakvog kvara.
- **Sloj životnog ciklusa** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): instalirajte, nadogradite, aktivirajte, deaktivirajte, deinstalirajte, skenirajte, učitajte pri pokretanju.
- **Manifestni sloj** — `src/lib/plugins/manifest.ts`: Zod shema + zadane vrijednosti za `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: otkriva dodatke na disku ispod direktorija dodataka.
- **Utovarivač** — `src/lib/plugins/loader.ts`: pokreće svaki dodatak u zasebnom Node.js podređenom procesu i posrednici spajaju pozive preko IPC. Dijete nije sandbox (pogledajte "Izolacija izvođenja dodataka" ispod).

## Katalog tržišta

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) vraća listu `MarketplaceEntry` objekata:

| Polje         | Tip      | Bilješke                                     |
| ------------- | -------- | -------------------------------------------- |
| `name`        | string   | ime dodatka u kebab-case formatu             |
| `version`     | string   | semver                                       |
| `description` | string   | Kratki sažetak                               |
| `author`      | string   | Autor / org                                  |
| `license`     | string   | ID licence u SPDX stilu                      |
| `downloadUrl` | string   | URL za preuzimanje izvora (može biti prazan) |
| `repository`  | string?  | Opcioni URL repozitorija                     |
| `tags`        | string[] | Oznake za pretragu/filtriranje               |
| `downloads`   | number   | Broj preuzimanja                             |
| `rating`      | number   | 0–5                                          |
| `verified`    | boolean  | Da li je unos označen kao provjeren          |
| `lastUpdated` | string   | ISO-ish datumski string                      |

Kada nije konfigurisan prilagođeni URL registra, katalog je ugrađeni `SEED_REGISTRY` (trenutno `request-logger`, `rate-limiter`, `cost-tracker` i `theme-manager`). Početni registar je uvijek dostupan — ako je konfigurisan udaljeni registar nedostupan, vraća status koji nije `200` ili vraća neprepoznatljivo tijelo odgovora, `listMarketplacePlugins()` bilježi upozorenje i vraća se na početnu listu.

> Napomena: katalog tržišta (pregled/pretraga) je povezan od kraja do kraja, ali instalacija na tržištu jednim klikom iz kataloga još nije implementirana — dugme "Instaliraj" na kontrolnoj tabli za unos na tržištu trenutno prikazuje obavijest "uskoro". Instalacija se danas odvija kroz tok instalacije lokalne putanje (`POST /api/plugins`) i otkrivanje na disku (`POST /api/plugins/scan`).

## REST API

Sve krajnje tačke zahtijevaju autorizaciju upravljanja (`requireManagementAuth`)** i** su samo za petlju — `/api/plugins` i `/api/plugins/` su navedeni u `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Krajnja tačka                    | Metoda | Opis                                                        |
| -------------------------------- | ------ | ----------------------------------------------------------- |
| `/api/plugins`                   | GET    | Lista instaliranih dodataka (opcionalni `?status=` filter)  |
| `/api/plugins`                   | POST   | Instalirajte dodatak iz direktorija izvora dodataka         |
| `/api/plugins/scan`              | POST   | Skenirajte direktorij dodataka i registrirajte nove dodatke |
| `/api/plugins/marketplace`       | GET    | Navedite unose u katalogu tržišta                           |
| `/api/plugins/[name]`            | GET    | Preuzmite detalje o instaliranom dodatku                    |
| `/api/plugins/[name]`            | DELETE | Deinstalirajte dodatak                                      |
| `/api/plugins/[name]/activate`   | POST   | Aktiviraj (učitaj + registar kuke)                          |
| `/api/plugins/[name]/deactivate` | POST   | Deaktiviraj (ispali `onDeactivate`, odjavi kuke)            |
| `/api/plugins/[name]/config`     | GET    | Nabavite konfiguraciju plugina + konfiguracijsku šemu       |
| `/api/plugins/[name]/config`     | PUT    | Ažuriraj konfiguraciju dodatka (potvrđeno prema šemi)       |

Filter `GET /api/plugins` `status` prihvata jedan od `installed` / `active` / `inactive` / `error`. Nevažeća vrijednost vraća `400`.

### Lista instaliranih dodataka

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Instalirajte s lokalne staze

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` mora biti an** apsolutno** put do direktorija** unutar direktorija izvora dodataka** : `plugin-sources` pored korijena dodatka, dakle `~/.omniroute/plugin-sources/` po defaultu, ili `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` kada je ta varijabla postavljena (`getPluginSourcesDir()` u `src/lib/plugins/installSource.ts`). Prvo kopirajte ili klonirajte dodatak tamo. Instalacija je odbijena sa `400` kada putanja sadrži `..` ili null bajt, leži izvan tog direktorija, rješava se izvan njega kroz simboličku vezu, sadrži simboličku vezu čiji je cilj izvan njega ili kada direktorij ne postoji. Izvorni direktorij mora sadržavati važeći `plugin.json` (ili biti njegov roditelj). Po uspjehu odgovor je `201` s instaliranim redom dodatka.

Za razliku od drugih ruta dodataka, ovaj zahtijeva vjerodajnice za upravljanje (sesiju kontrolne ploče ili API ključ s opsegom upravljanja) čak i kada je prijava onemogućena (`requireLogin=false`): instaliranje koda nikada nije anonimna radnja.

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

`PUT .../config` potvrđuje svaku datu vrijednost u odnosu na `configSchema` dodatka (deklariran u manifestu): `number` polja poštuju `min`/`max`, `select` polja moraju odgovarati deklariranom `enum`. Ključevi koji nisu prisutni u šemi su dozvoljeni.

## Konfiguracija

### Direktorij dodataka

Dodaci se nalaze u OmniRoute podatkovnom direktoriju:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (ili na šta god manifest.main ukazuje)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) razrješava taj direktorij u tri koraka:

1. **`OMNIROUTE_PLUGINS_DIR`**, kada je postavljen — koristi se doslovno, bez obzira na to šta `HOME` kaže. Ovo je eksplicitna kontrola za Docker/K8s, gdje je stablo dodataka bind-mountano na putanju koja obično nema nikakve veze sa početnim (home) direktorijem kontejnera (#11827).
2. `<home>/.omniroute/plugins`, gdje `<home>` dolazi iz `HOME` / `USERPROFILE` varijabli okruženja.
3. `/tmp/.omniroute/plugins`, kada proces uopće ne eksportuje home.

Razriješeni direktorij se loguje jednom pri pokretanju kao `scanner.dir_resolved`, imenujući ulaz koji je pobijedio (`OMNIROUTE_PLUGINS_DIR`, `home`, ili `no-home-fallback`) — tako da slika (image) koja tiho završi na koraku 3 to i prijavi, umjesto da samo prijavi praznu listu dodataka. `POST /api/plugins/scan` otkriva bilo koji poddirektorij tamo koji sadrži validan `plugin.json` i registruje ga; isti direktorij je korijen u koji `pluginManager.install()` kopira dodatke, tako da override pomjera otkrivanje i instalaciju zajedno.

> **`OMNIROUTE_PLUGINS_DIR` nije `OMNIROUTE_PLUGIN_PATH`.** Potonje čita samo CLI učitavač komandnih dodataka (`bin/cli/plugins.mjs`) kako bi pronašao `omniroute-cmd-*` npm pakete koji dodaju `omniroute` podkomande — to nema nikakvog efekta na runtime skener opisan ovdje. Pogledajte [PLUGINS.md](./PLUGINS.md) za tu stranu.

### Prilagođeni URL registra tržišta

Izvor kataloga tržišta se čita iz `pluginMarketplaceUrl` postavke (`src/lib/plugins/marketplace.ts` čita `settings.pluginMarketplaceUrl`). Kada je postavljen na `http(s)` URL, `listMarketplacePlugins()` dohvaća taj URL i prihvata ili JSON niz unosa na najvišem nivou ili objekat sa `plugins` nizom; unosi bez stringa `name` se filtriraju. Kada nije postavljen (ili kada dohvaćanje ne prođe SSRF zaštitu / vrati loš odgovor), koristi se ugrađeni početni registar.

Kartica "Marketplace" na kontrolnoj ploči (dashboard) izlaže polje za ovaj URL (koje se čita nazad iz `GET /api/settings`).

> Napomena o implementaciji: akcija "Save" na kontrolnoj ploči šalje `pluginMarketplaceUrl` na `PATCH /api/settings`. U trenutku pisanja, ovaj ključ nije deklarisan u `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`), stoga provjerite perzistenciju u vašem izdanju prije nego što se oslonite na njega — **putanja čitanja** (`getSettings()` → `listMarketplacePlugins()`) poštuje ključ čim je prisutan u skladištu postavki.

## Sigurnost

### Rutirajte samo — loopback

Dodaci izvršavaju kod u podređenim procesima, tako da je cijela `/api/plugins` površina klasifikovana `LOCAL_ONLY` (Tier 1). Provedba povratne petlje radi bezuvjetno** prije** bilo kakvu provjeru autentifikacije, tako da procureli token upravljanja koji dospijeva u kutiju preko tunela i dalje ne može instalirati, aktivirati ili deinstalirati dodatak. Pogledajte [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) i čvrsta pravila #15 / #17.

### Marketplace Registry SSRF guard

Prilagođeni registar URL je konfiguracija na koju može utjecati napadač, tako da prije nego što ga dohvati `listMarketplacePlugins()` ga pokreće kroz dva sloja:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Odbija sve što nije `http:` / `https:`.
   - Odbacuje doslovne private/loopback/link-local/ULA hostove (IPv4** i** IPv6, uključujući IPv4-mapped) preko kanonskog `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Rešava** oboje** `A` i `AAAA` bilježe i odbacuju if** bilo koji** riješena adresa je privatna — koja zatvara javni-hostname → privatni IP zaobilaznicu.
   - **Neuspjeh zatvoren** : greška rezolucije DNS odbija URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): ponovo primjenjuje URL zaštitu samo za javnost u vrijeme dohvaćanja i** blokira preusmjeravanja** (nema javnog → privatnog `30x` pivota).

URL koji ne uspije bilo koji sloj ne prekida zahtjev — tržište se tiho vraća na ugrađeni početni registar i evidentira upozorenje.

> Ovaj guard je ojačan u PR #3774 posebno za rješavanje A + AAAA i korištenje kanonskog `isPrivateHost` umjesto IPv4-only provjere.

### Izolacija izvršenja dodatka

> **Dodaci nisu zaštićeni.** Dijete je običan Node.js proces koji se izvodi kao OmniRoute korisnik, bez VM konteksta i bez Node.js oznaka dozvole, tako da plugin kod može čitati i pisati bilo koju datoteku koju korisnik može, pokrenuti programe i doći do mreže. `requires.permissions` samo odlučuje koje varijable okruženja dijete prima; ostale dozvole se ne primjenjuju. Instalirajte samo dodatke u koje vjerujete. Granica procesa ispod sadrži padove i visi; to nije sigurnosna granica.

- **Izolacija procesa** — `loadPlugin()` (`src/lib/plugins/loader.ts`) pokreće svaki dodatak u zasebnom Node.js podređenom procesu i komunicira preko IPC. Pozivi na zakačivanje imaju vremensko ograničenje sa `SIGTERM` → `SIGKILL` eskalacijom.
- **Env lista dozvoljenih** — dijete prima samo dozvoljeni skup varijabli okruženja; širi skup se odobrava samo kada manifest traži `env` dozvolu.
- **Instalirajte zadržavanje izvora** — `POST /api/plugins` čita samo iz izvornog direktorija dodatka (pogledajte "Instaliranje s lokalne staze"): staza je kanonikalizirana sa `realpath`, mora ostati striktno unutar tog direktorija, a izvorno stablo koje nosi simboličku vezu koja mu pobjegne je odbijeno prije nego što se bilo što kopira.
- **Zadržavanje puta** — install/upgrade/uninstall tvrdi da se direktorij dodataka i `manifest.main` rješavaju** unutar** upravljani root dodatak prije bilo kakvog kopiranja ili rekurzivnog brisanja (štiti od neovlaštenih DB staza i `../` prelaska u `manifest.main`). Aktivacija razrješava simboličke veze putem `realpath` i odbija učitavanje ulazne točke koja izbjegava direktorij dodataka.
- **Opcioni pin integriteta** — manifest može deklarirati polje `integrity` (`sha256-<base64>`, SRI format). Kada je prisutan, učitavač provjerava hash ulazne datoteke u vrijeme učitavanja i odbija da se aktivira u slučaju nepodudaranja. To je opcija za otkrivanje neovlaštenog pristupa,** ne** sigurnosna granica: ne ograničava ono što učitani dodatak može učiniti.
- **Nema akreditiva klijenta u kukicama** — kontekst proslijeđen na `onRequest`, `onResponse` i `onError` ima `authorization`, `x-api-key`, `proxy-authorization` i `cookie` zaglavlja uklonjena, a zapis ključa API ne nosi vrijednost ključa (`redactPluginContext()` u `src/lib/plugins/hooks.ts`).

## Manifest (`plugin.json`)

Potvrdio `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Polje              | Tip        | Bilješke                                                           |
| ------------------ | ---------- | ------------------------------------------------------------------ |
| `name`             | string     | Obavezno; kutija za ćevap (`^[a-z0-9-]+$`), 1–100 znakova          |
| `version`          | string     | Obavezno; semver (`MAJOR.MINOR.PATCH`)                             |
| `description`      | string?    | ≤ 500 znakova                                                      |
| `author`           | string?    | ≤ 200 znakova                                                      |
| `license`          | string?    | Zadano je `MIT`                                                    |
| `main`             | string?    | Entry file; podrazumevano je `index.js`                            |
| `source`           | enum?      | `local` \| `marketplace` (zadano na `local`)                       |
| `tags`             | string[]?  | Pretražite oznake                                                  |
| `requires`         | objekt?    | `{ omniroute?, permissions[] }`                                    |
| `hooks`            | objekt?    | Booleovi koji deklariraju koji zakačivanje implementira dodatak    |
| `skills`           | objekat[]? | Opcione definicije vještina                                        |
| `enabledByDefault` | boolean?   | Automatsko aktiviranje prilikom instalacije                        |
| `configSchema`     | objekt?    | Mapa konfiguracijskih polja (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?    | Opcioni `sha256-<base64>` pin za unos datoteke                     |

Dozvole se izvlače iz enuma `network` / `file-read` / `file-write` / `env` / `exec`. Samo `env` ima učinak vremena izvođenja (malo veća lista dozvoljenih promjenjivih okruženja za dijete); ostali su deklaracije i ne provode se.

## Tok životnog ciklusa

```
install (POST /api/plugins, path)
  → skeniraj/validiraj manifest → kopiraj u staging → potvrdi main unutar direktorija
  → atomsko preimenovanje u ~/.omniroute/plugins/<name> → umetni red u bazu podataka
  → pokreni onInstall → ako je enabledByDefault: aktiviraj

activate (POST /api/plugins/{name}/activate)
  → provjera realpath sadržaja → loadPlugin() (pokreni podproces)
  → registriraj deklarirane hookove → status = "active" → pokreni onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → pokreni onDeactivate (PRIJE unregister) → poništi registraciju hookova
  → ubij podproces → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deaktiviraj ako je aktivan → pokreni onUninstall
  → rekurzivno brisanje direktorija dodatka uz provjeru sadržaja → obriši red iz baze podataka
```

Ponovno pokretanje `install` na direktoriju čija je verzija manifesta **strogo novija** od instalirane verzije automatski vrši nadogradnju (čista reinstalacija; konfiguracija se vraća na zadane vrijednosti). Ista ili starija verzija se odbija.

## Baza podataka

Tabela `plugins` (migracija `076_create_plugins.sql`):

| Kolona          | Tip     | Bilješke                                          |
| --------------- | ------- | ------------------------------------------------- |
| `id`            | TEXT PK | UUID                                              |
| `name`          | TEXT    | Jedinstveno                                       |
| `version`       | TEXT    | semver; zadano `1.0.0`                            |
| `description`   | TEXT    | Opcionalno                                        |
| `author`        | TEXT    | Opcionalno                                        |
| `license`       | TEXT    | Zadano `MIT`                                      |
| `main`          | TEXT    | Ulazna datoteka; zadano `index.js`                |
| `source`        | TEXT    | Zadano `local`                                    |
| `tags`          | TEXT    | JSON niz; zadano `[]`                             |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`  |
| `enabled`       | INT     | 0/1; zadano 0                                     |
| `manifest`      | TEXT    | Puni JSON manifest                                |
| `config`        | TEXT    | JSON; zadano `{}`                                 |
| `config_schema` | TEXT    | JSON; zadano `{}`                                 |
| `hooks`         | TEXT    | JSON niz deklariranih naziva hookova; zadano `[]` |
| `permissions`   | TEXT    | JSON niz; zadano `[]`                             |
| `plugin_dir`    | TEXT    | Apsolutni instalacijski direktorij                |
| `error_message` | TEXT    | Postavljeno kada je `status = "error"`            |
| `installed_at`  | TEXT    | `datetime('now')`                                 |
| `updated_at`    | TEXT    | `datetime('now')`                                 |
| `activated_at`  | TEXT    | Postavljeno pri aktivaciji                        |

Metrike/analitika dodataka se prate u dodatnim tabelama (`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dashboard

Stranica kontrolne ploče na `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) sadrži dvije kartice:

- **Instalirano** — navodi instalirane dodatke sa njihovim deklarisanim kukicama, activate/deactivate prekidačem, dugmetom za deinstaliranje i akcijom "Skeniraj dodatke" (`POST /api/plugins/scan`).
- **Marketplace** — prikazuje katalog iz `GET /api/plugins/marketplace` s poljem za postavljanje prilagođenog registra URL.

Stranica uvijek prikazuje upozorenje da se dodaci pokreću s punim privilegijama OmniRoute procesa.

Konfiguraciona stranica po dodatku živi na `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Vidi također

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  zašto je `/api/plugins` isključivo loopback (Nivo 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — povezani okvir vještina
  (`src/lib/skills/`); dodaci mogu deklarisati vještine u svom manifestu
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — odlazne integracije vođene događajima
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  obrazac `buildErrorBody()` koji svaka ruta dodatka koristi za odgovore o greškama
