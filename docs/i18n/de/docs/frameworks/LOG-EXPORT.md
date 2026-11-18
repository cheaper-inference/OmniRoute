# Log export (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Kontinuierlicher, inkrementeller Export von OmniRoute-Aufrufprotokollen in einen externen Analysespeicher.

Der Dashboard-Tab „Logs“ speichert den Anfrageverlauf in SQLite (`call_logs`), begrenzt durch
Rotation und Aufbewahrungsfristen. Der Protokollexport überträgt denselben Datensatz nach einem Zeitplan, damit er
über die lokale Datenbank hinaus erhalten bleibt und mit anderen Daten verknüpft werden kann. BigQuery ist das erste Ziel;
die Pipeline ist als Registry aufgebaut, sodass sich weitere Ziele ergänzen lassen.

---

## 1. Funktionsweise

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Zeitplan** — ein `JobRegistry`-Cronjob, `log_export`, standardmäßig mit `0 * * * *` (stündlich,
  UTC). Registriert in `src/lib/initCloudSync.ts`; überschreibbar mit `OMNIROUTE_LOG_EXPORT_CRON`.
  Jeder Durchlauf arbeitet alle **aktivierten** Ziele nacheinander ab.
- **Cursor** — die implizite `call_logs.rowid` von SQLite, pro Ziel in
  `log_export_destinations.cursor_row_id` gespeichert. `timestamp` dient bewusst nicht als Cursor: Aufrufer
  können einen eigenen Wert angeben, sodass eine langsame Anfrage nach einer schnelleren geschrieben werden kann, die
  später gestartet wurde. Ein Zeitstempel-Cursor würde sie überspringen.
- **Stapelverarbeitung** — `batch_size` Zeilen pro Anfrage (standardmäßig 500), `max_rows_per_run` Zeilen pro Lauf
  (standardmäßig 10000), damit ein großer Rückstand über mehrere Durchläufe abgearbeitet wird, statt einen einzigen zu blockieren.
- **Zustellung** — der Cursor wird erst weitergesetzt, nachdem `send()` erfolgreich abgeschlossen wurde. Bei einem fehlgeschlagenen Stapel bleibt der
  Cursor unverändert, sodass dieselben Zeilen beim nächsten Lauf erneut versucht werden. Garantiert wird
  eine mindestens einmalige Zustellung mit zielseitiger Deduplizierung, keine echte genau einmalige Zustellung: BigQuery verwendet für jede
  Zeile die Aufrufprotokoll-ID als Schlüssel und berücksichtigt diese nach dem Best-Effort-Prinzip innerhalb seines eigenen Deduplizierungsfensters.
- **Überlappungsschutz** — der Cron-Durchlauf und `POST .../run` können gleichzeitig ausgelöst werden. Ein Ziel,
  das bereits abgearbeitet wird, wird übersprungen statt doppelt verarbeitet (`skipped: true` im Laufergebnis),
  sodass ein gleichzeitiger Lauf weder einen Stapel erneut senden noch den Cursor zurücksetzen kann.
- **Wiederherstellung nach vollständiger Löschung** — wenn `cursor_row_id` über `MAX(rowid)` liegt (die gesamte Tabelle wurde
  geleert und die rowids beginnen wieder von vorn), setzt der Runner den Cursor auf 0 zurück, statt dauerhaft keine Daten mehr zu erkennen.

### Isolierter Runner und Grenzwerte

Jeder Ziellauf unter Node startet einen separaten, kurzlebigen untergeordneten Betriebssystemprozess (`child_process`
mit IPC, nicht `worker_threads`). Das Lesen von Bodys, das Parsen/Serialisieren von Nutzdaten-JSON, das zielseitige
`prepare()` und die Netzwerk-E/A zum Ziel laufen vollständig dort, nicht in der Ereignisschleife des Servers.
Nur die Konfiguration und kleine Fortschrittsmeldungen passieren IPC; exportierte Datensätze gelangen nie zurück
zum Server. Der Cronjob und die Route „Jetzt ausführen“ behalten dasselbe öffentliche Ergebnis und denselben Überlappungsschutz bei.

