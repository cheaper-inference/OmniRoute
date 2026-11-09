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

## 2. Verbindungs-Cooldown

**Geltungsbereich:** einzelne Provider-Verbindung/Account/Schlüssel.

**Zweck:** einen fehlerhaften Schlüssel überspringen, während andere Verbindungen für denselben Provider weiterhin Anfragen bedienen.

**Implementierung:**

- Nicht verfügbar markieren: `src/sse/services/auth.ts::markAccountUnavailable()`
- Auswahl: `getProviderCredentials*` in derselben Datei
- Cooldown-Berechnung: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Einstellungen: `src/lib/resilience/settings.ts`

**Felder pro Verbindung:**

- `rateLimitedUntil` — Zeitstempel, bis der Cooldown abläuft
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — exponentieller Backoff-Zähler

**Standard-Cooldowns:**

- OAuth-Basiswert: 5 s
- API-Key-Basiswert: 3 s
- API-Key 429: bevorzugt vorgelagerte `Retry-After`-/Reset-Header bzw. analysierbaren Reset-Text
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Provider-spezifische Wiederholungsverzögerung.** Die Detailseite des Providers enthält eine Auswahl **Retry delay** (Auto,
15 s bis zu 1 h). Sie speichert `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600 über `PATCH /api/resilience`). Wenn ein Rate-Limit-Fehler keinen vorgelagerten Wiederholungshinweis enthält,
ersetzt dieser Wert den skalierten Backoff für den Provider und setzt `backoffLevel` auf 0 zurück
(`open-sse/services/rotationConfig.ts::overrideFor`). Priorität für einen Rate-Limit-Fehler, absteigend: vorgelagerter
Wiederholungshinweis, dann `providerSpecificData.rotationOverrides.rateLimitResetSeconds` pro Verbindung,
dann die provider-spezifische Wiederholungsverzögerung, dann
`OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, dann der skalierte Backoff. Auto entfernt das Feld. Dies wirkt sich
nur auf den Grund Rate-Limit aus, niemals auf terminale Zustände.

**Schutz vor einer Herde gleichzeitig auftretender Anfragen:** verhindert, dass gleichzeitige Fehler den Cooldown
übermäßig verlängern oder `backoffLevel` doppelt erhöhen.

