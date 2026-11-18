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

## Ugrađene zaštitne mjere

Registar automatski učitava šest zaštitnih mjera po redoslijedu prioriteta prilikom uvoza
(pogledajte `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Naziv               | Faza(e)        | Datoteka              |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Zaštitne mjere s manjim brojevima prioriteta izvršavaju se **prve**.

### Most za vid (`visionBridge.ts`) — PR-1 mosta modaliteta

Osnovni model GLM 5.3 i modeli `glm-5.3-{low,high,max}` imaju eksplicitne
metapodatke registra/specifikacije `supportsVision:false`. Varijante GLM 5.3 Flash
ostaju izvorni modeli s podrškom za vid. Claude Code ruta `/v1/messages` ulazi u
zajednički lanac zaštitnih mjera za prethodni poziv `handleChat` **prije** prevođenja
iz Claude formata u OpenAI format; slike iz rezultata ugniježđenog alata `Read` moraju
biti opisane ili obrađene prije nego što ih to prevođenje pretvori u OpenAI sadržaj
`image_url` (#17069).

Presreće zahtjeve koji sadrže slike, a namijenjeni su modelima **bez podrške za vid**,
te cijeli zahtjev ili preusmjerava na model s podrškom za vid ili zamjenjuje dijelove sa
slikama tekstualnim opisima koje proizvodi konfigurabilni model za vid prije poziva
uzvodnoj usluzi. Time pružaoci usluga koji podržavaju samo tekst mogu transparentno
obrađivati multimodalne sadržaje.

Tok:

1. Preskoči ako ciljni model već podržava vid (osim ako se nalazi na listi prisilnog
   premošćavanja `isVisionBridgeForcedModel`).
2. Izdvoji dijelove sa slikama pomoću `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), koji delegira **objedinjenom detektoru medija**
   `detectMediaParts()` u `open-sse/utils/mediaParts.ts` — jedinstvenom izvoru istine
   koji se dijeli s kombinovanim filterom kompatibilnosti.
   Izdvajanje je ograničeno na oblike koje `replaceImageParts` može ponovo umetnuti
   (ugovor između izdvajanja i zamjene): OpenAI `image_url`, Anthropic base64
   `source.type:"base64"`, Anthropic URL `source.type:"url"` i Responses API
   `input_image`. Podudarajuće slike ugniježđene unutar
   `tool_result.content` Claude Code-a i izlaza alata Responses također se izdvajaju i
   zamjenjuju na svojim izvornim putanjama; oblici koji služe samo kao indikatori
   pripadaju materijalu za kombinovani filter i ne izdvajaju se.
   Preskoči ako nijedna nije pronađena.
