# Log export (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Kontinuierlicher, inkrementeller Export von OmniRoute-Aufrufprotokollen in einen externen Analysespeicher.

Der Dashboard-Tab „Logs“ speichert den Anfrageverlauf in SQLite (`call_logs`), begrenzt durch
Rotation und Aufbewahrungsfristen. Der Protokollexport überträgt denselben Datensatz nach einem Zeitplan, damit er
über die lokale Datenbank hinaus erhalten bleibt und mit anderen Daten verknüpft werden kann. BigQuery ist das erste Ziel;
die Pipeline ist als Registry aufgebaut, sodass sich weitere Ziele ergänzen lassen.

---

## 1. Wie es funktioniert

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Zeitplan** — ein `JobRegistry` -Cronjob, `log_export`, standardmäßig `0 * * * *` (stündlich, UTC). Registriert in `src/lib/initCloudSync.ts`; überschreibbar mit `OMNIROUTE_LOG_EXPORT_CRON`. Jeder Tick entleert jeden** ermöglicht** Ziel, nacheinander.
- **Cursor** — SQLite implizites `call_logs.rowid`, bleibt pro Ziel in `log_export_destinations.cursor_row_id` bestehen. `timestamp` ist bewusst nicht der Cursor: Aufrufer können ihren eigenen Wert angeben, sodass eine langsame Anfrage nach einer schnelleren, die später gestartet wurde, geschrieben werden kann und ein Zeitstempel-Cursor sie überspringen würde.
- **Stapeln** — `batch_size` Zeilen pro Anfrage (Standard 500), `max_rows_per_run` Zeilen pro Lauf (Standard 10000), sodass ein großer Rückstand über mehrere Ticks abfließt, anstatt einen zu blockieren.
- **Lieferung** — Der Cursor bewegt sich erst weiter, nachdem `send()` aufgelöst wurde. Bei einem fehlgeschlagenen Stapel verbleibt der Cursor an der Stelle, an der er sich befand, sodass bei der nächsten Ausführung dieselben Zeilen erneut versucht werden. Die Garantie ist „mindestens einmal“ plus zielseitige Deduplizierung, nicht „genau einmal“: BigQuery verschlüsselt jede Zeile mit der Anrufprotokoll-ID, die es nach bestem Wissen und Gewissen innerhalb seines eigenen Deduplizierungsfensters berücksichtigt.
- **Überlappungsschutz** — der Cron-Tick und `POST .../run` können zusammen ausgelöst werden. Ein Ziel, das bereits entleert wird, wird übersprungen und nicht zweimal entleert (`skipped: true` im Laufergebnis), sodass bei einer gleichzeitigen Ausführung kein Stapel erneut gesendet oder der Cursor rückwärts geschrieben werden kann.
- **Bereinigungswiederherstellung** — Wenn `cursor_row_id` über `MAX(rowid)` landet (die gesamte Tabelle wurde gelöscht und die Zeilen-IDs neu gestartet), spult der Läufer auf 0 zurück, anstatt dauerhaft blind zu werden.

### Isolierter Läufer und Grenzen

Jedes auf dem Knoten ausgeführte Ziel startet einen separaten, kurzlebigen untergeordneten OS Prozess (`child_process` mit IPC, nicht `worker_threads`). Body-Reads, Nutzlast JSON parsing/serialization, Ziel- `prepare()` und Zielnetzwerk- I/O werden alle dort ausgeführt, nicht in der Ereignisschleife des Servers. Nur Konfigurations- und kleine Fortschrittsmeldungen überqueren IPC; Exportierte Datensätze kehren nie zum Server zurück. Der Cron-Job und die Route „Jetzt ausführen“ behalten das gleiche öffentliche Ergebnis und den Überlappungsschutz bei.

Das Kind öffnet das aufgelöste `DATA_DIR/storage.sqlite` des Servers schreibgeschützt mit `node:sqlite`, mit `busy_timeout=5000` und `query_only=ON`. Es importiert keinen DB Singleton und führt keine Migrationen, Sicherungen oder SQLite Updates durch. Die Buchhaltung Missing/corrupt Artefakts (einschließlich des korrupten Artefakts UPDATE) verbleibt nur im Dashboard-Detailpfad. Beide Pfade teilen sich einen reinen Detail-Resolver; Der Export verwendet asynchrone Dateisystem-Lesevorgänge und die → → →. Ein Lauf erstellt einen Snapshot der maximalen Einfügungszeilen-ID, wenn das untergeordnete Element seinen Reader öffnet. Spätere Einfügungen warten auf den nächsten Lauf. Dies ist eine Einfügungsgrenze, keine langlebige SQLite Transaktion: WAL Writer und Prüfpunkte bleiben während Netzwerkwartezeiten frei. Updates/deletions vorhandener Zeilen werden durch diese Grenze nicht eingefroren.

Nach jedem akzeptierten Stapel wartet das Kind auf eine Bestätigung. Der Server behält den Cursor zunächst bei `advanceLogExportCursor` bei und sendet dann `ack`; Es startet kein nächster Batch davor. Bei einem Sendefehler, einem Absturz oder einer Zeitüberschreitung wird ein Fehler aufgezeichnet, ohne dass dieser Stapel weitergeführt wird. Zuvor bestätigte Batches bleiben festgeschrieben; höchstens der eine unbestätigte Stapel kann erneut gesendet werden. Der Erfolg wird erst nach `done` und einem sauberen untergeordneten Exit aufgezeichnet. Fehler beenden das Kind mit SIGTERM und eskalieren nach 500 ms zu SIGKILL, und der Läufer wartet auf den Abschluss des Prozesses.

