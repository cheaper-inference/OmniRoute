# Resilience Guide (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ima tri različita, ali povezana mehanizma otpornosti. Svaka ima drugačiji obim i svrhu. Držite ih odvojeno kada otklanjate greške u ponašanju rutiranja.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> Izvor: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **Env-vs-dashboard prioritet za prekidače otpornosti.** Opt-in otpornost prebacuje iz okruženja — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`, `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`, `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` — isporučuje samo _default_ (`DEFAULT_RESILIENCE_SETTINGS`, `src/lib/resilience/settings.ts`). Boolean je ostao u `resilienceSettings` (Nadzorna ploča →** Postavke → Otpornost** / `PATCH /api/resilience`, pohranjen u `key_value`) pobjeđuje vrijednost env: normalizacija (`toBoolean`, `src/lib/resilience/settings/normalize.ts`) zadržava pohranjeni boolean kad god postoji. Postavljanje takvog env var na `true` na implementaciji gdje je kontrolna ploča već spremljena `false` stoga ništa ne mijenja — okrenite prekidač u** Postavke → Otpornost** (ili obrišite pohranjeno polje).

## 1. Prekidač kruga provajdera (Provider Circuit Breaker)

**Opseg:** cijeli provajder (npr. `glm`, `openai`, `anthropic`).

**Svrha:** prestati slati saobraćaj provajderu koji više puta uzastopno otkazuje na nivou upstream-a/usluge.

**Implementacija:**

- Osnovna klasa: `src/shared/utils/circuitBreaker.ts`
- Povezivanje: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Status API: `GET /api/monitoring/health`
- Reset API: `POST /api/resilience/reset`
- Omotači: `open-sse/services/accountFallback.ts`
- DB tabela: `domain_circuit_breakers`

**Stanja:**

- `CLOSED` — normalni saobraćaj je dozvoljen
- `DEGRADED` — saobraćaj je i dalje dozvoljen, ali se prate povećani neuspjesi provajdera; vraća se na `CLOSED` nakon dovoljnog broja uspjeha, nakon važećeg testa veze, ili nakon isteka najdužeg `OPEN` zadržavanja za posljednju vrstu neuspjeha (njena vrijednost `cooldownByKind`, inače `resetTimeout`, × `maxBackoffMultiplier`, najmanje jedan cooldown) bez novog neuspjeha
- `OPEN` — provajder je privremeno blokiran; combo usmjeravanje ga preskače
- `HALF_OPEN` — reset timeout je istekao; probni zahtjev je dozvoljen

**Konfigurabilne zadane vrijednosti (`open-sse/config/constants.ts`, izložene u Dashboard → Settings → Resilience):**

| Klasa   | Degradira se na | Otvara se na | Reset timeout |
| ------- | --------------- | ------------ | ------------- |
| OAuth   | 5 neuspjeha     | 8 neuspjeha  | 60s           |
| API-key | 7 neuspjeha     | 12 neuspjeha | 30s           |
| Local   | izvedeno        | 2 neuspjeha  | 15s           |

`degradationThreshold` kontroliše kada provajder ulazi u `DEGRADED`; `failureThreshold` kontroliše kada se otvara i preskače. Profili lokalnih provajdera još nisu izloženi na stranici postavki otpornosti (Resilience).

**Kodovi aktivacije:** samo statusi na nivou provajdera `[408, 500, 502, 503, 504]`. NE aktivirati za greške na nivou naloga (većina 401/403/429 — one pripadaju cooldown-u ili lockout-u).

**Lijeni oporavak:** kada `OPEN` istekne, `getStatus()`, `canExecute()`, `getRetryAfterMs()` osvježavaju stanje na `HALF_OPEN`. Ista čitanja (i sljedeći neuspjeh) postepeno vraćaju zastarjelo `DEGRADED` nazad na `CLOSED`. Pozadinski tajmer nije potreban.

---

### Opcionalno globalno zahlađenje provajdera (kapija vremenskog prozora)

Četvrti, **opcionalni** sloj (`PROVIDER_COOLDOWN_ENABLED`, zadano **isključeno**) čuva memoriju o neuspjelim provajderima kroz više zahtjeva u
`open-sse/services/providerCooldownTracker.ts`, koju koristi razrješavanje combo ciljeva, tako da uzastopni combo zahtjevi prestaju ponovno prolaziti kroz provajdera koji je upravo otkazao. Zapisi na nivou provajdera poštuju kapiju vremenskog prozora iz `PROVIDER_PROFILES`:

| Profil  | aktivira se nakon (`providerFailureThreshold`) | unutar (`providerFailureWindowMs`) | hladi se (`providerCooldownMs`) |
| ------- | ---------------------------------------------: | ---------------------------------: | ------------------------------: |
| OAuth   |                                           `10` |                            `15min` |                          `5min` |
| API key |                                           `15` |                            `30min` |                         `10min` |

Ispod praga provajder se **ne** smatra u hlađenju; uspjeh briše prozor. Zapisi na nivou veze (`provider:connectionId`) umjesto toga zadržavaju eksponencijalni backoff `minRetryCooldownMs → maxRetryCooldownMs`. Nadjačavanja:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regresijska zaštita: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Period hlađenja veze

**Opseg:** veza/nalog/ključ jednog provajdera.

**Svrha:** preskočiti jedan neispravan ključ dok druge veze za istog provajdera nastavljaju pružati uslugu.

**Implementacija:**

- Označavanje nedostupnim: `src/sse/services/auth.ts::markAccountUnavailable()`
- Odabir: `getProviderCredentials*` u istoj datoteci
- Izračun perioda hlađenja: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Postavke: `src/lib/resilience/settings.ts`

**Polja po vezi:**

- `rateLimitedUntil` — vremenska oznaka do isteka perioda hlađenja
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — brojač eksponencijalnog povećanja čekanja

**Zadani periodi hlađenja:**

- OAuth osnovni period: 5 s
- Osnovni period za API ključ: 3 s
- API ključ 429: daje prednost zaglavljima `Retry-After`/zaglavlju za resetovanje/tekstu resetovanja koji se može analizirati
- Povećanje čekanja: `baseCooldownMs * 2 ** failureIndex`

**Kašnjenje ponovnog pokušaja po provajderu.** Stranica s detaljima provajdera sadrži izbor **Kašnjenje ponovnog pokušaja** (Automatski, od 15 s do 1 h). On čuva `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds` (1–21600, putem `PATCH /api/resilience`). Kada greška ograničenja brzine ne sadrži uzvodnu napomenu o ponovnom pokušaju, ta vrijednost zamjenjuje skalirano povećanje čekanja za provajdera i postavlja `backoffLevel` na 0 (`open-sse/services/rotationConfig.ts::overrideFor`). Redoslijed prioriteta za grešku ograničenja brzine, od najvišeg: uzvodna napomena o ponovnom pokušaju, zatim `providerSpecificData.rotationOverrides.rateLimitResetSeconds` po vezi, zatim kašnjenje ponovnog pokušaja za provajdera, zatim `OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` iz okruženja, a potom skalirano povećanje čekanja. Automatski način uklanja polje. Ovo utiče samo na razlog ograničenja brzine, nikada na terminalna stanja.

**Zaštita od istovremenog naleta:** sprečava da istovremeni neuspjesi pretjerano produže period hlađenja ili dvostruko povećaju `backoffLevel`.

**429 greške zbog ograničenja konkurentnosti ne povećavaju nivo čekanja.** `429` čije tijelo prijavljuje ograničenje konkurentnosti ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`) znači da je nalog ispravan, ali zauzet. `checkFallbackError()` vraća razlog `concurrency_limited`: odmah prelazi na sljedeću vezu, hladi ovu na fiksni period `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) ili do uzvodne napomene o ponovnom pokušaju, ostavlja `backoffLevel` nepromijenjenim i postavlja `skipProviderBreaker`. Eksplicitno tijelo kvote i dalje ima prednost, pa tijelo koje se takođe podudara s obrascem kvote ostaje procjena kvote. Detekcija: `looksLikeConcurrencyLimit()` u `src/shared/utils/classify429.ts`; procjena: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind` prekidača) ostaje nepromijenjen i za ova tijela i dalje čita `rate_limit`.

**Zastoji sadržaja toka ne hlade nalog.** Kada nadzornik zastoja sadržaja (`open-sse/utils/streamHandler.ts`) odustane od toka koji u predviđenom vremenu nije poslao izlaz modela, `markAccountUnavailable()` bilježi grešku na vezi, ali ne postavlja period hlađenja: zastoj pripada tom zahtjevu, najčešće dugom ciklusu zaključivanja bez dosadašnjeg izlaza. Operateri mogu uključiti ovu opciju putem `resilienceSettings.streamStallCooldown.enabled` (zadano `false`).

**Signal kašnjenja uz opcionalno uključivanje za odabir naloga pomoću `p2c`.** Svaki poslani pokušaj bilježi vrijeme do prvog bajta i ishod po vezi (i po vezi + modelu) u memorijskom kliznom prozoru: posljednjih 20 uzoraka unutar 15 minuta (`open-sse/services/connectionLatencyTracker.ts`, bilježi se iz `safeLogEvents()` u `src/sse/handlers/chatHelpers.ts`). Kada je `resilienceSettings.p2cLatency.weight` veći od `0` (raspon 0–20, zadano `0` = isključeno), `compareP2CConnections()` u `src/sse/services/auth.ts` dodaje najviše `weight` bodova svakom kandidatu u paru. Polovina potiče od kašnjenja kao omjera u odnosu na bržeg kandidata (dvostruko sporiji kandidat dobija punu polovinu), a polovina od stope grešaka u kliznom prozoru. Ovaj izraz se primjenjuje samo kada oba kandidata imaju najmanje 3 uzorka, tako da novi nalozi nisu kažnjeni, a njegov maksimum ostaje ispod kazni za blokiranu i iscrpljenu kvotu. Ne dodaje vlastiti prekidač: neuspješnim nalozima i dalje upravljaju slojevi perioda hlađenja, zaključavanja i prekidača. Postavite ga pomoću `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }`.

**Okviri zaključivanja ponovo pokreću budžet zastoja sadržaja.** Modelu za zaključivanje mogu biti potrebne minute prije prvog vidljivog tokena: Claude šalje okvire `thinking_delta` čiji tekst zaključivanja može biti prazan, a Responses API šalje jednu stavku zaključivanja za drugom. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) prepoznaje ove okvire, a nadzornik ponovo pokreće svoj budžet pri svakom od njih umjesto da otkaže ciklus. Oni i dalje nisu izlaz modela, pa se ciklus koji završi samo zaključivanjem i dalje prijavljuje kao prazan, a ciklus koji zaustavi zaključivanje i šalje samo otkucaje srca i dalje aktivira nadzornika.

Kirovi binarni okviri `reasoningContentEvent` s nepraznim potpisom čuvaju ovu aktivnost zaključivanja kroz izvršavač kao prazan delta `reasoning_content`. Potpis se ne prosljeđuje. Metapodaci, nepotpuni okviri i prazni potpisi ne pokreću ponovo budžet sadržaja; nezavisno vremensko ograničenje aktivnog toka i otkazivanje od strane klijenta i dalje se primjenjuju (`open-sse/executors/kiro/reasoning.ts`).

**Terminalna stanja (NISU periodi hlađenja):**

- `banned` — postavlja se detekcijom zabranjene ključne riječi / zabrane naloga (pogledajte [BAN_DETECTION](../security/BAN_DETECTION.md)). Uzvodna odbijanja pojedinačnih zahtjeva (`request_rejected`, npr. Anthropic OAuth 403 "Request not allowed") nikada ga ne postavljaju: ona se broje po vezi i modelu i taj model se izuzima iz rotacije uz rastući period hlađenja ograničen na `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), ili hlade vezu kada model nije poznat — `open-sse/services/requestRejectedStreak.ts`
- `expired` (prelazi u terminalno stanje nakon ograničenog broja pokušaja — `EXPIRED_RETRY_MAX = 3` uz eksponencijalno povećanje čekanja — kako bi prolazne OAuth greške mogle same da se oporave prije trajne deaktivacije naloga)
- `credits_exhausted`

