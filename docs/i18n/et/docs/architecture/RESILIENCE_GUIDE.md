# Resilience Guide (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute on kolm erinevat, kuid omavahel seotud vastupidavusmehhanismi. Igal neist on erinev ulatus ja eesmärk. Hoidke need marsruutimise käitumise silumisel eraldi.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Allikas: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Vastupidavuse lülitite ümbris-vs-armatuurlaua prioriteetsus.** Lubatud vastupidavus lülitab keskkonnast külvatud — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — ainult _vaikeväärtuse_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). `resilienceSettings` (Armatuurlaud →** Seaded → Vastupidavus** / `PATCH /api/resilience`, salvestatud `key_value`) võidab env väärtuse: normaliseerimine (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) säilitab salvestatud tõeväärtuse, kui see on olemas. Sellise env var väärtuseks `true` määramine juurutamisel, kus armatuurlaud on `false` juba salvestatud, ei muuda seetõttu midagi — lülitab lüliti sisse** Seadistused → Vastupidavus** (või tühjendage salvestatud väli).

## 1. Pakkuja katkestaja

**Ulatus:** kogu teenusepakkuja (nt `glm`, `openai`, `anthropic`).

**Eesmärk:** lõpetada liikluse saatmine teenusepakkujale, kes ülaloleva teenuse tasemel korduvalt ebaõnnestub.

**Implementatsioon:**

- Tuumklass: `src/shared/utils/circuitBreaker.ts`
- Ühendused: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Seisundi API: `GET /api/monitoring/health`
- Taastamise API: `POST /api/resilience/reset`
- Mpakid: `open-sse/services/accountFallback.ts`
- Andmebaasi tabel: `domain_circuit_breakers`

**Seisundid:**

- `CLOSED` — normaalne liiklus lubatud
- `DEGRADED` — liiklus lubatud, kuid jätkuvaid teenusepakkuja ebaõnnestumisi jälgitakse; seisund taastub `CLOSED`-ks piisavate õnnestumiste, kehtiva ühendustesti või viimase tüüpi ebaõnnestumise kõige pikema `OPEN` hoidmise järel (kasutatud väärtus `cooldownByKind`, muidu `resetTimeout` × `maxBackoffMultiplier`, vähemalt üks jahutuse periood) ilma uue ebaõnnestumiseta
- `OPEN` — teenusepakkuja ajutiselt blokeeritud; kombineeritud marsruutimine jätab selle vahele
- `HALF_OPEN` — taastamise aeg möödunud; proovipäring lubatud

**Konfigureeritavad vaikeväärtused (`open-sse/config/constants.ts`, nähtavad Dashboard → Settings → Resilience) :**

| Klass   | Degradeerub pärast |   Avatakse pärast | Taastamise aeg |
| ------- | -----------------: | ----------------: | -------------: |
| OAuth   |   5 ebaõnnestumist |  8 ebaõnnestumist |            60s |
| API-key |   7 ebaõnnestumist | 12 ebaõnnestumist |            30s |
| Local   |          tuletatud |  2 ebaõnnestumist |            15s |

`degradationThreshold` määrab, millal teenusepakkuja läheb seisundisse `DEGRADED`; `failureThreshold` määrab, millal see avaneb ja vahele jäetakse. Kohalikud teenusepakkuja profiilid ei ole veel Resilience'i sätete lehel nähtavad.

**Trip-koodid:** ainult teenusepakkuja tasemel olevaid staatusi `[408, 500, 502, 503, 504]`. Ärge käivitage trip'i konto tasemel esinevate vigade korral (enamasti 401/403/429 — need kuuluvad jahutuse või lukustuse alla).

**Lais taastumine:** kui `OPEN` aeg möödub, siis `getStatus()`, `canExecute()`, `getRetryAfterMs()` värskendavad seisundit `HALF_OPEN`-ks. Sama lugemine (ja järgmine ebaõnnestumine) vähendab vananenud `DEGRADED` seisundi tagasi `CLOSED`-ks. Taustatimerit pole vaja.

---

### Valikuline globaalne teenusepakkuja jahutamine (akna lukk)

Neljandaks kihiks on valikulise osalemise kiht (`PROVIDER_COOLDOWN_ENABLED`, vaikeväärtus **off**), mis säilitab päringute vahel mälu ebaõnnestuvate teenusepakkujate kohta faili `open-sse/services/providerCooldownTracker.ts` sees. Seda kasutatakse kombineeritud sihtmärgi määramisel, et järjestikused kombineeritud päringud lõpetaksid äsja ebaõnnestunud teenusepakkuja uuesti läbimarsimise. Teenusepakkuja tasemel kirjed järgivad `PROVIDER_PROFILES` akna luku sätteid:

| Profiil | Lülitab pärast (`providerFailureThreshold`) | Akna sees (`providerFailureWindowMs`) | Jahutub ajaks (`providerCooldownMs`) |
| ------- | ------------------------------------------: | ------------------------------------: | -----------------------------------: |
| OAuth   |                                        `10` |                               `15min` |                               `5min` |
| API key |                                        `15` |                               `30min` |                              `10min` |

Alates sellest künnist ei peeta teenusepakkujat jahutavas olekus; edukas päring tühistab akna. Ühenduse tasemel kirjed (`provider:connectionId`) kasutavad eksponentsiaalset tagasilükkamist `minRetryCooldownMs → maxRetryCooldownMs`. Ülekirjutused: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Regresseerimise kontroll: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Ühenduse jahtumine

**Ulatus:** ühe pakkuja connection/account/key.

**Eesmärk:** jätke üks halb võti vahele, samal ajal kui teised sama teenusepakkuja ühendused jätkavad teenindamist.

**Rakendamine:**

- Märgi kättesaamatuks: `src/sse/services/auth.ts::markAccountUnavailable()`
- Valik: `getProviderCredentials*` samas failis
- Jahutusarvutus: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Seaded: `src/lib/resilience/settings.ts`

**Väljad ühenduse kohta:**

- `rateLimitedUntil` — ajatempel kuni jahtumise aegumiseni
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponentsiaalne taganemisloendur

**Vaikimisi jahtumine:**

- OAuth alus: 5s
- API-võtmebaas: 3 s
- API-võti 429: eelistab ülesvoolu `Retry-After`/reset headers/parseable lähtestamise teksti
- Tagasivõtmine: `baseCooldownMs * 2 ** failureIndex`

**Pakkujapõhine korduskatse viivitus.** Pakkuja üksikasjade lehel on a** Proovi viivitus uuesti** vali (Automaatne, 15s kuni 1h). See säästab `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, `PATCH /api/resilience` kaudu). Kui kiiruspiirangu tõrge ei sisalda ülesvoolu uuesti proovimise vihjet, asendab see väärtus pakkuja skaleeritud tagasilöögi ja lähtestab `backoffLevel` väärtusele 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Piiratud sagedusega vea prioriteetsus, kõrgeim kõigepealt: ülesvoolu uuesti proovimise vihje, seejärel ühendusepõhine `providerSpecificData.rotationOverrides.rateLimitResetSeconds`, seejärel teenusepakkujapõhine korduskatse viivitus, seejärel env `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, seejärel skaleeritud tagasiminek. Auto eemaldab välja. See mõjutab ainult kiiruspiirangu põhjust, mitte kunagi lõppolekuid.

**Äikesevastane karjavalvur:** hoiab ära samaaegsete rikete liigse jahtumise või `backoffLevel` kahekordse suurendamise.

**Samaaegsuse limiit 429 ei roni tagandusredelil.** `429` mille keha teatab samaaegsuse piirangust ("liiga palju samaaegseid taotlusi", "samaaegsuse limiit", "paralleeltaotluse limiit", GLM `并发数过高`), tähendab, et konto on korras, kuid hõivatud. `checkFallbackError()` tagastab põhjuse `concurrency_limited`: viige kohe üle järgmisele ühendusele, jahutage seda fikseeritud `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) või ülesvoolu uuesti proovimise vihje jaoks, hoidke `backoffLevel` muutmata ja määrake `skipProviderBreaker`. Selgesõnaline kvoodi keha võidab ikkagi, seega jääb keha, mis vastab ka kvoodimustrile, kvoodiotsuseks. Tuvastamine: `looksLikeConcurrencyLimit()` in `src/shared/utils/classify429.ts`; otsus: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (murdja `FailureKind`) on muutumatu ja loeb nende kehade puhul endiselt `rate_limit`.

**Voogesisu kioskid ei jahuta kontot.** Kui sisu seiskumise valvekoer (`open-sse/utils/streamHandler.ts`) loobub voost, mis ei saatnud õigel ajal mudeliväljundit, registreerib `markAccountUnavailable()` ühenduse vea, kuid ei seadista jahtumist: seiskumine kuulub selle päringu juurde, enamasti pikk arutluskäik ilma väljundita. Operaatorid saavad uuesti lubada `resilienceSettings.streamStallCooldown.enabled` (vaikimisi `false`).

**Lubatud latentsussignaal `p2c` konto valimiseks.** Iga saadetud katse salvestab oma aja esimese baidini ja tulemuse ühenduse kohta (ja ühenduse + mudeli kohta) mälus jooksvas aknas: viimased 20 proovi 15 minuti jooksul (`open-sse/services/connectionLatencyTracker.ts`, salvestatud `safeLogEvents()` -st `src/sse/handlers/chatHelpers.ts`). Kui `resilienceSettings.p2cLatency.weight` on suurem kui `0` (vahemik 0–20, vaikimisi `0` = on välja lülitatud), liidab `compareP2CConnections()` - `src/sse/services/auth.ts` `weight` -punktid igale paari kandidaadile. Pool sellest tuleneb latentsusest kui suhtarvust kiirema kandidaadiga (kaks korda aeglasem võtab täis poole) ja pool veerevast veamäärast. See tähtaeg kehtib ainult siis, kui mõlemal kandidaadil on vähemalt 3 näidist, nii et uusi kontosid ei karistata ja selle ülemmäär jääb allapoole kvoodiga blokeeritud ja kvoodiga ammendatud karistusi. See ei lisa oma vooluringi: ebaõnnestunud kontodega tegelevad endiselt jahtumis-, lukustus- ja katkestuskihid. Määrake `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Põhjendusraamid taaskäivitavad sisu seiskumise eelarve.** Arutlusmudel suudab mõelda minutite jooksul enne oma esimest nähtavat tunnust: Claude voogustab `thinking_delta` -kaadreid, mille mõtlemistekst võib olla tühi, ja vastused API voogestab ühe arutlusüksuse teise järel. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) tunneb need kaadrid ära ja valvekoer taaskäivitab oma eelarve pöörde tühistamise asemel. Need ei ole ikka veel mudeliväljundid, nii et pööre, mis lõpeb ainult arutlemisega, teatatakse endiselt tühjaks ja pööre, mis peatab arutlemise ja saadab ainult südamelööke, paneb valvekoera ikkagi komistama.

Kiro binaarsed `reasoningContentEvent` kaadrid mittetühja allkirjaga säilitavad selle arutlustegevuse läbi täitja tühja `reasoning_content` deltana. Allkirja ei edastata. Metaandmed, mittetäielikud raamid ja tühjad allkirjad ei taaskäivita sisueelarvet; sõltumatu aktiivse voo ajalõpp ja kliendi tühistamine kehtivad endiselt (`open-sse/executors/kiro/reasoning.ts`).

**Terminalolekud (NOT jahtumine):**

