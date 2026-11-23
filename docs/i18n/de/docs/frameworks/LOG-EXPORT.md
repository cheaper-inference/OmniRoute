# Log export (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Kontinuierlicher, inkrementeller Export von OmniRoute-Aufrufprotokollen in einen externen Analysespeicher.

Die Registerkarte „Logs“ im Dashboard speichert den Anfrageverlauf in SQLite (`call_logs`), wobei dessen Umfang durch Rotation und Aufbewahrung begrenzt ist. Der Protokollexport überträgt denselben Datensatz nach einem Zeitplan, damit er die lokale Datenbank überdauern und mit anderen Daten verknüpft werden kann. BigQuery ist das erste Ziel; die Pipeline ist als Registry aufgebaut, sodass weitere Ziele ergänzend hinzugefügt werden können.

---

## 1. Funktionsweise

```
Server (Konfiguration entschlüsseln + validieren, Cursor abgleichen)
  → IPC starten → isolierter exportChild-Betriebssystemprozess
    → schreibgeschützte storage.sqlite → gemeinsame Aufrufprotokoll-Abfrage/-Zuordnung
      → asynchrone Artefakt-Hydratisierung → Ziel-prepare()/send()
        → Batch-IPC → Server persistiert Cursor → Bestätigungs-IPC
          → nächster Batch; Abschluss-IPC → Server zeichnet Erfolg auf
```

- **Zeitplan** — ein `JobRegistry`-Cronjob namens `log_export`, standardmäßig `0 * * * *` (stündlich,
  UTC). Er wird in `src/lib/initCloudSync.ts` registriert und kann mit `OMNIROUTE_LOG_EXPORT_CRON`
  überschrieben werden. Bei jedem Durchlauf werden nacheinander alle **aktivierten** Ziele abgearbeitet.
- **Cursor** — das implizite `call_logs.rowid` von SQLite, pro Ziel in
  `log_export_destinations.cursor_row_id` persistiert. `timestamp` wird bewusst nicht als Cursor
  verwendet: Aufrufer können einen eigenen Wert bereitstellen, sodass eine langsame Anfrage nach
  einer schnelleren Anfrage geschrieben werden kann, die später gestartet wurde; ein
  Zeitstempel-Cursor würde sie überspringen.
- **Batchverarbeitung** — `batch_size` Zeilen pro Anfrage (Standardwert 500),
  `max_rows_per_run` Zeilen pro Durchlauf (Standardwert 10000), sodass ein großer Rückstand über
  mehrere Durchläufe hinweg abgearbeitet wird, anstatt einen einzelnen zu blockieren.
- **Zustellung** — der Cursor wird erst weitergesetzt, nachdem `send()` erfolgreich abgeschlossen
  wurde. Bei einem fehlgeschlagenen Batch bleibt der Cursor unverändert, sodass dieselben Zeilen
  beim nächsten Durchlauf erneut versucht werden. Garantiert wird eine mindestens einmalige
  Zustellung mit zielseitiger Deduplizierung, keine echte Exakt-einmal-Zustellung: BigQuery
  identifiziert jede Zeile anhand der Aufrufprotokoll-ID und berücksichtigt dies innerhalb seines
  eigenen Deduplizierungsfensters nach dem Best-Effort-Prinzip.
- **Schutz vor Überschneidungen** — der Cron-Durchlauf und `POST .../run` können gleichzeitig
  ausgelöst werden. Ein Ziel, das bereits abgearbeitet wird, wird übersprungen, statt doppelt
  abgearbeitet zu werden (`skipped: true` im Ausführungsergebnis), sodass ein gleichzeitiger
  Durchlauf weder einen Batch erneut senden noch den Cursor zurücksetzen kann.
- **Wiederherstellung nach Bereinigung** — wenn `cursor_row_id` oberhalb von `MAX(rowid)` liegt
  (die gesamte Tabelle wurde bereinigt und die Zeilen-IDs wurden neu begonnen), setzt der Runner
  ihn auf 0 zurück, anstatt dauerhaft keine neuen Daten mehr zu erkennen.

### Isolierter Runner und Grenzwerte