Oni ostaju aktivni sve dok se vjerodajnice ne promijene ili ih operater ne resetuje. Nemojte prepisivati terminalna stanja prolaznim stanjem hlađenja.

**Lijeni oporavak:** kada `rateLimitedUntil` istekne, veza ponovo postaje dostupna. Nakon uspješne upotrebe, `clearAccountError()` briše sva polja greške.

### Claude zid upotrebe OAutha: kanal nižeg prioriteta + reset ograničenja sesije

**Opseg:** jedna Claude pretplata (OAuth) veza. Obje funkcije su **opcionalne po vezi** (Uredi vezu → odjeljak Claude → `lowPriorityMode` / `autoLimitReset` u `providerSpecificData`, obje su podrazumijevano isključene) i preslikavaju Claude Code komande `/low-priority` i `/limit-reset` (ugovor komunikacije preuzet iz Claude Code 2.1.263).

**Implementacija:**

- Mašina stanja + klasifikacija odgovora: `open-sse/services/claudeLowPriority.ts`
- Klijent za status/polaganje prava na reset: `open-sse/services/claudeLimitReset.ts`
- Kuka izvršioca (ubacivanje zaglavlja + ponovni pokušaj za isti nalog): `open-sse/executors/base.ts::execute()`
- Čuvanje opcija: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Okidač:** petosatni zid upotrebe — `429` čija zaglavlja sadrže
`anthropic-ratelimit-unified-status: rejected` i, kada je nalog podoban,
`anthropic-ratelimit-unified-slow-offer: treatment`. Prije tog prvog zidnog
429 ne šalje se ništa; burst 429 bez objedinjenih zaglavlja prolazi kroz uobičajeni put hlađenja.

**Kanal nižeg prioriteta** (`lowPriorityMode`):

- Kod zidnog 429 izvršilac prihvata ponudu i odmah ponovo pokušava sa **istim**
  nalogom uz `anthropic-usage-limit: slow`; kanal ostaje aktivan do najavljenog
  `anthropic-ratelimit-unified-reset` (+ tolerancija od 60 s), a svaki zahtjev u tom
  periodu nosi zaglavlje. Presretnuti 429 nikada ne dolazi do `handleChatCore`, pa se veza
  **ne stavlja u hlađenje i ne rotira**.
- `anthropic-ratelimit-unified-slow-status` u kasnijim odgovorima: `active` / `not_needed`
  zadržavaju kanal; `slot_busy` (429) ili `529` čekaju serverski
  `anthropic-ratelimit-unified-slow-retry-after` (podrazumijevano 20 s, ograničeno na 5–600 s, uz ±30% slučajnog odstupanja)
  i ponovo pokušavaju, ograničeno sa `anthropic-ratelimit-unified-slow-max-wait` (podrazumijevano 20 min, ograničeno na
  1 min–6 h) — nakon toga kanal se završava, a desetominutna pauza blokira ponovno prihvatanje. Čekanje je dodatno ograničeno preostalim vremenom vlastitog uzvodnog početnog isteka zahtjeva
  (`resolveFetchStartTimeout`, podrazumijevano 10 min) umanjenim za marginu od 5 s: bez tog ograničenja
  podrazumijevani maksimalni period čekanja od 20 minuta trajao bi duže od zahtjeva, pa bi spavanje bilo prekinuto
  usred čekanja, prikazujući `TimeoutError` umjesto urednog završetka `max_wait` + pauze.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, prelazak petosatnog prozora ili
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (što ga završava kao
  `extra_usage` pri bilo kojem statusu, jer plaćena prekoračena upotreba sada pokriva zid) završavaju kanal; odgovor zatim prolazi uobičajenim putem hlađenja. `budget_exhausted` se pamti do najavljenog reseta budžeta (najviše 8 dana).
- Provjera zida izvršava se nakon vlastitih ponovljenih pokušaja izvršioca pokrenutih statusom 400 unutar pokušaja (uređivanje konteksta, ograničenja razmišljanja/napora, automatsko učenje parametara), tako da se zidni 429 koji se pojavi tek pri jednom od tih ponovnih pokušaja i dalje presreće umjesto da dospije na put hlađenja.
- Stanje se čuva u memoriji po vezi (ponovno pokretanje zahtijeva jedan dodatni zidni 429 za ponovno prihvatanje).

**Reset ograničenja sesije** (`autoLimitReset`, pokušava se prije kanala kada su oba uključena):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → blok
  `juniper_tide`; kada su `arm: "reset"` i `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` sa
  `{ "program": "juniper_tide" }` (UUID organizacije iz `providerSpecificData.organizationUUID`, rezervna početna vrijednost).
- `result: reset|not_limited` → zahtjev se ponavlja punom brzinom (bez zaglavlja slow).
  `already_used` / `not_offered` memorišu `next_available_at` (podrazumijevano jedna sedmica); svaki neuspjeh uvodi pauzu od 15 minuta. Reset se obavlja jednom sedmično i i dalje se računa u sedmično ograničenje.

Regresione zaštite: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Automatska primjena bankovnih reseta

**Opseg:** Codex i Claude pretplatničke (OAuth) veze.**Opt-in** : postavka `bankedResetAutoApply` je isključena i po defaultu je u `dry-run` modu (Postavke → AI → Automatska primjena bankovnih resetovanja).

**svrha:** trošite bankovne resetove sami kada račun naiđe na zid upotrebe, umjesto da čekate da operater pritisne "Otkupi" na stranici Ograničenja dobavljača.

| Vrsta kredita (`creditTypes`) | Šta se otkupljuje                                       | Gde ide                                                           |
| ----------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------- |
| `codexCredits`                | Codex reset kredite                                     | pozadinski posao, svakih 60 s                                     |
| `claudeCredits`               | Claude bankovni grantovi (`GRANT` krediti)              | pozadinski posao, svakih 60 s                                     |
| `claudeSessionReset`          | Claude sedmično poništavanje ograničenja sesije (iznad) | putanju zahtjeva, kroz istu politiku kao i prebacivanje po računu |

**Implementacija:**

- Čista odluka (jedan skup pravila za oba puta): `src/lib/usage/bankedResetPolicy.ts::decideBankedReset()`
- Pozadinski posao: `src/lib/services/bankedResetAutoApply.ts` (započeto u `src/instrumentation-node.ts`)
- Claude ulaz putanje zahtjeva: `src/lib/usage/claudeSessionResetPolicy.ts`, registriran preko `setClaudeLimitResetPolicy()` u `open-sse/services/claudeLimitReset.ts`
- Povijest, kapice i webhook: `src/lib/usage/bankedResetAudit.ts`
- Istorijat API: `GET /api/settings/banked-reset-auto/history?limit=50` (upravljanje auth)

**Odluka** (prvo neuspješno pravilo je zabilježeni razlog):

1. Funkcija isključena, vrsta kredita isključena ili račun izvan opsega (`accountScope` `all` / `selected` plus `connections` mapa po računu).
2. Izvan opcionog UTC rasporeda (`startHourUtc` > `endHourUtc` prelazi ponoć).
3. Ograničenja u posljednja 24 h: `maxPerAccountPerDay` (1), `maxPerDay` (3) i `minSpacingMinutes` (30) između bilo koja dva otkupa.
4. Okidač: zazidani `session` ili `weekly` prozor (čitano iz `getQuotaWindowStatus().reachedThreshold`, a ne `isAccountQuotaExhausted()`, koji samo prijavljuje račun sa svakim potrošenim prozorom), ili kredit koji ističe unutar `expiringCreditHours` (24) na računu koji je koristio najmanje `expiringCreditMinUsedPercent` (50).
5. Zaštita prirodnog resetovanja: preskočite kada se zazidani 5-satni prozor resetuje unutar `sessionResetGuardMinutes` (90), ili zazidani sedmični prozor unutar `weeklyResetGuardHours` (12).
6. Sedmični prag: preskočite 5-satno resetiranje kada je sedmični preostali ispod `weeklyFloorPercent` (10).
7. `last-resort` način: preskočite dok drugi in-scope nalog istog provajdera ima najmanje `poolHeadroomPercent` (10) preostalo u oba prozora. Okidači kredita koji ističu ovo zaobilaze.
8. `dry-run` snima red i ništa ne otkupljuje; `last-resort` i `eager` otkupljuju.

Nedostajući podaci o kvoti nikada ne otključavaju otkup: nepoznato vrijeme poništavanja ili nedjeljno korištenje preskače.

**Resetovanje Claude sesije:** sa isključenom funkcijom ili isključenim `claudeSessionReset` om, `autoLimitReset` prekidač po nalogu odlučuje tačno kao i ranije. Kada su oba uključena, funkcija zamjenjuje prekidače po nalogu: račun u okviru opsega može potraživati samo kada to politika dozvoljava, au `dry-run` modu nema potraživanja.

**sigurnost:** posao otkupljuje najviše jedan kredit po tiku, odlučuje prije nego što navede kredite (preskočeni račun nikada nije naveden), koristi ključeve idempotencije `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>` i povlači račun na 1 h nakon neuspješnog listinga ili otkupa. Svaka odluka o otkupu, neuspjehu i suhoj vožnji se upisuje u `audit_log` (`action: "bankedReset.redeem"`, bez tokena ili kreditnih ID-ova); kapice se broje od tih redova, tako da prežive ponovno pokretanje. Uspješno iskorištavanje također pokreće `provider.reset_redeemed` webhook.

Regresioni čuvari: `tests/unit/banked-reset-policy.test.ts`, `tests/unit/banked-reset-auto-apply.test.ts`, `tests/unit/claude-limit-reset-policy-gate.test.ts`, `tests/unit/banked-reset-history-route.test.ts`.

### Afinitet sesije (#7274)

