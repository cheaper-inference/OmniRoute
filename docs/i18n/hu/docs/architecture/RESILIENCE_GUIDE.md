# Resilience Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

Az OmniRoute három különálló, de egymással összefüggő reziliencia-mechanizmussal rendelkezik. Mindegyiknek eltérő hatóköre és célja van. Az útválasztási viselkedés hibakeresésekor tartsa őket külön.

![3 rétegű reziliencia-modell](../diagrams/exported/resilience-3layers.svg)

> Forrás: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

> **A környezeti változók és a vezérlőpult prioritása a reziliencia kapcsolóinál.** A környezetből inicializált, bekapcsolást igénylő
> reziliencia-kapcsolók — `QUOTA_PREFLIGHT_CUTOFF_ENABLED`,
> `PROVIDER_COOLDOWN_ENABLED`, `STREAM_RECOVERY_ENABLED`,
> `STREAM_RECOVERY_MIDSTREAM_ENABLED`, `STREAM_THROUGHPUT_WATCHDOG_ENABLED` —
> csak az _alapértelmezést_ (`DEFAULT_RESILIENCE_SETTINGS`,
> `src/lib/resilience/settings.ts`) biztosítják. A
> `resilienceSettings` értékben mentett logikai érték (Vezérlőpult →
> **Beállítások → Reziliencia** / `PATCH /api/resilience`, a
> `key_value` értékben tárolva) elsőbbséget élvez a környezeti változó értékével
> szemben: a normalizálás (`toBoolean`,
> `src/lib/resilience/settings/normalize.ts`) megtartja a mentett logikai
> értéket, ha az létezik. Ezért ha egy ilyen környezeti változót `true` értékre
> állít egy olyan telepítésen, ahol a vezérlőpult már `false` értéket mentett,
> az nem változtat semmin — inkább kapcsolja át a kapcsolót a
> **Beállítások → Reziliencia** oldalon (vagy törölje a mentett mezőt).

## 1. Szolgáltatószintű circuit breaker

**Hatókör:** a teljes szolgáltató (pl. `glm`, `openai`, `anthropic`).

**Cél:** leállítani a forgalom küldését egy olyan szolgáltató felé, amely az upstream/szolgáltatási szinten ismételten meghibásodik.

**Megvalósítás:**

- Központi osztály: `src/shared/utils/circuitBreaker.ts`
- Bekötés: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Státusz API: `GET /api/monitoring/health`
- Visszaállítási API: `POST /api/resilience/reset`
- Befoglalók (wrapper): `open-sse/services/accountFallback.ts`
- Adatbázis-tábla: `domain_circuit_breakers`

**Állapotok:**

- `CLOSED` — a normál forgalom engedélyezett
- `DEGRADED` — a forgalom továbbra is engedélyezett, de a rendszer nyomon követi a megnövekedett szolgáltatói hibákat; visszatér `CLOSED` állapotba elegendő sikeres kérés után, érvényes kapcsolatteszt esetén, vagy ha az utolsó hibatípushoz tartozó leghosszabb `OPEN` tartás (annak `cooldownByKind` értéke, ennek hiányában a `resetTimeout`, × `maxBackoffMultiplier`, de legalább egy cooldown) új hiba nélkül eltelik
- `OPEN` — a szolgáltató ideiglenesen blokkolva; a combo útválasztás kihagyja
- `HALF_OPEN` — a visszaállítási időtúllépés lejárt; próbakérés engedélyezett

**Konfigurálható alapértékek (`open-sse/config/constants.ts`, elérhetők: Dashboard → Settings → Resilience):**

| Osztály | Degradálódik  | Kinyit  | Visszaállítási időtúllépés |
| ------- | ------------- | ------- | -------------------------- |
| OAuth   | 5 hiba        | 8 hiba  | 60s                        |
| API-key | 7 hiba        | 12 hiba | 30s                        |
| Local   | származtatott | 2 hiba  | 15s                        |

A `degradationThreshold` szabályozza, hogy a szolgáltató mikor lép `DEGRADED` állapotba; a `failureThreshold` azt szabályozza, hogy mikor nyit ki és kerül kihagyásra. A helyi (local) szolgáltatói profilok egyelőre nem érhetők el a Resilience beállítási oldalon.

**Kioldó kódok:** csak szolgáltatói szintű státuszok: `[408, 500, 502, 503, 504]`. NE oldjon ki fiókszintű hibákra (a legtöbb 401/403/429 — ezek a cooldownhoz vagy a lockouthoz tartoznak).

**Lusta (lazy) felépülés:** amikor az `OPEN` lejár, a `getStatus()`, `canExecute()`, `getRetryAfterMs()` `HALF_OPEN` állapotra frissít. Ugyanezek a lekérdezések (és a következő hiba) az elavult `DEGRADED` állapotot is visszafokozzák `CLOSED` értékre. Háttéridőzítőre nincs szükség.

---

### Opcionális (opt-in) globális szolgáltatói cooldown (ablakkapu)

Egy negyedik, **opt-in** réteg (`PROVIDER_COOLDOWN_ENABLED`, alapértelmezetten **ki**) kérések közötti memóriát tart fenn a hibázó szolgáltatókról az
`open-sse/services/providerCooldownTracker.ts` fájlban; ezt a combo célfeloldás kérdezi le, így az egymást követő combo kérések nem járnak be újra egy éppen meghibásodott szolgáltatót. A szolgáltatói szintű bejegyzések a `PROVIDER_PROFILES` ablakkaput követik:

| Profil  | kiold ennyi után (`providerFailureThreshold`) | ezen az ablakon belül (`providerFailureWindowMs`) | ennyi ideig hűl (`providerCooldownMs`) |
| ------- | --------------------------------------------: | ------------------------------------------------: | -------------------------------------: |
| OAuth   |                                          `10` |                                           `15min` |                                 `5min` |
| API key |                                          `15` |                                           `30min` |                                `10min` |

A küszöbérték alatt a szolgáltató **nem** minősül hűlés alatt állónak; egy sikeres kérés törli az ablakot. A kapcsolatszintű bejegyzések (`provider:connectionId`) ehelyett az exponenciális `minRetryCooldownMs → maxRetryCooldownMs` backoffot tartják meg. Felülírások:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regressziós ellenőrzés: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Kapcsolatlehűtés

**Hatókör:** egyetlen szolgáltatói kapcsolat/fiók/kulcs.

**Cél:** egy hibás kulcs kihagyása, miközben ugyanazon szolgáltató többi kapcsolata továbbra is kiszolgál.

**Implementáció:**

- Elérhetetlenné jelölés: `src/sse/services/auth.ts::markAccountUnavailable()`
- Kiválasztás: `getProviderCredentials*` ugyanebben a fájlban
- Lehűtés számítása: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Beállítások: `src/lib/resilience/settings.ts`

**Kapcsolatonkénti mezők:**

- `rateLimitedUntil` — időbélyeg, ameddig a lehűtés lejár
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — exponenciális visszalépési számláló

**Alapértelmezett lehűtési idők:**

- OAuth alapérték: 5s
- API-kulcs alapérték: 3s
- API-kulcs 429: előnyben részesíti a felsőbb szintű `Retry-After`/reset fejléceket/értelmezhető reset-szöveget
- Visszalépés: `baseCooldownMs * 2 ** failureIndex`

**Szolgáltatónkénti újrapróbálkozási késleltetés.** A szolgáltató részletezőoldalán található egy **Újrapróbálkozási késleltetés** választómező (Auto,
15s és legfeljebb 1h között). Ez a `resilienceSettings.providerQuotaOverrides[<providerId>].rateLimitCooldownSeconds`
értéket menti (1–21600, a `PATCH /api/resilience` végponton keresztül). Ha egy sebességkorlátozási hiba nem tartalmaz felsőbb szintű újrapróbálkozási
útmutatást, ez az érték lecseréli a szolgáltatóhoz skálázott visszalépést, és a `backoffLevel` értékét 0-ra állítja
(`open-sse/services/rotationConfig.ts::overrideFor`). Sebességkorlátozott hiba esetén az elsőbbségi sorrend a legmagasabbtól: felsőbb szintű újrapróbálkozási útmutatás, majd kapcsolatspecifikus `providerSpecificData.rotationOverrides.rateLimitResetSeconds`,
majd a szolgáltatónkénti újrapróbálkozási késleltetés, majd az
`OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS` környezeti változó, végül a skálázott visszalépés. Az Auto eltávolítja a mezőt. Ez csak a sebességkorlátozási okra van hatással, a terminális állapotokra soha.

**A sok egyidejű próbálkozást megakadályozó védelem:** megakadályozza, hogy az egyidejű hibák túlzottan meghosszabbítsák a lehűtést, vagy kétszer növeljék a `backoffLevel` értékét.

**A konkurenciakorlát miatti 429-es hibák nem lépnek feljebb a visszalépési létrán.** Az a `429`, amelynek törzse konkurenciakorlátot jelent ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`), azt jelenti, hogy a fiók egészséges, de foglalt.
A `checkFallbackError()` `concurrency_limited` okot ad vissza: azonnal váltson át a következő
kapcsolatra, ezt a kapcsolatot rögzített `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) értékkel vagy a felsőbb szintű újrapróbálkozási útmutatás alapján hűtse le, hagyja változatlanul a `backoffLevel` értékét, és állítsa be a `skipProviderBreaker` értéket.
Az explicit kvóta-törzs továbbra is elsőbbséget élvez, ezért az a törzs, amely egy kvótamintára is illeszkedik, kvótaeredmény marad. Észlelés: `looksLikeConcurrencyLimit()` a `src/shared/utils/classify429.ts` fájlban;
eredmény: `open-sse/services/accountFallback/concurrencyLimit429.ts`. A `classify429()` (a megszakító `FailureKind` értéke) változatlan, és ezeknél a törzseknél továbbra is a `rate_limit` értéket olvassa.

**A streamtartalom elakadása nem hűti le a fiókot.** Amikor a tartalom-elakadás figyelője
(`open-sse/utils/streamHandler.ts`) feladja az olyan stream figyelését, amely időben nem küldött modellkimenetet, a `markAccountUnavailable()` rögzíti a hibát a kapcsolaton, de nem állít be lehűtést: az elakadás az adott kéréshez tartozik, leggyakrabban egy hosszú, még kimenetet nem adó következtetési fordulathoz. Az üzemeltetők a `resilienceSettings.streamStallCooldown.enabled` beállítással
visszakapcsolhatják ezt (alapértelmezés szerint `false`).

**Opcionális késleltetési jel a `p2c` fiókkiválasztáshoz.** Minden elküldött próbálkozás rögzíti az első bájtig eltelt időt és az eredményt kapcsolatonként (valamint kapcsolat + modell szerint) egy memóriában tárolt gördülő ablakban: az utolsó 20 mintát 15 percen belül
(`open-sse/services/connectionLatencyTracker.ts`, rögzítve a `src/sse/handlers/chatHelpers.ts` fájlban található
`safeLogEvents()` függvényből). Ha a `resilienceSettings.p2cLatency.weight` értéke nagyobb, mint
`0` (tartomány: 0–20, alapértelmezés: `0` = kikapcsolva), a `compareP2CConnections()` a `src/sse/services/auth.ts` fájlban legfeljebb `weight` pontot ad a pár minden jelöltjének. Ennek fele a késleltetésből származik, a gyorsabb jelölthöz viszonyított arányként (a kétszer lassabb jelölt kapja a teljes félértéket), a másik fele pedig a gördülő hibaarányból. Ez a tag csak akkor érvényesül, ha mindkét jelöltnek legalább 3 mintája van, így az új fiókokat nem bünteti, és a felső korlátja a kvótával blokkolt és a kvótát kimerített állapotokhoz tartozó büntetések alatt marad. Nem hoz létre saját megszakítót: a hibás fiókokat továbbra is a lehűtési, zárolási és megszakító rétegek kezelik. A beállítás a `PATCH /api/resilience` `{ "p2cLatency": { "weight": 10 } }` kéréssel adható meg.

