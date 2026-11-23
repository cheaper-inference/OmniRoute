# Resilience Guide (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute verfügt über drei unterschiedliche, aber miteinander verbundene Resilienzmechanismen. Jeder hat einen anderen Geltungsbereich und Zweck. Behalten Sie diese bei der Fehlersuche im Routingverhalten getrennt voneinander.

![3-Schichten-Resilienzmodell](../diagrams/exported/resilience-3layers.svg)

> Quelle: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Anbieter-Schutzschalter

**Geltungsbereich:** gesamter Anbieter (z. B. `glm`, `openai`, `anthropic`).

**Zweck:** Es soll kein Datenverkehr mehr an einen Anbieter gesendet werden, bei dem wiederholt Fehler auf Upstream-/Dienstebene auftreten.

**Implementierung:**

- Kernklasse: `src/shared/utils/circuitBreaker.ts`
- Einbindung: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status-API: `GET /api/monitoring/health`
- Zurücksetzungs-API: `POST /api/resilience/reset`
- Wrapper: `open-sse/services/accountFallback.ts`
- DB-Tabelle: `domain_circuit_breakers`

**Zustände:**

- `CLOSED` — normaler Datenverkehr ist zulässig
- `DEGRADED` — Datenverkehr ist weiterhin zulässig, aber vermehrte Anbieterfehler werden erfasst; kehrt nach genügend erfolgreichen Anfragen, einem gültigen Verbindungstest oder nach Ablauf der längsten `OPEN`-Haltezeit für die letzte Fehlerart (deren `cooldownByKind`-Wert, andernfalls `resetTimeout`, × `maxBackoffMultiplier`, mindestens eine Abklingzeit) ohne einen neuen Fehler zu `CLOSED` zurück
- `OPEN` — Anbieter ist vorübergehend blockiert; das Kombinations-Routing überspringt ihn
- `HALF_OPEN` — Zeitlimit für die Zurücksetzung ist abgelaufen; eine Prüfanfrage ist zulässig

**Konfigurierbare Standardwerte (`open-sse/config/constants.ts`, verfügbar unter Dashboard → Einstellungen → Resilienz):**

| Klasse        | Herabgestuft nach | Geöffnet nach | Zeitlimit für Zurücksetzung |
| ------------- | ----------------- | ------------- | --------------------------- |
| OAuth         | 5 Fehler          | 8 Fehler      | 60s                         |
| API-Schlüssel | 7 Fehler          | 12 Fehler     | 30s                         |
| Lokal         | abgeleitet        | 2 Fehler      | 15s                         |

`degradationThreshold` steuert, wann ein Anbieter in den Zustand `DEGRADED` wechselt; `failureThreshold` steuert, wann er geöffnet und übersprungen wird. Profile lokaler Anbieter werden auf der Einstellungsseite „Resilienz“ noch nicht angezeigt.

**Auslösecodes:** ausschließlich Statuscodes auf Anbieterebene `[408, 500, 502, 503, 504]`. Bei Fehlern auf Kontoebene (die meisten 401/403/429 — diese gehören zur Abklingzeit oder Sperrung) darf der Schutzschalter NICHT ausgelöst werden.

**Verzögerte Wiederherstellung:** Wenn `OPEN` abläuft, aktualisieren `getStatus()`, `canExecute()` und `getRetryAfterMs()` den Zustand auf `HALF_OPEN`. Dieselben Lesevorgänge (sowie der nächste Fehler) setzen einen veralteten Zustand `DEGRADED` wieder auf `CLOSED` zurück. Es ist kein Hintergrund-Timer erforderlich.

---

### Optional aktivierbare globale Anbieter-Abklingzeit (Zeitfenster-Schranke)

Eine vierte, **optional aktivierbare** Ebene (`PROVIDER_COOLDOWN_ENABLED`, standardmäßig **deaktiviert**) verwaltet in
`open-sse/services/providerCooldownTracker.ts` anfrageübergreifend Informationen über fehlerhafte Anbieter. Diese werden bei der
Auflösung von Kombinationszielen berücksichtigt, sodass aufeinanderfolgende Kombinationsanfragen nicht wiederholt einen Anbieter durchlaufen, bei dem gerade
ein Fehler aufgetreten ist. Einträge auf Anbieterebene berücksichtigen die Zeitfenster-Schranke `PROVIDER_PROFILES`:

| Profil        | Auslösung nach (`providerFailureThreshold`) | innerhalb von (`providerFailureWindowMs`) | Abklingzeit (`providerCooldownMs`) |
| ------------- | ------------------------------------------: | ----------------------------------------: | ---------------------------------: |
| OAuth         |                                        `10` |                                   `15min` |                             `5min` |
| API-Schlüssel |                                        `15` |                                   `30min` |                            `10min` |

Unterhalb des Schwellenwerts wird der Anbieter **nicht** als in der Abklingphase befindlich betrachtet; ein Erfolg löscht
das Zeitfenster. Einträge auf Verbindungsebene (`provider:connectionId`) behalten stattdessen den
exponentiellen Backoff von `minRetryCooldownMs → maxRetryCooldownMs` bei. Überschreibungen:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regressionsschutz: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Verbindungs-Cooldown

**Geltungsbereich:** einzelne Verbindung/einzelnes Konto/einzelner Schlüssel eines Anbieters.

**Zweck:** einen fehlerhaften Schlüssel überspringen, während andere Verbindungen desselben Anbieters weiterhin Anfragen bedienen.

**Implementierung:**

- Als nicht verfügbar markieren: `src/sse/services/auth.ts::markAccountUnavailable()`
- Auswahl: `getProviderCredentials*` in derselben Datei
- Cooldown-Berechnung: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Einstellungen: `src/lib/resilience/settings.ts`

**Felder pro Verbindung:**

- `rateLimitedUntil` — Zeitstempel, bis zu dem der Cooldown gilt
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — Zähler für exponentiellen Backoff

**Standard-Cooldowns:**

- OAuth-Basiswert: 5 s
- API-Schlüssel-Basiswert: 3 s
- API-Schlüssel bei 429: bevorzugt vorgelagerte `Retry-After`-/Reset-Header bzw. analysierbaren Reset-Text
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Schutz vor einer Stampede:** verhindert, dass gleichzeitige Fehler den Cooldown übermäßig verlängern oder `backoffLevel` doppelt erhöhen.

**Durch Parallelitätslimits verursachte 429-Fehler steigen nicht die Backoff-Leiter hinauf.** Ein `429`, dessen Body ein
Parallelitätslimit meldet ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`), bedeutet, dass das Konto funktionsfähig, aber ausgelastet ist.
`checkFallbackError()` gibt den Grund `concurrency_limited` zurück: sofort zur nächsten
Verbindung wechseln, für diese Verbindung einen festen `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) oder den
vorgelagerten Wiederholungshinweis verwenden, `backoffLevel` unverändert lassen und `skipProviderBreaker` setzen.
Ein expliziter Kontingent-Body hat weiterhin Vorrang, sodass ein Body, der auch einem Kontingentmuster entspricht, als Kontingentüberschreitung
eingestuft wird. Erkennung: `looksLikeConcurrencyLimit()` in `src/shared/utils/classify429.ts`;
Bewertung: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (der
`FailureKind` des Breakers) bleibt unverändert und liefert für diese Bodys weiterhin `rate_limit`.

**Stillstände bei Stream-Inhalten lösen keinen Konto-Cooldown aus.** Wenn der Watchdog für Inhaltsstillstände
(`open-sse/utils/streamHandler.ts`) einen Stream aufgibt, der nicht rechtzeitig eine Modellausgabe gesendet hat,
zeichnet `markAccountUnavailable()` den Fehler für die Verbindung auf, setzt jedoch keinen
Cooldown: Der Stillstand betrifft diese Anfrage und ist meist auf einen langen Reasoning-Vorgang zurückzuführen, der noch keine
Ausgabe erzeugt hat. Betreiber können dieses Verhalten mit `resilienceSettings.streamStallCooldown.enabled`
wieder aktivieren (Standardwert `false`).

**Reasoning-Frames starten das Zeitbudget für Inhaltsstillstände neu.** Ein Reasoning-Modell kann
minutenlang nachdenken, bevor es sein erstes sichtbares Token ausgibt: Claude streamt `thinking_delta`-Frames, deren
Reasoning-Text leer sein kann, und die Responses API streamt mehrere Reasoning-Elemente
nacheinander. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) erkennt
diese Frames, und der Watchdog startet sein Zeitbudget bei jedem Frame neu, anstatt den
Vorgang abzubrechen. Sie gelten weiterhin nicht als Modellausgabe. Daher wird ein Vorgang, der nur mit Reasoning endet, weiterhin
als leer gemeldet, und ein Vorgang, der das Reasoning beendet und anschließend nur noch Heartbeats sendet, löst weiterhin
den Watchdog aus.

Kiros binäre `reasoningContentEvent`-Frames mit einer nicht leeren Signatur bewahren diese
Reasoning-Aktivität über den Executor hinweg als leeres `reasoning_content`-Delta. Die Signatur wird
nicht weitergeleitet. Metadaten, unvollständige Frames und leere Signaturen starten das
Inhaltsbudget nicht neu; das unabhängige Timeout für aktive Streams und der Abbruch durch den Client gelten weiterhin
(`open-sse/executors/kiro/reasoning.ts`).

**Endzustände (KEINE Cooldowns):**

- `banned` — wird durch die Erkennung gesperrter Schlüsselwörter/Kontensperren (siehe [BAN_DETECTION](../security/BAN_DETECTION.md)) sowie durch drei aufeinanderfolgende vorgelagerte Ablehnungen einzelner Anfragen gesetzt (`request_rejected`, z. B. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); eine einzelne Ablehnung versetzt die Verbindung lediglich in einen Cooldown
- `expired` (wechselt nach einer begrenzten Anzahl von Wiederholungsversuchen in den Endzustand — `EXPIRED_RETRY_MAX = 3` mit exponentiellem Backoff —, sodass vorübergehende OAuth-Fehler sich selbst beheben können, bevor das Konto dauerhaft deaktiviert wird)
- `credits_exhausted`

