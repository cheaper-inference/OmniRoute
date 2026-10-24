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

## Integruotos apsaugos

Importuojant registras automatiškai įkelia šešias apsaugas prioritetų tvarka
(žr. `registry.ts` → `registerDefaultGuardrails()`):

| Prioritetas | Pavadinimas         | Etapas(-ai)    | Failas                |
| ----------- | ------------------- | -------------- | --------------------- |
| `5`         | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`         | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`         | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`        | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`        | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`        | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Mažesni prioriteto numeriai vykdomi **pirmiausia**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

GLM 5.3 bazinis modelis ir `glm-5.3-{low,high,max}` turi aiškiai nurodytus
`supportsVision:false` registro / specifikacijos metaduomenis. GLM 5.3 Flash
variantai išlieka natyviai vaizdą palaikančiais modeliais. Claude Code
`/v1/messages` maršrutas patenka į bendrą `handleChat` prieš kvietimą vykdomų
apsaugų grandinę **prieš** konvertavimą iš Claude į OpenAI; įdėtieji `Read`
įrankio rezultatų vaizdai turi būti aprašyti arba apdoroti prieš šiam
konvertavimui perkeliant juos į OpenAI `image_url` turinį (#17069).

Perima užklausas su vaizdais, skirtas **modeliams be vaizdo palaikymo**, ir
arba peradresuoja visą užklausą vaizdą palaikančiam modeliui, arba prieš
kreipimąsi į išorinį tiekėją pakeičia vaizdų dalis tekstiniais aprašymais,
kuriuos generuoja konfigūruojamas vaizdo modelis. Tai leidžia tik tekstą
apdorojantiems tiekėjams skaidriai tvarkyti multimodalinius duomenis.

Eiga:

1. Praleisti, jei tikslinis modelis jau palaiko vaizdą (nebent jis įtrauktas į
   priverstinio tiltavimo sąrašą `isVisionBridgeForcedModel`).
2. Išskirti vaizdų dalis naudojant `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), kuris deleguoja **vieningajam medijos
   detektoriui** `detectMediaParts()` faile `open-sse/utils/mediaParts.ts` —
   vieninteliam tiesos šaltiniui, bendram su combo suderinamumo filtru.
   Išskyrimas apribotas leidžiamu formų sąrašu, kurias `replaceImageParts`
   gali įterpti atgal (išskyrimo↔pakeitimo sutartis): OpenAI `image_url`,
   Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`
   ir Responses API `input_image`. Atitinkantys vaizdai, įdėti Claude Code
   `tool_result.content` ir Responses įrankių išvestyse, taip pat išskiriami
   ir pakeičiami jų originaliuose keliuose; formos su vien tik indikatoriais
   yra combo filtro medžiaga ir neišskiriamos.
   Praleisti, jei nieko nerasta.
3. Vykdymo laiko konfigūracija gaunama per `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): pirmenybę turi nauji
   `modalityBridge*` nustatymų raktai; senieji `visionBridge*` raktai išlieka
   **vieno ciklo atsargine parinktimi** (grąžinimo langas). Kai tiltas
   išjungtas, praleisti dar prieš bet kokį medijos apėjimą.
