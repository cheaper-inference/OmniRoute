# Compliance & Audit (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Izvor istine:** `src/lib/compliance/`, `src/app/api/compliance/`

OmniRoute bilježi administrativne radnje, događaje provjere autentičnosti, promjene životnog ciklusa vjerodajnica dobavljača i pozivanje MCP alata u tablice revizije podržane SQLite. Ova stranica pokriva ono što se bilježi, gdje živi, koliko dugo se čuva, kako API ključevi mogu isključiti i kako tražiti podatke.

Implementacija živi u `src/lib/compliance/index.ts` (T-43 — "Kontrole usklađenosti") i `src/lib/compliance/providerAudit.ts`. Revizijski zapisi nikada ne bacaju: u slučaju bilo kakvog neuspjeha poziv se tiho proguta tako da evidencija revizije ne može prekinuti glavni tok zahtjeva.

## Šta se evidentira

### Administrativni događaji revizije (`audit_log`)

Svaki poziv funkcije `logAuditEvent({ action, actor, target, details, ... })` proizvodi
jedan red. Znakovni nizovi radnji slijede obrazac
`domain.verb` (ili `domain.verb.outcome`). Potvrđeni tipovi radnji u stablu uključuju:

| Radnja                               | Izvor                                    |
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

Svaki unos bilježi `action`, `actor` (zadano na `"system"`), `target`,
`details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id` i `timestamp`. Osjetljivi ključevi (`apiKey`, `accessToken`,
`refreshToken`, `password`, sve što odgovara obrascu `*token`/`*secret`/`*apikey`,
itd.) rekurzivno se rediguju u `"[redacted]"` prije upisa reda.

Redovi `api_key.auth.touch` bilježe uspješne metapodatke API ključa i čitanja
za otkrivanje (GET/HEAD) koja nikada ne dospiju u dnevnik zahtjeva: koji ključ,
kada i normalizovana putanja, objedinjeno i ograničeno na najviše 1.000 redova.
Ključevi s `noLog` i ključ okruženja se preskaču. IP adresa pozivaoca i korisnički
agent dodaju se samo kada je zastavica funkcionalnosti
`API_KEY_AUDIT_CLIENT_DETAILS_ENABLED` uključena (isključena je
prema zadanim postavkama).

### Pozivi MCP alata (`mcp_tool_audit`)

