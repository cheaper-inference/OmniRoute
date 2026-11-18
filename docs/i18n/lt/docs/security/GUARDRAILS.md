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

## Integruotos apsaugos priemonės

Importuojant registras automatiškai įkelia šešias apsaugos priemones prioritetų tvarka
(žr. `registry.ts` → `registerDefaultGuardrails()`):

| Prioritetas | Pavadinimas         | Etapas (-ai)   | Failas                |
| ----------- | ------------------- | -------------- | --------------------- |
| `5`         | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`         | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`         | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`        | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`        | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`        | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Mažesnio prioriteto numeriai vykdomi **pirmiausia**.

### Vision tiltas (`visionBridge.ts`) — modalumo tilto PR-1

Bazinis GLM 5.3 modelis ir `glm-5.3-{low,high,max}` turi aiškius
`supportsVision:false` registro / specifikacijos metaduomenis. GLM 5.3 Flash variantai
išlieka vietiniai vaizdo modeliai. Claude Code `/v1/messages` maršrutas patenka į bendrą
`handleChat` išankstinio iškvietimo apsaugos priemonių grandinę **prieš** Claude–OpenAI
vertimą; įdėtieji `Read` įrankio rezultato vaizdai turi būti aprašyti arba apdoroti
prieš šiam vertimui paverčiant juos į OpenAI `image_url` turinį (#17069).

Perima užklausas su vaizdais, skirtas **vaizdų nepalaikantiems modeliams**, ir arba
peradresuoja visą užklausą į vaizdus palaikantį modelį, arba pakeičia vaizdų dalis
tekstiniais aprašais, kuriuos sugeneruoja konfigūruojamas vaizdų modelis, prieš iškviečiant
aukštesnio lygio paslaugą. Tai leidžia tik tekstą palaikantiems teikėjams skaidriai
tvarkyti multimodalinius duomenis.

Veiksmų seka:

1. Praleidžiama, jei tikslinis modelis jau palaiko vaizdus (nebent jis nurodytas priverstinio
   tilto sąraše `isVisionBridgeForcedModel`).
2. Vaizdų dalys išgaunamos per `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), kuris deleguoja **unifikuotam medijos detektoriui**
   `detectMediaParts()` faile `open-sse/utils/mediaParts.ts` — vieninteliam tiesos šaltiniui,
   bendrinamam su suderinamumo junginių filtru.
   Išgavimas leidžiamas tik toms struktūroms, kurias `replaceImageParts` gali įterpti atgal
   (išgavimo ↔ pakeitimo sutartis): OpenAI `image_url`, Anthropic base64
   `source.type:"base64"`, Anthropic URL `source.type:"url"` ir Responses API `input_image`.
   Sutampantys vaizdai, įdėti į Claude Code
   `tool_result.content` ir Responses įrankių išvestis, taip pat išgaunami ir pakeičiami
   jų pradiniuose keliuose; tik indikatorinės struktūros priklauso junginio filtro medžiagai
   ir nėra išgaunamos.
   Jei nieko nerasta, praleidžiama.
3. Vykdymo konfigūracija nustatoma per `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nauji `modalityBridge*`
   nustatymų raktai turi pirmenybę; ankstesni `visionBridge*` raktai lieka kaip
   **vieno ciklo atsarginis variantas** (grįžimo langas). Jei tiltas išjungtas, praleidžiama
   prieš atliekant bet kokią medijos peržiūrą.
4. Režimo parinkiklis (`modalityBridgeVisionMode`, žr. toliau pateiktą lentelę) nusprendžia,
   ar peradresuoti, ar aprašyti. Peradresuojant grąžinamas `modifiedPayload`, kuriame pakeistas
   tik `model`, taip pat metaduomenys `{ rerouted, fromModel, toModel, imagesKept }`.
5. Aprašymo kelyje vaizdų skaičius apribojamas iki `maxImages`, sudaromas užduočiai pritaikytas
   raginimas, patikrinama aprašų podėlio talpykla, o vaizdų modeliui iškvietimai atliekami
   **lygiagrečiai** (`Promise.allSettled`); jų vietoje įterpiamos tekstinės dalys
   `[Image N]: <description>`. Nepavykus aprašyti grąžinama `null`: neapdorotas vaizdas
   išsaugomas nežinomiems / vaizdus palaikantiems tikslams (#4012), tačiau
   **patvirtintam tik tekstą palaikančiam tiesioginiam tikslui** arba junginiui, kuriame nėra
   vaizdų palaikymo, kiekvienam neaprašytam vaizdui įterpiama aiški
   `(unavailable — no vision-capable provider connected)` tekstinė žymė, įskaitant dalinius
   nepavykimus ir vaizdus, viršijančius aprašymo iškvietimų ribą (#17069). Esamas visų
   nesėkmingų junginio aprašymų atsarginis kelias išlieka (#8430).
6. Grąžinamas `modifiedPayload` su metaduomenimis (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Režimo parinkiklis (`modalityBridgeVisionMode`)

| Režimas    | Numatytasis | Elgsena                                                                                                                                                                                                                                                                                                                               |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔           | Ankstesnė euristika, nepakeista (#6640/#7204): ne junginio / `auto/` modeliai peradresuojami į geriausią vaizdų modelį, nebent pradinis modelis jau turi tinkamus kredencialus (tokiu atveju aprašoma); junginio tikslai visada aprašomi.                                                                                             |
| `describe` |             | Visada aprašoma — peradresavimo blokas visiškai praleidžiamas; pasirinktas naudotojo modelis visada pateikia atsakymą.                                                                                                                                                                                                                |
| `reroute`  |             | Priverstinis peradresavimas: modelio, turinčio kredencialus, išsaugojimo apsauga apeinama. Peradresavimo **tikslo** kredencialų apsauga vis tiek taikoma — jei nėra tinkamo vaizdų tikslo, tiltas sustabdo veikimą pateikdamas aiškią klaidą, užuot aprašęs vaizdus arba siuntęs neapdorotus vaizdus tik tekstą palaikančiam tikslui. |

Priverstiniai režimai pasirenkami **prieš** paleidžiant automatinę euristiką; `auto`
elgsena yra baitų požiūriu identiška apsaugos priemonei iki PR-1.

#### API rakto aprėptis (`visionBridgeKeyScope.ts`)

Kai skambinančiojo API raktas riboja `allowedConnections`, kvotų telkinius
(`allowedQuotas`) arba modelius (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), tiltas parenka tik
peradresavimo ir aprašymo modelius, kuriuos raktas gali naudoti, ir tik
ryšiuose, kuriuos raktas gali naudoti. Tada aprašymo iškvietimas visada
keliauja per „OmniRoute“ savikaitą su antrašte
`x-omniroute-self-loop-key-id`, todėl priimanti pokalbio užklausa dar kartą
taiko to rakto ryšių ir modelių politiką. `enforceApiKeyPolicy()`
atsižvelgia į šią antraštę tik kartu su savikaitos bearer reikšme, todėl ji gali
tik susiaurinti prieigą, o ID, kurio nepavyksta nustatyti, atmetamas.

Jei raktui neleidžiamas nė vienas vaizdo modelis, **patvirtintas tik tekstą
palaikantis tikslas** vietoje atmeta vaizdo užklausą su aiškiu HTTP 400
atsakymu, užuot persiuntęs vaizdo baitus nepajėgiamam išoriniam tiekėjui
(#17069). Tikslams, kurių vaizdo galimybės nežinomos arba yra savosios,
aprašymo kelias išlaiko ankstesnę „fail-open“ elgseną (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
Užklausos be rakto ir raktai be šių apribojimų veikia tiksliai kaip anksčiau.

#### Užduočiai pritaikytas aprašymo raginimas (`modalityBridgeVisionTaskAware`)

Numatytoji reikšmė — **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
prideda **paskutinės naudotojo žinutės** tekstą (sutrumpintą iki 500 simbolių)
prie bazinio aprašymo raginimo, nukreipdamas aprašymą į tai, ko naudotojas
iš tikrųjų prašė (codex-vision-proxy šablonas), ir paprašydamas vaizdo modelio
perrašyti matomą tekstą. Kai vėliavėlė išjungta arba nėra naudotojo teksto,
bazinis raginimas naudojamas nepakeistas.

Pačios aprašymo savikaitos OpenAI suderinama užklausa
(`callVisionModelSingle()` faile `visionBridgeHelpers.ts`) visada prašo
`image_url.detail: "high"` — besąlygiškai, kiekvienam skambinančiajam ir
tiekėjui, nepriklausomai nuo jokio kliento signalo. Mažos detalizacijos
atranka blogina OCR tikslumą būtent atliekant teksto perrašymo užduotį, kurios
prašoma šiame raginime, todėl pats aprašymo iškvietimas visada prašo aukštos
detalizacijos, nepriklausomai nuo to, kokį detalizacijos lygį naudojo pradinė
įeinanti užklausa. Tai turi įtakos tik vidinės aprašymo užklausos turiniui;
nekeičiama tai, kaip „OmniRoute“ persiunčia skambinančiojo `image_url.detail`
pirminėje užklausoje — ši numatytoji reikšmė pritaikoma atskirai ir tik
aptiktiems „OpenCode“ klientams, faile
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). „Anthropic“
laidinio formato aprašymo savikaitos šaka neturi `detail` lauko, todėl nei viena
iš šių numatytųjų reikšmių jai neturi įtakos.

#### Aprašymo išvesties riba (`modalityBridgeVisionMaxChars`)

| Raktas                         | Numatytoji reikšmė | Diapazonas         |
| ------------------------------ | ------------------ | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`                | `0` arba 100–50000 |

`0` (numatytoji reikšmė) reiškia **jokios ribos** — `callVisionModel()` grąžintą
aprašymą perduoda nepakeistą, taip išsaugodama esamą elgseną. Bet kuri reikšmė
nuo 100 iki 50000 sutrumpina aprašymą su priesaga `…` prieš įterpiant jį atgal
kaip `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` faile `src/lib/guardrails/visionBridge.ts`).
Padidinkite šią reikšmę detalioms OCR užduotims, kai tolesniam modeliui reikia
viso perrašyto teksto; sumažinkite ją, kad apribotumėte daugžodžių vaizdo
modelių naudojamų žetonų kiekį. Valdymo skydelio laukas yra skirtuko „Vision“
išplėstiniame skydelyje
(`modality-bridge-max-chars` faile `ModalityBridgeVisionTab.tsx`) ir bet kokią
reikšmę nuo 1 iki 99 pakelia iki 100 ribos, o aiškią `0` palieka nepakeistą —
`0` yra savarankiškai galiojanti Zod reikšmė
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), o ne tik
„nenustatyta“ numatytoji reikšmė.

#### Aprašymo podėlis (`modalityBridge/bridgeCache.ts`)

Atmintyje veikiantis LRU + TTL podėlis, skirtas viso proceso aprašymo
išvestims. Raktas = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
su ilgio prefiksu paremta kadravimo schema (lauko ribų kolizijų nėra). Modelio
komponentas yra **sukonfigūruotas** tilto modelis, o ne modelis, kuris iš
tikrųjų pateikė atsakymą — `callVisionModel` gali viduje naudoti atsarginį
modelį, o raktų kūrimas pagal kiekvieną bandymą suskaidytų podėlį. Nepavykę
aprašymai niekada nesaugomi podėlyje. Nustatymai:

| Raktas                          | Numatytoji reikšmė | Diapazonas |
| ------------------------------- | ------------------ | ---------- |
| `modalityBridgeCacheEnabled`    | `true`             | —          |
| `modalityBridgeCacheTtlMinutes` | `60`               | 1–1440     |
| `modalityBridgeCacheMaxEntries` | `200`              | 10–5000    |

#### Nuotolinių vaizdų normalizavimas (savikaitos aprašymas / base64 gavimas)

Kai tiltas pats gauna **nuotolinį** vaizdą — „Anthropic“ aprašymo savikaitos
iškvietimas ir claude laidinio formato konvertavimas į base64
(`ensureBase64ImagesForClaudeWire`), abu naudodami
`fetchRemoteImageAsDataUri()` faile `visionBridgeHelpers.ts` — gautas duomenų
URI prieš įterpiant į vaizdo modelio užklausą perduodamas per
`normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`). Per dideli vaizdai
sumažinami iki **2048px ilgosios kraštinės** (atitinka dydžio keitimo ribą,
kurią „OpenAI“ / „Anthropic“ jau taiko serverio pusėje), todėl sumažėja
įkėlimo duomenų kiekis ir delsa, nekeičiant to, ką mato vaizdo modelis. Dydžio
keitimui naudojamas `sharp`, įkeliamas per dinaminį importavimą: jei
platformoje nepavyksta įkelti jo savosios dvejetainės programos,
`normalizeDataUri()` **niekada negrąžina klaidos** — vietoj to perduoda pradinius
baitus nepakeistus, todėl aprašymo / konvertavimo į base64 kelias visada veikia.
Ne vaizdo baitai (kai gautas turinys nėra iškoduojamas vaizdas) taip pat
perduodami nepakeisti. Šis normalizavimas taikomas tik vaizdams, kuriuos tiltas
gauna savo savikaitos iškvietimui — jis niekada netaikomas skambinančiojo
neapdorotam perduodamam turiniui, laikantis tik pasirinktinai taikomų pakeitimų
principo (Hard Rule #20).

#### Nustatymų schema + perkėlimas

Nauji `modalityBridge*` raktai tikrinami naudojant Zod schemą `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trys `modalityBridgeCache*` raktai ir
`modalityBridgeAudio*` grupė, naudojama Garso tilto. Migracija
`141_modality_bridge_settings.sql` nukopijuoja esamas senąsias
`visionBridge*` reikšmes į atitinkamus naujus raktus (idempotentiškai, niekada
neperrašo operatoriaus nustatytos `modalityBridge*` reikšmės); senieji raktai
vieną leidimo ciklą lieka priimami kaip atsarginis skaitymo šaltinis.

#### Skaidrumo antraštė ir statistika

Aprašymo transformavimo atsakymai turi
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(ji sukuriama naudojant `buildModalityBridgeHeader()` faile
`modalityBridge/bridgeStats.ts` ir pridedama naudojant `withModalityBridgeHeader()` faile `src/sse/handlers/chatHelpers.ts`).
Peradresuoti užklausos antraštės negauna — duomenų struktūra nebuvo pakeista,
o modelio pakeitimas jau matomas atsako `model` lauke.

`GET /api/modality-bridge/stats` (valdymo autentifikacija, toks pats lygis kaip
`GET /api/settings`) grąžina atmintyje saugomus kiekvienos modalybės skaitiklius
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }`, skirtus `vision`, `audio` ir
`video`. `averageLatencyMs` vardiklyje naudoja `latencySamples`, o ne visų
bandymų skaičių; operacija be laiko matavimo nesukuria fiktyvaus nulinės
milisekundės pavyzdžio. `bridged` lieka atgaliniu suderinamumo slapyvardžiu
sėkmingoms konversijoms; nesėkmingi bandymai jo nepadidina.
Skaitikliai pagal paskirtį nustatomi iš naujo paleidus procesą
(telemetrija, o ne apskaita).

#### Prietaisų skydelio konfigūracija

Specialus prietaisų skydelio puslapis yra
`/dashboard/settings/modality-bridge`. Jo URL adresuojami `Vision`, `Audio` ir
`Video` skirtukai, perjungiant `tab` reikšmę, išsaugo užklausos parametrus.
`Vision` skirtuke pateikiamas įjungimas, režimas, modelio pasirinkimas
(įskaitant automatinę numatytąją reikšmę), nuo užduoties priklausantis
promptų formavimas, išplėstiniai skirtojo laiko, vaizdų ir aprašo ilgio bei
podėlio apribojimai, vykdymo skaitikliai ir kontroliuojama pavyzdinė užklausa.
`Audio` skirtukas taip pat veikia: jame pateikiamas įjungimas, tik STT
skirtas modelio parinkiklis su automatiniu pasirinkimu, skirtojo laiko ir
maksimalaus garso įrašo ilgio apribojimai, garso skaitikliai ir
`input_audio` pavyzdinis testas. `Video` skirtukas yra funkcionalus: jis
rodo FFmpeg/ffprobe vykdymo aplinkos būseną — vieną iš keturių aiškių
naudotojo sąsajos būsenų (`unknown`, kai tikrinimas dar vykdomas arba jo
nepavyko užbaigti, `restricted`, kai prietaisų skydelis pasiekiamas per
negrįžtamojo ryšio adresą naudojantį kompiuterį ir tikrinimas kliento pusėje
praleidžiamas, `unavailable`, kai atlikus tikrinimą patvirtinama, kad
komponento nėra, arba `available`, kai pateikiamos FFmpeg/ffprobe versijos) —
išsaugo įjungimo, modelio, kadrų, vaizdo įrašo ir skirtojo laiko apribojimus,
modelio parinkiklyje rodo tik regėjimo funkciją palaikančius modelius ir
pateikia vaizdo įrašo skaitiklius.

Ankstesnė „Vision Bridge“ kortelė AI nustatymuose yra suderinamumo nuoroda į
naująjį puslapį; jai nebepriklauso antra formos kopija. Skiltis „Media
Providers“ taip pat susieja „Image-to-Text“ ir „Speech-to-Text“ darbo eigas su
atitinkamais Modalybės tilto skirtukais, tačiau esama „Speech-to-Text“
bandymų aplinka nepašalinama.

**Savęs ciklo priėmimo apėjimas:** kai aprašo iškvietimas nukreipiamas per paties
„OmniRoute“ `/v1` savęs ciklą (nestandartinio teikėjo modelis), antrinė
užklausa siunčia `x-omniroute-admission-bypass: internal` antraštę ir
autentifikuojama naudojant išspręstą savęs ciklo kredencialą — vietinio režimo
`sk_omniroute` žymenį arba operatoriaus sukonfigūruotą
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` aplinkos kintamojo raktą (#1350), todėl
diegimai su `REQUIRE_API_KEY=true` vis tiek gali vykdyti aprašo iškvietimą.
Šis apėjimas priimamas tik naudojant tuos tikslius kredencialus, todėl išoriniai
klientai negali pasinaudoti antrašte priėmimui apeiti.

Seni numatytieji nustatymai yra faile `src/shared/constants/visionBridgeDefaults.ts`;
nauji režimo, nuo užduoties priklausantys ir podėlio numatytieji nustatymai bei
nustatymų sprendiklis yra faile `src/shared/constants/modalityBridgeDefaults.ts`.
Apsaugos mechanizmas atskleidžia `deps` konstruktoriaus parinktį, kad testai
galėtų įterpti netikras `getSettings` ir `callVisionModel` realizacijas.

### Garso tiltas (`audioBridge.ts`) — Modalybės tilto PR-3

Perima užklausas su garsu turinčius pokalbius prieš jiems pasiekiant tikslą,
kuris nėra žinomas kaip priimantis garso įvestį. Jis niekada neperadresuoja
pokalbio užklausos: garso dalys transkribuojamos naudojant esamą su OpenAI
suderinamą daugialypės terpės galinį tašką, o pasirinktas pokalbio modelis
toliau dirba su tekstinėmis transkripcijomis.

Eiga:

1. Išspręskite `supportsAudio` naudodami `getResolvedModelCapabilities()`. Pirmenybė teikiama aiškiems provider-registry metaduomenims, tada statiniams modelio metaduomenims, o galiausiai sinchronizuotam `modalities_input`. Deklaruotas įvesties sąrašas be `audio` reiškia `false`; jei nėra jokių gebėjimo įrodymų, lieka `null`. Tiek `false`, tiek `null` suaktyvina konservatyvųjį tiltą, o `true` jį apeina.
2. Išspręskite `modalityBridgeAudio*` nuostatas ir naudodami bendrą `detectMediaParts()` detektorių iš kiekvienos žinutės išskirkite įterpiamas aukščiausio lygio garso dalis. Palaikomos OpenAI `input_audio`, `audio_url` ir `source.media_type: "audio/*"` formos. Įdėtasis garsas aptinkamas maršrutizavimui, tačiau splice kelias jo nepašalina. Darbas ribojamas `modalityBridgeAudioMaxClips`; vėlesnės dalys lieka nepakeistos.
3. Laikykitės sukonfigūruoto `provider/model` arba leiskite `selectAudioBridgeModel()` pereiti per `AUDIO_TRANSCRIPTION_PROVIDERS` stabilia katalogo tvarka ir pasirinkti pirmą modelį, kurio aktyvaus tiekėjo kredencialai yra tinkami.
4. `callAudioTranscription()` konvertuoja base64 / data-URI garsą į daugialypės dalies `file` arba atsisiunčia nuotolinį `audio_url` naudodamas tik viešai prieinamą išsiunčiamo srauto apsaugą su DNS susiejimu ir 25 MB riba. Tada jis siunčia `file` ir pasirinktą modelį naudodamas POST užklausą į vietinį `/v1/audio/transcriptions` savikvietos tašką, autentifikuotą naudojant `resolveSelfLoopBearer()`. Esamas transkripcijos maršrutas atlieka įprastą kredencialų paiešką, aušinimo / spartos ribojimo tvarkymą ir tiekėjo parinkimą.
5. Sėkmingos užklausos pakeičia savo dalis į `[Audio N]: <transcript>`. Užklausos vykdomos naudojant `Promise.allSettled`: individuali klaida išsaugo pradinę garso dalį (#4012 sutartis). Jei visos užklausos nepavyksta ir tikslui įrodyta `supportsAudio === false`, dalys pakeičiamos į
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 sutartis). Jei tikslas nežinomas (`null`), visų nesėkmių atveju rezultatas lieka nepakeistas. Įrodytai tik tekstą palaikantis tikslas, neturintis tinkamų STT kredencialų, gauna tą patį aiškų pakaitinį tekstą, tačiau tinklo užklausa nevykdoma.

Sėkmingos transkripcijos naudoja visam procesui bendrą Modality Bridge LRU / TTL podėlį. Raktas apima garso nuorodą, stabilų `audio-transcription` operacijos žymą ir pasirinktą STT modelį; nesėkmės niekada nekaupiamos podėlyje. Garso bandymai atnaujina bendrus `bridged`, `cacheHits`, `failures` ir `lastUsedAt` skaitiklius. Transformuoti atsakymai turi
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nepakeistoms užklausoms Audio Bridge segmentas nesuteikiamas.

Vykdymo nuostatos saugomos DB ir tikrinamos naudojant Zod:

| Raktas                        | Numatytoji reikšmė | Diapazonas       |
| ----------------------------- | ------------------ | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`             | —                |
| `modalityBridgeAudioModel`    | `""`               | Auto arba STT ID |
| `modalityBridgeAudioTimeout`  | `60000`            | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`                | 1–10             |

Bendras podėlis ir toliau valdomas naudojant `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` ir `modalityBridgeCacheMaxEntries`.

### Vaizdo tiltas (`videoBridge.ts`, `videoBridgePipeline.ts`)

Perima aukščiausio lygio vaizdo dalis Chat Completions `messages` ir Responses
API `input` laukuose prieš iškviečiant tikslą, kurio vietinis vaizdo palaikymas nežinomas.
Palaikomos `input_video`, `video_url`, `video_source` formos, HTTPS URL ir
`data:video/*;base64,...` data URI. Paprasti failų pavadinimai tekste nelaikomi
vaizdu.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) valdo užklausos perėjimą, gebėjimų / politikos patikrą, kiekvienos užklausos agregavimą ir atsakymo turinį. Su kiekvienu vaizdu susijęs darbas — gavimas, viso rezultato podėlis, kadrų sekos apibūdinimas (sujungiant bet kokią skambinančiojo deklaruotą garso transkripciją) ir kiekvieno bandymo metrikos / nutraukimas / išvalymas — paslėptas už `processVideoPart` funkcijos `videoBridgePipeline.ts`, kuri kviečiama po vieną kartą kiekvienai vaizdo daliai `preCall` cikle. Šis modulis taip pat apibrėžia aiškias prievadų ribas: `VideoMediaBrokerPort` (baitams gauti ir atrinktiems kadrams išgauti), `VideoAudioTranscriptionPort` (skambinančiojo deklaruotos garso transkripcijos sujungimui su atrinktų kadrų aprašais) ir `VideoDrilldownPort` (senosios neapdorotos saugyklos formos). Gamybinis STT ir kadrų išlaikymas aplink apibūdinimo prievadą komponuojami naudojant `createVideoSttAdapter` ir `createVideoDrilldownAdapter`; pastarasis naudoja bendrą nepermatomos rankenos gyvavimo ciklą.

Viešasis `/v1` užklausų kelias niekada neimportuoja ir nekviečia antrinio proceso. Nuotoliniai vaizdai atsisiunčiami taikant 50 MiB ribą; įterptiesiems base64 vaizdams taikoma konservatyvi 36 MiB dekoduoto dydžio riba vienam vaizdui, kad modelio / žinučių / kadravimo apvalkalas neviršytų viešosios JSON užklausos priėmimo 50 MiB ribos. Įterpties ilgis ir dekoduoto dydžio įverčiai patikrinami prieš paskiriant atmintį. Pradiniam nuotoliniam URL ir kiekvienam peradresavimui būtinas HTTPS, naudojant esamą tik viešai prieinamo išsiunčiamo srauto apsaugą su DNS susiejimu. Tada baitai pereina per tikslią vidinę
`POST /api/modality-bridge/video/extract` brokerio ribą. Šis maršrutas yra ir `LOCAL_ONLY`, ir `SPAWN_CAPABLE`, priima tik kiekvieno proceso autentifikuotą, patikimą kreipimąsi per kilpą į vietinį adresą ir niekada nepriima URL, failų sistemos kelio, vykdomojo failo ar argumentų sąrašo. API kūno dydžio apdorojimo grandinė ir apdorotojo prieauginis kūno skaitytuvas nepriklausomai taiko 50 MiB brokerio įvesties ribą. Jo riboto dydžio eilė vienu metu vykdo vieną išgavimą, leidžia keturias laukiančias užduotis ir riboja laukiančią įvestį iki 100 MiB.

Brokerio viduje `ffprobe` skaito privatų vietinį failą; fiksuotame leidžiamų formatų sąraše nėra grojaraščių ir manifestų formatų. Leidžiamų MOV šeimos konteinerių išorinės MOV duomenų nuorodos pagal numatytuosius nustatymus lieka išjungtos, o fiksuota komanda jų neįjungia. Tiek `ffprobe`, tiek `ffmpeg` naudoja tik `file` protokolo leidžiamų protokolų sąrašą, vieną giją, fiksuotus argumentų masyvus, nepaleidžia apvalkalo, o vykdomosios programos nustatomos naudojant `PATH`. Viršelio srautai su pridėtu paveikslėliu nėra tinkami atkūrimo kandidatai. Visi atkuriami srautai turi atitikti apribojimus, o prieš deterministinį mažiausio indekso rezervinį variantą pirmenybė teikiama aiškiai nurodytam numatytajam srautui. Vaizdo įrašų trukmė ribojama iki 600 sekundžių, 8 192 pikselių kiekviename matmenyje ir 33 554 432 pradinių pikselių. FFmpeg atrenka 1–16 JPEG kadrų iš vidurio taškų, sumažina ilgesnę kraštinę iki ne daugiau kaip 1 024 pikselių, nedidindamas mažesnių pradinių vaizdų, ir niekada negauna URL. Pagal numatytuosius nustatymus naudojama `uniform`. Pasirenkamos `scene_aware` ir eksperimentinė `segment_aware` strategijos atlieka vieną papildomą fiksuotą FFmpeg praėjimą per jau patvirtintą vietinį srautą, parenka ribotus `showinfo` scenų laiko žymenis ir detektoriaus klaidos, skirtojo laiko viršijimo, netinkamos išvesties ar tuščio kandidatų rinkinio atveju deterministiškai grįžta prie tų pačių vienodai išdėstytų vidurio taškų. Segmentų atpažinimo režimas paskirsto vidurio taškų pavyzdžius proporcingai patvirtintiems scenų intervalams; išsamesnis segmentų atpažinimo režimo pagrindimas ir rezervinis elgesys pateikiami toliau. Griežta 16 kadrų riba taikoma po parinkimo kiekvienoje strategijoje. Kai scenų atpažinimo užklausai skirtas tik vieno kadro biudžetas, naudojamas aktyvaus viso vaizdo įrašo arba fokusavimo lango vienodas vidurio taškas ir pateikiama `policyEffective: uniform`: vienas pasirinktas scenos kadras negali išlaikyti abiejų laiko intervalo galų. Skambinantysis gali pasirinktinai pateikti baigtinį fokusavimo langą (`start`/`end` sekundėmis); ribos apribojamos medijos trukme, apversti arba nebaigtiniai langai atmetami, o visos atrankos strategijos vykdomos tik normalizuotame intervale. Gautas langas įtraukiamas į atrankos metaduomenis ir nepatikimą aprašo priešdėlį, kad tolesni modeliai galėtų atskirti fokusuotą ištrauką nuo visos laiko juostos.

Semantinis antraštės fokusavimas yra atskiras, aiškiai nustatomas parametras. Numatytoji `full` analizės veiksena išsaugo esamą kadrų raginimą ir niekada nepersiunčia užklausos teksto antraščių modeliui. Veikiant `focused` režimu, tiltas nuskaito tik naujausią netuščią vartotojo sukurtą `text`/`input_text` iš to paties „Chat“ arba „Responses“ konteinerio, normalizuoja jį į NFC, sutraukia valdymo simbolius ir tarpų sekas bei apriboja iki 500 Unicode kodo taškų. Jei gaunamas tuščias rezultatas, naudojamas tikslus `full` raginimas. Naudotina užuomina serializuojama kaip JSON atskirame nepatikimo vartotojo konteksto bloke ir gali tik teikti pirmenybę stebimiems požymiams; ji negali nepaisyti atskiro įspėjimo nevykdyti vaizde matomų ar girdimų instrukcijų. Tekstinis fokusavimas niekada nenustato `start`/`end` ir nekeičia laiko atrankos.

#### FU-07 struktūriniai segmentų požymiai

`segment_aware` naudoja vieną apribotą išankstinės analizės praėjimą per jau patvirtintą vietinį vaizdo srautą. Fiksuota filtrų grandinė pirmiausia sumažina plotį iki ne daugiau kaip 320 pikselių, aptinka scenų pokyčius ir sustingusius intervalus, tada atrenka po 1 kadrą per sekundę, kad apskaičiuotų suliejimą, vidutinį skaistį ir erdvinę / laikinę informaciją. Praėjimas apribotas iki 600 struktūrinių pavyzdžių, vienos FFmpeg / filtrų gijos, to paties tik `file` protokolą naudojančio protokolų sąrašo ir konteinerių leidžiamų formatų sąrašo, 1 MiB proceso išvesties riba ir ne daugiau kaip 30 sekundžių brokerio bendrame nutraukimo / termino biudžete. Jis niekada nepriima komandos, filtro, kelio ar URL iš užklausos.

Struktūrinės reikšmės yra deterministiniai atrankos duomenys, o ne semantinis vaizdo įrašo supratimas. Jos nenustato objektų, veiksmų, antraščių, kalbos ar vartotojo ketinimų. Scenų ir sustingimo ribos sudaro segmentus; sustingimo aprėptis, suliejimas, ekspozicija, erdvinės detalės ir laikinis pokytis tik lemia, kaip paskirstomas esamas 1–16 kadrų biudžetas. Visiškai sustingusiam segmentui skiriamas ne daugiau kaip vienas kadras, o nesustingę segmentai varžosi dėl likusio biudžeto. Kai ribų yra daugiau nei kadrų, išlaikoma tolygi laiko juostos aprėptis, kad greiti ankstyvieji pjūviai negalėtų paslėpti ilgo galinio segmento. Scenos ribos, esančios 1 sekundės analizės skiriamosios gebos ribose nuo sustingimo ribos, sujungiamos.

Trūkstami filtrai, netinkami arba tušti duomenys, detektoriaus klaida ar apribotas išankstinės analizės termino viršijimas saugiai grįžta prie tikslios vienodų vidurio taškų strategijos. Skambinančiojo nutraukimas arba brokerio terminas nesukelia saugaus grįžimo: nutraukiamas vykdomas antrinis procesas, neleidžiama vėliau išgauti kadrų, o privatus laikinasis medis pašalinamas bloke `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuoja deterministinius tikrus FFmpeg testinius failus, skirtus antraščių iškvietimų po dublikatų pašalinimo sutaupymui, tankaus judesio biudžeto paskirstymui, suliejimo / ekspozicijos / SI-TI duomenims, greitiems pjūviams su ilga pabaiga ir laipsniško išblukimo klaidingiems teigiamiems rezultatams. Jis registruoja išankstinės analizės trukmę, o jei prieinamas `/usr/bin/time`, taip pat antrinio proceso procesoriaus laiką ir didžiausią RSS. Kokybės patikros yra tik struktūriniai etalonai. Tikroji antraščių modelio kokybė lieka `HOLD`, nes ši priemonė neturi įgalioto galinio taško ar užfiksuoto vertintojo. Piniginių sutaupymų rezultatas taip pat lieka `HOLD`, nebent `--caption-cost-per-call-usd` pateikia aiškų teigiamą vieno iškvietimo įkainio įvertį; scenarijus niekada neišgalvoja nė vieno iš šių rezultatų.

Kiekvienas kadras ribojamas iki 4 MiB, visi neapdoroti kadrai kartu – iki
23 MiB, o serializuotas tarpininko atsakas – iki 32 MiB. Privatus laikinasis
katalogas pašalinamas bloke `finally`. OmniRoute nesusieja FFmpeg ir nepriima
pasirinktinio vykdomojo failo kelio. Prieš generuojant antraštes, tiltas taiko
konservatyvų vizualinio dubliavimo šalinimo etapą: kiekvienas JPEG sumažinamas
iki 16×16 pilkumo atspalvių buferio ir lyginamas tik su paskutiniu išsaugotu
kadru. Jei prašomas antraščių biudžetas viršija vieną kadrą, išskyrimas pateikia
ribotą kandidatų aibę, sudarytą iš ne daugiau kaip dvigubai tiek kandidatų, kiek
nurodyta biudžete, ir niekada ne daugiau kaip 16 kadrų. Prašoma riba taikoma tik
pašalinus dublikatus; galutinio retinimo metu pirmasis ir paskutinis pasirinkti
kandidatai išsaugomi, jei biudžetas yra bent du. Versijuota
`grayscale-16x16-mean-cells-v2` strategija naudoja didesnę iš vidutinio šviesumo
reikšmės skirtumo ir miniatiūros langelių, kurių normalizuotas skirtumas yra ne
mažesnis nei 0.05, santykio. Dublikatų slenkstis yra konstanta 0.04, pasirinkta
dėl nuspėjamumo, o ne atverta kaip vykdymo metu keičiamas nustatymas. Šis
antrinis didelio kontrasto signalas išsaugo nedidelį judesį ir matomo teksto
pokyčius, kuriuos gali paslėpti vien tik vidurkiu grindžiamas palyginimas.
Palyginimo arba dekoderio klaidos laikomos neblokuojančiomis ir išlaikoma
aprėptis. Išvesties metaduomenyse atskiriami išskirti kandidatai, sėkmingai
panaudoti kadrai ir pašalinti vizualūs dublikatai.

Aiškiai pažymėta vaizdo įrašo dalis gali prašyti kontaktų lapo su laiko žymomis.
Tiltas sukuria ne didesnį kaip 4 stulpelių ir 16 kadrų JPEG tinklelį. Kiekviename
512 pikselių langelyje jo šaltinio laiko žyma įrašoma į didelio kontrasto apatinę
juostą, o tos pačios laiko žymos lieka tekstiniuose metaduomenyse, kad vėlesni
procesai galėtų susieti duomenis ir atlikti auditą. Visas JPEG ir toliau
ribojamas iki 32 MiB. Jei `sharp` negali iškoduoti arba sudėti tinklelio,
tiltas grįžta prie atskirų JPEG kadrų; kliento nutraukimas vis tiek perduodamas
per lapo kūrimo operaciją.

Perkėlimo į produkciją įrodymai sąmoningai atskirti nuo sintetinės kompozicijos
mikrolyginamojo testo. `scripts/perf/video-bridge-contact-sheet-eval.ts`
apibrėžia schemos versiją turintį A/B bandymų įrankį, skirtą realiems su
OpenAI suderinamiems regos modeliams. Jis matuoja teikėjo nurodytus žetonus,
nuo pradžios iki pabaigos trunkančią sieninio laikrodžio delsą (įskaitant lapo
sudarymą), modelio iškvietimų skaičių ir manifeste apibrėžtų faktų išlaikymą.
Neapdoroti modelio atsakai į ataskaitą neįrašomi; išsaugomi tik SHA-256 santraukos
ir sutapusių faktų ID. Įrankis neatlieka tinklo ar mokamo modelio iškvietimo,
nebent perduotas `--execute-real` ir sukonfigūruoti `--model`,
`OMNIROUTE_BASE_URL` bei `OMNIROUTE_API_KEY`. Be šio aiškaus realaus vykdymo
jo kompiuterio apdorojama išvada lieka `HOLD`; vien sintetiniai naudingosios
apkrovos ir iškvietimų skaičiaus matavimai nėra perkėlimo į produkciją įrodymai.

Atskiras `scripts/perf/video-bridge-promotion-eval.ts` naudoja FU-07 arba
FU-09 stebėjimus. Kad būtų galima priimti sprendimą dėl perkėlimo, būtinos visos
aštuonios sintetinių scenarijų rūšys ir vienas nuasmenintas realus klipas, bent
trys išmatuoti pakartojimai kiekvienam vaidmeniui ir atvejui, visi dešimt
deklaruotų metrikų, užfiksuotos medijos, raginimo, tikėtino fakto ir nustatymų
santraukos, unikalūs stebėjimų ID bei patikrinta pradine verte nustatyta A/B
tvarka. Vykdymo kvitas susieja korpuso santrauką, tikslų kandidato SHA ir modelio
versiją. Trūkstami arba negaliojantys matavimai lieka `HOLD`, įskaitant
daugiau nei 30 s trunkantį CPU naudojimą, didesnį nei 512 MiB didžiausią RSS
arba ilgesnę nei 30 s analizę prieš ją. Tai yra įrodymų priėmimo ribos, o ne
nauja vykdymo metu taikoma RSS užtikrinimo garantija.

FU-07 reikalauja bent 98 % kokybės išlaikymo ir p95 delsos, neviršijančios
1,2 karto bazinės reikšmės, taip pat vienos iš šių sąlygų: 0,05 absoliutaus
atvejų subalansuoto vidutinio atkūrimo pagerėjimo, kai vidutinis antraščių
iškvietimų skaičius lygiavertis, arba bent 10 % mažiau vidutinių antraščių
iškvietimų po dublikatų šalinimo. FU-09 reikalauja bent 0,85 kokybės, 95 %
išlaikymo, 20 % medianinės delsos sumažėjimo ir 10 % žetonų sumažėjimo.
Kritinio fakto praradimas, įšvirkštimo reikalavimų nesilaikymas arba trūkstamas
naudojimo rodiklis neleidžia atlikti perkėlimo. Vienas vykdymas negali nieko
perkelti: `--previous-report` patvirtina du skirtingus, nepersidengiančius,
vienas po kito einančius tinkamus tos pačios strategijos, modelio versijos,
kandidato ir korpuso vykdymus. Atrankos eksperimentas negali patvirtinti
kontaktų lapo eksperimento.

Duomenų rinkėjai turėtų vertinti atsakus atmintyje ir išsaugoti
`responseDigest` kartu su metrikomis bei stebėjimų susiejimais, bet niekada
neišsaugoti atsako teksto. Naudotojas taip pat nuskaito senus neapdorotus
stebėjimus, tačiau niekada nekopijuoja šio teksto į savo ataskaitas. Kiekvienam
stebėjimui priimamas tiksliai vienas iš `responseDigest` arba
`rawResponseText`. Versijuotas leidžiamų reikšmių sąrašas tebėra tuščias, o
nekintama numatytoji būsena yra `hold`. Tinkamam įrašui būtina jo įrodymo
nuoroda, strategija, modelio versija, tikslus kandidato SHA, manifesto santrauka
ir du skirtingi vykdymo ID; prieštaringi kontekstai atmetami. Šie metaduomenys
yra audito sutartis, o ne įrodymas, kad nurodytame faile yra tikri matavimai.
Prieš įtraukdami bet kurį įrašą, peržiūrėkite faktinius kvitus. Valdymo
statistikos galinis taškas ir vaizdo įrašų skydelis pateikia konservatyvų
parengties vertinimą. Vien sukonfigūruotas modelio pseudonimas nenustato jo
versijos ar vykdomo kandidato SHA, todėl dabartinis skydelis rodo `HOLD`, o ne
pakartotinai naudoja tinkamumą iš kito vykdymo konteksto. Aiškus eksperimentinis
pasirinkimas tebėra atskirtas nuo perkėlimo; jokia numatytoji reikšmė
automatiškai nepakeičiama.

Skambintojai gali pridėti pasirenkamą `transcript.cues` masyvą prie palaikomos vaizdo įrašo
dalies, kai jau turi sinchronizuotą tekstą. Kiekvienoje žymoje turi būti `text`, baigtinis
`start`/`end` intervalas patikrintos trukmės ribose ir leidžiamas `source` (`client`, `embedded`
arba `audio-bridge`); `confidence` numatytoji reikšmė yra `1` ir ji turi likti nuo `0` iki
`1`. Tikslūs pasikartojantys intarpai pašalinami. OmniRoute niekada nepradeda transkripcijos
pagal šiuos metaduomenis: patvirtintos žymos nukopijuojamos į aprašytą rezultatą kartu su
šaltiniu, pasikliautinumu ir intervalu ir pateikiamos kaip nepatikimos stebėsenos išvados šalia
kadrų antraščių. Netinkamas, už intervalo ribų esantis arba kilmės neturintis tekstas atmetamas,
o ne įmaišomas į antraščių srautą. Abu užklausos kūno transkripcijos kanalai pateiktą kilmę
normalizuoja į `client`, įskaitant pačių nurodytas `embedded` arba `audio-bridge` žymas. Tik
serverio valdomas adapteris gali priskirti šias patikimas žymas per tik kodui skirtą
`trustedSource` argumentą; užklausos JSON laukas šio argumento nepasiekia. Transkripcijos
tekstas išlieka nepatikimu iš medijos gautu turiniu, nepaisant jo kilmės, ir niekada neturi
lemti autorizavimo.

Pažangus skambintojas gali pateikti `audioTranscript` takelį tam pačiam vaizdo įrašui;
jis laikomas kliento pateiktu tekstu, o ne serverio transkripcijos įrodymu. Sujungimo taškas
vykdo vaizdo ir garso stebėseną pagal vieną terminą ir nutraukimo signalą, išdėsto jas bendroje
laiko juostoje, pašalina tikslius pasikartojimus ir pateikia dalinį rezultatą, kai pavyksta tik
viena pusė. Dėl netinkamo `audioTranscript` gaunamas tas dalinis rezultatas — vaizdinis
aprašymas išlaikomas, o garso šaka įrašo nuasmenintą nesėkmės kodą — užuot nutraukus viso vaizdo
įrašo apdorojimą. Šakų pasiekiamumas, dalinio rezultato žyma ir nuasmeninti nesėkmės kodai
išsaugomi aprašytame rezultate, apsaugos metaduomenyse
(`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), rezultatų podėlio
metaduomenyse ir tilto sujungimo skaitikliuose. Numatytoji Video Bridge eiga nekviečia kalbos į
tekstą keitimo ir neatsisiunčia antros medijos kopijos; be šio aiškiai pateikto takelio ji
lieka tik vaizdinė.

**Transkriptų saugojimas (#12150 P1).** Tai automatiškai taikoma, kai Video Bridge (kuris pats
yra pasirenkamas) pateikia transkripcijos žymą — atskiros saugojimo žymos nėra. Kai užklausa
pateikia bet kurią transkripcijos žymą (skambintojo deklaruotą `transcript` arba sulietą
`audioTranscript`), apsaugos mechanizmas pažymi ją `videoBridgeObserved` ir sukuria redaguotą
vaizdo aprašymo šešėlį — identišką pateikimą, kuriame kiekvienos žymos laisvojo teksto turinys
pakeičiamas į `[redacted-video-transcript]`, sukurtą pakeičiant struktūrinį žymos lauką prieš
sudarant eilutę (niekada neanalizuojant sujungto teksto, todėl joks žymos turinys — priešiškas
ar įprastas, įskaitant turinį su `]`, pavyzdžiui, `[inaudible]`/`[music]` — negali išlikti).
Išsaugomas iškvietimo žurnalo užklausos kūnas kiekvieną iš vaizdo gautą teksto dalį pakeičia
tuo redaguotu šešėliu, parinktu pagal turinio lygybę; `fullText` atraminė reikšmė nuskaitoma
iš užbaigto apsaugos mechanizmo naudingojo krovinio prieš iškvietimą, todėl atitiktis išlieka
sėkminga ir vėliau grandinės apsaugos mechanizmams (PII ir kredencialų maskuokliams,
prioritetai 10/95) perrašius aprašymo tekstą vietoje, ir po to, kai sistemos raginimo,
perdavimo ar atminties įterpimas pakeičia pranešimų masyvą. Modeliui perduodamas kūnas
nepakeičiamas. Stebėta užklausa taip pat neužpildo jokios ilgalaikės Memory (praleidžiamas ir
užklausos, ir atsakymo išvestinis išgavimas), todėl paties modelio atsakymas negali įterpti
transkripcijos teksto į Memory.

**Neapdoroti vaizdo įrašo laukai (#12430).** Kai tiltas įjungtas, o savasis vaizdo įrašų
palaikymas nežinomas arba jo nėra, apibrėžti `transcript`/`audioTranscript` laukai taip pat
suaktyvina `videoBridgeObserved`, net ir po aprašymo nesėkmės arba pasiekus `maxVideos`
ribą. `null` ir tuščios eilutės yra įskaičiuojami; nesantys laukai ir ne vaizdo įrašų
metaduomenys — ne. Išsaugotos kopijos šiuos laukus redaguoja arba užklausą praleidžia, o
podėliai ir Memory apeinami.

Šiuose atsarginio kelio scenarijuose galiojančios skambintojo žymos tampa palaikomomis
`text`/`input_text` dalimis, o ne nestandartiniais teikėjo laukais. Abu užklausoje pateikti
takeliai išlieka nepatikimomis `client` stebėsenos išvadomis, kartu pateikiamas aiškus
įspėjimas, kad vaizdo įrašas nebuvo aprašytas, o laiko žymos nebuvo patikrintos pagal mediją.
Esami 256 žymų/64-KiB bendrieji ir kiekvieno takelio biudžetai taikomi abiem takeliams kartu;
laiko žymos turi tilpti į tarpininko 600 sekundžių ribą ir bet kurį pateiktą fokusavimo langą.
Netinkami takeliai pašalinami, o ne perduodami kaip savavališkas tekstas; galiojantis gretimas
takelis vis tiek gali būti naudojamas, nebent viršijamas bendras jų biudžetas. Nuliniai /
tušti laukai neprideda teksto. Šis atsarginis kelias neprideda jokio medijos gavimo ar
transkripcijos. Transkripcijos plėtinio laukai pašalinami iš atsarginio vaizdo įrašo nešiklio
ir jo `video_url`/`source` objektų. OpenAI perdavimo laidų sąrašas išlieka griežtas;
nežinomi savieji vaizdo įrašų nešikliai išlieka prieinami, o žinomi tik tekstą palaikantys
taikiniai išlaiko saugias žymas. Struktūriniai redaguoti šešėliai apsaugo pridėtą transkripcijos
tekstą, o pradinis skambintojo valdomas užklausa lieka nepakeistas. Saviškai palaikomi taikiniai
ir išjungti tiltai išlaiko esamą apėjimo elgseną.

Papildomos išsaugotos kopijos naudoja tą patį stebėtos užklausos signalą. Neapdorota, prieš
apsaugos mechanizmą padaryta kliento užklausos momentinė kopija, atmintyje laukianti užklausa
ir ankstyvas atmestos užklausos žurnalo įrašas struktūriškai pakeičia transkripcijos laukus
vaizdo įrašo dalyse; dujotiekio etapų ir konteksto perdavimo sugeneruotos tekstinės užklausos
redaguojamos išsaugomo užklausos kūno paskirties vietoje. Išsaugotas
`video_content_removed` indikatorius užtikrina, kad `previous_response_id` tęsimas būtų
uždaromas saugiai, o ne atkurtų tyčia pašalintą tekstą. Jei stebėta užklausa prieš registravimą
praranda savo dalies redagavimo šešėlį arba po vėlesnių užklausos pakeitimų neatitinka bent
vienas iš kelių vaizdo įrašo šešėlių, visas išsaugomas užklausos kūnas praleidžiamas, užuot
išsaugojus tik iš dalies redaguotą transkripciją.

Stebimos užklausos atveju modelio atsakyme gali būti cituojama bet kuri transkripcijos dalis be struktūrinės ribos. Todėl išsaugotas jos iškvietimo žurnalo
`responseBody` pakeičiamas praleidimo žymekliu; išsamus konvejerio artefaktas (kuriame gali būti ankstesnės grandies / kliento turiniai ir srauto dalys) neišsaugomas. Semantinės, idempotentiškumo ir samprotavimo atkūrimo talpyklos šios užklausos atveju apeina skaitymus ir įrašymus. Tiekėjo užklausa ir klientui matomas atsakymas lieka nepakitę. Ankstyvieji palaikomojo ryšio baitai ištuštinami iš laikinojo buferio, kai išsamus artefaktas praleidžiamas. Kiro netinkamai suformuoto EventStream įspėjime pateikiamas tik naudingosios apkrovos baitų skaičius, niekada neįtraukiamas jos turinys ar neapdorota JSON analizatoriaus klaida.
Tai nereiškia, kad buvo patikrinta kiekviena nesusijusi tiekėjo / papildinio diagnostika; platesnis išsaugomų paskirties vietų patikrinimas stebimas pagal #11658.

Vidinis `/api/modality-bridge/video/drilldown` gyvavimo ciklas yra atskira, tik iš ciklo kompiuterio sąsajos ir prieigos raktu autentifikuojama talpyklos posistemė. Kiekvienai operacijai taip pat reikalingas kanoninis nepermatomas principalo ID. Prieš įjungiant produkcinį iškvietėją, jis turi išvesti šį ID iš autentifikuoto nuomininko ir niekada neperduoti kliento pasirinktos reikšmės. Talpyklos raktai susieja šį principalą su kanoniniais seanso ir vaizdo įrašo nuorodos ID, saugo tik jų SHA-256 pagrindu išvestus raktus ir apriboja tiek skaitymą, tiek trynimą tuo pačiu principalu. Talpykla viename įraše saugo ne daugiau kaip 16 išvestų JPEG kadrų, panaikina juos po dešimties minučių ir palaiko apribotus
`start`/`end` skaitymus arba aiškų seanso trynimą.

Kiekvienam principalui leidžiama ne daugiau kaip 16 įrašų ir 64 MiB kanoninių JPEG duomenų. Šie limitai nepriklauso nuo bendrosios 64 įrašų / 256 MiB ribos: viršijus principalo kvotą, pirmiausia pašalinami tik rečiausiai neseniai naudoti to principalo įrašai, o tik tada svarstomas visuotinis LRU pašalinimas. Pasibaigę įrašai pašalinami iš principalo ir visuotinės apskaitos vykdant veiksmus su talpykla, o atšaukimas ir validavimo nesėkmė neįrašo dalinio pakeitimo.

Talpykla atmeta nekanoninį Base64, perteklinį užpildymą, ne JPEG formato mediją, netinkamai suformuotus arba sutrumpintus JPEG ir JPEG, kuriuos ribotas viso vaizdo `sharp` dekodavimas apdoroja su įspėjimu. Kiekvienas priimtas vaizdas perkoduojamas į kanoninį JPEG, plotis ir aukštis nustatomi iš iškoduotų baitų, o ne pasitikint iškvietėjo laukais, ir pašalinami visi galiniai poliglotiniai baitai, užuot juos išsaugojus. Abiem kvotoms priskaičiuojamas tik apribotas kanoninis suspaustas buferis. JSON perdavimo riba apima Base64 pridėtines sąnaudas 32 MiB iškoduotos įvesties ribai. Kiekviename išsaugotame darinyje įrašomas patvirtintas JPEG formatas / raiška, diskretizavimo politika, darinio versija, sukūrimo laikas, serverio apskaičiuota turinio maiša ir maišos būdu apdorota pirminė nuoroda kartu su patikimo iškvietėjo pirminio turinio maiša. Atšaukimas tikrinamas tarp asinchroninių dekodavimo / maišos etapų prieš atominį įrašymą į talpyklą.

Produkcinis kūrėjas pakartotinai naudoja jau išvestus tarpininko kadrus tik po sėkmingos vaizdinės analizės, neatlikdamas antro vaizdo įrašo atsisiuntimo / išskleidimo. Jam reikalinga operatoriaus
`modalityBridgeVideoDrilldownEnabled=true`, griežta kiekvienos dalies `drilldown: true` reikšmė ir autentifikuoto API rakto įrašo ID. Kliento deklaruotos principalo / seanso reikšmės niekada nenustato nuosavybės. Jei neįvykdytos visos trys sąlygos, papildomi kadrai nėra maišomi, keičiami jų dydžiai ar saugomi. Išsaugojimo nesėkmė išsaugo naudojamą vaizdinį atsakymą. Sutikimą davusios užklausos apeina viso vaizdo įrašo rezultatų talpyklą, todėl talpykloje išsaugoti rezultatai niekada pakartotinai nepateikia deskriptorių.

Sėkmingi JSON ir SSE atsakymai ribotoje
`x-omniroute-video-drilldown` antraštėje pateikia ne daugiau kaip keturis nepermatomus deskriptorius. Įgaliotos naršyklės kilmės gali perskaityti šią antraštę, neišplečiant CORS kilmės politikos. Nauji deskriptoriai naudoja formatą `v1.<32-byte random base64url
token>`, o registras saugo tik jų SHA-256 maišas. Skaitytuvas / antraštės analizatorius taip pat priima senesnius 64 šešioliktainių simbolių deskriptorius. Autentifikuotas viešasis vartotojas yra
`GET /api/v1/video-bridge/drilldown?handle=...`, kurio prieigą atskirai kontroliuoja
`modalityBridgeVideoDrilldownRemoteEnabled=true`. Aiškiai išsaugota false reikšmė panaikina prieigą net tada, kai įjungtas senasis
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` aplinkos kintamojo grįžtamasis variantas. Produkcinis išsaugojimas turi analogišką senąjį
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` grįžtamąjį variantą. Abu grįžtamieji variantai pagal numatytuosius nustatymus išjungti.

Vartotojas iš autentifikuoto rakto nustato nuosavybę ir taiko rakto politiką:
tiek GET, tiek DELETE priklauso `video` galinių taškų kategorijai, įskaitant `/v1`
ir `/api/v1` alternatyvius kelius. Raktai, kurių galinių taškų leidimų sąrašas nėra tuščias, turi apimti `video`;
neribojami raktai išlieka suderinami. Vartotojui nežinomų, pasibaigusių ir kitam raktui priklausančių deskriptorių atveju grąžinamas tas pats 404. Priimama
`variant=preview|standard|detail` (didžiausias JPEG matmuo 320 / 640 / 1280, niekada nedidinamas),
`limit=1..8` (arba senasis `frames` pseudonimas, bet ne abu), nulinės pradžios `page` ir pasirenkamos
`start` / `end` fokusavimo sekundės. Pasikartojantys
užklausos raktai ir atvirkštine tvarka nurodyti fokusavimo langai atmetami. Kiekvienas grąžintas variantas turi faktinio turinio maišą ir faktinės raiškos metaduomenis, susietus su išsaugotu šaltiniu. Variantai išvedami skaitymo metu, o ne saugomi kaip papildomos išsaugotos kopijos. JSON
atsakymas, įskaitant Base64 / apvalkalą, apribotas iki 32 MiB; per didelio puslapio atveju grąžinamas 413, o klientas turi prašyti mažiau kadrų. Skaitymai tikrina atšaukimą aplink kiekvieną dydžio keitimo operaciją ir, prieš grąžindami rezultatą, pakartotinai patikrina deskriptoriaus galiojimą. `DELETE` savininkui yra idempotentiškas;
ištrynus arba pasibaigus TTL, išlaisvinamas išsaugotas šaltinis ir atnaujinama naudojimo apskaita.

Bendroji saugykla yra lokali procesui: iš naujo paleidus procesą deskriptoriai pasibaigia ir jų negalima perduoti tarp nepriklausomų OmniRoute procesų. Valdymo statistika pateikia faktinį išsaugojimo / nuotolinės prieigos politikos nustatymą ir bendrą išsaugotų įrašų / baitų skaičių, tačiau niekada neatskleidžia medijos, nuorodų, principalo ID ar deskriptorių. Vaizdo įrašo nustatymų skydelyje rodomos šios reikšmės ir galima išsaugoti abu sutikimo jungiklius. Ši įgyvendinimo dokumentacija nėra veikiančios diegimo ar išleidimo įrodymas; realaus modelio priėmimas stebimas atskirai.

Kadrai nuosekliai aprašomi naudojant sukonfigūruotą Video modelį. Tuščias
Video perrašymas paveldi Vision nustatymą; jei abu yra tušti, Vision
automatinis maršrutizatorius parenka faktinį modelį, galintį apdoroti vaizdą.
Sėkmingi aprašai pakeičia pradinę dalį stabiliu `[Video description:` prefiksu,
kuris taip pat pažymi tekstą kaip nepatikimą iš medijos gautą stebėjimą ir
nurodo tolesniems modeliams nevykdyti medijoje rastų instrukcijų. Kadrų aprašų
talpyklos raktai apima JPEG baitus, raginimą, laiko žymą ir faktinį modelį;
talpykloje saugomi tik sėkmingi aprašai. Talpyklos įrašuose išsaugomas tikrasis
sėkmingas kūrėjo modelis, įskaitant atsarginį modelį; tarpinė sistema grąžina
`mixed`, kai skirtingus kadrus sukūrė skirtingi modeliai. Pataikius į talpyklą,
pakartotinai naudojama to kūrėjo tapatybė, o ne pervadinama pagal prašomą
maršrutizavimo planą. Visos vaizdo įrašo rezultato talpyklos raktas sudaromas iš
kiekvieno įvesties elemento, galinčio pakeisti išvestį — raginimo, faktinio
modelio, atrankos strategijos, kadrų skaičiaus, semantinės analizės režimo,
normalizuoto fokusavimo patarimo SHA-256 kontrolinio atspaudo, fokusavimo
lango, `transcript`, `audioTranscript` ir kontaktinio lapo požymio — todėl
pakeitus bet kurią iš šių dimensijų įvyksta talpyklos praleidimas, o ne
panaudojamas pasenęs rezultatas. Vaizdinio dublikatų šalinimo strategijos
versija, slenkstis ir ribojamas kandidatinių kadrų skaičius taip pat aiškiai
įtraukiami į rezultato talpyklos raktą ir metaduomenis; todėl pakeitus strategiją
negalima pakartotinai naudoti pasenusio viso vaizdo įrašo aprašo. Rezultatų
talpyklos v4 metaduomenyse išsaugomas režimas ir kontrolinis atspaudas, bet
niekada neapdorota naudotojo užduotis. Apsaugos mechanizmo metaduomenyse
pateikiami ir prašomas, ir faktinis analizės režimai; prašomas `focused` režimas,
kai nėra tinkamo naudotojo teksto, nurodomas kaip faktiškai `full`.

Apsaugos mechanizmas ištraukia visas palaikomas vaizdo įrašo dalis, tačiau
aprašo ne daugiau kaip `modalityBridgeVideoMaxVideos`. Jei nustatyta, kad
tikslas turi `supportsVideo === false`, nepavykę ir viršijantys ribą vaizdo
įrašai paverčiami aiškiais saugaus teksto žymenimis, todėl neapdorotas vaizdo
įrašas neišlieka. Kai galimybė nežinoma, šios dalys išsaugo vaizdo įrašo
laikmeną; bet koks atsarginis transkriptas atitinka pirmiau aprašytą ribojamą
teksto konvertavimą. Tikslai, kurių `supportsVideo === true`, tarpinę sistemą
apeina. Kliento užklausos nutraukimo signalas perduodamas per atsisiuntimą,
tarpininko eilę, antrinius procesus ir aprašo iškvietimus; nutraukimai sustabdo
procesą tarp vaizdo įrašų ir niekada neleidžia grįžti prie neapdorotos medijos.

Veikimo laiko nustatymai saugomi DB ir tikrinami naudojant Zod:

| Raktas                              | Numatytoji reikšmė | Diapazonas / elgsena                                                                                        |
| ----------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`            | Pasirinktinis veikimo laiko nustatymas, įjungiamas pasirinktinai                                            |
| `modalityBridgeVideoAnalysisMode`   | `"full"`           | `full` išsaugo bendruosius aprašus; `focused` naudoja ribotą, nepatikimą naujausią naudotojo kontekstą      |
| `modalityBridgeVideoModel`          | `""`               | Paveldi Vision Bridge modelį                                                                                |
| `modalityBridgeVideoFrameCount`     | `8`                | 1–16                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`        | `uniform`, `scene_aware` arba proporcinis `segment_aware`; detektoriaus klaidos atveju grįžtama į `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`                | 1–4                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`           | 1000–120000 ms                                                                                              |

Ankstesni išsaugoti Video skirtojo laiko limitai, viršijantys 120 sekundžių,
apribojami tarpininko galutiniu terminu; nauji nustatymų įrašai, viršijantys šią
ribą, atmetami. `GET /api/modality-bridge/video/runtime` prieš autentifikavimą
arba veikimo laiko tikrinimą reikalauja patikimos, antspaudu pažymėtos vietinės
grįžtamosios sąsajos vietos, o tada — valdymo autentifikavimo. Jis grąžina tik
`available`, nuasmenintas FFmpeg/ffprobe versijas ir fiksuotą priežastį, kai
veikimo aplinka nepasiekiama. Vidinis ištraukimo galinis punktas nėra vieša
įkėlimo API: eilės perpildymas grąžina `503` ir `Retry-After`, skambinančioji
pusė atsijungus grąžina `499`, o fiksuotas tarpininko galutinis terminas —
`504`. Konvertuoti atsakymai į centrinę
`x-omniroute-modality-bridge` antraštę įtraukia
`video->text;model=<visionModel>;parts=<videos>`, nepašalindami Vision ar Audio
segmentų.

### PII maskuoklis (`piiMasker.ts`)

Veikia **abiejuose** etapuose.

- **`preCall`** klonuoja naudingąją apkrovą, pereina per `system`, `messages`, `input` ir
  `prompt` (įskaitant paprasto teksto elementus) ir taiko `processPII()` (iš
  `@/shared/utils/inputSanitizer`) eilutės tipo `content` / `text` laukams. Kai
  `PII_REDACTION_ENABLED=true`, aptikti PII nuasmeninami siunčiamoje
  naudingojoje apkrovoje. Tai nepriklauso nuo `INPUT_SANITIZER_MODE` (jis
  kontroliuoja tik promptų įterpimo politiką). Kai nuasmeninimas išjungtas,
  iškvietimas užfiksuoja aptikimų skaičių, tačiau turinys nepakeičiamas.
- **`postCall`** giliai klonuoja atsakymą, paleidžia `sanitizePIIResponse()` ir
  Responses API formos maskuoklį (`maskResponsesOutput` — apima
  `output_text` ir `output[].content[].text`). Jei atliekamas bent vienas
  nuasmeninimas, pakeistas atsakymas pakeičia pradinį.

Apsaugos mechanizmas niekada neblokuoja; jis tik prideda anotacijas
(`meta.detections`, `meta.redacted`) arba perrašo turinį.

**Grąžinamas saugyklos režimas (`PII_REVERSIBLE_VAULT_ENABLED`, numatytoji reikšmė
`false`).** Kai įjungti ir `PII_REDACTION_ENABLED`, ir
`PII_REVERSIBLE_VAULT_ENABLED` (DB perrašymas >
aplinkos kintamasis > numatytoji reikšmė, perskaitoma vieną kartą per užklausą),
`handleChat` atidaro vieną saugyklą kiekvienai kliento užklausai
(`src/lib/pii/requestTokenVaultScope.ts`) ir perduoda ją iškvietimo paruošimo
etapui kaip `GuardrailContext.tokenVault`. Tada maskavimo priemonė vietoje
`[EMAIL_REDACTED]` įrašo pakaitinius žetonus, pvz.,
`<<PII_EMAIL_QWERTYUI_1>>`, ir įtaisytosioms, patvirtintoms (GDPR/POPIA), ir
pasirinktinėms taisyklėms. Nonce yra 8 atsitiktinės didžiosios raidės kiekvienai
užklausai, o ta pati reikšmė toje pačioje užklausoje gauna tą patį žetoną.
Žetonus kuria tik maskavimo priemonė: prompt injekcijų apsauga ir
`/api/guardrails/test` veikia be saugyklos ir išlaiko vietos rezervavimo
žymeklius.

- Teikėjas, kiekvienas kombinacijos etapas, pakartotinis bandymas, suliejimo
  skydelio narys ir suliejimo vertintojas mato tik žetonus. Žetonai atkuriami
  vieną kartą, 2xx atsakyme, kuris palieka `handleChat`: pagal lauką
  išanalizuotame SSE (žetonas, padalytas per kelis įvykius, vis tiek
  išsprendžiamas; įrankio iškvietimo argumentai yra JSON koduoti) arba pagal
  lauką JSON turinyje, perskaičiuojant `Content-Length`. Atkuriamas turinys,
  samprotavimo tekstas ir įrankio iškvietimo argumentai. Klaidų atsakymų
  turiniuose (4xx/5xx) žetonai išlieka.
- Nesėkmės išlieka privačios: jei žetono sukurti nepavyksta arba saugykla
  atsisako reikšmės (1000 įrašų, 256 simboliai vienai reikšmei, iš viso 64 KB),
  vietoje jos įrašomas vietos rezervavimo žymeklis; žetonas, kurio saugykla
  negali išspręsti, arba nepavykusio atkūrimo rezultatas lieka pažodinis ir
  registruojamas tik skaitiklis. Saugykloje nėra laikmačių ir visuotinės
  būsenos; ji išvaloma, kai atsakymo srautas baigiasi, atšaukiamas arba įvyksta
  klaida.
- Kai užklausa sukūrė žetonų, atminties išgavimas, idempotentiškumo išsaugojimas
  ir abu semantinės talpyklos įrašymai praleidžiami, nes jokia vėlesnė užklausa
  negalėtų išspręsti šių žetonų. Iškvietimų žurnaluose teikėjo užklausoje ir
  atsakyme pateikiami žetonai; užregistruotas kliento užklausos turinys vis dar
  yra neapdorota kliento įvestis, kaip ir taikant paprastą redagavimą.
- Žetonams naudojamas kiekvienai užklausai atsitiktinai sugeneruotas nonce, todėl
  prompto priešdėlis keičiasi kiekvieno pokalbio etapo metu: teikėjo pusėje
  esanti promptų spartinančioji talpykla nepasiekiama maskuotiems etapams, o
  vėlesniame etape grįžęs žetonas (pavyzdžiui, per
  `previous_response_id`) priklauso senai užklausai ir lieka pažodinis.

#### Parinkimas pagal tipą, pasirinktiniai šablonai ir aptikimo skaitikliai

**Valdymo skydas → Nustatymai → Saugumas → PII maskavimas** parenka, _kas_
maskuojama. Jis neįjungia maskavimo: tai vis dar atlieka
`PII_REDACTION_ENABLED` (užklausa) ir `PII_RESPONSE_SANITIZATION` (atsakymas +
SSE), abu pagal numatytuosius nustatymus išjungti.

- **Parinkimas pagal tipą** — įtaisytųjų id sąrašas pateiktas
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nenurodyta reikšmė
  reiškia visus tipus (elgsena, buvusi iki šio nustatymo atsiradimo). Užklausų
  variklio `ssn_us` šablonas susiejamas su `ssn`. Šablonai (Minimalus,
  Standartinis, Finansinis, Brazilijos, JAV, GDPR, POPIA, Visas) tik užpildo
  žymimuosius laukelius naudotojo sąsajoje.
- **GDPR ir POPIA identifikatoriai** — dvylika įtaisytųjų id, apimančių ES ir
  Pietų Afrikos asmens identifikatorius (žr. toliau pateiktą lentelę). Jų
  reguliariosios išraiškos, tikrintuvai ir jurisdikcijos žymos pateiktos vienoje
  lentelėje, `src/shared/utils/piiPatterns.ts`, kurią naudoja ir atsakymo
  sanitizavimo priemonė (`src/lib/piiSanitizer.ts`), ir užklausų maskavimo
  priemonė (`src/shared/utils/inputSanitizer.ts`). Atitiktis redaguojama tik
  tada, kai ją priima tikrintuvas; vien tik skaitmenų seka niekada nėra
  pakankama. Operatorius, kuris išsaugojo susiaurintą pasirinkimą prieš
  atsirandant šiems id, išlaiko turėtą elgseną, kol nepažymi naujų id.
- **Pasirinktiniai šablonai** — iki 20 reguliariųjų išraiškų arba pakaitos
  šablonų (`*` = iki 64 ne tarpų simbolių, `?` = vienas). Atitiktys tampa
  `[CUSTOM_REDACTED]`. Kiekvienas šablonas pereina per
  `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`):
  daugiausia 500 simbolių, vėliavėlės apribotos iki `g i m s u`, šablonas turi
  būti kompiliuojamas, atitikti `safe-regex` reikalavimus (apsauga nuo
  katastrofiško grįžimo atgal) ir neturi atitikti tuščios eilutės arba redagavimo
  vietos rezervavimo žymeklio. Nepavykęs šablonas atmetamas jį išsaugant ir
  testuojant, o saugoma eilutė, kuri nepraeina patikros, vykdymo metu
  praleidžiama, užuot ją kompiliavus. Pasirinktiniai šablonai vykdomi tik tada,
  kai maskavimas įjungtas.
- **Aptikimo skaitikliai** — kiekiai pagal tipą (niekada neįsimenamos atitikusių
  reikšmės), laikomi atmintyje ir iš naujo nustatomi paleidus sistemą
  (`src/lib/pii/piiDetectionStats.ts`). Jie didinami tik tada, kai maskavimas
  įjungtas.

Nustatymai saugomi `key_value` lentelėje (vardų sritis `pii_settings`,
`src/lib/db/piiSettings.ts`) ir nuskaitomi per 1 s talpyklą. API:

| Metodas | Kelias                   | Paskirtis                                                                                      |
| ------- | ------------------------ | ---------------------------------------------------------------------------------------------- |
| `GET`   | `/api/settings/pii`      | Vėliavėlės būsena, `enabledTypes`, `customPatterns`, aptikimo skaitikliai                      |
| `PUT`   | `/api/settings/pii`      | Pakeičia `enabledTypes` (`null` = visi) ir (arba) `customPatterns`                             |
| `POST`  | `/api/settings/pii/test` | Bandomuoju režimu patikrina vieną šabloną ne didesniame nei 8 KB pavyzdyje; niekas neišsaugoma |

Visi trys reikalauja valdymo autentifikavimo ir tikrina užklausos turinį
naudodami Zod (`src/shared/validation/schemas/piiSettings.ts`). Išjungus
prisijungimą (`requireLogin=false`), `GET` ir testavimo galinis taškas yra
atviri, tačiau `PUT` vis tiek reikalinga valdymo skydelio sesija,
`manage` aprėpties API raktas, `oma_` prieigos žetonas su rašymo aprėptimi ar
aukštesne, arba CLI žetonas ar vidinės paslaugos žetonas, siunčiamas iš
grįžtamojo ryšio sąsajos.

#### GDPR (ES) ir POPIA (Pietų Afrikos) identifikatoriai

| Id                  | Identifier                             | Validation                                                                                     |
| ------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                                   | Žinoma šalis, tikslus tos šalies ilgis, ISO 13616 MOD-97-10                                    |
| `eu_vat`            | ES PVM mokėtojo numeris                | Žinomas valstybės narės prefiksas ir tos valstybės numerio formatas (VIES paieška neatliekama) |
| `es_dni_nie`        | Ispanijos DNI / NIE                    | Kontrolinė raidė (reikšmė mod 23); NIE yra `X/Y/Z` + 7 skaitmenys                              |
| `it_codice_fiscale` | Italijos Codice Fiscale                | Kontrolinė raidė pagal nelyginių / lyginių pozicijų lenteles                                   |
| `pl_pesel`          | Lenkijos PESEL                         | Svertinė kontrolinė suma ir esanti užkoduota gimimo data                                       |
| `nl_bsn`            | Nyderlandų BSN                         | 11 patikra (svoriai 9..2, -1)                                                                  |
| `de_steuer_id`      | Vokietijos Steuer-ID                   | ISO 7064 Mod 11,10 ir skaitmenų struktūros taisyklės (be pradinio 0)                           |
| `se_personnummer`   | Švedijos personnummer                  | Luhn pagal paskutinius dešimt skaitmenų ir tikėtina gimimo data (10 arba 12 skaitmenų)         |
| `za_id`             | Pietų Afrikos asmens tapatybės numeris | Luhn pagal visus 13 skaitmenų, tinkamas gimimo mėnuo / diena, pilietybės skaitmuo 0 arba 1     |
| `za_phone`          | Pietų Afrikos telefono numeris         | Prefiksas `+27` / `27` arba nacionalinis `0..` formatu užrašytas su tarpu arba brūkšneliu      |
| `za_vat`            | Pietų Afrikos PVM mokėtojo numeris     | 10 skaitmenų, prasidedančių `4`, **ir** "VAT" / "BTW" per ankstesnius 48 simbolius             |
| `za_tax_ref`        | Pietų Afrikos mokesčių nuoroda         | 10 skaitmenų, prasidedančių `0`–`3`, Luhn, **ir** "tax" / "SARS" per ankstesnius 48 simbolius  |

Kadangi tik iš skaitmenų sudaryti formatai sutampa su užsakymų numeriais, komponavimo
numeriais ir laiko žymomis, silpniausiems formatams (`za_vat`, `za_tax_ref`) reikia
raktinio žodžio indikatoriaus, o paprastas dešimties skaitmenų `0..` numeris
nelaikomas Pietų Afrikos telefono numeriu. Tarpais rašomi IBAN (`GB29 NWBK ...`)
neatpažįstami. Srautinio apdorojimo kelyje indikatorius ieškomas tik dabartinėje
dalyje. Šie identifikatoriai tikrinami prieš bendruosius telefono numerių
šablonus, todėl patvirtintas identifikatorius išlaiko savo vietos rezervavimo
žymę (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). `gdpr` ir `popia` šablonai
atitinkamai pasirenka ES ir Pietų Afrikos identifikatorius. Pats maskavimas išlieka
pasirenkamas (griežta taisyklė #20): čia niekas nekeičia funkcijos vėliavėlės
numatytosios reikšmės.

### Promptų injekcija (`promptInjection.ts`)

Aptinka priešiškas struktūras naudotojo pateiktame turinyje ir taiko sukonfigūruotą
politiką. Elgseną lemia aplinkos kintamieji ir konstruktoriaus parinktys:

| Setting             | Env var                                                                                                        | Default | Effect                                                                                                                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Įjungta             | `INPUT_SANITIZER_ENABLED`                                                                                      | `true`  | Kai reikšmė yra `false`, apsaugos mechanizmas iškart baigia darbą.                                                                                                                         |
| Režimas             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                                | `warn`  | Injekcijų politika: `block`, `warn` arba `log`. (`redact` priimama dėl atgalinio suderinamumo, tačiau injekcijų teksto nepašalina; užklausos PII perrašymą valdo `PII_REDACTION_ENABLED`.) |
| Blokavimo slenkstis | `blockThreshold` parinktis / `INPUT_SANITIZER_BLOCK_THRESHOLD` (pseudonimas `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Mažiausias blokavimui reikalingas pavojingumo lygis. Pagal numatytąją reikšmę vidutinio lygio aptikimai tik stebimi.                                                                       |

**Režimo pirmumas** (`getMode`): iškvietėjo `options.mode` →
`INJECTION_GUARD_MODE` **DB funkcijos vėliavėlės perrašymas** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` aplinkos kintamasis →
`INPUT_SANITIZER_MODE` aplinkos kintamasis → `warn`. Todėl skydelio perrašymas
turi pirmenybę prieš aplinkos kintamuosius, o „Feature Flags“ naudotojo sąsaja
valdo veikiančią apsaugą realiuoju laiku (nereikia paleisti iš naujo). DB
nuskaitymas yra saugus pagal nutylėjimą: įvykus klaidai, apsauga grįžta prie
aplinkos kintamaisiais grindžiamos elgsenos, o kai perrašymas nenustatytas,
elgsena yra identiška tik aplinkos kintamaisiais grindžiamai raiškai.

Aptikimo šaltiniai:

1. `sanitizeRequest()` iš `@/shared/utils/inputSanitizer` (bendras aptikimo
   rinkinys, naudojamas kitur konvejeryje).
2. Integruoti `DEFAULT_GUARD_PATTERNS` (šiuo metu `system_override_inline` ir
   `markdown_system_block`, abiejų pavojingumo lygis yra `high`).
3. Pasirinktiniai `customPatterns`, perduodami per konstruktoriaus parinktis
   (eilutės, reguliarūs reiškiniai arba `{ name, pattern, severity }` įrašai).

Kai `mode === "block"` **ir** bent vienas aptikimas pasiekia pavojingumo
slenkstį, `preCall` grąžina `{ block: true, message: "Request rejected:
suspicious content detected" }`. Veikiant `warn` / `log` režimais apsaugos
mechanizmas įrašo į žurnalą, tačiau leidžia iškvietimą. Bendrinė pagalbinė
funkcija `evaluatePromptInjection()` taip pat eksportuojama iškvietėjams,
kuriems reikia įvertinti užklausas nenaudojant registro.

**Nuskaitymo riba (v3.8.20):** detektorius tikrina tik **pirmuosius 16 KB**
sujungto raginimo teksto — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 baitus) faile
`src/shared/utils/inputSanitizer.ts`. Tiek `detectInjection()`, tiek
`evaluatePromptInjection()` prieš vykdydamos šablonų ciklą iškviečia
`slice(0, MAX_INJECTION_SCAN_BYTES)`. Injekcijos direktyvos yra netoli įvesties viršaus, todėl
tai apriboja reguliariųjų išraiškų CPU ir GC sąnaudas kelių šimtų KB apimties
duomenims, nesusilpninant aptikimo (žr.
#3932, #4041).

### Kredencialų maskuoklis (`credentialMasker.ts`)

Veikia abiejuose etapuose, numatytosios grandinės pabaigoje (prioritetas `95`). Išsiunčiamuose duomenyse (pranešimo turinyje, įrankio iškvietimo argumentuose, įrankio rezultatuose) **ir** teikėjo atsakyme užmaskuoja gerai žinomus API raktų / slaptųjų žetonų šablonus, todėl į raginimą įklijuotas kredencialas (arba įrankio rezultato pakartotas kredencialas) nenutekės aukštesnio lygio teikėjui ar klientui.

- **Įjungiamas tik pasirinktinai**, taikant tą pačią konvenciją kaip PII redagymui (greta griežtosios taisyklės #20): išjungtas, nebent `settings.credentialRedactionEnabled === true` **arba**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kai išjungtas, apsaugos mechanizmas nieko nedaro —
  niekada neblokuoja ir nieko neperrašo.
- `redactCredentials()` pereina per visą duomenų / atsakymo medį (`walkValue()`),
  yra saugus nuo prototipo taršos, ciklų saugumas užtikrinamas naudojant `WeakSet`, ir pakeičia atitiktis vietos rezervavimo ženklu `[REDACTED:<type>]`, klonuodamas tik faktiškai pasikeitusias šakas.
- `CREDENTIAL_PATTERNS` apima LLM teikėjų raktus (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS / SaaS žetonus (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), mokėjimų raktus (Stripe, Square), debesijos
  raktus (AWS prieigos raktą, Twilio, SendGrid, Mailgun), privačiuosius raktus / JWT,
  kredencialus turinčias prisijungimo eilutes
  (`mongodb://user:pass@...` ir kt.) bei bendrą `Authorization`/`x-api-key`/`api-key`/`apikey`
  antraštės reikšmės šabloną. Antraštės formato raktai (`authorization`, `x-api-key`, `api-key`,
  `apikey`) redaguojami struktūriškai (tik reikšmė, išsaugant schemos priešdėlį, pvz.,
  `Bearer `/`Basic `), o ne naudojant bendrąjį teksto reguliarųjį reiškinį.
- Apsaugos mechanizmas niekada neblokuoja; jis tik perrašo (`modifiedPayload` /
  `modifiedResponse`) ir prideda metaduomenis (`meta.credentialsRedacted`, `meta.count`).

Regresijos apsauga: `tests/unit/credential-masker-guardrail.test.ts`.

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

Kiekvienai užklausai, perduodamai per `src/sse/handlers/chat.ts` ir
`open-sse/handlers/chatCore.ts` (pokalbių šeimos maršrutams, išvardytiems skiltyje
[Aprėptis ir apribojimai](#coverage-and-limits)):

1. `resolveDisabledGuardrails(...)` sudaro praleidžiamų apsaugos taisyklių sąrašą pagal API raktą, užklausos turinį
   ir antraštes.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` vykdo apsaugos taisykles didėjančia
   prioriteto tvarka:
   - Išjungtos apsaugos taisyklės įrašomos kaip `skipped`.
   - Kiekvienos apsaugos taisyklės `preCall` gali perrašyti naudingąją apkrovą per `modifiedPayload`.
   - Pirmasis `block: true` nutraukia grandinę, o apdorojimo programa grąžina apsaugos taisyklės atmetimo atsaką.
3. (Galimai perrašyta) naudingoji apkrova perduodama į kombinuotą maršrutizavimą ir tolesnį perdavimą.
4. **Tik nesrautiniam režimui:** surinkus atsaką,
   `guardrailRegistry.runPostCallHooks(...)` vykdo tą pačią grandinę su atsaku. `block: true` tokiu atveju atmeta
   upstream atsaką ir grąžina HTTP 400. Srautiniai atsakai šį veiksmą visiškai praleidžia.
5. **Tik grįžtamajam saugyklos mechanizmui:** kai užklausa sugeneravo žetonus, `handleChat`
   atkuria juos savo grąžinamame 2xx atsake po iškvietimo po atsako kabliukų ir srautinio PII transformavimo, todėl
   `PII_RESPONSE_SANITIZATION` mato žetonus ir modelio sugeneruotus PII, bet niekada neatkurto pradinio turinio.

Apsaugos taisyklės, kurios sukelia išimtį, įrašomos su `error: <message>` ir registruojamos per
`logger.warn`, tačiau grandinė tęsiama — tai numatytas veikimas, kai klaida neatveria prieigos blokavimo.

## Aprėptis ir ribos

Apsaugos mechanizmų registras prijungtas tik prie pokalbių konvejerio. Šias ribas nustato
`tests/unit/guardrail-pipeline-wiring-characterization.test.ts` ir
`tests/unit/guardrail-pipeline-characterization.test.ts`; pasikeitus veikimui, šiuos testus
reikia atnaujinti sąmoningai.

### Kur vykdomi kabliai

| Hook / control                                         | Vykdomas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                                      | Užklausoms, kurias apdoroja `handleChat` (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (ir `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*` ir „Telegram“ pokalbių tarpiniam serveriui. Taip pat prietaisų skydelio testavimo galiniam taškui `/api/guardrails/test`. Išankstinio iškvietimo blokavimas grąžina HTTP 400. |
| `runPostCallHooks`                                     | Tik **nestreaminamiems** pokalbių atsakymams (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). Srautiniu būdu perduodami atsakymai jo niekada nepasiekia.                                                                                                                                                                                                                                                                                                                          |
| Srautinis PII                                          | `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), prijungiamas `streamingPipeline.ts`, kai įjungtas `PII_RESPONSE_SANITIZATION`. Tai nėra apsaugos mechanizmas, todėl išjungimo kanalai jam netaikomi.                                                                                                                                                                                                                                                                       |
| Atkuriama PII saugykla                                 | Tik `handleChat` apdorojamoms užklausoms, kai įjungti `PII_REDACTION_ENABLED` ir `PII_REVERSIBLE_VAULT_ENABLED`. Žetonus sukuria `pii-masker` išankstinio iškvietimo metu, o `handleChat` išėjimo metu jie atkuriami (`src/lib/pii/requestTokenVaultScope.ts`). Išjungus `pii-masker` užklausai, niekas nesukuriama.                                                                                                                                                                     |
| Įterpimo apsaugos tarpinė programinė įranga (pasenusi) | Visiems užklausas turintiems `/v1` maršrutams, įskaitant pokalbių grupę (žr. [maršrutų aprėptį](#injection-guard-route-coverage--red-team-phase-8--block-d)). Tik apsauga nuo komandų įterpimo.                                                                                                                                                                                                                                                                                          |

### Kas neapimama

- **Medijos, įterpimų ir duomenų maršrutai** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) niekada nepasiekia registro. Juose nevykdomas
  PII maskavimas, kredencialų maskavimas ar modalumo tiltas. Vienintelis jų
  patikrinimas – pasenusi įterpimo apsaugos tarpinė programinė įranga.
- **Srautinio perdavimo atsakymams** netaikomi jokie iškvietimo pabaigos apsaugos mechanizmai: nėra
  `pii-masker` ar `credential-masker` iškvietimo pabaigos etapo ir nėra iškvietimo pabaigos blokavimo. Taikoma tik srautinio PII
  transformacija (kai įjungtas `PII_RESPONSE_SANITIZATION`). Srautiniu būdu perduotame atsakyme
  pakartotas kredencialas nėra redaguojamas.
- **Išjungimo kanalai ir tarpinė programinė įranga (pagal projektą):** tarpinė programinė įranga įvertina komandų įterpimą
  atskiru kvietimu į `evaluatePromptInjection()`, neperduodama jokio skambinančiojo valdomo išjungimų sąrašo. `block` režimas yra privaloma
  riba, kurios skambinančiojo valdomi išjungimai negali apeiti, įskaitant pokalbių grupės maršrutus
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). Išjungus
  `prompt-injection`, praleidžiamas tik registro apsaugos mechanizmas.

### Kas mato atsakymą prieš iškvietimo pabaigos etapą

Nestreaminimo kelyje tvarka yra tokia: atminties išgavimas → integruotųjų įrankių
vykdymas → iškvietimo pabaigos apsaugos mechanizmai → iškvietimo pabaigos blokavimo išėjimas → semantinės podėlio
saugykla.

- **Atminties išgavimas** ir **įrankių vykdymas** mato atsakymą prieš tai, kai iškvietimo pabaigos apsaugos mechanizmai gali jį perrašyti arba užblokuoti. Nuo
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) atminties
  išgavimas perduoda išgautą tekstą per `sanitizePII`, kai įjungtas
  `PII_RESPONSE_SANITIZATION` (tiek srautinio, tiek nestreaminimo režimu), tačiau atsakymas,
  kurį iškvietimo pabaigos etapas vėliau užblokuoja, vis tiek jau buvo pateiktas atminčiai ir įrankiams.
- **Semantinis podėlis** išsaugo atsakymą po iškvietimo pabaigos etapo, todėl jame išsaugomas
  perrašytas atsakymas, o užblokuotas atsakymas niekada nepatalpinamas į podėlį. Podėlio įrašai
  indeksuojami pagal API raktą.

## Konfigūracija

Aplinkos kintamieji, kuriuos nuskaito integruotos apsaugos:

| Kintamasis                            | Naudojamas                 | Poveikis                                                                                                           |
| ------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Nustačius `false`, aptikimas visiškai išjungiamas.                                                                 |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Įšvirkštimo politika: `warn`, `block` arba `log`. Pasenusi reikšmė `redact` neperrašo įšvirkštimo teksto.          |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Įšvirkštimo apsaugos režimas; taip pat DB funkcijos vėliavėlė, kuri **pakeičia** aplinkos kintamuosius (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | Mažiausias griežtumo lygis, kurį `MODE=block` atmeta: `high` (numatytoji reikšmė), `medium` arba `low`.            |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | Pasenęs `INPUT_SANITIZER_BLOCK_THRESHOLD` pseudonimas.                                                             |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | Kai reikšmė yra `true`, užklausos PII pašalinami (nepriklausomai nuo įšvirkštimo režimo).                          |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | Kai įjungta `PII_REDACTION_ENABLED`, sukuriami grįžtamieji žetonai ir jie atkuriami 2xx atsakymuose.               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream)  | Valdo atsakymų pusės maskavimo priemonės veikimą.                                                                  |

„Modality Bridge“ apsaugos vykdymo konfigūraciją skaito iš DB pagrindu veikiančios nustatymų
saugyklos (`getSettings()`), o ne iš aplinkos kintamųjų. Pagrindiniai „Vision“ raktai yra
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ir
`modalityBridgeCacheMaxEntries`. Pasenę
`visionBridge*` raktai priimami tik kaip dokumentuotas vieno ciklo skaitymo
atsarginis variantas; prietaisų skydelio įrašai naudoja pagrindinius raktus. Numatytosios reikšmės ir atsarginio varianto
sprendiklis yra faile `src/shared/constants/modalityBridgeDefaults.ts`, o pasenusios
konstantos išsaugotos faile `src/shared/constants/visionBridgeDefaults.ts`.

Garsui naudojami `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` ir `modalityBridgeAudioMaxClips`, taip pat bendri
`modalityBridgeCache*` nustatymai. Garsui netaikomas pasenusių raktų atsarginis variantas,
nes šie raktai buvo įvesti kartu su „Modality Bridge“ schema.

Vaizdui naudojami `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` ir
`modalityBridgeVideoTimeout`, taip pat bendri `modalityBridgeCache*` nustatymai.
Pagal numatytuosius nustatymus ši funkcija išjungta, nes FFmpeg/ffprobe yra pasirenkamosios
veikimo priklausomybės, o kadrų antraščių generavimas didina delsą ir modelio sąnaudas.

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