**429-Fehler aufgrund eines Parallelitätslimits erhöhen nicht die Backoff-Stufe.** Ein `429`, dessen Body ein
Parallelitätslimit meldet („too many concurrent requests“, „concurrency limit“, „parallel request
limit“, GLM `并发数过高`), bedeutet, dass der Account funktionsfähig, aber ausgelastet ist.
`checkFallbackError()` gibt den Grund `concurrency_limited` zurück: sofort zur nächsten Verbindung wechseln, diese
Verbindung für eine feste Dauer von `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) oder bis zum vorgelagerten
Wiederholungshinweis abkühlen, `backoffLevel` unverändert lassen und `skipProviderBreaker` setzen.
Ein expliziter Quota-Body hat weiterhin Vorrang; ein Body, der ebenfalls einem Quota-Muster entspricht, bleibt daher
ein Quota-Befund. Erkennung: `looksLikeConcurrencyLimit()` in `src/shared/utils/classify429.ts`;
Befund: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (der `FailureKind` des
Breakers) bleibt unverändert und liest für diese Bodies weiterhin `rate_limit`.

**Unterbrechungen des Stream-Inhalts kühlen den Account nicht ab.** Wenn der Content-Stall-Watchdog
(`open-sse/utils/streamHandler.ts`) einen Stream abbricht, der innerhalb der vorgegebenen Zeit keine Modellausgabe
gesendet hat, zeichnet `markAccountUnavailable()` den Fehler für die Verbindung auf, setzt jedoch keinen Cooldown:
Die Unterbrechung gehört zu dieser Anfrage und tritt meistens während eines langen Reasoning-Durchlaufs auf, bei dem
noch keine Ausgabe vorliegt. Betreiber können dies mit `resilienceSettings.streamStallCooldown.enabled`
(Standardwert `false`) wieder aktivieren.

**Opt-in-Latenzsignal für die `p2c`-Account-Auswahl.** Jeder verteilte Versuch zeichnet seine Zeit bis zum ersten
Byte und sein Ergebnis pro Verbindung (sowie pro Verbindung + Modell) in einem rollierenden Speicherfenster auf: die
letzten 20 Stichproben innerhalb von 15 Minuten
(`open-sse/services/connectionLatencyTracker.ts`, aufgezeichnet aus `safeLogEvents()` in
`src/sse/handlers/chatHelpers.ts`). Wenn `resilienceSettings.p2cLatency.weight` größer als
`0` ist (Bereich 0–20, Standardwert `0` = deaktiviert), fügt `compareP2CConnections()` in `src/sse/services/auth.ts`
jedem Kandidaten des Paars bis zu `weight` Punkte hinzu. Die Hälfte davon stammt aus der Latenz als Verhältnis zum
schnelleren Kandidaten (die doppelte Dauer entspricht der vollen Hälfte), die andere Hälfte aus der rollierenden
Fehlerrate. Dieser Term wird nur angewendet, wenn beide Kandidaten mindestens 3 Stichproben haben, sodass neue
Accounts nicht benachteiligt werden; seine Obergrenze bleibt unter den Strafen für blockierte und erschöpfte Quotas.
Er fügt keinen eigenen Circuit hinzu: Fehlerhafte Accounts werden weiterhin von den Ebenen für Cooldown, Sperrung und
Breaker behandelt. Setzen Sie ihn mit `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Reasoning-Frames starten das Budget für Inhaltsunterbrechungen neu.** Ein Reasoning-Modell kann Minuten lang
nachdenken, bevor sein erstes sichtbares Token erscheint: Claude streamt `thinking_delta`-Frames, deren
Thinking-Text leer sein kann, und die Responses API streamt ein Reasoning-Element nach dem anderen.
`isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) erkennt diese Frames, und der Watchdog startet
sein Budget bei jedem Frame neu, statt den Durchlauf abzubrechen. Sie sind weiterhin keine Modellausgabe. Daher
wird ein Durchlauf, der nur mit Reasoning endet, weiterhin als leer gemeldet, und ein Durchlauf, der das Reasoning
beendet und nur noch Heartbeats sendet, löst den Watchdog weiterhin aus.

Kiros binäre `reasoningContentEvent`-Frames mit einer nicht leeren Signatur bewahren diese Reasoning-Aktivität
über den Executor hinweg als leeres `reasoning_content`-Delta. Die Signatur wird nicht weitergeleitet.
Metadaten, unvollständige Frames und leere Signaturen starten das Inhaltsbudget nicht neu; das unabhängige Timeout
für aktive Streams und die Abbruchanforderung des Clients gelten weiterhin
(`open-sse/executors/kiro/reasoning.ts`).

**Terminale Zustände (KEINE Cooldowns):**

- `banned` — wird durch die Erkennung verbotener Schlüsselwörter bzw. gesperrter Accounts gesetzt (siehe [BAN_DETECTION](../security/BAN_DETECTION.md)). Vorgelagerte Ablehnungen einzelner Anfragen (`request_rejected`, z. B. Anthropic-OAuth-403 „Request not allowed“) setzen diesen Zustand nie: Sie werden pro Verbindung und Modell gezählt und nehmen dieses Modell mit einem ansteigenden, auf `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) begrenzten Cooldown aus der Rotation oder kühlen die Verbindung ab, wenn kein Modell bekannt ist — `open-sse/services/requestRejectedStreak.ts`
- `expired` (wechselt nach begrenzten Wiederholungsversuchen — `EXPIRED_RETRY_MAX = 3` mit exponentiellem Backoff — in den terminalen Zustand, damit sich vorübergehende OAuth-Fehler selbst beheben können, bevor der Account dauerhaft deaktiviert wird)
- `credits_exhausted`

