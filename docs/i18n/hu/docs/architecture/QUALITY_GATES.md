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

## Gate-készlet és végrehajtási profilok

### Jelöltfelvétel

A CI és a Quality Gates munkafolyamatok egy-egy stabil döntést adnak ki: `Gate / CI` és
`Gate / Quality`. A verziózott felvételi szabályzat minden upstream feladatot kötelezőként
vagy tájékoztató jellegűként sorol fel. Egy alkalmazandó kötelező feladatnak sikeresnek kell
lennie: a hiányzó, megszakított, kihagyott, függőben lévő és ismeretlen eredmények nem
állapíthatnak meg PASS állapotot. Az érvényes, csak dokumentációt vagy csak katalógust érintő
besorolás alkalmazhatatlanná tehet egy kódsávot; egy draft PR nem elfogadott jelölt. A `hotfix`
címke nem mentesít a bizonyíték alól.

Mindkét munkafolyamat lefedi a main/release ágakba irányuló PR-eket, a `main` ágra történő
pushokat, a manuális indítást és a merge-group eseményeket. A push, a dispatch és a
merge-group a teljes kiválasztást futtatja. A `release/**` ágra történő pushok nem indítják el
ezeket (2026-10-18): minden módosítás már lefuttatta a mátrixot a PR-ján, az összevont kombináció
pedig a Release-Green feladata (`docs/ops/RUNNER_BOX.md` → Hosted lane). A forkok és a merge
groupok hosted runnereket használnak az egyébként self-hosted runnereket választó feladatokhoz;
a bevezetés előtt ellenőrizni kell a megfelelő hosted kapacitást.

Egy szokásos PR a gyors kiválasztást futtatja. A felvételi szabályzat `full-code` és
`full-code-e2e` sávjai (E2E, integráció, csomag-artefaktum, Electron smoke, Bun SQLite,
ökoszisztéma- és protokollkliensek) csak Mergify queue drafton vagy teljes futtatás során
futnak:
`gh workflow run ci.yml --ref <branch>`.

Minden JSON-bizonylat azonosítja a checkoutolt SHA-t, a munkafolyamat-futtatást és a próbálkozást.
A CLI elutasítja a checkout-/esemény-SHA eltérését. A munkafolyamat-tesztek a szabályzattagságot
a döntési feladat `needs` listájához kötik, így egy új vagy eltávolított sáv nem tűnhet el
észrevétlenül. A bizonylatok a saját munkafolyamatukat fedik le, nem a közzétételt, a telepítést
vagy egy meglévő tájékoztató szkenner belső működését. Mindkét ellenőrzés nevének aktiválása az
ágvédelmi szabályokban külön adminisztratív módosítás; ezen feladatok hozzáadása önmagában nem
védi az ágat.

### Merge queue

A `queue` címke elküldi a PR-t a Mergify queue-ba (`.mergify.yml`). A Mergify draft PR-t nyit egy
`mergify/merge-queue/` ágon, a CI ott lefuttatja a teljes kiválasztást, az eredeti PR pedig akkor
kerül összevonásra, amikor a `Gate / CI`, a `Gate / Quality` és a
`Merge integrity (changelog + generated skills)` sikeres.

A Mergify a queue összefoglalóját a draft leírásába írja, és más alkalmazások is szerkeszthetik
azt. Egy ilyen draftra érkező `pull_request` `edited` esemény saját konkurenciacsoportot kap
(`-queue-edit-<run_id>`), ezért nem szakíthatja meg a draft valódi futtatását, és kihagyja a gate-et
és a mátrixot. Csak a `Merge integrity` fut le továbbra is. A kihagyott gate-feladat másik
ellenőrzésnevet visel, mert a Mergify a kihagyott `Gate / CI` ellenőrzést sikertelenként értelmezi,
és kiveszi a PR-t a queue-ból.

A queue-ból való kivétel után egy push nem mindig teszi vissza a PR-t a queue-ba. Írj rá
`@mergifyio queue` megjegyzést.

### A megőrzött bizonyítékok az elfogadási reduktorban

A `scripts/quality/validate-release-acceptance.mjs` egy megadott tervet és annak
manifesztjeit redukálja; nem állapítja meg, hogy a terv lefedi-e a teljes kiadási folyamatot.
A jelentései kifejezetten `releaseAcceptance: false` értéket állítanak be, még akkor is, ha az
adott terv `VERIFIED`. A `release-acceptance.yml` munkafolyamat továbbra is árnyékfixture-öket
használ, nem valódi build-, csomagolási, indítási vagy előléptetési bizonylatokat.

A CLI az állandó bizonyítékok ellenőrzéséhez megköveteli a `--evidence-root` kapcsolót. A fájlok
feloldása `<evidence-root>/<artifact_id>/<member>` formában történik, és SHA-256 szerint
hash-elődnek. Egy bizonyíték nélküli PASS rekord, egy hiányzó vagy módosult fájl, egy nem
biztonságos elérési út vagy egy szimbolikus hivatkozás megakadályozza az ellenőrzést. A hiányzó
fájlok nem egyenértékűek az üres, sikeres naplókkal. A meglévő SHA-/futtatás-/próbálkozás-
ellenőrzések továbbra is függetlenek: az egyező bájtok nem menthetnek meg egy elavult
bizonylatot. A fájlintegritás nem bizonyítja a végrehajtás hitelességét vagy az artefaktum
előléptetését.

### Statikus szkennelési készlet

A verziózott npm-alias-készlet és a statikus szkennelési tagság a
`config/quality/gate-manifest.json` fájlban található. Futtasd a
`npm run check:gate-manifest` parancsot a szkriptnevek és a pontos parancsok
`package.json` fájllal való érvényesítéséhez; a hozzáadások, eltávolítások és a parancsok
eltérései meghiúsítják mind a helyi hookot, mind a CI módosításbesorolási feladatait.
Egy alias nem munkafolyamat-feladat, mátrixpéldány vagy teszteset: ezeket a számokat nem
szabad egymással felcserélhetőként bemutatni.

Használd a `npm run quality:scan -- --list` vagy a
`npm run quality:scan:fast -- --list` parancsot a kiválasztott aliasok végrehajtás nélküli
megtekintéséhez. A futtató az npm belépési pontot hívja meg, ezért megmarad a futtatókörnyezete
(beleértve a konfigurált Bun-t is). A manifeszt a profilokon kívüli aliasokat külön meghívottként
rögzíti, a karbantartási parancsok pedig tiltottak a csak olvasható szkennelési profilokban.

Ezek a profilok csak a statikus szkennelést fedik le. Nem tanúsítják a termékteszteket, a
lefedettséget, a csomagolást, a külső ellenőrzéseket vagy egy jelölt teljes kiadási elfogadását.
A munkafolyamat-felvétele a kapcsolódó `config/quality/admission-policy.json` és
`scripts/quality/admission-verdict.mjs` fájlokat használja. A Release-observer profilok különállóak;
az alkalmazandó ellenőrzéseiket és bizonylataikat egymástól függetlenül vizsgáld meg. A teljes
observer statikus parancsait a `config/quality/release-green-static-profile.json` deklarálja,
beleértve az `audit:deps` parancsot, a mutációs teszt kiválasztását és a fordítási ellenőrzéseket.
A betöltő a npm-parancsokat a package.json és a modellezett CI/Quality-deklarációk alapján
érvényesíti; az eltérést elutasítja ahelyett, hogy shell-tokeneket argumentumként hajtana végre.
A kötelező szkenner SKIP/INCOMPLETE kimenete nem állapíthat meg PASS állapotot. A profil rögzíti
külső kizárásait, és nem helyettesíti a hosted lefedettséget, a tesztmátrixokat, a csomagolási
vagy telepítési bizonyítékokat. Az alábbi szöveges készlet hivatkozási alap, nem bizonyíték arra,
hogy egy gate ténylegesen lefutott.

A szkriptek a `scripts/check/` (szabályzat-gate-ek) és a `scripts/quality/` (ratchet-motor)
alatt találhatók. A CI igazságforrása a `.github/workflows/ci.yml`.

### Kiadási PR gyorsút (`quality.yml`)

