# Resilience Guide (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute turi tris skirtingus, bet susijusius atsparumo mechanizmus. Kiekvienas iš jų turi skirtingą taikymo sritį ir tikslą. Derindami maršruto elgesį laikykite juos atskirai.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Šaltinis: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Atsparumo perjungimo env-vs-dashboard pirmenybė.** Pasirenkamas atsparumas perjungiamas iš aplinkos — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — pateikia tik _numatytąjį_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Būlio reikšmė išliko `resilienceSettings` (prietaisų skydelis →** Nustatymai → atsparumas** / `PATCH /api/resilience`, saugomas `key_value`) laimi env reikšmę: normalizavimas (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) išsaugo saugomą loginę reikšmę, kai tik ji egzistuoja. Tokio env var nustatymas į `true` kai prietaisų skydelis jau išsaugojo `false` todėl niekas nekeičia — įjunkite jungiklį** Nustatymai → Atsparumas** (arba išvalykite išsaugotą lauką).

## 1. Tiekėjo grandinės pertraukiklis (circuit breaker)

**Apimtis:** visas tiekėjas (pvz., `glm`, `openai`, `anthropic`).

**Paskirtis:** nutraukti srauto siuntimą tiekėjui, kuris nuolat patiria gedimus paslaugos (upstream) lygmenyje.

**Įgyvendinimas:**

- Pagrindinė klasė: `src/shared/utils/circuitBreaker.ts`
- Integracija: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Būsenos API: `GET /api/monitoring/health`
- Atstatymo API: `POST /api/resilience/reset`
- Apvalkalai: `open-sse/services/accountFallback.ts`
- DB lentelė: `domain_circuit_breakers`

**Būsenos:**

- `CLOSED` — leidžiamas įprastas srautas
- `DEGRADED` — srautas vis dar leidžiamas, tačiau stebimas padidėjęs tiekėjo gedimų skaičius; grįžtama į `CLOSED` po pakankamo sėkmingų užklausų skaičiaus, po sėkmingo ryšio patikrinimo arba praėjus ilgiausiai paskutinio gedimo rūšies `OPEN` sulaikymo trukmei (jos `cooldownByKind` reikšmei, o jei jos nėra – `resetTimeout`, × `maxBackoffMultiplier`, bet ne mažiau kaip viena atvėsinimo trukmė) be naujo gedimo
- `OPEN` — tiekėjas laikinai užblokuojamas; kombinuotas maršrutizavimas jį praleidžia
- `HALF_OPEN` — atstatymo laikotarpis pasibaigė; leidžiama tiriamoji užklausa

**Konfigūruojamos numatytosios reikšmės (`open-sse/config/constants.ts`, rodomos skiltyje Valdymo skydas → Nustatymai → Atsparumas):**

| Klasė      | Pablogėjimas (`DEGRADED`) po | Atidarymas (`OPEN`) po | Atstatymo laikotarpis |
| ---------- | ---------------------------- | ---------------------- | --------------------- |
| OAuth      | 5 gedimų                     | 8 gedimų               | 60s                   |
| API raktas | 7 gedimų                     | 12 gedimų              | 30s                   |
| Vietinė    | išvestinė                    | 2 gedimų               | 15s                   |

`degradationThreshold` nulemia, kada tiekėjas pereina į `DEGRADED`; `failureThreshold` nulemia, kada grandinė atidaroma ir tiekėjas praleidžiamas. Vietinių tiekėjų profiliai Atsparumo nustatymų puslapyje dar nerodomi.

**Aktyvavimo kodai:** tik tiekėjo lygmens būsenų kodai `[408, 500, 502, 503, 504]`. Grandinė NETURI būti aktyvuojama dėl paskyros lygmens klaidų (dauguma 401/403/429 – jos priklauso atvėsinimo arba blokavimo mechanizmams).

**Tingusis atkūrimas:** pasibaigus `OPEN` laikotarpiui, `getStatus()`, `canExecute()`, `getRetryAfterMs()` atnaujina būseną į `HALF_OPEN`. Tie patys nuskaitymai (ir kitas gedimas) laipsniškai grąžina pasenusią `DEGRADED` būseną atgal į `CLOSED`. Foninis laikmatis nereikalingas.

---

### Pasirenkamas globalusis tiekėjų atvėsinimas (laiko lango užtvara)

Ketvirtas, **pasirenkamas** sluoksnis (`PROVIDER_COOLDOWN_ENABLED`, pagal numatymą **išjungtas**) išlaiko tarp užklausų išlikusią gedimus patiriančių tiekėjų atmintį faile
`open-sse/services/providerCooldownTracker.ts`, į kurią kreipiasi kombinuoto (combo) maršruto tikslų parinkimas, kad viena po kitos ateinančios combo užklausos nebebandytų ką tik sugedusio tiekėjo. Tiekėjo lygmens įrašai paiso `PROVIDER_PROFILES` laiko lango užtvaros:

| Profilis   | Aktyvuojama po (`providerFailureThreshold`) | Per (`providerFailureWindowMs`) | Atvėsinimo trukmė (`providerCooldownMs`) |
| ---------- | ------------------------------------------: | ------------------------------: | ---------------------------------------: |
| OAuth      |                                        `10` |                         `15min` |                                   `5min` |
| API raktas |                                        `15` |                         `30min` |                                  `10min` |

Neviršijus slenksčio, tiekėjas **nėra** laikomas atvėsinamu; sėkminga užklausa išvalo langą. Ryšio lygmens įrašai (`provider:connectionId`) vietoj to išlaiko eksponentinį `minRetryCooldownMs → maxRetryCooldownMs` atsitraukimą. Perrašymai:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regresijos apsauga: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Ryšio atvėsimas

**Apimtis:** vienas teikėjo ryšys / paskyra / raktas.

**Paskirtis:** praleisti vieną netinkamą raktą, kol kiti to paties teikėjo ryšiai toliau aptarnauja užklausas.

**Įgyvendinimas:**

- Pažymėjimas kaip nepasiekiamo: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pasirinkimas: `getProviderCredentials*` tame pačiame faile
- Atvėsimo skaičiavimas: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Nuostatos: `src/lib/resilience/settings.ts`

**Kiekvieno ryšio laukai:**

- `rateLimitedUntil` — laiko žyma, iki kurios galioja atvėsimas
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponentinio atidėjimo skaitiklis

**Numatytieji atvėsimo laikotarpiai:**

- OAuth bazinis: 5 s
- API rakto bazinis: 3 s
- API rakto 429: pirmenybė teikiama teikėjo `Retry-After` / atstatymo antraštėms / išanalizuojamam atstatymo tekstui
- Atidėjimas: `baseCooldownMs * 2 ** failureIndex`

**Pakartojimo delsa pagal teikėją.** Teikėjo išsamios informacijos puslapyje yra **Pakartojimo delsa** pasirinkimas (Automatinis,
nuo 15 s iki 1 val.). Jis išsaugo `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600, per `PATCH /api/resilience`). Kai ribojimo greičiu klaida neturi teikėjo perduoto pakartojimo
signalo, ši reikšmė pakeičia teikėjui pritaikytą atidėjimą ir nustato `backoffLevel` į 0
(`open-sse/services/rotationConfig.ts::overrideFor`). Ribojimo greičiu klaidos pirmenybės tvarka nuo didžiausios iki
mažiausios: teikėjo pakartojimo signalas, tada konkretaus ryšio `providerSpecificData.rotationOverrides.rateLimitResetSeconds`,
tada pakartojimo delsa pagal teikėją, tada aplinkos kintamasis `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, tada
pritaikytas atidėjimas. Automatinis režimas pašalina lauką. Tai taikoma tik ribojimo greičiu priežasčiai, niekada galinėms būsenoms.

**Apsauga nuo vienu metu kylančių užklausų:** neleidžia dėl vienu metu įvykusių klaidų pernelyg pratęsti atvėsimo arba dukart padidinti `backoffLevel`.

**429 klaidos dėl lygiagretumo ribos nekelia atidėjimo pakopomis.** `429`, kurio turinys nurodo
lygiagretumo ribą („per daug lygiagrečių užklausų“, „lygiagretumo riba“, „lygiagrečių užklausų
riba“, GLM `并发数过高`), reiškia, kad paskyra yra sveika, tačiau užimta.
`checkFallbackError()` grąžina priežastį `concurrency_limited`: iškart pereinama prie kito
ryšio, šis ryšys atvėsinamas fiksuotam `CONCURRENCY_LIMIT_COOLDOWN_MS` laikotarpiui (1 s) arba iki teikėjo nurodyto pakartojimo signalo,
`backoffLevel` lieka nepakeistas ir nustatoma `skipProviderBreaker`.
Aiškus kvotos turinys vis tiek turi pirmenybę, todėl turinys, atitinkantis ir kvotos šabloną,
lieka kvotos verdiktu. Aptikimas: `looksLikeConcurrencyLimit()` faile `src/shared/utils/classify429.ts`;
verdiktas: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (grandininio jungiklio
`FailureKind`) nepakeistas ir šiems turiniams vis dar nuskaito `rate_limit`.

**Srauto turinio strigimai neatvėsina paskyros.** Kai turinio strigimo stebėjimo mechanizmas
(`open-sse/utils/streamHandler.ts`) nutraukia srautą, kuris per nustatytą laiką nepateikė jokios modelio išvesties,
`markAccountUnavailable()` įrašo klaidą ryšyje, tačiau nenustato atvėsimo: strigimas priklauso nuo tos užklausos,
dažniausiai nuo ilgo samprotavimo etapo, kai išvestis dar nepateikta. Operatoriai gali pasirinktinai įjungti šią
funkciją naudodami `resilienceSettings.streamStallCooldown.enabled` (numatytoji reikšmė
`false`).

**Pasirinktinai įjungiamas delsos signalas `p2c` paskyros pasirinkimui.** Kiekvienas išsiųstas bandymas kiekvienam ryšiui
(ir kiekvienam ryšio bei modelio deriniui) registruoja laiką iki pirmo baito ir rezultatą atmintyje esančiame slenkančiame lange:
paskutiniai 20 pavyzdžių per 15 minučių
(`open-sse/services/connectionLatencyTracker.ts`, registruojama iš `safeLogEvents()` faile
`src/sse/handlers/chatHelpers.ts`). Kai `resilienceSettings.p2cLatency.weight` yra didesnis nei
`0` (diapazonas 0–20, numatytoji reikšmė `0` = išjungta), `compareP2CConnections()` faile `src/sse/services/auth.ts`
kiekvienam poros kandidatui prideda iki `weight` taškų. Pusė jų gaunama iš delsos kaip santykis su
greitesniu kandidatu (dvigubai lėtesnis kandidatas gauna visą pusę), o kita pusė — iš slenkančio klaidų dažnio.
Šis narys taikomas tik tada, kai abu kandidatai turi bent 3 pavyzdžius, todėl naujos paskyros nebaudžiamos,
o jo riba išlieka mažesnė už kvotos užblokuoto ir kvotos išeikvoto kandidato baudas. Jis nesukuria atskiro grandininio
jungiklio: nebesėkmingos paskyros vis tiek tvarkomos atvėsimo, blokavimo ir grandininio jungiklio sluoksniuose.
Nustatykite naudodami `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Samprotavimo kadrai iš naujo paleidžia turinio strigimo biudžetą.** Samprotaujantis modelis gali mąstyti
kelias minutes prieš pateikdamas pirmą matomą žetoną: Claude perduoda `thinking_delta` kadrus, kurių
samprotavimo tekstas gali būti tuščias, o Responses API perduoda vieną samprotavimo elementą po kito.
`isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) atpažįsta šiuos kadrus, o stebėjimo mechanizmas
iš naujo paleidžia savo biudžetą po kiekvieno kadro, užuot nutraukęs etapą. Jie vis tiek nėra modelio išvestis,
todėl etapas, pasibaigiantis vien samprotavimu, vis dar pranešamas kaip tuščias, o etapas, kuriame samprotavimas
baigiasi ir siunčiami tik signalai apie veikimą, vis tiek suaktyvina stebėjimo mechanizmą.

