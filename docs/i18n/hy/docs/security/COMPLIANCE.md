# Compliance & Audit (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Ճշմարտության աղբյուրը.** `src/lib/compliance/`, `src/app/api/compliance/`

OmniRoute գրանցում է վարչական գործողություններ, նույնականացման իրադարձություններ, մատակարարի հավատարմագրերի կյանքի ցիկլի փոփոխությունները և MCP գործիքի կանչերը SQLite-ով ապահովված աուդիտի աղյուսակներում: Այս էջն ընդգրկում է, թե ինչն է գրանցվում, որտեղ է այն ապրում, որքան ժամանակ է այն պահպանվում, ինչպես կարող են API ստեղները հրաժարվել և ինչպես հարցումներ կատարել տվյալները:

Իրականացումը գործում է `src/lib/compliance/index.ts` ում (T-43 — «Համապատասխանության վերահսկում») և `src/lib/compliance/providerAudit.ts`: Աուդիտը գրում է, երբեք չի նետում. ցանկացած ձախողման դեպքում զանգը լուռ կուլ է տրվում, ուստի աուդիտի գրանցումը չի կարող խախտել հիմնական հարցումների հոսքը:

## Ինչն է գրանցվում

### Վարչական աուդիտի իրադարձություններ (`audit_log`)

`logAuditEvent({ action, actor, target, details, ... })`-ի յուրաքանչյուր կանչ
ստեղծում է մեկ տող։ Գործողությունների տողերը հետևում են `domain.verb` (կամ
`domain.verb.outcome`) ձևաչափին։ Ծառայում ներառված և հաստատված գործողությունների
տեսակները ներառում են՝

| Action                               | Source                                   |
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

