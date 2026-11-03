# OmniRoute MCP Server Documentation (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Modell Context Protocol server med 110 verktøy på tvers av ruting, cache, komprimering, minne, ferdigheter, proxy, pool, radar og kontekstkildeoperasjoner.
>
> Sannhetens kilde: `open-sse/mcp-server/server.ts` computes** 110 unike verktøy** med `countUniqueMcpTools()`: 45 kanoniske definisjoner (inkludert de seks CCR livssyklusverktøyene, agent-skills-trioen, `omniroute_radar_catalog`, og `omniroute_x_search`), pluss minne (3), ferdigheter (4), GitHub ferdigheter (3), pool (6), gamification (8), plugins (8), Notion (6), Obsidian (22), lokal komprimering (RT.K.on-verktøy)

## Installasjon

OmniRoute MCP er innebygd. Start det med:

```bash
omniroute --mcp
```

Eller via åpen SS-transport:

```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
```

HTTP transportene (`sse` / `streamable-http`, servert i prosess av dashbordserveren) er av som standard og var tidligere kun vekslende fra `/dashboard/mcp` siden. Fra og med v3.8.51 har CLI paritet:

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH den samme `mcpEnabled` (og eventuelt `mcpTransport`) innstillingen dashbordet veksler via `/api/settings`. `mcp restart` kaller `POST /api/mcp/restart`: den river ned aktive `sse`/`streamable-http` økter slik at neste forespørsel re-initialiseres rent, returnerer `409` hvis MCP er deaktivert, og `501` for `stdio` -transporten (stdio-klienter eier sin egen underprosess — det er ingen prosesshåndtak for å starte på nytt).

## Transporter

MCP serveren avslører tre transporter, alle støttet av den samme `createMcpServer()` fabrikken:

| Transportere      | Hvor                                        | Når du skal bruke                                           |
| :---------------- | :------------------------------------------ | :---------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | IDE -integrasjoner (Claude Desktop, Cursor, etc.)           |
| `sse`             | `POST/GET /api/mcp/sse` via `httpTransport` | Browser/agent klienter som trenger en hendelsesstrøm        |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | HTTP klienter med flere økter (`mcp-session-id` overskrift) |

Den aktive HTTP transporten (`sse` eller `streamable-http`) velges av `mcpTransport` innstillingen. Bytting av transporter stenger eksisterende økter på den andre transporten.

### Ekstern tilgang (manage-scope bypass)

`/api/mcp/*` er i LOCAL_ONLY nivået (`src/server/authz/routeGuard.ts`) — som standard bare loopback-verter (`localhost`, `127.0.0.1`, `::1`) kan nå det. Siden v3.8.2 kan ikke-loopback-klienter koble til hvis de presenterer en `Authorization: Bearer <api-key>` hvis nøkkel har `manage` omfanget. Dette er den eneste måten å nå den eksterne MCP serveren gjennom en tunnel, omvendt proxy eller offentlig vertsnavn.

