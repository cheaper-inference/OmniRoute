# Resilience Guide (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ma trzy różne, ale powiązane mechanizmy odporności. Każde z nich ma inny zakres i cel. Trzymaj je oddzielnie podczas debugowania zachowania routingu.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> źródło: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Pierwszeństwo środowiska i pulpitu nawigacyjnego dla przełączników odporności.** Przełączniki odporności opt-in wysyłane ze środowiska — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — dostarczają tylko _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Wartość logiczna pozostała w `resilienceSettings` (Dashboard →** Ustawienia → Odporność** / `PATCH /api/resilience`, przechowywany w `key_value`) wygrywa z wartością env: normalizacja (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) utrzymuje przechowywaną wartość logiczną, gdy taka istnieje. Ustawienie takiego env var na `true` we wdrożeniu, w którym pulpit nawigacyjny został już zapisany, `false` dlatego nic nie zmienia — przełącz przełącznik** Ustawienia → Odporność** (lub wyczyść zapisane pole).

## 1. Circuit Breaker dostawcy

**Zakres:** cały dostawca (np. `glm`, `openai`, `anthropic`).

**Cel:** zaprzestanie kierowania ruchu do dostawcy, który wielokrotnie zawodzi na poziomie usługi nadrzędnej (upstream).

**Implementacja:**

- Klasa główna: `src/shared/utils/circuitBreaker.ts`
- Integracja: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API statusu: `GET /api/monitoring/health`
- API resetowania: `POST /api/resilience/reset`
- Wrappery: `open-sse/services/accountFallback.ts`
- Tabela w bazie danych: `domain_circuit_breakers`

**Stany:**

- `CLOSED` — normalny ruch dozwolony
- `DEGRADED` — ruch nadal dozwolony, ale śledzona jest podwyższona liczba błędów dostawcy; powraca do `CLOSED` po wystarczającej liczbie sukcesów, po pomyślnym teście połączenia albo po upływie najdłuższego czasu wstrzymania `OPEN` dla ostatniego rodzaju błędu (wartość `cooldownByKind` dla tego rodzaju, w przeciwnym razie `resetTimeout`, × `maxBackoffMultiplier`, co najmniej jeden cooldown) bez nowego błędu
- `OPEN` — dostawca tymczasowo zablokowany; routing combo go pomija
- `HALF_OPEN` — upłynął czas resetowania; dozwolone jest żądanie sondy

**Konfigurowalne wartości domyślne (`open-sse/config/constants.ts`, dostępne w Dashboard → Settings → Resilience):**

| Klasa   | Degradacja przy | Otwarcie przy | Czas resetowania |
| ------- | --------------- | ------------- | ---------------- |
| OAuth   | 5 błędów        | 8 błędów      | 60s              |
| API-key | 7 błędów        | 12 błędów     | 30s              |
| Local   | wyliczana       | 2 błędów      | 15s              |

`degradationThreshold` określa, kiedy dostawca przechodzi w stan `DEGRADED`; `failureThreshold` określa, kiedy zostaje otwarty i pomijany. Profile dostawców lokalnych nie są jeszcze dostępne na stronie ustawień Resilience.

**Kody wyzwalające:** tylko statusy na poziomie dostawcy `[408, 500, 502, 503, 504]`. NIE wyzwalają przy błędach na poziomie konta (większość 401/403/429 — te należą do cooldownu lub blokady konta).

**Leniwe odtwarzanie (lazy recovery):** gdy stan `OPEN` wygasa, `getStatus()`, `canExecute()`, `getRetryAfterMs()` odświeżają stan do `HALF_OPEN`. Te same odczyty (oraz kolejny błąd) powodują stopniowy powrót nieaktualnego stanu `DEGRADED` do `CLOSED`. Nie jest potrzebny żaden timer działający w tle.

---

### Opcjonalny globalny Provider Cooldown (brama okna czasowego)

Czwarta, **opcjonalna** warstwa (`PROVIDER_COOLDOWN_ENABLED`, domyślnie **wyłączona**)
przechowuje w `open-sse/services/providerCooldownTracker.ts` pamięć o zawodzących
dostawcach, wspólną dla wszystkich żądań. Jest ona sprawdzana podczas rozstrzygania
celów combo, dzięki czemu kolejne żądania combo przestają ponownie przechodzić przez
dostawcę, który przed chwilą zawiódł. Wpisy na poziomie dostawcy podlegają bramie
okna czasowego z `PROVIDER_PROFILES`:

| Profil  | wyzwala po (`providerFailureThreshold`) | w obrębie (`providerFailureWindowMs`) | chłodzi przez (`providerCooldownMs`) |
| ------- | --------------------------------------: | ------------------------------------: | -----------------------------------: |
| OAuth   |                                    `10` |                               `15min` |                               `5min` |
| API key |                                    `15` |                               `30min` |                              `10min` |

Poniżej progu dostawca **nie** jest uznawany za schłodzonego; sukces czyści okno.
Wpisy na poziomie połączenia (`provider:connectionId`) zamiast tego zachowują
wykładniczy backoff `minRetryCooldownMs → maxRetryCooldownMs`. Nadpisania:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Test regresyjny: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Czas odnowienia połączenia

**Zakres:** pojedynczy dostawca connection/account/key.

**Zamiar:** pomiń jeden zły klucz, podczas gdy inne połączenia tego samego dostawcy będą nadal działać.

**Realizacja:**

- Znak niedostępny: `src/sse/services/auth.ts::markAccountUnavailable()`
- Wybór: `getProviderCredentials*` w tym samym pliku
- Obliczenie czasu odnowienia: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ustawienia: `src/lib/resilience/settings.ts`

**Pola na połączenie:**

- `rateLimitedUntil` — znacznik czasu do upłynięcia czasu odnowienia
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — wykładniczy licznik backoffów

**Domyślne czasy odnowienia:**

- podstawa OAuth : 5s
- Baza kluczy API: 3s
- Klucz API 429: preferuje tekst resetowania `Retry-After`/reset headers/parseable
- Wycofanie: `baseCooldownMs * 2 ** failureIndex`

**Opóźnienie ponownej próby dla każdego dostawcy.** Na stronie szczegółów dostawcy znajduje się plik** Opóźnienie ponownej próby** wybierz (Auto, 15 s do 1 godz.). Oszczędza `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, do `PATCH /api/resilience`). Gdy błąd ograniczenia szybkości nie zawiera wskazówki dotyczącej ponownej próby w górę, ta wartość zastępuje skalowane wycofywanie dla dostawcy i resetuje `backoffLevel` do 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Pierwszeństwo błędu o ograniczonej szybkości, najpierw najwyższe: wskazówka dotycząca ponownej próby w górę strumienia, następnie `providerSpecificData.rotationOverrides.rateLimitResetSeconds` dla każdego połączenia, następnie opóźnienie ponownej próby dla każdego dostawcy, następnie env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, a następnie skalowane wycofywanie. Auto usuwa pole. Wpływa tylko na przyczynę ograniczenia szybkości, nigdy na stany końcowe.

**Straż stadna przeciw piorunom:** zapobiega jednoczesnym awariom spowodowanym nadmiernym wydłużeniem czasu odnowienia lub podwójnym zwiększeniem `backoffLevel`.

**Numery 429 z limitem współbieżności nie wspinają się po drabinie wycofywania.** `429` którego treść zgłasza limit współbieżności („zbyt wiele jednoczesnych żądań”, „limit współbieżności”, „limit żądań równoległych”, GLM `并发数过高`) oznacza, że konto jest w dobrym stanie, ale jest zajęte. `checkFallbackError()` zwraca powód `concurrency_limited`: przejście awaryjne do następnego połączenia, ochłodź to, aby uzyskać stałą `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) lub wskazówkę dotyczącą ponownej próby w górę, pozostaw `backoffLevel` bez zmian i ustaw `skipProviderBreaker`. Wyraźna treść kwot nadal wygrywa, zatem treść, która również pasuje do wzorca kwot, pozostaje werdyktem dotyczącym kwot. Wykrywanie: `looksLikeConcurrencyLimit()` w `src/shared/utils/classify429.ts`; werdykt: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` ( `FailureKind` wyłącznika) pozostaje niezmieniony i nadal odczytuje `rate_limit` dla tych ciał.

**Stragany z treściami strumieniowymi nie chłodzą konta.** Kiedy moduł nadzorujący przeciągnięcie zawartości (`open-sse/utils/streamHandler.ts`) rezygnuje ze strumienia, który nie wysłał na czas żadnych danych wyjściowych modelu, `markAccountUnavailable()` rejestruje błąd połączenia, ale nie ustawia czasu oczekiwania: przeciągnięcie należy do tego żądania, najczęściej jest to długi obrót rozumowania bez jeszcze żadnych wyników. Operatorzy mogą ponownie włączyć się za pomocą `resilienceSettings.streamStallCooldown.enabled` (domyślnie `false`).

**Sygnał opóźnienia zgody na wybór konta `p2c`.** Każda wysłana próba rejestruje czas do pierwszego bajtu i wynik na połączenie (i na model połączenia + ) w przewijanym oknie w pamięci: ostatnie 20 próbek w ciągu 15 minut (`open-sse/services/connectionLatencyTracker.ts`, zapisane z `safeLogEvents()` w `src/sse/handlers/chatHelpers.ts`). Kiedy `resilienceSettings.p2cLatency.weight` jest powyżej `0` (zakres 0-20, domyślnie `0` = wyłączone), `compareP2CConnections()` w `src/sse/services/auth.ts` dodaje punkty `weight` każdemu kandydatowi z pary. Połowa tego wynika z opóźnienia jako stosunku do szybszego kandydata (dwa razy wolniejsza jest pełna połowa), a połowa z kroczącego współczynnika błędów. Termin ten ma zastosowanie tylko wtedy, gdy obaj kandydaci mają co najmniej 3 próbki, więc nowe konta nie są karane, a jego pułap pozostaje poniżej kar za zablokowanie i wyczerpanie kwoty. Nie dodaje żadnego własnego obwodu: uszkodzone konta są nadal obsługiwane przez warstwy odnowienia, blokady i wyłącznika. Ustaw to za pomocą `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Ramy rozumowania ponownie uruchamiają budżet przeciągnięcia treści.** Model rozumowania może myśleć przez kilka minut przed pierwszym widocznym znacznikiem: Claude przesyła strumieniowo ramki `thinking_delta`, których tekst myślący może być pusty, a API Odpowiedzi przesyła strumieniowo jeden element rozumowania po drugim. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) rozpoznaje te ramki i watchdog ponownie uruchamia swój budżet na każdej z nich, zamiast anulować turę. Nadal nie są to dane wyjściowe modelu, więc tura kończąca się jedynie rozumowaniem jest nadal zgłaszana jako pusta, a tura, która zatrzymuje rozumowanie i wysyła tylko uderzenia serca, nadal uruchamia watchdog.

Binarne ramki `reasoningContentEvent` Kiro z niepustą sygnaturą zachowują tę aktywność rozumowania poprzez executor jako pustą deltę `reasoning_content`. Podpis nie jest przekazywany. Metadane, niekompletne ramki i puste podpisy nie powodują ponownego uruchomienia budżetu treści; nadal obowiązuje niezależny limit czasu aktywnego strumienia i anulowanie klienta (`open-sse/executors/kiro/reasoning.ts`).

**Stany terminala (czasy odnowienia NOT ):**