| Umgebungsvariable                             | Standard | Zweck                           |
| --------------------------------------------- | -------- | ------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000   | Limit für die Wanduhr pro Ziel  |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024     | Kinder-V8-Old-Space-Limit in MB |

Invalid/non-positive/non-integer -Werte verwenden die Standardwerte. Die Heap-Einstellung stellt kein Gesamt- RSS Limit dar; Sehr große Stapel können immer noch den untergeordneten Speicher erschöpfen und den Lauf sicher zum Scheitern bringen. Der 1024 MB Standard lässt Spielraum für den standardmäßigen 500-Zeilen-Stapel von 512 KiB Artefakten mit aktivierten Körpern, einschließlich der byte-chunked JSON Serialisierung von BigQuery. Dadurch wird ein Körperstapel mit 10.000 Zeilen nicht sicher. V8-Heap-Erschöpfung zeichnet einen umsetzbaren Fehler auf: Stapelgröße verringern oder `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` erhöhen; Der Cursor bleibt bei der letzten bestätigten Charge. Historische inline/disk Körper fallen nicht unter die moderne Artefaktobergrenze. Betreiber müssen RSS separat budgetieren, insbesondere in Containern mit begrenztem Speicher.

Das untergeordnete Element erbt nur das aufgelöste `DATA_DIR`, `NODE_ENV`, das explizite `TZ` (alte Auflösung des Dateinamens in Ortszeit), `ELECTRON_RUN_AS_NODE` sofern vorhanden, und die folgenden ausgehenden Eingaben: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (und ihre Kleinbuchstabenformen), `OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`. Ein globaler Undici-Dispatcher teilt die reine Umgebungs-Proxy-Auflösung des Servers und die lokalen Host-Umgehungsregeln, einschließlich `NO_PROXY`; Es importiert weder `proxyFetch.ts` noch seine DB/feature Flags. Proxy-Anmeldeinformationen werden aus der weitergeleiteten Ausgabe und den aufgezeichneten Fehlern geschwärzt. Zielanmeldeinformationen werden nur in einer IPC Startnachricht übertragen, niemals argv oder Umgebung; output/error -Weiterleitung wird vorangestellt und bereinigt. Nur `ExperimentalWarning` ist in untergeordneten Exec-Argumenten deaktiviert, um zu vermeiden, dass Nodes SQLite Warnung bei jedem Cron-Lauf wiederholt wird. Andere Warntypen bleiben sichtbar.

Zielmodule müssen ohne Next.js/server-only Abhängigkeiten importierbar sein. Die vorhandene BigQuery -Implementierung erfüllt diesen Vertrag bereits. Zugriffstoken-Caches sind nur für die untergeordnete Ausführung gültig, nicht über mehrere Ausführungen hinweg. Knoten ist die unterstützte Laufzeit (`package.json` Engines). Es gibt einen bestmöglichen, nicht unterstützten Bun -Kompatibilitätspfad (`bun:sqlite` in `src/lib/db/core.ts` /adapters und `Dockerfile.bun`), daher dürfen Exporte nicht unter diesem Pfad unterbrochen werden. Unter Bun behalten Exporte den vorherigen In-Process-Pfad bei und geben eine einmalige Warnung aus: Die untergeordnete heap/timeout Isolation ist nicht verfügbar. Verwenden Sie Node für die Ereignisschleife und OOM Isolation.