**A következtetési keretek újraindítják a tartalom-elakadás keretét.** Egy következtetési modell percekig gondolkodhat az első látható token előtt: a Claude `thinking_delta` kereteket streamelhet, amelyek gondolkodási szövege üres lehet, a Responses API pedig egymás után streamelheti a következtetési elemeket. Az `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) felismeri ezeket a kereteket, a figyelő pedig mindegyiknél újraindítja a keret időkeretét a fordulat megszakítása helyett. Ezek továbbra sem modellkimenetek, ezért az a fordulat, amely csak következtetéssel ér véget, továbbra is üresként lesz jelentve, az a fordulat pedig, amely leállítja a következtetést és csak szívveréseket küld, továbbra is aktiválja a figyelőt.

A Kiro bináris `reasoningContentEvent` keretei nem üres aláírás esetén ezt a következtetési tevékenységet üres `reasoning_content` delták formájában őrzik meg a végrehajtón keresztül. Az aláírás nem kerül továbbításra. A metaadatok, a hiányos keretek és az üres aláírások nem indítják újra a tartalom időkeretét; a független aktívstream-időtúllépés és az ügyfél általi megszakítás továbbra is érvényes (`open-sse/executors/kiro/reasoning.ts`).

**Terminális állapotok (NEM lehűtések):**

- `banned` — tiltott kulcsszó / fióktiltás észlelése állítja be (lásd: [BAN_DETECTION](../security/BAN_DETECTION.md)). A felsőbb szintű, kérésenkénti elutasítások (`request_rejected`, például az Anthropic OAuth 403 "Request not allowed" hibája) soha nem állítják be: ezeket kapcsolat és modell szerint számolja a rendszer, és az adott modellt növekvő lehűtéssel kiveszi a rotációból, amelynek felső korlátja `REQUEST_REJECTED_MAX_COOLDOWN_MS` (1 h), illetve lehűti a kapcsolatot, ha nem ismert a modell — `open-sse/services/requestRejectedStreak.ts`
- `expired` (korlátozott számú újrapróbálkozás után terminális állapotba vált — `EXPIRED_RETRY_MAX = 3`, exponenciális visszalépéssel —, így az átmeneti OAuth-hibák önmaguktól helyreállhatnak, mielőtt a fiók véglegesen deaktiválódik)
- `credits_exhausted`

Ezek mindaddig fennmaradnak, amíg a hitelesítő adatok meg nem változnak, vagy egy üzemeltető vissza nem állítja őket. Ne írja felül a terminális állapotokat átmeneti várakozási állapottal.

**Lusta helyreállítás:** amikor a `rateLimitedUntil` lejár, a kapcsolat ismét jogosulttá válik. Sikeres használatkor a `clearAccountError()` törli az összes hibamezőt.

### Claude OAuth használati plafon: alacsonyabb prioritású sáv + munkamenetkorlát visszaállítása

**Hatókör:** egy Claude-előfizetéshez tartozó (OAuth) kapcsolat. Mindkét funkció **kapcsolatonként külön engedélyezhető** (Kapcsolat szerkesztése → Claude szakasz → `lowPriorityMode` / `autoLimitReset` a `providerSpecificData` mezőben, alapértelmezés szerint mindkettő kikapcsolva), és a Claude Code `/low-priority` és `/limit-reset` parancsait tükrözi (a wire-szerződés a Claude Code 2.1.263 verziójából származik).

**Implementáció:**

- Állapotgép + válaszok osztályozása: `open-sse/services/claudeLowPriority.ts`
- Visszaállítási állapot-/igénylési kliens: `open-sse/services/claudeLimitReset.ts`
- Végrehajtói hook (fejléc-injektálás + ugyanazon fiókkal történő újrapróbálkozás): `open-sse/executors/base.ts::execute()`
- Opt-in perzisztálása: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Kiváltó esemény:** az 5 órás használati plafon — egy `429` válasz, amelynek fejlécei tartalmazzák az
`anthropic-ratelimit-unified-status: rejected` értéket, valamint ha a fiók jogosult,
az `anthropic-ratelimit-unified-slow-offer: treatment` értéket. Az első plafon-`429` előtt nem kerül sor semmilyen műveletre; az egyesített fejlécek nélküli burst 429 a normál várakozási útvonalon halad tovább.

**Alacsonyabb prioritású sáv** (`lowPriorityMode`):

- A plafon-429 esetén a végrehajtó elfogadja az ajánlatot, és azonnal újrapróbálja ugyanazzal a fiókkal, az `anthropic-usage-limit: slow` fejléccel; a sáv az bejelentett `anthropic-ratelimit-unified-reset` időpontjáig (+60 másodperc türelmi idő) aktív marad, és ebben az időablakban minden kérés tartalmazza a fejlécet. Az elfogott 429 nem jut el a `handleChatCore` függvényhez, ezért a kapcsolat **nem kerül várakozási állapotba, és nem lesz lecserélve**.
- Az `anthropic-ratelimit-unified-slow-status` értéke a későbbi válaszokban: az `active` / `not_needed` fenntartja a sávot; a `slot_busy` (429) vagy az `529` várakozik a szerver által megadott `anthropic-ratelimit-unified-slow-retry-after` időtartamig (alapértelmezés szerint 20 másodperc, 5–600 másodperc közé korlátozva, ±30% jitterrel), majd újrapróbálkozik; ezt az `anthropic-ratelimit-unified-slow-max-wait` korlátozza (alapértelmezés szerint 20 perc, 1 perc–6 óra közé korlátozva) — ennek túllépésekor a sáv véget ér, és egy 10 perces lehűlési idő blokkolja az újbóli elfogadást. A várakozást ezenfelül korlátozza a kérés saját upstream-indítási időkorlátjából (`resolveFetchStartTimeout`, alapértelmezés szerint 10 perc) hátralévő idő mínusz 5 másodperc: e korlátozás nélkül az alapértelmezett 20 perces maximális várakozás túlnyúlna a kérés időkorlátján, és az alvás várakozás közben megszakadna, így a szabályos `max_wait` lezárás és lehűlés helyett `TimeoutError` jelenne meg.
- A `weekly_limit` / `budget_exhausted` / `off` / `ineligible` állapotok, egy 5 órás időablak fordulója, illetve az `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (amely bármely állapot esetén `extra_usage` értékkel zárja le a sávot, mivel a fizetett többlethasználat most már fedezi a plafont) lezárják a sávot; a válasz ezt követően a normál várakozási útvonalon halad tovább. A `budget_exhausted` állapot megmarad a bejelentett költségkeret-visszaállításig (legfeljebb 8 napig).
- A plafon ellenőrzése a végrehajtó saját, 400-as válaszok által kiváltott kísérleten belüli újrapróbálkozásai (kontextusszerkesztés, gondolkodási/erőfeszítés-korlátok, paraméterek automatikus megtanulása) után fut le, így az ezek egyikénél először megjelenő plafon-429 is elfogásra kerül, és nem jut el a várakozási útvonalra.
- Az állapot kapcsolatonként memóriában található (egy újraindítás miatt egy további plafon-429 szükséges az újbóli elfogadáshoz).

**Munkamenetkorlát visszaállítása** (`autoLimitReset`, mindkettő engedélyezése esetén a sáv előtt próbálkozik):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide` blokk; amikor az `arm: "reset"` és az `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` a
  `{ "program": "juniper_tide" }` törzzsel (a szervezeti UUID a `providerSpecificData.organizationUUID` mezőből származik, bootstrap tartalékértékkel).
- `result: reset|not_limited` → a kérés teljes sebességgel kerül újrapróbálásra (lassító fejléc nélkül).
  Az `already_used` / `not_offered` megjegyzi a `next_available_at` értékét (alapértelmezés szerint egy hétre); minden hiba 15 perces visszalépést alkalmaz. A visszaállítás hetente egyszer végezhető el, és továbbra is beleszámít a heti korlátba.

Regressziós védelmek: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Munkamenet-affinitás (#7274)

**Hatókör:** egy kliensmunkamenet (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` fejléc) egyetlen kapcsolathoz rögzítve, **bármely** szolgáltatónál.

**Cél:** egy többlépéses ügynök (Claude Code, aider, egyedi ügynökök) több kérésen keresztül ugyanazon a fiókon maradjon, csökkentve a fiókok közötti kontextusvesztést és a szolgáltatók fiókonkénti munkamenet-állapota miatt ismétlődő, hidegindításból eredő 429-es válaszokat.

**Implementáció:**

- TTL feloldása: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Kapcsolat kiválasztása/létrehozása a rögzítéshez: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Fejléc kinyerése (általános, bármely szolgáltatónál): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Perzisztált rögzítési tábla: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Beállítás: `sessionAffinityTtlMs` (globális TTL ms-ban, a `0` letiltja) — `src/lib/db/settings.ts`. A Codexre korlátozott `codexSessionAffinityTtlMs` beállítás neve a `124_generic_session_affinity_ttl.sql` migrációval változott meg; a migráció minden korábban beállított Codex TTL-értéket továbbvisz új alapértelmezettként.

A #7274 előtt a `resolveSessionAffinityTtlMs()` minden, a `codex`-től eltérő szolgáltatónál azonnal `0` értékkel tért vissza, így a TTL-beállítás (és a munkamenet-fejlécek) sehol máshol nem voltak hatással, annak ellenére, hogy a rögzítési mechanizmus és a fejlécek kinyerése már szolgáltatófüggetlen volt. A javítás eltávolította ezt a korai visszatérést; a TTL mostantól egységesen minden szolgáltatóra vonatkozik, ha globálisan `0` fölé van állítva.

A három munkamenet-affinitási fejlécet soha nem továbbítjuk upstream — a végrehajtók a saját upstream-fejléceiket a nulláról építik fel ahelyett, hogy átadnák a kliens fejléceit, így ez továbbra is csak belső korrelációs azonosító.

### Kizárólagos, kezelt munkamenet-kapcsolati bérletek

**Hatókör:** egy aktív, kezelt HTTP-kliens/munkamenet egy jogosult OmniRoute-kapcsolatot birtokol.

**Cél:** tartós, kizárólagos kapcsolattulajdonlás biztosítása olyan kliensek számára, amelyeknek kéréseken átívelő, szigorú útválasztási korlátra van szükségük. Ez eltér a munkamenet-affinitástól, amely laza folytonossági preferencia: a kizárólagos bérlet életciklus-állapotot tart fenn SQLite-ban, kikényszeríti az aktív tulajdonosok és az aktív kapcsolatok globális egyediségét, valamint a szolgáltatói továbbítás előtt elutasítja az elavult generációt.

A funkció API-kulcsonként engedélyezhető. Egy kezelt kulcsnak rendelkeznie kell a `lease:exclusive` hatókörrel és egy kifejezetten megadott, nem üres `allowedConnections` listával. Bármely HTTP-kliens használhatja az életciklus-végpontot; nincs szükség kliensnévre, user-agentre, szolgáltatóra, OAuth-metódusra vagy modellre. A bérlet egy kapcsolatot birtokol, nem egy modellt, ezért a modell módosítása megtartja a hozzárendelést, amíg a kapcsolat egyébként jogosult marad. A normál modell-, kvóta-, állapot-, lehűlési és engedélyezőlistás szabályok továbbra is mérvadók, és ugyanazt a generációt egy másik szabad, jogosult kapcsolatra helyezhetik át.

