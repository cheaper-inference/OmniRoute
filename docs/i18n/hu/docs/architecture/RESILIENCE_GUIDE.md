# Resilience Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

Az OmniRoute három különálló, de egymással összefüggő rezilienciamechanizmussal rendelkezik. Mindegyik eltérő hatókörrel és céllal bír. Az útválasztási viselkedés hibakeresésekor kezelje őket különállóként.

![Háromrétegű rezilienciamodell](../diagrams/exported/resilience-3layers.svg)

> Forrás: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Szolgáltatói áramkör-megszakító

**Hatókör:** a teljes szolgáltató (pl. `glm`, `openai`, `anthropic`).

**Cél:** leállítani a forgalom küldését egy olyan szolgáltatóhoz, amely upstream-/szolgáltatási szinten ismételten meghibásodik.

**Megvalósítás:**

- Alaposztály: `src/shared/utils/circuitBreaker.ts`
- Bekötés: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Állapot-API: `GET /api/monitoring/health`
- Visszaállítási API: `POST /api/resilience/reset`
- Burkolók: `open-sse/services/accountFallback.ts`
- Adatbázistábla: `domain_circuit_breakers`

**Állapotok:**

- `CLOSED` — a normál forgalom engedélyezett
- `DEGRADED` — a forgalom továbbra is engedélyezett, de a szolgáltatói hibák megnövekedett száma nyomon követés alatt áll; elegendő siker, érvényes kapcsolati teszt, illetve az utolsó hibatípushoz tartozó leghosszabb `OPEN` várakozási idő (annak `cooldownByKind` értéke, ennek hiányában `resetTimeout`, × `maxBackoffMultiplier`, legalább egy várakozási idő) új hiba nélküli letelte után visszatér `CLOSED` állapotba
- `OPEN` — a szolgáltató ideiglenesen blokkolva van; a kombinált útválasztás kihagyja
- `HALF_OPEN` — a visszaállítási időkorlát letelt; próbakérés engedélyezett

**Konfigurálható alapértékek (`open-sse/config/constants.ts`, elérhetők az Irányítópult → Beállítások → Hibatűrés menüpontban):**

| Osztály   | Csökkentett mód ennyi hibánál | Megnyílik ennyi hibánál | Visszaállítási időkorlát |
| --------- | ----------------------------- | ----------------------- | ------------------------ |
| OAuth     | 5 hiba                        | 8 hiba                  | 60s                      |
| API-kulcs | 7 hiba                        | 12 hiba                 | 30s                      |
| Helyi     | származtatott                 | 2 hiba                  | 15s                      |

A `degradationThreshold` szabályozza, hogy a szolgáltató mikor lépjen `DEGRADED` állapotba; a `failureThreshold` szabályozza, hogy mikor nyíljon meg és mikor legyen kihagyva. A helyi szolgáltatói profilok még nem jelennek meg a Hibatűrés beállítási oldalán.

**Kioldási kódok:** csak a szolgáltatói szintű `[408, 500, 502, 503, 504]` állapotkódok. Fiókszintű hibák esetén (a legtöbb 401/403/429 — ezek a várakozási időhöz vagy a zároláshoz tartoznak) NE oldjon ki.

**Lusta helyreállítás:** amikor az `OPEN` lejár, a `getStatus()`, a `canExecute()` és a `getRetryAfterMs()` `HALF_OPEN` állapotra frissít. Ugyanezek az olvasások (valamint a következő hiba) egy elavult `DEGRADED` állapotot fokozatosan visszaállítanak `CLOSED` állapotra. Nincs szükség háttérben futó időzítőre.

---

### Opcionális globális szolgáltatói várakozási idő (időablak-kapu)

Egy negyedik, **opcionális** réteg (`PROVIDER_COOLDOWN_ENABLED`, alapértelmezés szerint **kikapcsolva**) a hibás szolgáltatókról kérések közötti memóriát tart fenn az
`open-sse/services/providerCooldownTracker.ts` fájlban, amelyet a kombinált célpontok
feloldása használ, így az egymást követő kombinált kérések nem próbálják újra végigjárni az éppen
meghibásodott szolgáltatót. A szolgáltatói szintű bejegyzések a `PROVIDER_PROFILES` időablak-kapuját követik:

| Profil    | kiold ennyi után (`providerFailureThreshold`) | ezen belül (`providerFailureWindowMs`) | ennyi ideig várakozik (`providerCooldownMs`) |
| --------- | --------------------------------------------: | -------------------------------------: | -------------------------------------------: |
| OAuth     |                                          `10` |                                `15min` |                                       `5min` |
| API-kulcs |                                          `15` |                                `30min` |                                      `10min` |

A küszöbérték alatt a szolgáltató **nem** minősül várakozó állapotúnak; egy siker
törli az időablakot. A kapcsolatszintű bejegyzések (`provider:connectionId`) ehelyett megtartják az
exponenciális `minRetryCooldownMs → maxRetryCooldownMs` visszalépést. Felülbírálások:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regresszióvédő teszt: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Kapcsolati várakozási idő

**Hatókör:** egyetlen szolgáltatói kapcsolat/fiók/kulcs.

**Cél:** egy hibás kulcs kihagyása, miközben ugyanazon szolgáltató többi kapcsolata továbbra is kiszolgálja a kéréseket.

**Megvalósítás:**

- Elérhetetlenként megjelölés: `src/sse/services/auth.ts::markAccountUnavailable()`
- Kiválasztás: `getProviderCredentials*` ugyanabban a fájlban
- Várakozási idő kiszámítása: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Beállítások: `src/lib/resilience/settings.ts`

**Kapcsolatonkénti mezők:**

- `rateLimitedUntil` — időbélyeg, ameddig a várakozási idő tart
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — az exponenciális visszalépés számlálója

**Alapértelmezett várakozási idők:**

- OAuth-alapérték: 5 s
- API-kulcs alapértéke: 3 s
- API-kulcsos 429: előnyben részesíti a felsőbb szintű szolgáltatás `Retry-After`/visszaállítási fejléceit, illetve az értelmezhető visszaállítási szöveget
- Visszalépés: `baseCooldownMs * 2 ** failureIndex`

**Tömeges egyidejű újrapróbálkozás elleni védelem:** megakadályozza, hogy a párhuzamos hibák túlzottan meghosszabbítsák a várakozási időt, vagy kétszer növeljék a `backoffLevel` értékét.

**A párhuzamossági korlát miatti 429-es hibák nem lépnek feljebb a visszalépési létrán.** Az olyan `429`, amelynek törzse párhuzamossági korlátot jelez ("too many concurrent requests", "concurrency limit", "parallel request limit", GLM `并发数过高`), azt jelenti, hogy a fiók működőképes, de foglalt.
A `checkFallbackError()` a `concurrency_limited` okot adja vissza: azonnal átáll a következő kapcsolatra, ezt a kapcsolatot rögzített `CONCURRENCY_LIMIT_COOLDOWN_MS` (1 s) időre vagy a felsőbb szintű szolgáltatás újrapróbálkozási javaslatának megfelelő időre várakoztatja, változatlanul hagyja a `backoffLevel` értékét, és beállítja a `skipProviderBreaker` értéket.
Az explicit kvótatörzs továbbra is elsőbbséget élvez, így a kvótamintára is illeszkedő törzs kvótára vonatkozó minősítést kap.
Észlelés: `looksLikeConcurrencyLimit()` a `src/shared/utils/classify429.ts` fájlban;
minősítés: `open-sse/services/accountFallback/concurrencyLimit429.ts`. A `classify429()` (a megszakító `FailureKind` értéke) változatlan marad, és ezeknél a törzseknél továbbra is `rate_limit` értéket ad.

**A stream tartalmának elakadása nem helyezi várakozási állapotba a fiókot.** Amikor a tartalomelakadás figyelője (`open-sse/utils/streamHandler.ts`) felad egy olyan streamet, amely nem küldött időben modellkimenetet, a `markAccountUnavailable()` rögzíti a hibát a kapcsolaton, de nem állít be várakozási időt: az elakadás az adott kéréshez tartozik, és leggyakrabban egy hosszú következtetési szakaszt jelent, amely még nem adott kimenetet. Az üzemeltetők a `resilienceSettings.streamStallCooldown.enabled` beállítással ismét bekapcsolhatják ezt a működést (alapértelmezés: `false`).