- `banned` — ustawione przez wykrycie zbanowanego słowa kluczowego/banu konta (zobacz [BAN_DETECTION](../security/BAN_DETECTION.md) ). Odmowy upstream na żądanie (`request_rejected`, np. Anthropic OAuth 403 „Żądanie niedozwolone”) nigdy tego nie ustawiają: są liczone na połączenie i model i wycofują ten model z rotacji z rosnącym czasem odnowienia ograniczonym do `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) lub schładzają połączenie, gdy żaden model nie jest znany — `open-sse/services/requestRejectedStreak.ts`
- `expired` (przejście do terminala po ograniczonych ponownych próbach — `EXPIRED_RETRY_MAX = 3` z wykładniczym wycofywaniem — więc przejściowe błędy OAuth mogą się samonaprawiać, zanim konto zostanie trwale dezaktywowane)
- `credits_exhausted`

Trwają one do momentu zmiany poświadczeń lub ich zresetowania przez operatora. Nie zastępuj stanów końcowych przejściowym stanem ochłodzenia.

**Leniwe odzyskiwanie:** kiedy `rateLimitedUntil` minie, połączenie stanie się ponownie możliwe. Po pomyślnym użyciu `clearAccountError()` czyści wszystkie pola błędów.

### Claude OAuth ściana użytkowania: resetowanie limitu sesji + linii o niższym priorytecie

**Zakres:** jedno połączenie w ramach subskrypcji Claude (OAuth). Obie funkcje są** wyrazić zgodę na każde połączenie** (Edytuj sekcję połączenia → Claude → `lowPriorityMode` / `autoLimitReset` w `providerSpecificData`, oba domyślnie wyłączone) i lustrzane odbicie poleceń `/low-priority` i `/limit-reset` kodu Claude (umowa przewodowa przechwycona z kodu Claude 2.1.263).

**Realizacja:**

- Klasyfikacja odpowiedzi maszyny stanowej + : `open-sse/services/claudeLowPriority.ts`
- Zresetuj klienta status/claim : `open-sse/services/claudeLimitReset.ts`
- Hak executora (wstrzyknięcie nagłówka + ponowienie próby na tym samym koncie): `open-sse/executors/base.ts::execute()`
- Trwałość zgody: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Spust:** ściana 5-godzinnego użytkowania — a `429` której nagłówki zawierają `anthropic-ratelimit-unified-status: rejected` i, jeśli konto się kwalifikuje, `anthropic-ratelimit-unified-slow-offer: treatment`. Nic nie jest wysyłane przed pierwszą ścianą 429; seria 429 bez zunifikowanych nagłówków przechodzi normalną ścieżkę odnowienia.

**Pas o niższym priorytecie** (`lowPriorityMode`):

- Na ścianie 429 wykonawca akceptuje ofertę i natychmiast ponawia próbę** To samo** konto w `anthropic-usage-limit: slow`; linia pozostaje aktywna aż do ogłoszenia `anthropic-ratelimit-unified-reset` (łaska + 60.), a każde żądanie w tym oknie zawiera nagłówek. Przechwycone 429 nigdy nie dociera do `handleChatCore`, więc połączenie jest takie** nie** podlega odnowieniu i nie jest odwracany.
- `anthropic-ratelimit-unified-slow-status` w przypadku późniejszych odpowiedzi: `active` / `not_needed` trzymaj pas; `slot_busy` (429) lub `529` czekaj `anthropic-ratelimit-unified-slow-retry-after` serwera (domyślnie 20 s, zacisk 5–600 s, ± 30% jitter) i spróbuj ponownie, ograniczony `anthropic-ratelimit-unified-slow-max-wait` (domyślnie 20 min, zacisk 1 min–6 h) — poza końcem linii i 10-minutowy odpoczynek blokuje ponowną akceptację. Czas oczekiwania jest dodatkowo ograniczony przez pozostałą część limitu czasu żądania w górę strumienia (`resolveFetchStartTimeout`, domyślnie 10 min) minus 5 s margines: bez tego ograniczenia domyślny 20-minutowy maksymalny czas oczekiwania przekroczyłby żądanie, a uśpienie zostałoby przerwane w połowie oczekiwania, wyświetlając `TimeoutError` zamiast eleganckiego ochłodzenia `max_wait` end +.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, rolowanie w ciągu 5 godzin lub `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (które kończy się jako `extra_usage` w dowolnym statusie, ponieważ płatna nadwyżka obejmuje teraz ścianę) zakończ pas; odpowiedź następnie płynie normalną ścieżką odnowienia. `budget_exhausted` jest pamiętany do czasu ogłoszonego resetu budżetu (≤ 8 dni).
- Sprawdzanie ściany odbywa się po 400 własnych próbach executora opartych na próbach (edycja kontekstu, zaciski thinking/effort, automatyczne uczenie się parametrów), więc ściana 429, która pojawia się tylko przy jednej z tych prób, jest nadal przechwytywana, zamiast dotrzeć do ścieżki odnowienia.
- Stan znajduje się w pamięci na każde połączenie (ponowne zaakceptowanie kosztuje jedną dodatkową ścianę 429).

**Reset limitu sesji** (`autoLimitReset`, próbowałem przed linią, gdy oba są włączone):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` blok; kiedy `arm: "reset"` i `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` z `{ "program": "juniper_tide" }` (organizacja UUID z `providerSpecificData.organizationUUID`, powrót do bootstrapu).
- `result: reset|not_limited` → żądanie jest ponawiane z pełną szybkością (bez powolnego nagłówka). `already_used` / `not_offered` memoise `next_available_at` (domyślnie jeden tydzień); każda awaria cofa się o 15 minut. Reset odbywa się raz w tygodniu i nadal wlicza się do limitu tygodniowego.

Strażnicy regresji: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Automatycznie stosuj resety bankowe

**Zakres:** Połączenia w ramach subskrypcji Codex i Claude (OAuth).** Zapisz się** : ustawienie `bankedResetAutoApply` jest domyślnie wyłączone i znajduje się w trybie `dry-run` (Ustawienia → AI → Automatyczne stosowanie resetów bankowych).

**Zamiar:** samodzielnie wydawaj resety bankowe, gdy konto osiągnie barierę wykorzystania, zamiast czekać, aż operator naciśnie „Zrealizuj” na stronie Limity dostawcy.

| Rodzaj kredytu (`creditTypes`) | Co jest odkupione                                      | Gdzie biegnie                                                                                         |
| ------------------------------ | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `codexCredits`                 | Codex zresetować kredyty                               | praca w tle, co 60 s                                                                                  |
| `claudeCredits`                | Dotacje bankowe Claude (kredyty `GRANT` )              | praca w tle, co 60 s                                                                                  |
| `claudeSessionReset`           | resetowanie tygodniowego limitu sesji Claude (powyżej) | ścieżkę żądania, korzystając z tych samych zasad, co w przypadku przełączania dla poszczególnych kont |

**Realizacja:**

- Czysta decyzja (jedna reguła dla obu ścieżek): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Zadanie w tle: `src/lib/services/bankedResetAutoApply.ts` (rozpoczęte w `src/instrumentation-node.ts`)
- bramka ścieżki żądania Claude : `src/lib/usage/claudeSessionResetPolicy.ts`, zarejestrowana przez `setClaudeLimitResetPolicy()` w `open-sse/services/claudeLimitReset.ts`
- Historia, czapki i webhook: `src/lib/usage/bankedResetAudit.ts`
- Historia API: `GET /api/settings/banked-reset-auto/history?limit=50` (autoryzacja zarządzania)

**Kolejność decyzji** (pierwszą błędną zasadą jest odnotowany powód):

1. Funkcja wyłączona, typ kredytu wyłączony lub konto poza zakresem (`accountScope` `all` / `selected` plus mapa `connections` dla poszczególnych kont).
2. Poza opcjonalnym harmonogramem UTC (`startHourUtc` > `endHourUtc` przekracza północ).
3. Limity w ciągu ostatnich 24 godzin: `maxPerAccountPerDay` (1), `maxPerDay` (3) i `minSpacingMinutes` (30) pomiędzy dowolnymi dwoma umorzeniami.
4. Wyzwalacz: zamurowane okno `session` lub `weekly` (odczytywane z `getQuotaWindowStatus().reachedThreshold`, a nie `isAccountQuotaExhausted()`, które raportuje tylko konto przy każdym wydanym oknie) lub kredyt wygasający w ciągu `expiringCreditHours` (24) na koncie, które wykorzystało co najmniej `expiringCreditMinUsedPercent` (50).
5. Strażnik naturalnego resetu: pomiń, gdy zamurowane 5-godzinne okno resetuje się w ciągu `sessionResetGuardMinutes` (90) lub zamurowane cotygodniowe okno w `weeklyResetGuardHours` (12).
6. Tygodniowy minimalny poziom: pomiń 5-godzinny reset, gdy tygodniowy pozostały poziom jest poniżej `weeklyFloorPercent` (10).
7. tryb `last-resort` : pomiń, podczas gdy na innym koncie objętym zakresem tego samego dostawcy pozostało co najmniej `poolHeadroomPercent` (10) w obu oknach. Wyzwalacze wygaśnięcia kredytu omijają to.
8. `dry-run` rejestruje awanturę i niczego nie odkupuje; `last-resort` i `eager` wykupić.

Brakujące dane dotyczące przydziału nigdy nie odblokowują wykorzystania: nieznany czas resetowania lub cotygodniowe pominięcia wykorzystania.

**reset sesji Claude :** przy wyłączonej tej funkcji lub wyłączonym `claudeSessionReset`, przełącznik `autoLimitReset` dla poszczególnych kont decyduje dokładnie tak samo jak poprzednio. Gdy oba są włączone, funkcja zastępuje przełączniki dla poszczególnych kont: konto objęte zakresem może składać roszczenia tylko wtedy, gdy pozwalają na to zasady, a w trybie `dry-run` nie zgłasza się żadnych roszczeń.

**Bezpieczeństwo:** zadanie wykorzystuje maksymalnie jeden kredyt na tick, decyduje przed wystawieniem kredytów na aukcję (pominięte konto nigdy nie jest na liście), używa kluczy idempotencji `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` i wycofuje konto na 1 godzinę po nieudanej aukcji lub wykupieniu. Każda decyzja dotycząca wykupu, niepowodzenia i próby próbnej jest zapisywana w `audit_log` (`action: "bankedReset.redeem"`, bez tokenów i identyfikatorów kredytowych); czapki są liczone od tych wierszy, więc przetrwają ponowne uruchomienie. Pomyślne wykorzystanie powoduje również uruchomienie webhooka `provider.reset_redeemed`.

Strażnicy regresji: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Powinowactwo sesji (#7274)

**Zakres:** jedna sesja klienta (nagłówek `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ) przypięta do jednego połączenia, dla** każdy** dostawca.

**Zamiar:** utrzymuj agenta wieloobrotowego (kod Claude, pomocnik, agenci niestandardowi) na tym samym koncie w przypadku różnych żądań, redukując utratę kontekstu między kontami i powtarzające się błędy 429 zimnego startu u dostawców ze stanem sesji dla każdego konta.

**Realizacja:**

