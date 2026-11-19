# Database Schema & Operations Guide (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Kurzfassung**: OmniRoute verwendet **SQLite mit WAL-Journaling** als primären Datenspeicher und **AES-256-GCM** zur Verschlüsselung vertraulicher Felder im Ruhezustand. Dieser Leitfaden behandelt das Schema, Migrationen, Sicherung/Wiederherstellung und betriebliche Runbooks.

**Quellen:**

- `src/lib/db/core.ts` — Singleton + SCHEMA_SQL (17 Basistabellen)
- `src/lib/db/migrationRunner.ts` — versionierte Migrationen
- `src/lib/db/migrations/` — 167 versionierte SQL-Dateien
- `src/lib/db/encryption.ts` — Hilfsfunktionen für die Verschlüsselung
- `src/lib/db/backup.ts` — Export/Import von Sicherungen
- `src/lib/db/healthCheck.ts` — Zustandsdiagnose

---

## Warum SQLite?

OmniRoute hat sich aus mehreren Gründen für SQLite anstelle von PostgreSQL/MySQL entschieden:

| Faktor              | SQLite                                          | PostgreSQL                                          |
| ------------------- | ----------------------------------------------- | --------------------------------------------------- |
| **Bereitstellung**  | Eingebettet — kein separater Server             | Erfordert die Einrichtung eines Servers             |
| **Verschlüsselung** | Anwendungsebene (AES-256-GCM)                   | Integrierte TDE                                     |
| **Leistung**        | Schneller bei kleinen/mittleren Workloads       | Besser für sehr viele gleichzeitige Schreibvorgänge |
| **Nebenläufigkeit** | WAL-Modus ermöglicht gleichzeitige Lesevorgänge | Vollständiges MVCC                                  |
| **Sicherung**       | Kopie einer einzelnen Datei                     | `pg_dump` oder Dateisystem-Snapshot                 |
| **Anwendungsfall**  | Installation pro Benutzer, eingebettet          | Mandantenfähiges SaaS                               |

Für Bereitstellungen mit **einem Benutzer und einer einzelnen Instanz** (der primäre Anwendungsfall von OmniRoute) ist SQLite einfacher und schneller.

### WAL-Journaling

