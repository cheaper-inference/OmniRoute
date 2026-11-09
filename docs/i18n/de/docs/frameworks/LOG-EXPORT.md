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

| Schlüssel            | Hinweise                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------- |
| `projectId`          | GCP-Projekt, das das Dataset enthält                                                         |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                              |
| `tableId`            | `[A-Za-z0-9_]+`                                                                              |
| `location`           | Wird nur verwendet, wenn das Dataset erstellt werden muss (Standard: `EU`)                   |
| `serviceAccountJson` | Schlüssel des Dienstkontos. Geheim: im Ruhezustand verschlüsselt, wird niemals zurückgegeben |
| `autoCreate`         | Dataset und Tabelle beim ersten Export erstellen (Standard: `true`)                          |

Das Dienstkonto benötigt `bigquery.tables.updateData` für die Zieltabelle sowie
`bigquery.datasets.create` / `bigquery.tables.create`, wenn `autoCreate` aktiviert ist.

Ein konfigurierter Batch ist eine **Cursor**-Einheit, keine HTTP-Einheit: `send()` teilt ihn in insertAll-Aufrufe
mit jeweils höchstens 500 Zeilen auf, sodass ein großer `batch_size` das Anfragelimit von BigQuery von 10 MB nicht überschreiten kann.
Bei vorübergehenden Statuscodes (408/429/500/502/503/504) erfolgen bis zu drei Wiederholungsversuche mit exponentiell
steigender Wartezeit und denselben insertIds; Authentifizierungs- und Schemafehler lösen bereits beim ersten Versuch eine Ausnahme aus,
statt den Lauf unnötig fortzusetzen.

Eine gerade erst erstellte Tabelle ist für den Streaming-Endpunkt noch nicht sichtbar; dieser antwortet
einige Sekunden lang mit 404. Bei diesem 404 erfolgen Wiederholungsversuche, aber **nur, wenn die Tabelle in diesem Lauf erstellt wurde** —
bei einer tatsächlich fehlenden Tabelle wird weiterhin sofort abgebrochen. Beachten Sie, dass BigQuery Streaming-Inserts mehrere Minuten lang ablehnt,
wenn eine Tabelle unter einem kürzlich gelöschten Namen neu erstellt wird; dies ist eine
Eigenschaft der Abfolge Löschen–Neuerstellen. Verwenden Sie daher lieber einen neuen Tabellennamen, statt eine Tabelle zu löschen und erneut anzulegen.

**Ein Teilfehler wird als HTTP 200 mit einem nicht leeren `insertErrors[]` zurückgegeben.** Dies wird als
Fehler behandelt und löst eine Ausnahme aus. Dadurch wird verhindert, dass der Cursor über Zeilen hinaus vorrückt, die BigQuery nie
angenommen hat; `tests/unit/log-export-bigquery.test.ts` sichert dieses Verhalten ab.

Der Transport erfolgt über reines REST — eine selbstsignierte RS256-Assertion wird unter
`https://oauth2.googleapis.com/token` gegen ein Zugriffstoken eingetauscht; anschließend werden die Zeilen an `tabledata.insertAll` gesendet. Es wird kein Google SDK
eingebunden. Zugriffstoken werden prozessintern pro Kombination aus Dienstkonto und Geltungsbereich zwischengespeichert.

Die erstellte Tabelle enthält eine Spalte pro Feld auf der Registerkarte „Logs“ sowie `exported_at` und ist auf
die tatsächlichen Abfragemuster für Aufrufprotokolle ausgelegt:

- **Nach Tagen anhand von `timestamp` partitioniert**, sodass eine auf einen Datumsbereich begrenzte Abfrage nur diese Tage durchsucht.
- **Nach `api_key_name`, `provider`, `model`, `status` geclustert** (in dieser Reihenfolge), sodass Filter danach,
  wer den Aufruf ausgeführt hat, wohin er ging oder ob er fehlgeschlagen ist, Blöcke innerhalb jeder Partition ausschließen. BigQuery
  erlaubt höchstens vier Clustering-Spalten, und ihre Reihenfolge ist entscheidend: Ein Filter allein auf `api_key_name`
  schließt Blöcke aus, ein Filter allein auf `status` dagegen nicht.
- **Optionale Aufbewahrungsdauer für Partitionen** über `partitionExpirationDays` (0 behält alles), angewendet
  beim Erstellen der Tabelle.