Az életciklus a `POST /api/v1/session-leases` végpont, amely a `acquire`, `renew` és `release` JSON-műveleteket kezeli. A kezelt inferenciakérések az átlátszatlan `X-OmniRoute-Lease-Owner` értéket és a pontos `X-OmniRoute-Lease-Generation` értéket küldik. A tulajdonos `vlo_` előtagból és 43 base64url-karakterből áll; csak az SHA-256-hash kerül tárolásra. Minden végső továbbítási korlát a hitelesített API-kulcs azonosítóját és az aktív kapcsolat azonosítóját is rögzíti. A bérletvezérlő fejlécek eltávolításra kerülnek a naplókból, a megőrzött kérés-pillanatképekből és a felsőbb szintű végrehajtó fejléceiből.

Ha a normál útválasztásnak vannak jogosult kezelt jelöltjei, de minden szabad jelöltet egy idegen aktív bérlet foglal le, az OmniRoute HTTP `429` választ, `lease-capacity-unavailable` kódot, kapacitásra váró állapotot és a legkorábbi releváns lejáratból származtatott, korlátozott `Retry-After` értéket ad vissza. A jogosultságra alkalmas jelöltek hiánya nem bérletütközés, ezért megőrzi a meglévő útválasztási hiba szemantikáját.

A kapcsolódó mechanizmusok továbbra is elkülönülnek:

- Az OAuth-munkamenet-foglaltság folyamaton belüli, laza elosztást biztosít az OAuth-fiókok számára.
- A fiókszemaforok kérési párhuzamossági engedélyeket adnak, és a kérés befejezésekor lejárnak.
- A kizárólagos, kezelt munkamenet-bérletek tartós életciklus-tulajdonlást biztosítanak generációs korláttal.

## 3. Modelltiltás

**Hatókör:** szolgáltató + kapcsolat + modell hármasa.

