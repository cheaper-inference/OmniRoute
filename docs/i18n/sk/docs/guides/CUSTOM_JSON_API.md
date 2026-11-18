# Custom JSON API provider nodes (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Vlastný uzol JSON API spája obchodný koncový bod JSON, ktorý nehovorí protokolom OpenAI alebo Anthropic. OmniRoute vyplní šablónu požiadavky JSON, odošle ju úplnému koncovému bodu URL, prečíta odpoveď z cesty odpovede a vráti ju klientovi vo vlastnom formáte klienta (Dokončenia chatu, Odpovede, Správy, ...).

Je to uzol kompatibilný s OpenAI so `apiType: "custom-json"`; jeho id má tvar `openai-compatible-custom-json-<suffix>`. Formulár palubnej dosky zatiaľ nie je k dispozícii. Vytvorte a upravte tieto uzly prostredníctvom uzla poskytovateľa API nižšie.

## Vytvorte uzol

`POST /api/provider-nodes` (autorizácia správy):

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

- `baseUrl` je** kompletný** koncový bod URL. Nič nie je pripojené (žiadne `/chat/completions`, žiadne `/models`) a na rozdiel od iných uzlov kompatibilných s OpenAI tu nie je žiadne predvolené URL. Musí to byť `http(s)`, bez vložených poverení alebo `#fragment`, a musí prejsť rovnakým výstupným URL strážcom ako každý uzol poskytovateľa, a to pri ukladaní uzla aj pri každej požiadavke.
- Uzol, ktorý odosiela kľúč pripojenia (`authType` `bearer` alebo `api-key`, vrátane predvoleného nastavenia) musí používať `https://`. Obyčajné `http://` je akceptované iba pre hostiteľa spätnej slučky (`localhost`, `127.0.0.0/8`, `::1`) alebo so `authType: "none"`, ktorý neposiela žiadny kľúč. Súkromné adresy LAN (`10.x`, `172.16-31.x`, `192.168.x`) nie sú vyňaté: ktokoľvek v tejto sieti môže čítať kľúč. Uloženie takéhoto uzla zlyhá pomocou `400` a uzol uložený skôr sa nepodarí uzavrieť pri každej požiadavke s rovnakou správou pred odoslaním akejkoľvek požiadavky. Pre kľúčovaný koncový bod na LAN ho umiestnite za TLS (napríklad reverzný proxy).
- `customJson` je overené pomocou Zod; neznáme kľúče sú odmietnuté. Každé pole je voliteľné:

| Pole              | hodnoty                              | Predvolené                                             |
| ----------------- | ------------------------------------ | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`               | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`          | `bearer`                                               |
| `authHeader`      | názov hlavičky použitý pri `api-key` | `X-API-Key`                                            |
| `requestTemplate` | objekt JSON (≤ 64 KB, hĺbka ≤ 32)    | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | poľná cesta, alebo `$` pre celé telo | `choices[0].message.content`                           |

- Tajomstvo zostáva v kľúči API pripojenia, nikdy nie v šablóne. `bearer` odošle `Authorization: Bearer <key>`; `api-key` odošle `<authHeader>: <key>`. Auth hlavička nemôže byť `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` alebo hlavička hop-by-hop. S `none` nepotrebujete pripojenie žiadny kľúč.
- Extra statické hlavičky používajú bežné `customHeaders` uzla (rovnaké overenie ako každý iný kompatibilný uzol; auth hlavičky tam nie sú povolené).

`PUT /api/provider-nodes/<id>` akceptuje rovnaké `customJson` a prepíše `baseUrl` a konfiguráciu na každom existujúcom pripojení uzla. Vynechaním `customJson` sa zachová uložená konfigurácia; prepnutím `apiType` na `chat` alebo `responses` sa odstráni z uzla a jeho spojení.

Potom pridajte pripojenie k uzlu ako zvyčajne (`POST /api/providers` s ID uzla) a požiadajte o `<prefix>/<model>`, napríklad `biz/assistant-v1`. Koncový bod nevystavuje žiadny zoznam modelov, takže ID modelov pridajte ručne.

