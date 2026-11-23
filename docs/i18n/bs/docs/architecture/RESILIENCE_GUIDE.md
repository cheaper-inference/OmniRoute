# Resilience Guide (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ima tri različita, ali povezana mehanizma otpornosti. Svaki ima drugačiji opseg i svrhu. Držite ih odvojenim prilikom otklanjanja grešaka u ponašanju usmjeravanja.

![Model otpornosti u 3 sloja](../diagrams/exported/resilience-3layers.svg)

> Izvor: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Automatski osigurač pružaoca usluge

**Opseg:** cijeli pružalac usluge (npr. `glm`, `openai`, `anthropic`).

**Svrha:** prestati slati saobraćaj pružaocu usluge kod kojeg se uzastopno javljaju greške na nivou nadređene usluge ili servisa.

**Implementacija:**

- Osnovna klasa: `src/shared/utils/circuitBreaker.ts`
- Povezivanje: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API za status: `GET /api/monitoring/health`
- API za resetovanje: `POST /api/resilience/reset`
- Omotači: `open-sse/services/accountFallback.ts`
- Tabela baze podataka: `domain_circuit_breakers`

**Stanja:**

- `CLOSED` — normalan saobraćaj je dozvoljen
- `DEGRADED` — saobraćaj je i dalje dozvoljen, ali se prati povećan broj grešaka pružaoca usluge; vraća se u `CLOSED` nakon dovoljnog broja uspješnih zahtjeva, nakon uspješnog testa veze ili kada protekne najduže zadržavanje u stanju `OPEN` za posljednju vrstu greške (njena vrijednost `cooldownByKind`, ili `resetTimeout`, × `maxBackoffMultiplier`, uz najmanje jedno razdoblje hlađenja) bez nove greške
- `OPEN` — pružalac usluge je privremeno blokiran; kombinovano usmjeravanje ga preskače
- `HALF_OPEN` — vrijeme čekanja za resetovanje je isteklo; probni zahtjev je dozvoljen

**Podesive zadane vrijednosti (`open-sse/config/constants.ts`, dostupne na Kontrolna tabla → Postavke → Otpornost):**

| Klasa     | Degradira nakon | Otvara se nakon | Vrijeme čekanja za resetovanje |
| --------- | --------------- | --------------- | ------------------------------ |
| OAuth     | 5 grešaka       | 8 grešaka       | 60s                            |
| API ključ | 7 grešaka       | 12 grešaka      | 30s                            |
| Lokalni   | izvedeno        | 2 greške        | 15s                            |

`degradationThreshold` određuje kada pružalac usluge ulazi u stanje `DEGRADED`; `failureThreshold` određuje kada se otvara i preskače. Profili lokalnih pružalaca usluge još nisu dostupni na stranici postavki Otpornosti.

**Kodovi aktiviranja:** samo statusi na nivou pružaoca usluge `[408, 500, 502, 503, 504]`. NE aktivirati za greške na nivou računa (većina 401/403/429 — one pripadaju hlađenju ili zaključavanju).

**Lijeni oporavak:** kada stanje `OPEN` istekne, `getStatus()`, `canExecute()`, `getRetryAfterMs()` osvježavaju stanje u `HALF_OPEN`. Ista očitavanja (kao i sljedeća greška) vraćaju zastarjelo stanje `DEGRADED` u `CLOSED`. Pozadinski tajmer nije potreban.

---

### Opcionalno globalno hlađenje pružaoca usluge (kontrola vremenskog prozora)

Četvrti, **opcionalni** sloj (`PROVIDER_COOLDOWN_ENABLED`, zadano **isključen**) čuva
memoriju pružalaca usluge s greškama između različitih zahtjeva u
`open-sse/services/providerCooldownTracker.ts`, a koristi se pri razrješavanju kombinovanih ciljeva
kako uzastopni kombinovani zahtjevi ne bi iznova pokušavali koristiti pružaoca usluge kod kojeg se upravo
pojavila greška. Unosi na nivou pružaoca usluge poštuju kontrolu vremenskog prozora `PROVIDER_PROFILES`:

| Profil    | aktivira se nakon (`providerFailureThreshold`) | unutar (`providerFailureWindowMs`) | hladi se (`providerCooldownMs`) |
| --------- | ---------------------------------------------: | ---------------------------------: | ------------------------------: |
| OAuth     |                                           `10` |                            `15min` |                          `5min` |
| API ključ |                                           `15` |                            `30min` |                         `10min` |

Ispod praga se NE smatra da je pružalac usluge u stanju hlađenja; uspješan zahtjev briše
prozor. Unosi na nivou veze (`provider:connectionId`) umjesto toga zadržavaju
eksponencijalno odgađanje `minRetryCooldownMs → maxRetryCooldownMs`. Zamjene:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Zaštita od regresije: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Hlađenje konekcije

**Opseg:** pojedinačna konekcija/račun/ključ pružaoca usluge.

**Svrha:** preskočiti jedan neispravan ključ dok druge konekcije istog pružaoca nastavljaju posluživati zahtjeve.

**Implementacija:**

- Označavanje kao nedostupno: `src/sse/services/auth.ts::markAccountUnavailable()`
- Odabir: `getProviderCredentials*` u istoj datoteci
- Izračun hlađenja: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Postavke: `src/lib/resilience/settings.ts`

**Polja po konekciji:**

- `rateLimitedUntil` — vremenska oznaka do isteka hlađenja
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — brojač eksponencijalnog odgađanja

**Zadana trajanja hlađenja:**

- OAuth osnova: 5s
- API-key osnova: 3s
- API-key 429: prednost imaju uzvodno `Retry-After`/zaglavlja za resetiranje/tekst reseta koji se može parsirati
- Odgađanje: `baseCooldownMs * 2 ** failureIndex`

**Zaštita od stampeda zahtjeva:** sprečava da istovremeni neuspjesi prekomjerno produže hlađenje ili dvaput uvećaju `backoffLevel`.

**429 odgovori zbog ograničenja istovremenosti ne povećavaju nivo odgađanja.** `429` čije tijelo prijavljuje
ograničenje istovremenosti ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) znači da je račun ispravan, ali zauzet.
`checkFallbackError()` vraća razlog `concurrency_limited`: odmah prebacuje zahtjev na sljedeću
konekciju, hladi ovu konekciju tokom fiksnog perioda `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) ili prema
uzvodnoj preporuci za ponovni pokušaj, ostavlja `backoffLevel` nepromijenjenim i postavlja `skipProviderBreaker`.
Eksplicitno tijelo koje ukazuje na kvotu i dalje ima prednost, pa tijelo koje također odgovara obrascu kvote zadržava
odluku o kvoti. Detekcija: `looksLikeConcurrencyLimit()` u `src/shared/utils/classify429.ts`;
odluka: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind`
prekidača) ostaje nepromijenjen i za ova tijela i dalje vraća `rate_limit`.

**Zastoji sadržaja toka ne hlade račun.** Kada nadzornik zastoja sadržaja
(`open-sse/utils/streamHandler.ts`) odustane od toka koji nije na vrijeme poslao izlaz modela,
`markAccountUnavailable()` bilježi grešku na konekciji, ali ne postavlja
hlađenje: zastoj pripada tom zahtjevu, a najčešće je riječ o dugom ciklusu zaključivanja bez
izlaza. Operateri mogu ponovo uključiti ovu funkciju pomoću `resilienceSettings.streamStallCooldown.enabled`
(zadano `false`).

**Okviri zaključivanja ponovo pokreću vremenski budžet zastoja sadržaja.** Model za zaključivanje može razmišljati
minutama prije prvog vidljivog tokena: Claude emituje `thinking_delta` okvire čiji
tekst razmišljanja može biti prazan, a Responses API emituje jednu stavku zaključivanja za
drugom. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) prepoznaje
ove okvire, a nadzornik ponovo pokreće svoj budžet nakon svakog od njih umjesto da otkaže
ciklus. Oni još uvijek nisu izlaz modela, pa se ciklus koji završi samo zaključivanjem i dalje
prijavljuje kao prazan, dok ciklus koji prestane sa zaključivanjem i šalje samo signale aktivnosti i dalje
aktivira nadzornik.

Kirovi binarni `reasoningContentEvent` okviri s nepraznim potpisom čuvaju ovu
aktivnost zaključivanja kroz izvršitelj kao praznu `reasoning_content` deltu. Potpis se
ne prosljeđuje. Metapodaci, nepotpuni okviri i prazni potpisi ne pokreću ponovo
budžet sadržaja; nezavisno vremensko ograničenje aktivnog toka i otkazivanje od strane klijenta i dalje
se primjenjuju (`open-sse/executors/kiro/reasoning.ts`).

**Završna stanja (NISU hlađenja):**

