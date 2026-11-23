# Guardrails (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Izvor istine:** `src/lib/guardrails/`
> **Posljednje ažuriranje:** 2026-08-29 — v3.8.51 (Porijeklo transkripta Video Bridge-a je deklarisano od strane pozivaoca,
> još nije verifikovano od strane servera — pojašnjeno po #11661)

Zaštitne ograde (Guardrails) nameću sigurnost, politiku i transformacije sadržaja na granici
između OmniRoute-a i uzvodnih provajdera. Svaka zaštitna ograda može pregledati (i
opcionalno odbiti, transformisati ili anotirati) zahtjeve (`preCall`) i
uzvodne odgovore (`postCall`).

Sistem je **fail-open**: ako zaštitna ograda baci grešku tokom izvršavanja, registar
bilježi grešku i nastavlja sa sljedećom zaštitnom ogradom umjesto da odbije
zahtjev. Blokiranje je eksplicitna odluka (`block: true`), nikada slučajnost.

## Ugrađene zaštitne mjere

Registar pri uvozu automatski učitava šest zaštitnih mjera prema redoslijedu prioriteta
(pogledajte `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Naziv               | Faza/e         | Datoteka              |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Niži brojevi prioriteta izvršavaju se **prvi**.

### Premosnik za slike (`visionBridge.ts`) — Premosnik modaliteta PR-1

Presreće zahtjeve koji sadrže slike i usmjereni su prema **modelima bez podrške za slike** te ili preusmjerava cijeli zahtjev na model koji podržava slike ili zamjenjuje slikovne dijelove tekstualnim opisima koje je generirao podesivi model za slike prije poziva prema nadređenom servisu. Time se pružateljima koji podržavaju samo tekst omogućava transparentna obrada multimodalnih sadržaja.

Tok:

1. Preskočite ako ciljni model već podržava slike (osim ako se nalazi na listi modela za koje je premošćivanje obavezno `isVisionBridgeForcedModel`).
2. Izdvojite slikovne dijelove pomoću `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), koji obradu delegira **objedinjenom detektoru
   medijskih sadržaja** `detectMediaParts()` u `open-sse/utils/mediaParts.ts` — jedinstvenom
   izvoru istine koji se dijeli s kombinovanim filterom kompatibilnosti.
   Izdvajanje je ograničeno listom dozvoljenih dijelova najvišeg nivoa čije oblike
   `replaceImageParts` može ponovo umetnuti (ugovor izdvajanje↔zamjena): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` i Responses API `input_image`. Ugniježđena podudaranja i
   oblici koji služe samo kao indikatori pripadaju kombinovanom filteru i nikada se ne izdvajaju.
   Preskočite ako ništa nije pronađeno.
3. Razriješite konfiguraciju tokom izvršavanja pomoću `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): novi ključevi postavki `modalityBridge*`
   imaju prednost; zastarjeli ključevi `visionBridge*` ostaju kao **rezervna opcija tokom jednog
   ciklusa** (period za vraćanje prethodne verzije). Preskočite prije bilo kakvog prolaska kroz medijske sadržaje kada je
   premošćivanje onemogućeno.
4. Selektor načina rada (`modalityBridgeVisionMode`, pogledajte tabelu u nastavku) odlučuje
   između preusmjeravanja i opisivanja. Preusmjeravanje vraća `modifiedPayload` u kojem je zamijenjen samo
   `model`, uz metapodatke `{ rerouted, fromModel, toModel, imagesKept }`.
