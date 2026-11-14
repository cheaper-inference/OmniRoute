# Resilience Guide (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute verfügt über drei unterschiedliche, aber verwandte Resilienzmechanismen. Jeder hat einen anderen Umfang und Zweck. Halten Sie sie beim Debuggen des Routing-Verhaltens getrennt.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Quelle: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Env-vs-Dashboard-Priorität für Resilienz-Umschaltungen.** Die Opt-in-Resilienz-Schalter, die aus der Umgebung — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — geseed werden, stellen nur den _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`) bereit. Ein boolescher Wert blieb in `resilienceSettings` bestehen (Dashboard →** Einstellungen → Resilienz** / `PATCH /api/resilience`, gespeichert in `key_value`) gewinnt über den env-Wert: Normalisierung (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) behält den gespeicherten booleschen Wert bei, wann immer einer existiert. Das Festlegen einer solchen Umgebungsvariable auf `true` in einer Bereitstellung, in der das Dashboard `false` bereits gespeichert hat, ändert daher nichts. — schalten den Schalter ein** Einstellungen → Resilienz** (oder löschen Sie stattdessen das gespeicherte Feld).

## 1. Provider-Circuit-Breaker

**Geltungsbereich:** gesamter Provider (z. B. `glm`, `openai`, `anthropic`).

**Zweck:** den Datenverkehr zu einem Provider stoppen, der auf Upstream-/Service-Ebene wiederholt fehlschlägt.

**Implementierung:**

- Kernklasse: `src/shared/utils/circuitBreaker.ts`
- Verdrahtung: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status-API: `GET /api/monitoring/health`
- Reset-API: `POST /api/resilience/reset`
- Wrapper: `open-sse/services/accountFallback.ts`
- DB-Tabelle: `domain_circuit_breakers`

**Zustände:**

- `CLOSED` — normaler Datenverkehr erlaubt
- `DEGRADED` — Datenverkehr weiterhin erlaubt, aber erhöhte Provider-Fehlschläge werden verfolgt; kehrt zu `CLOSED` zurück bei ausreichend vielen Erfolgen, bei einem gültigen Verbindungstest oder nach Ablauf der längsten `OPEN`-Haltezeit für die letzte Fehlerart (deren `cooldownByKind`-Wert, sonst `resetTimeout`, × `maxBackoffMultiplier`, mindestens ein Cooldown) ohne neuen Fehlschlag
- `OPEN` — Provider vorübergehend blockiert; Combo-Routing überspringt ihn
- `HALF_OPEN` — Reset-Timeout abgelaufen; Prüfanfrage erlaubt

**Konfigurierbare Standardwerte (`open-sse/config/constants.ts`, einsehbar unter Dashboard → Einstellungen → Resilienz):**

| Klasse        | Degradiert bei | Öffnet bei      | Reset-Timeout |
| ------------- | -------------- | --------------- | ------------- |
| OAuth         | 5 Fehlschlägen | 8 Fehlschlägen  | 60s           |
| API-Schlüssel | 7 Fehlschlägen | 12 Fehlschlägen | 30s           |
| Lokal         | abgeleitet     | 2 Fehlschlägen  | 15s           |

`degradationThreshold` steuert, wann ein Provider in den Zustand `DEGRADED` eintritt; `failureThreshold` steuert, wann er öffnet und übersprungen wird. Lokale Provider-Profile werden auf der Resilienz-Einstellungsseite noch nicht angezeigt.

**Auslösecodes:** nur Provider-Level-Statuscodes `[408, 500, 502, 503, 504]`. Keine Auslösung bei Account-Level-Fehlern (die meisten 401/403/429 — diese gehören zu Cooldown oder Lockout).

**Lazy Recovery:** Wenn `OPEN` abläuft, aktualisieren `getStatus()`, `canExecute()`, `getRetryAfterMs()` den Zustand auf `HALF_OPEN`. Dieselben Lesevorgänge (und der nächste Fehlschlag) lassen einen veralteten `DEGRADED` zurück auf `CLOSED` abklingen. Kein Hintergrund-Timer erforderlich.

---

### Opt-in globaler Provider-Cooldown (Fenster-Gate)

Eine vierte, **Opt-in**-Schicht (`PROVIDER_COOLDOWN_ENABLED`, standardmäßig **aus**) führt in
`open-sse/services/providerCooldownTracker.ts` ein anfrageübergreifendes Gedächtnis fehlschlagender Provider, das bei der Combo-Zielauflösung herangezogen wird, damit aufeinanderfolgende Combo-Anfragen einen gerade fehlgeschlagenen Provider nicht erneut durchlaufen. Provider-Level-Einträge berücksichtigen das `PROVIDER_PROFILES`-Fenster-Gate:

| Profil        | löst aus nach (`providerFailureThreshold`) | innerhalb von (`providerFailureWindowMs`) | kühlt ab für (`providerCooldownMs`) |
| ------------- | -----------------------------------------: | ----------------------------------------: | ----------------------------------: |
| OAuth         |                                       `10` |                                   `15min` |                              `5min` |
| API-Schlüssel |                                       `15` |                                   `30min` |                             `10min` |

Unterhalb des Schwellenwerts gilt der Provider **nicht** als abkühlend; ein Erfolg leert das Fenster. Verbindungs-Level-Einträge (`provider:connectionId`) behalten stattdessen den exponentiellen `minRetryCooldownMs → maxRetryCooldownMs`-Backoff bei. Überschreibungen:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regressionsabsicherung: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Abklingzeit der Verbindung

**Umfang:** Einzelanbieter connection/account/key.

**Zweck:** Überspringen Sie einen fehlerhaften Schlüssel, während andere Verbindungen für denselben Anbieter weiterhin bedient werden.

**Durchführung:**

- Als nicht verfügbar markieren: `src/sse/services/auth.ts::markAccountUnavailable()`
- Auswahl: `getProviderCredentials*` in derselben Datei
- Abklingzeitberechnung: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Einstellungen: `src/lib/resilience/settings.ts`

**Felder pro Verbindung:**

- `rateLimitedUntil` — Zeitstempel bis zum Ablauf der Abklingzeit
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — exponentieller Backoff-Zähler

**Standardabklingzeiten:**

- OAuth Basis: 5s
- API-Schlüsselbasis: 3s
- API-Schlüssel 429: bevorzugt Upstream-Text zum Zurücksetzen von `Retry-After`/reset headers/parseable
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Wiederholungsverzögerung pro Anbieter.** Die Anbieterdetailseite verfügt über eine** Wiederholungsverzögerung** Wählen Sie (Auto, 15s bis 1h). Es spart `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, bis `PATCH /api/resilience`). Wenn ein Ratenbegrenzungsfehler keinen Upstream-Wiederholungshinweis enthält, ersetzt dieser Wert den skalierten Backoff für den Anbieter und setzt `backoffLevel` auf 0 (`open-sse/services/rotationConfig.ts::overrideFor`) zurück. Priorität für einen ratenbegrenzten Fehler, die höchste zuerst: Upstream-Wiederholungshinweis, dann pro Verbindung `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, dann die Wiederholungsverzögerung pro Anbieter, dann env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, dann das skalierte Backoff. Automatisch entfernt das Feld. Es betrifft nur den Ratenbegrenzungsgrund, niemals Endzustände.

**Anti-Donner-Herdenwächter:** verhindert, dass gleichzeitige Fehler die Abklingzeit überziehen oder `backoffLevel` verdoppeln.

**Parallelitätslimit 429s erklimmen die Backoff-Leiter nicht.** Ein `429` dessen Hauptteil ein Parallelitätslimit meldet („zu viele gleichzeitige Anfragen“, „Parallel-Request-Limit“, GLM `并发数过高`), bedeutet, dass das Konto fehlerfrei, aber ausgelastet ist. `checkFallbackError()` gibt den Grund `concurrency_limited` zurück: Failover jetzt zur nächsten Verbindung, kühlen Sie diese für einen festen `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) oder den Upstream-Wiederholungshinweis ab, lassen Sie `backoffLevel` unverändert und legen Sie `skipProviderBreaker` fest. Ein explizites Quotengremium gewinnt immer noch, sodass ein Gremium, das auch einem Quotenmuster entspricht, ein Quotenurteil bleibt. Erkennung: `looksLikeConcurrencyLimit()` in `src/shared/utils/classify429.ts`; Urteil: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (der `FailureKind` des Unterbrechers) ist unverändert und lautet weiterhin `rate_limit` für diese Körper.

**Stream-Content-Störungen kühlen das Konto nicht ab.** Wenn der Content-Stall-Watchdog (`open-sse/utils/streamHandler.ts`) einen Stream aufgibt, der rechtzeitig keine Modellausgabe gesendet hat, zeichnet `markAccountUnavailable()` den Fehler auf der Verbindung auf, legt aber keine Abklingzeit fest: Der Stall gehört zu dieser Anfrage, meist eine lange Argumentationsrunde ohne bisherige Ausgabe. Betreiber können sich mit `resilienceSettings.streamStallCooldown.enabled` (Standard `false`) wieder anmelden.

**Opt-in-Latenzsignal für `p2c` -Kontoauswahl.** Jeder gesendete Versuch zeichnet seine Zeit bis zum ersten Byte und sein Ergebnis pro Verbindung (und pro Verbindungs + Modell) in einem rollierenden In-Memory-Fenster auf: die letzten 20 Proben innerhalb von 15 Minuten (`open-sse/services/connectionLatencyTracker.ts`, aufgezeichnet von `safeLogEvents()` in `src/sse/handlers/chatHelpers.ts`). Wenn `resilienceSettings.p2cLatency.weight` über `0` liegt (Bereich 0–20, Standard `0` = aus), summiert sich `compareP2CConnections()` in `src/sse/services/auth.ts` zu `weight` -Punkten für jeden Kandidaten des Paares. Die Hälfte davon stammt aus der Latenz als Verhältnis zum schnelleren Kandidaten (doppelt so langsam braucht die volle Hälfte) und die andere Hälfte aus der rollierenden Fehlerrate. Der Begriff gilt nur, wenn beide Kandidaten über mindestens drei Stichproben verfügen, sodass neue Konten nicht bestraft werden und die Obergrenze unter den Strafen für gesperrte und erschöpfte Quoten bleibt. Es fügt keinen eigenen Schaltkreis hinzu: Ausgefallene Konten werden immer noch von den Cooldown-, Lockout- und Breaker-Ebenen behandelt. Stellen Sie es mit `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Argumentationsrahmen starten das Content-Stall-Budget neu.** Ein Argumentationsmodell kann Minuten lang nachdenken, bevor es sein erstes sichtbares Token erhält: Claude streamt `thinking_delta` Frames, deren Denktext möglicherweise leer ist, und das Responses API streamt ein Argumentationselement nach dem anderen. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) erkennt diese Frames und der Watchdog startet sein Budget bei jedem einzelnen Frame neu, anstatt die Runde abzubrechen. Sie sind immer noch keine Modellausgabe, daher wird ein Zug, der nur mit Argumentation endet, immer noch als leer gemeldet, und ein Zug, der mit dem Denken aufhört und nur Herzschläge sendet, löst immer noch den Watchdog aus.

Die binären `reasoningContentEvent` Frames von Kiro mit einer nicht leeren Signatur bewahren diese Argumentationsaktivität durch den Executor als leeres `reasoning_content` Delta. Die Signatur wird nicht weitergeleitet. Metadaten, unvollständige Frames und leere Signaturen belasten das Content-Budget nicht neu; Das unabhängige Active-Stream-Timeout und die Client-Stornierung gelten weiterhin (`open-sse/executors/kiro/reasoning.ts`).

**Endzustände (NOT -Abklingzeiten):**