- `banned` — postavlja se detekcijom zabranjene ključne riječi / zabrane računa (pogledajte [BAN_DETECTION](../security/BAN_DETECTION.md)) i nakon tri uzastopna uzvodna odbijanja pojedinačnih zahtjeva (`request_rejected`, npr. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); jedno odbijanje samo aktivira hlađenje konekcije
- `expired` (prelazi u završno stanje nakon ograničenog broja ponovnih pokušaja — `EXPIRED_RETRY_MAX = 3` s eksponencijalnim odgađanjem — tako da se prolazne OAuth greške mogu same otkloniti prije trajnog deaktiviranja računa)
- `credits_exhausted`

Ova stanja ostaju aktivna dok se vjerodajnice ne promijene ili ih operater ne resetira. Ne prepisujte završna stanja prolaznim stanjem hlađenja.

**Lijeni oporavak:** kada `rateLimitedUntil` prođe, konekcija ponovo postaje dostupna za odabir. Nakon uspješnog korištenja, `clearAccountError()` briše sva polja greške.

### Claude OAuth ograničenje potrošnje: traka nižeg prioriteta + resetiranje ograničenja sesije

**Opseg:** jedna konekcija Claude pretplate (OAuth). Obje funkcije se **uključuju zasebno po
konekciji** (Uredi konekciju → odjeljak Claude → `lowPriorityMode` / `autoLimitReset` u
`providerSpecificData`, obje su zadano isključene) i odražavaju Claude Code komande `/low-priority` i
`/limit-reset` (protokol razmjene zabilježen iz Claude Code 2.1.263).

**Implementacija:**

- Automat stanja + klasifikacija odgovora: `open-sse/services/claudeLowPriority.ts`
- Klijent za status/zahtjev resetiranja: `open-sse/services/claudeLimitReset.ts`
- Zakačka izvršitelja (ubacivanje zaglavlja + ponovni pokušaj s istim računom): `open-sse/executors/base.ts::execute()`
- Trajno čuvanje opcije uključivanja: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Okidač:** ograničenje potrošnje u periodu od 5 sati — `429` čija zaglavlja sadrže
`anthropic-ratelimit-unified-status: rejected` i, kada račun ispunjava uslove,
`anthropic-ratelimit-unified-slow-offer: treatment`. Ništa se ne šalje prije tog prvog
429 odgovora zbog ograničenja; nagli 429 bez objedinjenih zaglavlja prolazi kroz uobičajeni put hlađenja.

**Traka nižeg prioriteta** (`lowPriorityMode`):

- Na zidu 429 izvršitelj prihvata ponudu i odmah ponovo pokušava s **istim**
  računom uz `anthropic-usage-limit: slow`; traka ostaje aktivna do najavljenog
  `anthropic-ratelimit-unified-reset` (+60 s tolerancije), a svaki zahtjev u tom periodu sadrži
  zaglavlje. Presretnuti 429 nikada ne dolazi do `handleChatCore`, tako da se veza
  **ne** stavlja u period mirovanja niti se prebacuje na drugu.
- `anthropic-ratelimit-unified-slow-status` u kasnijim odgovorima: `active` / `not_needed`
  zadržavaju traku; `slot_busy` (429) ili `529` čekaju serverski
  `anthropic-ratelimit-unified-slow-retry-after` (zadano 20 s, ograničeno na 5–600 s, ±30% varijacije)
  i ponovo pokušavaju, uz ograničenje `anthropic-ratelimit-unified-slow-max-wait` (zadano 20 min, ograničeno
  na 1 min–6 h) — nakon toga traka završava, a 10-minutni period mirovanja blokira ponovno prihvatanje. Vrijeme
  čekanja dodatno je ograničeno preostalim vremenom vlastitog vremenskog ograničenja zahtjeva za pokretanje prema
  uzvodnom servisu (`resolveFetchStartTimeout`, zadano 10 min) umanjenim za rezervu od 5 s: bez tog ograničenja,
  zadano maksimalno čekanje od 20 minuta nadživjelo bi zahtjev, a spavanje bi bilo prekinuto
  usred čekanja, prikazujući `TimeoutError` umjesto urednog završetka `max_wait` + perioda mirovanja.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, prelazak 5-satnog prozora ili
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (što ga završava kao
  `extra_usage` pri bilo kojem statusu, jer plaćeno prekoračenje sada pokriva zid) završavaju traku;
  odgovor zatim ide u uobičajeni tok perioda mirovanja. `budget_exhausted` se pamti do
  najavljenog poništavanja budžeta (≤ 8 dana).
- Provjera zida izvršava se nakon vlastitih ponovnih pokušaja izvršitelja unutar pokušaja, pokrenutih statusom 400 (uređivanje
  konteksta, ograničenja razmišljanja/napora, automatsko učenje parametara), tako da se zidni 429 koji se pojavi tek pri
  jednom od tih ponovnih pokušaja i dalje presreće umjesto da dođe do toka perioda mirovanja.
- Stanje se čuva u memoriji po vezi (ponovno pokretanje košta jedan dodatni zidni 429 za ponovno prihvatanje).

**Poništavanje ograničenja sesije** (`autoLimitReset`, pokušava se prije trake kada su oba uključena):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok `juniper_tide`;
  kada su `arm: "reset"` i `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` sa
  `{ "program": "juniper_tide" }` (UUID organizacije iz
  `providerSpecificData.organizationUUID`, uz rezervnu vrijednost iz inicijalizacije).
- `result: reset|not_limited` → zahtjev se ponavlja punom brzinom (bez zaglavlja za usporavanje).
  `already_used` / `not_offered` pamte `next_available_at` (zadano jedna sedmica); svaki
  neuspjeh aktivira odgodu od 15 minuta. Poništavanje je moguće jednom sedmično i i dalje se računa u
  sedmično ograničenje.

