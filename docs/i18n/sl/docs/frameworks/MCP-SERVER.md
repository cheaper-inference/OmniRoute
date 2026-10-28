# OmniRoute MCP Server Documentation (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Strežnik Model Context Protocol s 110 orodji za operacije usmerjanja, predpomnilnika, stiskanja, pomnilnika, veščin, posredniškega strežnika, nabora, Radarja in virov konteksta.
>
> Verodostojni vir: `open-sse/mcp-server/server.ts` izračuna **110 edinstvenih orodij** s funkcijo `countUniqueMcpTools()`: 45 kanoničnih definicij (vključno s šestimi orodji življenjskega cikla CCR, trojico agent-skills, `omniroute_radar_catalog` in `omniroute_x_search`), poleg tega pa še orodja za pomnilnik (3), veščine (4), veščine GitHub (3), nabor (6), igrifikacijo (8), vtičnike (8), Notion (6), Obsidian (22), lokalni korpus (3) in dve orodji za stiskanje, namenjeni izključno RTK.

## Namestitev

OmniRoute MCP je vgrajen. Zaženite ga z:

```bash
omniroute --mcp
```

Ali prek transporta open-sse:

```bash
# Pretočni transport HTTP (vrata 20130)
omniroute --dev  # MCP se samodejno zažene na končni točki /mcp
```

Transporti HTTP (`sse` / `streamable-http`, ki jih znotraj procesa zagotavlja strežnik nadzorne plošče) so
privzeto izklopljeni in jih je bilo prej mogoče preklapljati samo na strani `/dashboard/mcp`. Od različice v3.8.51
CLI ponuja enake možnosti:

```bash
omniroute mcp status                                  # omogočeno/povezano, transport, število orodij
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # ponastavi aktivne seje sse/streamable-http
```

`mcp enable`/`mcp disable` z metodo PATCH spremenita isto nastavitev `mcpEnabled` (in po želji `mcpTransport`),
ki jo nadzorna plošča preklaplja prek `/api/settings`. `mcp restart` pokliče `POST /api/mcp/restart`: prekine
aktivne seje `sse`/`streamable-http`, tako da se ob naslednji zahtevi znova pravilno inicializirajo, vrne
`409`, če je MCP onemogočen, in `501` za transport `stdio` (odjemalci stdio upravljajo svoje
podprocese — znotraj procesa ni ročice, ki bi jo bilo mogoče znova zagnati).

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

