# REASONING_REPLAY (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Quelle der Wahrheit:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Letzte Aktualisierung:** 28.06.2026 — v3.8.40

OmniRoute erfasst den von Denkmodusmodellen erzeugten Assistenten- `reasoning_content` und gibt ihn transparent bei Multiturn-Anfragen wieder, wenn der Upstream-Anbieter dies benötigt. Dies eliminiert die HTTP 400-Fehler, die strenge Anbieter auslösen, wenn im Gesprächsverlauf eines Kunden die Argumentation des vorherigen Zugs fehlt.

## Warum das existiert

Mehrere Denkmodus-Anbieter lehnen einen Folgezug ab, es sei denn, der** Die vorherige Assistentennachricht enthält die ursprüngliche `reasoning_content`** . Der Upstream gibt 400 mit Nachrichten wie den folgenden zurück:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Aber typische Clients (Cursor, Cline, Roo Code, OpenAI SDK) entfernen `reasoning_content` aus dem Verlauf, den sie wiedergeben. OmniRoute stellt es aus einem serverseitigen Cache wieder her, sodass die Anfrage, die der Upstream sieht, konsistent ist. Problem Nr. #1628 führte die Hybrid memory/SQLite -Persistenz ein, sodass der Cache Prozessneustarts überlebt.

## Architektur

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), keyed by every tool_call.id
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(toolCalls[0].id) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

Die Erfassung erfolgt in `open-sse/handlers/chatCore.ts` (zwei Standorte, an den beiden `cacheReasoningFromAssistantMessage` -Aufrufstandorten). Die Wiedergabe erfolgt in `open-sse/translator/index.ts` nach der Schemaerzwingung, aber vor dem Versand.

Einfache Assistentenrunden (ohne Werkzeugaufruf) werden unterschiedlich verschlüsselt: `buildAssistantMessageCacheKey()` verarbeitet den Sitzungsbereich plus das normalisierte OpenAI-Format-Transkript bis zu dieser Runde, da DeepSeek die Begründung _jeder_ vorherigen Runde erfordert, sobald `tools` vorhanden ist. Bei Responses-API-Zielen (z. B. `opencode-go/deepseek-v4-flash`, weitergeleitet an `/responses`) trägt der Upstream-Body `input` und nicht `messages`, sodass `translateRequest()` (`open-sse/translator/index.ts`) das Pivot-Transkript meldet, das es über eine Callback-Option verarbeitet hat, und die Capture-Sites dasselbe Transkript verarbeiten. Der Antwort-Wiedergabedurchlauf wird für jedes Quellformat auf dem OpenAI Pivot ausgeführt, sodass auch Anthropic -Nachrichten-Clients (Claude → OpenAI → -Antworten) wiedergegeben werden.

## Speicher — Hybridspeicher + SQLite

Der Hot Path verwendet einen In-Memory- `Map` (LRU-by-Creation), der von einer SQLite Tabelle unterstützt wird, um die Wiederherstellung nach einem Absturz und die Dashboard-Sichtbarkeit zu gewährleisten.

| Schicht    | Durchführung                                   | Zweck                                                              |
| ---------- | ---------------------------------------------- | ------------------------------------------------------------------ |
| Erinnerung | `Map` in `open-sse/services/reasoningCache.ts` | Schnelle Suche, entfernt die ältesten Personen mit 200             |
| DB         | `reasoning_cache` Tabelle (`src/lib/db/`)      | Bleibt über Neustarts hinweg bestehen und steigert die Statistiken |

Schreibvorgänge gehen an beide. Lesevorgänge konsultieren zuerst den Speicher und greifen dann auf DB zurück (DB Treffer werden zurück in den Speicher verschoben). DB Fehler sind nicht schwerwiegend, — der In-Memory-Cache weiterhin den Hot Path bedient.

**Standardeinstellungen:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maximale Speichereinträge: `200` (`MAX_MEMORY_ENTRIES`)
- Räumung: Älteste `createdAt` zuerst

## Datenbankschema

Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Indizes: `expires_at`, `provider`, `model`, `created_at`. `expires_at` wird als Unix-Epochensekunden gespeichert; Die SELECT Ebene normalisiert alte Textwerte über `EXPIRES_AT_EPOCH_SQL`.

## Anbieter-/Modellerkennung

Die Wiedergabe ist aktiviert, wenn `requiresReasoningReplay(provider, model)` `true` zurückgibt. Die Funktion prüft zwei Listen in `open-sse/services/reasoningCache.ts`.

