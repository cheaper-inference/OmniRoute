# REASONING_REPLAY (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Источник истины:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`** Последнее обновление:** 2026-06-28 — v3.8.40

OmniRoute захватывает помощник `reasoning_content` созданный моделями в режиме мышления, и прозрачно воспроизводит его при многоповоротных запросах, когда этого требует вышестоящий поставщик. Это устраняет ошибки HTTP 400, которые возникают строгими поставщиками, когда в истории разговоров клиента отсутствуют обоснования предыдущего хода.

## Почему это существует

Некоторые провайдеры, работающие в режиме мышления, отвергают последующий ход, если только** предыдущее сообщение помощника включает исходный `reasoning_content`** . Восходящий поток возвращает 400 с такими сообщениями, как:

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

Но типичные клиенты (Cursor, Cline, Roo Code, OpenAI SDK) удаляют `reasoning_content` из истории, которую они воспроизводят. OmniRoute восстанавливает его из кэша на стороне сервера, поэтому запрос, который видит восходящий поток, является согласованным. Проблема #1628 представила гибридное сохранение memory/SQLite, поэтому кэш выдерживает перезапуск процесса.

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

Захват происходит в `open-sse/handlers/chatCore.ts` (два сайта, на двух сайтах вызова `cacheReasoningFromAssistantMessage` ). Воспроизведение происходит в `open-sse/translator/index.ts` после приведения схемы, но до отправки.

Записи вызовов инструментов хранятся в `buildToolCallCacheKey()`— дайджесте области запроса и идентификатора вызова инструмента, поэтому тот же идентификатор, который используется другим ключом или сеансом API не выбирает запись. Область действия определяется `buildReasoningCacheScope()`: идентификатор ключа API плюс ключ сеанса, если он есть в запросе. Таким образом, в столбце `tool_call_id` и на информационной панели отображается этот дайджест для этих записей.

Обычные ходы помощника (без вызова инструмента) кодируются по-другому: `buildAssistantMessageCacheKey()` обрабатывает область сеанса плюс нормализованную расшифровку формата OpenAI до этого хода, поскольку DeepSeek требует обоснования _каждого_ предыдущего хода, как только `tools` присутствует. Для целей Responses-API (например, `opencode-go/deepseek-v4-flash`, маршрутизируемых на `/responses`) восходящий текст несет `input`, а не `messages`, поэтому `translateRequest()` (`open-sse/translator/index.ts`) сообщает сводный транскрипт, который он переработал через опцию обратного вызова, и сайты захвата перерабатывают тот же транскрипт. Этап воспроизведения ответов выполняется в сводной таблице OpenAI для каждого исходного формата, поэтому клиенты Anthropic Messages (Claude → OpenAI → Responses) также воспроизводятся.

## Гибридная память — + SQLite

Горячий путь использует `Map` в памяти (LRU-при создании), поддерживаемый таблицей SQLite для восстановления после сбоя и видимости информационной панели.

| Слой   | Выполнение                                    | Цель                                                  |
| ------ | --------------------------------------------- | ----------------------------------------------------- |
| Память | `Map` в `open-sse/services/reasoningCache.ts` | Быстрый поиск, выселение самых старых на уровне 200   |
| DB     | таблица `reasoning_cache` (`src/lib/db/`)     | Сохраняется после перезапуска, увеличивает статистику |

Пишет идет на оба. Чтения сначала обращаются к памяти, а затем возвращаются к DB (обращения DB переносятся обратно в память). Сбои DB не являются фатальными. — кэш в памяти продолжает обслуживать горячий путь.

**По умолчанию:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Максимальное количество записей в памяти: `200` (`MAX_MEMORY_ENTRIES`)
- Выселение: сначала самый старый `createdAt`

## Схема базы данных

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

Индексы: `expires_at`, `provider`, `model`, `created_at`. `expires_at` хранится в секундах эпохи Unix; слой SELECT нормализует устаревшие текстовые значения через `EXPIRES_AT_EPOCH_SQL`.