Wenn `includeBodies` aktiviert ist, bevorzugen Sie einen Rhythmus auf Minutenebene wie `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, anstatt einen stündlichen Payload-Rückstand anzusammeln. Batch- und Zeilenlimits begrenzen weiterhin jeden Lauf. Der Prozessstart wird pro Ziel und Lauf bezahlt. Dies führt zu geringen Startkosten für die Isolation der Server-Ereignisschleife und nicht zu einer Reduzierung der gesamten CPU Nutzung.

### Nutzlasten (Eingabeaufforderungen und Vervollständigungen)

Standardmäßig enthält der Export nur die Zusammenfassungsfelder der Protokolle** Liste** zeigt. Einschalten** Exportieren Sie Eingabeaufforderungen und Antworten** (`includeBodies`) liefert zusätzlich die Protokolle** Detail** Bereich zeigt für jeden Anruf:

| Feld                             | Was es enthält                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------- |
| `request_body` / `response_body` | Die Anrufnutzlasten werden so angezeigt, wie sie vom Dashboard gerendert werden |
| `pipeline_route_decision`        | Welches Ziel und welches Modell der Router ausgewählt hat                       |
| `pipeline_client_request`        | Die Rohanfrage genau so, wie der Client sie gesendet hat                        |
| `pipeline_openai_request`        | Nach der Übersetzung in die interne OpenAI Form                                 |
| `pipeline_provider_request`      | Wie tatsächlich upstream gesendet, im Provider-Dialekt                          |
| `pipeline_provider_response`     | Die rohe Upstream-Antwort                                                       |
| `pipeline_client_response`       | Was dem Anrufer zurückgegeben wurde                                             |
| `pipeline_error`                 | Fehlerdetails auf Pipelineebene für einen fehlgeschlagenen Aufruf               |
| `bodies_truncated`               | True, wenn in einem der oben genannten Felder `maxBodyBytes` angezeigt wird     |

Es handelt sich also um prompten Inhalt** standardmäßig deaktiviert** und bewusst eine Auswahl pro Reiseziel. Im Lieferumfang ist enthalten, was auf dem Dashboard angezeigt wird, da Export und `getCallLogById` die Detailauflösung teilen: Nutzlasten sind bereits beim Schreiben personenbezogener Daten bereinigt und geheim redigiert, und ein mit einem `noLog` API Schlüssel getätigter Aufruf speichert überhaupt keine Nutzlast, sodass nichts exportiert werden kann.

Nutzlasten werden pro Zeile aus dem Dateisystemartefakt gelesen, sodass die Hydratation nur für Ziele ausgeführt wird, die danach gefragt haben. Ein fehlendes oder beschädigtes Artefakt exportiert seine Zusammenfassung mit Null-Payloads, anstatt dass der Batch fehlschlägt und der Cursor blockiert.

`maxBodyBytes` (Standard 262144) begrenzt jedes Feld. Längere Nutzlasten sind** eher abgeschnitten als gelöscht** — Eine abgeschnittene Eingabeaufforderung antwortet weiterhin mit „Was wurde gefragt“ — und die Zeile ist mit `bodies_truncated` gekennzeichnet. Gestreamte Chunk-by-Chunk-Deltas werden nicht exportiert; Die zusammengestellte Antwort befindet sich bereits in `pipeline_provider_response` und `pipeline_client_response`.

---

## 2. Dateien

| Komponente                           | Speicherort                                  |
| ------------------------------------ | -------------------------------------------- |
| Zielvertrag                          | `src/lib/logExport/types.ts`                 |
| Registry                             | `src/lib/logExport/registry.ts`              |
| Verwaltung von Geheimnissen          | `src/lib/logExport/secrets.ts`               |
| Runner (übergeordnete IPC)           | `src/lib/logExport/runner.ts`                |
| Prozesslebenszyklus                  | `src/lib/logExport/childRunner.ts`           |
| Einstiegspunkt des Kindprozesses     | `src/lib/logExport/exportChild.ts`           |
| Öffnen im Nur-Lese-Modus             | `src/lib/db/logExportReadOnly.ts`            |
| Gemeinsame Abfrage/Zuordnung         | `src/lib/usage/callLogExportQueries.ts`      |
| Detailauflösung                      | `src/lib/usage/callLogDetailResolver.ts`     |
| API-Projektion                       | `src/lib/logExport/presenter.ts`             |
| BigQuery-Ziel                        | `src/lib/logExport/destinations/bigquery.ts` |
| Google-Dienstkonto-Authentifizierung | `src/lib/logExport/googleServiceAccount.ts`  |
| Aufrufprotokollquelle                | `src/lib/usage/callLogExportSource.ts`       |
| Persistenz                           | `src/lib/db/logExportDestinations.ts`        |
| Cron-Job                             | `src/lib/jobs/logExportJob.ts`               |
| REST-Schicht                         | `src/app/api/log-export/`                    |
| Dashboard-Seite                      | `src/app/(dashboard)/dashboard/log-export/`  |

Schema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST-API

Alle Routen erfordern eine Verwaltungsauthentifizierung (`requireManagementAuth`). Geheimnisse werden niemals zurückgegeben:
Ein gespeichertes Geheimnis wird als Literal `__stored__` zurückgegeben. Wird dieser Wert bei einer Aktualisierung zurückgesendet,
bleiben die gespeicherten Zugangsdaten erhalten.

Das Erstellen oder Aktualisieren eines Ziels, dessen Typ ein Geheimnis deklariert, **erfordert
`STORAGE_ENCRYPTION_KEY`**. Ohne diesen Schlüssel reicht `encrypt()` die Daten stillschweigend unverändert durch. Daher wird der Schreibvorgang
mit Status 400 abgelehnt, statt Zugangsdaten im Klartext in SQLite abzulegen (dieselbe Schutzprüfung, die auch der
Telegram-Webhook verwendet).

| Methode  | Pfad                                     | Zweck                                                                        |
| -------- | ---------------------------------------- | ---------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Zieltypen + Liste ihrer Konfigurationsfelder                                 |
| `GET`    | `/api/log-export/destinations`           | Ziele auflisten (Geheimnisse ausgeblendet)                                   |
| `POST`   | `/api/log-export/destinations`           | Ein Ziel erstellen                                                           |
| `GET`    | `/api/log-export/destinations/{id}`      | Ein Ziel lesen                                                               |
| `PUT`    | `/api/log-export/destinations/{id}`      | Name / Aktivierungsstatus / Konfiguration / Stapelverarbeitung aktualisieren |
| `DELETE` | `/api/log-export/destinations/{id}`      | Löschen                                                                      |
| `POST`   | `/api/log-export/destinations/{id}/test` | Zugangsdaten prüfen, nichts schreiben                                        |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Rückstand jetzt abarbeiten, gleicher Ausführungspfad wie beim geplanten Lauf |
| `GET`    | `/api/log-export/status`                 | Cron-Status, letzte Läufe, Rückstand pro Ziel                                |

`GET /api/log-export/types` ermöglicht die generische Benutzeroberfläche: Das Dashboard-Formular wird anhand
der zurückgegebenen Feldbeschreibungen gerendert, sodass ein neues Ziel keine Änderung an der Benutzeroberfläche erfordert.

---

## 4. BigQuery-Ziel

Konfigurationsschlüssel (`type: "bigquery"`):

| Schlüssel            | Hinweise                                                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `projectId`          | GCP-Projekt, in dem sich das Dataset befindet                                                                               |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                                             |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                                             |
| `location`           | Wird nur verwendet, wenn das Dataset erstellt werden muss (Standardwert `EU`)                                               |
| `serviceAccountJson` | Service-Account-Schlüssel. Geheimnis: im Ruhezustand verschlüsselt, wird niemals zurückgegeben                              |
| `autoCreate`         | Fehlendes Dataset bzw. fehlende Tabelle erstellen; nullable Usage-Evidence-Spalten bedingt hinzufügen (Standardwert `true`) |

Das Servicekonto benötigt `bigquery.tables.updateData` für die Zieltabelle sowie
`bigquery.datasets.create` / `bigquery.tables.create`, wenn `autoCreate` aktiviert ist.
Das Aktualisieren einer vorhandenen Tabelle zum Hinzufügen der beiden nullable
Usage-Evidence-Felder erfordert außerdem `bigquery.tables.update`. Eine fehlende
Berechtigung bricht den Export ab, ohne den Cursor voranzusetzen.

Ein konfigurierter Batch ist eine **Cursor-Einheit**, keine HTTP-Einheit: `send()` teilt ihn in
insertAll-Aufrufe mit höchstens 500 Zeilen auf, sodass ein großer `batch_size` nicht das
10-MB-Anfragelimit von BigQuery überschreiten kann. Transiente Status (408/429/500/502/503/504)
werden bis zu dreimal mit exponentiellem Backoff wiederholt, wobei dieselben insertIds
wiederverwendet werden; Authentifizierungs- und Schemafehler lösen bereits beim ersten Versuch
einen Fehler aus, anstatt den Lauf zu verbrauchen.

Eine gerade erstellte Tabelle ist für den Streaming-Endpunkt noch nicht sichtbar, der einige
Sekunden lang mit 404 antwortet. Dieser 404 wird wiederholt, **aber nur, wenn dieser Lauf die
Tabelle erstellt hat** — eine tatsächlich fehlende Tabelle schlägt weiterhin sofort fehl.
Beachten Sie, dass das erneute Erstellen einer Tabelle unter einem Namen, der kürzlich gelöscht
wurde, dazu führt, dass BigQuery Streaming-Einfügungen mehrere Minuten lang ablehnt. Das ist
eine Eigenschaft des Löschens mit anschließendem Neuerstellen. Bevorzugen Sie daher einen neuen
Tabellennamen, statt eine Tabelle zu löschen und erneut hinzuzufügen.

**Ein teilweiser Fehler kommt als HTTP 200 mit einem nicht leeren `insertErrors[]` an.** Dies
wird als Fehler behandelt und löst einen Fehler aus. Dadurch wird verhindert, dass der Cursor
über Zeilen hinaus fortschreitet, die BigQuery nie akzeptiert hat;
`tests/unit/log-export-bigquery.test.ts` legt dieses Verhalten fest.

Der Transport erfolgt über reines REST — eine selbstsignierte RS256-Assertion wird gegen ein
Access-Token unter `https://oauth2.googleapis.com/token` ausgetauscht, anschließend werden die
Zeilen an `tabledata.insertAll` gesendet. Es wird kein Google-SDK eingebunden. Access-Tokens
werden pro (Servicekonto, Scope) prozessintern zwischengespeichert.