Kiro dvejetainiai `reasoningContentEvent` kadrai su netuščiu parašu išsaugo šią samprotavimo veiklą per vykdiklį kaip tuščią
`reasoning_content` deltą. Parašas neperduodamas. Metaduomenys, neužbaigti kadrai ir tušti parašai nepaleidžia
turinio biudžeto iš naujo; nepriklausomas aktyvaus srauto skirtasis laikas ir kliento atšaukimas vis tiek taikomi
(`open-sse/executors/kiro/reasoning.ts`).

**Galutinės būsenos (NE atvėrimai):**

- `banned` — nustatoma aptikus draudžiamą raktinį žodį / užblokuotą paskyrą (žr. [BAN_DETECTION](../security/BAN_DETECTION.md)). Teikėjo atmetimai pagal atskiras užklausas (`request_rejected`, pvz., Anthropic OAuth 403 „Request not allowed“) jos niekada nenustato: jie skaičiuojami pagal ryšį ir modelį, o tas modelis pašalinamas iš rotacijos taikant didėjantį atvėsimą, apribotą `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 val.), arba ryšys atvėsinamas, kai modelis nežinomas — `open-sse/services/requestRejectedStreak.ts`
- `expired` (po riboto pakartojimų skaičiaus pereina į galutinę būseną — `EXPIRED_RETRY_MAX = 3` su eksponentiniu atidėjimu — kad laikinos OAuth klaidos galėtų išsispręsti pačios prieš visam laikui išaktyvinant paskyrą)
- `credits_exhausted`

Šie nustatymai išlieka, kol pasikeičia kredencialai arba operatorius juos nustato iš naujo. Neperrašykite galutinių būsenų laikina aušinimo būsena.

**Lėtas atkūrimas:** kai `rateLimitedUntil` laikas praeina, ryšys vėl tampa tinkamas naudoti. Sėkmingai panaudojus, `clearAccountError()` išvalo visus klaidų laukus.

### Claude OAuth naudojimo riba: žemesnio prioriteto kanalas + seanso ribos nustatymas iš naujo

**Taikymo sritis:** vienas Claude prenumeratos (OAuth) ryšys. Abi funkcijos yra **pasirenkamos kiekvienam ryšiui** (Edit connection → Claude section → `lowPriorityMode` / `autoLimitReset` lauke `providerSpecificData`, abi pagal numatytuosius nustatymus išjungtos) ir atkartoja Claude Code komandas `/low-priority` bei `/limit-reset` (laidinis kontraktas užfiksuotas iš Claude Code 2.1.263).

**Įgyvendinimas:**

- Būsenų mašina ir atsakymų klasifikavimas: `open-sse/services/claudeLowPriority.ts`
- Nustatymo iš naujo būsenos / pretenzijos klientas: `open-sse/services/claudeLimitReset.ts`
- Vykdytojo kabliukas (antraštės įterpimas + pakartotinis bandymas su ta pačia paskyra): `open-sse/executors/base.ts::execute()`
- Pasirenkamas išsaugojimas: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Aktyviklis:** 5 valandų naudojimo riba — `429`, kurio antraštėse yra
`anthropic-ratelimit-unified-status: rejected` ir, kai paskyra tinkama, `anthropic-ratelimit-unified-slow-offer: treatment`. Iki pirmojo ribos `429` nieko nesiunčiama; serija `429` be suvienodintų antraščių apdorojama įprastu aušinimo keliu.

**Žemesnio prioriteto kanalas** (`lowPriorityMode`):

- Gavęs ribos `429`, vykdytojas priima pasiūlymą ir iš karto pakartoja užklausą su **ta pačia** paskyra, pridėdamas `anthropic-usage-limit: slow`; kanalas lieka aktyvus iki paskelbto `anthropic-ratelimit-unified-reset` laiko (+60 s atsargos), o kiekviena užklausa šiame lange turi šią antraštę. Perimtas `429` niekada nepasiekia `handleChatCore`, todėl ryšys **neperkeliamas į aušinimą** ir nėra pakeičiamas kitu.
- `anthropic-ratelimit-unified-slow-status` vėlesniuose atsakymuose: `active` / `not_needed` išlaiko kanalą; `slot_busy` (`429`) arba `529` laukia serverio nurodyto `anthropic-ratelimit-unified-slow-retry-after` (numatytoji reikšmė – 20 s, apribota nuo 5 iki 600 s, su ±30 % atsitiktiniu svyravimu) ir pakartoja užklausą, neviršydami `anthropic-ratelimit-unified-slow-max-wait` (numatytoji reikšmė – 20 min., apribota nuo 1 min. iki 6 val.) — pasibaigus šiam laikui kanalas baigiamas, o 10 minučių atvėsimo laikotarpis neleidžia jo priimti iš naujo. Laukimo laiką papildomai riboja likęs pačios užklausos pradinio prisijungimo laukimo laikas (`resolveFetchStartTimeout`, pagal numatytuosius nustatymus 10 min.) minus 5 s atsarga: be šio apribojimo numatytasis 20 minučių maksimalus laukimo laikas viršytų užklausos trukmę, miego režimas būtų nutrauktas laukimo viduryje, o vietoje sklandaus `max_wait` užbaigimo ir atvėsimo būtų pateikta `TimeoutError` klaida.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 valandų lango persikėlimas arba `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (tokiu atveju kanalas baigiamas kaip `extra_usage` esant bet kokiai būsenai, nes sieną dabar padengia mokamas viršijimas) užbaigia kanalą; tada atsakymas perduodamas įprastu aušinimo keliu. `budget_exhausted` būsena įsimenama iki paskelbto biudžeto nustatymo iš naujo laiko (ne ilgiau kaip 8 dienos).
- Ribos patikra vykdoma po paties vykdytojo 400 klaidomis grindžiamų pakartotinių bandymų tame pačiame bandyme (konteksto redagavimo, mąstymo / pastangų apribojimų, parametrų automatinio išmokimo), todėl ribos `429`, kuris pasirodo tik per vieną iš šių pakartotinių bandymų, vis tiek perimamas ir nepasiekia aušinimo kelio.
- Būsena laikoma atmintyje kiekvienam ryšiui (po paleidimo iš naujo reikia dar vieno ribos `429`, kad pasiūlymas būtų priimtas iš naujo).

**Seanso ribos nustatymas iš naujo** (`autoLimitReset`, kai abi funkcijos įjungtos, bandomas prieš kanalą):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` blokas; kai `arm: "reset"` ir `available: true`, siunčiamas `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` su `{ "program": "juniper_tide" }` (organizacijos UUID gaunamas iš `providerSpecificData.organizationUUID`, naudojant paleidimo atsarginį variantą).
- `result: reset|not_limited` → užklausa kartojama visu greičiu (be lėto režimo antraštės). `already_used` / `not_offered` įsimena `next_available_at` (pagal numatytuosius nustatymus – viena savaitė); bet kokia klaida sukelia 15 minučių laukimą. Nustatymas iš naujo atliekamas kartą per savaitę ir vis tiek įskaičiuojamas į savaitinę ribą.

Regresijos apsaugos: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Seanso susiejimas (#7274)

**Taikymo sritis:** viena kliento sesija (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` antraštė) susiejama su vienu ryšiu, nepriklausomai nuo teikėjo.

**Paskirtis:** išlaikyti kelių žingsnių agentą (Claude Code, aider, pasirinktinius agentus) toje pačioje paskyroje tarp užklausų, sumažinant konteksto praradimą keičiant paskyrą ir pasikartojančias šaltosios pradžios `429` klaidas teikėjuose, kuriuose sesijos būsena priklauso nuo paskyros.

**Įgyvendinimas:**

- TTL nustatymas: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Susieto ryšio parinkimas / sukūrimas: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Antraštės išgavimas (bendras, bet kuriam teikėjui): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Išsaugotų susiejimų lentelė: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Nustatymas: `sessionAffinityTtlMs` (visuotinis TTL milisekundėmis, `0` išjungia) — `src/lib/db/settings.ts`. Perkėlimo `124_generic_session_affinity_ttl.sql` pervadintas iš tik „Codex“ skirto `codexSessionAffinityTtlMs`; jis perkelia anksčiau sukonfigūruotą „Codex“ TTL kaip naująją numatytąją reikšmę.

Prieš #7274 `resolveSessionAffinityTtlMs()` kiekvienam teikėjui, išskyrus `codex`, iš karto grąžindavo `0`, todėl TTL nustatymas (ir sesijos antraštės) niekur kitur neturėjo poveikio, nors susiejimo mechanizmas ir antraščių išgavimas jau buvo nepriklausomi nuo teikėjo. Pataisa pašalino šį ankstyvą grįžimą; dabar TTL vienodai taikomas visiems teikėjams, kai tik visuotinai nustatomas didesnis nei `0`.

Trys seanso susiejimo antraštės niekada neperduodamos aukštesniam lygiui — vykdytojai kuria savo aukštesnio lygio antraštes nuo nulio, o ne perduoda kliento antraštes, todėl jos lieka tik vidiniu koreliacijos identifikatoriumi.

### Išskirtinės valdomo seanso ryšio nuomos kortelės

**Apimtis:** vienas aktyvus valdomas HTTP klientas / sesija valdo vieną tinkamą „OmniRoute“ ryšį.

**Paskirtis:** užtikrinti ilgalaikę išskirtinę ryšio nuosavybę klientams, kuriems tarp užklausų reikalinga griežta
maršrutizavimo riba. Tai skiriasi nuo sesijos afiniteto, kuris yra silpna tęstinumo pirmenybė:
išskirtinė nuoma išlieka gyvavimo ciklo būsena SQLite duomenų bazėje, užtikrina visuotinį aktyvių savininkų ir
aktyvių ryšių unikalumą ir atmeta pasenusią kartą prieš perduodant užklausą tiekėjui.