Jeder Ziellauf unter Node startet einen separaten, kurzlebigen untergeordneten Betriebssystemprozess
(`child_process` mit IPC, nicht `worker_threads`). Das Lesen von Bodys, das Parsen/Serialisieren
von Payload-JSON, das zielseitige `prepare()` sowie die Netzwerk-E/A des Ziels werden vollständig
dort ausgeführt und nicht in der Ereignisschleife des Servers. Über IPC werden nur die Konfiguration
und kleine Fortschrittsmeldungen übertragen; exportierte Datensätze kehren niemals zum Server
zurück. Der Cronjob und die „Jetzt ausführen“-Route behalten dasselbe öffentliche Ergebnis und
denselben Schutz vor Überschneidungen bei.

Der untergeordnete Prozess öffnet die vom Server aufgelöste Datei `DATA_DIR/storage.sqlite`
mithilfe von `node:sqlite` schreibgeschützt und mit `busy_timeout=5000` sowie `query_only=ON`.
Er importiert weder einen DB-Singleton noch führt er Migrationen, Sicherungen oder
SQLite-Aktualisierungen aus. Die Buchführung zu fehlenden/beschädigten Artefakten (einschließlich
des UPDATE für beschädigte Artefakte) verbleibt ausschließlich im Detailpfad des Dashboards.
Beide Pfade verwenden denselben reinen Detail-Resolver; der Export nutzt asynchrone
Dateisystem-Lesevorgänge und dieselbe Auflösungsreihenfolge: Artefakt → ältere Inline-Daten →
ältere Datenträgerdaten → keine Daten. Ein Durchlauf erstellt beim Öffnen des Readers durch den
untergeordneten Prozess einen Snapshot der maximalen Einfügungs-Zeilen-ID; spätere Einfügungen
warten bis zum nächsten Durchlauf. Dies ist eine Einfügungsgrenze und keine langlebige
SQLite-Transaktion: WAL-Writer und Checkpoints bleiben während Netzwerk-Wartezeiten ungehindert.
Aktualisierungen und Löschungen vorhandener Zeilen werden durch diese Grenze nicht eingefroren.

Nach jedem akzeptierten Batch wartet der untergeordnete Prozess auf eine Bestätigung. Der Server
persistiert zunächst den Cursor mit `advanceLogExportCursor` und sendet anschließend `ack`;
vorher wird kein neuer Batch gestartet. Ein Sendefehler, Absturz oder Timeout wird als Fehler
aufgezeichnet, ohne den Cursor für diesen Batch weiterzusetzen. Zuvor bestätigte Batches bleiben
dauerhaft gespeichert; höchstens der eine unbestätigte Batch kann erneut gesendet werden.
Ein Erfolg wird erst nach `done` und einem ordnungsgemäßen Beenden des untergeordneten Prozesses
aufgezeichnet. Bei Fehlern wird der untergeordnete Prozess mit SIGTERM beendet; nach 500 ms wird
auf SIGKILL eskaliert, und der Runner wartet auf das Schließen des Prozesses.

| Umgebungsvariable                             | Standardwert | Zweck                                   |
| --------------------------------------------- | ------------ | --------------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000       | Zeitlimit pro Ziel                      |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024         | V8-Old-Space-Grenzwert des Kindes in MB |

Bei ungültigen, nicht positiven oder nicht ganzzahligen Werten werden die Standardwerte verwendet.
Die Heap-Einstellung ist kein Grenzwert für den gesamten RSS; sehr große Batches können weiterhin
den Speicher des untergeordneten Prozesses erschöpfen und den Durchlauf kontrolliert fehlschlagen
lassen. Der Standardwert von 1024 MB lässt ausreichend Spielraum für den standardmäßigen Batch
mit 500 Zeilen und 512-KiB-Artefakten bei aktivierten Bodys, einschließlich der byteweise
aufgeteilten JSON-Serialisierung von BigQuery. Er macht einen Bodies-Batch mit 10000 Zeilen nicht
sicher. Eine Erschöpfung des V8-Heaps zeichnet einen Fehler mit konkreter Handlungsempfehlung auf:
Batchgröße reduzieren oder `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` erhöhen; der Cursor
verbleibt beim zuletzt bestätigten Batch. Ältere Inline-/Datenträger-Bodys werden durch die moderne
Artefaktbegrenzung nicht abgedeckt. Betreiber müssen den RSS separat einplanen, insbesondere in
Containern mit Speicherbegrenzung.