Die erstellte Tabelle enthält eine Spalte pro Feld des Logs-Tabs sowie `exported_at` und ist
für die tatsächliche Abfrage von Aufrufprotokollen ausgelegt:

- **Nach `timestamp` tagesweise partitioniert**, sodass eine nach Datum begrenzte Abfrage nur
  diese Tage durchsucht.
- **Nach `api_key_name`, `provider`, `model`, `status` gruppiert** (in dieser Reihenfolge),
  sodass das Filtern danach, wer den Aufruf ausgeführt hat, wohin er weitergeleitet wurde oder
  ob er fehlgeschlagen ist, Blöcke innerhalb jeder Partition aussondert. BigQuery erlaubt
  höchstens vier Gruppierungsspalten, und die Reihenfolge ist relevant: Ein Filter nur auf
  `api_key_name` sondert Blöcke aus, ein Filter nur auf `status` nicht.
- **Optionale Aufbewahrung von Partitionen** über `partitionExpirationDays` (0 behält alles),
  angewendet, wenn die Tabelle erstellt wird.

Beide Einstellungen gelten zum Zeitpunkt der Erstellung. Eine vorhandene Tabelle behält ihr
bestehendes Layout. Verwenden Sie daher eine neue Tabellen-ID als Ziel, wenn Sie diese
Einstellungen übernehmen möchten.

`tests/unit/log-export-bigquery.test.ts` stellt sicher, dass Mapper und Tabellenschema
synchron bleiben, sodass eine neue Aufrufprotokollspalte auf dem Weg nach außen nicht
unbemerkt verloren gehen kann.

Batches werden sowohl nach **Zeilenanzahl als auch nach serialisierten Bytes** aufgeteilt. Die
Zeilenanzahl allein reicht nicht aus, sobald Payloads exportiert werden: 500 Zeilen mit
Prompts können mehrere Dutzend Megabyte umfassen, und insertAll lehnt eine Anfrage über 10 MB
ab. Chunks werden bei 500 Zeilen oder 9 MB geschlossen, je nachdem, was zuerst erreicht wird.

---

## 5. OTLP/HTTP-Ziel für Traces

Die Konfiguration verwendet `type: "otlp-http"`. Dabei handelt es sich um einen geplanten, cursorbasierten Export persistierter
Aufrufprotokolle und nicht um den Best-Effort-Sink für Live-Routing-Ereignisse in
`open-sse/services/routing/otel.ts`. Dieser liest oder ändert weder die Umgebungsvariablen,
Timer noch Puffer dieses Sinks. Wenn beide aktiviert sind, können zwei unabhängige Arten von Spans
erzeugt werden. Verwenden Sie den Instrumentierungs-Scope `omniroute.log-export`, um diese Aufrufprotokoll-Spans zu unterscheiden.