Zaštite od regresije: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Afinitet sesije (#7274)

**Opseg:** jedna klijentska sesija (zaglavlje `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) vezana za jednu vezu, za **bilo kojeg** pružaoca usluga.

**Svrha:** zadržati višekružnog agenta (Claude Code, aider, prilagođeni agenti) na istom računu između zahtjeva, smanjujući gubitak konteksta između računa i ponovljene 429 odgovore pri hladnom pokretanju kod pružalaca usluga sa stanjem sesije po računu.

**Implementacija:**

- Određivanje TTL-a: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Odabir/kreiranje vezivanja: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Izdvajanje zaglavlja (generički, bilo koji pružalac usluga): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Trajno sačuvana tabela vezivanja: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Postavka: `sessionAffinityTtlMs` (globalni TTL u ms, `0` ga onemogućava) — `src/lib/db/settings.ts`. Preimenovano iz postavke samo za Codex `codexSessionAffinityTtlMs` migracijom `124_generic_session_affinity_ttl.sql`, koja prenosi svaki prethodno konfigurirani Codex TTL kao novu zadanu vrijednost.

Prije #7274, `resolveSessionAffinityTtlMs()` odmah je vraćao `0` za svakog pružaoca usluga osim `codex`, tako da postavka TTL-a (i zaglavlja sesije) nije imala efekta nigdje drugdje, iako su mehanizam vezivanja i izdvajanje zaglavlja već bili neovisni o pružaocu usluga. Ispravka je uklonila taj rani povratak; TTL se sada jednako primjenjuje na svakog pružaoca usluga kada se globalno postavi iznad `0`.

Tri zaglavlja afiniteta sesije nikada se ne prosljeđuju uzvodno — izvršitelji sastavljaju vlastita uzvodna zaglavlja od početka umjesto da prosljeđuju klijentska zaglavlja, tako da ona ostaju samo interni korelacijski ID.

### Ekskluzivni zakupi veza upravljanih sesija

**Opseg:** jedan aktivni upravljani HTTP klijent/sesija posjeduje jednu odgovarajuću OmniRoute vezu.

**Svrha:** osigurati trajno ekskluzivno vlasništvo nad vezom za klijente kojima je potrebna stroga granica usmjeravanja
između zahtjeva. To se razlikuje od afiniteta sesije, koji predstavlja blagu preferenciju kontinuiteta:
ekskluzivni zakup trajno čuva stanje životnog ciklusa u SQLite-u, nameće globalnu jedinstvenost aktivnog vlasnika i
aktivne veze te odbacuje zastarjelu generaciju prije prosljeđivanja pružaocu usluga.

Funkcija se uključuje zasebno za svaki API ključ. Upravljani ključ mora imati opseg `lease:exclusive` i
eksplicitnu nepraznu listu `allowedConnections`. Bilo koji HTTP klijent može koristiti krajnju tačku životnog ciklusa; nisu
potrebni naziv klijenta, korisnički agent, pružalac usluga, OAuth metoda niti model. Zakup obuhvata vezu,
a ne model, tako da promjena modela zadržava vezivanje dok veza ostaje uobičajeno
prihvatljiva. Uobičajena pravila za model, kvotu, stanje, period mirovanja i listu dozvoljenih stavki ostaju mjerodavna i mogu
prebaciti istu generaciju na drugu slobodnu odgovarajuću vezu.

Životni ciklus koristi `POST /api/v1/session-leases` s JSON akcijama `acquire`, `renew` i `release`.
Upravljani zahtjevi za inferenciju sadrže neprozirnu vrijednost `X-OmniRoute-Lease-Owner` i tačan
`X-OmniRoute-Lease-Generation`. Vlasnik koristi prefiks `vlo_` iza kojeg slijede 43 base64url znaka; pohranjuje se
samo njegov SHA-256 hash. Svaka završna ograda otpremanja također veže ID autentificiranog API ključa i
ID aktivne veze. Zaglavlja za upravljanje zakupom uklanjaju se iz zapisa, sačuvanih snimaka zahtjeva i
zaglavlja izvršitelja uzvodnog sistema.

Ako uobičajeno usmjeravanje ima odgovarajuće upravljane kandidate, ali je svaki slobodni kandidat zauzet
aktivnim zakupom drugog vlasnika, OmniRoute vraća HTTP `429`, kod lease-capacity-unavailable, stanje
čekanja na kapacitet i ograničeni `Retry-After` izveden iz najranijeg relevantnog isteka.
Uobičajena situacija bez odgovarajućih kandidata nije sukob zakupa i zadržava postojeću semantiku grešaka usmjeravanja.

Povezani mehanizmi ostaju odvojeni:

- Zauzetost OAuth sesije predstavlja lokalnu, blagu raspodjelu po procesu za OAuth račune.
- Semafori računa dodjeljuju dozvole za konkurentno izvršavanje zahtjeva i završavaju kada se zahtjev dovrši.
- Ekskluzivni upravljani zakupi sesija predstavljaju trajno vlasništvo nad životnim ciklusom s generacijskom ogradom.

---

## 3. Blokada modela

**Opseg:** kombinacija pružaoca + veze + modela.

**Opseg ključa prema statusu:** status greške određuje u koji ključ će se blokada
upisati (`resolveLockoutScope()` u `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — signal o kvoti ili ovlaštenju — blokira **porodicu kvote**:
  za codex cijeli opseg `codex` / `spark` (svaki model `gpt-5*` te
  veze), a za druge pružaoce `getQuotaScopedModelForProvider()`.
- `404` blokira samo model (`getModelLockKey()` sužava `not_found`).
- Bilo koji drugi status — greške prijenosa/servera `5xx` i OmniRouteov vlastiti
  sintetizirani `502` iz provjere kvaliteta — blokira samo **tačnu**
  kombinaciju pružaoca/veze/modela. Neispravan tok na jednom modelu nije dokaz
  o kvoti računa; prije ovog pravila jedan prazan odgovor na
  `codex/gpt-5.6-luna` uklanjao je svaki model `gpt-5*` te veze iz
  usmjeravanja na 2–30 min (uz eskalaciju), iako njegova kvota nije bila potrošena.
- Eksplicitna opcija `scope` pozivaoca uvijek ima prednost (Antigravity prosljeđuje `"exact"`).

**Svrha:** izbjeći onemogućavanje cijele veze kada je samo jedan model nedostupan ili ograničen kvotom.

**Primjeri:**

- Pružaoci s kvotom po modelu koji vraćaju 429
- Lokalni pružaoci koji vraćaju 404 za jedan model koji nedostaje
- Greške dozvola specifične za način rada/model pružaoca (npr. Grok načini rada)

**Implementacija:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Kontrolna ploča perioda čekanja modela (v3.8.0)

Korisničko sučelje: Postavke → Periodi čekanja modela (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Prikazuje aktivne blokade sa sljedećim podacima: pružalac, veza, model, razlog, expiresAt. Operateri mogu ručno ponovo omogućiti model putem kartice.

**REST API:**

- `GET /api/resilience/model-cooldowns` — prikaz aktivnih blokada
- `DELETE /api/resilience/model-cooldowns` — ručno ponovno omogućavanje. Tijelo: `{provider, connection, model}`. Autorizacija: upravljanje.

### Upravitelj perioda čekanja

Korisničko sučelje: Nadzor → Upravitelj perioda čekanja (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Jedna stranica za svaku vezu koja je isključena iz usmjeravanja zbog privremenog razloga, umjesto
otvaranja stranice svakog pružaoca. Prikazuje periode čekanja veza, blokade modela i terminalna
stanja; uklanja ih po vezi, za odabrane stavke ili za sve veze nekog pružaoca,
te uređuje najčešće prilagođavana pravila perioda čekanja: `streamStallCooldown.enabled` i osnovni
period čekanja `connectionCooldown` za OAuth / API ključ, kao i maksimalan broj koraka eksponencijalnog
odgađanja (sprema se putem `PATCH /api/resilience`). Terminalna stanja (`banned`, `expired`, `credits_exhausted`)
prikazuju se, ali se ovdje nikada ne uklanjaju.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autorizacija: upravljanje):

- `GET /api/resilience/cooldowns[?provider=]` — veze sa statusom, preostalim periodom čekanja,
  nivoom odgađanja, vrstom posljednje greške i blokadama modela (bez pristupnih podataka)
- `POST /api/resilience/cooldowns` — tijelo `{connectionIds: string[]}` ili
  `{all: true, provider?}`; vraća `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Korisničko sučelje za postavke blokade + oporavak smanjenjem nakon uspjeha (v3.8.23)

Blokada modela prešla je iz uvijek uključenog, čvrsto kodiranog ponašanja u potpuno podesivu
opcijsku funkciju s vlastitom karticom postavki i samoispravljajućim putem oporavka.

**Kartica postavki:** Postavke → Blokada modela
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ovo se **razlikuje** od gornje kartice `ModelCooldownsCard` koja je samo za čitanje (i samo
_prikazuje_ aktivne blokade) — nova kartica _podešava parametre_. Zadane vrijednosti
nalaze se u `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Postavka                | Zadana vrijednost                | Značenje                                                                    |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Glavni prekidač — blokada modela je **zadano isključena**.                  |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statusi uzvodnog sistema koji se računaju kao greška ograničena na model.   |
| `baseCooldownMs`        | `120_000` (120 s)                | Početno trajanje blokade za prvu grešku.                                    |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Gornja granica eskaliranog perioda čekanja.                                 |
| `maxBackoffSteps`       | `10`                             | Maksimalan broj koraka eskalacije eksponencijalnog odgađanja.               |
| `useExponentialBackoff` | `true`                           | Određuje da li ponovljene greške eksponencijalno povećavaju period čekanja. |

Postavke se čuvaju putem uobičajenog spremišta postavki i provjeravaju pomoću
šeme postavki otpornosti; kartica ograničava `baseCooldownMs`/`maxCooldownMs`
(uz `maxCooldownMs ≥ baseCooldownMs`) i `maxBackoffSteps`.

**Oporavak smanjenjem nakon uspjeha:** oporavak se **ne** zasniva isključivo na isteku tajmera. Ispravan
odgovor postepeno smanjuje broj grešaka modela, tako da model koji se oporavio
tokom intervala prestaje eskalirati (i njegova blokada se uklanja) prije nego što bi tajmer istekao. Nakon uspješnog
kombinovanog odredišta, `open-sse/services/combo.ts` poziva `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), koji **prepolovljava** pohranjeni
`failureCount` (`Math.floor(failureCount / 2)`); kada dostigne `0`, zapis blokade
se u potpunosti briše. Odgovarajuća funkcija `recordModelLockoutFailure()`
povećava broj (i eskalira period čekanja) pri greškama unutar
intervala eskalacije. Ovo smanjenje nakon uspjeha primjenjuje se pored običnog isteka tajmera —
bilo koji od ta dva mehanizma može ponovo omogućiti model.

**Stanje:** blokade se čuvaju **u memoriji** (`Map` objekti po procesu za
`ModelLockoutEntry`, s ključem `provider:connectionId:model`, a blokade tačnog opsega s
ključem `provider:connectionId:exact:model`) i ne pohranjuju se u
bazu podataka — gube se pri ponovnom pokretanju. _Postavke_ se trajno čuvaju; aktivno
_stanje_ blokade je privremeno.

---

## 4. Kontrola konkurentnosti dijeljenja kvote (v3.8.36)

Pretplatnički računi (GLM, MiniMax itd.) često prihvataju samo ~1–3 istovremena
zahtjeva; prekoračenje toga aktivira odgovore 429 i periode čekanja. Ovo je naročito izraženo kod
**quota-share** (`qtSd/…`) kombinacija, gdje nekoliko API ključeva dijeli jedan nadređeni
račun. Tri sloja sprečavaju preopterećenje dijeljenog računa.

### Ograničenje konkurentnosti po konekciji (`max_concurrent`)

Svaka konekcija pružaoca može deklarisati gornju granicu `max_concurrent`
(`provider_connections.max_concurrent`, postavlja se u modalu konekcije / API-ju / bazi podataka).
Ostavite prazno ako ne želite ograničenje. Ovo je jedina postavka koja upravlja slojem
serijalizacije u nastavku — postavite je na stvarnu konkurentnost računa (npr. GLM ~1, MiniMax ~2).

### Ograničenja konkurentnosti po modelu (`modelConcurrency`)

Konekcija može dodatno deklarisati tačne gornje granice konkurentnosti po modelu
unutar svoje mape `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Postavite ih u modalu konekcije (**Rate limit overrides → Per-model
concurrency caps**, jedan `model=cap` po redu) ili putem
`PATCH /api/providers/[id]` s istom JSON strukturom. Semantika ključeva:

- **Za cijelu konekciju naspram specifičnog modela:** `maxConcurrent` ostaje zajednička
  gornja granica za cijelu konekciju. Kada se primjenjuju obje granice, obje se blokade pribavljaju
  atomski unutar iste složene blokade
  (`global → provider → account → model`); efektivno ponašanje određuje
  strožije primjenjivo ograničenje.
- **Tačno podudaranje ključa modela:** ključ je niz modela proslijeđen
  izvršiocu nakon razrješavanja usmjeravanja — obično osnovni ID nadređenog modela
  (`glm-5`), a ne klijentski pseudonim `provider/model` (`zai/glm-5` se ne
  podudara s `glm-5`). Vrijednosti su pozitivni cijeli brojevi koji predstavljaju gornje granice istovremenih zahtjeva.
- **Lokalno stavljanje u red čekanja, bez otkrivanja:** višak zahtjeva stavlja se u lokalni red čekanja prema
  postojećoj semantici reda/isteka vremena (tipizirane greške prijema `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute ne otkriva niti
  zaključuje pravila nadređenog sistema — primjenjuje tačne granice koje je operater
  konfigurisao. Zasićena blokada modela nikada ne onemogućava pružaoca niti
  stvara trajnu blokadu modela; ponašanje odgovora 429/perioda čekanja/prebacivanja
  nadređenog sistema ostaje krajnji mehanizam zaštite od grešaka.
- **Opseg po konekciji i procesu:** ograničenja se primjenjuju po konekciji baze podataka
  i čuvaju se u memoriji, pa se dvije konekcije koje ponovo koriste isti nadređeni API ključ
  međusobno ne koordiniraju.
- **Nekonfigurisano znači nepromijenjeno:** izostavljanje mape (ili ostavljanje
  polja kontrolne table praznim) ne dodaje blokadu modela. Primjer konfiguracije bez
  utvrđivanja bilo kakvog univerzalnog ograničenja pružaoca:

```text
glm-5=1
glm-4.7=3
```

### Serijalizacija zahtjeva za dijeljenje kvote

Kada se zahtjev s dijeljenjem kvote usmjeri na konekciju koja deklarira pozitivan
`max_concurrent`, istovremeni zahtjevi prema tom **računu** serijalizuju se putem
semafora po konekciji (ključ `qsconn:<connectionId>`): višak zahtjeva **čeka u
redu** umjesto da preoptereti račun. Radi po principu **fail-open** — zasićen
red ili istek vremena nastavlja obradu bez slota umjesto da ikada odbije zahtjev
koji se može proslijediti. Uključite ili isključite u **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, zadano
uključeno). Bez ograničenja `max_concurrent` ponašanje ostaje nepromijenjeno.

> Blokada usmjeravanja dijeljenja kvote (`selectQuotaShareTarget`, DRR + P2C) i sama radi po principu
> fail-open i samo daje _niži prioritet_ konekciji koja je dostigla ograničenje — uz
> skup od jedne konekcije ne može nametnuti strogo ograničenje, pa upravo ovaj semafor
> stvarno obuzdava preopterećenje.

### Ponovni pokušaj kombinacije uz uvažavanje perioda čekanja

Za svaku strategiju kombinovanja (kada je omogućena), zahtjev koji bi rezultirao konačnim odgovorom 429
zbog KRATKOG prolaznog perioda čekanja sačekat će njegov istek i ponovo se proslijediti umjesto
vraćanja odgovora 429 — ovo pokriva TPM/RPM prozore klase Gemini (~60 s prema `retry-after`)
kod kombinacija više modela, npr. kada oba cilja kombinacije od 2 modela dostignu ograničenje
brzine po modelu. Ograničeno je postavkom `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) u **Settings → Resilience**. Nikada ne čeka za `quota_exhausted`
(zaključano do ponoći) niti za razloge autentifikacije/nepostojećeg resursa.

Ista blokada pokriva slučaj prije prosljeđivanja (#16319): kada se svaki cilj
kombinacije preskoči prije bilo kakvog pokušaja zato što je njegov model pod kratkom
prolaznom blokadom, putanja bez pokušaja čeka istek blokade unutar istih
granica i ponovo prosljeđuje zahtjev, umjesto odgovora bez naznake
`503 ALL_TARGETS_SKIPPED`. Kada čekanje nije dozvoljeno (iscrpljena granica, broj pokušaja ili budžet,
ili je funkcionalnost isključena), konačni odgovor se nadograđuje na
`429 rate_limit_error` i prenosi `retry_after` / `reset_at` iz najranijeg
isteka prolazne blokade; blokade zbog kvote, autentifikacije i nepostojećeg resursa zadržavaju odgovor 503 bez naznake.

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

## 5. Kontrola prijema u red zahtjeva (v3.8.49 · problem #6593)

**Opseg**: lokalni red ograničenja brzine po pružaocu+vezi (`open-sse/services/rateLimitManager.ts`,
zasnovan na Bottlenecku), jedan sloj ispod prethodno navedena tri mehanizma.

**`maxWaitMs` ograničava čekanje u redu; `executionMaxWaitMs` ograničava izvršavanje.**
To dvoje je namjerno odvojeno i nijedno ne utiče na drugo.

`resilienceSettings.requestQueue.maxWaitMs` je **budžet čekanja u redu**: obuhvata
čekanje na mjesto kod pružaoca, a zatim boravak u stanju QUEUED, dok se njegov
tajmer poništava čim zadatak napusti stanje QUEUED i započne izvršavanje
(`rateLimitManager.ts`, `wrappedFn`). Zahtjev koji ga prekorači nikada ne stiže
do upstream servisa. Zadana vrijednost je 30000ms, koju pruža
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` u `src/lib/resilience/settings.ts` i koja je
fiksirana testom `tests/unit/ratelimit-admission-control-6593.test.ts`, tako da
će promjena te vrijednosti uzrokovati pad testa umjesto da ovaj odlomak
neprimjetno zastari.

`resilienceSettings.requestQueue.executionMaxWaitMs` je vrijednost koju
Bottleneck prima kao `expiration` zadatka, čiji se tajmer pokreće tek nakon
otpremanja. Služi kao krajnja zaštita za izvršioce koji nemaju vlastito
upstream vremensko ograničenje i povećava se na izvršiočevo vlastito vremensko
ograničenje od početka fetch poziva kada je ono duže, tako da ne može prekinuti
ispravan odgovor koji je u toku. Zadana vrijednost je 600000ms (10 min).

Prosljeđivanje budžeta reda u `expiration` ranije je prekidalo neinkrementalne
gatewaye usred obrade — oni opravdano rade nekoliko minuta prije prvih bajtova
— i zato se istek vremena izvršavanja prikazuje kao `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), dok budžet reda koristi kôd isteka
vremena čekanja u redu. Bilo koju vrijednost nadjačajte putem
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (varijable
okruženja) ili kontrolne ploče (**Postavke → Otpornost**). Obje se tokom
normalizacije ograničavaju na 1ms–24h.

**Prioritet za obje vrijednosti:** varijabla okruženja samo daje _zadanu
vrijednost_. Vrijednost sačuvana u `resilienceSettings.requestQueue` (kontrolna
ploča / API zakrpa, pohranjena u `key_value`) ima prednost nad njom, a
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` za pojedinačnu vezu ima
prednost nad tim. Postavljanje varijable okruženja na implementaciji koja već
ima sačuvanu vrijednost stoga ne mijenja ništa — umjesto toga obrišite ili
ažurirajte sačuvanu postavku.

Boravak u redu ograničen je vrijednošću `maxWaitMs`; `maxQueueDepth` u nastavku
ograničava koliko pozivalaca može istovremeno biti u redu.

**Ponovni pokušaji navedeni u tijelu: tempo naspram blokade.** Tijelo odgovora
429 može navesti vlastito vrijeme čekanja (Gemini `RetryInfo.retryDelay`, tekst
"retry after Ns"), koje čita `updateFromResponseBody`. Čekanje koje se uklapa u
`maxWaitMs` veze predstavlja određivanje tempa: limiter prazni svoj reservoir
tokom tog perioda, a pozivi na čekanju otpremaju se kada se on ponovo napuni.
Čekanje duže od `maxWaitMs` nije nešto što red može jednostavno sačekati —
Gemini na iscrpljenu dnevnu kvotu odgovara sa `retryDelay: "86399s"`.
Proslijeđeni `Retry-After` u ponovo sastavljenom odgovoru 429 (#16528) već
navodi rezervni mehanizam da zaključa model tokom tog perioda, ali pauziranje
limitera na toliko vremena i dalje bi za cijeli `maxWaitMs` zadržalo svaki
poziv koji prerano stigne do ključa (naprimjer, nakon resetovanja otpornosti).
Kada takvo čekanje dolazi iz tipiziranog Google detalja `RetryInfo`
(porijeklo `google_rpc_retry_info`) i limiter ključa već je ograničen na model
(pogledajte `getLimiterKey`), odgovor 429 umjesto toga postaje blokada modela
na toj vezi (`lockModelForLongBodyRetry` u
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, ograničena na 24h), a
limiter ostaje bez pauze. Odabir računa preskače tu blokadu putem
`isModelLocked()`, kao i kombinovani kontrolni mehanizam prije otpremanja za
odredišta prikvačena za vezu. Na antigravityju, čiji limiter važi po porodici
kvota, blokada se primjenjuje na tačan model, kao i druge blokade kvota. Ime
koje je klijent zatražio također se zaključava kada ga je pseudonim razriješio
na taj model, jer te provjere koriste zatraženo ime; zaključava se tačno
(`lockExactModel`), pa se pseudonim koji prelazi u drugu antigravity porodicu
kvota ili codex opseg nikada sam ne zaključava. Tekstualni nagovještaj,
netipizirani `retryDelay` ili limiter koji dijeli cijela veza zadržava pauzu.
Kada se limiter koji je putanja odgovora 429 upravo ponovo sastavila zaista
pauzira, pozivalac čije preostalo vrijeme u redu ističe prije završetka pauze
odmah se odbija uz kôd isteka vremena čekanja u redu (`checkLimiterPause`),
umjesto da čeka da to vrijeme istekne; zabilježeni završetak usidren je prije
izgradnje limitera, gdje Bottleneck pokreće svoj sat osvježavanja, a svaka
kasnija promjena reservoir vrijednosti ga zaboravlja. Pokriveno testovima
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` i
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — opciono ograničenje prijema (novo).** `resilienceSettings.requestQueue.maxQueueDepth`
ograničava koliko zahtjeva može istovremeno čekati u redu (još nisu otpremljeni)
za jednu kombinaciju pružaoca+veze. Kada red već sadrži `maxQueueDepth`
zahtjeva, novi zahtjev se odmah odbija tipiziranom greškom
`code: "RATE_LIMIT_QUEUE_FULL"` **prije** nego što uopće stigne do `limiter.schedule()`
— stoga je odbijanje jeftino i događa se prije bilo kakvog naknadnog rada na
kompresiji / prevođenju upita za taj zahtjev. Zadana vrijednost `0` =
onemogućeno, čime se zadržava postojeće ponašanje neograničenog reda;
ograničeno na 0–100000. Nadjačajte putem `RATE_LIMIT_MAX_QUEUE_DEPTH`
(varijabla okruženja) ili `resilienceSettings.requestQueue.maxQueueDepth`
(kontrolna ploča/API zakrpa).

Sama provjera prijema je čista funkcija
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), pa se
može jedinično testirati bez stvarnog Bottleneck limitera.

> RFC koji je otvorio #6593 također je predložio zastavicu `bypassCompressionOnRateLimit`.
> Cjevovod `open-sse/services/compression/` u ovom repozitoriju služi za
> kompresiju prompta/konteksta u odlaznom LLM zahtjevu (`chatCore.ts`,
> oko bloka `resolveCompressionSettings`/`selectCompressionStrategy`),
> a ne za kompresiju HTTP odgovora za generisana 429 tijela — ne postoji
> odgovarajuća putanja koda za doslovnu zastavicu za zaobilaženje. Taj korak
> kompresije prompta također se trenutno izvršava _prije_ `withRateLimit()` u
> cjevovodu zahtjeva, pa je promjena redoslijeda radi njegovog preskakanja pri
> odbijanju zbog punog reda zasebna i veća promjena izvan opsega ovog problema;
> ovdje namjerno **nije** implementirana i ostavljena je za naknadni rad ako je
> ušteda CPU resursa vrijedna rizika promjene redoslijeda.

### Sigurnosna mreža za automatsko omogućavanje ograničenja brzine i zaštita veze (`rateLimitProtection`)

**Sigurnosna mreža za automatsko omogućavanje** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, zadana vrijednost `true`):
OmniRoute po zadanim postavkama automatski omogućava zaštitu redom čekanja za ograničenje brzine za sve aktivne veze pružalaca s API ključem (`getProviderCategory(provider) === "apikey"`). Time se osigurava da se dolazni zahtjevi prema nadređenim API ključevima osjetljivim na brzinu stavljaju u red i ograničavaju putem Bottlenecka, umjesto da u naletima uzrokuju nadređene 429 greške. Sigurnosna mreža može se nadjačati putem varijable okruženja `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` onemogućava, `true`/`1`/`on` prisilno omogućava), koja ima prednost nad sačuvanom postavkom kontrolne ploče (**Postavke → Otpornost** / `PATCH /api/resilience`).

