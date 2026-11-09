# Resilience Guide (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ima tri različita, ali povezana mehanizma otpornosti. Svaki ima drugačiji opseg i svrhu. Držite ih odvojeno kada otklanjate pogreške u ponašanju usmjeravanja.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Izvor: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Env-vs-nadzorna ploča prednost za preklopnike otpornosti.** Opt-in otpornost prebacuje iz okruženja — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — samo isporučuju _zadane_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Booleov postojao u `resilienceSettings` (Nadzorna ploča →** Postavke → otpornost** / `PATCH /api/resilience`, pohranjeno u `key_value`) pobjeđuje vrijednost env: normalizacija (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) zadržava pohranjenu booleovu vrijednost kad god postoji. Postavljanje takve env var na `true` na implementaciji gdje je nadzorna ploča već spremljena `false` stoga ništa ne mijenja — uključite prekidač** Postavke → otpornosti** (ili obrišite pohranjeno polje).

## 1. Prekidač kruga pružatelja (circuit breaker)

**Opseg:** cijeli pružatelj (npr. `glm`, `openai`, `anthropic`).

**Svrha:** zaustaviti slanje prometa prema pružatelju koji uzastopno zakazuje na razini upstreama/usluge.

**Implementacija:**

- Temeljna klasa: `src/shared/utils/circuitBreaker.ts`
- Povezivanje: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API statusa: `GET /api/monitoring/health`
- API ponovne postave: `POST /api/resilience/reset`
- Omotači: `open-sse/services/accountFallback.ts`
- Tablica baze podataka: `domain_circuit_breakers`

**Stanja:**

- `CLOSED` — normalan promet dopušten
- `DEGRADED` — promet je i dalje dopušten, ali se prate povećani neuspjesi pružatelja; vraća se u `CLOSED` nakon dovoljnog broja uspjeha, nakon valjanog testa veze ili nakon najduljeg zadržavanja u `OPEN` za posljednju vrstu neuspjeha (njena vrijednost `cooldownByKind`, inače `resetTimeout`, × `maxBackoffMultiplier`, najmanje jedno razdoblje hlađenja) bez novog neuspjeha
- `OPEN` — pružatelj privremeno blokiran; combo usmjeravanje ga preskače
- `HALF_OPEN` — istekao je timeout ponovne postave; probni zahtjev dopušten

**Konfigurabilne zadane vrijednosti (`open-sse/config/constants.ts`, izložene u Nadzorna ploča → Postavke → Otpornost):**

| Klasa   | Degradira se pri | Otvara se pri | Timeout ponovne postave |
| ------- | ---------------- | ------------- | ----------------------- |
| OAuth   | 5 neuspjeha      | 8 neuspjeha   | 60s                     |
| API-key | 7 neuspjeha      | 12 neuspjeha  | 30s                     |
| Local   | izvedeno         | 2 neuspjeha   | 15s                     |

`degradationThreshold` određuje kada pružatelj ulazi u `DEGRADED`; `failureThreshold` određuje kada se otvara i preskače. Profili lokalnih pružatelja još nisu izloženi na stranici postavki otpornosti.

**Kodovi okidanja:** samo statusi na razini pružatelja `[408, 500, 502, 503, 504]`. NE okidati za pogreške na razini računa (većina 401/403/429 — one pripadaju hlađenju ili blokadi).

**Lijeni oporavak (lazy recovery):** kada `OPEN` istekne, `getStatus()`, `canExecute()`, `getRetryAfterMs()` osvježavaju stanje u `HALF_OPEN`. Ista čitanja (i sljedeći neuspjeh) postupno vraćaju zastarjelo `DEGRADED` natrag u `CLOSED`. Pozadinski timer nije potreban.

---

### Opcijsko globalno hlađenje pružatelja (prozorska kontrola)

Četvrta, **opcijska** razina (`PROVIDER_COOLDOWN_ENABLED`, zadano **isključeno**) čuva
memoriju o neuspjelim pružateljima kroz zahtjeve u
`open-sse/services/providerCooldownTracker.ts`, koju koristi razrješavanje ciljeva
combo usmjeravanja, kako bi uzastopni combo zahtjevi prestali ponovno prolaziti
kroz pružatelja koji je upravo zatajio. Unosi na razini pružatelja poštuju
prozorsku kontrolu iz `PROVIDER_PROFILES`:

| Profil  | okida nakon (`providerFailureThreshold`) | unutar (`providerFailureWindowMs`) | hladi se (`providerCooldownMs`) |
| ------- | ---------------------------------------: | ---------------------------------: | ------------------------------: |
| OAuth   |                                     `10` |                            `15min` |                          `5min` |
| API key |                                     `15` |                            `30min` |                         `10min` |

Ispod praga pružatelj se **ne** smatra u hlađenju; uspjeh poništava
prozor. Unosi na razini veze (`provider:connectionId`) umjesto toga zadržavaju
eksponencijalni backoff od `minRetryCooldownMs → maxRetryCooldownMs`. Nadjačavanja:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Zaštita od regresije: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Razdoblje hlađenja veze

**Opseg:** veza/račun/ključ pojedinačnog pružatelja usluge.

**Svrha:** preskočiti jedan neispravan ključ dok ostale veze za istog pružatelja nastavljaju posluživati zahtjeve.

**Implementacija:**

- Označavanje kao nedostupnog: `src/sse/services/auth.ts::markAccountUnavailable()`
- Odabir: `getProviderCredentials*` u istoj datoteci
- Izračun razdoblja hlađenja: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Postavke: `src/lib/resilience/settings.ts`

**Polja po vezi:**

- `rateLimitedUntil` — vremenska oznaka do isteka razdoblja hlađenja
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — brojač eksponencijalnog povećanja odgode

**Zadana razdoblja hlađenja:**

- Osnovno za OAuth: 5 s
- Osnovno za API ključ: 3 s
- API ključ 429: prednost imaju zaglavlja `Retry-After`/reset uzvodne usluge/tekst resetiranja koji se može raščlaniti
- Povećanje odgode: `baseCooldownMs * 2 ** failureIndex`

**Odgoda ponovnog pokušaja po pružatelju.** Stranica s detaljima pružatelja usluge sadrži izbornik **Odgoda ponovnog pokušaja** (Automatski, od 15 s do 1 h). Sprema `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, putem `PATCH /api/resilience`). Kada pogreška ograničenja brzine ne sadrži uzvodni savjet za ponovni pokušaj, ta vrijednost zamjenjuje skaliranu odgodu i postavlja `backoffLevel` na 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Prednost za pogrešku ograničenja brzine, od najveće prema najmanjoj: uzvodni savjet za ponovni pokušaj, zatim `providerSpecificData.rotationOverrides.rateLimitResetSeconds` po vezi, zatim odgoda ponovnog pokušaja po pružatelju, zatim `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` iz okruženja, a potom skalirana odgoda. Automatski način uklanja polje. Utječe samo na razlog ograničenja brzine, nikad na završna stanja.

**Zaštita od istodobnog naleta zahtjeva:** sprječava da istodobne pogreške prekomjerno produlje razdoblje hlađenja ili dvaput povećaju `backoffLevel`.

**429 pogreške zbog ograničenja istodobnosti ne povećavaju razinu odgode.** `429` čije tijelo navodi ograničenje istodobnosti ("previše istodobnih zahtjeva", "ograničenje istodobnosti", "ograničenje paralelnih zahtjeva", GLM `并发数过高`) znači da je račun ispravan, ali zauzet.
`checkFallbackError()` vraća razlog `concurrency_limited`: odmah prijeđite na sljedeću vezu, stavite ovu vezu na čekanje tijekom fiksnog `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) ili do uzvodnog savjeta za ponovni pokušaj, ostavite `backoffLevel` nepromijenjenim i postavite `skipProviderBreaker`.
Izričito tijelo kvote i dalje ima prednost, pa tijelo koje se također podudara s uzorkom kvote ostaje presuda kvote. Detekcija: `looksLikeConcurrencyLimit()` u `src/shared/utils/classify429.ts`; presuda: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (vrijednost `FailureKind` prekidača) ostaje nepromijenjena i za ta tijela i dalje čita `rate_limit`.

**Zastoji sadržaja strujanja ne stavljaju račun na čekanje.** Kada nadzornik zastoja sadržaja (`open-sse/utils/streamHandler.ts`) odustane od strujanja koje u predviđenom vremenu nije poslalo izlaz modela, `markAccountUnavailable()` bilježi pogrešku na vezi, ali ne postavlja razdoblje hlađenja: zastoj pripada tom zahtjevu, najčešće dugom krugu zaključivanja bez dosad dostupnog izlaza. Operatori mogu uključiti tu mogućnost postavkom `resilienceSettings.streamStallCooldown.enabled` (zadano `false`).

**Signal latencije koji se može uključiti za odabir računa `p2c`.** Svaki poslani pokušaj bilježi vrijeme do prvog bajta i ishod po vezi (te po vezi i modelu) u memorijskom kliznom prozoru: posljednjih 20 uzoraka unutar 15 minuta
(`open-sse/services/connectionLatencyTracker.ts`, bilježi se iz `safeLogEvents()` u
`src/sse/handlers/chatHelpers.ts`). Kada je `resilienceSettings.p2cLatency.weight` veći od
`0` (raspon 0–20, zadano `0` = isključeno), `compareP2CConnections()` u `src/sse/services/auth.ts` dodaje do `weight` bodova svakom kandidatu para. Polovica dolazi iz latencije kao omjera prema bržem kandidatu (dvostruko sporiji kandidat dobiva cijelu polovicu), a polovica iz pomične stope pogrešaka.
Pojam se primjenjuje samo kada oba kandidata imaju najmanje 3 uzorka, tako da se novi računi ne kažnjavaju, a njegov maksimum ostaje ispod kazni za blokiranu i iscrpljenu kvotu. Ne uvodi vlastiti prekidač: računi s pogreškama i dalje se obrađuju slojevima razdoblja hlađenja, zaključavanja i prekidača. Postavite ga pomoću `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Okviri zaključivanja ponovno pokreću proračun zastoja sadržaja.** Modelu za zaključivanje mogu trebati minute prije prvog vidljivog tokena: Claude šalje okvire `thinking_delta` čiji tekst zaključivanja može biti prazan, a Responses API šalje jednu stavku zaključivanja za drugom. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) prepoznaje te okvire, a nadzornik ponovno pokreće svoj proračun nakon svakog od njih umjesto da prekine krug. Oni i dalje nisu izlaz modela, pa se krug koji završi samo zaključivanjem i dalje prijavljuje kao prazan, a krug koji prestane zaključivati i šalje samo otkucaje srca i dalje aktivira nadzornik.

Kirovi binarni okviri `reasoningContentEvent` s nepraznim potpisom čuvaju tu aktivnost zaključivanja kroz izvršitelj kao praznu promjenu `reasoning_content`. Potpis se ne prosljeđuje. Metapodaci, nepotpuni okviri i prazni potpisi ne pokreću ponovno proračun sadržaja; neovisno vremensko ograničenje aktivnog strujanja i otkazivanje klijenta i dalje se primjenjuju (`open-sse/executors/kiro/reasoning.ts`).

**Završna stanja (NISU razdoblja hlađenja):**

- `banned` — postavlja se detekcijom zabranjene ključne riječi ili zabrane računa (pogledajte [BAN_DETECTION](../security/BAN_DETECTION.md)). Odbijanja uzvodne usluge po zahtjevu (`request_rejected`, npr. Anthropic OAuth 403 "Request not allowed") nikad ga ne postavljaju: broje se po vezi i modelu te taj model uklanjaju iz rotacije uz rastuće razdoblje hlađenja ograničeno na `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), ili stavljaju vezu na čekanje kada model nije poznat — `open-sse/services/requestRejectedStreak.ts`
- `expired` (prelazi u završno stanje nakon ograničenog broja pokušaja — `EXPIRED_RETRY_MAX = 3` uz eksponencijalno povećanje odgode — kako bi se prolazne OAuth pogreške mogle same oporaviti prije trajnog deaktiviranja računa)
- `credits_exhausted`