Ši funkcija pasirenkama kiekvienam API raktui. Valdomas raktas turi turėti `lease:exclusive` sritį ir
aiškų netuščią `allowedConnections` sąrašą. Gyvavimo ciklo galiniu tašku gali naudotis bet kuris HTTP klientas;
nereikalingas kliento pavadinimas, vartotojo agentas, tiekėjas, OAuth metodas ar modelis. Nuoma valdo ryšį,
o ne modelį, todėl pakeitus modelį susiejimas išlieka, kol ryšys tebėra įprastai tinkamas. Įprastos modelio,
kvotos, būklės, atvėsimo ir leidžiamų sąrašo taisyklės išlieka viršesnės ir gali perkelti tą pačią kartą į kitą
laisvą tinkamą ryšį.

Gyvavimo ciklą sudaro `POST /api/v1/session-leases` su JSON veiksmais `acquire`, `renew` ir `release`.
Valdomos išvados užklausos pateikia nepermatomą `X-OmniRoute-Lease-Owner` reikšmę ir tikslią
`X-OmniRoute-Lease-Generation` reikšmę. Savininkas naudoja `vlo_`, po kurio eina 43 base64url simboliai;
saugoma tik jo SHA-256 maiša. Kiekviena galutinio perdavimo tiekėjui riba taip pat susieja autentifikuoto
API rakto ID ir aktyvaus ryšio ID. Nuomos valdymo antraštės pašalinamos iš žurnalų, išsaugomų užklausų
momentinių kopijų ir išsiuntimo vykdytojo antraščių.

Jei įprastas maršrutizavimas turi tinkamų valdomų kandidatų, tačiau kiekvieną laisvą kandidatą užima kito
savininko aktyvi nuoma, „OmniRoute“ grąžina HTTP `429`, `lease-capacity-unavailable` kodą, laukimo dėl
pajėgumo būseną ir ribotą `Retry-After`, apskaičiuotą pagal anksčiausią reikšmingą galiojimo pabaigą.
Įprastas tinkamų kandidatų nebuvimas nėra nuomos varžymasis dėl pajėgumo, todėl išlaiko esamą maršrutizavimo
klaidų semantiką.

Susiję mechanizmai išlieka atskiri:

- OAuth sesijų užimtumas yra procesui lokalus minkštas OAuth paskyrų paskirstymas.
- Paskyrų semaforai suteikia užklausų lygiagretumo leidimus ir baigia galioti užklausai pasibaigus.
- Išskirtinės valdomų sesijų nuomos yra ilgalaikė gyvavimo ciklo nuosavybė su kartos riba.

## 3. Modelio blokavimas

**Apimtis:** teikėjo + ryšio + modelio trejetas.