Der untergeordnete Prozess erbt nur das aufgelöste `DATA_DIR`, `NODE_ENV`, ein explizites `TZ`
(Auflösung älterer Dateinamen anhand der lokalen Zeit), `ELECTRON_RUN_AS_NODE`, sofern vorhanden,
sowie die folgenden Eingaben für ausgehende Verbindungen:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (und deren kleingeschriebene Varianten),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Ein globaler Undici-Dispatcher verwendet dieselbe reine, umgebungsbasierte Proxy-Auflösung und
dieselben Umgehungsregeln für lokale Hosts wie der Server, einschließlich `NO_PROXY`; er importiert
weder `proxyFetch.ts` noch dessen DB-/Feature-Flags. Proxy-Anmeldedaten werden in weitergeleiteten
Ausgaben und aufgezeichneten Fehlern unkenntlich gemacht. Ziel-Anmeldedaten werden ausschließlich
in einer einzelnen IPC-Startnachricht übertragen, niemals über argv oder die Umgebung; die
Weiterleitung von Ausgaben und Fehlern erhält ein Präfix und wird bereinigt. In den
Ausführungsargumenten des untergeordneten Prozesses wird nur `ExperimentalWarning` deaktiviert,
um die SQLite-Warnung von Node nicht bei jedem Cron-Durchlauf zu wiederholen; andere Warnungstypen
bleiben sichtbar.

Zielmodule müssen ohne Next.js-/Nur-Server-Abhängigkeiten importierbar sein. Die vorhandene
BigQuery-Implementierung erfüllt diesen Vertrag bereits. Access-Token-Caches bestehen nur für den
untergeordneten Prozess, nicht über mehrere Ausführungen hinweg. Node ist die unterstützte Laufzeitumgebung
(`package.json` engines), aber der Bun-Installationsabschnitt der README und `Dockerfile.bun` weisen ebenfalls
einen produktiven Kompatibilitätspfad über `bun:sqlite` (`src/lib/db/core.ts` / Adapter) aus. Unter Bun
behalten Exporte daher den bisherigen prozessinternen Pfad bei und geben einmalig eine Warnung aus:
Heap-/Timeout-Isolation durch einen untergeordneten Prozess ist nicht verfügbar. Verwenden Sie
Node zur Isolation der Ereignisschleife und bei OOM-Fehlern; Bun wird hier nicht als reine Entwicklungsumgebung behandelt.

