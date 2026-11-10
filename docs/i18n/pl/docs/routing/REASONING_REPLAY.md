# REASONING_REPLAY (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Źródło prawdy:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Ostatnia aktualizacja:** 2026-06-28 — v3.8.40

OmniRoute przechwytuje asystenta `reasoning_content` utworzonego przez modele trybu myślenia i odtwarza go w przejrzysty sposób w przypadku żądań wieloobrotowych, gdy wymaga tego dostawca wyższego szczebla. Eliminuje to błędy HTTP 400, które zgłaszają rygorystyczni dostawcy, gdy w historii rozmów klienta brakuje uzasadnienia z poprzedniej tury.

## Dlaczego to istnieje

Kilku dostawców trybu myślenia odrzuca kolejną turę, chyba że** poprzednia wiadomość asystenta zawiera oryginalną `reasoning_content`** . Upstream zwraca 400 z komunikatami takimi jak:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Ale typowi klienci (Cursor, Cline, Roo Code, OpenAI SDK) usuwają `reasoning_content` z odtwarzanej historii. OmniRoute przywraca go z pamięci podręcznej po stronie serwera, więc żądanie, które widzi serwer nadrzędny, jest spójne. W numerze #1628 wprowadzono hybrydową trwałość memory/SQLite, dzięki czemu pamięć podręczna przetrwa ponowne uruchomienie procesu.

## Architektura

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

Przechwytywanie odbywa się w `open-sse/handlers/chatCore.ts` (dwa miejsca, w dwóch miejscach wywołań `cacheReasoningFromAssistantMessage` ). Powtórka odbywa się w `open-sse/translator/index.ts` po wymuszeniu schematu, ale przed wysłaniem.

Zwykłe (nie wymagające wywoływania narzędzi) tury asystenta są kluczowane inaczej: `buildAssistantMessageCacheKey()` trawi zakres sesji plus znormalizowany transkrypt w formacie OpenAI aż do tej tury, ponieważ DeepSeek wymaga rozumowania _każdej_ poprzedniej tury, gdy `tools` jest obecne. W przypadku celów Responses-API (na przykład `opencode-go/deepseek-v4-flash`, kierowanych do `/responses`) treść nadrzędna przenosi `input`, a nie `messages`, więc `translateRequest()` (`open-sse/translator/index.ts`) zgłasza transkrypt przestawny, który strawił za pomocą opcji wywołania zwrotnego, a miejsca przechwytywania trawią ten sam transkrypt. Przebieg odtwarzania odpowiedzi działa na osi OpenAI dla każdego formatu źródłowego, więc klienci Anthropic Messages (Claude → OpenAI → Responses) są również odtwarzani.

## Pamięć masowa — Pamięć hybrydowa + SQLite

Ścieżka gorąca wykorzystuje `Map` w pamięci (LRU-by-creation) wspartą tabelą SQLite w celu odzyskiwania po awarii i widoczności pulpitu nawigacyjnego.

| Warstwa | Realizacja                                    | Zamiar                                                      |
| ------- | --------------------------------------------- | ----------------------------------------------------------- |
| Pamięć  | `Map` w `open-sse/services/reasoningCache.ts` | Szybkie wyszukiwanie, eksmisja najstarszego w wieku 200 lat |
| DB      | stół `reasoning_cache` (`src/lib/db/`)        | Utrzymuje się po ponownym uruchomieniu, napędza statystyki  |

Pisze się do obu. Czyta najpierw sprawdza pamięć, potem wraca do DB (trafienia DB są promowane z powrotem do pamięci). awarie DB nie są krytyczne. — pamięć podręczna w pamięci nadal obsługuje ścieżkę gorącą.

**Wartości domyślne:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maksymalna ilość wpisów w pamięci: `200` (`MAX_MEMORY_ENTRIES`)
- Eksmisja: najpierw najstarsza `createdAt`

## Schemat bazy danych

Migracja: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Indeksy: `expires_at`, `provider`, `model`, `created_at`. `expires_at` jest przechowywane jako sekundy epoki Uniksa; warstwa SELECT normalizuje starsze wartości tekstowe poprzez `EXPIRES_AT_EPOCH_SQL`.

## Wykrywanie dostawcy/modelu

