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

A CI és a Quality Gates munkafolyamat egyaránt stabil eredményt ad: `Gate / CI` és
`Gate / Quality`. A verziózott befogadási szabályzatuk minden felsőbb szintű feladatot
kötelezőként vagy tanácsadó jellegűként sorol fel. Minden alkalmazandó kötelező feladatnak
sikeresnek kell lennie: a hiányzó, megszakított, kihagyott, függőben lévő és ismeretlen
eredmények nem alapozhatják meg a PASS állapotot. Egy érvényes, csak dokumentációt vagy
csak katalógust érintő besorolás alkalmazhatatlanná teheti a kódellenőrzési sávot;
a piszkozat állapotú PR nem elfogadott jelölt. A `hotfix` címke nem teszi mellőzhetővé
a bizonyítékokat.

Mindkét munkafolyamat lefedi a main/release ágakba irányuló PR-eket, a `main` ágba történő
pushokat, a kézi indítást és a merge-group eseményeket. A push, a kézi indítás és a
merge-group a teljes kiválasztást futtatja. A `release/**` ágba történő pushok nem indítják
el ezeket (2026-10-18): minden módosítás már lefuttatta a mátrixot a saját PR-jében,
az összevont kombináció pedig a Release-Green feladata (`docs/ops/RUNNER_BOX.md` → Hosted sáv).
A forkok és a merge groupok hosztolt futtatókat használnak azokhoz a feladatokhoz,
amelyek egyébként saját üzemeltetésű futtatókat választanának; a bevezetés előtt
ellenőrizni kell a megfelelő hosztolt kapacitást.

Minden JSON-nyugta azonosítja a checkoutolt SHA-t, a munkafolyamat futását és a kísérletet.
A CLI elutasítja, ha a checkout és az esemény SHA-ja eltér. A munkafolyamat-tesztek a
szabályzatbeli tagságot az eredményfeladat `needs` listájához kötik, így egy új vagy
eltávolított sáv nem tűnhet el észrevétlenül. A nyugták a saját munkafolyamatukra vonatkoznak, nem pedig a közzétételre, a telepítésre vagy egy meglévő tanácsadó jellegű vizsgáló belső működésére. Az alkalmazandó ellenőrzések kötelezővé tétele az ágszabályokban külön adminisztratív módosítás; a feladataik meghatározása önmagában nem védi az ágat.

Az `API Route Typecheck` egy független munkafolyamat-ellenőrzés, amely kívül esik mindkét összesített eredményen és a helyi teljes megfigyelő statikus profilján. Az eredményét külön vizsgálja meg az adott jelölthöz. A `.github/workflows/api-route-typecheck.yml` a `main` vagy `release/**` ágra irányuló PR-ek, az e két ágcsalád valamelyikére történő pushok, valamint kézi indítás esetén fut le. Nem rendelkezik útvonalszűrővel. A PR célágának módosítása új ellenőrzést kér; a törzs vagy a cím szerkesztése a csak megfigyelésre szolgáló `Admission not requested / API Route Typecheck` nevet használja, és nem helyettesítheti a befogadási ellenőrzést. A munkafolyamat nem deklarál összevonásicsoport-triggert. Minden olyan összevonási sor bevezetése előtt, amely megköveteli ezt az ellenőrzést, először biztosítani kell, hogy az ellenőrzés az adott eseménynél is lefusson.

### UI-végrehajtási kapacitás

A CI a teljes UI-készletet négy `test-vitest` mátrixszilánkként futtatja, szilánkonként
legfeljebb két workerrel és a meglévő 15 perces feladathatáridővel. Az első szilánk
az MCP/autoCombo Vitest tesztkészletet is futtatja. A kötelező feladat eredménye minden
mátrixágat lefed; egyetlen szilánk hibája vagy megszakítása esetén sem állapítható meg
a jelölt befogadása.

Az éjszakai megfigyelő minden UI-szilánkhoz külön, a pontos jelölthöz tartozó nyugtát őriz
meg, beleértve az MCP végrehajtását az első nyugtában. Mind a négy nyugta, a naplók és az
egyező végrehajtási identitások szükségesek. A helyi `npm run test:vitest:ui` továbbra is
a teljes tesztkészletet választja ki; egyetlen `--shard` futtatás csak részleges bizonyíték.

### Egységteszt-lefedettség gyűjtése

A tizenkét egységteszt-szilánk a meglévő tesztvégrehajtása során gyűjti a V8-lefedettséget.
A sikeres szilánk a `scripts/ci/compact-v8-coverage.mjs` futtatásával tömöríti az eredeti
fájlokat köztes Istanbul-jelentés létrehozása nélkül. A végső Coverage feladat mind a
tizenkét jegyzéket ellenőrzi a jelölt SHA-ja, a futtatókörnyezet, a forrásgyökér és az
adatkivonatok alapján, majd futtatja a c8 jelentéskészítőit és a meglévő lefedettségi
küszöbértékeket. A bemenetek megőrzik a c8 globális fájlnévsorrendjét; a szilánkonkénti
előzetes összevonás nem biztonságos vegyes függvény-/blokklefedettség esetén. A hiányzó,
hibás formátumú vagy inkompatibilis szilánkok meghiúsítják a befogadást. A sikertelen
tesztszilánkok nyers diagnosztikai lefedettségét külön őrzik meg; ez nem kerülhet be
a végső összevonásba.

### Az egységtesztek végrehajtási előrehaladásának nyugtái

A megosztott `test:unit:ci:shard` parancs a `primary`, `dashboard` és `serial`
fázisokat a `scripts/ci/unit-progress-reporter.mjs` segítségével rögzíti. A szokásos tesztjelentés
továbbra is elérhető. Egy külön, kizárólag metaadatokat tartalmazó nyugta rögzíti az egyes fájlok feldolgozásának kezdetét és befejezését,
egy 30 másodpercenkénti állapotjelzés pedig felsorolja a még aktív fájlokat és az eltelt idejüket. A rendszer
csak az engedélyezési listán szereplő végrehajtási metaadatokat rögzíti; a tesztleírásokat, a kimenetet, a hibák törzsét és a teljes
környezetet nem szerializálja.

