# Plugin Marketplace (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Sursa adevărului:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` și
> `src/app/(dashboard)/dashboard/plugins/`
> **Ultima actualizare:** 2026-06-28 — v3.8.40

OmniRoute include un sistem de pluginuri în stil WordPress. Pluginurile sunt
directoare autonome — fiecare având un manifest `plugin.json` și un fișier de
intrare — care se conectează la fluxul de procesare a cererilor (`onRequest` /
`onResponse` / `onError`) și la evenimentele ciclului de viață (`onInstall` /
`onActivate` / `onDeactivate` / `onUninstall`).

**Piața de pluginuri** este stratul de descoperire construit peste acest sistem.
Aceasta oferă un catalog navigabil de pluginuri care pot fi instalate. În mod
implicit, catalogul este un registru inițial restrâns, încorporat; un operator îl
poate configura să folosească URL-ul unui registru extern personalizat, caz în
care preluarea este securizată de o protecție SSRF care efectuează rezoluția DNS
(consultați [Securitate](#security)).

Fiecare rută pentru pluginuri este accesibilă **numai prin loopback** (Nivelul 1 —
`LOCAL_ONLY`): pluginurile încarcă și execută cod în procese copil, astfel încât
rutele nu pot fi accesate dintr-o origine care nu este loopback, indiferent de
autentificare. Consultați
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Cum se potrivește Together

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

- **Stratul de registru** — `src/lib/plugins/marketplace.ts`: listează / caută în catalog, revenind la registrul de semințe la orice eșec.
- **Stratul ciclului de viață** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): instalați, actualizați, activați, dezactivați, dezinstalați, scanați, încărcați pornirea.
- **Stratul manifest** — `src/lib/plugins/manifest.ts`: Zod schema + implicite pentru `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: descoperă pluginuri pe disc în directorul plugin-urilor.
- **Încărcător** — `src/lib/plugins/loader.ts`: generează fiecare plugin într-un proces secundar Node.js separat, iar brokerii atrag apelurile peste IPC. Copilul nu este un sandbox (vezi „Izolarea execuției pluginului” de mai jos).

## Catalogul pieței

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) returnează o listă
de obiecte `MarketplaceEntry`:

| Câmp          | Tip      | Observații                                 |
| ------------- | -------- | ------------------------------------------ |
| `name`        | string   | Numele pluginului în format kebab-case     |
| `version`     | string   | semver                                     |
| `description` | string   | Scurtă descriere                           |
| `author`      | string   | Autor / organizație                        |
| `license`     | string   | Identificator de licență în stil SPDX      |
| `downloadUrl` | string   | URL-ul sursei de descărcare (poate fi gol) |
| `repository`  | string?  | URL opțional al depozitului                |
| `tags`        | string[] | Etichete pentru căutare/filtrare           |
| `downloads`   | number   | Numărul de descărcări                      |
| `rating`      | number   | 0–5                                        |
| `verified`    | boolean  | Dacă intrarea este marcată ca verificată   |
| `lastUpdated` | string   | Șir de dată în format aproximativ ISO      |

Atunci când nu este configurat niciun URL de registru personalizat, catalogul
este reprezentat de `SEED_REGISTRY` încorporat (în prezent `request-logger`,
`rate-limiter`, `cost-tracker` și `theme-manager`). Registrul inițial este
disponibil întotdeauna — dacă un registru extern configurat nu este accesibil,
returnează o stare diferită de `200` sau returnează un corp nerecunoscut,
`listMarketplacePlugins()` înregistrează un avertisment și revine la lista
inițială.

> Notă: **catalogul** pieței (navigare/căutare) este conectat complet de la un
> capăt la altul, dar **instalarea** cu un singur clic din catalog nu este încă
> implementată — butonul „Instalare” din panoul de control pentru o intrare din
> piață afișează momentan o notificare „în curând”. În prezent, instalarea se
> realizează prin fluxul de instalare dintr-o cale locală (`POST /api/plugins`) și
> prin descoperirea pe disc (`POST /api/plugins/scan`).

## REST API

Toate punctele finale necesită autentificare de gestionare (`requireManagementAuth`)** şi** sunt doar pentru buclă inversă — `/api/plugins` și `/api/plugins/` sunt listate în `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Punct final                        | Metodă | Descriere                                                                 |
| ---------------------------------- | ------ | ------------------------------------------------------------------------- |
| `/api/plugins`                     | GET    | Listați pluginurile instalate (filtru `?status=` opțional)                |
| `/api/plugins`                     | POST   | Instalați un plugin din directorul surse de plugin                        |
| `/api/plugins/scan`                | POST   | Scanați directorul de pluginuri și înregistrați noi pluginuri             |
| `/api/plugins/marketplace`         | GET    | Listați intrările din catalogul pieței                                    |
| `/api/plugins/marketplace/install` | POST   | Instalați un plugin de piață după nume                                    |
| `/api/plugins/[name]`              | GET    | Obțineți detalii despre pluginul instalat                                 |
| `/api/plugins/[name]`              | DELETE | Dezinstalează un plugin                                                   |
| `/api/plugins/[name]/activate`     | POST   | Activați (încărcați cârligele de înregistrare + )                         |
| `/api/plugins/[name]/deactivate`   | POST   | Dezactivați (declanșați `onDeactivate`, anulați înregistrarea cârligelor) |
| `/api/plugins/[name]/config`       | GET    | Obțineți schema de configurare a pluginului +                             |
| `/api/plugins/[name]/config`       | PUT    | Actualizați configurația pluginului (validat în funcție de schemă)        |

Filtrul `GET /api/plugins` `status` acceptă unul dintre `installed` / `active` / `inactive` / `error`. O valoare nevalidă returnează `400`.

### Listați pluginurile instalate

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Instalați dintr-o cale locală

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` trebuie să fie un** absolut** cale către un director** în directorul surselor pluginului** : `plugin-sources` lângă rădăcina pluginului, deci `~/.omniroute/plugin-sources/` în mod implicit, sau `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` când acea variabilă este setată (`getPluginSourcesDir()` în `src/lib/plugins/installSource.ts`). Copiați sau clonați pluginul acolo mai întâi. Instalarea este refuzată cu `400` când calea conține `..` sau un octet nul, se află în afara acelui director, se rezolvă în afara lui printr-un link simbolic, conține un link simbolic a cărui țintă este în afara acestuia sau când directorul nu există. Directorul sursă trebuie să conțină un `plugin.json` valid (sau să fie părinte al unuia). La succes, răspunsul este `201` cu rândul de plugin instalat.

Spre deosebire de celelalte rute de plugin, aceasta necesită acreditările de gestionare (o sesiune de tablou de bord sau o cheie API gestionată) chiar și atunci când autentificarea este dezactivată (`requireLogin=false`): instalarea codului nu este niciodată o acțiune anonimă. Același lucru este valabil și pentru `POST /api/plugins/marketplace/install` (corp `{ "name": "<plugin>" }`).

### Navigați pe piață

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Actualizați configurația pluginului

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` validează corpul față de `configSchema` ul pluginului (declarat în manifest) cu `validatePluginConfig()` din `src/lib/plugins/manifest.ts`: fiecare cheie trebuie să fie declarată în schemă, valorile trebuie să se potrivească cu tipul declarat, câmpurile `number` onorează `min`/`max` și câmpurile `select` trebuie să se potrivească cu `enum` declarat. Orice încălcare returnează `400` și nimic nu este stocat. Un plugin care declară că nu `configSchema` nu are chei configurabile, deci cererea este refuzată cu `400` ("Pluginul nu declară nicio cheie configurabilă").

## Configurare

### Directorul de pluginuri

Pluginurile se află în directorul de date OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (sau orice fișier indicat de manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) determină acel director în
trei pași:

1. **`OMNIROUTE_PLUGINS_DIR`**, când este setată — este utilizată ca atare, indiferent de valoarea `HOME`. Aceasta este
   opțiunea explicită pentru Docker/K8s, unde arborele de pluginuri este montat prin bind la o cale
   care, de obicei, nu are nicio legătură cu directorul home al containerului (#11827).
2. `<home>/.omniroute/plugins`, unde `<home>` provine din variabilele de mediu `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, când procesul nu exportă deloc un director home.

Directorul determinat este înregistrat o singură dată la pornire ca `scanner.dir_resolved`, indicând
sursa utilizată (`OMNIROUTE_PLUGINS_DIR`, `home` sau `no-home-fallback`) — astfel, o imagine
care ajunge în mod silențios la pasul 3 raportează acest lucru, în loc să raporteze doar o listă goală de pluginuri.
`POST /api/plugins/scan` descoperă orice subdirector de acolo care conține un
`plugin.json` valid și îl înregistrează; același director este rădăcina în care
`pluginManager.install()` copiază pluginurile, astfel încât o suprascriere mută împreună procesele de descoperire și
instalare.

> **`OMNIROUTE_PLUGINS_DIR` nu este `OMNIROUTE_PLUGIN_PATH`.** Aceasta din urmă este citită numai de
> încărcătorul de pluginuri de comandă CLI (`bin/cli/plugins.mjs`) pentru a găsi pachetele npm `omniroute-cmd-*`
> care adaugă subcomenzi `omniroute` — nu are niciun efect asupra scanerului din timpul execuției
> descris aici. Consultați [PLUGINS.md](./PLUGINS.md) pentru acea componentă.

### URL personalizat pentru registrul marketplace

Sursa catalogului marketplace este citită din setarea `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` citește `settings.pluginMarketplaceUrl`). Când
este setată la un URL `http(s)`, `listMarketplacePlugins()` preia acel URL și acceptă
fie o matrice JSON de nivel superior cu intrări, fie un obiect cu o matrice `plugins`;
intrările fără un `name` de tip șir sunt eliminate. Când nu este setată (sau când preluarea
nu trece de protecția SSRF / returnează un răspuns nevalid), este utilizat registrul
inițial încorporat.

Fila „Marketplace” din tabloul de bord oferă un câmp pentru acest URL (citit înapoi din
`GET /api/settings`).

> Notă privind implementarea: acțiunea „Save” din tabloul de bord trimite
> `pluginMarketplaceUrl` către `PATCH /api/settings`. La momentul redactării, această
> cheie nu este declarată în `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), așadar verificați persistența în
> versiunea dumneavoastră înainte de a vă baza pe ea — calea de **citire** (`getSettings()` →
> `listMarketplacePlugins()`) respectă cheia odată ce aceasta este prezentă în depozitul
> de setări.

## Securitate

### Numai loopback pentru nivelul de traseu —

Pluginurile execută cod în procesele copil generate, astfel încât întreaga suprafață `/api/plugins` este clasificată `LOCAL_ONLY` (Nivelul 1). Aplicarea loopback rulează necondiționat** înainte** orice verificare de autentificare, astfel încât un jeton de gestionare scurs care ajunge la caseta peste un tunel tot nu poate instala, activa sau dezinstala un plugin. Consultați [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) și Reguli dure #15 / #17.

### Registrul pieței SSRF guard

Un registru personalizat URL este o configurație influențată de atacator, așa că, înainte de a-l prelua, `listMarketplacePlugins()` îl rulează prin două straturi:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Respinge orice nu este `http:` / `https:`.
   - Respinge gazdele private/loopback/link-local/ULA literale (IPv4** şi** IPv6, inclusiv IPv4-mapped) prin `isPrivateHost` canonic (`src/shared/network/outboundUrlGuard.ts`).
   - Rezolvă** ambele** `A` și `AAAA` înregistrează și respinge dacă** orice** adresa rezolvată este private — închiderea numelui de gazdă public → private-IP bypass.
   - **Eșuează închis** : un eșec de rezoluție DNS respinge URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): reaplică protecția URL numai pentru public la momentul preluării și** blochează redirecționările** (fără pivot public → privat `30x` ).