Diese bleiben bestehen, bis sich die Anmeldedaten ändern oder ein Operator sie zurücksetzt. Überschreiben Sie keine terminalen Zustände mit einem vorübergehenden Cooldown-Status.

**Träge Wiederherstellung:** Sobald `rateLimitedUntil` abgelaufen ist, wird die Verbindung wieder verwendbar. Bei erfolgreicher Verwendung löscht `clearAccountError()` alle Fehlerfelder.

### Claude-OAuth-Nutzungslimit: Kanal mit niedrigerer Priorität + Zurücksetzen des Sitzungslimits

**Geltungsbereich:** eine Claude-Abonnementverbindung (OAuth). Beide Funktionen sind **pro Verbindung optional aktivierbar** (Verbindung bearbeiten → Claude-Abschnitt → `lowPriorityMode` / `autoLimitReset` in `providerSpecificData`, beide standardmäßig deaktiviert) und bilden die Claude-Code-Befehle `/low-priority` und `/limit-reset` nach (Wire-Vertrag erfasst aus Claude Code 2.1.263).

**Implementierung:**

- Zustandsmaschine + Antwortklassifizierung: `open-sse/services/claudeLowPriority.ts`
- Client zum Zurücksetzen und Beanspruchen des Status: `open-sse/services/claudeLimitReset.ts`
- Executor-Hook (Header-Injektion + Wiederholung für dasselbe Konto): `open-sse/executors/base.ts::execute()`
- Persistenz der optionalen Aktivierung: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Auslöser:** das 5-Stunden-Nutzungslimit — ein `429`, dessen Header
`anthropic-ratelimit-unified-status: rejected` und, wenn das Konto berechtigt ist,
`anthropic-ratelimit-unified-slow-offer: treatment` enthalten. Vor diesem ersten Limitierungs-`429` wird nichts gesendet; ein Burst-`429` ohne vereinheitlichte Header durchläuft den normalen Cooldown-Pfad.

**Kanal mit niedrigerer Priorität** (`lowPriorityMode`):