**Rakto apimtis pagal būseną:** nepavykusi būsena nusprendžia, pagal kurį raktą įrašomas blokavimas (`resolveLockoutScope()` faile `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — kvotos arba teisių signalas — blokuojama **kvotų šeima**:
  codex atveju — visa `codex` / `spark` apimtis (visi ryšio `gpt-5*` modeliai),
  kitiems teikėjams — `getQuotaScopedModelForProvider()`.
- `404` blokuoja grynąjį modelį (`getModelLockKey()` susiaurina `not_found`).
- Bet kokia kita būsena — `5xx` transporto/serverio klaidos ir paties OmniRoute
  sugeneruotas `502` iš kokybės validacijos — blokuoja tik **tikslią**
  teikėjo/ryšio/modelio kombinaciją. Sugedęs srautas viename modelyje nėra įrodymas
  apie paskyros kvotą; prieš šią taisyklę vienas tuščias atsakymas iš
  `codex/gpt-5.6-luna` pašalindavo visus to ryšio `gpt-5*` modelius iš
  maršrutizavimo 2–30 min (eskaluojant), nors jų kvota liko nepaliesta.
- Skambintojo aiškiai nurodyta `scope` parinktis visada turi pirmenybę (Antigravity perduoda `"exact"`).

**Paskirtis:** išvengti viso ryšio išjungimo, kai nepasiekiamas arba kvotos apribotas tik vienas modelis.

**Pavyzdžiai:**

- Kiekvienam modeliui kvotas taikantys teikėjai, grąžinantys 429
- Vietiniai teikėjai, grąžinantys 404 dėl vieno trūkstamo modelio
- Konkretaus teikėjo režimo/modelio leidimų klaidos (pvz., Grok režimai)

**Įgyvendinimas:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Modelių atvėsimų skydelis (v3.8.0)

UI: Nustatymai → Modelių atvėsimai (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Išvardija aktyvius blokavimus su: provider, connection, model, reason, expiresAt. Operatoriai gali rankiniu būdu vėl įjungti modelį iš kortelės.

**REST API:**

- `GET /api/resilience/model-cooldowns` — aktyvių blokavimų sąrašas
- `DELETE /api/resilience/model-cooldowns` — rankinis vėl įjungimas. Turinys: `{provider, connection, model}`. Autentifikacija: management.

### Atvėsimų tvarkytuvė

UI: Stebėsena → Atvėsimų tvarkytuvė (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Vienas puslapis kiekvienam ryšiui, kuris pašalintas iš maršrutizavimo dėl laikinos
priežasties, užuot atidarius kiekvieno teikėjo puslapį. Jame išvardijami ryšių
atvėsimai, modelių blokavimai ir galutinės būsenos; juos galima išvalyti kiekvienam
ryšiui atskirai, pasirinktai grupei arba visiems teikėjo ryšiams, taip pat redaguojamos
dažniausiai derinamos atvėsimo taisyklės: `streamStallCooldown.enabled` ir OAuth / API rakto
`connectionCooldown` bazinis atvėsimas bei maksimalūs atsitraukimo žingsniai
(išsaugoma per `PATCH /api/resilience`). Galutinės būsenos (`banned`, `expired`,
`credits_exhausted`) išvardijamos, bet čia niekada neišvalomos.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentifikacija: management):

- `GET /api/resilience/cooldowns[?provider=]` — ryšiai su būsena, likusiu atvėsimu,
  atsitraukimo lygiu, paskutinės klaidos tipu ir modelių blokavimais (be kredencialų)
- `POST /api/resilience/cooldowns` — turinys `{connectionIds: string[]}` arba
  `{all: true, provider?}`; grąžina `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Blokavimo nustatymų UI + atkūrimas sėkmių mažinimo principu (v3.8.23)

Modelio blokavimas iš visada įjungto, užkoduoto elgesio tapo visiškai
konfigūruojama, pasirinktinai įjungiama funkcija su atskira nustatymų kortele ir
savigydos atkūrimo keliu.

**Nustatymų kortelė:** Nustatymai → Modelio blokavimas
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ji **skiriasi** nuo aukščiau minėtos tik skaitymui skirtos `ModelCooldownsCard`
(kuri tik _išvardija_ aktyvius blokavimus) — naujoji kortelė _konfigūruoja
parametrus_. Numatytosios reikšmės apibrėžtos `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Nustatymas              | Numatytoji reikšmė               | Reikšmė                                                                  |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Pagrindinis jungiklis — modelio blokavimas **pagal numatymą išjungtas**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Upstream būsenos, laikomos modelio apimties nesėkme.                     |
| `baseCooldownMs`        | `120_000` (120 s)                | Pradinė blokavimo trukmė už pirmą nesėkmę.                               |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Eskaluoto atvėsimo viršutinė riba.                                       |
| `maxBackoffSteps`       | `10`                             | Maksimalūs eksponentinio atsitraukimo eskalavimo žingsniai.              |
| `useExponentialBackoff` | `true`                           | Ar pasikartojančios nesėkmės eksponentiškai ilgina atvėsimą.             |

Nustatymai išsaugomi per įprastą nustatymų saugyklą ir tikrinami pagal
atsparumo nustatymų schemą; kortelė apriboja `baseCooldownMs`/`maxCooldownMs`
(su `maxCooldownMs ≥ baseCooldownMs`) ir `maxBackoffSteps`.

**Atkūrimas sėkmių mažinimo principu:** atkūrimas **nėra** vien tik laikmačio
pasibaigimas. Sveikas atsakymas mažina modelio nesėkmių skaičių, todėl modelis,
atsigavęs lango viduryje, nustoja eskaluotis (ir išsivalo) anksčiau, nei pasibaigtų
jo laikmatis. Sėkmingam combo taikiniui `open-sse/services/combo.ts` iškviečia
`decayModelFailureCount()` (`open-sse/services/accountFallback.ts`), kuri **perpus
sumažina** saugomą `failureCount` (`Math.floor(failureCount / 2)`); kai jis pasiekia
`0`, blokavimo įrašas visiškai ištrinamas. Atitinkamoji funkcija
`recordModelLockoutFailure()` didina skaičių (ir eskaluoja atvėsimą) esant
nesėkmėms eskalavimo lange. Šis sėkmių mažinimas veikia papildomai prie įprasto
laikmačio pasibaigimo — bet kuris iš šių kelių gali vėl įjungti modelį.

**Būsena:** blokavimai laikomi **operatyviojoje atmintyje** (kiekvieno proceso
`Map` struktūrose su `ModelLockoutEntry`, indeksuojamose raktu
`provider:connectionId:model`, o tikslios apimties blokavimai — raktu
`provider:connectionId:exact:model`), o ne išsaugomi
DB — jie prarandami paleidus iš naujo. _Nustatymai_ išsaugomi; aktyvi blokavimo
_būsena_ yra laikina.

---

## 4. Kvotos dalies lygiagretumo valdymas (v3.8.36)

Prenumeratos paskyros (GLM, MiniMax ir kt.) dažnai priima tik ~1–3 lygiagrečias
užklausas; viršijus šį skaičių suaktyvinamos 429 klaidos ir laukimo laikotarpiai. Tai ypač
aktualu naudojant **kvotos dalies** (`qtSd/…`) kombinacijas, kai keli API raktai
dalijasi viena pirmine paskyra. Trys sluoksniai neleidžia perpildyti bendrinamos paskyros.

### Lygiagrečių užklausų riba vienam ryšiui (`max_concurrent`)

Kiekvienas teikėjo ryšys gali deklaruoti `max_concurrent` ribą
(`provider_connections.max_concurrent`, nustatomą ryšio lange / API / DB).
Palikite lauką tuščią, jei riba nereikalinga. Tai vienintelis nustatymas, valdantis toliau
aprašytą serializavimo sluoksnį — nustatykite tikrąją paskyros lygiagretumo ribą
(pvz., GLM ~1, MiniMax ~2).

### Lygiagrečių užklausų ribos vienam modeliui (`modelConcurrency`)

Ryšys papildomai gali deklaruoti tikslias lygiagrečių užklausų vienam modeliui ribas
savo `rateLimitOverrides` žemėlapyje:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Nustatykite tai ryšio lange (**Rate limit overrides → Per-model
concurrency caps**, po vieną `model=cap` eilutėje) arba naudodami
`PATCH /api/providers/[id]` su tokia pačia JSON struktūra. Pagrindinė semantika:

- **Bendra ryšio ir konkretaus modelio riba:** `maxConcurrent` išlieka bendra
  visam ryšiui taikoma riba. Kai taikomos abi ribos, abu vartai įgyjami
  atomiškai tame pačiame sudėtiniame stale
  (`global → provider → account → model`); faktinį elgesį lemia griežtesnė
  taikoma riba.
- **Tikslus modelio rakto sutapimas:** raktas yra modelio eilutė, perduodama vykdikliui
  po maršrutizavimo išsprendimo — paprastai grynasis pirminio teikėjo modelio ID
  (`glm-5`), o ne kliento pusės `provider/model` pseudonimas (`zai/glm-5` nesutaps su
  `glm-5`). Reikšmės yra teigiamos sveikųjų skaičių lygiagrečių užklausų ribos.
- **Vietinė eilė, be aptikimo:** perteklinės užklausos dedamos į vietinę eilę pagal
  esamą eilės / skirtosios laiko trukmės semantiką (tipizuotos
  `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` priėmimo klaidos). OmniRoute neaptinka ir
  nenustato pirminio teikėjo politikos — jis taiko tikslias operatoriaus
  sukonfigūruotas ribas. Prisotintas modelio vartas niekada neišjungia teikėjo ir
  nesukuria nuolatinio modelio blokavimo; pirminio teikėjo 429 klaidų / laukimo
  laikotarpio / atsarginio maršruto elgsena išlieka atsarginiu klaidų valdymo mechanizmu.
- **Vieno ryšio ir vieno proceso apimtis:** ribos taikomos kiekvienam duomenų bazės
  ryšiui ir laikomos atmintyje, todėl du ryšiai, pakartotinai naudojantys tą patį
  pirminio teikėjo API raktą, tarpusavyje nesinchronizuojami.
- **Nesukonfigūruota reiškia, kad elgsena nesikeičia:** praleidus žemėlapį (arba
  palikus prietaisų skydelio lauką tuščią), modelio vartas nepridedamas. Pavyzdinė
  konfigūracija, nenustatanti jokios visuotinės teikėjo ribos:

```text
glm-5=1
glm-4.7=3
```

### Kvotos dalies užklausų serializavimas

Kai kvotos dalies išsiuntimas nukreipiamas į ryšį, kuriame deklaruota teigiama
`max_concurrent` reikšmė, lygiagrečios užklausos tai **paskyrai** serializuojamos per
vienam ryšiui skirtą semaforą (raktas `qsconn:<connectionId>`): perteklinės užklausos
**laukia eilėje**, užuot perpildžiusios paskyrą. Tai veikia **neuždarančiu režimu** —
prisotinta eilė arba skirtosios laiko trukmės pabaiga leidžia tęsti be vietos, o
išsiunčiama užklausa niekada neatmetama. Įjungimo parinktis:
**Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, pagal
numatytuosius nustatymus įjungta). Jei `max_concurrent` riba nenustatyta, elgsena
nesikeičia.

> Kvotos dalies maršrutizavimo vartai (`selectQuotaShareTarget`, DRR + P2C) patys
> veikia neuždaromuoju režimu ir tik _sumažina prioritetą_ ryšiui, pasiekusiam ribą —
> vieno ryšio telkinyje jie negali nustatyti griežtos ribos, todėl šis semaforas
> iš tikrųjų suvaldo perpildymą.

### Kombinacijos laukimo laikotarpiui pritaikytas pakartotinis bandymas

Naudojant bet kurią kombinacijos strategiją (kai ji įjungta), užklausa, dėl kurios
trumpu laikinu laukimo laikotarpiu susidarytų 429 klaida, palaukia jo pabaigos ir
išsiunčiama iš naujo, užuot grąžinus 429 klaidą — tai apima Gemini klasės TPM/RPM
langus (~60 s `retry-after`) kelių modelių kombinacijose, pvz., kai abiem 2 modelių
kombinacijos tikslams pasiekiama vieno modelio spartos riba. Laukimą riboja
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) skiltyje **Settings → Resilience**. Laukimas niekada netaikomas
`quota_exhausted` atveju (užrakinta iki vidurnakčio) arba dėl autentifikavimo /
nerasto objekto priežasčių.

Kombinacija gali atsisakyti šios funkcijos naudodama
`config.comboCooldownWaitEnabled: false`. Tik tiesioginė `false` reikšmė išjungia
šiuos bendrinamus kombinacijos laukimus (po išsiuntimo taikomą laukimą ir prieš
išsiuntimą taikomą grandinės atviros būsenos / modelio užrakto laukimą) bei jų
laukimo biudžeto skirtojo laiko trukmės apatinės ribos išplėtimą. Jei reikšmės nėra
arba nustatyta `true`, visuotinė politika išlaikoma; `true` negali įjungti visuotinai
išjungto laukimo. Aiškiai nustatytas `targetTimeoutMs` vis tiek turi pirmenybę.
Ši atsisakymo parinktis nekeičia atskiro įprasto Codex ėjimo prisegimo laukimo prieš
išsiuntimą.

Tas pats vartas apima ir atvejį prieš išsiuntimą (#16319): kai kiekvienas
kombinacijos tikslas praleidžiamas dar nepradėjus jokio bandymo, nes jo modelis yra
trumpai laikinai užrakintas, kelias be bandymų palaukia užrakto pabaigos pagal tas
pačias ribas ir išsiunčia iš naujo, užuot grąžinus užuominų neturintį
`503 ALL_TARGETS_SKIPPED`. Kai laukti negalima (pasiekta riba, išnaudotas bandymų
ar biudžeto limitas arba funkcija išjungta), galutinis atsakymas pakeičiamas į
`429 rate_limit_error`, kuriame pateikiami `retry_after` / `reset_at` iš
anksčiausio laikino modelio užrakto galiojimo pabaigos; kvotos, autentifikavimo ir
nerasto objekto užraktai išlaiko užuominų neturintį 503 atsakymą.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Užklausų eilės priėmimo kontrolė (v3.8.49 · problema #6593)

**Apimtis**: vietinė, pagal porą „teikėjas+ryšys“ taikoma užklausų tempo ribojimo eilė (`open-sse/services/rateLimitManager.ts`, paremta Bottleneck), esanti vienu sluoksniu žemiau trijų anksčiau aprašytų mechanizmų.

**`maxWaitMs` riboja laukimo eilėje laiką; `executionMaxWaitMs` riboja vykdymą.**
Šie du parametrai sąmoningai atskirti, ir nei vienas kito nevaldo.

`resilienceSettings.requestQueue.maxWaitMs` yra **laukimo eilėje biudžetas**: jis apima laukimo teikėjo laisvos vietos ir vėlesnį būvimą būsenoje QUEUED laiką, o jo laikmatis išvalomas tuo momentu, kai užduotis išeina iš QUEUED būsenos ir pradedama vykdyti (`rateLimitManager.ts`, `wrappedFn`). Užklausa, šį biudžetą viršijanti, niekada nepasiekia pirminio (upstream) serverio. Numatytoji reikšmė — 30000 ms; ją pateikia `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` faile `src/lib/resilience/settings.ts`, o užfiksuoja `tests/unit/ratelimit-admission-control-6593.test.ts`, todėl pakeitus šią reikšmę tas testas paraus, o ši pastraipa tyliai nepasens.

`resilienceSettings.requestQueue.executionMaxWaitMs` yra tai, ką Bottleneck gauna kaip užduoties `expiration`; šio laikmačio laikas pradedamas skaičiuoti tik po išsiuntimo (dispatch). Tai apsauginis ribojimas vykdytojams, kurie patys neturi upstream skirtuoju laiko, ir jis padidinamas iki paties vykdytojo fetch pradžios skirtuoju laiko, jei tas yra ilgesnis, todėl negali nutraukti sveiko, jau vykstančio atsakymo. Numatytoji reikšmė — 600000 ms (10 min.).

Eilės biudžeto padavimas į `expiration` yra tai, kas anksčiau nutraukdavo neinkrementinius šliuzus darbo eigoje — jie teisėtai veikia minutes iki pirmųjų baitų — ir būtent dėl to expiration paviršiuje pasirodo kaip `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), o eilės biudžetas turi eilės skirtuoju laiko kodą. Bet kurį iš jų galima pakeisti per `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (aplinkos kintamieji) arba valdymo pulte
(**Nustatymai → Atsparumas**). Normalizuojant abu apribojami nuo 1 ms iki 24 val.

**Pirmenybė abiem atvejais:** aplinkos kintamasis nustato tik _numatytąją_ reikšmę. Reikšmė, išsaugota
`resilienceSettings.requestQueue` (valdymo pulto / API pataisa, saugoma
`key_value`), turi pirmenybę prieš ją, o pagal ryšį nustatyta
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` — prieš pastarąją. Todėl nustačius aplinkos kintamąjį dieginyje, kuriame jau yra išsaugota reikšmė, niekas nepasikeičia — vietoj to išvalykite arba atnaujinkite išsaugotą nustatymą.

Buvimą eilėje riboja `maxWaitMs`; toliau aprašomas `maxQueueDepth` riboja, kiek kvietėjų vienu metu gali būti eilėje.

