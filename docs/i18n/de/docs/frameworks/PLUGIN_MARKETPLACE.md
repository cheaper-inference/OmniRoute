# Plugin Marketplace (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Verbindliche Quelle:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/` und
> `src/app/(dashboard)/dashboard/plugins/`
> **Zuletzt aktualisiert:** 2026-06-28 — v3.8.40

OmniRoute enthält ein Plugin-System nach dem Vorbild von WordPress. Plugins sind eigenständige
Verzeichnisse — jeweils mit einem `plugin.json`-Manifest und einer Einstiegsdatei —, die sich
in die Anfrage-Pipeline (`onRequest` / `onResponse` / `onError`) und in
Lebenszyklusereignisse (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`) einklinken.

Der **Plugin-Marktplatz** bildet die Erkennungsebene über diesem System. Er
stellt einen durchsuchbaren Katalog installierbarer Plugins bereit. Standardmäßig besteht der Katalog
aus einer kleinen integrierten Ausgangsregistrierung. Ein Betreiber kann stattdessen eine benutzerdefinierte Remote-
Registrierungs-URL angeben. In diesem Fall wird der Abruf durch einen DNS-auflösenden SSRF-Schutz
abgesichert (siehe [Sicherheit](#security)).

Jede Plugin-Route ist **nur über Loopback erreichbar** (Stufe 1 — `LOCAL_ONLY`): Plugins laden
Code und führen ihn in untergeordneten Prozessen aus. Daher sind die Routen unabhängig von der Authentifizierung
nicht von einem Nicht-Loopback-Ursprung aus erreichbar. Siehe
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Wie es passt Together

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

- **Registrierungsebene** — `src/lib/plugins/marketplace.ts`: listet/durchsucht den Katalog und greift bei jedem Fehler auf die Seed-Registrierung zurück.
- **Lebenszyklusschicht** — `src/lib/plugins/manager.ts` (`pluginManager` singleton): installieren, aktualisieren, aktivieren, deaktivieren, deinstallieren, scannen, beim Start laden.
- **Manifest-Schicht** — `src/lib/plugins/manifest.ts`: Zod Schema + Standardwerte für `plugin.json`.
- **Scanner** — `src/lib/plugins/scanner.ts`: Erkennt Plugins auf der Festplatte im Plugin-Verzeichnis.
- **Lader** — `src/lib/plugins/loader.ts`: erzeugt jedes Plugin in einem separaten untergeordneten Node.js -Prozess und vermittelt Hook-Aufrufe über IPC. Das untergeordnete Element ist keine Sandbox (siehe „Isolation der Plugin-Ausführung“ unten).

## Marktplatzkatalog

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) gibt eine Liste von
`MarketplaceEntry`-Objekten zurück:

| Feld          | Typ      | Hinweise                                    |
| ------------- | -------- | ------------------------------------------- |
| `name`        | string   | Plugin-Name in kebab-case                   |
| `version`     | string   | semver                                      |
| `description` | string   | Kurze Zusammenfassung                       |
| `author`      | string   | Autor / Organisation                        |
| `license`     | string   | Lizenz-ID im SPDX-Stil                      |
| `downloadUrl` | string   | Quell-Download-URL (kann leer sein)         |
| `repository`  | string?  | Optionale Repository-URL                    |
| `tags`        | string[] | Tags zum Suchen/Filtern                     |
| `downloads`   | number   | Anzahl der Downloads                        |
| `rating`      | number   | 0–5                                         |
| `verified`    | boolean  | Ob der Eintrag als verifiziert markiert ist |
| `lastUpdated` | string   | ISO-ähnliche Datumszeichenfolge             |

Wenn keine benutzerdefinierte Registrierungs-URL konfiguriert ist, verwendet der Katalog die integrierte
`SEED_REGISTRY` (derzeit `request-logger`, `rate-limiter`, `cost-tracker` und
`theme-manager`). Die Ausgangsregistrierung ist immer verfügbar — wenn eine konfigurierte Remote-
Registrierung nicht erreichbar ist, einen anderen Status als `200` zurückgibt oder einen nicht erkannten
Inhalt liefert, protokolliert `listMarketplacePlugins()` eine Warnung und greift auf die Ausgangsliste zurück.

> Hinweis: Der **Katalog** des Marktplatzes (Durchsuchen/Suchen) ist durchgängig angebunden, aber
> die Ein-Klick-**Installation** aus dem Marktplatzkatalog ist noch nicht implementiert —
> die Schaltfläche „Installieren“ im Dashboard zeigt bei einem Marktplatzeintrag derzeit einen
> Hinweis „Demnächst verfügbar“ an. Installationen erfolgen aktuell über den Installationsablauf
> mit lokalem Pfad (`POST /api/plugins`) und die Erkennung auf dem Datenträger (`POST /api/plugins/scan`).

## REST API

Alle Endpunkte erfordern eine Verwaltungsauthentifizierung (`requireManagementAuth`).** Und** sind nur Loopback, — `/api/plugins` und `/api/plugins/` sind in `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) aufgeführt.

