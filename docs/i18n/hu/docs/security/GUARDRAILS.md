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

A registry importáláskor automatikusan betölti a hat védelmi korlátot prioritási sorrendben
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

A GLM 5.3 alapmodell és a `glm-5.3-{low,high,max}` explicit
`supportsVision:false` registry-/spec-metaadatokkal rendelkeznek. A GLM 5.3 Flash változatai
továbbra is natív látásképes modellek. A Claude Code `/v1/messages` útvonala a Claude–OpenAI
fordítás előtt belép a megosztott `handleChat` előhívási védelmikorlát-láncba; a beágyazott
`Read` eszközeredmény-képeket le kell írni vagy kezelni kell, mielőtt a fordítás OpenAI
`image_url` tartalommá alakítja őket (#17069).

A képeket tartalmazó, **nem látásképes modellekhez** címzett kéréseket fogja el, és vagy a teljes
kérést egy látásképes modellhez irányítja át, vagy a képrészeket egy konfigurálható látásmodell
által előállított szöveges leírásokkal helyettesíti a felfelé irányuló hívás előtt. Ez lehetővé
teszi, hogy a csak szöveget kezelő szolgáltatók átláthatóan kezeljék a multimodális hasznos
tartalmakat.

Folyamat:

1. Kihagyja, ha a célmodell már támogatja a látást (kivéve, ha szerepel a kényszerített áthidalási
   listán: `isVisionBridgeForcedModel`).
2. A képrészeket az `extractImageParts(messages)` segítségével
   (`visionBridgeHelpers.ts`) nyeri ki, amely az **egységes médiadetektort** delegálja:
   `detectMediaParts()` az `open-sse/utils/mediaParts.ts` fájlban — ez az egyetlen hiteles
   forrás, amelyet a kombinált kompatibilitási szűrő is megosztva használ.
   A kinyerés azokra a formákra engedélyezett, amelyeket a `replaceImageParts` vissza tud illeszteni
   (a kinyerés↔csere szerződése): OpenAI `image_url`, Anthropic base64
   `source.type:"base64"`, Anthropic URL `source.type:"url"` és a Responses API
   `input_image` formái. A Claude Code `tool_result.content` elemébe és a Responses
   eszközkimeneteibe ágyazott egyező képeket szintén kinyeri és eredeti helyükön cseréli le;
   a csak jelzőként szolgáló formák a kombinált szűrő anyagai, ezért nem kerülnek kinyerésre.
   Kihagyja, ha egyetlen kép sem található.
3. A futásidejű konfigurációt a `resolveVisionBridgeRuntimeSettings()` segítségével oldja fel
   (`src/shared/constants/modalityBridgeDefaults.ts`): az új `modalityBridge*` beállítási kulcsok
   elsőbbséget élveznek; a régi `visionBridge*` kulcsok **egy cikluson át tartó visszaesési
   lehetőségként** megmaradnak (visszaállítási időablak). Ha az áthidalás le van tiltva, a
   médiabejárás előtt kihagyja a feldolgozást.
4. Az üzemmódválasztó (`modalityBridgeVisionMode`, lásd az alábbi táblázatot) dönti el, hogy
   átirányítás vagy leírás történjen. Az átirányítás csak a `model` mezőt lecserélő
   `modifiedPayload` értéket ad vissza, valamint metaadatként ezt:
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. A leírási útvonal: a képek számát `maxImages` értékre korlátozza, összeállítja a
   feladattudatos promptot, lekérdezi a leírási gyorsítótárat, párhuzamosan meghívja a
   látásmodellt (`Promise.allSettled`), és a képek helyére
   `[Image N]: <description>` formátumú szövegrészeket illeszt be. Sikertelen leírás esetén
   `null` érték keletkezik: a nyers kép megmarad ismeretlen vagy látásképes célok esetén
   (#4012), azonban egy **megerősítetten csak szöveges közvetlen cél** vagy egy nulla látásképes
   modellt tartalmazó kombináció minden le nem írt képhez kifejezett
   `(unavailable — no vision-capable provider connected)` szövegcsonkot kap, beleértve a
   részleges hibákat és a leíráshívások számára megadott korláton túli képeket is (#17069).
   A minden leírási kísérletet érintő hiba esetére szolgáló meglévő kombinált leírási tartalék
   továbbra is érvényben marad (#8430).
6. Visszaadja a `modifiedPayload` értéket, valamint a következő metaadatokat:
   (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`).

#### Üzemmódválasztó (`modalityBridgeVisionMode`)

| Üzemmód    | Alapértelmezett | Viselkedés                                                                                                                                                                                                                                                                                                                                                                    |
| ---------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔               | Örökölt heurisztika, változatlanul (#6640/#7204): a nem kombinált/`auto/` modelleket a legjobb látásmodellhez irányítja át, kivéve, ha az eredeti modell már rendelkezik használható hitelesítő adatokkal (ekkor leírja a képeket); a kombinált célok mindig leírást használnak.                                                                                              |
| `describe` |                 | Mindig leírást készít — az átirányítási blokkot teljesen kihagyja; mindig a felhasználó által választott modell válaszol.                                                                                                                                                                                                                                                     |
| `reroute`  |                 | Átirányítás kényszerítése: a hitelesítő adatokkal rendelkező modell megtartását biztosító védelem megkerülhető. Az átirányítási **cél** hitelesítőadat-ellenőrzése továbbra is érvényes — ha nincs használható látásképes cél, az áthidalás egyértelmű hibával blokkolja a kérést ahelyett, hogy leírást készítene vagy nyers képeket küldene egy csak szöveges célmodellnek. |

A kényszerített üzemmódok még az automatikus heurisztika futása előtt rövidre zárják a
feldolgozást; az `auto` viselkedése bájtról bájtra megegyezik a PR-1 előtti védelmikorláttal.

#### API-kulcs hatóköre (`visionBridgeKeyScope.ts`)

Amikor a hívó API-kulcsa korlátozza az `allowedConnections`, a kvótakészleteket
(`allowedQuotas`) vagy a modelleket (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), a híd csak olyan
átirányítási és leíró modelleket választ, amelyeket a kulcs használhat, és csak
olyan kapcsolatokon, amelyeket a kulcs használhat. A leíró hívás ezután mindig
az OmniRoute önhurokon keresztül történik az `x-omniroute-self-loop-key-id`
fejléccel, így a fogadó csevegési kérés ismét érvényesíti az adott kulcs
kapcsolat- és modellházirendjét. Az `enforceApiKeyPolicy()` ezt a fejlécet csak
az önhurok bearer tokenjével együtt veszi figyelembe, így az csak szűkítheti a
hozzáférést, a fel nem oldható azonosítót pedig elutasítja.

Ha a kulcshoz egyetlen képfeldolgozó modell sem engedélyezett, egy
**igazoltan csak szöveges cél** helyben, egyértelmű HTTP 400 válasszal utasítja
el a képkérést ahelyett, hogy a képbájtokat egy arra alkalmatlan upstream
szolgáltatásnak továbbítaná (#17069). Az ismeretlen vagy natív képfeldolgozási
képességű céloknál a leíró útvonal megtartja korábbi, hibánál engedélyező
viselkedését (meta `{ skipped: true, reason: "no_permitted_vision_model" }`).
A kulcs nélküli kérések, valamint az ilyen korlátozások nélküli kulcsok pontosan
ugyanúgy viselkednek, mint korábban.

#### Feladattudatos leíró prompt (`modalityBridgeVisionTaskAware`)

Alapértelmezés szerint **true**. A `composeVisionPrompt()`
(`visionBridgeHelpers.ts`) hozzáfűzi az **utolsó felhasználói üzenet** szövegét
(500 karakterre csonkítva) az alap leíró prompthoz, így a leírást arra irányítja,
amit a felhasználó ténylegesen kért (codex-vision-proxy minta), és arra kéri a
képfeldolgozó modellt, hogy írja át a látható szöveget. Kikapcsolt jelző esetén
— vagy ha nincs felhasználói szöveg — az alap prompt változatlanul használatos.

A leíró önhurok saját OpenAI-kompatibilis kérése (`callVisionModelSingle()`
a `visionBridgeHelpers.ts` fájlban) mindig `image_url.detail: "high"` értéket
kér — feltétel nélkül, minden hívóhoz és szolgáltatóhoz, bármilyen kliensjelzéstől
függetlenül. Az alacsony részletességű mintavételezés éppen annál a
szövegátírási feladatnál rontja az OCR pontosságát, amelyet ez a prompt kér,
ezért maga a leíró hívás mindig nagy részletességet kér, függetlenül attól,
hogy az eredeti bejövő kérés milyen részletességi szintet használt. Ez csak a
belső leíró kérés törzsét érinti; nem változtatja meg azt, ahogyan az OmniRoute
továbbítja a hívó saját `image_url.detail` értékét az elsődleges kérésben —
ezt az alapértelmezést külön alkalmazza, és csak az észlelt OpenCode kliensekre,
a `defaultImageDetail()` függvényben
(`open-sse/handlers/chatCore/upstreamBody.ts`). A leíró önhurok Anthropic
vezetékformátumú ága nem rendelkezik `detail` mezővel, ezért egyik
alapértelmezés sem érinti.

#### A leíró kimenet korlátja (`modalityBridgeVisionMaxChars`)

| Kulcs                          | Alapérték | Tartomány          |
| ------------------------------ | --------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`       | `0` vagy 100–50000 |

A `0` (alapértelmezés) azt jelenti, hogy **nincs korlát** — a
`callVisionModel()` által visszaadott leírás módosítás nélkül halad tovább,
megőrizve a meglévő viselkedést. A 100–50000 tartomány bármely értéke `…`
utótaggal csonkítja a leírást, mielőtt az `[Image N]: <description>` formában
visszaillesztésre kerül (`VisionBridgeGuardrail.preCall()` a
`src/lib/guardrails/visionBridge.ts` fájlban). Növelje ezt a részletgazdag OCR
feladatokhoz, ahol a downstream modellnek szüksége van a teljes átírásra;
csökkentse a bőbeszédű képfeldolgozó modellek tokenhasználatának korlátozásához.
Az irányítópult mezője a Vision lap Advanced paneljén található
(`modality-bridge-max-chars` a `ModalityBridgeVisionTab.tsx` fájlban), és az
1 és 99 közötti értékeket a 100-as minimumra emeli, miközben az explicit `0`
értéket érintetlenül hagyja — a `0` önmagában is érvényes Zod-érték
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nem csupán
a „nincs beállítva” alapértelmezés.

#### Leíró gyorsítótár (`modalityBridge/bridgeCache.ts`)

Memórián belüli LRU + TTL gyorsítótár a leíró kimenetekhez, amelyet a teljes
folyamat közösen használ. A kulcs =
`sha256(imageRef + composedPrompt + configuredBridgeModel)`, hosszúságelőtagos
keretezéssel (nincsenek mezőhatár-ütközések). A modellkomponens a
**konfigurált** hídmodell, nem pedig a ténylegesen válaszoló modell —
a `callVisionModel` belsőleg tartalék modellre válthat, és a próbálkozásonkénti
kulcsképzés feldarabolná a gyorsítótárat. A sikertelen leíró hívások soha nem
kerülnek gyorsítótárba. Beállítások:

| Kulcs                           | Alapérték | Tartomány |
| ------------------------------- | --------- | --------- |
| `modalityBridgeCacheEnabled`    | `true`    | —         |
| `modalityBridgeCacheTtlMinutes` | `60`      | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`     | 10–5000   |

#### Távoli képek normalizálása (önhurokbeli leírás/base64-letöltés)

Amikor a híd saját maga tölt le egy **távoli** képet — az Anthropic leíró
önhívásához és a claude vezetékformátumú base64-konverzióhoz
(`ensureBase64ImagesForClaudeWire`), mindkettőt a `fetchRemoteImageAsDataUri()`
használatával a `visionBridgeHelpers.ts` fájlban —, az eredményül kapott
adat-URI a `normalizeDataUri()` függvényen
(`open-sse/utils/imageNormalize.ts`) halad át, mielőtt beágyazódna a
képfeldolgozó modell kérésébe. A túlméretezett képek **2048px hosszú élre**
lesznek átméretezve (megegyezően azzal az átméretezési korláttal, amelyet az
OpenAI/Anthropic már szerveroldalon alkalmaz), ami csökkenti a feltöltési
bájtokat és a késleltetést anélkül, hogy megváltoztatná, mit lát a
képfeldolgozó modell. Az átméretezés a dinamikus importtal betöltött `sharp`
csomagot használja: olyan platformon, ahol a natív bináris fájl betöltése
sikertelen, a `normalizeDataUri()` **soha nem dob kivételt** — visszaáll az
eredeti bájtok változatlan továbbítására, így a leíró/base64-konverziós útvonal
mindig működőképes marad. A nem kép jellegű bájtok (olyan letöltés, amely nem
dekódolható képet adott vissza) szintén érintetlenül haladnak tovább. Ez a
normalizálás azokra a képekre korlátozódik, amelyeket a híd a saját önhívásához
tölt le — soha nem alkalmazza a hívó nyers, változatlanul továbbított
adatcsomagjára, összhangban a kizárólag kifejezett engedéllyel történő
módosítás elvével (#20. szigorú szabály).

#### Beállítási séma + migráció

Az új `modalityBridge*` kulcsokat a
`src/shared/validation/settingsSchemas.ts` fájlban található `updateSettingsSchema`
Zod segítségével validálja: `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, a `modalityBridgeCache*` hármasa, valamint a
Modality Bridge által használt `modalityBridgeAudio*` csoport. A
`141_modality_bridge_settings.sql` migráció a meglévő örökölt
`visionBridge*` értékeket a megfelelő új kulcsokba másolja (idempotens, és
soha nem ír felül operátor által beállított `modalityBridge*` értéket); az
örökölt kulcsok egy kiadási cikluson keresztül továbbra is elfogadott
visszaesési lehetőségként szolgálnak.

#### Átláthatósági fejléc + statisztikák

A leírással átalakított válaszok a következő fejlécet tartalmazzák:
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(ezt a `modalityBridge/bridgeStats.ts` fájlban található
`buildModalityBridgeHeader()` állítja elő, és a
`src/sse/handlers/chatHelpers.ts` fájlban található
`withModalityBridgeHeader()` helyezi el). Az átirányított kérések nem kapnak
fejlécet — a payload változatlan maradt, és a modell cseréje már látható a
válasz törzsének `model` mezőjében.

A `GET /api/modality-bridge/stats` (kezelői hitelesítés, ugyanazon a szinten,
mint a `GET /api/settings`) a memóriában tárolt, modalitásonkénti számlálókat
adja vissza
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` formában a `vision`, `audio`
és `video` modalitásokhoz. Az `averageLatencyMs` nevezőjeként a
`latencySamples` szolgál, nem az összes próbálkozás; egy időmérés nélküli
művelet nem generál mesterséges, nulla milliszekundumos mintát. A `bridged`
továbbra is a sikeres átalakítások visszafelé kompatibilis álneve; a sikertelen
próbálkozások nem növelik. A számlálók a folyamat újraindításakor
szándékosan nullázódnak (telemetria, nem könyvelés).

#### Irányítópult-konfiguráció

A dedikált irányítópultoldal:
`/dashboard/settings/modality-bridge`. Az URL-lel címezhető `Vision`, `Audio`
és `Video` lapok a `tab` értékének váltásakor megőrzik a lekérdezési
paramétereket. A Vision lap lehetővé teszi az engedélyezést, az üzemmód és a
modell kiválasztását (beleértve az automatikus alapértelmezést), a feladattól
függő promptolást, a speciális időkorlát-, képszám- és leíráshossz-/cache-
korlátok beállítását, a futásidejű számlálók megtekintését, valamint egy
védett mintakérés indítását. Az Audio lap szintén működőképes: engedélyezést,
csak STT-hez használható modellválasztót az Auto lehetőséggel,
időkorlát-/maximális kliphossz-korlátokat, audioszámlálókat és egy
`input_audio` mintatesztet biztosít. A Video lap működőképes: jelenti az
FFmpeg/ffprobe futásidejű állapotát — a négy egyértelmű UI-állapot egyikét
(`unknown`, amikor a vizsgálat folyamatban van vagy nem fejeződhetett be,
`restricted` nem loopback irányítópult-hoston, ahol a vizsgálatot a kliens
kihagyja, `unavailable`, miután a vizsgálat megerősítette a hiányt, illetve
`available`, az FFmpeg/ffprobe verzióival) — megőrzi az engedélyezési,
modell-, képkocka-, videó- és időkorlátokat, a modellválasztót
látásképes modellekre szűri, és megjeleníti a videoszámlálókat.

Az AI-beállítások alatti korábbi Vision Bridge-kártya kompatibilitási link az
új oldalhoz; már nem tartalmazza az űrlap második példányát. A Media
Providers az Image-to-Text és Speech-to-Text munkafolyamatokat szintén a
megfelelő Modality Bridge-lapokra hivatkoztatja, a meglévő Speech-to-Text
játszótér eltávolítása nélkül.

**Önmagába visszatérő hurok beléptetési megkerülése:** amikor a leíró hívás
az OmniRoute saját `/v1` önmagába visszatérő hurkán keresztül halad
(nem szabványos szolgáltatói modell), az al-kérés az
`x-omniroute-admission-bypass: internal` fejlécet küldi, és a feloldott
önmagába visszatérő hurok hitelesítő adatával hitelesíti magát — helyi módban
a helyi `sk_omniroute` sentinel értékkel, vagy a kezelő által konfigurált
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` környezeti változókulccsal (#1350), így
a `REQUIRE_API_KEY=true` telepítések továbbra is végre tudják hajtani a leíró
hívást. A megkerülést csak ezekhez a pontos hitelesítő adatokhoz fogadja el a
rendszer, ezért külső kliensek nem használhatják a fejlécet a beléptetés
kihagyására.

Az örökölt alapértelmezések a
`src/shared/constants/visionBridgeDefaults.ts` fájlban találhatók; az új
üzemmód-, feladatfüggő- és cache-alapértelmezések, valamint a beállítások
feloldója a `src/shared/constants/modalityBridgeDefaults.ts` fájlban
található. A védőkorlát `deps` konstruktorbeállítást biztosít, így a tesztek
beilleszthetnek hamis `getSettings` és `callVisionModel` implementációkat.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

A hangot tartalmazó csevegési kéréseket még azelőtt elfogja, hogy elérnének egy
olyan célt, amelyről nem ismert, hogy elfogad-e hangbemenetet. A csevegési
kérést soha nem irányítja át: a hangrészeket a meglévő
OpenAI-kompatibilis multipart-végponton keresztül írja át szöveggé, a
kiválasztott csevegési modell pedig a szöveges átiratokkal folytatja.

Folyamat:

1. A `supportsAudio` feloldása a `getResolvedModelCapabilities()` segítségével történik. Először az explicit provider-registry metaadat élvez elsőbbséget, ezt követi a statikus modellmetaadat, majd a szinkronizált `modalities_input`. A deklarált bemeneti lista, amely nem tartalmazza az `audio` elemet, `false` értéket jelent; ha nem marad képességre utaló bizonyíték, az érték `null`. Mind a `false`, mind a `null` aktiválja a konzervatív hidat, míg a `true` megkerüli azt.
2. A rendszer feloldja a `modalityBridgeAudio*` beállításokat, és a megosztott `detectMediaParts()` detektoron keresztül minden üzenetből kinyeri a beilleszthető felső szintű hangrészeket. A támogatott vezetékformák az OpenAI `input_audio`, `audio_url`, valamint a `source.media_type: "audio/*"`. A beágyazott hangot az útválasztás céljából felismeri, de a beillesztési útvonal nem távolítja el. A feldolgozás felső korlátját a `modalityBridgeAudioMaxClips` adja; a későbbi részek változatlanok maradnak.
3. A rendszer figyelembe veszi a konfigurált `provider/model` értéket, vagy a `selectAudioBridgeModel()` stabil katalógussorrendben végigjárja az `AUDIO_TRANSCRIPTION_PROVIDERS` elemeit, és kiválasztja az első olyan modellt, amelyhez használható aktív szolgáltatói hitelesítő adat tartozik.
4. A `callAudioTranscription()` a base64- vagy data-URI-formátumú hangot multipart `file` fájllá alakítja, illetve a távoli `audio_url` címet a csak nyilvános célpontokat engedélyező, DNS-rögzítést és 25 MB-os korlátot alkalmazó kimenő forgalmi védelmen keresztül tölti le. Ezután a fájlt és a kiválasztott modellt elküldi a helyi `/v1/audio/transcriptions` önhurok-végpontra, a `resolveSelfLoopBearer()` által hitelesítve. A meglévő átírási útvonal végzi a normál hitelesítőadat-keresést, a cooldown- és sebességkorlát-kezelést, valamint a szolgáltatói diszpécselést.
5. A sikeres hívások a részeket a következőre cserélik: `[Audio N]: <transcript>`. A hívások `Promise.allSettled` használatával futnak: egyedi hiba esetén az eredeti hangrész megmarad (#4012 szerződés). Ha minden hívás sikertelen, és a cél bizonyítottan `supportsAudio === false`, akkor a részek a következőre változnak:
   `[Audio N]: (unavailable — no STT provider connected)` (#8430 szerződés). Ismeretlen cél (`null`) esetén a teljes sikertelenség eredménye változatlan marad. A bizonyítottan csak szöveget támogató cél, amelyhez nem tartozik használható STT-hitelesítő adat, ugyanazt az explicit helyőrzőt kapja hálózati hívás indítása nélkül.

A sikeres átírások a folyamat egészére kiterjedő Modality Bridge LRU/TTL-gyorsítótárat használják. A kulcs az audiohivatkozást, a stabil `audio-transcription` műveletcímkét és a kiválasztott STT-modellt kombinálja; a hibák soha nem kerülnek gyorsítótárba. A hangfeldolgozási kísérletek frissítik a megosztott `bridged`, `cacheHits`, `failures` és `lastUsedAt` számlálókat. Az átalakított válaszok a következő fejlécet tartalmazzák:
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; a változatlan kérések nem kapnak Audio Bridge szegmenst.

A futásidejű beállításokat az adatbázis tárolja, és a Zod validálja:

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

A Chat Completions `messages` és a Responses API `input` legfelső szintű videórészeit fogja el, mielőtt meghívna egy olyan célt, amelyről nem ismert a natív videótámogatás. A támogatott formák az `input_video`, a `video_url`, a `video_source`, a HTTPS-URL-ek, valamint a `data:video/*;base64,...` data URI-k. A szövegben szereplő egyszerű fájlneveket a rendszer nem tekinti videónak.

A `VideoBridgeGuardrail.preCall` (`videoBridge.ts`) felelős a kérések bejárásáért, a képesség- és szabályzat-ellenőrzésért, a kérésenkénti összesítésért és a válasz törzséért. A videónkénti feldolgozás — a beszerzés, a teljes eredmény gyorsítótárazása, egy képkockasorozat leírása (amely egyesíti a hívó által deklarált hangátiratot), valamint a kísérletenkénti metrikák, megszakítás és takarítás — a `videoBridgePipeline.ts` fájlban található `processVideoPart` mögött rejtőzik; a `preCall` ciklusa videórészenként egyszer hívja meg. Ez a modul határozza meg az explicit port-határokat is: a `VideoMediaBrokerPort` bájtokat szerez be és mintavételezett képkockákat nyer ki, a `VideoAudioTranscriptionPort` egyesíti a hívó által deklarált hangátiratot a mintavételezett feliratokkal, a `VideoDrilldownPort` pedig a régi nyers tárformátumot biztosítja. A termelési STT- és képkockamegőrzési megoldások a leíró port köré épülnek a `createVideoSttAdapter` és a `createVideoDrilldownAdapter` segítségével; ez utóbbi a megosztott átlátszatlan-azonosítós életciklust használja.

A nyilvános `/v1` kérési útvonal soha nem importál és nem hív meg alfolyamatot. A távoli videók letöltése 50 MiB-os korláttal történik; a beágyazott base64-videók konzervatív, videónkénti 36 MiB-os dekódolt méretkorláttal rendelkeznek, hogy a modell, az üzenetek és a keretezés burka a nyilvános JSON-kérések 50 MiB-os fogadási korlátján belül maradhasson. A beágyazott hossz- és dekódolt méretbecsléseket a lefoglalás előtt ellenőrzi a rendszer. A kezdeti távoli URL-hez és minden átirányításhoz HTTPS szükséges; az ellenőrzés a meglévő, csak nyilvános célpontokat engedélyező kimenő forgalmi őrrel és DNS-rögzítéssel történik. A bájtok ezután áthaladnak a pontos belső `POST /api/modality-bridge/video/extract` brokerhatáron. Ez az útvonal egyszerre `LOCAL_ONLY` és `SPAWN_CAPABLE`, csak folyamatonként hitelesített, megbízható loopback-kérést fogad el, és soha nem fogad URL-t, fájlrendszerútvonalat, végrehajtható fájlt vagy argumentumlistát. Az API törzsméretét kezelő folyamat és a kezelő inkrementális törzsolvasója egymástól függetlenül érvényesíti az 50 MiB-os brokerbemeneti korlátot. A korlátozott várólista egyszerre egy kibontást futtat, négy függőben lévő feladatot engedélyez, és a függőben lévő bemenetet 100 MiB-ban korlátozza.

A brokerben a `ffprobe` privát helyi fájlt olvas; a rögzített formátumengedélyezési lista kizárja a lejátszólista- és manifestformátumokat. Az engedélyezett MOV-családba tartozó konténerek esetében a külső MOV-adathivatkozások alapértelmezés szerint továbbra is le vannak tiltva, és a rögzített parancs nem engedélyezi ezeket. A `ffprobe` és az `ffmpeg` egyaránt csak a `file` protokollt engedélyező protokoll-listát, egy szálat, rögzített argumentumtömböket és shell nélküli végrehajtást használ, a végrehajtható fájlokat pedig a `PATH` alapján oldja fel. A csatolt képet tartalmazó borítóstreamek nem lehetnek lejátszható jelöltek. Minden lejátszható streamnek meg kell felelnie a korlátozásoknak, és a determinisztikus, legalacsonyabb indexű tartalék előtt egy kifejezetten alapértelmezettként megjelölt stream élvez elsőbbséget. A videók hossza legfeljebb 600 másodperc, méretenként legfeljebb 8 192 képpont, a forrásképpontok száma pedig legfeljebb 33 554 432 lehet. Az FFmpeg 1–16, a képkockák közepén elhelyezkedő JPEG-képkockát mintavételez, a hosszabbik oldalt legfeljebb 1 024 képpontra méretezi át anélkül, hogy a kisebb bemeneteket felskálázná, és soha nem kap URL-t. A mintavételezés alapértelmezett módja a `uniform`. Az opcionális `scene_aware` és kísérleti `segment_aware` szabályzatok egy további, rögzített FFmpeg-átmenetet hajtanak végre az előzőleg validált helyi streamen, korlátozott számú `showinfo` jelenet-időbélyeget választanak ki, és detektorhiba, időtúllépés, hibás kimenet vagy üres jelöltkészlet esetén determinisztikusan visszatérnek ugyanahhoz az egyenletes középponti mintavételezéshez. A szegmensalapú mód a középponti mintákat a validált jelenetintervallumokkal arányosan osztja el; a szegmensalapú bizonyítékokat és a tartalékviselkedést alább részletezzük. A kemény, 16 képkockás korlát minden szabályzatban a kiválasztás után kerül alkalmazásra. Ha egy jelenetalapú kérés csak egyképkockás kerettel rendelkezik, akkor az aktív teljes videó- vagy fókuszablak egyenletes középpontját használja, és `policyEffective: uniform` értéket jelez: egyetlen kiválasztott jelenetképkocka nem képes megőrizni mindkét időbeli végét. A hívó fél opcionálisan megadhat egy véges fókuszablakot (`start`/`end` másodpercben); a határokat a rendszer a média időtartamára korlátozza, a fordított vagy nem véges ablakokat elutasítja, és minden mintavételezési szabályzatot csak a normalizált intervallumon belül hajt végre. Az eredményül kapott ablak bekerül a mintavételezési metaadataiba és a nem megbízható leírás előtagjába, hogy a későbbi modellek meg tudják különböztetni a fókuszált részletet a teljes idővonaltól.

A szemantikai feliratfókusz különálló, explicit beállítás. Az alapértelmezett `full` elemzési mód megőrzi a meglévő képkockapromptot, és soha nem továbbítja a kérés szövegét a feliratmodellt futtató modellnek. `focused` módban a híd csak az ugyanabból a Chat- vagy Responses-konténerből származó, legutóbbi, nem üres, felhasználó által létrehozott `text`/`input_text` értéket olvassa be, NFC-re normalizálja, összevonja a vezérlőkaraktereket és a whitespace-karaktereket, és legfeljebb 500 Unicode-kódpontra korlátozza. Az üres eredmény pontosan a `full` prompttal való tartalékviselkedést váltja ki. A használható tipp JSON-ként kerül szerializálásra egy dedikált, nem megbízható felhasználói kontextusblokkban, és csak a megfigyelhető részleteket helyezheti előtérbe; nem írhatja felül a különálló figyelmeztetést, amely tiltja a médiában látható vagy hallható utasítások követését. A szöveges fókusz soha nem következtet `start`/`end` értékekre, és nem módosítja az időbeli mintavételezőt.

#### FU-07 strukturális szegmensbizonyíték

A `segment_aware` egyetlen, korlátozott előzetes elemzési menetet használ az előzőleg validált helyi videostreamen. A rögzített szűrőlánc először legfeljebb 320 képpont szélességűre méretez, érzékeli a jelenetváltozásokat és a kimerevített intervallumokat, majd másodpercenként 1 képkockát mintavételez az elmosódottság, az átlagos luma, valamint a térbeli és időbeli információ meghatározásához. A menet legfeljebb 600 strukturális mintára, egy FFmpeg-/szűrőszálra, ugyanarra a csak `file` protokollt engedélyező és konténerformátumokat engedélyező listára, 1 MiB-os folyamatkimeneti korlátra, valamint a broker közös megszakítási/határidejéből legfeljebb 30 másodpercre korlátozódik. Soha nem fogad el parancsot, szűrőt, elérési utat vagy URL-t a kéréstől.

A strukturális értékek determinisztikus mintavételezési bizonyítékok, nem pedig a videó szemantikai értelmezései. Nem következtetnek témákra, műveletekre, feliratokra, beszédre vagy felhasználói szándékra. A jelenet- és kimerevítési határok szegmenseket alkotnak; a kimerevítés lefedettsége, az elmosódottság, az expozíció, a térbeli részletesség, valamint az időbeli változás csak azt befolyásolja, hogyan kerül felosztásra a meglévő, 1–16 képkockás keret. A teljesen kimerevített szegmens legfeljebb egy képkockára korlátozódik, míg a nem kimerevített szegmensek versengenek a fennmaradó keretért. Ha a határok száma meghaladja a képkockák számát, a rendszer megőrzi az idővonal egyenletes lefedettségét, így a gyors, korai vágások nem rejthetnek el egy hosszú, későbbi szegmenst. Az 1 másodperces elemzési felbontáson belül egy kimerevítési határhoz közeli jelenethatárokat a rendszer összevonja.

A hiányzó szűrők, a hibás vagy üres bizonyítékok, a detektorhiba, illetve a korlátozott előzetes elemzési időtúllépés pontosan az egyenletes középponti szabályzathoz való visszatérést váltja ki. A hívó fél megszakítása vagy a broker határideje nem vált ki ilyen tartalékviselkedést: leállítja a folyamatban lévő alfolyamatot, megakadályozza a későbbi képkockakinyerést, és a privát ideiglenes fa a `finally` blokkban törlődik.

A `scripts/perf/video-bridge-fu07-eval.ts` determinisztikus, valódi FFmpeg-fixture-öket generál a deduplikáció utáni feliratmodell-hívások megtakarításainak, a sűrű mozgáshoz történő keretkiosztásnak, az elmosódottságot/expozíciót/SI-TI-t érintő bizonyítékoknak, a gyors vágásoknak hosszú lecsengéssel, valamint a fokozatos elhalványulásból eredő téves pozitív eredményeknek a vizsgálatához. Rögzíti az előzetes elemzés falióra szerinti idejét, továbbá ahol a `/usr/bin/time` elérhető, a gyermekfolyamat CPU-használatát és a csúcsidejű RSS-memóriát. Minőség-ellenőrzései kizárólag strukturális orákulumok. A valódi feliratmodell-minőség továbbra is `HOLD`, mivel ez a tesztkörnyezet nem rendelkezik engedélyezett végponttal vagy rögzített bíróval. A pénzbeli megtakarítások szintén `HOLD` állapotban maradnak, hacsak a `--caption-cost-per-call-usd` nem ad meg explicit, pozitív hívásonkénti becslést; a szkript egyik eredményt sem gyártja le.

Minden képkocka mérete legfeljebb 4 MiB, az összes nyers képkockáé együttesen 23 MiB, a szerializált brókerválaszé pedig 32 MiB lehet. A privát ideiglenes könyvtár eltávolítása a `finally` blokkban történik. Az OmniRoute nem tartalmazza az FFmpeg-et, és nem fogad el egyéni futtathatófájl-elérési utat. A feliratozás előtt a híd konzervatív vizuális deduplikációt végez: minden JPEG-et 16×16 méretű szürkeárnyalatos pufferré kicsinyít, és csak a legutóbb megtartott képkockával hasonlítja össze. Ha a kért feliratozási keret egynél több képkockát engedélyez, a kinyerés egy korlátozott jelölthalmazt biztosít, amely legfeljebb a keret kétszerese, de soha nem több 16 képkockánál. A kért korlátot csak a deduplikáció után alkalmazza, és ha a keret legalább kettő, a végső ritkítás során megőrzi az első és az utolsó kiválasztott jelöltet. A verziózott `grayscale-16x16-mean-cells-v2` szabályzat az átlagos luminanciakülönbség és azon bélyegképcellák aránya közül a nagyobbat használja, amelyek normalizált eltérése legalább 0,05. A duplikációs küszöbérték a 0,04-es állandó, amelyet a kiszámíthatóság érdekében választottak, nem pedig futásidejű beállításként tettek elérhetővé. Ez a másodlagos, nagy kontrasztú jel megőrzi azokat a kis mozgásokat és láthatószöveg-változásokat, amelyeket egy kizárólag átlagon alapuló összehasonlítás elrejthet. Az összehasonlító vagy a dekóder hibái esetén a rendszer nyitottan hibázik, és megtartja a lefedettséget. A kimeneti metaadatok külön kezelik a kinyert jelölteket, a sikeresen felhasznált képkockákat és az elvetett vizuális duplikátumokat.

Egy kifejezetten megjelölt videórész időbélyeggel ellátott kontaktlapot kérhet. A híd legfeljebb 4 oszlopos, 16 képkockás JPEG-rácsot készít. Minden 512 képpontos cella egy nagy kontrasztú alsó sávba égeti a forrás időbélyegét, miközben ugyanezek az időbélyegek a szöveges metaadatokban is megmaradnak a későbbi társításhoz és auditáláshoz. A teljes JPEG mérete továbbra is legfeljebb 32 MiB lehet. Ha a `sharp` nem tudja dekódolni vagy összeállítani a rácsot, a híd visszatér az egyedi JPEG-képkockákhoz; az ügyfél általi megszakítás továbbra is tovaterjed a kontaktlap-műveleten keresztül.

Az élesítéshez szükséges bizonyíték szándékosan elkülönül a szintetikus kompozíciós mikroteljesítmény-teszttől. A `scripts/perf/video-bridge-contact-sheet-eval.ts` egy sémaverziózott A/B tesztkeretet határoz meg valódi, OpenAI-kompatibilis látásmodellekhez. A szolgáltató által jelentett tokeneket, a végpontok közötti falióra szerinti késleltetést — beleértve a kontaktlap összeállítását —, a modellhívások számát és a jegyzékben meghatározott tények megőrzését méri. A nyers modellválaszokat nem írja bele a jelentésbe; csak az SHA-256 kivonatokat és az egyező tényazonosítókat őrzi meg. A tesztkeret nem indít hálózati vagy fizetős modellhívást, kivéve, ha megadják a `--execute-real` kapcsolót, és konfigurálva van a `--model`, az `OMNIROUTE_BASE_URL`, valamint az `OMNIROUTE_API_KEY`. Ilyen kifejezett valós futtatás nélkül a géppel olvasható döntése `HOLD` marad; a szintetikus adatterhelés- és hívásszám-mérések önmagukban nem minősülnek az élesítés bizonyítékának.

A hívók opcionális `transcript.cues` tömböt csatolhatnak egy támogatott videórészhez, ha már rendelkeznek időben igazított szöveggel. Minden jelzésnek tartalmaznia kell `text` mezőt, a vizsgált időtartamon belüli véges `start`/`end` intervallumot, valamint egy engedélyezőlistán szereplő `source` értéket (`client`, `embedded` vagy `audio-bridge`); a `confidence` alapértelmezett értéke `1`, és `0` és `1` között kell maradnia. A teljesen azonos jelzéseket a rendszer összevonja. Az OmniRoute soha nem indít átírást ezekből a metaadatokból: az ellenőrzött jelzéseket a forrással, a megbízhatósági értékkel és az intervallummal együtt átmásolja a leírt eredménybe, és nem megbízható megfigyelésekként jeleníti meg őket a képkockák feliratai mellett. Az érvénytelen, tartományon kívüli vagy eredetmegjelölés nélküli szöveget elutasítja ahelyett, hogy belekeverné a feliratfolyamba. Mindkét kérésstörzs-alapú átiratcsatorna `client` értékre normalizálja a megadott eredetet, beleértve az önbevallásos `embedded` vagy `audio-bridge` címkéket is. Ezeket a megbízható címkéket csak egy kiszolgáló által felügyelt adapter rendelheti hozzá a kizárólag kódból elérhető `trustedSource` argumentumon keresztül; a kérés JSON-mezője nem érheti el ezt az argumentumot. Az átirat szövege az eredetétől függetlenül nem megbízható, médiából származó tartalom marad, és soha nem határozhatja meg az engedélyezést.

Egy haladó hívó ugyanahhoz a videóhoz `audioTranscript` sávot adhat meg; ezt a rendszer az ügyfél által biztosított szövegként kezeli, nem pedig a kiszolgáló által végzett átírás bizonyítékaként. Az egyesítési csatlakozási pont a vizuális és hangalapú megfigyeléseket közös határidő és megszakítási jel alatt futtatja, közös idővonalon rendezi őket, összevonja a teljesen azonos elemeket, és részleges eredményt jelent, ha csak az egyik oldal jár sikerrel. Az érvénytelen `audioTranscript` ilyen részleges eredménnyé minősül vissza — a vizuális leírás megmarad, a hangág pedig megtisztított hibakódot rögzít — ahelyett, hogy a teljes videó feldolgozása meghiúsulna. Az ágankénti elérhetőség, a részleges állapot jelzője és a megtisztított hibakódok megmaradnak a leírt eredményben, a védőkorlátok metaadataiban (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), az eredmény-gyorsítótár metaadataiban és a híd egyesítési számlálóiban. A Video Bridge alapértelmezett útvonala nem hív beszéd-szöveggé alakítást, és nem tölti le a média második példányát; e kifejezett sáv nélkül továbbra is csak videót dolgoz fel.

**Átiratmegőrzés (#12150 P1).** Ez automatikusan érvénybe lép, amikor a
Video Bridge (amely maga opt-in) átiratjelzést jelenít meg — nincs külön
megőrzési jelző. Amikor egy kérés bármilyen átiratjelzést jelenít meg (egy
hívó által deklarált `transcript` vagy egy összeolvasztott `audioTranscript`),
a védelmi réteg `videoBridgeObserved` jelöléssel látja el, és elkészíti a
videoleírás maszkolt másolatát — egy azonos megjelenítést, amelyben minden
jelzés szabad szöveges törzse `[redacted-video-transcript]` értékre van
cserélve; ez a strukturált jelzésmező behelyettesítésével történik a karakterlánc
összeállítása előtt (soha nem a lapított szöveg elemzésével, így semmilyen
jelzéstartalom — legyen az ellenséges vagy szokásos, beleértve a `]` jelet
tartalmazó törzseket, például az `[inaudible]`/`[music]` értékeket — nem
maradhat meg). A megőrzött hívásnapló-kérés törzse minden videóból származó
szövegrészt erre a maszkolt másolatra cserél, tartalmi egyenlőség alapján
párosítva; a `fullText` horgonyt a hívás előtti, elkészült védelmi réteg
hasznos adataiból olvassa újra, így a párosítás akkor is sikeres marad, ha a
későbbi láncbeli védelmi rétegek (a 10/95 prioritású PII- és hitelesítőadat-
maszkolók) helyben átírják a leírás szövegét, illetve ha a rendszerszintű
utasítás-/átadás-/memóriabeszúrás átalakítja az üzenettömböt. A modellnek
továbbított törzs változatlan marad. A megfigyelt kérés tartós Memory-t sem
tölt fel (mind a kérésből, mind a válaszból származó kinyerés ki van hagyva),
így a modell saját válasza nem másolhatja az átirat szövegét a Memory-ba.

**Nyers videómezők (#12430).** Ha a bridge engedélyezve van, és a natív
videótámogatás ismeretlen vagy hiányzik, a definiált `transcript`/`audioTranscript`
mezők akkor is aktiválják a `videoBridgeObserved` jelölést, ha a leírás
sikertelen, vagy elérték a `maxVideos` korlátot. A `null` és az üres
karakterlánc is számít; a hiányzó mezők és a nem videóhoz kapcsolódó metaadatok
nem. A megőrzött másolatok maszkolják ezeket a mezőket, vagy elhagyják a kérést,
a gyorsítótárak és a Memory pedig megkerülésre kerülnek.

Ezeken a tartalék útvonalakon az érvényes hívói jelzések támogatott `text`/
`input_text` részekké válnak a nem szabványos szolgáltatói mezők helyett. Mindkét
kérés által megadott sáv továbbra is nem megbízható `client` megfigyelés marad,
kifejezett figyelmeztetéssel arról, hogy a videó nem lett leírva, és az
időbélyegeket nem ellenőrizték a médiával szemben. A meglévő, összesen és
jelzésenként érvényes 256 jelzéses/64 KiB-os keretek együtt vonatkoznak a két
sávra; az időbélyegeknek bele kell férniük a broker 600 másodperces korlátjába
és bármely megadott fókuszablakba. Az érvénytelen sávokat elveti a rendszer,
nem továbbítja tetszőleges szövegként; egy érvényes testvérsáv továbbra is
használható, kivéve ha a közös keretük túllépésre kerül. A null/üres mezők nem
adnak hozzá szöveget. Ez a tartalék megoldás nem ad hozzá médialetöltést vagy
átírást. Az átiratbővítési mezők eltávolításra kerülnek a tartalék videóhordozóból
és annak `video_url`/`source` objektumaiból. Az OpenAI vezetékének engedélyezési
listája továbbra is szigorú marad; az ismeretlen natív videóhordozók továbbra is
elérhetők, az ismert, csak szöveget kezelő célok pedig biztonságos jelölőket
tartanak meg. A strukturált maszkolt másolatok védik a hozzáfűzött átiratszöveget,
miközben az eredeti, hívó tulajdonában lévő kérés változatlan marad. A natívan
támogatott célok és a letiltott bridge-ek megtartják meglévő megkerülési
viselkedésüket.

A további megőrzött másolatok ugyanazt a megfigyeltkérés-jelet használják. A
védelmi réteg előtti nyers klienskérés-pillanatkép, a memóriában függőben lévő
kérés és a korai elutasítottkérés-napló strukturáltan lecseréli a videórészek
átiratmezőit; a folyamat szakaszai és a kontextusátadás által előállított
karakterláncos promptok a megőrzött kéréstörzs célpontjánál maszkolásra kerülnek.
A megőrzött `video_content_removed` jelölő biztosítja, hogy a
`previous_response_id` folytatása biztonságosan sikertelen legyen, ahelyett
hogy újra előállítaná a szándékosan elvetett szöveget. Ha egy megfigyelt kérés
részenkénti maszkolt másolata elveszik a naplózás előtt, vagy ha a több videós
másolat közül akár csak egy sem illeszkedik a későbbi kérésmódosítások után, a
megőrzött kéréstörzs teljes egészében elmarad, ahelyett hogy részlegesen
maszkolt átiratot őrizne meg.

Egy megfigyelt kérés esetén a modell válasza az átirat bármely részét idézheti
strukturált jelzéshatár nélkül. Ezért a megőrzött hívásnapló
`responseBody` mezője elhagyási jelölőre cserélődik; a részletes folyamat-
artefaktumot (amely tartalmazhat szolgáltatói/kliensoldali törzseket és
adatfolyam-részeket) a rendszer nem őrzi meg. A szemantikai, idempotencia- és
következtetés-visszajátszási gyorsítótárak ennél a kérésnél megkerülik az
olvasásokat és az írásokat. A szolgáltatónak küldött kérés és a kliens számára
látható válasz változatlan marad. A korai keepalive bájtokat a rendszer
kiüríti az ideiglenes pufferből, amikor a részletes artefaktum elmarad. A Kiro
hibás EventStreamre vonatkozó figyelmeztetése csak a hasznos bájtok számát
jelenti, a tartalmukat és a JSON-elemző nyers hibáját soha.
Ez nem állítja, hogy minden, egymástól független szolgáltatói/bővítménydiagnosztika
ellenőrzése megtörtént; a szélesebb körű megőrzött célpontokat érintő átvizsgálás
a #11658 alatt van nyomon követve.

A belső `/api/modality-bridge/video/drilldown` életciklusa különálló,
loopback-/token-hitelesítésű gyorsítótár-infrastruktúra. Minden művelethez
szükség van egy kanonikus, átlátszatlan principalazonosítóra is. Mielőtt egy
éles hívó engedélyezve lenne, ezt az azonosítót a hitelesített tenantből kell
levezetnie, és soha nem továbbíthatja a kliens által kiválasztott értéket. A
gyorsítótárkulcsok ezt a principalt a kanonikus munkamenet- és
videóhivatkozás-azonosítókhoz kötik, csak az azokból levezetett SHA-256-kulcsokat
tárolják, és mind az olvasást, mind a törlést ugyanarra a principalra korlátozzák.
A gyorsítótár bejegyzésenként legfeljebb 16 levezetett JPEG-képkockát tárol,
tíz perc után lejártatja őket, és korlátozott `start`/`end` olvasást, illetve
explicit munkamenet-törlést támogat.

Minden principal legfeljebb 16 bejegyzésre és 64 MiB kanonikus JPEG-adatra
korlátozott. Ezek a korlátok függetlenek a globális 64 bejegyzéses/256 MiB-os
plafontól: a principal kvótanyomása először csak az adott principal
legutóbb legkevésbé használt bejegyzéseit üríti, és csak ezt követően kerül
sor a globális LRU-ürítés mérlegelésére. A lejárt bejegyzéseket a rendszer a
gyorsítótár aktivitása során mind a principal-, mind a globális nyilvántartásból
eltávolítja, miközben a megszakítás és az érvényesítési hiba nem véglegesít
részleges cserét.

A gyorsítótár elutasítja a nem kanonikus Base64-kódolást, a többlet kitöltést, a nem JPEG médiát, a hibás vagy csonka JPEG-eket, valamint azokat a JPEG-eket, amelyek korlátozott, teljes képet dekódoló `sharp` művelet során figyelmeztetést eredményeznek. Minden elfogadott képet kanonikus JPEG-ként kódol újra, a szélességet és a magasságot a dekódolt bájtokból állapítja meg a hívó fél mezőibe vetett bizalom helyett, és eldobja a záró poliglott bájtokat, nem pedig megtartja őket. Mindkét kvótába csak a korlátozott méretű, kanonikus tömörített puffer számít bele. A JSON hálózati korlátja a Base64 többletét is tartalmazza a 32 MiB-os dekódolt bemeneti korláthoz. Minden tárolt származtatás rögzíti az ellenőrzött JPEG-formátumot/-felbontást, a mintavételezési házirendet, a származtatási verziót, a létrehozás időpontját, a szerver által kiszámított tartalom-hash-t, valamint a hash-elt szülőhivatkozást és a megbízható hívó fél szülőtartalom-hash-ét. A megszakítás ellenőrzése az aszinkron dekódolási/hash-elési fázisok között, az atomi gyorsítótár-commit előtt történik.

Az éles környezetben működő előállító csak sikeres vizuális elemzés után használja fel újra a már származtatott közvetítői képkockákat, második videóletöltés vagy -kinyerés nélkül. Ehhez szükséges a kezelői `modalityBridgeVideoDrilldownEnabled=true`, a szigorú, részenkénti `drilldown: true`, valamint egy hitelesített API-kulcsrekord-azonosító. A kliens által deklarált principal- és munkamenetértékek soha nem alapozzák meg a tulajdonjogot. A három feltétel bármelyikének hiányában nem készít hash-t, nem méretez át és nem tart meg további képkockákat. A megőrzés sikertelensége megőrzi a használható vizuális választ. A hozzájárulással indított kérések megkerülik a teljes videó eredmény-gyorsítótárát, így a gyorsítótárazott eredmények soha nem adnak vissza újra handle-öket.

A sikeres JSON- és SSE-válaszok legfeljebb négy átlátszatlan handle-t tesznek közzé a korlátozott `x-omniroute-video-drilldown` fejlécben. Az engedélyezett böngésző-originok olvashatják ezt a fejlécet anélkül, hogy a CORS origin-házirendje szélesebbé válna. Az új handle-ök formátuma `v1.<32-byte random base64url token>`, a nyilvántartás pedig csak a hozzájuk tartozó SHA-256 hash-eket őrzi meg. Az olvasó-/fejléc-elemző a régi, 64 karakteres hexadecimális tokeneket is elfogadja. A hitelesített nyilvános fogyasztó a
`GET /api/v1/video-bridge/drilldown?handle=...`, amelyet egymástól függetlenül a
`modalityBridgeVideoDrilldownRemoteEnabled=true` engedélyez. A kifejezetten mentett false érték visszavonja a hozzáférést akkor is, ha a régi `OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_REMOTE_ENABLED` környezeti változóra épülő tartalék engedélyezve van. Az éles megőrzéshez hasonló módon használható a régi
`OMNIROUTE_VIDEO_BRIDGE_DRILLDOWN_ENABLED` tartalék. Mindkét tartalék alapértelmezés szerint ki van kapcsolva.

A fogyasztó a tulajdonjogot a hitelesített kulcsból származtatja, és alkalmazza a kulcs házirendjét: mind a GET, mind a DELETE a `video` végpontkategóriához tartozik, beleértve a `/v1` és `/api/v1` aliasokat is. A nem üres végpontengedélyezési listával rendelkező kulcsoknak tartalmazniuk kell a `video` elemet; a korlátozás nélküli kulcsok kompatibilisek maradnak. A fogyasztó ugyanazt a 404-es választ adja vissza az ismeretlen, lejárt és egy másik kulcshoz tartozó handle-ök esetén. Elfogadja a `variant=preview|standard|detail` értéket (legfeljebb 320/640/1280 méretű JPEG, nagyítás nélkül), a `limit=1..8` értéket (vagy a régi `frames` aliast, de a kettőt soha nem együtt), a nullától kezdődő `page` értéket, valamint az opcionális `start`/`end` fókuszidőt másodpercben. A többször előforduló lekérdezési kulcsokat és a fordított fókuszablakokat elutasítja. Minden visszaadott változat tartalmazza a tényleges tartalom hash-ét és a tényleges felbontás metaadatait, és kapcsolódik a megőrzött forráshoz. A változatok olvasáskor származnak, nem pedig további megőrzött példányokként tárolódnak. A JSON-válasz, beleértve a Base64-kódolást és a burkolót is, legfeljebb 32 MiB lehet; a túlméretes oldal 413-as választ ad, és a kliensnek kevesebb képkockát kell kérnie. Az olvasások minden átméretezés körül ellenőrzik a megszakítást, majd visszaadás előtt ismét ellenőrzik a handle érvényességét. A tulajdonos által végrehajtott `DELETE` idempotens; a törlés vagy a TTL lejárta felszabadítja a megőrzött forrást és a használati elszámolást.

A megosztott tároló folyamaton belüli: a handle-ök újraindításkor lejárnak, és nem ruházhatók át egymástól független OmniRoute-folyamatok között. A kezelési statisztikák az effektív megőrzési/távoli házirendet, valamint a megőrzött bejegyzések és bájtok összesített számát teszik közzé, médiát, hivatkozásokat, principal-azonosítókat vagy handle-öket azonban soha. A Video beállítási panel ezeket az értékeket megjeleníti, és mindkét hozzájárulási kapcsoló mentésére képes. Ez a megvalósítási dokumentáció nem élő telepítési vagy kiadási bizonyíték; a valós modellen végzett elfogadási tesztelést külön követik nyomon.

A képkockák feliratozása egymás után, a konfigurált Video modellel történik. Az üres Video-felülbírálás örökli a Vision beállítását; ha mindkettő üres, a Vision automatikus útválasztója választja ki az effektív, látásra képes modellt. A sikeres feliratok az eredeti részt stabil `[Video description:` előtaggal rendelkező szövegre cserélik, amely egyben a szöveget nem megbízható, médiából származó megfigyelésként jelöli, és tájékoztatja a downstream modelleket arról, hogy ne kövessék a médiában talált utasításokat. A képkockafelirat-gyorsítótár kulcsai tartalmazzák a JPEG bájtjait, a promptot, az időbélyeget és az effektív modellt; csak a sikeres feliratok kerülnek gyorsítótárba. A gyorsítótár-bejegyzések a ténylegesen sikeres előállító modellt őrzik meg, beleértve a tartalékmodellt is; a közvetítő `mixed` értéket jelent, ha a különböző képkockákat különböző modellek állították elő. A gyorsítótár-találat újra felhasználja az előállító azonosságát, ahelyett hogy a kért útválasztási terv címkéjével látná el. A teljes videó eredmény-gyorsítótárának kulcsa minden, a kimenetet módosító bemenetet tartalmaz — a promptot, az effektív modellt, a mintavételezési házirendet, a képkockák számát, a szemantikai elemzési módot, a normalizált fókusztipp SHA-256-ujjlenyomatát, a fókuszablakot, a `transcript` értéket, az `audioTranscript` értéket és a kontaktlap-jelzőt —, ezért e dimenziók bármelyikének módosítása gyorsítótárhibát eredményez, soha nem elavult újrafelhasználást. A vizuális deduplikációs házirend verziója, küszöbértéke és a korlátozott számú jelölt képkocka szintén kifejezetten szerepel az eredmény-gyorsítótár kulcsában és metaadataiban; így egy házirend-módosítás nem használhat fel újra elavult teljesvideó-leírást. Az eredmény-gyorsítótár v4 metaadatai megőrzik a módot és az ujjlenyomatot, a nyers felhasználói feladatot azonban soha. A védelmi korlátozások metaadatai a kért és az effektív elemzési módot is jelentik; a használható felhasználói szöveg nélküli, kért `focused` mód effektív értéke `full` lesz.

A védőkorlát minden támogatott videórészletet kinyer, de legfeljebb
`modalityBridgeVideoMaxVideos` darabot ír le. Olyan cél esetén, amelyről
bizonyított, hogy `supportsVideo === false`, a sikertelen és a korláton felüli
videók explicit, biztonságos szöveges jelölőkké válnak, így nem marad nyers
videó. Ismeretlen képesség esetén ezek a részek megtartják videóhordozójukat;
az esetleges tartalékátirat a fent ismertetett korlátozott szövegkonverziót
követi. A `supportsVideo === true` értékkel rendelkező célok megkerülik a
hidat.
Az ügyfélkérés megszakítási jele továbbterjed a letöltésen, a broker
során, az alfolyamatokon és a feliratkéréseken keresztül; a megszakítások
videók között leállítják a feldolgozást, és soha nem engednek át nyersen
médiafájlt.

A futásidejű beállításokat az adatbázis tárolja, és a Zod ellenőrzi:

| Kulcs                               | Alapértelmezett | Tartomány / működés                                                                                                          |
| ----------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`         | Opcionális futásidejű funkció, külön engedélyezendő                                                                          |
| `modalityBridgeVideoAnalysisMode`   | `"full"`        | A `full` megőrzi az általános feliratokat; a `focused` korlátozott, nem megbízható legutóbbi felhasználói kontextust használ |
| `modalityBridgeVideoModel`          | `""`            | A Vision Bridge modelljének öröklése                                                                                         |
| `modalityBridgeVideoFrameCount`     | `8`             | 1–16                                                                                                                         |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`     | `uniform`, `scene_aware` vagy arányos `segment_aware`; az érzékelő hibája esetén `uniform` használatos                       |
| `modalityBridgeVideoMaxVideos`      | `1`             | 1–4                                                                                                                          |
| `modalityBridgeVideoTimeout`        | `120000`        | 1000–120000 ms                                                                                                               |

A régebben mentett Video-időtúllépési értékeket 120 másodperc felett a broker
határidejére korlátozzuk; az új beállítások korlát feletti mentését elutasítjuk.
A `GET /api/modality-bridge/video/runtime` végpont a hitelesítés vagy a
futásidejű ellenőrzés előtt megbízható, bélyegzett loopback-helyi elérést
követel meg, ezt követően pedig kezelői hitelesítést. Csak az `available`
értéket, a megtisztított FFmpeg-/ffprobe-verziókat és egy rögzített indokot ad
vissza, ha a futtatókörnyezet nem érhető el. A belső kinyerési végpont nem
nyilvános feltöltési API: a sor telítettsége `503` értéket és `Retry-After`
fejlécet ad vissza, a hívó kapcsolatának megszakadása `499` értéket, a rögzített
broker-határidő pedig `504` értéket eredményez. A konvertált válaszok a központi
`x-omniroute-modality-bridge` fejlécben hozzáadják a
`video->text;model=<visionModel>;parts=<videos>` értéket, a Vision- vagy
Audio-szegmensek eltávolítása nélkül.

### PII maszkoló (`piiMasker.ts`)

Fut tovább **mindkét** szakaszaiban.

- **`preCall`** klónozza a hasznos terhet, bejárja `system`, `messages`, `input` és `prompt` (beleértve a sima karakterlánc-elemeket), és alkalmazza `processPII()` ( `@/shared/utils/inputSanitizer` ből) a karakterlánc `content`/`text` mezőire. Amikor `PII_REDACTION_ENABLED=true`, az észlelt PII redukálódik a kimenő hasznos adatban. Ez független `INPUT_SANITIZER_MODE` től (amely csak az azonnali befecskendezési szabályzatot szabályozza). Ha a szerkesztés ki van kapcsolva, a hívás tartalom átírása nélkül rögzíti az észlelési számokat.
- **`postCall`** mélyen klónozza a választ, lefuttatja `sanitizePIIResponse()` és a Responses-API-alakmaszkert (`maskResponsesOutput` — lefedi `output_text` és `output[].content[].text`). Ha bármilyen szerkesztés történik, a módosított válasz lecseréli az eredetit.

A védőkorlát soha nem blokkol; csak annotál (`meta.detections`, `meta.redacted`) vagy ír át.

#### Típusonkénti kiválasztás, egyedi minták és észlelési számlálók

**Irányítópult → beállítások → Biztonság → PII maszkolás** kiválasztja, hogy _mi_ legyen maszkolva. Nem kapcsolja be a maszkolást: ez továbbra is `PII_REDACTION_ENABLED` (kérelem) és `PII_RESPONSE_SANITIZATION` ( + SSE válasz), alapértelmezés szerint mindkettő ki van kapcsolva.

- **Típusonkénti kiválasztás** — A beépített azonosítók `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) vannak felsorolva. Az Unset minden típust jelent (a beállítás előtti viselkedés). A kérésmotor `ssn_us` mintája a `ssn` van leképezve. A sablonok (Minimális, Normál, Pénzügyi, Brazil, USA, GDPR, POPIA, Teljes) csak a UI jelölőnégyzeteit töltik ki.
- **GDPR és POPIA azonosítók** — tizenkét beépített azonosítója EU és a dél-afrikai személyi azonosítókra vonatkozik (az alábbi táblázat). Regexeik, érvényesítőik és joghatósági címkéik egy táblában, `src/shared/utils/piiPatterns.ts` ben élnek, amelyet a válasz-fertőtlenítő (`src/lib/piiSanitizer.ts`) és a kérésmaszkoló (`src/shared/utils/inputSanitizer.ts`) is felhasznál. Egy egyezés csak akkor törlődik, ha az érvényesítője elfogadja; egy puszta számjegysorozat sosem elég. Az az operátor, aki az azonosítók létezése előtt mentett egy szűkített kijelölést, az új azonosítók bejelöléséig megtartja a korábbi viselkedését.
- **Egyedi minták** — legfeljebb 20 regex vagy helyettesítő karakter minta (`*` = legfeljebb 64 nem szóköz karakter, `?` = egy). A mérkőzésekből `[CUSTOM_REDACTED]` lesz. Minden minta átmegy `compilePiiCustomPattern()` (`src/shared/utils/piiCustomPatterns.ts`): legfeljebb 500 karakter, a jelzők `g i m s u` re korlátozódnak, le kell fordítani, át kell mennie `safe-regex` (katasztrofális visszalépés), és nem egyezhet üres karakterlánccal vagy szerkesztési helyőrzővel. A meghibásodott mintát a rendszer visszautasítja mentéskor és teszteléskor, és a meghibásodott tárolt sort a rendszer kihagyja futás közben a fordítás helyett. Az egyéni minták csak akkor futnak, ha a maszkolás be van kapcsolva.
- **Érzékelési számlálók** — típusonkénti számlálások (soha nem egyeztetett értékek), a memóriában tárolva és újraindításkor visszaállítva (`src/lib/pii/piiDetectionStats.ts`). Csak akkor nőnek, ha a maszkolás be van kapcsolva.

A beállítások a `key_value` táblában élnek (névtér `pii_settings`, `src/lib/db/piiSettings.ts`), és egy 1 s gyorsítótáron keresztül olvashatók be. API:

| Metódus | Útvonal                  | Cél                                                                          |
| ------- | ------------------------ | ---------------------------------------------------------------------------- |
| `GET`   | `/api/settings/pii`      | Jelző állapota, `enabledTypes`, `customPatterns`, észlelési számlálók        |
| `PUT`   | `/api/settings/pii`      | Az `enabledTypes` (`null` = mind) és/vagy a `customPatterns` lecserélése     |
| `POST`  | `/api/settings/pii/test` | Egy minta próbaillesztése egy legfeljebb 8 KB-os mintán; semmi nem tárolódik |

Mindhárom kezelési hitelesítést igényel, és a szervezetet Zod val (`src/shared/validation/schemas/piiSettings.ts`) kell érvényesíteni. Ha a bejelentkezés le van tiltva (`requireLogin=false`), `GET` és a tesztvégpont nyitva van, de `PUT` továbbra is szüksége van egy irányítópult-munkamenetre, egy `manage` -scope API kulcsra, egy írási hatókörű vagy magasabb `oma_` hozzáférési jogkivonatra, vagy a visszahurkolásból küldött CLI jogkivonatra vagy belső szolgáltatási tokenre.

#### GDPR (EU) és POPIA (Dél-Afrika) azonosítók

| Azonosító           | Azonosító típusa          | Ellenőrzés                                                                                            |
| ------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `iban`              | IBAN                      | Ismert ország, az adott országra érvényes pontos hossz, ISO 13616 MOD-97-10                           |
| `eu_vat`            | Uniós adószám             | Ismert tagállami előtag és az adott állam számformátuma (VIES-lekérdezés nélkül)                      |
| `es_dni_nie`        | Spanyol DNI / NIE         | Ellenőrző betű (érték modulo 23); a NIE formátuma `X/Y/Z` + 7 számjegy                                |
| `it_codice_fiscale` | Olasz Codice Fiscale      | Ellenőrző betű a páratlan/páros pozíciók táblái alapján                                               |
| `pl_pesel`          | Lengyel PESEL             | Súlyozott ellenőrzőösszeg és a kódolt születési hónap/nap hihető tartományai                          |
| `nl_bsn`            | Holland BSN               | 11-próba (súlyok: 9..2, -1)                                                                           |
| `de_steuer_id`      | Német Steuer-ID           | ISO 7064 Mod 11,10 és a számjegyszerkezeti szabályok (nem kezdődhet 0-val)                            |
| `se_personnummer`   | Svéd personnummer         | Luhn-ellenőrzés az utolsó tíz számjegyen és hihető születési dátum (10 vagy 12 számjegy)              |
| `za_id`             | Dél-afrikai személyi szám | Luhn-ellenőrzés mind a 13 számjegyen, érvényes születési hónap/nap, 0 vagy 1 állampolgársági számjegy |
| `za_phone`          | Dél-afrikai telefonszám   | `+27` / `27` előtag, vagy a nemzeti `0..` forma szóközzel vagy kötőjellel írva                        |
| `za_vat`            | Dél-afrikai adószám       | 10 számjegy, az elején `4`, **és** "VAT" / "BTW" az előző 48 karakteren belül                         |
| `za_tax_ref`        | Dél-afrikai adóhivatkozás | 10 számjegy, az elején `0`-`3`, Luhn-ellenőrzés, **és** "tax" / "SARS" az előző 48 karakteren belül   |

Mivel a csak számjegyet tartalmazó formátumok ütköznek a rendelési számokkal, buildszámokkal és időbélyegekkel, a leggyengébbeknek (`za_vat`, `za_tax_ref`) szükségük van a kulcsszóra, és a csupasz tízjegyű `0..` számot nem kezeljük dél-afrikai telefonszámként. A szóközzel ellátott IBANs (`GB29 NWBK ...`) nem egyezik. A streaming útvonalon a cue csak az aktuális darabon belül néz ki. Az azonosítók az általános telefonminták előtt helyezkednek el, így az érvényesített azonosító megtartja a saját helyőrzőjét (`[IBAN_REDACTED]`, `[NL_BSN_REDACTED]`, ...). A `gdpr` és `popia` sablonok a EU és a dél-afrikai azonosítókat választják ki. Maga a maszkolás kötelező marad (Hard Rule #20): itt semmi sem változtatja meg a funkciójelző alapértelmezett beállításait.

### Promptinjektálás (`promptInjection.ts`)

Észleli a felhasználó által megadott tartalomban található ellenséges struktúrákat, és érvényesíti a
konfigurált szabályzatot. A működést környezeti változók és konstruktor-
beállítások vezérlik:

| Beállítás         | Környezeti változó                                                                                       | Alapértelmezés | Hatás                                                                                                                                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Engedélyezve      | `INPUT_SANITIZER_ENABLED`                                                                                | `true`         | `false` esetén a védelmi mechanizmus rövidre zárja a működését.                                                                                                                                                                    |
| Mód               | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                          | `warn`         | Injektálási szabályzat: `block`, `warn` vagy `log`. (A `redact` a visszamenőleges kompatibilitás érdekében elfogadott, de **nem** távolítja el az injektált szöveget; a kérés PII-átírását a `PII_REDACTION_ENABLED` szabályozza.) |
| Blokkolási küszöb | `blockThreshold` beállítás / `INPUT_SANITIZER_BLOCK_THRESHOLD` (`INJECTION_GUARD_BLOCK_THRESHOLD` álnév) | `high`         | A blokkoláshoz szükséges minimális súlyosság. Alapértelmezés szerint a közepes súlyosság csak megfigyelésre szolgál.                                                                                                               |

**Módprecedencia** (`getMode`): a hívó `options.mode` értéke →
az `INJECTION_GUARD_MODE` **adatbázisbeli funkciójelző-felülbírálása** (Vezérlőpult → Beállítások →
Funkciójelzők) → `INJECTION_GUARD_MODE` környezeti változó → `INPUT_SANITIZER_MODE` környezeti változó →
`warn`. A vezérlőpulti felülbírálás ezért elsőbbséget élvez a környezeti változókkal szemben, így a Funkciójelzők
felhasználói felület élőben vezérli a futó védelmet (újraindítás nélkül). Az adatbázis-olvasás hibabiztos:
hiba esetén a védelem visszatér a környezeti változókon alapuló működéshez, és ha nincs
beállítva felülbírálás, a működés megegyezik a kizárólag környezeti változókon alapuló feloldással.

Észlelési források:

1. `sanitizeRequest()` az `@/shared/utils/inputSanitizer` modulból (a folyamat más részein is
   használt közös detektorkészlet).
2. Beépített `DEFAULT_GUARD_PATTERNS` (jelenleg `system_override_inline` és
   `markdown_system_block`, mindkettő `high` súlyosságú).
3. A konstruktor beállításain keresztül átadott opcionális `customPatterns` (karakterláncok, reguláris kifejezések
   vagy `{ name, pattern, severity }` rekordok).

Ha `mode === "block"` **és** legalább egy észlelés eléri a súlyossági
küszöböt, a `preCall` a következőt adja vissza: `{ block: true, message: "Request rejected:
suspicious content detected" }`. `warn`/`log` módban a védelmi mechanizmus naplózza az eseményt, de
engedélyezi a hívást. Az `evaluatePromptInjection()` közös segédfüggvény szintén exportálva van
azon hívók számára, amelyek a registry használata nélkül szeretnék kiértékelni a promptokat.

**Vizsgálati korlát (v3.8.20):** a detektor az összefűzött promptszövegnek csak az **első 16 KB-ját**
vizsgálja — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bájt) az
`src/shared/utils/inputSanitizer.ts` fájlban. A `detectInjection()` és az
`evaluatePromptInjection()` egyaránt `slice(0, MAX_INJECTION_SCAN_BYTES)` műveletet hajt végre a
mintahurok futtatása előtt. Az injektálási utasítások a bemenet elejéhez közel helyezkednek el, így ez
korlátozza a reguláris kifejezések CPU-/GC-terhelését a több száz KB-os adatoknál anélkül, hogy gyengítené az észlelést (lásd:
#3932, #4041).

### Hitelesítőadat-maszkoló (`credentialMasker.ts`)

**Mindkét** szakaszban fut, az alapértelmezett lánc utolsó elemeként (`95` prioritással). Kitakarja
a jól ismert API-kulcs- és titkostoken-mintákat a kimenő adatokból (az üzenetek
tartalmából, az eszközhívások argumentumaiból és az eszközök eredményeiből), **valamint** a szolgáltató válaszából, így a
promptba beillesztett (vagy egy eszközeredmény által visszaadott) hitelesítőadat nem szivárog ki
a külső szolgáltatóhoz vagy vissza az ügyfélhez.

- **Csak külön engedélyezéssel**, a PII-kitakarással megegyező konvenció szerint (a #20. szigorú szabályhoz kapcsolódóan):
  le van tiltva, kivéve, ha `settings.credentialRedactionEnabled === true` **vagy**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kikapcsolt állapotban a védelmi mechanizmus nem végez műveletet —
  soha nem blokkol és soha nem ír át semmit.
- A `redactCredentials()` bejárja a teljes adat-/válaszfát (`walkValue()`,
  prototípus-szennyezés ellen védett, a `WeakSet` révén ciklusbiztos), és az egyezéseket
  `[REDACTED:<type>]` helyőrzőre cseréli, miközben csak a ténylegesen
  megváltozott ágakat klónozza.
- A `CREDENTIAL_PATTERNS` lefedi az LLM-szolgáltatók kulcsait (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), a VCS-/SaaS-tokeneket (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), a fizetési kulcsokat (Stripe, Square), a felhőszolgáltatási
  kulcsokat (AWS-hozzáférési kulcs, Twilio, SendGrid, Mailgun), a privát kulcsokat/JWT-ket,
  a hitelesítőadatokat tartalmazó kapcsolati karakterláncokat (`mongodb://user:pass@...` stb.), valamint
  egy általános `Authorization`/`x-api-key`/`api-key`/`apikey` fejlécérték-
  mintát. A fejléc formájú kulcsok (`authorization`, `x-api-key`, `api-key`,
  `apikey`) strukturálisan kerülnek kitakarásra (csak az érték, miközben az olyan séma-előtagok, mint a
  `Bearer `/`Basic `, megmaradnak), nem pedig az általános szöveges reguláris kifejezéssel.
- A védelmi mechanizmus soha nem blokkol; csak átír (`modifiedPayload` /
  `modifiedResponse`) és megjegyzésekkel lát el (`meta.credentialsRedacted`, `meta.count`).

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