Traju sve dok se vjerodajnice ne promijene ili ih operater ne resetira. Nemojte prebrisati terminalna stanja prolaznim stanjem hlađenja.

**Lijeni oporavak:** kada `rateLimitedUntil` istekne, veza ponovno postaje prihvatljiva. Nakon uspješne upotrebe, `clearAccountError()` briše sva polja pogreške.

### Claudeov zid upotrebe OAutha: kanal nižeg prioriteta + reset ograničenja sesije

**Opseg:** jedna Claudeova pretplatnička OAuth veza. Obje su značajke **opcionalne po vezi** (Uredi vezu → odjeljak Claude → `lowPriorityMode` / `autoLimitReset` u `providerSpecificData`, obje su prema zadanim postavkama isključene) i preslikavaju Claude Codeove naredbe `/low-priority` i `/limit-reset` (ugovor komunikacijskog protokola preuzet iz Claude Codea 2.1.263).

**Implementacija:**

- Stroj stanja + klasifikacija odgovora: `open-sse/services/claudeLowPriority.ts`
- Klijent za status/zahtjev za reset: `open-sse/services/claudeLimitReset.ts`
- Kuka izvršitelja (ubacivanje zaglavlja + ponovni pokušaj s istim računom): `open-sse/executors/base.ts::execute()`
- Trajno spremanje opcija: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Okidač:** petosatni zid upotrebe — `429` čija zaglavlja sadrže
`anthropic-ratelimit-unified-status: rejected` i, kada račun ispunjava uvjete,
`anthropic-ratelimit-unified-slow-offer: treatment`. Prije tog prvog zidnog
429 ne šalje se ništa; burstni 429 bez objedinjenih zaglavlja prolazi uobičajenim putem hlađenja.

**Kanal nižeg prioriteta** (`lowPriorityMode`):

- Kod zidnog 429 izvršitelj prihvaća ponudu i odmah ponovno pokušava s **istim**
  računom uz `anthropic-usage-limit: slow`; kanal ostaje aktivan do najavljenog
  `anthropic-ratelimit-unified-reset` (+ 60 s tolerancije), a svaki zahtjev u tom
  prozoru nosi zaglavlje. Presretnuti 429 nikada ne dolazi do `handleChatCore`, pa se veza
  **ne** stavlja u hlađenje i ne rotira se na drugu vezu.
- `anthropic-ratelimit-unified-slow-status` u kasnijim odgovorima: `active` / `not_needed`
  zadržavaju kanal; `slot_busy` (429) ili `529` čekaju poslužiteljev
  `anthropic-ratelimit-unified-slow-retry-after` (zadano 20 s, ograničenje 5–600 s, slučajna
  varijacija ±30 %) i ponovno pokušavaju, uz ograničenje
  `anthropic-ratelimit-unified-slow-max-wait` (zadano 20 min, ograničenje
  1 min–6 h) — nakon toga kanal završava, a desetominutno hlađenje blokira ponovno
  prihvaćanje. Čekanje je dodatno ograničeno preostalim vremenom vlastitog uzvodnog
  vremenskog ograničenja početka zahtjeva (`resolveFetchStartTimeout`, zadano 10 min)
  umanjenim za sigurnosnih 5 s: bez tog ograničenja zadani maksimalni period čekanja od
  20 minuta nadživio bi zahtjev i spavanje bi bilo prekinuto usred čekanja, čime bi se
  prikazao `TimeoutError` umjesto urednog završetka `max_wait` + hlađenja.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, prelazak u novi
  5-satni prozor ili `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true`
  (što ga završava kao `extra_usage` pri bilo kojem statusu jer plaćena dodatna upotreba
  sada pokriva zid) završavaju kanal; odgovor zatim prolazi uobičajenim putem hlađenja.
  `budget_exhausted` pamti se do najavljenog reseta proračuna (≤ 8 dana).
- Provjera zida pokreće se nakon vlastitih ponovljenih pokušaja izvršitelja unutar pokušaja
  uzrokovanih statusom 400 (uređivanje konteksta, ograničenja razmišljanja/uloženog napora,
  automatsko učenje parametara), pa se zidni 429 koji se pojavi tek pri jednom od tih
  ponovljenih pokušaja i dalje presreće umjesto da dođe do puta hlađenja.
- Stanje je u memoriji po vezi (ponovno pokretanje zahtijeva jedan dodatni zidni 429 za
  ponovno prihvaćanje).

**Reset ograničenja sesije** (`autoLimitReset`, pokušava se prije kanala kada su oba uključena):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok
  `juniper_tide`; kada su `arm: "reset"` i `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` s
  `{ "program": "juniper_tide" }` (UUID organizacije iz
  `providerSpecificData.organizationUUID`, rezervna vrijednost iz pokretanja).
- `result: reset|not_limited` → zahtjev se ponovno pokušava punom brzinom (bez zaglavlja
  usporavanja). `already_used` / `not_offered` pamte `next_available_at` (zadano jedan
  tjedan); svaki neuspjeh uvodi odgodu od 15 minuta. Reset je moguć jednom tjedno i
  i dalje se uračunava u tjedno ograničenje.

Regresijske zaštite: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Automatska primjena bankovnih resetiranja

**Opseg:** Codex i Claude pretplatničke (OAuth) veze.**Uključite se** : postavka `bankedResetAutoApply` je prema zadanim postavkama isključena iu načinu rada `dry-run` (Postavke → AI → Auto-apply banked resets).

**Svrha:** sami troše bankovna resetiranja kada račun dođe do ograničenja upotrebe, umjesto da čekaju da operater pritisne "Iskoristi" na stranici Ograničenja pružatelja usluga.

| Vrsta kredita (`creditTypes`) | Što se otkupljuje                                              | Gdje teče                                                |
| ----------------------------- | -------------------------------------------------------------- | -------------------------------------------------------- |
| `codexCredits`                | Codex reset kredita                                            | pozadinski posao, svakih 60 s                            |
| `claudeCredits`               | Claude bankovni grantovi (`GRANT` krediti)                     | pozadinski posao, svakih 60 s                            |
| `claudeSessionReset`          | Claude ponovno postavljanje tjednog ograničenja sesije (iznad) | put zahtjeva, kroz ista pravila kao i prekidač po računu |

**Implementacija:**

- Čista odluka (jedno pravilo postavljeno za oba puta): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Pozadinski posao: `src/lib/services/bankedResetAutoApply.ts` (započet u `src/instrumentation-node.ts`)
- Vrata staze zahtjeva Claude : `src/lib/usage/claudeSessionResetPolicy.ts`, registrirano kroz `setClaudeLimitResetPolicy()` u `open-sse/services/claudeLimitReset.ts`
- Povijest, ograničenja i web-dojavnik: `src/lib/usage/bankedResetAudit.ts`
- Povijest API: `GET /api/settings/banked-reset-auto/history?limit=50` (autorizacija upravljanja)

**Redoslijed odluke** (prvo neuspješno pravilo je zabilježeni razlog):

1. Isključena značajka, isključena vrsta kredita ili račun izvan opsega (`accountScope` `all` / `selected` plus `connections` mapa po računu).
2. Izvan izbornog UTC rasporeda (`startHourUtc` > `endHourUtc` prelazi ponoć).
3. Ograničenja u posljednja 24 sata: `maxPerAccountPerDay` (1), `maxPerDay` (3) i `minSpacingMinutes` (30) između bilo koja dva otkupa.
4. Okidač: ograđeni `session` ili `weekly` prozor (čita se iz `getQuotaWindowStatus().reachedThreshold`, a ne `isAccountQuotaExhausted()`, koji izvješćuje samo o računu sa svakim potrošenim prozorom) ili kredit koji ističe unutar `expiringCreditHours` (24) na računu koji je upotrijebio najmanje `expiringCreditMinUsedPercent` (50).
5. Zaštita prirodnog ponovnog postavljanja: preskočite kada se ograđeni 5-satni prozor poništi unutar `sessionResetGuardMinutes` (90), ili ograđeni tjedni prozor unutar `weeklyResetGuardHours` (12).
6. Tjedni donji prag: preskočite 5-satno resetiranje kada je preostali tjedni iznos ispod `weeklyFloorPercent` (10).
7. Način rada `last-resort` : preskoči dok drugi račun istog pružatelja unutar opsega ima najmanje `poolHeadroomPercent` (10) u oba prozora. Okidači isteka kredita to zaobilaze.
8. `dry-run` bilježi red i ništa ne otkupljuje; `last-resort` i `eager` otkupi.

Podaci o kvoti koji nedostaju nikada ne otključavaju otkup: nepoznato vrijeme ponovnog postavljanja ili preskakanje tjedne upotrebe.

**Resetiranje Claude sesije:** s isključenom značajkom ili isključenim `claudeSessionReset`, `autoLimitReset` prekidač po računu odlučuje točno kao prije. Kad su obje uključene, značajka zamjenjuje prekidače po računu: račun unutar opsega može potraživati samo kada to pravila dopuštaju, au `dry-run` načinu rada nema potraživanja.

**Sigurnost:** posao iskorištava najviše jedan kredit po kvačici, odlučuje prije ispisivanja kredita (preskočeni račun nikada nije na popisu), koristi ključeve idempotencije `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` i povlači račun na 1 h nakon neuspjelog uvrštavanja na popis ili otkupa. Svaka odluka o otkupu, neuspjehu i neuspjehu zapisuje se u `audit_log` (`action: "bankedReset.redeem"`, bez tokena ili kreditnih ID-ova); kape se broje iz tih redaka, tako da prežive ponovno pokretanje. Uspješna otkupljivanja također aktiviraju `provider.reset_redeemed` webhook.