- `banned` — wird durch die Erkennung von Banned-Keywords/Kontosperren festgelegt (siehe [BAN_DETECTION](../security/BAN_DETECTION.md) ). Upstream-Abweisungen pro Anfrage (`request_rejected`, z. B. Anthropic OAuth 403 „Anfrage nicht erlaubt“) setzen es nie: Sie werden pro Verbindung und Modell gezählt und nehmen das Modell mit einer wachsenden Abklingzeit, die auf `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 Stunde) begrenzt ist, aus der Rotation oder kühlen die Verbindung ab, wenn kein Modell bekannt ist — `open-sse/services/requestRejectedStreak.ts`
- `expired` (Übergänge zum Terminal nach begrenzten Wiederholungsversuchen — `EXPIRED_RETRY_MAX = 3` mit exponentiellem Backoff — sodass vorübergehende OAuth Fehler sich selbst beheben können, bevor das Konto dauerhaft deaktiviert wird)
- `credits_exhausted`

Diese bleiben bestehen, bis sich die Anmeldeinformationen ändern oder ein Bediener sie zurücksetzt. Überschreiben Sie keine Endzustände mit einem vorübergehenden Abklingzustand.

**Faule Erholung:** Wenn `rateLimitedUntil` abgelaufen ist, ist die Verbindung wieder möglich. Bei erfolgreicher Verwendung löscht `clearAccountError()` alle Fehlerfelder.

### Claude OAuth Nutzungsmauer: + -Sitzungslimit der Lane mit niedrigerer Priorität zurückgesetzt

**Umfang:** eine Claude -Abonnementverbindung (OAuth). Beide Funktionen sind** Opt-in pro Verbindung** (Verbindung → Claude Abschnitt → `lowPriorityMode` / `autoLimitReset` in `providerSpecificData` bearbeiten, beide standardmäßig deaktiviert) und die `/low-priority` und `/limit-reset` -Befehle des Claude Codes spiegeln (Drahtvertrag aus Claude Code 2.1.263 erfasst).

**Durchführung:**

- Zustandsmaschine + -Antwortklassifizierung: `open-sse/services/claudeLowPriority.ts`
- status/claim Client zurücksetzen: `open-sse/services/claudeLimitReset.ts`
- Executor-Hook (Header-Injektion + Wiederholung bei gleichem Konto): `open-sse/executors/base.ts::execute()`
- Opt-in-Persistenz: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Auslösen:** die 5-Stunden-Nutzungsmauer — ein `429`, dessen Header `anthropic-ratelimit-unified-status: rejected` und, wenn das Konto berechtigt ist, `anthropic-ratelimit-unified-slow-offer: treatment`. Nichts wird vor die erste Wand 429 geschickt; Ein Burst 429 ohne einheitliche Header durchläuft den normalen Abklingpfad.

**Fahrspur mit niedrigerer Priorität** (`lowPriorityMode`):

- An der Wand 429 nimmt der Testamentsvollstrecker das Angebot an und versucht es sofort erneut** Dasselbe** Konto bei `anthropic-usage-limit: slow`; Die Lane bleibt bis zum angekündigten `anthropic-ratelimit-unified-reset` (+ 60s Grace) aktiv und jede Anfrage in diesem Fenster trägt den Header. Der abgefangene 429 erreicht nie `handleChatCore`, daher besteht die Verbindung** nicht** Abklingzeit eingelegt und nicht wegrotiert.
- `anthropic-ratelimit-unified-slow-status` zu späteren Antworten: `active` / `not_needed` Spur halten; `slot_busy` (429) oder ein `529` wartet auf den `anthropic-ratelimit-unified-slow-retry-after` des Servers (Standard 20 s, Klemme 5–600 —, ± 30 % Jitter) und versucht es erneut, begrenzt durch `anthropic-ratelimit-unified-slow-max-wait` (Standard 20 Min., Klemme 1 Min.–6 Stunden). Die Wartezeit wird zusätzlich durch den Rest des Upstream-Start-Timeouts der Anfrage (`resolveFetchStartTimeout`, standardmäßig 10 Minuten) begrenzt, abzüglich einer Marge von 5 Sekunden: Ohne diese Obergrenze würde die standardmäßige maximale Wartezeit von 20 Minuten die Anfrage überleben und der Ruhezustand würde mitten in der Wartezeit abgebrochen werden, wodurch ein `TimeoutError` statt der eleganten `max_wait` end- + -Abkühlung auftaucht.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, ein 5-Stunden-Fenster-Rollover oder `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (was bei jedem Status als `extra_usage` endet, da die bezahlte Überschreitung jetzt die Wand abdeckt) beenden die Spur; Die Reaktion fließt dann in den normalen Abklingpfad über. `budget_exhausted` bleibt bis zum angekündigten Budget-Reset (≤ 8 Tage) gespeichert.
- Die Wandprüfung wird nach den 400 vom Ausführenden selbst gesteuerten Wiederholungsversuchen innerhalb eines Versuchs ausgeführt (Kontextbearbeitung, thinking/effort -Klemmen, automatisches Param-Lernen), sodass eine Wand 429, die nur bei einem dieser Wiederholungsversuche auftaucht, immer noch abgefangen wird, anstatt den Abklingpfad zu erreichen.
- Der Status ist pro Verbindung im Speicher (ein Neustart kostet eine zusätzliche Wand 429 für die erneute Annahme).

**Zurücksetzen des Sitzungslimits** (`autoLimitReset`, vor der Spur versucht, wenn beide eingeschaltet sind):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` Block; wenn `arm: "reset"` und `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` mit `{ "program": "juniper_tide" }` (Organisation UUID von `providerSpecificData.organizationUUID`, Bootstrap-Fallback).
- `result: reset|not_limited` → Die Anfrage wird mit voller Geschwindigkeit wiederholt (kein langsamer Header). `already_used` / `not_offered` memoise `next_available_at` (Standard eine Woche); Jeder Fehler verzögert sich um 15 Minuten. Die Zurücksetzung erfolgt einmal pro Woche und zählt weiterhin zum wöchentlichen Limit.

Regressionswächter: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Bank-Resets automatisch anwenden

**Umfang:** Codex und Claude -Abonnementverbindungen (OAuth).** Opt-in** : Die `bankedResetAutoApply` Einstellung ist deaktiviert und befindet sich standardmäßig im `dry-run` Modus (Einstellungen → AI → Bank-Resets automatisch anwenden).

**Zweck:** Sie können Guthabenrücksetzungen selbst durchführen, wenn ein Konto an eine Nutzungsgrenze stößt, anstatt darauf zu warten, dass ein Betreiber auf der Seite „Anbieterlimits“ auf „Einlösen“ klickt.

| Kreditart (`creditTypes`) | Was wird eingelöst                                          | Wo es läuft                                                             |
| ------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| `codexCredits`            | Codex Credits zurücksetzen                                  | Hintergrundjob, alle 60 s                                               |
| `claudeCredits`           | Claude -Bankzuschüsse (`GRANT` -Credits)                    | Hintergrundjob, alle 60 s                                               |
| `claudeSessionReset`      | Claude wöchentliches Zurücksetzen des Sitzungslimits (oben) | Anforderungspfad über dieselbe Richtlinie wie die Umschaltung pro Konto |

**Durchführung:**

- Reine Entscheidung (ein Regelsatz für beide Pfade): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Hintergrundjob: `src/lib/services/bankedResetAutoApply.ts` (gestartet in `src/instrumentation-node.ts`)
- Claude -Anforderungspfad-Gate: `src/lib/usage/claudeSessionResetPolicy.ts`, registriert über `setClaudeLimitResetPolicy()` in `open-sse/services/claudeLimitReset.ts`
- Geschichte, Obergrenzen und Webhook: `src/lib/usage/bankedResetAudit.ts`
- Verlauf API: `GET /api/settings/banked-reset-auto/history?limit=50` (Verwaltungsauthentifizierung)

**Entscheidungsreihenfolge** (Die erste fehlerhafte Regel ist der aufgezeichnete Grund):

1. Funktion deaktiviert, Kreditart deaktiviert oder Konto außerhalb des Gültigkeitsbereichs (`accountScope` `all` / `selected` plus die `connections` -Karte pro Konto).
2. Außerhalb des optionalen UTC Zeitplans (`startHourUtc` > `endHourUtc` überschreitet Mitternacht).
3. Obergrenzen in den letzten 24 Stunden: `maxPerAccountPerDay` (1), `maxPerDay` (3) und `minSpacingMinutes` (30) zwischen zwei beliebigen Einlösungen.
4. Auslöser: ein ummauertes `session` oder `weekly` Fenster (aus `getQuotaWindowStatus().reachedThreshold` gelesen, nicht `isAccountQuotaExhausted()`, das nur ein Konto mit jedem ausgegebenen Fenster meldet) oder ein Guthaben, das innerhalb von `expiringCreditHours` (24) auf einem Konto abläuft, das mindestens `expiringCreditMinUsedPercent` (50) verwendet hat.
5. Schutz vor natürlichem Zurücksetzen: Überspringen, wenn das ummauerte 5-Stunden-Fenster innerhalb von `sessionResetGuardMinutes` (90) oder das ummauerte wöchentliche Fenster innerhalb von `weeklyResetGuardHours` (12) zurückgesetzt wird.
6. Wöchentlicher Mindestwert: Überspringen Sie ein 5-Stunden-Reset, wenn die wöchentlich verbleibende Restmenge unter `weeklyFloorPercent` (10) liegt.
7. `last-resort` Modus: Überspringen, während ein anderes im Geltungsbereich befindliches Konto desselben Anbieters in beiden Fenstern mindestens `poolHeadroomPercent` (10) übrig hat. Auslöser für ablaufendes Guthaben umgehen dies.
8. `dry-run` zeichnet eine Reihe auf und löst nichts ein; `last-resort` und `eager` einlösen.

Fehlende Kontingentdaten entsperren nie eine Einlösung: eine unbekannte Rücksetzzeit oder wöchentliche Nutzungsausfälle.

**Zurücksetzen Claude -Sitzung:** Wenn die Funktion deaktiviert ist oder `claudeSessionReset` deaktiviert ist, entscheidet der `autoLimitReset` Schalter pro Konto genau wie zuvor. Wenn beide aktiviert sind, ersetzt die Funktion das Umschalten pro Konto: Ein in den Geltungsbereich fallendes Konto kann nur dann Anspruch erheben, wenn die Richtlinie dies zulässt, und im `dry-run` Modus wird kein Anspruch geltend gemacht.

**Sicherheit:** Der Job löst höchstens ein Guthaben pro Tick ein, entscheidet vor der Auflistung von Guthaben (ein übersprungenes Konto wird nie aufgeführt), verwendet Idempotenzschlüssel `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` und sperrt ein Konto für 1 Stunde nach einer fehlgeschlagenen Auflistung oder Einlösung. Jede Einlösung, jeder Fehler und jede Trockenlaufentscheidung wird in `audit_log` geschrieben (`action: "bankedReset.redeem"`, keine Token oder Kredit-IDs); Die Obergrenzen werden ab diesen Reihen gezählt, sodass sie Neustarts überstehen. Erfolgreiche Einlösungen lösen auch den `provider.reset_redeemed` Webhook aus.

Regressionswächter: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Sitzungsaffinität (#7274)

**Umfang:** Eine Client-Sitzung (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` Header) ist an eine Verbindung angeheftet, z** beliebig** Anbieter.

**Zweck:** Halten Sie einen Multi-Turn-Agenten (Claude Code, Aider, benutzerdefinierte Agenten) bei allen Anfragen auf demselben Konto, wodurch kontenübergreifender Kontextverlust und wiederholte Kaltstart-429-Fehler bei Anbietern mit Sitzungsstatus pro Konto reduziert werden.

**Durchführung:**

- TTL -Auflösung: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header-Extraktion (generisch, jeder Anbieter): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persistierte Pin-Tabelle: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Einstellung: `sessionAffinityTtlMs` (globales TTL in ms, `0` deaktiviert) — `src/lib/db/settings.ts`. Durch Migration vom reinen Codex `codexSessionAffinityTtlMs` in `124_generic_session_affinity_ttl.sql` umbenannt, das alle zuvor konfigurierten Codex TTL als neuen Standard übernimmt.

