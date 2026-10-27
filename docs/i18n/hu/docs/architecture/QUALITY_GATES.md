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

## Kapukészlet és végrehajtási profilok

### Jelöltek befogadása

A CI és a Quality Gates munkafolyamat egyaránt stabil döntést bocsát ki: `Gate / CI` és
`Gate / Quality`. Verziózott befogadási szabályzatuk minden felsőbb szintű feladatot
kötelezőként vagy tanácsadó jellegűként sorol fel. Egy alkalmazandó kötelező feladatnak sikeresen
kell lefutnia: a hiányzó, megszakított, kihagyott, függőben lévő és ismeretlen eredmények nem igazolhatnak PASS állapotot. Egy érvényes,
csak dokumentációra vagy csak katalógusra vonatkozó besorolás alkalmazhatatlanná tehet egy kódsávot;
egy vázlatos PR nem elfogadott jelölt. A `hotfix` címke nem mentesít a bizonyítékok követelménye alól.

Mindkét munkafolyamat lefedi a main/release ágakba irányuló PR-eket, a `main` ágba történő pushokat, a kézi indítást
és a merge-group eseményeket. A push, az indítás és a merge-group a teljes kiválasztást futtatja. A
`release/**` ágakba történő pushok nem indítják el ezeket (2026-10-18): minden módosítás már lefuttatta a mátrixot a saját PR-jében,
az egyesített kombináció pedig a Release-Green feladata (`docs/ops/RUNNER_BOX.md` → Hosted sáv). A forkok
és a merge groupok hosztolt futtatókat használnak azokhoz a feladatokhoz, amelyek egyébként saját üzemeltetésű
futtatókat választanának; a bevezetés előtt ellenőrizni kell az elegendő hosztolt kapacitást.

Minden JSON-nyugta azonosítja a checkout során lekért SHA-t, a munkafolyamat futását és a próbálkozást.
A CLI elutasítja, ha a checkout és az esemény SHA-ja eltér. A munkafolyamat-tesztek a szabályzat tagságát
a döntési feladat `needs` listájához kötik, így egy új vagy eltávolított sáv nem tűnhet el észrevétlenül.
A nyugták a saját munkafolyamatukat fedik le, nem a közzétételt, a telepítést vagy egy meglévő
tanácsadó jellegű ellenőrző belső működését. Mindkét ellenőrzési név aktiválása az ágszabályokban
külön adminisztratív módosítás; e feladatok hozzáadása önmagában nem védi az ágat.

### Megőrzött bizonyítékok az elfogadási redukálóban

A `scripts/quality/validate-release-acceptance.mjs` egy megadott tervet és annak
manifesztjeit redukálja; nem állapítja meg, hogy a terv lefedi-e a teljes kiadási folyamatot.
Jelentései kifejezetten `releaseAcceptance: false` értéket állítanak be, még akkor is, ha a terv
`VERIFIED`. A `release-acceptance.yml` munkafolyamat továbbra is árnyék-fixture-öket használ,
nem valódi buildelési, csomagolási, indítási vagy előléptetési nyugtákat.

A CLI a megőrzött bizonyítékok ellenőrzéséhez megköveteli a `--evidence-root` használatát. A fájlokat
`<evidence-root>/<artifact_id>/<member>` formában oldja fel, és SHA-256 használatával hasheli. Egy bizonyíték nélküli PASS rekord,
egy hiányzó vagy módosított fájl, egy nem biztonságos elérési út vagy egy szimbolikus hivatkozás megakadályozza
az ellenőrzést. A hiányzó fájlok nem egyenértékűek az üres, sikeres naplókkal. A meglévő
SHA-/futás-/próbálkozás-ellenőrzések függetlenek maradnak: az egyező bájtok nem menthetnek meg egy elavult
nyugtát. A fájlintegritás nem bizonyítja a végrehajtás hitelességét vagy az összetevő előléptetését.

### Felhasználói felületi végrehajtási kapacitás

A CI a teljes felhasználói felületi készletet négy `test-vitest` mátrixszegmensként futtatja, szegmensenként legfeljebb
két workerrel és a meglévő 15 perces feladathatáridővel. Az első szegmens futtatja az
MCP/autoCombo Vitest tesztcsomagot is. A kötelező feladateredmény minden mátrixágat lefed; egyetlen szegmens hibája
vagy megszakítása esetén sem állapítható meg a jelölt befogadása.

Az éjszakai megfigyelő minden felhasználói felületi szegmenshez külön, pontosan a jelöltre vonatkozó nyugtát őriz meg,
beleértve az MCP-végrehajtást az első nyugtában. Mind a négy nyugta, a naplók és az egyező
végrehajtási identitások szükségesek. A helyi `npm run test:vitest:ui` továbbra is a
teljes tesztcsomagot választja ki; egyetlen `--shard` futtatás csak részleges bizonyíték.

### Egységteszt-lefedettség gyűjtése

A tizenkét egységteszt-szegmens a meglévő tesztvégrehajtás során gyűjti a V8-lefedettséget. Egy sikeres
szegmens a `scripts/ci/compact-v8-coverage.mjs` futtatásával tömöríti az eredeti fájlokat anélkül, hogy
köztes Istanbul-jelentést hozna létre. A végső Coverage feladat mind a tizenkét manifesztet ellenőrzi
a jelölt SHA-ja, a futtatókörnyezet, a forrásgyökér és az adathashek alapján, majd futtatja a c8 jelentéskészítőit és a meglévő
lefedettségi küszöbértékeket. A bemenetek megőrzik a c8 globális fájlnévsorrendjét; a szegmensenkénti előzetes egyesítés nem biztonságos
vegyes függvény-/blokk-lefedettség esetén. A hiányzó, hibás formátumú vagy inkompatibilis szegmensek meghiúsítják a befogadást.
A sikertelen tesztszegmensek külön őrzik meg a nyers diagnosztikai lefedettséget; ez nem kerülhet be a végső egyesítésbe.

### Statikus ellenőrzési készlet

A verziózott npm-alias-készlet és a statikus ellenőrzések tagsága a
`config/quality/gate-manifest.json` fájlban található. Futtassa az `npm run check:gate-manifest` parancsot
a szkriptnevek és a pontos parancsok `package.json` alapján történő ellenőrzéséhez; a hozzáadások, eltávolítások és
parancseltérések egyaránt meghiúsítják a helyi hookot és a CI módosításbesorolási feladatait.
Egy alias nem munkafolyamat-feladat, mátrixpéldány vagy teszteset: ezek a darabszámok nem
mutathatók be egymással felcserélhetőként.

A kiválasztott aliasok végrehajtás nélküli megtekintéséhez használja az `npm run quality:scan -- --list` vagy az `npm run quality:scan:fast -- --list`
parancsot. A futtató az
npm belépési pontját hívja meg, így annak futtatókörnyezete — beleértve a Bunt, ahol az konfigurálva van — megmarad.
A manifeszt az e profilokon kívüli aliasokat külön meghívottként rögzíti, és
a karbantartási parancsok tiltottak a csak olvasható ellenőrzési profilokban.

Ezek a profilok csak a statikus ellenőrzést fedik le. Nem tanúsítják a termékteszteket,
a lefedettséget, a csomagolást, a külső ellenőrzéseket vagy egy jelölt teljes kiadáselfogadását.
A munkafolyamat-befogadás a hivatkozott `config/quality/admission-policy.json` és
`scripts/quality/admission-verdict.mjs` fájlt használja. A kiadásmegfigyelői profilok elkülönülnek;
az alkalmazandó ellenőrzéseiket és nyugtáikat egymástól függetlenül vizsgálja meg. A teljes megfigyelő statikus
parancsai a `config/quality/release-green-static-profile.json` fájlban vannak deklarálva, beleértve az
`audit:deps` parancsot, a mutációsteszt-kiválasztást és a fordításellenőrzéseket. A betöltő ellenőrzi az npm-
parancsokat a package.json és a modellezett CI/Quality deklarációk alapján; elutasítja az eltérést,
ahelyett, hogy a shell-tokeneket argumentumként hajtaná végre. A kötelező ellenőrző SKIP/INCOMPLETE kimenete
nem igazolhat PASS állapotot. A profil rögzíti a külső kizárásait, és nem helyettesíti
a hosztolt lefedettséget, a tesztmátrixokat, a csomagolási vagy telepítési bizonyítékokat. Az alábbi szöveges készlet
referencia, nem annak bizonyítéka, hogy egy kapu ténylegesen lefutott.

A szkriptek a `scripts/check/` (szabályzatkapuk) és a `scripts/quality/` (ratchet motor) alatt találhatók.
A CI hiteles forrása a `.github/workflows/ci.yml`.

### Gyorsított útvonal kiadási PR-ekhez (`quality.yml`)