**Atsakymo kūne nurodyti pakartojimai: tempas arba blokavimas.** 429 atsakymo kūnas gali pats nurodyti laukimo laiką
(Gemini `RetryInfo.retryDelay`, tekstas „retry after Ns“), kurį nuskaito
`updateFromResponseBody`. Laukimo laikas, kuris telpa į ryšio `maxWaitMs`, yra tempas: ribotuvas tam laikui ištuština savo rezervuarą, o eilėje laukiančios užklausos išsiunčiamos, kai jis vėl pripildomas. Laukimo laikas, ilgesnis nei `maxWaitMs`, nėra kažkas, ko eilė galėtų išlaukti — Gemini į išnaudotą dienos kvotą atsako su
`retryDelay: "86399s"`. Perduota `Retry-After` ant atkurtos 429 klaidos (#16528) jau verčia atsarginį variklį užrakinti modelį tam laiko langui, tačiau papildomas ribotuvo pristabdymas tam pačiam laikui vis tiek sustabdytų bet kurį kvietimą, pasiekiantį raktą per anksti (pavyzdžiui, po atsparumo atstatymo), visam `maxWaitMs` laikui. Kai toks laukimo laikas gaunamas iš tipizuoto Google `RetryInfo`
elemento (kurio kilmė — `google_rpc_retry_info`) ir rakto ribotuvas jau yra priskirtas modeliui (žr. `getLimiterKey`), 429 vietoj to tampa modelio blokavimu tame ryšyje (`lockModelForLongBodyRetry` faile
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, apribota 24 val.), o ribotuvas paliekamas nepristabdytas. Paskyros pasirinkimas tą blokavimą praleidžia per
`isModelLocked()`, kaip ir combo išankstinio išsiuntimo kontrolė taikiniams, pririštiems prie ryšio. Antigravity, kurio ribotuvas taikomas pagal kvotų šeimą, blokavimas taikomas konkrečiam modeliui, kaip ir kiti jo kvotų blokavimai. Kliento prašytas vardas taip pat blokuojamas, kai pseudonimas jį išsprendė į tą modelį, nes tos patikros naudoja prašomą vardą; jis blokuojamas tiksliai (`lockExactModel`), todėl pseudonimas, kertantis antigravity kvotų šeimą arba codex apimtį, niekada neužrakina savojo. Laisvo teksto užuomina, netipizuotas `retryDelay` arba visam ryšiui bendras ribotuvas išsaugo pristabdymą. Kai ribotuvas, kurį ką tik atstatė 429 kelias, vis dėlto pristabdomas, kvietėjas, kurio likęs eilės laikas baigiasi anksčiau nei pristabdymas, iš karto atmetamas su eilės skirtuoju laiko kodu
(`checkLimiterPause`), o ne išlaukia to laiko; užfiksuota pabaiga pritvirtinama prie momentą prieš ribotuvo sukūrimą, kuriame Bottleneck pradeda savo atnaujinimo laiką, o bet koks vėlesnis rezervuaro pakeitimas ją užmiršta. Tai padengia
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` ir
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — pasirenkamas priėmimo apribojimas (nauja).** `resilienceSettings.requestQueue.maxQueueDepth`
riboja, kiek užklausų vienu metu gali laukti eilėje (dar neišsiųstų) vienam
teikėjui+ryšiui. Kai eilėje jau yra `maxQueueDepth`
užklausų, nauja užklausa greitai atmetama su tipizuota
`code: "RATE_LIMIT_QUEUE_FULL"` klaida **dar prieš** jai apskritai pasiekiant `limiter.schedule()`
— todėl atmetimas yra pigus ir įvyksta anksčiau nei bet koks tolesnis
tos užklausos prompt glaudinimo / vertimo darbas. Numatytoji reikšmė `0` =
išjungta, išsaugant esamą neribotos eilės elgesį; ribojama 0–100000.
Pakeiskite per `RATE_LIMIT_MAX_QUEUE_DEPTH` (aplinkos kintamąjį) arba
`resilienceSettings.requestQueue.maxQueueDepth` (valdymo pulto / API pataisa).

Pati priėmimo patikra yra grynoji funkcija
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), todėl
ją galima testuoti vienetais be tikro Bottleneck ribotuvo.

> RFC, kuris atvėrė #6593, taip pat pasiūlė `bypassCompressionOnRateLimit`
> vėliavėlę. Šio repo `open-sse/services/compression/` konvejeris yra
> prompt/konteksto glaudinimas išsiunčiamoje LLM užklausoje (`chatCore.ts`,
> maždaug ties `resolveCompressionSettings`/`selectCompressionStrategy` bloku),
> o ne HTTP atsakymo glaudinimas sintetintuose 429 atsakymų kūnuose — nėra
> atitinkamo kodo kelio tiesioginei aplenkimo vėliavėlei. Tas prompt
> glaudinimo žingsnis šiuo metu taip pat vykdomas _prieš_ `withRateLimit()`
> užklausų konvejeryje, todėl pertvarkymas, kad jis būtų praleidžiamas esant
> atmetimui dėl pilnos eilės, yra atskiras, didesnis pakeitimas nei šio issue
> apimtis; jis sąmoningai **ne**buvo įgyvendintas čia ir paliktas kaip tęstinis
> darbas, jei CPU taupymo nauda verta pertvarkymo rizikos.

### Užklausų dažnio ribojimo automatinio įjungimo apsauginis tinklas ir ryšių apsauga (`rateLimitProtection`)

**Automatinio įjungimo apsauginis tinklas** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, numatytoji reikšmė `true`):
Pagal numatymą OmniRoute automatiškai įjungia užklausų dažnio ribojimo eilės apsaugą visiems aktyviems API rakto teikėjo ryšiams (`getProviderCategory(provider) === "apikey"`). Tai užtikrina, kad gaunamos užklausos į dažniui jautrius išorinius API raktus yra dedamos į eilę ir ribojamos per Bottleneck, o ne staigiai plūsta ir sukelia išorines 429 klaidas. Apsauginį tinklą galima pakeisti per `RATE_LIMIT_AUTO_ENABLE` aplinkos kintamąjį (`false`/`0`/`off` išjungia, `true`/`1`/`on` priverstinai įjungia), kuris turi pirmenybę prieš išsaugotą valdymo skydo nustatymą (**Nustatymai → Atsparumas** / `PATCH /api/resilience`).

**Atskirų ryšių `rateLimitProtection` semantika:**
Atskirų ryšių užklausų dažnio ribojimo apsauga stebima per `rateLimitProtection` loginį lauką teikėjo ryšiuose (išsaugomą kaip `rate_limit_protection` SQLite):

- **Aiškiai įjungta (`rateLimitProtection === true`)**: Užklausų dažnio ribojimo apsauga aiškiai įjungta šiam ryšiui, nepriklausomai nuo teikėjo kategorijos ar to, ar automatinio įjungimo apsauginis tinklas įjungtas.
- **Aiškiai išjungta (`rateLimitProtection === false`)**: Išjungia aiškią apsaugą, bet **ne**išima aktyvaus API rakto ryšio iš globalaus automatinio įjungimo apsauginio tinklo. Funkcijoje `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) `false` ir `undefined` yra lygiaverčiai: tik `rateLimitProtection === true` laikomas aiškiu perrašymu. Jei `rateLimitProtection` yra `false` (arba nenustatytas), aktyvus API rakto ryšys vis tiek atitinka automatinio įjungimo sąlygą ir lieka apsaugotas užklausų dažnio ribojimo.
- **Nėra galimybės atsisakyti atskiram ryšiui**: Operatorius šiuo metu negali išreikšti „šis vienas aktyvus API rakto ryšys turi veikti be užklausų dažnio ribojimo eilės apsaugos“, išlaikydamas automatinį įjungimą aktyvų kitiems. Norint visiškai leisti API raktų ryšius be užklausų dažnio ribojimo eilių, apsauginis tinklas turi būti išjungtas globaliai (`RATE_LIMIT_AUTO_ENABLE=false` arba `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Palaikomi rašymo keliai:**

- **`POST /api/rate-limits`**: Palaikomas valdymo rašymo kelias, perjungiantis `rateLimitProtection` ryšiui (`{ connectionId: string, enabled: boolean }`). Iškvietus su `enabled: true` aiški apsauga įjungiama; iškvietus su `enabled: false` aiški apsauga pašalinama (nors aktyvūs API raktų ryšiai vis tiek lieka padengti globaliu apsauginiu tinklu, jei automatinis įjungimas įjungtas).
- **`PUT /api/providers/[id]`**: Sąmoningai **ne**priima ir neperjungia `rateLimitProtection` (#11278). Teikėjo ryšio metaduomenų atnaujinimas per `PUT /api/providers/[id]` niekada nepakeis išsaugotos užklausų dažnio ribojimo apsaugos būsenos.

---

## 6. Lėto srauto pralaidumo stebėjimo priemonė (#9709)

Pasirenkama `resilienceSettings.streamRecovery.throughputWatchdog` apsauga aptinka prieš srovę, kuri vis dar siunčia gabalus, bet sukuria asistento išvestį, mažesnį už sukonfigūruotą naudingos išvesties spartą. Jis sąmoningai skiriasi nuo tuščiosios eigos skirtojo laiko: širdies plakimai ir metaduomenys nenustato iš naujo nei laikmačio, nei pažanga. Tai taip pat skiriasi nuo sunkaus bandymo termino (#9153), kuris išlieka absoliučia saugia riba, nepaisant išvesties kokybės.

Kad sargybinis šuo galėtų nutraukti, jam reikalingas apšilimo laikotarpis, po kurio eina visas langas. Jis skaičiuoja teksto deltus iš pokalbių užbaigimų ir atsakymų API išvesties įvykių (konservatyvus UTF-8 baitų tarpinis serveris), nepaiso tik naudojimo ir tuščių įvykių ir sustabdo sprendimo priėmimą, kol vyksta įrankių iškvietimo ar samprotavimo įvykiai. Jis yra išjungtas pagal numatytuosius nustatymus ir gali būti įjungtas naudojant `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (ši env reikšmė tik įveda numatytąjį — laimi išsaugotas `resilienceSettings.streamRecovery.throughputWatchdog.enabled` loginis; žr. šio vadovo viršuje pateiktą pastabą dėl env-vs-dashboard pirmenybės); langas, apšilimas, minimalus greitis ir mažiausia išmatuojama galia yra apriboti įprasto atsparumo nustatymų normalizavimo sluoksniu.

Kai įjungta, stebėjimo nutraukimas taikomas tik aktyviam bandymui prieš srovę. Prieš bet kokius klientui matomus baitus, esamas tos pačios paskyros ankstyvo atkūrimo kelias gali iš naujo atidaryti bandymą. Po commit srautas niekada aklai neperleidžiamas; tik esama saugaus tarpinio srauto tęsimo sutartis gali susiūti galūnę. Užbaigimas lieka vienu kadru, todėl naudojimo apskaita ir semaforo išleidimas nesidubliuoja.

---

## 7. Upstream būsenos persakymas (klaidingai nurodytos kvotos klaidos)

**Apimtis:** vienas upstream šliuzas, kuris apie laikinai išsektą kvotą praneša neteisinga HTTP būsena.

**Paskirtis:** ištaisyti klaidingą būseną PRIEŠ klasifikavimą, kad vėlesni vartotojai (fallback variklis, combo agregavimas, klientui grąžinamas atsakymas) matytų tikrąjį pakartojamą klaidos pobūdį.

Kai kurie šliuzai LAIKINĄ kvotos išsekimą signalizuoja nepakartojama HTTP būsena. `agentrouter.org` grąžina `403` (kartais `400`) su kinų kalbos atsakymo tekstu (`用户额度不足` / `额度不足`) vietoj standartinio `429`. Klientai, tokie kaip Claude Code, `403` laiko nuolatine klaida ir nutraukia sesiją, o be pataisymo fallback variklis ją klasifikuotų kaip `AUTH_ERROR`, o ne kaip kvotos įvykį.

**Įgyvendinimas:**

- Registras + atitikties tikrintuvas: `open-sse/config/upstreamStatusRestatement.ts` — kiekvieno tiekėjo taisyklių sąrašas (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), tikrinamas per `applyStatusRestatement()`.
- Iškvietimo vieta: `providerFailure:` blokas faile `open-sse/handlers/chatCore.ts` (apie 3654 eilutę), iškart po to, kai `parseUpstreamError()` išanalizuoja upstream atsakymą su klaidos HTTP būsena (`!providerResponse.ok`), ir prieš prasidedant bet kokiam klasifikavimui, kad kiekvienas vėlesnis vartotojas matytų ištaisytą būseną. Klaidos, įterptos `200` SSE srauto viduje, eina atskiru, vėlesniu srauto analizavimo keliu ir šiandien šio kablio (hook) **nepasiekia** — tai žinomas apribojimas, kurio kol kas nereikia agentrouter klaidingai būsenai (kuri pasireiškia kaip klaidos HTTP būsena).
- Pakartojimo tinkamumas: `429` yra `RETRY_AFTER_ELIGIBLE_STATUSES` (`open-sse/services/combo/unavailableRetryGate.ts`), todėl persakyta klaida turi tikrą pakartojimo langą, o ne pasireiškia kaip negyva `403`.
- Sintetinė `60s` reikšmė `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) yra tik tai, ką persakytas atsakymas praneša **klientui**; tai nėra paties ryšio vidinė pertraukos (cooldown) / blokavimo trukmė — ją atskirai valdo tas mechanizmas, kuris iš tikrųjų apdoroja persakytą klaidą (Connection Cooldown eskaluojantis backoff, §2, bazinė `3s` API rakto tiekėjams; arba Model Lockout, §3, tiekėjams su kvota pagal modelį, kaip agentrouter). Maršrutizatorius viduje gali tapti tinkamu pakartojimui anksčiau nei per 60 s langą, kurį jis skelbia klientui — tai sąmoningas rezervas, o ne klaida.

Nuolatinės klaidos (agentrouter `无权访问模型` — nėra prieigos prie šio modelio) NIEKADA nepersakomos: `excludeMarkers` vetuoja taisyklę net tada, kai atitinka `textMarkers`, todėl klaida išlaiko pradinę būseną ir niekas jos nesikartoja amžinai. Atitinkama tiekėjo klasifikavimo taisyklė (`agentrouter-model-access-denied` faile `open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`, `scope: "model"`, deklaruota `6h` bazinė pertrauka) tikrinama `checkFallbackError` (`open-sse/services/accountFallback.ts`) _prieš_ bendrąjį apikey kategorijos `FORBIDDEN` ankstyvąjį grąžinimą, su sąlyga `honorsRuleLockScope(provider)` (#10334 — šiuo metu taikoma išskirtinai agentrouter per `HONORS_RULE_LOCK_SCOPE_PROVIDERS` leidžiamųjų sąrašą faile `providerErrorRules.ts`). Taisyklės deklaruota 6 val. pertrauka perduodama kaip `fallbackResult.baseCooldownMs`, tačiau ji vis tiek patenka į jau egzistuojantį blokavimo pagal modelio kvotą kelią (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, kurio #10334 nepakeitė, išskyrus pertraukos šaltinį): ji apribojama iki operatoriaus `mlSettings.maxCooldownMs` (numatytoji `1_800_000ms` / 30 min.), kaip ir bet kuris kitas modelio blokavimas, o _išsaugota blokavimo priežastis_ lieka ankstesnė užkoduota `"forbidden"`, o ne taisyklės `"auth_error"` — visoje grandinėje įgyvendinama tik pertraukos trukmė, o ne priežasties eilutė. Pats ryšys lieka aktyvus; gretimi modeliai tame pačiame ryšyje nepaveikiami.

Persakytos kvotos klaidos (`额度不足`) produkcijoje pasiekia tiekėjo taisyklę (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, be savo deklaruotos pertraukos — taikomas numatytasis persistencijos sluoksnio masteliuojamas backoff). Nuo #10334 `scope` reikšmė `ProviderErrorRuleMatch` YRA naudojama visoje grandinėje, tačiau **tik** tiekėjams iš `HONORS_RULE_LOCK_SCOPE_PROVIDERS` leidžiamųjų sąrašo (`providerErrorRules.ts` — šiandien tik `"agentrouter"`, kontroliuojama per `honorsRuleLockScope()`). Visiems kitiems tiekėjams `scope` lieka tik informatyvus, lygiai kaip iki #10334. `checkFallbackError` perduoda atitikusios taisyklės scope kaip `fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) yra bendroji apsauginė funkcija, patvirtinanti, kad `ruleScope` iš tiesų saugu taikyti kaip visam ryšiui skirtą, savaime atsistatantį signalą (scope `"connection"`, reason `quota_exhausted`, niekada `permanent`, niekada `creditsExhausted` — apsauga nuo galimos ateities taisyklės, kuri scope `"connection"` derintų su nuolatine paskyros būsena). Ją iškviečia du vartotojai:

- **Išlaikymas** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  vietoj to, kad patektų į passthrough teikėjo užrakinimo **pagal modelį**
  šaką (agentrouter yra `passthroughModels: true` → `hasPerModelQuota()`
  grąžina `true`), taikomas **laikinas ryšio atvėsimo laikotarpis** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, niekada ne galutinė būsena
  (`credits_exhausted`/`banned`/`expired`) — todėl ryšys atsistato savaime,
  pasibaigus atvėsimo laikotarpiui, užuot reikalavus rankinio kredencialų atstatymo.
  Praleidžiama ryšiams su `disableCooling: true` (#2997): šis atsisakymas
  vietoj to pereina į užrakinimą pagal modelį (dokumentuotas kompromisas —
  žr. kodo komentarą virš šakos).
- **To paties užklausos combo maršrutizavimas** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): tas pats saugiklis pažymi
  ryšį atmintyje esančioje `exhaustedConnections` aibėje, su raktu
  `${provider}:${connectionId}`. Tai praleidžia tik likusį TO PATIES UŽKLAUSOS
  tikslą, kuris _pats jau turi būtent tą `connectionId`_ savo tikslo objekte
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` prieš `exhaustedConnections` paiešką) — paprastas
  modelių sąrašo combo, kuriame gretimi tikslai neturi savo fiksuoto `connectionId`,
  o vienas iš jų nustatomas tik išsiuntimo metu iš atsakymo antraštės
  `X-OmniRoute-Selected-Connection-Id`, niekada nepasiekia šio rakto atitikties. Šiuo
  dažnu atveju tikroji apsauga nuo to, kad likęs etapas pakartotinai panaudotų
  ką tik išsemtą paskyrą, yra NĖRA ši aibė — tai aukščiau aprašytas išlaikymo
  sluoksnis (ryšio `rateLimitedUntil` dabar jau ateityje), kartu su tuo pačiu
  saugikliu, slopinančiu `transientRateLimitedProviders` šiai
  klaidai (žr. „Dviajų etapų dizainas" ir kodo komentarą ties
  `isAgentrouterConnectionQuotaScope` šaka `targetExhaustion.ts` faile): kai
  ši aibė lieka nepažymėta, `combo.ts` `allowRateLimitedConnection` priverstinis leidimas
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NEįsijungia
  teikėjo likusiems etapams, todėl kredencialų pasirinkimo `rateLimitedUntil`
  filtras (`src/sse/services/auth.ts:1238`) gerbiamas kaip įprasta, o
  likęs etapas arba pasirenka kitą, vis dar tinkamą agentrouter
  ryšį, arba nepavyksta dėl neprieinamų kredencialų — jis neveržia
  savęs atgal į ryšį, kurį ši šaka ką tik atvėsino.

### Dviajų etapų dizainas: būsenos perfrazavimas, tada klasifikavimas

Būsenos perfrazavimas (`upstreamStatusRestatement.ts`) ir teikėjo
klasifikavimo taisyklės (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) yra atskiri registrai, kurie abu kaip raktus naudoja teikėjo id
ir tekstinius žymenis, bet jie vykdomi skirtingose vietose ir tarnauja
skirtingiems tikslams: perfrazavimas perrašo HTTP būseną anksti `chatCore.ts` faile;
klasifikavimo taisyklės parenka atsarginę `reason` ir užrakina `scope`
(`model` / `provider` / `connection`) `checkFallbackError()` viduje
(`open-sse/services/accountFallback.ts`).

Klasifikavimo taisyklės mato visą klaidos **tekstą** (reikalingą kūno
žymenims, pvz., `额度不足`, atpažinti) tik teikėjams, įtrauktiems į `FULL_TEXT_RULE_PROVIDERS`
leidžiamųjų sąrašą `providerErrorRules.ts` faile — šiuo metu tik `"agentrouter"`. Kiekvienam
kitam **įtaisytajam katalogo** teikėjui `checkFallbackError` perduoda
`getProviderErrorRuleMatch` tik struktūrizuotą klaidą (`{code, type}`), kurios
užtenka taisyklėms, pagrįstoms antrašte/būsena/kodu, bet kuri akla kūno teksto žymenims.
Pagalbinė funkcija `resolveRuleMatchBody()` atlieka šį pasirinkimą: visas klaidos tekstas
leidžiamųjų sąraše esantiems teikėjams, priešingu atveju — struktūrizuota klaida. **Įtaisytojo**
teikėjo pridėjimas į `FULL_TEXT_RULE_PROVIDERS` yra aiškus kiekvienam teikėjui taikomas
opt-in — tai sukurta tam, kad numatytasis kelias kiekvienam teikėjui, neįtrauktam į
sąrašą, liktų nepakeistas baitas į baitą.

Taisyklės `scope` (`model` / `provider` / `connection`) yra atskiras opt-in,
nepriklausomas nuo `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` jį tik pateikia kaip
`fallbackResult.ruleScope`, o tolesni vartotojai gerbia jį kaip
ką nors daugiau nei informacinę žymę tik teikėjams, esantiems
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` leidžiamųjų sąraše tame pačiame faile (kontroliuojama per `honorsRuleLockScope()` — šiandien tik `"agentrouter"`). Žr. „Perfrazuotos kvotų
klaidos" aukščiau, ką iš tikrųjų daro `scope: "connection"` atitikmuo, kai
teikėjas jau yra tame leidžiamųjų sąraše.

**#11104 — operatoriaus deklaruotos taisyklės apeina abu leidžiamųjų sąrašus.** Operatorius gali
deklaruoti konkretaus teikėjo taisyklę vykdymo metu per `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
neredaguodamas šio failo. Operatoriaus taisyklės kontroliavimas per
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — leidžiamuosius
sąrašus, skirtus apsaugoti **numatytąją** įtaisytųjų katalogo taisyklių elgseną —
padarytų nustatymų mechanizmą neveiksmingą kiekvienam teikėjui, išskyrus jau
ten išvardytus, nes taisyklės deklaravimas jau savaime yra aiškus operatoriaus
opt-in. Tiek `resolveRuleMatchBody()`, tiek `honorsRuleLockScope()` pirmiausia tikrina
`hasOperatorRuleForProvider()`: teikėjas su operatoriaus taisykle gauna
nepdorotą klaidos tekstą, o jo deklaruota `scope` gerbiama, nepriklausomai nuo
to, ar jis taip pat yra kuriame nors iš leidžiamųjų sąrašų.

**Žinoma spraga — `providerRuleRegistry` niekada netikrinamas HTTP 400 atveju.**
`checkFallbackError` `BAD_REQUEST` šaka klasifikuoja 400 būseną visiškai
per savo šablonų masyvus (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` ir kt. `accountFallback.ts` faile) ir grąžina rezultatą prieš
pasiekiant virš jos esančią `configuredRule`/`getProviderErrorRuleMatch` šaką.
Įtaisytoji katalogo taisyklė (arba operatoriaus taisyklė) su `status: 400` yra
sintaksiškai galiojanti, bet niekada nesuveiks. Šiandien jokia esama taisyklė nėra
nukreipta į 400, todėl nieko produkcinėje aplinkoje tai neveikia — tačiau būsimai
400 taisyklei pirmiausia reikėtų pakeisti šią šaką, o tai yra didesnis
pakeitimas nei taisyklės pridėjimas (ji perklasifikuoja 400 kiekvienam teikėjui,
jau remiančiam šablonų masyvų elgsena) ir neįeina į vieno teikėjo
taisyklės pridėjimo apimtį.

