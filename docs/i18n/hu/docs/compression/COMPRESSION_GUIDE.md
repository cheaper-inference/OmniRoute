# 🗜️ Prompt Compression Guide — OmniRoute (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automatikusan 15–95%-ot takaríthat meg az alkalmas kontextuson. Gyors áttekintésért lásd a [README tömörítésről szóló szakaszát](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Áttekintés

Az OmniRoute moduláris prompttömörítési folyamatot valósít meg, amely **proaktívan**, még azelőtt fut le, hogy a kérések elérnék a háttérszolgáltatókat. Ez azt jelenti, hogy a tokenmegtakarítás átlátható módon történik — a munkafolyamatot nem kell módosítani.

```
Ügyfélkérés
  → Tömörítési stratégia kiválasztója
    → Van kombinációs felülbírálás? → A kombináció beállításának használata
    → Elérte az automatikus aktiválási küszöbértéket? → Automatikus mód használata
    → Van alapértelmezett mód? → Globális beállítás használata
    → Ki van kapcsolva? → Tömörítés kihagyása
  → Kiválasztott tömörítési mód
    → Kikapcsolva: Nincs tömörítés
    → Enyhe: Biztonságos térköz- és formázástisztítás (~15%)
    → Normál: Távirati stílusú töltelékszó-eltávolítás (~30%)
    → Agresszív: Előzmények öregítése + összegzés (~50%)
    → Ultra: Heurisztikus ritkítás + kódblokkok ritkítása (~75%)
    → RTK: Parancsérzékeny terminál-/eszközkimenet-szűrés (60–90%-os tartomány a háttérszolgáltató felé)
    → Halmozott: Rendezett, többmotoros folyamat, általában először RTK, majd Caveman (78–95%-os tartomány az alkalmas tartalmon)
  → Tömörített kérés → Szolgáltató
```

---

## Tömörítési módok

### Off

Nincs alkalmazott tömörítés. Minden üzenet változatlanul halad át.

### Lite mód (~15% megtakarítás, <1ms késleltetés)

A legbiztonságosabb mód – nulla szemantikai változás, kizárólag formázási tisztítás:

| Technika                 | Leírás                                                    |
| ------------------------ | --------------------------------------------------------- |
| `collapseWhitespace`     | Egymást követő üres sorok és sorvégi szóközök összevonása |
| `dedupSystemPrompt`      | Ismétlődő rendszerüzenetek eltávolítása                   |
| `compressToolResults`    | Terjengős eszköz-/függvénykimenetek tömörítése            |
| `removeRedundantContent` | Ismétlődő utasítások eltávolítása                         |
| `replaceImageUrls`       | Base64-es kép-adat-URI-k lerövidítése                     |

**Ajánlott:** Folyamatosan aktív használathoz, biztonságkritikus munkafolyamatokhoz.

### Standard mód (~30% megtakarítás)

