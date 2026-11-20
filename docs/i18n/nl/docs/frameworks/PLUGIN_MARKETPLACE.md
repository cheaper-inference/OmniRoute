# Plugin Marketplace (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Bron van waarheid:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` en
> `src/app/(dashboard)/dashboard/plugins/`
> **Laatst bijgewerkt:** 2026-06-28 — v3.8.40

OmniRoute wordt geleverd met een pluginsysteem in WordPress-stijl. Plugins zijn zelfstandige
mappen — elk met een `plugin.json`-manifest en een invoerbestand — die inhaken
op de aanvraagpijplijn (`onRequest` / `onResponse` / `onError`) en op
levenscyclusgebeurtenissen (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

De **Plugin Marketplace** is de ontdekkingslaag boven op dat systeem. Deze
biedt een doorzoekbare catalogus met installeerbare plugins. Standaard bestaat de catalogus uit
een klein ingebouwd basisregister; een beheerder kan een aangepaste externe
register-URL instellen. In dat geval wordt het ophalen beveiligd met een DNS-gebaseerde SSRF-beveiliging
(zie [Beveiliging](#security)).

Elke pluginroute is **uitsluitend via loopback bereikbaar** (niveau 1 — `LOCAL_ONLY`): plugins laden
code en voeren deze uit in childprocessen, waardoor de routes niet bereikbaar zijn vanaf een
niet-loopbackoorsprong, ongeacht de authenticatie. Zie
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Hoe het past Together

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

- **Registerlaag** — `src/lib/plugins/marketplace.ts`: geeft een overzicht van/doorzoekt de catalogus en valt bij elke fout terug naar het zaadregister.
- **Levenscycluslaag** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): installeren, upgraden, activeren, deactiveren, verwijderen, scannen, opstarten laden.
- **Duidelijke laag** — `src/lib/plugins/manifest.ts`: Zod schema + standaardwaarden voor `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: ontdekt plug-ins op schijf onder de plug-inmap.
- **Lader** — `src/lib/plugins/loader.ts`: brengt elke plug-in voort in een afzonderlijk Node.js onderliggend proces en makelaars haken oproepen af via IPC. Het onderliggende item is geen sandbox (zie "Isolatie van plug-inuitvoering" hieronder).

## Marketplace-catalogus

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) retourneert een lijst met
`MarketplaceEntry`-objecten:

| Veld          | Type     | Opmerkingen                                |
| ------------- | -------- | ------------------------------------------ |
| `name`        | string   | Pluginnaam in kebab-case                   |
| `version`     | string   | semver                                     |
| `description` | string   | Korte samenvatting                         |
| `author`      | string   | Auteur / organisatie                       |
| `license`     | string   | Licentie-id in SPDX-stijl                  |
| `downloadUrl` | string   | Download-URL van de bron (kan leeg zijn)   |
| `repository`  | string?  | Optionele repository-URL                   |
| `tags`        | string[] | Tags voor zoeken/filteren                  |
| `downloads`   | number   | Aantal downloads                           |
| `rating`      | number   | 0–5                                        |
| `verified`    | boolean  | Of het item als geverifieerd is gemarkeerd |
| `lastUpdated` | string   | Datumtekenreeks in een ISO-achtige notatie |

Wanneer er geen aangepaste register-URL is geconfigureerd, gebruikt de catalogus het ingebouwde
`SEED_REGISTRY` (momenteel `request-logger`, `rate-limiter`, `cost-tracker` en
`theme-manager`). Het basisregister is altijd beschikbaar — als een geconfigureerd extern
register onbereikbaar is, een andere status dan `200` retourneert of een niet-herkende
inhoud retourneert, registreert `listMarketplacePlugins()` een waarschuwing en valt het terug op de basislijst.

> Opmerking: de **catalogus** van de marketplace (bladeren/zoeken) is end-to-end aangesloten, maar
> installatie met één klik vanuit de marketplace-**catalogus** is nog niet geïmplementeerd — de
> knop "Installeren" in het dashboard bij een marketplace-item toont momenteel een
> melding dat deze functie "binnenkort beschikbaar" is. Installatie verloopt momenteel via de installatieprocedure
> voor lokale paden (`POST /api/plugins`) en detectie op schijf (`POST /api/plugins/scan`).

## REST API

Voor alle eindpunten is beheerauthenticatie vereist (`requireManagementAuth`)** En** zijn alleen loopback — `/api/plugins` en `/api/plugins/` worden vermeld in `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Eindpunt                         | Methode | Beschrijving                                                    |
| -------------------------------- | ------- | --------------------------------------------------------------- |
| `/api/plugins`                   | GET     | Lijst met geïnstalleerde plug-ins (optioneel `?status=` filter) |
| `/api/plugins`                   | POST    | Installeer een plug-in vanuit de map met plug-inbronnen         |
| `/api/plugins/scan`              | POST    | Scan de map met plug-ins en registreer nieuwe plug-ins          |
| `/api/plugins/marketplace`       | GET     | Lijst met marktplaatscatalogusitems                             |
| `/api/plugins/[name]`            | GET     | Ontvang geïnstalleerde plug-indetails                           |
| `/api/plugins/[name]`            | DELETE  | Een plug-in verwijderen                                         |
| `/api/plugins/[name]/activate`   | POST    | Activeren ( + registerhaken laden)                              |
| `/api/plugins/[name]/deactivate` | POST    | Deactiveren ( `onDeactivate` afvuren, hooks afmelden)           |
| `/api/plugins/[name]/config`     | GET     | Haal plug-inconfiguratie + -configuratieschema op               |
| `/api/plugins/[name]/config`     | PUT     | Update plug-inconfiguratie (gevalideerd volgens schema)         |

Het `GET /api/plugins` `status` filter accepteert een van `installed` / `active` / `inactive` / `error`. Een ongeldige waarde retourneert `400`.

### Lijst met geïnstalleerde plug-ins

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Installeer vanaf een lokaal pad

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

De `path` moet een zijn** absoluut** pad naar een map** in de map met plug-inbronnen** : `plugin-sources` naast de root van de plug-in, dus standaard `~/.omniroute/plugin-sources/`, of `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/` als die variabele is ingesteld (`getPluginSourcesDir()` in `src/lib/plugins/installSource.ts`). Kopieer of kloon eerst de plug-in daar. De installatie wordt geweigerd met `400` als het pad `..` of een null-byte bevat, buiten die map ligt, daarbuiten wordt omgezet via een symlink, een symlink bevat waarvan het doel daarbuiten ligt, of als de map niet bestaat. De bronmap moet een geldige `plugin.json` bevatten (of een ouder ervan zijn). Bij succes is het antwoord `201` met de geïnstalleerde plug-inrij.

In tegenstelling tot de andere plug-inroutes vereist deze de beheerreferentie (een dashboardsessie of een API -sleutel met beheerbereik), zelfs als inloggen is uitgeschakeld (`requireLogin=false`): het installeren van code is nooit een anonieme actie.

### Blader door de marktplaats

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Update plug-inconfiguratie

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` valideert elke opgegeven waarde tegen de `configSchema` van de plug-in (gedeclareerd in het manifest): `number` velden respecteren `min`/`max`, `select` -velden moeten overeenkomen met de gedeclareerde `enum`. Sleutels die niet in het schema aanwezig zijn, worden toegelaten.

## Configuratie

### Pluginmap

Plugins bevinden zich onder de OmniRoute-gegevensmap:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (of waar manifest.main naar verwijst)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) bepaalt die map in
drie stappen:

1. **`OMNIROUTE_PLUGINS_DIR`**, indien ingesteld — wordt letterlijk gebruikt, ongeacht wat `HOME` aangeeft. Dit is
   de expliciete instelling voor Docker/K8s, waar de pluginstructuur via een bind-mount aan een pad is gekoppeld
   dat meestal niets met de thuismap van de container te maken heeft (#11827).
2. `<home>/.omniroute/plugins`, waarbij `<home>` afkomstig is uit de omgevingsvariabelen `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, wanneer het proces helemaal geen thuismap exporteert.

De bepaalde map wordt bij het opstarten eenmaal gelogd als `scanner.dir_resolved`, met
vermelding van de gebruikte invoer (`OMNIROUTE_PLUGINS_DIR`, `home` of `no-home-fallback`) — zodat een image
dat stilzwijgend bij stap 3 uitkomt dit meldt, in plaats van alleen een lege pluginlijst te rapporteren.
`POST /api/plugins/scan` detecteert elke submap daarin die een geldig
`plugin.json` bevat en registreert deze; dezelfde map is de hoofdmap waarnaar
`pluginManager.install()` plugins kopieert, zodat een override zowel de detectie als
de installatie verplaatst.

> **`OMNIROUTE_PLUGINS_DIR` is niet `OMNIROUTE_PLUGIN_PATH`.** Die laatste wordt alleen gelezen door
> de command-plugin-loader van de CLI (`bin/cli/plugins.mjs`) om `omniroute-cmd-*`-npm-
> pakketten te vinden die `omniroute`-subcommando's toevoegen — deze heeft geen effect op de hier
> beschreven runtimescanner. Zie [PLUGINS.md](./PLUGINS.md) voor dat onderdeel.

### Aangepaste URL voor het marketplace-register

De bron van de marketplacecatalogus wordt gelezen uit de instelling `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` leest `settings.pluginMarketplaceUrl`). Wanneer
deze is ingesteld op een `http(s)`-URL, haalt `listMarketplacePlugins()` die URL op en accepteert
het ofwel een JSON-array met items op het hoogste niveau, ofwel een object met een `plugins`-array;
items zonder een `name` van het type string worden uitgefilterd. Wanneer de instelling niet is ingesteld
(of wanneer het ophalen niet door de SSRF-beveiliging komt / een ongeldige respons retourneert), wordt
het ingebouwde initiële register gebruikt.

Het tabblad "Marketplace" van het dashboard bevat een veld voor deze URL (teruggelezen via
`GET /api/settings`).

> Implementatieopmerking: de actie "Opslaan" van het dashboard verzendt
> `pluginMarketplaceUrl` naar `PATCH /api/settings`. Op het moment van schrijven is deze
> sleutel niet gedeclareerd in `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), dus controleer in uw
> release of de instelling wordt opgeslagen voordat u erop vertrouwt — het **leespad** (`getSettings()` →
> `listMarketplacePlugins()`) respecteert de sleutel zodra deze in de instellingenopslag
> aanwezig is.

## Beveiliging

### Alleen routelaag — loopback

Plug-ins voeren code uit in voortgebrachte onderliggende processen, zodat het gehele `/api/plugins` oppervlak `LOCAL_ONLY` wordt geclassificeerd (Tier 1). Loopback-handhaving is onvoorwaardelijk** voor** elke auth-controle, zodat een gelekt beheertoken dat de box via een tunnel bereikt, nog steeds geen plug-in kan installeren, activeren of verwijderen. Zie [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) en Harde regels #15 / #17.

### Marktplaats register SSRF guard

Een aangepast register URL is een configuratie die door aanvallers kan worden beïnvloed, dus voordat `listMarketplacePlugins()` het ophaalt, doorloopt het twee lagen:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Verwerpt alles dat niet `http:` / `https:` is.
   - Verwerpt letterlijke private/loopback/link-local/ULA hosts (IPv4** En** IPv6, inclusief IPv4-mapped) via de canonieke `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Lost op** beide** `A` en `AAAA` registreren en weigeren if** elk** opgelost adres is private — en sluit de publieke-hostnaam → private-IP-bypass.
   - **Mislukt gesloten** : een mislukte DNS -resolutie verwerpt de URL.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): past de publieke URL -beveiliging opnieuw toe tijdens het ophalen en** blokkeert omleidingen** (geen publieke → private `30x` -spil).

