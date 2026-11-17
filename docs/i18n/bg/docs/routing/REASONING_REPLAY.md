# REASONING_REPLAY (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Източник на истината:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Последна актуализация:** 2026-06-28 — v3.8.40

OmniRoute улавя асистент `reasoning_content` произведен от модели в режим на мислене, и го възпроизвежда прозрачно при многооборотни заявки, когато доставчикът нагоре по веригата го изисква. Това елиминира грешките HTTP 400, които строгите доставчици повдигат, когато в хронологията на разговорите на клиент липсва аргументацията на предишния ред.

## Защо това съществува

Няколко доставчици на режим на мислене отхвърлят последващ завой, освен ако** предишното асистентско съобщение включва оригиналния `reasoning_content`** . Възходящият поток връща 400 със съобщения като:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Но типичните клиенти (Cursor, Cline, Roo Code, OpenAI SDK) премахват `reasoning_content` от историята, която възпроизвеждат. OmniRoute го възстановява от кеш от страна на сървъра, така че заявката, която възходящият поток вижда, е последователна. Издание #1628 въведе хибридната постоянство memory/SQLite така че кешът оцелява след рестартиране на процеси.

## Архитектура

```
Turn N (assistant generates):
  → response contains reasoning_content + tool_calls
  → if requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      writes (memory + DB), one entry per tool_call.id within the request scope
  → forward response to client (which may or may not retain reasoning)

Turn N+1 (client sends follow-up):
  → translator detects: requiresReasoningReplay(provider, model) === true
  → for each assistant message with tool_calls and no reasoning_content:
      lookupReasoning(buildToolCallCacheKey(scope, toolCalls[0].id)) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (legacy fallback for older DeepSeek)
  → upstream sees consistent history → no 400
```

Заснемането се извършва в `open-sse/handlers/chatCore.ts` (два сайта, на двата сайта за повикване `cacheReasoningFromAssistantMessage` ). Повторното възпроизвеждане се случва в `open-sse/translator/index.ts` след принуда на схема, но преди изпращане.

Записите за извикване на инструмента се съхраняват под `buildToolCallCacheKey()`, обобщение на обхвата на заявката и идентификатора на извикване на инструмента, така че същият идентификатор, използван от друг API ключ или сесия, не избира записа. Обхватът идва от `buildReasoningCacheScope()`: идентификаторът на API ключ плюс сесийният ключ, когато заявката има такъв. Колоната `tool_call_id` и таблото за управление следователно показват това обобщение за тези записи.

Обикновените ходове на асистента (без извикване на инструмент) се въвеждат по различен начин: `buildAssistantMessageCacheKey()` усвоява обхвата на сесията плюс нормализирания препис във формат OpenAI до този ход, тъй като DeepSeek изисква мотивирането на _всеки_ предходен ход, след като `tools` присъства. За цели на Responses-API (например `opencode-go/deepseek-v4-flash`, насочен към `/responses`) тялото нагоре по веригата носи `input`, а не `messages`, така че `translateRequest()` (`open-sse/translator/index.ts`) отчита основния транскрипт, който е усвоил чрез опция за обратно извикване, а сайтовете за улавяне усвояват същия транскрипт. Пропускът за повторно възпроизвеждане на отговорите се изпълнява на OpenAI пивота за всеки изходен формат, така че клиентите на Anthropic съобщения (Claude → OpenAI → отговори) също се възпроизвеждат.

## Съхранение — хибридна памет + SQLite

Горещият път използва `Map` в паметта (LRU-by-creation), подкрепена от SQLite таблица за възстановяване при срив и видимост на таблото.

| Слой  | Внедряване                                    | Цел                                               |
| ----- | --------------------------------------------- | ------------------------------------------------- |
| памет | `Map` в `open-sse/services/reasoningCache.ts` | Бързо търсене, изгонва най-стария на 200          |
| DB    | `reasoning_cache` таблица (`src/lib/db/`)     | Продължава при рестартирания, поддържа статистика |