Svako pozivanje MCP alata upisuje red putem
`open-sse/mcp-server/audit.ts`. Shema (iz
`src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Kolona           | Napomene                          |
| ---------------- | --------------------------------- |
| `id`             | automatsko povećavanje            |
| `tool_name`      | identifikator MCP alata           |
| `input_hash`     | sha256 ulaza (sadržaj se ne čuva) |
| `output_summary` | kratak, skraćen sažetak           |
| `duration_ms`    | proteklo vrijeme                  |
| `api_key_id`     | pozivalac (može biti null)        |
| `success`        | `1` / `0`                         |
| `error_code`     | završni kod greške pri neuspjehu  |
| `created_at`     | ISO vremenska oznaka              |

### Dnevnici zahtjeva / korištenja

Ovo je operativna telemetrija (nije strogo administrativna revizija), ali koristi
isti proces zadržavanja:

- `usage_history` — objedinjeni podaci o korištenju po zahtjevu
- `call_logs` — potpuni dnevnik po zahtjevu (podliježe ograničenju broja redova, pogledajte u nastavku)
- `proxy_logs` — dnevnik proxy saobraćaja (podliježe ograničenju broja redova)
- `request_detail_logs` — naslijeđeni detaljni dnevnik zahtjeva (i dalje se uklanja ako postoji)

## Šema skladištenja

`audit_log` se kreira po potrebi pomoću `ensureAuditLogSchema()` pri prvoj upotrebi:

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

Indeksi se kreiraju na `timestamp`, `action`, `actor`, `resource_type`, `status` i `request_id`. Kolone koje nedostaju u naslijeđenim bazama podataka dodaju se putem `ALTER TABLE` po potrebi.

## Zadržavanje i čišćenje

Poštuju se dva odvojena perioda zadržavanja:

| Env var                     | Zadano   | Odnosi se na                                                      |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Obrezivanje prema broju redova za `call_logs`                     |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Obrezivanje prema broju redova za `proxy_logs`                    |

`cleanupExpiredLogs()` pokreće prolaz zadržavanja. Poziva se pri pokretanju servera iz `src/instrumentation-node.ts`. Svako pokretanje bilježi `compliance.cleanup` revizijski događaj sa brojem obrisanih stavki po tabeli. Obrezivanje proxy/call logova se vrši serijski (`BATCH_SIZE = 5000`) kako bi se izbjeglo dugo zaključavanje upisa.

Ručno čišćenje historije zahtjeva je odvojeno od zadržavanja. Stranica Request Logs poziva `POST /api/settings/purge-request-history`, što briše `call_logs`, naslijeđene `request_detail_logs` i lokalne artefakte zahtjeva unutar `${DATA_DIR}/call_logs/`.

Zadane vrijednosti su definisane u `src/lib/logEnv.ts` (`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` Opt-Out (po API ključu)

API ključevi mogu biti označeni tako da se njihov nizvodni promet poziva ne evidentira. Zastavica živi na tablici `api_keys` (`no_log INTEGER DEFAULT 0`) i preslikava se u skup u memoriji za traženje vruće staze.

```bash
# Create a no-log key (management auth required)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Pomagači (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — prebacuje unos u memoriji
- `isNoLog(apiKeyId)` — provjereno na stazi zahtjeva; vraća se na 30 s keširano čitanje iz `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (env, odvojeno zarezima) — unaprijed učitan u memorijski skup pri pokretanju; korisno kada ne možete direktno prebaciti kolonu

Događaji administrativne revizije (prijava, promjene provajdera, pozivi MCP alata, itd.) su** ne** na koje utiče `noLog` — samo evidentiranje saobraćaja po zahtjevu je isključeno.

### Odbijanje po zahtjevu (`x-omniroute-no-log`)

Klijent može odabrati jedan zahtjev za zaključivanje iz postojanosti korisnog opterećenja bez kreiranja namjenskog ključa. Pošaljite `x-omniroute-no-log: true` na zahtjev (`1` i `yes` su također prihvaćeni, bez obzira na velika i mala slova). Primjenjuje se na svaku rutu porodice ćaskanja koja prolazi kroz rukovaoče ćaskanjem: Završetak ćaskanja, Odgovori, Poruke, Završeci i putanja kompatibilna sa Blizancima. Red evidencije poziva je i dalje napisan sa svojom vremenskom oznakom, modelom, dobavljačem, statusom, trajanjem i brojem tokena, ali `request_body`, `response_body`, sažetci zahtjeva i artefakti cjevovoda su izostavljeni.

Zaglavlje je ORed sa zastavicom ključa: ključ bez evidencije ostaje bez evidencije bez obzira na zaglavlje, a zaglavlje ne može ponovo omogućiti evidentiranje za ključ bez dnevnika. Zaglavlje se uklanja prije nego što se zahtjev prosljeđuje uzvodno.

Ovo zaglavlje radi** ne** onemogućite ekstrakciju memorije ili semantičku keš memoriju. Pošaljite `x-omniroute-no-memory: true` i `x-omniroute-no-cache: true` pored njega kada zahtjev ne smije postojati sadržaj u tim podsistemima.

## REST API

| Krajnja tačka               | Metoda | Opis                                                       | Autorizacija |
| --------------------------- | ------ | ---------------------------------------------------------- | ------------ |
| `/api/compliance/audit-log` | `GET`  | Straničeni administratorski revizijski zapisi sa filterima | management   |
| `/api/mcp/audit`            | `GET`  | Straničeni revizijski zapisi MCP alata                     | (open-sse)   |
| `/api/mcp/audit/stats`      | `GET`  | Agregirane statistike MCP revizije                         | (open-sse)   |

Trenutno ne postoji krajnja tačka za CSV izvoz — izvozite sa kontrolne table ili direktno upitajte SQLite bazu podataka.

### Upiti nad `/api/compliance/audit-log`

Podržani parametri upita (svi su opcioni, svi koriste `LIKE %value%` podudaranje za tekstualne filtere):

- `action`, `actor`, `target`, `resourceType` (ili `resource_type`),
  `status`, `requestId` (ili `request_id`)
- `from` / `since`, `to` / `until` — ISO vremenske oznake
- `limit` (podrazumevano `50`, min `1`, maks `500`)
- `offset` (podrazumevano `0`, maks `10_000`)

Odgovor je JSON niz. Metapodaci o paginaciji se vraćaju u zaglavljima:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Kontrolna tabla

Kontrolna tabla izlaže revizijske podatke na **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Stranica ima dvije kartice:

- **Compliance** (`ComplianceTab.tsx`) — administratorski revizijski događaji sa
  `/api/compliance/audit-log`. Filtriranje po tipu događaja, ozbiljnosti (info / warning
  / critical, izvedeno iz action + status) i vremenskom rasponu. Ozbiljnost se izračunava na strani klijenta iz stringova action/status.
- **MCP** (`McpAuditTab.tsx`) — revizija MCP alata sa `/api/mcp/audit`, sa
  filterima po imenu alata i uspjehu/neuspjehu.

Obje kartice koriste paginaciju sa veličinama stranica od `50` (compliance) i `25` (MCP).

## Pomoćni programi za akreditive provajdera

`src/lib/compliance/providerAudit.ts` pruža pomoćne programe za oblikovanje koje koriste rute za upravljanje provajderima kada emituju događaje akreditiva:

- `summarizeProviderConnectionForAudit(connection)` — uklanja `apiKey`,
  `accessToken`, `refreshToken`, `idToken` i
  `providerSpecificData.consoleApiKey` prije nego što se snimak konekcije zapiše u `details`.
- `getProviderAuditTarget(connection)` — sastavlja stabilan
  `"<provider>:<name|id>"` string za `target` polje.
- `extractProviderWarnings(...payloads)` — skenira odgovore provajdera u potrazi za upozorenjima o politici/sigurnosti (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) i prikazuje do 5 pogodaka, svaki skraćen na 400 znakova.

## Najbolje prakse

- Označite API ključeve koji rukuju PII podacima (pravni, medicinski, itd.) sa `noLog: true`.
- Podesite `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` da odgovaraju vašoj politici zadržavanja podataka. Podrazumevanih 7 dana je konzervativno.
- Izvezite revizijsku tabelu van platforme (`sqlite3 dump`) onom učestalošću koju zahtijeva vaš program usklađenosti — ne postoji ugrađena arhivacija.
- Pratite brojeve `auth.login.failed` i `auth.login.locked` za detekciju brute-force napada.
- Kada dodajete nove administratorske krajnje tačke, pozovite `logAuditEvent({ ... })` sa stabilnim
  `domain.verb.outcome` stringom akcije i proslijedite kontekst zahtjeva putem
  `getAuditRequestContext(request)` kako bi se IP i `requestId` automatski zabilježili.

## Vidi također

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — maskiranje PII podataka, prompt injection
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — katalog MCP alata i opsezi
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — potpuna referenca za varijable okruženja
- Izvor: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