## Vyžiadajte si šablóny

Šablóny sú obyčajné JSON. Hodnota reťazca môže obsahovať značky `{{placeholder}}` ; nič sa nevyhodnocuje ani nevykonáva a kľúče objektu sa nikdy nenahrádzajú.

| Zástupný symbol      | Hodnota                                                                     |
| -------------------- | --------------------------------------------------------------------------- |
| `{{prompt}}`         | Text najnovšej správy používateľa (textové časti spojené s novými riadkami) |
| `{{messages}}`       | Konverzácia vo formáte OpenAI chat                                          |
| `{{model}}`          | Požadované ID modelu bez predpony poskytovateľa                             |
| `{{stream}}`         | Vždy `false` — koncový bod odpovedá jedným dokumentom JSON                  |
| `{{request.<path>}}` | Pole preloženej požiadavky (formát chatu OpenAI ).                          |

- Hodnota, ktorá je presne jedným zástupným symbolom, si zachová svoj typ JSON (`"{{messages}}"` sa stane poľom); zástupný symbol vnútri dlhšieho reťazca sa vloží ako text.
- Zástupný symbol, ktorý sa nevyrieši na nič, zlyhá pri požiadavke s HTTP 400 namiesto odoslania neúplného užitočného zaťaženia.
- Cesty používajú bodkový zápis a číselné indexy (`data.items[0].text`). `__proto__`, `prototype` a `constructor` sú odmietnuté v kľúčoch a cestách.

## Odpovede

Hodnota v `responsePath` sa stane odpoveďou asistenta: reťazce prechádzajú, ostatné hodnoty JSON sú serializované. Chýbajúce pole alebo pole `null` alebo telo, ktoré nie je JSON, vráti HTTP 502. Chybové stavy proti prúdu sa prenesú. Pre streamingových klientov OmniRoute čaká na celú odozvu JSON a potom ju vyšle ako jednu časť obsahu plus konečnú časť; toto nie je token streaming. Volania nástrojov a polia použitia nie sú zmapované.

## Nikdy neprehrané

Obchodná požiadavka môže mať vedľajšie účinky, aj keď zlyhá. OmniRoute to teda odošle raz:

- žiadne opakovanie prenosu a žiadne následné presmerovanie;
- žiadny pokus o ďalšie pripojenie (záložný účet) — zlyhanie sa vráti tak, ako je, a pripojenie sa neochladí;
- žiadny návrat na ďalší kombinovaný cieľ, dokonca ani v prípade prázdnej alebo neúspešnej odpovede.

Samostatné požiadavky klientov a fúzne panely, ktoré explicitne volajú niekoľko modelov, stále vyvolávajú koncový bod nezávisle.

## Testovanie uzla

Uloženie spojenia, spojenie** Test** kontroly stavu tlačidiel a pozadia nikdy nezavolajú koncový bod: iba overia uloženú konfiguráciu a nahlásia pripojenie ako neoveriteľné.

`POST /api/provider-nodes/validate` so `"apiType": "custom-json"` a poliami uzlov (`baseUrl`, `apiKey`, `customJson`, voliteľné `customHeaders` a `modelId`) odošle presne jednu skutočnú požiadavku, pričom `ping` je najnovší text používateľa. Odpovedá `{ "valid": true }` alebo upstream status (nikdy nie upstream telo).

## Skladovanie

Konfigurácia je uložená v `provider_nodes.custom_json_config_json` (migrácia `240_provider_node_custom_json_config.sql`) a skopírovaná do `providerSpecificData.customJson` každého pripojenia.

Implementácia: `open-sse/utils/customJson.ts` (validácia a šablóna), `open-sse/executors/customJson.ts` (exekútor), `open-sse/services/combo/noReplayLatch.ts` a `src/sse/handlers/chat/responsePolicies.ts` (bez opakovaného prehrávania).
