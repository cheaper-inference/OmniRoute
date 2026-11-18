# Custom JSON API provider nodes (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Ein benutzerdefinierter JSON API Knoten verbindet einen JSON Geschäftsendpunkt, der nicht das OpenAI oder Anthropic Protokoll beherrscht. OmniRoute füllt eine JSON -Anfragevorlage, sendet sie an den vollständigen Endpunkt URL, liest die Antwort aus einem Antwortpfad und sendet sie im eigenen Format des Clients (Chat-Abschlüsse, Antworten, Nachrichten, ...) an den Client zurück.

Es ist ein OpenAI-kompatibler Knoten mit `apiType: "custom-json"`; Seine ID hat die Form `openai-compatible-custom-json-<suffix>`. Das Dashboard-Formular ist noch nicht verfügbar. Erstellen und bearbeiten Sie diese Knoten über den Anbieter-Knoten API unten.

## Erstellen Sie einen Knoten

`POST /api/provider-nodes` (Verwaltungsauthentifizierung):

```json
{
  "type": "openai-compatible",
  "apiType": "custom-json",
  "name": "Business API",
  "prefix": "biz",
  "baseUrl": "https://api.example.com/v1/answer",
  "customHeaders": { "X-Tenant": "demo" },
  "customJson": {
    "method": "POST",
    "authType": "api-key",
    "authHeader": "X-Service-Key",
    "requestTemplate": {
      "project_id": "demo-project",
      "question": "{{prompt}}",
      "history": "{{messages}}"
    },
    "responsePath": "data.answer"
  }
}
```

- `baseUrl` ist das** vollständig** Endpunkt URL. Es wird nichts angehängt (kein `/chat/completions`, kein `/models`) und im Gegensatz zu anderen OpenAI-kompatiblen Knoten gibt es kein Standard URL. Es muss `http(s)` sein, ohne eingebettete Anmeldeinformationen oder `#fragment`, und es übergibt denselben ausgehenden URL Schutz wie jeder Anbieterknoten, sowohl beim Speichern des Knotens als auch bei jeder Anfrage.
- Ein Knoten, der den Verbindungsschlüssel (`authType` `bearer` oder `api-key`, einschließlich der Standardeinstellung) sendet, muss `https://` verwenden. Einfaches `http://` wird nur für einen Loopback-Host (`localhost`, `127.0.0.0/8`, `::1`) oder mit `authType: "none"` akzeptiert, der keinen Schlüssel sendet. Private LAN Adressen (`10.x`, `172.16-31.x`, `192.168.x`) sind nicht ausgenommen: Jeder in diesem Netzwerk könnte den Schlüssel lesen. Das Speichern eines solchen Knotens schlägt mit `400` fehl, und ein zuvor gespeicherter Knoten schlägt bei jeder Anfrage mit derselben Nachricht fehl, bevor eine Anfrage gesendet wird. Platzieren Sie einen verschlüsselten Endpunkt auf einem LAN hinter TLS (zum Beispiel einen Reverse-Proxy).
- `customJson` wird mit Zod validiert; Unbekannte Schlüssel werden abgelehnt. Jedes Feld ist optional:

| Feld              | Werte                                           | Standard                                               |
| ----------------- | ----------------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                          | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`                     | `bearer`                                               |
| `authHeader`      | Header-Name, der verwendet wird, wenn `api-key` | `X-API-Key`                                            |
| `requestTemplate` | JSON Objekt (≤ 64 KB, Tiefe ≤ 32)               | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | Feldweg oder `$` für den ganzen Körper          | `choices[0].message.content`                           |

- Das Geheimnis bleibt im API Schlüssel der Verbindung, niemals in der Vorlage. `bearer` sendet `Authorization: Bearer <key>`; `api-key` sendet `<authHeader>: <key>`. Der Authentifizierungsheader darf nicht `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` oder ein Hop-by-Hop-Header sein. Mit `none` benötigen Verbindungen keinen Schlüssel.
- Zusätzliche statische Header verwenden den regulären `customHeaders` des Knotens (gleiche Validierung wie jeder andere kompatible Knoten; Authentifizierungsheader sind dort nicht zulässig).

`PUT /api/provider-nodes/<id>` akzeptiert das gleiche `customJson` und schreibt `baseUrl` und die Konfiguration auf jeder bestehenden Verbindung des Knotens neu. Wenn Sie `customJson` weglassen, bleibt die gespeicherte Konfiguration erhalten. Durch das Umschalten `apiType` auf `chat` oder `responses` wird es vom Knoten und seinen Verbindungen entfernt.

Fügen Sie dann wie gewohnt eine Verbindung zum Knoten hinzu (`POST /api/providers` mit der Knoten-ID) und fordern Sie `<prefix>/<model>` an, beispielsweise `biz/assistant-v1`. Der Endpunkt stellt keine Modellliste bereit. Fügen Sie die Modell-IDs daher manuell hinzu.

## Fordern Sie Vorlagen an

Vorlagen sind schlicht JSON. Ein String-Wert kann `{{placeholder}}` Marker enthalten; Es wird nichts ausgewertet oder ausgeführt, und Objektschlüssel werden niemals ersetzt.

| Platzhalter          | Wert                                                                         |
| -------------------- | ---------------------------------------------------------------------------- |
| `{{prompt}}`         | Text der letzten Benutzernachricht (Textteile mit Zeilenumbrüchen verbunden) |
| `{{messages}}`       | Die Konversation im OpenAI -Chat-Format                                      |
| `{{model}}`          | Die angeforderte Modell-ID ohne das Anbieterpräfix                           |
| `{{stream}}`         | Der Endpunkt `false` — antwortet immer mit einem JSON -Dokument              |
| `{{request.<path>}}` | Ein Feld der übersetzten (OpenAI Chat-Format)-Anfrage                        |

- Ein Wert, der genau ein Platzhalter ist, behält seinen JSON Typ (`"{{messages}}"` wird zu einem Array); Als Text wird ein Platzhalter innerhalb einer längeren Zeichenfolge eingefügt.
- Ein Platzhalter, der zu nichts aufgelöst wird, lässt die Anfrage mit HTTP 400 fehlschlagen, anstatt eine unvollständige Nutzlast zu senden.
- Pfade verwenden Punktnotation und numerische Indizes (`data.items[0].text`). `__proto__`, `prototype` und `constructor` werden in Schlüsseln und Pfaden abgelehnt.

## Antworten

Der Wert bei `responsePath` wird zur Antwort des Assistenten: Zeichenfolgen werden durchgelassen, andere JSON Werte werden serialisiert. Ein fehlendes oder `null` Feld oder ein Körper, der nicht JSON ist, gibt HTTP 502 zurück. Upstream-Fehlerstatus werden weitergeleitet. Bei Streaming-Clients wartet OmniRoute auf die gesamte JSON -Antwort und gibt sie dann als einen Inhaltsblock plus den Endblock aus; Dies ist kein Token-Streaming. Werkzeugaufrufe und Verwendungsfelder werden nicht zugeordnet.

## Nie wiederholt

Eine Geschäftsanfrage kann auch dann Nebenwirkungen haben, wenn sie fehlschlägt. OmniRoute sendet es daher einmal:

- kein Transportwiederholungsversuch und keine Weiterleitungsverfolgung;
- kein erneuter Versuch bei einer anderen Verbindung (Konto-Fallback) — Der Fehler wird unverändert zurückgegeben und die Verbindung wird nicht abgekühlt;
- Kein Zurückgreifen auf das nächste Combo-Ziel, selbst bei einer leeren oder fehlgeschlagenen Antwort.

Separate Client-Anfragen und Fusion-Panels, die explizit mehrere Modelle aufrufen, rufen den Endpunkt weiterhin unabhängig voneinander auf.

## Testen eines Knotens

Speichern einer Verbindung, der Verbindung** Prüfen** Schaltflächen- und Hintergrundzustandsprüfungen rufen niemals den Endpunkt auf: Sie validieren nur die gespeicherte Konfiguration und melden die Verbindung als nicht überprüfbar.

`POST /api/provider-nodes/validate` mit `"apiType": "custom-json"` und den Knotenfeldern (`baseUrl`, `apiKey`, `customJson`, optional `customHeaders` und `modelId`) sendet genau eine echte Anfrage, mit `ping` als neuestem Benutzertext. Es antwortet auf `{ "valid": true }` oder den Upstream-Status (niemals auf den Upstream-Körper).

## Lagerung

Die Konfiguration wird in `provider_nodes.custom_json_config_json` (Migration `240_provider_node_custom_json_config.sql`) gespeichert und in den `providerSpecificData.customJson` jeder Verbindung kopiert.

Implementierung: `open-sse/utils/customJson.ts` (Validierung und Vorlage), `open-sse/executors/customJson.ts` (Executor), `open-sse/services/combo/noReplayLatch.ts` und `src/sse/handlers/chat/responsePolicies.ts` (No-Replay).
