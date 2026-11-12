# OmniRoute Auto-Combo Engine (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Felhasználóknak**: Gyors kezdést keres? Egyszerű magyarázatokért és példákért tekintse meg az [Auto-Combo felhasználói útmutatót](../getting-started/AUTO-COMBO-GUIDE.md).

> Önkezelő modell-láncok adaptív pontozással és konfigurációmentes automatikus útválasztással

## Nulla konfigurációs automatikus útválasztás (`auto/` előtag)

> **ÚJ:** Nincs szükség kombináció létrehozására. Használja közvetlenül az `auto/` előtagot bármely kliensben.

### Gyors példák

| Modellazonosító | Változat        | Viselkedés                                                                           |
| --------------- | --------------- | ------------------------------------------------------------------------------------ |
| `auto`          | alapértelmezett | Minden csatlakoztatott szolgáltató, LKGP-stratégia, kiegyensúlyozott súlyok          |
| `auto/coding`   | coding          | Minőségközpontú súlyok, kódgeneráláshoz megfelelő                                    |
| `auto/fast`     | fast            | Alacsony késleltetésre súlyozott kiválasztás                                         |
| `auto/cheap`    | cheap           | Költségoptimalizált útválasztás (először a legalacsonyabb költség)                   |
| `auto/offline`  | offline         | A legnagyobb elérhető kvótával rendelkező szolgáltatókat részesíti előnyben          |
| `auto/smart`    | smart           | Minőségközpontú + magasabb felderítési arány (10%) a jobb modellfelderítés érdekében |
| `auto/lkgp`     | lkgp            | Explicit LKGP (megegyezik az alapértelmezett `auto` változattal)                     |
| `auto/chaos`    | chaos           | Párhuzamos szétosztás, szolgáltatónként egy modell (nem hibainjektálás)              |

### Kategória × szint összeállítása (`auto/<category>:<tier>`)

