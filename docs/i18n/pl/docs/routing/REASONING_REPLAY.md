# Reasoning Replay Cache (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

title: "Cache odtwarzania reasoning (Reasoning Replay)"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Cache odtwarzania reasoning (Reasoning Replay)

> **Źródło prawdy:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Ostatnia aktualizacja:** 2026-06-28 — v3.8.40

OmniRoute przechwytuje `reasoning_content` asystenta generowane przez modele w trybie thinking i odtwarza je w sposób przezroczysty w żądaniach wieloturowych, gdy upstream provider tego wymaga. Eliminuje to błędy HTTP 400, które rygorystyczni providerzy zwracają, gdy historia rozmowy klienta nie zawiera reasoning z poprzedniej tury.

## Po co to istnieje

Kilku providerów w trybie thinking odrzuca kolejną turę, chyba że **poprzednia wiadomość asystenta zawiera oryginalne `reasoning_content`**. Upstream zwraca 400 z komunikatami w stylu:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Typowe klienty (Cursor, Cline, Roo Code, OpenAI SDK) usuwają jednak `reasoning_content` z historii, którą odtwarzają. OmniRoute przywraca je z cache po stronie serwera, dzięki czemu żądanie widziane przez upstream jest spójne. Issue #1628 wprowadził hybrydową persystencję pamięć/SQLite, dzięki czemu cache przetrwa restart procesu.

## Architektura

```
Tura N (asystent generuje):
  → odpowiedź zawiera reasoning_content + tool_calls
  → jeśli requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      zapisuje (pamięć + DB), z kluczem dla każdego tool_call.id
  → przekazanie odpowiedzi do klienta (który może zachować reasoning lub nie)

Tura N+1 (klient wysyła kolejne żądanie):
  → translator wykrywa: requiresReasoningReplay(provider, model) === true
  → dla każdej wiadomości asystenta z tool_calls i bez reasoning_content:
      lookupReasoning(toolCalls[0].id) → pamięć → DB
      trafienie     → msg.reasoning_content = cached; recordReplay()
      brak trafienia → msg.reasoning_content = "" (starszy mechanizm rezerwowy dla wcześniejszych wersji DeepSeek)
  → upstream otrzymuje spójną historię → brak błędu 400
```

Przechwytywanie odbywa się w `open-sse/handlers/chatCore.ts` (w dwóch miejscach, w których wywoływana jest funkcja `cacheReasoningFromAssistantMessage`). Odtwarzanie odbywa się w `open-sse/translator/index.ts` po wymuszeniu zgodności ze schematem, ale przed wysłaniem.

Zwykłe tury asystenta (bez wywołań narzędzi) mają klucze tworzone inaczej: `buildAssistantMessageCacheKey()` oblicza skrót zakresu sesji oraz znormalizowanego transkryptu w formacie OpenAI aż do danej tury, ponieważ DeepSeek wymaga reasoning ze _wszystkich_ wcześniejszych tur, gdy obecne jest `tools`. W przypadku celów korzystających z Responses API (na przykład `opencode-go/deepseek-v4-flash`, kierowanego do `/responses`) treść żądania upstream zawiera `input`, a nie `messages`, dlatego `translateRequest()` (`open-sse/translator/index.ts`) zgłasza za pośrednictwem opcji callbacka transkrypt pośredni, dla którego obliczono skrót, a miejsca przechwytywania obliczają skrót tego samego transkryptu. Przebieg odtwarzania Responses działa na transkrypcie pośrednim OpenAI dla każdego formatu źródłowego, dzięki czemu odtwarzane są również żądania klientów Anthropic Messages (Claude → OpenAI → Responses).

## Przechowywanie — hybrydowa pamięć + SQLite

Ścieżka hot path używa in-memory `Map` (LRU według czasu utworzenia) wspartej tabelą SQLite na potrzeby odzyskania po awarii i widoczności w dashboardzie.

| Warstwa | Implementacja                                 | Cel                                         |
| ------- | --------------------------------------------- | ------------------------------------------- |
| Pamięć  | `Map` w `open-sse/services/reasoningCache.ts` | Szybkie lookupy, usuwa najstarsze przy 2000 |
| DB      | tabela `reasoning_cache` (`src/lib/db/`)      | Przetrwa restarty, zasila statystyki        |

Zapisy idą do obu. Odczyty najpierw sprawdzają pamięć, potem fallback do DB (trafy DB są promowane z powrotem do pamięci). Awaria DB nie jest fatalna — cache w pamięci nadal obsługuje hot path.