**Opseg:** jedna klijentska sesija (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` zaglavlje) vezana za jednu vezu, za **bilo kojeg** pružaoca.

**Svrha:** zadržati višepoteznog agenta (Claude Code, aider, prilagođeni agenti) na istom nalogu kroz zahtjeve, smanjujući gubitak konteksta između naloga i ponovljene 429 greške pri hladnom pokretanju kod pružalaca sa stanjem sesije po nalogu.

**Implementacija:**

- Razrješenje TTL-a: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Odabir/kreiranje veze: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Izdvajanje zaglavlja (generički, bilo koji pružalac): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tabela trajnih veza: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Postavka: `sessionAffinityTtlMs` (globalni TTL u ms, `0` onemogućava) — `src/lib/db/settings.ts`. Preimenovano iz postavke `codexSessionAffinityTtlMs`, koja je bila ograničena na Codex, migracijom `124_generic_session_affinity_ttl.sql`; ona prenosi svaki prethodno konfigurisan Codex TTL kao novu podrazumijevanu vrijednost.

Prije #7274, `resolveSessionAffinityTtlMs()` je odmah vraćao `0` za svakog pružaoca osim
`codex`, pa postavka TTL-a (i zaglavlja sesije) nigdje drugo nisu imali efekta, iako su mehanizam vezivanja i izdvajanje zaglavlja već bili nezavisni od pružaoca. Ispravka je uklonila to rano vraćanje; TTL se sada jednako primjenjuje na svakog pružaoca čim se globalno postavi na vrijednost veću od `0`.

Tri zaglavlja afiniteta sesije nikada se ne prosljeđuju uzvodno — izvršioci od početka sastavljaju vlastita uzvodna zaglavlja umjesto prosljeđivanja klijentskih zaglavlja, tako da ovo ostaje samo interni identifikator korelacije.

### Ekskluzivni zakupi veza za upravljane sesije

**Opseg:** jedan aktivni upravljani HTTP klijent/sesija posjeduje jednu odgovarajuću OmniRoute vezu.

**Svrha:** obezbijediti trajno ekskluzivno vlasništvo nad vezom za klijente kojima je potrebna čvrsta
granica rutiranja kroz zahtjeve. Ovo se razlikuje od afiniteta sesije, koji predstavlja blagu preferencu
kontinuiteta: ekskluzivni zakup trajno čuva stanje životnog ciklusa u SQLite bazi, nameće globalnu
jedinstvenost aktivnog vlasnika i aktivne veze te odbija zastarjelu generaciju prije slanja provajderu.

Ova funkcionalnost se uključuje zasebno za svaki API ključ. Upravljani ključ mora imati opseg
`lease:exclusive` i eksplicitnu nepraznu listu `allowedConnections`. Svaki HTTP klijent može koristiti
krajnju tačku životnog ciklusa; nisu potrebni naziv klijenta, korisnički agent, provajder, OAuth metoda
niti model. Zakup posjeduje vezu, a ne model, tako da promjena modela zadržava povezivanje dok veza
ostaje uobičajeno odgovarajuća. Uobičajena pravila za model, kvotu, ispravnost, period hlađenja i listu
dozvoljenih vrijednosti ostaju mjerodavna i mogu prebaciti istu generaciju na drugu slobodnu
odgovarajuću vezu.

Životni ciklus je `POST /api/v1/session-leases` sa JSON radnjama `acquire`, `renew` i `release`.
Upravljani zahtjevi za zaključivanje predstavljaju neprozirnu vrijednost
`X-OmniRoute-Lease-Owner` i tačnu vrijednost `X-OmniRoute-Lease-Generation`. Vlasnik koristi `vlo_`
nakon čega slijedi 43 base64url znaka; pohranjuje se samo njegov SHA-256 sažetak. Svaka završna ograda
slanja takođe povezuje ID autentifikovanog API ključa i ID aktivne veze. Kontrolna zaglavlja zakupa
uklanjaju se iz dnevnika, sačuvanih snimaka zahtjeva i zaglavlja izvršavača uzvodno.

Ako uobičajeno rutiranje ima odgovarajuće upravljane kandidate, ali je svaki slobodni kandidat zauzet
stranim aktivnim zakupom, OmniRoute vraća HTTP `429`, kôd lease-capacity-unavailable, stanje
waiting-for-capacity i ograničeni `Retry-After` izveden iz najranijeg relevantnog isteka.
Uobičajena prazna lista odgovarajućih veza nije sukob zakupa i zadržava postojeću semantiku greške
rutiranja.

Povezani mehanizmi ostaju odvojeni:

- Zauzetost OAuth sesije je procesno-lokalna blaga distribucija za OAuth naloge.
- Semafori naloga dodjeljuju dozvole za konkurentnost zahtjeva i završavaju kada se zahtjev dovrši.
- Ekskluzivni upravljani zakupi sesija predstavljaju trajno vlasništvo nad životnim ciklusom sa zaštitom generacije.

## 3. Blokada modela

**Opseg:** trojka provajder + veza + model.

**Opseg ključa prema statusu:** status greške određuje u koji ključ blokada upisuje
`resolveLockoutScope()` u `open-sse/services/accountFallback/exactModelLock.ts`:

- `429` / `403` / `402` — signal kvote ili prava — zaključava **porodicu kvote**:
  za codex čitav opseg `codex` / `spark` (svaki `gpt-5*` model te
  veze), a za druge provajdere `getQuotaScopedModelForProvider()`.
- `404` zaključava osnovni model (`getModelLockKey()` sužava `not_found`).
- Bilo koji drugi status — `5xx` greške transporta/servera i OmniRoute-ov
  sintetizovani `502` iz validacije kvaliteta — zaključava samo **tačnu**
  kombinaciju provajdera/veze/modela. Neispravan tok za jedan model nije dokaz
  o kvoti naloga; prije ovog pravila jedan prazan odgovor na
  `codex/gpt-5.6-luna` uklanjao je svaki `gpt-5*` model te veze iz
  usmjeravanja na 2–30 min (uz eskalaciju), dok je njena kvota ostajala
  netaknuta.
- Eksplicitna opcija `scope` pozivaoca uvijek ima prednost (Antigravity prosljeđuje `"exact"`).

**Svrha:** izbjeći onemogućavanje čitave veze kada je nedostupan ili ograničen kvotom samo jedan model.

**Primjeri:**

- Provajderi s kvotom po modelu koji vraćaju 429
- Lokalni provajderi koji vraćaju 404 za jedan nedostajući model
- Neuspjesi dozvola specifični za provajdera/režim/model (npr. Grok režimi)

**Implementacija:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Kontrolna tabla vremena hlađenja modela (v3.8.0)

UI: Postavke → Vremena hlađenja modela (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Navodi aktivne blokade sa: provajderom, vezom, modelom, razlogom i expiresAt. Operateri mogu ručno ponovo omogućiti model iz kartice.

**REST API:**

- `GET /api/resilience/model-cooldowns` — navodi aktivne blokade
- `DELETE /api/resilience/model-cooldowns` — ručno ponovno omogućavanje. Tijelo: `{provider, connection, model}`. Autentifikacija: management.

### Upravljač vremenima hlađenja

UI: Nadgledanje → Upravljač vremenima hlađenja (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Jedna stranica za svaku vezu koja je izvan usmjeravanja zbog prolaznog razloga, umjesto
otvaranja stranice svakog provajdera. Navodi vremena hlađenja veza, blokade modela i terminalna
stanja, briše ih po vezi, za izabrane veze ili za sve veze provajdera,
te uređuje najčešće podešavana pravila vremena hlađenja: `streamStallCooldown.enabled` i osnovno
vrijeme hlađenja `connectionCooldown` za OAuth / API ključ, kao i maksimalni broj koraka
povratnog čekanja (čuva se putem `PATCH /api/resilience`). Terminalna stanja (`banned`, `expired`, `credits_exhausted`) su
navedena, ali se ovdje nikada ne brišu.

Kartica **Pravila vremena hlađenja za greške** na istoj stranici uređuje pravila grešaka operatera
(`settings.providerErrorRules`) i podrazumijevane rezervne vrijednosti po provajderu
(`settings.providerErrorDefaults`) putem `PATCH /api/settings` — pogledajte „Pravila koja je
proglasio operater“ u odjeljku §7 za način njihovog podudaranja. Trajanja su Podrazumijevano (bez izričitog vremena hlađenja), 30 min,
1 h, 5 h, 24 h ili prilagođeno od 1 do 43.200 minuta (30 dana).

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentifikacija: management):

- `GET /api/resilience/cooldowns[?provider=]` — veze sa statusom, preostalim vremenom hlađenja,
  nivoom povratnog čekanja, posljednjim tipom greške i blokadama modela (bez akreditiva)
- `POST /api/resilience/cooldowns` — tijelo `{connectionIds: string[]}` ili
  `{all: true, provider?}`; vraća `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### UI postavki blokade i oporavak smanjenjem nakon uspjeha (v3.8.23)

Blokada modela prešla je iz uvijek uključenog, hardkodiranog ponašanja u potpuno podesivu,
opcijsku funkciju sa vlastitom karticom postavki i putem oporavka koji sam otklanja probleme.

**Kartica postavki:** Postavke → Blokada modela
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ovo se **razlikuje** od kartice samo za čitanje `ModelCooldownsCard` iznad (koja samo
_nabraja_ aktivne blokade) — nova kartica _podešava parametre_. Podrazumijevane vrijednosti
nalaze se u `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Postavka                | Podrazumijevana vrijednost       | Značenje                                                                |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------- |
| `enabled`               | `false`                          | Glavni prekidač — blokada modela je **podrazumijevano isključena**.     |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Statusi uzvodnog sistema koji se računaju kao greška opsega modela.     |
| `baseCooldownMs`        | `120_000` (120 s)                | Početno trajanje blokade nakon prvog neuspjeha.                         |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Ograničenje eskaliranog vremena hlađenja.                               |
| `maxBackoffSteps`       | `10`                             | Maksimalan broj koraka eskalacije eksponencijalnog povratnog čekanja.   |
| `useExponentialBackoff` | `true`                           | Da li ponovljeni neuspjesi eksponencijalno povećavaju vrijeme hlađenja. |

Postavke se čuvaju putem uobičajenog skladišta postavki i provjeravaju prema šemi
postavki otpornosti; kartica ograničava `baseCooldownMs`/`maxCooldownMs`
(uz `maxCooldownMs ≥ baseCooldownMs`) i `maxBackoffSteps`.

**Oporavak smanjenjem nakon uspjeha:** oporavak se **ne** zasniva isključivo na isteku vremena. Zdrav
odgovor smanjuje broj neuspjeha modela, tako da model koji se oporavio
usred perioda prestaje eskalirati (i briše se) prije isteka svog tajmera. Nakon uspješne
kombinacijske mete, `open-sse/services/combo.ts` poziva `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), što **prepolovljuje** sačuvani
`failureCount` (`Math.floor(failureCount / 2)`); kada dosegne `0`, unos blokade se u potpunosti
briše. Suprotna funkcija `recordModelLockoutFailure()`
povećava broj (i eskalira vrijeme hlađenja) nakon neuspjeha unutar prozora eskalacije. Ovo smanjenje nakon uspjeha predstavlja dodatak običnom isteku tajmera —
bilo koji od ta dva puta može ponovo omogućiti model.

