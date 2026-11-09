# Guardrails (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Izvor istine:** `src/lib/guardrails/`
> **Zadnje ažurirano:** 2026-10-17 — v3.8.52 (dodano [Pokrivenost i ograničenja](#coverage-and-limits):
> koje rute i putanje odgovora hookovi dosežu, spojena zaglavlja za onemogućavanje (#16412),
> način blokiranja injekcije kao obavezna granica (#16413) i što vidi odgovor prije post-call)

Guardrails provode sigurnosne, pravilne i sadržajne transformacije na granici
između OmniRoutea i upstream pružatelja usluga. Svaki guardrail može pregledati
(i po potrebi odbiti, transformirati ili anotirati) korisne podatke zahtjeva
(`preCall`) i upstream odgovore (`postCall`).

Sustav je **fail-open**: ako guardrail tijekom izvođenja baci pogrešku, registar
zabilježi pogrešku i nastavlja sa sljedećim guardrailom umjesto da zahtjev ne
uspije. Blokiranje je izričita odluka (`block: true`), nikad slučajnost.
Jedina iznimka je prekinuti zahtjev: kada se `signal` pozivatelja prekine,
guardrail koji baci pogrešku odbija izvođenje hooka umjesto da bude preskočen.

Hookovi se **ne** izvode na svakoj ruti ni za svaki odgovor. Pročitajte
[Pokrivenost i ograničenja](#coverage-and-limits) prije nego što se oslonite na
guardrail kao sigurnosnu kontrolu.

## Ugrađeni guardraili

Registar pri uvozu automatski učitava šest guardraila poredanih po prioritetu
(vidi `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Naziv               | Faza(e)        | Datoteka              |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Guardrails s nižim brojevima prioriteta izvode se **prvi**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Osnovni model GLM 5.3 i `glm-5.3-{low,high,max}` imaju eksplicitne `supportsVision:false` registry/spec metapodatke. Varijante GLM 5.3 Flash ostaju izvorni modeli. `/v1/messages` ruta Claude Code-a ulazi u zajednički lanac zaštitne ograde `handleChat` prije poziva** prije** Claude-to-OpenAI prijevod; ugniježđene `Read` slike rezultata alata moraju se opisati ili obraditi prije nego što ih taj prijevod podigne u OpenAI `image_url` sadržaj (#17069).

Presreće zahtjeve koji nose sliku usmjerene na** nevizijski modeli** i ili preusmjerava cijeli zahtjev na model sposoban za vid ili zamjenjuje dijelove slike tekstualnim opisima koje proizvodi konfigurabilni model vida prije uzvodnog poziva. To pružateljima samo tekstualnih usluga omogućuje transparentno rukovanje multimodalnim teretom.

Protok:

1. Preskočite ako ciljni model već podržava vid (osim ako se ne pojavljuje na popisu prisilnih mostova `isVisionBridgeForcedModel`).
2. Izdvojite dijelove slike putem `extractImageParts(messages)` (`visionBridgeHelpers.ts`), koji delegira na** objedinjeni detektor medija** `detectMediaParts()` u `open-sse/utils/mediaParts.ts` — jedini izvor istine koji se dijeli s kombiniranim filtrom kompatibilnosti. Ekstrakcija je na popisu dopuštenih za oblike koje `replaceImageParts` može spojiti natrag (izvadak ↔ zamjenjuje ugovor): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` i odgovori API `input_image`. Odgovarajuće slike ugniježđene unutar Claude koda `tool_result.content` i izlaza alata Responses također se izdvajaju i zamjenjuju na svojim izvornim stazama; oblici samo za indikatore su kombinirani filtarski materijal i ne izvlače se. Preskoči ako ništa nije pronađeno.
3. Riješite runtime config putem `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): novi `modalityBridge*` ključevi postavki pobjeđuju; naslijeđeni `visionBridge*` ključevi ostaju a** jednociklični povrat** (prozor povratka). Preskoči prije bilo kakvog prolaska medija kada je most onemogućen.
4. Selektor načina rada (`modalityBridgeVisionMode`, vidi tablicu u nastavku) odlučuje o preusmjeravanju u odnosu na opis. Reroute vraća `modifiedPayload` sa samo `model` zamijenjenim, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Opišite put: ograničite slike na `maxImages`, sastavite prompt s obzirom na zadatak, pogledajte predmemoriju opisa, pozovite model vizije** paralelno** (`Promise.allSettled`), i umetnuti `[Image N]: <description>` dijelove teksta na njihovo mjesto. Neuspješan opis daje `null`: neobrađena slika je sačuvana za unknown/vision-capable ciljeve (#4012), ali** potvrđeni izravni cilj samo za tekst** ili zero-vision combo dobiva eksplicitni `(unavailable — no vision-capable provider connected)` tekstualni završetak za svaku neopisanu sliku, uključujući djelomične kvarove i slike izvan ograničenja opisa poziva (#17069). Postojeća potpuno neuspjela kombinacija opisuje zamjenu ostaje na mjestu (#8430).
6. Vrati `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Izbornik načina rada (`modalityBridgeVisionMode`)

| Način rada | Zadano | Ponašanje                                                                                                                                                                                                                                                                                  |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔      | Naslijeđena heuristika, netaknuta (#6640/#7204): nekombinirani/`auto/` modeli preusmjeravaju se na najbolji model vizije osim ako originalni model već ima upotrebljive vjerodajnice (zatim opišite); kombinirani ciljevi uvijek opisuju.                                                  |
| `describe` |        | Uvijek opišite — blok preusmjeravanja se u potpunosti preskače; uvijek odgovara odabrani model korisnika.                                                                                                                                                                                  |
| `reroute`  |        | Prisilno preusmjeravanje: čuvar modela s vjerodajnicama je zaobiđen. Preusmjeravanje -** cilj** credential guard i dalje primjenjuje — kada ne postoji upotrebljiva meta vida, most blokira s jasnom pogreškom umjesto da opisuje ili šalje neobrađene slike cilju koji sadrži samo tekst. |

Prisilni modovi kratkog spoja** prije** automatska heuristika radi; `auto` ponašanje je bajt-identično pre-PR-1 zaštitnoj ogradi.

#### Opseg API ključa (`visionBridgeKeyScope.ts`)

Kada pozivateljev ključ API ograničava `allowedConnections`, skupove kvota (`allowedQuotas`) ili modele (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), most odabire samo preusmjeravanje i opisuje modele koje ključ može koristiti, na vezama koje ključ može koristiti. Poziv describe tada uvijek prolazi kroz samostalnu petlju OmniRoute sa zaglavljem `x-omniroute-self-loop-key-id`, tako da zahtjev za primanje chata ponovno nameće vezu tog ključa i politiku modela. `enforceApiKeyPolicy()` poštuje to zaglavlje samo zajedno s nositeljem samo-petlje, tako da može samo suziti pristup, a ID koji se ne razriješi se odbija.

Ako za ključ nije dopušten nikakav vizualni model, a** potvrđeni cilj samo za tekst** odbija zahtjev za slikom lokalno s jasnim HTTP 400 umjesto prosljeđivanja bajtova slike nesposobnom uzvodnom (#17069). Za ciljeve s nepoznatim ili izvornim vidom, put opisa zadržava svoje prethodno ponašanje pri otvaranju (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Zahtjevi bez ključa i ključevi bez ovih ograničenja ponašaju se točno kao prije.

#### Upit za opis s obzirom na zadatak (`modalityBridgeVisionTaskAware`)

Zadano** pravi** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) dodaje tekst** zadnja poruka korisnika** (skraćeno na 500 znakova) na odzivnik za osnovni opis, usmjeravajući opis prema onome što je korisnik zapravo tražio (model codex-vision-proxy) i tražeći od modela vida da transkribira vidljivi tekst. Uz isključenu zastavicu — ili bez korisničkog teksta — osnovni odzivnik koristi se nepromijenjen.

Vlastiti OpenAI-kompatibilan zahtjev samopetlje opisa (`callVisionModelSingle()` u `visionBridgeHelpers.ts`) uvijek zahtijeva `image_url.detail: "high"` — bezuvjetno, za svaki caller/provider, bez ulaza na bilo koji signal klijenta. Uzorkovanje s malo detalja degradira točnost OCR točno za zadatak transkripcije teksta koji ovaj upit traži, tako da sam poziv za opis uvijek traži visoke detalje bez obzira na to koju je razinu detalja koristio izvorni ulazni zahtjev. Ovo utječe samo na unutarnje tijelo zahtjeva opisa; ne mijenja način na koji OmniRoute prosljeđuje vlastiti `image_url.detail` pozivatelja na primarni zahtjev — koji se zadani primjenjuje zasebno, i samo za otkrivene OpenCode klijente, u `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Grana Anthropic formata žice opisa samopetlje nema polje `detail` i na nju ne utječe nijedna zadana vrijednost.

#### Opišite ograničenje izlaza (`modalityBridgeVisionMaxChars`)

| Ključ                          | Zadano | Raspon            |
| ------------------------------ | ------ | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` ili 100–50000 |

`0` (zadano) znači** bez kape** — opis koji vraća `callVisionModel()` prolazi neizmijenjen, čuvajući postojeće ponašanje. Bilo koja vrijednost u rasponu od 100–50000 skraćuje opis sufiksom `…` prije nego što se ponovno spoji kao `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` u `src/lib/guardrails/visionBridge.ts`). Podignite ovo za OCR zadatke s velikim brojem detalja gdje nizvodni model treba punu transkripciju; spustite ga na korištenje vezanog tokena na modelima brbljave vizije. Polje nadzorne ploče nalazi se na naprednoj ploči kartice Vizija (`modality-bridge-max-chars` u `ModalityBridgeVisionTab.tsx`) i spaja bilo koju vrijednost između 1 i 99 do 100 kata dok eksplicitni `0` ostavlja netaknutim — `0` je važeća Zod vrijednost sama po sebi (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), a ne samo "poništena" zadana vrijednost.

#### Opišite predmemoriju (`modalityBridge/bridgeCache.ts`)

U memoriji LRU + TTL predmemorija za opisivanje izlaza, dijeljenih za cijeli proces. Ključ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s uokvirivanjem prefiksa duljine (bez kolizija granica polja). Komponenta modela je** konfiguriran** bridge model, a ne model koji je stvarno odgovorio — `callVisionModel` može se interno vratiti, a ključanje po pokušaju bi fragmentiralo predmemoriju. Neuspjeli opisi nikada se ne pohranjuju u predmemoriju. postavke:

| Ključ                           | Zadano | Raspon  |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Daljinska normalizacija slike ( describe/base64 dohvaćanje samostalne petlje)

Kad most dohvati a** daljinski** sama slika — Anthropic opisuje self-call i claude-wire-format base64 pretvorbu (`ensureBase64ImagesForClaudeWire`), oba putem `fetchRemoteImageAsDataUri()` u `visionBridgeHelpers.ts` — rezultirajući podaci URI prolaze kroz `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) prije nego što se ugrade u zahtjev za model vizije. Predimenzionirane slike smanjene su na a** 2048px dugi rub** (podudaranje ograničenja veličine OpenAI/Anthropic već se primjenjuje na strani poslužitelja), što smanjuje učitavanje bytes/latency bez mijenjanja onoga što model vizije vidi. Promjena veličine koristi `sharp`, učitava se putem dinamičkog uvoza: na platformi na kojoj se izvorna binarna datoteka ne uspijeva učitati, `normalizeDataUri()`** nikada ne baca** — vraća se na prolaz izvornih bajtova, tako da describe/base64-conversion staza uvijek nastavlja raditi. Bajtovi koji nisu slike (dohvaćanje koje nije vratilo sliku koja se može dekodirati) također se prolaze nedirnuti. Ova normalizacija se odnosi na slike koje most dohvaća za vlastiti samopoziv — i nikada se ne primjenjuje na pozivateljev neobrađeni prolazni korisni teret, u skladu s načelom mutacije samo za uključivanje (tvrdo pravilo #20).

#### Migracija sheme postavki +

Novi `modalityBridge*` ključevi potvrđeni su u Zod-u u `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` trio i `modalityBridgeAudio*` grupa koju koristi Audio Bridge. Migracijski `141_modality_bridge_settings.sql` kopira postojeće naslijeđene `visionBridge*` vrijednosti u odgovarajuće nove ključeve (idempotentan, nikad ne prepisuje `modalityBridge*` vrijednost koju je postavio operator); naslijeđeni ključevi ostaju prihvaćeni kao zamjena za čitanje za jedan ciklus izdavanja.

#### Zaglavlje transparentnosti + statistika

Opisi transformirani odgovori nose `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (sagradio `buildModalityBridgeHeader()` u `modalityBridge/bridgeStats.ts`, žigosao `withModalityBridgeHeader()` u `src/sse/handlers/chatHelpers.ts`). Preusmjereni zahtjevi dobivaju** Ne** zaglavlje — korisni teret je bio netaknut i zamjena modela je već vidljiva u `model` polju tijela odgovora.

`GET /api/modality-bridge/stats` (autorizacija upravljanja, ista razina kao `GET /api/settings`) vraća brojače u memoriji po modalitetu `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio` i `video`. `averageLatencyMs` koristi `latencySamples`, ne sve pokušaje, kao svoj nazivnik; operacija bez mjerenja vremena ne proizvodi uzorak od nula milisekundi. `bridged` ostaje unatrag kompatibilan alias za uspješne konverzije; neuspjeli pokušaji ga ne povećavaju. Brojači se poništavaju pri ponovnom pokretanju procesa prema dizajnu (telemetrija, ne računovodstvo).

#### Konfiguracija nadzorne ploče

Stranica posvećena nadzornoj ploči je `/dashboard/settings/modality-bridge`. Njegove kartice `Vision`, `Audio` i `Video` koje se mogu adresirati na URL čuvaju parametre upita dok mijenjaju `tab` vrijednost. Kartica Vision izlaže mogućnost, način rada, odabir modela (uključujući automatsku zadanu postavku), upite s obzirom na zadatak, napredna ograničenja timeout/image/description-length/cache, brojače vremena izvođenja i zahtjev za čuvani uzorak. Kartica Audio također je aktivna: prikazuje mogućnost, birač modela samo za STT s Automatskim, timeout/max-clip ograničenja, brojače zvuka i test uzorka `input_audio`. Kartica Video je funkcionalna: izvješćuje o stanju FFmpeg/ffprobe vremena izvođenja — jedno od četiri eksplicitna UI stanja (`unknown` dok je sonda u tijeku ili se ne može dovršiti, `restricted` na hostu nadzorne ploče bez povratne petlje gdje je sonda preskočena na strani klijenta, `unavailable` jednom ispitan i potvrđeno da nedostaje, ili `available` s FFmpeg/ffprobe verzijama) — nastavlja enable/model/frame/video/timeout ograničenja, filtrira birač modela na modeli sposobni za vid, i izlaže video brojače.

Bivša kartica Vision Bridge pod AI postavkama poveznica je kompatibilnosti s novom stranicom; više ne posjeduje drugu kopiju obrasca. Media Providers također povezuje tijekove rada Image-to-Text i Speech-to-Text s odgovarajućim karticama Modality Bridge bez uklanjanja postojećeg igrališta Speech-to-Text.

**Premosnica ulaza u samostalnu petlju:** kada describe poziv usmjerava kroz OmniRoute-inu vlastitu `/v1` samopetlju (model nestandardnog davatelja), podzahtjev šalje `x-omniroute-admission-bypass: internal` i autentificira se s razriješenom vjerodajnicom samopetlje — lokalnim `sk_omniroute` stražarom u lokalnom načinu rada ili `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env ključem (#1350) konfiguriranim od strane operatera tako da `REQUIRE_API_KEY=true` implementacije i dalje mogu pokrenuti opisni poziv. Premosnica se poštuje samo za te točne vjerodajnice, tako da vanjski klijenti ne mogu koristiti zaglavlje za preskakanje pristupa.

Naslijeđene zadane postavke žive u `src/shared/constants/visionBridgeDefaults.ts`; nove mode/task-aware/cache zadane postavke i razrješivač postavki žive u `src/shared/constants/modalityBridgeDefaults.ts`. Zaštitna ograda otkriva opciju `deps` konstruktora tako da testovi mogu ubaciti lažne `getSettings` i `callVisionModel` implementacije.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Presreće chat zahtjeve s audio sadržajem prije nego što stignu do cilja za koji nije poznato da prihvaća audio ulaz. Nikad ne preusmjerava chat zahtjev: audio dijelovi transkribiraju se putem postojeće OpenAI-kompatibilne multipart krajnje točke, a odabrani chat model nastavlja s tekstualnim transkriptima.

Tijek:

1. Razriješi `supportsAudio` putem `getResolvedModelCapabilities()`. Eksplicitni
   metapodaci registra pružatelja imaju prednost, zatim statički metapodaci
   modela, zatim sinkronizirani `modalities_input`. Deklarirani popis ulaza bez
   `audio` daje `false`; bez dokaza o mogućnostima ostaje `null`. I `false` i
   `null` aktiviraju konzervativni most, dok ga `true` zaobilazi.
2. Razriješi postavke `modalityBridgeAudio*` i izdvoji spojive audio dijelove
   najviše razine iz svake poruke putem zajedničkog detektora
   `detectMediaParts()`. Podržani mrežni oblici su OpenAI `input_audio`,
   `audio_url` i `source.media_type: "audio/*"`. Ugniježđeni zvuk detektira se
   radi usmjeravanja, ali ga putanja spajanja ne uklanja. Opseg rada ograničen
   je s `modalityBridgeAudioMaxClips`; kasniji dijelovi ostaju netaknuti.
3. Poštuj konfigurirani `provider/model`, ili dopusti da
   `selectAudioBridgeModel()` prođe kroz `AUDIO_TRANSCRIPTION_PROVIDERS` u
   stabilnom redoslijedu kataloga i odabere prvi model s iskoristivom aktivnom
   vjerodajnicom pružatelja.
4. `callAudioTranscription()` pretvara base64/data-URI zvuk u multipart
   `file`, ili preuzima udaljeni `audio_url` kroz izlazni nadzor ograničen na
   javne adrese s DNS prikvačivanjem i granicom od 25 MB. Zatim šalje POST
   zahtjev s datotekom i odabranim modelom na lokalnu samopetlju
   `/v1/audio/transcriptions`, autentificiranu s `resolveSelfLoopBearer()`.
   Postojeća ruta transkripcije izvodi uobičajeno dohvaćanje vjerodajnica,
   rukovanje razdobljem hlađenja/ograničavanjem brzine i usmjeravanje prema
   pružatelju.
5. Uspješni pozivi zamjenjuju svoje dijelove s `[Audio N]: <transcript>`.
   Pozivi se izvode s `Promise.allSettled`: pojedinačni neuspjeh zadržava
   izvorni audio dio (ugovor #4012). Ako svi pozivi ne uspiju i za cilj je
   dokazano `supportsAudio === false`, dijelovi postaju
   `[Audio N]: (unavailable — no STT provider connected)` (ugovor #8430). Za
   nepoznati cilj (`null`), rezultat u kojem su svi pozivi neuspješni ostaje
   netaknut. Dokazani tekstualni cilj bez iskoristive STT vjerodajnice dobiva
   isti eksplicitni stub bez slanja mrežnog poziva.

Uspješni transkripti koriste LRU/TTL predmemoriju Modality Bridgea na razini
cijelog procesa. Ključ kombinira referencu na zvuk, stabilnu oznaku operacije
`audio-transcription` i odabrani STT model; neuspjesi se nikada ne
predmemoriraju. Pokušaji obrade zvuka ažuriraju zajedničke brojače `bridged`,
`cacheHits`, `failures` i `lastUsedAt`. Transformirani odgovori nose
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`;
netaknuti zahtjevi ne dobivaju segment Audio Bridgea.

Postavke tijekom izvođenja pohranjene su u bazi podataka i validirane Zodom:

| Ključ                         | Zadano  | Raspon                |
| ----------------------------- | ------- | --------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                     |
| `modalityBridgeAudioModel`    | `""`    | Automatski ili STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000           |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                  |

Zajedničkom predmemorijom i dalje upravljaju `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` i `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Presreće video dijelove najviše razine u dovršecima razgovora `messages` i odgovorima API `input` prije pozivanja cilja bez poznate izvorne video podrške. Podržani oblici su `input_video`, `video_url`, `video_source`, HTTPS URLs i `data:video/*;base64,...` podaci URIs. Obični nazivi datoteka u tekstu ne tretiraju se kao video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) posjeduje prolazak zahtjeva, capability/policy provjeru, agregaciju po zahtjevu i korisni teret odgovora. — akvizicija rada po video zapisu, predmemorija cijelog rezultata, koja opisuje sekvencu okvira (koja spaja bilo koji audio transkript koji je deklarirao pozivatelj) i po pokušaju metrics/abort/cleanup — je skriven iza `processVideoPart` u `videoBridgePipeline.ts`, poziva se jednom po video dijelu unutar `preCall` petlje. Taj modul također definira eksplicitne granice priključaka `VideoMediaBrokerPort` (prikupljanje bajtova i izdvajanje uzorkovanih okvira), `VideoAudioTranscriptionPort` (spajanje zvučnog transkripta koji je deklarirao pozivatelj s uzorkovanim opisima) i `VideoDrilldownPort` (naslijeđeni oblik sirove pohrane). Proizvodnja STT i zadržavanje okvira sastavljeni su oko priključka za opis kroz `createVideoSttAdapter` i `createVideoDrilldownAdapter`; potonji koristi zajednički životni ciklus opaque-handle.

Javni `/v1` put zahtjeva nikada ne uvozi niti poziva podproces. Udaljeni video zapisi preuzimaju se ispod granice od 50 MiB ; ugrađeni base64 video zapisi imaju konzervativno ograničenje od 36 MiB dekodiranih po video zapisu tako da model/messages/framing omotnica može ostati unutar ograničenja pristupa javnog JSON zahtjeva od 50 MiB. Umetnuta duljina i procjene dekodirane veličine provjeravaju se prije dodjele. HTTPS je potreban na početnom udaljenom URL u i svakom preusmjeravanju, korištenjem postojećeg javnog samo izlaznog čuvara sa DNS pričvršćivanjem. Bajtovi zatim prelaze točnu internu granicu `POST /api/modality-bridge/video/extract` posrednika. Ta ruta je i `LOCAL_ONLY` i `SPAWN_CAPABLE`, prihvaća samo zahtjev provjerene autentičnosti po procesu, pouzdane povratne petlje, i nikada ne prihvaća URL, stazu datotečnog sustava, izvršnu datoteku ili popis argumenata. API cjevovod veličine tijela i inkrementalni čitač tijela rukovatelja neovisno provode ograničenje unosa posrednika od 50 MiB. Njegov ograničeni red čekanja pokreće jedno po jedno izdvajanje, dopušta četiri posla na čekanju i ograničava unos na čekanju na 100 MiB.

Unutar brokera, `ffprobe` čita privatnu lokalnu datoteku; popis dopuštenih fiksnih formata isključuje formate popisa za reprodukciju i manifesta. Za dopuštene spremnike obitelji MOV, vanjske reference MOV podataka ostaju onemogućene prema zadanim postavkama, a fiksna naredba ne uključuje se u njih. I `ffprobe` i `ffmpeg` koriste popis dopuštenih protokola `file` -only, jednu nit, fiksne nizove argumenata, bez ljuske i izvršne datoteke razriješene iz `PATH`. Streamovi naslovnica s priloženim slikama nisu kandidati za reprodukciju. Svi streamovi koji se mogu reproducirati moraju zadovoljiti ograničenja, a prednost se daje eksplicitnom zadanom streamu prije determinističkog zamjenskog indeksa s najnižim indeksom. Videozapisi su ograničeni na 600 sekundi, 8.192 piksela po dimenziji i 33.554.432 izvornih piksela. FFmpeg uzorkuje 1–16 središnjih JPEG okvira, smanjuje dugi rub do najviše 1024 piksela bez povećanja manjih ulaza i nikada ne prima URL. Uzorkovanje je `uniform` prema zadanim postavkama. Opcijska `scene_aware` i eksperimentalna `segment_aware` pravila izvode jedan dodatni fiksni FFmpeg prolaz preko već validiranog lokalnog toka, odabiru ograničene vremenske oznake `showinfo` scene i deterministički se vraćaju na iste uniformne srednje točke u slučaju kvara detektora, vremenskog ograničenja, pogrešnog izlaza ili praznog skupa kandidata. Način rada koji je svjestan segmenta dodjeljuje uzorke sredine proporcionalno potvrđenim intervalima scene; dokazi svjesni segmenta i rezervno ponašanje detaljno su navedeni u nastavku. Čvrsto ograničenje od 16 okvira primjenjuje se nakon odabira u svakoj politici. Kada zahtjev s obzirom na scenu ima samo proračun za jedan okvir, on koristi jedinstvenu središnju točku aktivnog cijelog videa ili fokusnog prozora i izvještava `policyEffective: uniform`: jedan odabrani okvir scene ne može sačuvati oba vremenska kraja. Pozivatelj može po izboru pružiti konačni fokusni prozor (`start`/`end` sekundi); granice su ograničene na trajanje medija, obrnuti ili ne-konačni prozori se odbijaju, a sve politike uzorkovanja izvode se samo unutar normaliziranog intervala. Rezultirajući prozor uključen je u metapodatke uzorkovanja i u nepouzdani prefiks opisa tako da modeli koji slijede mogu razlikovati fokusirani izvadak od pune vremenske trake.

Fokus semantičkog opisa je zasebna, eksplicitna postavka. Zadani način `full` analize čuva postojeći upit okvira i nikada ne prosljeđuje tekst zahtjeva modelu opisa. U načinu rada `focused`, most čita samo najnoviji neprazni `text`/`input_text` koji je autor korisnika iz istog spremnika za razgovor ili odgovore, normalizira ga na NFC, sažima kontrolne znakove i razmake i ograničava na 500 Unicode kodnih točaka. Prazan rezultat vraća se na točan `full` upit. Upotrebljivi savjet je serijaliziran kao JSON u namjenskom bloku konteksta nepouzdanog korisnika i može dati prioritet samo vidljivim detaljima; ne može poništiti zasebno upozorenje protiv slijeđenja uputa vidljivo ili zvučno u medijima. Tekstualni fokus nikada ne zaključuje `start`/`end` niti mijenja vremenski uzorkivač.

#### FU-07 strukturni segmentni dokaz

`segment_aware` koristi jedan ograničeni prolaz prije analize preko već potvrđenog lokalnog video streama. Fiksni lanac filtara najprije skalira na najviše 320 piksela u širinu, detektira promjene scene i zamrznute intervale, a zatim uzorkuje pri 1 sličici u sekundi za informacije o zamućenju, prosječnom svjetlu i spatial/temporal. Prolaz je ograničen na 600 strukturnih uzoraka, jednu FFmpeg/filter nit, isti `file` -only protokol i popise dopuštenih spremnika, 1 MiB granicu izlaza procesa i najviše 30 sekundi unutar brokerovog dijeljenog abort/deadline. Nikada ne prihvaća naredbu, filtar, putanju ili URL iz zahtjeva.

Strukturne vrijednosti su dokaz determinističkog uzorkovanja, a ne razumijevanje semantičkog videa. Oni ne zaključuju subjekte, radnje, opise, govor ili namjere korisnika. Granice scene i zamrzavanja čine segmente; zamrzavanje pokrivenosti, zamućenja, ekspozicije, prostornih detalja i vremenske promjene utječu samo na to kako se raspoređuje postojeći proračun od 1 do 16 okvira. Potpuno zamrznuti segment ograničen je na jedan okvir, dok se nezamrznuti segmenti natječu za preostali proračun. Kada granice nadmašuju broj okvira, zadržava se jednolika pokrivenost vremenske trake tako da brzi rani rezovi ne mogu sakriti dugi segment na kraju. Granice scene unutar rezolucije analize od 1 sekunde granice zamrzavanja se spajaju.

Filtri koji nedostaju, malformed/empty dokazi, pogreška detektora ili ograničeno vremensko ograničenje predanalize ne otvaraju točnu jedinstvenu politiku srednje točke. Rok prekida pozivatelja ili brokera ne otvara se neuspješno: prekida podproces u tijeku, sprječava kasnije izdvajanje okvira, a privatno privremeno stablo se uklanja u `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generira determinističke stvarne FFmpeg fixture za post-dedup caption-call uštede, dense-motion proračunsku alokaciju, blur/exposure/SI-TI dokaze, brze rezove s dugim repom i postupno blijeđenje lažno pozitivnih rezultata. Bilježi vrijeme zida prije analize i, gdje je `/usr/bin/time` dostupan, dijete CPU i vrh RSS. Njegove provjere kvalitete samo su strukturne proročanstva. Prava kvaliteta modela titlova ostaje `HOLD` jer ovaj svežanj nema ovlaštenu krajnju točku ili zamrznutog suca. Novčane uštede također ostaju `HOLD` osim ako `--caption-cost-per-call-usd` ne dostavi eksplicitnu pozitivnu procjenu po pozivu; skripta nikada ne izmišlja nijedan rezultat.

Svaki je okvir ograničen na 4 MiB, svi neobrađeni okviri zajedno na 23 MiB, a serijalizirani posrednički odgovor na 32 MiB. Privatni privremeni direktorij je uklonjen u `finally`. OmniRoute ne spaja FFmpeg i ne prihvaća prilagođeni izvršni put. Prije titlovanja, most primjenjuje konzervativnu propusnicu za vizualnu deduplikaciju: svaki JPEG smanjuje se na međuspremnik od 16 × 16 u sivim tonovima i uspoređuje se samo s posljednjim zadržanim okvirom. Za traženi proračun titlova iznad jednog okvira, izdvajanje daje ograničeni skup kandidata do dvostruko većeg proračuna i nikad više od 16 okvira. Zahtijevano ograničenje primjenjuje se samo nakon deduplikacije, pri čemu se prvi i posljednji odabrani kandidati čuvaju tijekom konačnog prorjeđivanja kada je proračun najmanje dva. Politika verzioniranog `grayscale-16x16-mean-cells-v2` koristi veću vrijednost od srednje luma delta i omjera sličica ćelija čija je normalizirana delta najmanje 0,05. Duplikat praga je konstanta 0,04, odabrana radi predvidljivosti, a ne izložena kao postavka vremena izvođenja. Ovaj sekundarni signal visokog kontrasta čuva male pokrete i vidljive promjene teksta koje usporedba samo srednje vrijednosti može sakriti. Pogreške komparatora ili dekodera ne mogu se otvoriti i zadržati pokrivenost. Izlazni metapodaci odvajaju ekstrahirane kandidate, uspješno iskorištene okvire i ispuštene vizualne duplikate.

Izričito označen video dio može zahtijevati kontaktni list s vremenskom oznakom. Most gradi najviše JPEG mrežu od 4 stupca i 16 okvira. Svaka ćelija od 512 piksela snima svoju izvornu vremensku oznaku u donji pojas visokog kontrasta, dok iste vremenske oznake ostaju u tekstualnim metapodacima za nizvodno povezivanje i reviziju. Kompletan JPEG ostaje ograničen na 32 MiB. Ako `sharp` ne može dekodirati ili sastaviti mrežu, most se vraća na pojedinačne JPEG okvire; klijentski prekid i dalje se širi kroz operaciju lista.

Dokazi o promicanju namjerno su odvojeni od mikrobenchmarka sintetičkog sastava. `scripts/perf/video-bridge-contact-sheet-eval.ts` definira A/B snop s verzijom sheme za stvarne OpenAI-kompatibilne modele vida. Mjeri tokene koje je prijavio pružatelj usluga, latenciju zida od kraja do kraja (uključujući sastav lista), broj poziva modela i zadržavanje činjenica definiranih manifestom. Neobrađeni odgovori modela ne upisuju se u izvješće; zadržavaju se samo SHA-256 sažetci i podudarna činjenica IDs. Kabelski svežanj ne upućuje mrežni ili plaćeni model poziva osim ako se ne prođe `--execute-real` i `--model`, `OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY` nisu konfigurirani. Bez tog eksplicitnog stvarnog pokretanja, njegova strojno čitljiva presuda ostaje `HOLD`; sintetička payload/call-count mjerenja sama po sebi nisu dokaz promocije.

Pozivatelji mogu priložiti izborno `transcript.cues` polje podržanom video dijelu kada već posjeduju poravnati tekst. Svaki znak mora sadržavati `text`, konačni interval `start`/`end` unutar ispitivanog trajanja, i `source` na popisu dopuštenih (`client`, `embedded` ili `audio-bridge`); `confidence` je zadana vrijednost `1` i mora ostati između `0` i `1`. Točni duplikati znakova su sažeti. OmniRoute nikada ne započinje transkripciju iz ovih metapodataka: potvrđeni znakovi kopiraju se u opisani rezultat s izvorom, pouzdanošću i intervalom te se prikazuju kao nepouzdana opažanja uz naslove okvira. Nevažeći tekst, tekst izvan raspona ili tekst bez porijekla odbija se umjesto da se miješa u tok opisa. Oba kanala prijepisa tijela zahtjeva normaliziraju isporučeno porijeklo na `client`, uključujući samopotvrđene `embedded` ili `audio-bridge` oznake. Samo adapter u vlasništvu poslužitelja može dodijeliti te pouzdane oznake kroz argument `trustedSource` samo koda; polje zahtjeva JSON ne može dosegnuti taj argument. Tekst prijepisa ostaje nepouzdan medijski sadržaj, bez obzira na njegovo podrijetlo, i nikada ne smije odrediti autorizaciju.

Napredni pozivatelj može dati `audioTranscript` zapis za isti video; tretira se kao tekst koji dostavlja klijent, a ne kao dokaz transkripcije poslužitelja. Fusion seam izvodi vizualna i audio promatranja pod jednim signalom roka i prekida, raspoređuje ih na zajedničkoj vremenskoj liniji, sažima točne duplikate i prijavljuje djelomični rezultat kada samo jedna strana uspije. Nevažeći `audioTranscript` degradira na taj djelomični rezultat — vizualni opis se zadržava, a audio grana bilježi dezinficirani kod greške — umjesto neuspjelog cijelog videa. Dostupnost po granama, djelomična zastavica i dezinficirani kodovi kvarova sačuvani su u opisanom rezultatu, u metapodacima zaštitne ograde (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), u metapodacima predmemorije rezultata i u brojačima fuzije mosta. Zadana staza Video Bridgea ne poziva govor u tekst niti preuzima drugu medijsku kopiju; bez te eksplicitne pjesme, ostaje samo video.

**Zadržavanje prijepisa (#12150 P1).** Ovo se primjenjuje automatski kad god Video Bridge (sam uključen) renderira prijepis cue — nema zasebne oznake zadržavanja. Kada zahtjev renderira bilo koji znak prijepisa ( `transcript` koji je deklarirao pozivatelj ili spojeni `audioTranscript`), zaštitna ograda ga označava `videoBridgeObserved` i proizvodi redigiranu sjenu opisa videozapisa — identično prikazivanje u kojem je tijelo slobodnog teksta svakog znaka zamijenjeno `[redacted-video-transcript]`, izgrađeno zamjenom polja strukturiranog znaka prije sastavljanja niza (nikada raščlanjivanjem spljoštenog teksta, tako da ne cue sadržaj — kontradiktoran ili običan, uključujući tijela koja sadrže `]` kao što su `[inaudible]`/`[music]` — mogu preživjeti). Stalno tijelo zahtjeva za dnevnik poziva mijenja svaki dio teksta izvedenog iz videa za tu redigiranu sjenu, usklađenu jednakošću sadržaja; `fullText` sidro se ponovno čita iz dovršenog korisnog opterećenja zaštitne ograde prije poziva, tako da podudaranje i dalje uspijeva nakon što kasnije lančane zaštitne ograde ( PII i maskeri vjerodajnica, prioriteti 10/95) prepisuju tekst opisa na mjesto i nakon ubacivanja system-prompt/handoff/memory preoblikuju niz poruka. Tijelo poslano uzvodno do modela je nepromijenjeno. Promatrani zahtjev također ne popunjava trajnu memoriju (i ekstrakcija izvedena iz zahtjeva i odgovora se preskače), tako da vlastiti odgovor modela ne može ponoviti tekst prijepisa u memoriju.

**Neobrađena video polja (#12430).** Kada je most omogućen, a izvorna video podrška je nepoznata ili odsutna, definirana polja `transcript`/`audioTranscript` također aktiviraju `videoBridgeObserved`, čak i nakon neuspjelog opisa ili ograničenja `maxVideos`. `null` i prazni nizovi broje; odsutna polja i ne-video metapodaci ne. Zadržane kopije redigiraju ova polja ili izostavljaju zahtjev, a caches/Memory se zaobilaze.

Na tim zamjenskim putovima valjani znakovi pozivatelja postaju podržani `text`/`input_text` dijelovi umjesto nestandardnih polja pružatelja usluga. Obje staze dostavljene zahtjevom ostaju nepouzdana `client` opažanja, s izričitim upozorenjem da video nije opisan i da vremenske oznake nisu provjerene u odnosu na medije. Postojeći ukupni 256-cue/64-KiB proračuni i proračuni po znakovima primjenjuju se na dvije staze zajedno; vremenske oznake moraju odgovarati brokerovoj gornjoj granici od 600 sekundi i bilo kojem isporučenom fokusnom prozoru. Nevažeći zapisi se odbacuju, ne prosljeđuju kao proizvoljni tekst; važeći brat ili sestra još uvijek se može koristiti osim ako njihov zajednički proračun nije premašen. Null/empty polja ne dodaju tekst. Ova zamjena ne dodaje nikakvo dohvaćanje medija ili transkripciju. Polja proširenja prijepisa uklanjaju se iz zamjenskog video nosača i njegovih `video_url`/`source` objekata. Popis dopuštenih OpenAI žica ostaje strog; nepoznati izvorni video nosači ostaju dostupni, a poznati samo tekstualni ciljevi čuvaju sigurne oznake. Strukturirane sjene redakcije štite priloženi tekst prijepisa, dok izvorni zahtjev u vlasništvu pozivatelja ostaje nepromijenjen. Nativno podržani ciljevi i onemogućeni mostovi zadržavaju svoje postojeće ponašanje zaobilaženja.

Dodatne zadržane kopije koriste isti signal promatranog zahtjeva. Neobrađena snimka zahtjeva klijenta prije zaštitne ograde, zahtjev na čekanju u memoriji i zapisnik ranog odbijenog zahtjeva strukturalno zamjenjuju polja transkripta u video dijelovima; upiti niza sintetizirani fazama cjevovoda i predaja konteksta se redigiraju na persisted-request-body sink. Trajni `video_content_removed` marker čini `previous_response_id` nastavak neuspješnim zatvaranjem umjesto da rekonstruira tekst koji je namjerno odbačen. Ako promatrani zahtjev izgubi svoju redigiranu sjenu po dijelu prije zapisivanja ili se čak jedna od nekoliko video sjenki ne uspije podudarati nakon kasnijih mutacija zahtjeva, zadržano tijelo zahtjeva potpuno se izostavlja umjesto zadržavanja djelomično redigiranog transkripta.

Za promatrani zahtjev, model odgovora može citirati bilo koji dio transkripta bez strukturirane granice znakova. Njegov ustrajni zapisnik poziva `responseBody` stoga je zamijenjen markerom za izostavljanje; detaljni artefakt cjevovoda (koji može uključivati upstream/client tijela i dijelove toka) nije zadržan. Semantička predmemorija, predmemorija idempotencije i reprodukcije rezoniranja zaobilaze čitanje i pisanje za taj zahtjev. Zahtjev pružatelja i odgovor vidljiv klijentu ostaju nepromijenjeni. Rani bajtovi za održavanje aktivnosti ispuštaju se iz privremenog međuspremnika kada se detaljni artefakt izostavi. Kiro-ovo krivo oblikovano upozorenje EventStream prijavljuje samo broj bajtova korisnog opterećenja, nikad njegov sadržaj ili sirovu pogrešku JSON parsera. Ovo ne tvrdi da je svaka nepovezana provider/plugin dijagnostika revidirana; širi pregled zadržanog sudopera prati se u #11658.

Unutarnji `/api/modality-bridge/video/drilldown` životni ciklus je zaseban, loopback/token-authenticated supstrat predmemorije. Svaka operacija također zahtijeva kanonski neprozirni principal ID. Prije nego što se produkcijski pozivatelj omogući, on mora izvesti taj ID od autentificiranog stanara i nikada ne smije proslijediti vrijednost koju je odabrao klijent. Ključevi predmemorije povezuju tog principala s kanonskom sesijom i video-referencom IDs, pohranjuju samo svoje SHA-256-derived ključeve i obuhvaćaju i čitanje i brisanje na istom principalu. Predmemorija pohranjuje najviše 16 izvedenih JPEG okvira po unosu, istječe im nakon deset minuta i podržava ograničena `start`/`end` čitanja ili eksplicitno brisanje sesije.

Svaki principal ograničen je na 16 unosa i 64 MiB kanonskih JPEG podataka. Ta su ograničenja neovisna o globalnoj gornjoj granici 64-entry/256 MiB : pritisak na kvotu principala izbacuje samo najmanje nedavno korištene unose tog principala prije nego što se razmotri globalno izbacivanje LRU. Istekli unosi brišu se iz glavnog i globalnog računovodstva aktivnosti predmemorije, dok otkazivanje i neuspjeh provjere valjanosti ne obvezuju djelomičnu zamjenu.

Predmemorija odbija nekanonski Base64, višak ispune, medije koji nisu JPEG, neispravno oblikovane ili skraćene JPEGs i JPEGs koji proizvode upozorenje tijekom ograničenog `sharp` dekodiranja pune slike. Ponovno kodira svaku prihvaćenu sliku kao kanonski JPEG, izvodi širinu i visinu iz dekodiranih bajtova umjesto da vjeruje poljima pozivatelja i odbacuje sve poliglotske bajtove na kraju umjesto da ih zadržava. Samo ograničeni kanonički komprimirani međuspremnik naplaćuje se za obje kvote. Ograničenje JSON žica uključuje Base64 nadopterećenje za 32 MiB dekodirani ulazni strop. Svaka pohranjena derivacija bilježi svoj potvrđeni JPEG format/resolution, politiku uzorkovanja, verziju derivacije, vrijeme stvaranja, hash sadržaja koji je izračunao poslužitelj i hashiranu nadređenu referencu plus hash nadređenog sadržaja pouzdanog pozivatelja. Otkazivanje se provjerava između asinkronih decode/hash faza prije predaje atomske predmemorije.

Producent ponovno koristi već izvedene brokerske okvire samo nakon uspješne vizualne analize, bez drugog video download/extraction. Zahtijeva operator `modalityBridgeVideoDrilldownEnabled=true`, strogi po dijelu `drilldown: true` i autentificirani zapis API-ključa ID. principal/session vrijednosti koje je deklarirao klijent nikada ne uspostavljaju vlasništvo. Bez sva tri uvjeta ne hashira, ne mijenja veličinu niti zadržava dodatne okvire. Neuspjeh zadržavanja čuva upotrebljiv vizualni odgovor. Zahtjevi s pristankom zaobilaze predmemoriju rezultata cijelog videozapisa tako da se predmemorirani rezultati nikad ne reproduciraju.

Uspješni JSON i SSE odgovori izlažu najviše četiri neprozirne ručice u ograničenom `x-omniroute-video-drilldown` zaglavlju. Ovlašteni izvori preglednika mogu čitati to zaglavlje bez proširenja pravila izvora CORS. Nove oznake koriste `v1.<32-byte random base64url token>`, a registar zadržava samo njihove SHA-256 hashove. reader/header parser također prihvaća naslijeđene 64-heks tokene. Autentificirani javni potrošač je `GET /api/v1/video-bridge/drilldown?handle=...`, neovisno gazira `modalityBridgeVideoDrilldownRemoteEnabled=true`. Eksplicitno persisted false opoziva pristup čak i kada je omogućeno naslijeđeno `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env backback. Zadržavanje proizvodnje ima analogni naslijeđeni `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` backback. Oba zamjena prema zadanim su postavkama isključena.

Potrošač izvodi vlasništvo iz provjerenog ključa i primjenjuje politiku ključa: i GET i DELETE pripadaju kategoriji krajnjih točaka `video`, uključujući pseudonime `/v1` i `/api/v1`. Ključevi s nepraznim popisom dopuštenih krajnjih točaka moraju uključivati `video`; neograničeni ključevi ostaju kompatibilni. Potrošač vraća isti 404 za nepoznate, istekle i druge ključeve. Prihvaća `variant=preview|standard|detail` (maksimalna JPEG dimenzija 320/640/1280, nikad se ne povećava), `limit=1..8` (ili naslijeđeni alias `frames`, nikad oboje), `page` baziran na nuli i izborne sekunde fokusa `start`/`end`. Duplicirani ključevi upita i prozori s obrnutim fokusom se odbijaju. Svaka vraćena varijanta ima hash stvarnog sadržaja i stvarne metapodatke razlučivosti, povezane s zadržanim izvorom. Varijante se izvode čitanjem, a ne pohranjuju kao dodatne zadržane kopije. Odgovor JSON, uključujući Base64/envelope, ograničen je na 32 MiB; prevelika stranica vraća 413 i klijent mora zahtijevati manje okvira. Čita poništavanje provjere oko svake promjene veličine i ponovno provjerava valjanost ručke prije povratka. `DELETE` po vlasniku je idempotentan; brisanje ili istek TTL a oslobađa zadržani izvor i računovodstvo upotrebe.

Dijeljena pohrana je procesno lokalna: ručke istječu nakon ponovnog pokretanja i ne mogu se prenositi između neovisnih OmniRoute procesa. Upravljačka statistika izlaže učinkovitu politiku zadržavanja/daljine i agregira samo zadržani entries/bytes, nikada medije, reference, glavni IDs ili ručke. Ploča postavki videozapisa prikazuje te vrijednosti i može zadržati oba prekidača pristanka. Ova implementacijska dokumentacija nije dokaz aktivne implementacije ili promocije; prihvaćanje stvarnog modela prati se zasebno.

Okviri su uzastopno označeni s konfiguriranim Video modelom. Prazno video nadjačavanje nasljeđuje postavku Vision; ako su oba prazna, automatski usmjerivač Vision odabire efektivni model sposoban za vid. Uspješni opisi zamjenjuju izvorni dio stabilnim `[Video description:` prefiksom koji također označava tekst kao nepouzdano opažanje izvedeno iz medija i govori daljnjim modelima da ne slijede upute iz medija. Ključevi predmemorije naslova okvira uključuju JPEG bajtove, prompt, vremensku oznaku i efektivni model; predmemoriraju se samo uspješni opisi. Unosi u predmemoriju zadržavaju stvarni uspješni model proizvođača, uključujući rezervni model; most javlja `mixed` kada su različiti modeli proizveli različite okvire. Pogodak predmemorije ponovno koristi taj identitet proizvođača umjesto da ga ponovno označi kao traženi plan usmjeravanja. Predmemorija rezultata cijelog videozapisa unesena je na svaki ulaz koji mijenja izlazni — odzivnik, efektivni model, politiku uzorkovanja, broj okvira, način semantičke analize, SHA-256 otisak prsta normaliziranog savjeta fokusa, prozor fokusa, `transcript`, `audioTranscript` i zastavu kontaktnog lista — tako da je promjena bilo koje od tih dimenzija promašaj predmemorije, a nikad ustajala ponovna upotreba. Verzija pravila vizualnog dedupiranja, prag i ograničeni broj okvira kandidata također su eksplicitni u ključu predmemorije rezultata i metapodacima; promjena pravila stoga ne može ponovno upotrijebiti zastarjeli opis cijelog videozapisa. Metapodaci Result-cache v4 čuvaju način rada i otisak prsta, nikad neobrađeni korisnički zadatak. Metapodaci o zaštitnoj ogradi izvještavaju o traženim i učinkovitim načinima analize; traženi `focused` način rada bez upotrebljivog korisničkog teksta prijavljen je kao efektivni `full`.

Zaštitna ograda izvlači svaki podržani video dio, ali ne opisuje više od `modalityBridgeVideoMaxVideos`. Za metu za koju je dokazano da ima `supportsVideo === false`, neuspješni i prekoračeni video zapisi postaju eksplicitni sigurni tekstualni markeri tako da nijedan sirovi video ne preživi. Kada je sposobnost nepoznata, ti dijelovi zadržavaju svoj video nosač; svaki zamjenski prijepis slijedi gornju konverziju ograničenog teksta. Mete sa `supportsVideo === true` zaobilaze most. Signal prekida zahtjeva klijenta širi se kroz preuzimanje, brokerski red čekanja, podprocese i pozive naslova; prekida zaustavljanje između videozapisa i nikad se ne otvara za sirove medije.

Postavke vremena izvođenja podržane su DB-om i potvrđene su Zod-om:

| Ključ                               | Zadano      | Raspon / ponašanje                                                                                     |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Izborno vrijeme izvođenja, uključivanje                                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` čuva generičke naslove; `focused` koristi ograničeni, nepouzdani kontekst posljednjeg korisnika |
| `modalityBridgeVideoModel`          | `""`        | Naslijedite model Vision Bridge                                                                        |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ili proporcionalni `segment_aware`; kvar detektora vraća se na `uniform`      |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                         |

Naslijeđene postojane vrijednosti vremenskog ograničenja videozapisa iznad 120 sekundi pričvršćuju se na rok posrednika; nove postavke upisa iznad te granice se odbijaju. `GET /api/modality-bridge/video/runtime` zahtijeva pouzdani žigosani lokalitet povratne petlje prije autentifikacije ili ispitivanja vremena izvođenja, zatim zahtijeva autentifikaciju upravljanja. Vraća samo `available`, pročišćene FFmpeg/ffprobe verzije i fiksni razlog kada je runtime nedostupan. Interna krajnja točka ekstrakcije nije javni prijenos API: zasićenost reda čekanja vraća `503` plus `Retry-After`, prekid veze pozivatelja vraća `499`, a fiksni rok posrednika vraća `504`. Pretvoreni odgovori dodaju `video->text;model=<visionModel>;parts=<videos>` u središnje zaglavlje `x-omniroute-modality-bridge` bez uklanjanja vidnih ili audio segmenata.

### PII masker (`piiMasker.ts`)

Radi dalje **oba** faze.

- **`preCall`** klonira korisni teret, šeta `system`, `messages`, `input` i `prompt` (uključujući obične stavke niza) i primjenjuje `processPII()` (iz `@/shared/utils/inputSanitizer`) na polja niza `content`/`text`. Kada je `PII_REDACTION_ENABLED=true`, otkriveni PII se redigira u izlaznom korisnom teretu. Ovo je neovisno o `INPUT_SANITIZER_MODE` (koji kontrolira samo politiku brzog ubacivanja). Kada je redigiranje isključeno, otkrivanje zapisa poziva računa se bez ponovnog pisanja sadržaja.
- **`postCall`** duboko klonira odgovor, pokreće `sanitizePIIResponse()` plus Responses-API-shape masker (`maskResponsesOutput` — pokriva `output_text` i `output[].content[].text`). Ako dođe do bilo kakvog uređivanja, modificirani odgovor zamjenjuje izvornik.

Zaštitna ograda nikada ne blokira; samo označava (`meta.detections`, `meta.redacted`) ili prepisuje.

#### Odabir po vrsti, prilagođeni uzorci i brojači detekcije

**Nadzorna ploča → postavke → Sigurnost → PII maskiranje** bira _što_ je maskirano. Ne uključuje maskiranje: to je i dalje `PII_REDACTION_ENABLED` (zahtjev) i `PII_RESPONSE_SANITIZATION` (odgovor + SSE), oba isključena prema zadanim postavkama.

- **Odabir po vrsti** — ugrađeni ID-ovi navedeni su u `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nepostavljeno znači svaku vrstu (ponašanje prije postojanja ove postavke). `ssn_us` obrazac tražilice preslikava u `ssn`. Predlošci (minimalni, standardni, financijski, brazilski, USA, GDPR, POPIA, puni) ispunjavaju samo potvrdne okvire u UI.
- **GDPR i POPIA identifikatori** — dvanaest ugrađenih ID-ova koji pokrivaju EU i južnoafričke osobne identifikatore (tablica u nastavku). Njihovi regularni izrazi, validatori i oznake nadležnosti žive u jednoj tablici, `src/shared/utils/piiPatterns.ts`, koju koriste i dezinfekcija odgovora (`src/lib/piiSanitizer.ts`) i masker zahtjeva (`src/shared/utils/inputSanitizer.ts`). Podudaranje se redigira samo kada ga validator prihvati; goli niz znamenki nikada nije dovoljan. Operator koji je spremio suženi odabir prije nego što su ovi ID-ovi postojali zadržava ponašanje koje je imao dok se ne označi novi ID.
- **Prilagođeni uzorci** — do 20 uzoraka regularnih izraza ili zamjenskih znakova (`*` = do 64 znaka koji nisu razmaci, `?` = jedan). Utakmice postaju `[CUSTOM_REDACTED]`. Svaki uzorak prolazi kroz `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): najviše 500 znakova, oznake ograničene na `g i m s u`, moraju se kompilirati, moraju proći `safe-regex` (katastrofalno praćenje unazad) i ne smiju se podudarati s praznim nizom ili rezerviranim mjestom za redigiranje. Uzorak koji ne uspije odbija se prilikom spremanja i testiranja, a pohranjeni redak koji ne uspije preskače se tijekom izvođenja umjesto da se kompajlira. Prilagođeni uzorci pokreću se samo dok je uključeno maskiranje.
- **Brojači detekcije** — se broji po tipu (nikada usklađene vrijednosti), čuva se u memoriji i resetira pri ponovnom pokretanju (`src/lib/pii/piiDetectionStats.ts`). Povećavaju se samo dok je maskiranje uključeno.

Postavke žive u `key_value` tablici (imenski prostor `pii_settings`, `src/lib/db/piiSettings.ts`) i čitaju se kroz predmemoriju od 1 s. API:

| Metoda | Putanja                  | Svrha                                                                       |
| ------ | ------------------------ | --------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stanje zastavice, `enabledTypes`, `customPatterns`, brojači otkrivanja      |
| `PUT`  | `/api/settings/pii`      | Zamjena `enabledTypes` (`null` = sve) i/ili `customPatterns`                |
| `POST` | `/api/settings/pii/test` | Probno pokretanje jednog uzorka na primjeru do 8 KB; ništa se ne pohranjuje |

Sva tri zahtijevaju autorizaciju upravljanja i potvrđuju tijelo sa Zod (`src/shared/validation/schemas/piiSettings.ts`). S onemogućenom prijavom (`requireLogin=false`) `GET` i testna krajnja točka su otvoreni, ali `PUT` i dalje treba sesiju nadzorne ploče, `manage` -scope API ključ, `oma_` pristupni token s opsegom pisanja ili višim ili CLI token ili token interne usluge poslan iz povratne petlje.

#### GDPR (EU) i POPIA (Južnoafrička Republika) identifikatori

| ID                  | Identifikator                      | Provjera                                                                               |
| ------------------- | ---------------------------------- | -------------------------------------------------------------------------------------- |
| `iban`              | IBAN                               | Poznata država, točna duljina za tu državu, ISO 13616 MOD-97-10                        |
| `eu_vat`            | PDV broj EU-a                      | Poznati prefiks države članice i format broja te države (bez upita VIES)               |
| `es_dni_nie`        | Španjolski DNI / NIE               | Kontrolno slovo (vrijednost mod 23); NIE je `X/Y/Z` + 7 znamenki                       |
| `it_codice_fiscale` | Talijanski Codice Fiscale          | Kontrolno slovo iz tablica neparnih/parnih položaja                                    |
| `pl_pesel`          | Poljski PESEL                      | Ponderirani kontrolni zbroj i prihvatljivi rasponi kodiranog mjeseca/dana rođenja      |
| `nl_bsn`            | Nizozemski BSN                     | Provjera 11 (težine 9..2, -1)                                                          |
| `de_steuer_id`      | Njemački Steuer-ID                 | ISO 7064 Mod 11,10 i pravila strukture znamenki (bez početne 0)                        |
| `se_personnummer`   | Švedski personnummer               | Luhn nad posljednjih deset znamenki i vjerodostojan datum rođenja (10 ili 12 znamenki) |
| `za_id`             | Južnoafrički identifikacijski broj | Luhn nad svih 13 znamenki, valjan mjesec/dan rođenja, znamenka državljanstva 0 ili 1   |
| `za_phone`          | Južnoafrički telefon               | Prefiks `+27` / `27` ili nacionalni oblik `0..` napisan s razmakom ili spojnicom       |
| `za_vat`            | Južnoafrički PDV broj              | 10 znamenki s početnom `4` **i** "VAT" / "BTW" u prethodnih 48 znakova                 |
| `za_tax_ref`        | Južnoafrička porezna referenca     | 10 znamenki s početnom `0`-`3`, Luhn **i** "tax" / "SARS" u prethodnih 48 znakova      |

Budući da su samo znamenkasti formati u sukobu s brojevima narudžbi, brojevima izrade i vremenskim oznakama, oni najslabiji (`za_vat`, `za_tax_ref`) trebaju ključnu riječ, a goli deseteroznamenkasti `0..` broj ne tretira se kao južnoafrički telefonski broj. Razmaknuti IBANs (`GB29 NWBK ...`) se ne podudaraju. Na stazi strujanja znak se traži samo unutar trenutnog dijela. ID-ovi su ispred generičkih telefonskih uzoraka, tako da potvrđeni identifikator zadržava vlastito rezervirano mjesto (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr` i `popia` predlošci odabiru EU i Južnoafrički ID redom. Samo maskiranje ostaje uključeno (Hard Rule #20): ništa ovdje ne mijenja zadanu zastavu značajke.

### Umetanje upita (`promptInjection.ts`)

Otkriva protivničke strukture u sadržaju koji je unio korisnik i provodi
konfigurirana pravila. Ponašanjem upravljaju varijable okruženja i opcije
konstruktora:

| Postavka        | Varijabla okruženja                                                                                   | Zadano | Učinak                                                                                                                                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Omogućeno       | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | Kada je `false`, zaštitni mehanizam odmah završava obradu.                                                                                                                                                                   |
| Način rada      | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | Pravila za umetanje: `block`, `warn` ili `log`. (`redact` se prihvaća radi kompatibilnosti sa starijim verzijama, ali **ne** uklanja tekst umetanja; izmjenom osobnih podataka u zahtjevu upravlja `PII_REDACTION_ENABLED`.) |
| Prag blokiranja | opcija `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Najmanja razina ozbiljnosti potrebna za blokiranje. Srednja razina prema zadanim se postavkama samo nadzire.                                                                                                                 |

**Redoslijed prvenstva načina rada** (`getMode`): `options.mode` pozivatelja →
nadjačavanje **zastavicom značajke iz baze podataka** za `INJECTION_GUARD_MODE` (Nadzorna ploča → Postavke →
Zastavice značajki) → varijabla okruženja `INJECTION_GUARD_MODE` → varijabla okruženja `INPUT_SANITIZER_MODE` →
`warn`. Nadjačavanje putem nadzorne ploče stoga ima prednost pred varijablama okruženja, pa korisničko sučelje
Zastavice značajki upravlja aktivnim zaštitnim mehanizmom uživo (bez ponovnog pokretanja). Čitanje iz baze podataka sigurno je u slučaju pogreške:
ako dođe do pogreške, zaštitni mehanizam vraća se na ponašanje određeno varijablama okruženja, a kada
nadjačavanje nije postavljeno, ponašanje je jednako određivanju isključivo putem varijabli okruženja.

Izvori otkrivanja:

1. `sanitizeRequest()` iz `@/shared/utils/inputSanitizer` (zajednički skup detektora
   koji se upotrebljava i drugdje u procesnom lancu).
2. Ugrađeni `DEFAULT_GUARD_PATTERNS` (trenutačno `system_override_inline` i
   `markdown_system_block`, oba razine ozbiljnosti `high`).
3. Neobavezni `customPatterns` proslijeđeni putem opcija konstruktora (nizovi znakova, regularni izrazi
   ili zapisi `{ name, pattern, severity }`).

Kada je `mode === "block"` **i** barem jedno otkrivanje doseže prag ozbiljnosti, `preCall` vraća `{ block: true, message: "Request rejected: suspicious content detected" }`. U načinima `warn`/`log` zaštitna barijera bilježi u dnevnik, ali dopušta poziv. Zajednički pomoćnik `evaluatePromptInjection()` također je izvezen za pozivatelje koji trebaju evaluirati upite bez prolaska kroz registar.

**Granica skeniranja (v3.8.20):** detektor pregledava samo **prvih 16 KB** spojenog teksta upita — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajta) u `src/shared/utils/inputSanitizer.ts`. I `detectInjection()` i `evaluatePromptInjection()` primjenjuju `slice(0, MAX_INJECTION_SCAN_BYTES)` prije pokretanja petlje uzoraka. Direktive za ubrizgavanje nalaze se pri vrhu ulaza, pa ovo ograničava potrošnju CPU-a/GC-a za regex na teretima od više stotina KB bez slabljenja detekcije (usp. #3932, #4041).

### Maska za vjerodajnice (`credentialMasker.ts`)

Radi dalje** oba** faze, posljednje u zadanom lancu (prioritet `95`). Rediguje dobro poznate uzorke ključa API-ja/tajnog tokena iz izlaznog sadržaja (sadržaj poruke, argumenti poziva alata, rezultati alata)** i** odgovor davatelja, tako da vjerodajnica zalijepljena u upit (ili vraćena rezultatom alata) ne procuri do uzvodnog davatelja ili natrag do klijenta.

- **Samo uključivanje** , ista konvencija kao PII redakcija (Hard Rule #20-susjedna): onemogućeno osim ako `settings.credentialRedactionEnabled === true`** ili** `CREDENTIAL_REDACTION_ENABLED=true`. Kad je isključena, zaštitna ograda je neoperativna — koja nikada ne blokira i nikada se ne prepisuje.
- `redactCredentials()` hoda cijelim payload/response stablom (`walkValue()`, prototype-pollution-safe, cycle-safe via `WeakSet`) i zamjenjuje podudaranja `[REDACTED:<type>]` rezerviranim mjestom, klonirajući samo grane koje su se stvarno promijenile.
- `CREDENTIAL_PATTERNS` pokriva ključeve LLM pružatelja usluga (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokene (GitHub, Slack, Linear, Notion, npm, Postman, Discord), ključeve plaćanja (Stripe, Square), ključeve oblaka (AWS pristupni ključ, Twilio, SendGrid, Mailgun), privatni ključevi / JWTs, nizovi veze koji nose vjerodajnice (`mongodb://user:pass@...` itd.) i generički uzorak vrijednosti zaglavlja `Authorization`/`x-api-key`/`api-key`/`apikey`. Ključevi u obliku zaglavlja (`authorization`, `x-api-key`, `api-key`, `apikey`) redigiraju se strukturalno (samo vrijednost, prefiks sheme kao što je `Bearer `/`Basic ` sačuvan), a ne putem generičkog tekstualnog regularnog izraza.
- Zaštitna ograda nikada ne blokira; samo prepisuje (`modifiedPayload` / `modifiedResponse`) i komentira (`meta.credentialsRedacted`, `meta.count`).

Stražar regresije: `tests/unit/credential-masker-guardrail.test.ts`.

## Osnovni ugovor (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true prekida lanac
  message?: string; // prikazuje se pri blokiranju
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // vraća ga preCall za prepisivanje zahtjeva
  modifiedResponse?: TValue; // vraća ga postCall za prepisivanje odgovora
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Guardrail signalizira „nema promjene" vraćanjem bilo `void`, `{}` ili
`{ block: false }`. Vraćanje `modifiedPayload`/`modifiedResponse` zamjenjuje
vrijednost koja struji kroz lanac za nizvodne guardrailove.
`signal?: AbortSignal` unosi životni ciklus pozivatelja u guardrailove. Prekid
zahtjeva namjerna je fail-open iznimka: medijski mostovi zaustavljaju rad i
čišćenje bez vraćanja sirovih medija na cilj za koji se zna da ih ne podržava.

## Registar (`registry.ts`)

Singleton `guardrailRegistry` izlaže:

- `register(guardrail)` — dodaje (ili zamjenjuje prema normaliziranom nazivu)
  guardrail i ponovno sortira prema rastućem `priority`.
- `clear()` / `list()` — administrativne pomoćne funkcije.
- `runPreCallHooks(payload, context)` — prolazi kroz aktivne guardrailove,
  provlači payload kroz `modifiedPayload` i zaustavlja se na prvom `block: true`.
- `runPostCallHooks(response, context)` — isti tijek na strani odgovora.
- `resetGuardrailsForTests({ registerDefaults })` — briše stanje i po potrebi
  ponovno registrira zadane guardrailove radi čiste izolacije testova.

Oba pokretača vraćaju `{ blocked, payload|response, results, guardrail?, message? }`,
gdje je `results` polje zapisa `GuardrailExecutionResult` koje po guardrailu
uključuje polja `blocked`, `skipped`, `modified`, `error` i `meta`, korisna za
praćenje.

### Onemogućavanje guardrailova po zahtjevu

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` objedinjuje
deduplicirani popis naziva guardrailova koje treba preskočiti za trenutni
zahtjev. Postoji pet kanala, koji se čitaju ovim redoslijedom i spajaju u jedan
popis (pri deduplikaciji pobjeđuje prvo pojavljivanje):

1. `apiKeyInfo.disabledGuardrails`
2. Tijelo zahtjeva `disabledGuardrails` (najviša razina)
3. Tijelo zahtjeva `metadata.disabledGuardrails` (samo kada je `metadata` objekt)
4. Zaglavlje `x-omniroute-disabled-guardrails`
5. Zastarjelo zaglavlje `x-disabled-guardrails`

Svih pet kanala se spaja, uključujući i dva zaglavlja: slanje i
`x-omniroute-disabled-guardrails` i `x-disabled-guardrails` preskače uniju
njihovih popisa, a prazno moderno zaglavlje više ne skriva zastarjelo
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), popravljeno u
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Vrijednosti mogu biti polja stringova ili string odvojen zarezima; nazivi se
obrezuju i normaliziraju na kebab-case malih slova (`pii_masker` →
`pii-masker`), a prazne stavke se odbacuju. Rezultat se prosljeđuje putem
`context.disabledGuardrails` registru, koji preskače odgovarajuće guardrailove
(`skipped: true` u `results`).

Popis onemogućavanja utječe samo na **registar**. Način `block` zaštite od
prompt injectiona obavezna je granica: middleware za zaštitu od injekcija
(`src/middleware/promptInjectionGuard.ts`) poziva `evaluatePromptInjection()`
bez ikakvog popisa onemogućavanja pod kontrolom pozivatelja (mrtvi poziv
`resolveDisabledGuardrails({ body })` koji je prije upućivao uklonjen je u
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), pa se zahtjev
koji onemogućuje `prompt-injection` i dalje odbija u načinu `block`. To je
namjerna odluka dizajna. Kanali onemogućavanja pod kontrolom su pozivatelja
(tijelo zahtjeva, metapodaci, zaglavlja), a pozivatelj ne smije moći isključiti
sigurnosnu kontrolu koju je postavio operator
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Unija
zaglavlja iz [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
mijenja samo koji se guardrailovi registra preskaču; ne omogućuje klijentu
zaobilaženje middlewarea. Obavezna pravila guardrailova po ključu i po grupi
prate se u v4 RFC-u [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Vidi [Pokrivenost i ograničenja](#coverage-and-limits).

## Redoslijed izvršavanja

Za svaki zahtjev koji prolazi kroz `src/sse/handlers/chat.ts` i
`open-sse/handlers/chatCore.ts` (rute obitelji chat navedene pod
[Pokrivenost i ograničenja](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` sastavlja popis preskakanja iz API ključa, tijela
   i zaglavlja.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` pokreće guardrailove uzlaznim
   redoslijedom prioriteta:
   - Onemogućeni guardrailovi bilježe se kao `skipped`.
   - `preCall` svakog guardraila može prepisati payload putem `modifiedPayload`.
   - Prvi `block: true` prekida lanac i handler vraća odgovor o odbijanju
     od strane guardraila.
3. (Potencijalno prepisani) payload ulazi u combo usmjeravanje i upstream
   prosljeđivanje.
4. **Samo non-streaming:** nakon što je odgovor sastavljen,
   `guardrailRegistry.runPostCallHooks(...)` pokreće isti lanac na
   odgovoru. `block: true` ovdje odbacuje upstream odgovor i vraća HTTP 400. Streamani odgovori u potpunosti preskaču ovaj korak.

Guardrailovi koji bace iznimku bilježe se s `error: <message>` i zapisuju u log putem
`logger.warn`, ali lanac se nastavlja — fail-open po dizajnu.

## Pokrivenost i ograničenja

Registar guardrailova ugrađen je samo u chat pipeline. Ova su ograničenja
fiksirana testovima `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` i
`tests/unit/guardrail-pipeline-characterization.test.ts`; te testove promišljeno
ažurirajte kada se ponašanje promijeni.

### Gdje se hookovi pokreću

| Hook / kontrola                          | Pokreće se za                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                        | Zahtjevi koje obrađuje `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (i `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` i Telegramov chat proxy. Također i testni endpoint nadzorne ploče `/api/guardrails/test`. Pre-call blokada vraća HTTP 400. |
| `runPostCallHooks`                       | **Samo non-streaming** chat odgovori (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Streamani odgovori nikad do njega ne dolaze.                                                                                                                                                                                                                                                                                       |
| Streaming PII                            | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), umetnut u cjevovod u `streamingPipeline.ts` kada je `PII_RESPONSE_SANITIZATION` uključen. To nije guardrail, pa kanali onemogućavanja ne utječu na njega.                                                                                                                                                                                                         |
| Injection-guard middleware (naslijeđeni) | Svaka `/v1` ruta koja nosi prompt, uključujući obitelj chat ruta (vidi [pokrivenost ruta](#injection-guard-route-coverage--red-team-phase-8--block-d)). Samo prompt injection.                                                                                                                                                                                                                                                  |

### Što nije pokriveno

- **Rute za medije, embeddings i podatke** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) nikada ne dosežu registar. Tamo
  se ne izvode maskiranje PII-ja, maskiranje vjerodajnica niti premošćivanje
  modaliteta. Njihova je jedina provjera naslijeđeni injection-guard middleware.
- **Streamani odgovori** ne dobivaju post-call guardrailove: nema post-call poziva
  `pii-masker` ili `credential-masker` i nema post-call blokade. Primjenjuje se
  samo transformacija streaming PII-ja (kada je `PII_RESPONSE_SANITIZATION`
  uključen). Vjerodajnica koja se vrati u streamanom odgovoru neće biti
  zataškana.
- **Kanali onemogućavanja naspram middlewarea (po dizajnu):** middleware
  procjenjuje prompt injection vlastitim pozivom funkcije `evaluatePromptInjection()`,
  bez prosljeđivanja ikakvog popisa onemogućavanja kojim upravlja pozivatelj.
  Način `block` obavezna je granica koju onemogućavanja pod kontrolom pozivatelja
  ne mogu zaobići, uključujući i rute obitelji chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Onemogućavanje
  `prompt-injection` preskače samo guardrail u registru.

### Što vidi odgovor prije post-call poziva

Na non-streaming putu redoslijed je: ekstrakcija memorije → izvršavanje ugrađenih
alata → post-call guardrailovi → izlaz zbog post-call blokade → pohrana u
semantičku predmemoriju.

- **Ekstrakcija memorije** i **izvršavanje alata** vide odgovor prije nego što ga post-call guardrails mogu prepisati ili blokirati. Od
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), ekstrakcija
  memorije propušta izvučeni tekst kroz `sanitizePII` kada je
  `PII_RESPONSE_SANITIZATION` uključeno (kako u streaming, tako i u
  non-streaming načinu rada), ali odgovor koji post-call naknadno blokira
  i dalje je bio ponuđen memoriji i alatima.
- **Semantička predmemorija** pohranjuje odgovor nakon post-call faze, pa
  pohranjuje prepisani odgovor, a blokirani odgovor nikada se ne sprema u
  predmemoriju. Unosi predmemorije ključirani su prema API ključu.

## Konfiguracija

Varijable okruženja koje čitaju ugrađeni zaštitni mehanizmi:

| Varijabla                             | Koristi                 | Učinak                                                                                                            |
| ------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`      | Postavite `false` da biste potpuno onemogućili detekciju.                                                         |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`      | Politika injekcije: `warn`, `block` ili `log`. Zastarjela vrijednost `redact` ne prepisuje tekst injekcije.       |
| `INJECTION_GUARD_MODE`                | `prompt-injection`      | Način rada zaštite od injekcije; također DB zastavica značajke koja **nadjačava** varijable okruženja (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`      | Minimalna ozbiljnost koju `MODE=block` odbija: `high` (zadano), `medium` ili `low`.                               |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`      | Zastarjeli alias za `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                            |
| `PII_REDACTION_ENABLED`               | `pii-masker`            | Kada je `true`, PII u zahtjevu se anonimizira (nezavisno od načina injekcije).                                    |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nizvodno) | Kontrolira ponašanje maskera na strani odgovora.                                                                  |

Zaštitni mehanizmi Modality Bridgea čitaju konfiguraciju tijekom izvođenja iz
spremišta postavki podržanog bazom podataka (`getSettings()`), a ne iz
varijabli okruženja. Primarni ključevi za Vision su
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` i
`modalityBridgeCacheMaxEntries`. Zastarjeli ključevi
`visionBridge*` prihvaćaju se samo kao dokumentirani pričuvni mehanizam čitanja
za jedan ciklus; upisi s nadzorne ploče koriste primarne ključeve. Zadane
vrijednosti i rješavač pričuvnih vrijednosti nalaze se u
`src/shared/constants/modalityBridgeDefaults.ts`, sa zastarjelim konstantama
zadržanima u `src/shared/constants/visionBridgeDefaults.ts`.

Audio koristi `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` i `modalityBridgeAudioMaxClips`, uz zajedničke
postavke `modalityBridgeCache*`. Audio nema pričuvni mehanizam za zastarjele
ključeve jer su ti ključevi uvedeni sa shemom Modality Bridgea.

Video koristi `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` i
`modalityBridgeVideoTimeout`, uz zajedničke postavke `modalityBridgeCache*`.
Zadano je onemogućen jer su FFmpeg/ffprobe opcionalne operativne ovisnosti, a
generiranje opisa okvira dodaje latenciju i trošak modela.

## Prilagođene zaštitne mjere

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Koraci:

1. Kreirajte `src/lib/guardrails/myGuardrail.ts` koji proširuje `BaseGuardrail`.
2. Implementirajte `preCall` i/ili `postCall`.
3. Registrirajte je prilikom uvoza (push iz `registerDefaultGuardrails`) ili
   pozovite `guardrailRegistry.register(...)` tijekom izvođenja — registar
   zamjenjuje svaku prethodnu zaštitnu mjeru s istim normaliziranim nazivom.
4. Dodajte testove pod `tests/unit/` (postojeći primjeri:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testiranje

Koristite `resetGuardrailsForTests()` između testova kako biste započeli iz
poznatog stanja. Proslijedite `{ registerDefaults: false }` kako biste započeli
s praznim registrom i registrirali samo zaštitne mjere koje se testiraju.
Vision Bridge prihvaća ubrizgavanje ovisnosti (`deps.getSettings`,
`deps.callVisionModel`); Audio Bridge izlaže ekvivalentne točke spajanja za
postavke, mogućnosti, odabir STT modela, provjere vjerodajnica i transkripciju.
Testovi stoga mogu izvršiti oba toka bez pristupa bazi podataka ili mreži.

## Vidi također

- `src/lib/guardrails/` — implementacija
- `src/shared/utils/inputSanitizer.ts` — zajednički detektor koji pokreće
  zaštitu od ubrizgavanja upita i maskiranje PII-ja
- `src/shared/constants/visionBridgeDefaults.ts` — zadane postavke Vision
  Bridgea i popis modela za prisilni bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — zajedničke zadane runtime
  postavke za Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalni sloj (circuit breaker,
  razdoblja mirovanja)
- `docs/reference/ENVIRONMENT.md` — potpuni referentni popis varijabli okruženja

## Pokrivenost ruta zaštite od ubrizgavanja i red-team (Faza 8 · Blok D)

Zaštita od ubrizgavanja (`createInjectionGuard` / `withInjectionGuard`) pokriva
sve rute koje prihvaćaju korisničke upite. Poštuje `INJECTION_GUARD_MODE`
(zadano `warn` = samo bilježi; `block` = vraća HTTP 400 `SECURITY_001`).

| Vrsta             | Rute                                                                                                                                                 | Zadani način |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Tekst (postojeće) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn         |
| Generativne       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn         |
| Podatkovne        | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn         |

Ekstrakcija teksta (`extractMessageContents`) pokriva
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (noćni, `nightly-llm-security.yml`):** promptfoo provjerava da svaka
ruta blokira OWASP-LLM korpus u načinu `INJECTION_GUARD_MODE=block`; garak
pokreće sonde (preskače ako tajna nije postavljena). `moderations` je uključen
radi dosljednosti. Način blokiranja obavezna je granica:
`evaluatePromptInjection()` zanemaruje popis onemogućavanja po zahtjevu koji joj
middleware prosljeđuje, pa `disabledGuardrails` **ne** izuzima rutu iz nje
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Noćni workflow (`.github/workflows/nightly-llm-security.yml`, cron + ručno
pokretanje) ima dva posla:

- **`promptfoo-guard` (blokirajući)** — pokreće `promptfoo eval -c
promptfooconfig.yaml` s `INJECTION_GUARD_MODE=block`. Svaki neprijateljski
  slučaj (npr. "ignore all previous instructions…", jailbreakovi u DAN stilu)
  potvrđuje da odgovor nosi `error.code === "SECURITY_001"`, tj. da je zaštita
  stvarno odbila zahtjev.
- **`garak` (savjetodavni)** — pokreće garak `--probes
promptinject,dan,leakreplay` na lokalnoj instanci OmniRoutea
  (`http://localhost:20128/v1`). Uvjetovan je tajnom pružatelja
  (`PROMPTFOO_PROVIDER_KEY`); u njezinoj odsutnosti elegantno se preskače, a uz
  sufiks `|| true` izvještava bez neuspjeha CI-ja.

Pokrivenost pomoćne funkcije zaštite (`createInjectionGuard` /
`withInjectionGuard`) proteže se na svaku `/v1` rutu koja sadrži upit; tekst
upita dohvaća se iz
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` pomoću
funkcije `extractMessageContents()` u `src/shared/utils/inputSanitizer.ts`.