- rozdzielczość TTL : `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Ekstrakcja nagłówka (ogólna, dowolny dostawca): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Utrwalony stół z pinami: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Ustawienie: `sessionAffinityTtlMs` (globalne TTL w ms, `0` wyłączone) — `src/lib/db/settings.ts`. Zmieniono nazwę z `codexSessionAffinityTtlMs` dostępnego tylko w Kodeksie przez migrację `124_generic_session_affinity_ttl.sql`, która przenosi wszelkie wcześniej skonfigurowane Codex TTL jako nowe domyślne.

Przed #7274 `resolveSessionAffinityTtlMs()` na stałe przełączyło się na `0` dla każdego dostawcy z wyjątkiem `codex`, więc ustawienie TTL (i nagłówki sesji) nie miało żadnego wpływu nigdzie indziej, mimo że mechanizm przypinania i wyodrębnianie nagłówków były już niezależne od dostawcy. Poprawka usunęła ten wcześniejszy powrót; TTL ma teraz jednolite zastosowanie do każdego dostawcy po ustawieniu globalnym powyżej `0`.

Trzy nagłówki powinowactwa sesji nigdy nie są przesyłane dalej. Wykonawcy — budują od zera własne nagłówki nadrzędne, zamiast przekazywać przez nie nagłówki klientów, więc pozostaje to jedynie wewnętrznym identyfikatorem korelacji.

### Ekskluzywne dzierżawy połączeń sesji zarządzanych

**Zakres:** jeden aktywny zarządzany HTTP client/session posiada jedno kwalifikujące się połączenie OmniRoute.

**Zamiar:** zapewniają trwałą, wyłączną własność połączenia klientom, którzy potrzebują twardego ogrodzenia routingu między żądaniami. Różni się to od powinowactwa sesji, które jest preferencją miękkiej ciągłości: dzierżawa na wyłączność utrzymuje stan cyklu życia w SQLite, wymusza globalną unikalność aktywnego właściciela i aktywnego połączenia oraz odrzuca nieaktualne generowanie przed wysłaniem dostawcy.

Ta funkcja polega na wyrażeniu zgody na klucz API. Klucz zarządzany musi mieć zakres `lease:exclusive` i jawną, niepustą listę `allowedConnections`. Każdy klient HTTP może korzystać z punktu końcowego cyklu życia; nie jest wymagana nazwa klienta, klient użytkownika, dostawca, metoda OAuth ani model. Dzierżawa jest właścicielem połączenia, a nie modelu, zatem zmiana modelu zachowuje ważność, podczas gdy połączenie pozostaje zwykle kwalifikowalne. Normalne reguły dotyczące modelu, przydziału, stanu zdrowia, czasu odnowienia i listy dozwolonych pozostają miarodajne i mogą spowodować przeniesienie tej samej generacji do innego kwalifikującego się bezpłatnego połączenia.

Cykl życia to `POST /api/v1/session-leases` z działaniami JSON `acquire`, `renew` i `release`. Zarządzane żądania wnioskowania przedstawiają nieprzezroczystą wartość `X-OmniRoute-Lease-Owner` i dokładną `X-OmniRoute-Lease-Generation`. Właściciel używa `vlo_` po którym następują 43 znaki base64url; przechowywany jest tylko skrót SHA-256. Każde końcowe zabezpieczenie wysyłki wiąże również uwierzytelniony klucz API ID i aktywne połączenie ID. Nagłówki kontroli dzierżawy są usuwane z dzienników, zachowywanych migawek żądań i nagłówków nadrzędnego modułu wykonującego.

Jeśli zwykły routing ma kwalifikujących się zarządzanych kandydatów, ale każdy wolny kandydat jest zajęty przez zagraniczną aktywną dzierżawę, OmniRoute zwraca HTTP `429`, kod niedostępności pojemności dzierżawy, stan oczekiwania na pojemność i ograniczony `Retry-After` uzyskany z najwcześniejszego odpowiedniego wygaśnięcia. Zwykłe puste uprawnienia nie stanowią rywalizacji o dzierżawę i zachowują istniejącą semantykę błędów routingu.

Powiązane mechanizmy pozostają oddzielne:

- zajętość sesji OAuth to lokalna, miękka dystrybucja procesowa dla kont OAuth.
- Semafory kont udzielają zezwoleń na współbieżność żądań i kończą się po zakończeniu żądania.
- Ekskluzywne dzierżawy sesji zarządzanych to trwała własność przez cały cykl życia z ogrodzeniem pokoleń.

---

## 3. Blokada modelu

**Zakres:** potrójny element: dostawca + połączenie + model.

**Zakres zależny od statusu:** status powodujący błąd określa klucz, pod którym blokada zostanie zapisana
(`resolveLockoutScope()` w `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — sygnał dotyczący limitu lub uprawnień — blokowana jest **rodzina limitu**:
  w przypadku codex cały zakres `codex` / `spark` (każdy model `gpt-5*` danego
  połączenia), a w przypadku innych dostawców `getQuotaScopedModelForProvider()`.
- `404` blokuje podstawowy model (`getModelLockKey()` zawęża `not_found`).
- Każdy inny status — błędy transportu/serwera `5xx` oraz wygenerowany przez OmniRoute
  `502` z walidacji jakości — blokuje wyłącznie **dokładną** kombinację
  dostawcy/połączenia/modelu. Nieprawidłowy strumień dla jednego modelu nie jest dowodem
  na problem z limitem konta; przed wprowadzeniem tej reguły jedna pusta odpowiedź dla
  `codex/gpt-5.6-luna` usuwała każdy model `gpt-5*` tego połączenia z routingu na 2–30 min
  (z eskalacją), podczas gdy jego limit pozostawał nienaruszony.
- Jawnie określona opcja `scope` wywołującego ma zawsze pierwszeństwo (Antigravity przekazuje `"exact"`).

**Cel:** uniknięcie wyłączania całego połączenia, gdy niedostępny jest tylko jeden model lub tylko jego limit został wyczerpany.

**Przykłady:**

- Dostawcy z limitami per model zwracający `429`
- Dostawcy lokalni zwracający `404` dla jednego brakującego modelu
- Błędy uprawnień specyficzne dla dostawcy dotyczące trybu/modelu (np. tryby Grok)

**Implementacja:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Panel cooldownów modeli (v3.8.0)

Interfejs użytkownika: Ustawienia → Cooldowny modeli (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Wyświetla aktywne blokady wraz z informacjami: dostawca, połączenie, model, przyczyna, expiresAt. Operatorzy mogą ręcznie ponownie włączyć model z poziomu karty.

**REST API:**

- `GET /api/resilience/model-cooldowns` — lista aktywnych blokad
- `DELETE /api/resilience/model-cooldowns` — ręczne ponowne włączenie. Treść żądania: `{provider, connection, model}`. Uwierzytelnianie: zarządzanie.

### Menedżer cooldownów

Interfejs użytkownika: Monitorowanie → Menedżer cooldownów (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Jedna strona dla każdego połączenia wyłączonego z routingu z powodu przejściowej przyczyny, zamiast
otwierania strony każdego dostawcy osobno. Wyświetla cooldowny połączeń, blokady modeli i stany końcowe,
usuwa je dla pojedynczego połączenia, wybranych połączeń lub wszystkich połączeń danego dostawcy,
a także edytuje najczęściej dostrajane reguły cooldownów: `streamStallCooldown.enabled` oraz bazowy
cooldown `connectionCooldown` i maksymalną liczbę kroków narastania opóźnienia dla OAuth / klucza API
(zapisywane przez `PATCH /api/resilience`). Stany końcowe (`banned`, `expired`, `credits_exhausted`) są
wyświetlane, ale nigdy nie są tutaj usuwane.

Karta **Reguły cooldownów błędów** na tej samej stronie umożliwia edycję reguł błędów operatora
(`settings.providerErrorRules`) oraz domyślnych reguł ogólnych dla poszczególnych dostawców
(`settings.providerErrorDefaults`) za pomocą `PATCH /api/settings` — zobacz sekcję „Reguły
deklarowane przez operatora” w §7, aby dowiedzieć się, jak są dopasowywane. Czas trwania może wynosić:
Domyślnie (bez jawnego cooldownu), 30 min, 1 h, 5 h, 24 h lub niestandardowo od 1 do 43 200 minut (30 dni).

**REST API** (`src/lib/resilience/cooldownManager.ts`, uwierzytelnianie: zarządzanie):

- `GET /api/resilience/cooldowns[?provider=]` — połączenia wraz ze statusem, pozostałym czasem cooldownu,
  poziomem narastania opóźnienia, typem ostatniego błędu i blokadami modeli (bez danych uwierzytelniających)
- `POST /api/resilience/cooldowns` — treść żądania `{connectionIds: string[]}` lub
  `{all: true, provider?}`; zwraca `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Interfejs ustawień blokady modelu + odzyskiwanie przez zmniejszanie po sukcesach (v3.8.23)

Blokada modelu przeszła z zawsze aktywnego, zakodowanego na stałe zachowania w funkcję w pełni konfigurowalną,
aktywną opcjonalnie, z własną kartą ustawień i mechanizmem samonaprawczego odzyskiwania.

**Karta ustawień:** Ustawienia → Blokada modelu
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Różni się ona od wyłącznie do odczytu karty `ModelCooldownsCard` powyżej (która tylko
_wyświetla_ aktywne blokady) — nowa karta _konfiguruje parametry_. Wartości domyślne znajdują się w
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Ustawienie              | Wartość domyślna                 | Znaczenie                                                                |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Przełącznik główny — blokada modelu jest **domyślnie wyłączona**.        |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statusy nadrzędne liczone jako błąd przypisany do modelu.                |
| `baseCooldownMs`        | `120_000` (120 s)                | Początkowy czas blokady przy pierwszym błędzie.                          |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Limit eskalowanego cooldownu.                                            |
| `maxBackoffSteps`       | `10`                             | Maksymalna liczba kroków eskalacji wykładniczego narastania opóźnienia.  |
| `useExponentialBackoff` | `true`                           | Określa, czy powtarzające się błędy mają wykładniczo zwiększać cooldown. |

Ustawienia są zapisywane w zwykłym magazynie ustawień i walidowane za pomocą schematu ustawień odporności;
karta ogranicza wartości `baseCooldownMs`/`maxCooldownMs`
(przy czym `maxCooldownMs ≥ baseCooldownMs`) oraz `maxBackoffSteps`.

**Odzyskiwanie przez zmniejszanie po sukcesach:** odzyskiwanie nie polega wyłącznie na wygaśnięciu timera.
Prawidłowa odpowiedź zmniejsza liczbę błędów modelu, dzięki czemu model, który odzyskał sprawność
w trakcie trwania okna, przestaje zwiększać poziom eskalacji (i zostaje odblokowany) wcześniej, niż
upłynąłby jego czas. W przypadku pomyślnego celu kombinacji `open-sse/services/combo.ts` wywołuje
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`), które **dzieli** zapisaną wartość
`failureCount` przez 2 (`Math.floor(failureCount / 2)`); gdy osiągnie ona wartość `0`, wpis blokady
jest całkowicie usuwany. Odpowiednik `recordModelLockoutFailure()` zwiększa tę wartość (i eskaluje
cooldown) w przypadku błędów występujących w oknie eskalacji. Zmniejszanie po sukcesach jest dodatkowe
względem zwykłego wygaśnięcia timera — każda z tych ścieżek może ponownie włączyć model.

**Stan:** blokady są przechowywane **w pamięci** (w procesie `Map`s
z wpisami `ModelLockoutEntry`, kluczowanymi za pomocą
`provider:connectionId:model`, a blokady o dokładnym zakresie za pomocą
`provider:connectionId:exact:model`), a nie utrwalane w
bazie danych — są tracone po ponownym uruchomieniu. _Ustawienia_ są utrwalane; aktywny _stan_ blokad jest nietrwały.

---

## 4. Kontrola współbieżności przydziału (wersja 3.8.36)

Konta subskrypcyjne (GLM, MiniMax itp.) często akceptują tylko ~ 1–3 jednoczesnych żądań; przekroczenie tego wyzwala 429 sekund i czasy odnowienia. To jest ostre pod** udział kwotowy** (`qtSd/…`) kombinacje, w których kilka kluczy API współdzieli jedno konto nadrzędne. Trzy warstwy chronią współdzielone konto przed zalaniem.

### Limit współbieżności na połączenie (`max_concurrent`)

Każde połączenie dostawcy może zadeklarować pułap `max_concurrent` (`provider_connections.max_concurrent`, ustawiony w połączeniu modal / API / DB). Pozostaw puste bez ograniczeń. Jest to pojedyncze pokrętło sterujące warstwą serializacji poniżej. — ustawia ją na rzeczywistą współbieżność konta (np. GLM ~ 1, MiniMax ~ 2).

### Limity współbieżności na model (`modelConcurrency`)

Połączenie może dodatkowo zadeklarować dokładne pułapy współbieżności dla każdego modelu w swojej mapie `rateLimitOverrides` :

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Ustaw go w trybie połączenia (** Limit szybkości zastępuje → Limity współbieżności dla poszczególnych modeli** , jedno `model=cap` na linię) lub przez `PATCH /api/providers/[id]` o tym samym kształcie JSON. Kluczowa semantyka:

- **Dla całego połączenia a dla konkretnego modelu:** `maxConcurrent` pozostaje wspólnym pułapem obejmującym całe połączenie. Gdy oba mają zastosowanie, obie bramki są pozyskiwane atomowo w tej samej bramce złożonej (`global → provider → account → model`); efektywne zachowanie to bardziej rygorystyczny obowiązujący limit.
- **Dokładne dopasowanie klucza modelu:** kluczem jest ciąg modelu przekazywany do modułu wykonującego po rozpoznaniu routingu. — zwykle jest to sam identyfikator modelu nadrzędnego (`glm-5`), a nie alias `provider/model` po stronie klienta (`zai/glm-5` nie pasuje `glm-5`). Wartości są dodatnimi liczbami całkowitymi, pułapami równoczesnych żądań.
- **Lokalne kolejkowanie, brak wykrywania:** nadmiar żądań kolejkuje lokalnie z istniejącą semantyką queue/timeout (wpisane błędy przyjęcia `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` ). OmniRoute nie wykrywa ani nie wnioskuje polityki nadrzędnej. — wymusza dokładnie takie pułapy, jakie skonfigurował operator. Nasycona bramka modelu nigdy nie wyłącza dostawcy i nigdy nie powoduje trwałej blokady modelu; Zachowanie 429/cooldown/fallback w górę strumienia pozostaje zabezpieczeniem przed błędem.
- **Na połączenie, zakres na proces:** caps są przypisane do połączenia z bazą danych i są przechowywane w pamięci, więc dwa połączenia ponownie wykorzystujące ten sam klucz nadrzędny API nie koordynują się ze sobą.
- **Nieskonfigurowane oznacza niezmienione:** pominięcie mapy (lub pozostawienie pustego pola panelu kontrolnego) nie dodaje bramy modelu. Przykładowa konfiguracja bez podawania uniwersalnego limitu dostawcy:

```text
glm-5=1
glm-4.7=3
```

### Serializacja żądania udziału przydziału

Gdy wysyłka przydziału jest skierowana do połączenia, które deklaruje dodatnią `max_concurrent`, jednoczesne żądania do tego** konto** są serializowane przez semafor połączenia (klucz `qsconn:<connectionId>`): nadmiar żądań** czekać w kolejce** zamiast zalewać konto. To jest** otwieranie awaryjne** — nasycona kolejka lub przekroczenie limitu czasu przebiega bez szczeliny, zamiast odrzucać możliwe do wysłania żądanie. Włącz** Ustawienia → Odporność → Współbieżność udziału przydziału na połączenie** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, domyślnie włączone). Bez czapki `max_concurrent` zachowanie pozostaje niezmienione.