Vor #7274 `resolveSessionAffinityTtlMs()` für jeden Anbieter außer `codex` eine feste Verbindung zu `0` hergestellt, sodass die TTL Einstellung (und die Sitzungsheader) nirgendwo sonst Auswirkungen hatten, obwohl der Pinning-Mechanismus und die Header-Extraktion bereits anbieterunabhängig waren. Der Fix entfernte diese vorzeitige Rückkehr; Das TTL gilt nun einheitlich für jeden Anbieter, sobald es global über `0` festgelegt wurde.

Die drei Sitzungsaffinitäts-Header werden niemals an Upstream- — Ausführer weitergeleitet, die ihre eigenen Upstream-Header von Grund auf erstellen, anstatt Client-Header weiterzuleiten, daher bleibt dies nur eine interne Korrelations-ID.

### Exklusive Mietverträge für verwaltete Sitzungsverbindungen

**Umfang:** Ein aktiv verwalteter HTTP client/session besitzt eine berechtigte OmniRoute Verbindung.

**Zweck:** Bieten Sie Clients, die einen harten Routing-Zaun über alle Anfragen hinweg benötigen, eine dauerhafte, exklusive Verbindungseigentümerschaft. Dies unterscheidet sich von der Sitzungsaffinität, bei der es sich um eine weiche Kontinuitätspräferenz handelt: Eine exklusive Lease behält den Lebenszyklusstatus in SQLite bei, erzwingt die Einzigartigkeit globaler aktiver Eigentümer und aktiver Verbindungen und lehnt eine veraltete Generation vor dem Anbieterversand ab.

Die Funktion kann per API -Schlüssel aktiviert werden. Ein verwalteter Schlüssel muss den `lease:exclusive` -Bereich und eine explizite, nicht leere `allowedConnections` -Liste haben. Jeder HTTP Client kann den Lebenszyklusendpunkt verwenden; Es ist kein Clientname, Benutzeragent, Anbieter, OAuth -Methode oder Modell erforderlich. Der Lease besitzt eine Verbindung, kein Modell, sodass bei einer Modelländerung die Bindung erhalten bleibt, während die Verbindung normal berechtigt bleibt. Normale Modell-, Kontingent-, Gesundheits-, Cooldown- und Zulassungslistenregeln bleiben maßgebend und können dieselbe Generation auf eine andere kostenlose berechtigte Verbindung übertragen.

Der Lebenszyklus ist `POST /api/v1/session-leases` mit JSON -Aktionen `acquire`, `renew` und `release`. Verwaltete Inferenzanfragen stellen den undurchsichtigen `X-OmniRoute-Lease-Owner` Wert und den genauen `X-OmniRoute-Lease-Generation` dar. Der Besitzer verwendet `vlo_` gefolgt von 43 base64url-Zeichen; Es wird nur der SHA-256 -Hash gespeichert. Jeder endgültige Dispatch-Fence bindet auch den authentifizierten API -Schlüssel ID und die aktive Verbindung ID. Lease-Control-Header werden aus Protokollen, aufbewahrten Anforderungs-Snapshots und Upstream-Executor-Headern entfernt.

Wenn das normale Routing berechtigte verwaltete Kandidaten hat, aber jeder freie Kandidat durch eine ausländische aktive Lease belegt ist, gibt OmniRoute HTTP `429`, Lease-Capacity-Unavailable-Code, einen Status „Waiting-for-Capacity“ und einen begrenzten `Retry-After` zurück, der vom frühesten relevanten Ablauf abgeleitet ist. Eine gewöhnliche leere Berechtigung ist kein Lease-Konflikt und behält seine bestehende Routing-Fehlersemantik bei.

Verwandte Mechanismen bleiben getrennt:

- OAuth -Sitzungsbelegung ist eine prozesslokale Softverteilung für OAuth -Konten.
- Kontosemaphoren gewähren Genehmigungen für die Parallelität von Anfragen und enden, wenn eine Anfrage abgeschlossen ist.
- Exklusive Managed-Session-Leases sind dauerhafte Eigentumsrechte über den gesamten Lebenszyklus mit einem Generationszaun.

---

## 3. Modellsperre

**Geltungsbereich:** Kombination aus Anbieter, Verbindung und Modell.

**Geltungsbereich nach Status:** Der fehlgeschlagene Status bestimmt, in welchen Schlüssel eine Sperre geschrieben wird
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — ein Kontingent- oder Berechtigungssignal — sperrt die **Kontingentfamilie**:
  Bei Codex den gesamten Bereich `codex` / `spark` (jedes `gpt-5*`-Modell der
  Verbindung), bei anderen Anbietern `getQuotaScopedModelForProvider()`.
- `404` sperrt das einfache Modell (`getModelLockKey()` grenzt `not_found` ein).
- Jeder andere Status — `5xx`-Transport-/Serverfehler und Omniroutes eigenes
  synthetisiertes `502` aus der Qualitätsvalidierung — sperrt nur das **exakte**
  Tupel aus Anbieter, Verbindung und Modell. Ein fehlerhafter Stream bei einem
  Modell liefert keinen Hinweis auf das Kontingent des Kontos; vor dieser Regel
  entfernte eine leere Antwort bei `codex/gpt-5.6-luna` jedes `gpt-5*`-Modell
  dieser Verbindung für 2–30 Minuten (mit ansteigender Dauer) aus dem Routing,
  während ihr Kontingent unverändert blieb.
- Die explizite Option `scope` eines Aufrufers hat immer Vorrang (Antigravity übergibt `"exact"`).

**Zweck:** Verhindern, dass eine gesamte Verbindung deaktiviert wird, wenn nur ein Modell nicht verfügbar oder durch ein Kontingent eingeschränkt ist.

**Beispiele:**

- Anbieter mit modellspezifischen Kontingenten, die `429` zurückgeben
- Lokale Anbieter, die für ein fehlendes Modell `404` zurückgeben
- Anbieterspezifische Fehler bei Modus-/Modellberechtigungen (z. B. Grok-Modi)

**Implementierung:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard für Modell-Cooldowns (v3.8.0)

UI: Einstellungen → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Listet aktive Sperren mit folgenden Angaben auf: Anbieter, Verbindung, Modell, Grund, expiresAt. Betreiber können ein Modell über die Karte manuell wieder aktivieren.

**REST-API:**

- `GET /api/resilience/model-cooldowns` — aktive Sperren auflisten
- `DELETE /api/resilience/model-cooldowns` — manuell wieder aktivieren. Body: `{provider, connection, model}`. Authentifizierung: Management.

### Cooldown-Manager

UI: Überwachung → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Eine Seite für jede Verbindung, die aus einem vorübergehenden Grund nicht geroutet wird, statt
jede Anbieterseite einzeln zu öffnen. Sie listet Verbindungs-Cooldowns, Modellsperren und terminale
Zustände auf, löscht sie pro Verbindung, für eine Auswahl oder für alle Verbindungen eines Anbieters
und bearbeitet die am häufigsten angepassten Cooldown-Regeln: `streamStallCooldown.enabled` und den
Basis-Cooldown sowie die maximalen Backoff-Schritte für OAuth- und API-Key-`connectionCooldown`
(gespeichert über `PATCH /api/resilience`). Terminale Zustände (`banned`, `expired`, `credits_exhausted`) werden
aufgelistet, hier aber niemals gelöscht.

Die Karte **Error cooldown rules** auf derselben Seite bearbeitet die Fehlerregeln des Betreibers
(`settings.providerErrorRules`) und die anbieterbezogenen Catch-all-Standards
(`settings.providerErrorDefaults`) über `PATCH /api/settings` — siehe „Vom Betreiber deklarierte
Regeln“ unter §7 für die Zuordnung. Die Dauern sind Standard (kein expliziter Cooldown), 30 Minuten,
1 Stunde, 5 Stunden, 24 Stunden oder ein benutzerdefinierter Wert von 1 bis 43.200 Minuten (30 Tage).

**REST-API** (`src/lib/resilience/cooldownManager.ts`, Authentifizierung: Management):

- `GET /api/resilience/cooldowns[?provider=]` — Verbindungen mit Status, verbleibendem Cooldown,
  Backoff-Stufe, letztem Fehlertyp und Modellsperren (keine Anmeldedaten)
- `POST /api/resilience/cooldowns` — Body `{connectionIds: string[]}` oder
  `{all: true, provider?}`; gibt `{cleared, unchanged, skippedTerminal, lockoutsCleared}` zurück

### UI für Sperreinstellungen + Wiederherstellung durch Erfolgsabklingung (v3.8.23)

Die Modellsperre wechselte von einem immer aktivierten, fest codierten Verhalten zu einer vollständig konfigurierbaren,
opt-in-Funktion mit einer eigenen Einstellungskarte und einem selbstheilenden Wiederherstellungspfad.

**Einstellungskarte:** Einstellungen → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Diese ist **getrennt** von der schreibgeschützten `ModelCooldownsCard` oben (die nur aktive Sperren
_auflistet_) — die neue Karte _konfiguriert die Parameter_. Die Standardwerte befinden sich in
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Einstellung             | Standardwert                     | Bedeutung                                                            |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------- |
| `enabled`               | `false`                          | Hauptschalter — die Modellsperre ist **standardmäßig deaktiviert**.  |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream-Status, die als modellspezifischer Fehler gelten.           |
| `baseCooldownMs`        | `120_000` (120 s)                | Anfängliche Sperrdauer beim ersten Fehler.                           |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Obergrenze für den eskalierten Cooldown.                             |
| `maxBackoffSteps`       | `10`                             | Maximale Anzahl der Eskalationsschritte mit exponentiellem Backoff.  |
| `useExponentialBackoff` | `true`                           | Gibt an, ob wiederholte Fehler den Cooldown exponentiell verlängern. |

Die Einstellungen werden über den normalen Einstellungsspeicher persistiert und anhand des
Resilience-Einstellungsschemas validiert; die Karte begrenzt `baseCooldownMs`/`maxCooldownMs`
(wobei `maxCooldownMs ≥ baseCooldownMs` gilt) sowie `maxBackoffSteps`.