**A következtetési keretek újraindítják a tartalomelakadási időkeretet.** Egy következtetési modell akár percekig is gondolkodhat az első látható tokenje előtt: a Claude olyan `thinking_delta` kereteket streamel, amelyek gondolkodási szövege üres lehet, a Responses API pedig egymás után streameli a következtetési elemeket. Az `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) felismeri ezeket a kereteket, és a figyelő mindegyiknél újraindítja az időkeretet a kérés megszakítása helyett. Ezek továbbra sem számítanak modellkimenetnek, ezért a kizárólag következtetéssel végződő forduló továbbra is üresként lesz jelentve, a következtetést befejező és ezután csak életjeleket küldő fordulónál pedig továbbra is aktiválódik a figyelő.

A Kiro nem üres aláírással rendelkező bináris `reasoningContentEvent` keretei ezt a következtetési tevékenységet üres `reasoning_content` változásként továbbítják a végrehajtón keresztül. Az aláírás nem kerül továbbításra. A metaadatok, a hiányos keretek és az üres aláírások nem indítják újra a tartalmi időkeretet; az aktív streamekre vonatkozó független időtúllépés és a kliens általi megszakítás továbbra is érvényes (`open-sse/executors/kiro/reasoning.ts`).

**Végállapotok (NEM várakozási idők):**

- `banned` — tiltott kulcsszó vagy fióktiltás észlelése állítja be (lásd: [BAN_DETECTION](../security/BAN_DETECTION.md)), valamint három egymást követő, felsőbb szintű szolgáltatástól származó, kérésenkénti elutasítás (`request_rejected`, például Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); egyetlen elutasítás csak várakozási állapotba helyezi a kapcsolatot
- `expired` (korlátozott számú újrapróbálkozás után végállapotba lép — `EXPIRED_RETRY_MAX = 3`, exponenciális visszalépéssel —, így az átmeneti OAuth-hibák maguktól helyreállhatnak, mielőtt a fiók véglegesen deaktiválódna)
- `credits_exhausted`

Ezek addig megmaradnak, amíg a hitelesítési adatok meg nem változnak, vagy egy üzemeltető vissza nem állítja őket. A végállapotokat nem szabad átmeneti várakozási állapottal felülírni.

**Lusta helyreállítás:** amikor a `rateLimitedUntil` időpontja elmúlt, a kapcsolat ismét kiválaszthatóvá válik. Sikeres használat esetén a `clearAccountError()` törli az összes hibamezőt.

### Claude OAuth használati fal: alacsonyabb prioritású sáv + munkamenet-korlát visszaállítása

**Hatókör:** egyetlen Claude-előfizetéshez tartozó OAuth-kapcsolat. Mindkét funkció **kapcsolatonként külön engedélyezhető** (Kapcsolat szerkesztése → Claude szakasz → `lowPriorityMode` / `autoLimitReset` a `providerSpecificData` mezőben; alapértelmezés szerint mindkettő ki van kapcsolva), és a Claude Code `/low-priority`, illetve `/limit-reset` parancsának működését tükrözi (a vezetékes szerződés a Claude Code 2.1.263 verziójából származik).

**Megvalósítás:**

- Állapotgép + válaszbesorolás: `open-sse/services/claudeLowPriority.ts`
- Visszaállítási állapot/igénylési kliens: `open-sse/services/claudeLimitReset.ts`
- Végrehajtói horog (fejléc beillesztése + újrapróbálkozás ugyanazzal a fiókkal): `open-sse/executors/base.ts::execute()`
- Az engedélyezési beállítás tartós tárolása: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Aktiválási feltétel:** az 5 órás használati fal — egy olyan `429`, amelynek fejlécei tartalmazzák az `anthropic-ratelimit-unified-status: rejected` értéket, és amikor a fiók jogosult rá, az `anthropic-ratelimit-unified-slow-offer: treatment` értéket is. Az első, használati falat jelző 429-es válasz előtt semmi sem kerül elküldésre; az egységes fejlécek nélküli, hirtelen terhelésből eredő 429-es válasz a normál várakozási útvonalon halad végig.

**Alacsonyabb prioritású sáv** (`lowPriorityMode`):

- A korlát elérésekor kapott 429 esetén a végrehajtó elfogadja az ajánlatot, és azonnal újrapróbálkozik **ugyanazzal**
  a fiókkal az `anthropic-usage-limit: slow` használatával; a sáv aktív marad a bejelentett
  `anthropic-ratelimit-unified-reset` időpontig (+60 mp türelmi idő), és az ezen időablakon belüli
  összes kérés tartalmazza a fejlécet. Az elfogott 429 soha nem jut el a `handleChatCore` függvényhez,
  így a kapcsolat **nem** kerül lehűlési állapotba, és nem vált át másik kapcsolatra.
- Az `anthropic-ratelimit-unified-slow-status` a későbbi válaszokban: az `active` / `not_needed`
  megtartja a sávot; a `slot_busy` (429) vagy egy `529` esetén kivárja a kiszolgáló
  `anthropic-ratelimit-unified-slow-retry-after` értékét (alapértelmezetten 20 mp, 5–600 mp közé korlátozva, ±30% jitterrel),
  majd újrapróbálkozik az `anthropic-ratelimit-unified-slow-max-wait` által meghatározott korláton belül (alapértelmezetten 20 perc, 1 perc–6 óra
  közé korlátozva) — ennek túllépése után a sáv véget ér, és egy 10 perces lehűlési időszak blokkolja az újbóli elfogadást. A
  várakozást tovább korlátozza a kérés saját upstream-indítási időkorlátjából fennmaradó idő
  (`resolveFetchStartTimeout`, alapértelmezetten 10 perc), 5 mp biztonsági ráhagyással csökkentve: e korlát nélkül az
  alapértelmezett 20 perces maximális várakozás túlélne magát a kérést, és az alvás
  várakozás közben megszakadna, így a szabályos `max_wait` befejezés + lehűlés helyett
  `TimeoutError` jelenne meg.
- A `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, egy 5 órás időablak átfordulása, vagy az
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (amely bármilyen állapotnál
  `extra_usage` eredménnyel zárja le, mivel a fizetett túlfogyasztás ekkor már fedezi a korlátot) megszünteti a sávot; a
  válasz ezután a normál lehűlési útvonalra kerül. A `budget_exhausted` állapot a
  bejelentett költségkeret-visszaállításig (≤ 8 nap) megmarad.
- A korlátellenőrzés a végrehajtó saját, 400 által kiváltott, kísérleten belüli újrapróbálkozásai után fut le (kontextus
  szerkesztése, gondolkodási/erőfeszítési korlátozások, automatikus paramétertanulás), így ha egy korlátot jelző 429 csak
  az egyik ilyen újrapróbálkozás során jelenik meg, azt továbbra is elfogja a rendszer ahelyett, hogy elérné a lehűlési útvonalat.
- Az állapot kapcsolatonként a memóriában található (egy újraindítás egy további, korlátot jelző 429-be kerül az újbóli elfogadáshoz).

**Munkamenetkorlát visszaállítása** (`autoLimitReset`, mindkettő bekapcsolása esetén a sáv előtt próbálkozik):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  blokk; amikor `arm: "reset"` és `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` a következővel:
  `{ "program": "juniper_tide" }` (a szervezet UUID-je a
  `providerSpecificData.organizationUUID` mezőből, bootstrap tartalékmegoldással).
- `result: reset|not_limited` → a kérés teljes sebességgel újrapróbálkozik (lassító fejléc nélkül).
  Az `already_used` / `not_offered` megjegyzi a `next_available_at` értékét (alapértelmezetten egy hét);
  bármilyen hiba 15 perces visszalépést eredményez. A visszaállítás hetente egyszer végezhető el, és továbbra is
  beleszámít a heti korlátba.

