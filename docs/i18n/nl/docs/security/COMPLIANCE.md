# Compliance & Audit (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Bron van waarheid:** `src/lib/compliance/`, `src/app/api/compliance/`

OmniRoute registreert administratieve acties, authenticatiegebeurtenissen, wijzigingen in de levenscyclus van providerreferenties en aanroepen van MCP tools voor door SQLite ondersteunde audittabellen. Op deze pagina wordt besproken wat er wordt geregistreerd, waar het zich bevindt, hoe lang het wordt bewaard, hoe API sleutels zich kunnen afmelden en hoe de gegevens kunnen worden opgevraagd.

De implementatie bevindt zich in `src/lib/compliance/index.ts` (T-43 — "Compliance Controls") en `src/lib/compliance/providerAudit.ts`. Audit-schrijfbewerkingen gooien nooit: bij elke fout wordt de oproep stilletjes ingeslikt, zodat auditregistratie de hoofdverzoekstroom niet kan onderbreken.

## Wat Er Wordt Gelogd

### Administratieve auditgebeurtenissen (`audit_log`)

Elke aanroep van `logAuditEvent({ action, actor, target, details, ... })` produceert
één rij. Actiereeksen volgen een patroon van `domain.verb` (of
`domain.verb.outcome`). Bevestigde actietypen in de codebase zijn:

| Actie                                | Bron                                     |
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

Elke invoer legt `action`, `actor` (standaard `"system"`), `target`,
`details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id` en `timestamp` vast. Gevoelige sleutels (`apiKey`, `accessToken`,
`refreshToken`, `password`, alles wat overeenkomt met `*token`/`*secret`/`*apikey`,
enzovoort) worden recursief geredigeerd naar `"[redacted]"` voordat de rij wordt
geschreven.

Rijen met `api_key.auth.touch` leggen geslaagde API-sleutelmetagegevens en
discovery-reads (GET/HEAD) vast die het requestlog nooit bereiken: welke sleutel,
wanneer en het genormaliseerde pad, samengevoegd en beperkt tot maximaal 1.000
rijen. Sleutels met `noLog` en de omgevingssleutel worden overgeslagen. Het
IP-adres en de user-agent van de aanroeper worden alleen toegevoegd wanneer de
featureflag `API_KEY_AUDIT_CLIENT_DETAILS_ENABLED` is ingeschakeld (standaard
uitgeschakeld).

### Aanroepen van MCP-tools (`mcp_tool_audit`)

