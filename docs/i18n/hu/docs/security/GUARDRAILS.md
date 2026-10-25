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

## Beépített guardrailek

Importáláskor a registry prioritási sorrendben automatikusan betölt hat guardrailt
(lásd: `registry.ts` → `registerDefaultGuardrails()`):

| Prioritás | Név                 | Szakasz(ok)    | Fájl                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Az alacsonyabb prioritási számok futnak le **először**.

### Vision Bridge (`visionBridge.ts`) — Modalitáshíd PR-1

A GLM 5.3 alapmodell és a `glm-5.3-{low,high,max}` explicit
`supportsVision:false` registry-/specifikációs metaadatokkal rendelkezik. A GLM 5.3 Flash
változatok továbbra is natív képfeldolgozási képességű modellek. A Claude Code
`/v1/messages` útvonala a Claude-formátum OpenAI-formátumra történő átalakítása
**előtt** lép be a megosztott `handleChat` pre-call guardrailláncba; az egymásba ágyazott
`Read` eszközeredményekben lévő képeket még azelőtt le kell írni vagy kezelni kell,
hogy ez az átalakítás OpenAI `image_url` tartalommá emelné őket (#17069).

Elfogja a **képfeldolgozást nem támogató modelleknek** szánt, képeket tartalmazó
kéréseket, majd vagy egy képfeldolgozásra képes modellhez irányítja át a teljes kérést,
vagy az upstream hívás előtt a képrészeket egy konfigurálható képfeldolgozó modell által
készített szöveges leírásokra cseréli. Ez lehetővé teszi, hogy a csak szöveget támogató
szolgáltatók transzparens módon kezeljék a multimodális hasznos adatokat.

Folyamat:

1. Kihagyás, ha a célmodell már támogatja a képfeldolgozást (kivéve, ha szerepel a
   kényszerített áthidalási listában: `isVisionBridgeForcedModel`).
2. A képrészek kinyerése az `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`) segítségével, amely az
   `open-sse/utils/mediaParts.ts` fájlban található **egységes médiaérzékelőnek**,
   a `detectMediaParts()` függvénynek delegálja a feladatot — ez a kombinációs
   kompatibilitási szűrővel megosztott egyetlen hiteles forrás.
   A kinyerés azon alakzatok engedélyezési listájára korlátozódik, amelyeket a
   `replaceImageParts` vissza tud illeszteni (a kinyerés↔csere szerződés):
   OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` és Responses API `input_image`. A Claude Code
   `tool_result.content` elemeiben és a Responses eszközkimeneteiben egymásba
   ágyazott egyező képeket is kinyeri és lecseréli az eredeti elérési útjukon;
   a csak jelzőként szolgáló alakzatok a kombinációs szűrőhöz tartoznak, ezért
   nem kerülnek kinyerésre.
   Kihagyás, ha nem található kép.
3. A futásidejű konfiguráció feloldása a `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) segítségével: az új
   `modalityBridge*` beállításkulcsok élveznek elsőbbséget; a régi
   `visionBridge*` kulcsok **egy cikluson át tartalékmegoldásként** maradnak
   elérhetők (visszaállítási időablak). Ha a híd le van tiltva, a rendszer még
   a média bejárása előtt kihagyja a feldolgozást.
4. A módválasztó (`modalityBridgeVisionMode`, lásd az alábbi táblázatot) dönt
   az átirányítás és a leírás között. Az átirányítás olyan `modifiedPayload`
   értéket ad vissza, amelyben csak a `model` van lecserélve, valamint a következő
   metaadatokat: `{ rerouted, fromModel, toModel, imagesKept }`.