| Endpunkt                           | Verfahren | Beschreibung                                                         |
| ---------------------------------- | --------- | -------------------------------------------------------------------- |
| `/api/plugins`                     | GET       | Installierte Plugins auflisten (optionaler `?status=` Filter)        |
| `/api/plugins`                     | POST      | Installieren Sie ein Plugin aus dem Plugin-Quellenverzeichnis        |
| `/api/plugins/scan`                | POST      | Scannen Sie das Plugin-Verzeichnis und registrieren Sie neue Plugins |
| `/api/plugins/marketplace`         | GET       | Marktplatz-Katalogeinträge auflisten                                 |
| `/api/plugins/marketplace/install` | POST      | Installieren Sie ein Marktplatz-Plugin mit Namen                     |
| `/api/plugins/[name]`              | GET       | Erhalten Sie Details zum installierten Plugin                        |
| `/api/plugins/[name]`              | DELETE    | Deinstallieren Sie ein Plugin                                        |
| `/api/plugins/[name]/activate`     | POST      | Aktivieren ( + Register-Hooks laden)                                 |
| `/api/plugins/[name]/deactivate`   | POST      | Deaktivieren ( `onDeactivate` auslösen, Hooks abmelden)              |
| `/api/plugins/[name]/config`       | GET       | Holen Sie sich das Plugin-Konfigurations- + -Konfigurationsschema    |
| `/api/plugins/[name]/config`       | PUT       | Plugin-Konfiguration aktualisieren (gegen Schema validiert)          |

Der `GET /api/plugins` `status` Filter akzeptiert einen von `installed` / `active` / `inactive` / `error`. Ein ungültiger Wert gibt `400` zurück.

### Installierte Plugins auflisten

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Von einem lokalen Pfad installieren

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

Der `path` muss ein sein** Absolute** Pfad zu einem Verzeichnis** im Plugin-Quellenverzeichnis** : `plugin-sources` neben dem Plugin-Root, also standardmäßig `~/.omniroute/plugin-sources/` oder `<parent of OMNIROUTE_PLUGINS_DIR>/plugin-sources/`, wenn diese Variable gesetzt ist (`getPluginSourcesDir()` in `src/lib/plugins/installSource.ts`). Kopieren oder klonen Sie das Plugin zunächst dorthin. Die Installation wird mit `400` abgelehnt, wenn der Pfad `..` oder ein Nullbyte enthält, außerhalb dieses Verzeichnisses liegt, über einen symbolischen Link außerhalb davon aufgelöst wird, einen symbolischen Link enthält, dessen Ziel außerhalb des Verzeichnisses liegt, oder wenn das Verzeichnis nicht existiert. Das Quellverzeichnis muss ein gültiges `plugin.json` enthalten (oder ein übergeordnetes Verzeichnis davon sein). Bei Erfolg lautet die Antwort `201` mit der installierten Plugin-Zeile.

Im Gegensatz zu den anderen Plugin-Routen erfordert diese die Verwaltungsanmeldeinformationen (eine Dashboard-Sitzung oder einen API -Schlüssel mit Verwaltungsbereich), selbst wenn die Anmeldung deaktiviert ist (`requireLogin=false`): Die Installation von Code ist niemals eine anonyme Aktion. Das Gleiche gilt für `POST /api/plugins/marketplace/install` (body `{ "name": "<plugin>" }`).

