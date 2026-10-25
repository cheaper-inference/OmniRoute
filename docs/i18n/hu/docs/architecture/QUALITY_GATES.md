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

## Gate-leltár és végrehajtási profilok

### Jelöltfelvétel

A CI és a Quality Gates munkafolyamatok egyaránt stabil verdictet adnak ki: `Gate / CI` és
`Gate / Quality`. Verziózott felvételi szabályzatuk minden upstream jobot kötelezőként vagy
tanácsadóként sorol fel. Egy alkalmazható kötelező jobnak sikeresnek kell lennie: hiányzó,
megszakított, kihagyott, függőben lévő és ismeretlen eredmény nem alapozhat meg PASS-t. Egy
érvényes docs-only vagy catalog-only besorolás alkalmazhatatlanná tehet egy kódsávot; a
piszkozat PR nem elfogadott jelölt. A `hotfix` címke nem mentesít a bizonyíték alól.

Mindkét munkafolyamat lefedi a main/release ágakba irányuló PR-eket, a `main` ágra történő
pushokat, a manuális dispatchet és a merge-group eseményeket. Push, dispatch és merge-group
esetén a teljes kiválasztás lefut. A `release/**` ágakra irányuló pushok nem indítják el őket
(2026-10-18): minden változás már lefuttatta a mátrixot a saját PR-jén, és az összevont
kombináció ellenőrzése a Release-Green feladata (`docs/ops/RUNNER_BOX.md` → Hosztolt sáv). A
forkok és a merge groupok hosztolt runnereket használnak azokhoz a jobokhoz, amelyek egyébként
self-hosted runnereket választanának; a bevezetés előtt ellenőrizni kell a megfelelő hosztolt
kapacitást.

Minden JSON-nyugta azonosítja a kicsekkolt SHA-t, a munkafolyamatfuttatást és a próbálkozást.
A CLI elutasítja a checkout/esemény SHA-eltérését. A munkafolyamat-tesztek a szabályzattagságot
a verdict-job `needs` listájához kötik, így egy új vagy eltávolított sáv nem tűnhet el
észrevétlenül. A nyugták a saját munkafolyamatukat fedik le, nem a publikálást, a telepítést
vagy egy meglévő tanácsadó szkenner belső működését. Mindkét ellenőrzésnév aktiválása az
ágszabályokban külön adminisztratív módosítás; ezen jobok hozzáadása önmagában nem védi az ágat.

### Statikus szkennelési leltár

A verziózott npm-alias-leltár és a statikus szkennelés tagsága a
`config/quality/gate-manifest.json` fájlban található. Futtasd az `npm run check:gate-manifest`
parancsot a szkriptnevek és a pontos parancsok `package.json` fájllal való összevetéséhez; a
hozzáadások, eltávolítások és a parancsdrift megbuktatja mind a helyi hookot, mind a CI
változásbesorolási jobjait. Egy alias nem munkafolyamat-job, mátrixpéldány vagy teszteset:
ezek a számok nem mutathatók be felcserélhetőként.

Használd az `npm run quality:scan -- --list` vagy az `npm run quality:scan:fast -- --list`
parancsot a kiválasztott aliasok végrehajtás nélküli megtekintéséhez. A futtató az npm
belépési pontot hívja, így annak futtatókörnyezete (beleértve a Bunt is, ahol konfigurálva
van) megmarad. A manifest az e profilokon kívüli aliasokat külön meghívottként rögzíti, a
karbantartási parancsok pedig tiltottak az írásvédett szkennelési profilokban.

Ezek a profilok kizárólag a statikus szkennelést fedik le. Nem tanúsítják a termékteszteket,
a lefedettséget, a csomagolást, a külső ellenőrzéseket vagy egy jelölt teljes kiadási
elfogadását. A munkafolyamat-felvétel a hivatkozott `config/quality/admission-policy.json` és
`scripts/quality/admission-verdict.mjs` fájlokat használja. A Release-observer profilok
különállóak maradnak; az alkalmazható ellenőrzéseiket és nyugtáikat függetlenül vizsgáld meg.
Az alábbi prózai leltár referenciaként szolgál, nem bizonyítéka annak, hogy egy gate
ténylegesen lefutott.