Az OpenRouter-stílusú utótagok különválasztják, hogy **milyen típusú legyen az útvonal** (kategória), illetve **hogyan történjen az optimalizálása** (szint), így ezek szabadon kombinálhatók (#4235 B fázis, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategóriák** (a képességek alapján szűrik a jelöltek készletét): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. A `vision`/`multimodal` megtartja a vizuális képességekkel rendelkező modelleket; a `reasoning` pedig a következtető/gondolkodó modelleket.
- **Szintek** (kiválasztják a pontozási súlyokat / készletszűrőt): `fast` (gyors szállítás) · `cheap` (`floor` álnév, költségtakarékos) · `reliable` (megszakító állapota + késleltetés stabilitása) · `free` / `pro` (a modell szintje alapján szűri a készletet a `classifyTier` segítségével — ingyenes szint kontra prémium).

| Példa                  | Eredmény                                                                           |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `auto/coding:fast`     | kódolási készlet, alacsony késleltetésű súlyok                                     |
| `auto/coding:cheap`    | kódolási készlet, költségoptimalizált (`auto/coding:floor` álnév)                  |
| `auto/reasoning:pro`   | csak következtető/gondolkodó modellek, prémium szint                               |
| `auto/vision`          | vizuális képességekkel rendelkező modellek (nincs szint → kiegyensúlyozott súlyok) |
| `auto/multimodal:free` | multimodális képességekkel rendelkező modellek, csak ingyenes szint                |

Minden érvényes `auto/<category>[:<tier>]` igény szerint feloldódik; ezek egy válogatott részhalmazát a `/v1/models` és az irányítópult jeleníti meg (`AUTO_SUFFIX_VARIANTS` az `open-sse/services/autoCombo/builtinCatalog.ts` fájlban). A szűrés **hiba esetén nyitott** — ha egy feltételnek egyetlen csatlakoztatott modell sem felel meg, a rendszer a teljes készletet használja, így az útválasztás soha nem szakad meg. Az alapvető pontozó (`combo.ts`) változatlan; a kategória-/szintszűrő alkalmazása a `buildAutoCandidates` függvényben történik.

> **Élő modellintelligencia:** az automatikus útválasztás alkalmassági értékelését élő **Arena ELO**-rangsorok és a **models.dev** szintadatai segítik, amikor az `ARENA_ELO_SYNC_ENABLED` jelző be van kapcsolva (ellenkező esetben visszaáll a statikus alkalmassági leképezésre).

**Használat:**

```bash
# Bármely IDE vagy CLI-eszköz, amely támogatja az OpenAI-formátumot
Alap URL: http://localhost:20128/v1
API-kulcs:  <your-endpoint-key>

# A kódban/konfigurációban állítsa a modellt a következőre:
model: "auto"                 # kiegyensúlyozott alapértelmezés
model: "auto/coding"          # kódolási feladatokhoz a legjobb
model: "auto/fast"            # a leggyorsabban elérhető
model: "auto/cheap"           # tokenenként a legolcsóbb
```

**Mi történik:**

1. Az OmniRoute észleli az `auto/` előtagot az `src/sse/handlers/chat.ts` fájlban
2. Lekérdezi az összes **aktív szolgáltatói kapcsolatot** az adatbázisból
3. Az érvényes hitelesítő adatokkal (API-kulccsal vagy OAuth-tokennel) rendelkezőkre szűr
4. Meghatározza a kapcsolatonkénti modellt (`connection.defaultModel` vagy a szolgáltató első modellje)
5. Létrehoz egy memóriabeli **virtuális kombinációt** (nem tárolja az adatbázisban)
6. A kiválasztott változat súlyprofiljával és LKGP-stratégiával végzi az útválasztást

**Fő tulajdonságok:**

- ✅ **Mindig aktív:** Nincs szükség kapcsolóra, kombináció létrehozására vagy konfigurációra
- ✅ **Dinamikus:** Automatikusan tükrözi az aktuálisan csatlakoztatott szolgáltatókat
- ✅ **Munkamenet-ragadósság:** Az LKGP biztosítja, hogy az utolsó sikeres szolgáltató elsőbbséget kapjon
- ✅ **Több fiókot kezel:** Minden szolgáltatói kapcsolat külön jelöltté válik
- ✅ **Nincs adatbázis-írás:** A virtuális kombináció csak a kérés idejére létezik, így nincs perzisztenciából eredő többletterhelés

### Kulcsonkénti jelöltvezérlés (#7819, 1+2. szint)

A `GET /v1/auto-combo/{channel}/candidates` (`{channel}` = az `auto/` utáni utótag, vagy
az alapcsatorna esetén a literális `auto`) egy **csak olvasható** végpont, amely felsorolja
egy `auto/*` csatorna aktuális jelöltkészletét, kiegészítve az élő elérhetőségi adatokkal,
a meglévő reziliencia-lekérdezések újrafelhasználásával (soha nem a megszakító nyers `state` értékével):

- szolgáltatói megszakító — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- kapcsolat lehűlési ideje — `rateLimitedUntil` / `testStatus` a feloldott
  `provider_connections` sorban
- modellzárolás — `isModelLocked(provider, connectionId, model)`

Minden jelölt tartalmazza továbbá az adott API-kulcshoz tartozó `excluded` jelzőt. A kizárások
API-kulcsonként vannak tárolva (`auto_candidate_overrides` tábla, `128` migráció) — az OmniRoute
egybérlős rendszer, `users` tábla nélkül, így az `apiKeyId` a hívónkénti identitás legközelebbi
valós megfelelője —, és érvényesítésük a jelöltkészlet szűk keresztmetszeténél történik az
`open-sse/services/autoCombo/virtualFactory.ts` fájlban, a tiszta, egységtesztekkel ellenőrzött
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`) segítségével.
A szűrő **hiba esetén nyitott**: egy beállítatlan apiKeyId/csatorna vagy egy adatbázis-lekérdezési
hiba egyaránt szűretlenül hagyja a készletet, így a felülbírálásokat nem konfiguráló üzemeltető
számára az útválasztás bájtszinten megegyezik a funkció bevezetése előtti működéssel.

**Későbbi feladatra halasztva:** jelöltenkénti súlyok + explicit sorrendezés (3. szint
— a meglévő súlyozott/prioritásos stratégiai útvonalakba csatlakozik), valamint egy adott
`combo.ts` stratégia rögzítése `auto/*` csatornánként (4. szint). Azt a nyitott kérdést,
hogy a felülírások API-kulcsonként maradjanak-e, vagy az egybérlős modell miatt globálissá
váljanak, lásd a #7819 tervben.

**A háttérben:**

```txt
Kérés: { model: "auto/coding" }
   ↓
Az src/sse/handlers/chat.ts észleli az előtagot
   ↓
createVirtualAutoCombo('coding') → candidatePool az aktív kapcsolatokból
   ↓
handleComboChat (ugyanaz a motor, mint a tartósan tárolt kombinációknál)
   ↓
Az automatikus pontozás kérésenként kiválasztja a legjobb szolgáltatót/modellt
```

**Implementációs fájlok:**

| Fájl                                                      | Rendeltetés                                                        |
| --------------------------------------------------------- | ------------------------------------------------------------------ |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Előtagelemző (`parseAutoPrefix`)                                   |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Virtuális `AutoComboConfig` objektumokat hoz létre                 |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Tesztelési kapcsolódási pont a szolgáltatói regiszter mockolásához |
| `src/sse/handlers/chat.ts`                                | Integráció: az automatikus előtag rövidzáras kezelése              |
| `src/shared/constants/providers.ts`                       | A `SYSTEM_PROVIDERS.auto` rendszerbejegyzés                        |

## Fiókbeállítások a mentett automatikus kombinációkhoz

Az Intelligens Auto szerkesztő opcionális lehetőséget kínál** Fiókbeállítások** szakasz. Mindegyik kapcsolat lehet Preferált, Normál (alapértelmezett), Fenntartott vagy Kizárt. Több kapcsolat is megoszthat egy szintet. Az automatikus az első jogosult rétegen belül választ, megtartva ott scoring/router viselkedését; a sikertelen kísérletek a fennmaradó konkrét számlákra esnek át, előnyösebb a normál előtt a tartalékolás előtt. Ez a kombináció soha nem használja a kizárt kapcsolatokat.

A beállítás `config.accountPreferences` néven tárolódik, ID csatlakozással kulcsolható:

```json
{
  "accountPreferences": {
    "connection-a": "preferred",
    "connection-b": "preferred",
    "connection-c": "reserve",
    "connection-d": "excluded"
  }
}
```

A kihagyott vagy üres térkép megtartja a meglévő útvonaltervet. A beállítások nem engedélyezik a letiltott kapcsolatokat, nem adnak hozzáférést API-kulcshoz, nem állítják vissza a kvóta által blokkolt jelölteket, és nem kerülik ki a költségvetés ellenőrzését. Minden kísérlet a konkrét kapcsolatra korlátozódik, így a fiók visszaállítása nem ugorhat a kombinált útválasztó mögé. A meglévő munkamenet-affinitás megtarthat egy jogosult fiókot; a natív fordulóhoz kötött fiók kizárása megáll, amely a fiókok csendes váltása helyett fordul.

A konfigurált beállítások a fióktudatos automatikus elérési utat használják: a nem kötött kontextus-gyorsítótár, az intelligens csővezeték, a káosz és az árnyék-parancsikonok nem kerülnek kiküldésre. A spekulatív fedezeti ügylet le van tiltva ezeknél a kéréseknél, így a tartalékszámlák nem versenyezhetnek a preferált fiókokkal. Más kombinált stratégiák nem értelmezik ezt a beállítást. Ha a kombót leváltja az Automatikusról, akkor a mentett beállítások megmaradnak a későbbi visszakapcsoláshoz.

## Valós modellazonosítóval megegyező nevű kombók

Az olyan kombó, amelynek `name` mezője megegyezik egy önálló modellazonosítóval (például egy
`gpt-5.5` nevű kombó), **szándékos és támogatott minta**, nem hiba: ez biztosítja
a modellazonosítónkénti szolgáltatói tartalékútvonalat, amelyet a
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940) dokumentál. Mivel a kombók
feloldásának ellenőrzése megelőzi az önálló modellazonosítók feloldását
(`getComboForModel()` a `src/sse/services/model.ts` fájlban), az önálló
`gpt-5.5` azonosítóra irányuló kérés a kombó céljain (például
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) keresztül lesz átirányítva ahelyett, hogy
közvetlenül egyetlen szolgáltatóhoz kerülne — ez újra felhasználja a
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) számára kialakított,
átírás előtti kombóelsőbbséget, és regressziós tesztelését a
`tests/unit/responses-combo-resolution-3227.test.ts` és a
`tests/unit/combo-name-codex-responses-rewrite.test.ts` végzi.

Egy valós modellazonosítót elfedő nevű kombó létrehozása vagy ilyen névre történő átnevezése
**soha nincs elutasítva** — ez megszakítaná ezt a dokumentált munkafolyamatot. Ehelyett
(#8530) a `POST /api/combos` és a `PUT /api/combos/[id]` egy nem blokkoló
`warning` mezőt csatol a válaszhoz, amikor az (új) név ütközik egy valós
modellazonosítóval:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Induláskor a `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) egy egysoros `[STARTUP]` figyelmeztetést is naplóz,
amely felsorol minden olyan meglévő kombót, amely elfed egy modellazonosítót, így azok az üzemeltetők,
akik véletlenül találkoznak ezzel (nem pedig szándékosan, a #6940 szerint), jelzést kapnak.
Az észlelési segédfüggvény a `src/lib/combos/modelNameCollision.ts` fájlban található.

## Egyéni kombó meghívása kliensből

A tartósan mentett kombók (Beállítások → Kombók) csak akkor használatosak, ha a kliens a kombó **pontos nevét** küldi el a `model` mezőben — a kombó nevére nincs közelítő vagy részleges egyezés, és `auto/` előtag sincs használatban. A feloldás sorrendje (`getComboForModel()` a `src/sse/services/model.ts` fájlban):

1. pontos egyezés a kombó nevével (`model: "my-combo"`),
2. `combo/<name>` előtag (`model: "combo/my-combo"`),
3. modell→kombó globmintás leképezések (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Két gyakori buktató:

- **Az `auto` nem használja a kombóit.** Az `auto`/`auto/*` saját, konfigurációt nem igénylő jelöltkészletet épít fel, és csak akkor veszi figyelembe a tartósan mentett kombókat, ha egy kombó neve szó szerint `auto` (nem ajánlott). Kombón keresztüli útválasztáshoz annak pontos nevét küldje el — ne az `auto` értéket.
- **Az `openrouter/auto` egy valódi, fizetős OpenRouter-termék** („Auto Best Available”), nem OmniRoute-alias. Ez az OpenRouter-nyilvántartás (`open-sse/config/providers/registry/openrouter/index.ts`) egyetlen statikus modellbejegyzése, és külön számlázzák. Az `auto` készletekből való kizárásához használja a Beállítások → Útválasztás → Fizetős modellek elrejtése lehetőséget.

A dokumentált eredeti félreértéseket lásd itt: [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) és [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111).

## Hogyan működik (tartós automatikus kombinációk)

Az Auto-Combo Engine dinamikusan választja ki a legjobb provider/model minden egyes kéréshez az a **16 faktoros pontozási funkció** (a `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS` ben van meghatározva). Az alapértelmezett súlyok összege `1.0`; az egyedi súlyokat `normalizeScoringWeights()` renormalizálja. A tizenhat — `cacheAffinity` és `resetWindowAffinity` — közül kettőnek az alapértelmezett súlya `0`; `reliability` hordozza `0` `DEFAULT_WEIGHTS` -ben, `0.03` az általános csomagokban és `0.04` `reliability-first` ban, `quality` pedig `0.02` csomagokban hordozza (`0.03` `quality-first`-ban): továbbra is minden jelölt esetében kiszámításra kerül, és `cacheAffinity` kapuja a prompt-cache deduplikációt a pontszámon kívül, így a nulla-alapértelmezett tényezők egyszerűen nem szavaznak.

![Auto-Combo 16-factor scoring](../diagrams/exported/auto-combo-scoring.svg)

> Forrás: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (regenerálás `npm run docs:render-diagrams` keresztül). A fájlnév történelmi; a forrás és a megjelenített diagram mind a 16 `DEFAULT_WEIGHTS`-ben deklarált tényezőt mutatja.

| Tényező               | Alapértelmezett súly | Leírás                                                                                                                                                                                                                                           |
| :-------------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429               | Fennmaradó kvóta / tarifakorlát mozgástér [0..1]                                                                                                                                                                                                 |
| `health`              | 0.1605               | Egészségügyi pontszám a megszakítóból (CLOSED= 1.0, HALF_OPEN= 0.5, OPEN= 0.0)                                                                                                                                                                   |
| `costInv`             | 0.1429               | Inverz **összekevert** költség (60% input + 40% output token ár, normalizált) — olcsóbb = magasabb pontszám                                                                                                                                      |
| `latencyInv`          | 0.1143               | Az inverz p95 késleltetés normalizálva — gyorsabb = magasabb pontszám összegyűjtése érdekében                                                                                                                                                    |
| `taskFit`             | 0.0762               | Feladat típusú alkalmasság (kódolás, áttekintés, tervezés, elemzés, hibakeresés, dokumentumok)                                                                                                                                                   |
| `stability`           | 0.0476               | Variancia alapú stabilitás a latencia szórástól — olyan jelölt, akinek válaszideje ingadozik, alacsonyabb pontszámot kap                                                                                                                         |
| `tierPriority`        | 0.0476               | Fiókszintű prioritású — Ultra = 1.0, Pro = 0.67, normál = 0.33, ingyenes = 0.0                                                                                                                                                                   |
| `tierAffinity`        | 0.0476               | A jelölt szintje és a jegyzék által javasolt szint közötti rokonság                                                                                                                                                                              |
| `specificityMatch`    | 0.0476               | Egyezzen a kérésspecifikusság (nyilvánvaló tipp) és a modellszint között                                                                                                                                                                         |
| `contextAffinity`     | 0.0476               | Affinitás a kérés kontextusablak-szükséglete és a modell környezeti ablaka között                                                                                                                                                                |
| `sessionAvailability` | 0.0476               | A jelölt kapcsolat OAuth munkamenet elérhetősége ehhez a munkamenethez (`getOAuthSessionAvailability()`; nem OAuth kapcsolatok pontszáma 1,0)                                                                                                    |
| `connectionDensity`   | 0.0476               | Megosztja a terhelést ugyanazon szolgáltató kapcsolatai között (koncentrációellenes)                                                                                                                                                             |
| `cacheAffinity`       | 0.00                 | Rendezvous-hash-alapú affinitás azon kapcsolat irányába, amely a legnagyobb valószínűséggel már tartalmazza a kérés prompt-gyorsítótárának előtagját (`open-sse/services/combo/promptCacheAffinity.ts`); alapértelmezés szerint letiltva (#8008) |
| `resetWindowAffinity` | 0.00                 | Elfogultság olyan kapcsolatok felé, amelyeknek a kvóta-visszaállítási ablaka kedvező (alapértelmezés szerint le van tiltva)                                                                                                                      |
| `quality`             | 0.03                 | Visszacsatolás-vezérelt kimeneti minőségű jel az útvonal-esemény-minőség-követőtől; a megfigyelések nélküli jelöltek semleges 0,5-et kapnak                                                                                                      |
| `reliability`         | 0.00                 | Megfigyelt sikerrészesedés, `1 - failureRate`, 24 órás használati előzményekből, tízmintás szint mögött (egyébként valós idejű mérőszámok); az észrevételek nélküli jelöltek 1.0-nak minősülnek. Alapértelmezés szerint letiltva                 |

A memóriában lévő `quality` nyomkövető (`open-sse/services/routing/quality.ts`) hideg újraindítás után üres, így minden jelölt semleges `0.5` kap az első megfigyelések megérkezéséig.

> **Olvashatatlan kvóta (#15347).** Ha egy szolgáltató rendelkezik kvótalekérővel, de nem ad vissza semmi olvashatóat (sikertelen lekérés, hiányzó hitelesítő adatok, csak üzenethasználat vagy hibásan formázott pillanatkép elemezhető `windows` vel és véges `percentUsed` vel, beleértve `percentUsed: null`), a jelölt `0` kap a `quota` tengelyen, és a végső pontszáma `UNREADABLE_QUOTA_SOFT_DEPRIORITIZE_FACTOR` szorozva a soft penty-vel (-0- `autoStrategy.ts`). mintát, mint a kapcsolati állapot büntetés. A sikertelen használati leolvasás a telemetriára vonatkozó bizonyíték, nem a szolgáltató, ezért szigorúan minden valós érték alatt van, beleértve a megerősített 100%-os -used -t is, de soha nem blokkolják vagy eltávolítják. A felső határ nélküli szolgáltató `unlimited: true` jelenti, és teljes kvótának számít; egy regisztrált kvótalekérővel nem rendelkező szolgáltatónak egyáltalán nincs telemetriai forrása, és megtartja az alapértelmezett `100`.

**Összeg:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` `DEFAULT_WEIGHTS` ben deklarált módon; A felhasználó által konfigurált súlyokat `normalizeScoringWeights()` eloszlásba normalizálja a pontozás előtt.

## Módcsomagok

6 előre definiált súlyprofil az `open-sse/services/autoCombo/modePacks.ts` fájlban. Minden csomag teljes egészében lecseréli az alapértelmezett súlyokat, hogy a kiválasztást egy adott cél felé terelje. Mindegyik csomag súlyainak összege eleve `1.0` (négy tizedesjeggyel kiírva `0.9999`), így a `normalizeScoringWeights()` függvénynek nincs mit érdemben korrigálnia, amikor egy csomag aktív — az alábbi értékeket alkalmazza a pontozó, a kerekítéstől eltekintve.

| Tényező               | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Megjegyzések:

- **A csomagok tartalmazzák a `quality` és a `reliability` értékét** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`), és teljes egészében lecserélik a súlytérképet (`weights = pack`, nem összevonás történik). A `DEFAULT_WEIGHTS` értékei `quality 0.03 / reliability 0`; a `balanced`/`default` kiválasztása megtartja ezeket az alapértelmezéseket, míg egy csomag kiválasztásakor a csomag fenti értékei lépnek érvénybe. Üres készlet esetén (még nincsenek megfigyelések, ezért `quality 0.5` és `reliability 1`) ez a két tényező egy általános csomagnál `+0.04` értéket ad hozzá (`0.03 + 0.01`), a `quality-first` esetén `+0.045`, a `reliability-first` esetén pedig `+0.05` értéket.
- A `tierAffinity`, a `specificityMatch` és a `resetWindowAffinity` értéke minden csomagban kifejezetten `0`.
- Az egyes csomagok hangsúlyai röviden:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (alacsony késleltetésű, egészséges kapcsolatok)
  - **cost-saver** → costInv 0.3324 (a legolcsóbb tokenek nyernek)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, az összes csomag közül a legmagasabb (a feladathoz legjobb, következetesen működő modell)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (maximális tartalék, a sebességtől/költségtől függetlenül)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, az összes csomag közül a legmagasabb (a legkevesebb meglepetés)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (az `auto/chaos` súlycsomag ezeket rendeli a panel tagjaihoz; a párhuzamos szétosztás nem olvassa ezeket a súlyokat, és ez nem hibabefecskendezési profil, lásd: [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out))

### Kérésenkénti vezérlők (fejlécek) — #6023 / #6024 / #6025 / #3470

Egy `auto` kombináció **kérésenként** vezérelhető három fejléc segítségével, a
kombináció tárolt konfigurációjának módosítása nélkül. Ezek csak az `auto` stratégiára és csak az őket
tartalmazó kérésre érvényesek; ha a fejléc hiányzik, a kombináció mentett `modePack`/`budgetCap`/`budgetFallback`
értékei lesznek használva.

| Fejléc                        | Elfogadott értékek                                                                                                                                                                                        | Hatás                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | egy előre beállított alias (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) vagy egy nyers csomagnév (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Felülírja a pontozási súlyokat ennél a kérésnél. A `balanced`/`default` az alapértelmezett súlyokat kényszeríti ki (csomag nélkül). Az ismeretlen értékeket a rendszer figyelmen kívül hagyja (a konfiguráció megmarad).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `X-OmniRoute-Budget`          | egy pozitív szám (kérésenkénti maximális összeg USD-ben)                                                                                                                                                  | Szigorú költségplafon: a rendszer a kiválasztás előtt kiszűri azokat a jelölteket, amelyek becsült költsége meghaladja ezt. Azt, hogy mi történjen, amikor **minden** jelölt meghaladja, az alábbi `X-OmniRoute-Budget-Fallback` szabályozza.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (alapértelmezett, aliasok: `cheapest-viable`, `soft`) vagy `strict` (aliasok: `block`, `hard`)                                                                                                 | `cheapest`: tartalékmegoldásként a globálisan legolcsóbb jelöltet választja, még akkor is, ha az továbbra is meghaladja a korlátot (örökölt működés). `strict`: megtagadja a kiválasztást — a kérés azonnal meghiúsul `HTTP 402` válasszal a keret észrevétlen túllépése helyett. Az ismeretlen értékeket a rendszer figyelmen kívül hagyja.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `X-OmniRoute-Effort`          | `auto` (a többi érték fenntartva)                                                                                                                                                                         | Adaptív gondolkodási keret: ha a kérés **semmilyen** formában nem tartalmaz következtetési mezőt (`reasoning_effort`, `reasoning`, `thinking`), az átjáró determinisztikus, a kérés szerkezetéből származó jelek (az utolsó felhasználói üzenet hossza, a kontextus mérete az utolsó felhasználói üzenetig, korábbi eszközeredmények, az eszközhurok mélysége) alapján oldja fel az `auto` értéket `low`/`medium`/`high` értékre. A jelek az aktuális fordulóra korlátozódnak — az utolsó felhasználói üzenet után minden figyelmen kívül marad —, így egy eszközhurokban minden kérés ugyanarra a szintre oldódik fel (állapotmentes, fordulónkénti rögzítés, munkamenet-állapot nélkül, a hurkon belüli olyan szintemelés nélkül, amely megtörné a felsőbb réteg promptgyorsítótárának előtagjait). A kliens által explicit módon megadott következtetési mező mindig elsőbbséget élvez. Azokra a kérésekre korlátozódik, amelyek felsőbb rétegbeli továbbítása az OpenAI Chat Completions formára oldódik fel (`targetFormat === FORMATS.OPENAI`) — a `reasoning_effort` OpenAI-formájú mező, ezért a fejlécnek nincs hatása Claude- vagy Gemini-célú kérés esetén (lásd: `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# A leggyorsabb profil kikényszerítése, a kérés költségének korlátozása 0,05 USD-ra, és a túlköltés helyett szigorú blokkolás
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

A feloldás tiszta függvény (`open-sse/services/autoCombo/requestControls.ts`); a
feloldott értékek a motor meglévő `config.modePack` / `config.budgetCap` /
`config.budgetFallback` bemeneteibe kerülnek. Egy kombináció eltárolt `config.budgetFallback` ("strict" |
"cheapest") értéke határozza meg az állandó szabályzatot; a fejléc ezt egyetlen kérés erejéig felülírja.

## Minden útválasztási stratégia

A OmniRoute kombinált motorja támogatja **20 útválasztási stratégia** (a `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES` ben deklarálva). Maga az Auto Combo motor is a `auto` stratégia alatt látható; a többi elérhető tartós kombókhoz.

| Stratégia           | Leírás                                                                                                                                                                                                                     |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Első célként rendezett lista kifejezett prioritással                                                                                                                                                                       |
| `weighted`          | Véletlenszerűen súlyozva a célsúly szerint                                                                                                                                                                                 |
| `round-robin`       | Sorrendben lépkedjen a célok között (kötegelve; lásd lent)                                                                                                                                                                 |
| `context-relay`     | Kontextus átadása a célok között (hosszú beszélgetések)                                                                                                                                                                    |
| `fill-first`        | Töltse ki az egyes célpontok kvótáját, mielőtt a következőre lépne                                                                                                                                                         |
| `p2c`               | Power-of-2-choices véletlenszerű terheléselosztás                                                                                                                                                                          |
| `random`            | Egységes véletlenszerű kiválasztás                                                                                                                                                                                         |
| `least-used`        | Válassza ki a legalacsonyabb áramterhelésű célt                                                                                                                                                                            |
| `cost-optimized`    | Minimalizálja $ kérésenként adott katalógus árak                                                                                                                                                                           |
| `reset-aware` ⭐    | Prioritás a kvóta-visszaállítási idő szerint — rövid alaphelyzetbe állítási ablakai magasabban rangsoroltak                                                                                                                |
| `reset-window`      | Olyan célokat részesítsen előnyben, amelyeknek a kvótaablak a leghamarabb visszaáll                                                                                                                                        |
| `headroom`          | Válassza ki azt a célpontot, amelynél a kvóta legnagyobb szabad mozgástere van                                                                                                                                             |
| `quota-weighted`    | Hagyja ki a kimerült fiókokat, majd válasszon a többi közül a fennmaradó kvóta arányában, osztva a repülés közbeni töltettel; a meglévő beszélgetések rögzítve maradnak                                                    |
| `strict-random`     | Véletlenszerű az ismétlések deduplikációja nélkül                                                                                                                                                                          |
| `auto`              | Használja az Auto Combo pontozást (16-faktoros) —**ajánlott**                                                                                                                                                              |
| `lkgp`              | Utolsó ismert-jó útvonal (kijelöli az utolsó sikeres szolgáltatót, majd visszatér a szabályokhoz)                                                                                                                          |
| `context-optimized` | Válassza ki az aktuális kontextusmérethez legjobban illeszkedő célt                                                                                                                                                        |
| `cache-optimized`   | Célok átrendezése gyorsítótárazási affinitás szerint — először azt a kapcsolatot próbálja ki, amelyikben a legvalószínűbb a kérés gyorsítótárban tárolt előtagja (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Párhuzamosan pásztázzon a modellek paneljéhez, majd szintetizáljon egy választ a bírón keresztül (lásd alább)                                                                                                              |
| `pipeline`          | Futtassa a célokat egymás után, minden lépés kimenetét a következő lépés bemenetébe fűzve; csak a végső válasz kerül visszaadásra (#6396)                                                                                  |

⭐ = Új a 3.8.0-ban · 🧬 = Új a 3.8.36-ban

### `weighted` szemantika

`weighted` egy **arányos véletlenszerű sorsolás kérésenként** (`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), nem egyenlítő:

- Minden kérés húz **egy** lépés valószínűséggel `weight / totalWeight`; a fennmaradó lépések csökkenő súly szerint vannak rendezve, mint a kérés tartaléklánca.
- Az a lépcső, amelynek súlya `0` (vagy hiányzik).**soha nem rajzolt** míg bármely más lépés súlya > 0 — csak tartalékként szolgálhat, miután a megrajzolt lépés meghiúsul. Csak amikor **minden** a súlyok 0, egységessé válik-e a kijelölés.
- Azok a lépések, amelyeknek a célpontjai mind — szolgáltató megszakítója `OPEN`, a kapcsolat lehűtése, — modell zárolása, kikerülnek a sorsolásból, mielőtt megtörténne (`open-sse/services/combo/targetResolution.ts`), így egyetlen egészséges lépéssel ideiglenesen minden kérést megnyerhet.
- `stickyWeightedLimit` (kombinált konfiguráció, alapértelmezett `1` = kikapcsolva) rögzíti a megrajzolt lépést annyi egymást követő sikerhez az újrarajzolás előtt.

A szigorú forgatáshoz használja `round-robin`; `weighted` egyenlő súlyai statisztikai — adnak, nem szigorú — egyensúlyt.

### Ügynöki csővezeték mód

A legalább két modellt tartalmazó `pipeline` kombó választhatja planner/executor útválasztást `config.agenticOrchestration.enabled` vel. Az első célpont rendelkezik a tervezéssel és a végső válaszokkal; a második cél ügyfél-natív eszközhívásokat bocsát ki. OmniRoute észleli az eszköz-eredmény folytatásokat a kérelem protokollból, megkérdezi a tervezőt, hogy szükség van-e még egy szerszámkörre, és dinamikusan a végrehajtót vagy a tervezőt az ügyfél felé forduló utolsó lépéssé teszi.

Az opcionális `config.agenticOrchestration.contextCompaction` külön hasznos teherköltségvetést alkalmaz minden tervezői vagy végrehajtói feladás előtt. Engedélyezze kifejezetten:

```json
{
  "enabled": true,
  "defaultMaxChars": 400000,
  "targetRatio": 0.72,
  "toolResultMaxChars": 24000,
  "modelMaxChars": { "provider/planner": 175000, "provider/executor": 300000 }
}
```

Ezek az operátor által kiválasztott soros JSON karakter-költségvetések, nem jogkivonat-kontextusablakok vagy garantált upstream korlátok. A pontos IDs modell felülírja az alapértelmezettet. A küszöbérték felett a tömörítés eltávolítja az azonos szerszámdefiníciókat, kivonattal levágja a túlméretezett szerszámleírásokat, és eltávolítja a régi teljes előzménycsoportokat a célarány felé. Megőrzi system/developer utasításokat, a legújabb felhasználói kérést, az utolsó szerszámkört, beleértve a párhuzamos calls/results, és Gemini vezető útválasztási utasítását. A legfelső szintű utasítások és a szerszámbeállítások megmaradnak. Egy kihagyásjelző rögzíti az eltávolított előzményeket; ez determinisztikus vágás, nem szemantikai összefoglalás. Ha a rögzített kontextus továbbra is meghaladja a költségvetést, a kérés 413-at ad vissza, mielőtt kapcsolatba lépne a modellel. Ha a tömörítés le van tiltva vagy a küszöb alatt van, a kérés változatlan formában halad át.

A szerszám-eredmény folytatásakor OmniRoute akkor is leállítja a végrehajtást, ha két egymást követő befejezett kör változatlan eredménnyel ismétli meg ugyanazt az eszközhívást, vagy ha két egymást követő körben minden kifejezetten megjelölt eredmény sikertelen volt. A megváltozott eredmények lehetővé teszik az ismételt hívást (például lekérdezést). Az őr új felhasználói kérésre alaphelyzetbe áll, egy körbe csoportosítja a párhuzamos hívásokat, és támogatja Anthropic, a csevegés befejezéseket, a válaszokat és Gemini előzményeket. A tervező megkapja az indoklást, és övé a végső válasz akkor is, ha újabb eszközkört kér.

A második cél utáni további modellek végrehajtói biztonsági mentések. A sikertelen HTTP válasz vagy szállítási kivétel továbblép a következő végrehajtóhoz, ugyanazt a tervezői döntést és natív eszközöket hordozva, de a végrehajtó saját lépést és feloldott kapcsolatot. Az első sikeres válasz változatlan formában jelenik meg, beleértve SSE adatfolyamot is; a sikeres adatfolyam-indítás utáni hibákat itt nem lehet újra megpróbálni. Ha az összes végrehajtó meghibásodik, az utolsó hiba kerül visszaadásra. Az ügyfél megszakítja a küldés leállítását.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

A végrehajtó több független hívást is kiadhat egy válaszban. A függő hívások kezelése későbbi ügyféleszköz-eredmény fordulatokban történik, a tervező pedig minden eredményt felülvizsgál. `maxToolRounds` alapértelmezés szerint `8`, és elfogadja `1`–`32`; elérése után a tervezőnek az elérhető legjobb végső választ kell adnia. A belső tervezői döntések pufferelve vannak, míg a kiválasztott ügyféloldali válasz megőrzi az eredeti adatfolyam-beállítást.

### `round-robin` ragadós köteg és fiókbővítés

A körmérkőzés kötegelt, nem lépésenként egy kérelem:

- `stickyRoundRobinLimit` (kombinált konfiguráció, majd `comboStickyRoundRobinLimit`, majd `settings.stickyRoundRobinLimit`, alapértelmezett **3** ). Állítsa a kombinált felülírást `1` -re az egykéréses elforgatáshoz. A kombinált szerkesztő megmutatja az effektív értéket és azt, hogy melyik rétegből származik.
- `connectionAwareExpansion` (kombinált konfiguráció, majd beállítások, alapértelmezett **hamis** ) a rotáció előtt minden szolgáltatói szintű lépést fiókonkénti célokra bővít. A B-csoport stratégiái (prioritásos, súlyozott, körforgásos, véletlenszerű, p2c, legkevésbé használt, költségoptimalizált, lkgp, kitöltés-első, szigorú véletlenszerű, kontextusra optimalizált, gyorsítótár-optimalizált, kontextus-közvetítés, fúzió, folyamat) mindaddig szolgáltatói szintű nézetet biztosítanak, amíg ez be nem kapcsol. A kombinált szerkesztő megjeleníti az inherit / on / off; Az inherit a globális alapértelmezést használja (ki).
- Prompt-cache helyi útválasztás (`promptCacheAffinityEnabled`, alapértelmezés **igaz** ) átrendezi a rögzített kapcsolatokat, így a megfelelő gyorsítótár-kulcsok egy fiókban maradnak. Ez elsőbbséget élvez a kör-robin és a súlyozott elforgatással szemben a rögzített fiókonkénti lépések között. Kapcsolja ki a Beállítások → Combo alapértelmezett beállításai alatt, ha szigorú elforgatásra van szüksége. Nincs kombinációnkénti felülírás.

Ha több fiókot szeretne váltani egy modellen, részesítse előnyben **egy dinamikus fiók lépés** (üres `connectionId`, egész medence) ragadós határértékkel `1`, nem három rögzített `connectionId` vel. A rögzített lépések és az affinitás összeomlik ugyanarra a fiókra, még akkor is, ha a RR számláló előrehalad.

## Fúziós stratégia

A `fusion` az egyetlen olyan stratégia, amely **nem** választ ki egyetlen célmodellt. A promptot
**párhuzamosan elküldi a panel összes modelljének**, majd egy konfigurálható **bíráló modell**
egyetlen végleges választ szintetizál a panel összes válaszából. Az upstream `decolua/9router`
projektből átvéve (az OpenRouter Fusion kialakítása); implementáció: `open-sse/services/fusion.ts`.

Működése:

0. **Eszközöket tartalmazó kérések megkerülő útvonala** — ha egy kérés nem üres `tools` tömböt tartalmaz,
   és a `tool_choice` nincs explicit módon `"none"` értékre állítva, akkor teljesen kihagyja a panelt:
   közvetlenül egyetlen modellhez (a konfigurált bírálóhoz vagy a `panel[0]` modellhez) irányítja,
   miközben a `tools`/`tool_choice` változatlanul továbbításra kerül. A panel tagjai nem férnek hozzá
   eszközökhöz, a bíráló szintézisutasítása pedig ellenzi az eszközhívások kibocsátását, így az
   ügynökalapú/eszközhívást használó kliensek szintetizált próza helyett valódi döntést kapnak
   az eszközhívásról (#6771).
1. **Párhuzamos szétküldés** (csak eszközöket nem tartalmazó kérések esetén) — a prompt egyszerre kerül
   elküldésre a panel összes modelljének, kikényszerített nem streamelő módban, eltávolított
   eszközökkel (a bírálónak teljes szöveges válaszokra van szüksége a szintézishez).
2. **Kvórum utáni türelmi idővel történő gyűjtés** — amint beérkezik `minPanel` válasz, elindul egy rövid
   türelmi időzítő a lemaradó modellek számára, majd a fúzió az addig összegyűjtött válaszokkal
   folytatódik. Ez korlátozza a leglassabb modell által okozott késleltetést, egy szigorú
   időkorláton belül.
3. **Bírálói szintézis** — a panel válaszai anonimizálva lesznek (`Source 1`, `Source 2`, … — így
   a bíráló a tartalmat mérlegeli, nem a modell márkáját), majd átadásra kerülnek a bírálónak,
   amely elemzi a konszenzust / ellentmondásokat / részleges lefedettséget / egyedi felismeréseket /
   vakfoltokat, ezután pedig **egyetlen** mérvadó választ ír. A bíráló hívása megtartja a kliens
   eredeti `stream` jelzőjét és eszközeit, így a streamelés és a későbbi eszközhasználat továbbra
   is működik.
4. **Fokozatos visszaesés** — 0 panelválasz → `503`; pontosan 1 megmaradt válasz → közvetlenül az
   a válasz kerül visszaadásra (nincs mit egyesíteni); az egyetlen modellből álló panel
   közvetlenül válaszol.

A panel egy tagja lehet egy másik kombinációra hivatkozó `combo-ref` lépés
(`{kind: "combo-ref", comboName: "..."}`) is — ez **egyetlen feketedobozként kezelt panelhangként**
oldódik fel (teljes rekurzív továbbítással a hivatkozott kombinációba, nem pedig az adott kombináció
saját céljaira történő párhuzamos szétküldéssel), ugyanazzal a mélység- és ciklusvédelemmel, amelyet
minden más, combo-ref hivatkozást használó stratégia is alkalmaz (#6764).

### Konfiguráció

A kombináció `config` objektumában konfigurálható (nincs szükség sémamigrációra — a meglévő
`combos` táblát használja):

| Mező                                     | Típus    | Alapértelmezés   | Rendeltetés                                                                                                |
| :--------------------------------------- | :------- | :--------------- | :--------------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | első panelmodell | A végleges választ szintetizáló modell                                                                     |
| `config.fusionTuning.minPanel`           | `number` | `2`              | A türelmi időzítő elindításához szükséges sikeres válaszok száma (`[2, panelSize]` tartományra korlátozva) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`           | Mennyi ideig várjon a lemaradókra a kvórum elérése után                                                    |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`          | Abszolút korlát, hogy egy beragadt modell ne tudja megakasztani a kérést                                   |

Az alapértelmezések a `FUSION_DEFAULTS` konstansban találhatók (`open-sse/services/fusion.ts`).

### Példa

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Ezután ugyanúgy hívható, mint bármely más kombináció: `{"model":"fusion-panel","messages":[...]}`.

## Virtuális Auto-Combo-gyár

Az Auto Combo-motor nem igényel előre definiált kombókat. Ehelyett az `open-sse/services/autoCombo/virtualFactory.ts` menet közben állítja elő a jelölteket:

1. Lekéri a `getProviderConnections({ isActive: true })` eredményét (az összes engedélyezett kapcsolatot)
2. Kiszűri az érvényes hitelesítő adatokkal rendelkezőket (API-kulcs vagy le nem járt OAuth-token a `hasUsableOAuthToken()` segítségével)
3. Összeveti őket a `getProviderRegistry()` adataival a modellek elérhetősége és árazása érdekében
4. Minden `(provider, model, connection)` rendezett hármashoz létrehoz egy `VirtualAutoComboCandidate` példányt
5. A `connection.defaultModel` értékét (vagy a nyilvántartás első modelljét) választja ki továbbítási célként
6. Minden jelöltet a 16 tényezős `scorePool()` és a változat súlycsomagja alapján pontoz
7. Visszaadja az így létrejött, memóriában tárolt `AutoComboConfig` értéket a `handleComboChat()` számára — az soha nem kerül perzisztálásra az adatbázisban

Ez azt jelenti, hogy **egy új, engedélyezett `auto/*` beállítással rendelkező szolgáltató hozzáadása automatikusan kibővíti a jelöltek körét** — nincs szükség a kombó kézi szerkesztésére. A virtuális kombó minden kérésnél újjáépül, így az újonnan hozzáadott vagy újra megfelelően működő kapcsolatok azonnal bekerülnek.

## Öngyógyítás

- **Ideiglenes kizárás**: Pontszám < 0,2 → kizárás 5 percre (fokozatos várakozási idő, legfeljebb 30 perc)
- **Áramkör-megszakító figyelembevétele**: OPEN → automatikusan kizárva; HALF_OPEN → próbakérések
- **Incidensmód**: >50% OPEN → a feltérképezés letiltása, a stabilitás maximalizálása
- **Helyreállítás a várakozási idő után**: A kizárást követő első kérés egy csökkentett időtúllépésű „próba”

## Bandit-feltérképezés

A kérések 5%-a (konfigurálható) véletlenszerű szolgáltatókhoz kerül feltérképezési céllal. Incidensmódban le van tiltva.

## API

**Nincs dedikált `POST /api/combos/auto` végpont** — az Auto-Combo kétféleképpen használható:

1. **Konfiguráció nélkül (ajánlott):** Küldjön bármilyen csevegésikiegészítés-kérést `model: "auto"` vagy `model: "auto/<variant>"` értékkel. A virtuális gyár kérésenként építi fel a kombót — nincs szükség tartós tárolásra vagy API-hívásokra.

2. **Tartósan tárolt kombó `strategy: "auto"` beállítással:** Hozzon létre egy normál kombót a `POST /api/combos` használatával, és állítsa be a `strategy: "auto"` értéket, valamint a `config.auto.weights` / `config.auto.candidatePool` beállításokat. Ugyanaz a pontozómotor kerül használatra; a kombó a `combos` tárolóban lesz mentve, és azonosító alapján újra felhasználható.

A felderítéshez a `GET /api/combos/auto` felsorolja az összes változatot a feloldott jelöltkészletével, valamint a `context_length` / `max_output_tokens` értékekkel — ezek a jelöltkészlet ablakai közül vett MAX értékek. A klienseknek (például az opencode beépülő modulnak) ezeket az értékeket kell meghirdetniük `0` helyett: a nulla méretű kontextus teljesen letiltja az opencode automatikus tömörítését, így a munkamenetek addig növekednek, amíg az átjáró előzménytisztítása el nem pusztítja a kontextust. A MAX érték meghirdetése biztonságos, mert az auto-combo kontextus-előszűrője a túlméretes kéréseket nagy ablakkal rendelkező jelöltekhez irányítja.

```bash
# Konfiguráció nélküli használat (kombó létrehozása nélkül)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Tartósan tárolt automatikus kombó a normál kombóvégponton keresztül
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Automatikus útválasztási stratégiák

A tartósan tárolt, `strategy: "auto"` beállítású kombóknál a `config.routerStrategy` (vagy az örökölt
`config.auto.routerStrategy`) az alábbi értékek egyikére állítható:

- `rules` — alapértelmezett súlyozott pontozás
- `score` — a legmagasabb konfigurált súlyozott pontszámot választja. Pontosan azonos pontszám esetén megőrzi a konfigurált
  jelöltsorrendet; a meglévő `explorationRate` a teljes rangsorolt készletből végez mintavételt.
- `cost` / `eco` — a legolcsóbb kifogástalan állapotú szolgáltató
- `latency` / `fast` — a legalacsonyabb p95 késleltetés megbízhatósági büntetéssel
- `sla-aware` / `sla` — előnyben részesíti azokat a jelölteket, amelyek megfelelnek a p95 késleltetési, hibaarány- és opcionális
  költség-SLO-knak
- `lkgp` — először a legutóbb ismerten jól működő szolgáltató
- `nadir` — megkérdezi a [Nadir](https://getnadir.com) döntési API-ját, hogy a készlet melyik modelljére van szüksége az
  utasításnak; külön engedélyezendő, hiba esetén a `rules` stratégiára tér át

### Az útválasztási stratégiák részletesen

Az auto-combo motor 7 cserélhető **RouterStrategy**-megvalósítást kínál, amelyek között
a `config.routerStrategy` (vagy az örökölt `config.auto.routerStrategy`) használatával válthat.
Minden stratégia egy szolgáltatót választ a jelöltkészletből egy `RoutingContext` alapján
(feladattípus, eszköz-/képi tippek, tokenbecslés, opcionális SLA-szabályzat, opcionális
legutóbb ismerten jól működő szolgáltató).

#### 1. `rules` (alapértelmezett) — 16 tényezős súlyozott pontozás

A meglévő pontozómotort foglalja egységbe. Kiszűri az `OPEN` állapotú megszakítóval rendelkező
jelölteket, majd az aktuális feladattípussal és a `getTaskFitness()` használatával futtatja a `scorePool()` függvényt,
és a legmagasabb pontszámú szolgáltatót választja.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Mikor használja**: Alapértelmezés szerint. Akkor használja, ha az összes jel közötti kiegyensúlyozott kompromisszumra van szüksége.

**Álnév**: `rules` (nincs álnév)

---

#### 2. `cost` / `eco` — a legolcsóbb kifogástalan állapotú szolgáltató

A jelöltkészletet a `costPer1MTokens` szerint növekvő sorrendbe rendezi, és a legolcsóbbat választja.
Először kiszűri az `OPEN` állapotú jelölteket.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Mikor használja**: Költségérzékeny munkaterhelésekhez, kötegelt feldolgozáshoz vagy háttérfeladatokhoz.

**Álnevek**: `cost`, `eco`

---

#### 3. `latency` / `fast` — a legalacsonyabb p95 késleltetés megbízhatósági büntetéssel

A `p95LatencyMs + (errorRate * 1000)` alapján rendez. A hibaarányra vonatkozó büntetés biztosítja,
hogy a megbízhatatlan szolgáltatók akkor is alacsonyabb helyre kerüljenek a rangsorban, ha a névleges késleltetésük alacsony.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Mikor használja**: Késleltetésérzékeny munkaterhelésekhez, például valós idejű csevegéshez, automatikus kiegészítéshez vagy
interaktív kódolási asszisztensekhez.

**Álnevek**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — késleltetési/hiba-/költség-SLO-knak való megfelelés

Minden jelöltet aszerint pontoz, hogy mennyire felel meg a konfigurált SLO-szabályzatnak:

| Tényező               | Súly | Képlet                                                  |
| --------------------- | ---- | ------------------------------------------------------- |
| Késleltetési pontszám | 35%  | `threshold / max(value, ε)`                             |
| Hibapontszám          | 35%  | `threshold / max(value, ε)`                             |
| Állapotpontszám       | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)       |
| Költségpontszám       | 10%  | `threshold / max(value, ε)` vagy fordított normalizálás |
| Stabilitási pontszám  | 5%   | a késleltetés szórásának fordított normalizálása        |

Ha a `hardConstraints: true`, a jelöltek rendezése elsődlegesen a **sértési pontszám**
(azaz hogy mennyivel lépik túl valamelyik SLO-t), majd az összesített pontszám alapján történik. Ellenkező esetben
csak az összesített pontszám számít.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... minden jelöltet pontoz a szabályzat alapján: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA-mezők** (a kombinált konfigurációban állíthatók be):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Mikor érdemes használni**: Szigorú késleltetési, hibaarány- vagy költségkerettel rendelkező éles munkaterhelésekhez.

**Álnevek**: `sla-aware`, `sla`

---

#### 5. `lkgp` — az utolsó ismert jó szolgáltató először

Először az **utolsó ismert jó szolgáltatót** próbálja ki (ha be van állítva), majd visszatér a
`rules` stratégiára. Hasznos a munkamenet-rögzítéshez — ugyanaz a szolgáltató kezeli
a beszélgetés további kéréseit.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Visszatérés a rules stratégiára
    return getStrategy("rules").select(pool, context);
  }
}
```

**Mikor érdemes használni**: Többfordulós beszélgetéseknél, ahol azt szeretné, hogy ugyanaz a szolgáltató kezelje
a további kéréseket (például gyorsítótárazás, kontextusfolytonosság vagy egységes árazás érdekében).

**Álnév**: `lkgp` (nincs álnév)

---

#### 6. `nadir` — prompttudatos modellválasztás a Nadir segítségével

A fenti stratégiák mindegyike a saját telemetriai adatai alapján rangsorolja a jelölteket; egyik sem olvassa
a kérést. A `nadir` elküldi az utolsó felhasználói fordulót és a készlet modellazonosítóit a
[Nadir](https://getnadir.com) döntési API-jának (`POST /v1/bucket`), majd a Nadir által
a kínálatból kiválasztott modellhez irányít (`simple` → a legolcsóbb megfelelő modell, `complex` → a
csúcskategóriás modell). Az adott modellt kiszolgáló kapcsolatot továbbra is a `rules` választja ki, így a kvóta,
az állapot és a költség továbbra is meghatározza, hogy melyik fiókot használja.

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

Az `OMNIROUTE_NADIR_API_KEY` és az `OMNIROUTE_NADIR_BASE_URL` környezeti tartalékérték a két
karakterlánchoz. A `baseUrl` csak saját üzemeltetésű Nadir esetén szükséges (a rendszer elfogadja a záró `/v1` részt).
A kulcs nélküli hívások a Nadir anonim csomagjába kerülnek, amely IP-címenkénti sebességkorlátozást alkalmaz. Kulccsal
([hozzon létre egyet](https://app.getnadir.com/dashboard/api-keys)) minden döntés
naplózásra kerül a Nadir irányítópultján. Teljes beállítási és ellenőrzési útmutató:
[getnadir.com/docs/gateway-omniroute](https://getnadir.com/docs/gateway-omniroute/).

A rendszert a következő adatok hagyják el: az utolsó felhasználói üzenet szövege (az első 16 ezer karakter), a jelölt
modellek azonosítói és egy `source: "omniroute"` csatornacímke. A rendszerprompt, az előzmények, az eszközök és a
fejlécek nem kerülnek továbbításra.

Hiba esetén a működés nyitott módon folytatódik: időtúllépés (alapértelmezés szerint 2000 ms), nem 2xx válasz, elérhetetlen
gazdagép, hibás formátumú válasz vagy a készleten kívüli választás esetén a rendszer a `rules`
döntését használja, és az indoklás a `NadirStrategy: fallback (…)` előtagot kapja. Egy sikertelen hívás után a
stratégia 30 másodpercig kihagyja a hálózati hozzáférést, így egy kiesés 30 másodpercenként egy időtúllépéssel jár,
nem pedig kérésenként eggyel. Az útválasztási események csak akkor jelentenek `strategy: "nadir"` értéket, ha valóban
a Nadir hozta meg a döntést.

**Mikor érdemes használni**: Vegyes nehézségű forgalomhoz olyan készleten, amely több modellszintet fog át (egy kisebb, egy középkategóriás
és egy csúcskategóriás modellt), ha csökkenteni szeretné a csúcskategóriás modell állandó használatából eredő költséget.

**Álnév**: `nadir` (nincs álnév)

---

### Egyéni útválasztási stratégiák

A nyilvános API-n keresztül saját `RouterStrategy`-megvalósítást regisztrálhat:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Ide kerül az egyéni útválasztási logika
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Ezután használja a következőképpen:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Útmutató az útválasztási stratégia kiválasztásához

| Használati eset            | Stratégia   | Indoklás                                          |
| -------------------------- | ----------- | ------------------------------------------------- |
| Kiegyensúlyozott terhelés  | `rules`     | Alapértelmezett — minden tényezőt figyelembe vesz |
| Költség minimalizálása     | `cost`      | Mindig a legolcsóbbat választja                   |
| Késleltetés minimalizálása | `latency`   | A leggyorsabb megbízható szolgáltatót választja   |
| Szigorú SLO-k              | `sla-aware` | A p95-/hiba-/költségküszöbök alapján szűr         |
| Többfordulós csevegés      | `lkgp`      | Munkamenethez kötöttség                           |
| Vegyes nehézség            | `nadir`     | Kérésenként választja ki a modell szintjét        |

SLA-tudatos mezők:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Feladatalkalmasság

Több mint 30 modell pontozása 6 feladattípusban (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Támogatja a helyettesítő karakteres mintákat (pl. `*-coder` → magas kódolási pontszám).

## Az automatikus változatok összefoglalása

A puszta `auto` (alapértelmezett) értéket és az `autoPrefix.ts` fájlban deklarált 6 `AutoVariant` értéket is beleszámítva **7 meghívható modellazonosító** van:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(Maga az `AutoVariant` 6 értéket sorol fel; a 7. lehetőség a „változat nélküli” — puszta `auto` —, amelyet a `parseAutoPrefix()` `variant: undefined` értékként kezel.)

## Hogyan illeszkednek a szintek az Auto-Combo működésébe

A 16 tényezős pontozási függvény (`open-sse/services/autoCombo/scoring.ts`) a szinthez
tartozást két jelként kezeli: `tierPriority` (0.0476) és `tierAffinity` (0.0476). A teljes
`DEFAULT_WEIGHTS` készletet lásd fent, a kanonikus [pontozási tényezők táblázatában](#how-it-works-persisted-auto-combos) — a csomagonkénti felülbírálások (ship-fast/cost-saver/quality-first/
offline-friendly) a „Súlyprofilok csomagonként” táblázatban találhatók.

Önmagában a szint **nem** kényszeríti ki, hogy az 1. szint legyen az első — ha az 1. szint késleltetése kedvezőtlen, vagy
a költség és minőség aránya nem optimális, a 2. szint nyer. A szintek szerinti sorrend kikényszerítéséhez használja a
`priority` kombinációs stratégiát, és rendezze a szolgáltatókat szint szerint.

Az 1. szint (előfizetés) erőteljes előnyben részesítéséhez növelje a `tierPriority` súlyát:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

A szintek definícióit és a szolgáltatók besorolását lásd a [`docs/guides/TIERS.md`](../guides/TIERS.md) dokumentumban.

## Tesztelés és lefedettség

### Determinisztikus útválasztási döntési mátrix (`npm run test:combo:matrix`)

A `tests/integration/combo-matrix/*.test.ts` a valós kombinációs folyamaton és egy szimulált felsőbb szintű szolgáltatón keresztül, végponttól végpontig igazolja mind a 19 nyilvános stratégia útválasztási **döntését**.
A lefedettség a következőket tartalmazza:

- Mind a 19 `ROUTING_STRATEGY_VALUES` stratégia (ordered, weighted, cost, context, fusion, …).
- A `quota-share` (belső) végponttól végpontig: DRR-méltányosság + a telítettség miatti hátrasorolás a valós `selectQuotaShareTarget` kapcsolódási ponton keresztül (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- A `context-relay` univerzális átadási lefedettsége minden célszám esetén.

Ez a tesztcsomag a CI-ben fut (`test:integration` feladat) a `--test-concurrency=1` és
`--test-force-exit` kapcsolókkal, így determinisztikus, és nem igényel valós hitelesítő adatokat.

### Feltételes élő próbatesztek (NEM részei a CI-nek — valós szolgáltatók)

| Parancs                                | Mit csinál                                                                                                               |
| :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Folyamaton belüli valós útválasztás `RUN_COMBO_LIVE=1` beállítással; pillanatképet készít egy élő OmniRoute-adatbázisról |
| `npm run test:combo:live:vps`          | HTTP-hívások egy élő OmniRoute-kiszolgálóhoz (állítsd be a `COMBO_LIVE_BASE_URL` értékét)                                |
| `npm run test:combo:live:vps:failover` | Ugyanez, szándékosan előidézett feladatátvételi forgatókönyvekkel                                                        |

Ezek a próbatesztek a valós adatátviteli útvonalat használják (kombináció → szolgáltató → befejezés). Szándékosan ki vannak zárva a CI-ből, mert valós hitelesítő adatokat és VPS-hozzáférést igényelnek.

---

## Fájlok

| Fájl                                                      | Rendeltetés                                                                                                        |
| :-------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16 tényezős pontozási függvény, `DEFAULT_WEIGHTS`, készletnormalizálás                                             |
| `open-sse/services/autoCombo/taskFitness.ts`              | Modell × feladat alkalmassági keresőtábla                                                                          |
| `open-sse/services/autoCombo/engine.ts`                   | Kiválasztási logika, banditaalgoritmus, költségkeret-korlát                                                        |
| `open-sse/services/autoCombo/selfHealing.ts`              | Kizárás, próbák, incidensmód                                                                                       |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 súlyprofil (gyors szállítás, költségtakarékos, minőségközpontú, offline-barát, megbízhatóság-központú, káoszmód) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` előtag-értelmező + 6 változat                                                                              |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Memóriabeli `AutoComboConfig` konfigurációt hoz létre az aktív kapcsolatokból                                      |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Tesztkapcsolódási pont a szolgáltatói nyilvántartás utánzásához                                                    |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (20 stratégia)                                                                           |
| `src/sse/handlers/chat.ts`                                | Integráció: automatikus előtag esetén rövidre zárás                                                                |
