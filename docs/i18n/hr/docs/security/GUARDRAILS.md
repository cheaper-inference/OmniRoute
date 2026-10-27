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

Osnovni model GLM 5.3 i `glm-5.3-{low,high,max}` imaju eksplicitne
`supportsVision:false` metapodatke u registru/specifikaciji. Varijante GLM 5.3
Flash ostaju modeli s nativnom vizijom. Ruta `/v1/messages` Claude Codea ulazi
u zajednički `handleChat` pre-call lanac guardraila **prije** pretvorbe iz
Claude formata u OpenAI format; ugniježdene slike iz rezultata alata `Read`
moraju biti opisane ili obrađene prije nego što ih ta pretvorba prenese u
OpenAI `image_url` sadržaj (#17069).

Presreće zahtjeve koji sadrže slike, a usmjereni su na **modele bez vizije**,
te ili preusmjerava cijeli zahtjev na model sposoban za viziju ili prije
upstream poziva zamjenjuje dijelove sa slikama tekstualnim opisima koje
proizvodi konfigurabilni vizijski model. To omogućuje pružateljima usluga koji
podržavaju samo tekst transparentno rukovanje multimodalnim korisnim podacima.

Tijek:

1. Preskoči ako ciljni model već podržava viziju (osim ako se nalazi na
   popisu prisilnog premošćivanja `isVisionBridgeForcedModel`).
2. Izdvoji dijelove sa slikama putem `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), koji delegira na **ujedinjeni detektor medija**
   `detectMediaParts()` u `open-sse/utils/mediaParts.ts` — jedinstveni izvor
   istine dijeljen s filtrom kompatibilnosti combo modela. Ekstrakcija je
   dopuštenim popisom ograničena na oblike koje `replaceImageParts` može
   umetnuti natrag (ugovor extract↔replace): OpenAI `image_url`, Anthropic
   base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` i
   Responses API `input_image`. Podudarajuće slike ugniježdene unutar Claude
   Code `tool_result.content` i izlaza alata Responses također se izdvajaju i
   zamjenjuju na svojim izvornim putanjama; oblici koji služe samo kao
   indikatori materijal su za combo filter i ne izdvajaju se. Preskoči ako
   nijedna nije pronađena.
3. Razriješi konfiguraciju izvođenja putem
   `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): novi ključevi postavki
   `modalityBridge*` imaju prednost; stari ključevi `visionBridge*` ostaju
   **jednociklusni fallback** (prozor za povratak). Preskoči prije bilo kakvog
   prolaska kroz medijske dijelove kada je most onemogućen.
4. Izbornik načina rada (`modalityBridgeVisionMode`, vidi tablicu ispod)
   odlučuje između preusmjeravanja i opisivanja. Preusmjeravanje vraća
   `modifiedPayload` u kojem je zamijenjen samo `model`, plus meta
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Putanja opisivanja: ograniči slike na `maxImages`, sastavi upit svjestan
   zadatka, provjeri predmemoriju opisa, pozovi vizijski model **paralelno**
   (`Promise.allSettled`) i umetni tekstualne dijelove `[Image N]: <description>`
   na njihovo mjesto. Neuspjelo opisivanje daje `null`: sirova slika se čuva
   za nepoznate ciljeve ili ciljeve sposobne za viziju (#4012), ali
   **potvrđeni izravni cilj koji podržava samo tekst** ili combo bez
   vizijskih modela dobiva eksplicitni tekstualni stub
   `(unavailable — no vision-capable provider connected)` za svaku neopisanu
   sliku, uključujući djelomične neuspjehe i slike izvan ograničenja poziva
   opisivanja (#17069). Postojeći fallback za opisivanje combo modela kada svi
   opisi ne uspiju ostaje na snazi (#8430).
6. Vrati `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Izbornik načina rada (`modalityBridgeVisionMode`)

| Način      | Zadano | Ponašanje                                                                                                                                                                                                                                                                                               |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Naslijeđena heuristika, nepromijenjena (#6640/#7204): modeli koji nisu combo/`auto/` preusmjeravaju se na najbolji vizijski model, osim ako izvorni model već ima ispravne vjerodajnice (tada describe); combo ciljevi uvijek koriste describe.                                                         |
| `describe` |        | Uvijek describe — blok za preusmjeravanje u potpunosti se preskače; korisnikov odabrani model uvijek odgovara.                                                                                                                                                                                          |
| `reroute`  |        | Prisilno preusmjeravanje: zaobilazi se zaštita koja zadržava model s vjerodajnicama. Zaštita vjerodajnica **cilja** preusmjeravanja i dalje vrijedi — kada ne postoji ispravan vizijski cilj, most blokira s jasnom pogreškom umjesto da opisuje ili šalje sirove slike cilju koji podržava samo tekst. |

Prisilni načini prekidaju izvođenje **prije** nego što se pokrene auto heuristika; ponašanje `auto` bajt-po-bajt je identično guardrailu prije PR-1.

#### Opseg API ključa (`visionBridgeKeyScope.ts`)

Kada API ključ pozivatelja ograničava `allowedConnections`, fondove kvota
(`allowedQuotas`) ili modele (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), most odabire samo
modele za preusmjeravanje i describe koje ključ smije koristiti, na vezama
koje ključ smije koristiti. Poziv describe tada uvijek prolazi kroz OmniRoute
self-loop sa zaglavljem `x-omniroute-self-loop-key-id`, tako da primajući chat
zahtjev ponovno provodi pravila veza i modela tog ključa. `enforceApiKeyPolicy()`
poštuje to zaglavlje samo zajedno sa self-loop bearer tokenom, pa može samo
suziti pristup, a id koji se ne može razriješiti odbacuje se.

Ako nijedan vizijski model nije dopušten za ključ, **potvrđeni cilj koji
podržava samo tekst** lokalno odbija zahtjev sa slikom s jasnim HTTP 400
umjesto prosljeđivanja bajtova slike nesposobnom upstreamu (#17069). Za ciljeve
s nepoznatom ili urođenom vizijskom sposobnošću, describe putanja zadržava svoje
prethodno fail-open ponašanje (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Zahtjevi bez ključa i ključevi bez ovih ograničenja ponašaju se točno kao i prije.

#### Describe prompt svjestan zadatka (`modalityBridgeVisionTaskAware`)

Zadano **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) dodaje tekst
**zadnje korisničke poruke** (skraćen na 500 znakova) osnovnom describe promptu,
usmjeravajući opis prema onome što je korisnik zapravo pitao (obrazac
codex-vision-proxy) i tražeći od vizijskog modela da transkribira vidljivi
tekst. S isključenom zastavicom — ili bez korisničkog teksta — osnovni se
prompt koristi nepromijenjen.

Vlastiti OpenAI-kompatibilni zahtjev describe self-loopa (`callVisionModelSingle()`
u `visionBridgeHelpers.ts`) uvijek traži `image_url.detail: "high"` —
bezuvjetno, za svakog pozivatelja/pružatelja, a ne ovisno o bilo kojem
klijentskom signalu. Uzorkovanje niske razine detalja smanjuje OCR točnost
upravo za zadatak transkripcije teksta koji ovaj prompt traži, pa sam describe
poziv uvijek traži visoku razinu detalja bez obzira na razinu detalja koju je
koristio izvorni dolazni zahtjev. Ovo utječe samo na tijelo internog describe
zahtjeva; ne mijenja način na koji OmniRoute prosljeđuje pozivateljev vlastiti
`image_url.detail` na primarnom zahtjevu — ta se zadana vrijednost primjenjuje
odvojeno, i to samo za otkrivene OpenCode klijente, u `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Anthropic wire-format grana
describe self-loopa nema polje `detail` i nije pod utjecajem nijedne od zadanih
vrijednosti.

#### Ograničenje describe izlaza (`modalityBridgeVisionMaxChars`)

| Ključ                          | Zadano | Raspon            |
| ------------------------------ | ------ | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` ili 100–50000 |

`0` (zadano) znači **bez ograničenja** — opis koji vraća `callVisionModel()`
prosljeđuje se nepromijenjen, čuvajući postojeće ponašanje. Bilo koja vrijednost
u rasponu 100–50000 skraćuje opis s nastavkom `…` prije nego što se umetne
natrag kao `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` u
`src/lib/guardrails/visionBridge.ts`). Povećajte ovu vrijednost za OCR zadatke
bogate detaljima gdje downstream model treba potpunu transkripciju; smanjite je
da ograničite potrošnju tokena kod pričljivih vizijskih modela. Polje na
nadzornoj ploči nalazi se na panelu Advanced na kartici Vision
(`modality-bridge-max-chars` u `ModalityBridgeVisionTab.tsx`) i steže svaku
vrijednost između 1 i 99 na donju granicu od 100, dok izričitu `0` ostavlja
nepromijenjenom — `0` je valjana Zod vrijednost sama po sebi
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), a ne samo
zadana vrijednost za "nepostavljeno".

#### Describe predmemorija (`modalityBridge/bridgeCache.ts`)

LRU + TTL predmemorija u memoriji za describe izlaze, dijeljena u cijelom
procesu. Ključ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s
okvirom prefiksa duljine (bez kolizija na granicama polja). Komponenta modela je
**konfigurirani** bridge model, a ne model koji je zapravo odgovorio —
`callVisionModel` može interno prijeći na rezervni, a ključiranje po pokušaju
fragmentiralo bi predmemoriju. Neuspjeli describe pozivi nikad se ne spremaju u
predmemoriju. Postavke:

| Ključ                           | Zadano | Raspon  |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Normalizacija udaljene slike (self-loop describe/base64 dohvat)

Kada bridge sam dohvaća **udaljenu** sliku — Anthropicov describe self-poziv i konverzija u claude-wire-format base64 (`ensureBase64ImagesForClaudeWire`), oboje putem `fetchRemoteImageAsDataUri()` u `visionBridgeHelpers.ts` — rezultirajući data URI propušta se kroz `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) prije ugrađivanja u zahtjev vision-modela. Predimenzionirane slike smanjuju se na **dulji brid od 2048px** (što odgovara gornjoj granici promjene veličine koju OpenAI/Anthropic već primjenjuju na strani poslužitelja), što smanjuje količinu prenesenih bajtova/latenciju bez promjene onoga što vision model vidi. Promjena veličine koristi `sharp`, učitan dinamičkim importom: na platformi na kojoj se njegova nativna binarna datoteka ne uspije učitati, `normalizeDataUri()` **nikad ne baca iznimku** — prelazi na passthrough izvornih bajtova, pa put describe/base64-konverzije uvijek nastavlja raditi. Bajtovi koji nisu slika (dohvat koji nije vratio dekodabilnu sliku) također se propuštaju netaknuti. Ova je normalizacija ograničena na slike koje bridge dohvaća za vlastiti self-poziv — nikad se ne primjenjuje na sirovi passthrough payload pozivatelja, u skladu s načelom izmjene samo uz izričitu suglasnost (opt-in) (Strogo pravilo br. 20).

#### Shema postavki + migracija

Novi `modalityBridge*` ključevi validiraju se Zodom u `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trojka `modalityBridgeCache*` i grupa `modalityBridgeAudio*` koju koristi Audio Bridge. Migracija `141_modality_bridge_settings.sql` kopira postojeće zastarjele `visionBridge*` vrijednosti u odgovarajuće nove ključeve (idempotentno, nikad ne prebrisuje vrijednost `modalityBridge*` koju je postavio operator); zastarjeli ključevi ostaju prihvaćeni kao rezervni način čitanja tijekom jednog ciklusa izdanja.

#### Zaglavlje transparentnosti + statistika

Odgovori transformirani describe-om nose `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (gradi ga `buildModalityBridgeHeader()` u `modalityBridge/bridgeStats.ts`, utiskuje `withModalityBridgeHeader()` u `src/sse/handlers/chatHelpers.ts`). Preusmjereni zahtjevi **ne** dobivaju zaglavlje — payload je ostao netaknut, a zamjena modela već je vidljiva u polju `model` tijela odgovora.

`GET /api/modality-bridge/stats` (upravljačka autentikacija, isti nivo kao `GET /api/settings`) vraća brojače po modalitetu u memoriji `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio` i `video`. `averageLatencyMs` koristi `latencySamples`, a ne sve pokušaje, kao nazivnik; operacija bez mjerenja vremena ne izmišlja uzorak od nula milisekundi. `bridged` ostaje unazadno kompatibilan alias za uspješne konverzije; neuspješni pokušaji ne uvećavaju ga. Brojači se namjerno resetiraju pri ponovnom pokretanju procesa (telemetrija, ne obračun).

#### Konfiguracija nadzorne ploče

Namjenska stranica nadzorne ploče je `/dashboard/settings/modality-bridge`. Njezine kartice `Vision`, `Audio` i `Video`, adresabilne putem URL-a, zadržavaju parametre upita pri promjeni vrijednosti `tab`. Kartica Vision izlaže omogućavanje, način rada, odabir modela (uključujući automatski zadani), promptanje svjesno zadatka (task-aware), napredna ograničenja timeouta/slika/duljine opisa/predmemorije, brojače izvođenja i zaštićeni probni zahtjev. Kartica Audio također je aktivna: izlaže omogućavanje, birač modela samo za STT s opcijom Auto, ograničenja timeouta/maksimalnog isječka, audio brojače i probni test `input_audio`. Kartica Video funkcionalna je: prijavljuje runtime stanje FFmpeg/ffprobe — jedno od četiri eksplicitna stanja korisničkog sučelja (`unknown` dok je provjera u tijeku ili se nije mogla dovršiti, `restricted` na hostu nadzorne ploče koji nije loopback, gdje se provjera preskače na strani klijenta, `unavailable` nakon što je provjereno i potvrđeno da nedostaje, ili `available` s verzijama FFmpeg/ffprobe) — trajno sprema ograničenja omogućavanja/modela/okvira/videa/timeouta, filtrira birač modela na modele sposobne za vid i izlaže video brojače.

Bivša kartica Vision Bridge u postavkama AI sada je poveznica radi kompatibilnosti na novu stranicu; više ne sadrži drugu kopiju obrasca. Media Providers također povezuje tijekove rada Image-to-Text i Speech-to-Text s odgovarajućim karticama Modality Bridgea bez uklanjanja postojećeg Speech-to-Text playgrounda.

**Zaobilaženje kontrole prijema u self-loop:** kada describe poziv prolazi kroz OmniRouteov vlastiti `/v1` self-loop (nestandardni model pružatelja), podzahtjev šalje `x-omniroute-admission-bypass: internal` i autentificira se razriješenom self-loop vjerodajnicom — lokalnim `sk_omniroute` sentinelom u lokalnom načinu rada ili env ključem `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` koji je konfigurirao operator (#1350), tako da implementacije s `REQUIRE_API_KEY=true` i dalje mogu izvoditi describe poziv. Zaobilaženje se poštuje samo za točno te vjerodajnice, pa vanjski klijenti ne mogu koristiti zaglavlje za preskakanje kontrole prijema.

Zastarjele zadane vrijednosti nalaze se u `src/shared/constants/visionBridgeDefaults.ts`; nove zadane vrijednosti za način rada/task-aware/predmemoriju i razrješavač postavki nalaze se u `src/shared/constants/modalityBridgeDefaults.ts`. Guardrail izlaže opciju konstruktora `deps` kako bi testovi mogli ubrizgati lažne implementacije `getSettings` i `callVisionModel`.

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

Presreće video dijelove najviše razine u Chat Completions `messages` i
Responses API `input` prije nego što se pozove cilj bez poznate izvorne
podrške za video. Podržani oblici su `input_video`, `video_url`,
`video_source`, HTTPS URL-ovi i `data:video/*;base64,...` data URI-jevi.
Obični nazivi datoteka u tekstu ne smatraju se videom.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) odgovoran je za obilazak
zahtjeva, provjeru mogućnosti/pravila, agregaciju po zahtjevu i sadržaj
odgovora. Rad po videu — pribavljanje, predmemorija cjelokupnog rezultata,
opisivanje slijeda kadrova (koje spaja eventualni transkript zvuka koji je
deklarirao pozivatelj) te metrika/prekid/čišćenje po pokušaju — skriven je iza
`processVideoPart` u `videoBridgePipeline.ts`, koji se poziva jednom po video
dijelu unutar petlje `preCall`. Taj modul također definira eksplicitne granice
priključaka `VideoMediaBrokerPort` (pribavljanje bajtova i izdvajanje
uzorkovanih kadrova), `VideoAudioTranscriptionPort` (spajanje transkripta
zvuka deklariranog od pozivatelja s opisima uzorkovanih kadrova) i
`VideoDrilldownPort` (granica pohrane detaljne analize kadrova; još nije
povezana s `processVideoPart` — danas samo zasebna ruta
`/api/modality-bridge/video/drilldown` upisuje zapise detaljne analize).

Javna putanja zahtjeva `/v1` nikada ne uvozi niti poziva podproces. Udaljeni
videozapisi preuzimaju se uz ograničenje od 50 MiB; ugrađeni base64
videozapisi imaju konzervativno ograničenje od 36 MiB dekodirane veličine po
videu kako bi omotač modela, poruka i uokvirivanja ostao unutar javnog
ograničenja prijema JSON zahtjeva od 50 MiB. Duljina ugrađenog sadržaja i
procjena dekodirane veličine provjeravaju se prije alokacije. HTTPS je
obavezan na početnom udaljenom URL-u i svakom preusmjeravanju, koristeći
postojeći izlazni nadzor ograničen na javne adrese s DNS prikvačivanjem.
Bajtovi zatim prelaze točno određenu internu granicu posrednika
`POST /api/modality-bridge/video/extract`. Ta je ruta istovremeno `LOCAL_ONLY`
i `SPAWN_CAPABLE`, prihvaća samo zahtjev autentificiran na razini procesa s
pouzdane lokalne petlje (loopback), i nikada ne prihvaća URL, putanju
datotečnog sustava, izvršnu datoteku ili popis argumenata. Cjevovod veličine
tijela API-ja i inkrementalni čitač tijela rukovatelja neovisno nameću
ograničenje ulaza posrednika od 50 MiB. Njegov ograničeni red izvodi jednu
ekstrakciju odjednom, dopušta četiri posla na čekanju i ograničava ulaz na
čekanju na 100 MiB.

Unutar brokera, `ffprobe` čita privatnu lokalnu datoteku; fiksni popis dopuštenih formata isključuje formate popisa za reprodukciju i manifesta. Za dopuštene spremnike MOV obitelji vanjske reference MOV podataka ostaju prema zadanim postavkama onemogućene, a fiksna naredba ih ne aktivira. I `ffprobe` i `ffmpeg` koriste popis dopuštenih protokola ograničen samo na `file`, jednu dretvu, fiksna polja argumenata, bez ljuske, a izvršne datoteke rješavaju se iz `PATH`. Streamovi priloženih slika (naslovnica) nisu kandidati za reprodukciju. Svi streamovi koji se mogu reproducirati moraju zadovoljavati ograničenja, a eksplicitno zadani stream ima prednost prije determinističkog povratka na stream s najnižim indeksom. Videozapisi su ograničeni na 600 sekundi, 8 192 piksela po dimenziji i 33 554 432 izvornih piksela. FFmpeg uzorkuje 1–16 JPEG okvira srednjih točaka, smanjuje dulji brid na najviše 1 024 piksela bez uvećavanja manjih ulaza i nikada ne prima URL. Uzorkovanje je prema zadanim postavkama `uniform`. Neobavezna politika `scene_aware` i eksperimentalna politika `segment_aware` izvode jedan dodatni fiksni FFmpeg prolaz nad već validiranim lokalnim streamom, odabiru ograničene vremenske oznake scena iz `showinfo` te se deterministički vraćaju na iste uniformne srednje točke u slučaju kvara detektora, isteka vremena, neispravnog izlaza ili praznog skupa kandidata. Način rada segment-aware raspodjeljuje uzorke srednjih točaka proporcionalno validiranim intervalima scena; dokazi i ponašanje povratka za način segment-aware detaljno su opisani u nastavku. Kruto ograničenje od 16 okvira primjenjuje se nakon odabira u svakoj politici. Kada scene-aware zahtjev ima proračun od samo jednog okvira, koristi uniformnu srednju točku aktivnog prozora cijelog videa ili fokusa i prijavljuje `policyEffective: uniform`: jedan odabrani okvir scene ne može sačuvati oba vremenska kraja. Pozivatelj može po želji navesti konačni prozor fokusa (`start`/`end` sekunde); granice se ograničavaju na trajanje medija, obrnuti ili nekonačni prozori odbijaju se, a sve politike uzorkovanja izvode se samo unutar normaliziranog intervala. Rezultirajući prozor uključen je u metapodatke uzorkovanja i u prefiks nepouzdanog opisa kako bi nizvodni modeli mogli razlikovati fokusirani isječak od cijele vremenske crte.

Semantički fokus opisa zasebna je, eksplicitna postavka. Zadani način analize `full` zadržava postojeći upit za okvir i nikada ne prosljeđuje tekst zahtjeva modelu za opis. U načinu `focused` most čita samo najnoviji neprazni `text`/`input_text` koji je napisao korisnik iz istog Chat ili Responses spremnika, normalizira ga na NFC, sažima kontrolne znakove i razmake te ga ograničava na 500 Unicode kodnih točaka. Prazan rezultat vraća se na točan `full` upit. Upotrebljiv savjet serijalizira se kao JSON u namjenskom bloku nepouzdanog korisničkog konteksta i smije samo dati prioritet uočljivim detaljima; ne može nadjačati zasebno upozorenje protiv slijeđenja uputa vidljivih ili čujnih u mediju. Tekstualni fokus nikada ne zaključuje `start`/`end` niti mijenja vremenski uzorkovatelj.

#### FU-07 strukturni dokazi segmenata

`segment_aware` koristi jedan ograničeni prolaz preanalize nad već validiranim lokalnim video streamom. Fiksni lanac filtara prvo skalira na širinu od najviše 320 piksela, detektira promjene scena i zamrznute intervale, a zatim uzorkuje brzinom od 1 okvira u sekundi radi zamućenosti, prosječne lume te prostornih/vremenskih informacija. Prolaz je ograničen na 600 strukturnih uzoraka, jednu FFmpeg/filter dretvu, iste popise dopuštenih protokola ograničenih samo na `file` i spremnika, ograničenje izlaza procesa od 1 MiB i najviše 30 sekundi unutar zajedničkog prekida/roka brokera. Nikada ne prihvaća naredbu, filtar, putanju ili URL iz zahtjeva.

Strukturne vrijednosti deterministički su dokazi uzorkovanja, a ne semantičko razumijevanje videa. Ne zaključuju subjekte, radnje, opise, govor ili korisničku namjeru. Granice scena i zamrzavanja čine segmente; pokrivenost zamrzavanjem, zamućenost, ekspozicija, prostorni detalji i vremenske promjene utječu samo na način raspodjele postojećeg proračuna od 1–16 okvira. Potpuno zamrznuti segment ograničen je na jedan okvir, dok se nezamrznuti segmenti natječu za preostali proračun. Kada je granica više od okvira, zadržava se uniformna pokrivenost vremenske crte kako brzi rani rezovi ne bi mogli sakriti dugi završni segment. Granice scena unutar analitičke rezolucije od 1 sekunde od granice zamrzavanja spajaju se.

Nedostajući filtri, neispravni ili prazni dokazi, pogreška detektora ili ograničeni istek vremena preanalize uzrokuju fail open na točnu politiku uniformnih srednjih točaka. Prekid pozivatelja ili rok brokera ne uzrokuje fail open: prekida podproces u tijeku, sprječava kasniju ekstrakciju okvira, a privatno privremeno stablo uklanja se u `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generira determinističke stvarne FFmpeg fiksture za uštede poziva opisa nakon deduplikacije, raspodjelu proračuna za gusti pokret, dokaze o zamućenosti/ekspoziciji/SI-TI, brze rezove s dugim repom i lažno pozitivne rezultate postupnog blijeđenja. Bilježi proteklo (wall) vrijeme preanalize te, gdje je dostupan `/usr/bin/time`, CPU podprocesa i vršni RSS. Njegove provjere kvalitete samo su strukturni orakli. Stvarna kvaliteta modela za opis ostaje `HOLD` jer ovaj testni okvir nema ovlaštenu krajnju točku niti zamrznutog suca. Novčane uštede također ostaju `HOLD` osim ako `--caption-cost-per-call-usd` ne navede eksplicitnu pozitivnu procjenu po pozivu; skripta nikada ne izmišlja nijedan od ta dva rezultata.

Svaki je okvir ograničen na 4 MiB, svi sirovi okviri zajedno na 23 MiB, a
serijalizirani odgovor brokera na 32 MiB. Privatni se privremeni direktorij
uklanja u `finally`. OmniRoute ne isporučuje FFmpeg i ne prihvaća prilagođenu
putanju izvršne datoteke. Prije opisivanja most primjenjuje konzervativni
prolaz vizualne deduplikacije: svaki se JPEG svodi na sivi međuspremnik
16×16 i uspoređuje samo s posljednjim zadržanim okvirom. Za zatraženi
proračun opisa veći od jednog okvira, ekstrakcija pruža ograničen skup
kandidata veličine do dvostrukog proračuna i nikada više od 16 okvira.
Zatraženi gornji limit primjenjuje se tek nakon deduplikacije, pri čemu se
prvi i posljednji odabrani kandidati čuvaju tijekom završnog prorjeđivanja
kada proračun iznosi najmanje dva. Verzionirana politika
`grayscale-16x16-mean-cells-v2` koristi veću od dviju vrijednosti: prosječnu
delta lumine i omjer ćelija minijature čija normalizirana delta iznosi
najmanje 0.05. Prag duplikata je konstanta 0.04, odabrana radi
predvidljivosti, a ne izložena kao postavka tijekom izvođenja. Ovaj
sekundarni visokokontrastni signal čuva male pomake i promjene vidljivog
teksta koje usporedba temeljena samo na prosjeku može sakriti. Pogreške
komparatora ili dekodera tretiraju se kao otvoreni neuspjeh (fail open) i
zadržavaju pokrivenost. Izlazni metapodaci odvajaju izvučene kandidate,
uspješno korištene okvire i odbačene vizualne duplikate.

Izričito označeni video dio može zatražiti kontaktni list s vremenskim
oznakama. Most izrađuje najviše JPEG rešetku od 4 stupca i 16 okvira. Svaka
ćelija od 512 piksela ugravira svoju izvornu vremensku oznaku u
visokokontrastnu donju traku, dok iste vremenske oznake ostaju u tekstualnim
metapodacima za naknadno povezivanje i reviziju. Cjeloviti JPEG ostaje
ograničen na 32 MiB. Ako `sharp` ne može dekodirati ili sastaviti rešetku,
most se vraća na pojedinačne JPEG okvire; prekid klijenta i dalje se
propagira kroz operaciju lista.

Dokazi za promaknuće namjerno su odvojeni od sintetičkog mikrobenchmarka
kompozicije. `scripts/perf/video-bridge-contact-sheet-eval.ts` definira A/B
testni okvir s verzioniranom shemom za stvarne OpenAI-kompatibilne vizijske
modele. Mjeri tokene koje prijavljuje davatelj, ukupno stvarno kašnjenje od
kraja do kraja (uključujući sastavljanje lista), broj poziva modela i
zadržavanje činjenica definirano manifestom. Sirovi odgovori modela ne
zapisuju se u izvješće; zadržavaju se samo SHA-256 sažeci i podudareni
ID-ovi činjenica. Okvir ne upućuje mrežne niti plaćene pozive modela osim
ako nije proslijeđen `--execute-real` te su konfigurirani `--model`,
`OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY`. Bez tog izričitog stvarnog
pokretanja njegov strojno čitljiv ishod ostaje `HOLD`; sama sintetička
mjerenja tereta i broja poziva nisu dokaz za promaknuće.

Pozivatelji mogu priložiti neobavezno polje `transcript.cues` podržanom
video dijelu kada već posjeduju poravnati tekst. Svaki cue mora nositi
`text`, konačni interval `start`/`end` unutar ispitane duljine te `source`
s popisa dopuštenih (`client`, `embedded` ili `audio-bridge`); `confidence`
zadano iznosi `1` i mora ostati između `0` i `1`. Točni duplikati cueva
sažimaju se. OmniRoute nikada ne pokreće transkripciju iz ovih metapodataka:
validirani cuevi kopiraju se u opisani rezultat s izvorom, pouzdanošću i
intervalom te se prikazuju kao nepouzdana zapažanja uz opise okvira.
Nevažeći tekst, tekst izvan raspona ili tekst bez podrijetla odbacuje se
umjesto da se pomiješa u tok opisa. Oba kanala transkripta u tijelu zahtjeva
normaliziraju navedeno podrijetlo na `client`, uključujući samodeklarirane
oznake `embedded` ili `audio-bridge`. Samo adapter u vlasništvu poslužitelja
može dodijeliti te pouzdane oznake putem argumenta `trustedSource` dostupnog
samo u kodu; polje JSON u zahtjevu ne može dosegnuti taj argument. Tekst
transkripta ostaje nepouzdan sadržaj izveden iz medija, bez obzira na
podrijetlo, i nikada ne smije određivati autorizaciju.

Napredni pozivatelj može pružiti zapis `audioTranscript` za isti video; on
se tretira kao tekst koji je dao klijent, a ne kao dokaz poslužiteljske
transkripcije. Spoj fuzije izvodi vizualna i audio zapažanja pod jednim
rokom i signalom prekida, raspoređuje ih na zajedničku vremensku crtu,
sažima točne duplikate i prijavljuje djelomični rezultat kada uspije samo
jedna strana. Nevažeći `audioTranscript` degradira se na taj djelomični
rezultat — vizualni se opis zadržava, a audio grana bilježi sanitizirani kod
pogreške — umjesto da ne uspije cijeli video. Dostupnost po grani, zastavica
djelomičnosti i sanitizirani kodovi pogrešaka čuvaju se u opisanom
rezultatu, u metapodacima zaštitnih mehanizama
(`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), u
metapodacima predmemorije rezultata i u brojačima fuzije mosta. Zadani put
Video Bridgea ne poziva pretvorbu govora u tekst niti preuzima drugu kopiju
medija; bez tog izričitog zapisa ostaje isključivo video.

**Zadržavanje transkripta (#12150 P1).** Ovo se primjenjuje automatski kad god
Video Bridge (koji je sam po sebi opt-in) prikaže cue transkripta — ne postoji
zasebna zastavica zadržavanja. Kada zahtjev prikaže bilo koji cue transkripta
(`transcript` koji je deklarirao pozivatelj ili spojeni `audioTranscript`),
guardrail ga označava kao `videoBridgeObserved` i stvara redigiranu sjenu opisa
videa — identičan prikaz u kojem je slobodno tekstualno tijelo svakog cuea
zamijenjeno s `[redacted-video-transcript]`; sjena se gradi zamjenom
strukturiranog polja cuea prije sastavljanja stringa (nikada parsiranjem
spljoštenog teksta, tako da nikakav sadržaj cuea — neprijateljski ili obični,
uključujući tijela koja sadrže `]` poput `[inaudible]`/`[music]` — ne može
preživjeti). Tijelo zahtjeva u trajnom zapisniku poziva zamjenjuje svaki
tekstualni dio izveden iz videa tom redigiranom sjenom, podudarano po
jednakosti sadržaja; sidro `fullText` ponovno se čita iz dovršenog payloada
guardraila prije poziva, tako da podudaranje i dalje uspijeva nakon što kasniji
guardraili u lancu (maskeri PII-ja i vjerodajnica, prioriteti 10/95) prepišu
tekst opisa na mjestu i nakon što ubacivanje system-prompta/predaje/memorije
preoblikuje polje poruka. Tijelo poslano uzvodno modelu ostaje nepromijenjeno.
Promatrani zahtjev također ne popunjava trajni Memory (preskače se ekstrakcija
izvedena iz zahtjeva i iz odgovora), tako da vlastiti odgovor modela ne može
prenijeti tekst transkripta u Memory.

**Neobrađena polja videa (#12430).** Kada je most omogućen, a izvorna podrška
za video nepoznata ili odsutna, definirana polja `transcript`/`audioTranscript`
također aktiviraju `videoBridgeObserved`, čak i nakon neuspjeha opisa ili
ograničenja `maxVideos`. `null` i prazni stringovi računaju se; odsutna polja i
metapodaci koji nisu video ne. Zadržane kopije redigiraju ta polja ili
izostavljaju zahtjev, a predmemorije i Memory se zaobilaze.

Na tim pričuvnim putovima valjani cueovi pozivatelja postaju podržani dijelovi
`text`/`input_text` umjesto nestandardnih polja pružatelja. Oba traga
dostavljena zahtjevom ostaju nepouzdana opažanja tipa `client`, s izričitim
upozorenjem da video nije opisan i da vremenske oznake nisu provjerene prema
mediju. Postojeća ograničenja od ukupno 256 cueova/64 KiB te budžet po cueu
primjenjuju se zajednički na oba traga; vremenske oznake moraju stati unutar
brokerske gornje granice od 600 sekundi i bilo kojeg dostavljenog prozora
fokusa. Nevaljani tragovi se odbacuju, a ne prosljeđuju kao proizvoljni tekst;
valjani srodni trag i dalje se može koristiti, osim ako je njihov zajednički
budžet prekoračen. Null/prazna polja ne dodaju tekst. Ova pričuva ne dodaje
dohvaćanje medija niti transkripciju. Polja proširenja transkripta uklanjaju se
iz pričuvnog nositelja videa i njegovih objekata `video_url`/`source`. Popis
dopuštenih polja (allowlist) OpenAIjevog žičnog formata ostaje strog; nositelji
videa s nepoznatom izvornom podrškom ostaju dostupni, a poznati ciljevi samo za
tekst zadržavaju sigurne oznake. Strukturirane sjene redigiranja štite
pridodani tekst transkripta, dok izvorni zahtjev u vlasništvu pozivatelja
ostaje nepromijenjen. Ciljevi s izvornom podrškom i onemogućeni mostovi
zadržavaju svoje postojeće ponašanje zaobilaženja.

Dodatne zadržane kopije koriste isti signal promatranog zahtjeva. Sirova snimka
klijentskog zahtjeva prije guardraila, zahtjev na čekanju u memoriji i rani
zapisnik odbijenih zahtjeva strukturno zamjenjuju polja transkripta u video
dijelovima; string upiti koje sintetiziraju faze cjevovoda i predaja konteksta
redigiraju se na slivniku (sink) trajnog tijela zahtjeva. Trajna oznaka
`video_content_removed` čini da nastavak putem `previous_response_id` propadne
zatvoreno (fail closed), umjesto da rekonstruira tekst koji je namjerno
dbačen. Ako promatrani zahtjev izgubi svoju sjenu redigiranja po dijelu prije
zapisivanja, ili ako se čak i jedna od nekoliko video sjena ne uspije podudarati
nakon kasnijih izmjena zahtjeva, zadržano tijelo zahtjeva izostavlja se u
cijelosti, umjesto da se zadrži djelomično redigirani transkript.

Za promatrani zahtjev odgovor modela mogao bi citirati bilo koji dio
transkripta bez strukturirane granice cuea. Njegov trajni `responseBody` u
zapisniku poziva stoga se zamjenjuje oznakom izostavljanja; detaljni artefakt
cjevovoda (koji može uključivati uzvodna/klijentska tijela i chunkove toka) ne
zadržava se. Semantičke predmemorije te predmemorije idempotentnosti i ponovne
reprodukcije rasuđivanja zaobilaze čitanja i pisanja za taj zahtjev. Zahtjev
prema pružatelju i odgovor vidljiv klijentu ostaju nepromijenjeni. Rani bajtovi
keepalivea iscrpljuju se iz privremenog međuspremnika kada se detaljni artefakt
izostavi. Kirovo upozorenje o neispravnom EventStreamu prijavljuje samo broj
bajtova payloada, nikada njegov sadržaj niti sirovu pogrešku JSON parsera.
Ovo ne tvrdi da je svaka nepovezana dijagnostika pružatelja/dodatka revidirana;
širi pregled zadržanih slivnika prati se u #11658.

Interni životni ciklus `/api/modality-bridge/video/drilldown` zaseban je
supstrat predmemorije autentificiran loopbackom i tokenom. Svaka operacija
također zahtijeva kanonski neprozirni ID principala. Prije nego što se
produkcijski pozivatelj omogući, mora izvesti taj ID iz autentificiranog
tenanta i nikada ne smije proslijediti vrijednost koju je odabrao klijent.
Ključevi predmemorije vežu tog principala uz kanonske ID-ove sesije i reference
videa, pohranjuju samo ključeve izvedene iz njih pomoću SHA-256 i ograničavaju
i čitanja i brisanje na istog principala. Predmemorija pohranjuje najviše 16
izvedenih JPEG okvira po unosu, ističe ih nakon deset minuta i podržava
ograničena čitanja `start`/`end` ili eksplicitno brisanje sesije.

Svaki je principal ograničen na 16 unosa i 64 MiB kanonskih JPEG podataka. Ta
su ograničenja neovisna o globalnom stropu od 64 unosa/256 MiB: pritisak kvote
principala izbacuje samo najmanje nedavno korištene unose tog principala prije
nego što se uopće razmotri globalno LRU izbacivanje. Istekli se unosi čiste iz
računovodstva principala i iz globalnog računovodstva pri aktivnosti
predmemorije, dok otkazivanje i neuspjeh validacije ne potvrđuju djelomičnu
zamjenu.

Predmemorija odbija nekanonski Base64, višak popunjavanja, medije koji nisu JPEG, oštećene ili skraćene JPEG slike te JPEG slike koje proizvode upozorenje tijekom ograničenog dekodiranja cijele slike pomoću `sharp`. Svaku prihvaćenu sliku ponovno kodira kao kanonski JPEG, izvodi širinu i visinu iz dekodiranih bajtova umjesto da vjeruje poljima pozivatelja, te odbacuje sve zaostale poliglotske bajtove umjesto da ih zadrži. Samo se ograničeni kanonski komprimirani međuspremnik uračunava u obje kvote. JSON ograničenje prijenosa uključuje Base64 režijske troškove za gornju granicu dekodiranog ulaza od 32 MiB. Svaka pohranjena derivacija bilježi svoj validirani JPEG format/rezoluciju, politiku uzorkovanja, verziju derivacije, vrijeme stvaranja, hash sadržaja izračunat na poslužitelju te hashiranu referencu roditelja plus hash sadržaja roditelja pouzdanog pozivatelja. Otkazivanje se provjerava između asinkronih faza dekodiranja/hashiranja prije atomičnog upisa u predmemoriju.

Ova tranša još ne povezuje produkcijskog proizvođača s rutom i ne pruža odabir varijanti višestrukih rezolucija. Putanja zahtjeva transparentnog Video Bridgea stoga ne uzrokuje dodatni rad, dok derivacija glavnog subjekta vezana uz klijenta i potpuni FU-08 životni ciklus višestrukih rezolucija ostaju eksplicitno planirani budući rad, a ne dokumentirano dovršeno ponašanje.

Okviri se opisuju sekvencijalno konfiguriranim Video modelom. Prazno Video nadjačavanje nasljeđuje Vision postavku; ako su obje prazne, Vision auto-usmjerivač odabire efektivni model sposoban za vid. Uspješni opisi zamjenjuju izvorni dio stabilnim prefiksom `[Video description:` koji također označava tekst kao nepouzdanu opservaciju izvedenu iz medija i govori nizvodnim modelima da ne slijede upute pronađene u mediju. Ključevi predmemorije opisa okvira uključuju JPEG bajtove, prompt, vremensku oznaku i efektivni model; samo se uspješni opisi pohranjuju u predmemoriju. Zapisi predmemorije zadržavaju stvarni uspješni model proizvođača, uključujući rezervni model; most izvještava `mixed` kada su različite okvire proizveli različiti modeli. Pogodak predmemorije ponovno koristi taj identitet proizvođača umjesto da ga preimenuje kao zatraženi plan usmjeravanja. Predmemorija rezultata cijelog videa ključirana je na svaki ulaz koji mijenja izlaz — prompt, efektivni model, politika uzorkovanja, broj okvira, način semantičke analize, SHA-256 otisak normaliziranog nagovještaja fokusa, prozor fokusa, `transcript`, `audioTranscript` i zastavica kontaktnog lista — tako da promjena bilo koje od tih dimenzija predstavlja promašaj predmemorije, nikada zastarjelu ponovnu uporabu. Verzija politike vizualne deduplikacije, prag i ograničeni broj kandidiranih okvira također su eksplicitni u ključu predmemorije rezultata i metapodacima; promjena politike stoga ne može ponovno iskoristiti zastarjeli opis cijelog videa. Metapodaci predmemorije rezultata v4 čuvaju način i otisak, nikada sirovi korisnički zadatak. Metapodaci zaštitnog mehanizma izvještavaju i zatraženi i efektivni način analize; zatraženi način `focused` bez iskoristivog korisničkog teksta izvještava se kao efektivno `full`.

Zaštitni mehanizam izvlači svaki podržani video dio, ali ne opisuje više od `modalityBridgeVideoMaxVideos`. Za cilj za koji je dokazano da ima `supportsVideo === false`, neuspjeli videozapisi i oni iznad ograničenja postaju eksplicitni sigurni tekstualni markeri, tako da nijedan sirovi video ne preživi. Kada je sposobnost nepoznata, ti dijelovi zadržavaju svoj video nosač; svaki rezervni transkript slijedi gore opisanu ograničenu konverziju teksta. Ciljevi s `supportsVideo === true` zaobilaze most. Signal prekida klijentskog zahtjeva propagira se kroz preuzimanje, red posrednika, podprocese i pozive opisa; prekidi se zaustavljaju između videozapisa i nikada ne otvaraju prolaz sirovim medijima.

Postavke izvođenja podržane su bazom podataka i validirane Zodom:

| Ključ                               | Zadano      | Raspon / ponašanje                                                                                    |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Neobavezno tijekom izvođenja, po izboru (opt-in)                                                      |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` čuva generičke opise; `focused` koristi ograničeni, nepouzdani kontekst zadnjeg korisnika      |
| `modalityBridgeVideoModel`          | `""`        | Naslijedi model Vision Bridgea                                                                        |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ili proporcionalni `segment_aware`; neuspjeh detektora vraća se na `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                        |

Zastarjele zadržane vrijednosti Video vremenskog ograničenja iznad 120 sekundi stežu se na rok posrednika; novi zapisi postavki iznad tog ograničenja odbijaju se.
`GET /api/modality-bridge/video/runtime` zahtijeva pouzdanu označenu loopback lokalnost prije autentikacije ili ispitivanja runtimea, zatim zahtijeva autentikaciju upravljanja. Vraća samo `available`, sanirane verzije FFmpeg/ffprobe i fiksni razlog kada runtime nije dostupan. Interna krajnja točka izdvajanja nije javni API za učitavanje: zasićenost reda vraća `503` plus `Retry-After`, prekid veze pozivatelja vraća `499`, a fiksni rok posrednika vraća `504`. Pretvoreni odgovori dodaju
`video->text;model=<visionModel>;parts=<videos>` središnjem
zaglavlju `x-omniroute-modality-bridge` bez uklanjanja Vision ili Audio segmenata.

### PII Masker (`piiMasker.ts`)

Izvodi se u **obje** faze.

- **`preCall`** klonira korisni teret, prolazi kroz `system`, `messages`, `input` i
  `prompt` (uključujući obične stavke niza znakova) te primjenjuje `processPII()` (iz
  `@/shared/utils/inputSanitizer`) na polja `content`/`text` koja sadrže nizove znakova. Kada je
  `PII_REDACTION_ENABLED=true`, otkriveni osobni podaci redigiraju se u odlaznom
  korisnom teretu. To je neovisno o `INPUT_SANITIZER_MODE` (koji upravlja samo
  pravilima za umetanje upita). Kada je redigiranje isključeno, poziv bilježi broj
  otkrivanja bez mijenjanja sadržaja.
- **`postCall`** dubinski klonira odgovor te pokreće `sanitizePIIResponse()` zajedno s
  maskirnikom za oblik Responses API-ja (`maskResponsesOutput` — obuhvaća
  `output_text` i `output[].content[].text`). Ako dođe do bilo kakvog redigiranja,
  izmijenjeni odgovor zamjenjuje izvorni.

Zaštitni mehanizam nikada ne blokira; samo dodaje napomene (`meta.detections`,
`meta.redacted`) ili mijenja sadržaj.

#### Odabir prema vrsti, prilagođeni uzorci i brojači otkrivanja

**Nadzorna ploča → Postavke → Sigurnost → Maskiranje osobnih podataka** određuje _što_ se maskira. Time se
maskiranje ne uključuje: za to se i dalje upotrebljavaju `PII_REDACTION_ENABLED` (zahtjev) i
`PII_RESPONSE_SANITIZATION` (odgovor + SSE), a obje su postavke prema zadanim vrijednostima isključene.

- **Odabir prema vrsti** — ugrađeni identifikatori navedeni su u
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ako vrijednost nije postavljena, primjenjuju se sve
  vrste (ponašanje prije uvođenja ove postavke). Uzorak
  `ssn_us` mehanizma za zahtjeve preslikava se u `ssn`. Predlošci (Minimalno, Standardno, Financijsko,
  Brazilsko, SAD, Potpuno) samo označavaju potvrdne okvire u korisničkom sučelju.
- **Prilagođeni uzorci** — do 20 regularnih izraza ili uzoraka sa zamjenskim znakovima (`*` = do 64
  znaka koji nisu razmaci, `?` = jedan znak). Podudaranja postaju `[CUSTOM_REDACTED]`.
  Svaki uzorak obrađuje se funkcijom `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): najviše 500 znakova, oznake su ograničene
  na `g i m s u`, mora se moći prevesti, mora proći provjeru `safe-regex` (katastrofalno
  vraćanje unatrag) te se ne smije podudarati s praznim nizom znakova ili rezerviranim mjestom za redigiranje.
  Uzorak koji ne prođe provjeru odbija se pri spremanju i testiranju, a pohranjeni redak
  koji ne prođe provjeru preskače se tijekom izvođenja umjesto prevođenja. Prilagođeni uzorci
  primjenjuju se samo dok je maskiranje uključeno.
- **Brojači otkrivanja** — broj otkrivanja za svaku vrstu (nikada podudarne vrijednosti), čuva se u
  memoriji i poništava pri ponovnom pokretanju (`src/lib/pii/piiDetectionStats.ts`). Brojači se
  povećavaju samo dok je maskiranje uključeno.

Postavke se nalaze u tablici `key_value` (imenski prostor `pii_settings`,
`src/lib/db/piiSettings.ts`) i čitaju se putem predmemorije od 1 s. API:

| Metoda | Putanja                  | Svrha                                                                       |
| ------ | ------------------------ | --------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stanje zastavice, `enabledTypes`, `customPatterns`, brojači otkrivanja      |
| `PUT`  | `/api/settings/pii`      | Zamjena `enabledTypes` (`null` = sve) i/ili `customPatterns`                |
| `POST` | `/api/settings/pii/test` | Probno pokretanje jednog uzorka na primjeru do 8 KB; ništa se ne pohranjuje |

Sve tri operacije zahtijevaju autentifikaciju za upravljanje i provjeravaju tijelo pomoću Zoda
(`src/shared/validation/schemas/piiSettings.ts`).

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

### Masker vjerodajnica (`credentialMasker.ts`)

Izvršava se u **obje** faze, posljednji u zadanom lancu (prioritet `95`). Maskira dobro poznate uzorke API ključeva / tajnih tokena iz odlaznog tereta (sadržaj poruke, argumenti poziva alata, rezultati alata) **i** odgovora pružatelja, tako da vjerodajnica zalijepljena u upit (ili vraćena rezultatom alata) ne procuri prema uzvodnom pružatelju ili natrag klijentu.

- **Samo po izričitoj aktivaciji (opt-in)**, ista konvencija kao i maskiranje PII podataka (blisko Tvrdom pravilu br. 20): onemogućeno osim ako je `settings.credentialRedactionEnabled === true` **ili** `CREDENTIAL_REDACTION_ENABLED=true`. Kada je isključeno, zaštitna barijera ne čini ništa — nikad ne blokira i nikad ne prepisuje.
- `redactCredentials()` prolazi kroz cijelo stablo tereta/odgovora (`walkValue()`, otporno na onečišćenje prototipa, sigurno od ciklusa putem `WeakSet`) i zamjenjuje podudaranja zamjenskom oznakom `[REDACTED:<type>]`, klonirajući samo grane koje su se stvarno promijenile.
- `CREDENTIAL_PATTERNS` pokriva ključeve LLM pružatelja (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokene (GitHub, Slack, Linear, Notion, npm, Postman, Discord), ključeve za plaćanja (Stripe, Square), ključeve oblaka (AWS pristupni ključ, Twilio, SendGrid, Mailgun), privatne ključeve / JWT-ove, nizove za povezivanje koji nose vjerodajnice (`mongodb://user:pass@...`, itd.) te generički uzorak vrijednosti zaglavlja `Authorization`/`x-api-key`/`api-key`/`apikey`. Ključevi u obliku zaglavlja (`authorization`, `x-api-key`, `api-key`, `apikey`) maskiraju se strukturno (samo vrijednost, prefiks sheme poput `Bearer `/`Basic ` ostaje sačuvan), a ne putem generičkog tekstualnog regexa.
- Zaštitna barijera nikad ne blokira; samo prepisuje (`modifiedPayload` / `modifiedResponse`) i dodaje napomene (`meta.credentialsRedacted`, `meta.count`).

Zaštita od regresije: `tests/unit/credential-masker-guardrail.test.ts`.

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