### Naujo kvotą klaidingai nurodančio šliuzo pridėjimas

1. Užregistruokite vieną taisyklių masyvą `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers` išlaikykite
   specifinius konkrečiam tiekėjui; niekada pakartotinai nenaudokite bendrinių
   angliškų frazių, kurios sutampa su
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Pasirinktinai užregistruokite klasifikavimo taisykles
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`), kad būtų
   parinkta tinkama užrakto apimtis (`connection` – visai paskyrai galiojančiai
   kvotai, `model` – konkretaus modelio klaidoms). Šis žingsnis produkcijoje
   įsigalioja tik tiems tiekėjams, kurių taisyklėms reikalingas visas klaidos
   tekstas (body žymos): pridėkite tiekėjo id į `FULL_TEXT_RULE_PROVIDERS`
   tame pačiame faile – priešingu atveju `checkFallbackError` taisyklei visada
   perduos tik struktūrizuotą `{code, type}` klaidą ir body teksto taisyklė
   niekada neatitiks gyvojo srauto. Taisyklėms, kurios atitinka vien pagal
   `status`/`headers` (kaip Opencode ar Minimax), šio opt-in įgalinimo
   nereikia. Atskirai: jei taisyklė deklaruoja `scope: "connection"` ir
   tikslas yra tikras viso ryšio atvėsimas kartu su to paties užklausimo
   combo praleidimu (o ne vien informacinė žyma), pridėkite tiekėjo id į
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` tame pačiame faile – būtent tai valdo
   `isAgentrouterConnectionQuotaScope()` tipo apimties panaudojimą
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) ir
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); be to, `scope` vis tiek
   teka per `fallbackResult.ruleScope`, tačiau niekas pagal jį neveikia.
3. Pridėkite vienetų testus, atkartojančius
   `tests/unit/upstream-status-restatement.test.ts` ir
   `tests/unit/agentrouter-error-rules.test.ts` (įskaitant not-permanent /
   not-creditsExhausted apsaugas ir – jei tiekėjui reikalingas leidžiamųjų
   sąrašas – testą, patvirtinantį, kad `resolveRuleMatchBody()` grąžina visą
   tekstą tik tam tiekėjui).

Jokių `chatCore.ts`, `classifyError` ar combo pakeitimų nereikia.

#### Užraktas pagal išėjimo (egress) IP grupes (#10880)

Tiekėjai, įtraukti į `EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode šeima),
traktuojami kaip pagal IP grupes suskirstytas upstream (opencode nemokamas
lygmuo yra suskirstytas pagal IP, o ne pagal paskyrą – žr. #9611): 429
statuso atvejis, suklasifikuotas kaip `quota_exhausted` **arba**
`rate_limit_exceeded`, atvėsina kiekvieną leidžiamoje šeimoje esantį ryšį,
kurio paskutinis žinomas išėjimo IP sutampa su nepavykusio ryšio IP, dar prieš
rotacijai spėjant juos išbandyti – taip išvengiama N-1 garantuotai
nepavykstančių upstream užklausų (toks pats principas kaip #10460/#10525).
`rate_limit_exceeded` įtrauktas sąmoningai: `markAccountUnavailable` kelyje
opencode taisyklės niekada neatitinka (jokie headers/body neperduodami
`checkFallbackError`, opencode nėra `FULL_TEXT_RULE_PROVIDERS`), todėl 429,
kurio body turi prenumeratos kvotos tekstą ("monthly usage limit reached"),
yra suklasifikuojamas kaip `quota_exhausted` atsarginio klasifikavimo pagal
kvotos tekstą mechanizmo (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; 1 val. atvėsimas) dar prieš išvis pasiekiant
`status_429` taisyklę – tuo tarpu 429 be kvotos teksto (paprastas srauto
ribojimas) klasifikuojamas per `status_429` taisyklę kaip
`rate_limit_exceeded` ir vis tiek atvėsina IP šeimą. Leidžiamųjų sąraše
esančiam tiekėjui pagal IP grupę apribotas srautas yra toks pats signalas
kaip išseikusi kvota. Sąžiningi apribojimai:

- **Geriausių pastangų principas (best-effort)**: užraktas iš `proxy_logs`
  nustato prisijungimo paskutinį žinomą `egress_ip` (24 val. langas,
  sinchroniškai, be podėlio). Šaltas podėlis (išėjimo IP niekada nebuvo
  zonduotas) arba nėra eilutės → nepavykstantį prisijungimą šaka vis tiek
  atvėsina (užfiksuojama kaip ir dabar), tik joks brolinis prisijungimas
  neužrakinamas.
- **Niekada ne galutinė būsena**: atvėsimas yra atsinaujinantis kvotos langas
  (`testStatus: "unavailable"`); iš IP lygmens signalo niekada neišvedama
  nuolatinė būsena. `disableCooling` prisijungimai šaką visiškai praleidžia.
- **Užrakto grūdėtumas keičiasi leidžiamojo sąrašo šeimai**: tai apimties
  pakeitimas, ne tik brolinių prisijungimų optimizavimas. opencode yra
  `passthroughModels` tiekėjas, todėl iki šios šakos 429 sukeldavo užraktą
  pagal MODELĮ; dabar jis sukelia prisijungimo atvėsimą — įskaitant
  operatorių, naudojantį vienintelį prisijungimą visai be brolinių. Būtent
  tokį grūdėtumą opencode taisyklių lentelė jau deklaruoja kaip teisingą
  (`scope: "connection"`, `providerErrorRules.ts`), tačiau jo iki šiol
  niekada nebuvo laikomasi, nes opencode nėra įtrauktas į
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Šaka pati įrašo nepavykusio
  prisijungimo atvėsimą + `backoffLevel`, atkartodama prisijungimo apimties
  agentrouter šaką, ir grįžta — blokas pagal modelį ir toliau esantis
  bendrasis kelias niekada nepasiekiami.
- **Combo įtrauktas**: kaip ir agentrouter šaka, apimtis sąmoningai ignoruoja
  `persistUnavailableState`/`isCombo` švelninimą, kurį combo kvietėjas taiko 429. Užraktas pagal modelį nėra švelnesnė šios apimties forma — tai
  netinkamas vienetas: jis nieko nesako apie išsemtą IP, todėl combo
  rotacija ir toliau degintų po vieną garantuotai nepavykusį iškvietimą
  kiekvienam broliniam prisijungimui.
- **Brolinių prisijungimų sauga**: brolinis prisijungimas, jau esantis
  galutinėje būsenoje (banned/credits_exhausted) arba jau turintis ilgesnį
  atvėsimą, niekada neperrašomas.
- **Išskirtinis leidžiamasis sąrašas**: `EGRESS_BUCKETED_LOCK_PROVIDERS`
  plėtimas yra sąmoningas savininko sprendimas; jokio bendrojo sujungimo
  (šablonas #10334/#10419). Brolinių prisijungimų užklausa susieja tą patį
  leidžiamąjį sąrašą, o ne kartoja jo kaip SQL literalo, todėl jo plėtimas
  išlieka vienos eilutės pakeitimu.
- **Išėjimo IP rotacija abiem kryptimis**: paieškos langas (24 val.) yra daug
  platesnis nei išėjimo IP podėlio TTL (5 min.), todėl „paskutinis žinomas
  IP“ yra istorija, o ne dabartinė būsena. Jei prisijungimo proxy per tą
  langą pasikeitė, užraktas gali **praleisti** tikrai bendrinamą IP
  (užfiksuotas IP yra naujas, neišsemtas) — ir simetriškai gali **atvėsinti
  brolinį prisijungimą, kuris per tą laiką jau pasitraukė** nuo išsemto IP.
  Antruoju atveju tas brolinis prisijungimas praranda vieną atvėsimo langą;
  abu atvejai yra priimtini istorija pagrįstos, geriausių pastangų principu
  veikiančios paieškos apribojimai.
- **Kaina**: du apriboti `proxy_logs` skenavimai (pagal langą filtruojami per
  `idx_pl_timestamp`), tik 429 dažniu. Jokio naujo indekso (migracija 134
  YAGNI). Išmatuota vidutinio dydžio realaus srauto DB kopijoje; didelio
  pralaidumo instancija tame pačiame lange laiko proporcingai daugiau eilučių.

---

## Kitos atsparumo funkcijos

- **20 maršrutų parinkimo strategijų** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — žr. [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Atstatymą įvertinantis maršrutų parinkimas** (v3.8.0) — jungtims teikia pirmenybę pagal kvotos atstatymo laiką.
- **Foninio režimo degradacija** — Responses API `background: true` pakeičiamas į sinchroninį su įspėjimu.
- **Dinaminis įrankių limitų aptikimas** — laikinai atsisako teikėjų, kai pasiekiami įrankių skaičiaus limitai.
- **Avarinis atsarginis perjungimas** — valdomas per `OMNIROUTE_EMERGENCY_FALLBACK`; operatoriai gali jį pakeisti „Feature Flags“ puslapyje be paleidimo iš naujo.

---

## Derinimas

- Svertinis combo atsako `503 all_targets_cooling_down` (`Retry-After` nustatyta, `diagnostics.excluded` išvardija kiekvieną taikinį su `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → telkinys sukonfigūruotas ir prijungtas, tiesiog kiekvienas taikinys atmestas atsparumo laikmačio; įspėjimas `[COMBO] Weighted selection: every target excluded before dispatch — …` nurodo priežastis ir likusias sekundes. `404 no_executable_targets` iš to paties combo reiškia, kad atsparumo laikmatis nedalyvavo (nėra ką vykdyti arba visos paskyros neatlaikė pasiekiamumo patikros). Įgyvendinta `open-sse/services/combo/pinRecovery.ts` naudojant iš `targetResolution.ts` surinktas išimtis.
- Visi teikėjo raktai praleidžiami → patikrinkite tiek grandinės pertraukiklio būseną, TIEK kiekvienos jungties `rateLimitedUntil`/`testStatus`.
- Teikėjas visam laikui atmestas po atstatymo lango → kodas skaito neapdorotą `state` vietoj `getStatus()`/`canExecute()`.
- Vienas raktas nepavyksta, kiti turėtų veikti → pirmiausia tikrinkite jungties atvėsimą, o ne grandinės pertraukiklį.
- Nepavyksta tik vienas modelis → pirmiausia tikrinkite modelio blokavimą, o ne jungties atvėsimą.
- Būsena turėtų atsistatyti savaime, bet neatsistato → patikrinkite, ar nėra ateities laiko žymos ir ar skaitymo kelias atnaujina pasibaigusią būseną. Nuolatinės būsenos reikalauja rankinių pakeitimų.

---

## Vykdymo būsena — greitoji agento nuoroda