A CI és a Quality a JSONL-fájlokat `unit-progress-ci-<run>-<attempt>-<shard>`, illetve
`unit-progress-quality-<run>-<attempt>-<shard>` néven őrzi meg. A feladat időtúllépése megakadályozhatja a későbbi feltöltést;
a már kibocsátott állapotjelzések továbbra is diagnosztikai bizonyítékként szolgálnak. Az állapotjelzések hiánya
blokkolt vagy leállított futtatófolyamatra is utalhat. Ezek a nyugták megőrzik a meglévő tesztkiválasztást,
párhuzamosságot, határidőket és kilépési állapotot; nem minősülnek a jelöltek elfogadásáról szóló döntésnek.

### Megőrzött bizonyítékok az elfogadási eredmények összesítőjében

A `scripts/quality/validate-release-acceptance.mjs` egy megadott tervet és annak manifesztjeit összesíti; nem igazolja, hogy a terv lefedi a teljes kiadási folyamatot. Jelentései kifejezetten `releaseAcceptance: false` értéket állítanak be akkor is, ha a terv `VERIFIED`. A `release-acceptance.yml` munkafolyamat továbbra is shadow tesztadatokat használ, nem valódi build-, csomagolási, indítási vagy előléptetési bizonylatokat.

A CLI a megőrzött bizonyítékok ellenőrzéséhez megköveteli az `--evidence-root` megadását. A fájlokat a `<evidence-root>/<artifact_id>/<member>` útvonalon keresi, és SHA-256 hashüket számítja ki. Egy bizonyíték nélküli PASS rekord, hiányzó vagy megváltozott fájl, nem biztonságos útvonal vagy szimbolikus hivatkozás megakadályozza az igazolást. A hiányzó fájlok nem egyenértékűek a sikeres futások üres naplóival. A meglévő SHA/run/attempt ellenőrzések függetlenek maradnak: az egyező bájtok nem tesznek érvényessé egy elavult bizonylatot. A fájl sértetlensége nem bizonyítja a végrehajtás hitelességét vagy az artefaktum előléptetését.

### Statikus vizsgálatok készlete

A verziózott npm-aliasok készlete és a statikus vizsgálatok tagsága a
`config/quality/gate-manifest.json` fájlban található. Futtassa az
`npm run check:gate-manifest` parancsot a szkriptnevek és a pontos parancsok
`package.json` fájlhoz viszonyított ellenőrzéséhez; a hozzáadások, eltávolítások és
parancsváltozások mind a helyi hook, mind a CI változásbesorolási feladatait
meghiúsítják. Az alias nem munkafolyamat-feladat, mátrixpéldány vagy teszteset:
ezeket a darabszámokat nem szabad egymással felcserélhetőként bemutatni.

A kijelölt aliasok végrehajtás nélküli megtekintéséhez használja az
`npm run quality:scan -- --list` vagy az `npm run quality:scan:fast -- --list`
parancsot. A futtató az npm belépési pontját hívja meg, ezért annak futtatókörnyezete
— beleértve a Bunt, ahol az van beállítva — megmarad. A jegyzék a profilokon kívüli
aliasokat külön meghívottként tartja nyilván, a karbantartási parancsok pedig tiltottak
a csak olvasható vizsgálati profilokban.

Ezek a profilok kizárólag a statikus vizsgálatot fedik le. Nem tanúsítják a termékteszteket,
a lefedettséget, a csomagolást, a külső ellenőrzéseket vagy egy jelölt teljes kiadási
elfogadását. A munkafolyamat befogadása a kapcsolódó
`config/quality/admission-policy.json` és `scripts/quality/admission-verdict.mjs`
fájlokat használja. A kiadásmegfigyelő profiljai különállók maradnak; az alkalmazandó
ellenőrzéseiket és nyugtáikat egymástól függetlenül vizsgálja meg. A teljes megfigyelő
statikus parancsait a `config/quality/release-green-static-profile.json` tartalmazza,
beleértve az `audit:deps` parancsot, a mutációs tesztek kiválasztását és a fordítási
ellenőrzéseket. A betöltő az npm-parancsokat a package.json fájlhoz és a modellezett
CI/Quality-deklarációkhoz viszonyítva ellenőrzi; az eltérést elutasítja ahelyett, hogy
shell-tokeneket hajtana végre argumentumként. A kötelező vizsgálók SKIP/INCOMPLETE
kimenete nem alapozhatja meg a PASS állapotot. A profil rögzíti a külső kizárásait,
és nem helyettesíti a hosztolt lefedettségi, tesztmátrix-, csomag- vagy üzembehelyezési
bizonyítékokat. Az alábbi szöveges készlet referencia, nem pedig bizonyíték arra,
hogy egy kapu ténylegesen lefutott.

A szkriptek a `scripts/check/` (szabályzatkapuk) és a `scripts/quality/`
(racsnis mechanizmus) alatt találhatók. A CI hiteles forrása a `.github/workflows/ci.yml`.

### A közzétett alapdokumentáció állapota

A `.github/workflows/i18n-base-health.yml` a dokumentáció állapotát figyeli a `main` és a `release/v*` ágakra történő kiválasztott leküldések után, valamint kézi indításkor. Szűrői lefedik a dokumentációt, a gyökérszintű Markdown-fájlokat, az `llm.txt` fájlt, a fordítási állapotot és konfigurációt, valamint a kapcsolódó i18n-eszközöket. Az egyetlen `Published base documentation health` feladat hosztolt Ubuntut használ, ötperces időkorláttal. Csak olvasási műveleteket végző ellenőrzést hajt végre, és diagnosztikai bizonylatot ír függőségek telepítése, fordítás vagy állapotátvétel nélkül.