| Schlüssel                | Standardwert / Zweck                                                                          |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `endpoint`               | Vollständige erforderliche HTTP(S)-Traces-URL; kein Suffix `/v1/traces` wird angehängt        |
| `headers`                | Optionale Zeilen im Format `Name: value` oder JSON-Objekt aus Zeichenfolgen; verschlüsselt    |
| `requestHeaderAllowlist` | Leer (deaktiviert); Client-Headernamen/-präfixe, die als Span-Attribute erfasst werden sollen |
| `serviceName`            | `omniroute`; Ressource `service.name`                                                         |
| `langfuseMapping`        | `false`; fügt Langfuse-Attribute für Generation/Session/Benutzer hinzu                        |
| `identity`               | `pseudonymous`, `keyName` oder `none`                                                         |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                       |
| `timeoutMs`              | `30000` pro HTTP-Versuch                                                                      |
| `environment`            | Nicht gesetzt; optional `langfuse.environment`                                                |

Das generische Dashboard rendert diese Felder. `paths` akzeptiert ein API-Array oder ein Textfeld
mit exakten Pfaden, die durch Zeilenumbrüche/Kommas getrennt sind. Embeddings-, Rerank- und andere Pfade
werden übersprungen, sofern sie nicht ausdrücklich zugelassen sind. Übersprungene Zeilen erhöhen den Cursor weiterhin.
Die Zähler `exported`/`exportedTotal` des vorhandenen Runners zählen verarbeitete Quellzeilen einschließlich gefilterter
Zeilen und nicht akzeptierte Spans. Die Filterung erfolgt im Child-Prozess, ohne dessen
IPC-/Cursor-Vertrag zu ändern.

Die URL-Validierung verwendet den DB-freien Helper `parseAndValidateNonMetadataUrl` aus
`src/shared/network/outboundUrlGuard.ts`: die Richtlinie `block-metadata`. Sie verfügt über dieselben
unbedingten Prüfungen auf Metadaten, Protokolle und eingebettete Zugangsdaten wie der Webhook-Validator,
wobei private URLs zugelassen sind. localhost-/LAN-Ziele werden jedoch bewusst ohne globale
Feature-Flag-Überschreibung erlaubt. Dadurch werden selbst gehostete Langfuse-, Phoenix-, Tempo- und Collector-
Endpunkte unterstützt, einschließlich privater HTTP-Endpunkte. Cloud-Metadaten-Hosts werden immer blockiert.
Weiterleitungen werden nicht verfolgt, sodass ein Collector Zugangsdaten nicht an einen anderen Host
weiterleiten kann. Wie der vorhandene lexikalische URL-Guard bindet auch dieser die DNS-Auflösung nicht fest;
konfigurieren Sie daher nur von Betreibern kontrollierte Hosts. Bevorzugen Sie HTTPS, wenn sich der Endpunkt nicht in einem vertrauenswürdigen Netzwerk befindet.

### Nutzdaten und Zustellung

OTLP/HTTP-JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) enthält einen
CLIENT-Span pro zugelassener Zeile, benannt nach dem exakten Request-Pfad. Die Pfadbenennung unterscheidet
Chat Completions, Responses und Messages, ohne Modell- oder Identitätsdaten in den Span-Namen einzubetten.
Ressourcenattribute enthalten `service.name` und `service.version` des Pakets.

Der normale Logger für Chat-Versuche (`open-sse/handlers/chatCore/attemptLogging.ts`) schreibt
`duration = Date.now() - startTime` beim Abschluss und liefert keinen Zeitstempel.
`saveCallLogOperation` in `src/lib/usage/callLogs.ts` setzt den Zeitstempel standardmäßig auf den Schreib-
(Abschluss-)Zeitpunkt. Der Export setzt daher das Ende auf den Zeitstempel der Zeile und den Anfang auf
Ende − Dauer (Millisekunden, in dezimale Nanosekunden umgerechnet). Vom Aufrufer bereitgestellte historische
Zeitstempel werden ebenfalls als Endzeit beibehalten; es gibt keine Unterscheidung pro Zeile zwischen Start-
und Abschlusszeitpunkt. Eine Dauer von null wird zu null. Ungültige oder fehlende Zeitstempel schlagen beim
Batch fehl, statt nichtdeterministische Spans zu erzeugen. `ttftMs` ist nullable und wird auf
`omniroute.ttft_ms` abgebildet.

Zu den Attributen gehören `gen_ai.operation.name="chat"`, Provider, angefordertes/antwortendes Modell,
Eingabe-/Ausgabetoken, optionale Cache-Lese-/Cache-Erstellungs-/Reasoning-Token, HTTP-Status,
Combo, Cache-Quelle, Session-Tag und Korrelations-ID. Ganzzahlige OTLP-Werte und Zeitstempel sind
Dezimalzeichenfolgen; Zeichenfolgen, boolesche Werte und gebrochene Zahlen verwenden ihre nativen
OTLP-Wertvarianten. Fehler-Spans haben den Status ERROR und eine bereinigte Statusmeldung. Der kanonische
Datensatz enthält keine Upstream-Host-URL, daher wird `server.address` weggelassen, statt den Collector
fälschlicherweise als Modellserver zu identifizieren. Kosten werden nicht exportiert.

Nur `includeBodies=true` lädt Inhalte. Wenn `langfuseMapping=false` gilt, enthalten
`gen_ai.input.messages` / `gen_ai.output.messages` die bereinigte JSON-Datei des Request-/Response-
Body, wie sie von OmniRoute gespeichert wurde (bei parsebaren Inhalten kanonisiert), und nicht ein
umgeformtes Semconv-Messages-Array. Gekürzte/nicht als JSON vorliegende Bodies bleiben Rohtext. Wenn
`langfuseMapping=true` gilt, werden Bodies ausschließlich als `langfuse.observation.input` /
`langfuse.observation.output` ausgegeben; die Attribute `gen_ai.*.messages` werden weggelassen, damit
jeder Body nur einmal gesendet wird. Beide Modi übernehmen `maxBodyBytes` aus dem vorhandenen
Hydratisierungspfad; `omniroute.bodies_truncated=true` kennzeichnet eine Kürzung.
Dieses Ziel fügt keine zusätzlichen Pipeline-Snapshots oder nicht bereinigten Artefakt-Lesevorgänge hinzu;
die optionale Erfassung von Request-Headern verwendet den vorhandenen hydratisierten Client-Snapshot,
der weiter unten beschrieben wird. Verwenden Sie beim Export von Bodies eine Kadenz auf Minutenebene wie
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, statt einen stündlichen Rückstand anzusammeln.