Regresszióvédelmi tesztek: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Munkamenet-affinitás (#7274)

**Hatókör:** egy kliensmunkamenet (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` fejléc) egy kapcsolathoz rögzítve, **bármely** szolgáltató esetén.

**Cél:** egy többfordulós ügynököt (Claude Code, aider, egyéni ügynökök) ugyanazon a fiókon tartani a kérések között, csökkentve a fiókok közötti kontextusvesztést és az ismétlődő hidegindítási 429-eket a fiókonkénti munkamenet-állapotot használó szolgáltatóknál.

**Megvalósítás:**

- TTL feloldása: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Rögzítés kiválasztása/létrehozása: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Fejléc kinyerése (általános, bármely szolgáltató): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tartósan tárolt rögzítési tábla: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Beállítás: `sessionAffinityTtlMs` (globális TTL ezredmásodpercben, a `0` letiltja) — `src/lib/db/settings.ts`. A csak Codexre vonatkozó `codexSessionAffinityTtlMs` értékről a `124_generic_session_affinity_ttl.sql` migráció nevezte át, amely minden korábban konfigurált Codex TTL-t átvisz új alapértelmezettként.

A #7274 előtt a `resolveSessionAffinityTtlMs()` minden, a `codex` szolgáltatótól eltérő szolgáltató esetén azonnal `0` értékkel tért vissza, így a TTL-beállításnak (és a munkamenet-fejléceknek) máshol nem volt hatása, noha a rögzítési mechanizmus és a fejléc kinyerése már szolgáltatófüggetlen volt. A javítás eltávolította ezt a korai visszatérést; a TTL mostantól egységesen vonatkozik minden szolgáltatóra, amint globálisan `0` fölé állítják.

A három munkamenet-affinitási fejlécet a rendszer soha nem továbbítja upstream irányba — a végrehajtók saját upstream fejléceiket az alapoktól építik fel ahelyett, hogy továbbítanák a kliens fejléceit, így ezek kizárólag belső korrelációs azonosítók maradnak.

### Kizárólagos felügyelt munkamenet-kapcsolati bérletek

**Hatókör:** egy aktív felügyelt HTTP-kliens/munkamenet birtokol egy jogosult OmniRoute-kapcsolatot.

**Cél:** tartós, kizárólagos kapcsolattulajdonlást biztosítani azoknak a klienseknek, amelyeknek a kérések között szigorú útválasztási
korlátra van szükségük. Ez eltér a munkamenet-affinitástól, amely csak puha folytonossági preferencia:
a kizárólagos bérlet tartósan tárolja az életciklus állapotát az SQLite-ban, globálisan kikényszeríti az aktív tulajdonosok és
aktív kapcsolatok egyediségét, és elutasítja az elavult generációt a szolgáltatóhoz történő továbbítás előtt.

A funkció API-kulcsonként külön engedélyezhető. Egy felügyelt kulcsnak rendelkeznie kell a `lease:exclusive` hatókörrel és egy
kifejezetten megadott, nem üres `allowedConnections` listával. Bármely HTTP-kliens használhatja az életciklus-végpontot; nincs
szükség kliensnévre, felhasználói ügynökre, szolgáltatóra, OAuth-módszerre vagy modellre. A bérlet egy kapcsolatot birtokol,
nem pedig egy modellt, ezért a modellváltás megtartja a kötést mindaddig, amíg a kapcsolat a szokásos feltételek szerint
jogosult marad. A normál modell-, kvóta-, állapot-, lehűlési és engedélyezésilista-szabályok továbbra is mérvadók, és
ugyanazt a generációt egy másik szabad, jogosult kapcsolatra válthatják át.

Az életciklus a `POST /api/v1/session-leases` végponton zajlik az `acquire`, `renew` és `release` JSON-műveletekkel.
A felügyelt következtetési kérések megadják az átlátszatlan `X-OmniRoute-Lease-Owner` értéket és a pontos
`X-OmniRoute-Lease-Generation` értéket. A tulajdonosazonosító a `vlo_` előtagból és az azt követő 43 base64url-karakterből áll; csak
az SHA-256-kivonata kerül tárolásra. Minden végső továbbítási korlát azonosítja a hitelesített API-kulcs azonosítóját és
az aktív kapcsolat azonosítóját is. A bérletvezérlési fejlécek eltávolításra kerülnek a naplókból, a megőrzött kéréspillanatképekből és
a felsőbb rétegbeli végrehajtónak továbbított fejlécekből.

Ha a normál útválasztásnak vannak megfelelő felügyelt jelöltjei, de minden szabad jelöltet egy
idegen, aktív bérlet foglal el, az OmniRoute HTTP `429` választ, lease-capacity-unavailable kódot,
waiting-for-capacity állapotot és a legkorábbi releváns lejáratból származtatott, korlátozott `Retry-After` értéket ad vissza.
A megfelelőségi jelöltek normál hiánya nem bérletütközés, ezért megtartja a meglévő útválasztási hibaszemantikát.

A kapcsolódó mechanizmusok továbbra is elkülönülnek:

- Az OAuth-munkamenetek foglaltsága folyamaton belüli, laza elosztást biztosít az OAuth-fiókok számára.
- A fiókszemaforok kérés-egyidejűségi engedélyeket adnak, amelyek a kérés befejeződésekor megszűnnek.
- Az exkluzív felügyelt munkamenet-bérletek tartós életciklus-tulajdonjogot biztosítanak generációs korláttal.

---

## 3. Modellkizárás

**Hatókör:** szolgáltató + kapcsolat + modell hármasa.

**Kulcshatókör állapot szerint:** a hibát jelző állapot határozza meg, hogy a kizárás melyik kulcsra íródik
(`resolveLockoutScope()` az `open-sse/services/accountFallback/exactModelLock.ts` fájlban):

- `429` / `403` / `402` — kvótára vagy jogosultságra utaló jelzés — a **kvótacsaládot** zárolja:
  codex esetén a teljes `codex` / `spark` hatókört (a kapcsolat összes `gpt-5*` modelljét),
  más szolgáltatóknál pedig a `getQuotaScopedModelForProvider()` által meghatározottat.
- A `404` a konkrét modellt zárolja (a `getModelLockKey()` leszűkíti a `not_found` esetet).
- Bármely más állapot — `5xx` átviteli/szerverhibák, valamint az OmniRoute minőség-ellenőrzése által
  előállított saját `502` állapot — kizárólag a **pontos**
  szolgáltató/kapcsolat/modell hármast zárolja. Egy modell hibás adatfolyama nem bizonyíték
  a fiók kvótahelyzetére; e szabály előtt egyetlen üres válasz a
  `codex/gpt-5.6-luna` modellen 2–30 percre (egyre hosszabb időre) eltávolította
  az adott kapcsolat összes `gpt-5*` modelljét az útválasztásból,
  miközben a kvóta érintetlen maradt.
- A hívó explicit `scope` beállítása mindig elsőbbséget élvez (az Antigravity az `"exact"` értéket adja át).

**Cél:** elkerülni egy teljes kapcsolat letiltását, amikor csak egyetlen modell nem érhető el, vagy annak kvótája korlátozott.

**Példák:**

- Modellenkénti kvótát alkalmazó szolgáltatók, amelyek 429-es állapotot adnak vissza
- Helyi szolgáltatók, amelyek egyetlen hiányzó modell esetén 404-es állapotot adnak vissza
- Szolgáltatóspecifikus mód-/modelljogosultsági hibák (például Grok-módok)

**Megvalósítás:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Modell-várakoztatások irányítópultja (v3.8.0)

Felület: Beállítások → Modell-várakoztatások (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Az aktív kizárásokat sorolja fel a következőkkel: szolgáltató, kapcsolat, modell, ok, expiresAt. Az üzemeltetők manuálisan újra engedélyezhetnek egy modellt a kártyáról.

**REST API:**

- `GET /api/resilience/model-cooldowns` — aktív kizárások listázása
- `DELETE /api/resilience/model-cooldowns` — manuális újraengedélyezés. Törzs: `{provider, connection, model}`. Hitelesítés: felügyeleti.

### Várakoztatás-kezelő

Felület: Megfigyelés → Várakoztatás-kezelő (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Egyetlen oldal minden olyan kapcsolathoz, amely átmeneti okból kikerült az útválasztásból, így nem kell
minden szolgáltatói oldalt külön megnyitni. Felsorolja a kapcsolatok várakoztatásait, a modellkizárásokat és a végállapotokat,
valamint törli ezeket kapcsolatonként, egy kijelöléshez vagy egy szolgáltató összes kapcsolatánál,
továbbá szerkeszti a leggyakrabban finomhangolt várakoztatási szabályokat: a `streamStallCooldown.enabled` beállítást, illetve az OAuth-/API-kulcsos
`connectionCooldown` alap-várakoztatását és maximális visszalépési lépéseit (mentésük a
`PATCH /api/resilience` végponton keresztül történik). A végállapotok (`banned`, `expired`, `credits_exhausted`)
megjelennek a listán, de itt soha nem törlődnek.

**REST API** (`src/lib/resilience/cooldownManager.ts`, hitelesítés: felügyeleti):

- `GET /api/resilience/cooldowns[?provider=]` — kapcsolatok állapottal, hátralévő várakoztatási idővel,
  visszalépési szinttel, utolsó hibatípussal és modellkizárásokkal (hitelesítő adatok nélkül)
- `POST /api/resilience/cooldowns` — törzs: `{connectionIds: string[]}` vagy
  `{all: true, provider?}`; visszatérési érték: `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Kizárási beállítások felülete + siker alapján csökkenő helyreállítás (v3.8.23)

A modellkizárás a mindig bekapcsolt, fixen kódolt működés helyett teljesen konfigurálható,
külön engedélyezhető funkcióvá vált, saját beállításkártyával és öngyógyító helyreállítási útvonallal.

**Beállításkártya:** Beállítások → Modellkizárás
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Ez **különbözik** a fenti, csak olvasható `ModelCooldownsCard` kártyától (amely csupán
_felsorolja_ az aktív kizárásokat) — az új kártya _a paramétereket konfigurálja_. Az alapértékek
a `DEFAULT_MODEL_LOCKOUT_SETTINGS` értékben találhatók
(`src/lib/resilience/modelLockoutSettings.ts`):

| Beállítás               | Alapérték                        | Jelentés                                                                  |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Főkapcsoló — a modellkizárás **alapértelmezés szerint ki van kapcsolva**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Modellhatókörű hibának számító felsőbb rétegbeli állapotok.               |
| `baseCooldownMs`        | `120_000` (120 s)                | Az első hiba kezdeti kizárási időtartama.                                 |
| `maxCooldownMs`         | `1_800_000` (30 perc)            | A megnövelt várakoztatási idő felső korlátja.                             |
| `maxBackoffSteps`       | `10`                             | Az exponenciális visszalépés növelési lépéseinek maximális száma.         |
| `useExponentialBackoff` | `true`                           | Meghosszabbítsák-e az ismétlődő hibák exponenciálisan a várakoztatást.    |

A beállításokat a szokásos beállítástároló őrzi meg, érvényesítésük pedig a
rezilienciabeállítások sémáján keresztül történik; a kártya korlátok közé szorítja a `baseCooldownMs`/`maxCooldownMs`
értékét (`maxCooldownMs ≥ baseCooldownMs`), valamint a `maxBackoffSteps` értékét.

**Siker alapján csökkenő helyreállítás:** a helyreállítás **nem** pusztán az időzítő lejártán alapul. Egy hibamentes
válasz fokozatosan csökkenti a modell hibaszámát, így az időablak közben helyreálló modell
állapota nem romlik tovább, és a kizárása az időzítő lejárta előtt megszűnik. Egy kombinált cél sikeres
elérésekor az `open-sse/services/combo.ts` meghívja a `decayModelFailureCount()`
függvényt (`open-sse/services/accountFallback.ts`), amely **megfelezi** a tárolt
`failureCount` értékét (`Math.floor(failureCount / 2)`); amikor az eléri a `0` értéket, a kizárási
bejegyzés teljes egészében törlődik. A párjaként működő `recordModelLockoutFailure()`
növeli a számlálót (és meghosszabbítja a várakoztatást), ha a hibák a
növelési időablakon belül következnek be. Ez a siker alapján történő csökkentés kiegészíti az egyszerű időzítő-lejáratot —
bármelyik útvonal újra engedélyezheti a modellt.

**Állapot:** a kizárások tárolása **memóriában** történik (folyamatonkénti `Map` példányokban,
amelyek a `ModelLockoutEntry` értékeket `provider:connectionId:model`, a pontos hatókörű zárolásokat pedig
`provider:connectionId:exact:model` alapján kulcsolják), és nem kerülnek mentésre
az adatbázisba — újraindításkor elvesznek. A _beállítások_ megmaradnak; az aktív
kizárási _állapot_ átmeneti.

---

## 4. Kvótamegosztásos párhuzamosság-szabályozás (v3.8.36)

Az előfizetéses fiókok (GLM, MiniMax stb.) gyakran csak ~1–3 párhuzamos
kérést fogadnak el; ennek túllépése 429-es hibákat és várakozási időszakokat vált ki. Ez különösen súlyos
a **kvótamegosztásos** (`qtSd/…`) kombinációknál, ahol több API-kulcs osztozik egyetlen felsőbb szintű
fiókon. Három réteg akadályozza meg a megosztott fiók túlterhelését.

### Kapcsolatonkénti párhuzamossági korlát (`max_concurrent`)

Minden szolgáltatói kapcsolat megadhat egy `max_concurrent` felső korlátot
(`provider_connections.max_concurrent`, amely a kapcsolat párbeszédablakában / API-n / adatbázison keresztül állítható be).
Korlát nélkül hagyja üresen. Ez az egyetlen beállítás vezérli az alábbi szerializálási
réteget — állítsa be a fiók valós párhuzamossági értékére (pl. GLM ~1, MiniMax ~2).

### Modellenkénti párhuzamossági korlátok (`modelConcurrency`)

Egy kapcsolat emellett pontos, modellenkénti párhuzamossági felső korlátokat is megadhat
a `rateLimitOverrides` leképezésében:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Állítsa be a kapcsolat párbeszédablakában (**Sebességkorlát-felülbírálások → Modellenkénti
párhuzamossági korlátok**, soronként egy `model=cap`), vagy a
`PATCH /api/providers/[id]` végponton keresztül, ugyanilyen JSON-struktúrával. A kulcsok szemantikája:

- **Kapcsolatszintű és modellspecifikus:** a `maxConcurrent` továbbra is a megosztott,
  teljes kapcsolatra vonatkozó felső korlát. Ha mindkettő alkalmazandó, mindkét zárolás
  atomikusan, ugyanabban az összetett kapuban kerül megszerzésre
  (`global → provider → account → model`); a tényleges viselkedést a
  szigorúbb alkalmazandó korlát határozza meg.
- **Pontos modellkulcs-egyezés:** a kulcs az útválasztás feloldása után a
  végrehajtónak átadott modellkarakterlánc — általában a szolgáltató egyszerű modellazonosítója
  (`glm-5`), nem pedig egy kliensoldali `provider/model` álnév (a `zai/glm-5` nem
  egyezik a `glm-5` értékkel). Az értékek a párhuzamos kérések pozitív egész számú felső korlátai.
- **Helyi sorba állítás, felderítés nélkül:** a többletkérések helyben kerülnek sorba a
  meglévő sor-/időtúllépési szemantikával (típusos `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` beléptetési hibák). Az OmniRoute nem deríti fel és nem
  következteti ki a felsőbb szintű szolgáltatás szabályzatát — pontosan az üzemeltető által
  beállított korlátokat érvényesíti. Egy telített modellkapu soha nem tiltja le a szolgáltatót, és soha
  nem hoz létre tartós modellkizárást; a felsőbb szintű 429-es/várakozási/tartalékra váltási viselkedés
  továbbra is hibakezelési védőhálóként szolgál.
- **Kapcsolatonkénti, folyamatonkénti hatókör:** a korlátok adatbázis-kapcsolatonkéntiek,
  és a memóriában vannak tárolva, ezért ugyanazt a felsőbb szintű API-kulcsot újrahasználó két kapcsolat
  nem hangolja össze egymással a működését.
- **A beállítás hiánya változatlan viselkedést jelent:** a leképezés kihagyása (vagy az
  irányítópult mezőjének üresen hagyása) nem ad hozzá modellkaput. Példakonfiguráció
  általános szolgáltatói korlát feltételezése nélkül:

```text
glm-5=1
glm-4.7=3
```

### Kvótamegosztásos kérések szerializálása

Amikor egy kvótamegosztásos továbbítás pozitív `max_concurrent` értéket megadó
kapcsolatot céloz, az adott **fiókhoz** irányuló párhuzamos kérések szerializálása egy
kapcsolatonkénti szemaforon (kulcs: `qsconn:<connectionId>`) keresztül történik: a többletkérések
**a sorban várakoznak**, ahelyett, hogy elárasztanák a fiókot. A működés **hiba esetén nyitott** —
telített sor vagy időtúllépés esetén a feldolgozás helyfoglalás nélkül folytatódik, így egy továbbítható
kérés sem kerül elutasításra. A funkció a **Beállítások → Hibatűrés → Kvótamegosztás kapcsolatonkénti
párhuzamossága** menüpontban kapcsolható be vagy ki
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, alapértelmezés szerint
bekapcsolva). `max_concurrent` korlát nélkül a viselkedés változatlan.

> Maga a kvótamegosztásos útválasztási kapu (`selectQuotaShareTarget`, DRR + P2C) is
> hiba esetén nyitott, és csak _alacsonyabb prioritásúvá teszi_ a korlátot elérő kapcsolatot —
> egykapcsolatos készlet esetén nem tud szigorú korlátot érvényesíteni, ezért valójában ez a szemafor
> tartja kordában az áradatot.

### Kombinációk várakozási időszakát figyelembe vevő újrapróbálkozás

Minden kombinációs stratégia esetén (ha engedélyezve van) az olyan kérés, amely egy RÖVID,
átmeneti várakozási időszak miatt véglegesítene egy 429-es hibát, kivárja ezt az időszakot, majd a
429-es hiba visszaadása helyett újra továbbításra kerül — ez lefedi a Gemini-jellegű TPM/RPM-ablakokat
(~60 másodperces újrapróbálkozási idő) a többmodelles kombinációknál, például amikor egy kétmodelles
kombináció mindkét célpontja modellspecifikus sebességkorlátba ütközik. A működést a
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) korlátozza a **Beállítások → Hibatűrés** menüpontban. Soha nem vár
`quota_exhausted` (éjfélig zárolva), illetve hitelesítési vagy nem található okok esetén.

