# Guardrails (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Hiteles forrás:** `src/lib/guardrails/`
> **Legutóbb frissítve:** 2026-08-29 — v3.8.51 (a Video Bridge átiratának eredetét a hívó deklarálja,
> a szerver még nem ellenőrzi — pontosítva a #11661 alapján)

A guardrailek biztonsági, szabályzati és tartalomátalakítási előírásokat érvényesítenek az OmniRoute és a külső szolgáltatók közötti határon. Minden guardrail megvizsgálhatja (és opcionálisan elutasíthatja, átalakíthatja vagy annotálhatja) a kérés hasznos adatait (`preCall`) és a külső szolgáltatók válaszait (`postCall`).

A rendszer **hiba esetén nyitott**: ha egy guardrail végrehajtás közben kivételt dob, a regisztrációs adatbázis rögzíti a hibát, és a kérés meghiúsítása helyett a következő guardraillel folytatja. A blokkolás mindig explicit döntés (`block: true`), soha nem véletlen.

## Beépített védőkorlátok

A regisztrációs rendszer importáláskor prioritási sorrendben automatikusan betölt hat védőkorlátot
(lásd: `registry.ts` → `registerDefaultGuardrails()`):

| Prioritás | Név                 | Fázis(ok)      | Fájl                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Az alacsonyabb prioritási számok futnak le **először**.

### Képi híd (`visionBridge.ts`) — Modalitási híd PR-1

Elfogja a **képi képességgel nem rendelkező modelleknek** szánt, képeket tartalmazó kéréseket, majd vagy
átirányítja a teljes kérést egy képi képességgel rendelkező modellhez, vagy a kép
részeit egy konfigurálható képi modell által előállított szöveges leírásokra cseréli a
felfelé irányuló hívás előtt. Ez lehetővé teszi, hogy a csak szöveges szolgáltatók átlátható módon kezeljék
a multimodális hasznos adatokat.

Folyamat:

1. Kihagyás, ha a célmodell már támogatja a képi bemenetet (kivéve, ha szerepel az
   `isVisionBridgeForcedModel` kényszerített hídlási listán).
2. A képrészek kinyerése az `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`) segítségével, amely az **egységes médiaészlelőre**,
   az `open-sse/utils/mediaParts.ts` fájlban található `detectMediaParts()` függvényre bízza a feladatot — ez
   a kombinált kompatibilitási szűrővel megosztott egyetlen hiteles forrás.
   A kinyerés azon felső szintű részek engedélyezési listájára korlátozódik, amelyeket a
   `replaceImageParts` vissza tud illeszteni (a kinyerés↔csere szerződés): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` és Responses API `input_image`. A beágyazott találatok és
   a csak jelzőként szolgáló alakzatok a kombinált szűrőhöz tartoznak, és soha nem kerülnek kinyerésre.
   Kihagyás, ha egyik sem található.
3. A futásidejű konfiguráció feloldása a `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) segítségével: az új `modalityBridge*`
   beállításkulcsok élveznek elsőbbséget; a korábbi `visionBridge*` kulcsok **egy cikluson át
   tartalékmegoldásként** maradnak meg (visszaállítási időablak). Ha a híd le van tiltva, a rendszer még a
   médiabejárás előtt kihagyja a feldolgozást.
4. A módválasztó (`modalityBridgeVisionMode`, lásd az alábbi táblázatot) dönti el,
   hogy átirányítás vagy leírás történjen. Az átirányítás `modifiedPayload` értéket ad vissza, amelyben csak a `model`
   van lecserélve, valamint a következő metaadatokat: `{ rerouted, fromModel, toModel, imagesKept }`.