**Domyślne wartości:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Maks. wpisów w pamięci: `2000` (`MAX_MEMORY_ENTRIES`)
- Eviction: najstarsze `createdAt` najpierw

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

Indeksy: `expires_at`, `provider`, `model`, `created_at`. `expires_at` jest przechowywane jako sekundy epoki Unixa; warstwa SELECT normalizuje legacy wartości tekstowe przez `EXPIRES_AT_EPOCH_SQL`.

## Wykrywanie providera / modelu

Odtwarzanie jest włączone, gdy `requiresReasoningReplay(provider, model)` zwraca `true`. Funkcja sprawdza dwie listy w `open-sse/services/reasoningCache.ts`.

**ID providerów (dokładne dopasowanie, bez rozróżniania wielkości liter):**

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

**Wzorce regex modeli (bez rozróżniania wielkości liter):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` oraz `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, opcjonalny sufiks `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Dodanie nowego rygorystycznego providera/modelu oznacza dopisanie do jednej z tych list i napisanie testu jednostkowego potwierdzającego injekcję odtwarzania. Opis PR powinien cytować dokładny string upstream 400, który motywował zmianę.

## REST API

Cache udostępnia dwa endpointy w `src/app/api/cache/reasoning/route.ts`. Oba wymagają uwierzytelnienia management (`isAuthenticated` z `@/shared/utils/apiAuth`).

| Metoda | Endpoint                                                  | Opis                                                        |
| ------ | --------------------------------------------------------- | ----------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statystyki + stronicowane wpisy                             |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Filtrowana lista (`limit` ograniczony do `[1, 200]`)        |
| DELETE | `/api/cache/reasoning`                                    | Wyczyść wszystko (pamięć + DB) i zresetuj liczniki hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Wyczyść tylko wpisy jednego providera                       |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Usuń pojedynczy wpis                                        |

**Kształt odpowiedzi GET:**

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

- **Cleanup:** `cleanupReasoningCache()` usuwa wygasłe wpisy z pamięci i uruchamia `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Workery health-check wywołują to okresowo.
- **Odzyskanie po awarii:** Po restarcie pamięć jest pusta, ale DB nadal trzyma niewygasłe wpisy. Pierwszy lookup dla danego `tool_call_id` to traf DB; kolejne lookupy to trafy pamięci.
- **Brak reasoning, brak cache:** `cacheReasoningFromAssistantMessage` zwraca `0`, gdy wiadomość asystenta nie ma pola `reasoning_content` / `reasoning`, więc odpowiedzi non-thinking nic nie kosztują.
- **Zapis również jest warunkowy:** oba miejsca wywołania w `chatCore.ts` (bez strumieniowania i ze strumieniowaniem) wywołują `cacheReasoningFromAssistantMessage()` tylko wtedy, gdy `requiresReasoningReplay(provider, model)` ma wartość `true` — jest to ten sam predykat, który sprawdzany jest przy odczycie. Instalacje, które nigdy nie korzystają z providera wymagającego odtwarzania rozumowania, przestają ponosić koszt zapisu, aktualizacji indeksu i try/catch przy każdej odpowiedzi zawierającej rozumowanie.
- **Nierygorystyczni providerzy:** Gdy `requiresReasoningReplay` jest `false`, a format docelowy to OpenAI, translator **usuwa** każde pole `reasoning_content` z wychodzących wiadomości — OpenAI Chat Completions go nie akceptuje.

## Własność nieprzezroczystego rozumowania Muse

Muse (`muse-code`) zwraca nieprzezroczyste rozumowanie przypisane do wywołującego (`encrypted_content`). Jego odtworzenie na innym koncie lub z ponownie wydanymi danymi uwierzytelniającymi kończy się błędem upstream, dlatego natywne żądania OAuth korzystają z własności na poziomie sesji zamiast rotacji przy każdym żądaniu (`src/sse/services/museSessionOwnership.ts`, egzekwowane w `src/sse/handlers/chat.ts`). Jawnie wybrane połączenia z kluczem API i konfiguracje wyłącznie z kluczami API zachowują dotychczasowy routing bez tego trybu własności.