Čuvari regresije: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Afinitet sesije (#7274)

**Opseg:** jedna klijentska sesija (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` zaglavlje) vezana je uz jednu vezu, za **bilo kojeg** pružatelja.

**Svrha:** zadržati višepoteznog agenta (Claude Code, aider, prilagođeni agenti) na istom računu kroz zahtjeve, čime se smanjuje gubitak konteksta između računa i ponovljeni 429 odgovori pri hladnom pokretanju kod pružatelja s po-računskom sesijskom stanjem.

**Implementacija:**

- Razrješenje TTL-a: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Odabir/stvaranje veze za vezivanje: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Izdvajanje zaglavlja (generičko, za bilo kojeg pružatelja): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tablica trajno spremljenih vezivanja: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Postavka: `sessionAffinityTtlMs` (globalni TTL u ms, `0` onemogućuje) — `src/lib/db/settings.ts`. Preimenovano iz postavke `codexSessionAffinityTtlMs`, specifične za Codex, migracijom `124_generic_session_affinity_ttl.sql`, koja prenosi prethodno konfigurirani Codex TTL kao novu zadanu vrijednost.

Prije #7274, `resolveSessionAffinityTtlMs()` odmah je vraćao `0` za svakog pružatelja osim `codex`, pa postavka TTL-a (i zaglavlja sesije) nigdje drugdje nije imala učinka, iako su mehanizam vezivanja i izdvajanje zaglavlja već bili neovisni o pružatelju. Ispravak je uklonio taj rani povrat; TTL se sada jednako primjenjuje na svakog pružatelja kada se globalno postavi na vrijednost veću od `0`.

Tri zaglavlja afiniteta sesije nikada se ne prosljeđuju uzvodno — izvršitelji iznova sastavljaju vlastita uzvodna zaglavlja umjesto prosljeđivanja klijentskih zaglavlja, pa ovo ostaje samo interni identifikator korelacije.

### Isključivo upravljani najmovi veza sesije

**Opseg:** jedan aktivni upravljani HTTP klijent/sesija posjeduje jednu prihvatljivu OmniRoute vezu.

**Svrha:** omogućiti trajno ekskluzivno vlasništvo nad vezom za klijente kojima je potrebna stroga
granica usmjeravanja kroz zahtjeve. To se razlikuje od afiniteta sesije, koji je postavka mekog
kontinuiteta: ekskluzivni zakup trajno pohranjuje stanje životnog ciklusa u SQLiteu, nameće globalnu
jedinstvenost aktivnog vlasnika i aktivne veze te odbija zastarjelu generaciju prije slanja
pružatelju.

Značajka je opcionalna za svaki API ključ. Upravljani ključ mora imati opseg `lease:exclusive` i
eksplicitni neprazni popis `allowedConnections`. Bilo koji HTTP klijent može koristiti krajnju
točku životnog ciklusa; nisu potrebni naziv klijenta, korisnički agent, pružatelj, OAuth metoda ni
model. Zakup posjeduje vezu, a ne model, pa promjena modela zadržava vezivanje dok veza ostaje
uobičajeno prihvatljiva. Uobičajena pravila modela, kvote, zdravlja, razdoblja čekanja i popisa
dopuštenih ostaju mjerodavna te mogu prebaciti istu generaciju na drugu slobodnu prihvatljivu vezu.

Životni ciklus je `POST /api/v1/session-leases` s JSON radnjama `acquire`, `renew` i `release`.
Upravljani zahtjevi za izvođenje predstavljaju neprozirnu vrijednost `X-OmniRoute-Lease-Owner` i
točnu vrijednost `X-OmniRoute-Lease-Generation`. Vlasnik koristi `vlo_` nakon čega slijedi 43
base64url znaka; pohranjuje se samo njegov SHA-256 hash. Svaka završna ograda slanja također
povezuje ID autentificiranog API ključa i ID aktivne veze. Upravljačka zaglavlja zakupa uklanjaju se
iz zapisa, zadržanih snimki zahtjeva i zaglavlja izvršitelja uzvodnog sustava.

Ako uobičajeno usmjeravanje ima prihvatljive upravljane kandidate, ali je svaki slobodni kandidat
zauzet stranim aktivnim zakupom, OmniRoute vraća HTTP `429`, kod lease-capacity-unavailable,
stanje waiting-for-capacity i ograničeni `Retry-After` izveden iz najranijeg relevantnog isteka.
Uobičajena prazna prihvatljivost nije sukob zakupa i zadržava postojeću semantiku pogrešaka
usmjeravanja.

Povezani mehanizmi ostaju odvojeni:

- Zauzetost OAuth sesije lokalna je za proces, kao meka distribucija OAuth računa.
- Semafori računa dodjeljuju dozvole za istodobnost zahtjeva i završavaju kada se zahtjev dovrši.
- Ekskluzivni upravljani zakupi sesija trajno su vlasništvo životnog ciklusa s ogradom generacije.

---

## 3. Zaključavanje modela

**Opseg:** trojka pružatelj + veza + model.

**Opseg ključa prema statusu:** status koji je uzrokovao pogrešku određuje ključ u koji se upisuje zaključavanje
(`resolveLockoutScope()` u `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signal kvote ili prava — zaključava **obitelj kvote**:
  za codex cijeli opseg `codex` / `spark` (svaki model `gpt-5*` te veze), a za
  ostale pružatelje `getQuotaScopedModelForProvider()`.
- `404` zaključava osnovni model (`getModelLockKey()` sužava `not_found`).
- Bilo koji drugi status — transportni/poslužiteljski neuspjesi `5xx` i vlastiti
  sintetizirani OmniRouteov `502` iz provjere kvalitete — zaključava samo **točnu**
  n-torku pružatelja/veze/modela. Neispravan tok na jednom modelu nije dokaz o
  kvoti računa; prije ovog pravila jedan prazan odgovor na
  `codex/gpt-5.6-luna` uklonio bi svaki model `gpt-5*` te veze iz usmjeravanja
  na 2–30 min (uz eskalaciju), dok bi njezina kvota ostala netaknuta.
- Izričita opcija `scope` pozivatelja uvijek ima prednost (Antigravity prosljeđuje `"exact"`).

**Svrha:** izbjeći onemogućavanje cijele veze kada samo jedan model nije dostupan ili je ograničen kvotom.

**Primjeri:**

- Pružatelji s kvotom po modelu koji vraćaju 429
- Lokalni pružatelji koji vraćaju 404 za jedan model koji nedostaje
- Neuspjesi dopuštenja specifični za pružatelja i način/model (npr. načini rada Groka)

**Implementacija:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Nadzorna ploča hlađenja modela (v3.8.0)

Sučelje: Postavke → Hlađenja modela (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Prikazuje aktivna zaključavanja sa sljedećim podacima: pružatelj, veza, model, razlog, expiresAt. Operateri mogu ručno ponovno omogućiti model iz kartice.

**REST API:**

- `GET /api/resilience/model-cooldowns` — popis aktivnih zaključavanja
- `DELETE /api/resilience/model-cooldowns` — ručno ponovno omogućivanje. Tijelo: `{provider, connection, model}`. Autentikacija: upravljanje.

### Upravitelj hlađenja

Sučelje: Nadzor → Upravitelj hlađenja (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Jedna stranica za svaku vezu koja je iz usmjeravanja isključena zbog privremenog razloga, umjesto
otvaranja stranice svakog pružatelja. Prikazuje hlađenja veza, zaključavanja modela i završna
stanja, briše ih po vezi, za odabir ili za sve veze pružatelja te uređuje najčešće podešavana pravila
hlađenja: `streamStallCooldown.enabled` i osnovno hlađenje `connectionCooldown` te maksimalni broj
koraka povratnog odstupanja za OAuth / API ključ (spremaju se putem
`PATCH /api/resilience`). Završna stanja (`banned`, `expired`, `credits_exhausted`) prikazuju se,
ali se ovdje nikada ne brišu.

Kartica **Pravila hlađenja pogrešaka** na istoj stranici uređuje pravila pogrešaka operatera
(`settings.providerErrorRules`) i zadane vrijednosti za sve ostale slučajeve po pružatelju
(`settings.providerErrorDefaults`) putem `PATCH /api/settings` — pogledajte „Pravila koja je
proglasio operater” u odjeljku §7 za način njihova podudaranja. Trajanja su Zadano (bez izričitog
hlađenja), 30 min, 1 h, 5 h, 24 h ili prilagođeno od 1 do 43.200 minuta (30 dana).

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentikacija: upravljanje):

- `GET /api/resilience/cooldowns[?provider=]` — veze sa statusom, preostalim hlađenjem,
  razinom povratnog odstupanja, posljednjom vrstom pogreške i zaključavanjima modela (bez vjerodajnica)
- `POST /api/resilience/cooldowns` — tijelo `{connectionIds: string[]}` ili
  `{all: true, provider?}`; vraća `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Sučelje postavki zaključavanja modela + oporavak smanjenjem nakon uspjeha (v3.8.23)

Zaključavanje modela prešlo je iz uvijek uključenog, tvrdo kodiranog ponašanja u potpuno konfigurabilnu,
opcijsku značajku s vlastitom karticom postavki i putem oporavka koji sam ispravlja stanje.

**Kartica postavki:** Postavke → Zaključavanje modela
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ovo je **različito** od gore navedene kartice samo za čitanje `ModelCooldownsCard` (koja samo
_popisuje_ aktivna zaključavanja) — nova kartica _konfigurira parametre_. Zadane vrijednosti nalaze se u
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Postavka                | Zadano                           | Značenje                                                                 |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `enabled`               | `false`                          | Glavni prekidač — zaključavanje modela **zadano je isključeno**.         |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statusi izvora koji se računaju kao neuspjeh opsega modela.              |
| `baseCooldownMs`        | `120_000` (120 s)                | Početno trajanje zaključavanja za prvi neuspjeh.                         |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Ograničenje eskaliranog hlađenja.                                        |
| `maxBackoffSteps`       | `10`                             | Maksimalan broj koraka eskalacije eksponencijalnog povratnog odstupanja. |
| `useExponentialBackoff` | `true`                           | Određuje povećavaju li ponovljeni neuspjesi hlađenje eksponencijalno.    |

Postavke se trajno spremaju putem uobičajene pohrane postavki i provjeravaju prema shemi postavki
otpornosti; kartica ograničava `baseCooldownMs`/`maxCooldownMs`
(s `maxCooldownMs ≥ baseCooldownMs`) i `maxBackoffSteps`.

**Oporavak smanjenjem nakon uspjeha:** oporavak se **ne** temelji samo na isteku vremena. Zdrav
odgovor smanjuje broj neuspjeha modela, tako da model koji se oporavio usred prozora prestane
eskalirati (i bude otključan) prije isteka svog mjerača. Na uspješnom ciljnom skupu,
`open-sse/services/combo.ts` poziva `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), što **prepolovljuje** spremljeni
`failureCount` (`Math.floor(failureCount / 2)`); kada dosegne `0`, unos zaključavanja potpuno se briše. Suprotna
funkcija `recordModelLockoutFailure()` povećava broj (i eskalira hlađenje) za neuspjehe unutar
prozora eskalacije. Ovo smanjenje nakon uspjeha nadopunjuje običan istek mjerača —
bilo koji put može ponovno omogućiti model.

**Stanje:** blokade se drže **u memoriji** (karte `Map` po procesu s ključevima
`ModelLockoutEntry` u obliku `provider:connectionId:model`, a blokade za točan opseg u obliku
`provider:connectionId:exact:model`), ne pohranjuju se u
bazu podataka — gube se pri ponovnom pokretanju. _Postavke_ se pohranjuju; aktivno _stanje_ blokade je privremeno.

---

## 4. Kontrola istodobnosti dijeljenjem kvote (v3.8.36)

Pretplatnički računi (GLM, MiniMax itd.) često prihvaćaju samo ~1–3 istodobna
zahtjeva; prekoračenje tog broja aktivira 429-odgovore i razdoblja hlađenja. To je
posebno izraženo kod kombinacija s **dijeljenjem kvote** (`qtSd/…`), gdje nekoliko
API ključeva dijeli isti nadređeni račun. Tri sloja sprječavaju preopterećenje
zajedničkog računa.

### Ograničenje istodobnosti po vezi (`max_concurrent`)

Svaka veza pružatelja može deklarirati gornju granicu `max_concurrent`
(`provider_connections.max_concurrent`, postavlja se u dijaloškom okviru veze / API-ju / bazi podataka).
Ostavite prazno za neograničeno. To je jedina postavka koja upravlja slojem
serijalizacije u nastavku — postavite je na stvarnu istodobnost računa
(npr. GLM ~1, MiniMax ~2).

### Ograničenja istodobnosti po modelu (`modelConcurrency`)

Veza može dodatno deklarirati točne gornje granice istodobnosti po modelu
unutar svoje mape `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Postavite ih u dijaloškom okviru veze (**Rate limit overrides → Per-model
concurrency caps**, jedan `model=cap` po retku) ili putem
`PATCH /api/providers/[id]` s istim JSON oblikom. Semantika ključeva:

- **Ograničenje za cijelu vezu u odnosu na ograničenje za određeni model:** `maxConcurrent` ostaje zajednička
  gornja granica za cijelu vezu. Kada se primjenjuju oba ograničenja, oba se
  pristupnika dobivaju atomski u istom složenom pristupniku
  (`global → provider → account → model`); stvarno ponašanje određuje strože
  primjenjivo ograničenje.
- **Točno podudaranje ključa modela:** ključ je niz modela proslijeđen izvršitelju nakon
  razrješenja usmjeravanja — obično goli ID modela nadređenog sustava
  (`glm-5`), a ne pseudonim `provider/model` na strani klijenta (`zai/glm-5` ne
  podudara se s `glm-5`). Vrijednosti su gornje granice broja istodobnih zahtjeva
  izražene pozitivnim cijelim brojevima.
- **Lokalno stavljanje u red čekanja, bez otkrivanja:** višak zahtjeva stavlja se lokalno u red čekanja uz
  postojeću semantiku reda čekanja/vremenskog ograničenja (tipizirane pogreške pri
  prihvatu `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute ne otkriva niti
  zaključuje pravila nadređenog sustava — primjenjuje točne granice koje je
  konfigurirao operator. Zasićeni pristupnik modela nikada ne onemogućuje pružatelja
  i nikada ne stvara trajnu blokadu modela; ponašanje pri 429-odgovoru/hlađenju/rezervnom
  odabiru nadređenog sustava ostaje zaštita u slučaju pogreške.
- **Opseg po vezi i procesu:** ograničenja vrijede po vezi s bazom podataka i drže se u memoriji, pa se dvije
  veze koje ponovno upotrebljavaju isti API ključ nadređenog sustava međusobno ne
  usklađuju.
- **Nekonfigurirano znači bez promjene:** izostavljanje mape (ili ostavljanje polja nadzorne ploče praznim) ne
  dodaje pristupnik za model. Primjer konfiguracije bez postavljanja univerzalnog
  ograničenja pružatelja:

```text
glm-5=1
glm-4.7=3
```

### Serijalizacija zahtjeva s dijeljenjem kvote

Kada usmjeravanje s dijeljenjem kvote cilja vezu koja deklarira pozitivan
`max_concurrent`, istodobni zahtjevi prema tom **računu** serijaliziraju se putem
semafora po vezi (ključ `qsconn:<connectionId>`): višak zahtjeva **čeka u redu**
umjesto da preoptereti račun. To je **propusno u slučaju pogreške** — zasićeni
red ili istek vremena nastavlja se bez dodijeljenog mjesta, umjesto da ikad odbije
zahtjev koji se može otpremiti. Uključuje se u **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, zadano je
uključeno). Bez ograničenja `max_concurrent` ponašanje ostaje nepromijenjeno.

> Pristupnik za usmjeravanje s dijeljenjem kvote (`selectQuotaShareTarget`, DRR + P2C) sam je
> propusan u slučaju pogreške i samo _smanjuje prioritet_ veze koja je dosegla
> ograničenje — s bazenom od jedne veze ne može nametnuti tvrdo ograničenje, pa je
> ovaj semafor ono što stvarno ograničava preopterećenje.

### Ponovni pokušaj kombinacije uzimajući u obzir hlađenje

Za svaku strategiju kombinacije (kada je omogućena), zahtjev koji bi proizveo 429
zbog KRATKOG prolaznog hlađenja čeka da ono istekne i ponovno se otprema umjesto
vraćanja 429-odgovora — to obuhvaća TPM/RPM prozore klase Gemini (~60 s za
ponovni pokušaj) na kombinacijama s više modela, npr. kada oba cilja kombinacije
od dva modela dosegnu ograničenje stope po modelu. Ograničeno je postavkom
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) u **Settings → Resilience**. Nikada ne čeka na
`quota_exhausted` (zaključano do ponoći) ni na razloge povezane s provjerom
autentičnosti/nepronalaženjem.

