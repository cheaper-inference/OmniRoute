# Compliance & Audit (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Orisun otitọ:** `src/lib/compliance/`, `src/app/api/compliance/`

OmniRoute ṣe igbasilẹ awọn iṣe iṣakoso, awọn iṣẹlẹ ijẹrisi, awọn ayipada igbesi aye ijẹrisi olupese, ati awọn ẹbẹ ohun elo MCP si awọn tabili iṣayẹwo ti SQLite ṣe atilẹyin. Oju-iwe yii ni wiwa ohun ti n wọle, nibiti o ngbe, bawo ni o ṣe pẹ to, bawo ni awọn bọtini API ṣe le jade, ati bii o ṣe le beere data naa.

Imuse n gbe ni `src/lib/compliance/index.ts` (T-43 — "Awọn iṣakoso Ibamu") ati `src/lib/compliance/providerAudit.ts`. Audit kọwe maṣe jabọ: ni eyikeyi ikuna ipe naa ti gbe ni idakẹjẹ nitorina gedu iṣayẹwo ko le fọ sisan ibeere akọkọ.

## Ohun Tí A Ń Kọ Sílẹ̀

### Àwọn ìṣẹ̀lẹ̀ àyẹ̀wò ìṣàkóso (`audit_log`)

Gbogbo ìpè sí `logAuditEvent({ action, actor, target, details, ... })` máa ń ṣe
ìlà kan. Àwọn ọ̀rọ̀ ìṣe máa ń tẹ̀lé àpẹẹrẹ
`domain.verb` (tàbí `domain.verb.outcome`). Àwọn irú ìṣe tí a ti fìdí rẹ̀
múlẹ̀ nínú kóòdù ni:

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

Àkọsílẹ̀ kọ̀ọ̀kan máa ń gba `action`, `actor` (àìpẹ̀yà sí `"system"`), `target`,
`details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id`, àti `timestamp`. Àwọn kọ́kọ́rọ́ tó ní ìmọ̀lára (`apiKey`, `accessToken`,
`refreshToken`, `password`, ohunkóhun tó bá `*token`/`*secret`/`*apikey`
mu, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ) máa ń ṣe àtúnkọ̀ pẹ̀lú ọ̀nà àtúnkọ̀ àtẹ̀gùn sí
`"[redacted]"` kí a tó kọ ìlà náà sílẹ̀.

Àwọn ìlà `api_key.auth.touch` máa ń ṣe àkọsílẹ̀ àṣeyọrí metadata kọ́kọ́rọ́ API àti àwọn
ìkàwé ìṣàwárí (GET/HEAD) tí kò dé ìwé ìbéèrè: kọ́kọ́rọ́ wo, ìgbà wo, àti ọ̀nà tí a
ṣe ìṣọ̀kan, tí a sì kó jọ tí a sì fi opin sí ìlà 1,000. Àwọn kọ́kọ́rọ́ pẹ̀lú
`noLog` àti kọ́kọ́rọ́ àyíká ni a máa ń fo kọjá. Adirẹsi IP àti aṣojú-olùmúlò ẹni tó
ń pè ni a máa ń fi kún un nìkan nígbà tí asia àfidámọ̀
`API_KEY_AUDIT_CLIENT_DETAILS_ENABLED` bá wà ní titan (ó wà ní pipa ní àkọ́kọ́).

### Àwọn ìpè irinṣẹ MCP (`mcp_tool_audit`)