- Beim Limitierungs-`429` akzeptiert der Executor das Angebot und wiederholt die Anfrage sofort für dasselbe Konto mit `anthropic-usage-limit: slow`; der Kanal bleibt bis zum angekündigten `anthropic-ratelimit-unified-reset` (+60 Sekunden Kulanzzeit) aktiv, und jede Anfrage in diesem Zeitraum enthält den Header. Der abgefangene `429` erreicht `handleChatCore` nie; daher wird die Verbindung **nicht** in den Cooldown versetzt und nicht durch eine andere ersetzt.
- `anthropic-ratelimit-unified-slow-status` in späteren Antworten: `active` / `not_needed` halten den Kanal aktiv; bei `slot_busy` (429) oder einem `529` wird auf `anthropic-ratelimit-unified-slow-retry-after` des Servers gewartet (standardmäßig 20 Sekunden, begrenzt auf 5–600 Sekunden, mit ±30 % Jitter) und die Anfrage wiederholt, begrenzt durch `anthropic-ratelimit-unified-slow-max-wait` (standardmäßig 20 Minuten, begrenzt auf 1 Minute–6 Stunden) — danach endet der Kanal, und eine 10-minütige Abkühlphase verhindert eine erneute Annahme. Die Wartezeit wird zusätzlich durch die verbleibende Zeitüberschreitung für den Upstream-Start der Anfrage (`resolveFetchStartTimeout`, standardmäßig 10 Minuten) abzüglich eines Puffers von 5 Sekunden begrenzt: Ohne diese Begrenzung würde das standardmäßige maximale Warten von 20 Minuten die Anfrage überdauern, und der Schlaf würde während des Wartens abgebrochen, wodurch ein `TimeoutError` statt des ordnungsgemäßen Endes mit `max_wait` und der Abkühlphase gemeldet würde.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, ein Übergang des 5-Stunden-Fensters oder `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (wodurch der Kanal bei jedem Status als `extra_usage` beendet wird, da das kostenpflichtige Überschreiten des Limits nun das Limit abdeckt) beenden den Kanal; die Antwort durchläuft anschließend den normalen Cooldown-Pfad. `budget_exhausted` bleibt bis zum angekündigten Zurücksetzen des Budgets (≤ 8 Tage) gespeichert.
- Die Prüfung des Nutzungslimits läuft nach den eigenen, durch `400` ausgelösten Wiederholungen innerhalb eines Versuchs des Executors (Kontextbearbeitung, Begrenzungen für Denken/Aufwand, automatisches Erlernen von Parametern). Ein Limitierungs-`429`, der erst bei einer dieser Wiederholungen auftritt, wird daher weiterhin abgefangen, statt den Cooldown-Pfad zu erreichen.
- Der Status befindet sich pro Verbindung im Arbeitsspeicher (ein Neustart kostet einen zusätzlichen Limitierungs-`429`, bevor das Angebot erneut angenommen wird).

**Zurücksetzen des Sitzungslimits** (`autoLimitReset`, wird vor dem Kanal versucht, wenn beide Funktionen aktiviert sind):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`-Block; wenn `arm: "reset"` und `available: true` gilt,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` mit
  `{ "program": "juniper_tide" }` (Organisations-UUID aus `providerSpecificData.organizationUUID`, mit Bootstrap-Fallback).
- `result: reset|not_limited` → die Anfrage wird mit voller Geschwindigkeit wiederholt (ohne Slow-Header). `already_used` / `not_offered` speichern `next_available_at` zwischen (standardmäßig eine Woche); jeder Fehler führt zu einer 15-minütigen Wartezeit. Das Zurücksetzen ist einmal pro Woche möglich und wird weiterhin auf das Wochenlimit angerechnet.

Regressionstests: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Sitzungsaffinität (#7274)

**Geltungsbereich:** eine Clientsitzung (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`-Header), die an eine Verbindung gebunden wird, für **jeden** Anbieter.

**Zweck:** Einen Agenten mit mehreren Interaktionen (Claude Code, aider, benutzerdefinierte Agenten) bei aufeinanderfolgenden Anfragen auf demselben Konto zu halten, um den Verlust von Kontext zwischen Konten und wiederholte 429-Fehler beim Kaltstart bei Anbietern mit sitzungsbezogenem Status pro Konto zu reduzieren.

**Implementierung:**

- TTL-Auflösung: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Auswahl/Erstellung der Bindung: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header-Extraktion (generisch, jeder Anbieter): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persistierte Bindungstabelle: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Einstellung: `sessionAffinityTtlMs` (globale TTL in ms, `0` deaktiviert) — `src/lib/db/settings.ts`. Umbenannt von `codexSessionAffinityTtlMs`, das nur für Codex galt, durch die Migration `124_generic_session_affinity_ttl.sql`; dabei wird eine zuvor konfigurierte Codex-TTL als neuer Standardwert übernommen.

Vor #7274 brach `resolveSessionAffinityTtlMs()` für jeden Anbieter außer `codex` sofort mit `0` ab. Daher hatten die TTL-Einstellung (und die Sitzung-Header) nirgendwo sonst eine Wirkung, obwohl der Bindungsmechanismus und die Header-Extraktion bereits anbieterunabhängig waren. Durch die Korrektur wurde diese frühzeitige Rückgabe entfernt; die TTL gilt nun einheitlich für jeden Anbieter, sobald sie global auf einen Wert über `0` gesetzt ist.

Die drei Header für die Sitzungsaffinität werden niemals an den Upstream weitergeleitet — die Executor erstellen ihre eigenen Upstream-Header von Grund auf, anstatt Client-Header durchzureichen. Dadurch bleibt dies ausschließlich eine interne Korrelations-ID.

### Exklusive verwaltete Sitzungsverbindungs-Leases