Beide Einstellungen werden bei der Erstellung angewendet. Eine vorhandene Tabelle behält ihre bisherige Struktur.
Wenn Sie diese Einstellungen übernehmen möchten, geben Sie für das Ziel eine neue Tabellen-ID an.

`tests/unit/log-export-bigquery.test.ts` stellt sicher, dass Mapper und Tabellenschema
synchron bleiben, damit eine neue Aufrufprotokollspalte beim Export nicht unbemerkt verloren gehen kann.

Batches werden **sowohl** nach Zeilenanzahl als auch nach serialisierter Größe in Byte aufgeteilt. Die Zeilenanzahl allein reicht nicht aus,
sobald Nutzdaten exportiert werden: 500 Zeilen mit Prompts können mehrere Dutzend Megabyte groß sein, und insertAll
lehnt Anfragen über 10 MB ab. Ein Teilpaket wird bei 500 Zeilen oder 9 MB abgeschlossen, je nachdem, was zuerst erreicht wird.

---

## 5. OTLP/HTTP-Ziel für Traces

Die Konfiguration verwendet `type: "otlp-http"`. Dies ist ein zeitgesteuerter, cursorbasierter Export persistierter
Aufrufprotokolle, nicht die nach dem Best-Effort-Prinzip arbeitende Senke für Live-Routing-Ereignisse in
`open-sse/services/routing/otel.ts`. Die Umgebungsvariablen, Timer oder Puffer dieser Senke werden weder gelesen
noch geändert. Wenn beide aktiviert sind, können zwei unabhängige Arten von Spans entstehen;
verwenden Sie den Instrumentierungsbereich `omniroute.log-export`, um diese Aufrufprotokoll-Spans zu unterscheiden.

