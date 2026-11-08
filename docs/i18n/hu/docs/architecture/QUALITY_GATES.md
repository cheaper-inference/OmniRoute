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

A CI- és a Quality Gates-munkafolyamatok egyaránt stabil eredményt adnak: `Gate / CI` és
`Gate / Quality`. Verziózott befogadási szabályzatuk minden upstream feladatot
kötelezőként vagy tájékoztató jellegűként sorol fel. Egy alkalmazandó kötelező feladatnak sikeresen
kell lefutnia: a hiányzó, megszakított, kihagyott, függőben lévő és ismeretlen eredmények nem igazolhatják a PASS állapotot. Egy érvényes,
csak dokumentációt vagy csak katalógust érintő besorolás miatt egy kódsáv nem alkalmazható;
a vázlatos PR nem elfogadott jelölt. A `hotfix` címke nem teszi mellőzhetővé a bizonyítékokat.

Mindkét munkafolyamat lefedi a main/release ágakba irányuló PR-eket, a `main` ágba történő pushokat, a kézi indítást
és a merge group eseményeket. A push, a kézi indítás és a merge group a teljes kiválasztást futtatja. A
`release/**` ágakba történő pushok nem indítják el ezeket (2026-10-18): minden módosítás már lefuttatta a mátrixot a saját PR-jén,
az egyesített kombináció pedig a Release-Green feladata (`docs/ops/RUNNER_BOX.md` → Hosztolt sáv). A forkok
és a merge groupok hosztolt futtatókat használnak azokhoz a feladatokhoz, amelyek egyébként saját hosztolású
futtatókat választanának; a bevezetés előtt ellenőrizni kell a megfelelő hosztolt kapacitást.

Egy szokásos PR a gyors kiválasztást futtatja. A befogadási szabályzat `full-code` és `full-code-e2e` sávjai
(E2E, integráció, csomagartefaktum, Electron smoke teszt, Bun SQLite, ökoszisztéma-
és protokollkliensek) csak egy Mergify-sor vázlatán vagy teljes futtatáskor futnak:
`gh workflow run ci.yml --ref <branch>`.

Minden JSON-nyugta azonosítja a checkout során kivett SHA-t, a munkafolyamat futását és a próbálkozást.
A CLI elutasítja, ha a checkout és az esemény SHA-ja nem egyezik. A munkafolyamat-tesztek a szabályzatbeli tagságot
az eredményfeladat `needs` listájához kötik, így egy új vagy eltávolított sáv nem tűnhet el észrevétlenül.
A nyugták a saját munkafolyamatukat fedik le, nem a közzétételt, a telepítést vagy
egy meglévő tájékoztató jellegű ellenőrző belső működését. Mindkét ellenőrzés nevének aktiválása az ágszabályokban
külön adminisztratív módosítás; e feladatok hozzáadása önmagában nem védi az ágat.

### Egyesítési sor

A `queue` címke egy PR-t a Mergify-sorba küld (`.mergify.yml`). A Mergify vázlatos PR-t nyit
egy `mergify/merge-queue/` ágon, a CI ott futtatja a teljes kiválasztást, az eredeti PR pedig akkor egyesül,
amikor a `Gate / CI`, a `Gate / Quality` és a `Merge integrity (changelog + generated skills)` sikeresen lefut.

A Mergify a sor összefoglalóját a vázlat leírásába írja, és azt más alkalmazások is szerkeszthetik.
Egy ilyen vázlaton bekövetkező `pull_request` `edited` esemény saját párhuzamossági csoportot kap
(`-queue-edit-<run_id>`), így nem szakíthatja meg a vázlat tényleges futását, továbbá kihagyja a kaput és a
mátrixot. Csak a `Merge integrity` fut le továbbra is. A kihagyott kapufeladat eltérő ellenőrzésnevet kap,
mert a Mergify a kihagyott `Gate / CI` ellenőrzést sikertelennek értelmezi, és eltávolítja a PR-t a sorból.

A sorból való eltávolítás után egy push nem mindig állítja újra sorba a PR-t. Írja hozzá megjegyzésként: `@mergifyio queue`.

### Statikus ellenőrzések jegyzéke

A verziózott npm-aliasjegyzék és a statikus ellenőrzések tagsága a
`config/quality/gate-manifest.json` fájlban található. Futtassa az `npm run check:gate-manifest` parancsot
a szkriptnevek és a pontos parancsok `package.json` fájllal való összevetéséhez; a hozzáadások, eltávolítások és
parancsváltozások miatt mind a helyi hook, mind a CI módosításbesorolási feladatai sikertelenek lesznek.
Egy alias nem munkafolyamat-feladat, mátrixpéldány vagy teszteset: ezek számai
nem mutathatók be egymással felcserélhetőként.