**Geltungsbereich:** Ein aktiver verwalteter HTTP-Client bzw. eine aktive verwaltete HTTP-Sitzung besitzt eine berechtigte OmniRoute-Verbindung.

**Zweck:** Bereitstellung eines dauerhaften, exklusiven Verbindungsbesitzes für Clients, die über mehrere Anfragen hinweg eine strikte Routing-Grenze benötigen. Dies unterscheidet sich von Sitzungsaffinität, die eine weiche Präferenz für Kontinuität darstellt: Ein exklusives Lease speichert den Lebenszyklusstatus in SQLite, erzwingt die globale Eindeutigkeit aktiver Besitzer und aktiver Verbindungen und weist eine veraltete Generation vor der Weiterleitung an den Provider zurück.

Die Funktion ist pro API-Schlüssel optional. Ein verwalteter Schlüssel muss den Scope `lease:exclusive` und eine explizite, nicht leere Liste `allowedConnections` besitzen. Jeder HTTP-Client kann den Lebenszyklus-Endpunkt verwenden; weder ein Clientname, ein User-Agent, ein Provider, eine OAuth-Methode noch ein Modell ist erforderlich. Das Lease besitzt eine Verbindung, kein Modell. Daher bleibt die Bindung bei einem Modellwechsel erhalten, solange die Verbindung weiterhin regulär berechtigt ist. Die normalen Regeln für Modell, Kontingent, Zustand, Abklingzeit und Allowlist bleiben maßgeblich und können dieselbe Generation zu einer anderen freien, berechtigten Verbindung wechseln lassen.

Der Lebenszyklus verwendet `POST /api/v1/session-leases` mit den JSON-Aktionen `acquire`, `renew` und `release`. Verwaltete Inferenzanfragen übermitteln den undurchsichtigen Wert `X-OmniRoute-Lease-Owner` und die exakte `X-OmniRoute-Lease-Generation`. Der Besitzer verwendet `vlo_`, gefolgt von 43 base64url-Zeichen; gespeichert wird nur dessen SHA-256-Hash. Jede abschließende Weiterleitungsprüfung bindet außerdem die ID des authentifizierten API-Schlüssels und die ID der aktiven Verbindung. Steuerungs-Header des Leases werden aus Protokollen, aufbewahrten Anfrage-Snapshots und den Headern des Upstream-Executors entfernt.

Wenn das normale Routing berechtigte verwaltete Kandidaten hat, aber jeder freie Kandidat von einem aktiven Lease eines anderen Besitzers belegt ist, gibt OmniRoute HTTP `429`, den Code für nicht verfügbare Lease-Kapazität, den Status „Warten auf Kapazität“ und einen begrenzten `Retry-After` zurück, der aus dem frühesten relevanten Ablaufzeitpunkt abgeleitet wird. Eine gewöhnliche leere Berechtigungsmenge stellt keine Lease-Konkurrenz dar und behält die bestehende Semantik für Routing-Fehler bei.

Verwandte Mechanismen bleiben getrennt:

- Die Belegung von OAuth-Sitzungen ist eine prozesslokale weiche Verteilung für OAuth-Konten.
- Kontosemaphoren gewähren Berechtigungen für die Anfragekonkurrenz und enden, sobald eine Anfrage abgeschlossen ist.
- Exklusive verwaltete Sitzungs-Leases stellen einen dauerhaften Lebenszyklusbesitz mit einer Generationsprüfung dar.

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

## 4. Quota-Share-Konkurrenzsteuerung (v3.8.36)

Abonnementkonten (GLM, MiniMax usw.) akzeptieren häufig nur etwa 1–3 gleichzeitige
Anfragen. Wird dieser Wert überschritten, führt dies zu 429-Fehlern und
Abkühlzeiten. Dies ist bei **Quota-Share**-Kombinationen (`qtSd/…`) besonders
kritisch, da mehrere API-Schlüssel dasselbe Upstream-Konto gemeinsam verwenden.
Drei Ebenen verhindern, dass ein gemeinsames Konto überflutet wird.