Kombinacija se može isključiti s `config.comboCooldownWaitEnabled: false`. Samo
literal `false` onemogućuje ova zajednička čekanja (hlađenje nakon otpreme i
čekanja prije otpreme zbog otvorenog prekidača/zaključanog modela) i njihovo
proširenje donje granice vremenskog ograničenja proračuna čekanja.
Nedostajuća vrijednost ili `true` zadržava globalnu politiku; `true` ne može
globalno onemogućeno čekanje ponovno omogućiti. Izričiti `targetTimeoutMs` i dalje
ima prednost. Ova mogućnost isključivanja ne mijenja zasebno izvorno čekanje
vezivanja poteza native-Codexa prije otpreme.

Isti pristupnik obuhvaća slučaj prije otpreme (#16319): kada se svaki cilj
kombinacije preskoči prije bilo kakvog pokušaja jer je njegov model u kratkoj
prolaznoj blokadi, putanja s nula pokušaja čeka da blokada istekne pod istim
granicama i ponovno otprema zahtjev, umjesto odgovora bez naznake
`503 ALL_TARGETS_SKIPPED`. Kada čekanje nije dopušteno (dosegnuta granica,
iscrpljeni pokušaji ili proračun, odnosno isključena mogućnost), završni odgovor
podiže se na `429 rate_limit_error` i sadrži `retry_after` / `reset_at` iz
najranijeg isteka prolazne blokade; blokade kvote, provjere autentičnosti i
nepronalaženja zadržavaju 503 bez naznake.

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

## 5. Kontrola prijema u red zahtjeva (v3.8.49 · issue #6593)

**Opseg**: lokalni red ograničavanja brzine po pružatelju+vezi (`open-sse/services/rateLimitManager.ts`, potkrijepljen Bottleneckom), jedan sloj ispod tri gore navedena mehanizma.

**`maxWaitMs` ograničava čekanje u redu; `executionMaxWaitMs` ograničava izvršavanje.** Ta su dva namjerno odvojena i nijedan ne napaja drugi.

`resilienceSettings.requestQueue.maxWaitMs` je **proračun čekanja u redu**: pokriva čekanje na slobodno mjesto kod pružatelja i zatim stajanje u statusu QUEUED, a njegov se timer briše čim posao napusti QUEUED i počne se izvršavati (`rateLimitManager.ts`, `wrappedFn`). Zahtjev koji ga prekorači nikad ne stiže do upstreama. Zadano 30000ms, dolazi iz `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` u `src/lib/resilience/settings.ts` i učvršćeno je testom `tests/unit/ratelimit-admission-control-6593.test.ts`, pa će promjena te vrijednosti taj test učiniti crvenim umjesto da ovaj odlomak tiho zastari.

`resilienceSettings.requestQueue.executionMaxWaitMs` je ono što Bottleneck prima kao `expiration` posla, čiji timer počinje tek nakon otpreme. To je sigurnosna granica za izvršitelje bez vlastitog upstream timeouta, a podiže se na izvršiteljev vlastiti timeout pokretanja fetcha kada je taj duži, pa ne može prekinuti zdrav odgovor u tijeku. Zadano 600000ms (10 min).

Proslijeđivanje proračuna reda u `expiration` ono je što je nekada ubijalo neinkrementalne gatewaye usred prijenosa — oni legitimno rade minutama prije prvih bajtova — i zato se istek izlaže kao `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), dok proračun reda nosi kod timeouta reda. Nadjačajte bilo koji putem `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ili nadzorne ploče (**Postavke → Otpornost**). Obje se prilikom normalizacije ograničavaju na raspon 1ms–24h.

**Prioritet, za oba:** varijabla okruženja daje samo _zadanu vrijednost_. Vrijednost pohranjena u `resilienceSettings.requestQueue` (nadzorna ploča / API patch, spremljena u `key_value`) nadjačava je, a `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` po vezi nadjačava i to. Postavljanje varijable okruženja na implementaciji koja već ima pohranjenu vrijednost stoga ništa ne mijenja — umjesto toga očistite ili ažurirajte pohranjenu postavku.

Boravak u redu ograničen je s `maxWaitMs`; `maxQueueDepth` dolje ograničava koliko pozivatelja smije biti u redu istodobno.

**Ponovni pokušaji navedeni u tijelu: tempiranje naspram blokade.** Tijelo odgovora 429 može samo navesti vlastito čekanje (Gemini `RetryInfo.retryDelay`, tekst "retry after Ns"), koje čita `updateFromResponseBody`. Čekanje koje stane u `maxWaitMs` veze jest tempiranje: limiter na to vrijeme isprazni svoj spremnik, a pozivi u redu otpreme se kad se on ponovno napuni. Čekanje duže od `maxWaitMs` nije nešto što red može izdržati — Gemini na iscrpljenu dnevnu kvotu odgovara s `retryDelay: "86399s"`. Proslijeđeni `Retry-After` na ponovno izgrađenom odgovoru 429 (#16528) već tjera fallback mehanizam da zaključa model za taj vremenski prozor, ali pauziranje limitera i zbog njega i dalje bi zaustavljalo svaki poziv koji ključ dosegne prerano (nakon resetiranja otpornosti, na primjer) za cijeli `maxWaitMs`. Kada takvo čekanje dolazi iz tipiziranog Googleovog detalja `RetryInfo` (podrijetlo `google_rpc_retry_info`) i limiter ključa već je sužen na model (vidi `getLimiterKey`), 429 umjesto toga postaje blokada modela na toj vezi (`lockModelForLongBodyRetry` u `open-sse/services/rateLimitManager/bodyRetryPause.ts`, ograničena na 24h), a limiter ostaje nepauziran. Odabir računa preskače na temelju te blokade putem `isModelLocked()`, kao što to čini i provjera kombinacije prije otpreme za ciljeve pripete na vezu. Na antigravityju, čiji je limiter po obitelji kvota, blokada je na točnom modelu, kao i njegove druge blokade kvota. Ime koje je klijent zatražio također se zaključava kada ga je alias razriješio na taj model, jer te provjere koriste zatraženo ime; zaključano je točno (`lockExactModel`), pa alias koji prelazi obitelj kvota antigravityja ili opseg codexa nikada ne zaključava vlastito ime. Prozni nagovještaj, netipizirani `retryDelay` ili limiter koji dijeli cijela veza zadržavaju pauzu. Kada limiter koji je put 429 upravo ponovno izgradio ipak pauzira, pozivatelj čije preostalo vrijeme u redu završava prije kraja pauze odmah se odbija kodom timeouta reda (`checkLimiterPause`), umjesto da to vrijeme odčekuje; zabilježeni kraj usidren je prije nego što se limiter izgradi, gdje Bottleneck pokreće svoj sat osvježavanja, i svaka kasnija promjena spremnika ga zaboravlja. Pokriveno s `tests/unit/rate-limit-long-body-retry-lockout.test.ts` i `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — opcionalno ograničenje prijema (novo).** `resilienceSettings.requestQueue.maxQueueDepth` ograničava koliko zahtjeva smije istodobno stajati u redu (još nisu otpremljeni) za jednog pružatelja+vezu. Kada red već sadrži `maxQueueDepth` zahtjeva, novi se zahtjev brzo odbija s tipiziranom pogreškom `code: "RATE_LIMIT_QUEUE_FULL"` **prije** nego što uopće dosegne `limiter.schedule()` — pa je odbijanje jeftino i događa se prije svakog naknadnog rada na sažimanju upita / prijevodu za taj zahtjev. Zadano `0` = onemogućeno, čime se čuva postojeće ponašanje neograničenog reda; ograničeno na 0–100000. Nadjačajte putem `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ili `resilienceSettings.requestQueue.maxQueueDepth` (nadzorna ploča/API patch).

Sama provjera prijema čista je funkcija (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), pa se može jedinično testirati bez stvarnog Bottleneck limitera.

> RFC koji je otvorio #6593 također je predložio zastavicu `bypassCompressionOnRateLimit`.
> Lanac obrade `open-sse/services/compression/` u ovom repozitoriju jest
> sažimanje upita/konteksta na odlaznom LLM zahtjevu (`chatCore.ts`,
> oko bloka `resolveCompressionSettings`/`selectCompressionStrategy`),
> a ne HTTP sažimanje odgovora na sintetiziranim tijelima 429 — ne postoji
> odgovarajuća putanja koda za doslovnu zastavicu zaobilaženja. Taj korak
> sažimanja upita trenutno se također izvršava _prije_ `withRateLimit()` u
> lancu obrade zahtjeva, pa je preuređivanje radi njegovog preskakanja pri
> odbijanju zbog punog reda odvojena, veća promjena od opsega ovog problema;
> namjerno **nije** implementirana ovdje i ostavljena je kao naknadni zadatak
> ako dobitak u uštedi CPU-a vrijedi rizika preuređivanja.

### Sigurnosna mreža automatskog omogućavanja ograničenja brzine i zaštita veze (`rateLimitProtection`)

**Sigurnosna mreža automatskog omogućavanja** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, zadano `true`):
Prema zadanim postavkama, OmniRoute automatski omogućuje zaštitu reda ograničenja brzine za sve aktivne veze pružatelja s API ključem (`getProviderCategory(provider) === "apikey"`). To osigurava da dolazni zahtjevi prema upstream API ključevima osjetljivima na ograničenje brzine budu stavljeni u red i prigušeni kroz Bottleneck, umjesto da nalete na upstream pogreške 429. Sigurnosna mreža može se nadjačati putem varijable okruženja `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` onemogućuje, `true`/`1`/`on` prisilno uključuje), koja ima prednost nad trajno pohranjenom postavkom nadzorne ploče (**Postavke → Otpornost** / `PATCH /api/resilience`).