- `banned` — määratud keelatud märksõna / konto keelu tuvastamisega (vt [BAN_DETECTION](../security/BAN_DETECTION.md) ). Päringupõhised ülesvoolu keeldumised (`request_rejected`, nt Anthropic OAuth 403 "Taotlus ei ole lubatud") ei määra seda kunagi: neid loendatakse ühenduse ja mudeli järgi ning see mudel eemaldatakse pöörlemisest kasvava jahtumise piirmääraga `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h) või jahutatakse ühendust, kui mudelit pole teada — `open-sse/services/requestRejectedStreak.ts`
- `expired` (üleminek terminalile pärast piiratud korduskatseid — `EXPIRED_RETRY_MAX = 3` eksponentsiaalse tagasilöögiga —, et mööduvad OAuth vead saaksid ise paraneda enne, kui konto jäädavalt inaktiveeritakse)
- `credits_exhausted`

Need püsivad seni, kuni mandaadid muutuvad või operaator need lähtestab. Ärge kirjutage terminali olekuid üle mööduva jahtumise olekuga.

**Laisk taastumine:** kui `rateLimitedUntil` on möödas, muutub ühendus uuesti sobivaks. Eduka kasutamise korral kustutab `clearAccountError()` kõik veaväljad.

### Claude OAuth kasutussein: madalama prioriteediga rada + seansipiirangu lähtestamine

**Ulatus:** üks Claude abonemendi (OAuth) ühendus. Mõlemad omadused on** luba ühenduse kohta** (Redigeeri ühenduse → Claude sektsiooni → `lowPriorityMode` / `autoLimitReset` in `providerSpecificData`, mõlemad on vaikimisi välja lülitatud) ja peegeldage Claude koodi `/low-priority` ja `/limit-reset` käske (juhtmeleping on jäädvustatud Claude koodist 2.1.263).

**Rakendamine:**

- Oleku masina + vastuse klassifikatsioon: `open-sse/services/claudeLowPriority.ts`
- status/claim kliendi lähtestamine: `open-sse/services/claudeLimitReset.ts`
- Täitja konks (päise süstimine + sama konto uuesti proovimine): `open-sse/executors/base.ts::execute()`
- Valiku püsivus: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Päästiku:** 5-tunnise kasutuse sein — a `429`, mille päistel on `anthropic-ratelimit-unified-status: rejected` ja kui konto on sobilik, `anthropic-ratelimit-unified-slow-offer: treatment`. Midagi ei saadeta enne seda esimest seina 429; sarivõte 429 ilma ühtsete päisteta läbib tavalise jahtumise tee.

**Madalama prioriteediga sõidurada** (`lowPriorityMode`):

- Seinal 429 võtab testamenditäitja pakkumise vastu ja proovib kohe uuesti** sama** konto `anthropic-usage-limit: slow`; rada jääb aktiivseks kuni väljakuulutatud `anthropic-ratelimit-unified-reset` (+ 60s grace) ja iga selles aknas olev päring kannab päist. Pealt võetud 429 ei jõua kunagi `handleChatCore`, seega ühendus on** mitte** panna jahutusse ja seda ei pöörata ära.
- `anthropic-ratelimit-unified-slow-status` hilisematel vastustel: `active` / `not_needed` hoia sõidurada; `slot_busy` (429) või `529` ootavad serveri `anthropic-ratelimit-unified-slow-retry-after` (vaikimisi 20 s, klamber 5–600 s, ± 30% värinat) ja proovige uuesti, piirnedes `anthropic-ratelimit-unified-slow-max-wait` (vaikeseade 20 min, klambriga 1 min–6 h) — möödudes sellest, kui rada lõpeb ja jahtub 10-minutiline blokeering. Ooteaeg on lisaks piiratud päringu enda ülesvoolu käivituse ajalõpu järelejäämisega (`resolveFetchStartTimeout`, vaikimisi 10 min) miinus 5 s varu: ilma selle ülempiirita ületaks 20-minutiline vaikimisi maksimaalne ooteaeg taotluse ja unerežiim katkestataks keset ootamist, jäädes nähtavale `TimeoutError` asemel `max_wait` lõpp- +.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5-tunnine akna ümberminek või `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (mis lõpetab selle mis tahes olekus kui `extra_usage`, kuna tasuline ülejääk katab nüüd seina) lõpetab sõiduraja; reaktsioon liigub seejärel tavalisele jahtumisrajale. `budget_exhausted` jäetakse meelde kuni väljakuulutatud eelarve lähtestamiseni (≤ 8 päeva).
- Seinakontroll käitatakse pärast täitja enda 400 juhitud sisekatset (konteksti redigeerimine, thinking/effort klambrid, parameeter automaatne õppimine), nii et sein 429, mis jääb pinnale ainult ühel neist korduskatsetest, püütakse siiski kinni, selle asemel et jõuda jahtumisrajale.
- Olek on ühenduse kohta mälus (taaskäivitamine maksab ühe lisaseina 429 uuesti vastuvõtmiseks).

**Seansipiirangu lähtestamine** (`autoLimitReset`, proovitud enne sõidurada, kui mõlemad on sisse lülitatud):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` plokk; kui `arm: "reset"` ja `available: true`, `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` koos `{ "program": "juniper_tide" }` (organisatsioon UUID alates `providerSpecificData.organizationUUID`, alglaadimisvaru).
- `result: reset|not_limited` → taotlust proovitakse uuesti täiskiirusel (aeglast päist pole). `already_used` / `not_offered` memoise `next_available_at` (vaikimisi üks nädal); iga rike taandub 15 minutiga. Lähtestamine toimub kord nädalas ja see arvestatakse ikkagi nädala limiidi hulka.

Regressioonikaitsed: `tests/unit/claude-low-priority-mode.test.ts`, `tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Rakenda panga lähtestused automaatselt

**Ulatus:** Codex ja Claude abonemendi (OAuth) ühendused.** Lubatud** : `bankedResetAutoApply` säte on vaikimisi välja lülitatud ja `dry-run` -režiimis (Settings → AI → Rakenda panga lähtestused automaatselt).

**Eesmärk:** kulutavad panga lähtestamisi ise, kui konto satub kasutusseinale, selle asemel, et oodata, kuni operaator vajutab teenusepakkuja piirangute lehel nuppu "Lunasta".

| Krediidi tüüp (`creditTypes`) | Mis on lunastatud                               | Kus see jookseb                                          |
| ----------------------------- | ----------------------------------------------- | -------------------------------------------------------- |
| `codexCredits`                | Codex lähtesta krediiti                         | taustatöö, iga 60 s                                      |
| `claudeCredits`               | Claude pangatoetused (`GRANT` krediidid)        | taustatöö, iga 60 s                                      |
| `claudeSessionReset`          | Claude nädalaseansi limiidi lähtestamine (ülal) | päringu tee sama poliitika kaudu nagu kontopõhine lüliti |

**Rakendamine:**

- Puhas otsus (üks reegel mõlema tee jaoks): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Taustatöö: `src/lib/services/bankedResetAutoApply.ts` (algas `src/instrumentation-node.ts`)
- Claude päringu tee värav: `src/lib/usage/claudeSessionResetPolicy.ts`, registreeritud `setClaudeLimitResetPolicy()` kaudu `open-sse/services/claudeLimitReset.ts`
- Ajalugu, mütsid ja veebihaak: `src/lib/usage/bankedResetAudit.ts`
- Ajalugu API: `GET /api/settings/banked-reset-auto/history?limit=50` (halduse autentimine)

**Otsuse järjekord** (esimene ebaõnnestunud reegel on registreeritud põhjus):

1. Funktsioon on välja lülitatud, krediiditüüp on välja lülitatud või konto on väljaspool rakendust (`accountScope` `all` / `selected` pluss kontopõhine `connections` -kaart).
2. Väljaspool valikulist UTC ajakava (`startHourUtc` > `endHourUtc` ületab keskööd).
3. Ülemmäärad viimase 24 tunni jooksul: `maxPerAccountPerDay` (1), `maxPerDay` (3) ja `minSpacingMinutes` (30) mis tahes kahe lunastamise vahel.
4. Päästik: seinaga ümbritsetud `session` või `weekly` aken (loe `getQuotaWindowStatus().reachedThreshold`, mitte `isAccountQuotaExhausted()`, mis kajastab ainult kontot iga kulutatud aknaga) või krediit, mis aegub `expiringCreditHours` (24) jooksul kontol, mis on kasutanud vähemalt `expiringCreditMinUsedPercent` (50).
5. Loomuliku lähtestamise kaitse: jätke vahele, kui seinaga 5-tunnine aken lähtestub `sessionResetGuardMinutes` (90) piires või seinaga iganädalane aken `weeklyResetGuardHours` (12) piires.
6. Nädala alammäär: jätke 5-tunnine lähtestamine vahele, kui nädalane järelejäänud väärtus on alla `weeklyFloorPercent` (10).
7. `last-resort` režiim: jätke vahele, kui sama teenusepakkuja mõnel teisel rakendusalasse kuuluval kontol on mõlemas aknas vähemalt `poolHeadroomPercent` (10). Krediidi aegumise käivitajad mööduvad sellest.
8. `dry-run` salvestab rea ja ei lunasta midagi; `last-resort` ja `eager` lunastada.

Puuduvad kvoodiandmed ei võimalda kunagi lunastada: teadmata lähtestamisaeg või iganädalane kasutus jäetakse vahele.

**Claude seansi lähtestamine:** kui funktsioon on välja lülitatud või `claudeSessionReset` välja lülitatud, otsustab kontopõhine `autoLimitReset` lüliti täpselt nagu varem. Kui mõlemad on sisse lülitatud, asendab funktsioon kontopõhised lülitid: kohaldamisalasse kuuluv konto võib nõuda ainult siis, kui poliitika seda lubab, ja `dry-run` -režiimis nõuet ei esitata.

**Ohutus:** töö lunastab maksimaalselt ühe krediidi iga linnukese kohta, otsustab enne krediitide lisamist (vahelejäetud kontot ei loetleta kunagi), kasutab idempotentsusklahve `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` ja tühistab konto 1 tunni jooksul pärast ebaõnnestunud kandmist või lunastamist. Iga lunastamine, ebaõnnestumine ja kuivkäivitusotsus kirjutatakse `audit_log` -sse (`action: "bankedReset.redeem"`, ei märke ega krediidi ID-sid); mütsid loetakse nendest ridadest, nii et need jäävad taaskäivitamise ellu. Edukad lunastamised käivitavad ka `provider.reset_redeemed` veebihaagi.

