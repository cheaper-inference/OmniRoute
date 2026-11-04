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

## Kapuinventár és végrehajtási profilok

### Jelöltek befogadása

A CI és a Quality Gates munkafolyamatok egyaránt stabil eredményt adnak: `Gate / CI` és
`Gate / Quality`. A verziózott befogadási szabályzat minden upstream-feladatot kötelezőként
vagy tanácsadóként sorol fel. Egy alkalmazandó kötelező feladatnak sikeresnek kell lennie:
a hiányzó, megszakított, kihagyott, függőben lévő és ismeretlen eredmények nem állapíthatnak meg PASS
eredményt. Egy érvényes, csak dokumentációt vagy csak katalógust érintő besorolás
alkalmazhatatlanná tehet egy kódsávot; egy piszkozat PR nem elfogadott jelölt. A `hotfix`
címke nem mentesít a bizonyítékok alól.

Mindkét munkafolyamat lefedi a main/release ágakra irányuló PR-eket, a `main` ágra történő
pushokat, a manuális indítást és a merge-group eseményeket. A push, a dispatch és a merge-group
a teljes kiválasztást futtatja. A `release/**` ágra történő pushok nem indítják el őket
(2026-10-18): minden módosítás már lefutott a mátrixon a hozzá tartozó PR-ben,
az egyesített kombináció pedig a Release-Green feladata (`docs/ops/RUNNER_BOX.md` → Hosztolt sáv).
A forkok és a merge groupok hosztolt futtatókat használnak azokhoz a feladatokhoz, amelyek egyébként
saját üzemeltetésű futtatókat választanának; a bevezetés előtt ellenőrizni kell a megfelelő hosztolt
kapacitás rendelkezésre állását.

Minden JSON-nyugta azonosítja a kijelentkezett SHA-t, a munkafolyamat-futtatást és a próbálkozást.
A CLI elutasítja a checkout-/esemény-SHA eltérését. A munkafolyamat-tesztek a szabályzattagságot
az eredményfeladat `needs` listájához kötik, így egy új vagy eltávolított sáv nem tűnhet el
észrevétlenül. A nyugták a saját munkafolyamatukat fedik le, nem a közzétételt, az üzembe helyezést
vagy egy meglévő tanácsadó szkenner belső működését. Mindkét ellenőrzési név aktiválása az ág
szabályaiban külön adminisztratív módosítás; ezeknek a feladatoknak a hozzáadása önmagában nem védi
az ágat.

### Statikus vizsgálati leltár

A verziózott npm-alias-leltár és a statikus vizsgálat tagsága a
`config/quality/gate-manifest.json` fájlban található. Futtassa a `npm run check:gate-manifest`
parancsot a parancsfájlnevek és a pontos parancsok `package.json` fájllal való ellenőrzéséhez;
a hozzáadások, eltávolítások és a parancsok eltérései meghiúsítják mind a helyi hookot, mind
a CI módosításbesorolási feladatait. Egy alias nem munkafolyamat-feladat, mátrixpéldány vagy
teszteset: ezeket a számokat nem szabad egymással felcserélhetőként bemutatni.

A `npm run quality:scan -- --list` vagy a `npm run quality:scan:fast -- --list` paranccsal
ellenőrizheti a kiválasztott aliasokat azok végrehajtása nélkül. A futtató az npm belépési pontot
hívja meg, ezért annak futtatókörnyezete (beleértve a konfigurált Bunt is) megmarad.
A manifest külön meghívottként rögzíti az e profilokon kívüli aliasokat, a karbantartási parancsok
pedig tiltottak a csak olvasható vizsgálati profilokban.

Ezek a profilok csak a statikus vizsgálatot fedik le. Nem tanúsítják a termékteszteket, a
lefedettséget, a csomagolást, a külső ellenőrzéseket vagy egy jelölt teljes kiadási elfogadását.
A munkafolyamat-befogadás a kapcsolódó `config/quality/admission-policy.json` és
`scripts/quality/admission-verdict.mjs` fájlokat használja. A Release-observer profilok külön
maradnak; alkalmazandó ellenőrzéseiket és nyugtáikat egymástól függetlenül vizsgálja meg.
Az alábbi szöveges leltár hivatkozási alap, nem bizonyíték arra, hogy egy kapu ténylegesen lefutott.

A parancsfájlok a `scripts/check/` (szabályzati kapuk) és a `scripts/quality/` (ratchet-motor)
alatt találhatók. A CI hiteles forrása a `.github/workflows/ci.yml`.

### Kiadási PR gyorsút (`quality.yml`)

A `.github/workflows/quality.yml` kiegészíti a CI-t a main/release PR-ek, a `main` ágra történő pushok,
a dispatch és a merge groupok esetében. A PR-ek útvonal alapján szűrt gyors ellenőrzéseket használnak.
A véglegesen letiltott, ismétlődő build eltávolításra került; a tényleges build-, csomagolási- és
indítási ellenőrzések továbbra is a CI-ban maradnak.

| Feladat                                          | Hatókör                                                                                                                                                                                                                              | Blokkoló                      |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| `Docs Gates (fast-path)`                         | Dokumentációs/kód PR-ek; API-dokumentációs hivatkozások és az összes dokumentáció                                                                                                                                                    | Igen                          |
| `Fast Quality Gates`                             | Kód PR-ek; statikus ellenőrzések, típusellenőrzés, irányítópult-típusellenőrzés, érintett egységtesztek                                                                                                                              | Igen                          |
| `Forgotten sibling tests`                        | Kód PR-ek; a statikus fogyasztókhoz visszakövetett módosított modulok és a jelölt testvértesztek; a barrel- és dinamikus importútvonalak tanácsadó diagnosztikaként jelennek meg, a hivatkozott engedélyezőlista-kivételekkel együtt | **Tanácsadó**                 |
| `Vitest (fast-path)`                             | Kód PR-ek; gyors vitest-csomag                                                                                                                                                                                                       | Igen                          |
| `Unit Tests fast-path`                           | Kód PR-ek; 4 shardos egységteszt-csomag                                                                                                                                                                                              | Igen                          |
| `No new ESLint warnings`                         | Kód PR-ek; az elnyomásokat figyelembe vevő lint-őrszem                                                                                                                                                                               | Igen, a forkokat is beleértve |
| `Merge integrity (changelog + generated skills)` | Nem piszkozat PR-ek; változásnapló- és generáltkészség-szinkronizálás                                                                                                                                                                | Igen, a forkokat is beleértve |