Een URL die een van beide lagen faalt, breekt het verzoek niet af — De marktplaats valt stil terug naar het ingebouwde zaadregister en registreert een waarschuwing.

> Deze bewaker is specifiek versterkt in PR #3774 om A + AAAA op te lossen en de canonieke `isPrivateHost` te gebruiken in plaats van een IPv4-only -controle.

### Isolatie van plug-inuitvoering

> **Plug-ins zijn niet in een sandbox geplaatst.** Het kind is een gewoon Node.js proces dat wordt uitgevoerd als de OmniRoute gebruiker, zonder VM context en zonder Node.js toestemmingsvlaggen, dus de plug-incode kan elk bestand lezen en schrijven dat de gebruiker kan, programma's uitvoeren en het netwerk bereiken. `requires.permissions` beslist alleen welke omgevingsvariabelen het kind krijgt; de overige machtigingen worden niet afgedwongen. Installeer alleen plug-ins die u vertrouwt. De onderstaande procesgrens bevat crashes en vastlopen; het is geen veiligheidsgrens.

- **Procesisolatie** — `loadPlugin()` (`src/lib/plugins/loader.ts`) brengt elke plug-in voort in een apart Node.js onderliggend proces en communiceert via IPC. Hook-oproepen hebben een time-out met `SIGTERM` → `SIGKILL` escalatie.
- **Env-toelatingslijst** — het kind ontvangt alleen een reeks omgevingsvariabelen die op de toelatingslijst staan; de bredere set wordt alleen verleend als het manifest de `env` toestemming vraagt.
- **Installeer bronbeperking** — `POST /api/plugins` leest alleen vanuit de map met bronnen voor de plug-in (zie "Installeren vanaf een lokaal pad"): het pad wordt gecanoniseerd met `realpath`, moet strikt binnen die map blijven, en een bronboom met een symbolische link die eraan ontsnapt, wordt geweigerd voordat er iets wordt gekopieerd.
- **Padinsluiting** — install/upgrade/uninstall beweert dat de plug-inmap en `manifest.main` worden opgelost** binnenin** de beheerde plug-in root vóór elke kopie of recursieve verwijdering (beveiligt tegen geknoeide DB paden en `../` -traversal in `manifest.main`). Activering lost symlinks op via `realpath` en weigert een toegangspunt te laden dat uit de plug-inmap ontsnapt.
- **Optionele integriteitspin** — een manifest kan een `integrity` veld (`sha256-<base64>`, SRI -formaat) declareren. Indien aanwezig, verifieert de lader de hash van het invoerbestand tijdens het laden en weigert deze te activeren als deze niet overeenkomt. Het is opt-in-sabotagedetectie,** niet** een beveiligingsgrens: deze beperkt niet wat een geladen plug-in kan doen.
- **Geen klantreferenties in hooks** — de context die wordt doorgegeven aan `onRequest`, `onResponse` en `onError` zijn de headers `authorization`, `x-api-key`, `proxy-authorization` en `cookie` verwijderd, en de API -sleutelrecord bevat geen sleutelwaarde (`redactPluginContext()` in `src/lib/plugins/hooks.ts`).

