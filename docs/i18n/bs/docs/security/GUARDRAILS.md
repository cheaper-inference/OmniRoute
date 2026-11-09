# Guardrails (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Izvor istine:** `src/lib/guardrails/`
> **Zadnje ažuriranje:** 2026-10-17 — v3.8.52 (dodano [Pokrivenost i ograničenja](#coverage-and-limits):
> koje rute i putanje odgovora hookovi dosežu, spojena zaglavlja za onemogućavanje (#16412), način
> blokiranja injekcije kao obavezna granica (#16413), i šta vidi odgovor prije post-call faze)

Guardraili provode sigurnosne provjere, politike i transformacije sadržaja na
granici između OmniRoute-a i upstream provajdera. Svaki guardrail može
pregledati (i opcionalno odbiti, transformisati ili anotirati) payloadove
zahtjeva (`preCall`) i upstream odgovore (`postCall`).

Sistem je **fail-open**: ako guardrail baci grešku tokom izvršavanja, registar
bilježi grešku i nastavlja sa sljedećim guardrailom umjesto da zahtjev ne
uspije. Blokiranje je eksplicitna odluka (`block: true`), nikada slučajnost.
Jedini izuzetak je prekinuti zahtjev: kada se `signal` pozivaoca prekine,
guardrail koji baci grešku odbija izvršavanje hooka umjesto da bude preskočen.

Hookovi se **ne** izvršavaju na svakoj ruti ni na svakom odgovoru. Pročitajte
[Pokrivenost i ograničenja](#coverage-and-limits) prije nego što se oslonite
na guardrail kao sigurnosnu kontrolu.

## Ugrađene zaštitne ograde

Registar automatski učitava šest zaštitnih ograda u prioritetnom redoslijedu pri uvozu (pogledajte `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Ime                 | Faza(e)        | File                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Pokreću se brojevi nižeg prioriteta** prvo** .

### Vision Bridge (`visionBridge.ts`) — Most modaliteta PR-1

Osnovni model GLM 5.3 i `glm-5.3-{low,high,max}` imaju eksplicitne `supportsVision:false` registry/spec metapodatke. GLM 5.3 Flash varijante ostaju native-vision modeli. Claude kodova `/v1/messages` ruta ulazi u zajednički `handleChat` lanac ograde prije poziva** prije** Claude-to-OpenAI prijevod; Ugniježđene slike rezultata `Read` alata moraju biti opisane ili obrađene prije nego što ih prevod podiže u sadržaj OpenAI `image_url` (#17069).

Presreće zahtjeve koji imaju za cilj** modeli bez vida** i ili preusmjerava cijeli zahtjev na model sposoban za viziju ili zamjenjuje dijelove slike tekstualnim opisima koje proizvodi konfigurabilni model vizije prije upstream poziva. Ovo omogućava provajderima koji koriste samo tekst transparentno rukovanje multimodalnim korisnim opterećenjem.

protok:

1. Preskočite ako ciljni model već podržava viziju (osim ako se ne pojavljuje na listi prisilnih premošćavanja `isVisionBridgeForcedModel`).
2. Izdvojite dijelove slike putem `extractImageParts(messages)` (`visionBridgeHelpers.ts`), koji delegira na** unificirani detektor medija** `detectMediaParts()` u `open-sse/utils/mediaParts.ts` — jedini izvor istine koji se dijeli sa kombinovanim filterom kompatibilnosti. Ekstrakcija je na listi dozvoljenih oblika koje `replaceImageParts` može spojiti (ugovor za zamjenu ekstrakta ↔): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` i Responses API `input_image`. Odgovarajuće slike ugniježđene unutar Claude Code `tool_result.content` i izlaza alata Responses se također izdvajaju i zamjenjuju na njihovim originalnim putanjama; Indikatorski oblici su materijal kombinovanog filtera i ne ekstrahuju se. Preskoči ako ništa nije pronađeno.
3. Riješite konfiguraciju vremena izvođenja putem `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): novi `modalityBridge*` ključevi postavki pobjeđuju; naslijeđeni `visionBridge*` ključevi ostaju a** rezervni ciklus u jednom ciklusu** (prozor za povratak). Preskoči prije bilo kakvog prelaska medija kada je most onemogućen.
4. Selektor načina rada (`modalityBridgeVisionMode`, vidi tabelu ispod) odlučuje o preusmjeravanju u odnosu na opis. Preusmjeravanje vraća `modifiedPayload` sa samo zamijenjenim `model`, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Opišite putanju: zatvorite slike na `maxImages`, sastavite prompt za svestan zadataka, konsultujte predmemoriju opisa, pozovite model vizije** paralelno** (`Promise.allSettled`) i ubacite `[Image N]: <description>` dijelove teksta na njihovo mjesto. Neuspješan opis daje `null`: sirova slika je sačuvana za unknown/vision-capable ciljeve (#4012), ali** potvrđena direktna meta samo za tekst** ili zero-vision combo dobija eksplicitni `(unavailable — no vision-capable provider connected)` tekstualni stub za svaku neopisanu sliku, uključujući djelimične greške i slike izvan ograničenja opisa (#17069). Postojeća potpuno neuspješna kombinacija opisa zamjenskog opisa ostaje na mjestu (#8430).
6. Vrati `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Birač načina rada (`modalityBridgeVisionMode`)

| Mode       | Default | Ponašanje                                                                                                                                                                                                                                                                                      |
| ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Naslijeđeni heuristički, netaknuti (#6640/#7204): ne-kombo/`auto/` modeli se preusmjeravaju na najbolji model vizije osim ako originalni model već ima upotrebljive vjerodajnice (onda opišite); kombinirani ciljevi uvijek opisuju.                                                           |
| `describe` |         | Uvijek opišite — se blok preusmjeravanja u potpunosti preskače; korisnikov odabrani model uvijek odgovara.                                                                                                                                                                                     |
| `reroute`  |         | Prisilno preusmjeravanje: zaobilazi se zaštita modela s vjerodajnicama. Preusmjeravanje-** cilj** Zaštita vjerodajnica i dalje primjenjuje — kada ne postoji upotrebljiva ciljna vizija, most se blokira s jasnom greškom umjesto da opisuje ili šalje neobrađene slike na cilj samo za tekst. |

Prisilni režimi kratkog spoja** prije** autoheuristički se izvodi; `auto` ponašanje je identično bajtovima kao i pre-PR-1 zaštitna ograda.

#### Obim API-ključa (`visionBridgeKeyScope.ts`)

Kada API ključ pozivaoca ograničava `allowedConnections`, skupove kvota (`allowedQuotas`) ili modele (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), most bira samo preusmjeravanje i opisuje modele koje ključ može koristiti, na konekcijama koje ključ može koristiti. Poziv opisa tada uvijek prolazi kroz OmniRoute self-petlju sa `x-omniroute-self-loop-key-id` zaglavljem, tako da primajući zahtjev za ćaskanje ponovo nameće vezu tog ključa i politiku modela. `enforceApiKeyPolicy()` poštuje to zaglavlje samo zajedno sa nosiocem self-petlje, tako da može samo suziti pristup, a id koji se ne rješava se odbija.

Ako za ključ nije dozvoljen model vizije, a** potvrđena samo tekstualna meta** lokalno odbija zahtjev za sliku sa jasnim HTTP 400 umjesto prosljeđivanja bajtova slike nesposobnom uzvodnom (#17069). Za ciljeve s nepoznatom ili izvornom sposobnošću vida, opisani put zadržava svoje prethodno ponašanje pri otvaranju (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Zahtjevi bez ključa i ključevi bez ovih ograničenja ponašaju se kao i prije.

#### Prompt za opis zadatka (`modalityBridgeVisionTaskAware`)

Default** istina** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) dodaje tekst** posljednja poruka korisnika** (skraćeno na 500 znakova) na prompt za osnovni opis, usmjeravajući opis prema onome što je korisnik zapravo tražio (codex-vision-proxy obrazac) i tražeći od modela vizije da transkribuje vidljivi tekst. Sa isključenom zastavicom — ili bez korisničkog teksta — osnovni prompt se koristi nepromijenjen.

Opisani vlastiti OpenAI-kompatibilni zahtjev (`callVisionModelSingle()` u `visionBridgeHelpers.ts`) uvijek zahtijeva `image_url.detail: "high"` — bezuslovno, za svaki caller/provider, nije gatiran ni na jednom klijentskom signalu. Uzorkovanje sa niskim brojem detalja degradira OCR tačnost za upravo zadatak transkripcije teksta koji ova prompt traži, tako da sam poziv za opis uvijek traži visoku detaljnost bez obzira na to koji nivo detalja je koristio originalni ulazni zahtjev. Ovo utiče samo na unutrašnje tijelo zahtjeva za opis; ne menja način na koji OmniRoute prosleđuje sopstveni `image_url.detail` pozivaoca na primarni zahtev — koji se podrazumevano primenjuje zasebno, i to samo za otkrivene OpenCode klijente, u `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Grana Anthropic formata žice opisne self-petlje nema `detail` polje i na njega ne utječe ni jedna zadana.

#### Opišite izlaznu kapu (`modalityBridgeVisionMaxChars`)

| Ključ                          | Default | Domet             |
| ------------------------------ | ------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` ili 100–50000 |

`0` (podrazumevano) znači** no cap** — opis koji vraća `callVisionModel()` prolazi kroz neizmijenjeno, čuvajući postojeće ponašanje. Bilo koja vrijednost u rasponu 100–50000 skraćuje opis sa sufiksom `…` prije nego što se ponovo spoji kao `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` u `src/lib/guardrails/visionBridge.ts`). Podignite ovo za OCR zadatke sa velikim detaljima gdje je nizvodnom modelu potrebna potpuna transkripcija; smanjite ga na korištenje vezanog tokena na brbljivim modelima vizije. Polje kontrolne ploče živi na naprednoj ploči kartice Vision (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) i spaja bilo koju vrijednost između 1 i 99 do 100 sprata, dok ostavlja eksplicitni `0` netaknutim — `0` je sama po sebi važeća Zod vrijednost (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), a ne samo "unset".

#### Opišite predmemoriju (`modalityBridge/bridgeCache.ts`)

U-memory LRU + TTL keš za opis izlaza, zajednički za cijeli proces. Ključ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s okvirom dužine prefiksa (bez sudara na granicama polja). Komponenta modela je** konfigurisano** bridge model, a ne model koji je zapravo odgovorio — `callVisionModel` može se interno vratiti nazad, a unos ključa po pokušaju bi fragmentirao keš memoriju. Neuspjeli opisi se nikada ne keširaju. Postavke:

| Ključ                           | Default | Domet   |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Daljinska normalizacija slike (samo-petlja describe/base64 dohvaćanje)

Kada most dohvati a** daljinski** Sama slika — Anthropic opisuje samopoziv i konverziju base64 formata claude-wire (`ensureBase64ImagesForClaudeWire`), oba preko `fetchRemoteImageAsDataUri()` u `visionBridgeHelpers.ts` — rezultirajući podaci URI se prosljeđuju kroz `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) prije nego što budu ugrađeni u zahtjev za model vizije. Prevelike slike se smanjuju na a** 2048px duga ivica** (koja odgovara ograničenju veličine OpenAI/Anthropic već se primjenjuje na strani servera), što smanjuje upload bytes/latency bez promjene onoga što vidi model vizije. Promjena veličine koristi `sharp`, učitan putem dinamičkog uvoza: na platformi na kojoj se njegov izvorni binarni fajl ne može učitati, `normalizeDataUri()`** nikad ne baca** — se vraća na prolaz originalnih bajtova, tako da describe/base64-conversion putanja uvijek radi. Bajtovi koji nisu slike (dohvaćanje koje nije vratilo sliku koja se može dekodirati) se također prolaze netaknuti. Ova normalizacija je obuhvaćena slikama koje most preuzima za svoj vlastiti samopoziv — i nikada se ne primjenjuje na sirovo prolazno opterećenje pozivaoca, u skladu sa principom mutacije samo za izbor (tvrdo pravilo #20).

#### Postavke sheme + migracije

Novi `modalityBridge*` ključevi su Zod validirani u `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` trio i `modalityBridgeAudio*` grupa koju koristi Audio Bridge. Migracija `141_modality_bridge_settings.sql` kopira postojeće naslijeđene `visionBridge*` vrijednosti u odgovarajuće nove ključeve (idempotentan, nikada ne prepisuje `modalityBridge*` vrijednost postavljenu operatorom); naslijeđeni ključevi ostaju prihvaćeni kao rezervni za čitanje za jedan ciklus oslobađanja.

#### Transparentnost zaglavlja + statistika

Opišite-transformisani odgovori nose `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (sagrađen od `buildModalityBridgeHeader()` u `modalityBridge/bridgeStats.ts`, pečat `withModalityBridgeHeader()` u `src/sse/handlers/chatHelpers.ts`). Preusmjereni zahtjevi se dobijaju** br** zaglavlje — korisni teret je bio netaknut i zamjena modela je već vidljiva u `model` polju tijela odgovora.

`GET /api/modality-bridge/stats` (upravljanje auth, isti nivo kao `GET /api/settings`) vraća brojače po modalitetima u memoriji `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio` i `video`. `averageLatencyMs` koristi `latencySamples`, ne sve pokušaje, kao imenilac; operacija bez mjerenja vremena ne proizvodi uzorak od nula milisekundi. `bridged` ostaje povratno kompatibilan alias za uspješne konverzije; neuspjeli pokušaji ga ne povećavaju. Brojači se resetuju pri ponovnom pokretanju procesa po dizajnu (telemetrija, a ne računovodstvo).

#### Konfiguracija kontrolne table

The dedicated dashboard page is `/dashboard/settings/modality-bridge`. Its URL-addressable `Vision`, `Audio`, and `Video` tabs preserve query parameters while switching the `tab` value. The Vision tab exposes enablement, mode, model selection (including the automatic default), task-aware prompting, advanced timeout/image/description-length/cache limits, runtime counters, and a guarded sample request. The Audio tab is also live: it exposes enablement, an STT-only model picker with Auto, timeout/max-clip limits, audio counters, and an `input_audio` sample test. The Video tab is functional: it reports the FFmpeg/ffprobe runtime state — one of four explicit UI states (`unknown` while the probe is in flight or could not complete, `restricted` on a non-loopback dashboard host where the probe is skipped client-side, `unavailable` once probed and confirmed missing, or `available` with the FFmpeg/ffprobe versions) — persists enable/model/frame/video/timeout limits, filters the model picker to vision-capable models, and exposes video counters.

Prethodna Vision Bridge kartica pod AI postavkama je veza za kompatibilnost do nove stranice; više ne posjeduje drugu kopiju obrasca. Provajderi medija takođe povezuju radne tokove slika-u-tekst i govor-u-tekst sa odgovarajućim karticama Modality Bridge bez uklanjanja postojećeg igrališta govora u tekst.

**Premosnica samo-petlje za prijem:** kada opisni poziv prolazi kroz OmniRoute-ovu vlastitu `/v1` self-petlju (nestandardni model provajdera), pod-zahtjev šalje `x-omniroute-admission-bypass: internal` i autentificira se s razriješenim akreditivima self-loop — lokalni `sk_omniroute` sentinel u lokalnom načinu rada, ili `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env ključ konfiguriran operaterom, tako da call de i dalje može pokrenuti (#1350 `REQUIRE_API_KEY=true` ) Zaobilaznica se poštuje samo za te tačne vjerodajnice, tako da vanjski klijenti ne mogu koristiti zaglavlje da preskoče prijem.

Naslijeđene postavke žive u `src/shared/constants/visionBridgeDefaults.ts`; nove zadane postavke mode/task-aware/cache a i razrješavač postavki žive u `src/shared/constants/modalityBridgeDefaults.ts`. Zaštitna ograda otkriva opciju `deps` konstruktora tako da testovi mogu ubaciti lažne `getSettings` i `callVisionModel` implementacije.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Presreće zahtjeve za razgovor sa audio prijenosom prije nego stignu do cilja za koji se ne zna da prihvata audio ulaz. Nikada ne preusmjerava zahtjev za ćaskanje: audio dijelovi se transkribuju kroz postojeću višedijelnu krajnju tačku kompatibilnu s OpenAI-om, a odabrani model ćaskanja nastavlja s transkriptima teksta.

protok:

1. Riješite `supportsAudio` kroz `getResolvedModelCapabilities()`. Eksplicitni metapodaci registra dobavljača pobjeđuju, zatim metapodaci statičnog modela, a zatim sinhronizirani `modalities_input`. Deklarisana ulazna lista bez `audio` je `false`; nema dokaza o sposobnosti `null`. I `false` i `null` aktiviraju konzervativni most, dok ga `true` zaobilazi.
2. Riješite `modalityBridgeAudio*` postavke i izdvojite audio dijelove najvišeg nivoa koji se mogu spojiti iz svake poruke putem zajedničkog `detectMediaParts()` detektora. Podržani oblici žice su OpenAI `input_audio`, `audio_url` i `source.media_type: "audio/*"`. Ugniježđeni zvuk je otkriven za usmjeravanje, ali nije uklonjen putem spajanja. Rad je ograničen sa `modalityBridgeAudioMaxClips`; kasniji dijelovi ostaju netaknuti.
3. Poštujte konfiguriranu `provider/model`, ili pustite `selectAudioBridgeModel()` da hoda `AUDIO_TRANSCRIPTION_PROVIDERS` u stabilnom kataloškom redoslijedu i odaberite prvi model s upotrebljivim aktivnim vjerodajnicama dobavljača.
4. `callAudioTranscription()` pretvara base64/data-URI audio u višedijelni `file` ili preuzima udaljeni `audio_url` kroz samo javni izlazni stražar sa DNS zakačenjem i 25 MB vezom. Zatim POSTs datoteku i odabrani model u lokalnu `/v1/audio/transcriptions` self-petlju, provjerenu sa `resolveSelfLoopBearer()`. Postojeća ruta transkripcije obavlja normalno traženje vjerodajnica, rukovanje cooldown/rate-limit i otpremanje dobavljača.
5. Uspješni pozivi zamjenjuju svoje dijelove sa `[Audio N]: <transcript>`. Pozivi se pokreću sa `Promise.allSettled`: pojedinačni kvar čuva taj originalni audio dio (#4012 ugovor). Ako svaki poziv ne uspije i cilj je dokazan `supportsAudio === false`, dijelovi postaju `[Audio N]: (unavailable — no STT provider connected)` (#8430 ugovor). Za nepoznatu metu (`null`), rezultat potpunog neuspjeha ostaje netaknut. Provjereni cilj samo za tekst bez upotrebljivih STT vjerodajnica prima isti eksplicitni stub bez izdavanja mrežnog poziva.

Uspješni transkripti koriste LRU/TTL predmemoriju Modality Bridge za cijeli proces. Ključ kombinuje audio referencu, oznaku stabilne `audio-transcription` operacije i odabrani STT model; kvarovi se nikada ne keširaju. Audio pokušaji ažuriranja dijeljenih brojača `bridged`, `cacheHits`, `failures` i `lastUsedAt`. Transformisani odgovori nose `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; netaknuti zahtjevi ne primaju Audio Bridge segment.

Runtime postavke su podržane od strane DB-a i Zod validirane:

| Ključ                         | Default | Domet           |
| ----------------------------- | ------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —               |
| `modalityBridgeAudioModel`    | `""`    | Auto ili STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10            |

Zajednički keš i dalje kontroliraju `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` i `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Presreće video dijelove najvišeg nivoa u Završecima ćaskanja `messages` i Odgovorima API `input` prije nego što se pozove cilj bez poznate izvorne video podrške. Podržani oblici su `input_video`, `video_url`, `video_source`, HTTPS URLs i `data:video/*;base64,...` podaci URIs. Obični nazivi datoteka u tekstu se ne tretiraju kao video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) posjeduje obilazak zahtjeva, capability/policy provjeru, agregaciju po zahtjevu i korisno opterećenje odgovora. Po-video rad — akvizicija, keš cjelokupnog rezultata, koji opisuje sekvencu okvira (koji spaja bilo koji audio transkript koji je deklarirao pozivalac), i po pokušaju metrics/abort/cleanup — je skriven iza `processVideoPart` u `videoBridgePipeline.ts`, poziva se jednom po video dijelu unutar `preCall` petlje. Taj modul takođe definiše eksplicitne granice porta `VideoMediaBrokerPort` (pribavljanje bajtova i izdvajanje uzorkovanih okvira), `VideoAudioTranscriptionPort` (spajanje audio transkripta koji je deklarisao pozivalac sa uzorkovanim titlovima) i `VideoDrilldownPort` (nasleđeni oblik sirove prodavnice). Proizvodnja STT i zadržavanje okvira su sastavljeni oko porta za opis kroz `createVideoSttAdapter` i `createVideoDrilldownAdapter`; potonji koristi zajednički životni ciklus neprozirne ručke.

Putanja javnog `/v1` zahtjeva nikada ne uvozi niti poziva podproces. Udaljeni video zapisi se preuzimaju pod ograničenjem od 50 MiB ; inline base64 video snimci imaju konzervativno ograničenje od 36 MiB dekodiranih po videu, tako da model/messages/framing omotnica može ostati unutar ograničenja javnog JSON zahtjeva za prijem od 50 MiB. Procjene inline dužine i dekodirane veličine se provjeravaju prije dodjele. HTTPS je neophodan na početnom udaljenom URL u i svakom preusmjeravanju, koristeći postojeći samo javni izlazni stražar sa DNS zakačenjem. Bajtovi tada prelaze tačnu internu granicu `POST /api/modality-bridge/video/extract` brokera. Ta ruta je i `LOCAL_ONLY` i `SPAWN_CAPABLE`, prihvata samo autentifikaciju po procesu, zahtjev pouzdane petlje i nikada ne prihvaća URL, putanju sistema datoteka, izvršnu datoteku ili listu argumenata. API cjevovod veličine tijela i inkrementalni čitač tijela rukovatelja nezavisno provode ograničenje unosa brokera od 50 MiB. Njegov ograničeni red pokreće jednu po jednu ekstrakciju, dozvoljava četiri posla na čekanju i ograničava ulaz na čekanju na 100 MiB.

Unutar brokera, `ffprobe` čita privatni lokalni fajl; lista dozvoljenih datoteka fiksnog formata isključuje formate playlista i manifesta. Za dozvoljene kontejnere porodice MOV, eksterne MOV reference podataka ostaju onemogućene prema zadanim postavkama, a fiksna komanda se ne uključuje u njih. I `ffprobe` i `ffmpeg` koriste bijelu listu `file` -only protokola, jednu nit, fiksne nizove argumenata, bez ljuske i izvršne datoteke riješene iz `PATH`. Tokovi naslovnih slika u prilogu nisu kandidati za reprodukciju. Svi streamovi koji se mogu reproducirati moraju zadovoljiti ograničenja, a eksplicitni zadani tok je poželjniji prije determinističkog rezervnog načina s najnižim indeksom. Video zapisi su ograničeni na 600 sekundi, 8.192 piksela po dimenziji i 33.554.432 izvorna piksela. FFmpeg uzorkuje 1–16 srednjih JPEG okvira, smanjuje dužinu na najviše 1.024 piksela bez povećanja manjih ulaza i nikada ne prima URL. Uzorkovanje je po defaultu `uniform`. Opcione `scene_aware` i eksperimentalne `segment_aware` politike izvode jedan dodatni fiksni FFmpeg prolaz preko već potvrđenog lokalnog toka, biraju ograničene vremenske oznake `showinfo` scene i vraćaju se deterministički na iste uniformne srednje tačke u slučaju kvara detektora, isteka vremena, neispravnog izlaza ili praznog skupa kandidata. Režim svjesnog segmenta dodjeljuje uzorke srednje tačke proporcionalno validiranim intervalima scene; Dokazi svjesni segmenta i rezervno ponašanje su detaljno opisani u nastavku. Čvrsto ograničenje od 16 okvira primjenjuje se nakon odabira u svakoj politici. Kada zahtjev koji je svjestan scene ima budžet samo jednog kadra, on koristi uniformnu središnju tačku aktivnog cijelog videa ili prozora fokusa i prijavljuje `policyEffective: uniform`: jedan odabrani okvir scene ne može sačuvati oba vremenska kraja. Pozivalac može opciono da obezbedi prozor konačnog fokusa (`start`/`end` sekundi); granice su pričvršćene za trajanje medija, obrnuti ili neograničeni prozori se odbacuju, a sve politike uzorkovanja se izvode samo unutar normaliziranog intervala. Rezultirajući prozor je uključen u metapodatke uzorkovanja i u nepouzdani prefiks opisa, tako da nizvodni modeli mogu razlikovati fokusirani izvod od pune vremenske linije.

Fokus semantičkog natpisa je posebna, eksplicitna postavka. Podrazumevani režim analize `full` čuva postojeći prompt okvira i nikada ne prosleđuje tekst zahteva u model natpisa. U `focused` modu, most čita samo najnoviji neprazan `text`/`input_text` koji je autorizirao korisnik iz istog Chat ili Responses kontejnera, normalizira ga u NFC, skuplja kontrolne znakove i razmak i ograničava ga na 500 Unicode kodnih tačaka. Prazan rezultat se vraća na tačan `full` prompt. Upotrebljivi nagovještaj se serijalizira kao JSON u namjenskom bloku konteksta nepouzdanog korisnika i može dati prioritet samo vidljivim detaljima; ne može poništiti posebno upozorenje na praćenje uputstava vidljivih ili čujnih u medijima. Tekstualni fokus nikada ne zaključuje `start`/`end` niti mijenja temporalni uzorkivač.

#### dokaz strukturnog segmenta FU-07

`segment_aware` koristi jedan ograničeni prolaz prije analize preko već potvrđenog lokalnog video toka. Fiksni filterski lanac prvo se skalira na najviše 320 piksela širine, detektuje promjene scene i zamrznute intervale, a zatim uzorkuje pri 1 sličici u sekundi za zamućenje, prosječnu svjetlost i spatial/temporal informacije. Prolaz je ograničen na 600 strukturnih uzoraka, jednu FFmpeg/filter nit, isti protokol `file` -only i liste dozvoljenih kontejnera, ograničenje 1 MiB proces-izlaz i najviše 30 sekundi unutar dijeljenog abort/deadline. brokera. Nikada ne prihvata naredbu, filter, putanju ili URL iz zahtjeva.

Strukturalne vrijednosti su dokaz determinističkog uzorkovanja, a ne semantičko razumijevanje videa. Oni ne zaključuju subjekte, radnje, natpise, govor ili namjeru korisnika. Granice scene i zamrzavanja formiraju segmente; zamrznuta pokrivenost, zamućenje, ekspozicija, prostorni detalji i vremenske promene utiču samo na to kako se raspoređuje postojeći budžet od 1–16 kadrova. Potpuno zamrznuti segment je ograničen na jedan okvir, dok se nezamrznuti segmenti takmiče za preostali budžet. Kada granice premašuju broj okvira, zadržava se ujednačena pokrivenost vremenske linije tako da brzi rani rezovi ne mogu sakriti dugi segment koji se završava. Granice scene unutar 1-sekundne rezolucije analize granice zamrzavanja su spojene.

Nedostaju filteri, malformed/empty dokaz, greška detektora ili ograničeno vremensko ograničenje predanalize ne otvaraju za tačno jednoobraznu politiku srednje tačke. Rok za prekid poziva ili brokera se ne otvara: prekida potproces u letu, sprečava kasniju ekstrakciju okvira, a privatno privremeno stablo se uklanja u `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generiše determinističke stvarne FFmpeg uređaje za uštedu titlova-poziva nakon dedupiranja, raspodjelu budžeta za gusto kretanje, blur/exposure/SI-TI dokaze, brze rezove s dugim repom i postupno nestajanje lažnih pozitivnih rezultata. Bilježi vrijeme zida prije analize i, gdje je dostupan `/usr/bin/time`, podređeni CPU i vršni RSS. Njegove provjere kvaliteta su samo strukturna proročanstva. Pravi kvalitet modela titlova ostaje `HOLD` jer ovaj pojas nema ovlaštenu krajnju točku ili zamrznutog suca. Monetarna ušteda također ostaje `HOLD` osim ako `--caption-cost-per-call-usd` ne dostavi eksplicitnu pozitivnu procjenu po pozivu; skripta nikada ne izmišlja nijedan rezultat.

Svaki okvir je ograničen na 4 MiB, svi neobrađeni okviri zajedno na 23 MiB, a serijski odgovor brokera na 32 MiB. Privatni privremeni direktorij je uklonjen u `finally`. OmniRoute ne povezuje FFmpeg i ne prihvata prilagođenu izvršnu putanju. Prije titlovanja, most primjenjuje konzervativni prolaz vizualne deduplikacije: svaki JPEG se smanjuje na 16 × 16 bafera sivih tonova i uspoređuje se samo s posljednjim zadržanim okvirom. Za traženi budžet titlova iznad jednog okvira, ekstrakcija daje ograničeni skup kandidata do dva puta veći od budžeta i nikada više od 16 okvira. Traženi limit se primjenjuje tek nakon deduplikacije, s tim da se prvi i konačni odabrani kandidati čuvaju prilikom konačnog prorjeđivanja kada je budžet najmanje dva. Versionirana `grayscale-16x16-mean-cells-v2` politika koristi veću od srednje delte luma i omjera sličica čija je normalizirana delta najmanje 0,05. Duplicirani prag je konstanta 0,04, izabrana radi predvidljivosti, a ne izložena kao postavka vremena izvođenja. Ovaj sekundarni signal visokog kontrasta čuva male pokrete i promjene vidljivog teksta koje samo srednje poređenje može sakriti. Greške komparatora ili dekodera se ne otvaraju i zadržavaju pokrivenost. Izlazni metapodaci odvajaju ekstrahovane kandidate, uspješno korištene okvire i vizualne duplikate koji su odbačeni.

Eksplicitno označeni video dio može zahtijevati kontaktni list sa vremenskim žigom. Most gradi JPEG mrežu sa najviše 4 stupa i 16 okvira. Svaka ćelija od 512 piksela sažima svoju izvornu vremensku oznaku u donji pojas visokog kontrasta, dok iste vremenske oznake ostaju u tekstualnim metapodacima za nizvodno povezivanje i reviziju. Kompletan JPEG ostaje ograničen na 32 MiB. Ako `sharp` ne može dekodirati ili sastaviti mrežu, most se vraća na pojedinačne JPEG okvire; klijentski prekid se i dalje širi kroz operaciju lista.

Dokazi o promociji su namjerno odvojeni od mikrobenchmarka sintetičkog sastava. `scripts/perf/video-bridge-contact-sheet-eval.ts` definira A/B uprtač sa verzijom sheme za stvarne OpenAI kompatibilne modele vizije. On mjeri tokene koje je prijavio provajder, end-to-end zidnu latentnost (uključujući sastav lista), broj poziva modela i zadržavanje činjenica definiranih manifestom. Neobrađeni odgovori modela se ne pišu u izvještaj; zadržavaju se samo SHA-256 sažeti podaci i podudarne činjenice IDs. Uprtač ne obavlja pozive mreže ili plaćenog modela osim ako `--execute-real` nije proslijeđen i `--model`, `OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY` nisu konfigurirani. Bez tog eksplicitnog stvarnog pokretanja, njegova strojno čitljiva presuda ostaje `HOLD`; samo sintetička mjerenja payload/call-count nisu dokaz promocije.

Pozivaoci mogu priložiti opcioni `transcript.cues` niz na podržani video dio kada već posjeduju poravnati tekst. Svaki znak mora nositi `text`, konačni `start`/`end` interval unutar ispitanog trajanja i `source` na bijeloj listi (`client`, `embedded` ili `audio-bridge`); `confidence` je zadano na `1` i mora ostati između `0` i `1`. Tačni duplikati znakova su skupljeni. OmniRoute nikada ne počinje transkripciju iz ovih metapodataka: potvrđeni znakovi se kopiraju u opisani rezultat sa izvorom, pouzdanošću i intervalom, i prikazuju se kao nepouzdana zapažanja zajedno sa natpisima okvira. Nevažeći tekst koji je izvan opsega ili tekst bez porijekla se odbija umjesto da se miješa u tok titlova. Oba kanala transkripta tijela zahtjeva normaliziraju dostavljeno porijeklo za `client`, uključujući samopotvrđene `embedded` ili `audio-bridge` oznake. Samo adapter u vlasništvu servera može dodijeliti te pouzdane oznake kroz argument `trustedSource` samo za kod; polje zahtjeva JSON ne može doći do tog argumenta. Tekst transkripta ostaje nepouzdani medijski sadržaj, bez obzira na porijeklo, i nikada ne smije odrediti autorizaciju.

Napredni pozivalac može dati `audioTranscript` stazu za isti video; tretira se kao tekst koji daje klijent, a ne kao dokaz serverske transkripcije. Fusion šav pokreće vizuelna i audio zapažanja pod jednim signalom roka i prekida, naređuje ih na zajedničkoj vremenskoj liniji, skuplja tačne duplikate i izvještava o djelomičnom rezultatu kada samo jedna strana uspije. Nevažeći `audioTranscript` degradira na taj djelimični rezultat — vizualni opis se čuva i audio grana snima sanirani kod greške — umjesto da pokvari cijeli video. Dostupnost po grani, djelomična zastavica i sanirani kodovi grešaka su sačuvani u opisanom rezultatu, u metapodacima zaštitne ograde (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), u metapodacima predmemorije rezultata i u brojačima fuzije mosta. Zadana putanja Video Bridgea ne poziva govor u tekst niti preuzima drugu medijsku kopiju; bez tog eksplicitnog zapisa, ostaje samo video.

**Zadržavanje transkripta (#12150 P1).** Ovo se automatski primjenjuje kad god Video Bridge (sam se uključi) renderira znak transkripta — ne postoji posebna oznaka za zadržavanje. Kada zahtjev generira bilo koji znak transkripta ( `transcript` deklariran od pozivatelja ili spojeni `audioTranscript`), zaštitna ograda ga označava `videoBridgeObserved` i proizvodi redigovanu sjenu video opisa — identično prikazivanje u kojem je tijelo slobodnog teksta svakog znaka zamijenjeno `[redacted-video-transcript]`, izgrađeno zamjenom strcue polja prije nego što je struktura parver zamijenjena ( spljošten tekst, tako da ne može preživjeti nikakav sadržaj znakova — adversarial ili običan, uključujući tijela koja sadrže `]` kao što je `[inaudible]`/`[music]` — ). Uporno tijelo zahtjeva za evidenciju poziva zamjenjuje svaki dio teksta izveden iz video zapisa za tu redigovanu sjenu, u skladu sa jednakošću sadržaja; `fullText` sidro se ponovo čita iz gotovog pre-call guardrail korisnog opterećenja, tako da podudaranje i dalje uspijeva nakon što kasnije lančane ograde ( PII i maskeri akreditiva, prioriteti 10/95) prepišu tekst opisa na mjesto i nakon system-prompt/handoff/memory injekcije preoblikuje niz poruka. Tijelo poslano uzvodno do modela je nepromijenjeno. Posmatrani zahtjev također ne popunjava trajnu memoriju (preskačuju se i ekstrakcija izvedena iz zahtjeva i iz odgovora), tako da vlastiti odgovor modela ne može odjekivati tekst transkripta u Memoriju.

**Sirova video polja (#12430).** Kada je most omogućen, a izvorna video podrška je nepoznata ili odsutna, definirana polja `transcript`/`audioTranscript` također aktiviraju `videoBridgeObserved`, čak i nakon neuspjeha opisa ili ograničenja `maxVideos`. `null` i broj praznih nizova; odsutna polja i ne-video metapodaci nemaju. Zadržane kopije rediguju ova polja ili izostavljaju zahtjev, a caches/Memory se zaobilaze.

Na tim rezervnim putanjama, važeći znakovi pozivaoca postaju podržani `text`/`input_text` dijelovi umjesto nestandardnih polja dobavljača. Obje trake koje su dostavljene na zahtjev ostaju nepouzdane opservacije `client`, uz eksplicitno upozorenje da video nije opisan i vremenske oznake nisu provjerene u medijima. Postojeći 256-cue/64-KiB ukupni i per-cue budžeti se primjenjuju na dva kolosijeka zajedno; vremenske oznake moraju odgovarati brokerovom plafonu od 600 sekundi i svakom priloženom fokusnom prozoru. Nevažeći zapisi se odbacuju, ne prosleđuju se kao proizvoljan tekst; važeći brat ili sestra se i dalje može koristiti osim ako njihov kombinovani budžet nije premašen. Null/empty polja ne dodaju tekst. Ova rezervna verzija ne dodaje dohvat medija ili transkripciju. Polja ekstenzije transkripta su uklonjena sa rezervnog video nosača i njegovih `video_url`/`source` objekata. Lista dozvoljenih OpenAI žice ostaje stroga; nepoznati izvorni video nosači ostaju dostupni, a poznati samo tekstualni ciljevi čuvaju sigurne markere. Sjene strukturirane redakcije štite priloženi tekst transkripta, dok izvorni zahtjev u vlasništvu pozivatelja ostaje nepromijenjen. Native podržani ciljevi i onesposobljeni mostovi zadržavaju svoje postojeće ponašanje zaobilaznice.

Dodatne zadržane kopije koriste isti signal zapaženog zahtjeva. Neobrađena pre-guardrail snimak klijentskog zahtjeva, zahtjev u memoriji na čekanju i dnevnik ranog odbijenog zahtjeva strukturalno zamjenjuju polja transkripta u video dijelovima; string prompti sintetizirani fazama cjevovoda i predajom konteksta se rediguju u perzistentnom prijemniku tijela zahtjeva. Trajni `video_content_removed` marker čini da nastavak `previous_response_id` ne uspijeva zatvoriti umjesto da rekonstruiše tekst koji je namjerno odbačen. Ako uočeni zahtjev izgubi svoju sjenu redakcije po dijelu prije evidentiranja, ili čak jedna od nekoliko sjenki videa ne uspije da se podudara nakon kasnijih mutacija zahtjeva, zadržano tijelo zahtjeva se u potpunosti izostavlja umjesto zadržavanja djelimično redigovanog transkripta.

Za promatrani zahtjev, model odgovora može citirati bilo koji dio transkripta bez strukturirane granice znaka. Njegov trajni dnevnik poziva `responseBody` je stoga zamijenjen markerom izostavljanja; detaljni artefakt cjevovoda (koji može uključivati upstream/client tijela i dijelove toka) se ne zadržava. Semantički, idempotencija i keširanje rezonovanja zaobilaze čitanje i pisanje za taj zahtjev. Zahtjev provajdera i odgovor koji je vidljiv klijentu ostaju nepromijenjeni. Rani bajtovi održavanja aktivnosti se dreniraju iz privremenog međuspremnika kada se izostavi detaljni artefakt. Kiro-ovo pogrešno oblikovano EventStream upozorenje prijavljuje samo broj bajtova korisnog opterećenja, nikada njegov sadržaj ili sirovu grešku JSON parsera. Ovo ne tvrdi da je svaka nepovezana provider/plugin dijagnostika revidirana; širi zahvat zadržanog ponora se prati u #11658.

Unutrašnji životni ciklus `/api/modality-bridge/video/drilldown` je zaseban, loopback/token-authenticated keš supstrat. Svaka operacija također zahtijeva kanonski neprozirni principal ID. Prije nego što se proizvodni pozivalac omogući, on mora izvesti taj ID od provjerenog zakupca i nikada ne smije proslijediti vrijednost koju je izabrao klijent. Keš ključevi vezuju tog principala za kanonsku sesiju i video-referencu IDs, pohranjuju samo svoje SHA-256-derived ključeve i obim čitanja i brisanja na istom principalu. Keš memorija pohranjuje najviše 16 izvedenih JPEG okvira po unosu, ističe ih nakon deset minuta i podržava ograničeno `start`/`end` čitanje ili eksplicitno brisanje sesije.

Svaki principal je ograničen na 16 unosa i 64 MiB kanonskih JPEG podataka. Ta ograničenja su nezavisna od globalne 64-entry/256 MiB gornje granice: pritisak kvote principala izbacuje samo najmanje nedavno korištene unose tog principala prije nego što se razmotri globalno LRU izbacivanje. Istekli unosi se brišu iz glavnog i globalnog računovodstva o aktivnosti keša, dok otkazivanje i neuspjeh provjere valjanosti ne urezuju djelomičnu zamjenu.

Keš memorija odbija nekanonski Base64, višak dopuna, ne-JPEG medije, deformisane ili skraćene JPEGs i JPEGs koji proizvode upozorenje tokom ograničenog `sharp` dekodiranja pune slike. Ponovo kodira svaku prihvaćenu sliku kao kanonski JPEG, izvlači širinu i visinu iz dekodiranih bajtova umjesto povjerenja u polja pozivaoca i odbacuje sve zadnje bajtove poliglota umjesto da ih zadržava. Samo ograničeni kanonski komprimirani bafer se naplaćuje za obje kvote. Ograničenje JSON žice uključuje Base64 nadzemne troškove za plafon dekodiranih ulaza od 32 MiB. Svaka pohranjena derivacija bilježi svoj validirani JPEG format/resolution, politiku uzorkovanja, verziju derivacije, vrijeme kreiranja, heš sadržaja koji je izračunao server i heširanu roditeljsku referencu plus heš roditeljskog sadržaja pouzdanog pozivaoca. Otkazivanje se provjerava između asinhronih decode/hash faza prije urezivanja atomske keš memorije.

Proizvođač produkcije ponovo koristi već izvedene brokerske okvire samo nakon uspješne vizualne analize, bez drugog video download/extraction. Zahtijeva operator `modalityBridgeVideoDrilldownEnabled=true`, strogi po dio `drilldown: true` i autentificirani zapis API ključa ID. principal/session vrijednosti koje je deklarirao klijent nikada ne uspostavljaju vlasništvo. Bez sva tri uslova ne hešira, ne menja veličinu ili zadržava dodatne okvire. Neuspjeh zadržavanja čuva upotrebljiv vizualni odgovor. Zahtjevi s pristankom zaobilaze keš rezultata cijelog videa, tako da keširani rezultati nikada ne obrađuju ručke za ponovno reprodukciju.

Uspješni JSON i SSE odgovori otkrivaju najviše četiri neprozirna ručke u ograničenom `x-omniroute-video-drilldown` zaglavlju. Ovlašteni izvori pretraživača mogu čitati to zaglavlje bez proširenja politike porijekla CORS. Nove ručke koriste `v1.<32-byte random base64url token>`, a registar zadržava samo njihove SHA-256 hešove. reader/header parser takođe prihvata stare 64-hex tokene. Autentifikovani javni potrošač je `GET /api/v1/video-bridge/drilldown?handle=...`, nezavisno zatvoren od strane `modalityBridgeVideoDrilldownRemoteEnabled=true`. Eksplicitno postojano lažno opoziva pristup čak i kada je omogućena zastarjela `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env rezerva. Zadržavanje proizvodnje ima analogno naslijeđeno `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` rezervno rješenje. Obe rezerve su podrazumevano isključene.

Potrošač izvodi vlasništvo iz autentificiranog ključa i primjenjuje ključnu politiku: i GET i DELETE pripadaju kategoriji krajnje točke `video`, uključujući `/v1` i `/api/v1` alijase. Ključevi sa nepraznom listom dozvoljenih krajnjih tačaka moraju uključivati `video`; neograničeni ključevi ostaju kompatibilni. Potrošač vraća isti 404 za nepoznate, istekle i ručice drugog ključa. Prihvata `variant=preview|standard|detail` (maksimalna JPEG dimenzija 320/640/1280, nikad uvećana), `limit=1..8` (ili naslijeđeni `frames` alias, nikad oboje), `page` zasnovan na nuli i opcione sekunde fokusa `start`/`end`. Duplicirani ključevi upita i prozori obrnutih fokusa se odbijaju. Svaka vraćena varijanta ima hash svog stvarnog sadržaja i stvarne metapodatke rezolucije, povezane sa zadržanim izvorom. Varijante se izvode na čitanju, a ne pohranjuju kao dodatne zadržane kopije. JSON odgovor, uključujući Base64/envelope, ograničen je na 32 MiB; prevelika stranica vraća 413 i klijent mora zatražiti manje okvira. Čita otkazivanje provjere oko svake promjene veličine i ponovno provjerava valjanost ručke prije vraćanja. `DELETE` od strane vlasnika je idempotentan; brisanje ili istek TTL oslobađa zadržani izvor i obračun upotrebe.

Zajedničko skladište je procesno lokalno: ručke ističu pri ponovnom pokretanju i nisu prenosive između nezavisnih OmniRoute procesa. Statistike upravljanja otkrivaju efikasnu politiku zadržavanja/udaljene politike i zbirni zadržani samo entries/bytes, nikada mediji, reference, glavni IDs ili ručke. Ploča s postavkama videa prikazuje te vrijednosti i može zadržati oba prekidača saglasnosti. Ova implementaciona dokumentacija nije dokaz za implementaciju ili unapređenje; Prihvatanje stvarnog modela se prati zasebno.

Kadrovi su uzastopno označeni konfiguriranim Video modelom. Prazan video override nasljeđuje postavku Vision; ako su oba prazna, Vision auto-ruter bira efektivni model sa mogućnošću vida. Uspješni titlovi zamjenjuju originalni dio stabilnim `[Video description:` prefiksom koji također označava tekst kao nepouzdano zapažanje izvedeno iz medija i govori modelima koji se nalaze na nižem toku da ne slijede upute pronađene u medijima. Ključevi keša opisa okvira uključuju JPEG bajtove, prompt, vremensku oznaku i efektivni model; samo uspješni titlovi se keširaju. Unosi u keš memoriju zadržavaju stvarni uspješan model proizvođača, uključujući rezervni model; most javlja `mixed` kada su različiti modeli proizvedeni od strane različitih modela. Pogodak u keš memoriji ponovo koristi taj identitet proizvođača umjesto da ga ponovo označava kao traženi plan rutiranja. Predmemorija rezultata cijelog videa je ključna na svakom ulazu koji mijenja izlazni — prompt, efektivni model, politiku uzorkovanja, broj okvira, način semantičke analize, SHA-256 otisak prsta normaliziranog nagoveštaja fokusa, prozor fokusa, `transcript`, `audioTranscript` i zastavicu kontaktnog lista — tako da promjena bilo koje od tih dimenzija nikada nije ponovno korištenje cache stache. Verzija politike vizualnog dedupiranja, prag i ograničeni broj okvira kandidata su također eksplicitni u ključu i metapodacima predmemorije rezultata; promjena politike stoga ne može ponovo koristiti zastarjeli opis cijelog videozapisa. Metapodaci predmemorije rezultata v4 čuvaju način rada i otisak prsta, a nikada sirovi korisnički zadatak. Metapodaci Guardrail-a izvještavaju o traženim i efektivnim načinima analize; traženi `focused` režim bez upotrebljivog korisničkog teksta se prijavljuje kao efektivno `full`.

Zaštitna ograda izdvaja svaki podržani video dio, ali ne opisuje više od `modalityBridgeVideoMaxVideos`. Za cilj za koji je dokazano da ima `supportsVideo === false`, neuspjeli i prekoračeni videozapisi postaju eksplicitni sigurni tekstualni markeri tako da nijedan sirovi video ne preživi. Kada je sposobnost nepoznata, ti dijelovi zadržavaju svoj video nosač; svaki rezervni transkript slijedi prethodnu konverziju ograničenog teksta. Mete sa `supportsVideo === true` zaobilaze most. Signal za prekidanje zahtjeva klijenta širi se kroz preuzimanje, red čekanja brokera, podprocese i pozive naslova; prekida zaustavljanje između video zapisa i nikada ne otvara za sirove medije.

Runtime postavke su podržane od strane DB-a i Zod validirane:

| Ključ                               | Default     | Raspon / ponašanje                                                                                     |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Opciono vrijeme izvođenja, opt-in                                                                      |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` čuva generičke natpise; `focused` koristi ograničeni, nepouzdani kontekst posljednjeg korisnika |
| `modalityBridgeVideoModel`          | `""`        | Naslijedite model Vision Bridge                                                                        |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                   |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ili proporcionalni `segment_aware`; kvar detektora se vraća na `uniform`     |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                    |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                         |

Naslijeđene vrijednosti vremenskog ograničenja videa iznad 120 sekundi su vezane za rok brokera; nova podešavanja upisuju iznad tog ograničenja se odbijaju. `GET /api/modality-bridge/video/runtime` zahtijeva pouzdani žigosani lokalitet povratne petlje prije provjere autentičnosti ili ispitivanja u vremenu izvođenja, zatim zahtijeva auth upravljanja. Vraća samo `available`, dezinficirane FFmpeg/ffprobe verzije i fiksni razlog kada vrijeme izvođenja nije dostupno. Unutrašnja krajnja tačka ekstrakcije nije javni upload API: zasićenje reda vraća `503` plus `Retry-After`, prekidanje veze pozivaoca vraća `499`, a fiksni rok posrednika vraća `504`. Konvertovani odgovori dodaju `video->text;model=<visionModel>;parts=<videos>` u centralno `x-omniroute-modality-bridge` zaglavlje bez uklanjanja Vision ili Audio segmenata.

### PII masker (`piiMasker.ts`)

Radi dalje** oboje** faze.

- **`preCall`** klonira korisni teret, hoda `system`, `messages`, `input` i `prompt` (uključujući obične stringove) i primjenjuje `processPII()` (od `@/shared/utils/inputSanitizer`) na niz `content`/`text` polja. Kada `PII_REDACTION_ENABLED=true`, otkriveni PII se rediguje u izlaznom korisnom učitavanju. Ovo je nezavisno od `INPUT_SANITIZER_MODE` (koji kontroliše samo politiku brze injekcije). Kada je redigovanje isključeno, otkrivanje zapisa poziva se računa bez ponovnog pisanja sadržaja.
- **`postCall`** duboko klonira odgovor, pokreće `sanitizePIIResponse()` plus masker oblika Responses-API (`maskResponsesOutput` — pokriva `output_text` i `output[].content[].text`). Ako dođe do bilo kakve redakcije, izmijenjeni odgovor zamjenjuje original.

Zaštitna ograda nikada ne blokira; samo označava (`meta.detections`, `meta.redacted`) ili prepisuje.

#### Odabir po tipu, prilagođeni obrasci i brojači detekcije

**Kontrolna tabla → Postavke → Sigurnost → PII maskiranje** bira _šta_ je maskirano. Ne uključuje maskiranje: to je i dalje `PII_REDACTION_ENABLED` (zahtjev) i `PII_RESPONSE_SANITIZATION` (odgovor + SSE), oba su isključena po defaultu.

- **Odabir po tipu** — ugrađeni ID-ovi su navedeni u `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Unset znači svaki tip (ponašanje prije nego što je ova postavka postojala). `ssn_us` obrazac motora zahtjeva preslikava se u `ssn`. Predlošci (minimalni, standardni, finansijski, brazilski, USA, GDPR, POPIA, puni) ispunjavaju samo potvrdne okvire u UI.
- **GDPR i POPIA identifikatori** — dvanaest ugrađenih ID-ova koji pokrivaju EU i južnoafričke lične identifikatore (tabela ispod). Njihovi regularni izrazi, validatori i oznake nadležnosti žive u jednoj tabeli, `src/shared/utils/piiPatterns.ts`, koju konzumiraju i dezinfikator odgovora (`src/lib/piiSanitizer.ts`) i masker zahteva (`src/shared/utils/inputSanitizer.ts`). Podudaranje se rediguje samo kada ga validator prihvati; samo niz cifara nikada nije dovoljan. Operator koji je sačuvao suženi izbor prije nego što su ovi ID-ovi postojali zadržava ponašanje koje je imao sve dok se novi ID-ovi ne označe.
- **Prilagođeni uzorci** — do 20 obrazaca regularnog izraza ili zamjenskih znakova (`*` = do 64 znaka bez razmaka, `?` = jedan). Utakmice postaju `[CUSTOM_REDACTED]`. Svaki obrazac prolazi kroz `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): najviše 500 znakova, zastavice ograničene na `g i m s u`, moraju se kompajlirati, moraju proći `safe-regex` (katastrofalno vraćanje unazad) i ne smiju se podudarati s praznim nizom ili redakcijskim čuvarom mjesta. Obrazac koji ne uspije se odbija kada se pohrani i kada se testira, a pohranjeni red koji ne uspije se preskače u vrijeme izvođenja umjesto da se kompajlira. Prilagođeni obrasci se pokreću samo dok je maskiranje uključeno.
- **Brojači detekcije** — broji po tipu (nikada usklađene vrijednosti), drže se u memoriji i resetiraju pri ponovnom pokretanju (`src/lib/pii/piiDetectionStats.ts`). One se samo povećavaju dok je maskiranje uključeno.

Postavke žive u `key_value` tabeli (imenski prostor `pii_settings`, `src/lib/db/piiSettings.ts`) i čitaju se kroz keš memoriju od 1 s. API:

| Metoda | Put                      | Svrha                                                                      |
| ------ | ------------------------ | -------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stanje zastave, `enabledTypes`, `customPatterns`, brojači detekcije        |
| `PUT`  | `/api/settings/pii`      | Zamijenite `enabledTypes` (`null` = sve) and/or `customPatterns`           |
| `POST` | `/api/settings/pii/test` | Suhi rad jednog uzorka prema uzorku od najviše 8 KB; ništa nije pohranjeno |

Sva tri zahtijevaju autorizaciju upravljanja i potvrđuju tijelo sa Zod (`src/shared/validation/schemas/piiSettings.ts`). Kada je prijava onemogućena (`requireLogin=false`) `GET` i testna krajnja tačka su otvoreni, ali `PUT` i dalje treba sesiju kontrolne table, `manage` -scope API ključ, `oma_` pristupni token sa opsegom pisanja ili višim, ili CLI token ili token interne usluge koji se šalje iz povratne petlje.

#### GDPR (EU) i POPIA (Južna Afrika) identifikatori

| Id                  | Identifikator              | Validacija                                                                       |
| ------------------- | -------------------------- | -------------------------------------------------------------------------------- |
| `iban`              | IBAN                       | Poznata država, tačna dužina za tu zemlju, ISO 13616 MOD-97-10                   |
| `eu_vat`            | EU VAT broj                | Poznati prefiks države članice i format broja te države (bez traženja VIES )     |
| `es_dni_nie`        | španjolski DNI / NIE       | Kontrolno pismo (vrijednost mod 23); NIE je `X/Y/Z` + 7 cifara                   |
| `it_codice_fiscale` | Italijanski kodeks Fiscale | Kontrolno pismo iz tabela pozicija odd/even                                      |
| `pl_pesel`          | Poljski PESEL              | Ponderirani kontrolni zbroj i kodirani datum rođenja koji postoji                |
| `nl_bsn`            | holandski BSN              | 11-proof (težine 9..2, -1)                                                       |
| `de_steuer_id`      | njemački Steuer-ID         | ISO 7064 Mod 11,10 plus pravila o strukturi cifara (bez vodećih 0)               |
| `se_personnummer`   | Swedish personnummer       | Luhn preko zadnjih deset cifara i vjerodostojan datum rođenja (10 ili 12 cifara) |
| `za_id`             | Južnoafrički ID broj       | Luhn preko svih 13 cifara, važeći rodni month/day, cifra državljanstva 0 ili 1   |
| `za_phone`          | Južnoafrički telefon       | `+27` / `27` prefiks, ili nacionalni `0..` oblik napisan razmakom ili crticom    |
| `za_vat`            | Južnoafrički VAT broj      | 10 cifara koje počinju sa `4`** i** "VAT" / "BTW" u 48 znakova prije             |
| `za_tax_ref`        | Južnoafrička poreska ref.  | 10 cifara koje počinju `0`-`3`, Luhn,** i** "porez" / "SARS" u 48 znakova prije  |

Budući da se formati samo cifara sukobljavaju s brojevima naloga, brojevima izrade i vremenskim oznakama, najslabiji (`za_vat`, `za_tax_ref`) trebaju ključnu riječ cue, a goli desetocifreni `0..` broj se ne tretira kao južnoafrički telefonski broj. Razmak IBANs (`GB29 NWBK ...`) se ne podudara. Na stazi strujanja, cue se traži samo unutar trenutnog dijela. Id-ovi su ispred generičkih telefonskih obrazaca, tako da validirani identifikator zadržava svoj vlastiti čuvar mjesta (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Predlošci `gdpr` i `popia` odabiru EU odnosno južnoafričke ID-ove. Samo maskiranje ostaje uključeno (tvrdo pravilo #20): ništa ovdje ne mijenja zadanu zastavicu funkcije.

### Prompt Injection (`promptInjection.ts`)

Otkriva suprotstavljene strukture u sadržaju koji dostavljaju korisnici i provodi konfiguriranu politiku. Ponašanje je vođeno varijablama okruženja i opcijama konstruktora:

| Podešavanje | Env var                                                                                               | Default | Efekat                                                                                                                                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Omogućeno   | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | Kada `false`, zaštitna ograda ima kratki spoj.                                                                                                                                                             |
| Mode        | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Politika ubrizgavanja: `block`, `warn` ili `log`. (`redact` je prihvaćen za back-compat, ali prihvata** ne** tekst za ubrizgavanje trake; zahtjev za prepisivanje PII kontrolira `PII_REDACTION_ENABLED`.) |
| Prag bloka  | `blockThreshold` opcija / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Minimalna ozbiljnost potrebna za blokiranje. Medium je podrazumevano samo za posmatranje.                                                                                                                  |

**Prednost načina rada** (`getMode`): pozivalac `options.mode` → `INJECTION_GUARD_MODE`**DB nadjačavanje zastavice funkcije** (Nadzorna tabla → Postavke → Zastavice funkcija) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Nadjačavanje kontrolne table stoga pobjeđuje nad env vars, tako da Feature Flags UI kontrolira radnu zaštitu uživo (bez ponovnog pokretanja). DB čitanje je sigurno: ako dođe do greške, zaštita se vraća na ponašanje zasnovano na env-u, a kada nije postavljeno nadjačavanje, ponašanje je identično rezoluciji samo za env.

Izvori detekcije:

1. `sanitizeRequest()` iz `@/shared/utils/inputSanitizer` (zajednički skup detektora koji se koristi drugdje u cjevovodu).
2. Ugrađena `DEFAULT_GUARD_PATTERNS` (trenutno `system_override_inline` i `markdown_system_block`, oba `high` ozbiljnost).
3. Opcijski `customPatterns` proslijeđen preko opcija konstruktora (stringovi, regex ili `{ name, pattern, severity }` zapisi).

Kada `mode === "block"`** i** barem jedna detekcija zadovoljava prag ozbiljnosti, `preCall` vraća `{ block: true, message: "Request rejected: suspicious content detected" }`. U `warn`/`log` modovima, zaštitna ograda se evidentira, ali dozvoljava poziv. Zajednički pomoćnik `evaluatePromptInjection()` se također izvozi za pozivaoce koji trebaju procijeniti upite bez prolaska kroz registar.

**Veza za skeniranje (v3.8.20):** detektor samo pregledava** prvih 16 KB** spojenog teksta prompta — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajta) u `src/shared/utils/inputSanitizer.ts`. I `detectInjection()` i `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` prije pokretanja petlje uzorka. Injekcione direktive se nalaze blizu vrha ulaza, tako da ovo ograničava regex CPU/GC na više stotina KB korisnih opterećenja bez slabljenja detekcije (usp. #3932, #4041).

### Maska za vjerodajnice (`credentialMasker.ts`)

Radi dalje** oboje** faze, posljednje u zadanom lancu (prioritet `95`). Redigira dobro poznate obrasce API-ključa / tajnih tokena iz odlaznog korisnog opterećenja (sadržaj poruke, argumenti poziva alata, rezultati alata)** i** odgovor provajdera, tako da vjerodajnica zalijepljena u prompt (ili odjeknuta rezultatom alata) ne procuri do upstream provajdera ili nazad do klijenta.

- **Samo se uključite** , ista konvencija kao PII redakcija (tvrdo pravilo #20-susedno): onemogućeno osim ako `settings.credentialRedactionEnabled === true`** ili** `CREDENTIAL_REDACTION_ENABLED=true`. Kada je isključena, zaštitna ograda je neophodna — koju nikada ne blokira i nikada ne prepisuje.
- `redactCredentials()` hoda po cijelom payload/response stablu (`walkValue()`, prototype-pollution-safe,cycle-safe preko `WeakSet`) i zamjenjuje podudaranja sa `[REDACTED:<type>]` placeholderom, klonirajući samo grane koje su se stvarno promijenile.
- `CREDENTIAL_PATTERNS` covers LLM provider keys (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokens (GitHub, Slack, Linear, Notion, npm, Postman, Discord), payment keys (Stripe, Square), cloud keys (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs, credential-bearing connection strings (`mongodb://user:pass@...`, etc.), and a generic `Authorization`/`x-api-key`/`api-key`/`apikey` header-value pattern. Header-shaped keys (`authorization`, `x-api-key`, `api-key`, `apikey`) are redacted structurally (value only, scheme prefix like `Bearer `/`Basic ` preserved) rather than via the generic text regex.
- Zaštitna ograda nikada ne blokira; samo prepisuje (`modifiedPayload` / `modifiedResponse`) i stavlja komentare (`meta.credentialsRedacted`, `meta.count`).

Regresioni čuvar: `tests/unit/credential-masker-guardrail.test.ts`.

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
  block?: boolean; // true prekida izvršavanje lanca
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

Guardrail signalizira "bez promjene" vraćanjem bilo `void`, `{}` ili
`{ block: false }`. Vraćanje `modifiedPayload`/`modifiedResponse` zamjenjuje
vrijednost koja prolazi kroz lanac za naredne guardrailove.
`signal?: AbortSignal` prenosi životni ciklus pozivaoca u guardrailove. Prekid
zahtjeva (abort) je namjerni fail-open izuzetak: media bridge-ovi zaustavljaju
rad i čišćenje bez vraćanja sirovog medija cilju za koji se zna da ga ne
podržava.

## Registar (`registry.ts`)

Singleton `guardrailRegistry` izlaže:

- `register(guardrail)` — dodaje (ili zamjenjuje prema normaliziranom imenu)
  guardrail i ponovno sortira po rastućem `priority`.
- `clear()` / `list()` — administrativne pomoćne funkcije.
- `runPreCallHooks(payload, context)` — iterira kroz aktivne guardrailove,
  provlači payload kroz `modifiedPayload` i zaustavlja se na prvom
  `block: true`.
- `runPostCallHooks(response, context)` — isti tok na strani odgovora.
- `resetGuardrailsForTests({ registerDefaults })` — briše stanje i opcionalno
  ponovno registrira zadane vrijednosti radi čiste izolacije testova.

Oba runner-a vraćaju `{ blocked, payload|response, results, guardrail?, message? }`
gdje je `results` niz zapisa `GuardrailExecutionResult` koji uključuju polja
`blocked`, `skipped`, `modified`, `error` i `meta` po guardrail-u, korisna za
praćenje.

### Onemogućavanje guardrailova po zahtjevu

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` objedinjuje listu
bez duplikata imena guardrailova koja treba preskočiti za trenutni zahtjev.
Postoji pet kanala, čitaju se ovim redoslijedom i spajaju u jednu listu (pri
uklanjanju duplikata pobjeđuje prvo pojavljivanje):

1. `apiKeyInfo.disabledGuardrails`
2. Tijelo zahtjeva `disabledGuardrails` (vršni nivo)
3. Tijelo zahtjeva `metadata.disabledGuardrails` (samo kada je `metadata` objekt)
4. Zaglavlje `x-omniroute-disabled-guardrails`
5. Zastarjelo (legacy) zaglavlje `x-disabled-guardrails`

Svih pet kanala se spaja, uključujući i dva zaglavlja: slanje oba
`x-omniroute-disabled-guardrails` i `x-disabled-guardrails` preskače uniju
njihovih lista, a prazno moderno zaglavlje više ne skriva zastarjelo
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), ispravljeno u
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Vrijednosti mogu biti nizovi stringova ili string odvojen zarezima; s imena se
uklanjaju višak razmaci i normaliziraju se u kebab-case malim slovima
(`pii_masker` → `pii-masker`), a prazne stavke se odbacuju. Rezultat se
prosljeđuje kroz `context.disabledGuardrails` registru, koji preskače
odgovarajuće guardrailove (`skipped: true` u `results`).

Lista za onemogućavanje utječe samo na **registar**. Režim `block` za
prompt-injection je obavezna granica: middleware za zaštitu od injekcije
(`src/middleware/promptInjectionGuard.ts`) poziva `evaluatePromptInjection()`
bez ikakve liste za onemogućavanje koju kontrolira pozivalac (mrtvi poziv
`resolveDisabledGuardrails({ body })` koji je ranije izvršavao uklonjen je u
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), tako da zahtjev
koji onemogućava `prompt-injection` i dalje biva odbijen u režimu `block`. Ovo
je namjerno tako dizajnirano. Kanale za onemogućavanje kontrolira pozivalac
(tijelo zahtjeva, metapodaci, zaglavlja), a pozivalac ne smije moći isključiti
sigurnosnu kontrolu koju je postavio operator
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Unija
zaglavlja iz [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
mijenja samo to koji se guardrailovi registra preskaču; ne dozvoljava klijentu
da zaobiđe middleware. Obavezne politike guardrailova po ključu i po grupi prate
se u v4 RFC-u [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Pogledajte [Pokrivenost i ograničenja](#coverage-and-limits).

## Redoslijed izvršavanja

Za svaki zahtjev koji prolazi kroz `src/sse/handlers/chat.ts` i
`open-sse/handlers/chatCore.ts` (rute porodice chat navedene pod
[Pokrivenost i ograničenja](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` gradi listu preskakanja iz API ključa,
   tijela zahtjeva i zaglavlja.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` pokreće guardrail-e rastućim
   redoslijedom prioriteta:
   - Onemogućeni guardrail-i bilježe se kao `skipped`.
   - `preCall` svakog guardrail-a može prepisati payload putem `modifiedPayload`.
   - Prvi `block: true` prekida lanac i handler vraća odgovor o odbijanju
     od strane guardrail-a.
3. (Potencijalno prepisani) payload ulazi u combo rutiranje i upstream
   dispečiranje.
4. **Samo non-streaming:** nakon što se odgovor sastavi,
   `guardrailRegistry.runPostCallHooks(...)` pokreće isti lanac nad
   odgovorom. `block: true` ovdje odbacuje upstream odgovor i vraća HTTP 400. Streamovani odgovori ovaj korak u potpunosti preskaču.

Guardrail-i koji bace izuzetak bilježe se sa `error: <message>` i loguju putem
`logger.warn`, ali lanac se nastavlja — fail-open po dizajnu.

## Pokrivenost i ograničenja

Registar guardrail-a povezan je isključivo u chat pipeline. Ova ograničenja
fiksiraju testovi `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` i
`tests/unit/guardrail-pipeline-characterization.test.ts`; svjesno ažurirajte te
testove kada se ponašanje promijeni.

### Gdje se hook-ovi izvršavaju

| Hook / kontrola                     | Izvršava se na                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | Zahtjevi koje obrađuje `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (i `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` i Telegram chat proxy. Također i testni endpoint dashboarda `/api/guardrails/test`. Pre-call blok vraća HTTP 400. |
| `runPostCallHooks`                  | Samo **non-streaming** chat odgovori (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Streamovani odgovori nikada do njega ne dolaze.                                                                                                                                                                                                                                                                           |
| Streaming PII                       | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), spojen u pipeline unutar `streamingPipeline.ts` kada je `PII_RESPONSE_SANITIZATION` uključen. To nije guardrail, pa ga kanali za onemogućavanje ne utiču.                                                                                                                                                                                                |
| Injection-guard middleware (legacy) | Svaka `/v1` ruta koja nosi prompt, uključujući porodicu chat (vidi [pokrivenost ruta](#injection-guard-route-coverage--red-team-phase-8--block-d)). Samo prompt injection.                                                                                                                                                                                                                                             |

### Šta nije pokriveno

- **Rute za medije, embeddings i podatke** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) nikada ne dosežu registar. Tamo
  se ne izvršava nikakvo maskiranje PII podataka, maskiranje kredencijala niti
  modality bridge. Njihova jedina provjera je legacy injection-guard middleware.
- **Streamovani odgovori** nemaju post-call guardrail-e: nema post-call
  `pii-masker`-a ni `credential-masker`-a, i nema post-call bloka. Primjenjuje se
  samo streaming PII transformacija (kada je `PII_RESPONSE_SANITIZATION`
  uključen). Kredencijal koji se vrati (echo) u streamovanom odgovoru ne
  redaktira se.
- **Kanali za onemogućavanje naspram middleware-a (po dizajnu):** middleware
  procjenjuje prompt injection vlastitim pozivom `evaluatePromptInjection()`,
  bez prosljeđivanja ikakve liste onemogućavanja koju kontroliše pozivalac.
  Režim `block` obavezna je granica koju onemogućavanja pod kontrolom pozivaoca
  ne mogu zaobići, uključujući i rute porodice chat
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Onemogućavanje
  `prompt-injection` samo preskače guardrail iz registra.

### Šta vidi odgovor prije post-call faze

Na non-streaming putu redoslijed je: ekstrakcija memorije → izvršavanje ugrađenih
alata → post-call guardrail-i → izlaz zbog post-call bloka → pohrana u
semantički keš.

- **Ekstrakcija memorije** i **izvršavanje alata** vide odgovor prije nego što ga
  zaštitne mjere nakon poziva (post-call guardrails) mogu prepraviti ili blokirati.
  Od [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), ekstrakcija
  memorije propušta izvučeni tekst kroz `sanitizePII` kada je
  `PII_RESPONSE_SANITIZATION` uključeno (i u streaming i u non-streaming režimu),
  ali odgovor koji post-call zaštita kasnije blokira već je bio ponuđen memoriji i
  alatima.
- **Semantički cache** pohranjuje odgovor nakon post-call obrade, pa pohranjuje
  prepravljeni odgovor, a blokirani odgovor se nikada ne kešira. Unosi u cache su
  vezani za API ključ.

## Konfiguracija

Varijable okruženja koje čitaju ugrađeni zaštitni mehanizmi:

| Varijabla                             | Koristi ga                | Efekt                                                                                                          |
| ------------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Postavite `false` da potpuno onemogućite detekciju.                                                            |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Politika za injekcije: `warn`, `block` ili `log`. Zastarjela vrijednost `redact` ne prepisuje tekst injekcije. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Režim zaštite od injekcija; također DB feature flag koji **nadjačava** env varijable (DB > ENV).               |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Minimalna ozbiljnost koju `MODE=block` odbija: `high` (zadano), `medium` ili `low`.                            |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Zastarjeli alias za `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                         |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Kada je `true`, PII u zahtjevu se anonimizira (nezavisno od režima injekcije).                                 |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Kontrolira ponašanje maskera na strani odgovora.                                                               |

Zaštitni mehanizmi Modality Bridgea čitaju konfiguraciju za vrijeme izvođenja
iz spremišta postavki podržanog bazom podataka (`getSettings()`), a ne iz env
varijabli. Primarni ključevi za Vision su
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` i
`modalityBridgeCacheMaxEntries`. Zastarjeli
ključevi `visionBridge*` prihvaćaju se samo kao dokumentirani fallback za
čitanje u jednom ciklusu; upisi s nadzorne ploče koriste primarne ključeve.
Zadane vrijednosti i fallback resolver nalaze se u
`src/shared/constants/modalityBridgeDefaults.ts`, dok su zastarjele konstante
zadržane u `src/shared/constants/visionBridgeDefaults.ts`.

Audio koristi `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` i `modalityBridgeAudioMaxClips`, plus zajedničke
postavke `modalityBridgeCache*`. Audio nema fallback za zastarjele ključeve
jer su ovi ključevi uvedeni sa shemom Modality Bridgea.

Video koristi `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` i
`modalityBridgeVideoTimeout`, plus zajedničke postavke `modalityBridgeCache*`.
Zadano je onemogućen jer su FFmpeg/ffprobe opcionalne operativne zavisnosti, a
opisivanje okvira dodaje latenciju i trošak modela.

## Prilagođeni guardraili

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

1. Kreirajte `src/lib/guardrails/myGuardrail.ts` koji nasljeđuje `BaseGuardrail`.
2. Implementirajte `preCall` i/ili `postCall`.
3. Ili registrujte prilikom importa (push iz `registerDefaultGuardrails`) ili
   pozovite `guardrailRegistry.register(...)` u runtime-u — registar zamjenjuje
   svaki raniji guardrail s istim normaliziranim imenom.
4. Dodajte testove pod `tests/unit/` (postojeći primjeri:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testiranje

Koristite `resetGuardrailsForTests()` između testova kako biste počeli iz poznatog stanja.
Proslijedite `{ registerDefaults: false }` da biste počeli s praznim registrom i
registrovali samo guardraile koji se testiraju. Vision Bridge prihvata ubacivanje
zavisnosti (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge izlaže
ekvivalentne tačke proširivosti za postavke, mogućnosti, odabir STT modela, provjere
vjerodajnica i transkripciju. Testovi stoga mogu izvršavati oba toka bez pristupa
bazi podataka ili mreži.

## Pogledajte također

- `src/lib/guardrails/` — implementacija
- `src/shared/utils/inputSanitizer.ts` — dijeljeni detektor koji pokreće
  zaštitu od prompt-injection i maskiranje PII podataka
- `src/shared/constants/visionBridgeDefaults.ts` — zadane postavke Vision Bridge-a i
  lista modela s prisilnim korištenjem bridge-a
- `src/shared/constants/modalityBridgeDefaults.ts` — dijeljene zadane runtime postavke za Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalni sloj (circuit breaker, cooldown periodi)
- `docs/reference/ENVIRONMENT.md` — potpuna referenca varijabli okruženja

## Pokrivenost ruta injection-guardom i red-team (Faza 8 · Blok D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) pokriva sve rute
koje prihvataju korisničke promptove. Poštuje `INJECTION_GUARD_MODE` (zadano `warn` = samo
logiranje; `block` = vraća HTTP 400 `SECURITY_001`).

| Tip               | Rute                                                                                                                                                 | Zadani režim |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Tekst (postojeće) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn         |
| Generativno       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn         |
| Podaci            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn         |

Ekstrakcija teksta (`extractMessageContents`) pokriva `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (noćno, `nightly-llm-security.yml`):** promptfoo potvrđuje da svaka ruta blokira
OWASP-LLM korpus u `INJECTION_GUARD_MODE=block`; garak pokreće probe (preskače se ako secret nije dostupan).
`moderations` je uključen radi dosljednosti. Režim blokiranja je obavezna granica: `evaluatePromptInjection()`
ignorira listu onemogućenih zaštita po pojedinačnom zahtjevu koju joj middleware prosljeđuje, tako da
`disabledGuardrails` **ne** izuzima rutu iz nje ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Noćni workflow (`.github/workflows/nightly-llm-security.yml`, cron + ručno
pokretanje) ima dva posla:

- **`promptfoo-guard` (blokirajući)** — pokreće `promptfoo eval -c promptfooconfig.yaml`
  s `INJECTION_GUARD_MODE=block`. Svaki adverzarni slučaj (npr. "ignore all
  previous instructions…" — „zanemari sve prethodne instrukcije…", jailbreakovi u DAN
  stilu) provjerava da odgovor nosi `error.code === "SECURITY_001"`, tj. da je guard
  zaista odbio zahtjev.
- **`garak` (savjetodavni)** — pokreće garak `--probes promptinject,dan,leakreplay`
  protiv lokalne OmniRoute instance (`http://localhost:20128/v1`). Uslovljen je
  provider secretom (`PROMPTFOO_PROVIDER_KEY`); graciozno se preskače i ima
  nastavak `|| true`, pa izvještava bez rušenja CI-ja.

Pokrivenost guard pomagača (`createInjectionGuard` / `withInjectionGuard`)
obuhvata svaku `/v1` rutu koja nosi prompt; tekst prompta izvlači se iz
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` pomoću
`extractMessageContents()` u `src/shared/utils/inputSanitizer.ts`.
