# Custom JSON API provider nodes (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Prilagođeni JSON API čvor povezuje JSON poslovnu krajnju točku koja ne govori OpenAI ili Anthropic protokol. OmniRoute ispunjava predložak JSON zahtjeva, šalje ga do cijele krajnje točke URL, čita odgovor s putanje odgovora i vraća ga klijentu u vlastitom formatu klijenta (završeci razgovora, odgovori, poruke, ...).

To je OpenAI-kompatibilan čvor sa `apiType: "custom-json"`; njegov id ima oblik `openai-compatible-custom-json-<suffix>`. Obrazac nadzorne ploče još nije dostupan. Stvorite i uredite ove čvorove putem čvora pružatelja usluga API u nastavku.

## Stvorite čvor

`POST /api/provider-nodes` (autorizacija upravljanja):

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

- `baseUrl` je** potpuna** krajnja točka URL. Ništa se ne dodaje (nema `/chat/completions`, nema `/models`) i, za razliku od drugih OpenAI-kompatibilnih čvorova, ne postoji zadani URL. Mora biti `http(s)`, bez ugrađenih vjerodajnica ili `#fragment`, i prolazi isti izlazni URL zaštitnik kao i svaki čvor pružatelja, i kada je čvor spremljen i na svaki zahtjev.
- Čvor koji šalje ključ veze (`authType` `bearer` ili `api-key`, uključujući zadani) mora koristiti `https://`. Obični `http://` prihvaća se samo za host povratne petlje (`localhost`, `127.0.0.0/8`, `::1`) ili sa `authType: "none"`, koji ne šalje ključ. Privatne LAN adrese (`10.x`, `172.16-31.x`, `192.168.x`) nisu izuzete: svatko na toj mreži može pročitati ključ. Spremanje takvog čvora ne uspijeva s `400`, a čvor koji je ranije pohranjen ne uspijeva se zatvoriti na svaki zahtjev s istom porukom, prije nego što se zahtjev pošalje. Za ključnu krajnju točku na LAN, stavite je iza TLS (na primjer obrnuti proxy).
- `customJson` je potvrđen sa Zod; nepoznati ključevi su odbijeni. Svako polje nije obavezno:

| Polje             | Vrijednosti                                  | Zadano                                                 |
| ----------------- | -------------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                       | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`                  | `bearer`                                               |
| `authHeader`      | ime zaglavlja koje se koristi kada `api-key` | `X-API-Key`                                            |
| `requestTemplate` | JSON objekt (≤ 64 KB, dubina ≤ 32)           | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | field path, ili `$` za cijelo tijelo         | `choices[0].message.content`                           |

- Tajna ostaje u API ključu veze, nikada u predlošku. `bearer` šalje `Authorization: Bearer <key>`; `api-key` šalje `<authHeader>: <key>`. Zaglavlje autentifikacije ne može biti `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` ili hop-by-hop zaglavlje. Uz `none`, veze ne trebaju ključ.
- Dodatna statička zaglavlja koriste uobičajeni `customHeaders` čvora (ista provjera valjanosti kao i svaki drugi kompatibilni čvor; zaglavlja autentifikacije tamo nisu dopuštena).

`PUT /api/provider-nodes/<id>` prihvaća isti `customJson` i prepisuje `baseUrl` i konfiguraciju na svakoj postojećoj vezi čvora. Izostavljanje `customJson` zadržava pohranjenu konfiguraciju; prebacivanje `apiType` na `chat` ili `responses` uklanja ga iz čvora i njegovih veza.

Zatim dodajte vezu na čvor kao i obično (`POST /api/providers` s id-om čvora) i zatražite `<prefix>/<model>`, na primjer `biz/assistant-v1`. Krajnja točka ne izlaže popis modela, stoga dodajte ID-ove modela ručno.

## Predlošci zahtjeva

Predlošci su obični JSON. Vrijednost niza može sadržavati `{{placeholder}}` markere; ništa se ne procjenjuje niti izvršava, a ključevi objekta se nikada ne zamjenjuju.

| Rezervirano mjesto   | Vrijednost                                                                  |
| -------------------- | --------------------------------------------------------------------------- |
| `{{prompt}}`         | Tekst posljednje korisničke poruke (dijelovi teksta spojeni novim redovima) |
| `{{messages}}`       | Razgovor u OpenAI chat formatu                                              |
| `{{model}}`          | Traženi ID modela, bez prefiksa davatelja                                   |
| `{{stream}}`         | Uvijek `false` — krajnja točka odgovara jednim JSON dokumentom              |
| `{{request.<path>}}` | Polje prevedenog (OpenAI chat format) zahtjeva                              |

- Vrijednost koja je točno jedno rezervirano mjesto zadržava svoj JSON tip (`"{{messages}}"` postaje niz); rezervirano mjesto unutar dužeg niza umetnuto je kao tekst.
- Rezervirano mjesto koje se razrješava na ništa ne uspijeva zahtjev sa HTTP 400 umjesto slanja nepotpunog korisnog opterećenja.
- Staze koriste zapis točkama i numeričke indekse (`data.items[0].text`). `__proto__`, `prototype` i `constructor` su odbijeni u ključevima i stazama.

## Odgovori

Vrijednost na `responsePath` postaje odgovor pomoćnika: nizovi prolaze, ostale JSON vrijednosti se serijaliziraju. Polje koje nedostaje ili `null`, ili tijelo koje nije JSON, vraća HTTP 502. Statusi grešaka uzvodnog toka se prosljeđuju. Za streaming klijente OmniRoute čeka cijeli JSON odgovor i zatim ga emitira kao jedan sadržajni dio plus završni dio; ovo nije strujanje tokena. Pozivi alata i polja upotrebe nisu mapirani.

## Nikad reprizirano

Poslovni zahtjev može imati nuspojave čak i kada ne uspije. OmniRoute ga stoga šalje jednom:

- nema ponovnog pokušaja transporta i nema praćenja preusmjeravanja;
- nema ponovnog pokušaja na drugoj vezi (zamjenski račun) — greška se vraća kakva jest i veza se ne hladi;
- nema povratka na sljedeći kombinirani cilj, čak ni za prazan ili neuspjeli odgovor.

Zasebni klijentski zahtjevi i fuzijski paneli koji izričito pozivaju nekoliko modela i dalje neovisno pozivaju krajnju točku.

## Testiranje čvora

Spremanje veze, veze** Test** provjera stanja gumba i pozadine nikada ne poziva krajnju točku: one samo potvrđuju valjanost pohranjene konfiguracije i izvješćuju da se veza ne može provjeriti.

`POST /api/provider-nodes/validate` sa `"apiType": "custom-json"` i poljima čvora (`baseUrl`, `apiKey`, `customJson`, izborno `customHeaders` i `modelId`) šalje točno jedan pravi zahtjev, sa `ping` kao najnovijim korisničkim tekstom. Odgovara `{ "valid": true }` ili uzvodni status (nikada uzvodno tijelo).

## Skladištenje

Konfiguracija je pohranjena u `provider_nodes.custom_json_config_json` (migracija `240_provider_node_custom_json_config.sql`) i kopirana u `providerSpecificData.customJson` svake veze.

Implementacija: `open-sse/utils/customJson.ts` (provjera valjanosti i šablona), `open-sse/executors/customJson.ts` (izvršitelj), `open-sse/services/combo/noReplayLatch.ts` i `src/sse/handlers/chat/responsePolicies.ts` (bez ponavljanja).