5. Leírási útvonal: a képek számának korlátozása `maxImages` értékre, a
   feladattudatos prompt összeállítása, a leírási gyorsítótár ellenőrzése, a
   képfeldolgozó modell **párhuzamos** meghívása (`Promise.allSettled`), majd
   `[Image N]: <description>` szövegrészek beillesztése a képek helyére.
   A sikertelen leírás `null` értéket eredményez: ismeretlen vagy képfeldolgozásra
   képes célok esetén a nyers kép megmarad (#4012), azonban egy **igazoltan csak
   szöveget támogató közvetlen cél** vagy képfeldolgozási képesség nélküli
   kombináció minden le nem írt képhez explicit
   `(unavailable — no vision-capable provider connected)` szöveges helyőrzőt kap,
   beleértve a részleges hibákat és a leírási hívások korlátján túli képeket is
   (#17069). A meglévő, minden leírás sikertelensége esetén használt kombinációs
   tartalékmegoldás változatlanul megmarad (#8430).
6. A `modifiedPayload` és a metaadatok (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) visszaadása.

#### Módválasztó (`modalityBridgeVisionMode`)

| Mód        | Alapértelmezett | Viselkedés                                                                                                                                                                                                                                                                                                                              |
| ---------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔               | Régi heurisztika, érintetlenül hagyva (#6640/#7204): a nem kombó/`auto/` modelleket a rendszer a legjobb vision modellre irányítja át, kivéve ha az eredeti modell már rendelkezik használható hitelesítő adatokkal (ekkor describe történik); a kombó célok esetén mindig describe történik.                                           |
| `describe` |                 | Mindig describe — az átirányítási blokk teljes egészében kimarad; mindig a felhasználó által választott modell válaszol.                                                                                                                                                                                                                |
| `reroute`  |                 | Kényszerített átirányítás: a hitelesítő adatokkal rendelkező modellt megtartó védelem megkerülésre kerül. Az átirányítási **cél** hitelesítőadat-védelme továbbra is érvényes — ha nincs használható vision cél, a bridge egyértelmű hibával blokkol, ahelyett hogy describe-olna, vagy nyers képeket küldene egy csak szöveges célnak. |

A kényszerített módok **már azelőtt** rövidre zárják a folyamatot, hogy az
auto heurisztika lefutna; az `auto` viselkedése bájtra azonos a PR-1 előtti
guardraillal.

#### API-kulcs-hatókör (`visionBridgeKeyScope.ts`)

Amikor a hívó API-kulcsa korlátozza az `allowedConnections`, a kvótakészletek
(`allowedQuotas`) vagy a modellek (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`) körét, a bridge
csak olyan átirányítási és describe modelleket választ, amelyeket a kulcs
használhat, és csak olyan kapcsolatokon, amelyeket a kulcs használhat. A
describe hívás ezután mindig az OmniRoute self-loopon keresztül fut, az
`x-omniroute-self-loop-key-id` fejléccel, így a fogadó chat kérés ismét
érvényesíti az adott kulcs kapcsolat- és modellszabályzatát. Az
`enforceApiKeyPolicy()` ezt a fejlécet csak a self-loop bearerrel együtt veszi
figyelembe, így az kizárólag szűkítheti a hozzáférést, és a fel nem oldható
azonosító elutasításra kerül.

Ha a kulcs számára egyetlen vision modell sem engedélyezett, egy
**megerősítetten csak szöveges cél** helyben, egyértelmű HTTP 400-as hibával
utasítja el a képkérést, ahelyett hogy a képbájtokat egy erre képtelen
upstreamnek továbbítaná (#17069). Ismeretlen vagy natív vision képességű
célok esetén a describe útvonal megtartja korábbi fail-open viselkedését
(meta `{ skipped: true, reason: "no_permitted_vision_model" }`). A kulcs
nélküli kérések, valamint az ilyen korlátozásokkal nem rendelkező kulcsok
pontosan úgy viselkednek, mint korábban.

#### Feladattudatos describe prompt (`modalityBridgeVisionTaskAware`)

Alapértelmezés: **true**. A `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
az **utolsó felhasználói üzenet** szövegét (500 karakterre csonkolva)
hozzáfűzi az alap describe prompthoz, így a leírást arra tereli, amit a
felhasználó valójában kérdezett (codex-vision-proxy minta), és arra kéri a
vision modellt, hogy írja át a látható szöveget. Kikapcsolt flag mellett —
vagy felhasználói szöveg hiányában — az alap prompt változatlanul kerül
felhasználásra.

A describe self-loop saját OpenAI-kompatibilis kérése (`callVisionModelSingle()`
a `visionBridgeHelpers.ts`-ben) mindig `image_url.detail: "high"` értéket kér
— feltétel nélkül, minden hívó/szolgáltató esetén, és semmilyen kliensjelhez
nincs kötve. Az alacsony részletességű mintavételezés rontja az OCR
pontosságát pontosan arra a szövegátírási feladatra, amelyet ez a prompt kér,
ezért maga a describe hívás mindig magas részletességet kér, függetlenül
attól, hogy az eredeti bejövő kérés milyen részletességi szintet használt. Ez
kizárólag a belső describe kérés törzsét érinti; nem változtatja meg, hogy az
OmniRoute hogyan továbbítja a hívó saját `image_url.detail` értékét az
elsődleges kérésen — ez az alapértelmezés külön, és csak az észlelt OpenCode
klienseknél kerül alkalmazásra, a `defaultImageDetail()` függvényben
(`open-sse/handlers/chatCore/upstreamBody.ts`). A describe self-loop Anthropic
wire-format ágában nincs `detail` mező, így azt egyik alapértelmezés sem
érinti.

#### Describe kimeneti korlát (`modalityBridgeVisionMaxChars`)

| Kulcs                          | Alapértelmezett | Tartomány          |
| ------------------------------ | --------------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`             | `0` vagy 100–50000 |

A `0` (alapértelmezett) **korlát nélküliséget** jelent — a `callVisionModel()`
által visszaadott leírás módosítás nélkül továbbítódik, megőrizve a meglévő
viselkedést. A 100–50000 tartományba eső bármely érték `…` utótaggal csonkolja
a leírást, mielőtt az `[Image N]: <description>` formában visszaillesztésre
kerülne (`VisionBridgeGuardrail.preCall()` a
`src/lib/guardrails/visionBridge.ts`-ben). Növelje ezt az értéket
részletgazdag OCR-feladatoknál, ahol a downstream modellnek a teljes átírásra
van szüksége; csökkentse, ha korlátozni szeretné a bőbeszédű vision modellek
tokenhasználatát. A dashboard mező a Vision fül Advanced paneljén található
(`modality-bridge-max-chars` a `ModalityBridgeVisionTab.tsx`-ben), és az 1 és
99 közötti értékeket a 100-as alsó határra emeli, miközben az explicit `0`-t
érintetlenül hagyja — a `0` önálló jogon is érvényes Zod-érték
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nem csupán
a „nincs beállítva" alapértelmezés.

#### Describe gyorsítótár (`modalityBridge/bridgeCache.ts`)

Memóriabeli LRU + TTL gyorsítótár a describe kimenetekhez, az egész folyamatra
kiterjedően megosztva. Kulcs = `sha256(imageRef + composedPrompt +
configuredBridgeModel)`, hosszprefix-keretezéssel (nincsenek
mezőhatár-ütközések). A kulcs modellkomponense a **konfigurált** bridge modell,
nem pedig a ténylegesen válaszoló modell — a `callVisionModel` belsőleg
tartalékmodellre válthat, és a próbálkozásonkénti kulcsolás szétfragmentálná
a gyorsítótárat. A sikertelen describe-hívások sosem kerülnek gyorsítótárba.
Beállítások:

| Kulcs                           | Alapértelmezett | Tartomány |
| ------------------------------- | --------------- | --------- |
| `modalityBridgeCacheEnabled`    | `true`          | —         |
| `modalityBridgeCacheTtlMinutes` | `60`            | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`           | 10–5000   |

#### Távoli képek normalizálása (self-loop describe/base64-lekérés)

Amikor a bridge **távoli** képet kér le önállóan — az Anthropic describe
self-hívás és a claude-wire-formátumú base64-konverzió
(`ensureBase64ImagesForClaudeWire`) során, mindkettő a
`visionBridgeHelpers.ts`-ben található `fetchRemoteImageAsDataUri()` függvényen
keresztül —, az eredményül kapott data URI a vision-modell kérésébe való
beágyazás előtt áthalad a `normalizeDataUri()` függvényen
(`open-sse/utils/imageNormalize.ts`). A túl nagy képek **2048 képpontos hosszabb
oldalra** lesznek kicsinyítve (megegyezve az OpenAI/Anthropic által szerveroldalon
már alkalmazott átméretezési korláttal), ami csökkenti a feltöltött
bájtokat/késleltetést anélkül, hogy megváltoztatná, amit a vision-modell lát. Az
átméretezés a `sharp` csomagot használja, dinamikus importon keresztül betöltve:
olyan platformon, ahol a natív binárisa nem tölthető be, a `normalizeDataUri()`
**soha nem dob hibát** — az eredeti bájtok változatlan átengedésére áll vissza,
így a describe/base64-konverziós útvonal mindig működőképes marad. A nem képként
azonosítható bájtok (olyan lekérés, amely nem dekódolható képet adott vissza)
szintén érintetlenül kerülnek átengedésre. Ez a normalizálás kizárólag a bridge
saját self-hívásához lekért képekre vonatkozik — a hívó nyers passthrough
payloadjára sosem alkalmazódik, összhangban a kizárólag opt-in jellegű módosítás
elvével (Hard Rule #20).

#### Beállítási séma + migráció

Az új `modalityBridge*` kulcsok Zod-validációval rendelkeznek az
`updateSettingsSchema`-ban (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, a
`modalityBridgeCache*` hármas, valamint az Audio Bridge által használt
`modalityBridgeAudio*` csoport. A `141_modality_bridge_settings.sql` migráció a
meglévő régi `visionBridge*` értékeket átmásolja a megfelelő új kulcsokba
(idempotens, sosem ír felül egy operátor által beállított `modalityBridge*`
értéket); a régi kulcsok egy kiadási ciklusig olvasási tartalékként továbbra is
elfogadottak maradnak.

#### Átláthatósági fejléc + statisztikák

A describe által átalakított válaszok hordozzák az
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
fejlécet (amelyet a `modalityBridge/bridgeStats.ts`-ben található
`buildModalityBridgeHeader()` épít fel, és a
`src/sse/handlers/chatHelpers.ts`-ben található `withModalityBridgeHeader()`
bélyegez meg). Az átirányított kérések **nem** kapnak fejlécet — a payload
érintetlen maradt, és a modellcsere már látható a választörzs `model`
mezőjében.

A `GET /api/modality-bridge/stats` (felügyeleti hitelesítés, ugyanaz a szint,
mint a `GET /api/settings`) visszaadja a memóriában tárolt, modalitásonkénti
számlálókat: `{ attempts, successes, bridged, cacheHits, failures,
totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` a `vision`,
`audio` és `video` modalitásokra. Az `averageLatencyMs` a `latencySamples`
értéket használja nevezőként, nem az összes kísérletet; az időzítés nélküli
művelet nem hamisít nulla milliszekundumos mintát. A `bridged` a sikeres
konverziók visszafelé kompatibilis álneve marad; a sikertelen kísérletek nem
növelik. A számlálók a folyamat újraindulásakor tervezetten nullázódnak
(telemetria, nem könyvelés).

#### Vezérlőpult-konfiguráció

A dedikált vezérlőpult-oldal a `/dashboard/settings/modality-bridge`. Az URL-címen
keresztül megcímezhető `Vision`, `Audio` és `Video` fülei a `tab` érték
váltása közben megőrzik a lekérdezési paramétereket. A Vision fül a következőket
kínálja: engedélyezés, mód, modellválasztás (beleértve az automatikus
alapértelmezettet), feladattudatos promptolás, speciális
időtúllépés-/kép-/leíráshossz-/gyorsítótár-korlátok, futásidejű számlálók, valamint
egy védett mintakérés. Az Audio fül szintén élő: engedélyezést, egy Auto
opciót is tartalmazó, kizárólag STT-modelleket kínáló választót,
időtúllépés-/maximális-klip-korlátokat, audio-számlálókat és egy `input_audio`
mintatesztet kínál. A Video fül működőképes: jelzi az FFmpeg/ffprobe futásidejű
állapotát — a négy explicit UI-állapot egyikét (`unknown`, amíg a vizsgálat
folyamatban van vagy nem fejeződhetett be, `restricted` nem loopback
vezérlőpult-hoszt esetén, ahol a vizsgálat kliensoldalon kihagyásra kerül,
`unavailable`, ha a vizsgálat megtörtént és a hiány megerősítést nyert, vagy
`available` az FFmpeg/ffprobe-verziókkal együtt) —, megőrzi az
engedélyezési/modell-/képkocka-/videó-/időtúllépési korlátokat, a
modellválasztót vision-képes modellekre szűri, és video-számlálókat jelenít meg.

A korábbi Vision Bridge kártya az AI-beállítások alatt egy kompatibilitási
hivatkozás az új oldalra; már nem birtokolja az űrlap második példányát. A Media
Providers szintén összekapcsolja az Image-to-Text és Speech-to-Text
munkafolyamatokat a megfelelő Modality Bridge fülekkel anélkül, hogy eltávolítaná
a meglévő Speech-to-Text játékteret (playground).

**Self-loop felvételi megkerülés (admission bypass):** amikor a describe hívás az
OmniRoute saját `/v1` self-loopján keresztül irányítódik (nem szabványos
providermodell), az alkérés `x-omniroute-admission-bypass: internal` fejlécet
küld, és a feloldott self-loop hitelesítő adattal hitelesít — helyi módban a helyi
`sk_omniroute` sentinel értékkel, vagy az operátor által konfigurált
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` környezeti kulccsal (#1350), így a
`REQUIRE_API_KEY=true` üzemelések is futtathatják a describe hívást. A
megkerülés kizárólag ezekre a pontos hitelesítő adatokra érvényes, így külső
kliensek nem használhatják a fejlécet a felvétel kihagyására.

A régi alapértelmezések a `src/shared/constants/visionBridgeDefaults.ts`-ben
találhatók; az új mód-/feladattudatos-/gyorsítótár-alapértelmezések és a
beállítás-feloldó a `src/shared/constants/modalityBridgeDefaults.ts`-ben él. A
guardrail egy `deps` konstruktor-opciót tesz elérhetővé, hogy a tesztek hamis
`getSettings` és `callVisionModel` implementációkat injektálhassanak.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Elfogja a hangot tartalmazó chat-kéréseket, mielőtt azok olyan célhoz érnének,
amelyről nem ismert, hogy hangbemenetet fogad. Soha nem irányítja át a
chat-kérést: a hangrészek a meglévő OpenAI-kompatibilis multipart végponton
keresztül kerülnek átírásra, és a kiválasztott chat-modell szöveges
átiratokkal folytatja.

Folyamat:

1. A `supportsAudio` feloldása a `getResolvedModelCapabilities()` függvényen keresztül történik. Az explicit szolgáltatói regiszterből (provider registry) származó metaadatok élveznek elsőbbséget, ezt követik a statikus modell-metaadatok, majd a szinkronizált `modalities_input`. Egy deklarált bemeneti lista, amely nem tartalmazza az `audio` értéket, `false` eredményt ad; képességbizonyíték hiányában az érték `null` marad. Mind a `false`, mind a `null` aktiválja a konzervatív bridge-et, míg a `true` megkerüli azt.
2. A rendszer feloldja a `modalityBridgeAudio*` beállításokat, és a közös `detectMediaParts()` detektoron keresztül kinyeri a kivágható legfelső szintű hangrészeket minden üzenetből. A támogatott adatátviteli formák az OpenAI `input_audio`, az `audio_url` és a `source.media_type: "audio/*"`. A beágyazott hangot a rendszer észleli az útválasztáshoz, de a kivágási (splice) útvonal nem távolítja el. A munkát a `modalityBridgeAudioMaxClips` korlátozza; a későbbi részek érintetlenül maradnak.
3. A rendszer figyelembe veszi a konfigurált `provider/model` értéket, vagy a `selectAudioBridgeModel()` stabil katalógussorrendben végigmegy az `AUDIO_TRANSCRIPTION_PROVIDERS` listán, és kiválasztja az első modellt, amely használható, aktív szolgáltatói hitelesítő adattal rendelkezik.
4. A `callAudioTranscription()` a base64/data-URI hangot multipart `file` formátumra alakítja, vagy letölti a távoli `audio_url` tartalmat a kizárólag nyilvános kimenő forgalmat engedő védelmi rétegen (outbound guard) keresztül, DNS-pinninggel és 25 MB-os korláttal. Ezután a fájlt és a kiválasztott modellt a helyi `/v1/audio/transcriptions` önhurokra (self-loop) POST-olja, a `resolveSelfLoopBearer()` által biztosított hitelesítéssel. A meglévő transzkripciós útvonal a szokásos hitelesítőadat-keresést, a cooldown/rate-limit kezelést és a szolgáltatói továbbítást végzi.
5. A sikeres hívások a megfelelő részeket `[Audio N]: <transcript>` formátumúra cserélik. A hívások `Promise.allSettled` segítségével futnak: egy egyedi hiba megőrzi az adott eredeti hangrészt (#4012 szerződés). Ha minden hívás sikertelen, és a célról bizonyítottan `supportsAudio === false`, a részek `[Audio N]: (unavailable — no STT provider connected)` értékűvé válnak (#8430 szerződés). Ismeretlen cél (`null`) esetén a teljesen sikertelen eredmény érintetlen marad. Egy bizonyítottan csak szöveges cél, amelyhez nem áll rendelkezésre használható STT-hitelesítő adat, ugyanazt az explicit stubot kapja, hálózati hívás indítása nélkül.

A sikeres transzkripciók a folyamatszintű Modality Bridge LRU/TTL-gyorsítótárat használják. A kulcs a hanghivatkozást, a stabil `audio-transcription` műveleti címkét és a kiválasztott STT-modellt kombinálja; a hibákat a rendszer soha nem gyorsítótárazza. A hangkísérletek frissítik a közös `bridged`, `cacheHits`, `failures` és `lastUsedAt` számlálókat. Az átalakított válaszok `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` fejlécet hordoznak; az érintetlen kérések nem kapnak Audio Bridge-szegmenst.

A futásidejű beállítások adatbázisban tárolódnak, és Zod-validáláson esnek át:

| Kulcs                         | Alapértelmezett | Tartomány                      |
| ----------------------------- | --------------- | ------------------------------ |
| `modalityBridgeAudioEnabled`  | `true`          | —                              |
| `modalityBridgeAudioModel`    | `""`            | Automatikus vagy STT-azonosító |
| `modalityBridgeAudioTimeout`  | `60000`         | 1000–300000                    |
| `modalityBridgeAudioMaxClips` | `3`             | 1–10                           |

A közös gyorsítótárat továbbra is a `modalityBridgeCacheEnabled`, a `modalityBridgeCacheTtlMinutes` és a `modalityBridgeCacheMaxEntries` vezérli.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

A bridge elfogja a legfelső szintű videórészeket a Chat Completions `messages` és a Responses API `input` mezőiben, mielőtt meghívna egy olyan célt, amelynek nem ismert natív videótámogatása. A támogatott formák: `input_video`, `video_url`, `video_source`, HTTPS URL-ek és `data:video/*;base64,...` adat-URI-k. A szövegben szereplő egyszerű fájlneveket a rendszer nem kezeli videóként.

A `VideoBridgeGuardrail.preCall` (`videoBridge.ts`) felel a kérés bejárásáért, a képesség-/házirend-ellenőrzésért, a kérésenkénti aggregálásért és a válasz hasznos terhéért. A videónkénti munka – a beszerzés, a teljes eredmény gyorsítótára, a képkockasorozat leírása (amely egyesíti a hívó által deklarált hangtranszkripciót), valamint a kísérletenkénti metrikák/megszakítás/takarítás – a `videoBridgePipeline.ts` modulban található `processVideoPart` mögé van rejtve, amely a `preCall` ciklusán belül videórészenként egyszer hívódik. Ez a modul definiálja továbbá az explicit port-határokat is: `VideoMediaBrokerPort` (a bájtok beszerzése és a mintavételezett képkockák kinyerése), `VideoAudioTranscriptionPort` (a hívó által deklarált hangtranszkripció egyesítése a mintavételezett feliratokkal) és `VideoDrilldownPort` (a képkocka-drill-down perzisztencia-határ; még nincs bekötve a `processVideoPart` függvénybe – jelenleg csak a különálló `/api/modality-bridge/video/drilldown` útvonal ír drill-down-bejegyzéseket).

A nyilvános `/v1` kérésútvonal soha nem importál vagy indít alprocesszust. A távoli videók 50 MiB-os korlát alatt tölthetők le; az inline base64-videókra konzervatív, videónkénti 36 MiB-os dekódolt korlát vonatkozik, hogy a modell/üzenetek/keretezés borítéka a nyilvános JSON-kérések 50 MiB-os befogadási korlátján belül maradhasson. Az inline hossz és a dekódolt méret becslését a rendszer a lefoglalás előtt ellenőrzi. A kezdeti távoli URL-re és minden átirányításra HTTPS kötelező, a meglévő, kizárólag nyilvános kimenő forgalmat engedő védelmi réteg (outbound guard) és DNS-pinning használatával. A bájtok ezután áthaladnak a pontos belső `POST /api/modality-bridge/video/extract` közvetítői (broker) határon. Ez az útvonal egyszerre `LOCAL_ONLY` és `SPAWN_CAPABLE`, kizárólag folyamatszinten hitelesített, megbízható loopback-kérést fogad el, és soha nem fogad URL-t, fájlrendszerbeli útvonalat, végrehajtható fájlt vagy argumentumlistát. Az API törzsméret-feldolgozási lánca és a kezelő inkrementális törzsolvasója egymástól függetlenül is kikényszeríti az 50 MiB-os közvetítői bemeneti korlátot. A korlátozott sora egyszerre egy kinyerést futtat, négy függőben lévő feladatot engedélyez, és a függőben lévő bemenetet 100 MiB-ban korlátozza.

A brokeren belül az `ffprobe` egy privát helyi fájlt olvas be; a rögzített
formátum-engedélyezőlista kizárja a lejátszási-lista- és manifest-formátumokat.
Az engedélyezett MOV-családba tartozó konténereknél a külső MOV
adathivatkozások alapértelmezetten le vannak tiltva, és a rögzített parancs sem
kapcsolja be őket. Az `ffprobe` és az `ffmpeg` egyaránt a csak `file`
protokollt engedélyező listát használja, egy szállal, rögzített
argumentumtömbökkel, shell nélkül, a futtatható állományokat pedig a `PATH`
környezeti változóból oldja fel. A csatolt képként tárolt borítófolyamok nem
minősülnek lejátszható jelölteknek. Minden lejátszható folyamnak meg kell
felelnie a korlátoknak, és a determinisztikus, legalacsonyabb indexű tartalék
előtt előnyt élvez egy kifejezetten megadott alapértelmezett folyam. A
videók legfeljebb 600 másodpercesek, dimenziónként 8 192 képpontosak, és
legfeljebb 33 554 432 forrásképpontosak lehetnek. Az FFmpeg 1–16 középponti
JPEG képkockát mintavételez, a hosszabb oldalt legfeljebb 1 024 képpontra
kicsinyíti anélkül, hogy a kisebb bemeneteket felnagyítaná, és soha nem kap
URL-t. A mintavétel alapértelmezetten `uniform`. Az opcionális `scene_aware` és
a kísérleti `segment_aware` házirendek egy további, rögzített FFmpeg-menetet
hajtanak végre a már validált helyi folyamon, korlátozott számú `showinfo`
jelenet-időbélyeget választanak ki, és detektorhiba, időtúllépés, hibás
kimenet vagy üres jelölthalmaz esetén determinisztikusan ugyanarra az uniform
középpont-mintavételre esnek vissza. A szegmensérzékeny mód a középponti
mintákat a validált jelenet-intervallumokkal arányosan osztja el; a
szegmensérzékeny bizonyítékokat és a visszaesési viselkedést az alábbiakban
részletezzük. A szigorú 16 képkockás felső korlát
minden házirendnél a kiválasztás után lép érvénybe. Ha egy jelenetérzékeny
kéréshez csak egy képkockás keret tartozik, az aktív teljes videós vagy
fókuszablak uniform középpontját használja, és `policyEffective: uniform`
értéket jelent: egyetlen kiválasztott jelenetképkocka nem őrizheti meg
egyaránt a két időbeli véget. A hívó opcionálisan megadhat egy véges
fókuszablakot (`start`/`end` másodpercben); a határok a média időtartamára
vannak szorítva, a fordított vagy nem véges ablakok elutasításra kerülnek, és
minden mintavételi házirend kizárólag a normalizált intervallumon belül fut.
Az eredményül kapott ablak bekerül a mintavételi metaadatokba és a nem
megbízható leírás előtagjába is, így a downstream modellek meg tudják
különböztetni a fókuszált kivonatot a teljes idővonaltól.

A szemantikus képaláírás-fókusz egy külön, explicit beállítás. Az
alapértelmezett `full` elemzési mód megtartja a meglévő képkocka-prompot, és
soha nem továbbít kérésbeli szöveget a képaláírás-modellnek. `focused`
módban a bridge kizárólag a legutóbbi nem üres, felhasználó által szerkesztett
`text`/`input_text` mezőt olvassa ugyanabból a Chat- vagy
Responses-tárolóból, NFC-re normalizálja, összevonja a vezérlőkaraktereket és
a whitespace-eket, valamint 500 Unicode kódpontra korlátozza. Üres eredmény
esetén a pontos `full` promptra esik vissza. A használható tipp JSON formában,
egy dedikált nem megbízható felhasználói kontextus blokkban kerül
szerializálásra, és kizárólag megfigyelhető részletek prioritizálására
szolgálhat; nem írhatja felül azt a külön figyelmeztetést, amely a médiában
látható vagy hallható utasítások követése ellen szól. A szöveges fókusz soha
nem következtet `start`/`end` értékekre, és nem módosítja az időbeli
mintavevőt.

#### FU-07 strukturális szegmensbizonyíték

A `segment_aware` egy korlátozott előelemzési menetet használ a már validált
helyi videofolyamon. A rögzített szűrőlánc először legfeljebb 320 képpont
szélességre skáláz, detektálja a jelenetváltásokat és a befagyott
intervallumokat, majd másodpercenként 1 képkockát mintavételez az elmosódás,
az átlagos luma, valamint a térbeli/időbeli információ mérésére. A menet
legfeljebb 600 strukturális mintára korlátozódik, egy FFmpeg/szűrő szálat
használ, ugyanazt a csak `file` protokollt engedélyező protokoll- és
konténer-engedélyezőlistát, 1 MiB-os folyamatkimenet-korlátot, és legfeljebb
30 másodpercet a broker közös megszakítási/határidő-keretein belül. Soha nem
fogad el parancsot, szűrőt, elérési utat vagy URL-t a kérésből.

A strukturális értékek determinisztikus mintavételi bizonyítékok, nem
szemantikus videómegértés. Nem következtetnek alanyokra, cselekvésekre,
képaláírásokra, beszédre vagy felhasználói szándékra. A jelenet- és
befagyáshatárok szegmenseket alkotnak; a befagyás lefedettsége, az elmosódás,
az expozíció, a térbeli részletesség és az időbeli változás kizárólag a
meglévő 1–16 képkockás keret elosztását befolyásolja. Egy teljesen befagyott
szegmens legfeljebb egy képkockát kaphat, míg a nem befagyott szegmensek
versenyeznek a fennmaradó keretért. Ha több a határ, mint a képkocka, az
egyenletes idővonal-lefedettség megmarad, így a gyors korai vágások nem
rejthetik el a hosszú záró szegmenst. A befagyási határtól az 1 másodperces
elemzési felbontáson belül eső jelenethatárok összevonásra kerülnek.

Hiányzó szűrők, hibás/üres bizonyíték, detektorhiba vagy a korlátozott
előelemzési időtúllépés fail-open módon a pontos uniform
középpont-házirendre esik vissza. A hívói megszakítás vagy a broker
határideje nem fail-open: leállítja a futó alfolyamatot, megakadályozza a
későbbi képkocka-kinyerést, és a privát ideiglenes könyvtárfa a `finally`
blokkban törlődik.

A `scripts/perf/video-bridge-fu07-eval.ts` determinisztikus, valódi
FFmpeg-alapú fixture-öket generál a deduplikálás utáni képaláírás-hívási
megtakarításokhoz, a sűrű mozgású költségkeret-elosztáshoz, az
elmosódás/expozíció/SI-TI bizonyítékokhoz, a hosszú farokkal rendelkező gyors
vágásokhoz és a fokozatos átúsztatás hamis pozitívumaihoz. Rögzíti az
előelemzés eltelt (wall time) idejét, és ahol a `/usr/bin/time` elérhető, a
gyermekfolyamat CPU-idejét és csúcs RSS-ét is. A minőségellenőrzései
kizárólag strukturális orákulumok. A valódi képaláírás-modell minősége
továbbra is `HOLD` státuszban marad, mert ennek a tesztkörnyezetnek nincs
jogosult végpontja vagy befagyasztott értékelője. A pénzügyi megtakarítások
szintén `HOLD` státuszban maradnak, hacsak a `--caption-cost-per-call-usd`
nem ad meg explicit, pozitív hívásonkénti becslést; a szkript soha nem
fabrikálja egyik eredményt sem.

Minden egyes képkocka mérete legfeljebb 4 MiB, az összes nyers képkockáé együttesen 23 MiB, a szerializált brókerválaszé pedig 32 MiB lehet. A rendszer a privát ideiglenes könyvtárat a `finally` blokkban eltávolítja. Az OmniRoute nem tartalmazza az FFmpeg-et, és nem fogad el egyéni futtathatófájl-elérési utat. A feliratozás előtt a híd konzervatív vizuális duplikációszűrést végez: minden JPEG-képet 16×16-os szürkeárnyalatos pufferré kicsinyít, majd csak a legutóbb megtartott képkockával hasonlítja össze. Ha az igényelt feliratozási keret egynél több képkocka, a kinyerés legfeljebb a keret kétszeresének megfelelő, korlátozott jelölthalmazt biztosít, de soha nem többet 16 képkockánál. Az igényelt felső korlát alkalmazása csak a duplikációszűrés után történik; ha a keret legalább kettő, a végső ritkítás során az első és az utolsó kiválasztott jelölt megmarad. A verziózott `grayscale-16x16-mean-cells-v2` szabályzat az átlagos fénysűrűség-különbség és azon miniatűrcellák aránya közül a nagyobbat használja, amelyek normalizált különbsége legalább 0,05. A duplikációs küszöbérték a 0,04-es konstans, amelyet a kiszámíthatóság érdekében választottak, ahelyett, hogy futásidejű beállításként elérhetővé tették volna. Ez a másodlagos, nagy kontrasztú jel megőrzi azokat a kis mozgásokat és láthatószöveg-változásokat, amelyeket a kizárólag átlagon alapuló összehasonlítás elfedhet. Az összehasonlító vagy a dekóder hibái nyitott hibakezelést eredményeznek, így a lefedettség megmarad. A kimeneti metaadatok külön kezelik a kinyert jelölteket, a sikeresen felhasznált képkockákat és az elvetett vizuális duplikátumokat.

Egy kifejezetten videóként megjelölt rész időbélyeggel ellátott kontaktlapot kérhet. A híd legfeljebb 4 oszlopos, 16 képkockás JPEG-rácsot készít. Minden 512 képpontos cella nagy kontrasztú alsó sávba égeti a forrás időbélyegét, miközben ugyanezek az időbélyegek a szöveges metaadatokban is megmaradnak a további feldolgozás során végzett társításhoz és auditáláshoz. A teljes JPEG mérete továbbra is legfeljebb 32 MiB. Ha a `sharp` nem tudja dekódolni vagy összeállítani a rácsot, a híd visszatér az egyedi JPEG-képkockákhoz; az ügyfél általi megszakítás továbbra is tovaterjed a kontaktlap-műveleten keresztül.

Az élesítéshez szükséges bizonyíték szándékosan elkülönül a szintetikus kompozíciós mikroteljesítmény-teszttől. A `scripts/perf/video-bridge-contact-sheet-eval.ts` egy sémaverzióval ellátott A/B tesztkeretrendszert határoz meg valódi, OpenAI-kompatibilis vizuális modellekhez. Méri a szolgáltató által jelentett tokeneket, a teljes folyamat falióra szerinti késleltetését — beleértve a kontaktlap összeállítását is —, a modellhívások számát és a jegyzékben meghatározott tények megőrzését. A nyers modellválaszok nem kerülnek bele a jelentésbe; csak az SHA-256 kivonatok és az egyező tényazonosítók maradnak meg. A tesztkeretrendszer nem indít hálózati vagy fizetős modellhívást, kivéve, ha megadják a `--execute-real` kapcsolót, és konfigurálva van a `--model`, az `OMNIROUTE_BASE_URL`, valamint az `OMNIROUTE_API_KEY`. Ilyen kifejezett valós futtatás nélkül a géppel olvasható döntés értéke `HOLD` marad; a szintetikus hasznosadat- és hívásszám-mérések önmagukban nem szolgálnak az élesítés bizonyítékául.

A hívók opcionális `transcript.cues` tömböt csatolhatnak egy támogatott videórészhez, ha már rendelkeznek időben illesztett szöveggel. Minden elemnek tartalmaznia kell a `text` mezőt, a vizsgált időtartamon belüli véges `start`/`end` intervallumot, valamint egy engedélyezési listán szereplő `source` értéket (`client`, `embedded` vagy `audio-bridge`); a `confidence` alapértelmezett értéke `1`, és `0`, illetve `1` között kell maradnia. A pontosan megegyező elemeket a rendszer összevonja. Az OmniRoute soha nem indít átírást ezekből a metaadatokból: az ellenőrzött elemeket a forrással, a megbízhatósági értékkel és az intervallummal együtt átmásolja a leírt eredménybe, és nem megbízható megfigyelésekként jeleníti meg őket a képkockák feliratai mellett. Az érvénytelen, tartományon kívüli vagy eredetmegjelölés nélküli szöveget elutasítja, ahelyett, hogy belekeverné a feliratfolyamba. A kérés törzsében található mindkét átiratcsatorna `client` értékre normalizálja a megadott eredetet, beleértve a saját bevallású `embedded` vagy `audio-bridge` címkéket is. Ezeket a megbízható címkéket csak egy kiszolgáló által felügyelt adapter rendelheti hozzá a kizárólag kódból elérhető `trustedSource` argumentumon keresztül; a kérés JSON-mezője nem érheti el ezt az argumentumot. Az átirat szövege eredetétől függetlenül nem megbízható, médiából származó tartalom marad, és soha nem határozhatja meg az engedélyezést.

Egy haladó hívó ugyanahhoz a videóhoz `audioTranscript` sávot adhat meg; ezt a rendszer ügyfél által biztosított szövegként, nem pedig kiszolgálóoldali átírás bizonyítékaként kezeli. Az egyesítési réteg egyetlen határidő és megszakítási jel alatt futtatja a vizuális és hangalapú megfigyeléseket, közös idővonalon rendezi őket, összevonja a pontos duplikátumokat, és részleges eredményt ad vissza, ha csak az egyik oldal sikeres. Az érvénytelen `audioTranscript` részleges eredményt okoz — a vizuális leírás megmarad, a hangág pedig megtisztított hibakódot rögzít — ahelyett, hogy a teljes videó feldolgozása sikertelen lenne. Az ágankénti rendelkezésre állás, a részlegességet jelző érték és a megtisztított hibakódok megmaradnak a leírt eredményben, a védőkorlátok metaadataiban (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), az eredmény-gyorsítótár metaadataiban és a híd egyesítési számlálóiban. A Video Bridge alapértelmezett útvonala nem indít beszédfelismerést, és nem tölti le a média második példányát; ilyen kifejezetten megadott sáv nélkül továbbra is csak a videót dolgozza fel.

**Transzkript-megőrzés (#12150 P1).** Ez automatikusan érvényesül, amikor a
Video Bridge (amely önmagában is opt-in) transzkript-cue-t renderel — nincs
külön megőrzési flag. Amikor egy kérés bármilyen transzkript-cue-t renderel
(a hívó által deklarált `transcript`-et vagy egy egyesített
`audioTranscript`-et), a guardrail `videoBridgeObserved`-ként jelöli meg, és a
videóleírás redigált árnyékát állítja elő — egy azonos renderelést, amelyben
minden cue szabad-szöveges törzse `[redacted-video-transcript]`-re cserélődik;
ezt úgy hozza létre, hogy a strukturált cue-mezőt még a string összeállítása
előtt helyettesíti (soha nem az összeolvasztott szöveg parse-olásával, így
semmilyen cue-tartalom — sem rosszindulatú, sem közönséges, beleértve a `]`-t
tartalmazó törzseket, például `[inaudible]`/`[music]` — nem maradhat meg). A
megőrzött hívásnaplóbeli kérés törzse minden videóból származó szövegrészt
erre a redigált árnyékra cserél, tartalmi egyezéssel párosítva; a `fullText`
horgony a befejezett hívás előtti guardrail-payloadból kerül újraolvasásra,
így az egyezés akkor is sikeres, amikor a későbbi lánc-guardrailok (a PII- és
hitelesítőadat-maszkerok, 10/95-ös prioritással) helyben átírják a leírás
szövegét, és amikor a system-prompt-/handoff-/memória-injektálás átalakítja
az üzenettömböt. A modell felé upstream küldött törzs változatlan. Egy
megfigyelt kérés nem hoz létre tartós Memory-t sem (mind a kérés-, mind a
válasz-alapú kinyerés kihagyásra kerül), így a modell saját válasza sem
visszhangozhat transzkript-szöveget a Memory-be.

**Nyers videómezők (#12430).** Amikor a bridge engedélyezve van, és a natív
videótámogatás ismeretlen vagy hiányzik, a definiált
`transcript`/`audioTranscript` mezők szintén aktiválják a
`videoBridgeObserved`-et, még leírási hiba vagy `maxVideos`-korlát esetén is.
A `null` és az üres stringek számítanak; a hiányzó mezők és a nem videós
metaadatok nem. A megőrzött példányok redigálják ezeket a mezőket vagy
elhagyják a kérést, a cache-ek/Memory pedig megkerülésre kerül.

Ezeken a fallback-útvonalakon az érvényes hívói cue-k támogatott
`text`/`input_text` részekké válnak nem szabványos szolgáltatói mezők helyett.
Mindkét kérés által szolgáltatott sáv nem megbízható `client` megfigyelés
marad, kifejezett figyelmeztetéssel, hogy a videó nem került leírásra, és az
időbélyegek nem lettek a médiával szemben ellenőrizve. A meglévő 256
cue/64 KiB-os összesített és cue-nkénti keret a két sávra együttesen
vonatkozik; az időbélyegeknek be kell férniük a bróker 600 másodperces
plafonjába és bármely megadott fókuszablakba. Az érvénytelen sávok eldobásra
kerülnek, nem továbbítódnak tetszőleges szövegként; egy érvényes testvérsáv
ettől még használható, hacsak együttes keretük nincs túllépve. A null/üres
mezők nem adnak hozzá szöveget. Ez a fallback nem ad hozzá médialekérést vagy
transzkripciót. A transzkript-kiterjesztésmezők eltávolításra kerülnek a
fallback videóhordozóból és annak `video_url`/`source` objektumaiból. Az
OpenAI wire-allowlist szigorú marad; az ismeretlen natívitású videóhordozók
továbbra is elérhetők, az ismert, csak szöveges célok pedig megtartják a
biztonságos markereiket. Strukturált redigálási árnyékok védik a hozzáfűzött
transzkript-szöveget, miközben az eredeti, a hívó tulajdonában lévő kérés
változatlan marad. A natívan támogatott célok és a letiltott bridge-ek
megtartják meglévő bypass-viselkedésüket.

A további megőrzött példányok ugyanazt a megfigyeltkérés-jelet használják. A
nyers, guardrail előtti klienskérés-pillanatkép, a memóriában várakozó kérés
és a korai elutasítottkérés-napló strukturálisan lecseréli a videórészekben
a transzkriptmezőket; a pipeline-lépések és a kontextus-handoff által
szintetizált string-promptok a megőrzöttkérés-törzs nyelőjénél kerülnek
redigálásra. A megőrzött `video_content_removed` marker miatt a
`previous_response_id` folytatás fail-closed módon meghiúsul ahelyett, hogy
a szándékosan eldobott szöveget rekonstruálná. Ha egy megfigyelt kérés a
naplózás előtt elveszíti részenkénti redigálási árnyékát, vagy ha a későbbi
kérésmódosítások után több videóárnyék közül akár egy is nem egyezik, a
megőrzött kérés törzse teljes egészében elmarad ahelyett, hogy részben
redigált transzkriptet őrizne meg.

Egy megfigyelt kérésnél a modell válasza strukturált cue-határ nélkül is
idézheti a transzkript bármely részét. A megőrzött hívásnaplóbeli
`responseBody` ezért egy elhagyásjelzőre cserélődik; a részletes
pipeline-artefakt (amely upstream/kliens törzseket és stream-chunkokat is
tartalmazhat) nem kerül megőrzésre. A szemantikai, idempotencia- és
reasoning-replay cache-ek az adott kérésre megkerülik az olvasást és az
írást. A szolgáltatói kérés és a kliens számára látható válasz változatlan
marad. Amikor a részletes artefakt elmarad, a korai keepalive-bájtok
kiürülnek az ideiglenes pufferből. A Kiro hibás EventStreamre vonatkozó
figyelmeztetése csak a payload bájtszámát jelenti, sosem annak tartalmát
vagy a JSON-parser nyers hibáját.
Ez nem állítja, hogy minden ide nem tartozó szolgáltatói/plugin-diagnosztika
auditálva lett volna; a tágabb, a megőrzött nyelőkre irányuló átvilágítást a
#11658-as issue követi.

A belső `/api/modality-bridge/video/drilldown` életciklus külön,
loopback-/token-hitelesítésű cache-aljzat. Minden művelethez kanonikus, opak
principal-azonosító is szükséges. Mielőtt egy éles hívó engedélyezésre
kerülne, ezt az azonosítót a hitelesített tenantból kell származtatnia, és
sosem továbbíthat kliens által kiválasztott értéket. A cache-kulcsok ezt a
principalt kanonikus munkamenet- és videóhivatkozás-azonosítókhoz kötik,
csak az azokból SHA-256-tal származtatott kulcsokat tárolják, és mind az
olvasást, mind a törlést ugyanarra a principalra korlátozzák. A cache
bejegyzésenként legfeljebb 16 származtatott JPEG-képkockát tárol, tíz perc
után lejáratja őket, és korlátozott `start`/`end` olvasást vagy explicit
munkamenet-törlést támogat.

Principalonként legfeljebb 16 bejegyzés és 64 MiB kanonikus JPEG-adat
engedélyezett. Ezek a korlátok függetlenek a globális 64 bejegyzés/256
MiB-os plafontól: a principal-kvóta nyomása csak az adott principal
legrégebben nem használt bejegyzéseit szorítja ki, mielőtt a globális
LRU-kiszorítás egyáltalán szóba kerülne. A lejárt bejegyzések
cache-aktivitáskor mind a principal-szintű, mind a globális nyilvántartásból
eltávolításra kerülnek, a megszakítás és a validálási hiba pedig nem
véglegesít részleges cserét.

A gyorsítótár elutasítja a nem kanonikus Base64-et, a felesleges kitöltést, a nem JPEG médiát, a hibás vagy
csonkolt JPEG-eket, valamint azokat a JPEG-eket, amelyek figyelmeztetést eredményeznek a korlátozott teljes képes
`sharp` dekódolás során. Minden elfogadott képet kanonikus JPEG-ként kódol újra, a szélességet és magasságot a
dekódolt bájtokból vezeti le a hívói mezők megbízhatónak tekintése helyett, és a záró poliglot bájtokat eldobja
ahelyett, hogy megőrizné őket. Csak a korlátozott kanonikus tömörített puffer kerül elszámolásra mindkét kvótában.
A JSON átviteli korlát a 32 MiB-os dekódolt bemeneti plafonhoz a Base64-többletet is tartalmazza. Minden tárolt
származtatás rögzíti az ellenőrzött JPEG formátumát/felbontását, a mintavételi irányelvet, a származtatási
verziót, a létrehozás időpontját, a szerver által számított tartalmi hash-t és a hash-elt szülőhivatkozást,
valamint a megbízható hívó szülőtartalom-hashét. A megszakítás ellenőrzése az aszinkron dekódolási/hash-fázisok
között történik, az atomi gyorsítótár-véglegesítés előtt.

Ez a részlet még nem kapcsol éles producert a route-hoz, és nem biztosít többfelbontásos variánsválasztást sem.
Az átlátszó Video Bridge kérési útvonal ezért nem jár többletmunkával, miközben a bérlőhöz kötött
principal-származtatás és a teljes FU-08 többfelbontásos életciklus továbbra is kifejezett utómunkaként szerepel,
nem pedig befejezett viselkedésként dokumentálva.

A képkockák feliratozása szekvenciálisan történik a konfigurált Video modellel. Üres Video-felülbírálás esetén
a Vision-beállítás öröklődik; ha mindkettő üres, a Vision auto-router választja ki a tényleges látásképes
modellt. A sikeres feliratok stabil `[Video description:` előtaggal helyettesítik az eredeti részt, amely egyben
megbízhatatlan, médiából származó megfigyelésként jelöli meg a szöveget, és utasítja a további modelleket, hogy
ne kövessék a médiában található utasításokat. A képkockafelirat-gyorsítótár kulcsai tartalmazzák a JPEG
bájtokat, a promptot, az időbélyeget és a tényleges modellt; csak a sikeres feliratok kerülnek gyorsítótárazásra.
A gyorsítótár-bejegyzések megőrzik a tényleges sikeres producer-modellt, beleértve a tartalék modellt is; a
bridge `mixed` értéket jelent, ha a különböző képkockákat különböző modellek állították elő. Gyorsítótár-találat
esetén a rendszer újrahasznosítja ezt a producer-identitást ahelyett, hogy a kért útválasztási terv szerint
címkézné át. A teljes videós eredmény-gyorsítótár minden olyan bemenetre kulcsolódik, amely megváltoztatja a
kimenetet — prompt, tényleges modell, mintavételi irányelv, képkockaszám, szemantikai elemzési mód, a normalizált
fókusztipp SHA-256-ujjlenyomata, fókuszablak, `transcript`, `audioTranscript` és a contact-sheet jelző —, így
bármelyik dimenzió megváltoztatása gyorsítótár-tévesztés, soha nem elavult újrafelhasználás. A vizuális
deduplikációs irányelv verziója, küszöbértéke és a korlátozott jelöltképkocka-szám szintén explicit módon
szerepel az eredmény-gyorsítótár kulcsában és metaadataiban; egy irányelvmódosítás ezért nem használhat fel
elavult teljes videós leírást. Az eredmény-gyorsítótár v4-es metaadatai a módot és az ujjlenyomatot őrzik meg,
soha nem a nyers felhasználói feladatot. A guardrail-metaadatok a kért és a tényleges elemzési módot is
jelentik; a kért `focused` mód használható felhasználói szöveg nélkül ténylegesen `full` módként kerül
jelentésre.

A guardrail minden támogatott videórészt kinyer, de legfeljebb `modalityBridgeVideoMaxVideos` számút ír le.
Bizonyítottan `supportsVideo === false` cél esetén a sikertelen és a korlátot meghaladó videók explicit
biztonságos szöveges jelölőkké válnak, így nyers videó nem maradhat meg. Ismeretlen képesség esetén ezek a
részek megtartják videóhordozójukat; az esetleges tartalék átirat a fenti korlátozott szöveges konverziót követi.
Az `supportsVideo === true` célok megkerülik a bridge-et. A klienskérés megszakítási jele végigterjed a
letöltésen, a broker-soron, az alfolyamatokon és a felirathívásokon; a megszakítások a videók között állnak meg,
és hiba esetén soha nem engedik át a nyers médiát.

A futásidejű beállítások adatbázis-alapúak és Zod-validáltak:

| Kulcs                               | Alapértelmezett | Tartomány / viselkedés                                                                                                       |
| ----------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`         | Opcionális futásidejű beállítás, opt-in                                                                                      |
| `modalityBridgeVideoAnalysisMode`   | `"full"`        | A `full` megőrzi az általános feliratokat; a `focused` korlátozott, megbízhatatlan legutóbbi felhasználói kontextust használ |
| `modalityBridgeVideoModel`          | `""`            | A Vision Bridge-modell öröklése                                                                                              |
| `modalityBridgeVideoFrameCount`     | `8`             | 1–16                                                                                                                         |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`     | `uniform`, `scene_aware` vagy arányos `segment_aware`; detektorhiba esetén visszaesés `uniform` értékre                      |
| `modalityBridgeVideoMaxVideos`      | `1`             | 1–4                                                                                                                          |
| `modalityBridgeVideoTimeout`        | `120000`        | 1000–120000 ms                                                                                                               |

A 120 másodperc feletti, korábban tárolt Video-időtúllépési értékek a broker-határidőre korlátozódnak; a korlát
feletti új beállításírások elutasításra kerülnek. A `GET /api/modality-bridge/video/runtime` megbízható
bélyegzett loopback-lokalitást igényel a hitelesítés vagy a futásidejű szondázás előtt, majd felügyeleti
hitelesítést követel. Csak `available` értéket, tisztított FFmpeg/ffprobe-verziókat, valamint rögzített okot ad
vissza, ha a futtatókörnyezet nem érhető el. A belső kinyerési végpont nem nyilvános feltöltési API:
sortelítettség esetén `503` és `Retry-After`, hívói kapcsolatmegszakadás esetén `499`, a rögzített
broker-határidő esetén pedig `504` a válasz. A konvertált válaszok a
`video->text;model=<visionModel>;parts=<videos>` értéket adják a központi `x-omniroute-modality-bridge`
fejléchez a Vision- vagy Audio-szegmensek eltávolítása nélkül.

### PII-maszkoló (`piiMasker.ts`)

**Mindkét** szakaszban fut.

- **`preCall`** klónozza a payloadot, végigjárja a `system`, `messages`, `input` és
  `prompt` mezőket (beleértve az egyszerű string elemeket is), és alkalmazza a
  `processPII()` függvényt (a `@/shared/utils/inputSanitizer` modulból) a string típusú
  `content`/`text` mezőkre. Ha `PII_REDACTION_ENABLED=true`, az észlelt PII a kimenő
  payloadban maszkolásra kerül. Ez független az `INPUT_SANITIZER_MODE` beállítástól
  (amely csak a prompt-injektálási szabályzatot vezérli). Ha a maszkolás ki van
  kapcsolva, a hívás rögzíti az észlelési számokat anélkül, hogy átírná a tartalmat.
- **`postCall`** mélyklónozza a választ, lefuttatja a `sanitizePIIResponse()` függvényt,
  valamint a Responses-API-alakhoz készült maszkolót (`maskResponsesOutput` — lefedi
  az `output_text` és `output[].content[].text` mezőket). Ha bármilyen maszkolás
  történik, a módosított válasz felülírja az eredetit.

A guardrail sosem blokkol; csak megjegyzéseket fűz hozzá (`meta.detections`,
`meta.redacted`) vagy átír.

#### Típusonkénti kiválasztás, egyéni minták és észlelési számlálók

A **Vezérlőpult → Beállítások → Biztonság → PII-maszkolás** azt határozza meg, hogy
_mi_ kerüljön maszkolásra. A maszkolást nem kapcsolja be: az továbbra is a
`PII_REDACTION_ENABLED` (kérés) és a `PII_RESPONSE_SANITIZATION` (válasz + SSE)
feladata, és mindkettő alapértelmezetten ki van kapcsolva.

- **Típusonkénti kiválasztás** — a beépített azonosítók a
  `src/shared/constants/piiTypes.ts` fájlban találhatók (`PII_BUILTIN_TYPES`). Ha nincs
  beállítva, az minden típust jelent (a beállítás megjelenése előtti viselkedés). A
  kéréskezelő motor `ssn_us` mintája az `ssn` típusra képeződik le. A sablonok
  (Minimal, Standard, Financial, Brazilian, USA, Full) csak a felhasználói felület
  jelölőnégyzeteit töltik ki.
- **Egyéni minták** — legfeljebb 20 reguláris kifejezés vagy wildcard-minta
  (`*` = legfeljebb 64 nem-szóköz karakter, `?` = egy karakter). A találatok
  `[CUSTOM_REDACTED]` értékre cserélődnek. Minden minta átmegy a
  `compilePiiCustomPattern()` ellenőrzésen (`src/shared/utils/piiCustomPatterns.ts`):
  legfeljebb 500 karakter hosszú lehet, a flagek `g i m s u` értékre korlátozottak,
  le kell fordulnia, át kell mennie a `safe-regex` vizsgálaton (katasztrofális
  visszalépés), és nem illeszkedhet üres stringre vagy maszkolási helyőrzőre. A
  sikertelen mintát a rendszer elutasítja mentéskor és teszteléskor is, a tárolt, de
  hibás sort pedig futásidőben kihagyja ahelyett, hogy lefordítaná. Az egyéni minták
  csak bekapcsolt maszkolás mellett futnak.
- **Észlelési számlálók** — típusonkénti darabszámok (sosem a talált értékek),
  memóriában tárolva, újraindításkor nullázódnak
  (`src/lib/pii/piiDetectionStats.ts`). Csak bekapcsolt maszkolás mellett növekednek.

A beállítások a `key_value` táblában élnek (`pii_settings` névtér,
`src/lib/db/piiSettings.ts`), és 1 mp-es gyorsítótáron keresztül kerülnek kiolvasásra. API:

| Metódus | Útvonal                  | Cél                                                                      |
| ------- | ------------------------ | ------------------------------------------------------------------------ |
| `GET`   | `/api/settings/pii`      | A jelzők állapota, `enabledTypes`, `customPatterns`, észlelési számlálók |
| `PUT`   | `/api/settings/pii`      | Az `enabledTypes` (`null` = minden) és/vagy `customPatterns` lecserélése |
| `POST`  | `/api/settings/pii/test` | Egy minta próbafuttatása legfeljebb 8 KB-os mintán; semmi nem tárolódik  |

Mindháromhoz felügyeleti (management) hitelesítés szükséges, és a törzset Zoddal
validálja (`src/shared/validation/schemas/piiSettings.ts`).

### Prompt-injektálás (`promptInjection.ts`)

Észleli a felhasználótól származó tartalomban lévő támadó struktúrákat, és
érvényesíti a konfigurált szabályzatot. A viselkedést környezeti változók és
konstruktor-opciók vezérlik:

| Beállítás         | Környezeti változó                                                                                    | Alapértelmezett | Hatás                                                                                                                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Engedélyezve      | `INPUT_SANITIZER_ENABLED`                                                                             | `true`          | `false` esetén a guardrail azonnal visszatér.                                                                                                                                                                         |
| Mód               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`          | Injektálási szabályzat: `block`, `warn` vagy `log`. (A `redact` visszafelé kompatibilitás miatt elfogadott, de **nem** távolítja el az injektálási szöveget; a kérés PII-átírását a `PII_REDACTION_ENABLED` vezérli.) |
| Blokkolási küszöb | `blockThreshold` opció / `INPUT_SANITIZER_BLOCK_THRESHOLD` (álnév: `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`          | A blokkoláshoz minimálisan szükséges súlyosság. Alapértelmezett beállításnál a közepes (medium) szint csak megfigyelésre kerül.                                                                                       |

**A mód prioritási sorrendje** (`getMode`): a hívó `options.mode` értéke →
`INJECTION_GUARD_MODE` **DB-s feature-flag-felülírás** (Vezérlőpult → Beállítások →
Feature Flagek) → `INJECTION_GUARD_MODE` környezeti változó → `INPUT_SANITIZER_MODE`
környezeti változó → `warn`. A vezérlőpulti felülírás tehát felülbírálja a környezeti
változókat, így a Feature Flagek felület élőben, újraindítás nélkül vezérli a futó
guardot. Az adatbázis-olvasás hibabiztos: hiba esetén a guard visszaesik a környezeti
változókon alapuló viselkedésre, és ha nincs beállítva felülírás, a viselkedés
megegyezik a kizárólag környezeti változókon alapuló feloldással.

Észlelési források:

1. `sanitizeRequest()` a `@/shared/utils/inputSanitizer` modulból (a feldolgozási
   sorban máshol is használt közös detektorkészlet).
2. Beépített `DEFAULT_GUARD_PATTERNS` (jelenleg `system_override_inline` és
   `markdown_system_block`, mindkettő `high` súlyosságú).
3. Opcionális, a konstruktor-opciókon keresztül átadott `customPatterns` (stringek,
   reguláris kifejezések vagy `{ name, pattern, severity }` rekordok).

Ha `mode === "block"` **és** legalább egy észlelés eléri a súlyossági küszöbértéket, a `preCall` a következőt adja vissza: `{ block: true, message: "Request rejected: suspicious content detected" }`. `warn`/`log` módokban a védőkorlát naplóz, de engedélyezi a hívást. A közös `evaluatePromptInjection()` segédfüggvény szintén exportálva van azoknak a hívóknak, amelyek a registry megkerülésével szeretnék kiértékelni a promptokat.

**Vizsgálati korlát (v3.8.20):** a detektor csak az összefűzött prompt-szöveg **első 16 KB-ját** vizsgálja — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bájt) a `src/shared/utils/inputSanitizer.ts` fájlban. A `detectInjection()` és az `evaluatePromptInjection()` egyaránt `slice(0, MAX_INJECTION_SCAN_BYTES)` műveletet hajt végre a mintaillesztő ciklus futtatása előtt. Az injektáló utasítások a bemenet eleje közelében helyezkednek el, így ez korlátozza a regex CPU-/GC-terhelését többszáz KB-os payloadok esetén anélkül, hogy gyengítené az észlelést (lásd: #3932, #4041).

### Hitelesítőadat-maszkoló (`credentialMasker.ts`)

**Mindkét** fázisban fut, az alapértelmezett lánc utolsó elemeként (`95` prioritással). Kitisztítja a jól ismert API-kulcs- / titkos-token-mintákat a kimenő payloadból (üzenettartalom, eszközhívási argumentumok, eszközeredmények) **és** a szolgáltató válaszából is, így a promptba beillesztett (vagy egy eszközeredmény által visszaadott) hitelesítő adat nem szivárog ki az upstream szolgáltatóhoz, illetve vissza a klienshez.

- **Csak opt-in**, ugyanazzal a konvencióval, mint a PII-kitisztítás (a #20-as Hard Rule-hoz kapcsolódó): le van tiltva, hacsak nem `settings.credentialRedactionEnabled === true` **vagy** `CREDENTIAL_REDACTION_ENABLED=true`. Kikapcsolt állapotban a védőkorlát no-op — sosem blokkol és sosem ír át semmit.
- A `redactCredentials()` végigjárja a teljes payload/válasz-fát (`walkValue()`, prototípus-szennyezés ellen védett, `WeakSet` révén ciklusbiztos), és a találatokat `[REDACTED:<type>]` helyőrzőre cseréli, miközben csak a ténylegesen megváltozott ágakat klónozza.
- A `CREDENTIAL_PATTERNS` lefedi az LLM-szolgáltatói kulcsokat (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), a VCS/SaaS-tokeneket (GitHub, Slack, Linear, Notion, npm, Postman, Discord), a fizetési kulcsokat (Stripe, Square), a felhőkulcsokat (AWS access key, Twilio, SendGrid, Mailgun), a privát kulcsokat / JWT-ket, a hitelesítő adatot tartalmazó kapcsolati karakterláncokat (`mongodb://user:pass@...` stb.), valamint egy általános `Authorization`/`x-api-key`/`api-key`/`apikey` fejlécérték-mintát. A fejléc alakú kulcsok (`authorization`, `x-api-key`, `api-key`, `apikey`) strukturálisan kerülnek kitisztításra (csak az érték, a `Bearer `/`Basic ` jellegű sémaelőtag megőrzésével), nem az általános szöveges regexen keresztül.
- A védőkorlát sosem blokkol; csak átír (`modifiedPayload` / `modifiedResponse`) és annotál (`meta.credentialsRedacted`, `meta.count`).

Regressziós védelem: `tests/unit/credential-masker-guardrail.test.ts`.

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

Minden egyes kérésre, amely a `src/sse/handlers/chat.ts` és az
`open-sse/handlers/chatCore.ts` útvonalakon halad át (a
[Lefedettség és korlátok](#coverage-and-limits) alatt felsorolt chat-családi útvonalak):

1. A `resolveDisabledGuardrails(...)` az API-kulcsból, a kérés törzséből és a
   fejlécekből állítja össze a kihagyási listát.
2. A `guardrailRegistry.runPreCallHooks(body, ctx)` növekvő prioritási sorrendben
   futtatja a guardrailokat:
   - A letiltott guardrailok `skipped` értékkel kerülnek rögzítésre.
   - Az egyes guardrailok `preCall` metódusa a `modifiedPayload` révén átírhatja a payloadot.
   - Az első `block: true` megszakítja a láncot, és a handler egy
     guardrail-elutasító válasszal tér vissza.
3. A (potenciálisan átírt) payload a combo routingba és az upstream-kézbesítésbe
   áramlik.
4. **Csak nem streamelt esetben:** miután a válasz összeállt, a
   `guardrailRegistry.runPostCallHooks(...)` ugyanazt a láncot futtatja le a
   válaszon. Az itteni `block: true` eldobja az upstream választ, és HTTP 400-at ad vissza. A streamelt válaszok ezt a lépést teljesen kihagyják.

A kivételt dobó guardrailok `error: <message>` üzenettel kerülnek rögzítésre, és a
`logger.warn` naplózza őket, de a lánc folytatódik — a rendszer kialakítás szerint
fail-open elven működik.

## Lefedettség és korlátok

A guardrail registry kizárólag a chat-pipeline-hoz van bekötve. Ezeket a korlátokat
a `tests/unit/guardrail-pipeline-wiring-characterization.test.ts` és a
`tests/unit/guardrail-pipeline-characterization.test.ts` rögzíti; amikor a viselkedés
megváltozik, ezeket a teszteket tudatosan frissíteni kell.

### Hol futnak a hookok

| Hook / vezérlő                      | Mire fut                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runPreCallHooks`                   | A `handleChat` (`src/sse/handlers/chat.ts`) által kezelt kérések: `/v1/chat/completions`, `/v1/completions`, `/v1/messages`, `/v1/responses` (és `/v1/responses/*`), `/v1/relay/chat/completions`, `/v1/providers/{provider}/chat/completions`, `/v1/api/chat`, `/v1/antigravity`, `/v1beta/models/*`, valamint a Telegram chat-proxy. Továbbá a dashboard `/api/guardrails/test` tesztvégpontja. A hívás előtti blokkolás HTTP 400-at ad vissza. |
| `runPostCallHooks`                  | **Kizárólag nem streamelt** chat-válaszok (`open-sse/handlers/chatCore/nonStreamingResponse.ts`). A streamelt válaszok soha nem jutnak el hozzá.                                                                                                                                                                                                                                                                                                  |
| Streamelt PII                       | A `createPiiSseTransform` (`src/lib/streamingPiiTransform.ts`), amely a `streamingPipeline.ts` fájlban kerül a feldolgozási láncba, ha a `PII_RESPONSE_SANITIZATION` be van kapcsolva. Ez nem guardrail, ezért a letiltási csatornák nincsenek rá hatással.                                                                                                                                                                                       |
| Injection-guard middleware (legacy) | Minden promptot hordozó `/v1` útvonal, beleértve a chat-családot is (lásd [útvonal-lefedettség](#injection-guard-route-coverage--red-team-phase-8--block-d)). Kizárólag prompt injection.                                                                                                                                                                                                                                                         |

### Ami nincs lefedve

- **A média-, embedding- és adatútvonalak** (`/v1/images/*`, `/v1/embeddings`,
  `/v1/audio/*`, `/v1/videos/generations`, `/v1/music/generations`,
  `/v1/rerank`, `/v1/search`, `/v1/moderations`) soha nem érik el a registryt. Sem
  PII-maszkolás, sem hitelesítőadat-maszkolás, sem modality bridge nem fut rajtuk.
  Egyetlen ellenőrzésük a legacy injection-guard middleware.
- **A streamelt válaszok** nem kapnak hívás utáni guardrailokat: nincs `pii-masker`
  vagy `credential-masker` post-call, és nincs hívás utáni blokkolás sem. Kizárólag a
  streamelt PII-transzformáció érvényes (ha a `PII_RESPONSE_SANITIZATION` be van
  kapcsolva). A streamelt válaszban visszhangzott hitelesítő adat nem kerül kitakarításra.
- **A letiltási csatornák és a middleware viszonya (kialakítás szerint):** a middleware
  a prompt injectiont a saját `evaluatePromptInjection()` hívásával értékeli ki,
  anélkül hogy bármilyen hívó által vezérelt letiltási listát átadna. A `block` mód
  kötelező érvényű határ, amelyet a hívó által vezérelt letiltások nem kerülhetnek
  meg — még a chat-családi útvonalakon sem
  ([#16413](https://github.com/diegosouzapw/OmniRoute/issues/16413)). A
  `prompt-injection` letiltása csak a registrybeli guardrailt hagyja ki.

### Mi látja a választ a hívás utáni guardrailok előtt

A nem streamelt útvonalon a sorrend a következő: memória-kinyerés → beépített
eszközvégrehajtás → hívás utáni guardrailok → kilépés hívás utáni blokkolással →
mentés a szemantikai gyorsítótárba.

- A **memóriakinyerés** és az **eszközvégrehajtás** még azelőtt látja a
  választ, mielőtt a hívás utáni védőkorlátok átírhatnák vagy blokkolhatnák
  azt. A [#16401](https://github.com/diegosouzapw/OmniRoute/pull/16401) óta a
  memóriakinyerés a kinyert szöveget a `sanitizePII` függvényen futtatja át, ha
  a `PII_RESPONSE_SANITIZATION` be van kapcsolva (streamelt és nem streamelt
  módban egyaránt), de az a válasz, amelyet a hívás utáni ellenőrzés később
  blokkol, már fel lett kínálva a memóriának és az eszközöknek.
- A **szemantikus gyorsítótár** a hívás utáni feldolgozás után tárolja a
  választ, így az átírt választ tárolja, a blokkolt válasz pedig soha nem kerül
  gyorsítótárazásra. A gyorsítótár-bejegyzések API-kulcsonként vannak
  kulcsolva.

## Konfiguráció

A beépített védelmi korlátok (guardrails) által beolvasott környezeti változók:

| Változó                               | Használja                             | Hatás                                                                                                                   |
| ------------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`                    | Állítsa `false` értékre a felismerés teljes letiltásához.                                                               |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`                    | Injekciós házirend: `warn`, `block` vagy `log`. Az elavult `redact` érték nem írja át az injekciós szöveget.            |
| `INJECTION_GUARD_MODE`                | `prompt-injection`                    | Az injekcióvédő módja; egyben adatbázisbeli funkciókapcsoló is, amely **felülírja** a környezeti változókat (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`                    | A minimális súlyossági szint, amelyet a `MODE=block` elutasít: `high` (alapértelmezett), `medium` vagy `low`.           |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`                    | Az `INPUT_SANITIZER_BLOCK_THRESHOLD` elavult aliasa.                                                                    |
| `PII_REDACTION_ENABLED`               | `pii-masker`                          | Ha `true`, a kérésben szereplő PII kitakarásra kerül (az injekciós módtól függetlenül).                                 |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (továbbfeldolgozó oldal) | A válaszoldali maszkoló viselkedését szabályozza.                                                                       |

A Modality Bridge védelmi korlátjai a futásidejű konfigurációt az adatbázis-hátterű beállítástárolóból (`getSettings()`) olvassák, nem környezeti változókból. A Vision elsődleges kulcsai:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` és
`modalityBridgeCacheMaxEntries`. Az elavult
`visionBridge*` kulcsok csak a dokumentált egyciklusos olvasási tartalékmegoldásként
fogadhatók el; az irányítópult írásai az elsődleges kulcsokat használják. Az alapértelmezett értékek és a tartalékfeloldó a
`src/shared/constants/modalityBridgeDefaults.ts` fájlban találhatók, az elavult
konstansok pedig a `src/shared/constants/visionBridgeDefaults.ts` fájlban őrződnek meg.

Az Audio a `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` és `modalityBridgeAudioMaxClips` kulcsokat használja, valamint a közös
`modalityBridgeCache*` beállításokat. Az Audiónak nincs elavultkulcs-tartaléka, mert ezek a
kulcsok a Modality Bridge sémával együtt kerültek bevezetésre.

A Video a `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` és
`modalityBridgeVideoTimeout` kulcsokat használja, valamint a közös `modalityBridgeCache*` beállításokat.
Alapértelmezés szerint le van tiltva, mert az FFmpeg/ffprobe opcionális működési
függőségek, a képkocka-feliratozás pedig késleltetést és modellköltséget jelent.

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