**Wiederherstellung durch Erfolgsabklingung:** Die Wiederherstellung erfolgt **nicht** ausschließlich durch Ablauf des Timers. Eine gesunde
Antwort reduziert den Fehlerzähler des Modells, sodass ein Modell, das sich innerhalb des Zeitfensters
erholt hat, nicht weiter eskaliert (und seine Sperre aufhebt), bevor sein Timer ablaufen würde. Bei einem erfolgreichen
Kombinationsziel ruft `open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) auf, wodurch der gespeicherte
`failureCount` **halbiert** wird (`Math.floor(failureCount / 2)`); sobald er `0` erreicht, wird der Sperreintrag
vollständig gelöscht. Das Gegenstück `recordModelLockoutFailure()` erhöht den Zähler (und eskaliert den Cooldown)
bei Fehlern innerhalb des Eskalationsfensters. Diese Erfolgsabklingung kommt zum einfachen Ablauf des Timers hinzu —
beide Wege können ein Modell wieder aktivieren.

**Zustand:** Sperren werden **im Speicher** gehalten (pro Prozess als `Map`s von
`ModelLockoutEntry`, nach `provider:connectionId:model` indiziert, Sperren mit exakt diesem Geltungsbereich nach
`provider:connectionId:exact:model`), und nicht in der
DB persistiert – sie gehen beim Neustart verloren. Die _Einstellungen_ werden persistiert; der aktive
_Sperrzustand_ ist flüchtig.

---

## 4. Quota-Share-Parallelitätskontrolle (v3.8.36)

Abonnementkonten (GLM, MiniMax usw.) akzeptieren häufig nur 1–3 gleichzeitige ~ Anfragen; Wird dieser Wert überschritten, werden 429 Sekunden und Abklingzeiten ausgelöst. Das ist akut unter** Quotenanteil** (`qtSd/…`)-Kombinationen, bei denen sich mehrere API Schlüssel ein Upstream-Konto teilen. Drei Schichten verhindern, dass ein gemeinsames Konto überflutet wird.

### Parallelitätsobergrenze pro Verbindung (`max_concurrent`)

Jede Anbieterverbindung kann eine `max_concurrent` Obergrenze deklarieren (`provider_connections.max_concurrent`, festgelegt im Verbindungsmodal / API / DB). Lassen Sie es leer, damit es keine Begrenzung gibt. Dies ist der einzelne Knopf, der die darunter liegende Serialisierungsschicht steuert. — stellt ihn auf die tatsächliche Parallelität des Kontos ein (z. B. GLM ~ 1, MiniMax ~ 2).

### Parallelitätsobergrenzen pro Modell (`modelConcurrency`)

Eine Verbindung kann zusätzlich in ihrer `rateLimitOverrides` -Karte genaue Obergrenzen für die Parallelität pro Modell deklarieren:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Stellen Sie es im Verbindungsmodal ein (** Die Ratenbegrenzung setzt → -Parallelitätsobergrenzen pro Modell außer Kraft** , ein `model=cap` pro Zeile) oder über `PATCH /api/providers/[id]` mit der gleichen JSON Form. Schlüsselsemantik:

- **Verbindungsweit vs. modellspezifisch:** `maxConcurrent` bleibt die gemeinsame verbindungsweite Obergrenze. Wenn beides zutrifft, werden beide Gates atomar im selben zusammengesetzten Gate (`global → provider → account → model`) erfasst; das effektive Verhalten ist der strengere anwendbare Grenzwert.
- **Exakte Modell-Schlüssel-Übereinstimmung:** Der Schlüssel ist die Modellzeichenfolge, die nach der Routing-Auflösung an den Executor übergeben wird — ist normalerweise die nackte Upstream-Modell-ID (`glm-5`), kein clientseitiger `provider/model` Alias (`zai/glm-5` stimmt nicht mit `glm-5` überein). Bei den Werten handelt es sich um positive, ganzzahlige Obergrenzen für gleichzeitige Anforderungen.
- **Lokale Warteschlange, keine Erkennung:** Überschüssige Anfragen werden lokal mit der vorhandenen queue/timeout Semantik in die Warteschlange gestellt (typisierte `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` Zulassungsfehler). OmniRoute erkennt oder leitet keine Upstream-Richtlinie ab, — erzwingt die genauen Obergrenzen, die der Betreiber konfiguriert hat. Ein gesättigtes Modelltor deaktiviert niemals den Anbieter und führt niemals zu einer dauerhaften Modellsperre. Das Upstream- 429/cooldown/fallback Verhalten bleibt der Fehler-Backstop.
- **Umfang pro Verbindung, pro Prozess:** Die Obergrenzen gelten pro Datenbankverbindung und werden im Speicher gehalten, sodass zwei Verbindungen, die denselben Upstream- API Schlüssel wiederverwenden, nicht miteinander koordiniert werden.
- **Unkonfiguriert bedeutet unverändert:** Wenn Sie die Karte weglassen (oder das Dashboard-Feld leer lassen), wird kein Modell-Gate hinzugefügt. Beispielkonfiguration ohne Durchsetzung eines Universal-Provider-Limits:

```text
glm-5=1
glm-4.7=3
```

### Serialisierung von Kontingentanteil-Anfragen

Wenn ein Quota-Share-Dispatch auf eine Verbindung abzielt, die ein positives `max_concurrent` deklariert, werden gleichzeitige Anfragen an diese gesendet** Konto** werden über ein verbindungsspezifisches Semaphor (Schlüssel `qsconn:<connectionId>`) serialisiert: überschüssige Anfragen** in der Warteschlange warten** anstatt das Konto zu überschwemmen. Es ist** Fail-Open** Bei einer gesättigten Warteschlange oder einer Zeitüberschreitung wird — ohne einen Slot fortgesetzt, anstatt jemals eine zuteilbare Anfrage abzulehnen. Einschalten** Einstellungen → Resilience → Kontingentanteil pro Verbindung Parallelität** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, standardmäßig aktiviert). Ohne eine `max_concurrent` Obergrenze bleibt das Verhalten unverändert.

> Das Quota-Share-Routing-Gate (`selectQuotaShareTarget`, DRR + P2C) ist selbst ausfallsicher und _depriorisiert_ nur eine At-Cap-Verbindung — mit einem Single-Connection-Pool, den es nicht hart begrenzen kann, daher ist dieses Semaphor das, was tatsächlich die Flut enthält.

### Kombinierter, abklingzeitabhängiger Wiederholungsversuch

Für jede Combo-Strategie (sofern aktiviert) wartet eine Anfrage, die einen 429 für eine vorübergehende SHORT Abklingzeit kristallisieren würde, ab und sendet sie erneut, anstatt den 429 — zurückzugeben. Dies deckt TPM/RPM Fenster der Gemini-Klasse (~ 60 Sekunden Wiederholung nach) bei Multi-Modell-Combos ab, z. B. wenn beide Ziele einer 2-Modell-Combo ein Ratenlimit pro Modell erreichen. Begrenzt durch `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) in** Einstellungen → Resilienz** . Es wird nie auf `quota_exhausted` (bis Mitternacht gesperrt) oder auth/not-found Gründe gewartet. Wenn `comboTimeoutMs` festgelegt ist, beginnt eine Wartezeit, die nicht vor Ablauf dieser Frist beendet werden kann, nicht (#18998): Die Combo antwortet sofort mit ihrer Terminalantwort anstelle eines `COMBO_TIMEOUT` 504.

Eine Kombination kann mit `config.comboCooldownWaitEnabled: false` deaktiviert werden. Nur das wörtliche `false` deaktiviert diese gemeinsamen Combo-Wartezeiten (Abklingzeit nach dem Versand und circuit-open/model-lock -Wartezeiten vor dem Versand) und ihre Verlängerung des Wartebudget-Timeouts. Fehlt oder `true` bleibt die globale Richtlinie erhalten; `true` kann das global deaktivierte Warten nicht aktivieren. Ein explizites `targetTimeoutMs` gewinnt immer noch. Durch diese Abmeldung ändert sich nichts an der separaten Wartezeit vor dem Versand des Native-Codex-Turn-Pins.

Das gleiche Gate deckt den Pre-Dispatch-Fall ab (#16319): Wenn jedes Ziel einer Combo übersprungen wird, bevor irgendein Versuch unternommen wird, weil sich das Modell in einer kurzen vorübergehenden Sperre befindet, wartet der Null-Versuchs-Pfad die Sperre unter denselben Obergrenzen ab und sendet erneut, anstatt auf ein `503 ALL_TARGETS_SKIPPED` ohne Hinweis zu antworten. Wenn keine Wartezeit zulässig ist (Obergrenze, Versuch oder Budget ausgeschöpft oder die Funktion deaktiviert), wird die Terminalantwort auf `429 rate_limit_error` aktualisiert und trägt `retry_after` / `reset_at` ab dem frühesten Ablauf der vorübergehenden Sperre; Kontingent-, Authentifizierungs- und nicht gefundene Sperren behalten den Hinweis-losen 503 bei.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Zulassungssteuerung der Request-Warteschlange (v3.8.49 · Issue #6593)

**Geltungsbereich**: die lokale Rate-Limit-Warteschlange pro Provider+Verbindung (`open-sse/services/rateLimitManager.ts`, auf Basis von Bottleneck), eine Ebene unterhalb der drei oben beschriebenen Mechanismen.

**`maxWaitMs` begrenzt das Warten in der Warteschlange; `executionMaxWaitMs` begrenzt die Ausführung.**
Die beiden sind bewusst voneinander getrennt, und keiner der Werte speist den anderen.

`resilienceSettings.requestQueue.maxWaitMs` ist das **Budget für die Warteschlangen-Wartezeit**: Es deckt das Warten auf einen Provider-Slot und das anschließende Verweilen im Status QUEUED ab, und sein Timer wird in dem Moment gelöscht, in dem der Job den Status QUEUED verlässt und mit der Ausführung beginnt (`rateLimitManager.ts`, `wrappedFn`). Ein Request, der das Budget überschreitet, erreicht das Upstream-System nie. Standardwert 30000 ms, bereitgestellt von `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` in `src/lib/resilience/settings.ts` und abgesichert durch `tests/unit/ratelimit-admission-control-6593.test.ts`, sodass eine Änderung daran diesen Test rot werden lässt, statt diesen Absatz still veralten zu lassen.

`resilienceSettings.requestQueue.executionMaxWaitMs` ist der Wert, den Bottleneck als `expiration` des Jobs erhält und dessen Timer erst nach dem Dispatch startet. Er ist eine letzte Absicherung für Executoren ohne eigenes Upstream-Timeout und wird auf das eigene Fetch-Start-Timeout des Executors angehoben, wenn dieses länger ist, sodass er eine gesunde, bereits laufende Antwort nicht abschneiden kann. Standardwert 600000 ms (10 Min.).

Das Einspeisen des Warteschlangen-Budgets in `expiration` war es, das nicht-inkrementelle Gateways früher mitten im Flug abbrach – sie laufen legitim minutenlang, bevor die ersten Bytes ankommen –, und es ist der Grund, warum ein Ablauf der `expiration` als `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) gemeldet wird, während das Warteschlangen-Budget den Queue-Timeout-Code trägt. Beide Werte lassen sich über `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (Env) oder das Dashboard (**Einstellungen → Resilienz**) überschreiben. Beide werden bei der Normalisierung auf 1 ms–24 h begrenzt.

**Vorrang, für beide:** Die Env-Variable liefert nur den _Standardwert_. Ein in `resilienceSettings.requestQueue` persistierter Wert (Dashboard / API-Patch, gespeichert in `key_value`) hat Vorrang vor ihr, und ein verbindungsspezifischer `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` hat wiederum Vorrang davor. Das Setzen der Env-Variable bei einer Bereitstellung, die bereits einen persistierten Wert hat, ändert daher nichts – löschen oder aktualisieren Sie stattdessen die persistierte Einstellung.

Die Verweildauer in der Warteschlange wird durch `maxWaitMs` begrenzt; `maxQueueDepth` weiter unten begrenzt, wie viele Aufrufer gleichzeitig eingereiht sein dürfen.

**Im Body genannte Wiederholungen: Pacing vs. Sperrung.** Ein 429-Body kann eine eigene Wartezeit nennen (Gemini `RetryInfo.retryDelay`, Text „retry after Ns"), die `updateFromResponseBody` ausliest. Eine Wartezeit, die in das `maxWaitMs` der Verbindung passt, ist Pacing: Der Limiter leert sein Reservoir für diese Dauer, und eingereihte Aufrufe werden abgesendet, sobald es sich wieder auffüllt. Eine Wartezeit länger als `maxWaitMs` kann die Warteschlange nicht aussitzen – Gemini beantwortet ein erschöpftes Tageskontingent mit `retryDelay: "86399s"`. Der weitergereichte `Retry-After` auf dem neu aufgebauten 429 (#16528) lässt die Fallback-Engine das Modell bereits für dieses Zeitfenster sperren, aber den Limiter ebenfalls dafür zu pausieren, würde jeden Aufruf, der den Key vorzeitig erreicht (etwa nach einem Resilienz-Reset), trotzdem für das gesamte `maxWaitMs` blockieren. Stammt eine solche Wartezeit aus einem typisierten Google-`RetryInfo`-Detail (der Herkunft `google_rpc_retry_info`) und ist der Limiter des Keys bereits auf das Modell begrenzt (siehe `getLimiterKey`), wird aus dem 429 stattdessen eine Modellsperrung auf dieser Verbindung (`lockModelForLongBodyRetry` in `open-sse/services/rateLimitManager/bodyRetryPause.ts`, begrenzt auf 24 h), und der Limiter bleibt unpausiert. Die Kontoauswahl überspringt aufgrund dieser Sperre via `isModelLocked()`, und ebenso das Pre-Dispatch-Gate der Combo für Ziele, die an die Verbindung gepinnt sind. Bei antigravity, dessen Limiter pro Kontingentfamilie arbeitet, gilt die Sperre für das exakte Modell, wie auch seine anderen Kontingentsperren. Der vom Client angefragte Name wird ebenfalls gesperrt, wenn ein Alias ihn auf dieses Modell aufgelöst hat, weil diese Prüfungen den angefragten Namen verwenden; er wird exakt gesperrt (`lockExactModel`), sodass ein Alias, der eine antigravity-Kontingentfamilie oder einen codex-Geltungsbereich überschreitet, niemals das Eigene sperrt. Ein Freitext-Hinweis, ein untypisiertes `retryDelay` oder ein von der gesamten Verbindung geteilter Limiter behält die Pause bei. Wenn der Limiter, den der 429-Pfad gerade neu aufgebaut hat, tatsächlich pausiert, wird ein Aufrufer, dessen verbleibende Wartezeit in der Warteschlange vor der Pause endet, sofort mit dem Queue-Timeout-Code abgewiesen (`checkLimiterPause`), statt diese Zeit abzuwarten; das aufgezeichnete Ende wird verankert, bevor der Limiter gebaut wird, dort, wo Bottleneck seine Refresh-Uhr startet, und jede spätere Änderung am Reservoir vergisst es. Abgedeckt durch `tests/unit/rate-limit-long-body-retry-lockout.test.ts` und `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — Opt-in-Zulassungsobergrenze (neu).** `resilienceSettings.requestQueue.maxQueueDepth` begrenzt, wie viele Requests gleichzeitig für eine Provider+Verbindung eingereiht (noch nicht abgesendet) sein dürfen. Wenn die Warteschlange bereits `maxQueueDepth` Requests enthält, wird ein neuer Request mit einem typisierten Fehler `code: "RATE_LIMIT_QUEUE_FULL"` schnell abgelehnt, **bevor** er überhaupt `limiter.schedule()` erreicht — die Ablehnung ist also günstig und erfolgt vor jeglicher nachgelagerter Prompt-Komprimierungs- / Übersetzungsarbeit für diesen Request. Standard `0` = deaktiviert, wodurch das bisherige Verhalten mit unbegrenzter Warteschlange erhalten bleibt; begrenzt auf 0–100000. Überschreiben via `RATE_LIMIT_MAX_QUEUE_DEPTH` (Env) oder `resilienceSettings.requestQueue.maxQueueDepth` (Dashboard/API-Patch).

Die Zulassungsprüfung selbst ist eine reine Funktion (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), sodass sie ohne echten Bottleneck-Limiter unit-testbar ist.

> Das RFC, mit dem #6593 eröffnet wurde, schlug außerdem ein
> `bypassCompressionOnRateLimit`-Flag vor. Die
> `open-sse/services/compression/`-Pipeline dieses Repos ist eine
> Prompt-/Kontext-Komprimierung auf der ausgehenden LLM-Anfrage (`chatCore.ts`,
> rund um den `resolveCompressionSettings`/`selectCompressionStrategy`-Block),
> keine HTTP-Antwortkomprimierung auf synthetisierten 429-Bodies — es gibt
> keinen passenden Codepfad für ein wörtliches Bypass-Flag. Dieser
> Prompt-Komprimierungsschritt läuft zudem aktuell _vor_ `withRateLimit()` in
> der Request-Pipeline, sodass eine Umstellung, um ihn bei einer
> Queue-voll-Ablehnung zu überspringen, eine separate, größere Änderung ist als
> der Umfang dieses Issues; sie wurde hier bewusst **nicht** implementiert und
> bleibt als Follow-up offen, falls der CPU-Einsparungsgewinn das
> Umstellungsrisiko wert ist.

### Rate-Limit-Auto-Aktivierungs-Schutznetz & Verbindungsschutz (`rateLimitProtection`)

**Auto-Aktivierungs-Schutznetz** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, Standard `true`):
Standardmäßig aktiviert OmniRoute automatisch den Rate-Limit-Warteschlangenschutz für alle aktiven API-Key-Provider-Verbindungen (`getProviderCategory(provider) === "apikey"`). Dadurch wird sichergestellt, dass eingehende Anfragen an ratenempfindliche Upstream-API-Keys über Bottleneck in eine Warteschlange gestellt und gedrosselt werden, statt in Upstream-429-Fehler auszuarten. Das Schutznetz kann über die Umgebungsvariable `RATE_LIMIT_AUTO_ENABLE` überschrieben werden (`false`/`0`/`off` deaktiviert, `true`/`1`/`on` erzwingt die Aktivierung), wobei diese Vorrang vor der persistierten Dashboard-Einstellung hat (**Einstellungen → Resilience** / `PATCH /api/resilience`).

**Semantik des verbindungsbezogenen `rateLimitProtection`:**
Der verbindungsbezogene Rate-Limit-Schutz wird über das boolesche Feld `rateLimitProtection` auf Provider-Verbindungen verfolgt (persistiert als `rate_limit_protection` in SQLite):

- **Explizit an (`rateLimitProtection === true`)**: Der Rate-Limit-Schutz ist für diese Verbindung explizit aktiviert, unabhängig von der Provider-Kategorie oder davon, ob das Auto-Aktivierungs-Schutznetz eingeschaltet ist.
- **Explizit aus (`rateLimitProtection === false`)**: Deaktiviert den expliziten Schutz, nimmt eine aktive API-Key-Verbindung jedoch **nicht** aus dem globalen Auto-Aktivierungs-Schutznetz heraus. In `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) sind `false` und `undefined` äquivalent: Nur `rateLimitProtection === true` wird als explizites Override behandelt. Wenn `rateLimitProtection` `false` (oder nicht gesetzt) ist, erfüllt eine aktive API-Key-Verbindung weiterhin die Auto-Aktivierungs-Bedingung und bleibt Rate-Limit-geschützt.
- **Kein verbindungsbezogenes Opt-out**: Ein Operator kann aktuell nicht ausdrücken, dass „diese einzelne aktive API-Key-Verbindung ohne Rate-Limit-Warteschlangenschutz laufen muss“, während die Auto-Aktivierung für andere aktiv bleibt. Um API-Key-Verbindungen vollständig ohne Rate-Limit-Warteschlangen zu betreiben, muss das Schutznetz global deaktiviert werden (`RATE_LIMIT_AUTO_ENABLE=false` oder `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Unterstützte Schreibpfade:**

- **`POST /api/rate-limits`**: Der unterstützte Verwaltungs-Schreibpfad, um `rateLimitProtection` für eine Verbindung umzuschalten (`{ connectionId: string, enabled: boolean }`). Ein Aufruf mit `enabled: true` aktiviert den expliziten Schutz; ein Aufruf mit `enabled: false` entfernt den expliziten Schutz (aktive API-Key-Verbindungen bleiben jedoch durch das globale Schutznetz abgedeckt, wenn die Auto-Aktivierung eingeschaltet ist).
- **`PUT /api/providers/[id]`**: Akzeptiert bzw. ändert `rateLimitProtection` bewusst **nicht** (#11278). Das Aktualisieren von Provider-Verbindungsmetadaten über `PUT /api/providers/[id]` ändert niemals den persistierten Rate-Limit-Schutzstatus.

---

## 6. Watchdog für langsamen Stream-Durchsatz (#9709)

Der optionale `resilienceSettings.streamRecovery.throughputWatchdog` Guard erkennt einen Upstream, der immer noch Chunks sendet, aber eine Assistentenausgabe erzeugt, die unter der konfigurierten Nutzausgaberate liegt. Es unterscheidet sich bewusst vom Leerlauf-Timeout: Heartbeats und Metadaten setzen keinen Timer zurück und zählen nicht als Fortschritt. Es unterscheidet sich auch von der harten Versuchsfrist (#9153), die unabhängig von der Ausgabequalität eine absolute Sicherheitsobergrenze bleibt.

Der Watchdog benötigt eine Aufwärmphase, gefolgt von einem vollständigen Rollfenster, bevor er abbrechen kann. Es zählt Textdeltas aus Chat-Abschlüssen und -Antworten API Ausgabeereignissen (ein konservativer UTF-8 Byte-Proxy), ignoriert Nur-Nutzungs- und leere Ereignisse und setzt die Beurteilung aus, während Tool-Call- oder Reasoning-Ereignisse aktiv sind. Es ist standardmäßig deaktiviert und kann mit `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` aktiviert werden (dieser env-Wert setzt nur den Standard — ein gespeicherter boolescher `resilienceSettings.streamRecovery.throughputWatchdog.enabled` -Wert gewinnt; siehe den Hinweis zur Priorität „env-vs-dashboard“ oben in diesem Handbuch); Das Fenster, die Aufwärmphase, die Mindestrate und die minimale messbare Leistung werden durch die normale Normalisierungsschicht der Belastbarkeitseinstellungen begrenzt.

Wenn diese Option aktiviert ist, wird ein Watchdog-Abbruch nur auf den aktiven Upstream-Versuch angewendet. Vor allen für den Client sichtbaren Bytes kann der vorhandene frühe Wiederherstellungspfad für dasselbe Konto den Versuch erneut öffnen. Nach dem Commit wird der Stream nie blind wiedergegeben; Nur der bestehende sichere Mid-Stream-Fortsetzungsvertrag kann ein Suffix hinzufügen. Die Finalisierung erfolgt weiterhin einmalig, sodass die Nutzungsabrechnung und die Semaphorfreigabe nicht dupliziert werden.

---

## 7. Restatement des Upstream-Status (falsch gemeldete Quotenfehler)

**Geltungsbereich:** ein Upstream-Gateway, das eine vorübergehende Quotenerschöpfung mit dem falschen HTTP-Status meldet.

**Zweck:** Korrektur eines irreführenden Status VOR der Klassifizierung, damit nachgelagerte Verbraucher (Fallback-Engine, Combo-Aggregation, clientseitige Antwort) die tatsächliche Wiederholbarkeit des Fehlers erkennen.

Einige Gateways signalisieren eine VORÜBERGEHENDE Quotenerschöpfung mit einem nicht wiederholbaren HTTP-Status. `agentrouter.org` gibt `403` (manchmal `400`) mit einem chinesischen Body
(`用户额度不足` / `额度不足`) anstelle des standardmäßigen `429` zurück. Clients wie Claude
Code behandeln `403` als dauerhaft und brechen die Sitzung ab; ohne Korrektur würde
die Fallback-Engine den Fehler als `AUTH_ERROR` statt als Quotenereignis klassifizieren.

**Implementierung:**

- Registry + Matcher: `open-sse/config/upstreamStatusRestatement.ts` — eine
  Anbieterliste mit Regeln (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), die über `applyStatusRestatement()` abgeglichen werden.
- Aufrufstelle: der Block `providerFailure:` in `open-sse/handlers/chatCore.ts`
  (etwa in Zeile 3654), direkt nachdem `parseUpstreamError()` eine Upstream-
  Antwort mit einem Fehler-HTTP-Status (`!providerResponse.ok`) analysiert hat und
  bevor irgendeine Klassifizierung ausgeführt wird, sodass jeder nachgelagerte Verbraucher
  den korrigierten Status sieht. Fehler, die in einen `200`-SSE-Stream eingebettet sind,
  durchlaufen einen separaten, späteren Stream-Parsing-Pfad und werden heute von diesem Hook
  **nicht** erfasst — eine bekannte Einschränkung, die für den Misstatus von agentrouter
  noch nicht erforderlich ist, da dieser als Fehler-HTTP-Status auftritt.
- Wiederholbarkeit: `429` ist in `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) enthalten, sodass ein
  umformulierter Fehler ein echtes Wiederholungsfenster trägt, statt als nicht
  wiederholbarer `403` sichtbar zu werden.
- Das synthetische `60s`-`defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  ist nur das, was die umformulierte Antwort dem **Client** mitteilt; es ist nicht selbst
  die interne Abkühlungs-/Sperrdauer der Verbindung — diese wird separat von dem Mechanismus
  gesteuert, der den umformulierten Fehler tatsächlich verarbeitet
  (Connection Cooldown mit ansteigendem Backoff, §2, Basiswert `3s` für API-Key-
  Anbieter; oder Model Lockout, §3, für Anbieter mit kontingentbezogenem Modelllimit
  wie agentrouter). Der Router kann intern früher wieder für einen Versuch berechtigt sein
  als nach dem gegenüber dem Client angekündigten 60-Sekunden-Fenster — beabsichtigter
  Spielraum, kein Fehler.

Dauerhafte Fehler (`无权访问模型` von agentrouter — kein Zugriff auf dieses Modell) werden
NIEMALS umformuliert: `excludeMarkers` hebt die Regel selbst dann auf, wenn
`textMarkers` zutreffen, sodass der Fehler seinen ursprünglichen Status behält und nicht
auf unbestimmte Zeit wiederholt wird. Die passende Anbieterklassifizierungsregel
(`agentrouter-model-access-denied` in `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, eine deklarierte Basisabkühlung von `6h`) wird von
`checkFallbackError` (`open-sse/services/accountFallback.ts`)
_vor_ dem generischen frühen Rücksprung der API-Key-Kategorie `FORBIDDEN` konsultiert,
gesteuert durch `honorsRuleLockScope(provider)` (#10334 — derzeit ausschließlich für
agentrouter über die Allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` in
`providerErrorRules.ts`). Die deklarierte Abkühlung von 6 Stunden der Regel fließt als
`fallbackResult.baseCooldownMs` ein, wird aber weiterhin dem bereits vorhandenen
Sperrpfad für kontingentbezogene Modelle zugeführt
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, durch #10334 nur hinsichtlich der Quelle der Abkühlung
geändert): Sie wird wie jede andere Modellsperre auf `mlSettings.maxCooldownMs` des
Betreibers begrenzt (Standardwert `1_800_000ms` / 30 Minuten), und der _persistierte
Sperrgrund_ bleibt der bereits vorhandene fest codierte Wert `"forbidden"` und nicht
der `"auth_error"` der Regel — durchgängig wird nur die Abkühlungsdauer berücksichtigt,
nicht die Begründungszeichenfolge. Die Verbindung selbst bleibt aktiv; Schwester-
modelle auf derselben Verbindung sind nicht betroffen.

Umformulierte Quotenfehler (`额度不足`) erreichen in der Produktion eine Anbieterregel
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, keine eigene deklarierte Abkühlung — der skalierte Standard-Backoff
der Persistenzschicht wird angewendet). Seit #10334 wird `scope` auf
`ProviderErrorRuleMatch` END-TO-END verwendet, jedoch **nur** für Anbieter in der
Allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
heute nur `"agentrouter"`, gesteuert über `honorsRuleLockScope()`). Für jeden anderen
Anbieter bleibt `scope` rein informativ, genau wie vor #10334.
`checkFallbackError` gibt den Scope der zutreffenden Regel als
`fallbackResult.ruleScope` weiter; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ist die gemeinsame Prüfung, die bestätigt, dass ein
`ruleScope` tatsächlich sicher als verbindungsweites, selbstheilendes Signal
berücksichtigt werden kann (Scope `"connection"`, Grund `quota_exhausted`, niemals
`permanent`, niemals `creditsExhausted` — eine Absicherung gegen eine zukünftige
Kombination des Scopes `"connection"` mit einem dauerhaften Kontostatus). Zwei
Verbraucher rufen sie auf:

- **Persistenz** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  statt in den **pro Modell** geltenden Sperrzweig des Passthrough-Providers zu fallen
  (agentrouter ist `passthroughModels: true` → `hasPerModelQuota()`
  gibt `true` zurück), wird eine **temporäre Verbindungsabkühlzeit** angewendet —
  `testStatus: "unavailable"` + `rateLimitedUntil`, niemals ein finaler Status
  (`credits_exhausted`/`banned`/`expired`) — sodass sich die Verbindung selbst
  wieder erholt, sobald die Abkühlzeit abgelaufen ist, anstatt ein manuelles
  Zurücksetzen der Zugangsdaten zu erfordern.
  Für Verbindungen mit `disableCooling: true` (#2997) wird dies übersprungen:
  Diese Opt-out-Einstellung fällt stattdessen in die Sperre pro Modell zurück
  (ein dokumentierter Kompromiss — siehe den Codekommentar oberhalb des Zweigs).
- **Combo-Routing innerhalb derselben Anfrage** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): Der gleiche Guard markiert die
  Verbindung im In-Memory-Set `exhaustedConnections`, mit dem Schlüssel
  `${provider}:${connectionId}`. Dadurch wird nur ein verbleibendes Ziel
  INNERHALB DERSELBEN ANFRAGE übersprungen, das _selbst bereits genau diese
  `connectionId`_ in seinem eigenen Zielobjekt trägt
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` vor der Suche in `exhaustedConnections`) — ein einfaches
  Combo aus einer Modellliste, bei dem die Geschwisterziele keine eigene
  festgelegte `connectionId` tragen und jeweils erst pro Dispatch anhand des
  Headers `X-OmniRoute-Selected-Connection-Id` der Antwort aufgelöst werden,
  trifft niemals auf diesen Schlüssel zu. Für diesen häufigen Fall ist der
  tatsächliche Schutz davor, dass ein verbleibender Schritt das gerade
  erschöpfte Konto erneut verwendet, NICHT dieses Set — sondern die oben
  beschriebene Persistenzschicht (`rateLimitedUntil` der Verbindung liegt nun
  in der Zukunft) in Kombination damit, dass derselbe Guard
  `transientRateLimitedProviders` für den Fehler unterdrückt (siehe
  „Zweistufiges Design“ und den Codekommentar zum
  `isAgentrouterConnectionQuotaScope`-Zweig in `targetExhaustion.ts`): Da das Set
  nicht markiert wird, greift das erzwungene Zulassen durch
  `allowRateLimitedConnection` in `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) für die verbleibenden
  Schritte des Providers NICHT. Dadurch wird der Filter von
  `rateLimitedUntil` bei der Zugangsdaten-Auswahl (`src/sse/services/auth.ts:1238`)
  normal berücksichtigt, und ein verbleibender Schritt wählt entweder eine
  andere, weiterhin zulässige agentrouter-Verbindung aus oder schlägt mit
  nicht verfügbaren Zugangsdaten fehl — er erzwingt nicht die Rückkehr zu der
  Verbindung, die dieser Zweig gerade in die Abkühlung versetzt hat.