**Semantika `rateLimitProtection` za pojedinačne veze:**
Zaštita ograničenja brzine za pojedinačne veze prati se putem logičkog polja `rateLimitProtection` na vezama pružalaca (sačuvanog kao `rate_limit_protection` u SQLiteu):

- **Izričito uključeno (`rateLimitProtection === true`)**: Zaštita ograničenja brzine izričito je omogućena za ovu vezu, bez obzira na kategoriju pružaoca ili na to je li sigurnosna mreža za automatsko omogućavanje uključena.
- **Izričito isključeno (`rateLimitProtection === false`)**: Onemogućava izričitu zaštitu, ali **ne** izuzima aktivnu vezu s API ključem iz globalne sigurnosne mreže za automatsko omogućavanje. U `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` i `undefined` su ekvivalentni: samo se `rateLimitProtection === true` tretira kao izričito nadjačavanje. Ako je `rateLimitProtection` postavljen na `false` (ili nije postavljen), aktivna veza s API ključem i dalje ispunjava uslov za automatsko omogućavanje i ostaje zaštićena ograničenjem brzine.
- **Nema izuzeća za pojedinačnu vezu**: Operator trenutno ne može izraziti „ova pojedinačna aktivna veza s API ključem mora raditi bez zaštite redom čekanja za ograničenje brzine“, a da automatsko omogućavanje ostane aktivno za ostale. Da bi veze s API ključem u potpunosti radile bez redova čekanja za ograničenje brzine, sigurnosna mreža mora se globalno isključiti (`RATE_LIMIT_AUTO_ENABLE=false` ili `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Podržane putanje za zapisivanje:**

- **`POST /api/rate-limits`**: Podržana upravljačka putanja za zapisivanje kojom se uključuje ili isključuje `rateLimitProtection` za vezu (`{ connectionId: string, enabled: boolean }`). Pozivanje ove putanje s `enabled: true` uključuje izričitu zaštitu; pozivanje s `enabled: false` uklanja izričitu zaštitu (iako aktivne veze s API ključem ostaju obuhvaćene globalnom sigurnosnom mrežom ako je automatsko omogućavanje uključeno).
- **`PUT /api/providers/[id]`**: Namjerno **ne** prihvata niti mijenja `rateLimitProtection` (#11278). Ažuriranje metapodataka veze pružaoca putem `PUT /api/providers/[id]` nikada neće promijeniti sačuvano stanje zaštite ograničenja brzine.

---

## 6. Nadzorni mehanizam propusnosti sporog toka (#9709)

Opcionalna zaštita `resilienceSettings.streamRecovery.throughputWatchdog` otkriva
uzvodni sistem koji još uvijek šalje dijelove podataka, ali proizvodi izlaz asistenta
ispod konfigurirane stope korisnog izlaza. Namjerno se razlikuje od isteka vremena
neaktivnosti: signali prisutnosti i metapodaci ne poništavaju nijedan mjerač vremena
i ne računaju se kao napredak. Također se razlikuje od krajnjeg roka pokušaja
(#9153), koji ostaje apsolutna sigurnosna granica bez obzira na kvalitet izlaza.

Nadzorni mehanizam zahtijeva period zagrijavanja, nakon kojeg mora proteći cijeli
klizni vremenski prozor prije nego što može prekinuti pokušaj. Broji tekstualne
razlike iz izlaznih događaja API-ja Chat Completions i Responses (konzervativna
aproksimacija broja UTF-8 bajtova), zanemaruje prazne događaje i događaje koji sadrže
samo podatke o korištenju te obustavlja procjenu dok su u toku događaji poziva alata
ili zaključivanja. Prema zadanim postavkama je onemogućen, a može se omogućiti pomoću
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; prozor, period zagrijavanja, minimalna
stopa i minimalni mjerljivi izlaz ograničeni su standardnim slojem za normalizaciju
postavki otpornosti.

Kada je omogućen, prekid koji pokrene nadzorni mehanizam primjenjuje se samo na
aktivni pokušaj prema uzvodnom sistemu. Prije nego što se klijentu pošalje ijedan
bajt, postojeći put ranog oporavka na istom računu može ponovo pokrenuti pokušaj.
Nakon potvrde, tok se nikada ne reproducira naslijepo; samo postojeći ugovor o
sigurnom nastavku toka može spojiti sufiks. Finalizacija se i dalje izvršava samo
jednom, tako da se obračun korištenja i oslobađanje semafora ne dupliciraju.

---

## 7. Preformuliranje statusa uzvodnog sistema (pogrešno navedene greške kvote)

**Opseg:** jedan uzvodni pristupnik koji prijavljuje privremenu iscrpljenost kvote pogrešnim HTTP statusom.

**Svrha:** ispraviti obmanjujući status PRIJE klasifikacije, tako da potrošači niže u lancu (mehanizam rezervnog odabira, agregacija kombinacija i odgovor namijenjen klijentu) vide stvarnu prirodu greške koja dopušta ponovni pokušaj.

Neki pristupnici signaliziraju PRIVREMENU iscrpljenost kvote HTTP statusom koji
ne dopušta ponovni pokušaj. `agentrouter.org` vraća `403` (ponekad `400`) s
kineskim sadržajem (`用户额度不足` / `额度不足`) umjesto standardnog statusa `429`.
Klijenti poput Claude Code tretiraju `403` kao trajnu grešku i prekidaju sesiju,
a bez ispravke bi je mehanizam rezervnog odabira klasificirao kao `AUTH_ERROR`
umjesto kao događaj vezan za kvotu.

**Implementacija:**

- Registar + uparivač: `open-sse/config/upstreamStatusRestatement.ts` — lista
  pravila za svakog pružaoca (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), koja se uparuju putem `applyStatusRestatement()`.
- Mjesto poziva: blok `providerFailure:` u `open-sse/handlers/chatCore.ts`
  (oko linije 3654), odmah nakon što `parseUpstreamError()` raščlani odgovor
  uzvodnog sistema s HTTP statusom greške (`!providerResponse.ok`) i prije
  izvršavanja bilo kakve klasifikacije, tako da svaki potrošač niže u lancu
  vidi ispravljeni status. Greške ugrađene unutar `200` SSE toka prate zaseban,
  kasniji put raščlanjivanja toka i ovaj ih mehanizam trenutno **ne** obuhvata —
  to je poznato ograničenje koje još nije relevantno za pogrešan status
  agentroutera (koji se pojavljuje kao HTTP status greške).
- Prihvatljivost za ponovni pokušaj: `429` se nalazi u
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), pa preformulirana greška
  nosi stvarni period za ponovni pokušaj umjesto da se prikaže kao neupotrebljivi
  `403`.
- Sintetički `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  predstavlja samo ono što preformulirani odgovor saopćava **klijentu**; to nije
  interno trajanje hlađenja/blokade veze — njime zasebno upravlja mehanizam koji
  zapravo obrađuje preformuliranu grešku (eskalirajuće odgađanje Hlađenja veze,
  §2, s osnovnim trajanjem od `3s` za pružaoce koji koriste API ključeve; ili
  Blokada modela, §3, za pružaoce s kvotom po modelu, kao što je agentrouter).
  Usmjerivač može interno postati prihvatljiv za ponovni pokušaj prije isteka
  perioda od 60s koji oglašava klijentu — to je namjerna rezerva, a ne greška.

Trajne greške (`无权访问模型` agentroutera — nema pristupa ovom modelu) NIKADA se
ne preformuliraju: `excludeMarkers` poništava pravilo čak i kada se
`textMarkers` podudaraju, pa greška zadržava svoj izvorni status i ništa je ne
pokušava ponavljati unedogled. Odgovarajuće pravilo klasifikacije pružaoca
(`agentrouter-model-access-denied` u `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, deklarirano osnovno hlađenje od `6h`)
provjerava funkcija `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_prije_ generičkog ranog povrata `FORBIDDEN` za kategoriju apikey, uz uvjet
`honorsRuleLockScope(provider)` (#10334 — trenutno isključivo za agentrouter
putem liste dozvoljenih vrijednosti `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u
`providerErrorRules.ts`). Deklarirano hlađenje pravila od 6h prosljeđuje se kao
`fallbackResult.baseCooldownMs`, ali i dalje ulazi u već postojeći put blokade
kvote po modelu (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, koji #10334 nije promijenio osim izvora trajanja
hlađenja): ograničava se na operatorovu vrijednost `mlSettings.maxCooldownMs`
(zadano `1_800_000ms` / 30min), kao i svaka druga blokada modela, a
_razlog pohranjene blokade_ ostaje već postojeća hardkodirana vrijednost
`"forbidden"`, a ne vrijednost pravila `"auth_error"` — od početka do kraja
poštuje se samo trajanje hlađenja, a ne tekst razloga. Sama veza ostaje aktivna;
ostali modeli na istoj vezi ostaju nepromijenjeni.

Preformulisane greške kvote (`额度不足`) u produkciji dosežu pravilo pružaoca
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, bez vlastitog deklarisanog perioda hlađenja — primjenjuje se
zadana vrijednost skaliranog odlaganja sloja perzistencije). Od #10334, `scope`
na `ProviderErrorRuleMatch` koristi se kroz cijeli tok, ali **samo** za pružaoce
na dozvoljenoj listi `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — trenutno samo `"agentrouter"`, ograničeno putem
`honorsRuleLockScope()`). Za svakog drugog pružaoca `scope` ostaje informativan,
upravo kao prije #10334. `checkFallbackError` izlaže opseg podudarnog pravila
kao `fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) je zajednička zaštitna provjera koja potvrđuje da
je `ruleScope` zaista sigurno poštovati kao signal na nivou cijele konekcije
koji se samostalno oporavlja (opseg `"connection"`, razlog `quota_exhausted`,
nikada `permanent`, nikada `creditsExhausted` — zaštita od budućeg pravila koje
bi uparilo opseg `"connection"` s trajnim stanjem računa). Pozivaju je dva
potrošača:

- **Perzistencija** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  umjesto ulaska u granu pružaoca s prosljeđivanjem za zaključavanje
  **po modelu** (agentrouter ima `passthroughModels: true` →
  `hasPerModelQuota()` vraća `true`), primjenjuje **privremeni period hlađenja
  konekcije** — `testStatus: "unavailable"` + `rateLimitedUntil`, nikada
  terminalni status (`credits_exhausted`/`banned`/`expired`) — tako da se
  konekcija samostalno oporavi nakon isteka perioda hlađenja, umjesto da
  zahtijeva ručno resetovanje vjerodajnica. Preskače se za konekcije s
  `disableCooling: true` (#2997): ta opcija isključivanja umjesto toga
  nastavlja do zaključavanja po modelu (dokumentovan kompromis — pogledajte
  komentar u kodu iznad grane).
- **Kombinovano usmjeravanje unutar istog zahtjeva**
  (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ista zaštitna provjera
  označava konekciju u skupu `exhaustedConnections` u memoriji, s ključem
  `${provider}:${connectionId}`. Ovo preskače samo preostalo odredište
  ISTOG ZAHTJEVA koje _već samo sadrži upravo taj `connectionId`_ u vlastitom
  objektu odredišta (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` prije pretrage u `exhaustedConnections`) — obična kombinacija
  liste modela, u kojoj srodna odredišta nemaju vlastiti fiksirani
  `connectionId`, a jedan se razrješava samo po otpremanju iz zaglavlja
  `X-OmniRoute-Selected-Connection-Id` odgovora, nikada ne postiže podudaranje
  tog ključa. Za taj uobičajeni slučaj stvarna zaštita od toga da preostala
  etapa ponovo upotrijebi upravo iscrpljeni račun NIJE ovaj skup — to je
  prethodno opisani sloj perzistencije (`rateLimitedUntil` konekcije sada je u
  budućnosti) u kombinaciji s istom zaštitnom provjerom koja za taj neuspjeh
  potiskuje `transientRateLimitedProviders` (pogledajte „Dvofazni dizajn“ i
  komentar u kodu na grani `isAgentrouterConnectionQuotaScope` u
  `targetExhaustion.ts`): budući da taj skup ostaje neoznačen, prisilno
  dopuštanje putem `allowRateLimitedConnection` u `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NE aktivira se za
  preostale etape pružaoca, pa se filter `rateLimitedUntil` odabira
  vjerodajnica (`src/sse/services/auth.ts:1238`) normalno poštuje, a preostala
  etapa ili odabire drugu, još uvijek prihvatljivu agentrouter konekciju ili
  ne uspijeva jer nema dostupnih vjerodajnica — ne vraća se prisilno na
  konekciju koju je ova grana upravo stavila u period hlađenja.

### Dvofazni dizajn: preformulisanje statusa, zatim klasifikacija

Preformulisanje statusa (`upstreamStatusRestatement.ts`) i pravila
klasifikacije pružaoca (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) odvojeni su registri koji koriste identifikator
pružaoca i tekstualne oznake kao ključeve, ali izvršavaju se na različitim
mjestima i služe različitim svrhama: preformulisanje rano mijenja HTTP status
u `chatCore.ts`; pravila klasifikacije odabiru rezervni `reason` i `scope`
zaključavanja (`model` / `provider` / `connection`) unutar
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Pravila klasifikacije vide puni **tekst** greške (potreban za podudaranje
oznaka tijela poput `额度不足`) samo za pružaoce navedene na dozvoljenoj listi
`FULL_TEXT_RULE_PROVIDERS` u `providerErrorRules.ts` — trenutno samo
`"agentrouter"`. Za svakog drugog pružaoca iz **ugrađenog kataloga**,
`checkFallbackError` prosljeđuje funkciji `getProviderErrorRuleMatch` samo
strukturiranu grešku (`{code, type}`), što je dovoljno za pravila zasnovana na
zaglavlju/statusu/kodu, ali ne omogućava prepoznavanje oznaka u tekstu tijela.
Pomoćna funkcija `resolveRuleMatchBody()` obavlja ovaj odabir: puni tekst
greške za pružaoce na dozvoljenoj listi, a strukturiranu grešku za ostale.
Dodavanje **ugrađenog** pružaoca u `FULL_TEXT_RULE_PROVIDERS` predstavlja
izričitu saglasnost za svakog pojedinačnog pružaoca — postoji kako bi zadana
putanja za svakog pružaoca koji nije na listi ostala nepromijenjena bajt po
bajt.

`scope` pravila (`model` / `provider` / `connection`) predstavlja zasebnu
saglasnost od `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` ga samo izlaže
kao `fallbackResult.ruleScope`, a nizvodni potrošači ga poštuju kao nešto više
od informativne oznake samo za pružaoce na dozvoljenoj listi
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` u istoj datoteci (`ograničeno putem
honorsRuleLockScope()` — trenutno samo `"agentrouter"`). Pogledajte prethodni
odjeljak „Preformulisane greške kvote“ da biste saznali šta podudaranje sa
`scope: "connection"` zapravo radi nakon što se pružalac nađe na toj
dozvoljenoj listi.

**#11104 — pravila koja deklarira operator zaobilaze obje liste dozvoljenih.** Operator može
deklarirati pravilo za pojedinačnog pružaoca usluge tokom izvršavanja putem `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
bez uređivanja ove datoteke. Uslovljavanje operatorskog pravila listama
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — listama dozvoljenih
namijenjenim zaštiti **zadanog** ponašanja ugrađenih kataloških pravila — učinilo bi
mehanizam postavki neaktivnim za svakog pružaoca osim onih koji su već
navedeni, jer sama deklaracija pravila već predstavlja eksplicitni pristanak
operatora. `resolveRuleMatchBody()` i `honorsRuleLockScope()` prvo provjeravaju
`hasOperatorRuleForProvider()`: pružalac s operatorskim pravilom dobija
neobrađeni tekst greške i poštuje se njegov deklarirani `scope`, bez obzira na
to pojavljuje li se i na nekoj od lista dozvoljenih.

**Poznati nedostatak — `providerRuleRegistry` se nikada ne provjerava za HTTP 400.**
Grana `BAD_REQUEST` funkcije `checkFallbackError` klasificira status 400 isključivo
putem vlastitih nizova obrazaca (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` itd. u `accountFallback.ts`) i vraća rezultat prije
nego što se dosegne prethodna grana `configuredRule`/`getProviderErrorRuleMatch`.
Ugrađeno kataloško pravilo (ili operatorsko pravilo) sa `status: 400`
sintaksno je ispravno, ali se nikada neće aktivirati. Nijedno postojeće pravilo
trenutno ne cilja 400, pa ništa u produkciji nije pogođeno — ali buduće pravilo
za 400 zahtijeva da se prvo izmijeni ova grana, što je veća promjena od dodavanja
pravila (ponovo klasificira 400 za svakog pružaoca koji se već oslanja na
ponašanje nizova obrazaca) i izvan je opsega dodavanja pravila za jednog pružaoca.