5. Leírási útvonal: a képek számának korlátozása `maxImages` értékre, a feladattudatos prompt összeállítása,
   a leírási gyorsítótár ellenőrzése, a képi modell **párhuzamos** meghívása
   (`Promise.allSettled`), majd `[Image N]: <description>` szövegrészek beillesztése
   a képek helyére. Egy sikertelen leírás `null` értéket eredményez, és az eredeti képrész
   **megmarad** (#4012) — kivéve a kombinált leírási útvonalat, amikor minden
   leírás sikertelen; ekkor egy igazoltan képi képesség nélküli upstream egy
   `(nem érhető el — nincs csatlakoztatva képi képességgel rendelkező szolgáltató)` helyőrzőt kap (#8430).
6. A `modifiedPayload` és a metaadatok (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) visszaadása.

#### Módválasztó (`modalityBridgeVisionMode`)

| Mód        | Alapértelmezett | Viselkedés                                                                                                                                                                                                                                                                                                                                           |
| ---------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔               | Változatlan korábbi heurisztika (#6640/#7204): a nem kombinált/`auto/` modelleket a legjobb képi modellhez irányítja át, kivéve, ha az eredeti modell már rendelkezik használható hitelesítő adatokkal (ekkor leírást készít); a kombinált céloknál mindig leírást készít.                                                                           |
| `describe` |                 | Mindig leírást készít — az átirányítási blokkot teljesen kihagyja; mindig a felhasználó által kiválasztott modell válaszol.                                                                                                                                                                                                                          |
| `reroute`  |                 | Kényszerített átirányítás: megkerüli a hitelesítő adatokkal rendelkező modell megtartását biztosító ellenőrzést. Az átirányítási **cél** hitelesítőadat-ellenőrzése továbbra is érvényes — ha nincs használható képi célmodell, a kérés a leírási útvonalra kerül, így a nyers képek soha nem jutnak el egy csak szöveges háttérrendszerhez (#8430). |

A kényszerített módok **azelőtt** rövidre zárják a folyamatot, hogy az automatikus heurisztika lefutna; az `auto` viselkedése
bájtról bájtra megegyezik a PR-1 előtti védőkorlátéval.

#### API-kulcs hatóköre (`visionBridgeKeyScope.ts`)

Ha a hívó API-kulcsa korlátozza az `allowedConnections` értékeket, a kvótakészleteket
(`allowedQuotas`) vagy a modelleket (`allowedModels` / `blockedModels` /
`modelAccessMode: "restricted"` / `disableNonPublicModels`), a híd csak olyan
átirányítási és leírási modelleket választ, amelyeket a kulcs használhat, mégpedig olyan kapcsolatokon, amelyeket a kulcs
szintén használhat. A leírási hívás ezután mindig az OmniRoute önmagába visszatérő hurkán keresztül történik,
az `x-omniroute-self-loop-key-id` fejléccel, így a fogadó csevegési kérés
ismét kikényszeríti az adott kulcs kapcsolati és modellhasználati szabályzatát. Az `enforceApiKeyPolicy()`
csak az önmagába visszatérő hurok bearer hitelesítőjével együtt veszi figyelembe ezt a fejlécet, így az csak
szűkítheti a hozzáférést, a fel nem oldható azonosító pedig elutasításra kerül.

Ha a kulcshoz egyetlen képi modell sem engedélyezett, a leírási útvonal félreáll, és
a kérés változatlanul halad tovább, ugyanazzal a nyitott hibakezelési viselkedéssel, mint egy letiltott
védőkorlátnál (metaadatok: `{ skipped: true, reason: "no_permitted_vision_model" }`).
A kulcs nélküli kérések, valamint az ilyen korlátozások nélküli kulcsok pontosan ugyanúgy
viselkednek, mint korábban.

#### Feladattudatos leírási prompt (`modalityBridgeVisionTaskAware`)

Alapértelmezés szerint **true**. A `composeVisionPrompt()` (`visionBridgeHelpers.ts`) hozzáfűzi az **utolsó felhasználói üzenet** szövegét (500 karakterre csonkítva) az alap leíró prompthoz, így a leírást a felhasználó tényleges kérdésének irányába tereli (codex-vision-proxy minta), és arra kéri a látásmodellt, hogy írja át a látható szöveget. Ha a jelző ki van kapcsolva — vagy nincs felhasználói szöveg —, az alapprompt változatlanul lesz használva.

A leíró önhurok saját OpenAI-kompatibilis kérése (`callVisionModelSingle()`
a `visionBridgeHelpers.ts` fájlban) mindig az `image_url.detail: "high"` értéket kéri —
feltétel nélkül, minden hívóhoz/szolgáltatóhoz, bármilyen kliensjelzéstől függetlenül.
Az alacsony részletességű mintavételezés éppen annál a szövegátírási
feladatnál rontja az OCR pontosságát, amelyet ez a prompt kér, ezért maga a leíró
hívás mindig nagy részletességet kér, függetlenül az eredeti bejövő kérés által
használt részletességi szinttől. Ez csak a belső leíró kérés törzsét érinti; nem
módosítja azt, ahogyan az OmniRoute továbbítja a hívó saját `image_url.detail`
értékét az elsődleges kérésben — ez az alapértelmezés külön kerül alkalmazásra,
és csak az észlelt OpenCode klienseknél, a `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`) függvényben. A leíró önhurok
Anthropic vezetékformátumú ágában nincs `detail` mező, így egyik alapértelmezés
sem érinti.

#### A leírás kimeneti korlátja (`modalityBridgeVisionMaxChars`)

| Kulcs                          | Alapértelmezés | Tartomány          |
| ------------------------------ | -------------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`            | `0` vagy 100–50000 |

A `0` (alapértelmezés) azt jelenti, hogy **nincs korlát** — a
`callVisionModel()` által visszaadott leírás módosítás nélkül továbbításra
kerül, megőrizve a jelenlegi működést. A 100–50000 tartományba eső bármely
érték `…` utótaggal csonkítja a leírást, mielőtt az `[Image N]: <description>`
formában visszaillesztésre kerül
(`VisionBridgeGuardrail.preCall()` a `src/lib/guardrails/visionBridge.ts`
fájlban). Növelje ezt a részletgazdag OCR-feladatokhoz, ahol a következő modellnek
a teljes átiratra van szüksége; csökkentse a bőbeszédű látásmodellek
tokenhasználatának korlátozásához. Az irányítópult mezője a Vision lap Advanced
paneljén található (`modality-bridge-max-chars` a `ModalityBridgeVisionTab.tsx`
fájlban), és az 1 és 99 közötti értékeket a 100-as alsó korlátra emeli, miközben
a kifejezetten megadott `0` értéket érintetlenül hagyja — a `0` önmagában is
érvényes Zod-érték
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), nem csupán
a „nincs beállítva” alapértelmezés.

#### Leírás-gyorsítótár (`modalityBridge/bridgeCache.ts`)

Memórián belüli LRU + TTL gyorsítótár a leírási kimenetekhez, amely az egész
folyamatban megosztott.
Kulcs = `sha256(imageRef + composedPrompt + configuredBridgeModel)`,
hosszelőtag-alapú keretezéssel (nincsenek mezőhatár-ütközések). A modellkomponens
a **konfigurált** hídmodell, nem pedig az a modell, amely ténylegesen válaszolt —
a `callVisionModel` belsőleg tartalékmodellre válthat, és a próbálkozásonkénti
kulcsképzés széttagolná a gyorsítótárat. A sikertelen leírások soha nem kerülnek
gyorsítótárba. Beállítások:

| Kulcs                           | Alapértelmezés | Tartomány |
| ------------------------------- | -------------- | --------- |
| `modalityBridgeCacheEnabled`    | `true`         | —         |
| `modalityBridgeCacheTtlMinutes` | `60`           | 1–1440    |
| `modalityBridgeCacheMaxEntries` | `200`          | 10–5000   |

#### Távoli képek normalizálása (önhurok-leírás/base64-lekérés)

Amikor a híd maga kér le egy **távoli** képet — az Anthropic leíró önhívás és
a claude vezetékformátumú base64-konverzió
(`ensureBase64ImagesForClaudeWire`), mindkettő a
`visionBridgeHelpers.ts` fájlban található `fetchRemoteImageAsDataUri()`
függvényen keresztül —, az eredményül kapott adat-URI a `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) függvényen halad át, mielőtt beágyazásra
kerülne a látásmodell kérésébe. A túlméretezett képek **2048px hosszú élre**
lesznek lekicsinyítve (az OpenAI/Anthropic által már kiszolgálóoldalon alkalmazott
átméretezési korlátnak megfelelően), ami csökkenti a feltöltött adatmennyiséget
és a késleltetést anélkül, hogy megváltoztatná azt, amit a látásmodell lát.
Az átméretezés dinamikus importtal betöltött `sharp` használatával történik:
olyan platformon, ahol a natív bináris betöltése sikertelen, a
`normalizeDataUri()` **soha nem dob kivételt** — visszaáll az eredeti bájtok
változatlan továbbítására, így a leírási/base64-konverziós útvonal mindig
működőképes marad. A nem képi bájtok (olyan lekérés, amely nem dekódolható képet
adott vissza) szintén érintetlenül kerülnek továbbításra. Ez a normalizálás azokra
a képekre korlátozódik, amelyeket a híd a saját önhívásához kér le — soha nem
alkalmazza a hívó nyers, változatlanul továbbított hasznos adataira, összhangban
a kizárólag kifejezett engedélyhez kötött módosítás elvével (20. szigorú szabály).

#### Beállítási séma + migráció

Az új `modalityBridge*` kulcsokat Zod validálja az `updateSettingsSchema`
sémában (`src/shared/validation/settingsSchemas.ts`):
`modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, a `modalityBridgeCache*` hármas, valamint az
Audio Bridge által használt `modalityBridgeAudio*` csoport. A
`141_modality_bridge_settings.sql` migráció a meglévő örökölt
`visionBridge*` értékeket a megfelelő új kulcsokba másolja (idempotens, és soha
nem ír felül egy üzemeltető által beállított `modalityBridge*` értéket); az
örökölt kulcsok egy kiadási cikluson át továbbra is elfogadottak maradnak
olvasási tartalékként.

#### Átláthatósági fejléc + statisztikák

A leírássá alakított válaszok az
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
fejlécet hordozzák (a `buildModalityBridgeHeader()` állítja össze a
`modalityBridge/bridgeStats.ts` fájlban, és a `withModalityBridgeHeader()` adja
hozzá a `src/sse/handlers/chatHelpers.ts` fájlban).
Az átirányított kérések **nem** kapnak fejlécet — a hasznos adat érintetlen
maradt, a modellcsere pedig már látható a választörzs `model` mezőjében.

A `GET /api/modality-bridge/stats` végpont (kezelői hitelesítéssel, a
`GET /api/settings` végponttal azonos szinten) visszaadja a memóriában tárolt,
modalitásonkénti
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` számlálókat a `vision`, `audio` és
`video` modalitásokhoz. Az `averageLatencyMs` nevezője a `latencySamples`, nem
pedig az összes próbálkozás; az időmérés nélküli műveletekhez nem hoz létre
mesterségesen nulla ezredmásodperces mintát. A `bridged` továbbra is a sikeres
konverziók visszafelé kompatibilis álneve; a sikertelen próbálkozások nem növelik.
A számlálók a folyamat újraindításakor szándékosan nullázódnak
(telemetria, nem elszámolás).

#### Az irányítópult konfigurációja

A dedikált irányítópultoldal a
`/dashboard/settings/modality-bridge`. Az URL-ből címezhető `Vision`, `Audio`
és `Video` lapjai a `tab` értékének váltásakor megőrzik a lekérdezési
paramétereket. A Vision lapon beállítható az engedélyezés, az üzemmód, a
modellkiválasztás (az automatikus alapértelmezést is beleértve), a feladattudatos
promptolás, valamint a speciális időtúllépési, kép-, leíráshossz- és
gyorsítótár-korlátok; továbbá megjelennek a futásidejű
számlálók, és egy védelemmel ellátott mintakérés is indítható. Az Audio lap
szintén működőképes: beállítható rajta az engedélyezés, egy kizárólag STT-modelleket
tartalmazó, Auto opcióval ellátott modellválasztó, az időtúllépési és maximális
kliphossz-korlátok, megjelennek a hangszámlálók, valamint elérhető egy
`input_audio` mintateszt. A Video lap működőképes: jelzi az FFmpeg/ffprobe
futásidejű állapotát, amely négy explicit felhasználói felületi állapot egyike
lehet (`unknown`, amíg a vizsgálat folyamatban van, vagy nem fejezhető be;
`restricted`, ha az irányítópult nem loopback gazdagépen fut, ezért a vizsgálat
kliensoldalon kimarad; `unavailable`, ha a vizsgálat megtörtént, és megerősítette
a hiányt; vagy `available`, az FFmpeg/ffprobe verzióival), tartósan menti az
engedélyezési, modell-, képkocka-, videó- és időtúllépési korlátokat, a
modellválasztót a képfeldolgozásra képes modellekre szűri, és megjeleníti a
videószámlálókat.

Az AI-beállítások alatti korábbi Vision Bridge kártya kompatibilitási
hivatkozásként az új oldalra mutat; már nem tartalmazza az űrlap egy második
példányát. A Media Providers az Image-to-Text és Speech-to-Text munkafolyamatokat
is a megfelelő Modality Bridge lapokhoz kapcsolja, a meglévő Speech-to-Text
tesztkörnyezet eltávolítása nélkül.

**Az önhurok beléptetésének megkerülése:** amikor a leíró hívás az OmniRoute
saját `/v1` önhurkán keresztül halad (nem szabványos szolgáltatói modell), az
alkérés elküldi az `x-omniroute-admission-bypass: internal` fejlécet, és a
feloldott önhurok-hitelesítő adattal hitelesíti magát — helyi módban a helyi
`sk_omniroute` jelzőértékkel, máskülönben az operátor által konfigurált
`OMNIROUTE_API_KEY` / `ROUTER_API_KEY` környezeti kulccsal (#1350), így a
`REQUIRE_API_KEY=true` telepítések továbbra is végrehajthatják a leíró hívást.
A megkerülést kizárólag ezekkel a pontos hitelesítő adatokkal fogadja el a
rendszer, így külső kliensek nem használhatják a fejlécet a beléptetés
kihagyására.

A korábbi alapértelmezések a `src/shared/constants/visionBridgeDefaults.ts`
fájlban találhatók; az új üzemmód-, feladattudatos és gyorsítótár-alapértelmezések,
valamint a beállításfeloldó a
`src/shared/constants/modalityBridgeDefaults.ts` fájlban található. A védőkorlát
egy `deps` konstruktoropciót biztosít, hogy a tesztek hamis `getSettings` és
`callVisionModel` implementációkat injektálhassanak.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

A hangot tartalmazó csevegési kéréseket még azelőtt elfogja, hogy elérnének egy
olyan célpontot, amelyről nem ismert, hogy fogad hangbemenetet. A csevegési
kérést soha nem irányítja át: a hangrészek átírása a meglévő, OpenAI-kompatibilis
többrészes végponton keresztül történik, majd a kiválasztott csevegési modell a
szöveges átiratokkal folytatja a feldolgozást.

Folyamat:

1. A `supportsAudio` feloldása a `getResolvedModelCapabilities()` segítségével
   történik. Elsőbbséget élveznek az explicit szolgáltatóregiszter-metaadatok,
   majd a statikus modellmetaadatok, végül a szinkronizált `modalities_input`.
   Az `audio` értéket nem tartalmazó deklarált bemeneti lista eredménye `false`;
   ha nem áll rendelkezésre képességre utaló bizonyíték, az eredmény `null`.
   A konzervatív hidat a `false` és a `null` egyaránt aktiválja, míg a `true`
   megkerüli.
2. A `modalityBridgeAudio*` beállítások feloldása, majd minden üzenetből a
   kivágható legfelső szintű hangrészek kinyerése a megosztott
   `detectMediaParts()` detektorral. A támogatott átviteli formák az OpenAI-féle
   `input_audio`, az `audio_url`, valamint a `source.media_type: "audio/*"`.
   A rendszer az útválasztáshoz észleli a beágyazott hangot, de a kivágási
   útvonal nem távolítja el. A feldolgozható elemek számát a
   `modalityBridgeAudioMaxClips` korlátozza; a későbbi részek változatlanok
   maradnak.
3. Egy konfigurált `provider/model` használata, vagy annak engedélyezése, hogy a
   `selectAudioBridgeModel()` stabil katalógussorrendben végigjárja az
   `AUDIO_TRANSCRIPTION_PROVIDERS` elemeit, és kiválassza az első olyan modellt,
   amelyhez használható aktív szolgáltatói hitelesítő adat tartozik.
4. A `callAudioTranscription()` a base64/data-URI formátumú hangot többrészes
   `file` mezővé alakítja, vagy a kizárólag nyilvános célpontokat engedélyező,
   DNS-rögzítést és 25 MB-os korlátot alkalmazó kimenő forgalmi védelmen
   keresztül letölti a távoli `audio_url` erőforrást. Ezután POST kéréssel
   elküldi a fájlt és a kiválasztott modellt a helyi
   `/v1/audio/transcriptions` önhuroknak, a `resolveSelfLoopBearer()`
   segítségével hitelesítve. A meglévő átírási útvonal végzi el a szokásos
   hitelesítőadat-keresést, a várakozási idő és sebességkorlátozás kezelését,
   valamint a szolgáltatóhoz történő továbbítást.
5. A sikeres hívások a megfelelő részeket `[Audio N]: <transcript>` értékre
   cserélik. A hívások a `Promise.allSettled` használatával futnak: egy adott
   hívás sikertelensége esetén az eredeti hangrész megmarad (#4012 szerződés).
   Ha minden hívás sikertelen, és bizonyított, hogy a célpontnál
   `supportsAudio === false`, a részek értéke
   `[Audio N]: (unavailable — no STT provider connected)` lesz (#8430
   szerződés). Ismeretlen célpont (`null`) esetén, ha minden hívás sikertelen,
   az eredeti tartalom változatlan marad. Az olyan, bizonyítottan csak szöveget
   kezelő célpont, amelyhez nincs használható STT-hitelesítő adat, hálózati
   hívás indítása nélkül ugyanezt az explicit helyettesítő szöveget kapja.

A sikeres átiratok a folyamatszintű Modality Bridge LRU/TTL gyorsítótárat
használják. A kulcs a hanghivatkozásból, a stabil `audio-transcription`
műveletcímkéből és a kiválasztott STT-modellből áll; a hibák soha nem kerülnek
gyorsítótárba. A hangfeldolgozási próbálkozások frissítik a megosztott
`bridged`, `cacheHits`, `failures` és `lastUsedAt` számlálókat.
Az átalakított válaszok tartalmazzák az
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` fejlécet;
a változatlanul hagyott kérések nem kapnak Audio Bridge-szegmenst.

A futásidejű beállításokat az adatbázis tárolja, és Zod-validáció védi:

| Kulcs                         | Alapértelmezett | Tartomány        |
| ----------------------------- | --------------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`          | —                |
| `modalityBridgeAudioModel`    | `""`            | Auto vagy STT ID |
| `modalityBridgeAudioTimeout`  | `60000`         | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`             | 1–10             |

A megosztott gyorsítótárat továbbra is a `modalityBridgeCacheEnabled`,
a `modalityBridgeCacheTtlMinutes` és a `modalityBridgeCacheMaxEntries` vezérli.

### Videóhíd (`videoBridge.ts`, `videoBridgePipeline.ts`)

Elfogja a Chat Completions `messages` és a Responses API `input` legfelső szintű
videórészeit, mielőtt a rendszer meghívna egy olyan célmodellt, amelyről nem
ismert, hogy natív videótámogatással rendelkezik. A támogatott formák:
`input_video`, `video_url`, `video_source`, HTTPS URL-ek, valamint
`data:video/*;base64,...` adat-URI-k. A szövegben szereplő egyszerű fájlneveket
a rendszer nem kezeli videóként.

A `VideoBridgeGuardrail.preCall` (`videoBridge.ts`) felelős a kérés bejárásáért,
a képesség- és házirend-ellenőrzésért, a kérésenkénti összesítésért és a
válasz hasznos adattartalmáért. A videónkénti feldolgozás — a beszerzés, a teljes
eredmény gyorsítótárazása, egy képkockasorozat leírása (amelybe a hívó által
megadott hangátirat is beolvad), valamint a próbálkozásonkénti
metrikák/megszakítás/takarítás — a `videoBridgePipeline.ts` fájlban található
`processVideoPart` mögé van rejtve, amelyet a `preCall` ciklusa videórészenként
egyszer hív meg. Ez a modul definiálja a `VideoMediaBrokerPort`
(bájtok beszerzése és mintavételezett képkockák kinyerése), a
`VideoAudioTranscriptionPort` (a hívó által megadott hangátirat egyesítése a
mintavételezett képaláírásokkal) és a `VideoDrilldownPort` (a képkockaszintű
részletezés perzisztenciahatára; még nincs bekötve a `processVideoPart`
folyamatába — jelenleg csak a különálló
`/api/modality-bridge/video/drilldown` útvonal ír részletezési bejegyzéseket)
explicit portkorlátait is.

A nyilvános `/v1` kérési útvonal soha nem importál vagy hív meg alfolyamatot.
A távoli videók letöltése 50 MiB-os korláton belül történik; a beágyazott base64
videók videónkénti dekódolt méretére konzervatív, 36 MiB-os korlát vonatkozik,
hogy a modell/üzenetek/keretezés burka a nyilvános JSON-kérések 50 MiB-os
befogadási korlátján belül maradhasson. A beágyazott tartalom hosszát és a
dekódolt méret becslését a rendszer a memóriafoglalás előtt ellenőrzi. A kezdeti
távoli URL-nél és minden átirányításnál kötelező a HTTPS, a meglévő,
kizárólag nyilvános kimenő kapcsolatokat engedélyező, DNS-rögzítést használó
védelemmel. A bájtok ezután pontosan a belső
`POST /api/modality-bridge/video/extract` közvetítői határon haladnak át. Ez az
útvonal egyszerre `LOCAL_ONLY` és `SPAWN_CAPABLE`, kizárólag folyamatonként
hitelesített, megbízható visszacsatolási címről érkező kérést fogad el, és soha
nem fogad el URL-t, fájlrendszerbeli elérési utat, végrehajtható fájlt vagy
argumentumlistát. Az API törzsméret-feldolgozási folyamata és a kezelő növekményes
törzsolvasója egymástól függetlenül kényszeríti ki a közvetítő bemenetére
vonatkozó 50 MiB-os korlátot. A korlátozott sora egyszerre egy kinyerést futtat,
négy függőben lévő feladatot engedélyez, a függőben lévő bemenetet pedig
100 MiB-ra korlátozza.

A közvetítőn belül az `ffprobe` egy privát helyi fájlt olvas; a rögzített
formátum-engedélyezési lista kizárja a lejátszási lista- és jegyzékformátumokat.
Az engedélyezett MOV-családba tartozó konténerek esetében a külső MOV-adatokra
mutató hivatkozások alapértelmezés szerint letiltva maradnak, és a rögzített
parancs nem engedélyezi őket. Az `ffprobe` és az `ffmpeg` egyaránt kizárólag a
`file` protokollt engedélyező listát, egy szálat, rögzített argumentumtömböket és
shell nélküli végrehajtást használ; a végrehajtható fájlok feloldása a `PATH`
alapján történik. A csatolt borítóképek adatfolyamai nem tekinthetők lejátszható
jelölteknek. Minden lejátszható adatfolyamnak meg kell felelnie a korlátoknak,
és a rendszer az explicit alapértelmezett adatfolyamot részesíti előnyben a
determinisztikus, legalacsonyabb indexű tartalék kiválasztás előtt. A videók
hossza legfeljebb 600 másodperc, méretük dimenziónként legfeljebb 8 192 képpont,
a forrás képpontjainak száma pedig legfeljebb 33 554 432 lehet. Az FFmpeg 1–16
középponti JPEG-képkockát mintavételez, a hosszabb élt legfeljebb 1 024
képpontosra kicsinyíti a kisebb bemenetek felnagyítása nélkül, és soha nem kap
URL-t. A mintavételezés alapértelmezés szerint `uniform`. Az opcionális
`scene_aware` és kísérleti `segment_aware` házirend egy további rögzített FFmpeg-
menetet hajt végre a már ellenőrzött helyi adatfolyamon, korlátozott számú
`showinfo`-jelenetidőbélyeget választ ki, és az érzékelő hibája, időtúllépés,
hibás kimenet vagy üres jelölthalmaz esetén determinisztikusan ugyanazokra az
egyenletes középpontokra áll vissza. A szegmenstudatos mód a középponti mintákat
az ellenőrzött jelenetintervallumokkal arányosan osztja el; a szegmenstudatos
bizonyítékokat és a tartalék működést az alábbiak részletezik. A szigorú,
16 képkockás korlátot minden házirendben a kiválasztás után alkalmazza a
rendszer. Ha egy jelenettudatos kérés csak egy képkockányi kerettel rendelkezik,
az aktív teljes videó vagy fókuszablak egyenletes középpontját használja, és
`policyEffective: uniform` értéket jelent: egyetlen kiválasztott jelenetképkocka
nem képes megőrizni mindkét időbeli végpontot. A hívó opcionálisan megadhat egy
véges fókuszablakot (`start`/`end` másodpercben); a korlátokat a rendszer a
média időtartamához igazítja, a fordított vagy nem véges ablakokat elutasítja,
és minden mintavételezési házirendet kizárólag a normalizált intervallumon belül
alkalmaz. Az eredményül kapott ablak bekerül a mintavételezési metaadatokba és a
nem megbízható leírás előtagjába, így a későbbi modellek meg tudják különböztetni
a fókuszált részletet a teljes idővonaltól.

A szemantikus képaláírás-fókusz különálló, explicit beállítás. Az
alapértelmezett `full` elemzési mód megőrzi a meglévő képkockapromptot, és soha
nem továbbítja a kérés szövegét a képaláírási modellnek. `focused` módban a híd
csak az ugyanabban a Chat- vagy Responses-tárolóban található legutóbbi, nem
üres, felhasználó által létrehozott `text`/`input_text` tartalmat olvassa be,
NFC-formára normalizálja, összevonja a vezérlőkaraktereket és a térközöket,
valamint 500 Unicode-kódpontra korlátozza. Üres eredmény esetén pontosan a
`full` promptra áll vissza. A használható támpont JSON-ként, egy külön,
nem megbízható felhasználói kontextusblokkban kerül szerializálásra, és csak a
megfigyelhető részleteket rangsorolhatja; nem írhatja felül azt a külön
figyelmeztetést, amely tiltja a médiában látható vagy hallható utasítások
követését. A szöveges fókusz soha nem következtet `start`/`end` értékekre, és
nem módosítja az időbeli mintavételezőt.

#### FU-07 strukturális szegmensbizonyíték

A `segment_aware` egyetlen korlátozott előelemzési menetet hajt végre a már ellenőrzött helyi videófolyamon. A rögzített szűrőlánc először legfeljebb 320 pixel szélességűre méretezi a videót, észleli a jelenetváltásokat és a kimerevedett időszakokat, majd másodpercenként 1 képkockából mintát vesz az elmosódottság, az átlagos fénysűrűség, valamint a térbeli/időbeli információ meghatározásához. A menet legfeljebb 600 strukturális mintára, egy FFmpeg-/szűrőszálra, ugyanarra a kizárólag `file` protokollt és engedélyezett konténereket támogató listára, 1 MiB-os folyamatkimeneti korlátra, valamint legfeljebb 30 másodpercre korlátozódik a bróker megosztott megszakítási/határidő-kezelésén belül. Soha nem fogad el parancsot, szűrőt, elérési utat vagy URL-t a kérésből.

A strukturális értékek determinisztikus mintavételi bizonyítékok, nem pedig a videó szemantikai értelmezései. Nem következtetnek alanyokra, cselekvésekre, feliratokra, beszédre vagy felhasználói szándékra. A jelenet- és kimerevedési határok szegmenseket alkotnak; a kimerevedés lefedettsége, az elmosódottság, az expozíció, a térbeli részletesség és az időbeli változás csak a meglévő, 1–16 képkockás keret elosztását befolyásolja. Egy teljesen kimerevedett szegmens legfeljebb egy képkockát kaphat, míg a nem kimerevedett szegmensek a fennmaradó keretért versenyeznek. Ha több határ van, mint képkocka, megmarad az idővonal egyenletes lefedettsége, így a gyors korai vágások nem rejthetnek el egy hosszú, záró szegmenst. A kimerevedési határtól az elemzés 1 másodperces felbontásán belül eső jelenethatárok összevonásra kerülnek.

Hiányzó szűrők, hibás vagy üres bizonyítékok, érzékelőhiba, illetve a korlátozott előelemzés időtúllépése esetén a rendszer nyitott hibakezeléssel pontosan az egyenletes középponti szabályzatra tér vissza. A hívó általi megszakítás vagy a bróker határidejének lejárta esetén nincs ilyen visszatérés: ez leállítja a folyamatban lévő alfolyamatot, megakadályozza a későbbi képkockakinyerést, és a privát ideiglenes könyvtárfa eltávolításra kerül a `finally` blokkban.

A `scripts/perf/video-bridge-fu07-eval.ts` determinisztikus, valós FFmpeg-tesztanyagokat hoz létre a deduplikáció utáni képaláírás-hívások megtakarításának, a sűrű mozgás keretelosztásának, az elmosódottsági/expozíciós/SI-TI-bizonyítékoknak, a hosszú záró résszel rendelkező gyors vágásoknak, valamint a fokozatos áttűnések álpozitív eredményeinek vizsgálatához. Rögzíti az előelemzés tényleges eltelt idejét, továbbá ahol a `/usr/bin/time` elérhető, a gyermekfolyamat processzoridejét és a maximális RSS-t. Minőségi ellenőrzései kizárólag strukturális orákulumok. A valós képaláírás-modell minősége továbbra is `HOLD` állapotú, mert ehhez a tesztkerethez nem tartozik engedélyezett végpont vagy rögzített bíráló. A pénzbeli megtakarítás szintén `HOLD` állapotú marad, hacsak a `--caption-cost-per-call-usd` nem ad meg hívásonként egy explicit pozitív költségbecslést; a szkript egyik eredményt sem koholja.

Egy képkocka mérete legfeljebb 4 MiB, az összes nyers képkockáé együtt legfeljebb 23 MiB, a szerializált brókerválaszé pedig legfeljebb 32 MiB lehet. A privát ideiglenes könyvtár eltávolításra kerül a `finally` blokkban. Az OmniRoute nem tartalmazza az FFmpeg-et, és nem fogad el egyéni végrehajthatóprogram-elérési utat. A képaláírások létrehozása előtt a híd konzervatív vizuális deduplikációs menetet alkalmaz: minden JPEG-et 16×16-os szürkeárnyalatos pufferré alakít, és csak az utoljára megtartott képkockával hasonlítja össze. Egynél több képkockás képaláírási keret igénylésekor a kinyerés legfeljebb a keret kétszeresének megfelelő, de legfeljebb 16 képkockából álló, korlátozott jelölthalmazt biztosít. A kért felső korlátot csak a deduplikáció után alkalmazza, és ha a keret legalább kettő, a végső ritkítás során megőrzi az első és az utolsó kiválasztott jelöltet. A verziózott `grayscale-16x16-mean-cells-v2` szabályzat az átlagos fénysűrűség-különbség és azon bélyegképcellák aránya közül a nagyobbat használja, amelyek normalizált eltérése legalább 0,05. A duplikációs küszöb a 0,04-es állandó, amelyet a kiszámíthatóság érdekében választottak, nem pedig futásidejű beállításként tettek elérhetővé. Ez a másodlagos, nagy kontrasztú jel megőrzi azokat a kis mozgásokat és láthatószöveg-változásokat, amelyeket a kizárólag átlagon alapuló összehasonlítás elrejthet. Az összehasonlító vagy a dekóder hibái esetén a rendszer nyitott hibakezeléssel megőrzi a lefedettséget. A kimeneti metaadatok elkülönítik a kinyert jelölteket, a sikeresen felhasznált képkockákat és az eldobott vizuális duplikátumokat.

Egy explicit módon megjelölt videórész időbélyeggel ellátott kontaktlapot kérhet. A híd legfeljebb 4 oszlopos, 16 képkockás JPEG-rácsot készít. Minden 512 pixeles cella egy nagy kontrasztú alsó sávba égeti a forrás időbélyegét, miközben ugyanezek az időbélyegek a szöveges metaadatokban is megmaradnak a későbbi társítás és auditálás érdekében. A teljes JPEG mérete továbbra is legfeljebb 32 MiB lehet. Ha a `sharp` nem tudja dekódolni vagy összeállítani a rácsot, a híd visszatér az egyedi JPEG-képkockákhoz; az ügyfél általi megszakítás továbbra is továbbterjed a kontaktlap-műveleten keresztül.

A kiadásra alkalmasság bizonyítékai szándékosan elkülönülnek a szintetikus kompozíciós mikroteljesítményteszttől. A `scripts/perf/video-bridge-contact-sheet-eval.ts` egy sémaverziózott A/B tesztkeretet definiál valós, OpenAI-kompatibilis látási modellekhez. Méri a szolgáltató által jelentett tokeneket, a végpontok közötti tényleges késleltetést a kontaktlap összeállításával együtt, a modellhívások számát és a jegyzékben meghatározott tények megőrzését. A nyers modellválaszok nem kerülnek bele a jelentésbe; csak az SHA-256-kivonatok és az egyező tényazonosítók maradnak meg. A tesztkeret nem indít hálózati vagy fizetős modellhívást, hacsak nincs átadva a `--execute-real`, és nincs beállítva a `--model`, az `OMNIROUTE_BASE_URL`, valamint az `OMNIROUTE_API_KEY`. Ilyen explicit valós futtatás nélkül a géppel olvasható döntés `HOLD` marad; a szintetikus hasznosadat-/hívásszám-mérések önmagukban nem bizonyítják a kiadásra alkalmasságot.

A hívók opcionális `transcript.cues` tömböt csatolhatnak egy támogatott videórészhez, ha már rendelkeznek időben illesztett szöveggel. Minden jelzésnek tartalmaznia kell `text` mezőt, a megvizsgált időtartamon belüli véges `start`/`end` intervallumot, valamint egy engedélyezőlistán szereplő `source` értéket (`client`, `embedded` vagy `audio-bridge`); a `confidence` alapértelmezett értéke `1`, és `0` és `1` között kell maradnia. A pontosan egyező jelzések összevonásra kerülnek. Az OmniRoute ezekből a metaadatokból soha nem indít átírást: az ellenőrzött jelzéseket a forrással, a megbízhatósággal és az intervallummal együtt átmásolja a leírt eredménybe, és nem megbízható megfigyelésekként jeleníti meg őket a képkockák képaláírásai mellett. Az érvénytelen, tartományon kívüli vagy eredetmegjelölés nélküli szöveg elutasításra kerül, nem keveredik a képaláírás-folyamba. A kérés törzsében található mindkét átiratcsatorna `client` értékre normalizálja a megadott eredetmegjelölést, beleértve a saját állítás alapján megadott `embedded` vagy `audio-bridge` címkéket is. Ezeket a megbízható címkéket csak egy szerver által felügyelt adapter rendelheti hozzá a kizárólag kódból elérhető `trustedSource` argumentumon keresztül; a kérés egyetlen JSON-mezője sem érheti el ezt az argumentumot. Az átirat szövege eredetétől függetlenül nem megbízható, médiából származó tartalom marad, és soha nem határozhatja meg az engedélyezést.

Egy haladó hívó ugyanahhoz a videóhoz megadhat egy `audioTranscript` sávot;
ezt a rendszer az ügyfél által megadott szövegként kezeli, nem pedig a szerveroldali átírás bizonyítékaként.
A fúziós illesztési pont a vizuális és hangalapú megfigyeléseket egyetlen
határidő és megszakítási jel alatt futtatja, közös idővonalon rendezi őket, összevonja
a teljesen azonos példányokat, és részleges eredményt jelent, ha csak az egyik ág jár sikerrel.
Az érvénytelen `audioTranscript` ilyen részleges eredménnyé degradálódik — a vizuális
leírás megmarad, a hangág pedig megtisztított hibakódot rögzít —,
ahelyett, hogy a teljes videó feldolgozása meghiúsulna. Az ágankénti rendelkezésre állás, a részlegességi jelző
és a megtisztított hibakódok megmaradnak a leírt eredményben, a
védőkorlát metaadataiban (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), az eredmény-gyorsítótár metaadataiban és a híd
fúziós számlálóiban. Az alapértelmezett Video Bridge-útvonal nem hív meg beszédfelismerést,
és nem tölti le a média második példányát; e kifejezett sáv nélkül
továbbra is csak videót dolgoz fel.

**Átiratmegőrzés (#12150 P1).** Ez automatikusan érvényesül minden alkalommal, amikor a
Video Bridge (amely maga is csak külön engedélyezéssel használható) átiratjelzést jelenít meg — nincs külön
megőrzési jelző. Amikor egy kérés bármilyen átiratjelzést megjelenít (a hívó által deklarált
`transcript` vagy egy fuzionált `audioTranscript`), a védőkorlát
`videoBridgeObserved` jelöléssel látja el, és elkészíti a videóleírás kitakart másolatát —
egy azonos megjelenítést, amelyben minden jelzés szabad szöveges törzse
`[redacted-video-transcript]` értékre van cserélve; ez a strukturált jelzésmező
helyettesítésével készül még a karakterlánc összeállítása előtt (soha nem az összelapított szöveg elemzésével,
így semmilyen jelzéstartalom — akár rosszindulatú, akár szokványos, beleértve a `]` karaktert tartalmazó
törzseket, például az `[inaudible]`/`[music]` értékeket — nem maradhat meg). A tartósított hívásnapló kérésének törzse
minden videóból származó szövegrészt erre a kitakart másolatra cserél,
tartalmi egyezés alapján; a `fullText` horgonyt a rendszer újra beolvassa a befejezett, hívás előtti védőkorlát
hasznos adatából, így az egyezés akkor is sikeres marad, ha a lánc későbbi védőkorlátai (a PII- és
hitelesítőadat-maszkolók, 10/95-ös prioritással) helyben átírják a leírás szövegét, illetve
miután a rendszerprompt-/átadás-/memóriabeszúrás átalakítja az üzenettömböt. A
modellnek továbbított törzs változatlan marad. Egy megfigyelt kérés ezenkívül nem tölt fel
tartós Memory-t (a kérésből és a válaszból származó kinyerés egyaránt kimarad),
így a modell saját válasza sem másolhat átiratszöveget a Memory-ba.

**Nyers videómezők (#12430).** Amikor a híd engedélyezve van, és a natív videótámogatás ismeretlen vagy hiányzik, a definiált `transcript`/`audioTranscript` mezők szintén aktiválják a `videoBridgeObserved` jelölést, még sikertelen leírás vagy `maxVideos` korlát után is. A `null` és az üres karakterláncok számítanak; a hiányzó mezők és a nem videóhoz tartozó metaadatok nem. A megőrzött példányok kitakarják ezeket a mezőket vagy kihagyják a kérést, a gyorsítótárak/Memory használatát pedig megkerülik.

Ezeken a tartalék útvonalakon a hívó érvényes jelzései támogatott `text`/`input_text`
részekké válnak a nem szabványos szolgáltatói mezők helyett. Mindkét, a kérésben megadott sáv
nem megbízható `client`-megfigyelés marad, kifejezett figyelmeztetéssel arra, hogy a videó
nem lett leírva, és az időbélyegek nem lettek összevetve a médiával. A meglévő
256 jelzéses/64 KiB-os összesített és jelzésenkénti korlátok a két sávra együttesen vonatkoznak;
az időbélyegeknek bele kell férniük a bróker 600 másodperces felső korlátjába és minden megadott fókuszablakba.
Az érvénytelen sávokat a rendszer elveti, és nem továbbítja tetszőleges szövegként; egy érvényes
testvérsáv továbbra is használható, kivéve, ha az együttes keretük túllépésre kerül. A null/üres
mezők nem adnak hozzá szöveget. Ez a tartalék útvonal nem vezet be médialekérést vagy átírást.
Az átirat-kiterjesztési mezők el lesznek távolítva a tartalék videóhordozóból és annak
`video_url`/`source` objektumaiból. Az OpenAI vezetékes engedélyezési listája szigorú marad; az ismeretlen natív
videóhordozók továbbra is elérhetők, az ismerten csak szöveges célok pedig biztonságos jelölőket kapnak.
A strukturált kitakart másolatok védik a hozzáfűzött átiratszöveget, miközben az
eredeti, a hívó tulajdonában lévő kérés változatlan marad. A natív támogatással rendelkező célok és a
letiltott hidak megtartják a meglévő megkerülési viselkedésüket.

A további megőrzött példányok ugyanezt a megfigyeltkérés-jelet használják. A védőkorlát előtti nyers
ügyfélkérés-pillanatkép, a memóriában lévő függő kérés és a korai
elutasítottkérés-napló strukturáltan lecseréli az átiratmezőket a videórészekben;
a folyamatfázisok és a kontextusátadás által előállított karakterlánc-promptok a tartósított kéréstörzs
fogadópontján lesznek kitakarva. A tartósított `video_content_removed` jelölő
zárt módon meghiúsítja a `previous_response_id` folytatását a szándékosan elvetett
szöveg rekonstruálása helyett. Ha egy megfigyelt kérés a naplózás előtt elveszíti a
részenkénti kitakart másolatát, vagy a későbbi kérésmódosítások után több videó-másolat
közül akár egy sem egyezik, a tartósított kéréstörzs teljes egészében kimarad,
ahelyett, hogy részlegesen kitakart átiratot őrizne meg.

Egy megfigyelt kérésnél a modell válasza strukturált jelzéshatár nélkül is idézheti az
átirat bármely részét. Ezért a hívásnaplóban tartósított
`responseBody` helyére kihagyási jelölő kerül; a részletes
folyamatműtermék (amely tartalmazhat upstream-/ügyféltörzseket és adatfolyam-darabokat)
nem lesz megőrizve. A szemantikai, idempotencia- és következtetés-visszajátszási gyorsítótárak
megkerülik az olvasásokat és írásokat ennél a kérésnél. A szolgáltatói kérés és az ügyfél számára látható
válasz változatlan marad. A korai életben tartó bájtok kiürülnek az ideiglenes
pufferből, amikor a részletes műtermék kimarad. A Kiro hibás EventStream
figyelmeztetése csak a hasznos adat bájtjainak számát jelenti, soha nem annak tartalmát vagy a JSON-
elemző nyers hibáját.
Ez nem állítja, hogy minden, ettől független szolgáltatói/bővítményi diagnosztika
auditálva lett; a megőrzött fogadópontok szélesebb körű átvizsgálását a #11658 követi nyomon.

A belső `/api/modality-bridge/video/drilldown` életciklus egy különálló,
loopback/token-hitelesítésű gyorsítótár-alréteg. Minden művelethez szükség van
egy kanonikus, átlátszatlan elsődlegesazonosítóra is. Mielőtt egy éles környezetbeli
hívó engedélyezve lenne, ezt az azonosítót a hitelesített tenantból kell
származtatnia, és soha nem továbbíthat kliens által kiválasztott értéket. A
gyorsítótár kulcsai ezt az elsődlegest a kanonikus munkamenet- és
videóreferencia-azonosítókhoz kötik, csak ezek SHA-256-ból származtatott kulcsait
tárolják, és az olvasásokat, valamint a törlést is ugyanarra az elsődlegesre
korlátozzák. A gyorsítótár bejegyzésenként legfeljebb 16 származtatott JPEG-képkockát
tárol, ezeket tíz perc után lejáratja, továbbá támogatja a korlátozott
`start`/`end` olvasásokat vagy a munkamenet explicit törlését.

Minden elsődleges legfeljebb 16 bejegyzésre és 64 MiB kanonikus JPEG-adatra
korlátozódik. Ezek a korlátok függetlenek a globális, 64 bejegyzéses/256 MiB-os
felső határtól: az elsődleges kvótájára nehezedő nyomás csak az adott elsődleges
legrégebben használt bejegyzéseit távolítja el, mielőtt a globális LRU-eltávolítás
szóba kerülne. A lejárt bejegyzések a gyorsítótár aktivitásakor mind az
elsődlegeshez tartozó, mind a globális elszámolásból törlődnek, míg a megszakítás
és az ellenőrzési hiba nem véglegesít részleges cserét.

A gyorsítótár elutasítja a nem kanonikus Base64-et, a túlzott kitöltést, a nem JPEG
médiát, a hibás vagy csonkolt JPEG-eket, valamint azokat a JPEG-eket, amelyek
figyelmeztetést eredményeznek egy korlátozott, teljes képes `sharp` dekódolás során.
Minden elfogadott képet újrakódol kanonikus JPEG-ként, a szélességet és magasságot
a dekódolt bájtokból származtatja a hívó által megadott mezők megbízhatónak
tekintése helyett, és megőrzésük helyett elveti a hozzáfűzött polyglot bájtokat.
Mindkét kvótába csak a korlátozott méretű, kanonikus, tömörített puffer számít
bele. A JSON átviteli korlátja tartalmazza a 32 MiB-os dekódolt bemeneti felső
határ Base64-többletét. Minden tárolt származtatás rögzíti az ellenőrzött JPEG
formátumot/felbontást, a mintavételi szabályzatot, a származtatás verzióját, a
létrehozás idejét, a kiszolgáló által kiszámított tartalomkivonatot, a szülő
referencia kivonatolt értékét, valamint a megbízható hívótól származó szülői
tartalomkivonatot. A megszakítás ellenőrzése az aszinkron dekódolási/kivonatolási
fázisok között, az atomi gyorsítótár-véglegesítés előtt történik.

Ez a fejlesztési rész még nem kapcsol éles producert az útvonalhoz, és nem
biztosít többfelbontású változatkiválasztást. Az átlátszó Video Bridge-kérési
útvonal ezért nem jár további munkával, míg a tenanthez kötött
elsődleges-származtatás és a teljes FU-08 többfelbontású életciklus kifejezetten
későbbi feladat marad, ahelyett, hogy kész működésként lenne dokumentálva.

A képkockák feliratozása egymás után, a konfigurált Video modellel történik. Az
üres Video-felülírás örökli a Vision beállítást; ha mindkettő üres, a Vision
automatikus útválasztója választja ki a tényleges, látási képességekkel rendelkező
modellt. A sikeres feliratok az eredeti részt egy stabil `[Video description:`
előtaggal helyettesítik, amely a szöveget nem megbízható, médiából származó
megfigyelésként is megjelöli, és arra utasítja a további modelleket, hogy ne
kövessék a médiában talált utasításokat. A képkockafeliratok gyorsítótárkulcsai
tartalmazzák a JPEG-bájtokat, a promptot, az időbélyeget és a tényleges modellt;
csak a sikeres feliratok kerülnek gyorsítótárba. A gyorsítótár-bejegyzések
megőrzik a ténylegesen sikeres producermodellt, beleértve a tartalék modellt is;
a híd `mixed` értéket jelent, ha a különböző képkockákat különböző modellek
állították elő. Gyorsítótár-találat esetén ezt a producerazonosságot használja
újra, ahelyett, hogy a kért útválasztási tervként címkézné át. A teljes videó
eredmény-gyorsítótára minden olyan bemenet alapján kap kulcsot, amely megváltoztatja
a kimenetet — prompt, tényleges modell, mintavételi szabályzat, képkockaszám,
szemantikai elemzési mód, a normalizált fókusztipp SHA-256-ujjlenyomata,
fókuszablak, `transcript`, `audioTranscript` és a kontaktlap jelzője —, így e
dimenziók bármelyikének módosítása gyorsítótárhibát eredményez, nem pedig elavult
érték újrafelhasználását. A vizuális deduplikációs szabályzat verziója,
küszöbértéke és a jelölt képkockák korlátozott száma szintén explicit módon
szerepel az eredmény-gyorsítótár kulcsában és metaadataiban; ezért egy
szabályzatmódosítás nem használhat fel újra elavult teljesvideó-leírást. Az
eredmény-gyorsítótár v4 metaadatai megőrzik a módot és az ujjlenyomatot, de a
nyers felhasználói feladatot soha. A védőkorlát metaadatai a kért és a tényleges
elemzési módot is jelentik; a használható felhasználói szöveg nélkül kért
`focused` mód ténylegesen `full` módként jelenik meg.

A védőkorlát minden támogatott videórészt kinyer, de legfeljebb
`modalityBridgeVideoMaxVideos` darabot ír le. Egy bizonyítottan
`supportsVideo === false` cél esetében a sikertelen és a korlátot túllépő videók
explicit, biztonságos szöveges jelölőkké válnak, így egyetlen nyers videó sem
marad meg. Ha a képesség ismeretlen, ezek a részek megtartják a videóhordozójukat;
minden tartalék átirat a fenti korlátozott szövegkonverziót követi. A
`supportsVideo === true` célok megkerülik a hidat. A klienskérés megszakítási
jele továbbterjed a letöltésen, a közvetítő várólistáján, az alfolyamatokon és a
feliratozási hívásokon keresztül; a megszakítások leállítják a feldolgozást a
videók között, és soha nem eredményezik a nyers média átengedését.

A futásidejű beállítások adatbázis-alapúak, és Zod által ellenőrzöttek:

| Kulcs                               | Alapértelmezett | Tartomány / viselkedés                                                                                                                      |
| ----------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`         | Opcionális futtatókörnyezet, külön engedélyezendő                                                                                           |
| `modalityBridgeVideoAnalysisMode`   | `"full"`        | A `full` megőrzi az általános képaláírásokat; a `focused` korlátozott, nem megbízható kontextust használ a legutóbbi felhasználói üzenetből |
| `modalityBridgeVideoModel`          | `""`            | A Vision Bridge modelljének öröklése                                                                                                        |
| `modalityBridgeVideoFrameCount`     | `8`             | 1–16                                                                                                                                        |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`     | `uniform`, `scene_aware` vagy arányos `segment_aware`; az érzékelő hibája esetén visszaáll `uniform` értékre                                |
| `modalityBridgeVideoMaxVideos`      | `1`             | 1–4                                                                                                                                         |
| `modalityBridgeVideoTimeout`        | `120000`        | 1000–120000 ms                                                                                                                              |

A 120 másodpercnél nagyobb, korábban mentett videó-időtúllépési értékeket a
közvetítő határidejére korlátozza a rendszer; az ezt a korlátot meghaladó új
beállítások mentését elutasítja.
A `GET /api/modality-bridge/video/runtime` végpont a hitelesítés vagy a
futtatókörnyezet ellenőrzése előtt megbízható, megjelölt loopback-helyi eredetet
követel meg, ezt követően pedig kezelői hitelesítést igényel. Csak az
`available` értékét, az FFmpeg/ffprobe tisztított verzióit, valamint a
futtatókörnyezet elérhetetlensége esetén egy rögzített indokot ad vissza. A belső
kinyerési végpont nem nyilvános feltöltési API: a várólista telítettsége esetén
`503` és `Retry-After`, a hívó leválása esetén `499`, a közvetítő rögzített
határidejének lejártakor pedig `504` választ ad vissza. A konvertált válaszok
hozzáadják a `video->text;model=<visionModel>;parts=<videos>` szegmenst a
központi `x-omniroute-modality-bridge` fejléchez a Vision- vagy Audio-szegmensek
eltávolítása nélkül.

### PII-maszkoló (`piiMasker.ts`)

**Mindkét** szakaszban fut.

- A **`preCall`** klónozza a hasznos adatot, bejárja a `system`, `messages`,
  `input` és `prompt` mezőket (beleértve az egyszerű karakterláncelemeket is),
  majd alkalmazza a `processPII()` függvényt (forrás:
  `@/shared/utils/inputSanitizer`) a karakterlánc típusú `content`/`text`
  mezőkre. Ha a `PII_REDACTION_ENABLED=true`, az észlelt PII-adatokat kitakarja
  a kimenő hasznos adatban. Ez független az `INPUT_SANITIZER_MODE` értékétől
  (amely csak a promptinjektálási házirendet szabályozza). Ha a kitakarás ki van
  kapcsolva, a hívás az észlelések számát a tartalom átírása nélkül rögzíti.
- A **`postCall`** mélymásolatot készít a válaszról, majd futtatja a
  `sanitizePIIResponse()` függvényt és a Responses API alakját kezelő maszkolót
  (`maskResponsesOutput` — lefedi az `output_text` és az
  `output[].content[].text` mezőket). Ha bármilyen kitakarás történik, a
  módosított válasz felváltja az eredetit.

A védelmi szabály soha nem blokkol; csak metaadatokkal látja el
(`meta.detections`, `meta.redacted`) vagy átírja az adatokat.

#### Típusonkénti kiválasztás, egyéni minták és észlelési számlálók

Az **Irányítópult → Beállítások → Biztonság → PII-maszkolás** határozza meg,
_hogy mi_ legyen maszkolva. Magát a maszkolást nem ez kapcsolja be: azt továbbra
is a `PII_REDACTION_ENABLED` (kérés), illetve a `PII_RESPONSE_SANITIZATION`
(válasz + SSE) vezérli; alapértelmezés szerint mindkettő ki van kapcsolva.

- **Típusonkénti kiválasztás** — a beépített azonosítókat a
  `src/shared/constants/piiTypes.ts` (`PII_BUILTIN_TYPES`) sorolja fel. Ha nincs
  beállítva, az összes típust jelenti (ez volt a viselkedés a beállítás
  bevezetése előtt). A kérésfeldolgozó `ssn_us` mintája az `ssn` típushoz van
  rendelve. A sablonok (Minimális, Standard, Pénzügyi, Brazil, USA, Teljes)
  csak a felhasználói felület jelölőnégyzeteit töltik ki.
- **Egyéni minták** — legfeljebb 20 reguláris kifejezés vagy helyettesítő
  karakteres minta (`*` = legfeljebb 64 nem szóköz karakter, `?` = egy
  karakter). A találatokból `[CUSTOM_REDACTED]` lesz. Minden minta áthalad a
  `compilePiiCustomPattern()` függvényen
  (`src/shared/utils/piiCustomPatterns.ts`): legfeljebb 500 karakterből állhat,
  a jelzők csak `g i m s u` értékek lehetnek, lefordíthatónak kell lennie, át
  kell mennie a `safe-regex` ellenőrzésén (katasztrofális visszalépés), továbbá
  nem illeszkedhet üres karakterláncra vagy kitakarási helyőrzőre. A sikertelen
  mintát a rendszer mentéskor és teszteléskor is elutasítja, a sikertelen,
  korábban tárolt sort pedig futásidőben kihagyja ahelyett, hogy lefordítaná.
  Az egyéni minták csak akkor futnak, amikor a maszkolás be van kapcsolva.
- **Észlelési számlálók** — típusonkénti darabszámok (soha nem az illeszkedő
  értékek), amelyek a memóriában maradnak, és újraindításkor nullázódnak
  (`src/lib/pii/piiDetectionStats.ts`). Csak akkor növekednek, amikor a
  maszkolás be van kapcsolva.

A beállítások a `key_value` táblában találhatók (`pii_settings` névtér,
`src/lib/db/piiSettings.ts`), és egy 1 másodperces gyorsítótáron keresztül
olvashatók. API:

| Metódus | Útvonal                  | Cél                                                                                     |
| ------- | ------------------------ | --------------------------------------------------------------------------------------- |
| `GET`   | `/api/settings/pii`      | Jelzők állapota, `enabledTypes`, `customPatterns`, észlelési számlálók                  |
| `PUT`   | `/api/settings/pii`      | Az `enabledTypes` (`null` = összes) és/vagy `customPatterns` lecserélése                |
| `POST`  | `/api/settings/pii/test` | Egy minta próbaüzemű futtatása egy legfeljebb 8 KB-os mintán; semmi nem kerül tárolásra |

Mindhárom kezelői hitelesítést igényel, és Zod segítségével ellenőrzi a
kéréstörzset (`src/shared/validation/schemas/piiSettings.ts`).

### Promptinjektálás (`promptInjection.ts`)

Észleli a felhasználó által megadott tartalomban található támadó jellegű
struktúrákat, és érvényesíti a beállított házirendet. A viselkedést környezeti
változók és konstruktoropciók vezérlik:

| Beállítás              | Környezeti változó                                                                                       | Alapértelmezett | Hatás                                                                                                                                                                                                                                           |
| ---------------------- | -------------------------------------------------------------------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Engedélyezve           | `INPUT_SANITIZER_ENABLED`                                                                                | `true`          | Ha `false`, a védelmi korlát azonnal visszatér.                                                                                                                                                                                                 |
| Mód                    | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                          | `warn`          | Injektálási szabályzat: `block`, `warn` vagy `log`. (A `redact` visszafelé kompatibilitási okokból elfogadott, de **nem** távolítja el az injektált szöveget; a kérésben lévő személyes adatok átírását a `PII_REDACTION_ENABLED` szabályozza.) |
| Blokkolási küszöbérték | `blockThreshold` beállítás / `INPUT_SANITIZER_BLOCK_THRESHOLD` (`INJECTION_GUARD_BLOCK_THRESHOLD` álnév) | `high`          | A blokkoláshoz szükséges minimális súlyosság. Alapértelmezés szerint a közepes súlyosság csak megfigyelésre szolgál.                                                                                                                            |

**A mód precedenciája** (`getMode`): hívó `options.mode` →
`INJECTION_GUARD_MODE` **adatbázisbeli funkciójelző-felülbírálása** (Irányítópult → Beállítások →
Funkciójelzők) → `INJECTION_GUARD_MODE` környezeti változó → `INPUT_SANITIZER_MODE` környezeti változó →
`warn`. Az irányítópult felülbírálása ezért elsőbbséget élvez a környezeti változókkal szemben, így a Funkciójelzők
felhasználói felület élőben vezérli a futó védelmet (újraindítás nélkül). Az adatbázis olvasása hibabiztos:
hiba esetén a védelem visszatér a környezeti változókon alapuló működéshez, és ha nincs
beállítva felülbírálás, a működés megegyezik a kizárólag környezeti változókon alapuló feloldással.

Észlelési források:

1. `sanitizeRequest()` az `@/shared/utils/inputSanitizer` modulból (a feldolgozási folyamat
   más részein is használt megosztott észlelőkészlet).
2. Beépített `DEFAULT_GUARD_PATTERNS` (jelenleg `system_override_inline` és
   `markdown_system_block`, mindkettő `high` súlyosságú).
3. A konstruktorbeállításokon keresztül átadott opcionális `customPatterns` (karakterláncok, reguláris kifejezések
   vagy `{ name, pattern, severity }` rekordok).

Ha `mode === "block"` **és** legalább egy észlelés eléri a súlyossági
küszöbértéket, a `preCall` a következőt adja vissza: `{ block: true, message: "Request rejected:
suspicious content detected" }`. `warn`/`log` módban a védelmi korlát naplózza az eseményt, de
engedélyezi a hívást. A megosztott `evaluatePromptInjection()` segédfüggvény szintén exportálva van
azon hívók számára, amelyek a regisztrációs adatbázis használata nélkül szeretnék kiértékelni a promptokat.

**Vizsgálati korlát (v3.8.20):** az észlelő az összefűzött promptszövegnek csak az **első 16 KB-ját**
vizsgálja — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bájt) az
`src/shared/utils/inputSanitizer.ts` fájlban. Mind a `detectInjection()`, mind az
`evaluatePromptInjection()` meghívja a `slice(0, MAX_INJECTION_SCAN_BYTES)` metódust a
mintaciklus futtatása előtt. Az injektálási utasítások a bemenet elejének közelében találhatók, így ez
korlátozza a reguláris kifejezések CPU- és GC-terhelését a több száz KB-os hasznos adatok esetén anélkül, hogy gyengítené az észlelést (vö.
#3932, #4041).

### Hitelesítőadat-maszkoló (`credentialMasker.ts`)

**Mindkét** szakaszban fut, az alapértelmezett lánc utolsó elemeként (`95`-ös prioritással). Kitakarja
a közismert API-kulcs- és titkostoken-mintákat a kimenő hasznos adatból (az üzenetek
tartalmából, az eszközhívások argumentumaiból és az eszközeredményekből), **valamint** a szolgáltató válaszából, így a
promptba beillesztett (vagy egy eszköz eredménye által visszaadott) hitelesítő adat nem szivárog ki
a külső szolgáltatóhoz vagy vissza az ügyfélhez.

- **Kizárólag külön engedélyezéssel használható**, a személyes adatok kitakarásával azonos elv szerint (a 20. szigorú szabályhoz kapcsolódóan):
  le van tiltva, kivéve, ha `settings.credentialRedactionEnabled === true` **vagy**
  `CREDENTIAL_REDACTION_ENABLED=true`. Kikapcsolt állapotban a védelmi korlát nem végez műveletet —
  soha nem blokkol és soha nem ír át semmit.
- A `redactCredentials()` bejárja a hasznos adat/válasz teljes fáját (`walkValue()`,
  prototípusszennyezéssel szemben biztonságosan, a ciklusokat `WeakSet` használatával kezelve), és a találatokat
  `[REDACTED:<type>]` helyőrzőre cseréli, miközben csak a ténylegesen
  módosult ágakat klónozza.
- A `CREDENTIAL_PATTERNS` lefedi az LLM-szolgáltatók kulcsait (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), a VCS-/SaaS-tokeneket (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), a fizetési kulcsokat (Stripe, Square), a felhőszolgáltatási
  kulcsokat (AWS hozzáférési kulcs, Twilio, SendGrid, Mailgun), a privát kulcsokat/JWT-ket,
  a hitelesítő adatokat tartalmazó kapcsolati karakterláncokat (`mongodb://user:pass@...` stb.), valamint
  egy általános `Authorization`/`x-api-key`/`api-key`/`apikey` fejlécérték-
  mintát. A fejléc formájú kulcsok (`authorization`, `x-api-key`, `api-key`,
  `apikey`) strukturálisan vannak kitakarva (csak az érték; a séma előtagja, például
  `Bearer `/`Basic ` megmarad), nem pedig az általános szöveges reguláris kifejezéssel.
- A védelmi korlát soha nem blokkol; csak átír (`modifiedPayload` /
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
  block?: boolean; // true esetén megszakítja a láncot
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

Egy védőkorlát a „nincs változás” állapotot a `void`, a `{}` vagy a
`{ block: false }` egyikének visszaadásával jelzi. A `modifiedPayload`/`modifiedResponse`
visszaadása lecseréli a láncon továbbhaladó értéket a soron következő védőkorlátok számára.
A `signal?: AbortSignal` továbbítja a hívó életciklusát a védőkorlátoknak. A kérés megszakítása a szándékos, hibát átengedő kivétel: a médiakezelő hidak leállítják a munkát és elvégzik a takarítást anélkül, hogy visszaállítanák a nyers médiát egy olyan cél számára, amelyről ismert, hogy nem támogatja azt.

## Nyilvántartó (`registry.ts`)

A singleton `guardrailRegistry` a következőket teszi elérhetővé:

- `register(guardrail)` — hozzáad egy védőkorlátot (vagy lecseréli a normalizált név alapján), majd
  növekvő `priority` szerint újrarendezi őket.
- `clear()` / `list()` — adminisztratív segédfüggvények.
- `runPreCallHooks(payload, context)` — végiglépked az aktív védőkorlátokon, továbbfűzi a
  hasznos adatot a `modifiedPayload` segítségével, és az első `block: true` értéknél leáll.
- `runPostCallHooks(response, context)` — ugyanez a folyamat a válaszoldalon.
- `resetGuardrailsForTests({ registerDefaults })` — törli az állapotot, és opcionálisan
  újraregisztrálja az alapértelmezéseket a tesztek tiszta elkülönítése érdekében.

Mindkét futtató `{ blocked, payload|response, results, guardrail?, message? }`
értéket ad vissza, ahol a `results` `GuardrailExecutionResult` rekordok tömbje, amelyek
védőkorlátonként tartalmazzák a `blocked`, `skipped`, `modified`, `error` és `meta` mezőket,
ami hasznos a nyomkövetéshez.

### Védőkorlátok letiltása kérésenként

A `resolveDisabledGuardrails({ apiKeyInfo, body, headers })` összegyűjti azon
védőkorlátok neveinek duplikációmentes listáját, amelyeket az aktuális
kérésnél ki kell hagyni. A források (mind opcionális, és mindegyik összevonásra kerül):

- `apiKeyInfo.disabledGuardrails`
- A kérés törzsében lévő legfelső szintű `disabledGuardrails`
- A kérés törzsében lévő `metadata.disabledGuardrails`
- Az `x-omniroute-disabled-guardrails` fejléc (vagy a korábbi
  `x-disabled-guardrails`)

Az értékek lehetnek karakterláncok tömbjei vagy vesszővel elválasztott karakterláncok; a nevek
normalizálása kisbetűs kebab-case formátumra történik (`pii_masker` → `pii-masker`). Az eredmény
a `context.disabledGuardrails` mezőn keresztül kerül a nyilvántartóhoz, amely kihagyja
az egyező védőkorlátokat (`skipped: true` a `results` tömbben).

## Végrehajtási sorrend

Minden, a `src/sse/handlers/chat.ts` és az
`open-sse/handlers/chatCore.ts` fájlon áthaladó kérés esetén:

1. A `resolveDisabledGuardrails(...)` létrehozza a kihagyási listát az API-kulcsból, a törzsből
   és a fejlécekből.
2. A `guardrailRegistry.runPreCallHooks(body, ctx)` növekvő prioritási
   sorrendben futtatja a védelmi korlátokat:
   - A letiltott védelmi korlátokat `skipped` állapottal rögzíti.
   - Az egyes védelmi korlátok `preCall` műveletei a `modifiedPayload` segítségével átírhatják az adatterhet.
   - Az első `block: true` rövidre zárja a láncot, és a kezelő
     egy, a védelmi korlát általi elutasítást jelző választ ad vissza.
3. A (potenciálisan átírt) adatteher továbbhalad a kombinált útválasztáshoz és a felsőbb rétegbe
   történő továbbításhoz.
4. A válasz összeállítása után a `guardrailRegistry.runPostCallHooks(...)`
   ugyanazt a láncot futtatja a válaszon. A `block: true` ebben az esetben elveti a felsőbb réteg
   válaszát.

A kivételt dobó védelmi korlátokat `error: <message>` értékkel rögzíti, és a
`logger.warn` segítségével naplózza a rendszer, de a lánc folytatódik — a tervezés szerint hiba esetén átengedő módon.

## Konfiguráció

A beépített védelmi korlátok által beolvasott környezeti változók:

| Változó                               | Használja                       | Hatás                                                                                                                                    |
| ------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`              | Állítsa `false` értékre az észlelés teljes letiltásához.                                                                                 |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`              | Injektálási szabályzat: `warn`, `block` vagy `log`. Az örökölt `redact` érték nem írja át az injektált szöveget.                         |
| `INJECTION_GUARD_MODE`                | `prompt-injection`              | Az injektálás elleni védelem módja; egyben egy adatbázisbeli funkciójelző is, amely **felülbírálja** a környezeti változókat (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`              | A `MODE=block` által elutasított minimális súlyosság: `high` (alapértelmezett), `medium` vagy `low`.                                     |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`              | Az `INPUT_SANITIZER_BLOCK_THRESHOLD` örökölt álneve.                                                                                     |
| `PII_REDACTION_ENABLED`               | `pii-masker`                    | `true` esetén a kérésben szereplő személyazonosításra alkalmas adatokat kitakarja a rendszer (az injektálási módtól függetlenül).        |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (kimeneti oldalon) | A válaszoldali maszkoló viselkedését szabályozza.                                                                                        |

A Modality Bridge védelmi korlátai futásidejű konfigurációjukat az adatbázis-alapú beállítástárból
(`getSettings()`) olvassák, nem környezeti változókból. A Vision elsődleges kulcsai:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` és
`modalityBridgeCacheMaxEntries`. Az örökölt
`visionBridge*` kulcsokat kizárólag a dokumentált, egy cikluson át elérhető olvasási
tartalékmegoldásként fogadja el a rendszer; az irányítópulton végzett írások az elsődleges kulcsokat használják. Az alapértelmezések és a tartalékérték-feloldó
a `src/shared/constants/modalityBridgeDefaults.ts` fájlban találhatók, az örökölt
konstansokat pedig a `src/shared/constants/visionBridgeDefaults.ts` őrzi.

A hangfeldolgozás a `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` és `modalityBridgeAudioMaxClips` beállításokat, valamint a megosztott
`modalityBridgeCache*` beállításokat használja. A hangfeldolgozáshoz nem tartozik örökölt kulcsokra épülő tartalékmegoldás, mert ezek
a kulcsok a Modality Bridge sémával együtt jelentek meg.

A videófeldolgozás a `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` és
`modalityBridgeVideoTimeout` beállításokat, valamint a megosztott `modalityBridgeCache*` beállításokat használja.
Alapértelmezés szerint le van tiltva, mivel az FFmpeg/ffprobe opcionális üzemeltetési
függőségek, a képkockák feliratozása pedig növeli a késleltetést és a modellhasználat költségét.

## Egyéni védőkorlátok

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

1. Hozza létre a `src/lib/guardrails/myGuardrail.ts` fájlt a `BaseGuardrail` kiterjesztésével.
2. Implementálja a `preCall` és/vagy a `postCall` metódust.
3. Regisztrálja importáláskor (a `registerDefaultGuardrails` függvényből hozzáadva), vagy
   futásidőben hívja meg a `guardrailRegistry.register(...)` metódust — a regisztrációs jegyzék
   lecseréli az azonos normalizált nevű korábbi védőkorlátot.
4. Adjon hozzá teszteket a `tests/unit/` könyvtárban (meglévő példák:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Tesztelés

A tesztek között használja a `resetGuardrailsForTests()` függvényt, hogy ismert állapotból induljon.
Üres regisztrációs jegyzékkel való indításhoz adja át a `{ registerDefaults: false }` értéket, és
csak a tesztelendő védőkorlátokat regisztrálja. A Vision Bridge támogatja a függőséginjektálást
(`deps.getSettings`, `deps.callVisionModel`); az Audio Bridge ezzel egyenértékű csatlakozási
pontokat biztosít a beállításokhoz, képességekhez, az STT-modell kiválasztásához, a hitelesítő
adatok ellenőrzéséhez és az átíráshoz. A tesztek így adatbázis- vagy hálózati hozzáférés nélkül
is ellenőrizhetik mindkét folyamatot.

## Lásd még

- `src/lib/guardrails/` — implementáció
- `src/shared/utils/inputSanitizer.ts` — a promptinjektálás és a személyazonosításra alkalmas adatok maszkolását
  működtető megosztott detektor
- `src/shared/constants/visionBridgeDefaults.ts` — a Vision Bridge alapértelmezett értékei és
  a kényszerített hídként kezelt modellek listája
- `src/shared/constants/modalityBridgeDefaults.ts` — a Vision/Audio megosztott futásidejű alapértelmezett értékei
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonális réteg (áramkör-megszakító, várakozási idők)
- `docs/reference/ENVIRONMENT.md` — a környezeti változók teljes referenciája

## Az injektálásvédő útvonal-lefedettsége és red-team tesztelése (8. fázis · D blokk)

Az injektálásvédő (`createInjectionGuard` / `withInjectionGuard`) minden olyan útvonalat lefed,
amely felhasználói promptokat fogad. Figyelembe veszi az `INJECTION_GUARD_MODE` beállítást
(alapértelmezés szerint `warn` = csak naplózás; `block` = HTTP 400 `SECURITY_001` választ ad vissza).

| Típus            | Útvonalak                                                                                                                                            | Alapértelmezett mód |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Szöveg (meglévő) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn                |
| Generatív        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn                |
| Adat             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn                |

A szövegkinyerés (`extractMessageContents`) a `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` mezőket kezeli.

**Red-team (éjszakánként, `nightly-llm-security.yml`):** a promptfoo ellenőrzi, hogy minden útvonal
blokkolja-e az OWASP-LLM korpuszt `INJECTION_GUARD_MODE=block` módban; a garak próbákat futtat
(titkos érték hiányában kihagyja őket). A `moderations` a konzisztencia érdekében szerepel — a
blokkoló módot használó üzemeltetők a `resolveDisabledGuardrails` segítségével mentesíthetik.

Az éjszakai munkafolyamat (`.github/workflows/nightly-llm-security.yml`, cron + kézi
indítás) két feladatot tartalmaz:

- **`promptfoo-guard` (blokkoló)** — futtatja a `promptfoo eval -c promptfooconfig.yaml`
  parancsot `INJECTION_GUARD_MODE=block` beállítással. Minden ellenséges teszteset (például „hagyj
  figyelmen kívül minden korábbi utasítást…”, DAN-stílusú jailbreak-kísérletek) ellenőrzi, hogy a válasz
  tartalmazza-e az `error.code === "SECURITY_001"` értéket, vagyis hogy a védő valóban elutasította-e a kérést.
- **`garak` (tájékoztató jellegű)** — a garak `--probes promptinject,dan,leakreplay`
  próbáit futtatja egy helyi OmniRoute-példánnyal (`http://localhost:20128/v1`) szemben. Egy
  szolgáltatói titkos érték (`PROMPTFOO_PROVIDER_KEY`) meglétéhez kötött; annak hiányában szabályosan
  kimarad, és az `|| true` utótagot kapja, így jelentést készít anélkül, hogy meghiúsítaná a CI-folyamatot.

A védő segédfüggvény (`createInjectionGuard` / `withInjectionGuard`) lefedettsége
minden promptot fogadó `/v1` útvonalra kiterjed; a prompt szövegét a
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` mezőkből
az `extractMessageContents()` nyeri ki a `src/shared/utils/inputSanitizer.ts` fájlban.
