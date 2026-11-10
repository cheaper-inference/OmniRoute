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

## 2. Ühenduse jahtumisperiood

**Ulatus:** ühe pakkuja ühendus/konto/võti.

**Eesmärk:** jätta üks vigane võti vahele, samal ajal kui teised sama pakkuja ühendused jätkavad teenindamist.

**Rakendus:**

- Kättesaamatuks märkimine: `src/sse/services/auth.ts::markAccountUnavailable()`
- Valik: `getProviderCredentials*` samas failis
- Jahtumisperioodi arvutus: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Seaded: `src/lib/resilience/settings.ts`

**Väljad ühenduse kohta:**

- `rateLimitedUntil` — ajatempel, milleni jahtumisperiood kestab
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponentsiaalse taandumise loendur

**Vaikimisi jahtumisperioodid:**

- OAuth-i algväärtus: 5 s
- API-võtme algväärtus: 3 s
- API-võtme 429: eelistab ülesvoolu `Retry-After`-i / lähtestuspäiseid / parsitavat lähtestusteksti
- Taandumine: `baseCooldownMs * 2 ** failureIndex`

**Pakkujapõhine korduskatse viivitus.** Pakkuja üksikasjade lehel on **Korduskatse viivitus**-i valik (Automaatne,
15 s kuni 1 h). See salvestab väärtuse `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
(1–21600) päringu `PATCH /api/resilience` kaudu. Kui piirkiiruse vea korral puudub ülesvoolu korduskatse
vihje, asendab see väärtus pakkuja skaleeritud taandumise ning lähtestab `backoffLevel`-i väärtusele 0
(`open-sse/services/rotationConfig.ts::overrideFor`). Piirkiiruse vea prioriteedijärjekord kõrgeimast madalaimani:
ülesvoolu korduskatse vihje, seejärel ühendusepõhine `providerSpecificData.rotationOverrides.rateLimitResetSeconds`,
seejärel pakkujapõhine korduskatse viivitus, seejärel keskkonnamuutuja
`OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS`, seejärel skaleeritud taandumine. Automaatne valik eemaldab välja.
See mõjutab ainult piirkiiruse põhjust, mitte lõppolekuid.

**Massilise samaaegse korduskatse vastane kaitse:** takistab samaaegsetel tõrgetel jahtumisperioodi ülemäärast pikendamist või `backoffLevel`-i topelt suurendamist.

**Samaaegsuspiirangu 429-d ei tõsta taandumistaset.** `429`, mille keha teatab samaaegsuspiirangust
("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`),
tähendab, et konto on terve, kuid hõivatud.
`checkFallbackError()` tagastab põhjuse `concurrency_limited`: lülitu kohe järgmisele ühendusele,
jahuta seda ühendust fikseeritud väärtuse `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) või ülesvoolu korduskatse vihje
võrra, jäta `backoffLevel` muutmata ja määra `skipProviderBreaker`.
Selgesõnaline kvoodi keha on endiselt ülimuslik, seega kvoodimustrile vastav keha jääb kvoodiotsuseks.
Tuvastamine: `looksLikeConcurrencyLimit()` failis `src/shared/utils/classify429.ts`;
otsus: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (kaitselüliti `FailureKind`)
jääb muutmata ja loeb nende kehade korral endiselt väärtust `rate_limit`.

**Voo sisu seiskumised ei jahuta kontot.** Kui sisu seiskumise valve
(`open-sse/utils/streamHandler.ts`) loobub voost, mis ei saatnud õigeaegselt mudeli väljundit,
salvestab `markAccountUnavailable()` vea ühendusele, kuid ei määra jahtumisperioodi: seiskumine kuulub
selle päringu juurde, enamasti on põhjuseks pikk arutluskäik, mille väljund pole veel saabunud.
Operaatorid saavad selle funktsiooni valikuliselt lubada seadega `resilienceSettings.streamStallCooldown.enabled`
(vaikeväärtus `false`).

**Valikuline latentsussignaal konto valimiseks `p2c` abil.** Iga lähetatud katse salvestab ühenduse
(ning ühenduse ja mudeli paari) kohta mällu ajani esimese baidini ja tulemuse libisevas aknas:
viimased 20 näidist 15 minuti jooksul
(`open-sse/services/connectionLatencyTracker.ts`, salvestatakse funktsioonist `safeLogEvents()` failis
`src/sse/handlers/chatHelpers.ts`). Kui `resilienceSettings.p2cLatency.weight` on suurem kui `0`
(vahemik 0–20, vaikeväärtus `0` = välja lülitatud), lisab `compareP2CConnections()` failis
`src/sse/services/auth.ts` paari igale kandidaadile kuni `weight` punkti. Pool sellest pärineb
latentsusest suhtena kiiremasse kandidaati (kaks korda aeglasem kandidaat saab kogu poole) ja pool libisevast
veamäärast. Seda komponenti rakendatakse ainult siis, kui mõlemal kandidaadil on vähemalt 3 näidist, nii et
uusi kontosid ei karistata, ning selle ülempiir jääb kvoodi tõttu blokeeritud ja kvoodi ammendanud kontode
karistustest madalamaks. See ei lisa eraldi kaitselülitit: tõrkuvaid kontosid käsitlevad endiselt
jahtumis-, lukustus- ja kaitselülitikihid. Määra see päringuga `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Arutluskaadrid taaskäivitavad sisu seiskumise eelarve.** Arutlusmudel võib enne esimest nähtavat märki
mõelda minuteid: Claude edastab `thinking_delta`-kaadreid, mille mõtlemistekst võib olla tühi, ja Responses API
edastab järjest ühe arutlusüksuse teise järel. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`)
tuvastab need kaadrid ning valve taaskäivitab igaühe korral oma eelarve, selle asemel et voor tühistada.
Need ei ole endiselt mudeli väljund, seega ainult arutlusega lõppev voor teatatakse endiselt tühjana ning
voor, mille arutlus lõpeb ja mis saadab ainult südamelööke, käivitab endiselt valve.

Kiro binaarsed `reasoningContentEvent`-kaadrid, millel on mittetühi signatuur, säilitavad selle arutlustegevuse
täituri kaudu tühja `reasoning_content` delta-na. Signatuuri edasi ei edastata. Metaandmed, lõpetamata kaadrid
ja tühjad signatuurid ei taaskäivita sisu eelarvet; sõltumatu aktiivse voo ajalõpp ja kliendi tühistamine
kehtivad endiselt (`open-sse/executors/kiro/reasoning.ts`).

**Lõppolekud (EI OLE jahtumisperioodid):**

- `banned` — määratakse keelatud märksõna / konto keelamise tuvastamise kaudu (vt [BAN_DETECTION](../security/BAN_DETECTION.md)). Ülesvoolu päringupõhised keeldumised (`request_rejected`, nt Anthropic OAuth 403 „Request not allowed“) ei määra seda: neid loendatakse ühenduse ja mudeli kaupa ning see mudel eemaldatakse pöörlemisest kasvava jahtumisperioodiga, mille ülempiir on `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), või jahutatakse ühendust, kui mudel pole teada — `open-sse/services/requestRejectedStreak.ts`
- `expired` (muutub lõppolekuks pärast piiratud arvu korduskatseid — `EXPIRED_RETRY_MAX = 3` koos eksponentsiaalse taandumisega —, et ajutised OAuth-i vead saaksid enne konto püsivat deaktiveerimist ise taanduda)
- `credits_exhausted`