**Semantika `rateLimitProtection` po vezi:**
Zaštita ograničenja brzine po vezi prati se putem booleovskog polja `rateLimitProtection` na vezama pružatelja (trajno pohranjenog kao `rate_limit_protection` u SQLite):

- **Eksplicitno uključeno (`rateLimitProtection === true`)**: Zaštita ograničenja brzine izričito je omogućena za ovu vezu, bez obzira na kategoriju pružatelja ili je li sigurnosna mreža automatskog omogućavanja uključena.
- **Eksplicitno isključeno (`rateLimitProtection === false`)**: Onemogućuje eksplicitnu zaštitu, ali **ne** isključuje aktivnu vezu s API ključem iz globalne sigurnosne mreže automatskog omogućavanja. U `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` i `undefined` ekvivalentni su: samo se `rateLimitProtection === true` tretira kao eksplicitno nadjačavanje. Ako je `rateLimitProtection` `false` (ili nije postavljeno), aktivna veza s API ključem i dalje zadovoljava uvjet automatskog omogućavanja i ostaje zaštićena ograničenjem brzine.
- **Nema isključivanja po vezi**: Operator trenutno ne može izraziti "ova pojedina aktivna veza s API ključem mora raditi bez zaštite reda ograničenja brzine" uz zadržavanje aktivnog automatskog omogućavanja za ostale. Za potpuno izvođenje veza s API ključem bez redova ograničenja brzine, sigurnosna mreža mora se globalno isključiti (`RATE_LIMIT_AUTO_ENABLE=false` ili `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Podržane putanje pisanja:**

- **`POST /api/rate-limits`**: Podržana upravljačka putanja pisanja za prebacivanje `rateLimitProtection` za vezu (`{ connectionId: string, enabled: boolean }`). Poziv s `enabled: true` uključuje eksplicitnu zaštitu; poziv s `enabled: false` uklanja eksplicitnu zaštitu (iako aktivne veze s API ključem ostaju pokrivene globalnom sigurnosnom mrežom ako je automatsko omogućavanje uključeno).
- **`PUT /api/providers/[id]`**: Namjerno **ne** prihvaća niti mijenja `rateLimitProtection` (#11278). Ažuriranje metapodataka veze pružatelja putem `PUT /api/providers/[id]` nikada neće promijeniti trajno pohranjeno stanje zaštite ograničenja brzine.

---

## 6. Nadzor propusnosti sporog toka (#9709)

Dodatni `resilienceSettings.streamRecovery.throughputWatchdog` guard detektira uzvodni prijenos koji još uvijek šalje dijelove, ali proizvodi izlaz pomoćnika ispod konfigurirane brzine korisnog izlaza. Namjerno se razlikuje od vremenskog ograničenja mirovanja: otkucaji srca i metapodaci ne poništavaju nijedan tajmer i ne računaju se kao napredak. Također se razlikuje od roka teškog pokušaja (#9153), koji ostaje apsolutna sigurnosna gornja granica bez obzira na kvalitetu ispisa.

Watchdog zahtijeva razdoblje zagrijavanja nakon kojeg slijedi potpuni pokretni prozor prije nego što može prekinuti. Broji tekstualne delte iz dovršetaka razgovora i odgovora API izlaznih događaja (konzervativni UTF-8 bajt proxy), zanemaruje događaje samo za upotrebu i prazne događaje i obustavlja prosudbu dok su događaji pozivanja alata ili razmišljanja u tijeku. Onemogućen je prema zadanim postavkama i može se omogućiti pomoću `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (ta env vrijednost postavlja samo zadani — a spremljeni `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean pobjeđuje; pogledajte bilješku o prednosti env-vs-dashboard na vrhu ovog vodiča); prozor, zagrijavanje, minimalna brzina i minimalni mjerljivi učinak ograničeni su normalnim slojem normalizacije postavki otpornosti.

Kada je omogućeno, prekid nadzornog psa primjenjuje se samo na aktivni uzvodni pokušaj. Prije bilo kakvih bajtova vidljivih klijentu, postojeći put ranog oporavka istog računa može ponovno otvoriti pokušaj. Nakon predaje, stream se nikad ne reproducira slijepo; samo postojeći sigurni srednji ugovor o nastavku može spojiti sufiks. Finalizacija ostaje jednostruka, tako da se obračun korištenja i izdavanje semafora ne dupliciraju.

---

## 7. Ponovno postavljanje statusa uzvodnog sustava (pogrešno navedene kvotne pogreške)

**Opseg:** jedan uzvodni pristupnik koji privremenu iscrpljenost kvote prijavljuje pogrešnim HTTP statusom.

**Svrha:** ispraviti obmanjujući status PRIJE klasifikacije kako bi nizvodni potrošači (mehanizam za prebacivanje, agregacija combo i odgovor usmjeren klijentu) vidjeli stvarnu prirodu pogreške koja se može ponovno pokušati.

Neki pristupnici iscrpljenost PRIVREMENE kvote označavaju HTTP statusom koji se ne može ponovno pokušati. `agentrouter.org` vraća `403` (ponekad `400`) s kineskim tijelom (`用户额度不足` / `额度不足`) umjesto standardnog `429`. Klijenti poput Claude
Codea tretiraju `403` kao trajnu pogrešku i prekidaju sesiju, a bez ispravka
bi je mehanizam za prebacivanje klasificirao kao `AUTH_ERROR`, a ne kao događaj
povezan s kvotom.

**Implementacija:**

- Registar + podudaranje: `open-sse/config/upstreamStatusRestatement.ts` — popis pravila po pružatelju (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`), koji se podudara putem `applyStatusRestatement()`.
- Mjesto poziva: blok `providerFailure:` u `open-sse/handlers/chatCore.ts`
  (oko retka 3654), odmah nakon što `parseUpstreamError()` raščlani uzvodni
  odgovor s HTTP statusom pogreške (`!providerResponse.ok`) i prije pokretanja
  bilo kakve klasifikacije, tako da svaki nizvodni potrošač vidi ispravljeni
  status. Pogreške ugrađene u SSE tok `200` slijede zaseban, kasniji put
  raščlambe toka i danas **nisu** obuhvaćene ovom kukicom — to je poznato
  ograničenje koje još nije potrebno za pogrešni status agentroutera (koji se
  pojavljuje kao HTTP status pogreške).
- Prikladnost za ponovni pokušaj: `429` se nalazi u
  `RETRY_AFTER_ELIGIBLE_STATUSES` (`open-sse/services/combo/unavailableRetryGate.ts`), pa ponovno postavljena pogreška prenosi stvarni prozor za ponovni pokušaj umjesto da se prikaže kao neaktivni `403`.
- Sintetički `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  samo je ono što ponovno postavljeni odgovor priopćava **klijentu**; on sam
  po sebi nije trajanje internog hlađenja/blokade veze — njime zasebno upravlja
  mehanizam koji stvarno obrađuje ponovno postavljenu pogrešku (eskalirajuće
  povratno čekanje Connection Cooldowna, §2, s osnovnih `3s` za pružatelje API
  ključeva; ili Model Lockout, §3, za pružatelje kvota po modelu poput
  agentroutera). Usmjerivač može interno postati podoban za ponovni pokušaj
  prije isteka prozora od 60 s koji oglašava klijentu — to je namjerni prostor,
  a ne programska pogreška.

Trajne pogreške (`无权访问模型` — nema pristupa ovom modelu) agentroutera
NIKADA se ponovno ne postavljaju: `excludeMarkers` poništava pravilo čak i kada
se `textMarkers` podudare, pa pogreška zadržava izvorni status i ništa je
zauvijek ne pokušava ponovno. Odgovarajuće pravilo klasifikacije pružatelja
(`agentrouter-model-access-denied` u `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklarirano osnovno hlađenje `6h`)
provjerava `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_prije_ ranog generičkog povratka za kategoriju apikey `FORBIDDEN`, uz uvjet
`honorsRuleLockScope(provider)` (#10334 — trenutačno ekskluzivno za agentrouter
putem popisa dopuštenih pružatelja `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u
`providerErrorRules.ts`). Deklarirano hlađenje pravila prosljeđuje se kao
`fallbackResult.baseCooldownMs`, ali se i dalje koristi postojeći put blokade
po modelu kvote (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, koji se u #10334 nije promijenio osim izvora
trajanja hlađenja): ograničava se na vrijednost `mlSettings.maxCooldownMs`
operatora (zadano `1_800_000ms` / 30 min), kao i svaka druga blokada modela, a
_postojeći razlog blokade_ ostaje prethodno hardkodirani `"forbidden"`, a ne
`"auth_error"` iz pravila — u cijelosti se uvažava samo trajanje hlađenja, ne i
niz razloga. Sama veza ostaje aktivna; susjedni modeli na istoj vezi nisu
pogođeni.

