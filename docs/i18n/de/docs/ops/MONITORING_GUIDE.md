# Monitoring & Observability Guide (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute wird mit integrierter Zustandsüberwachung, Provider-Autopilot, Kontingentverfolgung und Observability-Hooks ausgeliefert. Dieser Leitfaden behandelt das Dashboard, Warnmeldungen und die Fehlerbehebung.

**Quellen:**

- `src/lib/monitoring/observability.ts` — Observability-Momentaufnahme
- `src/lib/monitoring/comboHealthAutopilot.ts` — Autopilot für den Combo-Zustand
- `src/lib/monitoring/providerHealthAutopilot.ts` — Provider-Autopilot
- `src/lib/monitoring/providerHealthMatrix.ts` — Provider-Zustandsmatrix
- `src/lib/localHealthCheck.ts` — lokale Zustandsprüfung
- `src/lib/tokenHealthCheck.ts` — Zustand der Token-Aktualisierung
- `src/lib/proxyHealth.ts` — Proxy-Zustands-Cache (behandelt in PROXY_GUIDE.md)

---

## Übersicht

OmniRoute verfügt über **3 Überwachungsebenen**:

```
┌──────────────────────────────────────────────────────────────┐
│  Ebene 1: Systemzustand (Serverebene)                         │
│  ├─ localHealthCheck.ts — DB, Ports, native Abhängigkeiten    │
│  ├─ db/healthCheck.ts — Integrität, FK, verwaiste Artefakte   │
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  Ebene 2: Provider-Zustand (Resilienz pro Provider)           │
│  ├─ providerHealthAutopilot.ts — Circuit Breaker, Cooldowns   │
│  ├─ providerHealthMatrix.ts — Zustandswerte nach Provider/Modell │
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  Ebene 3: Live-Observability (Laufzeit-Momentaufnahmen)        │
│  ├─ observability.ts — Circuit Breaker, Sitzungen, Kontingent │
│  ├─ tokenHealthCheck.ts — Zustand der OAuth-Token-Aktualisierung │
│  └─ MCP-Tools: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Dashboard-Seiten

### `/dashboard/health` (Systemzustand)

Das übergeordnete Zustands-Dashboard zeigt:

| Abschnitt              | Angezeigte Informationen                                       |
| ---------------------- | -------------------------------------------------------------- |
| **Serverstatus**       | Betriebszeit, Version, Port, aktive Verbindungen               |
| **Datenbank**          | Verbindung, Integrität, WAL-Größe, kürzliche Migrationen       |
| **Provider-Übersicht** | Anzahl aktiver und fehlerfreier Provider sowie offener Breaker |
| **Kontingentmonitore** | Aktive Sitzungen, Warnstatus, ausgeschöpfte Kontingente        |
| **Kürzliche Fehler**   | Letzte 10 Fehler mit Stacktraces                               |
| **Ressourcennutzung**  | Arbeitsspeicher, CPU, Indikator für Heap-Auslastung            |

### `/dashboard/providers` (Provider-Zustand)

Dashboard pro Provider:

| Spalte       | Beschreibung                                                |
| ------------ | ----------------------------------------------------------- |
| Provider     | Provider-ID und Anzeigename                                 |
| Zustand      | Grüner/gelber/roter Status                                  |
| Schaltkreis  | Zustand „offen“, „geschlossen“ oder „halboffen“             |
| Verbindungen | Anzahl der Verbindungen, letzte Aktualisierung              |
| Modelle      | Verfügbare Modelle, Zustand pro Modell                      |
| Kosten       | Heutige Kosten, 7-Tage-Trend                                |
| Fehler       | Fehleranzahl der letzten 24 Stunden, häufigste Fehlerklasse |

Klicken Sie auf einen Provider, um Folgendes anzuzeigen:

- Kürzliche Anfragen mit Latenzaufschlüsselung
- Zustandswerte pro Verbindung
- Sperren pro Modell
- Autopilot-Empfehlungen

### `/dashboard/quota` (Kontingentverfolgung)

Für jeden API-Schlüssel:

- Aktuelle Nutzung im Vergleich zum Limit (Fortschrittsbalken)
- Kontingenttrend (30-Tage-Diagramm)
- Zeitpunkt der nächsten Zurücksetzung
- Warnungsverlauf

### `/dashboard/combos` (Combo-Zustand)

Pro Combo:

- Strategie und Ziele
- Zustand pro Ziel
- Kürzliche Fallback-Ereignisse
- Erfolgsquote (24 Std., 7 Tage, 30 Tage)

---

## Gesundheitscheck API

OmniRoute entlarvt** zwei** HTTP Gesundheitsoberflächen. Sie sind für Orchestratoren nicht austauschbar.

| Weg                          | Zweck                                                                               | Gewicht                                           | Verwendung für                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `GET /healthz`               | Lebenszyklus liveness/readiness (`ok` / `starting` / `stopping`)                    | Trivial (nur Phasenflagge)                        | Kubernetes** Bereitschaft** ; weich** Lebendigkeit** wenn Sie HTTP verwenden müssen |
| `GET /api/monitoring/health` | Zusammenfassung des umfassenden System- + -Anbieters (DB, Heap, Kataloganzahl usw.) | Schwer (Synchronisations- DB /Überwachungsarbeit) | Dashboards, Blackbox-Deep-Checks, der integrierte Gesundheitscheck von Docker       |

> **Notiz:** Anbieter-Zustandsmatrizen, Autopilot-Probleme, Kontingentmonitore, Token-Zustand und Latenzdetails über `/api/monitoring/health` hinaus sind über das verfügbar**MCP -Tool** `observability_snapshot` oder die** Armaturenbrett** — diese Seiten gibt es keine speziellen REST Routen.

Beide Strecken verlaufen auf der** gleiche Knoten-Ereignisschleife** als Anfragebearbeitung. Ein CPU-gebundener Pfad (große `GET /v1/models` -Katalogarbeit, Langzeitkontextkomprimierung/Tokenzählung) kann zu Verzögerungen führen** alle** HTTP Handler, einschließlich `/healthz`. Ereignisschleife beschäftigt ≠ Prozess tot. Repariere lieber das Schwein; Sonden-Tuning reduziert nur Fehltötungen.

### Leichte Orchestrator-Sonde

```bash
GET /healthz
# or HEAD /healthz
```

- **200** + body `ok` wenn die Serverlebenszyklusphase bereit ist
- **503** + `starting` / `stopping` beim Booten oder Herunterfahren
- Implementierung: `src/app/healthz/route.ts` (kein DB -Ping)

### Systemgesundheit (tief)

```bash
GET /api/monitoring/health
```

Antwort:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: Probe-Cache vs. SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` ist das** In-Memory-Sonde-Cache-Anzeige** , kein Live-Dump von `provider_connections.test_status`. Nach #12532 lautet der Anforderungspfad nur `getCachedCredentialHealthSummary()` ; Hintergrundsonden aktualisieren den Cache außerhalb der Ereignisschleife.