Need tõrked püsivad seni, kuni mandaadid muutuvad või operaator need lähtestab. Ärge kirjutage lõppolekuid üle ajutise jahutusolekuga.

**Laisk taastumine:** kui `rateLimitedUntil` on möödunud, muutub ühendus taas sobivaks. Eduka kasutuse korral eemaldab `clearAccountError()` kõik tõrkekohad.

### Claude’i OAuth-i kasutuspiir: madalama prioriteediga rada + seansipiirangu lähtestamine

**Ulatus:** üks Claude’i tellimuse (OAuth) ühendus. Mõlemad funktsioonid on **ühendusepõhiselt valikulised** (Edit connection → Claude section → `lowPriorityMode` / `autoLimitReset` väljal `providerSpecificData`, mõlemad vaikimisi välja lülitatud) ning peegeldavad Claude Code’i käske `/low-priority` ja `/limit-reset` (juhtmeprotokolli leping on jäädvustatud Claude Code’i versioonis 2.1.263).

**Rakendus:**

- Olekumasin + vastuste klassifitseerimine: `open-sse/services/claudeLowPriority.ts`
- Lähtestamise oleku-/nõude klient: `open-sse/services/claudeLimitReset.ts`
- Täituri konks (päise lisamine + sama konto korduskatse): `open-sse/executors/base.ts::execute()`
- Valikulise funktsiooni püsimine: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Käivitaja:** 5-tunnine kasutuspiir — `429`, mille päised sisaldavad
`anthropic-ratelimit-unified-status: rejected` ja konto sobivuse korral
`anthropic-ratelimit-unified-slow-offer: treatment`. Enne esimest piirist tulenevat
`429`-vastust ei saadeta midagi; ühiste päisteta puhanguline 429 läbib tavalise jahutustee.

