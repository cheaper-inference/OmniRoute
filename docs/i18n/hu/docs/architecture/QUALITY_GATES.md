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

A CI és a Quality Gates munkafolyamatok egyaránt stabil ítéletet adnak ki: `Gate / CI` és `Gate / Quality`. Verziózott felvételi szabályzatuk minden felfelé irányuló munkát felsorol, amennyiben szükséges vagy tanácsos. Egy megfelelő kötelező feladatnak sikeresnek kell lennie: hiányzó, törölt, kihagyott, függőben lévő és ismeretlen eredmények nem hozhatók létre PASS. Egy érvényes, csak dokumentumokra vagy csak katalógusra vonatkozó besorolás alkalmatlanná tehet egy kódsávot; egy közönséges PR tervezet nem elfogadott jelölt. A `hotfix` címke nem mond le a bizonyítékról.

Mindkét munkafolyamat lefedi PRs main/release ágakra, `main` re történő átküldést, a kézi feladást és a csoportos összevonási eseményeket. Push, dispatch és merge-group futtatja a teljes kijelölést. A megbízható Mergify várólista vázlat a vonatkozó `full-code`/`full-code-e2e` jobokat is futtatja; közönséges PRs kihagyja őket. A kézi egyesítés előtt futtasson egy teljes kiküldést a pontos jelölten. `release/**` re történő leküldések nem indítják el ezeket a munkafolyamatokat; A Release-Green külön figyeli az egyesített bázist (`docs/ops/RUNNER_BOX.md` → Hosted lane). Az elágazások és az összevonási csoportok hosztolt futókat használnak azokhoz a feladatokhoz, amelyek egyébként önkiszolgáló futókat választanak ki; elegendő hosztolt kapacitást kell ellenőrizni a közzététel előtt.

Egy közönséges PR futtatja a gyors kiválasztást. A belépési szabályzat `full-code` és `full-code-e2e` sávjai (E2E, integráció, csomagtermékek, Electron füst, Bun SQLite, ökoszisztéma és protokollkliensek) csak a Mergify várólista vázlaton vagy teljes futtatáson futnak: `gh workflow run ci.yml --ref <branch>`.

Minden JSON nyugta azonosítja a kivett SHA, a munkafolyamat futtatását és kísérletét. A CLI elutasítja a checkout/event SHA eltérést. A munkafolyamat-tesztek a házirend-tagságot a döntési feladat `needs` listájához kötik, így egy új vagy eltávolított sáv nem tud csendben eltűnni. A nyugták a saját munkafolyamatukat fedik le, nem pedig a közzétételt, a telepítést vagy a meglévő tanácsadó szkenner belső elemeit. Külön adminisztratív változást jelent a fióktelepi szabályzatban előírt megfelelő ellenőrzések elvégzése; munkakörük meghatározása önmagában nem véd egy ágazatot.

`API Route Typecheck` egy független munkafolyamat-ellenőrzés, amely kívül esik az összesített ítéleteken és a helyi teljes megfigyelő statikus profilján. Az eredményt külön nézze meg a pontos jelöltnél. `.github/workflows/api-route-typecheck.yml` PRs n fut `main` vagy `release/**` formátumba, továbbítja az ágcsaládhoz, a kézi küldéshez és a `merge_group` típusú `checks_requested` eseményekhez. Nincs útvonalszűrője. Csoportok egyesítése nézze meg `merge_group.head_sha`; egyéb események nézd meg `github.sha`. Minden esemény ugyanazt a API diagnosztikai kaput és kapuegység tesztet használja. PR alapújracéljai új ellenőrzést kérnek; body/title szerkesztések a csak megfigyelésre szolgáló `Admission not requested / API Route Typecheck` nevet használják, és nem helyettesíthetik a felvételi ellenőrzést.

### Megőrzött bizonyíték az átvételi szűkítőben

`scripts/quality/validate-release-acceptance.mjs` csökkenti a szállított tervet és annak manifesztációit; nem állapítja meg, hogy a terv a teljes kibocsátási vezetéket lefedi. A jelentései kifejezetten beállítják `releaseAcceptance: false`, még akkor is, ha ez a terv `VERIFIED`. A `release-acceptance.yml` munkafolyamat továbbra is árnyékszerszámokat használ, nem valódi összeállítási, csomag-, rendszerindítási vagy promóciós nyugtákat.

A CLI megköveteli `--evidence-root`, hogy ellenőrizze a megőrzött bizonyítékokat. A fájlok feloldása `<evidence-root>/<artifact_id>/<member>` ként és SHA-256 ként hasított. A bizonyíték nélküli PASS rekord, egy hiányzó vagy megváltozott fájl, egy nem biztonságos elérési út vagy egy szimbolikus hivatkozás megakadályozza az ellenőrzést. A hiányzó fájlok nem egyenlőek az üres sikeres naplókkal. A meglévő SHA/run/attempt ellenőrzések függetlenek maradnak: az egyező bájtok nem tudják megmenteni az elavult nyugtát. A fájl sértetlensége nem a végrehajtás hitelességének vagy a műtermék promóciójának bizonyítéka.

### DAST az ellenőrzött CI buildet használja

A szükséges `dast-smoke` CI job `build` után hívja `.github/workflows/dast-smoke.yml`. Ugyanazt code/draft kiválasztást követi, mint a build, beleértve a támogatott fork PRs, a kiadás-cél PRs és az egyesített csoportokat. Egy hiányzó, sikertelen, törölt vagy váratlanul kihagyott DAST feladat blokkolja `Gate / CI`. Az újrafelhasználható munkafolyamatnak nincs független PR/dispatch triggerje; A kézi érvényesítés CI küldését használja, így a build és a fogyasztó egy futásban marad.

`scripts/ci/next-build-provenance.mjs` lezárja a teljes Next mellékterméket a tar kivonattal, repository/event/run, a gyártói kísérlettel, head/base/checkout/tree, a munkafolyamat-identitásokkal, a zárfájllal, a pontos csomóponti version/ABI, a platformmal és a kötegelővel. DAST kiválasztja a megváltoztathatatlan mellékterméket ID `needs.build.outputs` ből, megköveteli a letöltési kivonat ellenőrzését, és egymástól függetlenül összevonja a ZIP a gyártói kivonattal, mielőtt `scripts/ci/unpack-ci-build.py` keresztül kivonaná annak két engedélyezett tagját. A következő fa kibontása előtt a jegyzéknek és a tar archívumnak meg kell egyeznie a független gyártói kimenetekkel. Soha nem keresi a legújabb sikeres fióktelepítést. A részleges újrafutás újra felhasználhatja ugyanazt a termelői kísérletet, ha ID és az összes bemenet továbbra is egyezik; a nyugta mindkét próbálkozást rögzíti.

A fogyasztó egy hosztolt Linux futón marad, amely csak olvasható lerakatengedéllyel rendelkezik, és nincs adattártitka. Telepíti a gyártó pontos Node verzióját, majd összeállítja a CLI `OMNIROUTE_REQUIRE_PREBUILT_NEXT=1` vel. `scripts/build/standaloneInput.mjs` visszautasítja a hiányzó önálló kiszolgálót a tartalék build előtt; A normál helyi CLI buildek megtartják meglévő tartalékaikat. A szerver készenlétének, a sémának és a promptfoo-nak mind sikeresnek kell lennie a változatlan 25 perces feladatkorláton belül. A származási nyugta a bemeneti azonosságot és a bájtokat bizonyítja, nem a sikeres DAST vizsgálatot. A műtermékek lejárata, a futómű megszakadása vagy a meghibásodott szkenner hiányos vagy meghibásodott bizonyíték marad; nem válhat PASS egy tanácsadó csomagon keresztül.