Ugyanez a kapu kezeli a továbbítás előtti esetet is (#16319): amikor egy kombináció minden
célpontja még bármilyen próbálkozás előtt kihagyásra kerül, mert a modellje rövid,
átmeneti kizárás alatt áll, a nulla próbálkozásos útvonal ugyanazon felső korlátok mellett
kivárja a kizárás végét, majd újra továbbítja a kérést ahelyett, hogy támpont nélküli
`503 ALL_TARGETS_SKIPPED` választ adna. Ha a várakozás nem engedélyezett (a felső korlát,
a próbálkozások száma vagy a keret kimerült, illetve a funkció ki van kapcsolva), a végső válasz
`429 rate_limit_error` hibára módosul, és tartalmazza a legkorábban lejáró átmeneti kizárásból
származó `retry_after` / `reset_at` értéket; a kvóta-, hitelesítési és nem található miatti
zárolások továbbra is támpont nélküli 503-as választ eredményeznek.

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

## 5. Kérésvárólista beléptetési vezérlése (v3.8.49 · #6593 probléma)

**Hatókör**: a helyi, szolgáltatónként+kapcsolatonként működő sebességkorlátozási várólista (`open-sse/services/rateLimitManager.ts`,
amelyet a Bottleneck kezel), egy réteggel a fenti három mechanizmus alatt.

**A `maxWaitMs` a várólistán töltött időt, az `executionMaxWaitMs` pedig a végrehajtást korlátozza.**
A kettő szándékosan különálló, és egyik sem befolyásolja a másikat.

A `resilienceSettings.requestQueue.maxWaitMs` a **várólistán töltött idő kerete**:
magában foglalja a várakozást egy szolgáltatói helyre, majd a QUEUED állapotban
töltött időt, az időzítője pedig abban a pillanatban törlődik, amikor a feladat
elhagyja a QUEUED állapotot, és megkezdődik a végrehajtása
(`rateLimitManager.ts`, `wrappedFn`). Az ezt túllépő kérés soha nem jut el a
külső szolgáltatóhoz. Az alapértelmezett érték 30000ms, amelyet a
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` biztosít a
`src/lib/resilience/settings.ts` fájlban, és amelyet a
`tests/unit/ratelimit-admission-control-6593.test.ts` rögzít, így a módosítása
sikertelenné teszi ezt a tesztet, ahelyett, hogy ez a bekezdés észrevétlenül
elavulttá válna.

A `resilienceSettings.requestQueue.executionMaxWaitMs` az az érték, amelyet a
Bottleneck a feladat `expiration` értékeként kap meg; ennek időzítője csak az
elküldés után indul el. Ez egy végső biztonsági korlát az olyan végrehajtókhoz,
amelyek nem rendelkeznek saját külső szolgáltatói időtúllépéssel, és ha a
végrehajtó saját lekérésindítási időtúllépése hosszabb, az érték arra emelkedik,
így nem szakíthat meg egy megfelelően működő, folyamatban lévő választ.
Alapértelmezés: 600000ms (10 perc).

Korábban az okozta a nem inkrementális átjárók menet közbeni leállítását, hogy
a várólista időkerete került az `expiration` értékbe — ezek jogszerűen percekig
futnak az első bájtok megérkezése előtt —, ezért jelenik meg egy lejárat
`code: "RATE_LIMIT_EXECUTION_TIMEOUT"` hibaként (HTTP 504), míg a várólista
időkeretéhez a várólista-időtúllépési kód tartozik. Bármelyik felülírható a
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (környezeti
változó) használatával vagy az irányítópulton
(**Beállítások → Hibatűrés**). Normalizáláskor mindkettő az 1ms–24h
tartományra korlátozódik.

**Mindkettő esetén az elsőbbségi sorrend:** a környezeti változó csak az
_alapértelmezett_ értéket biztosítja. A `resilienceSettings.requestQueue`
alatt tárolt érték (irányítópult/API-javítás, a `key_value` alatt tárolva)
felülírja, az egyes kapcsolatokhoz tartozó `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` pedig ezt is felülírja. Ezért ha egy környezeti változót
olyan telepítésen állít be, amely már rendelkezik tárolt értékkel, semmi sem
változik — ehelyett törölje vagy frissítse a tárolt beállítást.

A várólistán töltött időt a `maxWaitMs` korlátozza; az alábbi
`maxQueueDepth` pedig azt szabja meg, hogy egyszerre hány hívó várakozhat a
várólistán.

**A válasz törzsében megadott újrapróbálkozások: ütemezés kontra zárolás.**
Egy 429-es válasz törzse saját várakozási időt adhat meg (Gemini
`RetryInfo.retryDelay`, „retry after Ns” szöveg), amelyet az
`updateFromResponseBody` olvas ki. A kapcsolat `maxWaitMs` értékén belüli
várakozás ütemezésnek számít: a korlátozó erre az időre kiüríti a készletét,
és a várólistán lévő hívások annak újratöltésekor kerülnek elküldésre. A
`maxWaitMs` értékénél hosszabb várakozást a várólista nem tud kivárni — a
Gemini a kimerített napi kvótára `retryDelay: "86399s"` értékkel válaszol.
Az újraépített 429-es válaszban továbbított `Retry-After` (#16528) már eleve
arra készteti a tartalék motort, hogy erre az időablakra zárolja a modellt, de
ha a korlátozót is szüneteltetnénk, az továbbra is a teljes `maxWaitMs`
időtartamára feltartóztatna minden olyan hívást, amely idő előtt eléri a
kulcsot (például a hibatűrési állapot visszaállítása után). Ha egy ilyen
várakozás típusos Google `RetryInfo` részletből származik
(`google_rpc_retry_info` eredettel), és a kulcshoz tartozó korlátozó már
modellhatókörű (lásd: `getLimiterKey`), akkor a 429-es válasz ehelyett
modellzárolássá válik az adott kapcsolaton
(`lockModelForLongBodyRetry` az
`open-sse/services/rateLimitManager/bodyRetryPause.ts` fájlban, legfeljebb
24h időtartamra), a korlátozó pedig nem kerül szüneteltetésre. A
fiókkiválasztás az `isModelLocked()` révén kihagyja az ilyen zárolást, és
ugyanezt teszi a kombináció elküldés előtti kapuja a kapcsolathoz rögzített
célok esetén. Az antigravity esetében, ahol a korlátozó kvótacsaládonként
működik, a zárolás pontosan az adott modellre vonatkozik, akárcsak a többi
kvótazárolás. Ha egy alias oldódott fel erre a modellre, az ügyfél által kért
név is zárolásra kerül, mivel ezek az ellenőrzések a kért nevet használják;
a zárolás pontos (`lockExactModel`), ezért az antigravity kvótacsaládok vagy
egy codex-hatókör között átnyúló alias saját magát soha nem zárolja. Egy
szöveges utalás, egy típus nélküli `retryDelay`, illetve az egész kapcsolat
által megosztott korlátozó esetén megmarad a szüneteltetés. Amikor a 429-es
útvonal által éppen újraépített korlátozó valóban szünetel, az olyan hívó,
amelynek hátralévő várólistaideje a szünet vége előtt lejárna, azonnal
elutasításra kerül a várólista-időtúllépési kóddal (`checkLimiterPause`),
ahelyett, hogy végigvárná ezt az időt; a rögzített befejezési idő a korlátozó
létrehozása előtti időponthoz van rögzítve, ahol a Bottleneck elindítja a
frissítési óráját, és a készlet bármely későbbi módosítása törli azt. Ezt a
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` és a
`tests/unit/rate-limit-body-retry-pause.test.ts` teszt fedi le.

**`maxQueueDepth` — opcionális beléptetési korlát (új).** A
`resilienceSettings.requestQueue.maxQueueDepth` azt korlátozza, hogy egy
szolgáltató+kapcsolat esetén egyszerre hány kérés lehet a várólistán (még
elküldés előtt). Ha a várólista már `maxQueueDepth` számú kérést tartalmaz,
az új kérés azonnal elutasításra kerül egy típusos
`code: "RATE_LIMIT_QUEUE_FULL"` hibával, **mielőtt** valaha elérné a
`limiter.schedule()` hívást — így az elutasítás kis költségű, és még az adott
kéréshez tartozó bármilyen későbbi prompttömörítési / fordítási munka előtt
megtörténik. Az alapértelmezett `0` = letiltva, ami megőrzi a meglévő,
korlátlan várólistás viselkedést; a tartomány 0–100000. Felülírható a
`RATE_LIMIT_MAX_QUEUE_DEPTH` (környezeti változó) vagy a
`resilienceSettings.requestQueue.maxQueueDepth` (irányítópult/API-javítás)
használatával.

Maga a beléptetési ellenőrzés egy tiszta függvény
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), így
valódi Bottleneck-korlátozó nélkül is egységtesztelhető.