**Madalama prioriteediga rada** (`lowPriorityMode`):

- Piiri `429` korral võtab täitur pakkumise vastu ja proovib kohe uuesti **sama**
  kontoga, kasutades `anthropic-usage-limit: slow`; rada jääb aktiivseks kuni teatatud
  `anthropic-ratelimit-unified-reset` väärtuseni (+60 s ajapikendus) ning iga päring selles
  aknas kannab päist. Pealtkuulatud 429 ei jõua `handleChatCore`-ni, seega ühendust
  **ei** suunata jahutusse ega vahetata teise ühenduse vastu.
- `anthropic-ratelimit-unified-slow-status` hilisemates vastustes: `active` / `not_needed`
  hoiavad raja aktiivsena; `slot_busy` (429) või `529` korral oodatakse serveri
  `anthropic-ratelimit-unified-slow-retry-after` väärtuse võrra (vaikimisi 20 s, piirang
  5–600 s, ±30% juhuslik kõikumine) ja proovitakse uuesti, kusjuures seda piirab
  `anthropic-ratelimit-unified-slow-max-wait` (vaikimisi 20 min, piirang
  1 min–6 h) — selle ületamisel rada lõpetatakse ning 10-minutiline mahajahtumine
  takistab uuesti vastuvõtmist. Ooteaega piirab täiendavalt päringu enda ülesvooluühenduse
  alustamise ajalõpu järelejäänud osa (`resolveFetchStartTimeout`, vaikimisi 10 min)
  miinus 5 s varu: ilma selle piiranguta kestaks vaikimisi 20-minutiline max-wait
  päringust kauem ning ootamine katkeks poole pealt, tekitades sujuva
  `max_wait`-lõpu + mahajahtumise asemel `TimeoutError`-i.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5-tunnise akna
  üleminek või `ineligible` koos väärtusega
  `anthropic-ratelimit-unified-overage-in-use: true` (mis lõpetab raja olekuga
  `extra_usage` mis tahes oleku korral, kuna tasuline ülelimiit katab nüüd piiri)
  lõpetavad raja; vastus liigub seejärel tavalisele jahutusteele. `budget_exhausted`
  jäetakse meelde kuni teatatud eelarve lähtestamiseni (kuni 8 päeva).
- Piirikontroll käivitatakse pärast täituri enda 400-põhiseid katse-siseseid korduskatseid
  (konteksti redigeerimine, mõtlemise/ pingutuse piirangud, parameetrite automaatne
  õppimine), seega pealtkuulatakse ka ühe sellise korduskatse käigus ilmnev piiri 429,
  mitte ei lasta sellel jõuda jahutusteeni.
- Olek on ühenduse kohta mälusisene (taaskäivitamine nõuab uuesti vastuvõtmiseks üht
  täiendavat piiri 429-vastust).

**Seansipiirangu lähtestamine** (`autoLimitReset`, mõlema funktsiooni aktiveerimisel proovitakse enne rada):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  plokk; kui `arm: "reset"` ja `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` koos
  väärtusega `{ "program": "juniper_tide" }` (organisatsiooni UUID asukohast
  `providerSpecificData.organizationUUID`, alglaadimise varuvariandiga).
- `result: reset|not_limited` → päringut proovitakse uuesti täiskiirusel (aeglase
  raja päiseta). `already_used` / `not_offered` jätavad `next_available_at` meelde
  (vaikimisi üks nädal); iga tõrge käivitab 15-minutilise tagasipöördumise. Lähtestamine
  toimub kord nädalas ja seda arvestatakse endiselt nädalapiiri sisse.

