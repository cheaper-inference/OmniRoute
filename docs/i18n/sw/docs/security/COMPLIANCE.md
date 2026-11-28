# Compliance & Audit (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Chanzo cha ukweli:** `src/lib/compliance/`, `src/app/api/compliance/`

OmniRoute hurekodi vitendo vya usimamizi, matukio ya uthibitishaji, mabadiliko ya kitambulisho cha maisha ya mtoa huduma, na maombi ya zana za MCP kwenye majedwali ya ukaguzi yanayoungwa mkono na SQLite. Ukurasa huu unashughulikia kile kinachoingia, mahali kinapoishi, muda gani kinahifadhiwa, jinsi vitufe vya API vinaweza kujiondoa, na jinsi ya kuuliza data.

Utekelezaji unaishi `src/lib/compliance/index.ts` (T-43 — "Udhibiti wa Uzingatiaji") na `src/lib/compliance/providerAudit.ts`. Ukaguzi huandika usitupe kamwe: kwa kushindwa yoyote simu inamezwa kimya kwa hivyo ukataji wa magogo hauwezi kuvunja mtiririko wa ombi kuu.

## Kinachorekodiwa

### Matukio ya ukaguzi wa kiutawala (`audit_log`)

Kila mwito wa `logAuditEvent({ action, actor, target, details, ... })` huzalisha
safu moja. Mifuatano ya vitendo hufuata muundo wa
`domain.verb` (au `domain.verb.outcome`). Aina za vitendo zilizothibitishwa
kwenye mti wa msimbo ni pamoja na:

| Kitendo                              | Chanzo                                   |
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

Kila ingizo huhifadhi `action`, `actor` (chaguo-msingi ni `"system"`), `target`,
`details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id`, na `timestamp`. Vifunguo nyeti (`apiKey`, `accessToken`,
`refreshToken`, `password`, chochote kinacholingana na
`*token`/`*secret`/`*apikey`, n.k.) hufichwa kwa kujirudia na kubadilishwa kuwa
`"[redacted]"` kabla safu haijaandikwa.

Safu za `api_key.auth.touch` hurekodi metadata ya funguo za API iliyofanikiwa
na usomaji wa ugunduzi (GET/HEAD) ambao haufikii kumbukumbu ya maombi: ufunguo
gani, lini, na njia iliyosanifishwa, zikijumuishwa pamoja na kuwekwa kikomo cha
safu 1,000. Funguo zilizo na `noLog` pamoja na ufunguo wa mazingira hurukwa.
Anwani ya IP na wakala wa mtumiaji wa mpigaji huongezwa tu wakati alama ya
kipengele ya `API_KEY_AUDIT_CLIENT_DETAILS_ENABLED` imewashwa (imezimwa kwa
chaguo-msingi).

### Miito ya zana za MCP (`mcp_tool_audit`)

Kila mwito wa zana ya MCP huandika safu kupitia
`open-sse/mcp-server/audit.ts`. Muundo wa hifadhidata (kutoka
`src/lib/db/migrations/002_mcp_a2a_tables.sql`) ni:

| Safu             | Maelezo                                          |
| ---------------- | ------------------------------------------------ |
| `id`             | huongezeka kiotomatiki                           |
| `tool_name`      | kitambulisho cha zana ya MCP                     |
| `input_hash`     | sha256 ya ingizo (data ya mzigo haihifadhiwi)    |
| `output_summary` | muhtasari mfupi, uliopunguzwa                    |
| `duration_ms`    | muda halisi uliopita                             |
| `api_key_id`     | mpigaji (inaweza kuwa tupu)                      |
| `success`        | `1` / `0`                                        |
| `error_code`     | msimbo wa hitilafu wa mwisho wakati wa kushindwa |
| `created_at`     | muhuri wa muda wa ISO                            |

### Kumbukumbu za maombi / matumizi

Hizi ni telemetry ya uendeshaji (si ukaguzi wa kiutawala kabisa), lakini
hutumia njia ileile ya kuhifadhi kwa muda:

- `usage_history` — muhtasari wa matumizi kwa kila ombi
- `call_logs` — kumbukumbu kamili ya kila ombi (inategemea kikomo cha safu, tazama hapa chini)
- `proxy_logs` — kumbukumbu ya trafiki ya proksi (inategemea kikomo cha safu)
- `request_detail_logs` — kumbukumbu ya zamani ya maelezo ya ombi (bado husafishwa ikiwa ipo)

## Muundo wa Hifadhi