### Durchsuchen Sie den Marktplatz

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Plugin-Konfiguration aktualisieren

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` validiert den Body anhand des `configSchema` des Plugins (im Manifest deklariert) mit `validatePluginConfig()` von `src/lib/plugins/manifest.ts`: Jeder Schlüssel muss im Schema deklariert werden, Werte müssen mit dem deklarierten Typ übereinstimmen, `number` Felder berücksichtigen `min`/`max` und `select` Felder müssen mit dem deklarierten `enum` übereinstimmen. Jeder Verstoß gibt `400` zurück und es wird nichts gespeichert. Ein Plugin, das kein `configSchema` deklariert, hat keine konfigurierbaren Schlüssel, daher wird die Anfrage mit `400` abgelehnt („Plugin deklariert keine konfigurierbaren Schlüssel“).

## Konfiguration

### Plugin-Verzeichnis

Plugins befinden sich im OmniRoute-Datenverzeichnis:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (oder worauf manifest.main verweist)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) ermittelt dieses Verzeichnis
in drei Schritten:

1. **`OMNIROUTE_PLUGINS_DIR`**, sofern gesetzt — wird unabhängig vom Wert von `HOME`
   unverändert verwendet. Dies ist die explizite Option für Docker/K8s, wo der
   Plugin-Verzeichnisbaum per Bind-Mount unter einem Pfad eingebunden ist, der
   üblicherweise nichts mit dem Home-Verzeichnis des Containers zu tun hat (#11827).
2. `<home>/.omniroute/plugins`, wobei `<home>` aus den Umgebungsvariablen `HOME` /
   `USERPROFILE` stammt.
3. `/tmp/.omniroute/plugins`, wenn der Prozess überhaupt kein Home-Verzeichnis
   exportiert.

Das ermittelte Verzeichnis wird beim Start einmal als `scanner.dir_resolved`
protokolliert, einschließlich der maßgeblichen Eingabe (`OMNIROUTE_PLUGINS_DIR`,
`home` oder `no-home-fallback`) — dadurch meldet ein Image, das unbemerkt bei
Schritt 3 landet, diesen Umstand, anstatt lediglich eine leere Plugin-Liste
auszugeben. `POST /api/plugins/scan` erkennt dort jedes Unterverzeichnis, das
eine gültige `plugin.json` enthält, und registriert es; dasselbe Verzeichnis ist
das Stammverzeichnis, in das `pluginManager.install()` Plugins kopiert, sodass
eine Überschreibung Erkennung und Installation gemeinsam verschiebt.

> **`OMNIROUTE_PLUGINS_DIR` ist nicht `OMNIROUTE_PLUGIN_PATH`.** Letzteres wird nur
> vom CLI-Loader für Befehls-Plugins (`bin/cli/plugins.mjs`) gelesen, um
> `omniroute-cmd-*`-npm-Pakete zu finden, die `omniroute`-Unterbefehle hinzufügen —
> es hat keine Auswirkungen auf den hier beschriebenen Laufzeit-Scanner. Siehe
> [PLUGINS.md](./PLUGINS.md) für diese Variante.

### Benutzerdefinierte Marketplace-Registry-URL

Die Quelle des Marketplace-Katalogs wird aus der Einstellung
`pluginMarketplaceUrl` gelesen (`src/lib/plugins/marketplace.ts` liest
`settings.pluginMarketplaceUrl`). Wenn sie auf eine `http(s)`-URL gesetzt ist,
ruft `listMarketplacePlugins()` diese URL ab und akzeptiert entweder ein
JSON-Array von Einträgen auf oberster Ebene oder ein Objekt mit einem
`plugins`-Array; Einträge ohne einen `name` vom Typ String werden herausgefiltert.
Wenn sie nicht gesetzt ist (oder wenn der Abruf an der SSRF-Schutzprüfung
scheitert bzw. eine fehlerhafte Antwort zurückgibt), wird die integrierte
Ausgangs-Registry verwendet.

Der Dashboard-Tab „Marketplace“ stellt ein Feld für diese URL bereit (die über
`GET /api/settings` zurückgelesen wird).

> Implementierungshinweis: Die Dashboard-Aktion „Speichern“ sendet
> `pluginMarketplaceUrl` an `PATCH /api/settings`. Zum Zeitpunkt der Erstellung
> ist dieser Schlüssel nicht in `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`) deklariert. Überprüfen Sie daher
> die Persistenz in Ihrer Version, bevor Sie sich darauf verlassen — der
> **Lese**pfad (`getSettings()` → `listMarketplacePlugins()`) berücksichtigt den
> Schlüssel, sobald er im Einstellungsspeicher vorhanden ist.

## Sicherheit

### Nur — -Loopback auf Routenebene

Plugins führen Code in erzeugten untergeordneten Prozessen aus, sodass die gesamte `/api/plugins` Oberfläche `LOCAL_ONLY` (Tier 1) klassifiziert ist. Die Loopback-Erzwingung wird bedingungslos ausgeführt** vor** Es gibt keine Authentifizierungsprüfung, sodass ein durchgesickertes Management-Token, das die Box über einen Tunnel erreicht, immer noch kein Plugin installieren, aktivieren oder deinstallieren kann. Siehe [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) und harte Regeln #15 / #17.

### Marketplace-Registrierung SSRF Guard

Eine benutzerdefinierte Registrierung URL ist eine Konfiguration, die von Angreifern beeinflusst werden kann. Bevor `listMarketplacePlugins()` sie abruft, durchläuft sie zwei Ebenen:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Lehnt alles ab, was nicht `http:` / `https:` ist.
   - Lehnt literale private/loopback/link-local/ULA Hosts ab (IPv4** Und** IPv6, einschließlich IPv4-mapped) über das kanonische `isPrivateHost` (`src/shared/network/outboundUrlGuard.ts`).
   - Löst sich auf** beide** `A` und `AAAA` zeichnen auf und lehnen es ab, wenn** beliebig** Die aufgelöste Adresse ist privates — wodurch die Umgehung der privaten IP von public-hostname → geschlossen wird.
   - **Schlägt fehl** : Ein DNS -Auflösungsfehler lehnt den URL ab.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`** (`src/shared/network/safeOutboundFetch.ts`): wendet den nur öffentlichen URL Schutz zum Zeitpunkt des Abrufs erneut an und** blockiert Weiterleitungen** (kein öffentlicher → PrivatzQE `30x` Pivot).