### Zweistufiges Design: Status-Neufassung, dann Klassifizierung

Die Status-Neufassung (`upstreamStatusRestatement.ts`) und die Regeln für die
Provider-Klassifizierung (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) sind separate Registries, die beide anhand der
Provider-ID und von Textmarkern arbeiten, aber an unterschiedlichen Stellen
ausgeführt werden und unterschiedlichen Zwecken dienen: Die Neufassung schreibt
den HTTP-Status früh in `chatCore.ts` um; die Klassifizierungsregeln wählen den
Fallback-`reason` und sperren den Geltungsbereich `scope`
(`model` / `provider` / `connection`) innerhalb von `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Klassifizierungsregeln sehen für Provider, die in der Allowlist
`FULL_TEXT_RULE_PROVIDERS` in `providerErrorRules.ts` aufgeführt sind, nur den
vollständigen Fehlertext (erforderlich, um Body-Marker wie `额度不足` abzugleichen)
— derzeit nur `"agentrouter"`. Für jeden anderen **integrierten Provider aus dem
Katalog** übergibt `checkFallbackError` an `getProviderErrorRuleMatch` nur den
strukturierten Fehler (`{code, type}`), was für Regeln auf Header-/Status-/
Code-Basis ausreicht, aber gegenüber Markern im Body-Text blind ist. Der Helfer
`resolveRuleMatchBody()` führt diese Auswahl durch: vollständiger Fehlertext für
Provider in der Allowlist, andernfalls der strukturierte Fehler. Das Hinzufügen
eines **integrierten** Providers zu `FULL_TEXT_RULE_PROVIDERS` ist ein
ausdrückliches Opt-in pro Provider — dadurch bleibt der Standardpfad für jeden
nicht in der Liste enthaltenen Provider Byte für Byte unverändert.

Der `scope` einer Regel (`model` / `provider` / `connection`) ist ein
separates Opt-in von `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` gibt ihn
nur als `fallbackResult.ruleScope` weiter, und nachgelagerte Consumer
berücksichtigen ihn nur dann als etwas anderes als eine informative Bezeichnung,
wenn der Provider in der Allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` in
derselben Datei enthalten ist (gesteuert über `honorsRuleLockScope()` — derzeit
nur `"agentrouter"`). Siehe oben „Neugefasste Quota-Fehler“ für eine
Beschreibung dessen, was ein Treffer mit `scope: "connection"` bewirkt, sobald
ein Provider in dieser Allowlist enthalten ist.

