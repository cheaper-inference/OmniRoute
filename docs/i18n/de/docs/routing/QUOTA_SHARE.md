# Quota Sharing Engine (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Dokumentreferenz**: `docs/routing/QUOTA_SHARE.md`
> Teil von Gruppe B (Pläne 16 + 22).

---

## Überblick

Die Quota-Sharing-Engine verteilt das zeitbasierte Kontingent eines Anbieters (z. B. Codex-
5-Stunden-Fenster, Kimi 1500 Anfragen/h) fair auf mehrere API-Schlüssel, die dieselbe
Verbindung verwenden.

**Gelöstes Problem:** OmniRoute leitet viele API-Schlüssel über dasselbe Konto beim
Upstream-Anbieter weiter. Ohne Freigabelogik kann eine Lastspitze von Schlüssel A das
Anbieterkontingent für die Stunde ausschöpfen, sodass die Schlüssel B und C blockiert
bleiben, bis das Fenster zurückgesetzt wird. Die Engine verhindert dies durch:

1. Nachverfolgung des rollierenden Verbrauchs jedes Schlüssels pro Dimension (%, Anfragen, Token, $).
2. Anwendung eines arbeitserhaltenden Fair-Share-Algorithmus: Ein Schlüssel darf ungenutzte
   Anteile verwenden, solange der globale Pool nicht ausgelastet ist.
3. Durchsetzung des Ergebnisses im kritischen Pfad (`chatCore.ts`), bevor die Anfrage
   den Upstream-Executor erreicht.

---

## Algorithmus: Fair-Share Work-Conserving

In `src/lib/quota/fairShare.ts` implementiert.

### Modi

| Zustand                                    | Modus         | Verhalten                                                                                           |
| ------------------------------------------ | ------------- | --------------------------------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Großzügig** | Der Schlüssel kann bis zum globalen Limit abzüglich der verbrauchten Gesamtsumme ausgeliehen werden |
| `globalUsedPercent >= saturationThreshold` | **Strikt**    | Setzen Sie den individuellen fairen Anteil strikt durch                                             |

Standard- `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

### Entscheidung pro Dimension

Für jede aktive Dimension im Pool berechnet die Engine Folgendes:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = current rolling value for this key (from QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Dann:

- **`policy = hard`** : wenn `consumed > fairShareAllowed` und Modus strikt → sind** Block** .
- **`policy = soft`** : wenn `consumed > fairShareAllowed` und Modus strikt → sind** bestrafen** (in Kombinationen herabsetzen; niemals hart blockieren).
- **`policy = burst`** : Zulassen, solange globaler Spielraum vorhanden ist, unabhängig vom fairen Anteil.

### Cap absolut

`capValue` + `capUnit` für eine Zuteilung ist eine feste Obergrenze, unabhängig von Modus oder Richtlinie. Jede Dimension, in der immer `consumed >= capValue`** Blöcke** die Anfrage.

### Mehrdimensionale Prüfung

Eine Anfrage wird blockiert, wenn** beliebig** Dimension im Pool würde es blockieren. Die Dimensionen sind unabhängig — eine 5-Stunden-%-Erschöpfung keinen Einfluss auf die wöchentliche %-Dimension hat.

### Ausleihen

Im großzügigen Modus kann ein Schlüssel, dessen Zuteilung nicht ausreichend genutzt wird, Überschüsse aus den nicht zugewiesenen Anteilen anderer Schlüssel verwenden. Die Formel lautet:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

wo `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Das globale Teto (Pool `limit` für diese Dimension) ist immer die harte Obergrenze.

---

## Zähler mit gleitendem Fenster

Implementiert in `src/lib/quota/sqliteQuotaStore.ts` und `redisQuotaStore.ts`.

Zwei Buckets pro `(apiKeyId, dimensionKey)`:

- `curr`: aktueller Bucket (`floor(nowMs / windowMs)`)
- `prev`: vorheriger Bucket (`curr - 1`)