4. Režimo parinkiklis (`modalityBridgeVisionMode`, žr. lentelę žemiau)
   nusprendžia tarp peradresavimo ir aprašymo. Peradresavimas grąžina
   `modifiedPayload`, kuriame pakeistas tik `model`, ir meta
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Aprašymo kelias: apriboti vaizdų skaičių iki `maxImages`, suformuoti pagal
   užduotį pritaikytą promptą, pasitikrinti aprašymų podėlį, iškviesti vaizdo
   modelį **lygiagrečiai** (`Promise.allSettled`) ir jų vietoje įterpti
   tekstines dalis `[Image N]: <description>`. Nepavykęs aprašymas grąžina
   `null`: neapdorotas vaizdas išsaugomas nežinomiems / vaizdą palaikantiems
   taikiniams (#4012), tačiau **patvirtintas tik tekstinis tiesioginis
   taikinys** arba combo be vaizdo palaikymo gauna aiškų tekstinį pakaitalą
   `(unavailable — no vision-capable provider connected)` kiekvienam
   neaprašytam vaizdui, įskaitant dalinius gedimus ir vaizdus, viršijančius
   aprašymų kvietimų ribą (#17069). Esamas atsarginis variantas, kai visi
   combo aprašymai nepavyksta, išlieka galioti (#8430).
6. Grąžinti `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Režimo parinkiklis (`modalityBridgeVisionMode`)

| Režimas    | Numatytoji | Elgsena                                                                                                                                                                                                                                                                                              |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔          | Senoji heuristika, nepaliesta (#6640/#7204): ne kombinuoti/`auto/` modeliai peradresuojami į geriausią regos modelį, nebent pradinis modelis jau turi tinkamus kredencialus (tuomet aprašoma); kombinuoti taikiniai visada aprašo.                                                                   |
| `describe` |            | Visada aprašyti — peradresavimo blokas visiškai praleidžiamas; vartotojo pasirinktas modelis visada atsako.                                                                                                                                                                                          |
| `reroute`  |            | Priverstinis peradresavimas: apeinama apsauga, išsauganti modelį su kredencialais. Peradresavimo **taikinio** kredencialų apsauga vis tiek galioja — kai nėra tinkamo regos taikinio, tiltas blokuoja aiškia klaida, užuot aprašęs arba siųsdamas neapdorotus vaizdus tik tekstui skirtam taikiniui. |

Priverstiniai režimai įsikiša **prieš** pradedant veikti automatinės heuristikai;
`auto` elgsena yra baitas į baitą identiška apsaugai, galiojusiai prieš PR-1.

#### API rakto apimtis (`visionBridgeKeyScope.ts`)

Kai skambintojo API raktas apriboja `allowedConnections`, kvotų telkinius
(`allowedQuotas`) ar modelius (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), tiltas parenka tik
tuos peradresavimo ir aprašymo modelius, kuriuos raktui leidžiama naudoti, ir
tik tas jungtis, kurias raktui leidžiama naudoti. Aprašymo užklausa tuomet
visada eina per OmniRoute savaiminę kilpą su `x-omniroute-self-loop-key-id`
antrašte, todėl gaunanti pokalbių užklausa vėl įgyvendina to rakto jungčių ir
modelių politiką. `enforceApiKeyPolicy()` pripažįsta šią antraštę tik kartu su
savaiminės kilpos bearer žetonu, todėl ji gali tik susiaurinti prieigą, o ID,
kuris nieko neatitinka, atmetamas.

Jei raktui neleidžiamas nė vienas regos modelis, **patvirtintas tik tekstui
skirtas taikinys** atmeta vaizdo užklausą lokaliai su aiškia HTTP 400 klaida,
užuot persiuntęs vaizdo baitus nepajėgiam aukštesnės grandies tiekėjui
(#17069). Taikiniams su nežinoma arba natyvia regos galimybe aprašymo kelias
išlaiko ankstesnę fail-open elgseną (meta `{ skipped: true, reason:
"no_permitted_vision_model" }`). Užklausos be rakto ir raktai be šių apribojimų
elgiasi visai taip pat kaip anksčiau.

#### Į užduotį orientuotas aprašymo raginimas (`modalityBridgeVisionTaskAware`)

Numatytoji reikšmė **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
prie bazinio aprašymo raginimo prideda **paskutinio vartotojo pranešimo**
tekstą (sutrumpintą iki 500 simbolių), nukreipdamas aprašymą link to, ko
vartotojas iš tikrųjų paklausė (codex-vision-proxy šablonas), ir prašydamas
regos modelio transkribuoti matomą tekstą. Kai vėliava išjungta — arba nėra
vartotojo teksto — bazinis raginimas naudojamas nepakeistas.

Pačios aprašymo savaiminės kilpos OpenAI suderinama užklausa
(`callVisionModelSingle()` faile `visionBridgeHelpers.ts`) visada prašo
`image_url.detail: "high"` — besąlygiškai, kiekvienam skambintojui/tiekėjui,
nepriklausomai nuo jokio kliento signalo. Mažo detalumo apdorojimas pablogina
OCR tikslumą būtent teksto transkribavimo užduočiai, kurios šis raginimas
prašo, todėl pati aprašymo užklausa visada prašo aukšto detalumo, nepaisant
to, kokį detalumo lygį naudojo pradinė įeinanti užklausa. Tai veikia tik
vidinės aprašymo užklausos turinį; tai nekeičia to, kaip OmniRoute persiunčia
skambintojo paties `image_url.detail` pirminėje užklausoje — ta numatytoji
reikšmė taikoma atskirai ir tik aptiktiems OpenCode klientams, funkcijoje
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`).
Anthropic perdavimo formato (wire-format) aprašymo savaiminės kilpos šaka
neturi `detail` lauko, todėl nė viena numatytoji reikšmė jai nedaro įtakos.

#### Aprašymo išvesties apribojimas (`modalityBridgeVisionMaxChars`)

| Raktas                         | Numatytoji | Diapazonas         |
| ------------------------------ | ---------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`        | `0` arba 100–50000 |

`0` (numatytoji) reiškia **jokio apribojimo** — aprašymas, kurį grąžina
`callVisionModel()`, perduodamas nepakeistas, išsaugant esamą elgseną. Bet
kuri reikšmė iš 100–50000 diapazono sutrumpina aprašymą pridėdama `…`
prievardį prieš jį įterpiant atgal kaip `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` faile `src/lib/guardrails/visionBridge.ts`).
Padidinkite šią reikšmę detalų reikalaujančioms OCR užduotims, kai tolesniam
(downstream) modeliui reikia visos transkripcijos; sumažinkite ją, kad
apribotumėte žetonių sunaudojimą plepiuose regos modeliuose. Valdymo skydo
laukas yra Vision skirtuko Advanced skydelyje (`modality-bridge-max-chars`
faile `ModalityBridgeVisionTab.tsx`) ir bet kurią reikšmę tarp 1 ir 99
prispaudžia iki 100 apatinės ribos, palikdamas aiškiai nurodytą `0` nepaliestą
— `0` yra savaime galiojanti Zod reikšmė
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), o ne vien
„nenustatyta" numatytoji reikšmė.

#### Aprašymo talpykla (`modalityBridge/bridgeCache.ts`)

Operatyviojoje atmintyje veikianti LRU + TTL talpykla aprašymo išvestims,
bendrinama visame procese. Raktas = `sha256(imageRef + composedPrompt +
configuredBridgeModel)` su ilgio prefikso kadruote (jokių laukų ribų kolizijų).
Modelio komponentas yra **sukonfigūruotas** tilto modelis, o ne modelis, kuris
iš tikrųjų atsakė — `callVisionModel` gali viduje pereiti prie atsarginio
varianto, o rakto formavimas pagal kiekvieną bandymą suskaidytų talpyklą.
Nepavykę aprašymai niekada netalpinami talpykloje. Nustatymai:

| Raktas                          | Numatytoji | Diapazonas |
| ------------------------------- | ---------- | ---------- |
| `modalityBridgeCacheEnabled`    | `true`     | —          |
| `modalityBridgeCacheTtlMinutes` | `60`       | 1–1440     |
| `modalityBridgeCacheMaxEntries` | `200`      | 10–5000    |

#### Nuotolinio paveikslėlio normalizavimas (describe/base64 gavimas per vidinę kilpą)

Kai tiltas pats gauna **nuotolinį** paveikslėlį — tai Anthropic describe vidinis iškvietimas ir claude-wire formato base64 konvertavimas (`ensureBase64ImagesForClaudeWire`), abu per `fetchRemoteImageAsDataUri()` faile `visionBridgeHelpers.ts` — gautas duomenų URI prieš įterpiant į regos modelio užklausą praleidžiamas per `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`). Per dideli paveikslėliai sumažinami iki **2048 px ilgiausios kraštinės** (tai atitinka dydžio ribą, kurią OpenAI/Anthropic jau taiko serverio pusėje), todėl sumažėja įkeliamų baitų skaičius ir delsa, o tai, ką mato regos modelis, nepasikeičia. Dydžio keitimui naudojama `sharp`, įkeliama dinaminiu importu: platformoje, kurioje jos natyviojo dvejetainio failo nepavyksta įkelti, `normalizeDataUri()` **niekada neišmeta klaidos** — ji grįžta prie originalių baitų praleidimo (passthrough), todėl describe/base64 konvertavimo kelias visada ir toliau veikia. Ne paveikslėlio baitai (gavimas, kuris negrąžino dekoduojamo paveikslėlio) taip pat praleidžiami nepakeisti. Šis normalizavimas apima tik tuos paveikslėlius, kuriuos tiltas gauna savo vidiniam iškvietimui — jis niekada netaikomas kvietėjo neapdorotai praleidžiamai naudingajai apkrovai, laikantis tik pagal sutikimą (opt-in) taikomo modifikavimo principo (griežtoji taisyklė Nr. 20).

#### Nustatymų schema + migracija

Naujieji `modalityBridge*` raktai validuojami Zod pagalba `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, `modalityBridgeCache*` trejetas ir `modalityBridgeAudio*` grupė, kurią naudoja Audio Bridge. Migracija `141_modality_bridge_settings.sql` nukopijuoja esamas senąsias `visionBridge*` reikšmes į atitinkamus naujuosius raktus (idempotentiška, niekada neperrašo operatoriaus nustatytos `modalityBridge*` reikšmės); senieji raktai dar vieną leidimo ciklą išlieka priimami kaip skaitymo atsarginis variantas.

#### Skaidrumo antraštė + statistika

Describe transformuotuose atsakuose pateikiama
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
antraštė (ją sukuria `buildModalityBridgeHeader()` faile `modalityBridge/bridgeStats.ts`, prideda `withModalityBridgeHeader()` faile `src/sse/handlers/chatHelpers.ts`). Peradresuotos užklausos antraštės **negauna** — naudingoji apkrova nebuvo keista, o modelio pakeitimas jau matomas atsakymo turinio `model` lauke.

`GET /api/modality-bridge/stats` (valdymo autentifikavimas, tas pats lygmuo kaip `GET /api/settings`) grąžina atmintyje laikomus skaitiklius pagal modalumą
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` — skirtus `vision`, `audio` ir
`video`. `averageLatencyMs` kaip vardiklį naudoja `latencySamples`, o ne visas pastangas; operacija be laiko matavimo nesukuria nulio milisekundžių imties. `bridged` išlieka atgal suderinamu pseudonimu sėkmingoms konversijoms; nepavykusios pastangos jo nedidina. Skaitikliai paleidus procesą iš naujo nusinulina pagal dizainą (tai telemetrija, ne apskaita).

#### Prietaisų skydelio konfigūracija

Specialusis prietaisų skydelio puslapis yra
`/dashboard/settings/modality-bridge`. Jo per URL adresuojami `Vision`, `Audio` ir
`Video` skirtukai, perjungdami `tab` reikšmę, išsaugo užklausos parametrus.
`Vision` skirtuke atskleidžiamas įjungimas, režimas, modelio pasirinkimas (įskaitant automatinę numatytąją reikšmę), užduotį įvertinantys raginimai, išplėstiniai skirtųjų laiko / paveikslėlių / aprašymo ilgio / talpyklos apribojimai, vykdymo laiko
skaitikliai ir apsaugota pavyzdinė užklausa. `Audio` skirtukas taip pat veikia: jame atskleidžiamas įjungimas, tik STT modelių parinkiklis su Auto, skirtųjų laiko / maksimalaus įrašo apribojimai, garso
skaitikliai ir `input_audio` pavyzdinis testas. `Video` skirtukas yra funkcionalus: jis rodo
FFmpeg/ffprobe vykdymo aplinkos būseną — vieną iš keturių aiškių UI būsenų (`unknown`, kol tikrinimas dar vyksta arba negalėjo būti užbaigtas, `restricted` ne loopback prietaisų skydelio mazge, kur tikrinimas praleidžiamas kliento pusėje, `unavailable`, kai patikrinta ir patvirtinta, kad jų trūksta, arba `available` su FFmpeg/ffprobe versijomis) — išsaugo
įjungimo / modelio / kadrų / vaizdo įrašo / skirtųjų laiko apribojimus, filtruoja modelių parinkiklį iki regą palaikančių
modelių ir atskleidžia vaizdo įrašų skaitiklius.

Buvusi Vision Bridge kortelė DI nustatymuose yra suderinamumo nuoroda į
naująjį puslapį; ji nebeturi antros formos kopijos. Media Providers taip pat
sieja Image-to-Text ir Speech-to-Text darbo eigas su atitinkamais Modality
Bridge skirtukais, nepašalindama esamos Speech-to-Text bandomosios aikštelės (playground).

**Vidinės kilpos priėmimo apeinimas:** kai describe užklausa nukreipiama per paties OmniRoute
`/v1` vidinę kilpą (nestandartinis tiekėjo modelis), antrinė užklausa siunčia
`x-omniroute-admission-bypass: internal` ir autentifikuojama išspręstu vidinės kilpos
kredentialu — vietiniu `sk_omniroute` žymekliu (sentinel) vietiniu režimu arba
operatoriaus sukonfigūruotu `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` aplinkos raktu (#1350), kad
diegimai su `REQUIRE_API_KEY=true` vis tiek galėtų vykdyti describe užklausą. Apeinimas
pripažįstamas tik šiems tiksliems kredentialams, todėl išoriniai klientai negali
naudoti antraštės priėmimui praleisti.

Senosios numatytosios reikšmės saugomos `src/shared/constants/visionBridgeDefaults.ts`;
naujosios režimo / užduotį įvertinančių / talpyklos numatytosios reikšmės ir
nustatymų resolver saugomi
`src/shared/constants/modalityBridgeDefaults.ts`. Apsauginis ribotuvas (guardrail) atskleidžia
`deps` konstruktoriaus parinktį, kad testai galėtų įterpti netikras `getSettings` ir
`callVisionModel` realizacijas.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Perima garsą turinčias pokalbių (chat) užklausas prieš joms pasiekiant tikslą, apie kurį
nežinoma, kad jis priima garso įvestį. Jis niekada neperadresuoja pokalbių
užklausos: garso dalys transkribuojamos per esamą su OpenAI suderinamą multipart
galinį tašką, o pasirinktas pokalbių modelis tęsia darbą su tekstinėmis transkripcijomis.

Eiga:

1. `supportsAudio` nustatoma per `getResolvedModelCapabilities()`. Pirmenybė
   teikiama aiškiems teikėjo registro metaduomenims, tada statiniams modelio
   metaduomenims, tada sinchronizuotiems `modalities_input`. Deklaruotas įvesčių
   sąrašas be `audio` reiškia `false`; jei gebėjimų įrodymų nėra, lieka `null`.
   Tiek `false`, tiek `null` aktyvuoja konservatyvųjį tiltą, o `true` jį aplenkia.
2. Nustatomi `modalityBridgeAudio*` nustatymai ir iš kiekvienos žinutės bendruoju
   `detectMediaParts()` detektoriumi išskiriamos iškerpamos aukščiausio lygio
   garso dalys. Palaikomos perdavimo formos: OpenAI `input_audio`, `audio_url` ir
   `source.media_type: "audio/*"`. Įdėtasis garsas aptinkamas maršrutizavimui,
   bet iškėlimo (splice) kelias jo nepašalina. Darbo apimtį riboja
   `modalityBridgeAudioMaxClips`; vėlesnės dalys lieka nepaliestos.
3. Silaikoma sukonfigūruoto `provider/model`, arba `selectAudioBridgeModel()`
   pereina `AUDIO_TRANSCRIPTION_PROVIDERS` stabilia katalogo tvarka ir parenka
   pirmą modelį, turintį tinkamą aktyvų teikėjo kredencialą.
4. `callAudioTranscription()` konvertuoja base64/data-URI garsą į daugiadalį
   (multipart) `file` arba atsisiunčia nuotolinį `audio_url` per tik viešųjų
   adresų išeinančių užklausų apsaugą su DNS fiksavimu ir 25 MB riba. Tada failas
   ir pasirinktas modelis siunčiami POST užklausa į vietinę
   `/v1/audio/transcriptions` savitarnos kilpą, autentifikuojant su
   `resolveSelfLoopBearer()`. Esamas transkripcijos maršrutas atlieka įprastą
   kredencialų paiešką, cooldown / užklausų dažnio apribojimo tvarkymą ir
   paskirstymą teikėjams.
5. Sėkmingi iškvietimai pakeičia atitinkamas dalis į `[Audio N]: <transcript>`.
   Iškviestys vykdomi su `Promise.allSettled`: atskira nesėkmė išsaugo tą pradinę
   garso dalį (#4012 sutartis). Jei visi iškvietimai nepavyksta ir tikslui
   įrodytai galioja `supportsAudio === false`, dalys pakeičiamos į
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 sutartis).
   Nežinomo tikslo (`null`) atveju visiškas nesėkmių rezultatas lieka nepaliestas.
   Įrodytas tik tekstą palaikantis tikslas, neturintis tinkamo STT kredencialo,
   gauna tą patį aiškų užpildą (stub) neišsiunčiant jokios tinklo užklausos.

Sėkmingos transkripcijos naudoja viso proceso Modalumų tilto LRU/TTL talpyklą.
Raktą sudaro garso nuoroda, stabili `audio-transcription` operacijos žyma ir
pasirinktas STT modelis; nesėkmės niekada netalpinamos talpykloje. Garso bandymai
atnaujina bendruosius `bridged`, `cacheHits`, `failures` ir `lastUsedAt`
skaitiklius. Transformuotuose atsakuose pateikiama
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nepaliestos
užklausos Garso tilto segmento negauna.

Vykdymo meto nustatymai saugomi duomenų bazėje ir tikrinami su Zod:

| Raktas                        | Numatytoji reikšmė | Intervalas              |
| ----------------------------- | ------------------ | ----------------------- |
| `modalityBridgeAudioEnabled`  | `true`             | —                       |
| `modalityBridgeAudioModel`    | `""`               | Automatinis arba STT ID |
| `modalityBridgeAudioTimeout`  | `60000`            | 1000–300000             |
| `modalityBridgeAudioMaxClips` | `3`                | 1–10                    |

Bendrąją talpyklą ir toliau valdo `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` ir `modalityBridgeCacheMaxEntries`.

### Vaizdo tiltas (`videoBridge.ts`, `videoBridgePipeline.ts`)

Perima aukščiausio lygio vaizdo dalis Chat Completions `messages` ir Responses
API `input`, prieš iškviečiant tikslą, kuriam nėra žinomo integruoto vaizdo
palaikymo. Palaikomos formos: `input_video`, `video_url`, `video_source`, HTTPS
URL ir `data:video/*;base64,...` duomenų URI. Paprasti failų pavadinimai tekste
nelaikomi vaizdo įrašais.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) atsakinga už užklausos perėjimą,
gebėjimų / politikos patikrą, užklausos lygio agregavimą ir atsako naudingąją
apkrovą. Vieno vaizdo įrašo darbas — gavimas, viso rezultato talpykla, kadro
sekos aprašymas (sujungiantis bet kurią kvietėjo pateiktą garso transkripciją)
ir kiekvieno bandymo metrika / nutraukimas / valymas — paslėptas už
`processVideoPart` modulyje `videoBridgePipeline.ts`, iškviečiamo po kartą
kiekvienai vaizdo daliai `preCall` cikle. Tas modulis taip pat apibrėžia aiškias
portų ribas: `VideoMediaBrokerPort` (baitų gavimas ir imčių kadrų išskyrimas),
`VideoAudioTranscriptionPort` (kvietėjo pateiktos garso transkripcijos sujungimas
su imčių kadrų antraštėmis) ir `VideoDrilldownPort` (kadrų detalizavimo
išsaugojimo riba; dar neprijungta prie `processVideoPart` — šiandien detalizavimo
įrašus rašo tik atskiras `/api/modality-bridge/video/drilldown` maršrutas).

Viešasis `/v1` užklausų kelias niekada neimportuoja ir nekviečia subproceso.
Nuotoliniai vaizdo įrašai atsisiunčiami laikantis 50 MiB ribos; įterptiesiems
base64 vaizdo įrašams taikoma konservatyvi 36 MiB dekoduoto dydžio riba vienam
vaizdo įrašui, kad modelio / žinučių / struktūrinis vokas tilptų į viešojo JSON
užklausos priėmimo limitą — 50 MiB. Įterpto ilgio ir dekoduoto dydžio įvertiniai
tikrinami prieš priskiriant atmintį. HTTPS privalomas pradiniam nuotoliniam URL
ir kiekvienam peradresavimui, naudojant esamą tik viešųjų adresų išeinančių
užklausų apsaugą su DNS fiksavimu. Tada baitai kerta tikslią vidinę
`POST /api/modality-bridge/video/extract` brokerio ribą. Tas maršrutas yra ir
`LOCAL_ONLY`, ir `SPAWN_CAPABLE`, priima tik proceso lygmeniu autentifikuotą,
patikimą loopback užklausą ir niekada nepriima URL, failų sistemos kelio,
vykdomojo failo ar argumentų sąrašo. API kūno dydžio apdorojimo grandinė ir
apdorotojo inkrementinis kūno skaitytuvas nepriklausomai vienas nuo kito
užtikrina 50 MiB brokerio įvesties ribą. Jo apribotoji eilė vienu metu vykdo
vieną išskyrimą, leidžia keturias laukiančias užduotis ir riboja laukiančią
įvestį iki 100 MiB.

Tarpininko viduje `ffprobe` skaito privatų vietinį failą; fiksuotas leidžiamųjų
formatų sąrašas neapima grojaraščių ir manifestų formatų. Leidžiamuose MOV šeimos
konteineriuose išorinės MOV duomenų nuorodos pagal numatytuosius nustatymus lieka
išjungtos, o fiksuota komanda jų neįjungia. Ir `ffprobe`, ir `ffmpeg` naudoja tik
`file` protokolą leidžiantį sąrašą, vieną giją, fiksuotus argumentų masyvus, jokio
apvalkalo, o vykdomieji failai nustatomi pagal `PATH`. Pridėto paveikslėlio viršelio
srautai nelaikomi tinkamais atkurti kandidatais. Visi atkuriami srautai turi atitikti
ribas, o aiškiai nurodytam numatytajam srautui teikiama pirmenybė prieš deterministinį
atsarginį mažiausio indekso pasirinkimą. Vaizdo įrašų trukmė ribojama iki 600
sekundžių, kiekvienas matmuo – iki 8 192 pikselių, o šaltinio pikselių skaičius –
iki 33 554 432. FFmpeg paima 1–16 vidurio taško JPEG kadrų, sumažina ilgąją kraštinę
iki ne daugiau kaip 1 024 pikselių nedidindama mažesnių pradinių vaizdų ir niekada
negauna URL. Pagal numatytuosius nustatymus atranka yra `uniform`. Pasirenkamos
`scene_aware` ir eksperimentinė `segment_aware` strategijos atlieka vieną papildomą
fiksuotą FFmpeg apdorojimą jau patikrintame vietiniame sraute, pasirenka apribotas
`showinfo` scenų laiko žymas ir deterministiškai grįžta prie tų pačių tolygių
vidurio taškų, jei detektorius sugenda, baigiasi skirtasis laikas, išvestis yra
netinkamo formato arba kandidatų rinkinys yra tuščias. Segmentus vertinantis režimas
vidurio taškų pavyzdžius paskirsto proporcingai patikrintiems scenų intervalams;
segmentus vertinantys duomenys ir atsarginio pasirinkimo elgsena išsamiai aprašyti
toliau. Griežta 16 kadrų riba visose strategijose taikoma po atrankos. Kai scenas
vertinančiai užklausai skirtas tik vieno kadro limitas, naudojamas tolygios atrankos
aktyvaus viso vaizdo įrašo arba fokuso lango vidurio taškas ir pateikiama
`policyEffective: uniform`: vienas pasirinktas scenos kadras negali išsaugoti abiejų
laiko intervalo galų. Iškvietėjas gali pasirinktinai pateikti baigtinį fokuso langą
(`start`/`end` sekundėmis); ribos apribojamos iki medijos trukmės, sukeisti arba
nebaigtiniai langai atmetami, o visos atrankos strategijos vykdomos tik normalizuotame
intervale. Gautas langas įtraukiamas į atrankos metaduomenis ir nepatikimo aprašo
prefiksą, kad tolesni modeliai galėtų atskirti fokusuotą ištrauką nuo visos laiko
juostos.

Semantinis aprašo fokusas yra atskiras, aiškiai nurodomas nustatymas. Numatytasis
`full` analizės režimas išsaugo esamą kadro užklausą ir niekada neperduoda užklausos
teksto aprašo modeliui. Veikiant `focused` režimu, tiltas nuskaito tik naujausią
netuščią naudotojo sukurtą `text`/`input_text` iš to paties „Chat“ arba „Responses“
konteinerio, normalizuoja jį į NFC, sutraukia valdymo simbolius bei tarpelius ir
apriboja iki 500 „Unicode“ kodų taškų. Jei rezultatas tuščias, grįžtama prie tikslios
`full` užklausos. Tinkama užuomina serializuojama kaip JSON atskirame nepatikimo
naudotojo konteksto bloke ir gali tik nustatyti stebimų detalių prioritetą; ji negali
panaikinti atskiro įspėjimo nevykdyti medijoje matomų ar girdimų nurodymų. Tekstinis
fokusas niekada nenustato `start`/`end` ir nekeičia laikinės atrankos mechanizmo.

#### FU-07 struktūriniai segmentų duomenys

`segment_aware` atlieka vieną apribotą išankstinės analizės apdorojimą jau patikrintame
vietiniame vaizdo sraute. Fiksuota filtrų grandinė pirmiausia sumažina plotį iki ne
daugiau kaip 320 pikselių, aptinka scenų pasikeitimus bei sustingusio vaizdo intervalus,
o tada, naudodama 1 kadrą per sekundę, įvertina suliejimą, vidutinį skaisčio lygį ir
erdvinę bei laikinę informaciją. Apdorojimas apribotas iki 600 struktūrinių pavyzdžių,
vienos FFmpeg / filtro gijos, tų pačių tik `file` protokolą ir konteinerius leidžiančių
sąrašų, 1 MiB proceso išvesties ribos ir ne daugiau kaip 30 sekundžių, atsižvelgiant į
bendrą tarpininko nutraukimą / galutinį terminą. Jis niekada nepriima komandos, filtro,
kelio ar URL iš užklausos.

Struktūrinės reikšmės yra deterministiniai atrankos duomenys, o ne semantinis vaizdo
įrašo supratimas. Pagal jas nenustatomi subjektai, veiksmai, antraštės, kalba ar
naudotojo ketinimai. Scenų ir sustingusio vaizdo ribos sudaro segmentus; sustingusio
vaizdo aprėptis, suliejimas, ekspozicija, erdvinis detalumas ir laikiniai pokyčiai tik
daro įtaką tam, kaip paskirstomas esamas 1–16 kadrų limitas. Visiškai sustingusiam
segmentui skiriamas ne daugiau kaip vienas kadras, o nesustingę segmentai konkuruoja
dėl likusio limito. Kai ribų yra daugiau nei kadrų, išlaikoma tolygi laiko juostos
aprėptis, kad greiti ankstyvieji montažo perėjimai negalėtų paslėpti ilgo baigiamojo
segmento. Scenų ribos, esančios 1 sekundės analizės skiriamosios gebos atstumu nuo
sustingusio vaizdo ribos, sujungiamos.

Jei trūksta filtrų, duomenys yra netinkamo formato ar tušti, įvyksta detektoriaus
klaida arba baigiasi apribotos išankstinės analizės laikas, grįžtama prie tikslios
tolygios vidurio taškų strategijos. Iškvietėjo inicijuotas nutraukimas arba tarpininko
galutinis terminas tokio atsarginio perėjimo nesukelia: vykdomas antrinis procesas
nutraukiamas, vėlesnis kadrų išgavimas neleidžiamas, o privatus laikinasis medis
pašalinamas bloke `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuoja deterministinius tikrus FFmpeg
bandymų duomenis, skirtus įvertinti aprašo modelio iškvietimų sumažėjimą pašalinus
dublikatus, tankaus judesio limito paskirstymą, suliejimo / ekspozicijos / SI-TI
duomenis, greitus montažo perėjimus su ilga pabaiga ir klaidingai teigiamus laipsniško
užtemimo rezultatus. Jis registruoja išankstinės analizės vykdymo laiką ir, kai
pasiekiamas `/usr/bin/time`, antrinio proceso CPU naudojimą bei didžiausią RSS. Jo
kokybės patikros yra tik struktūriniai orakulai. Tikro aprašo modelio kokybės būsena
lieka `HOLD`, nes ši testavimo sistema neturi autorizuoto galinio taško ar užfiksuoto
vertintojo. Piniginio sutaupymo būsena taip pat lieka `HOLD`, nebent
`--caption-cost-per-call-usd` pateikia aiškų teigiamą vieno iškvietimo kainos įvertį;
scenarijus niekada neišgalvoja nė vieno iš šių rezultatų.

Kiekvienas kadras ribojamas iki 4 MiB, visi neapdoroti kadrai kartu — iki 23 MiB, o
serializuotas brokerio atsakymas — iki 32 MiB. Privatus laikinas katalogas
pašalinamas `finally` bloke. OmniRoute neįtraukia FFmpeg ir nepriima pasirinktinio
vykdomojo failo kelio. Prieš antraščių generavimą tiltas taiko konservatyvų vaizdinės
dedublikacijos etapą: kiekvienas JPEG sumažinamas iki 16×16 pilkų atspalvių buferio ir
lyginamas tik su paskutiniu išsaugotu kadru. Kai prašomas antraščių biudžetas
viršija vieną kadrą, išgavimas pateikia apribotą kandidatų rinkinį — iki dvigubo to
biudžeto dydžio ir niekada ne daugiau kaip 16 kadrų. Prašoma riba taikoma tik po
dedublikacijos, o galutinio retinimo metu, kai biudžetas yra bent du, išsaugomi
pirmasis ir paskutinysis pasirinkti kandidatai. Versijuota
`grayscale-16x16-mean-cells-v2` politika naudoja didesnę iš dviejų reikšmių: vidutinį
ryškumo (luma) skirtumą arba miniatiūros langelių, kurių normalizuotas skirtumas yra
bent 0.05, santykį. Dublikato slenkstis yra konstanta 0.04, pasirinkta dėl
nuspėjamumo, o ne atvira kaip vykdymo laiko parametras. Šis antrinis didelio kontrasto
signalas išsaugo nedidelį judesį ir matomo teksto pokyčius, kuriuos gali paslėpti vien
vidurkių palyginimas. Palyginimo arba dekoderio klaidos veikia atviro gedimo (fail
open) principu ir išlaiko aprėptį. Išvesties metaduomenys atskiria išgautus
kandidatus, sėkmingai panaudotus kadrus ir atmestus vaizdinius dublikatus.

Aiškiai pažymėta vaizdo įrašo dalis gali prašyti kontaktinio lapo su laiko žymomis.
Tiltas sukuria ne daugiau kaip 4 stulpelių, 16 kadrų JPEG tinklelį. Kiekviename
512 pikselių langelyje šaltinio laiko žyma įdegama į didelio kontrasto apatinę juostą,
o tos pačios laiko žymos lieka tekstiniuose metaduomenyse tolesniam susiejimui ir
auditui. Pilnas JPEG failas lieka apribotas iki 32 MiB. Jei `sharp` negali iškoduoti
arba sudaryti tinklelio, tiltas grįžta prie atskirų JPEG kadrų; kliento nutraukimas vis
tie perduodamas per lapo operaciją.

Išleidimo (promotion) įrodymai sąmoningai atskirti nuo sintetinio komponavimo
mikrotesto. `scripts/perf/video-bridge-contact-sheet-eval.ts` apibrėžia schemos
versiją turinčią A/B testavimo aplinką realiems su OpenAI suderinamiems vaizdo
modeliams. Ji matuoja teikėjo praneštus tokenus, viso proceso vėlinimą realiuoju
(wall-clock) laiku (įskaitant lapo komponavimą), modelio iškvietimų skaičių ir
manifeste apibrėžtą faktų išlaikymą. Neapdoroti modelio atsakymai į ataskaitą
nerašomi; išsaugomi tik SHA-256 kontroliniai kodai ir atitikę faktų ID. Testavimo
aplinka neatlieka jokių tinklo ar mokamų modelio iškvietimų, nebent perduodamas
`--execute-real` ir sukonfigūruojami `--model`, `OMNIROUTE_BASE_URL` bei
`OMNIROUTE_API_KEY`. Be šio aiškaus realaus vykdymo jos mašinai skaitomas verdiktas
lieka `HOLD`; vien sintetiniai naudingosios apkrovos / iškvietimų skaičiaus matavimai
nėra išleidimo įrodymai.

Iškvietėjai gali pridėti neprivalomą `transcript.cues` masyvą prie palaikomos vaizdo
įrašo dalies, kai jau turi sulygiuotą tekstą. Kiekvienas įrašas (cue) turi turėti
`text`, baigtinį `start`/`end` intervalą nustatytos trukmės ribose ir leidžiamų
reikšmių sąraše esantį `source` (`client`, `embedded` arba `audio-bridge`);
`confidence` pagal numatymą yra `1` ir turi likti tarp `0` ir `1`. Tikslūs
pasikartojantys įrašai sujungiami. OmniRoute niekada nepradeda transkripcijos iš šių
metaduomenų: patvirtinti įrašai nukopijuojami į aprašytą rezultatą su šaltiniu,
pasitikėjimu ir intervalu ir pateikiami kaip nepatikimi stebėjimai šalia kadrų
antraščių. Neteisingas, už ribų esantis arba be kilmės nurodymo tekstas atmetamas, o
ne maišomas į antraščių srautą. Abu užklausos turinio transkripcijos kanalai
normalizuoja pateiktą kilmę į `client`, įskaitant paties kliento deklaruotas
`embedded` arba `audio-bridge` etiketes. Tik serverio valdomas adapteris gali priskirti
tas patikimas etiketes per tik kode pasiekiamą `trustedSource` argumentą; užklausos
JSON laukas negali pasiekti to argumento. Transkripcijos tekstas lieka nepatikimu iš
medijos gautu turiniu, nepriklausomai nuo jo kilmės, ir niekada negali lemti
autorizavimo.

Pažangus iškvietėjas gali pateikti `audioTranscript` takelį tam pačiam vaizdo įrašui;
jis traktuojamas kaip kliento pateiktas tekstas, o ne serverio transkripcijos
įrodymas. Sujungimo sandūra vykdo vaizdinius ir garso stebėjimus pagal vieną laiko
limitą ir nutraukimo signalą, išdėsto juos bendroje laiko juostoje, sujungia tikslius
dublikatus ir pateikia dalinį rezultatą, kai pavyksta tik viena pusė. Neteisingas
`audioTranscript` degraduoja į tokį dalinį rezultatą — vaizdinis aprašymas išsaugomas,
o garso šaka užfiksuoja išvalytą gedimo kodą — užuot sugadinus visą vaizdo įrašą.
Kiekvienos šakos prieinamumas, dalinio rezultato vėliava ir išvalyti gedimo kodai
išsaugomi aprašytame rezultate, saugiklių metaduomenyse (`audioFusionRuns`/
`audioFusionPartials`/`audioFusionFailureCodes`), rezultatų talpyklos metaduomenyse ir
tilto sujungimo skaitikliuose. Numatytasis Video Bridge kelias neiškviečia kalbos į
tekstą konvertavimo ir neatsisiunčia antros medijos kopijos; be šio aiškiai nurodyto
takelio jis lieka skirtas tik vaizdui.

**Transkripcijos saugojimas (#12150 P1).** Tai taikoma automatiškai kaskart, kai vaizdo tiltas (Video Bridge, kuris pats įjungiamas pasirinktinai) atvaizduoja transkripcijos žymą (cue) — atskiros saugojimo vėliavėlės nėra. Kai užklausa atvaizduoja bet kurią transkripcijos žymą (kviečiančiojo deklaruotą `transcript` arba sujungtą `audioTranscript`), apsaugos mechanizmas ją pažymi `videoBridgeObserved` ir sukuria užmaskuotą vaizdo aprašo šešėlį — identišką atvaizdavimą, kuriame kiekvienos žymos laisvo teksto dalis pakeičiama į `[redacted-video-transcript]`, sukurtą pakeičiant struktūrinį žymos lauką prieš surandant eilutę (niekada neanalizuojant suplokštinto teksto, todėl joks žymos turinys — kenkėjiškas ar įprastas, įskaitant dalis, kuriose yra `]`, pavyzdžiui, `[inaudible]`/`[music]` — negali išlikti). Išsaugotame skambučių žurnalo užklausos tekste kiekviena iš vaizdo gauta teksto dalis pakeičiama tuo užmaskuotu šešėliu, atitikimu pagal turinio lygybę; `fullText` inkaras iš naujo nuskaitomas iš baigtos prieš skambutį esančios apsaugos mechanizmo naudingosios apkrovos, todėl atitikimas vis tiek pavyksta net tada, kai vėlesni grandinės apsaugos mechanizmai (PII ir kredencialų maskuotojai, prioritetai 10/95) perrašo aprašo tekstą vietoje ir kai sistemos raginimo / perdavimo (handoff) / atminties injekcija pertvarko pranešimų masyvą. Modeliui aukštyn siunčiamas tekstas nepakeičiamas. Stebima užklausa taip pat nieko neįrašo į ilgalaikę atmintį (Memory) (praleidžiamas ir iš užklausos, ir iš atsakymo gautas išgavimas), todėl paties modelio atsakymas negali atkartoti transkripcijos teksto į Memory.

**Neapdoroti vaizdo laukai (#12430).** Kai tiltas įjungtas, o vietinis vaizdo palaikymas nežinomas arba jo nėra, apibrėžti `transcript`/`audioTranscript` laukai taip pat aktyvuoja `videoBridgeObserved`, net po aprašymo nesėkmės ar pasiekus `maxVideos` ribą. `null` ir tuščios eilutės laikomos galiojančiomis; neesami laukai ir ne vaizdo metaduomenys — ne. Išsaugotos kopijos užmaskuoja šiuos laukus arba visai praleidžia užklausą, o podėliai ir Memory apeinami.

Tose atsarginiuose (fallback) keliuose galiojančios kviečiančiojo žymos tampa palaikomomis `text`/`input_text` dalimis, o ne nestandartiniais tiekėjo laukais. Abu užklausoje pateikti takeliai išlieka nepatikimais `client` stebėjimais su aiškiu įspėjimu, kad vaizdas nebuvo aprašytas, o laiko žymos nebuvo patikrintos pagal mediją. Esamos 256 žymų / 64 KiB bendrosios ir vienai žymos skirtos kvotos taikomos abiem takeliams kartu; laiko žymos turi tilpti į brokerio 600 sekundžių lubas ir bet kurį pateiktą fokusavimo langą. Neteisingi takeliai atmetami, o ne perduodami kaip savavališkas tekstas; galiojantis gretimas takelis vis tiek gali būti naudojamas, nebent viršijama jų bendra kvota. Null/tušti laukai neprideda teksto. Šis atsarginis variantas neprideda jokio medijos atsiuntimo ar transkribavimo. Transkripcijos plėtinio laukai pašalinami iš atsarginio vaizdo nešiklio ir jo `video_url`/`source` objektų. OpenAI perdavimo (wire) leidžiamųjų sąrašas išlieka griežtas; nežinomo vietinio palaikymo vaizdo nešikliai išlieka prieinami, o žinomi tik tekstui skirti tikslai išsaugo saugius žymeklius. Struktūriniai užmaskavimo šešėliai apsaugo pridėtą transkripcijos tekstą, o pradinė, kviečiančiajam priklausanti užklausa lieka nepakeista. Tikslai su vietiniu palaikymu ir išjungti tiltai išsaugo esamą aplinkkelio (bypass) elgseną.

Papildomos išsaugotos kopijos naudoja tą patį stebimos užklausos signalą. Neapdorotoje prieš apsaugos mechanizmą padarytoje kliento užklausos momentinėje kopijoje, operatyviojoje atmintyje esančioje laukiančioje užklausoje ir ankstyvame atmestų užklausų žurnale transkripcijos laukai vaizdo dalyse struktūriškai pakeičiami; eilučių raginimai, sintetizuoti vamzdyno etapų ir konteksto perdavimo metu, užmaskuojami išsaugomo užklausos teksto priėmimo vietoje (sink). Išsaugotas `video_content_removed` žymeklis verčia `previous_response_id` tęsinį saugiai nepavykti (fail closed), užuot rekonstravus tekstą, kuris buvo sąmoningai atmestas. Jei stebima užklausa prieš žurnalavimą praranda savo kiekvienai daliai skirtą užmaskavimo šešėlį arba net vienas iš kelių vaizdo šešėlių neatitinka po vėlesnių užklausos pakeitimų, išsaugomas užklausos tekstas visai praleidžiamas, užuot išlaikius iš dalies užmaskuotą transkripciją.

Stebimos užklausos atveju modelio atsakymas gali cituoti bet kurią transkripcijos dalį be struktūrinės žymos ribos. Todėl jo išsaugotas skambučių žurnalo `responseBody` pakeičiamas praleidimo žymekliu; detalus vamzdyno artefaktas (kuris gali apimti upstream/client tekstus ir srauto gabalus) neišsaugomas. Semantiniai, idempotentiškumo ir samprotavimo atkartojimo (reasoning-replay) podėliai tai užklausai apeina ir skaitymus, ir rašymus. Tiekėjo užklausa ir klientui matomas atsakymas lieka nepakeisti. Ankstyvieji keepalive baitai ištuštinami iš laikinojo buferio, kai detalus artefaktas praleidžiamas. Kiro sugedusio EventStream įspėjime nurodomas tik naudingosios apkrovos baitų skaičius, niekada — jos turinys ar neapdorota JSON analizatoriaus klaida. Tai neteigia, kad kiekviena nesusijusi tiekėjo/įskiepio diagnostika buvo audituota; platesnė išsaugomų priėmimo vietų peržiūra stebima #11658.

Vidinis `/api/modality-bridge/video/drilldown` gyvavimo ciklas yra atskira, loopback/token autentifikuota podėlio infrastruktūra. Kiekviena operacija taip pat reikalauja kanoninio nepermatomo (opaque) subjekto (principal) ID. Prieš įjungiant gamybinį kviečiantįjį, jis turi išvesti tą ID iš autentifikuoto nuomininko (tenant) ir niekada neturi perduoti kliento pasirinktos reikšmės. Podėlio raktai susieja tą subjektą su kanoniniais seanso ir vaizdo nuorodos ID, saugo tik jų SHA-256 išvestus raktus ir apriboja bei skaitymus, ir trynimą tuo pačiu subjektu. Podėlis saugo ne daugiau kaip 16 išvestų JPEG kadrų vienam įrašui, jų galiojimas baigiasi po dešimties minučių, ir palaiko apribotus `start`/`end` skaitymus arba aiškų seanso trynimą.

Kiekvienas subjektas ribojamas iki 16 įrašų ir 64 MiB kanoninių JPEG duomenų. Šios ribos nepriklausomos nuo visuotinių 64 įrašų / 256 MiB lubų: subjekto kvotos spaudimas išstumia tik to subjekto seniausiai naudotus (LRU) įrašus prieš svarstant visuotinį LRU išstūmimą. Pasibaigus galiojimui, įrašai iššluojami iš subjekto ir visuotinės apskaitos podėlio veiklos metu, o atšaukimas ir tikrinimo nesėkmė nepatvirtina dalinio pakeitimo.

Talpykla atmeta nekanoninį Base64, perteklinį užpildymą, ne JPEG laikmenas, neteisingo formato ar nukirstus JPEG failus ir JPEG failus, kurie riboto viso paveikslėlio `sharp` dekodavimo metu sukelia įspėjimą. Ji perkoduoja kiekvieną priimtą paveikslėlį į kanoninį JPEG, plotį ir aukštį nustato iš dekoduotų baitų, o ne pasikliaudama iškvietėjo laukais, ir atmeta visus galinius poliglotinius baitus, o ne išsaugo jų. Į abi kvotas įskaitomas tik ribotas kanoninis suspaustas buferis. JSON perdavimo riboje įskaitomos Base64 pridėtinės išlaidos, atsižvelgiant į 32 MiB dekoduotos įvesties viršutinę ribą. Kiekviename išsaugotame darinyje fiksuojamas patvirtintas JPEG formatas/raiška, imčių ėmimo politika, darinio versija, sukūrimo laikas, serverio apskaičiuota turinio maiša ir užmaišyta pirminio elemento nuoroda kartu su patikimo iškvietėjo pirminio turinio maiša. Atšaukimas tikrinamas tarp asinchroninių dekodavimo/maišos fazių prieš atomišką talpyklos įrašo fiksavimą.

Šiame etape dar neprijungiamas gamybinis gamintojas prie maršruto ir nesuteikiamas kelių raiškų variantų pasirinkimas. Todėl skaidriajam „Video Bridge“ užklausos keliui nereikia jokio papildomo darbo, o su nuomotoju susieto subjekto darymas ir visas FU-08 kelių raiškų gyvavimo ciklas lieka aiškiai numatytu vėlesniu darbu, o ne dokumentuojami kaip užbaigtas elgesys.

Kadrai aprašomi nuosekliai naudojant sukonfigūruotą „Video“ modelį. Tuščias „Video“ perrašymas paveldi „Vision“ nustatymą; jei abu tušti, „Vision“ automatinis maršrutizatorius pasirenka efektyvų regėjimo pajėgumą turintį modelį. Sėkmingi aprašymai pakeičia originalią dalį stabiliu `[Video description:` priešdėliu, kuris taip pat pažymi tekstą kaip nepatikimą iš laikmenos gautą stebėjimą ir nurodo tolesniems modeliams nevykdyti laikmenoje rastų instrukcijų. Kadro aprašymo talpyklos raktai apima JPEG baitus, raginimą, laiko žymę ir efektyvų modelį; talpykloje saugomi tik sėkmingi aprašymai. Talpyklos įrašuose išsaugomas faktinis sėkmingas gamintojo modelis, įskaitant atsarginį modelį; tiltas praneša `mixed`, kai skirtingi kadrai buvo sukurti skirtingų modelių. Talpyklos pataikymas pakartotinai naudoja tą gamintojo tapatybę, o ne perženklina ją kaip prašomą maršrutizavimo planą. Viso vaizdo įrašo rezultato talpyklos raktas sudaromas iš kiekvienos išvestį keičiančios įvesties — raginimo, efektyvaus modelio, imčių ėmimo politikos, kadrų skaičiaus, semantinės analizės režimo, normalizuotos fokuso užuominos SHA-256 kontrolinio atspaudo, fokuso lango, `transcript`, `audioTranscript` ir kontaktinio lapo vėliavos — todėl pakeitus bet kurią iš šių dimensijų gaunamas talpyklos nepataikymas, o niekada ne pasenusio įrašo pakartotinis naudojimas. Vizualaus dublių pašalinimo politikos versija, slenkstis ir ribotas kandidatinių kadrų skaičius taip pat aiškiai nurodyti rezultato talpyklos rakte ir metaduomenyse; todėl pakeitus politiką negalima pakartotinai panaudoti pasenusio viso vaizdo įrašo aprašymo. Rezultato talpyklos v4 metaduomenyse saugomas režimas ir kontrolinis atspaudas, bet niekada — neapdorota vartotojo užduotis. Apsaugos metaduomenyse nurodomi tiek prašytas, tiek efektyvus analizės režimai; prašytas `focused` režimas be tinkamo naudoti vartotojo teksto pranešamas kaip efektyviai `full`.

Apsauga ištraukia kiekvieną palaikomą vaizdo dalį, tačiau aprašo ne daugiau kaip `modalityBridgeVideoMaxVideos`. Tikslui, kuriam įrodyta `supportsVideo === false`, nepavykę ir ribą viršijantys vaizdo įrašai virsta aiškiais saugiais teksto žymekliais, kad neišliktų jokio neapdoroto vaizdo. Kai pajėgumas nežinomas, tos dalys išsaugo vaizdo nešiklį; bet kokia atsarginė transkripcija atitinka aukščiau aprašytą ribotą teksto konvertavimą. Tikslai su `supportsVideo === true` apeina tiltą. Kliento užklausos nutraukimo signalas sklinda per atsisiuntimą, brokerio eilę, paprocesius ir aprašymų iškvietimus; nutraukimai sustoja tarp vaizdo įrašų ir gedimo atveju niekada nepraleidžia neapdorotos laikmenos.

Vykdomojo laiko nustatymai saugomi DB ir tikrinami su Zod:

| Raktas                              | Numatytoji  | Intervalas / elgsena                                                                                        |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Pasirenkamas vykdomojo laiko nustatymas, įjungiamas savanoriškai                                            |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` išsaugo bendruosius aprašymus; `focused` naudoja ribotą, nepatikimą naujausio vartotojo kontekstą    |
| `modalityBridgeVideoModel`          | `""`        | Paveldi „Vision Bridge“ modelį                                                                              |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` arba proporcingas `segment_aware`; detektoriaus gedimo atveju grįžtama į `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                              |

Senosios išsaugotos „Video“ skirtosios laiko reikšmės, viršijančios 120 sekundžių, apribojamos iki brokerio termino; nauji nustatymų įrašai virš šios ribos atmetami.
`GET /api/modality-bridge/video/runtime` prieš autentifikavimą ar vykdomosios aplinkos tikrinimą reikalauja patikimo pažymėto loopback lokalumo, o paskui — valdymo autentifikavimo. Jis grąžina tik `available`, išvalytas FFmpeg/ffprobe versijas ir fiksuotą priežastį, kai vykdomoji aplinka nepasiekiama. Vidinis išskyrimo galinis taškas nėra viešoji įkėlimo API: eilės prisotinimas grąžina `503` ir `Retry-After`, iškvietėjo atsijungimas grąžina `499`, o fiksuotas brokerio terminas grąžina `504`. Konvertuotuose atsakymuose prie centrinės `x-omniroute-modality-bridge` antraštės pridedama `video->text;model=<visionModel>;parts=<videos>`, nepašalinant „Vision“ ar „Audio“ segmentų.

### PII maskuoklis (`piiMasker.ts`)

Vykdoma **abiejuose** etapuose.

- **`preCall`** klonuoja užklausos duomenis, pereina per `system`, `messages`, `input` ir
  `prompt` (įskaitant paprastus eilučių elementus) ir eilučių tipo `content`/`text`
  laukams pritaiko `processPII()` (iš
  `@/shared/utils/inputSanitizer`). Kai `PII_REDACTION_ENABLED=true`, aptikti PII
  išsiunčiamuose duomenyse užmaskuojami. Tai nepriklauso nuo
  `INPUT_SANITIZER_MODE` (kuris valdo tik raginimų injekcijos politiką). Kai
  maskavimas išjungtas, iškvietimas tik užfiksuoja aptikimų skaičių, neperrašydamas
  turinio.
- **`postCall`** giliai klonuoja atsakymą, paleidžia `sanitizePIIResponse()` kartu su
  Responses API formos maskavimo funkcija (`maskResponsesOutput` — apima
  `output_text` ir `output[].content[].text`). Jei atliekamas bent vienas maskavimas,
  pakeistas atsakymas pakeičia originalą.

Saugiklis niekada nieko neblokuoja; jis tik prideda anotacijas (`meta.detections`,
`meta.redacted`) arba perrašo turinį.

#### Atranka pagal tipą, pasirinktiniai šablonai ir aptikimų skaitikliai

**Valdymo skydas → Nustatymai → Sauga → PII maskavimas** nustato, _kas_ yra
maskuojama. Jis maskavimo neįjungia: tai vis dar daro `PII_REDACTION_ENABLED`
(užklausa) ir `PII_RESPONSE_SANITIZATION` (atsakymas + SSE) — abi pagal numatymą
išjungtos.

- **Atranka pagal tipą** — integruotieji identifikatoriai išvardyti
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Jei nenustatyta, taikomi
  visi tipai (toks elgesys buvo iki atsirandant šiam nustatymui). Užklausų variklio
  `ssn_us` šablonas atitinka `ssn`. Šablonai (Minimal, Standard, Financial,
  Brazilian, USA, Full) tik pažymi varneles sąsajoje.
- **Pasirinktiniai šablonai** — iki 20 reguliariųjų išraiškų arba pakaitos simbolių
  šablonų (`*` = iki 64 simbolių, ne tarpų, `?` = vienas). Atitikmenys tampa
  `[CUSTOM_REDACTED]`. Kiekvienas šablonas praeina per `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): ne daugiau kaip 500 simbolių,
  vėliavėlės apribotos iki `g i m s u`, turi susikompiliuoti, turi praeiti
  `safe-regex` patikrą (katastrofiško atgalinio paieškos atžvilgiu) ir neturi
  atitikti tuščios eilutės ar maskavimo vietos žymos. Šablonas, kuris neatitinka
  reikalavimų, atmetamas saugant ir testuojant, o saugoma eilutė, kuri
  nebeatitinka reikalavimų, vykdymo metu praleidžiama, o ne kompiliuojama.
  Pasirinktiniai šablonai vykdomi tik tada, kai maskavimas įjungtas.
- **Aptikimų skaitikliai** — skaičiai pagal tipą (niekada ne atitikusios
  reikšmės), laikomi atmintyje ir išmetami paleidus iš naujo
  (`src/lib/pii/piiDetectionStats.ts`). Jie didėja tik tada, kai maskavimas įjungtas.

Nustatymai saugomi `key_value` lentelėje (vardų erdvė `pii_settings`,
`src/lib/db/piiSettings.ts`) ir skaitomi per 1 s podėlį. API:

| Metodas | Kelias                   | Paskirtis                                                                               |
| ------- | ------------------------ | --------------------------------------------------------------------------------------- |
| `GET`   | `/api/settings/pii`      | Vėliavėlių būsena, `enabledTypes`, `customPatterns`, aptikimų skaitikliai               |
| `PUT`   | `/api/settings/pii`      | Pakeičia `enabledTypes` (`null` = visi) ir (arba) `customPatterns`                      |
| `POST`  | `/api/settings/pii/test` | Bandomasis vieno šablono patikrinimas su ne didesne kaip 8 KB imtimi; niekas nesaugo ma |

Visi trys reikalauja valdymo autentifikacijos ir tikrina užklausos turinį su Zod
(`src/shared/validation/schemas/piiSettings.ts`).

### Raginimų injekcija (`promptInjection.ts`)

Aptinka priešiškas struktūras naudotojo pateiktame turinyje ir vykdo
sukonfigūruotą politiką. Elgesį nulemia aplinkos kintamieji ir konstruktoriaus
parametrai:

| Nustatymas          | Aplinkos kintamasis                                                                                           | Numatytoji | Poveikis                                                                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Įjungta             | `INPUT_SANITIZER_ENABLED`                                                                                     | `true`     | Kai `false`, saugiklis apeinamas be tikrinimo.                                                                                                                                               |
| Režimas             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                               | `warn`     | Injekcijos politika: `block`, `warn` arba `log`. (`redact` priimamas dėl atgalinio suderinamumo, bet **ne**šalina injekcijos teksto; užklausos PII perrašymą valdo `PII_REDACTION_ENABLED`.) |
| Blokavimo slenkstis | `blockThreshold` parametras / `INPUT_SANITIZER_BLOCK_THRESHOLD` (sinonimas `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`     | Mažiausias rimtumo lygis, reikalingas blokavimui. Numatytuoju atveju vidutinis lygis tik stebimas.                                                                                           |

**Režimo pirmenybė** (`getMode`): iškvietėjo `options.mode` →
`INJECTION_GUARD_MODE` **DB funkcijų vėliavėlių perrašymas** (Valdymo skydas →
Nustatymai → Funkcijų vėliavėlės) → `INJECTION_GUARD_MODE` aplinkos kintamasis →
`INPUT_SANITIZER_MODE` aplinkos kintamasis → `warn`. Todėl valdymo skyde nustatytas
perrašymas turi pirmenybę prieš aplinkos kintamuosius, tad Funkcijų vėliavėlių
sąsaja valdo veikiantį saugiklį realiu laiku (be paleidimo iš naujo). DB skaitymas
yra atsparus klaidoms: jei jis nepavyksta, saugiklis grįžta prie aplinkos
kintamaisiais paremto elgesio, o kai perrašymas nenustatytas, elgesys identiškas
sprendimui tik pagal aplinkos kintamuosius.

Aptikimo šaltiniai:

1. `sanitizeRequest()` iš `@/shared/utils/inputSanitizer` (bendras detektorių
   rinkinys, naudojamas ir kitur apdorojimo grandinėje).
2. Integruotieji `DEFAULT_GUARD_PATTERNS` (šiuo metu `system_override_inline` ir
   `markdown_system_block`, abu `high` rimtumo lygio).
3. Pasirinktiniai `customPatterns`, perduodami per konstruktoriaus parametrus
   (eilutės, reguliariosios išraiškos arba `{ name, pattern, severity }` įrašai).

Kai `mode === "block"` **ir** bent vienas aptikimas pasiekia sunkumo
slenkstį, `preCall` grąžina `{ block: true, message: "Request rejected:
suspicious content detected" }`. Režimais `warn`/`log` apsaugos mechanizmas
užfiksuoja įvykį žurnale, bet leidžia iškvietimą. Bendroji pagalbinė funkcija
`evaluatePromptInjection()` taip pat eksportuojama kvietėjams, kuriems reikia
įvertinti užklausas apeinant registrą.

**Skenavimo riba (v3.8.20):** detektorius tikrina tik **pirmuosius 16 KB**
sujungto užklausos teksto — `MAX_INJECTION_SCAN_BYTES = 16 * 1024`
(16 384 baitai) faile `src/shared/utils/inputSanitizer.ts`. Tiek
`detectInjection()`, tiek `evaluatePromptInjection()` prieš paleisdamos
šablonų ciklą atlieka `slice(0, MAX_INJECTION_SCAN_BYTES)`. Injekcijos
direktyvos būna netoli įvesties pradžios, todėl tai apriboja reguliariųjų
išraiškų CPU/GC apkrovą apdorojant kelių šimtų KB dydžio duomenis,
nesusilpninant aptikimo (žr. #3932, #4041).

### Kredencialų maskuotojas (`credentialMasker.ts`)

Vykdomas **abiejuose** etapuose, paskutinis numatytojoje grandinėje
(prioritetas `95`). Užmaskuoja gerai žinomus API raktų / slaptų prieigos
raktų šablonus išsiunčiamoje apkrovoje (žinučių turinyje, įrankių iškvietimų
argumentuose, įrankių rezultatuose) **ir** teikėjo atsakyme, kad kredencialai,
įklijuoti į užklausą (arba atkartoti įrankio rezultato), nebūtų nutekinti
pirminiam teikėjui arba atgal klientui.

- **Įjungiama tik pasirinkus**, ta pati konvencija kaip PII maskavimas
  (greta Griežtosios taisyklės Nr. 20): išjungta, nebent
  `settings.credentialRedactionEnabled === true` **arba**
  `CREDENTIAL_REDACTION_ENABLED=true`. Išjungus, apsaugos mechanizmas nieko
  neveikia — niekada neblokuoja ir nieko neperrašo.
- `redactCredentials()` pereina visą apkrovos/atsakymo medį (`walkValue()`,
  saugu prototipų užteršimo atžvilgiu, apsaugota nuo ciklų per `WeakSet`) ir
  pakeičia atitikmenis vietos žyma `[REDACTED:<type>]`, klonuodama tik tas
  šakas, kurios iš tikrųjų pasikeitė.
- `CREDENTIAL_PATTERNS` apima LLM teikėjų raktus (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS prieigos raktus
  (GitHub, Slack, Linear, Notion, npm, Postman, Discord), mokėjimų raktus
  (Stripe, Square), debesijos raktus (AWS prieigos raktas, Twilio, SendGrid,
  Mailgun), privačius raktus / JWT, prisijungimo eilutes su kredencialais
  (`mongodb://user:pass@...` ir t. t.) bei bendrąjį
  `Authorization`/`x-api-key`/`api-key`/`apikey` antraštės reikšmės šabloną.
  Antraštės formos raktai (`authorization`, `x-api-key`, `api-key`,
  `apikey`) maskuojami struktūriškai (tik reikšmė, o schemos priešdėlis,
  pvz., `Bearer `/`Basic `, išsaugomas), o ne per bendrąją teksto
  reguliariąją išraišką.
- Apsaugos mechanizmas niekada neblokuoja; jis tik perrašo
  (`modifiedPayload` / `modifiedResponse`) ir prideda anotacijas
  (`meta.credentialsRedacted`, `meta.count`).

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
