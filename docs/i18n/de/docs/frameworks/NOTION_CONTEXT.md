# Notion Context Source (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/NOTION_CONTEXT.md) · 🇪🇹 [am](../../../am/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇿 [az](../../../az/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/NOTION_CONTEXT.md) · 🇩🇰 [da](../../../da/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇷 [el](../../../el/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇸 [es](../../../es/docs/frameworks/NOTION_CONTEXT.md) · 🇪🇪 [et](../../../et/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/NOTION_CONTEXT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇱 [he](../../../he/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/NOTION_CONTEXT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/NOTION_CONTEXT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇩 [id](../../../id/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇹 [it](../../../it/docs/frameworks/NOTION_CONTEXT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/NOTION_CONTEXT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇭 [km](../../../km/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/NOTION_CONTEXT.md) · 🇲🇲 [my](../../../my/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇴 [no](../../../no/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [or](../../../or/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/NOTION_CONTEXT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/NOTION_CONTEXT.md) · 🇱🇰 [si](../../../si/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/NOTION_CONTEXT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/NOTION_CONTEXT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/NOTION_CONTEXT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/NOTION_CONTEXT.md) · 🇮🇳 [te](../../../te/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇭 [th](../../../th/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/NOTION_CONTEXT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/NOTION_CONTEXT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/NOTION_CONTEXT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/NOTION_CONTEXT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/NOTION_CONTEXT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/NOTION_CONTEXT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/NOTION_CONTEXT.md)

---

> **Verbindliche Quelle:** `src/lib/notion/api.ts` (REST-Client), `src/lib/db/notion.ts`
> (Token-Persistenz), `open-sse/mcp-server/tools/notionTools.ts` (6 MCP-Tools),
> `src/app/api/settings/notion/route.ts` (Einstellungs-API). Die Tool-Registrierung und
> Scope-Verknüpfung befinden sich in `open-sse/mcp-server/server.ts`.

## Was es ist

OmniRoute kann einen **Notion**-Workspace als **Kontextquelle** anbinden — eine
Wissensdatenbank mit Lese- und Schreibzugriff, auf die Agenten über den integrierten
MCP-Server zugreifen. Sobald ein Notion-Integrationstoken konfiguriert ist, ermöglichen
die MCP-Tools einem LLM, Seiten und Datenbanken zu durchsuchen, Seiteninhalte und
Blockstrukturen zu lesen, Datenbanken mit Filtern und Sortierungen abzufragen sowie neue
Blöcke anzuhängen — alles über OmniRoute weitergeleitet (mit Wiederholungsversuchen,
Zeitüberschreitung und Fehlerklassifizierung), sodass das Modell nie direkt auf die
Notion-API zugreift.

Die Integration ist ein schlanker, gehärteter Wrapper um die offizielle Notion-REST-API
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Der Client
(`src/lib/notion/api.ts`) ergänzt:

- **Wiederholungsversuche mit exponentiellem Backoff** (bis zu 3 Versuche) bei `429` und `5xx`.
- **Anfrage-Timeout von 55 Sekunden** über `AbortController`.
- **Typisierte Fehlerklassifizierung** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, berücksichtigt Hinweise zu
  `retry after`), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Bereinigung von Meldungen**, bei der Stacktrace-ähnliche Fragmente vor der Ausgabe
  entfernt werden.

## Einrichtung

Für das Notion-Token gibt es **keine Umgebungsvariable** — es wird über
`src/lib/db/notion.ts` in der SQLite-Tabelle `key_value` (Namensraum `notion`,
Schlüssel `integration_token`) gespeichert. Konfigurieren Sie es über den Tab
**Kontextquellen** des Endpoint-Dashboards (`NotionSourceCard` neben
`ObsidianSourceCard`) oder über die Einstellungs-REST-API.

> [!NOTE]
> Das Token ist ein **internes Notion-Integrationstoken**. Erstellen Sie unter
> <https://www.notion.com/my-integrations> eine Integration und geben Sie anschließend
> die Seiten/Datenbanken, auf die OmniRoute zugreifen soll, für diese Integration frei
> (das Berechtigungsmodell von Notion basiert auf Freigaben und gilt nicht automatisch
> für den gesamten Workspace).

### Konfiguration über REST