Diese Zustände bleiben bestehen, bis sich die Zugangsdaten ändern oder ein Betreiber sie zurücksetzt. Endzustände dürfen nicht durch einen vorübergehenden Cooldown-Zustand überschrieben werden.

**Verzögerte Wiederherstellung:** Sobald `rateLimitedUntil` in der Vergangenheit liegt, kann die Verbindung wieder ausgewählt werden. Nach erfolgreicher Verwendung löscht `clearAccountError()` alle Fehlerfelder.

### Claude-OAuth-Nutzungslimit: Lane mit niedrigerer Priorität + Zurücksetzen des Sitzungslimits

**Geltungsbereich:** eine Claude-Abonnementverbindung (OAuth). Beide Funktionen müssen **pro
Verbindung explizit aktiviert werden** (Verbindung bearbeiten → Claude-Abschnitt → `lowPriorityMode` / `autoLimitReset` in
`providerSpecificData`, beide standardmäßig deaktiviert) und entsprechen den Claude-Code-Befehlen `/low-priority` und
`/limit-reset` (Übertragungsprotokoll aus Claude Code 2.1.263 erfasst).

**Implementierung:**

- Zustandsautomat + Antwortklassifizierung: `open-sse/services/claudeLowPriority.ts`
- Client für Reset-Status/-Beanspruchung: `open-sse/services/claudeLimitReset.ts`
- Executor-Hook (Header-Injektion + Wiederholungsversuch mit demselben Konto): `open-sse/executors/base.ts::execute()`
- Persistenz der expliziten Aktivierung: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Auslöser:** das 5-Stunden-Nutzungslimit — ein `429`, dessen Header
`anthropic-ratelimit-unified-status: rejected` und, sofern das Konto berechtigt ist,
`anthropic-ratelimit-unified-slow-offer: treatment` enthalten. Vor diesem ersten
Limit-429 wird nichts gesendet; ein gebündelter 429-Fehler ohne Unified-Header durchläuft den normalen Cooldown-Pfad.

**Lane mit niedrigerer Priorität** (`lowPriorityMode`):

- Bei der Wall-429 akzeptiert der Executor das Angebot und wiederholt sofort den Versuch mit demselben Konto und `anthropic-usage-limit: slow`; die Lane bleibt bis zum angekündigten `anthropic-ratelimit-unified-reset` (+60 s Kulanzzeit) aktiv, und jede Anfrage in diesem Zeitfenster enthält den Header. Die abgefangene 429 erreicht `handleChatCore` nie, sodass die Verbindung **nicht** in den Cooldown versetzt und nicht wegrotiert wird.
- `anthropic-ratelimit-unified-slow-status` bei späteren Antworten: `active` / `not_needed` behalten die Lane bei; bei `slot_busy` (429) oder einer `529` wird die durch `anthropic-ratelimit-unified-slow-retry-after` vorgegebene Zeit gewartet (Standardwert 20 s, begrenzt auf 5–600 s, ±30 % Jitter) und der Versuch wiederholt, beschränkt durch `anthropic-ratelimit-unified-slow-max-wait` (Standardwert 20 min, begrenzt auf 1 min–6 h) — danach endet die Lane und eine 10-minütige Abkühlphase verhindert eine erneute Annahme. Die Wartezeit wird zusätzlich durch die verbleibende Zeit des anfrageeigenen Timeouts für den Upstream-Start (`resolveFetchStartTimeout`, standardmäßig 10 min) abzüglich eines Puffers von 5 s begrenzt: Ohne diese Begrenzung würde die standardmäßige maximale Wartezeit von 20 Minuten die Anfrage überdauern, und der Sleep würde während des Wartens abgebrochen, wodurch ein `TimeoutError` statt des geordneten Endes mit `max_wait` und anschließender Abkühlphase zurückgegeben würde.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, der Wechsel eines 5-h-Zeitfensters oder `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (wodurch die Lane bei jedem Status als `extra_usage` beendet wird, da die kostenpflichtige Mehrnutzung nun die Wall abdeckt) beenden die Lane; die Antwort durchläuft anschließend den normalen Cooldown-Pfad. `budget_exhausted` wird bis zum angekündigten Budget-Reset (≤ 8 Tage) gespeichert.
- Die Wall-Prüfung erfolgt nach den eigenen, durch 400 ausgelösten Wiederholungsversuchen des Executors innerhalb eines Versuchs (Kontextbearbeitung, Begrenzungen für Thinking/Effort, automatisches Lernen von Parametern), sodass eine Wall-429, die erst bei einem dieser Wiederholungsversuche auftritt, weiterhin abgefangen wird, anstatt den Cooldown-Pfad zu erreichen.
- Der Zustand wird pro Verbindung im Arbeitsspeicher gehalten (ein Neustart verursacht eine zusätzliche Wall-429 für die erneute Annahme).

**Zurücksetzen des Sitzungslimits** (`autoLimitReset`, wird vor der Lane versucht, wenn beide aktiviert sind):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`-Block; wenn `arm: "reset"` und `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` mit
  `{ "program": "juniper_tide" }` (Organisations-UUID aus
  `providerSpecificData.organizationUUID`, Bootstrap als Fallback).
- `result: reset|not_limited` → die Anfrage wird mit voller Geschwindigkeit erneut versucht (ohne Slow-Header).
  `already_used` / `not_offered` speichern `next_available_at` (standardmäßig eine Woche); bei jedem Fehler erfolgt ein Backoff von 15 Minuten. Das Zurücksetzen ist einmal pro Woche möglich und wird weiterhin auf das Wochenlimit angerechnet.

