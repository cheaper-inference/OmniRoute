# OmniRoute MCP Server Documentation (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Strežnik Model Context Protocol s 110 orodji za operacije usmerjanja, predpomnilnika, stiskanja, pomnilnika, veščin, posredniškega strežnika, nabora, Radarja in virov konteksta.
>
> Verodostojni vir: `open-sse/mcp-server/server.ts` izračuna **110 edinstvenih orodij** s funkcijo `countUniqueMcpTools()`: 45 kanoničnih definicij (vključno s šestimi orodji življenjskega cikla CCR, trojico agent-skills, `omniroute_radar_catalog` in `omniroute_x_search`), poleg tega pa še orodja za pomnilnik (3), veščine (4), veščine GitHub (3), nabor (6), igrifikacijo (8), vtičnike (8), Notion (6), Obsidian (22), lokalni korpus (3) in dve orodji za stiskanje, namenjeni izključno RTK.

## Namestitev

OmniRoute MCP je vgrajen. Začnite z:

```bash
omniroute --mcp
```

Ali preko odprtega prevoza:

```bash
# Streamable HTTP transport (default port 20128, in-process on the dashboard server)
# Client endpoint: http://localhost:20128/api/mcp/stream
# stdio: omniroute --mcp
```

Prenosi HTTP (`sse` / `streamable-http`, ki jih v procesu streže strežnik nadzorne plošče) so privzeto izklopljeni in jih je bilo prej mogoče preklapljati samo s strani `/dashboard/mcp`. Od v3.8.51 ima CLI pariteto:

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH isti `mcpEnabled` (in neobvezno `mcpTransport`) nastavitev nadzorne plošče preklopi prek `/api/settings`. `mcp restart` pokliče `POST /api/mcp/restart`: prekine aktivne seje `sse`/`streamable-http` tako da se naslednja zahteva čisto znova inicializira, vrne `409` če je MCP onemogočen, in `501` za transport `stdio` (odjemalci stdio imajo lasten podproces — v procesu ni ročaja za ponovni zagon).

## Prenosi

Strežnik MCP ponuja tri prenose, ki vsi uporabljajo isto tovarno `createMcpServer()`:

| Prenos            | Kje                                          | Kdaj uporabiti                                             |
| :---------------- | :------------------------------------------- | :--------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`              | Integracije z IDE-ji (Claude Desktop, Cursor itd.)         |
| `sse`             | `POST/GET /api/mcp/sse` prek `httpTransport` | Odjemalci brskalnikov/agentov, ki potrebujejo tok dogodkov |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`            | Večsejni odjemalci HTTP (glava `mcp-session-id`)           |

Aktivni prenos HTTP (`sse` ali `streamable-http`) določa nastavitev `mcpTransport`. Ob preklopu prenosa se obstoječe seje drugega prenosa zaprejo.

### Oddaljeni dostop (obhod z obsegom `manage`)

`/api/mcp/*` je na ravni LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — privzeto lahko do njega dostopajo samo gostitelji povratne zanke (`localhost`, `127.0.0.1`, `::1`). Od različice v3.8.2 se lahko odjemalci zunaj povratne zanke povežejo, če predložijo `Authorization: Bearer <api-key>`, katerega ključ ima obseg `manage`. To je edini način za dostop do oddaljenega strežnika MCP prek tunela, povratnega posredniškega strežnika ali javnega imena gostitelja.

