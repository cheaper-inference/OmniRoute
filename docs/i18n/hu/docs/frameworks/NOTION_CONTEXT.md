# Notion Context Source (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Hiteles forrás:** `src/lib/notion/api.ts` (REST-kliens), `src/lib/db/notion.ts`
> (tokenmegőrzés), `open-sse/mcp-server/tools/notionTools.ts` (6 MCP-eszköz),
> `src/app/api/settings/notion/route.ts` (beállítási API). Az eszközök regisztrációja és a hatókörök
> összekapcsolása az `open-sse/mcp-server/server.ts` fájlban található.

## Mi ez?

Az OmniRoute egy **Notion**-munkaterülethez **kontextusforrásként** tud csatlakozni — ez egy
írható és olvasható tudásbázis, amelyet az ügynökök a beépített MCP-kiszolgálón keresztül érnek el.
Egy Notion-integrációs token beállítása után az MCP-eszközök lehetővé teszik az LLM számára az oldalak
és adatbázisok keresését, az oldaltartalom és a blokkfák olvasását, az adatbázisok szűrőkkel és
rendezésekkel történő lekérdezését, valamint új blokkok hozzáfűzését — mindezt az OmniRoute közvetíti
(újrapróbálkozással, időtúllépés-kezeléssel és hibabesorolással), így a modell soha nem éri el
közvetlenül a Notion API-ját.

Az integráció a hivatalos Notion REST API
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`) vékony, megerősített burkolója. A kliens
(`src/lib/notion/api.ts`) a következőket biztosítja:

- **Újrapróbálkozás exponenciális késleltetéssel** (legfeljebb 3 kísérlet) `429` és `5xx` esetén.
- **55 másodperces kérési időtúllépés** az `AbortController` segítségével.
- **Típusos hibabesorolás** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, figyelembe veszi a `retry after`
  útmutatásokat), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Üzenettisztítás**, amely eltávolítja a veremkivonathoz hasonló részleteket a hibák megjelenítése előtt.

## Beállítás

A Notion-tokenhez **nincs környezeti változó** — azt az SQLite `key_value` táblája tárolja
(`notion` névtér, `integration_token` kulcs) a `src/lib/db/notion.ts` segítségével.
Állítsa be a végpont irányítópultjának **Kontextusforrások** lapján
(az `ObsidianSourceCard` testvére, a `NotionSourceCard`), vagy a beállítási REST API-n keresztül.

> [!NOTE]
> A token egy **belső Notion-integrációs token**. Hozzon létre egy integrációt a
> <https://www.notion.com/my-integrations> oldalon, majd ossza meg az integrációval azokat az
> oldalakat/adatbázisokat, amelyekhez hozzáférést kíván biztosítani az OmniRoute számára
> (a Notion jogosultsági modellje megosztásalapú, nem az egész munkaterületre kiterjedő).

### Konfigurálás REST-en keresztül

```bash
# Az integrációs token mentése és ellenőrzése (a POST egy próbakeresés végrehajtásával ellenőrzi)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# A kapcsolat állapotának ellenőrzése
curl http://localhost:20128/api/settings/notion

# Leválasztás (törli a tárolt tokent)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Mindhárom metódus irányítópult-hitelesítést (`isAuthenticated`) igényel. `POST` esetén
az OmniRoute menti a tokent, majd azonnal lefuttat egy 1 találatos próbakeresést; ha a Notion
hibaobjektumot ad vissza, a token törlődik, és a hívás `400` hibával meghiúsul.

## MCP szerszámok (6)

A `open-sse/mcp-server/tools/notionTools.ts` definíciója. A token feloldása híváskor történik `getNotionToken()` keresztül; ha egyik sincs beállítva, az eszköz `"Notion integration token not configured. Set it in Settings > Context Sources."` dob