## Обнаружение поставщика/модели

Воспроизведение включается, когда `requiresReasoningReplay(provider, model)` возвращает `true`. Функция проверяет два списка в `open-sse/services/reasoningCache.ts`.

**Поставщик IDs (точное совпадение, без учета регистра):**

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

**Шаблоны регулярных выражений модели (без учета регистра):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` и `/deepseek[-/]?v4[-.]pro/i` (V4 Flash/Pro, дополнительный суффикс `-free` )
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Добавление нового строгого provider/model означает добавление к одному из этих списков и написание модульного теста, подтверждающего внедрение повтора. В описании PR должна быть указана точная восходящая строка 400, которая послужила причиной изменения.

## REST API

Кэш предоставляет две конечные точки под `src/app/api/cache/reasoning/route.ts`. Оба требуют аутентификации управления (`isAuthenticated` из `@/shared/utils/apiAuth`).

| Метод  | Конечная точка                                            | Описание                                                |
| ------ | --------------------------------------------------------- | ------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Статистика + записи с разбивкой по страницам            |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Отфильтрованный список (`limit` ограничено `[1, 200]`)  |
| DELETE | `/api/cache/reasoning`                                    | Очистите все (память + DB) и сбросьте счетчики hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Очистить только записи для одного провайдера            |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Удалить одну запись                                     |

**Форма ответа GET :**

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

## Операционные примечания

- **Очистка:** `cleanupReasoningCache()` очищает просроченные записи памяти и запускает `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Медицинские работники периодически звонят сюда.
- **Восстановление после сбоя:** После перезапуска память пуста, но DB все еще содержит записи с истекшим сроком действия. Первый поиск данного `tool_call_id` — это попадание DB ; последующие поиски являются попаданиями в память.
- **Никаких рассуждений, никакого кэша:** `cacheReasoningFromAssistantMessage` возвращает `0` когда сообщение помощника не имеет поля `reasoning_content` / `reasoning`, поэтому необдуманные ответы ничего не стоят.
- **Запись также закрыта:** оба сайта вызова в `chatCore.ts` (непотоковая и потоковая передача) вызывают `cacheReasoningFromAssistantMessage()` только тогда, когда `requiresReasoningReplay(provider, model)` равен `true` — один и тот же предикат проверяется на стороне чтения. Установки, которые никогда не затрагивают провайдера воспроизведения, перестают платить за запись, обновление индекса и try/catch при каждом аргументированном ответе.
- **Нестрогие поставщики:** Если `requiresReasoningReplay` — `false`, а целевой формат — OpenAI, переводчик** полоски** любое поле `reasoning_content` из исходящих сообщений. — OpenAI Chat Completions не принимает его.

## Muse Opaque-Рассуждение о собственности

Muse (`muse-code`) возвращает непрозрачные рассуждения, связанные с вызывающим абонентом (`encrypted_content`). Воспроизведение его под другой учетной записью или повторно созданными учетными данными не удается, поэтому собственные запросы OAuth используют владение на уровне сеанса вместо ротации каждого запроса (`src/sse/services/museSessionOwnership.ts`, принудительно реализованное в `src/sse/handlers/chat.ts`). Явно выбранные соединения с ключами API и конфигурации только с ключами API сохраняют существующую маршрутизацию без этого режима владения.