| Schlüssel                | Standardwert / Zweck                                                                            |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `endpoint`               | Erforderliche vollständige HTTP(S)-URL für Traces; das Suffix `/v1/traces` wird nicht angehängt |
| `headers`                | Optionale Zeilen im Format `Name: value` oder JSON-Objekt mit Zeichenfolgen; verschlüsselt      |
| `requestHeaderAllowlist` | Leer (aus); Namen/Präfixe von Client-Headern, die als Span-Attribute erfasst werden sollen      |
| `serviceName`            | `omniroute`; Ressourcenattribut `service.name`                                                  |
| `langfuseMapping`        | `false`; fügt Langfuse-Attribute für Generierung/Sitzung/Benutzer hinzu                         |
| `identity`               | `pseudonymous`, `keyName` oder `none`                                                           |
| `paths`                  | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`                                         |
| `timeoutMs`              | `30000` pro HTTP-Versuch                                                                        |
| `environment`            | Nicht gesetzt; optionales `langfuse.environment`                                                |

Das generische Dashboard stellt diese Felder dar. `paths` akzeptiert ein API-Array oder ein Textfeld
mit exakten Pfaden, die durch Zeilenumbrüche/Kommas getrennt sind. Embeddings, Rerank und andere Pfade werden
übersprungen, sofern sie nicht ausdrücklich zugelassen sind. Auch übersprungene Zeilen setzen den Cursor weiter;
die Zähler `exported`/`exportedTotal` des bestehenden Runners zählen verarbeitete Quellzeilen, einschließlich herausgefilterter
Zeilen, statt akzeptierter Spans. Die Filterung erfolgt im untergeordneten Prozess, ohne dessen
IPC-/Cursor-Vertrag zu ändern.

Die URL-Validierung verwendet die ohne Datenbankzugriff arbeitende Hilfsfunktion `parseAndValidateNonMetadataUrl` aus
`src/shared/network/outboundUrlGuard.ts`: die Richtlinie `block-metadata`. Sie führt dieselben
bedingungslosen Prüfungen auf Metadaten, Protokolle und eingebettete Anmeldedaten durch wie der Webhook-Validator bei
zugelassenen privaten URLs, erlaubt jedoch bewusst localhost-/LAN-Ziele ohne eine globale
Feature-Flag-Überschreibung. Dies ermöglicht selbst gehostete Langfuse-, Phoenix-, Tempo- und Collector-
Endpunkte, einschließlich privater HTTP-Endpunkte. Cloud-Metadaten-Hosts werden immer blockiert.
Weiterleitungen werden nicht verfolgt, sodass ein Collector Anmeldedaten nicht an einen anderen Host weiterleiten kann.
Wie die bestehende lexikalische URL-Prüfung fixiert auch diese die DNS-Auflösung nicht; konfigurieren Sie nur
Hosts unter der Kontrolle des Betreibers. Bevorzugen Sie HTTPS, wenn sich der Endpunkt nicht in einem vertrauenswürdigen Netzwerk befindet.

### Nutzdaten und Zustellung

OTLP/HTTP-JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) überträgt pro zugelassener
Zeile einen CLIENT-Span, der nach ihrem exakten Anfragepfad benannt ist. Die Benennung nach Pfad unterscheidet
Chat Completions, Responses und Messages, ohne Modell- oder Identitätsdaten in den
Span-Namen einzubetten. Ressourcenattribute umfassen `service.name` und die `service.version` des Pakets.

Der reguläre Logger für Chat-Versuche (`open-sse/handlers/chatCore/attemptLogging.ts`) schreibt
`duration = Date.now() - startTime` beim Abschluss und liefert keinen Zeitstempel;
`saveCallLogOperation` in `src/lib/usage/callLogs.ts` setzt den Zeitstempel standardmäßig auf den Schreibzeitpunkt
(Abschlusszeitpunkt). Der Export setzt daher Ende = Zeilenzeitstempel und Start = Ende − Dauer
(Millisekunden, umgerechnet in dezimale Nanosekunden). Vom Aufrufer bereitgestellte historische Zeitstempel
werden ebenfalls als Endzeit beibehalten; es gibt keine Unterscheidung zwischen Start und Abschluss pro Zeile.
Eine Dauer mit dem Wert null wird zu null. Ungültige/fehlende Zeitstempel lassen den Batch fehlschlagen, statt
nichtdeterministische Spans zu erzeugen. `ttftMs` kann null sein und wird auf `omniroute.ttft_ms` abgebildet.

Zu den Attributen gehören `gen_ai.operation.name="chat"`, Anbieter, angefordertes/zurückgegebenes Modell,
Eingabe-/Ausgabe-Token, optionale Token für Cache-Lesen/Cache-Erstellung/Reasoning, HTTP-Status,
Combo, Cache-Quelle, Sitzungs-Tag und Korrelations-ID. Ganzzahlige OTLP-Werte und Zeitstempel
sind dezimale Zeichenfolgen; Zeichenfolgen, boolesche Werte und Bruchzahlen verwenden ihre nativen OTLP-
Wertvarianten. Fehler-Spans haben den Status ERROR und eine bereinigte Statusmeldung. Der kanonische
Datensatz enthält keine URL des vorgelagerten Hosts, daher wird `server.address` weggelassen, statt
den Collector fälschlich als Modellserver zu identifizieren. Kosten werden nicht exportiert.

Nur `includeBodies=true` lädt Inhalte nach. Bei `langfuseMapping=false`
enthalten `gen_ai.input.messages` / `gen_ai.output.messages` das bereinigte JSON des Anfrage-/Antwort-
Bodys in der von OmniRoute gespeicherten Form (kanonisiert, sofern parsbar), kein umgeformtes semconv-
Nachrichtenarray. Gekürzte/Nicht-JSON-Bodys bleiben Rohtext. Bei `langfuseMapping=true`
werden Bodys nur als `langfuse.observation.input` / `langfuse.observation.output` ausgegeben;
die Attribute `gen_ai.*.messages` werden weggelassen, sodass jeder Body einmal gesendet wird. Beide Modi
übernehmen `maxBodyBytes` aus dem bestehenden Nachladepfad;
`omniroute.bodies_truncated=true` kennzeichnet Kürzungen.
Dieses Ziel fügt keine zusätzlichen Pipeline-Snapshots oder Lesezugriffe auf unbereinigte Artefakte hinzu;
die optionale Erfassung von Anfrage-Headern verwendet den unten beschriebenen bestehenden nachgeladenen Client-Snapshot.
Verwenden Sie beim Exportieren von Bodys einen Takt im Minutenbereich, etwa `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"`,
statt einen stündlichen Rückstau anzusammeln.

### Optionale Client-Anfrage-Header

Die Header-Erfassung ist **standardmäßig deaktiviert**. Setzen Sie `requestHeaderAllowlist` in der Zielkonfiguration
und aktivieren Sie **Prompts und Antworten exportieren** (`includeBodies: true` am Ziel).
Die Positivliste akzeptiert ein API-Array oder ein Textfeld mit durch Zeilenumbrüche/Kommas getrennten Namen:

```json
{
  "requestHeaderAllowlist": ["User-Agent", "X-Project", "X-OmniRoute-Meta-*"]
}
```