Ein URL, der auf einer der beiden Ebenen fehlschlägt, bricht die Anfrage nicht ab. Der — greift stillschweigend auf die integrierte Seed-Registrierung zurück und protokolliert eine Warnung.

> Dieser Schutz wurde in PR #3774 speziell gehärtet, um einen + AAAA aufzulösen und den kanonischen `isPrivateHost` anstelle einer IPv4-only -Prüfung zu verwenden.

### Isolation der Plugin-Ausführung

> **Plugins sind standardmäßig nicht in einer Sandbox untergebracht.** Das untergeordnete Element ist ein gewöhnlicher Node.js Prozess, der als OmniRoute Benutzer ausgeführt wird, ohne VM Kontext und ohne Node.js Berechtigungsflags, sodass der Plugin-Code jede Datei lesen und schreiben kann, die der Benutzer lesen kann, Programme ausführen und das Netzwerk erreichen kann. `requires.permissions` entscheidet nur, welche Umgebungsvariablen das Kind erhält; Die anderen Berechtigungen werden nicht erzwungen. Das optionale `PLUGIN_PERMISSION_MODEL_ENABLED` -Feature-Flag (standardmäßig deaktiviert) führt jedes Plugin unter dem aus diesen Berechtigungen erstellten Node.js -Berechtigungsmodell aus, mit Ausnahme von `network`, das Node.js nicht einschränken kann (siehe [`PLUGIN_SDK.md`](./PLUGIN_SDK.md#permission-system) ). Installieren Sie nur Plugins, denen Sie vertrauen. Die Prozessgrenze unten enthält Abstürze und Hänge; es handelt sich nicht um eine Sicherheitsgrenze.

- **Prozessisolation** — `loadPlugin()` (`src/lib/plugins/loader.ts`) erzeugt jedes Plugin in einem separaten untergeordneten Node.js -Prozess und kommuniziert über IPC. Hook-Aufrufe haben eine Zeitüberschreitung mit `SIGTERM` → `SIGKILL` Eskalation.
- **Env-Zulassungsliste** — das Kind erhält nur einen Satz von Umgebungsvariablen auf der Zulassungsliste; Der breitere Satz wird nur gewährt, wenn das Manifest die `env` -Berechtigung anfordert.
- **Installieren Sie die Quelleneindämmung** — `POST /api/plugins` liest nur aus dem Plugin-Quellenverzeichnis (siehe „Von einem lokalen Pfad installieren“): Der Pfad wird mit `realpath` kanonisiert, muss strikt innerhalb dieses Verzeichnisses bleiben und ein Quellbaum mit einem symbolischen Link, der ihm entgeht, wird abgelehnt, bevor etwas kopiert wird.
- **Pfadeindämmung** — install/upgrade/uninstall behauptet, dass das Plugin-Verzeichnis und `manifest.main` aufgelöst werden** innerhalb** das verwaltete Plugin-Stammverzeichnis vor jedem Kopieren oder rekursiven Löschen (schützt vor manipulierten DB Pfaden und `../` Durchquerung in `manifest.main`). Die Aktivierung löst Symlinks über `realpath` auf und weigert sich, einen Einstiegspunkt zu laden, der das Plugin-Verzeichnis verlässt.
- **Optionaler Integritätsstift** — Manifest kann ein `integrity` Feld (`sha256-<base64>`, SRI Format) deklarieren. Wenn vorhanden, überprüft der Loader den Hash der Eintragsdatei beim Laden und verweigert die Aktivierung bei Nichtübereinstimmung. Es handelt sich um eine optionale Manipulationserkennung,** nicht** eine Sicherheitsgrenze: Sie schränkt nicht ein, was ein geladenes Plugin tun kann.
- **Keine Client-Anmeldeinformationen in Hooks** — Der an `onRequest`, `onResponse` und `onError` übergebene Kontext hat die Header `authorization`, `x-api-key`, `proxy-authorization` und `cookie` entfernt und der API Schlüsseldatensatz enthält keinen Schlüsselwert (`redactPluginContext()` in `src/lib/plugins/hooks.ts`).

## Manifest (`plugin.json`)

Validiert durch `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Feld               | Typ          | Notizen                                                               |
| ------------------ | ------------ | --------------------------------------------------------------------- |
| `name`             | Zeichenfolge | Erforderlich; Döner-Fall (`^[a-z0-9-]+$`), 1–100 Zeichen              |
| `version`          | Zeichenfolge | Erforderlich; semver (`MAJOR.MINOR.PATCH`)                            |
| `description`      | Schnur?      | ≤ 500 Zeichen                                                         |
| `author`           | Schnur?      | ≤ 200 Zeichen                                                         |
| `license`          | Schnur?      | Standardmäßig ist `MIT`                                               |
| `main`             | Schnur?      | Eintragsdatei; Der Standardwert ist `index.js`                        |
| `source`           | Aufzählung?  | `local` \| `marketplace` (standardmäßig `local`)                      |
| `tags`             | string[]?    | Suchtags                                                              |
| `requires`         | Objekt?      | `{ omniroute?, permissions[] }`                                       |
| `hooks`            | Objekt?      | Boolesche Werte, die angeben, welche Hooks das Plugin implementiert   |
| `skills`           | Objekt[]?    | Optionale Fähigkeitsdefinitionen                                      |
| `enabledByDefault` | boolesch?    | Bei der Installation automatisch aktivieren                           |
| `configSchema`     | Objekt?      | Karte der Konfigurationsfelder (`string`/`number`/`boolean`/`select`) |
| `integrity`        | Schnur?      | Optionaler `sha256-<base64>` -Eintragsdatei-Pin                       |

Berechtigungen werden aus der Enumeration `network` / `file-read` / `file-write` / `env` / `exec` entnommen. Nur `env` hat einen Laufzeiteffekt (eine etwas größere Zulassungsliste für Umgebungsvariablen für das untergeordnete Element); die anderen sind Erklärungen und werden nicht durchgesetzt.

## Lebenszyklusablauf

```
install (POST /api/plugins, Pfad)
  → Manifest scannen/validieren → in Staging kopieren → sicherstellen, dass main innerhalb des Verzeichnisses liegt
  → atomar nach ~/.omniroute/plugins/<name> umbenennen → DB-Zeile einfügen
  → onInstall auslösen → falls enabledByDefault: aktivieren

activate (POST /api/plugins/{name}/activate)
  → realpath-Einschlussprüfung → loadPlugin() (Kindprozess starten)
  → deklarierte Hooks registrieren → status = "active" → onActivate auslösen

deactivate (POST /api/plugins/{name}/deactivate)
  → onDeactivate auslösen (VOR dem Aufheben der Registrierung) → Hook-Registrierungen aufheben
  → Kindprozess beenden → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → deaktivieren, falls aktiv → onUninstall auslösen
  → rekursives Löschen des Plugin-Verzeichnisses mit Einschlussprüfung → DB-Zeile löschen
```

Wird `install` erneut für ein Verzeichnis ausgeführt, dessen Manifest-Version **strikt
neuer** als die installierte Version ist, erfolgt automatisch ein Upgrade (saubere Neuinstallation; die Konfiguration wird
auf die Standardwerte zurückgesetzt). Eine gleiche oder ältere Version wird abgelehnt.

## Datenbank

Tabelle `plugins` (Migration `076_create_plugins.sql`):

| Spalte          | Typ     | Hinweise                                              |
| --------------- | ------- | ----------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                  |
| `name`          | TEXT    | Eindeutig                                             |
| `version`       | TEXT    | semver; Standardwert `1.0.0`                          |
| `description`   | TEXT    | Optional                                              |
| `author`        | TEXT    | Optional                                              |
| `license`       | TEXT    | Standardwert `MIT`                                    |
| `main`          | TEXT    | Einstiegsdatei; Standardwert `index.js`               |
| `source`        | TEXT    | Standardwert `local`                                  |
| `tags`          | TEXT    | JSON-Array; Standardwert `[]`                         |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`      |
| `enabled`       | INT     | 0/1; Standardwert 0                                   |
| `manifest`      | TEXT    | Vollständiges Manifest-JSON                           |
| `config`        | TEXT    | JSON; Standardwert `{}`                               |
| `config_schema` | TEXT    | JSON; Standardwert `{}`                               |
| `hooks`         | TEXT    | JSON-Array deklarierter Hook-Namen; Standardwert `[]` |
| `permissions`   | TEXT    | JSON-Array; Standardwert `[]`                         |
| `plugin_dir`    | TEXT    | Absolutes Installationsverzeichnis                    |
| `error_message` | TEXT    | Wird gesetzt, wenn `status = "error"`                 |
| `installed_at`  | TEXT    | `datetime('now')`                                     |
| `updated_at`    | TEXT    | `datetime('now')`                                     |
| `activated_at`  | TEXT    | Wird bei der Aktivierung gesetzt                      |

Plugin-Metriken und -Analysen werden in zusätzlichen Tabellen erfasst
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Armaturenbrett

Die Dashboard-Seite bei `/dashboard/plugins` (`src/app/(dashboard)/dashboard/plugins/page.tsx`) bietet zwei Registerkarten:

- **Installiert** — listet installierte Plugins mit ihren deklarierten Hooks, einem activate/deactivate -Schalter, einer Deinstallationsschaltfläche und einer Aktion „Nach Plugins suchen“ (`POST /api/plugins/scan`) auf.
- **Marktplatz** — zeigt den Katalog von `GET /api/plugins/marketplace` mit einem Feld zum Festlegen der benutzerdefinierten Registrierung URL.

Auf der Seite wird immer eine Warnung angezeigt, dass Plugins mit den vollen Berechtigungen des OmniRoute Prozesses ausgeführt werden.

Eine Konfigurationsseite pro Plugin befindet sich unter `/dashboard/plugins/[name]/config` (`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Siehe auch

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  warum `/api/plugins` nur über Loopback erreichbar ist (Tier 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — das zugehörige Skills-Framework
  (`src/lib/skills/`); Plugins können Skills in ihrem Manifest deklarieren
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — ereignisgesteuerte ausgehende
  Integrationen
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  das von jeder Plugin-Route für Fehlerantworten verwendete `buildErrorBody()`-Muster