```bash
# Integrationstoken speichern und validieren (POST validiert es mithilfe einer Testsuche)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Verbindungsstatus prüfen
curl http://localhost:20128/api/settings/notion

# Verbindung trennen (löscht das gespeicherte Token)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Alle drei Methoden erfordern eine Dashboard-Authentifizierung (`isAuthenticated`). Bei
`POST` speichert OmniRoute das Token und führt sofort eine Testsuche mit einem Ergebnis
durch. Wenn Notion ein Fehlerobjekt zurückgibt, wird das Token gelöscht und der Aufruf
schlägt mit `400` fehl.

## MCP Werkzeuge (6)

Definiert in `open-sse/mcp-server/tools/notionTools.ts`. Das Token wird zum Zeitpunkt des Aufrufs über `getNotionToken()` aufgelöst; Wenn keine konfiguriert ist, löst das Tool `"Notion integration token not configured. Set it in Settings > Context Sources."` aus

| Werkzeug                     | Umfang         | Beschreibung                                                                                                                |
| ---------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Durchsuchen Sie Seiten und Datenbanken per Textabfrage (gibt Titel, IDs, URLs zurück). Paginiert.                           |
| `notion_get_page`            | `read:notion`  | Erhalten Sie Inhalte und Metadaten einer Seite über deren ID.                                                               |
| `notion_list_block_children` | `read:notion`  | Listen Sie alle untergeordneten Blöcke eines Blocks oder einer Seite (des Blockbaums) auf. Paginiert.                       |
| `notion_query_database`      | `read:notion`  | Fragen Sie eine Datenbank mit optionalem `filter` + `sorts` (Notion API Format) ab. Paginiert.                              |
| `notion_get_database`        | `read:notion`  | Rufen Sie den schema/metadata einer Datenbank mit ID ab.                                                                    |
| `notion_append_blocks`       | `write:notion` | Hängen Sie untergeordnete Blöcke an einen vorhandenen Block oder eine vorhandene Seite an (maximal 100 Blöcke pro Anfrage). |

### Eingabeparameter

- `notion_search` — `query` (1–500 Zeichen), `pageSize` (1–100, Standard 20), `startCursor` (optional).
- `notion_get_page` — `pageId` (32 Zeichen hexadezimal oder UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, Standard 50), `startCursor` (optional).
- `notion_query_database` — `databaseId`, `filter` (optional, Notion Filterformat), `sorts` (optionales Array), `pageSize` (1–100, Standard 50), `startCursor` (optional).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (Array von Blockobjekten), `after` (optionale Position).

### Bereiche

Die Lesetools erfordern `read:notion` und das Schreibtool erfordert `write:notion`. Bereiche werden von `withScopeEnforcement()` in `open-sse/mcp-server/server.ts` erzwungen, wenn `OMNIROUTE_MCP_ENFORCE_SCOPES=true` und immer für einen HTTP/SSE Aufrufer, dessen API Schlüssel `manage`/`admin` fehlt; Die zulässigen Bereiche des Aufrufers stammen aus `OMNIROUTE_MCP_SCOPES` (durch Kommas getrennt) oder dem Bereichskontext des authentifizierten API Schlüssels. Das vollständige Modell finden Sie unter [MCP-SERVER.md](./MCP-SERVER.md).

## Endpunkte

| Methode  | Pfad                   | Zweck                                                  |
| -------- | ---------------------- | ------------------------------------------------------ |
| `GET`    | `/api/settings/notion` | Gibt `{ connected, hasToken }` zurück.                 |
| `POST`   | `/api/settings/notion` | Speichert und validiert das Integrationstoken.         |
| `DELETE` | `/api/settings/notion` | Trennt die Verbindung (löscht das gespeicherte Token). |

> Dies sind Einstellungsrouten des Dashboards. Es gibt **keinen öffentlichen `/v1`-Notion-Proxy-
> Endpunkt** — der Zugriff auf Notion erfolgt ausschließlich über die oben genannten MCP-Tools.

## Anwendungsfälle

- **Wissensbasierte Antworten** — einen Agenten mit `notion_search` den Arbeitsbereich durchsuchen und
  mit `notion_get_page` den relevantesten Treffer abrufen lassen, bevor er antwortet, damit die Antworten echte interne Dokumentation zitieren.
- **Datenbankgestützte Arbeitsabläufe** — eine Aufgaben-/CRM-Datenbank mit
  `notion_query_database` anhand von Filtern und Sortierungen abfragen und anschließend die Zeilen zusammenfassen oder priorisieren.
- **Zurückschreiben / Protokollierung** — mit `notion_append_blocks` Besprechungsnotizen, Ausführungs-
  zusammenfassungen oder Agentenausgaben an eine vorhandene Seite anhängen (nur Anhängen; keine destruktiven Änderungen).
- **Strukturerkundung** — mit `notion_list_block_children` den Blockbaum einer Seite durchlaufen
  oder mit `notion_get_database` das Eigenschaftsschema einer Datenbank ermitteln, bevor sie abgefragt wird.

## Verwandte Themen

- [MCP-Server](./MCP-SERVER.md) — Übertragungswege, Durchsetzung des Geltungsbereichs und vollständige Tool-Übersicht.
- [Obsidian-Kontextquelle](./OBSIDIAN_CONTEXT.md) — die andere integrierte Kontextquelle.
- [Speichersystem](./MEMORY.md) — persistenter Konversationsspeicher (ergänzende
  Kontextebene, die automatisch eingefügt und nicht über Tools abgerufen wird).