Namen werden ohne Berücksichtigung der Groß-/Kleinschreibung exakt abgeglichen, es sei denn, ein einzelnes abschließendes `*` wählt ein nicht leeres
Präfix eines Header-Namens aus. Ein alleinstehendes `*`, eingebettete Platzhalter und ungültige HTTP-Header-Namen werden abgelehnt.
Es sind höchstens 64 Selektoren zulässig, jeweils mit einem Namen/Präfix von höchstens 256 ASCII-Bytes.
Diese Einstellung ist unabhängig von `headers`, womit sich der Exporter gegenüber dem Collector authentifiziert.

Die Erfassung liest ausschließlich `pipeline_client_request`, das aus dem `clientRawRequest` (oder dem älteren `clientRequest`) der gespeicherten detaillierten Pipeline
befüllt wird. Sie greift niemals ersatzweise auf Request-Header des Providers zurück.
Die detaillierte Pipeline-Protokollierung muss zum Zeitpunkt der Aufzeichnung der Anfrage aktiviert gewesen sein. Bei
deaktiviertem `includeBodies` oder bei fehlendem, beschädigtem oder abgeschnittenem Client-Snapshot-JSON werden keine Header-
Attribute ausgegeben. Eine Erhöhung von `maxBodyBytes` kann das Abschneiden von Snapshots beim Export verhindern;
sie kann keine Details wiederherstellen, die nie gespeichert wurden. Ein Snapshot mit mehr als 1 MiB oder mehr als
256 Header-Einträgen wird ignoriert. Der bestehende Prompt-/Antwort-Export bleibt parallel zur
Header-Erfassung aktiviert; die Positivliste bietet keinen Hydrierungsmodus ausschließlich für Header.

Ausgewählte Werte werden zu OTLP-String-Arrays unter `http.request.header.<full lowercase header name>`,
auch bei einer einzelnen Zeichenfolge. Beispielsweise wird `X-OmniRoute-Meta-Team: example-team` zu
`http.request.header.x-omniroute-meta-team` mit
`{"arrayValue":{"values":[{"stringValue":"example-team"}]}}`.
Das vollständige Präfix bleibt erhalten: Es handelt sich um gewöhnliche Header, ohne Analyse geschäftsspezifischer Felder oder
Konvertierung in `omniroute.metadata.*` / Langfuse-Metadaten. `langfuseMapping` ändert die Header-
Semantik nicht. Ein ausgewählter einwertiger `User-Agent` setzt außerdem den standardmäßigen Skalarwert
`user_agent.original`. Kommas innerhalb eines Werts werden nicht als Trennzeichen behandelt. Varianten mit unterschiedlicher Groß-/Kleinschreibung werden in der gespeicherten
Eintragsreihenfolge zusammengeführt; jede ungültige Variante führt dazu, dass der gesamte Header ausgelassen wird. Attribute werden nach dem kleingeschriebenen Namen sortiert.

Authorization, Proxy-Authorization, Cookie, Set-Cookie, API-Key-Header, Namen mit
auth/token/secret/password/credential-Markierungen und interne Gateway-Zugangsdaten werden immer
ausgeschlossen, auch wenn sie ausgewählt oder im Speicher teilweise maskiert sind. Bekannte Zugangsdatenmuster verwenden
die gemeinsame Zugangsdaten-Erkennung; Schwärzungsmarkierungen werden ausgelassen und nicht als sichere Werte exportiert.
Es werden nur Zeichenfolgen und nicht leere String-Arrays akzeptiert; Zahlen oder Objekte werden nicht konvertiert.
Ungültige Namen, Prototypschlüssel, Steuerzeichen (außer horizontalen Tabulatoren) und fehlerhaftes Unicode
werden ignoriert, ohne den Batch fehlschlagen zu lassen oder ihren Inhalt in Fehlermeldungen wiederzugeben.

Jeder Span erfasst höchstens 32 Header, 16 Werte pro Header, 4096 UTF-8-Bytes pro Wert
und insgesamt 16384 UTF-8-Bytes für die erfassten Header-Namen und -Werte. Zu große/ungültige Header
werden vollständig ausgelassen, nicht abgeschnitten. Die Auswahl ist eine Datenschutzentscheidung des Betreibers: Unbedenklich wirkende Namen
können dennoch personenbezogene Daten enthalten, und diese Grenzen/Erkennungsmechanismen sind kein allgemeiner Filter zur Bereinigung personenbezogener Daten.

### Übertragungsgrenzen