Powtórka jest włączona, gdy `requiresReasoningReplay(provider, model)` zwraca `true`. Funkcja sprawdza dwie listy w `open-sse/services/reasoningCache.ts`.

**Dostawca IDs (dokładne dopasowanie, wielkość liter nie ma znaczenia):**

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

**Modelowe wzorce wyrażeń regularnych (wielkość liter nie ma znaczenia):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` i `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, opcjonalny przyrostek `-free` )
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Dodanie nowego ścisłego provider/model oznacza dołączenie do jednej z tych list i napisanie testu jednostkowego potwierdzającego zastrzyk powtórki. Opis PR powinien podawać dokładny ciąg znaków 400, który motywował zmianę.

## REST API

Pamięć podręczna udostępnia dwa punkty końcowe w obszarze `src/app/api/cache/reasoning/route.ts`. Oba wymagają uwierzytelnienia zarządzania (`isAuthenticated` z `@/shared/utils/apiAuth`).

| Metoda | Punkt końcowy                                             | Opis                                                        |
| ------ | --------------------------------------------------------- | ----------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statystyki + paginowane wpisy                               |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Lista filtrowana (`limit` przymocowana do `[1, 200]`)       |
| DELETE | `/api/cache/reasoning`                                    | Wyczyść wszystko (pamięć + DB) i zresetuj liczniki hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Wyczyść tylko wpisy dla jednego dostawcy                    |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Usuń pojedynczy wpis                                        |

**Kształt odpowiedzi GET :**

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

## Uwagi operacyjne

