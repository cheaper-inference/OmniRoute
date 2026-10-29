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

## Ugrađeni guardraili

Registar pri importu automatski učitava šest guardraila u redoslijedu
prioriteta (vidi `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Naziv               | Faza(e)        | Datoteka              |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Manji brojevi prioriteta izvršavaju se **prvi**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Osnovni model GLM 5.3 i `glm-5.3-{low,high,max}` imaju eksplicitne
`supportsVision:false` metapodatke u registru/specifikaciji. Varijante
GLM 5.3 Flash ostaju modeli s nativnom podrškom za vid. Ruta `/v1/messages`
u Claude Code-u ulazi u zajednički `handleChat` pre-call lanac guardraila
**prije** Claude-to-OpenAI prevođenja; ugniježdene slike iz rezultata `Read`
alata moraju biti opisane ili obrađene prije nego što ih to prevođenje
prebaci u OpenAI `image_url` sadržaj (#17069).

Presreće zahtjeve koji sadrže slike a ciljaju **modele bez podrške za vid** i
ili preusmjerava cijeli zahtjev na model sposoban za vid ili zamjenjuje
dijelove sa slikama tekstualnim opisima koje proizvodi konfigurabilni
vizijski model prije upstream poziva. Ovo omogućava provajderima koji
podržavaju samo tekst da transparentno rukuju multimodalnim payloadovima.

Tok:

1. Preskoči ako ciljni model već podržava vid (osim ako se pojavljuje na
   listi prisilnog premošćavanja `isVisionBridgeForcedModel`).
2. Izdvoji dijelove sa slikama putem `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), koji delegira **unificiranom detektoru
   medija** `detectMediaParts()` u `open-sse/utils/mediaParts.ts` — jedinom
   izvoru istine koji se dijeli s filtrom kompatibilnosti combo-a.
   Ekstrakcija je putem allowliste ograničena na oblike koje
   `replaceImageParts` može ponovno umetnuti (ugovor extract↔replace):
   OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` i Responses API `input_image`. Odgovarajuće slike
   ugniježdene unutar Claude Code `tool_result.content` i izlaza Responses
   alata također se ekstrahiraju i zamjenjuju na svojim izvornim putanjama;
   oblici koji služe samo kao indikatori materijal su za combo-filter i ne
   ekstrahiraju se. Preskoči ako se ništa ne pronađe.
3. Razriješi runtime konfiguraciju putem
   `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): novi ključevi postavki
   `modalityBridge*` imaju prednost; naslijeđeni ključevi `visionBridge*`
   ostaju **fallback za jedan ciklus** (prozor za povratak). Kada je most
   onemogućen, preskoči prije bilo kakvog obilaska medijskih dijelova.
