# OmniRoute MCP Server Documentation (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Model Context Protocol server sa 110 alata za rutiranje, keš memoriju, kompresiju, memoriju, vještine, proxy, bazen, radar i operacije izvora konteksta.
>
> Izvor istine: `open-sse/mcp-server/server.ts` računa** 110 jedinstvenih alata** sa `countUniqueMcpTools()`: 45 kanonskih definicija (uključujući šest alata životnog ciklusa CCR, trio agent-skills, `omniroute_radar_catalog` i `omniroute_x_search`), plus memorija (3), vještine (4), GitHub vještine (3), pool (6), gamifikacija (8), dodaci (8), Notion (6), Obsidian dva alata za kompresiju (22), lokalni alati za kompresiju (22).

## Instalacija

OmniRoute MCP je ugrađen. Započnite sa:

```bash
omniroute --mcp
```

Ili putem otvorenog transporta:

```bash
# Streamable HTTP transport (default port 20128, in-process on the dashboard server)
# Client endpoint: http://localhost:20128/api/mcp/stream
# stdio: omniroute --mcp
```

HTTP transporti (`sse` / `streamable-http`, opslužuju se u procesu od strane servera kontrolne table) su podrazumevano isključeni i ranije su se mogli menjati samo sa `/dashboard/mcp` stranice. Od v3.8.51 CLI ima paritet:

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH isti `mcpEnabled` (i opciono `mcpTransport`) podešavanje kontrolne table se prebacuje preko `/api/settings`. `mcp restart` poziva `POST /api/mcp/restart`: ruši aktivne `sse`/`streamable-http` sesije tako da se sljedeći zahtjev ponovo inicijalizira čisto, vraća `409` ako je MCP onemogućen, i `501` za `stdio` transport (stdio klijenti posjeduju svoj vlastiti podproces — nema in-proces ručke za ponovno pokretanje).

## Prevozi

MCP server izlaže tri transporta, svi podržani od strane iste `createMcpServer()` fabrike:

| Transport         | Gdje                                          | Kada koristiti                                            |
| :---------------- | :-------------------------------------------- | :-------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`               | IDE integracije (Claude Desktop, Cursor, itd.)            |
| `sse`             | `POST/GET /api/mcp/sse` preko `httpTransport` | Browser/agent klijenti kojima je potreban stream događaja |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`             | HTTP klijenti sa više sesija (`mcp-session-id` zaglavlje) |

Aktivni HTTP transport (`sse` ili `streamable-http`) se bira postavkom `mcpTransport`. Prebacivanje transporta zatvara postojeće sesije na drugom transportu.

### Daljinski pristup (zaobilaznica za upravljanje opsegom)

`/api/mcp/*` je u LOCAL_ONLY nivou (`src/server/authz/routeGuard.ts`) — po defaultu samo hostovi povratne petlje (`localhost`, `127.0.0.1`, `::1`) mogu doći do njega. Od v3.8.2, klijenti bez povratne petlje mogu se povezati ako predstavljaju `Authorization: Bearer <api-key>` čiji ključ nosi `manage` opseg. Ovo je jedini način da se dođe do udaljenog MCP servera preko tunela, obrnutog proxyja ili javnog imena hosta.

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

