# Guardrails (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Pirminis tiesos šaltinis:** `src/lib/guardrails/`
> **Paskutinį kartą atnaujinta:** 2026-08-29 — v3.8.51 („Video Bridge“ transkripcijos kilmę deklaruoja iškvietėjas,
> serveris jos dar nepatvirtina — patikslinta pagal #11661)

Apsaugos priemonės užtikrina saugos, politikos ir turinio transformacijas ties
riba tarp „OmniRoute“ ir išorinių teikėjų. Kiekviena apsaugos priemonė gali tikrinti
(ir pasirinktinai atmesti, transformuoti arba anotuoti) užklausų naudingąsias apkrovas (`preCall`) ir
išorinių teikėjų atsakymus (`postCall`).

Sistema yra **fail-open**: jei vykdant apsaugos priemonę įvyksta išimtis, registras
įrašo klaidą ir tęsia darbą su kita apsaugos priemone, užuot atmetęs
užklausą. Blokavimas visada yra sąmoningas sprendimas (`block: true`), o ne atsitiktinumas.

## Integruotos apsaugos priemonės

Importuojant registras automatiškai įkelia šešias apsaugos priemones prioriteto tvarka
(žr. `registry.ts` → `registerDefaultGuardrails()`):

| Prioritetas | Pavadinimas         | Etapas (-ai)   | Failas                |
| ----------- | ------------------- | -------------- | --------------------- |
| `5`         | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`         | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`         | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`        | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`        | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`        | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Mažesnio prioriteto numerio priemonės vykdomos **pirmiausia**.

### Vaizdų tiltas (`visionBridge.ts`) — modalumo tiltas PR-1

Perima užklausas su vaizdais, skirtas **vaizdų nepalaikantiems modeliams**, ir
arba nukreipia visą užklausą į vaizdus palaikantį modelį, arba prieš
siunčiant užklausą aukštesnio lygio paslaugai pakeičia vaizdų dalis tekstiniais
aprašais, sugeneruotais konfigūruojamu vaizdų modeliu. Taip tik tekstą
palaikantys paslaugų teikėjai gali skaidriai apdoroti daugiarūšius duomenis.

Eiga:

1. Praleisti, jei tikslinis modelis jau palaiko vaizdus (nebent jis įtrauktas į
   priverstinio tilto sąrašą `isVisionBridgeForcedModel`).
2. Išskirti vaizdų dalis naudojant `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), kuri perduoda darbą **vieningam medijos
   detektoriui** `detectMediaParts()`, esančiam `open-sse/utils/mediaParts.ts` — tai
   vienintelis tiesos šaltinis, bendras su kombinacijų suderinamumo filtru.
   Išskyrimas pagal leidžiamąjį sąrašą taikomas tik aukščiausio lygio tokių formų dalims,
   kurias `replaceImageParts` gali vėl įterpti (išskyrimo↔pakeitimo sutartis): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` ir Responses API `input_image`. Įdėtiniai atitikmenys ir
   tik indikatorių turinčios formos yra skirtos kombinacijų filtrui ir niekada neišskiriamos.
   Praleisti, jei nieko nerasta.
3. Nustatyti vykdymo laiko konfigūraciją naudojant `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): naujieji `modalityBridge*`
   nustatymų raktai turi pirmenybę; senieji `visionBridge*` raktai lieka kaip
   **vieno ciklo atsarginis variantas** (grąžinimo langas). Kai tiltas išjungtas,
   praleisti prieš atliekant bet kokį medijos perėjimą.