`audit_log` huundwa kwa kucheleweshwa na `ensureAuditLogSchema()` inapotumiwa kwa mara ya kwanza:

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

Indeksi huundwa kwenye `timestamp`, `action`, `actor`, `resource_type`,
`status`, na `request_id`. Safu wima zinazokosekana kwenye DB za zamani huongezwa kupitia
`ALTER TABLE` inapohitajika.

## Uhifadhi na Usafishaji

Vipindi viwili tofauti vya uhifadhi vinazingatiwa:

| Kigezo cha mazingira        | Chaguo-msingi | Hutumika kwa                                                      |
| --------------------------- | ------------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`           | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`           | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`      | Upunguzaji wa kikomo cha safu mlalo kwa `call_logs`               |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`      | Upunguzaji wa kikomo cha safu mlalo kwa `proxy_logs`              |

`cleanupExpiredLogs()` huendesha mchakato wa uhifadhi. Huitwa seva inapoanza
kutoka `src/instrumentation-node.ts`. Kila utekelezaji hurekodi tukio la ukaguzi la
`compliance.cleanup` pamoja na idadi ya vifutwa kwa kila jedwali. Upunguzaji wa kumbukumbu za proksi/simu
hufanywa kwa makundi (`BATCH_SIZE = 5000`) ili kuepuka kufunga uandishi kwa muda mrefu.

Usafishaji wa historia ya maombi unaofanywa mwenyewe ni tofauti na uhifadhi. Ukurasa wa Kumbukumbu za Maombi
huita `POST /api/settings/purge-request-history`, ambayo hufuta `call_logs`,
`request_detail_logs` za zamani, na mabaki ya maombi ya ndani yaliyo chini ya
`${DATA_DIR}/call_logs/`.

Chaguo-msingi zimefafanuliwa katika `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` Opt-Out (kwa kila kitufe cha API )

API funguo zinaweza kualamishwa ili trafiki yao ya simu ya chini isiingizwe. Bendera inaishi kwenye jedwali la `api_keys` (`no_log INTEGER DEFAULT 0`) na inaakisiwa katika seti ya kumbukumbu kwa ajili ya utafutaji wa njia motomoto.

```bash
# Create a no-log key (management auth required)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Wasaidizi (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — kugeuza ingizo la kumbukumbu
- `isNoLog(apiKeyId)` — imeangaliwa kwenye njia ya ombi; inarudi kwa 30 s cached kusomwa kutoka `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (env, imetenganishwa kwa koma) — iliyopakiwa awali kwenye seti ya kumbukumbu kwenye buti; muhimu wakati huwezi kugeuza safu moja kwa moja

Matukio ya ukaguzi wa kiutawala (kuingia, mabadiliko ya mtoaji, simu za zana MCP, n.k.) ni** sivyo** iliyoathiriwa na `noLog` — uwekaji kumbukumbu wa trafiki kwa kila ombi pekee ndio umeondolewa.

### kwa ombi la kuchagua kutoka (`x-omniroute-no-log`)

Mteja anaweza kuchagua ombi moja la makisio kutoka kwa kuendelea kwa upakiaji bila kuunda ufunguo maalum. Tuma `x-omniroute-no-log: true` kwa ombi (`1` na `yes` pia zinakubaliwa, hazijalishi). Inatumika kwa kila njia ya gumzo-familia inayopitia kidhibiti cha gumzo: Kukamilika kwa Gumzo, Majibu, Ujumbe, Kamilisho na njia inayooana na Gemini. Safu mlalo ya rajisi ya simu bado imeandikwa kwa muhuri wa muda, modeli, mtoaji, hali, muda na hesabu za tokeni, lakini `request_body`, `response_body`, muhtasari wa ombi na vizalia vya programu vya bomba vimeachwa.

Kichwa ni ORed chenye bendera muhimu: ufunguo wa hakuna-logi hukaa bila logi bila kujali kichwa, na kichwa hakiwezi kuwezesha upya ukataji wa ufunguo wa kuto-logi. Kijajuu kinavuliwa kabla ya ombi kutumwa juu ya mkondo.

Kichwa hiki kinafanya hivyo** sivyo** Lemaza uchimbaji wa Kumbukumbu au kashe ya kisemantiki. Tuma `x-omniroute-no-memory: true` na `x-omniroute-no-cache: true` kando yake wakati ombi lazima liendelee kuwa na maudhui katika mifumo hiyo midogo.

## API ya REST