#### Elfeledett testvértesztek jelentése

`npm run check:forgotten-sibling-tests` újra felhasználja a tesztek hatástérképét működtető importfeloldót.
Minden módosított éles modult illetően determinisztikus
`changed module/symbol -> static consumer -> candidate sibling test` láncokat jelez, amikor a jelölt
teszt hiányzik a pull request diffjéből. A Markdown-összefoglaló és a JSON-eredmény a
`forgotten-sibling-tests` munkafolyamat-artefaktumaként megmaradnak a blokkoló bevezetés előtti
kalibrációhoz.

A barrel-újrakiexportálások és a dinamikus importok csak feloldási diagnosztikák; soha nem hoznak létre
blokkoló találatot. Az ellenőrzött kivételek a
`config/quality/forgotten-sibling-allowlist.json` fájlban találhatók. Minden bejegyzésnek meg kell neveznie a fogyasztót és a jelölt
tesztet, konkrét indoklást kell adnia, valamint egy GitHub-problémára vagy pull requestre kell hivatkoznia. A hibásan formázott bejegyzések esetén a rendszer biztonságosan leáll. A kivételek nem rejthetnek el törölt jelölt tesztet, illetve olyan diffet, amely `.skip`/`.todo` hozzáadását tartalmazza;
az állítások gyengítése és az egyéb elfedések továbbra is a függetlenül blokkoló
`check:test-masking` kapu hatáskörébe tartoznak.

### Feladat: `lint`

Minden `main` ágra irányuló PR-en lefut. Hiba esetén blokkolja az összevonást.