**Stanje:** blokade se čuvaju **u memoriji** (mape `Map` po procesu
`ModelLockoutEntry`, indeksirane prema `provider:connectionId:model`, dok su blokade s
tačnim opsegom indeksirane prema `provider:connectionId:exact:model`), a ne u
bazi podataka — gube se pri ponovnom pokretanju. _Postavke_ se čuvaju; aktivno
_Stanje blokade_ je prolazno.

---

## 4. Kontrola konkurentnosti dijeljenjem kvote (v3.8.36)

Pretplatnički nalozi (GLM, MiniMax itd.) često prihvataju samo ~1–3
istovremena zahtjeva; prekoračenje tog broja aktivira 429 greške i periode
hlađenja. Ovo je naročito izraženo kod kombinacija **quota-share**
(`qtSd/…`), gdje više API ključeva dijeli isti upstream nalog. Tri sloja
sprječavaju preopterećenje zajedničkog naloga.

### Ograničenje konkurentnosti po konekciji (`max_concurrent`)

Svaka konekcija provajdera može deklarisati gornju granicu
`max_concurrent`
(`provider_connections.max_concurrent`, postavljenu u modalu konekcije / API-ju / bazi podataka).
Ostavite prazno za neograničeno. Ovo je jedina postavka koja upravlja slojem
serijalizacije u nastavku — postavite je na stvarnu konkurentnost naloga
(npr. GLM ~1, MiniMax ~2).

### Ograničenja konkurentnosti po modelu (`modelConcurrency`)

Konekcija može dodatno deklarisati precizne gornje granice konkurentnosti po modelu
unutar svoje mape `rateLimitOverrides`:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Postavite ovo u modalu konekcije (**Rate limit overrides → Per-model
concurrency caps**, po jedan `model=cap` u svakom redu) ili putem
`PATCH /api/providers/[id]` s istim JSON oblikom. Značenje ključeva:

- **Ograničenje za cijelu konekciju naspram ograničenja specifičnog za model:** `maxConcurrent` ostaje zajednička
  gornja granica za cijelu konekciju. Kada se primjenjuju oba ograničenja, oba
  mehanizma se pribavljaju atomski u istom kompozitnom mehanizmu
  (`global → provider → account → model`); efektivno ponašanje određuje strože
  primjenjivo ograničenje.
- **Tačno podudaranje ključa modela:** ključ je niz modela proslijeđen izvršiocu nakon
  razrješenja rutiranja — obično osnovni upstream ID modela
  (`glm-5`), a ne pseudonim `provider/model` na strani klijenta (`zai/glm-5` se ne
  podudara s `glm-5`). Vrijednosti su gornje granice broja istovremenih zahtjeva
  izražene pozitivnim cijelim brojevima.
- **Lokalno stavljanje u red, bez otkrivanja:** zahtjevi koji prekorače ograničenje čekaju lokalno, uz
  postojeću semantiku reda čekanja/vremenskog ograničenja (tipizirane greške pri
  prijemu `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute ne otkriva niti zaključuje politiku upstreama — on
  primjenjuje tačne granice koje je konfigurisao operater. Zasićeni mehanizam
  modela nikada ne onemogućava provajdera i nikada ne stvara trajno zaključavanje
  modela; ponašanje upstreama za 429 greške/period hlađenja/rezervni izbor ostaje
  zaštita u slučaju greške.
- **Opseg po konekciji i procesu:** ograničenja se primjenjuju po konekciji iz baze podataka
  i čuvaju u memoriji, tako da dvije konekcije koje ponovo koriste isti upstream API ključ
  ne koordiniraju jedna s drugom.
- **Nekonfigurisano znači bez promjene:** izostavljanje mape (ili ostavljanje polja na
  kontrolnoj tabli praznim) ne dodaje ograničenje po modelu. Primjer konfiguracije
  bez postavljanja univerzalnog ograničenja za provajdera:

```text
glm-5=1
glm-4.7=3
```

### Serijalizacija zahtjeva dijeljenjem kvote

Kada slanje putem quota-share cilja konekciju koja ima deklarisan pozitivan
`max_concurrent`, istovremeni zahtjevi prema tom **nalogu** serijalizuju se kroz
semafor po konekciji (ključ `qsconn:<connectionId>`): zahtjevi iznad ograničenja
**čekaju u redu** umjesto da preplave nalog. Ovo je ponašanje **fail-open** —
zasićen red ili istek vremena nastavljaju obradu bez slota, umjesto da ikada
odbiju zahtjev koji se može poslati. Uključuje se u **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, podrazumijevano
uključeno). Bez ograničenja `max_concurrent`, ponašanje ostaje nepromijenjeno.

> Mehanizam rutiranja quota-share (`selectQuotaShareTarget`, DRR + P2C) sam po sebi
> je fail-open i samo _smanjuje prioritet_ konekcije koja je dostigla ograničenje — s
> bazenom od jedne konekcije ne može nametnuti tvrdo ograničenje, pa je ovaj semafor
> ono što zapravo zadržava preplavljivanje.

### Ponovni pokušaj kombinacije uzimajući u obzir period hlađenja

Za svaku strategiju kombinacije (kada je omogućena), zahtjev koji bi proizveo 429
grešku zbog KRATKOG privremenog perioda hlađenja čeka da on istekne i ponovo se
šalje umjesto vraćanja 429 greške — ovo obuhvata TPM/RPM prozore klase Gemini
(~60 s za `retry-after`) na kombinacijama s više modela, npr. kada oba cilja
kombinacije s 2 modela dosegnu ograničenje stope po modelu. Ograničeno je postavkom
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) u **Settings → Resilience**. Nikada ne čeka na
`quota_exhausted` (zaključano do ponoći) niti na razloge autentifikacije/nepostojanja.

Kombinacija može isključiti ovu funkciju pomoću `config.comboCooldownWaitEnabled: false`. Samo literalno
`false` onemogućava ova zajednička čekanja kombinacije (čekanje perioda hlađenja nakon
slanja i čekanje otvorenog prekidača/modela prije slanja) i njihovo proširenje donje
granice vremenskog budžeta čekanja. Izostavljena vrijednost ili `true` zadržava globalnu
politiku; `true` ne može globalno onemogućeno čekanje ponovo uključiti. Eksplicitni
`targetTimeoutMs` i dalje ima prednost. Ovo isključenje ne mijenja odvojeno izvorno
prethodno čekanje za vezivanje obrta native-Codexa.

Isti mehanizam obuhvata slučaj prije slanja (#16319): kada se svaki cilj
kombinacije preskoči prije bilo kakvog pokušaja jer se njegov model nalazi u
kratkotrajnom privremenom zaključavanju, putanja bez pokušaja čeka da se zaključavanje
okonča u skladu s istim granicama i ponovo šalje zahtjev, umjesto vraćanja
`503 ALL_TARGETS_SKIPPED` bez napomene. Kada čekanje nije dozvoljeno (dostignuta
granica, iscrpljen broj pokušaja ili budžet, ili je funkcija isključena), konačni
odgovor se unapređuje na `429 rate_limit_error` i sadrži
`retry_after` / `reset_at` iz najranijeg isteka privremenog zaključavanja; zaključavanja
kvote, autentifikacije i nepostojanja zadržavaju 503 bez napomene.

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

**Opseg**: lokalni red ograničenja brzine po provideru+konekciji (`open-sse/services/rateLimitManager.ts`,
zasnovan na Bottlenecku), jedan sloj ispod gornja tri mehanizma.

**`maxWaitMs` ograničava čekanje u redu; `executionMaxWaitMs` ograničava izvršavanje.**
Ovo dvoje je namjerno odvojeno, i ni jedno ne utječe na drugo.

`resilienceSettings.requestQueue.maxWaitMs` je **budžet čekanja u redu**: pokriva
čekanje na slot providera, a zatim boravak u stanju QUEUED, a njegov tajmer se
poništava u trenutku kada posao napusti QUEUED i počne se izvršavati
(`rateLimitManager.ts`, `wrappedFn`). Zahtjev koji ga prekorači nikad ne stiže do
upstreama. Zadana vrijednost je 30000ms, zadana putem `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
u `src/lib/resilience/settings.ts` i fiksirana putem
`tests/unit/ratelimit-admission-control-6593.test.ts`, tako da promjena te vrijednosti
čini taj test crvenim umjesto da ovaj paragraf tiho zastari.

`resilienceSettings.requestQueue.executionMaxWaitMs` je ono što Bottleneck
prima kao `expiration` posla, čiji tajmer počinje tek nakon slanja na izvršavanje. To je
sigurnosna granica za izvršioce bez vlastitog upstream timeouta, i podiže se
na vlastiti fetch-start timeout izvršioca kada je on duži, tako da ne može
prekinuti zdrav odgovor u toku. Zadana vrijednost je 600000ms (10 min).

Upuštanje budžeta reda u `expiration` je ono što je nekada ubijalo ne-inkrementalne
gatewaye usred obrade — oni legitimno rade minutama prije prvih bajtova —
i zato se expiration prikazuje kao `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), dok budžet reda nosi
kod timeouta reda. Poništite bilo koji putem `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) ili nadzorne ploče
(**Settings → Resilience**). Oba se pri normalizaciji ograničavaju na raspon 1ms–24h.