A `.github/workflows/quality.yml` kiegészíti a CI-t a main/release PR-ek, a `main` ágra történő
pushok, a dispatch és a merge groupok esetében. A PR-ek útvonal alapján szűrt gyors ellenőrzéseket
használnak. A véglegesen letiltott duplikált build eltávolításra került; a valódi build-,
csomagolási és indítási ellenőrzések a CI-ben maradnak. Az egységteszt-készlet és a vitest csak
a CI-ben fut (`Unit Tests (N/8)` és `Vitest`).

| Feladat                                          | Hatókör                                                                                                                                                 | Blokkoló                      |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `Docs Gates (fast-path)`                         | Dokumentációs/kód PR-ek; API-dokumentációs hivatkozások és docs-all                                                                                     | Igen                          |
| `Fast Quality Gates`                             | Kód PR-ek; statikus ellenőrzések, típusellenőrzés, dashboard típusellenőrzése, érintett egységtesztek, elfelejtett testvértesztek (tájékoztató jellegű) |
| `No new ESLint warnings`                         | Kód PR-ek; a tiltásokkal is számoló lint-ellenőrzés                                                                                                     | Igen, a forkokat is beleértve |
| `Merge integrity (changelog + generated skills)` | Nem piszkozat PR-ek; changelog és generált skill-ek szinkronizálása                                                                                     | Igen, a forkokat is beleértve |

#### Elfelejtett testvértesztek jelentése

A `npm run check:forgotten-sibling-tests` a `Fast Quality Gates` tájékoztató jellegű lépéseként fut, és újra felhasználja a tesztek hatástérképét létrehozó importfeloldót.
Minden módosított éles modulfájlhoz determinisztikus
`changed module/symbol -> static consumer -> candidate sibling test` láncokat jelent, amikor a jelölt
teszt hiányzik a pull request diffjéből. A Markdown-összefoglalót és a JSON-eredményt a rendszer
`forgotten-sibling-tests` workflow-artefaktumként őrzi meg, hogy a blokkoló bevezetés előtt kalibrálható legyen.

A barrel-újraexportok és a dinamikus importok csak feloldási diagnosztikát jelentenek; soha nem hoznak létre
blokkoló találatot. Az ellenőrzött kivételek a
`config/quality/forgotten-sibling-allowlist.json` fájlban találhatók. Minden bejegyzésnek meg kell neveznie a fogyasztót és a jelölt
tesztet, konkrét indoklást kell adnia, valamint egy GitHub-problémára vagy pull requestre kell hivatkoznia. A hibásan formázott bejegyzések biztonsági okokból sikertelenül zárulnak. A kivételek nem tilthatják le a törölt jelölt tesztet vagy egy olyan diffet, amely `.skip`/`.todo` elemet ad hozzá;
az állítások gyengítése és az egyéb elfedési módszerek a függetlenül blokkoló
`check:test-masking` kapu hatáskörébe tartoznak.

### Feladat: `lint`

Minden, a `main` ágra irányuló PR-en lefut. Sikertelenség esetén blokkolja az összeolvasztást.

