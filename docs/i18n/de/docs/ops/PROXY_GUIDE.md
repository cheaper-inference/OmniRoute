# 🌐 OmniRoute Proxy Guide (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Umgehen Sie geografische Sperren, schützen Sie Ihre Identität und leiten Sie KI-Datenverkehr über einen beliebigen Proxy weiter — ganz ohne komplexe Konfiguration.**

OmniRoute umfasst ein voll ausgestattetes Proxy-Verwaltungssystem, mit dem Sie den Datenverkehr zu vorgelagerten KI-Anbietern über HTTP-, HTTPS- oder SOCKS5-Proxys weiterleiten können. Ganz gleich, ob Sie sich in einer gesperrten Region befinden, IP-Rotation benötigen oder Ihre Fingerprints verschleiern möchten — dieser Leitfaden deckt alles ab.

---

## Inhaltsverzeichnis

- [Warum Proxys verwenden?](#warum-proxys-verwenden)
- [Architekturübersicht](#architekturübersicht)
- [4-stufiges Proxy-System](#4-stufiges-proxy-system)
- [Proxy-Registry (CRUD)](#proxy-registry-crud)
- [Kostenloser 1proxy-Marktplatz](#1proxy-free-proxy-marketplace)
- [Proxy-Rotation](#proxy-rotation)
- [Anti-Erkennung & Verschleierung](#anti-detection--stealth)
- [Vorgelagerte Proxy-Modi](#upstream-proxy-modes)
- [Dashboard-Oberfläche](#dashboard-ui)
- [API-Referenz](#api-reference)
- [Umgebungsvariablen](#environment-variables)
- [Fehlerbehebung](#troubleshooting)

---

## Warum Proxys verwenden?

Viele KI-Anbieter beschränken den Zugriff nach geografischer Region. Entwickler in **Russland, China, Iran, Kuba, der Türkei** und anderen Ländern stoßen auf Fehler wie:

```
unsupported_country_region_territory
```

Auch außerhalb gesperrter Regionen sind Proxys für Folgendes nützlich:

| Anwendungsfall                     | Beschreibung                                                            |
| ---------------------------------- | ----------------------------------------------------------------------- |
| **Umgehung geografischer Sperren** | Zugriff auf OpenAI, Anthropic, Codex und Copilot aus gesperrten Ländern |
| **IP-Rotation**                    | Anfragen auf mehrere IPs verteilen, um Ratenbegrenzungen zu vermeiden   |
| **Datenschutz**                    | Ihre tatsächliche IP-Adresse vor vorgelagerten Anbietern verbergen      |
| **Compliance**                     | Datenverkehr durch bestimmte Rechtsräume leiten                         |
| **Tests**                          | Anfragen aus verschiedenen Regionen simulieren                          |

---

## Architekturübersicht

```
┌───────────────────────────────────────────────────────────────┐
│                       OmniRoute-Server                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Proxy-      │    │ Proxy-       │    │ Proxy-           │  │
│  │ Registry    │───▶│ Dispatcher   │───▶│ Fetch (undici)   │  │
│  │ (SQLite)    │    │ (gecacht)    │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ 1proxy-Sync │                        │ Vorgelagerte     │  │
│  │ (kostenloser│                        │ Anbieter-API     │  │
│  │  Pool)      │                        │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Hauptkomponenten

| Komponente            | Datei                                        | Aufgabe                                                    |
| --------------------- | -------------------------------------------- | ---------------------------------------------------------- |
| **Proxy-Registry**    | `src/lib/db/proxies.ts`                      | CRUD für Proxy-Einträge und Bereichszuweisungen            |
| **Proxy-Dispatcher**  | `open-sse/utils/proxyDispatcher.ts`          | Erstellt `undici`-ProxyAgent-/SOCKS-Dispatcher mit Caching |
| **Proxy-Fetch**       | `open-sse/utils/proxyFetch.ts`               | Umschließt `fetch()` und bindet einen Proxy-Dispatcher ein |
| **Einstellungsroute** | `src/app/api/settings/proxy/route.ts`        | Legacy-API zur Proxy-Konfiguration (GET/PUT/DELETE)        |
| **Verwaltungsroute**  | `src/app/api/v1/management/proxies/route.ts` | Registry-CRUD-API (GET/POST/PATCH/DELETE)                  |
| **1proxy-Datenbank**  | `src/lib/db/oneproxy.ts`                     | Persistenz für den kostenlosen Proxy-Marktplatz            |

---

## Standard-Proxy-Status für neue Konten

In** Einstellungen → Proxy → Globale Konfiguration** , verwenden** Aktivieren Sie den Proxy standardmäßig für neue Verbindungen** um den anfänglichen Proxy-Status neu hinzugefügter Anbieterkonten auszuwählen.

Die neue Einstellung steuert den anfänglichen Proxy-Status neu hinzugefügter Anbieterkonten. Es ändert weder bestehende Konten noch ersetzt es den globalen Proxy-Switch. Sein Anfangswert behält das vorherige Verhalten bei. Deaktivieren Sie es einmal, um zukünftige Konten mit standardmäßig deaktiviertem Proxy zu erstellen.

Die Präferenz wird als `defaultNewConnectionProxyEnabled` über die vorhandenen Einstellungen API gespeichert. Die Standardeinstellung ist `true`, wenn sie nie gespeichert wird. Das Speichern von `false` wird für nachfolgende neue Konten ohne Neustart wirksam. `POST /api/providers` akzeptiert einen optionalen strikten booleschen Wert `proxyEnabled`; Ein explizites `true` oder `false` hat Vorrang vor dem Erstellungsstandard. Wenn Sie ein doppeltes Konto oder OAuth Wiederverbindung weglassen, bleibt der gespeicherte Status dieses Kontos erhalten. Einzelne Konten können auch danach noch aktiviert oder deaktiviert werden.

Selektive Anbieterübertragungen verwenden die Standardeinstellungen der Zielinstallation für neue Konten und behalten die Zielrichtlinie bei, wenn vorhandene Konten ersetzt werden. Proxy-Schalter sind keine tragbaren Übertragungsfelder. Die vollständige Backup-Wiederherstellung und die historische JSON/SQL -Migration behalten ihre bestehende Wiederherstellungssemantik bei, einschließlich gespeicherter Kontowerte und Legacy-Schema-Standardeinstellungen. Durch eine vollständige Wiederherstellung der Einstellungen kann diese Einstellung ebenfalls wiederhergestellt werden.

Diese Einstellung weist keinen Proxy zu und stellt auch nicht fest, dass einer fehlerfrei ist oder verwendet wird. Das tatsächliche Routing hängt weiterhin vom globalen Proxy-Switch und der entsprechenden Proxy-Konfiguration ab. Synthetische Anbieter ohne dauerhaftes Konto, OAuth Verkehr vor der Kontoerstellung, environment/system Proxys und die Vernetzung externer Backends fallen nicht in den Geltungsbereich.

## 4-stufiges Proxy-System

OmniRoute unterstützt die Proxy-Konfiguration auf **vier unabhängigen Ebenen**, die nach Priorität aufgelöst werden:

```
Prioritätsreihenfolge der Auflösung (höchste → niedrigste):

  1. 🔵 Konto-/Verbindungs-Proxy  →  pro API-Schlüssel/OAuth-Verbindung
  2. 🟡 Anbieter-Proxy            →  pro Anbieter (z. B. gesamter OpenAI-Datenverkehr)
  3. 🟠 Kombinations-Proxy        →  pro Kombinations-/Routing-Konfiguration
  4. 🟢 Globaler Proxy            →  gesamter Datenverkehr, alle Anbieter
```

### Funktionsweise der Auflösung

Wenn OmniRoute eine Anfrage an einen Upstream-Anbieter sendet, ruft es `resolveProxyForConnectionFromRegistry()` auf, wodurch jede Ebene der Reihe nach geprüft wird:

1. **Kontoebene** — Ist dieser spezifischen Verbindungs-ID ein Proxy zugewiesen?
2. **Anbieterebene** — Ist diesem Anbieter (z. B. `openai`) ein Proxy zugewiesen?
3. **Globale Ebene** — Ist ein globaler Proxy konfiguriert?
4. **Kein Proxy** — Direkte Verbindung zum Anbieter.

Der erste Treffer wird verwendet. Das bedeutet, dass Sie einen globalen Proxy als Rückfalloption festlegen und ihn für bestimmte Anbieter oder Verbindungen überschreiben können.

### Was über einen Proxy geleitet wird

| Datenverkehrstyp         | Über Proxy? | Hinweise                                                 |
| ------------------------ | ----------- | -------------------------------------------------------- |
| Chat-Vervollständigungen | ✅          | Alle `/v1/chat/completions`-Anfragen                     |
| Einbettungen             | ✅          | `/v1/embeddings`                                         |
| Bilderzeugung            | ✅          | `/v1/images/generations`                                 |
| Audio (TTS/STT)          | ✅          | `/v1/audio/*`                                            |
| OAuth-Token-Austausch    | ✅          | Behebt `unsupported_country_region_territory`            |
| Verbindungstests         | ✅          | Die Schaltfläche „Verbindung testen“ verwendet den Proxy |
| Token-Aktualisierung     | ✅          | OAuth-Erneuerung im Hintergrund                          |
| Modellsynchronisierung   | ✅          | Modellauflistung und -erkennung                          |

---

## Proxy-Registry (CRUD)

Die Proxy-Registry ist eine SQLite-Tabelle (`proxy_registry`), in der alle Ihre Proxys gespeichert werden. Jeder Proxy verfügt über folgende Felder:

| Feld       | Typ     | Beschreibung                                                       |
| ---------- | ------- | ------------------------------------------------------------------ |
| `id`       | UUID    | Eindeutige Kennung                                                 |
| `name`     | String  | Benutzerfreundliche Bezeichnung                                    |
| `type`     | String  | Protokoll: `http`, `https`, `socks5`                               |
| `host`     | String  | Proxy-Hostname oder -IP-Adresse                                    |
| `port`     | Integer | Portnummer                                                         |
| `username` | String  | Benutzername für die Authentifizierung (verschlüsselt gespeichert) |
| `password` | String  | Passwort für die Authentifizierung (verschlüsselt gespeichert)     |
| `region`   | String  | Bezeichnung der geografischen Region                               |
| `notes`    | String  | Freitextnotizen                                                    |
| `status`   | String  | `active` oder `inactive`                                           |
| `source`   | String  | `manual` oder `oneproxy`                                           |

### Erstellen eines Proxys

**Über das Dashboard:**

1. Navigieren Sie zu **Einstellungen → Proxy**
2. Klicken Sie auf **Proxy hinzufügen**
3. Geben Sie Typ, Host, Port und optional die Anmeldedaten ein
4. Speichern Sie die Angaben

**Über die API:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### Aktualisieren eines Proxys

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Hinweis:** Anmeldedaten bleiben erhalten, sofern Sie nicht ausdrücklich nicht leere Ersatzwerte senden. Wenn Sie leere Zeichenfolgen für `username`/`password` senden, bleiben die gespeicherten Werte erhalten.

### Löschen eines Proxys

```bash
# Schlägt fehl, wenn der Proxy einer Ebene zugewiesen ist
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Erzwingt das Löschen (entfernt auch Zuweisungen)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Auflisten von Proxys

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Zuweisen von Proxys zu Ebenen

```bash
# Der globalen Ebene zuweisen
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Einem bestimmten Anbieter zuweisen
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Einer bestimmten Verbindung/einem bestimmten Schlüssel zuweisen
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Ermitteln des effektiven Proxys

Prüfen Sie, welcher Proxy für eine bestimmte Verbindung verwendet würde:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Gibt den ermittelten Proxy mit seiner Ebene (`account`, `provider` oder `global`) und Quelle zurück.

### Massenzuweisung

Weisen Sie einen Proxy gleichzeitig mehreren Anbietern oder Verbindungen zu:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Import/Export

Proxys sind im **Sicherungs-/Wiederherstellungssystem** enthalten. Wenn Sie Ihre OmniRoute-Konfiguration exportieren:

1. Navigieren Sie zu **Dashboard → Einstellungen → Sicherung**
2. Klicken Sie auf **Exportieren** — die Proxy-Registry und die Zuweisungen sind enthalten
3. Klicken Sie zum Wiederherstellen auf **Importieren** und laden Sie die Sicherungsdatei hoch

Die Proxy-Registry unterstützt außerdem **Upserts anhand von Host+Port** — wenn Sie einen bereits vorhandenen Proxy importieren (gleicher Host und Port), wird dieser aktualisiert, anstatt ein Duplikat zu erstellen.

### Migration von Altdaten

Wenn Sie Proxys in einer älteren Version (vor Einführung der Registry) konfiguriert haben, migriert OmniRoute diese automatisch:

```
Veralteter key_value-Speicher → proxy_registry + proxy_assignments
```

Dies erfolgt einmalig beim ersten Start nach dem Upgrade. Verwenden Sie `migrateLegacyProxyConfigToRegistry({ force: true })`, um die Migration erneut auszuführen.

---

## 1proxy Kostenloser Proxy-Marktplatz

> 🆕** Beitrag von [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/cheaper-inference/OmniRoute/pull/1847) (Problem [#1788](https://github.com/cheaper-inference/OmniRoute/issues/1788) )

OmniRoute integriert sich mit dem** [1Proxy](https://1proxy-api.aitradepulse.com)** Community-Plattform, auf die man Zugriff gewähren kann** Hunderte von kostenlosen, validierten Proxys** aus aller Welt. Dies ist ideal für Benutzer, die keine eigene Proxy-Infrastruktur haben.

### Wie es funktioniert

```
┌─────────────┐     Sync      ┌─────────────────┐    Rotate     ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ Provider │
│  (external) │   up to 500   │  source=oneproxy │  by quality   │   API    │
└─────────────┘    proxies    └─────────────────┘               └──────────┘
```

1. **Synchronisieren** — OmniRoute ruft validierte Proxys vom 1proxy API
2. **Speichern** — -Proxys werden in derselben `proxy_registry` Tabelle wie `source = 'oneproxy'` gespeichert
3. **Filter** — Filtern Sie nach Protokoll, Land, Qualitätsfaktor
4. **Drehen** — Wählen Sie den besten Proxy mithilfe von Qualitäts-, Zufalls- oder Sequenzstrategien aus
5. **Automatischer Abbau** — Bei ausgefallenen Proxys wird der Qualitätsfaktor reduziert; unter dem Schwellenwert → als inaktiv markiert

### Proxys synchronisieren

**Über das Dashboard:**

1. Gehe zu** Einstellungen → 1proxy** Tab
2. Klicken** „Jetzt synchronisieren“**
3. Statistiken anzeigen: Proxys insgesamt, aktive Anzahl, durchschnittliche Qualität, Aufschlüsselung nach Ländern

**Über API:**

```bash
# Trigger sync
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Response:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Proxys filtern

```bash
# Filter by protocol
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filter by country
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filter by minimum quality score
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Combine filters
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Proxy-Qualitätswerte

Jeder 1proxy-Proxy wird mit Metadaten geliefert:

| Feld            | Beschreibung                                    |
| --------------- | ----------------------------------------------- |
| `qualityScore`  | 0-100 Bewertung von 1 Proxy-Validierung         |
| `latencyMs`     | Gemessene Netzwerklatenz                        |
| `anonymity`     | `transparent`, `anonymous` oder `elite`         |
| `googleAccess`  | Ob der Proxy auf Google -Dienste zugreifen kann |
| `countryCode`   | Zweibuchstabiger ISO -Ländercode                |
| `lastValidated` | Zeitstempel der letzten Validierung             |

Qualitätswerte werden dynamisch angepasst:

- **Fehlgeschlagene Anfragen** Reduzieren Sie die Punktzahl um 10 Punkte
- **Die Punktzahl sinkt auf ≤ 10** → Proxy ist `inactive` gekennzeichnet
- Inaktive Proxys sind von der Rotation ausgeschlossen

### Rotationsstrategien

```bash
# Rotate by quality (best proxy first) — default
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Random rotation
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Sequential (least recently validated first)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Leistungsschalter

Der 1proxy sync verfügt über einen eingebauten Schutzschalter:

- Nach** 5 aufeinanderfolgende Synchronisierungsfehler** , weitere Synchronisierungsversuche werden blockiert
- Zurücksetzen mit: `resetOneproxyCircuitBreaker()` oder Neustart des Servers
- Der Synchronisierungsstatus ist unter `GET /api/settings/oneproxy?action=status` verfügbar

### 1proxy-Proxys löschen

```bash
# Delete a single 1proxy proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Clear ALL 1proxy proxies (manual proxies are untouched)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Anti-Erkennung und Stealth

OmniRoute leitet den Datenverkehr nicht nur über einen Proxy- — weiter, sondern lässt den Datenverkehr auch legitim aussehen:

### TLS Fingerabdruck-Spoofing

Verwendet `wreq-js`, um browserähnliche TLS Fingerabdrücke zu generieren und umgeht dabei Bot-Erkennungssysteme, die Nicht-Browser TLS Handshakes kennzeichnen.

### CLI Fingerabdruck-Matching

Der**CLI Fingerabdruck-Schalter** (`Settings → Security`) ordnet HTTP Header und JSON Body-Felder neu an, damit sie mit der genauen Signatur nativer CLI Binärdateien (Claude Code, Codex usw.) übereinstimmen. Das funktioniert** oben auf** der Proxy:

```
Your IP (blocked) → Proxy IP (US) → Provider API
                    + TLS spoof
                    + CLI fingerprint
```

Sie bekommen beides**IP Maskierung** Und** Authentizität verlangen** gleichzeitig.

### Proxy IP Preservation

Farbcodierte Abzeichen im Dashboard zeigen an, welche Proxy-Ebene aktiv ist:

| Abzeichen | Ebene      | Bedeutung                                                           |
| --------- | ---------- | ------------------------------------------------------------------- |
| 🟢        | Global     | Der gesamte Datenverkehr läuft über diesen Proxy                    |
| 🟡        | Anbieter   | Nur der Datenverkehr dieses Anbieters wird per Proxy weitergeleitet |
| 🔵        | Verbindung | Dieser spezielle key/account verwendet diesen Proxy                 |

Das Abzeichen zeigt zur Überprüfung auch den aufgelösten Proxy- IP an.

---

## Upstream-Proxy-Modi

Für Anbieter, die das CLIProxyAPI-Muster verwenden, unterstützt OmniRoute drei Upstream-Proxy-Modi:

| Modus         | Beschreibung                                                        |
| ------------- | ------------------------------------------------------------------- |
| `native`      | OmniRoute übernimmt das Proxy-Routing direkt (Standard)             |
| `cliproxyapi` | Delegiert an eine externe CLIProxyAPI-Instanz                       |
| `fallback`    | Versucht zuerst den nativen Modus und greift auf CLIProxyAPI zurück |

Konfiguration pro Anbieter:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Dashboard-Benutzeroberfläche

### Einstellungen → Tab „Proxy“

- Konfiguration des **globalen Proxys** (einmalig für den gesamten Datenverkehr festlegen)
- **Anbieterspezifische Proxy-Überschreibungen**
- **Verbindungsspezifische Proxy-Zuweisungen**
- **Verbindungstest** über den konfigurierten Proxy
- **Farbcodierte Badges**, die die aktive Proxy-Ebene anzeigen

### Einstellungen → Tab „1proxy“

- Schaltfläche **Jetzt synchronisieren**, um kostenlose Proxys abzurufen
- **Statistikkarten**: Gesamt, Aktiv, Durchschnittliche Qualität, Letzte Synchronisierung
- **Filter**: Protokoll, Ländercode, Mindestqualität
- **Proxy-Tabelle** mit Host, Protokoll, Land, Qualitätsbewertung, Latenz, Anonymität und Google-Zugriff
- **Synchronisierungsstatus** mit Nachverfolgung von Erfolgen/Fehlern und Anzahl aufeinanderfolgender Fehler
- **Alle löschen**, um sämtliche 1proxy-Einträge zu entfernen

---

## API-Referenz

### API für Proxy-Einstellungen

| Methode  | Endpunkt                                       | Beschreibung                             |
| -------- | ---------------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Vollständige Proxy-Konfiguration abrufen |
| `GET`    | `/api/settings/proxy?level=global`             | Globalen Proxy abrufen                   |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Anbieter-Proxy abrufen                   |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Effektiven Proxy auflösen                |
| `PUT`    | `/api/settings/proxy`                          | Proxy-Konfiguration aktualisieren        |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Proxy auf dieser Ebene entfernen         |

### API für die Proxy-Registrierung

| Methode  | Endpunkt                                          | Beschreibung                      |
| -------- | ------------------------------------------------- | --------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Alle Proxys auflisten             |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Proxy anhand der ID abrufen       |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Proxy-Zuweisungen abrufen         |
| `POST`   | `/api/v1/management/proxies`                      | Proxy erstellen                   |
| `PATCH`  | `/api/v1/management/proxies`                      | Proxy aktualisieren               |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Proxy löschen                     |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Löschen erzwingen                 |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Massenzuweisung durchführen       |
| `GET`    | `/api/v1/management/proxies/assignments`          | Zuweisungen auflisten             |
| `GET`    | `/api/v1/management/proxies/health`               | Proxy-Zustandsstatistiken abrufen |

### Tunnel-API

Informationen dazu, wie Sie Ihre OmniRoute-Instanz im öffentlichen Internet verfügbar machen können (Cloudflare/ngrok/Tailscale), anstatt ausgehenden Datenverkehr über einen Proxy zu leiten, finden Sie unter [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). Die Tunnel-REST-API befindet sich unter `/api/tunnels/{cloudflared,ngrok,tailscale}/*` und ist unabhängig von der oben dokumentierten ausgehenden Proxy-Kette.

### 1proxy-API

| Methode  | Endpunkt                               | Beschreibung                                    |
| -------- | -------------------------------------- | ----------------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | 1proxy-Proxys auflisten                         |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Statistiken und Synchronisierungsstatus abrufen |
| `GET`    | `/api/settings/oneproxy?action=status` | Nur den Synchronisierungsstatus abrufen         |
| `POST`   | `/api/settings/oneproxy`               | Synchronisierung auslösen                       |
| `POST`   | `/api/settings/oneproxy/rotate`        | Zum nächsten Proxy wechseln                     |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Einzelnen Eintrag löschen                       |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Alle Einträge löschen                           |

### Upstream-Proxy-API

| Methode  | Endpunkt                          | Beschreibung                           |
| -------- | --------------------------------- | -------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Upstream-Proxy-Konfiguration abrufen   |
| `PUT`    | `/api/upstream-proxy/:providerId` | Upstream-Proxy-Modus festlegen         |
| `DELETE` | `/api/upstream-proxy/:providerId` | Upstream-Proxy-Konfiguration entfernen |

---

## Umgebungsvariablen

| Variable              | Standardwert | Beschreibung                                                                  |
| --------------------- | ------------ | ----------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`       | SOCKS5-Proxy-Unterstützung aktivieren (Standardwert `true` in `.env.example`) |

---

## Fehlerbehebung

### „SOCKS5-Proxy ist deaktiviert“

Setzen Sie `ENABLE_SOCKS5_PROXY=true` in Ihrer `.env`-Datei und starten Sie neu.

### „socket hang up“-Fehler bei Verwendung eines Proxys

Dies ist bei günstigen Proxys, die inaktive Verbindungen trennen, normal. OmniRoute behandelt dies bereits folgendermaßen:

- Keep-Alive wird für Proxy-Verbindungen deaktiviert (`keepAliveTimeout: 1`)
- Pipelining wird deaktiviert (`pipelining: 0`)
- Dispatcher werden zwischengespeichert, um wiederholte Handshakes zu vermeiden

Falls das Problem weiterhin besteht, verwenden Sie einen anderen Proxy oder die Rotationsfunktion von 1proxy.

### „unsupported_country_region_territory“ während OAuth

Stellen Sie sicher, dass der Proxy konfiguriert ist, **bevor** Sie den OAuth-Ablauf starten. OmniRoute leitet den Austausch von OAuth-Token über den konfigurierten Proxy. Legen Sie zunächst einen globalen oder anbieterspezifischen Proxy fest und stellen Sie anschließend die Verbindung her.

### Proxy wird nicht verwendet

Überprüfen Sie die Auflösungsreihenfolge:

1. Prüfen Sie sie mit `GET /api/settings/proxy?resolve=your-connection-id`
2. Prüfen Sie, ob der Proxy-`status` auf `active` (nicht `inactive`) gesetzt ist
3. Stellen Sie sicher, dass der Geltungsbereich der Proxy-Zuweisung mit Ihrer Verbindung übereinstimmt

### 1proxy-Synchronisierung schlägt fehl

Prüfen Sie den Synchronisierungsstatus:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Wenn `consecutiveFailures >= 5` gilt, wurde der Schutzschalter ausgelöst. Starten Sie den Server neu, um ihn zurückzusetzen, oder warten Sie auf eine manuelle Zurücksetzung.

---

## Datenbankschema

### Tabelle `proxy_registry`

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' oder 'oneproxy'
  quality_score INTEGER,                     -- 0–100 (nur 1proxy)
  latency_ms INTEGER,                        -- Millisekunden (nur 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- Zugriff auf Google möglich? (1proxy)
  last_validated TEXT,                       -- ISO-Zeitstempel (1proxy)
  country_code TEXT,                         -- zweistelliger ISO-Code (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabelle `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- Anbieter-ID, Verbindungs-ID oder Kombinations-ID
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Proxy-Zustandsprüfung (v3.8.16+)

Der **Proxy-Fast-Fail**-Mechanismus von OmniRoute (`src/lib/proxyHealth.ts`) erkennt nicht erreichbare Proxys durch eine schnelle TCP-Verbindungsprüfung in <2s und **speichert das Ergebnis anschließend zwischen**, um zusätzlichen Aufwand bei jeder Anfrage zu vermeiden.

### Funktionsweise

```
Anfrage ──▶ ProxyHealthCache.get(url)
             │
             ├─ Cache-Treffer + aktuell?  ──▶ zwischengespeicherten Status zurückgeben
             │
             └─ Cache-Fehltreffer / veraltet?  ──▶ TCP-Verbindung zu host:port herstellen
                                                    (Zeitüberschreitung: FAST_FAIL_TIMEOUT_MS)
                                                    ──▶ für HEALTH_CACHE_TTL_MS zwischenspeichern
                                                    ──▶ Ergebnis zurückgeben
```

Ohne diesen Mechanismus würde ein nicht erreichbarer Proxy jede Anfrage für die gesamte Dauer von `PROXY_TIMEOUT_MS` (standardmäßig 30s) blockieren, bevor sie fehlschlägt.

### Anpassbare Umgebungsvariablen

| Variable                     | Standardwert | Zweck                                                   |
| ---------------------------- | ------------ | ------------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`       | TCP-Verbindungszeitüberschreitung pro Zustandsprüfung   |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`      | Dauer der Zwischenspeicherung eines Zustandsergebnisses |

**Empfohlene Werte:**

| Szenario                        | Fast-Fail-Zeitüberschreitung | Cache-TTL | Begründung                                                                       |
| ------------------------------- | ---------------------------- | --------- | -------------------------------------------------------------------------------- |
| API-Gateway mit hohem Durchsatz | 1500ms                       | 60000ms   | Aggressives schnelles Fehlschlagen, längerer Cache zur Reduzierung der Prüfungen |
| Geografisch verteilte Knoten    | 3000ms                       | 15000ms   | Langsamere Netzwerke benötigen mehr Zeit; kürzerer Cache für schnelles Failover  |
| Entwicklung/Test                | 1000ms                       | 10000ms   | Schnelle Iteration mit lokalen Proxys                                            |
| Tarnung/Erkennungsvermeidung    | 2500ms                       | 45000ms   | Schnelle Abfragen vermeiden, die Ratenbegrenzungen auslösen könnten              |

### Überprüfen des Proxy-Zustands

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Erneute Prüfung eines bestimmten Proxys erzwingen
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

Das Flag `stale` ist `true`, wenn der Cache-Eintrag `HEALTH_CACHE_TTL_MS` überschritten hat und die nächste Anfrage eine erneute Prüfung auslöst.

### Standards nach Proxy-Typ

Die Zustandsprüfung verwendet abhängig vom URL-Schema sinnvolle Standardwerte:

| Schema                     | Standardport |
| -------------------------- | ------------ |
| `http://`                  | 8080         |
| `https://`                 | 443          |
| `socks5://` / `socks5h://` | 1080         |

Benutzerdefinierte Ports in der URL (`http://host:9999`) haben stets Vorrang vor dem Standardwert des Schemas.

---

## Proxy-Analyse & Beobachtbarkeit

OmniRoute erfasst die Nutzung pro Proxy, damit Betreiber Routing-Muster, Latenzspitzen und wiederkehrende Fehler diagnostizieren können.

### Erfasste Daten

Für jede Anfrage über einen konfigurierten Proxy zeichnet OmniRoute Folgendes auf:

| Metrik       | Beschreibung                                       |
| ------------ | -------------------------------------------------- |
| `proxy_url`  | Vollständige Proxy-URL (Anmeldedaten maskiert)     |
| `provider`   | ID des Upstream-Anbieters (openai, anthropic usw.) |
| `latency_ms` | Gesamte Umlaufzeit einschließlich Proxy-Handshake  |
| `connect_ms` | Nur die Dauer des TCP-Verbindungsaufbaus           |
| `status`     | HTTP-Statuscode vom Upstream                       |
| `error`      | Fehlerklasse, falls die Anfrage fehlgeschlagen ist |
| `timestamp`  | ISO 8601 UTC                                       |

### Zugriff auf die Daten

```bash
# Neueste Proxy-Ereignisse
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

Der tatsächliche Endpunkt ist `/api/usage/proxy-logs` (siehe `src/app/api/usage/proxy-logs/route.ts`). Dieser Endpunkt unterstützt:

- `GET /api/usage/proxy-logs` — Proxy-Protokolle abrufen
- `DELETE /api/usage/proxy-logs` — alle Proxy-Protokolle löschen

Aggregierte Statistiken können bei Bedarf direkt per SQL aus der Tabelle `proxy_logs` abgefragt werden. Die Dashboard-Benutzeroberfläche kann aggregierte Ansichten bereitstellen.

### Häufige Muster

**Einen instabilen Proxy erkennen** (wechselt zwischen Erfolg und Fehlschlag):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**Langsame Proxys finden** (p95-Latenz > 2 s):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## Entscheidungsbaum für die Rotationsstrategie

Wenn einem Geltungsbereich mehrere Proxys zugewiesen sind, verwendet OmniRoute eine **Rotationsstrategie**, um auszuwählen, welcher Proxy für die jeweilige Anfrage verwendet wird. Die Strategie wird auf Ebene des Geltungsbereichs konfiguriert (global, pro Anbieter, pro Konto, pro Kombination).

### Verfügbare Strategien

| Strategie            | Empfohlener Einsatzbereich                       | Abwägung                                                               |
| -------------------- | ------------------------------------------------ | ---------------------------------------------------------------------- |
| `quality` (Standard) | Produktion mit Proxys unterschiedlicher Qualität | Bevorzugt hoch bewertete Proxys; kann niedrig bewertete benachteiligen |
| `random`             | Lastverteilung, Datenschutz                      | Gleichmäßige Verteilung; ignoriert Qualitätssignale                    |
| `sequential`         | Debugging, deterministische Tests                | Durchläuft Proxys der Reihe nach; leicht nachvollziehbar               |

### Entscheidungsbaum

```
                    Verfügen Ihre Proxys über Qualitätsbewertungen?
                    │
        ┌───────────┴───────────┐
        │                       │
       JA                      NEIN
        │                       │
   Sind alle Proxys            │
   qualitativ ungefähr         │
   gleichwertig?               │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  JA       NEIN              `random`
   │         │               verwenden
   │         │              (gleichmäßige
   │         │              Verteilung baut
   │         │              mit der Zeit
   │         │              Qualitätsdaten auf)
   │         │
   │    `quality` verwenden
   │    (am besten bei
   │    gemischter Qualität)
   │
`random` verwenden
(Last gleichmäßig
verteilen)
```

## Automatischer Fehlerausschluss für Ihre eigenen Proxys

Der 1proxy-Marktplatzpool stuft ausgefallene Proxys bereits automatisch herab (siehe [Proxy-Qualitätswerte](#proxy-quality-scores) ). Für Proxys** Du** Der zur Registrierung hinzugefügte Hintergrundintegritätsplaner (`src/lib/proxyHealth/scheduler.ts`) bietet das gleiche Verhalten „ein totes Mitglied automatisch aus der Kette ausschließen“, ohne etwas zu löschen:

```bash
# .env — soft-disable a proxy after 3 consecutive failed probes, re-enable it
# automatically once it starts answering probes again.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Wie es in eine Multi-Proxy-Kette passt:

1. Der Scheduler prüft alle registrierten Proxys alle `PROXY_HEALTH_INTERVAL_MS` (Standard 10 Minuten; mindestens 1 Minute).
2. Nach `PROXY_AUTO_REMOVE_AFTER` fortlaufend** schlüssig** Bei Ausfällen (ein echter Verbindungsfehler — ein Timeout oder der eigene 5xx des Probe-Ziels zählt nie, siehe [Proxy-Zustandsprüfung](#proxy-health-checking-v3816) ), wird der `status` des Proxys auf `dead` gesetzt.
3. `dead` ist einer der Status, die der Alive-Status-Filter, der von pool/rotation Auflösung verwendet wird, ausschließt, sodass die Rotation eines Bereichs (Round-Robin/Random/Sticky/Latenz/Sitzungs- — siehe [Rotationsstrategie-Entscheidungsbaum](#rotation-strategy-decision-tree) ) die Übergabe dieses Proxys an neue Anfragen sofort stoppt. Es sind keine anderen Proxys im Pool betroffen, und der gesamte Pool greift niemals stillschweigend auf eine direkte Verbindung zurück. Siehe — siehe den Fail-Closed-Guard des [4-Level-Proxy-Systems](#4-level-proxy-system).
4. Der Scheduler prüft weiterhin `dead` Proxys im gleichen Intervall. Bei der nächsten erfolgreichen Prüfung wird `status` wieder auf `active` umgestellt und die Rotation — wird erneut aktiviert, ohne dass ein erneutes manuelles Hinzufügen erforderlich ist.

Das ist Absicht** Opt-In und zerstörungsfrei** : Standardmäßig zählt und protokolliert der Scheduler nur Fehler (siehe Richtlinie C in `decision.ts`), und `PROXY_AUTO_DISABLE` löscht niemals eine Zeile — wofür das separate, aggressivere `PROXY_AUTO_REMOVE` Flag gedacht ist. Wenn beide auf `true` gesetzt sind, gewinnt `PROXY_AUTO_REMOVE` (ein Proxy, der gelöscht werden soll, hat zwischendurch keine Verwendung für eine Soft-Disable). Die vollständige Variablenliste finden Sie in der Referenz [zur Umgebungskonfiguration](../reference/ENVIRONMENT.md).

---

> 📖** Zugehörige Dokumentation:**
>
> - [Benutzerhandbuch](../guides/USER_GUIDE.md) — Allgemeine Einrichtung und Konfiguration – [API Referenz](../reference/API_REFERENCE.md) — Vollständige API Dokumentation – [Umgebungskonfiguration](../reference/ENVIRONMENT.md) — Alle Umgebungsvariablen