A szkriptek a `scripts/check/` (szabályzati gate-ek) és a `scripts/quality/` (ratchet-motor)
könyvtárak alatt találhatók. A CI hiteles forrása a `.github/workflows/ci.yml`.

### Release PR gyorsútvonal (`quality.yml`)

A `.github/workflows/quality.yml` kiegészíti a CI-t a main/release PR-eken, a `main` ágra
irányuló pushokon, a dispatcheken és a merge groupokon. A PR-ek útvonalszűrt gyors
ellenőrzéseket használnak. A véglegesen letiltott duplikált build eltávolításra került; a
valódi build/csomagolás/boot-ellenőrzések a CI-ban maradnak.

| Job                                              | Scope                                                                                                                                                                                                                        | Blocking                      |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `Docs Gates (fast-path)`                         | Dokumentációs/kód PR-ek; API-dokumentációs hivatkozások és docs-all                                                                                                                                                          | Igen                          |
| `Fast Quality Gates`                             | Kód PR-ek; statikus ellenőrzések, típusellenőrzés, dashboard-típusellenőrzés, érintett egységtesztek                                                                                                                         | Igen                          |
| `Forgotten sibling tests`                        | Kód PR-ek; a módosított modulok visszakövetése statikus fogyasztókhoz és jelölt testvértesztekhez; a barrel- és dinamikus importútvonalak tanácsadó diagnosztikaként kerülnek jelentésre, hivatkozott allowlist-kivételekkel | **Tanácsadó**                 |
| `Vitest (fast-path)`                             | Kód PR-ek; gyors vitest-tesztkészlet                                                                                                                                                                                         | Igen                          |
| `Unit Tests fast-path`                           | Kód PR-ek; 4 shardra osztott egységtesztkészlet                                                                                                                                                                              | Igen                          |
| `No new ESLint warnings`                         | Kód PR-ek; elnyomásfigyelő lint-őr                                                                                                                                                                                           | Igen, beleértve a forkokat is |
| `Merge integrity (changelog + generated skills)` | Nem piszkozat PR-ek; changelog- és generált skill-szinkronizáció                                                                                                                                                             | Igen, beleértve a forkokat is |

#### Elfelejtett testvértesztek jelentése

Az `npm run check:forgotten-sibling-tests` újrahasznosítja a teszthatás-térkép mögött működő importfeloldót.
Minden módosított éles modulhoz determinisztikus
`changed module/symbol -> static consumer -> candidate sibling test` láncokat jelent, amikor a jelölt
teszt nem szerepel a pull request diffjében. A Markdown-összefoglaló és a JSON-eredmény a
`forgotten-sibling-tests` munkafolyamat artefaktjaként megőrződik kalibrálás céljából, mielőtt bármilyen
blokkoló bevezetésre sor kerülne.

A barrel újraexportok és a dinamikus importok kizárólag feloldási diagnosztikák; soha nem hoznak létre
blokkoló találatot. Az áttekintett kivételek a
`config/quality/forgotten-sibling-allowlist.json` fájlban találhatók. Minden bejegyzésnek meg kell neveznie a fogyasztót és a jelölt
tesztet, konkrét indoklást kell adnia, és hivatkoznia kell egy GitHub issue-ra vagy pull requestre. A hibás formátumú bejegyzések
zárt (fail closed) módon hiúsulnak meg. A kivételek nem nyomhatnak el egy törölt jelölt tesztet, illetve egy `.skip`/`.todo` hozzáadását tartalmazó
diffet; az állításgyengítés és az egyéb elfedések továbbra is a függetlenül blokkoló
`check:test-masking` kapu hatáskörébe tartoznak.