Ključ bez upravljanja (ili bez nosioca) vraća `403 LOCAL_ONLY`. Prefiks brata `/api/cli-tools/runtime/*` je namjerno NOT zaobići — vidi [Nivoi zaštite rute — Izrezivanje opsega upravljanja](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

### Potvrda porekla

Nakon provjere autentičnosti, svaki zahtjev za `/api/mcp/*` — transport i rute upravljanja kao što su `status`, `tools`, `audit` i `restart` — ima potvrđeno `Origin` zaglavlje, bez obzira na pozivatelja (API ključ, CLI token, sesija na kontrolnoj tabli ili anonimna petlja sa onemogućenom prijavom). Ovo je zaštita od ponovnog povezivanja DNS-a koju zahtijeva specifikacija MCP Streamable HTTP.

- **Nema `Origin` zaglavlja** → dozvoljeno. Klijenti OmniRoute CLI, SDK i IDE ga ne šalju.
- **Dozvoljeno `Origin`** → `localhost`, `127.0.0.1` ili `[::1]` na bilo kojem portu, ili OmniRoute-ovo vlastito javno porijeklo: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, proslijeđeno porijeklo pouzdanog obrnutog proxyja (`OMNIROUTE_TRUST_PROXY`, samo kada nije postavljena baza URL ) ili direktni loopback/LAN IP host. Samo `Host` zaglavlje nikada ne čini izvor pouzdanim.
- **Bilo koji drugi `Origin`, uključujući `null`** → `403` s tijelom greške JSON-RPC: `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. Sesija kontrolne table koja predstavlja važeći CSRF token je i dalje prihvaćena, kao i za druge zapise na kontrolnoj tabli.

MCP klijent pretraživača koji služi iza obrnutog proxyja treba `OMNIROUTE_PUBLIC_BASE_URL`; ne postoji lista dozvoljenih za drugo porijeklo. CORS preflight (`OPTIONS`) nije provjeren porijekla; zahtjev koji slijedi je.

## IDE konfiguracija

Pogledajte [konfiguraciju MCP klijenta](../guides/SETUP_GUIDE.md#mcp-client-configuration) za Claude Desktop, Cursor, Cline i kompatibilno MCP podešavanje klijenta.

---

## Osnovni alati (14) — faza 1

| Alat                            | Opsegovi              | Opis                                                                                                                              |
| :------------------------------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Vrijeme rada, memorija, prekidači, ograničenja brzine, keš statistika                                                             |
| `omniroute_list_combos`         | `read:combos`         | Sve konfigurirane kombinacije sa strategijama (opcionalna metrika)                                                                |
| `omniroute_get_combo_metrics`   | `read:combos`         | metrika performansi za određenu kombinaciju                                                                                       |
| `omniroute_switch_combo`        | `write:combos`        | Aktivirajte ili deaktivirajte kombinaciju                                                                                         |
| `omniroute_create_combo`        | `write:combos`        | Kreirajte validiranu kombinaciju kroz postojeću kombinaciju API                                                                   |
| `omniroute_check_quota`         | `read:quota`          | Kvota used/total, preostali postotak, vrijeme resetiranja, zdravlje tokena                                                        |
| `omniroute_route_request`       | `execute:completions` | Pošaljite završetak razgovora putem OmniRoute rutiranja                                                                           |
| `omniroute_cost_report`         | `read:usage`          | Izvještaj o troškovima po periodu (session/day/week/month)                                                                        |
| `omniroute_list_models_catalog` | `read:models`         | Potpuni katalog modela sa mogućnostima, statusom, cijenama                                                                        |
| `omniroute_radar_catalog`       | `read:radar`          | Lokalni potpisani radarski katalog; opcioni provider/family filteri                                                               |
| `omniroute_tool_search`         | `read:tools`          | Otkrijte alate iz registrovanog MCP kataloga                                                                                      |
| `omniroute_web_search`          | `execute:search`      | Web pretraga preko konfigurisanih provajdera pretrage. Ne X/Twitter.                                                              |
| `omniroute_x_search`            | `execute:search`      | Pretražite X kroz xAI/SuperGrok ili odaberite `xquik-search` za Xquik API rezultate. Zahtijeva vjerodajnice za odabranu pozadinu. |
| `omniroute_web_fetch`           | `execute:search`      | Dohvatite web sadržaj putem konfiguriranih dobavljača preuzimanja                                                                 |

## Napredni alati (11) — faza 2

| Alat                               | Opsegovi                             | Opis                                                                                                                                       |
| :--------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulacija usmjeravanja na suho s rezervnim stablom                                                                                        |
| `omniroute_set_budget_guard`       | `write:budget`                       | Budžet sesije sa degrade/block/alert akcijom                                                                                               |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Ažurirajte kombiniranu strategiju u vrijeme izvođenja (priority/weighted/auto/etc.)                                                        |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Primijenite `aggressive` / `balanced` / `conservative` unaprijed postavljenu otpornost                                                     |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Test uživo svakog provajdera u kombinaciji koristeći pravi upstream poziv                                                                  |
| `omniroute_get_provider_metrics`   | `read:health`                        | metrika po provajderu sa p50/p95/p99 latencijom i stanjem prekidača                                                                        |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Preporučite kombinaciju prema tipu zadatka sa budget/latency ograničenjima                                                                 |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Objasnite zašto je zahtjev preusmjeren do provajdera (faktori bodovanja + backbacks)                                                       |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Snimak cijele sesije: cijena, tokeni, top models/providers, greške, čuvanje budžeta                                                        |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Dijagnosticirajte (i opciono automatski popravljajte) pomjeranje baze podataka poput pokvarenih kombiniranih referenci / siročestih redova |
| `omniroute_sync_pricing`           | `pricing:write`                      | Sinhronizacija podataka o cijenama iz vanjskih izvora (LiteLLM); podržava `dryRun`                                                         |

## Cache Alati (2)

| Alat                    | Opsegovi      | Opis                                                             |
| :---------------------- | :------------ | :--------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Semantička predmemorija, prompt-cache i statistika idempotencije |
| `omniroute_cache_flush` | `write:cache` | Ispraznite keš memoriju globalno ili putem signature/model       |

## Alati za kompresiju (13)

| Alat                                | Opsegovi            | Opis                                                                                                                                   |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Postavke kompresije, sažetak analitike i statistike svjesne predmemorije (uključuje `analytics.mcpDescriptionCompression` metapodatke) |
| `omniroute_compression_configure`   | `write:compression` | Konfigurirajte način kompresije, prag, ciljni omjer, očuvanje sistemskog prompta, prebacivanje kompresije opisa MCP                    |
| `omniroute_set_compression_engine`  | `write:compression` | Odaberite aktivni motor (off/caveman/rtk/stacked) i Caveman/RTK intenzitet                                                             |
| `omniroute_list_compression_combos` | `read:compression`  | Navedite imenovane kombinacije kompresije i njihove cijevi motora                                                                      |
| `omniroute_compression_combo_stats` | `read:compression`  | Analitika grupirana po kombo kompresiji i motoru                                                                                       |
| `omniroute_ccr_store`               | `write:compression` | Spremite sadržaj izolovan od pozivaoca u CCR skladište ograničene memorije i vratite marker plus `ccr://` referencu                    |
| `omniroute_ccr_retrieve`            | `read:compression`  | Preuzmi CCR sadržaj u cijelosti ili s načinima glave, repa, linija, grep i statistike                                                  |
| `omniroute_ccr_inspect`             | `read:compression`  | Pregledajte CCR metapodatke u vlasništvu pozivatelja bez vraćanja sadržaja                                                             |
| `omniroute_ccr_list`                | `read:compression`  | Navedite paginirane metapodatke za CCR blokove u vlasništvu pozivatelja                                                                |
| `omniroute_ccr_delete`              | `write:compression` | Izbrišite CCR blok u vlasništvu pozivaoca                                                                                              |
| `omniroute_ccr_stats`               | `read:compression`  | Izvještaj o korištenju memorije u opsegu pozivatelja, brojačima životnog ciklusa i ograničenjima pohrane                               |
| `omniroute_rtk_discover`            | `read:compression`  | Otkrijte ponavljajuću buku u izbornim RTK izlaznim uzorcima                                                                            |
| `omniroute_rtk_learn`               | `read:compression`  | Generirajte nacrt RTK filtera koji se može pregledati iz uzoraka za odabir                                                             |

CCR unosi koriste dvoslojnu pohranu: vrući nivo u memoriji podržan, na lokalnim vremenima izvođenja bez oblaka, trajnim SQLite slojem (`ccr_blocks`, uključeno po defaultu), tako da blok preživljava izbacivanje ili ponovno pokretanje dok njegov TTL ne ponestane — osim blokova preko 512 KB koji ostaju u vremenu izvođenja u oblaku. Svaki blok je ograničen na 2 MiB, svaki principal na 16 MiB, a globalno skladište na 64 MiB. Unosi su podrazumevani na 24-satni TTL (maksimalno sedam dana). Potpuno MCP preuzimanje je ograničeno na 256 KiB; veći blokovi ostaju dostupni kroz ranged i grep modove. Skladištenje, pronalaženje, listanje, inspekcija, brisanje i statistika su izolirani od strane ovlaštenog principala API ključa. Revizijski zapisi sadrže hasheve i metapodatke o veličini, a nikada sadržaj. Detalji okrenuti operateru (dva markera, preduslovi klijenta, `codemode:false`, opseg po alatu, paginacija i dijagnostička matrica) žive u [Compression Engines → Preduslovi / vodič za operatera](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup).

`omniroute_compression_status` prijavljuje kompresiju opisa MCP zasebno pod `analytics.mcpDescriptionCompression`. Te vrijednosti su procjene veličine metapodataka za MCP popisive opise (`tools`, `prompts`, `resources` i `resourceTemplates`); nisu priznanice o korištenju dobavljača i označene su sa `source: "mcp_metadata_estimate"`.

### MCP Filter stabla pristupačnosti (v3.8.0)

Odvojeno od gore navedenih alata za kompresiju, OmniRoute uključuje filter nakon izvršenja koji komprimira** rezultati alata** MCP browser/accessibility alata prije nego što se vrate agentu. Ovaj filter sam po sebi nije alat — on radi transparentno na bilo kojem rezultatu alata koji sadrži opširno stablo pristupačnosti ili tekst snimka pretraživača (≥ 2000 znakova).

Ključna ponašanja:

- Sažima ≥ 30 uzastopnih ponovljenih redova braće i sestara u glavni + rep sažetak
- Čuva `[ref=eXX]` sidra koja zahtijeva Playwright/computer-use
- Teško skraćuje preveliki tekst (> 50.000 znakova) s savjetom za navigaciju
- Očekivane uštede:** 60–80%** na korisnim podacima preglednika

Konfiguracija: `compression.mcpAccessibility` u globalnim postavkama (migracija 056). Implementacija: `open-sse/services/compression/engines/mcpAccessibility/`. Kompletni dokumenti: [Kompresijski motori — MCP Filter stabla pristupačnosti](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Pogledajte [Kompresijski motori](../compression/COMPRESSION_ENGINES.md) i [RTK kompresiju](../compression/RTK_COMPRESSION.md) za model kompresije u toku izvođenja koji stoji iza ovih alata.

## 1Proxy Alati (3)

| Alat                        | Opsegovi       | Opis                                                                                         |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Preuzmite besplatne proxy servere sa 1proxy tržišta (protocol/country/quality/limit filteri) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Nabavite sljedeći dostupni proxy po strategiji (`random` / `quality` / `sequential`)         |
| `omniroute_oneproxy_stats`  | `read:proxies` | Statistika bazena, status sinhronizacije, distribucija po protokolu i zemlji                 |

## Memorijski alati (3)

Definirano u `open-sse/mcp-server/tools/memoryTools.ts`. Auth/scope se provodi kroz standardni MCP cjevovod opsega.

| Alat                      | Opsegovi       | Opis                                                                                        |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_memory_search` | `read:memory`  | Pretražujte memorije po upitu / tipu / API ključu sa provođenjem token-budžeta              |
| `omniroute_memory_add`    | `write:memory` | Dodajte novi memorijski unos (`factual` / `episodic` / `procedural` / `semantic`)           |
| `omniroute_memory_clear`  | `write:memory` | Obrišite memorije za API ključ, opciono filtriran po tipu ili `olderThan` vremenskoj oznaci |

## Alati vještina (4)

Definirano u `open-sse/mcp-server/tools/skillTools.ts`. Podržava `src/lib/skills/registry` + `src/lib/skills/executor`.

| Alat                          | Opsegovi         | Opis                                                                                               |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Navedite registrirane vještine s opcijskim filtriranjem po API ključu, imenu ili omogućenom stanju |
| `omniroute_skills_enable`     | `write:skills`   | Omogućite ili onemogućite određenu vještinu pomoću ID                                              |
| `omniroute_skills_execute`    | `execute:skills` | Izvršite vještinu sa navedenim unosom i vratite zapis o izvršenju                                  |
| `omniroute_skills_executions` | `read:skills`    | Navedite nedavnu historiju izvršavanja vještina                                                    |

## Notion Izvor konteksta (6)

Definirano u `open-sse/mcp-server/tools/notionTools.ts`. Token pohranjen u `key_value` tablici preko `src/lib/db/notion.ts`. REST klijent u `src/lib/notion/api.ts`. Postavke API u `src/app/api/settings/notion/route.ts`. Kontrolna tabla UI u `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Konfigurirajte svoj Notion integracijski token iz** Izvori konteksta** karticu na kontrolnoj tabli Endpoint ili preko APIREST

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

| Alat                         | Opsegovi       | Opis                                                                 |
| :--------------------------- | :------------- | :------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Pretraživanje cijelog teksta na svim stranicama i bazama podataka    |
| `notion_get_page`            | `read:notion`  | Nabavite stranicu od ID sa svojim svojstvima                         |
| `notion_list_block_children` | `read:notion`  | Navedite podređene blokove stranice ili bloka                        |
| `notion_query_database`      | `read:notion`  | Upitajte bazu podataka sa filterima, sortiranjem i paginacijom       |
| `notion_get_database`        | `read:notion`  | Nabavite shemu baze podataka od strane ID                            |
| `notion_append_blocks`       | `write:notion` | Dodajte podređene blokove roditeljskom bloku (maks. 100 po zahtjevu) |

## Agent Skill Katalog Alati (3)

Definirano u `open-sse/mcp-server/tools/agentSkillTools.ts`. Uz podršku `src/lib/agentSkills/catalog`. Ovi alati izlažu katalog dokumentacije Agent Skills od 45 unosa MCP klijentima i vanjskim agentima. Opseg: `read:catalog`.

| Alat                              | Opsegovi       | Opis                                                                                                                                                      |
| :-------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Navedite svih 45 veština agenta sa opcionim `category` (api\| cli) i `area` filterima; vraća metapodatke + pokrivenost                                    |
| `omniroute_agent_skills_get`      | `read:catalog` | Dobijte pune metapodatke + SKILL.md sadržaja za jednu vještinu pomoću kanonskog `id`                                                                      |
| `omniroute_agent_skills_coverage` | `read:catalog` | Statistika pokrivenosti: koliko od 23 API, 21 CLI i 1 config vještina ima SKILL.md fajlove na sistemu datoteka u odnosu na ukupne vrijednosti iz kataloga |

Pogledajte [AGENT-SKILLS.md](./AGENT-SKILLS.md) za cijeli katalog i kako ga eksterni agenti koriste.

## Povezani okviri (v3.8.0)

Inventar MCP alata iznad (110 jedinstvenih alata, izračunatih pomoću `countUniqueMcpTools()`) je namjerno ograničen na routing/cache/compression/memory/skills/proxy/context-source operacije vremena izvođenja. Dva susjedna okvira se isporučuju zajedno sa MCP serverom u v3.8.0 i dokumentirani su zasebno:

### Cloud Agents

Cloud Agenti su AI agenti za kodiranje izvan procesa (codex-cloud, cursor-cloud, devin, jules) povezani u OmniRoute preko istog modela povezivanja koji se koristi za LLM provajdere. Oni su izloženi preko sopstvene REST površine (`/api/v1/agents/*`) i jesu** ne** dio kataloga MCP alata — koji poziva Cloud Agent ne troši MCP opseg.

- Implementacija: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Životni ciklus: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentacija: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Zaštitne ograde

Zaštitne ograde su pre/post-execution filteri (vision-bridge, pii-masker, prompt-injection) primijenjeni unutar chat pipelinea. Pokreću se prije nego što se dosegne sloj MCP tool/route i emituju strukturirana kršenja u cevovod revizije; oni se ne pozivaju kao MCP alati.

- Implementacija: `src/lib/guardrails/`.
- Dokumentacija: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Prilikom otklanjanja grešaka u MCP pozivu koji se čini blokiranim, provjerite i MCP dnevnik revizije (`scope_denied:*` unosi) i nadzorni trag zaštitnih ograda — zahtjev može biti odbijen od strane zaštitne ograde** prije** on ikada dostigne sloj za provođenje MCP opsega.

---

## REST API Krajnje tačke

| Krajnja tačka          | Metoda                | Opis                                                                                                    | Auth                       |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------ | :------------------------- |
| `/api/mcp/status`      | `GET`                 | Status servera: otkucaji srca, stanje transporta HTTP, sažetak aktivnosti revizije                      | menadžment (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Katalog alata (ime, opis, opseg, faza, izvorne krajnje tačke)                                           | Menadžment                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE transportna krajnja točka (odvojena `mcpEnabled` + `mcpTransport === "sse"`)                        | API ključ + opsega         |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamable HTTP transport (koristi `mcp-session-id` zaglavlje; `DELETE` završava sesiju)                | API ključ + opsega         |
| `/api/mcp/audit`       | `GET`                 | Unosi u dnevnik revizije iz `mcp_tool_audit` (filtri: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Menadžment                 |
| `/api/mcp/audit/stats` | `GET`                 | Zbirna statistika revizije (`totalCalls`, `successRate`, `avgDurationMs`, vrhunski alati)               | Menadžment                 |

Izvorni fajlovi: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

I SSE i Streamable HTTP transport su blokirani dok se MCP server ne omogući u Postavkama (`mcpEnabled`) i ne izabere odgovarajući `mcpTransport`. Ako je konfigurisan pogrešan transport, ruta vraća HTTP 400 sa nagovještajem za promjenu postavki.

---

## Autentifikacija i opseg

Pozivi alata MCP čitaju nizove opsega od pozivaoca. Ta provjera je jedan od tri nezavisna prostora imena. Dodavanje jednog dama nije dodavanje ostalih. Pravila su [Imenska prostora Tri opsega](#three-scope-namespaces). Katalog alata je [MCP tool scopes](#mcp-tool-scopes).

### Tri imenska prostora opsega

`manage` na API ključu, `read:compression` na MCP alatu i `read` na `oma_live_…` pristupnom tokenu su tri različite dodjele. Pozivaoci koji pošalju `read` pristupni token na mutirajuću rutu upravljanja dobijaju HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Taj rang je `scopeSatisfies`. Ne konsultuje MCP tabelu, a MCP matcher je ne konsultuje.

| Imenski prostor            | Credential                                                                 | Checker                | Propusnica dozvoljava                                  |
| :------------------------- | :------------------------------------------------------------------------- | :--------------------- | :----------------------------------------------------- |
| Upravljanje API ključevima | `api_keys.scopes`                                                          | `hasManageScope`       | Upravljanje REST za taj ključ nosioca                  |
| Dodatak za API ključ       | isti niz, jedan tačan niz                                                  | dolje naveden pomoćnik | Samo ta jedna sposobnost                               |
| MCP alata                  | isti niz, inače MCP `_meta` (samo HTTP/SSE ), inače `OMNIROUTE_MCP_SCOPES` | `scopeMatches`         | Taj alat, kada je izvršenje uključeno                  |
| Pristupni token            | `oma_live_…`                                                               | `scopeSatisfies`       | Ruta upravljanja čiji metod i put zahtijevaju taj rang |

Kovanje svakog akreditiva je pokriveno [Autentifikacijom upravljanja](../guides/MANAGEMENT-AUTH.md).

#### Opseg API-ključeva

Jedan `api_keys.scopes` niz hrani dva posla. Koriste različite funkcije.

**Management REST.** `manage` i `admin` su članovi `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`). `hasManageScope` je ono što ovlašćuje rute upravljanja za taj ključ. `admin` je sposoban za upravljanje na tim rutama. Riječ `admin` ovdje nije rang tokena pristupa i ne proširuje se na opseg MCP alata.

**Aditivni nizovi.** Svaki od njih je tačan test članstva, a svaki ostaje izvan `MANAGEMENT_API_KEY_SCOPES`.

| Obim                           | Propusnica dozvoljava                                                                                                                                                       |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Samo izrezivanje `/api/mcp/` LOCAL_ONLY bez petlje (`hasMcpConnectOrManageScope`). Ključ sa `manage` ili `admin` i dalje prolazi kroz to izrezivanje.                       |
| `self:usage`                   | `GET /api/v1/me/status` za ovaj ključ (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` dodaje ovaj opseg prilikom kreiranja (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Kvote upstream računa unutar tog statusnog tereta (`src/lib/usage/apiKeySelfService.ts`). Statusna ruta i dalje zahtijeva `self:usage`.                                     |
| `policy:bypass-provider-quota` | Pozivi zaključivanja ovog ključa preskaču politiku kvote dobavljača (`hasProviderQuotaBypassScope` u `src/sse/handlers/chat.ts`).                                           |

#### Matching

Katalog je tabela pod [MCP opsegom alata](#mcp-tool-scopes). Ne tretirajte `MCP_SCOPE_LIST` u `src/shared/constants/mcpScopes.ts` kao taj katalog: to je originalni podskup. Kasniji alati deklarišu dalje opsege pored njega (`read:notion`, `read:skills`, `read:local-corpus` i ostatak tabele).

`evaluateToolScopes` u `open-sse/mcp-server/scopeEnforcement.ts` dozvoljava poziv kada svaki traženi opseg odgovara nekom odobrenom opsegu:

- `*` odgovara svakom traženom opsegu.
- Dodijeljeni opseg koji se završava na `*` odgovara traženom opsegu koji počinje prefiksom prije zvijezde. `read:*` odgovara `read:compression`.
- Svaki drugi odobreni opseg odgovara samo identičnom traženom nizu.

Ključ čiji su opseg `["manage"]` ne uspijeva `scopeMatches` za `read:compression`. Isti poziv ne uspijeva za `admin`, `mcp:connect`, `read` i `write` kada su to jedini odobreni nizovi. Ne postoji hijerarhija među opsegima MCP alata izvan zadnjeg `*`.

Sprovođenje je isključeno osim ako `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (zadano `false`). Dok je isključen, `evaluateToolScopes` dozvoljava poziv i preskače katalog. Dok je uključen, HTTP koristi `api_keys.scopes` ključa nosioca kao `authInfo` (pogledajte [Vezanje opsega HTTP po ključu](#per-key-http-scope-binding-7895) ). Kada se nijedan opseg ključeva ne razriješi, odobreni skup pada na MCP `_meta` (poštiva se samo za HTTP/SSE pozivaoce, unutar HTTP auth konteksta; `_meta` stdio pozivatelja se zanemaruje jer ga klijent kontrolira i ne nosi identitet po pozivaocu), zatim `OMNIROUTE_MCP_SCOPES`.

#### Opsezi tokena pristupa

`oma_live_…` tokeni (`src/lib/accessTokens/scopes.ts`) nose `read`, `write` ili `admin`. `scopeSatisfies` je rang: `admin` pokriva `write` i `read`, a `write` pokriva `read`. Nepoznati dometi ne pokrivaju ništa.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) upoređuje taj rang sa `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` i `OPTIONS` zahtijevaju `read`.
- Svaka druga metoda zahtijeva `write`.
- Putanja u `ADMIN_SCOPE_PREFIXES` zahtijevaju `admin` za svaku metodu. `/api/mcp` je na toj listi, tako da `write` pristupni token još uvijek ne može pozvati MCP HTTP površinu.
- Putevi u `ADMIN_MUTATION_PREFIXES` zahtijevaju `admin` samo za mutacije.
- Putevi u `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`) zahtijevaju `admin` samo za mutacije, a samo na toj tačnoj stazi — druge `/api/settings/*` podrute zadržavaju `write`.

`PATCH /api/keys/{id}` je mutacija i nije na tim listama administratora, tako da `read` token prima 403 `Access token scope 'read' is insufficient; 'write' required.` `write` ili `admin` pristupni token zadovoljava tu rutu. Kontrolna tabla JWT, loopback CLI strojni id token i API ključ sa `manage` ili `admin` zauzimaju druge grane i nisu suženi ovim rangom.

Pristupni token koji prolazi `scopeSatisfies` za `/api/mcp` je očistio samo kapiju upravljanja. Pozivi alata i dalje pokreću `scopeMatches` protiv opsega API ključeva. Rang tokena pristupa nije ulaz za `scopeMatches`.

### MCP alata

Sprovođenje djelokruga je centralizirano u `open-sse/mcp-server/scopeEnforcement.ts`. Svaki alat zahtijeva određene opsege:

| Obim                  | Alati                                                                                                                                                                              |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                  |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                          |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                             |
| `read:quota`          | `check_quota`                                                                                                                                                                      |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                             |
| `read:models`         | `list_models_catalog`                                                                                                                                                              |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                      |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                              |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                 |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                        |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                     |
| `read:cache`          | `cache_stats`                                                                                                                                                                      |
| `write:cache`         | `cache_flush`                                                                                                                                                                      |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                         |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                  |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                              |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                   |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                             |
| `read:memory`         | `memory_search`                                                                                                                                                                    |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                       |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                 |
| `write:skills`        | `skills_enable`                                                                                                                                                                    |
| `execute:skills`      | `skills_execute`                                                                                                                                                                   |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                   |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                            |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                          |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                   |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                     |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                 |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                    |
| `read:obsidian`       | 13 alata za čitanje — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 alata za pisanje — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                  |

Podržani su džokerski opsezi: `read:*` odobrava sve opsege za čitanje, `*` daje puni pristup.

### `mcp:connect` — mogućnost uske rute (#7895)

Dostizanje HTTP/SSE MCP transporta (`/api/mcp/*`) iz bez petlje zahtijeva `/api/mcp/` LOCAL_ONLY izrezivanje (pogledajte `docs/security/ROUTE_GUARD_TIERS.md`). Istorijski gledano, to izdvajanje je prihvatalo samo pun `manage`/`admin` -scope API ključ — preširok za pozivaoca koji samo treba da govori MCP. `src/shared/constants/managementScopes.ts` sada izvozi `MCP_CONNECT_SCOPE = "mcp:connect"`: aditivni, uski opseg (isti presedan kao `SELF_USAGE_SCOPE`) koji ovlašćuje ONLY `/api/mcp/` zaobilaznicu u `src/server/authz/policies/management.ts` — ne daje nikakav drugi pristup ruti upravljanja i namjerno se čuva OUT od `MANAGEMENT_API_KEY_SCOPES`. Ključ koji drži `manage`/`admin` i dalje prolazi kroz izrezivanje nepromijenjen; `mcp:connect` je alternativa s nižim privilegijama za udaljene MCP-only pozivatelje, provjerava se putem `hasMcpConnectOrManageScope()`.

### Vezanje opsega HTTP po ključu (#7895)

Preko HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` sada rješava stvarni `api_keys.scopes` pozivaoca preko `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) i prosljeđuje ga MCP SDK-ovom `transport.handleRequest(req, { authInfo })`, tako da `extra.authInfo.scopes` dostigne svaki poziv alata odražava vlastite opsege ključa nosioca. `scopeEnforcement.ts`-ov `resolveCallerScopeContext()` je već dao prioritet `authInfo` nad `_meta` i `OMNIROUTE_MCP_SCOPES` env rezervnim — ovo samo popunjava taj prvi izvor najvišeg prioriteta, koji ranije nije bio napajan preko HTTP. Kada se nijedan API ključ ne riješi (bez zaglavlja, nevažeći ključ), `authInfo` ostaje `undefined` i rezolucija pada na postojeći `meta`/env lanac nepromijenjen. stdio nema identitet po pozivaocu (pogledajte `mcpCallerIdentity.ts`) i na njega ne utiče vezivanje po ključu — preskače `_meta` korak (`_meta` se poštuje samo unutar HTTP auth konteksta, #15159) i rješava se samo od `OMNIROUTE_MCP_SCOPES` env ključa.

**Sprovođenje je prisilno uključeno za HTTP/SSE pozivaoce uskog opsega bez obzira na `OMNIROUTE_MCP_ENFORCE_SCOPES`.** `OMNIROUTE_MCP_ENFORCE_SCOPES` zadani `false` je siguran samo za local/stdio tok sa jednim operatorom, gdje ne postoji identitet po pozivaocu koji bi trebao biti u opsegu. `open-sse/mcp-server/server.ts::withScopeEnforcement()` bezuslovno uključuje primjenu opsega po alatu (`shouldForceScopeEnforcement()` u `scopeEnforcement.ts`) kad `resolveCallerScopeContext()` razriješi `source === "authInfo"` (tj. pravo zaglavlje autorizacije HTTP po ključu, HTTP/SSE-only) AND taj ključ ne drži puni `manage`/`admin` opseg. Ovo zatvara prazninu u kojoj bi ključ koji drži ONLY uski `mcp:connect` zaobilazni opseg — dokumentiran gore kao autorizirajući ništa osim `/api/mcp/` LOCAL_ONLY izrezivanja — inače mogao pozvati svaki MCP alat kada operater omogući pristup remote/non-loopback MCP, jednostavno zato što `OMNIROUTE_MCP_ENFORCE_SCOPES` po defaultu isporučuje `false`. Potpuni `manage`/`admin` ključ preko HTTP i svaki stdio/local pozivalac, zadržava postojeće ponašanje `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated nepromijenjenim.

---

## Varijable okruženja

| Varijabilna                             | Default                              | Svrha                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :-------------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`             | Osnova URL koju MCP server koristi kada poziva OmniRoute interni APIs                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_API_KEY`                     | (prazno)                             | API ključ proslijeđen kao `Authorization: Bearer` internim API pozivima                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (samo `"true"` to omogućava) | Kada je omogućeno, nedostajući opsegi odbijaju pozive alata i zapisuju `scope_denied:<reason>` u dnevnik revizije. Provedba je ALSO prisiljena bez obzira na ovu zastavicu za bilo koji HTTP/SSE pozivalac riješen iz zaglavlja autorizacije po ključu (`source === "authInfo"`) kojem nedostaje puni `manage`/`admin` opseg — npr. ključ koji sadrži samo uski `mcp:connect` zaobilazni opseg — tako da je ovo zadano sigurno samo za local/stdio pristup s jednim operatorom, nikad ne-povratni pristup na daljinu. |
| `OMNIROUTE_MCP_SCOPES`                  | (prazno)                             | Lista dozvoljenih opsega odvojenih zarezima koji se podrazumevano smatraju "dostupnim" (koristi se kada pozivalac ne daje sopstvene opsege)                                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (poništi = uključeno)                | Kada je postavljeno na `0/false/off/no`, onemogućuje kompresiju opisa MCP u vrijeme registracije                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (poništi = uključeno)                | Alternativni alias za isti prekidač kao gore                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                              | Poništi budžet za čitanje internog upravljanja (zdravlje, otpornost, kombinacije, kvota, upotreba)                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                              | Poništi budžet za skokove koji čekaju na provajdera (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `MCP_TOOL_DENY`                         | (poništi = bez filtera)              | Nazivi alata odvojeni zarezima za izbacivanje iz `tools/list` (smanjenje kardinalnosti alata — vidi dolje)                                                                                                                                                                                                                                                                                                                                                                                                            |
| `MCP_TOOL_ALLOW`                        | (poništi = bez filtera)              | Imena alata odvojena zarezima za čuvanje isključivo (način liste dopuštenja — vidi dolje)                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `DATA_DIR`                              | `~/.omniroute`                       | Datoteka otkucaja srca je upisana u `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                                                                                                                                                                                          |

---

## Opis Kompresija

MCP alat, prompt i registri resursa mogu komprimirati opise u registration/list vremenu kako bi smanjili otisak metapodataka koji su izloženi klijentima (a samim tim i cijenu konteksta prompta). Implementacija živi u `open-sse/mcp-server/descriptionCompressor.ts` i spojena je na MCP server preko `compressMcpRegistryMetadata` unutar `createMcpServer()`.

- Kompresija prelazi preko teksta opisa pomoću skupa pravila Caveman (`getRulesForContext("all", "full")`) sa ekstrakcijom sačuvanih blokova (rasponi koda, ograđeni blokovi, itd.) tako da se strukturni sadržaj ne mijenja.
- Prebacite po-deployment preko vrijednosti `compression.mcpDescriptionCompressionEnabled` u tabeli postavki `key_value` (podrazumevano: omogućeno) — izložen u UI kao** Analitika → MCP kompresija opisa** .
- Prebacite cijeli proces putem `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` ili `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Statistika u realnom vremenu se pojavljuje preko `omniroute_compression_status` pod `analytics.mcpDescriptionCompression` i označava `source: "mcp_metadata_estimate"` kako bi se razdvojila od stvarnih potvrda o korištenju provajdera.

---

## Smanjenje kardinalnosti alata (F4.3)

Kompresija opisa smanjuje metapodatke svakog alata;** smanjenje kardinalnosti alata** ide korak dalje smanjenjem _koliko_ alata je uopće najavljeno. Oglašavanje manjeg broja alata u manifestu `tools/list` smanjuje trošak tokena po zahtjevu koji klijentov model plaća za katalog alata (kompresija "sloja 5"). Implementacija je čisti filter bez stanja u `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), povezan u registracionu petlju u `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Omogući, podrazumevano isključeno.** Filter se pokreće samo kada je postavljena barem jedna od dvije varijable okruženja; sa nijednim setom, svih 110 alata je najavljeno nepromijenjeno.

| Varijabilna      | Mode                                                                                      |
| :--------------- | :---------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Crna lista — naziva alata razdvojenih zarezima koji se uvijek izbacuju iz `tools/list`    |
| `MCP_TOOL_ALLOW` | Dozvoli lista — imena alata odvojenih zarezima; samo ovi opstaju, sve ostalo je napušteno |

`deny` ima prioritet nad `allow`. Imena su razdvojena zarezima, skraćena, a prazni unosi se zanemaruju. primjeri:

```bash
# Drop two tools from the catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Announce only the routing + quota tools (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Kako se uklanjaju filtrirani alati:** registracija je uvijek uspješna; alat koji profil odbija je tada `.disable()` d na MCP SDK ručki, tako da se nikada ne pojavljuje u `tools/list`, ali ožičenje ostaje netaknuto (čist enable/disable, bez ponovne registracije). Parser profila je `readMcpToolProfileFromEnv(process.env)`, koji vraća `null` (bez filtriranja) kada su oba vars-a prazna.

Bogatiji `ToolProfile` oblik iza `reduceToolManifest` također podržava filtriranje opsega-presjeka (`allowScopes`, sa `read:*` -style podudaranjem zamjenskih znakova) i determinističku `maxTools` kapu, ali ta dva gumba trebaju puni manifest u vrijeme registracije i** ne** izloženi kroz varijable okruženja danas ( `tools/list` -level kuka je praćenje praćeno). `estimateManifestTokens()` je dostupan za upoređivanje troškova manifesta tokena prije i nakon smanjenja.

---

## Runtime Heartbeat

stdio transport nastavlja da živi do `${DATA_DIR}/runtime/mcp-heartbeat.json` svakih 5 sekundi. Kontrolna tabla (`/api/mcp/status`) čita ovu datoteku plus PID živost da izvede `online`. HTTP umjesto toga prenosi stanje izvještaja iz `getMcpHttpStatus()` u procesu (bez pisanja datoteke).

Snimak otkucaja srca sadrži:

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

## Zapisivanje revizije

Svaki poziv alata se evidentira u SQLite `mcp_tool_audit` tablicu od strane `open-sse/mcp-server/audit.ts`:

- Ime alata, argumenti (hashed/truncated kao po alatu `auditLevel`), rezultat
- Trajanje u ms, success/failure zastavica, poruka o grešci (kada je primjenjivo)
- API heš ključa, vremenska oznaka
- Odbijanje opsega se evidentira kao `scope_denied:<reason>` sa listom opsega koji nedostaje

Koristite kontrolnu tablu ili krajnje tačke `/api/mcp/audit` i `/api/mcp/audit/stats` REST da pregledate nedavne pozive.

---

## Fajlovi

| File                                                                     | Svrha                                                                                   |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP tvornica servera, stdio ulazna tačka, registracije alata u opsegu                   |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP transport (upravljanje sesijama)                                  |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Procjena opsega alata i rezolucija pozivatelja                                          |
| `open-sse/mcp-server/audit.ts`                                           | Revizija poziva alata (`mcp_tool_audit`)                                                |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio otkucaj srca (`mcp-heartbeat.json`)                                               |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Kompresija opisa za registre alata / prompta / resursa                                  |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod šeme + registar alata (`MCP_TOOLS`, 45 unosa)                                       |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Faza 2 + cache + 1proxy alati za rukovanje                                              |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Rukovaoci kompresijskog alata                                                           |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definicije memorijskih alata (3 alata)                                                  |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definicije alata vještina (4 alata)                                                     |
| `open-sse/mcp-server/tools/notionTools.ts`                               | definicije alata izvora konteksta Notion (6 alata)                                      |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definicije alata za gamifikaciju (8 alata)                                              |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Alati za registraciju i upravljanje dodacima (8 alata)                                  |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` endpoint                                                              |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` endpoint                                                               |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE transportna ruta                                                     |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP transportna ruta                                      |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` upit dnevnika revizije                                                 |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` agregirane metrike revizije                                      |
| `src/lib/notion/api.ts`                                                  | Notion REST API klijent (ponovni pokušaj, vremensko ograničenje, klasifikacija grešaka) |
| `src/lib/db/notion.ts`                                                   | postojanost Notion tokena (`key_value` tablica)                                         |
| `src/app/api/settings/notion/route.ts`                                   | Notion postavke API (GET/POST/DELETE)                                                   |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion upravljanje tokenima UI                                                          |
| `tests/unit/notion-api.test.ts`                                          | Notion API klijentski testovi (7)                                                       |
| `tests/unit/notion-tools.test.ts`                                        | testovi primjene opsega Notion alata (10)                                               |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB modul testovi (3)                                                             |