### Optionale Client-Request-Header

Die Header-Erfassung ist **standardmäßig deaktiviert**. Setzen Sie `requestHeaderAllowlist` in der Zielkonfiguration
und aktivieren Sie **Export prompts and responses** (`includeBodies: true` beim Ziel).
Die Allowlist akzeptiert ein API-Array oder ein Textfeld mit durch Zeilenumbrüche/Kommas getrennten Namen:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Namen werden unabhängig von Groß-/Kleinschreibung und exakt abgeglichen, es sei denn, ein einzelnes abschließendes `*` wählt ein nicht leeres
Headernamen-Präfix aus. Ein alleinstehendes `*`, eingebettete Wildcards und ungültige HTTP-Headernamen werden abgelehnt.
Es gibt höchstens 64 Selektoren, jeweils mit einem Namen/Präfix von höchstens 256 ASCII-Bytes.
Diese Einstellung ist von `headers` getrennt, das den Exporter gegenüber dem Collector authentifiziert.

Die Erfassung liest ausschließlich `pipeline_client_request`, das aus `clientRawRequest` (oder dem Legacy-Feld `clientRequest`) der gespeicherten detaillierten Pipeline befüllt wird. Es gibt keinen Fallback auf die Request-Header des Providers.
Die detaillierte Pipeline-Protokollierung muss beim Aufzeichnen des Requests aktiviert gewesen sein. Wenn
`includeBodies` deaktiviert ist oder das JSON des Client-Snapshots fehlt, beschädigt oder abgeschnitten ist, werden keine Header-Attribute ausgegeben. Eine Erhöhung von `maxBodyBytes` kann das Abschneiden des Snapshots beim Export verhindern;
Details, die nie gespeichert wurden, können dadurch nicht wiederhergestellt werden. Ein Snapshot mit mehr als 1 MiB oder mehr als
256 Header-Einträgen wird ignoriert. Der bestehende Export von Prompt/Response bleibt neben der
Header-Erfassung aktiviert; die Allowlist bietet keinen Hydratationsmodus nur für Header.

Ausgewählte Werte werden zu OTLP-String-Arrays unter `http.request.header.<full lowercase header name>`, selbst wenn es sich um einen einzelnen String handelt. Beispiel: `X-OmniRoute-Meta-Team: example-team` wird zu
`http.request.header.x-omniroute-meta-team` mit
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Das vollständige Präfix bleibt erhalten: Dies sind gewöhnliche Header ohne Parsing von Geschäftsfeldern und ohne Konvertierung in
`omniroute.metadata.*` / Langfuse-Metadaten. `langfuseMapping` ändert die Semantik der Header nicht. Ein ausgewählter Header `User-Agent` mit nur einem Wert setzt außerdem den standardmäßigen Skalar
`user_agent.original`. Kommas innerhalb eines Werts werden nicht aufgeteilt. Varianten mit unterschiedlicher Groß-/Kleinschreibung werden in der Reihenfolge ihres Auftretens in den gespeicherten Einträgen zusammengeführt; jede ungültige Variante lässt den gesamten Header entfallen. Attribute werden nach dem kleingeschriebenen Namen sortiert.

Authorization-, Proxy-Authorization-, Cookie-, Set-Cookie- und API-Schlüssel-Header, Namen mit
Markierungen wie auth/token/secret/password/credential sowie interne Gateway-Anmeldedaten werden immer
ausgeschlossen, selbst wenn sie ausgewählt oder im Speicher teilweise maskiert wurden. Bekannte Anmeldedatenmuster verwenden erneut den gemeinsamen Anmeldedatendetektor; Redaktionsmarkierungen werden weggelassen und nicht als sichere Werte exportiert.
Nur Strings und nicht leere String-Arrays werden akzeptiert; Zahlen oder Objekte werden nicht
zwangsumgewandelt. Ungültige Namen, Prototypschlüssel, Steuerzeichen (außer horizontalem Tabulator)
und fehlerhaftes Unicode werden ignoriert, ohne den Batch fehlschlagen zu lassen oder ihren Inhalt in Fehlermeldungen widerzuspiegeln.

Jeder Span erfasst höchstens 32 Header, 16 Werte pro Header, 4096 UTF-8-Bytes pro Wert
und insgesamt 16384 UTF-8-Bytes über alle erfassten Headernamen und -werte hinweg. Zu große/ungültige Header
werden vollständig weggelassen und nicht abgeschnitten. Die Auswahl ist eine Datenschutzentscheidung des Betreibers: scheinbar sichere Namen können dennoch personenbezogene Daten enthalten, und diese Grenzen/Detektoren sind kein allgemeiner PII-Bereinigungsmechanismus.

### Zustellungsgrenzen