### UI végrehajtási kapacitás

CI a teljes UI leltárt négy `test-vitest` mátrixszilánkként futtatja, egyenként legfeljebb két dolgozóval, és a jelenlegi 15 perces munkavégzési határidővel. Az első szilánkon a MCP/autoCombo Vitest programcsomag is fut. A munkavégzéshez szükséges eredmény minden mátrix lábra kiterjed; egy szilánk sikertelensége vagy törlése nem alapozhatja meg a jelölt felvételét.

Az éjszakai megfigyelő minden egyes UI szilánkról külön megőrzi a pontos jelöltről szóló bizonylatot, beleértve a MCP végrehajtását az első nyugtán. Mind a négy nyugta, napló és egyező végrehajtási azonosító szükséges. A helyi `npm run test:vitest:ui` továbbra is kiválasztja a teljes csomagot; egy `--shard` futtatás csak részleges bizonyíték.

### Egységlefedettség gyűjtése

A tizenkét egységszilánk a meglévő tesztvégrehajtás során gyűjti a V8-as lefedettséget. A sikeres szilánk futtatja `scripts/ci/compact-v8-coverage.mjs` az eredeti fájlok tömörítésére anélkül, hogy közbenső Isztambuli jelentést generálna. Az utolsó Coverage-feladat mind a tizenkét jegyzéket ellenőrzi a jelölt SHA, futásidejű, forrásgyökér- és adatkivonatokkal, majd futtatja a c8 riportereit és a meglévő lefedettségi küszöbértékeket. A bemenetek megtartják a c8 globális fájlneveinek sorrendjét; A szilánkonkénti előegyesítés nem biztonságos vegyes function/block lefedettség esetén. A hiányzó, rosszul formázott vagy összeférhetetlen szilánkok felvétele sikertelen. A sikertelen tesztszilánkok külön megőrzik a nyers diagnosztikai lefedettséget; nem léphet be a végső egyesítésbe.

### Az egység végrehajtásának folyamatáról szóló nyugták

A megosztott `test:unit:ci:shard` parancs `scripts/ci/unit-progress-reporter.mjs` keresztül rögzíti a `primary`, `dashboard` és `serial` fázisokat. A normál tesztjelentés továbbra is elérhető. Egy külön, csak metaadatokat tartalmazó nyugta rögzíti az egyes fájlok kezdetét és befejezését, és egy 30 másodperces szívverés listázza a még aktív fájlokat és az eltelt idejüket. Csak az engedélyezési listán szereplő végrehajtási metaadatokat rögzíti; A tesztleírások, a kimenetek, a hibatestek és a teljes környezet nem sorosozva.

CI a JSONL fájlokat `unit-progress-ci-<run>-<attempt>-<shard>` néven tartja meg. A feladat időtúllépése megakadályozhatja a későbbi feltöltést; A már kibocsátott szívverések diagnosztikai bizonyítékok maradnak. A hiányzó szívverések blokkolt vagy megszakadt futófolyamatot is jelezhetnek. Ezek a nyugták megőrzik a meglévő tesztkiválasztást, egyidejűséget, határidőket és kilépési állapotot; nem jelöltfelvételi ítéletek.

### Várólista összevonása

A `queue` címke egy PR küld a Mergify queue (`.mergify.yml`) sorba. A Mergify megnyit egy PR vázlatot egy `mergify/merge-queue/` ágon, CI ott futtatja a teljes kijelölést, és az eredeti PR egyesül, amikor `Gate / CI`, `Gate / Quality` és `Merge integrity (changelog + generated skills)` áthalad.

A Mergify beírja a sor összefoglalóját a vázlat leírásába. Body/title-only `pull_request` `edited` események egy futás-specifikus párhuzamossági csoportot használnak, és nem futtatják újra az osztályozást, a mátrixok tesztelését, az integritás összevonását vagy a felvételi ítéletet. A csak megfigyelési ellenőrzési nevek nem helyettesíthetik `Gate / CI` vagy `Gate / Quality`. A célbázist módosító szerkesztés új jelöltérvényesítést kér.

A várakozási sor után a leküldés nem mindig állítja be újra a PR. Írd meg kommentben `@mergifyio queue` t.

### Statikus szkennelési leltár

A verziójú npm-alias leltár és a statikus keresési tagság `config/quality/gate-manifest.json` ban működik. Futtassa `npm run check:gate-manifest` a szkriptnevek és `package.json` elleni pontos parancsok érvényesítéséhez; a kiegészítések, eltávolítások és parancssodródás mind a helyi hook, mind a változás-osztályozási feladatok meghiúsulnak CI ben. Az álnév nem munkafolyamat-feladat, mátrixpéldány vagy teszteset: ezeket a számokat nem szabad felcserélhetőként bemutatni.

`npm run quality:scan -- --list` vagy `npm run quality:scan:fast -- --list` segítségével ellenőrizheti a kiválasztott álneveket végrehajtásuk nélkül. A futtató meghívja az npm belépési pontot, így annak futásideje (beleértve Bun ha be van állítva) megmarad. A jegyzékrekordok a profilokon kívüli álneveket külön meghívva rögzítik, és a karbantartási parancsok tiltottak a csak olvasható vizsgálati profilokban.

Ezek a profilok csak a statikus vizsgálatot fedik le. Nem tanúsítják a termékteszteket, a lefedettséget, a csomagolást, a külső ellenőrzéseket vagy a jelölt teljes kiadási elfogadását. A munkafolyamat-felvétel a kapcsolt `config/quality/admission-policy.json` és `scripts/quality/admission-verdict.mjs` használja. A kiadás-megfigyelő profilok külön maradnak; függetlenül vizsgálja meg a vonatkozó csekkeket és nyugtákat. A teljes megfigyelő statikus parancsait `config/quality/release-green-static-profile.json` deklarálja, beleértve `audit:deps`, a mutációs teszt kiválasztását és a fordítási ellenőrzéseket. A betöltő ellenőrzi az npm parancsokat package.json és a modellezett CI/Quality deklarációk alapján; elutasítja a sodródást, ahelyett, hogy shell tokeneket hajtana végre argumentumként. A szkenner szükséges SKIP/INCOMPLETE kimenete nem tudja létrehozni PASS. A profil rögzíti a külső kizárásokat, és nem helyettesíti a tárolt lefedettséget, a tesztmátrixokat, a csomagot vagy a telepítési bizonyítékokat. Az alábbi prózai leltár referencia, nem annak bizonyítéka, hogy valóban befutott egy kapu.

A szkriptek `scripts/check/` (policy gates) és `scripts/quality/` (racsnis motor) alatt élnek. Az igazság CI forrása `.github/workflows/ci.yml`.

### A közzétett dokumentáció állapota

`.github/workflows/i18n-base-health.yml` megfigyeli a dokumentáció állapotát `main` és `release/v*` kiválasztott leküldése után, valamint kézi feladáskor. Szűrői lefedik a dokumentációt, a root Markdownt, `llm.txt`, a fordítási state/configuration és a vonatkozó i18n-eszközöket. Az egyetlen `Published base documentation health` feladat az Ubuntut és az ötperces határidőt használja. Csak olvasható érvényesítést hajt végre, és diagnosztikai nyugtát ír függőségi telepítés, fordítás vagy állapotátvétel nélkül.

