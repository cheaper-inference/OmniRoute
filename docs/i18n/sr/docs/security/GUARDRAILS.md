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

### Видео Бридге (`videoBridge.ts`, `videoBridgePipeline.ts`)

Пресреће видео делове највишег нивоа у Завршецима ћаскања `messages` и Одговорима API `input` пре него што се позове циљ без познате изворне видео подршке. Подржани облици су `input_video`, `video_url`, `video_source`, HTTPS URLs и `data:video/*;base64,...` подаци URIs. Обични називи датотека у тексту се не третирају као видео.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) поседује обилазак захтева, capability/policy проверу, агрегацију по захтеву и корисно оптерећење одговора. — аквизиција рада по видеу, кеш целог резултата, који описује секвенцу оквира (која спаја било који аудио транскрипт који је декларисао позивалац), и — по покушају metrics/abort/cleanup је скривен иза `processVideoPart` у `videoBridgePipeline.ts`, позива се једном по видео делу унутар `preCall` петље. Тај модул такође дефинише експлицитне границе порта `VideoMediaBrokerPort` (прибављање бајтова и издвајање узоркованих оквира), `VideoAudioTranscriptionPort` (спајање аудио транскрипта који је декларисао позивалац са узоркованим насловима) и `VideoDrilldownPort` (застарели облик сировог складишта). Производња STT и задржавање оквира су састављени око порта за опис кроз `createVideoSttAdapter` и `createVideoDrilldownAdapter`; овај други користи заједнички животни циклус непрозирне ручке.

Путања јавног `/v1` захтева никада не увози нити позива подпроцес. Удаљени видео снимци се преузимају под ограничењем од 50 MiB ; инлине басе64 видео снимци имају конзервативно ограничење од 36 MiB декодираних по видеу, тако да model/messages/framing коверат може остати унутар границе за пријем јавног JSON захтева од 50 MiB. Процене инлине дужине и декодиране величине се проверавају пре алокације. HTTPS је неопходан на почетном удаљеном URL и сваком преусмеравању, коришћењем постојећег само јавног одлазног чувара са DNS качењем. Бајтови тада прелазе тачну унутрашњу границу `POST /api/modality-bridge/video/extract` брокера. Та рута је и `LOCAL_ONLY` и `SPAWN_CAPABLE`, прихвата само аутентификацију по процесу, захтев поуздане петље и никада не прихвата URL, путању система датотека, извршну датотеку или листу аргумената. API цевовод величине тела и инкрементални читач тела руковаоца независно примењују ограничење уноса брокера од 50 MiB. Његов ограничени ред покреће једну по једну екстракцију, дозвољава четири посла на чекању и ограничава улаз на чекању на 100 MiB.

Унутар брокера, `ffprobe` чита приватну локалну датотеку; листа дозвољених у фиксном формату искључује формате плејлиста и манифеста. За дозвољене контејнере породице МОВ, екстерне MOV референце података остају подразумевано онемогућене и фиксна команда се не укључује за њих. И `ffprobe` и `ffmpeg` користе белу листу `file` -only протокола, једну нит, фиксне низове аргумената, без љуске и извршне датотеке решене из `PATH`. Токови насловних слика у прилогу нису кандидати за репродукцију. Сви токови који се могу репродуковати морају да задовоље ограничења, а експлицитни подразумевани ток је пожељнији пре детерминистичког замена са најнижим индексом. Видео снимци су ограничени на 600 секунди, 8.192 пиксела по димензији и 33.554.432 изворна пиксела. FFmpeg узоркује 1–16 средњих JPEG оквира, смањује дужу ивицу на највише 1.024 пиксела без повећања мањих улаза и никада не прима URL. Узорковање је подразумевано `uniform`. Опционе `scene_aware` и експерименталне `segment_aware` политике изводе један додатни фиксни FFmpeg пролаз преко већ потврђеног локалног тока, бирају ограничене временске ознаке `showinfo` сцене и враћају се детерминистички на исте униформне средње тачке у случају отказивања детектора, временског ограничења, неисправног излаза или празног скупа кандидата. Режим са свешћу о сегментима додељује узорке средње тачке пропорционално валидираним интервалима сцене; Докази свесни сегмента и резервно понашање су детаљно описани у наставку. Чврсто ограничење од 16 оквира се примењује након избора у свакој политици. Када захтев за сцену има буџет само за један кадар, он користи униформну средину активног целог видеа или прозора фокуса и извештава `policyEffective: uniform`: један изабрани оквир сцене не може да сачува оба временска краја. Позивалац може опционо да обезбеди прозор коначног фокуса (`start`/`end` секунди); границе су причвршћене за трајање медија, обрнути или неограничени прозори се одбацују, а све политике узорковања се изводе само унутар нормализованог интервала. Добијени прозор је укључен у метаподатке узорковања и у непоуздани префикс описа, тако да низводни модели могу разликовати фокусирани извод од пуне временске линије.