Der Kindprozess öffnet die vom Server aufgelöste Datei `DATA_DIR/storage.sqlite` schreibgeschützt mit `node:sqlite`,
mit `busy_timeout=5000` und `query_only=ON`. Er importiert keinen DB-Singleton und führt weder
Migrationen noch Sicherungen oder SQLite-Aktualisierungen durch. Die Behandlung fehlender/beschädigter Artefakte (einschließlich des
UPDATE für beschädigte Artefakte) bleibt ausschließlich im Detailpfad des Dashboards. Beide Pfade verwenden einen gemeinsamen reinen
Detail-Resolver; der Export nutzt asynchrone Dateisystem-Lesezugriffe und dieselbe Auflösungsreihenfolge: Artefakt → ältere
Inline-Daten → ältere Festplattendaten → keine Daten. Ein Lauf erfasst die maximale Einfüge-rowid
beim Öffnen des Readers durch den Kindprozess; spätere Einfügungen warten auf den nächsten Lauf. Dies ist eine Einfügegrenze,
keine langlebige SQLite-Transaktion: WAL-Schreiber und Checkpoints bleiben während
Netzwerkwartezeiten ungehindert. Aktualisierungen/Löschungen vorhandener Zeilen werden durch diese Grenze nicht eingefroren.

Nach jedem akzeptierten Stapel wartet der Kindprozess auf eine Bestätigung. Der Server speichert zunächst
den Cursor mit `advanceLogExportCursor` und sendet dann `ack`; vorher beginnt kein nächster Stapel.
Ein Sendefehler, Absturz oder Timeout wird als Fehler erfasst, ohne den Cursor für diesen Stapel weiterzusetzen. Zuvor
bestätigte Stapel bleiben festgeschrieben; höchstens der eine unbestätigte Stapel kann erneut gesendet werden.
Ein Erfolg wird erst nach `done` und einem ordnungsgemäßen Ende des Kindprozesses erfasst. Bei Fehlern wird der Kindprozess
mit SIGTERM beendet, nach 500 ms eskaliert dies zu SIGKILL, und der Runner wartet auf die vollständige Prozessbeendigung.

| Umgebungsvariable                             | Standardwert | Zweck                                      |
| --------------------------------------------- | ------------ | ------------------------------------------ |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000       | Zeitlimit pro Ziel in Echtzeit             |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024         | V8-Old-Space-Limit des Kindprozesses in MB |

Bei ungültigen, nicht positiven oder nicht ganzzahligen Werten werden die Standardwerte verwendet. Die Heap-Einstellung ist kein Gesamtlimit
für den RSS; sehr große Stapel können weiterhin den Speicher des Kindprozesses erschöpfen und den Lauf sicher fehlschlagen lassen.
Der Standardwert von 1024 MB lässt Spielraum für den Standardstapel mit 500 Zeilen aus 512-KiB-Artefakten bei
aktivierten Bodys, einschließlich der nach Byteumfang gestückelten JSON-Serialisierung von BigQuery. Er macht einen
Stapel mit 10000 Zeilen samt Bodys nicht sicher. Bei erschöpftem V8-Heap wird ein Fehler mit konkreten Handlungshinweisen erfasst: Stapelgröße
verringern oder `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` erhöhen; der Cursor bleibt beim letzten
bestätigten Stapel. Historische Inline-/Festplatten-Bodys unterliegen nicht der modernen Artefaktgrößenbegrenzung.
Betreiber müssen den RSS separat einplanen, insbesondere in Containern mit begrenztem Arbeitsspeicher.

Der Kindprozess erbt nur das aufgelöste `DATA_DIR`, `NODE_ENV`, ein explizites `TZ` (Auflösung
älterer Dateinamen anhand der Ortszeit), `ELECTRON_RUN_AS_NODE`, sofern vorhanden, und die folgenden Eingaben für ausgehende Verbindungen:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (und ihre kleingeschriebenen Varianten),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
Ein globaler Undici-Dispatcher verwendet dieselbe rein umgebungsbasierte Proxy-Auflösung und dieselben
Umgehungsregeln für lokale Hosts wie der Server, einschließlich `NO_PROXY`; er importiert weder `proxyFetch.ts` noch dessen Datenbank-/Feature-Flags.
Proxy-Zugangsdaten werden aus weitergeleiteten Ausgaben und aufgezeichneten Fehlern entfernt. Zugangsdaten für das Ziel
werden ausschließlich in einer einzelnen Start-IPC-Nachricht übertragen, niemals über argv oder die Umgebung; weitergeleitete Ausgaben und Fehler werden
mit einem Präfix versehen und bereinigt. In den Ausführungsargumenten des Kindprozesses wird nur `ExperimentalWarning` deaktiviert, damit
Nodes SQLite-Warnung nicht bei jedem Cron-Lauf erneut erscheint; andere Warnungstypen bleiben sichtbar.