`scripts/i18n/check-base-health.mjs` nulla forrás-kivonat, hiányzó cél, célkivonat, elavult fordítás és szakasz-gyorsítótár inkonzisztenciát igényel. Ezenkívül érvényesíti a jelenlegi alapvető document/locale hatókört és annak rögzített származását. Érvénytelen kontextus, hiányos lefedettség vagy megszakadt ellenőrző `INCOMPLETE` eredményez; a megerősített sodródás `FAIL` eredményez. Mindkettő sikertelen kilépési állapotot ad vissza. A nyugta SHA fizetéshez, a munkafolyamathoz, a futtatáshoz és a kísérlethez kötődik, és `i18n-base-health-<sha>-<run>-<attempt>` néven őrződik meg.

Ez a közzétett bázis független megfigyelése. Nem ad hozzá PR vagy merge-group eseményt, kötelező PR ellenőrzést, npm álnevet vagy statikus pásztázási profiltagot. A mögöttes ellenőrző is blokkolja mind az öt osztályt abszolút módban. A szokásos PR előkészítés külön marad a felvételitől. Sikeres feltöltés nem változtathatja meg a sikertelen állapotot PASS vé.

Egy közönséges PR `--preflight` használja `--baseline-evidence` által generált alapjelentéssel. Csak akkor hagyhat függőben egy angol forrást, ha a teljes fordítási rekord és a tényleges célbájtok nem változnak a pontos alaphoz képest. Az új cél- vagy szakasz-gyorsítótár inkonzisztenciái továbbra is blokkolnak, és a hiányos bizonyítékok nem teszik lehetővé az előkészítést. A jelentés külön kiteszi `preparationPending` és `mergeReady` : a sikeres előkészítés nem teszi készen a függőben lévő fordításokat egyesítésre. Felvétel előtt frissítse az érintett tükröt az összeállított jelöltben. A megbízható Mergify queue jelölt, `merge_group`, az ágleküldések és a kézi CI futtatások az abszolút ellenőrzőt használják, `--warn` vagy öröklött hibák megbocsátása nélkül. A hiányzó célkivonatok és a törölt rögzített alapfájlok által csökkentett hatókör nem hozhat sikeres abszolút ítéletet.

### PR gyorsút (`quality.yml`) kiadása

`.github/workflows/quality.yml` kiegészíti CI main/release PRs, továbbítja `main`, csoportokat küld és egyesít. PRs útvonalszűrt gyors ellenőrzéseket használ. A véglegesen letiltott duplikált build eltávolítva; a valódi build/package/boot csekkek a CI ban maradnak. Az egységcsomag és a vitest csak CI -ban fut (`Unit Tests (N/12)` és `Vitest`).

| Munka                                            | Hatály                                                                                                                                                                                                                                         | Blokkolás                     |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs és docs-all                                                                                                                                                                                                       | Igen                          |
| `Fast Quality Gates`                             | Kód PRs; statikus ellenőrzések, típusellenőrzés, műszerfali típusellenőrzés, érintett egységtesztek                                                                                                                                            | Igen                          |
| `Forgotten sibling tests`                        | Kód PRs; megváltozott modulok, amelyek statikus fogyasztókra és jelölt testvértesztekre vezethetők vissza; a hordós és a dinamikus importálási útvonalakat tanácsadó diagnosztikaként jelentik, a hivatkozott engedélyezési lista kivételeivel | **Tanácsadó**                 |
| `No new ESLint warnings`                         | Kód PRs; elnyomást tudó szöszvédő                                                                                                                                                                                                              | Igen, beleértve a villákat is |
| `Merge integrity (changelog + generated skills)` | Nem tervezet PRs; változásnapló és generált készségszinkronizálás                                                                                                                                                                              | Igen, beleértve a villákat is |

#### Elfelejtett testvérteszt-jelentés

`npm run check:forgotten-sibling-tests` `Fast Quality Gates` tanácsadó lépéseként fut, és újrafelhasználja az importfeloldót a teszt-hatástérkép mögött. Minden módosított gyártási modulnál determinisztikus `changed module/symbol -> static consumer -> candidate sibling test` láncokat jelent, ha a jelölt teszt hiányzik a lekérési kérés különbségéből. A Markdown összegzése és JSON eredménye a `forgotten-sibling-tests` munkafolyamat melléktermékeként megmarad a blokkoló közzététel előtti kalibráláshoz.

A hordós reexport és a dinamikus import csak felbontási diagnosztikát jelent; soha nem hoznak létre blokkoló megállapítást. A felülvizsgált kivételek élőben `config/quality/forgotten-sibling-allowlist.json` ban. Minden bejegyzésnek meg kell neveznie a fogyasztói és jelölt tesztet, meg kell adnia egy konkrét indoklást, és összekapcsolnia kell egy GitHub problémát vagy lekérési kérést. A hibás formátumú bejegyzések lezárása sikertelen. A kivételek nem tilthatják el a törölt jelölttesztet vagy `.skip`/`.todo` hozzáadó különbséget; Az állításgyengítés és az egyéb maszkolás továbbra is a független blokkoló `check:test-masking` kapu tulajdonában marad.

### Munkakör: `lint`

Minden PR tól `main` ig fut. A blokkok összeolvadnak hiba esetén.

