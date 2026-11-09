# OmniRoute MCP Server Documentation (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> 110 eszközt biztosító Model Context Protocol-szerver útválasztási, gyorsítótárazási, tömörítési, memória-, készség-, proxy-, pool-, Radar- és kontextusforrás-műveletekhez.
>
> A hiteles forrás: az `open-sse/mcp-server/server.ts` a `countUniqueMcpTools()` használatával **110 egyedi eszközt** számol: 45 kanonikus definíciót (beleértve a hat CCR-életciklus-eszközt, az agent-skills hármast, az `omniroute_radar_catalog` és az `omniroute_x_search` eszközöket), továbbá a memória (3), a készségek (4), a GitHub-készségek (3), a pool (6), a gamifikáció (8), a bővítmények (8), a Notion (6), az Obsidian (22), a helyi korpusz (3), valamint két, kizárólag RTK-hoz tartozó tömörítési eszközt.

## Telepítés

OmniRoute MCP be van építve. Kezdje ezzel:

```bash
omniroute --mcp
```

Vagy az open-sse transzporttal:

```bash
# Streamable HTTP transport (default port 20128, in-process on the dashboard server)
# Client endpoint: http://localhost:20128/api/mcp/stream
# stdio: omniroute --mcp
```

A HTTP átvitelek (`sse` / `streamable-http`, folyamat közben az irányítópult-szerver szolgálja ki) alapértelmezés szerint ki vannak kapcsolva, és korábban csak a `/dashboard/mcp` oldalról válthatók át. A 3.8.51 verziótól kezdve a CLI paritása:

```bash
omniroute mcp status                                  # enabled/online, transport, tool count
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resets active sse/streamable-http sessions
```

`mcp enable`/`mcp disable` PATCH ugyanaz a `mcpEnabled` (és opcionálisan `mcpTransport`) a műszerfal beállítása `/api/settings` keresztül vált. `mcp restart` meghívja `POST /api/mcp/restart`: lebontja az aktív `sse`/`streamable-http` szekciókat, így a következő kérés tisztán újrainicializálódik, `409` adja vissza, ha MCP le van tiltva, és `501` adja vissza a `stdio` szállításhoz (az stdio kliensek saját alfolyamattal rendelkeznek — nincs folyamaton belüli fogantyú az újraindításhoz).

## Transzportok

Az MCP-szerver három transzportot tesz elérhetővé, amelyek mindegyike ugyanazon a `createMcpServer()` gyárfüggvényen alapul:

| Transzport        | Hely                                                    | Mikor használja                                                     |
| :---------------- | :------------------------------------------------------ | :------------------------------------------------------------------ |
| `stdio`           | `open-sse/mcp-server/server.ts`                         | IDE-integrációkhoz (Claude Desktop, Cursor stb.)                    |
| `sse`             | `POST/GET /api/mcp/sse` a `httpTransport` használatával | Böngésző- vagy ágenskliensekhez, amelyek eseményfolyamot igényelnek |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`                       | Több munkamenetet kezelő HTTP-kliensekhez (`mcp-session-id` fejléc) |

Az aktív HTTP-transzportot (`sse` vagy `streamable-http`) az `mcpTransport` beállítás választja ki. A transzportok közötti váltás lezárja a másik transzport meglévő munkameneteit.

### Távoli hozzáférés (manage-hatókör megkerülése)

Az `/api/mcp/*` a LOCAL_ONLY szinthez tartozik (`src/server/authz/routeGuard.ts`) — alapértelmezés szerint csak a visszacsatolási címek (`localhost`, `127.0.0.1`, `::1`) érhetik el. A v3.8.2-es verziótól kezdve a nem visszacsatolási kliensek is csatlakozhatnak, ha olyan `Authorization: Bearer <api-key>` fejlécet küldenek, amelynek kulcsa rendelkezik a `manage` hatókörrel. Ez az egyetlen módja annak, hogy alagúton, fordított proxyn vagy nyilvános állomásnéven keresztül elérje a távoli MCP-szervert.

```bash
# Adja meg a manage hatókört: nyissa meg a dashboard API Keys oldalát, és kapcsolja be
# a "Management Access" lehetőséget a kulcson, vagy létrehozáskor küldje el a scopes:["manage"] értéket.

# Ezután csatlakozzon egy távoli MCP-kliensről:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

A manage hatókörrel nem rendelkező kulcs (vagy Bearer-fejléc hiánya) `403 LOCAL_ONLY` választ ad. A testvérprefix, az `/api/cli-tools/runtime/*` szándékosan NEM kerülhető meg — lásd: [Útvonalvédelmi szintek — A manage-hatókör kivétele](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

### Origin-ellenőrzés

A hitelesítés után az `/api/mcp/*` minden kérésénél — a transzportok és az olyan kezelési útvonalak esetében is, mint a `status`, `tools`, `audit` és `restart` — ellenőrizzük az `Origin` fejlécet, függetlenül a hívó kilététől (API-kulcs, CLI-token, dashboard-munkamenet vagy névtelen visszacsatolási kapcsolat bejelentkezés kikapcsolása mellett). Ez az MCP Streamable HTTP-specifikáció által előírt DNS-újrakötési védelem.

- **Nincs `Origin` fejléc** → engedélyezve. Az OmniRoute CLI, az SDK és az IDE-kliensek nem küldenek ilyet.
- **Engedélyezett `Origin`** → bármely porton a `localhost`, a `127.0.0.1` vagy a `[::1]`, illetve az OmniRoute saját nyilvános originje: `OMNIROUTE_PUBLIC_BASE_URL` / `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_APP_URL`, egy megbízható fordított proxy továbbított originje (`OMNIROUTE_TRUST_PROXY`, csak akkor, ha nincs beállítva base URL), vagy egy közvetlen visszacsatolási/LAN IP-állomás. A `Host` fejléc önmagában soha nem tesz egy origint megbízhatóvá.
- **Bármely más `Origin`, beleértve a `null` értéket is** → `403` válasz JSON-RPC-hibatörzzsel: `id: null`, `error.code: -32000`, `error.data.code: "INVALID_ORIGIN"`. Az érvényes CSRF-tokent küldő dashboard-munkamenetet továbbra is elfogadjuk, ugyanúgy, mint más dashboard-írások esetében.

A fordított proxy mögött kiszolgált böngészős MCP-kliensnek szüksége van az `OMNIROUTE_PUBLIC_BASE_URL` értékre; más originekhez nincs engedélyezési lista. A CORS-előzetes kérés (`OPTIONS`) esetében az Origin-ellenőrzés nem történik meg; az azt követő kérésnél azonban igen.

## IDE-konfiguráció

A Claude Desktop,
Cursor, Cline és kompatibilis MCP-kliensek beállításához lásd az [MCP-kliens konfigurációja](../guides/SETUP_GUIDE.md#mcp-client-configuration) című részt.

---

## Alapvető eszközök (14) — 1. fázis

| Tool                            | Scopes                | Description                                                                                                                                                                    |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Üzemidő, memória, áramkör-megszakítók, sebességkorlátok, gyorsítótár-statisztikák                                                                                              |
| `omniroute_list_combos`         | `read:combos`         | Az összes konfigurált kombináció stratégiákkal (opcionális metrikák)                                                                                                           |
| `omniroute_get_combo_metrics`   | `read:combos`         | Egy adott kombináció teljesítménymetrikái                                                                                                                                      |
| `omniroute_switch_combo`        | `write:combos`        | Egy kombináció aktiválása vagy deaktiválása                                                                                                                                    |
| `omniroute_create_combo`        | `write:combos`        | Érvényesített kombináció létrehozása a meglévő kombinációs API-n keresztül                                                                                                     |
| `omniroute_check_quota`         | `read:quota`          | Felhasznált/teljes kvóta, hátralévő százalék, visszaállítási idő, tokenállapot                                                                                                 |
| `omniroute_route_request`       | `execute:completions` | Chat completion küldése az OmniRoute útválasztásán keresztül                                                                                                                   |
| `omniroute_cost_report`         | `read:usage`          | Költségjelentés időszak szerint (munkamenet/nap/hét/hónap)                                                                                                                     |
| `omniroute_list_models_catalog` | `read:models`         | Teljes modellkatalógus képességekkel, állapottal és árazással                                                                                                                  |
| `omniroute_radar_catalog`       | `read:radar`          | Helyi, aláírt Radar-katalógus; opcionális szolgáltató-/családszűrők                                                                                                            |
| `omniroute_tool_search`         | `read:tools`          | Eszközök felderítése a regisztrált MCP-katalógusból                                                                                                                            |
| `omniroute_web_search`          | `execute:search`      | Webes keresés a konfigurált keresőszolgáltatókon keresztül. Nem támogatja az X/Twittert.                                                                                       |
| `omniroute_x_search`            | `execute:search`      | Keresés az X-en az xAI/SuperGrok segítségével, vagy az `xquik-search` kiválasztása az Xquik API eredményeihez. A kiválasztott háttérrendszerhez hitelesítő adatok szükségesek. |
| `omniroute_web_fetch`           | `execute:search`      | Webes tartalom lekérése a konfigurált lekérési szolgáltatókon keresztül                                                                                                        |

## Haladó eszközök (11) — 2. fázis

| Eszköz                             | Hatókörök                            | Leírás                                                                                                                  |
| :--------------------------------- | :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Próbaüzemű útválasztási szimuláció tartalékfával                                                                        |
| `omniroute_set_budget_guard`       | `write:budget`                       | Munkamenet-költségkeret csökkentési/letiltási/riasztási művelettel                                                      |
| `omniroute_set_routing_strategy`   | `write:combos`                       | A kombóstratégia futás közbeni frissítése (priority/weighted/auto/stb.)                                                 |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` ellenállóképességi előbeállítás alkalmazása                                  |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | A kombó minden szolgáltatójának éles tesztelése valódi upstream-hívással                                                |
| `omniroute_get_provider_metrics`   | `read:health`                        | Szolgáltatónkénti mérőszámok p50/p95/p99 késleltetéssel és a megszakító állapotával                                     |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Feladattípus alapján kombó ajánlása költségkeret- és késleltetési korlátozásokkal                                       |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Annak magyarázata, hogy egy kérés miért egy adott szolgáltatóhoz lett irányítva (pontozási tényezők + tartalékok)       |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Teljes munkamenet-pillanatkép: költség, tokenek, leggyakrabban használt modellek/szolgáltatók, hibák, költségkeret-őr   |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Adatbázis-eltérések diagnosztizálása (és opcionális automatikus javítása), például hibás kombóhivatkozások / árva sorok |
| `omniroute_sync_pricing`           | `pricing:write`                      | Árazási adatok szinkronizálása külső forrásokból (LiteLLM); támogatja a `dryRun` módot                                  |

## Gyorsítótár-eszközök (2)

| Eszköz                  | Hatókörök     | Leírás                                                                     |
| :---------------------- | :------------ | :------------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Szemantikus gyorsítótár-, prompt-gyorsítótár- és idempotencia-statisztikák |
| `omniroute_cache_flush` | `write:cache` | A gyorsítótár ürítése globálisan vagy aláírás/modell alapján               |

## Tömörítő eszközök (13)

| Eszköz                              | Hatókör             | Leírás                                                                                                                                           |
| :---------------------------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Tömörítési beállítások, elemzési összefoglaló és gyorsítótár-tudatos statisztikák (beleértve `analytics.mcpDescriptionCompression` metaadatokat) |
| `omniroute_compression_configure`   | `write:compression` | Konfigurálja a tömörítési módot, a küszöbértéket, a célarányt, a rendszer azonnali megőrzését, MCP leírásának tömörítési kapcsolóját             |
| `omniroute_set_compression_engine`  | `write:compression` | Válassza ki az aktív motort (off/caveman/rtk/stacked) és Caveman/RTK intenzitást                                                                 |
| `omniroute_list_compression_combos` | `read:compression`  | Sorolja fel a megnevezett kompressziós kombókat és azok motorvezetékeit                                                                          |
| `omniroute_compression_combo_stats` | `read:compression`  | Az elemzés tömörítési kombináció és motor szerint csoportosítva                                                                                  |
| `omniroute_ccr_store`               | `write:compression` | Tárolja a hívó féltől elkülönített tartalmat a behatárolt memórián belüli CCR tárolóban, és adjon vissza egy jelölőt és `ccr://` hivatkozást     |
| `omniroute_ccr_retrieve`            | `read:compression`  | Töltse le CCR tartalmat teljes egészében vagy fej, farok, vonalak, grep és statisztikai módokkal                                                 |
| `omniroute_ccr_inspect`             | `read:compression`  | A hívó tulajdonában lévő CCR metaadatok ellenőrzése tartalom visszaadása nélkül                                                                  |
| `omniroute_ccr_list`                | `read:compression`  | Sorolja fel a hívó tulajdonában lévő CCR blokkok oldalszámozott metaadatait                                                                      |
| `omniroute_ccr_delete`              | `write:compression` | Törölje a hívó tulajdonában lévő CCR blokkot                                                                                                     |
| `omniroute_ccr_stats`               | `read:compression`  | Jelentse a hívó hatókörű memóriahasználatot, az életciklus-számlálókat és a tárolási korlátokat                                                  |
| `omniroute_rtk_discover`            | `read:compression`  | Fedezze fel az ismétlődő zajokat az opt-in RTK kimeneti mintákban                                                                                |
| `omniroute_rtk_learn`               | `read:compression`  | Áttekinthető RTK szűrővázlat létrehozása az önkéntes mintákból                                                                                   |

CCR bejegyzések kétszintű tárolót használnak: egy forró memóriaréteget, amelyet helyi, nem felhőalapú futtatókörnyezeteken támogat egy tartós SQLite réteg (`ccr_blocks`, alapértelmezés szerint be van kapcsolva), így a blokk túléli a kilakoltatást vagy az újraindítást, amíg TTL ből ki nem fogy — kivéve az 512 feletti KB memóriablokkokat, amelyek megmaradnak. Minden blokk 2 MiB-re, mindegyik fő 16 MiB, a globális tároló pedig 64 MiB-re korlátozódik. A bejegyzések alapértelmezés szerint 24 órás TTL (maximum hét nap). A teljes MCP visszakeresés 256 KiB-re korlátozódik; a nagyobb blokkok elérhetők maradnak a ranged és grep módokon keresztül. A tárolást, a visszakeresést, a listázást, az ellenőrzést, a törlést és a statisztikákat a hitelesített API-kulcs elválasztja. Az ellenőrzési rekordok kivonatokat és méret metaadatokat tartalmaznak, tartalmat soha. A kezelőre vonatkozó részletek (a két jelölő, az ügyfél előfeltételei, `codemode:false`, az eszközenkénti hatókör, az oldalszámozás és a diagnosztikai mátrix) megtalálhatók [a Compression Engines → Előfeltételek / kezelői útmutatóban](../compression/COMPRESSION_ENGINES.md#prerequisites--operator-guide-ccr--session-dedup).

`omniroute_compression_status` külön jelenti MCP leírás tömörítését `analytics.mcpDescriptionCompression` alatt. Ezek az értékek MCP listázható leírások metaadat-méretére vonatkozó becslések (`tools`, `prompts`, `resources` és `resourceTemplates`); ezek nem szolgáltatói használati nyugták, és `source: "mcp_metadata_estimate"` jelzéssel vannak ellátva.

### MCP Accessibility Tree Filter (v3.8.0)

A fenti tömörítési eszközöktől eltekintve OmniRoute tartalmaz egy végrehajtás utáni szűrőt, amely tömöríti a** eszköz eredményeit** MCP browser/accessibility eszközöket, mielőtt visszaküldik őket az ügynöknek. Ez a szűrő önmagában nem egy eszköz — hanem transzparensen fut minden olyan eszközeredményen, amely bőbeszédű akadálymentesítési fát vagy böngésző-pillanatkép szöveget tartalmaz (≥ 2000 karakter).

Legfontosabb viselkedések:

- Összecsukja ≥ 30 egymást követő ismétlődő testvérsort a head + tail összefoglalóba
- Megőrzi Playwright/computer-use által igényelt `[ref=eXX]` horgonyokat
- A túlméretezett szöveget keményen csonkolja (> 50 000 karakter) navigációs utalással
- Várható megtakarítás:** 60-80%** a böngésző pillanatképei rakományain

Konfiguráció: `compression.mcpAccessibility` a globális beállításokban (migráció 056). Megvalósítás: `open-sse/services/compression/engines/mcpAccessibility/`. Teljes dokumentumok: [Compression Engines — MCP Accessibility Tree Filter](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Az eszközök mögötti futásidejű tömörítési modellért lásd: [Compression Engines](../compression/COMPRESSION_ENGINES.md) és [RTK Compression](../compression/RTK_COMPRESSION.md).

## 1Proxy-eszközök (3)

| Eszköz                      | Hatókörök      | Leírás                                                                                      |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Ingyenes proxyk lekérése az 1proxy piacteréről (protokoll-/ország-/minőség-/limit-szűrők)   |
| `omniroute_oneproxy_rotate` | `read:proxies` | A stratégia alapján (`random` / `quality` / `sequential`) következő elérhető proxy lekérése |
| `omniroute_oneproxy_stats`  | `read:proxies` | Készletstatisztikák, szinkronizálási állapot, protokoll és ország szerinti eloszlás         |

## Memóriaeszközök (3)

A következő helyen definiálva: `open-sse/mcp-server/tools/memoryTools.ts`. A hitelesítés és a hatókörök kikényszerítése a szabványos MCP-hatókörfolyamaton keresztül történik.

| Eszköz                    | Hatókörök      | Leírás                                                                                          |
| :------------------------ | :------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Memóriák keresése lekérdezés / típus / API-kulcs alapján, tokenkeret-kikényszerítéssel          |
| `omniroute_memory_add`    | `write:memory` | Új memória-bejegyzés hozzáadása (`factual` / `episodic` / `procedural` / `semantic`)            |
| `omniroute_memory_clear`  | `write:memory` | Memóriák törlése egy API-kulcshoz, opcionálisan típus vagy `olderThan` időbélyeg alapján szűrve |

## Képességeszközök (4)

A következő helyen definiálva: `open-sse/mcp-server/tools/skillTools.ts`. A `src/lib/skills/registry` + `src/lib/skills/executor` támogatásával működik.

| Eszköz                        | Hatókörök        | Leírás                                                                                                     |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | A regisztrált képességek listázása, opcionális szűréssel API-kulcs, név vagy engedélyezett állapot alapján |
| `omniroute_skills_enable`     | `write:skills`   | Egy adott képesség engedélyezése vagy letiltása azonosító alapján                                          |
| `omniroute_skills_execute`    | `execute:skills` | Képesség végrehajtása a megadott bemenettel, majd a végrehajtási rekord visszaadása                        |
| `omniroute_skills_executions` | `read:skills`    | A legutóbbi képesség-végrehajtások előzményeinek listázása                                                 |

## Notion-környezeti forrás (6)

A következő helyen definiálva: `open-sse/mcp-server/tools/notionTools.ts`. A token a `key_value` táblában tárolódik a `src/lib/db/notion.ts` használatával. REST-kliens itt: `src/lib/notion/api.ts`. A beállítások API-ja itt található: `src/app/api/settings/notion/route.ts`. Az irányítópult felhasználói felülete itt található: `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Állítsd be a Notion-integrációs tokenedet az Endpoint irányítópult **Környezeti források** lapján vagy a REST API-n keresztül:

```bash
# Token beállítása
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Állapot ellenőrzése
curl http://localhost:20128/api/settings/notion

# Kapcsolat bontása
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Eszköz                       | Hatókörök      | Leírás                                                                    |
| :--------------------------- | :------------- | :------------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | Teljes szövegű keresés az összes oldal és adatbázis között                |
| `notion_get_page`            | `read:notion`  | Oldal lekérése azonosító alapján a tulajdonságaival együtt                |
| `notion_list_block_children` | `read:notion`  | Egy oldal vagy blokk gyermekblokkjainak listázása                         |
| `notion_query_database`      | `read:notion`  | Adatbázis lekérdezése szűrőkkel, rendezésekkel és lapozással              |
| `notion_get_database`        | `read:notion`  | Adatbázisséma lekérése azonosító alapján                                  |
| `notion_append_blocks`       | `write:notion` | Gyermekblokkok hozzáfűzése egy szülőblokkhoz (kérésenként legfeljebb 100) |

## Agent Skill-katalógus eszközei (3)

A(z) `open-sse/mcp-server/tools/agentSkillTools.ts` fájlban definiálva. A `src/lib/agentSkills/catalog` által támogatva. Ezek az eszközök a 45 bejegyzést tartalmazó Agent Skills-dokumentációs katalógust teszik elérhetővé MCP-kliensek és külső ügynökök számára. Hatókör: `read:catalog`.

| Eszköz                            | Hatókörök      | Leírás                                                                                                                                                                        |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Az összes 45 agent skill felsorolása opcionális `category` (api\|cli) és `area` szűrőkkel; metaadatokat és lefedettséget ad vissza                                            |
| `omniroute_agent_skills_get`      | `read:catalog` | Egyetlen skill teljes metaadatainak és SKILL.md-tartalmának lekérése a kanonikus `id` alapján                                                                                 |
| `omniroute_agent_skills_coverage` | `read:catalog` | Lefedettségi statisztikák: a 23 API-, 21 CLI- és 1 konfigurációs skill közül hány rendelkezik SKILL.md-fájllal a fájlrendszeren a katalógusban szereplő teljes számhoz képest |

A teljes katalógust és azt, hogy a külső ügynökök hogyan használhatják, lásd az [AGENT-SKILLS.md](./AGENT-SKILLS.md) fájlban.

## Kapcsolódó keretrendszerek (v3.8.0)

A fenti MCP-eszközleltár (110 egyedi eszköz, a `countUniqueMcpTools()` által kiszámítva) szándékosan a futásidejű útválasztási/gyorsítótárazási/tömörítési/memória-/skill-/proxy-/környezeti forrásműveletekre korlátozódik. Két kapcsolódó keretrendszer érkezik az MCP-szerverrel együtt a v3.8.0-s verzióban, és külön dokumentációban szerepelnek:

### Felhőügynökök

A felhőügynökök folyamaton kívül futó AI-kódoló ügynökök (codex-cloud, cursor-cloud, devin, jules), amelyek az LLM-szolgáltatóknál használt kapcsolati modellen keresztül kapcsolódnak az OmniRoute-hoz. Saját REST-felületükön (`/api/v1/agents/*`) érhetők el, és **nem** részei az MCP-eszközkatalógusnak — egy felhőügynök meghívása nem használ fel MCP-hatókört.

- Megvalósítás: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Életciklus: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentáció: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrails

A Guardrails a csevegési folyamaton belül alkalmazott, végrehajtás előtti/utáni szűrők (vision-bridge, pii-masker, prompt-injection). Az MCP-eszköz-/útválasztási réteg elérése előtt futnak le, és strukturált szabálysértéseket küldenek az auditfolyamatba; nem MCP-eszközökként kerülnek meghívásra.

- Megvalósítás: `src/lib/guardrails/`.
- Dokumentáció: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Egy blokkoltnak tűnő MCP-hívás hibakeresésekor ellenőrizze mind az MCP auditnaplóját (`scope_denied:*` bejegyzések), mind a Guardrails auditnyomát — előfordulhat, hogy egy kérést egy Guardrail elutasít, **mielőtt** az egyáltalán elérné az MCP-hatókörök kényszerítését végző réteget.

---

## REST API-végpontok

| Végpont                | Metódus               | Leírás                                                                                                        | Hitelesítés                 |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------ | :-------------------------- |
| `/api/mcp/status`      | `GET`                 | Szerverállapot: szívverés, a HTTP-átvitel állapota, az audittevékenység összefoglalása                        | Kezelési (munkamenet/admin) |
| `/api/mcp/tools`       | `GET`                 | Eszközkatalógus (név, leírás, hatókörök, fázis, forrásvégpontok)                                              | Kezelési                    |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE-átviteli végpont (az `mcpEnabled` + `mcpTransport === "sse"` beállítás engedélyezi)                       | API-kulcs + hatókörök       |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamelhető HTTP-átvitel (az `mcp-session-id` fejlécet használja; a `DELETE` lezárja a munkamenetet)         | API-kulcs + hatókörök       |
| `/api/mcp/audit`       | `GET`                 | Az `mcp_tool_audit` auditnapló-bejegyzései (szűrők: `limit`, `offset`, `tool`, `success`, `apiKeyId`)         | Kezelési                    |
| `/api/mcp/audit/stats` | `GET`                 | Összesített auditstatisztikák (`totalCalls`, `successRate`, `avgDurationMs`, leggyakrabban használt eszközök) | Kezelési                    |

Forrásfájlok: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Mind az SSE-, mind a Streamable HTTP-átvitel blokkolva van addig, amíg az MCP-szervert nem engedélyezik a Beállításokban (`mcpEnabled`), és ki nem választják a megfelelő `mcpTransport` értéket. Ha nem megfelelő átvitel van beállítva, a végpont HTTP 400-as választ ad a beállítások módosítására vonatkozó javaslattal.

---

## Hitelesítés és hatókörök

Az MCP-eszközhívások a hatókör-karakterláncokat a hívótól olvassák be. Ez az ellenőrzés a három
független névterület egyikéhez tartozik. Az egyik ellenőrzőnél elért siker nem jelent sikert a többi ellenőrzőnél.
A szabályokat a [Három hatókörnévtér](#three-scope-namespaces) ismerteti.
Az eszközkatalógus az [MCP-eszközök hatókörei](#mcp-tool-scopes) alatt található.

### Három hatókörnévtér

A `manage` egy API-kulcson, a `read:compression` egy MCP-eszközön, valamint a `read` egy
`oma_live_…` hozzáférési tokenen három különböző engedély. Ha a hívók egy
`read` hozzáférési tokent küldenek egy módosítást végző kezelési útvonalnak, HTTP 403 választ kapnak:
`Access token scope 'read' is insufficient; 'write' required.`
Ezt a rangot a `scopeSatisfies` kezeli. Nem veszi figyelembe az MCP-táblázatot, és az MCP-illesztő sem veszi figyelembe ezt.

| Névterület             | Hitelesítő adat                                                                         | Ellenőrző                          | Egy siker ezt engedélyezi                                                           |
| :--------------------- | :-------------------------------------------------------------------------------------- | :--------------------------------- | :---------------------------------------------------------------------------------- |
| API-kulcs kezelése     | `api_keys.scopes`                                                                       | `hasManageScope`                   | A kezelési REST az adott Bearer-kulcshoz                                            |
| API-kulcs kiegészítő   | ugyanaz a tömb, egy pontos karakterlánc                                                 | az alább megnevezett segédfüggvény | Csak azt az egy képességet                                                          |
| MCP-eszközök hatókörei | ugyanaz a tömb, egyébként MCP `_meta` (csak HTTP/SSE), egyébként `OMNIROUTE_MCP_SCOPES` | `scopeMatches`                     | Az adott eszközt, ha a kényszerítés be van kapcsolva                                |
| Hozzáférési token      | `oma_live_…`                                                                            | `scopeSatisfies`                   | Azt a kezelési útvonalat, amelynek metódusa és elérési útja az adott rangot igényli |

Az egyes hitelesítő adatok létrehozását a
[Management Authentication](../guides/MANAGEMENT-AUTH.md) ismerteti.

#### API-kulcs-hatókörök

Egy `api_keys.scopes` tömb két feladatot lát el. Ezek különböző függvényeket használnak.

**Kezelési REST.** A `manage` és az `admin` a
`MANAGEMENT_API_KEY_SCOPES` tagjai (`src/shared/constants/managementScopes.ts`).
A `hasManageScope` engedélyezi a kezelési útvonalakat az adott kulcs számára. Az `admin` ezeken az útvonalakon
kezelési jogosultságot biztosít. Az `admin` szó itt nem a hozzáférési token rangját jelenti,
és nem bővíti ki az MCP-eszközök hatóköreit.

**Kiegészítő karakterláncok.** Mindegyik pontos tagsági teszt, és mindegyik a
`MANAGEMENT_API_KEY_SCOPES` halmazon kívül marad.

| Hatókör                        | Egy siker ezt engedélyezi                                                                                                                                                                   |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mcp:connect`                  | Csak a nem loopback `/api/mcp/` LOCAL_ONLY kivételt (`hasMcpConnectOrManageScope`). A `manage` vagy `admin` hatókörrel rendelkező kulcs erre a kivételre továbbra is megfelel.              |
| `self:usage`                   | A `GET /api/v1/me/status` kérést ehhez a kulcshoz (`src/app/api/v1/me/status/route.ts`). A `POST /api/keys` létrehozáskor hozzáadja ezt a hatókört (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | A fiók upstream kvótáit az adott állapotválaszban (`src/lib/usage/apiKeySelfService.ts`). Az állapotútvonalhoz továbbra is szükséges a `self:usage`.                                        |
| `policy:bypass-provider-quota` | A kulcs következtetési hívásai kihagyják a szolgáltatói kvótára vonatkozó szabályzatot (`hasProviderQuotaBypassScope` a `src/sse/handlers/chat.ts` fájlban).                                |

#### Illesztés

A katalógus az [MCP-eszközök hatókörei](#mcp-tool-scopes) alatt található táblázat. Ne
tekintsd a `MCP_SCOPE_LIST` elemet a `src/shared/constants/mcpScopes.ts` fájlban ennek a katalógusnak:
ez az eredeti, típusosan definiált részhalmaz. A későbbi eszközök további hatóköröket deklarálnak mellette
(`read:notion`, `read:skills`, `read:local-corpus` és a táblázat többi eleme).

Az `open-sse/mcp-server/scopeEnforcement.ts` fájlban található `evaluateToolScopes` akkor engedélyez egy hívást,
ha minden szükséges hatókör illeszkedik valamelyik engedélyezett hatókörhöz:

- A `*` minden szükséges hatókörre illeszkedik.
- A `*` karakterre végződő engedélyezett hatókör olyan szükséges hatókörre illeszkedik, amely a csillag előtti előtaggal kezdődik. A `read:*` illeszkedik a `read:compression` értékre.
- Minden más engedélyezett hatókör csak a vele teljesen azonos szükséges karakterláncra illeszkedik.

Egy olyan kulcs, amelynek hatókörei `["manage"]`, nem felel meg a `scopeMatches` ellenőrzésen a `read:compression` esetében.
Ugyanez a hívás sikertelen az `admin`, a `mcp:connect`, a `read` és a `write` értékek esetén is, ha ezek az egyetlen engedélyezett karakterláncok. Az MCP-eszközök hatókörei között nincs hierarchia a záró `*` kivételével.

A kényszerítés alapértelmezés szerint ki van kapcsolva, és csak akkor aktív, ha az `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (alapértelmezés:
`false`). Amíg ki van kapcsolva, az `evaluateToolScopes` engedélyezi a hívást, és kihagyja a katalógust. Amikor be van kapcsolva, a HTTP a Bearer-kulcs `api_keys.scopes` értékét használja `authInfo`-ként (lásd: [Kulcsonkénti HTTP-hatókör-kötés](#per-key-http-scope-binding-7895)).
Ha nem oldható fel kulcshatókör, az engedélyezett halmaz az MCP `_meta` értékére esik vissza (ezt csak a HTTP/SSE-hívók használhatják, egy HTTP-hitelesítési kontextuson belül; egy stdio-hívó `_meta` értékét figyelmen kívül kell hagyni, mert azt a kliens vezérli, és nem tartalmaz hívónkénti identitást), majd az `OMNIROUTE_MCP_SCOPES` értékére.

#### Hozzáférésitoken-hatókörök

Az `oma_live_…` tokenek (`src/lib/accessTokens/scopes.ts`) `read`, `write` vagy `admin` értéket hordoznak. A `scopeSatisfies` egy rang: az `admin` lefedi a `write` és a `read` értéket, a `write` pedig a `read` értéket. Az ismeretlen hatókörök semmit sem fednek le.

Az `evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) ezt a rangot hasonlítja össze az
`inferRequiredScope` (`src/server/authz/accessScopes.ts`) által meghatározott értékkel:

- A `GET`, `HEAD` és `OPTIONS` a `read` hatókört igényli.
- Minden más metódus a `write` hatókört igényli.
- Az `ADMIN_SCOPE_PREFIXES` útvonalai minden metódus esetén `admin` hatókört igényelnek. Az `/api/mcp`
  szerepel ezen a listán, ezért egy `write` hozzáférési token továbbra sem hívhatja az MCP HTTP
  felületét.
- Az `ADMIN_MUTATION_PREFIXES` útvonalai csak módosítások esetén igényelnek `admin` hatókört.
- Az `ADMIN_MUTATION_EXACT_PATHS` (`/api/settings`,
  `/api/settings/require-login`) útvonalai csak módosítások esetén igényelnek `admin` hatókört, és csak
  azon a pontos útvonalon — az egyéb `/api/settings/*` alútvonalak továbbra is `write` hatókört használnak.

A `PATCH /api/keys/{id}` módosításnak minősül, és nem szerepel ezeken az adminisztrátori listákon, ezért egy
`read` token 403-as választ kap:
`Access token scope 'read' is insufficient; 'write' required.`
Egy `write` vagy `admin` hozzáférési token megfelel ennek az útvonalnak. A dashboard JWT, a loopback CLI gépazonosító-tokenje, valamint a `manage` vagy `admin` hatókörrel rendelkező API-kulcs más ágakon haladnak, és erre a rangsorra nem vonatkozik szűkítés.

Az `/api/mcp` esetén a `scopeSatisfies` ellenőrzésen átjutó hozzáférési token csak a kezelési kapun jutott át. Az eszközhívások továbbra is az API-kulcs hatókörein futtatják a `scopeMatches` ellenőrzést. A hozzáférési token rangsora nem bemenet a `scopeMatches` számára.

### MCP-eszközök hatókörei

A hatókörök kikényszerítése az `open-sse/mcp-server/scopeEnforcement.ts` fájlban központosított.
Minden eszköz meghatározott hatóköröket igényel:

| Hatókör               | Eszközök                                                                                                                                                                          |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                 |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                         |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                            |
| `read:quota`          | `check_quota`                                                                                                                                                                     |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                            |
| `read:models`         | `list_models_catalog`                                                                                                                                                             |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                     |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                             |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                       |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                    |
| `read:cache`          | `cache_stats`                                                                                                                                                                     |
| `write:cache`         | `cache_flush`                                                                                                                                                                     |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                        |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                 |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                             |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                  |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                            |
| `read:memory`         | `memory_search`                                                                                                                                                                   |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                      |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                |
| `write:skills`        | `skills_enable`                                                                                                                                                                   |
| `execute:skills`      | `skills_execute`                                                                                                                                                                  |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                  |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                           |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                         |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                  |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                    |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                   |
| `read:obsidian`       | 13 olvasási eszköz — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 írási eszköz — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                   |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                 |

A helyettesítő karakteres hatókörök támogatottak: a `read:*` minden olvasási hatókört engedélyez, a `*` pedig teljes hozzáférést biztosít.

### `mcp:connect` — szűk útvonalképesség (#7895)

Az HTTP/SSE MCP-átvitel (`/api/mcp/*`) nem loopback-címről történő eléréséhez szükség van a
`/api/mcp/` LOCAL_ONLY kivételre (lásd: `docs/security/ROUTE_GUARD_TIERS.md`). Korábban
ez a kivétel csak teljes `manage`/`admin` hatókörrel rendelkező API-kulcsot fogadott el — ez
túl széles egy olyan hívó számára, amelynek csak az MCP-vel való kommunikációra van szüksége.
A `src/shared/constants/managementScopes.ts` most exportálja az
`MCP_CONNECT_SCOPE = "mcp:connect"` értéket: ez egy hozzáadó, szűk hatókör (ugyanazon
precedens alapján, mint a `SELF_USAGE_SCOPE`), amely KIZÁRÓLAG a
`src/server/authz/policies/management.ts` fájlban található `/api/mcp/` megkerülést
engedélyezi — semmilyen más management-útvonalhoz nem biztosít hozzáférést, és szándékosan
NINCS benne a `MANAGEMENT_API_KEY_SCOPES` értékei között. A `manage`/`admin` hatókörrel
rendelkező kulcsok változatlanul átmennek a kivételen; a `mcp:connect` alacsonyabb jogosultságú
alternatíva távoli, kizárólag MCP-t használó hívók számára, amelyet a
`hasMcpConnectOrManageScope()` ellenőriz.

### Kulcsonkénti HTTP-hatókör-hozzárendelés (#7895)

HTTP/SSE használata esetén az `open-sse/mcp-server/httpTransport.ts` most feloldja a hívó valódi
`api_keys.scopes` értékét a `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
segítségével, és átadja azt az MCP SDK
`transport.handleRequest(req, { authInfo })` metódusának, így az egyes eszközhívásokhoz eljutó
`extra.authInfo.scopes` a Bearer-kulcs saját hatóköreit tükrözi.
A `scopeEnforcement.ts` `resolveCallerScopeContext()` függvénye már korábban is az
`authInfo` értékét részesítette előnyben az `_meta` és az `OMNIROUTE_MCP_SCOPES` környezeti
változó tartalékával szemben — ez csak az első, legmagasabb prioritású forrást tölti ki,
amely HTTP-n korábban nem volt feltöltve. Ha nem oldható fel API-kulcs
(nincs fejléc vagy érvénytelen a kulcs), az `authInfo` értéke `undefined` marad, és a feloldás
változatlanul a meglévő `meta`/env láncon halad tovább. A stdio nem rendelkezik hívónkénti
identitással (lásd: `mcpCallerIdentity.ts`), ezért a kulcsonkénti hozzárendelés nem érinti —
kihagyja az `_meta` lépést (az `_meta` csak HTTP-hitelesítési kontextusban érvényesül, #15159),
és kizárólag az `OMNIROUTE_MCP_SCOPES` környezeti kulcsból oldja fel az értéket.

**A szűk hatókörű HTTP/SSE-hívók esetében a kényszerítés mindig be van kapcsolva, függetlenül az
`OMNIROUTE_MCP_ENFORCE_SCOPES` értékétől.** Az alapértelmezés szerint `false` értékű
`OMNIROUTE_MCP_ENFORCE_SCOPES` csak a helyi/stdio, egyetlen operátort használó folyamatban
biztonságos, ahol nincs hívónkénti identitás, amelyhez a hatóköröket hozzá lehetne rendelni.
Az `open-sse/mcp-server/server.ts::withScopeEnforcement()` feltétel nélkül bekapcsolja az
eszközönkénti hatókör-kényszerítést (`scopeEnforcement.ts`-beli
`shouldForceScopeEnforcement()`), amikor a `resolveCallerScopeContext()` feloldása során
`source === "authInfo"` teljesül (vagyis valódi, kulcsonkénti HTTP Authorization-fejléc
érkezik, csak HTTP/SSE esetén), ÉS az adott kulcs nem rendelkezik teljes
`manage`/`admin` hatókörrel. Ez megszünteti azt a rést, amelyben egy KIZÁRÓLAG a szűk
`mcp:connect` megkerülési hatókörrel rendelkező kulcs — amely a fentiek szerint semmi mást nem
engedélyez, csak az `/api/mcp/` LOCAL_ONLY kivételt — egyébként minden MCP-eszközt meghívhatna,
miután egy operátor engedélyezte a távoli/nem loopbackes MCP-hozzáférést, pusztán azért, mert az
`OMNIROUTE_MCP_ENFORCE_SCOPES` alapértelmezés szerint `false` értékkel érkezik. A HTTP-n
használt teljes `manage`/`admin` kulcs, valamint minden stdio/helyi hívó továbbra is a meglévő,
`OMNIROUTE_MCP_ENFORCE_SCOPES` által vezérelt működést követi.

---

## Környezeti változók

| Változó                                 | Alapértelmezett                       | Cél                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :-------------------------------------- | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`              | Az alap-URL, amelyet az MCP-kiszolgáló az OmniRoute belső API-jainak hívásakor használ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_API_KEY`                     | (üres)                                | Az API-kulcs, amelyet `Authorization: Bearer` fejlécként továbbít a belső API-hívásokhoz                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (csak a `"true"` engedélyezi) | Ha engedélyezve van, a hiányzó hatókörök elutasítják az eszközhívásokat, és a rendszer naplózza a `scope_denied:<reason>` értéket az auditnaplóban. A kikényszerítés ettől a jelzőtől FÜGGETLENÜL is bekapcsolódik minden olyan HTTP/SSE-hívó esetén, amelyet egy kulcsonkénti Authorization fejlécből (`source === "authInfo"`) azonosít a rendszer, és amely nem rendelkezik teljes `manage`/`admin` hatókörrel — például egy kizárólag szűk `mcp:connect` megkerülési hatókörrel rendelkező kulcs esetén — ezért ez az alapértelmezés csak a helyi/stdio, egyetlen operátoros folyamathoz biztonságos, távoli, nem loopback-hozzáféréshez soha |
| `OMNIROUTE_MCP_SCOPES`                  | (üres)                                | Vesszővel elválasztott engedélyezési lista az alapértelmezés szerint „elérhetőnek” tekintett hatókörökről (akkor használatos, ha a hívó nem adja meg a saját hatóköreit)                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (nincs beállítva = be)                | `0/false/off/no` értékre állítva letiltja az MCP-leírások regisztrációkori tömörítését                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (nincs beállítva = be)                | A fenti kapcsoló alternatív aliasa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                               | A belső kezelési olvasási műveletek (állapot, reziliencia, kombinációk, kvóta, használat) megszakítási időkerete                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                               | Azoknak a lépéseknek a megszakítási időkerete, amelyek egy szolgáltató válaszára várnak (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `MCP_TOOL_DENY`                         | (nincs beállítva = nincs szűrő)       | Vesszővel elválasztott eszköznevek, amelyeket ki kell hagyni a `tools/list` eredményéből (az eszközök számának csökkentése — lásd alább)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `MCP_TOOL_ALLOW`                        | (unset = no filter)                   | Vesszővel elválasztott eszköznevek, amelyeket kizárólagosan kell megtartani (engedélyezési lista mód — lásd alább)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `DATA_DIR`                              | `~/.omniroute`                        | A heartbeat-fájl ide kerül: `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

---

## Leírás tömörítése

Az MCP-eszközök, -promptok és -erőforrások regisztrációkor/listázáskor tömöríthetik a leírásokat, hogy csökkentsék a klienseknek átadott metaadatok méretét (és ezáltal a prompt kontextusköltségét). A megvalósítás az `open-sse/mcp-server/descriptionCompressor.ts` fájlban található, és a `createMcpServer()` függvényben található `compressMcpRegistryMetadata` kapcsolja be az MCP-szerverbe.

- A tömörítés a leírásszövegen fut le a Caveman szabálykészlettel (`getRulesForContext("all", "full")`), megőrzött blokkok kinyerésével (kódspanek, keretezett blokkok stb.), így a strukturális tartalom nem módosul.
- Telepítésenként kapcsolható a `key_value` beállítástáblában található `compression.mcpDescriptionCompressionEnabled` értékkel (alapértelmezés: engedélyezve) — a felületen **Analitika → MCP-leírások tömörítése** néven érhető el.
- Folyamatszinten a `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` vagy a `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` használatával kapcsolható ki.
- A valós idejű statisztikák az `omniroute_compression_status` alatt, az `analytics.mcpDescriptionCompression` mezőben jelennek meg, és a `source: "mcp_metadata_estimate"` címkével vannak ellátva, hogy megkülönböztethetők legyenek a szolgáltatói tényleges használati bizonylatoktól.

---

## Eszközök számának csökkentése (F4.3)

A leírások tömörítése az egyes eszközök metaadatait zsugorítja; az **eszközök számának csökkentése** ennél is tovább megy azzal, hogy magát a bejelentett eszközök számát is csökkenti. Kevesebb eszköz hirdetése a `tools/list` manifestben csökkenti a kérésenkénti tokenköltséget, amelyet a kliens modellje az eszközkatalógusért fizet („5. rétegű” tömörítés). A megvalósítás egy tisztán állapot nélküli szűrő az `open-sse/mcp-server/toolCardinality.ts` fájlban (`reduceToolManifest`), amelyet a `createMcpServer()` regisztrációs ciklusa használ az `open-sse/mcp-server/server.ts` fájlban.

**Opt-in, alapértelmezés szerint kikapcsolva.** A szűrő csak akkor fut le, ha a két környezeti változó közül legalább az egyik be van állítva; ha egyik sincs beállítva, mind a 110 eszköz változatlanul kerül bejelentésre.

| Változó          | Mód                                                                                                  |
| :--------------- | :--------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Tiltólista — vesszővel elválasztott eszköznevek, amelyek mindig kikerülnek a `tools/list` listából   |
| `MCP_TOOL_ALLOW` | Engedélyezési lista — vesszővel elválasztott eszköznevek; csak ezek maradnak meg, minden más kikerül |

A `deny` elsőbbséget élvez az `allow` értékkel szemben. A neveket vessző választja el, a szóközök le vannak vágva, az üres elemek pedig figyelmen kívül maradnak. Példák:

```bash
# Két eszköz eltávolítása a katalógusból
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Csak az útválasztási és kvótaeszközök bejelentése (engedélyezési lista mód)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**A szűrt eszközök eltávolítása:** a regisztráció mindig sikeres; a profil által elutasított eszközön ezt követően meghívódik a `.disable()` az MCP SDK kezelőjén, így az soha nem jelenik meg a `tools/list` listában, miközben az összekötés érintetlen marad (tiszta engedélyezés/letiltás, újraregisztráció nélkül). A profilfeldolgozó a `readMcpToolProfileFromEnv(process.env)`, amely `null` értéket ad vissza (nincs szűrés), ha mindkét változó üres.

A `reduceToolManifest` mögött álló gazdagabb `ToolProfile`-struktúra hatókörmetszet-alapú szűrést (`allowScopes`, `read:*` jellegű helyettesítő karakteres illesztéssel) és determinisztikus `maxTools` korlátot is támogat, de ez a két beállítás teljes manifestet igényel a regisztráció időpontjában, és jelenleg nem érhető el a környezeti változókon keresztül (a `tools/list` szintű hook nyomon követett utómunkaként szerepel). Az `estimateManifestTokens()` használható a manifest tokenköltségének összehasonlítására a csökkentés előtt és után.

---

## Futási életjel

A stdio-átvitel 5 másodpercenként menti az életképességi állapotot a `${DATA_DIR}/runtime/mcp-heartbeat.json` fájlba. A vezérlőpult (`/api/mcp/status`) ezt a fájlt, valamint a PID életképességét olvassa be az `online` érték meghatározásához. A HTTP-átvitelek ehelyett a folyamaton belüli `getMcpHttpStatus()` állapotát jelentik (nem írnak fájlt).

Az életjel-pillanatkép a következőket tartalmazza:

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

## Naplózás auditálási célokra

Minden eszközhívást az `open-sse/mcp-server/audit.ts` a SQLite `mcp_tool_audit` táblájába naplóz:

- Az eszköz neve, argumentumai (eszközönkénti `auditLevel` szerinti kivonatolással/csonkolással), eredménye
- Időtartam ezredmásodpercben, sikeres/sikertelen jelző, hibaüzenet (ha alkalmazható)
- API-kulcs kivonata, időbélyeg
- A hatókör-megtagadások `scope_denied:<reason>` formában kerülnek naplózásra a hiányzó hatókörök listájával

A legutóbbi hívások vizsgálatához használja a vezérlőpultot, illetve a `/api/mcp/audit` és `/api/mcp/audit/stats` REST-végpontokat.

---

## Fájlok

| Fájl                                                                     | Cél                                                                         |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP-szervergyár, stdio-belépési pont, hatókörhöz kötött eszközregisztrációk |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP-átvitel (munkamenet-kezelés)                          |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Eszköz-hatókörök kiértékelése és a hívó feloldása                           |
| `open-sse/mcp-server/audit.ts`                                           | Eszközhívások auditnaplózása (`mcp_tool_audit`)                             |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio-életjel írója (`mcp-heartbeat.json`)                                  |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Leírástömörítés az eszköz-, prompt- és erőforrás-regiszterekhez             |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod-sémák + eszközregiszter (`MCP_TOOLS`, 45 bejegyzés)                     |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | 2. fázisú + gyorsítótáras + 1proxy eszközkezelők                            |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Tömörítési eszközkezelők                                                    |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Memóriaeszköz-definíciók (3 eszköz)                                         |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Képességeszköz-definíciók (4 eszköz)                                        |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion-kontextusforrás eszközdefiníciói (6 eszköz)                          |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Játékszerűsítési eszközdefiníciók (8 eszköz)                                |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Bővítményregisztrációs és -kezelési eszközök (8 eszköz)                     |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` végpont                                                   |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` végpont                                                    |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE-átviteli útvonal                                         |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP-átviteli útvonal                          |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` auditnapló-lekérdezés                                      |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` összesített auditmetrikák                            |
| `src/lib/notion/api.ts`                                                  | Notion REST API-ügyfél (újrapróbálkozás, időkorlát, hibabesorolás)          |
| `src/lib/db/notion.ts`                                                   | Notion-tokenek megőrzése (`key_value` tábla)                                |
| `src/app/api/settings/notion/route.ts`                                   | Notion-beállítások API-ja (GET/POST/DELETE)                                 |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion-tokenek kezelési felülete                                            |
| `tests/unit/notion-api.test.ts`                                          | Notion API-ügyfél tesztjei (7)                                              |
| `tests/unit/notion-tools.test.ts`                                        | Notion-eszközök hatókör-kényszerítési tesztjei (10)                         |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB-modul tesztjei (3)                                                |