Zielmodule müssen ohne Next.js-/server-only-Abhängigkeiten importierbar sein. Die bestehende
BigQuery-Implementierung erfüllt diese Anforderung bereits. Zugriffstoken-Caches bestehen nur für die Dauer des
Kindprozesslaufs, nicht über mehrere Läufe hinweg. Node ist die unterstützte Laufzeitumgebung (`package.json` engines), aber der Bun-
Installationsabschnitt der README und `Dockerfile.bun` beschreiben auch einen produktiven Kompatibilitätspfad mit
`bun:sqlite` (`src/lib/db/core.ts` / Adapter). Unter Bun behalten Exporte daher den bisherigen
prozessinternen Pfad bei und geben eine einmalige Warnung aus: Heap-/Timeout-Isolation durch Kindprozesse ist nicht verfügbar. Verwenden Sie
Node für Event-Loop- und OOM-Isolation; Bun wird hier nicht als reine Entwicklungsumgebung behandelt.

Wenn `includeBodies` aktiviert ist, bevorzugen Sie einen Takt im Minutenbereich wie
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`, statt stündlich einen Rückstau an Nutzdaten anzusammeln.
Batch- und Zeilenlimits begrenzen weiterhin jeden Lauf. Der Prozessstart fällt pro Ziel und Lauf an;
dabei wird ein geringer Startaufwand gegen die Isolation der Server-Event-Loop eingetauscht, nicht gegen eine geringere CPU-Gesamtauslastung.

### Nutzdaten (Prompts und Antworten)

Standardmäßig enthält der Export nur die Zusammenfassungsfelder, die die **Liste** der Protokolle anzeigt. Durch Aktivieren von
**Prompts und Antworten exportieren** (`includeBodies`) werden zusätzlich die Inhalte übertragen, die der **Detailbereich**
der Protokolle für jeden Aufruf anzeigt:

| Feld                             | Inhalt                                                             |
| -------------------------------- | ------------------------------------------------------------------ |
| `request_body` / `response_body` | Die Nutzdaten des Aufrufs, wie sie im Dashboard dargestellt werden |
| `pipeline_route_decision`        | Welches Ziel und Modell der Router ausgewählt hat                  |
| `pipeline_client_request`        | Die unveränderte Anfrage, genau wie vom Client gesendet            |
| `pipeline_openai_request`        | Nach der Übersetzung in das interne OpenAI-Format                  |
| `pipeline_provider_request`      | Wie tatsächlich an den Anbieter gesendet, in dessen Dialekt        |
| `pipeline_provider_response`     | Die unveränderte Antwort des Anbieters                             |
| `pipeline_client_response`       | Was an den Aufrufer zurückgegeben wurde                            |
| `pipeline_error`                 | Fehlerdetails auf Pipeline-Ebene für einen fehlgeschlagenen Aufruf |
| `bodies_truncated`               | Wahr, wenn eines der obigen Felder `maxBodyBytes` erreicht hat     |

Dabei handelt es sich um Prompt-Inhalte. Daher ist diese Option **standardmäßig deaktiviert** und bewusst pro Ziel festzulegen.
Exportiert wird, was das Dashboard anzeigt, da Export und `getCallLogById` dieselbe Detailauflösung
verwenden: Nutzdaten werden
bereits beim Schreiben von personenbezogenen Daten und Geheimnissen bereinigt, und ein Aufruf mit einem
`noLog`-API-Schlüssel speichert keinerlei Nutzdaten, sodass nichts exportiert werden kann.

Nutzdaten werden zeilenweise aus dem Dateisystem-Artefakt gelesen. Die Hydrierung erfolgt daher nur für Ziele,
die sie angefordert haben. Bei einem fehlenden oder beschädigten Artefakt wird dessen Zusammenfassung mit null-Nutzdaten exportiert,
statt den Batch fehlschlagen zu lassen und den Cursor zu blockieren.

`maxBodyBytes` (Standardwert 262144) begrenzt jedes Feld. Längere Nutzdaten werden **gekürzt statt
verworfen** — ein gekürzter Prompt beantwortet immer noch die Frage „Was wurde gefragt?“ — und die Zeile wird mit
`bodies_truncated` gekennzeichnet. Gestreamte, abschnittsweise Deltas werden nicht exportiert; die zusammengesetzte Antwort befindet sich
bereits in `pipeline_provider_response` und `pipeline_client_response`.

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