Regressionsschutz: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Sitzungsaffinität (#7274)

**Geltungsbereich:** Eine Clientsitzung (Header `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) wird für **jeden** Anbieter an eine Verbindung gebunden.

**Zweck:** Einen Agenten mit mehreren Dialogrunden (Claude Code, aider, benutzerdefinierte Agenten) über mehrere Anfragen hinweg auf demselben Konto halten, wodurch anbieterübergreifende Kontextverluste und wiederholte Kaltstart-429-Fehler bei Anbietern mit sitzungsbezogenem Zustand pro Konto reduziert werden.

**Implementierung:**

- TTL-Auflösung: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin-Auswahl/-Erstellung: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header-Extraktion (generisch, jeder Anbieter): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persistierte Pin-Tabelle: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Einstellung: `sessionAffinityTtlMs` (globale TTL in ms, `0` deaktiviert) — `src/lib/db/settings.ts`. Durch die Migration `124_generic_session_affinity_ttl.sql` von der ausschließlich für Codex geltenden Einstellung `codexSessionAffinityTtlMs` umbenannt; dabei wird jede zuvor konfigurierte Codex-TTL als neuer Standardwert übernommen.

Vor #7274 brach `resolveSessionAffinityTtlMs()` für jeden Anbieter außer `codex` sofort mit `0` ab, sodass die TTL-Einstellung (und die Sitzungs-Header) nirgendwo sonst wirksam waren, obwohl der Pinning-Mechanismus und die Header-Extraktion bereits anbieterunabhängig waren. Mit der Korrektur wurde diese frühzeitige Rückgabe entfernt; die TTL gilt nun einheitlich für jeden Anbieter, sobald sie global auf einen Wert größer als `0` gesetzt wurde.

Die drei Sitzungsaffinitäts-Header werden nie an den Upstream weitergeleitet — die Executors erstellen ihre eigenen Upstream-Header von Grund auf, anstatt Client-Header durchzureichen. Daher bleiben sie ausschließlich interne Korrelations-IDs.

### Exklusive Verbindungs-Leases für verwaltete Sitzungen

**Geltungsbereich:** Ein aktiver verwalteter HTTP-Client bzw. eine aktive verwaltete Sitzung besitzt eine geeignete OmniRoute-Verbindung.

**Zweck:** Dauerhafte, exklusive Verbindungsinhaberschaft für Clients bereitstellen, die über mehrere Anfragen hinweg eine harte Routing-Grenze benötigen. Dies unterscheidet sich von der Sitzungsaffinität, die eine weiche Kontinuitätspräferenz darstellt: Eine exklusive Lease speichert den Lebenszykluszustand dauerhaft in SQLite, erzwingt die globale Eindeutigkeit des aktiven Besitzers und der aktiven Verbindung und weist eine veraltete Generation vor der Weiterleitung an den Anbieter zurück.

Die Funktion muss pro API-Schlüssel explizit aktiviert werden. Ein verwalteter Schlüssel muss den Geltungsbereich `lease:exclusive` und eine explizite, nicht leere `allowedConnections`-Liste besitzen. Jeder HTTP-Client kann den Lebenszyklus-Endpunkt verwenden; weder Clientname, User-Agent, Anbieter, OAuth-Methode noch Modell sind erforderlich. Die Lease besitzt eine Verbindung, kein Modell. Daher bleibt die Bindung bei einem Modellwechsel bestehen, solange die Verbindung regulär geeignet bleibt. Die normalen Regeln für Modell, Kontingent, Zustand, Cooldown und Zulassungsliste bleiben maßgeblich und können dieselbe Generation auf eine andere freie, geeignete Verbindung umstellen.

Der Lebenszyklus erfolgt über `POST /api/v1/session-leases` mit den JSON-Aktionen `acquire`, `renew` und `release`.
Verwaltete Inferenzanfragen übermitteln den opaken Wert `X-OmniRoute-Lease-Owner` und die exakte
`X-OmniRoute-Lease-Generation`. Der Owner besteht aus `vlo_`, gefolgt von 43 Base64url-Zeichen; gespeichert
wird ausschließlich sein SHA-256-Hash. Jede abschließende Dispatch-Fence bindet außerdem die authentifizierte API-Key-ID und
die ID der aktiven Verbindung. Lease-Steuerungsheader werden aus Protokollen, gespeicherten Anfrage-Snapshots und
Headern für Upstream-Executors entfernt.

Wenn beim gewöhnlichen Routing geeignete verwaltete Kandidaten vorhanden sind, aber jeder freie Kandidat durch eine
fremde aktive Lease belegt ist, gibt OmniRoute HTTP `429`, den Code lease-capacity-unavailable, einen
Status „Warten auf Kapazität“ und einen begrenzten `Retry-After`-Wert zurück, der aus dem frühesten relevanten Ablaufzeitpunkt abgeleitet wird.
Wenn regulär keine geeigneten Kandidaten vorhanden sind, handelt es sich nicht um Lease-Konkurrenz, und die bestehenden Routing-Fehlersemantiken bleiben erhalten.

Verwandte Mechanismen bleiben voneinander getrennt:

- Die OAuth-Sitzungsbelegung ist eine prozesslokale, unverbindliche Verteilung für OAuth-Konten.
- Konto-Semaphoren gewähren Berechtigungen für parallele Anfragen und enden, sobald eine Anfrage abgeschlossen ist.
- Exklusive verwaltete Sitzungs-Leases stellen eine dauerhafte Lebenszyklus-Inhaberschaft mit einer Generation-Fence dar.

---

## 3. Modellsperre

**Gültigkeitsbereich:** Kombination aus Anbieter + Verbindung + Modell.

**Schlüsselbereich nach Status:** Der fehlschlagende Status bestimmt, in welchen Schlüssel eine Sperre geschrieben wird
(`resolveLockoutScope()` in `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — ein Kontingent- oder Berechtigungssignal — sperrt die **Kontingentfamilie**:
  bei Codex den gesamten Bereich `codex` / `spark` (jedes `gpt-5*`-Modell der
  Verbindung), bei anderen Anbietern `getQuotaScopedModelForProvider()`.
- `404` sperrt nur das eigentliche Modell (`getModelLockKey()` grenzt `not_found` ein).
- Jeder andere Status — `5xx`-Transport-/Serverfehler und OmniRoutes eigener,
  durch Qualitätsvalidierung erzeugter `502`-Status — sperrt ausschließlich die **exakte**
  Anbieter-/Verbindungs-/Modellkombination. Ein fehlerhafter Stream bei einem Modell ist kein Beleg
  für das Kontingent des Kontos; vor dieser Regel entfernte eine einzige leere Antwort von
  `codex/gpt-5.6-luna` jedes `gpt-5*`-Modell dieser Verbindung für
  2–30 Min. (mit Eskalation) aus dem Routing, obwohl das Kontingent unangetastet war.
- Eine explizite `scope`-Option des Aufrufers hat immer Vorrang (Antigravity übergibt `"exact"`).

**Zweck:** Vermeidung der Deaktivierung einer gesamten Verbindung, wenn nur ein Modell nicht verfügbar oder kontingentbeschränkt ist.

**Beispiele:**

- Anbieter mit modellspezifischen Kontingenten, die 429 zurückgeben
- Lokale Anbieter, die für ein einzelnes fehlendes Modell 404 zurückgeben
- Anbieterspezifische Berechtigungsfehler für Modi/Modelle (z. B. Grok-Modi)

**Implementierung:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Dashboard für Modell-Abklingzeiten (v3.8.0)

Benutzeroberfläche: Einstellungen → Modell-Abklingzeiten (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Listet aktive Sperren mit folgenden Angaben auf: Anbieter, Verbindung, Modell, Grund, expiresAt. Betreiber können ein Modell über die Karte manuell wieder aktivieren.

**REST-API:**

- `GET /api/resilience/model-cooldowns` — aktive Sperren auflisten
- `DELETE /api/resilience/model-cooldowns` — manuell wieder aktivieren. Textkörper: `{provider, connection, model}`. Authentifizierung: Verwaltung.

### Abklingzeit-Manager

Benutzeroberfläche: Überwachung → Abklingzeit-Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Eine zentrale Seite für jede Verbindung, die aus einem vorübergehenden Grund vom Routing ausgeschlossen ist, anstatt
jede Anbieterseite einzeln zu öffnen. Sie listet Verbindungs-Abklingzeiten, Modellsperren und endgültige
Zustände auf, löscht diese pro Verbindung, für eine Auswahl oder für alle Verbindungen eines Anbieters
und bearbeitet die am häufigsten angepassten Abklingzeitregeln: `streamStallCooldown.enabled` sowie die Basis-Abklingzeit und die maximale Anzahl an Backoff-Schritten von
`connectionCooldown` für OAuth-/API-Schlüssel-Verbindungen (gespeichert über
`PATCH /api/resilience`). Endgültige Zustände (`banned`, `expired`, `credits_exhausted`) werden
aufgelistet, aber hier niemals gelöscht.

**REST-API** (`src/lib/resilience/cooldownManager.ts`, Authentifizierung: Verwaltung):

- `GET /api/resilience/cooldowns[?provider=]` — Verbindungen mit Status, verbleibender Abklingzeit,
  Backoff-Stufe, letztem Fehlertyp und Modellsperren (keine Anmeldedaten)
- `POST /api/resilience/cooldowns` — Textkörper `{connectionIds: string[]}` oder
  `{all: true, provider?}`; gibt `{cleared, unchanged, skippedTerminal, lockoutsCleared}` zurück

### Benutzeroberfläche für Sperreinstellungen + Wiederherstellung durch Erfolgsabnahme (v3.8.23)

Die Modellsperre wurde von einem stets aktiven, fest codierten Verhalten zu einer vollständig konfigurierbaren
Opt-in-Funktion mit eigener Einstellungskarte und einem selbstheilenden Wiederherstellungspfad.

**Einstellungskarte:** Einstellungen → Modellsperre
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Diese unterscheidet sich von der oben beschriebenen schreibgeschützten `ModelCooldownsCard` (die aktive Sperren nur
_auflistet_) — die neue Karte _konfiguriert die Parameter_. Standardwerte
befinden sich in `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Einstellung             | Standardwert                     | Bedeutung                                                                |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Hauptschalter — die Modellsperre ist **standardmäßig deaktiviert**.      |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream-Statuscodes, die als modellspezifischer Fehler zählen.          |
| `baseCooldownMs`        | `120_000` (120 s)                | Anfängliche Sperrdauer für den ersten Fehler.                            |
| `maxCooldownMs`         | `1_800_000` (30 Min.)            | Obergrenze für die eskalierte Abklingzeit.                               |
| `maxBackoffSteps`       | `10`                             | Maximale Anzahl von Eskalationsschritten für den exponentiellen Backoff. |
| `useExponentialBackoff` | `true`                           | Gibt an, ob wiederholte Fehler die Abklingzeit exponentiell erhöhen.     |

Die Einstellungen werden über den regulären Einstellungsspeicher persistiert und anhand des
Schemas für Resilienz-Einstellungen validiert; die Karte begrenzt `baseCooldownMs`/`maxCooldownMs`
(mit `maxCooldownMs ≥ baseCooldownMs`) und `maxBackoffSteps`.

**Wiederherstellung durch Erfolgsabnahme:** Die Wiederherstellung erfolgt **nicht** ausschließlich durch Ablauf des Timers. Eine erfolgreiche
Antwort reduziert den Fehlerzähler des Modells schrittweise, sodass ein Modell, das sich
innerhalb des Zeitfensters erholt hat, nicht weiter eskaliert wird (und entsperrt wird), bevor sein Timer abgelaufen wäre. Bei einem erfolgreichen
Kombinationsziel ruft `open-sse/services/combo.ts` die Funktion `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) auf, die den gespeicherten
`failureCount` **halbiert** (`Math.floor(failureCount / 2)`); sobald er `0` erreicht, wird der Sperreintrag
vollständig gelöscht. Das Gegenstück `recordModelLockoutFailure()`
erhöht bei Fehlern innerhalb des Eskalationsfensters den Zähler (und eskaliert die Abklingzeit).
Diese Erfolgsabnahme ergänzt den einfachen Ablauf des Timers —
beide Wege können ein Modell wieder aktivieren.

**Zustand:** Sperren werden **im Arbeitsspeicher** gehalten (prozessspezifische `Map`s von
`ModelLockoutEntry`, verschlüsselt nach `provider:connectionId:model`; Sperren mit exaktem Gültigkeitsbereich nach
`provider:connectionId:exact:model`) und nicht in
der Datenbank persistiert — bei einem Neustart gehen sie verloren. Die _Einstellungen_ werden persistiert; der aktive
_Sperrzustand_ ist flüchtig.

---

## 4. Quota-Share-Parallelitätssteuerung (v3.8.36)

Abonnementkonten (GLM, MiniMax usw.) akzeptieren häufig nur ~1–3 gleichzeitige
Anfragen; bei Überschreitung werden 429-Fehler und Abklingzeiten ausgelöst. Dies ist besonders kritisch bei
**Quota-Share**-Kombinationen (`qtSd/…`), bei denen mehrere API-Schlüssel dasselbe vorgelagerte
Konto gemeinsam verwenden. Drei Ebenen verhindern, dass ein gemeinsam verwendetes Konto überlastet wird.

### Parallelitätsobergrenze pro Verbindung (`max_concurrent`)

Für jede Provider-Verbindung kann eine `max_concurrent`-Obergrenze festgelegt werden
(`provider_connections.max_concurrent`, konfigurierbar im Verbindungsdialog / über die API / in der DB).
Lassen Sie sie leer, um keine Begrenzung festzulegen. Dies ist der zentrale Parameter für die unten beschriebene
Serialisierungsebene — setzen Sie ihn auf die tatsächliche Parallelität des Kontos (z. B. GLM ~1, MiniMax ~2).

### Parallelitätsobergrenzen pro Modell (`modelConcurrency`)

Eine Verbindung kann zusätzlich exakte Parallelitätsobergrenzen pro Modell
innerhalb ihrer `rateLimitOverrides`-Map festlegen:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Legen Sie sie im Verbindungsdialog unter (**Überschreibungen für Ratenbegrenzungen → Parallelitätsobergrenzen
pro Modell**, ein `model=cap` pro Zeile) oder über
`PATCH /api/providers/[id]` mit derselben JSON-Struktur fest. Semantik der Schlüssel:

- **Verbindungsweit gegenüber modellspezifisch:** `maxConcurrent` bleibt die gemeinsame
  verbindungsweite Obergrenze. Wenn beide gelten, werden beide Schranken
  atomar innerhalb derselben zusammengesetzten Schranke belegt
  (`global → provider → account → model`); effektiv gilt das jeweils
  strengere Limit.
- **Exakte Übereinstimmung des Modellschlüssels:** Der Schlüssel ist die Modellzeichenfolge, die nach der
  Routing-Auflösung an den Executor übergeben wird — normalerweise die reine vorgelagerte Modell-ID
  (`glm-5`), nicht ein clientseitiger `provider/model`-Alias (`zai/glm-5` stimmt nicht
  mit `glm-5` überein). Werte sind positive ganzzahlige Obergrenzen für gleichzeitige Anfragen.
- **Lokale Warteschlange, keine Erkennung:** Überschüssige Anfragen werden lokal mit der
  bestehenden Warteschlangen-/Zeitüberschreitungssemantik eingereiht (typisierte Zulassungsfehler
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute erkennt oder
  erschließt keine vorgelagerten Richtlinien — es erzwingt exakt die vom Betreiber
  konfigurierten Obergrenzen. Eine ausgelastete Modellschranke deaktiviert niemals den Provider und
  erzeugt niemals eine dauerhafte Modellsperre; das vorgelagerte Verhalten bei 429-Fehlern,
  Abklingzeiten und Fallbacks bleibt die Fehlerabsicherung.
- **Pro Verbindung und Prozess:** Die Obergrenzen gelten pro Datenbankverbindung
  und werden im Arbeitsspeicher verwaltet. Daher koordinieren sich zwei Verbindungen, die denselben vorgelagerten API-Schlüssel
  wiederverwenden, nicht miteinander.
- **Nicht konfiguriert bedeutet unverändert:** Das Weglassen der Map (oder ein leeres
  Dashboard-Feld) fügt keine Modellschranke hinzu. Beispielkonfiguration, ohne
  ein universelles Provider-Limit vorauszusetzen:

```text
glm-5=1
glm-4.7=3
```

### Serialisierung von Quota-Share-Anfragen

Wenn ein Quota-Share-Dispatch auf eine Verbindung abzielt, die einen positiven
`max_concurrent`-Wert festlegt, werden gleichzeitige Anfragen an dieses **Konto** über ein
verbindungsspezifisches Semaphor serialisiert (Schlüssel `qsconn:<connectionId>`): Überschüssige Anfragen **warten in
der Warteschlange**, statt das Konto zu überlasten. Das Verhalten ist **Fail-open** — bei einer ausgelasteten
Warteschlange oder einer Zeitüberschreitung wird ohne Slot fortgefahren, statt jemals eine dispatchbare
Anfrage abzulehnen. Umschaltbar unter **Einstellungen → Resilienz → Quota-Share-Parallelität
pro Verbindung** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, standardmäßig
aktiviert). Ohne `max_concurrent`-Obergrenze bleibt das Verhalten unverändert.

> Die Quota-Share-Routing-Schranke (`selectQuotaShareTarget`, DRR + P2C) ist selbst
> Fail-open und stuft eine Verbindung an ihrer Obergrenze lediglich _niedriger ein_ — bei einem
> Pool mit nur einer Verbindung kann sie keine harte Begrenzung erzwingen. Daher ist dieses Semaphor der Mechanismus, der die
> Überlastung tatsächlich eindämmt.

### Abklingzeitbewusste Wiederholung für Kombinationen

Für jede Kombinationsstrategie (sofern aktiviert) wartet eine Anfrage, die einen 429-Fehler
aufgrund einer KURZEN vorübergehenden Abklingzeit festschreiben würde, diese ab und führt den Dispatch erneut aus, anstatt
den 429-Fehler zurückzugeben — dies deckt TPM-/RPM-Zeitfenster der Gemini-Klasse (~60 s `retry-after`)
bei Kombinationen mit mehreren Modellen ab, z. B. wenn beide Ziele einer Kombination aus zwei Modellen
eine Ratenbegrenzung pro Modell erreichen. Begrenzt durch `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) unter **Einstellungen → Resilienz**. Bei `quota_exhausted`
(bis Mitternacht gesperrt) oder Gründen wie Authentifizierung bzw. Nicht gefunden wird niemals gewartet.

Dieselbe Schranke deckt den Fall vor dem Dispatch ab (#16319): Wenn jedes Ziel einer
Kombination vor jedem Ausführungsversuch übersprungen wird, weil sich sein Modell in einer kurzen,
vorübergehenden Sperrphase befindet, wartet der Pfad ohne Ausführungsversuch unter denselben
Obergrenzen das Ende der Sperre ab und führt den Dispatch erneut aus, anstatt mit einem hinweislosen
`503 ALL_TARGETS_SKIPPED` zu antworten. Wenn kein Warten zulässig ist (Obergrenze,
Versuchsanzahl oder Budget erschöpft oder Funktion deaktiviert), wird die abschließende Antwort auf
`429 rate_limit_error` hochgestuft und enthält `retry_after` / `reset_at` aus dem frühesten
Ablaufzeitpunkt einer vorübergehenden Sperre; Kontingent-, Authentifizierungs- und Nicht-gefunden-Sperren behalten den hinweislosen 503-Fehler bei.

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

## 5. Zugangssteuerung für die Anfragewarteschlange (v3.8.49 · Issue #6593)

**Geltungsbereich**: die lokale Ratenbegrenzungswarteschlange pro Anbieter+Verbindung (`open-sse/services/rateLimitManager.ts`,
gestützt auf Bottleneck), eine Ebene unterhalb der drei oben genannten Mechanismen.

**`maxWaitMs` begrenzt die Wartezeit in der Warteschlange; `executionMaxWaitMs` begrenzt die Ausführung.**
Beide sind bewusst voneinander getrennt, und keines speist das andere.

`resilienceSettings.requestQueue.maxWaitMs` ist das **Budget für die Wartezeit in der Warteschlange**: Es
deckt das Warten auf einen Anbieter-Slot und den anschließenden Aufenthalt im Status QUEUED ab, und sein Timer wird
in dem Moment gelöscht, in dem der Auftrag QUEUED verlässt und mit der Ausführung beginnt
(`rateLimitManager.ts`, `wrappedFn`). Eine Anfrage, die dieses Budget überschreitet, erreicht
den Upstream nie. Der Standardwert beträgt 30000ms, bereitgestellt durch `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
in `src/lib/resilience/settings.ts` und festgeschrieben durch
`tests/unit/ratelimit-admission-control-6593.test.ts`, sodass eine Änderung daran
diesen Test fehlschlagen lässt, anstatt diesen Absatz unbemerkt veralten zu lassen.

`resilienceSettings.requestQueue.executionMaxWaitMs` ist der Wert, den Bottleneck
als `expiration` des Auftrags erhält; dessen Timer startet erst nach dem Dispatch. Er dient
als Absicherung für Executoren ohne eigenen Upstream-Timeout und wird auf den
eigenen Timeout des Executors für den Beginn des Abrufs angehoben, wenn dieser länger ist, sodass er
eine intakte laufende Antwort nicht abbrechen kann. Der Standardwert beträgt 600000ms (10 Min.).

Die Übergabe des Warteschlangenbudgets an `expiration` führte früher dazu, dass nicht-inkrementelle
Gateways mitten in der Verarbeitung abgebrochen wurden — sie benötigen legitimerweise mehrere Minuten bis zu den ersten Bytes —
und ist der Grund dafür, dass ein Ablauf als `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ausgegeben wird, während das Warteschlangenbudget den
Warteschlangen-Timeout-Code trägt. Beide Werte können über `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (Umgebung) oder das Dashboard
(**Einstellungen → Resilienz**) überschrieben werden. Beide werden bei der Normalisierung auf 1ms–24h begrenzt.

**Priorität für beide:** Die Umgebungsvariable liefert nur den _Standardwert_. Ein in
`resilienceSettings.requestQueue` persistierter Wert (Dashboard / API-Patch, gespeichert
in `key_value`) hat Vorrang, und ein verbindungsspezifischer Wert unter
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` hat wiederum Vorrang davor. Wird
die Umgebungsvariable in einer Bereitstellung gesetzt, die bereits über einen persistierten Wert verfügt,
ändert sich daher nichts — löschen oder aktualisieren Sie stattdessen die persistierte Einstellung.

Die Verweildauer in der Warteschlange wird durch `maxWaitMs` begrenzt; `maxQueueDepth` weiter unten begrenzt,
wie viele Aufrufer gleichzeitig in die Warteschlange aufgenommen werden dürfen.

**Im Body angegebene Wiederholungen: Taktung vs. Sperre.** Ein 429-Body kann seine eigene Wartezeit
angeben (Gemini `RetryInfo.retryDelay`, Text im Format „retry after Ns“), die
`updateFromResponseBody` ausliest. Eine Wartezeit, die innerhalb von `maxWaitMs` der Verbindung liegt,
dient der Taktung: Der Limiter leert für diese Dauer sein Reservoir, und Anfragen in der Warteschlange
werden verarbeitet, sobald es wieder aufgefüllt ist. Eine Wartezeit, die länger als `maxWaitMs` ist, kann
nicht von der Warteschlange ausgesessen werden — Gemini antwortet bei ausgeschöpftem Tageskontingent mit
`retryDelay: "86399s"`. Der weitergeleitete `Retry-After`-Wert im neu aufgebauten 429 (#16528)
bewirkt bereits, dass die Fallback-Engine das Modell für dieses Zeitfenster sperrt; würde der Limiter
jedoch ebenfalls für diese Dauer pausiert, würde weiterhin jeder Aufruf, der den Schlüssel früh erreicht
(etwa nach einem Resilienz-Reset), für die gesamten `maxWaitMs` blockiert. Wenn eine solche Wartezeit aus einem typisierten Google-`RetryInfo`-
Detail stammt (Provenienz `google_rpc_retry_info`) und der Limiter des Schlüssels
bereits auf das Modell beschränkt ist (siehe `getLimiterKey`), führt der 429 stattdessen zu einer Modellsperre
für diese Verbindung (`lockModelForLongBodyRetry` in
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, auf 24h begrenzt), und der
Limiter bleibt unpausiert. Die Kontoauswahl überspringt diese Sperre über
`isModelLocked()`, ebenso wie das Combo-Prä-Dispatch-Gate für Ziele, die an
die Verbindung gebunden sind. Bei antigravity, dessen Limiter pro Kontingentfamilie gilt, bezieht sich die Sperre
auf das konkrete Modell, wie auch die anderen Kontingentsperren. Der vom Client angeforderte Name
wird ebenfalls gesperrt, wenn er als Alias zu diesem Modell aufgelöst wurde, da diese Prüfungen
den angeforderten Namen verwenden; er wird exakt gesperrt (`lockExactModel`), sodass ein Alias, der
eine antigravity-Kontingentfamilie oder einen codex-Geltungsbereich überschreitet, nie selbst gesperrt wird. Ein
Hinweis in Prosa, ein nicht typisiertes `retryDelay` oder ein
von der gesamten Verbindung gemeinsam genutzter Limiter behält die Pause bei. Wenn der Limiter, den der
429-Pfad gerade neu aufgebaut hat, tatsächlich pausiert, wird ein Aufrufer, dessen verbleibende Warteschlangenzeit
vor dem Ende der Pause abläuft, sofort mit dem Warteschlangen-Timeout-Code
(`checkLimiterPause`) abgewiesen, anstatt diese Zeit abzuwarten; das aufgezeichnete Ende wird
vor dem Aufbau des Limiters verankert, wo Bottleneck seine Aktualisierungsuhr startet,
und jede spätere Änderung am Reservoir verwirft es. Abgedeckt durch
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` und
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — optionale Zugangsobergrenze (neu).** `resilienceSettings.requestQueue.maxQueueDepth`
begrenzt, wie viele Anfragen für eine Anbieter+Verbindung-Kombination gleichzeitig in der Warteschlange
liegen dürfen (noch nicht verarbeitet). Wenn die Warteschlange bereits `maxQueueDepth`
Anfragen enthält, wird eine neue Anfrage schnell mit einem typisierten
`code: "RATE_LIMIT_QUEUE_FULL"`-Fehler abgewiesen, **bevor** sie jemals `limiter.schedule()`
erreicht — dadurch ist die Ablehnung kostengünstig und erfolgt vor jeglicher nachgelagerten
Prompt-Komprimierungs-/Übersetzungsarbeit für diese Anfrage. Der Standardwert `0` =
deaktiviert, wodurch das bestehende Verhalten mit unbegrenzter Warteschlange erhalten bleibt; begrenzt auf 0–100000.
Kann über `RATE_LIMIT_MAX_QUEUE_DEPTH` (Umgebung) oder
`resilienceSettings.requestQueue.maxQueueDepth` (Dashboard/API-Patch) überschrieben werden.

Die Zugangsprüfung selbst ist eine reine Funktion
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), sodass
sie ohne einen echten Bottleneck-Limiter einem Unit-Test unterzogen werden kann.

> Der RFC, mit dem #6593 eröffnet wurde, schlug außerdem ein
> `bypassCompressionOnRateLimit`-Flag vor. Die Pipeline
> `open-sse/services/compression/` dieses Repositories führt eine
> Prompt-/Kontextkomprimierung für ausgehende LLM-Anfragen durch (`chatCore.ts`,
> im Bereich des Blocks `resolveCompressionSettings`/`selectCompressionStrategy`),
> keine HTTP-Antwortkomprimierung für erzeugte 429-Antworttexte — daher existiert
> kein entsprechender Codepfad für ein wörtlich umgesetztes Bypass-Flag. Dieser
> Prompt-Komprimierungsschritt wird derzeit außerdem _vor_ `withRateLimit()` in
> der Anfrage-Pipeline ausgeführt. Die Umordnung, um ihn bei einer Ablehnung
> aufgrund einer vollen Warteschlange zu überspringen, wäre daher eine separate,
> umfangreichere Änderung, die über den Umfang dieses Issues hinausgeht. Sie wurde
> hier bewusst **nicht** implementiert und bleibt einer Folgeänderung vorbehalten,
> falls die CPU-Einsparung das mit der Umordnung verbundene Risiko rechtfertigt.

### Sicherheitsnetz zur automatischen Aktivierung der Ratenbegrenzung und Verbindungsschutz (`rateLimitProtection`)

**Sicherheitsnetz zur automatischen Aktivierung** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, Standardwert `true`):
Standardmäßig aktiviert OmniRoute automatisch den Schutz durch Ratenbegrenzungs-Warteschlangen für alle aktiven Verbindungen zu API-Key-Providern (`getProviderCategory(provider) === "apikey"`). Dadurch wird sichergestellt, dass eingehende Anfragen an ratenempfindliche Upstream-API-Keys über Bottleneck in eine Warteschlange gestellt und gedrosselt werden, anstatt stoßweise Upstream-429-Fehler auszulösen. Das Sicherheitsnetz kann über die Umgebungsvariable `RATE_LIMIT_AUTO_ENABLE` überschrieben werden (`false`/`0`/`off` deaktiviert es, `true`/`1`/`on` erzwingt seine Aktivierung). Diese hat Vorrang vor der dauerhaft gespeicherten Dashboard-Einstellung (**Einstellungen → Resilienz** / `PATCH /api/resilience`).