Regressioonikaitsed: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Seansi külgetõmme (#7274)

**Ulatus:** üks kliendiseanss (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` päis) seotakse ühe ühendusega, **mis tahes** teenusepakkuja puhul.

**Eesmärk:** hoida mitme pöördega agent (Claude Code, aider, kohandatud agendid) päringute
vahel samal kontol, vähendades kontodevahelisest konteksti kadumisest tulenevaid probleeme
ja korduvaid külmkäivituse 429-vastuseid teenusepakkujatel, kellel on konto-põhine seansi olek.

**Rakendus:**

- TTL-i lahendamine: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Seose valimine/loomine: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Päise eraldamine (üldine, mis tahes teenusepakkuja): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Püsiv seosetabel: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Seadistus: `sessionAffinityTtlMs` (globaalne TTL millisekundites, `0` keelab) — `src/lib/db/settings.ts`. Nimi muudeti ainult Codexi jaoks mõeldud `codexSessionAffinityTtlMs`-ist migratsiooniga `124_generic_session_affinity_ttl.sql`, mis kannab varem seadistatud Codexi TTL-i üle uue vaikeväärtusena.

Enne muudatust #7274 lõpetas `resolveSessionAffinityTtlMs()` iga muu teenusepakkuja kui
`codex` puhul töö kohe väärtusega `0`, mistõttu TTL-i seadistus (ja seansipäised) ei
mõjutanud mujal midagi, kuigi sidumismehhanism ja päiste eraldamine olid juba teenusepakkujast
sõltumatud. Parandus eemaldas selle varajase tagastuse; nüüd rakendub TTL ühtselt igale
teenusepakkujale, kui see on globaalselt väärtusele `0` suuremaks seadistatud.

Kolme seansi külgetõmbe päist ei edastata kunagi ülesvoolu — täiturid koostavad oma
ülesvoolupäised algusest peale, mitte ei edasta kliendi päiseid edasi, seega jääb see ainult
sisemiseks korrelatsiooni-ID-ks.

### Eksklusiivsed hallatava seansi ühenduse rendid

**Ulatus:** üks aktiivne hallatav HTTP-klient/seanss omab üht sobivat OmniRoute’i ühendust.

**Eesmärk:** pakkuda püsivat eksklusiivset ühenduse omandit klientidele, kes vajavad päringuteüleselt ranget
marsruutimispiiret. See erineb seansi seotusest, mis on pehme järjepidevuseelistus:
eksklusiivne rendileping säilitab elutsükli oleku SQLite’is, jõustab aktiivse omaniku ja
aktiivse ühenduse globaalse unikaalsuse ning lükkab aegunud generatsiooni tagasi enne teenusepakkujale
edastamist.

Funktsioon on API-võtme kohta valikuline. Hallataval võtmel peab olema `lease:exclusive` ulatus ja
selgesõnaliselt määratud mittetühi `allowedConnections` loend. Elutsükli lõpp-punkti võib kasutada iga
HTTP-klient; kliendi nimi, user-agent, teenusepakkuja, OAuth-meetod ega mudel ei ole nõutud. Rendileping
omab ühendust, mitte mudelit, seega mudeli muutmine säilitab seose seni, kuni ühendus jääb tavapäraselt
sobivaks. Tavapärased mudeli-, kvoodi-, tervise-, jahutusperioodi- ja lubatud loendi reeglid jäävad
ülimuslikuks ning võivad sama generatsiooni suunata teisele vabale sobivale ühendusele.

Elutsükkel on `POST /api/v1/session-leases` JSON-i toimingutega `acquire`, `renew` ja `release`.
Hallatavad inferentsipäringud esitavad läbipaistmatu `X-OmniRoute-Lease-Owner` väärtuse ja täpse
`X-OmniRoute-Lease-Generation` väärtuse. Omanik kasutab eesliidet `vlo_`, millele järgneb 43
base64url-märki; talletatakse ainult selle SHA-256 räsi. Iga lõpliku edastamise piire seob päringu
autenditud API-võtme ID ja aktiivse ühenduse ID-ga. Rendilepingu juhtpäised eemaldatakse logidest,
säilitatud päringu hetktõmmistest ja ülesvoolu täitja päistest.

Kui tavapärasel marsruutimisel leidub sobivaid hallatavaid kandidaate, kuid iga vaba kandidaat on
hõivatud teise omaniku aktiivse rendilepinguga, tagastab OmniRoute HTTP `429`, koodi
lease-capacity-unavailable, võimsuse ootamise oleku ja piiratud `Retry-After` väärtuse, mis on tuletatud
varaseimast asjakohasest aegumisest. Tavapärane sobivate kandidaatide puudumine ei tähenda
rendilepingu-konflikti ning säilitab olemasoleva marsruutimise veasemantika.

Seotud mehhanismid jäävad eraldi:

- OAuth-seansi hõivatus on OAuth-kontode protsessisisene pehme jaotus.
- Konto semaforid annavad päringu paralleelsuse lubasid ja lõpevad päringu lõpetamisel.
- Eksklusiivsed hallatava seansi rendilepingud on püsiv elutsükli omand koos generatsioonipiirdega.

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

## 4. Kvoodijagamise konkurentsikontroll (v3.8.36)

Tellimuspõhised kontod (GLM, MiniMax jne) aktsepteerivad sageli ainult ~1–3
samaaegset päringut; selle ületamine käivitab 429 vead ja jahtumisperioodid. See
on eriti terav **kvoodijagamise** (`qtSd/…`) kombinatsioonide korral, kus mitu API-võtit
jagavad sama ülesvoolu kontot. Jagatud konto üleujutamise vältimiseks kasutatakse kolme kihti.

### Ühendusepõhine konkurentsipiirang (`max_concurrent`)

Iga pakkuja ühendus võib deklareerida `max_concurrent` ülempiiri
(`provider_connections.max_concurrent`, määratakse ühenduse modaalaknas / API kaudu / andmebaasis).
Piirangu puudumiseks jätke väli tühjaks. See on ainus säte, mis juhib allpool kirjeldatud
serialiseerimiskihti — määrake selle väärtuseks konto tegelik konkurentsipiirang
(nt GLM ~1, MiniMax ~2).

### Mudelipõhised konkurentsipiirangud (`modelConcurrency`)

Ühendus võib lisaks deklareerida täpsed mudelipõhised konkurentsipiirangud oma
`rateLimitOverrides` kaardil:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Määrake see ühenduse modaalaknas (**Rate limit overrides → Per-model
concurrency caps**, üks `model=cap` rea kohta) või `PATCH /api/providers/[id]`
kaudu sama JSON-kujuga. Olulised tähendused:

- **Ühenduseülene vs mudelipõhine:** `maxConcurrent` jääb kogu ühendust hõlmavaks
  ühiskasutatavaks ülempiiriks. Kui mõlemad kehtivad, hangitakse mõlemad väravad
  samaaegselt samas komposiitväravas
  (`global → provider → account → model`); tegelik käitumine järgib rangemat
  rakenduvat piirangut.
- **Mudeli võtme täpne vaste:** võti on mudelistring, mis edastatakse täitjale pärast
  marsruudi lahendamist — tavaliselt ülesvoolu mudeli paljas identifikaator
  (`glm-5`), mitte kliendipoolne `provider/model` alias (`zai/glm-5` ei vasta
  `glm-5`-le). Väärtused on positiivsed täisarvulised samaaegsete päringute ülempiirid.
- **Kohalik järjekorda panemine, avastamist ei toimu:** liigsed päringud pannakse
  olemasoleva järjekorra-/ajalõpu semantika kohaselt kohalikku järjekorda (tüübitud
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` vastuvõtuvigadega). OmniRoute ei
  avasta ega tuleta ülesvoolu poliitikat — see jõustab operaatori konfigureeritud
  täpsed ülempiirid. Küllastunud mudelivärav ei keela pakkujat ega loo püsivat mudeli
  blokeeringut; ülesvoolu 429 / jahtumis- / varuvariandi käitumine jääb veakaitseks.
- **Ühenduse- ja protsessipõhine ulatus:** piirangud kehtivad andmebaasiühenduse
  kohta ja neid hoitakse mälus, mistõttu kaks sama ülesvoolu API-võtit taaskasutavat
  ühendust ei koordineeri omavahel.
- **Konfigureerimata tähendab muutmata:** kaardi väljajätmine (või juhtpaneeli välja
  tühjaks jätmine) ei lisa mudeliväravat. Näidiskonfiguratsioon ilma universaalset
  pakkujapõhist piirangut kehtestamata:

```text
glm-5=1
glm-4.7=3
```

### Kvoodijagamise päringute serialiseerimine

Kui kvoodijagamise väljasaatmine sihib ühendust, millele on määratud positiivne
`max_concurrent`, serialiseeritakse sama **konto** samaaegsed päringud
ühendusepõhise semafori kaudu (võti `qsconn:<connectionId>`): liigsed päringud
**ootavad järjekorras**, selle asemel et kontot üle ujutada. See on **tõrgetele
avatud** — küllastunud järjekord või ajalõpp jätkab ilma pesata, selle asemel et
kunagi väljasaatmist lubavat päringut tagasi lükata. Lüliti asub jaotises
**Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, vaikimisi
sees). Ilma `max_concurrent` piiranguta jääb käitumine muutumatuks.