`core.ts` öffnet die Datenbank im **WAL-Modus (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL ermöglicht **gleichzeitige Lesevorgänge** während Schreibvorgängen — wichtig für das Dashboard, das Abfragen ausführt, während Anfragen aufgezeichnet werden.

Die standardmäßige Cache-Größe beträgt **65.536 KiB (64 MiB)**. SQLite interpretiert einen negativen
`cache_size`-Wert als ungefähre Obergrenze in KiB und weist Seiten nach Bedarf zu.
Unter **Einstellungen > System & Speicher > Cache-Größe** werden Ganzzahlwerte von **1 bis
1.000.000 KiB** akzeptiert; beim Speichern der Einstellung wird sie auf die aktive Datenbankverbindung angewendet,
und OmniRoute stellt den gespeicherten Wert beim Start wieder her.

---

## Datenbankspeicherort

Die SQLite-Datei wird hier gespeichert:

| Betriebssystem | Pfad                                                        |
| -------------- | ----------------------------------------------------------- |
| Linux          | `~/.omniroute/storage.sqlite`                               |
| macOS          | `~/.omniroute/storage.sqlite`                               |
| Windows        | `%USERPROFILE%\.omniroute\storage.sqlite`                   |
| Docker         | `/app/data/storage.sqlite` (konfigurierbar über `DATA_DIR`) |

Zugehörige Dateien:

- `storage.sqlite-wal` — Write-Ahead-Log
- `storage.sqlite-shm` — Shared-Memory-Datei
- `call_logs/` — Artefakte von Anfrage-Payloads (sofern aktiviert)

**Speicherort überschreiben:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Architektur der Domänenmodule

Die Datenbank von OmniRoute umfasst **110 TypeScript-Module auf oberster Ebene** in `src/lib/db/`. Jedes Domänenmodul:

- Ist für eine oder mehrere bestimmte Tabellen zuständig
- Exportiert typisierte CRUD-Funktionen
- Greift niemals auf die Tabellen eines anderen Moduls zu
- Verwendet `getDbInstance()` aus `core.ts`, um auf die Datenbank zuzugreifen

### Die 110 DB-Module auf oberster Ebene

OmniRoute verfügt über **110 TypeScript-Dateien auf oberster Ebene** in `src/lib/db/`. Nachfolgend finden Sie eine Auswahl der Kernmodule; die vollständige Liste finden Sie in der Verzeichnisauflistung:

| Modul                   | Tabellen                                                       | Zuständigkeit                                                                 |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registrierung und Anmeldedaten von Anbietern per OAuth/API-Schlüssel          |
| `models.ts`             | `key_value` (Modelldaten)                                      | Modelldefinitionen, Fähigkeiten und Preise                                    |
| `combos.ts`             | `combos`                                                       | Konfigurationen und Reihenfolge des Combo-Routings                            |
| `apiKeys.ts`            | `api_keys`                                                     | Lebenszyklus von API-Schlüsseln, Geltungsbereiche und Kontingentverfolgung    |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Systemkonfiguration und gemeinsam genutzter KV-Speicher                       |
| `backup.ts`             | —                                                              | Operationen zum Exportieren und Importieren von Sicherungen                   |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxy-Konfigurationen und Routing-Regeln                                      |
| `prompts.ts`            | `prompt_templates`                                             | Wiederverwendbare Prompt-Vorlagen und Versionierung                           |
| `webhooks.ts`           | `webhooks`                                                     | Ereignisgesteuerte Webhook-Abonnements und Protokolle                         |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Audit-Protokollierung pro Anfrage (optional, hohes Volumen)                   |
| `domainState.ts`        | `domain_*` (5 Tabellen)                                        | Domänenbudgets, Leistungsschalter, Sperren, Fallback-Ketten und Kostenverlauf |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Zulässige API-Schlüssel für MCP/A2A                                           |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historische Kontingentnutzung                                                 |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Zuordnung von Modellen zu Combo-Standardeinstellungen                         |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-spezifischer persistenter Zustand                                         |
| `encryption.ts`         | —                                                              | Hilfsfunktionen zum Ver- und Entschlüsseln von Feldern                        |
| `readCache.ts`          | —                                                              | In-Memory-Cache für leseintensive Operationen                                 |
| `secrets.ts`            | `key_value` (verschlüsselte Einträge)                          | Verschlüsselte Speicherung geheimer Daten                                     |
| `stateReset.ts`         | —                                                              | Löschen/Zurücksetzen des Datenbankzustands für Tests                          |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Sitzungskontext für die Übergabe zwischen Agenten                             |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Nutzungsverfolgung                                                            |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Komprimierungskonfiguration                                                   |

### Modulgrenzen

Eine zentrale Architekturregel lautet: **Module greifen nicht direkt auf die Tabellen anderer Module zu**. Um mit den Daten eines anderen Moduls zu arbeiten, importieren Sie die Funktion aus diesem Modul.

```ts
// ❌ FALSCH: direktes SQL aus einem anderen Modul
db.prepare("SELECT * FROM provider_connections").all();

// ✅ RICHTIG: Funktion des providers-Moduls verwenden
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Diese Regel wird bei Code-Reviews durchgesetzt — es gibt keine statische Prüfung, Verstöße werden jedoch beanstandet.

---

## Basisschema (17 Tabellen)

`core.ts` definiert die 17 Basistabellen in `SCHEMA_SQL`. Diese werden durch die Migration `001_initial_schema.sql` erstellt und bilden das Kernschema.

### Kerntabellen (in der initialen Migration erstellt)

| Tabelle                    | Zweck                                     | Schlüsselspalten                                                        |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Provider-Anmeldedaten (verschlüsselt)     | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Routing-Informationen für Provider-Knoten | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Allgemeiner KV-Speicher                   | `namespace`, `key`, `value`                                             |
| `combos`                   | Definitionen von Routing-Kombinationen    | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API-Schlüssel für das Gateway             | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Datenbankmetadaten                        | `key`, `value`                                                          |
| `usage_history`            | Datensätze zur Anfragenutzung             | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Anfrage-Payloads und Antworten            | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Protokolle von Proxy-Anfragen             | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Modell-zu-Provider-Ketten                 | `model`, `chain`                                                        |
| `domain_budgets`           | Ausgabenbudgets pro Domäne                | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Verlauf der Budgetzurücksetzungen         | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Kostenverfolgung pro Domäne               | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Ratenbegrenzungsstatus der Domäne         | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Circuit-Breaker-Status pro Domäne         | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache für LLM-Antworten                   | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historische Kontingent-Snapshots          | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Zusätzliche Tabellen (durch spätere Migrationen hinzugefügt)

Nachfolgende Migrationen fügen unter anderem folgende Tabellen hinzu:

- `cli_tool_state` (Migration 011) — Status des CLI-Tools
- `mcp_*`-Tabellen — MCP-Server-Audit
- `a2a_*`-Tabellen — A2A-Aufgabenstatus
- `usage_*`-Tabellen — Nutzungsverfolgung
- `plugin_*`-Tabellen — Plugin-System
- `skill_executions` — Ausführungsverlauf von Skills
- `memory_*`-Tabellen — Speichersystem
- `compression_*`-Tabellen — Komprimierungssystem
- `webhook_*`-Tabellen — Webhook-Zustellungsprotokoll
- `acp_*`-Tabellen — Agent Client Protocol
- `oneproxy_*`-Tabellen — 1proxy-Marktplatz
- `proxy_assignments` — Bindungen des Proxy-Gültigkeitsbereichs
- `detailed_call_artifacts` — Metadaten zu Artefakten von Aufrufprotokollen
- `quota_alert_history` — Audit von Kontingentwarnungen
- `command_code_auth_sessions` — Command Code-OAuth-Sitzungen

Die vollständige Liste mit über 30 Tabellen befindet sich in `src/lib/db/migrations/`.

---

## Migrationen

OmniRoute verwendet** versionierte, idempotente Migrationen** in `src/lib/db/migrations/`. Bei jeder Migration handelt es sich um eine einzelne SQL Datei. Es existieren zwei Benennungsformate nebeneinander. Die in `_omniroute_migrations` aufgezeichnete Version ist das numerische Präfix.

### Migrationsbenennung

| Format                                             | Beispiel                             | Verwendet für                                                                                                                                                                            |
| -------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NNN_description.sql` (genau 3 Ziffern)            | `241_seen_models.sql`                | Die alte Serie `001`–`241`. Eingefroren, als das Zeitstempelformat landete (`240` und `241` wurden unmittelbar davor zusammengeführt): Keine neue Datei erhält eine fortlaufende Nummer. |
| `YYYYMMDDHHMMSS_description.sql` (14 Ziffern, UTC) | `20261113120000_add_usage_index.sql` | Jede Migration, die ab dem 13.11.2026 erstellt wurde.                                                                                                                                    |

Warum die Änderung: Bei fortlaufenden Nummern wählte Parallel PRs dieselbe nächste Nummer und alle bis auf eine mussten vor dem Zusammenführen neu nummeriert werden. Ein UTC Zeitstempel gibt jedem PR seine eigene Version.

Regeln für das Zeitstempelformat (erzwungen von `npm run check:migration-numbering`, gemeinsam mit dem Generator in `scripts/check/lib/migrationNaming.mjs`):

- Der Zeitstempel ist ein echtes UTC Datum und eine echte ZQA-Uhrzeit, nicht früher als `20261113000000` und nicht mehr als 10 Minuten in der Zukunft.
- Die Beschreibung ist klein geschriebenes `snake_case` beginnend mit einem Buchstaben (`a-z`, `0-9`, einzelnes `_` zwischen Wörtern), maximal 80 Zeichen.
- Zwei Dateien mit demselben Zeitstempel sind ein Duplikat.
- Die No-Gap-Regel gilt nur für die alte Reihe: Jede Zahl von `001` bis `241` muss existieren, mit Ausnahme der bekannten Lücken `026`, `055` und `121`. Das Löschen von `241` (oder einer anderen alten Datei) schlägt fehl. `001` und `241` können niemals zur `KNOWN_GAPS` Zulassungsliste hinzugefügt werden. Mit Zeitstempeln versehene Dateien erzeugen niemals eine Lücke.
- Jeder Eintrag in `src/lib/db/migrations/` muss eine reguläre Datei mit einem gültigen kleingeschriebenen `.sql` -Namen sein. Ein Verzeichnis, ein symbolischer Link, eine `.SQL` oder `.sql.bak` Datei, eine versteckte Datei oder ein Name mit einem Leerzeichen scheitert am Gate, weil der Läufer es stillschweigend überspringt oder beim Booten abstürzt.

**Auftrag anwenden.** Der Runner sortiert nach dem numerischen Wert des Präfixes, nicht nach Text: zuerst die alten `001`-`241` -Dateien, dann die mit Zeitstempel versehenen Dateien in der Reihenfolge der Zeitstempel, dann alle bei `OMNIROUTE_EXTRA_MIGRATIONS_DIRS` registrierten Namespace-Verzeichnisse (Versionen wie `ee-001`). Eine ausstehende Migration ist jede Datei, deren Version sich nicht in `_omniroute_migrations` befindet. Daher gilt eine Migration von einem älteren Zweig, der nach einem neueren zusammengeführt wird, weiterhin für vorhandene Datenbanken.

**Der Zeitstempel ist die Erstellungsreihenfolge, nicht die Zusammenführungsreihenfolge.** Wenn Ihre Migration von einer Tabelle oder Spalte abhängt, die durch eine Migration mit a erstellt wurde** neuer** Wenn Sie einen Zeitstempel verwenden (z. B. einen von einem anderen PR, der zuerst zusammengeführt wurde), würde eine neue Datenbank Ihre Datenbank zuerst ausführen und fehlschlagen. Während Ihr PR noch geöffnet ist, generieren Sie den Dateinamen mit `npm run db:new-migration` neu, damit er einen neueren Zeitstempel erhält, oder machen Sie ihn unabhängig. `npm run test:migrations:fresh` wendet jede Migration auf eine leere Datenbank an und fängt dies ab.

### Eine zusammengeführte Migration wird niemals gelöscht oder umbenannt

Sobald sich eine Migrationsdatei in einem Release-Zweig oder `main` befindet, wurde sie bereits auf Homolog- und Entwicklerdatenbanken, auf VPS Installationen und in der Enterprise-Synchronisierung ausgeführt. Von da an:

- **Löschen Sie es niemals.** Bei Neuinstallationen würde das Schema verloren gehen, während bei aktualisierten Datenbanken es erhalten bleibt.
- **Benennen Sie es niemals um.** Die Version in `_omniroute_migrations` würde nicht mehr mit einer Datei übereinstimmen, sodass jede Datenbank, die sie bereits angewendet hat, sie erneut ausführen würde. Nicht idempotentes SQL dupliziert dann Daten oder stoppt den Startvorgang.
- **Benötigen Sie ein anderes Schema?** Erstellen Sie eine neue Migration mit `npm run db:new-migration`.

Das Umbenennen ist nur für eine Datei sicher, die noch nicht zusammengeführt wurde. Dies ist der Fall, auf den sich die Hinweise des Gates beziehen. Ein Release-Tag ändert hier nichts: Jeder Push an einen `release/v*` Zweig veröffentlicht das Docker `:next` Image und wird auf Homolog, VPS Installationen und der Enterprise-Synchronisierung ausgeführt, sodass eine zusammengeführte Migration auf echten Datenbanken ausgeführt wurde, bevor ein `vX.Y.Z` Tag vorhanden ist. Das Gate schlägt bei jedem Entfernen einer Basisdatei fehl, unabhängig davon, ob sie mit Tags versehen ist oder nicht.

- **Eine zusammengeführte Migration rückgängig machen.** Ein `git revert`, der die Datei löscht, scheitert am Gate. Behalten Sie die Datei und machen Sie ihr Schema in einer neuen Migration rückgängig: `npm run db:new-migration -- <description>`, mit `DROP TABLE IF EXISTS`, `DROP INDEX IF EXISTS` usw. Aktualisierte und neue Datenbanken enden dann mit demselben Schema.
- **Die akzeptierte Umbenennung: ein Kompatibilitätseintrag und identischer Inhalt.** Wenn eine zusammengeführte Datei verschoben werden muss (z. B. zwei zusammengeführte Dateien teilen sich einen Zeitstempel und der Runner stoppt mit einer Versionskollision), benennen Sie die spätere Datei um, ohne ihre SQL zu berühren, und fügen Sie `{ fromVersion, fromName, toVersion, toName }` zu `RENAMED_MIGRATION_COMPATIBILITY` in `src/lib/db/migrationRunner/constants.ts` hinzu. Bei Datenbanken, die die alte Version angewendet haben, wird die `_omniroute_migrations` Zeile verschoben, anstatt die Datei erneut auszuführen. Das Gate warnt vor einer solchen Umbenennung und führt immer die Umwandlungsprüfung durch, unabhängig vom neuen Zeitstempel: Bei Neuinstallationen wird die Datei an der neuen Position angewendet, bei aktualisierten Datenbanken nicht. Wählen Sie daher einen neuen Zeitstempel in der Nähe des alten. Das Gate schlägt bei der Umbenennung fehl, wenn sich der Inhalt geändert hat (eine Schemaänderung geht weiterhin in eine neue Migration ein) oder wenn sich die Zieldatei des Eintrags nicht auf der Festplatte befindet.
- **Benennen Sie niemals innerhalb desselben Zeitstempels um.** Eine Umbenennung, bei der der Zeitstempel erhalten bleibt und nur die Beschreibung geändert wird, schlägt mit oder ohne Eintrag fehl. Bei einem Eintrag, dessen `toVersion` gleich seinem `fromVersion` ist, löscht der Läufer die alte `_omniroute_migrations` Zeile und wendet die Datei erneut auf jede Datenbank an, in der sie bereits ausgeführt wurde. Ohne Eintrag verfolgt der Runner nur die Version: Er überspringt die Datei in diesen Datenbanken (neuer Inhalt wird dort nie ausgeführt) und protokolliert bei jedem Start einen Neunummerierungsfehler. Verwenden Sie einen anderen Zeitstempel und einen Kompatibilitätseintrag oder behalten Sie den Namen bei.
- **Das Gate prüft, ob die umbenannte Datei nicht erneut ausgeführt wird.** Bei jeder abgedeckten Umbenennung übergibt das Gate den neuen Dateinamen an die Kommutierungsprüfung mit `--must-not-apply`. Die Prüfung startet die aktualisierte Datenbank mit dem echten Läufer, und wenn der Läufer diese Datei erneut anwendet (z. B. weil der Eintrag eine falsche Version oder einen falschen Namen hat oder weil der Textparser des Gates `constants.ts` anders liest als TypeScript“), schlägt das Gate mit `migration renomeada rodaria de novo` fehl und fordert Sie auf, die alten und neuen Versionen und Namen des Eintrags zu überprüfen.

### Was das Tor gegenüber der Basis prüft

Bei Pull-Request- und Merge-Queue-Läufen vergleicht `npm run check:migration-numbering` `src/lib/db/migrations/` auf der Festplatte mit demselben Verzeichnis im Basiszweig. Die Basis ist in dieser Reihenfolge: `--base-latest-tag`, `--base <ref>`, die `MIGRATION_BASE_REF` Variable oder, wenn `GITHUB_EVENT_NAME` `pull_request`, `pull_request_target` oder `merge_group` ist, das erste übergeordnete Element des Merge-Commits, das `merge_group.base_sha` der Ereignisnutzlast oder `git merge-base HEAD origin/$GITHUB_BASE_REF`. Bei einem Pull-Request- oder Merge-Queue-Lauf ohne auflösbare Basis schlägt das Gate fehl. Außerhalb CI ohne `--base` gibt es `comparação com a base: pulada (sem --base)` aus und überspringt diese Regeln.

`--base-latest-tag` vergleicht mit dem neuesten Release-Tag (`vX.Y.Z` in halber Reihenfolge; Suffix-Tags wie Nightlies zählen nicht), das sich in der Geschichte von `HEAD` befindet, mit den gleichen Regeln wie `--base`. Release-Green (`scripts/quality/validate-release-green.mjs`) führt das Gate auf diese Weise aus, da Push- und geplante Ausführungen keine Pull-Request-Basis haben und eine Zusammenführung ohne einen neuen CI -Lauf erfolgen kann. Ohne Release-Tag im Verlauf schlägt das Gate fehl; Führen Sie `git fetch --tags` aus (in CI bringt `actions/checkout` mit `fetch-depth: 0` die Tags).

| Änderung am Pull-Request                                                                                                                      | Ergebnis                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eine auf der Basis vorhandene Datei wird mit einem `RENAMED_MIGRATION_COMPATIBILITY` Eintrag umbenannt                                        | **Warnung** wenn der Inhalt identisch ist und die Kommutierungsprüfung unabhängig vom neuen Zeitstempel ausgeführt wird; Es schlägt fehl, wenn die neue Position das endgültige Schema ändert (die Umbenennung rückgängig machen oder einen anderen neuen Zeitstempel auswählen, in den es wechselt) oder wenn der Läufer die umbenannte Datei erneut auf eine aktualisierte Datenbank anwenden würde.** Scheitert** wenn sich der Inhalt geändert hat. |
| Eine auf der Basis vorhandene Datei wird unter Beibehaltung ihres Zeitstempels umbenannt (nur die Beschreibung ändert sich).                  | **Scheitert** , mit oder ohne Eintrag: Der Läufer würde es erneut anwenden (mit dem Eintrag) oder es nach Version überspringen (ohne einen). Verwenden Sie einen anderen Zeitstempel und einen Kompatibilitätseintrag oder behalten Sie den Namen bei.                                                                                                                                                                                                  |
| Eine auf der Basis vorhandene Datei wird gelöscht oder ohne Eintrag umbenannt                                                                 | **Scheitert** , unabhängig davon, ob sich die Datei in einem Release-Tag befindet oder nicht. Um dies rückgängig zu machen, stellen Sie die Datei mit `git checkout <base> -- src/lib/db/migrations/<file>` wieder her; Um das Schema zurückzusetzen, fügen Sie eine neue Migration mit `DROP ... IF EXISTS` hinzu.                                                                                                                                     |
| Eine auf der Basis vorhandene Datei hat einen anderen Inhalt                                                                                  | **Warnung** (eine `::warning` -Anmerkung in GitHub Aktionen) und die Kommutierungsprüfung wird ausgeführt. Es schlägt fehl, wenn die Bearbeitung das endgültige Schema ändert, da aktualisierte Datenbanken die bearbeitete Datei nicht erneut anwenden: Fügen Sie die Änderung in eine neue Migration ein. Eine harmlose Bearbeitung (ein Kommentar, `IF NOT EXISTS`) warnt nur.                                                                       |
| Eine zeitgestempelte Datei wird mit einem Zeitstempel hinzugefügt, der nicht neuer als der neueste der Basis ist                              | Führt die unten beschriebene Kommutierungsprüfung durch.                                                                                                                                                                                                                                                                                                                                                                                                |
| Eine `NNN_` Datei im alten Format wird mit einer Nummer unterhalb der neuesten Datei im alten Format der Basis hinzugefügt                    | **Scheitert** , auch wenn `KNOWN_GAPS` im selben Pull-Request bearbeitet wird: Die alte Serie ist eingefroren, erstellen Sie die Migration mit `npm run db:new-migration`. Dateien im alten Format über dem neuesten der Basis (eine `release/v*` zu `main` Pull-Anfrage) werden akzeptiert.                                                                                                                                                            |
| Eine nicht in der Reihenfolge befindliche, bearbeitete oder umbenannte Datei enthält `INSERT`, `UPDATE`, `DELETE` oder `REPLACE` -Anweisungen | **Warnung** : Die Kommutierungsprüfung vergleicht keine Daten. Überprüfen Sie daher, ob die Reihenfolge, in der aktualisierte und neue Datenbanken sie anwenden, das Ergebnis ändert.                                                                                                                                                                                                                                                                   |

Ein Durchlauf der Kommutierungsprüfung umfasst die außer Betrieb befindlichen, die bearbeiteten und die umbenannten Dateien zusammen.

Die Kommutierungsprüfung (`scripts/check/migration-commutation.ts`) erstellt zwei temporäre Datenbanken mit dem tatsächlichen Installationspfad: an** aufgewertet** eine (Booten mit den Basismigrationen, dann erneutes Booten mit derselben Datei mit den Migrationen der Pull-Anfrage) und a** frisch** eins (ein Boot mit den Migrationen der Pull-Anfrage). Es vergleicht die resultierenden Schemata: Tabellen und Spalten (ohne Berücksichtigung der Spaltenreihenfolge), UNIQUE / PRIMARY KEY und FOREIGN KEY Einschränkungen, den normalisierten `CREATE TABLE` Text jeder Tabelle (der CHECK Einschränkungen, Sortierungen, generierte Spalten und Tabellenoptionen abdeckt), Indizes, Trigger und Ansichten. Zeilendaten werden nicht verglichen. Wenn sie übereinstimmen, gibt das Gate aus, dass die Datei nicht in Ordnung ist, wandelt sie jedoch um und geht weiter. Wenn sie sich unterscheiden, schlägt das Gate mit der Differenz und einem Hinweis für den Fall fehl: Für eine Datei, die nicht in der richtigen Reihenfolge ist, generieren Sie ihren Namen mit `npm run db:new-migration` neu. Dies ist sicher, da die Datei noch nicht zusammengeführt ist. Stellen Sie für eine bearbeitete Basisdatei den Basisinhalt wieder her und fügen Sie die Änderung in eine neue Migration ein. Machen Sie für eine umbenannte Datei die Umbenennung rückgängig oder wählen Sie einen anderen neuen Zeitstempel aus, in den sie wechselt, niemals denselben Zeitstempel mit einem anderen Namen. Wenn die Prüfung selbst nicht ausgeführt werden kann, schlägt das Gate in CI fehl und warnt nur lokal. Bei einer bearbeiteten Basisdatei wird die aktualisierte Datenbank mit dem Basisinhalt dieser Datei erstellt und beim zweiten Start übersprungen, da ihre Version bereits aufgezeichnet ist. Bei einer umbenannten Datei wird die aktualisierte Datenbank mit der Datei unter ihrem alten Namen erstellt und beim zweiten Start wird die `_omniroute_migrations` Zeile durch den Kompatibilitätseintrag verschoben, anstatt sie erneut auszuführen. Das Gate übergibt den neuen Namen mit `--must-not-apply`, sodass die Prüfung fehlschlägt, wenn er beim zweiten Start angewendet wird. Wenn eine Pull-Request-Migration auf dem aktualisierten Pfad fehlschlägt, d. h. nach jeder Basismigration (unabhängig davon, ob sie auch bei einer Neuinstallation fehlschlägt oder nicht), meldet das Gate `migration do PR não aplica` und fordert Sie auf, den SQL anhand des aktuellen Schemas der Basis zu korrigieren. Wenn die Datei von einer anderen Pull-Request-Migration mit einem späteren Zeitstempel abhängt, generieren Sie ihren Namen mit `npm run db:new-migration` neu.

Um denselben Vergleich lokal auszuführen, übergeben Sie die Basis explizit, zum Beispiel `npm run check:migration-numbering -- --base origin/<base-branch>` oder `npm run check:migration-numbering -- --base-latest-tag` um mit der neuesten Version zu vergleichen.

### Konvertieren einer `NNN` Migration von Open PR

Eine vor dem Switch geöffnete Pull-Anfrage enthält möglicherweise immer noch eine sequentielle Datei wie `242_add_widgets.sql`. Alte Zahlen über `241` werden abgelehnt. Konvertieren Sie sie daher vor dem Zusammenführen:

1. **Benennen Sie die Datei mit dem Generator um und behalten Sie dabei die Beschreibung bei.** Führen Sie `npm run db:new-migration -- <same description>` aus, um den neuen Namen zu erhalten, verschieben Sie SQL hinein und löschen Sie die alte `NNN_` Datei. Die Beschreibung muss identisch bleiben: Der Kompatibilitätseintrag unten stimmt darauf überein.
2. **Fügen Sie einen Kompatibilitätseintrag hinzu, wenn eine persistente Datenbank die alte Nummer ausgeführt hat.** Wenn eine Datenbank, die beibehalten wird (Homolog, ein VPS, die eigene Installation eines Mitwirkenden), einen Build des PR mit der `NNN_` Datei ausgeführt hat, fügen Sie `{ fromVersion: "<NNN>", fromName: "<description>", toVersion: "<YYYYMMDDHHMMSS>", toName: "<description>" }` zu `RENAMED_MIGRATION_COMPATIBILITY` in `src/lib/db/migrationRunner/constants.ts` hinzu. Das ist** erforderlich für `237` bis `241`** : Diese Slots enthalten jetzt die kanonischen `237_usage_history_calculated_cost.sql`, `238_codex_connection_fences.sql`, `239_call_logs_pending_detail_index.sql`, `240_provider_node_custom_json_config.sql` und `241_seen_models.sql`, und ohne den Eintrag überspringt eine solche Datenbank die kanonische Migration für immer und führt die konvertierte Migration erneut aus. Es funktioniert auch für einen Slot, der leer bleibt, z. B. `242`, wenn das Ziel ein Zeitstempel ist. Fügen Sie im Zweifelsfall den Eintrag hinzu. Wo Sie es im Array hinzufügen, spielt keine Rolle: Wenn der Zielslot eines Eintrags immer noch eine Zeile enthält, die ein anderer Eintrag wegbewegt ( `237` hält beispielsweise eine PR Zeile, während eine ältere `usage_history_calculated_cost` -Zeile darauf wartet, in `237` verschoben zu werden), lässt der Runner diesen Eintrag warten, bis der Slot frei ist. Nur ein echter Konflikt, z. B. ein Slot, der von einer Reihe ohne Eintragsbewegungen oder zwei Einträgen, die Slots tauschen, gehalten wird, stoppt den Start mit `Cannot reconcile ...`.
3. **Halten Sie die SQL idempotent** (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `INSERT OR IGNORE`), da die konvertierte Migration möglicherweise auf eine Datenbank trifft, deren Schema bereits vorhanden ist.
4. **Verschieben Sie Sonderfälle mit Versionsschlüssel.** Wenn die PR einen Fall für ihre alte Nummer in `isSchemaAlreadyApplied()` (`src/lib/db/migrationRunner.ts`) oder in `OPTIONAL_FTS5_MIGRATION_VERSIONS` (`src/lib/db/migrationRunner/constants.ts`) hinzugefügt hat, ändern Sie den Schlüssel auf den neuen Zeitstempel.

`tests/unit/db/codex-fence-migration-rename.test.ts` ist ein funktionierendes Beispiel für einen Test für eine umbenannte Migration.

### Backports zu Zweigen vor dem Wechsel

Niemals eine `YYYYMMDDHHMMSS_` -Datei auswählen oder in einen Zweig zurückportieren, der älter ist als der Wechsel (z. B. einen älteren `release/v*` Zweig). Der Runner dort sortiert Dateinamen als Text, sodass eine zeitgestempelte Datei zwischen `201_` und `202_` in einer neuen Datenbank laufen würde, und das alte Gate dort versteht keine 14-stelligen Präfixe. Schreiben Sie in einem solchen Zweig die Änderung als die nächste `NNN_` Datei dieses Zweigs, idempotent, sodass es sich um ein No-Op handelt, wenn die mit einem Zeitstempel versehene Version später eintrifft.

### Wie Migrationen ablaufen

Beim Start `migrationRunner.ts`:

1. Erstellt `_omniroute_migrations` Tabelle, falls nicht vorhanden
2. Abfragen für bereits angewendete Migrationen
3. Wendet alle neuen Migrationen der Reihe nach an, jeweils in einer Transaktion
4. Zeichnet jede durchgeführte Migration mit Zeitstempel auf

```ts
// src/lib/db/migrationRunner.ts (simplified)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Idempotenz

Migrationen müssen sein** idempotent** — sie zweimal auszuführen, sollte ein No-Op sein:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Verwenden Sie die Klauseln `IF NOT EXISTS`, `IF EXISTS` und `OR IGNORE` / `OR REPLACE` großzügig.

### Hinzufügen einer neuen Migration

1. **Erstellen Sie die Datei mit dem Generator** : `npm run db:new-migration -- <description>` (zum Beispiel `npm run db:new-migration -- add combo priority`). Es schreibt `src/lib/db/migrations/<YYYYMMDDHHMMSS>_<description>.sql` mit der aktuellen UTC Zeit und einem Kommentar-Header, geht eine Sekunde weiter, wenn dieser Zeitstempel verwendet wird, und überschreibt niemals eine Datei. Wählen Sie eine Zahl nicht von Hand aus.
2. **Verwenden Sie sicheres DDL** : `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
3. **Daten sorgfältig auffüllen** : Verwenden Sie `UPDATE ... WHERE ...`, um vorhandene Zeilen zu verarbeiten
4. **Reihenfolge und Benennung prüfen** : `npm run test:migrations:fresh` (alle Migrationen auf einer leeren Datenbank) und `npm run check:migration-numbering`
5. **Testen Sie es an einer Kopie** : Führen Sie niemals ungetestete Migrationen in der Produktion durch

Beispiel:

```sql
-- 20261113120000_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Abwärtsinkompatible Änderungen** (z. B. das Löschen von Spalten) sind schwierig. OmniRoute unterstützt NOT das Downgrade — sobald eine Migration angewendet wird, ist die Schemaänderung dauerhaft. Planen Sie entsprechend.

---

## Verschlüsselung ruhender Daten

Sensible Felder (API-Schlüssel, OAuth-Token, Verbindungszeichenfolgen) werden im Ruhezustand mit **AES-256-GCM** verschlüsselt.

### Funktionsweise

```ts
// src/lib/db/encryption.ts (vereinfacht)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Verwendungsorte

- `provider_connections.api_key` — auf Anwendungsebene verschlüsselt
- `provider_connections.access_token`, `refresh_token`, `id_token` — auf Anwendungsebene verschlüsselt
- `key_value`-Einträge mit `namespace = "secrets"` — auf Anwendungsebene verschlüsselt
- `proxy_registry.auth` — auf Anwendungsebene verschlüsselt (falls vorhanden)

### Verschlüsselungsschlüssel

Der Verschlüsselungsschlüssel wird aus einer **Passphrase** (festgelegt über die Umgebungsvariable `STORAGE_ENCRYPTION_KEY`) und einem **Salt** (in der Datenbank gespeichert) abgeleitet. Beide sind erforderlich, um Daten zu entschlüsseln.

```bash
# Eine sichere Passphrase generieren
openssl rand -hex 32

# In .env festlegen
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritisch**: Der Verlust des Verschlüsselungsschlüssels bedeutet, dass der Zugriff auf alle verschlüsselten Daten verloren geht. **Sichern Sie den Schlüssel getrennt von der Datenbank**.

### Nicht verschlüsselte Daten

Aus Leistungsgründen werden folgende Daten im Klartext gespeichert:

- Anzeigenamen der Anbieter
- Modelldefinitionen (bereits öffentlich)
- Routingregeln
- Nutzungsdatensätze (keine personenbezogenen Daten)

---

## Hinweise zur Verschlüsselung (v3.8.16+)

OmniRoute verwendet **`migrateLegacyEncryptedString()`**, um zwei Verschlüsselungsverfahren transparent zu handhaben:

- **Legacy** (vor v3.5.0): XOR-basierte „Verschlüsselung“ (keine echte Kryptografie)
- **Aktuell**: AES-256-GCM mit korrektem IV und Authentifizierungs-Tag

Die Migrationshilfsfunktion erkennt das Legacy-Format und verschlüsselt die Daten beim ersten Lesen mit dem neuen Verfahren erneut. Das bedeutet, dass Sie eine alte Datenbank aktualisieren können, ohne Zugangsdaten zu verlieren.

---

## Lese-Cache

Für häufig gelesene Daten (Modelle, Anbieter, Einstellungen) stellt `readCache.ts` einen **In-Memory-Cache** bereit:

```ts
// Beim Start zwischengespeichert, beim Schreiben invalidiert
const providers = await getCachedProviders(); // Schnell, im Arbeitsspeicher
const fresh = await listProviders(); // Langsam, greift auf die DB zu
```

| Zwischengespeicherte Entität | Cache-Schlüssel | TTL                    |
| ---------------------------- | --------------- | ---------------------- |
| `models`                     | `models:v1`     | Bis zum Schreibvorgang |
| `provider_connections`       | `providers:v1`  | Bis zum Schreibvorgang |
| `settings`                   | `settings:v1`   | Bis zum Schreibvorgang |
| `combos`                     | `combos:v1`     | Bis zum Schreibvorgang |

Der Cache wird bei jedem Schreibvorgang in die entsprechende Tabelle invalidiert.

---

## Sicherung und Wiederherstellung

### Manuelle Sicherung

```bash
# CLI verwenden, um eine lokale Sicherung zu erstellen
omniroute backup create --name pre-migration

# Oder über die API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Die Sicherungsdatei enthält:

- Alle DB-Tabellen (als JSON serialisiert)
- Aufrufprotokoll-Artefakte (Base64-kodiert, optional)
- Einstellungen + Geheimnisse (verschlüsselt)
- Plugin-Konfiguration

### Wiederherstellung

```bash
# Über die CLI
omniroute restore pre-migration

# Über die API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Warnung**: Die Wiederherstellung überschreibt die gesamte DB. Stoppen Sie zuerst alle Clients.

### Automatisierte Sicherungen

```bash
# Automatisierte tägliche Sicherungen über die CLI aktivieren
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Der Zeitplan wird serverseitig durch einen Hintergrundjob ausgeführt, der standardmäßig alle 30 Sekunden
aktiv wird und den Cron-Ausdruck anhand der lokalen Serverzeit auswertet.

| Variable                                    | Standardwert | Beschreibung                                                                                                         |
| ------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`      | Intervall in ms (min. `5000`). Muss kürzer als 60 s sein, damit die passende Cron-Minute zuverlässig getroffen wird. |

### SQLite-Hot-Backup

Für eine Sicherung einer laufenden DB ohne Ausfallzeit:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Hierbei wird die Online-Backup-API von SQLite verwendet — die Ausführung ist sicher, während OmniRoute läuft.

---

## Leistungsoptimierung

### WAL -Modus

WAL ist standardmäßig aktiviert. Berücksichtigen Sie bei Workloads mit hohem Schreibaufwand Folgendes:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
```

OmniRoute setzt `journal_size_limit` nicht. Ein Prüfpunkt verschiebt WAL Frames in die Hauptdatei, aber die WAL Datei behält ihre größte zugewiesene Größe. Der `OMNIROUTE_WAL_GUARD_MAX_MB` Guard warnt nur und führt `wal_checkpoint(RESTART)` aus; Es handelt sich nicht um eine Begrenzung der Festplattengröße.

### Indizes

Wichtige Leistungsindizes (automatisch erstellt durch Migrationen):

- `idx_models_provider` — -Modellsuche nach Anbieter
- `idx_combo_targets_combo_id` — Combo-Zielerweiterung
- `idx_usage_history_api_key_timestamp` — Nutzungsanalyse
- `idx_quota_snapshots_api_key_window` — Quotenverfolgung
- `idx_call_logs_timestamp` — Anrufprotokollabfragen

Um einen neuen Index hinzuzufügen, erstellen Sie eine Migration:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Speicherabgebildetes I/O

Für sehr große Datenbanken (> 10 GB) kann die Speicherzuordnung über SQLite Pragma angepasst werden:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Verdichtung

Lang laufende OmniRoute Instanzen profitieren von gelegentlichem `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Monatlich in verkehrsarmen Zeitfenstern ausführen. (WAL Modus reduziert den Bedarf, beseitigt ihn jedoch nicht.)

---

## Integritätsprüfung

`src/lib/db/healthCheck.ts` stellt **Integritätsdiagnosen auf Datenbankebene** bereit:

Beide HTTP-Methoden erfordern eine Authentifizierung (andernfalls `401`). `GET` führt nur eine Diagnose durch; `POST` führt dieselbe Prüfung mit aktiviertem `autoRepair` aus.

```bash
GET  /api/db/health   # diagnostizieren
POST /api/db/health   # diagnostizieren + reparieren
```

Die Antwort ist das von `runDbHealthCheck()` erzeugte `DbHealthCheckResult`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domänenbudgets verwiesen auf API-Schlüssel, die nicht mehr existieren.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Feld              | Bedeutung                                                                                                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true`, wenn `issues` leer ist. `driver` hat niemals Einfluss darauf.                                                                                                                    |
| `issues[].type`   | Einer der Werte `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                         |
| `repairedCount`   | Während dieses Durchlaufs reparierte Zeilen; immer `0`, wenn `autoRepair` den Wert false hat.                                                                                            |
| `backupCreated`   | Gibt an, ob vor der Reparatur eine Sicherung erstellt wurde.                                                                                                                             |
| `checkedAt`       | ISO-Zeitstempel, der für den Durchlauf und jeden dabei geschriebenen Reparaturhinweis identisch ist.                                                                                     |
| `driver.name`     | SQLite-Treiber, der die geprüfte Datenbank bereitstellt.                                                                                                                                 |
| `driver.degraded` | `true`, wenn Schreibvorgänge nicht dauerhaft durch die Datenbankdatei gesichert werden — beim WASM-Fallback `sql.js` (Persistenz der gesamten Datei) oder bei einer In-Memory-Datenbank. |

Dieselbe Nutzlast wird vom MCP-Tool `omniroute_db_health_check` zurückgegeben.

Führen Sie `PRAGMA integrity_check` aus, um Beschädigungen zu erkennen:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Sollte Folgendes ausgeben: ok
```

Wenn etwas anderes als `ok` zurückgegeben wird, **beenden Sie die Verwendung der Datenbank sofort** und stellen Sie sie aus einer Sicherung wieder her.

---

## Notfallwiederherstellung

### Szenario 1: WAL-Datei verloren

Die `-wal`-Datei fehlt, aber `-shm` und die Hauptdatenbank sind intakt:

```bash
# Wird beim nächsten Öffnen automatisch wiederhergestellt
omniroute
```

Falls SQLite keine automatische Wiederherstellung durchführen kann:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Szenario 2: Hauptdatenbankdatei beschädigt

Aus einer Sicherung wiederherstellen:

```bash
omniroute backup restore <backup-id>
```

`omniroute sync pull [outPath]` lädt lediglich ein vollständiges `.tar.gz`-Archiv von einem laufenden Server herunter
(`GET /api/db-backups/exportAll`, Anmeldedaten eines Operators erforderlich); es stellt nichts wieder her.

### Szenario 3: Verschlüsselungsschlüssel verloren

Ohne den Schlüssel ist **keine Wiederherstellung möglich**. Die verschlüsselten Felder sind nicht lesbar. Fügen Sie alle Anbieter manuell mit neuen Anmeldedaten erneut hinzu.

> **Vorbeugung**: Sichern Sie den Verschlüsselungsschlüssel immer separat, idealerweise in einem Passwortmanager oder KMS.

### Szenario 4: Datenträger voll

SQLite gibt `SQLITE_FULL`-Fehler zurück. Geben Sie Speicherplatz frei und führen Sie anschließend Folgendes aus:

```bash
# WAL-Prüfpunkt erstellen, um Speicherplatz freizugeben
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Häufige Vorgänge

### Eine Tabelle untersuchen

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Zeilen in allen Tabellen zählen

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Alle Daten zurücksetzen (löschen)

```bash
# Zuerst OmniRoute beenden
omniroute stop

# Datenbankdatei löschen
rm ~/.omniroute/storage.sqlite*

# Neu starten (erstellt eine leere Datenbank)
omniroute
```

Für ein **selektives** Zurücksetzen (Anbieter beibehalten, Nutzungsdaten löschen):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Einzelne Tabelle exportieren

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Fehlerbehebung

### "Datenbank ist gesperrt"

Ein anderer Prozess hält eine Schreibsperre. Sie können:

- Warten, bis der andere Prozess abgeschlossen ist (mit `lsof | grep storage.sqlite` prüfen)
- Den anderen Prozess beenden
- OmniRoute neu starten, falls das Problem weiterhin besteht

### "Fremdschlüsselbedingung fehlgeschlagen"

Ein Domänenmodul verletzt die referenzielle Integrität. Prüfen Sie Folgendes:

- Verwaiste Zeilen in abhängigen Tabellen
- Kaskadierende Löschvorgänge, die nicht weitergegeben wurden
- Eine kürzlich durchgeführte Migration, die einen Fremdschlüssel geändert hat

Führen Sie `PRAGMA foreign_key_check;` aus, um Verletzungen zu finden.

### "Nicht genügend Arbeitsspeicher"

Die speicherabgebildete Ein-/Ausgabe von SQLite überschreitet das Betriebssystemlimit. Reduzieren Sie sie über ein SQLite-Pragma:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB anstelle von 256MB
```

Oder deaktivieren Sie sie:

```sql
PRAGMA mmap_size = 0;
```

### "Migration während der Ausführung fehlgeschlagen"

Die Migration wurde innerhalb einer Transaktion ausgeführt und sollte daher zurückgesetzt worden sein. Falls nicht:

1. **OmniRoute beenden** (weitere Versuche verhindern)
2. **Datenbankstatus prüfen** mit `sqlite3`
3. **Unvollständige Migration manuell korrigieren**
4. **OmniRoute erneut ausführen** (die Migration wird erneut versucht)

Um dies zu vermeiden, testen Sie Migrationen immer zuerst an einer Kopie.

---

## Siehe auch

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — Nutzungstabellen
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — Systemzustandsüberwachung
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — Veröffentlichungsablauf
- Quelle: `src/lib/db/` (mehr als 80 Dateien, ca. 25.000 Codezeilen)
