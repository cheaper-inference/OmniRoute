# Notion Context Source (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇪 [de](../../../de/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Sursa oficială:** `src/lib/notion/api.ts` (client REST), `src/lib/db/notion.ts`
> (persistența tokenului), `open-sse/mcp-server/tools/notionTools.ts` (6 instrumente MCP),
> `src/app/api/settings/notion/route.ts` (API-ul pentru setări). Înregistrarea instrumentelor și
> configurarea domeniilor se află în `open-sse/mcp-server/server.ts`.

## Ce este

OmniRoute se poate conecta la un spațiu de lucru **Notion** ca **sursă de context** — o bază de
cunoștințe cu acces pentru citire/scriere, pe care agenții o accesează prin serverul MCP încorporat.
După configurarea unui token de integrare Notion, instrumentele MCP permit unui LLM să caute în
pagini și baze de date, să citească conținutul paginilor și arborii de blocuri, să interogheze baze de
date folosind filtre/sortări și să adauge blocuri noi — toate operațiile fiind intermediate prin
OmniRoute (cu reîncercare, expirare și clasificarea erorilor), astfel încât modelul să nu acceseze
niciodată direct API-ul Notion.

Integrarea este un strat de adaptare minimal și consolidat pentru API-ul REST oficial Notion
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Clientul
(`src/lib/notion/api.ts`) adaugă:

- **Reîncercare cu întârziere exponențială** (până la 3 încercări) pentru `429` și `5xx`.
- **Expirarea cererii după 55 de secunde** prin `AbortController`.
- **Clasificarea tipizată a erorilor** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, respectă indicațiile `retry after`),
  `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Igienizarea mesajelor**, care elimină fragmentele asemănătoare trasărilor stivei înainte de afișare.

## Configurare

Nu există **nicio variabilă de mediu** pentru tokenul Notion — acesta este stocat în tabelul
SQLite `key_value` (spațiul de nume `notion`, cheia `integration_token`) prin
`src/lib/db/notion.ts`. Configurați-l din fila **Surse de context** a panoului Endpoint
(`NotionSourceCard`, componenta înrudită cu `ObsidianSourceCard`) sau prin API-ul REST pentru setări.

> [!NOTE]
> Tokenul este un **token de integrare internă Notion**. Creați o integrare la
> <https://www.notion.com/my-integrations>, apoi partajați cu integrarea respectivă paginile/bazele de
> date pe care doriți ca OmniRoute să le poată accesa (modelul de permisiuni Notion se bazează pe
> partajare, nu se aplică întregului spațiu de lucru).

### Configurare prin REST

```bash
# Salvați și validați tokenul de integrare (POST validează efectuând o căutare de test)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Verificați starea conexiunii
curl http://localhost:20128/api/settings/notion

# Deconectați-vă (șterge tokenul stocat)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Toate cele trei metode necesită autentificarea în panoul de control (`isAuthenticated`). La `POST`,
OmniRoute salvează tokenul și execută imediat o căutare de test cu 1 rezultat; dacă Notion
returnează un obiect de eroare, tokenul este șters, iar apelul eșuează cu `400`.

## unelte MCP (6)

Definit în `open-sse/mcp-server/tools/notionTools.ts`. Tokenul este rezolvat în timpul apelului prin `getNotionToken()`; dacă nu este configurat niciunul, instrumentul aruncă `"Notion integration token not configured. Set it in Settings > Context Sources."`

| Instrument                   | Domeniul de aplicare | Descriere                                                                                      |
| ---------------------------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`        | Căutați pagini și baze de date după interogare de text (afișează titluri, IDs, URLs). Paginat. |
| `notion_get_page`            | `read:notion`        | Obțineți conținut și metadate ale unei pagini prin ID.                                         |
| `notion_list_block_children` | `read:notion`        | Listați toți copii de bloc ai unui bloc sau unei pagini (arborele blocurilor). Paginat.        |
| `notion_query_database`      | `read:notion`        | Interogați o bază de date cu `filter` + `sorts` opțional (formatul Notion API ). Paginat.      |
| `notion_get_database`        | `read:notion`        | Obțineți schema/metadata unei baze de date de ID.                                              |
| `notion_append_blocks`       | `write:notion`       | Adăugați copii bloc la un bloc sau o pagină existentă (maximum 100 de blocuri per solicitare). |

### Parametrii de intrare

- `notion_search` — `query` (1–500 de caractere), `pageSize` (1–100, implicit 20), `startCursor` (opțional).
- `notion_get_page` — `pageId` (hex sau UUID de 32 de caractere).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, implicit 50), `startCursor` (opțional).
- `notion_query_database` — `databaseId`, `filter` (opțional, format de filtru Notion ), `sorts` (matrice opțională), `pageSize` (1–100, implicit 50), `startCursor` (opțional).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (matrice de obiecte bloc), `after` (poziție opțională).

### Domenii de aplicare

Instrumentele de citire necesită `read:notion`, iar instrumentul de scriere necesită `write:notion`. Domeniile sunt impuse de `withScopeEnforcement()` în `open-sse/mcp-server/server.ts` când `OMNIROUTE_MCP_ENFORCE_SCOPES=true` și întotdeauna pentru un apelant HTTP/SSE a cărui cheie API nu are `manage`/`admin`; domeniile permise ale apelantului provin din contextul `OMNIROUTE_MCP_SCOPES` (separat prin virgulă) sau din contextul cheii API autentificate. Consultați [MCP-SERVER.md](./MCP-SERVER.md) pentru modelul cu sfera completă.

## Endpointuri

| Metodă   | Cale                   | Scop                                        |
| -------- | ---------------------- | ------------------------------------------- |
| `GET`    | `/api/settings/notion` | Returnează `{ connected, hasToken }`.       |
| `POST`   | `/api/settings/notion` | Salvează și validează tokenul de integrare. |
| `DELETE` | `/api/settings/notion` | Deconectează (șterge tokenul stocat).       |

> Acestea sunt rute pentru setările panoului de control. **Nu există niciun endpoint
> proxy Notion public `/v1`** — Notion este accesat exclusiv prin instrumentele MCP de mai sus.

## Cazuri de utilizare

- **Răspunsuri bazate pe cunoștințe** — permiteți unui agent să folosească `notion_search` în spațiul de lucru și
  `notion_get_page` pentru primul rezultat înainte de a răspunde, astfel încât răspunsurile să citeze documente interne reale.
- **Fluxuri de lucru bazate pe baze de date** — folosiți `notion_query_database` pentru o bază de date de activități/CRM, cu
  filtre și sortări, apoi rezumați sau triați rândurile.
- **Scriere / jurnalizare** — folosiți `notion_append_blocks` pentru a adăuga note de ședință, rezumate ale rulărilor
  sau rezultate generate de agent într-o pagină existentă (doar adăugare; fără modificări distructive).
- **Explorarea structurii** — folosiți `notion_list_block_children` pentru a parcurge arborele de blocuri al unei pagini
  sau `notion_get_database` pentru a descoperi schema proprietăților unei baze de date înainte de a o interoga.

## Resurse conexe

- [Server MCP](./MCP-SERVER.md) — transporturi, aplicarea domeniului de acces, inventarul complet al instrumentelor.
- [Sursa de context Obsidian](./OBSIDIAN_CONTEXT.md) — cealaltă sursă de context încorporată.
- [Sistemul de memorie](./MEMORY.md) — memorie conversațională persistentă (strat de context
  complementar, injectat automat, în loc să fie preluat prin instrumente).