4. Selektor načina rada (`modalityBridgeVisionMode`, vidi tabelu ispod)
   odlučuje između preusmjeravanja i opisivanja. Preusmjeravanje vraća
   `modifiedPayload` u kojem je zamijenjen samo `model`, uz meta
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Putanja opisivanja: ograniči broj slika na `maxImages`, sastavi prompt
   prilagođen zadatku, provjeri keš opisa, pozovi vizijski model
   **paralelno** (`Promise.allSettled`) i umetni tekstualne dijelove
   `[Image N]: <description>` na njihovo mjesto. Neuspjelo opisivanje daje
   `null`: sirova slika se zadržava za nepoznate ciljeve ili ciljeve
   sposobne za vid (#4012), ali **potvrđeni direktni cilj koji podržava samo
   tekst** ili combo bez ikakvog vida dobiva eksplicitni zamjenski tekst
   `(unavailable — no vision-capable provider connected)` za svaku neopisanu
   sliku, uključujući djelimične neuspjehe i slike iznad ograničenja poziva
   opisivanja (#17069). Postojeći fallback za opisivanje combo-a kada svi
   pokušaji ne uspiju ostaje na snazi (#8430).
6. Vrati `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selektor načina rada (`modalityBridgeVisionMode`)

| Režim      | Zadano | Ponašanje                                                                                                                                                                                                                                                                                                      |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Naslijeđena heuristika, nedirnuta (#6640/#7204): modeli koji nisu combo/`auto/` preusmjeravaju se na najbolji vizijski model, osim ako izvorni model već ima upotrebljive kredencijale (tada se vrši opisivanje); combo ciljevi uvijek opisuju.                                                                |
| `describe` |        | Uvijek opisivanje — blok preusmjeravanja se u potpunosti preskače; model koji je korisnik odabrao uvijek odgovara.                                                                                                                                                                                             |
| `reroute`  |        | Prisilno preusmjeravanje: zaštita zadržavanja modela s kredencijalima se zaobilazi. Zaštita kredencijala **cilja** preusmjeravanja i dalje se primjenjuje — kada ne postoji upotrebljiv vizijski cilj, most blokira s jasnom greškom umjesto da opisuje ili šalje sirove slike cilju koji podržava samo tekst. |

Prisilni režimi prave kratki spoj **prije** nego što se automatska heuristika pokrene; ponašanje `auto` bajt-po-bajt je identično zaštitnoj barijeri od prije PR-1.

#### Opseg API ključa (`visionBridgeKeyScope.ts`)

Kada API ključ pozivaoca ograničava `allowedConnections`, poolove kvota
(`allowedQuotas`) ili modele (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), most bira samo
modele za preusmjeravanje i opisivanje koje ključ smije koristiti, na
konekcijama koje ključ smije koristiti. Poziv opisivanja tada uvijek prolazi
kroz OmniRoute self-loop sa zaglavljem `x-omniroute-self-loop-key-id`, tako da
primljeni chat zahtjev ponovo primjenjuje politiku konekcija i modela tog
ključa. `enforceApiKeyPolicy()` poštuje to zaglavlje samo zajedno sa self-loop
bearerom, tako da može samo suziti pristup, a id koji se ne može razriješiti
se odbija.

Ako nijedan vizijski model nije dozvoljen za ključ, **potvrđeni cilj samo za
tekst** lokalno odbija zahtjev sa slikom s jasnim HTTP 400 umjesto da
prosljeđuje bajtove slike nesposobnom upstreamu (#17069). Za ciljeve s
nepoznatom ili nativnom vizijskom sposobnošću, putanja opisivanja zadržava
svoje dosadašnje fail-open ponašanje (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Zahtjevi bez ključa, i ključevi bez ovih ograničenja, ponašaju se tačno kao i
prije.

#### Prompt za opisivanje svjestan zadatka (`modalityBridgeVisionTaskAware`)

Zadano **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) dodaje
tekst **posljednje korisničke poruke** (skraćen na 500 znakova) osnovnom
promptu za opisivanje, usmjeravajući opis prema onome što je korisnik stvarno
pitao (obrazac codex-vision-proxy) i tražeći od vizijskog modela da
transkribira vidljivi tekst. Kad je zastavica isključena — ili nema
korisničkog teksta — osnovni prompt se koristi nepromijenjen.

Vlastiti OpenAI-kompatibilni zahtjev describe self-loop petlje
(`callVisionModelSingle()` u `visionBridgeHelpers.ts`) uvijek traži
`image_url.detail: "high"` — bezuslovno, za svakog pozivaoca/provajdera, bez
uslovljavanja bilo kakvim klijentskim signalom. Uzorakovanje s niskim nivoom
detalja smanjuje OCR tačnost upravo za zadatak transkripcije teksta koji ovaj
prompt zahtijeva, pa sam poziv opisivanja uvijek traži visok nivo detalja bez
obzira koji je nivo detalja koristio izvorni dolazni zahtjev. Ovo utječe samo
na tijelo internog zahtjeva za opisivanje; ne mijenja način na koji OmniRoute
prosljeđuje pozivaočev vlastiti `image_url.detail` na primarnom zahtjevu — ta
se zadana vrijednost primjenjuje odvojeno, i to samo za detektirane OpenCode
klijente, u `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`).
Anthropic wire-format grana describe self-loop petlje nema polje `detail` i
nije pod utjecajem nijedne od zadanih vrijednosti.

#### Ograničenje izlaza opisivanja (`modalityBridgeVisionMaxChars`)

| Ključ                          | Zadano | Raspon            |
| ------------------------------ | ------ | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` ili 100–50000 |

`0` (zadano) znači **bez ograničenja** — opis koji vrati
`callVisionModel()` propušta se neizmijenjen, čime se čuva postojeće
ponašanje. Svaka vrijednost u rasponu 100–50000 skraćuje opis dodavanjem
sufiksa `…` prije nego što se umetne natrag kao `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` u `src/lib/guardrails/visionBridge.ts`).
Povećajte ovu vrijednost za OCR zadatke s mnogo detalja gdje downstream model
treba potpunu transkripciju; smanjite je da ograničite potrošnju tokena kod
opširnih vizijskih modela. Polje na kontrolnoj ploči nalazi se na panelu
Advanced kartice Vision (`modality-bridge-max-chars` u
`ModalityBridgeVisionTab.tsx`) i svaku vrijednost između 1 i 99 podiže do
donje granice od 100, dok eksplicitno zadanu `0` ostavlja nedirnutom — `0` je
valjana Zod vrijednost sama za sebe
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), a ne samo
zadana vrijednost u smislu "nije postavljeno".

#### Keš opisivanja (`modalityBridge/bridgeCache.ts`)

LRU + TTL keš u memoriji za izlaze opisivanja, dijeljen u cijelom procesu.
Ključ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s
uokvirivanjem pomoću prefiksa dužine (bez kolizija na granicama polja).
Komponenta ključa za model je **konfigurirani** model mosta, a ne model koji
je stvarno odgovorio — `callVisionModel` se interno može prebaciti na rezervni
model, a formiranje ključa po pokušaju bi fragmentiralo keš. Neuspjela
opisivanja se nikada ne keširaju. Postavke:

| Ključ                           | Zadano | Raspon  |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Normalizacija udaljenih slika (self-loop describe/base64 dohvatanje)

Kada most sam dohvata **udaljenu** sliku — self-poziv za describe kod Anthropica i konverzija u base64 za claude-wire-format
(`ensureBase64ImagesForClaudeWire`), oba putem
`fetchRemoteImageAsDataUri()` u `visionBridgeHelpers.ts` — rezultirajući data
URI prosljeđuje se kroz `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) prije ugrađivanja u zahtjev za vision-model. Predimenzionirane slike smanjuju se na **2048px po dužoj stranici** (što odgovara ograničenju promjene veličine koje OpenAI/Anthropic već primjenjuju na strani servera), što smanjuje bajtove/latenciju pri učitavanju bez promjene onoga što vision model vidi. Promjena veličine koristi `sharp`, učitan putem dinamičkog importa: na platformi na kojoj se njegov nativni binarni fajl ne može učitati, `normalizeDataUri()` **nikada ne baca izuzetak** — vraća se na propuštanje originalnih bajtova, tako da put describe/base64-konverzije uvijek nastavlja raditi. Bajtovi koji nisu slika (dohvatanje koje nije vratilo dekodirajuću sliku) također se propuštaju neizmijenjeni. Ova normalizacija ograničena je na slike koje most dohvata za vlastiti self-poziv — nikada se ne primjenjuje na sirovi passthrough payload pozivaoca, u skladu s principom izmjene samo po izričitom odabiru (Strogo pravilo br. 20).

#### Shema postavki + migracija

Novi `modalityBridge*` ključevi validiraju se Zod-om u `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*`, te grupa
`modalityBridgeAudio*` koju koristi Audio Bridge. Migracija
`141_modality_bridge_settings.sql` kopira postojeće zastarjele
`visionBridge*` vrijednosti u odgovarajuće nove ključeve (idempotentno, nikada ne prepisuje vrijednost `modalityBridge*` koju je postavio operator); zastarjeli ključevi ostaju prihvaćeni kao rezervni izvor čitanja tokom jednog ciklusa izdanja.

#### Zaglavlje transparentnosti + statistike

Odgovori transformisani putem describe-a nose zaglavlje
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(gradi ga `buildModalityBridgeHeader()` u `modalityBridge/bridgeStats.ts`, a postavlja `withModalityBridgeHeader()` u `src/sse/handlers/chatHelpers.ts`). Preusmjereni zahtjevi **ne dobijaju** zaglavlje — payload je ostao nepromijenjen, a zamjena modela već je vidljiva u polju `model` tijela odgovora.

`GET /api/modality-bridge/stats` (autentifikacija upravljanja, isti nivo kao
`GET /api/settings`) vraća brojače po modalitetu u memoriji
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio` i
`video`. `averageLatencyMs` koristi `latencySamples`, a ne sve pokušaje, kao svoj nazivnik; operacija bez mjerenja vremena ne fabrikuje uzorak od nula milisekundi. `bridged` ostaje unazad kompatibilan alias za uspješne konverzije; neuspješni pokušaji ga ne uvećavaju.
Brojači se po dizajnu resetuju pri ponovnom pokretanju procesa
(telemetrija, ne knjigovodstvo).

#### Konfiguracija nadzorne ploče

Namjenska stranica nadzorne ploče je
`/dashboard/settings/modality-bridge`. Njezine kartice `Vision`, `Audio` i
`Video`, adresabilne putem URL-a, čuvaju query parametre prilikom promjene vrijednosti `tab`. Kartica Vision izlaže omogućavanje, način rada, odabir modela (uključujući automatski zadani), promptanje prilagođeno zadatku (task-aware), napredna ograničenja vremenskog limita/broja slika/dužine opisa/keša, brojače u vremenu izvršavanja i zaštićeni probni zahtjev. Kartica Audio je također aktivna: izlaže omogućavanje, birač modela samo za STT s opcijom Auto, ograničenja vremenskog limita/maksimalnog isječka, audio brojače i probni test `input_audio`. Kartica Video je funkcionalna: prijavljuje stanje FFmpeg/ffprobe okruženja izvršavanja — jedno od četiri eksplicitna UI stanja (`unknown` dok je sonda u toku ili se nije mogla dovršiti, `restricted` na hostu nadzorne ploče koji nije loopback, gdje se sonda preskače na strani klijenta, `unavailable` nakon sondiranja i potvrde da nedostaje, ili `available` s verzijama FFmpeg/ffprobe) — čuva ograničenja enable/model/frame/video/timeout, filtrira birač modela na modele sposobne za vid i izlaže video brojače.

Bivša kartica Vision Bridge u postavkama AI sada je kompatibilna poveznica na novu stranicu; više ne posjeduje drugu kopiju obrasca. Media Providers također povezuje tokove rada Image-to-Text i Speech-to-Text s odgovarajućim karticama Modality Bridge, bez uklanjanja postojećeg Speech-to-Text okruženja za testiranje (playground).

**Zaobilazak prijema (admission) za self-petlju:** kada describe poziv prolazi kroz OmniRoute-ovu vlastitu `/v1` self-petlju (nestandardni model provajdera), podzahtjev šalje
`x-omniroute-admission-bypass: internal` i autentificira se razriješenom vjerodajnicom self-petlje — lokalnim `sk_omniroute` sentinelom u lokalnom načinu rada, ili env ključem `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` konfigurisanim od strane operatora (#1350), tako da implementacije s `REQUIRE_API_KEY=true` i dalje mogu izvršiti describe poziv. Zaobilazak se poštuje samo za te tačne vjerodajnice, tako da vanjski klijenti ne mogu koristiti zaglavlje za preskakanje prijema.

Zastarjele zadane vrijednosti nalaze se u `src/shared/constants/visionBridgeDefaults.ts`; nove zadane vrijednosti za način rada/task-aware/keš i razrješavač postavki nalaze se u
`src/shared/constants/modalityBridgeDefaults.ts`. Zaštitni mehanizam (guardrail) izlaže opciju konstruktora `deps` kako testovi mogu ubrizgati lažne implementacije `getSettings` i
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Presreće zahtjeve za ćaskanje koji nose audio prije nego što stignu do cilja za koji nije poznato da prihvata audio ulaz. Nikada ne preusmjerava zahtjev za ćaskanje: audio dijelovi se transkribiraju kroz postojeću OpenAI-kompatibilnu multipart krajnju tačku, a odabrani model za ćaskanje nastavlja s tekstualnim transkriptima.

Tok:

1. Razriješi `supportsAudio` putem `getResolvedModelCapabilities()`. Eksplicitni
   metapodaci registra provajdera imaju prednost, zatim statički metapodaci
   modela, a zatim sinhronizirani `modalities_input`. Deklarirana lista ulaza
   bez `audio` daje `false`; bez dokaza o mogućnostima ostaje `null`. I `false`
   i `null` aktiviraju konzervativni bridge, dok ga `true` zaobilazi.
2. Razriješi postavke `modalityBridgeAudio*` i izdvoji audio dijelove najvišeg
   nivoa koje je moguće izrezati iz svake poruke pomoću zajedničkog detektora
   `detectMediaParts()`. Podržani wire oblici su OpenAI `input_audio`,
   `audio_url` i `source.media_type: "audio/*"`. Ugniježđeni audio se otkriva
   radi usmjeravanja, ali ga splice putanja ne uklanja. Obim rada ograničen je
   sa `modalityBridgeAudioMaxClips`; kasniji dijelovi ostaju netaknuti.
3. Poštuj konfigurirani `provider/model`, ili pusti `selectAudioBridgeModel()`
   da prođe kroz `AUDIO_TRANSCRIPTION_PROVIDERS` u stabilnom redoslijedu
   kataloga i odabere prvi model s upotrebljivim aktivnim kredencijalom
   provajdera.
4. `callAudioTranscription()` pretvara base64/data-URI audio u multipart
   `file`, ili preuzima udaljeni `audio_url` kroz zaštitu odlaznog prometa
   samo prema javnim adresama s DNS pinningom i ograničenjem od 25 MB. Zatim
   POST-a datoteku i odabrani model na lokalni `/v1/audio/transcriptions`
   self-loop, autentificiran pomoću `resolveSelfLoopBearer()`. Postojeća ruta
   transkripcije obavlja uobičajeno pretraživanje kredencijala, rukovanje
   cooldown-om/rate-limitom i usmjeravanje ka provajderu.
5. Uspješni pozivi zamjenjuju svoje dijelove sa `[Audio N]: <transcript>`.
   Pozivi se izvršavaju s `Promise.allSettled`: pojedinačni neuspjeh čuva
   izvorni audio dio (ugovor #4012). Ako svi pozivi ne uspiju i cilj ima
   dokazano `supportsAudio === false`, dijelovi postaju
   `[Audio N]: (unavailable — no STT provider connected)` (ugovor #8430). Za
   nepoznati cilj (`null`), rezultat u kojem su svi pozivi neuspješni ostaje
   netaknut. Dokazani cilj koji podržava samo tekst, bez upotrebljivog STT
   kredencijala, dobiva isti eksplicitni stub bez slanja mrežnog poziva.

Uspješne transkripcije koriste LRU/TTL cache Modality Bridge-a na nivou
cijelog procesa. Ključ kombinira referencu na audio, stabilnu oznaku operacije
`audio-transcription` i odabrani STT model; neuspjesi se nikada ne keširaju.
Audio pokušaji ažuriraju zajedničke brojače `bridged`, `cacheHits`, `failures`
i `lastUsedAt`. Transformirani odgovori nose
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`;
netaknuti zahtjevi ne dobivaju segment Audio Bridge-a.

Postavke u vrijeme izvršavanja podržane su bazom podataka i validirane Zod-om:

| Ključ                         | Zadano  | Opseg           |
| ----------------------------- | ------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —               |
| `modalityBridgeAudioModel`    | `""`    | Auto ili STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10            |

Zajedničkim cache-om i dalje upravljaju `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` i `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Presreće video dijelove najvišeg nivoa u Chat Completions `messages` i
Responses API `input` prije nego što se pozove cilj bez poznate nativne
podrške za video. Podržani oblici su `input_video`, `video_url`,
`video_source`, HTTPS URL-ovi i `data:video/*;base64,...` data URI-jevi.
Obična imena datoteka u tekstu ne tretiraju se kao video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) upravlja prolaskom kroz
zahtjev, provjerom mogućnosti/pravila, agregacijom po zahtjevu i payload-om
odgovora. Rad po videu — pribavljanje, cache cjelokupnog rezultata,
opisivanje sekvence okvira (koje spaja eventualni audio transkript koji je
naveo pozivalac) i metrike/prekid/čišćenje po pokušaju — skriven je iza
`processVideoPart` u `videoBridgePipeline.ts`, pozvan jednom po video dijelu
unutar petlje `preCall`-a. Taj modul također definira eksplicitne granice
portova `VideoMediaBrokerPort` (pribavljanje bajtova i izdvajanje uzorkovanih
okvira), `VideoAudioTranscriptionPort` (spajanje audio transkripta navedenog
od pozivaoca s uzorkovanim natpisima) i `VideoDrilldownPort` (granica trajne
pohrane za detaljnu analizu okvira; još nije spojena u `processVideoPart` —
danas samo zasebna ruta `/api/modality-bridge/video/drilldown` upisuje zapise
detaljne analize).

Javna putanja zahtjeva `/v1` nikada ne uvozi niti poziva podproces. Udaljeni
videozapisi preuzimaju se uz ograničenje od 50 MiB; ugrađeni (inline) base64
videozapisi imaju konzervativno ograničenje dekodirane veličine od 36 MiB po
videu kako bi omotač koji čine model, poruke i uokviravanje mogao ostati
unutar javnog limita prihvatanja JSON zahtjeva od 50 MiB. Procjene ugrađene
dužine i dekodirane veličine provjeravaju se prije alokacije. HTTPS je
obavezan na početnom udaljenom URL-u i svakom preusmjerenju, koristeći
postojeću zaštitu odlaznog prometa samo prema javnim adresama s DNS
pinningom. Bajtovi zatim prelaze tačno određenu internu granicu brokera
`POST /api/modality-bridge/video/extract`. Ta ruta je istovremeno `LOCAL_ONLY`
i `SPAWN_CAPABLE`, prihvata samo zahtjev autentificiran na nivou procesa s
pouzdanog loopbacka i nikada ne prihvata URL, putanju datotečnog sistema,
izvršnu datoteku ili listu argumenata. Pipeline veličine tijela API-ja i
inkrementalni čitač tijela rukovatelja nezavisno nameću ograničenje ulaza
brokera od 50 MiB. Njegov ograničeni red izvršava jednu ekstrakciju odjednom,
dozvoljava četiri posla na čekanju i ograničava ulaz na čekanju na 100 MiB.

Unutar posrednika, `ffprobe` čita privatnu lokalnu datoteku; fiksna lista
dozvoljenih formata isključuje formate lista za reprodukciju i manifesta. Za
dozvoljene kontejnere iz MOV porodice, vanjske MOV reference na podatke ostaju
podrazumijevano onemogućene, a fiksna naredba ih ne omogućava. I `ffprobe` i
`ffmpeg` koriste listu dozvoljenih protokola ograničenu samo na `file`, jednu
nit, fiksne nizove argumenata, bez ljuske, te izvršne datoteke razriješene iz
`PATH`. Tokovi naslovnih slika u prilogu nisu kandidati za reprodukciju. Svi
tokovi koji se mogu reproducirati moraju zadovoljiti ograničenja, a eksplicitni
zadani tok ima prednost prije determinističkog rezervnog odabira toka s najnižim
indeksom. Videozapisi su ograničeni na 600 sekundi, 8.192 piksela po dimenziji i
33.554.432 izvorna piksela. FFmpeg uzorkuje 1–16 JPEG kadrova iz srednjih tačaka,
smanjuje dužu ivicu na najviše 1.024 piksela bez povećavanja manjih ulaza i
nikada ne prima URL. Uzorkovanje je podrazumijevano `uniform`. Opcionalna
pravila `scene_aware` i eksperimentalna pravila `segment_aware` izvode jedan
dodatni fiksni FFmpeg prolaz nad već potvrđenim lokalnim tokom, odabiru
ograničene vremenske oznake scena iz `showinfo` i deterministički se vraćaju na
iste ravnomjerne srednje tačke u slučaju neuspjeha detektora, isteka vremena,
neispravnog izlaza ili praznog skupa kandidata. Režim koji uzima u obzir
segmente dodjeljuje uzorke srednjih tačaka proporcionalno potvrđenim intervalima
scena; dokazi i rezervno ponašanje za ovaj režim detaljno su opisani u nastavku.
Čvrsto ograničenje od 16 kadrova primjenjuje se nakon odabira u svakom pravilu.
Kada zahtjev koji uzima u obzir scene ima budžet od samo jednog kadra, koristi
ravnomjernu srednju tačku aktivnog prozora cijelog videozapisa ili fokusnog
prozora i prijavljuje `policyEffective: uniform`: jedan odabrani kadar scene ne
može sačuvati oba vremenska kraja. Pozivalac opcionalno može navesti konačan
fokusni prozor (`start`/`end` u sekundama); granice se ograničavaju na trajanje
medija, obrnuti ili nekonačni prozori se odbijaju, a sva pravila uzorkovanja
izvode se samo unutar normaliziranog intervala. Rezultirajući prozor uključuje
se u metapodatke uzorkovanja i u prefiks nepouzdanog opisa kako bi nizvodni
modeli mogli razlikovati fokusirani isječak od cijele vremenske linije.

Semantički fokus opisa zasebna je, eksplicitna postavka. Podrazumijevani režim
analize `full` zadržava postojeći upit za kadar i nikada ne prosljeđuje tekst
zahtjeva modelu za opise. U režimu `focused`, most čita samo najnoviji neprazni
`text`/`input_text` koji je unio korisnik iz istog Chat ili Responses
kontejnera, normalizira ga u NFC, sažima kontrolne znakove i bjeline te ga
ograničava na 500 Unicode kodnih tačaka. Prazan rezultat vraća se na identičan
upit režima `full`. Upotrebljiva naznaka serijalizira se kao JSON u namjenskom
bloku nepouzdanog korisničkog konteksta i može samo dati prednost uočljivim
detaljima; ne može nadjačati zasebno upozorenje da se ne slijede upute koje su
vidljive ili čujne u mediju. Tekstualni fokus nikada ne izvodi `start`/`end` niti
mijenja vremenski uzorkivač.

#### FU-07 strukturni dokazi segmenata

`segment_aware` koristi jedan ograničeni prolaz predanalize nad već potvrđenim
lokalnim videotokom. Fiksni lanac filtera najprije smanjuje širinu na najviše
320 piksela, otkriva promjene scena i zamrznute intervale, a zatim uzorkuje
brzinom od 1 kadra u sekundi radi zamućenja, prosječne luminanse te
prostornih/vremenskih informacija. Prolaz je ograničen na 600 strukturnih
uzoraka, jednu FFmpeg/filtersku nit, iste liste dozvoljenih protokola ograničene
samo na `file` i formata kontejnera, ograničenje izlaza procesa od 1 MiB i
najviše 30 sekundi unutar zajedničkog prekida/roka posrednika. Nikada ne prihvata
naredbu, filter, putanju ili URL iz zahtjeva.

Strukturne vrijednosti deterministički su dokazi uzorkovanja, a ne semantičko
razumijevanje videozapisa. One ne izvode zaključke o subjektima, radnjama,
opisima, govoru ili namjeri korisnika. Granice scena i zamrzavanja formiraju
segmente; pokrivenost zamrzavanjem, zamućenje, ekspozicija, prostorni detalji i
vremenske promjene utječu samo na način dodjele postojećeg budžeta od 1–16
kadrova. Potpuno zamrznut segment ograničen je na jedan kadar, dok se nezamrznuti
segmenti natječu za preostali budžet. Kada granice brojčano nadmašuju kadrove,
zadržava se ravnomjerna pokrivenost vremenske linije kako brzi rani rezovi ne bi
mogli sakriti dugi završni segment. Granice scena koje su unutar analitičke
rezolucije od 1 sekunde od granice zamrzavanja objedinjuju se.

Nedostajući filteri, neispravni/prazni dokazi, greška detektora ili istek vremena
ograničene predanalize prelaze na identično pravilo ravnomjernih srednjih
tačaka. Prekid koji pokrene pozivalac ili rok posrednika ne prelazi na rezervno
pravilo: prekida podproces koji je u toku, sprječava kasnije izdvajanje kadrova,
a privatno privremeno stablo uklanja se u `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generira determinističke stvarne FFmpeg
testne podatke za uštede poziva modelu za opise nakon deduplikacije, dodjelu
budžeta za gusto kretanje, dokaze zamućenja/ekspozicije/SI-TI, brze rezove s
dugim završnim segmentom i lažno pozitivne rezultate postepenog zatamnjenja.
Bilježi trajanje predanalize prema zidnom satu i, gdje je `/usr/bin/time`
dostupan, procesorsko vrijeme podređenog procesa i vršnu vrijednost RSS-a.
Njegove provjere kvaliteta samo su strukturni orakuli. Kvalitet stvarnog modela
za opise ostaje `HOLD` jer ovaj testni okvir nema ovlaštenu krajnju tačku niti
zamrznutog ocjenjivača. Novčane uštede također ostaju `HOLD` osim ako
`--caption-cost-per-call-usd` navede eksplicitnu pozitivnu procjenu troška po
pozivu; skripta nikada ne izmišlja nijedan od ta dva rezultata.

Svaki okvir je ograničen na 4 MiB, svi sirovi okviri zajedno na 23 MiB, a
serijalizirani odgovor brokera na 32 MiB. Privatni privremeni direktorij se
uklanja u `finally`. OmniRoute ne dolazi u paketu s FFmpeg-om i ne prihvaća
prilagođenu putanju izvršne datoteke. Prije opisivanja, most primjenjuje
konzervativni prolaz vizuelne deduplikacije: svaki JPEG se svodi na 16×16
međuspremnik u sivim tonovima i poredi se samo s posljednjim zadržanim okvirom.
Za zatraženi budžet opisa veći od jednog okvira, ekstrakcija obezbjeđuje
ograničen skup kandidata do dvostruke veličine tog budžeta i nikad više od 16
okvira. Zatraženi maksimum primjenjuje se tek nakon deduplikacije, pri čemu se
prvi i posljednji odabrani kandidati čuvaju tokom završnog prorjeđivanja kada
je budžet najmanje dva. Verzionirana politika
`grayscale-16x16-mean-cells-v2` koristi veću od dvije vrijednosti: srednju
deltu svjetline i omjer ćelija minijature čija je normalizirana delta najmanje
0.05. Prag duplikata je konstanta 0.04, odabrana radi predvidljivosti, a ne
izložena kao postavka izvršavanja. Ovaj sekundarni visokokontrastni signal
čuva male pokrete i promjene vidljivog teksta koje poređenje zasnovano samo na
srednjoj vrijednosti može sakriti. Greške komparatora ili dekodera prolaze u
režimu fail-open i zadržavaju pokrivenost. Izlazni metapodaci odvajaju
ekstrahirane kandidate, uspješno korištene okvire i odbačene vizuelne
duplikate.

Izričito označeni video dio može zatražiti kontaktnu tablicu s vremenskim
oznakama. Most gradi najviše JPEG mrežu od 4 kolone i 16 okvira. Svaka ćelija
od 512 piksela ugravira svoju izvornu vremensku oznaku u visokokontrastnu
donju traku, dok iste vremenske oznake ostaju u tekstualnim metapodacima za
naknadno povezivanje i reviziju. Kompletan JPEG ostaje ograničen na 32 MiB.
Ako `sharp` ne može dekodirati ili sastaviti mrežu, most se vraća na
pojedinačne JPEG okvire; prekid od strane klijenta i dalje se propagira kroz
operaciju tablice.

Dokaz za promociju namjerno je odvojen od sintetičkog mikro-benchmarka
kompozicije. `scripts/perf/video-bridge-contact-sheet-eval.ts` definira A/B
okvir za testiranje s verzioniranom shemom, namijenjen stvarnim vizualnim
modelima kompatibilnim s OpenAI-jem. Mjeri tokene prijavljene od pružatelja,
end-to-end kašnjenje u proteklom vremenu (uključujući kompoziciju tablice),
broj poziva modela i zadržavanje činjenica definirano manifestom. Sirovi
odgovori modela ne zapisuju se u izvještaj; zadržavaju se samo SHA-256 sažeci
i ID-ovi podudarenih činjenica. Okvir ne vrši mrežne ili plaćene pozive modela
osim ako nije proslijeđen `--execute-real` i konfigurirani su `--model`,
`OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY`. Bez tog izričitog stvarnog
pokretanja, njegov strojno čitljiv verdikt ostaje `HOLD`; sama sintetička
mjerenja korisnog opterećenja/broja poziva nisu dokaz za promociju.

Pozivatelji mogu priložiti opcionalni niz `transcript.cues` uz podržani video
dio kada već posjeduju poravnati tekst. Svaka natuknica mora nositi `text`,
konačni interval `start`/`end` unutar sondiranog trajanja, te `source` s
bijele liste (`client`, `embedded` ili `audio-bridge`); `confidence`
podrazumijevano iznosi `1` i mora ostati između `0` i `1`. Tačni duplikati
natuknica se sažimaju. OmniRoute nikada ne pokreće transkripciju iz ovih
metapodataka: validirane natuknice se kopiraju u opisani rezultat s izvorom,
pouzdanošću i intervalom, te se prikazuju kao nepouzdana zapažanja uz opise
okvira. Nevažeći tekst, tekst izvan opsega ili tekst bez navedenog porijekla
odbacuje se umjesto da se miješa u tok opisa. Oba transkriptna kanala u tijelu
zahtjeva normaliziraju dostavljeno porijeklo na `client`, uključujući
samodeklarirane oznake `embedded` ili `audio-bridge`. Samo adapter u
vlasništvu servera može dodijeliti te pouzdane oznake putem argumenta
`trustedSource` dostupnog samo u kodu; JSON polje zahtjeva ne može dosegnuti
taj argument. Tekst transkripta ostaje nepouzdani sadržaj izveden iz medija,
bez obzira na njegovo porijeklo, i nikada ne smije određivati autorizaciju.

Napredni pozivatelj može dostaviti zapis `audioTranscript` za isti video; on
se tretira kao tekst dostavljen od klijenta, a ne kao dokaz serverske
transkripcije. Spojna tačka fuzije pokreće vizuelna i audio zapažanja pod
jednim rokom i signalom prekida, slaže ih na zajedničku vremensku osu, sažima
tačne duplikate i prijavljuje djelimični rezultat kada uspije samo jedna
strana. Nevažeći `audioTranscript` degradira se na taj djelimični rezultat —
vizuelni opis se zadržava, a audio grana bilježi sanizirani kod greške —
umjesto da ne uspije cijeli video. Dostupnost po grani, zastavica djelimičnog
rezultata i sanizirani kodovi grešaka čuvaju se u opisanom rezultatu, u
metapodacima zaštitnih mehanizama (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), u metapodacima keša rezultata i u brojačima fuzije
mosta. Zadana putanja Video Bridge-a ne poziva pretvaranje govora u tekst niti
preuzima drugu kopiju medija; bez tog izričitog zapisa ostaje isključivo
video.

**Zadržavanje transkripta (#12150 P1).** Ovo se primjenjuje automatski kad god
Video Bridge (koji se sam mora izričito uključiti) prikaže segment transkripta — ne postoji zasebna
zastavica za zadržavanje. Kada zahtjev prikaže bilo koji segment transkripta (bilo `transcript`
koji je deklarirao pozivalac ili spojeni `audioTranscript`), zaštitni mehanizam označava ga kao
`videoBridgeObserved` i izrađuje redigiranu kopiju opisa videa —
identičan prikaz u kojem je tijelo slobodnog teksta svakog segmenta zamijenjeno sa
`[redacted-video-transcript]`, izrađenu zamjenom strukturiranog polja segmenta
prije sastavljanja niza znakova (nikada raščlanjivanjem poravnatog teksta, tako da nikakav
sadržaj segmenta — zlonamjeran ili običan, uključujući tijela koja sadrže `]`, kao što su
`[inaudible]`/`[music]` — ne može opstati). Tijelo zahtjeva koje se trajno pohranjuje u dnevnik poziva
zamjenjuje svaki tekstualni dio izveden iz videa tom redigiranom kopijom, uz podudaranje prema
jednakosti sadržaja; sidro `fullText` ponovo se čita iz dovršenog korisnog sadržaja zaštitnog
mehanizma prije poziva, tako da podudaranje i dalje uspijeva nakon što kasniji lančani zaštitni
mehanizmi (maskeri ličnih identifikacijskih podataka i vjerodajnica, prioriteti 10/95) izmijene
tekst opisa na licu mjesta te nakon što umetanje sistemskog upita, primopredaje i Memorije
preoblikuje niz poruka. Tijelo poslano uzvodno modelu ostaje nepromijenjeno. Posmatrani zahtjev
također ne popunjava trajnu Memoriju (preskače se izdvajanje izvedeno i iz zahtjeva i iz odgovora),
tako da vlastiti odgovor modela ne može prenijeti tekst transkripta u Memoriju.

**Izvorna polja videa (#12430).** Kada je most omogućen, a izvorna podrška za video
nepoznata ili ne postoji, definirana polja `transcript`/`audioTranscript` također aktiviraju
`videoBridgeObserved`, čak i nakon neuspješnog opisa ili ograničenja `maxVideos`. Vrijednosti
`null` i prazni nizovi znakova se računaju; odsutna polja i metapodaci koji nisu videosadržaj
ne računaju se. Zadržane kopije rediguju ta polja ili izostavljaju zahtjev, a predmemorije i
Memorija se zaobilaze.

Na tim rezervnim putanjama valjani segmenti koje je dostavio pozivalac postaju podržani
`text`/`input_text` dijelovi umjesto nestandardnih polja pružatelja usluge. Obje staze
dostavljene u zahtjevu ostaju nepouzdana `client` opažanja, uz izričito upozorenje da video
nije opisan i da vremenske oznake nisu provjerene u odnosu na medij. Postojeća ograničenja
od 256 segmenata/64 KiB ukupno i ograničenja po segmentu primjenjuju se na obje staze
zajedno; vremenske oznake moraju se uklopiti u brokerovo ograničenje od 600 sekundi i svaki
dostavljeni vremenski prozor fokusa. Nevaljane staze se odbacuju i ne prosljeđuju kao
proizvoljan tekst; valjana paralelna staza i dalje se može koristiti, osim ako se prekorači
njihovo zajedničko ograničenje. Polja s vrijednošću null ili praznim nizom ne dodaju tekst.
Ova rezervna obrada ne dodaje dohvaćanje medija niti transkripciju. Proširena polja
transkripta uklanjaju se iz rezervnog nosača videa i njegovih objekata `video_url`/`source`.
OpenAI lista dozvoljenih elemenata na protokolu ostaje stroga; nosači videa s nepoznatom
izvornom podrškom ostaju dostupni, a poznata odredišta koja podržavaju samo tekst zadržavaju
sigurne oznake. Strukturirane redigirane kopije štite dodani tekst transkripta, dok izvorni
zahtjev u vlasništvu pozivaoca ostaje nepromijenjen. Odredišta s izvornom podrškom i
onemogućeni mostovi zadržavaju svoje postojeće ponašanje zaobilaženja.

Dodatne zadržane kopije koriste isti signal posmatranog zahtjeva. Neobrađeni snimak
klijentskog zahtjeva prije zaštitnog mehanizma, zahtjev na čekanju u memoriji i rani dnevnik
odbijenog zahtjeva strukturno zamjenjuju polja transkripta u videodijelovima; tekstualni upiti
koje sintetiziraju faze obradnog toka i primopredaja konteksta rediguju se na odredištu
trajnog tijela zahtjeva. Trajno pohranjena oznaka `video_content_removed` osigurava da se
nastavak putem `previous_response_id` zatvori u slučaju greške umjesto rekonstrukcije teksta
koji je namjerno odbačen. Ako posmatrani zahtjev izgubi svoju redigiranu kopiju po dijelu
prije zapisivanja u dnevnik ili ako se čak i jedna od nekoliko videokopija ne podudari nakon
kasnijih izmjena zahtjeva, zadržano tijelo zahtjeva u potpunosti se izostavlja umjesto
zadržavanja djelimično redigiranog transkripta.

Za posmatrani zahtjev odgovor modela može citirati bilo koji dio transkripta bez strukturirane
granice segmenta. Njegov `responseBody` koji se trajno pohranjuje u dnevnik poziva stoga se
zamjenjuje oznakom izostavljanja; detaljni artefakt obradnog toka (koji može sadržavati
uzvodna/klijentska tijela i dijelove toka podataka) ne zadržava se. Semantičke predmemorije,
predmemorije idempotentnosti i predmemorije ponavljanja zaključivanja zaobilaze čitanja i
upise za taj zahtjev. Zahtjev pružatelju usluge i odgovor vidljiv klijentu ostaju
nepromijenjeni. Rani keepalive bajtovi prazne se iz privremenog međuspremnika kada je
detaljni artefakt izostavljen. Kirovo upozorenje o neispravnom EventStreamu prijavljuje samo
broj bajtova korisnog sadržaja, nikada njegov sadržaj niti izvornu grešku JSON parsera.
Ovim se ne tvrdi da je provjerena svaka nepovezana dijagnostika pružatelja usluge ili
dodatka; šira provjera odredišta za zadržavanje prati se u #11658.

Interni životni ciklus `/api/modality-bridge/video/drilldown` zaseban je predmemorijski
supstrat autentificiran putem povratne petlje/tokena. Svaka operacija također zahtijeva
kanonski neprozirni ID principala. Prije nego što se produkcijskom pozivaocu omogući pristup,
on mora izvesti taj ID iz autentificiranog zakupca i nikada ne smije proslijediti vrijednost
koju je odabrao klijent. Ključevi predmemorije vežu taj principal za kanonske ID-ove sesije
i reference videa, pohranjuju samo njihove ključeve izvedene pomoću SHA-256 te ograničavaju
i čitanja i brisanje na isti principal. Predmemorija pohranjuje najviše 16 izvedenih JPEG
kadrova po unosu, uklanja ih nakon deset minuta i podržava ograničena čitanja pomoću
`start`/`end` ili izričito brisanje sesije.

Svaki principal ograničen je na 16 unosa i 64 MiB kanonskih JPEG podataka. Ta ograničenja
nezavisna su od globalnog maksimuma od 64 unosa/256 MiB: pritisak kvote principala najprije
uklanja samo najmanje nedavno korištene unose tog principala prije razmatranja globalnog
LRU uklanjanja. Istekli unosi uklanjaju se i iz evidencije principala i iz globalne
evidencije tokom aktivnosti predmemorije, dok otkazivanje i neuspjela validacija ne
pohranjuju djelimičnu zamjenu.

Keš odbija nekanonski Base64, višak paddinga, medije koji nisu JPEG, oštećene ili skraćene JPEG-ove, te JPEG-ove koji proizvedu upozorenje tokom ograničenog dekodiranja cijele slike pomoću `sharp`. Svaku prihvaćenu sliku ponovno kodira kao kanonski JPEG, izvodi širinu i visinu iz dekodiranih bajtova umjesto da vjeruje poljima pozivaoca, i odbacuje sve preostale poliglotne bajtove umjesto da ih zadrži. Samo ograničeni kanonski komprimirani bafer naplaćuje se na obje kvote. JSON limit prijenosa uključuje Base64 režijske troškove za gornju granicu dekodiranog ulaza od 32 MiB. Svako pohranjeno izvođenje bilježi svoj validirani JPEG format/rezoluciju, politiku uzorkovanja, verziju izvođenja, vrijeme kreiranja, serverski izračunati heš sadržaja, te heširanu referencu roditelja plus heš roditeljskog sadržaja pouzdanog pozivaoca. Otkazivanje se provjerava između asinhronih faza dekodiranja/heširanja prije atomske potvrde keša.

Ova tranša još uvijek ne povezuje produkcijskog producenta na rutu i ne pruža izbor višerezolucijskih varijanti. Transparentna putanja zahtjeva Video Bridge-a stoga ne uključuje dodatni posao, dok izvođenje principala vezanog za tenanta i puni FU-08 životni ciklus višestruke rezolucije ostaju eksplicitno navedeni naknadni rad, a ne dokumentovano završeno ponašanje.

Frejmovi se opisuju sekvencijalno konfiguriranim Video modelom. Prazna Video nadogradnja nasljeđuje postavku Vision; ako su obje prazne, Vision auto-ruter bira efektivni model sposoban za vid. Uspješni opisi zamjenjuju originalni dio stabilnim prefiksom `[Video description:` koji također označava tekst kao nepouzdanu opservaciju izvedenu iz medija i govori nizvodnim modelima da ne slijede instrukcije pronađene u medijima. Ključevi keša opisa frejmova uključuju JPEG bajtove, prompt, vremensku oznaku i efektivni model; keširaju se samo uspješni opisi. Zapisi keša zadržavaju stvarni model uspješnog producenta, uključujući rezervni model; most izvještava `mixed` kada su različiti frejmovi proizvedeni različitim modelima. Pogodak keša ponovo koristi taj identitet producenta umjesto da ga preoznačava kao zatraženi plan usmjeravanja. Keš rezultata cijelog videa ključiran je na svaki ulaz koji mijenja izlaz — prompt, efektivni model, politiku uzorkovanja, broj frejmova, režim semantičke analize, SHA-256 otisak normaliziranog nagovještaja fokusa, prozor fokusa, `transcript`, `audioTranscript` i zastavicu kontaktne ploče — tako da promjena bilo koje od tih dimenzija predstavlja promašaj keša, nikada zastarjelu ponovnu upotrebu. Verzija politike vizuelne deduplikacije, prag i ograničeni broj kandidat-frejmova također su eksplicitno navedeni u ključu i metapodacima keša rezultata; promjena politike stoga ne može ponovo iskoristiti zastarjeli opis cijelog videa. Metapodaci keša rezultata v4 zadržavaju režim i otisak, nikada sirovi korisnički zadatak. Metapodaci zaštite izvještavaju i zatraženi i efektivni režim analize; zatraženi režim `focused` bez upotrebljivog korisničkog teksta izvještava se kao efektivno `full`.

Zaštita izdvaja svaki podržani video dio, ali ne opisuje više od
`modalityBridgeVideoMaxVideos`. Za cilj za koji je dokazano da ima
`supportsVideo === false`, neuspjeli videi i oni koji premašuju limit postaju eksplicitni sigurni tekstualni markeri, tako da nijedan sirovi video ne preživi. Kada je sposobnost nepoznata, ti dijelovi zadržavaju svoj video nosač; bilo koji rezervni transkript slijedi gore opisanu ograničenu konverziju teksta. Ciljevi sa `supportsVideo === true` zaobilaze most.
Signal prekida klijentskog zahtjeva propagira se kroz preuzimanje, red posrednika, podprocese i pozive opisa; prekidi se zaustavljaju između videa i nikada ne otvaraju prolaz sirovim medijima.

Postavke izvođenja pohranjene su u bazi podataka i validirane Zod-om:

| Ključ                               | Zadano      | Raspon / ponašanje                                                                                    |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Opcionalno izvođenje, po izboru                                                                       |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` čuva generičke opise; `focused` koristi ograničeni, nepouzdani kontekst najnovijeg korisnika   |
| `modalityBridgeVideoModel`          | `""`        | Naslijedi model Vision Bridge-a                                                                       |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, ili proporcionalni `segment_aware`; neuspjeh detektora prelazi na `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                        |

Zastarjele pohranjene vrijednosti Video timeout-a iznad 120 sekundi ograničavaju se na rok posrednika; novi upisi postavki iznad tog limita odbijaju se.
`GET /api/modality-bridge/video/runtime` zahtijeva pouzdanu označenu loopback lokalnost prije autentifikacije ili ispitivanja izvođenja, a zatim zahtijeva upravljačku autentifikaciju. Vraća samo `available`, sanirane verzije FFmpeg/ffprobe-a i fiksni razlog kada izvođenje nije dostupno. Interni endpoint za ekstrakciju nije javni API za učitavanje: zasićenje reda vraća `503` plus `Retry-After`, prekid veze pozivaoca vraća `499`, a fiksni rok posrednika vraća `504`. Konvertovani odgovori dodaju
`video->text;model=<visionModel>;parts=<videos>` u centralno zaglavlje
`x-omniroute-modality-bridge` bez uklanjanja Vision ili Audio segmenata.

### PII Masker (`piiMasker.ts`)

Izvodi se na **oba** stupnja.

- **`preCall`** klonira payload, prolazi kroz `system`, `messages`, `input` i
  `prompt` (uključujući stavke koje su obični stringovi) i primjenjuje
  `processPII()` (iz `@/shared/utils/inputSanitizer`) na string polja
  `content`/`text`. Kada je `PII_REDACTION_ENABLED=true`, detektovani PII se
  maskira u odlaznom payloadu. Ovo je nezavisno od `INPUT_SANITIZER_MODE` (koji
  kontroliše samo politiku prompt injekcije). Kada je maskiranje isključeno,
  poziv bilježi brojače detekcije bez prepisivanja sadržaja.
- **`postCall`** dubinski klonira odgovor, pokreće `sanitizePIIResponse()` plus
  masker za oblik Responses API-ja (`maskResponsesOutput` — pokriva
  `output_text` i `output[].content[].text`). Ako dođe do bilo kakvog
  maskiranja, izmijenjeni odgovor zamjenjuje originalni.

Guardrail nikada ne blokira; samo dodaje oznake (`meta.detections`,
`meta.redacted`) ili prepisuje.

#### Odabir po tipu, prilagođeni obrasci i brojači detekcije

**Dashboard → Settings → Security → PII masking** bira _šta_ se maskira. Ne
uključuje maskiranje: to je i dalje `PII_REDACTION_ENABLED` (zahtjev) i
`PII_RESPONSE_SANITIZATION` (odgovor + SSE), oboje po defaultu isključeno.

- **Odabir po tipu** — ugrađeni ID-ovi navedeni su u
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nepostavljeno znači
  svi tipovi (ponašanje prije nego što je ova postavka postojala). Obrazac
  `ssn_us` iz engine-a zahtjeva mapira se na `ssn`. Predlošci (Minimal,
  Standard, Financial, Brazilian, USA, Full) samo popunjavaju potvrdna polja u
  korisničkom interfejsu.
- **Prilagođeni obrasci** — do 20 regex ili džokerskih obrazaca (`*` = do 64
  znaka koji nisu razmaci, `?` = jedan). Poklapanja postaju
  `[CUSTOM_REDACTED]`. Svaki obrazac prolazi kroz `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): najviše 500 znakova, zastavice
  ograničene na `g i m s u`, mora se kompajlirati, mora proći `safe-regex`
  (katastrofalno vraćanje unatrag) i ne smije poklapati prazan string niti
  placeholder za maskiranje. Obrazac koji ne prođe odbija se pri čuvanju i pri
  testiranju, a pohranjeni red koji ne prođe preskače se tokom izvršavanja
  umjesto da se kompajlira. Prilagođeni obrasci se izvršavaju samo dok je
  maskiranje uključeno.
- **Brojači detekcije** — zbirovi po tipu (nikada poklopljene vrijednosti),
  držani u memoriji i resetovani pri restartu
  (`src/lib/pii/piiDetectionStats.ts`). Povećavaju se samo dok je maskiranje
  uključeno.

Postavke se nalaze u tabeli `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) i čitaju se kroz keš od 1 s. API:

| Metoda | Putanja                  | Svrha                                                                           |
| ------ | ------------------------ | ------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stanje zastavica, `enabledTypes`, `customPatterns`, brojači detekcije           |
| `PUT`  | `/api/settings/pii`      | Zamjenjuje `enabledTypes` (`null` = svi) i/ili `customPatterns`                 |
| `POST` | `/api/settings/pii/test` | Probno izvršava jedan obrazac na uzorku od najviše 8 KB; ništa se ne pohranjuje |

Sve tri zahtijevaju administratorsku autentifikaciju i validiraju tijelo
zahtjeva pomoću Zod-a (`src/shared/validation/schemas/piiSettings.ts`).

### Prompt injekcija (`promptInjection.ts`)

Detektuje neprijateljske strukture u sadržaju koji dostavlja korisnik i
primjenjuje konfigurisanu politiku. Ponašanjem upravljaju varijable okruženja i
opcije konstruktora:

| Postavka        | Env varijabla                                                                                         | Zadano | Efekat                                                                                                                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Uključeno       | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | Kada je `false`, guardrail se zaobilazi bez dalje obrade.                                                                                                                                                  |
| Režim           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | Politika injekcije: `block`, `warn` ili `log`. (`redact` se prihvata radi kompatibilnosti unatrag, ali **ne** uklanja tekst injekcije; prepisivanje PII-ja u zahtjevu kontroliše `PII_REDACTION_ENABLED`.) |
| Prag blokiranja | opcija `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Minimalna ozbiljnost potrebna za blokiranje. Srednja je pri zadanoj postavci samo za posmatranje.                                                                                                          |

**Prioritet režima** (`getMode`): `options.mode` pozivaoca →
`INJECTION_GUARD_MODE` **DB nadjačavanje putem feature flaga** (Dashboard →
Settings → Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE`
env → `warn`. Nadjačavanje iz dashboarda dakle pobjeđuje nad env varijablama,
pa Feature Flags UI kontroliše aktivni guardrail uživo (bez restarta). Čitanje
iz baze podataka otporno je na greške: ako dođe do greške, guardrail se vraća
na ponašanje zasnovano na env varijablama, a kada nadjačavanje nije
postavljeno, ponašanje je identično rezoluciji samo putem env varijabli.

Izvori detekcije:

1. `sanitizeRequest()` iz `@/shared/utils/inputSanitizer` (zajednički skup
   detektora koji se koristi i na drugim mjestima u pipeline-u).
2. Ugrađeni `DEFAULT_GUARD_PATTERNS` (trenutno `system_override_inline` i
   `markdown_system_block`, oba ozbiljnosti `high`).
3. Opcionalni `customPatterns` proslijeđeni kroz opcije konstruktora
   (stringovi, regexi ili zapisi `{ name, pattern, severity }`).

Kada je `mode === "block"` **i** barem jedna detekcija doseže prag
ozbiljnosti, `preCall` vraća `{ block: true, message: "Request rejected:
suspicious content detected" }`. U `warn`/`log` režimima guardrail bilježi u
log, ali dozvoljava poziv. Zajednička pomoćna funkcija
`evaluatePromptInjection()` također je izvezena za pozivaoce koji trebaju
evaluirati promptove bez prolaska kroz registar.

**Granica skeniranja (v3.8.20):** detektor pregledava samo **prvih 16 KB**
spojenog teksta prompta — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384
bajta) u `src/shared/utils/inputSanitizer.ts`. I `detectInjection()` i
`evaluatePromptInjection()` primjenjuju `slice(0, MAX_INJECTION_SCAN_BYTES)`
prije pokretanja petlje obrazaca. Direktive injekcije nalaze se blizu vrha
ulaza, pa ovo ograničava CPU/GC regexa na payloadima od više stotina KB bez
slabljenja detekcije (vidi #3932, #4041).

### Maskiranje kredencijala (`credentialMasker.ts`)

Izvršava se u **obje** faze, posljednje u zadanom lancu (prioritet `95`).
Redaktira dobro poznate obrasce API ključeva / tajnih tokena iz odlaznog
payloada (sadržaj poruke, argumenti poziva alata, rezultati alata) **i** iz
odgovora providera, tako da kredencijal zalijepljen u prompt (ili vraćen kroz
rezultat alata) ne procuri do upstream providera ili natrag do klijenta.

- **Samo po želji (opt-in)**, ista konvencija kao kod PII redakcije (blisko
  Hard Rule #20): onemogućeno osim ako je
  `settings.credentialRedactionEnabled === true` **ili**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kada je isključeno, guardrail je no-op
  — nikada ne blokira i nikada ništa ne prepravlja.
- `redactCredentials()` prolazi kroz cijelo stablo payloada/odgovora
  (`walkValue()`, sigurno od prototype-pollutiona, sigurno od ciklusa putem
  `WeakSet`a) i zamjenjuje podudaranja placeholderom `[REDACTED:<type>]`,
  klonirajući samo grane koje su se stvarno promijenile.
- `CREDENTIAL_PATTERNS` pokriva ključeve LLM providera (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokene (GitHub,
  Slack, Linear, Notion, npm, Postman, Discord), platne ključeve (Stripe,
  Square), cloud ključeve (AWS pristupni ključ, Twilio, SendGrid, Mailgun),
  privatne ključeve / JWT-ove, connection stringove koji sadrže kredencijale
  (`mongodb://user:pass@...`, itd.) i generički obrazac vrijednosti zaglavlja
  `Authorization`/`x-api-key`/`api-key`/`apikey`. Ključevi u obliku zaglavlja
  (`authorization`, `x-api-key`, `api-key`, `apikey`) redaktiraju se
  strukturno (samo vrijednost, prefiks sheme poput `Bearer `/`Basic ` se
  zadržava), a ne putem generičkog tekstualnog regexa.
- Guardrail nikada ne blokira; samo prepravlja (`modifiedPayload` /
  `modifiedResponse`) i dodaje anotacije (`meta.credentialsRedacted`,
  `meta.count`).

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