### Feladat: `lint`

Minden `main` felé irányuló PR-en lefut. Hiba esetén blokkolja az egyesítést.

| Script (`npm run ...`)            | Ellenőrzött feltétel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokkoló                                  |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | A Node.js verziója a támogatott tartományon belül van                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Igen                                      |
| `check:cycles`                    | Körkörös importok a teljes `src/` + `open-sse/` könyvtárban (AST-alapú, a tsconfig `paths` feloldva). A sima változat 1-es kilépési kóddal lép ki, amikor bármilyen kör létezik (a #15281 óta fail-closed módon, azaz hiba esetén elutasít), és listázza az SCC-ket. A `check:cycles:ratchet` (amit a CI futtat) blokkol, ha a szám meghaladja a `metrics.cycles` plafont a `quality-baseline.json` fájlban — jelenleg 14, `direction: down`, tehát az érték csak csökkenhet (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Igen (ratchet)                            |
| `check:boundary`                  | `open-sse → src` csatolás: egyedi, fájlról fájlra történő importok a motorból az alkalmazásba (`scripts/quality/measure-boundary.mjs`; az éllista a v4-es core/module-split javítási backlogja). A sima változat = tájékoztató jelentés (ugyanaz, mint a `quality:boundary`). A `check:boundary:ratchet` (amit a CI futtat, és amely a `quality.yml` fast-gates ratchet-ciklusában is szerepel) blokkol, ha a szám meghaladja a `metrics.boundaryOpenSseToSrc` plafont a `quality-baseline.json` fájlban — kiindulásként a mért 771 értékkel, `direction: down`; az `--update` csak csökkentheti; PR-ek esetén az alapbranch-hez képest relatív (`--base-ref`, lásd lent)                                                                                                                                                                                                                                                                                                                                              | Igen (ratchet)                            |
| `check:route-validation:t06`      | Zod-sémák jelen vannak minden útvonalon (Tier 6-os szabályzat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Igen                                      |
| `check:any-budget:t11`            | Az `@ts-expect-error // any` darabszám nem haladja meg a keretet (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Igen                                      |
| `check:provider-consistency`      | A `providers.ts` minden szolgáltatójához tartozik megfelelő bejegyzés a `providerRegistry.ts`-ben (és fordítva, az engedélyezési listán belül)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Igen                                      |
| `check:model-lifecycle`           | A három kézzel karbantartott útválasztási tábla konzisztens marad a verziókezelt életciklus-pillanatképpel (#11503): a `FITNESS_TABLE` (`taskFitness.ts`) nem ad pontszámot olyan kivont azonosítónak, amelyet a `REGISTRY` képes útválasztani; minden `BUILT_IN_ALIASES`-cél jelen van a `REGISTRY`-ben, és nem szerepel a kivont azonosítók pillanatképében; minden olyan kivont azonosító, amely még benne van a `REGISTRY`-ben, továbbítva van, vagy fel van sorolva az `allowedRetiredInCatalog`-ban; és a `DEFAULT_DEGRADATION_MAP` egyetlen forrása vagy célja sem jelenik meg kivontként ebben a pillanatképben. Ez nem bizonyítja, hogy egy modellt jelenleg élő upstream szolgál ki. Offline — a `config/quality/model-lifecycle.json` fájllal veti össze, amelyet kézzel frissítenek az `npm run quality:refresh-model-lifecycle` paranccsal (hálózatot igényel; nincs bekötve a CI-be). Az `allowedRetiredInCatalog` egy leépítési racsnis mechanizmus: bejegyzést csak követő issue-val szabad hozzáadni. | Igen                                      |
| `check:fetch-targets`             | A kliensoldali `src/`-ben minden `fetch("/api/...")` egy valódi `route.ts`-re oldódik fel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Igen                                      |
| `check:deps`                      | A repó összes `package.json`-jában található valamennyi `npm install`-lal telepíthető függőség szerepel a `dependency-allowlist.json`-ban; az új, nem rögzített verziójú vagy slopsquatolt csomagok jelölésre kerülnek                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen                                      |
| `audit:deps`                      | `npm audit` (gyökér + electron) — nincsenek magas/kritikus besorolású biztonsági figyelmeztetések (átfedi az osv `check:vuln-ratchet` ellenőrzést; lásd a Racionalizálási Backlogot)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                      |
| `check:lockfile`                  | A `package-lock.json` integritása — https registry, integritási hash-ek, nincsenek host-felülbírálások                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen                                      |
| `check:licenses`                  | SPDX licenc-engedélyezési lista (allowlist) az éles környezeti függőségekhez                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Igen                                      |
| `check:tracked-artifacts`         | Nincsenek build-artefaktumok / commitolt `node_modules` szimbolikus linkek (a husky pre-commit hookban is lefut; a pre-push szándékosan könnyűsúlyú — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Igen                                      |
| `check:ai-attribution`            | Nincs AI/bot `Co-Authored-By` trailer vagy AI-generáltságot jelző lábléc a PR-commitokban, a címben vagy a törzsben — 16. sz. kötelező szabály (a `quality.yml` fast-gates ciklusában PR→`release/**` esetén — beolvassa az esemény payloadját, PR-eken kívül no-op —, valamint PR-only lépésként a `ci.yml` lintjében PR→`main` esetén; továbbá a husky `commit-msg` hookban is; emberi társszerzők megengedettek; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | Minden Vitest-kizárás megnevez egy követési (tracking) issue-t, és szerepel a `config/quality/vitest-exclusions.json` fájlban (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen                                      |
| `check:file-size`                 | A forrásfájlok (`.ts`/`.tsx` a `src/`, `open-sse/`, `electron/`, `bin/` mappákban) a `cap` korláton belül maradnak, a tesztfájlok (`*.test.ts(x)`) pedig a `testCap` korláton belül; a `file-size-baseline.json` fájlban befagyasztott fájlok (`frozen` / `testFrozen`) nem nőhetnek a rögzített méretük fölé                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Igen                                      |
| `check:error-helper`              | Az executorok/handlerek hibaválaszai a `buildErrorBody()` / `sanitizeErrorMessage()` függvényeket használják (12. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Igen                                      |
| `check:migration-numbering`       | A migrációs SQL-fájlok sorszámozása folyamatos, nincsenek kihagyások vagy duplikációk                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Igen                                      |
| `check:public-creds`              | Nincsenek literális OAuth `client_id`/`client_secret` értékek vagy Firebase Web-kulcsok a `publicCreds.ts` fájlon kívül (11. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Igen                                      |
| `check:db-rules`                  | Nincs nyers SQL a `src/lib/db/` modulokon kívül; nincsenek barrel-importok a `localDb.ts` fájlból (2./5. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Igen                                      |
| `check:known-symbols`             | A dispatch-tábláikban regisztrált provider-executorok, routing-stratégiák és translatorok megegyeznek a lemezen található fájlokkal — nincsenek árva vagy deklarálatlan szimbólumok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Igen                                      |
| `check:route-guard-membership`    | Minden gyermekfolyamatot indító útvonalat az `isLocalOnlyPath()` osztályoz (15./17. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                      |
| `check:test-discovery`            | A repóban minden `*.test.ts` / `*.spec.ts` fájlt legalább egy tesztfuttató összegyűjt (ratchet: az elárvult fájlok listája a `test-discovery-baseline.json`-ban csak csökkenhet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Igen                                      |
| `check:agent-skills-sync`         | A generált agent-skills artefaktumok megegyeznek a forráskatalógusukkal (nincs drift)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | A szolgáltatói logókhoz/assetekhez rögzített provenance-bejegyzés tartozik                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | A JSON konfigurációs fájlok értelmezhetők, és megfelelnek a repó lint-szabályainak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `typecheck:core`                  | TypeScript-fordítás hibák nélkül (csak tanácsadó jellegű figyelmeztetések)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Igen                                      |
| `typecheck:noimplicit:core`       | Szigorú `noImplicitAny` — jövőbe tekintő megközelítés; sok korábbról megmaradt hívási hely még annotációra szorul                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | **Tanácsadó** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | A `tsc` futtatása a `src/app/(dashboard)/**` hatókörre szűkítve (#7033) — a `typecheck:core` kurátori, 27 fájlból álló engedélyezőlistája egyetlen dashboard TSX-et sem tartalmaz, és a `next build` sem végez rajta típusellenőrzést (a `next.config.mjs` `ignoreBuildErrors: true` értéket állít be), így az ottani, elárvult azonosítókkal kapcsolatos regressziók (#6625/#6909) láthatatlanok voltak a CI számára. Egy befagyasztott, fájlonkénti/TS-hibakódonkénti darabszám-baseline-hoz viszonyított eltérés (`config/quality/dashboard-typecheck-baseline.json`, ugyanaz az elavuláskikényszerítési minta, mint a `check:known-symbols` esetében) — csak a baseline-ban rögzített számot meghaladó ÚJ hibák buktatják meg a gate-et; ha egy korábbról megmaradt hiba javításra kerül, az `--update` kapcsolóval lehet a küszöböt lefelé csökkenteni.                                                                                                                                                           | Igen                                      |

### Feladat: `quality-gate`

A `test-coverage` után fut. Hiba esetén blokkolja a merge-et.

| Szkript                      | Ellenőrzi                                                                                                                                                                                           | Blokkoló                      |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `quality:collect`            | Előállítja a `quality-metrics.json` fájlt (ESLint-figyelmeztetések száma, lefedettség az összevont shard-jelentésből)                                                                               | Igen (a ratchet előtti lépés) |
| `quality:ratchet`            | A `quality-baseline.json` egyetlen metrikája sem romlott (ESLint-figyelmeztetések ≤ baseline; lefedettség ≥ baseline)                                                                               | Igen                          |
| `check:duplication`          | A kódduplikáció (jscpd@4) nem haladja meg a `quality-baseline.json` baseline-ját                                                                                                                    | Igen                          |
| `check:complexity`           | A fájlszintű ciklomatikus komplexitás nem haladja meg a korlátot (core ESLint `complexity` + `max-lines-per-function`)                                                                              | Igen                          |
| `check:cognitive-complexity` | Kognitív komplexitás-ratchet (`eslint-plugin-sonarjs`) — külön ESLint-futás; a CI mindkettőt egyetlen `check:complexity-ratchets` lépésbe összevonva futtatja                                       | Igen                          |
| `check:dead-code`            | A nem használt exportok / fájlok ratchetje (knip) nem romlik a baseline-hoz képest                                                                                                                  | Igen                          |
| `check:compression-budget`   | Tömörítési benchmark-költségkeret — a motoronkénti token-megtakarítási minimumok nem romolhatnak                                                                                                    | Igen                          |
| `check:type-coverage`        | A típusozottsági százalék ratchetje (`type-coverage`) nem romlik; nagyrészt magában foglalja a `typecheck:noimplicit:core`-t                                                                        | Igen                          |
| `check:codeql-ratchet`       | A nyitott CodeQL-riasztások száma nem romlik (`gh api`-n keresztül olvas; token nélkül hibamentesen kihagyja magát) — frissítési gyakoriság és manuális indítás: lásd lent a „CodeQL ratchet" részt | Igen                          |

### Feladat: `quality-extended`

A teljes feladat tanácsadó jellegű (`continue-on-error: true`). Az npm-alapú ratchetek valóban lefutnak; a külső szkennerek a `gh release download` útján települnek, és önként kihagyják magukat (exit 0), ha egy bináris továbbra is hiányzik.

| Szkript                  | Ellenőrzi                                                                                                                                                                                                                            | Blokkoló                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| `check:circular-deps`    | Nincsenek körkörös függőségek (dpdm)                                                                                                                                                                                                 | **Tanácsadó**                                           |
| `check:bundle-size`      | A bundle-méret nem haladja meg a korlátot                                                                                                                                                                                            | **Tanácsadó**                                           |
| `check:secrets`          | Titkos adatok vizsgálata (gitleaks) — kihagyja, ha a bináris hiányzik                                                                                                                                                                | **Tanácsadó**                                           |
| `check:vuln-ratchet`     | A függőségi sebezhetőségek (osv-scanner) nem romlanak — kihagyja, ha a bináris hiányzik                                                                                                                                              | **Tanácsadó**                                           |
| `check:workflows`        | Workflow-lintelés (actionlint + zizmor); a hiányzó/hibás szkennerek, érvénytelen jelentések vagy hiányzó ratchet-baseline INCOMPLETE-ként megbuknak. Az érvényes találatok a kiválasztott strict/advisory/ratchet irányelvet követik | Végrehajtás kötelező; a zizmor-ratchet blokkol a CI-ben |
| `check:openapi-breaking` | A nyilvános API-kontraktus (`openapi.yaml`) breaking change-ei a base branch-hez képest (oasdiff) — `openapiBreaking=N` értéket ad ki; kihagyja, ha az oasdiff hiányzik vagy a base spec nem feloldható                              | **Tanácsadó**                                           |

### Feladat: `docs-sync-strict`

Minden `main`-re irányuló PR-nél fut. Hiba esetén blokkolja a merge-et.

| Szkript                        | Ellenőrzi                                                                                                                                                                                        | Blokkoló                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| `check:docs-all`               | Meta-kapu, amely egymás után lefuttatja az alábbi 6 alkapot                                                                                                                                      | Igen                           |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt verziókonzisztencia                                                                                                                                                | Igen                           |
| ↳ `check:docs-counts`          | A prózában szereplő számok (szolgáltatószám, migrációszám stb.) a valós számok racsnis ablakán belül mozognak                                                                                    | Igen                           |
| ↳ `check:env-doc-sync`         | A `.env.example` fájl minden környezeti változója dokumentálva van egy docs-táblázatban, és fordítva                                                                                             | Igen                           |
| ↳ `check:deprecated-versions`  | Nincsenek elavult verziósztringek a dokumentációban                                                                                                                                              | Igen                           |
| ↳ `check:doc-links`            | A dokumentáció belső markdown-hivatkozásai valós fájlokra oldódnak fel (`[text]`/`(path)` forma)                                                                                                 | Igen                           |
| ↳ `check:fabricated-docs`      | A dokumentációban hivatkozott route-ok, környezeti változók, CLI-parancsok, hook-nevek és fájlútvonalak léteznek a kódbázisban. Kemény kapu `--strict` kapcsolóval; a kapcsoló nélkül soft-fail. | Igen (CI-ben `--strict` révén) |
| `check:cli-i18n`               | A CLI-parancssztringek minden i18n locale-fájlban jelen vannak                                                                                                                                   | Igen                           |
| `check:openapi-coverage`       | Az OpenAPI-specifikáció legalább a valós route-ok racsnival rögzített minimális arányát lefedi                                                                                                   | Igen                           |
| `check:openapi-security-tiers` | Az `openapi.yaml` biztonsági szint-annotációi konzisztensek a `routeGuard.ts` osztályozásaival                                                                                                   | **Figyelmeztető**              |
| `check:openapi-routes`         | Az `openapi.yaml` minden útvonala valós `route.ts`-re oldódik fel (hallucináció elleni védelem)                                                                                                  | Igen                           |
| `check:docs-symbols`           | A `docs/**/*.md` fájlokban szereplő minden `/api/...` hivatkozás valós `route.ts`-re oldódik fel (hallucináció elleni védelem)                                                                   | Igen                           |
| `i18n translation drift`       | Lefordítatlan kulcsok az i18n locale-fájlokban — csak figyelmeztetés                                                                                                                             | **Figyelmeztető**              |

### Feladat: `i18n-ui-coverage`

| Szkript                           | Ellenőrzi                                                                                                                                                                                                         | Blokkoló          |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `check-ui-keys-coverage` (inline) | A UI i18n-kulcsok lefedettsége ≥ 65%                                                                                                                                                                              | Igen              |
| `check-ui-value-drift` (inline)   | Egy átírt angol **érték** nem hagy maga után elavult fordítást                                                                                                                                                    | Igen              |
| `check-new-key-coverage` (inline) | Minden **új** angol kulcs le van fordítva minden locale-ban — a `__MISSING__:` jelölő elutasításra kerül                                                                                                          | Igen              |
| `check-translation-ratio`         | A valós fordítások aránya locale-onként (az angollal azonos / helyőrző / hiányzó levelek az engedélyezési listán kívül) nem haladhatja meg a `config/quality/i18n-translation-baseline.json` + tűréshatár értékét | **Figyelmeztető** |

`fetch-depth: 0` szükséges — az értékeltolódási kapu az `en.json`-t a merge base-szel veti össze.

#### `check-ui-value-drift` — az elavult fordítások kapuja

Elkapja azt az egyetlen i18n-regressziót, amelyet a többi kapu strukturálisan nem láthat:
egy angol értéket átírnak, és a _korábbi_ angol szövegből származó fordítások lemaradnak,
így a nem angolul használó felhasználók továbbra is magabiztosan megfogalmazott, ám már
hibás szöveget olvasnak.

Ez valóban élesben is megtörtént. Az `oauthModal.googleOAuthWarning` átíródott, amikor az
Antigravity bejelentkezési segéd bekerült (#5203); **a 43 locale-ból 39** olyan szöveget
tartott meg, amely arra kérte az operátorokat, hogy „másolják ki a teljes URL-t, és
illesszék be alább" — egy folyamatot, amely ennél a szolgáltatónál nem vihető végig.
Egészen #8463-ig észrevétlen maradt, mert:

- a `sync-ui-keys` csak a **hiányzó** kulcsokat tölti vissza, az **elavultakat** soha;
- a `check-ui-keys-coverage` a kulcsok _jelenlétét_ számolja, így egy elavult fordítás is lefedettként pontozódik;
- a `check-translation-drift` a `docs/i18n/<locale>/**.md` dokumentációs tükrözéseket követi —
  soha nem olvassa a `src/i18n/messages/*.json` fájlokat. A 2026-09-es újraszinkronizálás
  óta blokkoló a `docs-sync-strict` feladatban: alapdokumentum szerkesztése → `npm run i18n:run -- --files=<doc>` (szekciószintű, olcsó).

**Diff-tudatos, nem baseline-alapú.** Az `en.json` fájlt a merge base-en és a
working tree-n veti össze; minden kulcsnál, amelynek angol értéke megváltozott, az a
locale elavult, amely még mindig az érintetlen fordítást tartalmazza. Ez szándékosan
**befagyasztja a már meglévő adósságot** — egy diff nem tudja megmutatni, hogy egy régóta
fennálló fordítás melyik régi angol szövegből származott, ezért a kapu csak azt ítéli meg,
amit az aktuális változás érint. Az alternatíva (egy kulcsonkénti hash-baseline) egy
~600 KB-os generált fájlt jelentene — a legnagyobb meglévő baseline háromszorosát —, amely
minden i18n PR-nál változna.

Kétféleképpen lehet teljesíteni:

1. frissítse az érintett fordításokat, vagy
2. állítsa őket `__MISSING__:<new english>` értékre — a futtatókörnyezet ekkor a javított
   angol szöveget szolgáltatja (`src/i18n/request.ts::deepMergeFallback`, #7258), a kulcs
   pedig sorba kerül fordításra.

Ha a szöveg **jelentése** változott, inkább **nevezze át a kulcsot**: egy új kulcs nem
örökölhet elavult fordítást. Ezt a mintát követte a #8463 is.

```bash
npm run i18n:check-value-drift          # szigorú (ezt futtatja a CI)
npm run i18n:check-value-drift:warn     # csak jelentés
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

0-s kilépési kóddal és `SKIP reason=base-unresolved` üzenettel tér vissza, ha az
alapkatalógus nem olvasható (shallow clone a base ref nélkül), a
`check-openapi-breaking` viselkedését tükrözve.

### Job: `i18n`

Teljes i18n-ellenőrzési mátrix (locale-nként egy job). A teljes job tájékoztató jellegű.

| Szkript                         | Amit ellenőriz                       | Blokkoló                                                   |
| ------------------------------- | ------------------------------------ | ---------------------------------------------------------- |
| `validate_translation.py quick` | A fordítások teljessége locale-nként | **Tájékoztató** (`continue-on-error: true` a teljes jobon) |

### Job: `pr-test-policy`

Csak pull requesteken fut.

| Szkript                | Amit ellenőriz                                                                                                                                                | Blokkoló |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | A `src/`, `open-sse/`, `electron/` vagy `bin/` könyvtárakban produkciós kódot módosító PR-eknek teszteket kell tartalmazniuk vagy frissíteniük (Hard Rule #8) | Igen     |
| `check:test-masking`   | A módosított tesztfájlok nem csökkenthetik a nettó assert-számot, és nem adhatnak hozzá `assert.ok(true)` tautológiákat                                       | Igen     |
| `check:pr-evidence`    | A PR leírása teszt-/VPS-bizonyítékot idéz a változáshoz (a Hard Rule #18-at gépesíti a PR szövegének grepelésével — törékeny, lásd: Backlog)                  | Igen     |

### Job: `test-vitest`

A `build` után fut. Hiba esetén blokkolja a merge-ölést.

| Csomag           | Amit ellenőriz                                             | Blokkoló                                                                                                                    |
| ---------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-szerver (110 eszköz), autoCombo, cache — vitest runner | Igen                                                                                                                        |
| `test:vitest:ui` | UI-komponenstesztek — vitest runner                        | **Blokkoló** — a már meglévő hibák explicit módon ki vannak zárva a `vitest.config.ts`-ben; az új hibák elbuktatják a jobot |

### Éjszakai workflow-k (ütemezettek, tájékoztató jellegűek)

Ezek cron-ütemezésben (és `workflow_dispatch` esetén) futnak, PR-eken soha. Mindegyik
tájékoztató jellegű.

| Workflow               | Amit ellenőriz                                                                                                                                                                    | Blokkoló        |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | fast-check property-tesztek véletlenszerű seed-del + magas futásszámmal                                                                                                           | **Tájékoztató** |
| `nightly-resilience`   | heap-növekedési kapu, káosz-alapú hibainjektálás, k6 load/soak                                                                                                                    | **Tájékoztató** |
| `nightly-llm-security` | promptfoo injection-védelem (blokkoló mód) + garak-próbák (provider secret nélkül kihagyva)                                                                                       | **Tájékoztató** |
| `nightly-schemathesis` | OpenAPI-szerződésfuzzing (schemathesis) egy élő OmniRoute ellen a `docs/openapi.yaml` alapján — felszínre hozza a specifikációsértéseket / kezeletlen 500-as hibákat (Fase 8 B.4) | **Tájékoztató** |
| `nightly-mutation`     | Stryker mutációsteszt-pontszám a gyors unit-sávon — a túlélő mutánsok gyenge assertekre utalnak                                                                                   | **Tájékoztató** |
| `nightly-compat`       | Node engine-kompatibilitási mátrix a támogatott `engines.node` tartományokon                                                                                                      | **Tájékoztató** |

A teljesítmény-baseline-ok (heap, TTFB, build-idő) rögzítésre kerülnek, nem kapuzottak:
lásd [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