Un URL care nu reușește niciunul dintre straturi nu anulează cererea — piața revine în tăcere la registrul de semințe încorporat și înregistrează un avertisment.

> Această protecție a fost întărită în PR #3774 special pentru a rezolva A + AAAA și a utiliza `isPrivateHost` canonic în loc de o verificare IPv4-only.

### Izolarea execuției pluginului

> **Pluginurile nu sunt sandbox în mod implicit.** Copilul este un proces Node.js obișnuit care rulează ca utilizator OmniRoute, fără context VM și fără steaguri de permisiune Node.js, astfel încât codul pluginului poate citi și scrie orice fișier pe care utilizatorul îl poate, rula programe și ajunge în rețea. `requires.permissions` decide doar ce variabile de mediu primește copilul; celelalte permisiuni nu sunt aplicate. Indicatorul caracteristicii `PLUGIN_PERMISSION_MODEL_ENABLED` de înscriere (dezactivat în mod implicit) rulează fiecare plugin sub modelul de permisiuni Node.js construit din acele permisiuni, cu excepția `network`, pe care Node.js nu îl poate restricționa (vezi [`PLUGIN_SDK.md`](./PLUGIN_SDK.md#permission-system) ). Instalați numai pluginuri în care aveți încredere. Limita procesului de mai jos conține blocări și blocări; nu este o limită de securitate.

- **Izolarea procesului** — `loadPlugin()` (`src/lib/plugins/loader.ts`) generează fiecare plugin într-un proces secundar Node.js separat și comunică prin IPC. Apelurile Hook au un timeout cu escaladare `SIGTERM` → `SIGKILL`.
- **Lista permisă pentru Env** — copilul primește doar un set de variabile de mediu permis; setul mai larg este acordat numai atunci când manifestul solicită permisiunea `env`.
- **Instalați reținerea sursei** — `POST /api/plugins` citește doar din directorul surselor pluginului (vezi „Instalarea de pe o cale locală”): calea este canonizată cu `realpath`, trebuie să rămână strict în acel director, iar un arbore sursă care poartă o legătură simbolică care scapă este refuzat înainte de a fi copiat ceva.
- **Reținerea căii** — install/upgrade/uninstall afirmă că directorul pluginului și `manifest.main` se rezolvă** în** rădăcina pluginului gestionat înainte de orice copiere sau ștergere recursivă (protejează împotriva căilor DB modificate și traversării `../` în `manifest.main`). Activarea rezolvă legăturile simbolice prin `realpath` și refuză să încarce un punct de intrare care iese din directorul pluginului.
- **Pin de integritate opțional** — un manifest poate declara un câmp `integrity` (`sha256-<base64>`, format SRI ). Când este prezent, încărcătorul verifică hash-ul fișierului de intrare la momentul încărcării și refuză să se activeze în caz de nepotrivire. Este opțiunea de detectare a falsificării,** nu** o limită de securitate: nu limitează ceea ce poate face un plugin încărcat.
- **Fără acreditări de client în hooks** — contextul transmis la `onRequest`, `onResponse` și `onError` are anteturile `authorization`, `x-api-key`, `proxy-authorization` și `cookie` eliminate, iar înregistrarea cheii API nu poartă nicio valoare a cheii (`redactPluginContext()` în `src/lib/plugins/hooks.ts`).

## Manifest (`plugin.json`)

Validat de `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Domeniu            | Tip        | Note                                                                   |
| ------------------ | ---------- | ---------------------------------------------------------------------- |
| `name`             | şir        | Necesar; kebab-case (`^[a-z0-9-]+$`), 1–100 de caractere               |
| `version`          | şir        | Necesar; semver (`MAJOR.MINOR.PATCH`)                                  |
| `description`      | şir?       | ≤ 500 de caractere                                                     |
| `author`           | şir?       | ≤ 200 de caractere                                                     |
| `license`          | şir?       | Implicit la `MIT`                                                      |
| `main`             | şir?       | Dosar de intrare; implicit la `index.js`                               |
| `source`           | enumerare? | `local` \| `marketplace` (implicit la `local`)                         |
| `tags`             | şir[]?     | Căutați etichete                                                       |
| `requires`         | obiect?    | `{ omniroute?, permissions[] }`                                        |
| `hooks`            | obiect?    | Booleeni care declară care cârlige implementează pluginul              |
| `skills`           | obiect[]?  | Definiții opționale de abilități                                       |
| `enabledByDefault` | boolean?   | Se activează automat la instalare                                      |
| `configSchema`     | obiect?    | Harta câmpurilor de configurare (`string`/`number`/`boolean`/`select`) |
| `integrity`        | şir?       | Pin opțional pentru fișierul de intrare `sha256-<base64>`              |

Permisiunile sunt extrase din enumerarea `network` / `file-read` / `file-write` / `env` / `exec`. Doar `env` are un efect de rulare (o listă de permisiuni de variabile de mediu puțin mai mare pentru copil); celelalte sunt declarații și nu sunt executate.

## Fluxul ciclului de viață

```
install (POST /api/plugins, cale)
  → scanare/validare manifest → copiere în staging → verificare că main se află în director
  → redenumire atomică în ~/.omniroute/plugins/<name> → inserare rând în baza de date
  → declanșare onInstall → dacă enabledByDefault: activare

activate (POST /api/plugins/{name}/activate)
  → verificarea includerii cu realpath → loadPlugin() (pornire proces copil)
  → înregistrare hook-uri declarate → status = "active" → declanșare onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → declanșare onDeactivate (ÎNAINTE de anularea înregistrării) → anulare înregistrare hook-uri
  → închidere proces copil → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → dezactivare dacă este activ → declanșare onUninstall
  → ștergere recursivă, cu verificarea includerii, a directorului pluginului → ștergere rând din baza de date
```

Rularea din nou a `install` pentru un director a cărui versiune din manifest este **strict
mai nouă** decât versiunea instalată efectuează automat upgrade-ul (reinstalare curată; configurația revine
la valorile implicite). O versiune identică sau mai veche este respinsă.

## Baza de date

Tabelul `plugins` (migrarea `076_create_plugins.sql`):

| Coloană         | Tip     | Observații                                                  |
| --------------- | ------- | ----------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                        |
| `name`          | TEXT    | Unic                                                        |
| `version`       | TEXT    | semver; implicit `1.0.0`                                    |
| `description`   | TEXT    | Opțional                                                    |
| `author`        | TEXT    | Opțional                                                    |
| `license`       | TEXT    | Implicit `MIT`                                              |
| `main`          | TEXT    | Fișier de intrare; implicit `index.js`                      |
| `source`        | TEXT    | Implicit `local`                                            |
| `tags`          | TEXT    | Matrice JSON; implicit `[]`                                 |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`            |
| `enabled`       | INT     | 0/1; implicit 0                                             |
| `manifest`      | TEXT    | Manifest JSON complet                                       |
| `config`        | TEXT    | JSON; implicit `{}`                                         |
| `config_schema` | TEXT    | JSON; implicit `{}`                                         |
| `hooks`         | TEXT    | Matrice JSON cu numele hook-urilor declarate; implicit `[]` |
| `permissions`   | TEXT    | Matrice JSON; implicit `[]`                                 |
| `plugin_dir`    | TEXT    | Director absolut de instalare                               |
| `error_message` | TEXT    | Setat când `status = "error"`                               |
| `installed_at`  | TEXT    | `datetime('now')`                                           |
| `updated_at`    | TEXT    | `datetime('now')`                                           |
| `activated_at`  | TEXT    | Setat la activare                                           |

Metricile și datele analitice ale pluginurilor sunt urmărite în tabele suplimentare
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Bord

Pagina tabloului de bord de la `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) oferă două file:

- **Instalat** — listează pluginurile instalate cu cârligele lor declarate, un comutator activate/deactivate, un buton de dezinstalare și o acțiune „Scanare pentru pluginuri” (`POST /api/plugins/scan`).
- **Piața** — arată catalogul din `GET /api/plugins/marketplace` cu un câmp pentru a seta registrul personalizat URL.

Pagina afișează întotdeauna un avertisment că pluginurile rulează cu privilegiile complete ale procesului OmniRoute.

O pagină de configurare pentru fiecare plugin se află la `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Consultați și

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  de ce `/api/plugins` este accesibil doar prin interfața loopback (Nivelul 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — cadrul asociat pentru abilități
  (`src/lib/skills/`); pluginurile pot declara abilități în manifestul lor
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — integrări externe
  bazate pe evenimente
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  modelul `buildErrorBody()` utilizat de fiecare rută de plugin pentru răspunsurile de eroare