| Szkript (`npm run ...`)           | Érvényesíti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Blokkolás                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | Node.js verzió a támogatott tartományon belül van                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen                                      |
| `check:cycles`                    | Körkörös importálás a teljes `src/` + `open-sse/` (AST-alapú, tsconfig `paths` megoldva). A Bare kilép 1-ből, amikor bármilyen ciklus létezik ( #15281 óta hibazárás), és kilistázza a SCCs. `check:cycles:ratchet` (amit CI fut) blokkol, ha a szám meghaladja a `metrics.cycles` plafont `quality-baseline.json` — ban jelenleg 14, `direction: down`, tehát csak eshet (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Igen (racsnis)                            |
| `check:boundary`                  | `open-sse → src` csatolás: egyedi importálás fájlról fájlra a motorból az alkalmazásba (`scripts/quality/measure-boundary.mjs`; a szélső lista a v4 core/module-split helyreállítási hátralék). Bare = tanácsadó jelentés (ugyanaz, mint `quality:boundary`). `check:boundary:ratchet` (amit CI fut, a `quality.yml` gyorskapu racsnis hurokban is) blokkol, ha a szám meghaladja a `metrics.boundaryOpenSseToSrc` plafont a mért 771-es `quality-baseline.json` — ban, `direction: down`; `--update` csak csökkenti; bázisrelatív a PRs (`--base-ref`, lásd alább)                                                                                                                                                                                                                                                                                                                                                                                                                                               | Igen (racsnis)                            |
| `check:route-validation:t06`      | Zod sémák minden útvonalon jelen vannak (Tier 6 házirend)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Igen                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` száma nem haladja meg a költségvetést (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen                                      |
| `check:provider-consistency`      | `providers.ts` minden szolgáltatója rendelkezik egy megfelelő bejegyzéssel `providerRegistry.ts` ben (és fordítva, az engedélyezési listán belül)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen                                      |
| `check:model-lifecycle`           | A három kézzel karbantartott útválasztási tábla konzisztens marad a bejegyzett életciklus-pillanatfelvétellel (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nem szerez olyan visszavont azonosítót, amelyet `REGISTRY` irányíthatna; minden `BUILT_IN_ALIASES` cél jelen van `REGISTRY` ben, és hiányzik a visszavont azonosító pillanatképen; minden `REGISTRY` ben lévő nyugdíjas azonosítót továbbítanak vagy listáznak `allowedRetiredInCatalog` ban; és egyetlen `DEFAULT_DEGRADATION_MAP` forrás vagy cél sem tűnik kivontnak azon a pillanatfelvételen. Ez nem bizonyítja, hogy egy modellt jelenleg élő upstream szolgál ki. Az offline — összehasonlítja `config/quality/model-lifecycle.json` val, kézzel frissítve `npm run quality:refresh-model-lifecycle` (hálózat; nincs bekötve CI). `allowedRetiredInCatalog` egy leégett racsnis: csak nyomkövetési problémával adjon meg bejegyzést.                                                                                                            | Igen                                      |
| `check:fetch-targets`             | Az ügyféloldali `src/` -ben minden `fetch("/api/...")` valódi `route.ts` vé oldódik fel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Igen                                      |
| `check:deps`                      | Az összes `npm install` -able dep a repo minden `package.json` jén belül `dependency-allowlist.json` ben van; az új rögzítetlen vagy csúszott csomagok megjelölve                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen                                      |
| `audit:deps`                      | Mind az öt független zárfájl npm auditálása (root, Electron, OpenCode bővítmények, v1/v2 és szolgáltató). Kritikus tanácsadó blokk; A magas szintű figyelmeztetések látható figyelmeztetések maradnak. Missing/failed auditok INCOMPLETE és blokk; hatókörönkénti zárolási kivonatok és jelentések megmaradnak.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                      |
| `check:lockfile`                  | `package-lock.json` integritás — https rendszerleíró adatbázis, integritás kivonat, nincs gazdagép felülírása                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Igen                                      |
| `check:licenses`                  | SPDX licenc engedélyezési lista a termelési függőségekhez                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Igen                                      |
| `check:tracked-artifacts`         | Nincsenek összeállítási műtermékek / elkötelezett `node_modules` szimbolikus linkek (husky pre-commit-ben is fut; az előzetes lenyomás szándékosan könnyű — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Igen                                      |
| `check:ai-attribution`            | Nincs AI/bot `Co-Authored-By` előzetes vagy mesterséges intelligencia generációs lábléc PR commitokban, cím vagy törzs — kemény szabály #16 (a `quality.yml` gyorskapu hurokban PR→ `release/**` — beolvassa az esemény hasznos terhelését, no-op off PRs — és csak PR-lépés `ci.yml` → `main` ban a PR esetében is; `commit-msg` ; emberi társszerzők engedélyezettek #14436                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:vitest-exclusions`         | Minden Vitest kizárás megnevez egy nyomkövetési problémát, és megjelenik `config/quality/vitest-exclusions.json` ben (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Igen                                      |
| `check:file-size`                 | A forrásfájlok (`.ts`/`.tsx` `src/`, `open-sse/`, `electron/`, `bin/`) `cap` belül maradnak, a tesztfájlok (`*.test.ts(x)`) pedig `testCap` n belül; `file-size-baseline.json` ben lefagyasztott fájlok (`frozen` / `testFrozen`) nem nőhetnek túl a rögzített méretükön                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Igen                                      |
| `check:error-helper`              | executors/handlers hibaválaszai `buildErrorBody()` / `sanitizeErrorMessage()` (Kemény #12) szabályt használják                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Igen                                      |
| `check:migration-numbering`       | Az áttelepítési SQL fájlok sorrendben vannak számozva, nincsenek hiányosságok vagy ismétlődések                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                      |
| `check:public-creds`              | Nincsenek szó szerinti OAuth `client_id`/`client_secret` vagy Firebase webkulcsok `publicCreds.ts` kívül (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Igen                                      |
| `check:db-rules`                  | Nincs nyers SQL `src/lib/db/` modulokon kívül; nincs hordóimport `localDb.ts` -től (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Igen                                      |
| `check:known-symbols`             | A szolgáltató végrehajtói, útválasztási stratégiái és a kiküldési táblájukban regisztrált fordítók megegyeznek a — lemezen lévő fájlokkal, nincs árva vagy nem deklarált szimbólum                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Igen                                      |
| `check:route-guard-membership`    | Minden olyan útvonalat, amely gyermekfolyamatot hoz létre, `isLocalOnlyPath()` (Hard Rules #15/#17) osztályoz.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Igen                                      |
| `check:test-discovery`            | A repóban lévő minden `*.test.ts` / `*.spec.ts` fájlt legalább egy tesztfutó gyűjt össze (racsnis: `test-discovery-baseline.json` árva listája csak csökkenhet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                      |
| `check:test-tla-order`            | `tests/unit` alatt egyetlen `node:test` fájl sem regisztrál tesztet, eltalálja a legfelső szintű `await`, majd többet regisztrál (#18045; racsnis: `test-tla-order-allowlist.json` csak zsugorodhat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Igen                                      |
| `check:agent-skills-sync`         | A generált ügynöki készségek műtermékei megegyeznek a forráskatalógusukkal (nincs eltolódás)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | A logos/assets szolgáltató rögzített származási bejegyzéssel rendelkezik                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | JSON konfigurációs fájlok elemzik és megfelelnek a repo lint szabályoknak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | TypeScript összeállítás hibák nélkül (csak figyelmeztetés)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Igen                                      |
| `typecheck:noimplicit:core`       | Szigorú `noImplicitAny` — előretekintő; sok már létező hívóoldalnak még mindig szüksége van megjegyzésekre                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | **Tanácsadó** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` hatóköre `src/app/(dashboard)/**` (#7033) — `typecheck:core` kurált, 27 fájlból álló engedélyezési listája nem tartalmaz semmilyen irányítópult TSX, és `next build` sem típusellenőrzi azt (`next.config.mjs` beállítja `ignoreBuildErrors: true`), így az ott található árva azonosító regressziók (#6625/#6909CI számára) láthatatlanok voltak. Eltér a befagyott per-file/per-TS-code számlálási alapvonaltól (`config/quality/dashboard-typecheck-baseline.json`, ugyanaz az elavult érvényesítési minta, mint `check:known-symbols`) Csak — Az alapvonalon túli NEW hibák nem teljesítik a kaput; racsnis le `--update` rel, ha egy már meglévő hibát javítottak.                                                                                                                                                                                                                                                                                                                                     | Igen                                      |
| `check:build-typecheck`           | A teljes alkalmazás gyártási típusának ellenőrzése `tsconfig.build.json` (`src`, `open-sse`, `packages`, `bin`, `scripts`, `electron/**/*.d.ts`), a felületi `typecheck:core` 27 fájlból álló engedélyezési listája és a műszerfali kapu nem fedi le. Különbségek `config/quality/build-typecheck-baseline.json` ellen; egy új vagy emelt per(fájl, kód) számláló meghiúsul, az alacsonyabb számláló racsnit kér. `--update` visszautasítja, amíg a futás új vagy emelt párt tartalmaz, kivéve, ha `--force-regressions` átadásra kerül, és visszautasítja az újonnan elnémított fájlt, hacsak nem adják át `--force-nocheck`, így az alapvonal kiszélesítése a zöld eléréséhez és az állandó csend megadása két külön szándékos cselekedet. A csupasz `--force` elutasításra kerül. Szintén ellenőrzi a `@ts-nocheck` összeépítési hatókörét `config/quality/ts-nocheck-baseline.json` ellen, mert az ezt használó fájl egyáltalán nem jelent diagnosztikát, és egyébként láthatatlan lenne minden kapu számára. | Igen                                      |

#### Két típusellenőrző program eltérően válaszol

`typecheck:core` (`noImplicitAny: false`) / `typecheck:noimplicit:core` (`noImplicitAny: true`) és `check:build-typecheck` különböző opciókkal különböző programokat fordít le, és ugyanaz a fájl lehet az egyikben tiszta, a másikban tele hibákkal.

`tsconfig.build.json` beállítja `"strict": false`, tehát `noImplicitAny` ki van kapcsolva. Az alapkonfiguráció összeállít egy kurált, 27 fájlból álló engedélyezési listát szigorúbb beállításokkal, és követi az egyes bejegyzések importálási grafikonját, így a build programban soha nem megjelenő fájlok továbbra is ott ellenőrzik.

A következmény számít annak megítélésekor, hogy egy fájl be van-e írva:**a nulla diagnosztika `check:build-typecheck` alatt nem jelent nullát** . `@ts-nocheck` eltávolítása 26 fájlból 23 fájlt tisztanak mutatott a build programban; ezek közül tizenhat körülbelül 120 implicit hibát talált a szigorúnál. Ellenőrizze mindkettőt, mielőtt tiszta fájlt hívna.

### Munkakör: `quality-gate`

`test-coverage` után fut. A blokkok összeolvadnak hiba esetén.

| Forgatókönyv                 | Érvényesíti                                                                                                                                                     | Blokkolás              |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | `quality-metrics.json` bocsát ki (ESLint figyelmeztetések száma, lefedettség az egyesített szilánkos jelentésből)                                               | Igen (a racsnis előtt) |
| `quality:ratchet`            | `quality-baseline.json` egyes mutatói nem változtak vissza (ESLint figyelmeztetések ≤ alapvonal; lefedettség ≥ alapvonal)                                       | Igen                   |
| `check:duplication`          | A kódduplikáció (jscpd@4) nem haladja meg `quality-baseline.json` alapértékét                                                                                   | Igen                   |
| `check:complexity`           | A fájlszintű ciklomatikus komplexitás nem haladja meg a felső határt (mag ESLint `complexity` + `max-lines-per-function`)                                       | Igen                   |
| `check:cognitive-complexity` | Kognitív komplexitás racsnis (`eslint-plugin-sonarjs`) — különálló ESLint pass; CI mindkettőt egyetlen `check:complexity-ratchets` lépésként egyesítve futtatja | Igen                   |
| `check:dead-code`            | A fel nem használt exportok / fájlok racsnis (knip) nem lép vissza az alapvonalhoz képest                                                                       | Igen                   |
| `check:compression-budget`   | A kompressziós referencia-költségvetési — motoronkénti jogkivonat-megtakarítási szintjei nem csökkenhetnek vissza                                               | Igen                   |
| `check:type-coverage`        | A százalékos típusú racsnis (`type-coverage`) nem regresál; nagyrészt magában foglalja `typecheck:noimplicit:core`                                              | Igen                   |

### Munkakör: `codeql-scan` és `codeql-admission`

`codeql-scan` az összes konfigurált elemzési kategóriát elkészíti. Miután ez a feladat sikeres, `codeql-admission` ellenőrzi a pontos feltöltéseket és a jelölt riasztási racsnit. Mindkettő `Gate / CI` kötelező függősége, beleértve a csak dokumentumokhoz használható jelölteket is. Az adminisztratív aktiválási és kanári követelmények leírása a "CodeQL racsnis" alatt található.

| Forgatókönyv           | Érvényesíti                                                                                                                                                                                                             | Blokkolás |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:codeql-ratchet` | A jelölt ref/SHA és az összes konfigurált elemzési kategóriának aktuálisnak kell lennie a riasztási racsnis előtt; hiányzó bizonyítékblokkok. A globális készlet különálló marad. — lásd alább a „CodeQL racsnis” részt | Igen      |

### Munkakör: `quality-extended`

Az állás blokkolja a megfelelő jelölteket. A köteg méretét, a titkos megállapításokat, a sebezhetőségi megállapításokat, a munkafolyamat-megállapításokat és OpenAPI módosításokat a szükséges racsnikkal ellenőrzik. A körkörös függőségi diagnosztika továbbra is tanácsadó jellegű. Szkenner telepítése szükséges: `scripts/ci/install-quality-scanners.sh` rögzíti a rögzített verziókat, és továbbítja a telepítési hibákat. Hiányzó eszközök, érvénytelen jelentések vagy hiányzó alapvonalak elhagyják a szükséges szkenner kaput INCOMPLETE.

| Forgatókönyv             | Érvényesíti                                                                                                                                                                                                                                     | Blokkolás                                            |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `check:circular-deps`    | Nincsenek körkörös függőségek (dpdm)                                                                                                                                                                                                            | **Tanácsadó**                                        |
| `check:bundle-size`      | A köteg mérete nem haladja meg a kupakot; egy nem elérhető mérés sikertelen                                                                                                                                                                     | **Blokkolás --ratchet**                              |
| `check:secrets`          | A Gitleaks megállapításai nem enyhülnek; a szükséges vizsgálatok elutasítják a hiányzó tools/source/baseline, a sikertelen vizsgálatokat és az érvénytelen jelentéseket                                                                         | **Blokkolás --ratchet**                              |
| `check:vuln-ratchet`     | A függőségi sérülékenységek nem enyhülnek; a szükséges vizsgálatok elutasítják a hiányzó eszközöket, az érvénytelen jelentéseket vagy a hiányzó alapvonalakat                                                                                   | **Blokkolás --ratchet**                              |
| `check:workflows`        | Munkafolyamat-szösz (actionlint + zizmor); missing/broken szkennerek, az érvénytelen jelentések vagy a hiányzó racsnis alapvonal INCOMPLETE ként működnek. Az érvényes megállapítások követik a kiválasztott strict/advisory/ratchet irányelvet | Végrehajtás szükséges; zizmor racsnis blokkolás a CI |
| `check:openapi-breaking` | Nyilvános API szerződés rögzített esemény-commit ellen (PR összevonás-alap, előreküldés, összevonás-csoport-alap; scheduled/manual checkout első szülő); a szükséges mérés sikertelen lezárva                                                   | **Blokkolás --ratchet**                              |

### Munkakör: `docs-sync-strict`

`main` vagy `release/**` felé irányuló lehívási kérelmek esetén ez a feladat csak a nem vázlatos (vagy megbízható sor) jelölteknél fut, amelyek dokumentációnak vagy kódmódosításnak minősülnek. Nem PR CI eseményeken is fut; ez a munkafolyamat push trigger csak `main` vonatkozik, `release/**` nem. A nem nullától eltérő lépés blokkolja a feladatot; csak jelentésre vonatkozó megállapítások és alább dokumentált mentességek nem.

| Forgatókönyv                   | Érvényesíti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Blokkolás                                                                                                                                                |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-kapu, amely az alábbi 7 alkaput szekvenciálisan futtatja                                                                                                                                                                                                                                                                                                                                                                                                                                | Igen                                                                                                                                                     |
| ↳ `check:docs-sync`            | Package/OpenAPI/CHANGELOG verzió konzisztenciája, pontos `llm.txt` tükrök, lefordított CHANGELOG section/size invariánsok és a felülírt duplikált dokumentumok hiánya                                                                                                                                                                                                                                                                                                                        | Igen                                                                                                                                                     |
| ↳ `check:docs-frontmatter`     | Az összeállított dokumentációs oldalakon érvényes frontmatter címek vannak                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                                                                                                                                     |
| ↳ `check:docs-counts`          | A magas megbízhatóságú invariánsok szigorúak; A heurisztikus fájlszám-ellenőrzések csak akkor figyelmeztetnek, ha a szkript nem kap `--strict` (a CI metakapu nem adja át)                                                                                                                                                                                                                                                                                                                   | Szigorú blokkolás; lágy szintű tanácsadó                                                                                                                 |
| ↳ `check:env-doc-sync`         | A forrás env olvassa, `.env.example` és `docs/reference/ENVIRONMENT.md` megegyezik az explicit figyelmen kívül hagyó, csak doc és csak env engedélyezési listák után                                                                                                                                                                                                                                                                                                                         | Igen, a dokumentált engedélyezési listákon kívül                                                                                                         |
| ↳ `check:deprecated-versions`  | Jelenti a lehetséges elavult verziókat a biztonságos történelmi kontextusokon és az elavult frissítési dátumokon kívül, kivéve a figyelmen kívül hagyott dokumentumokat                                                                                                                                                                                                                                                                                                                      | Tanácsadó a jelenlegi CI vezetékezéssel kapcsolatban (`--strict` nincs átadva)                                                                           |
| ↳ `check:doc-links`            | A dokumentumok belső leértékelési hivatkozásai valódi fájlokat eredményeznek (`[text]`/`(path)` űrlap)                                                                                                                                                                                                                                                                                                                                                                                       | Igen                                                                                                                                                     |
| ↳ `check:fabricated-docs`      | A dokumentumokban hivatkozott útvonalak, env vars, CLI parancsok, hook-nevek és fájl elérési utak léteznek a kódbázisban. Kemény kapu `--strict` keresztül ; soft-fail zászló nélkül.                                                                                                                                                                                                                                                                                                        | Igen ( `--strict` keresztül CI)                                                                                                                          |
| `check:cli-i18n`               | A használt CLI `t()` kulcsok léteznek a `en` ben; `pt-BR` megtart minden felső szintű részt; `zh-CN` és `zh-TW` tartalmazza `en` összes kulcsát                                                                                                                                                                                                                                                                                                                                              | Igen                                                                                                                                                     |
| `check:openapi-coverage`       | OpenAPI specifikáció a valódi útvonalak legalább egy racsnis szintjét lefedi                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen                                                                                                                                                     |
| `check:openapi-security-tiers` | A deklarált `x-loopback-only`/`x-always-protected` megjegyzéseket `routeGuard.ts` nek kell alátámasztania; elemző és továbbítási eltérések blokkja. A csak helyi előtagok hiányzó `x-loopback-only` jének fordított ellenőrzése figyelmeztet, és a csak mintázatú útvonalak kizárásra kerülnek ebből a fordított átadásból.                                                                                                                                                                  | Parser/forward ellenőrzi a blokkolást; fordított ellenőrzési tanács                                                                                      |
| `check:openapi-routes`         | Minden `/api...` útvonal `openapi.yaml` -ben paraméterérzékenyen oldja fel a valódi útvonalat az indokolt `KNOWN_STALE_SPEC` engedélyezési lista után; az elavult engedélyezési lista bejegyzései is sikertelenek                                                                                                                                                                                                                                                                            | Igen                                                                                                                                                     |
| `check:docs-symbols`           | A belső `/api/...` URL hivatkozások a kanonikus nem tükördokumentumokban valós útvonalra vagy útvonalcsaládra oldanak fel; proxy/upstream/placeholder/file hivatkozások és az indokolt `KNOWN_STALE_DOC_REFS` bejegyzések ki vannak zárva, és az elavult engedélyezési lista bejegyzései sikertelenek                                                                                                                                                                                        | Igen                                                                                                                                                     |
| `i18n translation drift`       | Az abszolút engedélyezéshez nulla forrás, hiányzó cél, célkivonat, elavult fordítás és szakasz-gyorsítótár inkonzisztenciák szükségesek. A közönséges PR előkészítés megőrizheti a pontos öröklött bizonyítékokat vagy a csak angol nyelvű függőben lévő változtatást változatlan teljes állapottal és célbájtokkal; beszámolója külön kijelenti az összevonási készenlétet. Hiányzó célkivonat és hiányos alapbizonyíték-blokk. Az örökölt szakasz gyorsítótárának hiánya nem jelent hibát. | Mind az öt osztály blokkolja queue/base felvételét; rendes felkészítés csak bizonyítottan örökölt vagy csak angol nyelvű függőben lévő munkát engedélyez |

A tizenkét README SVGs `docs/diagrams/` alatt jön létre (`scripts/docs/gen-readme-<name>.mjs`; `npm run docs:readme-diagrams` mindegyiket regenerálja). Mindegyik rendelkezik egy bájt-összehasonlítási egységteszttel (`tests/unit/docs/readme-*-svg.test.ts`, `test-unit` feladat), amely sikertelen, ha a véglegesített fájl elavult, és `check:docs-counts` beolvassa a kanonikus számokat a — `<text>`, ezért a felvázolási lépés a fájl minden felvázolt karakterláncát láthatatlan `<text>` ként tartja meg. A SVG kanonikus számok ellenőrzése beolvassa a `SVG_DIAGRAM_FILES` -ben felsorolt fájlokat (`scripts/check/check-docs-counts-sync.mjs`): `docs/diagrams/readme-hero.svg`, `free-tier-budget.svg`, `promise-pillars.svg`, `comparison-table.svg`, `cli-terminal.svg`, `tier-cascade.svg`, valamint `public/images/tier-flow-dark.svg` és `tier-flow-light.svg`; a szabad örökkévalóság, a katalógus-bejegyzés, az ismétlődő gyűjtemény és a pontozási faktorok állításai `promise-pillars.svg`, `free-tier-budget.svg` és `strategies-grid.svg` feliratokat is tartalmazzák. `free-tier-budget.svg` az élő katalógusbetöltőből meríti a számadatokat, így `FREE_MODEL_BUDGETS` vagy a szolgáltató megjelenített nevének módosítása CI pirossá teszi, amíg a fájl újra nem jön létre.

### Munkakör: `i18n-ui-coverage`

| Forgatókönyv                      | Érvényesíti                                                                                                                                                                                                   | Blokkolás     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (inline) | UI i18n kulcs lefedettsége a ≥ 65%-a                                                                                                                                                                          | Igen          |
| `check-ui-value-drift` (inline)   | Egy átírt angol **érték** nem hagy maga után elavult fordítást                                                                                                                                                | Igen          |
| `check-new-key-coverage` (inline) | A **új** Az angol kulcsot minden nyelvi — ban lefordítják, a `__MISSING__:` markert elutasítják                                                                                                               | Igen          |
| `check-translation-ratio`         | A nyelvi nyelvenkénti valós fordítási arány (az angollal azonos / helyőrző / hiányzó levelek az engedélyezési listán kívül) nem haladhatja meg `config/quality/i18n-translation-baseline.json` + laza értéket | **Blokkolás** |

`fetch-depth: 0` van szüksége. —, az érték-drift-kapu megkülönbözteti `en.json` az egyesítési bázistól.

#### `check-ui-value-drift` — elavult fordítási kapu

Elkapja azt az i18n regressziót, amelyet a többi kapu szerkezetileg nem lát: egy angol érték átírásra kerül, és az _korábbi_ angolból származó fordítások hátramaradnak, így a nem angol felhasználók továbbra is magabiztosan megfogalmazott, most hibás példányt olvasnak.

Ezt valóban szállították. `oauthModal.googleOAuthWarning` átírásra került, amikor a Antigravity bejelentkezési segéd leszállt (#5203);**39/43 terület** folyamatosan szöveg, amely azt mondta a kezelőknek, hogy "másolják ki a teljes URL, és illesszák be alább" — olyan folyamatot, amely nem fejezhető be az adott szolgáltatónál. #8463 ig észrevétlen maradt, mert:

- `sync-ui-keys` csak azokat a kulcsokat tölti ki, amelyek vannak **hiányzó** , soha olyanokat, amelyek azok **állott** ;
- `check-ui-keys-coverage` a kulcs _jelenlétet_ számítja, így az elavult fordítás lefedettnek minősül;
- `check-translation-drift` követi a `docs/i18n/<locale>/**.md` dokumentációját, amely tükrözi — soha nem olvassa be `src/i18n/messages/*.json`. A 2026-2009-es újraszinkronizálás óta blokkolja `docs-sync-strict` jobot: szerkesztsen egy alapdokumentumot → `npm run i18n:run -- --files=<doc>` (szakaszszintű, olcsó).

**Diff-tudatos, nem alapvonal-támogatással.** Összehasonlítja `en.json` az egyesítési bázison a munkafával; minden olyan kulcsnál, amelynek angol értéke megváltozott, minden olyan területi beállítás, amely érintetlen fordítást tartalmaz, elavult. Ezt szándékosan **befagyasztja a már meglévő adósságot** — a diff nem tudja feltárni, hogy egy régóta létező fordítás melyik régi angolból származott, így a kapu csak azt ítéli meg, hogy a jelenlegi változás mit érint. Az alternatíva (a kulcsonkénti kivonat alapvonala) egy ~ 600 KB generált fájlba kerülne, amely 3 × a legnagyobb létező alapvonal, amely minden i18n PR en kavar.

Kétféleképpen lehet kielégíteni:

1. frissítse az érintett fordításokat, vagy
2. állítsa be őket `__MISSING__:<new english>` ra. — a futási környezet, majd kiszolgálja a javított angol nyelvet (`src/i18n/request.ts::deepMergeFallback`, #7258) és a kulcssorokat a fordításhoz.

Ha a húr **jelentése** megváltozott, inkább **a kulcs átnevezése** : egy új kulcs nem örökölheti az elavult fordítást. Ez a #8463 minta.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Az értéksodródás és az új kulcsos kapuk egy megváltoztathatatlan összehasonlításban vannak `scripts/i18n/resolve-ui-diff-base.mjs` val. A munkafolyamat ugyanazt az alap-, alap-tipp- és jelölt SHAs adja át mindkét ellenőrzésnek. PR/base-retarget, a push és a merge-group futtatások az eseménykörnyezetüket használják. Egy jelölt ág elküldéséhez pontos nyitott PR vagy explicit `i18n_base_sha` bemenet szükséges. `main` vagy `release/vX.Y.Z` feladása vagy ütemezett megfigyelése e bemenet nélkül összehasonlítja az utolsó véglegesítést az első szülővel; ez nem az összes örökölt fordítási adósság ellenőrzése. A helyi híváshoz explicit összehasonlítási alapra van szükség, például a fenti `BASE_REF` parancsra.

Hiányzó vagy félreérthető összehasonlítási kontextus, olvashatatlan vagy érvénytelen kötelező katalógus és egy megváltozott jelölt `INCOMPLETE` kilépési kóddal **2** , beleértve a figyelmeztető módot is. A katalógus olvasása `scripts/i18n/read-ui-catalog.mjs` használja; az olvasási hibákat nem helyettesítik üres objektumokkal. Sem a nem elérhető alap, sem a hiányos bemenet nem hozza létre PASS.

### Munkakör: `i18n`

Teljes i18n érvényesítési mátrix (helyszínenként egy feladat). Az egész munkakör tanácsadó jellegű.

| Forgatókönyv                    | Érvényesíti                                        | Blokkolás                                                  |
| ------------------------------- | -------------------------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | A fordítás teljessége területi beállítások szerint | **Tanácsadó** (`continue-on-error: true` az egész munkára) |

### Munkakör: `pr-test-policy`

Csak lekérésre fut.

| Forgatókönyv           | Érvényesíti                                                                                                                                               | Blokkolás |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/` vagy `bin/` gyártási kódját módosító PRs knak tartalmazniuk kell vagy frissíteniük kell a teszteket ( #8 kemény szabály) | Igen      |
| `check:test-masking`   | A módosított tesztfájlok nem csökkentik a nettó állítások számát, és nem adnak hozzá `assert.ok(true)` tautológiákat                                      | Igen      |
| `check:pr-evidence`    | PR szervezet test/VPS bizonyítékait idézi a változásra (mechanizálja a Hard Rule #18 azáltal, hogy PR prózát — törékenynek tekinti, lásd a hátralékot)    | Igen      |

### Munkakör: `test-vitest`

Szüksége van a `changes` osztályozási feladatra. Az alkalmazható mátrixszilánkok blokk egyesítése hiba esetén.

| Kíséret          | Érvényesíti                                                      | Blokkolás                                                                                                                   |
| ---------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP szerver (110 eszköz), autoCombo, gyorsítótár — vitest runner | Igen                                                                                                                        |
| `test:vitest:ui` | UI komponens teszteli a — vitest futót                           | **Blokkolás** — már meglévő hibák kifejezetten ki vannak zárva `vitest.config.ts` ben; az új kudarcok tönkreteszik a munkát |

### Éjszakai munkafolyamatok (ütemezett, tanácsadó)

Ezek cron ütemezéssel (és `workflow_dispatch`) futnak, PRs n soha. Mindegyik tanácsadó jellegű.

| Munkafolyamat          | Érvényesíti                                                                                                                                                             | Blokkolás     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `nightly-property`     | gyorsellenőrzési tulajdonságtesztek véletlenszerű mag + magas futási számmal                                                                                            | **Tanácsadó** |
| `nightly-resilience`   | halom-növekedés kapu, káoszhiba-injekció, k6 load/soak                                                                                                                  | **Tanácsadó** |
| `nightly-llm-security` | promptfoo befecskendezési védő (blokk üzemmód) + garak szondák (szolgáltatói titok nélkül átugorva)                                                                     | **Tanácsadó** |
| `nightly-schemathesis` | OpenAPI szerződés-fuzzing (sématézis) egy élő OmniRoute vel szemben `docs/openapi.yaml` — felületek specifikációinak megsértése / kezeletlen 500-asok (8 B.4-es verzió) | **Tanácsadó** |
| `nightly-mutation`     | A Stryker mutációtesztelési pontszáma a gyors egységsávon — túlélő mutánsok felszínén gyenge állítások                                                                  | **Tanácsadó** |
| `nightly-compat`       | Node motor kompatibilitási mátrix a támogatott `engines.node` tartományokban                                                                                            | **Tanácsadó** |

A teljesítmény alapvonalait (kupac, TTFB, felépítési idő) rögzítik, nem kapuzzák: lásd [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

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
- **tájékoztató** — a globális összesített érték a rögzített alapértékhez képest. Az örökölt eltérés
  soha nem buktat el egy vétlen PR-t; az eltérést nyomon követik, hogy a kiadási egyeztetéskor
  kijavítsák, és a tartalékkapacitást figyelő feladat is ellenőrzi.

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

### CodeQL racsnis: jelölt felvételi és adattári leltár

CI egy kifejezett függőségi láncon keresztül birtokolja a jelölt CodeQL felvételt: `codeql-scan` meghívja a négynyelvű mátrixot `codeql.yml` ben, majd `codeql-admission` futtatja `node scripts/check/check-codeql-ratchet.mjs --candidate`. `Gate / CI` mindkét eredményt igényli. A minőség megtartja saját numerikus ellenőrzéseit, de nem kérdez le a szkennertől, mielőtt a gyártó befejezné; `Gate / Quality` önmagában nem jelenti a teljes jelöltfelvételt. CodeQL továbbra is kötelező a csak dokumentumokat használó jelölteknél.

A `config/quality/codeql-admission-policy.json` házirendje a Műveletek, C/C++, JavaScript/TypeScript és a Python, a lekérdezési csomag alapértelmezett beállítását, a távoli fenyegetési modellt és az összeépítési módot választja ki. A gyártó előzetes ellenőrzése elutasítja a függőben lévő aktiválási rekordot, és az explicit céllistán kívülre ágazik. A jelenlegi célok a fő, és release/v3.8.54. szerződés tesztjei ezt a véges listát és a karbantartási push triggert hasonlítják össze a csomag verziójával; a következő kiadásnál felül kell vizsgálni a bevezetést. CI meglévő, szélesebb kiadású PR triggere megmarad, de egy nem beépített célpont a kivonatolás előtt jelenti HOLD nem pedig a nem mért PASS beszerzését.

Minden mátrixfeladat rögzíti a tényleges SARIF -feltöltési ID, a nyelvet, a kategóriát, a futtatást és a kísérletet, a hívó munkafolyamat-azonosítóját, az esemény ref/head/base/merge SHA és a házirend-kivonatot. A függő feladat csak ennek a futásnak a nyugtáit tölti le, és ellenőrzi a műtermék-kivonatokat. Mind a négy kategóriára, egy sikeres producerre és minden pontos feltöltés befejezett feldolgozására van szükség. A API sarif_id szűrőjét használja, nem az ágon található legújabb elemzést. A részleges megismétlések újra felhasználhatják ugyanazon indulás és jelölt korábbi kísérleteinek sikeres kategóriáit, megőrizve az előállítási kísérletet; egy bukott jelenlegi gyártó nem használhatja fel újra a korábbi zöld bizonyítékokat.

A CodeQL művelet feldolgozásra vár, de rögzített megvalósítása figyelmeztethet és folytatódhat az állapotolvasási hiba vagy a kimerült várakozás után. A felvétel tehát ismét ellenőrzi a feldolgozást. Hiányzó kategóriák, függőben lévő feldolgozás, meghiúsult vagy törölt feladatok, elavult identitás, hiányos oldalszámozás vagy nem elérhető APIs HOLD eredményez, és kilép 2. Nem marad fix várakozás a független szkenner munkafolyamatára. A nem vizsgált PR nem felel meg, mert egy riasztási lekérdezés 0-t adott vissza. `metrics.codeqlAlerts.value` feletti mért szám 1-et hagy ki; az alapvonal nincs megemelve, hogy elnyelje egy másik fiók riasztásait. [Feltöltési állapot és elemzési keresés](https://docs.github.com/en/rest/code-scanning/code-scanning).

A nyugta rögzíti IDs feltöltést és elemzést, a kategóriákat, a szerszámverziókat, ref/SHA, az alapvonalat és a riasztási számokat. SARIF identity/result száma, a minimális szabályszámok és a pontos riasztási példányok továbbra is kötelezőek. PR/analysis identitásokat újraellenőrzik az elfogadás előtt. Ezek az ellenőrzések konfigurált kategórialefedettséget állapítanak meg, nem pedig minden kibontott forrásfájl leltárát. C/C++ no-build kibontás nem tartalmazza a projektfelépítés során generált kódot. A forráskizárásokat továbbra is felül kell vizsgálni, a közreműködők hozzárendeléséhez pedig összehasonlítható, pontos alapú bizonyítékra van szükség.

`codeql-maintenance.yml` aktív kiadású push vizsgálatokat és heti ütemezést biztosít PR/main gyártók megkettőzése nélkül. `nightly-codeql-inventory.yml` elkülönítve tartja az adattár egészére kiterjedő alapvonalat, `--strict-measurement` vel és a meghibásodással, ha a mérés nem érhető el. A helyi hagyatékgyűjtő kecses kihagyása nem jelölt felvétel. A meghúzás explicit `--update` marad az igazolt alacsonyabb globális szám után.

A Speciális munkafolyamatot nem szabad közzétenni, amíg az Alapértelmezett beállítás konfigurálva van: GitHub elutasítja ezt a kombinációt. Verziózott házirendje függőben marad mindaddig, amíg a felülvizsgált adminisztratív átmenetet vissza nem olvassák. A közzététel előtt egy operátor rögzíti a tárolót, head/base/tree, policy/patch/rollback kivonatokat és a megfigyelt beállítási állapotot; `node scripts/quality/codeql-producer.mjs verify-admin-readback` ellenőrzi a várt és tényleges JSON rekordokat. Ez egy műszaki védelem, nem a kezelő jóváhagyása vagy a friss visszaolvasások lekérésének helyettesítője. A PR token soha nem kér rendszergazdai hozzáférést. A közzététel és a szkenner bármilyen módosítása külön visszaolvasást, valamint valódi PR, elágazást és egyesítési csoportos kompatibilitási bizonyítékot igényel.

A Forks hosztolt futtatókat, megőrzött hitelesítő adatok nélküli fizetést használ, nincs install/build projekt a producerben és nem örökölt adattártitkokat. GitHub támogatja SARIF feltöltést a pull_request eseményhez a csökkentett fork tokenjével; az első alkalommal történő hozzájárulás végrehajtásának jóváhagyása továbbra is GitHub szabályzata marad. Soha ne használja a pull_request_target parancsot nem megbízható kód futtatására. Erősítse meg a tényleges jogkivonat-engedélyeket, az elemzési_kulcsot és az összes kategóriakörnyezetet a felügyelt kanáriban, mielőtt az áttelepítést befejezettnek tekintené. [Fork feltöltési szabályok](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/resource-not-accessible), [ütköző beállítási módok](https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors/two-codeql-workflows).

**Az elbocsátás a kezelő hívása ( #14 kemény szabály)** — soha nem utasít el CodeQL riasztást anélkül, hogy a technikai indoklást rögzítené az elutasítási megjegyzésben: `won't fix` az upstream protokoll követelményeihez, `used in tests` egy tesztberendezéshez, `false positive` egy fertőtlenítőhöz CodeQL nem látja (előzmény: `docs/security/ERROR_SANITIZATION.md`).

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
2. Adja hozzá a `"check:<name>": "node scripts/check/check-<name>.mjs"` bejegyzést a `package.json` fájlhoz, és
   szinkronizálja az aliast és annak pontos parancsát a `config/quality/gate-manifest.json` fájlban.
   Alkalmazza ugyanezt a szinkronizálást egy meglévő ellenőrzési alias módosításakor vagy eltávolításakor.
   Futtassa az `npm run check:gate-manifest` parancsot; a pre-commit hook és a CI módosításbesorolása
   kikényszeríti ezt a szerződést.
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

**Fent szintén nem dokumentált** (tájékoztató, csekély jelértékű): a `docs-lint` feladat (markdownlint + Vale, teljes feladat `continue-on-error` beállítással) és az önálló `semgrep.yml` / `scorecard.yml` szkenner-workflow-k. A CodeQL most kötelező termelői és befogadási feladatokat használ a `Gate / CI` alatt, a fent ismertetett aktiválási követelmények mellett. A `semgrepFindings: 0` szerepel a `quality-baseline.json` fájlban, de nincs blokkoló ratchethez kötve a `ci.yml` fájlban — a metrika jelenleg árva.

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
- `check:pr-evidence` (blokkoló, grep segítségével vizsgálja a PR-törzs prózáját) — magas a hamis pozitív találatok kockázata; eltávolítása gyengítené a #18. szigorú szabály kikényszerítését, ezért ez valódi szabályzati döntés.
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