Ponovno postavljene pogreške kvote (`额度不足`) u produkciji dolaze do pravila
pružatelja (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, bez vlastitog deklariranog hlađenja — primjenjuje se
zadano skalirano povratno čekanje sloja trajne pohrane). Od #10334, `scope` u
`ProviderErrorRuleMatch` koristi se od početka do kraja, ali **samo** za
pružatelje na popisu dopuštenih `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — danas samo `"agentrouter"`, uz provjeru putem
`honorsRuleLockScope()`). Za sve ostale pružatelje `scope` ostaje samo
informativan, točno kao i prije #10334.
`checkFallbackError` izloženi opseg podudarenog pravila postavlja u
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) zajednička je zaštita koja potvrđuje da je
`ruleScope` doista sigurno uvažiti kao signal na razini veze koji se sam
oporavlja (opseg `"connection"`, razlog `quota_exhausted`, nikad
`permanent`, nikad `creditsExhausted` — zaštita od budućeg uparivanja opsega
`"connection"` s trajnim stanjem računa). Pozivaju ga dva potrošača:

- **Trajnost** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  umjesto prelaska u granu blokiranja **po modelu** pružatelja za prosljeđivanje
  (agentrouter ima `passthroughModels: true` → `hasPerModelQuota()`
  vraća `true`), primjenjuje **privremeno hlađenje veze** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nikad završni status
  (`credits_exhausted`/`banned`/`expired`) — tako da se veza sama oporavi
  nakon isteka hlađenja, umjesto da zahtijeva ručno ponovno postavljanje
  vjerodajnica.
  Preskače se za veze s `disableCooling: true` (#2997): ta se opcija
  odricanja umjesto toga prebacuje na blokiranje po modelu (dokumentirani
  kompromis — pogledajte komentar koda iznad grane).
- **Usmjeravanje kombinacije unutar istog zahtjeva** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ista zaštita označava
  vezu u skupu `exhaustedConnections` u memoriji, s ključem
  `${provider}:${connectionId}`. Time se preskače samo preostali cilj ISTOG
  ZAHTJEVA koji _sam već sadrži taj točan `connectionId`_ u vlastitom objektu
  cilja (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` prije dohvaćanja iz `exhaustedConnections`) — obična
  kombinacija s popisom modela, u kojoj susjedni ciljevi nemaju vlastiti
  pripadajući `connectionId`, a jedan se razrješava po slanju iz zaglavlja
  `X-OmniRoute-Selected-Connection-Id` odgovora, nikad ne dolazi do tog
  podudaranja ključeva. U tom uobičajenom slučaju stvarna zaštita od toga da
  preostala etapa ponovno upotrijebi upravo iscrpljeni račun NIJE ovaj Set —
  to je prethodno opisana trajna pohrana (veze `rateLimitedUntil` sada je u
  budućnosti), u kombinaciji s time da ova ista zaštita zaustavlja dodavanje
  pružatelja u `transientRateLimitedProviders` za taj neuspjeh (pogledajte
  „Dizajn u dvije faze” i komentar koda uz granu
  `isAgentrouterConnectionQuotaScope` u `targetExhaustion.ts`): budući da taj
  Set ostaje neoznačen, `allowRateLimitedConnection` prisilno dopuštanje iz
  `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NE
  aktivira se za preostale etape pružatelja, pa se filtar
  `rateLimitedUntil` pri odabiru vjerodajnica (`src/sse/services/auth.ts:1238`)
  normalno primjenjuje, a preostala etapa ili odabire drugu, još uvijek
  prihvatljivu agentrouter vezu ili ne uspijeva jer nema dostupnih
  vjerodajnica — ne vraća se prisilno na vezu koja je upravo stavljena na
  hlađenje ovom granom.

### Dizajn u dvije faze: ponovno navođenje statusa, zatim klasifikacija

Ponovno navođenje statusa (`upstreamStatusRestatement.ts`) i pravila
klasifikacije pružatelja (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) zasebni su registri koji se oba temelje na
identifikatoru pružatelja i tekstualnim oznakama, ali izvršavaju se na
različitim mjestima i služe različitim svrhama: ponovno navođenje rano
prepisuje HTTP status u `chatCore.ts`; pravila klasifikacije odabiru
rezervni `reason` i zaključavaju `scope`
(`model` / `provider` / `connection`) unutar `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Pravila klasifikacije vide samo puni **tekst** pogreške (potreban za
podudaranje s oznakama u tijelu poput `额度不足`) za pružatelje navedene na
popisu dopuštenih `FULL_TEXT_RULE_PROVIDERS` u `providerErrorRules.ts` —
trenutačno samo `"agentrouter"`. Za svakog drugog pružatelja iz **ugrađenog
kataloga**, `checkFallbackError` prosljeđuje funkciji
`getProviderErrorRuleMatch` samo strukturiranu pogrešku (`{code, type}`),
što je dovoljno za pravila temeljena na zaglavlju/statusu/kodu, ali ne vidi
oznake u tekstu tijela. Pomoćna funkcija `resolveRuleMatchBody()` provodi
taj odabir: puni tekst pogreške za pružatelje na popisu dopuštenih, a
strukturiranu pogrešku u suprotnom. Dodavanje **ugrađenog** pružatelja u
`FULL_TEXT_RULE_PROVIDERS` izričita je opcija uključivanja po pružatelju —
ona postoji kako bi zadani put za svakog pružatelja koji nije na popisu
ostao potpuno nepromijenjen na razini bajtova.

`scope` pravila (`model` / `provider` / `connection`) zasebna je opcija
uključivanja u odnosu na `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError`
izlaže ga samo kao `fallbackResult.ruleScope`, a potrošači nizvodno
uvažavaju ga kao bilo što više od informativne oznake samo za pružatelje
na popisu dopuštenih `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u istoj datoteci
(uz provjeru putem `honorsRuleLockScope()` — danas samo `"agentrouter"`).
Pogledajte „Ponovno navedene pogreške kvote” iznad za objašnjenje što
podudaranje `scope: "connection"` zapravo radi nakon što je pružatelj
dodan na taj popis dopuštenih.

**#11104 — pravila koja je deklarirao operator zaobilaze oba popisa dopuštenih.** Operator može tijekom izvođenja deklarirati pravilo po pružatelju putem `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
bez uređivanja ove datoteke. Uvjetovanje operatorskog pravila popisima
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — popisima
namijenjenima zaštiti **zadanog** ponašanja pravila ugrađenog kataloga —
učinilo bi mehanizam postavki neaktivnim za svakog pružatelja osim onih
koji su već navedeni na tim popisima, budući da je deklariranje pravila
već izričita opcija uključivanja operatora. `resolveRuleMatchBody()` i
`honorsRuleLockScope()` najprije provjeravaju
`hasOperatorRuleForProvider()`: pružatelj s operatorskim pravilom dobiva
neobrađeni tekst pogreške i uvažava njegov deklarirani `scope`, neovisno
o tome pojavljuje li se i na jednom od tih popisa dopuštenih.

**Pravila koja je deklarirao operator** (`OperatorProviderErrorRule`):
svako pravilo ima neobavezni `status` i neobavezni `match` (običan podniz
teksta pogreške koji ne razlikuje velika i mala slova, nikad RegExp, pa ne
može uzrokovati ReDoS), a mora postaviti barem jedno od ta dva polja. Kada
su postavljena oba, povezana su operatorom AND; izostavljeno polje podudara
se sa svime, pa `{match: "insufficient_quota"}` odgovara svakom statusu
koji sadrži taj kod. Pobjeđuje prvo podudarno pravilo.
`cooldownMs` prihvaća najviše 30 dana; ukupno je dopušteno najviše 50
pravila.