Requests sind auf 500 Spans und 4 MiB UTF-8-JSON einschließlich des Envelope begrenzt.
Jeder zulässige Span wird vor dem ersten Request eines Cursor-Batches einer Größenprüfung unterzogen. Ein einzelner
Span, der größer als das Limit ist, sendet keinen Teil dieses Batches und schlägt mit dem Hinweis fehl,
`maxBodyBytes` zu verringern; er wird nicht stillschweigend verworfen. Die Vorprüfung behält nur Datensatzreferenzen
und Byte-Zählungen und verwirft jeden temporären Span/jedes temporäre JSON; Spans werden für begrenzte Abschnitte neu erstellt,
anstatt eine zweite serialisierte Kopie des Batches im Speicher zu halten. HTTP 408/429/5xx, Netzwerkfehler und Timeouts werden höchstens
dreimal versucht, mit einem exponentiellen Backoff von 250/500 ms. `Retry-After`-Angaben in Sekunden oder HTTP-Daten
können die Verzögerung auf bis zu 5 Sekunden verlängern. Andere Status schlagen sofort fehl. Eine partielle Ablehnung durch OTLP 2xx löst ebenfalls einen Fehler aus, statt
einen verlorenen Span zu bestätigen; leere oder gültige JSON-Bestätigungen werden akzeptiert, mit einer
Begrenzung des Lesens der Antwort auf 64 KiB.

Fehler enthalten ausschließlich vom Exporter stammende Informationen: HTTP-Status, Wiederholungsklasse, Anzahl der Versuche und gesendete Span-Anzahlen oder eine festgelegte Formulierung für Bestätigungs-/Netzwerkfehler. Antworttexte des Collectors,
Anzahlen teilweise erfolgreicher Vorgänge und Response-Header werden niemals in Fehler, Protokolle oder das
Dashboard kopiert. Ein fehlgeschlagener oder teilweise akzeptierter Batch wird nicht bestätigt: Das Ziel zeigt
mit diesem Status den Zustand „Fehler“, der Cursor bleibt beim zuletzt bestätigten Batch, und der nächste Lauf
sendet dieselben Zeilen erneut. Dauerhafte Status bleiben fehlerhaft, bis der Collector oder die Konfiguration
korrigiert wurde. Verwenden Sie die eigenen Protokolle des Collectors für Antwortdetails. Fehlerzusammenfassungen im
Call-Log behalten ihre separate Redaktionslogik.
`prepare()` richtet nichts ein; Test sendet genau `{"resourceSpans":[]}` per POST und meldet
den HTTP-Status, ohne Call-Log-Spans zu schreiben.

Trace-IDs und Span-IDs sind die ersten 32 bzw. 16 Hexadezimalziffern von SHA-256 über
`"omniroute.trace\\0" + callLogId` bzw. `"omniroute.span\\0" + callLogId`. Erneute Sendungen enthalten
identische IDs. Dies ist keine Garantie für Deduplizierung: Einige Backends, einschließlich der Langfuse-
v4-Aufnahme, deduplizieren Spans mit derselben ID nicht. Ein Absturz oder ein Fehler bei einem teilweise gesendeten Abschnitt kann höchstens den einen nicht bestätigten Cursor-Batch erneut senden; der gesamte Batch kann dupliziert werden,
nicht nur sein letzter HTTP-Abschnitt. Wählen Sie die Größe des Cursor-Batches unter Berücksichtigung dieses Zielkonflikts.

### Langfuse-Beispiel