### Dodavanje novog gatewaya koji pogrešno navodi kvotu

1. Registrirajte jedan niz pravila u `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Neka `textMarkers`
   budu specifični za pružaoca; nikada nemojte ponovo koristiti generičke
   engleske fraze koje se preklapaju s `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`).
2. Opcionalno registrirajte pravila klasifikacije u
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) kako biste
   odabrali odgovarajući opseg zaključavanja (`connection` za kvotu na nivou
   cijelog računa, `model` za greške po modelu). Ovaj korak u produkciji djeluje
   samo za pružaoce čijim je pravilima potreban puni tekst greške (markeri tijela):
   dodajte ID pružaoca u `FULL_TEXT_RULE_PROVIDERS` u istoj datoteci — u suprotnom
   `checkFallbackError` pravilu prosljeđuje samo strukturiranu grešku
   `{code, type}`, pa se pravilo zasnovano na tekstu tijela nikada neće podudariti
   sa stvarnim saobraćajem. Pravila koja se podudaraju isključivo prema
   `status`/`headers` (poput Opencodeovih ili Minimaxovih) ne trebaju ovaj
   eksplicitni pristanak. Zasebno, ako pravilo deklarira `scope: "connection"`
   i namjera je stvarno razdoblje čekanja za cijelu konekciju uz preskakanje
   kombinacije unutar istog zahtjeva (a ne samo informativna oznaka), dodajte
   ID pružaoca u `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u istoj datoteci — time se
   uslovljava potrošnja u stilu `isAgentrouterConnectionQuotaScope()` unutar
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) i
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez toga, `scope` se i dalje
   prenosi kroz `fallbackResult.ruleScope`, ali ništa ne djeluje na osnovu njega.