| Endpoint                    | Method | Maelezo                                                                 | Auth       |
| --------------------------- | ------ | ----------------------------------------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET`  | Rekodi za ukaguzi wa msimamizi zilizogawanywa katika kurasa na vichujio | management |
| `/api/mcp/audit`            | `GET`  | Rekodi za ukaguzi wa zana za MCP zilizogawanywa katika kurasa           | (open-sse) |
| `/api/mcp/audit/stats`      | `GET`  | Takwimu zilizojumlishwa za ukaguzi wa MCP                               | (open-sse) |

Kwa sasa hakuna endpoint ya kuhamisha CSV inayotolewa — hamisha kutoka kwenye dashibodi au uliza
hifadhidata ya SQLite moja kwa moja.

### Kuuliza `/api/compliance/audit-log`

Vigezo vya hoja vinavyotumika (vyote ni vya hiari, na vyote hutumia ulinganishaji wa `LIKE %value%` kwa
vichujio vya maandishi):

- `action`, `actor`, `target`, `resourceType` (au `resource_type`),
  `status`, `requestId` (au `request_id`)
- `from` / `since`, `to` / `until` — mihuri ya muda ya ISO
- `limit` (chaguo-msingi `50`, kiwango cha chini `1`, kiwango cha juu `500`)
- `offset` (chaguo-msingi `0`, kiwango cha juu `10_000`)

Jibu ni safu ya JSON. Metadata ya ugawaji katika kurasa inarejeshwa kwenye vichwa:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Dashibodi

Dashibodi huonyesha data ya ukaguzi kwenye **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Ukurasa una vichupo viwili:

- **Uzingatiaji** (`ComplianceTab.tsx`) — matukio ya ukaguzi wa msimamizi kutoka
  `/api/compliance/audit-log`. Huchuja kwa aina ya tukio, kiwango cha uzito (taarifa / onyo
  / muhimu, kinachotokana na kitendo + hali), na kipindi cha tarehe. Kiwango cha uzito
  hukokotolewa upande wa kiteja kutoka kwenye mifuatano ya kitendo/hali.
- **MCP** (`McpAuditTab.tsx`) — ukaguzi wa zana za MCP kutoka `/api/mcp/audit`, wenye
  vichujio vya jina la zana na kufanikiwa/kushindwa.

Vichupo vyote viwili hugawanya data katika kurasa zenye ukubwa wa `50` (uzingatiaji) na `25` (MCP).

## Visaidizi vya Vitambulisho vya Mtoa Huduma

`src/lib/compliance/providerAudit.ts` hutoa visaidizi vya kuunda muundo vinavyotumiwa na
njia za usimamizi wa watoa huduma zinapotoa matukio ya vitambulisho:

- `summarizeProviderConnectionForAudit(connection)` — huondoa `apiKey`,
  `accessToken`, `refreshToken`, `idToken`, na
  `providerSpecificData.consoleApiKey` kabla ya picha ya hali ya muunganisho
  kuandikwa kwenye `details`.
- `getProviderAuditTarget(connection)` — huunda mfuatano thabiti wa
  `"<provider>:<name|id>"` kwa uga wa `target`.
- `extractProviderWarnings(...payloads)` — hukagua majibu ya mtoa huduma ili kupata
  maonyo ya sera/usalama (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) na
  huonyesha hadi matokeo 5, kila moja likifupishwa hadi vibambo 400.

## Mbinu Bora

- Weka alama kwenye funguo za API zinazoshughulikia PII (kisheria, kitabibu, n.k.) kwa `noLog: true`.
- Rekebisha `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` ili kukidhi
  sera yako ya uhifadhi. Chaguo-msingi za siku 7 ni za tahadhari.
- Hamisha jedwali la ukaguzi nje ya jukwaa (`sqlite3 dump`) kwa ratiba yoyote
  inayohitajika na mpango wako wa uzingatiaji — hakuna uhifadhi wa kumbukumbu uliojengewa ndani.
- Fuatilia idadi ya `auth.login.failed` na `auth.login.locked` ili kugundua
  mashambulizi ya kujaribu manenosiri kwa nguvu.
- Unapoongeza endpoint mpya za msimamizi, ita `logAuditEvent({ ... })` kwa mfuatano thabiti wa kitendo wa
  `domain.verb.outcome` na upitishe muktadha wa ombi kupitia
  `getAuditRequestContext(request)` ili IP na `requestId` zinakiliwe
  kiotomatiki.

## Tazama Pia

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — ufichaji wa PII, udungaji wa vidokezo
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — katalogi ya zana za MCP na mawanda
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — rejeleo kamili la vigeu vya mazingira
- Chanzo: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