A kiválasztott aliasok végrehajtás nélküli megtekintéséhez használja az `npm run quality:scan -- --list` vagy az `npm run quality:scan:fast -- --list`
parancsot. A futtató az npm belépési pontját hívja meg, így annak futtatási környezete
— beleértve a Bunt, ahol az van beállítva — megmarad.
A manifeszt az e profilokon kívüli aliasokat külön meghívottként rögzíti, és
a karbantartási parancsok tiltottak az írásvédett ellenőrzési profilokban.

Ezek a profilok csak a statikus ellenőrzést fedik le. Nem tanúsítják a termékteszteket,
a lefedettséget, a csomagolást, a külső ellenőrzéseket vagy egy jelölt teljes kiadási elfogadását.
A munkafolyamat befogadása a kapcsolódó `config/quality/admission-policy.json` és
`scripts/quality/admission-verdict.mjs` fájlokat használja. A kiadásmegfigyelő profilok elkülönülnek;
az alkalmazandó ellenőrzéseiket és nyugtáikat egymástól függetlenül vizsgálja meg. Az alábbi szöveges
jegyzék hivatkozási alap, nem pedig bizonyíték arra, hogy egy kapu ténylegesen lefutott.

A szkriptek a `scripts/check/` (szabályzati kapuk) és a `scripts/quality/` (ratchet motor) alatt találhatók.
A CI hiteles forrása a `.github/workflows/ci.yml`.

### Kiadási PR gyors útvonala (`quality.yml`)

A `.github/workflows/quality.yml` kiegészíti a CI-t a main/release PR-ek, a `main` ágba történő pushok,
a kézi indítás és a merge groupok esetén. A PR-ek útvonal alapján szűrt gyors ellenőrzéseket használnak. A tartósan
letiltott duplikált build el lett távolítva; a tényleges build-, csomagolási és rendszerindítási ellenőrzések továbbra is a CI-ben maradnak.
A unit tesztcsomag és a vitest csak a CI-ben fut (`Unit Tests (N/8)` és `Vitest`).

| Feladat                                          | Hatókör                                                                                                                                               | Blokkoló               |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `Docs Gates (fast-path)`                         | Dokumentációs/kód-PR-ek; API-dokumentációs hivatkozások és docs-all                                                                                   | Igen                   |
| `Fast Quality Gates`                             | Kód-PR-ek; statikus ellenőrzések, típusellenőrzés, dashboard-típusellenőrzés, érintett unit tesztek, elfelejtett testvértesztek (tájékoztató jellegű) |
| `No new ESLint warnings`                         | Kód-PR-ek; elnyomásokat figyelembe vevő lintvédelem                                                                                                   | Igen, forkok esetén is |
| `Merge integrity (changelog + generated skills)` | Nem vázlatos PR-ek; a változásnapló és a generált skillek szinkronizálása                                                                             | Igen, forkok esetén is |

#### Elfelejtett testvértesztek jelentése

A `npm run check:forgotten-sibling-tests` a `Fast Quality Gates` tájékoztató lépéseként fut, és újra felhasználja
a teszthatás-térkép mögötti importfeloldót.
Minden módosított éles modul esetében determinisztikus
`changed module/symbol -> static consumer -> candidate sibling test` láncokat jelent, ha a jelölt
teszt nem szerepel a pull request diffjében. A Markdown-összefoglaló és a JSON-eredmény a
`forgotten-sibling-tests` munkafolyamat-műtermékként marad meg a blokkoló bevezetés előtti kalibráláshoz.

A gyűjtőmodulokból történő újraexportálások és a dinamikus importok kizárólag feloldási diagnosztikák; soha nem eredményeznek
blokkoló megállapítást. A felülvizsgált kivételek a
`config/quality/forgotten-sibling-allowlist.json` fájlban találhatók. Minden bejegyzésnek meg kell neveznie a fogyasztót és a jelölt
tesztet, konkrét indoklást kell adnia, valamint egy GitHub-issue-ra vagy pull requestra kell hivatkoznia. A hibás formátumú bejegyzések
zárt módon meghiúsítják az ellenőrzést. A kivételek nem nyomhatják el a törölt jelölt teszteket vagy az olyan diffeket, amelyek `.skip`/`.todo`
jelölést adnak hozzá; az assertgyengítés és az egyéb elfedések továbbra is a különálló, blokkoló
`check:test-masking` ellenőrzési kapu hatáskörébe tartoznak.