4. Režimo parinkiklis (`modalityBridgeVisionMode`, žr. lentelę toliau) nusprendžia,
   ar peradresuoti, ar aprašyti. Peradresavimo atveju grąžinamas `modifiedPayload`,
   kuriame pakeistas tik `model`, kartu su metaduomenimis
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Aprašymo kelias: apriboti vaizdų skaičių iki `maxImages`, suformuoti į užduotį orientuotą
   raginimą, patikrinti aprašymų podėlį, iškviesti vaizdų modelį **lygiagrečiai**
   (`Promise.allSettled`) ir vietoje vaizdų įterpti tekstines dalis
   `[Vaizdas N]: <aprašas>`. Nepavykus aprašyti grąžinamas `null`, o pradinė vaizdo dalis
   **išsaugoma** (#4012), išskyrus kombinacijos aprašymo kelią, kai nepavyko
   visi aprašymai — tuomet patvirtintai vaizdų nepalaikančiai aukštesnio lygio sistemai
   vietoje jų pateikiamas tekstas
   `(nepasiekiama — neprijungtas joks vaizdus palaikantis paslaugų teikėjas)` (#8430).
6. Grąžinti `modifiedPayload` ir metaduomenis (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Režimo parinkiklis (`modalityBridgeVisionMode`)

| Režimas    | Numatytasis | Veikimas                                                                                                                                                                                                                                                                                                                            |
| ---------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔           | Ankstesnė euristika, nepakeista (#6640/#7204): ne kombinacijų / `auto/` modeliai peradresuojami į geriausią vaizdų modelį, nebent pradinis modelis jau turi tinkamus prisijungimo duomenis (tuomet aprašoma); kombinacijų tikslai visada aprašomi.                                                                                  |
| `describe` |             | Visada aprašyti — peradresavimo blokas visiškai praleidžiamas; visada atsako naudotojo pasirinktas modelis.                                                                                                                                                                                                                         |
| `reroute`  |             | Priverstinai peradresuoti: modelio su prisijungimo duomenimis išsaugojimo patikra apeinama. Peradresavimo **tikslo** prisijungimo duomenų patikra vis tiek taikoma — kai nėra tinkamo vaizdų tikslo, užklausa pereina į aprašymo kelią, kad neapdoroti vaizdai niekada nepasiektų tik tekstą palaikančios galinės sistemos (#8430). |

Priverstiniai režimai užbaigia pasirinkimą **prieš** paleidžiant automatinę euristiką;
`auto` veikimas baitų lygmeniu yra identiškas iki PR-1 buvusiai apsaugos priemonei.

#### API rakto aprėptis (`visionBridgeKeyScope.ts`)

Kai iškvietėjo API raktas apriboja `allowedConnections`, kvotų telkinius
(`allowedQuotas`) arba modelius (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), tiltas
peradresavimui ir aprašymui pasirenka tik tuos modelius, kuriuos leidžiama
naudoti su raktu, ir tik tuose ryšiuose, kuriuos leidžiama naudoti su raktu.
Tuomet aprašymo iškvieta visada vykdoma per OmniRoute grįžtamąją kilpą su
`x-omniroute-self-loop-key-id` antrašte, kad gaunanti pokalbio užklausa dar
kartą pritaikytų to rakto ryšių ir modelių politiką. `enforceApiKeyPolicy()`
atsižvelgia į šią antraštę tik kartu su grįžtamosios kilpos nešiklio prieigos
raktu, todėl ji gali tik susiaurinti prieigą, o identifikatorius, kurio
nepavyksta išspręsti, yra atmetamas.

Jei raktui neleidžiamas joks vaizdų modelis, aprašymo kelias pasitraukia, o
užklausa perduodama nepakeista — tai toks pats leidžiamasis gedimo režimas kaip
ir išjungtos apsaugos priemonės atveju (metaduomenys
`{ skipped: true, reason: "no_permitted_vision_model" }`).
Užklausos be rakto ir raktai be šių apribojimų veikia lygiai taip pat kaip
anksčiau.

#### Į užduotį orientuotas aprašymo raginimas (`modalityBridgeVisionTaskAware`)

Numatytoji reikšmė yra **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) prie bazinės
aprašymo užklausos prideda **paskutinio naudotojo pranešimo** tekstą (sutrumpintą iki 500 simbolių),
nukreipdama aprašymą į tai, ko naudotojas iš tikrųjų prašė
(`codex-vision-proxy` šablonas), ir paprašo vaizdo modelio transkribuoti matomą
tekstą. Kai žymė išjungta arba nėra naudotojo teksto, bazinė užklausa naudojama nepakeista.

Paties aprašymo vidinio ciklo su OpenAI suderinama užklausa (`callVisionModelSingle()`
faile `visionBridgeHelpers.ts`) visada nurodo `image_url.detail: "high"` —
besąlygiškai, kiekvienam kvietėjui / teikėjui, neatsižvelgiant į jokį kliento signalą.
Žemo detalumo atranka pablogina OCR tikslumą būtent tai teksto transkribavimo
užduočiai, kurios prašo ši užklausa, todėl pats aprašymo kvietimas visada prašo didelio
detalumo, neatsižvelgiant į tai, kokį detalumo lygį naudojo pradinė gaunama užklausa. Tai
paveikia tik vidinį aprašymo užklausos turinį; tai nekeičia, kaip
OmniRoute persiunčia kvietėjo `image_url.detail` pirminėje užklausoje —
ši numatytoji reikšmė pritaikoma atskirai ir tik aptiktiems OpenCode klientams
funkcijoje `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Aprašymo
vidinio ciklo Anthropic laidinio formato šaka neturi `detail` lauko, todėl nė viena
numatytoji reikšmė jai įtakos nedaro.

#### Aprašymo išvesties riba (`modalityBridgeVisionMaxChars`)

| Raktas                         | Numatytoji reikšmė | Diapazonas         |
| ------------------------------ | ------------------ | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`                | `0` arba 100–50000 |

`0` (numatytoji reikšmė) reiškia **be ribos** — `callVisionModel()` grąžintas
aprašymas perduodamas nepakeistas, išsaugant esamą veikimą. Bet kuri reikšmė
diapazone 100–50000 sutrumpina aprašymą, pridėdama `…` priesagą, prieš įterpiant
jį atgal kaip `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` faile `src/lib/guardrails/visionBridge.ts`).
Padidinkite šią reikšmę daug detalių turinčioms OCR užduotims, kai paskesniam modeliui
reikia visos transkripcijos; sumažinkite ją, kad apribotumėte prie žodingų vaizdo
modelių naudojamų prieigos raktų kiekį. Valdymo skydelio laukas yra skirtuko Vision
skydelyje Advanced (`modality-bridge-max-chars` faile
`ModalityBridgeVisionTab.tsx`) ir bet kurią reikšmę nuo 1 iki 99 padidina iki
apatinės 100 ribos, o aiškiai nurodytą `0` palieka nepakeistą — `0` savaime yra
leistina Zod reikšmė
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), o ne vien
numatytoji „nenustatyta“ reikšmė.

#### Aprašymų podėlis (`modalityBridge/bridgeCache.ts`)

Atmintyje laikomas LRU + TTL aprašymų išvesčių podėlis, bendrai naudojamas visame procese.
Raktas = `sha256(imageRef + composedPrompt + configuredBridgeModel)` su
ilgio prefiksų kadravimu (be laukų ribų kolizijų). Modelio komponentas yra
**sukonfigūruotas** tilto modelis, o ne modelis, kuris iš tikrųjų pateikė atsakymą —
`callVisionModel` gali viduje naudoti atsarginį modelį, o rakto kūrimas kiekvienam
bandymui suskaidytų podėlį. Nepavykę aprašymai niekada nėra įrašomi į podėlį. Nustatymai:

| Raktas                          | Numatytoji reikšmė | Diapazonas |
| ------------------------------- | ------------------ | ---------- |
| `modalityBridgeCacheEnabled`    | `true`             | —          |
| `modalityBridgeCacheTtlMinutes` | `60`               | 1–1440     |
| `modalityBridgeCacheMaxEntries` | `200`              | 10–5000    |

#### Nuotolinių vaizdų normalizavimas (vidinio ciklo aprašymas / base64 gavimas)

Kai tiltas pats gauna **nuotolinį** vaizdą — Anthropic aprašymo
vidiniam kvietimui ir claude laidinio formato base64 konvertavimui
(`ensureBase64ImagesForClaudeWire`), abiem atvejais per
`fetchRemoteImageAsDataUri()` faile `visionBridgeHelpers.ts` — gautas duomenų
URI perduodamas per `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) prieš įterpiant jį į vaizdo modelio
užklausą. Per dideli vaizdai sumažinami taip, kad **ilgoji kraštinė būtų 2048px**
(atitinkant dydžio keitimo ribą, kurią OpenAI / Anthropic jau taiko serverio pusėje);
tai sumažina įkėlimo baitų kiekį ir delsą, nekeičiant to, ką mato vaizdo modelis. Dydžiui
keisti naudojamas `sharp`, įkeliamas dinaminiu importavimu: platformoje, kurioje
nepavyksta įkelti jo natyviojo dvejetainio failo, `normalizeDataUri()` **niekada neišmeta klaidos** —
vietoj to pradiniai baitai perduodami nepakeisti, todėl aprašymo / base64 konvertavimo
kelias visada veikia. Ne vaizdo baitai (kai gavimo rezultatas nėra dekoduojamas
vaizdas) taip pat perduodami nepakeisti. Šis normalizavimas taikomas tik vaizdams,
kuriuos tiltas gauna savo vidiniam kvietimui — jis niekada netaikomas neapdorotam
kvietėjo tiesiogiai perduodamam turiniui, laikantis tik pasirinktinio keitimo
principo (griežta taisyklė Nr. 20).

#### Nustatymų schema + migravimas

Nauji `modalityBridge*` raktai tikrinami naudojant Zod schemoje `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, `modalityBridgeCache*` trijulė ir
`modalityBridgeAudio*` grupė, naudojama Audio Bridge. Migracija
`141_modality_bridge_settings.sql` nukopijuoja esamas senąsias
`visionBridge*` reikšmes į atitinkamus naujus raktus (idempotentiškai, niekada
neperrašydama operatoriaus nustatytos `modalityBridge*` reikšmės); senieji raktai
vieną leidimo ciklą ir toliau priimami kaip skaitymo atsarginė parinktis.

#### Skaidrumo antraštė + statistika

Aprašymu transformuoti atsakymai turi
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(sukuriama naudojant `buildModalityBridgeHeader()` faile `modalityBridge/bridgeStats.ts`,
pridedama naudojant `withModalityBridgeHeader()` faile `src/sse/handlers/chatHelpers.ts`).
Nukreiptos užklausos **negauna jokios** antraštės — turinys nebuvo pakeistas, o modelio
pakeitimas jau matomas atsakymo turinio lauke `model`.

`GET /api/modality-bridge/stats` (valdymo autentifikavimas, tas pats lygis kaip
`GET /api/settings`) grąžina atmintyje laikomus kiekvieno modalumo skaitiklius
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }`, skirtus `vision`, `audio` ir
`video`. `averageLatencyMs` vardikliu naudoja `latencySamples`, o ne visus
bandymus; operacijai be trukmės matavimo nesukuriamas fiktyvus nulio milisekundžių
mėginys. `bridged` išlieka su ankstesnėmis versijomis suderinamas sėkmingų
konvertavimų pseudonimas; nesėkmingi bandymai jo nedidina.
Pagal numatytąją architektūrą skaitikliai iš naujo nustatomi paleidus procesą
iš naujo (tai telemetrija, o ne apskaita).

#### Valdymo skydelio konfigūracija

Specialus valdymo skydelio puslapis yra
`/dashboard/settings/modality-bridge`. Jo per URL pasiekiami skirtukai `Vision`, `Audio`
ir `Video`, perjungiant `tab` reikšmę, išsaugo užklausos parametrus.
Skirtuke „Vision“ galima valdyti įjungimą, režimą, modelio pasirinkimą (įskaitant
automatinį numatytąjį pasirinkimą), užduotį atitinkančių užklausų formavimą, išplėstinius
skirtojo laiko, vaizdo, aprašo ilgio ir podėlio apribojimus, vykdymo aplinkos
skaitiklius bei apsaugotą pavyzdinę užklausą. Skirtukas „Audio“ taip pat veikia:
jame galima valdyti įjungimą, tik STT modelių parinkiklį su automatiniu pasirinkimu,
skirtojo laiko ir didžiausios klipo trukmės apribojimus, garso skaitiklius bei
`input_audio` pavyzdinį testą. Skirtukas „Video“ yra funkcionalus: jame rodoma
FFmpeg/ffprobe vykdymo aplinkos būsena — viena iš keturių aiškiai apibrėžtų
naudotojo sąsajos būsenų (`unknown`, kol tikrinimas vykdomas arba jo nepavyko
užbaigti; `restricted`, kai valdymo skydelio priegloba nėra grįžtamojo ryšio
adreso ir tikrinimas kliento pusėje praleidžiamas; `unavailable`, kai patikrinus
patvirtinama, kad priemonių nėra; arba `available` su FFmpeg/ffprobe versijomis) —
išsaugomi įjungimo, modelio, kadrų, vaizdo įrašo ir skirtojo laiko apribojimai,
modelių parinkiklyje paliekami tik vaizdą palaikantys modeliai ir rodomi vaizdo
įrašų skaitikliai.

Ankstesnė „Vision Bridge“ kortelė DI nustatymuose dabar yra suderinamumo nuoroda
į naująjį puslapį; joje nebelaikoma antra formos kopija. „Media Providers“ taip
pat susieja vaizdo konvertavimo į tekstą ir kalbos konvertavimo į tekstą darbo
eigas su atitinkamais „Modality Bridge“ skirtukais, nepašalindama esamos kalbos
konvertavimo į tekstą bandymų aplinkos.

**Savojo ciklo priėmimo tikrinimo apėjimas:** kai aprašymo iškvieta nukreipiama per
paties OmniRoute `/v1` savąjį ciklą (nestandartinio teikėjo modelį), papildoma
užklausa siunčia `x-omniroute-admission-bypass: internal` ir autentifikuojama
naudojant nustatytą savojo ciklo prisijungimo duomenį — vietinį `sk_omniroute`
žymeklį vietiniu režimu arba operatoriaus sukonfigūruotą `OMNIROUTE_API_KEY` /
`ROUTER_API_KEY` aplinkos raktą (#1350), kad dieginiuose su
`REQUIRE_API_KEY=true` vis tiek būtų galima vykdyti aprašymo iškvietą. Apėjimas
leidžiamas tik naudojant būtent šiuos prisijungimo duomenis, todėl išoriniai
klientai negali naudoti šios antraštės priėmimo tikrinimui praleisti.

Senieji numatytieji parametrai yra faile
`src/shared/constants/visionBridgeDefaults.ts`; naujieji režimo, atsižvelgimo į
užduotį ir podėlio numatytieji parametrai bei nustatymų sprendiklis yra faile
`src/shared/constants/modalityBridgeDefaults.ts`. Apsaugos mechanizmas pateikia
`deps` konstruktoriaus parinktį, kad testuose būtų galima įterpti netikras
`getSettings` ir `callVisionModel` realizacijas.

### Garso tiltas (`audioBridge.ts`) — „Modality Bridge“ PR-3

Perima pokalbių užklausas su garsu prieš joms pasiekiant paskirties objektą, apie
kurį nėra žinoma, kad jis priima garso įvestį. Pokalbio užklausa niekada
neperadresuojama: garso dalys transkribuojamos per esamą su OpenAI suderinamą
kelių dalių galinį tašką, o pasirinktas pokalbių modelis tęsia darbą naudodamas
tekstines transkripcijas.

Eiga:

1. Nustatykite `supportsAudio` naudodami `getResolvedModelCapabilities()`.
   Pirmenybė teikiama aiškiai teikėjų registre nurodytiems metaduomenims, po jų —
   statiniams modelio metaduomenims, tada sinchronizuotam `modalities_input`.
   Deklaruotas įvesčių sąrašas be `audio` reiškia `false`; kai nėra jokių
   galimybes patvirtinančių duomenų, reikšmė lieka `null`. Ir `false`, ir `null`
   aktyvina konservatyvų tiltą, o `true` jį apeina.
2. Nustatykite `modalityBridgeAudio*` nustatymus ir iš kiekvieno pranešimo,
   naudodami bendrą `detectMediaParts()` detektorių, išskirkite sujungiamas
   aukščiausiojo lygio garso dalis. Palaikomi duomenų perdavimo formatai yra
   OpenAI `input_audio`, `audio_url` ir `source.media_type: "audio/*"`.
   Įdėtasis garsas aptinkamas maršrutizavimo tikslais, tačiau sujungimo kelias jo
   nepašalina. Apdorojamo turinio kiekį riboja `modalityBridgeAudioMaxClips`;
   vėlesnės dalys lieka nepakeistos.
3. Naudokite sukonfigūruotą `provider/model` arba leiskite
   `selectAudioBridgeModel()` stabilia katalogo tvarka pereiti per
   `AUDIO_TRANSCRIPTION_PROVIDERS` ir pasirinkti pirmąjį modelį, kuriam yra
   tinkami aktyvaus teikėjo prisijungimo duomenys.
4. `callAudioTranscription()` konvertuoja base64 / duomenų URI garsą į kelių
   dalių `file` arba atsisiunčia nuotolinį `audio_url` per tik viešąjį išsiuntimą
   leidžiančią apsaugą su DNS susiejimu ir 25 MB riba. Tada failas ir pasirinktas
   modelis POST metodu siunčiami į vietinį `/v1/audio/transcriptions` savąjį
   ciklą, autentifikuojamą naudojant `resolveSelfLoopBearer()`. Esamas
   transkripcijos maršrutas atlieka įprastą prisijungimo duomenų paiešką,
   atvėsimo laikotarpio ir dažnio apribojimų tvarkymą bei nukreipimą teikėjui.
5. Sėkmingų iškvietų dalys pakeičiamos į `[Audio N]: <transcript>`. Iškvietimai
   vykdomi naudojant `Promise.allSettled`: nepavykus atskiram iškvietimui,
   išsaugoma pradinė garso dalis (#4012 sutartis). Jei nepavyksta visi iškvietimai
   ir įrodyta, kad paskirties objektui `supportsAudio === false`, dalys tampa
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 sutartis).
   Nežinomo paskirties objekto (`null`) atveju, nepavykus visiems iškvietimams,
   turinys lieka nepakeistas. Įrodytai tik tekstą priimantis paskirties objektas,
   kai nėra tinkamų STT prisijungimo duomenų, gauna tą patį aiškų pakaitalą,
   nevykdant tinklo iškvietimo.

Sėkmingos transkripcijos naudoja viso proceso „Modality Bridge“ LRU/TTL podėlį.
Raktas sudaromas iš garso nuorodos, stabilios `audio-transcription` operacijos
žymos ir pasirinkto STT modelio; nesėkmės podėlyje niekada nesaugomos. Garso
bandymai atnaujina bendrus `bridged`, `cacheHits`, `failures` ir `lastUsedAt`
skaitiklius. Transformuotų atsakymų antraštėje pateikiama
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nepakeistos
užklausos negauna „Audio Bridge“ segmento.

Vykdymo aplinkos nustatymai saugomi DB ir tikrinami naudojant Zod:

| Raktas                        | Numatytoji reikšmė | Diapazonas              |
| ----------------------------- | ------------------ | ----------------------- |
| `modalityBridgeAudioEnabled`  | `true`             | —                       |
| `modalityBridgeAudioModel`    | `""`               | Automatinis arba STT ID |
| `modalityBridgeAudioTimeout`  | `60000`            | 1000–300000             |
| `modalityBridgeAudioMaxClips` | `3`                | 1–10                    |

Bendroji podėlinė ir toliau valdoma naudojant `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` ir `modalityBridgeCacheMaxEntries`.

### Vaizdo įrašų tiltas (`videoBridge.ts`, `videoBridgePipeline.ts`)

Prieš iškviečiant tikslinę sistemą, kuri, kiek žinoma, neturi savosios vaizdo įrašų
palaikymo funkcijos, perimamos aukščiausio lygio vaizdo įrašų dalys iš „Chat Completions“
`messages` ir „Responses API“ `input`. Palaikomi formatai: `input_video`,
`video_url`, `video_source`, HTTPS URL ir `data:video/*;base64,...` duomenų URI.
Paprasti tekstiniame turinyje esantys failų pavadinimai nelaikomi vaizdo įrašais.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) valdo užklausos apėjimą,
galimybių ir politikos patikrą, kiekvienos užklausos duomenų agregavimą ir atsakymo
naudingąją apkrovą. Atskiro vaizdo įrašo apdorojimas — gavimas, viso rezultato
podėlinė, kadrų sekos aprašymas (įtraukiant bet kokią iškvietėjo pateiktą garso
transkripciją) ir kiekvieno bandymo metrika, nutraukimas bei išvalymas — yra
paslėptas už `processVideoPart`, esančios `videoBridgePipeline.ts`, kuri
`preCall` cikle iškviečiama po kartą kiekvienai vaizdo įrašo daliai. Tame modulyje
taip pat apibrėžiamos aiškios prievadų ribos: `VideoMediaBrokerPort` (baitams
gauti ir atrinktiems kadrams išgauti), `VideoAudioTranscriptionPort` (iškvietėjo
pateiktai garso transkripcijai sujungti su atrinktų kadrų antraštėmis) ir
`VideoDrilldownPort` (išsamios kadrų analizės išsaugojimo riba; ji dar nesusieta
su `processVideoPart` — šiuo metu išsamios analizės įrašus rašo tik atskiras
maršrutas `/api/modality-bridge/video/drilldown`).

Viešasis `/v1` užklausų kelias niekada neimportuoja ir neiškviečia poprocesio.
Nuotoliniai vaizdo įrašai atsisiunčiami taikant 50 MiB ribą; tiesiogiai įterptiems
base64 vaizdo įrašams taikoma konservatyvi 36 MiB iškoduoto vieno vaizdo įrašo
riba, kad modelio, pranešimų ir kadravimo apvalkalas neviršytų viešosioms JSON
užklausoms taikomos 50 MiB priėmimo ribos. Tiesiogiai įterptų duomenų ilgis ir
apskaičiuotas iškoduotas dydis patikrinami prieš skiriant atmintį. Pradiniam
nuotoliniam URL ir kiekvienam peradresavimui privalomas HTTPS, naudojant esamą
tik viešosioms paskirtims skirtą siunčiamųjų ryšių apsaugą su DNS susiejimu.
Tada baitai perduodami per tikslią vidinę `POST /api/modality-bridge/video/extract`
tarpininko ribą. Šis maršrutas yra ir `LOCAL_ONLY`, ir `SPAWN_CAPABLE`, priima
tik kiekvienam procesui autentifikuotą, patikimą vietinio ciklo užklausą ir
niekada nepriima URL, failų sistemos kelio, vykdomojo failo ar argumentų sąrašo.
API turinio dydžio apdorojimo seka ir apdorojimo programos laipsniškas turinio
skaitytuvas nepriklausomai taiko 50 MiB tarpininko įvesties ribą. Jo ribotoje
eilėje vienu metu atliekamas vienas išgavimas, leidžiamos keturios laukiančios
užduotys, o laukiančių įvesties duomenų dydis ribojamas iki 100 MiB.

Tarpininko viduje `ffprobe` skaito privatų vietinį failą; fiksuotas leidžiamų
formatų sąrašas neapima grojaraščių ir aprašų formatų. Leidžiamiems MOV šeimos
konteineriams išorinės MOV duomenų nuorodos pagal numatytąją nuostatą lieka
išjungtos, o fiksuota komanda jų neįjungia. Tiek `ffprobe`, tiek `ffmpeg` naudoja
tik `file` protokolą apimantį leidžiamų protokolų sąrašą, vieną giją, fiksuotus
argumentų masyvus, nenaudoja apvalkalo, o vykdomieji failai randami per `PATH`.
Pridėtų paveikslėlių viršelių srautai nelaikomi atkūrimo kandidatais. Visi
atkuriami srautai turi atitikti ribas, o prieš deterministinį mažiausio indekso
atsarginį variantą pirmenybė teikiama aiškiai nurodytam numatytajam srautui.
Vaizdo įrašų trukmė ribojama iki 600 sekundžių, kiekvieno matmens dydis — iki
8 192 pikselių, o šaltinio pikselių skaičius — iki 33 554 432. FFmpeg atrenka
1–16 vidurio taškų JPEG kadrų, sumažina ilgesnę kraštinę daugiausia iki 1 024
pikselių nedidindama mažesnių įvesčių ir niekada negauna URL. Pagal numatytąją
nuostatą atrankai naudojama `uniform` politika. Pasirenkamosios `scene_aware` ir
eksperimentinė `segment_aware` politikos atlieka vieną papildomą fiksuotą FFmpeg
perėjimą per jau patikrintą vietinį srautą, pasirenka apribotas `showinfo` scenų
laiko žymas ir, jei aptiktuvas sugenda, viršijamas skirtasis laikas, išvestis yra
netinkamo formato arba kandidatų rinkinys yra tuščias, deterministiškai grįžta
prie tų pačių tolygiai paskirstytų vidurio taškų. Segmentus atsižvelgiantis
režimas vidurio taškų pavyzdžius paskirsto proporcingai patikrintiems scenų
intervalams; segmentus atsižvelgiančio režimo įrodymai ir atsarginio varianto
veikimas išsamiau aprašyti toliau. Griežta 16 kadrų riba taikoma po atrankos
pagal kiekvieną politiką. Kai į scenas atsižvelgiančiai užklausai skirtas tik
vieno kadro limitas, naudojamas aktyvaus viso vaizdo įrašo arba fokusavimo lango
tolygus vidurio taškas ir pateikiama `policyEffective: uniform`: vienas
pasirinktas scenos kadras negali išsaugoti abiejų laiko intervalo galų.
Iškvietėjas pasirinktinai gali pateikti baigtinį fokusavimo langą (`start`/`end`
sekundėmis); ribos apribojamos pagal medijos trukmę, atvirkštiniai arba nebaigtiniai
langai atmetami, o visos atrankos politikos vykdomos tik normalizuotame intervale.
Gautas langas įtraukiamas į atrankos metaduomenis ir į nepatikimo aprašo
priešdėlį, kad paskesni modeliai galėtų atskirti sufokusuotą ištrauką nuo visos
laiko juostos.

Semantinis antraščių fokusavimas yra atskiras, aiškiai nustatomas parametras.
Numatytasis `full` analizės režimas išsaugo esamą kadrų raginimą ir niekada
neperduoda užklausos teksto antraščių modeliui. `focused` režimu tiltas skaito
tik naujausią netuščią naudotojo sukurtą `text`/`input_text` iš to paties „Chat“
arba „Responses“ konteinerio, normalizuoja jį į NFC, sutraukia valdymo simbolius
ir tarpus bei apriboja iki 500 „Unicode“ kodo taškų. Jei rezultatas tuščias,
grįžtama prie tikslaus `full` raginimo. Tinkama užuomina serializuojama kaip JSON
specialiame nepatikimo naudotojo konteksto bloke ir gali tik nustatyti stebimų
detalių prioritetą; ji negali pakeisti atskiro įspėjimo nesilaikyti medijoje
matomų ar girdimų nurodymų. Tekstinis fokusavimas niekada nenustato `start`/`end`
pagal numanymą ir nekeičia laikinio atrankos mechanizmo.

#### FU-07 struktūriniai segmentų įrodymai

`segment_aware` naudoja vieną apribotą išankstinės analizės etapą jau patikrintam
vietiniam vaizdo srautui. Fiksuota filtrų grandinė pirmiausia sumažina plotį iki ne
daugiau kaip 320 pikselių, aptinka scenų pasikeitimus ir sustingusius intervalus,
o tada 1 kadro per sekundę dažniu ima mėginius suliejimui, vidutiniam skaisčiui
bei erdvinei ir laiko informacijai įvertinti. Etapas apribotas iki 600 struktūrinių
mėginių, vienos FFmpeg / filtro gijos, tų pačių tik `file` protokolą ir konteinerius
leidžiančių sąrašų, 1 MiB proceso išvesties ribos ir ne daugiau kaip 30 sekundžių
bendrame tarpininko nutraukimo / termino lange. Jis niekada nepriima komandos,
filtro, kelio ar URL iš užklausos.

Struktūrinės reikšmės yra deterministiniai atrankos įrodymai, o ne semantinis
vaizdo įrašo supratimas. Pagal jas nenustatomi subjektai, veiksmai, antraštės,
kalba ar naudotojo ketinimai. Scenų ir sustingimų ribos sudaro segmentus;
sustingimo aprėptis, suliejimas, ekspozicija, erdvinis detalumas ir pokyčiai laike
daro įtaką tik tam, kaip paskirstomas esamas 1–16 kadrų biudžetas. Visiškai
sustingusiam segmentui skiriamas ne daugiau kaip vienas kadras, o nesustingę
segmentai varžosi dėl likusio biudžeto. Kai ribų yra daugiau nei kadrų,
išlaikoma tolygi laiko juostos aprėptis, kad dažni ankstyvi montažo perėjimai
negalėtų paslėpti ilgo baigiamojo segmento. Scenų ribos, esančios ne didesniu
kaip 1 sekundės analizės skiriamosios gebos atstumu nuo sustingimo ribos,
sujungiamos.

Jei trūksta filtrų, įrodymai yra netinkamai suformuoti ar tušti, įvyksta
detektoriaus klaida arba baigiasi apribotam išankstinės analizės etapui skirtas
laikas, be klaidos grįžtama prie tikslios tolygaus vidurio taško strategijos.
Skambinančiosios šalies nutraukimas arba tarpininko terminas neleidžia taip
grįžti: vykdomas antrinis procesas nutraukiamas, vėlesnis kadrų išgavimas
neleidžiamas, o privatus laikinasis medis pašalinamas bloke `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuoja deterministinius tikro FFmpeg
testinius duomenis, skirtus po dublių šalinimo sutaupytų antraščių generavimo
iškvietimų skaičiui, tankaus judėjimo biudžeto paskirstymui, suliejimo,
ekspozicijos ir SI-TI įrodymams, dažniems montažo perėjimams su ilga pabaiga ir
klaidingai teigiamiems laipsniško išblukimo rezultatams vertinti. Jis registruoja
išankstinės analizės faktinę trukmę ir, kai pasiekiama `/usr/bin/time`, antrinio
proceso CPU laiką bei didžiausią RSS. Jo kokybės patikros yra tik struktūriniai
orakulai. Tikro antraščių modelio kokybės būsena lieka `HOLD`, nes ši testavimo
sistema neturi įgalioto galinio taško ar užfiksuoto vertintojo. Finansinių
sutaupymų būsena taip pat lieka `HOLD`, nebent `--caption-cost-per-call-usd`
pateikia aiškų teigiamą vieno iškvietimo kainos įvertį; scenarijus niekada
neišgalvoja nė vieno iš šių rezultatų.

Kiekvienas kadras apribotas iki 4 MiB, visi neapdoroti kadrai kartu – iki 23 MiB,
o serializuotas tarpininko atsakymas – iki 32 MiB. Privatus laikinasis katalogas
pašalinamas bloke `finally`. OmniRoute neįtraukia FFmpeg ir nepriima pasirinktinio
vykdomojo failo kelio. Prieš generuodamas antraštes, tiltas pritaiko konservatyvų
vaizdinių dublių šalinimo etapą: kiekvienas JPEG sumažinamas iki 16×16 pilkio
atspalvių buferio ir lyginamas tik su paskutiniu išsaugotu kadru. Kai prašomas
antraščių biudžetas viršija vieną kadrą, išgavimo metu pateikiamas apribotas
kandidatų rinkinys, ne daugiau kaip du kartus didesnis už šį biudžetą ir niekada
neviršijantis 16 kadrų. Prašoma riba pritaikoma tik pašalinus dublius, o kai
biudžetas yra bent du, per galutinį retinimą išsaugomi pirmasis ir paskutinis
pasirinkti kandidatai. Versijuota
`grayscale-16x16-mean-cells-v2` strategija naudoja didesnę iš šių reikšmių:
vidutinį skaisčio pokytį arba miniatiūros langelių, kurių normalizuotas pokytis
yra bent 0,05, santykį. Dublių slenkstis yra konstanta 0,04, pasirinkta dėl
nuspėjamumo, o ne pateikta kaip vykdymo meto nuostata. Šis antrinis didelio
kontrasto signalas išsaugo nedidelius judesius ir matomo teksto pokyčius, kuriuos
gali paslėpti vien vidurkiu pagrįstas palyginimas. Lygintuvo arba dekoderio
klaidos neužblokuoja apdorojimo ir išsaugo aprėptį. Išvesties metaduomenyse
atskiriami išgauti kandidatai, sėkmingai panaudoti kadrai ir pašalinti vaizdiniai
dublikatai.

Aiškiai pažymėtoje vaizdo įrašo dalyje galima paprašyti kontaktų lapo su laiko
žymomis. Tiltas sukuria ne didesnį kaip 4 stulpelių ir 16 kadrų JPEG tinklelį.
Kiekviename 512 pikselių langelyje šaltinio laiko žyma įrašoma didelio kontrasto
apatinėje juostoje, o tos pačios laiko žymos taip pat paliekamos tekstiniuose
metaduomenyse, kad vėliau būtų galima susieti ir audituoti. Visam JPEG ir toliau
taikoma 32 MiB riba. Jei `sharp` negali dekoduoti arba sukomponuoti tinklelio,
tiltas grįžta prie atskirų JPEG kadrų; kliento nutraukimas vis tiek perduodamas
lapo operacijai.

Paaukštinimą pagrindžiantys įrodymai sąmoningai atskirti nuo sintetinio
komponavimo mikronašumo testo. `scripts/perf/video-bridge-contact-sheet-eval.ts`
apibrėžia pagal schemos versiją valdomą A/B testavimo sistemą, skirtą tikriems
su OpenAI suderinamiems regos modeliams. Ji matuoja teikėjo nurodytus žetonus,
bendrąją faktinę delsą nuo pradžios iki pabaigos, įskaitant lapo komponavimą,
modelio iškvietimų skaičių ir manifeste apibrėžtų faktų išsaugojimą. Neapdoroti
modelio atsakymai į ataskaitą neįrašomi; išsaugomos tik SHA-256 santraukos ir
atitikusių faktų ID. Testavimo sistema nevykdo jokių tinklo ar mokamo modelio
iškvietimų, nebent perduotas `--execute-real` ir sukonfigūruoti `--model`,
`OMNIROUTE_BASE_URL` bei `OMNIROUTE_API_KEY`. Be tokio aiškiai nurodyto tikro
vykdymo jos mašininio nuskaitymo verdiktas lieka `HOLD`; vien sintetiniai
naudingosios apkrovos ar iškvietimų skaičiaus matavimai nėra paaukštinimą
pagrindžiantys įrodymai.

Skambinančiosios šalys gali prie palaikomos vaizdo įrašo dalies pridėti
pasirinktinį `transcript.cues` masyvą, jei jau turi pagal laiką sulygiuotą tekstą.
Kiekvienas segmentas turi turėti `text`, baigtinį `start` / `end` intervalą
nustatytos trukmės ribose ir į leidžiamųjų sąrašą įtrauktą `source` (`client`,
`embedded` arba `audio-bridge`); numatytoji `confidence` reikšmė yra `1`, ir ji
turi likti tarp `0` ir `1`. Visiškai vienodi segmentai sujungiami. OmniRoute
niekada nepradeda transkribavimo pagal šiuos metaduomenis: patikrinti segmentai
su šaltiniu, patikimumu ir intervalu nukopijuojami į aprašytą rezultatą ir
pateikiami kaip nepatikimi stebėjimai kartu su kadrų antraštėmis. Netinkamas,
už diapazono ribų esantis ar kilmės informacijos neturintis tekstas atmetamas,
užuot jį įmaišius į antraščių srautą. Abu užklausos turinio transkripcijos kanalai
normalizuoja pateiktą kilmę į `client`, įskaitant savarankiškai nurodytas
`embedded` arba `audio-bridge` žymas. Tik serverio valdomas adapteris gali
priskirti šias patikimas žymas naudodamas tik kode pasiekiamą argumentą
`trustedSource`; užklausos JSON laukas negali pasiekti šio argumento.
Transkripcijos tekstas išlieka nepatikimu iš medijos gautu turiniu, nepaisant jo
kilmės, ir niekada negali lemti autorizavimo.

Patyręs iškvietėjas tam pačiam vaizdo įrašui gali pateikti `audioTranscript` takelį;
jis laikomas kliento pateiktu tekstu, o ne serverio atliktos transkripcijos įrodymu.
Sujungimo sąsaja apdoroja vaizdo ir garso stebėjimus taikydama vieną
terminą bei nutraukimo signalą, išdėsto juos bendroje laiko juostoje, sutraukia
visiškai vienodus dublikatus ir pateikia dalinį rezultatą, kai sėkmingai apdorojama tik viena pusė.
Netinkamas `audioTranscript` paverčiamas tokiu daliniu rezultatu — vaizdo
aprašymas išlaikomas, o garso šakoje įrašomas išvalytas trikties kodas —
užuot nutraukus viso vaizdo įrašo apdorojimą. Kiekvienos šakos pasiekiamumas, dalinio rezultato žyma
ir išvalyti trikties kodai išsaugomi aprašytame rezultate, apsaugos priemonių
metaduomenyse (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), rezultatų podėlio metaduomenyse ir tilto
sujungimo skaitikliuose. Numatytasis Video Bridge kelias nekviečia kalbos vertimo į tekstą
ir neatsisiunčia antros medijos kopijos; be aiškiai pateikto tokio takelio jis lieka
skirtas tik vaizdo įrašui.

**Transkripcijos saugojimas (#12150 P1).** Tai automatiškai taikoma kiekvieną kartą, kai
Video Bridge (kurį patį reikia įjungti pasirinktinai) atvaizduoja transkripcijos žymę — atskiros
saugojimo žymos nėra. Kai užklausa atvaizduoja bet kokią transkripcijos žymę (iškvietėjo deklaruotą
`transcript` arba sujungtą `audioTranscript`), apsaugos priemonė pažymi ją kaip
`videoBridgeObserved` ir sukuria redaguotą vaizdo įrašo aprašo šešėlinę kopiją —
identišką atvaizdavimą, kuriame kiekvienos žymės laisvos formos teksto turinys pakeičiamas į
`[redacted-video-transcript]`; ji sukuriama pakeičiant struktūrinį žymės lauką
dar prieš suformuojant eilutę (niekada neanalizuojant suplotinto teksto, todėl joks žymės
turinys — nei priešiškas, nei įprastas, įskaitant turinį su `]`, pvz.,
`[inaudible]`/`[music]` — negali išlikti). Išsaugotame iškvietimų žurnalo užklausos turinyje
kiekviena iš vaizdo įrašo išvesta tekstinė dalis pakeičiama ta redaguota šešėline kopija,
atitiktį nustatant pagal turinio lygybę; `fullText` atrama iš naujo nuskaitoma iš užbaigtos
apsaugos priemonės prieš iškvietimą naudingosios apkrovos, todėl atitiktis išlieka sėkminga net vėliau
grandinėje esančioms apsaugos priemonėms (PII ir prisijungimo duomenų maskuokliams, kurių prioritetai 10/95)
vietoje perrašius aprašo tekstą ir sistemos raginimo / perdavimo / atminties įterpimui
pertvarkius pranešimų masyvą. Modeliui siunčiamas turinys nepakeičiamas. Stebėta užklausa taip pat
neužpildo ilgalaikės Memory (praleidžiamas išgavimas tiek iš užklausos, tiek iš atsakymo),
todėl paties modelio atsakymas negali nukopijuoti transkripcijos teksto į Memory.

**Neapdoroti vaizdo įrašo laukai (#12430).** Kai tiltas įjungtas, o savasis vaizdo įrašų palaikymas nežinomas arba jo nėra, apibrėžti `transcript`/`audioTranscript` laukai taip pat aktyvina `videoBridgeObserved`, net jei nepavyksta sukurti aprašo arba pasiekiamas `maxVideos` limitas. `null` ir tuščios eilutės įskaitomos; nesantys laukai ir su vaizdo įrašu nesusiję metaduomenys — ne. Išsaugotose kopijose šie laukai redaguojami arba užklausa praleidžiama, o podėliai / Memory apeinami.

Šiuose atsarginiuose keliuose tinkamos iškvietėjo žymės tampa palaikomomis `text`/`input_text`
dalimis, o ne nestandartiniais teikėjo laukais. Abu kartu su užklausa pateikti takeliai
ir toliau laikomi nepatikimais `client` stebėjimais, pateikiant aiškų įspėjimą, kad vaizdo įrašas
nebuvo aprašytas, o laiko žymos nebuvo patikrintos pagal mediją. Esami
256 žymių / 64 KiB bendri ir kiekvienos žymės biudžetai taikomi abiem takeliams kartu;
laiko žymos turi tilpti į tarpininko nustatytą 600 sekundžių ribą ir bet kokį pateiktą fokusavimo
intervalą. Netinkami takeliai atmetami, o ne persiunčiami kaip savavališkas tekstas; tinkamas
gretimas takelis vis tiek gali būti naudojamas, nebent viršijamas jų bendras biudžetas. `null` / tušti
laukai neprideda teksto. Šis atsarginis mechanizmas neprideda medijos gavimo ar transkripcijos.
Transkripcijos plėtinių laukai pašalinami iš atsarginio vaizdo įrašo konteinerio ir jo
`video_url`/`source` objektų. OpenAI perdavimo leidžiamųjų laukų sąrašas išlieka griežtas; nežinomo savojo
palaikymo vaizdo įrašų konteineriai lieka prieinami, o žinomos tik tekstą palaikančios paskirties sistemos išlaiko saugius žymeklius.
Struktūrinės redagavimo šešėlinės kopijos apsaugo pridėtą transkripcijos tekstą, o
pirminė iškvietėjui priklausanti užklausa lieka nepakeista. Paskirties sistemos, palaikančios savąjį formatą, ir
išjungti tiltai išlaiko esamą apėjimo elgseną.

Papildomose išsaugotose kopijose naudojamas tas pats stebėtos užklausos signalas. Neapdorotame
kliento užklausos momentiniame atvaizde prieš apsaugos priemonę, atmintyje laikomoje laukiančioje užklausoje ir ankstyvame
atmestos užklausos žurnale transkripcijos laukai vaizdo įrašo dalyse pakeičiami struktūriškai;
konvejerio etapų ir konteksto perdavimo susintetinti eilučių raginimai redaguojami
išsaugomo užklausos turinio paskirties vietoje. Išsaugotas `video_content_removed` žymeklis
priverčia `previous_response_id` tęsinį saugiai nutrūkti, užuot atkūrus tekstą,
kuris buvo sąmoningai pašalintas. Jei stebėta užklausa prieš registravimą žurnale praranda savo
kiekvienos dalies redagavimo šešėlinę kopiją arba jei po vėlesnių užklausos pakeitimų nepavyksta rasti atitikties
bent vienai iš kelių vaizdo įrašo šešėlinių kopijų, išsaugomas užklausos turinys
visiškai praleidžiamas, užuot išsaugojus tik iš dalies redaguotą transkripciją.

Stebėtos užklausos atveju modelio atsakyme gali būti pacituota bet kuri
transkripcijos dalis be struktūrinės žymės ribos. Todėl jos išsaugoto iškvietimų žurnalo
`responseBody` pakeičiamas praleidimo žymekliu; išsamus
konvejerio artefaktas (kuriame gali būti tiekėjo / kliento turinys ir srauto fragmentai)
neišsaugomas. Semantiniai, idempotentiškumo ir samprotavimo atkūrimo podėliai
apeina tos užklausos skaitymo ir rašymo operacijas. Teikėjo užklausa ir klientui matomas
atsakymas lieka nepakeisti. Ankstyvieji ryšio palaikymo baitai pašalinami iš laikinojo
buferio, kai išsamus artefaktas praleidžiamas. Kiro įspėjimas apie netinkamai suformuotą EventStream
nurodo tik naudingosios apkrovos baitų skaičių, niekada ne jos turinį ar neapdorotą JSON
analizatoriaus klaidą.
Tai nėra tvirtinimas, kad buvo patikrinta kiekviena nesusijusi teikėjo / papildinio diagnostika;
platesnė išsaugomų paskirties vietų peržiūra stebima #11658.

Vidinis `/api/modality-bridge/video/drilldown` gyvavimo ciklas yra atskiras,
grįžtamojo ryšio sąsaja / prieigos raktu autentifikuojamas podėlio posistemis. Kiekvienai operacijai taip pat būtinas
kanoninis neskaidrus pagrindinio subjekto ID. Prieš įgalinant produkcinį kviečiantįjį komponentą, jis turi
išvesti šį ID iš autentifikuoto nuomininko ir niekada nepersiųsti
kliento pasirinktos reikšmės. Podėlio raktai susieja tą pagrindinį subjektą su kanoniniais seanso ir
vaizdo įrašo nuorodos ID, saugo tik jų iš SHA-256 išvestus raktus ir apriboja tiek skaitymą,
tiek šalinimą tuo pačiu pagrindiniu subjektu. Podėlyje vienam įrašui saugoma ne daugiau kaip 16 išvestinių JPEG
kadrų, kurie nustoja galioti po dešimties minučių; taip pat palaikomas apribotas
skaitymas su `start`/`end` arba aiškus seanso pašalinimas.

Kiekvienam pagrindiniam subjektui leidžiama ne daugiau kaip 16 įrašų ir 64 MiB kanoninių JPEG duomenų. Šie
apribojimai nepriklauso nuo bendros 64 įrašų / 256 MiB ribos: esant pagrindinio subjekto kvotos
spaudimui, prieš svarstant visuotinį LRU išstūmimą pašalinami tik seniausiai naudoti to
pagrindinio subjekto įrašai. Atliekant veiksmus podėlyje, nebegaliojantys įrašai pašalinami tiek iš pagrindinio subjekto,
tiek iš bendros apskaitos, o atšaukimo ar patikros nesėkmės atveju
dalinis pakeitimas neįrašomas.

Podėlis atmeta nekanoninį Base64, perteklinį užpildą, ne JPEG mediją, netinkamos struktūros arba
trūkstamus JPEG failus ir JPEG failus, dėl kurių atliekant apribotą viso vaizdo `sharp`
dekodavimą pateikiamas įspėjimas. Kiekvienas priimtas vaizdas iš naujo užkoduojamas kaip kanoninis JPEG, jo plotis ir aukštis
išvedami iš dekoduotų baitų, užuot pasitikėjus kviečiančiojo pateiktais laukais, o visi gale esantys
poligloto baitai atmetami, o ne išsaugomi. Į abi kvotas įskaičiuojamas tik apribotas kanoninis suglaudintas buferis.
JSON perdavimo riba apima Base64 pridėtinę apimtį, taikomą 32 MiB
dekoduotos įvesties ribai. Kiekviename
išsaugotame išvestiniame rezultate įrašomi patvirtintas JPEG formatas / raiška, atrankos strategija,
išvedimo versija, sukūrimo laikas, serverio apskaičiuota turinio maiša ir maišos pavidalo pirminė
nuoroda kartu su patikimo kviečiančiojo pateikta pirminio turinio maiša. Atšaukimas tikrinamas
tarp asinchroninių dekodavimo / maišos skaičiavimo etapų, prieš atomiškai įrašant į podėlį.

Ši darbų dalis dar neprijungia produkcinio kūrėjo prie maršruto ir
nesuteikia kelių raiškų variantų pasirinkimo. Todėl skaidrus „Video Bridge“ užklausos
kelias neatlieka jokio papildomo darbo, o su nuomininku susieto pagrindinio subjekto išvedimas ir
visas FU-08 kelių raiškų gyvavimo ciklas lieka aiškiai įvardyti kaip būsimi darbai,
o ne dokumentuojami kaip visiškai įgyvendinta elgsena.

Kadrų antraštės nuosekliai generuojamos naudojant sukonfigūruotą „Video“ modelį. Tuščia
„Video“ perraša paveldi „Vision“ nuostatą; jei abi tuščios, „Vision“
automatinis maršruto parinkiklis pasirenka efektyvų modelį, palaikantį vaizdinę įvestį. Sėkmingai sugeneruotos antraštės
pakeičia pradinę dalį stabilia `[Video description:` pradžia, kuri taip pat
pažymi tekstą kaip nepatikimą, iš medijos išvestą stebėjimą ir nurodo tolesniems
modeliams nevykdyti medijoje rastų nurodymų. Kadrų antraščių podėlio raktai
apima JPEG baitus, užklausą, laiko žymą ir efektyvų modelį; podėlyje saugomos tik sėkmingai sugeneruotos
antraštės. Podėlio įrašuose išlaikomas faktinis sėkmingai rezultatą sukūręs modelis,
įskaitant atsarginį modelį; kai skirtingus kadrus sukūrė skirtingi modeliai,
tiltas pateikia `mixed`. Podėlio atitiktis pakartotinai naudoja to kūrėjo tapatybę,
užuot ją pervadinusi pagal užklausoje nurodytą maršruto parinkimo planą. Viso vaizdo įrašo rezultatų
podėlio raktas sudaromas pagal kiekvieną išvestį keičiančią įvestį — užklausą, efektyvų
modelį, atrankos strategiją, kadrų skaičių, semantinės analizės režimą, normalizuotos fokusavimo užuominos SHA-256
piršto atspaudą, fokusavimo langą, `transcript`,
`audioTranscript` ir kontaktų lapo žymą — todėl bet kurio iš šių
matmenų pakeitimas reiškia podėlio neatitiktį, o ne pasenusio rezultato pakartotinį naudojimą. Vaizdinio dublikatų šalinimo strategijos
versija, slenkstis ir apribotas kandidatų į kadrus skaičius taip pat aiškiai įtraukiami į
rezultatų podėlio raktą ir metaduomenis; todėl pakeitus strategiją negalima pakartotinai naudoti pasenusio
viso vaizdo įrašo aprašo. Rezultatų podėlio v4 metaduomenyse išsaugomi režimas ir
piršto atspaudas, bet niekada ne neapdorota naudotojo užduotis. Apsauginių ribojimų metaduomenyse nurodomi ir
užklaustas, ir efektyvus analizės režimai; užklaustas `focused` režimas be
tinkamo naudotojo teksto nurodomas kaip efektyviai `full`.

Apsauginis ribojimas išskiria kiekvieną palaikomą vaizdo įrašo dalį, tačiau aprašo ne daugiau nei
`modalityBridgeVideoMaxVideos`. Kai įrodyta, kad paskirties objektui
`supportsVideo === false`, nepavykę ir ribą viršijantys vaizdo įrašai pakeičiami aiškiomis saugiomis
teksto žymomis, kad neišliktų joks neapdorotas vaizdo įrašas. Kai galimybė nežinoma, tos dalys
išlaiko vaizdo įrašo laikmeną; bet kokia atsarginė transkripcija apdorojama pagal pirmiau aprašytą apribotą teksto
konvertavimą. Paskirties objektai, kuriems `supportsVideo === true`, apeina tiltą.
Kliento užklausos nutraukimo signalas perduodamas per atsisiuntimą, brokerio eilę,
poprocesius ir antraščių generavimo iškvietimus; nutraukus apdorojimas sustoja tarp vaizdo įrašų ir niekada
nepereina į nesaugų režimą, kuriame būtų perduodama neapdorota medija.

Vykdymo nuostatos saugomos DB ir tikrinamos naudojant Zod:

| Raktas                              | Numatytoji reikšmė | Diapazonas / veikimas                                                                                        |
| ----------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`            | Pasirenkama vykdymo aplinka, įjungiama naudotojo pasirinkimu                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`           | `full` išsaugo bendruosius aprašus; `focused` naudoja ribotą, nepatikimą naujausią naudotojo kontekstą       |
| `modalityBridgeVideoModel`          | `""`               | Paveldi Vision Bridge modelį                                                                                 |
| `modalityBridgeVideoFrameCount`     | `8`                | 1–16                                                                                                         |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`        | `uniform`, `scene_aware` arba proporcinis `segment_aware`; aptiktuvo trikties atveju grįžtama prie `uniform` |
| `modalityBridgeVideoMaxVideos`      | `1`                | 1–4                                                                                                          |
| `modalityBridgeVideoTimeout`        | `120000`           | 1000–120000 ms                                                                                               |

Senosios išsaugotos Video skirtojo laiko reikšmės, viršijančios 120 sekundžių,
apribojamos tarpininko galutiniu terminu; nauji nustatymų įrašai, viršijantys šią
ribą, atmetami. `GET /api/modality-bridge/video/runtime` prieš autentifikavimą ar
vykdymo aplinkos tikrinimą reikalauja patikimos, pažymėtos vietinės grįžtamojo
ryšio kilpos kilmės, o tada – valdymo autentifikavimo. Jis grąžina tik
`available`, išvalytas FFmpeg/ffprobe versijas ir fiksuotą priežastį, kai vykdymo
aplinka nepasiekiama. Vidinis išskleidimo galinis taškas nėra viešoji įkėlimo API:
kai eilė perpildyta, grąžinamas `503` ir `Retry-After`, skambinančiajai šaliai
atsijungus grąžinamas `499`, o pasiekus fiksuotą tarpininko galutinį terminą –
`504`. Konvertuoti atsakymai prie centrinės `x-omniroute-modality-bridge`
antraštės prideda `video->text;model=<visionModel>;parts=<videos>`, nepašalindami
Vision ar Audio segmentų.

### PII maskuoklis (`piiMasker.ts`)

Vykdomas **abiejuose** etapuose.

- **`preCall`** klonuoja duomenų turinį, pereina per `system`, `messages`,
  `input` ir `prompt` (įskaitant paprastas eilučių reikšmes) bei eilutės tipo
  `content`/`text` laukams pritaiko `processPII()` (iš
  `@/shared/utils/inputSanitizer`). Kai `PII_REDACTION_ENABLED=true`, aptikta PII
  paslepiama siunčiamame duomenų turinyje. Tai nepriklauso nuo
  `INPUT_SANITIZER_MODE` (kuris valdo tik raginimo įterpimo politiką). Kai
  slėpimas išjungtas, iškvietimas įrašo aptikimų skaičius nekeisdamas turinio.
- **`postCall`** giliai klonuoja atsakymą, paleidžia `sanitizePIIResponse()` ir
  Responses API formos maskuoklį (`maskResponsesOutput` — apima `output_text`
  ir `output[].content[].text`). Jei kas nors paslepiama, pakeistas atsakymas
  pakeičia pradinį.

Apsaugos priemonė niekada neblokuoja; ji tik prideda anotacijas
(`meta.detections`, `meta.redacted`) arba perrašo duomenis.

#### Pasirinkimas pagal tipą, pasirinktiniai šablonai ir aptikimų skaitikliai

**Valdymo skydas → Nustatymai → Saugumas → PII maskavimas** pasirenkama, _kas_
bus maskuojama. Tai neįjungia maskavimo: jį vis dar valdo
`PII_REDACTION_ENABLED` (užklausoms) ir `PII_RESPONSE_SANITIZATION` (atsakymams
bei SSE); abu pagal numatytuosius nustatymus yra išjungti.

- **Pasirinkimas pagal tipą** — integruoti identifikatoriai išvardyti
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`). Nenustačius taikomi
  visi tipai (taip sistema veikė iki atsirandant šiam nustatymui). Užklausų
  variklio `ssn_us` šablonas susiejamas su `ssn`. Šablonų rinkiniai (Minimal,
  Standard, Financial, Brazilian, USA, Full) tik pažymi žymimuosius langelius
  naudotojo sąsajoje.
- **Pasirinktiniai šablonai** — iki 20 reguliariųjų išraiškų arba pakaitos
  simbolių šablonų (`*` = iki 64 ne tarpo simbolių, `?` = vienas simbolis).
  Atitikmenys pakeičiami į `[CUSTOM_REDACTED]`. Kiekvienas šablonas apdorojamas
  naudojant `compilePiiCustomPattern()`
  (`src/shared/utils/piiCustomPatterns.ts`): ne daugiau kaip 500 simbolių,
  leidžiamos tik `g i m s u` žymos, šablonas turi būti sukompiliuojamas, turi
  išlaikyti `safe-regex` patikrą (katastrofiškas grįžimas) ir neturi atitikti
  tuščios eilutės ar slėpimo vietaženklio. Patikros neišlaikęs šablonas
  atmetamas jį įrašant ir testuojant, o neišlaikiusi išsaugota eilutė vykdymo
  metu praleidžiama jos nekompiliuojant. Pasirinktiniai šablonai vykdomi tik
  tada, kai maskavimas įjungtas.
- **Aptikimų skaitikliai** — pagal tipą suskirstyti skaičiai (atitikusios
  reikšmės niekada nesaugomos), laikomi atmintyje ir nustatomi iš naujo
  paleidus sistemą (`src/lib/pii/piiDetectionStats.ts`). Jie didėja tik tada,
  kai maskavimas įjungtas.

Nustatymai saugomi `key_value` lentelėje (vardų sritis `pii_settings`,
`src/lib/db/piiSettings.ts`) ir skaitomi naudojant 1 s podėlį. API:

| Metodas | Kelias                   | Paskirtis                                                                                  |
| ------- | ------------------------ | ------------------------------------------------------------------------------------------ |
| `GET`   | `/api/settings/pii`      | Vėliavėlių būsena, `enabledTypes`, `customPatterns`, aptikimų skaitikliai                  |
| `PUT`   | `/api/settings/pii`      | Pakeisti `enabledTypes` (`null` = visi) ir (arba) `customPatterns`                         |
| `POST`  | `/api/settings/pii/test` | Bandomasis vieno šablono paleidimas su ne didesniu kaip 8 KB pavyzdžiu; niekas neišsaugoma |

Visiems trims reikalingas valdymo autentifikavimas, o užklausos turinys
tikrinamas naudojant Zod (`src/shared/validation/schemas/piiSettings.ts`).

### Raginimo įterpimas (`promptInjection.ts`)

Aptinka priešiškas struktūras naudotojo pateiktame turinyje ir užtikrina
sukonfigūruotos politikos vykdymą. Veikimą lemia aplinkos kintamieji ir
konstruktoriaus parinktys:

| Nustatymas          | Aplinkos kintamasis                                                                                                         | Numatytoji reikšmė | Poveikis                                                                                                                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Įjungta             | `INPUT_SANITIZER_ENABLED`                                                                                                   | `true`             | Kai `false`, apsaugos mechanizmas nutraukia vykdymą.                                                                                                                                             |
| Režimas             | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                                             | `warn`             | Injekcijų politika: `block`, `warn` arba `log`. (`redact` priimamas dėl atgalinio suderinamumo, tačiau **nepašalina** injekcijos teksto; užklausos PII perrašymą valdo `PII_REDACTION_ENABLED`.) |
| Blokavimo slenkstis | `blockThreshold` parinktis / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alternatyvus pavadinimas `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`             | Mažiausias blokavimui reikalingas pavojingumo lygis. Naudojant numatytąsias nuostatas, vidutinis lygis tik stebimas.                                                                             |

**Režimo pirmumas** (`getMode`): iškvietėjo `options.mode` →
`INJECTION_GUARD_MODE` **DB funkcijos vėliavėlės perrašymas** (Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` aplinkos kintamasis → `INPUT_SANITIZER_MODE` aplinkos kintamasis →
`warn`. Todėl valdymo skydelio perrašymas turi pirmenybę prieš aplinkos
kintamuosius, tad Feature Flags naudotojo sąsaja valdo veikiančią apsaugą realiuoju
laiku (paleisti iš naujo nereikia). DB nuskaitymas yra atsparus klaidoms:
jei įvyksta klaida, apsauga grįžta prie aplinkos kintamaisiais pagrįstos elgsenos, o kai
perrašymas nenustatytas, elgsena yra tokia pati kaip naudojant tik aplinkos kintamuosius.

Aptikimo šaltiniai:

1. `sanitizeRequest()` iš `@/shared/utils/inputSanitizer` (bendras aptikimo
   priemonių rinkinys, naudojamas kitose konvejerio vietose).
2. Integruoti `DEFAULT_GUARD_PATTERNS` (šiuo metu `system_override_inline` ir
   `markdown_system_block`, abiejų pavojingumo lygis yra `high`).
3. Pasirenkami `customPatterns`, perduodami per konstruktoriaus parinktis (eilutės, reguliarieji
   reiškiniai arba `{ name, pattern, severity }` įrašai).

Kai `mode === "block"` **ir** bent vienas aptikimas pasiekia pavojingumo
slenkstį, `preCall` grąžina `{ block: true, message: "Request rejected:
suspicious content detected" }`. Veikiant `warn` / `log` režimais, apsaugos mechanizmas registruoja
įvykį žurnale, bet leidžia vykdyti iškvietimą. Bendroji pagalbinė funkcija `evaluatePromptInjection()` taip pat eksportuojama
iškvietėjams, kuriems reikia įvertinti raginimus nenaudojant registro.

**Nuskaitymo riba (v3.8.20):** aptikimo priemonė tikrina tik **pirmuosius 16 KB**
sujungto raginimo teksto — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 baitai) faile
`src/shared/utils/inputSanitizer.ts`. Tiek `detectInjection()`, tiek
`evaluatePromptInjection()` prieš vykdydamos šablonų ciklą iškviečia
`slice(0, MAX_INJECTION_SCAN_BYTES)`. Injekcijų direktyvos pateikiamos netoli įvesties
pradžios, todėl taip apribojamas reguliariųjų reiškinių CPU / GC naudojimas apdorojant kelių šimtų KB
duomenis, nesusilpninant aptikimo (žr. #3932, #4041).

### Prisijungimo duomenų maskuoklis (`credentialMasker.ts`)

Vykdomas **abiem** etapais, paskutinis numatytojoje grandinėje (prioritetas `95`). Pašalina
gerai žinomus API raktų / slaptųjų žetonų šablonus iš siunčiamų duomenų (pranešimo
turinio, įrankių iškvietimo argumentų, įrankių rezultatų) **ir** paslaugos teikėjo atsakymo, kad
į raginimą įklijuoti prisijungimo duomenys (arba įrankio rezultato pakartoti duomenys) nebūtų nutekinti
išoriniam paslaugos teikėjui arba atgal klientui.

- **Tik pasirenkamas įjungimas**, pagal tą pačią tvarką kaip PII redagavimas (susiję su griežtąja taisykle Nr. 20):
  išjungta, nebent `settings.credentialRedactionEnabled === true` **arba**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kai išjungta, apsaugos mechanizmas neatlieka jokių veiksmų —
  jis niekada neblokuoja ir nieko neperrašo.
- `redactCredentials()` pereina per visą naudingosios apkrovos / atsakymo medį (`walkValue()`,
  saugiai prototipo užteršimo atžvilgiu, saugiai ciklų atžvilgiu naudojant `WeakSet`) ir pakeičia atitikmenis
  vietos žyma `[REDACTED:<type>]`, klonuodama tik faktiškai pakeistas
  šakas.
- `CREDENTIAL_PATTERNS` apima LLM paslaugų teikėjų raktus (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS / SaaS žetonus (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), mokėjimų raktus (Stripe, Square), debesijos
  raktus (AWS prieigos raktą, Twilio, SendGrid, Mailgun), privačiuosius raktus / JWT,
  ryšio eilutes su prisijungimo duomenimis (`mongodb://user:pass@...` ir pan.) ir
  bendrąjį `Authorization` / `x-api-key` / `api-key` / `apikey` antraštės reikšmės
  šabloną. Į antraštes panašūs raktai (`authorization`, `x-api-key`, `api-key`,
  `apikey`) redaguojami struktūriškai (tik reikšmė, išsaugant schemos prefiksą, pvz.,
  `Bearer ` / `Basic `), o ne naudojant bendrąjį teksto reguliarųjį reiškinį.
- Apsaugos mechanizmas niekada neblokuoja; jis tik perrašo (`modifiedPayload` /
  `modifiedResponse`) ir prideda anotacijas (`meta.credentialsRedacted`, `meta.count`).

Regresijos apsauga: `tests/unit/credential-masker-guardrail.test.ts`.

## Bazinė sutartis (`base.ts`)

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
  block?: boolean; // true nutraukia grandinę
  message?: string; // pateikiamas blokuojant
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // grąžinamas iš preCall užklausai perrašyti
  modifiedResponse?: TValue; // grąžinamas iš postCall atsakymui perrašyti
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

Apsaugos priemonė nurodo, kad pakeitimų nėra, grąžindama `void`, `{}` arba
`{ block: false }`. Grąžinus `modifiedPayload` / `modifiedResponse`, grandine
perduodama reikšmė pakeičiama tolesnėms apsaugos priemonėms.
`signal?: AbortSignal` perduoda iškvietėjo gyvavimo ciklą apsaugos priemonėms. Užklausos nutraukimas yra sąmoninga „fail-open“ išimtis: medijos tarpininkai sustabdo darbą ir atlaisvina išteklius, neatkurdami neapdorotos medijos paskirties vietai, kuri, kaip žinoma, jos nepalaiko.

## Registras (`registry.ts`)

Vienintelis egzempliorius `guardrailRegistry` suteikia:

- `register(guardrail)` — prideda apsaugos priemonę (arba pakeičia pagal normalizuotą pavadinimą) ir
  iš naujo surikiuoja didėjančia `priority` tvarka.
- `clear()` / `list()` — administravimo pagalbinės funkcijos.
- `runPreCallHooks(payload, context)` — iteruoja aktyvias apsaugos priemones, perduoda
  naudingąją apkrovą per `modifiedPayload` ir sustoja ties pirmuoju `block: true`.
- `runPostCallHooks(response, context)` — tokia pati eiga atsakymo pusėje.
- `resetGuardrailsForTests({ registerDefaults })` — išvalo būseną ir pasirinktinai
  iš naujo užregistruoja numatytąsias apsaugos priemones, kad testai būtų visiškai izoliuoti.

Abi vykdymo funkcijos grąžina `{ blocked, payload|response, results, guardrail?, message? }`,
kur `results` yra `GuardrailExecutionResult` įrašų masyvas, apimantis kiekvienos
apsaugos priemonės laukus `blocked`, `skipped`, `modified`, `error` ir `meta`,
naudingus sekimui.

### Apsaugos priemonių išjungimas atskiroms užklausoms

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` surenka pasikartojimų
neturintį apsaugos priemonių, kurios turi būti praleistos vykdant dabartinę
užklausą, pavadinimų sąrašą. Šaltiniai (visi neprivalomi, visi sujungiami):

- `apiKeyInfo.disabledGuardrails`
- Užklausos turinio `disabledGuardrails` (aukščiausiu lygiu)
- Užklausos turinio `metadata.disabledGuardrails`
- Antraštė `x-omniroute-disabled-guardrails` (arba senoji
  `x-disabled-guardrails`)

Reikšmės gali būti eilučių masyvai arba kableliais atskirta eilutė; pavadinimai
normalizuojami į mažosiomis raidėmis rašomą kebabo stilių (`pii_masker` → `pii-masker`). Rezultatas
perduodamas registrui per `context.disabledGuardrails`, o registras praleidžia
atitinkančias apsaugos priemones (`skipped: true` lauke `results`).

## Vykdymo tvarka

Kiekvienai užklausai, perduodamai per `src/sse/handlers/chat.ts` ir
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` sudaro praleidžiamų apsaugos priemonių sąrašą pagal API raktą, užklausos turinį
   ir antraštes.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` vykdo apsaugos priemones didėjančia
   prioriteto tvarka:
   - Išjungtos apsaugos priemonės pažymimos kaip `skipped`.
   - Kiekvienos apsaugos priemonės `preCall` gali perrašyti naudingąją apkrovą per `modifiedPayload`.
   - Pirmasis `block: true` nutraukia grandinę, o apdorojimo programa grąžina
     apsaugos priemonės atmetimo atsakymą.
3. Galimai perrašyta naudingoji apkrova perduodama kombinuotajam maršrutizavimui ir išsiunčiama
   aukštesniojo lygio paslaugai.
4. Surinkus atsakymą, `guardrailRegistry.runPostCallHooks(...)`
   paleidžia tą pačią grandinę atsakymui. Šiame etape `block: true` atmeta aukštesniojo lygio paslaugos
   atsakymą.

Klaidą sukeliančios apsaugos priemonės pažymimos įrašu `error: <message>`, o klaida registruojama per
`logger.warn`, tačiau grandinė tęsiama — taip sąmoningai įgyvendinamas veikimo tęstinumas klaidos atveju.

## Konfigūracija

Integruotųjų apsaugos priemonių nuskaitomi aplinkos kintamieji:

| Kintamasis                            | Naudoja               | Poveikis                                                                                                                     |
| ------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`    | Nustačius `false`, aptikimas visiškai išjungiamas.                                                                           |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`    | Įterpimo politika: `warn`, `block` arba `log`. Ankstesnė reikšmė `redact` įterpimo teksto neperrašo.                         |
| `INJECTION_GUARD_MODE`                | `prompt-injection`    | Įterpimo apsaugos režimas; taip pat DB funkcijos vėliavėlė, kuri **perrašo** aplinkos kintamuosius (DB > ENV).               |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`    | Mažiausias griežtumo lygis, kurį `MODE=block` atmeta: `high` (numatytasis), `medium` arba `low`.                             |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`    | Ankstesnis `INPUT_SANITIZER_BLOCK_THRESHOLD` alternatyvus pavadinimas.                                                       |
| `PII_REDACTION_ENABLED`               | `pii-masker`          | Kai nustatyta `true`, užklausoje esanti asmens identifikavimo informacija užmaskuojama (nepriklausomai nuo įterpimo režimo). |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (toliau) | Valdo atsakymo pusės maskavimo priemonės veikimą.                                                                            |

„Modality Bridge“ apsaugos priemonės vykdymo konfigūraciją nuskaito iš DB pagrįstos nustatymų
saugyklos (`getSettings()`), o ne iš aplinkos kintamųjų. Pagrindiniai vaizdo apdorojimo raktai yra
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` ir
`modalityBridgeCacheMaxEntries`. Ankstesni
`visionBridge*` raktai priimami tik kaip dokumentuotas vieno ciklo nuskaitymo
atsarginis variantas; valdymo skydelio įrašymo operacijos naudoja pagrindinius raktus. Numatytosios reikšmės ir atsarginio varianto
sprendiklis yra faile `src/shared/constants/modalityBridgeDefaults.ts`, o ankstesnės
konstantos paliktos faile `src/shared/constants/visionBridgeDefaults.ts`.

Garso apdorojimas naudoja `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` ir `modalityBridgeAudioMaxClips` bei bendrus
`modalityBridgeCache*` nustatymus. Garso apdorojimas neturi atsarginio ankstesnių raktų varianto, nes šie
raktai buvo įtraukti kartu su „Modality Bridge“ schema.

Vaizdo įrašų apdorojimas naudoja `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` ir
`modalityBridgeVideoTimeout` bei bendrus `modalityBridgeCache*` nustatymus.
Pagal numatytuosius nustatymus jis išjungtas, nes FFmpeg/ffprobe yra pasirenkamos operacinės
priklausomybės, o kadrų aprašų generavimas padidina delsą ir modelio naudojimo sąnaudas.

## Pasirinktinės apsaugos priemonės

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

1. Sukurkite `src/lib/guardrails/myGuardrail.ts`, išplečiantį `BaseGuardrail`.
2. Įgyvendinkite `preCall` ir (arba) `postCall`.
3. Užregistruokite importavimo metu (įtraukite per `registerDefaultGuardrails`) arba
   vykdymo metu iškvieskite `guardrailRegistry.register(...)` — registras pakeičia
   bet kurią ankstesnę apsaugos priemonę tuo pačiu normalizuotu pavadinimu.
4. Pridėkite testus aplanke `tests/unit/` (esami pavyzdžiai:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testavimas

Tarp testų naudokite `resetGuardrailsForTests()`, kad pradėtumėte nuo žinomos būsenos.
Perduokite `{ registerDefaults: false }`, kad pradėtumėte nuo tuščio registro ir
užregistruotumėte tik testuojamas apsaugos priemones. „Vision Bridge“ palaiko priklausomybių
įterpimą (`deps.getSettings`, `deps.callVisionModel`); „Audio Bridge“ suteikia
atitinkamus sąsajos taškus nustatymams, galimybėms, STT modelio pasirinkimui, prisijungimo duomenų
patikroms ir transkripcijai. Todėl testais galima patikrinti abu srautus be prieigos
prie DB ar tinklo.

## Taip pat žr.

- `src/lib/guardrails/` — įgyvendinimas
- `src/shared/utils/inputSanitizer.ts` — bendras aptikimo mechanizmas, kuriuo grindžiami
  raginimų injekcijos aptikimas ir PII maskavimas
- `src/shared/constants/visionBridgeDefaults.ts` — numatytosios „Vision Bridge“ reikšmės ir
  priverstinio tilto modelių sąrašas
- `src/shared/constants/modalityBridgeDefaults.ts` — bendrosios „Vision“ / „Audio“ vykdymo aplinkos numatytosios reikšmės
- `docs/architecture/RESILIENCE_GUIDE.md` — nepriklausomas sluoksnis (grandinės pertraukiklis, atvėsimo laikotarpiai)
- `docs/reference/ENVIRONMENT.md` — išsamus aplinkos kintamųjų žinynas

## Injekcijos apsaugos maršrutų aprėptis ir „red-team“ testavimas (8 etapas · D blokas)

Injekcijos apsauga (`createInjectionGuard` / `withInjectionGuard`) apima visus maršrutus,
kurie priima naudotojų raginimus. Ji atsižvelgia į `INJECTION_GUARD_MODE` (numatytoji reikšmė `warn` = tik registruoti žurnale;
`block` = grąžina HTTP 400 `SECURITY_001`).

| Tipas           | Maršrutai                                                                                                                                            | Numatytasis režimas |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Tekstas (esami) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                |
| Generatyviniai  | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                |
| Duomenys        | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                |

Teksto išskyrimas (`extractMessageContents`) apima `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**„Red-team“ testavimas (kasnakt, `nightly-llm-security.yml`):** promptfoo patikrina, ar kiekvienas maršrutas blokuoja
OWASP-LLM rinkinį, kai `INJECTION_GUARD_MODE=block`; garak vykdo zondus (praleidžiama, jei nėra slaptojo rakto).
`moderations` įtrauktas nuoseklumo sumetimais — operatoriai, naudojantys blokavimo režimą, gali jam taikyti išimtį per
`resolveDisabledGuardrails`.

Kasnakt vykdoma darbo eiga (`.github/workflows/nightly-llm-security.yml`, cron + rankinis
paleidimas) turi dvi užduotis:

- **`promptfoo-guard` (blokuojanti)** — vykdo `promptfoo eval -c promptfooconfig.yaml`
  su `INJECTION_GUARD_MODE=block`. Kiekvienu priešišku atveju (pvz., „nepaisyk visų
  ankstesnių instrukcijų…“, DAN tipo apsaugos apėjimai) patvirtinama, kad atsakyme yra
  `error.code === "SECURITY_001"`, t. y. apsauga iš tikrųjų atmetė užklausą.
- **`garak` (patariamoji)** — vykdo garak `--probes promptinject,dan,leakreplay`
  vietiniame „OmniRoute“ egzemplioriuje (`http://localhost:20128/v1`). Vykdymas priklauso nuo
  teikėjo slaptojo rakto (`PROMPTFOO_PROVIDER_KEY`); jo nesant užduotis korektiškai praleidžiama, o pabaigoje pridėta
  `|| true`, todėl rezultatai pateikiami nesukeliant CI nesėkmės.

Apsaugos pagalbinės priemonės (`createInjectionGuard` / `withInjectionGuard`)
aprėptis apima kiekvieną raginimus priimantį `/v1` maršrutą; raginimo tekstas paimamas iš
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`, naudojant
`extractMessageContents()` faile `src/shared/utils/inputSanitizer.ts`.