**Prioritet, za oba:** env varijabla daje samo _zadani_. Vrijednost
sačuvana u `resilienceSettings.requestQueue` (nadzorna ploča / API patch, pohranjena
u `key_value`) ima prednost nad njom, a vrijednost po konekciji
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` ima prednost nad tom. Postavljanje
env varijable na deploymentu koji već ima sačuvanu vrijednost stoga
ne mijenja ništa — umjesto toga očistite ili ažurirajte sačuvanu postavku.

Boravak u redu ograničen je sa `maxWaitMs`; `maxQueueDepth` ispod ograničava koliko
pozivalaca smije biti u redu istovremeno.

**Ponovni pokušaji navedeni u tijelu odgovora: tempiranje naspram blokade.** Tijelo odgovora 429 može
navesti vlastito čekanje (Gemini `RetryInfo.retryDelay`, tekst "retry after Ns"), što
`updateFromResponseBody` čita. Čekanje koje stane u `maxWaitMs` konekcije
je tempiranje: limiter prazni svoj rezervoar toliko dugo, a pozivi u redu se
šalju na izvršavanje kada se ponovno napuni. Čekanje duže od `maxWaitMs` nije nešto što
red može iščekati — Gemini odgovara na iscrpljenu dnevnu kvotu sa
`retryDelay: "86399s"`. Proslijeđeni `Retry-After` na obnovljenom 429 (#16528)
već tjera fallback mehanizam da zaključa model za taj period, ali pauziranje
limitera i zbog njega i dalje bi blokiralo svaki poziv koji stigne do ključa rano
(nakon resetovanja otpornosti, na primjer) za cijeli `maxWaitMs`. Kada takvo čekanje dolazi iz tipiziranog Google `RetryInfo`
detalja (`google_rpc_retry_info` porijeklo) i limiter ključa je
već ograničen na model (vidi `getLimiterKey`), 429 postaje blokada
modela na toj konekciji (`lockModelForLongBodyRetry` u
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, ograničeno na 24h), a
limiter ostaje nepauziran. Izbor naloga preskače tu blokadu putem
`isModelLocked()`, a isto radi i pre-dispatch kapija kombinacije za ciljeve pričvršćene na
konekciju. Na antigravityju, čiji je limiter po porodici kvota, blokada je
na tačnom modelu, kao i njegove ostale blokade kvota. Ime koje je klijent zatražio
također se zaključava kada ga je alias razriješio na taj model, jer te provjere koriste
zatraženo ime; zaključava se tačno (`lockExactModel`), tako da alias koji
prelazi granicu porodice kvota antigravityja ili opseg codexa nikada ne zaključava svoj vlastiti.
Prozna naznaka, netipizirani `retryDelay`, ili
limiter dijeljen cijelom konekcijom zadržavaju pauzu. Kada limiter koji je put 429 upravo obnovio
stvarno pauzira, pozivalac čije preostalo vrijeme u redu istječe
prije pauze se odmah odbija kodom timeouta reda
(`checkLimiterPause`), umjesto da to vrijeme iščekuje; zabilježeni kraj je
usklađen prije nego što se limiter izgradi, tamo gdje Bottleneck pokreće svoj sat osvježavanja,
i svaka kasnija promjena rezervoara ga zaboravlja. Pokriveno sa
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` i
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — opcionalno ograničenje prijema (novo).** `resilienceSettings.requestQueue.maxQueueDepth`
ograničava koliko zahtjeva smije stajati u redu (još nisu poslani na izvršavanje) za jednu
kombinaciju provider+konekcija istovremeno. Kada red već sadrži `maxQueueDepth`
zahtjeva, novi zahtjev se brzo odbija tipiziranom greškom
`code: "RATE_LIMIT_QUEUE_FULL"` **prije** nego što uopće stigne do `limiter.schedule()`
— tako da je odbijanje jeftino i dešava se prije bilo kakvog downstream
rada kompresije prompta / prevođenja za taj zahtjev. Zadano `0` =
onemogućeno, čime se čuva postojeće ponašanje neograničenog reda; ograničeno na 0–100000.
Poništite putem `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) ili
`resilienceSettings.requestQueue.maxQueueDepth` (nadzorna ploča/API patch).

Sama provjera prijema je čista funkcija
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), tako da
se može jedinično testirati bez stvarnog Bottleneck limitera.

> RFC koji je otvorio #6593 također je predložio zastavicu `bypassCompressionOnRateLimit`. Pipeline `open-sse/services/compression/` u ovom repozitoriju predstavlja kompresiju prompta/konteksta na odlaznom LLM zahtjevu (`chatCore.ts`, oko bloka `resolveCompressionSettings`/`selectCompressionStrategy`), a ne HTTP kompresiju odgovora na sintetizirana 429 tijela — ne postoji odgovarajuća putanja koda za doslovnu zastavicu zaobilaženja. Taj korak kompresije prompta također se trenutno izvršava _prije_ `withRateLimit()` u pipeline-u zahtjeva, pa je preuređivanje radi preskakanja tog koraka pri odbijanju zbog popunjenog reda zasebna, veća izmjena od opsega ovog issue-a; namjerno **nije** implementirana ovdje i ostavljena je kao naknadni zadatak ako ušteda CPU-a opravdava rizik preuređivanja.

### Sigurnosna mreža automatskog uključivanja rate-limita i zaštita konekcija (`rateLimitProtection`)

**Sigurnosna mreža automatskog uključivanja** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, zadano `true`):
Po zadanome, OmniRoute automatski uključuje zaštitu reda čekanja za rate-limit za sve aktivne konekcije API-key provajdera (`getProviderCategory(provider) === "apikey"`). To osigurava da dolazni zahtjevi prema osjetljivim upstream API ključevima budu stavljeni u red čekanja i prigušeni kroz Bottleneck, umjesto da u naletima izazovu upstream 429 greške. Sigurnosna mreža može se nadjačati putem varijable okruženja `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` je isključuje, `true`/`1`/`on` je prisilno uključuje), što ima prednost nad trajno sačuvanom postavkom na nadzornoj ploči (**Postavke → Otpornost** / `PATCH /api/resilience`).

**Semantika polja `rateLimitProtection` po konekciji:**
Zaštita od rate-limita po konekciji prati se putem boolean polja `rateLimitProtection` na konekcijama provajdera (trajno pohranjenog kao `rate_limit_protection` u SQLite):

- **Eksplicitno uključeno (`rateLimitProtection === true`)**: Zaštita od rate-limita je eksplicitno omogućena za ovu konekciju, bez obzira na kategoriju provajdera ili je li sigurnosna mreža automatskog uključivanja uključena.
- **Eksplicitno isključeno (`rateLimitProtection === false`)**: Isključuje eksplicitnu zaštitu, ali **ne** izuzima aktivnu API-key konekciju iz globalne sigurnosne mreže automatskog uključivanja. U `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` i `undefined` su ekvivalentni: samo se `rateLimitProtection === true` tretira kao eksplicitno nadjačavanje. Ako je `rateLimitProtection` `false` (ili nije postavljeno), aktivna API-key konekcija i dalje zadovoljava uvjet automatskog uključivanja i ostaje zaštićena od rate-limita.
- **Nema isključivanja po konekciji**: Operator trenutno ne može izraziti "ova jedna aktivna API-key konekcija mora raditi bez zaštite reda čekanja za rate-limit" dok automatsko uključivanje ostaje aktivno za ostale. Da bi API-key konekcije radile potpuno bez redova čekanja za rate-limit, sigurnosna mreža se mora isključiti globalno (`RATE_LIMIT_AUTO_ENABLE=false` ili `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Podržane putanje za pisanje:**