**Semantik von `rateLimitProtection` pro Verbindung:**
Der Ratenbegrenzungsschutz pro Verbindung wird über das boolesche Feld `rateLimitProtection` für Provider-Verbindungen verwaltet (in SQLite dauerhaft als `rate_limit_protection` gespeichert):

- **Explizit aktiviert (`rateLimitProtection === true`)**: Der Ratenbegrenzungsschutz ist für diese Verbindung ausdrücklich aktiviert, unabhängig von der Provider-Kategorie oder davon, ob das Sicherheitsnetz zur automatischen Aktivierung eingeschaltet ist.
- **Explizit deaktiviert (`rateLimitProtection === false`)**: Deaktiviert den expliziten Schutz, nimmt eine aktive API-Key-Verbindung jedoch **nicht** vom globalen Sicherheitsnetz zur automatischen Aktivierung aus. In `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) sind `false` und `undefined` gleichbedeutend: Nur `rateLimitProtection === true` wird als explizite Überschreibung behandelt. Wenn `rateLimitProtection` den Wert `false` hat (oder nicht gesetzt ist), erfüllt eine aktive API-Key-Verbindung weiterhin die Bedingung zur automatischen Aktivierung und bleibt durch die Ratenbegrenzung geschützt.
- **Keine Abwahlmöglichkeit pro Verbindung**: Derzeit kann ein Betreiber nicht festlegen, dass „diese einzelne aktive API-Key-Verbindung ohne Schutz durch eine Ratenbegrenzungs-Warteschlange ausgeführt werden muss“, während die automatische Aktivierung für andere Verbindungen eingeschaltet bleibt. Damit API-Key-Verbindungen vollständig ohne Ratenbegrenzungs-Warteschlangen ausgeführt werden, muss das Sicherheitsnetz global deaktiviert werden (`RATE_LIMIT_AUTO_ENABLE=false` oder `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Unterstützte Schreibpfade:**

