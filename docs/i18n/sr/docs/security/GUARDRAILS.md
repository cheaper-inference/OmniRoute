# Guardrails (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Izvor istine:** `src/lib/guardrails/`
> **Poslednje ažuriranje:** 2026-10-17 — v3.8.52 (dodato [Pokrivenost i ograničenja](#coverage-and-limits):
> koje rute i putanje odgovora hook-ovi dosežu, objedinjena zaglavlja za onemogućavanje (#16412),
> režim blokiranja injekcije kao obavezna granica (#16413), i šta vidi odgovor pre post-call faze)

Guardrails nameću bezbednosna, policy i sadržajna pravila transformacije na granici
između OmniRoute i upstream provajdera. Svaki guardrail može da pregleda (i opciono
odbije, transformiše ili anotira) payload-e zahteva (`preCall`) i upstream odgovore
(`postCall`).

Sistem je **fail-open**: ako guardrail baci grešku tokom izvršavanja, registar
beleži grešku i nastavlja sa sledećim guardrail-om umesto da obori zahtev.
Blokiranje je eksplicitna odluka (`block: true`), nikad slučajnost. Jedini izuzetak
je prekinut zahtev: kada je `signal` pozivaoca prekinut, guardrail koji baci grešku
odbija izvršavanje hook-a umesto da bude preskočen.

Hook-ovi se **ne** izvršavaju na svakoj ruti niti na svakom odgovoru. Pročitajte
[Pokrivenost i ograničenja](#coverage-and-limits) pre nego što se oslonite na
guardrail kao bezbednosnu kontrolu.

## Ugrađeni guardrail-i

Registar automatski učitava šest guardrail-a po prioritetnom redosledu pri import-u
(vidi `registry.ts` → `registerDefaultGuardrails()`):

| Prioritet | Naziv               | Faza(e)        | Fajl                  |
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
`supportsVision:false` metapodatke u registru/specifikaciji. GLM 5.3 Flash varijante
ostaju modeli sa nativnom podrškom za vid. Ruta `/v1/messages` u Claude Code ulazi u
zajednički `handleChat` pre-call lanac guardrail-a **pre** Claude-to-OpenAI
translacije; ugnježdene slike iz `Read` tool-result-a moraju biti opisane ili
obrađene pre nego što ta translacija prebaci njih u OpenAI `image_url` sadržaj
(#17069).

Presreće zahteve koji nose slike, usmerene ka **modelima bez podrške za vid**, i ili
preusmerava ceo zahtev na model sa podrškom za vid ili zamenjuje delove sa slikama
tekstualnim opisima koje proizvodi podesivi vision model pre upstream poziva. Ovo
omogućava provajderima koji podržavaju samo tekst da transparentno obrađuju
multimodalne payload-e.

Tok:

1. Preskoči ako ciljni model već podržava vid (osim ako se pojavljuje u listi
   prisilnog mosta `isVisionBridgeForcedModel`).
2. Izdvoji delove sa slikama pomoću `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), koji delegira **unificiranom detektoru medija**
   `detectMediaParts()` u `open-sse/utils/mediaParts.ts` — jedinom izvoru istine
   deljenom sa combo filterom kompatibilnosti. Ekstrakcija je ograničena
   allowlist-om na oblike koje `replaceImageParts` može da vrati nazad (ugovor
   extract↔replace): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`,
   Anthropic URL `source.type:"url"` i Responses API `input_image`. Podudarajuće
   slike ugnježdene unutar Claude Code `tool_result.content` i Responses tool izlaza
   takođe se izdvajaju i zamenjuju na svojim originalnim putanjama; oblici koji su
   samo indikatori predviđeni su za combo filter i ne izdvajaju se. Preskoči ako
   nijedna nije pronađena.
3. Razreši runtime konfiguraciju pomoću `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): novi `modalityBridge*`
   ključevi podešavanja imaju prednost; zastareli `visionBridge*` ključevi ostaju
   **fallback za jedan ciklus** (prozor za povratak). Preskoči pre bilo kakvog
   prolaska kroz medije kada je most onemogućen.
4. Selektor režima (`modalityBridgeVisionMode`, vidi tabelu ispod) odlučuje između
   preusmeravanja i opisivanja. Preusmeravanje vraća `modifiedPayload` samo sa
   zamenjenim `model`, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Putanja opisivanja: ograniči slike na `maxImages`, sastavi prompt prilagođen
   zadatku, konsultuj keš opisa, pozovi vision model **paralelno**
   (`Promise.allSettled`) i ubaci `[Image N]: <description>` tekstualne delove na
   njihovo mesto. Neuspelo opisivanje daje `null`: sirova slika se čuva za
   nepoznate ciljeve ili ciljeve sa podrškom za vid (#4012), ali **potvrđen
   direktan cilj koji podržava samo tekst** ili combo bez ijednog vision modela
   dobija eksplicitni tekstualni stub
   `(unavailable — no vision-capable provider connected)` za svaku neopisanu sliku,
   uključujući delimične neuspehe i slike preko ograničenja describe poziva
   (#17069). Postojeći fallback za combo opisivanje kada svi neuspu ostaje na snazi
   (#8430).
6. Vrati `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selektor režima (`modalityBridgeVisionMode`)

| Режим      | Подразумевано | Понашање                                                                                                                                                                                                                                                                                           |
| ---------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔             | Наслеђена хеуристика, непромењена (#6640/#7204): модели који нису combo/`auto/` се преусмеравају на најбољи vision модел осим ако оригинални модел већ има употребљиве креденцијале (тада describe); combo циљеви увек извршавају describe.                                                        |
| `describe` |               | Увек describe — блок за преусмеравање се у потпуности прескаче; модел који је корисник изабрао увек одговара.                                                                                                                                                                                      |
| `reroute`  |               | Принудно преусмеравање: заштита задржавања модела са креденцијалима се заобилази. Заштита креденцијала **циља** преусмеравања и даље важи — када не постоји употребљив vision циљ, мост блокира са јасном грешком уместо да изврши describe или пошаље сирове слике циљу који подржава само текст. |

Принудни режими прекидају извршавање **пре** него што се auto хеуристика покрене; понашање режима `auto` бајт-по-бајт је идентично guardrail-у пре PR-1.

#### Опсег API кључа (`visionBridgeKeyScope.ts`)

Када API кључ позиваоца ограничава `allowedConnections`, базене квота
(`allowedQuotas`) или моделе (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), мост бира само
reroute и describe моделе које кључ сме да користи, на конекцијама које кључ
сме да користи. Describe позив затим увек пролази кроз OmniRoute self-loop са
заглављем `x-omniroute-self-loop-key-id`, тако да примљени chat захтев поново
спроводи политику конекција и модела тог кључа. `enforceApiKeyPolicy()`
поштује то заглавље само заједно са self-loop bearer-ом, тако да може само да
сузи приступ, а id који се не разрешава се одбија.

Ако ниједан vision модел није дозвољен за кључ, **потврђен циљ који подржава
само текст** одбија захтев са сликом локално са јасним HTTP 400 уместо да
прослеђује бајтове слике ка upstream-у који није способан (#17069). За циљеве
са непознатом или нативном vision способношћу, describe путања задржава своје
претходно fail-open понашање (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Захтеви без кључа, и кључеви без ових ограничења, понашају се потпуно исто као
и пре.

#### Describe промпт свестан задатка (`modalityBridgeVisionTaskAware`)

Подразумевано **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) додаје
текст **последње корисничке поруке** (одсечен на 500 карактера) на основни
describe промпт, усмеравајући опис ка ономе што је корисник заиста питао
(codex-vision-proxy образац) и тражећи од vision модела да транскрибује
видљиви текст. Када је заставица искључена — или нема корисничког текста —
основни промпт се користи непромењен.

Сопствени OpenAI-компатибилни захтев describe self-loop-а (`callVisionModelSingle()`
у `visionBridgeHelpers.ts`) увек захтева `image_url.detail: "high"` —
безусловно, за сваког позиваоца/провајдера, без условљавања било каквим
клијентским сигналом. Узорковање са ниским нивоом детаља погоршава OCR тачност
управо за задатак транскрипције текста који овај промпт тражи, тако да сам
describe позив увек тражи висок ниво детаља без обзира на то који ниво детаља
је оригинални долазни захтев користио. Ово утиче само на тело интерног
describe захтева; не мења начин на који OmniRoute прослеђује сопствени
`image_url.detail` позиваоца на примарном захтеву — та подразумевана вредност
се примењује одвојено, и само за детектоване OpenCode клијенте, у
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Anthropic
wire-format грана describe self-loop-а нема поље `detail` и није под утицајем
ниједне од подразумеваних вредности.

#### Ограничење describe излаза (`modalityBridgeVisionMaxChars`)

| Кључ                           | Подразумевано | Опсег             |
| ------------------------------ | ------------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`           | `0` или 100–50000 |

`0` (подразумевано) значи **без ограничења** — опис који враћа
`callVisionModel()` се прослеђује неизмењен, чувајући постојеће понашање.
Било која вредност у опсегу 100–50000 скраћује опис са суфиксом `…` пре него
што се уметне назад као `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` у `src/lib/guardrails/visionBridge.ts`).
Повећајте ово за OCR задатке богате детаљима где downstream моделу треба пуна
транскрипција; смањите га да бисте ограничили потрошњу токена код причљивих
vision модела. Поље на контролној табли се налази на Advanced панелу Vision
картице (`modality-bridge-max-chars` у `ModalityBridgeVisionTab.tsx`) и сваку
вредност између 1 и 99 подиже до доње границе од 100, док експлицитну `0`
оставља нетакнутом — `0` је важећа Zod вредност сама по себи
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), а не само
„неподешена" подразумевана вредност.

#### Describe кеш (`modalityBridge/bridgeCache.ts`)

LRU + TTL кеш у меморији за describe излазе, дељен у оквиру целог процеса.
Кључ = `sha256(imageRef + composedPrompt + configuredBridgeModel)` са
length-prefix framing-ом (без колизија на границама поља). Компонента модела
је **конфигурисани** модел моста, а не модел који је заиста одговорио —
`callVisionModel` може интерно да пређе на резервни модел, а кључевање по
покушају би фрагментисало кеш. Неуспешни describe позиви се никада не
кеширају. Подешавања:

| Кључ                            | Подразумевано | Опсег   |
| ------------------------------- | ------------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`        | —       |
| `modalityBridgeCacheTtlMinutes` | `60`          | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`         | 10–5000 |

#### Normalizacija udaljenih slika (self-loop describe/base64 preuzimanje)

Kada most sam preuzme **udaljenu** sliku — Anthropic describe samopoziv i konverzija u claude-wire-format base64 (`ensureBase64ImagesForClaudeWire`), obe preko `fetchRemoteImageAsDataUri()` u `visionBridgeHelpers.ts` — rezultujući data URI se prosleđuje kroz `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) pre ugrađivanja u zahtev vision modela. Prevelike slike se smanjuju na **dužu ivicu od 2048px** (što odgovara ograničenju promene veličine koje OpenAI/Anthropic već primenjuju na serverskoj strani), što smanjuje bajtove/latenciju otpremanja bez promene onoga što vision model vidi. Promena veličine koristi `sharp`, učitan dinamičkim importom: na platformi gde se njegov nativni binarni fajl ne učita, `normalizeDataUri()` **nikada ne baca izuzetak** — vraća se na passthrough originalnih bajtova, tako da putanja describe/base64-konverzije uvek nastavlja da radi. Bajtovi koji nisu slika (preuzimanje koje nije vratilo dekodirajuću sliku) takođe prolaze netaknuti. Ova normalizacija je ograničena na slike koje most preuzima za sopstveni samopoziv — nikada se ne primenjuje na sirovi passthrough payload pozivaoca, u skladu sa principom izmena isključivo po pristanku (opt-in-only) (Strogo pravilo #20).

#### Šema podešavanja + migracija

Novi `modalityBridge*` ključevi se validiraju Zod-om u `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*` i grupa `modalityBridgeAudio*` koju koristi Audio Bridge. Migracija `141_modality_bridge_settings.sql` kopira postojeće zastarele (legacy) `visionBridge*` vrednosti u odgovarajuće nove ključeve (idempotentno, nikada ne prepisuje vrednost `modalityBridge*` koju je postavio operator); zastareli ključevi ostaju prihvaćeni kao rezervna opcija pri čitanju (read fallback) tokom jednog ciklusa izdanja.

#### Zaglavlje transparentnosti + statistika

Odgovori transformisani describe-om nose `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (gradi ga `buildModalityBridgeHeader()` u `modalityBridge/bridgeStats.ts`, utiskuje `withModalityBridgeHeader()` u `src/sse/handlers/chatHelpers.ts`). Preusmereni zahtevi **nemaju** zaglavlje — payload je netaknut, a zamena modela je već vidljiva u polju `model` tela odgovora.

`GET /api/modality-bridge/stats` (management autentifikacija, isti nivo kao `GET /api/settings`) vraća brojače po modalitetu u memoriji `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` za `vision`, `audio` i `video`. `averageLatencyMs` koristi `latencySamples`, a ne sve pokušaje, kao imenilac; operacija bez merenja vremena ne fabrikuje uzorak od nula milisekundi. `bridged` ostaje unazad kompatibilan pseudonim za uspešne konverzije; neuspešni pokušaji ga ne uvećavaju. Brojači se po dizajnu resetuju pri restartovanju procesa (telemetrija, a ne knjigovodstvo).

#### Konfiguracija kontrolne table

Namenska stranica kontrolne table je `/dashboard/settings/modality-bridge`. Njeni URL-adresabilni tabovi `Vision`, `Audio` i `Video` čuvaju upitne (query) parametre pri promeni vrednosti `tab`. Tab Vision izlaže omogućavanje, režim, izbor modela (uključujući automatski podrazumevani), task-aware promptovanje, napredna ograničenja za timeout/broj slika/dužinu opisa/keš, runtime brojače i zaštićen probni zahtev. Tab Audio je takođe aktivan: izlaže omogućavanje, birač modela samo za STT sa opcijom Auto, ograničenja za timeout/maksimalnu dužinu klipa, audio brojače i probni test `input_audio`. Tab Video je funkcionalan: prijavljuje runtime stanje FFmpeg/ffprobe — jedno od četiri eksplicitna UI stanja (`unknown` dok je provera u toku ili nije mogla da se završi, `restricted` na hostu kontrolne table koji nije loopback, gde se provera preskače na klijentskoj strani, `unavailable` kada je provereno i potvrđeno da nedostaje, ili `available` sa verzijama FFmpeg/ffprobe) — trajno čuva ograničenja za uključivanje/model/broj frejmova/video/timeout, filtrira birač modela na modele sposobne za vizuelni ulaz i izlaže video brojače.

Bivša kartica Vision Bridge u AI podešavanjima je kompatibilnosni link ka novoj stranici; više ne poseduje drugu kopiju obrasca. Media Providers takođe povezuje Image-to-Text i Speech-to-Text tokove rada sa odgovarajućim tabovima Modality Bridge bez uklanjanja postojećeg Speech-to-Text playground-a.

**Zaobilaženje kontrole pristupa za self-loop:** kada se describe poziv usmerava kroz OmniRoute-ovu sopstvenu `/v1` self-loop petlju (model nestandardnog provajdera), podzahtev šalje `x-omniroute-admission-bypass: internal` i autentifikuje se razrešenim self-loop kredencijalom — lokalnim `sk_omniroute` sentinelom u lokalnom režimu, ili env ključem `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` koji je konfigurisao operator (#1350), tako da deployment-i sa `REQUIRE_API_KEY=true` i dalje mogu da izvrše describe poziv. Zaobilaženje se poštuje samo za te tačne kredencijale, tako da spoljni klijenti ne mogu da koriste zaglavlje da preskoče kontrolu pristupa.

Zastarele podrazumevane vrednosti nalaze se u `src/shared/constants/visionBridgeDefaults.ts`; nove podrazumevane vrednosti za režim/task-aware/keš i resolver podešavanja nalaze se u `src/shared/constants/modalityBridgeDefaults.ts`. Guardrail izlaže opciju konstruktora `deps` kako testovi mogu da ubace lažne (fake) implementacije `getSettings` i `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Presreće chat zahteve koji nose audio pre nego što stignu do odredišta za koje nije poznato da prihvata audio ulaz. Nikada ne preusmerava chat zahtev: audio delovi se transkribuju kroz postojeći OpenAI-kompatibilni multipart endpoint, a izabrani chat model nastavlja sa tekstualnim transkriptima.

Tok:

1. Razrešite `supportsAudio` kroz `getResolvedModelCapabilities()`. Eksplicitni
   metapodaci registra provajdera imaju prednost, zatim statički metapodaci
   modela, a zatim sinhronizovani `modalities_input`. Deklarisana lista ulaza bez
   `audio` daje `false`; bez dokaza o mogućnostima ostaje `null`. I `false` i
   `null` aktiviraju konzervativni most, dok ga `true` zaobilazi.
2. Razrešite `modalityBridgeAudio*` podešavanja i izdvojite audio delove
   najvišeg nivoa koji se mogu odseći iz svake poruke kroz zajednički
   `detectMediaParts()` detektor. Podržani formati na vezi su OpenAI
   `input_audio`, `audio_url` i `source.media_type: "audio/*"`. Ugnježdeni audio
   se detektuje radi rutiranja, ali ga putanja odsecanja ne uklanja. Rad je
   ograničen sa `modalityBridgeAudioMaxClips`; kasniji delovi ostaju nedirnuti.
3. Poštujte konfigurisani `provider/model`, ili dozvolite da
   `selectAudioBridgeModel()` prođe kroz `AUDIO_TRANSCRIPTION_PROVIDERS` u
   stabilnom redosledu kataloga i izabere prvi model sa upotrebljivim aktivnim
   akreditivom provajdera.
4. `callAudioTranscription()` pretvara base64/data-URI audio u multipart
   `file`, ili preuzima udaljeni `audio_url` kroz izlaznu zaštitu ograničenu
   samo na javne adrese, sa DNS pinning-om i granicom od 25 MB. Zatim šalje POST
   zahtev sa fajlom i izabranim modelom ka lokalnoj `/v1/audio/transcriptions`
   self-loop petlji, autentifikovan pomoću `resolveSelfLoopBearer()`. Postojeća
   ruta transkripcije obavlja uobičajeno pretraživanje akreditiva, rukovanje
   cooldown periodom/ograničavanjem brzine i prosleđivanje provajderu.
5. Uspešni pozivi zamenjuju svoje delove sa `[Audio N]: <transcript>`. Pozivi
   se izvršavaju sa `Promise.allSettled`: pojedinačni neuspeh čuva taj
   originalni audio deo (ugovor #4012). Ako svi pozivi ne uspeju i za cilj je
   dokazano `supportsAudio === false`, delovi postaju
   `[Audio N]: (unavailable — no STT provider connected)` (ugovor #8430). Za
   nepoznat cilj (`null`), rezultat u kome su svi pozivi neuspešni ostaje
   nedirnut. Cilj za koji je dokazano da podržava samo tekst, bez upotrebljivog
   STT akreditiva, dobija isti eksplicitni stub bez upućivanja mrežnog poziva.

Uspešne transkripcije koriste LRU/TTL keš Modality Bridge-a na nivou procesa.
Ključ kombinuje referencu na audio, stabilnu oznaku operacije
`audio-transcription` i izabrani STT model; neuspesi se nikad ne keširaju.
Audio pokušaji ažuriraju zajedničke brojače `bridged`, `cacheHits`, `failures`
i `lastUsedAt`. Transformisani odgovori nose
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nedirnuti
zahtevi ne dobijaju segment Audio Bridge-a.

Podešavanja izvršnog okruženja čuvaju se u bazi podataka i validiraju Zod-om:

| Ključ                         | Podrazumevano | Opseg                 |
| ----------------------------- | ------------- | --------------------- |
| `modalityBridgeAudioEnabled`  | `true`        | —                     |
| `modalityBridgeAudioModel`    | `""`          | Automatski ili STT ID |
| `modalityBridgeAudioTimeout`  | `60000`       | 1000–300000           |
| `modalityBridgeAudioMaxClips` | `3`           | 1–10                  |

Zajedničkim kešom i dalje upravljaju `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` i `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Presreće video delove najvišeg nivoa u Chat Completions `messages` i Responses
API `input` pre poziva cilja bez poznate nativne podrške za video. Podržani
oblici su `input_video`, `video_url`, `video_source`, HTTPS URL-ovi i
`data:video/*;base64,...` data URI-jevi. Obična imena fajlova u tekstu se ne
tretiraju kao video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) upravlja prolaskom kroz
zahtev, proverom mogućnosti/politike, agregacijom po zahtevu i sadržajem
odgovora. Rad po videu — pribavljanje, keš celokupnog rezultata, opisivanje
sekvence frejmova (koje objedinjuje svaki audio transkript deklarisan od strane
pozivaoca) i metrike/prekid/čišćenje po pokušaju — sakriven je iza
`processVideoPart` u `videoBridgePipeline.ts`, koji se poziva jednom po video
delu unutar petlje `preCall`. Taj modul takođe definiše eksplicitne granice
portova `VideoMediaBrokerPort` (pribavljanje bajtova i izdvajanje uzorkovanih
frejmova), `VideoAudioTranscriptionPort` (objedinjavanje audio transkripta
deklarisanog od strane pozivaoca sa uzorkovanim opisima) i `VideoDrilldownPort`
(granica perzistencije drill-down analize frejmova; još nije povezana sa
`processVideoPart` — danas samo zasebna ruta
`/api/modality-bridge/video/drilldown` upisuje drill-down zapise).

Javna putanja zahteva `/v1` nikad ne uvozi niti poziva podproces. Udaljeni
videi se preuzimaju uz granicu od 50 MiB; inline base64 videi imaju
konzervativno ograničenje od 36 MiB dekodirane veličine po videu kako bi
omotač modela/poruka/formatiranja mogao da ostane unutar javnog JSON
ograničenja prijema zahteva od 50 MiB. Dužina inline sadržaja i procene
dekodirane veličine proveravaju se pre alokacije. HTTPS je obavezan na početnom
udaljenom URL-u i na svakom preusmerenju, koristeći postojeću izlaznu zaštitu
ograničenu samo na javne adrese sa DNS pinning-om. Bajtovi zatim prelaze tačno
određenu internu granicu brokera `POST /api/modality-bridge/video/extract`. Ta
ruta je istovremeno `LOCAL_ONLY` i `SPAWN_CAPABLE`, prihvata samo zahtev
autentifikovan u okviru procesa sa pouzdane loopback adrese i nikad ne prihvata
URL, putanju fajl sistema, izvršni fajl ili listu argumenata. Pipeline za
veličinu tela API-ja i inkrementalni čitač tela u handleru nezavisno nameću
ograničenje ulaza brokera od 50 MiB. Njegov ograničeni red izvršava jednu
ekstrakciju odjednom, dozvoljava četiri posla na čekanju i ograničava ulaz na
čekanju na 100 MiB.

Unutar brokera, `ffprobe` čita privatnu lokalnu datoteku; fiksna lista dozvoljenih formata isključuje plejliste i formate manifesta. Za dozvoljene kontejnere iz MOV porodice, spoljne reference MOV podataka ostaju podrazumevano onemogućene, a fiksna komanda ih ne uključuje. I `ffprobe` i `ffmpeg` koriste belu listu protokola ograničenu samo na `file`, jednu nit, fiksne nizove argumenata, bez školjke i izvršne datoteke razrešene iz `PATH`-a. Strimovi priloženih slika naslovnica nisu kandidati za reprodukciju. Svi strimovi pogodni za reprodukciju moraju zadovoljiti ograničenja, a eksplicitno podrazumevani strim ima prednost pre determinističke rezervne varijante sa najnižim indeksom. Video zapisi su ograničeni na 600 sekundi, 8.192 piksela po dimenziji i 33.554.432 izvorna piksela. FFmpeg uzorkuje 1–16 JPEG kadrova sredina, smanjuje dužu ivicu na najviše 1.024 piksela bez uvećavanja manjih ulaza i nikada ne dobija URL. Uzorkovanje je podrazumevano `uniform`. Opciona politika `scene_aware` i eksperimentalna `segment_aware` izvode jedan dodatni fiksni FFmpeg prolaz nad već validiranim lokalnim strimom, biraju ograničene vremenske oznake scena iz `showinfo` i deterministički se vraćaju na iste uniformne sredine u slučaju otkaza detektora, isteka vremena, neispravnog izlaza ili praznog skupa kandidata. Režim svestan segmenata raspodeljuje uzorke sredina srazmerno validiranim intervalima scena; dokazi i ponašanje rezervne varijante režima svesnog segmenata detaljno su opisani u nastavku. Stroga granica od 16 kadrova primenjuje se nakon selekcije u svakoj politici. Kada zahtev svestan scena ima budžet od samo jednog kadra, koristi uniformnu sredinu aktivnog celog videa ili prozora fokusa i prijavljuje `policyEffective: uniform`: jedan izabrani kadar scene ne može sačuvati oba vremenska kraja. Pozivalac može opciono navesti konačan prozor fokusa (`start`/`end` sekunde); granice se obrezuju na trajanje medija, obrnuti ili nekonačni prozori se odbijaju, a sve politike uzorkovanja izvode se isključivo unutar normalizovanog intervala. Rezultujući prozor uključen je u metapodatke uzorkovanja i u prefiks nepouzdanog opisa, kako bi nizvodni modeli mogli da razlikuju fokusirani isečak od pune vremenske linije.

Semantički fokus opisa je posebno, eksplicitno podešavanje. Podrazumevani režim analize `full` zadržava postojeći prompt kadra i nikada ne prosleđuje tekst zahteva modelu za opisivanje. U režimu `focused`, most čita samo najnoviji neprazan `text`/`input_text` autorstva korisnika iz istog Chat ili Responses kontejnera, normalizuje ga na NFC, sažima kontrolne znakove i beline i ograničava ga na 500 Unicode kodnih tačaka. Prazan rezultat vraća se na tačan `full` prompt. Upotrebljiva naznaka serijalizuje se kao JSON u namenskom bloku konteksta nepouzdanog korisnika i sme samo da daje prioritet uočljivim detaljima; ne može da poništi posebno upozorenje protiv praćenja instrukcija koje su vidljive ili se čuju u mediju. Tekstualni fokus nikada ne zaključuje `start`/`end` niti menja vremenski uzorkovač.

#### FU-07 strukturni dokazi segmenata

`segment_aware` koristi jedan ograničeni prolaz pretanalize nad već validiranim lokalnim video strimom. Fiksni lanac filtera prvo skalira na najviše 320 piksela širine, detektuje promene scena i zamrznute intervale, a zatim uzorkuje brzinom od 1 kadra u sekundi radi zamućenosti, prosečne lume i prostornih/vremenskih informacija. Prolaz je ograničen na 600 strukturnih uzoraka, jednu nit za FFmpeg/filter, iste bele liste protokola samo za `file` i kontejnera, granicu izlaza procesa od 1 MiB i najviše 30 sekundi unutar zajedničkog prekida/roka brokera. Nikada ne prihvata komandu, filter, putanju ili URL iz zahteva.

Strukturne vrednosti su deterministički dokazi za uzorkovanje, a ne semantičko razumevanje videa. Ne zaključuju subjekte, radnje, opise, govor ili nameru korisnika. Granice scena i zamrzavanja formiraju segmente; pokrivenost zamrzavanjem, zamućenost, ekspozicija, prostorni detalji i vremenske promene utiču samo na to kako se raspodeljuje postojeći budžet od 1–16 kadrova. Potpuno zamrznut segment ograničen je na jedan kadar, dok nezamrznuti segmenti konkurišu za preostali budžet. Kada granica ima više nego kadrova, zadržava se uniformna pokrivenost vremenske linije kako brzi rani rezovi ne bi mogli da sakriju dug završni segment. Granice scena unutar rezolucije analize od 1 sekunde od granice zamrzavanja objedinjavaju se.

Nedostajući filteri, neispravni/prazni dokazi, greška detektora ili ograničeni istek vremena pretanalize rezultiraju otvorenim neuspehom (fail open) ka tačnoj politici uniformnih sredina. Prekid pozivaoca ili rok brokera ne rezultira otvorenim neuspehom: prekida pokrenuti podproces, sprečava kasniju ekstrakciju kadrova, a privatno privremeno stablo uklanja se u `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generiše determinističke prave FFmpeg fiksture za uštede poziva opisivanja nakon deduplikacije, raspodelu budžeta gustog pokreta, dokaze o zamućenosti/ekspoziciji/SI-TI, brze rezove sa dugim repom i lažno pozitivne rezultate postepenog prelaza. Beleži zidno vreme pretanalize i, gde je `/usr/bin/time` dostupan, CPU podprocesa i vršni RSS. Njegove provere kvaliteta su isključivo strukturni orakli. Stvarni kvalitet modela za opisivanje ostaje `HOLD` jer ova okosnica nema ovlašćenu krajnju tačku ni zamrznutog sudiju. Novčane uštede takođe ostaju `HOLD`, osim ako `--caption-cost-per-call-usd` ne obezbedi eksplicitnu pozitivnu procenu po pozivu; skript nikada ne izmišlja nijedan od ta dva rezultata.

Svaki frejm je ograničen na 4 MiB, svi sirovi frejmovi zajedno na 23 MiB, a serijalizovani odgovor brokera na 32 MiB. Privatni privremeni direktorijum se uklanja u bloku `finally`. OmniRoute ne isporučuje FFmpeg u paketu i ne prihvata prilagođenu putanju do izvršnog fajla. Pre opisivanja, most primenjuje konzervativni prolaz vizuelne deduplikacije: svaki JPEG se svodi na bafer sivih tonova 16×16 i poredi se samo sa poslednjim zadržanim frejmom. Za traženi budžet opisa veći od jednog frejma, ekstrakcija obezbeđuje ograničen skup kandidata do dvostruke vrednosti tog budžeta i nikada više od 16 frejmova. Traženo ograničenje se primenjuje tek nakon deduplikacije, pri čemu se prvi i poslednji izabrani kandidati čuvaju tokom završnog proređivanja kada budžet iznosi najmanje dva. Verzionisana politika `grayscale-16x16-mean-cells-v2` koristi veću od dve vrednosti: srednju luma deltu i odnos ćelija sličica čija normalizovana delta iznosi najmanje 0.05. Prag duplikata je konstanta 0.04, izabrana radi predvidivosti, a ne izložena kao podešavanje u vreme izvršavanja. Ovaj sekundarni visokokontrastni signal čuva male pokrete i promene vidljivog teksta koje poređenje zasnovano isključivo na srednjoj vrednosti može da sakrije. Greške komparatora ili dekodera prolaze otvoreno (fail open) i zadržavaju pokrivenost. Izlazni metapodaci odvajaju izvučene kandidate, uspešno korišćene frejmove i odbačene vizuelne duplikate.

Eksplicitno označen video deo može da zatraži kontaktnu listu (contact sheet) sa vremenskim oznakama. Most gradi najviše JPEG mrežu sa 4 kolone i 16 frejmova. Svaka ćelija od 512 piksela ugravira svoju izvornu vremensku oznaku u visokokontrastnu donju traku, dok iste vremenske oznake ostaju u tekstualnim metapodacima radi naknadnog povezivanja i revizije. Kompletan JPEG ostaje ograničen na 32 MiB. Ako `sharp` ne može da dekodira ili sastavi mrežu, most se vraća na pojedinačne JPEG frejmove; prekid od strane klijenta se i dalje propagira kroz operaciju pravljenja liste.

Dokaz za promociju je namerno odvojen od sintetičkog mikrobenchmarka kompozicije. `scripts/perf/video-bridge-contact-sheet-eval.ts` definiše A/B okvir sa verzionisanom šemom za stvarne vizuelne modele kompatibilne sa OpenAI. On meri tokene koje prijavljuje provajder, proteklo vreme od kraja do kraja (wall latency, uključujući kompoziciju liste), broj poziva modela i zadržavanje činjenica definisano manifestom. Sirovi odgovori modela se ne upisuju u izveštaj; zadržavaju se samo SHA-256 digesti i ID-jevi podudarenih činjenica. Okvir ne upućuje mrežne niti plaćene pozive modela osim ako se prosledi `--execute-real` i konfigurišu `--model`, `OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY`. Bez tog eksplicitnog stvarnog pokretanja, njegov mašinski čitljiv ishod ostaje `HOLD`; sintetička merenja korisnog opterećenja/broja poziva sama po sebi nisu dokaz za promociju.

Pozivaoci mogu da prilože opcioni niz `transcript.cues` uz podržani video deo kada već poseduju poravnat tekst. Svaka najava (cue) mora da sadrži `text`, konačan interval `start`/`end` unutar utvrđenog trajanja i `source` sa bele liste (`client`, `embedded` ili `audio-bridge`); `confidence` podrazumevano iznosi `1` i mora da ostane između `0` i `1`. Identične duplirane najave se spajaju. OmniRoute nikada ne pokreće transkripciju iz ovih metapodataka: validirane najave se kopiraju u opisani rezultat sa izvorom, pouzdanošću i intervalom i prikazuju se kao nepoverljiva zapažanja zajedno sa opisima frejmova. Nevažeći tekst, tekst van opsega ili tekst bez navedenog porekla se odbija umesto da se meša u tok opisa. Oba kanala transkripta iz tela zahteva normalizuju dostavljeno poreklo na `client`, uključujući samoproglašene oznake `embedded` ili `audio-bridge`. Samo adapter u vlasništvu servera može da dodeli te pouzdane oznake kroz argument `trustedSource`, dostupan samo iz koda; JSON polje zahteva ne može da dohvati taj argument. Tekst transkripta ostaje nepoverljiv sadržaj izveden iz medija, bez obzira na njegovo poreklo, i nikada ne sme da određuje autorizaciju.

Napredni pozivalac može da obezbedi traku `audioTranscript` za isti video; ona se tretira kao tekst koji dostavlja klijent, a ne kao dokaz serverske transkripcije. Spoj fuzije pokreće vizuelna i audio zapažanja pod jednim rokom i signalom prekida, raspoređuje ih na zajedničku vremensku osu, spaja identične duplikate i prijavljuje delimični rezultat kada uspe samo jedna strana. Nevažeći `audioTranscript` se degradira na taj delimični rezultat — vizuelni opis se zadržava, a audio grana beleži sanitizovan kod neuspeha — umesto da obori ceo video. Dostupnost po granama, oznaka delimičnosti i sanitizovani kodovi neuspeha se čuvaju u opisanom rezultatu, u metapodacima zaštitnih mehanizama (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), u metapodacima keša rezultata i u brojačima fuzije mosta. Podrazumevana putanja Video Bridge-a ne poziva pretvaranje govora u tekst niti preuzima drugu kopiju medija; bez te eksplicitne trake ostaje isključivo video.

**Задржавање транскрипта (#12150 P1).** Ово се аутоматски примењује кад год
Видео мост (који се засебно укључује) прикаже ставку транскрипта — не постоји
посебна заставица за задржавање. Када захтев прикаже било коју ставку транскрипта
(`transcript` коју је декларисао позивалац или обједињени `audioTranscript`),
заштитни механизам је означава као `videoBridgeObserved` и производи редиговану
сенку описа видеа — идентичан приказ у којем је тело слободног текста сваке
ставке замењено са `[redacted-video-transcript]`, направљену заменом структурираног
поља ставке пре састављања ниске (никада рашчлањивањем спљоштеног текста, тако да
ниједан садржај ставке — злонамеран или уобичајен, укључујући тела која садрже
`]`, као што су `[inaudible]`/`[music]` — не може да опстане). Тело захтева у
трајно сачуваном дневнику позива замењује сваки текстуални део изведен из видеа
том редигованом сенком, упареном по једнакости садржаја; сидро `fullText` поново
се чита из завршеног садржаја заштитног механизма пре позива, тако да упаривање и
даље успева након што каснији ланчани заштитни механизми (маскери PII података и
акредитива, приоритета 10/95) препишу текст описа на лицу места и након што
убризгавање системског упита, примопредаје и меморије преобликује низ порука.
Тело послато моделу остаје непромењено. Посматрани захтев такође не попуњава
трајну меморију (прескаче се издвајање изведено и из захтева и из одговора), тако
да сопствени одговор модела не може да пренесе текст транскрипта у меморију.

**Необрађена видео-поља (#12430).** Када је мост омогућен, а изворна подршка за
видео непозната или недоступна, дефинисана поља `transcript`/`audioTranscript`
такође активирају `videoBridgeObserved`, чак и након неуспешног описивања или
ограничења `maxVideos`. Вредности `null` и празне ниске се рачунају; одсутна поља
и метаподаци који нису видео не рачунају се. Задржане копије редигују ова поља
или изостављају захтев, а кешеви и меморија се заобилазе.

На тим резервним путањама, важеће ставке позиваоца постају подржани делови
`text`/`input_text`, уместо нестандардних поља добављача. Обе нумере достављене
у захтеву остају непоуздана `client` запажања, уз изричито упозорење да видео
није описан и да временске ознаке нису проверене у односу на медиј. Постојећа
ограничења од 256 ставки/64 KiB укупно и појединачна ограничења по ставки
примењују се на обе нумере заједно; временске ознаке морају да буду унутар горње
границе посредника од 600 секунди и сваког наведеног прозора фокуса. Неважеће
нумере се одбацују и не прослеђују као произвољан текст; важећа сродна нумера и
даље може да се користи, осим ако је прекорачено њихово заједничко ограничење.
Поља са вредношћу `null` или празном ниском не додају текст. Ова резервна
функционалност не додаје преузимање медија нити транскрипцију. Поља проширења
транскрипта уклањају се из резервног видео-носиоца и његових објеката
`video_url`/`source`. OpenAI листа дозвољених елемената на преносном формату
остаје строга; видео-носиоци са непознатом изворном подршком остају доступни, а
позната одредишта само за текст задржавају безбедне маркере. Структуриране
редиговане сенке штите додати текст транскрипта, док изворни захтев у власништву
позиваоца остаје непромењен. Одредишта са изворном подршком и онемогућени
мостови задржавају постојеће понашање заобилажења.

Додатне задржане копије користе исти сигнал посматраног захтева. Необрађени
снимак клијентског захтева пре заштитног механизма, захтев на чекању у меморији
и дневник рано одбијеног захтева структурно замењују поља транскрипта у видео
деловима; упити у облику ниске које синтетишу фазе процесног тока и примопредаја
контекста редигују се на одредишту тела трајно сачуваног захтева. Трајно
сачувани маркер `video_content_removed` чини да наставак преко
`previous_response_id` буде безбедно одбијен, уместо да реконструише текст који
је намерно одбачен. Ако посматрани захтев изгуби своју редиговану сенку по делу
пре евидентирања, или ако чак само једна од неколико видео-сенки не успе да се
упари након каснијих измена захтева, задржано тело захтева се у потпуности
изоставља уместо задржавања делимично редигованог транскрипта.

За посматрани захтев, одговор модела може да цитира било који део транскрипта
без структуриране границе ставке. Његов трајно сачувани `responseBody` у дневнику
позива зато се замењује маркером изостављања; детаљни артефакт процесног тока
(који може да садржи тела добављача/клијента и делове тока) не задржава се.
Семантички кеш, кеш идемпотентности и кеш поновног приказивања резоновања
заобилазе читања и уписе за тај захтев. Захтев добављачу и одговор видљив
клијенту остају непромењени. Рани бајтови за одржавање везе празне се из
привременог бафера када се детаљни артефакт изостави. Kiro упозорење о
неисправном EventStream току пријављује само број бајтова корисног садржаја,
никада његов садржај нити необрађену грешку JSON рашчлањивача.
Ово не тврди да је проверена свака неповезана дијагностика добављача/прикључка;
шире испитивање одредишта за задржавање прати се у #11658.

Интерни животни циклус `/api/modality-bridge/video/drilldown` представља засебну,
локалном петљом/токеном аутентификовану кеш-подлогу. Свака операција такође
захтева канонски непрозиран ID налогодавца. Пре него што се омогући продукциони
позивалац, он мора да изведе тај ID из аутентификованог закупца и никада не сме
да проследи вредност коју је изабрао клијент. Кључеви кеша везују тог налогодавца
за канонске ID-ове сесије и видео-референце, чувају само њихове кључеве изведене
помоћу SHA-256 и ограничавају и читање и брисање на истог налогодавца. Кеш чува
највише 16 изведених JPEG кадрова по уносу, уклања их након десет минута и
подржава ограничена читања `start`/`end` или изричито брисање сесије.

Сваки налогодавац је ограничен на 16 уноса и 64 MiB канонских JPEG података. Та
ограничења су независна од глобалне горње границе од 64 уноса/256 MiB: притисак
квоте налогодавца уклања само уносе тог налогодавца који су најдуже били
некоришћени, пре разматрања глобалног LRU уклањања. Истекли уноси уклањају се и
из обрачуна по налогодавцу и из глобалног обрачуна при активности кеша, док
отказивање и неуспех валидације не уписују делимичну замену.

Keš odbija nekanonski Base64, suvišno popunjavanje, medije koji nisu JPEG, neispravne ili odsečene JPEG fajlove, kao i JPEG fajlove koji proizvedu upozorenje tokom ograničenog dekodiranja cele slike pomoću `sharp`. Svaku prihvaćenu sliku ponovo enkodira kao kanonski JPEG, širinu i visinu izvodi iz dekodiranih bajtova umesto da veruje poljima pozivaoca, a sve završne poliglot bajtove odbacuje umesto da ih zadrži. Samo ograničeni kanonski komprimovani bafer se obračunava na obe kvote. JSON ograničenje prenosa uključuje Base64 dodatni trošak za gornju granicu dekodiranog ulaza od 32 MiB. Svaka uskladištena derivacija beleži svoj validirani JPEG format/rezoluciju, politiku uzorkovanja, verziju derivacije, vreme kreiranja, heš sadržaja izračunat na serveru, i heširanu referencu na roditelja plus heš roditeljskog sadržaja od pouzdanog pozivaoca. Otkazivanje se proverava između asinhronih faza dekodiranja/heširanja pre atomičnog upisa u keš.

Ova tranša još uvek ne povezuje produkcijskog proizvođača sa rutom i ne obezbeđuje izbor varijanti sa više rezolucija. Transparentna putanja zahteva Video Bridge-a stoga ne uvodi nikakav dodatni posao, dok izvođenje principijala vezanog za tenanta i puni FU-08 životni ciklus sa više rezolucija ostaju eksplicitno naznačeni budući rad, a ne ponašanje dokumentovano kao završeno.

Frejmovi se opisuju sekvencijalno konfigurisanim Video modelom. Prazno Video preklapanje nasleđuje Vision podešavanje; ako su oba prazna, Vision auto-ruter bira efektivni model sposoban za vid. Uspešni opisi zamenjuju originalni deo stabilnim `[Video description:` prefiksom koji takođe označava tekst kao nepouzdano zapažanje izvedeno iz medija i govori nizvodnim modelima da ne prate instrukcije pronađene u medijima. Ključevi keša opisa frejmova uključuju JPEG bajtove, prompt, vremensku oznaku i efektivni model; keširaju se samo uspešni opisi. Unosi keša zadržavaju stvarni uspešni model proizvođača, uključujući rezervni model; most prijavljuje `mixed` kada su različiti frejmovi proizvedeni različitim modelima. Pogodak keša ponovo koristi taj identitet proizvođača umesto da ga preimenuje u zatraženi plan rutiranja. Keš rezultata celog videa je ključiran svakim ulazom koji menja izlaz — prompt, efektivni model, politika uzorkovanja, broj frejmova, režim semantičke analize, SHA-256 otisak normalizovanog nagoveštaja fokusa, prozor fokusa, `transcript`, `audioTranscript`, i zastavica kontakt-tablice — tako da je promena bilo koje od tih dimenzija promašaj keša, nikad zastarela ponovna upotreba. Verzija politike vizuelne deduplikacije, prag i ograničeni broj kandidat-frejmova takođe su eksplicitni u ključu keša rezultata i metapodacima; promena politike stoga ne može ponovo iskoristiti zastareli opis celog videa. Metapodaci keša rezultata v4 čuvaju režim i otisak, nikad sirovi korisnički zadatak. Metapodaci zaštitnog mehanizma prijavljuju i zatraženi i efektivni režim analize; zatraženi `focused` režim bez upotrebljivog korisničkog teksta prijavljuje se kao efektivno `full`.

Zaštitni mehanizam izdvaja svaki podržani video deo, ali ne opisuje više od `modalityBridgeVideoMaxVideos`. Za cilj za koji je dokazano da ima `supportsVideo === false`, neuspeli video zapisi i oni preko limita postaju eksplicitni bezbedni tekstualni markeri tako da nijedan sirovi video ne preživi. Kada je sposobnost nepoznata, ti delovi zadržavaju svoj video nosač; svaki rezervni transkript prati gore opisanu ograničenu konverziju teksta. Ciljevi sa `supportsVideo === true` zaobilaze most. Signal prekida klijentskog zahteva prostire se kroz preuzimanje, red posrednika, podprocese i pozive za opisivanje; prekidi se zaustavljaju između video zapisa i nikada ne otkazuju otvoreno prema sirovim medijima.

Podešavanja tokom izvršavanja podržana su bazom podataka i validirana pomoću Zod:

| Ključ                               | Podrazumevano | Opseg / ponašanje                                                                                   |
| ----------------------------------- | ------------- | --------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`       | Opciono tokom izvršavanja, po izboru                                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`      | `full` čuva generičke opise; `focused` koristi ograničeni, nepouzdani kontekst poslednjeg korisnika |
| `modalityBridgeVideoModel`          | `""`          | Nasleđuje Vision Bridge model                                                                       |
| `modalityBridgeVideoFrameCount`     | `8`           | 1–16                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`   | `uniform`, `scene_aware`, ili proporcionalni `segment_aware`; otkaz detektora vraća se na `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`           | 1–4                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`      | 1000–120000 ms                                                                                      |

Stare sačuvane vrednosti Video tajmauta iznad 120 sekundi ograničavaju se na rok posrednika; novi upisi podešavanja iznad tog limita se odbijaju. `GET /api/modality-bridge/video/runtime` zahteva pouzdanu označenu loopback lokalnost pre autentifikacije ili ispitivanja izvršnog okruženja, a zatim zahteva autentifikaciju za upravljanje. Vraća samo `available`, sanitisane FFmpeg/ffprobe verzije, i fiksni razlog kada izvršno okruženje nije dostupno. Interna krajnja tačka za ekstrakciju nije javni API za otpremanje: zasićenje reda vraća `503` plus `Retry-After`, prekid veze pozivaoca vraća `499`, a fiksni rok posrednika vraća `504`. Konvertovani odgovori dodaju `video->text;model=<visionModel>;parts=<videos>` centralnom zaglavlju `x-omniroute-modality-bridge` bez uklanjanja Vision ili Audio segmenata.

### PII Masker (`piiMasker.ts`)

Izvodi se na **oba** stupnja.

- **`preCall`** klonira payload, prolazi kroz `system`, `messages`, `input` i
  `prompt` (uključujući stavke koje su obični stringovi) i primenjuje
  `processPII()` (iz `@/shared/utils/inputSanitizer`) na string polja
  `content`/`text`. Kada je `PII_REDACTION_ENABLED=true`, detektovani PII se
  maskira u odlaznom payload-u. Ovo je nezavisno od `INPUT_SANITIZER_MODE`
  (koji kontroliše samo politiku prompt-injection-a). Kada je maskiranje
  isključeno, poziv beleži brojače detekcije bez prepisivanja sadržaja.
- **`postCall`** duboko klonira odgovor, pokreće `sanitizePIIResponse()` plus
  masker za oblik Responses API-ja (`maskResponsesOutput` — pokriva
  `output_text` i `output[].content[].text`). Ako dođe do bilo kakvog
  maskiranja, izmenjeni odgovor zamenjuje originalni.

Guardrail nikada ne blokira; samo dodaje anotacije (`meta.detections`,
`meta.redacted`) ili prepisuje.

#### Izbor po tipu, prilagođeni obrasci i brojači detekcije

**Kontrolna tabla → Podešavanja → Bezbednost → Maskiranje PII-ja** bira _šta_
se maskira. To ne uključuje maskiranje: to i dalje rade
`PII_REDACTION_ENABLED` (zahtev) i `PII_RESPONSE_SANITIZATION` (odgovor + SSE),
oba podrazumevano isključena.

- **Izbor po tipu** — ugrađeni identifikatori navedeni su u
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nepodešeno znači
  svi tipovi (ponašanje od pre nego što je ovo podešavanje uvedeno). Obrazac
  `ssn_us` u mehanizmu za obradu zahteva se preslikava na `ssn`. Šabloni
  (Minimal, Standard, Financial, Brazilian, USA, Full) samo popunjavaju polja
  za potvrdu u korisničkom interfejsu.
- **Prilagođeni obrasci** — do 20 regex ili wildcard obrazaca (`*` = do 64
  karaktera koji nisu beline, `?` = jedan). Poklapanja postaju
  `[CUSTOM_REDACTED]`. Svaki obrazac prolazi kroz
  `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`):
  najviše 500 karaktera, zastavice ograničene na `g i m s u`, mora da se
  kompajlira, mora da prođe proveru `safe-regex` (katastrofalno vraćanje
  unazad) i ne sme da poklopi prazan string niti placeholder za maskiranje.
  Obrazac koji ne prođe se odbija prilikom čuvanja i prilikom testiranja, a
  sačuvani red koji ne prođe se u vreme izvršavanja preskače umesto da se
  kompajlira. Prilagođeni obrasci se izvršavaju samo dok je maskiranje
  uključeno.
- **Brojači detekcije** — brojevi po tipu (nikada same poklopljene
  vrednosti), čuvaju se u memoriji i resetuju pri ponovnom pokretanju
  (`src/lib/pii/piiDetectionStats.ts`). Povećavaju se samo dok je maskiranje
  uključeno.

Podešavanja se čuvaju u tabeli `key_value` (imenski prostor `pii_settings`,
`src/lib/db/piiSettings.ts`) i čitaju se kroz keš od 1 s. API:

| Metoda | Putanja                  | Svrha                                                                        |
| ------ | ------------------------ | ---------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stanje zastavica, `enabledTypes`, `customPatterns`, brojači detekcije        |
| `PUT`  | `/api/settings/pii`      | Zamena `enabledTypes` (`null` = svi) i/ili `customPatterns`                  |
| `POST` | `/api/settings/pii/test` | Probno pokretanje jednog obrasca na uzorku od najviše 8 KB; ništa se ne čuva |

Sve tri zahtevaju autentifikaciju za upravljanje i validiraju telo zahteva
pomoću Zod (`src/shared/validation/schemas/piiSettings.ts`).

### Prompt Injection (`promptInjection.ts`)

Detektuje zlonamerne strukture u sadržaju koji dostavlja korisnik i primenjuje
konfigurisanu politiku. Ponašanjem upravljaju promenljive okruženja i opcije
konstruktora:

| Podešavanje     | Promenljiva okruženja                                                                                 | Podrazumevano | Efekat                                                                                                                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Uključeno       | `INPUT_SANITIZER_ENABLED`                                                                             | `true`        | Kada je `false`, guardrail se odmah preskače.                                                                                                                                                           |
| Režim           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`        | Politika za injection: `block`, `warn` ili `log`. (`redact` se prihvata radi kompatibilnosti unazad, ali **ne** uklanja injection tekst; prepisivanjem PII u zahtevu upravlja `PII_REDACTION_ENABLED`.) |
| Prag blokiranja | opcija `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`        | Minimalna ozbiljnost potrebna za blokiranje. Srednja je podrazumevano samo za posmatranje.                                                                                                              |

**Prioritet režima** (`getMode`): `options.mode` pozivaoca →
**zamena `INJECTION_GUARD_MODE` kroz DB feature-flag** (Kontrolna tabla →
Podešavanja → Feature Flags) → env `INJECTION_GUARD_MODE` → env
`INPUT_SANITIZER_MODE` → `warn`. Zamena sa kontrolne table zato ima prednost
nad promenljivama okruženja, pa UI za Feature Flags uživo kontroliše aktivni
guard (bez ponovnog pokretanja). Čitanje iz baze podataka je otporno na greške
(fail-safe): ako dođe do greške, guard se vraća na ponašanje zasnovano na
okruženju, a kada zamena nije podešena, ponašanje je identično razrešavanju
isključivo preko okruženja.

Izvori detekcije:

1. `sanitizeRequest()` iz `@/shared/utils/inputSanitizer` (zajednički skup
   detektora koji se koristi i na drugim mestima u pipeline-u).
2. Ugrađeni `DEFAULT_GUARD_PATTERNS` (trenutno `system_override_inline` i
   `markdown_system_block`, oba ozbiljnosti `high`).
3. Opcioni `customPatterns` prosleđeni kroz opcije konstruktora (stringovi,
   regex ili zapisi `{ name, pattern, severity }`).

Kada je `mode === "block"` **i** bar jedna detekcija ispunjava prag
ozbiljnosti, `preCall` vraća `{ block: true, message: "Request rejected:
suspicious content detected" }`. U režimima `warn`/`log` guardrail beleži,
ali dozvoljava poziv. Deljeni pomoćnik `evaluatePromptInjection()` je takođe
izvezen za pozivaoce kojima je potrebno da procene promptove bez prolaska kroz
registar.

**Granica skeniranja (v3.8.20):** detektor ispituje samo **prvih 16 KB**
spojenog teksta prompta — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajta)
u `src/shared/utils/inputSanitizer.ts`. I `detectInjection()` i
`evaluatePromptInjection()` primenjuju `slice(0, MAX_INJECTION_SCAN_BYTES)` pre
pokretanja petlje obrazaca. Direktive za ubacivanje nalaze se blizu vrha ulaza,
pa ovo ograničava CPU/GC potrošnju regex-a na payload-ovima od nekoliko stotina
KB bez slabljenja detekcije (v. #3932, #4041).

### Maskiranje kredencijala (`credentialMasker.ts`)

Izvršava se u **obe** faze, poslednji u podrazumevanom lancu (prioritet `95`).
Maskira dobro poznate obrasce API ključeva / tajnih tokena u odlaznom payload-u
(sadržaj poruka, argumenti poziva alata, rezultati alata) **i** u odgovoru
provajdera, tako da kredencijal nalepljen u prompt (ili vraćen kroz rezultat
alata) ne procure do upstream provajdera niti nazad ka klijentu.

- **Samo opt-in**, ista konvencija kao za maskiranje PII podataka (srodno sa
  Hard Rule #20): onemogućeno je osim ako `settings.credentialRedactionEnabled
=== true` **ili** `CREDENTIAL_REDACTION_ENABLED=true`. Kada je isključeno,
  guardrail je no-op — nikada ne blokira i nikada ne prepisuje.
- `redactCredentials()` prolazi kroz celo stablo payload-a/odgovora
  (`walkValue()`, otporno na zagađenje prototipa, bezbedno od ciklusa putem
  `WeakSet`) i zamenjuje poklapanja placeholder-om `[REDACTED:<type>]`,
  klonirajući samo grane koje su se stvarno promenile.
- `CREDENTIAL_PATTERNS` pokriva ključeve LLM provajdera (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokene (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), ključeve za plaćanja (Stripe,
  Square), cloud ključeve (AWS pristupni ključ, Twilio, SendGrid, Mailgun),
  privatne ključeve / JWT-ove, stringove za konekciju koji nose kredencijale
  (`mongodb://user:pass@...`, itd.) i generički obrazac vrednosti zaglavlja
  `Authorization`/`x-api-key`/`api-key`/`apikey`. Ključevi u obliku zaglavlja
  (`authorization`, `x-api-key`, `api-key`, `apikey`) maskiraju se strukturalno
  (samo vrednost, uz očuvan prefiks šeme poput `Bearer `/`Basic `), a ne putem
  generičkog tekstualnog regex-a.
- Guardrail nikada ne blokira; samo prepisuje (`modifiedPayload` /
  `modifiedResponse`) i dodaje anotacije (`meta.credentialsRedacted`,
  `meta.count`).

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
  block?: boolean; // true prekida lanac
  message?: string; // prikazuje se pri blokiranju
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // vraća preCall da bi prepisao zahtev
  modifiedResponse?: TValue; // vraća postCall da bi prepisao odgovor
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

Guardrail signalizira „bez promene" vraćanjem `void`, `{}` ili
`{ block: false }`. Vraćanje `modifiedPayload`/`modifiedResponse` zamenjuje
vrednost koja prolazi kroz lanac za nizvodne guardrail-ove.
`signal?: AbortSignal` prenosi životni ciklus pozivaoca u guardrail-ove. Prekid
zahteva je namerni fail-open izuzetak: medijski mostovi obustavljaju rad i
čišćenje bez vraćanja sirovih medija cilju za koji se zna da ih ne podržava.

## Registar (`registry.ts`)

Singleton `guardrailRegistry` izlaže:

- `register(guardrail)` — dodaje (ili zamenjuje prema normalizovanom imenu)
  guardrail i ponovo sortira po rastućem prioritetu (`priority`).
- `clear()` / `list()` — administrativne pomoćne funkcije.
- `runPreCallHooks(payload, context)` — prolazi kroz aktivne guardrail-ove,
  provlači payload kroz `modifiedPayload` i zaustavlja se na prvom
  `block: true`.
- `runPostCallHooks(response, context)` — isti tok na strani odgovora.
- `resetGuardrailsForTests({ registerDefaults })` — briše stanje i po želji
  ponovo registruje podrazumevane guardrail-ove radi čiste izolacije testova.

Oba pokretača vraćaju `{ blocked, payload|response, results, guardrail?, message? }`,
gde je `results` niz zapisa `GuardrailExecutionResult` koji sadrže polja
`blocked`, `skipped`, `modified`, `error` i `meta` za svaki guardrail, korisna
za praćenje.

### Onemogućavanje guardrail-ova po zahtevu

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` sastavlja listu bez
duplikata imena guardrail-ova koje treba preskočiti za tekući zahtev. Postoji
pet kanala, koji se čitaju ovim redosledom i spajaju u jednu listu (pri
uklanjanju duplikata pobeđuje prvo pojavljivanje):

1. `apiKeyInfo.disabledGuardrails`
2. `disabledGuardrails` u telu zahteva (najviši nivo)
3. `metadata.disabledGuardrails` u telu zahteva (samo kada je `metadata` objekat)
4. Zaglavlje `x-omniroute-disabled-guardrails`
5. Zastarelo zaglavlje `x-disabled-guardrails`

Svih pet kanala se spajaju, uključujući oba zaglavlja: slanje i
`x-omniroute-disabled-guardrails` i `x-disabled-guardrails` preskače uniju
njihovih lista, a prazno moderno zaglavlje više ne sakriva zastarelo
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), ispravljeno u
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Vrednosti mogu biti nizovi stringova ili string razdvojen zarezima; sa imena se
uklanjaju razmaci i normalizuju se na kebab-case malim slovima (`pii_masker` →
`pii-masker`), a prazne stavke se odbacuju. Rezultat se kroz
`context.disabledGuardrails` prosleđuje registru, koji preskače odgovarajuće
guardrail-ove (`skipped: true` u `results`).

Lista onemogućenih utiče samo na **registar**. Režim `block` za prompt-injection
je obavezna granica: middleware injection-guard
(`src/middleware/promptInjectionGuard.ts`) poziva `evaluatePromptInjection()`
bez ikakve liste onemogućavanja pod kontrolom pozivaoca (mrtvi poziv
`resolveDisabledGuardrails({ body })` koji je ranije upotrebljavao uklonjen je u
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), tako da se
zahtev koji onemogućava `prompt-injection` i dalje odbija u režimu `block`. Tako
je dizajnirano. Kanali za onemogućavanje su pod kontrolom pozivaoca (telo
zahteva, metapodaci, zaglavlja), a pozivalac ne sme moći da isključi bezbednosnu
kontrolu koju je operator postavio
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Unija
zaglavlja iz [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
menja samo to koji se guardrail-ovi registra preskaču; ne dozvoljava klijentu da
zaobiđe middleware. Obavezne politike guardrail-ova po ključu i po grupi prate
se u RFC-u v4 [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Pogledajte [Pokrivenost i ograničenja](#coverage-and-limits).

## Редослед извршавања

За сваки захтев који пролази кроз `src/sse/handlers/chat.ts` и
`open-sse/handlers/chatCore.ts` (руте chat породице наведене под
[Покривеност и ограничења](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` гради листу прескакања на основу API
   кључа, тела и заглавља.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` покреће заштитне механизме
   (guardrails) по растућем редоследу приоритета:
   - Онемогућени заштитни механизми бележе се као `skipped`.
   - `preCall` сваког заштитног механизма може преписати payload преко
     `modifiedPayload`.
   - Први `block: true` прекида ланац и руковалац враћа одговор одбијања
     заштитног механизма.
3. (Потенцијално преписан) payload улази у combo рутирање и прослеђивање ка
   upstream-у.
4. **Само non-streaming:** након што се одговор састави,
   `guardrailRegistry.runPostCallHooks(...)` покреће исти ланац над одговором.
   `block: true` овде одбацује upstream одговор и враћа HTTP 400. Стримовани
   одговори овај корак у потпуности прескачу.

Заштитни механизми који баце изузетак бележе се са `error: <message>` и
логују преко `logger.warn`, али се ланац наставља — fail-open по дизајну.

## Покривеност и ограничења

Регистар заштитних механизама повезан је само на chat pipeline. Ова
ограничења фиксирана су тестовима
`tests/unit/guardrail-pipeline-wiring-characterization.test.ts` и
`tests/unit/guardrail-pipeline-characterization.test.ts`; намерно ажурирајте
те тестове када се понашање промени.

### Где се hook-ови извршавају

| Hook / контрола                        | Извршава се на                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                      | Захтеви које обрађује `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (и `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` и Telegram chat proxy. Такође и test endpoint контролне табле `/api/guardrails/test`. Pre-call блокада враћа HTTP 400. |
| `runPostCallHooks`                     | Само **non-streaming** chat одговори (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Стримовани одговори никад до њега не долазе.                                                                                                                                                                                                                                                                                  |
| Streaming PII                          | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), повезан (piped) у `streamingPipeline.ts` када је `PII_RESPONSE_SANITIZATION` укључен. То није заштитни механизам, па канали онемогућавања не утичу на њега.                                                                                                                                                                                                  |
| Injection-guard middleware (застарели) | Свака `/v1` рута која носи prompt, укључујући chat породицу (погледајте [покривеност рута](#injection-guard-route-coverage--red-team-phase-8--block-d)). Само prompt injection.                                                                                                                                                                                                                                            |

### Шта није покривено

- **Руте за медије, embeddings и податке** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) никад не долазе до регистра.
  Ни PII маскирање, маскирање креденцијала ни modality bridge се тамо не
  извршавају. Њихова једина провера је застарели injection-guard middleware.
- **Стримовани одговори** не добијају post-call заштитне механизме: нема
  `pii-masker` или `credential-masker` post-call позива и нема post-call
  блокаде. Примењује се само streaming PII трансформација (када је
  `PII_RESPONSE_SANITIZATION` укључен). Креденцијал који се врати у
  стримованом одговору неће бити редактован.
- **Канали онемогућавања у односу на middleware (по дизајну):** middleware
  процењује prompt injection сопственим позивом ка
  `evaluatePromptInjection()`, без прослеђивања било какве листе
  онемогућавања под контролом позиваоца. Режим `block` је обавезна граница
  коју онемогућавања под контролом позиваоца не могу заобићи, укључујући и
  на рутама chat породице
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
  Онемогућавање `prompt-injection` прескаче само заштитни механизам
  регистра.

### Шта види одговор пре post-call позива

На non-streaming путањи редослед је: екстракција меморије → извршавање
уграђених алата → post-call заштитни механизми → излаз због post-call
блокаде → упис у семантички кеш.

- **Ekstrakcija memorije** i **izvršavanje alata** vide odgovor pre nego što
  post-call guardrails mogu da ga preprave ili blokiraju. Od
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401), ekstrakcija
  memorije propušta ekstrahovani tekst kroz `sanitizePII` kada je
  `PII_RESPONSE_SANITIZATION` uključena (i u streaming i u non-streaming režimu), ali
  odgovor koji post-call kasnije blokira je i dalje ponuđen memoriji i
  alatima.
- **Semantički keš** čuva odgovor nakon post-call faze, tako da čuva
  prepravljeni odgovor, a blokirani odgovor se nikada ne kešira. Unosi u kešu su
  ključirani po API ključu.

## Konfiguracija

Promenljive okruženja koje čitaju ugrađene zaštite:

| Promenljiva                           | Koristi                   | Efekat                                                                                                    |
| ------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Postavite `false` da biste potpuno onemogućili detekciju.                                                 |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Politika injekcije: `warn`, `block` ili `log`. Zastarela vrednost `redact` ne prepravlja tekst injekcije. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Režim zaštite od injekcije; takođe DB zastavica funkcije koja **nadjačava** env promenljive (DB > ENV).   |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Minimalna ozbiljnost koju `MODE=block` odbija: `high` (podrazumevano), `medium` ili `low`.                |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Zastareli alias za `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                     |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Kada je `true`, PII podaci u zahtevu se anonimizuju (nezavisno od režima injekcije).                      |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Kontroliše ponašanje maskera na strani odgovora.                                                          |

Modality Bridge zaštite čitaju konfiguraciju u vreme izvršavanja iz skladišta
podešavanja podržanog bazom podataka (`getSettings()`), a ne iz env promenljivih.
Primarni ključevi za Vision su
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` i
`modalityBridgeCacheMaxEntries`. Zastareli
ključevi `visionBridge*` prihvataju se samo kao dokumentovani rezervni
način čitanja u trajanju od jednog ciklusa; upisi sa kontrolne table koriste
primarne ključeve. Podrazumevane vrednosti i rezervni (fallback) resolver nalaze
se u `src/shared/constants/modalityBridgeDefaults.ts`, dok su zastarele
konstante zadržane u `src/shared/constants/visionBridgeDefaults.ts`.

Audio koristi `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` i `modalityBridgeAudioMaxClips`, uz zajednička
podešavanja `modalityBridgeCache*`. Audio nema rezervni mehanizam za zastarele
ključeve jer su ovi ključevi uvedeni zajedno sa Modality Bridge šemom.

Video koristi `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` i
`modalityBridgeVideoTimeout`, uz zajednička podešavanja `modalityBridgeCache*`.
Podrazumevano je onemogućen jer su FFmpeg/ffprobe opcione operativne
zavisnosti, a opisivanje frejmova dodaje kašnjenje i trošak modela.

## Prilagođeni guardrails

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

1. Kreirajte `src/lib/guardrails/myGuardrail.ts` koji nasleđuje `BaseGuardrail`.
2. Implementirajte `preCall` i/ili `postCall`.
3. Ili registrujte pri uvozu (push iz `registerDefaultGuardrails`) ili
   pozovite `guardrailRegistry.register(...)` u vreme izvršavanja — registar zamenjuje
   svaki prethodni guardrail sa istim normalizovanim imenom.
4. Dodajte testove u `tests/unit/` (postojeći primeri:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testiranje

Koristite `resetGuardrailsForTests()` između testova da biste počeli od poznatog stanja.
Prosledite `{ registerDefaults: false }` da biste počeli sa praznim registrom i
registrovali samo guardrails koje testirate. Vision Bridge prihvata dependency
injection (`deps.getSettings`, `deps.callVisionModel`); Audio Bridge izlaže
ekvivalentne tačke proširivosti za podešavanja, mogućnosti, izbor STT modela, provere
kredencijala i transkripciju. Testovi stoga mogu da iskoriste oba toka bez pristupa bazi
podataka ili mreži.

## Pogledajte takođe

- `src/lib/guardrails/` — implementacija
- `src/shared/utils/inputSanitizer.ts` — deljeni detektor koji pokreće
  detekciju prompt-injection napada i PII maskiranje
- `src/shared/constants/visionBridgeDefaults.ts` — podrazumevane vrednosti za Vision Bridge i
  lista forced-bridge modela
- `src/shared/constants/modalityBridgeDefaults.ts` — deljene podrazumevane vrednosti za Vision/Audio u vreme izvršavanja
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalni sloj (circuit breaker, periodi hlađenja)
- `docs/reference/ENVIRONMENT.md` — potpuna referenca promenljivih okruženja

## Pokrivenost ruta injection-guard zaštitom i red-team (Faza 8 · Blok D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) pokriva sve rute
koje prihvataju korisničke promptove. Poštuje `INJECTION_GUARD_MODE` (podrazumevano `warn` = samo beleži;
`block` = vraća HTTP 400 `SECURITY_001`).

| Tip               | Rute                                                                                                                                                 | Podrazumevani režim |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Tekst (postojeće) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                |
| Generativne       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                |
| Podaci            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                |

Ekstrakcija teksta (`extractMessageContents`) pokriva `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (noćno, `nightly-llm-security.yml`):** promptfoo potvrđuje da svaka ruta blokira
OWASP-LLM korpus u režimu `INJECTION_GUARD_MODE=block`; garak pokreće probe-ove (preskače bez tajnog ključa).
`moderations` je uključen radi konzistentnosti. Block režim je obavezna granica: `evaluatePromptInjection()`
ignoriše listu onemogućavanja po zahtevu koju joj prosleđuje middleware, tako da `disabledGuardrails`
**ne** izuzima rutu iz nje ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Noćni workflow (`.github/workflows/nightly-llm-security.yml`, cron + ručno
pokretanje) ima dva posla:

- **`promptfoo-guard` (blokirajući)** — pokreće `promptfoo eval -c promptfooconfig.yaml`
  sa `INJECTION_GUARD_MODE=block`. Svaki adversarial slučaj (npr. „ignore all
  previous instructions…", jailbreak napadi u DAN stilu) proverava da odgovor nosi
  `error.code === "SECURITY_001"`, tj. da je zaštita zaista odbila zahtev.
- **`garak` (informativni)** — pokreće garak `--probes promptinject,dan,leakreplay`
  protiv lokalne OmniRoute instance (`http://localhost:20128/v1`). Uslovljen je
  tajnim ključem provajdera (`PROMPTFOO_PROVIDER_KEY`); preskače se bez greške i ima nastavak
  `|| true`, tako da izveštava bez obaranja CI-ja.

Pokrivenost pomoćne funkcije zaštite (`createInjectionGuard` / `withInjectionGuard`)
obuhvata svaku `/v1` rutu koja nosi prompt; tekst prompta se izvlači iz
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` pomoću
`extractMessageContents()` u `src/shared/utils/inputSanitizer.ts`.