**#11104 — vom Betreiber deklarierte Regeln umgehen beide Allowlists.** Ein
Betreiber kann zur Laufzeit über `settings.providerErrorRules` eine Regel pro
Provider deklarieren (`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`),
ohne diese Datei zu bearbeiten. Eine vom Betreiber definierte Regel hinter
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — Allowlists, die
dazu dienen, das **Standardverhalten** der integrierten Katalogregeln zu
schützen — zu begrenzen, würde den Einstellungsmechanismus für jeden Provider
außer den bereits dort aufgeführten unwirksam machen, da die Deklaration der
Regel bereits das ausdrückliche Opt-in des Betreibers darstellt.
`resolveRuleMatchBody()` und `honorsRuleLockScope()` prüfen beide zuerst
`hasOperatorRuleForProvider()`: Ein Provider mit einer vom Betreiber definierten
Regel erhält den ungekürzten Fehlertext, und sein deklarierter `scope` wird
berücksichtigt, unabhängig davon, ob er zusätzlich in einer der beiden
Allowlists enthalten ist.

**Vom Betreiber deklarierte Regeln** (`OperatorProviderErrorRule`): Jede Regel
verfügt über ein optionales `status` und ein optionales `match` (eine einfache,
nicht zwischen Groß- und Kleinschreibung unterscheidende Teilzeichenfolge des
Fehlertexts, niemals ein RegExp, sodass sie kein ReDoS verursachen kann) und
muss mindestens eines der beiden Felder setzen. Wenn beide gesetzt sind, werden
sie mit UND verknüpft; ein ausgelassenes Feld passt auf alles, sodass
`{match: "insufficient_quota"}` auf jeden Status passt, der diesen Code enthält.
Die erste passende Regel wird verwendet. `cooldownMs` akzeptiert höchstens
30 Tage; insgesamt sind maximal 50 Regeln zulässig.