3. Dodajte jedinične testove po uzoru na `tests/unit/upstream-status-restatement.test.ts`
   i `tests/unit/agentrouter-error-rules.test.ts` (uključujući zaštite
   not-permanent / not-creditsExhausted i — ako je pružaocu potrebna lista
   dozvoljenih — test koji potvrđuje da `resolveRuleMatchBody()` vraća puni tekst
   samo za tog pružaoca).

Nisu potrebne nikakve izmjene u `chatCore.ts`, `classifyError` ili combo logici.

#### Zaključavanje grupirano prema izlaznoj IP adresi (#10880)

Pružaoci u `EGRESS_BUCKETED_LOCK_PROVIDERS` (porodica opencode) tretiraju se
kao upstream grupiran prema IP adresi (besplatni nivo opencodea grupiran je
prema IP adresi, a ne prema računu — pogledajte #9611): status 429 klasificiran
kao `quota_exhausted` **ili** `rate_limit_exceeded` stavlja u stanje čekanja
svaku konekciju iz porodice na listi dozvoljenih čija se posljednja poznata
izlazna IP adresa podudara s adresom konekcije koja je prijavila grešku, prije
nego što ih rotacija pokuša koristiti
— čime se izbjegava N-1 upstream poziva za koje se unaprijed zna da će neuspjeti
(isti obrazac kao #10460/#10525).
`rate_limit_exceeded` je uključen namjerno: na putanji `markAccountUnavailable`
pravila specifična za opencode nikada se ne podudaraju (zaglavlja/tijelo se ne
prosljeđuju funkciji `checkFallbackError`, a opencode nije u
`FULL_TEXT_RULE_PROVIDERS`), pa se 429 čije tijelo sadrži tekst o kvoti pretplate
("monthly usage limit reached") klasificira kao `quota_exhausted` pomoću
rezervnog mehanizma zasnovanog na tekstu kvote (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; razdoblje čekanja od 1h) prije nego što se uopće dosegne
pravilo `status_429` — dok se 429 bez teksta o kvoti (obično ograničavanje
brzine) klasificira putem pravila `status_429` kao `rate_limit_exceeded` i
svejedno stavlja IP porodicu u stanje čekanja. Za pružaoca na listi dozvoljenih,
ograničenje brzine grupirano prema IP adresi isti je signal kao iscrpljena kvota.
Stvarna ograničenja:

- **Najbolji mogući pokušaj**: zaključavanje razrješava posljednji poznati `egress_ip`
  veze iz `proxy_logs` (prozor od 24h, sinhrono, bez keša). Hladan keš (izlazni
  IP nikada nije ispitan) ili nepostojanje reda → neuspješna veza se i dalje stavlja
  na hlađenje putem grane (zabilježeno kao i danas), samo nijedna srodna veza nije zaključana.
- **Nikada terminalno**: hlađenje je obnavljajući prozor kvote
  (`testStatus: "unavailable"`); trajno stanje se nikada ne izvodi iz
  signala na nivou IP-a. Veze s `disableCooling` u potpunosti preskaču ovu granu.
- **Granularnost zaključavanja mijenja se za porodicu s liste dozvoljenih**: ovo je promjena
  opsega, a ne samo optimizacija srodnih veza. opencode je pružalac iz
  `passthroughModels`, pa je prije ove grane odgovor 429 uzrokovao zaključavanje po-MODEL;
  sada uzrokuje hlađenje veze — uključujući i operatera koji koristi samo jednu
  vezu, bez ikakve srodne veze. To je granularnost koju tabela pravila za opencode
  već proglašava ispravnom (`scope: "connection"`,
  `providerErrorRules.ts`), ali koja se dosad nikada nije primjenjivala jer opencode nije u
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Grana sama upisuje hlađenje neuspješne
  veze + `backoffLevel`, odražavajući granu agentroutera s opsegom veze,
  i vraća se — blokada po modelu i generička putanja ispod nikada se ne dosežu.
- **Combo je uključen**: kao i grana agentroutera, opseg namjerno
  zanemaruje degradaciju `persistUnavailableState`/`isCombo` koju combo pozivalac
  primjenjuje na odgovor 429. Zaključavanje po modelu nije slabiji oblik ovog opsega, već
  pogrešna jedinica: ono ne govori ništa o iscrpljenom IP-u, pa bi combo
  rotacija nastavila trošiti po jedan poziv sa zagarantovanim neuspjehom za svaku srodnu vezu.
- **Sigurnost srodnih veza**: srodna veza koja je već terminalna (banned/credits_exhausted)
  ili se već nalazi u dužem periodu hlađenja nikada se ne prepisuje.
- **Ekskluzivna lista dozvoljenih**: proširivanje `EGRESS_BUCKETED_LOCK_PROVIDERS` je
  eksplicitna odluka vlasnika; nema generičkog povezivanja (obrazac #10334/#10419). Upit za
  srodne veze koristi tu istu listu dozvoljenih umjesto da je ponavlja kao SQL
  literal, tako da njeno proširivanje ostaje izmjena jedne linije.
- **Rotacija izlaznog IP-a, u oba smjera**: prozor pretrage (24h) je znatno
  širi od TTL-a keša izlaznog IP-a (5 min), pa je „posljednji poznati IP“ historijski podatak,
  a ne trenutno stanje. Ako je proxy veze rotirao unutar tog prozora,
  zaključavanje može **promašiti** stvarno dijeljeni IP (zabilježeni IP je novi,
  neiscrpljeni IP) — a simetrično tome može **staviti na hlađenje srodnu vezu koja je u međuvremenu
  rotirala dalje** od iscrpljenog IP-a. Drugi slučaj tu srodnu vezu košta jednog
  prozora hlađenja; oba se prihvataju kao ograničenja najboljeg mogućeg pokušaja pretrage
  zasnovane na historiji.
- **Trošak**: dva ograničena skeniranja `proxy_logs` (filtrirana po prozoru putem
  `idx_pl_timestamp`), samo pri učestalosti odgovora 429. Nema novog indeksa (migracija 134
  YAGNI). Izmjereno na kopiji baze podataka stvarnog saobraćaja umjerene veličine;
  instanca s velikom propusnošću sadrži proporcionalno više redova unutar istog prozora.

---

## Ostale funkcije otpornosti

- **20 strategija usmjeravanja** (prioritetno, ponderirano, kružno, prosljeđivanje konteksta, prvo popunjavanje, p2c, nasumično, najmanje korišteno, optimizirano prema trošku, uz uvažavanje resetiranja, prozor resetiranja, raspoloživi kapacitet, ponderirano prema kvoti, strogo nasumično, automatski, lkgp, optimizirano prema kontekstu, optimizirano prema keširanju, fuzija, cjevovod) — pogledajte [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Usmjeravanje uz uvažavanje resetiranja** (v3.8.0) — daje prioritet vezama prema vremenu resetiranja kvote.
- **Degradacija pozadinskog načina rada** — Responses API `background: true` degradira se na sinhroni način rada uz upozorenje.
- **Dinamičko otkrivanje ograničenja alata** — povlači se od pružalaca usluga kada se dostignu ograničenja broja alata.
- **Rezervni način rada za hitne slučajeve** — kontrolira se pomoću `OMNIROUTE_EMERGENCY_FALLBACK`; operateri ga mogu promijeniti na stranici Feature Flags bez ponovnog pokretanja.

---

## Otklanjanje grešaka

- Ponderisana kombinacija odgovara sa `503 all_targets_cooling_down` (`Retry-After` je postavljen, `diagnostics.excluded` navodi svako odredište sa `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → skup je konfiguriran i povezan, ali je svako odredište isključeno tajmerom otpornosti; upozorenje `[COMBO] Weighted selection: every target excluded before dispatch — …` navodi razloge i preostale sekunde. Odgovor `404 no_executable_targets` iz iste kombinacije znači da nije bio uključen nijedan tajmer otpornosti (nema ničega za pokretanje ili nijedan račun nije prošao provjeru dostupnosti). Implementirano u `open-sse/services/combo/pinRecovery.ts` na osnovu isključenja prikupljenih u `targetResolution.ts`.
- Svi ključevi za pružaoca su preskočeni → provjerite i stanje prekidača strujnog kola I `rateLimitedUntil`/`testStatus` svake veze.
- Pružalac je trajno isključen nakon vremenskog okvira resetovanja → kôd čita sirovi `state` umjesto `getStatus()`/`canExecute()`.
- Jedan ključ ne radi, ostali bi trebali raditi → dajte prednost periodu mirovanja veze u odnosu na prekidač strujnog kola.
- Samo jedan model ne radi → dajte prednost zaključavanju modela u odnosu na period mirovanja veze.
- Stanje bi se trebalo samo oporaviti, ali se ne oporavlja → provjerite buduću vremensku oznaku i putanju čitanja koja osvježava isteklo stanje. Trajni statusi zahtijevaju ručne promjene.

---

## TLS otisci i prikrivenost

Prikrivenost specifična za pružaoca (JA3/JA4, CCH, zamagljivanje) dokumentirana je zasebno — pogledajte `docs/security/STEALTH_GUIDE.md` (git; nije kompilirano u `/docs`).

---

## Testiranje otpornosti (Faza 8 · Blok C)

Pored jediničnih testova logike otpornosti, tri testa provjeravaju izvršno okruženje pod
stvarnim uslovima opterećenja/kvara (svi su integracijski/noćni — nijedan ne blokira PR-ove):

| Test       | Šta                                                                                                                                                                                                            | Pokretanje                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Haos       | Lažni uzvodni čvor ubacuje stvarnu latenciju/resetovanje/istek vremena/503; potvrđuje da se prekidač strujnog kola otvara/oporavlja i da `checkFallbackError` klasificira 503 kao nadoknadivu rezervnu opciju. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Rast heapa | ~500 tokova po `createSSEStream` uz `--expose-gc`; test ne uspijeva ako heap naraste iznad gornje granice (OOM zaštita #3069).                                                                                 | `npm run test:heap`                    |
| k6 soak    | Kontinuirano opterećenje prema `/api/monitoring/health`; p95/pragovi grešaka.                                                                                                                                  | `k6 run tests/load/k6-soak.js` (noćno) |

Orkestrirano putem `.github/workflows/nightly-resilience.yml` (cron + dispatch). U
zadanom `test:integration`, testovi haosa i heapa sami se preskaču (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Također pogledajte

- [Vodič kroz arhitekturu](./ARCHITECTURE.md) — Arhitektura sistema i unutrašnji mehanizmi
- [Korisnički vodič](../guides/USER_GUIDE.md) — Pružatelji usluga, kombinacije, CLI integracija
- [Mehanizam za automatske kombinacije](../routing/AUTO-COMBO.md) — Bodovanje sa 16 faktora, paketi načina rada