- **`POST /api/rate-limits`**: Podržana administratorska putanja za pisanje kojom se mijenja `rateLimitProtection` za konekciju (`{ connectionId: string, enabled: boolean }`). Poziv s `enabled: true` uključuje eksplicitnu zaštitu; poziv s `enabled: false` uklanja eksplicitnu zaštitu (iako aktivne API-key konekcije ostaju pokrivene globalnom sigurnosnom mrežom ako je automatsko uključivanje uključeno).
- **`PUT /api/providers/[id]`**: Namjerno **ne** prihvata niti mijenja `rateLimitProtection` (#11278). Ažuriranje metapodataka konekcije provajdera putem `PUT /api/providers/[id]` nikada neće promijeniti trajno pohranjeno stanje zaštite od rate-limita.

---

## 6. Nadzor protoka sporog toka (#9709)

Opcioni `resilienceSettings.streamRecovery.throughputWatchdog` guard detektuje uzvodno koji još uvijek šalje komade, ali proizvodi pomoćni izlaz ispod konfigurirane stope korisnog izlaza. Namjerno se razlikuje od vremenskog ograničenja mirovanja: otkucaji srca i metapodaci ne resetuju ni tajmer i ne računaju se kao napredak. Takođe se razlikuje od roka za težak pokušaj (#9153), koji ostaje apsolutni sigurnosni plafon bez obzira na kvalitet izlaza.

Watchdog-u je potreban period zagrijavanja nakon kojeg slijedi potpuni pokretni prozor prije nego što može prekinuti. On broji delte teksta iz dovršetka ćaskanja i odgovora API izlaznih događaja (konzervativni UTF-8 bajt proxy), zanemaruje događaje samo za upotrebu i prazne događaje i suspenduje prosuđivanje dok su događaji pozivanja alata ili rasuđivanja u toku. Po defaultu je onemogućen i može se omogućiti pomoću `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` (ta env vrijednost postavlja samo zadani — a sačuvani `resilienceSettings.streamRecovery.throughputWatchdog.enabled` boolean pobjeđuje; pogledajte napomenu o prioritetu env-vs-dashboard na vrhu ovog vodiča); prozor, zagrijavanje, minimalna brzina i minimalni mjerljivi izlaz su ograničeni normalnim slojem normalizacije postavki otpornosti.

Kada je omogućeno, prekid nadzora se primjenjuje samo na aktivni pokušaj upstream. Prije bilo kojeg klijenta vidljivog bajta, postojeća staza ranog oporavka istog računa može ponovo otvoriti pokušaj. Nakon urezivanja, stream se nikada ne reproducira slijepo; samo postojeći siguran ugovor o nastavku srednjeg toka može spojiti sufiks. Finalizacija ostaje jednokratna, tako da se obračun upotrebe i izdavanje semafora ne dupliraju.

---

## 7. Ponovno postavljanje statusa upstreama (pogrešno navedene greške kvote)

**Opseg:** jedan upstream gateway koji prijavljuje privremenu iscrpljenost kvote s pogrešnim HTTP statusom.

**Svrha:** ispraviti obmanjujući status PRIJE klasifikacije, kako bi downstream potrošači (fallback engine, combo agregacija, odgovor klijentu) vidjeli stvarnu mogućnost ponovnog pokušaja greške.

Neki gatewayi signaliziraju PRIVREMENU iscrpljenost kvote HTTP statusom koji ne
dozvoljava ponovni pokušaj. `agentrouter.org` vraća `403` (ponekad `400`) s
kineskim tijelom (`用户额度不足` / `额度不足`) umjesto standardnog `429`. Klijenti
kao što je Claude Code tretiraju `403` kao trajnu grešku i prekidaju sesiju, a
bez ispravke bi ga fallback engine klasifikovao kao `AUTH_ERROR` umjesto kao
događaj kvote.

**Implementacija:**

- Registar + matcher: `open-sse/config/upstreamStatusRestatement.ts` — lista
  pravila po provideru (`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`), koja se podudaraju putem `applyStatusRestatement()`.
- Mjesto poziva: blok `providerFailure:` u `open-sse/handlers/chatCore.ts`
  (oko linije 3654), odmah nakon što `parseUpstreamError()` obradi upstream
  odgovor s HTTP statusom greške (`!providerResponse.ok`) i prije pokretanja
  bilo kakve klasifikacije, tako da svaki downstream potrošač vidi ispravljeni
  status. Greške ugrađene unutar `200` SSE streama slijede zaseban, kasniji put
  parsiranja streama i danas **nisu** obuhvaćene ovom tačkom proširenja — to je
  poznato ograničenje, koje za sada nije potrebno za pogrešan status kod
  agentroutera (koji se pojavljuje kao HTTP status greške).
- Mogućnost ponovnog pokušaja: `429` se nalazi u
  `RETRY_AFTER_ELIGIBLE_STATUSES` (`open-sse/services/combo/unavailableRetryGate.ts`),
  pa ponovno postavljena greška nosi stvarni prozor za ponovni pokušaj umjesto
  da se pojavi kao neaktivni `403`.
- Sintetički `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) samo
  je ono što ponovno postavljeni odgovor saopštava **klijentu**; to samo po sebi
  nije interno trajanje hlađenja/blokiranja konekcije — njime zasebno upravlja
  mehanizam koji stvarno obrađuje ponovno postavljenu grešku (eskalirajući
  backoff Connection Cooldowna, §2, osnovnih `3s` za providere API ključeva; ili
  Model Lockout, §3, za providere kvote po modelu kao što je agentrouter).
  Router interno može postati spreman za ponovni pokušaj prije isteka prozora od
  60s koji oglašava klijentu — to je namjerno dodatno vrijeme, a ne greška.

Trajne greške (agentrouterov `无权访问模型` — nema pristupa ovom modelu) NIKADA
se ne postavljaju ponovo: `excludeMarkers` poništava pravilo čak i kada
`textMarkers` pronađu podudaranje, pa greška zadržava svoj izvorni status i
ništa je ne pokušava ponovo zauvijek. Pravilo klasifikacije odgovarajućeg
providera (`agentrouter-model-access-denied` u
`open-sse/config/providerErrorRules.ts`: `reason: "auth_error"`,
`scope: "model"`, deklarisano osnovno hlađenje od `6h`) provjerava
`checkFallbackError` (`open-sse/services/accountFallback.ts`)
_prije_ generičkog ranog povratka kategorije API ključa `FORBIDDEN`, uz uslov
`honorsRuleLockScope(provider)` (#10334 — trenutno isključivo agentrouter putem
dozvoljene liste `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u
`providerErrorRules.ts`). Deklarisano hlađenje od 6h ovog pravila prosljeđuje se
kao `fallbackResult.baseCooldownMs`, ali se i dalje koristi postojeći put
blokiranja po modelu za kvotu po modelu (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, koji je u #10334 izmijenjen samo u pogledu izvora
trajanja hlađenja): ograničava se na vrijednost `mlSettings.maxCooldownMs`
operatera (podrazumijevano `1_800_000ms` / 30min), kao i svako drugo blokiranje
modela, a _sačuvani razlog blokiranja_ ostaje postojeći hardkodirani
`"forbidden"`, a ne `"auth_error"` iz pravila — od početka do kraja uvažava se
samo trajanje hlađenja, ne i string razloga. Sama konekcija ostaje aktivna;
sestrinski modeli na istoj konekciji nisu pogođeni.

Ponovno postavljene greške kvote (`额度不足`) u produkciji dolaze do pravila
providera (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`,
`scope: "connection"`, bez sopstvenog deklarisanog hlađenja — primjenjuje se
podrazumijevani skalirani backoff sloja za trajno čuvanje). Od #10334,
`scope` u `ProviderErrorRuleMatch` SE koristi od početka do kraja, ali **samo**
za providere na dozvoljenoj listi `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
(`providerErrorRules.ts` — danas samo `"agentrouter"`, uz provjeru putem
`honorsRuleLockScope()`). Za svaki drugi provider `scope` ostaje informativan,
tačno kao i prije #10334. `checkFallbackError` izlaže opseg podudarnog pravila
kao `fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) je zajednička zaštita koja potvrđuje da je
`ruleScope` zaista sigurno uvažiti kao signal na nivou cijele konekcije koji se
sam oporavlja (opseg `"connection"`, razlog `quota_exhausted`, nikada
`permanent`, nikada `creditsExhausted` — zaštita od budućeg uparivanja opsega
`"connection"` s trajnim stanjem naloga). Pozivaju je dva potrošača:

- **Perzistencija** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  umjesto prelaska u granu blokade **po modelu** passthrough-providera
  (agentrouter ima `passthroughModels: true` → `hasPerModelQuota()`
  vraća `true`), primjenjuje **privremeno hlađenje konekcije** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, nikad terminalni status
  (`credits_exhausted`/`banned`/`expired`) — tako da se konekcija sama oporavi
  nakon isteka hlađenja, umjesto da zahtijeva ručno resetovanje vjerodajnica.
  Preskače se za konekcije sa `disableCooling: true` (#2997): ta opcija
  isključivanja umjesto toga prelazi na blokadu po modelu (dokumentovani
  kompromis — pogledajte komentar u kodu iznad grane).
- **Usmjeravanje kombinacije u istom zahtjevu** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ista zaštita označava
  konekciju u memorijskom skupu `exhaustedConnections`, s ključem
  `${provider}:${connectionId}`. Ovo preskače samo preostali cilj ISTOG ZAHTJEVA
  koji _sam već sadrži upravo taj `connectionId`_ u vlastitom objektu cilja
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` prije pretrage `exhaustedConnections`) — obična kombinacija
  sa listom modela, u kojoj susjedni ciljevi nemaju vlastiti fiksirani
  `connectionId` i jedan se razrješava po slanju iz zaglavlja odgovora
  `X-OmniRoute-Selected-Connection-Id`, nikad ne dolazi do tog podudaranja
  ključa. U tom uobičajenom slučaju stvarna zaštita od toga da preostala
  dionica ponovo upotrijebi upravo iscrpljeni nalog NIJE ovaj skup — to je
  sloj perzistencije iznad (konekcijin `rateLimitedUntil` sada je u budućnosti)
  u kombinaciji s tim da ista zaštita potiskuje `transientRateLimitedProviders`
  za ovaj neuspjeh (pogledajte „Dvorazinski dizajn“ i komentar u kodu na grani
  `isAgentrouterConnectionQuotaScope` u `targetExhaustion.ts`): pošto taj skup
  ostaje neoznačen, `combo.ts`-ovo prisilno dopuštanje
  `allowRateLimitedConnection` (`open-sse/services/combo.ts:1005-1013`,
  `:2734-2738`) NE aktivira se za preostale dionice tog providera, pa se
  normalno primjenjuje filter `rateLimitedUntil` pri izboru vjerodajnica
  (`src/sse/services/auth.ts:1238`), a preostala dionica ili bira drugu,
  još uvijek prihvatljivu agentrouter konekciju ili ne uspijeva jer nema
  dostupnih vjerodajnica — ne prisiljava svoj put nazad na konekciju koju je
  ova grana upravo stavila na hlađenje.

### Dvorazinski dizajn: ponovno navođenje statusa, zatim klasifikacija

Ponovno navođenje statusa (`upstreamStatusRestatement.ts`) i pravila
klasifikacije providera (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) zasebni su registri koji se oba oslanjaju na
identifikator providera i tekstualne oznake, ali se izvršavaju na različitim
mjestima i služe različitim svrhama: ponovno navođenje rano prepisuje HTTP
status u `chatCore.ts`; pravila klasifikacije biraju rezervni `reason` i
zaključavaju `scope` (`model` / `provider` / `connection`) unutar
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Pravila klasifikacije vide samo puni **tekst** greške (potreban za
podudaranje s oznakama u tijelu, kao što je `额度不足`) za providere navedene
na listi dopuštenih `FULL_TEXT_RULE_PROVIDERS` u `providerErrorRules.ts` —
trenutno samo `"agentrouter"`. Za svaki drugi **ugrađeni** provider iz kataloga,
`checkFallbackError` prosljeđuje `getProviderErrorRuleMatch` samo strukturiranu
grešku (`{code, type}`), što je dovoljno za pravila zasnovana na zaglavlju,
statusu ili kodu, ali ne vidi oznake u tekstu tijela. Pomoćnik
`resolveRuleMatchBody()` vrši ovaj odabir: puni tekst greške za providere na
listi dopuštenih, a strukturiranu grešku u suprotnom. Dodavanje **ugrađenog**
providera u `FULL_TEXT_RULE_PROVIDERS` izričito je uključivanje po provideru —
ono postoji kako bi podrazumijevana putanja za svaki provider koji nije na listi
ostala nepromijenjena bajt po bajt.

`scope` pravila (`model` / `provider` / `connection`) zasebna je opcija
uključivanja u odnosu na `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` ga
izlaže samo kao `fallbackResult.ruleScope`, a nizvodni potrošači ga poštuju kao
bilo šta drugo osim informativne oznake samo za providere na listi
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` u istoj datoteci (kontrolisano putem
`honorsRuleLockScope()` — danas samo `"agentrouter"`). Pogledajte „Ponovno
navedene greške kvote“ iznad za objašnjenje šta podudaranje
`scope: "connection"` zapravo radi kada je provider na toj listi dopuštenih.

**#11104 — pravila koja je deklarisao operator zaobilaze obje liste dopuštenih.**
Operator može tokom rada deklarisati pravilo po provideru putem
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
bez uređivanja ove datoteke. Ograničavanje pravila operatora listama
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — listama čija je
svrha zaštita **podrazumijevanog** ponašanja pravila ugrađenog kataloga — učinilo
bi mehanizam postavki neaktivnim za svaki provider osim onih koji su već
navedeni, jer je deklarisanje pravila već izričito uključivanje od strane
operatora. `resolveRuleMatchBody()` i `honorsRuleLockScope()` najprije
provjeravaju `hasOperatorRuleForProvider()`: provider s pravilom operatora
dobija sirovi tekst greške i njegovo deklarisano `scope` se poštuje, bez obzira
na to pojavljuje li se i na jednoj od lista dopuštenih.

**Pravila koja je deklarisao operator** (`OperatorProviderErrorRule`): svako
pravilo ima opcionalni `status` i opcionalni `match` (običan podstring teksta
greške bez obzira na velika i mala slova, nikad RegExp, tako da ne može
uzrokovati ReDoS), a mora postaviti barem jedno od ta dva. Kada su oba
postavljena, primjenjuje se AND; izostavljeno polje podudara se sa bilo čim,
pa `{match: "insufficient_quota"}` odgovara svakom statusu koji sadrži taj kod.
Pobjeđuje prvo pravilo koje se podudara. `cooldownMs` prihvata najviše 30 dana;
ukupno je dozvoljeno najviše 50 pravila.

**Zadane podrazumijevane vrijednosti za sve slučajeve** (`settings.providerErrorDefaults`, opcionalno, postavlja se putem
`setOperatorProviderErrorDefaults`): `{[provider]: {cooldownMs, scope?, reason?}}`
sa `cooldownMs` od 1 minute do 30 dana. Podrazumijevana vrijednost primjenjuje se samo kada se nijedno operatorsko pravilo i nijedno pravilo ugrađenog kataloga ne podudara, i samo na greške 402, 403, 408, 429 i 5xx. Greške oblika zahtjeva (400, 404, 409, 413, 422) i samostalne greške 401 zadržavaju vlastitu obradu. Bez eksplicitnog `reason`, razlog se određuje prema statusu, na isti način kao što to radi `classifyError`. Deklarisanje podrazumijevane vrijednosti računa se kao operatorsko pravilo za `hasOperatorRuleForProvider()`, pa se njegov `scope` (podrazumijevano
`"connection"`) poštuje. Efektivni cooldown podrazumijevane vrijednosti je duži od njenog `cooldownMs` i vlastite upute pružaoca za ponovno pokušavanje (`Retry-After`,
`x-ratelimit-reset` ili uputa za reset u tijelu, ista uputa koju engine poštuje kada je postavka connection-cooldown „use upstream retry hints“ uključena),
tako da podrazumijevana vrijednost može produžiti kratku uzvodnu uputu, ali nikada ne može skratiti stvarni reset. Eksplicitno operatorsko pravilo zadržava svoj tačni `cooldownMs`. Ni pravilo ni podrazumijevana vrijednost ne zaobilaze zaštite connection-cooldowna u `markAccountUnavailable`: aktivni, duži cooldown se nikada ne skraćuje, a terminalni status se nikada ne prepisuje. Ugrađeni detektori teksta koji se ranije izvršavaju u `checkFallbackError` (iscrpljeni krediti, dnevna kvota, račun deaktiviran) i dalje imaju prednost za vlastite fraze.

**Poznata praznina — `providerRuleRegistry` se nikada ne provjerava za HTTP 400.**
Grana `BAD_REQUEST` u `checkFallbackError` klasifikuje status 400 isključivo putem vlastitih nizova obrazaca (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` itd. u `accountFallback.ts`) i vraća rezultat prije nego što se dođe do grane `configuredRule`/`getProviderErrorRuleMatch` iznad nje.
Ugrađeno pravilo kataloga (ili operatorsko pravilo) sa `status: 400` sintaksno je ispravno, ali se nikada neće aktivirati. Nijedno postojeće pravilo danas ne cilja 400, pa to ne utiče ni na šta u produkciji — ali buduće pravilo za 400 prvo zahtijeva izmjenu ove grane, što je veća promjena od dodavanja pravila (ona ponovo klasifikuje 400 za svakog pružaoca koji se već oslanja na ponašanje nizova obrazaca) i izvan je obuhvata dodavanja pravila za jednog pružaoca.