Յուրաքանչյուր գրառում ներառում է `action`, `actor` (կանխադրված արժեքը՝
`"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`,
`status`, `request_id` և `timestamp`։ Զգայուն բանալիները (`apiKey`, `accessToken`,
`refreshToken`, `password`, ինչպես նաև `*token`/`*secret`/`*apikey` ձևաչափին
համապատասխանող ցանկացած բանալի և այլն) տողը գրելուց առաջ ռեկուրսիվորեն
փոխարինվում են `"[redacted]"` արժեքով։

`api_key.auth.touch` տողերում գրանցվում են API բանալու հաջողված մետատվյալների և
հայտնաբերման ընթերցումները (GET/HEAD), որոնք երբեք չեն հասնում հարցումների
գրանցամատյան՝ որ բանալին, երբ և նորմալացված ուղին։ Դրանք միավորվում են և
սահմանափակվում առավելագույնը 1,000 տողով։ `noLog` ունեցող բանալիները և
միջավայրի բանալին բաց են թողնվում։ Կանչողի IP հասցեն և user-agent-ը ավելացվում են
միայն այն դեպքում, երբ `API_KEY_AUDIT_CLIENT_DETAILS_ENABLED` ֆունկցիայի դրոշակը
միացված է (կանխադրված՝ անջատված)։

### MCP գործիքի կանչեր (`mcp_tool_audit`)

MCP գործիքի յուրաքանչյուր կանչ տող է գրում `open-sse/mcp-server/audit.ts`-ի
միջոցով։ Սխեման (ըստ
`src/lib/db/migrations/002_mcp_a2a_tables.sql`-ի)՝

| Column           | Notes                                         |
| ---------------- | --------------------------------------------- |
| `id`             | ավտոմատ ավելացում                             |
| `tool_name`      | MCP գործիքի նույնացուցիչ                      |
| `input_hash`     | մուտքի sha256-ը (բովանդակությունը չի պահվում) |
| `output_summary` | կարճ, կրճատված ամփոփում                       |
| `duration_ms`    | անցած ժամանակը                                |
| `api_key_id`     | կանչողը (կարող է լինել null)                  |
| `success`        | `1` / `0`                                     |
| `error_code`     | ձախողման դեպքում վերջնական սխալի կոդը         |
| `created_at`     | ISO ժամանակադրոշմ                             |

### Հարցումների / օգտագործման գրանցամատյաններ

Սրանք գործառնական հեռաչափության տվյալներ են (ոչ խիստ իմաստով վարչական աուդիտ),
սակայն օգտագործում են պահպանման նույն խողովակաշարը։

- `usage_history` — յուրաքանչյուր հարցման օգտագործման ամփոփ տվյալներ
- `call_logs` — յուրաքանչյուր հարցման ամբողջական գրանցամատյան (ենթակա է տողերի քանակի սահմանափակման, տես ստորև)
- `proxy_logs` — պրոքսիի երթևեկության գրանցամատյան (ենթակա է տողերի քանակի սահմանափակման)
- `request_detail_logs` — հարցումների հին մանրամասն գրանցամատյան (առկայության դեպքում դեռ մաքրվում է)

## Պահեստավորման սխեմա

`audit_log`-ը առաջին օգտագործման ժամանակ ստեղծվում է ըստ անհրաժեշտության՝ `ensureAuditLogSchema()`-ի միջոցով.

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

Ինդեքսներ են ստեղծվում `timestamp`, `action`, `actor`, `resource_type`,
`status` և `request_id` սյունակների համար։ Ժառանգված տվյալների բազաներում բացակայող սյունակներն ըստ
անհրաժեշտության ավելացվում են `ALTER TABLE`-ի միջոցով։

## Պահպանման ժամկետ և մաքրում

Պահպանման երկու առանձին ժամանակահատված է կիրառվում.

| Միջավայրի փոփոխական         | Լռելյայն | Կիրառվում է                                                       |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | `call_logs`-ի տողերի քանակի սահմանափակում                         |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | `proxy_logs`-ի տողերի քանակի սահմանափակում                        |

`cleanupExpiredLogs()`-ը կատարում է պահպանման ժամկետի ստուգումն ու մաքրումը։ Այն կանչվում է սերվերի մեկնարկի ժամանակ՝
`src/instrumentation-node.ts`-ից։ Յուրաքանչյուր գործարկում գրանցում է
`compliance.cleanup` աուդիտային իրադարձություն՝ ըստ աղյուսակի ջնջված տողերի քանակով։ Proxy/call
մատյանների կրճատումը կատարվում է խմբաքանակներով (`BATCH_SIZE = 5000`)՝ գրանցման երկարատև արգելափակումներից խուսափելու համար։

Հարցումների պատմության ձեռքով մաքրումը պահպանման ժամկետով մաքրումից առանձին է։ Request Logs
էջը կանչում է `POST /api/settings/purge-request-history`, որը ջնջում է `call_logs`,
ժառանգված `request_detail_logs`-ը և հարցումների տեղային արտեֆակտները
`${DATA_DIR}/call_logs/` հասցեից։

Լռելյայն արժեքները սահմանված են `src/lib/logEnv.ts`-ում
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`)։

## `noLog` Հեռացում (ըստ API ստեղնի)

API ստեղները կարող են դրոշակվել, որպեսզի դրանց ներքևի զանգերի տրաֆիկը չգրանցվի: Դրոշը ապրում է `api_keys` սեղանի վրա (`no_log INTEGER DEFAULT 0`) և արտացոլվում է հիշողության մեջ՝ թեժ ճանապարհով որոնումների համար:

```bash
# Create a no-log key (management auth required)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Օգնականներ (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — միացնել հիշողության մուտքը
- `isNoLog(apiKeyId)` — ստուգվել է հարցման ուղու վրա; վերադառնում է `api_keys.no_log` ից 30 վ քեշավորված ընթերցմանը
- `NO_LOG_API_KEY_IDS` (env, ստորակետերով բաժանված) — նախապես ներբեռնված հիշողության մեջ բեռնախցիկի վրա; օգտակար է, երբ դուք չեք կարող ուղղակիորեն փոխարկել սյունակը

Վարչական աուդիտի իրադարձությունները (մուտք, մատակարարի փոփոխություններ, MCP գործիքների զանգեր և այլն) են** ոչ** `noLog` — ի վրա ազդում է միայն յուրաքանչյուր հարցման երթևեկության գրանցումը:

### Մեկ խնդրանքով հրաժարվել (`x-omniroute-no-log`)

Հաճախորդը կարող է ընտրել մեկ եզրակացության հարցում՝ առանց ծանրաբեռնվածության կայունության, առանց հատուկ բանալի ստեղծելու: Ուղարկեք `x-omniroute-no-log: true` հարցումով (`1` և `yes` նույնպես ընդունված են, մեծատառերի համար զգայուն չեն): Այն կիրառվում է զրույցի ընտանիքի յուրաքանչյուր երթուղու համար, որն անցնում է զրույցի մշակողի միջոցով. Զանգերի գրանցամատյանի տողը դեռ գրված է իր ժամանակի դրոշմակնիքով, մոդելի, մատակարարի, կարգավիճակի, տևողության և նշանների քանակով, սակայն `request_body`, `response_body`, հարցումների ամփոփագրերը և խողովակաշարի արտեֆակտները բաց են թողնվել:

Վերնագիրն ORed է բանալու դրոշակով. no-log ստեղնը մնում է no-log՝ անկախ վերնագրից, և վերնագիրը չի կարող կրկին ակտիվացնել գրանցամատյան առանց գրանցման ստեղնի համար: Վերնագիրը հանվում է նախքան հարցումը հոսանքին հակառակ փոխանցելը:

Այս վերնագիրը կատարում է** ոչ** անջատել Հիշողության արդյունահանումը կամ իմաստային քեշը: Ուղարկեք `x-omniroute-no-memory: true` և `x-omniroute-no-cache: true` դրա կողքին, երբ հարցումը չպետք է պահպանի բովանդակությունը նաև այդ ենթահամակարգերում:

## REST API

| Վերջնակետ                   | Մեթոդ | Նկարագրություն                                         | Նույնականացում |
| --------------------------- | ----- | ------------------------------------------------------ | -------------- |
| `/api/compliance/audit-log` | `GET` | Էջավորված ադմինիստրատորի աուդիտի գրառումներ՝ զտիչներով | management     |
| `/api/mcp/audit`            | `GET` | Էջավորված MCP գործիքների աուդիտի գրառումներ            | (open-sse)     |
| `/api/mcp/audit/stats`      | `GET` | MCP աուդիտի համախմբված վիճակագրություն                 | (open-sse)     |

Այս պահին CSV արտահանման վերջնակետ չի տրամադրվում․ արտահանեք կառավարման վահանակից կամ ուղղակիորեն հարցում կատարեք
SQLite տվյալների բազային։

### Հարցումներ `/api/compliance/audit-log`-ին

Աջակցվող հարցման պարամետրերը (բոլորն ընտրովի են, իսկ տեքստային զտիչների համար բոլորն օգտագործում են
`LIKE %value%` համընկնումը)․

- `action`, `actor`, `target`, `resourceType` (կամ `resource_type`),
  `status`, `requestId` (կամ `request_id`)
- `from` / `since`, `to` / `until` — ISO ժամանակային դրոշմներ
- `limit` (լռելյայն՝ `50`, նվազագույնը՝ `1`, առավելագույնը՝ `500`)
- `offset` (լռելյայն՝ `0`, առավելագույնը՝ `10_000`)

Պատասխանը JSON զանգված է։ Էջավորման մետատվյալները վերադարձվում են վերնագրերում՝
`x-total-count`, `x-page-limit`, `x-page-offset`։

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Կառավարման վահանակ

Կառավարման վահանակը աուդիտի տվյալները հասանելի է դարձնում **`/dashboard/audit`** հասցեում
(`src/app/(dashboard)/dashboard/audit/page.tsx`)։ Էջն ունի երկու ներդիր․

- **Համապատասխանություն** (`ComplianceTab.tsx`) — ադմինիստրատորի աուդիտի իրադարձություններ՝
  `/api/compliance/audit-log`-ից։ Զտում է ըստ իրադարձության տեսակի, կարևորության աստիճանի (տեղեկատվական / նախազգուշացում
  / կրիտիկական, որոնք ածանցվում են գործողությունից և կարգավիճակից) և ամսաթվերի միջակայքի։ Կարևորության աստիճանը
  հաշվարկվում է հաճախորդի կողմում՝ գործողության և կարգավիճակի տողերից։
- **MCP** (`McpAuditTab.tsx`) — MCP գործիքների աուդիտ՝ `/api/mcp/audit`-ից՝
  գործիքի անվան և հաջողության/ձախողման զտիչներով։

Երկու ներդիրներն էլ էջավորում են՝ համապատասխանաբար `50` (համապատասխանություն) և `25` (MCP)
գրառում մեկ էջում։

## Մատակարարի հավատարմագրերի օժանդակ գործառույթներ

`src/lib/compliance/providerAudit.ts`-ը տրամադրում է տվյալների ձևավորման օժանդակ գործառույթներ, որոնք օգտագործվում են
մատակարարների կառավարման երթուղիների կողմից՝ հավատարմագրերի իրադարձություններ գրանցելիս․

- `summarizeProviderConnectionForAudit(connection)` — հեռացնում է `apiKey`,
  `accessToken`, `refreshToken`, `idToken` և
  `providerSpecificData.consoleApiKey` դաշտերը, նախքան կապի պատկերը
  `details`-ում գրելը։
- `getProviderAuditTarget(connection)` — `target` դաշտի համար կազմում է կայուն
  `"<provider>:<name|id>"` տող։
- `extractProviderWarnings(...payloads)` — մատակարարների պատասխաններում որոնում է
  քաղաքականության/անվտանգության նախազգուշացումներ (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) և
  վերադարձնում է մինչև 5 համընկնում՝ յուրաքանչյուրը կրճատելով մինչև 400 նիշ։

## Լավագույն գործելակերպեր

- PII (իրավական, բժշկական և այլն) մշակող API բանալիները նշեք `noLog: true`-ով։
- Կարգավորեք `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` արժեքները՝ ձեր
  պահպանման քաղաքականությանը համապատասխան։ Լռելյայն 7-օրյա արժեքները պահպանողական են։
- Աուդիտի աղյուսակը հարթակից դուրս արտահանեք (`sqlite3 dump`) այն հաճախականությամբ,
  որը պահանջում է ձեր համապատասխանության ծրագիրը․ ներկառուցված արխիվացում չկա։
- Հետևեք `auth.login.failed` և `auth.login.locked` դեպքերի քանակին՝ կոպիտ ուժով
  հարձակումները հայտնաբերելու համար։
- Նոր ադմինիստրատորական վերջնակետեր ավելացնելիս կանչեք `logAuditEvent({ ... })`-ը՝ կայուն
  `domain.verb.outcome` գործողության տողով, և փոխանցեք հարցման համատեքստը
  `getAuditRequestContext(request)`-ի միջոցով, որպեսզի IP-ն ու `requestId`-ն
  ինքնաբերաբար գրանցվեն։

## Տես նաև

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — անձնական նույնականացնող տվյալների (PII) քողարկում, հրահանգների ներարկում
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP գործիքների կատալոգ և հասանելիության շրջանակներ
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — միջավայրի փոփոխականների ամբողջական տեղեկատու
- Սկզբնաղբյուր՝ `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