```bash
# Grant manage scope: open the dashboard API Keys page and toggle
# "Management Access" on the key, or POST scopes:["manage"] when creating.

# Then connect from a remote MCP client:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

En ikke-administrerende nøkkel (eller ingen bærer) returnerer `403 LOCAL_ONLY`. Søskenprefikset `/api/cli-tools/runtime/*` er med hensikt NOT omgåbar — se [Route Guard Tiers — Administrer-omfang carve-out](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

### Opprinnelsesvalidering

Etter autentisering vil hver forespørsel om å `/api/mcp/*` — transportene og administrasjonsrutene som `status`, `tools`, `audit` og `restart` — ha sin `Origin` header validert, uansett oppringer (API nøkkel, CLI token, dashbordøkt eller anonym tilbakekobling med pålogging deaktivert). Dette er DNS-rebinding-beskyttelsen som MCP Streamable HTTP spesifikasjonen krever.

- **Ingen `Origin` header** → tillatt. OmniRoute CLI, SDK og IDE -klientene sender ikke en.
- **Tillatt `Origin`** → `localhost`, `127.0.0.1` eller `[::1]` på hvilken som helst port, eller OmniRoute egen offentlige opprinnelse: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, en pålitelig omvendt proxys videresendte opprinnelse (`OMNIROUTE_TRUST_PROXY`, bare når ingen base URL er satt), eller en direkte loopback/LAN IP vert. `Host` overskriften alene gjør aldri en opprinnelse pålitelig.
- **Enhver annen `Origin`, inkludert `null`** → `403` med en JSON-RPC-feiltekst: `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. En dashbordøkt som presenterer et gyldig CSRF token er fortsatt akseptert, som for andre dashbordskrivinger.

En nettleser MCP klient servert bak en omvendt proxy trenger `OMNIROUTE_PUBLIC_BASE_URL`; det er ingen tillatelsesliste for andre opprinnelser. CORS preflight (`OPTIONS`) er ikke opprinnelsessjekket; forespørselen som følger er.

## IDE -konfigurasjon

Se [MCP Client Configuration](../guides/SETUP_GUIDE.md#mcp-client-configuration) for Claude Desktop, Cursor, Cline og kompatibel MCP -klientoppsett.

---

## Viktige verktøy (14) — Fase 1

| Verktøy                         | Omfang                | Beskrivelse                                                                                                                     |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_get_health`          | `read:health`         | Oppetid, minne, strømbrytere, hastighetsgrenser, cachestatistikk                                                                |
| `omniroute_list_combos`         | `read:combos`         | Alle konfigurerte kombinasjoner med strategier (valgfrie beregninger)                                                           |
| `omniroute_get_combo_metrics`   | `read:combos`         | Ytelsesberegninger for en bestemt kombinasjon                                                                                   |
| `omniroute_switch_combo`        | `write:combos`        | Aktiver eller deaktiver en kombinasjon                                                                                          |
| `omniroute_create_combo`        | `write:combos`        | Lag en validert kombinasjon gjennom den eksisterende kombinasjonen API                                                          |
| `omniroute_check_quota`         | `read:quota`          | Quota used/total, prosent gjenværende, tilbakestillingstid, token-helse                                                         |
| `omniroute_route_request`       | `execute:completions` | Send en chatfullføring gjennom OmniRoute ruting                                                                                 |
| `omniroute_cost_report`         | `read:usage`          | Kostnadsrapport etter periode (session/day/week/month)                                                                          |
| `omniroute_list_models_catalog` | `read:models`         | Full modellkatalog med muligheter, status, priser                                                                               |
| `omniroute_radar_catalog`       | `read:radar`          | Lokal signert radarkatalog; valgfrie provider/family -filtre                                                                    |
| `omniroute_tool_search`         | `read:tools`          | Oppdag verktøy fra den registrerte MCP katalogen                                                                                |
| `omniroute_web_search`          | `execute:search`      | Nettsøk gjennom de konfigurerte søkeleverandørene. Ikke X/Twitter.                                                              |
| `omniroute_x_search`            | `execute:search`      | Søk X til og med xAI/SuperGrok, eller velg `xquik-search` for Xquik API resultater. Krever legitimasjon for den valgte backend. |
| `omniroute_web_fetch`           | `execute:search`      | Hent nettinnhold gjennom de konfigurerte henteleverandørene                                                                     |

## Avanserte verktøy (11) — Fase 2

| Verktøy                            | Omfang                               | Beskrivelse                                                                                        |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Tørrkjøringsrutingssimulering med reservetre                                                       |
| `omniroute_set_budget_guard`       | `write:budget`                       | Øktbudsjett med degrade/block/alert -handling                                                      |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Oppdater kombinasjonsstrategi ved kjøring (priority/weighted/auto/etc.)                            |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Bruk `aggressive` / `balanced` / `conservative` forhåndsinnstilling for motstandskraft             |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Livetest av hver leverandør i en kombinasjon ved hjelp av en ekte oppstrømssamtale                 |
| `omniroute_get_provider_metrics`   | `read:health`                        | Beregninger per leverandør med p50/p95/p99 -latens og strømbrytertilstand                          |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Anbefal kombinasjon etter oppgavetype med budget/latency begrensninger                             |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Forklar hvorfor en forespørsel ble rutet til en leverandør (poengfaktorer + fallbacks)             |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Øyeblikksbilde av hele økten: kostnad, tokens, topp models/providers, feil, budsjettvakt           |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnostiser (og eventuelt autoreparer) databasedrift som ødelagte combo refs / foreldreløse rader |
| `omniroute_sync_pricing`           | `pricing:write`                      | Synkroniser prisdata fra eksterne kilder (LiteLLM); støtter `dryRun`                               |

## Bufferverktøy (2)

| Verktøy                 | Omfang        | Beskrivelse                                           |
| :---------------------- | :------------ | :---------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Semantisk cache, prompt-cache og idempotensstatistikk |
| `omniroute_cache_flush` | `write:cache` | Skyll cache globalt eller med signature/model         |

## Komprimeringsverktøy (13)

| Verktøy                             | Omfang              | Beskrivelse                                                                                                                                 |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | Komprimeringsinnstillinger, analysesammendrag og hurtigbufferbevisst statistikk (inkluderer `analytics.mcpDescriptionCompression` metadata) |
| `omniroute_compression_configure`   | `write:compression` | Konfigurer komprimeringsmodus, terskel, målforhold, systembevaring, MCP -beskrivelseskomprimering                                           |
| `omniroute_set_compression_engine`  | `write:compression` | Velg den aktive motoren (off/caveman/rtk/stacked) og Caveman/RTK -intensiteten                                                              |
| `omniroute_list_compression_combos` | `read:compression`  | Liste navngitte kompresjonskombinasjoner og deres motorrørledninger                                                                         |
| `omniroute_compression_combo_stats` | `read:compression`  | Analytics gruppert etter kompresjonskombinasjon og motor                                                                                    |
| `omniroute_ccr_store`               | `write:compression` | Lagre oppringerisolert innhold i den begrensede CCR -butikken i minnet og returner en markør pluss `ccr://` referanse                       |
| `omniroute_ccr_retrieve`            | `read:compression`  | Hent CCR innhold i sin helhet eller med hode-, hale-, linjer-, grep- og statistikkmoduser                                                   |
| `omniroute_ccr_inspect`             | `read:compression`  | Inspiser anroper-eide CCR metadata uten å returnere innhold                                                                                 |
| `omniroute_ccr_list`                | `read:compression`  | List paginerte metadata for anroper-eide CCR blokker                                                                                        |
| `omniroute_ccr_delete`              | `write:compression` | Slett en anroper-eid CCR blokk                                                                                                              |
| `omniroute_ccr_stats`               | `read:compression`  | Rapporter minnebruk med ringeromfang, livssyklustellere og lagringsgrenser                                                                  |
| `omniroute_rtk_discover`            | `read:compression`  | Oppdag tilbakevendende støy i opt-in RTK -utgangsprøver                                                                                     |
| `omniroute_rtk_learn`               | `read:compression`  | Generer et utkast til RTK -filter som kan gjennomgås fra eksempler på opt-in                                                                |

CCR oppføringer er kun i minnet og forsvinner ved omstart. Hver blokk er begrenset til 2 MiB, hver hovedstol til 16 MiB, og den globale butikken til 64 MiB. Oppføringer er standard til en 24-timers TTL (maksimalt syv dager). Full MCP henting er begrenset til 256 KiB; større blokker forblir tilgjengelige gjennom ranged- og grep-modusene. Lagring, henting, oppføring, inspeksjon, sletting og statistikk isoleres av den autentiserte API-nøkkelen. Revisjonsposter inneholder hash- og størrelsesmetadata, aldri innhold.

`omniroute_compression_status` rapporterer MCP -beskrivelseskomprimering separat under `analytics.mcpDescriptionCompression`. Disse verdiene er metadatastørrelsesestimater for MCP listebare beskrivelser (`tools`, `prompts`, `resources` og `resourceTemplates`); de er ikke leverandørbrukskvitteringer og er merket med `source: "mcp_metadata_estimate"`.

### MCP Accessibility Tree Filter (v3.8.0)

Atskilt fra komprimeringsverktøyene ovenfor inkluderer OmniRoute et post-utførelsesfilter som komprimerer** verktøyresultater** av MCP browser/accessibility -verktøy før de returneres til agenten. Dette filteret er ikke i seg selv et verktøy — det kjører transparent på alle verktøyresultater som inneholder detaljert tilgjengelighetstre eller nettleser-øyeblikksbildetekst (≥ 2000 tegn).

Nøkkelatferd:

- Skjuler ≥ 30 påfølgende gjentatte søskenlinjer til head + hale-sammendrag
- Bevarer `[ref=eXX]` -ankre som kreves av Playwright/computer-use
- Hard-trunkerer overdimensjonert tekst (> 50 000 tegn) med et navigasjonstips
- Forventet besparelse:** 60–80 %** på nyttelaster for øyeblikksbilder i nettleseren

Konfigurasjon: `compression.mcpAccessibility` i globale innstillinger (migrering 056). Implementering: `open-sse/services/compression/engines/mcpAccessibility/`. Fullstendige dokumenter: [Kompresjonsmotorer — MCP Accessibility Tree Filter](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Se [kompresjonsmotorer](../compression/COMPRESSION_ENGINES.md) og [RTK -komprimering](../compression/RTK_COMPRESSION.md) for kjøretidskomprimeringsmodellen bak disse verktøyene.

## 1 Proxy-verktøy (3)

| Verktøy                     | Omfang         | Beskrivelse                                                                           |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Hent gratis proxyer fra 1proxy-markedsplassen (protocol/country/quality/limit filtre) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Få neste tilgjengelige proxy etter strategi (`random` / `quality` / `sequential`)     |
| `omniroute_oneproxy_stats`  | `read:proxies` | Poolstatistikk, synkroniseringsstatus, distribusjon etter protokoll og land           |

## Minneverktøy (3)

Definert i `open-sse/mcp-server/tools/memoryTools.ts`. Auth/scope håndheves gjennom standard MCP scope pipeline.

| Verktøy                   | Omfang         | Beskrivelse                                                                                |
| :------------------------ | :------------- | :----------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Søk i minner etter spørring / type / API -nøkkel med token-budsjetthåndhevelse             |
| `omniroute_memory_add`    | `write:memory` | Legg til en ny minneoppføring (`factual` / `episodic` / `procedural` / `semantic`)         |
| `omniroute_memory_clear`  | `write:memory` | Tøm minner for en API nøkkel, eventuelt filtrert etter type eller `olderThan` -tidsstempel |

## Ferdighetsverktøy (4)

Definert i `open-sse/mcp-server/tools/skillTools.ts`. Støttet av `src/lib/skills/registry` + `src/lib/skills/executor`.

| Verktøy                       | Omfang           | Beskrivelse                                                                                            |
| :---------------------------- | :--------------- | :----------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | List opp registrerte ferdigheter med valgfri filtrering etter API nøkkel, navn eller aktivert tilstand |
| `omniroute_skills_enable`     | `write:skills`   | Aktiver eller deaktiver en spesifikk ferdighet av ID                                                   |
| `omniroute_skills_execute`    | `execute:skills` | Utfør en ferdighet med gitte input og returner utførelsesposten                                        |
| `omniroute_skills_executions` | `read:skills`    | List opp siste ferdighetsutførelseshistorikk                                                           |

## Notion kontekstkilde (6)

Definert i `open-sse/mcp-server/tools/notionTools.ts`. Token lagret i `key_value` tabellen via `src/lib/db/notion.ts`. REST klient i `src/lib/notion/api.ts`. Innstillinger API i `src/app/api/settings/notion/route.ts`. Dashboard UI i `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Konfigurer Notion integrasjonstokenet ditt fra** Kontekstkilder** fanen i Endpoint-dashbordet, eller via REST API:

```bash
# Set token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Check status
curl http://localhost:20128/api/settings/notion

# Disconnect
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Verktøy                      | Omfang         | Beskrivelse                                                              |
| :--------------------------- | :------------- | :----------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Fulltekstsøk på tvers av alle sider og databaser                         |
| `notion_get_page`            | `read:notion`  | Få en side av ID med dens egenskaper                                     |
| `notion_list_block_children` | `read:notion`  | List opp de underordnede blokkene til en side eller blokk                |
| `notion_query_database`      | `read:notion`  | Spør etter en database med filtre, sorteringer og paginering             |
| `notion_get_database`        | `read:notion`  | Få databaseskjema av ID                                                  |
| `notion_append_blocks`       | `write:notion` | Legg til barneblokker til en overordnet blokk (maks 100 per forespørsel) |

## Verktøy for agentferdighetskatalog (3)

Definert i `open-sse/mcp-server/tools/agentSkillTools.ts`. Støttet av `src/lib/agentSkills/catalog`. Disse verktøyene viser dokumentasjonskatalogen med 45 oppføringer for agentferdigheter for MCP klienter og eksterne agenter. Omfang: `read:catalog`.

| Verktøy                           | Omfang         | Beskrivelse                                                                                                                          |
| :-------------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | List opp alle 45 agentferdigheter med valgfrie `category` (api\| cli) og `area` filtre; returnerer metadata + -dekning               |
| `omniroute_agent_skills_get`      | `read:catalog` | Få full metadata + SKILL.md innhold for en enkelt ferdighet av canonical `id`                                                        |
| `omniroute_agent_skills_coverage` | `read:catalog` | Dekningsstatistikk: hvor mange av de 23 API, 21 CLI og 1 config ferdighetene har SKILL.md filer på filsystemet kontra katalogtotaler |

Se [AGENT-SKILLS.md](./AGENT-SKILLS.md) for hele katalogen og hvordan eksterne agenter bruker den.

## Relaterte rammer (v3.8.0)

MCP -verktøybeholdningen ovenfor (110 unike verktøy, beregnet av `countUniqueMcpTools()`) er med vilje beregnet på kjøretids routing/cache/compression/memory/skills/proxy/context-source operasjoner. To tilstøtende rammeverk leveres sammen med MCP serveren i v3.8.0 og er dokumentert separat:

### Skyagenter

Cloud-agenter er ut-av-prosess AI kodingsagenter (codex-cloud, cursor-cloud, devin, jules) koblet til OmniRoute gjennom den samme tilkoblingsmodellen som brukes for LLM leverandører. De blir eksponert via sin egen REST overflate (`/api/v1/agents/*`) og er** ikke** en del av MCP -verktøykatalogen — som kaller en Cloud Agent bruker ikke et MCP omfang.

- Implementering: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Livssyklus: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentasjon: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Rekkverk

Rekkverk er pre/post-execution filtre (vision-bridge, pii-masker, prompt-injection) påført inne i chat-rørledningen. De kjører før MCP tool/route laget nås og sender ut strukturerte brudd på revisjonsrørledningen; de er ikke påberopt som MCP verktøy.

- Implementering: `src/lib/guardrails/`.
- Dokumentasjon: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Når du feilsøker et MCP -anrop som ser ut til å være blokkert, sjekk både MCP -revisjonsloggen (`scope_denied:*` oppføringer) og guardrails revisjonsspor — en forespørsel kan bli avvist av et autovern** før** den når noen gang håndhevingslaget for MCP -omfanget.

---

## REST API endepunkter

| Endepunkt              | Metode                | Beskrivelse                                                                                              | Auth                    |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------- | :---------------------- |
| `/api/mcp/status`      | `GET`                 | Serverstatus: hjerteslag, HTTP transporttilstand, sammendrag av revisjonsaktivitet                       | Ledelse (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Verktøykatalog (navn, beskrivelse, omfang, fase, kildeendepunkter)                                       | Ledelse                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE transportendepunkt (gated av `mcpEnabled` + `mcpTransport === "sse"`)                                | API key + scopes        |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streambar HTTP -transport (bruker `mcp-session-id` header; `DELETE` avslutter økten)                     | API key + scopes        |
| `/api/mcp/audit`       | `GET`                 | Revisjonsloggoppføringer fra `mcp_tool_audit` (filtre: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Ledelse                 |
| `/api/mcp/audit/stats` | `GET`                 | Samlet revisjonsstatistikk (`totalCalls`, `successRate`, `avgDurationMs`, toppverktøy)                   | Ledelse                 |

Kildefiler: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Både SSE og streambare HTTP transporter er blokkert til MCP serveren er aktivert i Innstillinger (`mcpEnabled`) og riktig `mcpTransport` er valgt. Hvis feil transport er konfigurert, returnerer ruten HTTP 400 med et hint om å bytte innstillinger.

---

## Autentisering og omfang

MCP -verktøyet kaller leseomfangsstrenger fra den som ringer. Denne sjekken er en av tre uavhengige navneområder. En pasning fra en brikke er ikke en pasning fra de andre. Reglene er [navneområder med tre omfang](#three-scope-namespaces). Verktøykatalogen er [MCP tool scopes](#mcp-tool-scopes).

### Tre omfangsnavneområder

`manage` på en API nøkkel, `read:compression` på et MCP verktøy og `read` på et `oma_live_…` tilgangstoken er tre forskjellige tildelinger. Innringere som sender et `read` -tilgangstoken til en muterende administrasjonsrute, får HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Denne rangeringen er `scopeSatisfies`. Den konsulterer ikke MCP tabellen, og MCP matcheren konsulterer den ikke.

| Navneområde              | Legitimasjon                                                                | Checker                         | Et pass tillater                                            |
| :----------------------- | :-------------------------------------------------------------------------- | :------------------------------ | :---------------------------------------------------------- |
| API-nøkkeladministrasjon | `api_keys.scopes`                                                           | `hasManageScope`                | Management REST for den bærernøkkelen                       |
| API-nøkkeladditiv        | samme array, én nøyaktig streng                                             | hjelperen som er nevnt nedenfor | Bare den ene evnen                                          |
| MCP verktøyskoper        | samme array, else MCP `_meta` (bare HTTP/SSE ), else `OMNIROUTE_MCP_SCOPES` | `scopeMatches`                  | Det verktøyet, når håndhevelsen er på                       |
| Tilgangstoken            | `oma_live_…`                                                                | `scopeSatisfies`                | Forvaltningsruten hvis metode og vei krever den rangeringen |

Minting av hver legitimasjon er dekket i [Management Authentication](../guides/MANAGEMENT-AUTH.md).

#### API-nøkkelomfang

En `api_keys.scopes` matrise mater to jobber. De bruker forskjellige funksjoner.

**Ledelse REST.** `manage` og `admin` er medlemmene av `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`). `hasManageScope` er det som autoriserer administrasjonsruter for den nøkkelen. `admin` er administrasjonsdyktig på disse rutene. Ordet `admin` her er ikke rangering av tilgangstoken, og det utvides ikke til MCP verktøyomfang.

**Additive strenger.** Hver av dem er en eksakt medlemskapstest, og hver og en holder seg utenfor `MANAGEMENT_API_KEY_SCOPES`.

| Omfang                         | Et pass tillater                                                                                                                                                                |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mcp:connect`                  | Den ikke-loopback `/api/mcp/` LOCAL_ONLY carve-out kun (`hasMcpConnectOrManageScope`). En nøkkel med `manage` eller `admin` passerer fortsatt denne utskjæringen.               |
| `self:usage`                   | `GET /api/v1/me/status` for denne nøkkelen (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` legger til dette omfanget på create (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Oppstrøms kontokvoter innenfor den statusnyttelasten (`src/lib/usage/apiKeySelfService.ts`). Statusruten krever fortsatt `self:usage`.                                          |
| `policy:bypass-provider-quota` | Denne nøkkelens slutningsanrop hopper over leverandørkvotepolicyen (`hasProviderQuotaBypassScope` in `src/sse/handlers/chat.ts`).                                               |

#### Matchende

Katalogen er tabellen under [MCP tool scopes](#mcp-tool-scopes). Ikke behandle `MCP_SCOPE_LIST` i `src/shared/constants/mcpScopes.ts` som den katalogen: det er det originale innskrevne undersettet. Senere verktøy erklærer ytterligere omfang ved siden av det (`read:notion`, `read:skills`, `read:local-corpus` og resten av tabellen).

`evaluateToolScopes` i `open-sse/mcp-server/scopeEnforcement.ts` tillater et anrop når hvert påkrevde omfang samsvarer med et gitt omfang:

- `*` matcher alle nødvendige omfang.
- Et gitt omfang som ender på `*` samsvarer med et påkrevd omfang som starter med prefikset før stjernen. `read:*` samsvarer `read:compression`.
- Hvert annet tildelt omfang samsvarer bare med den identiske nødvendige strengen.

En nøkkel hvis omfang er `["manage"]` mislykkes `scopeMatches` for `read:compression`. Det samme kallet mislykkes for `admin`, `mcp:connect`, `read` og `write` når disse er de eneste tildelte strengene. Det er ikke noe hierarki blant MCP verktøyomfang utover den etterfølgende `*`.

Håndheving er av med mindre `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (standard `false`). Mens den er av, tillater `evaluateToolScopes` samtalen og hopper over katalogen. Mens den er på, bruker HTTP bærernøkkelens `api_keys.scopes` som `authInfo` (se [Per-key HTTP scope binding](#per-key-http-scope-binding-7895) ). Når ingen nøkkelomfang løser seg, faller det tildelte settet gjennom til MCP `_meta` (belønnet kun for HTTP/SSE oppringere, innenfor en HTTP -authortkontekst; en stdio-anropers `_meta` ignoreres fordi klienten kontrollerer den og den har ingen identitet per oppringer), deretter `OMNIROUTE_MCP_SCOPES`.

#### Omfang med tilgangstoken

`oma_live_…` tokens (`src/lib/accessTokens/scopes.ts`) bærer `read`, `write` eller `admin`. `scopeSatisfies` er en rangering: `admin` dekker `write` og `read`, og `write` dekker `read`. Ukjente omfang dekker ingenting.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) sammenligner den rangeringen med `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` og `OPTIONS` krever `read`.
- Alle andre metoder krever `write`.
- Baner i `ADMIN_SCOPE_PREFIXES` krever `admin` for hver metode. `/api/mcp` er på den listen, så et `write` tilgangstoken kan fortsatt ikke kalle MCP HTTP overflaten.
- Baner i `ADMIN_MUTATION_PREFIXES` krever kun `admin` for mutasjoner.
- Baner i `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`) krever `admin` bare for mutasjoner, og bare på den nøyaktige banen — andre `/api/settings/*` -underruter beholder `write`.

`PATCH /api/keys/{id}` er en mutasjon og er ikke på disse admin-listene, så et `read` token mottar 403 `Access token scope 'read' is insufficient; 'write' required.` Et `write` eller `admin` -tilgangstoken tilfredsstiller den ruten. Et dashbord JWT, loopback CLI machine-id token og en API tast med `manage` eller `admin` tar andre grener og begrenses ikke av denne rangeringen.

Et tilgangstoken som passerer `scopeSatisfies` for `/api/mcp` har kun ryddet administrasjonsporten. Verktøykall kjører fortsatt `scopeMatches` mot API-nøkkelomfang. Rangeringen av tilgangstoken er ikke en inngang til `scopeMatches`.

### MCP verktøyskoper

Håndheving av omfang er sentralisert i `open-sse/mcp-server/scopeEnforcement.ts`. Hvert verktøy krever spesifikke omfang:

| Omfang                | Verktøy                                                                                                                                                                       |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                             |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                     |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                        |
| `read:quota`          | `check_quota`                                                                                                                                                                 |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                        |
| `read:models`         | `list_models_catalog`                                                                                                                                                         |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                 |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                         |
| `write:budget`        | `set_budget_guard`                                                                                                                                                            |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                   |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                |
| `read:cache`          | `cache_stats`                                                                                                                                                                 |
| `write:cache`         | `cache_flush`                                                                                                                                                                 |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                    |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                             |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                         |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                              |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                        |
| `read:memory`         | `memory_search`                                                                                                                                                               |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                  |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                            |
| `write:skills`        | `skills_enable`                                                                                                                                                               |
| `execute:skills`      | `skills_execute`                                                                                                                                                              |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                              |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                       |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                     |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                              |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                            |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                               |
| `read:obsidian`       | 13 leseverktøy — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 skriveverktøy — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …              |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                             |

Wildcard-omfang støttes: `read:*` gir alle lese-omfang, `*` gir full tilgang.

### `mcp:connect` — evne til smal rute (#7895)

Å nå HTTP/SSE MCP transporten (`/api/mcp/*`) fra ikke-loopback krever `/api/mcp/` LOCAL_ONLY -carve-out (se `docs/security/ROUTE_GUARD_TIERS.md`). Historisk sett aksepterte denne utskjæringen bare en full `manage`/`admin` -scope API -tast — for bred for en oppringer som bare trenger å snakke MCP. `src/shared/constants/managementScopes.ts` eksporterer nå `MCP_CONNECT_SCOPE = "mcp:connect"`: et additiv, smalt omfang (samme presedens som `SELF_USAGE_SCOPE`) som autoriserer ONLY `/api/mcp/` -bypass i `src/server/authz/policies/management.ts` — den gir ingen annen administrasjonsrutetilgang og holdes bevisst OUT av `MANAGEMENT_API_KEY_SCOPES`. En nøkkel som holder `manage`/`admin` passerer fortsatt carve-out uendret; `mcp:connect` er et alternativ med lavere privilegier for eksterne MCP-anropere, sjekket via `hasMcpConnectOrManageScope()`.

### Per nøkkel HTTP -omfangsbinding (#7895)

Over HTTP/SSE løser `open-sse/mcp-server/httpTransport.ts` nå anroperens virkelige `api_keys.scopes` via `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) og sender den til MCP SDK `transport.handleRequest(req, { authInfo })`, slik at `extra.authInfo.scopes` når hvert verktøykall reflekterer bærernøkkelens egne omfang. `scopeEnforcement.ts` sin `resolveCallerScopeContext()` har allerede prioritert `authInfo` over `_meta` og `OMNIROUTE_MCP_SCOPES` env fallback — dette fyller bare den første, høyest prioriterte kilden, som tidligere ikke var matet over HTTP. Når ingen API nøkkel løses (ingen overskrift, ugyldig nøkkel), forblir `authInfo` `undefined` og oppløsningen faller gjennom den eksisterende `meta`/env-kjeden uendret. stdio har ingen identitet per innringer (se `mcpCallerIdentity.ts`) og er upåvirket av per-nøkkel-binding — den hopper over `_meta` trinnet (`_meta` respekteres bare innenfor en HTTP authortkontekst, #15159) og løses fra `OMNIROUTE_MCP_SCOPES` env-nøkkelen alene.

**Håndhevelse tvinges til for HTTP/SSE -oppringere med smale områder uavhengig av `OMNIROUTE_MCP_ENFORCE_SCOPES`.** `OMNIROUTE_MCP_ENFORCE_SCOPES` som standard til `false` er bare trygt for local/stdio -en-operatorflyten, der det ikke er noen per-oppringer-identitet å sikte mot. `open-sse/mcp-server/server.ts::withScopeEnforcement()` slår på ubetinget håndheving av per-verktøy-omfang (`shouldForceScopeEnforcement()` in `scopeEnforcement.ts`) når `resolveCallerScopeContext()` løste `source === "authInfo"` (dvs. en ekte per-key HTTP autorisasjonsoverskrift, HTTP/SSE-only) AND den nøkkelen har ikke fullt `manage`/`admin` omfang. Dette lukker gapet der en nøkkel som holder ONLY det smale `mcp:connect` bypass-omfanget — dokumentert ovenfor som ikke autoriserer annet enn `/api/mcp/` LOCAL_ONLY carve-out — ellers kunne påkalle hvert MCP verktøy når en operatør aktivert remote/non-loopback MCP tilgang, ganske enkelt fordi `OMNIROUTE_MCP_ENFORCE_SCOPES` sender `false` som standard. En full `manage`/`admin` -tast over HTTP, og hver stdio/local -anroper, holder den eksisterende `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated atferden uendret.

---

## Miljøvariabler

| Variabel                                | Misligholde                           | Hensikt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :-------------------------------------- | :------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`              | Base URL MCP serveren bruker når den kaller OmniRoute intern APIs                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_API_KEY`                     | (tømme)                               | API -tast videresendt som `Authorization: Bearer` til interne API -anrop                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (bare `"true"` aktiverer det) | Når aktivert, avviser manglende omfang verktøykall og logger `scope_denied:<reason>` i revisjonsloggen. Enforcement er ALSO tvunget på uavhengig av dette flagget for en hvilken som helst HTTP/SSE oppringer løst fra en autorisasjonsoverskrift per nøkkel (`source === "authInfo"`) som mangler fullt `manage`/`admin` -omfang — f.eks. en nøkkel som bare holder det smale `mcp:connect` bypass-omfanget — slik at denne standarden bare er trygg for local/stdio -tilgangen for ekstern ikke-sløyfe-strøm, aldri tilbake. |
| `OMNIROUTE_MCP_SCOPES`                  | (tømme)                               | Kommaseparert godkjenningsliste over omfang som anses som "tilgjengelig" som standard (brukes når den som ringer ikke oppgir sine egne omfang)                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (deaktiver = på)                      | Når satt til `0/false/off/no`, deaktiverer MCP beskrivelseskomprimering ved registreringstidspunktet                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (deaktiver = på)                      | Alternativt alias for samme bryter som ovenfor                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                               | Avbryt budsjett for intern administrasjon (helse, motstandskraft, kombinasjoner, kvote, bruk)                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                               | Avbryt budsjett for humle som venter på en leverandør (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `MCP_TOOL_DENY`                         | (avsett = uten filter)                | Kommaseparerte verktøynavn for å slippe fra `tools/list` (verktøykardinalitetsreduksjon — se nedenfor)                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `MCP_TOOL_ALLOW`                        | (avsett = uten filter)                | Kommaseparerte verktøynavn å beholde utelukkende (tillatelseslistemodus — se nedenfor)                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `DATA_DIR`                              | `~/.omniroute`                        | Heartbeat-filen skrives til `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

---

## Beskrivelse Komprimering

MCP verktøy-, ledetekst- og ressursregistre kan komprimere beskrivelser på registration/list tidspunktet for å redusere metadatafotavtrykket som er utsatt for klienter (og dermed kostnadene for spørsmålskonteksten). Implementeringen lever i `open-sse/mcp-server/descriptionCompressor.ts` og er koblet til MCP serveren via `compressMcpRegistryMetadata` inne i `createMcpServer()`.

- Komprimering går over beskrivelsesteksten ved å bruke Caveman-regelsettet (`getRulesForContext("all", "full")`) med bevart blokkutvinning (kodespenn, inngjerdede blokker osv.) slik at strukturelt innhold ikke endres.
- Veksle per distribusjon via `compression.mcpDescriptionCompressionEnabled` verdien i `key_value` -innstillingstabellen (standard: aktivert) — eksponert i UI som** Analytics → MCP beskrivelseskomprimering** .
- Veksle prosess-omfattende via enten `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` eller `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Sanntidsstatistikk vises via `omniroute_compression_status` under `analytics.mcpDescriptionCompression` og merket `source: "mcp_metadata_estimate"` for å disambiguere fra reelle leverandørbrukskvitteringer.

---

## Verktøykardinalitetsreduksjon (F4.3)

Beskrivelseskomprimering krymper hvert verktøys metadata;** reduksjon av verktøykardinalitet** går ett skritt videre ved å redusere _hvor mange_ verktøy som i det hele tatt annonseres. Annonsering av færre verktøy i `tools/list` manifestet reduserer tokenkostnaden per forespørsel som kundens modell betaler for verktøykatalogen ("lag 5"-komprimering). Implementeringen er et rent, statsløst filter i `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), koblet inn i registreringssløyfen i `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Opt-in, av som standard.** Filteret kjører bare når minst én av to miljøvariabler er satt; med ingen av settene annonseres alle 110-verktøyene uendret.

| Variabel         | Modus                                                                                   |
| :--------------- | :-------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Svarteliste — -kommaseparerte verktøynavn som alltid slettes fra `tools/list`           |
| `MCP_TOOL_ALLOW` | Tillat-liste — kommaseparerte verktøynavn; bare disse overlever, alt annet blir droppet |

`deny` har prioritet over `allow`. Navn er kommadelt, trimmet, og tomme oppføringer ignoreres. Eksempler:

```bash
# Drop two tools from the catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Announce only the routing + quota tools (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Slik fjernes filtrerte verktøy:** registrering lykkes alltid; et verktøy profilen avviser er da `.disable()` d på MCP SDK håndtaket, så det vises aldri i `tools/list`, men ledningene forblir intakt (ren enable/disable, ingen omregistrering). Profilparseren er `readMcpToolProfileFromEnv(process.env)`, som returnerer `null` (ingen filtrering) når begge varene er tomme.

Den rikere `ToolProfile` formen bak `reduceToolManifest` støtter også scope-skjæringsfiltrering (`allowScopes`, med `read:*` -style wildcard-matching) og en deterministisk `maxTools` hette, men disse to knappene trenger hele manifestet ved registreringstidspunktet og er** ikke** eksponert gjennom miljøvariablene i dag (en `tools/list` -level krok er en sporet oppfølging). `estimateManifestTokens()` er tilgjengelig for å sammenligne manifest token-kostnaden før og etter reduksjon.

---

## Runtime Heartbeat

Stdio-transporten vedvarer liveness til `${DATA_DIR}/runtime/mcp-heartbeat.json` hvert 5. sekund. Dashbordet (`/api/mcp/status`) leser denne filen pluss PID liveness for å utlede `online`. HTTP transporterer rapporttilstand fra i-prosess `getMcpHttpStatus()` i stedet (ingen filskriving).

Hjerteslagsbildet inneholder:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## Revisjonslogging

Hvert verktøykall logges til SQLite `mcp_tool_audit` tabellen av `open-sse/mcp-server/audit.ts`:

- Verktøynavn, argumenter (hashed/truncated som per verktøy `auditLevel`), resultat
- Varighet i ms, success/failure flagg, feilmelding (når aktuelt)
- API nøkkelhash, tidsstempel
- Avslag på omfang logges som `scope_denied:<reason>` med listen over manglende omfang

Bruk dashbordet eller `/api/mcp/audit` og `/api/mcp/audit/stats` REST endepunktene for å inspisere nylige anrop.

---

## Filer

| Fil                                                                      | Hensikt                                                                   |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| `open-sse/mcp-server/server.ts`                                          | MCP server fabrikk, standard inngangspunkt, scoped verktøy registreringer |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Strømbar HTTP -transport (sesjonsadministrasjon)                    |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Verktøyomfangsevaluering og oppringeroppløsning                           |
| `open-sse/mcp-server/audit.ts`                                           | Revisjonslogging for verktøyanrop (`mcp_tool_audit`)                      |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio hjerteslagskriver (`mcp-heartbeat.json`)                            |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Beskrivelseskomprimering for verktøy / ledetekst / ressursregistre        |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod -skjemaer + verktøyregister (`MCP_TOOLS`, 45 oppføringer)             |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Fase 2 + cache + 1proxy verktøybehandlere                                 |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Håndtere av kompresjonsverktøy                                            |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definisjoner av minneverktøy (3 verktøy)                                  |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definisjoner av ferdighetsverktøy (4 verktøy)                             |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion kontekstkildeverktøydefinisjoner (6 verktøy)                       |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Gamification-verktøydefinisjoner (8 verktøy)                              |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Pluginregistrering og administrasjonsverktøy (8 verktøy)                  |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` endepunkt                                               |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` endepunkt                                                |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE transportvei                                           |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streambar HTTP -transportrute                           |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` revisjonsloggspørring                                    |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` aggregerte revisjonsberegninger                    |
| `src/lib/notion/api.ts`                                                  | Notion REST API klient (forsøk på nytt, tidsavbrudd, feilklassifisering)  |
| `src/lib/db/notion.ts`                                                   | Notion token persistens (`key_value` tabell)                              |
| `src/app/api/settings/notion/route.ts`                                   | Notion innstillinger API (GET/POST/DELETE)                                |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion token management UI                                                |
| `tests/unit/notion-api.test.ts`                                          | Notion API klienttester (7)                                               |
| `tests/unit/notion-tools.test.ts`                                        | Notion tools omfangshåndhevelsestester (10)                               |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB -modultester (3)                                                |