Effektiver rollierender Wert:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Genauigkeit**: ca. 99 %. Der Fehler beträgt an der Grenze zwischen Buckets höchstens 1 % der
Fenstergröße (bedingt durch die 2-Bucket-Approximation).

### Nebenläufigkeit

SQLite-Treiber: Ein In-Memory-Mutex pro Schlüssel `(apiKeyId | dimensionKey)` verhindert den
Read-Modify-Write-Wettlauf. Das Muster entspricht dem Anti-Thundering-Herd-Ansatz aus `src/sse/services/auth.ts`.

Redis-Treiber: Lua-EVAL-Skript für atomare Inkrementierung — wird als einzelner Redis-Befehl ausgeführt.

---

## Treiber

### SQLite (Standard, ohne Installation)

- Tabelle: `quota_consumption` (siehe Migration `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Am besten für Bereitstellungen mit einer einzelnen Instanz geeignet.
- Die gesamte Persistenz erfolgt in der bestehenden OmniRoute-SQLite-DB (`DATA_DIR/storage.sqlite`).

### Redis (optional, mehrere Instanzen)

- Erfordert das npm-Paket `ioredis`.
- Zähler werden in Redis gespeichert; Metadaten (Pools/Zuweisungen) verbleiben in SQLite.
- Am besten für Bereitstellungen mit mehreren Replikaten geeignet, bei denen Zähler gemeinsam genutzt werden müssen.

### Wechseln des Treibers

Über die Einstellungsoberfläche (`/dashboard/settings` → Quota-Speicher) oder über Umgebungsvariablen:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Die DB-Einstellung hat Vorrang vor der Umgebungsvariable. Wenn `driver=redis` festgelegt ist, aber die URL fehlt oder
`ioredis` nicht installiert ist, greift die Factory auf SQLite zurück und protokolliert eine Warnung.

Reihenfolge der Treiberauswahl:

1. DB-Einstellung `quotaStore.driver`
2. Umgebungsvariable `QUOTA_STORE_DRIVER`
3. Standard: `sqlite`

---

## Mehrere Dimensionen

Ein Pool kann mehrere Dimensionen haben. Jede Dimension ist unabhängig:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // globale Pool-Obergrenze für diese Dimension
}
```

**Beispiel: Codex-Tarif** (5h% + wöchentlich%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Eine Anfrage muss alle Dimensionen erfüllen, um zugelassen zu werden.

---

## Tarifauflösung

Implementiert in `src/lib/quota/planResolver.ts`.

Priorität (von der höchsten zur niedrigsten):

1. **Manuelle DB-Überschreibung** — Tabelle `provider_plans`, pro `connectionId`.
2. **Bekannter Katalog** — `src/lib/quota/planRegistry.ts` (nur Daten).
3. **Leerer Tarif** — keine Dimensionen, manuelle Konfiguration erforderlich.

### Bekannter Katalog

| Anbieter              | Dimensionen                                                   |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, unbekannt), `tokens/weekly`             |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Kein Standard — manuelle Konfiguration erforderlich           |

---

## Pipeline-Integration

### PRE Haken (`open-sse/handlers/chatCore.ts`)

Wird vor dem Upstream-Executor nach Authentifizierungs- und Richtlinienprüfungen ausgeführt:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() per dimension
      → fairShare.decideFairShare()
      → if block → return 429 (buildErrorBody, Hard Rule #12)
      → if allow + deprioritize → set quotaSoftPenalty=true on candidate
  → executor.execute()
```

**Fail-open** : Wenn `enforceQuotaShare` einen Fehler auslöst, wird die Anfrage mit einem `pino.warn` Protokoll durchgelassen. Dadurch wird verhindert, dass ein Kontingent-Engine-Fehler den gesamten Datenverkehr blockiert.

### POST -Hook (Rekordverbrauch)

Nach erfolgreicher Antwort:

```
executor returns success
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() per dimension
      → fail-open: errors logged as pino.warn, never propagated to client
```

**Driftnotiz** : Wenn `consume` nach der Antwort fehlschlägt, zählt der fortlaufende Zähler zu wenig. Das Sättigungssignal vom Anbieter (z. B. `anthropic-ratelimit-unified-5h-utilization`) korrigiert die globale Schätzung bei der nächsten Anfrage.

### Kombinierte weiche Strafe (`open-sse/services/combo.ts`)

Wenn `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // default 0.7
}
```

Die Strafe wird nach allen anderen Wertungsfaktoren verhängt. Es verringert die Wahrscheinlichkeit der automatischen Kombination, einen gesättigten Schlüssel auszuwählen, ohne ihn hart zu blockieren.

---

## UI-Rundgang

### `/dashboard/costs/quota-share` — Hauptseite der Pools

Komponenten (alle in `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponente             | Zweck                                                                           |
| ---------------------- | ------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Einführungskarte, die neuen Benutzern die gemeinsame Quotennutzung erklärt      |
| `CreatePoolModal`      | Erstellt einen neuen Quoten-Pool (Verbindung + Name + anfängliche Zuweisungen)  |
| `PoolCard`             | Zusammenfassung pro Pool: Name, Verbindung, Anzahl der Zuweisungen              |
| `DimensionBar`         | Gestapelter Balken pro Dimension: Anteil jedes Schlüssels + globale Nutzung     |
| `AllocationTable`      | Tabelle mit Verbrauch, fairem Anteil, Defizit/Überschuss und Ausleihkennzeichen |
| `BurnRateChart`        | Liniendiagramm der EMA-Verbrauchsrate (Recharts verzögert über `dynamic()`)     |
| `EditAllocationsModal` | Bearbeitet Zuweisungsgewichtungen, Obergrenzen und Richtlinien eines Pools      |

Die Hooks der Seite:

- `usePools` — ruft alle 30 Sekunden `GET /api/quota/pools` ab.
- `usePoolUsage` — ruft bei Bedarf `GET /api/quota/pools/[id]/usage` ab.
- `useLocalStoragePoolMigration` — wird beim Einbinden einmal ausgeführt, um veraltete LS-Daten zu migrieren.

### `/dashboard/costs/quota-share/plans` — Konfiguration des Anbieterplans

- `ProviderPlanConfigClient.tsx`: Dropdown-Menü zur Auswahl eines Anbieters, zur Anzeige des aufgelösten
  Plans (automatisch aus dem Katalog oder manuell überschrieben) und zur Bearbeitung von Dimensionen.
- Änderungen werden über `PUT /api/quota/plans/[connectionId]` gespeichert.
- Durch Löschen wird auf den Katalog oder einen leeren Plan zurückgesetzt.

---

## Umgebungsvariablen

| Variable                           | Standard | Beschreibung                                            |
| ---------------------------------- | -------- | ------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite` | Zu verwendender Treiber: `sqlite` oder `redis`          |
| `QUOTA_STORE_REDIS_URL`            | _(leer)_ | Redis URL, z. B. `redis://localhost:6379`               |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`    | 0..1; `>= threshold` aktiviert den strikten Modus       |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`    | 0..1; Multiplikator für den Soft-Policy-Combo-Score     |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`     | Tage bevor GC alte `quota_consumption` Buckets entfernt |

DB Einstellungen (`quotaStore.*`) überschreiben Env-Variablen.

---

## Fehlerbehebung

### Redis ist konfiguriert, stellt aber keine Verbindung her

Prüfen Sie, ob `ioredis` installiert ist (`npm ls ioredis`) und ob
`QUOTA_STORE_REDIS_URL` erreichbar ist. Bei einem Verbindungsfehler greift die Factory auf SQLite zurück (protokolliert auf
`warn`-Ebene).

### `peek` gibt veraltete Daten zurück / Fail-Open

Wenn `peek` eine Ausnahme auslöst, behandelt `enforceQuotaShare` das Ergebnis als „zulassen“ (Fail-Open).
Prüfen Sie die `pino`-Protokolle auf Einträge zu `quota:enforce` und `quota:factory`, um
die Ursache zu ermitteln.

### Abweichung des Verbrauchszählers

Wenn die tatsächliche Anbieternutzung von den Zählern abweicht, ist dies zu erwarten — das
gleitende 2-Bucket-Fenster weist an den Fenstergrenzen einen Fehler von etwa 1 % auf, und `consume` wird
nach der Antwort ohne Warten auf den Abschluss ausgeführt. Das Sättigungssignal (`saturationSignals.ts`)
liest die tatsächliche Anbieterauslastung mit einer TTL von 30 Sekunden und passt `globalUsedPercent`
entsprechend an.

### Pool zeigt „keine Daten“ für die Verbrauchsrate

`computeBurnRate` benötigt mindestens 2 historische Stichproben. Neue Pools ohne vorherige
`consume`-Aufrufe zeigen `tokensPerSecond: 0` und `timeToExhaustionMs: null` an.

---

## Migration von localStorage

Beim ersten Laden von `/dashboard/costs/quota-share` prüft der Hook `useLocalStoragePoolMigration`:

1. `localStorage.getItem("omniroute:quota-share:pools")` ist nicht leer.
2. `GET /api/quota/pools` gibt `[]` zurück (die DB ist leer).

Wenn beide Bedingungen erfüllt sind, sendet er jeden Legacy-Pool gesammelt an `POST /api/quota/pools` und entfernt anschließend den localStorage-Schlüssel. Die Migration ist idempotent: Bedingung 2 verhindert eine erneute Migration.

---

## Interne Strategieklassifizierung

`quota-share` ist eine **ausschließlich interne** Routing-Strategie (`INTERNAL_ROUTING_STRATEGY_VALUES` in `src/shared/constants/routingStrategies.ts`). Sie wird ausschließlich von systemseitig erstellten `qtSd/`-Pool-Kombinationen verwendet und bewusst aus `ROUTING_STRATEGY_VALUES` ausgeschlossen, sodass sie weder in der Benutzeroberfläche noch in der API als vom Benutzer auswählbare Option erscheint.

---

## Testabdeckung

Die Quota-Share-Engine wird mit zwei Ebenen automatisierter Tests ausgeliefert:

| Suite                 | Befehl                                                                 | Abgedeckte Bereiche                                                                                                                                                                                                             |
| :-------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Unit-Tests (29 Tests) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR-Scheduler, Sättigungssteuerung, Nebenläufigkeitsgrenzen, fairShare-Berechnung, Einreihung in die Rückstauwarteschlange                                                                                                      |
| Integrationsmatrix    | `npm run test:combo:matrix`                                            | Durchgängige Routing-Entscheidung über die reale Kombinationspipeline; DRR-Fairness und Herabpriorisierung bei Sättigung über Live-Schnittstellen (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Die Integrationsmatrix wird in der CI zusammen mit allen 19 öffentlichen Strategien ausgeführt. Die Unit-Test-Suite kann eigenständig ausgeführt werden.

---

## Zusammenfassung des DB-Schemas

Drei durch die Migrationen `078`, `079` und `085` hinzugefügte Tabellen:

- `quota_pools` + `quota_allocations` — Pool-Definitionen und Zuweisungen pro Schlüssel.
- `quota_consumption` — rollierende Zähler mit 2 Buckets pro `(apiKeyId, dimensionKey)`.
- `provider_plans` — manuelle Überschreibungen von Anbieterplänen (Dimensionen als JSON pro connectionId).

Alle Tabellen werden über idempotente `CREATE TABLE IF NOT EXISTS`-Migrationen hinzugefügt.