> Bramka routingu z udziałem przydziału (`selectQuotaShareTarget`, DRR + P2C) sama jest otwarta w przypadku awarii i tylko _depriorytetyzuje_ połączenie at-cap — z pulą pojedynczych połączeń, której nie można ograniczyć na stałe, więc ten semafor jest tym, co faktycznie zawiera powódź.

### Ponowna próba kombinacji uwzględniająca czas odnowienia

Dla każdej strategii combo (jeśli jest włączona), żądanie, które skrystalizowałoby 429 dla przejściowego czasu odnowienia SHORT, czeka i ponownie wysyła zamiast zwracać 429 — Dotyczy to okien TPM/RPM klasy Gemini (~ 60s retry-after) w kombinacjach wielu modeli, np. oba cele kombinacji 2-modelowej osiągają limit szybkości dla każdego modelu. Ograniczone przez `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) w** Ustawienia → Odporność** . Nigdy nie czeka na powody `quota_exhausted` (zablokowane do północy) lub auth/not-found. Po ustawieniu `comboTimeoutMs` oczekiwanie, które nie może zakończyć się przed upływem tego terminu, nie rozpoczyna się (#18998): kombinacja odpowiada natychmiast swoją odpowiedzią terminala zamiast `COMBO_TIMEOUT` 504.

Kombinacja może zrezygnować z `config.comboCooldownWaitEnabled: false`. Tylko dosłowne `false` wyłącza te współdzielone oczekiwania combo (czas odnowienia po wysłaniu i oczekiwanie circuit-open/model-lock przed wysyłką) oraz ich wydłużenie limitu czasu oczekiwania i minimalnego budżetu. Brak lub `true` zachowuje politykę globalną; `true` nie może włączyć globalnie wyłączonego oczekiwania. Wyraźny `targetTimeoutMs` nadal wygrywa. Ta rezygnacja nie zmienia oddzielnego oczekiwania przed wysyłką, zgodnego z natywnym Kodeksem.

Ta sama bramka obejmuje przypadek przed wysyłką (#16319): kiedy każdy cel kombinacji jest pomijany przed podjęciem jakiejkolwiek próby, ponieważ jego model znajduje się w krótkiej, przejściowej blokadzie, ścieżka zerowej próby czeka na blokadę pod tymi samymi sufitami i ponownie wysyła, zamiast odpowiadać na bez podpowiedzi `503 ALL_TARGETS_SKIPPED`. Gdy nie jest dozwolone oczekiwanie (wyczerpany limit, próba lub budżet albo funkcja wyłączona), odpowiedź terminala jest aktualizowana do `429 rate_limit_error` przenoszącego `retry_after` / `reset_at` od najwcześniejszego wygaśnięcia blokady przejściowej; Blokady kwot, uwierzytelnień i nieznalezionych utrzymują kod 503 bez podpowiedzi.

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

## 5. Kontrola przyjmowania do kolejki żądań (v3.8.49 · zgłoszenie #6593)

**Zakres**: lokalna kolejka limitu szybkości dla pary dostawca+połączenie (`open-sse/services/rateLimitManager.ts`, oparta na Bottleneck), o jedną warstwę poniżej trzech mechanizmów opisanych wyżej.

**`maxWaitMs` ogranicza oczekiwanie w kolejce; `executionMaxWaitMs` ogranicza wykonanie.**
Te dwa parametry są celowo rozdzielne i żaden nie zasila drugiego.

`resilienceSettings.requestQueue.maxWaitMs` to **budżet oczekiwania w kolejce**: obejmuje oczekiwanie na slot u dostawcy, a następnie przebywanie w stanie QUEUED, a jego licznik jest zerowany w momencie, gdy zadanie opuszcza stan QUEUED i rozpoczyna wykonywanie (`rateLimitManager.ts`, `wrappedFn`). Żądanie, które go przekroczy, nigdy nie dociera do usługi nadrzędnej. Wartość domyślna 30000 ms, dostarczana przez `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` w `src/lib/resilience/settings.ts` i przypięta przez `tests/unit/ratelimit-admission-control-6593.test.ts`, więc jej zmiana powoduje, że ten test staje się czerwony, zamiast po cichu pozostawić ten akapit nieaktualnym.

`resilienceSettings.requestQueue.executionMaxWaitMs` to wartość, którą Bottleneck otrzymuje jako `expiration` zadania i której licznik startuje dopiero po wysłaniu zadania. Jest to zabezpieczenie awaryjne dla wykonawców bez własnego limitu czasu usługi nadrzędnej; wartość ta jest podnoszona do własnego limitu czasu rozpoczęcia pobierania wykonawcy, gdy ten jest dłuższy, więc nie może uciąć poprawnej, trwającej odpowiedzi. Wartość domyślna 600000 ms (10 min).

Przekazywanie budżetu kolejki do `expiration` było tym, co kiedyś zabijało bramy nieinkrementalne w połowie odpowiedzi — one zgodnie z założeniami działają całymi minutami przed otrzymaniem pierwszych bajtów — i dlatego wygaśnięcie jest zgłaszane jako `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), podczas gdy budżet kolejki nosi kod przekroczenia czasu kolejki. Każdy z nich można nadpisać przez `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (zmienne środowiskowe) lub panel (**Ustawienia → Odporność**). Obie wartości są podczas normalizacji obcinane do zakresu 1 ms–24 h.

**Pierwszeństwo, dla obu:** zmienna środowiskowa dostarcza jedynie wartość _domyślną_. Wartość zapisana w `resilienceSettings.requestQueue` (panel / API patch, przechowywana w `key_value`) wygrywa z nią, a `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` dla konkretnego połączenia wygrywa z tamtą. Ustawienie zmiennej środowiskowej w wdrożeniu, które ma już zapisaną wartość, niczego więc nie zmienia — zamiast tego wyczyść lub zaktualizuj zapisane ustawienie.

Czas przebywania w kolejce ogranicza `maxWaitMs`; opisany niżej `maxQueueDepth` ogranicza, ilu wywołujących może jednocześnie oczekiwać w kolejce.

**Ponowienia określone w treści odpowiedzi: tempo a blokada.** Treść odpowiedzi 429 może sama wskazywać czas oczekiwania (Gemini `RetryInfo.retryDelay`, tekst "retry after Ns"), który odczytuje `updateFromResponseBody`. Oczekiwanie mieszczące się w `maxWaitMs` połączenia to tempo: limiter opróżnia swój zbiornik na ten czas, a oczekujące wywołania są wysyłane, gdy się on zapełni. Oczekiwania dłuższego niż `maxWaitMs` kolejka nie jest w stanie przeczekać — Gemini na wyczerpany dzienny limit odpowiada `retryDelay: "86399s"`. Przekazany nagłówek `Retry-After` na przebudowanej odpowiedzi 429 (#16528) już powoduje, że silnik awaryjny blokuje model na to okno, ale wstrzymywanie dla niego także limitera nadal zatrzymałoby na cały `maxWaitMs` każde wywołanie, które dotrze do klucza wcześniej (na przykład po resecie odporności). Gdy takie oczekiwanie pochodzi z typowanego szczegółu Google `RetryInfo` (pochodzenie `google_rpc_retry_info`), a limiter klucza jest już ograniczony do modelu (zob. `getLimiterKey`), odpowiedź 429 staje się zamiast tego blokadą modelu na tym połączeniu (`lockModelForLongBodyRetry` w `open-sse/services/rateLimitManager/bodyRetryPause.ts`, ograniczoną do 24 h), a limiter pozostaje niewstrzymany. Wybór konta pomija tę blokadę przez `isModelLocked()` — podobnie jak brama przed wysłaniem kombinacji dla celów przypiętych do połączenia. W antigravity, gdzie limiter jest przypisany do rodziny limitów, blokada dotyczy dokładnie danego modelu, podobnie jak pozostałe blokady limitów. Nazwa, o którą prosił klient, również zostaje zablokowana, gdy alias rozwiązał ją na ten model, ponieważ te sprawdzenia posługują się żądaną nazwą; jest ona blokowana dokładnie (`lockExactModel`), więc alias wykraczający poza rodzinę limitów antigravity lub zakres codex nigdy nie blokuje własnej. Wskazówka w formie zwykłego tekstu, nietypowany `retryDelay` lub limiter współdzielony przez całe połączenie zachowują pauzę. Gdy limiter, który ścieżka 429 właśnie przebudowała, zostaje wstrzymany, wywołujący, którego pozostały czas w kolejce kończy się przed końcem pauzy, jest odrzucany natychmiast z kodem przekroczenia czasu kolejki (`checkLimiterPause`), zamiast przeczekiwać ten czas; zapisany koniec jest zakotwiczony przed zbudowaniem limitera, tam gdzie Bottleneck uruchamia swój zegar odświeżania, a każda późniejsza zmiana zbiornika go zapomina. Pokryte testami `tests/unit/rate-limit-long-body-retry-lockout.test.ts` i `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — opcjonalny limit przyjęć (nowość).** `resilienceSettings.requestQueue.maxQueueDepth` ogranicza, ile żądań może jednocześnie oczekiwać w kolejce (jeszcze niewysłanych) dla jednej pary dostawca+połączenie. Gdy kolejka zawiera już `maxQueueDepth` żądań, nowe żądanie jest szybko odrzucane z typowanym błędem `code: "RATE_LIMIT_QUEUE_FULL"`, **zanim** w ogóle dotrze do `limiter.schedule()` — więc odrzucenie jest tanie i następuje przed jakąkolwiek dalszą pracą nad kompresją promptu / tłumaczeniem dla tego żądania. Wartość domyślna `0` = wyłączone, co zachowuje dotychczasowe zachowanie nieograniczonej kolejki; zakres 0–100000. Nadpisanie przez `RATE_LIMIT_MAX_QUEUE_DEPTH` (zmienna środowiskowa) lub `resilienceSettings.requestQueue.maxQueueDepth` (panel/API patch).

