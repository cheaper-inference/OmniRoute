# Custom JSON API provider nodes (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Vlastní uzel JSON API připojuje obchodní koncový bod JSON, který nemluví protokolem OpenAI nebo Anthropic. OmniRoute vyplní šablonu požadavku JSON, odešle ji do úplného koncového bodu URL, přečte odpověď z cesty odpovědi a vrátí ji klientovi ve vlastním formátu klienta (dokončení chatu, odpovědi, zprávy, ...).

Je to uzel kompatibilní s OpenAI s `apiType: "custom-json"`; jeho id má tvar `openai-compatible-custom-json-<suffix>`. Formulář řídicího panelu zatím není k dispozici. Vytvořte a upravte tyto uzly prostřednictvím poskytovatele uzlu API níže.

## Vytvořte uzel

`POST /api/provider-nodes` (autorizace správy):

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

- `baseUrl` je** kompletní** koncový bod URL. Nic není připojeno (žádné `/chat/completions`, žádné `/models`) a na rozdíl od jiných uzlů kompatibilních s OpenAI zde není žádné výchozí URL. Musí to být `http(s)`, bez vložených přihlašovacích údajů nebo `#fragment` a předává stejnou odchozí ochranu URL jako každý uzel poskytovatele, a to jak při uložení uzlu, tak při každém požadavku.
- Uzel, který odesílá klíč připojení (`authType` `bearer` nebo `api-key`, včetně výchozího nastavení), musí používat `https://`. Prostý `http://` je akceptován pouze pro hostitele zpětné smyčky (`localhost`, `127.0.0.0/8`, `::1`) nebo se `authType: "none"`, který neposílá žádný klíč. Soukromé adresy LAN (`10.x`, `172.16-31.x`, `192.168.x`) nejsou vyňaty: kdokoli v této síti může číst klíč. Uložení takového uzlu se nezdaří pomocí `400` a dříve uložený uzel se nezdaří uzavřít při každém požadavku se stejnou zprávou před odesláním jakéhokoli požadavku. V případě klíčového koncového bodu na LAN jej umístěte za TLS (například reverzní proxy).
- `customJson` je ověřeno pomocí Zod; neznámé klíče jsou odmítnuty. Každé pole je nepovinné:

| Pole              | Hodnoty                               | Výchozí                                                |
| ----------------- | ------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`           | `bearer`                                               |
| `authHeader`      | název záhlaví použitý při `api-key`   | `X-API-Key`                                            |
| `requestTemplate` | objekt JSON (≤ 64 KB, hloubka ≤ 32)   | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | polní cesta, neboli `$` pro celé tělo | `choices[0].message.content`                           |

- Tajemství zůstává v klíči API připojení, nikdy v šabloně. `bearer` odešle `Authorization: Bearer <key>`; `api-key` odešle `<authHeader>: <key>`. Ověřovací hlavička nemůže být `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` nebo hlavička hop-by-hop. S `none` nepotřebujete připojení žádný klíč.
- Extra statické hlavičky používají běžné `customHeaders` uzlu (stejné ověření jako každý jiný kompatibilní uzel; auth hlavičky tam nejsou povoleny).

`PUT /api/provider-nodes/<id>` přijímá stejné `customJson` a přepisuje `baseUrl` a konfiguraci na každém existujícím připojení uzlu. Vynecháním `customJson` zůstane uložená konfigurace; přepnutí `apiType` na `chat` nebo `responses` jej odstraní z uzlu a jeho připojení.

Poté přidejte připojení k uzlu jako obvykle (`POST /api/providers` s ID uzlu) a vyžádejte si `<prefix>/<model>`, například `biz/assistant-v1`. Koncový bod nevystavuje žádný seznam modelů, takže ID modelů přidejte ručně.

## Vyžádejte si šablony

Šablony jsou obyčejné JSON. Hodnota řetězce může obsahovat značky `{{placeholder}}` ; nic se nevyhodnocuje ani neprovádí a klíče objektu se nikdy nenahrazují.

| Zástupný symbol      | Hodnota                                                                   |
| -------------------- | ------------------------------------------------------------------------- |
| `{{prompt}}`         | Text nejnovější uživatelské zprávy (textové části spojené s novými řádky) |
| `{{messages}}`       | Konverzace ve formátu OpenAI chat                                         |
| `{{model}}`          | Požadované ID modelu bez předpony poskytovatele                           |
| `{{stream}}`         | Vždy `false` — koncový bod odpovídá jedním dokumentem JSON                |
| `{{request.<path>}}` | Pole přeloženého požadavku (formát chatu OpenAI ).                        |

- Hodnota, která je přesně jedním zástupným symbolem, si zachovává svůj typ JSON (`"{{messages}}"` se stane polem); zástupný symbol uvnitř delšího řetězce je vložen jako text.
- Zástupný symbol, který se nevyřeší k ničemu, selže požadavek s HTTP 400 namísto odeslání neúplné datové části.
- Cesty používají tečkovou notaci a číselné indexy (`data.items[0].text`). `__proto__`, `prototype` a `constructor` jsou v klíčích a cestách odmítnuty.

## Odezvy

Hodnota v `responsePath` se stane odpovědí asistenta: řetězce procházejí, ostatní hodnoty JSON jsou serializovány. Chybějící pole nebo pole `null` nebo tělo, které není JSON, vrátí HTTP 502. Chybové stavy proti proudu jsou předány. U streamovacích klientů čeká OmniRoute na celou odezvu JSON a poté ji vysílá jako jeden blok obsahu plus konečný blok; toto není streamování tokenů. Volání nástrojů a pole použití nejsou mapována.

## Nikdy nepřehráno

Obchodní požadavek může mít vedlejší účinky, i když selže. OmniRoute to tedy odešle jednou:

- žádné opakování přenosu a žádné následné přesměrování;
- žádný pokus o další připojení (záložní účet) — selhání je vráceno tak, jak je, a připojení není ochlazeno;
- žádný návrat k dalšímu kombinovanému cíli, a to ani v případě prázdné nebo neúspěšné odpovědi.

Samostatné požadavky klientů a fúzní panely, které explicitně volají několik modelů, stále vyvolávají koncový bod nezávisle.

## Testování uzlu

Uložení spojení, spojení** Test** kontroly stavu tlačítka a pozadí nikdy nevolají koncový bod: pouze ověřují uloženou konfiguraci a hlásí připojení jako neověřitelné.

`POST /api/provider-nodes/validate` se `"apiType": "custom-json"` a uzlovými poli (`baseUrl`, `apiKey`, `customJson`, volitelné `customHeaders` a `modelId`) odešle právě jeden skutečný požadavek, se `ping` jako nejnovějším uživatelským textem. Odpovídá `{ "valid": true }` nebo upstream status (nikdy upstream tělo).

## Skladování

Konfigurace je uložena v `provider_nodes.custom_json_config_json` (migrační `240_provider_node_custom_json_config.sql`) a zkopírována do `providerSpecificData.customJson` každého připojení.

Implementace: `open-sse/utils/customJson.ts` (ověření a šablonování), `open-sse/executors/customJson.ts` (exekutor), `open-sse/services/combo/noReplayLatch.ts` a `src/sse/handlers/chat/responsePolicies.ts` (bez přehrávání).