A `.github/workflows/quality.yml` kiegészíti a CI-t a main/release PR-ek, a `main` ágra történő pushok, a kézi indítások és az összevonási csoportok esetén. A PR-ek útvonalszűrt gyors ellenőrzéseket használnak. A véglegesen letiltott, duplikált build el lett távolítva; a tényleges build-/csomagolási-/rendszerindítási ellenőrzések továbbra is a CI részei.

| Feladat                                          | Hatókör                                                                                                                                                                                                                                                          | Blokkoló                |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | Dokumentációs/kódmódosítási PR-ek; API-dokumentációs hivatkozások és docs-all                                                                                                                                                                                    | Igen                    |
| `Fast Quality Gates`                             | Kódmódosítási PR-ek; statikus ellenőrzések, típusellenőrzés, az irányítópult típusellenőrzése, érintett egységtesztek                                                                                                                                            | Igen                    |
| `Forgotten sibling tests`                        | Kódmódosítási PR-ek; a módosított modulok nyomon követése statikus fogyasztókig és lehetséges kapcsolódó tesztekig; a barrel- és dinamikus importálási útvonalak tájékoztató jellegű diagnosztikaként jelennek meg, a hivatkozott engedélyezőlistás kivételekkel | **Tájékoztató jellegű** |
| `Vitest (fast-path)`                             | Kódmódosítási PR-ek; gyors vitest tesztcsomag                                                                                                                                                                                                                    | Igen                    |
| `Unit Tests fast-path`                           | Kódmódosítási PR-ek; 4 részre osztott egységtesztcsomag                                                                                                                                                                                                          | Igen                    |
| `No new ESLint warnings`                         | Kódmódosítási PR-ek; elnyomásokat figyelembe vevő lintelési védőellenőrzés                                                                                                                                                                                       | Igen, forkok esetén is  |
| `Merge integrity (changelog + generated skills)` | Nem piszkozat PR-ek; a változásnapló és a generált készségek szinkronizálása                                                                                                                                                                                     | Igen, forkok esetén is  |

#### Elfelejtett kapcsolódó tesztek jelentése

Az `npm run check:forgotten-sibling-tests` újra felhasználja a teszthatás-térkép mögötti importfeloldót.
Minden módosított éles modulhoz determinisztikus
`changed module/symbol -> static consumer -> candidate sibling test` láncokat jelent, ha a lehetséges
teszt hiányzik a pull request diffjéből. A Markdown-összefoglaló és a JSON-eredmény
`forgotten-sibling-tests` munkafolyamat-artefaktumként megőrzésre kerül a kalibráláshoz, mielőtt az ellenőrzés blokkolóvá válna.

A barrel újraexportok és a dinamikus importok kizárólag feloldási diagnosztikák; soha nem hoznak létre
blokkoló találatot. A felülvizsgált kivételek a
`config/quality/forgotten-sibling-allowlist.json` fájlban találhatók. Minden bejegyzésnek meg kell neveznie a fogyasztót és a lehetséges
tesztet, konkrét indoklást kell adnia, valamint egy GitHub-issue-ra vagy pull requestre kell hivatkoznia. A hibás formátumú bejegyzések
alapértelmezés szerint hibát okoznak. A kivételek nem fedhetnek el törölt lehetséges tesztet, illetve olyan diffet, amely `.skip`/`.todo`
elemet ad hozzá; az állítások gyengítésének és más elfedéseknek az ellenőrzése továbbra is a függetlenül blokkoló
`check:test-masking` ellenőrzési kapu feladata.

### Feladat: `lint`

Minden `main` ágra irányuló PR esetén lefut. Hiba esetén blokkolja az összevonást.