## Manifest (`plugin.json`)

Gevalideerd door `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Veld               | Type        | Opmerkingen                                                         |
| ------------------ | ----------- | ------------------------------------------------------------------- |
| `name`             | snaar       | Vereist; kebabdoos (`^[a-z0-9-]+$`), 1–100 tekens                   |
| `version`          | snaar       | Vereist; semver (`MAJOR.MINOR.PATCH`)                               |
| `description`      | snaar?      | ≤ 500 tekens                                                        |
| `author`           | snaar?      | ≤ 200 tekens                                                        |
| `license`          | snaar?      | Standaard ingesteld op `MIT`                                        |
| `main`             | snaar?      | Invoerbestand; standaard ingesteld op `index.js`                    |
| `source`           | opsomming?  | `local` \| `marketplace` (standaard `local`)                        |
| `tags`             | snaar[]?    | Tags zoeken                                                         |
| `requires`         | voorwerp?   | `{ omniroute?, permissions[] }`                                     |
| `hooks`            | voorwerp?   | Booleans die aangeven welke hooks de plug-in implementeert          |
| `skills`           | voorwerp[]? | Optionele vaardigheidsdefinities                                    |
| `enabledByDefault` | booleaans?  | Automatisch activeren bij installatie                               |
| `configSchema`     | voorwerp?   | Kaart met configuratievelden (`string`/`number`/`boolean`/`select`) |
| `integrity`        | snaar?      | Optionele `sha256-<base64>` -invoerbestandspincode                  |

Machtigingen worden gehaald uit de enum `network` / `file-read` / `file-write` / `env` / `exec`. Alleen `env` heeft een runtime-effect (een iets grotere toelatingslijst met omgevingsvariabelen voor het kind); de andere zijn verklaringen en worden niet afgedwongen.

## Levenscyclus

```
install (POST /api/plugins, pad)
  → manifest scannen/valideren → naar staging kopiëren → controleren of main zich binnen de map bevindt
  → atomair hernoemen naar ~/.omniroute/plugins/<name> → databaserij invoegen
  → onInstall aanroepen → indien enabledByDefault: activeren