Wenn `includeBodies` aktiviert ist, sollte ein minutengenauer Zeitplan wie
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` bevorzugt werden, statt einen stündlichen Payload-Rückstau anzusammeln.
Batch- und Zeilenlimits begrenzen weiterhin jede Ausführung. Der Prozessstart fällt pro Ziel und Ausführung an;
dies tauscht geringe Startkosten gegen die Isolation der Server-Ereignisschleife ein, nicht gegen eine geringere CPU-Gesamtnutzung.

### Payloads (Prompts und Vervollständigungen)

Standardmäßig enthält der Export nur die Zusammenfassungsfelder, die in der **Liste** der Logs angezeigt werden. Wenn
**Prompts und Antworten exportieren** (`includeBodies`) aktiviert wird, werden zusätzlich die Inhalte übertragen, die der **Detailbereich**
der Logs für jeden Aufruf anzeigt:

| Feld                             | Inhalt                                                             |
| -------------------------------- | ------------------------------------------------------------------ |
| `request_body` / `response_body` | Die Aufruf-Payloads in der Darstellung des Dashboards              |
| `pipeline_route_decision`        | Welches Ziel und Modell der Router ausgewählt hat                  |
| `pipeline_client_request`        | Die unveränderte Anfrage, genau wie sie der Client gesendet hat    |
| `pipeline_openai_request`        | Nach der Übersetzung in das interne OpenAI-Format                  |
| `pipeline_provider_request`      | Wie tatsächlich an den Upstream gesendet, im Dialekt des Anbieters |
| `pipeline_provider_response`     | Die unveränderte Upstream-Antwort                                  |
| `pipeline_client_response`       | Was an den Aufrufer zurückgegeben wurde                            |
| `pipeline_error`                 | Fehlerdetails auf Pipeline-Ebene für einen fehlgeschlagenen Aufruf |
| `bodies_truncated`               | Wahr, wenn eines der obigen Felder `maxBodyBytes` erreicht hat     |

Dabei handelt es sich um Prompt-Inhalte. Daher ist diese Option **standardmäßig deaktiviert** und bewusst für jedes Ziel separat wählbar.
Exportiert wird, was das Dashboard anzeigt, da Export und `getCallLogById` dieselbe
Detailauflösung verwenden: Payloads werden
bereits beim Schreiben von personenbezogenen Daten bereinigt und von Geheimnissen befreit, und bei einem Aufruf mit einem
`noLog`-API-Schlüssel wird überhaupt kein Payload gespeichert, sodass nichts exportiert werden kann.

Payloads werden zeilenweise aus dem Dateisystem-Artefakt gelesen, sodass die Hydratisierung nur für Ziele
erfolgt, die sie angefordert haben. Bei einem fehlenden oder beschädigten Artefakt wird dessen Zusammenfassung mit Null-Payloads
exportiert, statt den Batch fehlschlagen zu lassen und den Cursor zu blockieren.

`maxBodyBytes` (Standardwert 262144) begrenzt jedes Feld. Längere Payloads werden **gekürzt statt
verworfen** — ein gekürzter Prompt beantwortet weiterhin die Frage „Was wurde gefragt?“ — und die Zeile wird mit
`bodies_truncated` gekennzeichnet. Chunkweise gestreamte Deltas werden nicht exportiert; die zusammengesetzte Antwort ist
bereits in `pipeline_provider_response` und `pipeline_client_response` enthalten.

---

## 2. Dateien

| Komponente                     | Speicherort                                  |
| ------------------------------ | -------------------------------------------- |
| Zielvertrag                    | `src/lib/logExport/types.ts`                 |
| Registrierung                  | `src/lib/logExport/registry.ts`              |
| Geheimnisverwaltung            | `src/lib/logExport/secrets.ts`               |
| Runner (übergeordnetes IPC)    | `src/lib/logExport/runner.ts`                |
| Prozesslebenszyklus            | `src/lib/logExport/childRunner.ts`           |
| Untergeordneter Einstiegspunkt | `src/lib/logExport/exportChild.ts`           |
| Schreibgeschützter Öffner      | `src/lib/db/logExportReadOnly.ts`            |
| Gemeinsame Abfrage/Zuordnung   | `src/lib/usage/callLogExportQueries.ts`      |
| Detailauflöser                 | `src/lib/usage/callLogDetailResolver.ts`     |
| API-Projektion                 | `src/lib/logExport/presenter.ts`             |
| BigQuery-Ziel                  | `src/lib/logExport/destinations/bigquery.ts` |
| Google-SA-Authentifizierung    | `src/lib/logExport/googleServiceAccount.ts`  |
| Anrufprotokollquelle           | `src/lib/usage/callLogExportSource.ts`       |
| Persistenz                     | `src/lib/db/logExportDestinations.ts`        |
| Cronjob                        | `src/lib/jobs/logExportJob.ts`               |
| REST-Schicht                   | `src/app/api/log-export/`                    |
| Dashboard-Seite                | `src/app/(dashboard)/dashboard/log-export/`  |

Schema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST-API

Alle Routen sind durch die Verwaltungs-Authentifizierung geschützt (`requireManagementAuth`). Secrets werden niemals zurückgegeben:
Ein gespeichertes Secret wird als Literal `__stored__` zurückgegeben. Wird dieser Wert bei einer Aktualisierung zurückgesendet,
bleiben die gespeicherten Anmeldedaten erhalten.

Das Erstellen oder Aktualisieren eines Ziels, dessen Typ ein Secret deklariert, **erfordert
`STORAGE_ENCRYPTION_KEY`**. Ohne diesen Schlüssel führt `encrypt()` stillschweigend keine Verschlüsselung durch. Daher wird der Schreibvorgang
mit Status 400 abgelehnt, statt Anmeldedaten im Klartext in SQLite abzulegen (dieselbe Schutzmaßnahme
verwendet auch der Telegram-Webhook).

| Methode  | Pfad                                     | Zweck                                                                 |
| -------- | ---------------------------------------- | --------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Zieltypen und Liste ihrer Konfigurationsfelder                        |
| `GET`    | `/api/log-export/destinations`           | Ziele auflisten (Secrets unkenntlich gemacht)                         |
| `POST`   | `/api/log-export/destinations`           | Ein Ziel erstellen                                                    |
| `GET`    | `/api/log-export/destinations/{id}`      | Ein Ziel abrufen                                                      |
| `PUT`    | `/api/log-export/destinations/{id}`      | Name/Aktivierungsstatus/Konfiguration/Batchverarbeitung aktualisieren |
| `DELETE` | `/api/log-export/destinations/{id}`      | Löschen                                                               |
| `POST`   | `/api/log-export/destinations/{id}/test` | Anmeldedaten prüfen, ohne Daten zu schreiben                          |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Jetzt abarbeiten, über denselben Pfad wie der geplante Lauf           |
| `GET`    | `/api/log-export/status`                 | Cron-Status, letzte Läufe und Rückstand pro Ziel                      |

`GET /api/log-export/types` ermöglicht die generische Benutzeroberfläche: Das Dashboard-Formular wird anhand
der zurückgegebenen Feldbeschreibungen gerendert, sodass für ein neues Ziel keine Änderung an der Benutzeroberfläche erforderlich ist.

---

## 4. BigQuery-Ziel

Konfigurationsschlüssel (`type: "bigquery"`):

| Schlüssel            | Hinweise                                                                               |
| -------------------- | -------------------------------------------------------------------------------------- |
| `projectId`          | GCP-Projekt, das den Datensatz enthält                                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                        |
| `tableId`            | `[A-Za-z0-9_]+`                                                                        |
| `location`           | Wird nur verwendet, wenn der Datensatz erstellt werden muss (Standardwert `EU`)        |
| `serviceAccountJson` | Dienstkontoschlüssel. Secret: im Ruhezustand verschlüsselt, wird niemals zurückgegeben |
| `autoCreate`         | Datensatz und Tabelle beim ersten Export erstellen (Standardwert `true`)               |

Das Dienstkonto benötigt `bigquery.tables.updateData` für die Zieltabelle sowie
`bigquery.datasets.create` / `bigquery.tables.create`, wenn `autoCreate` aktiviert ist.

Ein konfigurierter Batch ist eine **Cursor**-Einheit, keine HTTP-Einheit: `send()` unterteilt ihn in `insertAll`-Aufrufe
mit jeweils höchstens 500 Zeilen, sodass ein großer `batch_size` das BigQuery-Anforderungslimit von 10 MB nicht überschreiten kann.
Bei vorübergehenden Statuscodes (408/429/500/502/503/504) werden bis zu drei Wiederholungsversuche mit exponentiellem
Backoff durchgeführt, wobei dieselben insertIds wiederverwendet werden. Authentifizierungs- und Schemafehler lösen bereits beim ersten Versuch eine Ausnahme aus,
statt den Lauf mit weiteren Versuchen zu belasten.

Eine erst vor wenigen Augenblicken erstellte Tabelle ist für den Streaming-Endpunkt noch nicht sichtbar, der
für einige Sekunden mit 404 antwortet. Dieser 404-Fehler wird erneut versucht, jedoch **nur, wenn die Tabelle in diesem Lauf erstellt wurde** —
eine tatsächlich fehlende Tabelle führt weiterhin sofort zu einem Fehler. Beachten Sie, dass BigQuery Streaming-Einfügungen für mehrere Minuten verweigert,
wenn eine Tabelle unter einem kürzlich gelöschten Namen neu erstellt wird. Dies ist eine Eigenschaft des Löschens und anschließenden Neuerstellens;
verwenden Sie daher vorzugsweise einen neuen Tabellennamen, statt eine Tabelle zu löschen und erneut hinzuzufügen.

**Ein partieller Fehler wird als HTTP 200 mit einem nicht leeren `insertErrors[]`-Array zurückgegeben.** Dies wird als
Fehler behandelt und löst eine Ausnahme aus. Dadurch wird verhindert, dass der Cursor über Zeilen hinaus fortschreitet, die BigQuery nie
akzeptiert hat; `tests/unit/log-export-bigquery.test.ts` schreibt dieses Verhalten fest.

Für die Übertragung wird reines REST verwendet: Eine selbstsignierte RS256-Assertion wird unter
`https://oauth2.googleapis.com/token` gegen ein Zugriffstoken ausgetauscht; anschließend werden die Zeilen an `tabledata.insertAll` gesendet. Es wird kein Google SDK
eingebunden. Zugriffstoken werden pro (Dienstkonto, Scope) prozessintern zwischengespeichert.

