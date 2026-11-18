# Custom JSON API provider nodes (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CUSTOM_JSON_API.md) · 🇪🇹 [am](../../../am/docs/guides/CUSTOM_JSON_API.md) · 🇸🇦 [ar](../../../ar/docs/guides/CUSTOM_JSON_API.md) · 🇦🇿 [az](../../../az/docs/guides/CUSTOM_JSON_API.md) · 🇧🇬 [bg](../../../bg/docs/guides/CUSTOM_JSON_API.md) · 🇧🇩 [bn](../../../bn/docs/guides/CUSTOM_JSON_API.md) · 🇧🇦 [bs](../../../bs/docs/guides/CUSTOM_JSON_API.md) · 🇨🇿 [cs](../../../cs/docs/guides/CUSTOM_JSON_API.md) · 🇩🇰 [da](../../../da/docs/guides/CUSTOM_JSON_API.md) · 🇩🇪 [de](../../../de/docs/guides/CUSTOM_JSON_API.md) · 🇬🇷 [el](../../../el/docs/guides/CUSTOM_JSON_API.md) · 🇪🇸 [es](../../../es/docs/guides/CUSTOM_JSON_API.md) · 🇪🇪 [et](../../../et/docs/guides/CUSTOM_JSON_API.md) · 🇮🇷 [fa](../../../fa/docs/guides/CUSTOM_JSON_API.md) · 🇫🇮 [fi](../../../fi/docs/guides/CUSTOM_JSON_API.md) · 🇫🇷 [fr](../../../fr/docs/guides/CUSTOM_JSON_API.md) · 🇮🇪 [ga](../../../ga/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [gu](../../../gu/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ha](../../../ha/docs/guides/CUSTOM_JSON_API.md) · 🇮🇱 [he](../../../he/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [hi](../../../hi/docs/guides/CUSTOM_JSON_API.md) · 🇭🇷 [hr](../../../hr/docs/guides/CUSTOM_JSON_API.md) · 🇭🇺 [hu](../../../hu/docs/guides/CUSTOM_JSON_API.md) · 🇦🇲 [hy](../../../hy/docs/guides/CUSTOM_JSON_API.md) · 🇮🇩 [id](../../../id/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [ig](../../../ig/docs/guides/CUSTOM_JSON_API.md) · 🇯🇵 [ja](../../../ja/docs/guides/CUSTOM_JSON_API.md) · 🇬🇪 [ka](../../../ka/docs/guides/CUSTOM_JSON_API.md) · 🇰🇭 [km](../../../km/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [kn](../../../kn/docs/guides/CUSTOM_JSON_API.md) · 🇰🇷 [ko](../../../ko/docs/guides/CUSTOM_JSON_API.md) · 🇱🇹 [lt](../../../lt/docs/guides/CUSTOM_JSON_API.md) · 🇱🇻 [lv](../../../lv/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ml](../../../ml/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [mr](../../../mr/docs/guides/CUSTOM_JSON_API.md) · 🇲🇾 [ms](../../../ms/docs/guides/CUSTOM_JSON_API.md) · 🇲🇹 [mt](../../../mt/docs/guides/CUSTOM_JSON_API.md) · 🇲🇲 [my](../../../my/docs/guides/CUSTOM_JSON_API.md) · 🇳🇵 [ne](../../../ne/docs/guides/CUSTOM_JSON_API.md) · 🇳🇱 [nl](../../../nl/docs/guides/CUSTOM_JSON_API.md) · 🇳🇴 [no](../../../no/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [or](../../../or/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [pa](../../../pa/docs/guides/CUSTOM_JSON_API.md) · 🇵🇭 [phi](../../../phi/docs/guides/CUSTOM_JSON_API.md) · 🇵🇱 [pl](../../../pl/docs/guides/CUSTOM_JSON_API.md) · 🇵🇹 [pt](../../../pt/docs/guides/CUSTOM_JSON_API.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CUSTOM_JSON_API.md) · 🇷🇴 [ro](../../../ro/docs/guides/CUSTOM_JSON_API.md) · 🇷🇺 [ru](../../../ru/docs/guides/CUSTOM_JSON_API.md) · 🇱🇰 [si](../../../si/docs/guides/CUSTOM_JSON_API.md) · 🇸🇰 [sk](../../../sk/docs/guides/CUSTOM_JSON_API.md) · 🇸🇮 [sl](../../../sl/docs/guides/CUSTOM_JSON_API.md) · 🇷🇸 [sr](../../../sr/docs/guides/CUSTOM_JSON_API.md) · 🇸🇪 [sv](../../../sv/docs/guides/CUSTOM_JSON_API.md) · 🇰🇪 [sw](../../../sw/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [ta](../../../ta/docs/guides/CUSTOM_JSON_API.md) · 🇮🇳 [te](../../../te/docs/guides/CUSTOM_JSON_API.md) · 🇹🇭 [th](../../../th/docs/guides/CUSTOM_JSON_API.md) · 🇹🇷 [tr](../../../tr/docs/guides/CUSTOM_JSON_API.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CUSTOM_JSON_API.md) · 🇵🇰 [ur](../../../ur/docs/guides/CUSTOM_JSON_API.md) · 🇺🇿 [uz](../../../uz/docs/guides/CUSTOM_JSON_API.md) · 🇻🇳 [vi](../../../vi/docs/guides/CUSTOM_JSON_API.md) · 🇳🇬 [yo](../../../yo/docs/guides/CUSTOM_JSON_API.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CUSTOM_JSON_API.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CUSTOM_JSON_API.md)