| Szkript (`npm run ...`)           | Ellenőrzi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Blokkoló                                            |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:node-runtime`              | A Node.js verzió a támogatott tartományon belül van                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Igen                                                |
| `check:cycles`                    | Körkörös importok a teljes `src/` és `open-sse/` könyvtárban (AST-alapú, a tsconfig `paths` feloldásával). Az alapváltozat 1-es kilépési kódot ad, ha bármilyen ciklus létezik (a #15281 óta zárt hibakezelésű), és felsorolja az SCC-ket. A `check:cycles:ratchet` (amelyet a CI futtat) blokkol, ha a darabszám meghaladja a `quality-baseline.json` fájlban található `metrics.cycles` felső korlátját — ez jelenleg 14, `direction: down`, így csak csökkenhet (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Igen (racsnis korlátozás)                           |
| `check:boundary`                  | `open-sse → src` csatolás: egyedi fájlok közötti importok a motorból az alkalmazásba (`scripts/quality/measure-boundary.mjs`; az él-lista a v4 mag-/modulszétválasztási javítási teendőinek listája). Alapváltozat = tájékoztató jelentés (ugyanaz, mint a `quality:boundary`). A `check:boundary:ratchet` (amelyet a CI futtat, és a `quality.yml` gyors ellenőrzéseinek racsnis ciklusában is szerepel) blokkol, ha a darabszám meghaladja a `quality-baseline.json` fájlban található `metrics.boundaryOpenSseToSrc` felső korlátját — kezdeti értéke a mért 771, `direction: down`; a `--update` csak csökkenti; PR-eknél az alapághoz viszonyít (`--base-ref`, lásd alább)                                                                                                                                                                                                                                                                                                                                                                | Igen (racsnis korlátozás)                           |
| `check:route-validation:t06`      | Zod-sémák megléte minden útvonalon (6. szintű szabályzat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Igen                                                |
| `check:any-budget:t11`            | Az `@ts-expect-error // any` előfordulások száma nem haladja meg a keretet (11. szintű sorompó)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Igen                                                |
| `check:provider-consistency`      | A `providers.ts` minden szolgáltatójához tartozik megfelelő bejegyzés a `providerRegistry.ts` fájlban (és fordítva, az engedélyezési listán belül)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Igen                                                |
| `check:model-lifecycle`           | A három kézzel karbantartott útválasztási tábla konzisztens marad a repóban tárolt életciklus-pillanatképpel (#11503): a `FITNESS_TABLE` (`taskFitness.ts`) nem pontoz olyan kivezetett azonosítót, amelyhez a `REGISTRY` képes útvonalat rendelni; minden `BUILT_IN_ALIASES`-cél megtalálható a `REGISTRY`-ben, és hiányzik a kivezetett azonosítók pillanatképéből; minden, a `REGISTRY`-ben még szereplő kivezetett azonosító továbbításra kerül, vagy szerepel az `allowedRetiredInCatalog` listában; továbbá a `DEFAULT_DEGRADATION_MAP` egyetlen forrása vagy célja sem szerepel kivezetettként ebben a pillanatképben. Ez nem bizonyítja, hogy egy modellt jelenleg élő külső szolgáltató biztosít. Offline — a `config/quality/model-lifecycle.json` fájllal hasonlítja össze; ez kézzel frissíthető az `npm run quality:refresh-model-lifecycle` paranccsal (hálózatot igényel; nincs bekötve a CI-be). Az `allowedRetiredInCatalog` egy fokozatosan szigorodó korlát: csak nyomonkövetési hibajeggyel együtt adjon hozzá bejegyzést. | Igen                                                |
| `check:fetch-targets`             | A kliensoldali `src/` minden `fetch("/api/...")` hívása egy valódi `route.ts` fájlra oldódik fel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Igen                                                |
| `check:deps`                      | A repó minden `package.json` fájljában található, `npm install` segítségével telepíthető összes függőség szerepel a `dependency-allowlist.json` fájlban; az új, nem rögzített verziójú vagy névelgépeléses csomagok megjelölésre kerülnek                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Igen                                                |
| `audit:deps`                      | Mind az öt független zárolási fájl npm-auditja (gyökér, Electron, OpenCode v1/v2 beépülő modulok és szolgáltató). A kritikus biztonsági figyelmeztetések blokkolnak; a magas súlyosságú figyelmeztetések látható figyelmeztetésként megmaradnak. A hiányzó vagy sikertelen auditok HIÁNYOSNAK minősülnek és blokkolnak; a hatókörönkénti zárolásihash-ek és jelentések megőrzésre kerülnek.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Igen                                                |
| `check:lockfile`                  | A `package-lock.json` integritása — HTTPS-nyilvántartó, integritási hash-ek, gazdagép-felülbírálások nélkül                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Igen                                                |
| `check:licenses`                  | SPDX-licencengedélyezési lista az éles környezet függőségeihez                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen                                                |
| `check:tracked-artifacts`         | Nincsenek buildelési műtermékek / verziókezelésbe mentett `node_modules` szimbolikus hivatkozások (a husky pre-commit során is fut; a pre-push szándékosan minimális — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Igen                                                |
| `check:ai-attribution`            | Nincs MI/bot `Co-Authored-By` zárósor vagy MI általi generálásra utaló lábléc a PR commitjaiban, címében vagy törzsében — 16. szigorú szabály (a `quality.yml` gyors ellenőrzési ciklusában a PR→`release/**` esetén — beolvassa az esemény hasznos adatait, PR-okon kívül nem végez műveletet —, valamint egy csak PR-ekre vonatkozó lépésként a `ci.yml` lintelésében a PR→`main` esetén; továbbá a husky `commit-msg` hookban; emberi társszerzők engedélyezettek; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:vitest-exclusions`         | Minden Vitest-kizárás megnevez egy nyomon követési hibajegyet, és szerepel a `config/quality/vitest-exclusions.json` fájlban (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Igen                                                |
| `check:file-size`                 | A forrásfájlok (a `src/`, `open-sse/`, `electron/`, `bin/` könyvtárakban található `.ts`/`.tsx` fájlok) mérete nem haladhatja meg a `cap`, a tesztfájloké (`*.test.ts(x)`) pedig a `testCap` értékét; a `file-size-baseline.json` fájlban rögzített (`frozen` / `testFrozen`) fájlok nem nőhetnek a feljegyzett méretük fölé                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                                |
| `check:error-helper`              | A végrehajtókban/kezelőkben lévő hibaválaszok a `buildErrorBody()` / `sanitizeErrorMessage()` függvényt használják (12. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Igen                                                |
| `check:migration-numbering`       | A migrációs SQL-fájlok számozása folyamatos, nincsenek kihagyások vagy ismétlődések                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Igen                                                |
| `check:public-creds`              | Nincs literális OAuth `client_id`/`client_secret` vagy Firebase Web-kulcs a `publicCreds.ts` fájlon kívül (11. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Igen                                                |
| `check:db-rules`                  | Nincs nyers SQL a `src/lib/db/` modulokon kívül; nincsenek gyűjtőimportok a `localDb.ts` fájlból (2./5. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Igen                                                |
| `check:known-symbols`             | A szolgáltatói végrehajtók, az útválasztási stratégiák és a fordítók diszpécsertábláiban regisztrált elemek megegyeznek a lemezen található fájlokkal — nincsenek árva vagy deklarálatlan szimbólumok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Igen                                                |
| `check:route-guard-membership`    | Minden olyan útvonalat, amely gyermekfolyamatot indít, az `isLocalOnlyPath()` osztályoz (15./17. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Igen                                                |
| `check:test-discovery`            | A repó minden `*.test.ts` / `*.spec.ts` fájlját legalább egy tesztfuttató begyűjti (ratchet: a `test-discovery-baseline.json` fájlban lévő árva fájlok listája csak rövidülhet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Igen                                                |
| `check:test-tla-order`            | A `tests/unit` alatti `node:test` fájlok egyike sem regisztrál tesztet úgy, hogy azt felső szintű `await`, majd további tesztek regisztrálása kövesse (#18045; ratchet: a `test-tla-order-allowlist.json` engedélyezési listája csak rövidülhet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Igen                                                |
| `check:agent-skills-sync`         | A generált agent-skills összetevők megegyeznek a forráskatalógusukkal (nincs eltérés)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `check:provider-asset-provenance` | A szolgáltatói logókhoz/erőforrásokhoz rögzített eredetbejegyzés tartozik                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | A JSON-konfigurációs fájlok feldolgozhatók, és megfelelnek a repó lintelési szabályainak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | TypeScript-fordítás hibák nélkül (csak tájékoztató jellegű figyelmeztetések)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                                |
| `typecheck:noimplicit:core`       | Szigorú `noImplicitAny` — jövőorientált; számos már meglévő hívási helyen továbbra is szükség van annotációkra                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **Tájékoztató jellegű** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | A `tsc` futtatása a `src/app/(dashboard)/**` hatókörére korlátozva (#7033) — a `typecheck:core` gondosan összeállított, 27 fájlból álló engedélyezési listája egyetlen irányítópulti TSX-fájlt sem tartalmaz, és a `next build` sem végez rajtuk típusellenőrzést (a `next.config.mjs` beállítja az `ignoreBuildErrors: true` értéket), így az ottani, árva azonosítókból eredő regressziók (#6625/#6909) láthatatlanok voltak a CI számára. Egy befagyasztott, fájlonkénti és TS-kódonkénti darabszám-alapértékkel (`config/quality/dashboard-typecheck-baseline.json`, ugyanaz az elavultságot kikényszerítő minta, mint a `check:known-symbols` esetében) hasonlítja össze az eltéréseket — csak az alapértékben rögzített darabszámot meghaladó ÚJ hibák miatt bukik el az ellenőrzés; ha egy már meglévő hibát kijavítanak, az alapérték a `--update` kapcsolóval csökkenthető.                                                                                                                                                           | Igen                                                |

### Feladat: `quality-gate`

A `test-coverage` után fut. Hiba esetén blokkolja az egyesítést.

| Szkript                      | Ellenőrzés                                                                                                                                                                                                                 | Blokkoló                               |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `quality:collect`            | Létrehozza a `quality-metrics.json` fájlt (ESLint-figyelmeztetések száma, lefedettség az egyesített szegmensjelentésből)                                                                                                   | Igen (a fokozatos szigorítás bemenete) |
| `quality:ratchet`            | A `quality-baseline.json` minden metrikája regressziómentes (ESLint-figyelmeztetések ≤ alapérték; lefedettség ≥ alapérték)                                                                                                 | Igen                                   |
| `check:duplication`          | A kódduplikáció (jscpd@4) nem haladja meg a `quality-baseline.json` fájlban megadott alapértéket                                                                                                                           | Igen                                   |
| `check:complexity`           | A fájlszintű ciklomatikus komplexitás nem haladja meg a korlátot (az ESLint alapvető `complexity` + `max-lines-per-function` szabálya)                                                                                     | Igen                                   |
| `check:cognitive-complexity` | Kognitívkomplexitás-fokozatos szigorítás (`eslint-plugin-sonarjs`) — külön ESLint-futtatás; a CI mindkettőt összevonva, egyetlen `check:complexity-ratchets` lépésként futtatja                                            | Igen                                   |
| `check:dead-code`            | A nem használt exportok/fájlok fokozatos ellenőrzése (knip) nem mutat regressziót az alapértékhez képest                                                                                                                   | Igen                                   |
| `check:compression-budget`   | Tömörítési teljesítményteszt kerete — a motoronkénti minimális tokenmegtakarítás nem romolhat                                                                                                                              | Igen                                   |
| `check:type-coverage`        | A típusozottsági százalék fokozatos ellenőrzése (`type-coverage`) nem mutat regressziót; nagyrészt magában foglalja a `typecheck:noimplicit:core` ellenőrzést                                                              | Igen                                   |
| `check:codeql-ratchet`       | A nyitott CodeQL-riasztások száma nem nőhet (beolvasás a `gh api` segítségével; token hiányában szabályos kihagyás) — a frissítési gyakoriságot és a kézi indítást lásd alább, a „CodeQL fokozatos szigorítása” szakaszban | Igen                                   |

### Feladat: `quality-extended`

A feladat blokkolja az érintett jelölteket. A csomagméretet, a titkos adatokra utaló találatokat, a sebezhetőségi
találatokat, a munkafolyamatokkal kapcsolatos találatokat és az OpenAPI-módosításokat kötelező fokozatos ellenőrzések vizsgálják.
A körkörös függőségek diagnosztikája továbbra is csak tájékoztató jellegű. A keresőeszközök telepítése kötelező:
a `scripts/ci/install-quality-scanners.sh` rögzített verziókat telepít, és továbbítja a
telepítési hibákat. Hiányzó eszközök, érvénytelen jelentések vagy hiányzó alapértékek esetén
a kötelező keresőeszköz-ellenőrzés állapota INCOMPLETE marad.

| Szkript                  | Ellenőrzés                                                                                                                                                                                                                                                   | Blokkolás                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| `check:circular-deps`    | Nincsenek körkörös függőségek (dpdm)                                                                                                                                                                                                                         | **Tájékoztató jellegű**                                   |
| `check:bundle-size`      | A csomag mérete nem haladja meg a felső korlátot; ha a mérés nem érhető el, az ellenőrzés sikertelen                                                                                                                                                         | **Blokkoló a --ratchet használatával**                    |
| `check:secrets`          | A Gitleaks találatai nem mutatnak visszalépést; a kötelező vizsgálatok elutasítják a hiányzó eszközöket/forrást/alapértéket, a sikertelen vizsgálatokat és az érvénytelen jelentéseket                                                                       | **Blokkoló a --ratchet használatával**                    |
| `check:vuln-ratchet`     | A függőségek sebezhetőségei nem mutatnak visszalépést; a kötelező vizsgálatok elutasítják a hiányzó eszközöket, az érvénytelen jelentéseket vagy a hiányzó alapértékeket                                                                                     | **Blokkoló a --ratchet használatával**                    |
| `check:workflows`        | Munkafolyamatok lintelése (actionlint + zizmor); a hiányzó/hibás vizsgálók, az érvénytelen jelentések vagy a hiányzó ratchet-alapérték INCOMPLETE hibát eredményeznek. Az érvényes találatok a kiválasztott szigorú/tájékoztató/ratchet szabályzatot követik | A végrehajtás kötelező; a zizmor ratchet blokkol a CI-ben |
| `check:openapi-breaking` | A nyilvános API-szerződés ellenőrzése a rögzített esemény-commitokhoz képest (PR merge-base, push előtt, merge-group alapja; ütemezett/manuális futtatásnál a checkout első szülője); a kötelező mérés zárt módon hibázik                                    | **Blokkoló a --ratchet használatával**                    |

### Feladat: `docs-sync-strict`

A `main` vagy `release/**` ágra irányuló pull requestek esetén ez a feladat csak a nem piszkozat állapotú (vagy megbízható várólistában lévő), dokumentációs vagy kódmódosításként besorolt jelölteknél fut le. Nem PR-hez tartozó CI-eseményeknél is lefut; ennek a munkafolyamatnak a push eseményindítója csak a `main` ágra terjed ki, a `release/**` ágakra nem. A nem nulla kilépési kóddal végződő lépés blokkolja a feladatot; a csak jelentésre szolgáló megállapítások és az alább dokumentált kivételek nem blokkolják.

| Szkript                        | Ellenőrzés                                                                                                                                                                                                                                                                                                                                                                                       | Blokkolás                                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-kapu, amely egymás után futtatja az alábbi 7 alkaput                                                                                                                                                                                                                                                                                                                                        | Igen                                                                                                                              |
| ↳ `check:docs-sync`            | A csomag/OpenAPI/CHANGELOG verzióinak összhangja, a `llm.txt` pontos tükörmásolatai, a lefordított CHANGELOG szakaszaira és méretére vonatkozó invariánsok, valamint a már felváltott, ismétlődő dokumentumok hiánya                                                                                                                                                                             | Igen                                                                                                                              |
| ↳ `check:docs-frontmatter`     | A lefordított dokumentációs oldalak érvényes frontmatter-címekkel rendelkeznek                                                                                                                                                                                                                                                                                                                   | Igen                                                                                                                              |
| ↳ `check:docs-counts`          | A nagy megbízhatóságú darabszám-invariánsok szigorúak; a heurisztikus fájlszám-ellenőrzések csak figyelmeztetnek, kivéve, ha a szkript megkapja a `--strict` kapcsolót (a CI meta-kapuja nem adja át)                                                                                                                                                                                            | A szigorú szint blokkol; az enyhe szint tájékoztató jellegű                                                                       |
| ↳ `check:env-doc-sync`         | A forráskódban olvasott környezeti változók, a `.env.example` és a `docs/reference/ENVIRONMENT.md` összhangban vannak a figyelmen kívül hagyott, a csak dokumentációban és a csak környezetben szereplő elemek kifejezett kivétellistáinak alkalmazása után                                                                                                                                      | Igen, a dokumentált kivétellistákon kívül                                                                                         |
| ↳ `check:deprecated-versions`  | Jelenti a biztonságos történeti kontextusokon kívüli, esetleg elavult verziókat és az elavult frissítési dátumokat, a figyelmen kívül hagyott dokumentumok kivételével                                                                                                                                                                                                                           | A jelenlegi CI-bekötésben tájékoztató jellegű (a `--strict` nincs átadva)                                                         |
| ↳ `check:doc-links`            | A dokumentáció belső markdown-hivatkozásai valódi fájlokra mutatnak (`[text]`/`(path)` formátumban)                                                                                                                                                                                                                                                                                              | Igen                                                                                                                              |
| ↳ `check:fabricated-docs`      | A dokumentációban hivatkozott útvonalak, környezeti változók, CLI-parancsok, hooknevek és fájlútvonalak léteznek a kódbázisban. Szigorú kapu a `--strict` használatával; a kapcsoló nélkül csak enyhe hibát jelez.                                                                                                                                                                               | Igen (a CI-ben a `--strict` révén)                                                                                                |
| `check:cli-i18n`               | A CLI által használt `t()` kulcsok léteznek az `en` alatt; a `pt-BR` minden legfelső szintű szakaszt megőriz; a `zh-CN` és a `zh-TW` az `en` összes kulcsát tartalmazza                                                                                                                                                                                                                          | Igen                                                                                                                              |
| `check:openapi-coverage`       | Az OpenAPI-specifikáció a valós útvonalak legalább ratchet alapján meghatározott minimumát lefedi                                                                                                                                                                                                                                                                                                | Igen                                                                                                                              |
| `check:openapi-security-tiers` | A deklarált `x-loopback-only`/`x-always-protected` annotációkat a `routeGuard.ts` szabályainak alá kell támasztaniuk; az elemző hibái és az előre irányuló ellenőrzés eltérései blokkolnak. A csak helyi hozzáférésre szolgáló prefixek alatt hiányzó `x-loopback-only` fordított ellenőrzése figyelmeztet, a kizárólag mintával megadott útvonalak pedig kimaradnak ebből a fordított menetből. | Az elemző és az előre irányuló ellenőrzések blokkolnak; a fordított ellenőrzés tájékoztató jellegű                                |
| `check:openapi-routes`         | Az `openapi.yaml` minden `/api...` útvonala a paraméterektől függetlenül megfelel egy valós útvonalnak az indokolt `KNOWN_STALE_SPEC` kivétellista alkalmazása után; az elavult kivétellista-bejegyzések szintén hibát okoznak                                                                                                                                                                   | Igen                                                                                                                              |
| `check:docs-symbols`           | A kanonikus, nem tükörmásolatként szolgáló dokumentumok belső `/api/...` URL-hivatkozásai valós útvonalra vagy útvonalcsaládra mutatnak; a proxy/upstream/helyőrző/fájl hivatkozások és az indokolt `KNOWN_STALE_DOC_REFS` bejegyzések kivételt képeznek, az elavult kivétellista-bejegyzések pedig hibát okoznak                                                                                | Igen                                                                                                                              |
| `i18n translation drift`       | Az alapvető lefordított dokumentumok forrás- és célhash-ei egyeznek a `.i18n-state.json` állományban szereplőkkel. A PR-ellenőrzések csak újonnan bevezetett forráseltérés, hiányzó cél vagy célhash-eltérés esetén hibáznak; a nem PR-hez tartozó ellenőrzések szigorúak. A PR örökölt eltérései és az elavult célokhoz tartozó forráshash-ek figyelmeztetések.                                 | A PR új eltérései és a PR-en kívüli szigorú ellenőrzések eltérései blokkolnak; az örökölt/elavult eltérések tájékoztató jellegűek |

A `docs/diagrams/` alatti tizenkét README SVG-t a `scripts/docs/gen-readme-<name>.mjs` generálja; a `npm run docs:readme-diagrams` mindet újragenerálja.
Mindegyikhez tartozik egy bájtonként összehasonlító egységteszt (`tests/unit/docs/readme-*-svg.test.ts`, `test-unit` feladat), amely megbukik, ha a verziókezelt fájl elavult.
A `check:docs-counts` a kanonikus számokat a `<text>` csomópontjaikból olvassa, ezért a számjegyeket soha nem alakítjuk körvonalas görbékké.
Az SVG kanonikus számainak ellenőrzése a `SVG_DIAGRAM_FILES` listában (`scripts/check/check-docs-counts-sync.mjs`) szereplő fájlokat olvassa: `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, `public/images/tier-flow-dark.svg`, `tier-flow-light.svg`.
A tartósan ingyenes szolgáltatókra, katalógusbejegyzésekre, ismétlődő poolokra és pontozási tényezőkre vonatkozó állítások ellenőrzései a `promise-pillars.svg`, `free-tier-budget.svg`, `strategies-grid.svg` fájlokat is olvassák.
A `free-tier-budget.svg` az aktuális katalógus betöltőjéből veszi a számait, ezért a `FREE_MODEL_BUDGETS` vagy egy szolgáltató megjelenített nevének módosítása CI-hibát okoz, amíg ezt a fájlt újra nem generáljuk.

### Feladat: `i18n-ui-coverage`

| Szkript                               | Ellenőrzés                                                                                                                                                                                                                          | Blokkoló        |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (beágyazott) | A felhasználói felület i18n-kulcsainak lefedettsége ≥ 65%                                                                                                                                                                           | Igen            |
| `check-ui-value-drift` (beágyazott)   | Egy átírt angol **érték** nem hagy maga után elavult fordítást                                                                                                                                                                      | Igen            |
| `check-new-key-coverage` (beágyazott) | Egy **új** angol kulcs minden területi beállításhoz le van fordítva — a `__MISSING__:` jelölő elutasításra kerül                                                                                                                    | Igen            |
| `check-translation-ratio`             | A valódi fordítások területi beállításonkénti aránya (az angollal azonos / helyőrző / hiányzó levélelemek az engedélyezési listán kívül) nem haladhatja meg a `config/quality/i18n-translation-baseline.json` értékét + a ráhagyást | **Tájékoztató** |

A `fetch-depth: 0` beállítást igényli — az értékváltozás-ellenőrző az `en.json` fájlt az összevonási bázissal hasonlítja össze.

#### `check-ui-value-drift` — elavult fordítások ellenőrzőkapuja

Azt az egy i18n-regressziót észleli, amelyet a többi ellenőrzőkapu szerkezetileg nem láthat: egy angol értéket
átírnak, miközben a _korábbi_ angol szövegből származó fordítások megmaradnak, így
a nem angol nyelvű felhasználók továbbra is egy magabiztosan megfogalmazott, de immár hibás szöveget olvasnak.

Ez ténylegesen éles környezetbe került. Az `oauthModal.googleOAuthWarning` át lett írva, amikor bekerült az Antigravity
bejelentkezési segéd (#5203); **43 területi beállításból 39** továbbra is azt az utasítást adta az üzemeltetőknek, hogy „másolják ki
a teljes URL-t, és illesszék be alább” — ez a folyamat ennél a szolgáltatónál nem hajtható végre. A probléma
a #8463 hibajegyig észrevétlen maradt, mert:

- a `sync-ui-keys` csak a **hiányzó** kulcsokat pótolja, az **elavultakat** soha;
- a `check-ui-keys-coverage` a kulcsok _jelenlétét_ számolja, ezért egy elavult fordítást lefedettnek tekint;
- a `check-translation-drift` a `docs/i18n/<locale>/**.md` dokumentációs tükröket követi nyomon —
  a `src/i18n/messages/*.json` fájlokat soha nem olvassa. A 2026-09-es újraszinkronizálás óta blokkoló a
  `docs-sync-strict` feladatban: módosíts egy alapvető dokumentumot → `npm run i18n:run -- --files=<doc>` (szakaszszintű, kis költségű).

**Diff-alapú, nem alapvonalra épül.** Az összevonási bázisnál lévő `en.json` fájlt hasonlítja össze a
munkafával; minden olyan kulcsnál, amelynek angol értéke megváltozott, elavultnak számít minden olyan területi beállítás, amelyben
érintetlenül megmaradt a fordítás. Ez szándékosan **befagyasztja a már meglévő adósságot** — egy diffből
nem állapítható meg, hogy egy régóta létező fordítás melyik korábbi angol szövegből származik, ezért az ellenőrzőkapu
csak az aktuális módosítás által érintett elemeket vizsgálja. Az alternatíva (egy kulcsonkénti hash-alapvonal) egy
mintegy 600 KB méretű generált fájlt igényelne, amely háromszor nagyobb a legnagyobb meglévő alapvonalnál, és minden i18n PR-nél módosulna.

Kétféleképpen teljesíthető:

1. frissítsd az érintett fordításokat, vagy
2. állítsd őket `__MISSING__:<new english>` értékre — futásidőben ekkor a javított angol szöveg jelenik meg
   (`src/i18n/request.ts::deepMergeFallback`, #7258), a kulcs pedig bekerül a fordítási sorba.

Ha a karakterlánc **jelentése** változott meg, inkább **nevezd át a kulcsot**: egy új kulcs nem örökölhet
elavult fordítást. A #8463 ezt a mintát alkalmazta.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

A folyamat 0-s kilépési kóddal és `SKIP reason=base-unresolved` üzenettel fejeződik be, ha az alapul szolgáló katalógus nem olvasható (sekély
klón az alap-referencia nélkül), a `check-openapi-breaking` működését követve.

### Feladat: `i18n`

Teljes i18n-ellenőrzési mátrix (területi beállításonként egy feladat). A teljes feladat tájékoztató jellegű.

| Szkript                         | Ellenőrzés                                     | Blokkoló                                                       |
| ------------------------------- | ---------------------------------------------- | -------------------------------------------------------------- |
| `validate_translation.py quick` | A fordítás teljessége területi beállításonként | **Tájékoztató** (`continue-on-error: true` a teljes feladaton) |

### Feladat: `pr-test-policy`

Csak pull requestek esetén fut.

| Szkript                | Ellenőrzés                                                                                                                                                                  | Blokkoló |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | A `src/`, `open-sse/`, `electron/` vagy `bin/` éles kódját módosító PR-eknek teszteket kell tartalmazniuk vagy frissíteniük (8. szigorú szabály)                            | Igen     |
| `check:test-masking`   | A módosított tesztfájlok nem csökkentik az ellenőrzések nettó számát, és nem adnak hozzá `assert.ok(true)` tautológiákat                                                    | Igen     |
| `check:pr-evidence`    | A PR törzse tesztelési/VPS-bizonyítékokat hivatkozik a módosításhoz (a 18. szigorú szabály gépesítése a PR szövegének grep-alapú keresésével — törékeny, lásd: Teendőlista) | Igen     |

### Feladat: `test-vitest`

A `build` után fut. Hiba esetén blokkolja az összevonást.

| Tesztcsomag      | Ellenőrzi                                                            | Blokkoló                                                                                                                           |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-kiszolgáló (110 eszköz), autoCombo, gyorsítótár — vitest futtató | Igen                                                                                                                               |
| `test:vitest:ui` | Felhasználói felületi komponensek tesztjei — vitest futtató          | **Blokkoló** — a már meglévő hibák kifejezetten ki vannak zárva a `vitest.config.ts` fájlban; az új hibák meghiúsítják a feladatot |

### Éjszakai munkafolyamatok (ütemezett, tájékoztató jellegűek)

Ezek cron-ütemezés szerint (valamint `workflow_dispatch` eseményre) futnak, PR-ek esetén soha. Mindegyik tájékoztató jellegű.

| Munkafolyamat          | Ellenőrzi                                                                                                                                                                                                 | Blokkoló                |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `nightly-property`     | fast-check tulajdonságalapú tesztek véletlenszerű kezdőértékkel és magas futtatásszámmal                                                                                                                  | **Tájékoztató jellegű** |
| `nightly-resilience`   | heapnövekedési korlát, káoszalapú hibabefecskendezés, k6 terhelési/tartóssági teszt                                                                                                                       | **Tájékoztató jellegű** |
| `nightly-llm-security` | promptfoo injektálás elleni védelem (blokkoló mód) + garak próbák (szolgáltatói titok nélkül kihagyva)                                                                                                    | **Tájékoztató jellegű** |
| `nightly-schemathesis` | OpenAPI-szerződés fuzztesztelése (schemathesis) egy élő OmniRoute-példányon a `docs/openapi.yaml` használatával — felszínre hozza a specifikációs eltéréseket / kezeletlen 500-as hibákat (8. fázis, B.4) | **Tájékoztató jellegű** |
| `nightly-mutation`     | Stryker mutációtesztelési pontszám a gyors egységtesztelési sávon — a túlélő mutánsok gyenge ellenőrzéseket jeleznek                                                                                      | **Tájékoztató jellegű** |
| `nightly-compat`       | Node-motor kompatibilitási mátrixa a támogatott `engines.node` tartományokon                                                                                                                              | **Tájékoztató jellegű** |

A teljesítmény-alapértékeket (heap, TTFB, buildidő) rögzítjük, de nem használjuk blokkolási feltételként: lásd [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Gyorsasági fázis (2026-08-30 → v4.0 LTS): minden alapérték 20%-kal enyhítve

Tulajdonosi döntés (2026-08-30): a v4.0 modularizálásáig a kiadási sebesség fontosabb, mint
a technikai adósság szinten tartása. Minden **numerikus** ratchet-alapértéket 20%-kal enyhítettünk
egyetlen auditálható lépésben, a fázis pedig a `config/quality/quality-baseline.json` fájlban van deklarálva:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Mi változott                                                                                                                                                                                                                                  | Hol                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — az alacsonyabb értéknél jobb darabszámok ×1,2, a magasabb értéknél jobb százalékok ÷1,2 (a lefedettségi minimum maradt 60, az `eslintErrors` maradt 0, az `eslintWarnings` 0 → a befagyasztott elnyomási darabszám 20%-a) | `quality-baseline.json` (a `_relax_velocity_2026_08_30` megjegyzés minden előtte → utána értéket felsorol) |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                                              | `complexity-baseline.json`, `duplication-baseline.json`                                                    |
| `cap`, `testCap`, valamint minden `frozen[*]` / `testFrozen[*]` sorkorlát ×1,2                                                                                                                                                                | `file-size-baseline.json`                                                                                  |
| fájlonkénti / TS-kódonkénti darabszámok ×1,2                                                                                                                                                                                                  | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`     |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                           | `scripts/check/check-openapi-coverage.mjs`                                                                 |
| a `--require-tighten` csak tájékoztató jellegű, amíg `_policy.requireTighten === false`                                                                                                                                                       | `scripts/quality/check-quality-ratchet.mjs`                                                                |
| az éjszakai `bank-ratchet-shrinks` szünetel (eltárolná a mért csökkenést, és megszüntetné a tartalékot)                                                                                                                                       | `.github/workflows/nightly-release-green.yml`                                                              |

Az engedélyezési listák (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nem** keretek, ezért nem módosultak. A sikeres/sikertelen állapotot meghatározó szabálykapuk
(titkok, SQL-szabályok, dokumentációs/környezeti szerződés, i18n-paritás, egységtesztek) változatlanok
— a sikertelen teszt továbbra is sikertelen teszt.

**Eszközök**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — az
  egyszeri enyhítés (`scripts/quality/relax-baselines.mjs`); ugyanazzal a megjegyzéssel nem
  hajlandó kétszer lefutni.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  minden numerikus kaput ugyanúgy mér, ahogy a CI, és kapunként kiírja a fennmaradó tartalékot
  (`scripts/quality/baseline-headroom.mjs`). Az éjszakai `baseline-headroom` feladat közzéteszi
  a táblázatot a munkafolyamat futási összegzésében, JSON-/Markdown-jelentését pedig
  `baseline-headroom-<run_id>` néven tölti fel, 90 napos megőrzéssel. A figyelmeztetési és kritikus
  sorok azonosítják azokat a kapukat, amelyek a korlátjuk 10%-án belül vannak, vagy már túl is
  lépték azt. Ezeket a jelentéseket tekintse a keretek felhasználásának korai figyelmeztetéseként;
  vizsgálja meg az érintett kapu `_rebaseline_*` megjegyzéseit. A feladat többé nem hoz létre és
  nem frissít állandó hibajegyet; a #12149 őrzi a korábbi jelentések előzményeit.

**Új kód mód (Clean-as-You-Code) — 2026-08-30 óta, csak a PR gyorsított útvonalán**

A `pull_request` eseményeknél a `quality.yml` átadja a `--base-ref <PR base SHA>` argumentumot
a `check:file-size`, `check:complexity-ratchets` és `check:dead-code` parancsoknak. A
`check:complexity-ratchets` és `check:dead-code` esetében a kapu a HEAD állapotot az egyesítési
bázissal hasonlítja össze, **kizárólag a PR által érintett fájlokra korlátozva**
(`scripts/check/newCodeMode.mjs`: az egyesítési bázis egy eldobható `git worktree` munkafában
materializálódik, az ESLint/knip ott és a HEAD állapoton is lefut, majd a fájlonkénti darabszámok
különbségét számítja ki):

- **blokkoló** — a PR ciklomatikus/kognitív komplexitási szabálysértéseket vagy nem használt exportokat
  adott hozzá az általa módosított fájlokban (`complexityNewCode=`, `cognitiveComplexityNewCode=`,
  `deadExportsNewCode=` a naplóban);
- **tájékoztató** — a globális összesítés összevetése a befagyasztott alapértékkel. Az örökölt
  eltérés soha nem tesz sikertelenné egy vétlen PR-t; az eltérést a kiadási egyeztetéskor ismét
  befagyasztjuk, és a tartalékot figyelő feladat követi nyomon.

A `check:file-size` a saját szabályai szerint használja a bázisreferenciát
(`scripts/check/check-file-size.mjs`, #8522): ellenőrzi a fában található összes forrás- és
tesztfájlt, mindegyik sorszámát beolvassa a PR bázisából a `git show` használatával, és csak akkor
minősíti sikertelennek a fájlt, ha az nagyobbra nő, mint az alapérték szerinti felső korlátja
(`frozen` / `testFrozen`, illetve az alapértéken kívüli fájloknál `cap` / `testCap`) és a bázisbeli
mérete közül a nagyobbik. Ezért egy már a bázison eltért fájl soha nem tesz sikertelenné egy
vétlen PR-t.

A `check:boundary:ratchet` ugyanezt a szabályt alkalmazza az egyetlen számára
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): PR-eseményeknél mind a
`quality.yml` gyors ellenőrzései, mind a `ci.yml` lintelési feladata átadja a PR alapjának SHA-ját, az alapcommit
mérése egy `git archive`-exportból történik, és a PR csak akkor bukik meg, ha az `open-sse → src` éleinek
száma meghaladja a `metrics.boundaryOpenSseToSrc` értéke és az alapon mért szám közül a nagyobbat. A felső
korlátot meghaladó alapeltolódást jelzi (`base drift herdado`), de emiatt egy vétlen PR soha nem bukik meg; a push → main
megtartja az abszolút felső korlátot, egy feloldhatatlan alap-SHA esetén pedig figyelmeztetés mellett erre áll vissza.

A `workflow_dispatch` futtatásoknak, a kiadás előtti teljes zöld ellenőrzésnek és az éjszakai tartalékfeladatnak nincs PR-alapja,
ezért megtartják az abszolút (globális) összehasonlítást. A lefedettség, a duplikáció és a típuslefedettség egyelőre globális
marad (az eszközeik nem állítanak elő olcsón fájlonkénti különbséget) — ezek ugyanilyen kezelésre jelöltek.

**A fázis lezárása a v4.0 verziónál (LTS = a korábbinál szigorúbb, nem „vissza a normál állapotba”)**

1. A tiszta `release/v4.0.0` ágcsúcson: dokumentálás céljából `npm run quality:headroom --json`, majd
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, valamint minden typecheck-kapu
   `--update` opcióval — minden alapérték a mért értékre csökken.
2. Törölje a `_policy` elemet a `quality-baseline.json` fájlból (újra aktiválja a `--require-tighten` ellenőrzést és az éjszakai
   tartalékolást), és állítsa vissza a `THRESHOLD = 36` értéket (vagy magasabbat) a `check-openapi-coverage.mjs` fájlban.
3. Ahol a modularizálás kifizetődött, szigorítsa a határértékeket a mért értékeken túl: a fájlméret `cap` értéke legyen ismét 1000
   (vagy 800), a lefedettségi minimumok +5, a nem használt exportok száma pedig 0 a modularizált csomagoknál.

## Ratchet-alapérték (`quality-baseline.json`)

A ratchet-motor (`scripts/quality/check-quality-ratchet.mjs`) beolvassa a `quality-baseline.json`
fájlt, és összehasonlítja a frissen összegyűjtött `quality-metrics.json` fájllal. Ha bármelyik
metrika az epszilonján túl romlik, a build sikertelen lesz.

Jelenleg követett metrikák:

| Metrika               | Irány  | Jelentés                                   |
| --------------------- | ------ | ------------------------------------------ |
| `eslintWarnings`      | `down` | Az ESLint-figyelmeztetések száma nem nőhet |
| `coverage.statements` | `up`   | Az utasításlefedettség nem csökkenhet      |
| `coverage.lines`      | `up`   | A sorlefedettség nem csökkenhet            |
| `coverage.functions`  | `up`   | A függvénylefedettség nem csökkenhet       |
| `coverage.branches`   | `up`   | Az áglefedettség nem csökkenhet            |

Az alapérték frissítése valódi javulás után:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

A `--update` jelző az aktuálisan mért értékeket írja a `quality-baseline.json` fájlba.
Ezt a fájlt a metrikát javító módosítással együtt commitolja. Ha egy PR javít egy
metrikát az alapérték frissítése nélkül, azt a `--require-tighten` észleli (6A.5. fázis,
megvalósításra vár).

### CodeQL-ratchet: frissítési gyakoriság és kézi indítás

A `check:codeql-ratchet` a **tároló ütemezetten frissített állapotát olvassa — nem PR-enként.**
A `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` a következőt jelenti:
`state: configured`, `schedule: weekly`: ez a GitHub alapértelmezett beállítású vizsgálata,
nem pedig pushonkénti elemzés. Következmény: egy riasztásokat JAVÍTÓ PR egyesítése után a
ratchet továbbra is a régi, magasabb számot olvassa a következő ütemezett vizsgálat
lefutásáig — ezért minden nyitott PR esetében regressziót jelez, beleértve a javító PR
utólagos módosításait is, amíg a vizsgálat utol nem éri az állapotot.

**Kézi frissítés**: a `gh workflow run codeql.yml --ref release/vX.Y.Z` perceken belül
újrafuttatja az elemzést, és ismét közzéteszi a riasztásokat. Először olvassa el a
`.github/workflows/codeql.yml` fájlt — a fejlécében szerepel, hogy **azért csak
`workflow_dispatch` használatával indítható, mert ütközik a GitHub „alapértelmezett
beállításával”** (`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`).
A `push`/`pull_request`/`schedule` eseményindítók visszaállításához először **tulajdonosi
műveletre van szükség**: Beállítások → Kódbiztonság → CodeQL: Alapértelmezett → Speciális.
E váltás nélkül ne adjon hozzá `schedule:` eseményindítót — az csak sikertelen futásokat
eredményez.

**A darabszám csökkenése után szigorítsa az alapértéket** — a `node scripts/check/check-codeql-ratchet.mjs
--update` az újonnan mért darabszámot a `quality-baseline.json` →
`metrics.codeqlAlerts.value` mezőbe írja, így a ratchet nem engedélyezi észrevétlenül,
hogy a szám visszanőjön a régi felső határig. Kidolgozott példa (2026-09-02/03): a #12502
PR 7 valódi riasztást javított (13 → 6 mért nyitott riasztás); a #12530 PR a rögzített
alapértéket 11-ről 6-ra szigorította, hogy megfeleljen ennek; a fennmaradó 6 riasztást
ezután riasztásonkénti indoklással elutasították, így 0 maradt nyitva.

**Az elutasítás az üzemeltető döntése (14. szigorú szabály)** — soha ne utasítson el
CodeQL-riasztást anélkül, hogy az elutasítási megjegyzésben rögzítené a műszaki indoklást:
`won't fix` külső protokollkövetelmény esetén, `used in tests` teszt-fixtúra esetén,
`false positive` pedig olyan tisztítómechanizmus esetén, amelyet a CodeQL nem képes
észlelni (előzmény: `docs/security/ERROR_SANITIZATION.md`).

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

Minden olyan ellenőrzés, amely nem bukhat el már meglévő szabálysértések miatt, rögzített engedélyezési listát használ
(pl. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). A szabályzat:

**A kiváltó okot javítsd ki; az engedélyezési listát csak akkor használd, ha a szabálysértés már korábban is fennállt, és
nem javítható ki ugyanabban a PR-ban.**

Amikor bejegyzést adsz egy engedélyezési listához:

1. Mellékelj egy megjegyzést az indoklással.
2. Hivatkozz a nyomonkövetési feladatra (pl. `// #3498 — Phase 2 feature, not yet implemented`).
3. A szabálysértést javító PR-ban távolítsd el a bejegyzést is — az olyan elavult bejegyzés, amely már nem
   nyom el aktív szabálysértést, önmagában is hiba (a 6A.3 elavult szabálykikényszerítési ellenőrzése a megvalósítása után
   hibára fut majd az árva engedélyezésilista-bejegyzéseknél).

**Ne** adj hozzá bejegyzéseket az engedélyezési listához csak azért, hogy a tesztek gyorsabban sikeresek legyenek. Egy sikeres ellenőrzés egy folyamatosan növekvő
engedélyezési listával csak a minőség hamis látszatát kelti.

### Amikor egy ellenőrzés sikertelen a PR-odon

1. **Olvasd el figyelmesen az ellenőrzés kimenetét** — pontosan megadja, melyik fájl vagy szimbólum sértette meg
   a szabályt.
2. **Javítsd ki a szabálysértést** — a legtöbb ellenőrzés determinisztikus fájlrendszer-ellenőrzés, amely azonnal sikeres lesz,
   amint a kód helyes.
3. **Ha a szabálysértés már korábban is fennállt** (azaz nem te vezetted be, de az ellenőrzés most már
   kiterjed rá): adj hozzá egy engedélyezésilista-bejegyzést indokló megjegyzéssel és egy nyomonkövetési feladatra való hivatkozással.
4. **Ha az ellenőrzés egy racsnis küszöbérték-ellenőrzés** (lefedettség, ESLint-figyelmeztetések, duplikáció, komplexitás):
   a módosításod rontotta a mérőszámot. Javítsd ki a kiváltó problémát, vagy — ritka esetben — futtasd az
   `npm run quality:ratchet -- --update` parancsot, ha a módosítás szándékos, és a mérőszám romlása
   elfogadható — de dokumentáld ennek okát a PR leírásában.
5. **A tájékoztató jellegű ellenőrzések** (`continue-on-error: true`) csak információs célúak — nem akadályozzák
   az összevonást, de megjelennek a CI összefoglalójában. Ennek ellenére javítsd ki őket.

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

## Racionalizálási hátralék (ROI-felülvizsgálat — 9. fázis, 3. hullám)

Ez a leltár 2026-06-17-én össze lett vetve a `ci.yml` fájllal (az előző verzióból kimaradt az
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Az egyeztetett készlet ROI-felülvizsgálata
az alábbi racionalizálási jelölteket azonosította. **Az összevonások mechanikus CI-módosítások;
az átállítások és eltávolítások az üzemeltető számára fenntartott szabályzati döntések.** Az
alábbiak közül még semmi sincs alkalmazva.

**A fentiekben szintén nincs dokumentálva** (tanácsadó jellegű, alacsony jelértékű): a `docs-lint` feladat
(markdownlint + Vale, a teljes feladatra érvényes `continue-on-error`), valamint az önálló ellenőrzési munkafolyamatok:
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. A `semgrepFindings: 0` szerepel a
`quality-baseline.json` fájlban, de nincs blokkoló racsnihoz kötve a `ci.yml` fájlban — a metrika
jelenleg árva.

### Összevonás / deduplikálás (mechanikus, alacsonyabb kockázat)

Minden jelöltet ellenőriztünk a 2026-06-17-i aktuális kapuállapot alapján (bízz, de ellenőrizd);
több „kézenfekvő” összevonásról kiderült, hogy rejtett adósságot takar, ezért **nem** helyettesíthető tisztán.

- **A `check:docs-sync` kétszer fut** — önállóan a `lint` feladatban, majd újra a `check:docs-all` részeként (`docs-sync-strict`), illetve a husky pre-commit hookban. ✅ **KÉSZ** — az önálló `lint`-meghívás eltávolítva.
- **CVE-ellenőrzés** — ❌ **NEM vonható össze tisztán.** Az `audit:deps` mind az öt lockfile esetén blokkolja a kritikus figyelmeztetéseket és a hiányos auditokat, míg a magas súlyosságú figyelmeztetéseket a jelenlegi szabályzat szerint figyelmeztetésként jelenti; a `check:vuln-ratchet` (osv) csak akkor bukik el, ha _visszaesés_ történik a verziókövetésben tárolt alapértékhez képest, és szükség esetén elutasítja a hiányzó méréseket. Eltérő szemantika — az `audit:deps` eltávolításával elveszne az abszolút kritikus kapu és a független csomagauditok bizonylatai. Mindkettőt meg kell tartani.
- **Ciklusészlelés** — ✅ **KÉSZ** (#15159 G-01/G-02). Az itt szereplő régi szöveg a `check:cycles` ellenőrzést „zöld, gondosan válogatott” kapunak nevezte, és azzal indokolta a blokkoló állapot megtartását, hogy a `check:circular-deps` (dpdm) 91 ciklust jelentett. Ez a zöld állapot **hamis pozitív zöld** volt: a `check:cycles` 5 alkönyvtárat vizsgált (450 fájl), csak a statikus `import|export … from` mintákra illeszkedett, és minden `@/`, valamint `@omniroute/open-sse/` specifikátort elvetett, ezért nem láthatta a repót uraló dinamikus importálási és aliasciklusokat. Javítva: a kapu most bejárja az `src` + `open-sse` könyvtárakat (5023 fájl), a specifikátorokat a TypeScript AST-ből gyűjti (így az `import("…")` számít, míg a típuspozícióban lévő `typeof import("…")` nem), és feloldja a tsconfig `paths` beállításait. **14** ciklust talál, nem 0-t. Mivel 14 már meglévő ciklus nem javítható ki egy kapu-PR-ben, a `check:cycles` mostantól **racsni** (`--ratchet`, a felső korlát `metrics.cycles.value = 14` a `quality-baseline.json` fájlban, `direction: down`) — minden _visszaesést_ blokkol, és az érték csak csökkenhet. A CI az `npm run check:cycles:ratchet` parancsot futtatja. A fokozatos csökkentés az **A-01** részeként történik. A `check:circular-deps` (dpdm) szélesebb körű második véleményként tanácsadó jellegű marad.
- **Komplexitás** — ✅ **KÉSZ** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): egyetlen ESLint-bejárás, szabályazonosító (`ruleId`) szerinti számlálással, így a ciklomatikus komplexitás + maximális sorszám és a kognitív alapértékek függetlenek maradnak; az egyedi `check:complexity` / `check:cognitive-complexity` ellenőrzések megmaradnak a helyi `--update` használatához.
- **`/api` hallucináció elleni védelem** — ✅ **KÉSZ** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): a `src/app/api` egyetlen fájlrendszer-leltározása; az openapi-routes + docs-symbols továbbra is egymástól függetlenül jelent; az egyedi ellenőrzések megmaradnak helyi futtatásra.
- **A `check:node-runtime` 11 feladatban fut** — ⚠️ **alacsony ROI.** Mindegyik külön futtatókörnyezet, az ellenőrzés pedig <1 másodperc; a teljes megtakarítás ~10 másodperc lenne, cserébe elveszne egy olcsó, feladatonkénti védőkorlát. Nem éri meg a felfordulást.
- **`typecheck:noimplicit:core` a CI lintben** — ✅ **eltávolítva a lint feladatból** (tanácsadó jellegű `continue-on-error` volt); a blokkoló típusfelületet a `typecheck:core` + `check:type-coverage` adja. A helyi szkript megmaradt.

### Átállítás / döntés (üzemeltetői szabályzat)

- `check:openapi-security-tiers` (tanácsadó jellegű) — ❌ **NEM állítható át tisztán.** 0-s kilépési kóddal fejeződik be, de arra figyelmeztet, hogy a `LOCAL_ONLY_API_PREFIXES` alatti több `traffic-inspector` útvonalról hiányzik az `x-loopback-only: true` annotáció. A kikényszerítéshez először hozzá kell adni ezeket az annotációkat az `openapi.yaml` fájlhoz.
- `typecheck:noimplicit:core` (tanácsadó jellegű) — nagyrészt kiváltja a blokkoló `check:type-coverage` racsni. Állítsa át racsnivá, vagy távolítsa el a redundáns második `tsc` futást.
- `test:vitest:ui` (most már **blokkoló**) — a már meglévő hibák kifejezetten ki vannak zárva a `vitest.config.ts` fájlban `// #8618` nyomonkövetési megjegyzésekkel; az új hibák megbuktatják a feladatot.
- `check:secrets` (gitleaks, blokkoló racsni) — a jelenlegi felső korlát a `metrics.secretFindings` a `quality-baseline.json` fájlban. Minden kivételhez indokolt `.gitleaks.toml` bejegyzés szükséges; a nem elérhető mérés INCOMPLETE. A vizsgálat kiegészíti a GitHub natív titokellenőrzését és a `check:public-creds` ellenőrzést.
- `check:pr-evidence` (blokkoló, grep segítségével vizsgálja a PR-törzs prózáját) — magas a hamis pozitív találatok kockázata; eltávolítása gyengítené a 18. szigorú szabály kikényszerítését, ezért ez valódi szabályzati döntés.
- `semgrep` (tanácsadó jellegű, önálló) — az OWASP-családok esetén átfedésben van a CodeQL-lel; az alapértékét racsnihoz kell kötni, vagy el kell távolítani.

---

## Kapcsolódó dokumentáció

- Ellátási lánc (eredetigazolás, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kulcskészlet-paritási kapu

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, `i18n-ui-coverage` feladat).
Összehasonlítja minden `src/i18n/messages/<locale>.json` levélkulcsainak készletét az `en.json`
kulcsaival, és hibát jelez bármely hiányzó vagy többletkulcs esetén, függetlenül attól, hogy a kulcsot
mikor adták hozzá. A `__MISSING__:` helyőrzők jelen lévőnek számítanak (a tartalmuk az aránykapu
hatáskörébe tartozik). Ez a két diffalapú/százalékos kapu abszolút kiegészítője: a
`check-ui-keys-coverage` területi beállításonként 80 %-os alsó korlátot követel meg (a ~13 000-ből
43 hiányzó kulcs még mindig 99,7 %-ot mutat), a `check-new-key-coverage` pedig csak azokat a
kulcsokat vizsgálja, amelyeket egy PR ad hozzá az `en.json` fájlhoz. Egy területi köteget az adott
nap `en.json` fájljából állítanak elő, amikor a hozzá tartozó ágat létrehozzák, majd napokon át
fordítják, miközben az alapágon továbbra is új kulcsok jelennek meg; maga a köteg PR-je nem ad hozzá
kulcsot, ezért egyik rokon kapu sem jelzett, amikor az 1. köteg (#13044) kilenc területi beállításban
43 kulccsal kevesebbel, a 2. köteg (#13660) pedig nyolcban 10 kulccsal kevesebbel került be
(2026-09-15). A hibát a
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` paranccsal javítsa; egy
`extra` levélkulcs azt jelenti, hogy a forrásból eltávolították — törölje a területi beállításból.
A `--warn` hibajelzés nélkül készít jelentést. A `--catalog=cli` ugyanazt az összehasonlítást futtatja
a `bin/cli/locales` tartalmán (`npm run i18n:check-keys:cli`); mindkét lépés az
`i18n-ui-coverage` feladatban található.

#### `check-new-key-coverage` — új kulcsokra vonatkozó i18n-kapu

A `check-ui-value-drift` rokonkapuja. Az utóbbi azt észleli, ha egy angol értéket **átírtak**,
miközben a fordításai változatlanok maradtak; ez pedig azt észleli, ha egy angol kulcsot
**hozzáadtak**, de egyes területi beállítások soha nem kapták meg.

A `check-ui-keys-coverage` nem képes észlelni ezt az esetet: területi beállításonként százalékos
alsó korlátot követel meg, és a ~13 000-ből tizenegy hiányzó kulcs mellett a lefedettség még mindig
99,9%. A nyelvenkénti százalékos érték nem képes kifejezni, hogy „ez a funkció fordítás nélkül
jelent meg” — egy teljes funkció kerülhet szöveg nélkül egy új területi beállításba úgy, hogy a
számérték meg sem változik.

Az itt rögzített incidens: az Orchestration Canvas 3. fázisának tizenegy kulcsát lefordították az
akkor létező 42 területi beállításra. Órákkal később az uniós nyelvi köteg (#13044) 51-re növelte a
tárolóban lévő területi beállítások számát, és a kilenc új (`el`, `et`, `ga`, `hr`, `lt`, `lv`,
`mt`, `sl`, `sr`) soha nem kapta meg ezeket. A `deepMergeFallback` egy hiányzó kulcs helyett az
angol szöveget használja, így a hiba nem üres, hanem lefordítatlan felhasználói felületként
jelentkezett — valós problémaként, amely kialakításából adódóan észrevétlen maradt.

Rokonkapujához hasonlóan ez is **différzékeny**: az egyesítési alap angol szövegét hasonlítja össze
a munkafával, így a már korábban meglévő hiányosságok változatlanok maradnak, és a kapu
bekapcsolásához nem volt szükség migrációra.

**Egy `__MISSING__:<english>` jelölő nem elégíti ki a feltételt (2026-09-17 óta).** Korábban ez volt
a dokumentált halasztási módszer — futásidőben a rendszer visszaáll a helyes angol szövegre —, amíg
2026-09-16-án nyolc funkció-PR 61 kulcsot adott hozzá, és fordítás helyett mind a 65 területi
beállításban elhelyezte a jelölőt: ez a kapu mindegyiket elfogadta, semmi sem blokkolta a PR-eket,
majd a kiadási ág csúcsán mindenkinél meghiúsult a valódi fordítások arányát blokkoló kapu
(pt-BR 3,2 % > 2,5 % + 0,5). A jelölő mostantól hiányzó fordításnak minősül. A hibát a
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`
paranccsal javítsa, vagy az összes területi beállítást párhuzamosan az
`npm run i18n:translate-new-keys` használatával (`scripts/i18n/translate-new-keys.sh`,
leválasztott állapotban is biztonságos, és az `OMNIROUTE_TRANSLATION_*` környezeti változók nélkül
nem hajlandó elindulni). Azoknak a kulcsoknak, amelyeknek angolul kell maradniuk (rögzített
termék-, motor- vagy jelzőnevek), a `scripts/i18n/untranslatable-keys.json` fájlban van a helyük,
soha nem egy jelölő mögött. A `vi` teljesen tiltja a jelölőket
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — félretett tesztek kapuja

A `vitest.config.ts` `exclude` listáján szereplő fájl olyan teszt, amely nem fut le, miközben a
fát olvasók számára úgy tűnik, mintha lefedettséget biztosítana. Hatvankét fájl halmozódott fel a
`// #8618 — pre-existing failure; remove this exclusion when fixed` megjegyzés mögött. A #8618-as
hibajegyet 2026-08-11-én lezárták, miközben az általa nyomon követett lista 45-ről 62 bejegyzésre
nőtt, és minden új bejegyzés egy már lezárt hibajegyre mutató megjegyzést örökölt. Amikor a listát
végül fájlonként felmérték (#13204), **a 62-ből 51 a forrás bármilyen módosítása nélkül sikeresen
lefutott az aktuális fán**.

A kapu megköveteli, hogy minden valódi fájlra feloldható kizárás (a) megnevezzen egy nyomon követési
hibajegyet, és (b) szerepeljen a `config/quality/vitest-exclusions.json` fájlban a mért állapotával
együtt, így egy kizárás hozzáadása egy erre szolgáló fájl áttekinthető diffje lesz, nem pedig egy
újabb sor egy 60 bejegyzéses tömbben. Szándékosan nem futtatja újra a kizárt teszteket — ez
körülbelül 10 percet vesz igénybe, és egy időszakos feladathoz tartozik; a leltár rögzíti, hogy
mikor mérték fel őket legutóbb.