**Hatókör státusz szerint:** a hibát okozó státusz határozza meg, hogy melyik kulcsra ír tiltást a rendszer
(`resolveLockoutScope()` itt: `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — kvóta- vagy jogosultságjelzés — a **kvótacsalád** zárolása:
  codex esetén a teljes `codex` / `spark` hatókör (a kapcsolat minden
  `gpt-5*` modellje), más szolgáltatóknál pedig a
  `getQuotaScopedModelForProvider()`.
- `404` a csupasz modellt zárolja (`getModelLockKey()` szűkíti a `not_found` értéket).
- Bármely más státusz — `5xx` átviteli/szerverhibák és az OmniRoute saját,
  minőség-ellenőrzésből származó `502` értéke — csak a **pontos**
  szolgáltató/kapcsolat/modell hármast zárolja. Egy modell hibás adatfolyama nem bizonyíték
  a fiók kvótájával kapcsolatban; e szabály előtt egyetlen üres válasz a
  `codex/gpt-5.6-luna` esetén 2–30 percre (fokozatosan növekvő időtartammal) eltávolította a kapcsolat
  minden `gpt-5*` modelljét az útválasztásból, miközben a kvóta érintetlen maradt.
- A hívó explicit `scope` beállítása mindig elsőbbséget élvez (az Antigravity az `"exact"` értéket adja át).

**Cél:** annak elkerülése, hogy egy teljes kapcsolat le legyen tiltva, amikor csak egy modell nem érhető el vagy kvótakorlátba ütközik.

**Példák:**

- Modellenkénti kvótát használó szolgáltatók, amelyek `429` értéket adnak vissza
- Helyi szolgáltatók, amelyek `404` értéket adnak vissza egy hiányzó modell esetén
- Szolgáltatóspecifikus mód-/modellengedélyezési hibák (például Grok-módok)

**Implementáció:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Modell-lehűtések irányítópultja (v3.8.0)

Felhasználói felület: Beállítások → Modell-lehűtések (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Az aktív tiltásokat listázza a következőkkel: szolgáltató, kapcsolat, modell, ok, expiresAt. Az üzemeltetők a kártyáról manuálisan újra engedélyezhetnek egy modellt.

**REST API:**

- `GET /api/resilience/model-cooldowns` — aktív tiltások listázása
- `DELETE /api/resilience/model-cooldowns` — manuális újraengedélyezés. Törzs: `{provider, connection, model}`. Hitelesítés: management.

### Lehűléskezelő

Felhasználói felület: Figyelés → Lehűléskezelő (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Egyetlen oldalon jelenít meg minden olyan kapcsolatot, amely átmeneti okból kikerült az útválasztásból, így nem kell minden szolgáltató oldalát külön megnyitni. Listázza a kapcsolatok lehűléseit, a modelltiltásokat és a végállapotokat, és törli ezeket kapcsolatonként, kijelölés szerint vagy egy szolgáltató összes kapcsolatánál, továbbá szerkeszti a leggyakrabban hangolt lehűlési szabályokat: `streamStallCooldown.enabled`, valamint az OAuth- és API-kulcsos `connectionCooldown` alap-lehűlését és a maximális visszalépési lépések számát (mentés a `PATCH /api/resilience` végponton keresztül). A végállapotok (`banned`, `expired`, `credits_exhausted`) megjelennek a listában, de itt soha nem törlődnek.

Az ugyanazon az oldalon található **Hibalehűlési szabályok** kártya az üzemeltetői hibaszabályokat (`settings.providerErrorRules`) és a szolgáltatónkénti általános alapértelmezéseket (`settings.providerErrorDefaults`) szerkeszti a `PATCH /api/settings` végponton keresztül — az egyezés működéséről lásd a §7 „Üzemeltető által deklarált szabályok” című részét. Az időtartamok: Alapértelmezett (nincs explicit lehűlés), 30 perc, 1 óra, 5 óra, 24 óra vagy egyéni, 1–43 200 perc közötti érték (30 nap).

**REST API** (`src/lib/resilience/cooldownManager.ts`, hitelesítés: management):

- `GET /api/resilience/cooldowns[?provider=]` — állapottal, hátralévő lehűlési idővel, visszalépési szinttel, az utolsó hibatípussal és modelltiltásokkal rendelkező kapcsolatok (hitelesítő adatok nélkül)
- `POST /api/resilience/cooldowns` — törzs: `{connectionIds: string[]}` vagy `{all: true, provider?}`; visszatérési érték: `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Modelltiltási beállítások felhasználói felülete + sikeralapú csökkenéses helyreállítás (v3.8.23)

A modelltiltás a mindig bekapcsolt, kódba égetett működésből teljes mértékben konfigurálható, bekapcsolást igénylő funkcióvá vált, saját beállítási kártyával és önjavító helyreállítási folyamattal.

**Beállítási kártya:** Beállítások → Modelltiltás
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ez **különbözik** a fent bemutatott, csak olvasható `ModelCooldownsCard` kártyától (amely csak
_felsorolja_ az aktív tiltásokat) — az új kártya _a paramétereket konfigurálja_. Az alapértelmezések a `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) értékben találhatók:

| Beállítás               | Alapértelmezett                  | Jelentés                                                                   |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Főkapcsoló — a modelltiltás **alapértelmezés szerint ki van kapcsolva**.   |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Felsőbb szintű státuszok, amelyek modellhatókörű hibának számítanak.       |
| `baseCooldownMs`        | `120_000` (120 s)                | Az első hiba kezdeti tiltási időtartama.                                   |
| `maxCooldownMs`         | `1_800_000` (30 min)             | A fokozatosan növelt lehűlés felső korlátja.                               |
| `maxBackoffSteps`       | `10`                             | Az exponenciális visszalépés-fokozás maximális lépésszáma.                 |
| `useExponentialBackoff` | `true`                           | Meghatározza, hogy az ismételt hibák exponenciálisan növelik-e a lehűlést. |

A beállítások a szokásos beállítástáron keresztül maradnak meg, és a rugalmassági beállítások sémáján keresztül kerülnek ellenőrzésre; a kártya korlátozza a `baseCooldownMs`/`maxCooldownMs` értékeket
(ahol `maxCooldownMs ≥ baseCooldownMs`), valamint a `maxBackoffSteps` értékét.

**Sikeralapú csökkenéses helyreállítás:** a helyreállítás **nem** kizárólag az időzítő lejártától függ. Az egészséges válasz fokozatosan visszacsökkenti a modell hibaszámlálóját, így egy időablakon belül helyreállt modell még az időzítő lejárta előtt leállítja a fokozást (és törlődik). Sikeres kombinált cél esetén az `open-sse/services/combo.ts` meghívja a `decayModelFailureCount()` függvényt
(`open-sse/services/accountFallback.ts`), amely **a felére csökkenti** a tárolt
`failureCount` értéket (`Math.floor(failureCount / 2)`); amikor az érték eléri a `0` értéket, a tiltási bejegyzés teljes egészében törlődik. A párja, a `recordModelLockoutFailure()`, növeli a számlálót (és fokozza a lehűlést) a fokozási időablakon belül bekövetkező hibák esetén. Ez a sikeralapú csökkenéses helyreállítás kiegészíti az egyszerű időzítő-lejáratot — bármelyik út újra engedélyezheti a modellt.

**Állapot:** a kizárások **memóriában** vannak tárolva (folyamatonkénti `Map`-ekben, amelyek kulcsa
`provider:connectionId:model` és `ModelLockoutEntry` értékeket tartalmaz, a pontos hatókörű kizárások kulcsa pedig
`provider:connectionId:exact:model`), és nem kerülnek mentésre az
adatbázisba — újraindításkor elvesznek. A _beállítások_ mentve vannak; az aktív kizárási _állapot_ ideiglenes.

---

## 4. Kvóta-megosztásos konkurenciavezérlés (v3.8.36)

Az előfizetéses fiókok (GLM, MiniMax stb.) gyakran csak ~1–3 egyidejű
kérést fogadnak el; ennek túllépése 429-es hibákat és cooldownokat vált ki. Ez különösen
súlyos **kvóta-megosztásos** (`qtSd/…`) kombinációk esetén, ahol több API-kulcs osztozik
ugyanazon a felsőbb szintű fiókon. Három réteg akadályozza meg a megosztott fiók
elárasztását.

### Kapcsolatonkénti konkurenciakorlát (`max_concurrent`)

Minden szolgáltatói kapcsolat deklarálhat egy `max_concurrent` felső korlátot
(`provider_connections.max_concurrent`, amely a kapcsolatmodálban / API-n / DB-ben állítható be).
Hagyja üresen korlátlan működéshez. Ez az egyetlen kapcsoló, amely az alábbi
szerializálási réteget vezérli — állítsa a fiók tényleges konkurenciájára (pl. GLM ~1, MiniMax ~2).

### Modellenkénti konkurenciakorlátok (`modelConcurrency`)

Egy kapcsolat ezenfelül pontos, modellenkénti konkurenciakorlátokat is deklarálhat
a `rateLimitOverrides` térképén belül:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Állítsa be a kapcsolatmodálban (**Rate limit overrides → Per-model
concurrency caps**, soronként egy `model=cap` értékkel), vagy a
`PATCH /api/providers/[id]` végponton keresztül, ugyanilyen JSON-struktúrával. A kulcsok jelentése:

- **Kapcsolatszintű és modellspecifikus:** a `maxConcurrent` továbbra is a teljes kapcsolatra
  érvényes közös korlát. Ha mindkettő érvényes, akkor mindkét kaput atomikusan kell megszerezni ugyanabban az összetett kapuban
  (`global → provider → account → model`); a tényleges viselkedést a szigorúbb alkalmazandó korlát határozza meg.
- **Pontos modellkulcs-egyezés:** a kulcs az útválasztás feloldása után a végrehajtónak átadott modellkarakterlánc — általában a csupasz felsőbb szintű modellazonosító
  (`glm-5`), nem pedig kliensoldali `provider/model` alias (`zai/glm-5` nem egyezik a `glm-5` értékkel). Az értékek pozitív egész számú, egyidejű kérésekre vonatkozó korlátok.
- **Helyi sorba állítás, felderítés nélkül:** a többletkérések helyben sorba állnak a meglévő sor- és időkorlát-szemantikával (típusos `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` beléptetési hibák). Az OmniRoute nem deríti fel és nem következteti ki a felsőbb szintű házirendet — a kezelő által
  konfigurált pontos korlátokat kényszeríti ki. Egy telített modellkapu soha nem tiltja le a szolgáltatót, és nem hoz létre végleges modellzárolást; a felsőbb szintű 429-es hiba/cooldown/tartalékra váltás továbbra is a hibakezelési visszalépés.
- **Kapcsolatonkénti, folyamatonkénti hatókör:** a korlátok adatbáziskapcsolatonként érvényesek, és memóriában vannak tárolva, így két, ugyanazt a felsőbb szintű API-kulcsot újrahasználó kapcsolat nem koordinál egymással.
- **A konfigurálatlan állapot változatlan működést jelent:** a térkép elhagyása (vagy a vezérlőpulti mező üresen hagyása) nem ad hozzá modellkaput. Példakonfiguráció bármilyen univerzális szolgáltatói korlát megadása nélkül:

```text
glm-5=1
glm-4.7=3
```

### Kvóta-megosztásos kérések szerializálása

Amikor egy kvóta-megosztásos küldés olyan kapcsolatot céloz, amely pozitív
`max_concurrent` értéket deklarál, az adott **fiókhoz** intézett egyidejű kérések egy
kapcsolatonkénti szemaforon keresztül szerializálódnak (`qsconn:<connectionId>`): a többletkérések
**a sorban várakoznak**, ahelyett hogy elárasztanák a fiókot. Ez **fail-open** működésű — a telített
sor vagy az időkorlát lejárta helyfoglalás nélkül folytatódik, és soha nem utasít el egy küldhető
kérést. A kapcsolónak a **Settings → Resilience → Quota-share per-connection
concurrency** helyen állítható be az értéke
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, alapértelmezés szerint bekapcsolva). `max_concurrent` korlát nélkül a viselkedés változatlan.

> A kvóta-megosztásos útválasztási kapu (`selectQuotaShareTarget`, DRR + P2C) maga is
> fail-open, és csak _alacsonyabb prioritásúvá teszi_ a korláton lévő kapcsolatot — egy
> egyetlen kapcsolatból álló készletben nem tud kemény korlátot érvényesíteni, ezért ténylegesen ez a szemafor
> tartja kordában az elárasztást.

### Kombinációs cooldown-tudatos újrapróbálás

Minden kombinációs stratégia esetén (ha engedélyezve van) az a kérés, amely egy SHORT
átmeneti cooldown miatt 429-es hibát eredményezne, kivárja annak lejártát, majd újraküldi ahelyett,
hogy visszaadná a 429-es hibát — ez lefedi a Gemini-osztályú TPM/RPM-ablakokat (~60 másodperces
retry-after értékkel) a többmodellű kombinációkban, például amikor egy 2 modellből álló kombináció mindkét célpontját
modellenkénti sebességkorlát érinti. Ezt a `comboCooldownWait` korlátozza
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) a **Settings → Resilience** helyen. Soha nem várakozik
`quota_exhausted` esetén (éjfélig zárolva), illetve hitelesítési/„nem található” okok esetén.

Egy kombináció letilthatja ezt a `config.comboCooldownWaitEnabled: false` beállítással. Csak a szó szerinti
`false` tiltja le ezeket a megosztott kombinációs várakozásokat (a küldés utáni cooldown- és
küldés előtti áramkörnyitott/modellzárolási várakozásokat), valamint a várakozási költségkeret
időtúllépési alsó korlátjának kiterjesztését. A hiányzó érték vagy a `true` megőrzi a globális
házirendet; a `true` nem tudja globálisan letiltott várakozást engedélyezni. A kifejezetten megadott
`targetTimeoutMs` továbbra is elsőbbséget élvez. Ez a letiltás nem módosítja a natív Codex-forduló rögzítésének
külön, küldés előtti várakozását.

Ugyanez a kapu fedi a küldés előtti esetet is (#16319): amikor egy kombináció minden célpontját
kihagyja a rendszer, még mielőtt bármilyen próbálkozás történne, mert a modell rövid ideig tartó
átmeneti zárolásban van, a nulla próbálkozásos útvonal ugyanazon korlátok szerint kivárja a zárolás
lejártát és újraküldi a kérést, ahelyett hogy súgó nélküli
`503 ALL_TARGETS_SKIPPED` választ adna. Ha nincs engedélyezett várakozás (a korlát, a próbálkozások
vagy a költségkeret kimerült, illetve a funkció ki van kapcsolva), a végső válasz
`429 rate_limit_error` értékre vált, és a legkorábbi átmeneti zárolás lejárati idejétől származó
`retry_after` / `reset_at` értéket tartalmazza; a kvóta-, hitelesítési és „nem található” zárolások továbbra is súgó nélküli 503-as választ adnak.

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

## 5. Kéréssor-befogadásvezérlés (v3.8.49 · issue #6593)

**Hatókör**: a helyi, szolgáltató+kapcsolat szintű rate-limit várakozási sor (`open-sse/services/rateLimitManager.ts`, Bottleneck-alapú), egy réteggel a fenti három mechanizmus alatt.

**A `maxWaitMs` a sorban várakozást korlátozza; az `executionMaxWaitMs` a végrehajtást.**
A kettő szándékosan különálló, és egyik sem táplálja a másikat.

A `resilienceSettings.requestQueue.maxWaitMs` a **sorban-várakozási keret**: magába foglalja a szolgáltatói helyre való várakozást, majd a QUEUED állapotban töltött időt, és az időzítője abban a pillanatban törlődik, amint a feladat elhagyja a QUEUED állapotot és megkezdi a végrehajtást (`rateLimitManager.ts`, `wrappedFn`). Az ezt túllépő kérés sosem jut el az upstreamhez. Alapértelmezés: 30000 ms, amelyet a `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` szolgáltat a `src/lib/resilience/settings.ts` fájlban, és amelyet a `tests/unit/ratelimit-admission-control-6593.test.ts` rögzít, így a módosítása pirosra váltja azt a tesztet, ahelyett hogy ezt a bekezdést csendben elavulttá hagyná.

A `resilienceSettings.requestQueue.executionMaxWaitMs` az, amit a Bottleneck a feladat `expiration` értékeként kap, és amelynek időzítője csak a kiküldés után indul. Védőhálóként szolgál az olyan végrehajtókhoz, amelyeknek nincs saját upstream-időtúllépésük, és ha a végrehajtó saját fetch-indítási időtúllépése hosszabb, akkor arra emelkedik, így nem vághatja el az egészséges, úton lévő választ. Alapértelmezés: 600000 ms (10 perc).

Az, hogy a sorkeret az `expiration`-be került, az volt, ami korábban menet közben megölte a nem inkrementális gatewayeket — ezek jogszerűen percekig futhatnak az első bájtok előtt —, és ezért jelenik meg egy expiration `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) kóddal, míg a sorkeret a sor-időtúllépési kódot hordozza. Bármelyik felülírható a `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (környezeti változó) vagy a dashboard (**Beállítások → Resilience**) segítségével. Normalizáláskor mindkettő 1 ms és 24 óra közé szorul.

**A precedencia mindkettőnél:** a környezeti változó csak az _alapértelmezett_ értéket adja. A `resilienceSettings.requestQueue`-ban tárolt érték (dashboard / API patch, a `key_value`-ban tárolva) felülírja azt, egy kapcsolatszintű `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` pedig azt is. Ezért egy olyan telepítésen, ahol már létezik tárolt érték, a környezeti változó beállítása semmit sem változtat — inkább törölje vagy frissítse a tárolt beállítást.

A sorban tartózkodást a `maxWaitMs` korlátozza; az alábbi `maxQueueDepth` azt, hogy egyszerre hány hívó állhat sorban.

**Törzsben megadott újrapróbálkozások: ütemezés kontra kizárás.** Egy 429-es törzs megnevezheti a saját várakozási idejét (Gemini `RetryInfo.retryDelay`, „retry after Ns" szöveg), amelyet az `updateFromResponseBody` olvas be. A kapcsolat `maxWaitMs` értékébe beleférő várakozás ütemezés: a limiter ennyi időre kiüríti a reservoirját, és a sorban álló hívások annak újratöltődésekor kerülnek kiküldésre. A `maxWaitMs`-nél hosszabb várakozást a sor nem tud kivárni — a Gemini kimerült napi kvótára `retryDelay: "86399s"` értékkel válaszol. Az újraépített 429-esen továbbított `Retry-After` (#16528) már arra készteti a fallback-motort, hogy erre az ablakra zárolja a modellt, ám ha a limitert is szüneteltetnénk miatta, az továbbra is feltartaná a teljes `maxWaitMs` időre minden olyan hívást, amely korán éri el a kulcsot (például egy resilience-visszaállítás után). Ha az ilyen várakozás típusos Google `RetryInfo`-részletből származik (a `google_rpc_retry_info` proveniencia), és a kulcs limitere már modellre szűkített (lásd `getLimiterKey`), a 429 ehelyett modellkizárássá válik azon a kapcsolaton (`lockModelForLongBodyRetry` az `open-sse/services/rateLimitManager/bodyRetryPause.ts` fájlban, 24 órában maximalizálva), a limiter pedig szüneteltetés nélkül marad. A fiókválasztás az `isModelLocked()` útján ennél a zárolásnál kihagyja a fiókot, és ugyanígy tesz a kapcsolathoz rögzített célok kombinált, kiküldés előtti kapuja is. Az antigravity esetében, ahol a limiter kvótacsaládonkénti, a zárolás a pontos modellre vonatkozik, akárcsak a többi kvótazárolás. A kliens által kért név is zárolódik, ha egy alias arra a modellre oldotta fel, mert ezek az ellenőrzések a kért nevet használják; a zárolás pontosan történik (`lockExactModel`), így egy antigravity-kvótacsaládot vagy codex-hatókört átlépő alias sosem zárolja a sajátját. Egy prózai utalás, egy típus nélküli `retryDelay` vagy egy egész kapcsolat által megosztott limiter megtartja a szünetet. Amikor a 429-es út által éppen újraépített limiter mégis szünetel, az a hívó, amelynek hátralévő sorideje a szünet előtt lejár, azonnal elutasításra kerül a sor-időtúllépési kóddal (`checkLimiterPause`), ahelyett hogy kivárná azt az időt; a rögzített végpont még a limiter felépítése előtt rögzül, ahol a Bottleneck elindítja a frissítési óráját, és a reservoir bármely későbbi módosítása elfelejti azt. Lefedi: `tests/unit/rate-limit-long-body-retry-lockout.test.ts` és `tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — opcionális befogadási korlát (új).** A `resilienceSettings.requestQueue.maxQueueDepth` azt korlátozza, hogy egy szolgáltató+kapcsolat esetén egyszerre hány kérés állhat sorban (még kiküldetlenül). Amikor a sor már `maxQueueDepth` kérést tart, az új kérés gyorselutasítást kap egy típusos `code: "RATE_LIMIT_QUEUE_FULL"` hibával, még **azelőtt**, hogy egyáltalán elérné a `limiter.schedule()`-t — így az elutasítás olcsó, és az adott kéréshez tartozó bármely későbbi prompt-tömörítési / fordítási munka előtt megtörténik. Alapértelmezés: `0` = letiltva, megőrizve a meglévő, korlátlan sor-viselkedést; korlát: 0–100000. Felülírható a `RATE_LIMIT_MAX_QUEUE_DEPTH` (környezeti változó) vagy a `resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) segítségével.

Maga a befogadási ellenőrzés tiszta függvény (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), így valódi Bottleneck-limiter nélkül is egységtesztelhető.

> Az RFC, amely megnyitotta a #6593-at, egy `bypassCompressionOnRateLimit`
> jelzőt is javasolt. Ennek a tárhelynek az `open-sse/services/compression/`
> folyamata a kimenő LLM-kérés prompt-/kontextustömörítése (`chatCore.ts`,
> a `resolveCompressionSettings`/`selectCompressionStrategy` blokk körül),
> nem pedig HTTP-választömörítés a szintetizált 429-es válaszokon — nincs
> megfelelő kódútvonal egy szó szerinti bypass-jelzőhöz. Ez a prompttömörítési
> lépés jelenleg a `withRateLimit()` _előtt_ fut a kérési folyamatban, így
> annak átrendezése, hogy a sor betelte miatti elutasításkor kihagyjuk,
> külön, nagyobb változás, mint ezen issue hatóköre; szándékosan **nem**
> került itt implementálásra, és follow-up feladatként marad fenn, ha a
> CPU-megtakarítás megéri az átrendezés kockázatát.

### A rate-limit automatikus engedélyezésének biztonsági hálója és kapcsolatvédelem (`rateLimitProtection`)

**Automatikus engedélyezési biztonsági háló** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, alapértelmezett `true`):
Alapértelmezés szerint az OmniRoute automatikusan engedélyezi a rate-limit sorvédelmet az összes aktív API-kulcsos szolgáltatókapcsolathoz (`getProviderCategory(provider) === "apikey"`). Ez biztosítja, hogy a rate-érzékeny upstream API-kulcsok felé érkező kérések sorba álljanak, és a Bottleneck-en keresztül szabályozva fussanak, ahelyett, hogy upstream 429-es hibákba robbannának. A biztonsági háló felülírható a `RATE_LIMIT_AUTO_ENABLE` környezeti változóval (`false`/`0`/`off` kikapcsolja, `true`/`1`/`on` kényszeríti a bekapcsolást), amely elsőbbséget élvez a mentett dashboard-beállítással szemben (**Beállítások → Rugalmasság** / `PATCH /api/resilience`).

**A kapcsolatonkénti `rateLimitProtection` szemantikája:**
A kapcsolatonkénti rate-limit védelmet a szolgáltatókapcsolatok `rateLimitProtection` logikai mezője követi nyomon (SQLite-ban `rate_limit_protection` néven tárolva):

- **Explicit be (`rateLimitProtection === true`)**: A rate-limit védelem explicit módon engedélyezve van ehhez a kapcsolathoz, függetlenül a szolgáltató kategóriájától és attól, hogy az automatikus engedélyezési biztonsági háló be van-e kapcsolva.
- **Explicit ki (`rateLimitProtection === false`)**: Kikapcsolja az explicit védelmet, de **nem** mentesíti az aktív API-kulcsos kapcsolatot a globális automatikus engedélyezési biztonsági háló alól. A `reconcileEnabledConnections` függvényben (`open-sse/services/rateLimitManager.ts`) a `false` és az `undefined` egyenértékű: csak a `rateLimitProtection === true` számít explicit felülírásnak. Ha a `rateLimitProtection` értéke `false` (vagy nincs beállítva), egy aktív API-kulcsos kapcsolat továbbra is megfelel az automatikus engedélyezési feltételnek, és rate-limit védett marad.
- **Nincs kapcsolatonkénti kivétel**: Az operátor jelenleg nem tudja kifejezni, hogy „ez az egyetlen aktív API-kulcsos kapcsolat rate-limit sorvédelem nélkül fusson", miközben az automatikus engedélyezés a többi kapcsolatnál aktív marad. Ahhoz, hogy az API-kulcsos kapcsolatok teljesen rate-limit sorok nélkül fussanak, a biztonsági hálót globálisan ki kell kapcsolni (`RATE_LIMIT_AUTO_ENABLE=false` vagy `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Támogatott írási útvonalak:**