A `scripts/i18n/check-base-health.mjs` megköveteli, hogy ne legyenek forráskivonatbeli inkonzisztenciák, hiányzó célok, célkivonatbeli inkonzisztenciák, elavult fordítások vagy szakaszgyorsítótárbeli inkonzisztenciák. Emellett ellenőrzi az alapdokumentumok és területi beállítások aktuális hatókörét, valamint annak rögzített eredetét. Érvénytelen kontextus, hiányos lefedettség vagy megszakított ellenőrző esetén az eredmény `INCOMPLETE`; megerősített eltérés esetén pedig `FAIL`. Mindkettő sikertelenséget jelző kilépési állapotot ad vissza. A bizonylat a checkout SHA-értékéhez, a munkafolyamathoz, a futtatáshoz és a próbálkozáshoz van kötve, és `i18n-base-health-<sha>-<run>-<attempt>` néven őrződik meg.

Ez a közzétett alap független megfigyelése. Nem ad hozzá PR- vagy merge-group-eseményt, kötelező PR-ellenőrzést, npm-álnevet vagy statikus vizsgálati profilhoz tartozó elemet. A meglévő differenciális PR-szabályzat és az alapul szolgáló ellenőrző tájékoztató jellegű besorolásai ettől elkülönülnek. A sikeres feltöltés nem változtathatja a sikertelen állapot-ellenőrzés eredményét PASS értékre.

### Kiadási PR gyorsított útvonala (`quality.yml`)

A `.github/workflows/quality.yml` kiegészíti a CI-t a main/release PR-ek, a `main` ágba
történő pushok, a kézi indítás és a merge groupok esetén. A PR-ek útvonal szerint szűrt
gyors ellenőrzéseket használnak. A véglegesen letiltott, duplikált buildet eltávolították;
a tényleges build-/csomag-/rendszerindítási ellenőrzések továbbra is a CI-ben maradnak.

| Feladat                                          | Hatókör                                                                                                                                                                                                                                                                 | Blokkoló                |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `Docs Gates (fast-path)`                         | Dokumentációs/kódmódosítási PR-ek; API-dokumentációs hivatkozások és teljes dokumentáció                                                                                                                                                                                | Igen                    |
| `Fast Quality Gates`                             | Kódmódosítási PR-ek; statikus ellenőrzések, típusellenőrzés, az irányítópult típusellenőrzése, érintett egységtesztek                                                                                                                                                   | Igen                    |
| `Forgotten sibling tests`                        | Kódmódosítási PR-ek; a módosított modulok visszakövetése a statikus felhasználókhoz és a lehetséges testvértesztekhez; a gyűjtőmodul- és dinamikusimportálási útvonalak tájékoztató jellegű diagnosztikaként jelennek meg, a hivatkozott engedélyezőlistás kivételekkel | **Tájékoztató jellegű** |
| `Vitest (fast-path)`                             | Kódmódosítási PR-ek; gyors Vitest-tesztkészlet                                                                                                                                                                                                                          | Igen                    |
| `Unit Tests fast-path`                           | Kódmódosítási PR-ek; 4 részre osztott egységtesztkészlet                                                                                                                                                                                                                | Igen                    |
| `No new ESLint warnings`                         | Kódmódosítási PR-ek; elnyomásokat figyelembe vevő lintelési védelmi ellenőrzés                                                                                                                                                                                          | Igen, forkoknál is      |
| `Merge integrity (changelog + generated skills)` | Nem piszkozat állapotú PR-ek; a változásnapló és a generált készségek szinkronizálása                                                                                                                                                                                   | Igen, forkoknál is      |

#### Elfelejtett testvértesztek jelentése

Az `npm run check:forgotten-sibling-tests` újra felhasználja a teszthatástérkép mögötti importfeloldót.
Minden módosított éles modulhoz determinisztikus
`changed module/symbol -> static consumer -> candidate sibling test` láncokat jelent, ha a lehetséges
teszt nem szerepel a pull request különbségei között. A Markdown-összefoglalót és a JSON-eredményt
a rendszer `forgotten-sibling-tests` munkafolyamat-műtermékként őrzi meg a kalibráláshoz, mielőtt
bármilyen blokkoló bevezetésre sor kerülne.

A gyűjtőmodulból történő újraexportálások és a dinamikus importálások kizárólag feloldási
diagnosztikák; soha nem eredményeznek blokkoló találatot. A felülvizsgált kivételek a
`config/quality/forgotten-sibling-allowlist.json` fájlban találhatók. Minden bejegyzésnek meg kell
neveznie a felhasználót és a lehetséges tesztet, konkrét indoklást kell adnia, valamint egy GitHub-ügyre
vagy pull requesre kell hivatkoznia. A hibásan formázott bejegyzések zárt módon hibát okoznak.
A kivételek nem nyomhatnak el törölt lehetséges tesztet vagy olyan különbséget, amely `.skip`/`.todo`
elemet ad hozzá; az állítások gyengítését és az egyéb elfedéseket továbbra is a függetlenül blokkoló
`check:test-masking` kapu kezeli.

### Feladat: `lint`

Minden `main` ágra irányuló PR esetén lefut. Hiba esetén blokkolja az egyesítést.