> A #6593 problémát megnyitó RFC egy `bypassCompressionOnRateLimit`
> jelzőt is javasolt. Ennek a repónak az `open-sse/services/compression/`
> folyamata a kimenő LLM-kérés prompt-/kontextustömörítését végzi (`chatCore.ts`,
> a `resolveCompressionSettings`/`selectCompressionStrategy` blokk környékén),
> nem pedig a szintetizált 429-es törzsek HTTP-választömörítését — nincs olyan
> megfelelő kódútvonal, amelyen egy szó szerinti megkerülési jelző alkalmazható lenne.
> Ez a prompttömörítési lépés jelenleg a `withRateLimit()` _előtt_ is fut a
> kérésfeldolgozási folyamatban, ezért a sorrend módosítása annak érdekében, hogy
> egy megtelt várólista miatti elutasításkor kimaradjon, különálló és a probléma
> hatókörénél nagyobb változtatás lenne; ezt szándékosan **nem** valósítottuk meg
> itt, és későbbi feladatként marad, ha a CPU-megtakarítás megéri a sorrend
> módosításával járó kockázatot.

### Automatikus sebességkorlátozási biztonsági háló és kapcsolatvédelem (`rateLimitProtection`)

**Automatikus biztonsági háló** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, alapértelmezett értéke `true`):
Alapértelmezés szerint az OmniRoute automatikusan engedélyezi a sebességkorlátozási várólistasor-védelmet minden aktív, API-kulcsot használó szolgáltatói kapcsolatnál (`getProviderCategory(provider) === "apikey"`). Ez biztosítja, hogy a sebességkorlátozásra érzékeny felsőbb rétegbeli API-kulcsokhoz érkező kérések várólistára kerüljenek, és a Bottleneck szabályozza őket, ahelyett, hogy hirtelen terhelési kiugrásként elérnék a felsőbb réteget, és 429-es hibákat okoznának. A biztonsági háló felülbírálható a `RATE_LIMIT_AUTO_ENABLE` környezeti változóval (a `false`/`0`/`off` letiltja, a `true`/`1`/`on` kényszerítetten bekapcsolja), amely elsőbbséget élvez az irányítópulton tartósan tárolt beállítással szemben (**Beállítások → Rugalmasság** / `PATCH /api/resilience`).

**A kapcsolatonkénti `rateLimitProtection` szemantikája:**
A kapcsolatonkénti sebességkorlátozási védelem a szolgáltatói kapcsolatok `rateLimitProtection` logikai mezőjével követhető nyomon (az SQLite-ban `rate_limit_protection` néven tárolva):