| Script (`npm run ...`)            | Ellenőrzi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Blokkoló                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| `check:node-runtime`              | A Node.js-verzió a támogatott tartományon belül van                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Igen                                          |
| `check:cycles`                    | Körkörös importálások a teljes `src/` + `open-sse/` területen (AST-alapú, a tsconfig `paths` feloldva). A Bare mindig 1-es kóddal lép ki, ha bármilyen ciklus létezik (a #15281 óta fail-closed), és felsorolja az SCC-ket. A `check:cycles:ratchet` (ezt futtatja a CI) blokkol, ha a ciklusok száma meghaladja a `quality-baseline.json` fájlban szereplő `metrics.cycles` felső korlátot — jelenleg 14, `direction: down`, ezért csak csökkenhet (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Igen (ratchet)                                |
| `check:boundary`                  | `open-sse → src` csatolás: az engine-ből az alkalmazásba irányuló egyedi fájlszintű importálások (`scripts/quality/measure-boundary.mjs`; az él-lista a v4 core/module-split helyreállítási feladatlistája). A Bare tájékoztató jelentést készít (ugyanaz, mint a `quality:boundary`). A `check:boundary:ratchet` (ezt futtatja a CI, és a `quality.yml` fast-gates ratchet ciklusában is szerepel) blokkol, ha a szám meghaladja a `quality-baseline.json` fájlban szereplő `metrics.boundaryOpenSseToSrc` felső korlátot — a mért 771 értékkel lett inicializálva, `direction: down`; a `--update` csak csökkentheti; PR-ek esetén az alaphoz viszonyított (`--base-ref`, lásd alább)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Igen (ratchet)                                |
| `check:route-validation:t06`      | A Zod-sémák minden útvonalon jelen vannak (Tier 6 szabályzat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Igen                                          |
| `check:any-budget:t11`            | Az `@ts-expect-error // any` darabszáma nem haladja meg a keretet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Igen                                          |
| `check:provider-consistency`      | A `providers.ts` minden provideréhez tartozik megfelelő bejegyzés a `providerRegistry.ts` fájlban (és fordítva, az engedélyezési listán belül)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Igen                                          |
| `check:model-lifecycle`           | A három kézzel karbantartott útválasztási tábla összhangban marad a bejelentkezett életciklus-pillanatképpel (#11503): a `FITNESS_TABLE` (`taskFitness.ts`) nem pontoz olyan visszavont azonosítót, amelyet a `REGISTRY` továbbra is útválasztani tud; minden `BUILT_IN_ALIASES` célja megtalálható a `REGISTRY`-ben, és hiányzik a visszavont azonosítók pillanatképéből; minden, a `REGISTRY`-ben még szereplő visszavont azonosító továbbításra kerül, vagy szerepel az `allowedRetiredInCatalog` listában; továbbá a `DEFAULT_DEGRADATION_MAP` egyetlen forrása vagy célja sem szerepel visszavontként ebben a pillanatképben. Ez nem bizonyítja, hogy egy modellt jelenleg kiszolgál egy aktív upstream. Offline — a `config/quality/model-lifecycle.json` fájllal hasonlítja össze, amelyet kézzel frissít a `npm run quality:refresh-model-lifecycle` (hálózat; nincs bekötve a CI-ba). Az `allowedRetiredInCatalog` egy fokozatos leépítést biztosító ratchet: csak nyomonkövetési feladattal együtt adjon hozzá bejegyzést.                                                                                                                                                                                                       | Igen                                          |
| `check:fetch-targets`             | A kliensoldali `src/` minden `fetch("/api/...")` hívása valódi `route.ts` fájlra oldódik fel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Igen                                          |
| `check:deps`                      | A repó minden `package.json` fájljában szereplő, `npm install` paranccsal telepíthető függőség megtalálható a `dependency-allowlist.json` fájlban; az új, verziórögzítés nélküli vagy slopsquatted csomagokat jelzi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Igen                                          |
| `audit:deps`                      | `npm audit` (gyökér + electron) — nincsenek magas vagy kritikus súlyosságú biztonsági tanácsok (átfedés az osv `check:vuln-ratchet` ellenőrzésével; lásd a Rationalization Backlogot)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Igen                                          |
| `check:lockfile`                  | A `package-lock.json` integritása — HTTPS-regisztráció, integritási hash-ek, hostfelülírások nélkül                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Igen                                          |
| `check:licenses`                  | SPDX-licencengedélyezési lista éles függőségekhez                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Igen                                          |
| `check:tracked-artifacts`         | Nincsenek buildelési artefaktumok / verziókövetésbe vett `node_modules` szimbolikus hivatkozások (a husky pre-commit során is lefut; a pre-push szándékosan minimális — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Igen                                          |
| `check:ai-attribution`            | Nincs AI-/bot-eredetű `Co-Authored-By` trailer vagy AI-generálási lábléc a PR commitjaiban, címében vagy törzsében — Hard Rule #16 (a `quality.yml` fast-gates ciklusában a PR→`release/**` esetén — az esemény payloadját olvassa, PR-eken kívül nincs művelet —, valamint PR-specifikus lépésként a `ci.yml` lintben PR→`main` esetén; továbbá a husky `commit-msg` hookban; emberi társszerzők engedélyezettek; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:vitest-exclusions`         | Minden Vitest-kizárás megnevez egy követési issue-t, és szerepel a `config/quality/vitest-exclusions.json` fájlban (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Igen                                          |
| `check:file-size`                 | A forrásfájlok (`.ts`/`.tsx` a `src/`, `open-sse/`, `electron/`, `bin/` könyvtárakban) a `cap` értékén belül maradnak, a tesztfájlok (`*.test.ts(x)`) pedig a `testCap` értékén belül; a `file-size-baseline.json` fájlban rögzített (`frozen` / `testFrozen`) fájlok mérete nem haladhatja meg a rögzített méretet                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Igen                                          |
| `check:error-helper`              | Az executorok/handlerek hiba-válaszai a `buildErrorBody()` / `sanitizeErrorMessage()` függvényeket használják (12. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Igen                                          |
| `check:migration-numbering`       | A migrációs SQL-fájlok sorszámozása folyamatos, nincsenek hiányzó vagy duplikált számok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Igen                                          |
| `check:public-creds`              | A `publicCreds.ts` fájlon kívül nem találhatók literális OAuth `client_id`/`client_secret` vagy Firebase webes kulcsok (11. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Igen                                          |
| `check:db-rules`                  | A `src/lib/db/` modulokon kívül nincs nyers SQL; nincsenek barrel-importok a `localDb.ts` fájlból (2./5. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Igen                                          |
| `check:known-symbols`             | A dispatch-tábláikban regisztrált szolgáltatói executorok, útválasztási stratégiák és fordítók megfelelnek a lemezen található fájloknak — nincsenek árva vagy deklarálatlan szimbólumok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                          |
| `check:route-guard-membership`    | Minden olyan útvonalat, amely gyermekfolyamatot indít, az `isLocalOnlyPath()` alapján kell besorolni (15./17. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Igen                                          |
| `check:test-discovery`            | A tároló minden `*.test.ts` / `*.spec.ts` fájlját legalább egy tesztfuttató összegyűjti (ratchet: a `test-discovery-baseline.json` árva fájljainak listája csak szűkülhet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen                                          |
| `check:test-tla-order`            | A `tests/unit` alatti egyetlen `node:test` fájl sem regisztrál tesztet, ér el egy legfelső szintű `await` kifejezést, majd regisztrál további teszteket (#18045; ratchet: a `test-tla-order-allowlist.json` csak szűkülhet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Igen                                          |
| `check:agent-skills-sync`         | A generált agent-skills-összetevők egyeznek a forráskatalógussal (nincs eltérés)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `check:provider-asset-provenance` | A szolgáltatói logókhoz/eszközökhöz rögzített eredetinformációs bejegyzés tartozik                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | A JSON-konfigurációs fájlok értelmezhetők, és megfelelnek a tároló lintelési szabályainak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `typecheck:core`                  | TypeScript-fordítás hibák nélkül (csak tájékoztató jellegű figyelmeztetések)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Igen                                          |
| `typecheck:noimplicit:core`       | Szigorú `noImplicitAny` — előretekintő ellenőrzés; sok korábban meglévő hívási helyhez még annotációk szükségesek                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **Figyelmeztető** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | A `tsc` a `src/app/(dashboard)/**` hatókörére korlátozva (#7033) — a `typecheck:core` gondosan összeállított, 27 fájlból álló engedélyezési listája egyetlen dashboard TSX-fájlt sem tartalmaz, a `next build` pedig szintén nem végez típusellenőrzést rajta (`next.config.mjs` az `ignoreBuildErrors: true` beállítást adja meg), ezért az ottani, elárvult azonosítókhoz kapcsolódó regressziók (#6625/#6909) láthatatlanok maradtak a CI számára. A `config/quality/dashboard-typecheck-baseline.json` fájlban rögzített, fájlonkénti/TS-kódonkénti számok befagyasztott alapértékéhez hasonlít (ugyanazzal az elavult alapérték-kényszerítési mintával, mint a `check:known-symbols`) — csak az alapértékben szereplő számon FELÜLI ÚJ hibák okozzák az ellenőrzés sikertelenségét; egy korábban meglévő hiba javításakor a számot a `--update` kapcsolóval kell csökkenteni.                                                                                                                                                                                                                                                                                                                                                         | Igen                                          |
| `check:build-typecheck`           | Teljes alkalmazásra kiterjedő éles környezetbeli típusellenőrzés a `tsconfig.build.json` fájlon keresztül (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), amelyet a `typecheck:core` 27 fájlból álló felületi engedélyezési listája és a dashboard-ellenőrzés nem fed le. A `config/quality/build-typecheck-baseline.json` fájlhoz hasonlít; egy új vagy megemelkedett fájl- és kódpáronkénti szám sikertelenséget okoz, egy alacsonyabb szám pedig a szám csökkentésére szólít fel. A `--update` kapcsoló megtagadja a frissítést, amíg a futtatás új vagy megemelkedett párost tartalmaz, kivéve, ha a `--force-regressions` kapcsolót is megadják; továbbá megtagadja egy újonnan elnémított fájl hozzáadását, kivéve, ha a `--force-nocheck` kapcsolót is megadják. Így az alapérték kibővítése a sikeres futtatás érdekében és egy végleges elnémítás engedélyezése két különálló, tudatos döntés. Egy önálló `--force` kapcsolót a rendszer elutasít. Ezenfelül a build hatókörében a `@ts-nocheck` használatát is vizsgálja a `config/quality/ts-nocheck-baseline.json` alapján, mivel az ezt használó fájl egyáltalán nem jelent diagnosztikát, és enélkül láthatatlan maradna minden ellenőrzés számára. | Igen                                          |

#### Két típusellenőrző program eltérő választ ad

A `typecheck:core` és a `check:build-typecheck` eltérő programokat fordítanak, eltérő
beállításokkal, ezért ugyanaz a fájl az egyikben hibamentes, a másikban pedig tele lehet
hibákkal.

A `tsconfig.build.json` a `"strict": false` beállítást adja meg, így a `noImplicitAny`
ki van kapcsolva. A core konfiguráció egy gondosan összeállított, 27 fájlból álló
engedélyezési listát fordít szigorúbb beállításokkal, és minden bejegyzés importálási
gráfját követi, ezért az ottani ellenőrzés olyan fájlokra is kiterjed, amelyek soha nem
jelennek meg a buildprogramban.

Ez fontos következménnyel jár annak megítélésekor, hogy egy fájl típusosan ellenőrzött-e:
**a `check:build-typecheck` alatti nulla diagnosztika nem jelenti azt, hogy nulla**. Az
`@ts-nocheck` eltávolítása 26 fájlból azt mutatta, hogy közülük 23 hibamentes a
buildprogramban; ezek közül tizenhatban körülbelül 120 implicit-any hiba jelent meg a
szigorúbb programban. Mindkettőt ellenőrizd, mielőtt egy fájlt hibamentesnek nyilvánítasz.

### Feladat: `quality-gate`

A `test-coverage` után fut le. Sikertelenség esetén megakadályozza az egyesítést.

| Script                       | Ellenőrzi                                                                                                                                                                                                     | Blokkoló                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `quality:collect`            | Kibocsátja a `quality-metrics.json` fájlt (ESLint-figyelmeztetések száma, az összevont shard-jelentésből származó lefedettség)                                                                                | Igen (a ratchet előfeltétele) |
| `quality:ratchet`            | A `quality-baseline.json` minden metrikája nem romlott (ESLint-figyelmeztetések ≤ baseline; lefedettség ≥ baseline)                                                                                           | Igen                          |
| `check:duplication`          | A kódduplikáció (jscpd@4) nem haladja meg a `quality-baseline.json` fájlban szereplő baseline-értéket                                                                                                         | Igen                          |
| `check:complexity`           | A fájlszintű ciklomatikus komplexitás nem haladja meg a korlátot (az ESLint beépített `complexity` szabálya + `max-lines-per-function`)                                                                       | Igen                          |
| `check:cognitive-complexity` | Kognitív komplexitásra vonatkozó ratchet (`eslint-plugin-sonarjs`) — külön ESLint-futtatás; a CI mindkettőt összevonva, egyetlen `check:complexity-ratchets` lépésként futtatja                               | Igen                          |
| `check:dead-code`            | A nem használt exportok / fájlok ratchetje (knip) nem romlik a baseline-hoz képest                                                                                                                            | Igen                          |
| `check:compression-budget`   | Tömörítési benchmarkkeret — motoronként a tokenmegtakarítási minimumok nem romolhatnak                                                                                                                        | Igen                          |
| `check:type-coverage`        | A tipizáltsági százalék ratchetje (`type-coverage`) nem romlik; nagyrészt magában foglalja a `typecheck:noimplicit:core` ellenőrzést                                                                          | Igen                          |
| `check:codeql-ratchet`       | A nyitott CodeQL-riasztások száma nem romlik (a `gh api` használatával olvassa be; token nélkül szabályosan kihagyja) — a frissítési ütemezésért és a manuális indításért lásd alább a „CodeQL ratchet” részt | Igen                          |

### Feladat: `quality-extended`

A teljes feladat tájékoztató jellegű (`continue-on-error: true`). Az npm-alapú ratchetek
valósan lefutnak; a külső szkennerek a `gh release download` használatával települnek, és
önmagukat kihagyják (0-s kilépési kóddal), ha egy bináris fájl továbbra is hiányzik.

| Script                   | Ellenőrzi                                                                                                                                                                                                                                                        | Blokkoló                                                 |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | Nincsenek körkörös függőségek (dpdm)                                                                                                                                                                                                                             | **Tájékoztató jellegű**                                  |
| `check:bundle-size`      | A bundle mérete nem haladja meg a korlátot                                                                                                                                                                                                                       | **Tájékoztató jellegű**                                  |
| `check:secrets`          | Titokfelderítés (gitleaks) — kihagyja, ha a bináris fájl hiányzik                                                                                                                                                                                                | **Tájékoztató jellegű**                                  |
| `check:vuln-ratchet`     | A függőségek sérülékenységei (osv-scanner) nem romlanak — kihagyja, ha a bináris fájl hiányzik                                                                                                                                                                   | **Tájékoztató jellegű**                                  |
| `check:workflows`        | Munkafolyamatok lintelése (actionlint + zizmor); a hiányzó vagy hibás szkennerek, az érvénytelen jelentések vagy a hiányzó ratchet-baseline INCOMPLETE hibát okoznak. Az érvényes találatokat a kiválasztott szigorú/tájékoztató jellegű/ratchet-házirend követi | Futtatás szükséges; a zizmor ratchetje blokkoló a CI-ban |
| `check:openapi-breaking` | A nyilvános API-szerződés (`openapi.yaml`) törő változásai az alapághoz képest (oasdiff) — `openapiBreaking=N` értéket bocsát ki; kihagyja, ha az oasdiff hiányzik, vagy az alap-specifikáció nem oldható fel                                                    | **Tájékoztató jellegű**                                  |

### Feladat: `docs-sync-strict`

Minden, a `main` ágra irányuló PR-en lefut. Hiba esetén blokkolja az összevonást.

| Szkript                        | Ellenőrzi                                                                                                                                                                                                                        | Blokkoló                               |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `check:docs-all`               | Meta-átjáró, amely egymás után futtatja az alábbi 6 alátjárót                                                                                                                                                                    | Igen                                   |
| ↳ `check:docs-sync`            | A CHANGELOG / OpenAPI / llm.txt verzióinak konzisztenciája                                                                                                                                                                       | Igen                                   |
| ↳ `check:docs-counts`          | A prózában szereplő számok (szolgáltatók száma, migrációk száma stb.) a tényleges számok ratchet-ablakán belül vannak                                                                                                            | Igen                                   |
| ↳ `check:env-doc-sync`         | A `.env.example` minden környezeti változója szerepel egy dokumentációs táblázatban, és fordítva                                                                                                                                 | Igen                                   |
| ↳ `check:deprecated-versions`  | Nincsenek elavult verziószövegek a dokumentációban                                                                                                                                                                               | Igen                                   |
| ↳ `check:doc-links`            | A dokumentáció belső Markdown-hivatkozásai valódi fájlokra mutatnak (`[text]`/`(path)` formátum)                                                                                                                                 | Igen                                   |
| ↳ `check:fabricated-docs`      | A dokumentációban hivatkozott útvonalak, környezeti változók, CLI-parancsok, hook-nevek és fájlútvonalak léteznek a kódbázisban. A `--strict` kapcsolóval kemény ellenőrzés; kapcsoló nélkül csak figyelmeztetésként sikertelen. | Igen (CI-ben a `--strict` kapcsolóval) |
| `check:cli-i18n`               | A CLI-parancsszövegek jelen vannak minden i18n területi beállításfájlban                                                                                                                                                         | Igen                                   |
| `check:openapi-coverage`       | Az OpenAPI-specifikáció a valódi útvonalak legalább ratchettel meghatározott alsó korlátját lefedi                                                                                                                               | Igen                                   |
| `check:openapi-security-tiers` | Az `openapi.yaml` biztonsági szintjeinek annotációi konzisztensek a `routeGuard.ts` besorolásaival                                                                                                                               | **Tájékoztató jellegű**                |
| `check:openapi-routes`         | Az `openapi.yaml` minden útvonala egy valódi `route.ts` fájlra oldódik fel (hallucinációellenőrzés)                                                                                                                              | Igen                                   |
| `check:docs-symbols`           | A `docs/**/*.md` minden `/api/...` hivatkozása egy valódi `route.ts` fájlra oldódik fel (hallucinációellenőrzés)                                                                                                                 | Igen                                   |
| `i18n translation drift`       | A lefordítatlan kulcsok az i18n területi beállításfájlokban — csak figyelmeztetés                                                                                                                                                | **Tájékoztató jellegű**                |

A `docs/diagrams/` alatti tizenkét README SVG generált fájl (`scripts/docs/gen-readme-<name>.mjs`;
a `npm run docs:readme-diagrams` mindegyiket újragenerálja). Mindegyikhez tartozik egy bájt-összehasonlító egységteszt
(`tests/unit/docs/readme-*-svg.test.ts`, `test-unit` feladat), amely meghiúsul, ha a verziókövetésben lévő fájl elavult, és a `check:docs-counts` a kanonikus számokat a `<text>` csomópontjaikból olvassa ki — ezért az alakzatokká alakítási lépés minden alakzatokká alakított szöveget láthatatlan `<text>` elemként tart meg a fájlban. Az SVG kanonikus számokat ellenőrző vizsgálata a
`SVG_DIAGRAM_FILES` fájlban felsorolt fájlokat olvassa (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, valamint `public/images/tier-flow-dark.svg` és `tier-flow-light.svg`;
a free-forever, catalog-entry, recurring-pool és scoring-factors állítások szintén a
`promise-pillars.svg`, `free-tier-budget.svg` és `strategies-grid.svg` fájlokat olvassák. A `free-tier-budget.svg`
az ábráit az élő katalógustöltőből veszi, ezért a `FREE_MODEL_BUDGETS` vagy egy szolgáltató megjelenítési nevének módosítása pirosra állítja a CI-t, amíg a fájlt újra nem generálják.

### Feladat: `i18n-ui-coverage`

| Szkript                           | Ellenőrzi                                                                                                                                                                                                                                          | Blokkoló                |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `check-ui-keys-coverage` (inline) | A UI i18n-kulcsainak lefedettsége legalább 65%                                                                                                                                                                                                     | Igen                    |
| `check-ui-value-drift` (inline)   | Egy átírt angol **érték** nem hagy maga után elavult fordítást                                                                                                                                                                                     | Igen                    |
| `check-new-key-coverage` (inline) | Egy **új** angol kulcs le van fordítva minden területi beállításban — a `__MISSING__:` jelölőt elutasítja                                                                                                                                          | Igen                    |
| `check-translation-ratio`         | A területi beállításonkénti valódi fordítási arány (az angollal azonos / helyőrző / hiányzó, az engedélyezési listán kívüli elemek) nem haladhatja meg a `config/quality/i18n-translation-baseline.json` + tartalék értékben meghatározott szintet | **Tájékoztató jellegű** |

`fetch-depth: 0` szükséges — az értékeltérés-ellenőrzés az `en.json` fájlt az egyesítési alappal hasonlítja össze.

#### `check-ui-value-drift` — elavult fordításokat ellenőrző kapu

Kiszűri azt az i18n-regressziót, amelyet a többi kapu szerkezetileg nem képes észlelni: egy angol értéket
átírnak, és az _előző_ angol szövegből származó fordítások változatlanok maradnak, így
a nem angol nyelvű felhasználók továbbra is magabiztosan megfogalmazott, immár hibás szöveget olvasnak.

Ez élesben is megtörtént. Az `oauthModal.googleOAuthWarning` szövegét átírták, amikor bekerült az Antigravity
bejelentkezési segéd (#5203); a **43 lokalizációból 39** továbbra is azt közölte az üzemeltetőkkel, hogy „másolják a
teljes URL-t, és illesszék be alább” — ez a folyamat ennél a szolgáltatónál nem hajtható végre. A probléma
a #8463-ig észrevétlen maradt, mert:

- a `sync-ui-keys` csak a **hiányzó** kulcsokat pótolja, az **elavultakat** soha;
- a `check-ui-keys-coverage` a kulcs _jelenlétét_ számolja, ezért egy elavult fordítás lefedettnek számít;
- a `check-translation-drift` a `docs/i18n/<locale>/**.md` dokumentációs tükröket követi —
  a `src/i18n/messages/*.json` fájlokat soha nem olvassa. A 2026-09-es újraszinkronizálás óta blokkol a `docs-sync-strict` feladatban:
  egy központi dokumentum szerkesztése után futtasd: `npm run i18n:run -- --files=<doc>` (szekciószintű, olcsó).

**Diff-alapú, nem baseline-re épülő.** Az egyesítési alapon található `en.json` fájlt összeveti a
munkafával; minden olyan kulcsnál, amelynek megváltozott az angol értéke, elavultnak tekinti azt a fordítást,
amelyet az adott lokalizációban még nem módosítottak. Ez szándékosan **befagyasztja a már meglévő tartozást** —
egy diffből nem állapítható meg, melyik régi angol szövegből származik egy régóta fennálló fordítás, ezért a kapu
csak a jelenlegi módosítás által érintett részeket ellenőrzi. Az alternatíva (kulcsonkénti hash-alapú baseline)
egy körülbelül 600 KB-os generált fájlt igényelne, amely a legnagyobb meglévő baseline háromszorosa, és minden
i18n PR során változna.

Kétféleképpen teljesíthető:

1. frissítsd az érintett fordításokat, vagy
2. állítsd őket erre: `__MISSING__:<new english>` — a futtatókörnyezet ekkor a javított angol szöveget szolgálja ki
   (`src/i18n/request.ts::deepMergeFallback`, #7258), a kulcs pedig fordítási sorba kerül.

Ha a szöveg **jelentése** megváltozott, előnyben részesítendő a **kulcs átnevezése**: egy új kulcs nem örökölhet
elavult fordítást. Ezt a mintát használta a #8463.

```bash
npm run i18n:check-value-drift          # szigorú (ezt futtatja a CI)
npm run i18n:check-value-drift:warn     # csak jelentést készít
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

A kilépési kód 0, és `SKIP reason=base-unresolved` jelenik meg, amikor az alapkatalógus nem olvasható
(az alapreferenciát nem tartalmazó sekély klón esetén), a `check-openapi-breaking` működését követve.

### Feladat: `i18n`

Teljes i18n-érvényesítési mátrix (lokalizációnként egy feladat). A teljes feladat csak tájékoztató jellegű.

| Szkript                         | Ellenőrzés                             | Blokkoló                                                       |
| ------------------------------- | -------------------------------------- | -------------------------------------------------------------- |
| `validate_translation.py quick` | A fordítás teljessége lokalizációnként | **Tájékoztató** (a teljes feladaton `continue-on-error: true`) |

### Feladat: `pr-test-policy`

Csak pull requesteken fut.

| Szkript                | Ellenőrzés                                                                                                                                                                                 | Blokkoló |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `check:pr-test-policy` | Azoknak a PR-eknek, amelyek éles kódot módosítanak a `src/`, `open-sse/`, `electron/` vagy `bin/` alatt, teszteket is tartalmazniuk vagy frissíteniük kell (8. szigorú szabály)            | Igen     |
| `check:test-masking`   | A módosított tesztfájlok nem csökkentik az assert-ek nettó számát, és nem adnak hozzá `assert.ok(true)` tautológiákat                                                                      | Igen     |
| `check:pr-evidence`    | A PR törzse tesztelési/VPS-bizonyítékot hivatkozik a módosításhoz (a 18. szigorú szabályt mechanikusan érvényesíti a PR szövegében végzett kereséssel — törékeny, lásd a Teendők listáját) | Igen     |

### Feladat: `test-vitest`

A `build` után fut. Sikertelenség esetén blokkolja az egyesítést.

| Tesztcsomag      | Ellenőrzés                                                        | Blokkoló                                                                                                                                   |
| ---------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP-szerver (110 eszköz), autoCombo, gyorsítótár — vitest-futtató | Igen                                                                                                                                       |
| `test:vitest:ui` | UI-komponensek tesztjei — vitest-futtató                          | **Blokkoló** — a korábban fennálló hibák explicit módon ki vannak zárva a `vitest.config.ts` fájlban; az új hibák megbuktatják a feladatot |

### Éjszakai munkafolyamatok (ütemezetten futnak, tájékoztató jellegűek)

Ezek cron-ütemezés szerint (és `workflow_dispatch` esetén) futnak, PR-eken soha. Mindegyik tájékoztató jellegű.

| Munkafolyamat          | Ellenőrzések                                                                                                                                                                            | Blokkoló      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `nightly-property`     | fast-check tulajdonságtesztek véletlenszerű kezdőértékkel + magas futásszámmal                                                                                                          | **Tanácsadó** |
| `nightly-resilience`   | heap-növekedési kapu, kaotikus hibabefecskendezés, k6 terhelési/tartóssági teszt                                                                                                        | **Tanácsadó** |
| `nightly-llm-security` | promptfoo injektálásvédelme (blokkolási mód) + garak próbák (provideri titok nélkül kihagyva)                                                                                           | **Tanácsadó** |
| `nightly-schemathesis` | OpenAPI-szerződés fuzzingje (schemathesis) egy éles OmniRoute ellen a `docs/openapi.yaml` használatával — specifikációs eltéréseket / nem kezelt 500-as válaszokat jelez (8. fázis B.4) | **Tanácsadó** |
| `nightly-mutation`     | Stryker mutációs tesztelési pontszám a gyors egységtesztelési sávon — a túlélő mutánsok gyenge állításokra utalnak                                                                      | **Tanácsadó** |
| `nightly-compat`       | Node motor-kompatibilitási mátrix a támogatott `engines.node`-tartományokon keresztül                                                                                                   | **Tanácsadó** |

A teljesítmény-alapértékeket (heap, TTFB, buildelési idő) rögzítjük, de nem blokkolják a folyamatot: lásd: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

Minden olyan ellenőrzési kapu, amely már meglévő szabálysértések miatt nem bukhat el, rögzített engedélyezési listát használ
(pl. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). A szabályzat:

**Javítsd ki a kiváltó okot; az engedélyezési listát csak akkor használd, ha a szabálysértés már korábban is fennállt, és
ugyanabban a PR-ban nem javítható.**

Amikor bejegyzést adsz egy engedélyezési listához:

1. Mellékelj egy megjegyzést az indoklással.
2. Hivatkozz a nyomon követési hibajegyre (pl. `// #3498 — 2. fázisú funkció, még nincs implementálva`).
3. Távolítsd el a bejegyzést ugyanabban a PR-ban, amely kijavítja a szabálysértést — az elavult bejegyzés, amely már
   nem nyom el aktív szabálysértést, önmagában is hiba (a 6A.3 elavult kikényszerítési ellenőrzése a megvalósítása után
   elbuktatja a kaput egy árva engedélyezési lista-bejegyzés miatt).

**Ne** adj hozzá engedélyezési lista-bejegyzéseket csak azért, hogy a tesztek gyorsabban átmenjenek. Egy zöld kapu növekvő
engedélyezési listával hamis minőségérzetet kelt.

### Ha egy kapu elbukik a PR-odon

1. **Olvasd el figyelmesen a kapu kimenetét** — pontosan megmondja, melyik fájl vagy szimbólum sértette meg
   a szabályt.
2. **Javítsd ki a szabálysértést** — a legtöbb kapu determinisztikus fájlrendszer-ellenőrzést végez, amely azonnal átmegy,
   amint a kód helyes.
3. **Ha a szabálysértés már korábban is fennállt** (vagyis nem te vezetted be, de a kapu most már lefedi): adj hozzá egy engedélyezési lista-bejegyzést indokló megjegyzéssel és egy nyomon követési hibajeggyel.
4. **Ha a kapu racsnis elven működik** (lefedettség, ESLint-figyelmeztetések, duplikáció, komplexitás):
   a módosításod rontott a mérőszámon. Javítsd ki a kiváltó problémát, vagy (ritkán) futtasd az
   `npm run quality:ratchet -- --update` parancsot, ha a módosítás szándékos, és a mérőszám romlása
   elfogadható — de dokumentáld ennek okát a PR leírásában.
5. **Tájékoztató kapuk** (`continue-on-error: true`) csak információs célúak — nem akadályozzák
   az összevonást, de megjelennek a CI összegzésében. Ettől függetlenül javítsd ki őket.

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

Ezt a leltárt 2026-06-17-én összevetettük a `ci.yml` tartalmával (az előző verzióból kimaradt az
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Az egyeztetett készlet ROI-felülvizsgálata
a következő racionalizálási jelölteket azonosította. **Az összevonások mechanikus CI-módosítások;
az átállítások/eltávolítások az üzemeltető számára fenntartott szabályzati döntések.** Az alábbiak közül
még semmi sem lett alkalmazva.

**Fent szintén nem dokumentált** (tanácsadó jellegű, alacsony jelértékű): a `docs-lint` feladat
(markdownlint + Vale, a teljes feladaton `continue-on-error`), valamint az önálló ellenőrző munkafolyamatok:
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. A `semgrepFindings: 0` szerepel a
`quality-baseline.json` fájlban, de nincs blokkoló racsnihoz kötve a `ci.yml` fájlban — a metrika
jelenleg árva.

### Összevonás / deduplikáció (mechanikus, alacsonyabb kockázat)

Minden jelöltet ellenőriztünk az éles kapuállapot alapján 2026-06-17-én (bízz, de ellenőrizd);
több „kézenfekvő” összevonásról kiderült, hogy rejtett adósságot takar, ezért **nem** alkalmazhatók közvetlenül.

- **A `check:docs-sync` kétszer fut** — önállóan a `lint` feladatban, majd ismét a `check:docs-all` (`docs-sync-strict`) részeként és a husky pre-commit hookban. ✅ **KÉSZ** — az önálló `lint`-meghívás eltávolítva.
- **CVE-ellenőrzés** — ❌ **NEM vonható össze tisztán.** Az `audit:deps` minden magas/kritikus CVE esetén hibával leáll; a `check:vuln-ratchet` (osv) csak az alapértékhez viszonyított _regresszió_ esetén áll le hibával (jelenleg 1 MODERATE). Eltérő szemantika — az `audit:deps` eltávolításával elveszne az abszolút magas/kritikus kapu. Mindkettőt meg kell tartani.
- **Ciklusészlelés** — ✅ **KÉSZ** (#15159 G-01/G-02). A korábbi szöveg a `check:cycles` ellenőrzést „zöld, gondosan összeállított” kapunak nevezte, és azzal indokolta blokkolóként való megtartását, hogy a `check:circular-deps` (dpdm) 91 ciklust jelzett. Ez a zöld állapot **hamis zöld** volt: a `check:cycles` 5 alkönyvtárat (450 fájlt) vizsgált, csak a statikus `import|export … from` mintára illeszkedett, és minden `@/` és `@omniroute/open-sse/` specifikátort eldobott, így nem láthatta a repót uraló dinamikus importálási és aliasciklusokat. Javítva: a kapu most bejárja a `src` + `open-sse` könyvtárakat (5023 fájl), a TypeScript AST-ből gyűjti a specifikátorokat (így az `import("…")` számít, a típuspozícióban lévő `typeof import("…")` viszont nem), és feloldja a tsconfig `paths` beállításait. **14** ciklust talál, nem 0-t. Mivel 14 már meglévő ciklus nem javítható ki egy kapu-PR-ben, a `check:cycles` mostantól **racsni** (`--ratchet`, a felső korlát `metrics.cycles.value = 14` a `quality-baseline.json` fájlban, `direction: down`) — minden _regressziót_ blokkol, és az érték csak csökkenhet. A CI az `npm run check:cycles:ratchet` parancsot futtatja. A fokozatos leépítés az **A-01** részeként történik. A `check:circular-deps` (dpdm) tanácsadó jelleggel megmarad szélesebb körű másodvéleményként.
- **Komplexitás** — ✅ **KÉSZ** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): egyetlen ESLint-bejárás, ruleId szerinti számlálással, így a ciklomatikus+max-lines és a kognitív alapértékek függetlenek maradnak; az egyedi `check:complexity` / `check:cognitive-complexity` ellenőrzések megmaradnak a helyi `--update` használatához.
- **`/api` hallucináció elleni védelem** — ✅ **KÉSZ** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): a `src/app/api` egyetlen fájlrendszer-leltározása; az openapi-routes + docs-symbols továbbra is egymástól függetlenül jelent; az egyedi ellenőrzések megmaradnak helyi futtatáshoz.
- **A `check:node-runtime` 11 feladatban fut** — ⚠️ **alacsony ROI.** Mindegyik külön futtatókörnyezet, az ellenőrzés pedig <1 másodperc; a teljes megtakarítás ~10 másodperc lenne, miközben elveszne egy olcsó, feladatonkénti védőkorlát. Nem éri meg a vele járó változtatás.
- **`typecheck:noimplicit:core` a CI lintelésében** — ✅ **eltávolítva a lint feladatból** (tanácsadó jellegű `continue-on-error` volt); a blokkoló típusfelületet a `typecheck:core` + `check:type-coverage` biztosítja. A helyi szkript megmaradt.

### Átállítás / döntés (üzemeltetői szabályzat)

- `check:openapi-security-tiers` (tanácsadó jellegű) — ❌ **NEM állítható át tisztán.** 0-s kilépési kódot ad, de figyelmeztet arra, hogy a `LOCAL_ONLY_API_PREFIXES` alá tartozó több `traffic-inspector` útvonalról hiányzik az `x-loopback-only: true` annotáció. A kikényszerítéséhez először hozzá kell adni ezeket az annotációkat az `openapi.yaml` fájlhoz.
- `typecheck:noimplicit:core` (tanácsadó jellegű) — nagyrészt lefedi a blokkoló `check:type-coverage` racsni. Állítsa át racsnivá, vagy távolítsa el a redundáns második `tsc` futtatást.
- `test:vitest:ui` (most **blokkoló**) — a már meglévő hibák kifejezetten ki vannak zárva a `vitest.config.ts` fájlban `// #8618` nyomonkövetési megjegyzésekkel; az új hibák meghiúsítják a feladatot.
- `check:secrets` (gitleaks, blokkoló racsni, 3 dokumentált téves pozitívnál befagyasztva) — tegye engedélyezési listára a 3 találatot a 0 eléréséhez, vagy minősítse vissza tanácsadó jellegűvé. Átfedésben van a GitHub natív titokellenőrzésével és a `check:public-creds` ellenőrzéssel.
- `check:pr-evidence` (blokkoló, grep segítségével vizsgálja a PR-törzs prózáját) — magas a téves pozitív eredmények kockázata; eltávolítása gyengítené a 18. szigorú szabály kikényszerítését, így ez valódi szabályzati döntés.
- `semgrep` (tanácsadó jellegű, önálló) — az OWASP-családok tekintetében átfedésben van a CodeQL-lel; kösse az alapértékét racsnihoz, vagy távolítsa el.

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
