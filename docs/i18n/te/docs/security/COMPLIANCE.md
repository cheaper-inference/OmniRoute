# Compliance & Audit (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **సత్యానికి మూలం:** `src/lib/compliance/`, `src/app/api/compliance/`

OmniRoute SQLite-మద్దతుగల ఆడిట్ టేబుల్లకు అడ్మినిస్ట్రేటివ్ చర్యలు, ప్రామాణీకరణ ఈవెంట్లు, ప్రొవైడర్ క్రెడెన్షియల్ లైఫ్సైకిల్ మార్పులు మరియు MCP టూల్ ఆహ్వానాలను రికార్డ్ చేస్తుంది. ఈ పేజీ ఏమి లాగ్ చేయబడింది, అది ఎక్కడ నివసిస్తుంది, ఎంతకాలం ఉంచబడుతుంది, API కీలు ఎలా నిలిపివేయబడతాయి మరియు డేటాను ఎలా ప్రశ్నించాలి.

అమలు `src/lib/compliance/index.ts` (T-43 — "అనుకూల నియంత్రణలు") మరియు `src/lib/compliance/providerAudit.ts`. ఆడిట్ వ్రాతలు ఎప్పుడూ త్రో చేయవు: ఏదైనా విఫలమైనప్పుడు కాల్ నిశ్శబ్దంగా మింగబడుతుంది కాబట్టి ఆడిట్ లాగింగ్ ప్రధాన అభ్యర్థన ప్రవాహాన్ని విచ్ఛిన్నం చేయదు.

## ఏవి లాగ్ చేయబడతాయి

### పరిపాలనా ఆడిట్ ఈవెంట్లు (`audit_log`)

`logAuditEvent({ action, actor, target, details, ... })` కు చేసే ప్రతి కాల్
ఒక వరుసను సృష్టిస్తుంది. యాక్షన్ స్ట్రింగ్లు `domain.verb` (లేదా
`domain.verb.outcome`) నమూనాను అనుసరిస్తాయి. ట్రీలో నిర్ధారించబడిన యాక్షన్ రకాలు:

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

ప్రతి ఎంట్రీలో `action`, `actor` (డిఫాల్ట్గా `"system"`), `target`,
`details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id`, మరియు `timestamp` ఉంటాయి. సున్నితమైన కీలు (`apiKey`, `accessToken`,
`refreshToken`, `password`, `*token`/`*secret`/`*apikey` కు సరిపోలే ఏదైనా
విలువ మొదలైనవి) వరుసను రాయడానికి ముందు పునరావృతంగా `"[redacted]"` గా
రెడాక్ట్ చేయబడతాయి.

`api_key.auth.touch` వరుసలు రిక్వెస్ట్ లాగ్కు చేరని విజయవంతమైన API కీ మెటాడేటా
మరియు డిస్కవరీ రీడ్లను (GET/HEAD) నమోదు చేస్తాయి: ఏ కీ, ఎప్పుడు, మరియు
సాధారణీకరించిన పాత్; ఇవి సమీకరించబడి గరిష్ఠంగా 1,000 వరుసలకు పరిమితం చేయబడతాయి.
`noLog` ఉన్న కీలు మరియు ఎన్విరాన్మెంట్ కీ మినహాయించబడతాయి. `API_KEY_AUDIT_CLIENT_DETAILS_ENABLED`
ఫీచర్ ఫ్లాగ్ ఆన్లో ఉన్నప్పుడు మాత్రమే (డిఫాల్ట్గా ఆఫ్లో ఉంటుంది) కాలర్ యొక్క
IP చిరునామా మరియు యూజర్-ఏజెంట్ జోడించబడతాయి.

### MCP టూల్ కాల్లు (`mcp_tool_audit`)

ప్రతి MCP టూల్ ఇన్వొకేషన్ `open-sse/mcp-server/audit.ts` ద్వారా ఒక వరుసను
రాస్తుంది. స్కీమా
`src/lib/db/migrations/002_mcp_a2a_tables.sql` నుండి:

| Column           | Notes                                       |
| ---------------- | ------------------------------------------- |
| `id`             | ఆటోఇన్క్రిమెంట్                             |
| `tool_name`      | MCP టూల్ ఐడెంటిఫైయర్                        |
| `input_hash`     | ఇన్పుట్ యొక్క sha256 (పేలోడ్ నిల్వ చేయబడదు) |
| `output_summary` | సంక్షిప్త, కుదించబడిన సారాంశం               |
| `duration_ms`    | గడిచిన సమయం                                 |
| `api_key_id`     | కాలర్ (నల్ కావచ్చు)                         |
| `success`        | `1` / `0`                                   |
| `error_code`     | విఫలమైనప్పుడు టెర్మినల్ ఎరర్ కోడ్           |
| `created_at`     | ISO టైమ్స్టాంప్                             |