Die erstellte Tabelle enthält eine Spalte für jedes Feld der Registerkarte „Logs“ sowie `exported_at` und ist darauf ausgelegt,
wie Anrufprotokolle tatsächlich abgefragt werden:

- **Tagespartitionierung nach `timestamp`**, sodass eine auf ein Datum begrenzte Abfrage nur die betreffenden Tage scannt.
- **Clustering nach `api_key_name`, `provider`, `model`, `status`** (in dieser Reihenfolge), sodass das Filtern danach,
  wer den Aufruf ausgeführt hat, wohin er ging oder ob er fehlgeschlagen ist, Blöcke innerhalb jeder Partition ausschließt. BigQuery
  erlaubt höchstens vier Clustering-Spalten, und die Reihenfolge ist relevant: Ein Filter allein nach `api_key_name`
  schließt Blöcke aus, ein Filter allein nach `status` hingegen nicht.
- **Optionale Aufbewahrungsdauer für Partitionen** über `partitionExpirationDays` (`0` behält alles), die
  beim Erstellen der Tabelle angewendet wird.

Beide Einstellungen werden zum Erstellungszeitpunkt angewendet. Eine vorhandene Tabelle behält ihr bestehendes Layout bei. Verweisen Sie daher auf eine neue Tabellen-ID als Ziel, wenn Sie diese Einstellungen übernehmen möchten.