- **`POST /api/rate-limits`**: Der unterstützte Verwaltungs-Schreibpfad zum Umschalten von `rateLimitProtection` für eine Verbindung (`{ connectionId: string, enabled: boolean }`). Ein Aufruf mit `enabled: true` aktiviert den expliziten Schutz; ein Aufruf mit `enabled: false` entfernt den expliziten Schutz (aktive API-Key-Verbindungen bleiben jedoch weiterhin durch das globale Sicherheitsnetz abgedeckt, wenn die automatische Aktivierung eingeschaltet ist).
- **`PUT /api/providers/[id]`**: Akzeptiert oder ändert `rateLimitProtection` bewusst **nicht** (#11278). Das Aktualisieren der Metadaten einer Provider-Verbindung über `PUT /api/providers/[id]` ändert niemals den dauerhaft gespeicherten Zustand des Ratenbegrenzungsschutzes.

---

## 6. Durchsatz-Watchdog für langsame Streams (#9709)

Die optionale Schutzfunktion `resilienceSettings.streamRecovery.throughputWatchdog` erkennt
einen Upstream, der weiterhin Chunks sendet, aber Assistentenausgaben unterhalb der
konfigurierten Rate für nutzbare Ausgaben erzeugt. Sie unterscheidet sich bewusst vom
Leerlauf-Timeout: Heartbeats und Metadaten setzen keinen der beiden Timer zurück und
gelten nicht als Fortschritt. Sie unterscheidet sich außerdem von der festen Frist für
Versuche (#9153), die unabhängig von der Ausgabequalität eine absolute Sicherheitsgrenze
bleibt.

Der Watchdog benötigt eine Aufwärmphase, gefolgt von einem vollständigen gleitenden
Zeitfenster, bevor er abbrechen kann. Er zählt Text-Deltas aus Ausgabeereignissen der
Chat Completions API und Responses API (als konservative Näherung für UTF-8-Bytes),
ignoriert Ereignisse, die ausschließlich Nutzungsdaten enthalten oder leer sind, und
setzt die Bewertung aus, solange Tool-Aufruf- oder Reasoning-Ereignisse verarbeitet
werden. Er ist standardmäßig deaktiviert und kann mit
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` aktiviert werden; Zeitfenster, Aufwärmphase,
Mindestrate und minimal messbare Ausgabe werden durch die normale
Normalisierungsschicht der Resilienz-Einstellungen begrenzt.

Wenn der Watchdog aktiviert ist, wird ein von ihm ausgelöster Abbruch nur auf den
aktiven Upstream-Versuch angewendet. Bevor für den Client sichtbare Bytes gesendet
wurden, kann der bestehende Early-Recovery-Pfad für dasselbe Konto den Versuch erneut
öffnen. Nach dem Commit wird der Stream niemals blind erneut abgespielt; nur der
bestehende Vertrag für eine sichere Fortsetzung während des Streams kann ein Suffix
anfügen. Die Finalisierung erfolgt weiterhin genau einmal, sodass Nutzungsabrechnung
und Semaphore-Freigabe nicht dupliziert werden.

---

## 7. Neufestlegung des Upstream-Status (falsch ausgewiesene Kontingentfehler)

**Geltungsbereich:** ein Upstream-Gateway, das eine vorübergehende Kontingenterschöpfung mit dem falschen HTTP-Status meldet.

**Zweck:** einen irreführenden Status VOR der Klassifizierung korrigieren, damit nachgelagerte Verbraucher (Fallback-Engine, Combo-Aggregation und die clientseitige Antwort) die tatsächliche, wiederholbare Natur des Fehlers erkennen.

Einige Gateways signalisieren eine VORÜBERGEHENDE Kontingenterschöpfung mit einem
nicht wiederholbaren HTTP-Status. `agentrouter.org` gibt `403` (manchmal `400`) mit
einem chinesischen Antworttext (`用户额度不足` / `额度不足`) anstelle des
standardmäßigen Status `429` zurück. Clients wie Claude Code behandeln `403` als
dauerhaften Fehler und brechen die Sitzung ab; ohne Korrektur würde die
Fallback-Engine ihn statt als Kontingentereignis als `AUTH_ERROR` klassifizieren.

**Implementierung:**

- Registry + Matcher: `open-sse/config/upstreamStatusRestatement.ts` — eine
  anbieterspezifische Liste von Regeln (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), die über `applyStatusRestatement()`
  abgeglichen wird.
- Aufrufstelle: der Block `providerFailure:` in `open-sse/handlers/chatCore.ts`
  (etwa bei Zeile 3654), unmittelbar nachdem `parseUpstreamError()` eine
  Upstream-Antwort mit einem HTTP-Fehlerstatus (`!providerResponse.ok`) geparst hat,
  und bevor eine Klassifizierung ausgeführt wird, sodass jeder nachgelagerte
  Verbraucher den korrigierten Status sieht. Fehler, die in einen `200`-SSE-Stream
  eingebettet sind, durchlaufen einen separaten, späteren Stream-Parsing-Pfad und
  werden von diesem Hook derzeit **nicht** abgedeckt — dies ist eine bekannte
  Einschränkung, die für den fehlerhaften Status von agentrouter noch nicht relevant
  ist (da dieser als HTTP-Fehlerstatus auftritt).
- Wiederholungsberechtigung: `429` ist in `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) enthalten, sodass ein neu
  festgelegter Fehler ein echtes Wiederholungszeitfenster erhält, anstatt als
  nicht wiederholbarer `403` ausgegeben zu werden.
- Der synthetische Wert `60s` für `defaultRetryAfterMs`
  (`upstreamStatusRestatement.ts`) ist lediglich das, was die neu festgelegte
  Antwort dem **Client** mitteilt; er ist nicht selbst die Dauer des internen
  Cooldowns bzw. der Sperre der Verbindung — diese wird separat durch den
  Mechanismus gesteuert, der den neu festgelegten Fehler tatsächlich verarbeitet
  (der eskalierende Backoff von Connection Cooldown, §2, mit einer Basis von `3s`
  für API-Schlüssel-Anbieter; oder Model Lockout, §3, für Anbieter mit
  modellspezifischen Kontingenten wie agentrouter). Der Router kann intern bereits
  vor Ablauf des dem Client mitgeteilten 60-Sekunden-Fensters wieder für einen
  Versuch infrage kommen — dies ist beabsichtigter Spielraum und kein Fehler.

Dauerhafte Fehler (`无权访问模型` von agentrouter — kein Zugriff auf dieses Modell)
werden NIEMALS neu festgelegt: `excludeMarkers` verwirft die Regel selbst dann, wenn
`textMarkers` zutrifft, sodass der Fehler seinen ursprünglichen Status behält und
nicht endlos wiederholt wird. Die entsprechende Klassifizierungsregel des Anbieters
(`agentrouter-model-access-denied` in `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, ein deklarierter Basis-Cooldown von `6h`)
wird von `checkFallbackError` (`open-sse/services/accountFallback.ts`) _vor_ dem
generischen frühen Rücksprung `FORBIDDEN` der apikey-Kategorie ausgewertet, wobei dies
durch `honorsRuleLockScope(provider)` eingeschränkt wird (#10334 — derzeit über die
Allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` in `providerErrorRules.ts` ausschließlich
für agentrouter aktiviert). Der deklarierte 6-Stunden-Cooldown der Regel wird als
`fallbackResult.baseCooldownMs` weitergereicht, fließt jedoch weiterhin in den bereits
vorhandenen Lockout-Pfad für modellspezifische Kontingente
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, durch #10334 mit
Ausnahme der Cooldown-Quelle unverändert) ein: Wie jeder andere Modell-Lockout wird er
auf `mlSettings.maxCooldownMs` des Betreibers (standardmäßig `1_800_000ms` / 30min)
begrenzt, und der _persistierte Lockout-Grund_ bleibt der bereits vorhandene,
fest codierte Wert `"forbidden"` und nicht `"auth_error"` aus der Regel — nur die
Cooldown-Dauer wird durchgängig berücksichtigt, nicht die Zeichenfolge für den Grund.
Die Verbindung selbst bleibt aktiv; andere Modelle derselben Verbindung sind nicht
betroffen.