> Pažodžiui perkelta iš `AGENTS.md` → „Resilience Runtime State“ (PR #12743), kad agento
> vadovas neviršytų 40k konteksto biudžeto. Tai sutrumpinta, agentui skirta aukščiau
> esančių skyrių versija; sunumeruotieji skyriai išlieka pilnuoju šaltiniu.

OmniRoute turi tris susijusius, bet skirtingus laikinų gedimų mechanizmus. Derindami
maršrutų parinkimo elgseną laikykite jų taikymo sritis atskirai. Greitosios apžvalgos
žemėlapiui žr.
[3 sluoksnių atsparumo diagramą](../diagrams/exported/resilience-3layers.svg)
(šaltinis: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)).

### Teikėjo grandinės pertraukiklis

**Apimtis**: visas teikėjas, pvz., `glm`, `openai`, `anthropic`.

**Paskirtis**: nustoti siųsti srautą teikėjui, kuris nuolat patiria gedimus aukštesniojo
srauto / paslaugos lygyje, kad vienas nesveikas teikėjas nelėtintų kiekvienos užklausos.

**Įgyvendinimas**:

- Pagrindinė klasė: `src/shared/utils/circuitBreaker.ts`
- Pokalbio praleidimo / vykdymo sujungimas: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Vykdymo būsenos API: `src/app/api/monitoring/health/route.ts`
- Bendrieji apvalkalai: `open-sse/services/accountFallback.ts`
- Išsaugota būsenų lentelė: `domain_circuit_breakers`

**Būsenos** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: leidžiamas įprastas srautas.
- `DEGRADED`: ankstyvojo įspėjimo juosta — gedimai peržengė degradacijos slenkstį, bet dar
  ne pertraukiklio slenkstį; srautas vis dar teka, suvestinės rodo įspėjimą. Sėkmingas
  jungties testas arba ramus langas be naujų gedimų grąžina ją į `CLOSED`
  (langas aprašytas `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: teikėjas laikinai užblokuotas; iškvietėjai gauna „provider-circuit-open“ atsakymą
  arba combo maršrutų parinkimas pereina prie kito taikinio.
- `HALF_OPEN`: atstatymo laikas baigėsi; leidžiama bandomoji užklausa. Sėkmė uždaro
  pertraukiklį, nesėkmė vėl jį atidaro.

**Numatytieji** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, naudojama per
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` faile `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` faile `src/sse/handlers/chatHelpers.ts`). Viso teikėjo
pertraukiklis veikia pagal `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profilis   | degraduoja nuo | atsidaro nuo (`circuitBreakerThreshold`) | atstatymas (`circuitBreakerReset`) |
| ---------- | -------------: | ---------------------------------------: | ---------------------------------: |
| OAuth      |            `5` |                                      `8` |                              `60s` |
| API raktas |            `7` |                                     `12` |                              `30s` |
| Vietinis   |    (išvestinė) |                                      `2` |                              `15s` |

`PROVIDER_PROFILES` taip pat apibrėžia `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) ir `providerCooldownMs` (5/10/1 min): jie maitina
**pasirenkamo globalaus teikėjo atvėsimo (Provider Cooldown) lango kontrolę**
(`PROVIDER_COOLDOWN_ENABLED`, pagal numatymą išjungta) — teikėjo lygio įrašas
`open-sse/services/providerCooldownTracker.ts` laikomas vėstančiu tik po
`providerFailureThreshold` gedimų per `providerFailureWindowMs`, o tada vėsta
`providerCooldownMs` trukmę. Tai NĖRA aktyvaus pertraukiklio slenksčiai — nederinkite jų
tikėdamiesi pertraukiklio elgsenos. Kiekvieną numatytąją reikšmę galima pakeisti per
`OMNIROUTE_PROVIDER_BREAKER_*` ir `OMNIROUTE_CIRCUIT_BREAKER_*` aplinkos kintamuosius;
tiksli vykdymo laiko nuorodų lentelė yra `docs/architecture/RESILIENCE_GUIDE.md`.

Teikėjo pertraukiklį turėtų suaktyvinti tik teikėjo lygio gedimų būsenos:

```ts
(408, 500, 502, 503, 504);
```

Neaktyvinkite viso teikėjo pertraukiklio dėl įprastų paskyros / rakto / modelio klaidų,
kaip kad dauguma `401`, `403` ar `429` atvejų. Jos paprastai priklauso jungties atvėsimo
arba modelio blokavimo sričiai. Bendrojo API rakto teikėjo `403` turėtų būti atstatoma,
nebent ji klasifikuojama kaip galutinė teikėjo / paskyros klaida.

Pertraukiklis naudoja tingųjį atsistatymą (lazy recovery), o ne foninį laikmatį. Kai `OPEN`
laikas baigiasi, skaitymai, tokie kaip `getStatus()`, `canExecute()` ir
`getRetryAfterMs()`, atnaujina būseną į `HALF_OPEN`, todėl suvestinės ir combo
kandidatų kūrėjai nebeišskiria pasibaigusio providerio amžiams.

### Jungties atvėsimas

**Apimtis**: viena providerio jungtis/paskyra/raktas.

**Paskirtis**: laikinai praleisti vieną netinkamą raktą/paskyrą, tuo pačiu leidžiant
kitoms to paties providerio jungtims ir toliau aptarnauti užklausas.

**Įgyvendinimas**:

- Įrašymo/atnaujinimo kelias: `src/sse/services/auth.ts::markAccountUnavailable()`
- Paskyrų pasirinkimas/filtravimas: `src/sse/services/auth.ts::getProviderCredentials...`
- Atvėsimo skaičiavimas: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Nustatymai: `src/lib/resilience/settings.ts`

Svarbūs providerio jungčių laukai:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Paskyros pasirinkimo metu jungtis praleidžiama, kol:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Atvėsimai taip pat yra tingūs: kai `rateLimitedUntil` yra praeityje, jungtis vėl tampa
tinkama. Sėkmingai panaudojus, `clearAccountError()` išvalo `testStatus`,
`rateLimitedUntil`, klaidų laukus ir `backoffLevel`.

Numatytoji jungties atvėsimo elgsena:

- OAuth bazinis atvėsimas: `5s`.
- API rakto bazinis atvėsimas: `3s`.
- API rakto `429` atveju, kai įmanoma, pirmenybė turėtų būti teikiama pirminio šaltinio
  (upstream) pakartotinio bandymo užuominoms (`Retry-After`, reset antraštėms arba
  analizuojamam reset tekstui).
- Kartotiniams atstatomiems gedimams naudojamas eksponentinis atidėjimas (exponential
  backoff):

```ts
baseCooldownMs * 2 ** failureIndex;
```

Apsauga nuo „thundering herd" (minios antplūdžio) neleidžia lygiagretiems gedimams toje
pačioje jungtyje pakartotinai pratęsti atvėsimo arba dukart padidinti `backoffLevel`.

Galutinės būsenos nėra atvėsimai. `banned`, `expired` (kuri tampa galutine tik po N
ribotų pakartotinių bandymų per `EXPIRED_RETRY_MAX`) ir `credits_exhausted` skirtos
likti nepasiekiamos, kol pasikeis kredencialai/nustatymai arba operatorius jas
atstatys. Nepalikite galutinių būsenų perrašytas laikina atvėsimo būsena.

### Modelio blokavimas

**Apimtis**: provideris + jungtis + modelis.

**Paskirtis**: išvengti visos jungties išjungimo, kai tik vienas modelis tai jungčiai
yra nepasiekiamas arba apribotas kvotos.

Pavyzdžiai:

- Provideriai su kvotomis pagal modelį, grąžinantys `429`.
- Vietiniai provideriai, grąžinantys `404` vienam trūkstamam modeliui.
- Konkrečiam provideriui būdingi režimo/modelio leidimų gedimai, pavyzdžiui, tam tikri
  Grok režimai.

Modelio blokavimas įgyvendintas `open-sse/services/accountFallback.ts` ir leidžia tai
pačiai jungčiai toliau aptarnauti kitus modelius.

### Derinimo gairės

- Jei visi providerio raktai praleidžiami, patikrinkite tiek providerio pertraukiklio
  būseną, tiek kiekvienos jungties `rateLimitedUntil`/`testStatus`.
- Jei provideris po atstatymo lango atrodo visam laikui išskirtas, patikrinkite, ar
  kodas nuskaito neapdorotą `state`, o ne naudoja `getStatus()`/`canExecute()`.
- Jei vienas providerio raktas nepavyksta, bet kiti turėtų veikti, teikite pirmenybę
  jungties atvėsimui, o ne providerio pertraukikliui.
- Jei nepavyksta tik vienas modelis, teikite pirmenybę modelio blokavimui, o ne
  jungties atvėsimui.
- Jei būsena turėtų atsistatyti savaime, ji turėtų turėti būsimą laiko žymą/atstatymo
  laiką ir skaitymo kelią, kuris atnaujina pasibaigusią būseną. Nuolatinės būsenos
  reikalauja rankinių kredencialų ar konfigūracijos pakeitimų.

---

## TLS atspaudų fiksavimas ir slėpimasis

Nuo tiekėjo priklausantis slėpimasis (JA3/JA4, CCH, obfuskacija) dokumentuojamas atskirai — žr. `docs/security/STEALTH_GUIDE.md` (git; nekompiliuojama į `/docs`).

---

## Atsparumo testavimas (8 fazė · C blokas)

Be atsparumo logikos vienetų testų, trys testai tikrina vykdymo aplinką
realiomis apkrovos / gedimo sąlygomis (visi — integraciniai / naktiniai, nė vienas neblokuoja PR):

| Testas         | Aprašymas                                                                                                                                                                                                                        | Paleidimas                                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Chaos          | Netikras (fake) upstream mazgas sukelia realią delsą / atstatymą / laiko limitą / 503; patikrina, ar grandinės pertraukiklis atsidaro ir atsistato, o `checkFallbackError` klasifikuoja 503 kaip atkuriamą atsarginį perjungimą. | `RUN_CHAOS_INT=1 npm run test:chaos`      |
| Krūvos augimas | ~500 srautų vienam `createSSEStream` su `--expose-gc`; nepavyksta, jei krūva (heap) viršija leistiną ribą (OOM apsauga #3069).                                                                                                   | `npm run test:heap`                       |
| k6 soak        | Ilgalaikė apkrova `/api/monitoring/health`; p95 / klaidų slenksčiai.                                                                                                                                                             | `k6 run tests/load/k6-soak.js` (naktinis) |

Orchestruoja `.github/workflows/nightly-resilience.yml` (cron + dispatch). Numatytojo
`test:integration` metu chaos ir heap testai savaime praleidžiami (be `RUN_CHAOS_INT` / `--expose-gc`).

---

## Taip pat žr.

- [Architektūros vadovas](./ARCHITECTURE.md) — sistemos architektūra ir vidinė sandara
- [Naudotojo vadovas](../guides/USER_GUIDE.md) — tiekėjai, deriniai, CLI integracija
- [Auto-Combo variklis](../routing/AUTO-COMBO.md) — 16 veiksnių vertinimas, režimų paketai