| Szkript (`npm run ...`)           | Mit ellenőriz                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Blokkoló                                            |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `check:node-runtime`              | A Node.js verziója a támogatott tartományon belül van                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Igen                                                |
| `check:test-tla-order`            | A `tests/unit` alatti egyetlen `node:test` fájl sem regisztrálhat tesztet, hajthat végre legfelső szintű `await` műveletet, majd regisztrálhat további teszteket (#18045; fokozatos szigorítás: a `test-tla-order-allowlist.json` csak csökkenhet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Igen                                                |
| `check:cycles`                    | Körkörös importok a teljes `src/` + `open-sse/` területén (AST-alapú, a tsconfig `paths` feloldásával). Önmagában 1-es kilépési kódot ad, ha bármilyen ciklus létezik (hibabiztos működés #15281 óta), és felsorolja az SCC-ket. A `check:cycles:ratchet` (amelyet a CI futtat) blokkol, ha a darabszám meghaladja a `quality-baseline.json` fájlban található `metrics.cycles` felső korlátját — jelenleg 14, `direction: down`, így csak csökkenhet (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen (fokozatos szigorítás)                         |
| `check:boundary`                  | `open-sse → src` csatolás: egyedi fájlok közötti importok a motorból az alkalmazásba (`scripts/quality/measure-boundary.mjs`; az él-lista a v4 mag-/modulszétválasztási javítási hátraléka). Önmagában = tájékoztató jelentés (ugyanaz, mint a `quality:boundary`). A `check:boundary:ratchet` (amelyet a CI futtat, és a `quality.yml` gyors ellenőrzéseinek fokozatos szigorítási ciklusában is szerepel) blokkol, ha a darabszám meghaladja a `quality-baseline.json` fájlban található `metrics.boundaryOpenSseToSrc` felső korlátját — kezdeti értéke a mért 771, `direction: down`; a `--update` csak csökkentheti; PR-eknél az alaphoz viszonyított (`--base-ref`, lásd alább)                                                                                                                                                                                                                                                                                                                                                                                                    | Igen (fokozatos szigorítás)                         |
| `check:route-validation:t06`      | Zod-sémák találhatók minden útvonalon (6. szintű szabályzat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Igen                                                |
| `check:any-budget:t11`            | Az `@ts-expect-error // any` előfordulásainak száma nem haladja meg a keretet (11. szintű beléptetőkapu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen                                                |
| `check:provider-consistency`      | A `providers.ts` minden szolgáltatójához tartozik megfelelő bejegyzés a `providerRegistry.ts` fájlban (és fordítva, az engedélyezési listán belül)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Igen                                                |
| `check:model-lifecycle`           | A három kézzel karbantartott útválasztási tábla konzisztens marad a verziókezelőben tárolt életciklus-pillanatképpel (#11503): a `FITNESS_TABLE` (`taskFitness.ts`) nem pontoz egyetlen olyan kivezetett azonosítót sem, amelyhez a `REGISTRY` útvonalat tud rendelni; minden `BUILT_IN_ALIASES`-cél megtalálható a `REGISTRY`-ben, és hiányzik a kivezetett azonosítók pillanatképéből; a `REGISTRY`-ben még szereplő minden kivezetett azonosító továbbításra kerül, vagy szerepel az `allowedRetiredInCatalog` listában; továbbá a `DEFAULT_DEGRADATION_MAP` egyetlen forrása vagy célja sem szerepel kivezetettként ebben a pillanatképben. Ez nem bizonyítja, hogy egy modellt jelenleg kiszolgál egy élő külső szolgáltatás. Offline — az összehasonlítás a `config/quality/model-lifecycle.json` fájllal történik, amely kézzel frissíthető az `npm run quality:refresh-model-lifecycle` paranccsal (hálózatot igényel; nincs bekötve a CI-be). Az `allowedRetiredInCatalog` egy fokozatosan szigorodó korlátozás: csak nyomonkövetési hibajeggyel együtt adjon hozzá bejegyzést. | Igen                                                |
| `check:fetch-targets`             | A kliensoldali `src/` könyvtárban található minden `fetch("/api/...")` egy valódi `route.ts` fájlra oldódik fel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Igen                                                |
| `check:deps`                      | A repó minden `package.json` fájljában szereplő, `npm install` paranccsal telepíthető függőség megtalálható a `dependency-allowlist.json` fájlban; az új, nem rögzített verziójú vagy névelírásos csomagok megjelölésre kerülnek                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Igen                                                |
| `audit:deps`                      | npm audit mind az öt független lockfile-hoz (gyökér, Electron, OpenCode v1/v2 bővítmények és szolgáltató). A kritikus figyelmeztetések blokkolnak; a magas súlyosságú figyelmeztetések továbbra is látható figyelmeztetésként jelennek meg. A hiányzó/sikertelen auditok INCOMPLETE állapotúak és blokkolnak; a hatókörönkénti lock-hash-ek és jelentések megmaradnak.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                                |
| `check:lockfile`                  | A `package-lock.json` integritása — https registry, integritási hash-ek, gazdagép-felülírások nélkül                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Igen                                                |
| `check:licenses`                  | SPDX-licencek engedélyezési listája az éles függőségekhez                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Igen                                                |
| `check:tracked-artifacts`         | Nincsenek build-műtermékek / verziókezelésbe felvett `node_modules` szimbolikus linkek (a husky pre-commit során is fut; a pre-push szándékosan könnyű — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Igen                                                |
| `check:ai-attribution`            | Nincs AI/bot `Co-Authored-By` zárósor vagy AI-generálásra utaló lábléc a PR commitjaiban, címében vagy törzsében — 16. szigorú szabály (a `quality.yml` gyors ellenőrzési ciklusában a PR→`release/**` esetén — beolvassa az esemény payloadját, PR-eken kívül nem végez műveletet —, valamint a `ci.yml` lintelésének csak PR-eknél futó lépésében a PR→`main` esetén; továbbá a husky `commit-msg` hookban; emberi társszerzők engedélyezettek; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:vitest-exclusions`         | Minden Vitest-kizárás megnevez egy nyomon követési hibajegyet, és szerepel a `config/quality/vitest-exclusions.json` fájlban (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Igen                                                |
| `check:file-size`                 | A forrásfájlok (`.ts`/`.tsx` a `src/`, `open-sse/`, `electron/`, `bin/` könyvtárakban) a `cap`, a tesztfájlok (`*.test.ts(x)`) pedig a `testCap` határértéken belül maradnak; a `file-size-baseline.json` fájlban rögzített (`frozen` / `testFrozen`) fájlok mérete nem haladhatja meg a feljegyzett méretet                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Igen                                                |
| `check:error-helper`              | A végrehajtókban/kezelőkben található hibaválaszok a `buildErrorBody()` / `sanitizeErrorMessage()` függvényt használják (12. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Igen                                                |
| `check:migration-numbering`       | A migrációs SQL-fájlok számozása folyamatos, kihagyások és ismétlődések nélkül                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Igen                                                |
| `check:public-creds`              | Nincsenek literális OAuth `client_id`/`client_secret` vagy Firebase Web-kulcsok a `publicCreds.ts` fájlon kívül (11. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Igen                                                |
| `check:db-rules`                  | Nincs nyers SQL a `src/lib/db/` modulokon kívül; nincsenek gyűjtőimportok a `localDb.ts` fájlból (2./5. szigorú szabály)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Igen                                                |
| `check:known-symbols`             | A diszpécsertáblákban regisztrált szolgáltatói végrehajtók, útválasztási stratégiák és fordítók megfelelnek a lemezen található fájloknak — nincsenek árva vagy deklarálatlan szimbólumok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Igen                                                |
| `check:route-guard-membership`    | Minden gyermekfolyamatot indító útvonalat az `isLocalOnlyPath()` osztályoz (Szigorú szabályok #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                                |
| `check:test-discovery`            | A repó minden `*.test.ts` / `*.spec.ts` fájlját legalább egy tesztfuttató begyűjti (racsni: a `test-discovery-baseline.json` fájlban lévő árva fájlok listája csak csökkenhet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Igen                                                |
| `check:agent-skills-sync`         | A generált agent-skills összetevők megegyeznek a forráskatalógusukkal (nincs eltérés)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | A szolgáltatói logókhoz/összetevőkhöz rögzített eredetbejegyzés tartozik                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | A JSON-konfigurációs fájlok feldolgozhatók, és megfelelnek a repó lintelési szabályainak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `typecheck:core`                  | TypeScript-fordítás hibák nélkül (csak tájékoztató jellegű figyelmeztetések)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Igen                                                |
| `typecheck:noimplicit:core`       | Szigorú `noImplicitAny` — előremutató; számos már meglévő hívási helyen továbbra is szükség van annotációkra                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Tájékoztató jellegű** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | Az `src/app/(dashboard)/**` hatókörére korlátozott `tsc` (#7033) — a `typecheck:core` gondosan összeállított, 27 fájlból álló engedélyezési listája egyetlen dashboard TSX-fájlt sem tartalmaz, és a `next build` sem végez rajta típusellenőrzést (a `next.config.mjs` beállítása: `ignoreBuildErrors: true`), ezért az ottani, árva azonosítókkal kapcsolatos regressziók (#6625/#6909) láthatatlanok voltak a CI számára. Az eltéréseket egy rögzített, fájlonkénti és TS-kódonkénti darabszám-alapértékhez (`config/quality/dashboard-typecheck-baseline.json`, ugyanazzal az elavultságot kikényszerítő mintával, mint a `check:known-symbols`) viszonyítja — csak az alapértékben rögzített darabszámot meghaladó ÚJ hibák miatt bukik el az ellenőrzés; egy már meglévő hiba javításakor az alapérték az `--update` kapcsolóval csökkenthető.                                                                                                                                                                                                                                     | Igen                                                |

### Feladat: `quality-gate`

A `test-coverage` után fut. Hiba esetén blokkolja az összevonást.

| Szkript                      | Ellenőrzés                                                                                                                                                                                                        | Blokkoló                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `quality:collect`            | Létrehozza a `quality-metrics.json` fájlt (ESLint-figyelmeztetések száma, lefedettség az egyes részekből összevont jelentés alapján)                                                                              | Igen (a ratchet előfeltétele) |
| `quality:ratchet`            | A `quality-baseline.json` minden metrikája esetén ellenőrzi, hogy nem történt-e regresszió (ESLint-figyelmeztetések ≤ alapérték; lefedettség ≥ alapérték)                                                         | Igen                          |
| `check:duplication`          | A kódduplikáció (`jscpd@4`) nem haladja meg a `quality-baseline.json` fájlban megadott alapértéket                                                                                                                | Igen                          |
| `check:complexity`           | A fájlszintű ciklomatikus komplexitás nem haladja meg a korlátot (az ESLint alapvető `complexity` + `max-lines-per-function` szabályai)                                                                           | Igen                          |
| `check:cognitive-complexity` | Kognitív komplexitási ratchet (`eslint-plugin-sonarjs`) — külön ESLint-futtatás; a CI mindkettőt összevonva, egyetlen `check:complexity-ratchets` lépésként futtatja                                              | Igen                          |
| `check:dead-code`            | A nem használt exportok és fájlok ratchetje (`knip`) nem mutat regressziót az alapértékhez képest                                                                                                                 | Igen                          |
| `check:compression-budget`   | Tömörítési benchmark kerete — az egyes motorok tokenmegtakarítási minimumértékei nem romolhatnak                                                                                                                  | Igen                          |
| `check:type-coverage`        | A típusokkal ellátott kód százalékos arányának ratchetje (`type-coverage`) nem mutat regressziót; nagyrészt kiváltja a `typecheck:noimplicit:core` ellenőrzést                                                    | Igen                          |
| `check:codeql-ratchet`       | A nyitott CodeQL-riasztások száma nem növekedhet (beolvasás a `gh api` használatával; token nélkül szabályosan kihagyja) — a frissítési gyakoriságot és a kézi indítást lásd alább, a „CodeQL ratchet” szakaszban | Igen                          |

### Feladat: `quality-extended`

A feladat blokkolja az érintett kiadásra jelölt verziókat. A csomagméretet, a titkos adatokkal kapcsolatos találatokat, a sebezhetőségi
találatokat, a munkafolyamatokkal kapcsolatos találatokat és az OpenAPI-módosításokat kötelező ratchetek ellenőrzik.
A körkörös függőségek diagnosztikája továbbra is csak tájékoztató jellegű. A vizsgálóeszközök telepítése kötelező:
a `scripts/ci/install-quality-scanners.sh` rögzített verziókat telepít, és továbbítja a
telepítési hibákat. A hiányzó eszközök, az érvénytelen jelentések vagy a hiányzó alapértékek miatt
a kötelező vizsgálókapu INCOMPLETE állapotban marad.

| Szkript                  | Ellenőrzi                                                                                                                                                                                                                                                         | Blokkoló                                                  |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `check:circular-deps`    | Nincsenek körkörös függőségek (dpdm)                                                                                                                                                                                                                              | **Tájékoztató jellegű**                                   |
| `check:bundle-size`      | A csomag mérete nem haladja meg a korlátot; a nem elérhető mérés hibát eredményez                                                                                                                                                                                 | **Blokkoló a --ratchet használatával**                    |
| `check:secrets`          | A Gitleaks találatai nem romlanak; a kötelező vizsgálatok elutasítják a hiányzó eszközöket/forrást/alapértéket, a sikertelen vizsgálatokat és az érvénytelen jelentéseket                                                                                         | **Blokkoló a --ratchet használatával**                    |
| `check:vuln-ratchet`     | A függőségek sebezhetőségei nem romlanak; a kötelező vizsgálatok elutasítják a hiányzó eszközöket, az érvénytelen jelentéseket vagy a hiányzó alapértékeket                                                                                                       | **Blokkoló a --ratchet használatával**                    |
| `check:workflows`        | Munkafolyamat-lintelés (actionlint + zizmor); a hiányzó/hibás ellenőrzők, az érvénytelen jelentések vagy a hiányzó ratchet-alapérték INCOMPLETE állapottal hibát eredményeznek. Az érvényes találatok a kiválasztott strict/advisory/ratchet szabályzatot követik | A végrehajtás kötelező; a zizmor ratchet blokkol a CI-ben |
| `check:openapi-breaking` | A nyilvános API-szerződés ellenőrzése a rögzített esemény-commitokhoz képest (PR merge-base, push before, merge-group base; ütemezett/manuális futtatásnál a checkout első szülője); a kötelező mérés zárt módon hibára fut                                       | **Blokkoló a --ratchet használatával**                    |

### Feladat: `docs-sync-strict`

A `main` vagy `release/**` ágra irányuló pull requestek esetén ez a feladat csak a nem piszkozat állapotú (vagy megbízható várólistában lévő), dokumentációs vagy kódmódosításként besorolt jelölteknél fut le. Nem PR-hez tartozó CI-eseményeknél is lefut; ennek a munkafolyamatnak a push eseményindítója csak a `main` ágra terjed ki, a `release/**` ágakra nem. A nem nulla kilépési kóddal végződő lépés blokkolja a feladatot; a csak jelentésre szolgáló megállapítások és az alább dokumentált kivételek nem blokkolják.

| Szkript                        | Ellenőrzi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokkoló                                                                                                                                            |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-kapu, amely egymás után futtatja az alábbi 7 alkaput                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Igen                                                                                                                                                |
| ↳ `check:docs-sync`            | A csomag/OpenAPI/CHANGELOG verzióinak összhangja, a `llm.txt` pontos tükörmásolatai, a lefordított CHANGELOG szakaszaira és méretére vonatkozó invariánsok, valamint a már felváltott, ismétlődő dokumentumok hiánya                                                                                                                                                                                                                                                                                                        | Igen                                                                                                                                                |
| ↳ `check:docs-frontmatter`     | A lefordított dokumentációs oldalak érvényes frontmatter-címekkel rendelkeznek                                                                                                                                                                                                                                                                                                                                                                                                                                              | Igen                                                                                                                                                |
| ↳ `check:docs-counts`          | A nagy megbízhatóságú darabszám-invariánsok szigorúak; a heurisztikus fájlszám-ellenőrzések csak figyelmeztetnek, kivéve, ha a szkript megkapja a `--strict` kapcsolót (a CI meta-kapuja nem adja át)                                                                                                                                                                                                                                                                                                                       | A szigorú szint blokkol; az enyhe szint tájékoztató jellegű                                                                                         |
| ↳ `check:env-doc-sync`         | A forráskódban olvasott környezeti változók, a `.env.example` és a `docs/reference/ENVIRONMENT.md` összhangban vannak a figyelmen kívül hagyott, a csak dokumentációban és a csak környezetben szereplő elemek kifejezett kivétellistáinak alkalmazása után                                                                                                                                                                                                                                                                 | Igen, a dokumentált kivétellistákon kívül                                                                                                           |
| ↳ `check:deprecated-versions`  | Jelenti a biztonságos történeti kontextusokon kívüli, esetleg elavult verziókat és az elavult frissítési dátumokat, a figyelmen kívül hagyott dokumentumok kivételével                                                                                                                                                                                                                                                                                                                                                      | A jelenlegi CI-bekötésben tájékoztató jellegű (a `--strict` nincs átadva)                                                                           |
| ↳ `check:doc-links`            | A dokumentáció belső markdown-hivatkozásai valós fájlokra mutatnak (`[text]`/`(path)` formátumban)                                                                                                                                                                                                                                                                                                                                                                                                                          | Igen                                                                                                                                                |
| ↳ `check:fabricated-docs`      | A dokumentációban hivatkozott útvonalak, környezeti változók, CLI-parancsok, hooknevek és fájlelérési utak léteznek a kódbázisban. Szigorú kapu a `--strict` használatával; a jelző nélkül csak enyhe hibát jelez.                                                                                                                                                                                                                                                                                                          | Igen (CI-ben a `--strict` révén)                                                                                                                    |
| `check:cli-i18n`               | A CLI által használt `t()` kulcsok léteznek az `en` alatt; a `pt-BR` minden legfelső szintű szakaszt megőriz; a `zh-CN` és a `zh-TW` az `en` összes kulcsát tartalmazza                                                                                                                                                                                                                                                                                                                                                     | Igen                                                                                                                                                |
| `check:openapi-coverage`       | Az OpenAPI-specifikáció a valós útvonalak legalább ratchet szerint rögzített alsó határát lefedi                                                                                                                                                                                                                                                                                                                                                                                                                            | Igen                                                                                                                                                |
| `check:openapi-security-tiers` | A deklarált `x-loopback-only`/`x-always-protected` annotációkat a `routeGuard.ts` szabályainak alá kell támasztaniuk; az elemző hibái és az előre irányuló ellenőrzés eltérései blokkolnak. A csak helyi hozzáférésre szolgáló prefixek alatt hiányzó `x-loopback-only` fordított ellenőrzése figyelmeztet, a kizárólag mintával megadott útvonalak pedig kimaradnak ebből a fordított menetből.                                                                                                                            | Az elemző és az előre irányuló ellenőrzések blokkolnak; a fordított ellenőrzés tájékoztató jellegű                                                  |
| `check:openapi-routes`         | Az `openapi.yaml` minden `/api...` útvonala a paraméterektől függetlenül megfelel egy valós útvonalnak az indokolt `KNOWN_STALE_SPEC` kivétellista alkalmazása után; az elavult kivétellista-bejegyzések szintén hibát okoznak                                                                                                                                                                                                                                                                                              | Igen                                                                                                                                                |
| `check:docs-symbols`           | A kanonikus, nem tükörmásolatként szolgáló dokumentumok belső `/api/...` URL-hivatkozásai valós útvonalra vagy útvonalcsaládra mutatnak; a proxy/upstream/helyőrző/fájl hivatkozások és az indokolt `KNOWN_STALE_DOC_REFS` bejegyzések kivételt képeznek, az elavult kivétellista-bejegyzések pedig hibát okoznak                                                                                                                                                                                                           | Igen                                                                                                                                                |
| `i18n translation drift`       | Ellenőrzi az alapdokumentumok forrás-/célhashét és a fordítás eredetét. A PR-összehasonlítás csak teljesen azonos örökölt hibákat enged meg; a forrás, a hiányzó cél, a célhash, az elavult fordítás vagy a szakaszgyorsítótár új vagy nem ellenőrzött következetlenségei blokkolnak. A PR-összehasonlításon kívül a forrás/hiányzó cél/célhash hibái blokkolnak, míg az elavult fordítások és a következetlen szakaszgyorsítótárak továbbra is csak figyelmeztetések. A régi formátumú szakaszgyorsítótár hiánya nem hiba. | Az új/nem ellenőrzött PR-eltérés blokkol; a teljesen azonos örökölt eltérés csak figyelmeztetés; a PR-en kívüli szabályok a hiba típusától függenek |

### Feladat: `i18n-ui-coverage`

| Szkript                               | Mit ellenőriz                                                                                                                                                                                                                        | Blokkoló     |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `check-ui-keys-coverage` (beágyazott) | A felhasználói felület i18n-kulcsainak lefedettsége ≥ 65%                                                                                                                                                                            | Igen         |
| `check-ui-value-drift` (beágyazott)   | Egy átírt angol **érték** nem hagy maga után elavult fordítást                                                                                                                                                                       | Igen         |
| `check-new-key-coverage` (beágyazott) | Egy **új** angol kulcs minden területi beállításhoz le van fordítva — a `__MISSING__:` jelölő elutasításra kerül                                                                                                                     | Igen         |
| `check-translation-ratio`             | A valódi fordítások területi beállításonkénti aránya (az angollal azonos / helyőrző / hiányzó bejegyzések az engedélyezési listán kívül) nem haladhatja meg a `config/quality/i18n-translation-baseline.json` értékét plusz a tűrést | **Blokkoló** |

A `fetch-depth: 0` beállítás szükséges — az értékeltérés ellenőrzése az `en.json` fájlt a merge base állapotával hasonlítja össze.

#### `check-ui-value-drift` — elavult fordításokat ellenőrző kapu

Azt az egy i18n-regressziót észleli, amelyet a többi kapu szerkezetileg nem képes felismerni: egy angol értéket átírnak, miközben a _korábbi_ angol szövegből készült fordítások változatlanul megmaradnak, így a nem angol nyelvű felhasználók továbbra is magabiztosan megfogalmazott, de immár hibás szöveget olvasnak.

Ez valóban éles környezetbe került. Az `oauthModal.googleOAuthWarning` átírásra került, amikor bekerült az Antigravity bejelentkezési segéd (#5203); **43 területi beállításból 39** olyan szöveget tartott meg, amely arra utasította az üzemeltetőket, hogy „másolják ki a teljes URL-t, és illesszék be alább” — ennél a szolgáltatónál ez a folyamat nem hajtható végre. A probléma a #8463 hibajegyig észrevétlen maradt, mert:

- a `sync-ui-keys` csak a **hiányzó** kulcsokat tölti fel, az **elavultakat** soha;
- a `check-ui-keys-coverage` a kulcsok _jelenlétét_ számolja, ezért egy elavult fordítást lefedettnek tekint;
- a `check-translation-drift` a `docs/i18n/<locale>/**.md` dokumentációs tükröket követi nyomon —
  a `src/i18n/messages/*.json` fájlokat soha nem olvassa. A 2026-09-es újraszinkronizálás óta blokkoló a `docs-sync-strict` feladatban: alapszintű dokumentum szerkesztése → `npm run i18n:run -- --files=<doc>` (szakaszszintű, kis költségű).

**Diff-alapú, nem alapállapot-fájlra támaszkodik.** A merge base állapotában lévő `en.json` fájlt hasonlítja össze a munkafával; minden olyan kulcsnál, amelynek angol értéke megváltozott, elavultnak minősül minden olyan területi beállítás, amely továbbra is egy érintetlen fordítást tartalmaz. Ez szándékosan **befagyasztja a már meglévő adósságot** — egy diff alapján nem állapítható meg, hogy egy régóta meglévő fordítás melyik korábbi angol szövegből származik, ezért a kapu csak az aktuális módosítás által érintett részeket vizsgálja. Az alternatíva (egy kulcsonkénti hash-alapállapot) egy körülbelül 600 KB-os generált fájlt igényelne, amely háromszor akkora lenne, mint a legnagyobb meglévő alapállapot-fájl, és minden i18n PR-nél módosulna.

Kétféleképpen lehet megfelelni az ellenőrzésnek:

1. frissíteni kell az érintett fordításokat, vagy
2. az értéküket `__MISSING__:<new english>` formára kell állítani — ekkor a futtatókörnyezet a javított angol szöveget jeleníti meg
   (`src/i18n/request.ts::deepMergeFallback`, #7258), a kulcs pedig bekerül a fordítási sorba.

Ha a karakterlánc **jelentése** megváltozott, inkább **nevezze át a kulcsot**: egy új kulcs nem örökölhet elavult fordítást. A #8463 ezt a mintát alkalmazta.

```bash
npm run i18n:check-value-drift          # szigorú (ezt futtatja a CI)
npm run i18n:check-value-drift:warn     # csak jelentés
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Az értékeltérés- és az újkulcs-ellenőrzés ugyanazt a megváltoztathatatlan összehasonlítást használja a
`scripts/i18n/resolve-ui-diff-base.mjs` fájlból. A munkafolyamat ugyanazokat a bázis-, báziscsúcs- és
jelölt-SHA-kat adja át mindkét ellenőrzésnek. A PR-/bázis-újracélzási, push- és merge-group-futtatások az eseményük
kontextusát használják. Egy jelölt ág kézi indításához annak pontos nyitott PR-ja vagy az explicit
`i18n_base_sha` bemenet szükséges. A `main` vagy `release/vX.Y.Z` ág explicit bemenet nélküli,
kézi indítású vagy ütemezett vizsgálata az utolsó commitot annak első szülőjével hasonlítja össze; ez nem
az összes örökölt fordítási adósság auditja. A helyi futtatáshoz explicit összehasonlítási bázis szükséges,
például a fenti `BASE_REF` parancs.

A hiányzó vagy nem egyértelmű összehasonlítási kontextus, az olvashatatlan vagy érvénytelen kötelező katalógus,
valamint a módosult jelölt `INCOMPLETE` eredményt ad **2**-es kilépési kóddal, figyelmeztetési módban is.
A katalógusok beolvasása a `scripts/i18n/read-ui-catalog.mjs` használatával történik; a beolvasási hibákat
nem helyettesíti üres objektumokkal. Sem az elérhetetlen bázis, sem a hiányos bemenet nem eredményez PASS állapotot.

### Feladat: `i18n`

Teljes i18n-ellenőrzési mátrix (területi beállításonként egy feladat). A teljes feladat tájékoztató jellegű.

| Szkript                         | Mit ellenőriz                                  | Blokkoló                                                               |
| ------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------- |
| `validate_translation.py quick` | A fordítás teljessége területi beállításonként | **Tájékoztató jellegű** (`continue-on-error: true` a teljes feladaton) |

### Feladat: `pr-test-policy`

Csak pull requestek esetén fut.

| Szkript                | Mit ellenőriz                                                                                                                                                             | Blokkoló |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | A `src/`, `open-sse/`, `electron/` vagy `bin/` könyvtárban lévő éles kódot módosító PR-eknek teszteket is tartalmazniuk vagy frissíteniük kell (8. szigorú szabály)       | Igen     |
| `check:test-masking`   | A módosított tesztfájlok nem csökkentik az assert utasítások nettó számát, és nem adnak hozzá `assert.ok(true)` tautológiákat                                             | Igen     |
| `check:pr-evidence`    | A PR törzse hivatkozik a módosításhoz tartozó teszt-/VPS-bizonyítékra (a 18. szigorú szabály automatizálása a PR szövegében végzett kereséssel — törékeny, lásd: Backlog) | Igen     |

### Feladat: `test-vitest`

Szükséges hozzá a `changes` besorolási feladat. A vonatkozó mátrixszegmensek sikertelenség esetén blokkolják az egyesítést.

| Tesztcsomag      | Ellenőrzi                                                            | Blokkoló                                                                                                                           |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-kiszolgáló (110 eszköz), autoCombo, gyorsítótár — vitest futtató | Igen                                                                                                                               |
| `test:vitest:ui` | Felhasználói felületi komponensek tesztjei — vitest futtató          | **Blokkoló** — a már meglévő hibák kifejezetten ki vannak zárva a `vitest.config.ts` fájlban; az új hibák meghiúsítják a feladatot |

### Éjszakai munkafolyamatok (ütemezett, tájékoztató jellegűek)

Ezek cron-ütemezés szerint (valamint `workflow_dispatch` használatával) futnak, PR-eken soha. Mindegyik tájékoztató jellegű.

| Munkafolyamat          | Ellenőrzi                                                                                                                                                                                                      | Blokkoló        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | fast-check tulajdonságalapú tesztek véletlenszerű kezdőértékkel és magas futtatásszámmal                                                                                                                       | **Tájékoztató** |
| `nightly-resilience`   | heapnövekedési korlát, káoszalapú hibainjektálás, k6 terhelési/tartóssági teszt                                                                                                                                | **Tájékoztató** |
| `nightly-llm-security` | promptfoo injektálás elleni védelem (blokkoló mód) + garak-próbák (szolgáltatói titok nélkül kihagyva)                                                                                                         | **Tájékoztató** |
| `nightly-schemathesis` | OpenAPI-szerződések fuzz tesztelése (schemathesis) egy élő OmniRoute-példányon a `docs/openapi.yaml` használatával — felszínre hozza a specifikáció megsértéseit / a nem kezelt 500-as hibákat (8. fázis, B.4) | **Tájékoztató** |
| `nightly-mutation`     | Stryker mutációtesztelési pontszám a gyors egységteszt-sávon — a túlélő mutánsok feltárják a gyenge ellenőrzéseket                                                                                             | **Tájékoztató** |
| `nightly-compat`       | Node-motor kompatibilitási mátrixa a támogatott `engines.node` tartományokban                                                                                                                                  | **Tájékoztató** |

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