Neu formulierte Kontingentfehler (`额度不足`) erreichen in der Produktion eine Anbieterregel
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ohne eigene deklarierte Abklingzeit — es gilt der Standardwert
für den skalierten Backoff der Persistenzschicht). Seit #10334 wird `scope` bei
`ProviderErrorRuleMatch` durchgängig verarbeitet, aber **nur** für Anbieter in
der Positivliste `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
derzeit nur `"agentrouter"`, gesteuert über `honorsRuleLockScope()`). Für alle
anderen Anbieter bleibt `scope` rein informativ, genau wie vor #10334.
`checkFallbackError` stellt den Gültigkeitsbereich der zutreffenden Regel als
`fallbackResult.ruleScope` bereit; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ist die gemeinsame Schutzprüfung, die bestätigt,
dass ein `ruleScope` tatsächlich sicher als verbindungsweites, selbstheilendes
Signal berücksichtigt werden kann (Gültigkeitsbereich `"connection"`, Grund
`quota_exhausted`, niemals `permanent`, niemals `creditsExhausted` — eine
Absicherung gegen eine zukünftige Regel, die den Gültigkeitsbereich
`"connection"` mit einem permanenten Kontostatus kombiniert). Zwei Verbraucher
rufen sie auf:

- **Persistenz** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  Statt in den **modellspezifischen** Sperrzweig für Passthrough-Anbieter zu
  fallen (agentrouter ist `passthroughModels: true` → `hasPerModelQuota()`
  gibt `true` zurück), wird eine **temporäre Verbindungsabklingzeit**
  angewendet — `testStatus: "unavailable"` + `rateLimitedUntil`, niemals ein
  endgültiger Status (`credits_exhausted`/`banned`/`expired`) —, sodass die
  Verbindung nach Ablauf der Abklingzeit automatisch wiederhergestellt wird,
  statt ein manuelles Zurücksetzen der Zugangsdaten zu erfordern.
  Übersprungen für Verbindungen mit `disableCooling: true` (#2997): Bei dieser
  Abwahl wird stattdessen auf die modellspezifische Sperre zurückgefallen
  (ein dokumentierter Kompromiss — siehe den Codekommentar oberhalb des
  Zweigs).
- **Combo-Routing innerhalb derselben Anfrage** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): Dieselbe Schutzprüfung
  markiert die Verbindung in der speicherinternen Menge
  `exhaustedConnections`, indiziert durch `${provider}:${connectionId}`. Dies
  überspringt nur ein verbleibendes Ziel DERSELBEN ANFRAGE, das _selbst bereits
  genau diese `connectionId`_ in seinem eigenen Zielobjekt enthält
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` vor der Suche in `exhaustedConnections`) — eine einfache
  Modelllisten-Combo, bei der benachbarte Ziele keine eigene festgelegte
  `connectionId` enthalten und eine solche erst je Weiterleitung aus dem
  `X-OmniRoute-Selected-Connection-Id`-Header der Antwort aufgelöst wird,
  erzielt niemals einen Treffer für diesen Schlüssel. In diesem häufigen Fall
  ist der eigentliche Schutz davor, dass ein verbleibender Zweig das gerade
  ausgeschöpfte Konto erneut verwendet, NICHT diese Menge — sondern die oben
  beschriebene Persistenzschicht (der Wert `rateLimitedUntil` der Verbindung
  liegt nun in der Zukunft) zusammen damit, dass dieselbe Schutzprüfung für
  den Fehler `transientRateLimitedProviders` unterdrückt (siehe
  „Zweistufiges Design“ und den Codekommentar zum Zweig
  `isAgentrouterConnectionQuotaScope` in `targetExhaustion.ts`): Da diese
  Menge unmarkiert bleibt, wird die erzwungene Zulassung durch
  `allowRateLimitedConnection` in `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) für die verbleibenden
  Zweige des Anbieters NICHT aktiviert. Daher wird der Filter
  `rateLimitedUntil` der Zugangsdaten-Auswahl
  (`src/sse/services/auth.ts:1238`) normal berücksichtigt, und ein
  verbleibender Zweig wählt entweder eine andere, weiterhin zulässige
  agentrouter-Verbindung aus oder schlägt fehl, weil keine Zugangsdaten
  verfügbar sind — er erzwingt keine erneute Verwendung der Verbindung, für
  die dieser Zweig gerade eine Abklingzeit festgelegt hat.

### Zweistufiges Design: Statusneuformulierung, dann Klassifizierung

Die Statusneuformulierung (`upstreamStatusRestatement.ts`) und die
Anbieterklassifizierungsregeln (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) sind separate Register, die beide nach Anbieter-ID
und Textmarkierungen indiziert sind, jedoch an verschiedenen Stellen
ausgeführt werden und unterschiedlichen Zwecken dienen: Die Neuformulierung
schreibt den HTTP-Status frühzeitig in `chatCore.ts` um;
Klassifizierungsregeln bestimmen innerhalb von `checkFallbackError()`
(`open-sse/services/accountFallback.ts`) den Fallback-`reason` und den
Sperr-`scope` (`model` / `provider` / `connection`).

Klassifizierungsregeln sehen den vollständigen Fehler**text** (der zum
Abgleich von Textmarkierungen im Antwortkörper wie `额度不足` benötigt wird)
nur für Anbieter, die in der Positivliste `FULL_TEXT_RULE_PROVIDERS` in
`providerErrorRules.ts` aufgeführt sind — derzeit nur `"agentrouter"`. Für
jeden anderen Anbieter aus dem **integrierten Katalog** übergibt
`checkFallbackError` an `getProviderErrorRuleMatch` nur den strukturierten
Fehler (`{code, type}`), was für Header-, Status- und Code-basierte Regeln
ausreicht, aber Textmarkierungen im Antwortkörper nicht erkennen kann. Die
Hilfsfunktion `resolveRuleMatchBody()` führt diese Auswahl durch: den
vollständigen Fehlertext für Anbieter auf der Positivliste, andernfalls den
strukturierten Fehler. Das Hinzufügen eines **integrierten** Anbieters zu
`FULL_TEXT_RULE_PROVIDERS` ist eine explizite anbieterspezifische Aktivierung
— sie existiert, damit der Standardpfad für jeden nicht auf der Liste
stehenden Anbieter Byte für Byte unverändert bleibt.

Der `scope` einer Regel (`model` / `provider` / `connection`) ist eine von
`FULL_TEXT_RULE_PROVIDERS` unabhängige Aktivierung: `checkFallbackError` stellt
ihn lediglich als `fallbackResult.ruleScope` bereit, und nachgelagerte
Verbraucher berücksichtigen ihn nur für Anbieter in der Positivliste
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` in derselben Datei als etwas anderes als
eine informative Kennzeichnung (`gated via
honorsRuleLockScope()` — derzeit nur `"agentrouter"`). Welche Wirkung ein
Treffer mit `scope: "connection"` tatsächlich hat, sobald ein Anbieter auf
dieser Positivliste steht, ist oben unter „Neu formulierte Kontingentfehler“
beschrieben.