A [Caveman](https://github.com/JuliusBrussee/caveman) által inspirálva – eltávolítja a töltelékszavakat és a terjengős megfogalmazásokat a jelentés megőrzése mellett:

- Eltávolítja a töltelékszavakat ("please", "I think", "basically", "actually")
- Tömörebbre fogalmazza a terjengős kifejezéseket ("in order to" → "to", "as a result of" → "because")
- Levágja az udvarias határozatlansági formulákat ("Would you mind...", "If you could possibly...")
- 30+ kódolási promptokra hangolt regex-szabály

**Ajánlott:** Napi kódolási munkafolyamatokhoz, költségtudatos csapatoknak.

### Aggressive mód (~50% megtakarítás)

Intelligens előzménykezelés hosszú munkamenetekhez:

- **Üzenetek öregedése** – a régebbi üzenetek fokozatosan egyre erősebben tömörítődnek
- **Eszközeredmény-tömörítés** – a hosszú eszközkimenetek csonkolása vagy kihagyásos rövidítése (első/utolsó sorok, találatsor-szűrés, JSON-kulcsok tömörítése)
- **Strukturális integritási védelmek** – biztosítják, hogy a `tool_use` + `tool_result` párok konzisztensek maradjanak
- **Kontextusablak-érzékelés** – tiszteletben tartja a modellenkénti tokenkorlátokat

**Ajánlott:** Hosszas hibakeresési munkamenetekhez, nagy kódbázisokhoz.

### Ultra mód (~75% megtakarítás)

Maximális tömörítés tokenkritikus helyzetekre:

- **Heurisztikus metszés** – a prózai szöveg pontszámalapú tokenmetszése
- **Struktúramegőrzés** – a fenced kódblokkok, a soron belüli kód, az URL-ek és az azonosítók tombstone-jelölést kapnak, majd szó szerint visszaillesztésre kerülnek, és soha nem esnek áldozatul a metszésnek
- **Opcionális SLM-szint** – beállítás esetén egy kis helyi modell finomíthatja a metszést
- Független az Aggressive módtól: nem futtat üzenetöregedést, eszközeredmény-tömörítést vagy a tartalék-összefoglalót (csak az SLM-szint meghibásodása irányíthat egy tartalék menetet az aggressive felé)

**Ajánlott:** Ha ismétlődően beleütközik a kontextuskorlátokba.

### RTK mód (60–90%-os upstream-tartomány)

Az RTK mód a kódolóügynök-munkamenetekben felbukkanó terjengős eszközkimenetekre van optimalizálva:

- Parancs-/kimenetosztályokat ismer fel, például: `git status`, `git diff`, `git log`, tesztfuttatók, TypeScript/Vite/Webpack buildek, ESLint/Biome/Prettier, npm audit/telepítések, Docker-naplók, infrastruktúra-kimenet és általános shell-kimenet
- JSON-szűrőcsomagokat alkalmaz az `open-sse/services/compression/engines/rtk/filters/` útvonalról
- RTK TOML schema v1 szűrőket importál projekt- vagy globális `filters.toml` fájlokból, inline-tesztvalidációval és a projektfájlok trust-gatingjével
- 56 beépített szűrőt tartalmaz inline ellenőrzőmintákkal
- Eltávolítja az ANSI-vezérlősorozatokat, a folyamatjelzőket, az ismétlődő sorokat és a cselekvés szempontjából lényegtelen zajt
- Megőrzi a meghiúsulásokat, hibákat, figyelmeztetéseket, a módosult fájlokat, az összefoglalókat és a hosszú kimenetek végét
- Támogatja a trust-gatingelt projektszűrőket, a globális szűrőket és az opcionális, kitakart nyerskimenet-visszaállítást

**Ajánlott:** Shell-, build-, teszt-, git-, grep- és fájlkimenet-átiratokkal dolgozó ügynökmunkamenetekhez.

### Stacked mód (78–95% az alkalmazható tartományban)

A Stacked mód több tömörítési motort futtat determinisztikus sorrendben. Az alapértelmezett pipeline:

```txt
RTK -> Caveman
```

Ez a sorrend először a terminál-/eszközkimenetet tömöríti, majd a fennmaradó természetes nyelvű promptra alkalmazza a Caveman szemantikai sűrítését. A stacked pipeline-ok globálisan vagy a routing-kombókhoz rendelt tömörítési kombókon keresztül konfigurálhatók.

**Ajánlott:** Nagy eszköznaplókat valamint emberi utasításokat vagy asszisztens-összefoglalókat egyaránt tartalmazó vegyes kontextushoz.

---

## Upstream megtakarítások számítása

Az OmniRoute két forrás alapján dokumentálja a tömörítési megtakarításokat: az upstream projektek teljesítménytesztjei és az OmniRoute saját motor-összeállítása alapján.

| Forrás  | Az itt használt szám az upstream README-ből                                                                                                                |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%`-kal kevesebb kimeneti token, `65%` átlagos kimeneti megtakarítás a teljesítményteszteken, `22-87%`-os tartomány és `~46%`-os bemenettömörítő eszköz |
| RTK     | `60-90%`-os megtakarítás a parancskimeneteken; a mintamenetben `~118,000 -> ~23,900` token, vagyis `79.7%` megtakarítás (`~80%`)                           |

Az egymást átfedő eszköz-/kontextustartalmak esetén az alapértelmezett OmniRoute-kombináció egymás után alkalmazza a motorokat:

```txt
RTK -> Caveman
```

Az együttes megtakarítások szorzódnak, nem pedig összeadódnak:

```txt
combined = 1 - (1 - RTK-megtakarítás) * (1 - Caveman bemeneti megtakarítás)
átlag    = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
tartomány = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Ez a `78-95%`-os érték akkor érvényes, amikor az RTK és a Caveman is képes csökkenteni ugyanazt a bemeneti-/kontextustartalmat. A Caveman válaszkimeneti módja ettől elkülönül: amikor engedélyezve van, a Caveman saját kimeneti megtakarításait kell figyelembe venni (`65%` átlagosan, `~75%` a kiemelt érték, `22-87%`-os tartomány). A teljes számlázási megtakarítás a promptok és kimenetek arányától függ.

### Mit jelent valójában a „jogosult”

A kiemelt 15-95%-os tartomány valós, de csak a **redundáns vagy túl részletes** tartalmakra vonatkozik — ismétlődő hibaüzenetekre, ugyanazt a figyelmeztetést ontó buildnaplóra, túlméretezett `grep`-kimenetre vagy fájlbeolvasási adathalmazra. Ez **nem** jelenti azt, hogy minden kérés ennyit takarít meg.

Empirikusan ellenőrizve (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): egy `stacked` (RTK + Caveman) futtatás egy Anthropic-formájú, 300 azonos hibasort tartalmazó `tool_result` blokkon **95.93%-os tokenmegtakarítást / 96.26%-os karaktermegtakarítást** eredményezett — egyértelműen a meghirdetett tartományon belül. Ugyanez a folyamat azonban normál, nem redundáns eszközkimeneten (egy tiszta `grep`-találati listán, egy rövid fájlbeolvasáson vagy hétköznapi társalgási szövegen) helyesen **közel nulla megtakarítást** eredményez, mivel nincs eltávolítható ismétlődés, és a `validateCompression()` (`validation.ts`) nem engedélyez olyan átalakítást, amely kihagyná vagy módosítaná a kódblokkokat, URL-eket, címsorokat, verziókat vagy a csupa nagybetűs konstansazonosítókat.

Ez elvárt és biztonságos működés, nem hiba: egy olyan kódolási munkamenet, amely főként tiszta fájlokat olvas vagy keres bennük, még teljesen engedélyezett tömörítés mellett is csak mérsékelt összesített megtakarítást ér el, míg egy hibás ciklusba vagy bőbeszédű linterbe ütköző munkamenet az ilyen forgalmon a teljes 78-95%-os tartományt elérheti. Ne tekintsd egyetlen munkamenet alacsony összesített megtakarítási arányát annak bizonyítékaként, hogy a tömörítés hibásan van konfigurálva — először ellenőrizd, hogy az alapul szolgáló eszközkimenet valóban redundáns volt-e.

---

## Tokenmegtakarítás vizualizációja

```
Tömörítés nélkül: 47K token elküldve az LLM-nek
Lite móddal:      40K token elküldve            (15% megtakarítás — biztonságos, mindig aktív)
Standard móddal:  33K token elküldve            (30% megtakarítás — caveman-speak szabályok)
Aggressive móddal: 24K token elküldve           (50% megtakarítás — öregítés + összefoglalás)
Ultra móddal:     12K token elküldve            (75% megtakarítás — heurisztikus ritkítás)
RTK-val:          19K-5K token elküldve         (60-90% megtakarítás a parancs-/eszközkimeneten)
Stacked móddal:   10K-2.5K token elküldve       (78-95%-os tartomány az arra jogosult RTK+Caveman-tartalmaknál)
```

---

## Konfiguráció

### Irányítópult

Lépjen az `Irányítópult → Kontextus és gyorsítótár` menüpontra:

- **Caveman** — módválasztás, nyelvi csomagok, előnézet és globális alapértelmezések
- **RTK** — parancsszűrők előnézete, RTK biztonsági beállítások és szűrőkatalógus
- **Tömörítési kombinációk** — útválasztási kombinációkhoz rendelt, névvel ellátott motorfolyamatok
- **Automatikus aktiválási küszöbérték** — automatikusan bekapcsolja a tömörítést, amikor a tokenek száma meghaladja a küszöbértéket

### Kombinációnkénti felülbírálás

Az `Irányítópult → Kontextus és gyorsítótár → Tömörítési kombinációk` menüpontban rendeljen hozzá egy tömörítési kombinációt egy útválasztási kombinációhoz:

```txt
Kombináció: "free-tier-fallback"
  Tömörítési kombináció: "coding-agent-stack"
  Folyamat: RTK -> Caveman
  Célok:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Ez lehetővé teszi a halmozott tömörítés használatát ingyenes/kódolási szolgáltatóknál, miközben a fizetős előfizetéseknél megtartja a Lite módot.

Ez a „Kombinációnkénti felülbírálás” hozzárendelés eltérő vezérlőelem, mint az **útválasztási kombináció tömörítési módjának** felülbírálása (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — a mező sémája az `rtk`, `stacked` és `omniglyph` értékeket is elfogadja) — ez a felülbírálás nem választ ki névvel ellátott tömörítésikombináció-folyamatot; csupán beállítja a `resolveCompressionPlan` által figyelembe vett `compressionMode` mezőt. Beállítható a kombináció kártyáján (`Irányítópult → Kombinációk`), illetve a #6760 óta útválasztási kombinációnként az „Útválasztáshoz rendelés” listában is, az `Irányítópult → Kontextus és gyorsítótár → Tömörítési kombinációk` menüpontban, közvetlenül a fent dokumentált folyamathoz-rendelési jelölőnégyzet mellett. Mindkét felületen végzett módosítás ugyanazon a `PUT /api/combos/{id}` végponton keresztül marad meg.

### Kérésenkénti felülbírálás

Küldje el az `x-omniroute-compression` kérésfejlécet, ha egyetlen kérésre szeretné felülbírálni a tömörítési tervet. Ennek van a legmagasabb prioritása — felülírja az útválasztási kombináció felülbírálását, az aktív profilt, az automatikus aktiválást és a panel Default beállítását. Az ismeretlen értékeket a rendszer figyelmen kívül hagyja (a kérést soha nem utasítja el), és továbbra is a globális főkapcsoló vezérel mindent: ha a tömörítés globálisan ki van kapcsolva, a fejléc nem kapcsolhatja be. Értékek:

| Érték         | Hatás                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `off`         | Ennél a kérésnél nincs tömörítés.                                                                                                     |
| `default`     | A panelből származtatott Default profil (figyelmen kívül hagyja az aktív profilt). A veszteséges motorok kikapcsolva maradnak.        |
| `safe`        | Ugyanaz, mintha kihagyná a fejlécet: csak deduplikáció és szóköz-összevonás.                                                          |
| `allow-lossy` | Megtartja a kérés operátori tervét, beleértve az összegzéseket, a relevanciaszűrőket és a stílusátírásokat.                           |
| `engine:<id>` | Egyetlen motor, ha engedélyezve van, például `engine:rtk`. Ez az adott motor kérésenkénti engedélyezése.                              |
| `<combo>`     | Egy névvel ellátott kombináció; először név alapján, kis- és nagybetűktől függetlenül, majd azonosító alapján történik az egyeztetés. |

Az `allow-lossy`, az `engine:<id>` vagy egy névvel ellátott kombináció nélkül a veszteséges motorok nem kerülnek alkalmazásra. Ha a tömörítés be van kapcsolva, a kérés továbbra is munkamenet-szintű deduplikációt és szóköz-összevonást kap.

Az alkalmazott tervet a válasz az `X-OmniRoute-Compression: <mode>; source=<source>` fejlécben küldi vissza, ahol a `<source>` a következők egyike: `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` vagy `off`.

### API

```bash
# Tömörítési beállítások lekérése
curl http://localhost:20128/api/settings/compression

# Tömörítési beállítások frissítése
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Egy adott RTK/stacked adattartalom előnézete
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK szűrőcsomagok listázása
curl http://localhost:20128/api/context/rtk/filters

# Az RTK közvetlen tesztelése opcionális parancsmetaadatokkal
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Mi kerül védelem alá

A tömörítőmotor **mindig megőrzi a következőket:**

- ✅ Kódblokkok (elkerített és soron belüli)
- ✅ URL-ek és fájlelérési utak
- ✅ JSON-struktúrák és strukturált adatok
- ✅ Azonosítók és védett technikai tokenek
- ✅ Matematikai kifejezések
- ✅ Eszköz- és függvényhívások definíciói
- ✅ Rendszerpromptok (lite módban)

Az RTK nyerskimenet-visszaállítása kitakarja a gyakori API-kulcsokat, bearer tokeneket, Slack-tokeneket, AWS-hozzáférési kulcsokat,
jelszavakat, tokeneket és titkos adatokat, mielőtt bármi tartósan tárolásra kerülne.

---

## Tömörítési statisztikák

Minden tömörített kérés statisztikákat tartalmaz a szervernaplókban:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Fázisütemterv

| Fázis    | Módok                                                                                                                                                            | Állapot   |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 1. fázis | Off, Lite                                                                                                                                                        | ✅ Kiadva |
| 2. fázis | Standard, Aggressive, Ultra                                                                                                                                      | ✅ Kiadva |
| 3. fázis | RTK, Stacked, Compression Combos                                                                                                                                 | ✅ Kiadva |
| 4. fázis | Output Styles, SLM-szintű Ultra, kiértékelési keretrendszer                                                                                                      | ✅ Kiadva |
| 4C fázis | Adaptív kontextuskeret („tárcsa”) — számítási motor + API (`contextBudget` a `PUT /api/settings/compression` végponton) + irányítópulti mód- és házirendvezérlők | ✅ Kiadva |

---

## Köszönetnyilvánítás

A Standard mód tömörítési szabályait **[JuliusBrussee](https://github.com/JuliusBrussee)** **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) projektje ihlette — a virálissá vált „minek sok token, ha kevés token is elég” projekt. A Caveman beszámolója szerint `~75%`-kal kevesebb kimeneti tokent használ, a benchmarkok átlagában `65%`-os kimeneti megtakarítást ér el, a kimeneti megtakarítás tartománya `22-87%`, a bemenettömörítő eszköz pedig `~46%`-os eredményt nyújt.

Az RTK módot az **[RTK AI](https://github.com/rtk-ai)** **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** projektje ihlette — ez egy nagy teljesítményű parancskimenet-tömörítési projekt terminál-, build-, teszt-, git- és eszközkimenetek szűrésére. Az RTK `60-90%`-os megtakarításról számol be, a README-ben szereplő mintamunkamenet pedig `~80%`-os megtakarítást mutat.

---

## Fejlett tömörítési rendszerek

A fent ismertetett 7 módon túl (a forrás elfogadja a `codex-responses` és az
`omniglyph` módokat is, amelyekre ez az útmutató nem tér ki) az alábbi szakaszok
azokat a funkciókat mutatják be, amelyek e módokon belül vagy azok mellett működnek:
a Tool Result Compression és a Progressive Aging az agresszív motor 1. és 2. lépése
(Aggressive mód, illetve egy összefűzött feldolgozási folyamat `aggressive` lépése),
a Stacked Pipeline határozza meg a Stacked mód működését, a Cache-Aware Compression
az `aggressive` és `ultra` módokat `standard` módra fokozza vissza a gyorsítótárazást
használó szolgáltatóknál, amikor a tömörítés be van kapcsolva, a Caveman Output Mode
és az Output Styles pedig alapértelmezés szerint kikapcsolt, opcionális rendszerprompt-
utasítások, amelyek a kérés tömörítése helyett a modell kimenetét alakítják.

### Gyorsítótár-tudatos tömörítés

Egyes szolgáltatók (például az Anthropic promptgyorsítótárazással) támogatják a
**promptgyorsítótárazást**, amely lehetővé teszi számukra a prompt egyes részeinek
gyorsítótárazását a költségek és a késleltetés csökkentése érdekében. Ha a
gyorsítótárazás engedélyezve van, az agresszív tömörítés valójában **ronthatja**
a teljesítményt, mert megváltoztatja a gyorsítótárazott tokeneket, és ezzel
érvényteleníti a gyorsítótárat.

A `cachingAware.ts` modul ezt a **gyorsítótárazási környezet észlelésével** és
a **tömörítési stratégia megfelelő módosításával** oldja meg.

#### Működése

1. **Gyorsítótárazási környezet észlelése** — Átvizsgálja a kérés törzsét `cache_control` jelölők után
2. **Gyorsítótárazást támogató szolgáltatók azonosítása** — Ellenőrzi, hogy a célszolgáltató támogatja-e a gyorsítótárazást
3. **Stratégia módosítása** — Az `aggressive`/`ultra` módot `standard` módra fokozza vissza a gyorsítótárazást támogató szolgáltatóknál
4. **Rendszerprompt kihagyása** — A rendszerpromptokat általában gyorsítótárazzák, ezért ezeket nem tömöríti

A stratégiasegéd egy `deterministicOnly` jelzőt is visszaad, de a tervkészítő csak
a stratégiát használja fel — jelenleg a feldolgozási lánc későbbi részein semmi sem
olvassa ezt a jelzőt.

#### Kódpélda

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Gyorsítótárjelölő
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Mikor használja

A gyorsítótár-tudatos tömörítés **mindig be van kapcsolva** — nincs szükség
konfigurációra. Akkor lép működésbe, amikor a tömörítés be van kapcsolva, és a
célszolgáltató támogatja a promptgyorsítótárazást (Anthropic, OpenAI stb.); explicit
`cache_control` jelölők nem szükségesek — már önmagában egy gyorsítótárazást támogató
szolgáltató is kiváltja a visszafokozást, míg a jelölők önmagukban soha nem teszik ezt
(a jelölők észlelése a gyorsítótár telemetriájához szolgáltat adatokat, nem a stratégiai
döntéshez).

### Progresszív öregítés

A hosszú beszélgetésekben sok üzenetforduló halmozódik fel, de a régebbi fordulók
egyre kevésbé relevánsak. A `progressiveAging.ts` modul **a fordulótávolság alapján
egyszerűsíti az üzeneteket** (a távolságot a beszélgetés végétől mérve). A mellékelt
alapértelmezésekkel (`verbatim: 2, light: 2, moderate: 3`):

- **Utolsó 2 forduló (távolság ≤ 2)**: Változtatás nélkül marad
- **3-as távolság**: Ősember-tömörítés (a töltelékszavak eltávolítása)
- **4-es vagy nagyobb távolság**: Az asszisztens üzeneteit összegzi; a felhasználói
  üzeneteket az első sorukra rövidíti, legfeljebb 120 karakterre; a többi szerepkört
  változatlanul hagyja. A rendszerpromptok, a már öregített üzenetek és a legutóbbi
  felhasználói üzenet a távolságtól függetlenül mindig változtatás nélkül maradnak.
  Semmit sem dob el teljesen, a `light`
  sáv pedig nem érhető el a mellékelt alapértelmezésekkel (a `light` értéke megegyezik
  a `verbatim` értékével).

#### Kódpélda

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... további 50 forduló ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // utolsó 3 forduló: változtatás nélkül
  light: 8, // távolság <= 8: könnyű tömörítés
  moderate: 20, // távolság <= 20: ősember-tömörítés
  fullSummary: 5, // a típus megköveteli, de a sávkezelő kód nem olvassa
  // távolság > 20: összegzés (asszisztens) / az első sor megtartása (felhasználó)
});

// saved = a megtakarított tokenek száma
```

#### Mikor használja

A progresszív öregítés **mindig be van kapcsolva** az `aggressive` módban — ez a
`compressAggressive()` 2. lépése. Az Ultra mód nem futtatja. Különösen hatékony
a következő esetekben:

- Hosszan futó programozási munkamenetek
- Többnapos beszélgetések
- Sok eszközhívást tartalmazó ügynöki munkafolyamatok

### Ősember kimeneti mód

Az ősember kimeneti mód **rendszerprompt-utasításokat** ad hozzá, amelyek tömör
kimenetet kérnek magától a modelltől — a `lite` szint tömör, de teljes mondatokat
megőrző válaszokat kér, a `full` arra kéri, hogy „válaszolj tömören, mint egy okos
ősember”, az `ultra` pedig távirati stílusú kimenetet kér; az utasítások csak kérik
ezt, garantálni nem tudják. A kérések az `applyOutputStyles()` függvényen
(`open-sse/services/compression/outputStyles/apply.ts`) keresztül kapják meg ezeket:
az `open-sse/handlers/chatCore.ts` először a visszafelé kompatibilitási segédréteggel
oldja fel a kiválasztást (`resolveOutputStyleSelection()` az
`open-sse/services/compression/outputStyles/backCompat.ts` fájlban), amely üres
`outputStyles` esetén az engedélyezett `cavemanOutputMode` beállítást a `terse-prose`
kimeneti stílusra képezi le a `cavemanOutputMode.intensity` intenzitással (lásd alább
a Visszafelé kompatibilitás című részt); a nem üres `outputStyles` kiválasztást
változtatás nélkül használja, és ekkor a `cavemanOutputMode.enabled` és az `intensity`
nincs hatással, míg az `autoClarity` kapcsolója továbbra is érvényesül. Az
`outputMode.ts` tartalmazza az utasításszövegeket
(`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), a tartalmi megkerülést és az elhelyezési
segédfüggvényt, amelyet a beszúrás használ; a saját `applyCavemanOutputMode()`
beszúrójának nincs éles környezetben használt hívója.