### Dodavanje novog gatewaya koji pogrešno navodi kvotu

1. Registrujte jedan niz pravila u
   `statusRestatementRegistry` (`open-sse/config/upstreamStatusRestatement.ts`). Neka `textMarkers`
   budu specifični za pružaoca; nikada nemojte ponovo koristiti generičke engleske fraze koje se preklapaju sa
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Po želji registrujte pravila klasifikacije u
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) kako biste odabrali odgovarajući opseg zaključavanja
   (`connection` za kvotu na nivou računa, `model` za greške po modelu). Ovaj korak u produkciji djeluje samo na pružaoce čija pravila zahtijevaju puni tekst greške (markere u tijelu): dodajte identifikator pružaoca u `FULL_TEXT_RULE_PROVIDERS` u istoj datoteci — u suprotnom `checkFallbackError` pravilu prosljeđuje samo strukturiranu grešku
   `{code, type}`, pa se pravilo koje koristi tekst tijela nikada neće podudariti sa stvarnim saobraćajem.
   Pravila koja se podudaraju isključivo na osnovu `status`/`headers` (kao Opencodeova ili Minimaxova) ne zahtijevaju ovu opciju. Odvojeno od toga, ako pravilo navodi `scope: "connection"` i namjera je stvarni cooldown na nivou konekcije uz preskakanje kombinacije za isti zahtjev (a ne samo informativna oznaka), dodajte identifikator pružaoca u `HONORS_RULE_LOCK_SCOPE_PROVIDERS` u istoj datoteci — to određuje da li se koristi potrošnja u stilu `isAgentrouterConnectionQuotaScope()` u `markAccountUnavailable()` (`src/sse/services/auth.ts`) i
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); bez toga `scope`
   i dalje prolazi kroz `fallbackResult.ruleScope`, ali ništa ne djeluje na osnovu njega.
3. Dodajte jedinične testove po uzoru na
   `tests/unit/upstream-status-restatement.test.ts`
   i `tests/unit/agentrouter-error-rules.test.ts` (uključujući zaštite not-permanent / not-creditsExhausted, i — ako pružaocu treba allowlista — test kojim se potvrđuje da `resolveRuleMatchBody()` vraća puni tekst samo za tog pružaoca).

Nisu potrebne izmjene u `chatCore.ts`, `classifyError` ili combo.

#### Zaključavanje po izlaznoj grupi (#10880)