5. Putanja opisivanja: ograničite broj slika na `maxImages`, sastavite upit prilagođen zadatku,
   provjerite keš opisa, pozovite model za slike **paralelno**
   (`Promise.allSettled`) i umjesto slika umetnite tekstualne dijelove `[Image N]: <description>`.
   Neuspjelo opisivanje daje `null`, a originalni slikovni dio se **zadržava**
   (#4012) — osim na kombinovanoj putanji opisivanja kada sva
   opisivanja ne uspiju, gdje potvrđeni nadređeni servis bez podrške za slike dobija zamjenski tekst
   `(unavailable — no vision-capable provider connected)` (#8430).
6. Vratite `modifiedPayload` + metapodatke (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selektor načina rada (`modalityBridgeVisionMode`)

| Način rada | Zadano | Ponašanje                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Zastarjela heuristika, neizmijenjena (#6640/#7204): modeli koji nisu kombinovani/`auto/` preusmjeravaju se na najbolji model za slike, osim ako originalni model već ima upotrebljive vjerodajnice (tada opisuje); kombinovana odredišta uvijek opisuju.                                                                                                  |
| `describe` |        | Uvijek opisuje — blok za preusmjeravanje u potpunosti se preskače; model koji je korisnik odabrao uvijek odgovara.                                                                                                                                                                                                                                        |
| `reroute`  |        | Prisilno preusmjeravanje: zaobilazi se zaštita koja zadržava model s vjerodajnicama. Zaštita vjerodajnica za **cilj** preusmjeravanja i dalje se primjenjuje — kada ne postoji upotrebljivo odredište s podrškom za slike, zahtjev prelazi na opisivanje kako sirove slike nikada ne bi dospjele do pozadinskog servisa koji podržava samo tekst (#8430). |

Prisilni načini rada završavaju obradu **prije** pokretanja automatske heuristike; ponašanje načina
`auto` identično je, na nivou bajtova, zaštitnoj mjeri prije PR-1.

#### Opseg API ključa (`visionBridgeKeyScope.ts`)

Kada API ključ pozivatelja ograničava `allowedConnections`, skupove kvota
(`allowedQuotas`) ili modele (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), premošćivanje bira samo
modele za preusmjeravanje i opisivanje koje ključ smije koristiti, na vezama koje ključ smije
koristiti. Poziv za opisivanje zatim uvijek prolazi kroz OmniRoute samopetlju sa
zaglavljem `x-omniroute-self-loop-key-id`, tako da prijemni zahtjev za razgovor
ponovo primjenjuje politiku veza i modela tog ključa. `enforceApiKeyPolicy()`
uvažava to zaglavlje samo zajedno s nosiocem samopetlje, tako da može samo
sužavati pristup, a ID koji nije moguće razriješiti biva odbijen.

Ako za ključ nije dozvoljen nijedan model za slike, putanja opisivanja se povlači i
zahtjev prolazi neizmijenjen, uz isto ponašanje otvorenog propuštanja kao kod onemogućene
zaštitne mjere (metapodaci `{ skipped: true, reason: "no_permitted_vision_model" }`).
Zahtjevi bez ključa i ključevi bez ovih ograničenja ponašaju se potpuno isto kao
i ranije.

#### Upit za opisivanje prilagođen zadatku (`modalityBridgeVisionTaskAware`)

Zadano je **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) dodaje
tekst **posljednje korisničke poruke** (skraćen na 500 znakova) osnovnom
upitu za opisivanje, usmjeravajući opis prema onome što je korisnik zaista
tražio (codex-vision-proxy obrazac) i tražeći od vision modela da transkribuje
vidljivi tekst. Kada je zastavica isključena — ili nema korisničkog teksta —
osnovni upit koristi se bez izmjena.

Vlastiti OpenAI-kompatibilni zahtjev samopetlje za opisivanje (`callVisionModelSingle()`
u `visionBridgeHelpers.ts`) uvijek zahtijeva `image_url.detail: "high"` —
bezuslovno, za svakog pozivaoca/provajdera, bez zavisnosti od bilo kakvog signala klijenta.
Uzorkovanje s niskim nivoom detalja umanjuje tačnost OCR-a upravo za zadatak
transkripcije teksta koji ovaj upit zahtijeva, pa sam poziv za opisivanje uvijek
zahtijeva visok nivo detalja, bez obzira na nivo detalja korišten u izvornom dolaznom
zahtjevu. Ovo utiče samo na interno tijelo zahtjeva za opisivanje; ne mijenja način na koji
OmniRoute prosljeđuje pozivaočev vlastiti `image_url.detail` u primarnom zahtjevu —
ta zadana vrijednost primjenjuje se zasebno i samo za otkrivene OpenCode klijente, u
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Grana
samopetlje za opisivanje s Anthropic formatom prijenosa nema polje `detail`
i na nju ne utiče nijedna zadana vrijednost.

#### Ograničenje izlaza opisa (`modalityBridgeVisionMaxChars`)

| Ključ                          | Zadano | Raspon            |
| ------------------------------ | ------ | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` ili 100–50000 |

`0` (zadano) znači **bez ograničenja** — opis koji vrati
`callVisionModel()` prosljeđuje se bez izmjena, čime se zadržava postojeće
ponašanje. Svaka vrijednost u rasponu 100–50000 skraćuje opis dodavanjem
sufiksa `…` prije nego što se umetne kao `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` u `src/lib/guardrails/visionBridge.ts`).
Povećajte ovu vrijednost za OCR zadatke s mnogo detalja, gdje je nizvodnom modelu
potrebna potpuna transkripcija; smanjite je kako biste ograničili potrošnju tokena
kod opširnih vision modela. Polje na kontrolnoj ploči nalazi se u panelu Advanced
kartice Vision (`modality-bridge-max-chars` u `ModalityBridgeVisionTab.tsx`) i
povećava svaku vrijednost između 1 i 99 na minimalnih 100, dok eksplicitnu vrijednost
`0` ostavlja netaknutom — `0` je samostalno važeća Zod vrijednost
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), a ne samo
zadana vrijednost za "nije postavljeno".

#### Keš opisa (`modalityBridge/bridgeCache.ts`)

LRU + TTL keš u memoriji za izlaze opisivanja, dijeljen na nivou cijelog procesa.
Ključ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s
uokvirivanjem pomoću prefiksa dužine (bez kolizija granica polja). Komponenta modela je
**konfigurisani** bridge model, a ne model koji je stvarno odgovorio —
`callVisionModel` može interno koristiti rezervnu opciju, a formiranje ključa po
pokušaju fragmentiralo bi keš. Neuspješni opisi nikada se ne keširaju. Postavke:

| Ključ                           | Zadano | Raspon  |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Normalizacija udaljenih slika (samopetlja za opisivanje/base64 preuzimanje)

Kada bridge sam preuzima **udaljenu** sliku — Anthropic samopoziv za opisivanje
i base64 konverzija claude formata prijenosa
(`ensureBase64ImagesForClaudeWire`), oba putem
`fetchRemoteImageAsDataUri()` u `visionBridgeHelpers.ts` — rezultirajući data
URI prosljeđuje se kroz `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) prije ugrađivanja u zahtjev prema vision modelu.
Prevelike slike smanjuju se na **dužu ivicu od 2048px** (što odgovara
ograničenju promjene veličine koje OpenAI/Anthropic već primjenjuju na serverskoj strani),
čime se smanjuju količina podataka za prijenos i kašnjenje bez promjene onoga što vision model
vidi. Promjena veličine koristi `sharp`, učitan putem dinamičkog importa: na platformi
na kojoj se njegov nativni binarni fajl ne može učitati, `normalizeDataUri()` **nikada ne
izbacuje izuzetak** — vraća se na prosljeđivanje izvornih bajtova bez izmjena, tako da putanja
opisivanja/base64 konverzije uvijek nastavlja raditi. Bajtovi koji nisu slika
(preuzimanje koje nije vratilo sliku koju je moguće dekodirati) također se prosljeđuju
bez izmjena. Ova normalizacija ograničena je na slike koje bridge preuzima za
vlastiti samopoziv — nikada se ne primjenjuje na sirovi payload pozivaoca koji se
prosljeđuje bez izmjena, u skladu s principom izmjena isključivo uz pristanak
(Strogo pravilo #20).

#### Shema postavki + migracija

Novi `modalityBridge*` ključevi validiraju se pomoću Zoda u `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trojka `modalityBridgeCache*` i
grupa `modalityBridgeAudio*` koju koristi Audio Bridge. Migracija
`141_modality_bridge_settings.sql` kopira postojeće zastarjele
`visionBridge*` vrijednosti u odgovarajuće nove ključeve (idempotentno, nikada ne
prepisuje `modalityBridge*` vrijednost koju je postavio operater); zastarjeli ključevi
ostaju prihvaćeni kao rezervna opcija za čitanje tokom jednog ciklusa izdanja.

#### Zaglavlje transparentnosti + statistika

Odgovori transformisani opisivanjem sadrže
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(izrađuje ga `buildModalityBridgeHeader()` u `modalityBridge/bridgeStats.ts`,
a postavlja `withModalityBridgeHeader()` u `src/sse/handlers/chatHelpers.ts`).
Preusmjereni zahtjevi **nemaju** zaglavlje — payload nije izmijenjen, a zamjena
modela već je vidljiva u polju `model` tijela odgovora.

`GET /api/modality-bridge/stats` (autentifikacija za upravljanje, isti nivo kao
`GET /api/settings`) vraća brojače po modalitetu u memoriji
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio` i
`video`. `averageLatencyMs` koristi `latencySamples`, a ne sve pokušaje, kao
nazivnik; operacija bez mjerenja vremena ne stvara izmišljeni uzorak od nula
milisekundi. `bridged` ostaje unazad kompatibilan alias za uspješne
konverzije; neuspjeli pokušaji ga ne povećavaju.
Brojači se namjerno resetuju pri ponovnom pokretanju procesa
(telemetrija, a ne računovodstvo).

#### Konfiguracija kontrolne ploče

Namjenska stranica kontrolne ploče je
`/dashboard/settings/modality-bridge`. Njene kartice `Vision`, `Audio` i
`Video`, kojima se može pristupiti putem URL-a, zadržavaju parametre upita pri
promjeni vrijednosti `tab`.
Kartica Vision nudi omogućavanje, način rada, izbor modela (uključujući automatski
zadani izbor), kreiranje upita prilagođeno zadatku, napredna ograničenja vremena
čekanja/slike/dužine opisa/keša, brojače vremena izvršavanja i zaštićeni ogledni
zahtjev. Kartica Audio je također aktivna: nudi omogućavanje, birač modela samo
za STT s opcijom Auto, ograničenja vremena čekanja/maksimalnog trajanja isječka,
brojače za audio i ogledni test `input_audio`. Kartica Video je funkcionalna:
prikazuje stanje FFmpeg/ffprobe okruženja za izvršavanje — jedno od četiri izričita
stanja korisničkog interfejsa (`unknown` dok je provjera u toku ili se nije mogla
završiti, `restricted` na hostu kontrolne ploče koji nije loopback i na kojem se
provjera preskače na klijentskoj strani, `unavailable` nakon što provjera potvrdi
da nedostaje ili `available` s verzijama FFmpeg/ffprobe) — trajno čuva ograničenja
omogućavanja/modela/kadrova/videa/vremena čekanja, filtrira birač modela na modele
koji podržavaju vizuelni sadržaj i prikazuje brojače za video.

Prethodna kartica Vision Bridge u AI postavkama sada je poveznica za kompatibilnost
prema novoj stranici; više ne sadrži drugu kopiju obrasca. Media Providers također
povezuje radne tokove Image-to-Text i Speech-to-Text s odgovarajućim karticama
Modality Bridgea bez uklanjanja postojećeg Speech-to-Text okruženja za testiranje.

**Zaobilaženje provjere pristupa za vlastitu petlju:** kada se poziv za opisivanje
usmjerava kroz vlastitu `/v1` petlju OmniRoutea (nestandardni model pružaoca),
podzahtjev šalje `x-omniroute-admission-bypass: internal` i autentificira se
razriješenim akreditivom vlastite petlje — lokalnim sentinelom `sk_omniroute` u
lokalnom načinu rada ili ključem iz okruženja `OMNIROUTE_API_KEY` /
`ROUTER_API_KEY` koji je konfigurirao operater (#1350), tako da implementacije s
`REQUIRE_API_KEY=true` i dalje mogu izvršiti poziv za opisivanje. Zaobilaženje se
prihvata samo za te tačne akreditive, tako da vanjski klijenti ne mogu koristiti
zaglavlje za preskakanje provjere pristupa.

Naslijeđene zadane vrijednosti nalaze se u
`src/shared/constants/visionBridgeDefaults.ts`; nove zadane vrijednosti za
način rada/prilagođavanje zadatku/keš i razrješivač postavki nalaze se u
`src/shared/constants/modalityBridgeDefaults.ts`. Zaštitni mehanizam pruža opciju
konstruktora `deps` kako bi testovi mogli ubaciti lažne implementacije
`getSettings` i `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Presreće zahtjeve za razgovor koji sadrže audio prije nego što stignu do cilja
za koji nije poznato da prihvata audio ulaz. Nikada ne preusmjerava zahtjev za
razgovor: audio dijelovi se transkribuju putem postojećeg višedijelnog krajnjeg
čvora kompatibilnog s OpenAI-em, a odabrani model za razgovor nastavlja rad s
tekstualnim transkriptima.

Tok:

1. Razriješite `supportsAudio` putem `getResolvedModelCapabilities()`. Izričiti
   metapodaci registra pružaoca imaju prednost, zatim statički metapodaci modela,
   pa sinhronizovani `modalities_input`. Deklarisana lista ulaza bez `audio` ima
   vrijednost `false`; ako nema dokaza o mogućnostima, vrijednost ostaje `null`.
   I `false` i `null` aktiviraju konzervativni most, dok ga `true` zaobilazi.
2. Razriješite postavke `modalityBridgeAudio*` i izdvojite zamjenjive audio
   dijelove najvišeg nivoa iz svake poruke putem zajedničkog detektora
   `detectMediaParts()`. Podržani formati prijenosa su OpenAI `input_audio`,
   `audio_url` i `source.media_type: "audio/*"`. Ugniježđeni audio otkriva se
   radi usmjeravanja, ali se ne uklanja putem putanje zamjene. Količina obrade
   ograničena je postavkom `modalityBridgeAudioMaxClips`; kasniji dijelovi ostaju
   nepromijenjeni.
3. Poštujte konfiguraciju `provider/model` ili dozvolite funkciji
   `selectAudioBridgeModel()` da prođe kroz `AUDIO_TRANSCRIPTION_PROVIDERS`
   stabilnim redoslijedom kataloga i odabere prvi model s upotrebljivim aktivnim
   akreditivom pružaoca.
4. `callAudioTranscription()` pretvara base64/data-URI audio u višedijelnu
   datoteku `file` ili preuzima udaljeni `audio_url` putem zaštitnog mehanizma za
   javni odlazni promet, uz DNS pinning i ograničenje od 25 MB. Zatim šalje datoteku
   i odabrani model metodom POST lokalnoj vlastitoj petlji
   `/v1/audio/transcriptions`, autentificiranoj pomoću `resolveSelfLoopBearer()`.
   Postojeća ruta za transkripciju obavlja uobičajeno pronalaženje akreditiva,
   upravljanje periodima čekanja/ograničenjima brzine i prosljeđivanje pružaocu.
5. Uspješni pozivi zamjenjuju svoje dijelove s `[Audio N]: <transcript>`. Pozivi
   se izvršavaju pomoću `Promise.allSettled`: pojedinačni neuspjeh zadržava taj
   izvorni audio dio (ugovor #4012). Ako svi pozivi ne uspiju, a dokazano je da
   cilj ima `supportsAudio === false`, dijelovi postaju
   `[Audio N]: (unavailable — no STT provider connected)` (ugovor #8430). Za
   nepoznati cilj (`null`), rezultat u kojem su svi pozivi neuspješni ostaje
   nepromijenjen. Dokazano tekstualni cilj bez upotrebljivog STT akreditiva
   dobija isti izričiti zamjenski sadržaj bez slanja mrežnog poziva.

Uspješni transkripti koriste LRU/TTL keš Modality Bridgea na nivou procesa.
Ključ kombinuje referencu na audio, stabilnu oznaku operacije
`audio-transcription` i odabrani STT model; neuspjesi se nikada ne keširaju.
Audio pokušaji ažuriraju zajedničke brojače `bridged`, `cacheHits`, `failures` i
`lastUsedAt`. Transformisani odgovori sadrže
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`;
nepromijenjeni zahtjevi ne dobijaju segment Audio Bridgea.

Postavke vremena izvršavanja čuvaju se u bazi podataka i validiraju pomoću Zoda:

| Ključ                         | Zadano  | Raspon                |
| ----------------------------- | ------- | --------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                     |
| `modalityBridgeAudioModel`    | `""`    | Automatski ili STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000           |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                  |

Zajednički keš i dalje se kontroliše pomoću `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` i `modalityBridgeCacheMaxEntries`.

### Video most (`videoBridge.ts`, `videoBridgePipeline.ts`)

Presreće video dijelove najvišeg nivoa u Chat Completions `messages` i Responses
API `input` prije pozivanja cilja bez poznate izvorne podrške za video.
Podržani oblici su `input_video`, `video_url`, `video_source`, HTTPS URL-ovi
i `data:video/*;base64,...` URI-ji podataka. Obični nazivi datoteka u tekstu ne
tretiraju se kao video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) upravlja prolaskom kroz zahtjev,
provjerom mogućnosti/politike, agregacijom po zahtjevu i korisnim sadržajem odgovora.
Obrada pojedinačnog videa — pribavljanje, keširanje cijelog rezultata, opisivanje
sekvence kadrova (koje objedinjuje svaki zvučni transkript koji je deklarirao
pozivatelj) i metrike/prekid/čišćenje po pokušaju — skrivena je iza `processVideoPart`
u `videoBridgePipeline.ts`, koji se poziva jednom za svaki video dio unutar petlje
funkcije `preCall`. Taj modul također definira eksplicitne granice portova
`VideoMediaBrokerPort` (pribavljanje bajtova i izdvajanje uzorkovanih kadrova),
`VideoAudioTranscriptionPort` (objedinjavanje zvučnog transkripta koji je deklarirao
pozivatelj s opisima uzorkovanih kadrova) i `VideoDrilldownPort` (granica
postojanosti detaljne analize kadrova; još nije povezana s `processVideoPart` —
danas samo zasebna ruta `/api/modality-bridge/video/drilldown` zapisuje unose
detaljne analize).

Javna putanja zahtjeva `/v1` nikada ne uvozi niti pokreće potproces. Udaljeni
videozapisi preuzimaju se uz ograničenje od 50 MiB; umetnuti base64 videozapisi
imaju konzervativno ograničenje od 36 MiB dekodiranih podataka po videu kako bi
omotnica modela/poruka/uokvirivanja mogla ostati unutar javnog ograničenja od
50 MiB za prihvatanje JSON zahtjeva. Dužina umetnutih podataka i procjene
dekodirane veličine provjeravaju se prije alokacije. HTTPS je obavezan za početni
udaljeni URL i svako preusmjeravanje, uz korištenje postojećeg zaštitnog mehanizma
za isključivo javni odlazni promet s DNS pinningom. Bajtovi zatim prelaze tačnu
internu brokersku granicu `POST /api/modality-bridge/video/extract`. Ta ruta je
istovremeno `LOCAL_ONLY` i `SPAWN_CAPABLE`, prihvata samo autentificiran zahtjev
pouzdane povratne petlje specifičan za proces i nikada ne prihvata URL, putanju
datotečnog sistema, izvršnu datoteku ili listu argumenata. Cjevovod ograničenja
veličine tijela API-ja i inkrementalni čitač tijela u obrađivaču nezavisno
primjenjuju ograničenje brokerskog ulaza od 50 MiB. Njegov ograničeni red obrađuje
jedno izdvajanje odjednom, dopušta četiri zadatka na čekanju i ograničava ulazne
podatke na čekanju na 100 MiB.

Unutar brokera, `ffprobe` čita privatnu lokalnu datoteku; fiksna lista dopuštenih
formata isključuje formate lista za reprodukciju i manifesta. Za dopuštene
kontejnere iz porodice MOV, vanjske reference na MOV podatke ostaju zadano
onemogućene, a fiksna komanda ih ne uključuje. I `ffprobe` i `ffmpeg` koriste
listu dopuštenih protokola koja sadrži samo `file`, jednu nit, fiksne nizove
argumenata, bez ljuske i s izvršnim datotekama pronađenim putem `PATH`. Tokovi
naslovnih slika priloženih videu nisu kandidati za reprodukciju. Svi tokovi koji
se mogu reproducirati moraju zadovoljavati ograničenja, a eksplicitni zadani tok
ima prednost prije determinističkog rezervnog odabira s najnižim indeksom.
Videozapisi su ograničeni na 600 sekundi, 8.192 piksela po dimenziji i 33.554.432
izvorna piksela. FFmpeg uzorkuje 1–16 JPEG kadrova na srednjim tačkama, smanjuje
dužu ivicu na najviše 1.024 piksela bez povećavanja manjih ulaznih sadržaja i
nikada ne prima URL. Uzorkovanje je zadano `uniform`. Opcionalne politike
`scene_aware` i eksperimentalna `segment_aware` izvode jedan dodatni fiksni FFmpeg
prolaz nad već validiranim lokalnim tokom, odabiru ograničene vremenske oznake
scena iz `showinfo` i deterministički se vraćaju na iste uniformne srednje tačke
u slučaju neuspjeha detektora, isteka vremena, neispravnog izlaza ili praznog
skupa kandidata. Režim svjestan segmenata dodjeljuje uzorke srednjih tačaka
proporcionalno validiranim intervalima scena; dokazi svjesni segmenata i ponašanje
rezervnog postupka detaljno su opisani u nastavku. Strogo ograničenje od 16 kadrova
primjenjuje se nakon odabira u svakoj politici. Kada zahtjev svjestan scena ima
budžet od samo jednog kadra, koristi uniformnu srednju tačku aktivnog prozora
cijelog videa ili fokusnog prozora i prijavljuje `policyEffective: uniform`:
jedan odabrani kadar scene ne može očuvati oba vremenska kraja. Pozivatelj može
opcionalno navesti konačan fokusni prozor (`start`/`end` u sekundama); granice se
ograničavaju na trajanje medija, obrnuti ili nekonačni prozori se odbijaju, a sve
politike uzorkovanja izvršavaju se samo unutar normaliziranog intervala.
Rezultirajući prozor uključuje se u metapodatke uzorkovanja i u nepouzdani prefiks
opisa kako bi nizvodni modeli mogli razlikovati fokusirani isječak od cijele
vremenske linije.

Semantički fokus opisa zasebna je, eksplicitna postavka. Zadani način analize
`full` zadržava postojeći upit za kadrove i nikada ne prosljeđuje tekst zahtjeva
modelu za opisivanje. U režimu `focused`, most čita samo najnoviji neprazni
`text`/`input_text` koji je napisao korisnik iz istog Chat ili Responses
kontejnera, normalizira ga u NFC, sažima kontrolne znakove i razmake te ga
ograničava na 500 Unicode kodnih tačaka. Prazan rezultat vraća se na potpuno
isti upit režima `full`. Upotrebljiva napomena serijalizira se kao JSON u
namjenskom bloku nepouzdanog korisničkog konteksta i smije samo dati prioritet
uočljivim detaljima; ne može nadjačati zasebno upozorenje protiv praćenja uputa
koje su vidljive ili čujne u mediju. Tekstualni fokus nikada ne izvodi
`start`/`end` niti mijenja vremenski uzorkivač.

#### FU-07 strukturni dokaz segmenta

`segment_aware` koristi jedan ograničeni prolaz predanalize nad već validiranim
lokalnim videostreamom. Fiksni lanac filtera prvo skalira video na širinu od
najviše 320 piksela, otkriva promjene scena i zamrznute intervale, a zatim
uzorkuje 1 kadar u sekundi radi procjene zamućenja, prosječne luminanse te
prostornih/vremenskih informacija. Prolaz je ograničen na 600 strukturnih
uzoraka, jednu FFmpeg/filter nit, iste liste dozvoljenih protokola isključivo
za `file` i kontejnera, ograničenje procesnog izlaza od 1 MiB te najviše 30
sekundi unutar zajedničkog prekida/roka brokera. Nikada ne prihvata naredbu,
filter, putanju ili URL iz zahtjeva.

Strukturne vrijednosti predstavljaju determinističke dokaze uzorkovanja, a ne
semantičko razumijevanje videa. One ne zaključuju o subjektima, radnjama,
natpisima, govoru ili namjeri korisnika. Granice scena i zamrzavanja formiraju
segmente; pokrivenost zamrzavanjem, zamućenje, ekspozicija, prostorni detalji i
vremenske promjene utiču samo na način raspodjele postojećeg budžeta od 1–16
kadrova. Potpuno zamrznuti segment ograničen je na jedan kadar, dok se
nezamrznuti segmenti nadmeću za preostali budžet. Kada broj granica premašuje
broj kadrova, zadržava se ravnomjerna pokrivenost vremenske linije kako brzi
rani rezovi ne bi mogli sakriti dugi završni segment. Granice scena unutar
analitičke rezolucije od 1 sekunde u odnosu na granicu zamrzavanja spajaju se.

Nedostajući filteri, neispravni/prazni dokazi, greška detektora ili istek
vremena ograničene predanalize dovode do sigurnog nastavka primjenom potpuno
iste politike ravnomjernih srednjih tačaka. Prekid koji pokrene pozivalac ili
rok brokera ne dovode do sigurnog nastavka: oni prekidaju aktivni podproces,
sprečavaju kasnije izdvajanje kadrova, a privatno privremeno stablo uklanja se
u bloku `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generiše determinističke stvarne FFmpeg
testne podatke za uštede u broju poziva za opise nakon deduplikacije, raspodjelu
budžeta pri gustom kretanju, dokaze o zamućenju/ekspoziciji/SI-TI, brze rezove
s dugim završnim dijelom i lažno pozitivne rezultate pri postepenom pretapanju.
Bilježi ukupno vrijeme predanalize i, gdje je `/usr/bin/time` dostupan, CPU
vrijeme podređenog procesa i vršnu RSS vrijednost. Njegove provjere kvaliteta
samo su strukturni orakuli. Kvalitet stvarnog modela za opisivanje ostaje
`HOLD` jer ovaj alat nema ovlaštenu krajnju tačku ni fiksirani evaluacijski
model. Novčane uštede također ostaju `HOLD`, osim ako
`--caption-cost-per-call-usd` ne navede eksplicitnu pozitivnu procjenu troška
po pozivu; skripta nikada ne izmišlja nijedan od tih rezultata.

Svaki kadar ograničen je na 4 MiB, svi neobrađeni kadrovi zajedno na 23 MiB, a
serijalizirani odgovor brokera na 32 MiB. Privatni privremeni direktorij uklanja
se u bloku `finally`. OmniRoute ne uključuje FFmpeg u distribuciju i ne prihvata
prilagođenu putanju izvršne datoteke. Prije opisivanja, most primjenjuje
konzervativni prolaz vizuelne deduplikacije: svaki JPEG svodi se na bafer sivih
tonova veličine 16×16 i poredi se samo s posljednjim zadržanim kadrom. Za
traženi budžet opisa veći od jednog kadra, izdvajanje daje ograničeni skup
kandidata do najviše dvostrukog iznosa tog budžeta i nikada više od 16 kadrova.
Traženo ograničenje primjenjuje se tek nakon deduplikacije, pri čemu se prvi i
posljednji odabrani kandidati zadržavaju tokom završnog prorjeđivanja kada je
budžet najmanje dva. Verzijska politika
`grayscale-16x16-mean-cells-v2` koristi veću vrijednost između srednje razlike
luminanse i omjera ćelija sličice čija je normalizirana razlika najmanje 0.05.
Prag duplikata je konstanta 0.04, odabrana radi predvidljivosti umjesto da bude
izložena kao postavka za vrijeme izvršavanja. Ovaj sekundarni signal visokog
kontrasta čuva male pokrete i promjene vidljivog teksta koje poređenje zasnovano
samo na srednjoj vrijednosti može sakriti. Greške komparatora ili dekodera
dovode do sigurnog nastavka i zadržavanja pokrivenosti. Izlazni metapodaci
odvojeno navode izdvojene kandidate, uspješno korištene kadrove i odbačene
vizuelne duplikate.

Eksplicitno označeni videodio može zatražiti kontaktni list s vremenskim
oznakama. Most izrađuje JPEG mrežu s najviše 4 kolone i 16 kadrova. Svaka
ćelija od 512 piksela ugrađuje vremensku oznaku izvora u donju traku visokog
kontrasta, dok iste vremenske oznake ostaju u tekstualnim metapodacima radi
naknadnog povezivanja i revizije. Cijeli JPEG ostaje ograničen na 32 MiB. Ako
`sharp` ne može dekodirati ili sastaviti mrežu, most se vraća na pojedinačne
JPEG kadrove; prekid klijenta i dalje se prenosi kroz operaciju izrade lista.

Dokazi za promoviranje namjerno su odvojeni od sintetičkog mikromjerenja
performansi sastavljanja. `scripts/perf/video-bridge-contact-sheet-eval.ts`
definira A/B alat s verzioniranom shemom za stvarne modele vida kompatibilne s
OpenAI-em. Mjeri tokene koje prijavljuje pružalac usluge, ukupnu latenciju od
početka do kraja, uključujući sastavljanje lista, broj poziva modela i
zadržavanje činjenica definiranih manifestom. Neobrađeni odgovori modela ne
zapisuju se u izvještaj; zadržavaju se samo SHA-256 sažeci i ID-ovi podudarnih
činjenica. Alat ne uspostavlja mrežni niti plaćeni poziv modela osim ako je
proslijeđen `--execute-real` te su konfigurirani `--model`,
`OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY`. Bez takvog eksplicitnog stvarnog
pokretanja, njegov mašinski čitljiv zaključak ostaje `HOLD`; sama sintetička
mjerenja korisnog sadržaja/broja poziva nisu dokaz za promoviranje.

Pozivaoci mogu podržanom videodijelu dodati opcionalni niz `transcript.cues`
kada već posjeduju vremenski usklađen tekst. Svaka stavka mora sadržavati
`text`, konačan interval `start`/`end` unutar ispitivanog trajanja i `source` s
liste dozvoljenih vrijednosti (`client`, `embedded` ili `audio-bridge`);
`confidence` zadano iznosi `1` i mora ostati između `0` i `1`. Potpuno jednake
stavke se sažimaju. OmniRoute nikada ne pokreće transkripciju na osnovu ovih
metapodataka: validirane stavke kopiraju se u opisani rezultat zajedno s
izvorom, pouzdanošću i intervalom te se prikazuju kao nepouzdana zapažanja uz
opise kadrova. Neispravan tekst, tekst izvan raspona ili tekst bez porijekla
odbacuje se umjesto da se miješa u tok opisa. Oba kanala transkripta u tijelu
zahtjeva normaliziraju dostavljeno porijeklo na `client`, uključujući
samostalno navedene oznake `embedded` ili `audio-bridge`. Samo adapter kojim
upravlja server može dodijeliti te pouzdane oznake putem argumenta
`trustedSource`, dostupnog isključivo kroz kôd; JSON polje zahtjeva ne može
dosegnuti taj argument. Tekst transkripta ostaje nepouzdan sadržaj izveden iz
medija, bez obzira na njegovo porijeklo, i nikada ne smije određivati
autorizaciju.

Napredni pozivalac može dostaviti zapis `audioTranscript` za isti video;
on se tretira kao tekst koji je dostavio klijent, a ne kao dokaz serverske transkripcije.
Spoj za objedinjavanje izvršava vizuelna i zvučna opažanja unutar
jednog roka i uz jedan signal za prekid, raspoređuje ih na zajedničkoj vremenskoj liniji, sažima
potpuno jednake duplikate i prijavljuje djelimičan rezultat kada uspije samo jedna strana.
Nevažeći `audioTranscript` svodi se na taj djelimičan rezultat — vizuelni
opis se zadržava, a zvučna grana bilježi sanitizirani kôd greške —
umjesto da cijeli video završi neuspjehom. Dostupnost po granama, oznaka djelimičnog rezultata
i sanitizirani kodovi grešaka čuvaju se u opisanom rezultatu, u
metapodacima zaštitnih mehanizama (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), u metapodacima keša rezultata i u brojačima
objedinjavanja mosta. Zadana putanja Video Bridgea ne poziva pretvaranje govora u tekst
niti preuzima drugu kopiju medija; bez tog eksplicitnog zapisa ostaje
ograničena samo na video.

**Zadržavanje transkripta (#12150 P1).** Ovo se automatski primjenjuje kad god
Video Bridge (koji se sam mora izričito uključiti) generiše stavku transkripta — ne postoji zasebna
oznaka za zadržavanje. Kada zahtjev generiše bilo koju stavku transkripta (`transcript` koji je
deklarisao pozivalac ili objedinjeni `audioTranscript`), zaštitni mehanizam ga označava kao
`videoBridgeObserved` i izrađuje redigovanu kopiju opisa videa —
identičan prikaz u kojem je tekstualno tijelo slobodnog formata svake stavke zamijenjeno sa
`[redacted-video-transcript]`, izrađen zamjenom strukturiranog polja stavke
prije sastavljanja niza (nikada raščlanjivanjem poravnatog teksta, tako da nijedan
sadržaj stavke — zlonamjeran ili uobičajen, uključujući tijela koja sadrže `]`, kao što su
`[inaudible]`/`[music]` — ne može preživjeti). Sačuvano tijelo zahtjeva u evidenciji poziva zamjenjuje
svaki tekstualni dio izveden iz videa tom redigovanom kopijom, podudaranjem prema
jednakosti sadržaja; sidro `fullText` ponovo se čita iz završenog sadržaja zaštitnog mehanizma
prije poziva, tako da podudaranje i dalje uspijeva nakon što naknadni lančani zaštitni mehanizmi (maskeri
ličnih identifikacijskih podataka i vjerodajnica, prioriteta 10/95) izmijene tekst opisa na mjestu i
nakon što umetanje sistemskog upita, primopredaje i Memorije preoblikuje niz poruka. Tijelo
poslano modelu ostaje nepromijenjeno. Posmatrani zahtjev također ne popunjava
trajnu Memoriju (preskače se izdvajanje izvedeno i iz zahtjeva i iz odgovora),
tako da vlastiti odgovor modela ne može prenijeti tekst transkripta u Memoriju.

**Neobrađena polja videa (#12430).** Kada je most omogućen, a izvorna podrška za video nepoznata ili ne postoji, definisana polja `transcript`/`audioTranscript` također aktiviraju `videoBridgeObserved`, čak i nakon neuspjelog opisivanja ili ograničenja `maxVideos`. `null` i prazni nizovi se računaju; odsutna polja i metapodaci koji nisu vezani za video ne računaju se. Sačuvane kopije rediguju ta polja ili izostavljaju zahtjev, a keševi i Memorija se zaobilaze.

Na tim rezervnim putanjama važeće stavke pozivaoca postaju podržani dijelovi
`text`/`input_text`, umjesto nestandardnih polja pružaoca usluge. Oba zapisa
dostavljena u zahtjevu ostaju nepouzdana `client` opažanja, uz eksplicitno upozorenje da video
nije opisan i da vremenske oznake nisu provjerene u odnosu na medij. Postojeća
ograničenja od 256 stavki/ukupno 64 KiB i ograničenja po stavci primjenjuju se zajedno na oba zapisa;
vremenske oznake moraju biti unutar brokerovog ograničenja od 600 sekundi i svakog dostavljenog
prozora fokusa. Nevažeći zapisi se odbacuju i ne prosljeđuju kao proizvoljan tekst; važeći
par može se i dalje koristiti osim ako je prekoračeno njihovo zajedničko ograničenje. Null/prazna
polja ne dodaju tekst. Ova rezervna putanja ne dodaje dohvaćanje medija ni transkripciju.
Proširena polja transkripta uklanjaju se iz rezervnog nosača videa i njegovih
objekata `video_url`/`source`. OpenAI lista dozvoljenih vrijednosti za prijenos ostaje stroga; nosači
videa s nepoznatom izvornom podrškom ostaju dostupni, a poznati ciljevi koji podržavaju samo tekst zadržavaju sigurne oznake.
Strukturirane redigovane kopije štite dodani tekst transkripta, dok
izvorni zahtjev u vlasništvu pozivaoca ostaje nepromijenjen. Ciljevi s izvornom podrškom i
onemogućeni mostovi zadržavaju svoje postojeće ponašanje zaobilaženja.

Dodatne sačuvane kopije koriste isti signal posmatranog zahtjeva. Neobrađeni
snimak klijentskog zahtjeva prije zaštitnog mehanizma, zahtjev na čekanju u memoriji i evidencija
rano odbijenog zahtjeva strukturirano zamjenjuju polja transkripta u dijelovima videa;
tekstualni upiti koje sintetiziraju faze cjevovoda i kontekstualna primopredaja rediguju se
na odredištu sačuvanog tijela zahtjeva. Sačuvana oznaka `video_content_removed`
čini da nastavak putem `previous_response_id` bude sigurno odbijen, umjesto da rekonstruiše
tekst koji je namjerno odbačen. Ako posmatrani zahtjev izgubi svoju
redigovanu kopiju po dijelu prije evidentiranja ili ako se čak samo jedna od više kopija videa
ne uspije podudariti nakon naknadnih izmjena zahtjeva, sačuvano tijelo zahtjeva
u potpunosti se izostavlja umjesto da se zadrži djelimično redigovan transkript.

Za posmatrani zahtjev odgovor modela može citirati bilo koji dio
transkripta bez strukturirane granice stavke. Zato se njegov sačuvani
`responseBody` u evidenciji poziva zamjenjuje oznakom izostavljanja; detaljni
artefakt cjevovoda (koji može sadržavati tijela uzvodnog sistema/klijenta i dijelove toka)
ne zadržava se. Semantički keš, keš idempotentnosti i keš ponovne reprodukcije zaključivanja
zaobilaze čitanja i pisanja za taj zahtjev. Zahtjev pružaocu usluge i odgovor
vidljiv klijentu ostaju nepromijenjeni. Rani bajtovi za održavanje veze uklanjaju se iz privremenog
međuspremnika kada se detaljni artefakt izostavi. Kirovo upozorenje o neispravnom EventStreamu
prijavljuje samo broj bajtova sadržaja, nikada njegov sadržaj niti neobrađenu grešku
JSON parsera.
Ovim se ne tvrdi da je pregledana svaka nepovezana dijagnostika pružaoca usluge/dodatka;
širi pregled odredišta sačuvanih podataka prati se u #11658.

Interni životni ciklus `/api/modality-bridge/video/drilldown` predstavlja zasebnu
podlogu keša autentificiranu putem loopbacka/tokena. Svaka operacija također zahtijeva
kanonski neprozirni ID principala. Prije omogućavanja produkcijskog pozivaoca, on mora
izvesti taj ID iz autentificiranog tenanta i nikada ne smije proslijediti
vrijednost koju je odabrao klijent. Ključevi keša vežu taj principal za kanonske ID-ove sesije i
reference videozapisa, pohranjuju samo njihove ključeve izvedene pomoću SHA-256 i ograničavaju i čitanja
i brisanje na isti principal. Keš pohranjuje najviše 16 izvedenih JPEG
kadrova po unosu, uklanja ih nakon deset minuta i podržava ograničena
`start`/`end` čitanja ili eksplicitno brisanje sesije.

Svaki principal ograničen je na 16 unosa i 64 MiB kanonskih JPEG podataka. Ta
ograničenja nezavisna su od globalne granice od 64 unosa/256 MiB: pritisak kvote
principala izbacuje samo najduže nekorištene unose tog principala prije nego što se
razmotri globalno LRU izbacivanje. Istekli unosi uklanjaju se i iz obračuna principala i iz
globalnog obračuna prilikom aktivnosti keša, dok otkazivanje i neuspjeh validacije ne
potvrđuju djelimičnu zamjenu.

Keš odbija nekanonski Base64, višak dopune, medije koji nisu JPEG, neispravne ili
skraćene JPEG-ove i JPEG-ove koji uzrokuju upozorenje tokom ograničenog dekodiranja cijele slike pomoću `sharp`.
Svaku prihvaćenu sliku ponovo kodira kao kanonski JPEG, izvodi širinu i visinu
iz dekodiranih bajtova umjesto da vjeruje poljima pozivaoca i odbacuje sve završne
poliglotske bajtove umjesto da ih zadržava. Samo ograničeni kanonski komprimirani međuspremnik
uračunava se u obje kvote. Ograničenje JSON prijenosa uključuje Base64 dodatak za granicu
dekodiranog ulaza od 32 MiB. Svako
pohranjeno izvođenje bilježi svoj validirani JPEG format/rezoluciju, politiku uzorkovanja,
verziju izvođenja, vrijeme kreiranja, hash sadržaja koji je izračunao server i hashiranu nadređenu
referencu zajedno s hashom nadređenog sadržaja pouzdanog pozivaoca. Otkazivanje se provjerava
između asinhronih faza dekodiranja/hashiranja prije atomarne potvrde u kešu.

Ova tranša još ne povezuje produkcijskog proizvođača s rutom i ne
pruža odabir varijante s više rezolucija. Transparentna putanja zahtjeva Video Bridgea
stoga ne uvodi dodatni rad, dok izvođenje principala vezano za tenant i
potpuni FU-08 životni ciklus s više rezolucija ostaju eksplicitni naknadni zadaci umjesto
da budu dokumentirani kao dovršeno ponašanje.

Kadrovi se redom opisuju pomoću konfiguriranog Video modela. Prazno
Video nadjačavanje nasljeđuje postavku Vision; ako su obje prazne, Vision
automatski usmjerivač odabire efektivni model koji podržava vid. Uspješni opisi
zamjenjuju izvorni dio stabilnim prefiksom `[Video description:` koji također
označava tekst kao nepouzdano zapažanje izvedeno iz medija i govori modelima
u nastavku da ne slijede upute pronađene u mediju. Ključevi keša opisa kadrova
uključuju JPEG bajtove, prompt, vremensku oznaku i efektivni model; keširaju se samo uspješni
opisi. Unosi keša zadržavaju stvarni uspješni proizvođački model,
uključujući rezervni model; most prijavljuje `mixed` kada su različite kadrove
proizveli različiti modeli. Pogodak u kešu ponovo koristi taj identitet proizvođača
umjesto da ga ponovo označi kao traženi plan usmjeravanja. Keš rezultata za cijeli videozapis
indeksiran je svakim ulazom koji mijenja izlaz — promptom, efektivnim
modelom, politikom uzorkovanja, brojem kadrova, režimom semantičke analize, SHA-256
otiskom normaliziranog nagovještaja fokusa, prozorom fokusa, `transcript`,
`audioTranscript` i zastavicom kontaktne table — tako da promjena bilo koje od tih
dimenzija predstavlja promašaj keša, a nikada ponovno korištenje zastarjelog rezultata. Verzija
politike vizuelne deduplikacije, prag i ograničeni broj kandidatskih kadrova također su eksplicitni u
ključu i metapodacima keša rezultata; promjena politike stoga ne može ponovo koristiti zastarjeli
opis cijelog videozapisa. Metapodaci keša rezultata v4 čuvaju režim i
otisak, ali nikada neobrađeni korisnički zadatak. Metapodaci zaštitnih ograničenja prijavljuju i
traženi i efektivni režim analize; traženi režim `focused` bez
upotrebljivog korisničkog teksta prijavljuje se kao efektivno `full`.

Zaštitno ograničenje izdvaja svaki podržani video dio, ali ne opisuje više od
`modalityBridgeVideoMaxVideos`. Za cilj za koji je dokazano da ima
`supportsVideo === false`, neuspjeli videozapisi i oni iznad ograničenja postaju eksplicitne sigurne
tekstualne oznake tako da nijedan neobrađeni videozapis ne ostane. Kada mogućnost nije poznata, ti dijelovi
zadržavaju svoj video nosač; svaki rezervni transkript slijedi prethodno navedenu ograničenu tekstualnu
konverziju. Ciljevi sa `supportsVideo === true` zaobilaze most.
Signal za prekid klijentskog zahtjeva propagira se kroz preuzimanje, red brokera,
potprocese i pozive za opisivanje; prekidi zaustavljaju obradu između videozapisa i nikada ne dopuštaju
otvoreni prolaz neobrađenih medija.

Postavke okruženja pohranjene su u bazi podataka i validirane pomoću Zoda:

| Ključ                               | Zadano      | Raspon / ponašanje                                                                                       |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Opcionalno izvršno okruženje, uz izričito uključivanje                                                   |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` zadržava generičke opise; `focused` koristi ograničeni, nepouzdani kontekst posljednjeg korisnika |
| `modalityBridgeVideoModel`          | `""`        | Nasljeđuje model Vision Bridgea                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ili proporcionalni `segment_aware`; neuspjeh detektora vraća se na `uniform`    |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                           |

Naslijeđene pohranjene vrijednosti vremenskog ograničenja za Video veće od 120 sekundi ograničavaju se na
rok posrednika; novi pokušaji upisa postavki iznad tog ograničenja se odbijaju.
`GET /api/modality-bridge/video/runtime` zahtijeva pouzdanu, označenu loopback
lokalnost prije autentifikacije ili provjere izvršnog okruženja, a zatim zahtijeva upravljačku
autentifikaciju. Vraća samo `available`, sanitizirane verzije FFmpeg/ffprobe i fiksni
razlog kada izvršno okruženje nije dostupno. Interna krajnja tačka za izdvajanje nije
javni API za otpremanje: zasićenje reda vraća `503` uz `Retry-After`, prekid veze
pozivaoca vraća `499`, a fiksni rok posrednika vraća `504`. Konvertirani odgovori dodaju
`video->text;model=<visionModel>;parts=<videos>` u centralno
zaglavlje `x-omniroute-modality-bridge` bez uklanjanja segmenata Vision ili Audio.

### Maskiranje ličnih identifikacijskih podataka (`piiMasker.ts`)

Izvršava se u **obje** faze.

- **`preCall`** klonira sadržaj zahtjeva, prolazi kroz `system`, `messages`, `input` i
  `prompt` (uključujući stavke koje su obični nizovi znakova) i primjenjuje `processPII()` (iz
  `@/shared/utils/inputSanitizer`) na polja `content`/`text` tipa string. Kada je
  `PII_REDACTION_ENABLED=true`, otkriveni lični identifikacijski podaci rediguju se u odlaznom
  sadržaju zahtjeva. Ovo je nezavisno od `INPUT_SANITIZER_MODE` (koji kontrolira samo
  pravila za ubacivanje upita). Kada je redigovanje isključeno, poziv bilježi broj
  otkrivanja bez izmjene sadržaja.
- **`postCall`** dubinski klonira odgovor, pokreće `sanitizePIIResponse()` zajedno s
  maskiranjem oblika Responses API-ja (`maskResponsesOutput` — obuhvata
  `output_text` i `output[].content[].text`). Ako dođe do bilo kakvog redigovanja,
  izmijenjeni odgovor zamjenjuje originalni.

Zaštitni mehanizam nikada ne blokira; samo dodaje oznake (`meta.detections`,
`meta.redacted`) ili prepisuje sadržaj.

#### Odabir po tipu, prilagođeni obrasci i brojači otkrivanja

**Kontrolna ploča → Postavke → Sigurnost → Maskiranje ličnih identifikacijskih podataka** određuje _šta_ se maskira. Time se
maskiranje ne uključuje: za to se i dalje koriste `PII_REDACTION_ENABLED` (zahtjev) i
`PII_RESPONSE_SANITIZATION` (odgovor + SSE), a obje su opcije zadano isključene.

- **Odabir po tipu** — ugrađeni ID-ovi navedeni su u
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ako nije postavljeno, podrazumijevaju se svi
  tipovi (ponašanje prije uvođenja ove postavke). Obrazac `ssn_us` mehanizma za
  zahtjeve mapira se na `ssn`. Predlošci (Minimalni, Standardni, Finansijski,
  Brazilski, SAD, Potpuni) samo popunjavaju potvrdne okvire u korisničkom interfejsu.
- **Prilagođeni obrasci** — do 20 regex ili zamjenskih obrazaca (`*` = do 64
  znaka koji nisu razmaci, `?` = jedan znak). Podudaranja postaju `[CUSTOM_REDACTED]`.
  Svaki obrazac prolazi kroz `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): najviše 500 znakova, zastavice su ograničene
  na `g i m s u`, mora se moći kompajlirati, mora proći `safe-regex` (katastrofalno
  vraćanje unazad) i ne smije se podudarati s praznim nizom znakova ili rezerviranim mjestom za redigovanje.
  Obrazac koji ne prođe provjeru odbija se pri spremanju i testiranju, a pohranjeni red
  koji ne prođe provjeru preskače se tokom izvršavanja umjesto da se kompajlira. Prilagođeni obrasci izvršavaju se samo
  dok je maskiranje uključeno.
- **Brojači otkrivanja** — brojevi po tipu (nikada podudarne vrijednosti), čuvaju se u
  memoriji i poništavaju pri ponovnom pokretanju (`src/lib/pii/piiDetectionStats.ts`). Povećavaju se samo
  dok je maskiranje uključeno.

Postavke se nalaze u tabeli `key_value` (imenski prostor `pii_settings`,
`src/lib/db/piiSettings.ts`) i čitaju se putem predmemorije od 1 s. API:

| Metoda | Putanja                  | Svrha                                                                             |
| ------ | ------------------------ | --------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stanje zastavice, `enabledTypes`, `customPatterns`, brojači otkrivanja            |
| `PUT`  | `/api/settings/pii`      | Zamjenjuje `enabledTypes` (`null` = svi) i/ili `customPatterns`                   |
| `POST` | `/api/settings/pii/test` | Probno izvršava jedan obrazac nad uzorkom od najviše 8 KB; ništa se ne pohranjuje |

Sve tri operacije zahtijevaju upravljačku autentifikaciju i validiraju tijelo pomoću Zoda
(`src/shared/validation/schemas/piiSettings.ts`).

### Umetanje zlonamjernih upita (`promptInjection.ts`)

Otkriva zlonamjerne strukture u sadržaju koji je dostavio korisnik i primjenjuje
konfigurirana pravila. Ponašanje određuju varijable okruženja i opcije konstruktora:

| Postavka        | Varijabla okruženja                                                                                   | Zadano | Efekat                                                                                                                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Omogućeno       | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | Kada je `false`, zaštitni mehanizam odmah prekida izvršavanje.                                                                                                                                                     |
| Način rada      | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | Pravilo za injekcije: `block`, `warn` ili `log`. (`redact` je prihvaćen radi kompatibilnosti unazad, ali **ne** uklanja tekst injekcije; prepisivanje PII podataka u zahtjevu kontrolira `PII_REDACTION_ENABLED`.) |
| Prag blokiranja | Opcija `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Minimalna ozbiljnost potrebna za blokiranje. Uz zadane postavke, srednja ozbiljnost služi samo za praćenje.                                                                                                        |

**Prioritet načina rada** (`getMode`): pozivateljev `options.mode` →
`INJECTION_GUARD_MODE` **zamjena zastavice funkcionalnosti iz baze podataka** (Kontrolna tabla → Postavke →
Zastavice funkcionalnosti) → varijabla okruženja `INJECTION_GUARD_MODE` → varijabla okruženja `INPUT_SANITIZER_MODE` →
`warn`. Zamjena postavljena putem kontrolne table stoga ima prednost nad varijablama okruženja, pa korisnički
interfejs za zastavice funkcionalnosti upravlja aktivnim zaštitnim mehanizmom u stvarnom vremenu (bez ponovnog pokretanja). Čitanje iz baze podataka je sigurno u slučaju greške:
ako dođe do greške, zaštitni mehanizam se vraća na ponašanje zasnovano na varijablama okruženja, a kada nije
postavljena zamjena, ponašanje je identično razrješavanju zasnovanom isključivo na varijablama okruženja.

Izvori detekcije:

1. `sanitizeRequest()` iz `@/shared/utils/inputSanitizer` (zajednički skup detektora
   koji se koristi i drugdje u cjevovodu).
2. Ugrađeni `DEFAULT_GUARD_PATTERNS` (trenutno `system_override_inline` i
   `markdown_system_block`, oba ozbiljnosti `high`).
3. Opcionalni `customPatterns` proslijeđeni putem opcija konstruktora (stringovi, regularni izrazi
   ili zapisi oblika `{ name, pattern, severity }`).

Kada je `mode === "block"` **i** najmanje jedna detekcija zadovoljava prag
ozbiljnosti, `preCall` vraća `{ block: true, message: "Request rejected:
suspicious content detected" }`. U načinima rada `warn`/`log` zaštitni mehanizam bilježi događaj, ali
dopušta poziv. Zajednička pomoćna funkcija `evaluatePromptInjection()` također se izvozi
za pozivatelje koji trebaju procijeniti upite bez korištenja registra.

**Ograničenje skeniranja (v3.8.20):** detektor provjerava samo **prvih 16 KB**
spojenog teksta upita — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajta) u
`src/shared/utils/inputSanitizer.ts`. I `detectInjection()` i
`evaluatePromptInjection()` pozivaju `slice(0, MAX_INJECTION_SCAN_BYTES)` prije pokretanja
petlje obrazaca. Direktive za injekcije nalaze se pri vrhu unosa, pa se time
ograničava opterećenje CPU-a/GC-a regularnim izrazima na sadržajima veličine više stotina KB bez slabljenja detekcije (vidjeti
#3932, #4041).

### Masker vjerodajnica (`credentialMasker.ts`)

Izvršava se u **obje** faze, posljednji u zadanom lancu (prioritet `95`). Rediguje
poznate obrasce API ključeva / tajnih tokena iz odlaznog sadržaja (sadržaj
poruka, argumenti poziva alata, rezultati alata) **i** odgovora pružatelja usluge, tako da
vjerodajnica zalijepljena u upit (ili vraćena u rezultatu alata) ne procuri
prema vanjskom pružatelju usluge niti nazad klijentu.

- **Samo uz izričito uključivanje**, ista konvencija kao kod redigovanja PII podataka (povezano sa strogim pravilom #20):
  onemogućeno osim ako je `settings.credentialRedactionEnabled === true` **ili**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kada je isključeno, zaštitni mehanizam ne radi ništa —
  nikada ne blokira niti prepisuje.
- `redactCredentials()` prolazi kroz cijelo stablo sadržaja/odgovora (`walkValue()`,
  sigurno od zagađenja prototipa i ciklusa putem `WeakSet`) i zamjenjuje podudaranja
  rezerviranim tekstom `[REDACTED:<type>]`, klonirajući samo grane koje su zaista
  promijenjene.
- `CREDENTIAL_PATTERNS` obuhvata ključeve pružatelja LLM usluga (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokene (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), ključeve za plaćanje (Stripe, Square), ključeve za usluge
  u oblaku (AWS pristupni ključ, Twilio, SendGrid, Mailgun), privatne ključeve / JWT-ove,
  stringove veze koji sadrže vjerodajnice (`mongodb://user:pass@...` itd.) i
  generički obrazac vrijednosti zaglavlja `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Ključevi u obliku zaglavlja (`authorization`, `x-api-key`, `api-key`,
  `apikey`) rediguju se strukturno (samo vrijednost, dok se prefiks sheme poput
  `Bearer `/`Basic ` zadržava), a ne putem generičkog tekstualnog regularnog izraza.
- Zaštitni mehanizam nikada ne blokira; samo prepisuje (`modifiedPayload` /
  `modifiedResponse`) i dodaje bilješke (`meta.credentialsRedacted`, `meta.count`).

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
  message?: string; // prikazuje se prilikom blokiranja
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // vraća ga preCall radi izmjene zahtjeva
  modifiedResponse?: TValue; // vraća ga postCall radi izmjene odgovora
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

Zaštitna ograda signalizira „bez promjene“ vraćanjem vrijednosti `void`, `{}` ili
`{ block: false }`. Vraćanje vrijednosti `modifiedPayload`/`modifiedResponse` zamjenjuje
vrijednost koja prolazi kroz lanac za naredne zaštitne ograde.
`signal?: AbortSignal` prenosi životni ciklus pozivaoca u zaštitne ograde. Prekid zahtjeva predstavlja namjerni izuzetak otvorenog propuštanja: medijski mostovi zaustavljaju obradu i obavljaju čišćenje bez vraćanja neobrađenog medijskog sadržaja cilju za koji je poznato da ga ne podržava.

## Registar (`registry.ts`)

Singleton `guardrailRegistry` izlaže:

- `register(guardrail)` — dodaje (ili zamjenjuje normaliziranim imenom) zaštitnu ogradu i
  ponovno sortira po rastućem `priority`.
- `clear()` / `list()` — administrativni pomoćnici.
- `runPreCallHooks(payload, context)` — iterira kroz aktivne zaštitne ograde, provlači
  `payload` kroz `modifiedPayload` i zaustavlja se na prvom `block: true`.
- `runPostCallHooks(response, context)` — isti tok na strani odgovora.
- `resetGuardrailsForTests({ registerDefaults })` — briše stanje i opcionalno
  ponovno registrira zadane vrijednosti za čistu izolaciju testova.

Oba pokretača vraćaju `{ blocked, payload|response, results, guardrail?, message? }`
gdje je `results` niz zapisa `GuardrailExecutionResult` koji uključuju
polja `blocked`, `skipped`, `modified`, `error` i `meta` po zaštitnoj ogradi,
korisna za praćenje.

### Onemogućavanje zaštitnih ograda po zahtjevu

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agregira
dedupliciranu listu imena zaštitnih ograda koje treba preskočiti za trenutni
zahtjev. Izvori (svi opcionalni, svi spojeni):

- `apiKeyInfo.disabledGuardrails`
- Tijelo zahtjeva `disabledGuardrails` (na najvišem nivou)
- Tijelo zahtjeva `metadata.disabledGuardrails`
- Zaglavlje `x-omniroute-disabled-guardrails` (ili zastarjelo
  `x-disabled-guardrails`)

Vrijednosti mogu biti nizovi stringova ili string odvojen zarezima; imena su
normalizirana u mala slova kebab-case (`pii_masker` → `pii-masker`). Rezultat
se prosljeđuje kroz `context.disabledGuardrails` registru, koji preskače
odgovarajuće zaštitne ograde (`skipped: true` u `results`).

## Redoslijed izvršavanja

Za svaki zahtjev koji prolazi kroz `src/sse/handlers/chat.ts` i
`open-sse/handlers/chatCore.ts`:

1.  `resolveDisabledGuardrails(...)` gradi listu za preskakanje iz API ključa, tijela i zaglavlja.
2.  `guardrailRegistry.runPreCallHooks(body, ctx)` pokreće zaštitne ograde (guardrails) u rastućem redoslijedu prioriteta:
    - Onemogućene zaštitne ograde se bilježe kao `skipped`.
    - `preCall` svake zaštitne ograde može prepisati payload putem `modifiedPayload`.
    - Prvi `block: true` prekida lanac i rukovatelj vraća odgovor o odbijanju zaštitne ograde.
3.  (Potencijalno prepisan) payload ulazi u kombinovano rutiranje i uzvodno slanje.
4.  Nakon što je odgovor sastavljen, `guardrailRegistry.runPostCallHooks(...)` pokreće isti lanac na odgovoru. `block: true` ovdje odbacuje uzvodni odgovor.

Zaštitne ograde koje izbace grešku bilježe se sa `error: <message>` i loguju putem
`logger.warn`, ali lanac se nastavlja — dizajnirano da bude "fail-open".

## Konfiguracija

Varijable okruženja koje čitaju ugrađene zaštitne ograde:

| Varijabla                             | Koristi                 | Efekat                                                                                                                          |
| :------------------------------------ | :---------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`      | Postavite `false` da potpuno onemogućite detekciju.                                                                             |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`      | Politika injekcije: `warn`, `block`, ili `log`. Stara vrijednost `redact` ne prepisuje tekst injekcije.                         |
| `INJECTION_GUARD_MODE`                | `prompt-injection`      | Način rada za zaštitu od injekcije; također zastavica funkcije baze podataka koja **nadjačava** varijable okruženja (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`      | Minimalna ozbiljnost koju `MODE=block` odbija: `high` (podrazumijevano), `medium`, ili `low`.                                   |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`      | Stari alias za `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                               |
| `PII_REDACTION_ENABLED`               | `pii-masker`            | Kada je `true`, PII zahtjeva se rediguje (nezavisno od načina injekcije).                                                       |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nizvodno) | Kontroliše ponašanje maskera na strani odgovora.                                                                                |

Zaštitne ograde Modality Bridge čitaju konfiguraciju vremena izvođenja iz skladišta postavki podržanog bazom podataka (`getSettings()`), a ne iz varijabli okruženja. Primarni ključevi za Vision su
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, i
`modalityBridgeCacheMaxEntries`. Stari
`visionBridge*` ključevi su prihvaćeni samo kao dokumentovani jednociklični rezervni mehanizam za čitanje; upisi na kontrolnoj tabli koriste primarne ključeve. Podrazumijevane vrijednosti i rezervni rješavač nalaze se u `src/shared/constants/modalityBridgeDefaults.ts`, sa starim konstantama zadržanim u `src/shared/constants/visionBridgeDefaults.ts`.

Audio koristi `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, i `modalityBridgeAudioMaxClips`, plus zajedničke
`modalityBridgeCache*` postavke. Audio nema rezervni mehanizam za stare ključeve jer su ovi ključevi uvedeni sa Modality Bridge shemom.

Video koristi `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, i
`modalityBridgeVideoTimeout`, plus zajedničke `modalityBridgeCache*` postavke.
Podrazumijevano je onemogućeno jer su FFmpeg/ffprobe opcionalne operativne zavisnosti, a titlovanje okvira dodaje kašnjenje i troškove modela.

## Prilagođeni Guardrails

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

1.  Kreirajte `src/lib/guardrails/myGuardrail.ts` koji proširuje `BaseGuardrail`.
2.  Implementirajte `preCall` i/ili `postCall`.
3.  Registrujte prilikom uvoza (push iz `registerDefaultGuardrails`) ili
    pozovite `guardrailRegistry.register(...)` tokom izvršavanja — registar zamjenjuje
    bilo koji prethodni guardrail sa istim normalizovanim imenom.
4.  Dodajte testove pod `tests/unit/` (postojeći primjeri:
    `tests/unit/guardrails-registry.test.ts`,
    `tests/unit/prompt-injection-guard.test.ts`,
    `tests/unit/guardrails/visionBridge.test.ts`).

## Testiranje

Koristite `resetGuardrailsForTests()` između testova da biste počeli iz poznatog stanja.
Proslijedite `{ registerDefaults: false }` da biste počeli sa praznim registrom i
registrovali samo guardraile koji se testiraju. Vision Bridge prihvata ubrizgavanje zavisnosti
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge izlaže ekvivalentne šavove za postavke,
mogućnosti, odabir STT modela, provjere akreditiva i transkripciju. Testovi stoga mogu
izvršavati oba toka bez pristupa bazi podataka ili mreži.

## Pogledajte takođe

- `src/lib/guardrails/` — implementacija
- `src/shared/utils/inputSanitizer.ts` — dijeljeni detektor koji pokreće
  prompt-injection i PII maskiranje
- `src/shared/constants/visionBridgeDefaults.ts` — podrazumijevane postavke Vision Bridge-a i
  lista modela sa prisilnim premošćavanjem
- `src/shared/constants/modalityBridgeDefaults.ts` — dijeljene podrazumijevane postavke Vision/Audio runtime-a
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalni sloj (prekidač strujnog kruga, hlađenja)
- `docs/reference/ENVIRONMENT.md` — potpuna referenca varijabli okruženja

## Pokrivenost rute za zaštitu od ubrizgavanja i crveni tim (Faza 8 · Blok D)

Zaštita od ubrizgavanja (`createInjectionGuard` / `withInjectionGuard`) pokriva sve rute
koje prihvataju korisničke upite. Poštuje `INJECTION_GUARD_MODE` (podrazumijevano `warn` = samo bilježenje;
`block` = vraća HTTP 400 `SECURITY_001`).

| Tip               | Rute                                                                                                                                                 | Podrazumijevani način rada |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- |
| Tekst (postojeći) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                       |
| Generativni       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                       |
| Podaci            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                       |

Ekstrakcija teksta (`extractMessageContents`) pokriva `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Crveni tim (noćno, `nightly-llm-security.yml`):** promptfoo provjerava da svaka ruta blokira
OWASP-LLM korpus u `INJECTION_GUARD_MODE=block`; garak pokreće sonde (preskače bez tajne).
`moderations` je uključen radi dosljednosti — operatori u blok-modu ga mogu izuzeti putem
`resolveDisabledGuardrails`.

Noćni radni tok (`.github/workflows/nightly-llm-security.yml`, cron + ručno
pokretanje) ima dva posla:

- **`promptfoo-guard` (blokiranje)** — pokreće `promptfoo eval -c promptfooconfig.yaml`
  sa `INJECTION_GUARD_MODE=block`. Svaki adversarijalni slučaj (npr. "zanemari sve
  prethodne instrukcije...", DAN-stil jailbreakovi) potvrđuje da odgovor nosi
  `error.code === "SECURITY_001"`, tj. da je zaštita zaista odbila zahtjev.
- **`garak` (savjetodavno)** — pokreće garak `--probes promptinject,dan,leakreplay`
  protiv lokalne OmniRoute instance (`http://localhost:20128/v1`). Ograničeno tajnom
  dobavljača (`PROMPTFOO_PROVIDER_KEY`); graciozno preskače i ima sufiks
  `|| true`, tako da izvještava bez pada CI-ja.

Pokrivenost pomoćnika za zaštitu (`createInjectionGuard` / `withInjectionGuard`)
obuhvata svaku `/v1` rutu koja nosi upit; tekst upita se izvlači iz
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` pomoću
`extractMessageContents()` u `src/shared/utils/inputSanitizer.ts`.