#### Működése

Ez a mód nem tömöríti a bemenetet. Egy utasításblokkot ad a rendszerprompthoz
(lásd alább: Hogyan működik a beillesztés), és a kéréshez kiválasztott bármely bemenettömörítési mód
ezután továbbra is lefut az immár blokkot tartalmazó törzsön. A minden szint végén szereplő közös
korlátozási záradék előtt az angol `full` szint szövege:

> "Válaszolj tömören, mint okos ősember. Hagyd el a névelőket (a/an/the), a töltelékszavakat (just/really/basically/actually/simply), az udvariaskodást és az óvatoskodást. Töredékek rendben. Rövid szinonimák (big, nem extensive; fix, nem implement). Minden technikai tartalmat, kódot, hibát, URL-t és azonosítót őrizz meg pontosan."

Ez különösen jól működik a következőkhöz:

- Kódgenerálás (tömörebb kimenet = kevesebb token)
- Gyors kérdések és válaszok (nincs szükség részletes magyarázatokra)
- Kötegelt feldolgozás (maximális áteresztőképesség)

#### Mikor használd

A caveman kimeneti mód használata **külön engedélyezendő**. Bekapcsolt tömörítés mellett (`enabled: true`, a Compression Settings oldalon lévő főkapcsoló
bekapcsolva) a `cavemanOutputMode.enabled` beállítással kapcsolható be; az `intensity`
választja ki a `lite`, `full` vagy `ultra` szintet:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Egy tömörítési kombináció **Output Mode** kapcsolója (`outputMode`, a szint pedig az `outputModeIntensity`)
ugyanezt a kapcsolót állítja be azokra a kérésekre, amelyekre a kombináció vonatkozik, az
`omniroute_set_compression_engine` MCP-eszköz pedig a logikai `outputMode`
argumentumán keresztül írja azt. Egy nem üres `outputStyles`-kiválasztás elsőbbséget élvez ezzel a kapcsolóval szemben. Az
irányítópulton a **Terse prose** kimeneti stílus engedélyezése ugyanezt a blokkot illeszti be (lásd alább:
Kimeneti stílusok).

