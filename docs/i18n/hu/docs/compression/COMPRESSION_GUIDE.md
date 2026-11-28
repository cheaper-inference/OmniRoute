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

### Kikapcsolva

Nincs tömörítés alkalmazva. Minden üzenet változatlanul halad tovább.

### Lite mód (~15% megtakarítás, <1ms késleltetés)

A legbiztonságosabb mód — formázási tisztítás. Az eszközeredmények csonkolása veszteséges, ezért az alapértelmezett
útvonal (`allow-lossy`, `engine:lite` vagy névvel megadott kombinációra való opt-in nélkül) a Lite módot futtatja
`compressToolResults: false` beállítással: a korábbi eszközeredmények változatlanul jutnak el a szolgáltatóhoz.

| Technika                 | Leírás                                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| `collapseWhitespace`     | Az egymást követő üres sorok és a záró szóközök összevonása                                              |
| `dedupSystemPrompt`      | Ismétlődő rendszerüzenetek eltávolítása                                                                  |
| `compressToolResults`    | A korábbi eszközeredmények csonkolása a Lite mód korlátjára (veszteséges: csak kérelem általi opt-innel) |
| `removeRedundantContent` | Ismétlődő utasítások eltávolítása                                                                        |
| `replaceImageUrls`       | A base64-es képadat-URI-k rövidítése                                                                     |

**Ajánlott:** Folyamatos használatra, biztonságkritikus munkafolyamatokhoz.

### Standard mód (~30% megtakarítás)

