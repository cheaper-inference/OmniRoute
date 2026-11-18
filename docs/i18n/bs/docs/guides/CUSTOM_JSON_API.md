# Custom JSON API provider nodes (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Prilagođeni JSON API čvor povezuje JSON poslovnu krajnju točku koja ne govori OpenAI ili Anthropic protokol. OmniRoute ispunjava JSON predložak zahtjeva, šalje ga kompletnoj krajnjoj tački URL, čita odgovor sa putanje odgovora i vraća ga klijentu u vlastitom formatu (završetak ćaskanja, odgovori, poruke,...).

To je OpenAI-kompatibilan čvor sa `apiType: "custom-json"`; njegov id ima oblik `openai-compatible-custom-json-<suffix>`. Obrazac za kontrolnu tablu još nije dostupan. Kreirajte i uredite ove čvorove preko donjeg čvora provajdera API.

## Kreirajte čvor

`POST /api/provider-nodes` (autor za upravljanje):

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

- `baseUrl` je** kompletan** krajnja tačka URL. Ništa se ne dodaje (nema `/chat/completions`, nema `/models`) i, za razliku od drugih OpenAI kompatibilnih čvorova, nema zadanog URL. Mora biti `http(s)`, bez ugrađenih vjerodajnica ili `#fragment`, i prolazi isti izlazni URL čuvar kao i svaki provajderski čvor, i kada je čvor spremljen i na svaki zahtjev.
- Čvor koji šalje ključ veze (`authType` `bearer` ili `api-key`, uključujući zadani) mora koristiti `https://`. Običan `http://` je prihvaćen samo za host povratne petlje (`localhost`, `127.0.0.0/8`, `::1`) ili sa `authType: "none"`, koji ne šalje ključ. Privatne LAN adrese (`10.x`, `172.16-31.x`, `192.168.x`) nisu izuzete: bilo ko na toj mreži može pročitati ključ. Čuvanje takvog čvora ne uspijeva sa `400`, a čvor pohranjen ranije ne zatvara se na svaki zahtjev sa istom porukom, prije nego što se pošalje bilo koji zahtjev. Za krajnju tačku s ključem na LAN, stavite je iza TLS (na primjer obrnuti proxy).
- `customJson` je potvrđena sa Zod; nepoznati ključevi su odbijeni. Svako polje je opciono:

| Polje             | Vrijednosti                                  | Default                                                |
| ----------------- | -------------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                       | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`                  | `bearer`                                               |
| `authHeader`      | ime zaglavlja koje se koristi kada `api-key` | `X-API-Key`                                            |
| `requestTemplate` | JSON objekt (≤ 64 KB, dubina ≤ 32)           | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | poljski put, ili `$` za cijelo tijelo        | `choices[0].message.content`                           |

- Tajna ostaje u API ključu veze, nikad u predlošku. `bearer` šalje `Authorization: Bearer <key>`; `api-key` šalje `<authHeader>: <key>`. Auth zaglavlje ne može biti `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` ili hop-by-hop zaglavlje. Sa `none`, veze ne trebaju ključ.
- Dodatna statička zaglavlja koriste uobičajeni `customHeaders` čvora (ista provjera valjanosti kao i svaki drugi kompatibilni čvor; auth zaglavlja tamo nisu dozvoljena).

`PUT /api/provider-nodes/<id>` prihvata isti `customJson` i prepisuje `baseUrl` i konfiguraciju na svakoj postojećoj vezi čvora. Izostavljanjem `customJson` čuva se pohranjena konfiguracija; prebacivanje `apiType` na `chat` ili `responses` uklanja ga iz čvora i njegovih veza.

Zatim dodajte vezu na čvor kao i obično (`POST /api/providers` sa id-om čvora) i zatražite `<prefix>/<model>`, na primjer `biz/assistant-v1`. Krajnja tačka ne izlaže listu modela, pa dodajte ID-ove modela ručno.

## Zahtjev za šablone

Šabloni su obični JSON. Vrijednost stringa može sadržavati `{{placeholder}}` markere; ništa se ne evaluira niti izvršava, a ključevi objekta se nikada ne zamjenjuju.

| Čuvar mjesta         | Vrijednost                                                                 |
| -------------------- | -------------------------------------------------------------------------- |
| `{{prompt}}`         | Tekst najnovije korisničke poruke (dijelovi teksta spojeni novim redovima) |
| `{{messages}}`       | Razgovor u OpenAI chat formatu                                             |
| `{{model}}`          | Traženi ID modela, bez prefiksa provajdera                                 |
| `{{stream}}`         | Uvijek `false` — krajnja tačka odgovara jednim JSON dokumentom             |
| `{{request.<path>}}` | Polje prevedenog (OpenAI chat format) zahtjeva                             |

- Vrijednost koja je tačno jedan čuvar mjesta zadržava svoj tip JSON (`"{{messages}}"` postaje niz); čuvar mjesta unutar dužeg niza se umeće kao tekst.
- Čuvar mjesta koji se rješava u ništa ne uspijeva u zahtjevu sa HTTP 400 umjesto da pošalje nepotpuno opterećenje.
- Putanja koriste notaciju tačaka i numeričke indekse (`data.items[0].text`). `__proto__`, `prototype` i `constructor` se odbijaju u ključevima i stazama.

## Odgovori

Vrijednost u `responsePath` postaje pomoćni odgovor: nizovi prolaze, ostale JSON vrijednosti se serijaliziraju. Polje koje nedostaje ili `null`, ili tijelo koje nije JSON, vraća HTTP 502. Statusi greške uzvodno se prenose. Za strimovanje klijenata OmniRoute čeka cijeli JSON odgovor i zatim ga emituje kao jedan dio sadržaja plus završni komad; ovo nije token streaming. Pozivi alata i polja upotrebe nisu mapirani.

## Nikad reproducirano

Poslovni zahtjev može imati nuspojave čak i kada ne uspije. OmniRoute ga stoga šalje jednom:

- nema ponovnog transporta i nema praćenja preusmjeravanja;
- nema ponovnog pokušaja na drugoj vezi (backback account) — greška se vraća onakva kakva jeste i veza se ne hladi;
- nema povratka na sljedeću kombiniranu metu, čak ni za prazan ili neuspješan odgovor.

Odvojeni zahtjevi klijenata i fuzioni paneli koji eksplicitno pozivaju nekoliko modela i dalje nezavisno pozivaju krajnju tačku.

## Testiranje čvora

Čuvanje veze, veze** Test** dugme i provjere zdravlja u pozadini nikada ne pozivaju krajnju tačku: one samo potvrđuju pohranjenu konfiguraciju i prijavljuju vezu kao neprovjerljivu.

`POST /api/provider-nodes/validate` sa `"apiType": "custom-json"` i poljima čvora (`baseUrl`, `apiKey`, `customJson`, opcioni `customHeaders` i `modelId`) šalje tačno jedan pravi zahtjev, sa `ping` kao najnovijim korisničkim tekstom. Odgovara `{ "valid": true }` ili uzvodni status (nikad uzvodno tijelo).

## Skladištenje

Konfiguracija je pohranjena u `provider_nodes.custom_json_config_json` (migracija `240_provider_node_custom_json_config.sql`) i kopirana u `providerSpecificData.customJson` svake veze.

Implementacija: `open-sse/utils/customJson.ts` (validacija i šabloniranje), `open-sse/executors/customJson.ts` (izvršitelj), `open-sse/services/combo/noReplayLatch.ts` i `src/sse/handlers/chat/responsePolicies.ts` (bez ponavljanja).