Anfragen sind auf 500 Spans und 4 MiB UTF-8-JSON einschließlich der Hüllstruktur begrenzt.
Jeder zulässige Span wird vor der ersten Anfrage eines Cursor-Batches auf seine Größe geprüft. Ein einzelner
Span, der das Limit überschreitet, verhindert das Senden jeglicher Teile dieses Batches und führt zu einem Fehler mit dem Hinweis, `maxBodyBytes`
zu reduzieren; er wird nicht stillschweigend verworfen. Die Vorabprüfung behält nur Datensatzreferenzen und
Byte-Anzahlen bei und verwirft jeden temporären Span samt JSON; Spans werden für größenbegrenzte Teilstücke neu erstellt,
anstatt eine zweite serialisierte Kopie des Batches vorzuhalten. Bei HTTP 408/429/5xx, Netzwerkfehlern und Zeitüberschreitungen erfolgen höchstens
drei Versuche mit exponentieller Wartezeit von 250/500 ms. `Retry-After`-Angaben in Sekunden oder als HTTP-Datum
können eine Wartezeit auf bis zu 5 Sekunden verlängern. Andere Statuscodes führen sofort zum Fehlschlag. Auch eine teilweise Ablehnung bei OTLP 2xx löst einen Fehler aus, anstatt
einen verlorenen Span zu bestätigen; leere Bestätigungen oder solche mit gültigem JSON werden akzeptiert, wobei beim
Lesen der Antwort eine Obergrenze von 64 KiB gilt.

Fehlermeldungen enthalten nur Fakten aus dem Verantwortungsbereich des Exporters: HTTP-Status, Wiederholungsklasse, Anzahl der Versuche und gesendeten
Spans oder fest vorgegebene Formulierungen für Bestätigungs-/Netzwerkfehler. Antwortinhalte des Collectors,
Anzahlen bei Teilerfolgen und Antwort-Header werden niemals in Fehlermeldungen, Protokolle oder das
Dashboard übernommen. Ein fehlgeschlagener oder teilweise akzeptierter Batch wird nicht bestätigt: Das Ziel zeigt
„Fehlerhaft“ mit diesem Status an, der Cursor bleibt beim zuletzt bestätigten Batch, und der nächste Lauf
sendet dieselben Zeilen erneut. Permanente Statusfehler führen weiterhin zu Fehlschlägen, bis der Collector oder die Konfiguration
korrigiert wurde. Verwenden Sie die eigenen Protokolle des Collectors für Antwortdetails. Fehlerzusammenfassungen im Aufrufprotokoll behalten
ihre separate Schwärzung bei.
`prepare()` stellt nichts bereit; der Test sendet exakt `{"resourceSpans":[]}` per POST und meldet den
HTTP-Status, ohne Spans aus dem Aufrufprotokoll zu schreiben.

Trace-IDs und Span-IDs sind die ersten 32/16 Hexadezimalziffern des SHA-256-Hashs von
`"omniroute.trace\\0" + callLogId` bzw. `"omniroute.span\\0" + callLogId`. Erneute Sendungen enthalten
identische IDs. Dies ist keine Garantie für eine Deduplizierung: Einige Backends, darunter die Langfuse-
v4-Ingestion, deduplizieren Spans mit identischer ID nicht. Ein Absturz oder das Fehlschlagen eines Teilstücks kann dazu führen, dass
höchstens der eine unbestätigte Cursor-Batch erneut gesendet wird; dabei kann der gesamte Batch dupliziert werden,
nicht nur sein letztes HTTP-Teilstück. Berücksichtigen Sie diesen Zielkonflikt bei der Wahl der Cursor-Batch-Größe.

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