Фокус семантичког натписа је посебна, експлицитна поставка. Подразумевани режим `full` анализе чува постојећи промпт оквира и никада не прослеђује текст захтева у модел натписа. У `focused` режиму, мост чита само најновији непразан `text`/`input_text` који је написао корисник из истог контејнера за ћаскање или одговоре, нормализује га у NFC, скупља контролне знакове и размак и ограничава га на 500 Уницоде кодних тачака. Празан резултат се враћа на тачан `full` промпт. Употребљиви наговештај се серијализује као JSON у наменском блоку контекста непоузданог корисника и може дати приоритет само видљивим детаљима; не може поништити посебно упозорење на праћење упутстава видљивих или чујних у медијима. Текстуални фокус никада не закључује `start`/`end` нити мења темпорални узоркивач.

#### FU-07 структурни сегмент доказа

`segment_aware` користи један ограничени пролаз пре анализе преко већ потврђеног локалног видео тока. Фиксни филтерски ланац прво се скалира на највише 320 пиксела ширине, детектује промене сцене и замрзнуте интервале, а затим узоркује при 1 кадру у секунди за информације о замућењу, просечном осветљењу и spatial/temporal. Пропуст је ограничен на 600 структурних узорака, једну FFmpeg/filter нит, исти протокол `file` -only и листе дозвољених контејнера, 1 MiB ограничење процеса и излаза и највише 30 секунди унутар заједничког abort/deadline. брокера. Никада не прихвата команду, филтер, путању или URL из захтева.

Структурне вредности су доказ детерминистичког узорковања, а не семантичко разумевање видеа. Они не закључују субјекте, радње, натписе, говор или намеру корисника. Границе сцене и замрзавања формирају сегменте; замрзнути покривеност, замућење, експозиција, просторни детаљи и временске промене утичу само на то како се распоређује постојећи буџет од 1–16 кадрова. Потпуно замрзнути сегмент је ограничен на један оквир, док се незамрзнути сегменти такмиче за преостали буџет. Када границе премашују број оквира, задржава се униформна покривеност временске линије, тако да брзи рани резови не могу сакрити дуги задњи сегмент. Границе сцене у оквиру резолуције анализе од 1 секунде границе замрзавања се спајају.

Недостају филтери, malformed/empty докази, грешка детектора или ограничено временско ограничење пре анализе не отварају тачно једнообразну политику средње тачке. Рок за прекидање позиваоца или брокерски рок се не отвара: он прекида потпроцес у лету, спречава каснију екстракцију оквира, а приватно привремено стабло се уклања у `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` генерише детерминистичке стварне FFmpeg инструменте за уштеду титлова-позива након дедупирања, расподелу буџета са густим покретима, blur/exposure/SI-TI доказе, брзе резове са дугим репом и лажне позитивне резултате постепеног нестајања. Он бележи време зида пре анализе и, где је доступан `/usr/bin/time`, дете CPU и врх RSS. Његове провере квалитета су само структурна пророчишта. Прави квалитет модела титлова остаје `HOLD` јер овај појас нема овлашћену крајњу тачку или замрзнутог судију. Монетарна уштеда такође остаје `HOLD` осим ако `--caption-cost-per-call-usd` не пружи експлицитну позитивну процену по позиву; сценарио никада не измишља ниједан резултат.