`tests/unit/log-export-bigquery.test.ts` stellt sicher, dass der Mapper und das Tabellenschema synchron bleiben, sodass eine neue Spalte im Aufrufprotokoll beim Export nicht unbemerkt verworfen werden kann.

Batches werden sowohl nach **Zeilenanzahl** als auch nach serialisierter Größe in Byte aufgeteilt. Die Zeilenanzahl allein reicht nicht aus, sobald Nutzdaten exportiert werden: 500 Zeilen mit Prompts können mehrere zehn Megabyte groß sein, und insertAll lehnt Anfragen über 10 MB ab. Chunks werden bei 500 Zeilen oder 9 MB abgeschlossen, je nachdem, welcher Grenzwert zuerst erreicht wird.

---

## 5. Hinzufügen eines Ziels

1. Erstellen Sie `src/lib/logExport/destinations/<name>.ts`, das einen `LogExportDestinationType` exportiert:
   ein Zod-`configSchema`, ein `fields`-Deskriptor-Array für die Benutzeroberfläche, `secretFields` sowie eine
   `createClient(config)`-Funktion, die `test()` / `prepare()` / `send(records)` zurückgibt.
2. Fügen Sie es dem `DESTINATIONS`-Array in `src/lib/logExport/registry.ts` hinzu.
3. Schreiben Sie Tests unter `tests/unit/`.

Das ist die gesamte Änderung: Persistenz, Cronjob, REST-Schicht, Verschlüsselung geheimer Daten und das
Dashboard-Formular lesen alle die Registry aus.

Für ein neues Ziel gelten zwei Regeln:

- `send()` **muss bei einem teilweisen Fehlschlag eine Ausnahme auslösen**. Eine erfolgreiche Rückgabe bedeutet: „Das Ziel enthält diese Zeilen“,
  und der Cursor wird dauerhaft über sie hinaus verschoben.
- Ein Ziel, das eine vom Benutzer bereitgestellte URL akzeptiert, muss diese vor dem Abruf mit
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) validieren,
  genauso wie Webhooks. Für BigQuery ist dies nicht erforderlich: Dessen Hosts sind Konstanten.

---

## 6. Betrieb

- **Dashboard**: Integrationen → Logexport. Fügen Sie ein Ziel hinzu, führen Sie **Testen** aus, um die Anmeldedaten
  zu prüfen, ohne Zeilen zu schreiben, und aktivieren Sie es anschließend.
- **Rückstand**: Jede Zielkarte zeigt die ausstehenden Zeilen und den Cursor an; `GET
/api/log-export/status` gibt dieselben Werte sowie die letzten 20 Jobausführungen zurück.
- **Ein fehlschlagendes Ziel führt nicht zum Fehlschlag der anderen** — die Ausführungszusammenfassung zeichnet den Status jedes Ziels
  in `last_status` / `last_error` auf, und der Verlauf der Jobausführungen enthält das Gesamtergebnis.
- **Beim Löschen eines Ziels wird auch dessen Cursor gelöscht.** Wird es erneut hinzugefügt, beginnt es beim ältesten noch vorgehaltenen
  Aufrufprotokoll, wodurch Zeilen erneut gesendet werden, die das Ziel möglicherweise bereits enthält. Bei BigQuery verhindert die zeilenbezogene
  `insertId` dies nur innerhalb des BigQuery-eigenen Deduplizierungszeitfensters. Daher sollten Sie ein Ziel vorzugsweise deaktivieren,
  statt es zu löschen.