Samo sprawdzenie przyjęcia jest funkcją czystą (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), więc można je testować jednostkowo bez prawdziwego limitera Bottleneck.

> RFC, który doprowadził do otwarcia #6593, proponował również flagę
> `bypassCompressionOnRateLimit`. Potok `open-sse/services/compression/` w tym
> repozytorium to kompresja promptu/kontekstu w wychodzącym żądaniu LLM
> (`chatCore.ts`, w okolicy bloku `resolveCompressionSettings`/`selectCompressionStrategy`),
> a nie kompresja odpowiedzi HTTP syntetyzowanych treści 429 — nie istnieje
> pasująca ścieżka kodu dla dosłownej flagi obejścia. Ten krok kompresji promptu
> jest ponadto obecnie wykonywany _przed_ `withRateLimit()` w potoku żądania, więc
> zmiana kolejności w celu pominięcia go przy odrzuceniu z powodu pełnej kolejki
> to osobna, większa zmiana, wykraczająca poza zakres tego zgłoszenia; została
> celowo **nie** zaimplementowana tutaj i pozostawiona jako zadanie następcze na
> wypadek, gdyby oszczędność CPU była warta ryzyka związanego ze zmianą kolejności.

### Siatka bezpieczeństwa automatycznego włączania limitów szybkości i ochrona połączeń (`rateLimitProtection`)

**Siatka bezpieczeństwa automatycznego włączania** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, domyślnie `true`):
Domyślnie OmniRoute automatycznie włącza ochronę kolejki limitów szybkości dla wszystkich aktywnych połączeń dostawców typu klucz API (`getProviderCategory(provider) === "apikey"`). Dzięki temu przychodzące żądania kierowane do nadrzędnych kluczy API wrażliwych na limity są kolejkowane i dławione przez Bottleneck, zamiast masowo wywoływać nadrzędne błędy 429. Siatkę bezpieczeństwa można nadpisać zmienną środowiskową `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` wyłącza, `true`/`1`/`on` wymusza włączenie), która ma pierwszeństwo przed zapisanym ustawieniem panelu (**Ustawienia → Odporność** / `PATCH /api/resilience`).

**Semantyka pola `rateLimitProtection` dla poszczególnych połączeń:**
Ochrona limitów szybkości dla poszczególnych połączeń jest śledzona za pomocą pola logicznego `rateLimitProtection` w połączeniach dostawców (zapisywanego jako `rate_limit_protection` w SQLite):

- **Jawne włączenie (`rateLimitProtection === true`)**: Ochrona limitów szybkości jest jawnie włączona dla tego połączenia, niezależnie od kategorii dostawcy oraz od tego, czy siatka bezpieczeństwa automatycznego włączania jest aktywna.
- **Jawne wyłączenie (`rateLimitProtection === false`)**: Wyłącza jawną ochronę, ale **nie** wyłącza aktywnego połączenia typu klucz API spod globalnej siatki bezpieczeństwa automatycznego włączania. W `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) wartości `false` i `undefined` są równoważne: tylko `rateLimitProtection === true` jest traktowane jako jawne nadpisanie. Jeśli `rateLimitProtection` ma wartość `false` (lub nie jest ustawione), aktywne połączenie typu klucz API nadal spełnia warunek automatycznego włączania i pozostaje objęte ochroną limitów szybkości.
- **Brak rezygnacji dla pojedynczego połączenia**: Operator nie może obecnie określić, że „to pojedyncze aktywne połączenie typu klucz API musi działać bez ochrony kolejki limitów szybkości", zachowując jednocześnie automatyczne włączanie dla pozostałych połączeń. Aby całkowicie uruchomić połączenia typu klucz API bez kolejek limitów szybkości, siatka bezpieczeństwa musi zostać wyłączona globalnie (`RATE_LIMIT_AUTO_ENABLE=false` lub `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Obsługiwane ścieżki zapisu:**