| Schicht                                 | Wo                                                                    | Was es bedeutet                                                                                                                                                                                                               |
| --------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sonden-Cache-Anzeige                    | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Die letzten Ergebnisse der Überprüfung der Integrität der Anmeldeinformationen befinden sich noch im Prozessspeicher. `source` ist immer `probe-cache`.                                                                       |
| Details zur fehlgeschlagenen Verbindung | `credentialHealth.failedConnections`                                  | Gegenwärtig** nur wenn `failed > 0`** . Begrenzte Liste von Cache-Zeilen mit `status=error` (`connectionId`, `status`, bereinigtes `lastError` / `lastErrorType`). `failedOmitted` wird gesetzt, als die Liste gekappt wurde. |
| SQLite Sticky-Status                    | `credentialHealth.staleDbNonOkCount`                                  | Anzahl von** aktiv** (`is_active=1`) Verbindungszeilen, deren persistentes `test_status` bekanntermaßen nicht in Ordnung ist (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).               |

Die beiden Schichten können absichtlich unterschiedlicher Meinung sein:

- Messen Sie `failed=0` während `staleDbNonOkCount>0` — SQLite immer noch ein klebriges `test_status` hat (zum Beispiel `expired` oder `credits_exhausted`), sodass der letzte Probe-Cache-Snapshot nicht als `status=error` zählt.
- Messen Sie `failed>0` während SQLite fehlerfrei aussieht. — eine kürzlich durchgeführte Prüfung fehlgeschlagen und wird zwischengespeichert. Die DB Zeile wurde nicht aktualisiert oder wurde später gelöscht.