**Zadane vrijednosti za sve slučajeve** (`settings.providerErrorDefaults`, uključivanje po želji, postavlja se putem
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
s `cooldownMs` od 1 minute do 30 dana. Zadana se vrijednost primjenjuje samo kada se nije podudaralo nijedno operatorsko pravilo ni ugrađeno pravilo kataloga, i samo na pogreške 402, 403, 408, 429 i 5xx. Pogreške oblika zahtjeva (400, 404, 409, 413, 422) i samostalne pogreške 401 zadržavaju vlastitu obradu. Bez eksplicitnog `reason`, razlog dolazi iz statusa, na isti način kao što to radi `classifyError`. Deklariranje zadane vrijednosti računa se kao operatorsko pravilo za `hasOperatorRuleForProvider()`, pa se njezin `scope` (zadano `"connection"`) poštuje. Učinkovito trajanje hlađenja zadane vrijednosti dulje je od njezina `cooldownMs` i vlastite upute pružatelja za ponovni pokušaj (`Retry-After`, `x-ratelimit-reset` ili uputa za resetiranje u tijelu, ista ona koju engine poštuje kada je uključena postavka za hlađenje veze „koristi uzvodne upute za ponovni pokušaj”), tako da zadana vrijednost može produljiti kratku uzvodnu uputu, ali nikada ne može skratiti stvarno resetiranje. Eksplicitno operatorsko pravilo zadržava svoj točan `cooldownMs`. Ni pravilo ni zadana vrijednost ne zaobilaze zaštite hlađenja veze u `markAccountUnavailable`: aktivno, dulje hlađenje nikada se ne skraćuje, a terminalni status nikada se ne prepisuje. Ugrađeni detektori teksta koji se ranije pokreću u `checkFallbackError` (potrošeni krediti, dnevna kvota, deaktiviran račun) i dalje imaju prednost za vlastite izraze.

**Poznati nedostatak — `providerRuleRegistry` nikada se ne provjerava za HTTP 400.**
Grana `BAD_REQUEST` u `checkFallbackError` u potpunosti klasificira status 400 putem vlastitih polja uzoraka (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` itd. u `accountFallback.ts`) i vraća se prije nego što se dosegne grana `configuredRule`/`getProviderErrorRuleMatch` iznad nje.
Ugrađeno pravilo kataloga (ili operatorsko pravilo) sa `status: 400` sintaktički je valjano, ali se nikada neće aktivirati. Nijedno postojeće pravilo danas ne cilja 400, pa to ne utječe ni na što u produkciji — ali buduće pravilo za 400 prvo zahtijeva izmjenu ove grane, što je veća promjena od dodavanja pravila (ponovno klasificira 400 za svakog pružatelja koji se već oslanja na ponašanje polja uzoraka) i izvan je opsega dodavanja pravila za jednog pružatelja.

### Dodavanje novog pristupnika koji pogrešno navodi kvotu

1. Registrirajte jedno polje pravila u `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Neka `textMarkers`
   budu specifični za pružatelja; nikada nemojte ponovno upotrebljavati generičke engleske izraze koji se preklapaju sa
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Po želji registrirajte pravila klasifikacije u
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) kako biste odabrali odgovarajući opseg zaključavanja (`connection` za kvotu na razini računa, `model` za pogreške po modelu). Ovaj korak u produkciji ima učinka samo za pružatelje čija pravila trebaju puni tekst pogreške (oznake u tijelu): dodajte identifikator pružatelja u `FULL_TEXT_RULE_PROVIDERS` u istoj datoteci — u suprotnom `checkFallbackError` pravilu uvijek prosljeđuje samo strukturiranu pogrešku `{code, type}`, pa se pravilo koje provjerava tekst tijela nikada neće podudarati sa stvarnim prometom.
   Pravila koja se podudaraju isključivo prema `status`/`headers` (poput onih za Opencode ili Minimax) ne trebaju ovo uključivanje. Odvojeno od toga, ako pravilo deklarira `scope: "connection"` i namjera je stvarno hlađenje na razini veze uz preskakanje kombinacije za isti zahtjev (a ne samo informativna oznaka), dodajte identifikator pružatelja u `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u istoj datoteci — to upravlja potrošnjom u stilu `isAgentrouterConnectionQuotaScope()` u `markAccountUnavailable()`
   (`src/sse/services/auth.ts`) i
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez toga `scope`
   i dalje prolazi kroz `fallbackResult.ruleScope`, ali ništa ne djeluje na temelju njega.
3. Dodajte jedinične testove po uzoru na
   `tests/unit/upstream-status-restatement.test.ts`
   i `tests/unit/agentrouter-error-rules.test.ts` (uključujući zaštite not-permanent / not-creditsExhausted i — ako pružatelj treba popis dopuštenih — test koji potvrđuje da `resolveRuleMatchBody()` vraća puni tekst samo za tog pružatelja).

Nisu potrebne nikakve izmjene u `chatCore.ts`, `classifyError` ili combo.

#### Zaključavanje grupirano prema izlaznom segmentu (#10880)

Pružatelji u `EGRESS_BUCKETED_LOCK_PROVIDERS` (obitelj opencode) tretiraju se kao uzvodni sustav grupiran prema IP adresi (besplatna razina opencodea grupirana je prema IP adresi, a ne prema računu — pogledajte #9611): status-429 klasificiran kao
`quota_exhausted` **ili** `rate_limit_exceeded` hladi svaku vezu iz obitelji na popisu dopuštenih čija posljednja poznata izlazna IP adresa odgovara IP adresi neuspjele veze, prije nego što ih rotacija može pokušati
— čime se izbjegavaju N-1 zajamčeno neuspješni pozivi prema uzvodnom sustavu (isti obrazac kao u #10460/#10525).
`rate_limit_exceeded` namjerno je uključen: na putanji `markAccountUnavailable` pravila specifična za opencode nikada se ne podudaraju (u `checkFallbackError` ne prosljeđuju se zaglavlja/tijelo, a opencode nije u `FULL_TEXT_RULE_PROVIDERS`), pa se 429 čije tijelo sadrži tekst o kvoti pretplate ("monthly usage limit
reached") klasificira kao `quota_exhausted` putem zamjenskog pravila za tekst kvote (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; hlađenje od 1 sata) prije nego što se dosegne pravilo `status_429` — dok se 429 bez teksta kvote (obično ograničavanje brzine) putem pravila `status_429` klasificira kao `rate_limit_exceeded` i i dalje hladi IP obitelj. Za pružatelja na popisu dopuštenih, ograničavanje brzine grupirano prema IP adresi isti je signal kao i iscrpljena kvota. Poštena ograničenja:

- **Najbolji pokušaj**: zaključavanje razrješava posljednji poznati `egress_ip` veze iz tablice `proxy_logs` (prozor od 24 h, sinkrono, bez predmemorije). Hladna predmemorija (`egress_ip` nikad nije provjeren) ili nepostojanje retka → veza koja je uzrokovala neuspjeh i dalje se hladi granom (zapisuje se kao i danas), samo se nijedna srodna veza ne zaključava.
- **Nikad terminalno**: hlađenje je obnavljajući prozor kvote
  (`testStatus: "unavailable"`); trajno stanje nikad se ne izvodi iz signala na razini IP-a. Veze s `disableCooling` u potpunosti preskaču granu.
- **Granularnost zaključavanja mijenja se za obitelj na popisu dopuštenih**: ovo je promjena opsega, a ne samo optimizacija srodnih veza. opencode je pružatelj `passthroughModels`, pa je prije ove grane pogreška 429 uzrokovala zaključavanje po MODELU; sada uzrokuje hlađenje veze — uključujući operatora koji pokreće samo jednu vezu bez ijedne srodne veze. To je granularnost koju tablica pravila za opencode već proglašava ispravnom (`scope: "connection"`,
  `providerErrorRules.ts`), ali se dosad nikad nije poštovala jer opencode nije u `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Grana sama zapisuje hlađenje veze koja je uzrokovala neuspjeh i `backoffLevel`, oponašajući granu agentrouter koja vrijedi za opseg veze, te se vraća — blok po modelu i generički put ispod nikad se ne dosežu.
- **Combo uključen**: poput grane agentrouter, opseg namjerno zanemaruje snižavanje `persistUnavailableState`/`isCombo` koje pozivatelj combo primjenjuje na 429. Zaključavanje po modelu nije slabiji oblik ovog opsega, već je pogrešna jedinica: ne govori ništa o iscrpljenom IP-u, pa bi rotacija combo i dalje trošila jedan zajamčeno neuspješan poziv po srodnoj vezi.
- **Sigurnost srodnih veza**: srodna veza koja je već terminalna (banned/credits_exhausted) ili je već u duljem hlađenju nikad se ne prepisuje.
- **Ekskluzivni popis dopuštenih**: proširivanje `EGRESS_BUCKETED_LOCK_PROVIDERS` izričita je odluka vlasnika; nema generičkog povezivanja (obrazac #10334/#10419). Upit za srodne veze povezuje isti popis dopuštenih umjesto da ga ponavlja kao SQL literal, pa njegovo proširivanje ostaje promjena u jednom retku.
- **Rotacija izlaznog IP-a u oba smjera**: prozor pretraživanja (24 h) mnogo je širi od TTL-a predmemorije izlaznog IP-a (5 min), pa je "posljednji poznati IP" povijest, a ne trenutačno stanje. Ako se proxy veze rotirao unutar prozora, zaključavanje može **promašiti** uistinu zajednički IP (zabilježeni IP novi je i nije iscrpljen) — i simetrično može **ohladiti srodnu vezu koja je u međuvremenu promijenila IP** i više ne koristi iscrpljeni IP. Drugi slučaj tu srodnu vezu košta jednog prozora hlađenja; oba su prihvaćena ograničenja najboljeg pokušaja pretraživanja temeljenog na povijesti.
- **Trošak**: dva ograničena pretraživanja `proxy_logs` (prozor filtriran preko `idx_pl_timestamp`), samo pri učestalosti 429. Nema novog indeksa (migracija 134 YAGNI). Izmjereno na kopiji baze sa stvarnim prometom umjerene veličine; instanca s velikom propusnošću sadržava proporcionalno više redaka u istom prozoru.

## Ostale značajke otpornosti

- **20 strategija usmjeravanja** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — vidi [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Usmjeravanje svjesno resetiranja** (v3.8.0) — daje prioritet vezama prema vremenu resetiranja kvote.
- **Degradacija pozadinskog načina rada** — Responses API `background: true` degradira se na sinkrono izvođenje s upozorenjem.
- **Dinamičko otkrivanje ograničenja broja alata** — povlači davatelje kada se dosegne ograničenje broja alata.
- **Hitni fallback** — kontrolira se putem `OMNIROUTE_EMERGENCY_FALLBACK`; operatori ga mogu nadjačati sa stranice Feature Flags bez ponovnog pokretanja.

---

## Otklanjanje pogrešaka

- Weighted combo odgovara s `503 all_targets_cooling_down` (`Retry-After` postavljen, `diagnostics.excluded` navodi svaki cilj s `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool je konfiguriran i povezan, svaki je cilj samo isključen timerom otpornosti; upozorenje `[COMBO] Weighted selection: every target excluded before dispatch — …` navodi razloge i preostale sekunde. `404 no_executable_targets` iz istog combo-a znači da nije bio uključen nijedan timer otpornosti (nema ništa za izvršiti ili je svaki račun pao na provjeri dostupnosti). Implementirano u `open-sse/services/combo/pinRecovery.ts` na temelju isključenja prikupljenih u `targetResolution.ts`.
- Svi ključevi za jednog davatelja preskočeni → provjerite i stanje prekidača I `rateLimitedUntil`/`testStatus` svake pojedine veze.
- Davatelj trajno isključen nakon prozora resetiranja → kod čita sirovo `state` umjesto `getStatus()`/`canExecute()`.
- Jedan ključ ne uspijeva, ostali bi trebali raditi → dajte prednost hlađenju veze nad prekidačem.
- Samo jedan model ne uspijeva → dajte prednost blokadi modela nad hlađenjem veze.
- Stanje bi se trebalo samo oporaviti, ali se ne oporavlja → provjerite postoji li vremenska oznaka u budućnosti + putanja čitanja koja osvježava isteklo stanje. Trajni statusi zahtijevaju ručne izmjene.

---

## Stanje tijekom izvođenja — kratka referenca za agente

> Doslovno preneseno iz `AGENTS.md` → odjeljak "Resilience Runtime State" (PR #12743), kako bi
> vodič za agente ostao unutar proračuna konteksta od 40k. Riječ je o sažetom prikazu gornjih
> odjeljaka namijenjenom agentima; numerirani odjeljci ostaju potpuna referenca.

OmniRoute ima tri povezana, ali različita mehanizma za privremene kvarove. Držite njihov
opseg odvojenim pri otklanjanju pogrešaka u ponašanju usmjeravanja. Pogledajte
[dijagram otpornosti u 3 razine](../diagrams/exported/resilience-3layers.svg)
(izvor: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
za preglednu mapu.

### Prekidač davatelja

**Opseg**: cijeli davatelj, npr. `glm`, `openai`, `anthropic`.

**Svrha**: zaustaviti slanje prometa davatelju koji više puta zaredom ne uspijeva na
razini upstreama/usluge, kako jedan neispravan davatelj ne bi usporavao svaki zahtjev.

**Implementacija**:

- Temeljna klasa: `src/shared/utils/circuitBreaker.ts`
- Ožičenje ulazne provjere/izvođenja chata: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API statusa tijekom izvođenja: `src/app/api/monitoring/health/route.ts`
- Dijeljeni omotači: `open-sse/services/accountFallback.ts`
- Tablica trajno pohranjenog stanja: `domain_circuit_breakers`

**Stanja** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normalni promet je dopušten.
- `DEGRADED`: zona ranog upozorenja — kvarovi su prešli prag degradacije, ali još ne i
  prag prekidača; promet i dalje teče, nadzorne ploče prikazuju upozorenje. Valjana provjera
  veze ili razdoblje mirovanja bez novih kvarova vraća ga u `CLOSED`
  (prozor je opisan u `docs/architecture/RESILIENCE_GUIDE.md`).
- `OPEN`: davatelj je privremeno blokiran; pozivatelji dobivaju odgovor da je prekidač
  davatelja otvoren ili combo usmjeravanje preskače na drugi cilj.
- `HALF_OPEN`: isteklo je vrijeme čekanja na resetiranje; dopušta se probni zahtjev.
  Uspjeh zatvara prekidač, neuspjeh ga ponovno otvara.

**Zadane vrijednosti** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, koriste se putem
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` u `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` u `src/sse/handlers/chatHelpers.ts`). Prekidač cijelog
davatelja radi na temelju `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil    | degradira se pri | otvara se pri (`circuitBreakerThreshold`) | resetiranje (`circuitBreakerReset`) |
| --------- | ---------------: | ----------------------------------------: | ----------------------------------: |
| OAuth     |              `5` |                                       `8` |                               `60s` |
| API ključ |              `7` |                                      `12` |                               `30s` |
| Lokalni   |       (izvedeno) |                                       `2` |                               `15s` |

`PROVIDER_PROFILES` također definira `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) i `providerCooldownMs` (5/10/1 min): oni pokreću
**prozorsku provjeru opcionalnog globalnog hlađenja davatelja (Provider Cooldown)**
(`PROVIDER_COOLDOWN_ENABLED`, zadano isključeno) — unos na razini davatelja u
`open-sse/services/providerCooldownTracker.ts` računa se kao hlađenje tek nakon
`providerFailureThreshold` kvarova unutar `providerFailureWindowMs`, a zatim se hladi
`providerCooldownMs`. Oni NISU pragovi aktivnog prekidača — nemojte ih podešavati
očekujući ponašanje prekidača. Svaka se zadana vrijednost može nadjačati putem
env varijabli `OMNIROUTE_PROVIDER_BREAKER_*` i `OMNIROUTE_CIRCUIT_BREAKER_*`;
referentna tablica točna za vrijeme izvođenja nalazi se u `docs/architecture/RESILIENCE_GUIDE.md`.

Samo statusi kvara na razini davatelja smiju aktivirati prekidač davatelja:

```ts
(408, 500, 502, 503, 504);
```

Nemojte aktivirati prekidač cijelog davatelja za uobičajene pogreške računa/ključa/modela
poput većine slučajeva `401`, `403` ili `429`. One obično pripadaju hlađenju veze ili
blokadi modela. Generički `403` davatelja s API ključem trebao bi se moći oporaviti,
osim ako nije klasificiran kao konačna pogreška davatelja/računa.

Prekidač koristi lijeni oporavak, a ne pozadinski mjerač vremena. Kada `OPEN` istekne,
čitanja poput `getStatus()`, `canExecute()` i `getRetryAfterMs()` osvježavaju stanje u
`HALF_OPEN`, tako da nadzorne ploče i graditelji kandidata za kombinacije ne isključuju
zauvijek davatelja kojem je ograničenje isteklo.

### Hlađenje veze

**Opseg**: jedna veza/račun/ključ davatelja.

**Svrha**: privremeno preskočiti jedan neispravan ključ/račun, dok ostale veze za istog
davatelja mogu nastaviti posluživati zahtjeve.

**Implementacija**:

- Putanja za pisanje/ažuriranje: `src/sse/services/auth.ts::markAccountUnavailable()`
- Odabir/filtriranje računa: `src/sse/services/auth.ts::getProviderCredentials...`
- Izračun hlađenja: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Postavke: `src/lib/resilience/settings.ts`

Važna polja na vezama davatelja:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Tijekom odabira računa, veza se preskače dok vrijedi:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Hlađenja su također lijena: kada je `rateLimitedUntil` u prošlosti, veza ponovno postaje
prihvatljiva. Prilikom uspješne uporabe, `clearAccountError()` briše `testStatus`,
`rateLimitedUntil`, polja greške i `backoffLevel`.

Zadano ponašanje hlađenja veze:

- Osnovno hlađenje za OAuth: `5s`.
- Osnovno hlađenje za API ključ: `3s`.
- Kod API ključa, `429` bi trebao davati prednost naznakama za ponovni pokušaj od izvora
  (`Retry-After`, zaglavlja za resetiranje ili tekst o resetiranju koji se može parsirati)
  kada su dostupne.
- Ponovljene greške iz kojih se može oporaviti koriste eksponencijalni backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Zaštita od thundering herd efekta sprječava da istodobne greške na istoj vezi opetovano
produljuju hlađenje ili dvostruko inkrementiraju `backoffLevel`.

Terminalna stanja nisu hlađenja. `banned`, `expired` (koje postaje terminalno tek nakon N
ograničenih ponovnih pokušaja putem `EXPIRED_RETRY_MAX`) i `credits_exhausted` namijenjena
su da ostanu nedostupna dok se vjerodajnice/postavke ne promijene ili ih operator ne
resetira. Nemojte prepisivati terminalna stanja prolaznim stanjem hlađenja.

### Blokada modela

**Opseg**: davatelj + veza + model.

**Svrha**: izbjeći onemogućavanje cijele veze kada je samo jedan model nedostupan ili
ograničen kvotom za tu vezu.

Primjeri:

- Davatelji s kvotama po modelu koji vraćaju `429`.
- Lokalni davatelji koji vraćaju `404` za jedan nedostajući model.
- Greške dozvola specifične za davatelja vezane uz način rada/model, poput odabranih Grok
  načina rada.

Blokada modela nalazi se u `open-sse/services/accountFallback.ts` i omogućuje istoj vezi
da nastavi posluživati druge modele.

### Smjernice za otklanjanje pogrešaka

- Ako su svi ključevi za davatelja preskočeni, provjerite i stanje prekidača davatelja i
  `rateLimitedUntil`/`testStatus` svake veze.
- Ako se čini da je davatelj trajno isključen nakon prozora za resetiranje, provjerite
  čita li kod sirovo `state` umjesto korištenja `getStatus()`/`canExecute()`.
- Ako jedan ključ davatelja ne uspije, ali ostali bi trebali raditi, preferirajte hlađenje
  veze umjesto prekidača davatelja.
- Ako ne uspije samo jedan model, preferirajte blokadu modela umjesto hlađenja veze.
- Ako se stanje treba samo oporaviti, trebalo bi imati buduću vremensku oznaku/vrijeme
  isteka za resetiranje i putanju čitanja koja osvježava isteklo stanje. Trajni statusi
  zahtijevaju ručne promjene vjerodajnica ili konfiguracije.

---

## TLS fingerprinting i prikrivanje (stealth)

Prikrivanje specifično za pojedinog pružatelja (JA3/JA4, CCH, obfuskacija) dokumentirano je zasebno — vidi `docs/security/STEALTH_GUIDE.md` (git; nije kompilirano u `/docs`).

---

## Testiranje otpornosti (Faza 8 · Blok C)

Osim jediničnih testova za logiku otpornosti, tri testa izlažu runtime stvarnim
uvjetima stresa/kvara (svi su integracijski/noćni — nijedan ne blokira PR-ove):

| Test        | Što                                                                                                                                                                                                                 | Pokretanje                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | Lažni upstream čvor ubrizgava stvarnu latenciju/reset/timeout/503; potvrđuje da se prekidač kruga (circuit breaker) otvara i oporavlja te da `checkFallbackError` klasificira 503 kao fallback pogodan za oporavak. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Heap-growth | ~500 streamova po `createSSEStream` pod `--expose-gc`; pada ako heap naraste iznad gornje granice (OOM zaštita #3069).                                                                                              | `npm run test:heap`                    |
| k6 soak     | Kontinuirano opterećenje na `/api/monitoring/health`; pragovi za p95/pogreške.                                                                                                                                      | `k6 run tests/load/k6-soak.js` (noćno) |

Orkestrirano putem `.github/workflows/nightly-resilience.yml` (cron + ručno pokretanje). U
zadanom `test:integration`, chaos i heap testovi se sami preskaču (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Vidi također

- [Vodič kroz arhitekturu](./ARCHITECTURE.md) — Arhitektura sustava i unutrašnje komponente
- [Korisnički vodič](../guides/USER_GUIDE.md) — Pružatelji, kombinacije, CLI integracija
- [Auto-Combo mehanizam](../routing/AUTO-COMBO.md) — Bodovanje po 16 faktora, paketi načina rada