Pružaoci u `EGRESS_BUCKETED_LOCK_PROVIDERS` (porodica opencode) tretiraju se kao upstream grupisan po IP adresi (opencode besplatni nivo grupisan je po IP adresi, a ne po računu — pogledajte #9611): status-429 klasifikovan kao
`quota_exhausted` **ili** `rate_limit_exceeded` pokreće cooldown za svaku konekciju iz dozvoljene porodice čija se posljednja poznata izlazna IP adresa podudara s adresom neuspješne konekcije, prije nego što rotacija može pokušati s njima
— čime se izbjegavaju N-1 upstream poziva za koje je neuspjeh zagarantovan (isti obrazac kao kod #10460/#10525).
`rate_limit_exceeded` je namjerno uključen: na putanji `markAccountUnavailable` pravila specifična za opencode nikada se ne podudaraju (zaglavlja/tijelo se ne prosljeđuju u `checkFallbackError`, a opencode nije u `FULL_TEXT_RULE_PROVIDERS`), pa se 429 čije tijelo sadrži tekst o kvoti pretplate („monthly usage limit
reached“) klasifikuje kao `quota_exhausted` pomoću rezervne klasifikacije na osnovu teksta kvote
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown od 1 sata) prije nego što se dođe do pravila `status_429` — dok se 429 bez teksta o kvoti (obično ograničavanje brzine) klasifikuje putem pravila `status_429` kao `rate_limit_exceeded` i i dalje hladi IP porodicu. Za pružaoca na allowlisti, ograničenje brzine po IP adresi isti je signal kao iscrpljena kvota. Realna ograničenja:

- **Najbolji mogući napor**: zaključavanje razrješava posljednji poznati `egress_ip` konekcije
  iz `proxy_logs` (prozor od 24 h, sinhrono, bez keširanja). Hladni keš (`egress`
  IP nikad nije provjeren) ili nepostojeći red → neuspjela konekcija se i dalje hladi
  putem grane (zabilježeno kao i danas), samo se nijedna sestrinska konekcija ne zaključava.
- **Nikad terminalno**: hlađenje je obnavljajući kvotni prozor
  (`testStatus: "unavailable"`); trajno stanje se nikad ne izvodi iz signala na nivou IP-a.
  Konekcije sa `disableCooling` u potpunosti preskaču ovu granu.
- **Granularnost zaključavanja mijenja se za porodicu na allowlisti**: ovo je promjena opsega,
  a ne samo optimizacija sestrinskih konekcija. opencode je `passthroughModels`
  provajder, pa je prije ove grane 429 proizvodio zaključavanje po MODELU; sada
  proizvodi hlađenje konekcije — uključujući i operatora koji pokreće jednu
  konekciju bez ijedne sestrinske konekcije. To je granularnost koju tabela pravila za opencode
  već proglašava ispravnom (`scope: "connection"`,
  `providerErrorRules.ts`), ali do sada nikad nije bila primijenjena jer opencode nije u
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Grana sama upisuje hlađenje neuspjele
  konekcije + `backoffLevel`, po uzoru na granu agentroutera sa opsegom konekcije, i vraća se —
  blokada po modelu i generička putanja ispod nikad se ne dosežu.
- **Combo je uključen**: poput grane agentroutera, opseg namjerno zanemaruje
  snižavanje `persistUnavailableState`/`isCombo` koje combo pozivalac primjenjuje na 429.
  Zaključavanje po modelu nije slabiji oblik ovog opsega, već je pogrešna jedinica:
  ne govori ništa o iscrpljenom IP-u, pa bi combo rotacija nastavila trošiti jedan
  sigurno neuspjeli poziv po sestrinskoj konekciji.
- **Sigurnost sestrinskih konekcija**: sestrinska konekcija koja je već terminalna (banned/credits_exhausted)
  ili je već u dužem hlađenju nikad se ne prepisuje.
- **Ekskluzivna allowlista**: proširivanje `EGRESS_BUCKETED_LOCK_PROVIDERS` je
  izričita odluka vlasnika; nema generičkog povezivanja (obrasci #10334/#10419). Upit za
  sestrinske konekcije koristi tu istu allowlistu, umjesto da je ponavlja kao SQL
  literal, tako da njeno proširivanje ostaje promjena u jednom redu.
- **Rotacija izlaznog IP-a, u oba smjera**: prozor pretrage (24 h) mnogo je
  širi od TTL-a keša izlaznog IP-a (5 min), pa je „posljednji poznati IP“ historija,
  a ne trenutno stanje. Ako je proxy konekcije rotirao unutar prozora, zaključavanje može
  **promašiti** zaista dijeljeni IP (zabilježeni IP je novi, još uvijek neiscrpljeni) —
  i simetrično može **ohladiti sestrinsku konekciju koja je od tada rotirala**
  s iscrpljenog IP-a. Drugi slučaj toj sestrinskoj konekciji oduzima jedan prozor
  hlađenja; oba slučaja su prihvaćena ograničenja najboljeg mogućeg napora zasnovanog na
  pretrazi historije.
- **Cijena**: dva ograničena skeniranja `proxy_logs` (filtrirana prema prozoru putem
  `idx_pl_timestamp`), samo pri učestalosti 429 grešaka. Nema novog indeksa (migracija 134
  YAGNI). Mjereno na kopiji baze sa stvarnim saobraćajem umjerene veličine; instanca
  visokog protoka zadržava proporcionalno više redova u istom prozoru.

## Ostale značajke otpornosti

- **20 strategija rutiranja** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — pogledajte [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Rutiranje svjesno reseta** (v3.8.0) — daje prioritet konekcijama prema vremenu reseta kvote.
- **Degradacija pozadinskog režima** — Responses API s `background: true` degradira se na sinhroni rad uz upozorenje.
- **Dinamičko otkrivanje ograničenja alata** — usporava providere kada se dostigne ograničenje broja alata.
- **Hitni fallback** — kontrolira se putem `OMNIROUTE_EMERGENCY_FALLBACK`; operatori ga mogu nadjačati sa stranice Feature Flags bez ponovnog pokretanja.

---

## Otklanjanje grešaka

- Weighted combo odgovara sa `503 all_targets_cooling_down` (postavljen `Retry-After`, `diagnostics.excluded` navodi svaki cilj sa `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pool je konfiguriran i povezan, svaki cilj je samo isključen tajmerom otpornosti; upozorenje `[COMBO] Weighted selection: every target excluded before dispatch — …` navodi razloge i preostale sekunde. `404 no_executable_targets` iz istog combo-a znači da nijedan tajmer otpornosti nije bio uključen (nema ničega za izvršavanje, ili svaki račun nije prošao provjeru dostupnosti). Izgrađeno u `open-sse/services/combo/pinRecovery.ts` na osnovu isključenja prikupljenih u `targetResolution.ts`.
- Svi ključevi providera preskočeni → provjerite i stanje circuit breakera I `rateLimitedUntil`/`testStatus` svake konekcije.
- Provider trajno isključen nakon prozora reseta → kod čita sirovi `state` umjesto `getStatus()`/`canExecute()`.
- Jedan ključ ne radi, ostali bi trebali raditi → dajte prednost cooldown-u konekcije ispred circuit breakera.
- Samo jedan model ne radi → dajte prednost model lockout-u ispred cooldown-a konekcije.
- Stanje bi se trebalo samo oporaviti, ali to ne čini → provjerite vremensku oznaku u budućnosti + putanju čitanja koja osvježava isteklo stanje. Trajni statusi zahtijevaju ručne izmjene.

---

## Stanje u vrijeme izvršavanja — brza referenca za agente

> Doslovno preneseno iz `AGENTS.md` → "Resilience Runtime State" (PR #12743) kako bi
> vodič za agente ostao ispod budžeta konteksta od 40k. Ovo je sažeti prikaz gornjih
> odjeljaka namijenjen agentima; numerirani odjeljci ostaju potpuna referenca.

OmniRoute ima tri povezana, ali različita mehanizma za privremene kvarove. Prilikom
otklanjanja grešaka u ponašanju rutiranja držite njihove opsege odvojenima. Pogledajte
[dijagram otpornosti u 3 sloja](../diagrams/exported/resilience-3layers.svg)
(izvor: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
kao mapu za brzi pregled.

### Circuit breaker providera

**Opseg**: cijeli provider, npr. `glm`, `openai`, `anthropic`.

**Svrha**: zaustaviti slanje prometa provideru koji uzastopno ne uspijeva na
upstream/servisnom nivou, kako jedan neispravan provider ne bi usporavao svaki zahtjev.

**Implementacija**:

- Osnovna klasa: `src/shared/utils/circuitBreaker.ts`
- Povezivanje chat gate-a/izvršavanja: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API statusa u vrijeme izvršavanja: `src/app/api/monitoring/health/route.ts`
- Dijeljeni wrapperi: `open-sse/services/accountFallback.ts`
- Tabela trajnog stanja: `domain_circuit_breakers`

**Stanja** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normalan promet je dozvoljen.
- `DEGRADED`: zona ranog upozorenja — kvarovi su prešli prag degradacije, ali još ne i
  prag breakera; promet i dalje teče, nadzorne ploče prikazuju upozorenje. Važeći test
  konekcije ili miran period bez novih kvarova vraća ga u `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` sadrži podatke o tom prozoru).
- `OPEN`: provider je privremeno blokiran; pozivaoci dobijaju odgovor da je circuit
  providera otvoren, ili combo rutiranje prelazi na drugi cilj.
- `HALF_OPEN`: vrijeme reseta je isteklo; dozvoljava se probni zahtjev. Uspjeh zatvara
  breaker, neuspjeh ga ponovo otvara.

**Zadane vrijednosti** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, koriste se putem
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` u `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` u `src/sse/handlers/chatHelpers.ts`). Breaker cijelog
providera radi na osnovu `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profil    | degradira na | otvara se na (`circuitBreakerThreshold`) | reset (`circuitBreakerReset`) |
| --------- | -----------: | ---------------------------------------: | ----------------------------: |
| OAuth     |          `5` |                                      `8` |                         `60s` |
| API ključ |          `7` |                                     `12` |                         `30s` |
| Lokalni   |   (izvedeno) |                                      `2` |                         `15s` |

`PROVIDER_PROFILES` također definiše `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 min) i `providerCooldownMs` (5/10/1 min): oni pokreću
**prozorsku barijeru opcionalnog globalnog Provider Cooldown-a** (`PROVIDER_COOLDOWN_ENABLED`,
zadano isključeno) — unos na nivou providera u `open-sse/services/providerCooldownTracker.ts`
smatra se hlađenjem tek nakon `providerFailureThreshold` kvarova unutar
`providerFailureWindowMs`, a zatim se hladi tokom `providerCooldownMs`. Oni NISU pragovi
aktivnog breakera — nemojte ih podešavati očekujući ponašanje breakera. Svaku zadanu
vrijednost moguće je nadjačati putem env varijabli `OMNIROUTE_PROVIDER_BREAKER_*` i
`OMNIROUTE_CIRCUIT_BREAKER_*`; referentna tabela koja odgovara stvarnom radu nalazi se u
`docs/architecture/RESILIENCE_GUIDE.md`.

Samo statusi kvarova na nivou providera smiju aktivirati breaker providera:

```ts
(408, 500, 502, 503, 504);
```

Nemojte aktivirati breaker cijelog providera zbog uobičajenih grešaka računa/ključa/modela,
kao što su većina slučajeva `401`, `403` ili `429`. One obično pripadaju cooldown-u
konekcije ili model lockout-u. Generički `403` providera s API ključem trebao bi biti
oporavljiv, osim ako se ne klasificira kao terminalna greška providera/računa.

Prekidač koristi lijeni oporavak, a ne pozadinski tajmer. Kada `OPEN` istekne, čitanja poput `getStatus()`, `canExecute()` i `getRetryAfterMs()` osvježavaju stanje na `HALF_OPEN`, tako da nadzorne ploče i graditelji kombinovanih kandidata ne nastavljaju zauvijek isključivati provajder čije je ograničenje isteklo.

### Hlađenje konekcije

**Opseg**: jedna konekcija/račun/ključ provajdera.

**Svrha**: privremeno preskočiti jedan loš ključ/račun, dok ostale konekcije za istog provajdera nastavljaju opsluživati zahtjeve.

**Implementacija**:

- Putanja za pisanje/ažuriranje: `src/sse/services/auth.ts::markAccountUnavailable()`
- Izbor/filtriranje računa: `src/sse/services/auth.ts::getProviderCredentials...`
- Izračun hlađenja: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Postavke: `src/lib/resilience/settings.ts`

Važna polja na konekcijama provajdera:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Tokom izbora računa, konekcija se preskače dok vrijedi:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Hlađenja su također lijena: kada `rateLimitedUntil` bude u prošlosti, konekcija ponovo postaje podobna. Prilikom uspješne upotrebe, `clearAccountError()` briše `testStatus`, `rateLimitedUntil`, polja greške i `backoffLevel`.

Zadano ponašanje hlađenja konekcije:

- Osnovno hlađenje za OAuth: `5s`.
- Osnovno hlađenje za API ključ: `3s`.
- `429` za API ključ treba dati prednost upstream nagovještajima za ponovni pokušaj (`Retry-After`, zaglavlja resetovanja ili tekst resetovanja koji se može parsirati) kada su dostupni.
- Ponovljeni neuspjesi koji se mogu otkloniti koriste eksponencijalno postepeno povećanje:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Zaštita od „thundering herd“ efekta sprječava da istovremeni neuspjesi na istoj konekciji višestruko produžavaju hlađenje ili dvostruko inkrementiraju `backoffLevel`.

Terminalna stanja nisu hlađenja. `banned`, `expired` (koje postaje terminalno tek nakon N ograničenih ponovnih pokušaja preko `EXPIRED_RETRY_MAX`) i `credits_exhausted` namijenjena su da ostanu nedostupna dok se kredencijali/postavke ne promijene ili ih operater ručno resetuje. Nemojte prepisivati terminalna stanja prolaznim stanjem hlađenja.

### Blokada modela

**Opseg**: provajder + konekcija + model.

**Svrha**: izbjeći onemogućavanje cijele konekcije kada je samo jedan model nedostupan ili ograničen kvotom za tu konekciju.

Primjeri:

- Provajderi s kvotom po modelu koji vraćaju `429`.
- Lokalni provajderi koji vraćaju `404` za jedan model koji nedostaje.
- Neuspjesi dozvola za način rada/model specifičnih za provajdera, poput odabranih Grok načina.

Blokada modela nalazi se u `open-sse/services/accountFallback.ts` i omogućava istoj konekciji da nastavi opsluživati druge modele.

### Smjernice za otklanjanje grešaka

- Ako su svi ključevi za nekog provajdera preskočeni, pregledajte i stanje prekidača provajdera i `rateLimitedUntil`/`testStatus` svake konekcije.
- Ako se čini da je provajder trajno isključen nakon prozora resetovanja, provjerite čita li kod sirovo `state` umjesto da koristi `getStatus()`/`canExecute()`.
- Ako jedan ključ provajdera ne uspije, a drugi bi trebali raditi, dajte prednost hlađenju konekcije nad prekidačem provajdera.
- Ako samo jedan model ne uspije, dajte prednost blokadi modela nad hlađenjem konekcije.
- Ako se neko stanje treba samo oporaviti, treba imati buduću vremensku oznaku/istek za resetovanje i putanju čitanja koja osvježava isteklo stanje. Trajni statusi zahtijevaju ručne izmjene kredencijala ili konfiguracije.

---

## TLS otisci prstiju i prikrivanje (stealth)

Prikrivanje specifično za provajdera (JA3/JA4, CCH, obfuskacija) dokumentirano je zasebno — pogledajte `docs/security/STEALTH_GUIDE.md` (git; nije kompajlirano u `/docs`).

---

## Testiranje otpornosti (Faza 8 · Blok C)

Pored jediničnih testova za logiku otpornosti, tri testa izlažu runtime stvarnim
uslovima stresa/kvarova (svi su integracijski/noćni — nijedan ne blokira PR-ove):

| Test        | Šta                                                                                                                                                                                            | Pokretanje                             |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Chaos       | Lažni upstream čvor ubacuje stvarno kašnjenje/reset/timeout/503; potvrđuje da se prekidač kruga otvara/oporavlja i da `checkFallbackError` klasificira 503 kao fallback koji se može sanirati. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Rast heap-a | ~500 streamova po `createSSEStream` pod `--expose-gc`; pada ako heap poraste iznad granice (OOM zaštita #3069).                                                                                | `npm run test:heap`                    |
| k6 soak     | Trajno opterećenje na `/api/monitoring/health`; p95/pragovi grešaka.                                                                                                                           | `k6 run tests/load/k6-soak.js` (noćno) |

Orkestrirano putem `.github/workflows/nightly-resilience.yml` (cron + dispatch). U
zadanom `test:integration`, chaos i heap testovi se sami preskaču (bez `RUN_CHAOS_INT`/`--expose-gc`).

---

## Pogledajte također

- [Vodič kroz arhitekturu](./ARCHITECTURE.md) — Arhitektura sistema i unutrašnje komponente
- [Korisnički vodič](../guides/USER_GUIDE.md) — Provajderi, kombinacije, CLI integracija
- [Auto-Combo mehanizam](../routing/AUTO-COMBO.md) — Bodovanje po 16 faktora, paketi režima