> Kvoodijagamise marsruutimisvärav (`selectQuotaShareTarget`, DRR + P2C) on ise
> tõrgetele avatud ja ainult _vähendab_ piirini jõudnud ühenduse prioriteeti — ühe
> ühendusega kogumi korral ei saa see ranget piirangut rakendada, seega just see
> semafor piirab tegelikult üleujutust.

### Kombinatsiooni jahtumisperioodist teadlik korduskatse

Iga kombinatsioonistrateegia korral (kui see on lubatud) ootab päring, mis
põhjustaks LÜHIKESE ajutise jahtumisperioodi tõttu 429 vea, jaotuse lõppemist ja
saadetakse uuesti, selle asemel et tagastada 429 — see hõlmab Gemini-klassi
TPM/RPM aknaid (~60 s retry-after) mitme mudeliga kombinatsioonidel, näiteks kui
mõlemad 2-mudelilise kombinatsiooni sihtmärgid jõuavad mudelipõhise
kiiruspiiranguni. Seda piiravad `comboCooldownWait` (`enabled`, `maxWaitMs`,
`maxAttempts`, `budgetMs`) jaotises **Settings → Resilience**. See ei oota
`quota_exhausted` korral (lukustatud kuni keskööni) ega autentimise / puuduva
ressursi põhjuste korral.

