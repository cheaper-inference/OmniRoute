# Compliance & Audit (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

title: "Zgodność i audyt"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Zgodność i audyt

> **Source of truth:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Last updated:** 2026-06-28 — v3.8.40

OmniRoute zapisuje akcje administracyjne, zdarzenia uwierzytelniania, zmiany
cyklu życia poświadczeń providerów oraz wywołania narzędzi MCP w tabelach
audytu opartych o SQLite. Ta strona opisuje, co jest logowane, gdzie to
mieszka, jak długo jest przechowywane, jak klucze API mogą się wypisać
(opt-out) oraz jak odpytywać te dane.

Implementacja znajduje się w `src/lib/compliance/index.ts` (T-43 — "Compliance
Controls") oraz `src/lib/compliance/providerAudit.ts`. Zapis audytu nigdy nie
rzuca wyjątku: przy dowolnej awarii wywołanie jest cicho połykane, żeby
logowanie audytu nie mogło przerwać głównego przepływu żądania.

## Co jest rejestrowane

### Zdarzenia audytu administracyjnego (`audit_log`)

Każde wywołanie `logAuditEvent({ action, actor, target, details, ... })` tworzy
jeden wiersz. Ciągi akcji są zgodne ze wzorcem
`domain.verb` (lub `domain.verb.outcome`). Potwierdzone typy akcji występujące
w kodzie obejmują:

| Akcja                                | Źródło                                   |
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

Każdy wpis zawiera `action`, `actor` (domyślnie `"system"`), `target`,
`details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id` i `timestamp`. Klucze wrażliwe (`apiKey`, `accessToken`,
`refreshToken`, `password`, wszystko pasujące do `*token`/`*secret`/`*apikey`,
itp.) są rekurencyjnie zastępowane wartością `"[redacted]"` przed zapisaniem
wiersza.

Wiersze `api_key.auth.touch` rejestrują pomyślne odczyty metadanych klucza API
i odczyty wykrywania (GET/HEAD), które nigdy nie trafiają do dziennika żądań:
który klucz został użyty, kiedy oraz znormalizowaną ścieżkę; wpisy są łączone
i ograniczone do 1 000 wierszy. Klucze z `noLog` oraz klucz środowiskowy są
pomijane. Adres IP i user agent wywołującego są dodawane wyłącznie wtedy, gdy
flaga funkcji `API_KEY_AUDIT_CLIENT_DETAILS_ENABLED` jest włączona (domyślnie
wyłączona).

### Wywołania narzędzi MCP (`mcp_tool_audit`)

Każde wywołanie narzędzia MCP zapisuje wiersz za pośrednictwem
`open-sse/mcp-server/audit.ts`. Schemat (z
`src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Kolumna          | Uwagi                                              |
| ---------------- | -------------------------------------------------- |
| `id`             | autoincrement                                      |
| `tool_name`      | identyfikator narzędzia MCP                        |
| `input_hash`     | sha256 danych wejściowych (bez zapisanego ładunku) |
| `output_summary` | krótkie, skrócone podsumowanie                     |
| `duration_ms`    | czas zegarowy                                      |
| `api_key_id`     | wywołujący (może być pusty)                        |
| `success`        | `1` / `0`                                          |
| `error_code`     | końcowy kod błędu w przypadku niepowodzenia        |
| `created_at`     | znacznik czasu ISO                                 |

### Dzienniki żądań / użycia

Są to dane telemetryczne dotyczące działania (nie są ściśle audytem
administracyjnym), ale korzystają z tego samego procesu przechowywania:

- `usage_history` — zestawienie użycia dla każdego żądania
- `call_logs` — pełny dziennik każdego żądania (z limitem liczby wierszy, zobacz poniżej)
- `proxy_logs` — dziennik ruchu proxy (z limitem liczby wierszy)
- `request_detail_logs` — starszy szczegółowy dziennik żądań (nadal jest czyszczony, jeśli występuje)

## Schemat przechowywania

`audit_log` jest tworzony leniwie przez `ensureAuditLogSchema()` przy pierwszym użyciu:

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

Indeksy są tworzone na `timestamp`, `action`, `actor`, `resource_type`,
`status` oraz `request_id`. Brakujące kolumny w legacy DB są dodawane przez
`ALTER TABLE` na żądanie.

## Retencja i czyszczenie

Honorowane są dwa osobne okna retencji:

| Env var                     | Default  | Applies to                                                        |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Row-cap trim for `call_logs`                                      |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Row-cap trim for `proxy_logs`                                     |

`cleanupExpiredLogs()` uruchamia przebieg retencji. Jest wywoływany przy starcie
serwera z `src/server-init.ts` oraz `src/instrumentation-node.ts`. Każdy przebieg
loguje zdarzenie audytu `compliance.cleanup` z liczbami usunięć per tabela.
Przycinanie logów proxy/call jest batchowane (`BATCH_SIZE = 5000`), żeby uniknąć
długich blokad zapisu.

Ręczne czyszczenie historii żądań jest oddzielone od retencji. Strona Request Logs
wywołuje `POST /api/settings/purge-request-history`, które usuwa `call_logs`,
legacy `request_detail_logs` oraz lokalne artefakty żądań pod
`${DATA_DIR}/call_logs/`.

Domyślne wartości są zdefiniowane w `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Opt-out `noLog` (per klucz API)

Klucze API można oznaczyć tak, by ich downstreamowy ruch wywołań nie był
logowany. Flaga żyje w tabeli `api_keys` (`no_log INTEGER DEFAULT 0`) i jest
odzwierciedlana w zbiorze w pamięci do szybkich lookupów na hot-path.

```bash
# Create a no-log key (management auth required)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Helpery (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — przełącza wpis w pamięci
- `isNoLog(apiKeyId)` — sprawdzane na ścieżce żądania; w razie potrzeby
  spada do odczytu z cache 30 s z `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (env, lista rozdzielona przecinkami) — wstępnie
  ładowane do zbioru w pamięci przy starcie; przydatne, gdy nie możesz
  przełączyć kolumny bezpośrednio

Administracyjne zdarzenia audytu (login, zmiany providerów, wywołania narzędzi MCP itd.)
**nie** są objęte przez `noLog` — opt-out dotyczy tylko logowania ruchu per żądanie.

## REST API

| Endpoint                    | Method | Description                                | Auth       |
| --------------------------- | ------ | ------------------------------------------ | ---------- |
| `/api/compliance/audit-log` | `GET`  | Stronicowane wpisy audytu admin z filtrami | management |
| `/api/mcp/audit`            | `GET`  | Stronicowane wpisy audytu narzędzi MCP     | (open-sse) |
| `/api/mcp/audit/stats`      | `GET`  | Zagregowane statystyki audytu MCP          | (open-sse) |

Dziś nie ma wbudowanego endpointu eksportu CSV — eksportuj z dashboardu albo
odpytuj bazę SQLite bezpośrednio.

### Odpytywanie `/api/compliance/audit-log`

Obsługiwane query params (wszystkie opcjonalne; filtry tekstowe używają
dopasowania `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (lub `resource_type`),
  `status`, `requestId` (lub `request_id`)
- `from` / `since`, `to` / `until` — znaczniki czasu ISO
- `limit` (domyślnie `50`, min `1`, max `500`)
- `offset` (domyślnie `0`, max `10_000`)

Odpowiedź to tablica JSON. Metadane paginacji wracają w nagłówkach:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Dashboard

Dashboard udostępnia dane audytu pod **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Strona ma dwie zakładki:

- **Compliance** (`ComplianceTab.tsx`) — administracyjne zdarzenia audytu z
  `/api/compliance/audit-log`. Filtry po typie zdarzenia, severity (info / warning
  / critical, wyprowadzone z action + status) oraz zakresie dat. Severity jest
  liczone po stronie klienta z ciągów action/status.
- **MCP** (`McpAuditTab.tsx`) — audyt narzędzi MCP z `/api/mcp/audit`, z
  filtrami po nazwie narzędzia oraz success/failure.

Obie zakładki paginują z rozmiarami strony `50` (compliance) i `25` (MCP).

## Helpery poświadczeń providerów

`src/lib/compliance/providerAudit.ts` dostarcza helpery kształtujące używane
przez trasy zarządzania providerami przy emisji zdarzeń poświadczeń:

- `summarizeProviderConnectionForAudit(connection)` — usuwa `apiKey`,
  `accessToken`, `refreshToken`, `idToken` oraz
  `providerSpecificData.consoleApiKey` zanim snapshot połączenia trafi do
  `details`.
- `getProviderAuditTarget(connection)` — składa stabilny ciąg
  `"<provider>:<name|id>"` dla pola `target`.
- `extractProviderWarnings(...payloads)` — skanuje odpowiedzi providerów pod kątem
  ostrzeżeń policy/safety (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) i
  zwraca do 5 trafień, każde obcięte do 400 znaków.

## Dobre praktyki

- Oznaczaj klucze API obsługujące PII (prawo, medycyna itd.) flagą `noLog: true`.
- Dostosuj `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` do swojej
  polityki retencji. Domyślne 7 dni są konserwatywne.
- Eksportuj tabelę audytu poza platformę (`sqlite3 dump`) w cyklu wymaganym
  przez twój program compliance — nie ma wbudowanej archiwizacji.
- Śledź liczby `auth.login.failed` i `auth.login.locked` pod kątem wykrywania
  brute-force.
- Przy dodawaniu nowych endpointów admin wywołuj `logAuditEvent({ ... })` ze
  stabilnym ciągiem akcji `domain.verb.outcome` i przekazuj kontekst żądania
  przez `getAuditRequestContext(request)`, żeby IP oraz `requestId` były
  przechwytywane automatycznie.

## Zobacz też

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — maskowanie PII, prompt injection
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — katalog narzędzi MCP i scopes
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — pełna referencja zmiennych env
- Źródło: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
