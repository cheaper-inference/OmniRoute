# Compliance & Audit (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Източник на истината:** `src/lib/compliance/`, `src/app/api/compliance/`

OmniRoute записва административни действия, събития за удостоверяване, промени в жизнения цикъл на идентификационните данни на доставчика и извиквания на инструмента MCP към таблици за одит, поддържани от SQLite. Тази страница обхваща какво се регистрира, къде живее, колко дълго се запазва, как API ключовете могат да се откажат и как да заявите данните.

Внедряването съществува в `src/lib/compliance/index.ts` (T-43 — „Контрол за съответствие“) и `src/lib/compliance/providerAudit.ts`. Одитните записи никога не се изхвърлят: при всяка грешка повикването се поглъща безшумно, така че регистрирането на одит не може да прекъсне основния поток на заявки.

## Какво се регистрира

### Събития от административния одит (`audit_log`)

Всяко извикване на `logAuditEvent({ action, actor, target, details, ... })` създава
един ред. Низовете за действия следват шаблона `domain.verb` (или
`domain.verb.outcome`). Потвърдените типове действия в дървото на изходния код включват:

| Действие                             | Източник                                 |
| ------------------------------------ | ---------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`        |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`        |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`        |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`        |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`        |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`        |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`       |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`         |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`    |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`    |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`         |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`       |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts`  |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`            |
| `api_key.auth.touch`                 | `src/server/authz/policies/clientApi.ts` |

Всеки запис съдържа `action`, `actor` (по подразбиране `"system"`), `target`,
`details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id` и `timestamp`. Чувствителните ключове (`apiKey`, `accessToken`,
`refreshToken`, `password`, всичко, което съвпада с `*token`/`*secret`/`*apikey`,
и т.н.) се редактират рекурсивно до `"[redacted]"`, преди редът да бъде записан.

Редовете за `api_key.auth.touch` регистрират успешни четения на метаданни и
откриване на API ключове (GET/HEAD), които никога не достигат до дневника на
заявките: кой ключ, кога и нормализираният път; записите се обединяват и са
ограничени до 1 000 реда. Ключовете с `noLog` и ключът на средата се пропускат.
IP адресът и user-agent-ът на извикващия се добавят само когато функционалният
флаг `API_KEY_AUDIT_CLIENT_DETAILS_ENABLED` е включен (по подразбиране е
изключен).

### Извиквания на MCP инструменти (`mcp_tool_audit`)