### Begrenzung der Parallelität pro Verbindung (`max_concurrent`)

Jede Provider-Verbindung kann eine Obergrenze für `max_concurrent` deklarieren
(`provider_connections.max_concurrent`, festgelegt im Verbindungsdialog, über die API
oder in der Datenbank). Lassen Sie das Feld leer, wenn keine Begrenzung gelten soll.
Dies ist der einzige Regler, der die nachfolgende Serialisierungsebene steuert —
setzen Sie ihn auf die tatsächliche Parallelität des Kontos (z. B. GLM ~1, MiniMax ~2).

### Begrenzungen der Parallelität pro Modell (`modelConcurrency`)

Eine Verbindung kann zusätzlich exakte Obergrenzen für die Parallelität pro Modell
in ihrer `rateLimitOverrides`-Map deklarieren:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Legen Sie dies im Verbindungsdialog fest (**Rate-Limit-Überschreibungen →
Parallelitätsbegrenzungen pro Modell**, eine Zeile `model=cap` pro Eintrag) oder über
`PATCH /api/providers/[id]` mit derselben JSON-Struktur. Bedeutung der Schlüssel:

- **Verbindungsweit gegenüber modellspezifisch:** `maxConcurrent` bleibt die
  verbindungsweite gemeinsame Obergrenze. Wenn beide gelten, werden beide
  Schranken atomar im selben zusammengesetzten Gate erworben
  (`global → provider → account → model`); maßgeblich ist die jeweils strengere
  anwendbare Begrenzung.
- **Exakte Übereinstimmung des Modellschlüssels:** Der Schlüssel entspricht der
  Modellzeichenfolge, die nach der Routing-Auflösung an den Executor übergeben wird —
  normalerweise der einfache Upstream-Modellbezeichner (`glm-5`), nicht ein
  clientseitiger `provider/model`-Alias (`zai/glm-5` stimmt nicht mit `glm-5` überein).
  Die Werte sind positive Ganzzahlen und geben die Obergrenze für gleichzeitige
  Anfragen an.
- **Lokales Einreihen, keine Ermittlung:** Überschüssige Anfragen werden lokal mit
  der bestehenden Queue-/Timeout-Semantik eingereiht (typisierte
  Zulassungsfehler `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute
  ermittelt oder erschließt keine Upstream-Richtlinien — es setzt exakt die vom
  Betreiber konfigurierten Obergrenzen durch. Ein ausgelastetes Modell-Gate
  deaktiviert den Provider niemals und erzeugt niemals eine dauerhafte Sperre des
  Modells; das Verhalten bei Upstream-429-/Cooldown-/Fallback-Situationen bleibt
  die Fehlerabsicherung.
- **Geltungsbereich pro Verbindung und Prozess:** Die Begrenzungen gelten pro
  Datenbankverbindung und werden im Speicher gehalten. Daher koordinieren sich zwei
  Verbindungen, die denselben Upstream-API-Schlüssel wiederverwenden, nicht
  miteinander.
- **Nicht konfiguriert bedeutet unverändert:** Wird die Map weggelassen (oder das
  Dashboard-Feld leer gelassen), wird kein Modell-Gate hinzugefügt. Beispielkonfiguration
  ohne die Behauptung einer universellen Provider-Begrenzung:

```text
glm-5=1
glm-4.7=3
```

### Serialisierung von Quota-Share-Anfragen

Wenn eine Quota-Share-Weiterleitung eine Verbindung mit einem positiven
`max_concurrent` ansteuert, werden gleichzeitige Anfragen an dieses **Konto** über
ein verbindungsspezifisches Semaphore (Schlüssel `qsconn:<connectionId>`) serialisiert:
Überschüssige Anfragen **warten in der Warteschlange**, statt das Konto zu überfluten.
Dies ist **fail-open** — bei voller Warteschlange oder einem Timeout wird ohne Slot
fortgefahren, anstatt eine weiterleitbare Anfrage jemals abzulehnen. Aktivieren oder
deaktivieren Sie dies unter **Einstellungen → Resilienz → Parallelität pro
Quota-Share-Verbindung** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`,
standardmäßig aktiviert). Ohne eine `max_concurrent`-Begrenzung bleibt das Verhalten
unverändert.