Konfigurieren Sie diese Felder für eine selbst gehostete Langfuse-Instanz:

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Erstellen Sie den Authorization-Wert lokal als Base64 der wörtlichen Zeichenfolge `public-key:secret-key`
(zum Beispiel mit `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Fügen Sie keine echten Anmeldedaten in Protokolle, Screenshots oder Issues ein. Das Mapping
setzt automatisch `x-langfuse-ingestion-version: 4`; Authorization wird weiterhin in `headers` angegeben.
Sowohl Header als auch das generierte Identitäts-Salt verwenden den bestehenden Mechanismus für verschlüsselte
Geheimnisfelder und API-Platzhalter; `STORAGE_ENCRYPTION_KEY` ist erforderlich.

Das Mapping fügt Generierungstyp/-modell, JSON-Nutzungsdetails (Eingabe/Ausgabe/Gesamt und verfügbare
Cache-Schlüssel), JSON-Snapshots von Eingabe/Ausgabe, die Ebenen ERROR/DEFAULT, eine bereinigte
Statusmeldung, den Trace-Namen, die Sitzungs-ID, eine optionale Umgebung sowie filterbare
`langfuse.observation.metadata.<key>`-Metadaten für Provider, angefordertes Modell, Pfad, Kombination, Cache-
Quelle und Status hinzu. `langfuse.observation.completion_start_time` ist ein ISO-8601-Zeitstempel zum
Startzeitpunkt + TTFT, jedoch nur, wenn TTFT bekannt ist und innerhalb der Dauer liegt. Es werden keine
Kostenattribute gesendet.

Identitätsmodi gelten für `langfuse.user.id`:

- `pseudonymous` (Standard): HMAC-SHA256 der internen ID des API-Schlüssels mit einem zufälligen,
  zielbezogenen 32-Byte-Salt. Der Salt wird bei der Erstellung generiert, falls er nicht vorhanden ist, als
  `identitySalt` verschlüsselt, niemals zurückgegeben und bei Bearbeitungen beibehalten. Rohe
  Schlüssel-IDs werden niemals in Span-Attributen gespeichert. Durch das erneute Erstellen oder Rotieren des
  Salts eines Ziels ändern sich die Identitäten.
- `keyName`: der konfigurierte Name des API-Schlüssels, wodurch dieses Betreiber-Label absichtlich
  offengelegt wird.
- `none`: keine Benutzer-ID. Sitzungs-Tags werden weiterhin exportiert, wenn sie vorhanden sind; diese
  Modi anonymisieren weder beliebige Prompt-Inhalte noch vom Betreiber bereitgestellte Sitzungs-/Korrelations-
  Labels.

### Start ohne Backfill

Aktivieren Sie nur bei der Erstellung **Start from current position (skip existing logs)** oder übergeben Sie
`startFromCurrentPosition: true` auf der obersten Ebene der Nutzlast der Erstellungs-API. Dadurch wird
`cursor_row_id` mithilfe der vorhandenen Cursor-Hilfsfunktionen auf die aktuelle maximale beibehaltene
Call-Log-Rowid initialisiert, ohne eine Migration. Der Standardwert ist false (Cursor 0 und Backfill der
beibehaltenen Historie). Dies ist keine Einstellung zum Zurücksetzen des Cursors bei Aktualisierungen.

Die gemeinsame Ergänzung `ttftMs` fügt außerdem dem BigQuery-Mapper und dem Schema für neue Tabellen eine
nullable-Spalte `ttft_ms` hinzu: Der Schematest erfordert, dass jedes kanonische Datensatzfeld eine Spalte
besitzt. Bestehende Tabellen exportieren weiterhin unverändert: `prepare()` liest das Tabellenschema und
lässt nur `ttft_ms` weg, wenn diese Spalte nicht vorhanden ist. Fügen Sie die nullable INT64-Spalte hinzu,
um TTFT beim nächsten Lauf zu erhalten, oder verwenden Sie eine neue Tabelle. Die optionale TTFT-Spalte
löst keine Schemaaktualisierung aus. Spalten für Nutzungsnachweise folgen dem unten beschriebenen
bedingten, optional aktivierbaren Kompatibilitätsablauf; für andere Zeilenfelder bleibt die strikte
Schemaüberprüfung bestehen.

---

## 6. Ein Ziel hinzufügen

1. Erstellen Sie `src/lib/logExport/destinations/<name>.ts`, das einen `LogExportDestinationType` exportiert:
   ein Zod-`configSchema`, ein `fields`-Deskriptor-Array für die Benutzeroberfläche, `secretFields` und eine
   `createClient(config)`-Funktion, die `test()` / `prepare()` / `send(records)` zurückgibt.
2. Fügen Sie es dem `DESTINATIONS`-Array in `src/lib/logExport/registry.ts` hinzu.
3. Schreiben Sie Tests unter `tests/unit/`.

Das ist die gesamte Änderung: Persistenz, Cronjob, REST-Schicht, Verschlüsselung geheimer Daten und das
Dashboard-Formular lesen alle die Registry.

Zwei Regeln für ein neues Ziel:

- `send()` **muss bei einem Teilfehler eine Ausnahme auslösen**. Eine erfolgreiche Ausführung bedeutet „das Ziel hat diese Zeilen“,
  und der Cursor wird dauerhaft über sie hinaus verschoben.
- Ein Ziel, das eine vom Benutzer angegebene URL entgegennimmt, muss diese vor dem Abrufen über
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) validieren,
  genauso wie Webhooks. BigQuery benötigt dies nicht: Seine Hosts sind Konstanten.

---

## 7. Betrieb

- **Dashboard**: Integrationen → Protokollexport. Fügen Sie ein Ziel hinzu, führen Sie **Test** aus, um die Anmeldedaten
  zu überprüfen, ohne Zeilen zu schreiben, und aktivieren Sie es anschließend.
- **Rückstand**: Jede Zielkarte zeigt ausstehende Zeilen und den Cursor; `GET
/api/log-export/status` gibt dieselben Zahlen sowie die letzten 20 Jobausführungen zurück.
- **Ein fehlerhaftes Ziel schlägt die anderen nicht fehl** — die Zusammenfassung der Ausführung erfasst den Status pro Ziel
  in `last_status` / `last_error`, und der Ausführungsverlauf des Jobs bewahrt die aggregierten Daten auf.
- **Beim Löschen eines Ziels wird dessen Cursor gelöscht.** Beim erneuten Hinzufügen wird ab dem ältesten noch
  aufbewahrten Anrufprotokoll begonnen, wodurch Zeilen erneut gesendet werden, die das Ziel möglicherweise bereits enthält. Bei BigQuery
  verhindert `insertId` dies nur innerhalb des eigenen Deduplizierungszeitraums von BigQuery. Daher sollte ein Ziel
  vorzugsweise deaktiviert statt gelöscht werden.

### Kompatibilität des Nutzungshinweisschemas

Neue BigQuery-Tabellen enthalten `usage_evidence` (STRING mit JSON-Inhalt) und
`usage_estimated` (BOOL), jeweils mit NULL-Werten. Bei aktiviertem `autoCreate` kann eine vorhandene Tabelle
nur diese fehlenden, NULL-fähigen Spalten erhalten. Der Exporter bewahrt das vollständige vorhandene
Schema einschließlich der Feldmetadaten und sendet einen bedingten PATCH unter Verwendung des
zurückgegebenen Etags. Eine gleichzeitige Schemaänderung lässt den Export fehlschlagen, anstatt
das Schema zu überschreiben; bei der nächsten Ausführung wird die Tabelle erneut gelesen.

Bei deaktiviertem `autoCreate` müssen Sie diese Spalten selbst hinzufügen, bevor Sie Datensätze
mit Nutzungshinweisen exportieren. Fehlende Schema-/Etag-Metadaten oder eine fehlgeschlagene Aktualisierung
verhindern ebenfalls das Einfügen von Datensätzen mit Nutzungshinweisen. Der Exportcursor wird bei diesem Fehler
nicht weiterbewegt, und Nutzungshinweise werden niemals stillschweigend verworfen. Die lokale Aufbewahrung von Protokollen
gilt weiterhin, während ein Export blockiert ist. Beheben Sie den Fehler daher, bevor aufbewahrte Quellzeilen ablaufen.