Achten Sie beim Scraping dieses Endpunkts nicht ausschließlich auf `provider_connections.test_status`. Verwenden Sie `failed` + `failedConnections` für Live-Probe-Fehler und `staleDbNonOkCount`, wenn Sie die Anzahl der persistenten Sticky-Status benötigen.

### Empfehlungen für Kubernetes-Probes

OmniRoute ist ein** Einzelknotenprozess** (eine Ereignisschleife). Stock Docker `HEALTHCHECK` zielt auf leichtes `/healthz`. `/api/monitoring/health` ist** zu schwer** für Kubelet-Lebendigkeitsintervalle.

| Sonde                | Empfohlenes Ziel                                                                    | Notizen                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Start-up**         | HTTP `GET /healthz` mit einem langen `failureThreshold` (oder großen `startPeriod`) | Der Kaltstart + SQLite -Migration kann einige Sekunden dauern                                                                                                                                                                                                                                                                                                                                      |
| **Bereitschaft**     | HTTP `GET /healthz`                                                                 | Lebenszyklus `ok` / `starting` / `stopping` (200 vs. 503). Flattert immer noch, wenn die Schleife CPU-blockiert ist. A** 200 in mehreren Sekunden sind nicht gesund** (#10303) — bedeutet, dass die Ereignisschleife unterbrochen wurde, bevor der 3-Byte-Handler ausgeführt wurde                                                                                                                 |
| **Lebendigkeit**     | HTTP `GET /livez`,** oder TCP** auf dem Hauptdienstport (`PORT`, Standard `20128`)  | `/livez` ist nur prozessaktiv (immer 200, wenn der Handler ausgeführt wird). Es teilt immer noch die Ereignisschleife — busy ≠ dead und erkennt Event-Loop-Starvation (#10303) nicht besser als TCP. Bevorzugen**TCP** wenn HTTP Probes unter catalog/compression Last eine Zeitüberschreitung haben; Tun** nicht** Töte den Pod in beiden Fällen bei kurzen Verzögerungen in der Ereignisschleife |
| **Tiefe Gesundheit** | `GET /api/monitoring/health` von einem externen Prüfer                              | Nicht für Kubelet `livenessProbe` / Tight `readinessProbe`                                                                                                                                                                                                                                                                                                                                         |

Beispielform (passen Sie die Schwellenwerte an Ihre Kaltstart- und Kompressionslast an):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Under event-loop stall HTTP /livez can still time out. TCP is the
  # conservative alternative:
  # tcpSocket:
  #   port: http
```

**Nicht** Punkt Kubelet** Lebendigkeit** bei `/api/monitoring/health`. Dieser Pfad leistet echte DB/monitoring -Arbeit und wird unter Last falsch positiv sein.

Verwandt: [#10052](https://github.com/cheaper-inference/OmniRoute/issues/10052) (prüft, während die Ereignisschleife ausgelastet ist), [#9685](https://github.com/cheaper-inference/OmniRoute/issues/9685) / [#10055](https://github.com/cheaper-inference/OmniRoute/pull/10055) (Katalogpreisfresser), [#10117](https://github.com/cheaper-inference/OmniRoute/issues/10117) (Komprimierungstokenanzahlfresser).

### systemd watchdog (eingefrorene Ereignisschleife)

Auf einem Systemd-Host teilt OmniRoute dem Dienstmanager mit, wann er bereit ist, und pingt ihn weiterhin an, sodass ein Server, dessen Ereignisschleife hängen bleibt, beendet und neu gestartet wird, anstatt aktiv und still zu bleiben. Die Pings stammen aus der eigenen Ereignisschleife des Servers: Wenn er blockiert, werden sie angehalten und systemd startet den Dienst neu, sobald `WatchdogSec` ohne einen Ping verstrichen ist.

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) schreibt damit bereits eine Benutzereinheit. Eine Einheit, die Sie selbst schreiben (das Standard `Type=simple`), erhält keinen Watchdog, also fügen Sie diese Zeilen zu ihrem `[Service]` Abschnitt hinzu:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

Die generierte Einheit legt `Restart=on-failure` fest, also fügen Sie auch diese Zeile — hinzu. Ohne sie beendet der Watchdog nur den hängengebliebenen Dienst, anstatt ihn neu zu starten.

- `Type=notify`: Der Dienst wird „gestartet“, wenn der Server `READY=1` sendet, nicht wenn der Prozess verzweigt. `TimeoutStartSec` begrenzt einen langsamen Start.
- `NotifyAccess=all`: Die Pings werden vom Serverprozess gesendet, der ein untergeordnetes Element des `omniroute serve` Supervisors ist.
- `WatchdogSec`: Pings gehen alle 60 Sekunden aus, also verwenden** 120 oder mehr** . Kleinere Werte würden einen fehlerfreien Server neu starten.
- Führen Sie `omniroute serve` im Vordergrund aus. `--daemon` trennt den Server von der Kontrollgruppe der Einheit und der Benachrichtigungs-Handshake wird nie abgeschlossen.

Überprüfen Sie nach einem Neustart, ob es aktiv ist:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` zeigt die konfigurierte Verzögerung an und `WatchdogTimestamp` bewegt sich jede Minute vorwärts. Ein durch den Watchdog verursachter Neustart wird als `Result=watchdog` aufgezeichnet. Um die Pings auszuschalten, während das Gerät so bleibt, wie es ist, setzen Sie `OMNIROUTE_DISABLE_SD_NOTIFY=1`; ohne `NOTIFY_SOCKET` (terminal, Docker, Electron, Windows) wird nichts gesendet.

Der Watchdog prüft lediglich, ob die Ereignisschleife weiterläuft. Ein Server, der langsam ist, sich aber noch dreht, wird nicht neu gestartet.

### Optionale Anforderungspfadarbeit (Speicher, Fähigkeiten, Token-Aktualisierung)

Speicherextraktion, Skills-Injektion und OAuth Token-Aktualisierung teilen sich die** Hauptknoten-Ereignisschleife** mit `/healthz`. Es handelt sich um Dashboard-Umschaltfunktionen (`memoryEnabled`, `skillsEnabled`), nicht um einen Worker-Pool. Siehe [Umgebung — -Ereignisschleifenkosten](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Gesundheit des Anbieters

> **Kein REST Endpunkt.** Gesundheitsdaten des Anbieters sind über das MCP Tool `observability_snapshot` oder die Dashboard- `/dashboard/providers` Seite verfügbar.

### Anbieterdetails

> **Kein REST Endpunkt.** Details zu den einzelnen Anbietern sind über die Dashboard- `/dashboard/providers` Seite verfügbar.

---

## Provider-Zustandsautopilot

Das Modul `providerHealthAutopilot.ts` ist ein **selbstheilendes System**, das:

1. Provider-Probleme erkennt (offene Leistungsschalter, Abklingzeiten, Sperren, Kontingentwarnungen)
2. **Empfohlene Aktionen** zu deren Behebung generiert
3. Optional Aktionen mit geringem Risiko **automatisch ausführt**

### Erkannte Problemtypen

| Problemtyp                   | Schweregrad | Beispielbedingung                                        |
| ---------------------------- | ----------- | -------------------------------------------------------- |
| `provider_circuit_open`      | kritisch    | Leistungsschalter nach 5 Fehlern geöffnet                |
| `provider_circuit_half_open` | Warnung     | Leistungsschalter testet die Wiederherstellung           |
| `connection_cooldown`        | Warnung     | Verbindung nach 429 in Abklingphase                      |
| `stale_connection_error`     | Warnung     | Letzte Aktualisierung vor über 30 Minuten fehlgeschlagen |
| `terminal_connection_error`  | kritisch    | OAuth widerrufen, Schlüssel ungültig                     |
| `inactive_connection`        | Information | Verbindung in den Einstellungen deaktiviert              |
| `model_lockout`              | Warnung     | Bestimmtes Modell in Quarantäne                          |
| `quota_monitor_warning`      | Warnung     | Kontingent zu mindestens 80 % genutzt                    |

### Generierte Aktionstypen

| Aktion                         | Risiko | Beschreibung                                     |
| ------------------------------ | ------ | ------------------------------------------------ |
| `clear_provider_breaker`       | mittel | Leistungsschalter auf „geschlossen“ zurücksetzen |
| `clear_connection_cooldown`    | gering | Abklingphase einer Verbindung entfernen          |
| `clear_stale_connection_error` | gering | Veraltete Fehlermarkierung löschen               |
| `clear_model_lockout`          | gering | Modell in Quarantäne wieder aktivieren           |
| `reactivate_connection`        | mittel | Deaktivierte Verbindung wieder aktivieren        |
| `deactivate_connection`        | hoch   | Problematische Verbindung deaktivieren           |

### API

> **Kein REST-Endpunkt.** Autopilot-Probleme sind über das MCP-Tool `observability_snapshot` oder das Dashboard verfügbar. Der Autopilot wird intern ausgeführt; sein Verhalten wird über die Einstellungsdatenbank (das verbindungsspezifische Feld `autopilotMode`) und nicht über Umgebungsvariablen konfiguriert — `grep -rn` liefert für eine Umgebungsvariable des Autopilot-Modus keine Treffer.

### Autopilot-Modus

Der Autopilot arbeitet standardmäßig im **manuellen Modus** — er erkennt Probleme und generiert empfohlene Aktionen, wendet diese jedoch nicht automatisch an. Aktionen können über das Dashboard angewendet werden.

---

## Combo-Zustandsautopilot

`comboHealthAutopilot.ts` ist das **Combo-spezifische** Gegenstück zum Provider-Autopiloten. Er:

- Erkennt fehlerhafte Combos
- Empfiehlt eine Neuanordnung der Ziele
- Schlägt die Deaktivierung defekter Ziele vor
- Entfernt nicht mehr funktionsfähige Ziele nach N Fehlern automatisch

### Beispiele für Combo-Probleme

```
Combo "always-on" (Prioritätsstrategie)
├─ Ziel 1: openai/gpt-5 (fehlerfrei)
├─ Ziel 2: anthropic/claude-opus-4-6 (⚠️ Modellsperre bis 14:00 Uhr)
└─ Ziel 3: kiro/claude-sonnet-4-5 (fehlerfrei)

Empfohlene Aktion: Neu anordnen — kiro vor anthropic verschieben, bis die Sperre abläuft
```

---

## Kontingentüberwachung

`observability.ts` stellt **sitzungsspezifische Kontingentüberwachungen** für Abonnement-Provider (Claude Code, Codex, GitHub Copilot) bereit:

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Bedeutung der Statuswerte

| Status      | Wann                                   | UI-Aktion                                      |
| ----------- | -------------------------------------- | ---------------------------------------------- |
| `starting`  | Erste Abfrage läuft                    | Ladeindikator                                  |
| `idle`      | Keine kürzliche Aktivität              | Im Dashboard ausgeblendet                      |
| `healthy`   | Mehr als 50 % Kontingent verbleiben    | Grüner Punkt                                   |
| `warning`   | Weniger als 50 % Kontingent verbleiben | Gelbe Warnung                                  |
| `exhausted` | Kontingent = 0 %                       | Roter Block, an nächsten Provider weiterleiten |
| `error`     | Abfrage fehlgeschlagen                 | Roter Punkt, bald erneut versuchen             |

### API

> **Kein REST-Endpunkt.** Daten der Kontingentüberwachung sind über das MCP-Tool `observability_snapshot` oder das Dashboard verfügbar.

---

## Observability-Snapshot

Das MCP-Tool `observability_snapshot` gibt einen **vollständigen System-Snapshot** für KI-Agenten zurück:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* siehe oben */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agenten verwenden diesen Snapshot, um **Routing-Entscheidungen** zu treffen – beispielsweise: „Wenn der Schaltkreis von openai offen ist, leite die Anfrage zuerst an anthropic weiter.“

---

## Token-Zustandsprüfung

OAuth-Anbieter (Claude Code, GitHub Copilot, Cursor) benötigen eine **regelmäßige Token-Aktualisierung**. `src/lib/tokenHealthCheck.ts` führt einen Hintergrund-Scheduler aus:

- **Prüfzyklus**: alle 60 Sekunden (Prüfung in `TICK_MS = 60 * 1000` unter `src/lib/tokenHealthCheck.ts:30`)
- **Intervall für die Zustandsprüfung pro Verbindung**: standardmäßig 60 Minuten (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); über die Einstellungsdatenbank konfigurierbar
- **Präventive Aktualisierung bei 401**: wird vom verbindungsspezifischen Interceptor durchgeführt

### Token-Zustandsstatus

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Konfiguration

Die Konfiguration der Token-Zustandsprüfung wird intern von `tokenHealthCheck.ts` verwaltet.

### Token-Zustand

> **Kein REST-Endpunkt.** Token-Zustandsdaten sind über das Dashboard oder das MCP-Tool `observability_snapshot` verfügbar.

---

## Benachrichtigungen

### Integrierte Kanäle

OmniRoute unterstützt **3 Benachrichtigungskanäle**:

| Kanal            | Einrichtung       | Anwendungsfall                       |
| ---------------- | ----------------- | ------------------------------------ |
| Dashboard-Banner | Immer aktiviert   | Anwendungsinterne Benachrichtigungen |
| Webhook          | URL konfigurieren | Slack, Discord, PagerDuty            |
| Protokoll        | Standard          | Für die externe Protokollaggregation |

### Webhook-Konfiguration

> **Hinweis:** Die Konfiguration von Webhook-Benachrichtigungen erfolgt über die Seite „Einstellungen“ im Dashboard. Informationen zu Webhook-URL, Ereignisfilterung und Nutzdatenanpassung finden Sie in der Benutzeroberfläche für Einstellungen.

### Benachrichtigungstypen

| Benachrichtigung             | Zeitpunkt                                                    | Standardschweregrad |
| ---------------------------- | ------------------------------------------------------------ | ------------------- |
| `provider_circuit_open`      | Schaltkreis wird geöffnet                                    | kritisch            |
| `provider_circuit_half_open` | Schaltkreis testet die Wiederherstellung                     | Information         |
| `quota_warning`              | Kontingent zu mindestens 80 % ausgeschöpft                   | Warnung             |
| `quota_exhausted`            | Kontingent zu 100 % ausgeschöpft                             | kritisch            |
| `token_refresh_failed`       | Mindestens 3 aufeinanderfolgende Aktualisierungsfehler       | Warnung             |
| `token_expired`              | Token hat sein Ablaufdatum überschritten                     | kritisch            |
| `combo_target_unhealthy`     | Kombinationsziel seit mindestens 1 Stunde in der Abkühlphase | Warnung             |
| `db_integrity_warning`       | FK-Verstöße > 0                                              | Warnung             |
| `heap_pressure`              | Heap-Nutzung > 80 % des Schwellenwerts                       | Warnung             |

---

## Performance-Metriken

### Erfasste Metriken

| Metrik                  | Typ        | Quelle                          |
| ----------------------- | ---------- | ------------------------------- |
| `request_count`         | Zähler     | `services/usage.ts`             |
| `request_latency_ms`    | Histogramm | `services/usage.ts`             |
| `tokens_consumed`       | Zähler     | `services/usage.ts`             |
| `cost_usd`              | Zähler     | `services/usage.ts`             |
| `provider_errors`       | Zähler     | `services/errorClassifier.ts`   |
| `circuit_state_changes` | Zähler     | `services/resilience.ts`        |
| `cache_hits`            | Zähler     | `services/signatureCache.ts`    |
| `compression_savings`   | Histogramm | `services/compression/stats.ts` |
| `quota_used`            | Messwert   | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | Messwert   | `observability.ts`              |

### Latenzperzentile (p50/p95/p99)

> **Kein REST-Endpunkt.** Daten zu Latenzperzentilen sind über die Dashboard-Seite `/dashboard/health` verfügbar. Der Export für Prometheus/OpenTelemetry ist für v3.9 geplant.

### Prometheus-/OpenTelemetry-Export (Phase 2)

Für v3.9 geplant: nativer Export nach Prometheus, OpenTelemetry und Datadog.

Rufen Sie vorerst `/api/monitoring/health` mit einem beliebigen HTTP-basierten Überwachungssystem ab (Prometheus Blackbox Exporter, Datadog HTTP Check usw.).

---

## Rezepte für Alarmierungen

### Slack

> **Hinweis:** Webhook-Alarmierungen werden über die Einstellungsseite des Dashboards konfiguriert — es gibt keine dedizierten Webhook-Umgebungsvariablen (`grep -rn` liefert keine Treffer). Informationen zur Webhook-URL, Ereignisfilterung und Anpassung der Nutzdaten finden Sie in der Einstellungsoberfläche.

### Discord

> Webhook-Alarmierungen verwenden denselben Ablauf in der Einstellungsoberfläche wie Slack. Discord akzeptiert dieselbe JSON-Nutzdatenstruktur.

### PagerDuty

> Webhook-Alarmierungen verwenden denselben Ablauf in der Einstellungsoberfläche. Routing-Schlüssel für die PagerDuty Events API v2 werden in der Einstellungsoberfläche konfiguriert.

### Benutzerdefinierter Webhook (JSON)

> Jeder HTTP-Endpunkt, der POST-Anfragen mit einem JSON-Anfragetext akzeptiert, funktioniert. Konfigurieren Sie die URL in der Einstellungsoberfläche.

---

## Dashboard-Konfiguration

### Status-Dashboard anpassen

Erstellen Sie eine Datei unter `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Einen Anbieter oben anheften

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Fehlerbehebung

### „Anbieter wird als fehlerfrei angezeigt, aber Anfragen schlagen fehl“

1. Prüfen Sie die **Autopilot-Probleme** — möglicherweise ist ein Modell gesperrt
2. Sehen Sie unter **Letzte Fehler** nach der spezifischen Fehlerklasse
3. Führen Sie den **Verbindungstest** auf der Anbieterkarte aus
4. Prüfen Sie, ob der Anbieter **upstream ratenbegrenzt** ist (lokal nicht sichtbar)

### „Kontingent wird als unproblematisch angezeigt, aber ich erhalte 429-Fehler“

- 429 bedeutet, dass Sie laut Anbieter Ihr Kontingent aufgebraucht haben
- Die Kontingentverfolgung von OmniRoute kann **veraltet** sein — maßgeblich sind die Upstream-Daten des Anbieters
- Kontingentdaten werden automatisch über den internen Kontingentmonitor aktualisiert

### „Kombination schlägt fehl, aber alle Ziele werden als fehlerfrei angezeigt“

- Prüfen Sie das Dashboard für den **Kombinationsstatus** auf Probleme mit der Zielreihenfolge
- Sehen Sie sich **Fallback-Ereignisse** an — möglicherweise erschöpft die Kombination ihre Optionen zu schnell
- Stellen Sie sicher, dass die **Strategie** zu Ihrem Anwendungsfall passt (Priorität vs. Round-Robin vs. automatisch)

### „Datenbank-Statusprüfung schlägt fehl“

- Führen Sie `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` aus
- Falls „ok“ ausgegeben wird — Fehlalarm, die Statusprüfung ist zu streng
- Bei jeder anderen Ausgabe — **stoppen Sie OmniRoute** und befolgen Sie den [Leitfaden zur Notfallwiederherstellung](./DATABASE_GUIDE.md#disaster-recovery)

### „Speicherdruck im Heap ist kritisch“

```bash
# Aktuellen Heap prüfen
node -e "console.log(process.memoryUsage())"

# Manuelle Garbage Collection auslösen (wenn --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Anzahl gleichzeitiger Anfragen reduzieren (über die Einstellungsseite des Dashboards festlegen, nicht über eine Umgebungsvariable)
# Es gibt keine Umgebungsvariable `MAX_CONCURRENT_REQUESTS` — konfigurieren Sie dies unter Einstellungen → Gleichzeitigkeit.
```

---

## Siehe auch

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — Nutzungs- und Kostenüberwachung
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB-Schema und Systemzustand
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — Proxy-Systemzustand (separater Cache)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — Systemarchitektur
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — Details zum Circuit Breaker
- Quelle: `src/lib/monitoring/` (4 Dateien, 2121 Codezeilen)