Elke aanroep van een MCP-tool schrijft een rij via
`open-sse/mcp-server/audit.ts`. Schema (uit
`src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Kolom            | Opmerkingen                                    |
| ---------------- | ---------------------------------------------- |
| `id`             | automatisch opgehoogd                          |
| `tool_name`      | MCP-toolidentifier                             |
| `input_hash`     | sha256 van de invoer (geen payload opgeslagen) |
| `output_summary` | korte, afgekorte samenvatting                  |
| `duration_ms`    | verstreken tijd                                |
| `api_key_id`     | aanroeper (kan leeg zijn)                      |
| `success`        | `1` / `0`                                      |
| `error_code`     | terminale foutcode bij een fout                |
| `created_at`     | ISO-tijdstempel                                |

### Request- en gebruikslogs

Dit zijn operationele telemetrie (geen strikt administratieve audit), maar ze
delen dezelfde bewaarpijplijn:

- `usage_history` — gebruiksoverzicht per request
- `call_logs` — volledig log per request (onderworpen aan een rijlimiet, zie hieronder)
- `proxy_logs` — proxyverkeerlog (onderworpen aan een rijlimiet)
- `request_detail_logs` — legacy gedetailleerd requestlog (wordt nog steeds opgeschoond indien aanwezig)

## Opslagschema

`audit_log` wordt bij het eerste gebruik dynamisch aangemaakt door `ensureAuditLogSchema()`:

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

Er worden indexen aangemaakt voor `timestamp`, `action`, `actor`, `resource_type`,
`status` en `request_id`. Ontbrekende kolommen in oudere databases worden indien
nodig toegevoegd via `ALTER TABLE`.

## Bewaartermijnen en opschoning

Er worden twee afzonderlijke bewaartermijnen gehanteerd:

| Omgevingsvariabele          | Standaard | Van toepassing op                                                 |
| --------------------------- | --------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`       | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`       | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`  | Limiet op het aantal rijen voor `call_logs`                       |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`  | Limiet op het aantal rijen voor `proxy_logs`                      |

`cleanupExpiredLogs()` voert de opschoning op basis van de bewaartermijnen uit. Deze functie wordt bij het opstarten van de server
aangeroepen vanuit `src/instrumentation-node.ts`. Bij elke uitvoering wordt een
`compliance.cleanup`-auditgebeurtenis vastgelegd met het aantal verwijderde rijen per tabel. Het inkorten van proxy-/aanroeplogboeken
wordt in batches uitgevoerd (`BATCH_SIZE = 5000`) om langdurige schrijfvergrendelingen te voorkomen.

Handmatige opschoning van de aanvraaggeschiedenis staat los van de bewaartermijnen. De pagina Aanvraaglogboeken
roept `POST /api/settings/purge-request-history` aan, waarmee `call_logs`,
de verouderde `request_detail_logs` en lokale aanvraagartefacten onder
`${DATA_DIR}/call_logs/` worden verwijderd.

De standaardwaarden zijn gedefinieerd in `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` Opt-Out (per API sleutel)

API sleutels kunnen worden gemarkeerd, zodat hun downstream-gespreksverkeer niet wordt geregistreerd. De vlag bevindt zich in de `api_keys` tabel (`no_log INTEGER DEFAULT 0`) en wordt gespiegeld in een set in het geheugen voor hot-path-zoekopdrachten.

```bash
# Create a no-log key (management auth required)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Helpers (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — schakel het item in het geheugen in
- `isNoLog(apiKeyId)` — gecontroleerd op het verzoekpad; valt terug naar een leestijd van 30 seconden in de cache van `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (env, door komma's gescheiden) — vooraf geladen in de in-memory set tijdens het opstarten; handig als u de kolom niet rechtstreeks kunt schakelen

Administratieve auditgebeurtenissen (inloggen, providerwijzigingen, MCP tooloproepen, enz.) zijn dat wel** niet** beïnvloed door `noLog` — alleen verkeersregistratie per verzoek is uitgeschakeld.

### Opt-out per verzoek (`x-omniroute-no-log`)

Een client kan een enkel inferentieverzoek kiezen uit de persistentie van de payload zonder een speciale sleutel te maken. Stuur `x-omniroute-no-log: true` op verzoek (`1` en `yes` worden ook geaccepteerd, hoofdletterongevoelig). Het is van toepassing op elke chatfamilieroute die door de chathandler loopt: chatvoltooiingen, reacties, berichten, voltooiingen en het Gemini-compatibele pad. De call-log-rij wordt nog steeds geschreven met zijn tijdstempel, model, provider, status, duur en tokentellingen, maar `request_body`, `response_body`, verzoeksamenvattingen en pijplijnartefacten worden weggelaten.

De header is ORed met de sleutelvlag: een no-log-sleutel blijft no-log, ongeacht de header, en de header kan het loggen van een no-log-sleutel niet opnieuw inschakelen. De header wordt verwijderd voordat het verzoek stroomopwaarts wordt doorgestuurd.

Deze kop wel** niet** schakel Geheugenextractie of de semantische cache uit. Stuur `x-omniroute-no-memory: true` en `x-omniroute-no-cache: true` ernaast als het verzoek ook de inhoud in die subsystemen niet mag behouden.

## REST-API

| Endpoint                    | Methode | Beschrijving                                     | Auth       |
| --------------------------- | ------- | ------------------------------------------------ | ---------- |
| `/api/compliance/audit-log` | `GET`   | Gepagineerde beheerauditvermeldingen met filters | management |
| `/api/mcp/audit`            | `GET`   | Gepagineerde auditvermeldingen voor MCP-tools    | (open-sse) |
| `/api/mcp/audit/stats`      | `GET`   | Geaggregeerde MCP-auditstatistieken              | (open-sse) |

Er wordt momenteel geen eindpunt voor CSV-export meegeleverd — exporteer vanuit het dashboard of voer rechtstreeks query's uit op de SQLite-database.

### Query's uitvoeren op `/api/compliance/audit-log`

Ondersteunde queryparameters (allemaal optioneel; alle tekstfilters gebruiken overeenkomsten op basis van `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (of `resource_type`),
  `status`, `requestId` (of `request_id`)
- `from` / `since`, `to` / `until` — ISO-tijdstempels
- `limit` (standaard `50`, min. `1`, max. `500`)
- `offset` (standaard `0`, max. `10_000`)

Het antwoord is een JSON-array. Metagegevens voor paginering worden geretourneerd in headers:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Dashboard

Het dashboard maakt auditgegevens beschikbaar via **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). De pagina heeft twee tabbladen:

- **Compliance** (`ComplianceTab.tsx`) — beheerauditgebeurtenissen uit
  `/api/compliance/audit-log`. Filtert op gebeurtenistype, ernst (info / waarschuwing
  / kritiek, afgeleid van actie + status) en datumbereik. De ernst wordt
  aan de clientzijde berekend op basis van de actie- en statustekenreeksen.
- **MCP** (`McpAuditTab.tsx`) — audit van MCP-tools uit `/api/mcp/audit`, met
  filters op toolnaam en geslaagd/mislukt.

Beide tabbladen gebruiken paginering met paginagroottes van `50` (compliance) en `25` (MCP).

## Hulpfuncties voor providerreferenties

`src/lib/compliance/providerAudit.ts` biedt opmaakhulpfuncties die door de routes voor providerbeheer worden gebruikt wanneer deze referentiegebeurtenissen uitsturen:

- `summarizeProviderConnectionForAudit(connection)` — verwijdert `apiKey`,
  `accessToken`, `refreshToken`, `idToken` en
  `providerSpecificData.consoleApiKey` voordat de momentopname van de verbinding naar
  `details` wordt geschreven.
- `getProviderAuditTarget(connection)` — stelt een stabiele
  `"<provider>:<name|id>"`-tekenreeks samen voor het veld `target`.
- `extractProviderWarnings(...payloads)` — scant providerantwoorden op
  beleids-/veiligheidswaarschuwingen (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) en
  toont maximaal 5 treffers, elk ingekort tot 400 tekens.

## Best practices

- Markeer API-sleutels die persoonsgegevens verwerken (juridisch, medisch enz.) met `noLog: true`.
- Stem `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` af op uw
  bewaarbeleid. De standaardwaarden van 7 dagen zijn conservatief.
- Exporteer de audittabel buiten het platform (`sqlite3 dump`) met de frequentie
  die uw complianceprogramma vereist — er is geen ingebouwde archivering.
- Houd de aantallen `auth.login.failed` en `auth.login.locked` bij om
  brute-forceaanvallen te detecteren.
- Roep bij het toevoegen van nieuwe beheereindpunten `logAuditEvent({ ... })` aan met een stabiele
  actietekenreeks in de vorm `domain.verb.outcome` en geef de aanvraagcontext door via
  `getAuditRequestContext(request)`, zodat het IP-adres en de `requestId` automatisch
  worden vastgelegd.

## Zie ook

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — maskering van persoonsgegevens, promptinjectie
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — catalogus en bereiken van MCP-tools
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — volledige referentie voor omgevingsvariabelen
- Bron: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