- Предоставляйте стабильный сеанс ID на каждом шагу: `x-omniroute-session-id`, `x-omniroute-session`, `x-session-id` или `x-codex-session-id`; в качестве альтернативы используйте `prompt_cache_key`, `session_id`, `conversation_id` или `metadata.session_id` в теле (в этом порядке приоритета). Отсутствующий или пустой IDs возвращает 400, если активны две или более собственные учетные записи OAuth ; с одной учетной записью OAuth ротировать нечего, поэтому такой запрос сохраняет незакрепленную маршрутизацию. В область действия входит API-ключ OmniRoute вызывающей стороны ID.
- Новые независимые сеансы циклического перебора между активными собственными учетными записями OAuth разрешенными политикой подключения ключа API, упорядоченными по соединению ID. Циклический перебор пропускает учетные записи в период восстановления соединения со статусом терминала (`banned`, `expired`, `credits_exhausted`) или с заблокированной моделью для запрошенной модели; Сбои восходящего потока Muse записывают время восстановления и состояние выключателя, как и другие поставщики. Явно принудительное соединение обходит циклический перебор для нового сеанса, но не может переопределить существующего владельца.
- Пока владелец не предоставит успешный ответ, сеанс, владелец которого стал недоступен, повторно запрашивается на исправную учетную запись. После первого успешного ответа сеанс остается закрепленным за этим владельцем до тех пор, пока он не будет бездействовать в течение 30 дней (`MUSE_SESSION_IDLE_TTL_MS`).
- Каждое продолжение и результат инструмента остаются привязанными к владельцу сеанса: соединение, идентификатор учетной записи и создание учетных данных для вывода проверяются еще раз перед попытками восходящего потока, включая повторные попытки обновления учетных данных. Ответы на вызовы ссылок IDs/item и вызов инструмента завершения чата IDs должны быть записаны для этого сеанса и генерации.
- Записи SQLite `key_value` в пространстве имен `muse_session_ownership` (`src/lib/db/museSessionOwnership.ts`) сохраняют право собственности и курсор вращения при перезапуске. Каждое требование и поданный ответ обновляют отметку активности сеанса; сеанс, простаивающий дольше, чем `MUSE_SESSION_IDLE_TTL_MS` удаляется (пин-код владельца, флаг обслуживания и записанные хэши opaque/reference ) не чаще одного раза в 10 минут и ограниченными пакетами, поэтому более позднее воспроизведение его истории не удается закрыть как неизвестный владелец. Записи содержат IDs соединения и хэши идентификаторов учетной записи, учетных данных, непрозрачного содержимого и ссылок на продолжение, а не секреты или историю разговоров. Клиенты должны сохранять и отправлять свою полную историю и непрозрачные обоснования.
- Неизвестное или внешнее непрозрачное обоснование, отсутствующий владелец, недоступная учетная запись владельца или смена поколения с записанной историей не удается закрыть с явным 4xx/503 — никогда не отключать отработку отказа между учетными записями и никогда не отбрасывать обоснования.
- Повторно созданный ключ той же учетной записи применяется только в том случае, если в сеансе не было записано воспроизводимой истории; записанные сеансы продолжают закрываться до тех пор, пока не начнутся заново.
- Пустой восходящий ответ (`upstream_empty_response` / `empty_response`, вызывающему объекту ничего не передается) повторяется не более двух раз от одного и того же владельца: через 0,5 с, а затем через 1,5 с (`MUSE_EMPTY_RESPONSE_RETRY_DELAYS_MS`). Если все попытки оказываются пустыми, исходный код 502 возвращается без времени восстановления или маркировки прерывателя, поэтому ненадежный ответ никогда не блокирует владельца.
- Все запросы `muse-code` обходят операции чтения и записи семантического кэша, включая потоковую запись, поэтому кэшированные непрозрачные выходные данные не могут получить другого владельца сеанса.

Стражи регрессии: `tests/unit/muse-session-ownership.test.ts`, `tests/unit/muse-session-ownership-retention.test.ts`, `tests/unit/muse-empty-response-retry.test.ts` и `tests/unit/chatcore-semantic-cache.test.ts`.

## См. также

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) автоматические выключатели —, время восстановления, блокировки моделей
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — диагностика восходящих 400-х
- Источник: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Миграция: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Маршрут API : `src/app/api/cache/reasoning/route.ts`
- Исходный выпуск: #1628.