A [Caveman](https://github.com/JuliusBrussee/caveman) által inspirálva — eltávolítja a töltelékszavakat és a terjengős megfogalmazást, miközben megőrzi a jelentést:

- Eltávolítja a töltelékszavakat („please”, „I think”, „basically”, „actually”)
- Tömöríti a terjengős kifejezéseket („in order to” → „to”, „as a result of” → „because”)
- Megszünteti az udvarias bizonytalankodást („Would you mind...”, „If you could possibly...”)
- Több mint 30, kódolási promptokhoz hangolt reguláris kifejezésszabály

**Ajánlott:** Mindennapi kódolási munkafolyamatokhoz, költségtudatos csapatoknak.

### Aggressive mód (~50% megtakarítás)

Intelligens előzménykezelés hosszú munkamenetekhez:

- **Üzenetek öregítése** — a régebbi üzenetek fokozatosan tömörödnek
- **Eszközeredmények tömörítése** — a hosszú eszközkimenetek csonkolása vagy kihagyása (első/utolsó sorok,
  egyező sorok szerinti szűrés, JSON-kulcsok tömörítése)
- **Strukturális integritási őrszemek** — biztosítják, hogy a `tool_use` + `tool_result` párok konzisztensek maradjanak
- **Kontextusablak-tudatosság** — figyelembe veszi az egyes modellek tokenkorlátait

**Ajánlott:** Hosszabb hibakeresési munkamenetekhez, nagy kódbázisokhoz.

### Ultra mód (~75% megtakarítás)

Maximális tömörítés tokentakarékos helyzetekhez:

- **Heurisztikus ritkítás** — a próza pontozásalapú tokenritkítása
- **Struktúramegőrzés** — a kódblokkok, az inline kód, az URL-ek és az azonosítók megjelölve és változatlanul visszaillesztve maradnak, soha nem kerülnek ritkításra
- **Opcionális SLM-szint** — egy kisméretű helyi modell finomíthatja a ritkítást, ha be van állítva
- Független az Aggressive módtól: nem futtat üzenetöregítést, eszközeredmény-tömörítést
  vagy tartalék-összefoglalót (csak egy SLM-szintű hiba irányíthatja át a tartalékfeldolgozást az Aggressive módon keresztül)

**Ajánlott:** Amikor ismételten eléri a kontextuskorlátokat.

### RTK mód (60–90%-os upstream tartomány)

Az RTK mód a kódolási ügynökök munkameneteiben megjelenő terjengős eszközkimenetekhez van optimalizálva:

- Olyan parancs-/kimenetosztályokat észlel, mint a `git status`, `git diff`, `git log`, tesztfuttatók,
  TypeScript/Vite/Webpack buildjei, ESLint/Biome/Prettier, npm audit/telepítések, Docker-naplók, infrastruktúra-kimenetek és általános shell-kimenetek
- JSON-szűrőcsomagokat alkalmaz az `open-sse/services/compression/engines/rtk/filters/` könyvtárból
- Projekt- vagy globális `filters.toml` fájlokból importálja az RTK TOML-séma v1 szűrőit, inline tesztelési
  ellenőrzéssel és a projektfájlok bizalmi szabályozásával
- 56 beépített szűrőt biztosít inline ellenőrzési mintákkal
- Eltávolítja az ANSI vezérlősorozatokat, a folyamatjelző sávokat, az ismétlődő sorokat és a nem végrehajtható zajt
- Megőrzi a hibákat, a hibaüzeneteket, a figyelmeztetéseket, a módosított fájlokat, az összefoglalókat és a hosszú kimenet végét
- Támogatja a bizalmi szabályozású projektszűrőket, a globális szűrőket és az opcionális, maszkolt nyerskimenet-visszaállítást

**Ajánlott:** Shell-, build-, teszt-, git-, grep- és fájlkimeneti átiratokat tartalmazó ügynöki munkamenetekhez.

### Halmozott mód (78–95%-os alkalmazható tartomány)

A Halmozott mód több tömörítési motort futtat determinisztikus sorrendben. Az alapértelmezett folyamat:

```txt
RTK -> Caveman
```

Ez a sorrend először tömöríti a terminál-/eszközkimenetet, majd szemantikai tömörítést alkalmaz
a megmaradó természetes nyelvű promptra. A halmozott folyamatok globálisan vagy az útválasztási kombinációkhoz
hozzárendelt tömörítési kombinációkon keresztül konfigurálhatók.

**Ajánlott:** Nagy eszköznaplókat, valamint emberi utasításokat vagy asszisztensi összefoglalókat tartalmazó vegyes kontextushoz.

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

### Vezérlőpult

Navigáljon ide: `Dashboard → Context & Cache`:

- **Caveman** — módválasztás, nyelvi csomagok, előnézet és globális alapértékek
- **RTK** — parancsszűrő előnézete, RTK biztonsági beállításai és szűrőkatalógus
- **Compression Combos** — útválasztási kombinációkhoz rendelt, elnevezett motorfolyamatok
- **Auto-Trigger Threshold** — a tömörítés automatikus aktiválása, amikor a tokenek száma meghaladja a küszöbértéket

### Kombinációnkénti felülbírálás

A `Dashboard → Context & Cache → Compression Combos` alatt rendeljen tömörítési kombinációt egy útválasztási
kombinációhoz:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Így a tömörítési folyamatok egymásra építését használhatja az ingyenes/kódolási szolgáltatóknál, miközben a fizetős
előfizetéseknél a lite mód marad érvényben.

Ez a „Per-Combo Override” hozzárendelés eltér a **routing-combo compression
mode** felülbírálásától (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — a mező sémája a `rtk`, `stacked`
és `omniglyph` értékeket is elfogadja) — ez a felülbírálás nem választ ki elnevezett
tömörítési kombinációs folyamatot; csupán a `compressionMode` mezőt állítja be, amelyet a
`resolveCompressionPlan` használ. Beállítható a kombináció kártyáján (`Dashboard → Combos`), illetve a #6760 óta útválasztási kombinációnként a
`Dashboard → Context & Cache → Compression Combos` „Assign to routing” listájában, közvetlenül a fent
dokumentált folyamat-hozzárendelési jelölőnégyzet mellett. Mindkét felület ugyanazon a
`PUT /api/combos/{id}` végponton keresztül menti az adatokat.

### Kérésenkénti felülbírálás

A tömörítési terv egyetlen kérésre történő felülbírálásához küldje el az `x-omniroute-compression` kérésfejlécet. Ennek van a legmagasabb prioritása — felülírja az útválasztási kombináció felülbírálását, az aktív profilt, az automatikus aktiválást és a panel alapértelmezését. Az ismeretlen értékeket a rendszer figyelmen kívül hagyja (a kérést soha nem utasítja el), a globális főkapcsoló pedig továbbra is mindenre hatással van: ha a tömörítés globálisan ki van kapcsolva, a fejléc nem tudja bekapcsolni. Értékek:

| Érték         | Hatás                                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `off`         | Nincs tömörítés ennél a kérésnél.                                                                                              |
| `default`     | A panelből származtatott Default-profil (figyelmen kívül hagyja az aktív profilt). A veszteséges motorok kikapcsolva maradnak. |
| `safe`        | Ugyanaz, mint a fejléc elhagyása.                                                                                              |
| `allow-lossy` | Megtartja a kérés operátori tervét, beleértve az összefoglalókat, relevanciaszűrőket és stílus-átírásokat.                     |
| `engine:<id>` | Egyetlen engedélyezett motor, például `engine:rtk`. Ez az adott motor kérésenkénti engedélyezése.                              |
| `<combo>`     | Egy elnevezett kombináció, amelyet először név (kis- és nagybetűtől függetlenül), majd azonosító alapján keres.                |

Ha nincs megadva az `allow-lossy`, az `engine:<id>` vagy egy elnevezett kombináció, a veszteséges motorok nem kerülnek alkalmazásra. Ha egy veszteséges Default-, automatikusaktiválási vagy útválasztási felülbírálást a rendszer alacsonyabb szintre állít, az OmniRoute megtartja a beállított, egymásra épített folyamatból felismert veszteségmentes lépéseket a konfigurált sorrendben. Csak akkor tér vissza a `session-dedup → lite` beállításhoz, ha egyetlen konfigurált veszteségmentes lépés sem marad érvényben.

A Beállítások panel **Effective pipeline** előnézete a szokásos, alapállapotban érvényes tervet mutatja. Amikor automatikus aktiválás futtatható, ugyanez az előnézet a feltételesen érvényes folyamatot is megjeleníti, így a panel és a fejléc nélküli futásidejű feloldás összhangban marad.

Az alkalmazott tervet a rendszer visszaadja az `X-OmniRoute-Compression: <mode>; source=<source>` válaszfejlécben, ahol a `<source>` értéke a következők egyike: `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` vagy `off`.

### API

```bash
# Tömörítési beállítások lekérése
curl http://localhost:20128/api/settings/compression

# Tömörítési beállítások frissítése
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Egy adott RTK/stacked hasznos adat előnézete
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK-szűrőcsomagok listázása
curl http://localhost:20128/api/context/rtk/filters

# RTK közvetlen tesztelése opcionális parancsmetaadatokkal
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

A fent leírt 7 módon túl (a forrás elfogadja `codex-responses` és `omniglyph` módokat is, amelyekre ez az útmutató nem tér ki), az alábbi szakaszok azokkal a funkciókkal foglalkoznak, amelyek ezeken a módokon belül vagy mellett működnek. A Cache-Aware Compression leminősíti `aggressive` és a `aggressive` `ultra` `standard` -re a gyorsítótárazási szolgáltatóknál, miközben a tömörítés be van kapcsolva, a Caveman Output Mode és Output Styles pedig opcionális rendszerkérési utasítások, alapértelmezés szerint ki vannak kapcsolva, és a kérés tömörítése helyett formálják a modell kimenetét.

### Gyorsítótár-tudatos tömörítés

Egyes szolgáltatók (például a gyors gyorsítótárazású Anthropic ) támogatást nyújtanak** azonnali gyorsítótár** , amely lehetővé teszi a prompt egyes részei gyorsítótárazását a költségek és a késleltetés csökkentése érdekében. Ha a gyorsítótárazás engedélyezve van, akkor az agresszív tömörítés valóban lehetséges** fáj** teljesítményt, mert megváltoztatja a gyorsítótárazott tokeneket, érvénytelenítve a gyorsítótárat.

A `cachingAware.ts` modul ezt úgy oldja meg** gyorsítótárazási kontextus észlelése** és** a tömörítési stratégia beállítása** ennek megfelelően.

#### Hogyan működik

1. **Gyorsítótárazási kontextus észlelése** — Ellenőrzi a kérés törzsét `cache_control` markerek után kutatva
2. **Azonosítsa a gyorsítótár-szolgáltatókat** — Ellenőrzi, hogy a célszolgáltató támogatja-e a gyorsítótárazást
3. **Állítsa be a stratégiát** — `aggressive`/`ultra` `standard` -re csökkenti a gyorsítótárazási szolgáltatók számára
4. **Rendszerkérdés kihagyása** — A rendszerpromptokat általában gyorsítótárban tárolják, ezért ne tömörítse őket

A stratégiai segéd is visszaad egy `deterministicOnly` jelzőt, de a tervkészítő csak a — stratégiát használja fel, ma már semmi sem olvassa le a jelzőt.

#### Kódpélda

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Mikor kell használni

A gyorsítótár-tudatos tömörítés az** mindig bekapcsolva** — nincs szükség konfigurációra. Amikor a tömörítés be van kapcsolva, akkor lép működésbe, és a célszolgáltató támogatja az azonnali gyorsítótárazást (Anthropic, OpenAI stb.); explicit `cache_control` markerek nem szükségesek. — a gyorsítótárazási szolgáltató önmagában váltja ki a leminősítést, és a markerek önmagukban soha (a markerészlelés a gyorsítótár telemetriáját táplálja, nem a stratégiai döntést).

OpenRouter csak `anthropic/*` modelleknél számít gyorsítótár-szolgáltatónak: Claude kódkérések megtartják `cache_control` töréspontjukat (legfeljebb 4), és az őr védi az előtagot, míg minden más OpenRouter család (`openai/`, `google/`, `qwen/`, …) csupasz és őrzés nélkül marad.

### Progresszív öregedés

A hosszú beszélgetések sok üzenetfordulatot halmoznak fel, de a régebbi fordulatok kevésbé relevánsak. A `progressiveAging.ts` modul** fordulótávolsággal rontja az üzeneteket** (a beszélgetés végétől mért távolság). A leszállított alapértékekkel (`verbatim: 2, light: 2, moderate: 3`):

- **Utolsó 2 kanyar (távolság ≤ 2)** : Szó szerint megtartva
- **Távolság 3** : Caveman kompresszió (töltőanyag eltávolítása)
- **Távolság 4 +** : Asszisztensi üzenetek összegzése; a felhasználói üzenetek az első sorukra csökkentve, legfeljebb 120 karakterben; egyéb szerepek érintetlenül. A rendszerkérések, a már régebbi üzenetek és a legújabb felhasználói üzenet mindig szó szerint megmarad, függetlenül a távolságtól. Semmi sem kerül ki azonnal, és a `light` sáv nem érhető el a szállított alapértékekkel (`light` egyenlő `verbatim`).

#### Kódpélda

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // last 3 turns: verbatim
  light: 8, // distance <= 8: lite compression
  moderate: 20, // distance <= 20: caveman compression
  fullSummary: 5, // required by the type, not read by the banding code
  // distance > 20: summarized (assistant) / first line kept (user)
});

// saved = number of tokens saved
```

#### Mikor kell használni

A progresszív öregedés az** mindig bekapcsolva** `aggressive` módú — esetén ez a `compressAggressive()` 2. lépése. Az Ultra mód nem futtatja. Különösen hatékony:

- Hosszú távú kódolási munkamenetek
- Többnapos beszélgetések
- Ügynöki munkafolyamatok sok eszközhívással

### Caveman kimeneti mód

Caveman kimeneti mód hozzáadódik** rendszer-utasítások** amelyek magától a modelltől kérik a szűkszavú kimenetet. — a `lite` szint tömör válaszokat kér, amelyekben teljes mondatok maradnak, `full` azt kéri tőle, hogy "respond respond like smart caveman", `ultra` pedig távirati kimenetet kér; Az utasítások csak kérik, nem garantálják. A kérések `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) keresztül kapják meg őket: `open-sse/handlers/chatCore.ts` először a back-compat alátéttel (`resolveOutputStyleSelection()` in `open-sse/services/compression/outputStyles/backCompat.ts`) oldja meg a kijelölést, amely bár `outputStyles` üres, egy engedélyezett `cavemanOutputMode` leképez a `terse-prose` kimeneti stílusára `cavemanOutputMode.intensity` -nél (lásd alább a Back-compat); a nem üres `outputStyles` kijelölést a rendszer úgy használja, ahogy van, és `cavemanOutputMode.enabled` és `intensity` ekkor nincs hatással, miközben `autoClarity` kapcsolója továbbra is érvényes. `outputMode.ts` tartalmazza az utasításszövegeket (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), a tartalommegkerülést és az elhelyezési segédprogramot, amelyet az injekció használ; saját `applyCavemanOutputMode()` befecskendezőjének nincs termelési hívója.

#### Hogyan működik

Ez a mód nem tömöríti a bemenetet. Hozzáad egy utasításblokkot a rendszerprompthoz (lásd alább, Hogyan működik a befecskendezés), és a kéréshez kiválasztott bemeneti tömörítési mód ezután is fut a blokkot hordozó törzsön. A megosztott határok záradéka előtt, amellyel minden szint véget ér, az angol `full` szint így szól:

> "Válaszolj tömören, mint az intelligens barlanglakó. Dobj el cikkeket (a/an/the), tölteléket (just/really/basically/actually/simply), kellemes cuccokat, fedezeteket. Töredékek OK. Rövid szinonimák (nagy nem terjedelmes, javítsd, ne hajtsd végre). Minden technikai anyag, kód, hiba, URLs, azonosító pontos legyen."

Ez különösen jól működik:

- Kódgenerálás (terser kimenet = tokennel)
- Gyors kérdések és válaszok (nincs szükség részletes magyarázatra)
- Kötegelt feldolgozás (az átviteli sebesség maximalizálása)

#### Mikor kell használni

Caveman kimeneti mód az** feliratkozás** . Ha a tömörítés be van kapcsolva (`enabled: true`, a fő kapcsoló a Tömörítési beállítások oldalon), kapcsolja be `cavemanOutputMode.enabled` gombbal; `intensity` `lite`, `full` vagy `ultra` lehetőséget választja:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Kompressziós kombó** Kimeneti mód** A toggle (`outputMode`, `outputModeIntensity` szintje ) ugyanazt a kapcsolót állítja be a kérésekhez, amelyekre a kombináció vonatkozik, és a `omniroute_set_compression_engine` MCP eszköz a logikai `outputMode` argumentumán keresztül írja ki. A nem üres `outputStyles` kijelölés elsőbbséget élvez ezzel a kapcsolóval szemben. Az irányítópulton engedélyezve a** Tömör próza** a kimeneti stílus ugyanazt a blokkot szúrja be (lásd alább a Kimeneti stílusokat).

### Kimeneti stílusok (katalógus)

A Caveman fenti kimeneti módja a** örökölt egystílusú útvonal** . A 4. fázis az összeállítható kimeneti stílusok katalógusává tette általánossá: `OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts`. Mindegyik stílus egy rendszer-prompt utasítás, amely magát a modellt kéri olcsóbb kimenetre; A stílusok együtt engedélyezhetők, és a katalógus sorrendjében kerülnek beillesztésre.

| Stílus                              | `id`            | Mit csinál                                                                                                                                                                                                                                                                    | Oktatási nyelvek                              |
| ----------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Tömör próza                         | `terse-prose`   | Csepp filler/articles/hedging; tartsa pontosan a műszaki tartalmat. Ugyanaz a szöveg, mint az örökölt barlanglakó kimeneti módban (hivatkozott, nem gépelve újra).                                                                                                            | hu, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Kevesebb kód                        | `less-code`     | YAGNI létra: a legkisebb működő változás, nincs kéretlen absztrakció.                                                                                                                                                                                                         | hu, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Lófarok (lusta idősebb fejlesztő)   | `ponytail`      | "A legjobb kód az a kód, amelyet soha nem írtak le": > újraírás újra, > tünet kiváltó oka, legrövidebb működő különbség.                                                                                                                                                      | hu, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| ADHD -m van (első a cselekvés)      | `i-have-adhd`   | Cselekvés először (command/path/snippet próza előtt), számozott korlátos lépések, ONE konkrét következő lépés, nincs preamble/recap/closers. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) ből (MIT) adaptálva.                                                 | hu, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Slip UI szűrő                       | `antislop-ui`   | Minden vizuális technikának át kell mennie egy célteszten (hierarchia, azonosság, olvashatóság); nincs alapértelmezett gradients/glass/glow, sapkás paletta, nincs sablon elrendezés. Mindkét csúszásgátló stílus hozzáad egy no-dead-controls / no-fabricated-claims határt. | hu, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Slopásgátló másolat és emberi szűrő | `antislop-copy` | Konkrét példány (nincs em kötőjel, általános CTAs, hívószavak, chatbot-lezárók, kitalált tények), plusz az emberek szabályai: WCAG AA kontraszt, látható fókusz, billentyűzet elérése, empty/loading/error állapotok, mobil újratörlés.                                       | hu, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言)                    | `terse-cjk`     | `full`/`ultra` válasz klasszikus kínai nyelven (文言); `lite` csak rövid válaszokat kér funkciószavak, kedveskedések vagy díszítés nélkül.                                                                                                                                    | zh (helyfüggő, lásd lent)                     |

Minden stílushoz három intenzitási szint tartozik — `lite`, `full`, `ultra` —, és minden szint a megosztott határok záradékkal végződik (`SHARED_BOUNDARIES` `outputMode.ts`-ben), amely pontosan tartja a kódblokkokat, a fájl elérési útjait, a parancsokat, a hibákat és URLs t. A `terse-prose` és `terse-cjk` szintű szövegek azonosítókat adnak hozzá ehhez a listához.

`terse-cjk` két helyen is `zh` területi besorolású. A Tömörítési beállítások oldalon csak akkor jelenik meg a sora, ha az irányítópult UI nyelve kínai (`zh-CN` vagy `zh-TW`), és `applyOutputStyles()` csak akkor szúrja be, ha a kérés feloldott nyelve (lásd a Nyelvválasztást lent) `zh`. A sor elrejtése nem törli a mentett `terse-cjk` kijelölést: a API beállítások bármilyen stílusazonosítót elfogadnak, és az oldal többi stílusának mentése megtartja. Kérésre a `applyOutputStyles()` nyelvi ellenőrzés az egyetlen területi beállítási kapu.

#### Hogyan működik az injekció

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) feloldja a kijelölést a katalógus alapján (az ismeretlen azonosítók és a területi beállításoktól eltérő stílusok kimaradnak, soha nem hiba; a stílus nélküli kijelölés a törzset változatlanul hagyja, `no_styles` néven kihagyja), összefűzi a kiválasztott utasításokat a katalógus sorrendjében, hozzáfűzi a határok záradékát** egyszer** (plusz a biztonsági záradék, `SAFETY_BOUNDARIES` vagy annak fordítása, ha `less-code` vagy `ponytail` van kiválasztva), és a blokkot egyetlen idempotencia jelzővel (`[OmniRoute Output Styles]`) indítja el, így az újbóli alkalmazás nem működik. Ha a feloldott nyelvnek (lásd alább a Nyelvválasztást) van fordítása, a honosított utasítást a rendszer az angol helyett.

Egy nem üres `messages` tömböt tartalmazó törzsön az idempotencia ellenőrzés a tartalom megkerülése előtt fut le: amikor a `[OmniRoute Output Styles]` marker már a legfelső szintű `system` mezőben (karakterlánc vagy tartalomblokk tömb) vagy egy karakterlánc-tartalmú rendszerüzenetben van, a törzs változatlan marad `already_applied` ként, és nem fut le kulcsszóellenőrzés. Ellenkező esetben a tartalommegkerülő (`shouldBypassCavemanOutputMode()` in `open-sse/services/compression/outputMode.ts`) ellenőrzi az utolsó három üzenet szövegét, függetlenül azok szerepétől, és kihagyja a stílusokat a teljes körben, ha a szöveg egyezik a biztonsági, visszafordíthatatlan művelet vagy egyértelműsítő kulcsszavaival, vagy egy sorrendérzékeny sorozattal: `first`, `then`, `after that`, `before` `rollback` vagy 4 karakter után. `delete`, `drop`, `migrate`, `deploy` `release` `backup` A bypass fut, miközben a** Auto-Clarity Bypass** toggle (`cavemanOutputMode.autoClarity`, alapértelmezés szerint be) be van kapcsolva; a kapcsoló kikapcsolása kihagyja a kulcsszóellenőrzést.

Amikor a bypass átengedi a fordulást, `placeSystemInstruction()` (ugyanaz a fájl), amely soha nem hoz létre új `messages[0]`, a blokkot az első helyre helyezi, amelyet talál:

1. Egy vezető rendszerüzenet karakterlánc tartalommal: a blokk a szövege mögé kerül.
2. A legfelső szintű `system` mező: a blokk hozzáfűződik egy karakterlánc szövege után, vagy új szövegblokkként kerül hozzáadásra egy tartalomblokk tömbhöz.
3. Az első későbbi rendszerüzenet karakterlánc tartalommal: a blokk a szövege mögé kerül.
4. A fentiek közül egyik sem: a blokk egy új rendszerüzenetbe kerül a `messages` végén.

A `messages` tömb nélküli (vagy üres) törzsön nem fut tartalommegkerülés, és a rendszer nem tekinti meg a legfelső szintű `system` mezőt. A blokk egy karakterlánc `instructions` mező szövege után lesz hozzáfűzve, kivéve, ha ez a mező már tartalmazza a `[OmniRoute Output Styles]` jelölőt, ebben az esetben a törzs változatlan marad `already_applied` néven. Ha a törzsnek nincs `instructions` karakterlánc-mezője, de `input` (karakterláncot vagy tömböt) hordoz, a blokk `instructions` lesz, és a mezőben lévő nem karakterlánc-értékeket helyettesíti. A `instructions` karakterláncot és `input` karakterláncot vagy tömböt nem tartalmazó törzs változatlan marad, és `no_messages` néven kimarad.

#### Hogyan lehet engedélyezni

Az irányítópulton:** Tömörítési kontextus → Tömörítési beállítások** (`/dashboard/context/settings`), Kimeneti stílusok szakasz: stílusonként egy sor on/off kapcsolóval és szintválasztóval. A stílusok beillesztésre kerülnek, miközben maga a tömörítés be van kapcsolva (az oldal főkapcsolója, `enabled`). A** Auto-Clarity Bypass** kapcsoló a** Barlanglakó ősember** oldalon (`/dashboard/context/caveman`), abban** Kimeneti mód** kártya. Programozottan a tömörítési konfiguráció a következőképpen tartja meg a kijelölést:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Back-compat: amíg `outputStyles` üres, az örökölt `cavemanOutputMode.enabled` beállítás a `terse-prose` -re van leképezve a `cavemanOutputMode.intensity`. A blokk ezután a `[OmniRoute Output Styles]` jelölővel kezdődik, ahol az örökölt `applyCavemanOutputMode()` injektor `[OmniRoute Caveman Output Mode]` írta. A jelölő alatt a szöveg megegyezik az en, pt-BR, es, de, fr, it, ru, id és vi legacy injekcióval; a ja és a zh-ban egy plusz szóközt hordoz a boundaries záradék előtt. `terse-prose` pt-BR, es, de, fr, it, ru, zh, ja, id és vi nyelvekre fordítódik, így `hu` feloldott nyelvű kérés az angol szöveget kapja, ahol a legacy injektor a magyart használta.

Output-style language selection (`resolveOutputStyleLanguage()` in `outputStyles/apply.ts`): with `languageConfig.enabled` on, `autoDetect` samples the latest user message in the request's `messages` array that has text (string content, or the `text` of its content parts) and runs the Caveman engine's detector (`detectCompressionLanguage()`) on it. The detector returns `zh` for text with Han characters and no kana; otherwise it returns whichever of `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu` and `id` has the most hint matches, and `en` when none match — text it cannot classify gets English, never `defaultLanguage`, and `vi` is never detected although the styles ship `vi` text. A Responses API body keeps its turns in `input`, which is not sampled, so it gets `defaultLanguage`, then English. When no user message in `messages` has text, or with `autoDetect` off, `defaultLanguage` applies, then English. With `languageConfig.enabled` off, the language is English — unless a compression combo applies to the request (a combo assigned to the request's routing combo, or the default compression combo chatCore falls back to for the built-in stacked pipeline): applying a combo turns `languageConfig.enabled` on for that request and sets `defaultLanguage` from the combo's language packs (the saved value if it is one of the combo's packs, otherwise the combo's first pack, which defaults to `en`), while the saved `autoDetect` (on by default) still applies. The Caveman input engine picks its rule-pack language differently — per text part and, with auto-detect off, gated on `enabledPacks`.

A stílus × nyelvi mátrixot `tests/unit/compression/output-styles-i18n-matrix.test.ts` rögzíti: minden katalógusstílusnak szüksége van egy bejegyzésre a teszt `BASELINE_LANGUAGES` jében; egy nem területi besorolású stílusnak pt-BR fordítást kell küldenie (a területi beállításokkal szabályozott `terse-cjk` mentesül e szabály alól), hacsak nem szerepel `KNOWN_ENGLISH_ONLY`-ben, amely csak olyan stílusokat tartalmazhat, amelyeknek nincs fordítása — egy listán szereplő stílus, amely bármilyen fordítással rendelkezik, nem felel meg a teszten; és egy stílus megbukik a teszten, ha elveszíti `BASELINE_LANGUAGES` bejegyzésében felsorolt nyelvet. Stílus hozzáadásához lásd [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) fájlt.

### Eszköz Eredmény tömörítés

`compressToolResult()` `open-sse/services/compression/toolResultCompressor.ts` -ben tömöríti az eszköz-eredmény szövegét** 5 stratégia** . Ebben a sorrendben próbálja ki őket, és az első engedélyezett stratégia, amelynek ellenőrzése megegyezik a tartalommal, dönti el az eredményt:

1. **`fileContent`** : 3 vagy több sor tartalma, amelyben legalább egy sor a bevezető behúzást figyelmen kívül hagyva a következővel kezdődik: `import `, `export `, `function `, `class `, `const `, `let `, `var ` vagy `return ` (a kulcsszó plusz egy szóköz), vagy ennek `if`, `for` vagy `(` vagy `while` utána következik ` (` utolsó 5 sor, a kihúzott középső jelzéssel.
2. **`grepSearch`** : legalább egy `<path>:<digits>:` formátumú sorral rendelkező tartalom, ahol az első kettőspont előtti szövegben nincs szóköz, csak azokat a sorokat tartja meg, legfeljebb 30-at, amelyet a további egyezések számlálása és az egyező fájlok listája követ; minden második sor kiesik. Egy ilyen sor elegendő a stratégia kiváltásához, így egy időbélyeggel, például `12:30:45` -vel kezdődő naplósor is számít.
3. **`shellOutput`** : a ANSI CSI sorozatot (`ESC[` majd számjegyeket vagy pontosvesszőt, majd egy betűt, mint a színkódokban) vagy a `$` és szóközt tartalmazó kimenet a szövegben bárhol elveszti ezeket a sorozatokat (a többi kilépés, mint például `ESC[?25l` vagy a OSC ablakcímsorozat megmarad), és megtartja az utolsó 50 egymást követő sorát. Mivel ez az ellenőrzés `json` és `errorMessage` előtt fut le, az ilyen `$` tartalmazó JSON vagy hibakimenet soha nem éri el őket, amíg `shellOutput` be van kapcsolva.
4. **`json`**: a JSON payload over 2,000 characters that starts with `{` or `[` (after optional whitespace) and parses is summarized: an array of more than 7 items keeps its first 5 and last 2 items and its total count, and an object keeps its first 20 keys, with each nested object or array value replaced by a `{…N keys}` placeholder (for an array, N is its length) and a `_remaining_<N>_keys` marker counting the keys dropped past the first 20. Scalar values are copied whole, so an object of 20 keys or fewer with no nested values is only re-indented — a minified one gains characters and stays unchanged.
5. **`errorMessage`** : olyan kimenet, amely bárhol és tetszőleges kis- és nagybetűket tartalmaz: `error:`, `error ` (a szó, amelyet szóköz követ, mint `no error found`), `[error]`, `exception:`, `exception `, `[exception]` vagy `traceback` megtartja az első sort, a következő 10 sort és az utolsó 3 sort, a sorok között egy `… [N frames elided] …` jelölővel. A jelölő csak akkor jelenik meg, ha több mint 13 sor követi az első sort, így a 14 vagy annál kevesebb soros hibakimenet nem rövidül (12 vagy 13 sornál az utolsó 3 ismétlési sor már megmaradt).

Egy stratégia meccs után, még olyan is, amelyik semmit sem ment meg, a későbbi stratégiákat nem próbálják ki. Ha az illesztési stratégia nem ment el becsült tokeneket (hossz ÷ 4, felfelé kerekítve) — például egy 25 vagy kevesebb soros kódszerű fájl, vagy egy 2000 karakter feletti JSON tömb 7 vagy kevesebb — elemmel, az agresszív motor megtartja az eredeti eszköz eredményét: mind a hívók, mind a `compressAnthropicToolResultBlock()` megtartják (`compressAggressive()` ) alatt, míg maga `compressToolResult()` továbbra is visszaadja a `saved` kimenetét. Az eszköz-eredmény lépés nem az utolsó szó: a motor tartalék összegzője továbbra is le tudja rövidíteni a `tool` vagy `function` üzenetet, amely meghaladja a 8192 karaktert (`maxTokensPerMessage`, 2048, 4-szer).

#### Mikor kell használni

Az eszköz eredményének tömörítése az agresszív motor 1. lépése (`compressAggressive()` `open-sse/services/compression/aggressive.ts`-ben), tehát Agresszív módban és egy halmozott folyamat `aggressive` lépésében fut. Tömöríti az OpenAI-alakú `tool` és `function` üzeneteket, valamint a Anthropic `tool_result` blokkokban lévő szöveget. Minden stratégiának saját kapcsolója van `aggressive.toolStrategies` alatt, amely alapértelmezés szerint be van kapcsolva. Az irányítópulton a kapcsolók a Caveman oldalon találhatók** Fejlett** nézet, ha a tömörítés be van kapcsolva, és az alapértelmezett mód az Agresszív.

### Halmozott csővezeték

A halmozott mód fut** több motor egymás után** — általában először RTK (60-90% megtakarítás a szerszámkimeneten), majd a Caveman a fennmaradó szövegen (~ 46% input megtakarítás). Összeállított, ez az** 78-95% támogatható tartomány** (lásd fent az Upstream Savings Math-ot): `1 - (1 - 0.60..0.90) × (1 - 0.46)` átlag ≈ 89%.

#### Hogyan működik

```
Input (1000 tokens)
  → RTK (command-aware filter) → 200 tokens
    → Caveman (filler removal) → 108 tokens
  → Output (108 tokens, ~89% savings)
```

#### Mikor kell használni

A halmozott mód használata a következőkhöz:

- Eszközigényes munkafolyamatok (ügynöki kódolás, kutatás)
- Költségérzékeny kötegelt feldolgozás
- Amikor maximális token megtakarításra van szüksége

A halmozott folyamatok konfigurálása a globális `stackedPipeline` tömörítési beállítással vagy egy útválasztási kombóhoz rendelt elnevezett tömörítési kombóval (lásd fentebb a Kombinációnkénti felülbírálást) — nem automatikus kombinált `modePack` révén (ez a mező csak az automatikus kombinált modell kiválasztását súlyozza újra, és `stacked` nem érvényes csomagnév).

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