- **Posprzątać:** `cleanupReasoningCache()` usuwa wygasłe wpisy pamięci i uruchamia `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Pracownicy kontroli stanu zdrowia dzwonią pod ten numer okresowo.
- **Odzyskiwanie po awarii:** Po ponownym uruchomieniu pamięć jest pusta, ale DB nadal przechowuje niewygasłe wpisy. Pierwszym wyszukiwaniem danego `tool_call_id` jest trafienie DB ; kolejne wyszukiwania to trafienia w pamięć.
- **Bez rozumowania, bez pamięci podręcznej:** `cacheReasoningFromAssistantMessage` zwraca `0` gdy wiadomość asystenta nie zawiera pola `reasoning_content` / `reasoning`, więc niemyślące odpowiedzi nic nie kosztują.
- **Zapis też jest zamknięty:** obie strony wywołujące w `chatCore.ts` (nie przesyłające strumieniowo i przesyłające strumieniowo) wywołują `cacheReasoningFromAssistantMessage()` tylko wtedy, gdy `requiresReasoningReplay(provider, model)` to `true` — to samo predykuje kontrole strony odczytu. Instalacje, które nigdy nie dotykają dostawcy powtórek, przestają płacić za zapis, aktualizację indeksu i try/catch za każdą uzasadnioną odpowiedź.
- **Dostawcy nierygorystyczny:** Gdy `requiresReasoningReplay` to `false`, a formatem docelowym jest OpenAI, tłumacz** paski** jakiekolwiek pole `reasoning_content` z wiadomości wychodzących — OpenAI Chat Completions nie akceptuje tego.

## Własność niejasno rozumująca Muse

Muse (`muse-code`) zwraca nieprzejrzyste rozumowanie powiązane z rozmówcą (`encrypted_content`). Odtwarzanie go na innym koncie lub przypomnienie danych uwierzytelniających kończy się niepowodzeniem w górę strumienia, więc natywne żądania OAuth korzystają z własności na poziomie sesji zamiast rotacji na żądanie (`src/sse/services/museSessionOwnership.ts`, wymuszone w `src/sse/handlers/chat.ts`). Jawnie wybrane połączenia z kluczem API i konfiguracje z samym kluczem API zachowują swoje istniejące routing bez tego trybu własności.

- Dostarczaj stabilną sesję ID w każdej turze: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` lub `x-codex-session-id`; alternatywnie użyj `prompt_cache_key`, `session_id`, `conversation_id` lub `metadata.session_id` w treści (w tej kolejności pierwszeństwa). Brakujące lub puste IDs zwracają 400, gdy aktywne są dwa lub więcej natywnych kont OAuth ; z jednym kontem OAuth nie ma się do czego rotować, więc takie żądanie utrzymuje nieprzypięty routing. Zakres obejmuje klucz API OmniRoute ID.
- Świeże, niezależne sesje okrężne pomiędzy aktywnymi natywnymi kontami OAuth dozwolone przez politykę połączeń z kluczem API, uporządkowane przez połączenie ID. Round-robin pomija konta w czasie oczekiwania na połączenie, ze statusem terminala (`banned`, `expired`, `credits_exhausted`) lub modelem zablokowanym dla żądanego modelu; Awarie zasilania Muse rejestrują czas odnowienia i stan wyłącznika, podobnie jak inni dostawcy. Jawnie wymuszone połączenie omija działanie okrężne w przypadku nowej sesji, ale nie może zastąpić istniejącego właściciela.
- Dopóki właściciel nie przekaże pomyślnej odpowiedzi, sesja, której właściciel stał się niedostępny, zostanie ponownie przejęta na zdrowe konto. Po pierwszej pomyślnej odpowiedzi sesja pozostaje przypięta do tego właściciela, dopóki nie będzie bezczynna przez 30 dni (`MUSE_SESSION_IDLE_TTL_MS`).
- Każda kontynuacja i wynik narzędzia pozostają przypięte do właściciela sesji: połączenie, tożsamość konta i generowanie poświadczeń wnioskowania są ponownie sprawdzane przed próbami przesyłania danych dalej, w tym ponownymi próbami odświeżenia poświadczeń. Odpowiedzi na wywołania IDs/item i narzędzia do zakończenia czatu IDs muszą zostać zarejestrowane dla tej sesji i generacji.
- SQLite rekordy `key_value` w przestrzeni nazw `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) utrzymują własność i kursor rotacji podczas ponownego uruchamiania. Każde roszczenie i udzielona odpowiedź odświeżają znacznik aktywności sesji; sesja bezczynności dłuższa niż `MUSE_SESSION_IDLE_TTL_MS` jest usuwana (pin właściciela, obsługiwana flaga i zarejestrowane skróty opaque/reference ), najwyżej raz na 10 minut i w ograniczonych partiach, więc późniejsze odtworzenie jej historii kończy się niepowodzeniem, gdy jest zamknięty jako nieznany właściciel. Rekordy zawierają połączenie IDs i skróty tożsamości konta, dane uwierzytelniające, nieprzejrzystą treść i odniesienia do kontynuacji, a nie sekrety lub historię rozmów. Klienci muszą zachować i przesłać pełną historię oraz nieprzejrzyste uzasadnienie.
- Nieznane lub obce nieprzejrzyste rozumowanie, brak właściciela, niedostępne konto właściciela lub zmiana pokolenia z zarejestrowaną historią kończy się niepowodzeniem za pomocą wyraźnego 4xx/503 — nigdy cichego przełączania awaryjnego między kontami i nigdy nie porzucono rozumowania.
- Przypomniany klucz do tego samego konta zostaje przyjęty tylko wtedy, gdy w sesji nie zarejestrowano historii, którą można odtworzyć; nagrane sesje ciągle kończą się niepowodzeniem, dopóki nie rozpoczną się od nowa.
- Pusta odpowiedź typu upstream (`upstream_empty_response` / `empty_response`, nic nie jest wysyłane do osoby wywołującej) jest ponawiana co najwyżej dwukrotnie u tego samego właściciela, po 0,5 s, a następnie 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Jeśli wszystkie próby okażą się puste, oryginalny 502 zostanie zwrócony bez oznaczenia czasu odnowienia lub przerywacza, więc niepewna odpowiedź nigdy nie blokuje właściciela.
- Wszystkie żądania `muse-code` omijają odczyty i zapisy w pamięci podręcznej semantycznej, w tym zapisy strumieniowe, więc buforowane nieprzezroczyste dane wyjściowe nie mogą uzyskać innego właściciela sesji.

Strażnicy regresji: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` i `tests/unit/chatcore-semantic-cache.test.ts`.

## Zobacz także

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — wyłączniki automatyczne, czasy odnowienia, blokady modeli
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnozowanie upstream 400s
- Źródło: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migracja: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- trasa API : `src/app/api/cache/reasoning/route.ts`
- Numer oryginalny: #1628