**#11104 — vom Operator deklarierte Regeln umgehen beide Positivlisten.** Ein Operator kann
zur Laufzeit über `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
eine anbieterspezifische Regel deklarieren, ohne diese Datei zu bearbeiten.
Eine Operatorregel durch `FULL_TEXT_RULE_PROVIDERS`/
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` zu beschränken — Positivlisten, die das
**standardmäßige** Verhalten der integrierten Katalogregeln schützen sollen —
würde den Einstellungsmechanismus für alle Anbieter außer den dort bereits
aufgeführten wirkungslos machen, da die Deklaration der Regel bereits die
ausdrückliche Zustimmung des Operators darstellt. `resolveRuleMatchBody()`
und `honorsRuleLockScope()` prüfen beide zuerst
`hasOperatorRuleForProvider()`: Ein Anbieter mit einer Operatorregel erhält
den unverarbeiteten Fehlertext, und sein deklarierter `scope` wird
berücksichtigt, unabhängig davon, ob er zusätzlich in einer der Positivlisten
aufgeführt ist.

**Bekannte Lücke — `providerRuleRegistry` wird bei HTTP 400 nie abgefragt.**
Der `BAD_REQUEST`-Zweig von `checkFallbackError` klassifiziert den Status 400
vollständig anhand seiner eigenen Muster-Arrays (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` usw. in `accountFallback.ts`) und kehrt zurück,
bevor der darüberliegende Zweig
`configuredRule`/`getProviderErrorRuleMatch` erreicht wird. Eine integrierte
Katalogregel (oder eine Operatorregel) mit `status: 400` ist syntaktisch
gültig, wird aber nie ausgelöst. Derzeit zielt keine bestehende Regel auf 400,
sodass die Produktion nicht betroffen ist — eine zukünftige 400-Regel
erfordert jedoch zunächst eine Änderung an diesem Zweig. Das ist eine größere
Änderung als das Hinzufügen einer Regel (sie klassifiziert 400 für jeden
Anbieter neu, der sich bereits auf das Verhalten der Muster-Arrays verlässt)
und liegt außerhalb des Umfangs einer Regelerweiterung für einen einzelnen
Anbieter.

### Hinzufügen eines neuen Gateways mit falscher Kontingentangabe

1. Registrieren Sie ein Regel-Array in `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Halten Sie `textMarkers`
   anbieterspezifisch; verwenden Sie niemals generische englische Formulierungen
   erneut, die mit `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) kollidieren.
2. Registrieren Sie optional Klassifizierungsregeln in
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), um den
   richtigen Sperrbereich auszuwählen (`connection` für ein kontoweites
   Kontingent, `model` für modellspezifische Fehler). Dieser Schritt wirkt
   sich in der Produktion nur bei Anbietern aus, deren Regeln den vollständigen
   Fehlertext benötigen (Body-Marker): Fügen Sie die Anbieter-ID in derselben
   Datei zu `FULL_TEXT_RULE_PROVIDERS` hinzu — andernfalls übergibt
   `checkFallbackError` der Regel stets nur den strukturierten Fehler
   `{code, type}`, und eine Regel für den Body-Text wird bei Live-Datenverkehr
   niemals übereinstimmen. Regeln, die ausschließlich anhand von
   `status`/`headers` übereinstimmen (wie die von Opencode oder Minimax),
   benötigen diese ausdrückliche Aktivierung nicht. Falls die Regel außerdem
   `scope: "connection"` deklariert und tatsächlich eine verbindungsweite
   Abklingzeit sowie das Überspringen der Kombination innerhalb derselben
   Anfrage beabsichtigt sind (und nicht nur eine informative Kennzeichnung),
   fügen Sie die Anbieter-ID in derselben Datei zu
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` hinzu — dies steuert die
   `isAgentrouterConnectionQuotaScope()`-artige Verarbeitung in
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) und
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); andernfalls wird `scope`
   zwar weiterhin über `fallbackResult.ruleScope` weitergegeben, aber nichts
   reagiert darauf.
3. Fügen Sie Unit-Tests nach dem Vorbild von
   `tests/unit/upstream-status-restatement.test.ts` und
   `tests/unit/agentrouter-error-rules.test.ts` hinzu (einschließlich der
   Schutzprüfungen für „nicht dauerhaft“ / „nicht `creditsExhausted`“ sowie —
   falls der Anbieter die Positivliste benötigt — eines Tests, der bestätigt,
   dass `resolveRuleMatchBody()` nur für diesen Anbieter den vollständigen Text
   zurückgibt).

An `chatCore.ts`, `classifyError` oder der Kombinationslogik sind keine
Änderungen erforderlich.

#### Nach ausgehendem Datenverkehr gruppierte Sperre (#10880)