- **Kifejezetten bekapcsolva (`rateLimitProtection === true`)**: A sebességkorlátozási védelem kifejezetten engedélyezve van ennél a kapcsolatnál, függetlenül a szolgáltató kategóriájától vagy attól, hogy az automatikus biztonsági háló be van-e kapcsolva.
- **Kifejezetten kikapcsolva (`rateLimitProtection === false`)**: Letiltja a kifejezett védelmet, de **nem** vonja ki az aktív API-kulcsos kapcsolatot a globális automatikus biztonsági háló alól. A `reconcileEnabledConnections` függvényben (`open-sse/services/rateLimitManager.ts`) a `false` és az `undefined` egyenértékű: csak a `rateLimitProtection === true` minősül kifejezett felülbírálásnak. Ha a `rateLimitProtection` értéke `false` (vagy nincs beállítva), egy aktív API-kulcsos kapcsolat továbbra is megfelel az automatikus engedélyezési feltételnek, és sebességkorlátozási védelem alatt marad.
- **Nincs kapcsolatonkénti kivétel**: Egy üzemeltető jelenleg nem adhatja meg, hogy „ennek az egyetlen aktív API-kulcsos kapcsolatnak sebességkorlátozási várólistasor-védelem nélkül kell működnie”, miközben az automatikus engedélyezés a többinél aktív marad. Ahhoz, hogy az API-kulcsos kapcsolatok teljesen sebességkorlátozási várólisták nélkül fussanak, a biztonsági hálót globálisan kell kikapcsolni (`RATE_LIMIT_AUTO_ENABLE=false` vagy `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Támogatott írási útvonalak:**

- **`POST /api/rate-limits`**: A támogatott kezelési írási útvonal egy kapcsolat `rateLimitProtection` beállításának átváltásához (`{ connectionId: string, enabled: boolean }`). Az `enabled: true` értékkel történő meghívás bekapcsolja a kifejezett védelmet; az `enabled: false` értékkel történő meghívás eltávolítja a kifejezett védelmet (bár az aktív API-kulcsos kapcsolatokat továbbra is lefedi a globális biztonsági háló, ha az automatikus engedélyezés be van kapcsolva).
- **`PUT /api/providers/[id]`**: Szándékosan **nem** fogadja el és nem módosítja a `rateLimitProtection` értékét (#11278). A szolgáltatói kapcsolat metaadatainak `PUT /api/providers/[id]` útvonalon keresztüli frissítése soha nem változtatja meg a tartósan tárolt sebességkorlátozási védelmi állapotot.

---

## 6. Lassú adatfolyam átviteli sebességének felügyelete (#9709)

Az opcionális `resilienceSettings.streamRecovery.throughputWatchdog` védelmi mechanizmus észleli az olyan upstream szolgáltatót, amely továbbra is küld adatrészleteket, de az asszisztensi kimenetet a konfigurált hasznos kimeneti sebességnél lassabban állítja elő. Ez szándékosan különbözik az inaktivitási időkorláttól: a szívverések és a metaadatok egyik időzítőt sem állítják vissza, és nem számítanak előrehaladásnak. Szintén különbözik a próbálkozás rögzített határidejétől (#9153), amely a kimenet minőségétől függetlenül abszolút biztonsági felső korlát marad.

A felügyeleti mechanizmus csak egy bemelegedési időszakot és egy teljes gördülő időablakot követően szakíthatja meg a folyamatot. Számolja a Chat Completions és a Responses API kimeneti eseményeiből származó szövegváltozásokat (az UTF-8-bájtmennyiség konzervatív közelítéseként), figyelmen kívül hagyja a csak használati adatokat tartalmazó és az üres eseményeket, valamint felfüggeszti a kiértékelést, amíg eszközhívási vagy következtetési események vannak folyamatban. Alapértelmezés szerint le van tiltva, és a `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` beállítással engedélyezhető; az időablakot, a bemelegedést, a minimális sebességet és a minimális mérhető kimenetet a szokásos rugalmassági beállítások normalizálási rétege korlátozza.

Ha engedélyezve van, a felügyeleti mechanizmus megszakítása csak az aktív upstream-próbálkozásra vonatkozik. Mielőtt bármilyen, az ügyfél számára látható bájt elküldésre kerülne, a meglévő, azonos fiókon belüli korai helyreállítási útvonal újraindíthatja a próbálkozást. A véglegesítés után az adatfolyamot a rendszer soha nem játssza vissza vakon; csak a meglévő, biztonságos, adatfolyam közbeni folytatási szerződés illeszthet hozzá egy utótagot. A lezárás továbbra is csak egyszer történik meg, így a használat elszámolása és a szemafor felszabadítása nem ismétlődik meg.

---

## 7. Upstream állapot újramegadása (hibásan megadott kvótahibák)

**Hatókör:** egy upstream átjáró, amely az ideiglenes kvótakimerülést helytelen HTTP-állapotkóddal jelenti.

**Cél:** egy félrevezető állapot kijavítása a besorolás ELŐTT, hogy a downstream fogyasztók (a tartalékmechanizmus, a kombinált összesítés és az ügyfélnek küldött válasz) a hiba valódi, újrapróbálható jellegét lássák.

Egyes átjárók az IDEIGLENES kvótakimerülést nem újrapróbálható HTTP-állapotkóddal jelzik. Az `agentrouter.org` `403`-at (néha `400`-at) ad vissza kínai nyelvű törzzsel (`用户额度不足` / `额度不足`) a szabványos `429` helyett. Az olyan ügyfelek, mint a Claude Code, a `403`-at állandó hibaként kezelik, és megszakítják a munkamenetet; javítás nélkül pedig a tartalékmechanizmus kvótaesemény helyett `AUTH_ERROR` értékkel sorolná be.

**Megvalósítás:**

- Nyilvántartás + egyeztető: `open-sse/config/upstreamStatusRestatement.ts` — szolgáltatónkénti szabálylista (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), amelyet az `applyStatusRestatement()` használ az egyeztetéshez.
- Hívási hely: a `providerFailure:` blokk az `open-sse/handlers/chatCore.ts` fájlban (körülbelül a 3654. sornál), közvetlenül azután, hogy a `parseUpstreamError()` feldolgozza a hibás HTTP-állapotú upstream-választ (`!providerResponse.ok`), és még bármilyen besorolás végrehajtása előtt, így minden downstream fogyasztó a javított állapotot látja. A `200` állapotú SSE-adatfolyamba ágyazott hibák egy különálló, későbbi adatfolyam-feldolgozási útvonalat követnek, ezért ez a kapcsolódási pont jelenleg **nem** kezeli őket — ez ismert korlátozás, amelyre az agentrouter hibás állapotjelzése esetében egyelőre nincs szükség (mivel az hibás HTTP-állapotként jelenik meg).
- Újrapróbálhatóság: a `429` szerepel a `RETRY_AFTER_ELIGIBLE_STATUSES` listában (`open-sse/services/combo/unavailableRetryGate.ts`), így az újramegadott hiba valódi újrapróbálási időablakot kap, ahelyett, hogy használhatatlan `403`-ként jelenne meg.
- A szintetikus `60s` értékű `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) csak azt határozza meg, amit az újramegadott válasz közöl az **ügyféllel**; önmagában nem ez a kapcsolat belső lehűlési/letiltási időtartama — azt külön szabályozza az újramegadott hibát ténylegesen kezelő mechanizmus (a Connection Cooldown növekvő visszalépési ideje, §2, API-kulcsos szolgáltatók esetén `3s` alapértékkel; vagy a Model Lockout, §3, a modellenkénti kvótát alkalmazó szolgáltatók, például az agentrouter esetében). Az útválasztó belsőleg hamarabb válhat jogosulttá az újrapróbálkozásra, mint az ügyfélnek jelzett 60 másodperces időablak — ez szándékos tartalék, nem hiba.

Az állandó hibák (az agentrouter `无权访问模型` üzenete — nincs hozzáférés ehhez a modellhez) SOHA nem kapnak újramegadott állapotot: az `excludeMarkers` akkor is megakadályozza a szabály alkalmazását, ha a `textMarkers` egyezést talál, így a hiba megtartja eredeti állapotát, és semmi sem próbálkozik vele a végtelenségig. A megfelelő szolgáltatói besorolási szabályt (`agentrouter-model-access-denied` az `open-sse/config/providerErrorRules.ts` fájlban: `reason: "auth_error"`, `scope: "model"`, deklarált `6h` alap-lehűlési idővel) a `checkFallbackError` (`open-sse/services/accountFallback.ts`) az általános, apikey-kategóriájú `FORBIDDEN` korai visszatérés _előtt_ vizsgálja meg, a `honorsRuleLockScope(provider)` feltételéhez kötve (#10334 — jelenleg kizárólag az agentrouter esetén, a `providerErrorRules.ts` fájlban található `HONORS_RULE_LOCK_SCOPE_PROVIDERS` engedélyezési listán keresztül). A szabály deklarált 6 órás lehűlési ideje `fallbackResult.baseCooldownMs` értékként halad tovább, de továbbra is a már meglévő, modellenkénti kvótához tartozó letiltási útvonalba kerül (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, amelyet a #10334 a lehűlési idő forrásán kívül nem módosított): ezt az operátor `mlSettings.maxCooldownMs` beállítása (alapértelmezés szerint `1_800_000ms` / 30 perc) felső korlátként csökkenti, akárcsak minden más modellletiltás esetén, és a _tárolt letiltási ok_ továbbra is a már meglévő, beégetett `"forbidden"` marad, nem pedig a szabály `"auth_error"` értéke — a teljes folyamatban csak a lehűlés időtartama érvényesül, az okot tartalmazó karakterlánc nem. Maga a kapcsolat aktív marad; az ugyanazon a kapcsolaton elérhető többi modellt ez nem érinti.

Az újrafogalmazott kvótahibák (`额度不足`) éles környezetben illeszkednek egy szolgáltatói szabályra
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, nincs saját deklarált várakozási ideje — a perzisztenciaréteg
skálázott visszalépési alapértelmezése érvényesül). A #10334 óta a
`ProviderErrorRuleMatch` `scope` értékét a rendszer a teljes folyamaton keresztül
felhasználja, de **csak** a `HONORS_RULE_LOCK_SCOPE_PROVIDERS` engedélyezési
listán szereplő szolgáltatóknál (`providerErrorRules.ts` — jelenleg csak az
`"agentrouter"`, az `honorsRuleLockScope()` által korlátozva). Minden más
szolgáltató esetében a `scope` továbbra is csak tájékoztató jellegű, pontosan
úgy, mint a #10334 előtt. A `checkFallbackError` a megtalált szabály hatókörét
`fallbackResult.ruleScope` értékként teszi elérhetővé; az
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) az a közös védőellenőrzés, amely megerősíti, hogy
egy `ruleScope` valóban biztonságosan kezelhető kapcsolatszintű, önmagától
helyreálló jelzésként (`scope` értéke `"connection"`, az ok
`quota_exhausted`, soha nem `permanent`, és soha nem `creditsExhausted` — ez
védelmet nyújt egy olyan jövőbeli szabállyal szemben, amely a
`"connection"` hatókört állandó fiókállapottal párosítaná). Két fogyasztó
hívja meg:

- **Perzisztencia** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  ahelyett, hogy a közvetítő szolgáltató **modellenkénti** kizárási ágába
  kerülne (az agentrouter esetében `passthroughModels: true` →
  a `hasPerModelQuota()` értéke `true`), egy **ideiglenes kapcsolati
  várakozási időt** alkalmaz — `testStatus: "unavailable"` +
  `rateLimitedUntil`, végleges állapot (`credits_exhausted`/`banned`/`expired`)
  nélkül —, így a kapcsolat a várakozási idő lejárta után magától helyreáll,
  és nincs szükség a hitelesítő adatok kézi visszaállítására. A
  `disableCooling: true` beállítású kapcsolatoknál kihagyja ezt (#2997): ez a
  letiltás ehelyett a modellenkénti kizáráshoz jut tovább (ez dokumentált
  kompromisszum — lásd az ág feletti megjegyzést a kódban).
- **Azonos kérésen belüli kombinált útválasztás**
  (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ugyanez a védőellenőrzés
  felveszi a kapcsolatot a memóriabeli `exhaustedConnections` halmazba, a
  `${provider}:${connectionId}` kulccsal. Ez csak olyan hátralévő,
  AZONOS KÉRÉSHEZ TARTOZÓ célpontot hagy ki, amely _saját célobjektumában már
  maga is pontosan ugyanezt a `connectionId` értéket tartalmazza_
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` az `exhaustedConnections` lekérdezése előtt) — egy egyszerű
  modelllistás kombináció, amelyben a testvércélpontok nem rendelkeznek saját,
  rögzített `connectionId` értékkel, és az csak elküldésenként kerül
  feloldásra a válasz `X-OmniRoute-Selected-Connection-Id` fejlécéből, soha
  nem illeszkedik erre a kulcsra. Ebben a gyakori esetben a valódi védelmet
  egy hátralévő ág éppen kimerült fiókkal való újbóli próbálkozása ellen NEM
  ez a halmaz biztosítja, hanem a fenti perzisztenciaréteg (a kapcsolat
  `rateLimitedUntil` értéke most már a jövőbe mutat), valamint az, hogy
  ugyanez a védőellenőrzés elnyomja a hibához tartozó
  `transientRateLimitedProviders` értéket (lásd a „Kétlépcsős kialakítás”
  részt és a `targetExhaustion.ts` fájlban az
  `isAgentrouterConnectionQuotaScope` ág kódmegjegyzését): mivel ez a halmaz
  jelöletlen marad, a `combo.ts` `allowRateLimitedConnection` kényszerített
  engedélyezése (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) NEM
  aktiválódik a szolgáltató hátralévő ágaihoz, így a hitelesítő adatok
  kiválasztása a szokásos módon figyelembe veszi a `rateLimitedUntil` szűrőt
  (`src/sse/services/auth.ts:1238`), és egy hátralévő ág vagy másik, még
  használható agentrouter-kapcsolatot választ, vagy elérhető hitelesítő
  adatok hiányában hibával leáll — nem kényszeríti vissza magát arra a
  kapcsolatra, amelyet ez az ág éppen várakozó állapotba helyezett.

### Kétlépcsős kialakítás: állapot-újrafogalmazás, majd besorolás

Az állapot-újrafogalmazás (`upstreamStatusRestatement.ts`) és a szolgáltatói
besorolási szabályok (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) különálló regiszterek, amelyek egyaránt a szolgáltató
azonosítója és szöveges jelölők alapján működnek, de eltérő helyeken futnak,
és eltérő célokat szolgálnak: az újrafogalmazás a `chatCore.ts` fájlban
korán átírja a HTTP-állapotot; a besorolási szabályok pedig a
`checkFallbackError()` belsejében választják ki a tartalék útvonal `reason`
értékét és zárolási `scope` értékét (`model` / `provider` / `connection`)
(`open-sse/services/accountFallback.ts`).

A besorolási szabályok csak a `providerErrorRules.ts` fájl
`FULL_TEXT_RULE_PROVIDERS` engedélyezési listáján szereplő szolgáltatóknál
látják a teljes hibaszöveget (amely szükséges az olyan törzsjelölők
illesztéséhez, mint az `额度不足`) — jelenleg csak az `"agentrouter"` esetében.
Minden más **beépített katalógusbeli** szolgáltatónál a `checkFallbackError`
csak a strukturált hibát (`{code, type}`) adja át a
`getProviderErrorRuleMatch` számára, ami elegendő a fejléc-, állapot- vagy
kódalapú szabályokhoz, de nem látja a választörzs szöveges jelölőit. Ezt a
kiválasztást a `resolveRuleMatchBody()` segédfüggvény végzi: az engedélyezett
szolgáltatóknál a teljes hibaszöveget, egyébként a strukturált hibát
használja. Egy **beépített** szolgáltató hozzáadása a
`FULL_TEXT_RULE_PROVIDERS` listához kifejezett, szolgáltatónkénti
engedélyezést jelent — ennek célja, hogy a listán nem szereplő összes
szolgáltató alapértelmezett feldolgozási útvonala bájtról bájtra változatlan
maradjon.

Egy szabály `scope` értékének (`model` / `provider` / `connection`)
engedélyezése elkülönül a `FULL_TEXT_RULE_PROVIDERS` engedélyezésétől: a
`checkFallbackError` csak `fallbackResult.ruleScope` értékként teszi
elérhetővé, és az alsóbb szintű fogyasztók csak az ugyanebben a fájlban lévő
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` engedélyezési listán szereplő
szolgáltatóknál kezelik többként egyszerű tájékoztató címkénél (az
`honorsRuleLockScope()` által korlátozva — jelenleg csak az `"agentrouter"`).
Azt, hogy egy `scope: "connection"` egyezés ténylegesen mit tesz, miután egy
szolgáltató felkerült erre az engedélyezési listára, lásd fent, az
„Újrafogalmazott kvótahibák” részben.

**#11104 — az operátor által deklarált szabályok mindkét engedélyezési listát megkerülik.** Egy operátor futásidőben
deklarálhat szolgáltatónkénti szabályt a `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
segítségével, ennek a fájlnak a szerkesztése nélkül. Ha egy operátori szabályt a
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` mögé zárnánk — ezek az engedélyezési listák
a beépített katalógusszabályok **alapértelmezett** viselkedését hivatottak védeni —,
akkor a beállítási mechanizmus minden szolgáltatónál hatástalanná válna, kivéve azokat,
amelyek már szerepelnek ezekben a listákban, hiszen a szabály deklarálása már önmagában
az operátor kifejezett engedélyezése. A `resolveRuleMatchBody()` és a
`honorsRuleLockScope()` is először a `hasOperatorRuleForProvider()` függvényt ellenőrzi:
az operátori szabállyal rendelkező szolgáltató megkapja a nyers hibaszöveget, és a deklarált
`scope` értéke érvényesül, függetlenül attól, hogy szerepel-e bármelyik engedélyezési listában.

**Ismert hiányosság — HTTP 400 esetén a `providerRuleRegistry` soha nem kerül lekérdezésre.**
A `checkFallbackError` `BAD_REQUEST` ága a 400-as állapotot teljes egészében
a saját minta-tömbjein (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` stb. az `accountFallback.ts` fájlban) keresztül
osztályozza, és még azelőtt visszatér, hogy elérné a felette lévő
`configuredRule`/`getProviderErrorRuleMatch` ágat.
A `status: 400` értékkel rendelkező beépített katalógusszabály (vagy operátori szabály)
szintaktikailag érvényes, de soha nem fog aktiválódni. Jelenleg egyetlen meglévő szabály
sem célozza a 400-as állapotot, így ez semmit sem érint éles környezetben — egy jövőbeli
400-as szabályhoz azonban előbb ezt az ágat kell módosítani, ami nagyobb változtatás,
mint egy szabály hozzáadása (újraosztályozza a 400-as állapotot minden olyan szolgáltatónál,
amely már a minta-tömbök viselkedésére támaszkodik), ezért kívül esik egyetlen szolgáltatóhoz
tartozó szabály hozzáadásának hatókörén.

### Hibás kvótaállapotot közlő új átjáró hozzáadása

1. Regisztráljon egy szabálytömböt a `statusRestatementRegistry` fájlban
   (`open-sse/config/upstreamStatusRestatement.ts`). A `textMarkers` értékei
   legyenek szolgáltatóspecifikusak; soha ne használjon újra olyan általános angol kifejezéseket,
   amelyek ütköznek a `CREDITS_EXHAUSTED_SIGNALS` elemeivel
   (`open-sse/services/accountFallback.ts`).
2. Opcionálisan regisztráljon osztályozási szabályokat az
   `open-sse/config/providerErrorRules.ts` fájlban (`providerRuleRegistry`) a
   megfelelő zárolási hatókör kiválasztásához (`connection` a teljes fiókra érvényes
   kvóta, `model` a modellenkénti hibák esetén). Ez a lépés éles környezetben csak
   azoknál a szolgáltatóknál lép hatályba, amelyek szabályainak szükségük van a teljes
   hibaszövegre (törzsjelölőkre): adja hozzá a szolgáltató azonosítóját az ugyanebben
   a fájlban található `FULL_TEXT_RULE_PROVIDERS` listához — ellenkező esetben a
   `checkFallbackError` csak a strukturált `{code, type}` hibát adja át a szabálynak,
   így egy törzsszövegre illeszkedő szabály soha nem fog megfelelni az élő forgalomban.
   A kizárólag `status`/`headers` alapján illeszkedő szabályokhoz (például az Opencode
   vagy a Minimax szabályaihoz) nincs szükség erre a külön engedélyezésre. Ettől függetlenül,
   ha a szabály `scope: "connection"` értéket deklarál, és a cél tényleges, a teljes
   kapcsolatra kiterjedő várakoztatás, valamint ugyanazon kérés kombinációjának kihagyása
   (nem csupán tájékoztató címke), adja hozzá a szolgáltató azonosítóját az ugyanebben
   a fájlban található `HONORS_RULE_LOCK_SCOPE_PROVIDERS` listához — ez engedélyezi az
   `isAgentrouterConnectionQuotaScope()` jellegű feldolgozást a
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) és az
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) függvényben; enélkül a `scope`
   továbbra is bekerül a `fallbackResult.ruleScope` értékébe, de semmi sem reagál rá.
3. Adjon hozzá a `tests/unit/upstream-status-restatement.test.ts` és a
   `tests/unit/agentrouter-error-rules.test.ts` mintáját követő egységteszteket
   (beleértve a nem végleges / nem `creditsExhausted` védőellenőrzéseket, valamint —
   ha a szolgáltatónak szüksége van az engedélyezési listára — egy tesztet, amely igazolja,
   hogy a `resolveRuleMatchBody()` csak ennél a szolgáltatónál adja vissza a teljes szöveget).

A `chatCore.ts`, a `classifyError` és a kombinációs logika módosítása nem szükséges.

#### Kimenő forgalom szerint csoportosított zárolás (#10880)

Az `EGRESS_BUCKETED_LOCK_PROVIDERS` listában szereplő szolgáltatókat (az opencode családot)
IP-csoportosított upstreamként kezeljük (az opencode ingyenes csomagja IP, nem pedig
fiók szerint van csoportosítva — lásd #9611): egy `quota_exhausted`
**vagy** `rate_limit_exceeded` besorolású 429-es állapot várakoztatja az engedélyezési
listán szereplő szolgáltatócsalád minden olyan kapcsolatát, amelynek utoljára ismert
kimenő IP-címe megegyezik a hibázó kapcsolatéval, még mielőtt a rotáció megpróbálhatná őket
— ezzel elkerülve N-1 garantáltan sikertelen upstream hívást (ugyanaz a minta, mint
#10460/#10525 esetén). A `rate_limit_exceeded` szándékosan szerepel benne: a
`markAccountUnavailable` útvonalon az opencode-specifikus szabályok soha nem illeszkednek
(a `checkFallbackError` nem kap fejlécet/törzset, az opencode pedig nem szerepel a
`FULL_TEXT_RULE_PROVIDERS` listában), ezért egy olyan 429-es válasz, amelynek törzse
tartalmazza az előfizetési kvótára vonatkozó szöveget ("monthly usage limit
reached"), a kvótaszöveges tartaléklogika
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 órás várakoztatás) révén
`quota_exhausted` besorolást kap, még mielőtt a `status_429` szabály egyáltalán
elérhető lenne — míg a kvótára utaló szöveg nélküli 429-es válasz (egyszerű
sebességkorlátozás) a `status_429` szabály révén `rate_limit_exceeded` besorolást kap,
és továbbra is várakoztatja az IP-családot. Az engedélyezési listán szereplő
szolgáltatóknál az IP szerint csoportosított sebességkorlát ugyanazt jelzi, mint a
kimerült kvóta. Valós korlátok:

- **Legjobb tudás szerinti**: a zárolás a kapcsolat legutóbb ismert `egress_ip`
  értékét határozza meg a `proxy_logs` alapján (24 órás időablak, szinkron,
  gyorsítótár nélkül). Üres gyorsítótár (a kimenő IP még sosem volt ellenőrizve)
  vagy hiányzó sor esetén → a hibát okozó kapcsolatot az ág továbbra is
  várakoztatja (a jelenlegi módon rögzítve), csak a testvérkapcsolat nem lesz
  zárolva.
- **Soha nem végleges**: a várakoztatás egy megújuló kvótaablak
  (`testStatus: "unavailable"`); IP-szintű jelből soha nem következik végleges
  állapot. A `disableCooling` beállítású kapcsolatok teljesen kihagyják ezt az
  ágat.
- **A zárolás granularitása megváltozik az engedélyezési listán szereplő
  családnál**: ez hatókörváltozás, nem csupán a testvérkapcsolatokra vonatkozó
  optimalizálás. Az opencode egy `passthroughModels` szolgáltató, ezért ezen ág
  előtt egy 429-es válasz modellenkénti zárolást eredményezett; mostantól
  kapcsolat-várakoztatást eredményez — akkor is, ha egy operátor egyetlen,
  testvér nélküli kapcsolatot futtat. Az opencode szabálytáblája már eddig is
  ezt a granularitást nyilvánította helyesnek (`scope: "connection"`,
  `providerErrorRules.ts`), de ezt mindeddig nem vettük figyelembe, mert az
  opencode nem szerepel a `HONORS_RULE_LOCK_SCOPE_PROVIDERS` listában. Az ág
  maga írja be a hibát okozó kapcsolat várakoztatását és `backoffLevel`
  értékét, a kapcsolat-hatókörű agentrouter ágat követve, majd visszatér — az
  alatta lévő modellenkénti blokkolás és az általános útvonal soha nem fut le.
- **A combo is ide tartozik**: az agentrouter ághoz hasonlóan a hatókör
  szándékosan figyelmen kívül hagyja a `persistUnavailableState`/`isCombo`
  visszaminősítést, amelyet egy combo hívó alkalmaz a 429-es válaszra. A
  modellenkénti zárolás nem ennek a hatókörnek egy gyengébb formája, hanem
  rossz egységet használ: semmit sem mond a kimerült IP-ről, így a combo
  rotáció testvérkapcsolatonként továbbra is elhasználna egy garantáltan
  sikertelen hívást.
- **Testvérkapcsolatok biztonsága**: a már végleges állapotú
  (banned/credits_exhausted), illetve már hosszabb várakoztatás alatt álló
  testvérkapcsolatok állapota soha nem lesz felülírva.
- **Kizárólagos engedélyezési lista**: az `EGRESS_BUCKETED_LOCK_PROVIDERS`
  bővítése kifejezett tulajdonosi döntés; nincs általános bekötés
  (#10334/#10419 minta). A testvérkapcsolatokat lekérdező lekérdezés ugyanezt
  az engedélyezési listát köti be ahelyett, hogy SQL-literálként megismételné,
  így a bővítése továbbra is egysoros módosítás marad.
- **Kimenő IP rotációja mindkét irányban**: a keresési időablak (24 óra) jóval
  szélesebb a kimenő IP gyorsítótárának TTL-értékénél (5 perc), így a „legutóbb
  ismert IP” előzmény, nem pedig aktuális állapot. Ha egy kapcsolat proxyja az
  időablakon belül rotálódott, a zárolás **kihagyhat** egy valóban megosztott
  IP-t (a rögzített IP az új, még nem kimerült IP) — és ezzel szimmetrikusan
  **várakoztathat egy olyan testvérkapcsolatot, amely azóta elrotálódott** a
  kimerült IP-ről. A második eset a testvérkapcsolatnak egyetlen várakoztatási
  ablakba kerül; mindkettő elfogadott, legjobb tudás szerinti korlátja az
  előzményalapú keresésnek.
- **Költség**: a `proxy_logs` két korlátozott bejárása (az időablak szerinti
  szűrést az `idx_pl_timestamp` végzi), kizárólag 429-es válaszok
  gyakoriságával. Nincs új index (134-es migráció, YAGNI). Közepes méretű,
  valós forgalmi adatbázis másolatán mérve; egy nagy áteresztőképességű példány
  arányosan több sort tartalmaz ugyanabban az időablakban.

---

## Egyéb rezilienciával kapcsolatos funkciók

- **20 útválasztási stratégia** (prioritásos, súlyozott, ciklikus, kontextustovábbító, először feltöltő, p2c, véletlenszerű, legkevésbé használt, költségoptimalizált, visszaállítás-figyelő, visszaállítási ablakos, tartalékkapacitás-alapú, kvótasúlyozott, szigorúan véletlenszerű, automatikus, lkgp, kontextusoptimalizált, gyorsítótár-optimalizált, fúziós, folyamatlánc-alapú) — lásd: [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Visszaállítás-figyelő útválasztás** (v3.8.0) — a kapcsolatokat a kvóta visszaállítási ideje alapján rangsorolja.
- **Háttérmód visszaminősítése** — a Responses API `background: true` beállítása figyelmeztetés mellett szinkron módra vált.
- **Dinamikus eszközkorlát-észlelés** — visszalépteti a szolgáltatókat az eszközszámkorlát elérésekor.
- **Vészhelyzeti tartalékmegoldás** — az `OMNIROUTE_EMERGENCY_FALLBACK` vezérli; az üzemeltetők újraindítás nélkül felülbírálhatják a Funkciójelzők oldalon.

---

## Hibakeresés

- A súlyozott kombináció `503 all_targets_cooling_down` választ ad (a `Retry-After` be van állítva, a `diagnostics.excluded` pedig minden célpontot felsorol `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` állapottal) → a készlet konfigurálva és csatlakoztatva van, csupán minden célpontot kizár egy rezilienciát biztosító időzítő; a `[COMBO] Weighted selection: every target excluded before dispatch — …` figyelmeztetés megnevezi az okokat és a hátralévő másodperceket. Az ugyanettől a kombinációtól érkező `404 no_executable_targets` azt jelenti, hogy nem volt érintett rezilienciát biztosító időzítő (nincs mit futtatni, vagy minden fiók sikertelen volt az elérhetőségi ellenőrzésen). Az `open-sse/services/combo/pinRecovery.ts` fájlban valósul meg, a `targetResolution.ts` fájlban összegyűjtött kizárások alapján.
- Egy szolgáltató összes kulcsa ki lett hagyva → ellenőrizze a megszakító állapotát ÉS minden kapcsolat `rateLimitedUntil`/`testStatus` értékét.
- A szolgáltató a visszaállítási időablak után is véglegesen ki van zárva → a kód a nyers `state` értéket olvassa a `getStatus()`/`canExecute()` helyett.
- Egy kulcs meghibásodik, a többinek működnie kellene → részesítse előnyben a kapcsolat lehűlési idejét a megszakítóval szemben.
- Csak egy modell hibásodik meg → részesítse előnyben a modell zárolását a kapcsolat lehűlési idejével szemben.
- Az állapotnak magától helyre kellene állnia, de nem teszi → ellenőrizze, van-e jövőbeli időbélyeg, valamint olyan olvasási útvonal, amely frissíti a lejárt állapotot. Az állandó állapotok kézi módosítást igényelnek.

---

## TLS-ujjlenyomat-készítés és rejtőzködés

A szolgáltatóspecifikus rejtőzködés (JA3/JA4, CCH, elhomályosítás) külön dokumentációban található — lásd: `docs/security/STEALTH_GUIDE.md` (git; nincs beépítve a `/docs` könyvtárba).

---

## Ellenálló képességi tesztelés (8. fázis · C blokk)

Az ellenálló képességi logika egységtesztjein túl három teszt vizsgálja a futtatási környezetet
valós terhelési/hibahelyzetekben (mind integrációs/éjszakai — egyik sem blokkolja a PR-eket):

| Teszt             | Mit vizsgál                                                                                                                                                                                                                                            | Futtatás                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| Káosz             | A szimulált felsőbb rétegbeli csomópont valós késleltetést/visszaállítást/időtúllépést/503-as hibát idéz elő; ellenőrzi, hogy a megszakító kinyit/helyreáll, és a `checkFallbackError` a 503-as hibát helyreállítható tartalékeseményként osztályozza. | `RUN_CHAOS_INT=1 npm run test:chaos`      |
| Heap-növekedés    | Körülbelül 500 adatfolyam `createSSEStream` példányonként a `--expose-gc` alatt; sikertelen, ha a heap mérete a felső korlát fölé nő (OOM-védelem #3069).                                                                                              | `npm run test:heap`                       |
| k6 tartósterhelés | Tartós terhelés az `/api/monitoring/health` végponton; p95-/hibaküszöbértékek.                                                                                                                                                                         | `k6 run tests/load/k6-soak.js` (éjszakai) |

A `.github/workflows/nightly-resilience.yml` vezérli (cron + kézi indítás). Az alapértelmezett
`test:integration` futtatásban a káosz- és heap-teszt kihagyja önmagát (a `RUN_CHAOS_INT`/`--expose-gc` nélkül).

---

## Lásd még

- [Architektúra-útmutató](./ARCHITECTURE.md) — Rendszerarchitektúra és belső működés
- [Felhasználói útmutató](../guides/USER_GUIDE.md) — Szolgáltatók, kombinációk, CLI-integráció
- [Automatikus kombinációs motor](../routing/AUTO-COMBO.md) — 16 tényezős pontozás, módcsomagok