**Anbieter IDs (genaue Übereinstimmung, Groß- und Kleinschreibung wird ignoriert):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Modellieren Sie Regex-Muster (ohne Berücksichtigung der Groß-/Kleinschreibung):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` und `/deepseek[-/]?v4[-.]pro/i` (V4 Flash/Pro, optionales `-free` Suffix)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Das Hinzufügen eines neuen strikten provider/model bedeutet, dass man es an eine dieser Listen anhängt und einen Unit-Test schreibt, der die Replay-Injection bestätigt. Die PR -Beschreibung sollte die genaue Upstream-400-Zeichenfolge angeben, die die Änderung motiviert hat.

## REST API

Der Cache macht zwei Endpunkte unter `src/app/api/cache/reasoning/route.ts` verfügbar. Beide erfordern eine Managementauthentifizierung (`isAuthenticated` von `@/shared/utils/apiAuth`).

| Verfahren | Endpunkt                                                  | Beschreibung                                                                   |
| --------- | --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| GET       | `/api/cache/reasoning`                                    | Statistiken + paginierte Einträge                                              |
| GET       | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Gefilterte Auflistung (`limit` auf `[1, 200]` geklemmt)                        |
| DELETE    | `/api/cache/reasoning`                                    | Löschen Sie alles (Speicher + DB) und setzen Sie die hit/miss Zählungen zurück |
| DELETE    | `/api/cache/reasoning?provider=deepseek`                  | Nur Einträge für einen Anbieter löschen                                        |
| DELETE    | `/api/cache/reasoning?toolCallId=call_abc`                | Einen einzelnen Eintrag löschen                                                |

**GET -Antwortform:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Betriebshinweise

- **Bereinigung:** `cleanupReasoningCache()` löscht abgelaufene Speichereinträge und führt `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` aus. Das rufen Mitarbeiter von Gesundheitskontrollen regelmäßig an.
- **Wiederherstellung nach einem Absturz:** Nach einem Neustart ist der Speicher leer, aber die DB enthält noch nicht abgelaufene Einträge. Die erste Suche nach einem bestimmten `tool_call_id` ist ein DB Treffer; Nachfolgende Suchvorgänge sind Speichertreffer.
- **Keine Begründung, kein Cache:** `cacheReasoningFromAssistantMessage` gibt `0` zurück, wenn die Assistentennachricht kein `reasoning_content` / `reasoning` Feld enthält, sodass unüberlegte Antworten nichts kosten.
- **Auch das Schreiben ist gesperrt:** Beide Aufrufseiten in `chatCore.ts` (Nicht-Streaming und Streaming) rufen `cacheReasoningFromAssistantMessage()` nur auf, wenn `requiresReasoningReplay(provider, model)` `true` — dasselbe Prädikat ist, das die Leseseite prüft. Installationen, die niemals einen Replay-Anbieter berühren, zahlen nicht mehr für das Schreiben, die Indexaktualisierung und die try/catch für jede begründungstragende Antwort.
- **Nicht-strikte Anbieter:** Wenn `requiresReasoningReplay` `false` ist und das Zielformat OpenAI ist, ist der Übersetzer** Streifen** Jedes `reasoning_content` Feld aus ausgehenden Nachrichten — OpenAI Chat Completions akzeptiert es nicht.

## Muse Opaque-Reasoning Ownership

Muse (`muse-code`) gibt an den Anrufer gebundene undurchsichtige Argumentation (`encrypted_content`) zurück. Die Wiedergabe unter einem anderen Konto oder mit neu erstellten Anmeldeinformationen schlägt im Upstream fehl, daher verwenden native OAuth Anfragen den Besitz auf Sitzungsebene anstelle der Rotation pro Anfrage (`src/sse/services/museSessionOwnership.ts`, erzwungen in `src/sse/handlers/chat.ts`). Explizit ausgewählte API-Schlüsselverbindungen und reine API-Schlüsselkonfigurationen behalten ihr vorhandenes Routing ohne diesen Besitzmodus.

- Stellen Sie bei jeder Runde eine stabile Sitzung ID bereit: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` oder `x-codex-session-id`; Alternativ können Sie `prompt_cache_key`, `session_id`, `conversation_id` oder `metadata.session_id` im Textkörper verwenden (in dieser Reihenfolge). Fehlende oder leere IDs -Rückgabe 400, wenn zwei oder mehr native OAuth Konten aktiv sind; Mit einem einzelnen OAuth -Konto gibt es nichts, zu dem rotiert werden kann, sodass bei einer solchen Anfrage das Routing nicht fixiert bleibt. Der Geltungsbereich umfasst den OmniRoute -API-Schlüssel ID des Aufrufers.
- Neue unabhängige Sitzungen im Round-Robin-Verfahren über aktive native OAuth Konten, die durch die API-Schlüssel-Verbindungsrichtlinie zulässig sind, sortiert nach Verbindung ID. Round-Robin überspringt Konten in der Verbindungsabklingzeit, mit einem Terminalstatus (`banned`, `expired`, `credits_exhausted`) oder modellgesperrt für das angeforderte Modell; Muse-Upstream-Ausfälle zeichnen wie andere Anbieter die Abklingzeit und den Breaker-Status auf. Eine explizit erzwungene Verbindung umgeht Round-Robin für eine neue Sitzung, kann jedoch einen vorhandenen Besitzer nicht überschreiben.
- Bis der Besitzer eine erfolgreiche Antwort liefert, wird eine Sitzung, deren Besitzer nicht mehr verfügbar ist, auf ein fehlerfreies Konto zurückgefordert. Nach der ersten erfolgreichen Antwort bleibt die Sitzung an diesen Besitzer gebunden, bis sie 30 Tage lang inaktiv war (`MUSE_SESSION_IDLE_TTL_MS`).
- Jede Fortsetzung und jeder Tool-Ergebnis-Wechsel bleibt dem Sitzungseigentümer zugeordnet: Verbindung, Kontoidentität und Generierung von Inferenz-Anmeldeinformationen, die vor Upstream-Versuchen, einschließlich Wiederholungsversuchen zur Aktualisierung der Anmeldeinformationen, erneut überprüft werden. Antworten rufen IDs/item Referenzen auf und Chat-Abschlüsse-Tool-Aufruf IDs müssen für diese Sitzung und Generation aufgezeichnet worden sein.
- SQLite `key_value` -Datensätze im `muse_session_ownership` Namespace (`src/lib/db/museSessionOwnership.ts`) behalten den Besitz und den Rotationscursor bei Neustarts bei. Bei jedem Anspruch und jeder zugestellten Antwort wird der Aktivitätsstempel der Sitzung aktualisiert. Eine Sitzung, die länger als `MUSE_SESSION_IDLE_TTL_MS` im Leerlauf ist, wird höchstens alle 10 Minuten und in begrenzten Stapeln bereinigt (Besitzer-Pin, bereitgestelltes Flag und aufgezeichnete opaque/reference Hashes), sodass eine spätere Wiedergabe ihres Verlaufs als unbekannter Besitzer fehlschlägt. Datensätze enthalten Verbindungs- IDs und Hashes der Kontoidentität, Anmeldeinformationen, undurchsichtigen Inhalt und Fortsetzungsverweise, keine Geheimnisse oder Konversationsverlauf. Kunden müssen ihre vollständige Historie und undurchsichtige Begründung aufbewahren und übermitteln.
- Unbekannte oder undurchsichtige Fremdgründe, ein fehlender Besitzer, ein nicht verfügbares Besitzerkonto oder ein Generationswechsel mit aufgezeichnetem Verlauf schlagen fehl, mit einem expliziten 4xx/503 — nie stillschweigenden kontoübergreifenden Failover geschlossen zu werden und nie die Begründung fallen zu lassen.
- Ein erneut erstellter Schlüssel für das gleiche Konto wird nur übernommen, wenn die Sitzung keinen abspielbaren Verlauf aufgezeichnet hat. Aufgezeichnete Sitzungen schlagen so lange fehl, bis sie neu gestartet werden.
- Eine leere Upstream-Antwort (`upstream_empty_response` / `empty_response`, nichts an den Anrufer ausgegeben) wird höchstens zweimal beim selben Besitzer wiederholt, nach 0,5 s und dann nach 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Wenn alle Versuche leer sind, wird der ursprüngliche 502 ohne Abklingzeit oder Breaker-Markierung zurückgegeben, sodass eine ungenaue Antwort den Besitzer niemals aussperrt.
- Alle `muse-code` Anfragen umgehen Lese- und Schreibvorgänge im semantischen Cache, einschließlich Streaming-Schreibvorgängen, sodass zwischengespeicherte undurchsichtige Ausgaben keinen anderen Sitzungseigentümer erhalten können.

Regressionswächter: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` und `tests/unit/chatcore-semantic-cache.test.ts`.

## Siehe auch

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — Leistungsschalter, Abklingzeiten, Modellsperren
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnostiziert Upstream-400er
- Quelle: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migration: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API Route: `src/app/api/cache/reasoning/route.ts`
- Originalausgabe: Nr. #1628