3. Razriješi konfiguraciju izvršavanja pomoću `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): novi ključevi postavki
   `modalityBridge*` imaju prednost; naslijeđeni ključevi `visionBridge*` ostaju
   **jednociklični rezervni mehanizam** (period za vraćanje). Preskoči prije bilo
   kakvog prolaska kroz medije ako je most onemogućen.
4. Birač režima (`modalityBridgeVisionMode`, pogledajte tabelu u nastavku) odlučuje
   između preusmjeravanja i opisivanja. Preusmjeravanje vraća `modifiedPayload` samo
   sa zamijenjenim `model`, uz metapodatke `{ rerouted, fromModel, toModel, imagesKept }`.
5. Putanja opisivanja: ograniči broj slika na `maxImages`, sastavi upit prilagođen
   zadatku, provjeri keš opisa, pozovi model za vid **paralelno**
   (`Promise.allSettled`) i umetni tekstualne dijelove `[Image N]: <description>` na
   njihova mjesta. Neuspješno opisivanje daje `null`: izvorna slika se zadržava za
   nepoznate/ciljeve s podrškom za vid (#4012), ali **potvrđeni tekstualni direktni
   cilj** ili kombinacija bez podrške za vid dobija eksplicitnu tekstualnu zamjenu
   `(unavailable — no vision-capable provider connected)` za svaku neopisanu sliku,
   uključujući djelimične neuspjehe i slike izvan ograničenja broja poziva za
   opisivanje (#17069). Postojeća rezervna putanja za opisivanje kombinacije u kojoj
   su svi pokušaji neuspješni ostaje na snazi (#8430).
6. Vrati `modifiedPayload` i metapodatke (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Birač režima (`modalityBridgeVisionMode`)

| Režim      | Zadano | Ponašanje                                                                                                                                                                                                                                                                                                          |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auto`     | ✔      | Naslijeđeni heuristički pristup, nepromijenjen (#6640/#7204): modeli koji nisu kombinovani/`auto/` preusmjeravaju se na najbolji model za vid, osim ako izvorni model već ima upotrebljive vjerodajnice (tada se vrši opisivanje); kombinovani ciljevi uvijek se opisuju.                                          |
| `describe` |        | Uvijek opisuj — blok za preusmjeravanje se u potpunosti preskače; korisnikov odabrani model uvijek daje odgovor.                                                                                                                                                                                                   |
| `reroute`  |        | Prisilno preusmjeravanje: provjera modela s vjerodajnicama se zaobilazi. Provjera vjerodajnica cilja preusmjeravanja i dalje se primjenjuje — kada ne postoji upotrebljiv cilj s podrškom za vid, most blokira rad jasnom greškom umjesto da opisuje slike ili šalje izvorne slike cilju koji podržava samo tekst. |

Prisilni režimi prekidaju obradu **prije** pokretanja automatske heuristike; ponašanje
režima `auto` identično je po bajtovima ponašanju zaštitne mjere prije PR-1.

#### Opseg API ključa (`visionBridgeKeyScope.ts`)

Kada API ključ pozivaoca ograničava `allowedConnections`, bazene kvota
(`allowedQuotas`) ili modele (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), most bira samo
modele za preusmjeravanje i opis koje ključ smije koristiti, na konekcijama
koje ključ smije koristiti. Poziv za opis zatim uvijek prolazi kroz OmniRoute
samopetlju sa zaglavljem `x-omniroute-self-loop-key-id`, tako da primljeni chat
zahtjev ponovo provjerava pravila konekcije i modela tog ključa.
`enforceApiKeyPolicy()` uvažava to zaglavlje samo zajedno sa bearerom
samopetlje, tako da može samo suziti pristup, a ID koji se ne može razriješiti
biva odbijen.

Ako nijedan vision model nije dozvoljen za ključ, **potvrđeni tekstualni cilj**
lokalno odbija zahtjev za slikom jasnim HTTP 400 odgovorom umjesto prosljeđivanja
bajtova slike nesposobnom upstreamu (#17069). Za ciljeve s nepoznatom ili
nativnom vision sposobnošću, putanja opisa zadržava prethodno ponašanje
dozvoljenog neuspjeha (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Zahtjevi bez ključa i ključevi bez ovih ograničenja ponašaju se potpuno isto kao
ranije.

#### Opisni prompt prilagođen zadatku (`modalityBridgeVisionTaskAware`)

Podrazumijevano **`true`**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
dodaje tekst **posljednje korisničke poruke** (skraćen na 500 znakova) osnovnom
promptu za opis, usmjeravajući opis prema onome što je korisnik stvarno tražio
(uzorak codex-vision-proxy) i tražeći od vision modela da transkribuje vidljivi
tekst. Kada je zastavica isključena — ili nema korisničkog teksta — koristi se
osnovni prompt bez izmjena.

Vlastiti OpenAI-kompatibilni zahtjev opisne samopetlje
(`callVisionModelSingle()` u `visionBridgeHelpers.ts`) uvijek zahtijeva
`image_url.detail: "high"` — bezuslovno, za svakog pozivaoca/provajdera, bez
obzira na bilo kakav signal klijenta. Uzorkovanje s niskim nivoom detalja
smanjuje preciznost OCR-a upravo za zadatak transkripcije teksta koji ovaj
prompt zahtijeva, pa sam poziv za opis uvijek zahtijeva visok nivo detalja,
bez obzira na to koji je nivo detalja koristio izvorni dolazni zahtjev. Ovo
utiče samo na tijelo internog zahtjeva za opis; ne mijenja način na koji
OmniRoute prosljeđuje vlastiti `image_url.detail` pozivaoca u primarnom
zahtjevu — ta se podrazumijevana vrijednost primjenjuje zasebno i samo za
detektovane OpenCode klijente, u `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`). Grana opisne samopetlje u
Anthropic žičanom formatu nema polje `detail` i na nju ne utiče nijedna od
ovih podrazumijevanih vrijednosti.

#### Ograničenje izlaza opisa (`modalityBridgeVisionMaxChars`)

| Ključ                          | Podrazumijevano | Raspon            |
| ------------------------------ | --------------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`             | `0` ili 100–50000 |

`0` (podrazumijevana vrijednost) znači **bez ograničenja** — opis koji vrati
`callVisionModel()` prosljeđuje se bez izmjena, čime se zadržava postojeće
ponašanje. Svaka vrijednost u rasponu 100–50000 skraćuje opis sufiksom `…`
prije nego što se ponovo umetne kao `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` u `src/lib/guardrails/visionBridge.ts`).
Povećajte ovu vrijednost za OCR zadatke s mnogo detalja, kada je downstream
modelu potrebna potpuna transkripcija; smanjite je da biste ograničili
potrošnju tokena kod razgovorljivih vision modela. Polje nadzorne ploče nalazi
se na kartici Vision, u panelu Advanced
(`modality-bridge-max-chars` u `ModalityBridgeVisionTab.tsx`), i svaku
vrijednost između 1 i 99 podiže na donju granicu 100, dok eksplicitnu vrijednost
`0` ostavlja nepromijenjenom — `0` je zasebno važeća Zod vrijednost
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), a ne samo
podrazumijevana vrijednost „nije postavljeno“.

#### Keš opisa (`modalityBridge/bridgeCache.ts`)

Keš u memoriji tipa LRU + TTL za izlaze opisa, dijeljen na nivou cijelog
procesa. Ključ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` uz
uokvirivanje s prefiksom dužine (bez kolizija na granicama polja). Komponenta
modela je **konfigurisani** bridge model, a ne model koji je stvarno odgovorio —
`callVisionModel` interno može koristiti zamjenski model, a ključevi po svakom
pokušaju bi fragmentirali keš. Neuspješni opisi se nikada ne keširaju.
Postavke:

| Ključ                           | Podrazumijevano | Raspon  |
| ------------------------------- | --------------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`          | —       |
| `modalityBridgeCacheTtlMinutes` | `60`            | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`           | 10–5000 |

#### Normalizacija udaljenih slika (dohvatanje za opis putem samopetlje/base64)

Kada most sam dohvati **udaljenu** sliku — Anthropic poziv za opis i konverzija
u base64 za claude žičani format
(`ensureBase64ImagesForClaudeWire`), oba putem
`fetchRemoteImageAsDataUri()` u `visionBridgeHelpers.ts` — rezultirajući data
URI prosljeđuje se kroz `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) prije nego što se ugradi u zahtjev
vision modela. Prevelike slike smanjuju se na **2048 px duže ivice** (što
odgovara ograničenju za promjenu veličine koje OpenAI/Anthropic već primjenjuju
na serverskoj strani), čime se smanjuju bajtovi/latencija prenosa bez promjene
onoga što vision model vidi. Za promjenu veličine koristi se `sharp`, učitan
putem dinamičkog importa: na platformi na kojoj se njegov izvorni binarni
fajl ne može učitati, `normalizeDataUri()` **nikada ne baca izuzetak** — vraća
se na prosljeđivanje izvornih bajtova bez izmjena, tako da putanja opisa i
konverzije u base64 uvijek nastavlja raditi. Bajtovi koji nisu slika (dohvatanje
koje nije vratilo dekodabilnu sliku) takođe se prosljeđuju bez izmjena. Ova
normalizacija ograničena je na slike koje most dohvata za vlastiti poziv
samopetlje — nikada se ne primjenjuje na neobrađeni payload koji se samo
prosljeđuje od pozivaoca, u skladu s principom izmjene samo uz eksplicitno
uključivanje (Hard Rule #20).

#### Šema postavki + migracija

Novi ključevi `modalityBridge*` validiraju se pomoću Zoda u `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trojac `modalityBridgeCache*` i grupa
`modalityBridgeAudio*` koju koristi Audio Bridge. Migracija
`141_modality_bridge_settings.sql` kopira postojeće naslijeđene vrijednosti
`visionBridge*` u odgovarajuće nove ključeve (idempotentno, nikada ne prepisuje
vrijednost `modalityBridge*` koju je postavio operator); naslijeđeni ključevi
ostaju prihvaćeni kao rezervna opcija za čitanje tokom jednog ciklusa izdanja.

#### Zaglavlje transparentnosti + statistika

Odgovori s opisom i transformacijom sadrže
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(izgrađeno pomoću `buildModalityBridgeHeader()` u `modalityBridge/bridgeStats.ts`,
postavljeno pomoću `withModalityBridgeHeader()` u `src/sse/handlers/chatHelpers.ts`).
Preusmjereni zahtjevi ne dobijaju zaglavlje — sadržaj nije izmijenjen, a zamjena
modela već je vidljiva u polju `model` tijela odgovora.

`GET /api/modality-bridge/stats` (autentifikacija za upravljanje, isti nivo kao
`GET /api/settings`) vraća brojače po modalitetu u memoriji
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio` i `video`.
`averageLatencyMs` koristi `latencySamples`, a ne sve pokušaje, kao svoj
nazivnik; operacija bez mjerenja vremena ne izmišlja uzorak od nula milisekundi.
`bridged` ostaje unazad kompatibilni alias za uspješne konverzije; neuspješni
pokušaji ga ne uvećavaju.
Brojači se namjerno resetuju pri ponovnom pokretanju procesa
(telemetrija, a ne računovodstvo).

#### Konfiguracija kontrolne ploče

Namjenska stranica kontrolne ploče je
`/dashboard/settings/modality-bridge`. Njene kartice `Vision`, `Audio`
i `Video`, kojima se može pristupiti putem URL-a, čuvaju parametre upita pri
prebacivanju vrijednosti `tab`. Kartica Vision omogućava uključivanje,
režim, izbor modela (uključujući automatsku zadanu vrijednost), upite svjesne
zadatka, napredna ograničenja vremena čekanja/broja slika/dužine opisa/cachea,
brojače tokom rada i zaštićeni testni zahtjev. Kartica Audio je takođe aktivna:
omogućava izbor modela samo za STT, uz opciju Auto, ograničenja vremena čekanja
i maksimalnog trajanja isječka, audio brojače i testni zahtjev `input_audio`.
Kartica Video je funkcionalna: prikazuje stanje izvršavanja FFmpeg/ffprobe — jedno
od četiri izričita stanja korisničkog interfejsa (`unknown` dok je provjera u
toku ili se ne može završiti, `restricted` na hostu kontrolne ploče koji nije
loopback i na kojem se provjera preskače na klijentskoj strani, `unavailable`
nakon provjere i potvrđenog nedostatka ili `available` s verzijama FFmpeg/ffprobe),
čuva ograničenja za uključivanje/model/broj sličica/video/vrijeme čekanja,
filtrira birač modela na modele koji podržavaju vision i prikazuje video brojače.

Prethodna kartica Vision Bridge u postavkama AI-ja predstavlja poveznicu za
kompatibilnost ka novoj stranici; više ne posjeduje drugu kopiju obrasca.
Media Providers takođe povezuje tokove rada Image-to-Text i Speech-to-Text s
odgovarajućim karticama Modality Bridgea, bez uklanjanja postojećeg
igrališta za Speech-to-Text.

**Zaobilaženje prijema samopetlje:** kada zahtjev za opis prolazi kroz
OmniRouteovu vlastitu `/v1` samopetlju (model nestandardnog pružaoca), podzahtjev
šalje `x-omniroute-admission-bypass: internal` i autentifikuje se riješenom
vjerodajnicom samopetlje — lokalnim sentinelom `sk_omniroute` u lokalnom režimu
ili ključem okruženja `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` koji je podesio
operator (#1350), kako bi deploymenti s `REQUIRE_API_KEY=true` i dalje mogli
izvršiti zahtjev za opis. Zaobilaženje se uvažava samo za te tačne
vjerodajnice, tako da vanjski klijenti ne mogu koristiti zaglavlje za
preskakanje prijema.

Naslijeđene zadane vrijednosti nalaze se u
`src/shared/constants/visionBridgeDefaults.ts`; nove zadane vrijednosti za
režim/zadatak/cache i razrješavač postavki nalaze se u
`src/shared/constants/modalityBridgeDefaults.ts`. Zaštitni mehanizam izlaže
opciju konstruktora `deps`, tako da testovi mogu ubaciti lažne implementacije
`getSettings` i `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Presreće chat zahtjeve koji sadrže audio prije nego što stignu do cilja za koji
nije poznato da prihvata audio ulaz. Nikada ne preusmjerava chat zahtjev: audio
dijelovi transkribuju se kroz postojeću OpenAI-kompatibilnu multipart krajnju
tačku, a odabrani chat model nastavlja rad s tekstualnim transkriptima.

Tok:

1. Razriješite `supportsAudio` putem `getResolvedModelCapabilities()`. Eksplicitni
   metapodaci registra dobavljača imaju prednost, zatim statički metapodaci modela,
   a potom sinhronizovani `modalities_input`. Deklarisana ulazna lista bez
   `audio` je `false`; ako nema preostalih dokaza o mogućnostima, vrijednost je
   `null`. I `false` i `null` aktiviraju konzervativni most, dok ga `true`
   zaobilazi.
2. Razriješite postavke `modalityBridgeAudio*` i izdvojite audio dijelove
   najvišeg nivoa koji se mogu umetnuti iz svake poruke putem zajedničkog
   detektora `detectMediaParts()`. Podržani oblici na žici su OpenAI
   `input_audio`, `audio_url` i `source.media_type: "audio/*"`. Ugniježđeni
   audio se detektuje za usmjeravanje, ali se ne uklanja putem putanje za
   umetanje. Rad je ograničen postavkom `modalityBridgeAudioMaxClips`;
   kasniji dijelovi ostaju nepromijenjeni.
3. Poštujte konfigurisani `provider/model` ili dozvolite da
   `selectAudioBridgeModel()` prođe kroz `AUDIO_TRANSCRIPTION_PROVIDERS`
   stabilnim redoslijedom kataloga i odabere prvi model s upotrebljivim aktivnim
   akreditivom dobavljača.
4. `callAudioTranscription()` pretvara audio iz base64/data-URI oblika u
   multipart `file` ili preuzima udaljeni `audio_url` putem javno dostupnog
   izlaznog zaštitnog mehanizma s vezivanjem DNS-a i ograničenjem od 25 MB.
   Zatim šalje POST zahtjev s datotekom i odabranim modelom lokalnoj
   samopetlji `/v1/audio/transcriptions`, autentifikovanoj pomoću
   `resolveSelfLoopBearer()`. Postojeća ruta za transkripciju obavlja uobičajeno
   pronalaženje akreditiva, rukovanje hlađenjem/ograničenjem brzine i
   prosljeđivanje dobavljaču.
5. Uspješni pozivi zamjenjuju svoje dijelove s `[Audio N]: <transcript>`.
   Pozivi se izvršavaju pomoću `Promise.allSettled`: pojedinačni neuspjeh
   zadržava izvorni audio dio (ugovor #4012). Ako svaki poziv ne uspije i za
   cilj je dokazano da je `supportsAudio === false`, dijelovi postaju
   `[Audio N]: (unavailable — no STT provider connected)` (ugovor #8430). Za
   nepoznati cilj (`null`), rezultat u kojem svi pozivi ne uspiju ostaje
   nepromijenjen. Dokazano tekstualnom cilju bez upotrebljivog STT akreditiva
   dodjeljuje se ista eksplicitna zamjena bez slanja mrežnog poziva.

Uspješne transkripcije koriste procesno široku Modality Bridge LRU/TTL keš
memoriju. Ključ objedinjuje audio referencu, stabilnu oznaku operacije
`audio-transcription` i odabrani STT model; neuspjesi se nikada ne keširaju.
Audio pokušaji ažuriraju zajedničke brojače `bridged`, `cacheHits`, `failures` i
`lastUsedAt`. Transformisani odgovori sadrže
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; neizmijenjeni
zahtjevi ne dobijaju segment Audio Bridge-a.

Postavke izvršavanja čuvaju se u bazi podataka i validiraju pomoću Zoda:

| Ključ                         | Podrazumijevano | Raspon          |
| ----------------------------- | --------------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`          | —               |
| `modalityBridgeAudioModel`    | `""`            | Auto ili STT ID |
| `modalityBridgeAudioTimeout`  | `60000`         | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`             | 1–10            |

Zajednička keš memorija i dalje se kontroliše pomoću
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` i
`modalityBridgeCacheMaxEntries`.

### Video most (`videoBridge.ts`, `videoBridgePipeline.ts`)

Presreće video dijelove najvišeg nivoa u `messages` API-ja Chat Completions i
`input` API-ja Responses prije nego što se pozove cilj bez poznate izvorne
podrške za video. Podržani oblici su `input_video`, `video_url`,
`video_source`, HTTPS URL-ovi i URI-ji podataka
`data:video/*;base64,...`. Obični nazivi datoteka u tekstu ne tretiraju se kao
video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) upravlja prolaskom kroz
zahtjev, provjerom mogućnosti/politike, agregacijom po zahtjevu i sadržajem
odgovora. Rad po videu — pribavljanje, keširanje cijelog rezultata, opisivanje
slijeda kadrova (koje objedinjuje svaki transkript audija deklarisan od strane
pozivaoca) te metrike, prekid i čišćenje po pokušaju — skriven je iza
`processVideoPart` u `videoBridgePipeline.ts`, koji se poziva jednom za svaki
video dio unutar petlje `preCall`. Taj modul takođe definiše eksplicitne granice
portova `VideoMediaBrokerPort` (pribavljanje bajtova i izdvajanje uzorkovanih
kadrova), `VideoAudioTranscriptionPort` (objedinjavanje transkripta audija
deklarisanog od strane pozivaoca sa uzorkovanim opisima) i
`VideoDrilldownPort` (naslijeđeni oblik neobrađenog skladišta). Produkcijski STT
i zadržavanje kadrova sastavljaju se oko porta za opisivanje putem
`createVideoSttAdapter` i `createVideoDrilldownAdapter`; potonji koristi
zajednički životni ciklus neprozirnih ručki.

Javna putanja zahtjeva `/v1` nikada ne uvozi niti poziva podproces. Udaljeni
videozapisi preuzimaju se uz ograničenje od 50 MiB; ugrađeni base64 videozapisi
imaju konzervativno ograničenje od 36 MiB dekodiranih podataka po videu kako bi
omotač modela/poruka/okvirivanja ostao unutar javnog ograničenja prihvata JSON
zahtjeva od 50 MiB. Procjene ugrađene dužine i dekodirane veličine provjeravaju
se prije alokacije. HTTPS je obavezan za početni udaljeni URL i svako
preusmjeravanje, uz postojeći javno-isključivi izlazni zaštitni mehanizam s
vezivanjem DNS-a. Bajtovi zatim prolaze kroz preciznu internu granicu brokera
`POST /api/modality-bridge/video/extract`. Ta ruta je istovremeno
`LOCAL_ONLY` i `SPAWN_CAPABLE`, prihvata samo autentifikovani zahtjev iz
pouzdanog lokalnog procesa, po procesu, i nikada ne prihvata URL, putanju
sistema datoteka, izvršnu datoteku niti listu argumenata. Cjevovod veličine tijela
API-ja i inkrementalni čitač tijela rukovaoca nezavisno nameću ograničenje ulaza
brokera od 50 MiB. Njegov ograničeni red obrađuje jednu ekstrakciju odjednom,
dozvoljava četiri posla na čekanju i ograničava ulaz na čekanju na 100 MiB.

Unutar brokera, `ffprobe` čita privatnu lokalnu datoteku; fiksna lista
dozvoljenih formata isključuje formate plejlista i manifesta. Za dozvoljene
kontejnere iz porodice MOV, vanjske MOV reference na podatke ostaju
podrazumijevano onemogućene, a fiksna naredba ih ne omogućava. I `ffprobe` i
`ffmpeg` koriste listu dozvoljenih protokola koja sadrži samo `file`, jednu nit,
fiksne nizove argumenata, bez ljuske, te izvršne datoteke pronađene putem
`PATH`. Tokovi naslovnih slika u prilogu nisu kandidati za reprodukciju. Svi
tokovi koji se mogu reproducirati moraju zadovoljiti ograničenja, a eksplicitni
zadani tok ima prednost u odnosu na deterministički rezervni odabir toka s
najnižim indeksom. Videozapisi su ograničeni na 600 sekundi, 8.192 piksela po
dimenziji i 33.554.432 izvorna piksela. FFmpeg uzorkuje 1–16 JPEG kadrova iz
središnjih tačaka, smanjuje dužu ivicu na najviše 1.024 piksela bez povećavanja
manjih ulaznih sadržaja i nikada ne prima URL. Uzorkovanje je podrazumijevano
`uniform`. Opcionalna pravila `scene_aware` i eksperimentalna pravila
`segment_aware` izvršavaju jedan dodatni fiksni prolaz FFmpeg-a preko već
validiranog lokalnog toka, odabiru ograničene vremenske oznake scena iz
`showinfo` i deterministički se vraćaju na iste uniformne središnje tačke u
slučaju greške detektora, isteka vremena, neispravnog izlaza ili praznog skupa
kandidata. Režim koji uzima segmente u obzir dodjeljuje uzorke središnjih
tačaka proporcionalno validiranim intervalima scena; dokazi režima koji uzima
segmente u obzir i ponašanje rezervnog mehanizma detaljno su opisani u
nastavku. Čvrsto ograničenje od 16 kadrova primjenjuje se nakon odabira u
svakom pravilu. Kada zahtjev koji uzima scene u obzir ima budžet od samo jednog
kadra, koristi uniformnu središnju tačku aktivnog prozora cijelog videozapisa
ili fokusnog prozora i prijavljuje `policyEffective: uniform`: jedan odabrani
kadar scene ne može očuvati oba vremenska kraja. Pozivatelj može opcionalno
navesti konačan fokusni prozor (`start`/`end` u sekundama); granice se
ograničavaju na trajanje medija, obrnuti ili nekonačni prozori se odbijaju, a
sva pravila uzorkovanja izvršavaju se samo unutar normaliziranog intervala.
Rezultirajući prozor uključuje se u metapodatke uzorkovanja i u prefiks
nepouzdanog opisa kako bi nizvodni modeli mogli razlikovati fokusirani isječak
od cijele vremenske linije.

Semantički fokus opisa zasebna je, eksplicitna postavka. Zadani način analize
`full` zadržava postojeći prompt za kadrove i nikada ne prosljeđuje tekst
zahtjeva modelu za opisivanje. U načinu `focused`, most čita samo najnoviji
neprazni `text`/`input_text` koji je napisao korisnik iz istog Chat ili
Responses kontejnera, normalizira ga u NFC, sažima kontrolne znakove i
razmake te ga ograničava na 500 Unicode kodnih tačaka. Prazan rezultat vraća se
na tačan prompt načina `full`. Upotrebljiva sugestija serijalizira se kao JSON
u namjenskom bloku nepouzdanog korisničkog konteksta i smije samo dati prioritet
uočljivim detaljima; ne može poništiti zasebno upozorenje da se ne slijede
upute koje su vidljive ili čujne u mediju. Tekstualni fokus nikada ne izvodi
`start`/`end` niti mijenja vremenski uzorkivač.

#### FU-07 strukturni dokazi o segmentima

`segment_aware` koristi jedan ograničeni prolaz predanalize preko već
validiranog lokalnog videotoka. Fiksni lanac filtera prvo smanjuje širinu na
najviše 320 piksela, otkriva promjene scena i zamrznute intervale, a zatim
uzima 1 uzorak u sekundi radi procjene zamućenja, prosječne luminanse te
prostornih/vremenskih informacija. Prolaz je ograničen na 600 strukturnih
uzoraka, jednu FFmpeg/filter nit, iste liste dozvoljenih protokola koje sadrže
samo `file` i dozvoljenih kontejnera, ograničenje izlaza procesa od 1 MiB te
najviše 30 sekundi unutar zajedničkog prekida/roka brokera. Nikada ne prihvata
naredbu, filter, putanju ili URL iz zahtjeva.

Strukturne vrijednosti predstavljaju determinističke dokaze uzorkovanja, a ne
semantičko razumijevanje videozapisa. One ne izvode zaključke o subjektima,
radnjama, titlovima, govoru ili namjeri korisnika. Granice scena i zamrzavanja
formiraju segmente; pokrivenost zamrzavanjem, zamućenje, ekspozicija, prostorni
detalji i vremenske promjene utiču samo na način raspodjele postojećeg budžeta
od 1–16 kadrova. Potpuno zamrznut segment ograničen je na jedan kadar, dok se
nezamrznuti segmenti nadmeću za preostali budžet. Kada broj granica premašuje
broj kadrova, zadržava se uniformna pokrivenost vremenske linije kako brzi
rani rezovi ne bi mogli sakriti dugi završni segment. Granice scena koje su
unutar rezolucije analize od 1 sekunde u odnosu na granicu zamrzavanja spajaju
se.

Nedostajući filteri, neispravni/prazni dokazi, greška detektora ili istek
vremena ograničene predanalize uzrokuju povratak na tačno pravilo uniformne
središnje tačke. Prekid od strane pozivatelja ili rok brokera ne uzrokuje takav
povratak: prekida podproces koji je u toku, sprečava kasnije izdvajanje kadrova,
a privatno privremeno stablo uklanja se u `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generira determinističke stvarne FFmpeg
testne sadržaje za uštede poziva opisa nakon deduplikacije, raspodjelu budžeta
za gusto kretanje, dokaze zamućenja/ekspozicije/SI-TI, brze rezove s dugim
završnim segmentom i lažno pozitivne rezultate postepenog zatamnjenja. Bilježi
proteklo vrijeme predanalize i, gdje je dostupan `/usr/bin/time`, CPU vrijeme
podređenog procesa i vršnu RSS vrijednost. Njegove provjere kvaliteta isključivo
su strukturni orakuli. Kvalitet stvarnog modela za opisivanje ostaje `HOLD` jer
ovaj testni okvir nema ovlaštenu krajnju tačku ni zamrznutog ocjenjivača.
Novčane uštede također ostaju `HOLD` osim ako
`--caption-cost-per-call-usd` ne navede eksplicitnu pozitivnu procjenu troška
po pozivu; skripta nikada ne izmišlja nijedan od tih rezultata.

Svaki okvir je ograničen na 4 MiB, svi sirovi okviri zajedno na 23 MiB, a
serijalizovani odgovor brokera na 32 MiB. Privatni privremeni direktorij uklanja
se u `finally`. OmniRoute ne uključuje FFmpeg i ne prihvata prilagođenu putanju
do izvršne datoteke. Prije generisanja opisa, most primjenjuje konzervativni
prolaz vizuelne deduplikacije: svaki JPEG se smanjuje na bafer nijansi sive
veličine 16×16 i poredi se samo s posljednjim zadržanim okvirom. Za zatraženi
budžet opisa veći od jednog okvira, ekstrakcija obezbjeđuje ograničeni skup
kandidata od najviše dvostrukog budžeta i nikada više od 16 okvira. Zatraženo
ograničenje primjenjuje se tek nakon deduplikacije, pri čemu se prvi i posljednji
izabrani kandidati zadržavaju tokom završnog prorjeđivanja kada je budžet najmanje
dva. Verzija politike
`grayscale-16x16-mean-cells-v2` koristi veću vrijednost između srednje razlike
luminanse i omjera ćelija sličice čija je normalizovana razlika najmanje 0.05.
Prag za duplikate je konstanta 0.04, izabrana radi predvidljivosti, a ne
izložena kao postavka tokom izvršavanja. Ovaj sekundarni signal visokog
kontrasta čuva male promjene i promjene vidljivog teksta koje poređenje
zasnovano samo na srednjoj vrijednosti može sakriti. Greške komparatora ili
dekodera se zanemaruju, a pokrivenost se zadržava. Izlazni metapodaci
razdvajaju izvučene kandidate, uspješno korištene okvire i odbačene vizuelne
duplikate.

Eksplicitno označeni videozapis može zatražiti kontaktni list s vremenskim
oznakama. Most izrađuje JPEG mrežu od najviše 4 kolone i 16 okvira. U svakoj
ćeliji veličine 512 piksela izvorna vremenska oznaka upisuje se u kontrastnu
donju traku, dok iste vremenske oznake ostaju u tekstualnim metapodacima radi
daljnjeg povezivanja i revizije. Cjelokupni JPEG i dalje je ograničen na 32 MiB.
Ako `sharp` ne može dekodirati ili sastaviti mrežu, most se vraća na pojedinačne
JPEG okvire; prekid klijenta i dalje se prosljeđuje kroz operaciju izrade lista.

Dokazi za promociju namjerno su odvojeni od sintetičkog mikrobenchmarka
kompozicije. `scripts/perf/video-bridge-contact-sheet-eval.ts` definiše A/B
harness s verzijom šeme za stvarne vizuelne modele kompatibilne s OpenAI-jem.
Mjeri tokene koje prijavljuje pružalac, ukupnu latenciju od početka do kraja
(uključujući sastavljanje lista), broj poziva modelu i zadržavanje činjenica
definisanih manifestom. Sirovi odgovori modela ne upisuju se u izvještaj; čuvaju
se samo SHA-256 sažeci i ID-jevi podudarnih činjenica. Harness ne upućuje mrežni
niti plaćeni poziv modelu osim ako se proslijedi `--execute-real` i podese
`--model`, `OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY`. Bez tog eksplicitnog
stvarnog pokretanja, njegov mašinski čitljiv zaključak ostaje `HOLD`; sama
sintetička mjerenja sadržaja/broja poziva nisu dokaz za promociju.

Odvojeni `scripts/perf/video-bridge-promotion-eval.ts` koristi opažanja FU-07 ili
FU-09. Za prihvat promocije potrebno je svih osam vrsta sintetičkih scenarija
zajedno sa sanitizovanim stvarnim isječkom, najmanje tri izmjerena ponavljanja po
ulozi i slučaju, svih deset deklarisanih metrika, nepromjenjivi sažeci medija,
upita, očekivanih činjenica i postavki, jedinstveni ID-jevi opažanja i potvrđen
redoslijed A/B testiranja sa sjemenom. Potvrda izvršavanja povezuje sažetak
korpusa, tačan SHA kandidata i reviziju modela. Nedostajuća ili nevažeća mjerenja
ostaju `HOLD`, uključujući CPU vrijeme iznad 30 s, vršni RSS iznad 512 MiB ili
vrijeme prije analize iznad 30 s. Ovo su ograničenja za prihvat dokaza, a ne nova
garancija izvršnog nametanja RSS ograničenja.

FU-07 zahtijeva najmanje 98% zadržavanja kvaliteta i p95 latenciju ne veću od
1,2 puta osnovne vrijednosti, uz jedno od sljedećeg: poboljšanje prosječnog
opoziva uravnoteženog po slučajevima za 0,05 u apsolutnom iznosu pri
ekvivalentnom prosječnom broju poziva za opise ili najmanje 10% manje
prosječnih poziva za opise nakon deduplikacije. FU-09 zahtijeva najmanje 0,85
kvaliteta, 95% zadržavanja, 20% smanjenja medijanske latencije i 10% smanjenja
broja tokena. Gubitak kritičnih činjenica, usklađenost s injekcijama ili
nedostajući podaci o upotrebi sprečavaju promociju. Jedno izvršavanje ne može
samo promovisati ništa:
`--previous-report` potvrđuje dva različita, međusobno nepovezana i uzastopno
podobna izvršavanja iste politike/revizije modela/kandidata/korpusa.
Eksperiment uzorkovanja ne može potvrditi eksperiment s kontaktnim listom.

Sakupljači bi trebalo da ocjenjuju odgovore u memoriji i čuvaju
`responseDigest` zajedno s metrikama i povezivanjima opažanja, a nikada tekst
odgovora. Potrošač takođe čita naslijeđena sirova opažanja, ali taj tekst nikada
ne kopira u svoje izvještaje. Za svako opažanje prihvata se tačno jedno od
`responseDigest` ili `rawResponseText`. Verziona lista dozvoljenih stavki i
dalje je prazna, uz nepromjenjivu podrazumijevanu vrijednost `hold`. Podoban
unos zahtijeva svoju referencu dokaza, politiku, reviziju modela, tačan SHA
kandidata, sažetak manifesta i dva različita ID-ja pokretanja; proturječni
konteksti se odbacuju. Ovi metapodaci su revizijski ugovor, a ne dokaz da
referencirana datoteka sadrži stvarna mjerenja. Pregledajte stvarne potvrde prije
dodavanja bilo kojeg unosa. Krajnja tačka statistike upravljanja i nadzorna
ploča za video prikazuju konzervativnu spremnost. Sam konfigurisani pseudonim
modela ne utvrđuje njegovu reviziju niti SHA kandidata koji se izvršava, pa
trenutna nadzorna ploča prikazuje `HOLD` umjesto ponovnog korištenja podobnosti
iz drugog konteksta izvršavanja. Eksplicitni eksperimentalni odabir ostaje
odvojen od promocije; nijedna podrazumijevana vrijednost ne mijenja se
automatski.

Pozivaoci mogu priložiti opcionalni niz `transcript.cues` podržanom video
dijelu kada već posjeduju usklađeni tekst. Svaki cue mora sadržavati `text`, konačan
interval `start`/`end` unutar utvrđenog trajanja i dozvoljeni `source` (`client`, `embedded` ili `audio-bridge`); `confidence` podrazumijevano iznosi
`1` i mora ostati između `0` i `1`. Potpuno duplicirani cueovi se objedinjuju.
OmniRoute nikada ne pokreće transkripciju na osnovu ovih metapodataka: provjereni cueovi
se kopiraju u opisani rezultat zajedno s izvorom, pouzdanošću i intervalom te se
prikazuju kao nepouzdana zapažanja uz opise kadrova. Nevažeći tekst, tekst izvan
opsega ili tekst bez porijekla odbacuje se umjesto da se pomiješa sa tokom opisa.
Oba kanala transkripta iz tijela zahtjeva normalizuju navedeno porijeklo u
`client`, uključujući samostalno navedene oznake `embedded` ili `audio-bridge`.
Samo adapter u vlasništvu servera može dodijeliti te pouzdane oznake putem argumenta
`trustedSource`, koji je dostupan samo kroz kod; JSON polje zahtjeva ne može doprijeti
do tog argumenta. Tekst transkripta ostaje nepouzdan sadržaj izveden iz medija,
bez obzira na njegovo porijeklo, i nikada ne smije određivati autorizaciju.

Napredni pozivalac može navesti i zapis `audioTranscript` za isti video;
on se tretira kao tekst koji je dostavio klijent, a ne kao dokaz serverove
transkripcije. Tačka spajanja pokreće vizuelna i audio zapažanja pod
jednim rokom i signalom za prekid, raspoređuje ih na zajedničku vremensku liniju,
objedinjuje potpuno duplikate i prijavljuje djelimičan rezultat kada uspije samo
jedna strana. Nevažeći `audioTranscript` degradira se u taj djelimični rezultat —
vizuelni opis se zadržava, a audio grana bilježi sanitizovani kod greške —
umjesto da se cijeli video označi kao neuspješan. Dostupnost po grani, oznaka
djelimičnosti i sanitizovani kodovi grešaka čuvaju se u opisanom rezultatu, u
metapodacima zaštitnog sloja (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), u metapodacima keša rezultata i u brojačima spajanja
mosta. Podrazumijevana putanja Video Bridgea ne poziva pretvaranje govora u tekst
niti preuzima drugu kopiju medija; bez te izričite putanje ostaje samo video.

**Zadržavanje transkripta (#12150 P1).** Ovo se automatski primjenjuje kad god
Video Bridge (koji je sam po sebi opcionalan) prikaže cue transkripta — ne postoji
zasebna oznaka za zadržavanje. Kada zahtjev prikaže bilo koji cue transkripta
(`transcript` koji je deklarisao pozivalac ili spojeni `audioTranscript`), zaštitni sloj
ga označava sa `videoBridgeObserved` i proizvodi redigovanu kopiju opisa videa —
identično prikazivanje u kojem je tijelo slobodnog teksta svakog cuea zamijenjeno
sa `[redacted-video-transcript]`, tako što se strukturirano polje cuea zamijeni
prije sastavljanja niza (nikada parsiranjem spljoštenog teksta, tako da nijedan sadržaj
cuea — suparnički ili uobičajeni, uključujući tijela koja sadrže `]`, kao što su
`[inaudible]`/`[music]` — ne može preživjeti). Tijelo zahtjeva u trajno sačuvanom
dnevniku poziva zamjenjuje svaki dio teksta izveden iz videa tom redigovanom kopijom,
uparenom prema jednakosti sadržaja; sidro `fullText` ponovo se čita iz završenog
korisničkog tereta zaštitnog sloja prije poziva, tako da uparivanje i dalje uspijeva
nakon što kasniji zaštitni slojevi lanca (maskeri za PII i akreditive, prioriteta
10/95) prepišu tekst opisa na mjestu i nakon što ubrizgavanje sistemskog upita,
prosljeđivanje i memorija preoblikuju niz poruka. Tijelo poslato modelu nije izmijenjeno.
Posmatrani zahtjev takođe ne popunjava trajnu memoriju (preskače se izdvajanje i iz
zahtjeva i iz odgovora), pa ni sam odgovor modela ne može ponoviti tekst transkripta
u memoriji.

**Sirova video polja (#12430).** Kada je most omogućen, a izvorna podrška za video
nepoznata ili nedostupna, definisana polja `transcript`/`audioTranscript` takođe
aktiviraju `videoBridgeObserved`, čak i nakon neuspjeha opisa ili ograničenja
`maxVideos`. `null` i prazni nizovi se računaju; polja koja nedostaju i metapodaci
koji nisu video ne računaju se. Zadržane kopije rediguju ova polja ili izostavljaju
zahtjev, a keš i memorija se zaobilaze.

Na tim rezervnim putanjama, važeći cueovi pozivaoca postaju podržani dijelovi
`text`/`input_text`, a ne nestandardna polja provajdera. Obje staze dostavljene u
zahtjevu ostaju nepouzdana zapažanja `client`, uz izričito upozorenje da video nije
opisan i da vremenske oznake nisu provjerene u odnosu na medij. Postojeća ograničenja
od 256 cueova/64 KiB ukupno i po cueu primjenjuju se zajedno na obje staze;
vremenske oznake moraju stati u brokerovo ograničenje od 600 sekundi i u svaki
navedeni prozor fokusa. Nevažeće staze se odbacuju i ne prosljeđuju kao proizvoljan
tekst; važeća susjedna staza i dalje se može koristiti osim ako se prekorači njihov
zajednički budžet. Polja s vrijednošću null/prazna polja ne dodaju tekst. Ovaj rezervni
mehanizam ne dodaje preuzimanje medija ni transkripciju. Polja proširenja transkripta
uklanjaju se iz rezervnog video-nosača i njegovih objekata
`video_url`/`source`. Dozvoljena lista OpenAI žičanog formata ostaje stroga;
nepoznati izvorni video-nosači i dalje su dostupni, a poznati ciljevi koji podržavaju
samo tekst zadržavaju sigurne oznake. Strukturirane redigovane kopije štite dodani
tekst transkripta, dok izvorni zahtjev u vlasništvu pozivaoca ostaje neizmijenjen.
Ciljevi s izvornom podrškom i onemogućeni mostovi zadržavaju svoje postojeće ponašanje
zaobilaženja.

Dodatne zadržane kopije koriste isti signal posmatranog zahtjeva. Sirovi snimak
zahtjeva klijenta prije zaštitnog sloja, zahtjev na čekanju u memoriji i rani dnevnik
odbijenih zahtjeva strukturno zamjenjuju polja transkripta u video dijelovima;
tekstualni upiti koje sintetizuju faze cjevovoda i prosljeđivanje konteksta rediguju
se na odredištu tijela zahtjeva koje se trajno čuva. Trajno sačuvana oznaka
`video_content_removed` uzrokuje da se nastavak sa `previous_response_id` sigurno
zatvori umjesto da ponovo sastavi tekst koji je namjerno odbačen. Ako posmatrani
zahtjev izgubi redigovanu kopiju po dijelu prije zapisivanja ili ako se čak i jedna
od više video-kopija ne uspije upariti nakon kasnijih izmjena zahtjeva, tijelo
zadržanog zahtjeva u potpunosti se izostavlja umjesto da se zadrži djelimično
redigovani transkript.

Za posmatrani zahtjev, odgovor modela može citirati bilo koji dio
transkripta bez strukturirane granice oznake. Njegov trajno pohranjeni zapis poziva
`responseBody` stoga se zamjenjuje oznakom izostavljanja; detaljni artefakt
cjevovoda (koji može uključivati tijela uzvodne strane/klijenta i dijelove toka)
ne zadržava se. Keš memorije za semantiku, idempotentnost i ponovnu reprodukciju
rezonovanja zaobilaze čitanja i upise za taj zahtjev. Zahtjev prema provajderu i
odgovor vidljiv klijentu ostaju nepromijenjeni. Rani bajtovi za održavanje veze
iscrpljuju se iz privremenog bafera kada se detaljni artefakt izostavi. Kirovo
upozorenje o neispravnom EventStreamu prijavljuje samo broj bajtova sadržaja,
nikada njegov sadržaj niti sirovu grešku JSON parsera.
Ovo ne tvrdi da je svaka nepovezana dijagnostika provajdera/dodatka revidirana;
širi pregled zadržanih odredišta prati se u #11658.

Interni životni ciklus `/api/modality-bridge/video/drilldown` zasebna je,
lokalna keš infrastruktura autentifikovana putem tokena. Svaka operacija također
zahtijeva kanonski neprozirni ID principala. Prije nego što se omogući pozivaocu
u produkciji, taj ID mora izvesti iz autentifikovanog zakupca i nikada ne smije
proslijediti vrijednost koju je odabrao klijent. Ključevi keša povezuju taj
principal s kanonskim ID-ovima sesije i video-reference, pohranjuju samo njihove
ključeve izvedene SHA-256 algoritmom te ograničavaju i čitanja i brisanje na isti
principal. Keš po unosu pohranjuje najviše 16 izvedenih JPEG sličica, ističe ih
nakon deset minuta i podržava ograničena čitanja `start`/`end` ili eksplicitno
brisanje sesije.

Svaki principal ograničen je na 16 unosa i 64 MiB kanonskih JPEG podataka. Ta
ograničenja nezavisna su od globalnog plafona od 64 unosa/256 MiB: pritisak
kvote principala izbacuje samo njegove unose koji su najduže nekorišteni prije
nego što se razmotri globalno LRU izbacivanje. Istekli unosi uklanjaju se iz
evidencije i principala i globalne evidencije pri aktivnosti keša, dok otkazivanje
i neuspjeh validacije ne potvrđuju djelimičnu zamjenu.

Keš odbija nekanonski Base64, višak znakova za dopunu, medije koji nisu JPEG,
neispravne ili skraćene JPEG datoteke te JPEG datoteke koje proizvode upozorenje
tokom ograničenog potpunog dekodiranja slike pomoću `sharp`.
Svaku prihvaćenu sliku ponovo kodira kao kanonski JPEG, izvodi širinu i visinu iz
dekodiranih bajtova umjesto da vjeruje poljima pozivaoca i odbacuje sve završne
poliglotske bajtove umjesto da ih zadrži. Samo ograničeni kanonski kompresovani
bafer obračunava se u obje kvote. Ograničenje JSON žice uključuje Base64
dodatak za plafon od 32 MiB dekodiranog ulaza. Svaka pohranjena izvedenica bilježi
svoj validirani JPEG format/rezoluciju, politiku uzorkovanja, verziju izvedenice,
vrijeme kreiranja, hash sadržaja izračunat na serveru i hashiranu nadređenu
referencu zajedno s hashom sadržaja koji je dostavio pouzdani pozivalac.
Otkazivanje se provjerava između asinhronih faza dekodiranja i izračunavanja
hasha, prije atomarnog potvrđivanja u kešu.

Produkcijski proizvođač ponovo koristi već izvedene brokerske sličice tek nakon
uspješne vizuelne analize, bez drugog preuzimanja/izdvajanja videa. Zahtijeva
operatorsku postavku `modalityBridgeVideoDrilldownEnabled=true`, strogo
`drilldown: true` po dijelu i autentifikovani ID zapisa API ključa. Vrijednosti
principala/sesije koje deklarira klijent nikada ne uspostavljaju vlasništvo. Bez
sva tri uslova ne izračunava hash, ne mijenja veličinu niti zadržava dodatne
sličice. Neuspjeh zadržavanja čuva upotrebljiv vizuelni odgovor. Zahtjevi s datom
saglasnošću zaobilaze keš rezultata cijelog videa kako keširani rezultati nikada
ne bi ponovo emitovali ručke.

Uspješni JSON i SSE odgovori izlažu najviše četiri neprozirne ručke u ograničenom
zaglavlju `x-omniroute-video-drilldown`. Ovlašteni izvori pregledača mogu čitati
to zaglavlje bez proširivanja politike CORS izvora. Nove ručke koriste oblik
`v1.<32-byte random base64url
token>`, a registar zadržava samo njihove SHA-256 hashove. Parser čitaoca/zaglavlja
također prihvata naslijeđene 64-heksadecimalne tokene. Autentifikovani javni
potrošač je
`GET /api/v1/video-bridge/drilldown?handle=...`, nezavisno kontrolisan postavkom
`modalityBridgeVideoDrilldownRemoteEnabled=true`. Eksplicitno trajno pohranjena
vrijednost false opoziva pristup čak i kada je omogućen naslijeđeni rezervni
mehanizam okruženja `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED`. Produkcijsko
zadržavanje ima analogni naslijeđeni rezervni mehanizam
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED`. Oba rezervna mehanizma podrazumijevano
su isključena.

Potrošač izvodi vlasništvo iz autentifikovanog ključa i primjenjuje politiku
ključa: i GET i DELETE pripadaju kategoriji krajnje tačke `video`, uključujući
alias-e `/v1` i `/api/v1`. Ključevi s nepraznom listom dozvoljenih krajnjih tačaka
moraju uključivati `video`; neograničeni ključevi ostaju kompatibilni. Potrošač
vraća isti 404 za nepoznate, istekle i ručke drugog ključa. Prihvata
`variant=preview|standard|detail` (maksimalna JPEG dimenzija 320/640/1280, bez
povećavanja), `limit=1..8` (ili naslijeđeni alias `frames`, ali nikada oboje),
nultom indeksiranu `page` i opcione fokusne sekunde `start`/`end`. Duplikati
parametara upita i obrnuti fokusni prozori se odbijaju. Svaka vraćena varijanta
ima hash svog stvarnog sadržaja i metapodatke stvarne rezolucije, povezane sa
zadržanim izvorom. Varijante se izvode pri čitanju umjesto da se pohranjuju kao
dodatne zadržane kopije. JSON odgovor, uključujući Base64/omotač, ograničen je na
32 MiB; prevelika stranica vraća 413, a klijent mora zatražiti manje sličica.
Čitanja provjeravaju otkazivanje oko svakog smanjenja veličine i ponovo provjeravaju
valjanost ručke prije vraćanja. `DELETE` od strane vlasnika je idempotentan;
brisanje ili istek TTL-a oslobađa zadržani izvor i evidenciju korištenja.

Dijeljeno spremište lokalno je za proces: ručke ističu nakon ponovnog pokretanja i
ne mogu se prenositi između nezavisnih OmniRoute procesa. Statistika upravljanja
izlaže efektivnu politiku zadržavanja/udaljenog pristupa i samo zbirne zadržane
unose/bajtove, nikada medije, reference, ID-ove principala niti ručke. Panel
postavki za Video prikazuje te vrijednosti i može pohraniti obje prekidačke
saglasnosti. Ova implementacijska dokumentacija nije dokaz o aktivnoj
implementaciji ili promociji; prihvatanje na stvarnom modelu prati se zasebno.

Kadrovi se sekvencijalno opisuju pomoću konfigurisanog Video modela. Prazna
Video zamjena nasljeđuje postavku Vision; ako su obje prazne, Vision
auto-router bira efektivni model koji podržava vizuelnu obradu. Uspješni opisi
zamjenjuju originalni dio stabilnim prefiksom `[Video description:` koji tekst
također označava kao nepouzdano zapažanje izvedeno iz medija i govori nizvodnim
modelima da ne slijede upute pronađene u mediju. Ključevi keša za opise kadrova
uključuju JPEG bajtove, prompt, vremensku oznaku i efektivni model; keširaju se
samo uspješni opisi. Unosi keša zadržavaju stvarni model koji ih je uspješno
proizveo, uključujući rezervni model; bridge prijavljuje `mixed` kada su različite
kadrove proizveli različiti modeli. Pogodak u kešu ponovo koristi identitet tog
proizvođača umjesto da ga označi kao traženi plan rutiranja. Keš rezultata za
cijeli video koristi kao ključ svaki ulaz koji mijenja izlaz — prompt, efektivni
model, politiku uzorkovanja, broj kadrova, način semantičke analize, SHA-256
otisak normalizovanog fokusa, fokusni prozor, `transcript`,
`audioTranscript` i oznaku kontaktne tablice — tako da promjena bilo koje od
tih dimenzija predstavlja promašaj keša, a nikada zastarjelo ponovno korištenje.
Verzija politike vizuelne deduplikacije, prag i ograničeni broj kandidatskih
kadrova također su eksplicitni u ključu i metapodacima keša rezultata; promjena
politike stoga ne može ponovo koristiti zastarjeli opis cijelog videa.
Metapodaci keša rezultata v4 čuvaju način rada i otisak, nikada sirovi zadatak
korisnika. Metapodaci zaštitnih mehanizama prijavljuju i traženi i efektivni
način analize; traženi način `focused` bez upotrebljivog teksta korisnika
prijavljuje se kao efektivni `full`.

Zaštitni mehanizam izdvaja svaki podržani video dio, ali opisuje najviše
`modalityBridgeVideoMaxVideos` videa. Za odredište za koje je dokazano da ima
`supportsVideo === false`, neuspješni i prekobrojni videozapisi postaju
eksplicitne sigurne tekstualne oznake, tako da nijedan sirovi video ne preživi.
Kada je mogućnost nepoznata, ti dijelovi zadržavaju svoj video nosač; svaki
rezervni transkript slijedi prethodno opisanu ograničenu konverziju teksta.
Odredišta sa `supportsVideo === true` zaobilaze bridge. Signal za prekid zahtjeva
klijenta propagira se kroz preuzimanje, red brokera, podprocese i pozive za
opise; prekidi zaustavljaju obradu između videozapisa i nikada ne omogućavaju
otvoreni prelaz na sirove medije.

Postavke za vrijeme rada čuvaju se u bazi podataka i provjeravaju pomoću Zoda:

| Key                                 | Default     | Range / behavior                                                                                      |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Opcionalno za vrijeme rada, uključuje se po izboru                                                    |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` čuva generičke opise; `focused` koristi ograničeni, nepouzdani kontekst najnovijeg korisnika   |
| `modalityBridgeVideoModel`          | `""`        | Nasljeđuje model Vision Bridgea                                                                       |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` ili proporcionalni `segment_aware`; neuspjeh detektora vraća se na `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                        |

Naslijeđene sačuvane vrijednosti vremenskog ograničenja za Video iznad
120 sekundi ograničavaju se na rok brokera; nova podešavanja iznad te granice
se odbijaju.
`GET /api/modality-bridge/video/runtime` zahtijeva pouzdano označenu lokalnost
loopbacka prije autentifikacije ili provjere vremena rada, a zatim zahtijeva
autentifikaciju za upravljanje. Vraća samo `available`, očišćene verzije
FFmpeg/ffprobe i fiksni razlog kada vrijeme rada nije dostupno. Interna krajnja
tačka za izdvajanje nije javni API za otpremanje: zasićenje reda vraća `503` uz
`Retry-After`, prekid veze od strane pozivaoca vraća `499`, a fiksni rok brokera
vraća `504`. Konvertovani odgovori dodaju
`video->text;model=<visionModel>;parts=<videos>` u centralno zaglavlje
`x-omniroute-modality-bridge`, bez uklanjanja segmenata Visiona ili Audioa.

### Masker PII-ja (`piiMasker.ts`)

Pokreće se u **obje** faze.

- **`preCall`** klonira sadržaj, prolazi kroz `system`, `messages`, `input` i
  `prompt` (uključujući stavke običnog stringa) te primjenjuje `processPII()`
  (iz `@/shared/utils/inputSanitizer`) na string polja `content`/`text`. Kada je
  `PII_REDACTION_ENABLED=true`, otkriveni PII se uklanja iz odlaznog sadržaja.
  Ovo je nezavisno od `INPUT_SANITIZER_MODE` (koji kontroliše samo politiku
  zaštite od prompt-injekcija). Kada je uklanjanje isključeno, poziv bilježi
  broj otkrivanja bez prepisivanja sadržaja.
- **`postCall`** dubinski klonira odgovor, pokreće `sanitizePIIResponse()` i
  masker oblika Responses API-ja (`maskResponsesOutput` — obuhvata
  `output_text` i `output[].content[].text`). Ako dođe do bilo kakvog uklanjanja,
  izmijenjeni odgovor zamjenjuje originalni.

Zaštitni mehanizam nikada ne blokira; samo dodaje oznake
(`meta.detections`, `meta.redacted`) ili prepisuje sadržaj.

**Reverzibilni trezor (`PII_REVERSIBLE_VAULT_ENABLED`, podrazumijevano `false`).** Kada su i
`PII_REDACTION_ENABLED` i `PII_REVERSIBLE_VAULT_ENABLED` uključeni (DB override >
okruženje > podrazumijevano, čita se jednom po zahtjevu), `handleChat` otvara jedan trezor po
klijentskom zahtjevu (`src/lib/pii/requestTokenVaultScope.ts`) i prosljeđuje ga prolazu prije
poziva kao `GuardrailContext.tokenVault`. Masker tada upisuje zamjenske tokene kao što je
`<<PII_EMAIL_QWERTYUI_1>>` umjesto `[EMAIL_REDACTED]`, podjednako za ugrađena, validirana
(GDPR/POPIA) i prilagođena pravila. Nonce se sastoji od 8 nasumičnih velikih slova po
zahtjevu, a ista vrijednost dobija isti token unutar zahtjeva. Samo masker kreira tokene:
zaštita od prompt injectiona i `/api/guardrails/test` rade bez trezora i zadržavaju
rezervisana mjesta.

- Provider, svaki korak kombinacije, pokušaj ponavljanja, član fuzionog panela i fuzioni sudija
  vide samo tokene. Tokeni se vraćaju jednom, na 2xx odgovoru koji napušta
  `handleChat`: po polju u parsiranom SSE-u (token podijeljen između događaja i dalje se
  razrješava; argumenti poziva alata su JSON-escapeovani) ili po polju u JSON tijelu,
  uz ponovni izračun `Content-Length`. Sadržaj i tekst razmišljanja, kao i argumenti poziva
  alata, se vraćaju. Tijela grešaka (4xx/5xx) zadržavaju tokene.
- Greške ostaju privatne: ako kreiranje tokena ne uspije ili trezor odbije vrijednost
  (1000 unosa, 256 znakova po vrijednosti, ukupno 64 KB), umjesto toga se upisuje
  rezervisano mjesto; token koji trezor ne može razriješiti ili vraćanje koje ne uspije
  ostaje doslovno, a bilježi se samo broj. Trezor ne koristi tajmere niti globalno stanje;
  briše se kada se tok odgovora završi, otkaže ili dođe do greške.
- Kada je zahtjev kreirao tokene, ekstrakcija memorije, čuvanje idempotentnosti i oba upisa u
  semantički keš se preskaču, jer nijedan kasniji zahtjev ne bi mogao razriješiti te tokene.
  U zapisima poziva zahtjev i odgovor providera sadrže tokene; zapisano tijelo zahtjeva
  klijenta i dalje je sirovi ulaz klijenta, kao i kod obične redakcije.
- Tokeni koriste nasumični nonce po zahtjevu, pa se prefiks prompta mijenja pri svakom
  potezu: keširanje prompta na strani providera ne pogađa maskirane poteze, a token koji se
  vrati u kasnijem potezu (naprimjer putem `previous_response_id`) pripada starom zahtjevu
  i ostaje doslovan.

#### Odabir po tipu, prilagođeni obrasci i brojači detekcija

**Dashboard → Settings → Security → PII masking** bira _šta_ se maskira. Ne uključuje
maskiranje: za to su i dalje zaduženi `PII_REDACTION_ENABLED` (zahtjev) i
`PII_RESPONSE_SANITIZATION` (odgovor + SSE), a oba su podrazumijevano isključena.

- **Odabir po tipu** — ugrađeni identifikatori navedeni su u
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Ako vrijednost nije postavljena,
  obuhvaćen je svaki tip (ponašanje prije uvođenja ove postavke). Obrazac `ssn_us` u
  mehanizmu zahtjeva mapira se na `ssn`. Predlošci (Minimal, Standard, Financial,
  Brazilian, USA, GDPR, POPIA, Full) samo popunjavaju potvrdne okvire u korisničkom
  interfejsu.
- **GDPR i POPIA identifikatori** — dvanaest ugrađenih identifikatora koji obuhvataju lične
  identifikatore iz EU i Južne Afrike (tabela u nastavku). Njihovi regularni izrazi,
  validatori i oznake jurisdikcije nalaze se u jednoj tabeli,
  `src/shared/utils/piiPatterns.ts`, koju koriste i sanitizer odgovora
  (`src/lib/piiSanitizer.ts`) i masker zahtjeva (`src/shared/utils/inputSanitizer.ts`).
  Podudaranje se rediguje samo kada ga validator prihvati; niz cifara bez dodatnog konteksta
  nikada nije dovoljan. Operator koji je sačuvao suženi odabir prije nego što su ovi
  identifikatori postojali zadržava dotadašnje ponašanje sve dok se novi identifikatori ne
  označe.
- **Prilagođeni obrasci** — najviše 20 regex ili wildcard obrazaca (`*` = najviše 64 znaka
  koji nisu razmak, `?` = jedan znak). Podudaranja postaju `[CUSTOM_REDACTED]`.
  Svaki obrazac prolazi kroz `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): najviše 500 znakova, zastavice ograničene na
  `g i m s u`, mora se kompajlirati, mora proći `safe-regex` (katastrofalno vraćanje unazad)
  i ne smije odgovarati praznom nizu niti rezervisanom mjestu za redakciju. Obrazac koji ne
  prođe odbija se pri čuvanju i testiranju, a sačuvani red koji ne prođe preskače se tokom
  izvršavanja umjesto da se kompajlira. Prilagođeni obrasci se izvršavaju samo dok je
  maskiranje uključeno.
- **Brojači detekcija** — brojevi po tipu (nikada podudarene vrijednosti), čuvaju se u
  memoriji i resetuju pri ponovnom pokretanju (`src/lib/pii/piiDetectionStats.ts`). Uvećavaju
  se samo dok je maskiranje uključeno.

Postavke se čuvaju u tabeli `key_value` (namespace `pii_settings`,
`src/lib/db/piiSettings.ts`) i čitaju kroz keš od 1 s. API:

| Metoda | Putanja                  | Svrha                                                                           |
| ------ | ------------------------ | ------------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stanje zastavice, `enabledTypes`, `customPatterns`, brojači detekcija           |
| `PUT`  | `/api/settings/pii`      | Zamijeni `enabledTypes` (`null` = svi) i/ili `customPatterns`                   |
| `POST` | `/api/settings/pii/test` | Probno izvršavanje jednog obrasca nad uzorkom od najviše 8 KB; ništa se ne čuva |

Sva tri zahtijevaju autentifikaciju za upravljanje i validiraju tijelo pomoću Zoda
(`src/shared/validation/schemas/piiSettings.ts`). Kada je prijava onemogućena
(`requireLogin=false`), `GET` i krajnja tačka za testiranje su otvoreni, ali `PUT` i dalje
zahtijeva sesiju dashboarda, API ključ sa opsegom `manage`, pristupni token `oma_` sa
opsegom za pisanje ili višim nivoom, odnosno CLI token ili token internog servisa poslan
sa loopback adrese.

#### GDPR (EU) i POPIA (Južna Afrika) identifikatori

| Id                  | Identifier                  | Validation                                                                           |
| ------------------- | --------------------------- | ------------------------------------------------------------------------------------ |
| `iban`              | IBAN                        | Poznata država, tačna dužina za tu državu, ISO 13616 MOD-97-10                       |
| `eu_vat`            | EU PDV broj                 | Poznat prefiks države članice i format broja te države (bez VIES provjere)           |
| `es_dni_nie`        | Španski DNI / NIE           | Kontrolno slovo (vrijednost mod 23); NIE je `X/Y/Z` + 7 cifara                       |
| `it_codice_fiscale` | Italijanski Codice Fiscale  | Kontrolno slovo iz tabela za neparne/parne pozicije                                  |
| `pl_pesel`          | Poljski PESEL               | Ponderisana kontrolna suma i kodirani datum rođenja koji postoji                     |
| `nl_bsn`            | Holandski BSN               | Pravilo 11 (težine 9..2, -1)                                                         |
| `de_steuer_id`      | Njemački Steuer-ID          | ISO 7064 Mod 11,10, uz pravila strukture cifara (bez početne 0)                      |
| `se_personnummer`   | Švedski personnummer        | Luhn nad posljednjih deset cifara i vjerovatan datum rođenja (10 ili 12 cifara)      |
| `za_id`             | Južnoafrički ID broj        | Luhn nad svih 13 cifara, važeći mjesec/dan rođenja, cifra državljanstva 0 ili 1      |
| `za_phone`          | Južnoafrički telefon        | Prefiks `+27` / `27`, ili nacionalni oblik `0..` napisan s razmakom ili crticom      |
| `za_vat`            | Južnoafrički PDV broj       | 10 cifara koje počinju s `4` **i** "VAT" / "BTW" u prethodnih 48 znakova             |
| `za_tax_ref`        | Južnoafrička poreska oznaka | 10 cifara koje počinju s `0`-`3`, Luhn, **i** "tax" / "SARS" u prethodnih 48 znakova |

Budući da se formati koji sadrže samo cifre podudaraju s brojevima narudžbi, brojevima
izgradnje i vremenskim oznakama, najslabiji (`za_vat`, `za_tax_ref`) zahtijevaju
ključnu riječ, a samostalan desetocifreni broj `0..` ne tretira se kao južnoafrički
broj telefona. IBAN-ovi s razmacima (`GB29 NWBK ...`) se ne podudaraju. Na putanji
za streaming ključna riječ se traži samo unutar trenutnog isječka. ID-ovi se nalaze
ispred općih obrazaca telefonskih brojeva, tako da validirani identifikator zadržava
svoj vlastiti placeholder
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). Predlošci `gdpr` i `popia`
odabiru EU i južnoafričke ID-ove. Samo maskiranje ostaje opcionalno (Hard Rule #20):
ništa ovdje ne mijenja podrazumijevanu vrijednost zastavice funkcije.

### Ubrizgavanje upita (`promptInjection.ts`)

Otkriva protivničke strukture u sadržaju koji je dostavio korisnik i primjenjuje
konfigurisanu politiku. Ponašanje je određeno varijablama okruženja i opcijama
konstruktora:

| Setting         | Env var                                                                                               | Default | Effect                                                                                                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Omogućeno       | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | Kada je `false`, zaštitni mehanizam se odmah prekida.                                                                                                                                                          |
| Način           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Politika ubrizgavanja: `block`, `warn` ili `log`. (`redact` je prihvaćen radi kompatibilnosti unazad, ali **ne** uklanja tekst ubrizgavanja; prepisivanje PII-ja zahtjeva kontroliše `PII_REDACTION_ENABLED`.) |
| Prag blokiranja | Opcija `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Minimalna ozbiljnost potrebna za blokiranje. Srednja ozbiljnost se pri podrazumijevanoj vrijednosti samo prati.                                                                                                |

**Prioritet načina** (`getMode`): pozivaočev `options.mode` →
`INJECTION_GUARD_MODE` **DB zamjena zastavice funkcije** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Zamjena na dashboardu stoga ima prednost nad varijablama okruženja, pa
korisnički interfejs Feature Flags uživo kontroliše aktivni zaštitni mehanizam
(bez ponovnog pokretanja). Čitanje iz DB-a je bezbjedno u slučaju greške:
ako dođe do greške, zaštitni mehanizam se vraća na ponašanje zasnovano na env
varijablama, a kada zamjena nije postavljena, ponašanje je identično rješavanju
samo na osnovu env varijabli.

Izvori detekcije:

1. `sanitizeRequest()` iz `@/shared/utils/inputSanitizer` (zajednički skup detektora
   koji se koristi i drugdje u cjevovodu).
2. Ugrađeni `DEFAULT_GUARD_PATTERNS` (trenutno `system_override_inline` i
   `markdown_system_block`, oba s ozbiljnošću `high`).
3. Opcionalni `customPatterns` proslijeđen kroz opcije konstruktora (stringovi, regularni izrazi
   ili zapisi oblika `{ name, pattern, severity }`).

Kada je `mode === "block"` **i** najmanje jedna detekcija dostiže prag ozbiljnosti,
`preCall` vraća `{ block: true, message: "Request rejected:
suspicious content detected" }`. U načinima `warn`/`log` zaštitni mehanizam bilježi
događaj, ali dozvoljava poziv. Zajednička pomoćna funkcija
`evaluatePromptInjection()` takođe se izvozi za pozivače kojima je potrebna
procjena upita bez prolaska kroz registar.

**Granica skeniranja (v3.8.20):** detektor provjerava samo **prvih 16 KB** spojenog teksta upita — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajta) u
`src/shared/utils/inputSanitizer.ts`. I `detectInjection()` i
`evaluatePromptInjection()` primjenjuju `slice(0, MAX_INJECTION_SCAN_BYTES)` prije
pokretanja petlje obrazaca. Direktive za ubacivanje nalaze se pri vrhu ulaza, pa se
time ograničavaju CPU/GC troškovi regexa na sadržajima od više stotina KB bez slabljenja detekcije (up. #3932, #4041).

### Masker vjerodajnica (`credentialMasker.ts`)

Pokreće se u **obje** faze, posljednji u zadanom lancu (prioritet `95`). Uklanja dobro poznate obrasce API ključeva / tajnih tokena iz odlaznog sadržaja (sadržaj poruke, argumenti poziva alata, rezultati alata) **i** odgovora pružatelja, tako da vjerodajnica zalijepljena u upit (ili vraćena u rezultatu alata) ne bude otkrivena uzvodnom pružatelju niti klijentu.

- **Isključivo uz eksplicitno uključivanje**, prema istoj konvenciji kao redigovanje PII-ja (blisko Pravilu #20): onemogućeno je osim ako je `settings.credentialRedactionEnabled === true` **ili** `CREDENTIAL_REDACTION_ENABLED=true`. Kada je isključeno, zaštitna kontrola je bez dejstva — nikada ne blokira niti išta prepisuje.
- `redactCredentials()` prolazi kroz cijelo stablo sadržaja/odgovora (`walkValue()`, sigurno u odnosu na zagađivanje prototipa, sigurno za cikluse putem `WeakSet`) i zamjenjuje podudaranja rezervisanim tekstom `[REDACTED:<type>]`, klonirajući samo grane koje su stvarno izmijenjene.
- `CREDENTIAL_PATTERNS` obuhvata ključeve LLM pružatelja (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokene (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), platne ključeve (Stripe, Square), ključeve usluga u oblaku (AWS pristupni ključ, Twilio, SendGrid, Mailgun), privatne ključeve / JWT-ove, nizove za povezivanje koji sadrže vjerodajnice (`mongodb://user:pass@...`, itd.) i generički obrazac vrijednosti zaglavlja
  `Authorization`/`x-api-key`/`api-key`/`apikey`. Ključevi u obliku zaglavlja (`authorization`, `x-api-key`, `api-key`,
  `apikey`) rediguju se strukturno (samo vrijednost, uz očuvan prefiks sheme poput
  `Bearer `/`Basic `), a ne putem generičkog tekstualnog regexa.
- Zaštitna kontrola nikada ne blokira; samo prepisuje (`modifiedPayload` /
  `modifiedResponse`) i dodaje oznake (`meta.credentialsRedacted`, `meta.count`).

Regresiona zaštita: `tests/unit/credential-masker-guardrail.test.ts`.

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
`open-sse/handlers/chatCore.ts` (rute iz porodice chat navedene u odjeljku
[Obuhvat i ograničenja](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` iz API ključa, tijela i zaglavlja formira listu za preskakanje.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` pokreće zaštitna pravila redoslijedom rastućeg prioriteta:
   - Onemogućena zaštitna pravila evidentiraju se kao `skipped`.
   - `preCall` svakog zaštitnog pravila može izmijeniti sadržaj putem `modifiedPayload`.
   - Prvi rezultat `block: true` prekida lanac i rukovalac vraća odgovor o odbijanju zbog zaštitnog pravila.
3. (Potencijalno izmijenjeni) sadržaj prosljeđuje se usmjeravanju kombinacija i slanju prema upstream servisu.
4. **Samo za ne-streaming zahtjeve:** nakon sastavljanja odgovora,
   `guardrailRegistry.runPostCallHooks(...)` pokreće isti lanac nad odgovorom. `block: true` ovdje odbacuje upstream odgovor i vraća HTTP 400. Streamovani odgovori u potpunosti preskaču ovaj korak.
5. **Samo za reverzibilni vault:** kada zahtjev izda tokene, `handleChat`
   vraća tokene u 2xx odgovoru koji vraća, nakon post-call hookova i transformacije PII-ja pri streamovanju, tako da `PII_RESPONSE_SANITIZATION` vidi tokene i PII koji je generisao model, a nikada vraćeni original.

Zaštitna pravila koja generiraju izuzetke evidentiraju se uz `error: <message>` i bilježe putem `logger.warn`, ali lanac se nastavlja — namjerno ponašanje u slučaju greške je fail-open.

## Pokrivenost i ograničenja

Registar zaštitnih mehanizama povezan je samo s chat cjevovodom. Ova ograničenja
definisana su u testovima `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` i
`tests/unit/guardrail-pipeline-characterization.test.ts`; namjerno ažurirajte te
testove kada se ponašanje promijeni.

### Gdje se pokreću hookovi

| Hook / kontrola                                   | Pokreće se na                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                                 | Zahtjevima koje obrađuje `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (i `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` i Telegram chat proxy. Također testnom endpointu nadzorne ploče `/api/guardrails/test`. Blokada prije poziva vraća HTTP 400. |
| `runPostCallHooks`                                | Samo **ne-streaming** chat odgovorima (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Streamovani odgovori nikada ne dosežu ovaj hook.                                                                                                                                                                                                                                                                                      |
| Streaming PII                                     | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), koji se prosljeđuje kroz `streamingPipeline.ts` kada je `PII_RESPONSE_SANITIZATION` uključen. To nije zaštitni mehanizam, pa kanali za onemogućavanje ne utiču na njega.                                                                                                                                                                                              |
| Reverzibilni PII trezor                           | Zahtjevima koje obrađuje samo `handleChat`, kada su `PII_REDACTION_ENABLED` i `PII_REVERSIBLE_VAULT_ENABLED` uključeni. Tokene izdaje `pii-masker` prije poziva, a obnavljaju se pri izlasku iz `handleChat` (`src/lib/pii/requestTokenVaultScope.ts`). Onemogućavanje `pii-masker` za zahtjev znači da se ništa ne izdaje.                                                                                                         |
| Middleware za zaštitu od ubacivanja (naslijeđeni) | Svakoj `/v1` ruti koja sadrži prompt, uključujući chat porodicu (pogledajte [pokrivenost ruta](#injection-guard-route-coverage--red-team-phase-8--block-d)). Samo ubacivanje prompta.                                                                                                                                                                                                                                               |

### Šta nije pokriveno

- **Mediji, embeddings i rute za podatke** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) nikada ne dosežu registar. Tamo se
  ne izvršava maskiranje PII-ja, maskiranje vjerodajnica niti most za modalitete. Njihova
  jedina provjera je naslijeđeni middleware za zaštitu od ubacivanja.
- **Streamovani odgovori** ne dobijaju zaštitne mehanizme nakon poziva: nema
  `pii-masker` niti `credential-masker` nakon poziva i nema blokade nakon poziva. Primjenjuje
  se samo transformacija PII-ja za streaming (kada je `PII_RESPONSE_SANITIZATION` uključen). Vjerodajnica
  ponovljena u streamovanom odgovoru neće biti redigovana.
- **Kanali za onemogućavanje u odnosu na middleware (namjerno):** middleware procjenjuje
  ubacivanje prompta vlastitim pozivom funkcije `evaluatePromptInjection()`, bez prosljeđivanja
  liste za onemogućavanje kojom upravlja pozivalac. Režim `block` je obavezna granica koju
  onemogućavanja kojima upravlja pozivalac ne mogu zaobići, uključujući rute chat porodice
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Onemogućavanje
  `prompt-injection` samo preskače zaštitni mehanizam registra.

### Šta vidi odgovor prije izvršavanja nakon poziva

Na putanji bez streaminga redoslijed je: izdvajanje memorije → izvršavanje ugrađenih alata → zaštitni mehanizmi nakon poziva → izlaz nakon blokade poziva → pohrana u semantički keš.

- **Izdvajanje memorije** i **izvršavanje alata** vide odgovor prije nego što ga zaštitni mehanizmi
  nakon poziva mogu izmijeniti ili blokirati. Od
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), izdvajanje
  memorije provlači izdvojeni tekst kroz `sanitizePII` kada je
  `PII_RESPONSE_SANITIZATION` uključen (i za streaming i bez streaminga), ali odgovor
  koji se naknadno blokira nakon poziva već je ponuđen memoriji i alatima.
- **Semantički keš** pohranjuje odgovor nakon poziva, pa pohranjuje izmijenjeni odgovor, a
  blokirani odgovor se nikada ne kešira. Unosi keša indeksiraju se po API ključu.

## Konfiguracija

Varijable okruženja koje čitaju ugrađeni zaštitni mehanizmi:

| Varijabla                             | Koristi je                 | Efekat                                                                                                                  |
| ------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Postavite na `false` da biste u potpunosti onemogućili detekciju.                                                       |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Pravila za injekcije: `warn`, `block` ili `log`. Naslijeđena vrijednost `redact` ne prepisuje tekst injekcije.          |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Režim zaštite od injekcija; ujedno i oznaka funkcije u bazi podataka koja **nadjačava** varijable okruženja (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Minimalna ozbiljnost koju `MODE=block` odbija: `high` (podrazumijevano), `medium` ili `low`.                            |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Naslijeđeni alias za `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                 |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Kada je `true`, PII podataka zahtjeva se uklanja (nezavisno od režima injekcije).                                       |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Uz `PII_REDACTION_ENABLED`, generišu se reverzibilni tokeni i vraćaju u 2xx odgovorima.                                 |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (nizvodno)    | Kontroliše ponašanje maske na strani odgovora.                                                                          |

Zaštitni mehanizmi Modality Bridgea čitaju konfiguraciju tokom izvršavanja iz skladišta
postavki podržanog bazom podataka (`getSettings()`), a ne iz varijabli okruženja. Primarni ključevi za Vision su
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` i
`modalityBridgeCacheMaxEntries`. Naslijeđeni ključevi
`visionBridge*` prihvataju se samo kao dokumentovani rezervni mehanizam pri čitanju tokom jednog ciklusa;
upisi s kontrolne ploče koriste primarne ključeve. Podrazumijevane vrijednosti i razrješivač rezervnog mehanizma nalaze se u
`src/shared/constants/modalityBridgeDefaults.ts`, dok su naslijeđene
konstante zadržane u `src/shared/constants/visionBridgeDefaults.ts`.

Audio koristi `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` i `modalityBridgeAudioMaxClips`, kao i dijeljene
postavke `modalityBridgeCache*`. Audio nema rezervni mehanizam za naslijeđene ključeve jer su ovi
ključevi uvedeni sa šemom Modality Bridgea.

Video koristi `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` i
`modalityBridgeVideoTimeout`, kao i dijeljene postavke `modalityBridgeCache*`.
Podrazumijevano je onemogućen jer su FFmpeg/ffprobe opcionalne operativne
zavisnosti, a dodavanje opisa kadrova uvodi kašnjenje i trošak modela.

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