| Orodje                              | Obsegi              | Opis                                                                                                                                            |
| :---------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Nastavitve stiskanja, povzetek analitike in statistika, ki upošteva predpomnilnik (vključuje metapodatke `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Konfiguracija načina stiskanja, praga, ciljnega razmerja, ohranjanja sistemskega poziva in preklopa stiskanja opisov MCP                        |
| `omniroute_set_compression_engine`  | `write:compression` | Izbira dejavnega mehanizma (off/caveman/rtk/stacked) in intenzivnosti Caveman/RTK                                                               |
| `omniroute_list_compression_combos` | `read:compression`  | Seznam poimenovanih kombinacij stiskanja in njihovih cevovodov mehanizmov                                                                       |
| `omniroute_compression_combo_stats` | `read:compression`  | Analitika, združena po kombinaciji stiskanja in mehanizmu                                                                                       |
| `omniroute_ccr_store`               | `write:compression` | Shranjevanje vsebine, ločene glede na klicatelja, v omejeni pomnilniški shrambi CCR ter vračilo označevalnika in sklica `ccr://`                |
| `omniroute_ccr_retrieve`            | `read:compression`  | Pridobivanje celotne vsebine CCR ali z načini za začetek, konec, vrstice, grep in statistiko                                                    |
| `omniroute_ccr_inspect`             | `read:compression`  | Pregled metapodatkov CCR v lasti klicatelja brez vračanja vsebine                                                                               |
| `omniroute_ccr_list`                | `read:compression`  | Seznam metapodatkov s številčenjem strani za bloke CCR v lasti klicatelja                                                                       |
| `omniroute_ccr_delete`              | `write:compression` | Brisanje bloka CCR v lasti klicatelja                                                                                                           |
| `omniroute_ccr_stats`               | `read:compression`  | Poročilo o uporabi pomnilnika, števcitih življenjskega cikla in omejitvah shrambe glede na klicatelja                                           |
| `omniroute_rtk_discover`            | `read:compression`  | Odkrivanje ponavljajočega se šuma v vzorcih izhodnih podatkov RTK, za katere je bila podana privolitev                                          |
| `omniroute_rtk_learn`               | `read:compression`  | Ustvarjanje osnutka filtra RTK za pregled iz vzorcev, za katere je bila podana privolitev                                                       |

Vnosi CCR so shranjeni samo v pomnilniku in ob ponovnem zagonu izginejo. Posamezen blok je omejen na 2 MiB, posamezna
identiteta na 16 MiB, globalna shramba pa na 64 MiB. Privzeti čas veljavnosti vnosov je 24 ur (največ
sedem dni). Celotno pridobivanje prek MCP je omejeno na 256 KiB; večji bloki ostanejo na voljo prek
načinov z obsegi in grep. Shranjevanje, pridobivanje, izpisovanje, pregledovanje, brisanje in statistika so ločeni glede na
overjeno identiteto ključa API. Revizijski zapisi vsebujejo zgoščene vrednosti in metapodatke o velikosti, nikoli pa vsebine.

`omniroute_compression_status` poroča o stiskanju opisov MCP ločeno pod
`analytics.mcpDescriptionCompression`. Te vrednosti so ocene velikosti metapodatkov za opise MCP, ki jih je mogoče izpisati
(`tools`, `prompts`, `resources` in `resourceTemplates`); niso potrdila o uporabi pri ponudniku
in so označene z `source: "mcp_metadata_estimate"`.

### Filter drevesa dostopnosti MCP (v3.8.0)

Neodvisno od zgornjih orodij za stiskanje OmniRoute vključuje filter po izvedbi, ki
stisne **rezultate orodij** brskalniških orodij/orodij za dostopnost MCP, preden so vrnjeni
agentu. Ta filter sam po sebi ni orodje — pregledno se izvede nad vsakim rezultatom orodja, ki vsebuje
obsežno besedilo drevesa dostopnosti ali posnetka brskalnika (≥2000 znakov).

Ključne značilnosti:

- Strne ≥30 zaporednih ponovljenih vrstic sorodnih elementov v povzetek začetka + konca
- Ohrani sidra `[ref=eXX]`, ki jih zahteva Playwright/uporaba računalnika
- Strogo odreže predolgo besedilo (>50.000 znakov) z namigom za krmarjenje
- Pričakovani prihranek: **60–80 %** pri koristnih vsebinah posnetkov brskalnika

Konfiguracija: `compression.mcpAccessibility` v globalnih nastavitvah (migracija 056).
Implementacija: `open-sse/services/compression/engines/mcpAccessibility/`.
Celotna dokumentacija: [Mehanizmi stiskanja — filter drevesa dostopnosti MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Za model stiskanja med izvajanjem, na katerem temeljijo ta orodja, glejte [Mehanizmi stiskanja](../compression/COMPRESSION_ENGINES.md) in [Stiskanje RTK](../compression/RTK_COMPRESSION.md).

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

Klici orodij MCP preberejo nize obsegov od klicatelja. To preverjanje je eno od treh neodvisnih imenskih prostorov. Prehod pri enem preverjevalniku ni prehod pri drugih. Pravila so [Trije imenski prostori obsegov](#three-scope-namespaces). Katalog orodij je [Obsegi orodij MCP](#mcp-tool-scopes).

### Trije imenski prostori obsegov

`manage` na ključu API, `read:compression` na orodju MCP in `read` na dostopnem žetonu `oma_live_…` so tri različna dovoljenja. Klicatelji, ki pošljejo dostopni žeton `read` na upravljalno pot, ki spreminja stanje, dobijo HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Ta rang je `scopeSatisfies`. Ne upošteva tabele MCP, prav tako pa seMatcher MCP ne upošteva njega.

| Imenski prostor          | Poverilnica                                                               | Preverjevalnik                     | Prehod dovoli                                           |
| :----------------------- | :------------------------------------------------------------------------ | :--------------------------------- | :------------------------------------------------------ |
| Upravljanje ključev API  | `api_keys.scopes`                                                         | `hasManageScope`                   | Upravljalni REST za ta ključ Bearer                     |
| Aditivno pri ključih API | isti niz, natanko en niz                                                  | pomožna funkcija, imenovana spodaj | Samo ta ena zmožnost                                    |
| Obsegi orodij MCP        | isti niz, sicer MCP `_meta` (samo HTTP/SSE), sicer `OMNIROUTE_MCP_SCOPES` | `scopeMatches`                     | To orodilo, ko je uveljavljanje vklopljeno              |
| Dostopni žeton           | `oma_live_…`                                                              | `scopeSatisfies`                   | Upravljalna pot, katere metoda in pot zahtevata ta rang |

Izdaja vsake poverilnice je opisana v
[Upravljalno preverjanje pristnosti](../guides/MANAGEMENT-AUTH.md).

#### Obsegi ključev API

En niz `api_keys.scopes` služi dvema nalogama. Uporabljata različni funkciji.

**Upravljalni REST.** `manage` in `admin` sta člana
`MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`).
`hasManageScope` je to, kar pooblašča upravljalne poti za ta ključ. `admin` je
na teh poteh upravljalno sposoben. Beseda `admin` tu ni rang dostopnega žetona
in se ne razširi v obsege orodij MCP.

**Aditivni nizi.** Vsak je natančen preskus članstva in vsak ostane zunaj
`MANAGEMENT_API_KEY_SCOPES`.

| Obseg                          | Prehod dovoli                                                                                                                                                         |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Samo izjemno določbo LOCAL_ONLY za `/api/mcp/` brez povratne zveze (`hasMcpConnectOrManageScope`). Ključ z `manage` ali `admin` še vedno prestane to izjemno določbo. |
| `self:usage`                   | `GET /api/v1/me/status` za ta ključ (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` ta obseg doda ob ustvarjanju (`normalizeSelfServiceScopesForCreate`).     |
| `self:account-quota`           | Kvote računa pri ponudniku znotraj te vsebine stanja (`src/lib/usage/apiKeySelfService.ts`). Pot stanja še vedno zahteva `self:usage`.                                |
| `policy:bypass-provider-quota` | Inferenčni klici tega ključa preskočijo pravilo kvot ponudnika (`hasProviderQuotaBypassScope` v `src/sse/handlers/chat.ts`).                                          |

#### Ujemanje

Katalog je tabela pod [Obsegi orodij MCP](#mcp-tool-scopes). `MCP_SCOPE_LIST` v
`src/shared/constants/mcpScopes.ts` ne obravnavaj kot ta katalog:
to je prvotni tipizirani podsklop. Poznejša orodja poleg njega razglasijo še
nadaljnje obsege (`read:notion`, `read:skills`, `read:local-corpus` in preostalo
tabele).

`evaluateToolScopes` v `open-sse/mcp-server/scopeEnforcement.ts` dovoli klic,
ko se vsak zahtevani obseg ujema z nekim podeljenim obsegom:

- `*` se ujema z vsakim zahtevanim obsegom.
- Podeljeni obseg, ki se konča z `*`, se ujema z zahtevanim obsegom, ki se začne
  s predpono pred zvezdico. `read:*` se ujema z `read:compression`.
- Vsak drug podeljeni obseg se ujema samo z identičnim zahtevanim nizom.

Ključ z obsegi `["manage"]` ne prestane `scopeMatches` za `read:compression`.
Isti klic ne prestane niti za `admin`, `mcp:connect`, `read` in `write`, ko so to
edini podeljeni nizi. Med obsegi orodij MCP ni hierarhije razen končne `*`.

Uveljavljanje je izklopljeno, razen če je `OMNIROUTE_MCP_ENFORCE_SCOPES=true`
(privzeto `false`). Dokler je izklopljeno, `evaluateToolScopes` dovoli klic in
preskoči katalog. Ko je vklopljeno, HTTP uporablja `api_keys.scopes` ključa
Bearer kot `authInfo` (glej [Vezava obsegov HTTP na ključ](#per-key-http-scope-binding-7895)).
Ko se obsegi nobenega ključa ne razrešijo, se podeljeni nabor prelije na MCP
`_meta` (upoštevan samo za klicatelje HTTP/SSE, znotraj HTTP avtentikacijskega
konteksta; `_meta` klicatelja stdio je prezrt, ker ga nadzoruje odjemalec in ne
nosi identitete posameznega klicatelja), nato na `OMNIROUTE_MCP_SCOPES`.

#### Obsegi dostopnih žetonov

Žetoni `oma_live_…` (`src/lib/accessTokens/scopes.ts`) nosijo `read`, `write`
ali `admin`. `scopeSatisfies` je rang: `admin` zajema `write` in `read`, `write`
pa zajema `read`. Neznani obsegi ne zajemajo ničesar.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) primerja ta
rang z `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` in `OPTIONS` zahtevajo `read`.
- Vse druge metode zahtevajo `write`.
- Poti v `ADMIN_SCOPE_PREFIXES` zahtevajo `admin` za vsako metodo. `/api/mcp`
  je na tem seznamu, zato dostopni žeton z `write` še vedno ne more klicati
  MCP HTTP vmesnika.
- Poti v `ADMIN_MUTATION_PREFIXES` zahtevajo `admin` samo za mutacije.
- Poti v `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`,
  `/api/settings/require-login`) zahtevajo `admin` samo za mutacije in samo
  na tej natančni poti — druge podpoti `/api/settings/*` obdržijo `write`.

`PATCH /api/keys/{id}` je mutacija in ni na nobenem od teh skrbniških seznamov,
zato žeton z `read` prejme 403
`Access token scope 'read' is insufficient; 'write' required.`
Dostopni žeton z `write` ali `admin` zadošča tej poti. JWT nadzorne plošče,
loopback žeton CLI machine-id in API ključ z `manage` ali `admin` gredo po
drugih vejah in niso omejeni s to stopnjo.

Dostopni žeton, ki ustreza `scopeSatisfies` za `/api/mcp`, je opravil le
upravni prehod. Klici orodij še vedno izvajajo `scopeMatches` glede na obsege
API ključev. Stopnja dostopnega žetona ni vhod v `scopeMatches`.

### Obsegi orodij MCP

Uporaba obsegov je centralizirana v `open-sse/mcp-server/scopeEnforcement.ts`.
Vsako orodje zahteva določene obsege:

| Obseg                 | Orodja                                                                                                                                                                             |
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

Nadomestni (wildcard) scope-i so podprti: `read:*` dodeli vse bralne scope-e, `*` dodeli poln dostop.

### `mcp:connect` — ozko omejena zmogljivost poti (#7895)

Dostop do HTTP/SSE MCP transporta (`/api/mcp/*`) z ne-lokacijskega (non-loopback) nasprotnika zahteva izključitev (carve-out) `/api/mcp/` LOCAL_ONLY (glej `docs/security/ROUTE_GUARD_TIERS.md`). Ta izključitev je prej sprejemala le API ključ s polnim scope-om `manage`/`admin` — preveč široko za klicatelja, ki mora le komunicirati z MCP. `src/shared/constants/managementScopes.ts` zdaj izvaža `MCP_CONNECT_SCOPE = "mcp:connect"`: dodatni, ozek scope (iste prakse kot `SELF_USAGE_SCOPE`), ki dovoljuje IZKLJUČNO obhod `/api/mcp/` v `src/server/authz/policies/management.ts` — ne dodeluje nobenega drugega dostopa do upravljalnih poti in je namenoma zunaj `MANAGEMENT_API_KEY_SCOPES`. Ključ s scope-om `manage`/`admin` še vedno brez sprememb prestane to izključitev; `mcp:connect` je alternativa z nižjimi pravicami za oddaljene klicatelje, ki uporabljajo samo MCP, preverjena prek `hasMcpConnectOrManageScope()`.

### Vezava HTTP scope-ov na posamezni ključ (#7895)

Prek HTTP/SSE `open-sse/mcp-server/httpTransport.ts` zdaj prek `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) razreši dejanske `api_keys.scopes` klicatelja in jih posreduje MCP SDK-ju prek `transport.handleRequest(req, { authInfo })`, zato `extra.authInfo.scopes`, ki pride do vsakega klica orodja, odraža lastne scope-e Bearer ključa. `resolveCallerScopeContext()` iz `scopeEnforcement.ts` je že dajal prednost `authInfo` pred `_meta` in nadomestno env spremenljivko `OMNIROUTE_MCP_SCOPES` — to le napolni ta prvi, najvišje prioritetni vir, ki prek HTTP prej ni bil oskrbovan. Ko se noben API ključ ne razreši (ni glave, neveljaven ključ), `authInfo` ostane `undefined` in razreševanje neokrnjeno pade na obstoječo verigo `meta`/env. stdio nima identitete posameznega klicatelja (glej `mcpCallerIdentity.ts`) in ni prizadeten z vezavo na posamezni ključ — preskoči korak `_meta` (`_meta` se upošteva le znotraj HTTP avtentikacijskega konteksta, #15159) in se razreši le iz env ključa `OMNIROUTE_MCP_SCOPES`.

**Uveljavljanje scope-ov je za HTTP/SSE klicatelje z ozkimi scope-i prisiljeno ne glede na `OMNIROUTE_MCP_ENFORCE_SCOPES`.** Privzeta vrednost `false` za `OMNIROUTE_MCP_ENFORCE_SCOPES` je varna le za lokalni/stdio tok z enim operaterjem, kjer ni identitete klicatelja, proti kateri bi se scope-i lahko uporabili. `open-sse/mcp-server/server.ts::withScopeEnforcement()` brezpogojno vklopi uveljavljanje scope-ov po posameznih orodjih (`shouldForceScopeEnforcement()` v `scopeEnforcement.ts`), kadar je `resolveCallerScopeContext()` razrešil `source === "authInfo"` (torej prava glava HTTP Authorization, vezana na posamezni ključ, samo HTTP/SSE) IN ta ključ nima polnega scope-a `manage`/`admin`. S tem se zapre vrzel, kjer bi ključ, ki ima IZKLJUČNO ozki obhodni scope `mcp:connect` — zgoraj opisan kot dovoljenje, ki ne dovoli ničesar razen izključitve `/api/mcp/` LOCAL_ONLY — sicer lahko poklical vsako MCP orodje, ko bi operater omogočil oddaljen/non-loopback dostop do MCP, samo zato, ker `OMNIROUTE_MCP_ENFORCE_SCOPES` privzeto vsebuje `false`. Poln ključ `manage`/`admin` prek HTTP in vsak stdio/lokalni klicatelec ohranijo obstoječe vedenje, nadzorovano z `OMNIROUTE_MCP_ENFORCE_SCOPES`.

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
