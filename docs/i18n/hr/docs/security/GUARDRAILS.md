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

## Ugrađene zaštitne ograde

Registar automatski učitava šest zaštitnih ograda po prioritetnom redoslijedu pri uvozu (pogledajte `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Ime                 | Faza(e)        | File                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Pokreću se brojevi nižeg prioriteta** prvi** .

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Osnovni model GLM 5.3 i `glm-5.3-{low,high,max}` imaju eksplicitne `supportsVision:false` registry/spec metapodatke. Varijante GLM 5.3 Flash ostaju izvorni modeli. `/v1/messages` ruta Claude Code-a ulazi u zajednički lanac zaštitne ograde `handleChat` prije poziva** prije** Claude-to-OpenAI prijevod; ugniježđene `Read` slike rezultata alata moraju se opisati ili obraditi prije nego što ih taj prijevod podigne u OpenAI `image_url` sadržaj (#17069).

Presreće zahtjeve koji nose sliku usmjerene na** nevizijski modeli** i ili preusmjerava cijeli zahtjev na model sposoban za vid ili zamjenjuje dijelove slike tekstualnim opisima koje proizvodi konfigurabilni model vida prije uzvodnog poziva. To pružateljima samo tekstualnih usluga omogućuje transparentno rukovanje multimodalnim teretom.

Protok:

1. Preskočite ako ciljni model već podržava vid (osim ako se ne pojavljuje na popisu prisilnih mostova `isVisionBridgeForcedModel`).
2. Izdvojite dijelove slike putem `extractImageParts(messages)` (`visionBridgeHelpers.ts`), koji delegira na** objedinjeni detektor medija** `detectMediaParts()` u `open-sse/utils/mediaParts.ts` — jedini izvor istine koji se dijeli s kombiniranim filtrom kompatibilnosti. Ekstrakcija je na popisu dopuštenih za oblike koje `replaceImageParts` može spojiti natrag (izvadak ↔ zamjenjuje ugovor): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` i odgovori API `input_image`. Odgovarajuće slike ugniježđene unutar Claude koda `tool_result.content` i izlaza alata Responses također se izdvajaju i zamjenjuju na svojim izvornim stazama; oblici samo za indikatore su kombinirani filtarski materijal i ne izvlače se. Preskoči ako ništa nije pronađeno.
3. Riješite runtime config putem `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): novi `modalityBridge*` ključevi postavki pobjeđuju; naslijeđeni `visionBridge*` ključevi ostaju a** jednociklični povrat** (prozor povratka). Preskoči prije bilo kakvog prolaska medija kada je most onemogućen.
4. Selektor načina rada (`modalityBridgeVisionMode`, vidi tablicu u nastavku) odlučuje o preusmjeravanju u odnosu na opis. Reroute vraća `modifiedPayload` sa samo `model` zamijenjenim, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Opišite put: ograničite slike na `maxImages`, sastavite prompt s obzirom na zadatak, pogledajte predmemoriju opisa, pozovite model vizije** paralelno** (`Promise.allSettled`), i umetnuti `[Image N]: <description>` dijelove teksta na njihovo mjesto. Neuspješno opisivanje daje `null`: neobrađena slika je sačuvana za unknown/vision-capable ciljeve (#4012), ali** potvrđeni izravni cilj samo za tekst** ili zero-vision combo dobiva eksplicitni `(unavailable — no vision-capable provider connected)` tekstualni završetak za svaku neopisanu sliku, uključujući djelomične kvarove i slike izvan ograničenja opisa poziva (#17069). Postojeća potpuno neuspjela kombinacija opisuje zamjenu ostaje na mjestu (#8430).
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

### Audio most (`audioBridge.ts`) — Modalitetni PR-3

Presreće zahtjeve za chat koji nose zvuk prije nego što dođu do cilja za koji nije poznato da prihvaća audio unos. Nikada ne preusmjerava zahtjev za chat: audio dijelovi se transkribiraju kroz postojeću višedijelnu krajnju točku kompatibilnu s OpenAI-jem, a odabrani model chata nastavlja se s tekstualnim transkriptima.

Protok:

1. Razriješi `supportsAudio` kroz `getResolvedModelCapabilities()`. Eksplicitni metapodaci registra pružatelja pobjeđuju, zatim metapodaci statičnog modela, zatim sinkronizirani `modalities_input`. Deklarirana ulazna lista bez `audio` je `false`; nema dokaza o sposobnosti `null`. I `false` i `null` aktiviraju konzervativni most, dok ga `true` zaobilazi.
2. Razriješite `modalityBridgeAudio*` postavke i izdvojite spojive audio dijelove najviše razine iz svake poruke putem zajedničkog `detectMediaParts()` detektora. Podržani oblici žice su OpenAI `input_audio`, `audio_url` i `source.media_type: "audio/*"`. Ugniježđeni zvuk otkriven je za usmjeravanje, ali se ne uklanja stazom spajanja. Rad je ograničen `modalityBridgeAudioMaxClips`; kasniji dijelovi ostaju netaknuti.
3. Poštujte konfigurirani `provider/model` ili pustite `selectAudioBridgeModel()` da šeta `AUDIO_TRANSCRIPTION_PROVIDERS` u stabilnom kataloškom redoslijedu i odaberite prvi model s upotrebljivom vjerodajnicom aktivnog pružatelja usluga.
4. `callAudioTranscription()` pretvara base64/data-URI audio u višedijelni `file` ili preuzima udaljeni `audio_url` putem zaštite samo za javnost sa DNS pričvršćivanjem i ograničenjem od 25 MB. Zatim POSTs datoteku i odabrani model u lokalnu `/v1/audio/transcriptions` samopetlju, autentificiranu pomoću `resolveSelfLoopBearer()`. Postojeća ruta transkripcije izvodi normalno traženje vjerodajnica, rukovanje cooldown/rate-limit i slanje pružatelja.
5. Uspješni pozivi zamjenjuju svoje dijelove sa `[Audio N]: <transcript>`. Pozivi se izvode sa `Promise.allSettled`: pojedinačni kvar čuva taj izvorni audio dio (#4012 ugovor). Ako svaki poziv ne uspije i cilj se dokaže `supportsAudio === false`, dijelovi postaju `[Audio N]: (unavailable — no STT provider connected)` (#8430 ugovor). Za nepoznatu metu (`null`), neuspješan rezultat ostaje netaknut. Dokazani samo tekstualni cilj bez upotrebljive STT vjerodajnice prima isti eksplicitni stub bez upućivanja mrežnog poziva.

Uspješni prijepisi koriste LRU/TTL predmemoriju Modality Bridge za cijeli proces. Ključ kombinira audio referencu, oznaku stabilnog `audio-transcription` rada i odabrani STT model; kvarovi se nikada ne pohranjuju u predmemoriju. Pokušaji zvuka ažuriraju dijeljene brojače `bridged`, `cacheHits`, `failures` i `lastUsedAt`. Transformirani odgovori nose `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; netaknuti zahtjevi ne primaju segment Audio Bridge.

Postavke vremena izvođenja podržane su DB-om i potvrđene su Zod-om:

| Ključ                         | Zadano  | Raspon          |
| ----------------------------- | ------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —               |
| `modalityBridgeAudioModel`    | `""`    | Auto ili STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10            |

Zajedničku predmemoriju i dalje kontroliraju `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` i `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Presreće video dijelove najviše razine u dovršecima razgovora `messages` i odgovorima API `input` prije pozivanja cilja bez poznate izvorne video podrške. Podržani oblici su `input_video`, `video_url`, `video_source`, HTTPS URLs i `data:video/*;base64,...` podaci URIs. Obični nazivi datoteka u tekstu ne tretiraju se kao video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) posjeduje prolazak zahtjeva, capability/policy provjeru, agregaciju po zahtjevu i korisni teret odgovora. — akvizicija rada po video zapisu, predmemorija cijelog rezultata, koja opisuje sekvencu okvira (koja spaja bilo koji audio transkript koji je deklarirao pozivatelj) i po pokušaju metrics/abort/cleanup — je skriven iza `processVideoPart` u `videoBridgePipeline.ts`, poziva se jednom po video dijelu unutar `preCall` petlje. Taj modul također definira eksplicitne granice priključaka `VideoMediaBrokerPort` (prihvaćanje bajtova i izdvajanje uzorkovanih okvira), `VideoAudioTranscriptionPort` (spajanje zvučnog transkripta deklariranog od strane pozivatelja s uzorkovanim opisima) i `VideoDrilldownPort` (naslijeđeni oblik sirove pohrane). Proizvodnja STT i zadržavanje okvira sastavljeni su oko priključka za opis kroz `createVideoSttAdapter` i `createVideoDrilldownAdapter`; potonji koristi zajednički životni ciklus opaque-handle.

Javni `/v1` put zahtjeva nikada ne uvozi niti poziva podproces. Udaljeni video zapisi preuzimaju se ispod granice od 50 MiB ; ugrađeni base64 video zapisi imaju konzervativno ograničenje od 36 MiB dekodiranih po video zapisu tako da model/messages/framing omotnica može ostati unutar ograničenja pristupa javnog JSON zahtjeva od 50 MiB. Umetnuta duljina i procjene dekodirane veličine provjeravaju se prije dodjele. HTTPS je potreban na početnom udaljenom URL u i svakom preusmjeravanju, korištenjem postojećeg javnog samo izlaznog čuvara sa DNS pričvršćivanjem. Bajtovi zatim prelaze točnu internu granicu `POST /api/modality-bridge/video/extract` brokera. Ta ruta je i `LOCAL_ONLY` i `SPAWN_CAPABLE`, prihvaća samo zahtjev provjerene autentičnosti po procesu, pouzdane povratne petlje, i nikada ne prihvaća URL, stazu datotečnog sustava, izvršnu datoteku ili popis argumenata. API cjevovod veličine tijela i inkrementalni čitač tijela rukovatelja neovisno provode ograničenje unosa posrednika od 50 MiB. Njegov ograničeni red čekanja pokreće jedno po jedno izdvajanje, dopušta četiri posla na čekanju i ograničava unos na čekanju na 100 MiB.

Unutar brokera, `ffprobe` čita privatnu lokalnu datoteku; popis dopuštenih fiksnih formata isključuje formate popisa za reprodukciju i manifesta. Za dopuštene spremnike obitelji MOV, vanjske reference MOV podataka ostaju onemogućene prema zadanim postavkama, a fiksna naredba ne uključuje se u njih. I `ffprobe` i `ffmpeg` koriste popis dopuštenih protokola `file` -only, jednu nit, fiksne nizove argumenata, bez ljuske i izvršne datoteke razriješene iz `PATH`. Streamovi naslovnica s priloženim slikama nisu kandidati za reprodukciju. Svi streamovi koji se mogu reproducirati moraju zadovoljiti ograničenja, a prednost se daje eksplicitnom zadanom streamu prije determinističkog zamjenskog indeksa s najnižim indeksom. Videozapisi su ograničeni na 600 sekundi, 8.192 piksela po dimenziji i 33.554.432 izvornih piksela. FFmpeg uzorkuje 1–16 središnjih JPEG okvira, smanjuje dugi rub do najviše 1024 piksela bez povećanja manjih ulaza i nikada ne prima URL. Uzorkovanje je `uniform` prema zadanim postavkama. Opcijska `scene_aware` i eksperimentalna `segment_aware` pravila izvode jedan dodatni fiksni FFmpeg prolaz preko već validiranog lokalnog toka, odabiru ograničene vremenske oznake `showinfo` scene i deterministički se vraćaju na iste uniformne srednje točke u slučaju kvara detektora, vremenskog ograničenja, pogrešnog izlaza ili praznog skupa kandidata. Način rada koji je svjestan segmenta dodjeljuje uzorke sredine proporcionalno potvrđenim intervalima scene; dokazi svjesni segmenta i rezervno ponašanje detaljno su navedeni u nastavku. Čvrsto ograničenje od 16 okvira primjenjuje se nakon odabira u svakoj politici. Kada zahtjev s obzirom na scenu ima samo proračun za jedan okvir, on koristi jedinstvenu središnju točku aktivnog cijelog videa ili fokusnog prozora i izvještava `policyEffective: uniform`: jedan odabrani okvir scene ne može sačuvati oba vremenska kraja. Pozivatelj po izboru može pružiti konačni fokusni prozor (`start`/`end` sekundi); granice su ograničene na trajanje medija, obrnuti ili ne-konačni prozori se odbijaju, a sve politike uzorkovanja izvode se samo unutar normaliziranog intervala. Rezultirajući prozor uključen je u metapodatke uzorkovanja i u nepouzdani prefiks opisa tako da modeli koji slijede mogu razlikovati fokusirani izvadak od pune vremenske trake.

Fokus semantičkog opisa je zasebna, eksplicitna postavka. Zadani način `full` analize čuva postojeći upit okvira i nikada ne prosljeđuje tekst zahtjeva modelu opisa. U načinu rada `focused`, most čita samo najnoviji neprazni `text`/`input_text` koji je autor korisnika iz istog spremnika za razgovor ili odgovore, normalizira ga na NFC, sažima kontrolne znakove i razmake i ograničava na 500 Unicode kodnih točaka. Prazan rezultat vraća se na točan `full` upit. Upotrebljivi savjet je serijaliziran kao JSON u namjenskom bloku konteksta nepouzdanog korisnika i može dati prioritet samo vidljivim detaljima; ne može poništiti zasebno upozorenje protiv slijeđenja uputa vidljivo ili zvučno u medijima. Tekstualni fokus nikada ne zaključuje `start`/`end` niti mijenja vremenski uzorkivač.

#### FU-07 strukturni segmentni dokaz

`segment_aware` koristi jedan ograničeni prolaz prije analize preko već potvrđenog lokalnog video streama. Fiksni lanac filtara najprije skalira na najviše 320 piksela u širinu, detektira promjene scene i zamrznute intervale, a zatim uzorkuje pri 1 sličici u sekundi za informacije o zamućenju, prosječnom svjetlu i spatial/temporal. Prolaz je ograničen na 600 strukturnih uzoraka, jednu FFmpeg/filter nit, isti `file` -only protokol i popise dopuštenih spremnika, 1 MiB granicu izlaza procesa i najviše 30 sekundi unutar brokerovog dijeljenog abort/deadline. Nikada ne prihvaća naredbu, filtar, putanju ili URL iz zahtjeva.

Strukturne vrijednosti su dokaz determinističkog uzorkovanja, a ne razumijevanje semantičkog videa. Oni ne zaključuju subjekte, radnje, opise, govor ili namjere korisnika. Granice scene i zamrzavanja čine segmente; zamrzavanje pokrivenosti, zamućenja, ekspozicije, prostornih detalja i vremenske promjene utječu samo na to kako se raspoređuje postojeći proračun od 1 do 16 okvira. Potpuno zamrznuti segment ograničen je na jedan okvir, dok se nezamrznuti segmenti natječu za preostali proračun. Kada granice nadmašuju broj okvira, zadržava se jednolika pokrivenost vremenske trake tako da brzi rani rezovi ne mogu sakriti dugi segment na kraju. Granice scene unutar rezolucije analize od 1 sekunde granice zamrzavanja se spajaju.

Filtri koji nedostaju, malformed/empty dokazi, pogreška detektora ili ograničeno vremensko ograničenje predanalize ne otvaraju točnu jedinstvenu politiku srednje točke. Rok prekida pozivatelja ili brokera ne otvara se neuspješno: prekida podproces u tijeku, sprječava kasnije izdvajanje okvira, a privatno privremeno stablo se uklanja u `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generira determinističke stvarne FFmpeg fixture za post-dedup caption-call uštede, dense-motion proračunsku alokaciju, blur/exposure/SI-TI dokaze, brze rezove s dugim repom i postupno blijeđenje lažno pozitivnih rezultata. Bilježi vrijeme zida prije analize i, gdje je `/usr/bin/time` dostupan, dijete CPU i vrh RSS. Njegove provjere kvalitete samo su strukturne proročanstva. Prava kvaliteta modela titlova ostaje `HOLD` jer ovaj svežanj nema ovlaštenu krajnju točku ili zamrznutog suca. Novčane uštede također ostaju `HOLD` osim ako `--caption-cost-per-call-usd` ne dostavi eksplicitnu pozitivnu procjenu po pozivu; skripta nikada ne izmišlja nijedan rezultat.

Svaki je okvir ograničen na 4 MiB, svi neobrađeni okviri zajedno na 23 MiB, a serijalizirani posrednički odgovor na 32 MiB. Privatni privremeni direktorij je uklonjen u `finally`. OmniRoute ne spaja FFmpeg i ne prihvaća prilagođeni izvršni put. Prije titlovanja, most primjenjuje konzervativnu propusnicu za vizualnu deduplikaciju: svaki JPEG smanjuje se na međuspremnik od 16 × 16 u sivim tonovima i uspoređuje se samo s posljednjim zadržanim okvirom. Za traženi proračun titlova iznad jednog okvira, izdvajanje daje ograničeni skup kandidata do dvostruko većeg proračuna i nikad više od 16 okvira. Zahtijevano ograničenje primjenjuje se samo nakon deduplikacije, pri čemu se prvi i posljednji odabrani kandidati čuvaju tijekom konačnog prorjeđivanja kada je proračun najmanje dva. Politika verzioniranog `grayscale-16x16-mean-cells-v2` koristi veću vrijednost od srednje luma delta i omjera sličica ćelija čija je normalizirana delta najmanje 0,05. Duplikat praga je konstanta 0,04, odabrana radi predvidljivosti, a ne izložena kao postavka vremena izvođenja. Ovaj sekundarni signal visokog kontrasta čuva male pokrete i vidljive promjene teksta koje usporedba samo srednje vrijednosti može sakriti. Greške komparatora ili dekodera ne mogu se otvoriti i zadržati pokrivenost. Izlazni metapodaci odvajaju ekstrahirane kandidate, uspješno iskorištene okvire i ispuštene vizualne duplikate.

Izričito označen video dio može zahtijevati kontaktni list s vremenskom oznakom. Most gradi najviše JPEG mrežu od 4 stupca i 16 okvira. Svaka ćelija od 512 piksela snima svoju izvornu vremensku oznaku u donji pojas visokog kontrasta, dok iste vremenske oznake ostaju u tekstualnim metapodacima za nizvodno povezivanje i reviziju. Kompletan JPEG ostaje ograničen na 32 MiB. Ako `sharp` ne može dekodirati ili sastaviti mrežu, most se vraća na pojedinačne JPEG okvire; klijentski prekid i dalje se širi kroz operaciju lista.

Dokazi o promicanju namjerno su odvojeni od mikrobenchmarka sintetičkog sastava. `scripts/perf/video-bridge-contact-sheet-eval.ts` definira A/B snop s verzijom sheme za stvarne OpenAI-kompatibilne modele vida. Mjeri tokene koje je prijavio pružatelj usluga, latenciju zida od kraja do kraja (uključujući sastav lista), broj poziva modela i zadržavanje činjenica definiranih manifestom. Neobrađeni odgovori modela ne upisuju se u izvješće; zadržavaju se samo SHA-256 sažetci i podudarna činjenica IDs. Kabelski svežanj ne upućuje mrežni ili plaćeni model poziva osim ako se ne prođe `--execute-real` i `--model`, `OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY` nisu konfigurirani. Bez tog eksplicitnog stvarnog pokretanja, njegova strojno čitljiva presuda ostaje `HOLD`; sintetička payload/call-count mjerenja sama po sebi nisu dokaz promocije.

Odvojeni `scripts/perf/video-bridge-promotion-eval.ts` troši FU-07 ili FU-09 promatranja. Ulazak u promociju zahtijeva svih osam vrsta sintetičkih scenarija plus dezinficirani pravi isječak, najmanje tri izmjerena ponavljanja po ulozi i slučaju, svih deset deklariranih metrika, smrznute sažetke media/prompt/expected-fact/settings, jedinstveno opažanje IDs i verificirani redoslijed postavljenog A/B. Potvrda o izvršenju veže sažetak korpusa, točan SHA kandidata i reviziju modela. Nedostajuća ili nevažeća mjerenja ostaju `HOLD`, uključujući CPU iznad 30 s, vršni RSS iznad 512 MiB ili predanalizu iznad 30 s. Ovo su ograničenja za pristup dokazima, a ne novo jamstvo provedbe RSS a.

FU-07 zahtijeva najmanje 98% zadržavanja kvalitete i latenciju p95 ne više od 1,2x osnovne vrijednosti, plus ili 0,05 apsolutno poboljšanje srednje vrijednosti prisjećanja ujednačeno s malim i malim slovima pri ekvivalentnim srednjim pozivima naslova ili najmanje 10% manje srednjih poziva titlova nakon uklanjanja. FU-09 zahtijeva najmanje 0,85 kvalitete, 95% zadržavanja, 20% srednjeg smanjenja latencije i 10% smanjenja tokena. Gubitak kritičnih činjenica, usklađenost s ubrizgavanjem ili neuspjeh u korištenju sprječava napredovanje. Jedno izvršenje ne može promovirati ništa: `--previous-report` potvrđuje dva različita, koja se ne preklapaju, uzastopno prihvatljiva izvršenja istog policy/model revision/candidate/corpus. Eksperiment uzorkovanja ne može potvrditi eksperiment kontaktnog lista.

Sakupljači bi trebali zabilježiti odgovore u memoriji i spremiti `responseDigest` plus metriku i obvezivanja promatranja, nikad tekst odgovora. Potrošač također čita naslijeđena neobrađena opažanja, ali nikada ne kopira taj tekst u svoja izvješća. Točno jedan od `responseDigest` ili `rawResponseText` prihvaća se za svako opažanje. Popis dopuštenih s verzijom ostaje prazan s nepromjenjivom zadanom postavkom `hold`. Prihvatljivi unos zahtijeva svoju referencu dokaza, politiku, reviziju modela, točan kandidat SHA, sažetak manifesta i dva različita izvođenja IDs; konfliktni konteksti se odbacuju. Ovi metapodaci su revizijski ugovor, a ne dokaz da referentna datoteka sadrži autentična mjerenja. Pregledajte stvarne račune prije dodavanja bilo kojeg unosa. Krajnja točka statistike upravljanja i video nadzorna ploča pokazuju konzervativnu spremnost. Konfigurirani pseudonim modela sam po sebi ne uspostavlja njegovu reviziju ili pokrenutog kandidata SHA, tako da trenutna kontrolna ploča prijavljuje `HOLD` umjesto ponovnog korištenja podobnosti iz drugog konteksta izvršenja. Eksplicitna eksperimentalna selekcija ostaje odvojena od promocije; nijedna zadana vrijednost se automatski ne mijenja.

Pozivatelji mogu priložiti izborno `transcript.cues` polje podržanom video dijelu kada već posjeduju poravnati tekst. Svaki znak mora sadržavati `text`, konačni interval `start`/`end` unutar ispitivanog trajanja, i `source` na popisu dopuštenih (`client`, `embedded` ili `audio-bridge`); `confidence` je zadana vrijednost `1` i mora ostati između `0` i `1`. Točni duplikati znakova su sažeti. OmniRoute nikada ne započinje transkripciju iz ovih metapodataka: potvrđeni znakovi kopiraju se u opisani rezultat s izvorom, pouzdanošću i intervalom te se prikazuju kao nepouzdana opažanja uz naslove okvira. Nevažeći tekst, tekst izvan raspona ili tekst bez porijekla odbija se umjesto da se miješa u tok opisa. Oba kanala prijepisa tijela zahtjeva normaliziraju isporučeno porijeklo na `client`, uključujući samopotvrđene `embedded` ili `audio-bridge` oznake. Samo adapter u vlasništvu poslužitelja može dodijeliti te pouzdane oznake kroz argument `trustedSource` samo koda; polje zahtjeva JSON ne može doći do tog argumenta. Tekst prijepisa ostaje nepouzdan medijski sadržaj, bez obzira na njegovo podrijetlo, i nikada ne smije odrediti autorizaciju.

Napredni pozivatelj može dati `audioTranscript` zapis za isti video; tretira se kao tekst koji dostavlja klijent, a ne kao dokaz transkripcije poslužitelja. Fusion seam izvodi vizualna i audio promatranja pod jednim signalom roka i prekida, raspoređuje ih na zajedničkoj vremenskoj liniji, sažima točne duplikate i prijavljuje djelomični rezultat kada samo jedna strana uspije. Nevažeći `audioTranscript` degradira na taj djelomični rezultat — vizualni opis se zadržava, a audio grana bilježi dezinficirani kod greške — umjesto neuspjelog cijelog videa. Dostupnost po granama, djelomična zastavica i dezinficirani kodovi kvarova sačuvani su u opisanom rezultatu, u metapodacima zaštitne ograde (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), u metapodacima predmemorije rezultata i u brojačima fuzije mosta. Zadana staza Video Bridgea ne poziva govor u tekst niti preuzima drugu medijsku kopiju; bez te eksplicitne pjesme, ostaje samo video.

**Zadržavanje prijepisa (#12150 P1).** Ovo se automatski primjenjuje kad god Video Bridge (sam uključen) renderira prijepis cue — nema zasebne oznake zadržavanja. Kada zahtjev renderira bilo koji znak prijepisa ( `transcript` koji je deklarirao pozivatelj ili spojeni `audioTranscript`), zaštitna ograda ga označava `videoBridgeObserved` i proizvodi redigiranu sjenu opisa videozapisa — identično prikazivanje u kojem je tijelo slobodnog teksta svakog znaka zamijenjeno `[redacted-video-transcript]`, izgrađeno zamjenom polja strukturiranog znaka prije sastavljanja niza (nikada raščlanjivanjem spljoštenog teksta, tako da ne cue sadržaj — kontradiktoran ili običan, uključujući tijela koja sadrže `]` kao što su `[inaudible]`/`[music]` — mogu preživjeti). Stalno tijelo zahtjeva za dnevnik poziva mijenja svaki dio teksta izvedenog iz videa za tu redigiranu sjenu, usklađenu jednakošću sadržaja; `fullText` sidro se ponovno čita iz dovršenog korisnog opterećenja zaštitne ograde prije poziva, tako da podudaranje i dalje uspijeva nakon što kasnije lančane zaštitne ograde ( PII i maskeri vjerodajnica, prioriteti 10/95) prepisuju tekst opisa na mjesto i nakon ubacivanja system-prompt/handoff/memory preoblikuju niz poruka. Tijelo poslano uzvodno do modela je nepromijenjeno. Promatrani zahtjev također ne popunjava trajnu memoriju (i ekstrakcija izvedena iz zahtjeva i odgovora se preskače), tako da vlastiti odgovor modela ne može ponoviti tekst prijepisa u memoriju.

**Neobrađena video polja (#12430).** Kada je most omogućen, a izvorna video podrška je nepoznata ili odsutna, definirana polja `transcript`/`audioTranscript` također aktiviraju `videoBridgeObserved`, čak i nakon neuspjelog opisa ili ograničenja `maxVideos`. `null` i prazni nizovi broje; odsutna polja i ne-video metapodaci ne. Zadržane kopije redigiraju ova polja ili izostavljaju zahtjev, a caches/Memory se zaobilaze.

Na tim zamjenskim putovima valjani znakovi pozivatelja postaju podržani `text`/`input_text` dijelovi umjesto nestandardnih polja pružatelja usluga. Obje staze dostavljene zahtjevom ostaju nepouzdana `client` opažanja, s izričitim upozorenjem da video nije opisan i da vremenske oznake nisu provjerene u odnosu na medije. Postojeći ukupni 256-cue/64-KiB proračuni i proračuni po znakovima primjenjuju se na dvije staze zajedno; vremenske oznake moraju odgovarati brokerovoj gornjoj granici od 600 sekundi i bilo kojem isporučenom fokusnom prozoru. Nevažeći zapisi se odbacuju, ne prosljeđuju kao proizvoljni tekst; važeći brat ili sestra još uvijek se može koristiti osim ako njihov zajednički proračun nije premašen. Null/empty polja ne dodaju tekst. Ova zamjena ne dodaje nikakvo dohvaćanje medija ili transkripciju. Polja proširenja prijepisa uklanjaju se iz zamjenskog video nosača i njegovih `video_url`/`source` objekata. Popis dopuštenih OpenAI žica ostaje strog; nepoznati izvorni video nosači ostaju dostupni, a poznati samo tekstualni ciljevi čuvaju sigurne oznake. Strukturirane sjene redakcije štite priloženi tekst prijepisa, dok izvorni zahtjev u vlasništvu pozivatelja ostaje nepromijenjen. Nativno podržani ciljevi i onemogućeni mostovi zadržavaju svoje postojeće ponašanje zaobilaženja.

Dodatne zadržane kopije koriste isti signal promatranog zahtjeva. Neobrađena snimka zahtjeva klijenta prije zaštitne ograde, zahtjev na čekanju u memoriji i zapisnik ranog odbijenog zahtjeva strukturalno zamjenjuju polja transkripta u video dijelovima; string promptovi sintetizirani fazama cjevovoda i predaja konteksta se redigiraju na persisted-request-body sink. Trajni `video_content_removed` marker čini `previous_response_id` nastavak neuspješnim zatvaranjem umjesto da rekonstruira tekst koji je namjerno odbačen. Ako promatrani zahtjev izgubi svoju redigiranu sjenu po dijelu prije zapisivanja ili se čak jedna od nekoliko video sjenki ne uspije podudarati nakon kasnijih mutacija zahtjeva, zadržano tijelo zahtjeva potpuno se izostavlja umjesto zadržavanja djelomično redigiranog transkripta.

Za promatrani zahtjev, model odgovora može citirati bilo koji dio transkripta bez strukturirane granice znakova. Njegov ustrajni zapisnik poziva `responseBody` stoga je zamijenjen markerom za izostavljanje; detaljni artefakt cjevovoda (koji može uključivati upstream/client tijela i dijelove toka) nije zadržan. Semantička predmemorija, predmemorija idempotencije i reprodukcije rezoniranja zaobilaze čitanje i pisanje za taj zahtjev. Zahtjev pružatelja i odgovor vidljiv klijentu ostaju nepromijenjeni. Rani bajtovi za održavanje aktivnosti ispuštaju se iz privremenog međuspremnika kada se detaljni artefakt izostavi. Kiro-ovo krivo oblikovano upozorenje EventStream prijavljuje samo broj bajtova korisnog opterećenja, nikad njegov sadržaj ili sirovu pogrešku JSON parsera. Ovo ne tvrdi da je svaka nepovezana provider/plugin dijagnostika revidirana; širi pregled zadržanog sudopera prati se u #11658.

Unutarnji `/api/modality-bridge/video/drilldown` životni ciklus je zaseban, loopback/token-authenticated supstrat predmemorije. Svaka operacija također zahtijeva kanonski neprozirni principal ID. Prije nego što se produkcijski pozivatelj omogući, on mora izvesti taj ID od autentificiranog stanara i nikada ne smije proslijediti vrijednost koju je odabrao klijent. Ključevi predmemorije povezuju tog principala s kanonskom sesijom i video-referencom IDs, pohranjuju samo svoje SHA-256-derived ključeve i obuhvaćaju i čitanje i brisanje na istom principalu. Predmemorija pohranjuje najviše 16 izvedenih JPEG okvira po unosu, istječe im nakon deset minuta i podržava ograničena `start`/`end` čitanja ili eksplicitno brisanje sesije.

Svaki principal ograničen je na 16 unosa i 64 MiB kanonskih JPEG podataka. Ta su ograničenja neovisna o globalnoj gornjoj granici 64-entry/256 MiB : pritisak na kvotu principala izbacuje samo najmanje nedavno korištene unose tog principala prije nego što se razmotri globalno izbacivanje LRU. Istekli unosi brišu se iz glavnog i globalnog računovodstva aktivnosti predmemorije, dok otkazivanje i neuspjeh provjere valjanosti ne obvezuju djelomičnu zamjenu.

Predmemorija odbija nekanonski Base64, višak ispune, medije koji nisu JPEG, neispravno oblikovane ili skraćene JPEGs i JPEGs koji proizvode upozorenje tijekom ograničenog `sharp` dekodiranja pune slike. Ponovno kodira svaku prihvaćenu sliku kao kanonski JPEG, izvodi širinu i visinu iz dekodiranih bajtova umjesto da vjeruje poljima pozivatelja i odbacuje sve poliglotne bajtove na kraju umjesto da ih zadržava. Samo ograničeni kanonski komprimirani međuspremnik naplaćuje se za obje kvote. Ograničenje JSON žice uključuje Base64 nadopterećenje za strop dekodiranog ulaza od 32 MiB. Svaka pohranjena derivacija bilježi svoj potvrđeni JPEG format/resolution, politiku uzorkovanja, verziju derivacije, vrijeme stvaranja, hash sadržaja koji je izračunao poslužitelj i hashiranu nadređenu referencu plus hash nadređenog sadržaja pouzdanog pozivatelja. Otkazivanje se provjerava između asinkronih decode/hash faza prije predaje atomske predmemorije.

Producent ponovno koristi već izvedene brokerske okvire samo nakon uspješne vizualne analize, bez drugog video download/extraction. Zahtijeva operator `modalityBridgeVideoDrilldownEnabled=true`, strogi po dijelu `drilldown: true` i autentificirani zapis API-ključa ID. principal/session vrijednosti koje je deklarirao klijent nikada ne uspostavljaju vlasništvo. Bez sva tri uvjeta ne hashira, ne mijenja veličinu niti zadržava dodatne okvire. Neuspjeh zadržavanja čuva upotrebljiv vizualni odgovor. Zahtjevi s pristankom zaobilaze predmemoriju rezultata cijelog videozapisa tako da se predmemorirani rezultati nikad ne reproduciraju.

Uspješni JSON i SSE odgovori izlažu najviše četiri neprozirne ručice u ograničenom `x-omniroute-video-drilldown` zaglavlju. Ovlašteni izvori preglednika mogu čitati to zaglavlje bez proširenja pravila izvora CORS. Nove oznake koriste `v1.<32-byte random base64url token>`, a registar zadržava samo njihove SHA-256 hashove. reader/header parser također prihvaća naslijeđene 64-heks tokene. Autentificirani javni potrošač je `GET /api/v1/video-bridge/drilldown?handle=...`, neovisno gazira `modalityBridgeVideoDrilldownRemoteEnabled=true`. Eksplicitno persisted false opoziva pristup čak i kada je omogućeno naslijeđeno `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env backback. Zadržavanje proizvodnje ima analogni naslijeđeni `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` backback. Oba zamjena prema zadanim su postavkama isključena.

Potrošač izvodi vlasništvo iz provjerenog ključa i primjenjuje politiku ključa: i GET i DELETE pripadaju kategoriji krajnjih točaka `video`, uključujući pseudonime `/v1` i `/api/v1`. Ključevi s nepraznim popisom dopuštenih krajnjih točaka moraju uključivati `video`; neograničeni ključevi ostaju kompatibilni. Potrošač vraća isti 404 za nepoznate, istekle i druge ključeve. Prihvaća `variant=preview|standard|detail` (maksimalna JPEG dimenzija 320/640/1280, nikad se ne povećava), `limit=1..8` (ili naslijeđeni alias `frames`, nikad oboje), `page` baziran na nuli i izborne sekunde fokusa `start`/`end`. Dvostruki ključevi upita i prozori s obrnutim fokusom se odbijaju. Svaka vraćena varijanta ima hash stvarnog sadržaja i stvarne metapodatke razlučivosti, povezane s zadržanim izvorom. Varijante se izvode čitanjem, a ne pohranjuju kao dodatne zadržane kopije. Odgovor JSON, uključujući Base64/envelope, ograničen je na 32 MiB; prevelika stranica vraća 413 i klijent mora zahtijevati manje okvira. Čita poništavanje provjere oko svake promjene veličine i ponovno provjerava valjanost ručke prije povratka. `DELETE` po vlasniku je idempotentan; brisanje ili istek TTL a oslobađa zadržani izvor i računovodstvo upotrebe.

Dijeljena pohrana je lokalna za proces: ručke istječu nakon ponovnog pokretanja i ne mogu se prenositi između neovisnih OmniRoute procesa. Upravljačka statistika izlaže učinkovitu politiku zadržavanja/daljinu i agregira samo zadržani entries/bytes, nikada medije, reference, glavni IDs ili ručke. Ploča postavki videozapisa prikazuje te vrijednosti i može zadržati oba prekidača pristanka. Ova implementacijska dokumentacija nije dokaz aktivne implementacije ili promicanja; prihvaćanje stvarnog modela prati se zasebno.

Okviri su uzastopno označeni s konfiguriranim Video modelom. Prazno video nadjačavanje nasljeđuje postavku Vision; ako su oba prazna, automatski usmjerivač Vision odabire efektivni model sposoban za vid. Uspješni opisi zamjenjuju izvorni dio stabilnim `[Video description:` prefiksom koji također označava tekst kao nepouzdano opažanje izvedeno iz medija i govori daljnjim modelima da ne slijede upute iz medija. Ključevi predmemorije naslova okvira uključuju JPEG bajtove, prompt, vremensku oznaku i efektivni model; predmemoriraju se samo uspješni opisi. Unosi u predmemoriju zadržavaju stvarni uspješni model proizvođača, uključujući rezervni model; most javlja `mixed` kada su različiti modeli proizveli različite okvire. Pogodak predmemorije ponovno koristi taj identitet proizvođača umjesto da ga ponovno označi kao traženi plan usmjeravanja. Predmemorija rezultata cijelog videozapisa unesena je na svaki ulaz koji mijenja izlazni — odzivnik, efektivni model, politiku uzorkovanja, broj okvira, način semantičke analize, SHA-256 otisak prsta normaliziranog savjeta fokusa, prozor fokusa, `transcript`, `audioTranscript` i zastavu kontaktnog lista — tako da je promjena bilo koje od tih dimenzija promašaj predmemorije, a nikad ustajala ponovna upotreba. Verzija pravila vizualnog dedupiranja, prag i ograničeni broj okvira kandidata također su eksplicitni u ključu predmemorije rezultata i metapodacima; promjena pravila stoga ne može ponovno upotrijebiti zastarjeli opis cijelog videozapisa. Metapodaci Result-cache v4 čuvaju način rada i otisak prsta, nikad neobrađeni korisnički zadatak. Metapodaci o zaštitnoj ogradi izvještavaju o traženim i učinkovitim načinima analize; traženi `focused` način rada bez upotrebljivog korisničkog teksta prijavljen je kao efektivni `full`.

Zaštitna ograda izvlači svaki podržani video dio, ali ne opisuje više od `modalityBridgeVideoMaxVideos`. Za metu za koju je dokazano da ima `supportsVideo === false`, neuspješni i prekoračeni videozapisi postaju eksplicitni sigurni tekstualni markeri tako da nijedan sirovi video ne preživi. Kada je sposobnost nepoznata, ti dijelovi zadržavaju svoj video nosač; svaki zamjenski prijepis slijedi gornju konverziju ograničenog teksta. Mete sa `supportsVideo === true` zaobilaze most. Signal prekida zahtjeva klijenta širi se kroz preuzimanje, brokerski red čekanja, podprocese i pozive naslova; prekida zaustavljanje između videozapisa i nikad se ne otvara za sirove medije.

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

Naslijeđene postojane vrijednosti vremenskog ograničenja videozapisa iznad 120 sekundi pričvršćuju se na rok posrednika; nove postavke upisa iznad te granice se odbijaju. `GET /api/modality-bridge/video/runtime` zahtijeva pouzdani žigosani lokalitet povratne petlje prije autentifikacije ili ispitivanja vremena izvođenja, zatim zahtijeva autentifikaciju upravljanja. Vraća samo `available`, pročišćene FFmpeg/ffprobe verzije i fiksni razlog kada je runtime nedostupan. Interna krajnja točka ekstrakcije nije javni prijenos API: zasićenost reda čekanja vraća `503` plus `Retry-After`, prekid veze pozivatelja vraća `499`, a fiksni rok posrednika vraća `504`. Pretvoreni odgovori dodaju `video->text;model=<visionModel>;parts=<videos>` središnjem `x-omniroute-modality-bridge` zaglavlju bez uklanjanja vidnih ili audio segmenata.

### PII masker (`piiMasker.ts`)

Radi dalje** oba** faze.

- **`preCall`** klonira korisni teret, hoda `system`, `messages`, `input` i `prompt` (uključujući obične stavke niza) i primjenjuje `processPII()` (iz `@/shared/utils/inputSanitizer`) na polja niza `content`/`text`. Kada je `PII_REDACTION_ENABLED=true`, otkriveni PII se redigira u izlaznom sadržaju. Ovo je neovisno o `INPUT_SANITIZER_MODE` (koji kontrolira samo politiku brzog ubacivanja). Kada je redigiranje isključeno, otkrivanje zapisa poziva računa se bez ponovnog pisanja sadržaja.
- **`postCall`** duboko klonira odgovor, pokreće `sanitizePIIResponse()` plus Responses-API-shape masker (`maskResponsesOutput` — pokriva `output_text` i `output[].content[].text`). Ako dođe do bilo kakvog uređivanja, modificirani odgovor zamjenjuje izvornik.

Zaštitna ograda nikada ne blokira; samo označava (`meta.detections`, `meta.redacted`) ili prepisuje.

**Reverzibilni trezor (`PII_REVERSIBLE_VAULT_ENABLED`, zadano `false`).** Kada su i `PII_REDACTION_ENABLED` i `PII_REVERSIBLE_VAULT_ENABLED` uključeni (DB nadjačava > env > default, čita jednom po zahtjevu), `handleChat` otvara jedan trezor po zahtjevu klijenta (`src/lib/pii/requestTokenVaultScope.ts`) i prosljeđuje ga prolazu prije poziva kao `GuardrailContext.tokenVault`. Maskir zatim piše zamjenske tokene kao što je `<<PII_EMAIL_QWERTYUI_1>>` umjesto `[EMAIL_REDACTED]`, za ugrađena, potvrđena (GDPR/POPIA) i prilagođena pravila. Nonce je 8 nasumičnih velikih slova po zahtjevu, a ista vrijednost dobiva isti token unutar zahtjeva. Samo masker mints: prompt-injection guard i `/api/guardrails/test` rade bez trezora i zadržavaju rezervirana mjesta.

- Pružatelj, svaka kombinirana etapa, ponovni pokušaj, član fuzijskog panela i fuzijski sudac vide samo tokene. Tokeni se vraćaju jednom, na 2xx odgovor koji ostavlja `handleChat`: po polju na raščlanjenom SSE (token podijeljen na događaje i dalje se rješava; argumenti poziva alata su JSON-escaped) ili po polju na JSON tijelu, s ponovno izračunatim `Content-Length`. Vraćaju se tekst sadržaja i obrazloženja te argumenti poziva alata. Tijela pogrešaka (4xx/5xx) čuvaju žetone.
- Neuspjesi ostaju privatni: ako kovanje ne uspije ili trezor odbije vrijednost (1000 unosa, 256 znakova po vrijednosti, ukupno 64 KB ), mjesto se piše umjesto njega; token koji trezor ne može razriješiti ili vraćanje koje ne uspije, ostaje doslovno i bilježi se samo broj. Trezor nema mjerače vremena niti globalno stanje; briše se kada tok odgovora završi, poništi se ili dođe do pogreške.
- Kada zahtjev iskuje tokene, ekstrakcija memorije, spremanje idempotencije i oba pisanja u semantičku predmemoriju se preskaču, jer nijedan kasniji zahtjev ne može riješiti te tokene. U zapisima poziva zahtjev i odgovor pružatelja nose tokene; zabilježeno tijelo zahtjeva klijenta još uvijek je neobrađeni unos klijenta, kao kod običnog uređivanja.
- Tokeni koriste nasumični nonce po zahtjevu, tako da se prefiks upita mijenja na svakom koraku: predmemoriranje upita na strani pružatelja ne pogađa za maskirane redove, a token koji se vrati u kasnijem redosljedu (na primjer putem `previous_response_id`) pripada starom zahtjevu i ostaje doslovan.

#### Odabir po vrsti, prilagođeni uzorci i brojači detekcije

**Nadzorna ploča → Postavke → Sigurnost → PII maskiranje** bira _što_ je maskirano. Ne uključuje maskiranje: to je i dalje `PII_REDACTION_ENABLED` (zahtjev) i `PII_RESPONSE_SANITIZATION` (odgovor + SSE), oba isključena prema zadanim postavkama.

- **Odabir po vrsti** — ugrađeni ID-ovi navedeni su u `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nepostavljeno znači svaku vrstu (ponašanje prije postojanja ove postavke). Uzorak `ssn_us` stroja zahtjeva preslikava se u `ssn`. Predlošci (minimalni, standardni, financijski, brazilski, USA, GDPR, POPIA, puni) ispunjavaju samo potvrdne okvire u UI.
- **GDPR i POPIA identifikatori** — dvanaest ugrađenih ID-ova koji pokrivaju EU i južnoafričke osobne identifikatore (tablica u nastavku). Njihovi regularni izrazi, validatori i oznake nadležnosti žive u jednoj tablici, `src/shared/utils/piiPatterns.ts`, koju koriste i dezinfekcija odgovora (`src/lib/piiSanitizer.ts`) i masker zahtjeva (`src/shared/utils/inputSanitizer.ts`). Podudaranje se redigira samo kada ga validator prihvati; goli niz znamenki nikada nije dovoljan. Operator koji je spremio suženi odabir prije nego što su ovi ID-ovi postojali zadržava ponašanje koje je imao dok se ne označi novi ID.
- **Prilagođeni uzorci** — do 20 uzoraka regularnih izraza ili zamjenskih znakova (`*` = do 64 znaka koji nisu razmaci, `?` = jedan). Šibice postaju `[CUSTOM_REDACTED]`. Svaki uzorak prolazi kroz `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): najviše 500 znakova, zastavice ograničene na `g i m s u`, moraju se kompilirati, moraju proći `safe-regex` (katastrofalno praćenje unazad) i ne smiju odgovarati praznom nizu ili rezerviranom mjestu za redigiranje. Uzorak koji ne uspije odbija se prilikom spremanja i testiranja, a pohranjeni redak koji ne uspije preskače se tijekom izvođenja umjesto da se kompajlira. Prilagođeni uzorci pokreću se samo dok je uključeno maskiranje.
- **Brojači detekcije** — po tipu broji (nikad usklađene vrijednosti), čuva se u memoriji i resetira pri ponovnom pokretanju (`src/lib/pii/piiDetectionStats.ts`). Povećavaju se samo dok je maskiranje uključeno.

Postavke žive u `key_value` tablici (namenski prostor `pii_settings`, `src/lib/db/piiSettings.ts`) i čitaju se kroz predmemoriju od 1 s. API:

| metoda | Put                      | Svrha                                                                   |
| ------ | ------------------------ | ----------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stanje zastave, `enabledTypes`, `customPatterns`, brojači detekcije     |
| `PUT`  | `/api/settings/pii`      | Zamijenite `enabledTypes` (`null` = sve) and/or `customPatterns`        |
| `POST` | `/api/settings/pii/test` | Ispitajte jedan uzorak na uzorku od najviše 8 KB; ništa nije pohranjeno |

Sva tri zahtijevaju autorizaciju upravljanja i provjeru valjanosti tijela pomoću Zod (`src/shared/validation/schemas/piiSettings.ts`). S onemogućenom prijavom (`requireLogin=false`) `GET` i testna krajnja točka su otvoreni, ali `PUT` i dalje treba sesiju nadzorne ploče, `manage` -scope API ključ, `oma_` pristupni token s opsegom pisanja ili višim ili CLI token ili token interne usluge poslan iz povratne petlje.

#### GDPR (EU) i POPIA (Južna Afrika) identifikatori

| Id                  | Identifikator             | Validacija                                                                            |
| ------------------- | ------------------------- | ------------------------------------------------------------------------------------- |
| `iban`              | IBAN                      | Poznata država, točna dužina za tu zemlju, ISO 13616 MOD-97-10                        |
| `eu_vat`            | EU VAT broj               | Poznati prefiks države članice i format broja te države (bez traženja VIES )          |
| `es_dni_nie`        | španjolski DNI / NIE      | Kontrolno slovo (vrijednost mod 23); NIE je `X/Y/Z` + 7 znamenki                      |
| `it_codice_fiscale` | talijanski Codice Fiscale | Kontrolno pismo iz tablica položaja odd/even                                          |
| `pl_pesel`          | poljski PESEL             | Ponderirani kontrolni zbroj i kodirani datum rođenja koji postoji                     |
| `nl_bsn`            | nizozemski BSN            | 11-dokaz (težine 9..2, -1)                                                            |
| `de_steuer_id`      | njemački Steuer-ID        | ISO 7064 Mod 11,10 plus pravila o strukturi znamenki (bez vodeće 0)                   |
| `se_personnummer`   | švedski personnummer      | Luhn preko zadnjih deset znamenki i mogući datum rođenja (10 ili 12 znamenki)         |
| `za_id`             | Južnoafrički ID broj      | Luhn preko svih 13 znamenki, važeće rođenje month/day, znamenka državljanstva 0 ili 1 |
| `za_phone`          | Južnoafrički telefon      | `+27` / `27` prefiks ili nacionalni `0..` oblik napisan s razmakom ili crticom        |
| `za_vat`            | Južnoafrički VAT broj     | 10 znamenki koje počinju sa `4`** i** "VAT" / "BTW" u 48 znakova prije                |
| `za_tax_ref`        | Južnoafrički porezni ref. | 10 znamenki koje počinju `0`-`3`, Luhn,** i** "porez" / "SARS" u 48 znakova prije     |

Budući da su samo znamenkasti formati u sukobu s brojevima narudžbi, brojevima izrade i vremenskim oznakama, oni najslabiji (`za_vat`, `za_tax_ref`) trebaju ključnu riječ, a goli deseteroznamenkasti `0..` broj ne tretira se kao južnoafrički telefonski broj. Razmaknuti IBANs (`GB29 NWBK ...`) se ne podudaraju. Na stazi strujanja znak se traži samo unutar trenutnog dijela. ID-ovi su ispred generičkih telefonskih uzoraka, tako da potvrđeni identifikator zadržava vlastito rezervirano mjesto (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Predlošci `gdpr` i `popia` odabiru EU i južnoafrički ID redom. Samo maskiranje ostaje uključeno (tvrdo pravilo #20): ništa ovdje ne mijenja zadanu zastavu značajke.

### Brzo ubrizgavanje (`promptInjection.ts`)

Otkriva kontradiktorne strukture u sadržaju koji dostavljaju korisnici i provodi konfiguriranu politiku. Ponašanje je vođeno varijablama okoline i opcijama konstruktora:

| Postavka      | Env var                                                                                               | Zadano | Učinak                                                                                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Omogućeno     | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | Kada je `false`, zaštitna ograda dolazi do kratkog spoja.                                                                                                                                        |
| Način rada    | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | Politika ubrizgavanja: `block`, `warn` ili `log`. (`redact` je prihvaćen za back-compat ali ne** ne** strip injekcijski tekst; zahtjev za prepisivanjem PII kontrolira `PII_REDACTION_ENABLED`.) |
| Blokiraj prag | `blockThreshold` opcija / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Minimalna ozbiljnost potrebna za blokiranje. Medij je prema zadanim postavkama samo promatranje.                                                                                                 |

**Prednost načina rada** (`getMode`): pozivatelj `options.mode` → `INJECTION_GUARD_MODE`**DB nadjačavanje zastavice značajke** (Nadzorna ploča → Postavke → Oznake značajki) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Nadjačavanje nadzorne ploče stoga pobjeđuje nad env vars, tako da zastavice značajki UI kontroliraju live guard (bez ponovnog pokretanja). Čitanje DB je sigurno od grešaka: ako dođe do pogreške, čuvar se vraća na ponašanje temeljeno na env-u, a kada nije postavljeno nadjačavanje, ponašanje je identično razlučivosti samo env-a.

Izvori otkrivanja:

1. `sanitizeRequest()` od `@/shared/utils/inputSanitizer` (zajednički skup detektora koji se koristi drugdje u cjevovodu).
2. Ugrađeni `DEFAULT_GUARD_PATTERNS` (trenutno `system_override_inline` i `markdown_system_block`, oba `high` ozbiljnosti).
3. Izborni `customPatterns` proslijeđen putem opcija konstruktora (nizovi, regex ili `{ name, pattern, severity }` zapisi).

Kada `mode === "block"`** i** barem jedno otkrivanje zadovoljava prag ozbiljnosti, `preCall` vraća `{ block: true, message: "Request rejected: suspicious content detected" }`. U načinima `warn`/`log` zaštitna ograda bilježi, ali dopušta poziv. Zajednički pomoćnik `evaluatePromptInjection()` također se izvozi za pozivatelje koji trebaju procijeniti upite bez prolaska kroz registar.

**Veza skeniranja (v3.8.20):** detektor samo pregledava** prvih 16 KB** spojenog teksta upita — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajta) u `src/shared/utils/inputSanitizer.ts`. I `detectInjection()` i `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` prije pokretanja petlje uzorka. Injection direktive nalaze se pri vrhu unosa, tako da ovo ograničava regex CPU/GC na korisnim učitavanjima od više stotina KB bez slabljenja detekcije (usp. #3932, #4041).

### Maska za vjerodajnice (`credentialMasker.ts`)

Radi dalje** oba** faze, posljednje u zadanom lancu (prioritet `95`). Rediguje dobro poznate uzorke ključa API-ja/tajnog tokena iz izlaznog sadržaja (sadržaj poruke, argumenti poziva alata, rezultati alata)** i** odgovor davatelja, tako da vjerodajnica zalijepljena u upit (ili vraćena rezultatom alata) ne procuri do uzvodnog davatelja ili natrag do klijenta.

- **Samo uključivanje** , ista konvencija kao PII redakcija (Hard Rule #20-susjedna): onemogućeno osim ako `settings.credentialRedactionEnabled === true`** ili** `CREDENTIAL_REDACTION_ENABLED=true`. Kada je isključena, zaštitna ograda je bez operacije — nikada ne blokira i nikada ne prepisuje.
- `redactCredentials()` hoda cijelim payload/response stablom (`walkValue()`, prototype-pollution-safe, cycle-safe via `WeakSet`) i zamjenjuje podudaranja `[REDACTED:<type>]` rezerviranim mjestom, klonirajući samo grane koje su se stvarno promijenile.
- `CREDENTIAL_PATTERNS` pokriva ključeve LLM pružatelja usluga (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokene (GitHub, Slack, Linear, Notion, npm, Postman, Discord), ključeve plaćanja (Stripe, Square), ključeve oblaka (AWS pristupni ključ, Twilio, SendGrid, Mailgun), privatni ključevi / JWTs, nizovi veze koji nose vjerodajnice (`mongodb://user:pass@...`, itd.) i generički uzorak vrijednosti zaglavlja `Authorization`/`x-api-key`/`api-key`/`apikey`. Ključevi u obliku zaglavlja (`authorization`, `x-api-key`, `api-key`, `apikey`) redigiraju se strukturalno (samo vrijednost, prefiks sheme kao što je `Bearer `/`Basic ` sačuvan), a ne putem generičkog tekstualnog regularnog izraza.
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

## Nalog za izvršenje

Za svaki zahtjev koji teče kroz `src/sse/handlers/chat.ts` i `open-sse/handlers/chatCore.ts` (rute chat-family navedene pod [Pokrivenost i ograničenja](#coverage-and-limits) ):

1. `resolveDisabledGuardrails(...)` gradi popis za preskakanje od API ključa, tijela i zaglavlja.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` pokreće zaštitne ograde prema rastućem redoslijedu prioriteta:
   - Onesposobljene zaštitne ograde evidentiraju se kao `skipped`.
   - `preCall` svake zaštitne ograde može prepisati korisni teret putem `modifiedPayload`.
   - Prvi `block: true` kratko spaja lanac i rukovatelj vraća odgovor odbijanja zaštitne ograde.
3. Korisni teret (potencijalno prepisan) teče u kombinirano usmjeravanje i uzvodno slanje.
4. **Samo bez strujanja:** nakon što je odgovor sastavljen, `guardrailRegistry.runPostCallHooks(...)` pokreće isti lanac na odgovoru. `block: true` ovdje ispušta uzvodni odgovor i vraća HTTP 400. Streaming odgovori u potpunosti preskaču ovaj korak.
5. **Samo reverzibilni trezor:** kada je zahtjev iskovao tokene, `handleChat` ih vraća na odgovor 2xx koji vraća, nakon zakačivanja nakon poziva i strujanja PII transformacije, tako da `PII_RESPONSE_SANITIZATION` vidi tokene i PII generiran modelom, nikad obnovljeni original.

Zaštitne ograde koje bacaju bilježe se pomoću `error: <message>` i bilježe putem `logger.warn`, ali lanac se nastavlja — fail-open prema dizajnu.

## Pokrivenost i ograničenja

Registar zaštitne ograde povezan je samo s cjevovodom za chat. Ove granice su postavljene pomoću `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` i `tests/unit/guardrail-pipeline-characterization.test.ts`; ažurirati te testove namjerno kada se ponašanje promijeni.

### Gdje trče udice

| Kuka / kontrola                        | Radi dalje                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                      | Zahtjevi kojima upravlja `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (i `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` i Telegram chat proxy. Također testna krajnja točka nadzorne ploče `/api/guardrails/test`. Blok prije poziva vraća HTTP 400. |
| `runPostCallHooks`                     | **Ne-streaming** samo odgovori na chat (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Streaming odgovori nikad ne stižu do njega.                                                                                                                                                                                                                                                                                          |
| Streaming PII                          | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), prenesen u `streamingPipeline.ts` kada je `PII_RESPONSE_SANITIZATION` uključen. To nije zaštitna ograda, tako da kanali za onemogućavanje ne utječu na to.                                                                                                                                                                                                            |
| Reverzibilni PII trezor                | Zahtjeve obrađuje samo `handleChat`, kada su `PII_REDACTION_ENABLED` i `PII_REVERSIBLE_VAULT_ENABLED` uključeni. Tokeni su iskovani `pii-masker` predpozivom i vraćeni na `handleChat` izlaz (`src/lib/pii/requestTokenVaultScope.ts`). Onemogućavanje `pii-masker` za zahtjev znači da ništa nije iskovano.                                                                                                                        |
| Injection-guard međuware (naslijeđeno) | Svaka `/v1` ruta s brzim smjerom, uključujući chat-familju (pogledajte [pokrivenost rute](#injection-guard-route-coverage--red-team-phase-8--block-d) ). Samo brzo ubrizgavanje.                                                                                                                                                                                                                                                    |

### Što nije pokriveno

- **Mediji, ugradnje i rute podataka** (`/v1/images/*`, `/v1/embeddings`, `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/rerank`, `/v1/search`, `/v1/moderations`) nikad ne stižu do registra. Tu ne prolazi PII maskiranje, maskiranje vjerodajnica ili modalni most. Njihova jedina provjera je stari injection-guard međuprogram.
- **Streaming odgovori** nema zaštitnih ograda nakon poziva: nema `pii-masker` ili `credential-masker` naknadnog poziva i nema blokade nakon poziva. Primjenjuje se samo strujanje PII transformacije (kada je `PII_RESPONSE_SANITIZATION` uključen). Vjerodajnica vraćena u strujanom odgovoru nije redigirana.
- **Onemogući kanale u odnosu na srednji softver (po dizajnu):** međuprogram procjenjuje brzo ubacivanje vlastitim pozivom na `evaluatePromptInjection()`, bez prosljeđivanja liste za onemogućavanje koju kontrolira pozivatelj. `block` način rada obvezna je granica koju onemogućavanja koja kontrolira pozivatelj ne mogu zaobići, uključujući rute chat-obitelj ( [#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413) ). Onemogućivanjem `prompt-injection` preskače se samo zaštitna ograda registra.

### Što vidi odgovor prije naknadnog poziva

Na stazi bez strujanja redoslijed je: ekstrakcija memorije → izvođenje ugrađenog alata → zaštitne ograde nakon poziva → izlaz iz bloka nakon poziva → pohrana semantičke predmemorije.

- **Ekstrakcija memorije** i** izvođenje alata** pogledajte odgovor prije nego što ga zaštitnici nakon poziva mogu prepisati ili blokirati. Od [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), ekstrakcija memorije pokreće ekstrahirani tekst kroz `sanitizePII` kada je `PII_RESPONSE_SANITIZATION` uključen (i strujanje i bez strujanja), ali odgovor koji naknadno blokira naknadni poziv i dalje je ponuđen memoriji i alatima.
- **Semantički cache** pohranjuje odgovor nakon naknadnog poziva, tako da pohranjuje ponovno napisani odgovor, a blokirani odgovor se nikada ne sprema u predmemoriju. Unosi u predmemoriju imaju ključ po API ključu.

## Konfiguracija

Varijable okruženja koje čitaju ugrađene zaštitne ograde:

| Varijabilna                           | Koristi ga                 | Učinak                                                                                                         |
| ------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Postavite `false` da potpuno onemogući otkrivanje.                                                             |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Politika ubrizgavanja: `warn`, `block` ili `log`. Naslijeđena vrijednost `redact` ne prepisuje umetnuti tekst. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Način rada za zaštitu od ubrizgavanja; također zastavu značajke DB koja** nadjačava** env vars (DB > ENV).     |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Minimalna ozbiljnost koju `MODE=block` odbija: `high` (zadano), `medium` ili `low`.                            |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Naslijeđeni alias za `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                        |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Kada je `true`, zahtjev PII je redigiran (neovisno o načinu ubrizgavanja).                                     |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Uz `PII_REDACTION_ENABLED`, iskovajte reverzibilne tokene i vratite ih u 2xx odgovora.                         |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nizvodno)    | Kontrolira ponašanje maskera na strani odgovora.                                                               |

Zaštitne ograde Modality Bridgea čitaju runtime konfiguraciju iz pohrane postavki podržane DB-om (`getSettings()`), a ne env vars. Primarni ključevi Visiona su `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` i `modalityBridgeCacheMaxEntries`. Naslijeđeni `visionBridge*` ključevi prihvaćaju se samo kao dokumentirani zamjenski čitač s jednim ciklusom; nadzorna ploča zapisuje korištenjem primarnih ključeva. Zadane postavke i pomoćni razrješivač žive u `src/shared/constants/modalityBridgeDefaults.ts`, s naslijeđenim konstantama zadržanim u `src/shared/constants/visionBridgeDefaults.ts`.

Audio koristi `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`, `modalityBridgeAudioTimeout` i `modalityBridgeAudioMaxClips`, plus zajedničke `modalityBridgeCache*` postavke. Zvuk nema zamjenski ključ jer su ti ključevi uvedeni sa shemom Modality Bridge.

Video koristi `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`, `modalityBridgeVideoModel`, `modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`, `modalityBridgeVideoMaxVideos` i `modalityBridgeVideoTimeout`, plus zajedničke postavke `modalityBridgeCache*`. Onemogućeno je prema zadanim postavkama jer su FFmpeg/ffprobe neobavezne operativne ovisnosti, a opisi okvira povećavaju kašnjenje i trošak modela.

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