### రిక్వెస్ట్ / వినియోగ లాగ్లు

ఇవి ఆపరేషనల్ టెలిమెట్రీ (కచ్చితంగా అడ్మిన్ ఆడిట్ కాదు), అయితే ఇదే
రిటెన్షన్ పైప్లైన్ను పంచుకుంటాయి:

- `usage_history` — ప్రతి రిక్వెస్ట్కు వినియోగ రోల్-అప్
- `call_logs` — ప్రతి రిక్వెస్ట్కు పూర్తి లాగ్ (క్రింద చూడగల వరుస-పరిమితికి లోబడి ఉంటుంది)
- `proxy_logs` — ప్రాక్సీ ట్రాఫిక్ లాగ్ (వరుస-పరిమితికి లోబడి ఉంటుంది)
- `request_detail_logs` — లెగసీ వివరమైన రిక్వెస్ట్ లాగ్ (ఉన్నట్లయితే ఇప్పటికీ ప్రూన్ చేయబడుతుంది)

## నిల్వ స్కీమా

మొదటిసారి ఉపయోగించినప్పుడు `ensureAuditLogSchema()` ద్వారా `audit_log` అవసరమైన సమయంలో సృష్టించబడుతుంది:

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

`timestamp`, `action`, `actor`, `resource_type`, `status`, మరియు `request_id`పై ఇండెక్స్లు సృష్టించబడతాయి. పాత DBలలో లేని కాలమ్లు అవసరమైనప్పుడు `ALTER TABLE` ద్వారా జోడించబడతాయి.

## నిలుపుదల & శుభ్రపరచడం

రెండు వేర్వేరు నిలుపుదల వ్యవధులు పాటించబడతాయి:

| పర్యావరణ వేరియబుల్          | డిఫాల్ట్ | దేనికి వర్తిస్తుంది                                               |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | `call_logs` కోసం వరుసల పరిమితి కుదింపు                            |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | `proxy_logs` కోసం వరుసల పరిమితి కుదింపు                           |

`cleanupExpiredLogs()` నిలుపుదల ప్రక్రియను అమలు చేస్తుంది. సర్వర్ ప్రారంభమైనప్పుడు ఇది `src/instrumentation-node.ts` నుండి అమలు చేయబడుతుంది. ప్రతి అమలు ఒక్కో పట్టికకు సంబంధించిన తొలగింపు సంఖ్యలతో `compliance.cleanup` ఆడిట్ ఈవెంట్ను లాగ్ చేస్తుంది. ఎక్కువసేపు రైట్ లాక్లు ఏర్పడకుండా ఉండేందుకు ప్రాక్సీ/కాల్ లాగ్ కుదింపు బ్యాచ్లుగా (`BATCH_SIZE = 5000`) జరుగుతుంది.

మాన్యువల్ అభ్యర్థన-చరిత్ర శుభ్రపరచడం నిలుపుదల ప్రక్రియకు వేరుగా ఉంటుంది. అభ్యర్థన లాగ్ల పేజీ `POST /api/settings/purge-request-history`ను కాల్ చేస్తుంది; ఇది `call_logs`, పాత `request_detail_logs`, మరియు `${DATA_DIR}/call_logs/` కింద ఉన్న స్థానిక అభ్యర్థన ఆర్టిఫాక్ట్లను తొలగిస్తుంది.