Всяко извикване на MCP инструмент записва ред чрез
`open-sse/mcp-server/audit.ts`. Схема (от
`src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Колона           | Бележки                                           |
| ---------------- | ------------------------------------------------- |
| `id`             | автоматично увеличаване                           |
| `tool_name`      | идентификатор на MCP инструмента                  |
| `input_hash`     | sha256 на входа (полезният товар не се съхранява) |
| `output_summary` | кратко, съкратено обобщение                       |
| `duration_ms`    | изминало време                                    |
| `api_key_id`     | извикващ (може да е null)                         |
| `success`        | `1` / `0`                                         |
| `error_code`     | краен код на грешката при неуспех                 |
| `created_at`     | времеви печат в ISO формат                        |

### Дневници на заявките / използването

Това са оперативни телеметрични данни (не са строго административен одит), но
използват същия процес за съхранение:

- `usage_history` — обобщение на използването за всяка заявка
- `call_logs` — пълен дневник за всяка заявка (подлежи на ограничение на броя редове, вижте по-долу)
- `proxy_logs` — дневник на прокси трафика (подлежи на ограничение на броя редове)
- `request_detail_logs` — наследен подробен дневник на заявките (все още се изчистват, ако съществуват)

## Схема за съхранение

`audit_log` се създава отложено от `ensureAuditLogSchema()` при първата употреба:

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

Създават се индекси върху `timestamp`, `action`, `actor`, `resource_type`,
`status` и `request_id`. Липсващите колони в наследени бази данни се добавят
при необходимост чрез `ALTER TABLE`.

## Съхранение и почистване

Поддържат се два отделни периода за съхранение:

| Променлива на средата       | По подразбиране | Прилага се за                                                     |
| --------------------------- | --------------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`             | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`             | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`        | Ограничаване на броя редове в `call_logs`                         |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`        | Ограничаване на броя редове в `proxy_logs`                        |

`cleanupExpiredLogs()` изпълнява процеса по прилагане на периодите за
съхранение. Той се извиква при стартиране на сървъра от
`src/instrumentation-node.ts`. Всяко изпълнение записва одитно събитие
`compliance.cleanup` с броя на изтритите записи за всяка таблица. Съкращаването
на журналите за прокси сървъра и извикванията се извършва на партиди
(`BATCH_SIZE = 5000`), за да се избегнат продължителни заключвания при запис.

Ръчното почистване на хронологията на заявките е отделно от процеса за
съхранение. Страницата „Журнали на заявките“ извиква
`POST /api/settings/purge-request-history`, което изтрива `call_logs`,
наследените `request_detail_logs` и локалните артефакти на заявките в
`${DATA_DIR}/call_logs/`.

Стойностите по подразбиране са дефинирани в `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` Opt-Out (на API ключ)

API ключовете могат да бъдат маркирани, така че техният трафик на повикване надолу по веригата да не се регистрира. Флагът живее в таблицата `api_keys` (`no_log INTEGER DEFAULT 0`) и се отразява в набор в паметта за търсене по горещи пътища.

```bash
# Create a no-log key (management auth required)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Помощници (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — превключва записа в паметта
- `isNoLog(apiKeyId)` — е проверено на пътя на заявката; се връща към 30 s кеширано четене от `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (env, разделени със запетая) — предварително зареден в набора в паметта при зареждане; полезно, когато не можете да превключвате колоната директно

Събитията за административен одит (влизане, промени в доставчика, извиквания на инструмента MCP и др.) са** не** засегнати от `noLog` — само регистриране на трафик на заявка е изключено.

### Отказ на заявка (`x-omniroute-no-log`)

Клиентът може да избере една заявка за извод от постоянството на полезния товар, без да създава специален ключ. Изпратете `x-omniroute-no-log: true` при заявката (`1` и `yes` също се приемат, без значение от главни и малки букви). Прилага се за всеки маршрут на чат-семейство, който минава през манипулатора на чат: Завършвания на чат, отговори, съобщения, завършвания и съвместимия с Gemini път. Редът с регистъра на повикванията все още се записва със своето клеймо за време, модел, доставчик, състояние, продължителност и брой токени, но `request_body`, `response_body`, обобщенията на заявките и артефактите на конвейера са пропуснати.

Заглавката е ORed с ключов флаг: ключ без регистрация остава без регистрация независимо от заглавката и заглавката не може да активира повторно регистриране за ключ без регистрация. Заглавката се премахва, преди заявката да бъде препратена нагоре.

Това заглавие прави** не** деактивирайте извличането на паметта или семантичния кеш. Изпратете `x-omniroute-no-memory: true` и `x-omniroute-no-cache: true` заедно с него, когато заявката не трябва да съдържа съдържание и в тези подсистеми.

## REST API

| Крайна точка                | Метод | Описание                                               | Удостоверяване |
| --------------------------- | ----- | ------------------------------------------------------ | -------------- |
| `/api/compliance/audit-log` | `GET` | Страницирани записи от администраторския одит с филтри | management     |
| `/api/mcp/audit`            | `GET` | Страницирани записи от одита на MCP инструменти        | (open-sse)     |
| `/api/mcp/audit/stats`      | `GET` | Обобщена статистика от MCP одита                       | (open-sse)     |

Понастоящем не се предоставя крайна точка за експортиране в CSV — експортирайте от таблото за управление или изпълнете заявка директно към базата данни SQLite.

### Заявки към `/api/compliance/audit-log`

Поддържани параметри на заявката (всички са незадължителни, а всички текстови филтри използват съпоставяне чрез `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (или `resource_type`),
  `status`, `requestId` (или `request_id`)
- `from` / `since`, `to` / `until` — времеви маркери по ISO
- `limit` (по подразбиране `50`, минимум `1`, максимум `500`)
- `offset` (по подразбиране `0`, максимум `10_000`)

Отговорът е JSON масив. Метаданните за страницирането се връщат в заглавките:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Табло за управление

Таблото за управление показва данните от одита на **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Страницата има два раздела:

- **Съответствие** (`ComplianceTab.tsx`) — събития от администраторския одит от
  `/api/compliance/audit-log`. Филтриране по тип на събитието, сериозност (информационно / предупреждение
  / критично, извлечена от действието + състоянието) и период от време. Сериозността се
  изчислява от клиентската страна въз основа на низовете за действие/състояние.
- **MCP** (`McpAuditTab.tsx`) — одит на MCP инструменти от `/api/mcp/audit` с
  филтриране по име на инструмента и успех/неуспех.

И двата раздела използват странициране с размер на страницата `50` (съответствие) и `25` (MCP).

## Помощни функции за идентификационни данни на доставчици

`src/lib/compliance/providerAudit.ts` предоставя помощни функции за структуриране, използвани от маршрутите за управление на доставчици, когато генерират събития за идентификационни данни:

- `summarizeProviderConnectionForAudit(connection)` — премахва `apiKey`,
  `accessToken`, `refreshToken`, `idToken` и
  `providerSpecificData.consoleApiKey`, преди моментното състояние на връзката да бъде
  записано в `details`.
- `getProviderAuditTarget(connection)` — съставя стабилен низ
  `"<provider>:<name|id>"` за полето `target`.
- `extractProviderWarnings(...payloads)` — сканира отговорите на доставчика за
  предупреждения относно правила/безопасност (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) и
  извежда до 5 съвпадения, всяко съкратено до 400 знака.

## Добри практики

- Маркирайте API ключовете, обработващи лични данни (правни, медицински и др.), с `noLog: true`.
- Настройте `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` така, че да отговарят на вашата
  политика за съхранение. Стойностите по подразбиране от 7 дни са консервативни.
- Експортирайте таблицата за одит извън платформата (`sqlite3 dump`) с честота,
  изисквана от вашата програма за съответствие — няма вградено архивиране.
- Следете броя на `auth.login.failed` и `auth.login.locked` за откриване на
  атаки с изчерпателно търсене.
- Когато добавяте нови администраторски крайни точки, извиквайте `logAuditEvent({ ... })` със стабилен
  низ за действие във формат `domain.verb.outcome` и предавайте контекста на заявката чрез
  `getAuditRequestContext(request)`, така че IP адресът и `requestId` да бъдат регистрирани
  автоматично.

## Вижте също

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — маскиране на лични данни (PII), инжектиране на подкани
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — каталог и обхвати на MCP инструментите
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — пълна справка за променливите на средата
- Изходен код: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