Записите отиват и на двете. Четенията първо се консултират с паметта, след което се връщат към DB (попаденията DB се връщат обратно в паметта). DB грешките не са фатални — кешът в паметта продължава да обслужва горещия път.

**По подразбиране:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Максимални записи в паметта: `200` (`MAX_MEMORY_ENTRIES`)
- Изгонване: първо най-старият `createdAt`

## Схема на база данни

Миграция: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

Индекси: `expires_at`, `provider`, `model`, `created_at`. `expires_at` се съхранява като Unix епоха секунди; слоят SELECT нормализира наследените текстови стойности чрез `EXPIRES_AT_EPOCH_SQL`.

## Откриване на доставчик/модел

Повторното възпроизвеждане е активирано, когато `requiresReasoningReplay(provider, model)` върне `true`. Функцията проверява два списъка в `open-sse/services/reasoningCache.ts`.

**Доставчик IDs (точно съвпадение, без значение от главни и малки букви):**

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

**Модели на регулярни изрази (нечувствителни към регистъра на буквите):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` и `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, незадължителен `-free` суфикс)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Добавянето на нова стриктна provider/model означава добавяне към един от тези списъци и писане на единичен тест, удостоверяващ инжектиране на повторение. Описанието на PR трябва да цитира точния низ 400 нагоре по веригата, който мотивира промяната.

## REST API

Кешът излага две крайни точки под `src/app/api/cache/reasoning/route.ts`. И двете изискват удостоверяване на управлението (`isAuthenticated` от `@/shared/utils/apiAuth`).

| Метод  | Крайна точка                                              | Описание                                                |
| ------ | --------------------------------------------------------- | ------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Stats + пагинирани записи                               |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Филтриран списък (`limit` прикрепен към `[1, 200]`)     |
| DELETE | `/api/cache/reasoning`                                    | Изчистете всичко (памет + DB) и нулирайте hit/miss броя |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Изчистване само на записи за един доставчик             |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Изтриване на един запис                                 |

**GET форма на отговор:**

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

## Оперативни бележки