- **`POST /api/rate-limits`**: A támogatott felügyeleti írási útvonal a `rateLimitProtection` kapcsolásához egy kapcsolathoz (`{ connectionId: string, enabled: boolean }`). Ha ezt `enabled: true` értékkel hívjuk, bekapcsolja az explicit védelmet; ha `enabled: false` értékkel hívjuk, eltávolítja az explicit védelmet (bár az aktív API-kulcsos kapcsolatok továbbra is a globális biztonsági háló alá tartoznak, ha az automatikus engedélyezés be van kapcsolva).
- **`PUT /api/providers/[id]`**: Szándékosan **nem** fogadja el és nem is kapcsolja át a `rateLimitProtection` értékét (#11278). A szolgáltatókapcsolat metaadatainak `PUT /api/providers/[id]` útján történő frissítése soha nem változtatja meg a tárolt rate-limit védelmi állapotot.

---

## 6. Lassú adatfolyam teljesítményfigyelője (#9709)

Az opcionális `resilienceSettings.streamRecovery.throughputWatchdog` őrszem észleli azt a upstreamet, amely továbbra is küld részeket, de a konfigurált hasznos kimeneti sebességnél lassabban állít elő asszisztensi kimenetet. Szándékosan különbözik a tétlenségi időkorláttól: a szívverések és a metaadatok egyik időzítőt sem állítják vissza, és nem számítanak előrehaladásnak. Ugyancsak különbözik a kemény próbálkozási határidőtől (#9153), amely a kimenet minőségétől függetlenül abszolút biztonsági felső korlát marad.

Az őrszemnek egy bemelegítési időszakra, majd egy teljes gördülő időablakra van szüksége, mielőtt megszakíthatná a folyamatot. A Chat Completions és a Responses API kimeneti eseményeiből származó szövegváltozásokat számolja (konzervatív UTF-8 bájtalapú közelítésként), figyelmen kívül hagyja a csak használati adatokat tartalmazó és az üres eseményeket, továbbá felfüggeszti az értékelést, amíg eszközhívási vagy gondolkodási események vannak folyamatban. Alapértelmezés szerint le van tiltva, és a `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` beállítással engedélyezhető (ez a környezetiérték csak az alapértelmezést állítja be — a mentett `resilienceSettings.streamRecovery.throughputWatchdog.enabled` logikai érték élvez elsőbbséget; lásd az útmutató elején található, a környezeti változók és a vezérlőpult elsőbbségéről szóló megjegyzést); az ablakot, a bemelegítést, a minimális sebességet és a minimálisan mérhető kimenetet a normál resilience-beállítások normalizálási rétege korlátozza.

Engedélyezés esetén az őrszem általi megszakítás csak az aktív upstream-próbálkozásra vonatkozik. Mielőtt bármilyen, az ügyfél számára látható bájt megjelenne, a meglévő, azonos fiókon belüli korai helyreállítási útvonal újranyithatja a próbálkozást. A commit után az adatfolyamot a rendszer soha nem játssza le vakon újra; csak a meglévő biztonságos, adatfolyam közbeni folytatási szerződés képes egy utótagot hozzáfűzni. A véglegesítés továbbra is egyszer történik, így a használati adatok elszámolása és a szemafor felszabadítása nem duplikálódik.

---

## 7. Upstream állapotának újramegállapítása (hibásan jelentett kvótahibák)

**Hatókör:** egy upstream átjáró, amely az ideiglenes kvótakimerülést hibás HTTP-állapottal jelenti.

**Cél:** egy félrevezető állapot javítása a **besorolás ELŐTT**, hogy a downstream fogyasztók (tartalékmechanizmus, kombinált aggregáció, kliens felé küldött válasz) a hiba valódi, újrapróbálható jellegét lássák.

Egyes átjárók az IDEIGLENES kvótakimerülést nem újrapróbálható HTTP-
állapottal jelzik. Az `agentrouter.org` `403`-at (néha `400`-at) küld kínai
törzzsel (`用户额度不足` / `额度不足`) a szabványos `429` helyett. Az olyan kliensek,
mint a Claude Code, a `403`-at végleges hibának tekintik és megszakítják a munkamenetet,
a javítás nélkül pedig a tartalékmechanizmus `AUTH_ERROR`-ként, nem pedig
kvótaeseményként sorolná be.

**Megvalósítás:**

- Nyilvántartás + illesztő: `open-sse/config/upstreamStatusRestatement.ts` — szolgáltatónkénti
  szabálylista (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), amelyet az `applyStatusRestatement()` alkalmaz.
- Hívási pont: az `open-sse/handlers/chatCore.ts` fájl `providerFailure:` blokkja
  (a 3654. sor körül), közvetlenül azután, hogy a `parseUpstreamError()` feldolgozza
  a hibás HTTP-állapottal rendelkező upstream választ (`!providerResponse.ok`), és
  még bármilyen besorolás futtatása előtt, így minden downstream fogyasztó a javított
  állapotot látja. A `200`-as SSE-folyamba ágyazott hibák külön, későbbi
  folyamfeldolgozási útvonalat követnek, és **jelenleg nem tartoznak** e hook hatálya alá —
  ez ismert korlátozás, amelyre egyelőre nincs szükség az agentrouter hibás állapota esetén
  (az hibás HTTP-állapotként jelenik meg).
- Újrapróbálási jogosultság: a `429` szerepel a
  `RETRY_AFTER_ELIGIBLE_STATUSES` listában
  (`open-sse/services/combo/unavailableRetryGate.ts`), ezért a helyreállított hiba
  valódi újrapróbálási időablakot hordoz, ahelyett hogy elérhetetlen `403`-ként jelenne meg.
- A szintetikus `60s` értékű `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  csak azt határozza meg, amit a helyreállított válasz a **kliensnek** közöl; önmagában
  nem a kapcsolat belső lehűlési/zárolási időtartama — ezt külön az a mechanizmus
  szabályozza, amely ténylegesen kezeli a helyreállított hibát (a Kapcsolati lehűlés
  fokozatosan növekvő visszalépése, §2, API-kulcsos szolgáltatóknál `3s` alapértékkel;
  vagy a Modellzárolás, §3, az olyan modellenkénti kvótát használó szolgáltatóknál,
  mint az agentrouter). Az útválasztó belsőleg hamarabb válhat újrapróbálhatóvá,
  mint a kliensnek hirdetett 60 másodperces időablak — ez szándékos ráhagyás,
  nem hiba.

A végleges hibák (az agentrouter `无权访问模型` hibája — nincs hozzáférés ehhez a
modellhez) SOHA nem kapnak új állapotot: az `excludeMarkers` felülbírálja a szabályt
akkor is, ha a `textMarkers` illeszkedik, így a hiba megőrzi eredeti állapotát, és
semmi sem próbálja újra a végtelenségig. A megfelelő szolgáltatói besorolási szabály
(`agentrouter-model-access-denied` az `open-sse/config/providerErrorRules.ts` fájlban:
`reason: "auth_error"`, `scope: "model"`, deklarált `6h` alap-lehűlési idővel) kerül
figyelembevételre a `checkFallbackError` által (`open-sse/services/accountFallback.ts`)
_a generikus apikey-kategóriájú `FORBIDDEN` korai visszatérése előtt_, a
`honorsRuleLockScope(provider)` (#10334 — jelenleg kizárólag az agentrouterre érvényes,
az `providerErrorRules.ts` fájlban található `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
engedélyezési listán keresztül) feltételével. A szabály deklarált 6 órás lehűlési ideje
`fallbackResult.baseCooldownMs` értékén keresztül jut tovább, de továbbra is a már
létező modellenkénti kvótazárolási útvonalat használja
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, amelyet a #10334 nem
módosított, kivéve a lehűlési idő forrását): a rendszer az operátor
`mlSettings.maxCooldownMs` értékére (alapértelmezés szerint `1_800_000ms` / 30 perc)
korlátozza, ahogy minden más modellzárolás esetén is, és a _perzisztált zárolási ok_
továbbra is a korábban rögzített, merev `"forbidden"` érték marad, nem a szabály
`"auth_error"` értéke — végponttól végpontig csak a lehűlési időt veszi figyelembe,
az ok szövegét nem. Maga a kapcsolat aktív marad; az ugyanazon a kapcsolaton lévő
testvérmodellekre ez nincs hatással.