Anbieter in `EGRESS_BUCKETED_LOCK_PROVIDERS` (Opencode-Familie) werden als
nach IP gruppierte Upstream-Anbieter behandelt (die kostenlose Opencode-Stufe
ist nach IP und nicht nach Konto gruppiert — siehe #9611): Ein mit
`quota_exhausted` **oder** `rate_limit_exceeded` klassifizierter Status 429
versetzt jede Verbindung der Positivlistenfamilie, deren zuletzt bekannte
ausgehende IP-Adresse mit derjenigen der fehlgeschlagenen Verbindung
übereinstimmt, in eine Abklingzeit, bevor die Rotation sie ausprobieren kann
— dadurch werden N-1 garantiert fehlschlagende Upstream-Aufrufe vermieden
(entspricht dem Muster von #10460/#10525). `rate_limit_exceeded` ist bewusst
enthalten: Im `markAccountUnavailable`-Pfad stimmen die Opencode-spezifischen
Regeln nie überein (keine Header/kein Body wird an `checkFallbackError`
übergeben, Opencode ist nicht in `FULL_TEXT_RULE_PROVIDERS` enthalten).
Daher wird ein 429-Fehler, dessen Body den Text zum Abonnementkontingent
enthält („monthly usage limit reached“), durch den Kontingenttext-Fallback
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 Stunde Abklingzeit)
als `quota_exhausted` klassifiziert, bevor die `status_429`-Regel überhaupt
erreicht wird — während ein 429-Fehler ohne Kontingenttext (einfache
Ratenbegrenzung) über die `status_429`-Regel als `rate_limit_exceeded`
klassifiziert wird und dennoch die gesamte IP-Familie in die Abklingzeit
versetzt. Bei einem Anbieter auf der Positivliste ist eine nach IP gruppierte
Ratenbegrenzung dasselbe Signal wie ein erschöpftes Kontingent. Tatsächliche
Einschränkungen:

- **Best-Effort**: Die Sperre ermittelt die zuletzt bekannte `egress_ip` der
  Verbindung aus `proxy_logs` (24-Stunden-Fenster, synchron, ohne Cache). Bei
  kaltem Cache (Egress-IP wurde nie geprüft) oder fehlender Zeile → wird die
  fehlgeschlagene Verbindung durch den Zweig weiterhin in den Cooldown versetzt
  (wie bisher protokolliert), lediglich keine Geschwisterverbindung wird
  gesperrt.
- **Nie terminal**: Der Cooldown ist ein sich erneuerndes Kontingentfenster
  (`testStatus: "unavailable"`); aus einem Signal auf IP-Ebene wird niemals ein
  permanenter Zustand abgeleitet. Verbindungen mit `disableCooling` überspringen
  den Zweig vollständig.
- **Die Sperrgranularität ändert sich für die Familie auf der Positivliste**:
  Dies ist eine Änderung des Geltungsbereichs, nicht nur eine Optimierung für
  Geschwisterverbindungen. opencode ist ein `passthroughModels`-Provider,
  weshalb vor diesem Zweig ein 429 zu einer Sperre pro MODELL führte; nun führt
  er zu einem Verbindungs-Cooldown — auch bei einem Betreiber, der nur eine
  einzige Verbindung ohne jegliche Geschwisterverbindung verwendet. Dies ist
  die Granularität, die die opencode-Regeltabelle bereits als korrekt deklariert
  (`scope: "connection"`, `providerErrorRules.ts`), die bislang jedoch nie
  berücksichtigt wurde, da opencode nicht in
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` enthalten ist. Der Zweig schreibt den
  Cooldown der fehlgeschlagenen Verbindung sowie deren `backoffLevel` selbst,
  analog zum verbindungsbezogenen agentrouter-Zweig, und kehrt zurück — der
  Block pro Modell und der darunterliegende generische Pfad werden nie
  erreicht.
- **Combo eingeschlossen**: Wie beim agentrouter-Zweig ignoriert der
  Geltungsbereich bewusst die Herabstufung durch
  `persistUnavailableState`/`isCombo`, die ein Combo-Aufrufer auf einen 429
  anwendet. Eine Sperre pro Modell ist keine schwächere Form dieses
  Geltungsbereichs, sondern verwendet die falsche Einheit: Sie sagt nichts über
  die ausgeschöpfte IP aus, sodass die Combo-Rotation weiterhin für jede
  Geschwisterverbindung jeweils einen garantiert fehlschlagenden Aufruf
  verbrauchen würde.
- **Sicherheit von Geschwisterverbindungen**: Eine Geschwisterverbindung, die
  bereits terminal ist (banned/credits_exhausted) oder sich bereits in einem
  längeren Cooldown befindet, wird niemals überschrieben.
- **Exklusive Positivliste**: Die Erweiterung von
  `EGRESS_BUCKETED_LOCK_PROVIDERS` ist eine ausdrückliche Entscheidung des
  Verantwortlichen; keine generische Verdrahtung (Muster #10334/#10419). Die
  Abfrage der Geschwisterverbindungen bindet dieselbe Positivliste ein, anstatt
  sie als SQL-Literal zu wiederholen, sodass ihre Erweiterung eine einzeilige
  Änderung bleibt.
- **Egress-IP-Rotation in beide Richtungen**: Das Abfragefenster (24 Std.) ist
  wesentlich größer als die TTL des Egress-IP-Caches (5 Min.), daher ist die
  „zuletzt bekannte IP“ ein historischer Wert und nicht der aktuelle Zustand.
  Wenn der Proxy einer Verbindung innerhalb des Fensters rotiert ist, kann die
  Sperre eine tatsächlich gemeinsam genutzte IP **übersehen** (die erfasste IP
  ist die neue, noch nicht ausgeschöpfte IP) — und umgekehrt kann sie **eine
  Geschwisterverbindung in den Cooldown versetzen, die inzwischen von der
  ausgeschöpften IP wegrotiert ist**. Der zweite Fall kostet diese
  Geschwisterverbindung ein Cooldown-Fenster; beide Fälle werden als
  Best-Effort-Einschränkungen einer verlaufsbasierten Abfrage akzeptiert.
- **Kosten**: Zwei begrenzte Scans von `proxy_logs` (über `idx_pl_timestamp`
  auf das Zeitfenster gefiltert), ausschließlich mit der Häufigkeit von
  429-Antworten. Kein neuer Index (Migration 134 YAGNI). Gemessen anhand einer
  Datenbankkopie mit realem Datenverkehr und moderater Größe; eine Instanz mit
  hohem Durchsatz enthält im selben Zeitfenster proportional mehr Zeilen.

---

## Weitere Resilienzfunktionen

- **20 Routing-Strategien** (Priorität, gewichtet, Round-Robin, Kontextweiterleitung, Fill-First, p2c, zufällig, am wenigsten verwendet, kostenoptimiert, Reset-bezogen, Reset-Zeitfenster, Reservekapazität, quotengewichtet, strikt zufällig, automatisch, lkgp, kontextoptimiert, cacheoptimiert, Fusion, Pipeline) — siehe [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Reset-bezogenes Routing** (v3.8.0) — priorisiert Verbindungen anhand des Zeitpunkts der Quotenrücksetzung.
- **Fallback im Hintergrundmodus** — Responses API `background: true` wird mit einer Warnung auf synchrone Verarbeitung zurückgestuft.
- **Dynamische Erkennung von Tool-Limits** — weicht auf andere Anbieter aus, wenn Limits für die Anzahl der Tools erreicht werden.
- **Notfall-Fallback** — wird durch `OMNIROUTE_EMERGENCY_FALLBACK` gesteuert; Betreiber können die Einstellung auf der Seite „Feature Flags“ ohne Neustart überschreiben.

---

## Debugging

- Antworten gewichteter Kombinationen mit `503 all_targets_cooling_down` (`Retry-After` ist gesetzt, `diagnostics.excluded` führt jedes Ziel mit `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` auf) → der Pool ist konfiguriert und verbunden, aber jedes Ziel wird aktuell durch einen Resilienz-Timer ausgeschlossen; die Warnung `[COMBO] Weighted selection: every target excluded before dispatch — …` nennt die Gründe und die verbleibenden Sekunden. Ein `404 no_executable_targets` derselben Kombination bedeutet, dass kein Resilienz-Timer beteiligt war (nichts zur Ausführung vorhanden oder die Verfügbarkeitsprüfung ist für jedes Konto fehlgeschlagen). Implementiert in `open-sse/services/combo/pinRecovery.ts` auf Grundlage der in `targetResolution.ts` erfassten Ausschlüsse.
- Alle Schlüssel eines Anbieters werden übersprungen → sowohl den Zustand des Circuit Breakers ALS AUCH `rateLimitedUntil`/`testStatus` jeder Verbindung prüfen.
- Anbieter nach dem Rücksetzzeitfenster dauerhaft ausgeschlossen → Code liest den rohen Wert `state` anstelle von `getStatus()`/`canExecute()`.
- Ein Schlüssel schlägt fehl, andere sollten funktionieren → Verbindungs-Cooldown gegenüber dem Circuit Breaker bevorzugen.
- Nur ein Modell schlägt fehl → Modellsperre gegenüber Verbindungs-Cooldown bevorzugen.
- Der Zustand sollte sich selbst wiederherstellen, tut es aber nicht → auf einen zukünftigen Zeitstempel sowie einen Lesepfad prüfen, der den abgelaufenen Zustand aktualisiert. Dauerhafte Statuswerte erfordern manuelle Änderungen.

---

## TLS-Fingerprinting und Tarnung

Anbieterspezifische Tarnmechanismen (JA3/JA4, CCH, Verschleierung) sind separat dokumentiert — siehe `docs/security/STEALTH_GUIDE.md` (git; nicht in `/docs` kompiliert).

---

## Resilienztests (Phase 8 · Block C)

Zusätzlich zu Unit-Tests für die Resilienzlogik testen drei Tests die Laufzeitumgebung unter
realen Belastungs-/Fehlerbedingungen (alle sind Integrations-/Nightly-Tests — keiner blockiert PRs):

| Test          | Beschreibung                                                                                                                                                                                                                | Ausführung                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos         | Ein simuliertes Upstream-Node injiziert reale Latenz/Resets/Timeouts/503-Fehler; überprüft, ob sich der Circuit Breaker öffnet/wiederherstellt und `checkFallbackError` 503 als wiederherstellbaren Fallback klassifiziert. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-Wachstum | ~500 Streams pro `createSSEStream` unter `--expose-gc`; schlägt fehl, wenn der Heap über den Grenzwert hinaus wächst (OOM-Schutz #3069).                                                                                    | `npm run test:heap`                      |
| k6-Dauertest  | Dauerlast gegen `/api/monitoring/health`; p95-/Fehlerschwellenwerte.                                                                                                                                                        | `k6 run tests/load/k6-soak.js` (nightly) |

Orchestriert durch `.github/workflows/nightly-resilience.yml` (Cron + manuelle Ausführung). Im
standardmäßigen `test:integration` überspringen sich Chaos- und Heap-Test selbst (ohne `RUN_CHAOS_INT`/`--expose-gc`).

---

## Siehe auch

- [Architekturleitfaden](./ARCHITECTURE.md) — Systemarchitektur und Interna
- [Benutzerhandbuch](../guides/USER_GUIDE.md) — Anbieter, Kombinationen, CLI-Integration
- [Auto-Combo-Engine](../routing/AUTO-COMBO.md) — Bewertung anhand von 16 Faktoren, Moduspakete