```bash
# Dodelite obseg manage: odprite stran API Keys na nadzorni plošči in vklopite
# "Management Access" za ključ ali pri ustvarjanju pošljite POST scopes:["manage"].

# Nato se povežite iz oddaljenega odjemalca MCP:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ključ brez obsega `manage` (ali brez Bearer) vrne `403 LOCAL_ONLY`. Sorodne predpone `/api/cli-tools/runtime/*` namenoma NI mogoče obiti — glejte [Ravni varovanja poti — izjema za obseg manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

### Preverjanje Origin

Po overitvi se pri vsaki zahtevi na `/api/mcp/*` — transportih in upravljalnih poteh, kot so `status`, `tools`, `audit`, `restart` — preveri glava `Origin`, ne glede na klicatelja (API ključ, žeton CLI, seja nadzorne plošče ali anonimni loopback z onemogočeno prijavo). To je zaščita pred DNS rebindingom, ki jo zahteva specifikacija MCP Streamable HTTP.

- **Brez glave `Origin`** → dovoljeno. OmniRoute CLI, SDK in odjemalci IDE je ne pošiljajo.
- **Dovoljen `Origin`** → `localhost` / `127.0.0.1` / `[::1]` na katerih koli vratih ali lastni javni origin OmniRoute: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, origin, ki ga posreduje zaupanja vreden obratni proxy (`OMNIROUTE_TRUST_PROXY`, samo če base URL ni nastavljen), ali neposredno dostopan loopback/LAN IP gostitelj. Sama glava `Host` origina nikoli ne naredi zaupanja vrednega.
- **Kateri koli drug `Origin`, vključno z `null`** → `403` s telesom napake JSON-RPC: `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. Seja nadzorne plošče z veljavnim žetonom CSRF je še vedno sprejeta, kot pri drugih zapisih nadzorne plošče.

Brskalniški odjemalec MCP za obratnim proxyjem potrebuje `OMNIROUTE_PUBLIC_BASE_URL`; seznama dovoljenih drugih originov ni. Predhodna zahteva CORS (`OPTIONS`) se ne preverja glede Origin; zahteva, ki ji sledi, se.

## Konfiguracija IDE-ja

Za nastavitev Claude Desktop, Cursor, Cline in združljivih odjemalcev MCP glejte [Konfiguracija odjemalca MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration).

---

## Osnovna orodja (14) — 1. faza

| Orodje                          | Obsegi                | Opis                                                                                                                                  |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_get_health`          | `read:health`         | Čas delovanja, pomnilnik, odklopniki, omejitve hitrosti, statistika predpomnilnika                                                    |
| `omniroute_list_combos`         | `read:combos`         | Vse konfigurirane kombinacije s strategijami (izbirno tudi metrike)                                                                   |
| `omniroute_get_combo_metrics`   | `read:combos`         | Metrike zmogljivosti za določeno kombinacijo                                                                                          |
| `omniroute_switch_combo`        | `write:combos`        | Aktiviranje ali deaktiviranje kombinacije                                                                                             |
| `omniroute_create_combo`        | `write:combos`        | Ustvarjanje preverjene kombinacije prek obstoječega API-ja za kombinacije                                                             |
| `omniroute_check_quota`         | `read:quota`          | Porabljena/skupna kvota, odstotek preostanka, čas ponastavitve, stanje žetona                                                         |
| `omniroute_route_request`       | `execute:completions` | Pošiljanje zahteve za dokončanje klepeta prek usmerjanja OmniRoute                                                                    |
| `omniroute_cost_report`         | `read:usage`          | Poročilo o stroških po obdobju (seja/dan/teden/mesec)                                                                                 |
| `omniroute_list_models_catalog` | `read:models`         | Celoten katalog modelov z zmogljivostmi, stanjem in cenami                                                                            |
| `omniroute_radar_catalog`       | `read:radar`          | Lokalni podpisani katalog Radar; izbirni filtri po ponudniku/družini                                                                  |
| `omniroute_tool_search`         | `read:tools`          | Odkrivanje orodij iz registriranega kataloga MCP                                                                                      |
| `omniroute_web_search`          | `execute:search`      | Spletno iskanje prek konfiguriranih ponudnikov iskanja. Ne vključuje X/Twitter.                                                       |
| `omniroute_x_search`            | `execute:search`      | Iskanje po X prek xAI/SuperGrok ali izbira `xquik-search` za rezultate API-ja Xquik. Zahteva poverilnice za izbrano zaledno storitev. |
| `omniroute_web_fetch`           | `execute:search`      | Pridobivanje spletne vsebine prek konfiguriranih ponudnikov pridobivanja                                                              |

## Napredna orodja (11) — 2. faza

| Orodje                             | Obsegi                               | Opis                                                                                                                                     |
| :--------------------------------- | :----------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulacija usmerjanja brez dejanske izvedbe z drevesom nadomestnih možnosti                                                              |
| `omniroute_set_budget_guard`       | `write:budget`                       | Proračun seje z dejanjem znižanja kakovosti, blokiranja ali opozarjanja                                                                  |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Posodobitev strategije kombinacije med izvajanjem (prednostna/utežena/samodejna/itd.)                                                    |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Uporaba prednastavitve odpornosti `aggressive` / `balanced` / `conservative`                                                             |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Preizkus vsakega ponudnika v kombinaciji v živo z uporabo dejanskega klica nadrejene storitve                                            |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metrike posameznih ponudnikov z zakasnitvijo p50/p95/p99 in stanjem varovalke                                                            |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Priporočilo kombinacije glede na vrsto opravila z omejitvami proračuna/zakasnitve                                                        |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Pojasnilo, zakaj je bila zahteva usmerjena k ponudniku (dejavniki točkovanja + nadomestne možnosti)                                      |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Celoten posnetek seje: stroški, žetoni, glavni modeli/ponudniki, napake, nadzor proračuna                                                |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnosticiranje (in izbirno samodejno popravljanje) odstopanj zbirke podatkov, kot so okvarjeni sklici na kombinacije/osirotele vrstice |
| `omniroute_sync_pricing`           | `pricing:write`                      | Sinhronizacija podatkov o cenah iz zunanjih virov (LiteLLM); podpira `dryRun`                                                            |

## Orodja za predpomnilnik (2)

| Orodje                  | Obsegi        | Opis                                                                              |
| :---------------------- | :------------ | :-------------------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Statistika semantičnega predpomnilnika, predpomnilnika pozivov in idempotentnosti |
| `omniroute_cache_flush` | `write:cache` | Praznjenje predpomnilnika globalno ali po podpisu/modelu                          |

## Orodja za stiskanje (13)

| Orodje                              | Območja             | Opis                                                                                                                                            |
| :---------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Nastavitve stiskanja, povzetek analitike in statistični podatki o predpomnilniku (vključuje metapodatke `analytics.mcpDescriptionCompression` ) |
| `omniroute_compression_configure`   | `write:compression` | Konfigurirajte način stiskanja, prag, ciljno razmerje, ohranjanje sistemskega poziva, preklop stiskanja opisa MCP                               |
| `omniroute_set_compression_engine`  | `write:compression` | Izberite aktivni motor (off/caveman/rtk/stacked) in intenzivnost Caveman/RTK                                                                    |
| `omniroute_list_compression_combos` | `read:compression`  | Seznam imenovanih kompresijskih kombinacij in njihovih cevovodov motorjev                                                                       |
| `omniroute_compression_combo_stats` | `read:compression`  | Analitika, združena glede na kompresijsko kombinacijo in mehanizem                                                                              |
| `omniroute_ccr_store`               | `write:compression` | Shranite vsebino, izolirano od klicatelja, v omejeno shrambo CCR v pomnilniku in vrnite oznako plus referenco `ccr://`                          |
| `omniroute_ccr_retrieve`            | `read:compression`  | Pridobite vsebino CCR v celoti ali z načini glave, repa, vrstic, grep in statistike                                                             |
| `omniroute_ccr_inspect`             | `read:compression`  | Preglejte metapodatke CCR v lasti kličočega brez vrnitve vsebine                                                                                |
| `omniroute_ccr_list`                | `read:compression`  | Seznam paginiranih metapodatkov za bloke CCR v lasti klicatelja                                                                                 |
| `omniroute_ccr_delete`              | `write:compression` | Izbrišite blok CCR v lasti klicatelja                                                                                                           |
| `omniroute_ccr_stats`               | `read:compression`  | Poročilo o uporabi pomnilnika v obsegu klicatelja, števcih življenjskega cikla in omejitvah shranjevanja                                        |
| `omniroute_rtk_discover`            | `read:compression`  | Odkrijte ponavljajoče se šume v izhodnih vzorcih opt-in RTK                                                                                     |
| `omniroute_rtk_learn`               | `read:compression`  | Ustvarite osnutek filtra RTK ki ga je mogoče pregledati, iz vzorcev za prijavo                                                                  |

Vnosi CCR uporabljajo dvonivojsko shrambo: vročo raven v pomnilniku, ki jo v lokalnih izvajalnih časih brez oblaka podpira vzdržljiva raven SQLite (`ccr_blocks`, privzeto vklopljeno), tako da blok preživi izgon ali ponovni zagon, dokler se njegov TTL ne izprazni — razen blokov nad 512 KB in izvajalnimi časi v oblaku, ki ostanejo samo v pomnilniku. Vsak blok je omejen na 2 MiB, vsak glavnik na 16 MiB in globalna trgovina na 64 MiB. Vnosi so privzeto nastavljeni na 24-urni TTL (največ sedem dni). Polno iskanje MCP je omejeno na 256 KiB; večji bloki ostanejo na voljo v načinih ranged in grep. Shranjevanje, iskanje, seznam, pregledovanje, brisanje in statistika so izolirani s preverjenim glavnim ključem API. Revizijski zapisi vsebujejo zgoščene vrednosti in metapodatke o velikosti, nikoli vsebine. Podrobnosti za operaterja (obe označevalci, predpogoji odjemalca, `codemode:false`, obsegi na orodje, paginacija in diagnostična matrika) so v živo v [predpogojih za kompresijske motorje → / vodniku za operaterja](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup).

`omniroute_compression_status` poroča o stiskanju opisa MCP ločeno pod `analytics.mcpDescriptionCompression`. Te vrednosti so ocene velikosti metapodatkov za popisljive opise MCP (`tools`, `prompts`, `resources` in `resourceTemplates`); niso potrdila o uporabi ponudnika in so označeni z `source: "mcp_metadata_estimate"`.

### MCP Accessibility Tree Filter (v3.8.0)

Ločeno od zgornjih orodij za stiskanje OmniRoute vključuje filter po izvedbi, ki stisne** rezultate orodja** orodij MCP browser/accessibility preden se vrnejo agentu. Ta filter sam po sebi ni orodje — izvaja se pregledno na katerem koli rezultatu orodja, ki vsebuje podrobno besedilo drevesa dostopnosti ali posnetka brskalnika (≥ 2000 znakov).

Ključna vedenja:

- Strni ≥ 30 zaporednih ponavljajočih sestrskih vrstic v glavo + rep povzetek
- Ohranja sidra `[ref=eXX]`, ki jih zahteva Playwright/computer-use
- Trdo skrajša preveliko besedilo (> 50.000 znakov) z namigom za krmarjenje
- Pričakovani prihranki:** 60–80 %** na obremenitvah posnetkov brskalnika

Konfiguracija: `compression.mcpAccessibility` v globalnih nastavitvah (migracija 056). Izvedba: `open-sse/services/compression/engines/mcpAccessibility/`. Celotni dokumenti: [Motorji za stiskanje — MCP Drevesni filter dostopnosti](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Glejte [Compression Engines](../compression/COMPRESSION_ENGINES.md) in [RTK Compression](../compression/RTK_COMPRESSION.md) za model stiskanja izvajalnega časa za temi orodji.

## Orodja 1Proxy (3)

| Orodje                      | Obsegi         | Opis                                                                                                           |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Pridobi brezplačne posredniške strežnike s tržnice 1proxy (filtri protokola/države/kakovosti/omejitve)         |
| `omniroute_oneproxy_rotate` | `read:proxies` | Pridobi naslednji razpoložljivi posredniški strežnik glede na strategijo (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Statistika zaloge, stanje sinhronizacije ter porazdelitev po protokolu in državi                               |

## Orodja za pomnilnik (3)

Določena v `open-sse/mcp-server/tools/memoryTools.ts`. Preverjanje pristnosti in obsega se izvaja prek standardnega cevovoda obsegov MCP.

| Orodje                    | Obsegi         | Opis                                                                                                |
| :------------------------ | :------------- | :-------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Išče po pomnilniških zapisih glede na poizvedbo / vrsto / ključ API z upoštevanjem omejitve žetonov |
| `omniroute_memory_add`    | `write:memory` | Doda nov pomnilniški zapis (`factual` / `episodic` / `procedural` / `semantic`)                     |
| `omniroute_memory_clear`  | `write:memory` | Počisti pomnilniške zapise za ključ API, po želji filtrirane po vrsti ali časovnem žigu `olderThan` |

## Orodja za veščine (4)

Določena v `open-sse/mcp-server/tools/skillTools.ts`. Podprta z `src/lib/skills/registry` + `src/lib/skills/executor`.

| Orodje                        | Obsegi           | Opis                                                                                             |
| :---------------------------- | :--------------- | :----------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Navede registrirane veščine z izbirnim filtriranjem po ključu API, imenu ali stanju omogočenosti |
| `omniroute_skills_enable`     | `write:skills`   | Omogoči ali onemogoči določeno veščino glede na ID                                               |
| `omniroute_skills_execute`    | `execute:skills` | Izvede veščino s podanim vhodom in vrne zapis izvedbe                                            |
| `omniroute_skills_executions` | `read:skills`    | Navede zgodovino nedavnih izvedb veščin                                                          |

## Vir konteksta Notion (6)

Določena v `open-sse/mcp-server/tools/notionTools.ts`. Žeton je shranjen v tabeli `key_value` prek `src/lib/db/notion.ts`. Odjemalec REST je v `src/lib/notion/api.ts`. API za nastavitve je v `src/app/api/settings/notion/route.ts`. Uporabniški vmesnik nadzorne plošče je v `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Integracijski žeton Notion konfigurirajte na zavihku **Viri konteksta** na nadzorni plošči končne točke ali prek API-ja REST:

```bash
# Nastavi žeton
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Preveri stanje
curl http://localhost:20128/api/settings/notion

# Prekini povezavo
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Orodje                       | Obsegi         | Opis                                                                          |
| :--------------------------- | :------------- | :---------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Iskanje po celotnem besedilu na vseh straneh in v vseh podatkovnih zbirkah    |
| `notion_get_page`            | `read:notion`  | Pridobi stran glede na ID skupaj z njenimi lastnostmi                         |
| `notion_list_block_children` | `read:notion`  | Navede podrejene bloke strani ali bloka                                       |
| `notion_query_database`      | `read:notion`  | Izvede poizvedbo v podatkovni zbirki s filtri, razvrščanjem in ostranjevanjem |
| `notion_get_database`        | `read:notion`  | Pridobi shemo podatkovne zbirke glede na ID                                   |
| `notion_append_blocks`       | `write:notion` | Nadrejenemu bloku doda podrejene bloke (največ 100 na zahtevo)                |

## Orodja kataloga veščin agentov (3)

Opredeljena v `open-sse/mcp-server/tools/agentSkillTools.ts`. Podprta z `src/lib/agentSkills/catalog`. Ta orodja odjemalcem MCP in zunanjim agentom omogočajo dostop do kataloga dokumentacije 45 veščin agentov. Obseg: `read:catalog`.

| Orodje                            | Obsegi         | Opis                                                                                                                                                                     |
| :-------------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Navede vseh 45 veščin agentov z izbirnima filtroma `category` (api\|cli) in `area`; vrne metapodatke in pokritost                                                        |
| `omniroute_agent_skills_get`      | `read:catalog` | Pridobi celotne metapodatke in vsebino SKILL.md za posamezno veščino po kanoničnem `id`                                                                                  |
| `omniroute_agent_skills_coverage` | `read:catalog` | Statistika pokritosti: koliko od 23 veščin API, 21 veščin CLI in 1 konfiguracijske veščine ima datoteke SKILL.md v datotečnem sistemu glede na skupno število v katalogu |

Za celoten katalog in navodila, kako ga uporabljajo zunanji agenti, glejte [AGENT-SKILLS.md](./AGENT-SKILLS.md).

## Sorodna ogrodja (v3.8.0)

Zgornji inventar orodij MCP (110 edinstvenih orodij, izračunanih s `countUniqueMcpTools()`) je namenoma
omejen na izvajalne operacije usmerjanja/predpomnjenja/stiskanja/pomnilnika/veščin/posredniškega strežnika/vira konteksta. Dve sosednji
ogrodji sta v v3.8.0 dobavljeni skupaj s strežnikom MCP in dokumentirani ločeno:

### Agenti v oblaku

Agenti v oblaku so zunanji agenti AI za programiranje (codex-cloud, cursor-cloud, devin, jules), povezani z
OmniRoute prek istega modela povezave, ki se uporablja za ponudnike LLM. Izpostavljeni so prek
lastnega vmesnika REST (`/api/v1/agents/*`) in **niso** del kataloga orodij MCP
— klic agenta v oblaku ne uporablja obsega MCP.

- Implementacija: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Življenjski cikel: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentacija: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Varovalni mehanizmi

Varovalni mehanizmi so filtri pred izvedbo in po njej (vision-bridge, pii-masker, prompt-injection),
ki se uporabljajo znotraj cevovoda klepeta. Izvedejo se, preden je dosežena plast orodij/usmerjanja MCP,
in v revizijski cevovod oddajajo strukturirane kršitve; ne kličejo se kot orodja MCP.

- Implementacija: `src/lib/guardrails/`.
- Dokumentacija: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Pri odpravljanju napak klica MCP, ki se zdi blokiran, preverite tako revizijski dnevnik MCP
(vnose `scope_denied:*`) kot revizijsko sled varovalnih mehanizmov — zahtevo lahko varovalni mehanizem zavrne
**preden** sploh doseže plast uveljavljanja obsega MCP.

---

## Končne točke REST API

| Končna točka           | Metoda                | Opis                                                                                                           | Preverjanje pristnosti     |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`      | `GET`                 | Stanje strežnika: signal delovanja, stanje prenosa HTTP, povzetek revizijske dejavnosti                        | Upravljanje (seja/skrbnik) |
| `/api/mcp/tools`       | `GET`                 | Katalog orodij (ime, opis, obsegi, faza, izvorne končne točke)                                                 | Upravljanje                |
| `/api/mcp/sse`         | `GET` / `POST`        | Končna točka prenosa SSE (omejena z `mcpEnabled` + `mcpTransport === "sse"`)                                   | Ključ API + obsegi         |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Pretočni prenos HTTP (uporablja glavo `mcp-session-id`; `DELETE` konča sejo)                                   | Ključ API + obsegi         |
| `/api/mcp/audit`       | `GET`                 | Vnosi revizijskega dnevnika iz `mcp_tool_audit` (filtri: `limit`, `offset`, `tool`, `success`, `apiKeyId`)     | Upravljanje                |
| `/api/mcp/audit/stats` | `GET`                 | Združena revizijska statistika (`totalCalls`, `successRate`, `avgDurationMs`, najpogosteje uporabljena orodja) | Upravljanje                |

Izvorne datoteke: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Prenosa SSE in pretočni HTTP sta blokirana, dokler strežnik MCP ni omogočen v nastavitvah (`mcpEnabled`) in ni izbran ustrezen `mcpTransport`. Če je konfiguriran napačen prenos, pot vrne HTTP 400 z namigom za spremembo nastavitev.

---

## Preverjanje pristnosti in obsegi

orodje MCP kliče nize obsega branja od klicatelja. To preverjanje je eden od treh neodvisnih imenskih prostorov. Podaja enega podajalca ni podaja drugih. Pravila so [imenski prostori treh obsegov](#three-scope-namespaces). Katalog orodij je [MCP tool scopes](#mcp-tool-scopes).

### Trije imenski prostori obsega

`manage` na ključu API, `read:compression` na orodju MCP in `read` na žetonu dostopa `oma_live_…` so tri različna dovoljenja. Klicatelji, ki pošljejo žeton dostopa `read` na mutirano pot upravljanja, dobijo HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Ta rang je `scopeSatisfies`. Ne uporablja tabele MCP in ujemanje MCP se ne posvetuje z njo.

| Imenski prostor         | Poverilnica                                                                  | Checker                   | Izkaznica dovoljuje                                     |
| :---------------------- | :--------------------------------------------------------------------------- | :------------------------ | :------------------------------------------------------ |
| Upravljanje ključev API | `api_keys.scopes`                                                            | `hasManageScope`          | Upravljanje REST za ta ključ nosilca                    |
| API-ključni dodatek     | isti niz, en natančen niz                                                    | pomočnik, imenovan spodaj | Samo ta ena sposobnost                                  |
| obseg orodja MCP        | isto polje, sicer MCP `_meta` (samo HTTP/SSE ), sicer `OMNIROUTE_MCP_SCOPES` | `scopeMatches`            | To orodje, ko je uveljavljanje vklopljeno               |
| Žeton za dostop         | `oma_live_…`                                                                 | `scopeSatisfies`          | Pot upravljanja, katere metoda in pot zahtevata ta rang |

Kovanje vsake poverilnice je zajeto v [Preverjanje pristnosti upravljanja](../guides/MANAGEMENT-AUTH.md).

#### Obseg ključev API

Eno polje `api_keys.scopes` hrani dve opravili. Uporabljajo različne funkcije.

**Upravljanje REST.** `manage` in `admin` sta člana `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`). `hasManageScope` je tisto, kar avtorizira upravljalne poti za ta ključ. `admin` je sposoben upravljanja na teh poteh. Beseda `admin` tukaj ni rang žetona dostopa in se ne razširi na obseg orodja MCP.

**Aditivni nizi.** Vsak je natančen test članstva in vsak ostane zunaj `MANAGEMENT_API_KEY_SCOPES`.

| Področje uporabe               | Izkaznica dovoljuje                                                                                                                                               |
| :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Samo izločanje `/api/mcp/` LOCAL_ONLY brez povratne zanke (`hasMcpConnectOrManageScope`). Ključ z `manage` ali `admin` še vedno prenese to izrezovanje.           |
| `self:usage`                   | `GET /api/v1/me/status` za ta ključ (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` doda ta obseg ob ustvarjanju (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Kvote računa navzgor znotraj tega koristnega tovora statusa (`src/lib/usage/apiKeySelfService.ts`). Statusna pot še vedno zahteva `self:usage`.                   |
| `policy:bypass-provider-quota` | Sklepni klici tega ključa preskočijo pravilnik o kvotah ponudnika (`hasProviderQuotaBypassScope` in `src/sse/handlers/chat.ts`).                                  |

#### Ujemanje

Katalog je tabela pod [obsegi orodja MCP](#mcp-tool-scopes). `MCP_SCOPE_LIST` v `src/shared/constants/mcpScopes.ts` ne obravnavajte kot ta katalog: to je izvirna tipizirana podmnožica. Kasnejša orodja deklarirajo dodatne obsege zraven njega (`read:notion`, `read:skills`, `read:local-corpus` in preostali del tabele).

`evaluateToolScopes` v `open-sse/mcp-server/scopeEnforcement.ts` dovoljuje klic, ko se vsak zahtevani obseg ujema z nekim odobrenim obsegom:

- `*` ustreza vsakemu zahtevanemu obsegu.
- Odobreni obseg, ki se konča z `*` se ujema z zahtevanim obsegom, ki se začne s predpono pred zvezdico. `read:*` se ujema `read:compression`.
- Vsak drug odobreni obseg se ujema samo z enakim zahtevanim nizom.

Ključ, katerega obseg je `["manage"]` ne uspe `scopeMatches` za `read:compression`. Isti klic ne uspe za `admin`, `mcp:connect`, `read` in `write`, če so to edini odobreni nizi. Med obsegi orodij MCP ni hierarhije onkraj končnega `*`.

Uveljavljanje je izklopljeno, razen če `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (privzeto `false`). Ko je izklopljen, `evaluateToolScopes` dovoli klic in preskoči katalog. Medtem ko je vklopljen, HTTP uporablja `api_keys.scopes` ključa nosilca kot `authInfo` (glejte [Povezovanje obsega HTTP na ključ](#per-key-http-scope-binding-7895) ). Ko noben obseg ključa ni razrešen, odobreni nabor pade skozi MCP `_meta` (upoštevano samo za klicatelje HTTP/SSE, znotraj konteksta za preverjanje HTTP ; `_meta` klicatelja stdio je prezrt, ker ga nadzoruje odjemalec in ne nosi identitete klicatelja), nato `OMNIROUTE_MCP_SCOPES`.

#### Obseg žetona za dostop

žetoni `oma_live_…` (`src/lib/accessTokens/scopes.ts`) nosijo `read`, `write` ali `admin`. `scopeSatisfies` je rang: `admin` pokriva `write` in `read`, `write` pa `read`. Neznani obsegi ne pokrivajo ničesar.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) primerja to uvrstitev z `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` in `OPTIONS` zahtevajo `read`.
- Vsaka druga metoda zahteva `write`.
- Poti v `ADMIN_SCOPE_PREFIXES` zahtevajo `admin` za vsako metodo. `/api/mcp` je na tem seznamu, zato žeton za dostop `write` še vedno ne more poklicati površine MCP HTTP.
- Poti v `ADMIN_MUTATION_PREFIXES` zahtevajo `admin` samo za mutacije.
- Poti v `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`, `/api/settings/require-login`) zahtevajo `admin` samo za mutacije in samo na tej natančni poti — druge podpoti `/api/settings/*` ohranjajo `write`.

`PATCH /api/keys/{id}` je mutacija in ni na teh skrbniških seznamih, zato žeton `read` prejme 403 `Access token scope 'read' is insufficient; 'write' required.` Žeton dostopa `write` ali `admin` ustreza tej poti. Nadzorna plošča JWT, žeton ID stroja z zanko CLI in ključ API z `manage` ali `admin` imajo druge veje in niso zoženi s tem rangom.

Žeton za dostop, ki posreduje `scopeSatisfies` za `/api/mcp` je očistil samo vrata za upravljanje. Klici orodij še vedno izvajajo `scopeMatches` proti obsegom ključev API-ja. Razvrstitev žetona dostopa ni vnos v `scopeMatches`.

### obseg orodja MCP

Uveljavljanje obsega je centralizirano v `open-sse/mcp-server/scopeEnforcement.ts`. Vsako orodje zahteva posebne obsege:

| Področje uporabe      | Orodja                                                                                                                                                                             |
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
| `read:obsidian`       | 13 orodij za branje — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 orodij za pisanje — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …               |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                  |

Podprti so obsegi z nadomestnimi znaki: `read:*` odobri vsa področja branja, `*` odobri popoln dostop.

### `mcp:connect` — zmogljivost ozke poti (#7895)

Doseganje transporta HTTP/SSE MCP (`/api/mcp/*`) iz brez povratne zanke zahteva izrez `/api/mcp/` LOCAL_ONLY (glejte `docs/security/ROUTE_GUARD_TIERS.md`). Zgodovinsko gledano je ta izločitev sprejela samo polni `manage`/`admin` -scope API ključ — preširok za klicatelja, ki mora govoriti samo MCP. `src/shared/constants/managementScopes.ts` zdaj izvozi `MCP_CONNECT_SCOPE = "mcp:connect"`: dodaten, ozek obseg (isti precedens kot `SELF_USAGE_SCOPE`), ki pooblasti ONLY obvod `/api/mcp/` v `src/server/authz/policies/management.ts` — ne dodeljuje nobenega drugega dostopa do poti upravljanja in se namerno ohranja OUT od `MANAGEMENT_API_KEY_SCOPES`. Tipka, ki drži `manage`/`admin` še vedno nespremenjeno prečka izrez; `mcp:connect` je alternativa z nižjimi privilegiji za oddaljene klicatelje samo MCP, preverjeno prek `hasMcpConnectOrManageScope()`.

### Vezava obsega HTTP na ključ (#7895)

Preko HTTP/SSE `open-sse/mcp-server/httpTransport.ts` zdaj razreši dejanski `api_keys.scopes` klicatelja prek `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) in ga posreduje MCP SDK `transport.handleRequest(req, { authInfo })`, tako da `extra.authInfo.scopes` ki doseže vsak klic orodja, odraža lastne obsege ključa nosilca. `scopeEnforcement.ts` `resolveCallerScopeContext()` je že dal prednost `authInfo` pred `_meta` in `OMNIROUTE_MCP_SCOPES` env nadomestni — to poseli samo tisti prvi vir z najvišjo prioriteto, ki je bil prej nenapajan preko HTTP. Ko se noben ključ API ne razreši (brez glave, neveljaven ključ), `authInfo` ostane `undefined` in razrešitev pade v obstoječo verigo `meta`/env nespremenjena. stdio nima identitete posameznega klicatelja (glejte `mcpCallerIdentity.ts`) in nanjo ne vpliva vezava posameznega ključa —, preskoči korak `_meta` (`_meta` je spoštovan le znotraj konteksta za preverjanje HTTP, #15159) in razreši samo s ključem `OMNIROUTE_MCP_SCOPES` env.

**Uveljavljanje je vsiljeno za klicatelje HTTP/SSE ozkega obsega ne glede na `OMNIROUTE_MCP_ENFORCE_SCOPES`.** `OMNIROUTE_MCP_ENFORCE_SCOPES` privzeto nastavljen na `false` je varen samo za tok z enim operaterjem local/stdio, kjer ni identitete posameznega klicatelja, proti kateri bi lahko dosegli. `open-sse/mcp-server/server.ts::withScopeEnforcement()` brezpogojno vklopi uveljavljanje obsega na orodje (`shouldForceScopeEnforcement()` v `scopeEnforcement.ts`), kadar koli `resolveCallerScopeContext()` razreši `source === "authInfo"` (tj. pravo avtorizacijsko glavo HTTP na ključ, HTTP/SSE-only) AND ta ključ ne vsebuje celotnega obsega `manage`/`admin`. S tem se zapolni vrzel, kjer bi lahko ključ, ki drži ONLY ozek obhodni obseg `mcp:connect` — zgoraj dokumentiran kot dovoljenje za nič drugega kot `/api/mcp/` LOCAL_ONLY izločanje — sicer poklical vsako orodje MCP, ko je operater omogočil dostop do remote/non-loopback MCP, preprosto zato, ker `OMNIROUTE_MCP_ENFORCE_SCOPES` privzeto pošilja `false`. Popoln ključ `manage`/`admin` nad HTTP in vsak klicatelj stdio/local ohranja obstoječe vedenje `OMNIROUTE_MCP_ENFORCE_SCOPES` -gated nespremenjeno.

---

## Okoljske spremenljivke

| Spremenljivka                           | Privzeto                           | Namen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :-------------------------------------- | :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`           | Osnovni URL, ki ga strežnik MCP uporablja pri klicanju notranjih API-jev OmniRoute                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_API_KEY`                     | (prazno)                           | Ključ API, posredovan notranjim klicem API kot `Authorization: Bearer`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (omogoči ga samo `"true"`) | Ko je omogočeno, manjkajoči obsegi zavrnejo klice orodij in v revizijski dnevnik zapišejo `scope_denied:<reason>`. Uveljavljanje je ne glede na to zastavico PRAV TAKO vedno prisilno omogočeno za vsakega klicatelja HTTP/SSE, razrešenega iz glave Authorization za posamezen ključ (`source === "authInfo"`), ki nima polnega obsega `manage`/`admin` — npr. ključ, ki ima le ozki obseg za obhod `mcp:connect` — zato je ta privzeta nastavitev varna samo za lokalni tok stdio z enim upravljavcem, nikoli pa za oddaljeni dostop zunaj povratne zanke |
| `OMNIROUTE_MCP_SCOPES`                  | (prazno)                           | Z vejicami ločen seznam dovoljenih obsegov, ki se privzeto štejejo za »razpoložljive« (uporabi se, kadar klicatelj ne navede lastnih obsegov)                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (ni nastavljeno = vklopljeno)      | Ko je nastavljeno na `0/false/off/no`, onemogoči stiskanje opisov MCP ob registraciji                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (ni nastavljeno = vklopljeno)      | Nadomestni vzdevek za isto preklopno nastavitev kot zgoraj                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                            | Časovna omejitev za prekinitev notranjih upravljavskih branj (stanje, odpornost, kombinacije, kvota, uporaba)                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                            | Časovna omejitev za prekinitev korakov, ki čakajo na ponudnika (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `MCP_TOOL_DENY`                         | (ni nastavljeno = brez filtra)     | Z vejicami ločena imena orodij, ki naj se izločijo iz `tools/list` (zmanjšanje števila orodij — glejte spodaj)                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `MCP_TOOL_ALLOW`                        | (nenastavljeno = brez filtra)      | Z vejicami ločena imena orodij, ki naj se izključno ohranijo (način seznama dovoljenih — glejte spodaj)                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `DATA_DIR`                              | `~/.omniroute`                     | Datoteka srčnega utripa se zapisuje v `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

---

## Stiskanje opisov

Registri orodij, pozivov in virov MCP lahko ob registraciji oziroma izpisu stisnejo opise, da zmanjšajo količino metapodatkov, izpostavljenih odjemalcem (in s tem stroške konteksta poziva). Implementacija je v `open-sse/mcp-server/descriptionCompressor.ts` in je v strežnik MCP vključena prek `compressMcpRegistryMetadata` znotraj `createMcpServer()`.

- Stiskanje se izvede nad besedilom opisa z uporabo nabora pravil Caveman (`getRulesForContext("all", "full")`) in izločanjem ohranjenih blokov (odseki kode, ograjeni bloki itd.), zato se strukturna vsebina ne spremeni.
- Za posamezno uvedbo ga preklopite prek vrednosti `compression.mcpDescriptionCompressionEnabled` v tabeli nastavitev `key_value` (privzeto: omogočeno) — v uporabniškem vmesniku je na voljo kot **Analitika → Stiskanje opisov MCP**.
- Za celoten proces ga preklopite z `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` ali `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Statistika v realnem času je na voljo prek `omniroute_compression_status` pod `analytics.mcpDescriptionCompression` in je označena z `source: "mcp_metadata_estimate"`, da jo je mogoče razlikovati od dejanskih potrdil o uporabi ponudnika.

---

## Zmanjšanje kardinalnosti orodij (F4.3)

Stiskanje opisov zmanjša metapodatke posameznega orodja; **zmanjšanje kardinalnosti orodij** gre še korak dlje, saj zmanjša _število_ orodij, ki so sploh objavljena. Oglaševanje manjšega števila orodij v manifestu `tools/list` zmanjša strošek žetonov na zahtevo, ki ga model odjemalca plača za katalog orodij (stiskanje »5. plasti«). Implementacija je čisti filter brez stanja v `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), ki je vključen v registracijsko zanko v `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Izbirno, privzeto izklopljeno.** Filter se izvede samo, kadar je nastavljena vsaj ena od dveh okoljskih spremenljivk; če ni nastavljena nobena, se vseh 110 orodij objavi nespremenjenih.

| Spremenljivka    | Način                                                                                             |
| :--------------- | :------------------------------------------------------------------------------------------------ |
| `MCP_TOOL_DENY`  | Črni seznam — z vejicami ločena imena orodij, ki so vedno odstranjena iz `tools/list`             |
| `MCP_TOOL_ALLOW` | Seznam dovoljenih — z vejicami ločena imena orodij; ohranijo se samo ta, vsa druga so odstranjena |

`deny` ima prednost pred `allow`. Imena so ločena z vejicami, obrezana, prazni vnosi pa so prezrti. Primeri:

```bash
# Odstrani dve orodji iz kataloga
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Objavi samo orodja za usmerjanje in kvote (način seznama dovoljenih)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Kako so filtrirana orodja odstranjena:** registracija vedno uspe; orodje, ki ga profil zavrne, je nato onemogočeno z `.disable()` na ročici kompleta MCP SDK, zato se nikoli ne pojavi v `tools/list`, povezave pa ostanejo nedotaknjene (čisto omogočanje/onemogočanje brez ponovne registracije). Razčlenjevalnik profila je `readMcpToolProfileFromEnv(process.env)`, ki vrne `null` (brez filtriranja), kadar sta obe spremenljivki prazni.

Bogatejša oblika `ToolProfile`, na kateri temelji `reduceToolManifest`, podpira tudi filtriranje s presekom obsegov (`allowScopes`, z ujemanjem nadomestnih znakov v slogu `read:*`) in deterministično omejitev `maxTools`, vendar ti dve nastavitvi ob registraciji potrebujeta celoten manifest in danes **nista** dostopni prek okoljskih spremenljivk (integracijska točka na ravni `tools/list` je načrtovana kot nadaljnja naloga). `estimateManifestTokens()` je na voljo za primerjavo stroška žetonov manifesta pred zmanjšanjem in po njem.

---

## Signal delovanja med izvajanjem

Transport stdio vsakih 5 sekund zapisuje podatke o delovanju v `${DATA_DIR}/runtime/mcp-heartbeat.json`. Nadzorna plošča (`/api/mcp/status`) prebere to datoteko in preveri stanje procesa PID, da določi `online`. Transporti HTTP namesto tega poročajo stanje prek `getMcpHttpStatus()` znotraj procesa (brez zapisovanja datoteke).

Posnetek signala delovanja vsebuje:

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

## Beleženje revizijske sledi

Vsak klic orodja se prek `open-sse/mcp-server/audit.ts` zabeleži v tabelo SQLite `mcp_tool_audit`:

- Ime orodja, argumenti (zgoščeni/skrajšani glede na `auditLevel` posameznega orodja), rezultat
- Trajanje v ms, oznaka uspeha/neuspeha, sporočilo o napaki (kadar je ustrezno)
- Zgoščena vrednost ključa API, časovni žig
- Zavrnitve obsega se zabeležijo kot `scope_denied:<reason>` s seznamom manjkajočih obsegov

Za pregled nedavnih klicev uporabite nadzorno ploščo ali končni točki REST `/api/mcp/audit` in `/api/mcp/audit/stats`.

---

## Datoteke

| Datoteka                                                                 | Namen                                                                               |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Tovarna strežnika MCP, vstopna točka stdio, registracije orodij po obsegih          |
| `open-sse/mcp-server/httpTransport.ts`                                   | Prenos SSE + Streamable HTTP (upravljanje sej)                                      |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Vrednotenje obsega orodij in razreševanje klicatelja                                |
| `open-sse/mcp-server/audit.ts`                                           | Revizijsko beleženje klicev orodij (`mcp_tool_audit`)                               |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Zapisovalnik signala delovanja stdio (`mcp-heartbeat.json`)                         |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Stiskanje opisov za registre orodij, pozivov in virov                               |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Sheme Zod + register orodij (`MCP_TOOLS`, 45 vnosov)                                |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Obravnavalniki orodij za 2. fazo, predpomnilnik in 1proxy                           |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Obravnavalniki orodij za stiskanje                                                  |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definicije orodij za pomnilnik (3 orodja)                                           |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definicije orodij za veščine (4 orodja)                                             |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definicije orodij za kontekstni vir Notion (6 orodij)                               |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definicije orodij za igrifikacijo (8 orodij)                                        |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Orodja za registracijo in upravljanje vtičnikov (8 orodij)                          |
| `src/app/api/mcp/status/route.ts`                                        | Končna točka `/api/mcp/status`                                                      |
| `src/app/api/mcp/tools/route.ts`                                         | Končna točka `/api/mcp/tools`                                                       |
| `src/app/api/mcp/sse/route.ts`                                           | Pot prenosa SSE `/api/mcp/sse`                                                      |
| `src/app/api/mcp/stream/route.ts`                                        | Pot prenosa Streamable HTTP `/api/mcp/stream`                                       |
| `src/app/api/mcp/audit/route.ts`                                         | Poizvedba revizijskega dnevnika `/api/mcp/audit`                                    |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Združene revizijske metrike `/api/mcp/audit/stats`                                  |
| `src/lib/notion/api.ts`                                                  | Odjemalec REST API-ja Notion (ponovni poskusi, časovna omejitev, razvrščanje napak) |
| `src/lib/db/notion.ts`                                                   | Trajno shranjevanje žetona Notion (tabela `key_value`)                              |
| `src/app/api/settings/notion/route.ts`                                   | API nastavitev za Notion (GET/POST/DELETE)                                          |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Uporabniški vmesnik za upravljanje žetona Notion                                    |
| `tests/unit/notion-api.test.ts`                                          | Preizkusi odjemalca API-ja Notion (7)                                               |
| `tests/unit/notion-tools.test.ts`                                        | Preizkusi uveljavljanja obsega orodij Notion (10)                                   |
| `tests/unit/db/notion.test.mjs`                                          | Preizkusi modula podatkovne zbirke Notion (3)                                       |