A helyreállított kvótahibák (`额度不足`) éles környezetben egy szolgáltatói szabályhoz
jutnak (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, saját deklarált lehűlési idő nélkül — a perzisztenciaréteg skálázott
alapértelmezett visszalépése érvényesül). A #10334 óta a `scope` a
`ProviderErrorRuleMatch` értékben végponttól végpontig FELDOLGOZÁSRA kerül, de
**csak** a `HONORS_RULE_LOCK_SCOPE_PROVIDERS` engedélyezési listában szereplő
szolgáltatóknál (`providerErrorRules.ts` — jelenleg csak az `"agentrouter"`, a
`honorsRuleLockScope()` feltételén keresztül). Minden más szolgáltatónál a `scope`
továbbra is tájékoztató jellegű, pontosan úgy, mint a #10334 előtt.
A `checkFallbackError` a megfelelő szabály hatókörét
`fallbackResult.ruleScope` értékként adja tovább; az
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) közös ellenőrzésként igazolja, hogy egy
`ruleScope` valóban biztonságosan kezelhető-e kapcsolatszintű, önmagát helyreállító
jelzésként (a hatókör `"connection"`, az ok `quota_exhausted`, soha nem `permanent`,
és soha nem `creditsExhausted` — védelem arra az esetre, ha egy jövőbeli szabály a
`"connection"` hatókört végleges fiókállapottal párosítaná). Két fogyasztó hívja:

- **Perzisztencia** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  a passthrough-szolgáltató **modellenkénti** zárolási ágába való belépés helyett
  (az agentrouter esetében `passthroughModels: true` → a `hasPerModelQuota()`
  értéke `true`), **ideiglenes kapcsolati lehűlési időt** alkalmaz —
  `testStatus: "unavailable"` + `rateLimitedUntil`, és soha nem végleges
  állapotot (`credits_exhausted`/`banned`/`expired`) — így a kapcsolat magától
  helyreáll, amikor a lehűlési idő lejár, és nem szükséges manuálisan
  visszaállítani a hitelesítő adatokat.
  A `disableCooling: true` beállítású kapcsolatok esetén kihagyásra kerül (#2997):
  ez a letiltás ehelyett a modellenkénti zárolásba engedi tovább a folyamatot
  (dokumentált kompromisszum — lásd az ág feletti kódmegjegyzést).
- **Kombinált útválasztás ugyanazon kérésen belül** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ugyanaz az őrjelző a kapcsolatot
  a memóriabeli `exhaustedConnections` halmazba helyezi, amelynek kulcsa
  `${provider}:${connectionId}`. Ez csak egy fennmaradó SAME-REQUEST célt hagy ki,
  amely **saját célobjektumán** már maga is hordozza pontosan azt a
  `connectionId` értéket (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, az `exhaustedConnections`
  keresése előtti `if (provider && connectionId)` feltétel) — egy egyszerű
  modell-listás kombináció, amelynél a testvércélok egyike sem hordoz saját,
  rögzített `connectionId` értéket, és az egyik csak küldésenként kerül feloldásra
  a válasz `X-OmniRoute-Selected-Connection-Id` fejlécéből, soha nem talál
  egyezést ezzel a kulccsal. Ebben a gyakori esetben a fennmaradó ág számára
  az éppen kimerített fiók újbóli használata elleni valódi védelem NEM ez a
  Set — hanem a fent ismertetett perzisztenciaréteg (a kapcsolat
  `rateLimitedUntil` értéke most a jövőbe mutat), kombinálva azzal, hogy ugyanez
  az őrjelző elnyomja a `transientRateLimitedProviders` értéket a hibánál
  (lásd a „Kétlépcsős kialakítás” részt és a `targetExhaustion.ts` fájlban lévő
  kódmegjegyzést az `isAgentrouterConnectionQuotaScope` ágról): mivel a Set
  jelöletlen marad, a `combo.ts` `allowRateLimitedConnection` általi
  kényszerített engedélyezése
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NEM lép működésbe
  a szolgáltató fennmaradó ágai esetén, ezért a hitelesítő adatok kiválasztásakor
  a `rateLimitedUntil` szűrő (`src/sse/services/auth.ts:1238`) a szokásos módon
  érvényesül, és egy fennmaradó ág vagy egy másik, még jogosult agentrouter
  kapcsolatot választ, vagy „nincs elérhető hitelesítő adat” hibával meghiúsul —
  nem kényszeríti vissza magát arra a kapcsolatra, amelyet ez az ág éppen
  lehűlési állapotba helyezett.

### Kétlépcsős kialakítás: az állapot újrafogalmazása, majd besorolás

Az állapot újrafogalmazása (`upstreamStatusRestatement.ts`) és a szolgáltatói
besorolási szabályok (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) külön regiszterek, amelyek egyaránt a szolgáltató
azonosítója és szöveges jelölők alapján működnek, de eltérő helyeken futnak és
eltérő célokat szolgálnak: az újrafogalmazás korán átírja a HTTP-állapotot a
`chatCore.ts` fájlban; a besorolási szabályok pedig kiválasztják a tartalék
`reason` értékét és zárolják a `scope` hatókörét
(`model` / `provider` / `connection`) a `checkFallbackError()` belsejében
(`open-sse/services/accountFallback.ts`).

A besorolási szabályok csak a teljes hiba **szövegét** látják (erre szükség van
az olyan törzsszövegbeli jelölők illesztéséhez, mint a `额度不足`) a
`providerErrorRules.ts` fájlban található `FULL_TEXT_RULE_PROVIDERS`
engedélyezési listában szereplő szolgáltatóknál — jelenleg csak az
`"agentrouter"` esetén. Minden más **beépített katalógusbeli** szolgáltatónál
a `checkFallbackError` csak a strukturált hibát (`{code, type}`) adja át a
`getProviderErrorRuleMatch` számára, ami elegendő a fejléc-, állapot- és
kódalapú szabályokhoz, de nem látja a törzsszövegbeli jelölőket.
A `resolveRuleMatchBody()` segédfüggvény végzi ezt a kiválasztást: az
engedélyezett szolgáltatóknál a teljes hiba szövegét, egyébként pedig a
strukturált hibát használja. Egy **beépített** szolgáltató
`FULL_TEXT_RULE_PROVIDERS` listához adása szolgáltatónkénti, kifejezett
engedélyezés — ennek célja, hogy a listán nem szereplő összes szolgáltató
alapértelmezett útvonala bájtról bájtra változatlan maradjon.

Egy szabály `scope` értéke (`model` / `provider` / `connection`) külön opt-in a
`FULL_TEXT_RULE_PROVIDERS` beállítástól: a `checkFallbackError` csak
`fallbackResult.ruleScope` értékként adja tovább, és az alsóbb szintű
felhasználók csak olyan esetben kezelik az információs címkénél többre, ha a
szolgáltató szerepel az ugyanebben a fájlban található
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` engedélyezési listában
(`honorsRuleLockScope()` segítségével ellenőrizve — jelenleg csak az
`"agentrouter"`). A fenti „Újrafogalmazott kvótahibák” rész ismerteti, hogy
pontosan mit eredményez egy `scope: "connection"` egyezés, miután a szolgáltató
felkerült erre az engedélyezési listára.

**#11104 — az operátor által deklarált szabályok mindkét engedélyezési listát
megkerülik.** Az operátor futásidőben szolgáltatónkénti szabályt deklarálhat a
`settings.providerErrorRules` segítségével
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`),
e fájl módosítása nélkül. Ha egy operátori szabályt a
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` engedélyezési
listákhoz kötnénk — amelyek a beépített katalógusszabályok **alapértelmezett**
viselkedésének védelmére szolgálnak —, a beállítási mechanizmus minden olyan
szolgáltatónál működésképtelenné válna, amely még nem szerepel ezeken a
listákon, mivel a szabály deklarálása már önmagában az operátor kifejezett
engedélyezése. A `resolveRuleMatchBody()` és a `honorsRuleLockScope()` először
a `hasOperatorRuleForProvider()` értékét ellenőrzi: az operátori szabállyal
rendelkező szolgáltató megkapja a nyers hiba szövegét, és a deklarált `scope`
értéke érvényesül, függetlenül attól, hogy a szolgáltató szerepel-e bármelyik
engedélyezési listán.

**Operátor által deklarált szabályok** (`OperatorProviderErrorRule`): minden
szabály egy opcionális `status` és egy opcionális `match` mezővel rendelkezik
(az utóbbi a hiba szövegének egyszerű, kis- és nagybetűtől független részszöveg-
illesztése, soha nem RegExp, így nem okozhat ReDoS-t), és a kettő közül legalább
az egyiket meg kell adnia. Ha mindkettő meg van adva, ÉS-kapcsolattal működnek;
a kihagyott mező bármit elfogad, így a `{match: "insufficient_quota"}` minden
olyan állapotra illeszkedik, amely ezt a kódot tartalmazza. Az első illeszkedő
szabály nyer. A `cooldownMs` legfeljebb 30 napot fogadhat el; összesen legfeljebb
50 szabály engedélyezett.

**Mindenre érvényes alapértékek** (`settings.providerErrorDefaults`, opt-in, a
`setOperatorProviderErrorDefaults` használatával állítható): `{[provider]: {cooldownMs, scope?, reason?}}`,
ahol a `cooldownMs` értéke 1 perctől 30 napig terjedhet. Az alapérték csak akkor
alkalmazható, ha sem operátori szabály, sem beépített katalógusszabály nem
illeszkedett, továbbá csak a 402, 403, 408, 429 és 5xx hibákra. A kérés alakjával
kapcsolatos hibák (400, 404, 409, 413, 422), valamint az önmagukban álló
401-es hibák megtartják saját kezelésüket. Explicit `reason` hiányában az ok az
állapotból származik, ugyanúgy, ahogy a `classifyError` esetében. Egy alapérték
deklarálása operátori szabálynak számít a `hasOperatorRuleForProvider()` számára,
ezért annak `scope` értékét (alapértelmezés szerint `"connection"`) figyelembe
kell venni. Egy alapérték tényleges várakozási ideje a `cooldownMs` és a szolgáltató
saját újrapróbálkozási javaslata közül a hosszabbik (`Retry-After`,
`x-ratelimit-reset`, illetve a törzsben található visszaállítási javaslat; ugyanaz
a javaslat, amelyet a motor akkor vesz figyelembe, amikor a kapcsolat-várakozás
beállítása, az „upstream újrapróbálkozási javaslatainak használata”, be van
kapcsolva), így az alapérték megnövelhet egy rövid upstream-javaslatot, de egy
valós visszaállítási időt soha nem rövidíthet meg. Az explicit operátori szabály
megtartja a pontos `cooldownMs` értékét. Sem egy szabály, sem egy alapérték nem
kerüli meg a `markAccountUnavailable` kapcsolat-várakozási védelmeit: egy aktív,
hosszabb várakozás soha nem rövidülhet meg, és terminális állapotot sem lehet
felülírni. A `checkFallbackError` korábban lefutó beépített szövegérzékelői
(elfogyott kreditek, napi kvóta, deaktivált fiók) továbbra is elsőbbséget élveznek
a saját kifejezéseik esetében.

**Ismert hiányosság — a `providerRuleRegistry` HTTP 400 esetén soha nem kerül
lekérdezésre.** A `checkFallbackError` `BAD_REQUEST` ága a 400-as állapotot
teljes egészében a saját mintatömbjein keresztül osztályozza
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` stb. az
`accountFallback.ts` fájlban), és még az előtte található
`configuredRule`/`getProviderErrorRuleMatch` ághoz való eljutás előtt visszatér.
Egy `status: 400` értékű beépített katalógusszabály (vagy operátori szabály)
szintaktikailag érvényes, de soha nem fog érvényesülni. Jelenleg egyetlen létező
szabály sem célozza a 400-as állapotot, ezért az éles működést semmi nem érinti —
egy jövőbeli 400-as szabályhoz azonban először ezt az ágat kell módosítani, ami
nagyobb változtatás egyetlen szabály hozzáadásánál (újraosztályozza a 400-as
hibákat minden olyan szolgáltatónál, amely már a mintatömbös viselkedésre támaszkodik),
és egyetlen szolgáltatószabály hozzáadásának hatókörén kívül esik.

