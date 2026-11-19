# Guardrails (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Tiesos šaltinis:** `src/lib/guardrails/`
> **Paskutinį kartą atnaujinta:** 2026-10-17 — v3.8.52 (pridėta [Aprėptis ir apribojimai](#coverage-and-limits):
> kuriuos maršrutus ir atsakymų kelius pasiekia kabliukai, sujungtos išjungimo antraštės (#16412), injekcijos
> blokavimo režimas kaip privaloma riba (#16413) ir kas mato atsakymą prieš post-call)

Apsaugos (angl. _guardrails_) vykdo saugos, politikos ir turinio transformacijas
riboje tarp OmniRoute ir išorinių tiekėjų. Kiekviena apsauga gali tikrinti (ir
pasirinktinai atmesti, transformuoti arba anotuoti) užklausų duomenis
(`preCall`) ir išorinių tiekėjų atsakymus (`postCall`).

Sistema veikia **fail-open** principu (gedus lieka atvira): jei apsauga vykdymo
metu meta klaidą, registras užregistruoja klaidą ir pereina prie kitos apsaugos,
o ne žlugdo užklausos. Blokavimas yra sąmoningas sprendimas (`block: true`),
niekada – atsitiktinumas. Vienintelė išimtis – nutraukta užklausa: kai kvietėjo
`signal` nutraukiamas, klaidą metanti apsauga atmeta kabliuko vykdymą, o ne būna
praleidžiama.

Kabliukai **nevykdomi** kiekviename maršrute ir ne su kiekvienu atsakymu. Prieš
pasikliaudami apsauga kaip saugumo priemone, perskaitykite
[Aprėptis ir apribojimai](#coverage-and-limits).

## Įmontuoti apsauginiai turėklai

Registras automatiškai įkelia šešis apsauginius turėklus pirmumo tvarka importuojant (žr. `registry.ts` → `registerDefaultGuardrails()`):

| Pirmenybė | Vardas              | Etapas (-ai)   | Failas                |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Paleidžiami žemesnio prioriteto numeriai** pirma** .

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 bazinis modelis ir `glm-5.3-{low,high,max}` turi aiškius `supportsVision:false` registry/spec metaduomenis. GLM 5.3 Flash“ variantai išlieka vietiniais modeliais. Claude kodo `/v1/messages` maršrutas patenka į bendrinamą `handleChat` išankstinio skambučio apsauginių turėklų grandinę** prieš** vertimas iš Claude į OpenAI; įdėtieji `Read` įrankio rezultatų vaizdai turi būti aprašyti arba apdoroti, kol vertimas juos pakelia į OpenAI `image_url` turinį (#17069).

Perima vaizdinius užklausas, skirtas** neregėjimo modeliai** ir arba nukreipia visą užklausą į regėjimą palaikantį modelį, arba pakeičia vaizdo dalis tekstiniais aprašymais, sukurtais konfigūruojamo regėjimo modelio prieš iškvietimą. Tai leidžia tik teksto teikėjams skaidriai tvarkyti daugiarūšius krovinius.

Srautas:

1. Praleiskite, jei tikslinis modelis jau palaiko regėjimą (nebent jis rodomas priverstinio tilto sąraše `isVisionBridgeForcedModel`).
2. Išskleiskite vaizdo dalis per `extractImageParts(messages)` (`visionBridgeHelpers.ts`), kuri perduoda į** vieningas žiniasklaidos detektorius** `detectMediaParts()` in `open-sse/utils/mediaParts.ts` — vienintelis tiesos šaltinis, bendrinamas su kombinuotu suderinamumo filtru. Ištraukimas įtrauktas į leistinų formų, kurias `replaceImageParts` gali susijungti atgal, sąrašą (ištrauka ↔ pakeičia sutartį): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` ir Atsakymai API `input_image`. Atitinkami vaizdai, įterpti Claude Code `tool_result.content` ir atsakymų įrankio išvestėse, taip pat išgaunami ir pakeičiami pradiniais keliais; Tik indikatoriaus formos yra kombinuoto filtro medžiaga ir nėra išgaunamos. Praleiskite, jei nerasta.
3. Išspręskite vykdymo laiko konfigūraciją per `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`): nauji `modalityBridge*` nustatymų klavišai laimi; senieji `visionBridge*` raktai išlieka a** vieno ciklo atsarginė dalis** (grįžimo langas). Praleiskite prieš bet kokį žiniasklaidos perėjimą, kai tiltas išjungtas.
4. Režimo parinkiklis (`modalityBridgeVisionMode`, žr. lentelę žemiau) nusprendžia pakeisti maršrutą, palyginti su aprašymu. Reroute grąžina `modifiedPayload` su pakeista tik `model` ir meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Apibūdinkite kelią: apribokite vaizdus `maxImages`, sukurkite užduotį suvokiantį raginimą, peržiūrėkite aprašo talpyklą, iškvieskite regėjimo modelį** lygiagrečiai** (`Promise.allSettled`), ir įterpkite `[Image N]: <description>` teksto dalis į jų vietą. Nepavykęs aprašymas duoda `null`: neapdorotas vaizdas išsaugomas unknown/vision-capable taikiniams (#4012), bet** patvirtintas tik teksto tiesioginis tikslas** arba zero-vision derinys gauna aiškų `(unavailable — no vision-capable provider connected)` teksto skiltį kiekvienam neaprašytam vaizdui, įskaitant dalinius gedimus ir vaizdus, užžengiančius už aprašymo skambučio ribos (#17069). Esamas „viskas nepavyko“ derinys, apibūdinantis atsarginį variantą, lieka vietoje (#8430).
6. Grąžinkite `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Režimo parinkiklis (`modalityBridgeVisionMode`)

| Režimas    | Numatytoji | Elgesys                                                                                                                                                                                                                                                                                           |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔          | Senasis euristinis, nepaliestas (#6640/#7204): ne Combo/`auto/` modeliai nukreipia į geriausią regėjimo modelį, nebent pradinis modelis jau turi tinkamus naudoti kredencialus (tada aprašykite); kombinuoti tikslai visada aprašomi.                                                             |
| `describe` |            | Visada apibūdinkite — maršruto keitimo blokas būtų visiškai praleistas; visada atsako vartotojo pasirinktas modelis.                                                                                                                                                                              |
| `reroute`  |            | Priverstinis maršruto keitimas: modelio saugojimo kredencialų apsauga apeinama. Maršrutas iš naujo -** taikinys** kredencialų apsauga vis tiek taiko — kai nėra tinkamo regėjimo objekto, tiltas blokuoja su aiškia klaida, o ne aprašo arba siunčia neapdorotus vaizdus tik tekstiniam objektui. |

Priverstinių režimų trumpasis jungimas** prieš** automatinis euristikos vykdymas; `auto` elgesys yra baitas identiškas pre-PR-1 apsauginiam turėklui.

#### API rakto apimtis (`visionBridgeKeyScope.ts`)

Kai skambinančiojo API klavišas apriboja `allowedConnections`, kvotų telkinius (`allowedQuotas`) arba modelius (`allowedModels` / `blockedModels` / `modelAccessMode: "restricted"` / `disableNonPublicModels`), tiltas tik parenka maršrutą ir aprašo modelius, kuriuos gali naudoti raktas, o jungtyse, kurias gali naudoti raktas. Tada aprašomasis skambutis visada eina per OmniRoute savarankišką kilpą su `x-omniroute-self-loop-key-id` antrašte, todėl pokalbio užklausa, kurią gauna, vėl įgyvendina to rakto ryšio ir modelio politiką. `enforceApiKeyPolicy()` gerbia tą antraštę tik kartu su savaiminio ciklo nešikliu, todėl gali tik susiaurinti prieigą, o id, kuris neišsprendžiamas, yra atmetamas.

Jei raktui neleidžiamas joks regėjimo modelis, a** patvirtintas tik teksto tikslas** atmeta vaizdo užklausą vietoje su aiškiu HTTP 400, o ne persiunčia vaizdo baitus į nepajėgią prieš srovę (#17069). Taikiniams, turintiems nežinomą arba įprastą regėjimo galimybę, aprašomas kelias išlaiko savo ankstesnę nesėkmės atkūrimo elgseną (meta `{ skipped: true, reason: "no_permitted_vision_model" }`). Užklausos be rakto ir raktai be šių apribojimų veikia lygiai taip pat, kaip ir anksčiau.

#### Užduotis suprantantis aprašo raginimas (`modalityBridgeVisionTaskAware`)

Numatytoji** tiesa** . `composeVisionPrompt()` (`visionBridgeHelpers.ts`) prideda tekstą** paskutinė vartotojo žinutė** (sutrumpintą iki 500 simbolių) iki pagrindinio aprašymo raginimo, nukreipiantį aprašą į tai, ko vartotojas iš tikrųjų prašė (kodekso regėjimo tarpinio serverio šablonas) ir prašydamas regėjimo modelio perrašyti matomą tekstą. Kai vėliavėlė išjungta — arba nėra vartotojo teksto — pagrindinė eilutė naudojama nepakitusi.

Aprašymo savaiminio ciklo su OpenAI suderinama užklausa (`callVisionModelSingle()` in `visionBridgeHelpers.ts`) visada reikalauja `image_url.detail: "high"` — besąlygiškai, kiekvienam caller/provider, nesusijusiam su jokiu kliento signalu. Mažos detalės atranka sumažina OCR tikslumą, tiksliai atliekant teksto transkripcijos užduotį, kurios reikalauja šis raginimas, todėl pačiame aprašymo iškvietime visada prašoma išsamios informacijos, nepaisant to, kokį detalumo lygį naudojo pradinė gaunama užklausa. Tai turi įtakos tik vidinei aprašymo užklausos struktūrai; tai nekeičia, kaip OmniRoute persiunčia paties skambinančiojo `image_url.detail` pirminėje užklausoje —, kad numatytasis parametras taikomas atskirai ir tik aptiktiems OpenCode klientams `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Aprašymo savaiminio ciklo Anthropic laido formato šaka neturi `detail` lauko ir jai įtakos neturi nė vienas numatytasis nustatymas.

#### Apibūdinkite išvesties dangtelį (`modalityBridgeVisionMaxChars`)

| Raktas                         | Numatytoji | Diapazonas          |
| ------------------------------ | ---------- | ------------------- |
| `modalityBridgeVisionMaxChars` | `0`        | `0` arba 100–50 000 |

`0` (numatytasis) reiškia** be dangtelio** — `callVisionModel()` grąžintas aprašymas perduodamas nepakeistas, išsaugant esamą elgesį. Bet kuri reikšmė diapazone nuo 100 iki 50 000 sutrumpina aprašymą su `…` priesaga, prieš tai sujungiant atgal kaip `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` in `src/lib/guardrails/visionBridge.ts`). Padidinkite tai, jei norite atlikti sudėtingas OCR užduotis, kai tolesniam modeliui reikia visos transkripcijos; sumažinkite jį iki apriboto žetonų naudojimo plepių matymo modeliuose. Prietaisų skydelio laukas yra skirtuko „Vision“ skydelyje „Išplėstinė“ (`modality-bridge-max-chars` in `ModalityBridgeVisionTab.tsx`) ir fiksuoja bet kokią reikšmę nuo 1 iki 99 iki 100 aukšto, paliekant nepaliestą `0` — `0` yra galiojanti Zod reikšmė savaime (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), o ne tik numatytasis „unset“.

#### Apibūdinkite talpyklą (`modalityBridge/bridgeCache.ts`)

Atmintyje esanti LRU + TTL talpykla, skirta išvestims aprašyti, bendrinama visame procese. Klavišas = `sha256(imageRef + composedPrompt + configuredBridgeModel)` su ilgio priešdėliu įrėminti (nėra lauko ribos susidūrimų). Modelio komponentas yra** sukonfigūruotas** tilto modelis, o ne modelis, kuris iš tikrųjų atsakė — `callVisionModel` gali atsitraukti viduje, o įvedus raktus per bandymą, talpykla būtų suskaidyta. Nepavykę aprašymai niekada neįtraukiami į talpyklą. Nustatymai:

| Raktas                          | Numatytoji | Diapazonas |
| ------------------------------- | ---------- | ---------- |
| `modalityBridgeCacheEnabled`    | `true`     | —          |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440     |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000    |

#### Nuotolinis vaizdo normalizavimas (savaiminio ciklo describe/base64 gavimas)

Kai tiltas atneša a** nuotolinio valdymo pultas** pats vaizdas — Anthropic aprašo savaiminį iškvietimą ir Claude-wire formato base64 konvertavimą (`ensureBase64ImagesForClaudeWire`), abu per `fetchRemoteImageAsDataUri()` in `visionBridgeHelpers.ts` — gauti duomenys URI perduodami per `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) prieš įterpiant į regėjimo modelio užklausą. Per dideli vaizdai sumažinami iki a** 2048px ilgio kraštas** (atitinka dydžio keitimo ribą OpenAI/Anthropic jau taikoma serverio pusė), kuri sumažina įkėlimo bytes/latency nekeičiant to, ką mato vizijos modelis. Keičiant dydį naudojamas `sharp`, įkeltas naudojant dinaminį importavimą: platformoje, kur nepavyksta įkelti jo savosios dvejetainės programos, `normalizeDataUri()`** niekada nemeta** — jis grįžta į pradinių baitų perdavimą, todėl describe/base64-conversion kelias visada veikia. Ne vaizdo baitai (paėmimas, kuris negrąžino iškoduojamo vaizdo) taip pat perduodami nepaliesti. Šis normalizavimas taikomas vaizdams, kuriuos tiltas gauna savo paties iškvietimui — jis niekada netaikomas neapdorotam skambinančiojo pralaidumo kroviniui, atitinkantį tik pasirenkamos mutacijos principą (kieta taisyklė #20).

#### Nustatymų schema + migracija

Nauji `modalityBridge*` klavišai Zod patvirtinti `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` trio ir `modalityBridgeAudio*` grupėje, kurią naudoja garso tiltas. Perkėlimas `141_modality_bridge_settings.sql` nukopijuoja esamas pasenusias `visionBridge*` reikšmes į atitinkamus naujus raktus (idempotentas, niekada neperrašo operatoriaus nustatytos `modalityBridge*` reikšmės); senieji raktai lieka priimti kaip atsarginis skaitymo būdas vienam išleidimo ciklui.

#### Skaidrumo antraštės + statistika

Apibūdinkite transformuotus atsakymus turi `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (sukurta `buildModalityBridgeHeader()` į `modalityBridge/bridgeStats.ts`, pažymėta `withModalityBridgeHeader()` į `src/sse/handlers/chatHelpers.ts`). Iš naujo nukreiptos užklausos gaunamos** ne** antraštė — naudingoji apkrova buvo nepaliesta, o modelio keitimas jau matomas atsakymo korpuso `model` lauke.

`GET /api/modality-bridge/stats` (valdymo autentifikavimas, ta pati pakopa kaip ir `GET /api/settings`) pateikia atmintyje esančius modalumo skaitiklius `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` skirtus `vision`, `audio` ir `video`. `averageLatencyMs` kaip vardiklį naudoja `latencySamples`, o ne visus bandymus; operacija be laiko nesukuria nulio milisekundžių mėginio. `bridged` išlieka atgaliniu būdu suderinamas sėkmingų konversijų slapyvardis; nesėkmingi bandymai jo nepadidina. Skaitikliai atkuriami iš naujo paleidus procesą pagal projektą (telemetrija, o ne apskaita).

#### Prietaisų skydelio konfigūracija

Specialus prietaisų skydelio puslapis yra `/dashboard/settings/modality-bridge`. Jo URL adresuojami `Vision`, `Audio` ir `Video` skirtukai išsaugo užklausos parametrus perjungdami `tab` reikšmę. Skirtuke „Vision“ rodomas įgalinimas, režimas, modelio pasirinkimas (įskaitant automatinį numatytąjį), užduotį suvokiantys raginimai, išplėstinės timeout/image/description-length/cache ribos, vykdymo laiko skaitikliai ir saugoma pavyzdžio užklausa. Skirtukas Garsas taip pat veikia: jame rodomas įgalinimas, tik STT modelio rinkiklis su automatiniu režimu, timeout/max-clip ribos, garso skaitikliai ir `input_audio` mėginio testas. Skirtukas Vaizdo įrašas yra funkcionalus: jis praneša apie FFmpeg/ffprobe vykdymo būseną — vieną iš keturių aiškių UI būsenų (`unknown`, kol zondas skrenda arba jo negalėjo užbaigti, `restricted` neciklinio atgalinio prietaisų skydelio pagrindiniame kompiuteryje, kuriame zondas praleidžiamas kliento pusėje, `unavailable` patikrinus ir patvirtinus, kad jo nėra, arba `available` versija su FFmpeg/ffprobe ). — enable/model/frame/video/timeout filtruoja modelių rinkiklį į modelius, turinčius regėjimą, ir atskleidžia vaizdo skaitiklius.

Buvusi Vision Bridge kortelė AI nustatymuose yra suderinamumo nuoroda į naują puslapį; jai nebepriklauso antrasis formos egzempliorius. Medijos teikėjai taip pat susieja vaizdo į tekstą ir kalbos į tekstą darbo eigas su atitinkamais Modality Bridge skirtukais, nepašalindami esamos kalbos į tekstą žaidimų aikštelės.

**Savarankiško įėjimo aplinkkelis:** kai aprašomi skambučio maršrutai per OmniRoute `/v1` kilpą (nestandartinis teikėjo modelis), antrinė užklausa siunčia `x-omniroute-admission-bypass: internal` ir yra autentifikuojama naudojant išspręstą savaiminio ciklo kredencialą — vietinį `sk_omniroute` sentinel vietiniu režimu arba operatoriaus sukonfigūruotą `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` `REQUIRE_API_KEY=true` raktą, kad būtų galima naudoti #1350) skambinti. Apėjimas taikomas tik už tuos tikslius kredencialus, todėl išoriniai klientai negali naudoti antraštės, kad praleistų priėmimą.

Pasenusios numatytosios nuostatos gyvena `src/shared/constants/visionBridgeDefaults.ts`; nauji mode/task-aware/cache numatytieji nustatymai ir nustatymų sprendiklis veikia `src/shared/constants/modalityBridgeDefaults.ts`. Apsauginis turėklas atskleidžia `deps` konstruktoriaus parinktį, todėl bandymai gali įterpti netikrus `getSettings` ir `callVisionModel` diegimus.

### Garso tiltas (`audioBridge.ts`) — Modality Bridge PR-3

Perima garsą turinčias pokalbių užklausas, kol jos pasiekia tikslą, kuris, kaip žinoma, nepriima garso įvesties. Jis niekada neperadresuoja pokalbio užklausos: garso dalys perrašomos naudojant esamą su OpenAI suderinamą kelių dalių galinį tašką, o pasirinktas pokalbio modelis tęsiamas su teksto nuorašais.

Srautas:

1. Išspręskite `supportsAudio` per `getResolvedModelCapabilities()`. Laimi aiškūs teikėjo registro metaduomenys, tada statiniai modelio metaduomenys, tada sinchronizuojami `modalities_input`. Deklaruotas įvesties sąrašas be `audio` yra `false`; `null` nelieka jokių pajėgumų įrodymų. Tiek `false`, tiek `null` suaktyvina konservatyvųjį tiltą, o `true` jį apeina.
2. Išspręskite `modalityBridgeAudio*` nustatymus ir iš kiekvieno pranešimo ištraukite sujungiamas aukščiausio lygio garso dalis per bendrinamą `detectMediaParts()` detektorių. Palaikomos vielos formos yra OpenAI `input_audio`, `audio_url` ir `source.media_type: "audio/*"`. Įdėtas garsas aptinkamas nukreipiant, bet nepašalinamas sujungimo keliu. Darbas apribotas `modalityBridgeAudioMaxClips`; vėlesnės dalys lieka nepaliestos.
3. Gerbkite sukonfigūruotą `provider/model` arba leiskite `selectAudioBridgeModel()` vaikščioti `AUDIO_TRANSCRIPTION_PROVIDERS` stabilia katalogo tvarka ir pasirinkite pirmąjį modelį su tinkamu naudoti aktyviu teikėjo kredencialu.
4. `callAudioTranscription()` konvertuoja base64/data-URI garsą į kelių dalių `file` arba atsisiunčia nuotolinį `audio_url` per tik viešą išeinančią apsaugą su DNS prisegimu ir 25 MB susiejimu. Tada POSTs failas ir pasirinktas modelis į vietinę `/v1/audio/transcriptions` saviciklą, autentifikuotą naudojant `resolveSelfLoopBearer()`. Esamas transkripcijos maršrutas atlieka įprastą kredencialų paiešką, cooldown/rate-limit tvarkymą ir teikėjo siuntimą.
5. Sėkmingų skambučių dalis pakeičiama `[Audio N]: <transcript>`. Skambučiai vykdomi naudojant `Promise.allSettled`: atskiras gedimas išsaugo originalią garso dalį (#4012 sutartis). Jei kiekvienas skambutis nepavyksta ir taikinys įrodomas `supportsAudio === false`, dalys tampa `[Audio N]: (unavailable — no STT provider connected)` (#8430 sutartis). Jei tai nežinomas tikslas (`null`), visos nesėkmės rezultatas lieka nepaliestas. Įrodyta, kad tik teksto taikinys, neturintis tinkamų STT kredencialų, gauna tą patį aiškų stulpelį, neskelbdamas tinklo skambučio.

Sėkminguose nuorašuose naudojama viso proceso Modality Bridge LRU/TTL talpykla. Raktas sujungia garso nuorodą, stabilios `audio-transcription` operacijos etiketę ir pasirinktą STT modelį; gedimai niekada nėra talpinami. Garso bandymai atnaujina bendrinamus `bridged`, `cacheHits`, `failures` ir `lastUsedAt` skaitiklius. Transformuoti atsakymai neša `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nepaliestos užklausos negauna garso tilto segmento.

Vykdymo laiko nustatymai palaikomi DB ir patvirtinami Zod:

| Raktas                        | Numatytoji | Diapazonas       |
| ----------------------------- | ---------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`     | —                |
| `modalityBridgeAudioModel`    | `""`       | Auto arba STT ID |
| `modalityBridgeAudioTimeout`  | `60000`    | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`        | 1–10             |

Bendrinamą talpyklą ir toliau valdo `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ir `modalityBridgeCacheMaxEntries`.

### Vaizdo įrašų tiltas (`videoBridge.ts`, `videoBridgePipeline.ts`)

Perima aukščiausio lygio vaizdo įrašų dalis pokalbių užbaigimo `messages` ir atsakymų API `input` prieš iškviečiant tikslą be žinomo vietinio vaizdo palaikymo. Palaikomos formos yra `input_video`, `video_url`, `video_source`, HTTPS URLs ir `data:video/*;base64,...` data URIs. Paprasti failų pavadinimai tekste nelaikomi vaizdo įrašais.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) priklauso užklausos perkėlimas, capability/policy patikra, užklausos agregacija ir atsakymo apkrova. Kiekvieno vaizdo įrašo darbo — gavimas, viso rezultato talpykla, aprašanti kadrų seką (kuri sujungia bet kokį skambinančiojo deklaruotą garso įrašą) ir kiekvieno bandymo metrics/abort/cleanup — yra paslėpta už `processVideoPart` `videoBridgePipeline.ts`, iškviečiama vieną kartą kiekvienoje vaizdo įrašo dalyje `preCall` kilpoje. Šis modulis taip pat apibrėžia aiškias prievado ribas `VideoMediaBrokerPort` (baitų gavimas ir atrinktų kadrų išskyrimas), `VideoAudioTranscriptionPort` (skambintojo deklaruoto garso nuorašo sujungimas su atrinktomis antraštėmis) ir `VideoDrilldownPort` (senstelėjusi neapdorotos parduotuvės forma). Gamybos STT ir rėmo sulaikymas sudaromas aplink aprašomą prievadą per `createVideoSttAdapter` ir `createVideoDrilldownAdapter`; pastarasis naudoja bendrą nepermatomos rankenos gyvavimo ciklą.

Viešasis `/v1` užklausos kelias niekada neimportuoja ir neiškviečia antrinio proceso. Nuotoliniai vaizdo įrašai atsisiunčiami 50 MiB ribose; Inline base64 vaizdo įrašai turi konservatyvų 36 MiB dekoduotą vaizdo įrašo ribą, todėl model/messages/framing vokas gali likti viešosios JSON užklausos priėmimo ribos 50 MiB ribose. Prieš paskirstant tikrinami eilučių ilgio ir dekoduoto dydžio įverčiai. HTTPS reikalingas pradiniame nuotoliniame URL ir kiekviename peradresavime, naudojant esamą tik viešą išeinančią apsaugą su DNS prisegimu. Tada baitai kerta tikslią vidinę `POST /api/modality-bridge/video/extract` tarpininko ribą. Tas maršrutas yra ir `LOCAL_ONLY` ir `SPAWN_CAPABLE`, jis priima tik kiekvienam procesui autentifikuotą, patikimą atgalinio ciklo užklausą ir niekada nepriima URL, failų sistemos kelio, vykdomojo failo ar argumentų sąrašo. API korpuso dydžio vamzdynas ir prižiūrėtojo laipsniškas korpuso skaitytuvas nepriklausomai užtikrina 50 MiB tarpininko įvesties dangtelį. Jo apribotoje eilėje vienu metu vykdomas vienas ištraukimas, leidžiamos keturios laukiančios užduotys, o laukiančios įvesties ribos yra 100 MiB.

Brokerio viduje `ffprobe` skaito privatų vietinį failą; į fiksuoto formato leidžiamųjų sąrašą neįtraukiami grojaraščio ir aprašo formatai. Leidžiamų MOV šeimos sudėtinių rodinių išorinės MOV duomenų nuorodos pagal numatytuosius nustatymus lieka išjungtos, o fiksuota komanda jų nepasirenka. Tiek `ffprobe` tiek `ffmpeg` naudoja `file` -only protokolo baltąjį sąrašą, vieną giją, fiksuotus argumentų masyvus, be apvalkalo ir vykdomuosius failus, išspręstus iš `PATH`. Prisegtų paveikslėlių viršelių srautai nėra tinkami leisti. Visi leidžiami srautai turi atitikti apribojimus, o aiškus numatytasis srautas yra pageidaujamas prieš deterministinį žemiausio indekso atsarginį srautą. Vaizdo įrašai ribojami iki 600 sekundžių, 8 192 pikselių kiekviename matmenyje ir 33 554 432 šaltinio pikselių. FFmpeg atrenka 1–16 vidurio taško JPEG kadrų, sumažina ilgąjį kraštą iki daugiausiai iki 1 024 pikselių nedidindamas mažesnių įvesties mastelio ir niekada negauna URL. Pagal numatytuosius nustatymus atranka yra `uniform`. Pasirenkama `scene_aware` ir eksperimentinė `segment_aware` politika atlieka vieną papildomą fiksuotą FFmpeg perėjimą per jau patvirtintą vietinį srautą, pasirenka ribotas `showinfo` scenos laiko žymes ir deterministiškai grįžta į tuos pačius vienodus vidurio taškus detektoriaus gedimo, skirtojo laiko, netinkamai suformuotos išvesties ar tuščio kandidatų rinkinio atveju. Segmento suvokimo režimas paskirsto vidurio taško pavyzdžius proporcingai patvirtintiems scenos intervalams; segmentą žinomi įrodymai ir atsarginis elgesys yra išsamiai aprašyti toliau. Kietas 16 kadrų riba taikomas pasirinkus kiekvienoje politikoje. Kai scenos užklausa turi tik vieno kadro biudžetą, ji naudoja vienodą aktyvaus viso vaizdo įrašo arba fokusavimo lango vidurio tašką ir praneša `policyEffective: uniform`: vienas pasirinktas scenos kadras negali išsaugoti abiejų laiko galų. Skambinantis asmuo gali pasirinktinai pateikti baigtinį fokusavimo langą (`start`/`end` sekundės); ribos apribojamos laikmenos trukme, atvirkštiniai arba nebaigti langai atmetami, o visos atrankos strategijos atliekamos tik normalizuoto intervalo ribose. Gautas langas įtraukiamas į atrankos metaduomenis ir į nepatikimą aprašo priešdėlį, kad paskesni modeliai galėtų atskirti sutelktą ištrauką nuo visos laiko juostos.

Semantinės antraštės dėmesys yra atskiras, aiškus nustatymas. Numatytasis `full` analizės režimas išsaugo esamą kadro raginimą ir niekada nepersiunčia užklausos teksto antraštės modeliui. `focused` režimu tiltas nuskaito tik naujausią netuščią vartotojo sukurtą `text`/`input_text` iš to paties pokalbių ar atsakymų konteinerio, normalizuoja jį į NFC, sutraukia valdymo simbolius ir tarpą ir apriboja iki 500 unikodo kodo taškų. Tuščias rezultatas grįžta į tikslią `full` raginimą. Naudojama užuomina yra suskirstyta į JSON tam skirtame nepatikimo vartotojo konteksto bloke ir gali teikti pirmenybę tik pastebimai detalei; ji negali nepaisyti atskiro įspėjimo, kad nesilaikoma laikmenoje matomų ar girdimų instrukcijų. Teksto fokusavimas niekada nenurodo `start`/`end` ir nekeičia laiko mėginių ėmiklio.

#### FU-07 struktūrinio segmento įrodymai

`segment_aware` naudoja vieną ribotą išankstinės analizės leidimą per jau patvirtintą vietinį vaizdo įrašų srautą. Fiksuotoji filtro grandinė pirmiausia padidinama iki 320 pikselių pločio, aptinka scenos pokyčius ir fiksuotus intervalus, tada ima mėginius 1 kadru per sekundę, kad gautų suliejimo, vidutinės šviesos ir spatial/temporal informaciją. Leidimas ribojamas iki 600 struktūrinių pavyzdžių, vienos FFmpeg/filter gijos, to paties `file` -only protokolo ir konteinerio leidžiamųjų sąrašų, 1 MiB proceso išvesties susiejimo ir daugiausia 30 sekundžių tarpininko bendrame abort/deadline. Jis niekada nepriima komandos, filtro, kelio ar URL iš užklausos.

Struktūrinės reikšmės yra deterministiniai atrankos įrodymai, o ne semantinis vaizdo supratimas. Jie nenurodo temų, veiksmų, antraščių, kalbos ar naudotojo ketinimų. Scenos ir užšalimo ribos sudaro segmentus; fiksuotas aprėptis, suliejimas, ekspozicija, erdvinės detalės ir laiko pokytis turi įtakos tik esamo 1–16 kadrų biudžeto paskirstymui. Visiškai užšaldytas segmentas yra apribotas viename kadre, o neužšaldyti segmentai konkuruoja dėl likusio biudžeto. Kai ribos viršija kadrų skaičių, išlaikoma vienoda laiko juostos aprėptis, todėl greitas ankstyvas pjūvis negali paslėpti ilgo užpakalinio segmento. Scenos ribos 1 sekundės analizės skiriamojoje geboje yra sujungiamos.

Trūksta filtrų, malformed/empty įrodymų, detektoriaus klaida arba ribotas išankstinės analizės skirtasis laikas neatitinka tikslios vienodos vidurio taško politikos. Skambinančiojo nutraukimo arba tarpininko termino atidarymas nenutrūksta: jis nutraukia skrydžio metu vykstantį subprocesą, neleidžia vėliau išgauti kadrų, o privatus laikinas medis pašalinamas iš `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` sukuria deterministinius realius FFmpeg įrenginius, skirtus sutaupyti po subtitrų iškvietimo, tankaus biudžeto paskirstymo, blur/exposure/SI-TI įrodymų, greitų pjūvių su ilga uodega ir laipsniško klaidingų teigiamų rezultatų išnykimo. Jis įrašo išankstinės analizės sienelės laiką ir, kur galimas `/usr/bin/time`, antrinį CPU ir didžiausią RSS. Jo kokybės patikrinimai yra tik struktūriniai orakulai. Tikroji antraštės modelio kokybė išlieka `HOLD` nes šis diržas neturi patvirtinto galutinio taško ar užšaldyto teisėjo. Pinigų santaupos taip pat išlieka `HOLD` nebent `--caption-cost-per-call-usd` pateiktų aiškų teigiamą vieno skambučio įvertį; scenarijus niekada nesufabrikuoja nė vieno rezultato.

Kiekvienas kadras yra apribotas iki 4 MiB, visi neapdoroti kadrai kartu iki 23 MiB, o serijinio tarpininko atsakas iki 32 MiB. Privatus laikinas katalogas pašalinamas iš `finally`. OmniRoute nesujungia FFmpeg ir nepriima pasirinktinio vykdomojo kelio. Prieš pateikdamas antraštes, tiltas taiko konservatyvų vizualinį dubliavimo panaikinimą: kiekvienas JPEG sumažinamas iki 16 × 16 pilkos spalvos buferio ir lyginamas tik su paskutiniu išsaugotu kadru. Jei pageidaujamas subtitrų biudžetas viršija vieną kadrą, išskyrimas suteikia ribotą kandidatų grupę iki dvigubai didesnio biudžeto ir niekada ne daugiau kaip 16 kadrų. Prašoma viršutinė riba taikoma tik pašalinus dubliavimą, o pirmieji ir galutiniai atrinkti kandidatai išsaugomi galutinio retinimo metu, kai biudžetas yra ne mažesnis kaip du. Versija `grayscale-16x16-mean-cells-v2` politika naudoja didesnę iš vidutinės luma delta ir miniatiūros langelių, kurių normalizuota delta yra bent 0,05, santykį. Pasikartojimo slenkstis yra pastovi 0,04, pasirinkta dėl nuspėjamumo, o ne rodoma kaip vykdymo laiko nustatymas. Šis antrinis didelio kontrasto signalas išsaugo nedidelius judesius ir matomus teksto pakeitimus, kuriuos galima paslėpti tik palyginus. Komparatoriaus arba dekoderio klaidos nepavyksta atidaryti ir išlaikyti aprėptį. Išvesties metaduomenys atskiria ištrauktus kandidatus, sėkmingai panaudotus kadrus ir atmeta vaizdines kopijas.

Aiškiai pažymėta vaizdo įrašo dalis gali reikalauti kontaktinio lapo su laiko žyma. Tiltas sudaro daugiausia 4 kolonų, 16 rėmų JPEG tinklelį. Kiekvienas 512 pikselių langelis įrašo šaltinio laiko žymą į didelio kontrasto apatinę juostą, o tos pačios laiko žymos išlieka tekstiniuose metaduomenyse, kad būtų galima susieti ir tikrinti. Visas JPEG lieka apribotas iki 32 MiB. Jei `sharp` negali iššifruoti arba sudaryti tinklelio, tiltas grįžta į atskirus JPEG kadrus; kliento nutraukimas vis tiek sklinda per lapo operaciją.

Reklamos įrodymai yra sąmoningai atskirti nuo sintetinės sudėties mikrobenchmark. `scripts/perf/video-bridge-contact-sheet-eval.ts` apibrėžia schemos versijos A/B diržus tikriems su OpenAI suderinamiems regėjimo modeliams. Jis matuoja teikėjo praneštus prieigos raktus, visos sienos delsą (įskaitant lapo sudėtį), modelio skambučių skaičių ir akivaizdžiai apibrėžtų faktų išsaugojimą. Neapdoroti modelio atsakymai į ataskaitą nerašomi; išsaugomi tik SHA-256 santraukos ir suderinti faktai IDs. Laidai nesukelia tinklo ar mokamo modelio skambučio, nebent `--execute-real` perduodamas ir `--model`, `OMNIROUTE_BASE_URL` ir `OMNIROUTE_API_KEY` sukonfigūruoti. Be to aiškaus tikrojo paleidimo jo mašininiu būdu nuskaitomas verdiktas išlieka `HOLD`; Vien sintetiniai payload/call-count matavimai nėra skatinimo įrodymas.

Skambinantys asmenys gali pridėti pasirenkamą `transcript.cues` masyvą prie palaikomos vaizdo dalies, kai jie jau turi išlygiuotą tekstą. Kiekvienas signalas turi turėti `text`, baigtinį `start`/`end` intervalą tiriamos trukmės viduje ir baltąjį sąrašą įtrauktą `source` (`client`, `embedded` arba `audio-bridge`); `confidence` numatytoji reikšmė yra `1` ir turi likti tarp `0` ir `1`. Tikslūs pasikartojantys ženklai sutraukiami. OmniRoute niekada nepradeda transkripcijos iš šių metaduomenų: patvirtinti ženklai nukopijuojami į aprašytą rezultatą su šaltiniu, patikimumu ir intervalu ir pateikiami kaip nepatikimi stebėjimai kartu su rėmelio antraštėmis. Netinkamas, už diapazono ribų arba be kilmės tekstas atmetamas, o ne įmaišomas į subtitrų srautą. Abu užklausos teksto nuorašo kanalai normalizuoja pateiktą `client` kilmę, įskaitant savarankiškas `embedded` arba `audio-bridge` etiketes. Tik serveriui priklausantis adapteris gali priskirti tas patikimas etiketes naudodamas tik kodo `trustedSource` argumentą; užklausos JSON laukas negali pasiekti šio argumento. Nuorašo tekstas išlieka nepatikimas iš žiniasklaidos gautas turinys, neatsižvelgiant į jo kilmę, ir jokiu būdu neturi nustatyti įgaliojimo.

Pažangus skambinantis asmuo gali pateikti `audioTranscript` takelį tam pačiam vaizdo įrašui; jis traktuojamas kaip kliento pateiktas tekstas, o ne serverio transkripcijos įrodymas. Sujungimo siūlė vykdo vaizdo ir garso stebėjimus pagal vieną terminą ir nutraukia signalą, užsako juos pagal bendrą laiko juostą, sutraukia tikslius dublikatus ir praneša dalinį rezultatą, kai pasiseka tik vienai pusei. Netinkamas `audioTranscript` pablogėja iki dalinio rezultato — vaizdinis aprašymas išsaugomas, o garso atšaka įrašo sutvarkytą gedimo kodą — o ne visą vaizdo įrašą. Atšakos pasiekiamumas, dalinė vėliavėlė ir išvalyti gedimų kodai išsaugomi aprašytame rezultate, apsauginės juostos metaduomenyse (`audioFusionRuns`/`audioFusionPartials`/ `audioFusionFailureCodes`), rezultatų talpyklos metaduomenyse ir tilto sujungimo skaitikliuose. Numatytasis vaizdo tilto kelias neiškviečia kalbos į tekstą arba neatsisiunčia antros medijos kopijos; be šio aiškaus takelio jis lieka tik vaizdo įrašui.

**Nuorašo išlaikymas (#12150 P1).** Tai taikoma automatiškai, kai vaizdo įrašų tiltas (pats pasirenkamas) pateikia nuorašo signalą — nėra atskiros saugojimo vėliavėlės. Kai užklausa pateikia bet kokį transkripcijos signalą (skambinančiojo paskelbtą `transcript` arba sulietą `audioTranscript`), apsauginis turėklas pažymi jį `videoBridgeObserved` ir sukuria redaguotą vaizdo įrašo aprašo šešėlį — identišką atvaizdavimą, kuriame kiekvieno signalo laisvo teksto turinys pakeičiamas `[redacted-video-transcript]`, sudarytas pakeičiant lauką. suplotas tekstas, todėl joks užuominos turinys — priešingas ar įprastas, įskaitant elementus, kuriuose yra `]`, pvz., `[inaudible]`/`[music]` — negali išlikti). Išlikęs skambučių žurnalo užklausos turinys pakeičia kiekvieną vaizdo įrašo teksto dalį į tą redaguotą šešėlį, atitinkantį turinio lygybę; `fullText` inkaras iš naujo nuskaitomas iš baigto išankstinio iškvietimo apsauginio turėklo naudingosios apkrovos, todėl atitiktis vis tiek pavyksta, kai vėlesni grandinės apsauginiai turėklai ( PII ir kredencialų maskuokliai, prioritetai 10/95) perrašo aprašo tekstą į vietą ir po system-prompt/handoff/memory injekcijos performuoja pranešimų masyvą. Prieš srovę iki modelio siunčiamas korpusas nepasikeitė. Stebėta užklausa taip pat neužpildo jokios patvarios atminties (ir užklausos, ir atsakymo ištraukimas praleidžiamas), todėl paties modelio atsakymas negali atkartoti nuorašo teksto į atmintį.

**Neapdoroti vaizdo laukai (#12430).** Kai tiltas įgalintas, o vietinis vaizdo įrašo palaikymas nežinomas arba jo nėra, apibrėžti `transcript`/`audioTranscript` laukai taip pat suaktyvina `videoBridgeObserved`, net jei aprašoma klaida arba `maxVideos` riba. `null` ir tuščių eilučių skaičius; nėra laukų ir ne vaizdo įrašo metaduomenų. Išsaugotos kopijos redukuoja šiuos laukus arba praleidžia užklausą, o caches/Memory apeinamas.

Šiuose atsarginiuose keliuose galiojantys skambintojo užuominos tampa palaikomomis `text`/`input_text` dalimis, o ne nestandartiniais teikėjo laukais. Abu pagal užklausą pateikti takeliai išlieka nepatikimi `client` stebėjimai su aišku įspėjimu, kad vaizdo įrašas nebuvo aprašytas ir laiko žymos nebuvo patikrintos pagal žiniasklaidą. Esamas 256-cue/64-KiB bendras ir už cue biudžetas taikomas abiem takeliams kartu; laiko žymos turi atitikti tarpininko 600 sekundžių ribas ir bet kurį pateiktą fokusavimo langelį. Netinkami takeliai atmetami, nepersiunčiami kaip savavališkas tekstas; galiojantį brolį ir seserį vis tiek galima naudoti, nebent būtų viršytas jų bendras biudžetas. Null/empty laukai neprideda jokio teksto. Šis atsarginis failas neprideda jokios medijos gavimo ar transkripcijos. Nuorašo plėtinio laukai pašalinami iš atsarginės vaizdo laikmenos ir jos `video_url`/`source` objektų. OpenAI laidų leidžiamasis sąrašas išlieka griežtas; Nežinomos vietinės vaizdo įrašų laikmenos išlieka prieinamos, o žinomi tik tekstiniai objektai saugo saugius žymeklius. Struktūriniai redagavimo šešėliai apsaugo pridėtą nuorašo tekstą, o pradinė skambintojui priklausanti užklausa lieka nepakitusi. Vietiniai palaikomi taikiniai ir neįgalūs tiltai išlaiko esamą aplinkkelio elgesį.

Papildomos saugomos kopijos naudoja tą patį stebimo užklausos signalą. Neapdorotas išankstinės apsaugos kliento užklausos momentinis vaizdas, atmintyje laukiama užklausa ir išankstinių atmestų užklausų žurnalas struktūriškai pakeičia nuorašo laukus vaizdo įrašų dalyse; eilučių raginimai, susintetinti konvejerio etapais ir konteksto perdavimu, yra redaguojami persted-request-body sink. Išlikęs `video_content_removed` žymeklis neleidžia `previous_response_id` tęstinumui uždaryti, o ne atkurti tekstą, kuris buvo sąmoningai atmestas. Jei stebima užklausa prieš registruojant praranda savo dalies redagavimo šešėlį arba net vienas iš kelių vaizdo šešėlių nesutampa po vėlesnių užklausų mutacijų, išsaugotas užklausos turinys visiškai praleidžiamas, o ne išsaugomas iš dalies redaguotas nuorašas.

Stebėtos užklausos modelio atsakyme gali būti cituojama bet kuri nuorašo dalis be struktūrinės užuominos ribos. Todėl jo išlikęs skambučių žurnalo `responseBody` pakeičiamas praleidimo žymekliu; detalus dujotiekio artefaktas (kuris gali apimti upstream/client korpusus ir srauto dalis) neišsaugomas. Semantinės, idempotencijos ir samprotavimo pakartojimo talpyklos apeina tos užklausos nuskaitymą ir rašymą. Teikėjo užklausa ir kliento matomas atsakymas lieka nepakitę. Ankstyvieji išlikimo baitai išleidžiami iš laikinojo buferio, kai praleidžiamas išsamus artefaktas. Netinkamai suformuotas KiroEventStream įspėjimas praneša tik apie naudingos apkrovos baitų skaičių, o ne apie jo turinį ar neapdorotą JSON analizatoriaus klaidą. Tai nereiškia, kad kiekviena nesusijusi provider/plugin diagnostika buvo patikrinta; platesnis išlaikomas kriauklės šlavimas stebimas #11658.

Vidinis `/api/modality-bridge/video/drilldown` gyvavimo ciklas yra atskiras loopback/token-authenticated talpyklos substratas. Kiekvienai operacijai taip pat reikalingas kanoninis nepermatomas principas ID. Prieš įgalindamas gamybos skambutį, jis turi gauti tą ID iš autentifikuoto nuomininko ir niekada negali persiųsti kliento pasirinktos vertės. Talpyklos raktai susieja tą pagrindinį elementą su kanonine seansu ir vaizdo įrašo nuoroda IDs, saugo tik jų SHA-256-derived raktus ir nuskaito ir ištrynė tą patį pagrindinį kodą. Talpykloje saugoma daugiausia 16 išvestinių JPEG kadrų viename įraše, jų galiojimas baigiasi po dešimties minučių ir palaiko ribotą `start`/`end` skaitymą arba aiškų seanso ištrynimą.

Kiekvienas pagrindinis ribojamas iki 16 įrašų ir 64 MiB kanoninių JPEG duomenų. Šios ribos nepriklauso nuo pasaulinės 64-entry/256 MiB ribos: pagrindinis kvotos spaudimas iškeldina tik to direktoriaus rečiausiai naudotus įrašus prieš svarstant visuotinį LRU iškeldinimą. Įrašai, kurių galiojimo laikas pasibaigęs, išvalomi tiek iš pagrindinės, tiek iš bendrosios talpyklos veiklos apskaitos, o atšaukimo ir patvirtinimo gedimas neįpareigoja dalinio pakeitimo.

Talpykla atmeta nekanoninį Base64, perteklinį užpildymą, ne JPEG laikmeną, netinkamai suformuotą arba sutrumpintą JPEGs ir JPEGs, kurie pateikia įspėjimą apriboto viso vaizdo `sharp` dekodavimo metu. Jis iš naujo užkoduoja kiekvieną priimtą vaizdą kaip kanoninį JPEG, iš dekoduotų baitų išveda plotį ir aukštį, o ne pasitiki skambinančiojo laukais, ir atmeta visus galimus poliglotinius baitus, o ne juos išlaiko. Tik apribotas kanoninis suspaustas buferis apmokestinamas abiejose kvotose. Į JSON laidų limitą įeina Base64 viršutinės ribos, skirtos 32 MiB dekoduoto įvesties luboms. Kiekvienas saugomas darinys įrašo patvirtintą JPEG format/resolution, atrankos politiką, išvedimo versiją, sukūrimo laiką, serverio apskaičiuotą turinio maišą ir pirminę maišos nuorodą bei patikimo skambinančiojo pirminio turinio maišą. Atšaukimas tikrinamas tarp asinchroninių decode/hash fazių prieš atominės talpyklos įsipareigojimą.

Gamybos gamintojas pakartotinai naudoja jau gautus tarpininko kadrus tik po sėkmingos vizualinės analizės, be antrojo vaizdo įrašo download/extraction. Tam reikalingas operatorius `modalityBridgeVideoDrilldownEnabled=true`, griežtas dalis `drilldown: true` ir autentifikuotas API rakto įrašas ID. Kliento deklaruotos principal/session vertės niekada nenustato nuosavybės. Be visų trijų sąlygų jis nekeičia maišos, nekeičia dydžio ir neišlaiko papildomų kadrų. Dėl sulaikymo gedimo išsaugomas tinkamas vaizdinis atsakas. Sutiktos užklausos apeina viso vaizdo įrašo rezultatų talpyklą, todėl talpykloje saugomi rezultatai niekada nebus atkuriami.

Sėkmingi JSON ir SSE atsakymai apribotoje `x-omniroute-video-drilldown` antraštėje atskleidžia daugiausia keturias nepermatomas rankenas. Įgaliotieji naršyklės šaltiniai gali nuskaityti tą antraštę neišplėsdami CORS kilmės politikos. Naujose rankenose naudojama `v1.<32-byte random base64url token>`, o registre išsaugomos tik jų SHA-256 maišos. reader/header analizatorius taip pat priima senus 64 šešioliktainių žetonus. Autentifikuotas viešasis vartotojas yra `GET /api/v1/video-bridge/drilldown?handle=...`, nepriklausomas `modalityBridgeVideoDrilldownRemoteEnabled=true`. Aiškus išlikęs klaidingas atšaukia prieigą, net kai įgalintas senas `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` env atsarginis variantas. Gamybos išlaikymas turi analogišką palikimą `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` atsarginį variantą. Abu atsarginiai variantai išjungti pagal nutylėjimą.

Vartotojas įgyja nuosavybės teisę iš autentifikuoto rakto ir taiko rakto politiką: ir GET, ir DELETE priklauso `video` galutinio taško kategorijai, įskaitant `/v1` ir `/api/v1` slapyvardžius. Raktuose su netuščiu galutinio taško leidžiamuoju sąrašu turi būti `video`; neriboti raktai išlieka suderinami. Vartotojas grąžina tą patį 404 už nežinomas, pasibaigusio galiojimo ir kito rakto rankenas. Jis priima `variant=preview|standard|detail` (maksimalus JPEG matmuo 320/640/1280, niekada nepadidintas), `limit=1..8` (arba senas `frames` slapyvardis, niekada abu), nulinis `page` ir pasirenkamas `start`/`end` fokusavimo sekundes. Pasikartojantys užklausos raktai ir atvirkštinio fokusavimo langai atmetami. Kiekvienas grąžintas variantas turi tikrojo turinio maišą ir tikrosios skyros metaduomenis, susietus su išsaugotu šaltiniu. Variantai gaunami nuskaitant, o ne saugomi kaip papildomos saugomos kopijos. JSON atsakas, įskaitant Base64/envelope, yra apribotas iki 32 MiB; per didelis puslapis grąžina 413 ir klientas turi prašyti mažiau kadrų. Nuskaito patikrinimo atšaukimą aplink kiekvieną dydžio keitimą ir dar kartą patikrina rankenos galiojimą prieš grįždamas. `DELETE` pagal savininką yra idempotentas; ištrynimas arba TTL galiojimo laikas išleidžia išsaugotą šaltinio ir naudojimo apskaitą.

Bendrinama saugykla yra procesų vietinė: rankenos baigiasi paleidus iš naujo ir nėra perkeliamos tarp nepriklausomų OmniRoute procesų. Valdymo statistika atskleidžia veiksmingą saugojimo / nuotolinio valdymo politiką ir apibendrina tik išsaugotą entries/bytes, niekada medijos, nuorodų, pagrindinių IDs ar rankenų. Vaizdo įrašo nustatymų skydelyje rodomos šios vertės ir gali likti abu sutikimo jungikliai. Ši įgyvendinimo dokumentacija nėra tiesioginis diegimo ar reklamavimo įrodymas; realaus modelio priėmimas stebimas atskirai.

Kadrai antraštės pateikiamos nuosekliai su sukonfigūruotu vaizdo įrašo modeliu. Tuščias vaizdo įrašo nepaisymas paveldi Vizijos nustatymą; jei abu yra tušti, automatinis „Vision“ maršruto parinktuvas pasirenka veiksmingą regėjimą palaikantį modelį. Sėkmingi antraštės pakeičia pradinę dalį stabiliu `[Video description:` priešdėliu, kuris taip pat pažymi tekstą kaip nepatikimą žiniasklaidos gautą stebėjimą ir nurodo tolesniems modeliams nesilaikyti žiniasklaidoje rastų instrukcijų. Rėmelio antraštės talpyklos raktai apima JPEG baitus, raginimą, laiko žymą ir efektyvų modelį; talpykloje saugomi tik sėkmingi subtitrai. Talpyklos įrašai išlaiko faktinį sėkmingą gamintojo modelį, įskaitant atsarginį modelį; tiltas praneša `mixed` kai skirtingi rėmai buvo pagaminti naudojant skirtingus modelius. Talpyklos įvykis pakartotinai naudoja tą gamintojo tapatybę, o ne perskiria ją kaip prašomą maršruto planą. Viso vaizdo įrašo rezultatų talpykla įvedama prie kiekvienos įvesties, kuri keičia išvesties — raginimą, efektyvų modelį, atrankos politiką, kadrų skaičių, semantinės analizės režimą, normalizuoto fokusavimo užuominos SHA-256 piršto atspaudą, fokusavimo langą, `transcript`, `audioTranscript` ir kontaktinio lapo vėliavėlę —, todėl bet kurio iš šių matmenų keitimas nėra pakartotinis talpyklos matmenų keitimas. Vizuali panaikinimo politikos versija, slenkstis ir ribotas kandidatų kadrų skaičius taip pat yra aiškiai nurodyti rezultatų talpyklos rakte ir metaduomenyse; todėl politikos pakeitimas negali pakartotinai naudoti pasenusio viso vaizdo įrašo aprašo. Rezultatų talpyklos v4 metaduomenys išlaiko režimą ir kontrolinį kodą, o ne neapdorotą vartotojo užduotį. „Guardrail“ metaduomenys praneša apie prašomą ir veiksmingą analizės režimą; prašomas `focused` režimas be tinkamo vartotojo teksto pranešamas kaip veiksmingas `full`.

Apsauginis turėklas ištraukia kiekvieną palaikomą vaizdo įrašo dalį, bet aprašo ne daugiau kaip `modalityBridgeVideoMaxVideos`. Įrodyta, kad taikinys turi `supportsVideo === false`, nesėkmingi ir viršijantys vaizdo įrašai tampa aiškiais saugiais teksto žymekliais, todėl neapdorotas vaizdo įrašas neišliks. Kai galimybės nežinomos, šios dalys išlaiko savo vaizdo laikmeną; bet koks atsarginis nuorašas atitinka aukščiau pateiktą riboto teksto konvertavimą. Taikiniai su `supportsVideo === true` apeina tiltą. Kliento užklausos nutraukimo signalas sklinda per atsisiuntimą, tarpininko eilę, subprocesus ir antraščių iškvietimus; nutraukimai sustoja tarp vaizdo įrašų ir niekada nepasiduoda atvirai neapdorotai laikmenai.

Vykdymo laiko nustatymai palaikomi DB ir patvirtinami Zod:

| Raktas                              | Numatytoji  | Diapazonas / elgesys                                                                                     |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Pasirenkama vykdymo laikas, pasirinkti                                                                   |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` išsaugo bendruosius antraštes; `focused` naudoja ribotą, nepatikimą naujausio vartotojo kontekstą |
| `modalityBridgeVideoModel`          | `""`        | Paveldėkite Vision Bridge modelį                                                                         |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                     |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` arba proporcingas `segment_aware`; detektoriaus gedimas grįžta į `uniform`      |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                      |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120 000 ms                                                                                          |

Pasenusios išliekančios vaizdo įrašo skirtojo laiko vertės, viršijančios 120 sekundžių, priskiriamos prie tarpininko termino; nauji nustatymai rašo virš tos ribos yra atmetami. `GET /api/modality-bridge/video/runtime` reikalauja patikimos antspauduotos kilpos vietos prieš autentifikavimą arba vykdymo laiką, tada reikia valdymo autentifikavimo. Jis pateikia tik `available`, išvalytas FFmpeg/ffprobe versijas ir fiksuotą priežastį, kai vykdymo laikas nepasiekiamas. Vidinis ištraukimo galutinis taškas nėra viešas įkėlimas API: eilės prisotinimas grąžina `503` plius `Retry-After`, skambintojo atsijungimas grąžina `499`, o fiksuotas tarpininko terminas grąžina `504`. Konvertuoti atsakymai prideda `video->text;model=<visionModel>;parts=<videos>` prie centrinės `x-omniroute-modality-bridge` antraštės nepašalinant „Vision“ ar „Audio“ segmentų.

### PII masker (`piiMasker.ts`)

Važiuoja toliau** tiek** etapai.

- **`preCall`** klonuoja naudingą apkrovą, eina `system`, `messages`, `input` ir `prompt` (įskaitant paprastos eilutės elementus) ir pritaiko `processPII()` (iš `@/shared/utils/inputSanitizer`) eilutės `content`/`text` laukams. Kai `PII_REDACTION_ENABLED=true`, aptiktas PII yra redaguojamas išsiunčiamoje naudingojoje apkrovoje. Tai nepriklauso nuo `INPUT_SANITIZER_MODE` (kuris valdo tik greito įpurškimo politiką). Kai redagavimas išjungtas, skambutis įrašo aptikimo skaičių neperrašant turinio.
- **`postCall`** giliai klonuoja atsakymą, paleidžia `sanitizePIIResponse()` ir Responses-API formos maskavimo priemonę (`maskResponsesOutput` — apima `output_text` ir `output[].content[].text`). Jei įvyksta koks nors redagavimas, pakeistas atsakymas pakeičia originalą.

Apsauginis turėklas niekada neužblokuoja; jis tik anotuoja (`meta.detections`, `meta.redacted`) arba perrašo.

#### Pasirinkimas pagal tipą, pasirinktiniai modeliai ir aptikimo skaitikliai

**Prietaisų skydelis → Nustatymai → Sauga → PII maskavimas** pasirenka _kas_ yra užmaskuota. Jis neįjungia maskavimo: tai vis tiek yra `PII_REDACTION_ENABLED` (užklausa) ir `PII_RESPONSE_SANITIZATION` (atsakymas + SSE), abu pagal numatytuosius nustatymus išjungti.

- **Pasirinkimas pagal tipą** — įtaisytieji ID yra išvardyti `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nenustatytas reiškia kiekvieną tipą (elgseną prieš šį nustatymą). Užklausos variklio `ssn_us` šablonas susietas su `ssn`. Šablonai (minimalus, standartinis, finansinis, braziliškas, USA, GDPR, POPIA, pilnas) užpildo tik UI žymimuosius laukelius.
- **GDPR ir POPIA identifikatoriai** — dvylika integruotų ID, apimančių EU ir Pietų Afrikos asmens identifikatorius (lentelė toliau). Jų regex, tikrintuvai ir jurisdikcijos žymos yra vienoje lentelėje `src/shared/utils/piiPatterns.ts`, kurią naudoja ir atsako dezinfekavimo priemonė (`src/lib/piiSanitizer.ts`), ir užklausų maskuoklis (`src/shared/utils/inputSanitizer.ts`). Atitiktis redukuojama tik tada, kai jos tikrintojas ją priima; vien skaitmenų eigos niekada neužtenka. Operatorius, išsaugojęs susiaurintą pasirinkimą prieš egzistuojant šiems ID, elgiasi taip, kaip buvo, kol bus pažymėti nauji ID.
- **Individualūs modeliai** — iki 20 reguliariųjų arba pakaitos simbolių šablonų (`*` = iki 64 ne tarpo simbolių, `?` = vienas). Degtukai tampa `[CUSTOM_REDACTED]`. Kiekvienas šablonas eina per `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): daugiausia 500 simbolių, vėliavėlės ribojamos iki `g i m s u`, turi būti kompiliuojamos, turi praeiti `safe-regex` (katastrofiškas atšaukimas) ir neturi atitikti tuščios eilutės arba redagavimo vietos rezervavimo ženklo. Neveikiantis šablonas išsaugomas ir išbandomas atmetamas, o išsaugota nesėkminga eilutė praleidžiama vykdymo metu, o ne kompiliuojama. Priskirti šablonai veikia tik tada, kai įjungtas maskavimas.
- **Aptikimo skaitikliai** — skaičiai kiekvienam tipui (niekada nesutampa reikšmės), saugomi atmintyje ir nustatomi iš naujo paleidus iš naujo (`src/lib/pii/piiDetectionStats.ts`). Jie tik didėja, kai veikia maskavimas.

Nustatymai yra `key_value` lentelėje (vardų erdvė `pii_settings`, `src/lib/db/piiSettings.ts`) ir nuskaitomi per 1 s talpyklą. API:

| Metodas | Kelias                   | Tikslas                                                                             |
| ------- | ------------------------ | ----------------------------------------------------------------------------------- |
| `GET`   | `/api/settings/pii`      | Vėliavos būsena, `enabledTypes`, `customPatterns`, aptikimo skaitikliai             |
| `PUT`   | `/api/settings/pii`      | Pakeiskite `enabledTypes` (`null` = all) and/or `customPatterns`                    |
| `POST`  | `/api/settings/pii/test` | Sausai paleisti vieną modelį pagal ne daugiau kaip 8 KB pavyzdį; nieko nėra saugoma |

Visiems trims reikia valdymo autentifikavimo ir patvirtinti kūną Zod (`src/shared/validation/schemas/piiSettings.ts`). Kai prisijungimas išjungtas (`requireLogin=false`), `GET` ir bandomasis galutinis taškas yra atidaryti, bet `PUT` vis tiek reikia prietaisų skydelio seanso, `manage` -scope API rakto, `oma_` prieigos prieigos rakto su rašymo apimtimi arba didesne arba CLI prieigos rakto arba vidinės paslaugos prieigos rakto, išsiųsto iš grįžtamojo ryšio.

#### GDPR (EU) ir POPIA (Pietų Afrika) identifikatoriai

| Id                  | Identifikatorius            | Patvirtinimas                                                                             |
| ------------------- | --------------------------- | ----------------------------------------------------------------------------------------- |
| `iban`              | IBAN                        | Žinoma šalis, tikslus tos šalies ilgis, ISO 13616 MOD-97-10                               |
| `eu_vat`            | EU VAT numeris              | Žinomas valstybės narės priešdėlis ir tos valstybės numerio formatas (be VIES paieškos)   |
| `es_dni_nie`        | ispanų DNI / NIE            | Kontrolinė raidė (reikšmė mod 23); NIE yra `X/Y/Z` + 7 skaitmenys                         |
| `it_codice_fiscale` | Itališkas Codice Fiscale    | Kontrolinė raidė iš odd/even padėties lentelių                                            |
| `pl_pesel`          | Lenkijos PESEL              | Svertinė kontrolinė suma ir užkoduota gimimo data                                         |
| `nl_bsn`            | olandų BSN                  | 11 atsparumas (svoriai 9..2, -1)                                                          |
| `de_steuer_id`      | Vokietijos Steuer-ID        | ISO 7064 Mod 11,10 plius skaitmenų struktūros taisyklės (be 0 priekyje)                   |
| `se_personnummer`   | Švedijos personalas         | Luhn per pastaruosius dešimt skaitmenų ir tikėtiną gimimo datą (10 arba 12 skaitmenų)     |
| `za_id`             | Pietų Afrikos ID numeris    | Luhn per visus 13 skaitmenų, galiojantis gimimo month/day, pilietybės skaitmuo 0 arba 1   |
| `za_phone`          | Pietų Afrikos telefonas     | `+27` / `27` priešdėlis arba nacionalinė `0..` forma, parašyta tarpu arba brūkšneliu      |
| `za_vat`            | Pietų Afrikos VAT numeris   | 10 skaitmenų, prasidedančių `4`** ir** "VAT" / "BTW" ankstesniuose 48 simboliuose         |
| `za_tax_ref`        | Pietų Afrikos mokesčių ref. | 10 skaitmenų, prasidedančių `0`–`3`, Luhn,** ir** „tax“ / „SARS“ 48 simboliuose prieš tai |

Kadangi tik skaitmenų formatai susiduria su užsakymų numeriais, kūrimo numeriais ir laiko žymomis, silpniausiems (`za_vat`, `za_tax_ref`) reikia raktinio žodžio cue, o tuščias dešimties skaitmenų `0..` numeris nėra traktuojamas kaip Pietų Afrikos telefono numeris. Tarpais esantys IBANs (`GB29 NWBK ...`) nesutampa. Srautinio perdavimo kelyje užuomina ieškoma tik dabartinės dalies viduje. ID yra prieš bendruosius telefono modelius, todėl patvirtintas identifikatorius išlaiko savo rezervuotąją vietą (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr` ir `popia` šablonai parenka atitinkamai EU ir Pietų Afrikos ID. Pats maskavimas lieka pasirenkamas (Hard Rule #20): niekas čia nekeičia numatytosios funkcijos vėliavėlės.

### Greitas įpurškimas (`promptInjection.ts`)

Aptinka priešiškas struktūras vartotojo pateiktame turinyje ir įgyvendina sukonfigūruotą politiką. Elgesį lemia aplinkos kintamieji ir konstruktoriaus parinktys:

| Nustatymas        | Env var                                                                                                  | Numatytoji | Efektas                                                                                                                                                                                           |
| ----------------- | -------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Įjungta           | `INPUT_SANITIZER_ENABLED`                                                                                | `true`     | Kai `false`, apsauginiai turėklai trumpi jungimai.                                                                                                                                                |
| Režimas           | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                          | `warn`     | Įpurškimo politika: `block`, `warn` arba `log`. (`redact` yra priimtas naudojant back-compat, bet taip** ne** juostelės įpurškimo tekstas; užklausą PII perrašyti valdo `PII_REDACTION_ENABLED`.) |
| Blokuoti slenkstį | `blockThreshold` parinktis / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`     | Užblokavimui reikalingas minimalus sunkumas. Numatytoji priemonė yra tik stebėjimo priemonė.                                                                                                      |

**Režimo pirmenybė** (`getMode`): skambinantis `options.mode` → `INJECTION_GUARD_MODE`**DB funkcijos-vėliavos nepaisymas** (Prietaisų skydelio → nustatymai → funkcijų vėliavėlės) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env → `warn`. Todėl prietaisų skydelio nepaisymas laimi prieš env vars, todėl funkcijų vėliavėlės UI valdo važiavimo apsaugą tiesiogiai (nepaleidžiama iš naujo). DB skaitymas yra saugus nuo gedimų: jei jis sugenda, apsauga grįžta prie env pagrįstos elgsenos, o kai nenustatytas nepaisymas, elgsena yra identiška tik env skiriamajai gebai.

Aptikimo šaltiniai:

1. `sanitizeRequest()` iš `@/shared/utils/inputSanitizer` (bendras detektorių rinkinys, naudojamas kitur vamzdyne).
2. Integruotas `DEFAULT_GUARD_PATTERNS` (šiuo metu `system_override_inline` ir `markdown_system_block`, abiejų `high` sunkumas).
3. Pasirenkama `customPatterns` perduodama per konstruktoriaus parinktis (eilutės, reguliarioji išraiška arba `{ name, pattern, severity }` įrašai).

Kai `mode === "block"`** ir** bent vienas aptikimas atitinka sunkumo slenkstį, `preCall` grąžina `{ block: true, message: "Request rejected: suspicious content detected" }`. `warn`/`log` režimais apsauginis turėklas registruojasi, bet leidžia skambinti. Bendrinamas pagalbininkas `evaluatePromptInjection()` taip pat eksportuojamas skambintojams, kuriems reikia įvertinti raginimus neperžiūrėjus registro.

**Nuskaitymas susietas (v3.8.20):** detektorius tik tikrina** pirmieji 16 KB** sujungto raginimo teksto — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 baitai) `src/shared/utils/inputSanitizer.ts`. Tiek `detectInjection()`, tiek `evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` prieš paleidžiant šablono kilpą. Įpurškimo direktyvos yra šalia įvesties viršaus, todėl kelių šimtų KB naudingosiose apkrovose ji apriboja regex CPU/GC nesusilpnindama aptikimo (plg. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Važiuoja toliau** tiek** etapai, paskutinė numatytojoje grandinėje (prioritetas `95`). Pašalina gerai žinomus API rakto / slaptųjų žetonų šablonus iš siunčiamo naudingo krovinio (pranešimo turinio, įrankio iškvietimo argumentų, įrankio rezultatų)** ir** teikėjo atsakymas, todėl į raginimą įklijuoti kredencialai (arba įrankio rezultato atkartoti) nebūtų perduodami ankstesniam tiekėjui arba klientui.

- **Tik pasirinkti** , ta pati nuostata kaip ir PII redagavimas (kieta taisyklė #20-greta): išjungta, nebent `settings.credentialRedactionEnabled === true`** arba** `CREDENTIAL_REDACTION_ENABLED=true`. Kai jis išjungtas, apsauginis turėklas yra neveikiantis — jis niekada neužblokuoja ir neperrašo.
- `redactCredentials()` eina per visą payload/response medį (`walkValue()`, prototype-pollution-safe, Cycle-safe per `WeakSet`) ir pakeičia atitikmenis `[REDACTED:<type>]` vietos rezervavimo ženklu, klonuodamas tik tas šakas, kurios iš tikrųjų pasikeitė.
- `CREDENTIAL_PATTERNS` covers LLM provider keys (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokens (GitHub, Slack, Linear, Notion, npm, Postman, Discord), payment keys (Stripe, Square), cloud keys (AWS access key, Twilio, SendGrid, Mailgun), private keys / JWTs, credential-bearing connection strings (`mongodb://user:pass@...`, etc.), and a generic `Authorization`/`x-api-key`/`api-key`/`apikey` header-value pattern. Header-shaped keys (`authorization`, `x-api-key`, `api-key`, `apikey`) are redacted structurally (value only, scheme prefix like `Bearer `/`Basic ` preserved) rather than via the generic text regex.
- Apsauginis turėklas niekada neužblokuoja; ji tik perrašo (`modifiedPayload` / `modifiedResponse`) ir anotuoja (`meta.credentialsRedacted`, `meta.count`).

Regreso apsauga: `tests/unit/credential-masker-guardrail.test.ts`.

## Bazinis kontraktas (`base.ts`)

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
  block?: boolean; // true nutraukia grandinės vykdymą
  message?: string; // rodoma blokavimo metu
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // preCall grąžina, kad perrašytų užklausą
  modifiedResponse?: TValue; // postCall grąžina, kad perrašytų atsakymą
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

Apsaugos mechanizmas signalizuoja „jokių pakeitimų" grąžindamas `void`, `{}` arba
`{ block: false }`. Grąžinus `modifiedPayload`/`modifiedResponse`, grandine
tekanti reikšmė pakeičiama tolesniems apsaugos mechanizmams.
`signal?: AbortSignal` perduoda kvietėjo gyvavimo ciklą apsaugos mechanizmams. Užklausos nutraukimas yra sąmoninga fail-open išimtis: medijos tiltai sustabdo darbą ir atlieka valymą neatkurdami žaliavinės medijos į taikinį, kuris, kaip žinoma, jos nepalaiko.

## Registras (`registry.ts`)

Singltonas `guardrailRegistry` pateikia:

- `register(guardrail)` — prideda (arba pakeičia pagal normalizuotą pavadinimą) apsaugos mechanizmą ir
  iš naujo rūšiuoja pagal didėjantį `priority`.
- `clear()` / `list()` — administracinės pagalbinės funkcijos.
- `runPreCallHooks(payload, context)` — iteruoja per aktyvius apsaugos mechanizmus, perduoda
  naudingąją apkrovą per `modifiedPayload` ir sustoja ties pirmuoju `block: true`.
- `runPostCallHooks(response, context)` — tas pats srautas atsakymo pusėje.
- `resetGuardrailsForTests({ registerDefaults })` — išvalo būseną ir pasirinktinai
  iš naujo užregistruoja numatytuosius mechanizmus švariam testų izoliavimui.

Abu vykdytojai grąžina `{ blocked, payload|response, results, guardrail?, message? }`,
kur `results` yra `GuardrailExecutionResult` įrašų masyvas, apimantis kiekvieno
apsaugos mechanizmo `blocked`, `skipped`, `modified`, `error` ir `meta` laukus,
naudingus trasavimui.

### Apsaugos mechanizmų išjungimas atskiroms užklausoms

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` sujungia
išskirtinę (be dublikatų) apsaugos mechanizmų pavadinimų, kuriuos reikėtų praleisti
dabartinei užklausai, santrauką. Yra penki kanalai, skaitomi šia tvarka ir suliejami
į vieną sąrašą (išskirtinant laimi pirmasis pasikartojimas):

1. `apiKeyInfo.disabledGuardrails`
2. Užklausos turinio `disabledGuardrails` (viršutinis lygis)
3. Užklausos turinio `metadata.disabledGuardrails` (tik kai `metadata` yra objektas)
4. Antraštė `x-omniroute-disabled-guardrails`
5. Pasenusi antraštė `x-disabled-guardrails`

Visi penki kanalai suliejami, įskaitant abi antraštes: nusiuntus ir
`x-omniroute-disabled-guardrails`, ir `x-disabled-guardrails`, praleidžiama jų sąrašų
sąjunga, o tuščia šiuolaikinė antraštė nebepaslėpia pasenusios
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), pataisyta
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805)).

Reikšmės gali būti eilučių masyvai arba kableliais atskirta eilutė; pavadinimai
apkarpomi ir normalizuojami į mažųjų raidžių kebab-case (`pii_masker` → `pii-masker`),
o tušti įrašai atmetami. Rezultatas perduodamas per `context.disabledGuardrails`
registrui, kuris praleidžia atitinkančius apsaugos mechanizmus (`skipped: true` lauke `results`).

Išjungimo sąrašas veikia tik **registrą**. Prompt-injection `block` režimas yra
privaloma riba: injekcijų apsaugos tarpinė programinė įranga (middleware)
(`src/middleware/promptInjectionGuard.ts`) kviečia `evaluatePromptInjection()`
be jokio kvietėjo valdomo išjungimo sąrašo (negyvas
`resolveDisabledGuardrails({ body })` kvietimas, kurį ji anksčiau atlikdavo, buvo pašalintas
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934)), todėl užklausa,
išjungianti `prompt-injection`, vis tiek atmetama `block` režimu. Tai yra
sąmoningas projektavimo sprendimas. Išjungimo kanalus valdo kvietėjas (užklausos turinys,
metaduomenys, antraštės), o kvietėjas neturi galėti išjungti saugumo
kontrolės, kurią nustatė operatorius
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Antraščių
sąjunga iš [#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412)
keičia tik tai, kurie registro apsaugos mechanizmai praleidžiami; ji neleidžia klientui
apeiti tarpinės programinės įrangos. Privalomos raktų ir grupių lygmens apsaugos mechanizmų
politikos sekamos v4 RFC [#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417).
Žr. [Aprėptis ir ribos](#coverage-and-limits).

## Vykdymo tvarka

Kiekvienai užklausai, tekančiai per `src/sse/handlers/chat.ts` ir
`open-sse/handlers/chatCore.ts` (pokalbių šeimos maršrutai, išvardyti skyriuje
[Aprėptis ir apribojimai](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` sudaro praleidimų sąrašą iš API rakto,
   užklausos turinio (body) ir antraščių.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` vykdo apsaugos mechanizmus
   didėjančio prioriteto tvarka:
   - Išjungti apsaugos mechanizmai užfiksuojami kaip `skipped`.
   - Kiekvieno apsaugos mechanizmo `preCall` gali perrašyti naudingąją apkrovą
     (payload) per `modifiedPayload`.
   - Pirmasis `block: true` nutraukia grandinę, o tvarkytuvas grąžina apsaugos
     mechanizmo atmetimo atsakymą.
3. (Galbūt perrašyta) naudingoji apkrova patenka į kombinuotą maršrutizavimą
   (combo routing) ir upstream išsiuntimą.
4. **Tik nesrautinis režimas:** suformavus atsakymą,
   `guardrailRegistry.runPostCallHooks(...)` paleidžia tą pačią grandinę su
   atsakymu. Čia `block: true` atmeta upstream atsakymą ir grąžina HTTP 400.
   Srautiniai (streamed) atsakymai šį žingsnį visiškai praleidžia.

Apsaugos mechanizmai, išmetantys išimtį, užfiksuojami su `error: <message>` ir
įrašomi į žurnalą per `logger.warn`, tačiau grandinė tęsia darbą — pagal
sumanymą tai „fail-open“ elgsena.

## Aprėptis ir apribojimai

Apsaugos mechanizmų registras įjungtas tik į pokalbių apdorojimo grandinę
(pipeline). Šiuos apribojimus fiksuoja
`tests/unit/guardrail-pipeline-wiring-characterization.test.ts` ir
`tests/unit/guardrail-pipeline-characterization.test.ts`; pasikeitus elgsenai,
tuos testus atnaujinkite sąmoningai.

### Kur vykdomi kabliai (hooks)

| Kablys / valdiklis                      | Kur vykdoma                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                       | Užklausos, kurias apdoroja `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (ir `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` ir Telegram pokalbių proxy. Taip pat valdymo skydelio testinis galinis taškas `/api/guardrails/test`. Pre-call blokavimas grąžina HTTP 400. |
| `runPostCallHooks`                      | Tik **nesrautiniai** pokalbių atsakymai (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Srautiniai atsakymai jo niekada nepasiekia.                                                                                                                                                                                                                                                                                                           |
| Srautinė PII                            | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), pajungta `streamingPipeline.ts`, kai įjungta `PII_RESPONSE_SANITIZATION`. Tai nėra apsaugos mechanizmas, todėl išjungimo kanalai jos neveikia.                                                                                                                                                                                                                                          |
| Injection-guard tarpinė įranga (legacy) | Kiekvienas `/v1` maršrutas, turintis užklausą (prompt), įskaitant pokalbių šeimos maršrutus (žr. [maršrutų aprėptį](#injection-guard-route-coverage--red-team-phase-8--block-d)). Tik prompt injection.                                                                                                                                                                                                                                               |

### Kas neapimta

- **Medijos, embeddings ir duomenų maršrutai** (`/v1/images/*`,
  `/v1/embeddings`, `/v1/audio/*`, `/v1/videos/generations`,
  `/v1/music/generations`, `/v1/rerank`, `/v1/search`, `/v1/moderations`)
  niekada nepasiekia registro. Ten nevykdomas joks PII maskavimas, kredencialų
  maskavimas ar modalumo tiltas (modality bridge). Vienintelis jų patikrinimas
  — legacy injection-guard tarpinė įranga.
- **Srautiniai atsakymai** neturi post-call apsaugos mechanizmų: nei
  `pii-masker`, nei `credential-masker` post-call, nei post-call blokavimo.
  Taikoma tik srautinė PII transformacija (kai įjungta
  `PII_RESPONSE_SANITIZATION`). Kredencialas, atkartotas srautiniame atsakyme,
  nėra užmaskuojamas.
- **Išjungimo kanalai ir tarpinė įranga (pagal sumanymą):** tarpinė įranga
  vertina prompt injection savo kvietimu į `evaluatePromptInjection()`,
  neperduodama jokio kvietėjo valdomo išjungimo sąrašo. `block` režimas yra
  privaloma riba, kurios kvietėjo valdomi išjungimai negali apeiti, įskaitant
  pokalbių šeimos maršrutus
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).
  `prompt-injection` išjungimas praleidžia tik registro apsaugos mechanizmą.

### Kas mato atsakymą prieš post-call

Nesrautiniame kelyje tvarka yra tokia: atminties išgavimas → integruotų įrankių
vykdymas → post-call apsaugos mechanizmai → post-call blokavimo išėjimas →
įrašymas į semantinę talpyklą (semantic cache).

- **Atminties išgavimas** ir **įrankių vykdymas** pamato atsakymą dar prieš tai,
  kai po užklausos vykdomos apsaugos gali jį perrašyti ar užblokuoti. Nuo
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) atminties
  išgavimas išgautą tekstą apdoroja funkcija `sanitizePII`, kai įjungta
  `PII_RESPONSE_SANITIZATION` (tiek srautiniu, tiek nesrautiniu režimu), tačiau
  atsakymas, kurį po užklausos vykdomos apsaugos vėliau užblokuoja, vis tiek
  jau būna pateiktas atminčiai ir įrankiams.
- **Semantinis podėlis** išsaugo atsakymą po po užklausos vykdomų apsaugų,
  todėl jame saugomas perrašytas atsakymas, o užblokuotas atsakymas niekada
  nėra podėliuojamas. Podėlio įrašų raktai formuojami pagal kiekvieną API
  raktą.

## Konfigūracija

Aplinkos kintamieji, kuriuos skaito integruotos apsaugos priemonės:

| Kintamasis                            | Naudoja                             | Poveikis                                                                                                       |
| ------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`                  | Nustatykite `false`, kad visiškai išjungtumėte aptikimą.                                                       |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`                  | Įterpimo politika: `warn`, `block` arba `log`. Senoji reikšmė `redact` neperrašo įterpimo teksto.              |
| `INJECTION_GUARD_MODE`                | `prompt-injection`                  | Įterpimo apsaugos režimas; taip pat DB funkcijų vėliavėlė, kuri **nusveria** aplinkos kintamuosius (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`                  | Minimalus sunkumo lygis, kurį `MODE=block` atmeta: `high` (numatytasis), `medium` arba `low`.                  |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`                  | Senasis `INPUT_SANITIZER_BLOCK_THRESHOLD` pseudonimas.                                                         |
| `PII_REDACTION_ENABLED`               | `pii-masker`                        | Kai `true`, užklausos asmens duomenys (PII) paslepiami (nepriklausomai nuo įterpimo režimo).                   |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (tolimesnėje grandyje) | Valdo atsakymo pusės maskuoklio elgseną.                                                                       |

Modality Bridge apsaugos priemonės vykdymo laiko konfigūraciją skaito iš DB
paremtos nustatymų saugyklos (`getSettings()`), o ne iš aplinkos kintamųjų.
Vision pirminiai raktai yra
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ir
`modalityBridgeCacheMaxEntries`. Senieji
`visionBridge*` raktai priimami tik kaip dokumentuotas vieno ciklo skaitymo
atsarginis variantas; valdymo skydelio įrašai naudoja pirminius raktus.
Numatytosios reikšmės ir atsarginio varianto rėmiklis yra
`src/shared/constants/modalityBridgeDefaults.ts`, o senosios konstantos
išlaikytos `src/shared/constants/visionBridgeDefaults.ts`.

Audio naudoja `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` ir `modalityBridgeAudioMaxClips`, kartu su
bendrasiais `modalityBridgeCache*` nustatymais. Audio neturi senųjų raktų
atsarginio varianto, nes šie raktai buvo pristatyti kartu su Modality Bridge
schema.

Video naudoja `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` ir
`modalityBridgeVideoTimeout`, kartu su bendrasiais `modalityBridgeCache*`
nustatymais. Jis pagal numatymą išjungtas, nes FFmpeg/ffprobe yra
pasirenkamos operacinės priklausomybės, o kadrų aprašymas didina delsą ir
modelio sąnaudas.

## Pasirinktiniai apsaugos mechanizmai

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

Veiksmai:

1. Sukurkite `src/lib/guardrails/myGuardrail.ts`, išplėsdami `BaseGuardrail`.
2. Implementuokite `preCall` ir (arba) `postCall`.
3. Užregistruokite importavimo metu (per `registerDefaultGuardrails`) arba
   iškvieskite `guardrailRegistry.register(...)` vykdymo metu — registras
   pakeičia bet kurį ankstesnį apsaugos mechanizmą tuo pačiu normalizuotu
   pavadinimu.
4. Pridėkite testų kataloge `tests/unit/` (esami pavyzdžiai:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testavimas

Tarp testų naudokite `resetGuardrailsForTests()`, kad pradėtumėte iš žinomos
būsenos. Perduokite `{ registerDefaults: false }`, kad pradėtumėte su tuščiu
registru ir užregistruotumėte tik testuojamus apsaugos mechanizmus. Vision
Bridge palaiko priklausomybių injekciją (`deps.getSettings`,
`deps.callVisionModel`); Audio Bridge atveria lygiavertes sąsajas nustatymams,
galimybėms, STT modelio pasirinkimui, kredencialų tikrinimui ir transkripcijai.
Todėl testai gali tikrinti abu srautus be DB ar tinklo prieigos.

## Taip pat žr.

- `src/lib/guardrails/` — implementacija
- `src/shared/utils/inputSanitizer.ts` — bendras detektorius, užtikrinantis
  prompt-injection aptikimą ir PII maskavimą
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge numatytieji
  nustatymai ir priverstinio bridge režimo modelių sąrašas
- `src/shared/constants/modalityBridgeDefaults.ts` — bendri Vision/Audio vykdymo laiko numatytieji nustatymai
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonalus sluoksnis (grandinės pertraukiklis, atvėsimo laikotarpiai)
- `docs/reference/ENVIRONMENT.md` — išsamus aplinkos kintamųjų žinynas

## Injection-guard maršrutų aprėptis ir red-team (8 fazė · D blokas)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) apima visus
maršrutus, kurie priima vartotojo prompt'us. Jis atsižvelgia į
`INJECTION_GUARD_MODE` (numatytasis `warn` = tik rašo į žurnalą; `block` =
grąžina HTTP 400 `SECURITY_001`).

| Tipas              | Maršrutai                                                                                                                                            | Numatytasis režimas |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Tekstiniai (esami) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                |
| Generatyvieji      | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                |
| Duomenys           | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                |

Teksto išgavimas (`extractMessageContents`) apima `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (naktinis, `nightly-llm-security.yml`):** promptfoo tikrina, ar
kiekvienas maršrutas blokuoja OWASP-LLM korpusą režime
`INJECTION_GUARD_MODE=block`; garak vykdo zondus (praleidžiama, jei nėra
sekreto). `moderations` įtrauktas dėl nuoseklumo. Blokavimo režimas yra
privaloma riba: `evaluatePromptInjection()` ignoruoja kiekvienos užklausos
išjungimo sąrašą, kurį jam perduoda middleware, todėl `disabledGuardrails`
**neatleidžia** maršruto nuo šio reikalavimo
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Naktiniame darbo sraute (`.github/workflows/nightly-llm-security.yml`, cron +
rankinis paleidimas) yra dvi užduotys:

- **`promptfoo-guard` (blokuojanti)** — vykdo `promptfoo eval -c promptfooconfig.yaml`
  su `INJECTION_GUARD_MODE=block`. Kiekvienas priešiškas atvejis (pvz.,
  „ignoruok visas ankstesnes instrukcijas…“, DAN stiliaus jailbreak atakos)
  tikrina, kad atsakyme būtų `error.code === "SECURITY_001"`, t. y. kad apsauga
  iš tiesų atmetė užklausą.
- **`garak` (rekomendacinė)** — vykdo garak `--probes promptinject,dan,leakreplay`
  prieš vietinę OmniRoute instanciją (`http://localhost:20128/v1`). Priklauso nuo
  tiekėjo sekreto (`PROMPTFOO_PROVIDER_KEY`); sklandžiai praleidžiama ir turi
  priesagą `|| true`, todėl pateikia ataskaitą nežlugdydama CI.

Apsaugos pagalbinio įrankio (`createInjectionGuard` / `withInjectionGuard`)
aprėptis apima visus `/v1` maršrutus, turinčius prompt'ų; prompt'ų tekstą iš
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`
ištraukia `extractMessageContents()` faile
`src/shared/utils/inputSanitizer.ts`.
