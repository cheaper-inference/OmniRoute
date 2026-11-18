# Guardrails (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Hiteles forrás:** `src/lib/guardrails/`
> **Utolsó frissítés:** 2026-10-17 — v3.8.52 (hozzáadva: [Lefedettség és korlátok](#coverage-and-limits):
> mely útvonalakat és válaszútvonalakat érnek el a hookok, az összevont letiltási fejlécek (#16412), az injektálás
> blokkolási módja mint kötelező határ (#16413), valamint hogy mi látja a választ a post-call előtt)

A guardrailek biztonsági és szabályzati előírásokat, valamint tartalomátalakításokat
érvényesítenek az OmniRoute és az upstream szolgáltatók közötti határon. Minden guardrail
megvizsgálhatja (és opcionálisan elutasíthatja, átalakíthatja vagy megjegyzésekkel láthatja el)
a kérés hasznos adatát (`preCall`) és az upstream válaszokat (`postCall`).

A rendszer **fail-open** elven működik: ha egy guardrail végrehajtás közben kivételt dob, a
registry rögzíti a hibát, és a kérés meghiúsítása helyett a következő guardraillel folytatja.
A blokkolás mindig kifejezett döntés (`block: true`), soha nem véletlen. Az egyetlen kivétel
a megszakított kérés: ha a hívó `signal` értéke megszakított állapotba kerül, a kivételt dobó
guardrail elutasítja a hook futását ahelyett, hogy kimaradna.

A hookok **nem** futnak le minden útvonalon vagy minden válasznál. Mielőtt biztonsági
vezérlőként támaszkodna egy guardrailre, olvassa el a
[Lefedettség és korlátok](#coverage-and-limits) című részt.

## Beépített védelmi korlátok

A regisztráció importáláskor prioritási sorrendben automatikusan betölti a hat védelmi korlátot
(lásd: `registry.ts` → `registerDefaultGuardrails()`):

| Prioritás | Név                 | Szakasz(ok)    | Fájl                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Az alacsonyabb prioritási számúak futnak **először**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

A GLM 5.3 alapmodell és a `glm-5.3-{low,high,max}` kifejezetten
`supportsVision:false` regisztrációs/specifikációs metaadatot tartalmaz. A GLM 5.3 Flash változatai
továbbra is natív látásképes modellek. A Claude Code `/v1/messages` útvonala a megosztott
`handleChat` hívás előtti védelmi korlálláncba lép be, **mielőtt** a Claude–OpenAI
fordítás megtörténne; a beágyazott `Read` eszközeredmények képeit le kell írni vagy kezelni kell,
mielőtt a fordítás OpenAI `image_url` tartalommá alakítja őket (#17069).

Elfogja a **nem látásképes modellekhez** intézett, képeket tartalmazó kéréseket, majd vagy a teljes
kérést irányítja át egy látásképes modellhez, vagy a képblokkokat egy konfigurálható látásmodell által
előállított szöveges leírásokkal helyettesíti a felfelé irányuló hívás előtt. Így a csak szöveget
kezelő szolgáltatók transzparensen kezelhetnek multimodális hasznos terheket.

Folyamat:

1. Kihagyja a lépést, ha a célmodell már támogatja a látást (kivéve, ha szerepel a
   kényszerített áthidalási listában: `isVisionBridgeForcedModel`).
2. A képblokkokat az `extractImageParts(messages)` segítségével nyeri ki
   (`visionBridgeHelpers.ts`), amely a **egységes médiaészlelőnek**, a
   `open-sse/utils/mediaParts.ts` fájlban található `detectMediaParts()` függvénynek delegál —
   ez az egyetlen hiteles forrás, amelyet a kombinációs kompatibilitási szűrő is megoszt.
   A kinyerés azokra a struktúrákra korlátozódik, amelyeket a `replaceImageParts` vissza tud illeszteni
   (a kinyerés és a csere közötti szerződés): OpenAI `image_url`, Anthropic
   base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, valamint a Responses API
   `input_image` elemei. A Claude Code
   `tool_result.content` elemeibe és a Responses eszközkimeneteibe ágyazott, egyező képeket szintén
   kinyeri és visszahelyezi eredeti útvonalukra; a csak jelzőként szolgáló struktúrák a kombinációs
   szűrő anyagát képezik, ezért nem kerülnek kinyerésre.
   Kihagyja a lépést, ha egyetlen kép sem található.
3. A futásidejű konfigurációt a `resolveVisionBridgeRuntimeSettings()` segítségével oldja fel
   (`src/shared/constants/modalityBridgeDefaults.ts`): az új `modalityBridge*` beállítási kulcsok
   élveznek elsőbbséget; a régi `visionBridge*` kulcsok egy **egyciklusos tartalékként**
   (visszaállítási időablakként) továbbra is használhatók. Ha az áthidalás le van tiltva, még
   bármilyen médiabejárás előtt kihagyja a lépést.
4. Az üzemmódválasztó (`modalityBridgeVisionMode`, lásd az alábbi táblázatot) dönti el, hogy
   átirányítás vagy leírás történjen. Az átirányítás csak a `model` mezőt kicserélő
   `modifiedPayload` értéket ad vissza, a következő metaadatokkal:
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Leírási útvonal: a képek számát `maxImages` értékre korlátozza, összeállítja a feladattudatos
   promptot, lekérdezi a leírási gyorsítótárat, majd **párhuzamosan** meghívja a látásmodellt
   (`Promise.allSettled`), és a képek helyére `[Image N]: <description>` szövegrészeket illeszt.
   A sikertelen leírás `null` értéket eredményez: a nyers kép megmarad ismeretlen vagy
   látásképes célok esetén (#4012), egy **megerősítetten csak szöveget kezelő közvetlen cél** vagy
   nulla látásképes modellel rendelkező kombináció esetén azonban minden le nem írt képhez explicit
   `(unavailable — no vision-capable provider connected)` szöveges helyőrző kerül, beleértve a
   részleges hibákat és a leíráshívási korláton túli képeket is (#17069). A meglévő, minden leírási
   kísérlet meghiúsulására vonatkozó kombinációs tartalék továbbra is érvényben marad (#8430).
6. Visszaadja a `modifiedPayload` értéket és a következő metaadatokat:
   (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Üzemmódválasztó (`modalityBridgeVisionMode`)

| Mód        | Alapértelmezett | Viselkedés                                                                                                                                                                                                                                                                                                                                                                  |
| ---------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔               | Örökölt heurisztika, változatlanul (#6640/#7204): a nem kombinációs, illetve `auto/` modelleket a legjobb látásmodellhez irányítja át, kivéve, ha az eredeti modell már rendelkezik használható hitelesítő adatokkal (ekkor leírást alkalmaz); a kombinációs célok mindig leírást alkalmaznak.                                                                              |
| `describe` |                 | Mindig leírást alkalmaz — az átirányítási blokk teljes egészében kimarad; mindig a felhasználó által választott modell válaszol.                                                                                                                                                                                                                                            |
| `reroute`  |                 | Átirányítás kényszerítése: a hitelesítő adatokkal rendelkező modell megtartását biztosító ellenőrzés megkerülve. Az átirányítási **cél** hitelesítőadat-ellenőrzése továbbra is érvényes — ha nincs használható látásképes cél, az áthidaló egyértelmű hibával leállítja a kérést, ahelyett hogy leírást alkalmazna vagy nyers képeket küldene csak szöveget kezelő célhoz. |

A kényszerített módok rövidre zárják a folyamatot, **mielőtt** az automatikus heurisztika lefutna;
az `auto` viselkedése bájtszinten azonos a PR-1 előtti védelmi korláttal.

#### API-kulcs hatóköre (`visionBridgeKeyScope.ts`)

Amikor a hívó API-kulcsa korlátozza az `allowedConnections` értékét, a kvótakészleteket
(`allowedQuotas`) vagy a modelleket (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), a híd csak olyan
átirányítási és leíró modelleket választ, amelyeket a kulcs használhat, és csak
olyan kapcsolatokon, amelyeket a kulcs használhat. A leíró hívás ezután mindig az
OmniRoute önhurkán keresztül halad az `x-omniroute-self-loop-key-id` fejléccel,
így a fogadó csevegési kérés ismét érvényesíti az adott kulcs kapcsolat- és
modellházirendjét. Az `enforceApiKeyPolicy()` ezt a fejlécet csak az önhurok
bearerével együtt veszi figyelembe, így az csak szűkítheti a hozzáférést, és a
fel nem oldható azonosítót elutasítja.

Ha a kulcshoz egyetlen vision modell sem engedélyezett, egy **megerősített, csak
szöveges célpont** helyileg, egyértelmű HTTP 400 hibával elutasítja a
képkérést, ahelyett hogy a képadatokat egy erre képtelen upstreamnek továbbítaná
(#17069). Ismeretlen vagy natív vision-képességű célpontoknál a leírási útvonal
megtartja korábbi, hibát átengedő működését (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
A kulcs nélküli kérések, valamint az ilyen korlátozások nélküli kulcsok pontosan
a korábbiak szerint viselkednek.

#### Feladattudatos leíró prompt (`modalityBridgeVisionTaskAware`)

Alapértelmezés szerint **true**. A `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
a **legutóbbi felhasználói üzenet** szövegét (500 karakterre csonkolva) hozzáfűzi
az alapértelmezett leíró prompthoz, így a leírást arra irányítja, amit a
felhasználó ténylegesen kért (codex-vision-proxy-minta), és arra kéri a vision
modellt, hogy írja át a látható szöveget. A jelző kikapcsolásakor — vagy ha nincs
felhasználói szöveg — az alapértelmezett prompt változatlanul kerül
felhasználásra.

A leíró önhurkának saját OpenAI-kompatibilis kérése
(`callVisionModelSingle()` a `visionBridgeHelpers.ts` fájlban) mindig az
`image_url.detail: "high"` értéket kéri — feltétel nélkül, minden hívó és
szolgáltató esetében, kliensoldali jelzéstől függetlenül. Az alacsony részletességű
mintavételezés rontja az OCR pontosságát pontosan annál a szövegátírási feladatnál,
amelyet ez a prompt kér, ezért maga a leíró hívás mindig magas részletességet kér,
függetlenül az eredeti bejövő kérésben használt részletességi szinttől. Ez csak a
belső leíró kérés törzsét érinti; nem módosítja, ahogyan az OmniRoute továbbítja
a hívó saját `image_url.detail` értékét az elsődleges kérésben — az alapértelmezést
külön, és csak az észlelt OpenCode-klienseknél alkalmazza a
`defaultImageDetail()` az `open-sse/handlers/chatCore/upstreamBody.ts` fájlban.
A leíró önhurok Anthropic vezetékformátumú ága nem tartalmaz `detail` mezőt, és
egyik alapértelmezés sem érinti.

#### A leírás kimeneti korlátja (`modalityBridgeVisionMaxChars`)

| Kulcs                          | Alapértelmezett | Tartomány          |
| ------------------------------ | --------------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`             | `0` vagy 100–50000 |

A `0` (alapértelmezés szerint) azt jelenti, hogy **nincs korlát** — a
`callVisionModel()` által visszaadott leírás módosítás nélkül kerül továbbításra,
megőrizve a meglévő működést. A 100–50000 közötti értékek a leírást egy `…`
utótaggal csonkolják, mielőtt az `[Image N]: <description>` formában vissza
lenne illesztve (`VisionBridgeGuardrail.preCall()` a
`src/lib/guardrails/visionBridge.ts` fájlban). Részletes OCR-feladatoknál
növelje ezt az értéket, amikor a downstream modellnek a teljes átiratra van
szüksége; beszédes vision modellek esetén csökkentse a tokenfelhasználás
korlátozásához. A dashboard mezője a Vision lap Advanced paneljén található
(`modality-bridge-max-chars` a `ModalityBridgeVisionTab.tsx` fájlban), és az
1 és 99 közötti értékeket a 100-as alsó korlátra kerekíti, miközben az explicit
`0` értéket érintetlenül hagyja — a `0` önállóan is érvényes Zod-érték
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nem csupán a
„nincs beállítva” alapértelmezés.

#### Leírási gyorsítótár (`modalityBridge/bridgeCache.ts`)

Folyamaton belül megosztott, memóriabeli LRU + TTL gyorsítótár a leírások
kimeneteihez. A kulcs = `sha256(imageRef + composedPrompt + configuredBridgeModel)`,
hossz-előtagos keretezéssel (nincsenek mezőhatár-ütközések). A modellkomponens a
**beállított** hídmodell, nem pedig az a modell, amely ténylegesen válaszolt —
a `callVisionModel` belsőleg tartalék modellre válthat, és a kísérletenkénti
kulcsképzés feldarabolná a gyorsítótárat. A sikertelen leírások soha nem kerülnek
gyorsítótárba. Beállítások:

| Kulcs                           | Alapértelmezett | Tartomány |
| ------------------------------- | --------------- | --------- |
| `modalityBridgeCacheEnabled`    | `true`          | —         |
| `modalityBridgeCacheTtlMinutes` | `60`            | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`           | 10–5000   |

#### Távoli képek normalizálása (önhurkos leírás/base64-lekérés)

Amikor a híd maga kér le egy **távoli** képet — az Anthropic leíró önhívása és
a claude-wire-format base64-konverziója
(`ensureBase64ImagesForClaudeWire`) esetén, mindkettő a
`visionBridgeHelpers.ts` fájlban található `fetchRemoteImageAsDataUri()` útján —
az eredményül kapott data URI-t a vision-model kérésbe való beágyazás előtt a
`normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) dolgozza fel. A túl
nagy képeket a rendszer **2048px hosszú élre** méretezi át (összhangban azzal a
méretezési korláttal, amelyet az OpenAI/Anthropic már szerveroldalon alkalmaz),
így csökkenti a feltöltés méretét és késleltetését anélkül, hogy megváltoztatná,
amit a vision modell lát. Az átméretezés a dinamikus importtal betöltött
`sharp` használatával történik: ha egy platformon a natív bináris betöltése
sikertelen, a `normalizeDataUri()` **soha nem dob kivételt** — az eredeti bájtok
változatlan továbbítására áll át, így a leírási/base64-konverziós útvonal mindig
működőképes marad. A nem képi bájtokat (amikor a lekérés nem dekódolható képet
adott vissza) szintén változatlanul továbbítja. Ez a normalizálás kizárólag a
híd által a saját önhívásához lekért képekre vonatkozik — a hívó nyers,
változtatás nélkül továbbított tartalmára soha nem alkalmazza, összhangban az
opt-in módosítás elvével (Hard Rule #20).

#### Beállításséma + migráció

Az új `modalityBridge*` kulcsok Zod által validáltak az `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) sémában: `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, a `modalityBridgeCache*` hármas, valamint az
Audio Bridge által használt `modalityBridgeAudio*` csoport. A
`141_modality_bridge_settings.sql` migráció a meglévő örökölt
`visionBridge*` értékeket a megfelelő új kulcsokba másolja (idempotens módon,
soha nem írja felül az operátor által beállított `modalityBridge*` értékeket);
az örökölt kulcsok egy kiadási cikluson keresztül továbbra is elfogadott
olvasási tartalékként maradnak.

#### Átláthatósági fejléc + statisztikák

A leírással átalakított válaszok a következőt tartalmazzák:
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(a `modalityBridge/bridgeStats.ts` fájlban található
`buildModalityBridgeHeader()` építi fel, a
`src/sse/handlers/chatHelpers.ts` fájlban található
`withModalityBridgeHeader()` látja el vele a választ).
Az átirányított kérések nem kapnak fejlécet — a törzs változatlan maradt, a
modellcsere pedig már látható a válasz törzsének `model` mezőjében.

A `GET /api/modality-bridge/stats` (kezelői hitelesítéssel, ugyanazon a
szinten, mint a `GET /api/settings`) a memóriában tárolt, modalitásonkénti
számlálókat adja vissza
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` a `vision`, `audio` és
`video` modalitásokhoz. Az `averageLatencyMs` nevezőjeként a
`latencySamples` értéket használja, nem az összes kísérlet számát; az időzítés
nélküli művelet nem állít elő mesterséges nulla milliszekundumos mintát. A
`bridged` továbbra is a sikeres átalakítások visszamenőleges kompatibilitást
biztosító aliasa; a sikertelen kísérletek nem növelik az értékét.
A számlálók folyamat-újraindításkor szándékosan nullázódnak
(telemetria, nem könyvelés).

#### Irányítópult-konfiguráció

A dedikált irányítópultoldal a
`/dashboard/settings/modality-bridge`. Az URL-ben megadható `Vision`, `Audio`
és `Video` lapok a `tab` érték váltásakor megőrzik a lekérdezési paramétereket.
A Vision lap a bekapcsolást, az üzemmódot, a modell kiválasztását (beleértve
az automatikus alapértelmezést), a feladattudatos promptolást, a speciális
időkorlát-, képszám- és leíráshossz-korlátokat, a futásidejű számlálókat és
egy védett mintakérést tesz elérhetővé. Az Audio lap szintén aktív:
bekapcsolást, kizárólag STT-hez használható modellválasztót Auto lehetőséggel,
időkorlát- és maximális kliphossz-korlátokat, audioszámlálókat, valamint egy
`input_audio` mintatesztet biztosít. A Video lap működőképes: jelenti az
FFmpeg/ffprobe futásidejű állapotát — a négy egyértelmű UI-állapot egyikét
(`unknown`, amíg a vizsgálat folyamatban van vagy nem sikerült befejezni,
`restricted` nem loopback irányítópultgazdán, ahol a vizsgálatot a kliens
kihagyja, `unavailable`, miután a vizsgálat megerősítette a hiányt, vagy
`available` az FFmpeg/ffprobe verzióival) — megőrzi a modell-/kép-/videó- és
időkorlátokat, a modellválasztót a látást támogató modellekre szűri, és
elérhetővé teszi a videoszámlálókat.

Az AI-beállítások alatt található korábbi Vision Bridge-kártya kompatibilitási
hivatkozás az új oldalra; már nem birtokolja az űrlap második példányát. A
Media Providers az Image-to-Text és Speech-to-Text munkafolyamatokat szintén
a megfelelő Modality Bridge-lapokra irányítja, a meglévő Speech-to-Text
játszótér eltávolítása nélkül.

**Saját hurok beléptetési megkerülése:** amikor a leíró hívás az OmniRoute
saját `/v1` saját hurkán keresztül útvonalazódik (nem szabványos szolgáltatói
modell esetén), az alárendelt kérés elküldi a
`x-omniroute-admission-bypass: internal` fejlécet, és a feloldott saját
hurokbeli hitelesítő adatokkal hitelesíti magát — helyi módban a helyi
`sk_omniroute` sentinel értékkel, vagy az operátor által konfigurált
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` környezeti kulccsal (#1350), így a
`REQUIRE_API_KEY=true` beállítással futó telepítések továbbra is végre tudják
hajtani a leíró hívást. A megkerülés csak ezeknél a pontos hitelesítő
adatoknál érvényes, ezért külső kliensek nem használhatják a fejlécet a
beléptetés kihagyására.

Az örökölt alapértelmezések a
`src/shared/constants/visionBridgeDefaults.ts` fájlban találhatók; az új
mód-, feladattudatos- és gyorsítótár-alapértelmezések, valamint a
beállításfeloldó a `src/shared/constants/modalityBridgeDefaults.ts` fájlban
találhatók. A védelmi réteg `deps` konstruktorbeállítást biztosít, így a
tesztek beszúrhatnak hamis `getSettings` és `callVisionModel`
implementációkat.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Elfogja a hangot tartalmazó chatkéréseket, mielőtt azok olyan célhoz
érkeznének, amelyről nem ismert, hogy elfogad-e hangbemenetet. A chatkérést
soha nem irányítja át: a hangrészeket a meglévő OpenAI-kompatibilis
multipart-végponton keresztül írja át szöveggé, a kiválasztott chatmodell pedig
a szöveges átiratokkal folytatja a feldolgozást.

Folyamat:

1. A `supportsAudio` feloldása a `getResolvedModelCapabilities()` segítségével történik. Először a szolgáltatói regisztrációs metaadatai élveznek elsőbbséget, ezután a statikus modellmetaadatok, végül a szinkronizált `modalities_input`. A `audio` elemet nem tartalmazó deklarált bemeneti lista értéke `false`; ha nincs elérhető képességre utaló információ, az eredmény `null`. Mind a `false`, mind a `null` aktiválja az óvatos átalakító hidat, míg a `true` megkerüli azt.
2. A rendszer feloldja a `modalityBridgeAudio*` beállításokat, majd a megosztott `detectMediaParts()` detektorral minden üzenetből kinyeri a beilleszthető felső szintű hangrészeket. A támogatott vezetékes formák az OpenAI-féle `input_audio`, `audio_url`, valamint a `source.media_type: "audio/*"`. A beágyazott hangot az útválasztás során felismeri, de a beillesztési útvonal nem távolítja el. A feldolgozás felső korlátját a `modalityBridgeAudioMaxClips` adja; a későbbi részek változatlanok maradnak.
3. A rendszer figyelembe veszi a konfigurált `provider/model` értéket, vagy a `selectAudioBridgeModel()` stabil katalógussorrendben végigjárja az `AUDIO_TRANSCRIPTION_PROVIDERS` elemeit, és az első olyan modellt választja ki, amelyhez aktív, használható szolgáltatói hitelesítő adat áll rendelkezésre.
4. A `callAudioTranscription()` a base64- és data URI-formátumú hangot többrészes `file` fájllá alakítja, illetve a távoli `audio_url` értéket a csak nyilvános célpontokat engedélyező, DNS-rögzítést és 25 MB-os korlátot alkalmazó kimenő forgalmi védelmen keresztül tölti le. Ezután a fájlt és a kiválasztott modellt POST-kéréssel elküldi a helyi `/v1/audio/transcriptions` önhurok-végpontra, a `resolveSelfLoopBearer()` által biztosított hitelesítéssel. A meglévő átírási útvonal végzi a normál hitelesítőadat-keresést, a várakozási idő és a sebességkorlátozás kezelését, valamint a szolgáltatói diszpécselést.
5. A sikeres hívások a részeiket a következőre cserélik: `[Audio N]: <transcript>`. A hívások `Promise.allSettled` használatával futnak: egyedi hiba esetén az eredeti hangrész megmarad (#4012-szerződés). Ha minden hívás sikertelen, és a cél bizonyítottan `supportsAudio === false`, akkor a részek a következővé alakulnak:
   `[Audio N]: (unavailable — no STT provider connected)` (#8430-szerződés). Ismeretlen cél (`null`) esetén a teljes sikertelenség eredménye változatlan marad. A bizonyítottan csak szöveget támogató cél használható STT-hitelesítő adat nélkül ugyanazt az explicit helykitöltőt kapja, hálózati kérés indítása nélkül.

A sikeres átírások a folyamat egészére kiterjedő Modality Bridge LRU/TTL-gyorsítótárát használják. A kulcs egyesíti a hanghivatkozást, a stabil `audio-transcription` műveleti címkét és a kiválasztott STT-modellt; a hibák soha nem kerülnek gyorsítótárba. A hangfeldolgozási kísérletek frissítik a megosztott `bridged`, `cacheHits`, `failures` és `lastUsedAt` számlálókat. Az átalakított válaszok a következő fejlécet tartalmazzák:
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; a változatlan kérések nem kapnak Audio Bridge-szegmenst.

A futásidejű beállításokat az adatbázis tárolja, és a Zod ellenőrzi:

| Kulcs                         | Alapértelmezett | Tartomány                      |
| ----------------------------- | --------------- | ------------------------------ |
| `modalityBridgeAudioEnabled`  | `true`          | —                              |
| `modalityBridgeAudioModel`    | `""`            | Automatikus vagy STT-azonosító |
| `modalityBridgeAudioTimeout`  | `60000`         | 1000–300000                    |
| `modalityBridgeAudioMaxClips` | `3`             | 1–10                           |

A megosztott gyorsítótárat továbbra is a
`modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` és
`modalityBridgeCacheMaxEntries` vezérli.

### Videóhíd (`videoBridge.ts`, `videoBridgePipeline.ts`)

A Chat Completions `messages` és a Responses API `input` mezőjében található felső szintű videórészeket még azelőtt elfogja, hogy a rendszer meghívna egy olyan célt, amelyről nem ismert, hogy natív videotámogatással rendelkezik. A támogatott formák az `input_video`, `video_url`, `video_source`, a HTTPS URL-ek és a `data:video/*;base64,...` data URI-k. A szövegben szereplő egyszerű fájlneveket a rendszer nem kezeli videóként.

A `VideoBridgeGuardrail.preCall` (`videoBridge.ts`) felel a kérések bejárásáért, a képesség- és szabályzatellenőrzésért, a kérésenkénti összesítésért és a válasz törzséért. Az egyes videók feldolgozása — a beszerzés, a teljes eredmény gyorsítótárazása, a képkockasorozat leírása (amely összeolvasztja a hívó által deklarált hangátiratot), valamint a próbálkozásonkénti metrikák, megszakítás és takarítás — a `videoBridgePipeline.ts` fájlban található `processVideoPart` mögött rejtőzik; ezt a `preCall` ciklusa videórészenként egyszer hívja meg. Ez a modul határozza meg az explicit port-határokat is: a `VideoMediaBrokerPort` szerzi be a bájtokat és nyeri ki a mintavételezett képkockákat, a `VideoAudioTranscriptionPort` összeolvasztja a hívó által deklarált hangátiratot a mintavételezett képaláírásokkal, a `VideoDrilldownPort` pedig a régi nyers tárolási formát biztosítja. Az éles STT- és képkockamegőrzési funkciókat a leíró port körül a `createVideoSttAdapter` és a `createVideoDrilldownAdapter` állítja össze; az utóbbi a megosztott átlátszatlan fogantyú-életciklust használja.

A nyilvános `/v1` kérési útvonal soha nem importál és nem hív meg alfolyamatot. A távoli videók letöltése 50 MiB-os korlát alatt történik; a beágyazott base64-videók konzervatív, videónkénti dekódolt méretkorlátja 36 MiB, így a modell-, üzenet- és keretezési burok a nyilvános JSON-kérés 50 MiB-os befogadási korlátján belül maradhat. A beágyazott hosszúságot és a dekódolt méret becslését a rendszer a lefoglalás előtt ellenőrzi. Az első távoli URL-hez és minden átirányításhoz HTTPS szükséges, a meglévő, csak nyilvános célpontokat engedélyező, DNS-rögzítést alkalmazó kimenő forgalmi védelem használatával. A bájtok ezután áthaladnak a pontos belső `POST /api/modality-bridge/video/extract` brókerhatáron. Ez az útvonal egyszerre `LOCAL_ONLY` és `SPAWN_CAPABLE`, csak folyamatonként hitelesített, megbízható loopback-kérést fogad el, és soha nem fogad el URL-t, fájlrendszerútvonalat, végrehajtható fájlt vagy argumentumlistát. A törzs méretét kezelő API-folyamat és a kezelő inkrementális törzsolvasója egymástól függetlenül érvényesíti az 50 MiB-os brókerbemeneti korlátot. A korlátozott várólista egyszerre egy kibontást futtat, négy függőben lévő feladatot engedélyez, és a függő bemenet maximális méretét 100 MiB-ban korlátozza.

A brokeren belül a `ffprobe` egy privát helyi fájlt olvas; a rögzített
formátum-engedélyezési lista kizárja a lejátszólista- és manifestformátumokat. Az
engedélyezett MOV-családba tartozó tárolók esetében a külső MOV-adathivatkozások
alapértelmezés szerint továbbra is le vannak tiltva, és a rögzített parancs nem
engedélyezi őket. Mind a `ffprobe`, mind az `ffmpeg` csak a `file` protokollt
engedélyező listát, egy szálat, rögzített argumentumtömböket és shell nélküli
végrehajtást használ, a végrehajtható fájlokat pedig a `PATH` alapján oldja fel.
A csatolt képes borítófolyamok nem lehetnek lejátszható jelöltek. Minden
lejátszható folyamnak meg kell felelnie a korlátoknak, és az explicit
alapértelmezett folyamot kell előnyben részesíteni a determinisztikus, legalacsonyabb
indexű tartalék előtt. A videók legfeljebb 600 másodpercesek lehetnek,
dimenziónként legfeljebb 8 192 képponttal és összesen legfeljebb 33 554 432
forrásképponttal. Az FFmpeg 1–16 középponti JPEG-képkockát mintavételez, a hosszabb
élt legfeljebb 1 024 képpontra méretezi át a kisebb bemenetek felnagyítása nélkül,
és soha nem kap URL-t. A mintavételezés alapértelmezett módja a `uniform`. Az
opcionális `scene_aware` és kísérleti `segment_aware` házirendek egy további,
rögzített FFmpeg-átmenetet hajtanak végre a már ellenőrzött helyi folyamon,
korlátozott számú `showinfo` jelenet-időbélyeget választanak ki, és detektorhiba,
időtúllépés, hibás kimenet vagy üres jelöltkészlet esetén determinisztikusan
visszatérnek ugyanazokhoz az egyenletes középpontokhoz. A szegmensérzékeny mód a
középponti mintákat az ellenőrzött jelenetintervallumok arányában osztja ki; a
szegmensérzékeny bizonyíték és a tartalék viselkedése alább olvasható. A szigorú
16 képkockás korlát minden házirendben a kiválasztás után érvényesül. Ha egy
jelenetérzékeny kérésnek csak egy képkockás kerete van, akkor az aktív teljes
videó- vagy fókuszablak egyenletes középpontját használja, és
`policyEffective: uniform` értéket jelez: egyetlen kiválasztott jelenetkocka nem
őrizheti meg egyszerre mindkét időbeli szélt. A hívó opcionálisan megadhat egy
véges fókuszablakot (`start`/`end` másodpercben); a határokat a rendszer a média
időtartamára korlátozza, a fordított vagy nem véges ablakokat elutasítja, és
minden mintavételezési házirendet csak a normalizált intervallumon belül hajt
végre. Az eredményül kapott ablak szerepel a mintavételezési metaadataiban és a
nem megbízható leírás előtagjában, hogy a későbbi modellek megkülönböztethessék a
fókuszált részletet a teljes idővonaltól.

A szemantikus képaláírás-fókusz különálló, explicit beállítás. Az alapértelmezett
`full` elemzési mód megőrzi a meglévő képkockapromptot, és soha nem továbbítja a
kérés szövegét a képaláírás-modellnek. `focused` módban a híd csak ugyanabból a
Chat- vagy Responses-tárolóból olvassa ki a legutóbbi, nem üres, felhasználó
által írt `text`/`input_text` értéket, NFC-re normalizálja, összevonja a
vezérlőkaraktereket és a whitespace-karaktereket, majd legfeljebb 500 Unicode-
kódpontra korlátozza. Üres eredmény esetén pontosan a `full` promptot használja.
A használható tippet JSON-ként szerializálja egy dedikált, nem megbízható
felhasználói kontextust tartalmazó blokkban, és az csak a megfigyelhető részletek
priorizálására használható; nem írhatja felül azt a különálló figyelmeztetést,
amely tiltja a médiában látható vagy hallható utasítások követését. A szöveges
fókusz soha nem következtet `start`/`end` értékekre, és nem módosítja az időbeli
mintavételezőt.

#### FU-07 strukturális szegmensbizonyíték

A `segment_aware` egy korlátozott, előzetes elemzési átmenetet használ a már
ellenőrzött helyi videofolyamon. A rögzített szűrőlánc először legfeljebb 320
képpont szélességűre méretez, jelenetváltozásokat és befagyott intervallumokat
észlel, majd másodpercenként 1 képkockát mintavételez az elmosódás, az átlagos
luma, valamint a térbeli és időbeli információ méréséhez. Az átmenet legfeljebb
600 strukturális mintára, egy FFmpeg-/szűrőszálra, ugyanarra a csak `file`
protokollt és tárolókat engedélyező listára, 1 MiB-os folyamatkimeneti korlátra,
valamint a broker megosztott megszakítási határidején belül legfeljebb 30
másodpercre korlátozódik. Soha nem fogad el parancsot, szűrőt, elérési utat vagy
URL-t a kéréstől.

A strukturális értékek determinisztikus mintavételezési bizonyítékot jelentenek,
nem pedig szemantikus videóértelmezést. Nem következtetnek tárgyakra,
cselekvésekre, képaláírásokra, beszédre vagy felhasználói szándékra. A jelenet- és
fagyási határok szegmenseket alkotnak; a fagyási lefedettség, az elmosódás, az
expozíció, a térbeli részletesség és az időbeli változás csak azt befolyásolja,
hogyan kerül kiosztásra a meglévő 1–16 képkockás keret. Egy teljesen befagyott
szegmens legfeljebb egy képkockát kaphat, míg a nem befagyott szegmensek a
fennmaradó keretért versenyeznek. Ha a határok száma meghaladja a képkockákét, a
rendszer megtartja az egyenletes idővonallefedettséget, így a gyors korai vágások
nem rejthetnek el egy hosszú későbbi szegmenst. Az 1 másodperces elemzési
felbontáson belül egy fagyási határhoz közeli jelenethatárokat a rendszer
összevonja.

A hiányzó szűrők, a hibás vagy üres bizonyíték, a detektorhiba, illetve a
korlátozott előzetes elemzési időtúllépés pontosan az egyenletes középponti
házirendre tér vissza. A hívó általi megszakítás vagy a broker határideje nem
tér vissza ehhez a tartalékhoz: leállítja a folyamatban lévő alfolyamatot,
megakadályozza a későbbi képkocka-kinyerést, és a privát ideiglenes fastruktúrát
a `finally` blokkban eltávolítja.

A `scripts/perf/video-bridge-fu07-eval.ts` determinisztikus, valódi FFmpeg-
tesztfájlokat generál a deduplikálás utáni képaláírás-hívások megtakarításának,
a sűrű mozgás költségkeret-kiosztásának, az elmosódási/expozíciós/SI-TI
bizonyítékoknak, a hosszú farokkal rendelkező gyors vágásoknak, valamint a
fokozatos elhalványulásból eredő téves pozitív találatoknak a vizsgálatához.
Rögzíti az előzetes elemzés falióra szerinti idejét, és ahol a `/usr/bin/time`
elérhető, a gyermekfolyamat CPU-használatát és csúcsmemória-fogyasztását is. A
minőség-ellenőrzései kizárólag strukturális orákulumok. A valódi képaláírás-
modell minősége továbbra is `HOLD`, mivel ennek a tesztkörnyezetnek nincs
engedélyezett végpontja vagy rögzített értékelője. A pénzbeli megtakarítások
szintén `HOLD` értéken maradnak, kivéve ha a
`--caption-cost-per-call-usd` explicit, pozitív hívásonkénti becslést ad meg; a
szkript egyik eredményt sem gyártja le.

Az egyes képkockák mérete legfeljebb 4 MiB, az összes nyers képkockáé együtt
23 MiB, a szerializált broker-válaszé pedig 32 MiB lehet. A privát ideiglenes
könyvtár a `finally` ágban törlődik. Az OmniRoute nem csomagolja az FFmpeg-et,
és nem fogad el egyéni végrehajthatófájl-elérési utat. A feliratozás előtt a
híd konzervatív vizuális deduplikációs lépést alkalmaz: minden JPEG-et 16×16-os
szürkeárnyalatos pufferre redukál, és csak az utolsó megtartott képkockával
hasonlítja össze. Ha a kért feliratkeret nagyobb egy képkockánál, a kinyerés
korlátozott, legfeljebb a keret kétszeresének megfelelő jelöltkészletet biztosít,
de soha nem többet 16 képkockánál. A kért korlátot csak a deduplikáció után
alkalmazza; a végső ritkítás során az első és az utolsó kiválasztott jelölt
megmarad, ha a keret legalább kettő. A verziózott
`grayscale-16x16-mean-cells-v2` szabályzat a középső fényesség változásának és
azon miniatűr-cellák arányának nagyobbik értékét használja, amelyek normalizált
változása legalább 0,05. A duplikátumküszöb a 0,04-es konstans, amelyet a
kiszámíthatóság miatt választottak, nem pedig futásidejű beállításként tettek
elérhetővé. Ez a másodlagos, nagy kontrasztú jel megőrzi azokat a kis mértékű
mozgásokat és látható szövegváltozásokat, amelyeket a csak átlagértéken alapuló
összehasonlítás elrejthet. Az összehasonlító vagy dekódoló hibák nyitott
működésűek, és megőrzik a lefedettséget. A kimeneti metaadatok különválasztják
a kinyert jelölteket, a sikeresen használt képkockákat és az eldobott vizuális
duplikátumokat.

Egy kifejezetten megjelölt videórész időbélyeggel ellátott kontaktlapot kérhet.
A híd legfeljebb 4 oszlopos, 16 képkockás JPEG-rácsot hoz létre. Minden
512 pixeles cella nagy kontrasztú alsó sávba égeti bele a forrás időbélyegét,
miközben ugyanezek az időbélyegek szöveges metaadatokban is megmaradnak a
további hozzárendelés és auditálás céljára. A teljes JPEG mérete legfeljebb
32 MiB lehet. Ha a `sharp` nem tudja dekódolni vagy összeállítani a rácsot, a
híd az egyedi JPEG-képkockákra áll vissza; az ügyfél megszakítása továbbra is
továbbterjed a kontaktlap-műveleten keresztül.

A promóciós bizonyítékok szándékosan elkülönülnek a szintetikus összeállítási
mikrobenchmarktól. A `scripts/perf/video-bridge-contact-sheet-eval.ts` egy
sémaverziózott A/B tesztkörnyezetet definiál valódi, OpenAI-kompatibilis
látásmodellekhez. Méri a szolgáltató által jelentett tokeneket, a végponttól
végpontig mért faliórát (beleértve a kontaktlap összeállítását is), a
modellhívások számát és a manifest által meghatározott ténymegőrzést. A nyers
modellválaszokat nem írja a jelentésbe; csak SHA-256 kivonatokat és az egyező
tényazonosítókat őrzi meg. A tesztkörnyezet nem indít hálózati vagy fizetős
modellhívást, kivéve ha átadják a `--execute-real` kapcsolót, és be vannak
állítva a `--model`, `OMNIROUTE_BASE_URL` és `OMNIROUTE_API_KEY`. E kifejezett
valós futtatás nélkül a géppel olvasható minősítés értéke `HOLD` marad; a
szintetikus hasznosadat-/hívásszám-mérések önmagukban nem számítanak promóciós
bizonyítéknak.

A különálló `scripts/perf/video-bridge-promotion-eval.ts` az FU-07 vagy FU-09
megfigyeléseit használja fel. A promócióra való befogadáshoz mind a nyolc
szintetikus forgatókönyvtípus, valamint egy megtisztított valódi klip szükséges,
szerepenként és esetenként legalább három mért ismétléssel, mind a tíz deklarált
metrikával, rögzített média-/prompt-/elvárt-tény-/beállítás-kivonatokkal,
egyedi megfigyelésazonosítókkal és ellenőrzött, seedelt A/B-sorrenddel. A
végrehajtási bizonylat a korpusz kivonatához, a pontos jelölt SHA-hoz és a
modellverzióhoz kötődik. A hiányzó vagy érvénytelen mérések `HOLD` állapotban
maradnak, beleértve a 30 másodperc feletti CPU-időt, az 512 MiB feletti
csúcs-RSS-t vagy a 30 másodperc feletti előelemzést. Ezek bizonyítékbefogadási
korlátok, nem jelentenek új futásidejű RSS-kikényszerítési garanciát.

Az FU-07 legalább 98%-os minőségmegőrzést és a kiindulási érték legfeljebb
1,2-szeresének megfelelő p95 késleltetést követel meg, továbbá vagy 0,05-ös
abszolút, esetkiegyensúlyozott átlagos recall-javulást azonos átlagos
felirathívásszám mellett, vagy legalább 10%-kal kevesebb átlagos,
deduplikáció utáni felirathívást. Az FU-09 legalább 0,85-ös minőséget, 95%-os
megőrzést, 20%-os mediánkésleltetés-csökkenést és 10%-os tokencsökkenést
követel meg. A kritikus tények elvesztése, az injekciókkal kapcsolatos
megfelelés hiánya vagy a hiányzó használati adatok megakadályozzák a
promóciót. Egyetlen végrehajtás sem promótálhat semmit:
a `--previous-report` két különálló, nem átfedő, egymást követően jogosult
végrehajtást igazol ugyanahhoz a szabályzathoz, modellverzióhoz, jelölthöz és
korpuszhoz. Egy mintavételi kísérlet nem igazolhat kontaktlap-kísérletet.

A gyűjtőknek a válaszokat memóriában kell pontozniuk, és a
`responseDigest` értéket a metrikákkal és a megfigyelési hozzárendelésekkel
együtt kell menteniük, a válasz szövegét azonban soha. A felhasználó a régi,
nyers megfigyeléseket is beolvassa, de ezt a szöveget soha nem másolja a
jelentéseibe. Minden megfigyeléshez pontosan egy fogadható el a
`responseDigest` vagy a `rawResponseText` közül. A verziózott engedélyezési
lista továbbra is üres, változtathatatlan alapértelmezése pedig `hold`. Egy
jogosult bejegyzéshez szükség van a bizonyítékhivatkozására, a szabályzatára,
a modellverziójára, a pontos jelölt SHA-jára, a manifest kivonatára és két
különböző futtatási azonosítóra; az ütköző környezeteket elutasítja a rendszer.
Ezek a metaadatok auditálási szerződést jelentenek, nem bizonyítják, hogy a
hivatkozott fájl valódi méréseket tartalmaz. Bármely bejegyzés hozzáadása előtt
tekintse át a tényleges bizonylatokat. A kezelési statisztikai végpont és a
Video irányítópult konzervatív készenléti állapotot tesz közzé. Egy beállított
modellalias önmagában nem igazolja annak verzióját vagy a futó jelölt SHA-ját,
ezért az aktuális irányítópult `HOLD` állapotot jelent, ahelyett hogy egy másik
végrehajtási környezet jogosultságát használná újra. A kifejezett kísérleti
kiválasztás továbbra is elkülönül a promóciótól; az alapértelmezés nem változik
meg automatikusan.

A hívók opcionális `transcript.cues` tömböt csatolhatnak egy támogatott videórészhez, ha már rendelkeznek időben illesztett szöveggel. Minden cue-nak tartalmaznia kell `text` értéket, egy véges, a vizsgált időtartamon belüli `start`/`end` intervallumot, valamint egy engedélyezett `source` értéket (`client`, `embedded` vagy `audio-bridge`); a `confidence` alapértelmezett értéke `1`, és annak `0` és `1` között kell maradnia. A pontosan azonos cue-k összevonásra kerülnek. Az OmniRoute soha nem indít átírást ezekből a metaadatokból: az ellenőrzött cue-k a forrással, a megbízhatósággal és az intervallummal együtt bemásolódnak a leírt eredménybe, és nem megbízható megfigyelésekként jelennek meg a képkocka-feliratok mellett. Az érvénytelen, tartományon kívüli vagy eredetmegjelölés nélküli szöveget a rendszer elutasítja, nem keveri a feliratfolyamba. Mindkét kérés törzsében található transcript-csatorna a megadott eredetinformációt `client` értékre normalizálja, beleértve az önmagát `embedded` vagy `audio-bridge` címkével ellátó adatot is. Ezeket a megbízható címkéket csak egy szerver által birtokolt adapter rendelheti hozzá a csak kódból elérhető `trustedSource` argumentumon keresztül; egy kérés JSON-mezője nem érheti el ezt az argumentumot. A transcript szövege az eredetétől függetlenül nem megbízható, médiából származó tartalom marad, és soha nem határozhatja meg az engedélyezést.

Egy speciális hívó `audioTranscript` sávot is megadhat ugyanahhoz a videóhoz; ezt a rendszer kliens által biztosított szövegként kezeli, nem pedig szerveroldali átírás bizonyítékaként. Az egyesítési illesztési pont a vizuális és hangalapú megfigyeléseket egyetlen határidő és megszakítási jel alatt futtatja, közös idővonalra rendezi, összevonja a pontosan azonos elemeket, és részleges eredményt jelent, ha csak az egyik oldal jár sikerrel. Egy érvénytelen `audioTranscript` részleges eredményre rontja le a működést — a vizuális leírás megmarad, a hangág pedig megtisztított hibakódot rögzít — a teljes videó meghiúsítása helyett. Az ágankénti elérhetőség, a részleges jelző és a megtisztított hibakódok megmaradnak a leírt eredményben, a védőkorlát metaadataiban (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), az eredménygyorsítótár metaadataiban és a bridge egyesítési számlálóiban. Az alapértelmezett Video Bridge útvonal nem hív beszéd-szöveg átalakítást, és nem tölt le egy második médiamásolatot; kifejezett sáv hiányában továbbra is csak videót kezel.

**Transcript-megőrzés (#12150 P1).** Ez automatikusan érvénybe lép, amikor a Video Bridge (amely maga is opt-in) transcript cue-t jelenít meg — nincs külön megőrzési jelző. Amikor egy kérés bármilyen transcript cue-t jelenít meg (egy hívó által deklarált `transcript` vagy egy egyesített `audioTranscript` értéket), a védőkorlát `videoBridgeObserved` értékkel jelöli azt, és létrehozza a videóleírás szerkesztett árnyékát — egy azonos megjelenítést, amelyben minden cue szabad szöveges törzse a `[redacted-video-transcript]` értékre cserélődik; ez a strukturált cue-mező helyettesítésével történik, még a karakterlánc összeállítása előtt (soha nem a lapított szöveg elemzésével, így semmilyen cue-tartalom — akár ellenséges, akár hétköznapi, beleértve a `]` karaktert tartalmazó törzseket, például `[inaudible]`/`[music]` — nem maradhat meg). A megőrzött hívásnapló kérésének törzse minden videóból származó szövegrészt erre a szerkesztett árnyékra cserél, tartalmi egyenlőség alapján párosítva; a `fullText` horgonyt a kész, hívás előtti védőkorlát-payloadból olvassa vissza, így a párosítás akkor is sikeres marad, ha a későbbi láncbeli védőkorlátok (a PII- és hitelesítőadat-maszkolók, 10/95 prioritással) helyben átírják a leírás szövegét, illetve ha a rendszerprompt- vagy átadás-/memóriainjektálás átalakítja az üzenettömböt. A modellnek upstream küldött törzs változatlan marad. Egy megfigyelt kérés nem tölt fel tartós adatot a Memory-ba (mind a kérésből, mind a válaszból származó kinyerés ki van hagyva), így a modell saját válasza sem tükrözheti vissza a transcript szövegét a Memory-ba.

**Nyers videómezők (#12430).** Ha a bridge engedélyezve van, és a natív videotámogatás ismeretlen vagy hiányzik, a definiált `transcript`/`audioTranscript` mezők akkor is aktiválják a `videoBridgeObserved` értéket, ha a leírás sikertelen, vagy elérték a `maxVideos` korlátot. A `null` és az üres karakterlánc is számít; a hiányzó mezők és a nem videóhoz tartozó metaadatok nem. A megőrzött másolatok szerkesztik ezeket a mezőket vagy elhagyják a kérést, a gyorsítótárak és a Memory pedig megkerülésre kerülnek.

Ezeken a tartalék útvonalakon az érvényes hívói cue-k nem szabványos szolgáltatói mezők, hanem támogatott `text`/`input_text` részek lesznek. Mindkét kérésben megadott sáv továbbra is nem megbízható `client` megfigyelés marad, kifejezett figyelmeztetéssel arról, hogy a videó leírása nem történt meg, és az időbélyegeket nem ellenőrizték a médiával szemben. A meglévő, összesen 256 cue-ra és 64 KiB-ra vonatkozó, valamint a cue-nkénti keretek a két sávra együttesen érvényesek; az időbélyegeknek bele kell férniük a broker 600 másodperces korlátjába és minden megadott fókuszablakba. Az érvénytelen sávokat el kell dobni, nem szabad tetszőleges szövegként továbbítani; érvényes testvérsáv továbbra is használható, kivéve, ha a közös keretük túllépésre kerül. A null/üres mezők nem adnak hozzá szöveget. Ez a tartalék útvonal nem ad hozzá médiabetöltést vagy átírást. A transcript kiterjesztési mezői eltávolításra kerülnek a tartalék videóhordozóból, valamint annak `video_url`/`source` objektumaiból. Az OpenAI vezetékének engedélyezési listája továbbra is szigorú marad; az ismeretlen natív videóhordozók továbbra is elérhetők, az ismert, csak szöveget támogató célok pedig megőrzik a biztonságos jelölőket. A strukturált szerkesztési árnyékok védik a hozzáfűzött transcript szövegét, miközben az eredeti, hívó által birtokolt kérés változatlan marad. A natívan támogatott célok és a letiltott bridge-ek megőrzik meglévő megkerülési viselkedésüket.

A további megőrzött másolatok ugyanazt a megfigyeltkérés-jelet használják. A nyers, védőkorlátok előtti klienskérés-pillanatkép, a memóriabeli függőben lévő kérés és a korán elutasított kérés naplója strukturált módon lecseréli a transcript mezőit a videórészekben; a pipeline szakaszai és a kontextusátadás által előállított szöveges promptok a tartósított kéréstörzs célpontján kerülnek szerkesztésre. A tartósított `video_content_removed` jelölő gondoskodik arról, hogy a `previous_response_id` folytatása zárt hibával meghiúsuljon, ahelyett hogy újra felépítené a szándékosan eldobott szöveget. Ha egy megfigyelt kérés elveszíti részenkénti szerkesztési árnyékát naplózás előtt, vagy ha több videóárnyék közül akár egyetlen sem egyezik a későbbi kérésmódosítások után, a megőrzött kéréstörzs teljes egészében elmarad, ahelyett hogy részben szerkesztett transcriptet őrizne meg.

Egy megfigyelt kérés esetén a modellválasz a beszélgetés bármely részét idézheti strukturált jelöléshatár nélkül. A megőrzött hívásnapló
`responseBody` mezőjét ezért kihagyást jelző marker váltja fel; a részletes pipeline-artefaktumot (amely tartalmazhatja a upstream/kliens törzseket és a streamdarabokat) nem őrizzük meg. A szemantikai, idempotencia- és gondolatmenet-visszajátszási gyorsítótárak megkerülik az olvasást és az írást az adott kérésnél. A szolgáltatói kérés és a kliens számára látható válasz változatlan marad. A korai keepalive bájtokat kiürítjük az ideiglenes pufferből, amikor a részletes artefaktumot kihagyjuk. A Kiro hibás EventStream-figyelmeztetése csak a payload bájtszámát jelenti, a tartalmát és a JSON-elemző nyers hibáját soha.
Ez nem állítja, hogy minden, a szolgáltatótól vagy plugintől származó, nem kapcsolódó diagnosztika auditálása megtörtént; a szélesebb körű megőrzött célpontok vizsgálatát a #11658 követi nyomon.

A belső `/api/modality-bridge/video/drilldown` életciklusa különálló, loopback- és tokenhitelesítésű gyorsítótár-infrastruktúra. Minden művelethez szükség van egy kanonikus, átlátszatlan principal-azonosítóra is. Mielőtt egy éles környezetben működő hívó engedélyezést kapna, ezt az azonosítót a hitelesített tenantből kell levezetnie, és soha nem továbbíthat kliens által kiválasztott értéket. A gyorsítótárkulcsok ezt a principalt a kanonikus munkamenet- és videóhivatkozás-azonosítókhoz kötik, csak az azokból származtatott SHA-256-kulcsokat tárolják, valamint az olvasást és a törlést is ugyanarra a principalra korlátozzák. A gyorsítótár bejegyzésenként legfeljebb 16 származtatott JPEG-képkockát tárol, tíz perc után lejáratja őket, és korlátozott `start`/`end` olvasást, illetve explicit munkamenet-törlést támogat.

Minden principal legfeljebb 16 bejegyzést és 64 MiB kanonikus JPEG-adatot használhat. Ezek a korlátok függetlenek a globális, 64 bejegyzéses/256 MiB-os felső korláttól: a principal kvótanyomása először csak az adott principal legutóbb legrégebben használt bejegyzéseit üríti, és csak ezt követően kerülhet sor globális LRU-ürítésre. A lejárt bejegyzéseket gyorsítótár-tevékenység közben mind a principal-, mind a globális elszámolásból eltávolítjuk, míg a megszakítás és az érvényesítési hiba nem véglegesít részleges cserét.

A gyorsítótár elutasítja a nem kanonikus Base64-et, a túlzott paddinget, a nem JPEG formátumú médiát, a hibás vagy csonkolt JPEG-eket, valamint azokat a JPEG-eket, amelyek korlátozott, teljes képet feldolgozó `sharp` dekódolás során figyelmeztetést váltanak ki. Minden elfogadott képet kanonikus JPEG-ként kódol újra, a szélességet és a magasságot a dekódolt bájtokból vezeti le a hívó által megadott mezők megbízhatónak tekintése helyett, és a záró polyglot bájtokat eldobja, nem pedig megőrzi. Mindkét kvótába csak a korlátozott kanonikus tömörített puffer számít bele. A JSON vezetékprotokoll-korlátja a Base64 többletét is tartalmazza a 32 MiB-os dekódolt bemeneti felső korlát esetén. Minden tárolt származtatás rögzíti az érvényesített JPEG-formátumot/-felbontást, a mintavételi szabályt, a származtatási verziót, a létrehozás időpontját, a szerver által számított tartalomhash-t, valamint a hash-elt szülőhivatkozást és a megbízható hívó szülőtartalom-hashét. A megszakítást az aszinkron dekódolási/hash-elési fázisok között, az atomi gyorsítótár-commit előtt ellenőrizzük.

Az éles környezetben működő előállító csak sikeres vizuális elemzés után használja újra a már származtatott broker-képkockákat, újabb videóletöltés vagy -kinyerés nélkül. Ehhez szükséges az operátori
`modalityBridgeVideoDrilldownEnabled=true`, a szigorú, részenkénti `drilldown: true`, valamint egy hitelesített API-kulcsrekord-azonosító. A kliens által deklarált principal-/munkamenetértékek soha nem alapozzák meg a tulajdonjogot. A három feltétel bármelyikének hiányában nem végez hash-elést vagy átméretezést, és nem tart meg további képkockákat. A megőrzés sikertelensége megőrzi a használható vizuális választ. A hozzájárulással rendelkező kérések megkerülik a teljes videó eredmény-gyorsítótárát, így a gyorsítótárazott eredmények soha nem játszanak vissza handle-eket.

A sikeres JSON- és SSE-válaszok legfeljebb négy átlátszatlan handle-t tesznek elérhetővé a korlátozott
`x-omniroute-video-drilldown` fejlécben. Az engedélyezett böngészőoriginok olvashatják ezt a fejlécet anélkül, hogy szélesítenénk a CORS origin-szabályzatát. Az új handle-ek formátuma `v1.<32-byte random base64url
token>`, a regisztrációs adatbázis pedig csak azok SHA-256-hashét őrzi meg.
Az olvasó-/fejléc-elemző a korábbi 64 hexadecimális tokeneket is elfogadja.
A hitelesített nyilvános fogyasztó a
`GET /api/v1/video-bridge/drilldown?handle=...`, amelyet egymástól függetlenül a
`modalityBridgeVideoDrilldownRemoteEnabled=true` kapcsoló engedélyez. Az explicit módon megőrzött false visszavonja a hozzáférést akkor is, ha a korábbi `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` környezeti változó fallbackje engedélyezve van. Az éles környezetben végzett megőrzésnél ennek megfelelő, korábbi
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` fallback áll rendelkezésre. Mindkét fallback alapértelmezés szerint ki van kapcsolva.

A fogyasztó a tulajdonjogot a hitelesített kulcsból vezeti le, és alkalmazza a kulcs házirendjét:
mind a GET, mind a DELETE a `video` végpontkategóriához tartozik, beleértve a `/v1`
és `/api/v1` aliasokat is. A nem üres végpontengedélyezési listával rendelkező kulcsoknak tartalmazniuk kell a `video` értéket; a korlátozás nélküli kulcsok kompatibilisek maradnak. A fogyasztó ugyanazt a 404-es választ adja az ismeretlen, lejárt és egy másik kulcshoz tartozó handle-ekre. Elfogadja a
`variant=preview|standard|detail` értékeket (320/640/1280 maximális JPEG-mérettel, felnagyítás nélkül),
`limit=1..8` értéket (vagy a korábbi `frames` aliast, a kettőt egyszerre soha), a nullától induló `page` értéket, valamint az opcionális `start`/`end` fókuszidőt másodpercben. A duplikált lekérdezési kulcsokat és a fordított fókuszablakokat elutasítja. Minden visszaadott változat a tényleges tartalmának hashét és a tényleges felbontás metaadatait tartalmazza, a megőrzött forráshoz kapcsolva. A változatokat olvasáskor származtatjuk, nem pedig további megőrzött másolatokként tároljuk. A JSON-válasz, a Base64-et és a burkolóstruktúrát is beleértve, legfeljebb 32 MiB lehet; a túlméretes oldal 413-as választ ad, és a kliensnek kevesebb képkockát kell kérnie. Az olvasások minden átméretezés körül ellenőrzik a megszakítást, majd visszaadás előtt újra ellenőrzik a handle érvényességét. A tulajdonos által végzett `DELETE` idempotens; a törlés vagy a TTL lejárta felszabadítja a megőrzött forrást és a használati elszámolást.

A megosztott tároló folyamatlokális: a handle-ek újraindításkor lejárnak, és nem vihetők át egymástól független OmniRoute-folyamatok között. A kezelési statisztikák az effektív megőrzési/távoli házirendet, valamint az összesített megőrzött bejegyzéseket/bájtokat teszik közzé, médiát, hivatkozásokat, principal-azonosítókat vagy handle-eket soha. A Video beállítási panel megjeleníti ezeket az értékeket, és mindkét hozzájárulási kapcsoló állapotát képes megőrizni. Ez a megvalósítási dokumentáció nem éles üzembe helyezési vagy promóciós bizonyíték; a valódi modellel végzett elfogadási tesztelést külön követjük nyomon.

A képkockák egymás után, a konfigurált Video modellel kapnak feliratot. Az üres
Video-felülbírálás örökli a Vision-beállítást; ha mindkettő üres, a Vision
automatikus útválasztója választja ki a tényleges, látást támogató modellt. A
sikeres feliratok az eredeti részt egy stabil `[Video description:` előtaggal
cserélik le, amely egyben a szöveget nem megbízható, médiából származó
megfigyelésként jelöli, és tájékoztatja a downstream modelleket, hogy ne
kövessék a médiában talált utasításokat. A képkockafeliratok gyorsítótárkulcsai
tartalmazzák a JPEG bájtokat, a promptot, az időbélyeget és a tényleges modellt;
csak a sikeres feliratok kerülnek gyorsítótárba. A gyorsítótár-bejegyzések
megőrzik a ténylegesen sikeres előállító modellt, beleértve a tartalékmodellt is;
a bridge `mixed` értéket jelez, ha a különböző képkockákat különböző modellek
állították elő. A gyorsítótár-találat újra felhasználja ezt az előállítói
azonosítót, ahelyett hogy a kért útválasztási terv címkéjével látná el. A teljes
videó eredmény-gyorsítótárának kulcsa minden olyan bemenetet tartalmaz, amely
megváltoztatja a kimenetet — a promptot, a tényleges modellt, a mintavételi
szabályzatot, a képkockák számát, a szemantikai elemzés módját, a normalizált
fókuszsúgó SHA-256-ujjlenyomatát, a fókuszablakot, a `transcript` értéket, az
`audioTranscript` értéket és a kontaktlap-jelzőt —, ezért ezen dimenziók
bármelyikének megváltozása gyorsítótár-mulasztás, és soha nem elavult
újrafelhasználás. A vizuális deduplikációs szabályzat verziója, küszöbértéke és
korlátozott jelöltképkocka-száma szintén explicit módon szerepel az
eredmény-gyorsítótár kulcsában és metaadataiban; egy szabályzatváltozás ezért
nem használhat fel újra elavult teljesvideó-leírást. Az eredmény-gyorsítótár v4
metaadatai megőrzik a módot és az ujjlenyomatot, de soha nem a nyers felhasználói
feladatot. A védelmi réteg metaadatai a kért és a tényleges elemzési módot is
jelentik; a használható felhasználói szöveg nélküli, kért `focused` módot
ténylegesen `full` módként jelentik.

A védelmi réteg minden támogatott videórészt kinyer, de legfeljebb
`modalityBridgeVideoMaxVideos` videót ír le. Egy olyan cél esetén, amelyről
bizonyított, hogy `supportsVideo === false`, a sikertelen és a korláton felüli
videók explicit, biztonságos szöveges jelölőkké válnak, így nem marad nyers videó.
Ismeretlen képesség esetén ezek a részek megtartják videóhordozójukat; minden
tartalék-átirat a fenti korlátozott szövegkonverziót követi.
A `supportsVideo === true` értékű célok megkerülik a bridge-et.
A klienskérés megszakítási jele továbbterjed a letöltésen, a broker várólistáján,
az alfolyamatokon és a feliratkészítési hívásokon keresztül; a megszakítások
videók között leállítják a feldolgozást, és soha nem engednek át nyers médiát
hiba esetén.

A futásidejű beállításokat az adatbázis tárolja, és a Zod ellenőrzi:

| Kulcs                               | Alapértelmezett | Tartomány / viselkedés                                                                                                       |
| ----------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`         | Opcionális futásidejű beállítás, külön engedélyezés szükséges                                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`        | A `full` megőrzi az általános feliratokat; a `focused` korlátozott, nem megbízható legutóbbi felhasználói kontextust használ |
| `modalityBridgeVideoModel`          | `""`            | A Vision Bridge modelljének öröklése                                                                                         |
| `modalityBridgeVideoFrameCount`     | `8`             | 1–16                                                                                                                         |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`     | `uniform`, `scene_aware` vagy arányos `segment_aware`; az érzékelő hibája esetén `uniform` használatos                       |
| `modalityBridgeVideoMaxVideos`      | `1`             | 1–4                                                                                                                          |
| `modalityBridgeVideoTimeout`        | `120000`        | 1000–120000 ms                                                                                                               |

A tartósan tárolt régi Video-időtúllépési értékeket, ha meghaladják a 120
másodpercet, a broker határidejére kell korlátozni; az ezt a határt meghaladó új
beállításírásokat a rendszer elutasítja. A
`GET /api/modality-bridge/video/runtime` hitelesítés vagy futásidejű vizsgálat
előtt megbízható, bélyegzett loopback-helyi hozzáférést igényel, majd kezelői
hitelesítést kér. Csak az `available` értéket, a megtisztított FFmpeg/ffprobe
verziókat és egy rögzített indoklást ad vissza arra az esetre, ha a futásidejű
környezet nem érhető el. A belső kinyerési végpont nem nyilvános feltöltési API:
a várólista telítettsége `503` választ és `Retry-After` fejlécet ad, a hívó
kapcsolatának megszakadása `499` választ eredményez, a rögzített broker-határidő
pedig `504` választ ad. A konvertált válaszok hozzáadják a
`video->text;model=<visionModel>;parts=<videos>` értéket a központi
`x-omniroute-modality-bridge` fejléchez, a Vision- vagy Audio-szegmensek
eltávolítása nélkül.

### PII-maszkoló (`piiMasker.ts`)

Mindkét szakaszban fut.

- A **`preCall`** klónozza a payloadot, bejárja a `system`, `messages`, `input` és
  `prompt` mezőket (beleértve az egyszerű szöveges elemeket is), és a
  `@/shared/utils/inputSanitizer` csomagból származó `processPII()` függvényt
  alkalmazza a string típusú `content`/`text` mezőkre. Amikor a
  `PII_REDACTION_ENABLED=true`, az észlelt személyes adatok kitakarásra kerülnek
  a kimenő payloadban. Ez független az `INPUT_SANITIZER_MODE` beállítástól (az
  csak a promptinjektálási szabályzatot vezérli). Ha a kitakarás ki van
  kapcsolva, a hívás rögzíti az észlelések számát, de nem írja át a tartalmat.
- A **`postCall`** mélyen klónozza a választ, lefuttatja a
  `sanitizePIIResponse()` függvényt, valamint a Responses API-alakzatának
  maszkolóját (`maskResponsesOutput` — az `output_text` és az
  `output[].content[].text` mezőket fedi le). Ha bármilyen kitakarás történik,
  a módosított válasz lecseréli az eredetit.

A védelmi réteg soha nem blokkol; csak megjegyzésekkel látja el
(`meta.detections`, `meta.redacted`) vagy átírja az adatokat.

**Visszafordítható tároló (`PII_REVERSIBLE_VAULT_ENABLED`, alapértelmezés szerint `false`).** Ha a
`PII_REDACTION_ENABLED` és a `PII_REVERSIBLE_VAULT_ENABLED` is be van kapcsolva (DB-felülírás >
környezet > alapértelmezés, kérésenként egyszer olvasva), a `handleChat` egy tárolót nyit minden
klienskéréshez (`src/lib/pii/requestTokenVaultScope.ts`), és átadja azt az előhívás előtti
folyamatnak `GuardrailContext.tokenVault` értékként. A maszkoló ezután olyan helyettesítő tokeneket
ír, mint a `<<PII_EMAIL_QWERTYUI_1>>` a `[EMAIL_REDACTED]` helyett, mind a beépített,
érvényesített (GDPR/POPIA), mind az egyéni szabályok esetében. A nonce kérésenként 8 véletlenszerű
nagybetűből áll, és ugyanaz az érték ugyanazt a tokent kapja a kérésen belül. Csak a maszkoló hoz
létre tokeneket: a promptinjektálás-őrszem és a `/api/guardrails/test` tároló nélkül futnak, és
megőrzik a helyőrzőket.

- A szolgáltató, minden kombinációs ág, az újrapróbálkozás, a fúziós panel minden tagja és a fúziós
  bíró csak tokeneket lát. A tokenek egyszer kerülnek visszaállításra, azon a 2xx válaszon, amely
  elhagyja a `handleChat` függvényt: mezőnként a feldolgozott SSE-ben (az események között felosztott
  token is feloldódik; az eszközhívási argumentumok JSON-escape-eltek), illetve mezőnként egy JSON-
  törzsben, újraszámított `Content-Length` értékkel. A tartalom- és gondolkodási szöveg, valamint az
  eszközhívási argumentumok visszaállításra kerülnek. A hibaválaszok törzsei (4xx/5xx) megőrzik a
  tokeneket.
- A hibák privátak maradnak: ha a token létrehozása sikertelen, vagy a tároló elutasít egy értéket
  (1000 bejegyzés, értékenként 256 karakter, összesen 64 KB), akkor helyette a helyőrző kerül
  beírásra; a token, amelyet a tároló nem tud feloldani, illetve a sikertelen visszaállítás
  változatlan szövegként marad, és csak a darabszám kerül naplózásra. A tároló nem használ időzítőket
  és nem tartalmaz globális állapotot; a válaszfolyam végén, megszakításakor vagy hibájakor kiürül.
- Ha egy kérés tokeneket hozott létre, a memória-kinyerés, az idempotencia mentése és mindkét
  szemantikus gyorsítótárba történő írás kimarad, mivel egyetlen későbbi kérés sem tudná feloldani
  ezeket a tokeneket. A hívási naplókban a szolgáltatónak küldött kérés és a válasz tokeneket
  tartalmaz; a naplózott klienskérési törzs továbbra is a kliens nyers bemenete, ugyanúgy, mint az
  egyszerű maszkolás esetén.
- A tokenek kérésenként véletlenszerű nonce-ot használnak, ezért a prompt előtagja minden
  körben változik: a szolgáltatói oldali prompt-gyorsítótárazás nem talál egyezést maszkolt körök
  esetén, és az a token, amely egy későbbi körben tér vissza (például a
  `previous_response_id` segítségével), egy régi kéréshez tartozik, ezért változatlan szövegként
  marad.

#### Típusonkénti kiválasztás, egyéni minták és észlelési számlálók

**Dashboard → Settings → Security → PII masking** választja ki, _mi_ legyen maszkolva. Ez
nem kapcsolja be a maszkolást: azt továbbra is a `PII_REDACTION_ENABLED` (kérés) és a
`PII_RESPONSE_SANITIZATION` (válasz + SSE) vezérli; mindkettő alapértelmezés szerint ki van
kapcsolva.

- **Típusonkénti kiválasztás** — a beépített azonosítók a
  `src/shared/constants/piiTypes.ts` fájlban (`PII_BUILTIN_TYPES`) vannak felsorolva. A beállítás
  hiánya minden típust jelent (a beállítás bevezetése előtti működés). A kérésfeldolgozó motor
  `ssn_us` mintája az `ssn` típushoz van leképezve. A sablonok (Minimal, Standard, Financial,
  Brazilian, USA, GDPR, POPIA, Full) csak a felhasználói felület jelölőnégyzeteit töltik ki.
- **GDPR- és POPIA-azonosítók** — tizenkét beépített azonosító, amelyek az európai uniós és
  dél-afrikai személyes azonosítókat fedik le (lásd az alábbi táblázatot). Regexeik, validátoraik és
  joghatósági címkéik egyetlen táblázatban találhatók, a
  `src/shared/utils/piiPatterns.ts` fájlban, amelyet mind a válaszsanitizáló
  (`src/lib/piiSanitizer.ts`), mind a kérésmaszkoló (`src/shared/utils/inputSanitizer.ts`)
  használ. Egy találat csak akkor kerül maszkolásra, ha a validátor elfogadja; önmagában egy
  számjegysorozat nem elegendő. Az az üzemeltető, aki ezen azonosítók megjelenése előtt mentett
  szűkített kiválasztást, addig megőrzi korábbi működését, amíg az új azonosítókat be nem jelöli.
- **Egyéni minták** — legfeljebb 20 regex- vagy helyettesítőkarakteres minta (`*` = legfeljebb 64
  nem fehér szóköz karakter, `?` = egy karakter). A találatokból `[CUSTOM_REDACTED]` lesz. Minden
  minta átesik a `compilePiiCustomPattern()` folyamatán
  (`src/shared/utils/piiCustomPatterns.ts`): legfeljebb 500 karakteres lehet, a jelzők csak a
  `g i m s u` értékek lehetnek, le kell fordulnia, át kell mennie a `safe-regex` ellenőrzésén
  (katasztrofális visszalépés), és nem egyezhet üres szövegre vagy maszkolási helyőrzőre. A hibás
  mintát mentéskor és teszteléskor elutasítja a rendszer, a futásidőben hibásan betöltött sort pedig
  kihagyja a fordítás helyett. Az egyéni minták csak bekapcsolt maszkolás mellett futnak.
- **Észlelési számlálók** — típusonkénti darabszámok (soha nem a talált értékek), memóriában
  tárolva és újraindításkor nullázva (`src/lib/pii/piiDetectionStats.ts`). Csak bekapcsolt
  maszkolás mellett növekednek.

A beállítások a `key_value` táblában találhatók (a `pii_settings` névtérben,
`src/lib/db/piiSettings.ts`), és 1 másodperces gyorsítótáron keresztül kerülnek beolvasásra. API:

| Metódus | Útvonal                  | Cél                                                                                |
| ------- | ------------------------ | ---------------------------------------------------------------------------------- |
| `GET`   | `/api/settings/pii`      | Jelző állapota, `enabledTypes`, `customPatterns`, észlelési számlálók              |
| `PUT`   | `/api/settings/pii`      | Az `enabledTypes` (`null` = mind) és/vagy a `customPatterns` cseréje               |
| `POST`  | `/api/settings/pii/test` | Egyetlen minta próbafuttatása legfeljebb 8 KB-os mintán; semmi nem kerül tárolásra |

Mindhárom művelet kezelési hitelesítést igényel, és a törzset Zod segítségével ellenőrzi
(`src/shared/validation/schemas/piiSettings.ts`). Kikapcsolt bejelentkezés esetén
(`requireLogin=false`) a `GET` és a tesztvégpont nyitott, de a `PUT` művelethez továbbra is
dashboard-munkamenet, `manage` hatókörű API-kulcs, írási hatókörrel vagy magasabb szinttel
rendelkező `oma_` hozzáférési token, illetve a loopbackről küldött CLI-token vagy
belsőszolgáltatás-token szükséges.

#### GDPR (EU) és POPIA (Dél-Afrika) azonosítók

| Id                  | Azonosító                  | Érvényesítés                                                                                |
| ------------------- | -------------------------- | ------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                       | Ismert ország, az adott országra jellemző pontos hossz, ISO 13616 MOD-97-10                 |
| `eu_vat`            | EU-s adószám               | Ismert tagállami előtag és az adott állam számformátuma (nincs VIES-lekérdezés)             |
| `es_dni_nie`        | Spanyol DNI / NIE          | Ellenőrző betű (érték mod 23); a NIE formátuma `X/Y/Z` + 7 számjegy                         |
| `it_codice_fiscale` | Olasz Codice Fiscale       | Az ellenőrző betű a páratlan/páros pozíciók táblázatai alapján                              |
| `pl_pesel`          | Lengyel PESEL              | Súlyozott ellenőrzőösszeg és létező, kódolt születési dátum                                 |
| `nl_bsn`            | Holland BSN                | 11-es próba (9..2 súlyok, -1)                                                               |
| `de_steuer_id`      | Német Steuer-ID            | ISO 7064 Mod 11,10, valamint a számjegyszerkezet szabályai (nem kezdődhet 0-val)            |
| `se_personnummer`   | Svéd personnummer          | Luhn az utolsó tíz számjegyen és érvényesnek tűnő születési dátum (10 vagy 12 számjegy)     |
| `za_id`             | Dél-afrikai azonosító szám | Luhn mind a 13 számjegyen, érvényes születési hónap/nap, 0 vagy 1 állampolgársági számjegy  |
| `za_phone`          | Dél-afrikai telefonszám    | `+27` / `27` előtag, vagy szóközzel vagy kötőjellel írt nemzeti `0..` formátum              |
| `za_vat`            | Dél-afrikai adószám        | `4`-gyel kezdődő 10 számjegy **és** "VAT" / "BTW" az előző 48 karakterben                   |
| `za_tax_ref`        | Dél-afrikai adóhivatkozás  | `0`-`3` közöttivel kezdődő 10 számjegy, Luhn, **és** "tax" / "SARS" az előző 48 karakterben |

Mivel a kizárólag számjegyekből álló formátumok ütköznek a rendelési számokkal, a
buildszámokkal és az időbélyegekkel, a leggyengébbeknek (`za_vat`, `za_tax_ref`)
kulcsszavas jelzésre van szükségük, és a puszta tízjegyű `0..` számot nem kezeli
dél-afrikai telefonszámként. A szóközökkel tagolt IBAN-ok (`GB29 NWBK ...`) nem
kerülnek felismerésre. A streaming útvonalon a jelzés csak az aktuális
chunkban kerül megkeresésre. Az azonosítók a generikus telefonszám-minták előtt
helyezkednek el, ezért az érvényesített azonosító megtartja a saját helyőrzőjét
(`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). A `gdpr` és `popia` sablonok
rendre az EU-s, illetve a dél-afrikai azonosítókat választják ki. Maga a maszkolás
továbbra is opt-in (Hard Rule #20): ez itt nem módosít semmilyen
funkciójelző-alapértelmezést.

### Prompt-injektálás (`promptInjection.ts`)

A felhasználó által megadott tartalomban található ellenséges struktúrákat észleli,
és érvényesíti a konfigurált házirendet. A működést környezeti változók és
konstruktorbeállítások vezérlik:

| Beállítás         | Környezeti változó                                                                                       | Alapértelmezett | Hatás                                                                                                                                                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Engedélyezve      | `INPUT_SANITIZER_ENABLED`                                                                                | `true`          | Ha `false`, a védelmi mechanizmus azonnal visszatér.                                                                                                                                                                 |
| Mód               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                          | `warn`          | Injekciós házirend: `block`, `warn` vagy `log`. (A `redact` visszamenőleges kompatibilitás miatt elfogadott, de **nem** távolítja el az injekciós szöveget; a kérés PII-átírását a `PII_REDACTION_ENABLED` vezérli.) |
| Blokkolási küszöb | `blockThreshold` beállítás / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`          | A blokkoláshoz szükséges minimális súlyosság. Alapértelmezés szerint a közepes súlyosság csak megfigyelést eredményez.                                                                                               |

**Módelsőbbség** (`getMode`): a hívó `options.mode` értéke →
`INJECTION_GUARD_MODE` **DB-s funkciójelző-felülbírálása** (Irányítópult →
Beállítások → Funkciójelzők) → `INJECTION_GUARD_MODE` környezeti változó →
`INPUT_SANITIZER_MODE` környezeti változó → `warn`. Az irányítópulton beállított
felülbírálás ezért elsőbbséget élvez a környezeti változókkal szemben, így a
Funkciójelzők felülete újraindítás nélkül, futás közben vezérli a védelmi
mechanizmust. Az adatbázis olvasása hibabiztos: hiba esetén a védelmi mechanizmus
a környezeti változókon alapuló működésre áll vissza, és ha nincs felülbírálás,
a működés megegyezik a kizárólag környezeti változókon alapuló feloldással.

Észlelési források:

1. A `@/shared/utils/inputSanitizer` `sanitizeRequest()` függvénye (a folyamat
   más részein is használt megosztott észlelő-készlet).
2. A beépített `DEFAULT_GUARD_PATTERNS` (jelenleg a
   `system_override_inline` és a `markdown_system_block`, mindkettő `high`
   súlyosságú).
3. A konstruktor beállításain keresztül átadott opcionális `customPatterns`
   (sztringek, reguláris kifejezések vagy `{ name, pattern, severity }` rekordok).

Ha `mode === "block"` **és** legalább egy észlelés eléri a súlyossági küszöböt,
a `preCall` a következő értéket adja vissza: `{ block: true, message: "Request rejected:
suspicious content detected" }`. `warn`/`log` módban a védelmi mechanizmus naplózza
az eseményt, de engedélyezi a hívást. Az `evaluatePromptInjection()` megosztott
segédfüggvény szintén exportálva van azon hívók számára, akik a regisztráción
keresztüli feldolgozás nélkül szeretnék kiértékelni a promptokat.

**Vizsgálati korlát (v3.8.20):** az észlelő az összefűzött prompt szövegének csak az
**első 16 KB-ját** vizsgálja — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bájt) a
`src/shared/utils/inputSanitizer.ts` fájlban. A `detectInjection()` és az
`evaluatePromptInjection()` egyaránt `slice(0, MAX_INJECTION_SCAN_BYTES)` műveletet hajt végre a
mintázatciklus futtatása előtt. A befecskendezési direktívák a bemenet eleje közelében helyezkednek el, így ez korlátozza a regex CPU- és GC-terhelését a több száz KB-os hasznos adatok esetén, a felismerés gyengítése nélkül (vö.
#3932, #4041).

### Hitelesítőadat-maszkoló (`credentialMasker.ts`)

Mindkét szakaszban lefut, az alapértelmezett lánc utolsó elemeként (prioritás: `95`). A kimenő hasznos adatból (üzenettartalom, eszközhívási argumentumok, eszközeredmények) **és** a szolgáltatói válaszból is eltávolítja az ismert API-kulcs-/titkos-token-mintázatokat, így a promptba beillesztett (vagy egy eszközeredmény által visszaadott) hitelesítőadat nem szivárog fel a szolgáltatóhoz, illetve nem jut vissza az ügyfélhez.

- **Csak explicit engedélyezéssel működik**, ugyanazt a konvenciót követve, mint a PII-eltávolítás (a Hard Rule #20 szabályhoz kapcsolódóan): le van tiltva, kivéve ha `settings.credentialRedactionEnabled === true` **vagy** `CREDENTIAL_REDACTION_ENABLED=true`. Kikapcsolt állapotban a védelmi szabályzat nem végez műveletet — soha nem blokkol és nem ír át semmit.
- A `redactCredentials()` bejárja a teljes hasznosadat-/válaszfát (`walkValue()`; prototípus-szennyezéssel szemben védett, a ciklusokat pedig `WeakSet` segítségével kezeli), és a találatokat egy `[REDACTED:<type>]` helyettesítő értékkel váltja ki; csak a ténylegesen módosult ágakat klónozza.
- A `CREDENTIAL_PATTERNS` lefedi az LLM-szolgáltatók kulcsait (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), a VCS-/SaaS-tokeneket (GitHub, Slack, Linear, Notion, npm, Postman, Discord), a fizetési kulcsokat (Stripe, Square), a felhőkulcsokat (AWS hozzáférési kulcs, Twilio, SendGrid, Mailgun), a privát kulcsokat / JWT-ket, a hitelesítőadatot tartalmazó kapcsolati karakterláncokat (`mongodb://user:pass@...`, stb.), valamint az általános `Authorization`/`x-api-key`/`api-key`/`apikey` fejlécérték-mintázatot. A fejléchez hasonló kulcsokat (`authorization`, `x-api-key`, `api-key`, `apikey`) strukturálisan, csak az értéket érintve maszkolja (a séma előtagját, például a `Bearer `/`Basic ` részt megőrzi), nem pedig az általános szöveges regex segítségével.
- A védelmi szabályzat soha nem blokkol; csak átír (`modifiedPayload` /
  `modifiedResponse`) és metaadatot fűz hozzá (`meta.credentialsRedacted`, `meta.count`).

Regresszióvédelmi teszt: `tests/unit/credential-masker-guardrail.test.ts`.

## Alapszerződés (`base.ts`)

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
  block?: boolean; // a true rövidre zárja a láncot
  message?: string; // blokkoláskor jelenik meg
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // a preCall adja vissza a kérés átírásához
  modifiedResponse?: TValue; // a postCall adja vissza a válasz átírásához
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

Egy guardrail a „nincs változás" állapotot úgy jelzi, hogy `void`, `{}` vagy
`{ block: false }` értéket ad vissza. A `modifiedPayload`/`modifiedResponse`
visszaadása lecseréli a láncon áthaladó értéket a későbbi guardrailek számára.
A `signal?: AbortSignal` a hívó életciklusát viszi át a guardrailekbe. A kérés
megszakítása a szándékos fail-open kivétel: a média-bridge-ek leállítják a
munkát és kitakarítanak anélkül, hogy visszaállítanák a nyers médiát egy olyan
célra, amelyről tudható, hogy nem támogatja azt.

## Registry (`registry.ts`)

A singleton `guardrailRegistry` a következőket teszi elérhetővé:

- `register(guardrail)` — hozzáad (vagy normalizált név alapján lecserél) egy
  guardrailt, és növekvő `priority` szerint újrarendez.
- `clear()` / `list()` — adminisztratív segédfüggvények.
- `runPreCallHooks(payload, context)` — végigiterál az aktív guardraileken,
  a payloadot a `modifiedPayload`-on keresztül fűzi tovább, és az első
  `block: true` esetén megáll.
- `runPostCallHooks(response, context)` — ugyanez a folyamat a válasz oldalán.
- `resetGuardrailsForTests({ registerDefaults })` — törli az állapotot, és
  opcionálisan újraregisztrálja az alapértelmezetteket a tiszta
  tesztizoláció érdekében.

Mindkét futtató `{ blocked, payload|response, results, guardrail?, message? }`
értéket ad vissza, ahol a `results` a `GuardrailExecutionResult` rekordok
tömbje, amelyek guardrailenkénti `blocked`, `skipped`, `modified`, `error` és
`meta` mezőket tartalmaznak — ezek hasznosak nyomon követéshez.

### Guardrailek letiltása kérésenként

A `resolveDisabledGuardrails({ apiKeyInfo, body, headers })` egy deduplikált
listát állít össze azokból a guardrail-nevekből, amelyeket az aktuális
kérésnél ki kell hagyni. Öt csatorna létezik, amelyeket ebben a sorrendben
olvas be, és egyetlen listába fésül össze (deduplikáláskor az első előfordulás
nyer):

1. `apiKeyInfo.disabledGuardrails`
2. A kérés törzsének `disabledGuardrails` mezője (legfelső szint)
3. A kérés törzsének `metadata.disabledGuardrails` mezője (csak ha a `metadata` objektum)
4. A `x-omniroute-disabled-guardrails` fejléc
5. A régi (legacy) `x-disabled-guardrails` fejléc

Mind az öt csatorna összevonásra kerül, beleértve a két fejlécet is: ha
mindkét `x-omniroute-disabled-guardrails` és `x-disabled-guardrails` fejlécet
elküldi, a listáik uniója kerül kihagyásra, és az üres modern fejléc már nem
rejti el a régi fejlécet
([#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412), javítva a
[#16805](https://github.com/diegosouzapw/OmniRoute/pull/16805) PR-ben).

Az értékek lehetnek stringek tömbjei vagy egy vesszővel elválasztott string;
a nevek le vannak vágva és kisbetűs kebab-case formátumra normalizálva
(`pii_masker` → `pii-masker`), az üres bejegyzések pedig elhagyásra kerülnek.
Az eredmény a `context.disabledGuardrails` mezőn keresztül jut el a registryhez,
amely kihagyja az egyező guardraileket (`skipped: true` a `results` mezőben).

A letiltási lista kizárólag a **registryt** érinti. A prompt-injection `block`
mód kötelező határ: az injection-guard middleware
(`src/middleware/promptInjectionGuard.ts`) a `evaluatePromptInjection()`
függvényt bármilyen hívó által vezérelt letiltási lista nélkül hívja meg (a
korábban végrehajtott, halott `resolveDisabledGuardrails({ body })` hívást
eltávolították a
[#16934](https://github.com/diegosouzapw/OmniRoute/pull/16934) PR-ben), így a
`prompt-injection` guardrailt letiltó kérés `block` módban továbbra is
elutasításra kerül. Ez szándékos. A letiltási csatornákat a hívó vezérli
(kérés törzse, metadata, fejlécek), és a hívónak nem szabad tudnia kikapcsolni
egy olyan biztonsági kontrollt, amelyet az üzemeltető állított be
([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). A
[#16412](https://github.com/diegosouzapw/OmniRoute/issues/16412) szerinti
fejlécunió csak azt változtatja meg, hogy mely registry-guardrailek kerülnek
kihagyásra; nem teszi lehetővé, hogy a kliens megkerülje a middleware-t. A
kötelező kulcsonkénti és csoportonkénti guardrail-szabályzatokat a v4-es RFC
[#16417](https://github.com/diegosouzapw/OmniRoute/issues/16417) követi nyomon.
Lásd: [Lefedettség és korlátok](#coverage-and-limits).

## Végrehajtási sorrend

Minden, a `src/sse/handlers/chat.ts` és az
`open-sse/handlers/chatCore.ts` fájlon áthaladó kérés esetén (a
[Hatókör és korlátok](#coverage-and-limits) alatt felsorolt chat-családba tartozó útvonalakon):

1. A `resolveDisabledGuardrails(...)` létrehozza a kihagyási listát az API-kulcs, a törzs
   és a fejlécek alapján.
2. A `guardrailRegistry.runPreCallHooks(body, ctx)` növekvő prioritási sorrendben futtatja a védelmi korlátokat:
   - A letiltott védelmi korlátok `skipped` állapotúként lesznek rögzítve.
   - Az egyes védelmi korlátok `preCall` metódusa a hasznos adatokat a `modifiedPayload` segítségével átírhatja.
   - Az első `block: true` megszakítja a láncot, és a kezelő védelmikorlát-elutasítási választ ad vissza.
3. A (potenciálisan átírt) hasznos adat a kombinált útválasztásba, majd a felfelé irányuló továbbításba kerül.
4. **Csak nem streamelt esetben:** a válasz összeállítása után a
   `guardrailRegistry.runPostCallHooks(...)` ugyanazt a láncot futtatja a válaszon. Az itt kapott `block: true` eldobja a felfelé irányuló választ, és HTTP 400-as választ ad vissza. A streamelt válaszok ezt a lépést teljesen kihagyják.
5. **Csak a visszafordítható tároló esetén:** amikor a kérés tokeneket hozott létre, a `handleChat`
   visszaállítja ezeket az általa visszaadott 2xx-es válaszban, a hívás utáni hookok és a streamelt PII-átalakítás után, így a `PII_RESPONSE_SANITIZATION` tokeneket és a modell által generált PII-adatokat látja, a visszaállított eredetit soha.

A hibát kiváltó védelmi korlátok `error: <message>` értékkel lesznek rögzítve, és a rendszer a
`logger.warn` segítségével naplózza őket, a lánc azonban folytatódik — ez szándékosan hibanyitó működés.

## Lefedettség és korlátok

A védőkorlát-regisztráció csak a chat-folyamatba van bekötve. Ezeket a korlátokat a
`tests/unit/guardrail-pipeline-wiring-characterization.test.ts` és a
`tests/unit/guardrail-pipeline-characterization.test.ts` rögzíti; a viselkedés
megváltozásakor ezeket a teszteket szándékosan frissíteni kell.

### Hol futnak a hookok

| Hook / vezérlő                      | Ezen fut                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | A `handleChat` által kezelt kéréseken (`src/sse/handlers/chat.ts`): `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (és `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, valamint a Telegram chat-proxy esetében. Továbbá a dashboard tesztvégpontján: `/api/guardrails/test`. A pre-call blokkolás HTTP 400 választ ad. |
| `runPostCallHooks`                  | Csak **nem streamelt** chatválaszokon (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). A streamelt válaszok soha nem jutnak el hozzá.                                                                                                                                                                                                                                                                                                             |
| Streamelt PII                       | A `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), amelyet a `streamingPipeline.ts` használ a streambe kapcsolva, amikor a `PII_RESPONSE_SANITIZATION` be van kapcsolva. Ez nem védőkorlát, ezért a letiltási csatornák nem befolyásolják.                                                                                                                                                                                                  |
| Visszafordítható PII-tároló         | Csak a `handleChat` által kezelt kéréseken, amikor a `PII_REDACTION_ENABLED` és a `PII_REVERSIBLE_VAULT_ENABLED` be van kapcsolva. A tokeneket a `pii-masker` pre-call hozza létre, és a `handleChat` kilépésekor állítja vissza (`src/lib/pii/requestTokenVaultScope.ts`). A `pii-masker` letiltása egy kérésnél azt jelenti, hogy semmi nem kerül létrehozásra.                                                                                        |
| Injection-guard middleware (legacy) | Minden promptot tartalmazó `/v1` útvonalon, a chat-családot is beleértve (lásd: [útvonal-lefedettség](#injection-guard-route-coverage--red-team-phase-8--block-d)). Csak promptinjekció esetén.                                                                                                                                                                                                                                                          |

### Mire nem terjed ki

- **Média-, embedding- és adatutak** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) soha nem érik el a
  regisztrációt. Ezeken nem fut PII-maszkolás, hitelesítőadat-maszkolás vagy
  modalitás-bridge. Az egyetlen ellenőrzésük a legacy injection-guard
  middleware.
- **A streamelt válaszok** nem kapnak post-call védőkorlátokat: nincs
  `pii-masker` vagy `credential-masker` post-call, és nincs post-call
  blokkolás sem. Csak a streamelt PII-átalakítás lép működésbe (amikor a
  `PII_RESPONSE_SANITIZATION` be van kapcsolva). A streamelt válaszban
  visszaadott hitelesítőadat nem lesz maszkolva.
- **A letiltási csatornák és a middleware viszonya (szándékos kialakítás):** a
  middleware saját `evaluatePromptInjection()` hívásával értékeli ki a
  promptinjekciót, és nem ad át semmilyen, a hívó által vezérelt letiltási
  listát. A `block` mód kötelező érvényű határ, amelyet a hívó által vezérelt
  letiltások nem tudnak megkerülni, beleértve a chat-család útvonalait is
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). A
  `prompt-injection` letiltása csak a regisztrációs védőkorlátot hagyja ki.

### Mit lát egy válasz a post-call előtt

A nem streamelt útvonal sorrendje: memória-kinyerés → beépített eszközök
végrehajtása → post-call védőkorlátok → post-call blokkolási kilépés →
szemantikusgyorsítótár-tárolás.

- **A memória-kinyerés** és az **eszközvégrehajtás** a választ még azelőtt
  látja, hogy a post-call védőkorlátok átírhatnák vagy blokkolhatnák. A
  [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) óta a
  memória-kinyerés a kinyert szöveget a `sanitizePII` függvényen futtatja át,
  amikor a `PII_RESPONSE_SANITIZATION` be van kapcsolva (streamelt és nem
  streamelt esetben egyaránt), egy olyan választ azonban, amelyet a post-call
  később blokkol, a memória és az eszközök már megkaptak.
- **A szemantikus gyorsítótár** a post-call után tárolja a választ, így az
  átírt választ tárolja, a blokkolt válasz pedig soha nem kerül gyorsítótárba.
  A gyorsítótár-bejegyzések API-kulcsonként vannak elkülönítve.

## Konfiguráció

A beépített védelmi korlátok által beolvasott környezeti változók:

| Változó                               | Használja                  | Hatás                                                                                                                       |
| ------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`         | Állítsa `false` értékre az észlelés teljes letiltásához.                                                                    |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`         | Injektálási szabályzat: `warn`, `block` vagy `log`. A korábbi `redact` érték nem írja át az injektálási szöveget.           |
| `INJECTION_GUARD_MODE`                | `prompt-injection`         | Az injektálási védelem módja; egyben adatbázis-funkciókapcsoló is, amely **felülírja** a környezeti változókat (DB > ENV).  |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`         | A minimális súlyosság, amelyet a `MODE=block` elutasít: `high` (alapértelmezett), `medium` vagy `low`.                      |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`         | A `INPUT_SANITIZER_BLOCK_THRESHOLD` korábbi aliasa.                                                                         |
| `PII_REDACTION_ENABLED`               | `pii-masker`               | `true` esetén a kérés PII-adatai maszkolva lesznek (az injektálási módtól függetlenül).                                     |
| `PII_REVERSIBLE_VAULT_ENABLED`        | `pii-masker`, `handleChat` | A `PII_REDACTION_ENABLED` beállítással együtt visszaállítható tokeneket hoz létre, és visszaállítja őket a 2xx válaszokban. |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream)  | A válaszoldali maszkoló működését szabályozza.                                                                              |

A Modality Bridge védelmi korlátai a futásidejű konfigurációt az adatbázis-alapú beállítástárolóból (`getSettings()`), nem pedig a környezeti változókból olvassák be. A Vision elsődleges kulcsai a következők:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` és
`modalityBridgeCacheMaxEntries`. A korábbi
`visionBridge*` kulcsokat csak a dokumentált, egy ciklusra szóló olvasási tartalékmechanizmus fogadja el; az irányítópult írásai az elsődleges kulcsokat használják. Az alapértelmezések és a tartalékfeloldó a következő helyen találhatók: `src/shared/constants/modalityBridgeDefaults.ts`; a korábbi konstansok a `src/shared/constants/visionBridgeDefaults.ts` fájlban maradtak meg.

Az Audio a `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` és `modalityBridgeAudioMaxClips` beállításokat, valamint a megosztott
`modalityBridgeCache*` beállításokat használja. Az Audio nem rendelkezik korábbi kulcsokra vonatkozó tartalékmechanizmussal, mert ezeket a kulcsokat a Modality Bridge sémájával együtt vezették be.

A Video a `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` és
`modalityBridgeVideoTimeout` beállításokat, valamint a megosztott `modalityBridgeCache*` beállításokat használja.
Alapértelmezés szerint le van tiltva, mert az FFmpeg/ffprobe opcionális üzemeltetési függőségek, a képkockák feliratozása pedig késleltetést és modellköltséget ad hozzá.

## Egyéni guardrail-ek

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

Lépések:

1. Hozza létre a `src/lib/guardrails/myGuardrail.ts` fájlt, amely kiterjeszti a `BaseGuardrail` osztályt.
2. Implementálja a `preCall` és/vagy `postCall` metódust.
3. Vagy importáláskor regisztrálja (a `registerDefaultGuardrails` függvényből pusholva), vagy futásidőben hívja meg a `guardrailRegistry.register(...)` metódust — a registry lecserél minden korábbi, azonos normalizált nevű guardrail-t.
4. Adjon hozzá teszteket a `tests/unit/` alatt (meglévő példák:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Tesztelés

Használja a `resetGuardrailsForTests()` függvényt a tesztek között, hogy ismert állapotból induljon. Adja át a `{ registerDefaults: false }` értéket, hogy üres registry-vel induljon, és csak a tesztelt guardrail-eket regisztrálja. A Vision Bridge támogatja a dependency injectiont (`deps.getSettings`, `deps.callVisionModel`); az Audio Bridge ugyanilyen csatlakozási pontokat kínál a beállításokhoz, a képességekhez, az STT-modellválasztáshoz, a hitelesítőadat-ellenőrzésekhez és az átíráshoz. A tesztek így adatbázis- vagy hálózati hozzáférés nélkül is mindkét folyamatot tudják gyakorolni.

## Lásd még

- `src/lib/guardrails/` — implementáció
- `src/shared/utils/inputSanitizer.ts` — megosztott detektor, amely a prompt-injekció-észlelést és a PII-maszkolást működteti
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge alapértelmezések és a kényszerített bridge-modelllista
- `src/shared/constants/modalityBridgeDefaults.ts` — megosztott Vision/Audio futásidő-alapértelmezések
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonális réteg (áramkör-megszakító, cooldown-ok)
- `docs/reference/ENVIRONMENT.md` — teljes környezetiváltozó-referencia

## Injection-guard útvonal-lefedettség és red-team (8. fázis · D blokk)

Az injection-guard (`createInjectionGuard` / `withInjectionGuard`) lefedi az összes olyan útvonalat, amely felhasználói promptokat fogad. Figyelembe veszi az `INJECTION_GUARD_MODE` beállítást (alapértelmezett `warn` = csak naplóz; `block` = HTTP 400 `SECURITY_001` hibát ad vissza).

| Típus            | Útvonalak                                                                                                                                            | Alapértelmezett mód |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Szöveg (meglévő) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                |
| Generatív        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                |
| Adat             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                |

A szövegkinyerés (`extractMessageContents`) lefedi a `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` mezőket.

**Red-team (éjszakai, `nightly-llm-security.yml`):** a promptfoo ellenőrzi, hogy minden útvonal blokkolja az OWASP-LLM korpuszt `INJECTION_GUARD_MODE=block` módban; a garak probe-okat futtat (secret nélkül kihagyja őket). A `moderations` a konzisztencia kedvéért szerepel. A block mód kötelező határ: az `evaluatePromptInjection()` figyelmen kívül hagyja a middleware által átadott kérésenkénti letiltási listát, így a `disabledGuardrails` **nem** mentesít egy útvonalat alóla ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)).

Az éjszakai workflow-nak (`.github/workflows/nightly-llm-security.yml`, cron + manuális indítás) két jobja van:

- **`promptfoo-guard` (blokkoló)** — a `promptfoo eval -c promptfooconfig.yaml` parancsot futtatja `INJECTION_GUARD_MODE=block` beállítással. Minden támadó eset (pl. „hagyd figyelmen kívül az összes korábbi utasítást…", DAN-stílusú jailbreak-ek) azt állítja, hogy a válasz `error.code === "SECURITY_001"` értéket hordoz, azaz a guard valóban elutasította a kérést.
- **`garak` (tanácsadó)** — a garak `--probes promptinject,dan,leakreplay` parancsot futtatja egy helyi OmniRoute-példány ellen (`http://localhost:20128/v1`). Egy provider-secret meglétéhez kötött (`PROMPTFOO_PROVIDER_KEY`); hiányában szabályosan kihagyja magát, és `|| true` utótaggal rendelkezik, így a CI meghiúsítása nélkül jelent.

A guard-segédfüggvény (`createInjectionGuard` / `withInjectionGuard`) lefedettsége minden promptot hordozó `/v1` útvonalra kiterjed; a prompt szövegét az `extractMessageContents()` nyeri ki a `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` mezőkből a `src/shared/utils/inputSanitizer.ts` fájlban.