> Das Quota-Share-Routing-Gate (`selectQuotaShareTarget`, DRR + P2C) ist selbst
> fail-open und **setzt eine Verbindung am Limit lediglich zurück** — bei einem
> Pool mit nur einer Verbindung kann es keine harte Begrenzung durchsetzen. Daher
> ist dieses Semaphore die Komponente, die die Überflutung tatsächlich eindämmt.

### Combo-Cooldown-bewusster Wiederholungsversuch

Für jede Combo-Strategie (sofern aktiviert) wartet eine Anfrage, die andernfalls einen
429-Fehler für einen KURZEN temporären Cooldown auslösen würde, den Cooldown ab und
wird erneut weitergeleitet, statt den 429 zurückzugeben — dies deckt
TPM-/RPM-Fenster der Gemini-Klasse (Retry-After etwa 60 Sekunden) bei
Multi-Modell-Kombinationen ab, z. B. wenn beide Ziele einer 2-Modell-Kombination ein
Rate-Limit pro Modell erreichen. Begrenzt wird dies durch `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) unter **Einstellungen →
Resilienz**. Bei `quota_exhausted` (bis Mitternacht gesperrt) oder bei
Authentifizierungs-/Nicht-gefunden-Gründen wird niemals gewartet.

Eine Combo kann sich mit `config.comboCooldownWaitEnabled: false` davon ausnehmen.
Nur der literale Wert `false` deaktiviert diese gemeinsamen Combo-Wartevorgänge
(Cooldown nach der Weiterleitung sowie Wartevorgänge bei vor der Weiterleitung
geöffnetem Circuit/gesperrtem Modell) und deren Erweiterung des unteren Grenzwerts
für das Wartebudget. Fehlt der Wert oder ist er `true`, bleibt die globale Richtlinie
erhalten; `true` kann global deaktiviertes Warten nicht aktivieren. Ein explizites
`targetTimeoutMs` hat weiterhin Vorrang. Diese Ausnahme ändert nichts am separaten
Wartevorgang vor der Weiterleitung für die native-Codex-Turn-Pinning-Funktion.

Dasselbe Gate deckt den Fall vor der Weiterleitung ab (#16319): Wenn jedes Ziel einer
Combo übersprungen wird, bevor ein Versuch unternommen wurde, weil sein Modell sich
in einer kurzen temporären Sperre befindet, wartet der Pfad mit null Versuchen die
Sperre unter denselben Obergrenzen ab und leitet erneut weiter, statt eine
hinweislose Antwort `503 ALL_TARGETS_SKIPPED` zurückzugeben. Wenn kein Warten
zulässig ist (Obergrenze, Versuchszahl oder Budget erschöpft oder Funktion
deaktiviert), wird die abschließende Antwort zu `429 rate_limit_error` hochgestuft
und enthält `retry_after` / `reset_at` aus dem frühesten Ablauf der temporären
Modellsperre; Quota-, Authentifizierungs- und Nicht-gefunden-Sperren behalten den
hinweislosen 503-Fehler bei.

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

## Weitere Resilienz-Funktionen

- **20 Routing-Strategien** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — siehe [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Reset-bewusstes Routing** (v3.8.0) — priorisiert Verbindungen nach dem Zeitpunkt des Quota-Resets.
- **Degradierung des Hintergrundmodus** — Responses-API `background: true` wird mit Warnung auf synchron heruntergestuft.
- **Dynamische Erkennung von Tool-Limits** — setzt Provider zurück, wenn Limits für die Tool-Anzahl erreicht werden.
- **Notfall-Fallback** — gesteuert über `OMNIROUTE_EMERGENCY_FALLBACK`; Operatoren können ihn auf der Feature-Flags-Seite ohne Neustart überschreiben.

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