activate (POST /api/plugins/{name}/activate)
  → insluitingscontrole via realpath → loadPlugin() (onderliggend proces starten)
  → gedeclareerde hooks registreren → status = "active" → onActivate aanroepen

deactivate (POST /api/plugins/{name}/deactivate)
  → onDeactivate aanroepen (VÓÓR afregistratie) → hooks afregistreren
  → onderliggend proces beëindigen → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deactiveren indien actief → onUninstall aanroepen
  → recursief verwijderen van pluginmap met insluitingscontrole → databaserij verwijderen
```

Als `install` opnieuw wordt uitgevoerd voor een map waarvan de manifestversie **strikt
nieuwer** is dan de geïnstalleerde versie, wordt automatisch een upgrade uitgevoerd
(schone herinstallatie; configuratie wordt teruggezet naar de standaardwaarden).
Dezelfde of een oudere versie wordt geweigerd.

## Database

Tabel `plugins` (migratie `076_create_plugins.sql`):

| Kolom           | Type    | Opmerkingen                                            |
| --------------- | ------- | ------------------------------------------------------ |
| `id`            | TEXT PK | UUID                                                   |
| `name`          | TEXT    | Uniek                                                  |
| `version`       | TEXT    | semver; standaard `1.0.0`                              |
| `description`   | TEXT    | Optioneel                                              |
| `author`        | TEXT    | Optioneel                                              |
| `license`       | TEXT    | Standaard `MIT`                                        |
| `main`          | TEXT    | Startbestand; standaard `index.js`                     |
| `source`        | TEXT    | Standaard `local`                                      |
| `tags`          | TEXT    | JSON-array; standaard `[]`                             |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`       |
| `enabled`       | INT     | 0/1; standaard 0                                       |
| `manifest`      | TEXT    | Volledig manifest als JSON                             |
| `config`        | TEXT    | JSON; standaard `{}`                                   |
| `config_schema` | TEXT    | JSON; standaard `{}`                                   |
| `hooks`         | TEXT    | JSON-array met gedeclareerde hooknamen; standaard `[]` |
| `permissions`   | TEXT    | JSON-array; standaard `[]`                             |
| `plugin_dir`    | TEXT    | Absolute installatiemap                                |
| `error_message` | TEXT    | Ingesteld wanneer `status = "error"`                   |
| `installed_at`  | TEXT    | `datetime('now')`                                      |
| `updated_at`    | TEXT    | `datetime('now')`                                      |
| `activated_at`  | TEXT    | Ingesteld bij activering                               |

Pluginmetrieken en -analyses worden bijgehouden in aanvullende tabellen
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dashboard

De dashboardpagina op `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) biedt twee tabbladen:

- **Geïnstalleerd** — geeft een overzicht van geïnstalleerde plug-ins met hun gedeclareerde hooks, een activate/deactivate -schakelaar, een verwijderknop en een actie "Scannen naar plug-ins" (`POST /api/plugins/scan`).
- **Marktplaats** — toont de catalogus van `GET /api/plugins/marketplace` met een veld om het aangepaste register URL in te stellen.

De pagina toont altijd een waarschuwing dat plug-ins worden uitgevoerd met de volledige rechten van het OmniRoute -proces.

Een configuratiepagina per plug-in bevindt zich op `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Zie ook

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  waarom `/api/plugins` alleen via loopback toegankelijk is (Tier 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — het gerelateerde skillsframework
  (`src/lib/skills/`); plug-ins kunnen skills declareren in hun manifest
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — gebeurtenisgestuurde uitgaande
  integraties
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  het `buildErrorBody()`-patroon dat elke plug-inroute gebruikt voor foutresponses