Regressioonikaitsed: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Seansi afiinsus (#7274)

**Ulatus:** üks kliendiseanss (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` päis) on kinnitatud ühele ühendusele,** ükskõik milline** pakkuja.

**Eesmärk:** hoidke mitme käiguga agenti (Claude kood, abistaja, kohandatud agendid) taotluste lõikes samal kontol, vähendades kontoülese konteksti kadu ja korduvaid külmkäivitusi kontopõhise seansi olekuga pakkujate puhul.

**Rakendamine:**

- TTL eraldusvõime: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Päise ekstraheerimine (üldine, mis tahes pakkuja): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Püsiva nööpnõelaga laud: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Säte: `sessionAffinityTtlMs` (globaalne TTL ms-des, `0` keelab) — `src/lib/db/settings.ts`. Nimetatud ainult Codex-i jaoks mõeldud `codexSessionAffinityTtlMs` ümber migreerimise teel `124_generic_session_affinity_ttl.sql`, mis kannab uue vaikeväärtusena üle kõik varem konfigureeritud Codex TTL.

Enne #7274 oli `resolveSessionAffinityTtlMs()` kõvasti `0` -ga kõigi pakkujate jaoks, välja arvatud `codex`, nii et TTL seadistus (ja seansi päised) ei mõjutanud kusagil mujal, kuigi kinnitusmehhanism ja päise ekstraheerimine olid juba pakkuja-agnostilised. Parandus eemaldas selle varajase tagastamise; TTL kehtib nüüd ühtselt kõikidele pakkujatele, kui see on globaalselt seatud `0` kõrgemale.

Kolme seansi afiinsusega päist ei edastata kunagi ülesvoolu — täitjad loovad oma ülesvoolu päised nullist, selle asemel, et klientide päiseid läbi lasta, nii et see jääb ainult sisemiseks korrelatsiooni ID-ks.

### Eksklusiivsed hallatud seansiühenduse liisingud

**Ulatus:** üks aktiivne hallatav HTTP client/session omab ühte sobilikku OmniRoute ühendust.

**Eesmärk:** pakkuda püsivat eksklusiivset ühenduse omandiõigust klientidele, kes vajavad rasket marsruutimispiiret üle taotluste. See erineb seansi afiinsusest, mis on pehme järjepidevuse eelistus: eksklusiivne liising püsib SQLite elutsükli olekus, jõustab globaalse aktiivse omaniku ja aktiivse ühenduse unikaalsuse ning lükkab tagasi aegunud genereerimise enne pakkuja väljasaatmist.

Funktsioon on valitav API klahvi kohta. Hallatud võtmel peab olema `lease:exclusive` ulatus ja selge, mittetühi `allowedConnections` loend. Iga HTTP klient saab kasutada elutsükli lõpp-punkti; kliendi nime, kasutajaagenti, pakkujat, OAuth meetodit ega mudelit pole vaja. Liisingulepingule kuulub ühendus, mitte mudel, nii et mudeli muudatus säilitab siduvuse, kuni ühendus jääb tavaliselt kõlblikuks. Tavamudeli-, kvoodi-, tervise-, jahtumis- ja lubade loendi reeglid jäävad autoriteetseks ning võivad sama põlvkonna üle kanda teisele tasuta sobilikule ühendusele.

Elutsükkel on `POST /api/v1/session-leases` koos JSON toimingutega `acquire`, `renew` ja `release`. Hallatud järelduspäringud esitavad läbipaistmatu `X-OmniRoute-Lease-Owner` väärtuse ja täpse `X-OmniRoute-Lease-Generation`. Omanik kasutab `vlo_` millele järgneb 43 märki base64url; salvestatakse ainult selle SHA-256 räsi. Iga lõplik väljasaatmispiirkond seob ka autentitud API -klahvi ID ja aktiivse ühenduse ID. Rendikontrolli päised eemaldatakse logidest, säilitatud päringu hetktõmmistest ja ülesvoolu täitjapäistest.

Kui tavalisel marsruutimisel on sobilikud hallatud kandidaadid, kuid iga vaba kandidaadi hõivab välisriigi aktiivne liising, tagastab OmniRoute koodi HTTP `429`, rendivõimsuse puudumise koodi, võimsuse ootamise oleku ja piiratud `Retry-After` mis on tuletatud varaseimast asjakohasest aegumistähtamisest. Tavaline tühi sobivus ei ole rendivaidlus ja säilitab olemasoleva marsruutimise vea semantika.

Seotud mehhanismid jäävad eraldiseisvaks:

- OAuth seansi hõivatus on protsessi kohalik pehme jaotus OAuth kontode jaoks.
- Konto semaforid annavad päringu samaaegsuse load ja lõpevad, kui päring on lõpule viidud.
- Eksklusiivsed hallatavad seansi rendilepingud on kestvad elutsükli omad koos põlvkonnataraga.

---

## 3. Mudeli lukustus

**Ulatus:** pakkuja + ühenduse + mudeli kolmik.

**Olekujärgne ulatus:** tõrke põhjustanud olek määrab, millisesse võtmesse lukustus kirjutatakse
(`resolveLockoutScope()` asukohas `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — kvoodi- või õigussignaal — lukustatakse **kvoodipere**:
  codexi puhul kogu `codex` / `spark`-ulatus (ühenduse kõik `gpt-5*` mudelid), teiste pakkujate puhul `getQuotaScopedModelForProvider()`.
- `404` lukustab palja mudeli (`getModelLockKey()` kitsendab väärtusele `not_found`).
- Mis tahes muu olek — `5xx` transpordi-/serveritõrked ja OmniRoute’i enda kvaliteedi valideerimise põhjal sünteesitud
  `502` — lukustab ainult **täpse** pakkuja/ühenduse/mudeli kolmiku. Ühe mudeli vigane voog ei anna teavet konto kvoodi kohta; enne seda reeglit eemaldas üks tühi vastus mudelil
  `codex/gpt-5.6-luna` selle ühenduse kõik `gpt-5*` mudelid marsruutimisest 2–30 minutiks (eskaleerudes), samal ajal kui selle kvoot jäi puutumata.
- Kutsuja sõnaselge `scope`-valik on alati ülimuslik (Antigravity edastab väärtuse `"exact"`).

**Eesmärk:** vältida terve ühenduse keelamist olukorras, kus saadaval pole või kvoodipiiranguga on ainult üks mudel.

**Näited:**

- Mudelipõhised kvoodipakkujad, mis tagastavad `429`
- Kohalikud pakkujad, mis tagastavad ühe puuduva mudeli korral `404`
- Pakkujaspetsiifilised režiimi-/mudeliõiguste tõrked (nt Groki režiimid)

**Teostus:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Mudelite jahtumiste juhtpaneel (v3.8.0)

Kasutajaliides: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Loetleb aktiivsed lukustused järgmiste andmetega: pakkuja, ühendus, mudel, põhjus, expiresAt. Operaatorid saavad kaardilt mudeli käsitsi uuesti lubada.

**REST API:**

- `GET /api/resilience/model-cooldowns` — aktiivsete lukustuste loend
- `DELETE /api/resilience/model-cooldowns` — käsitsi uuesti lubamine. Keha: `{provider, connection, model}`. Autentimine: management.

### Jahtumiste haldur

Kasutajaliides: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Üks leht iga ühenduse jaoks, mis on ajutisel põhjusel marsruutimisest väljas, selle asemel et avada iga pakkuja leht eraldi. See loetleb ühenduste jahtumised, mudelite lukustused ja lõppolekud, eemaldab need ühenduse, valiku või pakkuja kõigi ühenduste kaupa ning muudab enim häälestatud jahtumisreegleid: `streamStallCooldown.enabled` ja OAuthi-/API-võtme `connectionCooldown`-i algset jahtumisaega ning maksimaalseid tagasipöördumise samme (salvestatakse `PATCH /api/resilience` kaudu). Lõppolekud (`banned`, `expired`, `credits_exhausted`) on loetletud, kuid neid siin kunagi ei eemaldata.

Sama lehe kaart **Error cooldown rules** muudab operaatori tõrjereegleid
(`settings.providerErrorRules`) ja pakkujakohaseid kõikehõlmavaid vaikeväärtusi
(`settings.providerErrorDefaults`) `PATCH /api/settings` kaudu — sobitamise kohta vaadake jaotise §7 alajaotist „Operaatori deklareeritud reeglid“. Kestused on Default (selgesõnaline jahtumine puudub), 30 min,
1 h, 5 h, 24 h või kohandatud 1 kuni 43 200 minutini (30 päeva).

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentimine: management):

- `GET /api/resilience/cooldowns[?provider=]` — oleku, allesjäänud jahtumise, tagasipöördumise taseme,
  viimase tõrketüübi ja mudelite lukustustega ühendused (mandaate ei tagastata)
- `POST /api/resilience/cooldowns` — keha `{connectionIds: string[]}` või
  `{all: true, provider?}`; tagastab `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Lukustuse seadete kasutajaliides + eduka päringu põhine taandumisega taastumine (v3.8.23)

Mudeli lukustus muutus alati sisse lülitatud kõvakodeeritud käitumisest täielikult seadistatavaks,
vaikimisi välja lülitatud funktsiooniks, millel on oma seadete kaart ja isetaastuv taastetee.

**Seadete kaart:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
See on **eraldiseisev** eespool kirjeldatud kirjutuskaitstud `ModelCooldownsCard` (mis ainult
_loetleb_ aktiivseid lukustusi) — uus kaart _seadistab parameetreid_. Vaikeväärtused asuvad failis
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Seade                   | Vaikeväärtus                     | Tähendus                                                             |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------- |
| `enabled`               | `false`                          | Põhilüliti — mudeli lukustus on **vaikimisi välja lülitatud**.       |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Ülemteenuse olekud, mida käsitletakse mudelipõhise tõrkena.          |
| `baseCooldownMs`        | `120_000` (120 s)                | Esmase tõrke algne lukustuse kestus.                                 |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Eskaleerunud jahtumise ülempiir.                                     |
| `maxBackoffSteps`       | `10`                             | Eksponentsiaalse tagasipöördumise eskaleerimise sammude maksimumarv. |
| `useExponentialBackoff` | `true`                           | Kas korduvad tõrked eskaleerivad jahtumist eksponentsiaalselt.       |

Seaded säilitatakse tavapärase seadetehoidla kaudu ja valideeritakse vastupidavusseadete skeemi abil; kaart piirab
`baseCooldownMs`/`maxCooldownMs` väärtusi (tingimusel `maxCooldownMs ≥ baseCooldownMs`) ja
`maxBackoffSteps` väärtust.

**Edul põhinev taandumisega taastumine:** taastumine ei toimu **ainult** taimeri aegumise kaudu. Terve
vastus vähendab mudeli tõrgete arvu, nii et vahepeal taastunud mudel lõpetab eskaleerumise
(ja lukustus eemaldatakse) enne taimeri aegumist. Eduka kombinatsiooni sihtmärgi korral kutsub
`open-sse/services/combo.ts` välja `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), mis **poolitab** salvestatud
`failureCount` väärtuse (`Math.floor(failureCount / 2)`); kui väärtus jõuab `0`-ni, kustutatakse lukustuskirje täielikult. Selle vastand `recordModelLockoutFailure()` suurendab tõrgete korral arvu
(ja eskaleerib jahtumist) eskaleerimisakna sees. See edul põhinev taandumine täiendab tavalist taimeri aegumist —
kumbki tee võib mudeli uuesti lubada.

**Olekord:** lukustused on **mälus** (protsessipõhistes `Map`-ides, mille võtmeteks on
`ModelLockoutEntry`-d kujul `provider:connectionId:model`, täpse ulatusega lukud kujul
`provider:connectionId:exact:model`), mitte andmebaasi salvestatud
— taaskäivitamisel lähevad need kaotsi. _Seaded_ salvestatakse püsivalt; aktiivne lukustuse _olek_ on ajutine.

---

## 4. Kvoodi jagamise samaaegsuse juhtimine (v3.8.36)

Tellimuskontod (GLM, MiniMax jne) võtavad sageli vastu ainult ~ 1–3 samaaegset taotlust; selle ületamine käivitab 429 sekundit ja jahtumist. See on äge all** kvoodiosa** (`qtSd/…`) kombod, kus mitu API klahvi jagavad ühte ülesvoolu kontot. Kolm kihti hoiavad jagatud konto üle ujutamise eest.