### Feladat: `lint`

Minden, a `main` ágra irányuló PR esetén lefut. Hiba esetén blokkolja az összevonást.

| Szkript (`npm run ...`)           | Ellenőrzi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Blokkoló                                            |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:node-runtime`              | A Node.js verzió a támogatott tartományon belül van                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Igen                                                |
| `check:cycles`                    | Körkörös importok a teljes `src/` + `open-sse/` területén (AST-alapú, a tsconfig `paths` útvonalai feloldva). Az alapváltozat 1-es kilépési kódot ad, ha bármilyen ciklus létezik (a #15281 óta hibabiztos módon), és felsorolja az SCC-ket. A `check:cycles:ratchet` (amelyet a CI futtat) blokkol, ha a szám meghaladja a `quality-baseline.json` fájlban lévő `metrics.cycles` felső korlátját — ez jelenleg 14, `direction: down`, így csak csökkenhet (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Igen (racsnis korlátozás)                           |
| `check:boundary`                  | `open-sse → src` csatolás: egyedi, fájlok közötti importok a motorból az alkalmazásba (`scripts/quality/measure-boundary.mjs`; az él-lista a v4 mag-/modulszétválasztási javítási feladatlistája). Alapváltozat = tájékoztató jelentés (ugyanaz, mint a `quality:boundary`). A `check:boundary:ratchet` (amelyet a CI futtat, és amely a `quality.yml` gyors ellenőrzőkapuinak racsnis ciklusában is szerepel) blokkol, ha a szám meghaladja a `quality-baseline.json` fájlban lévő `metrics.boundaryOpenSseToSrc` felső korlátját — kezdeti értéke a mért 771, `direction: down`; az `--update` csak csökkenti; PR-ek esetén a bázishoz viszonyít (`--base-ref`, lásd alább)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Igen (racsnis korlátozás)                           |
| `check:route-validation:t06`      | Zod-sémák megléte minden útvonalon (6. szintű szabályzat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen                                                |
| `check:any-budget:t11`            | Az `@ts-expect-error // any` előfordulásainak száma nem haladja meg a keretet (11. szintű catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Igen                                                |
| `check:provider-consistency`      | A `providers.ts` minden szolgáltatójához tartozik megfelelő bejegyzés a `providerRegistry.ts` fájlban (és fordítva, az engedélyezési listán belül)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Igen                                                |
| `check:model-lifecycle`           | A három kézzel karbantartott útválasztási tábla konzisztens marad a verziókezelőben tárolt életciklus-pillanatképpel (#11503): a `FITNESS_TABLE` (`taskFitness.ts`) nem pontoz olyan kivezetett azonosítót, amelyet a `REGISTRY` útválasztásra használhat; minden `BUILT_IN_ALIASES`-cél megtalálható a `REGISTRY` táblában, és hiányzik a kivezetett azonosítók pillanatképéből; a `REGISTRY` táblában továbbra is szereplő minden kivezetett azonosító továbbításra kerül, vagy szerepel az `allowedRetiredInCatalog` listában; továbbá a `DEFAULT_DEGRADATION_MAP` egyetlen forrása vagy célja sem szerepel kivezetettként ebben a pillanatképben. Ez nem bizonyítja, hogy egy modellt jelenleg kiszolgál egy élő felsőbb szintű szolgáltatás. Offline — a `config/quality/model-lifecycle.json` fájllal hasonlítja össze, amely kézzel frissíthető az `npm run quality:refresh-model-lifecycle` paranccsal (hálózatot igényel; nincs bekötve a CI-be). Az `allowedRetiredInCatalog` egy fokozatosan csökkentendő racsni: csak nyomonkövetési feladattal együtt adj hozzá új bejegyzést.                                                                                                                                                                                                               | Igen                                                |
| `check:fetch-targets`             | A kliensoldali `src/` könyvtárban található minden `fetch("/api/...")` hívás egy tényleges `route.ts` fájlra oldódik fel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Igen                                                |
| `check:deps`                      | A repó minden `package.json` fájljában szereplő, `npm install` paranccsal telepíthető összes függőség megtalálható a `dependency-allowlist.json` fájlban; az új, nem rögzített verziójú vagy elgépeléses csomagnévvel visszaélő csomagok megjelölésre kerülnek                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Igen                                                |
| `audit:deps`                      | `npm audit` (gyökér + electron) — nincs magas/kritikus súlyosságú figyelmeztetés (átfedésben van az osv `check:vuln-ratchet` ellenőrzésével; lásd: Indoklási hátralék)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Igen                                                |
| `check:lockfile`                  | `package-lock.json` integrity — https registry, integrity hash, nincs gazdagép felülírása                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen                                                |
| `check:licenses`                  | SPDX licenc engedélyezési listája a termelési függőségekhez                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Igen                                                |
| `check:tracked-artifacts`         | Nincsenek összeállítási műtermékek / elkötelezett `node_modules` szimbolikus linkek (husky pre-commit-ben is fut; a pre-push szándékosan könnyű — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Igen                                                |
| `check:ai-attribution`            | Nincs AI/bot `Co-Authored-By` előzetes vagy mesterséges intelligencia generációs lábléc PR commitokban, cím vagy törzs — kemény szabály #16 (a `quality.yml` gyorskapu ciklusban PR→ `release/**` — beolvassa az esemény hasznos terhelését, a no-op off PRs — `ci.yml` -→ lépésben és a qz-qnly lépésben PR is a husky `commit-msg` hook #14436 `main`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | Minden Vitest kizárás megnevez egy nyomkövetési problémát, és megjelenik `config/quality/vitest-exclusions.json` (#13204) fájlban.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Igen                                                |
| `check:file-size`                 | A forrásfájlok (`.ts`/`.tsx` a `src/`, `open-sse/`, `electron/`, `bin/`) `cap` n belül maradnak, a tesztfájlok (`*.test.ts(x)`) pedig a `testCap` n belül; `file-size-baseline.json` (`frozen` / `testFrozen`) lefagyasztott fájlok nem nőhetnek túl a rögzített méretükön                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Igen                                                |
| `check:error-helper`              | executors/handlers hibaválaszai `buildErrorBody()` / `sanitizeErrorMessage()` (kemény szabály #12) használják                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Igen                                                |
| `check:migration-numbering`       | A migrációs SQL fájlok sorrendben vannak számozva, nincsenek hiányosságok vagy ismétlődések                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Igen                                                |
| `check:public-creds`              | Nincsenek szó szerinti OAuth `client_id`/`client_secret` vagy Firebase webkulcsok `publicCreds.ts` kívül (kemény szabály #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Igen                                                |
| `check:db-rules`                  | Nincs nyers SQL `src/lib/db/` modulokon kívül; nincs hordóimport `localDb.ts` ből (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Igen                                                |
| `check:known-symbols`             | A szolgáltató végrehajtói, útválasztási stratégiái és a kiküldési táblájukban regisztrált fordítók megegyeznek a lemezen lévő fájlokkal — nincs árva vagy nem deklarált szimbólum                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Igen                                                |
| `check:route-guard-membership`    | Minden olyan útvonal, amely gyermekfolyamatot hoz létre, `isLocalOnlyPath()` (kemény szabályok #15/#17) szerint van besorolva.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Igen                                                |
| `check:test-discovery`            | A repóban található minden `*.test.ts` / `*.spec.ts` fájlt legalább egy tesztfuttató összegyűjti (fokozatos szigorítás: a `test-discovery-baseline.json` fájlban lévő árva fájlok listája csak rövidülhet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Igen                                                |
| `check:test-tla-order`            | A `tests/unit` alatt egyetlen `node:test` fájl sem regisztrál tesztet úgy, hogy ezt követően legfelső szintű `await` utasítást ér el, majd további teszteket regisztrál (#18045; fokozatos szigorítás: a `test-tla-order-allowlist.json` engedélyezési listája csak rövidülhet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Igen                                                |
| `check:agent-skills-sync`         | A generált agent-skills összetevők megfelelnek a forráskatalógusuknak (nincs eltérés)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:provider-asset-provenance` | A szolgáltatói logókhoz/erőforrásokhoz rögzített eredetbejegyzés tartozik                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | A JSON-konfigurációs fájlok feldolgozhatók, és megfelelnek a repó lintelési szabályainak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `typecheck:core`                  | TypeScript-fordítás hibák nélkül (csak tájékoztató jellegű figyelmeztetések)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Igen                                                |
| `typecheck:noimplicit:core`       | Szigorú `noImplicitAny` — előremutató; számos már meglévő hívási hely továbbra is annotációkat igényel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **Tájékoztató jellegű** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | A `tsc` hatóköre az `src/app/(dashboard)/**` fájlokra korlátozódik (#7033) — a `typecheck:core` gondosan összeállított, 27 fájlból álló engedélyezési listája egyetlen irányítópultbeli TSX-fájlt sem tartalmaz, és a `next build` sem végez rajtuk típusellenőrzést (a `next.config.mjs` fájlban az `ignoreBuildErrors: true` van beállítva), ezért az ottani, gazdátlanná vált azonosítókból eredő regressziók (#6625/#6909) láthatatlanok voltak a CI számára. Az eltéréseket egy fájlonkénti és TS-kódonkénti darabszámokat tartalmazó, rögzített alapértékhez (`config/quality/dashboard-typecheck-baseline.json`, ugyanazzal az elavultság-ellenőrzési mintával, mint a `check:known-symbols`) viszonyítja — csak az alapértékben rögzített darabszámot meghaladó ÚJ hibák miatt bukik el az ellenőrzési kapu; ha egy már meglévő hibát kijavítottak, az alapérték az `--update` használatával csökkenthető.                                                                                                                                                                                                                                                                                                                                                                                        | Igen                                                |
| `check:build-typecheck`           | Teljes alkalmazásra kiterjedő éles típusellenőrzés a `tsconfig.build.json` alapján (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), amely lefedi azt a felületet, amelyre sem a `typecheck:core` 27 fájlból álló engedélyezési listája, sem az irányítópult ellenőrzési kapuja nem terjed ki. Az eltéréseket a `config/quality/build-typecheck-baseline.json` fájlhoz viszonyítja; egy új vagy megnövekedett fájlonkénti és kódonkénti darabszám miatt az ellenőrzés elbukik, míg az alacsonyabb darabszám az alapérték csökkentését kéri. Az `--update` megtagadja a frissítést, ha a futás új vagy megnövekedett párt tartalmaz, kivéve, ha az `--force-regressions` is meg van adva; továbbá egy újonnan elnémított fájl esetén is megtagadja azt, kivéve, ha az `--force-nocheck` is meg van adva. Így az alapérték kiszélesítése a sikeres ellenőrzés érdekében és egy végleges elnémítás engedélyezése két különálló, szándékos művelet. Az önmagában megadott `--force` elutasításra kerül. Emellett a build hatókörében az `@ts-nocheck` előfordulásait is ellenőrzi a `config/quality/ts-nocheck-baseline.json` alapján, mivel az ezt használó fájlok egyáltalán nem jelentenek diagnosztikát, ezért máskülönben minden ellenőrzési kapu számára láthatatlanok lennének. | Igen                                                |

#### A két típusellenőrző program eltérő válaszokat ad

A `typecheck:core` és a `check:build-typecheck` eltérő programokat fordít eltérő
beállításokkal, így ugyanaz a fájl az egyikben hibamentes, a másikban pedig hibákkal
teli lehet.

A `tsconfig.build.json` fájlban a `"strict": false` van beállítva, ezért a `noImplicitAny`
ki van kapcsolva. A központi konfiguráció egy gondosan összeállított, 27 fájlból álló
engedélyezési listát fordít szigorúbb beállításokkal, és követi az egyes belépési pontok
importálási gráfját, ezért azokat a fájlokat is ellenőrzi, amelyek soha nem jelennek
meg a buildprogramban.

Ennek fontos következménye van annak megítélésekor, hogy egy fájl megfelelően típusozott-e:
a **nulla diagnosztika a `check:build-typecheck` alatt nem jelent nullát**. Az
`@ts-nocheck` eltávolítása 26 fájlból azt mutatta, hogy közülük 23 hibamentes volt a
buildprogramban; ezek közül tizenhatban mintegy 120 implicit-any hiba jelent meg a
szigorú programban. Mindkettőt ellenőrizze, mielőtt egy fájlt hibamentesnek minősít.

### Feladat: `quality-gate`

A `test-coverage` után fut. Hiba esetén blokkolja az összevonást.

| Szkript                      | Ellenőrzi                                                                                                                                                                                              | Blokkoló                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| `quality:collect`            | Létrehozza a `quality-metrics.json` fájlt (ESLint-figyelmeztetések száma, lefedettség az egyesített részjelentésből)                                                                                   | Igen (a ratchet előfeltétele) |
| `quality:ratchet`            | A `quality-baseline.json` egyetlen metrikája sem romlott (ESLint-figyelmeztetések ≤ alapérték; lefedettség ≥ alapérték)                                                                                | Igen                          |
| `check:duplication`          | A kódduplikáció (jscpd@4) nem haladja meg a `quality-baseline.json` alapértékét                                                                                                                        | Igen                          |
| `check:complexity`           | A fájlszintű ciklomatikus komplexitás nem haladja meg a korlátot (alap ESLint `complexity` + `max-lines-per-function`)                                                                                 | Igen                          |
| `check:cognitive-complexity` | Kognitívkomplexitás-ratchet (`eslint-plugin-sonarjs`) — külön ESLint-futtatás; a CI mindkettőt egyetlen `check:complexity-ratchets` lépésként futtatja                                                 | Igen                          |
| `check:dead-code`            | A nem használt exportok/fájlok ratchetje (knip) nem romlik az alapértékhez képest                                                                                                                      | Igen                          |
| `check:compression-budget`   | Tömörítési benchmark keretértéke — a motoronkénti minimális tokenmegtakarítás nem romolhat                                                                                                             | Igen                          |
| `check:type-coverage`        | A típusokkal ellátott kód százalékos arányának ratchetje (`type-coverage`) nem romlik; nagyrészt kiváltja a `typecheck:noimplicit:core` ellenőrzést                                                    | Igen                          |
| `check:codeql-ratchet`       | A nyitott CodeQL-riasztások száma nem nő (lekérdezés a `gh api` segítségével; token nélkül szabályosan kihagyja) — a frissítési gyakoriságot és a kézi indítást lásd alább, a „CodeQL-ratchet” résznél | Igen                          |

### Feladat: `quality-extended`

A teljes feladat tájékoztató jellegű (`continue-on-error: true`). Az npm-alapú ratchetek
ténylegesen lefutnak; a külső ellenőrzők a `gh release download` segítségével települnek, és
kihagyják önmagukat (0-s kilépési kóddal), ha a bináris továbbra sem található.

| Szkript                  | Ellenőrzi                                                                                                                                                                                                                                              | Blokkoló                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| `check:circular-deps`    | Nincsenek körkörös függőségek (dpdm)                                                                                                                                                                                                                   | **Tájékoztató jellegű**                                    |
| `check:bundle-size`      | A csomagméret nem haladja meg a korlátot                                                                                                                                                                                                               | **Tájékoztató jellegű**                                    |
| `check:secrets`          | Titkok keresése (gitleaks) — kihagyja, ha a bináris nem található                                                                                                                                                                                      | **Tájékoztató jellegű**                                    |
| `check:vuln-ratchet`     | A függőségek sebezhetőségei (osv-scanner) nem romlanak — kihagyja, ha a bináris nem található                                                                                                                                                          | **Tájékoztató jellegű**                                    |
| `check:workflows`        | Munkafolyamat-ellenőrzés (actionlint + zizmor); a hiányzó/hibás ellenőrzők, az érvénytelen jelentések vagy a hiányzó ratchet-alapérték INCOMPLETE hibát okoznak. Az érvényes találatok a kiválasztott szigorú/tájékoztató/ratchet szabályzatot követik | A végrehajtás kötelező; a zizmor-ratchet blokkoló a CI-ben |
| `check:openapi-breaking` | A nyilvános API-szerződés (`openapi.yaml`) alapághoz viszonyított inkompatibilis változásai (oasdiff) — létrehozza az `openapiBreaking=N` értéket; kihagyja, ha az oasdiff nem található, vagy az alapspecifikáció nem oldható fel                     | **Tájékoztató jellegű**                                    |

### Feladat: `docs-sync-strict`

Minden, a `main` ágra irányuló PR esetén lefut. Hiba esetén blokkolja az egyesítést.

| Szkript                        | Mit ellenőriz                                                                                                                                                                                                    | Blokkoló                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `check:docs-all`               | Metakapu, amely egymás után futtatja az alábbi 6 alkaput                                                                                                                                                         | Igen                             |
| ↳ `check:docs-sync`            | A CHANGELOG / OpenAPI / llm.txt verzióinak konzisztenciája                                                                                                                                                       | Igen                             |
| ↳ `check:docs-counts`          | A prózában szereplő számok (szolgáltatók száma, migrációk száma stb.) a tényleges számokhoz tartozó szigorítási ablakon belül vannak                                                                             | Igen                             |
| ↳ `check:env-doc-sync`         | A `.env.example` minden környezeti változója dokumentálva van egy dokumentációs táblázatban, és fordítva                                                                                                         | Igen                             |
| ↳ `check:deprecated-versions`  | A dokumentáció nem tartalmaz elavult verziókarakterláncokat                                                                                                                                                      | Igen                             |
| ↳ `check:doc-links`            | A dokumentáción belüli markdown-hivatkozások létező fájlokra mutatnak (`[text]`/`(path)` forma)                                                                                                                  | Igen                             |
| ↳ `check:fabricated-docs`      | A dokumentációban hivatkozott útvonalak, környezeti változók, CLI-parancsok, hooknevek és fájlútvonalak léteznek a kódbázisban. Szigorú kapu `--strict` használatával; a kapcsoló nélkül csak enyhe hibát jelez. | Igen (CI-ben a `--strict` révén) |
| `check:cli-i18n`               | A CLI-parancskarakterláncok minden i18n területi fájlban megtalálhatók                                                                                                                                           | Igen                             |
| `check:openapi-coverage`       | Az OpenAPI-specifikáció a valós útvonalak legalább egy szigorítással meghatározott alsó korlátját lefedi                                                                                                         | Igen                             |
| `check:openapi-security-tiers` | Az `openapi.yaml` biztonsági szintre vonatkozó annotációi összhangban vannak a `routeGuard.ts` besorolásaival                                                                                                    | **Tájékoztató jellegű**          |
| `check:openapi-routes`         | Az `openapi.yaml` minden útvonala egy valós `route.ts` fájlra oldódik fel (hallucináció elleni védelem)                                                                                                          | Igen                             |
| `check:docs-symbols`           | A `docs/**/*.md` minden `/api/...` hivatkozása egy valós `route.ts` fájlra oldódik fel (hallucináció elleni védelem)                                                                                             | Igen                             |
| `i18n translation drift`       | Lefordítatlan kulcsok az i18n területi fájlokban — csak figyelmeztetés                                                                                                                                           | **Tájékoztató jellegű**          |

A `docs/diagrams/` alatti tizenkét README SVG generált (`scripts/docs/gen-readme-<name>.mjs`;
az `npm run docs:readme-diagrams` mindegyiket újragenerálja). Mindegyikhez tartozik egy bájtszintű összehasonlítást végző egységteszt
(`tests/unit/docs/readme-*-svg.test.ts`, `test-unit` feladat), amely sikertelen lesz, ha a verziókövetésbe mentett fájl
elavult, a `check:docs-counts` pedig a `<text>` csomópontjaikból olvassa ki a kanonikus számokat — ezért
a körvonalazási lépés minden körvonalazott karakterláncot láthatatlan `<text>` elemként tart meg a fájlban. Az SVG-k kanonikus számait ellenőrző vizsgálat az
`SVG_DIAGRAM_FILES` (`scripts/check/check-docs-counts-sync.mjs`) listában szereplő fájlokat olvassa: `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, valamint `public/images/tier-flow-dark.svg` és `tier-flow-light.svg`; az
örökre ingyenes használatra, a katalógusbejegyzésekre, az ismétlődő keretre és a pontozási tényezőkre vonatkozó állítások ezenkívül a
`promise-pillars.svg`, `free-tier-budget.svg` és `strategies-grid.svg` fájlokat is olvassák. A `free-tier-budget.svg`
az adatait az élő katalógusbetöltőből nyeri, így a `FREE_MODEL_BUDGETS` vagy egy
szolgáltatói megjelenítési név módosítása hibára futtatja a CI-t, amíg a fájlt újra nem generálják.

### Feladat: `i18n-ui-coverage`

| Szkript                           | Mit ellenőriz                                                                                                                                                                                                                  | Blokkoló                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `check-ui-keys-coverage` (inline) | A felhasználói felület i18n-kulcsainak lefedettsége ≥ 65%                                                                                                                                                                      | Igen                    |
| `check-ui-value-drift` (inline)   | Egy átírt angol **érték** után nem marad elavult fordítás                                                                                                                                                                      | Igen                    |
| `check-new-key-coverage` (inline) | Egy **új** angol kulcs minden területi változatban le van fordítva — a `__MISSING__:` jelölő elutasításra kerül                                                                                                                | Igen                    |
| `check-translation-ratio`         | A valódi fordítások területi változatonkénti aránya (az angollal azonos / helyőrző / hiányzó levelek az engedélyezési listán kívül) nem haladhatja meg a `config/quality/i18n-translation-baseline.json` értékét + a ráhagyást | **Tájékoztató jellegű** |

`fetch-depth: 0` szükséges — az értékváltozási kapu az `en.json` fájlt az egyesítési bázissal hasonlítja össze.

#### `check-ui-value-drift` — elavult fordításokat ellenőrző kapu

Elkapja azt az i18n regressziót, amelyet a többi kapu szerkezetileg nem lát: egy angol érték átírásra kerül, és az _korábbi_ angolból származó fordítások hátramaradnak, így a nem angol felhasználók továbbra is magabiztosan megfogalmazott, most hibás példányt olvasnak.

Ezt valóban szállították. `oauthModal.googleOAuthWarning` átírásra került, amikor a Antigravity bejelentkezési segéd leszállt (#5203);** 39/43 terület** folyamatosan szöveg, amely azt mondta az operátoroknak, hogy "másolják ki a teljes URL és illessze be alább" — egy folyamatot, amely nem fejezhető be az adott szolgáltató számára. #8463 ig észrevétlen maradt, mert:

- `sync-ui-keys` csak azokat a kulcsokat tölti ki, amelyek vannak** hiányzó** , soha olyanokat, amelyek azok** állott** ;
- `check-ui-keys-coverage` a kulcs _jelenlétet_ számítja, így az elavult fordítás lefedettnek minősül;
- `check-translation-drift` tracks the `docs/i18n/<locale>/**.md` documentation mirrors — it never reads `src/i18n/messages/*.json`. Blocking in job `docs-sync-strict` since the 2026-09 re-sync: edit a core doc → `npm run i18n:run -- --files=<doc>` (section-level, cheap).

**Diff-tudatos, nem alapvonal-támogatással.** Összehasonlítja `en.json` az egyesítési bázison a működő fával; minden olyan kulcs esetében, amelynek angol értéke megváltozott, minden olyan területi beállítás, amely érintetlen fordítást tartalmaz, elavult. Ezt szándékosan** befagyasztja a már meglévő adósságot** — a diff nem tudja felfedni, hogy egy régóta létező fordítás melyik régi angolból származik, így a kapu csak azt ítéli meg, hogy az aktuális változás mit érint. Az alternatíva (a kulcsonkénti kivonat alapvonala) egy ~ 600 KB generált fájlba kerülne, amely 3 × a legnagyobb létező alapvonal, amely minden i18n PR esetén kavar.

Kétféleképpen lehet kielégíteni:

1. frissítse az érintett fordításokat, vagy
2. állítsa be őket a `__MISSING__:<new english>` — értékre, majd a futási környezet a javított angol nyelvet (`src/i18n/request.ts::deepMergeFallback`, #7258) és a kulcssorokat szolgálja ki a fordításhoz.

Ha a húr** jelentése** megváltozott, inkább** a kulcs átnevezése** : egy új kulcs nem örökölheti az elavult fordítást. Ez a #8463 minta.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Kilép a 0- `SKIP reason=base-unresolved` val, ha az alapkatalógus nem olvasható (sekély klón az alap ref nélkül), tükrözve `check-openapi-breaking`.

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

| Munkafolyamat          | Ellenőrzés                                                                                                                                                                                           | Blokkoló        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | fast-check tulajdonságalapú tesztek véletlenszerű kezdőértékkel és magas futtatásszámmal                                                                                                             | **Tájékoztató** |
| `nightly-resilience`   | heapnövekedési korlát, káoszalapú hibainjektálás, k6 terhelési/tartóssági teszt                                                                                                                      | **Tájékoztató** |
| `nightly-llm-security` | promptfoo injektálás elleni védelem (blokkolási mód) + garak-próbák (szolgáltatói titkos kulcs nélkül kihagyva)                                                                                      | **Tájékoztató** |
| `nightly-schemathesis` | OpenAPI-szerződés fuzztesztelése (schemathesis) egy élő OmniRoute-példányon a `docs/openapi.yaml` használatával — feltárja a specifikáció megsértéseit / a nem kezelt 500-as hibákat (8. fázis, B.4) | **Tájékoztató** |
| `nightly-mutation`     | Stryker mutációtesztelési pontszám a gyors egységtesztelési sávon — a túlélő mutánsok gyenge állításokra világítanak rá                                                                              | **Tájékoztató** |
| `nightly-compat`       | Node-motorkompatibilitási mátrix a támogatott `engines.node`-tartományokhoz                                                                                                                          | **Tájékoztató** |

A teljesítmény-alapértékeket (heap, TTFB, buildelési idő) rögzítjük, de nem használjuk blokkolási feltételként: lásd [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