Erstellen Sie den Authorization-Wert lokal als Base64-Kodierung der literalen Zeichenfolge `public-key:secret-key`
(zum Beispiel mit `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Fügen Sie keine echten Zugangsdaten in Protokolle, Screenshots oder Issues ein. Die Zuordnung setzt automatisch
`x-langfuse-ingestion-version: 4`; Authorization wird weiterhin über `headers` angegeben.
Sowohl die Header als auch der generierte Salt für die Identität verwenden den bestehenden Mechanismus für verschlüsselte Geheimnisfelder
und API-Platzhalter; `STORAGE_ENCRYPTION_KEY` ist erforderlich.

Das Mapping ergänzt Generierungstyp/-modell, JSON-Nutzungsdetails (Eingabe/Ausgabe/Gesamtzahl und verfügbare
Cache-Schlüssel), JSON-Snapshots von Ein- und Ausgabe, die Stufe ERROR/DEFAULT, eine bereinigte Statusmeldung,
den Trace-Namen, die Sitzungs-ID, eine optionale Umgebung sowie filterbare
`langfuse.observation.metadata.<key>` für Anbieter, angefordertes Modell, Pfad, Kombination, Cache-
Quelle und Status. `langfuse.observation.completion_start_time` wird im ISO-8601-Format als
Startzeit + TTFT angegeben, jedoch nur, wenn TTFT bekannt ist und innerhalb der Dauer liegt. Es werden keine Kostenattribute gesendet.

Identitätsmodi gelten für `langfuse.user.id`:

- `pseudonymous` (Standard): HMAC-SHA256 der internen ID des API-Schlüssels mit einem zufälligen,
  zielspezifischen 32-Byte-Salt. Der Salt wird beim Erstellen generiert, falls er fehlt, verschlüsselt
  als `identitySalt` gespeichert, niemals zurückgegeben und bei Bearbeitungen beibehalten. Unverarbeitete Schlüssel-IDs werden niemals
  in Span-Attribute aufgenommen. Das Neuerstellen/Rotieren des Salts eines Ziels ändert die Identitäten.
- `keyName`: der konfigurierte Name des API-Schlüssels, der diese vom Betreiber vergebene Bezeichnung absichtlich offenlegt.
- `none`: keine Benutzer-ID. Sitzungs-Tags werden weiterhin exportiert, sofern vorhanden; diese Modi
  anonymisieren keine beliebigen Prompt-Inhalte oder vom Betreiber bereitgestellten Sitzungs-/Korrelationsbezeichnungen.

### Ohne rückwirkende Übernahme starten

Aktivieren Sie ausschließlich beim Erstellen **Ab aktueller Position starten (vorhandene Protokolle überspringen)** oder übergeben Sie
`startFromCurrentPosition: true` auf der obersten Ebene der API-Nutzdaten für die Erstellung. Dadurch wird
`cursor_row_id` mithilfe der vorhandenen Cursor-Hilfsfunktionen auf die aktuelle maximale rowid der aufbewahrten Aufrufprotokolle
initialisiert, ohne Migration. Der Standardwert ist false (Cursor 0 und rückwirkende Übernahme des aufbewahrten Verlaufs).
Dies ist keine Einstellung zum Zurücksetzen des Cursors bei einer Aktualisierung.

Die gemeinsame Ergänzung `ttftMs` fügt außerdem dem BigQuery-Mapper
und dem Schema für neue Tabellen eine nullable Spalte `ttft_ms` hinzu: Der zugehörige Schematest verlangt für jedes kanonische Datensatzfeld eine
Spalte. Bestehende Tabellen werden unverändert weiter exportiert: `prepare()` liest das Tabellenschema und
lässt nur `ttft_ms` weg, wenn diese Spalte fehlt. Fügen Sie die nullable INT64-Spalte hinzu, um TTFT
beim nächsten Durchlauf zu erhalten, oder verwenden Sie eine neue Tabelle. Weder PATCH noch eine automatische Schemaänderung oder zusätzliche
Berechtigungen sind erforderlich; für alle anderen Zeilenfelder bleibt die strikte Schemaprüfung bestehen.

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

- **Dashboard**: Integrationen → Protokollexport. Fügen Sie ein Ziel hinzu, führen Sie **Test** aus, um die Zugangsdaten
  zu prüfen, ohne Zeilen zu schreiben, und aktivieren Sie es anschließend.
- **Rückstand**: Jede Zielkarte zeigt ausstehende Zeilen und den Cursor an; `GET
/api/log-export/status` gibt dieselben Werte sowie die letzten 20 Jobausführungen zurück.
- **Ein fehlerhaftes Ziel beeinträchtigt die anderen nicht** — die Ausführungsübersicht erfasst den Status pro Ziel
  in `last_status` / `last_error`, und der Verlauf der Jobausführungen speichert den Gesamtstatus.
- **Beim Löschen eines Ziels wird dessen Cursor gelöscht.** Wird es erneut hinzugefügt, beginnt der Export beim ältesten noch aufbewahrten
  Aufrufprotokoll. Dadurch werden Zeilen erneut gesendet, die das Ziel möglicherweise bereits enthält. Bei BigQuery fängt die
  `insertId` jeder Zeile dies nur innerhalb des BigQuery-eigenen Deduplizierungsfensters ab. Deaktivieren Sie ein Ziel daher
  nach Möglichkeit, statt es zu löschen.