### Ühendusepõhine samaaegsuse ülempiir (`max_concurrent`)

Iga teenusepakkuja ühendus saab deklareerida `max_concurrent` ülemmäära (`provider_connections.max_concurrent`, määratud ühenduses modal / API / DB). Jätke see piiranguteta tühjaks. See on ainuke nupp, mis juhib — all olevat serialiseerimiskihti, mis seab selle konto tegelikule samaaegsusele (nt GLM ~ 1, MiniMax ~ 2).

### Mudelipõhised samaaegsuse piirid (`modelConcurrency`)

Ühendus võib lisaks deklareerida täpsed mudelipõhised samaaegsuse ülemmäärad oma `rateLimitOverrides` kaardil:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Seadke see ühenduse modaali (** Rate limiit alistab → mudelipõhised samaaegsuse ülemmäärad** , üks `model=cap` rea kohta) või `PATCH /api/providers/[id]` kaudu sama JSON -kujuga. Peamised semantika:

- **Kogu ühendust hõlmav vs mudelipõhine:** `maxConcurrent` jääb ühisühendust hõlmavaks laeks. Mõlema rakendumisel omandatakse mõlemad väravad aatomiliselt samas liitväravas (`global → provider → account → model`); tõhus käitumine on rangem kohaldatav piir.
- **Täpne mudeli ja võtme vaste:** võti on mudelistring, mis edastatakse täitjale pärast marsruutimislahutust — tavaliselt tühi ülesvoolu mudeli ID (`glm-5`), mitte kliendipoolne `provider/model` alias (`zai/glm-5` ei ühti `glm-5`). Väärtused on positiivsete täisarvude samaaegse taotluse ülemmäärad.
- **Kohalik järjekord, avastamata:** üleliigsed päringud lokaalselt olemasoleva queue/timeout semantikaga (tipitud `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` vastuvõtuvead). OmniRoute ei tuvasta ega järelda ülesvoolupoliitikat — see jõustab operaatori seadistatud täpsed ülemmäärad. Küllastunud mudelivärav ei keela kunagi teenusepakkujat ega loo püsivat mudelisulgust; ülesvoolu 429/cooldown/fallback käitumine jääb vea tagamise vahendiks.
- **Ühenduse kohta, protsessi ulatus:** piirangud on andmebaasiühenduse kohta ja neid hoitakse mälus, nii et kaks sama ülesvoolu API -võtit uuesti kasutavad ühendust ei koordineeri end üksteisega.
- **Konfigureerimata tähendab muutmata:** kaardi väljajätmine (või armatuurlaua välja tühjaks jätmine) ei lisa mudeliväravat. Konfiguratsiooni näide ilma universaalse pakkuja piiranguta:

```text
glm-5=1
glm-4.7=3
```

### Kvoodi jagamise taotluse serialiseerimine

Kui kvoodijagamise saatmine sihib ühendust, mis deklareerib positiivse `max_concurrent`, esitatakse sellele samaaegsed taotlused** konto** jadatakse ühendusepõhise semafoori kaudu (klahv `qsconn:<connectionId>`): liigsed päringud** järjekorras ootama** konto üle ujutamise asemel. On küll** tõrgeteta avatud** — küllastunud järjekord või ajalõpp kulgeb edasi ilma pesa, mitte ei lükka kunagi tagasi saadetavat taotlust. Lülitage sisse** Seaded → Vastupidavus → Kvoodi jagamine ühenduse kohta samaaegsus** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, vaikimisi sees). Ilma `max_concurrent` korgita on käitumine muutumatu.

> Kvoodijagamise marsruutimise värav (`selectQuotaShareTarget`, DRR + P2C) on ise tõrkeavatud ja _defitseerib_ ainult ühe ühendusega ühenduse — prioriteedid, nii et see semafor on see, mis tegelikult üleujutust sisaldab.

### Kombineeritud jahtumist arvestav uuesti proovimine

Iga kombineeritud strateegia puhul (kui see on lubatud) ootab taotlus, mis kristalliseerib 429 SHORT ajutise jahtumise jaoks, ja saadetakse uuesti, selle asemel, et tagastada 429 — see hõlmab Gemini-klassi TPM/RPM aknaid (~ 60s uuesti proovimine-pärast) mitme mudeli kombinatsioonidel, nt kamm-model-model mõlema piirangu tabamissagedus. Piiratud `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`)** Seaded → Vastupidavus** . See ei oota kunagi `quota_exhausted` (lukus keskööni) või auth/not-found põhjustel. Kui `comboTimeoutMs` on seatud, ei alga ootamine, mis ei saa enne seda tähtaega lõppeda (#18998): kombinatsioon vastab `COMBO_TIMEOUT` 504 asemel kohe oma terminali vastusega.

Kombo saab `config.comboCooldownWaitEnabled: false` abil loobuda. Ainult sõnasõnaline `false` keelab need jagatud kombineeritud ooteootused (saatmisjärgne jahtumine ja väljasaatmiseelne circuit-open/model-lock ootamine) ja nende oote-eelarve ajalõpu-põrandalaienduse. Puuduv või `true` säilitab globaalse poliitika; `true` ei saa lubada globaalselt keelatud ootamist. Selgesõnaline `targetTimeoutMs` võidab ikkagi. See loobumine ei muuda eraldi natiivse Codexi nööpnõela saatmiseelset ootamist.

Sama värav katab ärasaatmiseelse juhtumi (#16319): kui kombinatsiooni iga sihtmärk jäetakse vahele enne mis tahes katse tegemist, kuna selle mudel on lühikeses mööduvas lukustuses, ootab nullkatseta tee samade lagede all ja saadetakse uuesti, selle asemel et vastata vihjevabale `503 ALL_TARGETS_SKIPPED`-le. Kui ootamine pole lubatud (lagi, katse või eelarve on ammendatud või funktsioon on välja lülitatud), uuendatakse terminali vastust `429 rate_limit_error`, mis kannab `retry_after` / `reset_at` alates varaseimast mööduva lukustuse aegumist; kvoot, autentimine ja leidmata lukud hoiavad vihjeteta 503.

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

## 5. Päringujärjekorra vastuvõtukontroll (v3.8.49 · issue #6593)

**Ulatus**: kohalik pakkujapõhine+ühendusepõhine päringusageduse piirangu järjekord (`open-sse/services/rateLimitManager.ts`, mille aluseks on Bottleneck), üks kiht allpool kolmest eespool kirjeldatud mehhanismist.

**`maxWaitMs` piirab järjekorra-ootamist; `executionMaxWaitMs` piirab täitmist.**
Need kaks on teadlikult eraldatud ega toida teineteist.

`resilienceSettings.requestQueue.maxWaitMs` on **järjekorra-ootamise eelarve**: see hõlmab pakkujakoha ootamist ja seejärel olekus QUEUED viibimist ning selle taimer tühistatakse hetkel, kui töö lahkub olekust QUEUED ja alustab täitmist (`rateLimitManager.ts`, `wrappedFn`). Seda ületav päring ei jõua kunagi ülesvooluni. Vaikimisi 30000ms, mille määrab `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` failis `src/lib/resilience/settings.ts` ja mille kinnitab `tests/unit/ratelimit-admission-control-6593.test.ts`, nii et selle muutmine muudab selle testi punaseks, selle asemel et jätta see lõik vaikselt aegunuks.

`resilienceSettings.requestQueue.executionMaxWaitMs` on see, mida Bottleneck saab töö `expiration`-väärtusena ja mille taimer käivitub alles pärast väljasaatmist. See on varukaitse täitjatele, millel pole oma ülesvoolu ajalõppu, ja see tõstetakse täitja enda fetch'i-alustamise ajalõpuni, kui see on pikem, nii et see ei saa katkestada tervet käimasolevat vastust. Vaikimisi 600000ms (10 min).

Järjekorraeelarve suunamine `expiration`-väärtusse on see, mis varem tappis mitteinkrementaalsed lüüsid keset teekonda — need töötavad õiguspäraselt minuteid enne esimesi baite — ja seetõttu kuvatakse aegumine kujul `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), samas kui järjekorraeelarve kannab järjekorra-ajalõpu koodi. Kumbagi saab alistada keskkonnamuutujate `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) või juhtpaneeli kaudu
(**Seaded → Vastupidavus**). Normaliseerimisel piiratakse mõlemad vahemikku 1ms–24h.

**Ülimuslikkus mõlema puhul:** keskkonnamuutuja määrab ainult _vaikimisi väärtuse_. `resilienceSettings.requestQueue`-s püsisalvestatud väärtus (juhtpaneel / API-patch, salvestatud `key_value`-sse) on sellest ülimuslikum ja ühendusepõhine `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` on omakorda sellest ülimuslikum. Keskkonnamuutuja seadmine juurutusel, kus püsisalvestatud väärtus on juba olemas, ei muuda seega midagi — selle asemel tühjendage või värskendage püsisalvestatud seadet.

Järjekorras viibimist piirab `maxWaitMs`; allolev `maxQueueDepth` piirab seda, kui palju kutsujaid võib korraga järjekorras olla.

**Kehas teatatud korduskatsed: tempo pidamine vs lukustus.** 429-keha võib nimetada oma ooteaja (Gemini `RetryInfo.retryDelay`, tekst "retry after Ns"), mille loeb `updateFromResponseBody`. Ühenduse `maxWaitMs`-i sisse mahtuv ootus on tempo pidamine: piiraja tühjendab selleks ajaks oma reservuaari ja järjekorras olevad kutsed saadetakse välja, kui see taas täitub. `maxWaitMs`-ist pikemat ootust ei suuda järjekord ära istuda — Gemini vastab ammendunud päevakvoodile `retryDelay: "86399s"`. Ümberehitatud 429 peal edastatud `Retry-After` (#16528) paneb reservmehhanismi mudeli selleks aknaks juba lukku, kuid ka piiraja peatamine selle pärast peataks ikkagi iga kutse, mis jõuab võtmeni liiga vara (näiteks pärast vastupidavuse lähtestamist), kogu `maxWaitMs`-i vältel. Kui selline ootus pärineb tüübitud Google'i `RetryInfo`-detailist (päritoluga `google_rpc_retry_info`) ja võtme piiraja on juba mudelile piiritletud (vt `getLimiterKey`), muutub 429 selle asemel mudeli lukustuseks sellel ühendusel (`lockModelForLongBodyRetry` failis
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, ülempiiriga 24h) ning piirajat ei peatata. Kontovalik jätab selle luku tõttu mudeli vahele `isModelLocked()` kaudu ning samamoodi teeb seda kombo väljasaatuse-eelne värav ühendusele kinnitatud sihtmärkide puhul. Antigravity puhul, mille piiraja on kvoodiperekonna kohta, kehtib lukustus täpsele mudelile, nagu ka tema muud kvoodilukud. Ka kliendi küsitud nimi lukustatakse, kui alias lahendas selle sellele mudelile, sest need kontrollid kasutavad küsitud nime; see lukustatakse täpselt (`lockExactModel`), nii et alias, mis ületab antigravity kvoodiperekonda või codex'i ulatuse, ei lukusta kunagi iseennast. Proosavihje, tüüpimata `retryDelay` või kogu ühenduse jagatud piiraja jätab pausi alles. Kui piiraja, mille 429-tee just üles ehitas, siiski peatub, tõrjutakse kutsuja, kelle järelejäänud järjekorraaeg lõpeb enne pausi, kohe järjekorra-ajalõpu koodiga (`checkLimiterPause`), selle asemel et seda aega ära oodata; salvestatud lõpp ankurdatakse enne piiraja koostamist, kus Bottleneck käivitab oma värskenduskella, ja iga hilisem reservuaari muudatus unustab selle. Seda katavad
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` ja
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — sisselülitatav vastuvõtu ülempiir (uus).** `resilienceSettings.requestQueue.maxQueueDepth`
piirab seda, kui palju päringuid võib ühe pakkuj+ühenduse kohta korraga järjekorras oodata (ilma et neid oleks veel välja saadetud). Kui järjekorras on juba `maxQueueDepth` päringut, tõrjutakse uus päring kiiresti tüübitud
`code: "RATE_LIMIT_QUEUE_FULL"` veaga **enne**, kui see üldse jõuab `limiter.schedule()`-ni
— nii on tõrjumine odav ja toimub enne igasugust allavoolu prompt'i tihendamise / tõlkimise tööd selle päringu jaoks. Vaikimisi `0` =
keelatud, mis säilitab olemasoleva piiramata järjekorra käitumise; piiratud vahemikku 0–100000.
Alistamine `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) või
`resilienceSettings.requestQueue.maxQueueDepth` (juhtpaneel / API-patch) kaudu.