- **`POST /api/rate-limits`**: Obsługiwana administracyjna ścieżka zapisu do przełączania `rateLimitProtection` dla połączenia (`{ connectionId: string, enabled: boolean }`). Wywołanie z `enabled: true` włącza jawną ochronę; wywołanie z `enabled: false` usuwa jawną ochronę (choć aktywne połączenia typu klucz API pozostają objęte globalną siatką bezpieczeństwa, jeśli automatyczne włączanie jest aktywne).
- **`PUT /api/providers/[id]`**: Celowo **nie** akceptuje ani nie przełącza `rateLimitProtection` (#11278). Aktualizacja metadanych połączenia dostawcy za pomocą `PUT /api/providers/[id]` nigdy nie zmieni zapisanego stanu ochrony limitów szybkości.

---

## 6. Kontroler przepustowości wolnego strumienia (#9709)

Opcjonalny moduł `resilienceSettings.streamRecovery.throughputWatchdog` Guard wykrywa sygnał nadrzędny, który w dalszym ciągu wysyła fragmenty, ale generuje sygnał wyjściowy asystenta poniżej skonfigurowanej użytecznej szybkości wyjściowej. Celowo różni się od limitu czasu bezczynności: puls i metadane nie resetują żadnego licznika czasu i nie liczą się jako postęp. Różni się on także od terminu trudnej próby (#9153), który pozostaje absolutnym pułapem bezpieczeństwa niezależnie od jakości wydruku.

Watchdog wymaga okresu rozgrzewania, po którym następuje pełne okno przewijania, zanim będzie mógł przerwać. Zlicza różnice tekstowe ze zdarzeń wyjściowych zakończenia czatu i odpowiedzi API (konserwatywny serwer proxy bajtów UTF-8 ), ignoruje zdarzenia przeznaczone tylko do użycia i puste oraz wstrzymuje ocenę podczas wykonywania zdarzeń wywołania narzędzia lub wnioskowania. Jest domyślnie wyłączona i można ją włączyć za pomocą `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (ta wartość env inicjuje tylko domyślne — a zapisana wartość logiczna `resilienceSettings.streamRecovery.throughputWatchdog.enabled` wygrywa; zobacz uwagę dotyczącą pierwszeństwa env-vs-dashboard na górze tego przewodnika); okno, rozgrzewka, minimalna szybkość i minimalna mierzalna moc są ograniczone przez normalną warstwę normalizacji ustawień odporności.

Po włączeniu przerwanie watchdoga jest stosowane tylko do aktywnej próby przesyłania danych. Przed jakimikolwiek bajtami widocznymi dla klienta istniejąca ścieżka wczesnego odzyskiwania dla tego samego konta może ponownie otworzyć próbę. Po zatwierdzeniu strumień nigdy nie jest odtwarzany na ślepo; tylko istniejąca bezpieczna umowa kontynuacji strumienia środkowego może wszyć przyrostek. Finalizacja pozostaje jednorazowa, więc rozliczanie użycia i wydanie semafora nie są duplikowane.

---

## 7. Ponowne ustawienie statusu upstream (błędnie zgłaszane błędy limitu)

**Zakres:** jedna brama upstream, która zgłasza tymczasowe wyczerpanie limitu z nieprawidłowym statusem HTTP.

**Cel:** skorygowanie mylącego statusu PRZED klasyfikacją, aby konsumenci niższych warstw (silnik fallbacku, agregacja combo, odpowiedź dla klienta) otrzymali informację o rzeczywistej możliwości ponowienia próby.

Niektóre bramy sygnalizują TYMCZASOWE wyczerpanie limitu za pomocą statusu HTTP, który nie pozwala na ponowienie próby. `agentrouter.org` zwraca `403` (czasami `400`) z chińskim tekstem
(`用户额度不足` / `额度不足`) zamiast standardowego `429`. Klienci tacy jak Claude
Code traktują `403` jako błąd trwały i przerywają sesję, a bez korekty
silnik fallbacku sklasyfikowałby go jako `AUTH_ERROR` zamiast zdarzenia
związanego z limitem.

**Implementacja:**

- Rejestr + dopasowywanie: `open-sse/config/upstreamStatusRestatement.ts` — lista reguł dla poszczególnych dostawców (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`), dopasowywana za pomocą `applyStatusRestatement()`.
- Miejsce wywołania: blok `providerFailure:` w `open-sse/handlers/chatCore.ts`
  (około wiersza 3654), bezpośrednio po tym, jak `parseUpstreamError()` przeanalizuje odpowiedź upstream ze statusem HTTP wskazującym błąd (`!providerResponse.ok`), a przed uruchomieniem jakiejkolwiek klasyfikacji, dzięki czemu każdy konsument niższej warstwy otrzymuje skorygowany status. Błędy osadzone w strumieniu SSE `200` przechodzą odrębną, późniejszą ścieżkę analizy strumienia i **nie** są obecnie objęte tym punktem integracji — jest to znane ograniczenie, które nie było dotąd potrzebne w przypadku nieprawidłowego statusu agentrouter (który pojawia się jako status HTTP wskazujący błąd).
- Możliwość ponowienia: `429` znajduje się w `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), więc błąd z ponownie ustawionym statusem zawiera rzeczywiste okno ponowienia zamiast pojawiać się jako nieaktywne `403`.
- Syntetyczny `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  określa wyłącznie to, co ponownie ustawiona odpowiedź przekazuje **klientowi**; nie jest to wewnętrzny czas schładzania/blokady połączenia — jest on zarządzany oddzielnie przez mechanizm, który faktycznie obsługuje błąd z ponownie ustawionym statusem (narastający backoff funkcji Connection Cooldown, §2, z bazą `3s` dla dostawców korzystających z kluczy API; albo Model Lockout, §3, dla dostawców z limitami per model, takich jak agentrouter). Router może wewnętrznie stać się gotowy do ponowienia wcześniej niż po upływie 60-sekundowego okna reklamowanego klientowi — jest to zamierzony zapas, a nie błąd.

Błędy trwałe (`无权访问模型` — brak dostępu do tego modelu) NIGDY nie są ponownie ustawiane: `excludeMarkers` unieważnia regułę nawet wtedy, gdy wystąpi dopasowanie `textMarkers`, więc błąd zachowuje swój pierwotny status i nic nie ponawia go w nieskończoność. Odpowiednia reguła klasyfikacji dostawcy
(`agentrouter-model-access-denied` w `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, zadeklarowana bazowa blokada `6h`) jest sprawdzana przez `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_przed_ ogólnym wczesnym zwrotem dla kategorii klucza API `FORBIDDEN`, pod warunkiem
`honorsRuleLockScope(provider)` (#10334 — obecnie wyłącznie dla agentrouter za pośrednictwem listy dozwolonych `HONORS_RULE_LOCK_SCOPE_PROVIDERS` w
`providerErrorRules.ts`). Zadeklarowana przez regułę blokada 6h jest przekazywana jako `fallbackResult.baseCooldownMs`, ale nadal trafia do istniejącej ścieżki blokady per model dla limitów (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, niezmienionej przez #10334 poza źródłem czasu blokady): jest ograniczana do wartości `mlSettings.maxCooldownMs` operatora
(domyślnie `1_800_000ms` / 30 min), tak jak każda inna blokada modelu, a
_zapisana przyczyna blokady_ pozostaje istniejącą, zakodowaną na stałe wartością `"forbidden"`, a nie wartością `"auth_error"` z reguły — kompleksowo honorowany jest wyłącznie czas blokady, nie jej tekstowa przyczyna. Samo połączenie pozostaje aktywne;
modele siostrzane korzystające z tego samego połączenia nie są objęte zmianą.

Ponownie ustawione błędy limitu (`额度不足`) trafiają w środowisku produkcyjnym do reguły dostawcy
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, bez własnej zadeklarowanej blokady — stosowane jest domyślne skalowane wycofywanie warstwy trwałości). Od czasu #10334 wartość `scope` w
`ProviderErrorRuleMatch` JEST wykorzystywana kompleksowo, ale **wyłącznie** dla dostawców znajdujących się na liście dozwolonych `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
obecnie tylko `"agentrouter"`, za pośrednictwem `honorsRuleLockScope()`). W przypadku każdego innego dostawcy `scope` pozostaje wyłącznie informacyjny, dokładnie tak jak przed #10334.
`checkFallbackError` udostępnia zakres dopasowanej reguły jako
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) to współdzielony mechanizm ochronny, który potwierdza, że
`ruleScope` jest rzeczywiście bezpieczny do zastosowania jako sygnał obejmujący całe połączenie i umożliwiający samoczynne odzyskanie (zakres `"connection"`, przyczyna `quota_exhausted`, nigdy `permanent` ani `creditsExhausted` — zabezpieczenie przed przyszłym powiązaniem zakresu `"connection"` z trwałym stanem konta). Wywołują go dwaj konsumenci:

- **Trwałość** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  zamiast przechodzić do gałęzi blokady **dla każdego modelu** dostawcy passthrough
  (agentrouter ma `passthroughModels: true` → `hasPerModelQuota()`
  zwraca `true`), stosuje **tymczasowe schłodzenie połączenia** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nigdy status końcowy
  (`credits_exhausted`/`banned`/`expired`) — dzięki czemu połączenie samoczynnie
  odzyskuje sprawność po upływie czasu schłodzenia, bez konieczności ręcznego
  resetowania danych uwierzytelniających.
  Pomijane dla połączeń z `disableCooling: true` (#2997): ta opcja wyłączenia
  powoduje przejście do blokady dla każdego modelu (udokumentowany kompromis —
  zobacz komentarz w kodzie powyżej tej gałęzi).
- **Routing kombinacji w ramach tego samego żądania** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ten sam warunek oznacza
  połączenie w zestawie `exhaustedConnections` przechowywanym w pamięci, z kluczem
  `${provider}:${connectionId}`. Powoduje to pominięcie wyłącznie pozostałego
  celu SAME-REQUEST, który _sam już zawiera dokładnie ten `connectionId`_ we
  własnym obiekcie celu (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` przed wyszukaniem w `exhaustedConnections`) — zwykła kombinacja
  z listą modeli, w której cele sąsiednie nie zawierają własnego przypisanego
  `connectionId`, a jedno z nich jest rozstrzygane dopiero przy każdym
  wysłaniu na podstawie nagłówka odpowiedzi
  `X-OmniRoute-Selected-Connection-Id`, nigdy nie trafi na dopasowanie tego
  klucza. W tym typowym przypadku rzeczywistą ochroną przed ponownym użyciem
  właśnie wyczerpanego konta przez pozostałą gałąź NIE jest ten Set — jest nią
  warstwa trwałości opisana powyżej (`rateLimitedUntil` połączenia wskazuje teraz
  przyszłość) w połączeniu z tym samym warunkiem, który pomija
  `transientRateLimitedProviders` dla tego błędu (zobacz „Projekt dwuetapowy”
  oraz komentarz w kodzie dotyczący gałęzi
  `isAgentrouterConnectionQuotaScope` w `targetExhaustion.ts`): gdy ten Set
  pozostaje nieoznaczony, wymuszone zezwolenie `allowRateLimitedConnection`
  w `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NIE
  zostaje aktywowane dla pozostałych gałęzi dostawcy, więc filtr
  `rateLimitedUntil` podczas wyboru danych uwierzytelniających
  (`src/sse/services/auth.ts:1238`) działa normalnie, a pozostała gałąź wybiera
  inną, nadal kwalifikującą się połączenie agentrouter albo kończy działanie
  z powodu braku dostępnych danych uwierzytelniających — nie wymusza ponownego
  użycia połączenia, które ta gałąź właśnie schłodziła.

### Projekt dwuetapowy: ponowne sformułowanie statusu, a następnie klasyfikacja

Ponowne sformułowanie statusu (`upstreamStatusRestatement.ts`) i reguły
klasyfikacji dostawcy (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) to osobne rejestry, które oba korzystają z identyfikatora
dostawcy i znaczników tekstowych, ale są uruchamiane w różnych miejscach i służą
różnym celom: ponowne sformułowanie zmienia status HTTP na wczesnym etapie
w `chatCore.ts`; reguły klasyfikacji wybierają zapasowy `reason` i blokują
`scope` (`model` / `provider` / `connection`) wewnątrz
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Reguły klasyfikacji widzą pełny **tekst** błędu (potrzebny do dopasowania
znaczników treści, takich jak `额度不足`) tylko dla dostawców wymienionych
na liście dozwolonych `FULL_TEXT_RULE_PROVIDERS` w `providerErrorRules.ts` —
obecnie tylko `"agentrouter"`. Dla każdego innego dostawcy **wbudowanego
katalogu** `checkFallbackError` przekazuje do `getProviderErrorRuleMatch`
wyłącznie ustrukturyzowany błąd (`{code, type}`), co wystarcza w przypadku reguł
opartych na nagłówkach/statusie/kodzie, ale nie pozwala wykrywać znaczników
w treści odpowiedzi. Pomocnicza funkcja `resolveRuleMatchBody()` wykonuje ten
wybór: pełny tekst błędu dla dostawców na liście dozwolonych, a w pozostałych
przypadkach ustrukturyzowany błąd. Dodanie **wbudowanego** dostawcy do
`FULL_TEXT_RULE_PROVIDERS` jest jawnym wyrażeniem zgody dla konkretnego
dostawcy — lista istnieje po to, aby domyślna ścieżka dla każdego dostawcy
nieumieszczonego na tej liście pozostała niezmieniona bajt w bajt.

`scope` reguły (`model` / `provider` / `connection`) jest osobną opcją
wyrażenia zgody, niezależną od `FULL_TEXT_RULE_PROVIDERS`:
`checkFallbackError` udostępnia ją wyłącznie jako `fallbackResult.ruleScope`,
a konsumenci niższych warstw respektują ją jako coś więcej niż etykietę
informacyjną tylko w przypadku dostawców znajdujących się na liście dozwolonych
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` w tym samym pliku (kontrolowanej przez
`honorsRuleLockScope()` — obecnie jest to tylko `"agentrouter"`). Zobacz
„Ponownie sformułowane błędy limitu” powyżej, aby dowiedzieć się, co faktycznie
robi dopasowanie `scope: "connection"`, gdy dostawca znajduje się na tej
liście dozwolonych.

**#11104 — reguły zadeklarowane przez operatora omijają obie listy dozwolonych.**
Operator może zadeklarować regułę dla konkretnego dostawcy w czasie działania
za pośrednictwem `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`),
bez edytowania tego pliku. Uzależnienie reguły operatora od
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — list mających
chronić **domyślne** zachowanie reguł wbudowanych dostawców katalogu —
sprawiłoby, że mechanizm ustawień byłby nieaktywny dla każdego dostawcy poza
tymi już wymienionymi na listach, ponieważ zadeklarowanie reguły jest już
jawnym wyrażeniem zgody operatora. `resolveRuleMatchBody()` i
`honorsRuleLockScope()` najpierw sprawdzają `hasOperatorRuleForProvider()`:
dostawca z regułą operatora otrzymuje surowy tekst błędu, a zadeklarowany
przez niego `scope` jest respektowany niezależnie od tego, czy dostawca
występuje na którejkolwiek z list dozwolonych.

**Reguły zadeklarowane przez operatora** (`OperatorProviderErrorRule`): każda
reguła ma opcjonalne `status` i opcjonalne `match` (zwykły, niewrażliwy na
wielkość liter podciąg tekstu błędu, nigdy RegExp, dzięki czemu nie może
powodować ReDoS) i musi ustawiać co najmniej jedno z nich. Gdy ustawione są
oba, są łączone operatorem AND; pominięte pole pasuje do wszystkiego, więc
`{match: "insufficient_quota"}` pasuje do dowolnego statusu zawierającego ten
kod. Wygrywa pierwsza pasująca reguła. `cooldownMs` przyjmuje wartości do
30 dni; łącznie można zdefiniować najwyżej 50 reguł.