- **Почистване:** `cleanupReasoningCache()` изчиства изтеклите записи в паметта и изпълнява `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Работниците по здравни прегледи се обаждат периодично.
- **Възстановяване при срив:** След рестартиране паметта е празна, но DB все още съдържа неизтекли записи. Първото търсене за даден `tool_call_id` е DB попадение; последващите търсения са попадения в паметта.
- **Без разсъждения, без кеш:** `cacheReasoningFromAssistantMessage` връща `0` когато асистентското съобщение няма `reasoning_content` / `reasoning` поле, така че немислещите отговори не струват нищо.
- **Писането също е затворено:** и двата сайта за повикване в `chatCore.ts` (без стрийминг и стрийминг) извикват само `cacheReasoningFromAssistantMessage()` когато `requiresReasoningReplay(provider, model)` е `true` — същият предикат проверява страната за четене. Инсталациите, които никога не докосват доставчик на повторение, спират да плащат за записа, актуализацията на индекса и try/catch при всеки отговор, носещ аргументи.
- **Нестроги доставчици:** Когато `requiresReasoningReplay` е `false` и целевият формат е OpenAI, преводачът** ленти** всяко `reasoning_content` поле от изходящи съобщения — OpenAI Chat Completions не го приема.

## Собственост на Muse Opaque-Reasoning

Muse (`muse-code`) връща обвързано с повикващия непрозрачно разсъждение (`encrypted_content`). Повторното му възпроизвеждане под различен акаунт или повторно копиране на идентификационни данни е неуспешно нагоре, така че естествените OAuth заявки използват собственост на ниво сесия вместо ротация на заявка (`src/sse/services/museSessionOwnership.ts`, наложено в `src/sse/handlers/chat.ts`). Изрично избрани връзки с API ключ и конфигурации само с API ключ запазват съществуващото си маршрутизиране без този режим на собственост.

- Осигурете стабилна сесия ID на всеки ход: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` или `x-codex-session-id`; алтернативно използвайте `prompt_cache_key`, `session_id`, `conversation_id` или `metadata.session_id` в тялото (в този ред на приоритет). Липсващ или празен IDs връща 400, когато два или повече родни OAuth акаунта са активни; с един акаунт OAuth няма какво да се върти, така че такава заявка поддържа незакрепено маршрутизиране. Обхватът включва OmniRoute API-ключ ID на повикващия.
- Свежи независими сесии кръгово през активни нативни OAuth акаунти, разрешени от правилата за свързване на API ключ, подредени по връзка ID. Кръговият режим пропуска акаунти в изчакване на връзката, със статус на терминал (`banned`, `expired`, `credits_exhausted`) или заключен модел за искания модел; Отказите на Muse нагоре по веригата записват охлаждане и състояние на прекъсвача като други доставчици. Изрично принудителното свързване заобикаля кръговия режим за нова сесия, но не може да замени съществуващ собственик.
- Докато собственикът не даде успешен отговор, сесия, чийто собственик е станал недостъпен, се изисква отново в здрав акаунт. След първия успешен отговор, сесията остава прикачена към този собственик, докато не е неактивна в продължение на 30 дни (`MUSE_SESSION_IDLE_TTL_MS`).
- Всяко завъртане на продължение и резултат от инструмента остава фиксирано към собственика на сесията: връзка, идентичност на акаунта и генериране на идентификационни данни за извод, проверени отново преди опити нагоре по веригата, включително повторни опити за опресняване на идентификационни данни. Отговорите извикват IDs/item препратки и извикване на инструмента за завършване на чат IDs трябва да са били записани за тази сесия и генериране.
- SQLite `key_value` записите в пространството от имена `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) продължават да притежават и курсорът за завъртане се рестартира. Всеки иск и обслужен отговор опреснява клеймото за активност на сесията; сесия, неактивна по-дълго от `MUSE_SESSION_IDLE_TTL_MS` се съкращава (пин на собственика, обслужван флаг и записани opaque/reference хешове), най-много веднъж на всеки 10 минути и в ограничени партиди, така че по-късно повторение на нейната история не се затваря като неизвестен собственик. Записите съдържат IDs връзка и хешове на самоличността на акаунта, идентификационни данни, непрозрачно съдържание и препратки към продължение, а не тайни или история на разговори. Клиентите трябва да запазят и изпратят пълната си история и непрозрачни мотиви.
- Неизвестно или чуждо непрозрачно разсъждение, липсващ собственик, недостъпен акаунт на собственик или промяна на поколението със записана история не е успешно затворено с изрично 4xx/503 — никога безшумно пренасочване при срив на акаунт и никога не изпускано разсъждение.
- Повторен ключ за същия акаунт се приема само когато сесията не е записала хронология за повторно възпроизвеждане; записаните сесии остават неуспешно затворени, докато не започнат наново.
- Празен възходящ отговор (`upstream_empty_response` / `empty_response`, нищо не се излъчва към повикващия) се опитва най-много два пъти на същия собственик, след 0,5 s и след това 1,5 s (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Ако всички опити са празни, оригиналният 502 се връща без охлаждане или маркировка за прекъсвач, така че нестабилният отговор никога не заключва собственика.
- Всички `muse-code` заявки заобикалят семантичния кеш за четене и запис, включително поточно записване, така че кешираният непрозрачен изход не може да придобие различен собственик на сесия.

Регресионни предпазители: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` и `tests/unit/chatcore-semantic-cache.test.ts`.

## Вижте също

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — прекъсвачи, охлаждане, блокировки на модели
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — диагностика нагоре по веригата 400s
- Източник: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Миграция: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API маршрут: `src/app/api/cache/reasoning/route.ts`
- Оригинален брой: #1628