Vastuvõtukontroll ise on puhas funktsioon
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), nii
et seda saab ühiktestida ilma tõelise Bottleneck'i piirajata.

> RFC, mis avas #6593, pakkus välja ka lipu `bypassCompressionOnRateLimit`.
> Selle repositooriumi toruliin `open-sse/services/compression/` on
> viiba/konteksti pakkimine väljuvas LLM-päringus (`chatCore.ts`,
> ploki `resolveCompressionSettings`/`selectCompressionStrategy` ümbruses),
> mitte HTTP-vastuse pakkimine sünteesitud 429-kehade puhul — sõnaselge
> möödaviigu lipu jaoks pole vastavat kooditeed olemas. See viibapakkimise
> samm käib päringu toruliinis praegu samuti _enne_ funktsiooni
> `withRateLimit()`, nii et ümberjärjestamine, et jätta see järjekorra
> täitumise tagasilükkamisel vahele, on eraldi ja suurem muudatus kui selle
> issue ulatus; seda **ei** juurutatud siin tahtlikult ja see jäetakse
> jätkutööks, juhul kui CPU kokkuhoiu võit kaalub üles ümberjärjestamise
> riski.

### Kiirusepiirangu automaatse lubamise turvavõrk ja ühenduse kaitse (`rateLimitProtection`)

**Automaatse lubamise turvavõrk** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, vaikeväärtus `true`):
Vaikimisi lubab OmniRoute automaatselt kiirusepiirangu järjekorrakaitse kõigil aktiivsetel API-võtme pakkujaühendustel (`getProviderCategory(provider) === "apikey"`). See tagab, et sissetulevad päringud kiirustundlikele ülesvoo API-võtmetele pannakse järjekorda ja neid piiratakse Bottleneck'i kaudu, selle asemel et need purskkuksid ülesvoo 429-vigadena. Turvavõrku saab alistada keskkonnamuutujaga `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` keelab, `true`/`1`/`on` sunnib sisse), mis läheb ette salvestatud armatuurlaua seadele (**Seaded → Vastupidavus** / `PATCH /api/resilience`).