### Kimeneti stílusok (katalógus)

A fenti caveman kimeneti mód a **régi, egyetlen stílust használó útvonal**. A 4. fázis ezt
komponálható kimeneti stílusok katalógusává általánosította: `OUTPUT_STYLE_CATALOG` az
`open-sse/services/compression/outputStyles/catalog.ts` fájlban. Minden stílus egy rendszerprompt-
utasítás, amely olcsóbb kimenetet kér magától a modelltől; a stílusok
együtt is engedélyezhetők, és katalógusbeli sorrendben lesznek beillesztve.

| Stílus                                  | `id`            | Mit csinál                                                                                                                                                                                                                                                                                                                          | Utasítások nyelvei                            |
| --------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Tömör próza                             | `terse-prose`   | Elhagyja a töltelékszavakat/névelőket/óvatoskodást; a technikai tartalmat pontosan megőrzi. Ugyanaz a szöveg, mint a régi caveman kimeneti módban (hivatkozva, nem ismételten leírva).                                                                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Kevesebb kód                            | `less-code`     | YAGNI-létra: a legkisebb működő módosítás, nem kért absztrakciók nélkül.                                                                                                                                                                                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Lófarok (lusta senior fejlesztő)        | `ponytail`      | „A legjobb kód az, amelyet sosem írtak meg”: újrafelhasználás > újraírás, kiváltó ok > tünet, legrövidebb működő diff.                                                                                                                                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| ADHD-m van (cselekvésközpontú)          | `i-have-adhd`   | Először a művelet (parancs/útvonal/kódrészlet a próza előtt), számozott és korlátozott lépések, EGY konkrét következő lépés, nincs bevezetés/összefoglalás/lezárás. Az [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) alapján adaptálva (MIT).                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop UI-szűrő                       | `antislop-ui`   | Minden vizuális technikának át kell mennie egy célszerűségi teszten (hierarchia, identitás, olvashatóság); nincsenek alapértelmezett színátmenetek/üveghatás/ragyogás, korlátozott paletta, nincsenek sablonelrendezések. Mindkét antislop stílus hozzáad egy nem működő vezérlőelemeket és kitalált állításokat tiltó korlátozást. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Antislop szöveg- és emberközpontú szűrő | `antislop-copy` | Konkrét szöveg (nincs gondolatjel, általános CTA, divatszó, chatbothoz illő lezárás vagy kitalált tény), valamint emberekre vonatkozó szabályok: WCAG AA kontraszt, látható fókusz, billentyűzetes elérhetőség, üres/betöltési/hibaállapotok, mobilos újratördelés.                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Tömör CJK (文言)                        | `terse-cjk`     | `full`/`ultra` válasz klasszikus kínai nyelven (文言); a `lite` csak rövid válaszokat kér funkciószavak, udvariaskodás vagy díszítés nélkül.                                                                                                                                                                                        | zh (területi beállításhoz kötött, lásd alább) |

