# Custom JSON API provider nodes (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Egy egyéni JSON API csomópont olyan JSON üzleti végpontot köt össze, amely nem beszéli a OpenAI vagy Anthropic protokollt. OmniRoute kitölt egy JSON kérési sablont, elküldi a teljes URL végpontnak, beolvassa a választ egy válaszútról, és visszaküldi az ügyfélnek az ügyfél saját formátumában (Csevegés befejezése, Válaszok, Üzenetek, ...).

Ez egy OpenAI-kompatibilis csomópont `apiType: "custom-json"` val; azonosítója `openai-compatible-custom-json-<suffix>` alakú. Az irányítópult űrlapja még nem érhető el. Hozza létre és szerkessze ezeket a csomópontokat az alábbi szolgáltató-csomópont API segítségével.

## Hozzon létre egy csomópontot

`POST /api/provider-nodes` (menedzsment hitelesítés):

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

- `baseUrl` az** teljes** végpont URL. Semmi sincs hozzáfűzve (nincs `/chat/completions`, nincs `/models`), és más OpenAI-kompatibilis csomópontokkal ellentétben nincs alapértelmezett URL. Ennek `http(s)` kell lennie, beágyazott hitelesítő adatok vagy `#fragment` nélkül, és ugyanazt a kimenő URL védelmet adja át, mint minden szolgáltatói csomópont, a csomópont mentésekor és minden kérés esetén is.
- A csatlakozási kulcsot küldő csomópontnak (`authType` `bearer` vagy `api-key`, beleértve az alapértelmezettet is) `https://` kell használnia. A sima `http://` csak visszacsatolásos gazdagéphez (`localhost`, `127.0.0.0/8`, `::1`) vagy `authType: "none"`-vel használható, amely nem küld kulcsot. A privát LAN címek (`10.x`, `172.16-31.x`, `192.168.x`) nem mentesülnek: az adott hálózaton bárki elolvashatja a kulcsot. Egy ilyen csomópont mentése meghiúsul `400` segítségével, és a korábban tárolt csomópont minden kérésnél ugyanazzal az üzenettel bezárul, mielőtt bármilyen kérést elküldenének. A LAN kulcsos végpontja esetén tegye TLS mögé (például egy fordított proxy).
- `customJson` Zod vel érvényesítve van; az ismeretlen kulcsokat elutasítja. Minden mező nem kötelező:

| Mező              | Értékek                               | Alapértelmezett                                        |
| ----------------- | ------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`           | `bearer`                                               |
| `authHeader`      | `api-key` esetén használt fejlécnév   | `X-API-Key`                                            |
| `requestTemplate` | JSON objektum (≤ 64 KB, mélység ≤ 32) | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | mezőút, vagy `$` az egész testre      | `choices[0].message.content`                           |

- A titok a kapcsolat API kulcsában marad, soha nem a sablonban. `bearer` `Authorization: Bearer <key>` küld; `api-key` `<authHeader>: <key>` küld. A hitelesítési fejléc nem lehet `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` vagy ugrásról-ugratásra vonatkozó fejléc. `none` használatával a kapcsolatokhoz nincs szükség kulcsra.
- Az extra statikus fejlécek a csomópont szokásos `customHeaders` használják (ugyanaz az érvényesítés, mint minden más kompatibilis csomópont; ott nem engedélyezettek az auth fejlécek).

`PUT /api/provider-nodes/<id>` ugyanazt a `customJson` fogadja el, és átírja `baseUrl` és a konfigurációt a csomópont minden létező kapcsolatán. `customJson` elhagyása megtartja a tárolt konfigurációt; `apiType` `chat` -re vagy `responses` váltása eltávolítja a csomópontból és annak kapcsolataiból.

Ezután a szokásos módon adjon hozzá kapcsolatot a csomóponthoz (`POST /api/providers` a csomópont azonosítójával), és kérje `<prefix>/<model>`, például `biz/assistant-v1`. A végpont nem jelenít meg modelllistát, ezért kézzel adja hozzá a modellazonosítókat.

## Kérjen sablonokat

A sablonok sima JSON. Egy karakterlánc érték tartalmazhat `{{placeholder}}` markereket; semmi sem kerül kiértékelésre vagy végrehajtásra, és az objektumkulcsok soha nem cserélődnek le.

| Helyőrző             | Érték                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| `{{prompt}}`         | A legfrissebb felhasználói üzenet szövege (a szövegrészek új sorokkal egyesítve) |
| `{{messages}}`       | A beszélgetés OpenAI chat formátumban                                            |
| `{{model}}`          | A kért modellazonosító a szolgáltató előtagja nélkül                             |
| `{{stream}}`         | Mindig `false` — a végpont választ egyetlen JSON dokumentummal                   |
| `{{request.<path>}}` | A lefordított (OpenAI chat formátum) kérés mezője                                |

- A pontosan egy helyőrző érték megtartja JSON típusát (`"{{messages}}"` tömbbé válik); egy hosszabb karakterláncon belüli helyőrző szövegként kerül beillesztésre.
- Az a helyőrző, amely a semmit sem oldja meg, meghiúsítja a kérést HTTP 400-al, ahelyett, hogy hiányos rakományt küldene.
- Az útvonalak pontjelölést és numerikus indexeket (`data.items[0].text`) használnak. `__proto__`, `prototype` és `constructor` a kulcsokban és elérési utakban elutasításra kerül.

## Válaszok

A `responsePath` érték lesz az asszisztens válasz: a karakterláncok átmennek, a többi JSON érték sorba rendeződik. A hiányzó vagy `null` mező, vagy a törzs, amely nem JSON, HTTP 502 értéket adja vissza. A felfelé irányuló hibaállapotok áthaladnak. A streaming klienseknél OmniRoute megvárja a teljes JSON választ, majd kiadja azt egy tartalomdarabként és a befejező darabként; ez nem token streaming. Az eszközhívások és a használati mezők nincsenek leképezve.

## Soha nem játszották újra

Egy üzleti kérésnek még akkor is lehetnek mellékhatásai, ha nem sikerül. ezért OmniRoute egyszer elküldi:

- nincs szállítási újrapróbálkozás és nincs átirányítási követés;
- nincs újrapróbálkozás másik kapcsolaton (a fiók visszaesése) — a hiba a jelenlegi állapotában kerül visszaadásra, és a kapcsolat nem hűl le;
- nincs visszalépés a következő kombinált célponthoz, még üres vagy sikertelen válasz esetén sem.

A különálló klienskérések és a több modellt kifejezetten meghívó fúziós panelek továbbra is függetlenül hívják meg a végpontot.

## Csomópont tesztelése

Kapcsolat mentése, kapcsolat** Teszt** gomb és a háttér állapotellenőrzései soha nem hívják meg a végpontot: csak a tárolt konfigurációt érvényesítik, és a kapcsolatot nem ellenőrizhetőként jelzik.

`POST /api/provider-nodes/validate` `"apiType": "custom-json"` vel és a csomópontmezőkkel (`baseUrl`, `apiKey`, `customJson`, opcionális `customHeaders` és `modelId`) pontosan egy valódi kérést küld, `ping` a legfrissebb felhasználói szöveggel. `{ "valid": true }` vagy az upstream állapotra válaszol (soha az upstream testre).

## Tárolás

A konfigurációt `provider_nodes.custom_json_config_json` (migrációs `240_provider_node_custom_json_config.sql`) tárolja, és minden egyes kapcsolat `providerSpecificData.customJson` fájljába másolja.

Megvalósítás: `open-sse/utils/customJson.ts` (ellenőrzés és sablonozás), `open-sse/executors/customJson.ts` (végrehajtó), `open-sse/services/combo/noReplayLatch.ts` és `src/sse/handlers/chat/responsePolicies.ts` (visszajátszás nélkül).