**Domyślne reguły ogólne** (`settings.providerErrorDefaults`, opcjonalne włączenie, ustawiane przez
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
z `cooldownMs` od 1 minuty do 30 dni. Domyślna reguła ma zastosowanie tylko wtedy, gdy nie
została dopasowana żadna reguła operatora ani żadna reguła wbudowanego katalogu, i tylko do
błędów 402, 403, 408, 429 oraz 5xx. Błędy dotyczące kształtu żądania (400, 404, 409, 413, 422)
oraz samodzielne błędy 401 zachowują własną obsługę. Jeśli nie podano jawnego `reason`, powód
jest wyznaczany na podstawie statusu, tak samo jak robi to `classifyError`. Zadeklarowanie
domyślnej reguły jest traktowane jako reguła operatora przez `hasOperatorRuleForProvider()`,
więc jej `scope` (domyślnie `"connection"`) jest respektowane. Efektywny czas blokady domyślnej
reguły jest dłuższą z wartości: jej `cooldownMs` oraz własnej wskazówki dostawcy dotyczącej
ponowienia (`Retry-After`, `x-ratelimit-reset` lub wskazówki resetowania w treści — tej samej
wskazówki, którą silnik respektuje, gdy włączone jest ustawienie blokady połączenia
"use upstream retry hints"), dzięki czemu domyślna reguła może wydłużyć krótką wskazówkę
dostawcy, ale nigdy nie skróci rzeczywistego czasu resetowania. Jawna reguła operatora zachowuje
dokładnie swoje `cooldownMs`. Ani reguła, ani domyślna reguła nie omijają zabezpieczeń blokady
połączenia w `markAccountUnavailable`: aktywna, dłuższa blokada nigdy nie jest skracana, a
status terminalny nigdy nie jest nadpisywany. Wbudowane detektory tekstu uruchamiane wcześniej
w `checkFallbackError` (wyczerpane kredyty, dzienny limit, dezaktywowane konto) nadal mają
pierwszeństwo w przypadku własnych fraz.

**Znana luka — `providerRuleRegistry` nigdy nie jest sprawdzany dla HTTP 400.**
Gałąź `BAD_REQUEST` w `checkFallbackError` klasyfikuje status 400 wyłącznie za pomocą własnych
tablic wzorców (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` itd. w `accountFallback.ts`) i zwraca wynik, zanim zostanie
osiągnięta znajdująca się wyżej gałąź `configuredRule`/`getProviderErrorRuleMatch`.
Wbudowana reguła katalogu (lub reguła operatora) z `status: 400` jest poprawna składniowo, ale
nigdy nie zadziała. Obecnie żadna istniejąca reguła nie dotyczy 400, więc nie wpływa to na
działanie produkcyjne — jednak przyszła reguła 400 wymaga najpierw zmodyfikowania tej gałęzi,
co jest większą zmianą niż dodanie reguły (zmienia klasyfikację 400 dla każdego dostawcy, który
już polega na zachowaniu opartym na tablicach wzorców) i wykracza poza zakres dodania reguły
dla jednego dostawcy.

### Dodawanie nowej bramy błędnie zgłaszającej limity

1. Zarejestruj jedną tablicę reguł w `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Zachowaj `textMarkers`
   specyficzne dla dostawcy; nigdy nie używaj ponownie ogólnych angielskich fraz, które kolidują
   z `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Opcjonalnie zarejestruj reguły klasyfikacji w
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), aby wybrać odpowiedni
   zakres blokady (`connection` dla limitu dotyczącego całego konta, `model` dla błędów
   dotyczących konkretnego modelu). Ten krok działa w środowisku produkcyjnym wyłącznie dla
   dostawców, których reguły wymagają pełnego tekstu błędu (znaczników w treści): dodaj
   identyfikator dostawcy do `FULL_TEXT_RULE_PROVIDERS` w tym samym pliku — w przeciwnym razie
   `checkFallbackError` przekazuje regule tylko ustrukturyzowany błąd
   `{code, type}`, a reguła oparta na tekście treści nigdy nie dopasuje się do rzeczywistego
   ruchu. Reguły dopasowujące wyłącznie na podstawie `status`/`headers` (takie jak reguły
   Opencode lub Minimax) nie wymagają tego włączenia. Niezależnie od tego, jeśli reguła
   deklaruje `scope: "connection"` i celem jest rzeczywista blokada obejmująca całe połączenie
   oraz pomijanie kombinacji w ramach tego samego żądania (a nie tylko etykieta informacyjna),
   dodaj identyfikator dostawcy do `HONORS_RULE_LOCK_SCOPE_PROVIDERS` w tym samym pliku —
   właśnie to steruje zużyciem w stylu `isAgentrouterConnectionQuotaScope()` w
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) oraz
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez tego `scope` nadal przepływa przez
   `fallbackResult.ruleScope`, ale nic nie podejmuje na jego podstawie działania.
3. Dodaj testy jednostkowe wzorowane na
   `tests/unit/upstream-status-restatement.test.ts`
   i `tests/unit/agentrouter-error-rules.test.ts` (w tym zabezpieczenia
   not-permanent / not-creditsExhausted oraz — jeśli dostawca wymaga listy dozwolonych —
   test potwierdzający, że `resolveRuleMatchBody()` zwraca pełny tekst tylko dla tego
   dostawcy).

Nie są potrzebne żadne zmiany w `chatCore.ts`, `classifyError` ani w combo.

#### Blokada według segmentów egress (#10880)

Dostawcy znajdujący się w `EGRESS_BUCKETED_LOCK_PROVIDERS` (rodzina opencode) są traktowani
jako dostawcy upstream z podziałem według adresu IP (darmowy poziom opencode jest dzielony
według IP, a nie według kont — zob. #9611): status 429 sklasyfikowany jako
`quota_exhausted` **lub** `rate_limit_exceeded` blokuje każdą dozwoloną rodzinę połączeń,
której ostatni znany adres IP egress odpowiada adresowi połączenia, na którym wystąpił błąd,
zanim rotacja będzie mogła ich wypróbować
— unika to N-1 gwarantowanych niepowodzeń po stronie upstream (ten sam schemat co #10460/#10525).
`rate_limit_exceeded` jest uwzględniane celowo: na ścieżce `markAccountUnavailable` reguły
specyficzne dla opencode nigdy nie pasują (do `checkFallbackError` nie są przekazywane
nagłówki ani treść, a opencode nie znajduje się w `FULL_TEXT_RULE_PROVIDERS`), więc błąd 429,
którego treść zawiera tekst dotyczący limitu subskrypcji ("monthly usage limit reached"), jest
klasyfikowany jako `quota_exhausted` przez awaryjną klasyfikację tekstu limitu
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; blokada na 1 godzinę), zanim zostanie
osiągnięta reguła `status_429` — natomiast błąd 429 bez tekstu dotyczącego limitu (zwykłe
ograniczenie częstotliwości) jest klasyfikowany przez regułę `status_429` jako
`rate_limit_exceeded` i nadal blokuje rodzinę adresów IP. W przypadku dostawcy znajdującego
się na liście dozwolonych ograniczenie częstotliwości według IP jest tym samym sygnałem co
wyczerpany limit. Uczciwe ograniczenia:

- **Najlepszy możliwy rezultat**: blokada rozwiązuje ostatni znany adres `egress_ip` połączenia
  z `proxy_logs` (okno 24-godzinne, synchronicznie, bez pamięci podręcznej). Pusta pamięć podręczna
  (adres IP wyjściowy nigdy nie był sprawdzany) lub brak wiersza → niesprawne połączenie nadal jest
  schładzane przez tę gałąź (rejestrowane tak jak dotychczas), blokowane jest jednak tylko ono, bez
  żadnego połączenia siostrzanego.
- **Nigdy nie kończy działania**: schładzanie jest odnawialnym oknem limitu
  (`testStatus: "unavailable"`); stan trwały nigdy nie jest wyprowadzany z sygnału na poziomie adresu IP.
  Połączenia z `disableCooling` całkowicie pomijają tę gałąź.
- **Zmiana poziomu blokady dla rodziny objętej allowlistą**: jest to zmiana zakresu, a nie tylko optymalizacja
  dla połączeń siostrzanych. opencode jest dostawcą `passthroughModels`, więc przed tą gałęzią kod 429
  powodował blokadę na poziomie MODELU; teraz powoduje schłodzenie połączenia — także w przypadku operatora
  uruchamiającego pojedyncze połączenie, bez żadnego połączenia siostrzanego. Jest to poziom, który tabela
  reguł opencode już deklaruje jako poprawny (`scope: "connection"`,
  `providerErrorRules.ts`), lecz dotąd nigdy nie był respektowany, ponieważ opencode nie znajduje się na liście
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Gałąź sama zapisuje schłodzenie niesprawnego
  połączenia oraz jego `backoffLevel`, odwzorowując gałąź agentrouter działającą na poziomie połączenia, po czym
  zwraca wynik — blokada na poziomie modelu oraz znajdująca się niżej ścieżka ogólna nigdy nie są osiągane.
- **Uwzględniono kombinacje**: podobnie jak gałąź agentrouter, zakres celowo ignoruje obniżenie
  `persistUnavailableState`/`isCombo`, które wywołujący typu combo stosuje dla kodu 429. Blokada na poziomie
  modelu nie jest słabszą formą tego zakresu, lecz niewłaściwą jednostką: nie mówi nic o wyczerpanym adresie IP,
  więc rotacja combo nadal wykonywałaby jedno gwarantowanie nieudane wywołanie na każde połączenie siostrzane.
- **Bezpieczeństwo połączeń siostrzanych**: połączenie siostrzane, które już znajduje się w stanie końcowym
  (banned/credits_exhausted) lub już ma dłuższe schłodzenie, nigdy nie jest nadpisywane.
- **Wyłączna allowlista**: rozszerzenie `EGRESS_BUCKETED_LOCK_PROVIDERS` jest jawną decyzją właściciela;
  nie ma tu ogólnego podłączenia (wzorzec #10334/#10419). Zapytanie dotyczące połączeń siostrzanych
  wiąże tę samą allowlistę zamiast powtarzać ją jako literał SQL, więc jej rozszerzenie nadal wymaga zmiany
  tylko w jednym wierszu.
- **Rotacja adresu IP wyjściowego w obu kierunkach**: okno wyszukiwania (24 godziny) jest znacznie
  szersze niż TTL pamięci podręcznej adresów IP wyjściowych (5 minut), więc „ostatni znany adres IP” oznacza
  historię, a nie bieżący stan. Jeśli proxy połączenia zmieniło adres w obrębie tego okna, blokada może
  **nie wykryć** faktycznie współdzielonego adresu IP (zarejestrowany adres to nowy, niewyczerpany adres)
  — i symetrycznie może **schłodzić połączenie siostrzane, które od tego czasu zmieniło adres**
  z wyczerpanego adresu IP. Drugi przypadek kosztuje to połączenie jedno okno schładzania; oba są akceptowanymi,
  najlepszymi możliwymi ograniczeniami wyszukiwania opartego na historii.
- **Koszt**: dwa ograniczone skanowania `proxy_logs` (filtrowane po oknie za pomocą `idx_pl_timestamp`),
  wykonywane tylko z częstotliwością występowania kodu 429. Brak nowego indeksu (migracja 134 YAGNI).
  Pomiar wykonano na kopii bazy danych z rzeczywistym ruchem o umiarkowanym rozmiarze; instancja
  o dużej przepustowości przechowuje proporcjonalnie więcej wierszy w tym samym oknie.

## Inne cechy odporności

- **22 strategie routingu** (priorytet, ważony, działanie okrężne, przekaźnik kontekstowy, pierwsze wypełnienie, p2c, losowy, najrzadziej używany, zoptymalizowany pod względem kosztów, uwzględniający resetowanie, okno resetowania, pierwszy wygaśnięcie, zapas, ważony przydziałami, ściśle losowy, auto, lkgp, zoptymalizowany kontekstowo, zoptymalizowany pod kątem pamięci podręcznej, fusion, potok, jev) — patrz [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Routing uwzględniający resetowanie** (v3.8.0) — nadaje priorytet połączeniom według czasu resetowania przydziału.
- **Degradacja trybu tła** Odpowiedzi — API `background: true` zdegradowane do synchronizacji z ostrzeżeniem.
- **Dynamiczne wykrywanie ograniczeń narzędzia** — wycofuje dostawców, gdy osiągnięto limity liczby narzędzi.
- **Awaryjny powrót** — kontrolowana przez `OMNIROUTE_EMERGENCY_FALLBACK`; operatorzy mogą go zastąpić na stronie Flagi funkcji bez ponownego uruchamiania.

---

## Debugowanie

- Combo ważone (weighted) odpowiada `503 all_targets_cooling_down` (nagłówek `Retry-After` ustawiony, `diagnostics.excluded` zawiera każdy cel z `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pula jest skonfigurowana i połączona, każdy cel jest po prostu wykluczony przez licznik odporności; ostrzeżenie `[COMBO] Weighted selection: every target excluded before dispatch — …` podaje przyczyny i pozostałą liczbę sekund. Odpowiedź `404 no_executable_targets` z tego samego combo oznacza, że nie był zaangażowany żaden licznik odporności (nie ma nic do uruchomienia albo każde konto nie przeszło sondy dostępności). Zbudowane w `open-sse/services/combo/pinRecovery.ts` na podstawie wykluczeń zebranych w `targetResolution.ts`.
- Wszystkie klucze danego dostawcy są pomijane → sprawdź zarówno stan circuit breakera, ORAZ `rateLimitedUntil`/`testStatus` każdego połączenia.
- Dostawca trwale wykluczony po oknie resetu → kod odczytuje surowy `state` zamiast `getStatus()`/`canExecute()`.
- Jeden klucz zawodzi, inne powinny działać → wybierz wygaszanie połączenia (connection cooldown) zamiast circuit breakera.
- Zawodzi tylko jeden model → wybierz blokadę modelu (model lockout) zamiast wygaszania połączenia.
- Stan powinien odtwarzać się sam, ale tego nie robi → sprawdź, czy znacznik czasu nie jest z przyszłości, oraz ścieżkę odczytu, która odświeża wygasły stan. Stany trwałe wymagają ręcznej interwencji.

---

## Stan działania (runtime) — szybka ściąga dla agenta

> Przeniesione dosłownie z `AGENTS.md` → „Resilience Runtime State" (PR #12743), tak aby
> przewodnik agenta mieścił się w budżecie kontekstu 40k. Jest to skondensowany, skierowany
> do agentów obraz powyższych sekcji; sekcje numerowane pozostają pełnym źródłem odniesienia.

OmniRoute ma trzy powiązane, ale odrębne mechanizmy obsługi awarii tymczasowych. Podczas
debugowania zachowania routingu utrzymuj ich zakresy rozdzielnie. Zobacz
[diagram 3-warstwowej odporności](../diagrams/exported/resilience-3layers.svg)
(źródło: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)),
aby uzyskać mapę do szybkiego przeglądu.

### Circuit breaker dostawcy

**Zakres**: cały dostawca, np. `glm`, `openai`, `anthropic`.

**Cel**: zatrzymać wysyłanie ruchu do dostawcy, który wielokrotnie zawodzi na poziomie
upstream/usługi, tak aby jeden niezdrowy dostawca nie spowalniał każdego żądania.

**Implementacja**:

- Klasa główna: `src/shared/utils/circuitBreaker.ts`
- Integracja bramki/wykonania czatu: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API stanu w czasie działania: `src/app/api/monitoring/health/route.ts`
- Współdzielone wrappery: `open-sse/services/accountFallback.ts`
- Tabela trwałego stanu: `domain_circuit_breakers`

**Stany** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normalny ruch jest dozwolony.
- `DEGRADED`: strefa wczesnego ostrzegania — awarie przekroczyły próg degradacji, ale jeszcze
  nie próg wyłącznika; ruch nadal płynie, pulpity nawigacyjne pokazują ostrzeżenie. Pomyślny
  test połączenia lub ciche okno bez nowych awarii przywraca stan `CLOSED`
  (okno opisuje `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: dostawca jest tymczasowo zablokowany; wywołujący otrzymują odpowiedź typu
  provider-circuit-open albo routing combo przechodzi do innego celu.
- `HALF_OPEN`: minął czas oczekiwania na reset; dozwolone jest żądanie sondy. Sukces zamyka
  wyłącznik, awaria otwiera go ponownie.

**Wartości domyślne** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, wykorzystywane przez
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` w `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` w `src/sse/handlers/chatHelpers.ts`). Wyłącznik poziomu całego
dostawcy działa na podstawie `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil    | degradacja przy | otwarcie przy (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| --------- | --------------: | ----------------------------------------: | ----------------------------: |
| OAuth     |             `5` |                                       `8` |                         `60s` |
| Klucz API |             `7` |                                      `12` |                         `30s` |
| Lokalny   |     (wyliczane) |                                       `2` |                         `15s` |

`PROVIDER_PROFILES` definiuje również `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) oraz `providerCooldownMs` (5/10/1 min): zasilają one
**bramkę okna opcjonalnego, globalnego mechanizmu Provider Cooldown** (`PROVIDER_COOLDOWN_ENABLED`,
domyślnie wyłączone) — wpis na poziomie dostawcy w `open-sse/services/providerCooldownTracker.ts`
jest traktowany jako wygaszanie dopiero po `providerFailureThreshold` awariach w obrębie
`providerFailureWindowMs`, a następnie wygasza przez `providerCooldownMs`. NIE są to progi
aktywnego wyłącznika — nie dostrajaj ich, oczekując zachowania wyłącznika. Każdą wartość
domyślną można nadpisać zmiennymi środowiskowymi `OMNIROUTE_PROVIDER_BREAKER_*` oraz
`OMNIROUTE_CIRCUIT_BREAKER_*`; dokładna tabela referencyjna stanu działania znajduje się w
`docs/architecture/RESILIENCE_GUIDE.md`.