- W każdej turze podawaj stabilny identyfikator sesji: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` albo `x-codex-session-id`; ewentualnie użyj w treści `prompt_cache_key`, `session_id`, `conversation_id` albo `metadata.session_id` (w tej kolejności pierwszeństwa). Brakujące lub puste identyfikatory zwracają 400, gdy aktywne są co najmniej dwa natywne konta OAuth; przy jednym koncie OAuth nie ma na co rotować, więc takie żądanie zachowuje routing bez przypięcia. Zakres obejmuje identyfikator klucza API OmniRoute wywołującego.
- Nowe niezależne sesje są rozdzielane cyklicznie między aktywne natywne konta OAuth dozwolone przez politykę połączeń klucza API, uporządkowane według identyfikatora połączenia. Wybór cykliczny pomija konta w okresie oczekiwania połączenia, ze stanem ostatecznym (`banned`, `expired`, `credits_exhausted`) albo z blokadą żądanego modelu; niepowodzenia upstream Muse zapisują okres oczekiwania i stan bezpiecznika jak u pozostałych dostawców. Jawnie wymuszone połączenie omija wybór cykliczny dla nowej sesji, ale nie może nadpisać właściciela po obsłużeniu przez niego udanej odpowiedzi.
- Dopóki właściciel nie obsłuży udanej odpowiedzi, sesja, której właściciel stał się niedostępny, jest ponownie przypisywana sprawnemu kontu. Po pierwszej udanej odpowiedzi sesja pozostaje przypięta do tego właściciela, aż będzie bezczynna przez 30 dni (`MUSE_SESSION_IDLE_TTL_MS`).
- Każda kontynuacja i tura z wynikiem narzędzia pozostaje przypięta do właściciela sesji: połączenia, tożsamości konta i generacji danych uwierzytelniających inferencji, sprawdzanych ponownie przed próbami upstream, w tym powtórzeniami po odświeżeniu danych. Identyfikatory wywołań i odwołania do elementów Responses oraz identyfikatory wywołań narzędzi Chat Completions muszą być zapisane dla tej sesji i generacji.
- Rekordy SQLite `key_value` w przestrzeni nazw `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) utrwalają własność i kursor rotacji między restartami. Każde przejęcie i obsłużona odpowiedź odświeża znacznik aktywności sesji; sesja bezczynna dłużej niż `MUSE_SESSION_IDLE_TTL_MS` jest usuwana (przypięcie właściciela, flaga obsłużenia i zapisane skróty nieprzezroczystej treści/odwołań), najwyżej raz na 10 minut i w ograniczonych partiach, więc późniejsze odtworzenie historii jest bezpiecznie odrzucane jako nieznany właściciel. Rekordy zawierają identyfikatory połączeń i skróty tożsamości konta, danych uwierzytelniających, nieprzezroczystej treści i odwołań kontynuacji, a nie sekrety czy historię rozmowy. Klienci muszą zachowywać i wysyłać pełną historię oraz nieprzezroczyste rozumowanie.
- Nieznane lub cudze nieprzezroczyste rozumowanie, brak właściciela, niedostępne konto właściciela lub zmiana generacji przy zapisanej historii powodują bezpieczne odrzucenie z jawnym 4xx/503 — nigdy ciche przełączenie na inne konto ani pominięcie rozumowania.
- Ponownie wydany klucz tego samego konta jest przyjmowany tylko wtedy, gdy sesja nie zapisała historii możliwej do odtworzenia; zapisane sesje nadal są bezpiecznie odrzucane, dopóki nie zostaną rozpoczęte od nowa.
- Pusta odpowiedź upstream (`upstream_empty_response` / `empty_response`, nic nie wysłano do wywołującego) jest ponawiana najwyżej dwukrotnie u tego samego właściciela, po 0.5 s, a następnie 1.5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Jeśli wszystkie próby są puste, zwracany jest oryginalny 502 bez oznaczania okresu oczekiwania lub bezpiecznika, więc niestabilna odpowiedź nigdy nie blokuje właściciela.
- Wszystkie żądania `muse-code` pomijają odczyty i zapisy semantycznej pamięci podręcznej, w tym zapisy strumieniowe, aby zapisany nieprzezroczysty wynik nie mógł trafić do innego właściciela sesji.

Zabezpieczenia regresji: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` oraz `tests/unit/chatcore-semantic-cache.test.ts`.

## Zobacz też

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — circuit breakery, cooldowny, lockouty modeli
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — diagnozowanie upstream 400
- Źródło: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migracja: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Trasa API: `src/app/api/cache/reasoning/route.ts`
- Oryginalne issue: #1628