Сваки оквир је ограничен на 4 MiB, сви необрађени оквири заједно на 23 MiB, а серијски одговор брокера на 32 MiB. Приватни привремени директоријум је уклоњен у `finally`. OmniRoute не повезује FFmpeg и не прихвата прилагођену извршну путању. Пре титловања, мост примењује конзервативни пролаз визуелне дедупликације: сваки JPEG се смањује на 16 × 16 бафера сивих тонова и упоређује се само са последњим задржаним оквиром. За тражени буџет титлова изнад једног оквира, екстракција обезбеђује ограничени скуп кандидата до два пута већи од буџета и никада више од 16 кадрова. Тражени лимит се примењује тек након дедупликације, при чему се први и последњи изабрани кандидати чувају током коначног проређивања када је буџет најмање два. Версионирана `grayscale-16x16-mean-cells-v2` политика користи већу од средње делте лума и односа сличица чија је нормализована делта најмање 0,05. Дупликат прага је константа 0,04, изабрана ради предвидљивости, а не изложена као поставка времена извршавања. Овај секундарни сигнал високог контраста чува мале покрете и промене видљивог текста које само средње поређење може да сакрије. Грешке компаратора или декодера се не отварају и задржавају покривеност. Излазни метаподаци одвајају екстраховане кандидате, успешно коришћене оквире и визуелне дупликате који су одбачени.

Експлицитно означени видео део може захтевати контакт листу са временским жигом. Мост гради JPEG мрежу са највише 4 стуба и 16 оквира. Свака ћелија од 512 пиксела сагорева своју изворну временску ознаку у доњи опсег високог контраста, док исте временске ознаке остају у текстуалним метаподацима за низводно повезивање и ревизију. Комплетан JPEG остаје ограничен на 32 MiB. Ако `sharp` не може да декодира или састави мрежу, мост се враћа на појединачне JPEG оквире; клијентски прекид се и даље шири кроз операцију листа.

Докази о промоцији су намерно одвојени од микробенцхмарка синтетичког састава. `scripts/perf/video-bridge-contact-sheet-eval.ts` дефинише A/B упртач са верзијом шеме за стварне моделе визије компатибилне са ОпенАИ. Мери токене које је пријавио провајдер, кашњење зида од краја до краја (укључујући састав листа), број позива модела и задржавање чињеница дефинисаних манифестом. Необрађени одговори модела се не уписују у извештај; задржавају се само SHA-256 дигести и подударне чињенице IDs. Упртач не обавља позиве мреже или плаћеног модела осим ако `--execute-real` није прослеђен и `--model`, `OMNIROUTE_BASE_URL` и `OMNIROUTE_API_KEY` нису конфигурисани. Без тог експлицитног стварног покретања, његова машински читљива пресуда остаје `HOLD`; само синтетичка мерења payload/call-count нису доказ промоције.

Позиваоци могу приложити опциони `transcript.cues` низ на подржани видео део када већ поседују поравнати текст. Сваки знак мора да носи `text`, коначан `start`/`end` интервал унутар испитиваног трајања и `source` на белој листи (`client`, `embedded` или `audio-bridge`); `confidence` подразумевано је `1` и мора остати између `0` и `1`. Тачни дупликати знакова су скупљени. OmniRoute никада не почиње транскрипцију из ових метаподатака: потврђени знакови се копирају у описани резултат са извором, поузданошћу и интервалом и приказују се као непоуздана запажања заједно са натписима оквира. Неважећи текст који је ван опсега или текст без порекла се одбија уместо мешања у ток титлова. Оба канала транскрипта тела захтева нормализују испоручено порекло за `client`, укључујући самопотврђене `embedded` или `audio-bridge` ознаке. Само адаптер у власништву сервера може да додели те поуздане ознаке преко аргумента `trustedSource` само за код; поље захтева JSON не може доћи до тог аргумента. Текст транскрипта остаје непоуздани медијски садржај, без обзира на његово порекло, и никада не сме да одређује ауторизацију.

Напредни позивалац може да обезбеди `audioTranscript` траку за исти видео; третира се као текст који даје клијент, а не као доказ транскрипције сервера. Фусион шав покреће визуелна и аудио запажања под једним сигналом рока и прекида, наређује их на заједничкој временској линији, скупља тачне дупликате и извештава о делимичном резултату када само једна страна успе. Неважећи `audioTranscript` деградира на тај делимични резултат — визуелни опис се чува и аудио грана снима дезинфиковани код грешке — уместо да поквари цео видео. Доступност по грани, делимична заставица и дезинфиковани кодови грешака су сачувани у описаном резултату, у метаподацима заштитне ограде (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), у метаподацима кеша резултата и у бројачима фузије моста. Подразумевана путања Видео Бридгеа не позива говор у текст нити преузима другу медијску копију; без те експлицитне нумере, остаје само видео.