Tylko statusy awarii na poziomie dostawcy powinny wyzwalać wyłącznik dostawcy:

```ts
(408, 500, 502, 503, 504);
```

Nie wyzwalaj wyłącznika całego dostawcy dla zwykłych błędów konta/klucza/modelu, takich jak
większość przypadków `401`, `403` czy `429`. Te zazwyczaj należą do wygaszania połączenia
(connection cooldown) lub blokady modelu (model lockout). Typowy `403` dostawcy z kluczem API
powinien być odzyskiwalny, chyba że zostanie sklasyfikowany jako terminalny błąd
dostawcy/konta.

Breaker wykorzystuje leniwe odtwarzanie (lazy recovery), a nie licznik działający w tle. Gdy stan `OPEN` wygaśnie, odczyty takie jak `getStatus()`, `canExecute()` i `getRetryAfterMs()` odświeżają stan do `HALF_OPEN`, dzięki czemu dashboardy i buildery kandydatów combo nie wykluczają w nieskończoność dostawcy, którego blokada wygasła.

### Cooldown połączenia

**Zakres**: jedno połączenie/konto/klucz dostawcy.

**Cel**: tymczasowe pomijanie jednego wadliwego klucza/konta, przy jednoczesnym umożliwieniu innym połączeniom tego samego dostawcy kontynuowania obsługi żądań.

**Implementacja**:

- Ścieżka zapisu/aktualizacji: `src/sse/services/auth.ts::markAccountUnavailable()`
- Wybór/filtrowanie kont: `src/sse/services/auth.ts::getProviderCredentials...`
- Obliczanie cooldownu: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Ustawienia: `src/lib/resilience/settings.ts`

Ważne pola w połączeniach dostawcy:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Podczas wyboru konta połączenie jest pomijane, gdy:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldowny również są leniwe: gdy `rateLimitedUntil` znajduje się w przeszłości, połączenie ponownie staje się dostępne. Po pomyślnym użyciu `clearAccountError()` czyści `testStatus`, `rateLimitedUntil`, pola błędów oraz `backoffLevel`.

Domyślne zachowanie cooldownu połączenia:

- Bazowy cooldown OAuth: `5s`.
- Bazowy cooldown klucza API: `3s`.
- Dla klucza API błąd `429` powinien preferować wskazówki ponawiania z warstwy upstream (`Retry-After`, nagłówki resetu lub parsowalny tekst resetu), gdy są dostępne.
- Powtarzające się błędy możliwe do odzyskania stosują wykładnicze wycofywanie (exponential backoff):

```ts
baseCooldownMs * 2 ** failureIndex;
```

Zabezpieczenie anty-thundering-herd zapobiega wielokrotnemu wydłużaniu cooldownu lub podwójnemu zwiększaniu `backoffLevel` przez równoległe błędy na tym samym połączeniu.

Stany terminalne nie są cooldownami. `banned`, `expired` (który staje się terminalny dopiero po N ograniczonych ponownych próbach za pośrednictwem `EXPIRED_RETRY_MAX`) oraz `credits_exhausted` mają pozostawać niedostępne, dopóki nie zmienią się dane uwierzytelniające/ustawienia lub operator ich nie zresetuje. Nie nadpisuj stanów terminalnych przejściowym stanem cooldownu.

### Blokada modelu

**Zakres**: dostawca + połączenie + model.

**Cel**: uniknięcie wyłączania całego połączenia, gdy niedostępny lub objęty limitem kwoty jest tylko jeden model dla tego połączenia.

Przykłady:

- Dostawcy z kwotami per model zwracający `429`.
- Dostawcy lokalni zwracający `404` dla jednego brakującego modelu.
- Błędy uprawnień trybu/modelu specyficzne dla dostawcy, takie jak wybrane tryby Grok.

Blokada modelu znajduje się w `open-sse/services/accountFallback.ts` i pozwala temu samemu połączeniu kontynuować obsługę innych modeli.

### Wskazówki dotyczące debugowania

- Jeśli wszystkie klucze dostawcy są pomijane, sprawdź zarówno stan breakera dostawcy, jak i `rateLimitedUntil`/`testStatus` każdego połączenia.
- Jeśli dostawca wydaje się trwale wykluczony po oknie resetu, sprawdź, czy kod odczytuje surowy `state` zamiast używać `getStatus()`/`canExecute()`.
- Jeśli jeden klucz dostawcy zawodzi, ale inne powinny działać, preferuj cooldown połączenia zamiast breakera dostawcy.
- Jeśli zawodzi tylko jeden model, preferuj blokadę modelu zamiast cooldownu połączenia.
- Jeśli stan powinien odtwarzać się samoczynnie, powinien mieć przyszły znacznik czasu/timeout resetu oraz ścieżkę odczytu odświeżającą wygasły stan. Statusy trwałe wymagają ręcznej zmiany danych uwierzytelniających lub konfiguracji.

---

## Odciski TLS (fingerprinting) i tryb stealth

Ukrywanie specyficzne dla dostawcy (JA3/JA4, CCH, zaciemnianie) jest udokumentowane osobno — zobacz `docs/security/STEALTH_GUIDE.md` (git; nie jest kompilowane do `/docs`).

---

## Testy odporności (Faza 8 · Blok C)

Poza testami jednostkowymi logiki odporności, trzy testy sprawdzają środowisko uruchomieniowe w rzeczywistych warunkach obciążenia/awarii (wszystkie są integracyjne/nocne — żaden nie blokuje PR-ów):

| Test        | Co testuje                                                                                                                                                                                                        | Uruchomienie                           |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | Węzeł fałszywego upstreamu wstrzykuje rzeczywiste opóźnienia/resety/timeouty/503; sprawdza, czy circuit breaker otwiera się i odzyskuje oraz czy `checkFallbackError` klasyfikuje 503 jako odzyskiwalny fallback. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Heap-growth | ~500 strumieni na `createSSEStream` pod `--expose-gc`; kończy się niepowodzeniem, jeśli sterta przekroczy dozwolony limit (strażnik OOM #3069).                                                                   | `npm run test:heap`                    |
| k6 soak     | Utrzymane obciążenie na `/api/monitoring/health`; progi p95/błędów.                                                                                                                                               | `k6 run tests/load/k6-soak.js` (nocny) |

Orkiestracja odbywa się przez `.github/workflows/nightly-resilience.yml` (cron + dispatch). W domyślnym `test:integration` testy chaos i heap pomijają się same (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Zobacz także

- [Przewodnik po architekturze](./ARCHITECTURE.md) — Architektura systemu i mechanizmy wewnętrzne
- [Przewodnik użytkownika](../guides/USER_GUIDE.md) — Dostawcy, kombinacje, integracja z CLI
- [Silnik Auto-Combo](../routing/AUTO-COMBO.md) — Punktacja 16-czynnikowa, pakiety trybów
