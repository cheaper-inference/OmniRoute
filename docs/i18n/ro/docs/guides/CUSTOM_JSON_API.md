# Custom JSON API provider nodes (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇮🇹 [it](../../../it/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Un nod JSON API personalizat conectează un punct final de afaceri JSON care nu vorbește protocolul OpenAI sau Anthropic. OmniRoute completează un șablon de cerere JSON, îl trimite la punctul final complet URL, citește răspunsul dintr-o cale de răspuns și îl returnează clientului în formatul propriu al clientului (finalizări de chat, răspunsuri, mesaje, ...).

Este un nod compatibil OpenAI cu `apiType: "custom-json"`; id-ul său are forma `openai-compatible-custom-json-<suffix>`. Formularul tabloului de bord nu este încă disponibil. Creați și editați aceste noduri prin provider-node API de mai jos.

## Creați un nod

`POST /api/provider-nodes` (autentificare de management):

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

- `baseUrl` este** complet** punctul final URL. Nimic nu este adăugat (fără `/chat/completions`, fără `/models`) și, spre deosebire de alte noduri compatibile cu OpenAI, nu există URL implicit. Trebuie să fie `http(s)`, fără acreditări încorporate sau un `#fragment`, și trece aceeași gardă URL de ieșire ca fiecare nod furnizor, atât atunci când nodul este salvat, cât și la fiecare solicitare.
- Un nod care trimite cheia de conectare (`authType` `bearer` sau `api-key`, inclusiv implicit) trebuie să folosească `https://`. `http://` simplu este acceptat numai pentru o gazdă loopback (`localhost`, `127.0.0.0/8`, `::1`) sau cu `authType: "none"`, care nu trimite nicio cheie. Adresele private LAN (`10.x`, `172.16-31.x`, `192.168.x`) nu sunt scutite: oricine din acea rețea ar putea citi cheia. Salvarea unui astfel de nod eșuează cu `400`, iar un nod stocat mai devreme eșuează închis la fiecare cerere cu același mesaj, înainte ca orice cerere să fie trimisă. Pentru un punct final cu cheie pe un LAN, puneți-l în spatele TLS (de exemplu, un proxy invers).
- `customJson` este validat cu Zod; cheile necunoscute sunt respinse. Fiecare câmp este opțional:

| Domeniu           | Valori                                       | Implicit                                               |
| ----------------- | -------------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                       | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`                  | `bearer`                                               |
| `authHeader`      | numele antetului folosit când `api-key`      | `X-API-Key`                                            |
| `requestTemplate` | obiect JSON (≤ 64 KB, adâncime ≤ 32)         | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | calea câmpului, sau `$` pentru întregul corp | `choices[0].message.content`                           |

- Secretul rămâne în cheia API a conexiunii, niciodată în șablon. `bearer` trimite `Authorization: Bearer <key>`; `api-key` trimite `<authHeader>: <key>`. Antetul de autentificare nu poate fi `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` sau un antet hop-by-hop. Cu `none`, conexiunile nu au nevoie de cheie.
- Antetele statice suplimentare folosesc `customHeaders` obișnuit al nodului (aceeași validare ca orice alt nod compatibil; anteturile de autentificare nu sunt permise acolo).

`PUT /api/provider-nodes/<id>` acceptă același `customJson` și rescrie `baseUrl` și configurația pe fiecare conexiune existentă a nodului. Omiterea `customJson` păstrează configurația stocată; comutarea `apiType` la `chat` sau `responses` îl elimină din nod și conexiunile sale.

Apoi adăugați o conexiune la nod ca de obicei (`POST /api/providers` cu id-ul nodului) și solicitați `<prefix>/<model>`, de exemplu `biz/assistant-v1`. Punctul final nu expune nicio listă de modele, așa că adăugați manual ID-urile modelului.

## Solicitați șabloane

Șabloanele sunt simple JSON. O valoare șir poate conține markeri `{{placeholder}}` ; nimic nu este evaluat sau executat, iar cheile obiectelor nu sunt niciodată înlocuite.

| Substituent          | Valoare                                                                     |
| -------------------- | --------------------------------------------------------------------------- |
| `{{prompt}}`         | Textul celui mai recent mesaj utilizator (părți de text unite cu linii noi) |
| `{{messages}}`       | Conversația în format OpenAI chat                                           |
| `{{model}}`          | Id-ul de model solicitat, fără prefixul furnizorului                        |
| `{{stream}}`         | Întotdeauna `false` — punctul final răspunde cu un document JSON            |
| `{{request.<path>}}` | Un câmp al cererii traduse (format de chat OpenAI ).                        |

- O valoare care este exact un substituent își păstrează tipul JSON (`"{{messages}}"` devine un tablou); un substituent în interiorul unui șir mai lung este inserat ca text.
- Un substituent care se rezolvă la nimic eșuează solicitarea cu HTTP 400 în loc să trimită o sarcină utilă incompletă.
- Căile folosesc notația cu puncte și indecși numerici (`data.items[0].text`). `__proto__`, `prototype` și `constructor` sunt respinse în chei și căi.

## Răspunsuri

Valoarea de la `responsePath` devine răspunsul asistent: șirurile trec, alte valori JSON sunt serializate. Un câmp lipsă sau `null`, sau un corp care nu este JSON, returnează HTTP 502. Stările de eroare din amonte sunt transmise. Pentru clienții de streaming, OmniRoute așteaptă întregul răspuns JSON și apoi îl emite ca o bucată de conținut plus fragmentul final; acesta nu este streaming de simboluri. Apelurile pentru instrumente și câmpurile de utilizare nu sunt mapate.

## Niciodată reluat

O cerere de afaceri poate avea efecte secundare chiar și atunci când eșuează. Prin urmare, OmniRoute îl trimite o dată:

- nicio reîncercare de transport și nicio urmărire de redirecționare;
- nicio reîncercare la o altă conexiune (account fallback) — eșecul este returnat așa cum este și conexiunea nu este răcită;
- nicio alternativă la următoarea țintă combo, chiar și pentru un răspuns gol sau eșuat.

Solicitările separate ale clientului și panourile de fuziune care apelează în mod explicit mai multe modele, încă invocă punctul final în mod independent.

## Testarea unui nod

Salvarea unei conexiuni, conexiunea** Test** Verificările de sănătate ale butonului și ale fundalului nu apelează niciodată la punctul final: validează doar configurația stocată și raportează conexiunea ca neverificabilă.

`POST /api/provider-nodes/validate` cu `"apiType": "custom-json"` și câmpurile nod (`baseUrl`, `apiKey`, `customJson`, opțional `customHeaders` și `modelId`) trimite exact o cerere reală, cu `ping` ca cel mai recent text de utilizator. Răspunde `{ "valid": true }` sau starea din amonte (niciodată corpul din amonte).

## Depozitare

Configurația este stocată în `provider_nodes.custom_json_config_json` (migration `240_provider_node_custom_json_config.sql`) și copiată în fiecare conexiune `providerSpecificData.customJson`.

Implementare: `open-sse/utils/customJson.ts` (validare și șabloane), `open-sse/executors/customJson.ts` (executor), `open-sse/services/combo/noReplayLatch.ts` și `src/sse/handlers/chat/responsePolicies.ts` (fără reluare).