**Задржавање транскрипта (#12150 П1).** Ово се аутоматски примењује кад год Видео Бридге (сам се укључи) прикаже знак транскрипта — не постоји посебна ознака за задржавање. Када захтев прикаже било који знак транскрипта ( `transcript` декларисан од позиваоца или спојени `audioTranscript`), заштитна ограда га означава `videoBridgeObserved` и производи редиговану сенку видео описа — идентично приказивање у коме је тело слободног текста сваког знака замењено `[redacted-video-transcript]`, изграђено тако што се поље стрцуе замењује пре него што је структура парцувер замењена спљоштен текст, тако да не може да преживи садржај који означава — адверсариал или обичан, укључујући тела која садрже `]` као што је `[inaudible]`/`[music]` — ). Упорно тело захтева за евиденцију позива мења сваки део текста изведен из видео записа за ту редиговану сенку, у складу са једнакошћу садржаја; `fullText` сидро се поново чита из готовог корисног оптерећења пре-позива, тако да поклапање и даље успева након што касније ланчане ограде ( PII и маскери акредитива, приоритети 10/95) препишу текст описа на место и након што system-prompt/handoff/memory ињекција преобликује низ порука. Тело послато узводно до модела је непромењено. Уочени захтев такође не попуњава трајну меморију (прескачују се и екстракција изведена из захтева и из одговора), тако да сопствени одговор модела не може да одрази текст транскрипта у меморију.

**Необрађена видео поља (#12430).** Када је мост омогућен, а подршка за изворни видео је непозната или одсутна, дефинисана поља `transcript`/`audioTranscript` такође активирају `videoBridgeObserved`, чак и након неуспеха описа или ограничења `maxVideos`. `null` и број празних стрингова; одсутна поља и не-видео метаподаци немају. Задржане копије редигују ова поља или изостављају захтев, а caches/Memory се заобилазе.

На тим резервним путањама, важећи знакови позиваоца постају подржани `text`/`input_text` делови уместо нестандардних поља добављача. Обе траке послате захтевом остају неповерљива запажања `client`, уз експлицитно упозорење да видео није описан и да временске ознаке нису верификоване у медијима. Постојећи 256-cue/64-KiB укупни и по-цуе буџети се примењују на два колосека заједно; временске ознаке морају одговарати брокеровом плафону од 600 секунди и сваком приложеном фокусном прозору. Неважеће нумере се одбацују, не прослеђују се као произвољан текст; важећи брат и сестра се и даље могу користити осим ако њихов комбиновани буџет није премашен. Null/empty поља не додају текст. Ова резервна верзија не додаје преузимање или транскрипцију медија. Поља проширења транскрипта се уклањају са резервног видео носача и његових `video_url`/`source` објеката. Листа дозвољених OpenAI жице остаје строга; непознати изворни видео носачи остају доступни, а познати само текстуални циљеви чувају безбедне маркере. Структурисане сенке редакције штите приложени текст транскрипта, док оригинални захтев у власништву позиваоца остаје непромењен. Циљеви и онеспособљени мостови који подржавају изворни систем задржавају постојеће понашање заобилазнице.

Додатне задржане копије користе исти сигнал посматраног захтева. Необрађени снимак клијентског захтева пре заштите, захтев на чекању у меморији и дневник раног одбијеног захтева структурално замењују поља транскрипта у видео деловима; стринг промпти синтетизовани фазама цевовода и предајом контекста се редигују у персистед-рекуест-боди синк. Трајни `video_content_removed` маркер чини да наставак `previous_response_id` не успе да се затвори уместо да реконструише текст који је намерно одбачен. Ако примећени захтев изгуби своју сенку редакције по делу пре евидентирања, или чак једна од неколико сенки видео записа не успе да се поклапа након каснијих мутација захтева, задржано тело захтева се у потпуности изоставља уместо да се задржи делимично редиговани транскрипт.

За посматрани захтев, одговор модела може цитирати било који део транскрипта без структуриране границе знака. Његов трајни дневник позива `responseBody` је стога замењен маркером изостављања; детаљни артефакт цевовода (који може укључивати upstream/client тела и делове тока) се не задржава. Семантички, идемпотенција и кеширање резоновања заобилазе читање и писање за тај захтев. Захтев провајдера и одговор који је видљив клијенту остају непромењени. Рани бајтови одржавања активности се одводе из привременог бафера када се изостави детаљни артефакт. Kiro-ово погрешно обликовано EventStream упозорење пријављује само број бајтова корисног оптерећења, никада његов садржај или сирову грешку JSON парсера. Ово не тврди да је свака неповезана provider/plugin дијагностика ревидирана; шири замах задржаног понора се прати у #11658.

Унутрашњи `/api/modality-bridge/video/drilldown` животни циклус је засебан, loopback/token-authenticated кеш супстрат. Свака операција такође захтева канонски непрозирни принципал ID. Пре него што се производни позивалац омогући, он мора да изведе тај ID од провереног закупца и никада не сме да проследи вредност коју је изабрао клијент. Кеш кључеви везују тог принципала за канонску сесију и видео-референцу IDs, чувају само своје SHA-256-derived кључеве и обухватају читање и брисање истог принципала. Кеш меморија чува највише 16 изведених JPEG оквира по уносу, истиче их након десет минута и подржава ограничено читање `start`/`end` или експлицитно брисање сесије.

Сваки принципал је ограничен на 16 уноса и 64 MiB канонских JPEG података. Та ограничења су независна од глобалне 64-entry/256 MiB горње границе: притисак квоте принципала избацује само најмање коришћене уносе тог принципала пре него што се разматра глобално избацивање LRU. Уноси који су истекли се бришу и из главног и из глобалног рачуноводства активности кеша, док отказивање и неуспех валидације не урезују делимичну замену.

Кеш меморија одбацује неканонски Басе64, вишак допуна, не-ЈПЕГ медије, деформисане или скраћене JPEGs и JPEGs који производе упозорење током ограниченог `sharp` декодирања пуне слике. Он поново кодира сваку прихваћену слику као канонски JPEG, извлачи ширину и висину из декодираних бајтова уместо да верује пољима позиваоца и одбацује све задње бајтове полиглота уместо да их задржава. Само ограничени канонски компримовани бафер се наплаћује за обе квоте. Ограничење JSON жице укључује Басе64 надземне трошкове за плафон декодираних улаза од 32 MiB. Свака ускладиштена деривација бележи валидирани JPEG format/resolution, политику узорковања, верзију деривације, време креирања, хеш садржаја који је израчунао сервер и хеширану родитељску референцу плус хеш родитељског садржаја поузданог позиваоца. Отказивање се проверава између асинхроних decode/hash фаза пре урезивања атомског кеша.

Произвођач продукције поново користи већ изведене брокерске оквире тек након успешне визуелне анализе, без другог видео download/extraction. Захтева оператор `modalityBridgeVideoDrilldownEnabled=true`, строги `drilldown: true` по делу и аутентификован запис АПИ кључа ID. principal/session вредности које је декларисао клијент никада не успостављају власништво. Без сва три услова не хешира, не мења величину или задржава додатне оквире. Неуспех задржавања чува употребљив визуелни одговор. Захтеви са сагласношћу заобилазе кеш резултата целог видеа, тако да се кеширани резултати никада не обрађују поново.

Успешни JSON и SSE одговори откривају највише четири непрозирна ручке у ограниченом `x-omniroute-video-drilldown` заглављу. Овлашћени извори претраживача могу да читају то заглавље без проширења политике порекла CORS. Нове ручке користе `v1.<32-byte random base64url token>`, а регистар задржава само њихове SHA-256 хешове. reader/header парсер такође прихвата старе 64-хек токене. Аутентификовани јавни потрошач је `GET /api/v1/video-bridge/drilldown?handle=...`, независно затворен од стране `modalityBridgeVideoDrilldownRemoteEnabled=true`. Експлицитно постојано лажно опозива приступ чак и када је омогућена застарела `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` енв резерва. Задржавање производње има аналогну застарелу `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` резерву. Обе резерве су подразумевано искључене.

Потрошач извлачи власништво из аутентификованог кључа и примењује политику кључа: и GET и DELETE припадају категорији крајње тачке `video`, укључујући псеудониме `/v1` и `/api/v1`. Кључеви са непразном листом дозвољених крајњих тачака морају укључивати `video`; неограничени кључеви остају компатибилни. Потрошач враћа исти 404 за непознате, истекле и ручице другог кључа. Прихвата `variant=preview|standard|detail` (максимална JPEG димензија 320/640/1280, никад увећана), `limit=1..8` (или застарели `frames` алиас, никад оба), `page` заснован на нули и опционе `start`/`end` секунде фокуса. Дупликати кључева за упите и прозори обрнутих фокуса се одбијају. Свака враћена варијанта има хеш свог стварног садржаја и стварне метаподатке резолуције, повезане са задржаним извором. Варијанте се изводе на читању, а не чувају као додатне задржане копије. JSON одговор, укључујући Base64/envelope, ограничен је на 32 MiB; превелика страница враћа 413 и клијент мора да захтева мање оквира. Чита отказивање провере око сваке промене величине и поново проверава валидност ручке пре враћања. `DELETE` од стране власника је идемпотентан; брисањем или истеком TTL ослобађа се задржани извор и рачуноводство коришћења.

Заједничко складиште је локално за процес: ручке истичу при поновном покретању и нису преносиве између независних OmniRoute процеса. Статистике управљања откривају ефективну политику задржавања/удаљене политике и збирни задржани само entries/bytes, никада медији, референце, главни IDs или ручке. Табла за подешавања видеа приказује те вредности и може да задржи оба прекидача сагласности. Ова имплементациона документација није доказ за примену или унапређење; прихватање реалног модела се прати одвојено.

Оквири су насловљени узастопно са конфигурисаним видео моделом. Празан видео оверриде наслеђује поставку Висион; ако су оба празна, Висион аутоматски рутер бира ефективни модел са могућношћу вида. Успешни натписи замењују оригинални део стабилним `[Video description:` префиксом који такође означава текст као непоуздано запажање изведено из медија и говори моделима на нижем нивоу да не прате упутства која се налазе у медијима. Кључеви кеша описа оквира укључују JPEG бајтове, промпт, временску ознаку и ефективни модел; само успешни титлови се кешују. Кеш уноси задржавају стварни модел успешног произвођача, укључујући резервни модел; мост извештава `mixed` када су различити модели произведени од стране различитих модела. Погодак у кеш меморији поново користи тај идентитет произвођача уместо да га поново означи као тражени план рутирања. Кеш резултата целог видеа је кључан на сваком улазу који мења излазну — промпт, ефективни модел, политику узорковања, број оквира, режим семантичке анализе, SHA-256 отисак прста нормализованог наговештаја фокуса, прозор фокуса, `transcript`, `audioTranscript` и заставицу листа контакта —, тако да промена било које од тих димензија никада није цацхе поновно коришћење стацхе. Верзија политике визуелног дедупирања, праг и ограничени број оквира кандидата су такође експлицитни у кључу кеша резултата и метаподацима; промена политике стога не може поново да користи застарели опис целог видеа. Метаподаци кеширања резултата в4 чувају режим и отисак прста, а никада необрађен задатак корисника. Гуардраил метаподаци извештавају о траженим и ефективним режимима анализе; захтевани `focused` режим без употребљивог корисничког текста се пријављује као ефективно `full`.

Заштитна ограда издваја сваки подржани видео део, али не описује више од `modalityBridgeVideoMaxVideos`. За циљ за који је доказано да има `supportsVideo === false`, неуспели и прекорачени видео снимци постају експлицитни безбедни текстуални маркери тако да ниједан необрађен видео не преживи. Када је способност непозната, ти делови задржавају свој видео носач; било који резервни транскрипт прати конверзију ограниченог текста изнад. Мете са `supportsVideo === true` заобилазе мост. Сигнал за прекид захтева клијента се шири кроз преузимање, ред брокера, подпроцесе и позиве титлова; прекида заустављање између видео снимака и никада се не отвара за сирове медије.

Подешавања времена извршавања су подржана од стране ДБ-а и Зод валидирана:

| Кључ                                | Подразумевано | Распон / понашање                                                                                    |
| ----------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`       | Опционо време извођења, укључивање                                                                   |
| `modalityBridgeVideoAnalysisMode`   | `"full"`      | `full` чува генеричке натписе; `focused` користи ограничени, непоуздани контекст последњег корисника |
| `modalityBridgeVideoModel`          | `""`          | Наследите модел Висион Бридге                                                                        |
| `modalityBridgeVideoFrameCount`     | `8`           | 1–16                                                                                                 |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`   | `uniform`, `scene_aware` или пропорционални `segment_aware`; грешка детектора се враћа на `uniform`  |
| `modalityBridgeVideoMaxVideos`      | `1`           | 1–4                                                                                                  |
| `modalityBridgeVideoTimeout`        | `120000`      | 1000–120000 мс                                                                                       |

Застареле вредности временског ограничења видеа изнад 120 секунди су везане за рок брокера; нова подешавања уписују изнад тог ограничења се одбијају. `GET /api/modality-bridge/video/runtime` захтева поуздани жигосани локалитет повратне петље пре провере аутентичности или провере времена извођења, а затим захтева потврду управљања. Враћа само `available`, дезинфиковане FFmpeg/ffprobe верзије и фиксни разлог када време извођења није доступно. Унутрашња крајња тачка екстракције није јавно отпремање API: засићење реда враћа `503` плус `Retry-After`, прекид везе позиваоца враћа `499`, а фиксни рок за посредника враћа `504`. Конвертовани одговори додају `video->text;model=<visionModel>;parts=<videos>` у централно `x-omniroute-modality-bridge` заглавље без уклањања Висион или Аудио сегмената.

### PII маскер (`piiMasker.ts`)

Ради даље **обоје** етапе.

- **`preCall`** клонира корисни терет, шета `system`, `messages`, `input` и `prompt` (укључујући обичне стрингове) и примењује `processPII()` (од `@/shared/utils/inputSanitizer`) на низ `content`/`text` поља. Када `PII_REDACTION_ENABLED=true`, откривени PII се редигује у одлазном терету. Ово је независно од `INPUT_SANITIZER_MODE` (који контролише само политику брзог убризгавања). Када је редиговање искључено, откривање записа позива се рачуна без поновног писања садржаја.
- **`postCall`** дубоко клонира одговор, покреће `sanitizePIIResponse()` плус маскер облика Респонсес-АПИ (`maskResponsesOutput` — покрива `output_text` и `output[].content[].text`). Ако дође до било какве редакције, измењени одговор замењује оригинал.

Заштитна ограда никада не блокира; само бележи (`meta.detections`, `meta.redacted`) или преписује.

#### Избор по типу, прилагођени обрасци и бројачи детекције

**Контролна табла → подешавања → безбедност → PII маскирање** бира _шта_ је маскирано. Не укључује маскирање: то је и даље `PII_REDACTION_ENABLED` (захтев) и `PII_RESPONSE_SANITIZATION` (одговор + SSE), оба су подразумевано искључена.

- **Избор по типу** — уграђени ИД-ови су наведени у `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Унсет означава сваки тип (понашање пре него што је ова поставка постојала). `ssn_us` образац мотора захтева мапира се у `ssn`. Шаблони (минимални, стандардни, финансијски, бразилски, USA, GDPR, POPIA, пуни) попуњавају само поља за потврду у UI.
- **GDPR и POPIA идентификатори** — дванаест уграђених ИД-ова који покривају EU и јужноафричке личне идентификаторе (табела испод). Њихови регуларни изрази, валидатори и ознаке надлежности живе у једној табели, `src/shared/utils/piiPatterns.ts`, коју користе и дезинфикатор одговора (`src/lib/piiSanitizer.ts`) и маскер захтева (`src/shared/utils/inputSanitizer.ts`). Подударање се редигује само када га валидатор прихвати; голи низ цифара никада није довољан. Оператор који је сачувао сужени избор пре него што су ови ИД-ови постојали задржава понашање које је имао док се нови ИД-ови не обележе.
- **Прилагођени обрасци** — до 20 шаблона регуларног израза или џокер знакова (`*` = до 64 знака без размака, `?` = један). Утакмице постају `[CUSTOM_REDACTED]`. Сваки образац пролази кроз `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): највише 500 знакова, заставице ограничене на `g i m s u`, морају се компајлирати, морају проћи `safe-regex` (катастрофално враћање уназад) и не смеју се подударати са празним стрингом или чуваром места за редиговање. Образац који не успе се одбија када се сачува и када се тестира, а ускладиштени ред који не успе се прескаче у току извршавања уместо да се компајлира. Прилагођени обрасци се покрећу само док је маскирање укључено.
- **Бројачи детекције** — броји по типу (никада усклађене вредности), чувају се у меморији и ресетују при поновном покретању (`src/lib/pii/piiDetectionStats.ts`). Они се само повећавају док је маскирање укључено.

Подешавања живе у `key_value` табели (именски простор `pii_settings`, `src/lib/db/piiSettings.ts`) и читају се кроз кеш меморију од 1 с. API:

| Metoda | Putanja                  | Svrha                                                                        |
| ------ | ------------------------ | ---------------------------------------------------------------------------- |
| `GET`  | `/api/settings/pii`      | Stanje zastavica, `enabledTypes`, `customPatterns`, brojači detekcije        |
| `PUT`  | `/api/settings/pii`      | Zamena `enabledTypes` (`null` = svi) i/ili `customPatterns`                  |
| `POST` | `/api/settings/pii/test` | Probno pokretanje jednog obrasca na uzorku od najviše 8 KB; ništa se ne čuva |

Сва три захтевају ауторизацију управљања и валидирају тело помоћу Zod (`src/shared/validation/schemas/piiSettings.ts`). Када је пријава онемогућена (`requireLogin=false`) `GET` и крајња тачка теста су отворени, али `PUT` и даље треба сесију контролне табле, `manage` -scope API кључ, `oma_` приступни токен са опсегом писања или вишим, или CLI токен или токен интерне услуге послат из повратне петље.

#### GDPR (EU) и POPIA (Јужна Африка) идентификатори

| ID                  | Идентификатор                     | Провера                                                                          |
| ------------------- | --------------------------------- | -------------------------------------------------------------------------------- |
| `iban`              | IBAN                              | Позната држава, тачна дужина за ту државу, ISO 13616 MOD-97-10                   |
| `eu_vat`            | ПДВ број EU-а                     | Познати префикс државе чланице и формат броја те државе (без упита VIES)         |
| `es_dni_nie`        | Шпански DNI / NIE                 | Контролно слово (вредност mod 23); NIE је `X/Y/Z` + 7 цифри                      |
| `it_codice_fiscale` | Италијански Codice Fiscale        | Контролно слово из табела непарних/парних положаја                               |
| `pl_pesel`          | Пољски PESEL                      | Пондерисани контролни збир и прихватљиви распони кодираног месеца/дана рођења    |
| `nl_bsn`            | Холандски BSN                     | Провера 11 (тежине 9..2, -1)                                                     |
| `de_steuer_id`      | Немачки Steuer-ID                 | ISO 7064 Mod 11,10 и правила структуре цифри (без почетне 0)                     |
| `se_personnummer`   | Шведски personnummer              | Luhn над последњих десет цифри и веродостојан датум рођења (10 или 12 цифри)     |
| `za_id`             | Јужноафрички идентификациони број | Luhn над свих 13 цифри, ваљан месец/дан рођења, цифра држављанства 0 или 1       |
| `za_phone`          | Јужноафрички телефон              | Префикс `+27` / `27` или национални облик `0..` написан с размаком или спојницом |
| `za_vat`            | Јужноафрички ПДВ број             | 10 цифри с почетном `4` **и** "VAT" / "BTW" у претходних 48 знакова              |
| `za_tax_ref`        | Јужноафричка пореска референца    | 10 цифри с почетном `0`-`3`, Luhn **и** "tax" / "SARS" у претходних 48 знакова   |

Пошто се формати само цифара сукобљавају са бројевима наруџбине, бројевима израде и временским ознакама, најслабијима (`za_vat`, `za_tax_ref`) је потребна кључна реч, а голи десетоцифрени `0..` број се не третира као јужноафрички телефонски број. Размак IBANs (`GB29 NWBK ...`) се не подудара. На путањи за стриминг, знак се тражи само унутар тренутног дела. ИД-ови се налазе испред генеричких образаца телефона, тако да валидирани идентификатор задржава сопствени чувар места (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr` и `popia` шаблони бирају EU и јужноафричке ИД-ове. Само маскирање остаје укључено (тврдо правило #20): ништа овде не мења подразумевану заставицу функције.

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