### Új, kvótát hibásan közlő átjáró hozzáadása

1. Regisztrálj egy szabálytömböt a `statusRestatementRegistry` rendszerben
   (`open-sse/config/upstreamStatusRestatement.ts`). A `textMarkers` értékei
   legyenek szolgáltatóspecifikusak; soha ne használj újra olyan általános angol
   kifejezéseket, amelyek ütköznek a `CREDITS_EXHAUSTED_SIGNALS` értékeivel
   (`open-sse/services/accountFallback.ts`).
2. Opcionálisan regisztrálj osztályozási szabályokat az
   `open-sse/config/providerErrorRules.ts` fájlban
   (`providerRuleRegistry`), hogy kiválaszthasd a megfelelő zárolási hatókört
   (`connection` a teljes fiókra vonatkozó kvóta, `model` modellenkénti hibák
   esetén). Ez a lépés éles környezetben csak azoknál a szolgáltatóknál lép
   érvénybe, amelyek szabályainak szüksége van a teljes hiba szövegére
   (törzsjelölők): add hozzá a szolgáltató azonosítóját a
   `FULL_TEXT_RULE_PROVIDERS` listához ugyanebben a fájlban — ellenkező esetben a
   `checkFallbackError` csak a strukturált `{code, type}` hibát adja át a
   szabálynak, és egy törzsszövegen alapuló szabály soha nem fog illeszkedni az
   éles forgalomra. A kizárólag `status`/`headers` alapján illeszkedő szabályoknak
   (például az Opencode vagy a Minimax szabályainak) nincs szükségük erre az
   engedélyezésre. Ettől függetlenül, ha a szabály `scope: "connection"` értéket
   deklarál, és a cél ténylegesen teljes kapcsolatra érvényes várakozás, valamint
   az ugyanazon kéréshez tartozó kombinált kihagyás (nem csupán tájékoztató
   címke), add hozzá a szolgáltató azonosítóját a
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` listához ugyanebben a fájlban — ez szabályozza
   az `isAgentrouterConnectionQuotaScope()`-szerű felhasználást a
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) és az
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) esetében; enélkül a `scope`
   továbbra is átkerül a `fallbackResult.ruleScope` értékébe, de semmi nem fogja
   felhasználni.
3. Adj hozzá egységteszteket a
   `tests/unit/upstream-status-restatement.test.ts` és a
   `tests/unit/agentrouter-error-rules.test.ts` mintájára (beleértve a
   not-permanent / not-creditsExhausted ellenőrzéseket, valamint — ha a
   szolgáltatónak szüksége van az engedélyezési listára — egy tesztet, amely
   igazolja, hogy a `resolveRuleMatchBody()` csak az adott szolgáltatónál adja
   vissza a teljes szöveget).

Nincs szükség a `chatCore.ts`, a `classifyError` vagy a combo módosítására.

#### Egress-vödrözött zárolás (#10880)

Az `EGRESS_BUCKETED_LOCK_PROVIDERS` listában szereplő szolgáltatókat
(Opencode-család) IP-alapú upstreamként kezeljük (az Opencode ingyenes szintje
IP-alapú, nem fiókalapú — lásd: #9611): egy `quota_exhausted` **vagy**
`rate_limit_exceeded` értékre osztályozott 429-es állapot lehűti az összes olyan,
engedélyezési listán szereplő családi kapcsolatot, amelynek utolsó ismert
kimenő IP-címe megegyezik a hibát okozó kapcsolat címével, még mielőtt a rotáció
megpróbálná őket
— így elkerülhetők az N-1 garantáltan sikertelen upstream-hívások (ugyanolyan
módon, mint a #10460/#10525 esetében). A `rate_limit_exceeded` szándékosan
szerepel: a `markAccountUnavailable` útvonalon az Opencode-specifikus szabályok
soha nem illeszkednek (a `checkFallbackError` nem kap fejléceket/törzset, az
Opencode pedig nem szerepel a `FULL_TEXT_RULE_PROVIDERS` listában), ezért egy
olyan 429-es hiba, amelynek törzse az előfizetési kvótára utaló szöveget
("monthly usage limit reached") tartalmazza, a kvótaszöveg-tartalékág
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 órás várakozás)
segítségével `quota_exhausted` értékre osztályozódik, még mielőtt a `status_429`
szabály elérné — míg egy kvótaszöveget nem tartalmazó 429-es hiba (egyszerű
sebességkorlátozás) a `status_429` szabályon keresztül
`rate_limit_exceeded` értékre osztályozódik, és továbbra is lehűti az IP-családot.
Valós korlátok:

- **Legjobb erőfeszítés**: a zárolás a kapcsolat utolsó ismert `egress_ip` értékét a `proxy_logs` adataiból oldja fel (24 órás időablak, szinkron, gyorsítótár nélkül). Üres gyorsítótár (az egress IP-t még soha nem vizsgálták) vagy hiányzó sor esetén a hibázó kapcsolatot továbbra is a branch hűti (a mai működéshez hasonlóan rögzítve), csak testvérkapcsolat nem kerül zárolásra.
- **Soha nem végleges**: a hűtés megújuló kvótaablak (`testStatus: "unavailable"`); IP-szintű jelzésből soha nem származtatunk végleges állapotot. A `disableCooling` kapcsolatok teljesen kihagyják ezt a branchet.
- **A zárolás részletessége megváltozik az engedélyezési listán szereplő család esetén**: ez hatókörváltozás, nem csupán testvérkapcsolat-optimalizálás. Az opencode egy `passthroughModels` szolgáltató, ezért e branch előtt egy 429 kapcsolatonkénti MODEL-szintű zárolást eredményezett; most kapcsolat-szintű hűtést eredményez — akkor is, ha az operátor egyetlen, egyáltalán nem rendelkező testvérkapcsolattal futtat kapcsolatot. Ez az a részletesség, amelyet az opencode szabálytáblája már helyesnek deklarál (`scope: "connection"`, `providerErrorRules.ts`), de eddig soha nem érvényesült, mert az opencode nincs benne a `HONORS_RULE_LOCK_SCOPE_PROVIDERS` listában. A branch maga írja a hibázó kapcsolat hűtését és `backoffLevel` értékét, a kapcsolat-hatókörű agentrouter branch működését követve, majd visszatér — így a modellenkénti tiltás és az alábbi általános útvonal soha nem kerül elérésre.
- **A combo is szerepel**: az agentrouter branchhez hasonlóan a hatókör szándékosan figyelmen kívül hagyja azt a `persistUnavailableState`/`isCombo` visszaminősítést, amelyet egy combo hívó alkalmaz egy 429-re. A modellenkénti zárolás nem ennek a hatókörnek egy gyengébb formája, hanem helytelen egység: semmit nem mond a kimerített IP-ről, ezért a combo rotáció minden testvérkapcsolaton továbbra is elpazarolna egy garantáltan sikertelen hívást.
- **Testvérkapcsolatok biztonsága**: a már végleges állapotú (banned/credits_exhausted) vagy már hosszabb hűtési időben lévő testvérkapcsolatot soha nem írjuk felül.
- **Kizárólagos engedélyezési lista**: az `EGRESS_BUCKETED_LOCK_PROVIDERS` bővítése kifejezett tulajdonosi döntés; nincs általános bekötés (minta: #10334/#10419). A testvérkapcsolatok lekérdezése ugyanahhoz az engedélyezési listához kötődik, nem ismétli meg azt SQL-literálként, így a bővítése egyetlen sor módosításával megoldható.
- **Egress IP-rotáció, mindkét irányban**: a keresési időablak (24 óra) jóval szélesebb, mint az egress-IP-gyorsítótár TTL-je (5 perc), ezért az „utolsó ismert IP” előzmény, nem aktuális állapot. Ha egy kapcsolat proxyja az időablakon belül rotálódott, a zárolás **elvétheti** a valóban megosztott IP-t (a rögzített IP az új, még ki nem merített IP) — és szimmetrikusan lehűthet egy olyan testvérkapcsolatot is, amely időközben **elrotálódott** a kimerített IP-ről. A második eset egyetlen hűtési időablakba kerül a testvérkapcsolatnak; mindkettő elfogadott, előzményalapú keresésből eredő, legjobb erőfeszítés jellegű korlátozás.
- **Költség**: két korlátozott `proxy_logs`-vizsgálat (az `idx_pl_timestamp` használatával időablak szerint szűrve), csak 429-es gyakorisággal. Nincs szükség új indexre (134-es migráció, YAGNI). Mérés közepes méretű, valódi forgalmat tartalmazó adatbázis-másolaton történt; egy nagy áteresztőképességű példány arányosan több sort tart ugyanabban az időablakban.

## Egyéb hibatűrési funkciók

- **20 útválasztási stratégia** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — lásd: [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Reset-tudatos útválasztás** (v3.8.0) — a kapcsolatokat a kvóta-visszaállítási időpont szerint rangsorolja.
- **Háttérmód degradálása** — a Responses API `background: true` beállítása figyelmeztetéssel szinkron módra degradálódik.
- **Dinamikus eszközkorlát-érzékelés** — visszafogja a szolgáltatókat, amikor az eszközszám-korlátok betelnek.
- **Vészhelyzeti tartalék (emergency fallback)** — az `OMNIROUTE_EMERGENCY_FALLBACK` vezérli; az operátorok újraindítás nélkül felülírhatják a Feature Flags oldalon.

---

## Hibakeresés

- A weighted combo `503 all_targets_cooling_down` választ ad (`Retry-After` beállítva, a `diagnostics.excluded` minden célt felsorol `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` értékkel) → a pool konfigurálva van és csatlakozik, minden cél csupán egy hibatűrési időzítő miatt van kizárva; a `[COMBO] Weighted selection: every target excluded before dispatch — …` figyelmeztetés megnevezi az okokat és a hátralévő másodperceket. Az ugyanettől a combotól érkező `404 no_executable_targets` azt jelenti, hogy nem járt közre hibatűrési időzítő (nincs mit futtatni, vagy minden fiók elbukott a rendelkezésreállási próbán). Az `open-sse/services/combo/pinRecovery.ts` fájlban készült, a `targetResolution.ts`-ben összegyűjtött kizárásokból.
- Egy szolgáltató összes kulcsa kimarad → ellenőrizze a megszakító állapotát ÉS az egyes kapcsolatok `rateLimitedUntil`/`testStatus` értékét is.
- A szolgáltató a visszaállítási ablak után is véglegesen ki van zárva → a kód nyers `state`-et olvas a `getStatus()`/`canExecute()` helyett.
- Egy kulcs hibázik, a többinek működnie kellene → kapcsolati cooldown-t feltételezzen megszakító helyett.
- Csak egy modell hibázik → modell-zárolást feltételezzen kapcsolati cooldown helyett.
- Az állapotnak magától helyre kellene állnia, de nem áll helyre → keressen jövőbeli időbélyeget + olyan olvasási útvonalat, amely frissíti a lejárt állapotot. A végleges státuszok kézi módosítást igényelnek.

---

## Futásidejű állapot — gyorsreferencia ügynököknek

> Szó szerint áthelyezve az `AGENTS.md` fájlból → "Resilience Runtime State" (PR #12743), hogy az ügynök-útmutató a 40k kontextuskeret alatt maradjon. Ez a fenti szakaszok sűrített, ügynököknek szóló nézete; a számozott szakaszok maradnak a teljes referencia.

Az OmniRoute három rokon, de eltérő ideigleneshiba-kezelési mechanizmussal rendelkezik. Az útválasztási viselkedés hibakeresésekor tartsa külön a hatókörüket. Tekintse meg a [3 rétegű hibatűrési diagramot](../diagrams/exported/resilience-3layers.svg)
(forrás: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
az egy pillantással áttekinthető térképért.

### Szolgáltatói megszakító (Provider Circuit Breaker)

**Hatókör**: teljes szolgáltató, pl. `glm`, `openai`, `anthropic`.

**Cél**: leállítani a forgalom küldését egy olyan szolgáltató felé, amely ismételten hibázik az upstream/szolgáltatási szinten, hogy egyetlen egészségtelen szolgáltató se lassítsa le az összes kérést.

**Megvalósítás**:

- Alaposztály: `src/shared/utils/circuitBreaker.ts`
- Chat-kapu/végrehajtás bekötése: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Futásidejű állapot-API: `src/app/api/monitoring/health/route.ts`
- Közös burkolók: `open-sse/services/accountFallback.ts`
- Tárolt állapottábla: `domain_circuit_breakers`

**Állapotok** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: a normál forgalom engedélyezett.
- `DEGRADED`: korai figyelmeztető sáv — a hibák átlépték a degradálási küszöböt, de még nem a megszakító küszöbét; a forgalom tovább áramlik, a műszerfalak megjelenítik a figyelmeztetést. Egy érvényes kapcsolatteszt vagy egy új hiba nélküli nyugodt ablak visszaállítja `CLOSED` állapotba (az ablakot a `docs/architecture/RESILIENCE_GUIDE.md` írja le).
- `OPEN`: a szolgáltató ideiglenesen blokkolva van; a hívók provider-circuit-open választ kapnak, vagy a combo-útválasztás egy másik célra lép.
- `HALF_OPEN`: a visszaállítási időtúllépés eltelt; engedélyezett egy próbakérés. Siker esetén a megszakító bezárul, hiba esetén újra kinyílik.

**Alapértékek** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, amelyet a `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` fogyaszt a `src/lib/resilience/settings.ts` fájlban → `getCircuitBreaker(provider, …)` a `src/sse/handlers/chatHelpers.ts` fájlban). A teljes szolgáltatót érintő megszakító a `circuitBreakerThreshold` / `circuitBreakerReset` értékeken fut:

| Profil    | degradálódik ennél | kinyit ennél (`circuitBreakerThreshold`) | visszaállítás (`circuitBreakerReset`) |
| --------- | -----------------: | ---------------------------------------: | ------------------------------------: |
| OAuth     |                `5` |                                      `8` |                                 `60s` |
| API-kulcs |                `7` |                                     `12` |                                 `30s` |
| Helyi     |    (származtatott) |                                      `2` |                                 `15s` |

A `PROVIDER_PROFILES` emellett definiálja a `providerFailureThreshold` (10/15/2), a `providerFailureWindowMs` (15/30/5 perc) és a `providerCooldownMs` (5/10/1 perc) értékeket: ezek működtetik **az opt-in globális Provider Cooldown ablakkapuját** (`PROVIDER_COOLDOWN_ENABLED`, alapértelmezetten kikapcsolva) — az `open-sse/services/providerCooldownTracker.ts` szolgáltatószintű bejegyzése csak akkor számít hűlésnek, ha `providerFailureThreshold` hiba történik a `providerFailureWindowMs` időablakon belül, és ezután `providerCooldownMs` ideig hűl. Ezek NEM az élő megszakító küszöbértékei — ne hangolja őket megszakítóviselkedést várva. Minden alapérték felülírható az `OMNIROUTE_PROVIDER_BREAKER_*` és `OMNIROUTE_CIRCUIT_BREAKER_*` környezeti változókon keresztül; a futásidőben pontos referenciatáblázat a `docs/architecture/RESILIENCE_GUIDE.md` fájlban található.

Csak szolgáltatószintű hibastátuszok válthatják ki a szolgáltatói megszakítót:

```ts
(408, 500, 502, 503, 504);
```

Normál fiók-/kulcs-/modellhibákra — mint a legtöbb `401`, `403` vagy `429` eset — ne váltsa ki a teljes szolgáltatót érintő megszakítót. Ezek általában a kapcsolati cooldown vagy a modell-zárolás hatókörébe tartoznak. Egy általános API-kulcsos szolgáltató `403`-as hibájának helyreállíthatónak kell lennie, hacsak nem végleges szolgáltatói/fiókhibának minősül.

A megszakító lusta helyreállást használ, nem háttéridőzítőt. Amikor az `OPEN` állapot lejár,
az olyan olvasások, mint a `getStatus()`, a `canExecute()` és a `getRetryAfterMs()`,
`HALF_OPEN` állapotra frissítik az állapotot, így a dashboardok és a combo-jelöltépítők
nem zárják ki véglegesen a lejárt providert.

### Kapcsolati cooldown

**Hatókör**: egy provider-kapcsolat/fiók/kulcs.

**Cél**: egy hibás kulcs/fiók ideiglenes kihagyása, miközben ugyanannak a providernek a
többi kapcsolata továbbra is kiszolgálhatja a kéréseket.

**Megvalósítás**:

- Írási/frissítési útvonal: `src/sse/services/auth.ts::markAccountUnavailable()`
- Fiókválasztás/-szűrés: `src/sse/services/auth.ts::getProviderCredentials...`
- Cooldown-számítás: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Beállítások: `src/lib/resilience/settings.ts`

Fontos mezők a provider-kapcsolatokon:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Fiókválasztás során egy kapcsolat akkor kerül kihagyásra, amíg:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

A cooldownok szintén lusták: amikor a `rateLimitedUntil` a múltba kerül, a kapcsolat
ismét jogosulttá válik. Sikeres használatkor a `clearAccountError()` törli a
`testStatus`, `rateLimitedUntil` és hibamezőket, valamint a `backoffLevel` értékét.

Alapértelmezett kapcsolati cooldown-viselkedés:

- OAuth alap-cooldown: `5s`.
- API-kulcs alap-cooldown: `3s`.
- API-kulcs esetén a `429`-es hiba előnyben részesítse a felmenő rendszer
  újrapróbálkozási jelzéseit (`Retry-After`, reset fejlécek vagy értelmezhető
  reset-szöveg), ha azok elérhetők.
- Az ismétlődő, helyreállítható hibák exponenciális visszatartást (backoff)
  használnak:

```ts
baseCooldownMs * 2 ** failureIndex;
```

A thundering-herd elleni védelem megakadályozza, hogy az ugyanazon a kapcsolaton
egyidejűleg bekövetkező hibák ismételten meghosszabbítsák a cooldownt, vagy kétszer
növeljék a `backoffLevel` értékét.

A terminális állapotok nem cooldownok. A `banned`, az `expired` (amely csak N
korlátozott újrapróbálkozás után válik terminálissá az `EXPIRED_RETRY_MAX`
révén) és a `credits_exhausted` állapotoknak nem elérhetőnek kell maradniuk, amíg a
hitelesítő adatok/beállítások meg nem változnak, vagy egy operátor vissza nem állítja
őket. Ne írja felül a terminális állapotokat átmeneti cooldown-állapottal.

### Modell-kizárás

**Hatókör**: provider + kapcsolat + modell.

**Cél**: elkerülni egy teljes kapcsolat letiltását, amikor csak egyetlen modell nem
érhető el vagy kvótakorlátos az adott kapcsolaton.

Példák:

- Modellenkénti kvótával rendelkező providerek, amelyek `429`-et adnak vissza.
- Helyi providerek, amelyek egy hiányzó modellre `404`-et adnak vissza.
- Provider-specifikus mód-/modelljogosultsági hibák, például bizonyos Grok-módok.

A modell-kizárás az `open-sse/services/accountFallback.ts` fájlban található, és
lehetővé teszi, hogy ugyanaz a kapcsolat továbbra is kiszolgálja a többi modellt.

### Hibakeresési útmutató

- Ha egy provider összes kulcsa ki van hagyva, vizsgálja meg mind a provider
  megszakítójának állapotát, mind az egyes kapcsolatok
  `rateLimitedUntil`/`testStatus` értékeit.
- Ha egy provider a reset-ablak után is véglegesen kizártnak tűnik, ellenőrizze, hogy a
  kód a nyers `state` értéket olvassa-e a `getStatus()`/`canExecute()` használata
  helyett.
- Ha egy providerkulcs hibázik, de a többinek működnie kellene, a provider-megszakító
  helyett a kapcsolati cooldownt részesítse előnyben.
- Ha csak egyetlen modell hibázik, a kapcsolati cooldown helyett a modell-kizárást
  részesítse előnyben.
- Ha egy állapotnak öngyógyulónak kell lennie, rendelkeznie kell egy jövőbeli
  időbélyeggel/reset-időtúllépéssel és egy olyan olvasási útvonallal, amely frissíti a
  lejárt állapotot. A végleges állapotok manuális hitelesítőadat- vagy
  konfigurációmódosítást igényelnek.

---

## TLS-ujjlenyomat és stealth

A szolgáltatóspecifikus stealth-technikák (JA3/JA4, CCH, obfuszkáció) külön dokumentációban szerepelnek — lásd: `docs/security/STEALTH_GUIDE.md` (git; nem fordul bele a `/docs`-ba).

---

## Ellenállóképesség-tesztelés (8. fázis · C blokk)

Az ellenállóképességi logika egységtesztjein túl három teszt valós terhelési/hibahelyzetekben is megvizsgálja a futtatókörnyezetet (mindegyik integrációs/éjszakai teszt — egyik sem blokkolja a PR-eket):

| Teszt       | Leírás                                                                                                                                                                                                                                   | Futtatás                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Chaos       | Hamis upstream csomópont valós késleltetést/resetet/időtúllépést/503-as hibát injektál; ellenőrzi, hogy a circuit breaker kinyit és helyreáll, valamint hogy a `checkFallbackError` az 503-at helyreállítható fallback-ként osztályozza. | `RUN_CHAOS_INT=1 npm run test:chaos`      |
| Heap-growth | ~500 stream `createSSEStream`-enként `--expose-gc` alatt; hibát jelez, ha a heap a plafon fölé nő (OOM-védelem, #3069).                                                                                                                  | `npm run test:heap`                       |
| k6 soak     | Tartós terhelés a `/api/monitoring/health` végpont ellen; p95-/hibaküszöbök.                                                                                                                                                             | `k6 run tests/load/k6-soak.js` (éjszakai) |

Az orchestrációt a `.github/workflows/nightly-resilience.yml` végzi (cron + dispatch). Az alapértelmezett `test:integration` futtatásban a chaos és a heap teszt automatikusan kihagyja magát (`RUN_CHAOS_INT`/`--expose-gc` nélkül).

---

## Lásd még

- [Architektúra-útmutató](./ARCHITECTURE.md) — Rendszerarchitektúra és belső működés
- [Felhasználói útmutató](../guides/USER_GUIDE.md) — Szolgáltatók, kombók, CLI-integráció
- [Auto-Combo motor](../routing/AUTO-COMBO.md) — 16 faktoros pontozás, módcsomagok