**Ühendusepõhise `rateLimitProtection` semantika:**
Ühendusepõhist kiirusepiirangu kaitset jälgitakse pakkujaühenduste tõeväärtusväljaga `rateLimitProtection` (SQLite'is salvestatud kui `rate_limit_protection`):

- **Selgesõnaliselt sees (`rateLimitProtection === true`)**: Kiirusepiirangu kaitse on selle ühenduse jaoks selgesõnaliselt lubatud, olenemata pakkuja kategooriast või sellest, kas automaatse lubamise turvavõrk on sisse lülitatud.
- **Selgesõnaliselt väljas (`rateLimitProtection === false`)**: Keelab selgesõnalise kaitse, kuid **ei** jäta aktiivset API-võtme ühendust globaalsest automaatse lubamise turvavõrgust välja. Funktsioonis `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) on `false` ja `undefined` võrdväärsed: ainult väärtust `rateLimitProtection === true` käsitletakse selgesõnalise alistamisena. Kui `rateLimitProtection` on `false` (või määramata), vastab aktiivne API-võtme ühendus ikkagi automaatse lubamise tingimusele ja jääb kiirusepiirangu kaitse alla.
- **Ühendusepõhist loobumist pole**: Operaator ei saa praegu väljendada "see üksik aktiivne API-võtme ühendus peab töötama ilma kiirusepiirangu järjekorrakaitseta", säilitades samal ajal automaatse lubamise teistele aktiivsena. Et API-võtme ühendused töötaksid täielikult ilma kiirusepiirangu järjekordadeta, tuleb turvavõrk globaalselt välja lülitada (`RATE_LIMIT_AUTO_ENABLE=false` või `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Toetatud kirjutamisteed:**

- **`POST /api/rate-limits`**: Toetatud halduse kirjutamistee ühenduse `rateLimitProtection` lülitamiseks (`{ connectionId: string, enabled: boolean }`). Kutsumine väärtusega `enabled: true` lülitab selgesõnalise kaitse sisse; kutsumine väärtusega `enabled: false` eemaldab selgesõnalise kaitse (kuigi aktiivsed API-võtme ühendused jäävad globaalse turvavõrgu alla, kui automaatne lubamine on sees).
- **`PUT /api/providers/[id]`**: Tahtlikult **ei** võta vastu ega pööra väärtust `rateLimitProtection` (#11278). Pakkujaühenduse metaandmete uuendamine tee `PUT /api/providers/[id]` kaudu ei muuda kunagi salvestatud kiirusepiirangu kaitse olekut.

---

## 6. Aeglase voo läbilaskevõimega valvekoer (#9709)

Valikuline `resilienceSettings.streamRecovery.throughputWatchdog` valvur tuvastab ülesvoolu, mis saadab endiselt tükke, kuid toodab assistendi väljundit, mis jääb alla konfigureeritud kasuliku väljundkiiruse. See erineb teadlikult jõudeoleku ajalõpust: südamelöögid ja metaandmed ei lähtesta kumbagi taimerit ega loeta edenemiseks. See erineb ka raske katse tähtajast (#9153), mis jääb väljundkvaliteedist sõltumata absoluutseks ohutuks ülemmääraks.

Enne katkestamist vajab valvekoer soojendusperioodi, millele järgneb täielik veerev aken. See loendab teksti deltasid vestluse lõpuleviimistest ja vastustest API väljundsündmustest (konservatiivne UTF-8 baidi puhverserver), ignoreerib ainult kasutust ja tühje sündmusi ning peatab otsuse tegemise ajal, kui tööriistakutsung või arutlussündmused on lendu. See on vaikimisi keelatud ja seda saab lubada `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ga (see env-väärtus annab ainult vaikeväärtuse — võidab salvestatud `resilienceSettings.streamRecovery.throughputWatchdog.enabled` tõeväärtus; vt selle juhendi ülaosas olevat env-vs-armatuurlaua tähtsuse märkust); aken, soojenemine, minimaalne kiirus ja minimaalne mõõdetav väljund on piiratud normaalse vastupidavuse seadete normaliseerimiskihiga.

Kui see on lubatud, rakendatakse valvekatkestus ainult aktiivsele ülesvoolu katsele. Enne mis tahes kliendile nähtavaid baite võib olemasolev sama konto varajase taastamise tee katse uuesti avada. Pärast sidumist ei esitata voogu kunagi pimesi uuesti; järelliite saab õmmelda ainult olemasolev turvalise keskvoo jätkulepinguga. Lõpetamine jääb ühekordseks, nii et kasutusarvestust ja semafori vabastamist ei dubleerita.

---

## 7. Ülesvoolu oleku ümbermääratlemine (valesti teatatud kvoodivead)

**Ulatus:** üks ülesvoolu lüüs, mis teatab ajutisest kvoodi ammendumisest vale HTTP-olekuga.

**Eesmärk:** parandada eksitav olek ENNE klassifitseerimist, et allavoolu tarbijad (varumootor, kombinatsioonide koondamine, kliendile suunatud vastus) näeksid tõrke tegelikku uuesti proovimise võimalust.

Mõned lüüsid annavad AJUTISEST kvoodi ammendumisest teada mitteuuesti-proovitava HTTP-olekuga. `agentrouter.org` tagastab standardse `429` asemel `403` (mõnikord `400`) koos hiinakeelse kehaga
(`用户额度不足` / `额度不足`). Kliendid nagu Claude
Code käsitlevad `403`-i püsiva veana ja katkestavad seansi ning ilma paranduseta
klassifitseeriks varumootor selle `AUTH_ERROR`-iks, mitte kvoodisündmuseks.

**Teostus:**

- Register + sobitaja: `open-sse/config/upstreamStatusRestatement.ts` — pakkujate kaupa reeglite loend (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`), millele rakendatakse sobitust funktsiooni `applyStatusRestatement()` kaudu.
- Väljakutsekoht: `open-sse/handlers/chatCore.ts`-i plokk
  `providerFailure:` (umbes real 3654), kohe pärast seda, kui
  `parseUpstreamError()` töötleb ülesvoolu vastust, mille HTTP-olek näitab viga
  (`!providerResponse.ok`), ja enne mis tahes klassifitseerimise käivitamist, et iga allavoolu tarbija näeks parandatud olekut. `200` SSE-voo sisse põimitud vead läbivad eraldi hilisema voo töötlemise tee ja **ei ole** praegu selle haagi poolt kaetud — teadaolev piirang, mida pole agentrouteri vale oleku puhul veel vaja, sest selle viga avaldub veaga HTTP-olekuna.
- Uuesti proovimise sobivus: `429` kuulub loendisse `RETRY_AFTER_ELIGIBLE_STATUSES` (`open-sse/services/combo/unavailableRetryGate.ts`), seega kannab ümbermääratud viga tegelikku uuesti proovimise akent, selle asemel et avalduda surnud `403`-na.
- Sünteetiline `60s` väärtus `defaultRetryAfterMs`-i jaoks (`upstreamStatusRestatement.ts`) on ainult see, mida ümbermääratud vastus ütleb **kliendile**; see ei ole ühenduse sisemine jahutus-/lukustusperiood — seda juhib eraldi mehhanism, mis ümbermääratud viga tegelikult käsitleb (Connection Cooldowni astmeliselt kasvav tagasipöördumise viivitus, §2, API-võtmega pakkujate baasväärtus `3s`; või Model Lockout, §3, mudelipõhise kvoodiga pakkujate (nt agentrouter) puhul). Marsruuter võib sisemiselt uuesti proovimiseks sobivaks muutuda varem kui kliendile reklaamitav `60s` aken — see on tahtlik varu, mitte viga.

Püsivaid vigu (agentrouteri `无权访问模型` — sellele mudelile puudub juurdepääs) ei määrata KUNAGI ümber: `excludeMarkers` tühistab reegli isegi siis, kui `textMarkers` sobivad, mistõttu viga säilitab algse oleku ja miski ei proovi seda lõputult uuesti. Sobivat pakkuja klassifitseerimisreeglit
(`agentrouter-model-access-denied` failis `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklareeritud `6h` baasjahutus)
kasutab `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_enne_ üldist apikey-kategooria `FORBIDDEN` varajast tagastust, tingimusel
`honorsRuleLockScope(provider)` (#10334 — praegu ainult agentrouteri puhul `providerErrorRules.ts`-is oleva `HONORS_RULE_LOCK_SCOPE_PROVIDERS` lubatud loendi kaudu). Reeglis deklareeritud 6-tunnine jahutus liigub edasi väärtusena `fallbackResult.baseCooldownMs`, kuid see suunatakse endiselt olemasolevasse mudelipõhise kvoodi lukustuse teesse (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, mida #10334 ei muutnud, välja arvatud jahutuse allikas): see piiratakse operaatori `mlSettings.maxCooldownMs` väärtusega (vaikimisi `1_800_000ms` / 30 minutit), nagu kõik muud mudelilukustused, ning _püsiv lukustuse põhjus_ jääb olemasolevaks kõvakodeeritud väärtuseks `"forbidden"`, mitte reegli väärtuseks `"auth_error"` — kogu ahelas võetakse arvesse ainult jahutuse kestust, mitte põhjusestringi. Ühendus ise jääb aktiivseks; sama ühenduse sõsarmudeleid see ei mõjuta.

Ümbermääratud kvoodivead (`额度不足`) jõuavad tootmises pakkuja reeglini
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ilma oma deklareeritud jahutuseta — rakendub püsivuskihi skaleeritud tagasipöördumise vaikeviivitus). Alates versioonist #10334 kasutatakse `scope`-i
`ProviderErrorRuleMatch`-is kogu töövoos, kuid **ainult** pakkujate puhul, kes kuuluvad loendisse `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
praegu ainult `"agentrouter"`, tingimusel `honorsRuleLockScope()` kaudu). Kõigi
teiste pakkujate puhul jääb `scope` informatiivseks, täpselt nii nagu enne versiooni #10334.
`checkFallbackError` annab sobitatud reegli ulatuse edasi väärtusena
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) on jagatud kaitse, mis kinnitab, et
`ruleScope`-i on tõepoolest ohutu käsitleda ühenduseülese, isetaastuva signaalina (ulatus `"connection"`, põhjus `quota_exhausted`, mitte kunagi `permanent`, mitte kunagi `creditsExhausted` — kaitse juhuks, kui tulevases reeglis seotakse ulatus
`"connection"` püsiva konto olekuga). Seda kutsuvad kaks tarbijat:

- **Püsivus** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  selle asemel et langeda passthrough-pakkuja **mudelipõhise** lukustuse
  harusse (`agentrouter` on `passthroughModels: true` → `hasPerModelQuota()`
  tagastab `true`), rakendab see **ajutise ühenduse jahutusperioodi** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, mitte kunagi lõplikku olekut
  (`credits_exhausted`/`banned`/`expired`) — nii taastub ühendus pärast
  jahutusperioodi lõppu ise, selle asemel et nõuda mandaatide käsitsi
  lähtestamist.
  Ühenduste puhul, millel on `disableCooling: true` (#2997), jäetakse see vahele:
  see loobumisvalik liigub hoopis mudelipõhise lukustuse juurde (dokumenteeritud
  kompromiss — vt haru kohal olevat koodikommentaari).
- **Sama päringu kombineeritud marsruutimine** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): sama kaitse märgib ühenduse
  mälusisesesse komplekti `exhaustedConnections`, mille võti on
  `${provider}:${connectionId}`. See jätab vahele ainult allesjäänud SAMA
  PÄRINGU sihtmärgi, mille enda sihiobjekt juba sisaldab täpselt seda
  `connectionId`-d (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` enne `exhaustedConnections`-i otsingut) — tavaline
  mudeliloendiga kombineeritud marsruut, kus sõsersihtmärgid ei sisalda enda
  `connectionId`-d ja üks neist lahendatakse iga väljasaatmise korral vastuse
  `X-OmniRoute-Selected-Connection-Id` päisest, ei jõua kunagi selle võtme
  vasteni. Selle tavapärase juhu korral EI OLE allesjäänud haru äsja
  ammendatud konto taaskasutamise tegelik kaitse see komplekt — selleks on
  hoopis ülal kirjeldatud püsivuskiht (ühenduse `rateLimitedUntil` on nüüd
  tulevikus) koos sellega, et sama kaitse surub tõrke korral alla
  `transientRateLimitedProviders`-i (vt jaotist „Kaheastmeline ülesehitus” ja
  koodikommentaari `targetExhaustion.ts`-i
  `isAgentrouterConnectionQuotaScope`-haru juures): kuna komplekti ei märgita,
  EI rakendu `combo.ts`-i `allowRateLimitedConnection` sundlubamine
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) pakkuja ülejäänud
  harude puhul, mistõttu mandaadi valiku `rateLimitedUntil`-i filter
  (`src/sse/services/auth.ts:1238`) toimib tavapäraselt ning allesjäänud haru
  valib kas mõne muu, endiselt sobiliku agentrouteri ühenduse või nurjub,
  kuna sobivaid mandaate pole — see ei sunni end tagasi ühendusele, mille see
  haru just jahutusperioodile määras.

### Kaheastmeline ülesehitus: oleku ümberjutustus, seejärel klassifitseerimine

Oleku ümberjutustuse (`upstreamStatusRestatement.ts`) ja pakkuja
klassifitseerimise reeglid (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) on eraldi registrid, mis kasutavad mõlemad võtmena
pakkuja ID-d ja tekstimarkereid, kuid käivituvad eri kohtades ja täidavad eri
eesmärke: ümberjutustus kirjutab HTTP-oleku varakult `chatCore.ts`-is ümber;
klassifitseerimisreeglid valivad varuvariandi `reason` ja lukustuse `scope`
(`model` / `provider` / `connection`) `checkFallbackError()`-i sees
(`open-sse/services/accountFallback.ts`).

Klassifitseerimisreeglid näevad täielikku vea **teksti** (seda on vaja kehas
olevate markerite, näiteks `额度不足`, sobitamiseks) nende pakkujate puhul, kes
on loetletud faili `providerErrorRules.ts`
`FULL_TEXT_RULE_PROVIDERS` lubatud loendis — praegu ainult `"agentrouter"`.
Kõigi teiste **sisseehitatud kataloogi** pakkujate puhul annab
`checkFallbackError` funktsioonile `getProviderErrorRuleMatch` edasi ainult
struktureeritud vea (`{code, type}`), millest piisab päise-, oleku- ja
koodipõhiste reeglite jaoks, kuid mitte kehateksti markerite jaoks.
Abifunktsioon `resolveRuleMatchBody()` teeb selle valiku: lubatud loendis
olevate pakkujate puhul täielik veatekst, muul juhul struktureeritud viga.
**Sisseehitatud** pakkuja lisamine loendisse `FULL_TEXT_RULE_PROVIDERS` on
selgesõnaline pakkujapõhine lubamine — see on olemas selleks, et iga loendis
mitte oleva pakkuja vaikekäik jääks bait-baidilt muutumatuks.

Reegli `scope` (`model` / `provider` / `connection`) on eraldi lubamine
valikust `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` avaldab selle
ainult kujul `fallbackResult.ruleScope` ning järgnevad tarbijad arvestavad
sellega muuna kui informatiivse sildiga ainult nende pakkujate puhul, kes on
samas failis loetletud `HONORS_RULE_LOCK_SCOPE_PROVIDERS` lubatud loendis
(läbi `honorsRuleLockScope()` — praegu ainult `"agentrouter"`). Vt ülal
jaotist „Kvoodivigade ümberjutustus”, et näha, mida teeb
`scope: "connection"` vaste tegelikult pärast pakkuja sellesse lubatud
loendisse lisamist.

**#11104 — operaatori deklareeritud reeglid mööduvad mõlemast lubatud loendist.**
Operaator saab käitusaegse pakkujapõhise reegli deklareerida seadistuse kaudu
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
ilma seda faili muutmata. Operaatori reegli piiramine
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-iga — need loendid
on mõeldud sisseehitatud kataloogireeglite **vaikekäitumise** kaitsmiseks —
muudaks seadistusmehhanismi iga pakkuja puhul peale juba loetletud pakkujate
toimimatuks, sest reegli deklareerimine on juba operaatori selgesõnaline
lubamine. Nii `resolveRuleMatchBody()` kui ka `honorsRuleLockScope()` kontrollivad
esmalt `hasOperatorRuleForProvider()`-it: operaatori reegliga pakkuja saab
toorveateksti ja tema deklareeritud `scope`-i järgitakse olenemata sellest,
kas pakkuja esineb ühes või mõlemas lubatud loendis.

**Operaatori deklareeritud reeglid** (`OperatorProviderErrorRule`): igal reeglil
on valikuline `status` ja valikuline `match` (veateksti lihtne,
tõstutundetu alamstring, mitte kunagi RegExp, mistõttu ei saa see põhjustada
ReDoS-i) ning määratud peab olema vähemalt üks neist kahest. Kui mõlemad on
määratud, kasutatakse nende vahel tingimust AND; välja puudumine sobitub
kõigega, seega `{match: "insufficient_quota"}` sobitub mis tahes olekuga,
mis seda koodi sisaldab. Võidab esimene sobiv reegel. `cooldownMs` lubab
väärtuse kuni 30 päeva; reegleid võib kokku olla kõige rohkem 50.

**Kõikehõlmavad vaikeväärtused** (`settings.providerErrorDefaults`, lubatav, määratakse
`setOperatorProviderErrorDefaults` kaudu): `{[provider]: {cooldownMs, scope?, reason?}}`,
kus `cooldownMs` on 1 minutist kuni 30 päevani. Vaikeväärtust rakendatakse ainult siis,
kui ükski operaatori reegel ega sisseehitatud kataloogireegel ei sobinud, ning ainult
402, 403, 408, 429 ja 5xx vigadele. Päringu kuju vead (400, 404, 409, 413, 422) ja
paljad 401-d säilitavad oma senise käsitluse. Kui `reason` pole sõnaselgelt määratud,
tuleneb põhjus olekust samamoodi nagu `classifyError` puhul. Vaikeväärtuse deklareerimine
loetakse `hasOperatorRuleForProvider()` jaoks operaatori reegliks, seega järgitakse selle
`scope`-i (vaikimisi `"connection"`). Vaikeväärtuse tegelik ooteaeg on pikem väärtusest
`cooldownMs` ja teenusepakkuja enda korduskatse vihjest (`Retry-After`,
`x-ratelimit-reset` või kehas olev lähtestamisvihje — sama vihje, mida mootor järgib, kui
ühenduse ooteaja seadistus "use upstream retry hints" on sisse lülitatud), mistõttu võib
vaikeväärtus lühikest ülesvoolu vihjet pikendada, kuid ei lühenda kunagi tegelikku
lähtestamist. Sõnaselge operaatori reegel säilitab täpselt oma `cooldownMs`-i. Ei reegel
ega vaikeväärtus möödu ühenduse ooteaja kaitsetest `markAccountUnavailable`-is: aktiivset,
pikemat ooteaega ei lühendata ning lõplikku olekut ei kirjutata üle. Sisseehitatud
tekstidetektorid, mis käivituvad `checkFallbackError`-is varem (krediidid ammendatud,
päevane kvoot, konto deaktiveeritud), jäävad oma fraaside puhul endiselt eelisjärjekorda.

**Teadaolev puudujääk — `providerRuleRegistry`-it ei kontrollita HTTP 400 puhul.**
`checkFallbackError`-i `BAD_REQUEST` haru klassifitseerib oleku 400 täielikult oma
mustrimassiivide (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` jne failis `accountFallback.ts`) kaudu ning tagastab tulemuse
enne, kui jõutakse ülal asuva `configuredRule`/`getProviderErrorRuleMatch` haruni.
Sisseehitatud kataloogireegel (või operaatori reegel) väärtusega `status: 400` on
süntaktiliselt korrektne, kuid ei käivitu kunagi. Ükski olemasolev reegel ei sihi praegu
400-d, seega tootmises midagi ei mõjuta — kuid tulevase 400 reegli jaoks tuleb esmalt
seda haru muuta. See on suurem muudatus kui ühe reegli lisamine (see klassifitseerib 400
ümber kõigi teenusepakkujate puhul, kes juba tuginevad massiivipõhisele käitumisele) ning
jääb ühe teenusepakkuja reegli lisamise ulatusest välja.

### Uue kvooti valesti esitava lüüsi lisamine

1. Registreerige üks reeglimassiiv `statusRestatementRegistry`-is
   (`open-sse/config/upstreamStatusRestatement.ts`). Hoidke `textMarkers`-id
   teenusepakkujapõhistena; ärge taaskasutage üldisi ingliskeelseid fraase, mis võivad
   sattuda konflikti `CREDITS_EXHAUSTED_SIGNALS`-iga
   (`open-sse/services/accountFallback.ts`).
2. Soovi korral registreerige klassifitseerimisreeglid
   `open-sse/config/providerErrorRules.ts`-is (`providerRuleRegistry`), et valida õige
   lukustuse ulatus (`connection` kontot hõlmava kvoodi puhul, `model` mudelipõhiste
   vigade puhul). See samm jõustub tootmises ainult nende teenusepakkujate puhul, kelle
   reeglid vajavad kogu veateksti (kehamarkerid): lisage teenusepakkuja ID samas failis
   `FULL_TEXT_RULE_PROVIDERS`-isse — vastasel juhul edastab `checkFallbackError` reeglile
   ainult struktureeritud `{code, type}` vea ning kehateksti reegel ei sobitu aktiivse
   liiklusega kunagi. Ainult `status`-i/`headers`-ite põhjal sobituvad reeglid (nagu
   Opencode'i või Minimax'i omad) seda lubamist ei vaja. Eraldi, kui reegel deklareerib
   `scope: "connection"` ja eesmärk on tegelik kogu ühendust hõlmav ooteaeg koos sama
   päringu kombinatsiooni vahelejätmisega (mitte ainult informatiivne silt), lisage
   teenusepakkuja ID samas failis `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-isse — see määrab,
   kas `isAgentrouterConnectionQuotaScope()`-i laadset kasutust lubatakse
   `markAccountUnavailable()`-is (`src/sse/services/auth.ts`) ja
   `applyComboTargetExhaustion()`-is
   (`open-sse/services/combo/targetExhaustion.ts`); ilma selleta liigub `scope`
   endiselt läbi `fallbackResult.ruleScope`-i, kuid miski ei rakenda seda.
3. Lisage ühiktestid, mis peegeldavad faile
   `tests/unit/upstream-status-restatement.test.ts` ja
   `tests/unit/agentrouter-error-rules.test.ts` (kaasa arvatud
   not-permanent / not-creditsExhausted kaitsed ning — kui teenusepakkuja vajab
   lubatud loendit — test, mis kinnitab, et `resolveRuleMatchBody()` tagastab kogu teksti
   ainult selle teenusepakkuja puhul).

`chatCore.ts`, `classifyError`-i ega kombinatsiooni jaoks pole muudatusi vaja.

#### Egress-koppadega lukustus (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-is olevate teenusepakkujate (opencode'i perekond)
puhul käsitletakse ülesvoolu teenusepakkujat IP-põhiste koppadega teenusepakkujana
(opencode'i tasuta tase on IP-, mitte kontopõhine — vt #9611): oleku-429, mis on
klassifitseeritud väärtuseks `quota_exhausted` **või** `rate_limit_exceeded`, jahutab enne
rotatsiooni alustamist kõiki lubatud perekonna ühendusi, mille viimane teadaolev
väljamineku IP vastab tõrkunud ühenduse omale
— vältides N-1 garanteeritult ebaõnnestuvat ülesvoolu kutset (sama kujuga nagu
#10460/#10525). `rate_limit_exceeded` on sihilikult kaasatud: teel
`markAccountUnavailable`-isse ei sobitu opencode'i-põhised reeglid kunagi
(`checkFallbackError`-ile ei edastata päiseid/keha, opencode ei kuulu
`FULL_TEXT_RULE_PROVIDERS`-isse), seega klassifitseeritakse tellimuse kvoodi teksti
("monthly usage limit reached") sisaldav 429 kvooditeksti varuvariandi
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 tunni pikkune ooteaeg) kaudu
väärtuseks `quota_exhausted` enne, kui `status_429` reeglini jõutakse — samal ajal kui
kvooditekstita 429 (tavaline kiiruse piiramine) klassifitseeritakse `status_429` reegli
kaudu väärtuseks `rate_limit_exceeded` ning IP-perekond jahutatakse endiselt. Lubatud
teenusepakkuja puhul on IP-põhine kiirusepiirang sama signaal mis ammendatud kvoot.
Ausad piirangud:

- **Parimal võimalikul viisil**: lukk lahendab ühenduse viimase teadaoleva `egress_ip` väärtuse
  tabelist `proxy_logs` (24 tunni aken, sünkroonne, vahemäluta). Külm vahemälu
  (egress-IP-d pole kunagi kontrollitud) või rea puudumine → tõrkuvat ühendust jahutatakse endiselt
  haru kaudu (salvestatakse nagu praegu), ainult ühtegi kaasühendust ei lukustata.
- **Mitte kunagi lõplik**: jahutus on uuenev kvoodiaken
  (`testStatus: "unavailable"`); püsivat olekut ei tuletata kunagi IP-taseme signaalist.
  `disableCooling`-iga ühendused jätavad haru täielikult vahele.
- **Lukustuse detailsus muutub lubatud loendis oleva perekonna jaoks**: see on ulatuse muutus, mitte ainult kaasühenduste optimeerimine. opencode on `passthroughModels`
  pakkuja, seega tekitas 429 enne seda haru mudelipõhise lukustuse; nüüd tekitab see ühenduse jahutuse — ka operaatori puhul, kes käitab üksikut ühendust ilma ühegi kaasühenduseta. See on detailsus, mille opencode'i reeglitabel juba õigeks tunnistab (`scope: "connection"`,
  `providerErrorRules.ts`), kuid mida seni ei ole kunagi rakendatud, sest opencode ei kuulu hulka `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Haru kirjutab tõrkuva
  ühenduse jahutuse + `backoffLevel` väärtuse ise, peegeldades
  ühenduse ulatusega agentrouteri haru, ja tagastab tulemuse — mudelipõhise blokeeringu ning alloleva üldise tee juurde ei jõuta kunagi.
- **Kombod on kaasatud**: nagu agentrouteri harus, eirab ulatus sihilikult 429 puhul combo-kutsuja rakendatavat
  `persistUnavailableState`/`isCombo` alandamist. Mudelipõhine lukustus ei ole selle ulatuse nõrgem vorm, vaid
  vale üksus: see ei ütle midagi ammendatud IP kohta, mistõttu combo rotatsioon jätkaks iga kaasühenduse kohta ühe kindlalt ebaõnnestuvale kõne tegemist.
- **Kaasühenduste turvalisus**: juba lõplikus olekus olevat kaasühendust (banned/credits_exhausted)
  või juba pikemas jahutuses olevat kaasühendust ei kirjutata kunagi üle.
- **Eksklusiivne lubatud loend**: `EGRESS_BUCKETED_LOCK_PROVIDERS` laiendamine on
  omaniku selgesõnaline otsus; üldist ühendamist ei tehta (muster #10334/#10419). Kaasühenduste päring seob
  sama lubatud loendi, selle asemel et seda SQL-i literaalina korrata, seega selle laiendamine jääb ühe rea muudatuseks.
- **Egress-IP rotatsioon mõlemas suunas**: otsinguaken (24 tundi) on egress-IP vahemälu TTL-ist (5 minutit) palju
  laiem, seega „viimane teadaolev IP” on ajalugu,
  mitte praegune olek. Kui ühenduse proksi roteerus akna jooksul, võib lukustus
  **tegelikult jagatud IP-st mööda vaadata** (salvestatud IP on uus,
  ammendamata IP) — ja sümmeetriliselt võib see **jahutada kaasühendust, mis on ammendatud IP-st
  vahepeal eemale roteerunud**. Teine juhtum maksab sellele kaasühendusele ühe
  jahutusakna; mõlemad on ajaloopõhise otsingu aktsepteeritud parimal võimalikul viisil piirangud.
- **Kulu**: kaks piiratud `proxy_logs`-i läbivaatust (akna järgi filtreeritud `idx_pl_timestamp` kaudu), ainult 429 sagedusega. Uut indeksit ei lisata (migratsioon 134
  YAGNI). Mõõdetud mõõduka suurusega tegeliku liiklusega andmebaasi koopial; suure läbilaskevõimega eksemplar sisaldab samas aknas proportsionaalselt rohkem ridu.

## Muud vastupidavuse omadused

- **22 marsruutimisstrateegiat** (prioriteedi, kaalutud, ümmargune, kontekstirelee, täitmine enne, p2c, juhuslik, vähimkasutatud, kuluoptimeeritud, lähtestamisteadlik, lähtestamisaken, aegumistähtaeg, pearuum, kvoodiga kaalutud, range-juhuslik, automaatne, lkgp, konteksti optimeeritud, vahemälu optimeeritud, fusioon) —, [AUTO-COMBO.md](../routing/AUTO-COMBO.md) )
- **Lähtestateadlik marsruutimine** (v3.8.0) — eelistab ühendusi kvoodi lähtestamise aja järgi.
- **Taustarežiimi halvenemine** — vastused API `background: true` on sünkroonitud hoiatusega.
- **Dünaamiline tööriistapiirangu tuvastamine** — loobub pakkujatest, kui tööriistade arvu piirangud saavutavad.
- **Hädaabi** — juhib `OMNIROUTE_EMERGENCY_FALLBACK`; operaatorid saavad selle ilma taaskäivitamiseta lehel Funktsioonilipud alistada.

---

## Silumine

- Kaalutud combo vastab `503 all_targets_cooling_down` (`Retry-After` on määratud, `diagnostics.excluded` loetleb kõik sihtmärgid koos `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool on seadistatud ja ühendatud, iga sihtmärk on lihtsalt tõrkekindlustaimeri poolt välistatud; hoiatus `[COMBO] Weighted selection: every target excluded before dispatch — …` nimetab põhjused ja järelejäänud sekundid. Sama combo `404 no_executable_targets` tähendab, et ükski tõrkekindlustaimer polnud kaasatud (pole midagi käivitada või iga konto ei läbinud saadavuse kontrolli). Ehitatud failis `open-sse/services/combo/pinRecovery.ts` failis `targetResolution.ts` kogutud välistamiste põhjal.
- Kõik pakkuja võtmed jäetakse vahele → kontrolli nii kaitselüliti olekut KUI ka iga ühenduse välju `rateLimitedUntil`/`testStatus`.
- Pakkuja jääb pärast lähtestamisakent jäädavalt välistatuks → kood loeb otse `state`-väärtust meetodite `getStatus()`/`canExecute()` asemel.
- Üks võti ebaõnnestub, teised peaksid töötama → eelista ühenduse jahutust, mitte kaitselülitit.
- Ainult üks mudel ebaõnnestub → eelista mudeli lukustust, mitte ühenduse jahutust.
- Olek peaks ise taastuma, kuid ei taastu → kontrolli tulevikku osutavat ajatemplit ja lugemisteed, mis värskendaks aegunud olekut. Püsivad olekud nõuavad käsitsi muutmist.

---

## Käitusaja olek — agendi kiirviide

> Tõsteti sõna-sõnalt üle failist `AGENTS.md` → jaotis "Resilience Runtime State" (PR #12743), et agendi
> juhend jääks alla 40k kontekstieelarve. Tegemist on ülaltoodud jaotiste tihendatud, agendile
> suunatud vaatega; nummerdatud jaotised jäävad täielikuks viiteks.

OmniRoute'il on kolm omavahel seotud, kuid eristatavat ajutiste tõrgete mehhanismi. Hoia nende
ulatused marsruutimiskäitumise silumisel selgelt eraldi. Kiirülevaate saamiseks vaata
[3-kihilist tõrkekindluse diagrammi](../diagrams/exported/resilience-3layers.svg)
(lähtefail: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)).

### Pakkuja kaitselüliti

**Ulatus**: terve pakkuja, nt `glm`, `openai`, `anthropic`.

**Eesmärk**: lõpetada liikluse saatmine pakkujale, mis ülesvoolu/teenuse tasemel korduvalt
ebaõnnestub, et üks ebatervislik pakkuja ei aeglustaks iga päringut.

**Teostus**:

- Põhiklass: `src/shared/utils/circuitBreaker.ts`
- Vestluse värava ja täitmise sidumine: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Käitusaja oleku API: `src/app/api/monitoring/health/route.ts`
- Jagatud ümbrisefunktsioonid: `open-sse/services/accountFallback.ts`
- Püsistatud oleku tabel: `domain_circuit_breakers`

**Olekud** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: tavaliiklus on lubatud.
- `DEGRADED`: varajase hoiatuse tsoon — tõrked ületasid degraderumise läve, kuid mitte veel
  kaitselüliti läve; liiklus voolab endiselt ja töölauad kuvavad hoiatust. Kehtiv ühenduse test
  või vaikne periood ilma uute tõrgeteta viib oleku tagasi `CLOSED`-olekusse
  (aken on kirjeldatud failis `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: pakkuja on ajutiselt blokeeritud; kutsujad saavad provider-circuit-open vastuse
  või combo-marsruutimine lülitub teisele sihtmärgile.
- `HALF_OPEN`: lähtestamise ajalõpp on möödunud; lubatakse katsepäring. Edu sulgeb
  kaitselüliti, ebaõnnestumine avab selle uuesti.

**Vaikeväärtused** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, mida tarbitakse
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` kaudu failis `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` failis `src/sse/handlers/chatHelpers.ts`). Kogu pakkuja
katkestav kaitselüliti töötab parameetritel `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profiil  | degradeerub | avaneb (`circuitBreakerThreshold`) | lähtestus (`circuitBreakerReset`) |
| -------- | ----------: | ---------------------------------: | --------------------------------: |
| OAuth    |         `5` |                                `8` |                             `60s` |
| API-võti |         `7` |                               `12` |                             `30s` |
| Kohalik  | (tuletatud) |                                `2` |                             `15s` |

`PROVIDER_PROFILES` määratleb ka `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) ja `providerCooldownMs` (5/10/1 min): need juhivad
**valikulise, sisselülitatava globaalse pakkuja jahutuse (Provider Cooldown) aknaväravat**
(`PROVIDER_COOLDOWN_ENABLED`, vaikimisi välja lülitatud) — pakkujataseme kirjet failis
`open-sse/services/providerCooldownTracker.ts` loetakse jahutavaks alles pärast
`providerFailureThreshold` tõrget ajavahemiku `providerFailureWindowMs` jooksul ning seejärel
jahutub see `providerCooldownMs` aja vältel. Need EI OLE aktiivse kaitselüliti läved — ära
hääleta neid eelduses, et need mõjutaksid kaitselüliti käitumist. Iga vaikeväärtust saab
alistada keskkonnamuutujatega `OMNIROUTE_PROVIDER_BREAKER_*` ja
`OMNIROUTE_CIRCUIT_BREAKER_*`; käitusajal täpne viitetabel asub failis
`docs/architecture/RESILIENCE_GUIDE.md`.

Pakkuja kaitselüliti peaksid käivitama ainult pakkujataseme tõrkekoodid:

```ts
(408, 500, 502, 503, 504);
```

Ära käivita kogu pakkuja kaitselülitit tavaliste konto-, võtme- või mudelivigade puhul,
nagu enamik `401`-, `403`- või `429`-juhtumeid. Need kuuluvad tavaliselt ühenduse jahutuse
või mudeli lukustuse valdkonda. Tavaline API-võtme pakkuja `403` peaks olema taastatav,
välja arvatud juhul, kui see liigitatakse lõplikuks pakkuja- või kontoveaks.

Katkesti kasutab laiska taastumist, mitte taustataimerit. Kui olek `OPEN` aegub,
värskendavad lugemistoimingud nagu `getStatus()`, `canExecute()` ja
`getRetryAfterMs()` oleku väärtuseks `HALF_OPEN`, nii et armatuurlauad ja
kombo-kandidaatide koostajad ei välista aegunud pakkujat igavesti.

### Ühenduse jahutusaeg

**Ulatus**: üks pakkuja ühendus/konto/võti.

**Eesmärk**: üks vigane võti/konto ajutiselt vahele jätta, lastes samal ajal sama
pakkuja teistel ühendustel päringuid edasi teenindada.

**Teostus**:

- Kirjutamis-/uuendamistee: `src/sse/services/auth.ts::markAccountUnavailable()`
- Konto valik/filtreerimine: `src/sse/services/auth.ts::getProviderCredentials...`
- Jahutusaja arvutamine: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Seaded: `src/lib/resilience/settings.ts`

Olulised väljad pakkuja ühendustel:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Konto valimisel jäetakse ühendus vahele, kui:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Jahutusajad on samuti laisad: kui `rateLimitedUntil` jääb minevikku, muutub ühendus
taas kasutuskõlblikuks. Edukal kasutamisel puhastab `clearAccountError()` väljad
`testStatus`, `rateLimitedUntil`, veaväljad ja `backoffLevel`.

Ühenduse jahutusaja vaikekäitumine:

- OAuth põhijahutusaeg: `5s`.
- API-võtme põhijahutusaeg: `3s`.
- API-võtme `429` korral tuleks võimalusel eelistada päritud serveri korduskatsevihjeid
  (`Retry-After`, lähtestamispäised või parsitav lähtestamistekst).
- Korduvad taastatavad tõrked kasutavad eksponentsiaalset taganemist:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Thundering-herd-probleemi ennetav kaitse takistab sama ühenduse samaaegsetel tõrgetel
jahutusaega korduvalt pikendada või `backoffLevel`-it topelt suurendada.

Lõppolekud ei ole jahutusajad. `banned`, `expired` (mis muutub lõppolekuks alles
pärast N piiratud arvu korduskatseid läbi `EXPIRED_RETRY_MAX`) ja
`credits_exhausted` on mõeldud jääma kättesaamatuks, kuni mandaati/seadeid muudetakse
või operaator need lähtestab. Ärge kirjutage lõppolekuid üle ajutise jahutusolekuga.

### Mudeli blokeerimine

**Ulatus**: pakkuja + ühendus + mudel.

**Eesmärk**: vältida kogu ühenduse keelamist juhul, kui ainult üks mudel on selle
ühenduse jaoks kättesaamatu või kvoodipiiratud.

Näited:

- Mudelipõhise kvoodiga pakkujad, kes tagastavad `429`.
- Kohalikud pakkujad, kes tagastavad ühe puuduva mudeli korral `404`.
- Pakkujapõhised režiimi/mudeli õigustega seotud tõrked, näiteks valitud Groki režiimid.

Mudeli blokeerimise loogika asub failis `open-sse/services/accountFallback.ts` ja
võimaldab samal ühendusel teisi mudeleid edasi teenindada.

### Silumisjuhised

- Kui kõik pakkuja võtmed jäetakse vahele, uurige nii pakkuja katkesti olekut kui ka
  iga ühenduse `rateLimitedUntil`/`testStatus` väärtusi.
- Kui pakkuja tundub pärast lähtestamise akent jäädavalt välistatud, kontrollige, kas
  kood loeb töötlemata `state` väärtust selle asemel, et kasutada
  `getStatus()`/`canExecute()`.
- Kui üks pakkuja võti ebaõnnestub, kuid teised peaksid töötama, eelistage ühenduse
  jahutusaega pakkuja katkestile.
- Kui ebaõnnestub ainult üks mudel, eelistage mudeli blokeerimist ühenduse
  jahutusajale.
- Kui olek peaks iseenest taastuma, peaks sellel olema tulevane
  ajatempel/lähtestamise ajalõpp ja lugemistee, mis aegunud olekut värskendab.
  Püsivad olekud nõuavad mandaadi või konfiguratsiooni käsitsi muutmist.

---

## TLS-i sõrmejäljed ja varjatus

Tarnijapõhine varjatus (JA3/JA4, CCH, obfuskeerimine) on dokumenteeritud eraldi — vt `docs/security/STEALTH_GUIDE.md` (git; ei kompileerita kataloogi `/docs`).

---

## Vastupidavuse testimine (faas 8 · plokk C)

Lisaks vastupidavusloogika ühiktestidele koormavad kolm testi käituskeskkonda tegelikes stressi- ja tõrkeolukordades (kõik on integratsiooni-/öötestid — ükski ei blokeeri PR-sid):

| Test        | Kirjeldus                                                                                                                                                                                                            | Käivitamine                            |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | Võltsitud ülesvoolu sõlm süstib tegelikku latentsust, lähtestamisi, ajalõppe ja 503-vigu; kontrollib, et kaitselüliti (circuit breaker) avaneb/taastub ja et `checkFallbackError` liigitab 503 taastatava varuveana. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Heap-growth | ~500 voogu iga `createSSEStream` kohta `--expose-gc` all; ebaõnnestub, kui hunnik (heap) kasvab üle ülempiiri (OOM-kaitse #3069).                                                                                    | `npm run test:heap`                    |
| k6 soak     | Pidev koormus `/api/monitoring/health` vastu; p95- ja veakünnised.                                                                                                                                                   | `k6 run tests/load/k6-soak.js` (öösel) |

Teste orkestreerib `.github/workflows/nightly-resilience.yml` (cron + käsitsi käivitamine). Vaikimisi `test:integration` käigus jätavad kaaose- ja hunniku testid end ise vahele (ilma `RUN_CHAOS_INT`/`--expose-gc`-ta).

---

## Vaata ka

- [Arhitektuurijuhend](./ARCHITECTURE.md) — Süsteemi arhitektuur ja sisemised mehhanismid
- [Kasutusjuhend](../guides/USER_GUIDE.md) — Tarnijad, kombod, CLI-integratsioon
- [Auto-Combo mootor](../routing/AUTO-COMBO.md) — 16-faktoriline skoorimine, režiimipaketid