---

Un nodo JSON API personalizzato collega un endpoint aziendale JSON che non parla il protocollo OpenAI o Anthropic. OmniRoute riempie un modello di richiesta JSON, lo invia all'endpoint completo URL, legge la risposta da un percorso di risposta e la restituisce al client nel formato del client (Completamenti chat, Risposte, Messaggi, ...).

È un nodo compatibile con OpenAI con `apiType: "custom-json"`; il suo ID ha la forma `openai-compatible-custom-json-<suffix>`. Il modulo dashboard non è ancora disponibile. Crea e modifica questi nodi tramite il nodo provider API riportato di seguito.

## Crea un nodo

`POST /api/provider-nodes` (autorizzazione di gestione):

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

- `baseUrl` è il** completare** punto finale URL. Non viene aggiunto nulla (no `/chat/completions`, no `/models`) e, a differenza di altri nodi compatibili con OpenAI, non esiste URL predefinito. Deve essere `http(s)`, senza credenziali incorporate o `#fragment`, e passa la stessa guardia URL in uscita di ogni nodo del provider, sia quando il nodo viene salvato che ad ogni richiesta.
- Un nodo che invia la chiave di connessione (`authType` `bearer` o `api-key`, inclusa quella predefinita) deve utilizzare `https://`. `http://` semplice è accettato solo per un host di loopback (`localhost`, `127.0.0.0/8`, `::1`) o con `authType: "none"`, che non invia alcuna chiave. Gli indirizzi LAN privati (`10.x`, `172.16-31.x`, `192.168.x`) non sono esenti: chiunque su quella rete potrebbe leggere la chiave. Il salvataggio di un nodo di questo tipo fallisce con `400` e un nodo memorizzato in precedenza non riesce a chiudersi su ogni richiesta con lo stesso messaggio, prima che venga inviata qualsiasi richiesta. Per un endpoint con chiave su LAN, inseriscilo dietro TLS (ad esempio un proxy inverso).
- `customJson` è convalidato con Zod; le chiavi sconosciute vengono rifiutate. Ogni campo è facoltativo:

| Campo             | Valori                                             | Predefinito                                            |
| ----------------- | -------------------------------------------------- | ------------------------------------------------------ |
| `method`          | `POST`, `PUT`, `PATCH`                             | `POST`                                                 |
| `authType`        | `bearer`, `api-key`, `none`                        | `bearer`                                               |
| `authHeader`      | nome dell'intestazione utilizzato quando `api-key` | `X-API-Key`                                            |
| `requestTemplate` | oggetto JSON (≤ 64 KB, profondità ≤ 32)            | `{ "model": "{{model}}", "messages": "{{messages}}" }` |
| `responsePath`    | percorso di campo, o `$` per tutto il corpo        | `choices[0].message.content`                           |

- Il segreto rimane nella chiave API della connessione, mai nel modello. `bearer` invia `Authorization: Bearer <key>`; `api-key` invia `<authHeader>: <key>`. L'intestazione auth non può essere `Host`, `Content-Type`, `Content-Length`, `Connection`, `Transfer-Encoding`, `Authorization`, `Cookie` o un'intestazione hop-by-hop. Con `none`, le connessioni non necessitano di chiave.
- Le intestazioni statiche aggiuntive utilizzano la `customHeaders` regolare del nodo (stessa convalida di ogni altro nodo compatibile; le intestazioni di autenticazione non sono consentite lì).