Minden stílus három intenzitási szinttel érkezik — `lite`, `full`, `ultra` —, és minden szint
a közös korlátozási záradékkal végződik (`SHARED_BOUNDARIES` az `outputMode.ts` fájlban), amely
pontosan megőrzi a kódblokkokat, fájlútvonalakat, parancsokat, hibákat és URL-eket. A `terse-prose` és
`terse-cjk` szintek szövegei az azonosítókat is hozzáadják ehhez a listához.

A `terse-cjk` két helyen is a `zh` területi beállításhoz van kötve. A Compression Settings oldal
csak akkor jeleníti meg a sorát, ha az irányítópult felhasználói felületének nyelve kínai (`zh-CN` vagy `zh-TW`), az
`applyOutputStyles()` pedig csak akkor illeszti be, ha a kérés feloldott nyelve (lásd alább:
Nyelvválasztás) `zh`. A sor elrejtése nem törli a mentett `terse-cjk`-kiválasztást:
a beállítási API bármely stílusazonosítót elfogad, és más stílusok mentése az oldalon megtartja azt. A
kérés feldolgozásakor az `applyOutputStyles()` nyelvi ellenőrzése az egyetlen területi korlátozás.

#### Hogyan működik a beillesztés

Az `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) feloldja
a kiválasztást a katalógus alapján (az ismeretlen azonosítók és a területi beállítással
nem egyező stílusok el lesznek vetve, ez soha nem eredményez hibát; ha a kiválasztás
feloldása egyetlen stílust sem eredményez, a törzs változatlan marad, és `no_styles`
okkal lesz kihagyva), a kiválasztott utasításokat katalógusbeli sorrendben összefűzi,
**egyszer** hozzáfűzi a korlátokra vonatkozó záradékot (valamint a biztonsági záradékot,
a `SAFETY_BOUNDARIES` értékét vagy annak fordítását, ha a `less-code` vagy a `ponytail`
van kiválasztva), és a blokkot egyetlen idempotenciajelölővel
(`[OmniRoute Output Styles]`) kezdi, így az ismételt alkalmazás nem jár módosítással. Ha
a feloldott nyelvhez (lásd alább a Nyelvválasztás részt) létezik fordítás, az angol
helyett a lokalizált utasítás kerül beillesztésre.

Nem üres `messages` tömböt tartalmazó törzsön az idempotencia-ellenőrzés a
tartalomalapú megkerülés előtt fut le: ha az `[OmniRoute Output Styles]` jelölő már
szerepel a felső szintű `system` mezőben (amely lehet karakterlánc vagy
tartalomblokkokból álló tömb), illetve karakterlánc típusú tartalommal rendelkező
rendszerüzenetben, a törzs `already_applied` okkal változatlan marad, és
kulcsszó-ellenőrzés sem fut le. Ellenkező esetben egy tartalomalapú megkerülés
(`shouldBypassCavemanOutputMode()` az
`open-sse/services/compression/outputMode.ts` fájlban) ellenőrzi az utolsó három üzenet
szövegét, a szerepüktől függetlenül, és az egész fordulóra kihagyja a stílusokat, ha a
szöveg megfelel a biztonsági, visszafordíthatatlan műveletekre vagy pontosításra
vonatkozó kulcsszavaknak, illetve egy sorrendérzékeny sorozatnak: `first`, `then`,
`after that`, `before`, `rollback` vagy `backup`, amelyet 240 karakteren belül `delete`,
`drop`, `migrate`, `deploy` vagy `release` követ. A megkerülés addig fut, amíg az
**Automatikus egyértelműsítési megkerülés** kapcsoló
(`cavemanOutputMode.autoClarity`, alapértelmezés szerint bekapcsolva) be van kapcsolva;
a kapcsoló kikapcsolásával a kulcsszó-ellenőrzés kimarad.

Ha a megkerülés átengedi a fordulót, a `placeSystemInstruction()` (ugyanabban a
fájlban), amely soha nem hoz létre új `messages[0]` elemet, a blokkot az alábbiak közül
az első megtalált helyre teszi:

1. Egy kezdő, karakterlánc típusú tartalommal rendelkező rendszerüzenet: a blokk annak
   szövege után lesz hozzáfűzve.
2. A felső szintű `system` mező: a blokk egy karakterlánc szövege után lesz hozzáfűzve,
   vagy új szövegblokként kerül egy tartalomblokkokból álló tömbbe.
3. Az első későbbi, karakterlánc típusú tartalommal rendelkező rendszerüzenet: a blokk
   annak szövege után lesz hozzáfűzve.
4. Ha a fentiek egyike sem található: a blokk a `messages` végén létrehozott új
   rendszerüzenetbe kerül.

`messages` tömb nélküli (vagy üres tömbbel rendelkező) törzsön nem fut tartalomalapú
megkerülés, és a felső szintű `system` mezőt sem veszi figyelembe a rendszer. A blokk
egy karakterlánc típusú `instructions` mező szövege után lesz hozzáfűzve, kivéve, ha az
a mező már tartalmazza az `[OmniRoute Output Styles]` jelölőt; ebben az esetben a törzs
`already_applied` okkal változatlan marad. Ha a törzs nem rendelkezik karakterlánc
típusú `instructions` mezővel, de tartalmaz `input` mezőt (karakterláncot vagy tömböt),
akkor a blokk lesz az `instructions` értéke, felülírva a mező esetleges nem
karakterlánc típusú értékét. Az olyan törzs, amely sem karakterlánc típusú
`instructions` mezővel, sem karakterlánc vagy tömb típusú `input` mezővel nem
rendelkezik, változatlan marad, és `no_messages` okkal lesz kihagyva.

#### Engedélyezés

Az irányítópulton: **Tömörítési kontextus → Tömörítési beállítások**
(`/dashboard/context/settings`), a Kimeneti stílusok szakaszban: stílusonként egy sor,
egy be-/kikapcsolóval és egy szintválasztóval. A stílusok addig kerülnek beillesztésre,
amíg maga a tömörítés be van kapcsolva (az oldal `enabled` főkapcsolója). Az
**Automatikus egyértelműsítési megkerülés** kapcsoló a **Caveman** oldalon
(`/dashboard/context/caveman`), annak **Kimeneti mód** kártyáján található. Programozott
használat esetén a tömörítési konfiguráció a következőképpen tárolja a kiválasztást:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Visszafelé kompatibilitás: amíg az `outputStyles` üres, a régi
`cavemanOutputMode.enabled` beállítás a `terse-prose` stílusra képeződik le a
`cavemanOutputMode.intensity` intenzitással. Ekkor a blokk az
`[OmniRoute Output Styles]` jelölővel kezdődik, míg a régi
`applyCavemanOutputMode()` beillesztő az `[OmniRoute Caveman Output Mode]` jelölőt írta.
A jelölő alatt a szöveg megegyezik a régi beillesztés szövegével en, pt-BR, es, de, fr,
it, ru, id és vi nyelven; ja és zh nyelven egy további szóközt tartalmaz a korlátokra
vonatkozó záradék előtt. A `terse-prose` rendelkezik pt-BR, es, de, fr, it, ru, zh, ja,
id és vi fordítással, ezért a `hu` feloldott nyelvű kérés angol szöveget kap ott, ahol a
régi beillesztő a magyar változatot használta.

A kimeneti stílus nyelvének kiválasztása (`resolveOutputStyleLanguage()` az
`outputStyles/apply.ts` fájlban): ha a `languageConfig.enabled` be van kapcsolva, az
`autoDetect` mintát vesz a kérés `messages` tömbjének legutóbbi, szöveget tartalmazó
felhasználói üzenetéből (karakterlánc típusú tartalomból vagy a tartalomrészek `text`
értékéből), és lefuttatja rajta a Caveman motor érzékelőjét
(`detectCompressionLanguage()`). Az érzékelő `zh` értéket ad vissza a Han-írásjegyeket,
de kanát nem tartalmazó szövegekhez; egyébként az `it`, `pt-BR`, `es`, `de`, `fr`, `ru`,
`ja`, `hu` és `id` közül azt adja vissza, amelyiknél a legtöbb utalás egyezik, és `en`
értéket, ha nincs egyezés — az osztályozhatatlan szöveg mindig angol lesz, soha nem a
`defaultLanguage`, a `vi` nyelvet pedig soha nem érzékeli, noha a stílusokhoz tartozik
`vi` nyelvű szöveg. A Responses API törzse az `input` mezőben tárolja a fordulóit,
amelyből nem történik mintavétel, így az először a `defaultLanguage`, majd az angol
nyelvet kapja. Ha a `messages` egyetlen felhasználói üzenete sem tartalmaz szöveget,
vagy az `autoDetect` ki van kapcsolva, a `defaultLanguage`, majd az angol nyelv lesz
alkalmazva. Ha a `languageConfig.enabled` ki van kapcsolva, a nyelv angol — kivéve, ha
egy tömörítési kombináció vonatkozik a kérésre (a kérés útválasztási kombinációjához
rendelt kombináció, vagy az alapértelmezett tömörítési kombináció, amelyre a chatCore
visszaáll a beépített, rétegzett feldolgozási folyamat esetén): egy kombináció
alkalmazása az adott kéréshez bekapcsolja a `languageConfig.enabled` beállítást, és a
kombináció nyelvi csomagjai alapján állítja be a `defaultLanguage` értékét (a mentett
értéket, ha az szerepel a kombináció csomagjai között, egyébként a kombináció első
csomagját, amely alapértelmezés szerint `en`), miközben a mentett `autoDetect`
(alapértelmezés szerint bekapcsolva) továbbra is érvényes. A Caveman bemeneti motor
eltérően választja ki a szabálycsomag nyelvét — szövegrészenként, kikapcsolt automatikus
érzékelés esetén pedig az `enabledPacks` alapján korlátozva.

A stílus × nyelv mátrixot a
`tests/unit/compression/output-styles-i18n-matrix.test.ts` rögzíti: minden katalógusstílushoz
kell tartoznia egy bejegyzésnek a teszt `BASELINE_LANGUAGES` értékében; a területi
beállításhoz nem kötött stílusokhoz pt-BR fordítást kell biztosítani (a területi beállításhoz
kötött `terse-cjk` mentesül e szabály alól), kivéve, ha a stílus szerepel a
`KNOWN_ENGLISH_ONLY` listában, amely kizárólag olyan stílusokat tartalmazhat, amelyekhez
egyáltalán nincs fordítás — ha egy felsorolt stílushoz bármilyen fordítás tartozik, a
teszt sikertelen lesz; továbbá egy stílus tesztje akkor is sikertelen, ha elveszít egy
olyan nyelvet, amely szerepel a hozzá tartozó `BASELINE_LANGUAGES` bejegyzésben. Új stílus
hozzáadásához lásd:
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Eszközeredmények tömörítése

Az `open-sse/services/compression/toolResultCompressor.ts` fájlban található
`compressToolResult()` **5 stratégiával** tömöríti az eszközeredmények szövegét. Ezeket
ebben a sorrendben próbálja ki, és az első olyan engedélyezett stratégia határozza meg
az eredményt, amelynek ellenőrzése illeszkedik a tartalomra:

1. **`fileContent`**: legalább 3 sorból álló tartalom, amelyben legalább egy sor — a
   kezdő behúzást figyelmen kívül hagyva — `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` vagy `return ` karakterlánccal (a kulcsszó és egy szóköz),
   illetve `if`, `for` vagy `while` karakterlánccal kezdődik, amelyet `(` vagy ` (` követ;
   megtartja az első 20 és az utolsó 5 sort, a kihagyott középső részt pedig megjelöli.
2. **`grepSearch`**: olyan tartalom, amelyben legalább egy `<path>:<digits>:` alakú sor
   található, ahol az első kettőspont előtti szövegben nincs térköz; csak ezeket a
   sorokat tartja meg, legfeljebb 30-at, majd feltünteti a további találatok számát és
   az egyező fájlok listáját; minden más sort eldob. Már egyetlen ilyen sor elegendő a
   stratégia aktiválásához, ezért egy időbélyeggel, például `12:30:45` értékkel kezdődő
   naplósor is találatnak számít.
3. **`shellOutput`**: az olyan kimenetből, amely ANSI CSI-szekvenciát tartalmaz (`ESC[`,
   majd számjegyek vagy pontosvesszők, végül egy betű, mint a színkódokban), vagy
   amelyben a szöveg bármely részén egy `$` jelet térköz követ, eltávolítja ezeket a
   szekvenciákat (a többi escape-szekvenciát, például az `ESC[?25l` értéket vagy egy
   OSC-ablakcím-szekvenciát megtartja), és az utolsó 50 sort tartja meg, az egymást
   követő ismétlődő sorokat összevonva. Mivel ez az ellenőrzés a `json` és az
   `errorMessage` előtt fut le, az ilyen `$` jelet tartalmazó JSON- vagy hibakimenet
   soha nem jut el hozzájuk, amíg a `shellOutput` be van kapcsolva.
4. **`json`**: a 2 000 karakternél hosszabb, `{` vagy `[` karakterrel kezdődő (az
   opcionális térközök után), sikeresen elemezhető JSON-adat rövidített összegzést kap:
   a 7-nél több elemet tartalmazó tömbből megmarad az első 5 és az utolsó 2 elem,
   valamint az elemek teljes száma; egy objektumból pedig az első 20 kulcs marad meg,
   miközben minden beágyazott objektum- vagy tömbértéket egy `{…N keys}` helyőrző vált
   fel (tömb esetén N a tömb hossza), és egy `_remaining_<N>_keys` jelölő mutatja az
   első 20 után eldobott kulcsok számát. A skalárértékeket teljes egészében átmásolja,
   így egy legfeljebb 20 kulcsból álló, beágyazott értékek nélküli objektum csupán új
   behúzást kap — a tömörített változat karaktereinek száma nő, ezért változatlan marad.
5. **`errorMessage`**: az olyan kimenet, amely bárhol és a kis- és nagybetűktől
   függetlenül tartalmazza az `error:`, `error ` (a szó, amelyet szóköz követ, például
   `no error found`), `[error]`, `exception:`, `exception `, `[exception]` vagy
   `traceback` karakterláncot, megtartja az első sort, a következő 10 sort és az utolsó
   3 sort, a közöttük lévő sorokat pedig egy `… [N frames elided] …` jelölővel
   helyettesíti. A jelölő csak akkor jelenik meg, ha az első sort több mint 13 sor
   követi, ezért a legfeljebb 14 soros hibakimenet nem rövidül (12 vagy 13 sor esetén az
   utolsó 3 sor megismétli a már megtartott sorokat).

Ha egy stratégia illeszkedik, a későbbi stratégiákat már nem próbálja ki, még akkor sem,
ha az adott stratégia semmit sem takarít meg. Ha az illeszkedő stratégia becslés szerint
egyetlen tokent sem takarít meg (hossz ÷ 4, felfelé kerekítve) — például egy legfeljebb
25 soros, kódszerű fájl vagy egy 2 000 karakternél hosszabb, legfeljebb 7 elemből álló
JSON-tömb esetén —, az agresszív motor megtartja az eredeti eszközeredményt: mindkét hívó
(`compressAggressive()` és `compressAnthropicToolResultBlock()`) megtartja az eredetit,
ha a `saved` értéke 0 vagy kisebb, miközben maga a `compressToolResult()` továbbra is az
adott stratégia kimenetét adja vissza. Az eszközeredmény lépése nem feltétlenül a végső
döntés: a motor tartalék összegzője továbbra is lerövidítheti a 8 192 karakternél
hosszabb `tool` vagy `function` üzeneteket (`maxTokensPerMessage`, 2 048, szorozva 4-gyel).

#### Mikor érdemes használni

Az eszközeredmények tömörítése az agresszív motor 1. lépése (`compressAggressive()` az
`open-sse/services/compression/aggressive.ts` fájlban), ezért Aggressive módban és egy
halmozott folyamat `aggressive` lépésében fut. Tömöríti az OpenAI-formátumú `tool` és
`function` üzeneteket, valamint az Anthropic `tool_result` blokkokban lévő szöveget.
Minden stratégiának saját kapcsolója van az `aggressive.toolStrategies` alatt, és
alapértelmezés szerint mindegyik be van kapcsolva. Az irányítópulton a kapcsolók a
Caveman oldal **Advanced** nézetében találhatók, amikor a tömörítés be van kapcsolva,
és az alapértelmezett mód Aggressive.

### Halmozott folyamat

A halmozott mód **több motort futtat egymás után** — általában először az RTK-t
(60–90%-os megtakarítás az eszközkimeneten), majd a Cavemant a fennmaradó szövegen
(~46%-os bemeneti megtakarítás). Ezek együtt a **78–95%-os alkalmazható tartományt**
adják (lásd fentebb az upstream megtakarítások számítását):
`1 - (1 - 0.60..0.90) × (1 - 0.46)` átlaga ≈89%.

#### Működése

```
Bemenet (1000 token)
  → RTK (parancsérzékeny szűrő) → 200 token
    → Caveman (töltelékszöveg eltávolítása) → 108 token
  → Kimenet (108 token, ~89%-os megtakarítás)
```

#### Mikor érdemes használni

A halmozott módot a következőkhöz használja:

- Eszközigényes munkafolyamatok (ágensalapú kódolás, kutatás)
- Költségérzékeny kötegelt feldolgozás
- Amikor maximális tokenmegtakarításra van szüksége

A halmozott folyamatokat a globális `stackedPipeline` tömörítési beállítással, vagy egy
útválasztási kombinációhoz rendelt, elnevezett tömörítési kombinációval lehet
konfigurálni (lásd fentebb a kombinációnkénti felülbírálást) — nem pedig egy automatikus
kombináció `modePack` mezőjén keresztül (ez a mező csak újrasúlyozza az automatikus
kombináció modellválasztását, és a `stacked` nem érvényes csomagnév).

---

## Kombinációnkénti tömörítési felülbírálások

A globális tömörítési módot **kombinációnként** felülbírálhatja, hogy finomhangolja a működést
a különböző felhasználási esetekhez:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Ez a következő esetekben hasznos:

- **Kódolási kombinációk**: Hosszú munkamenetekhez használja az `aggressive` módot
- **Gyors kérdés-válasz kombinációk**: A gyors válaszokhoz használja a `lite` módot
- **Eszközigényes kombinációk**: A maximális megtakarításhoz használja a `stacked` módot
- **Éles környezetben használt kombinációk**: gyorsítótárazást végző szolgáltatók esetén hagyja kikapcsolva a felülbírálást — a mindig aktív,
  gyorsítótár-tudatos beállítás automatikusan `standard` szintre csökkenti az `aggressive`/`ultra` módot
  (nem választható `cache-aware` mód)

---

## Lásd még

- [Környezeti konfiguráció](../reference/ENVIRONMENT.md) — A tömörítés környezeti változói
- [Architekturális útmutató](../architecture/ARCHITECTURE.md) — A tömörítési folyamat belső működése
- [Felhasználói útmutató](../guides/USER_GUIDE.md) — Első lépések a tömörítéssel
- [RTK-tömörítés](./RTK_COMPRESSION.md) — RTK-szűrők, megbízhatósági modell, ellenőrzési kapu, nyers kimenet helyreállítása
- [Tömörítési motorok](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API-k, MCP, irányítópult
- [Tömörítési szabályok formátuma](./COMPRESSION_RULES_FORMAT.md) — JSON-szabálycsomag formátuma
- [Tömörítési nyelvi csomagok](./COMPRESSION_LANGUAGE_PACKS.md) — Nyelvspecifikus Caveman-szabályok
