# Quality Gates Reference (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Ez a dokumentum az OmniRoute összes CI-minőségi kapujának mérvadó referenciája.
Ismerteti az egyes kapukat, az általuk ellenőrzött szempontokat, azt, hogy melyik CI-feladatban futnak, hogy
küszöbérték-alapvonalat vagy megfelelt/nem felelt meg szabályt használnak-e, valamint hogy blokkolják-e a buildet, vagy csak tájékoztató jellegűek.

Rövid összefoglalóért és az engedélyezési lista szabályzatáért lásd az „Quality Gates & Ratchets” szakaszt
az `AGENTS.md` fájlban. Ugyanezen rendszer kritikai értékelését, érettségi besorolását és eszközfüggetlen
replikációs tervét lásd a
[Minőségi kapuk kézikönyvében](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Kapuleltár és végrehajtási profilok

### Jelölt felvétel

A CI és a Quality Gates munkafolyamatok egyaránt stabil ítéletet adnak ki: `Gate / CI` és `Gate / Quality`. Verziózott felvételi szabályzatuk minden felfelé irányuló munkát felsorol, amennyiben szükséges vagy tanácsos. Egy megfelelő kötelező feladatnak sikeresnek kell lennie: hiányzó, törölt, kihagyott, függőben lévő és ismeretlen eredmények nem hozhatók létre PASS. Egy érvényes, csak dokumentumokra vagy csak katalógusra vonatkozó besorolás alkalmatlanná tehet egy kódsávot; egy tervezet PR nem elfogadott jelölt. A `hotfix` címke nem mond le a bizonyítékról.

Mindkét munkafolyamat lefedi PRs main/release ágakra, `main`-re történő átküldést, a kézi feladást és a csoportos összevonási eseményeket. Push, dispatch és merge-group futtatja a teljes kijelölést. `release/**` re történő tolások nem indítják el őket (2026-10-18): minden változás már futtatta a mátrixot PR jén, és az egyesített kombináció a Release-Green feladata (`docs/ops/RUNNER_BOX.md` → Hosted lane). Az elágazások és az összevonási csoportok hosztolt futókat használnak azokhoz a feladatokhoz, amelyek egyébként önkiszolgáló futókat választanak ki; A megfelelő hosztolt kapacitást a közzététel előtt ellenőrizni kell.

Egy közönséges PR futtatja a gyors kiválasztást. A belépési szabályzat `full-code` és `full-code-e2e` sávja (E2E, integráció, csomagtermékek, Electron smoke, Bun SQLite, ökoszisztéma és protokollkliensek) csak a Mergify queue vázlaton vagy teljes futtatáson fut: `gh workflow run ci.yml --ref <branch>`.

Minden JSON nyugta azonosítja a kivett SHA, a munkafolyamat futtatását és kísérletét. A CLI elutasítja a checkout/event SHA eltérést. A munkafolyamat-tesztek a házirend-tagságot az ítélet-feladat `needs` listájához kötik, így egy új vagy eltávolított sáv nem tud csendben eltűnni. A nyugták a saját munkafolyamatukat fedik le, nem pedig a közzétételt, a telepítést vagy egy meglévő tanácsadó szkenner belső elemeit. Mindkét csekknév aktiválása az ágszabályokban külön adminisztratív változás; ezen munkák hozzáadása önmagában nem védi meg a fióktelepet.

### Várólista összevonása

A `queue` címke PR küld az összevonási sorba (`.mergify.yml`). A Mergify megnyit egy PR piszkozatot egy `mergify/merge-queue/` ágon, CI ott futtatja a teljes kijelölést, és az eredeti PR összeolvad, amikor `Gate / CI`, `Gate / Quality` és `Merge integrity (changelog + generated skills)` áthalad.

A Mergify beírja a várólista összefoglalóját a piszkozat leírásába, és más alkalmazások is szerkeszthetik azt. Egy ilyen piszkozaton lévő `pull_request` `edited` esemény saját egyidejűségi csoportot (`-queue-edit-<run_id>`) vesz fel, így nem tudja törölni a piszkozat valódi futtatását, és kihagyja a kaput és a mátrixot. Csak `Merge integrity` fut még. Az átugrott kapufeladat más ellenőrzési nevet visel, mivel a Mergify egy kihagyott `Gate / CI` sikertelen ellenőrzésként olvas fel, és kiírja a PR sorból.

A leküldés után a leküldés nem mindig állítja vissza a PR. Kommentben `@mergifyio queue` hozzá.

### Megőrzött bizonyíték az átvételi szűkítőben

`scripts/quality/validate-release-acceptance.mjs` csökkenti a szállított tervet és annak manifesztációit; nem állapítja meg, hogy a terv a teljes kibocsátási vezetéket lefedi. A jelentései kifejezetten beállítják `releaseAcceptance: false`, még akkor is, ha ez a terv `VERIFIED`. A `release-acceptance.yml` munkafolyamat továbbra is árnyékszerszámokat használ, nem valódi build-, csomag-, rendszerindítási vagy promóciós nyugtákat.

A CLI megköveteli `--evidence-root` a megőrzött bizonyítékok ellenőrzését. A fájlok feloldása `<evidence-root>/<artifact_id>/<member>` formátumban történik, és SHA-256 kivonatolású. Egy bizonyíték nélküli PASS rekord, egy hiányzó vagy megváltozott fájl, egy nem biztonságos elérési út vagy egy szimbolikus hivatkozás megakadályozza az ellenőrzést. A hiányzó fájlok nem egyenlőek az üres sikeres naplókkal. A meglévő SHA/run/attempt ellenőrzések függetlenek maradnak: az egyező bájtok nem tudják megmenteni az elavult nyugtát. A fájl sértetlensége nem a végrehajtás hitelességének vagy a műtermék promóciójának bizonyítéka.

### Statikus szkennelési leltár

A verziózott npm-alias leltár és a static-scan tagság `config/quality/gate-manifest.json` ban található. Futtassa `npm run check:gate-manifest` a szkriptnevek és a pontos parancsok ellenőrzéséhez `package.json` ellen; a kiegészítések, az eltávolítások és a parancssodródás mind a helyi hook, mind a CI változás-osztályozási munkája sikertelen. Az álnév nem munkafolyamat-feladat, mátrixpéldány vagy teszteset: ezeket a számokat nem szabad felcserélhetőként bemutatni.

`npm run quality:scan -- --list` vagy `npm run quality:scan:fast -- --list` segítségével ellenőrizheti a kiválasztott álneveket anélkül, hogy végrehajtaná őket. A futtató meghívja az npm belépési pontot, így annak futásideje (beleértve Bun ahol be van állítva) megmarad. A jegyzékrekordok a profilokon kívüli álneveket külön hívják meg, és a karbantartási parancsok tiltottak a csak olvasható vizsgálati profilokban.

Ezek a profilok csak a statikus vizsgálatot fedik le. Nem tanúsítják a termékteszteket, a lefedettséget, a csomagolást, a külső ellenőrzéseket vagy a jelölt teljes kiadási elfogadását. A munkafolyamat-felvétel a kapcsolódó `config/quality/admission-policy.json` és `scripts/quality/admission-verdict.mjs` használja. A kiadás-megfigyelő profilok külön maradnak; függetlenül vizsgálja meg a vonatkozó csekkeket és nyugtákat. A teljes megfigyelő statikus parancsai `config/quality/release-green-static-profile.json`-ben vannak deklarálva, beleértve `audit:deps`, a mutációs teszt kiválasztását és a fordítási ellenőrzéseket. A betöltő ellenőrzi az npm parancsokat package.json és a modellezett CI/Quality deklarációkkal szemben; elutasítja a sodródást, ahelyett, hogy shell tokeneket hajtana végre argumentumként. A szkenner szükséges SKIP/INCOMPLETE kimenete nem tudja létrehozni PASS. A profil rögzíti a külső kizárásokat, és nem helyettesíti a tárolt lefedettséget, a tesztmátrixokat, a csomagot vagy a telepítési bizonyítékokat. Az alábbi prózai leltár referencia, nem annak bizonyítéka, hogy valóban befutott egy kapu.

A szkriptek `scripts/check/` (policy gates) és `scripts/quality/` (racsnis motor) alatt élnek. Az igazság CI forrása `.github/workflows/ci.yml`.

### PR gyorsút (`quality.yml`) felszabadítása

A `.github/workflows/quality.yml` kiegészíti a CI-t a main/release PR-ek, a `main` ágra történő pushok,
a dispatch és a merge groupok esetében. A PR-ek elérési útszűrt gyors ellenőrzéseket használnak.
A véglegesen letiltott duplikált buildet eltávolították; a valódi build-, csomag- és bootellenőrzések
továbbra is a CI-ben maradnak. Az egységtesztcsomag és a vitest csak a CI-ben fut
(`Unit Tests (N/8)` és `Vitest`).

| Feladat                                          | Hatókör                                                                                                                                                     | Blokkoló                      |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `Docs Gates (fast-path)`                         | Dokumentációs és kód-PR-ek; API-dokumentációs hivatkozások és docs-all                                                                                      | Igen                          |
| `Fast Quality Gates`                             | Kód-PR-ek; statikus ellenőrzések, típusellenőrzés, irányítópult-típusellenőrzés, érintett egységtesztek, elfelejtett testvértesztek (tájékoztató jelleggel) |
| `No new ESLint warnings`                         | Kód-PR-ek; az elnyomásokat figyelembe vevő lint-ellenőrzés                                                                                                  | Igen, a forkokat is beleértve |
| `Merge integrity (changelog + generated skills)` | Nem piszkozatként létrehozott PR-ek; változásnapló és a generált skillek szinkronizálása                                                                    | Igen, a forkokat is beleértve |

#### Az elfelejtett testvértesztekről szóló jelentés

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` tanácsadó lépéseként fut, és újrafelhasználja az importfeloldót a teszt-hatástérkép mögött. Minden módosított termelési modulnál determinisztikus `changed module/symbol -> static consumer -> candidate sibling test` láncokat jelent, ha a jelölt teszt hiányzik a lekérési kérés különbségéből. A Markdown összegzése és JSON eredménye a `forgotten-sibling-tests` munkafolyamat mellékterméke marad a blokkoló közzététel előtti kalibráláshoz.

A hordós reexport és a dinamikus import csak felbontási diagnosztikát jelent; soha nem hoznak létre blokkoló megállapítást. A felülvizsgált kivételek élnek itt: `config/quality/forgotten-sibling-allowlist.json`. Minden bejegyzésnek meg kell neveznie a fogyasztói és jelölt tesztet, meg kell adnia egy konkrét indoklást, és csatolnia kell egy GitHub problémát vagy lekérési kérést. A hibás formátumú bejegyzések lezárása sikertelen. A kivételek nem tilthatják el a törölt jelölttesztet vagy `.skip`/`.todo`-t hozzáadó különbséget; Az állításgyengítés és az egyéb maszkolás továbbra is a független blokkoló `check:test-masking` kapu tulajdonában marad.

### Munka: `lint`

Minden PR tól `main` fut. A blokkok összeolvadnak hiba esetén.

| forgatókönyv (`npm run ...`)      | Érvényesíti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Blokkolás                                   |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | A Node.js verziója a támogatott tartományon belül van-e                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Igen                                        |
| `check:cycles`                    | Körkörös importok az összes `src/` + `open-sse/` alatt (AST-alapú, a tsconfig `paths` feloldásával). A Bare mindig 1-es kóddal lép ki, ha bármilyen ciklus létezik (a #15281 óta hibabiztos működés), és felsorolja az SCC-ket. A `check:cycles:ratchet` (ezt futtatja a CI) blokkol, ha a ciklusok száma meghaladja a `quality-baseline.json` fájlban szereplő `metrics.cycles` felső korlátot — jelenleg 14, `direction: down`, így csak csökkenhet (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Igen (fokozatosan szigorodó korlát)         |
| `check:boundary`                  | Az `open-sse → src` csatolás: az engine-ből az alkalmazásba irányuló egyedi fájlról fájlra történő importok (`scripts/quality/measure-boundary.mjs`; az él lista a v4 core/module-split helyreállítási teendőlistája). A Bare tájékoztató jelentést készít (ugyanaz, mint a `quality:boundary`). A `check:boundary:ratchet` (ezt futtatja a CI, és a `quality.yml` gyors kapuinak fokozatos korlátellenőrzési ciklusában is szerepel) blokkol, ha a darabszám meghaladja a `quality-baseline.json` fájlban szereplő `metrics.boundaryOpenSseToSrc` felső korlátot — a mért 771 értékkel inicializálva, `direction: down`; a `--update` csak csökkentheti; PR-ek esetén az alaphoz viszonyítva (`--base-ref`, lásd alább)                                                                                                                                                                                                                                                                                                                       | Igen (fokozatosan szigorodó korlát)         |
| `check:route-validation:t06`      | Zod-sémák minden útvonalon jelen vannak (Tier 6 szabályzat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Igen                                        |
| `check:any-budget:t11`            | Az `@ts-expect-error // any` darabszáma nem haladja meg a keretet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Igen                                        |
| `check:provider-consistency`      | A `providers.ts` minden szolgáltatójához tartozik megfelelő bejegyzés a `providerRegistry.ts` fájlban (és fordítva, az engedélyezési listán belül)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Igen                                        |
| `check:model-lifecycle`           | A három kézzel karbantartott útválasztási tábla összhangban marad a verziókezelt életciklus-pillanatképpel (#11503): a `FITNESS_TABLE` (`taskFitness.ts`) nem pontoz olyan visszavont azonosítót, amelyet a `REGISTRY` útválasztani tud; minden `BUILT_IN_ALIASES` cél megtalálható a `REGISTRY` elemei között, és hiányzik a visszavont azonosítók pillanatképéből; minden, a `REGISTRY` elemei között még szereplő visszavont azonosító továbbításra kerül, vagy szerepel az `allowedRetiredInCatalog` listában; továbbá a `DEFAULT_DEGRADATION_MAP` egyetlen forrása vagy célja sem szerepel visszavontként a pillanatképben. Ez nem bizonyítja, hogy egy modellt jelenleg kiszolgál egy aktív upstream. Offline működésű — összehasonlítja az adatokat a `config/quality/model-lifecycle.json` fájllal, amelyet kézzel frissít az `npm run quality:refresh-model-lifecycle` (hálózat; nincs bekötve a CI-ba). Az `allowedRetiredInCatalog` egy leépítési fokozatos szigorítás: csak nyomonkövetési feladattal együtt adj hozzá bejegyzést. | Igen                                        |
| `check:fetch-targets`             | A kliensoldali `src/` könyvtárban található minden `fetch("/api/...")` egy valódi `route.ts` fájlra oldódik fel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Igen                                        |
| `check:deps`                      | A tároló minden `package.json` fájljában szereplő, `npm install` paranccsal telepíthető összes függőség megtalálható a `dependency-allowlist.json` fájlban; az új, verziórögzítés nélküli vagy slopsquattingolt csomagok jelölve vannak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Igen                                        |
| `audit:deps`                      | Mind az öt független lockfájl npm auditja (gyökér, Electron, OpenCode v1/v2 bővítmények és szolgáltató). A kritikus tanácsok blokkolják a folyamatot; a magas súlyosságú tanácsok továbbra is látható figyelmeztetésként jelennek meg. A hiányzó vagy sikertelen auditok NEM TELJESEK, és blokkolják a folyamatot; a hatókörönkénti lock-hash-ek és jelentések megőrzésre kerülnek.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Igen                                        |
| `check:lockfile`                  | A `package-lock.json` integritása — https-regisztrációs adatbázis, integritási hashek, hostfelülírások nélkül                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Igen                                        |
| `check:licenses`                  | SPDX-licencengedélyezési lista éles környezeti függőségekhez                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                        |
| `check:tracked-artifacts`         | Nincsenek buildartefaktumok / commitolt `node_modules` szimbolikus hivatkozások (a husky pre-commit folyamatában is fut; a pre-push szándékosan korlátozott — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Igen                                        |
| `check:ai-attribution`            | Nincs AI-/bot-eredetű `Co-Authored-By` trailer vagy AI-generálásra utaló lábléc a PR commitjaiban, címében vagy törzsében — Hard Rule #16 (a `quality.yml` gyors ellenőrzési ciklusában a PR→`release/**` esetén — az esemény payloadját olvassa be, PR-eken kívül nem végez műveletet —, valamint csak PR-ekre érvényes lépésként a `ci.yml` lintelésében a PR→`main` esetén; továbbá a husky `commit-msg` hookban; emberi társszerzők engedélyezettek; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `check:vitest-exclusions`         | Minden Vitest-kizárás megnevez egy követési issue-t, és szerepel a `config/quality/vitest-exclusions.json` fájlban (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Igen                                        |
| `check:file-size`                 | A forrásfájlok (`.ts`/`.tsx` a `src/`, `open-sse/`, `electron/`, `bin/` könyvtárakban) a `cap` értéken belül maradnak, a tesztfájlok (`*.test.ts(x)`) pedig a `testCap` értéken belül; a `file-size-baseline.json` fájlban rögzített (`frozen` / `testFrozen`) fájlok mérete nem nőhet a rögzített érték fölé                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Igen                                        |
| `check:error-helper`              | A végrehajtókban/kezelőkben lévő hibaválaszok a `buildErrorBody()` / `sanitizeErrorMessage()` függvényeket használják (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Igen                                        |
| `check:migration-numbering`       | Áttelepítési fájlnevek: a régi `001`–`241` sorozat lefagyott, az új fájlok pedig `YYYYMMDDHHMMSS_<description>.sql`. A PR bázissal szemben elutasítja az eltávolított migrációt, a kompatibilitási bejegyzés nélkül átnevezettet, valamint a nem rendes vagy szerkesztett áttelepítést, amelynek végső sémája nem ingázik                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:public-creds`              | Nincsenek literális OAuth `client_id`/`client_secret` vagy Firebase Web-kulcsok a `publicCreds.ts` fájlon kívül (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Igen                                        |
| `check:db-rules`                  | Nincs nyers SQL az `src/lib/db/` moduljain kívül; nincsenek barrel-importok a `localDb.ts` fájlból (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Igen                                        |
| `check:known-symbols`             | A diszpécsertáblákban regisztrált szolgáltatói végrehajtók, útválasztási stratégiák és fordítók megfelelnek a lemezen található fájloknak — nincsenek árva vagy deklarálatlan szimbólumok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Igen                                        |
| `check:route-guard-membership`    | Minden gyermekfolyamatot létrehozó útvonalat az `isLocalOnlyPath()` függvény osztályoz (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Igen                                        |
| `check:test-discovery`            | A tárházban található minden `*.test.ts` / `*.spec.ts` fájlt legalább egy tesztfuttató összegyűjt (szigorítási szabály: a `test-discovery-baseline.json` fájlban található árva fájlok listája csak szűkülhet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen                                        |
| `check:test-tla-order`            | A `tests/unit` alatt egyetlen `node:test` fájl sem regisztrál tesztet, ér el egy felső szintű `await` kifejezést, majd regisztrál további teszteket (#18045; szigorítási szabály: a `test-tla-order-allowlist.json` fájl csak szűkülhet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Igen                                        |
| `check:agent-skills-sync`         | Az előállított ügynöki készségek műtermékei megegyeznek a forráskatalógusukkal (nincs eltolódás). A felszabadítási mód minden készséget ellenőrzi; a PR (`pr` mód) szolgáltatás csak azokat a képességeket ellenőrzi, amelyek generált szövegét szerkeszti — lásd [Generált fájlok és származtatott alapvonalak](#generated-files-and-derived-baselines-written-at-release)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | A szolgáltatói logókhoz/erőforrásokhoz rögzített eredetinformációs bejegyzés tartozik                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | A JSON-konfigurációs fájlok feldolgozhatók, és megfelelnek a tárház lintelési szabályainak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | Hibamentes TypeScript-fordítás (csak tájékoztató jellegű figyelmeztetések)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Igen                                        |
| `typecheck:noimplicit:core`       | Szigorú `noImplicitAny` — előretekintő; számos, már meglévő hívási helyhez továbbra is típusannotáció szükséges                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Tájékoztató** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | A `tsc` hatóköre a `src/app/(dashboard)/**` (#7033) — a `typecheck:core` válogatott, 27 fájlból álló engedélyezési listája egyetlen dashboard TSX-fájlt sem tartalmaz, és a `next build` sem végez rajta típusellenőrzést (`next.config.mjs` a `ignoreBuildErrors: true` beállítást adja meg), így az árva azonosítókhoz kapcsolódó regressziók (#6625/#6909) láthatatlanok maradtak a CI számára. A különbségeket fájlonkénti/TS-kódonkénti, befagyasztott számú alapértékhez hasonlítja (`config/quality/dashboard-typecheck-baseline.json`, ugyanazzal az elavult-kényszerítési mintával, mint a `check:known-symbols`) — csak az alapértékben szereplő számon felüli ÚJ hibák miatt bukik el az ellenőrzés; a szám az alapértékhez képest a `--update` kapcsolóval csökkenthető, ha egy már meglévő hibát kijavítottak.                                                                                                                                                                                                                    | Igen                                        |
| `check:build-typecheck`           | Az egész alkalmazás gyártási típusának ellenőrzése `tsconfig.build.json` felett (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), a felületi `typecheck:core` 27 fájlból álló engedélyezési listája és a műszerfal kapuja nem terjed ki. Diff ellen `config/quality/build-typecheck-baseline.json`; egy új vagy emelt per(fájl, kód) számláló meghiúsul, alacsonyabb számláló esetén racsni kell. `--update` visszautasítja, ha a futás új vagy emelt párt tartalmaz, kivéve, ha `--force-regressions` átadásra kerül, és visszautasítja az újonnan elnémított fájlt, hacsak nem `--force-nocheck` t, tehát az alapvonal kiszélesítése zöldre váltáshoz és az állandó elnémítás két külön szándékos cselekedet. A csupasz `--force` elutasítva. Szintén ellenőrzi a `@ts-nocheck` összeállítási hatókörét `config/quality/ts-nocheck-baseline.json` ellen, mert az ezt használó fájl egyáltalán nem jelent diagnosztikát, és egyébként láthatatlan lenne minden kapu számára.                                           | Igen                                        |

#### Két típusellenőrző program eltérően válaszol

`typecheck:core` és `check:build-typecheck` különböző opciók mellett különböző programokat fordít le, és ugyanaz a fájl lehet az egyikben tiszta, a másikban hibás.

`tsconfig.build.json` beállítja `"strict": false`, tehát `noImplicitAny` ki van kapcsolva. Az alapkonfiguráció összeállít egy kurált, 27 fájlból álló engedélyezési listát szigorúbb beállításokkal, és követi az egyes bejegyzések importálási grafikonját, így a build programban soha nem megjelenő fájlok továbbra is ott ellenőrzik.

A következmény számít annak megítélésekor, hogy egy fájl be van-e írva:** a nulla diagnosztika `check:build-typecheck` alatt nem jelent nullát** . `@ts-nocheck` eltávolítása 26 fájlból 23-at mutatott tisztanak a build programban; ezek közül tizenhat körülbelül 120 implicit hibát talált a szigorúnál. Ellenőrizze mindkettőt, mielőtt tiszta fájlt hívna.

### Munka: `quality-gate`

`test-coverage` után fut. A blokkok összeolvadnak hiba esetén.

| Forgatókönyv                 | Érvényesíti                                                                                                                                                                     | Blokkolás              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | `quality-metrics.json` bocsát ki (ESLint figyelmeztetések száma, lefedettség az egyesített szilánkos jelentésből)                                                               | Igen (a racsnis előtt) |
| `quality:ratchet`            | `quality-baseline.json` ban minden metrika nem regresszált (ESLint figyelmeztetések ≤ alapvonal; lefedettség ≥ alapvonal)                                                       | Igen                   |
| `check:duplication`          | A kódduplikáció (jscpd@4) nem haladja meg `quality-baseline.json` alapvonalát                                                                                                   | Igen                   |
| `check:complexity`           | A fájlszintű ciklomatikus összetettség nem haladja meg a felső határt (core ESLint `complexity` + `max-lines-per-function`)                                                     | Igen                   |
| `check:cognitive-complexity` | Kognitív komplexitás racsnis (`eslint-plugin-sonarjs`) — külön ESLint pass; CI mindkettő összevonva fut, egyetlen `check:complexity-ratchets` lépésként                         | Igen                   |
| `check:dead-code`            | A fel nem használt exportok / fájlok racsnis (knip) nem lép vissza az alapvonalhoz képest                                                                                       | Igen                   |
| `check:compression-budget`   | A kompressziós referencia-költségvetési — motoronkénti token-megtakarítási szintje nem csökkenhet                                                                               | Igen                   |
| `check:type-coverage`        | A százalékos típusú racsnis (`type-coverage`) nem regresál; nagyrészt magában foglalja `typecheck:noimplicit:core`                                                              | Igen                   |
| `check:codeql-ratchet`       | A nyitott CodeQL riasztások száma nem regresál (olvasás `gh api` keresztül; kecses átugrás token nélkül) — frissítési ütem és kézi trigger: lásd alább a "CodeQL ratchet" részt | Igen                   |
| `check:type-scale-ratchet`   | Kit típus lépték: 12 képpont alatti méretek és `font-bold` `src/` -ben csak csökkennek (`typeScaleSubFloorSizes`, `typeScaleFontBold`); az elköteleződés előtti horogban is     | Igen                   |

### Munka: `quality-extended`

Vegyes feladat, feladatszintű `continue-on-error` nélkül: az a lépés, amely a `--ratchet` kapcsolót adja át, a `quality-baseline.json` fájlhoz képest mért romlás esetén sikertelenné teszi a feladatot.
Csak a `check:circular-deps` és a szkenner telepítési lépése tanácsadó jellegű (lépésszintű `continue-on-error: true`).
A külső szkennerek telepítése `gh release download` használatával történik; a `check:secrets` önmagát kihagyja (0-s kilépési kóddal), ha a gitleaks hiányzik, míg a
`check:vuln-ratchet`, a `check:workflows` és a `check:openapi-breaking` hibával zár, ha a mérés hiányzik.

| Forgatókönyv             | Érvényesíti                                                                                                                                                                                                                                       | Blokkolás                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `check:circular-deps`    | Nincsenek körkörös függőségek (dpdm)                                                                                                                                                                                                              | **Tanácsadó**                                      |
| `check:bundle-size`      | A köteg mérete nem haladja meg a kupakot; a mérhetetlen méret is kudarcot vall                                                                                                                                                                    | **Blokkolás --ratchet-val**                        |
| `check:secrets`          | A titkos szkennelés (gitleaks) — kihagyja, ha bináris nincs jelen                                                                                                                                                                                 | **Blokkolás --ratchet-val**                        |
| `check:vuln-ratchet`     | A függőségi sebezhetőségek (osv-szkenner) nem lépnek vissza — `--ratchet` INCOMPLETE -ként (2-es kilépés) meghiúsul, ha nem mérik                                                                                                                 | **Blokkolás --ratchet-val**                        |
| `check:workflows`        | Munkafolyamat-szösz (actionlint + zizmor); missing/broken szkennerek, érvénytelen jelentések vagy hiányzó racsnis alapvonal INCOMPLETE-ként hibásodik meg. Az érvényes megállapítások követik a kiválasztott strict/advisory/ratchet szabályzatot | Végrehajtás szükséges; zizmor racsnis blokkolás CI |
| `check:openapi-breaking` | Nyilvános API szerződés a rögzített esemény-commit ellen (PR merge-base, push before, merge-group base; scheduled/manual checkout első szülő); a szükséges mérés sikertelen lezárva                                                               | **Blokkolás --ratchet-val**                        |

### Munka: `docs-sync-strict`

Minden PR tól `main` fut. A blokkok összeolvadnak hiba esetén.

| Forgatókönyv                   | Érvényesíti                                                                                                                                                                           | Blokkolás                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `check:docs-all`               | Meta-kapu, amely az alábbi 6 alkaput szekvenciálisan futtatja                                                                                                                         | Igen                              |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI verzió konzisztenciája; engedje el a 66 `llm.txt` tükröket és a lefordított CHANGELOG szakaszokat is (PR mód: a tükrök megegyeznek)                               | Igen                              |
| ↳ `check:docs-counts`          | Számol prózában (szolgáltatók száma, vándorlási szám stb.). Két mód: `pr` PRs szolgáltatáson, `release` máshol — lásd alább a "Származtatott értékek" részt                           | Igen                              |
| ↳ `check:env-doc-sync`         | Minden env var `.env.example` -ban egy dokumentumtáblázatban van dokumentálva, és fordítva                                                                                            | Igen                              |
| ↳ `check:deprecated-versions`  | Nincsenek elavult verziójú karakterláncok a dokumentumokban                                                                                                                           | Igen                              |
| ↳ `check:doc-links`            | A dokumentumok belső leértékelési hivatkozásai valódi fájlokat eredményeznek (`[text]`/`(path)` űrlap)                                                                                | Igen                              |
| ↳ `check:fabricated-docs`      | A dokumentumokban hivatkozott útvonalak, env vars, CLI parancsok, hook nevek és fájl elérési utak léteznek a kódbázisban. Kemény kapu `--strict` keresztül ; soft-fail zászló nélkül. | Igen ( `--strict` n keresztül CI) |
| `check:cli-i18n`               | CLI `t()` billentyűk léteznek `bin/cli/locales/en.json` (mindkét mód); pt-BR / zh-CN / zh-TW paritás `en.json` vel csak feloldási módban                                              | Igen                              |
| `check:openapi-coverage`       | OpenAPI specifikációja a valódi útvonalak legalább egy racsnis padlóját lefedi                                                                                                        | Igen                              |
| `check:openapi-security-tiers` | `openapi.yaml` biztonsági szintjei összhangban vannak `routeGuard.ts` besorolással                                                                                                    | **Tanácsadó**                     |
| `check:openapi-routes`         | `openapi.yaml` -ban minden út valódi `route.ts` (anti-hallucináció) vezet.                                                                                                            | Igen                              |
| `check:docs-symbols`           | `docs/**/*.md` -ben minden `/api/...` hivatkozás valódi `route.ts` (anti-hallucináció) oldódik fel.                                                                                   | Igen                              |
| `i18n translation drift`       | `docs/i18n/**` mirrors vs `.i18n-state.json` — figyelmeztetés PRs (a tükröket a fordítási hullám frissíti), szigorú a push és az éjszakai                                             | **Tanácsadó** PRs                 |

#### A fordítási tükrök származtatott fájlok (PR mód és kiadási mód)

A PR szolgáltatás csak angol nyelvű forrásokat szerkeszt. A `docs/i18n/<locale>/**` tükröket (beleértve a 66 `llm.txt` másolatot és a lefordított `CHANGELOG.md` fájlokat) és `.i18n-state.json` egy lépésben átírja a fordítási hullám (`docs/i18n-*` / `chore/i18n-*` ágak, az ütemezett `i18n-mirror-refresh.yml`) és a kiadás (`npm run release:sync-changelog-i18n`). A tükörkapuk ezért két módban futnak, amelyeket `scripts/check/lib/gateMode.mjs` (`--mode=pr|release`, majd `OMNIROUTE_GATE_MODE`, majd a Műveletek esemény; a helyi futás `release`) old fel:

- `check:docs-sync` — a kiadási mód minden ellenőrzést lefuttat. PR-módban megtartja a package.json/OpenAPI-verziót,
  a gyökér CHANGELOG címsorait és a superseded-docs védelmet, továbbá kiírja a
  `SKIP reason=pr-mode` üzenetet az `llm.txt` tükörmásolataihoz és a lefordított CHANGELOG-szakaszokhoz —
  kivéve, ha a PR tükröket ír: egy olyan head ág, amely a `docs/i18n/**` család írójaként van deklarálva a
  `config/quality/derived-paths/*.json` fájlokban, mindkét ellenőrzést szigorúan lefuttatja, és amikor a diff alapja
  feloldható, egy olyan módosítás, amelynek saját diffje a `docs/i18n/<locale>/llm.txt` vagy a `CHANGELOG.md` fájlt
  szerkeszti, az adott ellenőrzést szigorúan lefuttatja. A diff alapja depth-1 checkout esetén nem oldható fel (a
  `docs-sync-strict` jobban), ezért PR-módban egy olyan, alapot nem igénylő ellenőrzés is lefut: minden
  `llm.txt` tükörnek léteznie kell, meg kell őriznie a `---` elválasztót, és vagy a gyökér törzsét, vagy a legtöbb
  tükörben közös törzset kell tartalmaznia. Ha az alap megváltozott, az összes tükör egyformán elavult marad, és az
  ellenőrzés sikeres; egyetlen tükör kézi szerkesztése hibát okoz. A lefordított `CHANGELOG.md` fájlokhoz nincs ilyen
  ellenőrzés depth-1 PR checkout esetén.

- A pre-commit hook a `check-docs-sync.mjs --mode=pr` parancsot futtatja: egy commitot az alapján ítél meg, amit ténylegesen
  végrehajt. A flag nélkül egy helyi futtatás kiadási módot használna, és egyetlen, a gyökér `llm.txt` fájlt módosító
  összevont PR minden későbbi commitot blokkolna azon az alapon, amíg le nem fut a hullám. Ugyanez a szabály vonatkozik
  minden olyan módérzékeny kapura, amelyet egy Husky hook futtat: a hook átadja a `--mode=pr` flaget, a szigorú
  eredmény pedig a kiadási módú futtatásoknál marad (a kiadási PR-nél, a `main` ágra történő pushoknál és egy egyszerű
  helyi futtatásnál).
- A tükörtartalom-egységtesztek (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`, `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`, `docs/*-locales`) — kiadási mód minden területi beállítást érvényesít. PR mód csak azokat a tükröket érvényesíti, amelyek az angol forrásból aktuálisak `.i18n-state.json` szerint (teljes fájl hash, vagy a szakasz rögzített szakaszának hash a tesztcsapok), és az elavultakat okkal kihagyja. A `target_hash` eredetellenőrzések mindkét módban minden területre lefutnak. A frissesség `## ` szakaszonként értendő, a `run-translation.mjs` egység hash-ek; egy hosszú szakasz (ennek a fájlnak a kapukészlete körülbelül a fele) azt jelenti, hogy a benne lévő bármilyen szerkesztés elavulttá teszi a tükröket, és PR-mód állításaik átugornak a következő hullámig. Egy horgony, amelyet az angol forrás már nem tartalmaz, az egész fájl összehasonlítására esik vissza.
- `i18n translation drift` — figyelmeztetés PRs re, szigorú tolásra, éjszakai és kioldó vágásra, így az elavult tükör nem szállítható kioldóval.

A `scripts/i18n/sync-llm-mirrors.mjs` (amely `syncLlmMirrors()` néven is exportálva van, `--dry-run` támogatással)
újraírja az `llm.txt` tükröket; a kiadási frissítés, a fordítási hullám és az ütemezett
`i18n-mirror-refresh.yml` futtatja (a frissítés dry run használatával észleli az elavult `llm.txt` tükröket, mivel
az eltérésjelentés nem sorolja fel őket, majd szinkronizálja őket a `check:docs-all` előtt).

A `docs/diagrams/` alatti tizenkét README SVG generált fájl
(`scripts/docs/gen-readme-<name>.mjs`; az `npm run docs:readme-diagrams` mindet újragenerálja). Mindegyikhez tartozik
egy bájt-összehasonlító egységteszt (`tests/unit/docs/readme-*-svg.test.ts`, `test-unit` job), amely kiadási módban
hibát jelez, ha a commitolt fájl elavult; PR esetén a `check:generated-artifacts` a PR által módosított SVG-t ítéli meg,
az alap eltérését pedig a kiadási frissítésre hagyja (lásd: [Generált fájlok és a kiadáskor írt származtatott alapvonalak](#generated-files-and-derived-baselines-written-at-release)) — a `check:docs-counts` pedig a kanonikus számokat a
`<text>` csomópontjaikból olvassa ki — ezért a körvonalazási lépés minden körvonalazott karakterláncot láthatatlan
`<text>` elemként tart meg a fájlban. Az SVG-k kanonikus számokat ellenőrző része az
`SVG_DIAGRAM_FILES` listában szereplő fájlokat olvassa (`scripts/check/check-docs-counts-sync.mjs`):
`docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, továbbá `public/images/tier-flow-dark.svg` és `tier-flow-light.svg`; a
free-forever, catalog-entry, recurring-pool és scoring-factors állítások a
`promise-pillars.svg`, `free-tier-budget.svg` és `strategies-grid.svg` fájlokat is olvassák. A generátorok által
megjelenített számok (szolgáltatók száma, MCP-eszközök, routing stratégiák, free-forever szolgáltatók stb.) a
`scripts/docs/readmeFacts.mjs` által a `docs/reference/derived-facts.json` tény-pillanatképből származnak, nem
literálokból, így egy diagram bármely ágon történő újragenerálása reprodukálja a commitolt fájlt.
A `free-tier-budget.svg` ugyanebből a pillanatképből (`code.freeTierBudget`, a tényfeltárás által rögzített
katalógus-összefoglalóból) rajzolja ki a sorait, ezért a `FREE_MODEL_BUDGETS` módosítása a következő frissítéskor
eljut a kártyához, ahelyett hogy pirosra váltaná a CI-t.

### Származtatott értékek: a `pr` és `release` kapumód

A PR szolgáltatás soha nem ír olyan értéket, amely az alapja állapotától függ: a szolgáltatótól, az áttelepítéstől, az MCP-eszköztől és a stratégiai számoktól, a README SVG számoktól, a tények pillanatképétől. Egy lépésben újraszámítja mindegyiket, `npm run release:refresh-derived`, amelyet a kiadás és az éjszakai származtatott-refresh PR futtat. Így** kiadások között az alap az élő kód mögött van** , és egy kapu vagy teszt, amely a fát az élő kóddal hasonlította össze, minden PR en piros lesz, miután egy testvér hozzáadott egy szolgáltatót. A származtatott értékeket megítélő kapuk ezért a két mód egyikében futnak, amelyeket `scripts/check/lib/gateMode.mjs` (az első meccs nyer):

1. `--mode=pr|release` a parancssorban;
2. a `OMNIROUTE_GATE_MODE` környezeti változó (`pr` vagy `release`);
3. automatikus, a GitHub Actions eseményből: egy `pull_request`, amelynek feje nem `release/v*`, egy `merge_group`, vagy egy push to `omni-queue/**` → `pr`; minden más (leküldés, ütemezés, feladás, PR `release/v* → main` kiadás, bármilyen helyi futtatás) → `release`.

Mi `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) hiba az egyes módokban:

| Mód       | Sikertelen                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Kellenek az élő tények |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `release` | Minden ellenőrzés, szigorú egyenlőség a fáról gyűjtött tényekkel szemben (a kapu viselkedése mindig is): az elavult szám, verzió, lefedettségi szint vagy SVG szám egy STRICT sodródás                                                                                                                                                                                                                                                                                       | Igen                   |
| `pr`      | Csak az különbözött a PR alaphoz képest, amit a változtatás ugyanazokkal a követeléskivonatokkal: (1) egy kezelt érték, amely nem létezett az adott csekk és fájl alapjában ("PR szerkesztett egy kezelt számot — visszaállítja a sort az alapszöveghez"); (2) a szükséges követelés, amelyet az alap hordozott és a fej elveszett. A tényeket nem igénylő tartalominvariánsok ugyanúgy futnak, mint a kiadási módban; a csak kibocsátható ellenőrzések listája és kihagyása | Nem                    |

Az ügynök-utasítás fájlok hordozzák** nem** származtatott szám egyáltalán: `AGENTS.md`, `llm.txt` (és `docs/i18n/*/llm.txt` másolatai), a bs `AGENTS.md` fork, `open-sse/services/AGENTS.md`, `src/shared/constants/agentSkills.ts`, `skills/README.md` és minden `skills/*/SKILL.md` a forrásra mutat (például `ROUTING_STRATEGY_VALUES` `src/shared/constants/routingStrategies.ts` ben), és helyette `npm run facts` ra. Az invariáns "Nincs származtatott számlálás (ügynök-utasítás fájl…)" mindkét módban meghiúsítja a számlálást (szolgáltatók, áttelepítések, MCP eszközök és hatókörök, útválasztási stratégiák, pontozási tényezők, módcsomagok), így a kiadás frissítésének soha nem kell átírnia egy utasításfájlt.

`pr` módban a módosítást létrehozó ágak szerkeszthetik a kezelt értékeket: `chore/derived-*`
(az éjszakai frissítési PR), `release/v*`, valamint a fordítási hullámok `docs/i18n-*` és
`chore/i18n-*` (`scripts/check/lib/derivedClaimsDiff.mjs`). A várólista-kötegeket
(`merge_group`, Mergify-piszkozatok, `omni-queue/**`) nem ellenőrizzük újra: olyan PR-okat összesítenek,
amelyeket a kapu már egyenként elbírált.

Kilépési kódok: `0` tiszta · `1` SZIGORÚ eltérés (vagy `--strict` kapcsolóval soft eltérés), illetve kezeltérték-sértés · `2` infrastruktúra — a kód tényadatait nem sikerült összegyűjteni (az tsx-próba sikertelen volt vagy időtúllépés történt; az időkorlátot az `OMNIROUTE_FACTS_TIMEOUT_MS`, alapértelmezés szerint 600000 ms, adja meg), vagy CI-ben nem sikerült feloldani a PR eltérésének alapját. A 2-es kilépési kód soha nem dokumentációs eltérés: futtasd újra a feladatot, vagy javítsd a környezetet.

Hol futnak az egyes módok:

| Ahol                                                                                                                 | Mód                                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Funkció PR — `ci.yml` job `docs-sync-strict`, `quality.yml` step "Dokumentumok pontossága"                           | `pr` (automata); a munka átmegy a bázison `BASE_SHA` ként, és `fetch-depth: 2`-vel jelentkezik ki                                                                                                             |
| `merge_group`, `omni-queue/**` jelöltek, az összevont vonat teljes kapulistája                                       | `pr`                                                                                                                                                                                                          |
| PR (`release/v* → main`) felengedése, tolások, ütemezett és kézi futtatások                                          | `release`                                                                                                                                                                                                     |
| Release-Green (`scripts/quality/validate-release-green.mjs`)                                                         | HARD elemek `OMNIROUTE_GATE_MODE=pr` -vel futnak ("eltört az alap?"); a DRIFT elem `derived-refresh` `npm run release:refresh-derived -- --check` futtatja (szigorú nézet, soha nem nyitja meg az alappirost) |
| Kiadás (`/generate-release` 0a és 1 fázis; a szakszerű vezetékezés a tulajdonos által jóváhagyott külön változtatás) | `npm run release:refresh-derived` írja a származtatott fájlokat; a kiadás PR saját ellenőrzéseket végez, majd `release` módban fut                                                                            |
| `nightly-derived-refresh.yml` (napi, legmagasabb `release/vX.Y.Z`, kihagyás-fagyasztás alatt)                        | `npm run release:refresh-derived -- --profile=nightly`; egy diff-en ONE PR nyitva tartja `chore/derived-refresh` től ; soha nem olvad össze                                                                   |

A mögötte lévő parancsok:

- `npm run facts` minden származtatott számot JSON ként (`scripts/release/facts.mjs`) ír ki. `--key=code.mcpTools` egy értéket ír ki, `--snapshot` a véglegesített pillanatképet olvassa be az élő fa helyett. Lépjen ki 2-ből, ha a tényeket nem lehet összegyűjteni.
- `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) egy lépésben újraszámítja a származtatott fájlokat, ebben a sorrendben ( `--only=` lépésazonosítói): `provider-reference` (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (a pillanatfelvétel), `numbers` (a counts gate átírási terve a dokumentumokra alkalmazva, majd átkerül `docs/i18n/` tükreikbe ( `SKILL.md` generált), `readme-diagrams` `skills` (kihagyva, amíg a fa el nem küldi `syncE2eTimings`), `e2e-timings` (kivágja `en.json` `ui-keys`, és `--rewritten-since=<ref>` — alapértelmezett `origin/main` — esetén újra sorba állítja az angol értékeket, amelyek az utolsó kiadás óta újra vannak írva; az értékeket a környezetben konfigurált háttérprogram ugyanabban a futásban fordítja le, vagy a `.env` motorban csak azokat a kulcsokat olvassa el,`OMNIROUTE_TRANSLATION_*` Google Háttér nélkül soha nem ír `__MISSING__` jelölőket: a kiadási profil meghibásodik, az éjszakai kihagyja a billentyűket, `--allow-untranslated` pedig szándékosan írja ki őket), `llm-mirrors` és `verify-generated` (írás után `check:generated-artifacts` és `check:agent-skills-sync` feloldási módban át kell mennie; `--check` -ben kihagyja, és amikor `--only` kihagyja; a hiba kilépést jelent). A `changelog` lépés az opt-in (`--with-changelog`, csak kiadási profil). `--profile=nightly` soha nem érinti a verziókövetelést. `-- --check` val nem ír semmit, és kilép 1-ből, ha bármely fájl megváltozna, vagy egy kezelt értéket manuálisan kell szerkeszteni (mindkettőt felsorolva); 2. kijárat infrastruktúra-hiba esetén. `--json` az eredményt JSON írja ki.
- `docs/reference/derived-facts.json` az utolsó frissítés során használt tények pillanatképe. Csak a frissítés írja ki. A README SVG generátorok beolvassák, és a PR-time unit tesztek összehasonlítják a véglegesített dokumentumokat és a vele generált fájlokat, míg — soha az élő kóddal. A programcsomag egyetlen élő összehasonlítása az, hogy "a kiadás frissítése lezárja a ciklust" `tests/unit/check-docs-counts-sync.test.ts`-ben: az élő tények mellett a frissítés memóriában alkalmazott átírási terve nem hagy STRICT eltolódást, amelyet nem jelent, és az újratervezés semmit sem változtat.

Helyi reprodukáláshoz (a helyi futtatás alapértelmezés szerint a `release`):

```bash
npm run check:docs-counts                                       # release: strict, live facts
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # what a feature PR is judged on
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # what the release would rewrite
```

Feloldható alap nélkül (nincs `BASE_SHA`/`BASE_REF`, nincs helyi `origin/release/v<version>`) a helyi `pr` futás figyelmeztetést nyomtat, és a hiba helyett kihagyja a diff-et.

### Munka: `i18n-ui-coverage`

| Forgatókönyv                     | Érvényesíti                                                                                                                                                                                                   | Blokkolás                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check-ui-keys-coverage` (soros) | UI i18n kulcslefedettsége a ≥ 65%-a                                                                                                                                                                           | Igen (mindkét mód)         |
| `check:ui-icu`                   | Minden UI katalógus minden üzenete `IntlMessageFormat` vel áll össze                                                                                                                                          | Igen (mindkét mód)         |
| `check-ui-value-drift` (soros)   | Egy átírt angol** érték** nem hagy maga után elavult fordítást                                                                                                                                                | Igen (csak kiadási módban) |
| `check-new-key-coverage` (soros) | A** új** Az angol kulcsot minden — nyelven lefordítják, a `__MISSING__:` jelölőt elutasítják                                                                                                                  | Igen (csak kiadási módban) |
| `check-key-completeness` (soros) | Minden UI katalógus (és `--catalog=cli` esetén minden CLI katalógus) pontosan a `en.json` kulcskészletét tartalmazza; `pr` módban minden katalógusban a PR önmagához képest változott az egyesítési alapnál   | Igen (mindkét mód)         |
| `check-translation-ratio`        | A nyelvi nyelvenkénti valós fordítási arány (az angollal azonos / helyőrző / hiányzó levelek az engedélyezési listán kívül) nem haladhatja meg `config/quality/i18n-translation-baseline.json` + laza értéket | Igen (csak kiadási módban) |

Szüksége van `fetch-depth: 0` —, az érték-sodródási kapu eltér `en.json` től az egyesítési alaphoz képest.

**Két mód (2026-11-13 óta).** Egy funkció-PR kulcsokat ad hozzá vagy ír át az `en.json` fájlban
(és a `bin/cli/locales/en.json` fájlban), és más területi beállításhoz tartozó fájlt nem módosít;
a `check:pr-derived-paths` (a `pr-test-policy` feladat, a
`config/quality/derived-paths/translation.json` családja) meghiúsítja az ezt tevő funkció-PR-t.
A többi területi beállítás egyszer kiadásonként készül el a
`release:refresh-derived` segítségével, amely meghívja a `syncUiKeys()` függvényt a
`scripts/i18n/sync-ui-keys.mjs` fájlban (hiányzó kulcsok hozzáadása, elhagyott kulcsok törlése,
az átírt angol szövegek fordításainak megjelölése a `rewrittenSinceRef` használatával, fordítás),
vagy egy fordítási hullám részeként. A kapuk a módot a `scripts/check/lib/gateMode.mjs` fájlból
olvassák: `pr` módban (funkció-PR-ek, `merge_group`, `omni-queue/**`) a fenti release-módú kapuk
`SKIP reason=pr-mode` üzenetet írnak ki, és 0-s kóddal lépnek ki; `release` módban (a kiadási PR,
a `main` ágra irányuló pushok, `workflow_dispatch`, helyi futtatások) ugyanolyan szigorúak, mint
korábban, a kiadási PR-en pedig a különbségérzékeny kapuk `BASE_REF=origin/main` értéket kapnak,
így minden, a ciklus által hozzáadott vagy átírt kulcsot elbírálnak. A funkció-PR helyi eredményét a
`--mode=pr` használatával tekintheted meg.

Egy olyan PR, amely `pr` módban továbbra is módosítja a locale-katalógusokat (fordítási hullám, kiadási frissítés, csak fordítást érintő javítás), nincs kihagyva: a `check-key-completeness` minden módosított katalógust összevet ugyanazzal a katalógussal a merge base-nél (`scripts/i18n/lib/touched-catalogs.mjs`), és hibát jelez, ha a katalógusból hiányzik egy kulcs, ha az `en.json` nem tartalmaz egy kulcsot, ha egy valódi fordítás `__MISSING__:` jelölővé vagy az angol szöveggé vált, illetve ha egy érték már nem interpolálja egy olyan angol szöveg helyőrzőit/címkéit, amelyet a PR nem módosított. A PR-ban újonnan megjelenő katalógusnak az `en.json` teljes kulcskészletét tartalmaznia kell. Ez lefedi a PR által érintett katalógusok esetében azt, amit az arány- és CLI-paritási kapuk látnának.

A területi paritásos egységtesztek (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) ugyanazokat a módokat követik `tests/_helpers/localeParityMode.ts` keresztül: `pr` módban kihagyják a kulcsparitási állításokat, és a kiadásra hagyják azon kulcsok helyőrző paritásának frissítését, amelyek angol nyelve megváltozott az összevonási alap óta (minden kulcs, amikor az egységtesztelési feladatnak el kell olvasnia). Ez a segítő a** csak** szankcionált mód-feltételes kihagyás: `check:test-masking` számolja `.skip(` és `{ skip: true }`, de nem a számított `{ skip: "<reason>" }`, amelyet visszaad, tehát `tests/unit/locale-parity-mode.test.ts` rögzíti a használatára engedélyezett tesztek listáját. — hozzáadása egy felülvizsgált szerkesztés a listán.

#### `check-ui-value-drift` — elavult fordítási kapu

Elkapja azt az i18n regressziót, amelyet a többi kapu szerkezetileg nem lát: egy angol érték átírásra kerül, és az _korábbi_ angolból származó fordítások hátramaradnak, így a nem angol felhasználók továbbra is magabiztosan megfogalmazott, most hibás példányt olvasnak.

Ezt valóban szállították. `oauthModal.googleOAuthWarning` átírásra került, amikor az Antigravity login helper leszállt (#5203);** 39/43 terület** folytonos szöveg, amely azt mondta az operátoroknak, hogy "másolják ki a teljes URL és illessze be alább" — egy folyamatot, amely nem fejezhető be az adott szolgáltató számára. #8463 ig észrevétlen maradt, mert:

- a `sync-ui-keys` csak a **hiányzó** kulcsokat tölti vissza, az **elavultakat** soha;

- `check-ui-keys-coverage` a kulcs _jelenlétet_ számítja, így az elavult fordítás lefedettnek minősül;

- a `check-translation-drift` a `docs/i18n/<locale>/**.md` dokumentációs tükröket követi — a `src/i18n/messages/*.json` fájlokat soha nem olvassa. A `docs-sync-strict` feladatban fut: PR-ok esetében tájékoztató jellegű, push és éjszakai futtatás esetén szigorú; a fordítási hullám frissíti a tükröket, nem pedig a funkciót bevezető PR.

**A különbségeket figyeli, nem egy alapállapothoz viszonyít.** A merge base-nél lévő `en.json` fájlt hasonlítja össze a munkafával; minden olyan kulcs esetében, amelynek az angol értéke megváltozott, minden olyan locale fordítása elavultnak számít, amelyet nem érintett a módosítás. Ez szándékosan **befagyasztja a korábbról örökölt tartozást** — egy diffből nem deríthető ki, hogy egy régóta fennálló fordítás melyik régi angol szövegből származott, ezért a kapu csak az aktuális módosítás által érintett részt értékeli. Az alternatíva (kulcsonkénti hash-alapú baseline) egy körülbelül 600 KB-os generált fájlt igényelne, amely háromszor nagyobb a jelenlegi legnagyobb baseline-nál, és minden i18n PR során változna.

Kétféleképpen lehet kielégíteni:

1. frissítse az érintett fordításokat, vagy

2. állítsd őket `__MISSING__:<new english>` értékre — a futtatókörnyezet ezután a javított angol szöveget szolgálja ki (`src/i18n/request.ts::deepMergeFallback`, #7258), a kulcs pedig fordításra váróként kerül a sorba.

Ha a húr** jelentése** megváltozott, inkább** a kulcs átnevezése** : egy új kulcs nem örökölheti az elavult fordítást. Ez a #8463 minta.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Kilép a 0- `SKIP reason=base-unresolved` val, ha az alapkatalógus nem olvasható (sekély klón az alap ref nélkül), tükrözve `check-openapi-breaking`. Csak kiadási mód: a PR funkció átírja az angolt, és ott megáll; a kiadás frissítése megjelöli a hátrahagyott fordításokat (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, ugyanaz `findStaleTranslations`).

### Munka: `i18n`

Teljes i18n érvényesítési mátrix (helyszínenként egy feladat). Az egész munkakör tanácsadó jellegű.

| Forgatókönyv                    | Érvényesíti                                        | Blokkolás                                                  |
| ------------------------------- | -------------------------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | A fordítás teljessége területi beállítások szerint | **Tanácsadó** (`continue-on-error: true` az egész munkára) |

### Munka: `pr-test-policy`

Csak lekérésre fut.

| Forgatókönyv           | Érvényesíti                                                                                                                                                          | Blokkolás |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PRs, amely megváltoztatja a gyártási kódot `src/`, `open-sse/`, `electron/` vagy `bin/` -ben, teszteket kell tartalmaznia vagy frissítenie kell ( #8 kemény szabály) | Igen      |
| `check:test-masking`   | A módosított tesztfájlok nem csökkentik a nettó állítások számát, és nem adnak hozzá `assert.ok(true)` tautológiákat                                                 | Igen      |
| `check:pr-evidence`    | PR body a változásra utaló test/VPS bizonyítékot idéz (mechanizálja a Hard Rule #18 PR prózai — fragile gréppelésével, lásd a hátralékot)                            | Igen      |

### Munka: `test-vitest`

`build` után fut. A blokkok összeolvadnak hiba esetén.

| Kíséret          | Érvényesíti                                                      | Blokkolás                                                                                                           |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP szerver (110 eszköz), autoCombo, gyorsítótár — vitest runner | Igen                                                                                                                |
| `test:vitest:ui` | UI komponens teszteli — vitest runnert                           | **Blokkolás** — a már meglévő hibákat kifejezetten kizárja `vitest.config.ts`; az új kudarcok tönkreteszik a munkát |

### Éjszakai munkafolyamatok (ütemezett, tanácsadó)

Ezek cron ütemezés szerint futnak (és `workflow_dispatch`), soha nem PRs-n. Mindegyik tanácsadó jellegű.

| Munkafolyamat          | Érvényesíti                                                                                                                                                             | Blokkolás     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `nightly-property`     | gyorsellenőrzési tulajdonságtesztek véletlenszerű vetőmag + magas futási számmal                                                                                        | **Tanácsadó** |
| `nightly-resilience`   | halom-növekedés kapuja, káoszhiba-injekció, k6 load/soak                                                                                                                | **Tanácsadó** |
| `nightly-llm-security` | promptfoo befecskendezési védő (blokk üzemmód) + garak szondák (szolgáltatói titok nélkül átugorva)                                                                     | **Tanácsadó** |
| `nightly-schemathesis` | OpenAPI szerződés-fuzzing (sématézis) egy élő OmniRoute vel szemben `docs/openapi.yaml` — felületek specifikációi megsértésével / kezeletlen 500-asok (8 B.4-es verzió) | **Tanácsadó** |
| `nightly-mutation`     | Stryker mutációtesztelési pontszáma a gyors egységsávon — túlélő mutánsok felszínén gyenge állítások                                                                    | **Tanácsadó** |
| `nightly-compat`       | Csomópont-motor kompatibilitási mátrix a támogatott `engines.node` tartományokban                                                                                       | **Tanácsadó** |

A teljesítmény alapvonalait (kupac, TTFB, felépítési idő) rögzíti, nem kapuzott: lásd [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Sebességi fázis (2026-08-30 → v4.0 LTS): minden alapérték 20%-kal lazítva

Tulajdonosi döntés (2026-08-30): a v4.0 modularizálásáig a szállítási sebesség fontosabb
az adósságszint tartásánál. Minden **numerikus** ratchet-alapértéket egyetlen,
auditálható lépésben 20%-kal lazítottunk, a fázist pedig a
`config/quality/quality-baseline.json` fájl deklarálja:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Mi változott                                                                                                                                                                                                                                                        | Hol                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — az alacsonyabb érték a jobb típusú számok ×1.2, a magasabb érték a jobb típusú százalékok ÷1.2 (a 60-as lefedettségi alsó korlát megmaradt, az `eslintErrors` továbbra is 0, az `eslintWarnings` pedig a befagyasztott elnyomásszám 20%-a lett) | `quality-baseline.json` (az `_relax_velocity_2026_08_30` megjegyzés minden előtte → utána értéket felsorol) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                                    | `complexity-baseline.json`, `duplication-baseline.json`                                                     |
| `cap`, `testCap`, valamint minden `frozen[*]` / `testFrozen[*]` sorlimit ×1.2                                                                                                                                                                                       | `file-size-baseline.json`                                                                                   |
| Fájlonkénti / TS-kódonkénti számok ×1.2                                                                                                                                                                                                                             | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`      |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                                 | `scripts/check/check-openapi-coverage.mjs`                                                                  |
| A `--require-tighten` tanácsadó jellegűvé válik, amikor az `_policy.requireTighten === false`                                                                                                                                                                       | `scripts/quality/check-quality-ratchet.mjs`                                                                 |
| Az éjszakai `bank-ratchet-shrinks` szünetel (a mért csökkenést bankolná, és megszüntetné a rendelkezésre álló tartalékot)                                                                                                                                           | `.github/workflows/nightly-release-green.yml`                                                               |

Az engedélyezési listák (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nem** költségkeretek, és nem módosítottuk őket. A sikeres/sikertelen szabályzat kapui (titkok, SQL-szabályok,
dokumentációs/környezeti szerződés, i18n-paritás, egységtesztek) változatlanok — egy sikertelen teszt továbbra is sikertelen teszt.

**Eszközök**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — az
  egyszeri lazítás (`scripts/quality/relax-baselines.mjs`); azonos megjegyzéssel másodszor nem futtatható.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  minden numerikus kaput a CI működésével megegyezően mér, és kapunként kiírja a fennmaradó tartalékot
  (`scripts/quality/baseline-headroom.mjs`). Az éjszakai `baseline-headroom` feladat közzéteszi
  a táblázatot a munkafolyamat futásának összefoglalójában, JSON/Markdown jelentését pedig
  `baseline-headroom-<run_id>` néven feltölti, 90 napos megőrzéssel. A figyelmeztető és kritikus sorok
  azokat a kapukat jelölik, amelyek a korlátjuk 10%-án belül vannak, vagy már túllépték azt. Tekintse át
  ezeket a jelentéseket a költségkeretek felhasználására vonatkozó korai figyelmeztetésként; vizsgálja meg
  a problémás kapu `_rebaseline_*` megjegyzéseit. A feladat többé nem hoz létre és nem frissít állandó
  issue-t; a #12149 megőrzi a korábbi jelentések előzményeit.

**Új kód mód (Clean-as-You-Code) — 2026-08-30 óta, csak PR-gyorsútvonalon**

`pull_request` események esetén a `quality.yml` átadja a `--base-ref <PR base SHA>` paramétert a
`check:file-size`, `check:complexity-ratchets` és `check:dead-code` számára. A `check:complexity-ratchets` és
a `check:dead-code` esetében a kapu a HEAD állapotát a merge-base állapottal hasonlítja össze, **a PR által
érintett fájlokra korlátozva** (`scripts/check/newCodeMode.mjs`: a merge-base egy eldobható
`git worktree` könyvtárban materializálódik, az ESLint/knip ott és a HEAD-en is lefut, majd a fájlonkénti
számokat összeveti):

- **blokkoló** — a PR ciklomatikus/kognitív szabálysértéseket vagy halott exportokat adott hozzá az általa módosított fájlokban
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` a naplóban);
- **tanácsadó** — a globális összesítés a befagyasztott alapértékhez képest. Az örökölt eltérés soha nem tesz pirossá
  egy vétlen PR-t; az eltérést a kiadási egyeztetés során újra befagyasztjuk, és a headroom-feladat figyeli.

A `check:file-size` a saját szabályai szerint használja az alaprefet (`scripts/check/check-file-size.mjs`, #8522):
a fában minden forrás- és tesztfájlt ellenőriz, mindegyik sorainak számát a PR alapállapotánál a
`git show` paranccsal olvassa ki, és csak akkor jelez hibát egy fájlnál, ha az a nagyobbik értéket meghaladóan
nő: az alapérték szerinti felső korlátját (`frozen` / `testFrozen`, illetve `cap` / `testCap` az alapértékben
nem szereplő fájl esetén), valamint az alapállapot szerinti méretét. Ezért egy olyan fájl, amely az alapállapotban
már eltért, soha nem tesz pirossá egy vétlen PR-t.

`check:boundary:ratchet` ugyanazt a szabályt alkalmazza az egyetlen számra is
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR-események esetén mind a
`quality.yml` gyorskapui, mind a `ci.yml` lintfeladata átadja a PR alap SHA-ját, az alap
commit mérése egy `git archive` exportból történik, és a PR csak akkor bukik el, ha az
`open-sse → src` élszám meghaladja a `metrics.boundaryOpenSseToSrc` és az alapon mért érték
közül a nagyobbat. A felső korlát feletti alapeltérés jelentve lesz (`base drift herdado`),
de egy ártatlan PR-t soha nem jelöl hibásnak; a push → main megtartja az abszolút korlátot,
a feloldhatatlan alap SHA pedig figyelmeztetéssel erre áll vissza.

Egy omni-queue-jelölt (egy push az `omni-queue/**` ágra, lásd:
[OMNI_QUEUE.md](../ops/OMNI_QUEUE.md)) ugyanilyen elbírálásban részesül, mint egy pull request:
mindkét munkafolyamat átadja a jelölt alapját (`needs.changes.outputs.candidateBase`)
`--base-ref` értékként, és a `check:ts7-diagnostics-ratchet` is ezen fut le. A két új kódot
ellenőrző kapu esetén az összehasonlítás alapja maga ez az SHA, nem pedig a legfelső merge
commit első szülője, így a köteg minden pull requestje elbírálásra kerül.

A `workflow_dispatch` futtatásai, a release-green ellenőrzés és az éjszakai headroom-feladat
nem rendelkezik PR-alappal, ezért megtartják az abszolút (globális) összehasonlítást. A
lefedettség, a duplikáció és a típuslefedettség egyelőre globális marad (eszközeik nem
állítanak elő olcsón fájlonkénti diffet) — ezek lehetnek a következő, ugyanilyen kezelésre
jelöltek.

**A fázis lezárása v4.0-nál (az LTS = szigorúbb a korábbinál, nem „vissza a normálishoz”)**

1. A tiszta `release/v4.0.0` csúcson: a rekord kedvéért futtasd a
   `npm run quality:headroom --json` parancsot, majd a
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` parancsokat, valamint
   minden típusellenőrzési kapu `--update` opcióját — minden alapérték a mért értékre csökken.
2. Töröld a `_policy` elemet a `quality-baseline.json` fájlból (ezzel újra aktiválódik a
   `--require-tighten` és az éjszakai bankolás), majd állítsd vissza a
   `THRESHOLD = 36` értéket (vagy magasabbra) a `check-openapi-coverage.mjs` fájlban.
3. A modularizálás eredményeinek megfelelően szigoríts a mért értékeken túl is: a fájlméret
   `cap` értéke ismét legyen 1000 (vagy 800), a lefedettségi minimumok nőjenek +5-tel, a
   modularizált csomagok esetében pedig a holt exportok száma legyen 0.

## Ratchet-alapvonal (`quality-baseline.json`)

A ratchetmotor (`scripts/quality/check-quality-ratchet.mjs`) beolvassa a `quality-baseline.json` fájlt,
és összehasonlítja a frissen összegyűjtött `quality-metrics.json` fájllal. Minden olyan metrika, amely az epszilonon
túl romlik, meghiúsítja a buildet.

Jelenleg követett metrikák:

| Metrika               | Irány  | Jelentés                                      |
| --------------------- | ------ | --------------------------------------------- |
| `eslintWarnings`      | `down` | Az ESLint figyelmeztetéseinek száma nem nőhet |
| `coverage.statements` | `up`   | Az utasításlefedettség nem csökkenhet         |
| `coverage.lines`      | `up`   | A sorlefedettség nem csökkenhet               |
| `coverage.functions`  | `up`   | A függvénylefedettség nem csökkenhet          |
| `coverage.branches`   | `up`   | Az elágazáslefedettség nem csökkenhet         |

Az alapvonal frissítése valódi javulás után:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

A `--update` jelző az aktuálisan mért értékeket a `quality-baseline.json` fájlba írja.
Egy javulás rögzítése kiadási/éjszakai feladat, nem egy funkciót érintő PR feladata: a `--require-tighten`
(6A.5. fázis) csak kiadási módban jelez hibát a nem rögzített javulás miatt (push, ütemezés, a kiadási PR,
helyi futtatások). Egy funkciót érintő PR-ben (`pr` kapumódban) információként jeleníti meg a javulást, és
sikeresen lefut; a regresszió mindkét módban hibát jelez. A sebességfokozási szakaszban mindenhol csak tájékoztató jellegű
(`_policy.requireTighten: false`). Lásd:
[Generált fájlok és származtatott alapvonalak](#generated-files-and-derived-baselines-written-at-release).

### CodeQL-ratchet: frissítési gyakoriság és manuális trigger

A `check:codeql-ratchet` **ütemezés szerint frissített repóállapotot olvas — nem PR-enként.**
A `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` a következőt jelenti:
`state: configured`, `schedule: weekly`: ez a GitHub alapértelmezett beállítású vizsgálata, nem pushonkénti
elemzés. Következmény: miután egy, a riasztásokat **JAVÍTÓ** PR egyesül, a ratchet a következő ütemezett vizsgálatig továbbra is
a régi, magasabb számot olvassa — így minden nyitott PR-ben regressziót jelez, beleértve a javító PR saját utókövetéseit is, amíg a
vizsgálat utol nem éri a változásokat.

**Manuális frissítés**: a `gh workflow run codeql.yml --ref release/vX.Y.Z` újrafuttatja az
elemzést, és perceken belül újra közzéteszi a riasztásokat. Először olvasd el a `.github/workflows/codeql.yml` fájlt —
a fejlécében szerepel, hogy az csak `workflow_dispatch` módon fut, **mert ütközik a GitHub „default setup” beállításával**
(`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`). A `push`/`pull_request`/
`schedule` triggerek visszaállításához először **tulajdonosi művelet szükséges**: Settings → Code security →
CodeQL: Default → Advanced. Ne adj hozzá `schedule:` triggert ennek a kapcsolónak a beállítása nélkül — ez csak hibás futásokat eredményez.

**Szigorítsd az alapvonalat, miután a szám csökkent** — a `node scripts/check/check-codeql-ratchet.mjs
--update` az új mért számot a `quality-baseline.json` →
`metrics.codeqlAlerts.value` mezőjébe írja, így a ratchet nem engedi csendben visszanőni a regressziót
a régi felső határig. Működő példa (2026-09-02/03): a #12502 PR 7 valódi riasztást javított
(13 → 6 mért nyitott riasztás); a #12530 PR a befagyasztott alapvonalat 11 → 6 értékre szigorította, hogy megfeleljen;
a fennmaradó 6 riasztást ezután riasztásonkénti indoklással 0 nyitott riasztásra utasították el.

**Az elutasításokról az üzemeltető dönt (Hard Rule #14)** — soha ne utasíts el CodeQL-riasztást
anélkül, hogy az elutasítási megjegyzésben rögzítenéd a technikai indoklást: `won't fix` upstream-protokollkövetelmény esetén,
`used in tests` tesztelési fixture esetén, `false positive` pedig olyan szanitizáló esetén, amelyet a CodeQL nem képes észlelni
(irányadó példa: `docs/security/ERROR_SANITIZATION.md`).

---

## Teszt-újrapróbálkozási szabályzat (WS5.4, v3.8.49)

Az újrapróbálkozás futtatónként történik, soha nem globálisan — az általános újrapróbálkozás a valódi regressziókat
láthatatlan, időszakos hibákká alakítja:

| Futtató          | Szabályzat                                                                                                                                                          | Indok                                                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` csak CI-ben, `trace: on-first-retry` beállítással                                                                                                      | A böngésző és a hálózat időzítése valóban nem determinisztikus; egyetlen, nyomkövetéssel végzett újrapróbálkozás diagnosztizálható műtermékké alakítja az időszakos hibát |
| Vitest           | NINCS globális újrapróbálkozás. Egy bizonyítottan időszakosan hibás teszt explicit, tesztszintű újrapróbálkozást kap (látható a diffben, felülvizsgálandó a PR-ben) | A karanténlistát a repóban tartja, soha nem átláthatatlanul                                                                                                               |
| node:test (unit) | SOHA nincs újrapróbálkozás                                                                                                                                          | Az időszakosan hibás egységteszt a teszt hibája — javítsd ki, ne futtasd újra szerencsepróbaként                                                                          |

Cél-SLO-k az időszakos hibák telemetriájának elkészülte után (WS5.2/5.3): tesztenként <1%-os időszakos hibaarány
(„azonnal javítandó” küszöb), folyamatonként ≥95%-os sikerességi arány. Iparági referenciaértékek —
a saját méréseink alapján újrakalibrálandók.

## Kiadásszintű racsni-eltérés (WS5.5, v3.8.49)

Amikor egy racsni (fájlméret, komplexitás, eslint-figyelmeztetések) visszalépést mutat a TISZTA kiadási
csúcson — vagyis az összeolvasztások KOMBINÁCIÓJA okozta a visszalépést, és azt egyetlen PR sem reprodukálja
a saját ágán —, a javítás **egyszeri alkalommal, a kiadási ágon a kiadásfelelős feladata**: előnyben részesítendő a kiemelés/refaktorálás; új alapérték csak dokumentált
indoklási bejegyzéssel állítható be. A kombinációs eltérést soha ne hárítsd egy közreműködő PR-jére, és soha ne
állíts be új alapértéket PR-enként (ez elrejti a valódi regressziókat). Először különítsd el az okot: reprodukáld a
hibát a tiszta csúcson egy vizsgálati worktree-ben, mielőtt azt feltételeznéd, hogy a te PR-ed okozta.

## Generált fájlok és származtatott alapvonalak (kiadáskor írva)

Terv 2026-11-13 ("a származtatott számok és szövegek csak a kiadáskor oldódnak meg"): a PR funkció megváltoztatja a** forrás** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, a készségkatalógus, a szabadszintű katalógus, egy új e2e specifikáció. Nem generálja újra az ebből a forrásból számított fájlokat, és nem rögzít mért javulást alapállapotba. Ezeket a fájlokat egyszer újraírja, a kiadási frissítéssel (`release:refresh-derived`) vagy az éjszakai frissítéssel PR. Ezt megelőzően minden testvér PR hordozta a saját újragenerált másolatát, és ütközött a következő egyesítéssel (2026-11-13: 30/321 nyílt PRs átírta `PROVIDER_REFERENCE.md`, 26-28 átírta a README diagramokat).

**Az őr.** `check:pr-derived-paths` (job `pr-test-policy`) nem működik a PR szolgáltatásban, amely egy család fájlját érinti `config/quality/derived-paths/` ben:

| Család      | Fájlok                                                                                                                                                                                       | Átírta                                                                                                                    |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; a tizenkét generált README SVGs; `skills/*/references/**`; a `SKILL.md` fájlok, amelyeknek nincs egyéni blokkja | `release:refresh-derived` (tények), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                                            | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                      |

Writers (`release/v*`, `chore/derived-*`, and `chore/bank-ratchet-*` for baselines) are exempt; so is a PR that changes only one family plus its companions (for `generated`: the generator scripts, their tests, the agent-skill inputs — `src/shared/constants/agentSkills.ts`, the hand-written `skills/**` docs, `docs/openapi.yaml` — and `changelog.d/**`), e.g. a hero layout change with its regenerated SVG, or a skills fix whose test reads the regenerated `SKILL.md` files. A `SKILL.md` with a hand-written `<!-- skill:custom-start -->` block is not in the family: its custom block stays editable next to a feature.

Az árva takarítást sem ítélik meg a családok: a PR törölheti `docs/i18n/<locale>/<doc>`, amikor az egyesítési bázisban volt ez a tükör, és `<doc>` már nem létezik a PR fejében, és szerkesztheti `.i18n-state.json`, hogy eldobja az ilyen dokumentumokat `sources` ből. Az őr felsorolja ezeket a fájlokat `orphan-cleanup` alatt. A még létező dokumentum tükrének törlése szabálysértés marad: nincs más csővezeték, amely kimondja, és a `llm.txt` és `CHANGELOG.md` tükröknek saját írójuk van.

**Az ellenőrzések, kapunkénti módban** (`scripts/check/lib/gateMode.mjs`; segítő `scripts/check/lib/derivedArtifactScope.mjs`):

| Ellenőrzés                                                                            | `release` (push, ütemezés, PR kiadás, helyi)                                                | `pr` ( PR funkció, sorköteg)                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                             | minden készségnek meg kell egyeznie a generátor teljesítményével                            | csak azok a készségek, amelyek által generált szöveget (az egyéni blokkon kívül) vagy a `references/` a PR szerkeszti; egyébként `SKIP reason=pr-mode`                                                                     |
| `check:generated-artifacts` (README SVGs + e2e időzítések; teljes előzmény szükséges) | minden SVG egyenlő a generátorával; minden specifikációhoz tartozik egy időzítési bejegyzés | csak a PR által szerkesztett tárgyak; a többi `SKIP reason=pr-mode`; nincs különbség alap → minden műtermék értékelve (hiba zárva)                                                                                         |
| README SVG bájt-összehasonlítási tesztek (`tests/unit/docs/readme-*-svg.test.ts`)     | minden SVG                                                                                  | csak egy SVG a PR szerkeszt, amikor az alap feloldja; `test-unit` sekély PR pénztárának nincs alapja, így ott a teszt kihagyja `SKIP reason=base-unresolved` és `check:generated-artifacts` birtokolja az összehasonlítást |
| e2e időzítések teljessége (`tests/unit/balance-e2e-shards.test.ts`)                   | minden specifikációhoz tartozik egy bejegyzés                                               | ugyanaz a szabály, mint a SVG teszteknél (új specifikáció fut a medián súllyal)                                                                                                                                            |
| `check-quality-ratchet.mjs --require-tighten`                                         | a bank nélküli fejlesztés sikertelen (kivéve, ha `_policy`)                                 | jelentett javulás, soha nem volt hiba; a regresszió még mindig nem sikerül                                                                                                                                                 |

A release mód megtartja az ellenőrzések felosztás előtti verdictjeit, kilépési kódjait és üzeneteit; legfeljebb
egy sor kerül hozzá, amely megnevezi a feloldott módot (`[agent-skills-sync] mode=release (auto: local run)`).
A tesztek a node:test `{ skip: releaseOnlyUnlessTouched(...) }` beállításán keresztül maradnak ki, amelyet
a `check:test-masking` csak jelentésként felsorolt blokkban jelenít meg (ez sem `.skip(`, sem `{ skip: true }`, ezért
nem számít kényszerített kihagyásnak). A `check:generated-artifacts` ott fut, ahol az alap feloldható: a
`lint` feladatban (`fetch-depth: 0`), közvetlenül a `check:agent-skills-sync` után. Helyileg a
`npm run check:generated-artifacts -- --mode=pr` megmutatja, mit ellenőriz ez a lépés egy PR esetén. A `check:docs-counts`
„Provider reference total (doc vs live modules)” ellenőrzése a számlálási kapu része, és ennek a kapunak a saját módjait követi.

Szándékosan nem tartoznak családhoz: az emberek által meghatározott szabályzatfájlok (`gate-manifest.json`, az engedélyezési listák,
`admission-policy.json`, `provider-assets-provenance.jsonl`, `model-lifecycle.json`), valamint azok a korlátok, amelyeket egy
feature PR-nek a kóddal együtt kellhet módosítania (`quality-baseline.json` metrikabejegyzései, a
typecheck/fájlméret/komplexitás alapértékei, `eslint-suppressions.json` — ezeket a pre-commit
ESLint-futtatás megtisztítja, amikor egy PR kijavít egy rögzített szabálysértést). Az
`src/i18n/routeNamespaces.generated.json` szintén generált, de a feature PR-ekben marad: az alkalmazás futásidőben importálja,
ezért nem várhat egy frissítésig.

## A racsnik csökkenéseinek elkönyvelése — a lefelé mutató irány (#8584)

A racsni csak félig automatikus, ráadásul éppen a rossz fele az. Egy felső korlát **emelése** kézi
JSON-szerkesztés, amely tíz másodpercet vesz igénybe, és ez a leggyorsabb módja egy hibás PR blokkolásának feloldására.
Egy korlát **csökkentéséhez** valakinek futtatnia kell a `--update` kapcsolót, és commitolnia kell az eredményt — a
`bank-ratchet-shrinks` feladat bevezetéséig pedig ezt egyetlen munkafolyamat sem futtatta. A mért következmény
(2026-07-25): 18 befagyasztott fájl már elérte vagy alulmúlta az új fájlokra vonatkozó 800 soros korlátot, a legrosszabb
132-szeres eltéréssel (`src/shared/validation/schemas.ts`, 19 sorhoz 2,523-as korlát tartozik); a
komplexitási plafon `1794 → 2169` értékre nőtt ~37 új alapértékről szóló megjegyzés során, pontosan egyetlen
csökkenéssel (−1); a „szigorítás `--update` használatával a következő ciklusban” szöveget pedig 31-szer írták le, és
egyszer tartották be. Egy korlát, amely túléli az azt indokolttá tevő kódot, észrevétlenül növekedési keretté alakít
minden befejezett felbontást annak számára, aki legközelebb szerkeszti a fájlt.

A `nightly-release-green.yml` → **`bank-ratchet-shrinks`** feladat lezárja ezt a hurkot:

|            |                                                                                                                        |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| Futás      | `schedule` (naponta 3×) + `workflow_dispatch` — szándékosan **nem** `push`                                             |
| Mérés      | a legmagasabb `release/vX.Y.Z`, ugyanazzal a feloldási + injektálási védelemmel, mint a `release-green`                |
| Írás       | `check:file-size --update` és `check:complexity-ratchets --update` (felépítésükből adódóan mindkettő csak csökkenthet) |
| Ellenőrzés | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                               |
| Szállítás  | egyetlen, mindig naprakész PR a kiadási ágra — kényszerítetten frissítve, kéretlen PR-ek halmozása nélkül              |

Az elkönyvelés kötegelve, nem pedig minden push alkalmával történik, mert nincs késleltetési követelménye (a 8 órán
belül elkönyvelt csökkenés megfelelő), míg egy összeolvasztásonkénti futtatás az összeolvasztási kampányok során
ismételten újraépítené a PR-ágat, és minden alkalommal egy teljes ESLint-vizsgálat költségével járna. Az észlelés továbbra is
push esetén történik (`release-green`); csak az elkönyvelés kötegelt.

### A biztonsági ellenőrző

A feladat felügyelet nélkül írja az alapértékeket, ezért a `verify-ratchet-bank.mjs` teszi ezt
elfogadhatóvá. Összehasonlítja a `--update` utáni fát a `HEAD` állapotával, és **még bármilyen commit létrejötte
előtt megszakítja a feladatot** — így nem nyit PR-t —, hacsak nem minden módosítás az alábbiak egyike:

- egy `frozen` / `testFrozen` numerikus bejegyzés **csökkentése** vagy **eltávolítása**
- `complexity-baseline.json` → `count` **csökkentése**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **csökkentése**

Minden más hibát eredményez: egy szám növelése, bejegyzés hozzáadása, a `cap`/`testCap` módosítása vagy
egy `_rebaseline_*` megjegyzés törlése/átírása (ezek a megjegyzések képezik az egyes plafonok indoklásának
auditnaplóját, és ugyanabban a `frozen` objektumban találhatók, mint a fájlbejegyzések).
Egy korlát emelésére képes bot egyértelműen rosszabb lenne a jelenlegi helyzetnél. Regresszióvédelmi teszt:
`tests/unit/verify-ratchet-bank.test.ts`.

A feladat soha nem végez push műveletet a `release/*` ágakra — a PR-t ember olvasztja össze, így egy hibás mérés
nem kerülhet be felülvizsgálat nélkül.

## Engedélyezési lista szabályzata

Minden olyan ellenőrzés, amely meglévő szabálysértések miatt nem tud meghiúsulni, rögzített engedélyezési listát használ
(például: `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). A szabályzat:

**Javítsd a gyökérokot; az engedélyezési listát csak akkor használd, ha a szabálysértés már korábban is fennállt, és
ugyanabban a PR-ban nem javítható.**

Amikor bejegyzést adsz hozzá egy engedélyezési listához:

1. Adj hozzá egy, az indoklást tartalmazó megjegyzést.
2. Hivatkozz a követést végző issue-ra (például: `// #3498 — Phase 2 feature, not yet implemented`).
3. Távolítsd el a bejegyzést ugyanabban a PR-ban, amelyben kijavítod a szabálysértést — egy elavult bejegyzés, amely már nem
   tilt le aktív szabálysértést, önmagában is hiba (a 6A.3 stale-enforcement a megvalósítása után egy árva engedélyezésilista-bejegyzés
   miatt meghiúsítja az ellenőrzést).

**Ne adj hozzá engedélyezésilista-bejegyzéseket azért, hogy a tesztek gyorsabban sikeresek legyenek.** A növekvő engedélyezési listával rendelkező sikeres ellenőrzés a minőség hamis érzetét kelti.

### Amikor egy ellenőrzés meghiúsul a PR-odban

1. **Olvasd el figyelmesen az ellenőrzés kimenetét** — pontosan megadja, melyik fájl vagy szimbólum sértette meg a szabályt.
2. **Javítsd ki a szabálysértést** — a legtöbb ellenőrzés determinisztikus fájlrendszer-ellenőrzés, amely azonnal sikeres lesz, amint a kód helyes.
3. **Ha a szabálysértés már korábban is fennállt** (vagyis nem te vezetted be, de az ellenőrzés most már lefedi): adj hozzá egy engedélyezésilista-bejegyzést indoklást tartalmazó megjegyzéssel és egy követést végző issue-ra mutató hivatkozással.
4. **Ha az ellenőrzés egy szigorító ellenőrzés** (lefedettség, ESLint-figyelmeztetések, duplikáció, komplexitás):
   a módosításod rontotta a mérőszámot. Javítsd az alapul szolgáló problémát, vagy (ritka esetben) futtasd a
   `npm run quality:ratchet -- --update` parancsot, ha a módosítás szándékos, és a mérőszám romlása elfogadható — de dokumentáld, miért, a PR leírásában.
5. **A tanácsadó ellenőrzések** (`continue-on-error: true`) tájékoztató jellegűek — nem akadályozzák az egyesítést,
   de megjelennek a CI összegzésében. Ettől függetlenül javítsd ki őket.

---

## Új kapu hozzáadása

1. Hozd létre a `scripts/check/check-<name>.mjs` (vagy `.ts`) fájlt. A szabályzati kapuk 0/1 kilépési kóddal lépnek ki.
   A racsnis jellegű kapuk a `collect-metrics.mjs` segítségével mérőszámot írnak a `quality-metrics.json` fájlba.
2. Add hozzá a `"check:<name>": "node scripts/check/check-<name>.mjs"` bejegyzést a `package.json` fájlhoz.
3. Kösd be a `.github/workflows/ci.yml` megfelelő feladatába
   (szabályzat → `lint` vagy `docs-sync-strict`; racsni → `quality-gate`).
4. Ha rendelkezik engedélyezési listával, alkalmazd rá a `reportStaleEntries()` függvényt a
   `scripts/check/lib/allowlist.mjs` fájlból, hogy az elavult bejegyzések automatikusan észlelhetők legyenek.
5. Írj egy tesztet a `tests/unit/build/` könyvtárban, amely lefedi a kapu észlelési logikáját.
6. Frissítsd ezt a dokumentumot (adj hozzá egy sort a megfelelő feladattáblázathoz).

---

## Ügynökeszközök: LSP a munkafolyamatban (választható)

A CI-kapuk mellett az OmniRoute egy **választható** `agent-lsp` vázat is biztosít
(egy projektszintű `.mcp.json`, Fase 7 15. feladat). Hozd létre a `.mcp.json` fájlt,
hogy TypeScript nyelvi kiszolgálót tegyél elérhetővé a kódoló ügynökök számára, így azok a szimbólumokat /
diagnosztikát **a kód megírása előtt** feloldhatják — ez a `typecheck:core` „fordítás az állítás előtt” elvű kiegészítője,
amely már a forrásnál csökkenti a „kitalált szimbólumokból” eredő hibákat. Szándékosan
nem töltődik be automatikusan (te választod ki és ellenőrzöd az MCP↔LSP hidat); egy hibás bejegyzés csak
kapcsolódási hibát naplóz, és soha nem szakítja meg a munkameneteket.

---

## Racionalizálási backlog (ROI-felülvizsgálat — 9. fázis, 3. hullám)

Ezt a leltárt 2026-06-17-én egyeztettük a következővel: `ci.yml` (az előző verzió nem tartalmazta ezeket:
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Az egyeztetett készleten végzett ROI-felülvizsgálat
a következő racionalizálási jelölteket azonosította. **Az összevonások mechanikus CI-módosítások; a
váltások/elhagyások az üzemeltető számára fenntartott szabályzati döntések.** Az alábbiak közül
még semmi nincs alkalmazva.

**A fentieken kívül dokumentálatlan** (tanácsadó jellegű, alacsony jel-zaj arányú): a `docs-lint` job
(markdownlint + Vale, a teljes job `continue-on-error` beállítással), valamint az önálló
`semgrep.yml` / `codeql.yml` / `scorecard.yml` szkenner-munkafolyamatok.
A `semgrepFindings: 0` szerepel a `quality-baseline.json` fájlban, de nincs blokkoló ratchet-re
kötve a `ci.yml` fájlban — a metrika jelenleg árva.

### Összevonás / deduplikáció (mechanikus, kisebb kockázat)

Minden jelöltet ellenőriztünk az éles kapuállapot ellen 2026-06-17-én (bizalom, de ellenőrzés);
több „nyilvánvaló” összevonásról kiderült, hogy adósságot rejt, ezért ezek **nem** tiszta,
közvetlenül behelyettesíthető összevonások.

- **A `check:docs-sync` kétszer fut** — önállóan a `lint` jobban, majd ismét a `check:docs-all` részeként (`docs-sync-strict`) és a husky pre-commit hookban. ✅ **KÉSZ** — az önálló `lint`-meghívást eltávolítottuk.
- **CVE-szkennelés** — ❌ **NEM tiszta összevonás.** Az `audit:deps` mind az öt lockfile esetében blokkolja a kritikus advisory-kat és a hiányos auditokat, miközben a jelenlegi szabályzat szerint a magas súlyosságú advisory-kat figyelmeztetésként jelenti; a `check:vuln-ratchet` (osv) csak a beadott baseline-hoz viszonyított _regresszió_ esetén hibázik, és szükség esetén elutasítja a hiányzó méréseket. Eltérő szemantikákról van szó — az `audit:deps` elhagyásával elveszne az abszolút kritikus kapu és a független csomagaudit-bizonylatok. Mindkettőt meg kell tartani.
- **Ciklusészlelés** — ✅ **KÉSZ** (#15159 G-01/G-02). A régi szöveg itt a `check:cycles` ellenőrzést „zöld, kurált” kapuként írta le, és azt indokolta, hogy blokkolóként maradjon meg, mivel a `check:circular-deps` (dpdm) 91 ciklust jelzett. Ez a zöld állapot **téves zöld volt**: a `check:cycles` 5 alkönyvtárat (450 fájlt) vizsgált, csak a statikus `import|export … from` mintára illeszkedett, és minden `@/` és `@omniroute/open-sse/` specifikátort eldobott, így nem láthatta a repozitóriumban domináló dinamikus import- és aliasciklusokat. Javítva: a kapu most az `src` + `open-sse` területet járja be (5023 fájl), a specifikátorokat a TypeScript AST-ből gyűjti össze (így az `import("…")` beleszámít, a típuspozícióban szereplő `typeof import("…")` viszont nem), és feloldja a tsconfig `paths` beállításait. **14** ciklust talál, nem 0-t. Mivel 14 már meglévő ciklus nem javítható egy kapu-PR-ben, a `check:cycles` most **ratchet** (`--ratchet`, a `quality-baseline.json` fájlban a `metrics.cycles.value = 14` felső korláttal, `direction: down` iránnyal) — regresszió esetén blokkol, a szám pedig csak csökkenhet. A CI a `npm run check:cycles:ratchet` parancsot futtatja. A leépítés az **A-01** feladattal együtt történik. A `check:circular-deps` (dpdm) megmarad tanácsadó jellegű, szélesebb körű második véleményként.
- **Komplexitás** — ✅ **KÉSZ** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): egyetlen ESLint-bejárás, `ruleId` szerinti számlálással, így a ciklomatikus és a max-lines, valamint a kognitív baseline-ok egymástól függetlenek maradnak; az egyes `check:complexity` / `check:cognitive-complexity` ellenőrzések megmaradnak a helyi `--update` futtatásokhoz.
- **`/api` hallucinációellenőrzés** — ✅ **KÉSZ** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): egyetlen FS-leltár az `src/app/api` területéről, az openapi-routes és a docs-symbols továbbra is külön jelentenek; az egyes ellenőrzések megmaradnak a helyi futtatásokhoz.
- **A `check:node-runtime` 11 jobban fut** — ⚠️ **alacsony ROI.** Mindegyik külön futtatót használ, az ellenőrzés pedig <1s; a teljes megtakarítás ~10s lenne, cserébe elveszne az olcsó, jobonkénti védőellenőrzés. Nem éri meg a változtatással járó munkát.
- **`typecheck:noimplicit:core` a CI lintben** — ✅ **eltávolítva a lint jobból** (tanácsadó jellegű volt, `continue-on-error` beállítással); a blokkoló típusfelületet a `typecheck:core` + `check:type-coverage` biztosítja. A helyi script megmaradt.

### Váltás / döntés (üzemeltetői szabályzat)

- `check:openapi-security-tiers` (tanácsadó jellegű) — ❌ **Nem váltható át tisztán.** 0-val lép ki, de figyelmeztet arra, hogy a `LOCAL_ONLY_API_PREFIXES` alatt található több `traffic-inspector` útvonalról hiányzik az `x-loopback-only: true` annotáció. A kikényszerítéshez először hozzá kell adni ezeket az annotációkat az `openapi.yaml` fájlhoz.
- `typecheck:noimplicit:core` (tanácsadó jellegű) — nagyrészt kiváltja a blokkoló `check:type-coverage` ratchet. Váltsuk ratchet-re, vagy hagyjuk el a redundáns második `tsc`-futtatást.
- `test:vitest:ui` (jelenleg **blokkoló**) — a már meglévő hibákat a `vitest.config.ts` fájlban kifejezetten kizárják a `// #8618` nyomonkövetési megjegyzések; az új hibák meghiúsítják a jobot.
- `check:secrets` (gitleaks, 3 dokumentált téves pozitív eredménynél befagyasztott, blokkoló ratchet) — engedélyezési listára kell venni a 3 elemet, hogy elérjük a 0-t, vagy tanácsadó jellegűvé kell lefokozni. Átfedésben van a GitHub natív titokszkennelésével + `check:public-creds`.
- `check:pr-evidence` (blokkoló, a PR-törzs prózájában keres) — magas tévespozitív-kockázat; elhagyása gyengítené a Hard Rule #18 kikényszerítését, ezért ez valódi szabályzati döntés.
- `semgrep` (önálló, tanácsadó jellegű) — átfedésben van a CodeQL-lel az OWASP-családok tekintetében; a baseline-ját ratchet-re kell kötni, vagy el kell hagyni.

## Kapcsolódó dokumentáció

- Ellátásilánc (proveniencia, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kulcskészlet-paritást ellenőrző kapu

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, `i18n-ui-coverage` feladat).
Összehasonlítja minden `src/i18n/messages/<locale>.json` levélszintű kulcskészletét az
`en.json` fájléval, és hibával leáll minden hiányzó vagy többletlevél esetén, függetlenül attól,
mikor került be a kulcs. A `__MISSING__:` helyőrzők jelenlévőnek számítanak (tartalmuk a
hányadoskapu hatáskörébe tartozik). Ez a két különbségalapú/százalékos kapu abszolút
kiegészítője: a `check-ui-keys-coverage` területi beállításonként 80 %-os alsó korlátot
érvényesít (43 hiányzó kulcs körülbelül 13 000-ből még mindig 99,7 %), a
`check-new-key-coverage` pedig csak azokat a kulcsokat értékeli, amelyeket egy PR az
`en.json` fájlhoz hozzáad. Egy területi beállítási köteg a branch létrehozásának napján érvényes
`en.json` fájlból készül, és napokig fordítják, miközben az alap továbbra is új kulcsokat kap; a
köteg PR-ja maga nem ad hozzá kulcsot, ezért mindkét testvérkapu néma maradt, amikor az 1. köteg
(#13044) kilenc területi beállításban 43 kulccsal hiányosan érkezett, a 2. köteg (#13660) pedig
nyolcban 10 kulccsal volt hiányos (2026-09-15). A piros jelzés javítása:
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; egy `extra` levél
azt jelenti, hogy a forrásból kiesett — a `sync-ui-keys` eltávolítja (`--prune-extra`, az
alapértelmezett). A `--warn` hibajelzés nélkül jelent.
A `--catalog=cli` ugyanazt az összehasonlítást futtatja a `bin/cli/locales` könyvtáron
(`npm run i18n:check-keys:cli`); mindkét lépés az `i18n-ui-coverage` feladatban található. Az
abszolút ellenőrzés csak kiadási módban fut: egy funkciós PR a `SKIP reason=pr-mode` értéket
látja, a javítás pedig a kiadási frissítésben vagy egy fordítási hullámban fut, soha nem egy
funkciós PR-ban; egy, területi beállítások katalógusait módosító PR esetén mindegyiket a
merge base-hez képest értékeli a rendszer (lásd a „Két mód” részt az `i18n-ui-coverage`
feladat alatt).

#### `check-new-key-coverage` — új kulcsokat ellenőrző i18n-kapu

A `check-ui-value-drift` testvérkapuja. Az az angol értéket észleli, amelyet **átírtak**,
miközben a fordításai változatlanok maradtak; ez az angol kulcsot észleli, amelyet
**hozzáadtak**, miközben egyes területi beállítások soha nem kapták meg.

A `check-ui-keys-coverage` ezt az esetet nem látja: területi beállításonként százalékos alsó
korlátot érvényesít, és tizenegy hiányzó kulcs körülbelül 13 000 levélből 99,9 %-os lefedettséget
jelent. Nyelvenként egy százalékos érték nem tudja kifejezni azt, hogy „ez a funkció fordítás
nélkül került kiadásra” — egy teljes funkció szöveg nélkül jelenhet meg egy új területi
beállításban, és a szám soha nem változik.

Az általa kódolt incidens: az Orchestration Canvas 3. fázisa lefordította tizenegy kulcsát az
akkor létező 42 területi beállításhoz. Órákkal később az EU-nyelvek kötege (#13044) 51-re növelte
a tárház területi beállításainak számát, és a kilenc újonnan érkező (`el`, `et`, `ga`, `hr`,
`lt`, `lv`, `mt`, `sl`, `sr`) soha nem kapta meg ezeket. A `deepMergeFallback` angolra vált egy
hiányzó kulcs esetén, ezért a hibamód nem üres, hanem le nem fordított felület volt — valódi és
konstrukciójából adódóan csendes.

Testvérkapujához hasonlóan ez is **különbségtudatos**: az egyesítési alapnál lévő angolt
összehasonlítja a munkafával, így a korábban meglévő hiányosságok változatlanok maradnak, és a
kapu bekapcsolásához nem volt szükség migrációra.

**A `__MISSING__:<english>` jelölő nem elégíti ki (2026-09-17 óta).** Korábban ez volt a
dokumentált halasztás — a futtatókörnyezet a helyes angol szövegre vált vissza —, amíg
2026-09-16-án nyolc funkciós PR 61 kulcsot nem adott hozzá, és nem helyezte el a jelölőt mind a
65 területi beállításban fordítás helyett: ez a kapu mindegyiket elfogadta, semmi nem blokkolta
a PR-okat, majd a valódi fordításokat blokkoló hányadoskapu a kiadási csúcson mindenkinél
hibázott (pt-BR 3,2 % > 2,5 % + 0,5). A jelölőt most hiányzó fordításként értékeli a rendszer.
Csak kiadási módban, 2026-11-13 óta: egy funkciós PR a `SKIP reason=pr-mode` értéket látja, a
kiadási PR-ban (`BASE_REF=origin/main`) pedig a kapu a ciklusban hozzáadott minden kulcsot
értékeli. A piros jelzés javítása a kiadási frissítésben vagy egy fordítási hullámban:
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, vagy
az összes területi beállítás párhuzamosan a `npm run i18n:translate-new-keys` paranccsal
(`scripts/i18n/translate-new-keys.sh`, leválasztásbiztos, és nem indul el az
`OMNIROUTE_TRANSLATION_*` környezeti változók nélkül). Egy kulcs, amelynek angolul kell
maradnia (rögzített termék-, motor- vagy kapcsolónév), a
`scripts/i18n/untranslatable-keys.json` fájlba tartozik, soha nem jelölő mögé.
A `vi` szigorúan tiltja a jelölőket (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — félretett teszteket ellenőrző kapu

A `vitest.config.ts` `exclude` listájában szereplő fájl olyan teszt, amely nem fut le, és a
forrásfát olvasók számára lefedettségnek tűnik. Hatvankét fájl gyűlt össze a
`// #8618 — pre-existing failure; remove this exclusion when fixed` megjegyzés mögött. A
#8618-as issue-t 2026-08-11-én lezárták, miközben az általa követett lista 45 bejegyzésről
62-re nőtt, és mindegyik új elem egy megszűnt issue-ra mutató megjegyzést örökölt. Amikor a
listát végül fájlonként megmérték (#13204), a 62-ből **51 az aktuális fával szemben, forráskód-
módosítás nélkül sikeresen lefutott**.

A kapu megköveteli, hogy minden valódi fájlra feloldódó kizárás (a) nevezzen meg egy követési
issue-t, és (b) szerepeljen a `config/quality/vitest-exclusions.json` fájlban a mért
állapotával együtt, így egy új elem hozzáadása áttekinthető különbség egy erre kijelölt fájlban,
nem pedig egy újabb sor egy 60 elemű tömbben. Szándékosan nem futtatja újra a kizárt teszteket —
ez körülbelül 10 percet vesz igénybe, és egy időszakos feladatba tartozik; a leltár rögzíti,
mikor történt mindegyik legutóbbi mérése.