Kombinatsioon võib sellest loobuda suvandiga
`config.comboCooldownWaitEnabled: false`. Ainult sõnasõnaline `false` keelab need
jagatud kombinatsiooni ootamised (väljasaatmisjärgne jahtumine ning
väljasaatmiseelne kaitselüliti avatud / mudeli lukustuse ootamine) ja nende
ootamise eelarve ajalõpu alampiiri pikenduse. Puuduv väärtus või `true` säilitab
ülemaailmse poliitika; `true` ei saa ülemaailmselt keelatud ootamist lubada. Selgesõnaliselt
määratud `targetTimeoutMs` on endiselt ülimuslik. See loobumine ei muuda eraldi
native-Codexi pöörde kinnistamise väljasaatmiseelset ootamist.

Sama värav hõlmab ka väljasaatmiseelset juhtumit (#16319): kui kõik kombinatsiooni
sihtmärgid jäetakse enne esimese katse tegemist vahele, sest nende mudel on lühikeses
ajutises lukustuses, ootab nullkatsete tee sama ülempiiri alusel luku lõppemist ja
saadab päringu uuesti, selle asemel et vastata vihjeta
`503 ALL_TARGETS_SKIPPED`. Kui ootamine pole lubatud (ülempiir, katsete arv või
eelarve on ammendunud või funktsioon on välja lülitatud), täiendatakse lõplikku
vastust kujule `429 rate_limit_error`, mis sisaldab varaseima ajutise luku
`retry_after` / `reset_at` väärtust; kvoodi-, autentimis- ja puuduva ressursi
lukud säilitavad vihjeta 503 vastuse.

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

## Muud tõrkekindluse funktsioonid

- **20 marsruutimisstrateegiat** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — vt [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Lähtestamisest teadlik marsruutimine** (v3.8.0) — seab ühendused prioriteeti kvoodi lähtestamise aja järgi.
- **Taustarežiimi degraderumine** — Responses API `background: true` alandatakse hoiatusega sünkroonseks.
- **Tööriistapiirangute dünaamiline tuvastus** — taganeb pakkujatest, kui tööriistade arvu piirangud täituvad.
- **Avariiline varumehhanism** — juhitav muutuja `OMNIROUTE_EMERGENCY_FALLBACK` kaudu; operaatorid saavad selle funktsioonilippude lehel ilma taaskäivituseta alistada.

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