**Auffang-Standards** (`settings.providerErrorDefaults`, optional aktivierbar, gesetzt über
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
mit `cooldownMs` von 1 Minute bis 30 Tage. Ein Standardwert wird nur angewendet, wenn
weder eine Operator-Regel noch eine integrierte Katalogregel übereinstimmt, und nur bei
402-, 403-, 408-, 429- und 5xx-Fehlern. Fehler in der Anfrageform (400, 404, 409, 413, 422)
und ungeschminkte 401-Fehler behalten ihre eigene Behandlung. Ohne expliziten `reason`
stammt der Grund aus dem Status, genauso wie bei `classifyError`. Das Deklarieren eines
Standardwerts zählt für `hasOperatorRuleForProvider()` als Operator-Regel, daher wird sein
`scope` (Standard: `"connection"`) berücksichtigt. Die effektive Abklingzeit eines
Standardwerts ist der längere Wert aus `cooldownMs` und dem eigenen Retry-Hinweis des
Providers (`Retry-After`, `x-ratelimit-reset` oder ein Reset-Hinweis im Body — derselbe
Hinweis, den die Engine berücksichtigt, wenn die Einstellung „Upstream-Retry-Hinweise
verwenden“ für das Verbindungs-Cooldown aktiviert ist). Ein Standardwert kann daher einen
kurzen Upstream-Hinweis verlängern, aber einen echten Reset niemals verkürzen. Eine
explizite Operator-Regel behält ihr exaktes `cooldownMs`. Weder eine Regel noch ein
Standardwert umgeht die Guards für das Verbindungs-Cooldown in `markAccountUnavailable`:
Ein aktives, längeres Cooldown wird niemals verkürzt und ein terminaler Status niemals
überschrieben. Die integrierten Texterkennungen, die früher in `checkFallbackError`
ausgeführt werden (Credits erschöpft, Tageskontingent, Konto deaktiviert), haben für ihre
eigenen Formulierungen weiterhin Vorrang.

**Bekannte Lücke — `providerRuleRegistry` wird für HTTP 400 nie abgefragt.**
Der `BAD_REQUEST`-Zweig von `checkFallbackError` klassifiziert Status 400 vollständig über
seine eigenen Muster-Arrays (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` usw. in `accountFallback.ts`) und gibt eine Rückgabe aus,
bevor der darüberliegende Zweig `configuredRule`/`getProviderErrorRuleMatch` erreicht wird.
Eine integrierte Katalogregel (oder eine Operator-Regel) mit `status: 400` ist syntaktisch
gültig, wird aber nie ausgelöst. Derzeit zielt keine bestehende Regel auf 400, daher ist
die Produktion nicht betroffen — eine zukünftige 400-Regel erfordert jedoch zunächst eine
Änderung an diesem Zweig. Das ist eine größere Änderung als das Hinzufügen einer Regel,
da dadurch 400 für jeden Provider, der bereits auf das Verhalten der Muster-Arrays
angewiesen ist, neu klassifiziert würde, und liegt außerhalb des Umfangs einer einzelnen
providerbezogenen Regelerweiterung.

### Hinzufügen eines neuen Gateways mit falsch angegebenem Kontingent

1. Registriere ein Regel-Array in `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Halte `textMarkers`
   providerspezifisch; verwende niemals allgemeine englische Formulierungen erneut, die
   mit `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) kollidieren.
2. Optional können Klassifizierungsregeln in
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) registriert werden,
   um den passenden Sperrbereich auszuwählen (`connection` für kontoweite Kontingente,
   `model` für Fehler einzelner Modelle). Dieser Schritt wirkt sich in der Produktion
   nur bei Providern aus, deren Regeln den vollständigen Fehlertext benötigen
   (Body-Marker): Füge die Provider-ID in derselben Datei zu
   `FULL_TEXT_RULE_PROVIDERS` hinzu — andernfalls übergibt `checkFallbackError` der Regel
   nur den strukturierten Fehler `{code, type}`, und eine Body-Text-Regel wird im
   Live-Verkehr niemals übereinstimmen. Regeln, die ausschließlich auf
   `status`/`headers` übereinstimmen (wie die von Opencode oder Minimax), benötigen diese
   Aktivierung nicht. Wenn die Regel außerdem `scope: "connection"` angibt und tatsächlich
   ein kontoweites Cooldown plus das Überspringen derselben Anfrage-Kombination gemeint ist
   (nicht nur ein informatives Label), füge die Provider-ID in derselben Datei zu
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` hinzu — dies steuert die Verwendung im Stil von
   `isAgentrouterConnectionQuotaScope()` in `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) und `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); ohne diese Aktivierung wird `scope`
   weiterhin über `fallbackResult.ruleScope` weitergereicht, aber nichts reagiert darauf.
3. Füge Unit-Tests hinzu, die `tests/unit/upstream-status-restatement.test.ts`
   und `tests/unit/agentrouter-error-rules.test.ts` entsprechen (einschließlich der
   Guards für „nicht dauerhaft“ / „nicht `creditsExhausted`“ sowie — falls der Provider
   die Allowlist benötigt — eines Tests, der bestätigt, dass
   `resolveRuleMatchBody()` den vollständigen Text nur für diesen Provider zurückgibt).

Keine Änderungen an `chatCore.ts`, `classifyError` oder combo sind erforderlich.

#### Egress-basierte Sperre nach Buckets (#10880)

Provider in `EGRESS_BUCKETED_LOCK_PROVIDERS` (die Opencode-Familie) werden als
Upstream mit IP-Bucket-Zuordnung behandelt (der kostenlose Opencode-Tarif ist
IP-basiert, nicht kontobasiert — siehe #9611): Ein als `quota_exhausted` **oder**
`rate_limit_exceeded` klassifizierter Status-429 setzt für jede Verbindung der
Allowlist-Familie, deren zuletzt bekannte Egress-IP mit der der fehlschlagenden
Verbindung übereinstimmt, ein Cooldown, bevor die Rotation sie ausprobieren kann
— dadurch werden N-1 garantiert fehlschlagende Upstream-Aufrufe vermieden (dieselbe
Struktur wie bei #10460/#10525). `rate_limit_exceeded` ist absichtlich enthalten:
Auf dem Pfad `markAccountUnavailable` greifen die Opencode-spezifischen Regeln nie
(keine Header/kein Body werden an `checkFallbackError` übergeben, Opencode ist nicht in
`FULL_TEXT_RULE_PROVIDERS`), sodass ein 429, dessen Body den Text zum
Abonnementkontingent („monatliches Nutzungslimit erreicht“) enthält, durch den
Kontingent-Text-Fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`;
1-Stunden-Cooldown) als `quota_exhausted` klassifiziert wird, bevor die
`status_429`-Regel überhaupt erreicht wird — während ein 429 ohne Kontingenttext
(gewöhnliche Ratenbegrenzung) über die `status_429`-Regel als `rate_limit_exceeded`
klassifiziert wird und die IP-Familie weiterhin mit einem Cooldown belegt. Für einen
Provider auf der Allowlist ist eine IP-basierte Ratenbegrenzung dasselbe Signal wie ein
erschöpftes Kontingent. Faire Grenzen:

- **Best effort**: Die Sperre löst die zuletzt bekannte `egress_ip` der Verbindung aus `proxy_logs` auf (24-Stunden-Fenster, synchron, ohne Cache). Cold Cache (die Egress-IP wurde nie abgefragt) oder keine Zeile → die fehlschlagende Verbindung wird durch den Branch weiterhin in den Cooldown versetzt (wie heute aufgezeichnet), nur kein Geschwister wird gesperrt.
- **Nie endgültig**: Der Cooldown ist ein sich erneuerndes Quotenfenster (`testStatus: "unavailable"`); aus einem Signal auf IP-Ebene wird nie ein permanenter Zustand abgeleitet. Verbindungen mit `disableCooling` überspringen den Branch vollständig.
- **Die Sperrgranularität ändert sich für die Allowlist-Familie**: Dies ist eine Änderung des Geltungsbereichs, nicht nur eine Optimierung für Geschwister. opencode ist ein `passthroughModels`-Provider, daher führte ein 429 vor diesem Branch zu einer Sperre pro MODEL; nun führt es zu einem Verbindungs-Cooldown — auch für einen Operator, der nur eine einzelne Verbindung ohne Geschwister betreibt. Das ist die Granularität, die die opencode-Regeltabelle bereits als korrekt deklariert (`scope: "connection"`, `providerErrorRules.ts`), die bisher jedoch nie berücksichtigt wurde, weil opencode nicht in `HONORS_RULE_LOCK_SCOPE_PROVIDERS` enthalten ist. Der Branch schreibt den Cooldown und `backoffLevel` der fehlschlagenden Verbindung selbst, analog zum verbindungsbezogenen agentrouter-Branch, und kehrt zurück — die Blockierung pro Model und der generische Pfad darunter werden nie erreicht.
- **Combo eingeschlossen**: Wie beim agentrouter-Branch ignoriert der Geltungsbereich bewusst die Herabstufung durch `persistUnavailableState`/`isCombo`, die ein Combo-Aufrufer auf einen 429 anwendet. Eine Sperre pro Model ist keine schwächere Form dieses Geltungsbereichs, sondern die falsche Einheit: Sie sagt nichts über die erschöpfte IP aus, sodass die Combo-Rotation weiterhin einen garantiert fehlschlagenden Aufruf pro Geschwister verbrauchen würde.
- **Sicherheit der Geschwister**: Ein Geschwister, das bereits einen endgültigen Zustand hat (banned/credits_exhausted) oder sich bereits in einem längeren Cooldown befindet, wird nie überschrieben.
- **Exklusive Allowlist**: Die Erweiterung von `EGRESS_BUCKETED_LOCK_PROVIDERS` ist eine ausdrückliche Entscheidung des zuständigen Owners; es gibt keine generische Verdrahtung (Muster #10334/#10419). Die Geschwisterabfrage bindet dieselbe Allowlist, statt sie als SQL-Literal zu wiederholen, sodass ihre Erweiterung eine Änderung an nur einer Zeile bleibt.
- **Rotation der Egress-IP in beide Richtungen**: Das Abfragefenster (24 Stunden) ist deutlich größer als die TTL des Egress-IP-Caches (5 Minuten), daher ist die „zuletzt bekannte IP“ Historie und kein aktueller Zustand. Wenn der Proxy einer Verbindung innerhalb des Fensters rotiert ist, kann die Sperre eine tatsächlich gemeinsam genutzte IP **verfehlen** (die aufgezeichnete IP ist die neue, noch nicht erschöpfte) — und symmetrisch dazu kann sie ein Geschwister abkühlen, das inzwischen von der erschöpften IP **wegrotiert** ist. Der zweite Fall kostet dieses Geschwister ein Cooldown-Fenster; beide Fälle werden als akzeptierte Best-Effort-Einschränkungen einer historienbasierten Abfrage betrachtet.
- **Kosten**: Zwei begrenzte Scans von `proxy_logs` (über `idx_pl_timestamp` nach Zeitfenster gefiltert), nur bei 429-Häufigkeit. Kein neuer Index (Migration 134 YAGNI). Gemessen an einer Kopie einer Datenbank mit echtem Datenverkehr und mittlerer Größe; eine Instanz mit hohem Durchsatz enthält im selben Fenster proportional mehr Zeilen.

## Weitere Resilienzfunktionen

- **22 Routing-Strategien** (Priorität, gewichtet, Round-Robin, Kontext-Relay, Fill-First, P2C, zufällig, am wenigsten verwendet, kostenoptimiert, Reset-fähig, Reset-Fenster, Ablauf-zuerst, Headroom, Quotengewichtet, strikt-zufällig, automatisch, lkgp, kontextoptimiert, Cache-optimiert, Fusion, Pipeline, Jev) — siehe [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Reset-fähiges Routing** (v3.8.0) — priorisiert Verbindungen nach der Zeit zum Zurücksetzen des Kontingents.
- **Verschlechterung des Hintergrundmodus** — -Antworten API `background: true` wurden zur Synchronisierung mit Warnung herabgestuft.
- **Dynamische Erkennung der Werkzeuggrenzen** — zieht sich von Anbietern zurück, wenn Grenzwerte für die Werkzeuganzahl erreicht werden.
- **Notfall-Fallback** — wird von `OMNIROUTE_EMERGENCY_FALLBACK` gesteuert; Operatoren können es auf der Seite „Feature Flags“ ohne Neustart überschreiben.

---

## Debugging

- Eine Weighted-Combo antwortet mit `503 all_targets_cooling_down` (`Retry-After` gesetzt, `diagnostics.excluded` listet jedes Ziel mit `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → der Pool ist konfiguriert und verbunden, jedes Ziel ist lediglich durch einen Resilienz-Timer ausgeschlossen; die Warnung `[COMBO] Weighted selection: every target excluded before dispatch — …` nennt die Gründe und die verbleibenden Sekunden. Ein `404 no_executable_targets` derselben Combo bedeutet, dass kein Resilienz-Timer beteiligt war (nichts auszuführen, oder jedes Konto hat die Verfügbarkeitsprüfung nicht bestanden). Implementiert in `open-sse/services/combo/pinRecovery.ts` aus den in `targetResolution.ts` gesammelten Ausschlüssen.
- Alle Schlüssel eines Providers übersprungen → sowohl den Circuit-Breaker-Status ALS AUCH `rateLimitedUntil`/`testStatus` jeder Verbindung prüfen.
- Provider nach dem Reset-Fenster dauerhaft ausgeschlossen → Code liest das rohe `state` statt `getStatus()`/`canExecute()`.
- Ein Schlüssel schlägt fehl, andere sollten funktionieren → Connection-Cooldown dem Circuit Breaker vorziehen.
- Nur ein Modell schlägt fehl → Model-Lockout dem Connection-Cooldown vorziehen.
- Status sollte sich von selbst erholen, tut es aber nicht → auf einen zukünftigen Zeitstempel prüfen + auf einen Lesepfad, der abgelaufenen Status aktualisiert. Permanente Status erfordern manuelle Änderungen.

---

## Laufzeitstatus — Kurzreferenz für Agents

> Wörtlich aus `AGENTS.md` → „Resilience Runtime State" (PR #12743) verschoben, damit der
> Agent-Leitfaden unter dem 40k-Kontextbudget bleibt. Es ist die komprimierte, an Agents
> gerichtete Ansicht der obigen Abschnitte; die nummerierten Abschnitte bleiben die
> vollständige Referenz.

OmniRoute verfügt über drei verwandte, aber unterschiedliche Mechanismen für temporäre
Fehler. Halten Sie deren Geltungsbereiche beim Debuggen des Routing-Verhaltens getrennt.
Siehe das [3-Schichten-Resilienzdiagramm](../diagrams/exported/resilience-3layers.svg)
(Quelle: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
für eine Übersicht auf einen Blick.

### Provider Circuit Breaker

**Geltungsbereich**: gesamter Provider, z. B. `glm`, `openai`, `anthropic`.

**Zweck**: den Traffic zu einem Provider stoppen, der auf Upstream-/Service-Ebene wiederholt
fehlschlägt, damit ein fehlerhafter Provider nicht jede Anfrage verlangsamt.

**Implementierung**:

- Kernklasse: `src/shared/utils/circuitBreaker.ts`
- Chat-Gate-/Ausführungsverdrahtung: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Laufzeit-Status-API: `src/app/api/monitoring/health/route.ts`
- Gemeinsame Wrapper: `open-sse/services/accountFallback.ts`
- Persistierte Statustabelle: `domain_circuit_breakers`

**Zustände** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normaler Traffic ist erlaubt.
- `DEGRADED`: Frühwarnband — Fehler haben die Degradierungsschwelle überschritten, aber noch
  nicht die Breaker-Schwelle; der Traffic fließt weiter, Dashboards zeigen die Warnung. Ein
  gültiger Verbindungstest oder ein ruhiges Fenster ohne neue Fehler setzt den Zustand auf
  `CLOSED` zurück (`docs/architecture/RESILIENCE_GUIDE.md` enthält das Fenster).
- `OPEN`: Der Provider ist vorübergehend blockiert; Aufrufer erhalten eine
  Provider-Circuit-Open-Antwort oder das Combo-Routing springt zu einem anderen Ziel.
- `HALF_OPEN`: Der Reset-Timeout ist abgelaufen; eine Testanfrage wird zugelassen. Erfolg
  schließt den Breaker, ein Fehlschlag öffnet ihn erneut.

**Standardwerte** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, konsumiert über
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` in `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` in `src/sse/handlers/chatHelpers.ts`). Der Breaker für den
gesamten Provider läuft über `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil        | degradiert bei | öffnet bei (`circuitBreakerThreshold`) | Reset (`circuitBreakerReset`) |
| ------------- | -------------: | -------------------------------------: | ----------------------------: |
| OAuth         |            `5` |                                    `8` |                         `60s` |
| API-Schlüssel |            `7` |                                   `12` |                         `30s` |
| Lokal         |   (abgeleitet) |                                    `2` |                         `15s` |

`PROVIDER_PROFILES` definiert außerdem `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) und `providerCooldownMs` (5/10/1 min): Diese steuern
das **Fenster-Gate des optionalen globalen Provider-Cooldowns** (`PROVIDER_COOLDOWN_ENABLED`,
standardmäßig aus) — ein Eintrag auf Provider-Ebene in
`open-sse/services/providerCooldownTracker.ts` gilt erst nach `providerFailureThreshold`
Fehlern innerhalb von `providerFailureWindowMs` als abkühlend und kühlt dann für
`providerCooldownMs` ab. Sie sind NICHT die Schwellenwerte des aktiven Breakers — tunen Sie
sie nicht in der Erwartung von Breaker-Verhalten. Jeder Standardwert kann über die
Umgebungsvariablen `OMNIROUTE_PROVIDER_BREAKER_*` und `OMNIROUTE_CIRCUIT_BREAKER_*`
überschrieben werden; die laufzeitgenaue Referenztabelle liegt in
`docs/architecture/RESILIENCE_GUIDE.md`.

Nur Fehlerstatus auf Provider-Ebene sollten den Provider-Breaker auslösen:

```ts
(408, 500, 502, 503, 504);
```

Lösen Sie den Breaker für den gesamten Provider nicht bei normalen
Konto-/Schlüssel-/Modellfehlern aus, wie bei den meisten `401`-, `403`- oder `429`-Fällen.
Diese gehören üblicherweise zum Connection-Cooldown oder Model-Lockout. Ein generischer
`403` eines API-Schlüssel-Providers sollte wiederherstellbar sein, es sei denn, er wird als
endgültiger Provider-/Kontofehler klassifiziert.

Der Breaker verwendet Lazy Recovery, keinen Hintergrund-Timer. Wenn `OPEN` abläuft, aktualisieren Lesezugriffe wie `getStatus()`, `canExecute()` und `getRetryAfterMs()` den Zustand auf `HALF_OPEN`, sodass Dashboards und Builder für Combo-Kandidaten einen Provider, dessen Sperrung abgelaufen ist, nicht dauerhaft weiter ausschließen.

### Verbindungs-Cooldown

**Geltungsbereich**: eine Provider-Verbindung/ein Konto/ein Schlüssel.

**Zweck**: einen fehlerhaften Schlüssel bzw. ein fehlerhaftes Konto vorübergehend überspringen, während andere Verbindungen desselben Providers weiterhin Anfragen bedienen können.

**Implementierung**:

- Schreib-/Aktualisierungspfad: `src/sse/services/auth.ts::markAccountUnavailable()`
- Kontoauswahl/-filterung: `src/sse/services/auth.ts::getProviderCredentials...`
- Cooldown-Berechnung: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Einstellungen: `src/lib/resilience/settings.ts`

Wichtige Felder auf Provider-Verbindungen:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Während der Kontoauswahl wird eine Verbindung übersprungen, solange:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowns sind ebenfalls lazy ausgelegt: Wenn `rateLimitedUntil` in der Vergangenheit liegt, wird die Verbindung wieder auswählbar. Bei erfolgreicher Nutzung setzt `clearAccountError()` die Felder `testStatus`, `rateLimitedUntil`, die Fehlerfelder und `backoffLevel` zurück.

Standardverhalten des Verbindungs-Cooldowns:

- OAuth-Basis-Cooldown: `5s`.
- API-Schlüssel-Basis-Cooldown: `3s`.
- Bei `429` eines API-Schlüssels sollten Upstream-Wiederholungshinweise (`Retry-After`, Reset-Header oder parsbarer Reset-Text) bevorzugt werden, sofern verfügbar.
- Wiederholte behebbare Fehler verwenden exponentielles Backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Der Schutz gegen den Thundering-Herd-Effekt verhindert, dass gleichzeitig auftretende Fehler auf derselben Verbindung den Cooldown wiederholt verlängern oder `backoffLevel` doppelt erhöhen.

Terminale Zustände sind keine Cooldowns. `banned`, `expired` (das erst nach N begrenzten Wiederholungen über `EXPIRED_RETRY_MAX` terminal wird) und `credits_exhausted` sollen so lange nicht verfügbar bleiben, bis sich Zugangsdaten/Einstellungen ändern oder ein Operator sie zurücksetzt. Überschreiben Sie terminale Zustände nicht mit einem transienten Cooldown-Zustand.

### Modell-Sperrung

**Geltungsbereich**: Provider + Verbindung + Modell.

**Zweck**: vermeiden, dass eine ganze Verbindung deaktiviert wird, wenn nur ein Modell für diese Verbindung nicht verfügbar oder kontingentbeschränkt ist.

Beispiele:

- Provider mit Kontingenten pro Modell, die `429` zurückgeben.
- Lokale Provider, die `404` für ein fehlendes Modell zurückgeben.
- Provider-spezifische Modus-/Modell-Berechtigungsfehler, etwa bei ausgewählten Grok-Modi.

Die Modell-Sperrung befindet sich in `open-sse/services/accountFallback.ts` und ermöglicht es derselben Verbindung, weiterhin andere Modelle zu bedienen.

### Hinweise zur Fehlersuche

- Wenn alle Schlüssel eines Providers übersprungen werden, prüfen Sie sowohl den Breaker-Zustand des Providers als auch `rateLimitedUntil`/`testStatus` jeder Verbindung.
- Wenn ein Provider nach dem Reset-Fenster dauerhaft ausgeschlossen erscheint, prüfen Sie, ob Code den rohen `state` liest, anstatt `getStatus()`/`canExecute()` zu verwenden.
- Wenn ein Provider-Schlüssel fehlschlägt, andere aber funktionieren sollten, bevorzugen Sie den Verbindungs-Cooldown gegenüber dem Provider-Breaker.
- Wenn nur ein Modell fehlschlägt, bevorzugen Sie die Modell-Sperrung gegenüber dem Verbindungs-Cooldown.
- Wenn sich ein Zustand selbst erholen soll, sollte er einen zukünftigen Zeitstempel bzw. Reset-Timeout und einen Lesepfad besitzen, der abgelaufene Zustände aktualisiert. Permanente Status erfordern manuelle Änderungen an Zugangsdaten oder Konfiguration.

---

## TLS-Fingerprinting & Stealth

Providerspezifische Stealth-Funktionen (JA3/JA4, CCH, Obfuskation) sind separat dokumentiert — siehe `docs/security/STEALTH_GUIDE.md` (Git; nicht in `/docs` kompiliert).

---

## Resilienztests (Phase 8 · Block C)

Über Unit-Tests für die Resilienzlogik hinaus prüfen drei Tests die Laufzeit unter
realen Stress-/Fehlerbedingungen (alle Integration/Nightly — keiner blockiert PRs):

| Test          | Was                                                                                                                                                                                         | Ausführen                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos         | Ein Fake-Upstream-Node injiziert echte Latenz/Reset/Timeout/503; validiert, dass der Circuit Breaker öffnet/sich erholt und `checkFallbackError` 503 als behebbaren Fallback klassifiziert. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-Wachstum | ~500 Streams pro `createSSEStream` unter `--expose-gc`; schlägt fehl, wenn der Heap über die Obergrenze wächst (OOM-Schutz #3069).                                                          | `npm run test:heap`                      |
| k6-Soak       | Dauerlast gegen `/api/monitoring/health`; p95-/Fehler-Schwellenwerte.                                                                                                                       | `k6 run tests/load/k6-soak.js` (nightly) |

Orchestriert durch `.github/workflows/nightly-resilience.yml` (Cron + Dispatch). Im
standardmäßigen `test:integration` überspringen sich Chaos und Heap selbst (ohne `RUN_CHAOS_INT`/`--expose-gc`).

---

## Siehe auch

- [Architekturleitfaden](./ARCHITECTURE.md) — Systemarchitektur und Interna
- [Benutzerhandbuch](../guides/USER_GUIDE.md) — Provider, Kombos, CLI-Integration
- [Auto-Combo-Engine](../routing/AUTO-COMBO.md) — 16-Faktor-Bewertung, Moduspakete