`PUT /api/provider-nodes/<id>` accetta lo stesso `customJson` e riscrive `baseUrl` e la configurazione su ogni connessione esistente del nodo. Omettendo `customJson` si mantiene la configurazione memorizzata; il passaggio `apiType` a `chat` o `responses` lo rimuove dal nodo e dalle sue connessioni.

Quindi aggiungi una connessione al nodo come al solito (`POST /api/providers` con l'id del nodo) e richiedi `<prefix>/<model>`, ad esempio `biz/assistant-v1`. L'endpoint non espone alcun elenco di modelli, quindi aggiungi manualmente gli ID del modello.

## Richiedi modelli

I modelli sono semplici JSON. Un valore stringa può contenere marcatori `{{placeholder}}` ; nulla viene valutato o eseguito e le chiavi degli oggetti non vengono mai sostituite.

| Segnaposto           | Valore                                                                       |
| -------------------- | ---------------------------------------------------------------------------- |
| `{{prompt}}`         | Testo dell'ultimo messaggio utente (parti di testo unite con ritorni a capo) |
| `{{messages}}`       | La conversazione in formato chat OpenAI                                      |
| `{{model}}`          | L'ID del modello richiesto, senza il prefisso del provider                   |
| `{{stream}}`         | Sempre `false` — l'endpoint risponde con un documento JSON                   |
| `{{request.<path>}}` | Un campo della richiesta tradotta (formato chat OpenAI ).                    |

- Un valore che è esattamente un segnaposto mantiene il suo tipo JSON (`"{{messages}}"` diventa un array); un segnaposto all'interno di una stringa più lunga viene inserito come testo.
- Un segnaposto che non risolve nulla fallisce la richiesta con HTTP 400 invece di inviare un payload incompleto.
- I percorsi utilizzano la notazione punto e gli indici numerici (`data.items[0].text`). `__proto__`, `prototype` e `constructor` vengono rifiutati nelle chiavi e nei percorsi.

## Risposte

Il valore in `responsePath` diventa la risposta dell'assistente: le stringhe passano, gli altri valori JSON vengono serializzati. Un campo mancante o `null` oppure un corpo che non è JSON restituisce HTTP 502. Vengono trasmessi gli stati di errore upstream. Per i client di streaming OmniRoute attende l'intera risposta JSON e quindi la emette come un blocco di contenuto più il blocco di finitura; questo non è uno streaming di token. Le chiamate degli strumenti e i campi di utilizzo non sono mappati.

## Mai riprodotto

Una richiesta commerciale può avere effetti collaterali anche quando fallisce. OmniRoute quindi lo invia una volta:

- nessun tentativo di trasporto e nessun reindirizzamento successivo;
- nessun tentativo su un'altra connessione (fallback dell'account) — l'errore viene restituito così com'è e la connessione non viene raffreddata;
- nessun fallback al successivo bersaglio della combo, anche per una risposta vuota o fallita.

Le richieste client separate e i pannelli di fusione che richiamano esplicitamente diversi modelli richiamano comunque l'endpoint in modo indipendente.

## Testare un nodo

Salvataggio di una connessione, la connessione** Test** i pulsanti e i controlli di integrità in background non chiamano mai l'endpoint: convalidano solo la configurazione archiviata e segnalano la connessione come non verificabile.

`POST /api/provider-nodes/validate` con `"apiType": "custom-json"` e i campi del nodo (`baseUrl`, `apiKey`, `customJson`, `customHeaders` e `modelId` opzionali ) invia esattamente una richiesta reale, con `ping` come ultimo testo utente. Risponde `{ "valid": true }` o allo stato a monte (mai al corpo a monte).

## Magazzinaggio

La configurazione viene archiviata in `provider_nodes.custom_json_config_json` (migrazione `240_provider_node_custom_json_config.sql`) e copiata in `providerSpecificData.customJson` di ciascuna connessione.

Implementazione: `open-sse/utils/customJson.ts` (convalida e modello), `open-sse/executors/customJson.ts` (esecutore), `open-sse/services/combo/noReplayLatch.ts` e `src/sse/handlers/chat/responsePolicies.ts` (no-replay).
