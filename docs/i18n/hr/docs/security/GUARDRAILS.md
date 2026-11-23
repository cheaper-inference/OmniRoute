# Guardrails (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Izvor istine:** `src/lib/guardrails/`
> **Zadnje ažurirano:** 2026-08-29 — v3.8.51 (Podrijetlo transkripta Video Bridgea deklarira pozivatelj,
> još nije potvrđeno od strane poslužitelja — pojašnjeno prema #11661)

Guardrails (zaštitne ograde) provode sigurnost, pravila i transformacije sadržaja na granici
između OmniRoute-a i uzvodnih (upstream) pružatelja usluga. Svaki guardrail može pregledati (i
opcionalno odbiti, transformirati ili anotirati) terete zahtjeva (`preCall`) i
uzvodne odgovore (`postCall`).

Sustav je **fail-open**: ako guardrail izbaci pogrešku tijekom izvršavanja, registar
bilježi pogrešku i nastavlja sa sljedećim guardrailom umjesto prekidanja
zahtjeva. Blokiranje je eksplicitna odluka (`block: true`), nikada slučajnost.

## Ugrađeni zaštitni mehanizmi

Registar pri uvozu automatski učitava šest zaštitnih mehanizama prema redoslijedu prioriteta
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

### Premosnik za vid (`visionBridge.ts`) — Premosnik modaliteta PR-1

Presreće zahtjeve koji sadrže slike i usmjereni su na **modele bez mogućnosti obrade slika** te
ili preusmjerava cijeli zahtjev na model koji podržava obradu slika ili zamjenjuje slikovne
dijelove tekstualnim opisima koje prije poziva nadređenog sustava generira podesivi model za
obradu slika. To pružateljima koji podržavaju samo tekst omogućuje transparentnu obradu
multimodalnih korisnih sadržaja.

Tijek:

1. Preskoči ako ciljni model već podržava obradu slika (osim ako se nalazi na
   popisu modela za prisilno premošćivanje `isVisionBridgeForcedModel`).
2. Izdvoji slikovne dijelove putem `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), koji delegira **objedinjenom detektoru
   medija** `detectMediaParts()` u `open-sse/utils/mediaParts.ts` — jedinstvenom
   izvoru istine koji se dijeli s filtrom kompatibilnosti combo modela.
   Izdvajanje je ograničeno popisom dopuštenih oblika dijelova najviše razine
   koje `replaceImageParts` može umetnuti natrag (ugovor izdvajanje↔zamjena): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` i Responses API `input_image`. Ugniježđena podudaranja i
   oblici koji služe samo kao indikatori materijal su za combo filtar i nikada se ne izdvajaju.
   Preskoči ako ništa nije pronađeno.
3. Odredi konfiguraciju tijekom izvođenja putem `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): novi ključevi postavki `modalityBridge*`
   imaju prednost; naslijeđeni ključevi `visionBridge*` ostaju kao **rezervna opcija za jedan
   ciklus** (razdoblje za povratak na prethodnu verziju). Preskoči prije bilo kakvog prolaska kroz medije kada je
   premošćivanje onemogućeno.
4. Birač načina rada (`modalityBridgeVisionMode`, pogledajte tablicu u nastavku) odlučuje
   između preusmjeravanja i opisivanja. Preusmjeravanje vraća `modifiedPayload` u kojem je zamijenjen
   samo `model`, uz meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Putanja opisivanja: ograničava slike na `maxImages`, sastavlja upit prilagođen zadatku,
   provjerava predmemoriju opisa, poziva model za obradu slika **paralelno**
   (`Promise.allSettled`) i umjesto slika umeće tekstualne dijelove `[Image N]: <description>`.
   Neuspjelo opisivanje daje `null`, a izvorni slikovni dio ostaje
   **sačuvan** (#4012) — osim na combo putanji opisivanja kada sva
   opisivanja ne uspiju, pri čemu potvrđeni nadređeni sustav bez mogućnosti obrade slika dobiva zamjenski tekst
   `(unavailable — no vision-capable provider connected)` (#8430).
6. Vrati `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Birač načina rada (`modalityBridgeVisionMode`)

| Način rada | Zadano | Ponašanje                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | Naslijeđena heuristika, neizmijenjena (#6640/#7204): modeli koji nisu combo/`auto/` preusmjeravaju se na najbolji model za obradu slika, osim ako izvorni model već ima upotrebljive vjerodajnice (tada se opisuje); combo ciljevi uvijek se opisuju.                                                                                                     |
| `describe` |        | Uvijek opisuj — blok za preusmjeravanje u potpunosti se preskače; model koji je korisnik odabrao uvijek odgovara.                                                                                                                                                                                                                                         |
| `reroute`  |        | Prisilno preusmjeravanje: zaobilazi se zaštita za zadržavanje modela s vjerodajnicama. Zaštita vjerodajnica **cilja** preusmjeravanja i dalje se primjenjuje — kada ne postoji upotrebljiv ciljni model za obradu slika, zahtjev prelazi na opisivanje kako neobrađene slike nikada ne bi stigle do pozadinskog sustava koji podržava samo tekst (#8430). |

Prisilni načini rada zaustavljaju daljnju obradu **prije** pokretanja automatske heuristike; ponašanje načina `auto`
identično je, na razini bajtova, zaštitnom mehanizmu prije PR-1.

#### Opseg API ključa (`visionBridgeKeyScope.ts`)

Kada API ključ pozivatelja ograničava `allowedConnections`, skupove kvota
(`allowedQuotas`) ili modele (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), premošćivanje odabire samo
modele za preusmjeravanje i opisivanje koje ključ smije upotrebljavati, na vezama koje ključ smije
upotrebljavati. Poziv za opisivanje zatim uvijek prolazi kroz OmniRoute povratnu petlju s
zaglavljem `x-omniroute-self-loop-key-id`, tako da primajući zahtjev za razgovor
ponovno provodi pravila tog ključa za veze i modele. `enforceApiKeyPolicy()`
poštuje to zaglavlje samo zajedno s bearerom povratne petlje, pa ono može samo
dodatno ograničiti pristup, a id koji se ne može razriješiti odbija se.

Ako za ključ nije dopušten nijedan model za obradu slika, putanja opisivanja povlači se i
zahtjev se prosljeđuje neizmijenjen, uz isto ponašanje otvorenog propuštanja kao kod onemogućenog
zaštitnog mehanizma (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Zahtjevi bez ključa i ključevi bez tih ograničenja ponašaju se potpuno jednako kao
prije.

#### Upit za opisivanje prilagođen zadatku (`modalityBridgeVisionTaskAware`)

Zadano je **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) dodaje
tekst **posljednje korisničke poruke** (skraćen na 500 znakova) osnovnom
promptu za opisivanje, usmjeravajući opis prema onome što je korisnik doista pitao
(obrazac codex-vision-proxy) i tražeći od modela za vid da transkribira vidljivi
tekst. Kada je zastavica isključena — ili nema korisničkog teksta — osnovni prompt upotrebljava se nepromijenjen.

Vlastiti OpenAI-kompatibilni zahtjev samopetlje za opisivanje (`callVisionModelSingle()`
u `visionBridgeHelpers.ts`) uvijek zahtijeva `image_url.detail: "high"` —
bezuvjetno, za svakog pozivatelja/pružatelja, bez ovisnosti o bilo kojem signalu klijenta.
Uzorkovanje s niskom razinom detalja smanjuje točnost OCR-a upravo za zadatak transkripcije
teksta koji ovaj prompt traži, pa sam poziv za opisivanje uvijek zahtijeva visoku
razinu detalja bez obzira na razinu detalja korištenu u izvornom dolaznom zahtjevu. To
utječe samo na interno tijelo zahtjeva za opisivanje; ne mijenja način na koji
OmniRoute prosljeđuje pozivateljev vlastiti `image_url.detail` u primarnom zahtjevu —
ta se zadana vrijednost primjenjuje zasebno i samo za otkrivene OpenCode klijente, u
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Grana
samopetlje za opisivanje u Anthropic žičanom formatu nema polje `detail`
i na nju ne utječe nijedna zadana vrijednost.

#### Ograničenje izlaza opisa (`modalityBridgeVisionMaxChars`)

| Ključ                          | Zadano | Raspon            |
| ------------------------------ | ------ | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`    | `0` ili 100–50000 |

`0` (zadano) znači **bez ograničenja** — opis koji vrati
`callVisionModel()` prosljeđuje se neizmijenjen, čime se zadržava postojeće
ponašanje. Svaka vrijednost u rasponu 100–50000 skraćuje opis dodavanjem
sufiksa `…` prije nego što se umetne natrag kao `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` u `src/lib/guardrails/visionBridge.ts`).
Povećajte ovu vrijednost za OCR zadatke s mnogo detalja u kojima naknadni model treba
potpunu transkripciju; smanjite je kako biste ograničili potrošnju tokena kod opširnih modela za vid.
Polje nadzorne ploče nalazi se na ploči Napredno kartice Vision
(`modality-bridge-max-chars` u `ModalityBridgeVisionTab.tsx`) i podiže svaku
vrijednost između 1 i 99 na donju granicu od 100, dok izričitu vrijednost `0`
ostavlja nepromijenjenom — `0` je samostalno valjana Zod vrijednost
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), a ne samo
zadana vrijednost „nije postavljeno”.

#### Predmemorija opisa (`modalityBridge/bridgeCache.ts`)

Predmemorija LRU + TTL u memoriji za izlaze opisa, zajednička na razini cijelog procesa.
Ključ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` s
uokvirivanjem prefiksom duljine (bez kolizija granica polja). Komponenta modela jest
**konfigurirani** model mosta, a ne model koji je stvarno odgovorio —
`callVisionModel` može interno upotrijebiti rezervni model, a stvaranje ključa po pokušaju
fragmentiralo bi predmemoriju. Neuspjeli opisi nikad se ne spremaju u predmemoriju. Postavke:

| Ključ                           | Zadano | Raspon  |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Normalizacija udaljenih slika (samopetlja za opisivanje/dohvaćanje base64)

Kada most sam dohvaća **udaljenu** sliku — Anthropic samopoziv za opisivanje
i pretvorba u base64 za claude-wire-format
(`ensureBase64ImagesForClaudeWire`), oboje putem
`fetchRemoteImageAsDataUri()` u `visionBridgeHelpers.ts` — dobiveni podatkovni
URI prosljeđuje se kroz `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) prije ugrađivanja u zahtjev
modelu za vid. Prevelike slike smanjuju se na **duži rub od 2048 px** (što odgovara
ograničenju promjene veličine koje OpenAI/Anthropic već primjenjuju na strani poslužitelja), čime se smanjuju
broj bajtova pri prijenosu i latencija bez promjene onoga što model za vid vidi. Promjena veličine
koristi `sharp`, učitan dinamičkim uvozom: na platformi na kojoj se njegova izvorna
binarna datoteka ne uspije učitati, `normalizeDataUri()` **nikad ne izbacuje iznimku** — umjesto toga
izvorne bajtove prosljeđuje nepromijenjene, pa putanja za opisivanje/pretvorbu u base64
uvijek nastavlja raditi. Bajtovi koji nisu slika (dohvaćanje koje nije vratilo
sliku koju je moguće dekodirati) također se prosljeđuju nepromijenjeni. Ova normalizacija
ograničena je na slike koje most dohvaća za vlastiti samopoziv — nikad se
ne primjenjuje na pozivateljev izvorni neizmijenjeni sadržaj, u skladu s
načelom izmjene isključivo uz izričit pristanak (Strogo pravilo #20).

#### Shema postavki + migracija

Novi ključevi `modalityBridge*` provjeravaju se Zodom u `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trojka `modalityBridgeCache*` i
grupa `modalityBridgeAudio*` koju koristi Audio Bridge. Migracija
`141_modality_bridge_settings.sql` kopira postojeće naslijeđene
vrijednosti `visionBridge*` u odgovarajuće nove ključeve (idempotentno, nikad ne prepisuje
vrijednost `modalityBridge*` koju je postavio operater); naslijeđeni ključevi ostaju prihvaćeni kao
rezervna opcija za čitanje tijekom jednog ciklusa izdanja.

#### Zaglavlje transparentnosti + statistika

Odgovori transformirani opisivanjem sadrže
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(izrađuje ga `buildModalityBridgeHeader()` u `modalityBridge/bridgeStats.ts`,
a postavlja `withModalityBridgeHeader()` u `src/sse/handlers/chatHelpers.ts`).
Preusmjereni zahtjevi **nemaju** zaglavlje — sadržaj je ostao neizmijenjen, a zamjena
modela već je vidljiva u polju `model` tijela odgovora.

`GET /api/modality-bridge/stats` (autentikacija za upravljanje, ista razina kao
`GET /api/settings`) vraća brojače po modalitetu u memoriji
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio` i
`video`. `averageLatencyMs` kao nazivnik koristi `latencySamples`, a ne sve
pokušaje; operacija bez mjerenja vremena ne stvara lažni uzorak od nula
milisekundi. `bridged` ostaje unatrag kompatibilan pseudonim za uspješne
pretvorbe; neuspjeli pokušaji ne povećavaju njegovu vrijednost.
Brojači se namjerno poništavaju pri ponovnom pokretanju procesa
(telemetrija, a ne računovodstvo).

#### Konfiguracija nadzorne ploče

Namjenska stranica nadzorne ploče nalazi se na
`/dashboard/settings/modality-bridge`. Njezine kartice `Vision`, `Audio` i
`Video`, kojima se može pristupiti putem URL-a, zadržavaju parametre upita pri
promjeni vrijednosti `tab`. Kartica Vision nudi omogućavanje, način rada, odabir
modela (uključujući automatsku zadanu vrijednost), oblikovanje upita prilagođeno
zadatku, napredna ograničenja isteka vremena, slike, duljine opisa i predmemorije,
brojače tijekom izvođenja te zaštićeni ogledni zahtjev. Kartica Audio također je
aktivna: nudi omogućavanje, alat za odabir isključivo STT modela s opcijom Auto,
ograničenja isteka vremena i maksimalnog trajanja isječka, brojače zvuka te ogledni
test `input_audio`. Kartica Video je funkcionalna: prikazuje stanje izvođenja za
FFmpeg/ffprobe — jedno od četiri izričita stanja korisničkog sučelja (`unknown`
dok je provjera u tijeku ili se nije mogla dovršiti, `restricted` na hostu
nadzorne ploče koji nije povratna petlja i na kojem se provjera preskače na
klijentskoj strani, `unavailable` nakon što se provjerom potvrdi da nedostaje ili
`available` s verzijama FFmpeg/ffprobe) — trajno sprema ograničenja omogućavanja,
modela, kadrova, videozapisa i isteka vremena, filtrira alat za odabir modela tako
da prikazuje modele koji podržavaju vid te nudi brojače videozapisa.

Prethodna kartica Vision Bridge u postavkama umjetne inteligencije sada je
poveznica radi kompatibilnosti na novu stranicu; više ne sadržava drugu kopiju
obrasca. Media Providers također povezuje tijekove rada Image-to-Text i
Speech-to-Text s odgovarajućim karticama Modality Bridge bez uklanjanja postojećeg
okruženja za isprobavanje značajke Speech-to-Text.

**Zaobilaženje kontrole prijema za vlastitu petlju:** kada se poziv za opisivanje
usmjerava kroz vlastitu `/v1` petlju OmniRoutea (model nestandardnog pružatelja),
podzahtjev šalje `x-omniroute-admission-bypass: internal` i autentificira se
razrijeđenom vjerodajnicom vlastite petlje — lokalnom kontrolnom vrijednošću
`sk_omniroute` u lokalnom načinu rada ili ključem iz okruženja
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` koji je konfigurirao operater (#1350),
kako bi implementacije s `REQUIRE_API_KEY=true` i dalje mogle izvršiti poziv za
opisivanje. Zaobilaženje se dopušta samo za te točne vjerodajnice, pa vanjski
klijenti ne mogu upotrijebiti zaglavlje za preskakanje kontrole prijema.

Naslijeđene zadane vrijednosti nalaze se u
`src/shared/constants/visionBridgeDefaults.ts`; nove zadane vrijednosti za način
rada, prilagođavanje zadatku i predmemoriju te razrješivač postavki nalaze se u
`src/shared/constants/modalityBridgeDefaults.ts`. Zaštitni mehanizam nudi opciju
konstruktora `deps` kako bi testovi mogli umetnuti lažne implementacije
`getSettings` i `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Presreće zahtjeve za razgovor koji sadrže zvuk prije nego što dosegnu odredište
za koje nije poznato da prihvaća zvučni ulaz. Nikada ne preusmjerava zahtjev za
razgovor: zvučni dijelovi transkribiraju se putem postojećeg višedijelnog krajnjeg
čvora kompatibilnog s OpenAI-jem, a odabrani model za razgovor nastavlja rad s
tekstnim transkriptima.

Tijek:

1. Razriješite `supportsAudio` putem `getResolvedModelCapabilities()`. Prednost
   imaju eksplicitni metapodaci registra pružatelja, zatim statični metapodaci
   modela, a potom sinkronizirani `modalities_input`. Deklarirani popis ulaza bez
   vrijednosti `audio` daje `false`; ako nema dokaza o sposobnosti, vrijednost
   ostaje `null`. I `false` i `null` aktiviraju konzervativni most, dok ga `true`
   zaobilazi.
2. Razriješite postavke `modalityBridgeAudio*` i izdvojite spojive zvučne dijelove
   najviše razine iz svake poruke putem zajedničkog detektora
   `detectMediaParts()`. Podržani oblici prijenosa jesu OpenAI `input_audio`,
   `audio_url` i `source.media_type: "audio/*"`. Ugniježđeni zvuk otkriva se radi
   usmjeravanja, ali se ne uklanja putem postupka spajanja. Opseg rada ograničen
   je postavkom `modalityBridgeAudioMaxClips`; kasniji dijelovi ostaju
   nepromijenjeni.
3. Poštujte konfigurirani `provider/model` ili dopustite funkciji
   `selectAudioBridgeModel()` da prođe kroz `AUDIO_TRANSCRIPTION_PROVIDERS`
   stabilnim redoslijedom kataloga i odabere prvi model s upotrebljivom aktivnom
   vjerodajnicom pružatelja.
4. `callAudioTranscription()` pretvara zvuk u obliku base64/data-URI u višedijelnu
   datoteku `file` ili preuzima udaljeni `audio_url` putem zaštite za izlazne veze
   koja dopušta samo javne adrese, uz DNS prikvačivanje i ograničenje od 25 MB.
   Zatim POST-om šalje datoteku i odabrani model lokalnoj vlastitoj petlji
   `/v1/audio/transcriptions`, autentificiranoj funkcijom
   `resolveSelfLoopBearer()`. Postojeća ruta za transkripciju obavlja uobičajeno
   traženje vjerodajnica, obradu razdoblja hlađenja i ograničenja brzine te
   prosljeđivanje pružatelju.
5. Uspješni pozivi zamjenjuju svoje dijelove tekstom
   `[Audio N]: <transcript>`. Pozivi se izvršavaju pomoću `Promise.allSettled`:
   pojedinačni neuspjeh zadržava izvorni zvučni dio (ugovor #4012). Ako svi pozivi
   ne uspiju, a dokazano je da je za odredište `supportsAudio === false`, dijelovi
   postaju `[Audio N]: (unavailable — no STT provider connected)` (ugovor #8430).
   Za nepoznato odredište (`null`) rezultat u kojem su svi pozivi neuspješni
   ostaje nepromijenjen. Dokazano tekstno odredište bez upotrebljive STT
   vjerodajnice prima isti izričiti zamjenski tekst bez slanja mrežnog poziva.

Uspješni transkripti koriste procesno globalnu LRU/TTL predmemoriju Modality
Bridgea. Ključ kombinira referencu zvuka, stabilnu oznaku operacije
`audio-transcription` i odabrani STT model; neuspjesi se nikada ne spremaju u
predmemoriju. Pokušaji obrade zvuka ažuriraju zajedničke brojače `bridged`,
`cacheHits`, `failures` i `lastUsedAt`. Transformirani odgovori sadržavaju
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`;
nepromijenjeni zahtjevi ne dobivaju segment Audio Bridge.

Postavke tijekom izvođenja pohranjene su u bazi podataka i provjerene pomoću
Zoda:

| Ključ                         | Zadano  | Raspon                |
| ----------------------------- | ------- | --------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                     |
| `modalityBridgeAudioModel`    | `""`    | Automatski ili STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000           |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                  |

Zajedničkom predmemorijom i dalje upravljaju `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` i `modalityBridgeCacheMaxEntries`.

### Videomost (`videoBridge.ts`, `videoBridgePipeline.ts`)

Presreće videodijelove najviše razine u `messages` API-ja Chat Completions i
`input` API-ja Responses prije pozivanja cilja bez poznate izvorne podrške za
video. Podržani su oblici `input_video`, `video_url`, `video_source`, HTTPS URL-ovi
i podatkovni URI-ji `data:video/*;base64,...`. Obični nazivi datoteka u tekstu ne
tretiraju se kao videozapisi.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) upravlja prolaskom kroz zahtjev,
provjerom mogućnosti/pravila, agregacijom po zahtjevu i sadržajem odgovora.
Obrada pojedinačnog videozapisa — dohvaćanje, predmemorija cjelokupnog rezultata,
opisivanje slijeda kadrova (koje objedinjuje transkript zvuka koji je deklarirao
pozivatelj) te metrike/prekid/čišćenje za svaki pokušaj — skrivena je iza
`processVideoPart` u `videoBridgePipeline.ts`, koji se poziva jednom za svaki
videodio unutar petlje funkcije `preCall`. Taj modul također definira izričite
granice priključaka `VideoMediaBrokerPort` (dohvaćanje bajtova i izdvajanje
uzorkovanih kadrova), `VideoAudioTranscriptionPort` (objedinjavanje transkripta
zvuka koji je deklarirao pozivatelj s opisima uzorkovanih kadrova) i
`VideoDrilldownPort` (granica trajne pohrane detaljne analize kadrova; još nije
povezana s `processVideoPart` — danas samo zasebna ruta
`/api/modality-bridge/video/drilldown` zapisuje unose detaljne analize).

Javna putanja zahtjeva `/v1` nikada ne uvozi niti poziva potproces. Udaljeni
videozapisi preuzimaju se uz ograničenje od 50 MiB; ugrađeni base64-videozapisi
imaju konzervativno ograničenje od 36 MiB dekodiranih podataka po videozapisu
kako bi omotnica modela/poruka/uokvirivanja mogla ostati unutar javnog
ograničenja prihvata JSON zahtjeva od 50 MiB. Duljina ugrađenih podataka i
procjene dekodirane veličine provjeravaju se prije alokacije. HTTPS je obavezan
za početni udaljeni URL i svako preusmjeravanje, uz postojeću javnu zaštitu
izlaznog prometa s DNS pričvršćivanjem. Bajtovi zatim prelaze točno definiranu
internu granicu brokera `POST /api/modality-bridge/video/extract`. Ta je ruta
istodobno `LOCAL_ONLY` i `SPAWN_CAPABLE`, prihvaća samo autentificirani zahtjev
pouzdane povratne petlje unutar procesa i nikada ne prihvaća URL, putanju
datotečnog sustava, izvršnu datoteku ni popis argumenata. Obradni niz ograničenja
veličine tijela API-ja i inkrementalni čitač tijela u rukovatelju neovisno
provode ograničenje brokerskog ulaza od 50 MiB. Njegov ograničeni red obrađuje
jedno izdvajanje odjednom, dopušta četiri posla na čekanju i ograničava ulazne
podatke na čekanju na 100 MiB.

Unutar brokera `ffprobe` čita privatnu lokalnu datoteku; fiksni popis dopuštenih
formata isključuje formate popisa za reprodukciju i manifesta. Za dopuštene
spremnike iz obitelji MOV vanjske reference na MOV podatke ostaju zadano
onemogućene, a fiksna naredba ne omogućuje ih izričito. I `ffprobe` i `ffmpeg`
upotrebljavaju popis dopuštenih protokola ograničen samo na `file`, jednu nit,
fiksne nizove argumenata, bez ljuske, te izvršne datoteke pronađene putem
`PATH`. Tokovi naslovnih slika u privitku nisu kandidati za reprodukciju. Svi
tokovi koji se mogu reproducirati moraju zadovoljiti ograničenja, a eksplicitni
zadani tok ima prednost pred determinističkim odabirom toka s najnižim indeksom.
Videozapisi su ograničeni na 600 sekundi, 8.192 piksela po dimenziji i
33.554.432 izvorna piksela. FFmpeg uzorkuje 1–16 srednjih JPEG kadrova, smanjuje
dulji rub na najviše 1.024 piksela bez povećavanja manjih ulaza i nikada ne
prima URL. Uzorkovanje je zadano `uniform`. Neobavezna pravila `scene_aware` i
eksperimentalno `segment_aware` izvode jedan dodatni fiksni prolaz FFmpeg-a nad
već provjerenim lokalnim tokom, odabiru ograničene vremenske oznake scena
`showinfo` i deterministički se vraćaju na iste ujednačene srednje točke u
slučaju neuspjeha detektora, isteka vremena, neispravnog izlaza ili praznog skupa
kandidata. Način rada sa sviješću o segmentima raspoređuje uzorke srednjih točaka
proporcionalno provjerenim intervalima scena; dokazi načina rada sa sviješću o
segmentima i ponašanje pri povratku detaljno su opisani u nastavku. Čvrsto
ograničenje od 16 kadrova primjenjuje se nakon odabira u svakom pravilu. Kada
zahtjev sa sviješću o scenama ima proračun od samo jednog kadra, upotrebljava
ujednačenu srednju točku aktivnog cijelog videozapisa ili prozora fokusa i
navodi `policyEffective: uniform`: jedan odabrani kadar scene ne može očuvati
oba vremenska kraja. Pozivatelj može neobavezno navesti konačan prozor fokusa
(`start`/`end` u sekundama); granice se prilagođavaju trajanju medija, obrnuti
ili nekonačni prozori odbijaju se, a sva pravila uzorkovanja primjenjuju se samo
unutar normaliziranog intervala. Dobiveni prozor uključuje se u metapodatke
uzorkovanja i u nepouzdani prefiks opisa kako bi modeli niže u lancu mogli
razlikovati fokusirani isječak od cijele vremenske crte.

Semantički fokus opisa zasebna je, izričita postavka. Zadani način analize
`full` zadržava postojeći upit za kadar i nikada ne prosljeđuje tekst zahtjeva
modelu za opisivanje. U načinu `focused` most čita samo najnoviji neprazni
`text`/`input_text` koji je napisao korisnik iz istog spremnika API-ja Chat ili
Responses, normalizira ga u NFC, sažima kontrolne znakove i bjeline te ga
ograničava na 500 Unicode kodnih točaka. Prazan rezultat vraća se na točan upit
načina `full`. Upotrebljiva naznaka serijalizira se kao JSON u namjenskom bloku
nepouzdanog korisničkog konteksta i smije samo odrediti prioritet vidljivim
pojedinostima; ne može nadjačati zasebno upozorenje protiv slijeđenja uputa koje
su vidljive ili čujne u mediju. Tekstualni fokus nikada ne izvodi `start`/`end`
niti mijenja vremenski uzorkivač.

#### FU-07 strukturni dokazi segmenata

`segment_aware` koristi jedan ograničeni prolaz predanalize nad već validiranim
lokalnim videostreamom. Fiksni lanac filtara najprije smanjuje širinu na najviše
320 piksela, otkriva promjene scena i zamrznute intervale, a zatim uzorkuje
1 kadar u sekundi radi procjene zamućenja, prosječne luminancije te
prostornih/vremenskih informacija. Prolaz je ograničen na 600 strukturnih
uzoraka, jednu FFmpeg/filtersku dretvu, iste popise dopuštenih protokola
isključivo `file` i spremnika, ograničenje izlaza procesa od 1 MiB te najviše
30 sekundi unutar zajedničkog prekida/roka posrednika. Nikada ne prihvaća
naredbu, filtar, putanju ili URL iz zahtjeva.

Strukturne vrijednosti deterministički su uzorkovani dokazi, a ne semantičko
razumijevanje videozapisa. Ne izvode zaključke o subjektima, radnjama,
titlovima, govoru ni namjeri korisnika. Granice scena i zamrzavanja tvore
segmente; pokrivenost zamrzavanjem, zamućenje, ekspozicija, prostorni detalji
i vremenska promjena utječu samo na raspodjelu postojećeg proračuna od
1–16 kadrova. Potpuno zamrznuti segment ograničen je na jedan kadar, dok se
nezamrznuti segmenti natječu za preostali proračun. Kada ima više granica nego
kadrova, zadržava se ravnomjerna pokrivenost vremenske crte kako brzi rani
rezovi ne bi mogli sakriti dugačak završni segment. Granice scena koje su
unutar razlučivosti analize od 1 sekunde u odnosu na granicu zamrzavanja
objedinjuju se.

Nedostajući filtri, neispravni/prazni dokazi, pogreška detektora ili istek
vremena ograničene predanalize otvoreno se vraćaju na točno pravilo
ravnomjerno raspoređenih središnjih točaka. Prekid pozivatelja ili rok
posrednika ne vraća se otvoreno: prekida podproces u tijeku, sprječava naknadno
izdvajanje kadrova, a privatno privremeno stablo uklanja se u `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generira determinističke stvarne FFmpeg
testne sadržaje za uštede poziva za opise nakon deduplikacije, raspodjelu
proračuna pri gustom kretanju, dokaze o zamućenju/ekspoziciji/SI-TI, brze rezove
s dugim završetkom i lažno pozitivne rezultate postupnog zatamnjenja. Bilježi
proteklo vrijeme predanalize te, kada je dostupan `/usr/bin/time`, procesorsko
vrijeme podređenog procesa i vršni RSS. Njegove provjere kvalitete isključivo su
strukturna mjerila. Kvaliteta stvarnog modela za opise ostaje `HOLD` jer ovaj
ispitni okvir nema autoriziranu krajnju točku ni zamrznutog ocjenjivača.
Novčane uštede također ostaju `HOLD`, osim ako
`--caption-cost-per-call-usd` ne navede izričitu pozitivnu procjenu troška po
pozivu; skripta nikada ne izmišlja nijedan od tih rezultata.

Svaki kadar ograničen je na 4 MiB, svi neobrađeni kadrovi zajedno na 23 MiB, a
serijalizirani odgovor posrednika na 32 MiB. Privatni privremeni direktorij
uklanja se u `finally`. OmniRoute ne uključuje FFmpeg u distribuciju i ne
prihvaća prilagođenu putanju do izvršne datoteke. Prije opisivanja bridge
primjenjuje konzervativni prolaz vizualne deduplikacije: svaki JPEG svodi se na
16×16 međuspremnik sivih tonova i uspoređuje samo s posljednjim zadržanim
kadrom. Za zatraženi proračun opisa veći od jednog kadra izdvajanje daje
ograničeni skup kandidata do dvostruke vrijednosti tog proračuna, ali nikada
više od 16 kadrova. Zatraženo ograničenje primjenjuje se tek nakon
deduplikacije, pri čemu se prvi i posljednji odabrani kandidat zadržavaju
tijekom završnog prorjeđivanja kada je proračun najmanje dva. Verzijska politika
`grayscale-16x16-mean-cells-v2` koristi veću vrijednost između srednje promjene
luminancije i omjera ćelija minijature čija je normalizirana promjena najmanje
0.05. Prag duplikata konstanta je 0.04, odabrana radi predvidljivosti umjesto
izlaganja kao postavke tijekom izvođenja. Taj sekundarni signal visokog
kontrasta čuva male pomake i promjene vidljivog teksta koje usporedba samo
srednjih vrijednosti može sakriti. Pogreške usporednika ili dekodera otvoreno
zadržavaju pokrivenost. Izlazni metapodaci odvojeno prikazuju izdvojene
kandidate, uspješno korištene kadrove i odbačene vizualne duplikate.

Izričito označen dio videozapisa može zatražiti kontaktnu tablu s vremenskim
oznakama. Bridge izrađuje JPEG mrežu s najviše 4 stupca i 16 kadrova. Svaka
ćelija od 512 piksela utiskuje vremensku oznaku izvora u donju traku visokog
kontrasta, dok iste vremenske oznake ostaju u tekstualnim metapodacima radi
daljnjeg povezivanja i revizije. Cjeloviti JPEG ostaje ograničen na 32 MiB.
Ako `sharp` ne može dekodirati ili sastaviti mrežu, bridge se vraća na
pojedinačne JPEG kadrove; prekid klijenta i dalje se propagira kroz operaciju
izrade table.

Dokazi za promicanje namjerno su odvojeni od sintetičkog mikromjerila
kompozicije. `scripts/perf/video-bridge-contact-sheet-eval.ts` definira A/B
ispitni okvir s verzioniranom shemom za stvarne modele vida kompatibilne s
OpenAI-jem. Mjeri tokene koje prijavljuje pružatelj usluge, ukupnu latenciju
(uključujući sastavljanje table), broj poziva modela i očuvanje činjenica
definiranih manifestom. Neobrađeni odgovori modela ne zapisuju se u izvješće;
zadržavaju se samo SHA-256 sažeci i ID-jevi podudarnih činjenica. Ispitni okvir
ne izvršava mrežni poziv ni poziv plaćenog modela osim ako se proslijedi
`--execute-real` te konfiguriraju `--model`, `OMNIROUTE_BASE_URL` i
`OMNIROUTE_API_KEY`. Bez takvog izričitog stvarnog izvođenja njegov strojno
čitljiv ishod ostaje `HOLD`; sama mjerenja sintetičkog sadržaja/broja poziva
nisu dokaz za promicanje.

Pozivatelji mogu podržanom dijelu videozapisa priložiti neobavezno polje
`transcript.cues` kada već posjeduju vremenski usklađen tekst. Svaka stavka
mora sadržavati `text`, konačan interval `start`/`end` unutar ispitane duljine
trajanja i `source` s popisa dopuštenih vrijednosti (`client`, `embedded` ili
`audio-bridge`); `confidence` prema zadanim je postavkama `1` i mora ostati
između `0` i `1`. Potpuno jednake stavke sažimaju se u jednu. OmniRoute nikada
ne pokreće transkripciju iz tih metapodataka: validirane stavke kopiraju se u
opisani rezultat zajedno s izvorom, pouzdanošću i intervalom te se prikazuju
kao nepouzdana opažanja uz opise kadrova. Nevaljan tekst, tekst izvan raspona
ili tekst bez podrijetla odbacuje se umjesto miješanja u tok opisa. Oba kanala
transkripta u tijelu zahtjeva normaliziraju dostavljeno podrijetlo na `client`,
uključujući samostalno navedene oznake `embedded` ili `audio-bridge`. Samo
adapter pod nadzorom poslužitelja može dodijeliti te pouzdane oznake putem
argumenta `trustedSource` dostupnog isključivo iz koda; JSON polje zahtjeva ne
može dosegnuti taj argument. Tekst transkripta ostaje nepouzdan sadržaj izveden
iz medija, bez obzira na njegovo podrijetlo, i nikada ne smije određivati
autorizaciju.

Napredni pozivatelj može navesti zapis `audioTranscript` za isti videozapis;
on se smatra tekstom koji je pružio klijent, a ne dokazom poslužiteljske transkripcije.
Spojni sloj izvršava vizualna i zvučna opažanja unutar
jednog roka i uz jedan signal za prekid, raspoređuje ih na zajedničkoj vremenskoj crti, sažima
potpuno jednake duplikate i prijavljuje djelomičan rezultat kada uspije samo jedna strana.
Nevažeći `audioTranscript` svodi se na taj djelomičan rezultat — vizualni
opis ostaje sačuvan, a zvučna grana bilježi sanitizirani kôd pogreške —
umjesto da cijeli videozapis ne uspije. Dostupnost svake grane, oznaka djelomičnog rezultata
i sanitizirani kodovi pogrešaka čuvaju se u opisanom rezultatu, u
metapodacima zaštitnih ograda (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), u metapodacima predmemorije rezultata i u brojačima
spajanja mosta. Zadani put Video Bridgea ne poziva pretvorbu govora u tekst
niti preuzima drugu kopiju medijskog sadržaja; bez tog izričito navedenog zapisa ostaje
ograničen samo na videozapis.

**Zadržavanje transkripta (#12150 P1).** Ovo se primjenjuje automatski kad god
Video Bridge (koji se sam mora izričito uključiti) prikaže stavku transkripta — ne postoji zasebna
oznaka za zadržavanje. Kada zahtjev prikaže bilo koju stavku transkripta (od pozivatelja deklariran
`transcript` ili spojeni `audioTranscript`), zaštitna ograda označava ga kao
`videoBridgeObserved` i stvara redigiranu kopiju opisa videozapisa —
identičan prikaz u kojem je tijelo slobodnog teksta svake stavke zamijenjeno s
`[redacted-video-transcript]`, izrađen zamjenom strukturiranog polja stavke
prije sastavljanja niza (nikada raščlanjivanjem izravnanog teksta, tako da nikakav sadržaj
stavke — zlonamjeran ili običan, uključujući tijela koja sadržavaju `]`, kao što su
`[inaudible]`/`[music]` — ne može ostati). Tijelo zahtjeva u trajno pohranjenom zapisniku poziva zamjenjuje
svaki tekstualni dio izveden iz videozapisa tom redigiranom kopijom, uparenom prema jednakosti
sadržaja; sidro `fullText` ponovno se čita iz dovršenog sadržaja zaštitne ograde prije poziva,
tako da uparivanje i dalje uspijeva nakon što naknadne ulančane zaštitne ograde (maskeri osobnih
podataka i vjerodajnica, prioriteti 10/95) izmijene tekst opisa na mjestu i
nakon što umetanje sistemskog upita, primopredaje ili memorije preoblikuje niz poruka. Tijelo
poslano modelu ostaje nepromijenjeno. Promatrani zahtjev također ne popunjava
nikakvu trajnu Memoriju (preskače se izdvajanje i iz zahtjeva i iz odgovora),
pa vlastiti odgovor modela ne može prenijeti tekst transkripta u Memoriju.

**Neobrađena polja videozapisa (#12430).** Kada je most omogućen, a izvorna podrška za videozapis nepoznata ili nije dostupna, definirana polja `transcript`/`audioTranscript` također aktiviraju `videoBridgeObserved`, čak i nakon neuspjelog opisivanja ili ograničenja `maxVideos`. `null` i prazni nizovi računaju se; odsutna polja i metapodaci koji se ne odnose na videozapis ne računaju se. Zadržane kopije redigiraju ta polja ili izostavljaju zahtjev, a predmemorije i Memorija se zaobilaze.

Na tim zamjenskim putovima valjane stavke pozivatelja postaju podržani dijelovi
`text`/`input_text`, umjesto nestandardnih polja pružatelja. Oba zapisa dostavljena
u zahtjevu ostaju nepouzdana opažanja `client`, uz izričito upozorenje da videozapis
nije opisan i da vremenske oznake nisu provjerene u odnosu na medijski sadržaj. Postojeća
ograničenja od 256 stavki/ukupno 64 KiB te ograničenja po stavci primjenjuju se na oba zapisa zajedno;
vremenske oznake moraju stati unutar posrednikova gornjeg ograničenja od 600 sekundi i bilo kojeg zadanog
vremenskog prozora fokusa. Nevažeći zapisi odbacuju se i ne prosljeđuju kao proizvoljan tekst; valjani
srodni zapis i dalje se može upotrijebiti osim ako je premašen njihov zajednički proračun. Nulta/prazna
polja ne dodaju tekst. Ovaj zamjenski put ne dodaje dohvaćanje medijskog sadržaja ni transkripciju.
Polja proširenja transkripta uklanjaju se iz zamjenskog nosača videozapisa i njegovih
objekata `video_url`/`source`. OpenAI-jev popis dopuštenih polja za prijenos ostaje strog; nosači videozapisa
s nepoznatom izvornom podrškom ostaju dostupni, a ciljevi za koje se zna da podržavaju samo tekst zadržavaju sigurne oznake.
Strukturirane redigirane kopije štite dodani tekst transkripta, dok
izvorni zahtjev u vlasništvu pozivatelja ostaje nepromijenjen. Ciljevi s izvornom podrškom i
onemogućeni mostovi zadržavaju postojeće ponašanje zaobilaženja.

Dodatne zadržane kopije koriste isti signal promatranog zahtjeva. Neobrađena
snimka klijentskog zahtjeva prije zaštitne ograde, zahtjev na čekanju u memoriji i zapisnik rano
odbijenog zahtjeva strukturno zamjenjuju polja transkripta u dijelovima videozapisa;
tekstualni upiti koje sintetiziraju faze obrade i kontekstna primopredaja redigiraju se
na odredištu tijela trajno pohranjenog zahtjeva. Trajno pohranjena oznaka `video_content_removed`
uzrokuje zatvoreno odbijanje nastavka `previous_response_id`, umjesto rekonstruiranja
teksta koji je namjerno odbačen. Ako promatrani zahtjev izgubi svoju
redigiranu kopiju pojedinog dijela prije zapisivanja ili ako se čak i samo jedna od više kopija videozapisa
ne uspije upariti nakon naknadnih izmjena zahtjeva, zadržano tijelo zahtjeva
potpuno se izostavlja umjesto zadržavanja djelomično redigiranog transkripta.

Za promatrani zahtjev odgovor modela mogao bi citirati bilo koji dio
transkripta bez strukturirane granice stavke. Njegov `responseBody` u trajno pohranjenom zapisniku poziva
stoga se zamjenjuje oznakom izostavljanja; detaljni artefakt obrade (koji može uključivati
tijela uzvodne komunikacije/klijenta i dijelove toka) ne zadržava se. Predmemorije semantike,
idempotentnosti i ponovne reprodukcije zaključivanja zaobilaze čitanja i pisanja za taj zahtjev.
Zahtjev pružatelju i odgovor vidljiv klijentu ostaju nepromijenjeni. Rani bajtovi za održavanje veze
uklanjaju se iz privremenog međuspremnika kada se detaljni artefakt izostavi. Kirovo upozorenje o
neispravnom EventStreamu prijavljuje samo broj bajtova korisnog sadržaja, nikada njegov sadržaj ni neobrađenu
pogrešku JSON parsera.
Time se ne tvrdi da je provjerena svaka nepovezana dijagnostika pružatelja/dodatka;
šira provjera odredišta zadržanih podataka prati se u #11658.

Interni životni ciklus `/api/modality-bridge/video/drilldown` zasebna je,
povratnom petljom povezana i tokenom autentificirana podloga predmemorije. Svaka operacija također zahtijeva
kanonski neprozirni ID principala. Prije omogućavanja produkcijskog pozivatelja, on mora
izvesti taj ID iz autentificiranog zakupnika i nikada ne smije proslijediti
vrijednost koju je odabrao klijent. Ključevi predmemorije povezuju taj principal s kanonskim ID-ovima sesije i
videoreference, pohranjuju samo njihove ključeve izvedene algoritmom SHA-256 te ograničavaju i čitanja
i brisanje na isti principal. Predmemorija po unosu pohranjuje najviše 16 izvedenih JPEG
kadrova, uklanja ih nakon deset minuta te podržava ograničena
čitanja `start`/`end` ili izričito brisanje sesije.

Svaki principal ograničen je na 16 unosa i 64 MiB kanonskih JPEG podataka. Ta su
ograničenja neovisna o globalnoj gornjoj granici od 64 unosa/256 MiB: pritisak kvote
principala uklanja samo najdulje nekorištene unose tog principala prije razmatranja
globalnog uklanjanja prema LRU-u. Istekli unosi uklanjaju se iz obračuna principala i
globalnog obračuna tijekom aktivnosti predmemorije, dok otkazivanje i neuspjeh provjere valjanosti
ne pohranjuju djelomičnu zamjenu.

Predmemorija odbija nekanonski Base64, prekomjerno dopunjavanje, medije koji nisu JPEG, neispravne ili
skraćene JPEG-ove te JPEG-ove koji proizvode upozorenje tijekom ograničenog dekodiranja cijele slike pomoću `sharp`.
Svaku prihvaćenu sliku ponovno kodira kao kanonski JPEG, određuje širinu i visinu
iz dekodiranih bajtova umjesto da vjeruje poljima pozivatelja te odbacuje sve naknadne
poliglotske bajtove umjesto da ih zadržava. Samo se ograničeni kanonski komprimirani međuspremnik
uračunava u obje kvote. Ograničenje JSON prijenosa uključuje dodatni trošak Base64 kodiranja za gornju granicu
od 32 MiB dekodiranog ulaza. Svako
pohranjeno izvođenje bilježi svoj provjereni JPEG format/razlučivost, pravila uzorkovanja,
verziju izvođenja, vrijeme izrade, poslužiteljski izračunat sažetak sadržaja i sažetu nadređenu
referencu zajedno sa sažetkom sadržaja nadređenog elementa pouzdanog pozivatelja. Otkazivanje se provjerava
između asinkronih faza dekodiranja/izračuna sažetka prije atomskog spremanja u predmemoriju.

Ova etapa još ne povezuje produkcijskog proizvođača s rutom i ne
pruža odabir varijante više razlučivosti. Transparentni put zahtjeva Video Bridgea
stoga ne uvodi dodatnu obradu, dok izvođenje principala vezano uz zakupnika i
potpuni FU-08 životni ciklus više razlučivosti ostaju izričiti naknadni zadaci
umjesto da budu dokumentirani kao dovršeno ponašanje.

Kadrovi se redom opisuju konfiguriranim Video modelom. Prazno
Video nadjačavanje nasljeđuje postavku Vision; ako su obje postavke prazne, Vision
automatski usmjerivač odabire efektivni model s podrškom za vid. Uspješni opisi
zamjenjuju izvorni dio stabilnim prefiksom `[Video description:` koji također
označava tekst kao nepouzdano opažanje izvedeno iz medija i upućuje nizvodne
modele da ne slijede upute pronađene u mediju. Ključevi predmemorije opisa kadrova
uključuju JPEG bajtove, upit, vremensku oznaku i efektivni model; u predmemoriju se spremaju samo uspješni
opisi. Unosi predmemorije zadržavaju stvarni uspješni model proizvođača,
uključujući pričuvni model; most prijavljuje `mixed` kada su različite kadrove
proizveli različiti modeli. Pogodak predmemorije ponovno upotrebljava identitet tog proizvođača
umjesto da ga ponovno označi kao zatraženi plan usmjeravanja. Predmemorija rezultata
cijelog videozapisa indeksirana je prema svakom ulazu koji mijenja izlaz — upitu, efektivnom
modelu, pravilima uzorkovanja, broju kadrova, načinu semantičke analize, SHA-256
otisku normaliziranog savjeta za fokus, prozoru fokusa, `transcript`,
`audioTranscript` i zastavici kontaktne tablice — pa promjena bilo koje od tih
dimenzija uzrokuje promašaj predmemorije, a nikada ponovnu upotrebu zastarjelog rezultata. Verzija
pravila vizualnog uklanjanja duplikata, prag i ograničeni broj kadrova kandidata također su izričito navedeni u
ključu i metapodacima predmemorije rezultata; promjena pravila stoga ne može ponovno upotrijebiti zastarjeli
opis cijelog videozapisa. Metapodaci v4 predmemorije rezultata zadržavaju način rada i
otisak, ali nikada sirovi korisnički zadatak. Metapodaci zaštitnih mehanizama navode i
zatraženi i efektivni način analize; zatraženi način `focused` bez
upotrebljivog korisničkog teksta prijavljuje se kao efektivno `full`.

Zaštitni mehanizam izdvaja svaki podržani videodio, ali ne opisuje više od
`modalityBridgeVideoMaxVideos`. Za cilj za koji je dokazano da ima
`supportsVideo === false`, neuspjeli videozapisi i videozapisi iznad ograničenja pretvaraju se u izričite sigurne
tekstualne oznake kako nijedan sirovi videozapis ne bi preživio. Kada je sposobnost nepoznata, ti dijelovi
zadržavaju svoj videonositelj; svaki pričuvni transkript slijedi prethodno navedenu ograničenu tekstualnu
pretvorbu. Ciljevi s `supportsVideo === true` zaobilaze most.
Signal za prekid klijentskog zahtjeva širi se kroz preuzimanje, brokerski red čekanja,
potprocese i pozive za izradu opisa; prekidi zaustavljaju obradu između videozapisa i nikada ne dopuštaju
otvoreni prolaz sirovih medija.

Postavke izvođenja pohranjene su u bazi podataka i provjerene pomoću Zoda:

| Ključ                               | Zadano      | Raspon / ponašanje                                                                                      |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Neobavezno izvršno okruženje, uključuje se po želji                                                     |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` zadržava generičke opise; `focused` koristi ograničeni, nepouzdani kontekst najnovijeg korisnika |
| `modalityBridgeVideoModel`          | `""`        | Nasljeđuje model Vision Bridgea                                                                         |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                    |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ili proporcionalni `segment_aware`; neuspjeh detektora vraća se na `uniform`   |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                     |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                          |

Naslijeđene trajno pohranjene vrijednosti vremenskog ograničenja za Video veće od 120 sekundi ograničavaju se na
rok posrednika; novi pokušaji zapisivanja postavki iznad tog ograničenja odbijaju se.
`GET /api/modality-bridge/video/runtime` prije autentifikacije ili ispitivanja izvršnog okruženja zahtijeva
pouzdanu, označenu lokalnost povratne petlje, a zatim zahtijeva upravljačku
autentifikaciju. Vraća samo `available`, pročišćene verzije FFmpega/ffprobea i fiksni
razlog kada izvršno okruženje nije dostupno. Interna krajnja točka za izdvajanje nije
javni API za prijenos: zasićenje reda vraća `503` uz `Retry-After`, prekid veze
pozivatelja vraća `499`, a fiksni rok posrednika vraća `504`. Pretvoreni odgovori dodaju
`video->text;model=<visionModel>;parts=<videos>` u središnje zaglavlje
`x-omniroute-modality-bridge` bez uklanjanja segmenata Vision ili Audio.

### Maskiranje osobnih podataka (`piiMasker.ts`)

Izvodi se u **obje** faze.

- **`preCall`** klonira korisni sadržaj, prolazi kroz `system`, `messages`, `input` i
  `prompt` (uključujući stavke koje su obični nizovi znakova) te primjenjuje `processPII()` (iz
  `@/shared/utils/inputSanitizer`) na polja `content`/`text` koja sadrže nizove znakova. Kada je
  `PII_REDACTION_ENABLED=true`, otkriveni osobni podaci redigiraju se u odlaznom
  korisnom sadržaju. To je neovisno o `INPUT_SANITIZER_MODE` (koji upravlja samo
  pravilima za umetanje naredbi). Kada je redigiranje isključeno, poziv bilježi broj
  otkrivanja bez izmjene sadržaja.
- **`postCall`** dubinski klonira odgovor, pokreće `sanitizePIIResponse()` i
  maskiranje oblika Responses API-ja (`maskResponsesOutput` — obuhvaća
  `output_text` i `output[].content[].text`). Ako dođe do bilo kakvog redigiranja,
  izmijenjeni odgovor zamjenjuje izvorni.

Zaštitna mjera nikada ne blokira; samo dodaje bilješke (`meta.detections`,
`meta.redacted`) ili prepisuje sadržaj.

#### Odabir prema vrsti, prilagođeni uzorci i brojači otkrivanja

**Nadzorna ploča → Postavke → Sigurnost → Maskiranje osobnih podataka** određuje _što_ se maskira. Time se
maskiranje ne uključuje: za to su i dalje zaduženi `PII_REDACTION_ENABLED` (zahtjev) i
`PII_RESPONSE_SANITIZATION` (odgovor + SSE), a oba su prema zadanim postavkama isključena.

- **Odabir prema vrsti** — ugrađeni identifikatori navedeni su u
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nepostavljena vrijednost znači sve
  vrste (ponašanje prije uvođenja ove postavke). Uzorak mehanizma zahtjeva
  `ssn_us` preslikava se na `ssn`. Predlošci (Minimalni, Standardni, Financijski,
  Brazilski, SAD, Potpuni) samo popunjavaju potvrdne okvire u korisničkom sučelju.
- **Prilagođeni uzorci** — do 20 regularnih izraza ili uzoraka sa zamjenskim znakovima (`*` = do 64
  znaka koji nisu razmaci, `?` = jedan znak). Podudaranja postaju `[CUSTOM_REDACTED]`.
  Svaki uzorak prolazi kroz `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): najviše 500 znakova, zastavice su ograničene
  na `g i m s u`, mora se moći kompilirati, mora proći `safe-regex` (katastrofalno
  vraćanje unatrag) i ne smije se podudarati s praznim nizom znakova ili rezerviranim mjestom za redigiranje.
  Uzorak koji ne zadovolji uvjete odbija se pri spremanju i testiranju, a pohranjeni redak
  koji ih ne zadovolji preskače se tijekom izvođenja umjesto da se kompilira. Prilagođeni uzorci izvršavaju se samo
  dok je maskiranje uključeno.
- **Brojači otkrivanja** — broj po vrsti (nikada podudarne vrijednosti), čuva se u
  memoriji i poništava pri ponovnom pokretanju (`src/lib/pii/piiDetectionStats.ts`). Povećava se samo
  dok je maskiranje uključeno.

Postavke se nalaze u tablici `key_value` (imenski prostor `pii_settings`,
`src/lib/db/piiSettings.ts`) i čitaju se kroz predmemoriju od 1 s. API:

| Metoda | Putanja                  | Svrha                                                                             |
| ------ | ------------------------ | --------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stanje zastavice, `enabledTypes`, `customPatterns`, brojači otkrivanja            |
| `PUT`  | `/api/settings/pii`      | Zamjena `enabledTypes` (`null` = sve) i/ili `customPatterns`                      |
| `POST` | `/api/settings/pii/test` | Probno pokretanje jednog uzorka na uzorku do najviše 8 KB; ništa se ne pohranjuje |

Sve tri krajnje točke zahtijevaju upravljačku autentifikaciju i provjeravaju tijelo pomoću Zoda
(`src/shared/validation/schemas/piiSettings.ts`).

### Umetanje naredbi (`promptInjection.ts`)

Otkriva napadačke strukture u sadržaju koji je dostavio korisnik i provodi
konfigurirana pravila. Ponašanje je određeno varijablama okruženja i opcijama
konstruktora:

| Postavka        | Varijabla okruženja                                                                                   | Zadano | Učinak                                                                                                                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Omogućeno       | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | Kada je `false`, zaštitni mehanizam odmah prekida obradu.                                                                                                                                                             |
| Način rada      | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | Pravilo za injekcije: `block`, `warn` ili `log`. (`redact` se prihvaća radi kompatibilnosti unatrag, ali **ne** uklanja tekst injekcije; prepisivanjem osobnih podataka u zahtjevu upravlja `PII_REDACTION_ENABLED`.) |
| Prag blokiranja | opcija `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Minimalna razina ozbiljnosti potrebna za blokiranje. Uz zadane postavke, srednja razina služi samo za praćenje.                                                                                                       |

**Redoslijed prioriteta načina rada** (`getMode`): `options.mode` pozivatelja →
`INJECTION_GUARD_MODE` **nadjačavanje zastavicom značajke iz baze podataka** (Nadzorna ploča → Postavke →
Zastavice značajki) → varijabla okruženja `INJECTION_GUARD_MODE` → varijabla okruženja `INPUT_SANITIZER_MODE` →
`warn`. Nadjačavanje putem nadzorne ploče stoga ima prednost pred varijablama
okruženja, pa korisničko sučelje Zastavice značajki upravlja aktivnim zaštitnim
mehanizmom u stvarnom vremenu (bez ponovnog pokretanja). Čitanje iz baze podataka
sigurno je u slučaju pogreške: ako dođe do pogreške, zaštitni mehanizam vraća se
na ponašanje temeljeno na varijablama okruženja, a kada nadjačavanje nije
postavljeno, ponašanje je identično određivanju samo putem varijabli okruženja.

Izvori detekcije:

1. `sanitizeRequest()` iz `@/shared/utils/inputSanitizer` (zajednički skup
   detektora koji se koristi drugdje u cjevovodu).
2. Ugrađeni `DEFAULT_GUARD_PATTERNS` (trenutačno `system_override_inline` i
   `markdown_system_block`, oba s razinom ozbiljnosti `high`).
3. Neobavezni `customPatterns` proslijeđeni putem opcija konstruktora (nizovi znakova, regularni izrazi
   ili zapisi `{ name, pattern, severity }`).

Kada je `mode === "block"` **i** barem jedna detekcija zadovoljava prag
ozbiljnosti, `preCall` vraća `{ block: true, message: "Request rejected:
suspicious content detected" }`. U načinima rada `warn`/`log` zaštitni mehanizam
bilježi događaj, ali dopušta poziv. Zajednički pomoćnik `evaluatePromptInjection()`
također se izvozi za pozivatelje koji trebaju procijeniti upite bez prolaska kroz
registar.

**Ograničenje skeniranja (v3.8.20):** detektor provjerava samo **prvih 16 KB**
spojenog teksta upita — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajta) u
`src/shared/utils/inputSanitizer.ts`. I `detectInjection()` i
`evaluatePromptInjection()` primjenjuju `slice(0, MAX_INJECTION_SCAN_BYTES)` prije pokretanja
petlje uzoraka. Direktive za injekcije nalaze se pri vrhu ulaznih podataka, pa se
time ograničava opterećenje CPU-a/GC-a uzrokovano regularnim izrazima na korisnim
sadržajima veličine nekoliko stotina KB bez slabljenja detekcije (usp.
#3932, #4041).

### Maskiranje vjerodajnica (`credentialMasker.ts`)

Izvršava se u **obje** faze, posljednje u zadanom lancu (prioritet `95`). Redigira
poznate uzorke API ključeva / tajnih tokena iz izlaznog korisnog sadržaja (sadržaj
poruke, argumenti poziva alata, rezultati alata) **i** odgovora pružatelja, tako
da vjerodajnica zalijepljena u upit (ili vraćena u rezultatu alata) ne procuri
prema vanjskom pružatelju ni natrag klijentu.

- **Samo uz izričito uključivanje**, prema istoj konvenciji kao redigiranje osobnih podataka (povezano sa strogim pravilom #20):
  onemogućeno je osim ako je `settings.credentialRedactionEnabled === true` **ili**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kada je isključeno, zaštitni mehanizam ne
  poduzima ništa — nikada ne blokira niti prepisuje.
- `redactCredentials()` prolazi kroz cijelo stablo korisnog sadržaja/odgovora (`walkValue()`,
  sigurno od onečišćenja prototipa i sigurno za cikluse putem `WeakSet`) te podudaranja
  zamjenjuje rezerviranim mjestom `[REDACTED:<type>]`, klonirajući samo grane koje
  su doista promijenjene.
- `CREDENTIAL_PATTERNS` obuhvaća ključeve pružatelja LLM-a (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokene (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), ključeve za plaćanje (Stripe, Square), ključeve
  za usluge u oblaku (AWS pristupni ključ, Twilio, SendGrid, Mailgun), privatne ključeve / JWT-ove,
  nizove za povezivanje koji sadrže vjerodajnice (`mongodb://user:pass@...` itd.) i
  generički uzorak vrijednosti zaglavlja `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Ključevi u obliku zaglavlja (`authorization`, `x-api-key`, `api-key`,
  `apikey`) redigiraju se strukturno (samo vrijednost, dok se prefiks sheme poput
  `Bearer `/`Basic ` zadržava), a ne putem generičkog tekstnog regularnog izraza.
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
  modifiedPayload?: TValue; // vraća preCall za prepisivanje zahtjeva
  modifiedResponse?: TValue; // vraća postCall za prepisivanje odgovora
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

Zaštitna ograda signalizira "bez promjene" vraćanjem `void`, `{}`, ili
`{ block: false }`. Vraćanje `modifiedPayload`/`modifiedResponse` zamjenjuje
vrijednost koja prolazi kroz lanac za nizvodne zaštitne ograde.
`signal?: AbortSignal` prenosi životni ciklus pozivatelja u zaštitne ograde. Prekid zahtjeva je namjerna iznimka otvorenog kvara: medijski mostovi zaustavljaju rad i čišćenje bez vraćanja sirovih medija na cilj za koji se zna da ih ne podržava.

## Registar (`registry.ts`)

Singleton `guardrailRegistry` izlaže:

- `register(guardrail)` — dodaje (ili zamjenjuje normaliziranim imenom) zaštitnu ogradu i
  ponovno sortira po uzlaznom `priority`.
- `clear()` / `list()` — administrativni pomoćnici.
- `runPreCallHooks(payload, context)` — iterira aktivne zaštitne ograde, provlači
  payload kroz `modifiedPayload` i zaustavlja se na prvom `block: true`.
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
- Tijelo zahtjeva `disabledGuardrails` (najviša razina)
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

1. `resolveDisabledGuardrails(...)` gradi popis za preskakanje iz API ključa, tijela
   i zaglavlja.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` pokreće zaštitne ograde uzlaznim
   redoslijedom prioriteta:
   - Onemogućene zaštitne ograde bilježe se kao `skipped`.
   - `preCall` svake zaštitne ograde može prepisati teret putem `modifiedPayload`.
   - Prvi `block: true` kratko spaja lanac i rukovatelj vraća
     odgovor o odbijanju zaštitne ograde.
3. (Potencijalno prepisan) teret teče u kombinirano usmjeravanje i uzvodnu
   dispečersku službu.
4. Nakon što je odgovor sastavljen, `guardrailRegistry.runPostCallHooks(...)`
   pokreće isti lanac na odgovoru. `block: true` ovdje odbacuje uzvodni
   odgovor.

Zaštitne ograde koje bacaju iznimku bilježe se s `error: <message>` i bilježe putem
`logger.warn`, ali lanac se nastavlja — dizajnirano je da se otvara u slučaju kvara.

## Konfiguracija

Varijable okoline koje čitaju ugrađene zaštitne ograde:

| Varijabla                             | Koristi se od strane    | Učinak                                                                                                                           |
| :------------------------------------ | :---------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`      | Postavite `false` da biste u potpunosti onemogućili detekciju.                                                                   |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`      | Politika ubrizgavanja: `warn`, `block` ili `log`. Zastarjela vrijednost `redact` ne prepisuje tekst ubrizgavanja.                |
| `INJECTION_GUARD_MODE`                | `prompt-injection`      | Način rada za zaštitu od ubrizgavanja; također zastavica značajke baze podataka koja **nadjačava** varijable okoline (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`      | Minimalna ozbiljnost koju `MODE=block` odbija: `high` (zadano), `medium` ili `low`.                                              |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`      | Zastarjeli alias za `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                           |
| `PII_REDACTION_ENABLED`               | `pii-masker`            | Kada je `true`, PII zahtjeva se redigira (neovisno o načinu ubrizgavanja).                                                       |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nizvodno) | Kontrolira ponašanje maskera na strani odgovora.                                                                                 |

Zaštitne ograde Modality Bridgea čitaju konfiguraciju vremena izvođenja iz pohrane postavki podržane bazom podataka
(`getSettings()`), a ne iz varijabli okoline. Primarni ključevi za Vision su
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` i
`modalityBridgeCacheMaxEntries`. Zastarjeli
`visionBridge*` ključevi prihvaćaju se samo kao dokumentirani jednociklični
povratni mehanizam čitanja; pisanja na nadzornoj ploči koriste primarne ključeve. Zadane vrijednosti i povratni
mehanizam rješavanja nalaze se u `src/shared/constants/modalityBridgeDefaults.ts`, s
zastarjelim konstantama zadržanim u `src/shared/constants/visionBridgeDefaults.ts`.

Audio koristi `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` i `modalityBridgeAudioMaxClips`, plus zajedničke
`modalityBridgeCache*` postavke. Audio nema povratni mehanizam za zastarjele ključeve jer su ti
ključevi uvedeni sa shemom Modality Bridgea.

Video koristi `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` i
`modalityBridgeVideoTimeout`, plus zajedničke `modalityBridgeCache*` postavke.
Onemogućen je prema zadanim postavkama jer su FFmpeg/ffprobe opcionalne operativne
ovisnosti, a titlovanje okvira dodaje kašnjenje i troškove modela.

## Prilagođene zaštitne ograde

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Dnevni budžet prekoračen" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Koraci:

1. Stvorite `src/lib/guardrails/myGuardrail.ts` proširujući `BaseGuardrail`.
2. Implementirajte `preCall` i/ili `postCall`.
3. Registrirajte se prilikom uvoza (push iz `registerDefaultGuardrails`) ili
   pozovite `guardrailRegistry.register(...)` tijekom izvođenja — registar zamjenjuje
   bilo koju prethodnu zaštitnu ogradu s istim normaliziranim imenom.
4. Dodajte testove pod `tests/unit/` (postojeći primjeri:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testiranje

Koristite `resetGuardrailsForTests()` između testova za početak iz poznatog stanja.
Proslijedite `{ registerDefaults: false }` za početak s praznim registrom i
registrirajte samo zaštitne ograde koje se testiraju. Vision Bridge prihvaća ubrizgavanje ovisnosti
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge izlaže ekvivalentne šavove za postavke, mogućnosti, odabir STT modela, provjere vjerodajnica i transkripciju. Testovi stoga mogu vježbati oba toka bez pristupa bazi podataka ili mreži.

## Vidi također

- `src/lib/guardrails/` — implementacija
- `src/shared/utils/inputSanitizer.ts` — zajednički detektor koji pokreće
  ubrizgavanje upita i maskiranje PII
- `src/shared/constants/visionBridgeDefaults.ts` — zadane postavke Vision Bridgea i
  popis modela prisilnog premošćivanja
- `src/shared/constants/modalityBridgeDefaults.ts` — zajedničke zadane postavke Vision/Audio runtimea
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalni sloj (prekidač, hlađenja)
- `docs/reference/ENVIRONMENT.md` — potpuna referenca varijabli okoline

## Pokrivenost rute zaštite od ubrizgavanja i crveni tim (Faza 8 · Blok D)

Zaštita od ubrizgavanja (`createInjectionGuard` / `withInjectionGuard`) pokriva sve rute
koje prihvaćaju korisničke upite. Poštuje `INJECTION_GUARD_MODE` (zadano `warn` = samo zapisivanje;
`block` = vraća HTTP 400 `SECURITY_001`).

| Vrsta             | Rute                                                                                                                                                 | Zadani način rada |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Tekst (postojeći) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn              |
| Generativni       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn              |
| Podaci            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn              |

Ekstrakcija teksta (`extractMessageContents`) pokriva `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Crveni tim (noćni, `nightly-llm-security.yml`):** promptfoo provjerava da svaka ruta blokira
OWASP-LLM korpus u `INJECTION_GUARD_MODE=block`; garak pokreće sonde (preskače bez tajne).
`moderations` je uključen radi dosljednosti — operatori u blok-načinu mogu ga izuzeti putem
`resolveDisabledGuardrails`.

Noćni tijek rada (`.github/workflows/nightly-llm-security.yml`, cron + ručno
pokretanje) ima dva posla:

- **`promptfoo-guard` (blokiranje)** — pokreće `promptfoo eval -c promptfooconfig.yaml`
  s `INJECTION_GUARD_MODE=block`. Svaki adversarijalni slučaj (npr. "zanemari sve
  prethodne upute…", jailbreakovi u DAN stilu) potvrđuje da odgovor nosi
  `error.code === "SECURITY_001"`, tj. da je zaštita stvarno odbila zahtjev.
- **`garak` (savjetodavno)** — pokreće garak `--probes promptinject,dan,leakreplay`
  protiv lokalne OmniRoute instance (`http://localhost:20128/v1`). Ograničeno tajnom
  davatelja (`PROMPTFOO_PROVIDER_KEY`); graciozno preskače i ima sufiks
  `|| true`, tako da izvještava bez neuspjeha CI-ja.

Pokrivenost pomoćne funkcije zaštite (`createInjectionGuard` / `withInjectionGuard`)
obuhvaća svaku `/v1` rutu koja nosi upit; tekst upita se izvlači iz
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` pomoću
`extractMessageContents()` u `src/shared/utils/inputSanitizer.ts`.