| Parancsfájl (`npm run ...`)       | Ellenőrzi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Blokkoló                                            |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:node-runtime`              | A Node.js verzió a támogatott tartományon belül van                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Igen                                                |
| `check:cycles`                    | Körkörös importok a teljes `src/` + `open-sse/` területen (AST-alapú, a tsconfig `paths` feloldásával). A Bare mindig 1-es kóddal lép ki, amikor bármilyen ciklus létezik (lezárt hibakezelés a #15281 óta), és felsorolja az SCC-ket. A `check:cycles:ratchet` (ezt futtatja a CI) blokkol, ha a darabszám meghaladja a `quality-baseline.json` fájlban található `metrics.cycles` felső korlátot — jelenleg 14, `direction: down`, ezért csak csökkenhet (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Igen (ratchet)                                      |
| `check:boundary`                  | `open-sse → src` csatolás: az engine-ből az alkalmazásba irányuló egyedi fájlról fájlra történő importok (`scripts/quality/measure-boundary.mjs`; az él lista a v4 core/module-split helyreállítási teendőlistája). A Bare tanácsadó jelentést készít (ugyanaz, mint a `quality:boundary`). A `check:boundary:ratchet` (ezt futtatja a CI, és ez is a `quality.yml` gyors kapuinak ratchet ciklusában található) blokkol, ha a darabszám meghaladja a `quality-baseline.json` fájlban található `metrics.boundaryOpenSseToSrc` felső korlátot — a mért 771 értékkel inicializálva, `direction: down`; a `--update` csak csökkentheti; PR-ek esetén az alaphoz viszonyítva (`--base-ref`, lásd alább)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen (ratchet)                                      |
| `check:route-validation:t06`      | A Zod-sémák minden útvonalon jelen vannak (6. szintű szabályzat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Igen                                                |
| `check:any-budget:t11`            | Az `@ts-expect-error // any` darabszáma nem haladja meg a keretet (11. szintű catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Igen                                                |
| `check:provider-consistency`      | A `providers.ts` minden szolgáltatójához tartozik megfelelő bejegyzés a `providerRegistry.ts` fájlban (és fordítva, az engedélyezési listán belül)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                                |
| `check:model-lifecycle`           | A három manuálisan karbantartott útválasztási tábla konzisztens marad a verziókezelt életciklus-pillanatképpel (#11503): a `FITNESS_TABLE` (`taskFitness.ts`) nem pontoz olyan kivezetett azonosítót, amelyet a `REGISTRY` útválasztani tud; minden `BUILT_IN_ALIASES` célja jelen van a `REGISTRY`-ben, és hiányzik a kivezetett azonosítók pillanatképéből; minden, a `REGISTRY`-ben még szereplő kivezetett azonosító továbbításra kerül, vagy szerepel az `allowedRetiredInCatalog` listában; továbbá a `DEFAULT_DEGRADATION_MAP` egyetlen forrása vagy célja sem szerepel kivezetettként abban a pillanatképben. Ez nem bizonyítja, hogy egy modellt jelenleg élő upstream szolgáltat-e. Offline — összehasonlítást végez a `config/quality/model-lifecycle.json` fájllal, amelyet manuálisan frissít az `npm run quality:refresh-model-lifecycle` (hálózat; nincs bekötve a CI-ba). Az `allowedRetiredInCatalog` egy leépítési ratchet: csak nyomonkövetési feladattal együtt adj hozzá bejegyzést.                                                                                                                                                                                                            | Igen                                                |
| `check:fetch-targets`             | A kliensoldali `src/` könyvtárban található minden `fetch("/api/...")` egy valódi `route.ts` fájlra oldódik fel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Igen                                                |
| `check:deps`                      | A tároló minden `package.json` fájljában található, `npm install` által telepíthető függőség szerepel a `dependency-allowlist.json` fájlban; az új, verzióhoz nem kötött vagy slopsquattinggal létrehozott csomagok megjelölésre kerülnek                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Igen                                                |
| `audit:deps`                      | Mind az öt független lockfájl (`root`, Electron, OpenCode plugins v1/v2 és provider) npm auditja. A kritikus riasztások blokkolnak; a magas súlyosságú riasztások továbbra is látható figyelmeztetések maradnak. A hiányzó vagy sikertelen auditok INCOMPLETE állapotúak és blokkolnak; a hatókörönkénti lock-hash-ek és jelentések megőrzésre kerülnek.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Igen                                                |
| `check:lockfile`                  | `package-lock.json` integritása — HTTPS-registry, integritási hash-ek, host-felülbírálások nélkül                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Igen                                                |
| `check:licenses`                  | SPDX-licencengedélyezési lista éles függőségekhez                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Igen                                                |
| `check:tracked-artifacts`         | Nincsenek buildelési artefaktumok / commitolt `node_modules`-szimbolikus hivatkozások (a husky pre-commit során is lefut; a pre-push szándékosan csak minimális ellenőrzéseket végez — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Igen                                                |
| `check:ai-attribution`            | Nincs AI-/bot-eredetű `Co-Authored-By` trailer vagy AI-generálási lábléc a PR-commitokban, a címben vagy a törzsben — #16. szigorú szabály (a `quality.yml` gyors ellenőrzéseinek ciklusában a PR→`release/**` esetén — az esemény hasznos adatait olvassa be, PR-eken kívül nem végez műveletet —, valamint PR-ekre korlátozott lépésként a `ci.yml` lintben PR→`main` esetén; továbbá a husky `commit-msg` hookban; emberi társszerzők engedélyezettek; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | Minden Vitest-kizárás megnevez egy nyomonkövetési feladatot, és szerepel a `config/quality/vitest-exclusions.json` fájlban (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Igen                                                |
| `check:file-size`                 | A forrásfájlok (`.ts`/`.tsx` a `src/`, `open-sse/`, `electron/`, `bin/` könyvtárakban) a `cap` értékén belül maradnak, a tesztfájlok (`*.test.ts(x)`) pedig a `testCap` értékén belül; a `file-size-baseline.json` fájlban rögzített (`frozen` / `testFrozen`) fájlok mérete nem haladhatja meg a rögzített méretet                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Igen                                                |
| `check:error-helper`              | A végrehajtókban/kezelőkben található hibaválaszok a `buildErrorBody()` / `sanitizeErrorMessage()` függvényeket használják (Szigorú szabály #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Igen                                                |
| `check:migration-numbering`       | A migrációs SQL-fájlok sorszámozása szekvenciális, nincsenek hiányzó vagy duplikált számok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Igen                                                |
| `check:public-creds`              | A `publicCreds.ts` fájlon kívül nincsenek literális OAuth `client_id`/`client_secret` értékek vagy Firebase Web-kulcsok (Szigorú szabály #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Igen                                                |
| `check:db-rules`                  | A `src/lib/db/` modulokon kívül nincs nyers SQL; a `localDb.ts` fájlból nincsenek barrel-importok (Szigorú szabályok #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Igen                                                |
| `check:known-symbols`             | A diszpécsertábláikban regisztrált szolgáltatói végrehajtók, útválasztási stratégiák és fordítók megfelelnek a lemezen található fájloknak — nincsenek árva vagy nem deklarált szimbólumok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Igen                                                |
| `check:route-guard-membership`    | Minden, gyermekfolyamatot létrehozó útvonalat az `isLocalOnlyPath()` osztályoz (Szigorú szabályok #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Igen                                                |
| `check:test-discovery`            | A repó minden `*.test.ts` / `*.spec.ts` fájlját legalább egy tesztfuttató összegyűjti (szigorítás: a `test-discovery-baseline.json` árvalistája csak rövidülhet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Igen                                                |
| `check:test-tla-order`            | A `tests/unit` alatti egyetlen `node:test` fájl sem regisztrál tesztet, ér el legfelső szintű `await` utasítást, majd regisztrál további teszteket (#18045; szigorítás: a `test-tla-order-allowlist.json` csak rövidülhet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Igen                                                |
| `check:agent-skills-sync`         | A generált agent-skills-összetevők megegyeznek a forráskatalógussal (nincs eltérés). A kiadási mód minden skillt ellenőriz; egy feature PR (`pr` mód) csak azokat a skilleket ellenőrzi, amelyek generált szövegét módosítja — lásd: [Generált fájlok és származtatott alapértékek](#generated-files-and-derived-baselines-written-at-release)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:provider-asset-provenance` | A szolgáltatói logókhoz/erőforrásokhoz rögzített eredetinformációs bejegyzés tartozik                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `lint:json`                       | A JSON-konfigurációs fájlok értelmezhetők, és megfelelnek a repó lintelési szabályainak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | TypeScript-fordítás hibák nélkül (csak tájékoztató jellegű figyelmeztetések)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Igen                                                |
| `typecheck:noimplicit:core`       | Szigorú `noImplicitAny` — előretekintő ellenőrzés; számos meglévő hívási helyhez még annotációk szükségesek                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **Tájékoztató jellegű** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | A `tsc` hatóköre a `src/app/(dashboard)/**` (#7033) — a `typecheck:core` válogatott, 27 fájlból álló engedélyezési listája egyetlen dashboard TSX-fájlt sem tartalmaz, és a `next build` sem végez rajta típusellenőrzést (a `next.config.mjs` a `ignoreBuildErrors: true` beállítást adja meg), így az árvaazonosító-visszaesések (#6625/#6909) láthatatlanok maradtak a CI számára. A rendszer összeveti az eredményeket egy fájlonkénti/TS-kódonkénti rögzített számlálási alappal (`config/quality/dashboard-typecheck-baseline.json`, ugyanaz az elavult állapotot kezelő érvényesítési minta, mint a `check:known-symbols` esetén) — csak az alapszámláláson felüli ÚJ hibák akadályozzák meg az átjárót; az alapszint a `--update` kapcsolóval csökkenthető, amikor egy meglévő hibát kijavítanak.                                                                                                                                                                                                                                                                                                                                                                                                            | Igen                                                |
| `check:build-typecheck`           | Teljes alkalmazásra kiterjedő éles környezeti típusellenőrzés a `tsconfig.build.json` fájlon keresztül (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`); ezt a felületet a `typecheck:core` 27 fájlból álló engedélyezési listája és a dashboard-ellenőrzés nem fedi le. Az eredményeket összeveti a `config/quality/build-typecheck-baseline.json` fájllal; új vagy megemelkedett fájlonkénti és kódonkénti számlálás meghiúsítja az ellenőrzést, alacsonyabb számlálás esetén pedig csökkenteni kell az alapszintet. A `--update` megtagadja a működést, ha a futtatás új vagy megemelkedett párt tartalmaz, kivéve, ha átadásra kerül a `--force-regressions`, és megtagadja az újonnan elnémított fájlt is, kivéve, ha átadásra kerül a `--force-nocheck`; így az alapszint kibővítése a sikeres eredmény érdekében és egy végleges elnémítás engedélyezése két különálló, tudatos művelet. A puszta `--force` elutasításra kerül. Emellett a build hatókörében a `@ts-nocheck` használatát is ellenőrzi a `config/quality/ts-nocheck-baseline.json` alapján, mivel az ezt használó fájl egyáltalán nem jelent diagnosztikát, és egyébként láthatatlan maradna minden ellenőrzés számára. | Igen                                                |

#### Két típusellenőrzési program eltérő választ ad

A `typecheck:core` és a `check:build-typecheck` eltérő programokat fordítanak le,
eltérő beállításokkal, ezért ugyanaz a fájl az egyikben hibamentes, a másikban pedig
tele lehet hibákkal.

A `tsconfig.build.json` a `"strict": false` beállítást adja meg, így a
`noImplicitAny` ki van kapcsolva. A core-konfiguráció egy válogatott, 27 fájlból álló
engedélyezési listát fordít le szigorúbb beállításokkal, és követi az egyes
bejegyzések importálási gráfját, ezért azok a fájlok is ellenőrzésre kerülnek, amelyek
soha nem jelennek meg a buildprogramban.

Ennek jelentősége van annak megítélésekor, hogy egy fájl típusosan ellenőrzött-e:
**a `check:build-typecheck` alatti nulla diagnosztika nem jelent nullát**. A 26
fájlból az `@ts-nocheck` eltávolítása azt mutatta, hogy közülük 23 hibamentes a
buildprogramban; ezek közül tizenhatban körülbelül 120 implicit-any hibát hozott
felszínre a szigorú program. Mindkettőt ellenőrizd, mielőtt egy fájlt hibamentesnek
nyilvánítasz.

### Feladat: `quality-gate`

A `test-coverage` után fut le. Hiba esetén megakadályozza az összevonást.

| Script                       | Ellenőrzi                                                                                                                                                                                                     | Blokkoló                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `quality:collect`            | Kibocsátja a `quality-metrics.json` fájlt (ESLint-figyelmeztetések száma, az összevont shard-jelentésből származó lefedettség)                                                                                | Igen (a ratchet előfeltétele) |
| `quality:ratchet`            | A `quality-baseline.json` minden metrikája nem romlott (ESLint-figyelmeztetések ≤ baseline; lefedettség ≥ baseline)                                                                                           | Igen                          |
| `check:duplication`          | A kódduplikáció (jscpd@4) nem haladja meg a `quality-baseline.json` fájlban szereplő baseline-értéket                                                                                                         | Igen                          |
| `check:complexity`           | A fájlszintű ciklomatikus komplexitás nem haladja meg a korlátot (az ESLint beépített `complexity` szabálya + `max-lines-per-function`)                                                                       | Igen                          |
| `check:cognitive-complexity` | Kognitívkomplexitás-ratchet (`eslint-plugin-sonarjs`) — külön ESLint-futtatás; a CI mindkettőt összevonva, egyetlen `check:complexity-ratchets` lépésként futtatja                                            | Igen                          |
| `check:dead-code`            | A nem használt exportok / fájlok ratchetje (knip) nem romlik a baseline-hoz képest                                                                                                                            | Igen                          |
| `check:compression-budget`   | Tömörítési benchmarkkeret — motoronként a tokenmegtakarítási minimumok nem romolhatnak                                                                                                                        | Igen                          |
| `check:type-coverage`        | A típusos lefedettség százalékos ratchetje (`type-coverage`) nem romlik; nagyrészt magában foglalja a `typecheck:noimplicit:core` ellenőrzést                                                                 | Igen                          |
| `check:codeql-ratchet`       | A nyitott CodeQL-riasztások száma nem romlik (a `gh api` használatával olvassa be; token nélkül szabályosan kihagyja) — a frissítési ütemezést és a kézi indítást lásd lentebb, a „CodeQL-ratchet” szakaszban | Igen                          |

### Feladat: `quality-extended`

A teljes feladat tájékoztató jellegű (`continue-on-error: true`). Az npm-alapú ratchetek
ténylegesen lefutnak; a külső szkennerek a `gh release download` használatával települnek,
és önmagukat kihagyják (0-s kilépési kód),
ha egy bináris fájl még hiányzik.

| Script                   | Ellenőrzi                                                                                                                                                                                                                                                     | Blokkoló                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `check:circular-deps`    | Nincsenek körkörös függőségek (dpdm)                                                                                                                                                                                                                          | **Tájékoztató jellegű**                                  |
| `check:bundle-size`      | A bundle mérete nem haladja meg a korlátot                                                                                                                                                                                                                    | **Tájékoztató jellegű**                                  |
| `check:secrets`          | Titkok keresése (gitleaks) — kihagyja az ellenőrzést, ha a bináris fájl hiányzik                                                                                                                                                                              | **Tájékoztató jellegű**                                  |
| `check:vuln-ratchet`     | A függőségek sebezhetőségei (osv-scanner) nem romlanak — a `--ratchet` INCOMPLETE állapotként (2-es kilépési kóddal) meghiúsul, ha nincs mérési eredmény                                                                                                      | **Tájékoztató jellegű**                                  |
| `check:workflows`        | Workflow-lint (actionlint + zizmor); hiányzó vagy hibás szkennerek, érvénytelen jelentések, illetve hiányzó ratchet-baseline INCOMPLETE állapotként meghiúsulnak. Az érvényes találatok a kiválasztott szigorú/tájékoztató jellegű/ratchet-házirendet követik | Futtatás szükséges; a zizmor ratchetje blokkoló a CI-ban |
| `check:openapi-breaking` | A nyilvános API-szerződés a rögzített esemény-commitokhoz képest (PR merge-base, push előtti állapot, merge-group base; ütemezett/kézi futtatáskor az első szülő checkoutja); a szükséges mérés hibát jelez, ha nem állapítható meg                           | **Blokkoló a --ratchet használatakor**                   |

### Feladat: `docs-sync-strict`

Minden `main`-be irányuló PR-en lefut. Hiba esetén blokkolja az összevonást.

| Script                         | Ellenőrzi                                                                                                                                                                                                          | Blokkoló                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| `check:docs-all`               | Meta-kapu, amely egymás után futtatja az alábbi 6 alk603aput                                                                                                                                                       | Igen                                             |
| ↳ `check:docs-sync`            | A CHANGELOG / OpenAPI verzióinak konzisztenciája; release módban továbbá a 66 `llm.txt` tükörfájl és a lefordított CHANGELOG-szakaszok (PR módban: a tükrök egyeznek)                                              | Igen                                             |
| ↳ `check:docs-counts`          | A prózában szereplő számok (szolgáltatók száma, migrációk száma stb.). Két mód: `pr` funkciós PR-ek esetén, `release` egyébként — lásd alább a „Származtatott értékek” részt                                       | Igen                                             |
| ↳ `check:env-doc-sync`         | A `.env.example` minden környezeti változója szerepel egy dokumentációs táblázatban, és fordítva                                                                                                                   | Igen                                             |
| ↳ `check:deprecated-versions`  | Nincsenek elavult verziószövegek a dokumentációban                                                                                                                                                                 | Igen                                             |
| ↳ `check:doc-links`            | A dokumentáció belső markdown-hivatkozásai valódi fájlokra mutatnak (`[text]`/`(path)` formátum)                                                                                                                   | Igen                                             |
| ↳ `check:fabricated-docs`      | A dokumentációban hivatkozott útvonalak, környezeti változók, CLI-parancsok, hook-nevek és fájlútvonalak léteznek a kódbázisban. A `--strict` kapcsolóval kemény kapu; a kapcsoló nélkül nem blokkoló hibát jelez. | Igen (a CI-ban a `--strict` kapcsolón keresztül) |
| `check:cli-i18n`               | A CLI `t()` kulcsai léteznek a `bin/cli/locales/en.json` fájlban (mindkét módban); a pt-BR / zh-CN / zh-TW egyezése az `en.json` fájllal csak release módban                                                       | Igen                                             |
| `check:openapi-coverage`       | Az OpenAPI-specifikáció a valódi útvonalak legalább egy fokozatosan növelt alsó küszöbét lefedi                                                                                                                    | Igen                                             |
| `check:openapi-security-tiers` | Az `openapi.yaml` biztonsági szintjeinek megjegyzései összhangban vannak a `routeGuard.ts` besorolásaival                                                                                                          | **Tájékoztató jellegű**                          |
| `check:openapi-routes`         | Az `openapi.yaml` minden útvonala valódi `route.ts` fájlra oldódik fel (hallucinációellenőrzés)                                                                                                                    | Igen                                             |
| `check:docs-symbols`           | A `docs/**/*.md` minden `/api/...` hivatkozása valódi `route.ts` fájlra oldódik fel (hallucinációellenőrzés)                                                                                                       | Igen                                             |
| `i18n translation drift`       | A `docs/i18n/**` tükörfájljai és a `.i18n-state.json` közötti eltérés — PR-ek esetén tájékoztató jellegű (a tükröket a fordítási hullám frissíti), push és éjszakai futtatás esetén szigorú                        | **PR-ek esetén tájékoztató jellegű**             |

#### A fordítási tükrök származtatott fájlok (PR mód és release mód)

Egy funkciós PR csak az angol forrásokat módosítja. A `docs/i18n/<locale>/**` tükörfájljait (köztük a 66
`llm.txt` másolatot és a lefordított `CHANGELOG.md` fájlokat), valamint a `.i18n-state.json` fájlt
egy lépésben írja újra a fordítási hullám (`docs/i18n-*` / `chore/i18n-*` ágak, az ütemezett
`i18n-mirror-refresh.yml`), illetve a kiadás (`npm run release:sync-changelog-i18n`). Ezért a tükörkapuk
két módban futnak, amelyeket a `scripts/check/lib/gateMode.mjs` old fel (`--mode=pr|release`,
majd az `OMNIROUTE_GATE_MODE`, végül az Actions-esemény alapján; helyi futtatás esetén `release`):

- `check:docs-sync` — release módban minden ellenőrzést futtat. PR módban megtartja a package.json/OpenAPI-verziót,
  a gyökérszintű CHANGELOG-fejléceket és a felülírt dokumentumok védelmét, valamint kiírja a
  `SKIP reason=pr-mode` üzenetet az `llm.txt` tükörmásolataihoz és a lefordított CHANGELOG-szakaszokhoz —
  kivéve, ha a PR tükröket ír: a `config/quality/derived-paths/*.json` fájlokban a
  `docs/i18n/**` család írójaként deklarált head branch mindkét ellenőrzést szigorúan futtatja, és amikor
  a diff alapja feloldható, egy olyan változtatás, amelynek saját diffje a
  `docs/i18n/<locale>/llm.txt` vagy a `CHANGELOG.md` fájlt szerkeszti, szigorúan futtatja az adott ellenőrzést. A diff alapja
  depth-1 checkoutban nem oldható fel (a `docs-sync-strict`
  jobban), ezért a PR mód egy olyan ellenőrzést is futtat, amelyhez nincs szükség alapra: minden
  `llm.txt` tükörnek léteznie kell, meg kell őriznie a `---` elválasztót, és vagy a gyökérszintű törzsszöveget,
  vagy a legtöbb tükör által megosztott törzsszöveget kell tartalmaznia. Egy elmozdult alap minden tükröt egyformán
  elavulttá tesz, és ez átmegy; egyetlen tükör kézi szerkesztése meghiúsul. A lefordított
  `CHANGELOG.md` fájlokhoz nincs ilyen ellenőrzés depth-1 PR checkoutban.
- A pre-commit hook a `check-docs-sync.mjs --mode=pr` parancsot futtatja: egy commitot az alapján
  ítél meg, amit ténylegesen módosít. A kapcsoló nélkül a helyi futtatás release módú, és egyetlen,
  a gyökérszintű `llm.txt` fájlt szerkesztő összevont PR minden későbbi, azon az alapon lévő commitot
  blokkolna a hullám lefutásáig. Ugyanez a szabály vonatkozik minden olyan módérzékeny kapura, amelyet
  egy Husky hook futtat: a hook átadja a `--mode=pr` kapcsolót, a szigorú értékelés pedig a release módú
  futtatásoké marad (a release PR-é, a `main` ágra történő pushoké és az egyszerű helyi futtatásé).
- Tükörtartalom-egységtesztek (`tests/_helpers/mirrorFreshness.ts`: `cycle-docs-mirror-contract`,
  `resilience-pre-dispatch-docs-mirrors`, `cli-env-quality-docs-mirrors`,
  `docs/*-locales`) — release módban minden locale-t ellenőriznek. PR módban csak azokat a tükröket
  ellenőrzik, amelyek az `.i18n-state.json` szerint naprakészek az angol forráshoz képest
  (a teljes fájl hash-e vagy a teszt által rögzített szakasz rögzített szakasz-hash-e),
  az elavultakat pedig indoklással kihagyják. A `target_hash` eredetellenőrzések mindkét módban
  minden locale-ra lefutnak. A frissesség `## ` szakaszonként értendő, a `run-translation.mjs`
  egység hash-el; egy hosszú szakasz (ennek a fájlnak a kapuinventára körülbelül a felét teszi ki)
  azt jelenti, hogy bármilyen szerkesztés elavulttá teszi az adott tükröket, és PR módban az ellenőrzéseik
  a következő hullámig kimaradnak. Ha az angol forrás már nem tartalmaz egy horgonyt, az ellenőrzés
  visszaesik a teljes fájl összehasonlítására.
- `i18n translation drift` — PR-okon tájékoztató jellegű, push, nightly és release cut esetén szigorú,
  így egy elavult tükör nem kerülhet ki release-ben.

A `scripts/i18n/sync-llm-mirrors.mjs` (amely `syncLlmMirrors()` néven is exportálva van, `--dry-run`
kapcsolóval) újraírja az `llm.txt` tükröket; a release-frissítés, a fordítási hullám és az ütemezett
`i18n-mirror-refresh.yml` futtatja (a frissítés dry runnal észleli az elavult `llm.txt` tükröket, mivel
a driftjelentés nem sorolja fel őket, majd szinkronizálja őket a `check:docs-all` előtt).

A `docs/diagrams/` alatti tizenkét README SVG generált fájl
(`scripts/docs/gen-readme-<name>.mjs`; a `npm run docs:readme-diagrams` mindegyiket újragenerálja).
Mindegyikhez tartozik egy bájtszintű összehasonlító egységteszt
(`tests/unit/docs/readme-*-svg.test.ts`, `test-unit` job), amely release módban meghiúsul, ha a
commitolt fájl elavult; PR-ban a `check:generated-artifacts` azt az SVG-t értékeli, amelyet a PR
szerkeszt, az alap driftjét pedig a release-frissítésre hagyja (lásd: [Generált fájlok és release-kor írt származtatott alapértékek](#generated-files-and-derived-baselines-written-at-release)) — a
`check:docs-counts` pedig a kanonikus számokat azok `<text>` csomópontjaiból olvassa — ezért a
körvonalazási lépés minden körvonalazott szöveget láthatatlan `<text>` elemként tart meg a fájlban. Az SVG
kanonikus számokat ellenőrző vizsgálata az `SVG_DIAGRAM_FILES` értékben felsorolt fájlokat olvassa
(`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`,
`free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`,
`tier-cascade.svg`, továbbá a `public/images/tier-flow-dark.svg` és a `tier-flow-light.svg` fájlokat;
a free-forever, catalog-entry, recurring-pool és scoring-factors állítások szintén a
`promise-pillars.svg`, `free-tier-budget.svg` és `strategies-grid.svg` fájlokat olvassák. Az értékeket,
amelyeket ezek a generátorok megjelenítenek (providerszám, MCP-eszközök, útválasztási stratégiák,
free-forever szolgáltatók stb.), a `scripts/docs/readmeFacts.mjs` segítségével a
`docs/reference/derived-facts.json` tény-pillanatképből szerzik, nem literálokból, így egy diagram
bármely ágon történő újragenerálása reprodukálja a commitolt fájlt. A `free-tier-budget.svg` a sorait
ugyanebből a pillanatképből (`code.freeTierBudget`, a tényt rögzítő facts probe katalógus-összesítése)
rajzolja ki, ezért a `FREE_MODEL_BUDGETS` módosítása a következő frissítéskor eljut a kártyához,
ahelyett hogy pirosra váltaná a CI-t.

### Származtatott értékek: a `pr` és `release` kapumódok

Egy feature PR soha nem ír olyan értéket, amely az alap állapotától függ: a szolgáltatók, migrációk,
MCP-eszközök és stratégiák számait, a README SVG-k számait, valamint a tény-pillanatképet. Egy lépés
újraszámítja mindegyiket, ezt a release és az éjszakai származtatott-frissítési PR által futtatott
`npm run release:refresh-derived` végzi. Ezért **release-ek között az alap szándékosan le van maradva az
élő kódhoz képest**, és egy olyan kapu vagy teszt, amely a fát az élő kóddal hasonlítaná össze, minden
olyan PR után piros lenne, amelyben egy testvér egy szolgáltatót adott hozzá. A származtatott értékeket
értékelő kapuk így két mód egyikében futnak, amelyet a `scripts/check/lib/gateMode.mjs` old fel
(az első egyezés érvényes):

1. `--mode=pr|release` a parancssorban;
2. az `OMNIROUTE_GATE_MODE` környezeti változó (`pr` vagy `release`);
3. automatikusan, a GitHub Actions eseménye alapján: egy olyan `pull_request`, amelynek headje nem
   `release/v*`, egy `merge_group`, vagy egy `omni-queue/**` ágra történő push → `pr`; minden más
   (push, schedule, dispatch, a `release/v* → main` release PR és bármely helyi futtatás) → `release`.

Amit a `check:docs-counts` (`scripts/check/check-docs-counts-sync.mjs`) módonként meghiúsít:

| Üzemmód   | Hibát jelez                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Élő tényekre van szükség |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `release` | Minden ellenőrzés szigorú egyenlőséget alkalmaz a fából összegyűjtött tényekkel (a kapu mindig is ilyen viselkedése): egy elavult darabszám, verzió, lefedettségi küszöbérték vagy SVG-szám STRICT eltérésnek számít                                                                                                                                                                                                                                                                                                                                                      | Igen                     |
| `pr`      | Csak azt vizsgálja, amit a módosítás végzett, a PR alapjához hasonlítva, ugyanazokkal az állításkinyerőkkel: (1) egy kezelt érték, amely az adott ellenőrzéshez és fájlhoz nem létezett az alapban, és amelyet a PR szerkesztett („A PR módosított egy kezelt számot — állítsd vissza a sort az alap szövegére”); (2) egy kötelező állítás, amelyet az alap tartalmazott, de a head elveszített. A tényeket nem igénylő tartalmi invariánsok a release módban megszokott módon futnak; a csak release-re vonatkozó ellenőrzések fel vannak sorolva és kihagyásra kerülnek | Nem                      |

Az ügynökutasítás-fájlok egyáltalán nem tartalmaznak levezetett darabszámot: az `AGENTS.md`, az
`llm.txt` (és annak `docs/i18n/*/llm.txt` másolatai), a bs `AGENTS.md`-ág, az
`open-sse/services/AGENTS.md`, a `src/shared/constants/agentSkills.ts`, a
`skills/README.md` és minden `skills/*/SKILL.md` a forrásra (például a
`src/shared/constants/routingStrategies.ts` fájlban található `ROUTING_STRATEGY_VALUES` értékre)
és inkább az `npm run facts` parancsra hivatkozik. A „Nincsenek levezetett darabszámok (ügynökutasítás-fájl …)” invariáns mindkét módban hibát jelez, ha ott darabszám található (szolgáltatók, migrációk, MCP-eszközök és hatókörök, útválasztási stratégiák, pontozási tényezők, módcsomagok), így a release-frissítésnek soha nem kell átírnia egy utasításfájlt.

`pr` módban az írói ágak módosíthatják a kezelt értékeket: `chore/derived-*` (az éjszakai
frissítési PR), `release/v*`, valamint a fordítási hullámok: `docs/i18n-*` és `chore/i18n-*`
(`scripts/check/lib/derivedClaimsDiff.mjs`). A várólistakötegek (`merge_group`, Mergify-vázlatok,
`omni-queue/**`) nem kerülnek újra elbírálásra: olyan PR-okat összesítenek, amelyeket a kapu már
egyenként elbírált.

Kilépési kódok: `0` tiszta · `1` STRICT eltérés (vagy `--strict` kapcsolóval engedékeny eltérés),
illetve kezeltérték-sértés · `2` infrastruktúra — a kódból nem sikerült begyűjteni a tényeket (a
tsx-próba sikertelen volt vagy időtúllépés történt; az időkorlátot az
`OMNIROUTE_FACTS_TIMEOUT_MS` adja meg, alapértelmezés szerint 600000 ms), illetve CI-ben nem sikerült
feloldani a PR diff-alapját. A 2-es kilépési kód soha nem dokumentációs eltérés: futtasd újra a
feladatot, vagy javítsd a környezetet.

Hol fut az egyes módokban:

| Hol                                                                                                             | Üzemmód                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Funkció-PR — `ci.yml` `docs-sync-strict` feladata, `quality.yml` „Docs accuracy” lépése                         | `pr` (automatikus); a feladat az alapot `BASE_SHA` értékként adja át, és `fetch-depth: 2` beállítással tölti ki                                                                                                                                 |
| `merge_group`, `omni-queue/**` jelöltek, az összevonási vonatkozás teljes kapulistája                           | `pr`                                                                                                                                                                                                                                            |
| Release-PR (`release/v* → main`), pushok, ütemezett és kézi futtatások                                          | `release`                                                                                                                                                                                                                                       |
| Release-Green (`scripts/quality/validate-release-green.mjs`)                                                    | A HARD elemek `OMNIROUTE_GATE_MODE=pr` beállítással futnak („az alap okozta a hibát?”); a DRIFT elem, a `derived-refresh`, az `npm run release:refresh-derived -- --check` parancsot futtatja (szigorú nézet, soha nem nyit base-red állapotot) |
| Release (`/generate-release` 0a és 1. fázisa; a skill bekötése külön, jóváhagyott tulajdonosi módosítás)        | Az `npm run release:refresh-derived` kiírja a levezetett fájlokat; a release-PR saját ellenőrzései ezután `release` módban futnak                                                                                                               |
| `nightly-derived-refresh.yml` (naponta, a legmagasabb `release/vX.Y.Z` értékkel, release-freeze alatt kihagyva) | `npm run release:refresh-derived -- --profile=nightly`; eltérés esetén EGY nyitott PR-t tart fenn a `chore/derived-refresh` ágból; soha nem vonja össze                                                                                         |

A mögötte álló parancsok:

- Az `npm run facts` minden származtatott számot JSON-ként ír ki (`scripts/release/facts.mjs`).
  A `--key=code.mcpTools` egy értéket ír ki, a `--snapshot` pedig az éles fa helyett a
  committolt pillanatképet olvassa. Ha a tények nem gyűjthetők össze, a kilépési kód 2.
- Az `npm run release:refresh-derived` (`scripts/release/refresh-derived.mjs`) egyetlen menetben,
  az alábbi sorrendben számítja újra a származtatott fájlokat (a `--only=` lépésazonosítói):
  `provider-reference`
  (`docs/reference/PROVIDER_REFERENCE.md`), `facts` (a pillanatkép), `numbers` (a számlálási
  kapu újraírási tervét alkalmazza a dokumentációra, majd továbbviszi azt a
  `docs/i18n/` tükrökbe), `readme-diagrams`, `skills` (generált `SKILL.md`), `e2e-timings`
  (kihagyva mindaddig, amíg a fa nem tartalmazza a `syncE2eTimings` elemet), `ui-keys` (eltávolítja az
  `en.json` által elhagyott kulcsokat, és a `--rewritten-since=<ref>` paraméterrel — amelynek
  alapértelmezése `origin/main` — újra sorba állítja az utolsó kiadás óta átírt angol értékeket),
  `llm-mirrors` és `verify-generated` (írás után release módban a
  `check:generated-artifacts` és a `check:agent-skills-sync` ellenőrzéseknek sikeresnek kell
  lenniük; `--check` módban, illetve akkor, ha a `--only` kihagyja ezt a lépést, kimaradnak; a
  hiba kilépési kódja 2). A `changelog` lépés külön engedélyezendő (`--with-changelog`), és csak a
  release-profilban használható. A `--profile=nightly` soha nem módosít verzióra vonatkozó
  állítást. A `-- --check` nem ír semmit, és 1-es kóddal lép ki, ha bármely fájl módosulna, vagy
  egy kezelt érték kézi szerkesztést igényel (mindkettőt felsorolja); infrastruktúrahiba esetén
  a kilépési kód 2. A `--json` JSON-ként írja ki az eredményt.
- A `docs/reference/derived-facts.json` az utolsó frissítés által használt tények pillanatképe.
  Csak a frissítés írja. A README SVG-generátorai ezt olvassák, a PR-időben futó
  egységtesztek pedig a committolt dokumentációt és a generált fájlokat ehhez hasonlítják —
  soha nem az éles kódhoz. A tesztcsomag egyetlen éles összehasonlítása a
  `tests/unit/check-docs-counts-sync.test.ts` fájlban található „a kiadási frissítés lezárja a
  ciklust”: az éles tényekkel a frissítés memóriában alkalmazott újraírási terve nem hagy
  jelentetlen STRICT eltérést, és az újratervezés semmit sem módosít.

Helyi reprodukáláshoz (a helyi futtatás alapértelmezés szerint `release`):

```bash
npm run check:docs-counts                                       # release: szigorú, éles tények
node scripts/check/check-docs-counts-sync.mjs --mode=pr          # amit egy funkciós PR-en számon kérnek
OMNIROUTE_GATE_MODE=pr BASE_REF="origin/release/v$(node -p "require('./package.json').version")" npm run check:docs-counts
npm run release:refresh-derived -- --check                       # amit a kiadás átírna
```

Feloldható alap nélkül (nincs `BASE_SHA`/`BASE_REF`, és nincs helyi
`origin/release/v<version>`) a helyi `pr` futtatás figyelmeztetést ír ki, és hiba helyett kihagyja
a diffet.

### Feladat: `i18n-ui-coverage`

| Szkript                               | Ellenőrzött feltétel                                                                                                                                                                                                       | Blokkoló                   |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check-ui-keys-coverage` (beágyazott) | A UI i18n-kulcsok lefedettsége legalább 65%                                                                                                                                                                                | Igen (mindkét módban)      |
| `check:ui-icu`                        | Minden UI-katalógus minden üzenete lefordítható az `IntlMessageFormat` segítségével                                                                                                                                        | Igen (mindkét módban)      |
| `check-ui-value-drift` (beágyazott)   | Egy átírt angol **érték** nem hagyhat maga után elavult fordítást                                                                                                                                                          | Igen (csak release módban) |
| `check-new-key-coverage` (beágyazott) | Egy **új** angol kulcs minden területi beállításban le van fordítva — a `__MISSING__:` jelölőt el kell utasítani                                                                                                           | Igen (csak release módban) |
| `check-key-completeness` (beágyazott) | Minden UI-katalógus (és `--catalog=cli` esetén minden CLI-katalógus) pontosan az `en.json` kulcskészletét tartalmazza; `pr` módban minden katalógus önmagához képest, a merge base-en                                      | Igen (mindkét módban)      |
| `check-translation-ratio`             | Területi beállításonként a valódi fordítási arány (az engedélyezési listán kívüli, angollal azonos / helyőrzős / hiányzó elemek) nem haladhatja meg a `config/quality/i18n-translation-baseline.json` + tűréshatár értékét | Igen (csak release módban) |

`fetch-depth: 0` szükséges — az értékeltérés-kapu az `en.json` fájlt a merge base-hez képest
vizsgálja.

**Két mód (2026-11-13 óta).** Egy funkciós PR kulcsokat ad hozzá vagy ír át az `en.json` fájlban
(és a `bin/cli/locales/en.json` fájlban), és egyetlen másik területi beállítást sem érint;
a `check:pr-derived-paths` (`pr-test-policy` feladat, a
`config/quality/derived-paths/translation.json` család) meghiúsítja az ezt tevő funkciós PR-t.
A többi területi beállítás kiadásonként egyszer készül el a `release:refresh-derived` során,
amely meghívja a `syncUiKeys()` függvényt a `scripts/i18n/sync-ui-keys.mjs` fájlban
(hiányzó kulcsok hozzáadása, elhagyott kulcsok eltávolítása, az átírt angol szövegek fordításainak
megjelölése a `rewrittenSinceRef` segítségével, fordítás), vagy egy fordítási hullám során.
A kapuk a módot a `scripts/check/lib/gateMode.mjs` fájlból olvassák: `pr` módban (funkciós PR-ek,
`merge_group`, `omni-queue/**`) a fenti release-módú kapuk `SKIP reason=pr-mode` üzenetet írnak ki,
és 0-s kóddal lépnek ki; `release` módban (a kiadási PR, a `main` ágra küldött pushok,
`workflow_dispatch`, helyi futtatások) ugyanúgy szigorúak, mint korábban, a kiadási PR-en pedig
a différzékeny kapuk `BASE_REF=origin/main` értéket kapnak, így minden, a ciklus által hozzáadott
vagy átírt kulcsot ellenőriznek. A funkciós PR helyi eredménye a `--mode=pr` paraméterrel
tekinthető meg.

Egy olyan PR, amely `pr` módban továbbra is módosít locale-katalógusokat (fordítási hullám, kiadási frissítés vagy csak fordítást érintő javítás), nincs kihagyva: a `check-key-completeness` minden módosított katalógust összevet ugyanannak a katalógusnak az összeolvasztási alapnál lévő állapotával (`scripts/i18n/lib/touched-catalogs.mjs`), és hibát jelez, ha a katalógusból elveszett egy kulcs, az `en.json` nem tartalmaz egy kulcsot, egy valódi fordítás `__MISSING__:` jelölővé vagy az angol szöveggé vált, illetve ha egy érték már nem interpolálja egy olyan angol karakterlánc helyőrzőit/címkéit, amelyet a PR nem érintett. A PR-ben újonnan létrehozott katalógusnak az `en.json` teljes kulcskészletét tartalmaznia kell. Ez lefedi a PR által érintett katalógusok esetében azt, amit az arány- és CLI-paritási ellenőrzések látnának.

A locale-paritást ellenőrző egységtesztek (`cli-i18n-catalog`, `i18n-pt-br`, `i18n-vi-completeness`, `i18n-placeholder-parity`) ugyanazokat a módokat követik a `tests/_helpers/localeParityMode.ts` fájlon keresztül: `pr` módban kihagyják a kulcsparitási állításokat, és a kiadási frissítésre hagyják az olyan kulcsok helyőrző-paritásának ellenőrzését, amelyek angol változata az összeolvasztási alaphoz képest módosult (minden kulcs esetében, amikor az egységtesztelési feladat sekély klónja nem tudja beolvasni azt). Ez a segéd az **egyetlen** engedélyezett módfüggő kihagyás: a `check:test-masking` számolja a `.skip(` és a `{ skip: true }` előfordulásait, de az általa visszaadott számított `{ skip: "<reason>" }` értéket nem, ezért a `tests/unit/locale-parity-mode.test.ts` rögzíti azon tesztek listáját, amelyek használhatják; egy új elem hozzáadása a listához felülvizsgált módosításnak számít.

#### `check-ui-value-drift` — az elavult fordítások ellenőrzése

Az egyetlen olyan i18n-regressziót észleli, amelyet a többi ellenőrzés szerkezetileg nem tud felderíteni: egy angol értéket átírnak, az előző angol szövegből származó fordítások pedig változatlanul maradnak, így a nem angol nyelvű felhasználók továbbra is magabiztos hangvételű, de már hibás szöveget olvasnak.

Ez ténylegesen előfordult. Az `oauthModal.googleOAuthWarning` értékét átírták, amikor az Antigravity bejelentkezési segédje bekerült (#5203); **43 locale közül 39** továbbra is azt írta az üzemeltetőknek, hogy „másolják ki a teljes URL-t, és illesszék be alább” — ez az adott szolgáltatónál befejezhetetlen folyamat volt. Ez egészen a #8463-ig észrevétlen maradt, mert:

- a `sync-ui-keys` csak a **hiányzó**, és soha nem az **elavult** kulcsokat tölti vissza;
- a `check-ui-keys-coverage` a kulcsok _jelenlétét_ számolja, így egy elavult fordítás lefedettnek számít;
- a `check-translation-drift` a `docs/i18n/<locale>/**.md` dokumentációs tükröket követi — a `src/i18n/messages/*.json` fájlokat soha nem olvassa. A `docs-sync-strict` feladatban fut: PR-ekben tájékoztató jellegű, push és nightly futtatáskor szigorú; a fordítási hullám frissíti a tükröket, nem pedig a funkciót bevezető PR.

**Diff-alapú, nem baseline-re épülő.** Az `en.json` fájlt az összeolvasztási alapnál és a munkafában hasonlítja össze; minden olyan kulcs esetében, amelynek angol értéke módosult, az a locale elavult, amely továbbra is egy érintetlen fordítást tartalmaz. Ez szándékosan **befagyasztja a korábban fennálló tartozást** — egy diffből nem állapítható meg, hogy egy régóta meglévő fordítás melyik korábbi angol szövegből származik, ezért az ellenőrzés csak azt bírálja el, amit az aktuális módosítás érint. Az alternatíva (kulcsonkénti hash-alapú baseline) egy körülbelül 600 KB-os generált fájlt igényelne, amely háromszor nagyobb a jelenlegi legnagyobb baseline-nál, és minden i18n PR során változna.

Kétféleképpen lehet megfelelni neki:

1. frissítsd az érintett fordításokat, vagy
2. állítsd őket `__MISSING__:<new english>` értékre — a futtatókörnyezet ekkor a javított angol szöveget szolgálja ki (`src/i18n/request.ts::deepMergeFallback`, #7258), a kulcs pedig fordításra váróként kerül a sorba.

Ha a karakterlánc **jelentése** megváltozott, előnyösebb átnevezni a kulcsot: egy új kulcs nem örökölhet elavult fordítást. Ezt a mintát használta a #8463.

```bash
npm run i18n:check-value-drift          # szigorú (ezt futtatja a CI)
npm run i18n:check-value-drift:warn     # csak jelentés
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

A parancs 0-val lép ki `SKIP reason=base-unresolved` értékkel, amikor az alapkatalógus nem olvasható (sekély klón az alap-referencia nélkül), a `check-openapi-breaking` működését követve. Csak kiadási módban: egy funkciót bevezető PR átírja az angol szöveget, és itt megáll; a kiadási frissítés megjelöli a hátrahagyott fordításokat (`node scripts/i18n/sync-ui-keys.mjs --rewritten-since=<ref>`, ugyanazt a `findStaleTranslations` függvényt használva).

### Feladat: `i18n`

Teljes i18n-ellenőrzési mátrix (locale-onként egy feladat). A teljes feladat tájékoztató jellegű.

| Script                          | Ellenőrzés                        | Blokkoló                                                       |
| ------------------------------- | --------------------------------- | -------------------------------------------------------------- |
| `validate_translation.py quick` | Fordítás teljessége locale-onként | **Tájékoztató** (`continue-on-error: true` a teljes feladatra) |

### Feladat: `pr-test-policy`

Csak pull requestek esetén fut.

| Script                 | Ellenőrzés                                                                                                                                                                     | Blokkoló |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `check:pr-test-policy` | Azoknak a PR-eknek, amelyek éles kódot módosítanak a `src/`, `open-sse/`, `electron/` vagy `bin/` könyvtárakban, teszteket kell tartalmazniuk vagy frissíteniük (Hard Rule #8) | Igen     |
| `check:test-masking`   | A módosított tesztfájlok nem csökkentik az állítások nettó számát, és nem adnak hozzá `assert.ok(true)` tautológiákat                                                          | Igen     |
| `check:pr-evidence`    | A PR törzse tesztelési/VPS-bizonyítékot hivatkozik a módosításhoz (a Hard Rule #18 megvalósítása a PR szövegének keresésével — törékeny, lásd a hátralékot)                    | Igen     |

### Feladat: `test-vitest`

A `build` után fut. Sikertelenség esetén blokkolja az összeolvasztást.

| Suite            | Ellenőrzések                                                         | Blokkoló                                                                                                                                      |
| ---------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-kiszolgáló (110 eszköz), autoCombo, gyorsítótár — vitest-futtató | Igen                                                                                                                                          |
| `test:vitest:ui` | UI-komponens tesztjei — vitest-futtató                               | **Blokkoló** — a korábban is fennálló hibák explicit módon ki vannak zárva a `vitest.config.ts` fájlban; az új hibák meghiúsítják a feladatot |

### Éjszakai munkafolyamatok (ütemezett, tájékoztató jellegű)

Ezek cron-ütemezés szerint (és `workflow_dispatch` használatával) futnak, PR-eken soha. Mindegyik tájékoztató jellegű.

| Munkafolyamat          | Ellenőrzések                                                                                                                                                                                  | Blokkoló        |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | fast-check tulajdonságalapú tesztek véletlenszerű seed értékkel + magas futtatásszámmal                                                                                                       | **Tájékoztató** |
| `nightly-resilience`   | heap-növekedési korlát, kaotikus hibainjektálás, k6 terhelési/tartóssági teszt                                                                                                                | **Tájékoztató** |
| `nightly-llm-security` | promptfoo injekcióvédelmi ellenőrzés (blokkoló mód) + garak próbák (provider titka nélkül kihagyva)                                                                                           | **Tájékoztató** |
| `nightly-schemathesis` | OpenAPI-szerződés fuzz tesztelése (schemathesis) egy élő OmniRoute-tal a `docs/openapi.yaml` használatával — a specifikáció megsértéseit / kezeletlen 500-as hibákat tárja fel (8. fázis B.4) | **Tájékoztató** |
| `nightly-mutation`     | Stryker mutációs tesztelési pontszám a gyors egységteszt-sávon — a túlélő mutánsok gyenge ellenőrzéseket jeleznek                                                                             | **Tájékoztató** |
| `nightly-compat`       | Node motor-kompatibilitási mátrix a támogatott `engines.node` tartományokon                                                                                                                   | **Tájékoztató** |

A teljesítmény-alapértékek (heap, TTFB, buildelési idő) rögzítve vannak, de nem képeznek korlátot: lásd: [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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

Terv 2026-11-13 („a származtatott számok és szövegek csak kiadáskor kerülnek feloldásra”): egy funkciós PR módosítja a
**forrást** — `src/shared/constants/providers.ts`, `docs/openapi.yaml`, a skillkatalógust, az
ingyenes szint katalógusát és egy új e2e-specifikációt. Nem generálja újra az ebből a forrásból
számított fájlokat, és nem könyvel el egy mért javulást egy alapvonalba. Ezeket egyszer írja át a
kiadási frissítés (`release:refresh-derived`) vagy egy éjszakai frissítési PR. Ezt megelőzően minden
testvér-PR magával vitte a saját újragenerált példányát, ami összeütközött a következő összevonással
(2026-11-13: a 321 nyitott PR-ból 30 átírta a `PROVIDER_REFERENCE.md` fájlt, 26–28 pedig a README-diagramokat).

**A védelem.** A `check:pr-derived-paths` (`pr-test-policy` feladat) meghiúsítja azt a funkciós PR-t, amely a
`config/quality/derived-paths/` valamelyik családjába tartozó fájlt érint:

| Család      | Fájlok                                                                                                                                                                                    | Átírja                                                                                                                    |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `generated` | `docs/reference/derived-facts.json`; `docs/reference/PROVIDER_REFERENCE.md`; a tizenkét generált README SVG; `skills/*/references/**`; az egyéni blokkot nem tartalmazó `SKILL.md` fájlok | `release:refresh-derived` (tények), `gen:provider-reference`, `docs:readme-diagrams`, `generate-agent-skills.mjs --apply` |
| `baselines` | `config/quality/e2e-timings.json`                                                                                                                                                         | `balance-e2e-shards.mjs --sync` (`syncE2eTimings()`)                                                                      |

Az írók (`release/v*`, `chore/derived-*` és az alapvonalak esetében `chore/bank-ratchet-*`) mentesülnek; ugyanígy
az a PR is, amely csak egy családot és annak kísérőit módosítja (`generated` esetén: a generátorszkripteket,
azok tesztjeit, az agent-skill bemeneteket — `src/shared/constants/agentSkills.ts`, a kézzel írt `skills/**`
dokumentumokat, `docs/openapi.yaml` fájlt — és a `changelog.d/**` fájlokat), például egy hőskép-elrendezés
módosítását a hozzá újragenerált SVG-vel együtt, vagy egy olyan skilljavítást, amelynek tesztje az újragenerált
`SKILL.md` fájlokat olvassa. Az olyan `SKILL.md`, amely kézzel írt `<!-- skill:custom-start -->` blokkot
tartalmaz, nem tartozik a családba: az egyéni blokk egy funkció mellett továbbra is szerkeszthető.

**Az ellenőrzések kapumódonként** (`scripts/check/lib/gateMode.mjs`; segéd:
`scripts/check/lib/derivedArtifactScope.mjs`):

| Ellenőrzés                                                                            | `release` (push, ütemezés, kiadási PR, helyi futtatás)                                                    | `pr` (funkciós PR, várólistás köteg)                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:agent-skills-sync`                                                             | minden skillnek meg kell egyeznie a generátor kimenetével                                                 | csak azok a skillek, amelyek generált szövegét (az egyéni blokkon kívül) vagy `references/` könyvtárát a PR módosítja; egyébként `SKIP reason=pr-mode`                                                                                              |
| `check:generated-artifacts` (README SVG-k + e2e-időzítések; teljes előzményt igényel) | minden SVG-nek meg kell egyeznie a generátorával; minden specnek kell rendelkeznie időzítési bejegyzéssel | csak a PR által módosított artefaktumok; a többi `SKIP reason=pr-mode`; diff-alap nélkül → minden artefaktum elbírálásra kerül (zárt hibamód)                                                                                                       |
| README SVG bájt-összehasonlító tesztek (`tests/unit/docs/readme-*-svg.test.ts`)       | minden SVG                                                                                                | csak a PR által módosított SVG, amikor az alap feloldható; a `test-unit` sekély PR-checkoutja nem tartalmaz alapot, ezért ott a teszt `SKIP reason=base-unresolved` értékkel kihagyja, és az összehasonlításért a `check:generated-artifacts` felel |
| e2e-időzítések teljessége (`tests/unit/balance-e2e-shards.test.ts`)                   | minden specnek van bejegyzése                                                                             | ugyanaz a szabály, mint az SVG-teszteknél (egy új spec a medián súllyal fut)                                                                                                                                                                        |
| `check-quality-ratchet.mjs --require-tighten`                                         | a nem bankolt javulás hibát okoz (kivéve `_policy`)                                                       | a javulást jelenti, de soha nem okoz hibát; a visszaesés továbbra is hibát okoz                                                                                                                                                                     |

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