డిఫాల్ట్లు `src/lib/logEnv.ts`లో నిర్వచించబడ్డాయి (`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` నిలిపివేత (ప్రతి API కీ)

API కీలు ఫ్లాగ్ చేయబడతాయి కాబట్టి వాటి దిగువ కాల్ ట్రాఫిక్ లాగ్ చేయబడదు. ఫ్లాగ్ `api_keys` టేబుల్ (`no_log INTEGER DEFAULT 0`)పై ఉంటుంది మరియు హాట్-పాత్ లుకప్ల కోసం ఇన్-మెమరీ సెట్లో ప్రతిబింబిస్తుంది.

```bash
# Create a no-log key (management auth required)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

సహాయకులు (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — ఇన్-మెమరీ ఎంట్రీని టోగుల్ చేయండి
- `isNoLog(apiKeyId)` — అభ్యర్థన మార్గంలో తనిఖీ చేయబడింది; `api_keys.no_log` నుండి 30 సెకన్ల కాష్ రీడ్కి తిరిగి వస్తుంది
- `NO_LOG_API_KEY_IDS` (env, కామాతో వేరు చేయబడిన) — బూట్లో ఇన్-మెమరీ సెట్లోకి ప్రీలోడ్ చేయబడింది; మీరు నిలువు వరుసను నేరుగా టోగుల్ చేయలేనప్పుడు ఉపయోగకరంగా ఉంటుంది

అడ్మినిస్ట్రేటివ్ ఆడిట్ ఈవెంట్లు (లాగిన్, ప్రొవైడర్ మార్పులు, MCP టూల్ కాల్లు మొదలైనవి)** కాదు** `noLog` — ద్వారా ప్రభావితమైన ప్రతి అభ్యర్థన మాత్రమే ట్రాఫిక్ లాగింగ్ నిలిపివేయబడింది.

### ప్రతి అభ్యర్థన నిలిపివేత (`x-omniroute-no-log`)

ఒక క్లయింట్ అంకితమైన కీని సృష్టించకుండానే పేలోడ్ పెర్సిస్టెన్స్ నుండి ఒకే అనుమితి అభ్యర్థనను ఎంచుకోవచ్చు. అభ్యర్థనపై `x-omniroute-no-log: true` పంపండి (`1` మరియు `yes` కూడా ఆమోదించబడ్డాయి, కేస్-సెన్సిటివ్). ఇది చాట్ హ్యాండ్లర్ ద్వారా నడిచే ప్రతి చాట్-ఫ్యామిలీ రూట్కు వర్తిస్తుంది: చాట్ పూర్తిలు, ప్రతిస్పందనలు, సందేశాలు, పూర్తిలు మరియు జెమిని-అనుకూల మార్గం. కాల్-లాగ్ వరుస ఇప్పటికీ దాని టైమ్స్టాంప్, మోడల్, ప్రొవైడర్, స్టేటస్, వ్యవధి మరియు టోకెన్ గణనలతో వ్రాయబడింది, అయితే `request_body`, `response_body`, అభ్యర్థన సారాంశాలు మరియు పైప్లైన్ కళాఖండాలు విస్మరించబడ్డాయి.

హెడర్ కీ ఫ్లాగ్తో ORed : హెడర్తో సంబంధం లేకుండా నో-లాగ్ కీ నో-లాగ్గా ఉంటుంది మరియు హెడర్ నో-లాగ్ కీ కోసం లాగింగ్ను మళ్లీ ప్రారంభించదు. అభ్యర్థన అప్స్ట్రీమ్ ఫార్వార్డ్ చేయడానికి ముందు హెడర్ తీసివేయబడుతుంది.

ఈ శీర్షిక చేస్తుంది** కాదు** మెమరీ వెలికితీత లేదా సెమాంటిక్ కాష్ని నిలిపివేయండి. అభ్యర్థన ఆ సబ్సిస్టమ్లలో కంటెంట్ను కొనసాగించనప్పుడు దానితో పాటు `x-omniroute-no-memory: true` మరియు `x-omniroute-no-cache: true` పంపండి.

## REST API

| ఎండ్పాయింట్                 | పద్ధతి | వివరణ                                               | ప్రామాణీకరణ |
| --------------------------- | ------ | --------------------------------------------------- | ----------- |
| `/api/compliance/audit-log` | `GET`  | ఫిల్టర్లతో పేజీలుగా విభజించిన అడ్మిన్ ఆడిట్ నమోదులు | management  |
| `/api/mcp/audit`            | `GET`  | పేజీలుగా విభజించిన MCP సాధన ఆడిట్ నమోదులు           | (open-sse)  |
| `/api/mcp/audit/stats`      | `GET`  | సమగ్రపరచిన MCP ఆడిట్ గణాంకాలు                       | (open-sse)  |

ప్రస్తుతం CSV ఎగుమతి ఎండ్పాయింట్ అందించబడటం లేదు — డ్యాష్బోర్డ్ నుండి ఎగుమతి చేయండి లేదా
SQLite డేటాబేస్ను నేరుగా క్వెరీ చేయండి.

### `/api/compliance/audit-log`ను క్వెరీ చేయడం

మద్దతు ఉన్న క్వెరీ పారామీటర్లు (అన్నీ ఐచ్ఛికం, టెక్స్ట్ ఫిల్టర్లన్నీ
`LIKE %value%` సరిపోలికను ఉపయోగిస్తాయి):

- `action`, `actor`, `target`, `resourceType` (లేదా `resource_type`),
  `status`, `requestId` (లేదా `request_id`)
- `from` / `since`, `to` / `until` — ISO టైమ్స్టాంప్లు
- `limit` (డిఫాల్ట్ `50`, కనిష్ఠం `1`, గరిష్ఠం `500`)
- `offset` (డిఫాల్ట్ `0`, గరిష్ఠం `10_000`)

ప్రతిస్పందన ఒక JSON అరే. పేజినేషన్ మెటాడేటా హెడర్లలో అందించబడుతుంది:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## డ్యాష్బోర్డ్

డ్యాష్బోర్డ్ **`/dashboard/audit`** వద్ద ఆడిట్ డేటాను అందిస్తుంది
(`src/app/(dashboard)/dashboard/audit/page.tsx`). ఈ పేజీలో రెండు ట్యాబ్లు ఉన్నాయి:

- **అనుగుణ్యత** (`ComplianceTab.tsx`) — `/api/compliance/audit-log` నుండి
  అడ్మిన్ ఆడిట్ ఈవెంట్లు. ఈవెంట్ రకం, తీవ్రత (సమాచారం / హెచ్చరిక
  / అత్యంత తీవ్రమైనది, చర్య + స్థితి నుండి ఉత్పన్నమవుతుంది), తేదీ పరిధి ఆధారంగా ఫిల్టర్ చేస్తుంది. తీవ్రత
  చర్య/స్థితి స్ట్రింగ్ల నుండి క్లయింట్ వైపు గణించబడుతుంది.
- **MCP** (`McpAuditTab.tsx`) — `/api/mcp/audit` నుండి MCP సాధన ఆడిట్,
  సాధన పేరు మరియు విజయం/వైఫల్యం ఆధారంగా ఫిల్టర్లతో.

రెండు ట్యాబ్లు `50` (అనుగుణ్యత) మరియు `25` (MCP) పేజీ పరిమాణాలతో పేజినేట్ చేస్తాయి.

## ప్రొవైడర్ క్రెడెన్షియల్ సహాయకాలు

`src/lib/compliance/providerAudit.ts`, క్రెడెన్షియల్ ఈవెంట్లను విడుదల చేసేటప్పుడు
ప్రొవైడర్-నిర్వహణ రూట్లు ఉపయోగించే ఆకృతి సహాయకాలను అందిస్తుంది:

- `summarizeProviderConnectionForAudit(connection)` — కనెక్షన్ స్నాప్షాట్
  `details`లో వ్రాయబడటానికి ముందు `apiKey`, `accessToken`, `refreshToken`, `idToken`,
  మరియు `providerSpecificData.consoleApiKey`ను తొలగిస్తుంది.
- `getProviderAuditTarget(connection)` — `target` ఫీల్డ్ కోసం స్థిరమైన
  `"<provider>:<name|id>"` స్ట్రింగ్ను రూపొందిస్తుంది.
- `extractProviderWarnings(...payloads)` — విధానం/భద్రతా హెచ్చరికల కోసం
  ప్రొవైడర్ ప్రతిస్పందనలను స్కాన్ చేస్తుంది (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) మరియు
  గరిష్ఠంగా 5 సరిపోలికలను చూపిస్తుంది, ప్రతిదీ 400 అక్షరాలకు కుదించబడుతుంది.

## ఉత్తమ పద్ధతులు

- PII (చట్టపరమైన, వైద్యపరమైన మొదలైనవి)ను నిర్వహించే API కీలకు `noLog: true`తో గుర్తు పెట్టండి.
- మీ నిల్వ విధానానికి అనుగుణంగా `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS`ను
  సర్దుబాటు చేయండి. 7-రోజుల డిఫాల్ట్లు జాగ్రత్తతో నిర్ణయించబడినవి.
- మీ అనుగుణ్యత కార్యక్రమం కోరే వ్యవధిలో ఆడిట్ పట్టికను ప్లాట్ఫారమ్ వెలుపలికి
  (`sqlite3 dump`) ఎగుమతి చేయండి — అంతర్నిర్మిత ఆర్కైవింగ్ అందుబాటులో లేదు.
- బ్రూట్-ఫోర్స్ గుర్తింపు కోసం `auth.login.failed` మరియు `auth.login.locked`
  సంఖ్యలను ట్రాక్ చేయండి.
- కొత్త అడ్మిన్ ఎండ్పాయింట్లను జోడించేటప్పుడు, స్థిరమైన `domain.verb.outcome`
  చర్య స్ట్రింగ్తో `logAuditEvent({ ... })`ను కాల్ చేసి, అభ్యర్థన సందర్భాన్ని
  `getAuditRequestContext(request)` ద్వారా పంపండి, తద్వారా IP మరియు `requestId`
  స్వయంచాలకంగా సంగ్రహించబడతాయి.

## ఇవి కూడా చూడండి

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — PII మాస్కింగ్, ప్రాంప్ట్ ఇంజెక్షన్
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP సాధనాల కేటలాగ్ మరియు స్కోప్లు
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — పూర్తి env var సూచన
- మూలం: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