| Eszköz                       | Hatály         | Leírás                                                                                             |
| ---------------------------- | -------------- | -------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Oldalak és adatbázisok keresése szöveges lekérdezéssel (címeket, IDs, URLs) adja vissza. Lapozva.  |
| `notion_get_page`            | `read:notion`  | Szerezze meg az oldal tartalmát és metaadatait ID segítségével.                                    |
| `notion_list_block_children` | `read:notion`  | Sorolja fel egy blokk vagy oldal összes blokk-utódját (a blokkfát). Lapozva.                       |
| `notion_query_database`      | `read:notion`  | Adatbázis lekérdezése opcionális `filter` + `sorts` (Notion API formátum) használatával. Lapozva.  |
| `notion_get_database`        | `read:notion`  | Szerezze meg egy adatbázis schema/metadata értékét ID segítségével.                                |
| `notion_append_blocks`       | `write:notion` | Blokk gyermekek hozzáfűzése egy meglévő blokkhoz vagy oldalhoz (kérésenként legfeljebb 100 blokk). |

### Bemeneti paraméterek

- `notion_search` — `query` (1–500 karakter), `pageSize` (1–100, alapértelmezett 20), `startCursor` (opcionális).
- `notion_get_page` — `pageId` (32 karakteres hex vagy UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, alapértelmezett 50), `startCursor` (opcionális).
- `notion_query_database` — `databaseId`, `filter` (opcionális, Notion szűrőformátum), `sorts` (opcionális tömb), `pageSize` (1–100, alapértelmezett 50), `startCursor` (opcionális).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (blokkobjektumok tömbje), `after` (opcionális pozíció).

### Hatókör

Az olvasási eszközökhöz `read:notion`, az íróeszközhöz pedig `write:notion` szükséges. A hatóköröket `withScopeEnforcement()` kényszeríti ki `open-sse/mcp-server/server.ts` -ben, amikor `OMNIROUTE_MCP_ENFORCE_SCOPES=true`, és mindig olyan HTTP/SSE hívónál, akinek API kulcsából hiányzik `manage`/`admin`; a hívó engedélyezett hatókörei `OMNIROUTE_MCP_SCOPES` ből (vesszővel elválasztva) vagy a hitelesített API kulcs hatókörkörnyezetéből származnak. Lásd [MCP-SERVER.md](./MCP-SERVER.md) a teljes körű modellért.

## Végpontok

| Metódus  | Útvonal                | Cél                                          |
| -------- | ---------------------- | -------------------------------------------- |
| `GET`    | `/api/settings/notion` | A `{ connected, hasToken }` visszaadása.     |
| `POST`   | `/api/settings/notion` | Az integrációs token mentése és ellenőrzése. |
| `DELETE` | `/api/settings/notion` | Leválasztás (a tárolt token törlése).        |

> Ezek az irányítópult beállítási útvonalai. **Nincs nyilvános `/v1` Notion-proxy
> végpont** — a Notion kizárólag a fenti MCP-eszközökön keresztül érhető el.

## Felhasználási esetek

- **Tudásalapú válaszok** — egy ügynök a `notion_search` segítségével kereshet a munkaterületen,
  majd válaszadás előtt a `notion_get_page` segítségével lekérheti a legjobb találatot, így a válaszok valós belső dokumentumokra hivatkozhatnak.
- **Adatbázis-alapú munkafolyamatok** — a `notion_query_database` segítségével szűrőkkel és rendezésekkel lekérdezhető egy feladat- vagy CRM-adatbázis, majd összefoglalhatók vagy kategorizálhatók a sorok.
- **Visszaírás / naplózás** — a `notion_append_blocks` segítségével értekezleti jegyzetek, futtatási összefoglalók vagy ügynökkimenetek fűzhetők egy meglévő oldalhoz (csak hozzáfűzés; nincsenek destruktív szerkesztések).
- **Struktúra feltérképezése** — a `notion_list_block_children` segítségével bejárható egy oldal blokkfája,
  a `notion_get_database` segítségével pedig lekérdezés előtt feltárható egy adatbázis tulajdonságsémája.

## Kapcsolódó dokumentumok

- [MCP-kiszolgáló](./MCP-SERVER.md) — átviteli módok, hatókör-érvényesítés és a teljes eszközlista.
- [Obsidian-kontextusforrás](./OBSIDIAN_CONTEXT.md) — a másik beépített kontextusforrás.
- [Memóriarendszer](./MEMORY.md) — tartós társalgási memória (kiegészítő
  kontextusréteg, amelyet a rendszer automatikusan beilleszt, nem pedig eszközzel kér le).