Gbogbo ìpè irinṣẹ MCP máa ń kọ ìlà kan nípasẹ̀
`open-sse/mcp-server/audit.ts`. Àtòkọ̀ (gẹ́gẹ́ bí ó ti wà nínú
`src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Column           | Notes                                           |
| ---------------- | ----------------------------------------------- |
| `id`             | àfikún aládàáṣe                                 |
| `tool_name`      | ìdánimọ̀ irinṣẹ MCP                              |
| `input_hash`     | sha256 ti àbájáde àkóónú (a kò fi payload pamọ́) |
| `output_summary` | àkótán kúkúrú tí a gé kúrú                      |
| `duration_ms`    | àkókò gidi                                      |
| `api_key_id`     | ẹni tó pè (ó lè jẹ́ asán)                        |
| `success`        | `1` / `0`                                       |
| `error_code`     | kóòdù àṣìṣe ìkẹyìn nígbà ìkùnà                  |
| `created_at`     | àmì àkókò ISO                                   |

### Àwọn àkọsílẹ̀ ìbéèrè / ìlò

Wọ̀nyí jẹ́ telemetry iṣẹ́ (kì í ṣe àyẹ̀wò ìṣàkóso ní ìtumọ̀ kíkún) ṣùgbọ́n wọ́n ń
pín ìlànà ìpamọ́ àkọsílẹ̀ kan náà:

- `usage_history` — àkójọpọ̀ ìlò fún ìbéèrè kọ̀ọ̀kan
- `call_logs` — àkọsílẹ̀ kíkún fún ìbéèrè kọ̀ọ̀kan (ó wà lábẹ́ ìdíwọ́ iye ìlà, wo nísàlẹ̀)
- `proxy_logs` — àkọsílẹ̀ ìrìnàjò proxy (ó wà lábẹ́ ìdíwọ́ iye ìlà)
- `request_detail_logs` — àkọsílẹ̀ ìbéèrè ẹ̀kúnrẹ́rẹ́ àtijọ́ (a ṣì máa ń gé e kúrò bí ó bá wà)

## Ẹ̀dà Ìṣètò Ibi Ìpamọ́

A dá `audit_log` sílẹ̀ nígbà tí a bá kọ́kọ́ nílò rẹ̀ nípasẹ̀ `ensureAuditLogSchema()`:

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

A dá àwọn atọ́ka sílẹ̀ lórí `timestamp`, `action`, `actor`, `resource_type`,
`status`, àti `request_id`. Àwọn àwọ̀n tí kò sí nínú àwọn DB àtijọ́ ni a máa ń
fi kún un nípasẹ̀ `ALTER TABLE` nígbà tí a bá nílò wọn.

## Ìpamọ́ & Ìfọ̀mọ́

A ń tẹ̀lé sáà ìpamọ́ méjì ọ̀tọ̀ọ̀tọ̀:

| Àyípadà àyíká               | Àìyípadà | Ibi tí ó ti wúlò                                                  |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Dín iye ìlà kù sí ààlà fún `call_logs`                            |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Dín iye ìlà kù sí ààlà fún `proxy_logs`                           |

`cleanupExpiredLogs()` ń ṣe ìgbésẹ̀ ìpamọ́ náà. A máa ń pè é nígbà ìbẹ̀rẹ̀ olupín
láti `src/instrumentation-node.ts`. Ṣíṣe kọ̀ọ̀kan máa ń kọ ìṣẹ̀lẹ̀ àyẹ̀wò
`compliance.cleanup` sílẹ̀ pẹ̀lú iye àwọn ohun tí a parẹ́ nínú tábìlì kọ̀ọ̀kan. A ń ṣe
dídín àwọn àkọsílẹ̀ aṣojú/ìpè kù ní ìpele (`BATCH_SIZE = 5000`) láti yẹra fún
dídìmọ́ kíkọ fún ìgbà pípẹ́.

Ìfọ̀mọ́ ìtàn ìbéèrè pẹ̀lú ọwọ́ yàtọ̀ sí ìpamọ́. Ojú-ìwé Àwọn Àkọsílẹ̀ Ìbéèrè
ń pe `POST /api/settings/purge-request-history`, èyí tí ó ń pa `call_logs`,
`request_detail_logs` àtijọ́, àti àwọn ohun èlò ìbéèrè agbègbè lábẹ́
`${DATA_DIR}/call_logs/`.

Àwọn iye àìyípadà ni a ṣàlàyé nínú `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Jade-jade `noLog` (fun bọtini API )

awọn bọtini API le ṣe afihan nitoribẹẹ ijabọ ipe isalẹ wọn ko wọle. Flag naa n gbe lori tabili `api_keys` (`no_log INTEGER DEFAULT 0`) ati pe o ṣe afihan sinu eto iranti fun awọn iwo oju-ọna gbona.

```bash
# Create a no-log key (management auth required)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Awọn oluranlọwọ (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — yiyipada titẹsi inu-iranti
- `isNoLog(apiKeyId)` — ṣayẹwo lori ọna ibeere; ṣubu pada si 30 s cache kika lati `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (env, koma-yapaya) — ti kojọ tẹlẹ sinu eto-iranti lori bata; wulo nigba ti o ko ba le yi awọn iwe taara

Awọn iṣẹlẹ iṣayẹwo iṣakoso (iwọle, awọn ayipada olupese, awọn ipe irinṣẹ MCP, ati bẹbẹ lọ) jẹ** kii ṣe** fowo nipasẹ `noLog` — nikan-ibeere ijabọ wiwakọ ti yọ kuro.

### Jade jade fun-ibere (`x-omniroute-no-log`)

Onibara le jade ibeere ifọkasi ẹyọkan kuro ninu itẹramọṣẹ fifuye isanwo laisi ṣiṣẹda bọtini iyasọtọ kan. Firanṣẹ `x-omniroute-no-log: true` lori ibeere (`1` ati `yes` tun jẹ itẹwọgba, ọran-aibikita). O kan si gbogbo ipa ọna-ẹbi iwiregbe ti o nṣiṣẹ nipasẹ oluṣakoso iwiregbe: Iwiregbe Ipari, Awọn idahun, Awọn ifiranṣẹ, Awọn ipari ati ọna ibaramu Gemini. Laini ipe-ipe ti wa ni kikọ pẹlu aami igba rẹ, awoṣe, olupese, ipo, iye akoko ati iye tokini, ṣugbọn `request_body`, `response_body`, awọn akojọpọ ibeere ati awọn ohun elo opo gigun ti yọkuro.

Akọsori naa jẹ ORed pẹlu asia bọtini: bọtini no-log kan duro ko si log laibikita akọsori, ati pe akọsori ko le tun mu gedu ṣiṣẹ fun bọtini no-log. Akọsori ti yọ kuro ṣaaju ki o to dari ibeere naa ni oke.

Akọsori yii ṣe** kii ṣe** mu isediwon Memory tabi kaṣe atunmọ. Firanṣẹ `x-omniroute-no-memory: true` ati `x-omniroute-no-cache: true` lẹgbẹẹ rẹ nigbati ibeere naa ko gbọdọ tẹsiwaju akoonu ninu awọn eto abẹlẹ yẹn boya.

## REST API

| Endpoint                    | Ọ̀nà   | Àpèjúwe                                                         | Ìfàṣẹsí    |
| --------------------------- | ----- | --------------------------------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET` | Àwọn àkọsílẹ̀ àyẹ̀wò alábòójútó tí a pín sí ojú-ìwé pẹ̀lú àwọn àsẹ̀ | management |
| `/api/mcp/audit`            | `GET` | Àwọn àkọsílẹ̀ àyẹ̀wò irinṣẹ́ MCP tí a pín sí ojú-ìwé               | (open-sse) |
| `/api/mcp/audit/stats`      | `GET` | Àwọn ìṣirò àyẹ̀wò MCP tí a ṣàkójọpọ̀                              | (open-sse) |

Kò sí endpoint fún fífi CSV ránṣẹ́ jáde tí a pèsè lọ́wọ́lọ́wọ́ — fi í ránṣẹ́
jáde láti dashboard tàbí ṣe ìbéèrè sí ibi-ipamọ́ dátà SQLite ní tààrà.

### Ṣíṣe ìbéèrè sí `/api/compliance/audit-log`

Àwọn paramita ìbéèrè tí a ṣe àtìlẹ́yìn fún (gbogbo wọn jẹ́ àṣàyàn, gbogbo àwọn
àsẹ̀ ọ̀rọ̀ sì ń lo ìbámu `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (tàbí `resource_type`),
  `status`, `requestId` (tàbí `request_id`)
- `from` / `since`, `to` / `until` — àwọn timestamp ISO
- `limit` (àìfọwọ́yí `50`, ó kéré jù `1`, ó pọ̀ jù `500`)
- `offset` (àìfọwọ́yí `0`, ó pọ̀ jù `10_000`)

Ìdáhùn náà jẹ́ àkójọ JSON. A dá metadata pípín sí ojú-ìwé padà nínú àwọn header:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Dashboard

Dashboard náà ń ṣàfihàn dátà àyẹ̀wò ní **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Ojú-ìwé náà ní taabu méjì:

- **Ìbámu** (`ComplianceTab.tsx`) — àwọn ìṣẹ̀lẹ̀ àyẹ̀wò alábòójútó láti
  `/api/compliance/audit-log`. Ó ń ṣe àlẹ̀mọ́ nípasẹ̀ irú ìṣẹ̀lẹ̀, ìpele ewu (info / warning
  / critical, tí a mú jáde láti action + status), àti àyè ọjọ́. A ń ṣírò ìpele
  ewu ní ẹ̀gbẹ́ client láti àwọn ọ̀rọ̀ action/status.
- **MCP** (`McpAuditTab.tsx`) — àyẹ̀wò irinṣẹ́ MCP láti `/api/mcp/audit`, pẹ̀lú
  àwọn àsẹ̀ nípasẹ̀ orúkọ irinṣẹ́ àti àṣeyọrí/ìkùnà.

Àwọn taabu méjèèjì ń pín sí ojú-ìwé pẹ̀lú ìwọ̀n ojú-ìwé `50` (ìbámu) àti `25` (MCP).

## Àwọn Olùrànlọ́wọ́ Ẹ̀rí Ìwọlé Olùpèsè

`src/lib/compliance/providerAudit.ts` ń pèsè àwọn olùrànlọ́wọ́ ìṣètò tí àwọn
route ìṣàkóso olùpèsè ń lò nígbà tí wọ́n bá ń ṣẹ̀dá àwọn ìṣẹ̀lẹ̀ ẹ̀rí ìwọlé:

- `summarizeProviderConnectionForAudit(connection)` — yọ `apiKey`,
  `accessToken`, `refreshToken`, `idToken`, àti
  `providerSpecificData.consoleApiKey` kúrò kí a tó kọ snapshot àsopọ̀ náà
  sí `details`.
- `getProviderAuditTarget(connection)` — ṣe àkópọ̀ ọ̀rọ̀
  `"<provider>:<name|id>"` tí ó dúró ṣinṣin fún pápá `target`.
- `extractProviderWarnings(...payloads)` — ṣàyẹ̀wò àwọn ìdáhùn olùpèsè fún
  àwọn ìkìlọ̀ ìlànà/ààbò (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) ó sì
  ṣàfihàn tó ìbámu 5, tí a gé ọ̀kọ̀ọ̀kan kúrú sí àmì-lẹ́tà 400.

## Àwọn Ìlànà Tó Dára Jù

- Ṣàmì sí àwọn kọ́kọ́rọ́ API tó ń bójú tó PII (ọ̀ràn òfin, ìṣègùn, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ) pẹ̀lú `noLog: true`.
- Ṣàtúnṣe `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` láti bá ìlànà
  ìpamọ́ rẹ mu. Àwọn àìfọwọ́yí ọjọ́ 7 náà ṣọ́ra.
- Fi tábìlì àyẹ̀wò ránṣẹ́ síta kúrò lórí pẹpẹ (`sqlite3 dump`) ní gbogbo ìgbà
  tí ètò ìbámu rẹ bá béèrè — kò sí ibi ìpamọ́ àkóónú tí a kọ sínú rẹ̀.
- Tọpinpin iye `auth.login.failed` àti `auth.login.locked` fún ṣíṣàwárí
  ìkọlù brute-force.
- Nígbà fífikún àwọn endpoint alábòójútó tuntun, pe `logAuditEvent({ ... })` pẹ̀lú
  ọ̀rọ̀ action `domain.verb.outcome` tí ó dúró ṣinṣin, kí o sì fi àyíká ìbéèrè ránṣẹ́ nípasẹ̀
  `getAuditRequestContext(request)` kí IP àti `requestId` lè gba sílẹ̀
  láìfọwọ́ṣe.

## Wo Pẹ̀lú

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — ìbòjúbojú PII, ìfàṣẹwọlé àṣẹ ìtọ́ni
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — àkójọ irinṣẹ́ MCP àti àwọn ààlà ìlò
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — ìtọ́kasí kíkún fún àwọn oníyípadà àyíká
- Orísun: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
