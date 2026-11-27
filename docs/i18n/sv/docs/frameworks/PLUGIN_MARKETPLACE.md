# Plugin Marketplace (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Sanningskälla:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` och
> `src/app/(dashboard)/dashboard/plugins/`
> **Senast uppdaterad:** 2026-06-28 — v3.8.40

OmniRoute levereras med ett plugin-system i WordPress-stil. Plugin-programmen är fristående
kataloger — var och en med ett `plugin.json`-manifest och en startfil — som kopplas
in i förfrågningsflödet (`onRequest` / `onResponse` / `onError`) och i
livscykelhändelser (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Pluginmarknadsplatsen** är upptäcktslagret ovanpå detta system. Den
tillhandahåller en bläddringsbar katalog över installerbara plugin-program. Som standard är katalogen
ett litet inbyggt startregister. En operatör kan peka den mot en anpassad URL
för ett fjärrregister, och i så fall skyddas hämtningen av ett DNS-baserat SSRF-skydd
(se [Säkerhet](#security)).

Alla plugin-rutter är **endast tillgängliga via loopback** (nivå 1 — `LOCAL_ONLY`): plugin-program läser in
och kör kod i underprocesser, så rutterna är inte åtkomliga från
andra ursprung än loopback, oavsett autentisering. Se
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Hur det passar Together

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

- **Registerlager** — `src/lib/plugins/marketplace.ts`: listar / söker i katalogen, faller tillbaka till fröregistret vid eventuella fel.
- **Livscykellager** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): installera, uppgradera, aktivera, avaktivera, avinstallera, skanna, startladdning.
- **Manifest lager** — `src/lib/plugins/manifest.ts`: Zod schema + är standard för `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: upptäcker plugins på disken under plugin-katalogen.
- **Lastare** — `src/lib/plugins/loader.ts`: skapar varje plugin i en separat Node.js child process och mäklare kopplar samtal över IPC. Barnet är inte en sandlåda (se "Isolering av pluginkörning" nedan).

## Marknadsplatskatalog

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) returnerar en lista med
`MarketplaceEntry`-objekt:

| Fält          | Typ      | Anmärkningar                               |
| ------------- | -------- | ------------------------------------------ |
| `name`        | string   | Plugin-namn i kebab-case                   |
| `version`     | string   | semver                                     |
| `description` | string   | Kort sammanfattning                        |
| `author`      | string   | Upphovsperson/organisation                 |
| `license`     | string   | Licens-ID i SPDX-stil                      |
| `downloadUrl` | string   | URL för hämtning av källkod (kan vara tom) |
| `repository`  | string?  | Valfri URL till kodförråd                  |
| `tags`        | string[] | Taggar för sökning/filtrering              |
| `downloads`   | number   | Antal hämtningar                           |
| `rating`      | number   | 0–5                                        |
| `verified`    | boolean  | Om posten är markerad som verifierad       |
| `lastUpdated` | string   | ISO-liknande datumsträng                   |

När ingen anpassad register-URL har konfigurerats utgörs katalogen av det inbyggda
`SEED_REGISTRY` (för närvarande `request-logger`, `rate-limiter`, `cost-tracker` och
`theme-manager`). Startregistret är alltid tillgängligt — om ett konfigurerat fjärrregister
inte kan nås, returnerar en annan status än `200` eller returnerar ett okänt
innehåll, loggar `listMarketplacePlugins()` en varning och återgår till startlistan.

> Obs! Marknadsplatsens **katalog** (bläddring/sökning) är fullständigt integrerad, men
> marknadsplatsens **installation med ett klick** från katalogen är ännu inte implementerad —
> knappen "Installera" för en marknadsplatspost i kontrollpanelen visar för närvarande ett
> meddelande om att funktionen kommer snart. Installation sker i dag via installationsflödet
> från en lokal sökväg (`POST /api/plugins`) och identifiering på disken (`POST /api/plugins/scan`).

## REST API

Alla slutpunkter kräver hanteringsbehörighet (`requireManagementAuth`)** och** är loopback-bara — `/api/plugins` och `/api/plugins/` listas i `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Slutpunkt                        | Metod  | Beskrivning                                             |
| -------------------------------- | ------ | ------------------------------------------------------- |
| `/api/plugins`                   | GET    | Lista installerade plugins (valfritt `?status=` filter) |
| `/api/plugins`                   | POST   | Installera ett plugin från plugin sources-katalogen     |
| `/api/plugins/scan`              | POST   | Skanna plugin-katalogen och registrera nya plugins      |
| `/api/plugins/marketplace`       | GET    | Lista marknadsplatskatalogposter                        |
| `/api/plugins/[name]`            | GET    | Få installerade plugin-detaljer                         |
| `/api/plugins/[name]`            | DELETE | Avinstallera ett plugin                                 |
| `/api/plugins/[name]/activate`   | POST   | Aktivera (ladda + registerkrokar)                       |
| `/api/plugins/[name]/deactivate` | POST   | Inaktivera (avfyra `onDeactivate`, avregistrera krokar) |
| `/api/plugins/[name]/config`     | GET    | Hämta plugin config + config schema                     |
| `/api/plugins/[name]/config`     | PUT    | Uppdatera plugin-konfiguration (validerad mot schema)   |

`GET /api/plugins` `status` filtret accepterar ett av `installed` / `active` / `inactive` / `error`. Ett ogiltigt värde returnerar `400`.

### Lista installerade plugins

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Installera från en lokal sökväg

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` måste vara en** absolut** sökvägen till en katalog** i katalogen för plugin-källor** : `plugin-sources` bredvid plugin-roten, så `~/.omniroute/plugin-sources/` som standard, eller `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` när den variabeln är inställd (`getPluginSourcesDir()` in `src/lib/plugins/installSource.ts`). Kopiera eller klona insticksprogrammet dit först. Installationen avvisas med `400` när sökvägen innehåller `..` eller en nollbyte, ligger utanför den katalogen, löser sig utanför den genom en symbollänk, innehåller en symbollänk vars mål är utanför den, eller när katalogen inte existerar. Källkatalogen måste innehålla en giltig `plugin.json` (eller vara en förälder till en sådan). Vid framgång är svaret `201` med den installerade pluginraden.

Till skillnad från de andra insticksrutterna kräver den här hanteringsuppgifterna (en instrumentpanelsession eller en API -nyckel) även när inloggningen är inaktiverad (`requireLogin=false`): installation av kod är aldrig en anonym åtgärd.

### Bläddra på marknadsplatsen

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Uppdatera plugin-konfiguration

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` validerar varje angett värde mot insticksprogrammets `configSchema` (deklarerat i manifestet): `number` fälten respekterar `min`/`max`, `select` -fälten måste matcha det deklarerade `enum`. Nycklar som inte finns i schemat är tillåtna.

## Konfiguration

### Plugin-katalog

Plugins finns under OmniRoutes datakatalog:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (eller vad manifest.main pekar på)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) fastställer katalogen i
tre steg:

1. **`OMNIROUTE_PLUGINS_DIR`**, när den är inställd — används ordagrant, oavsett vad `HOME` anger. Detta är
   den uttryckliga inställningen för Docker/K8s, där pluginträdet bind-monteras på en sökväg
   som vanligtvis inte har något att göra med containerns hemkatalog (#11827).
2. `<home>/.omniroute/plugins`, där `<home>` hämtas från miljövariablerna `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, när processen inte exporterar någon hemkatalog alls.

Den fastställda katalogen loggas en gång vid start som `scanner.dir_resolved`, med namnet på
den indata som användes (`OMNIROUTE_PLUGINS_DIR`, `home` eller `no-home-fallback`) — så att en image
som utan förvarning hamnar på steg 3 anger det, i stället för att bara rapportera en tom pluginlista.
`POST /api/plugins/scan` hittar alla underkataloger där som innehåller en giltig
`plugin.json` och registrerar dem; samma katalog är den rot dit
`pluginManager.install()` kopierar plugins, så en åsidosättning flyttar identifiering och
installation tillsammans.

> **`OMNIROUTE_PLUGINS_DIR` är inte `OMNIROUTE_PLUGIN_PATH`.** Den senare läses endast av
> CLI-inläsaren för kommandoplugins (`bin/cli/plugins.mjs`) för att hitta npm-paket av typen `omniroute-cmd-*`
> som lägger till underkommandon för `omniroute` — den påverkar inte den runtime-skanner
> som beskrivs här. Se [PLUGINS.md](./PLUGINS.md) för den delen.

### Anpassad URL för marknadsplatsregistret

Källan för marknadsplatskatalogen läses från inställningen `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` läser `settings.pluginMarketplaceUrl`). När den
är inställd på en `http(s)`-URL hämtar `listMarketplacePlugins()` denna URL och accepterar
antingen en JSON-array med poster på toppnivån eller ett objekt med en `plugins`-array;
poster utan en `name` av typen sträng filtreras bort. När den inte är inställd (eller när hämtningen
stoppas av SSRF-skyddet eller returnerar ett felaktigt svar) används det inbyggda
startregistret.

Fliken "Marketplace" i kontrollpanelen visar ett fält för denna URL (som läses tillbaka från
`GET /api/settings`).

> Implementeringsanmärkning: åtgärden "Save" i kontrollpanelen skickar
> `pluginMarketplaceUrl` till `PATCH /api/settings`. I skrivande stund är denna
> nyckel inte deklarerad i `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), så verifiera persistensen i din
> version innan du förlitar dig på den — **läsningsvägen** (`getSettings()` →
> `listMarketplacePlugins()`) respekterar nyckeln när den väl finns i inställningslagret.

## Säkerhet

### Endast ruta tier — loopback

Plugins exekverar kod i skapade underordnade processer, så hela `/api/plugins` ytan klassificeras `LOCAL_ONLY` (Tier 1). Loopback verkställighet körs ovillkorligt** före** någon autentiseringskontroll, så ett läckt hanteringstoken som når boxen över en tunnel kan fortfarande inte installera, aktivera eller avinstallera ett plugin. Se [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) och hårda regler #15 / #17.

### Marketplace registry SSRF guard

Ett anpassat register URL är en konfiguration som kan påverkas av angripare, så innan den hämtas kör `listMarketplacePlugins()` den genom två lager:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Avvisar allt som inte är `http:` / `https:`.
   - Avvisar bokstavliga private/loopback/link-local/ULA värdar (IPv4** och** IPv6, inklusive IPv4-mapped) via den kanoniska `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Löser sig** både** `A` och `AAAA` registrerar och avvisar if** några** löst adress är privat — stänger public-hostname → private-IP bypass.
   - **Misslyckas stängt** : ett DNS -upplösningsfel avvisar URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): återför den offentliga endast URL skyddet vid hämtning och** blockerar omdirigeringar** (ingen offentlig → privat `30x` pivot).

En URL som misslyckas med något av lagren avbryter inte begäran — marknaden faller tyst tillbaka till det inbyggda fröregistret och loggar en varning.

> Denna guard härdades i PR #3774 specifikt för att lösa A + AAAA och använda den kanoniska `isPrivateHost` istället för en IPv4-only check.

### Isolering av pluginkörning

> **Plugins är inte sandlådor.** Barnet är en vanlig Node.js process som körs som OmniRoute användaren, utan VM kontext och inga Node.js behörighetsflaggor, så plugin-kod kan läsa och skriva vilken fil som helst som användaren kan, köra program och nå nätverket. `requires.permissions` bestämmer bara vilka miljövariabler barnet får; de andra behörigheterna upprätthålls inte. Installera endast plugins som du litar på. Processgränsen nedan innehåller krascher och hängningar; det är inte en säkerhetsgräns.

- **Processisolering** — `loadPlugin()` (`src/lib/plugins/loader.ts`) skapar varje plugin i en separat Node.js underordnad process och kommunicerar över IPC. Hook calls har en timeout med `SIGTERM` → `SIGKILL` eskalering.
- **Env godkännandelista** — barnet får endast en tillåten uppsättning miljövariabler; den bredare uppsättningen beviljas endast när manifestet begär `env` tillstånd.
- **Installera källinneslutning** — `POST /api/plugins` läser bara från pluginens källkatalog (se "Installera från en lokal sökväg"): sökvägen kanoniseras med `realpath`, måste stanna strikt inne i den katalogen, och ett källträd som bär en symbollänk som escapes den vägras innan någonting kopieras.
- **Baninneslutning** — install/upgrade/uninstall hävdar att plugin-katalogen och `manifest.main` löser sig** inom** den hanterade plugin-roten före någon kopiering eller rekursiv borttagning (skyddar mot manipulerade DB vägar och `../` -passering i `manifest.main`). Aktivering löser symboliska länkar via `realpath` och vägrar att ladda en ingångspunkt som undkommer plugin-katalogen.
- **Valfri integritetsstift** — ett manifest kan deklarera ett `integrity` (`sha256-<base64>`, SRI format) fält. När den är närvarande, verifierar laddaren ingångsfilens hash vid laddningstid och vägrar att aktiveras vid missmatch. Det är opt-in manipuleringsdetektering,** inte** en säkerhetsgräns: den begränsar inte vad en laddad plugin kan göra.
- **Inga kunduppgifter i krokar** — kontexten som skickas till `onRequest`, `onResponse` och `onError` har `authorization`, `x-api-key`, `proxy-authorization` och `cookie` -huvudena borttagna, och API -nyckelposten har inget nyckelvärde (`redactPluginContext()` i `src/lib/plugins/hooks.ts`).

## Manifest (`plugin.json`)

Validerad av `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Fält               | Typ         | Anteckningar                                                         |
| ------------------ | ----------- | -------------------------------------------------------------------- |
| `name`             | sträng      | Nödvändig; kebab-fodral (`^[a-z0-9-]+$`), 1–100 tecken               |
| `version`          | sträng      | Nödvändig; semver (`MAJOR.MINOR.PATCH`)                              |
| `description`      | sträng?     | ≤ 500 tecken                                                         |
| `author`           | sträng?     | ≤ 200 tecken                                                         |
| `license`          | sträng?     | Standard är `MIT`                                                    |
| `main`             | sträng?     | Inmatningsfil; standard till `index.js`                              |
| `source`           | uppräkning? | `local` \| `marketplace` (standard till `local`)                     |
| `tags`             | sträng[]?   | Sök taggar                                                           |
| `requires`         | objekt?     | `{ omniroute?, permissions[] }`                                      |
| `hooks`            | objekt?     | Booleans deklarerar vilka krokar som plugin implementerar            |
| `skills`           | objekt[]?   | Valfria färdighetsdefinitioner                                       |
| `enabledByDefault` | booleskt?   | Automatisk aktivering vid installation                               |
| `configSchema`     | objekt?     | Karta över konfigurationsfält (`string`/`number`/`boolean`/`select`) |
| `integrity`        | sträng?     | Valfri `sha256-<base64>` ingångsfil pin                              |

Behörigheter hämtas från enum `network` / `file-read` / `file-write` / `env` / `exec`. Endast `env` har en körtidseffekt (en något större miljövariabel godkännandelista för barnet); de andra är förklaringar och verkställs inte.

## Livscykelflöde

```
install (POST /api/plugins, sökväg)
  → skanna/validera manifest → kopiera till mellanlagring → verifiera att main finns i katalogen
  → atomärt namnbyte till ~/.omniroute/plugins/<name> → infoga databasrad
  → utlös onInstall → om enabledByDefault: aktivera

activate (POST /api/plugins/{name}/activate)
  → kontrollera inneslutning via realpath → loadPlugin() (starta underordnad process)
  → registrera deklarerade hooks → status = "active" → utlös onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → utlös onDeactivate (FÖRE avregistrering) → avregistrera hooks
  → avsluta underordnad process → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → inaktivera om aktiv → utlös onUninstall
  → rekursiv borttagning av plugin-katalogen med inneslutningskontroll → ta bort databasrad
```

Om `install` körs igen mot en katalog vars manifestversion är **strikt
nyare** än den installerade versionen sker en automatisk uppgradering (ren ominstallation; konfigurationen återställs
till standardvärdena). En version som är samma eller äldre avvisas.

## Databas

Tabellen `plugins` (migrering `076_create_plugins.sql`):

| Kolumn          | Typ     | Anmärkningar                                             |
| --------------- | ------- | -------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                     |
| `name`          | TEXT    | Unikt                                                    |
| `version`       | TEXT    | semver; standardvärde `1.0.0`                            |
| `description`   | TEXT    | Valfritt                                                 |
| `author`        | TEXT    | Valfritt                                                 |
| `license`       | TEXT    | Standardvärde `MIT`                                      |
| `main`          | TEXT    | Startfil; standardvärde `index.js`                       |
| `source`        | TEXT    | Standardvärde `local`                                    |
| `tags`          | TEXT    | JSON-array; standardvärde `[]`                           |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`         |
| `enabled`       | INT     | 0/1; standardvärde 0                                     |
| `manifest`      | TEXT    | Fullständigt manifest i JSON-format                      |
| `config`        | TEXT    | JSON; standardvärde `{}`                                 |
| `config_schema` | TEXT    | JSON; standardvärde `{}`                                 |
| `hooks`         | TEXT    | JSON-array med deklarerade hook-namn; standardvärde `[]` |
| `permissions`   | TEXT    | JSON-array; standardvärde `[]`                           |
| `plugin_dir`    | TEXT    | Absolut installationskatalog                             |
| `error_message` | TEXT    | Anges när `status = "error"`                             |
| `installed_at`  | TEXT    | `datetime('now')`                                        |
| `updated_at`    | TEXT    | `datetime('now')`                                        |
| `activated_at`  | TEXT    | Anges vid aktivering                                     |

Plugin-mätvärden och analyser spåras i ytterligare tabeller
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Instrumentpanel

Instrumentpanelssidan på `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) har två flikar:

- **Installerad** — listar installerade plugins med deras deklarerade krokar, en activate/deactivate växling, en avinstallationsknapp och en "Sök efter plugins"-åtgärd (`POST /api/plugins/scan`).
- **Marknad** — visar katalogen från `GET /api/plugins/marketplace` med ett fält för att ställa in det anpassade registret URL.

Sidan visar alltid en varning om att plugins körs med alla rättigheter för OmniRoute processen.

En konfigurationssida per plugin finns på `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Se även

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  varför `/api/plugins` endast är tillgänglig via loopback (nivå 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — det relaterade ramverket för färdigheter
  (`src/lib/skills/`); plugins kan deklarera färdigheter i sina manifest
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — händelsedrivna utgående
  integrationer
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  `buildErrorBody()`-mönstret som varje plugin-rutt använder för felsvar
