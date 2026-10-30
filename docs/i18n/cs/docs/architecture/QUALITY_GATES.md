# Quality Gates Reference (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Tento dokument je autoritativním zdrojem informací o všech kontrolních branách kvality CI v OmniRoute.
Popisuje každou bránu, co ověřuje, ve které úloze CI se spouští, zda používá
referenční hodnotu s ráčnovým mechanismem, nebo zásadu úspěch/neúspěch, a zda sestavení blokuje, nebo má pouze informativní charakter.

Stručné shrnutí a zásady seznamu povolených výjimek naleznete v části „Quality Gates & Ratchets“
v souboru `AGENTS.md`. Kritické posouzení, klasifikaci vyspělosti a plán replikace
stejného systému nezávislý na konkrétních nástrojích naleznete v dokumentu
[Průvodce kontrolními branami kvality](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventář bran a profily spuštění

### Přijetí kandidáta

Workflowy CI a Quality Gates poskytují stabilní verdikt: `Gate / CI` a
`Gate / Quality`. Jejich verzovaná politika přijímání uvádí každou nadřazenou úlohu
jako povinnou nebo poradní. Příslušná povinná úloha musí uspět: chybějící,
zrušené, přeskočené, čekající a neznámé výsledky nemohou stanovit PASS. Platná
klasifikace pouze pro dokumentaci nebo pouze pro katalog může způsobit, že se větev
pro kód nepoužije; koncept PR není přijatelným kandidátem. Štítek `hotfix` nezbavuje
povinnosti předložit důkazy.

Oba workflowy pokrývají PR do větví main/release, pushnutí do `main`, ruční spuštění
a události skupin sloučení. Pushnutí, ruční spuštění a skupiny sloučení spouštějí úplný
výběr. Pushnutí do `release/**` je nespouštějí (2026-10-18): každá změna již prošla
maticí ve svém PR a za sloučenou kombinaci odpovídá Release-Green
(`docs/ops/RUNNER_BOX.md` → hostovaná větev). Forky a skupiny sloučení používají
hostované runnery pro úlohy, které by jinak vybraly self-hosted runnery; před zavedením
je nutné ověřit dostatečnou hostovanou kapacitu.

Každé potvrzení JSON identifikuje checkoutnuté SHA, běh workflow a pokus.
CLI odmítne neshodu mezi SHA checkoutu a události. Testy workflow vážou členství
v politice na seznam `needs` úlohy s verdiktem, takže nová nebo odebraná větev nemůže
nepozorovaně zmizet. Potvrzení pokrývají vlastní pracovní postup, nikoli publikování, nasazení ani interní
fungování existujícího poradního skeneru. Nastavení příslušných kontrol
jako povinných v pravidlech větví je samostatná administrativní změna; samotná definice
jejich úloh větev nechrání.

`API Route Typecheck` je nezávislá kontrola pracovního postupu, která stojí mimo obě
souhrnná rozhodnutí i statický profil místního úplného pozorovatele. Její výsledek pro
konkrétního kandidáta zkontrolujte samostatně. `.github/workflows/api-route-typecheck.yml`
se spouští pro PR směřující do `main` nebo `release/**`, při odeslání změn do kterékoli
z těchto skupin větví a při ručním spuštění. Nemá žádný filtr cest. Změna cílové větve
PR vyžádá novou kontrolu; úpravy těla nebo názvu používají název určený pouze pro
pozorování `Admission not requested / API Route Typecheck` a nemohou nahradit kontrolu
přijetí. Pracovní postup nedeklaruje trigger pro skupinu sloučení. Každé zavedení fronty
sloučení, které tuto kontrolu vyžaduje, musí nejprve zajistit její spuštění pro danou událost.

### Kapacita pro spouštění UI

CI spouští úplný inventář UI jako čtyři fragmenty matice `test-vitest`, každý nejvýše
se dvěma workery a se stávajícím 15minutovým limitem úlohy. První fragment také spouští
sadu Vitest pro MCP/autoCombo. Výsledek povinné úlohy pokrývá všechny části matice;
selhání nebo zrušení jednoho fragmentu nemůže stanovit přijetí kandidáta.

Noční pozorovatel uchovává samostatné potvrzení přesného kandidáta pro každý fragment UI,
včetně spuštění MCP v prvním potvrzení. Jsou vyžadována všechna čtyři potvrzení, protokoly
a odpovídající identity spuštění. Lokální `npm run test:vitest:ui` nadále vybírá úplnou
sadu; jedno spuštění s `--shard` představuje pouze částečný důkaz.

### Sběr pokrytí jednotkových testů

Dvanáct fragmentů jednotkových testů shromažďuje během stávajícího spouštění testů pokrytí V8.
Úspěšný fragment spustí `scripts/ci/compact-v8-coverage.mjs`, který zkomprimuje původní soubory,
aniž by generoval mezilehlou sestavu Istanbul. Závěrečná úloha Coverage ověří všech dvanáct
manifestů vůči SHA kandidáta, běhovému prostředí, kořenovému adresáři zdrojů a hashům dat
a poté spustí reportéry c8 a stávající prahové hodnoty pokrytí. Vstupy zachovávají globální
pořadí názvů souborů nástroje c8; předběžné slučování po fragmentech není bezpečné pro smíšené
pokrytí funkcí a bloků. Chybějící, poškozené nebo nekompatibilní fragmenty způsobí selhání
přijetí. Neúspěšné testovací fragmenty uchovávají nezpracované diagnostické pokrytí odděleně;
to nelze zahrnout do závěrečného sloučení.

### Záznamy o průběhu spouštění jednotkových testů

Sdílený příkaz `test:unit:ci:shard` zaznamenává fáze `primary`, `dashboard` a `serial`
prostřednictvím `scripts/ci/unit-progress-reporter.mjs`. Běžný protokol testů zůstává
k dispozici. Samostatný záznam obsahující pouze metadata zaznamenává zahájení a dokončení
každého souboru a 30sekundový prezenční signál uvádí soubory, které jsou stále aktivní,
a dobu jejich běhu. Zaznamenává pouze metadata spuštění uvedená na seznamu povolených položek;
popisy testů, výstup, těla chyb ani celé prostředí se neserializují.

CI a Quality uchovávají soubory JSONL jako `unit-progress-ci-<run>-<attempt>-<shard>` a
`unit-progress-quality-<run>-<attempt>-<shard>`. Vypršení časového limitu úlohy může zabránit
pozdějšímu nahrání; již odeslané prezenční signály zůstávají diagnostickým důkazem. Chybějící
prezenční signály mohou také znamenat zablokovaný nebo ukončený proces runneru. Tyto záznamy
zachovávají stávající výběr testů, souběžnost, časové limity a návratový stav; nepředstavují
rozhodnutí o přijetí kandidáta.

### Uchované důkazy v modulu pro vyhodnocení přijetí

`scripts/quality/validate-release-acceptance.mjs` vyhodnocuje dodaný plán a jeho manifesty; neprokazuje, že plán pokrývá celý proces vydání. Jeho zprávy výslovně nastavují `releaseAcceptance: false`, i když je plán `VERIFIED`. Workflow `release-acceptance.yml` stále používá stínová testovací data, nikoli skutečné záznamy o sestavení, zabalení, spuštění nebo povýšení artefaktu.

CLI vyžaduje `--evidence-root` k ověření uchovaných důkazů. Soubory vyhledává na cestě `<evidence-root>/<artifact_id>/<member>` a počítá jejich hash SHA-256. Záznam PASS bez důkazů, chybějící či změněný soubor, nebezpečná cesta nebo symbolický odkaz brání ověření. Chybějící soubory nejsou totéž co prázdné protokoly úspěšného běhu. Stávající kontroly SHA/run/attempt zůstávají nezávislé: shodné bajty nemohou zachránit zastaralý záznam. Integrita souboru nedokazuje pravost spuštění ani povýšení artefaktu.

### Inventář statických kontrol

Verzovaný inventář aliasů npm a členství ve statických kontrolách jsou uloženy v
`config/quality/gate-manifest.json`. Spuštěním `npm run check:gate-manifest` ověřte
názvy skriptů a přesné příkazy podle `package.json`; přidání, odebrání a změny příkazů
způsobí selhání lokálního hooku i úloh klasifikace změn v CI.
Alias není úloha workflow, instance matice ani testovací případ: tyto počty
nesmějí být prezentovány jako vzájemně zaměnitelné.

Pomocí `npm run quality:scan -- --list` nebo `npm run quality:scan:fast -- --list`
můžete zkontrolovat vybrané aliasy, aniž byste je spustili. Runner vyvolává vstupní bod
npm, takže je zachováno jeho běhové prostředí (včetně Bun tam, kde je nakonfigurován).
Manifest eviduje aliasy mimo tyto profily jako spouštěné samostatně a v profilech kontrol
pouze pro čtení jsou příkazy údržby zakázány.

Tyto profily pokrývají pouze statické kontroly. Necertifikují produktové testy,
pokrytí, balení, externí kontroly ani úplné schválení kandidáta k vydání.
Přijetí workflow používá propojené soubory `config/quality/admission-policy.json` a
`scripts/quality/admission-verdict.mjs`. Profily pozorovatele vydání zůstávají oddělené;
jejich příslušné kontroly a potvrzení ověřujte nezávisle. Statické příkazy úplného
pozorovatele jsou deklarovány v `config/quality/release-green-static-profile.json`, včetně
`audit:deps`, výběru mutačních testů a kontrol překladů. Loader ověřuje příkazy npm
podle package.json a modelovaných deklarací CI/Quality; místo spouštění shellových tokenů
jako argumentů odmítne nesoulad. Povinný výstup skeneru SKIP/INCOMPLETE nemůže stanovit
PASS. Profil eviduje svá externí vyloučení a nenahrazuje důkazy o hostovaném pokrytí,
testovacích maticích, balíčku ani nasazení. Níže uvedený textový inventář slouží jako
reference, nikoli jako důkaz, že byla brána skutečně spuštěna.

Skripty se nacházejí v `scripts/check/` (brány politik) a `scripts/quality/` (ratchet engine).
Zdrojem pravdy pro CI je `.github/workflows/ci.yml`.

### Stav dokumentace publikovaného základu

`.github/workflows/i18n-base-health.yml` sleduje stav dokumentace po vybraných
pushích do `main` a `release/v*` a při ručním spuštění. Jeho filtry zahrnují dokumentaci,
kořenové soubory Markdown, `llm.txt`, stav a konfiguraci překladů a příslušné nástroje i18n.
Jediná úloha `Published base documentation health` používá hostované Ubuntu a časový
limit pěti minut. Provádí ověření pouze pro čtení a zapisuje diagnostické potvrzení bez
instalace závislostí, překladu nebo převzetí stavu.

`scripts/i18n/check-base-health.mjs` vyžaduje nulový počet nekonzistencí zdrojových hashů,
chybějících cílů, cílových hashů, zastaralých překladů a mezipaměti sekcí. Ověřuje také
aktuální rozsah základních dokumentů a národních prostředí a zaznamenaný původ tohoto
rozsahu. Neplatný kontext, neúplné pokrytí nebo přerušená kontrola vytvoří `INCOMPLETE`;
potvrzená odchylka vytvoří `FAIL`. Oba výsledky vrátí stav ukončení označující selhání.
Potvrzení je svázáno s SHA revize checkoutu, pracovním postupem, během a pokusem a je
uchováváno jako `i18n-base-health-<sha>-<run>-<attempt>`.

Jde o nezávislé sledování publikovaného základu. Nepřidává událost PR ani skupiny
sloučení, povinnou kontrolu PR, alias npm ani člena profilu statické kontroly.
Stávající rozdílové zásady pro PR a základní poradní klasifikace kontrolního nástroje
zůstávají oddělené. Úspěšné nahrání nemůže změnit neúspěšný výsledek kontroly stavu na `PASS`.

### Rychlá cesta pro release PR (`quality.yml`)

`.github/workflows/quality.yml` doplňuje CI u PR do větví main/release, pushnutí do `main`,
ručních spuštění a skupin sloučení. PR používají rychlé kontroly filtrované podle cest.
Trvale zakázané duplicitní sestavení bylo odstraněno; skutečné kontroly sestavení, balíčku
a spuštění zůstávají v CI.

| Úloha                                            | Rozsah                                                                                                                                                                                                               | Blokující         |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `Docs Gates (fast-path)`                         | PR dokumentace/kódu; odkazy na dokumentaci API a docs-all                                                                                                                                                            | Ano               |
| `Fast Quality Gates`                             | PR kódu; statické kontroly, kontrola typů, kontrola typů dashboardu, ovlivněné jednotkové testy                                                                                                                      | Ano               |
| `Forgotten sibling tests`                        | PR kódu; změněné moduly trasované ke statickým konzumentům a kandidátním souvisejícím testům; cesty přes barrel a dynamické importy jsou hlášeny jako informativní diagnostika s odkazovanými výjimkami v allowlistu | **Informativní**  |
| `Vitest (fast-path)`                             | PR kódu; rychlá sada testů vitest                                                                                                                                                                                    | Ano               |
| `Unit Tests fast-path`                           | PR kódu; sada jednotkových testů rozdělená do 4 shardů                                                                                                                                                               | Ano               |
| `No new ESLint warnings`                         | PR kódu; ochranná kontrola lintování zohledňující potlačení                                                                                                                                                          | Ano, včetně forků |
| `Merge integrity (changelog + generated skills)` | PR, které nejsou koncepty; synchronizace changelogu a generovaných dovedností                                                                                                                                        | Ano, včetně forků |

#### Report zapomenutých souvisejících testů

`npm run check:forgotten-sibling-tests` znovu používá resolver importů, na kterém je založena mapa dopadu testů.
Pro každý změněný produkční modul hlásí deterministické řetězce
`changed module/symbol -> static consumer -> candidate sibling test`, pokud kandidátní
test chybí v diffu pull requestu. Souhrn ve formátu Markdown a výsledek JSON jsou uchovány jako
artefakt workflow `forgotten-sibling-tests` pro kalibraci před případným zavedením blokující kontroly.

Reexporty přes barrel a dynamické importy slouží pouze jako diagnostika rozlišení; nikdy nevytvářejí
blokující nález. Zkontrolované výjimky se nacházejí v souboru
`config/quality/forgotten-sibling-allowlist.json`. Každá položka musí uvádět konzumenta a kandidátní
test, obsahovat konkrétní odůvodnění a odkazovat na issue nebo pull request na GitHubu. Chybně vytvořené položky
vedou k zamítnutí kontroly. Výjimky nemohou potlačit odstraněný kandidátní test ani diff přidávající `.skip`/`.todo`;
oslabování asercí a další maskování zůstává v působnosti nezávisle blokující
kontroly `check:test-masking`.

### Úloha: `lint`

Spouští se při každém PR do `main`. Při selhání blokuje sloučení.

| Skript (`npm run ...`)            | Ověřuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Blokující                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `check:node-runtime`              | Verze Node.js je v podporovaném rozsahu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ano                                          |
| `check:test-tla-order`            | Žádný soubor `node:test` v adresáři `tests/unit` neregistruje test, poté nenarazí na `await` na nejvyšší úrovni a následně neregistruje další testy (#18045; západka: `test-tla-order-allowlist.json` se může pouze zmenšovat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ano                                          |
| `check:cycles`                    | Cyklické importy napříč celými adresáři `src/` + `open-sse/` (založeno na AST, `paths` z tsconfig jsou přeloženy). Samostatné spuštění skončí s kódem 1, kdykoli existuje jakýkoli cyklus (princip fail-closed od #15281), a vypíše silně souvislé komponenty. `check:cycles:ratchet` (varianta spouštěná v CI) blokuje, když počet překročí strop `metrics.cycles` v souboru `quality-baseline.json` — aktuálně 14, `direction: down`, takže může pouze klesat (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano (západka)                                |
| `check:boundary`                  | Provázanost `open-sse → src`: jedinečné importy mezi soubory z enginu do aplikace (`scripts/quality/measure-boundary.mjs`; seznam hran představuje backlog nápravných prací pro rozdělení jádra/modulů v4). Samostatné spuštění = informativní report (stejně jako `quality:boundary`). `check:boundary:ratchet` (varianta spouštěná v CI, rovněž ve smyčce západky rychlých kontrol v `quality.yml`) blokuje, když počet překročí strop `metrics.boundaryOpenSseToSrc` v souboru `quality-baseline.json` — počáteční hodnota je nastavena na naměřených 771, `direction: down`; `--update` ji může pouze snížit; u PR se vyhodnocuje relativně vůči základní větvi (`--base-ref`, viz níže)                                                                                                                                                                                                                                         | Ano (západka)                                |
| `check:route-validation:t06`      | Schémata Zod jsou přítomna na všech trasách (zásady úrovně 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ano                                          |
| `check:any-budget:t11`            | Počet `@ts-expect-error // any` nepřekračuje rozpočet (brána úrovně 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ano                                          |
| `check:provider-consistency`      | Každý poskytovatel v `providers.ts` má odpovídající záznam v `providerRegistry.ts` (a naopak, v rámci seznamu povolených položek)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ano                                          |
| `check:model-lifecycle`           | Tři ručně udržované směrovací tabulky zůstávají konzistentní se snapshotem životního cyklu uloženým v repozitáři (#11503): `FITNESS_TABLE` (`taskFitness.ts`) neboduje žádný vyřazený identifikátor, na který může `REGISTRY` směrovat; každý cíl `BUILT_IN_ALIASES` je přítomen v `REGISTRY` a chybí ve snapshotu vyřazených identifikátorů; každý vyřazený identifikátor, který je stále v `REGISTRY`, je přesměrován nebo uveden v `allowedRetiredInCatalog`; a žádný zdroj ani cíl `DEFAULT_DEGRADATION_MAP` se v daném snapshotu nejeví jako vyřazený. To nedokazuje, že je model aktuálně poskytován aktivní upstream službou. Offline — porovnává se s `config/quality/model-lifecycle.json`, který se ručně aktualizuje pomocí `npm run quality:refresh-model-lifecycle` (vyžaduje síť; není zapojeno do CI). `allowedRetiredInCatalog` je postupně zpřísňovaná pojistka: záznam přidávejte pouze spolu se sledovacím issue. | Ano                                          |
| `check:fetch-targets`             | Každé `fetch("/api/...")` v klientském `src/` odkazuje na skutečný soubor `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ano                                          |
| `check:deps`                      | Všechny závislosti instalovatelné pomocí `npm install` napříč všemi soubory `package.json` v repozitáři jsou uvedeny v `dependency-allowlist.json`; nové závislosti bez připnuté verze nebo s překlepem napodobujícím název balíčku jsou označeny                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ano                                          |
| `audit:deps`                      | npm audit všech pěti nezávislých lockfilů (kořenového, pro Electron, pluginy OpenCode v1/v2 a poskytovatele). Kritická upozornění blokují; upozornění s vysokou závažností zůstávají viditelnými varováními. Chybějící/neúspěšné audity jsou označeny jako INCOMPLETE a blokují; hashe lockfilů a reporty pro jednotlivé oblasti se uchovávají.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ano                                          |
| `check:lockfile`                  | Integrita souboru `package-lock.json` — registr https, hashe integrity, žádná přepsání hostitele                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ano                                          |
| `check:licenses`                  | Seznam povolených licencí SPDX pro produkční závislosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ano                                          |
| `check:tracked-artifacts`         | Žádné artefakty sestavení / verzované symbolické odkazy `node_modules` (spouští se také v husky pre-commit; pre-push je záměrně nenáročný — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                          |
| `check:ai-attribution`            | Žádná patička `Co-Authored-By` od AI/bota ani patička o vygenerování pomocí AI v commitech, názvu nebo těle PR — pevné pravidlo č. 16 (ve smyčce rychlých kontrol `quality.yml` pro PR→`release/**` — čte datovou část události, mimo PR neprovádí žádnou akci — a krok pouze pro PR v lint kontrole `ci.yml` pro PR→`main`; také hook husky `commit-msg`; lidští spoluautoři jsou povoleni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:vitest-exclusions`         | Každé vyloučení Vitest uvádí sledovaný issue a je uvedeno v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ano                                          |
| `check:file-size`                 | Zdrojové soubory (`.ts`/`.tsx` v `src/`, `open-sse/`, `electron/`, `bin/`) nepřekračují limit `cap` a testovací soubory (`*.test.ts(x)`) limit `testCap`; soubory zmrazené v `file-size-baseline.json` (`frozen` / `testFrozen`) nesmí překročit svou zaznamenanou velikost                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ano                                          |
| `check:error-helper`              | Chybové odpovědi v executorech/handlerech používají `buildErrorBody()` / `sanitizeErrorMessage()` (Pevné pravidlo č. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ano                                          |
| `check:migration-numbering`       | Migrační soubory SQL jsou číslovány sekvenčně, bez mezer nebo duplicit                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ano                                          |
| `check:public-creds`              | Žádné literály OAuth `client_id`/`client_secret` ani webové klíče Firebase mimo `publicCreds.ts` (Pevné pravidlo č. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ano                                          |
| `check:db-rules`                  | Žádné přímé SQL mimo moduly `src/lib/db/`; žádné souhrnné importy z `localDb.ts` (Pevná pravidla č. 2/5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ano                                          |
| `check:known-symbols`             | Executory poskytovatelů, strategie směrování a překladače registrované v příslušných dispatch tabulkách odpovídají souborům na disku — žádné osiřelé ani nedeklarované symboly                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ano                                          |
| `check:route-guard-membership`    | Každá trasa, která spouští podřízený proces, je klasifikována pomocí `isLocalOnlyPath()` (Pevná pravidla #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ano                                          |
| `check:test-discovery`            | Každý soubor `*.test.ts` / `*.spec.ts` v repozitáři je zahrnut alespoň jedním nástrojem pro spouštění testů (rohatka: seznam nezařazených souborů v `test-discovery-baseline.json` se může pouze zmenšovat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ano                                          |
| `check:agent-skills-sync`         | Vygenerované artefakty dovedností agentů odpovídají jejich zdrojovému katalogu (bez odchylek)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:provider-asset-provenance` | Loga a další prostředky poskytovatelů mají zaznamenaný údaj o původu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `lint:json`                       | Konfigurační soubory JSON lze analyzovat a splňují pravidla kontroly repozitáře                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `typecheck:core`                  | Kompilace TypeScriptu bez chyb (pouze informativní upozornění)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ano                                          |
| `typecheck:noimplicit:core`       | Striktní `noImplicitAny` — výhledové pravidlo; mnoho již existujících míst volání stále vyžaduje anotace                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Informativní** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` omezené na `src/app/(dashboard)/**` (#7033) — pečlivě vybraný seznam 27 souborů v `typecheck:core` nezahrnuje žádné dashboardové TSX a ani `next build` u nich nikdy nekontroluje typy (`next.config.mjs` nastavuje `ignoreBuildErrors: true`), takže regrese osiřelých identifikátorů (#6625/#6909) byly pro CI neviditelné. Rozdíly se porovnávají se zmrazenou výchozí hodnotou počtu chyb pro každý soubor a kód TS (`config/quality/dashboard-typecheck-baseline.json`, stejný vzor vynucování neaktuálnosti jako u `check:known-symbols`) — kontrola selže pouze u NOVÝCH chyb nad rámec výchozího počtu; po opravě dříve existující chyby snižte výchozí hodnotu pomocí `--update`.                                                                                                                                                                                                                                     | Ano                                          |

### Úloha: `quality-gate`

Spouští se po `test-coverage`. Při selhání zablokuje sloučení.

| Skript                       | Ověřuje                                                                                                                                                                                           | Blokující                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `quality:collect`            | Vytvoří `quality-metrics.json` (počet varování ESLint, pokrytí ze sloučeného reportu dílčích běhů)                                                                                                | Ano (předchází postupnému zpřísňování) |
| `quality:ratchet`            | Žádná metrika v `quality-baseline.json` se nezhoršila (varování ESLint ≤ výchozí hodnota; pokrytí ≥ výchozí hodnota)                                                                              | Ano                                    |
| `check:duplication`          | Duplikace kódu (jscpd@4) nepřekračuje výchozí hodnotu v `quality-baseline.json`                                                                                                                   | Ano                                    |
| `check:complexity`           | Cyklomatická složitost na úrovni souboru nepřekračuje limit (základní pravidla ESLint `complexity` + `max-lines-per-function`)                                                                    | Ano                                    |
| `check:cognitive-complexity` | Postupné zpřísňování kognitivní složitosti (`eslint-plugin-sonarjs`) — samostatný průchod ESLint; CI spouští oba společně jako jediný krok `check:complexity-ratchets`                            | Ano                                    |
| `check:dead-code`            | Postupné zpřísňování nepoužívaných exportů / souborů (knip) se oproti výchozí hodnotě nezhoršilo                                                                                                  | Ano                                    |
| `check:compression-budget`   | Limit benchmarku komprese — minimální úspory tokenů pro jednotlivé enginy se nesmí zhoršit                                                                                                        | Ano                                    |
| `check:type-coverage`        | Postupně zpřísňované procento typově pokrytého kódu (`type-coverage`) se nezhoršilo; z velké části nahrazuje `typecheck:noimplicit:core`                                                          | Ano                                    |
| `check:codeql-ratchet`       | Počet otevřených upozornění CodeQL se nezhoršil (načítá se přes `gh api`; bez tokenu se kontrola korektně přeskočí) — frekvence obnovení a ruční spuštění: viz „Postupné zpřísňování CodeQL“ níže | Ano                                    |

### Úloha: `quality-extended`

Úloha blokuje příslušné kandidáty. Velikost balíčku, nálezy tajných údajů, nálezy zranitelností,
nálezy v pracovních postupech a změny OpenAPI se kontrolují pomocí povinného postupného zpřísňování.
Diagnostika cyklických závislostí zůstává pouze informativní. Instalace skenerů je povinná:
`scripts/ci/install-quality-scanners.sh` zajišťuje konkrétně připnuté verze a propaguje
selhání instalace. Chybějící nástroje, neplatné reporty nebo chybějící výchozí hodnoty ponechají
povinnou kontrolu skeneru ve stavu INCOMPLETE.

| Skript                   | Ověřuje                                                                                                                                                                                                                             | Blokování                                             |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `check:circular-deps`    | Žádné cyklické závislosti (dpdm)                                                                                                                                                                                                    | **Doporučující**                                      |
| `check:bundle-size`      | Velikost balíčku nepřekračuje limit; nedostupné měření způsobí selhání                                                                                                                                                              | **Blokující s --ratchet**                             |
| `check:secrets`          | Nálezy Gitleaks se nezhoršují; povinné kontroly odmítnou chybějící nástroje, zdroj či výchozí stav, neúspěšné kontroly a neplatné reporty                                                                                           | **Blokující s --ratchet**                             |
| `check:vuln-ratchet`     | Zranitelnosti závislostí se nezhoršují; povinné kontroly odmítnou chybějící nástroje, neplatné reporty nebo chybějící výchozí stav                                                                                                  | **Blokující s --ratchet**                             |
| `check:workflows`        | Kontrola workflow (actionlint + zizmor); chybějící či nefunkční skenery, neplatné reporty nebo chybějící výchozí stav ratchetu způsobí selhání se stavem INCOMPLETE. Platné nálezy se řídí vybranou zásadou strict/advisory/ratchet | Spuštění je povinné; ratchet zizmor je v CI blokující |
| `check:openapi-breaking` | Veřejný kontrakt API vůči připnutým commitům událostí (merge-base PR, předchozí stav před push, základ merge-group; u plánovaného/ručního spuštění první rodič checkoutu); povinné měření při chybě blokuje                         | **Blokující s --ratchet**                             |

### Úloha: `docs-sync-strict`

U pull requestů do `main` nebo `release/**` se tato úloha spouští pouze pro kandidáty, kteří nejsou konceptem (nebo jsou v důvěryhodné frontě) a jsou klasifikováni jako změny dokumentace nebo kódu. Spouští se také při událostech CI mimo PR; spouštěč push tohoto workflow zahrnuje pouze `main`, nikoli `release/**`. Krok, který skončí s nenulovým návratovým kódem, úlohu zablokuje; nálezy určené jen k hlášení a níže zdokumentované výjimky ji neblokují.

| Skript                         | Ověřuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Blokování                                                                                                                    |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `check:docs-all`               | Meta-brána, která postupně spouští 7 dílčích bran uvedených níže                                                                                                                                                                                                                                                                                                                                                                                                                        | Ano                                                                                                                          |
| ↳ `check:docs-sync`            | Konzistence verzí balíčku/OpenAPI/CHANGELOG, přesné zrcadlové kopie `llm.txt`, invarianty sekcí a velikosti přeloženého CHANGELOG a nepřítomnost duplicitních dokumentů, které již byly nahrazeny                                                                                                                                                                                                                                                                                       | Ano                                                                                                                          |
| ↳ `check:docs-frontmatter`     | Zkompilované stránky dokumentace obsahují platné nadpisy ve frontmatter                                                                                                                                                                                                                                                                                                                                                                                                                 | Ano                                                                                                                          |
| ↳ `check:docs-counts`          | Invarianty počtů s vysokou mírou jistoty se vynucují přísně; heuristické kontroly počtu souborů pouze varují, pokud skript neobdrží `--strict` (meta-brána v CI jej nepředává)                                                                                                                                                                                                                                                                                                          | Přísná úroveň blokuje; mírná úroveň pouze upozorňuje                                                                         |
| ↳ `check:env-doc-sync`         | Čtení proměnných prostředí ve zdrojovém kódu, `.env.example` a `docs/reference/ENVIRONMENT.md` jsou v souladu po uplatnění výslovných seznamů výjimek pro ignorované položky, položky pouze v dokumentaci a položky pouze v prostředí                                                                                                                                                                                                                                                   | Ano, mimo zdokumentované seznamy výjimek                                                                                     |
| ↳ `check:deprecated-versions`  | Hlásí potenciálně zastaralé verze mimo bezpečné historické kontexty a zastaralá data aktualizace; ignorované dokumenty vynechává                                                                                                                                                                                                                                                                                                                                                        | V aktuálním zapojení CI pouze upozorňuje (`--strict` se nepředává)                                                           |
| ↳ `check:doc-links`            | Interní markdownové odkazy v dokumentaci odkazují na existující soubory (ve formátu `[text]`/`(path)`)                                                                                                                                                                                                                                                                                                                                                                                  | Ano                                                                                                                          |
| ↳ `check:fabricated-docs`      | Trasy, proměnné prostředí, příkazy CLI, názvy hooků a cesty k souborům uvedené v dokumentaci existují v kódové bázi. Tvrdá brána přes `--strict`; bez příznaku pouze varování.                                                                                                                                                                                                                                                                                                          | Ano (přes `--strict` v CI)                                                                                                   |
| `check:cli-i18n`               | Klíče `t()` používané v CLI existují v `en`; `pt-BR` zachovává všechny sekce nejvyšší úrovně; `zh-CN` a `zh-TW` obsahují všechny klíče z `en`                                                                                                                                                                                                                                                                                                                                           | Ano                                                                                                                          |
| `check:openapi-coverage`       | Specifikace OpenAPI pokrývá alespoň ratchetem stanovenou minimální úroveň skutečných tras                                                                                                                                                                                                                                                                                                                                                                                               | Ano                                                                                                                          |
| `check:openapi-security-tiers` | Deklarované anotace `x-loopback-only`/`x-always-protected` musí být podloženy souborem `routeGuard.ts`; chyby parseru a neshody při dopředné kontrole blokují. Zpětná kontrola chybějícího `x-loopback-only` pod prefixy určenými pouze pro místní přístup varuje a trasy definované pouze vzorem jsou z tohoto zpětného průchodu vyloučeny.                                                                                                                                            | Kontroly parseru a dopředné kontroly blokují; zpětná kontrola pouze upozorňuje                                               |
| `check:openapi-routes`         | Každá cesta `/api...` v `openapi.yaml` odpovídá skutečné trase bez ohledu na parametry po uplatnění odůvodněného seznamu výjimek `KNOWN_STALE_SPEC`; neaktuální položky seznamu také způsobí selhání                                                                                                                                                                                                                                                                                    | Ano                                                                                                                          |
| `check:docs-symbols`           | Interní odkazy URL `/api/...` v kanonické dokumentaci, která není zrcadlovou kopií, odpovídají skutečné trase nebo rodině tras; odkazy na proxy/upstream/zástupné hodnoty/soubory a odůvodněné položky `KNOWN_STALE_DOC_REFS` jsou vyloučeny a neaktuální položky seznamu výjimek způsobí selhání                                                                                                                                                                                       | Ano                                                                                                                          |
| `i18n translation drift`       | Kontroluje hashe zdrojů/cílů základních dokumentů a původ překladu. Porovnání v PR připouští pouze totožná zděděná selhání; nové nebo neověřené nesrovnalosti zdroje, chybějícího cíle, hashe cíle, zastaralého překladu nebo mezipaměti oddílů blokují. Mimo porovnání v PR selhání zdroje/chybějícího cíle/hashe cíle blokují, zatímco zastaralé překlady a nekonzistentní mezipaměti oddílů zůstávají pouze upozorněním. Chybějící mezipaměť oddílů ve starém formátu není selháním. | Nová/neověřená odchylka v PR blokuje; totožná zděděná odchylka je pouze upozorněním; pravidla mimo PR závisí na typu selhání |

### Úloha: `i18n-ui-coverage`

| Skript                            | Ověřuje                                                                                                                                                                                                                            | Blokující     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (inline) | Pokrytí klíčů i18n uživatelského rozhraní je ≥ 65 %                                                                                                                                                                                | Ano           |
| `check-ui-value-drift` (inline)   | Přepsaná anglická **hodnota** nezanechává zastaralý překlad                                                                                                                                                                        | Ano           |
| `check-new-key-coverage` (inline) | **Nový** anglický klíč je přeložen ve všech jazykových mutacích — značka `__MISSING__:` je odmítnuta                                                                                                                               | Ano           |
| `check-translation-ratio`         | Podíl skutečných překladů v jednotlivých jazykových mutacích (hodnoty shodné s angličtinou / zástupné hodnoty / chybějící položky mimo seznam výjimek) nesmí překročit `config/quality/i18n-translation-baseline.json` + toleranci | **Blokující** |

Vyžaduje `fetch-depth: 0` — kontrola změn hodnot porovnává `en.json` se společným předkem větví.

#### `check-ui-value-drift` — kontrola zastaralých překladů

Odhaluje jeden typ regrese i18n, který ostatní kontroly ze své podstaty nemohou zachytit: anglická hodnota
je přepsána, ale překlady odvozené z _předchozí_ anglické verze zůstanou zachovány, takže
uživatelé mimo anglické prostředí nadále čtou sebejistě formulovaný, ale nyní nesprávný text.

K tomu skutečně došlo v produkci. `oauthModal.googleOAuthWarning` byl přepsán při zavedení pomocníka
pro přihlášení Antigravity (#5203); **39 ze 43 jazykových mutací** si zachovalo text, který operátorům říkal, aby „zkopírovali
celou adresu URL a vložili ji níže“ — postup, který u tohoto poskytovatele nelze dokončit. Problém zůstal
bez povšimnutí až do #8463, protože:

- `sync-ui-keys` doplňuje pouze klíče, které **chybějí**, nikdy ty, které jsou **zastaralé**;
- `check-ui-keys-coverage` počítá _přítomnost_ klíčů, takže zastaralý překlad je považován za pokrytý;
- `check-translation-drift` sleduje zrcadla dokumentace `docs/i18n/<locale>/**.md` —
  soubory `src/i18n/messages/*.json` vůbec nečte. Od opětovné synchronizace 2026-09 je kontrola blokující v úloze
  `docs-sync-strict`: upravte základní dokument → `npm run i18n:run -- --files=<doc>` (po jednotlivých sekcích, nenáročné).

**Zohledňuje rozdíly, nepoužívá výchozí stav.** Porovnává `en.json` ve společném předku větví
s pracovním stromem; pro každý klíč, jehož anglická hodnota se změnila, je každá jazyková mutace, která stále obsahuje
nezměněný překlad, považována za zastaralou. Tím se záměrně **zmrazí již existující dluh** — z rozdílu
nelze zjistit, ze které staré anglické verze dlouhodobě existující překlad pochází, proto kontrola posuzuje
pouze to, čeho se aktuální změna dotýká. Alternativa (výchozí stav hashů pro jednotlivé klíče) by znamenala
vygenerovaný soubor o velikosti přibližně 600 KB, tedy trojnásobek největšího existujícího výchozího souboru, který by se měnil při každém PR s úpravami i18n.

Kontrolu lze splnit dvěma způsoby:

1. aktualizovat dotčené překlady, nebo
2. nastavit je na `__MISSING__:<new english>` — běhové prostředí pak poskytne opravenou anglickou verzi
   (`src/i18n/request.ts::deepMergeFallback`, #7258) a klíč se zařadí do fronty k překladu.

Pokud se změnil **význam** řetězce, upřednostněte **přejmenování klíče**: nový klíč nemůže zdědit
zastaralý překlad. Tento postup byl použit v #8463.

```bash
npm run i18n:check-value-drift          # striktní režim (spouštěný v CI)
npm run i18n:check-value-drift:warn     # pouze hlášení
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Brány pro posun hodnot a nové klíče sdílejí jedno neměnné porovnání ze
`scripts/i18n/resolve-ui-diff-base.mjs`. Workflow předává oběma kontrolám stejné SHA základu, špičky základu a
kandidáta. Spuštění pro PR / změnu cílové větve základu, push a skupinu sloučení používají kontext příslušné
události. Ruční spuštění pro kandidátní větev vyžaduje její přesně odpovídající otevřený PR nebo explicitní
vstup `i18n_base_sha`. Ruční nebo naplánované pozorování větve `main` či `release/vX.Y.Z`
bez tohoto vstupu porovnává poslední commit s jeho prvním rodičem; nejde o audit
veškerého zděděného dluhu v překladech. Místní spuštění vyžaduje explicitní základ porovnání,
například výše uvedený příkaz `BASE_REF`.

Chybějící nebo nejednoznačný kontext porovnání, nečitelný či neplatný požadovaný katalog a
změněný kandidát vedou ke stavu `INCOMPLETE` s návratovým kódem **2**, a to i ve varovném režimu.
Katalogy se načítají pomocí `scripts/i18n/read-ui-catalog.mjs`; chyby při čtení nejsou nahrazovány
prázdnými objekty. Nedostupný základ ani neúplný vstup neznamenají stav PASS.

### Úloha: `i18n`

Úplná matice validace i18n (jedna úloha pro každou jazykovou mutaci). Celá úloha je informativní.

| Skript                          | Ověřuje                                         | Blokující                                                    |
| ------------------------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | Úplnost překladu jednotlivých jazykových mutací | **Informativní** (`continue-on-error: true` pro celou úlohu) |

### Úloha: `pr-test-policy`

Spouští se pouze u pull requestů.

| Skript                 | Ověřuje                                                                                                                                             | Blokující |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR, které mění produkční kód v `src/`, `open-sse/`, `electron/` nebo `bin/`, musí zahrnovat nebo aktualizovat testy (pevné pravidlo č. 8)           | Ano       |
| `check:test-masking`   | Změněné testovací soubory nesnižují celkový počet asercí ani nepřidávají tautologie `assert.ok(true)`                                               | Ano       |
| `check:pr-evidence`    | Tělo PR uvádí důkazy z testů/VPS pro danou změnu (automatizuje pevné pravidlo č. 18 prohledáváním textu PR — křehké, viz seznam nevyřízených úkolů) | Ano       |

### Úloha: `test-vitest`

Vyžaduje úlohu klasifikace `changes`. Příslušné části matice při selhání zablokují sloučení.

| Sada             | Ověřuje                                                     | Blokující                                                                                                                 |
| ---------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Server MCP (110 nástrojů), autoCombo, cache — runner vitest | Ano                                                                                                                       |
| `test:vitest:ui` | Testy komponent uživatelského rozhraní — runner vitest      | **Blokující** — již existující selhání jsou explicitně vyloučena v `vitest.config.ts`; nová selhání způsobí selhání úlohy |

### Noční pracovní postupy (plánované, informativní)

Tyto postupy se spouštějí podle plánu cron (a pomocí `workflow_dispatch`), nikdy u PR. Všechny jsou informativní.

| Pracovní postup        | Ověřuje                                                                                                                                                                 | Blokující        |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | Testy vlastností fast-check s náhodným seedem a vysokým počtem běhů                                                                                                     | **Informativní** |
| `nightly-resilience`   | Kontrola růstu haldy, chaosové vkládání chyb, zátěžové/dlouhodobé testy k6                                                                                              | **Informativní** |
| `nightly-llm-security` | Ochrana promptfoo proti injekcím (režim blokování) + sondy garak (přeskočeno bez tajného klíče poskytovatele)                                                           | **Informativní** |
| `nightly-schemathesis` | Fuzzing kontraktu OpenAPI (schemathesis) proti běžící instanci OmniRoute pomocí `docs/openapi.yaml` — odhaluje porušení specifikace / neošetřené chyby 500 (Fáze 8 B.4) | **Informativní** |
| `nightly-mutation`     | Skóre mutačního testování Stryker nad rychlou sadou jednotkových testů — přeživší mutanty odhalují slabá ověření                                                        | **Informativní** |
| `nightly-compat`       | Matice kompatibility enginu Node napříč podporovanými rozsahy `engines.node`                                                                                            | **Informativní** |

Výkonnostní referenční hodnoty (halda, TTFB, doba sestavení) se zaznamenávají, ale nejsou vynucovány: viz [`PERF_BASELINE.md`](../ops/PERF_BASELINE.md) (`npm run perf:lts-baseline`).

---

## Fáze velocity (2026-08-30 → v4.0 LTS): všechny výchozí limity uvolněny o 20 %

Rozhodnutí vlastníka (2026-08-30): až do modularizace ve verzi v4.0 je rychlost vydávání důležitější
než udržení technického dluhu na stávající úrovni. Každý **číselný** výchozí limit ráčny byl v jednom
auditovatelném kroku uvolněn o 20 % a fáze je deklarována v `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Co se změnilo                                                                                                                                                                                    | Kde                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — počty, kde je méně lépe, ×1.2; procenta, kde je více lépe, ÷1.2 (minimum pokrytí zůstalo 60, `eslintErrors` zůstává 0, `eslintWarnings` 0 → 20 % zmrazeného počtu potlačení) | `quality-baseline.json` (poznámka `_relax_velocity_2026_08_30` uvádí všechny změny před → po)          |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                 | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, limit řádků pro každou položku `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                              | `file-size-baseline.json`                                                                              |
| počty na soubor / na kód TS ×1.2                                                                                                                                                                 | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                              | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` je pouze doporučující, když `_policy.requireTighten === false`                                                                                                               | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| noční úloha `bank-ratchet-shrinks` je pozastavena (uložila by naměřené snížení do výchozího stavu, a tím zrušila rezervu)                                                                        | `.github/workflows/nightly-release-green.yml`                                                          |

Seznamy povolených výjimek (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nejsou** rozpočty a nebyly změněny. Zásady kontrolních bran typu úspěch/neúspěch (tajné údaje, pravidla SQL,
kontrakt dokumentace/proměnných prostředí, shoda i18n, jednotkové testy) zůstávají beze změny — neúspěšný test je stále neúspěšný test.

**Nástroje**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — jednorázové
  uvolnění (`scripts/quality/relax-baselines.mjs`); odmítne se spustit dvakrát se stejnou poznámkou.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  měří každou číselnou bránu stejným způsobem jako CI a vypisuje zbývající rezervu pro každou bránu
  (`scripts/quality/baseline-headroom.mjs`). Noční úloha `baseline-headroom` zveřejňuje
  tabulku v souhrnu běhu workflow a nahrává svou sestavu ve formátu JSON/Markdown jako
  `baseline-headroom-<run_id>` s dobou uchování 90 dní. Řádky s varováním a kritickým stavem označují brány,
  které jsou v rozmezí 10 % od svého limitu nebo jej již překročily. Tyto sestavy kontrolujte jako včasné
  varování před vyčerpáváním rozpočtů; prozkoumejte poznámky `_rebaseline_*` příslušné brány. Úloha již
  nevytváří ani neaktualizuje trvalý problém; #12149 uchovává historii dřívějších sestav.

**Režim nového kódu (Clean-as-You-Code) — od 2026-08-30, pouze rychlá cesta pro PR**

Při událostech `pull_request` předává `quality.yml` parametr `--base-ref <PR base SHA>` kontrolám `check:file-size`,
`check:complexity-ratchets` a `check:dead-code`. U kontrol `check:complexity-ratchets` a
`check:dead-code` brána porovnává HEAD se společným základem sloučení **omezeně pouze na soubory změněné daným PR**
(`scripts/check/newCodeMode.mjs`: společný základ sloučení je materializován v dočasném
`git worktree`, ESLint/knip se spustí v něm i na HEAD a počty pro jednotlivé soubory se porovnají):

- **blokující** — PR přidal porušení cyklomatické/kognitivní složitosti nebo nepoužívané exporty v souborech, které změnil
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` v protokolu);
- **poradní** — globální součet oproti zmrazené výchozí hodnotě. Zděděná odchylka nikdy neoznačí
  nevinný PR červeně; odchylka se sleduje kvůli nápravě při sesouhlasení vydání a monitoruje ji
  úloha pro kontrolu rezervy.

`check:file-size` používá základní referenci podle vlastních pravidel (`scripts/check/check-file-size.mjs`, #8522):
kontroluje každý zdrojový a testovací soubor ve stromu, pomocí `git show` načte počet jeho řádků v základu PR
a soubor označí jako neúspěšný pouze tehdy, když jeho velikost překročí vyšší z hodnot: výchozí strop
(`frozen` / `testFrozen`, nebo `cap` / `testCap` pro soubor mimo výchozí stav) a jeho velikost
v základu. Soubor, který se již v základu odchýlil, proto nikdy nezpůsobí selhání nevinného PR.

`check:boundary:ratchet` aplikuje stejné pravidlo na svou jedinou číselnou hodnotu
(`scripts/quality/measure-boundary.mjs --ratchet --base-ref <sha>`): při událostech PR předávají jak
rychlé kontrolní brány v `quality.yml`, tak lintovací úloha v `ci.yml` základní SHA PR, základní commit se
měří z exportu `git archive` a PR selže pouze tehdy, když počet jeho hran `open-sse → src`
překročí vyšší z hodnot `metrics.boundaryOpenSseToSrc` a počtu na základní větvi. Odchylka základu
nad limitem je nahlášena (`base drift herdado`), ale nikdy nezpůsobí selhání nevinného PR; push → main
nadále používá absolutní limit a nepřeložitelný základní SHA se k němu s varováním vrátí.

Spuštění `workflow_dispatch`, závěrečná kontrola zeleného stavu releasu a noční úloha pro rezervu nemají základ
PR a zachovávají absolutní (globální) porovnání. Pokrytí, duplicita a pokrytí typy zatím zůstávají globální
(jejich nástroje nedokážou levně vytvořit diff po jednotlivých souborech) — jsou však kandidáty na stejné zacházení.

**Uzavření fáze ve v4.0 (LTS = přísnější než dříve, nikoli „návrat k normálu“)**

1. Na čistém vrcholu `release/v4.0.0`: pro záznam spusťte `npm run quality:headroom --json`, poté
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` a `--update` každé kontrolní brány typechecku
   — každá výchozí hodnota klesne na naměřenou hodnotu.
2. Odstraňte `_policy` z `quality-baseline.json` (znovu aktivuje `--require-tighten` a noční
   ukládání rezervy), obnovte `THRESHOLD = 36` (nebo vyšší) v `check-openapi-coverage.mjs`.
3. Zpřísněte limity nad rámec naměřených hodnot tam, kde se modularizace vyplatila: `cap` velikosti souboru zpět na 1000
   (nebo 800), minima pokrytí +5, počet nepoužívaných exportů 0 pro modularizované balíčky.

## Výchozí stav ráčny (`quality-baseline.json`)

Mechanismus ráčny (`scripts/quality/check-quality-ratchet.mjs`) načítá soubor `quality-baseline.json`
a porovnává jej s nově získaným souborem `quality-metrics.json`. Jakákoli metrika, která se zhorší
o více než příslušná hodnota epsilon, způsobí selhání sestavení.

Aktuálně sledované metriky:

| Metrika               | Směr   | Význam                                |
| --------------------- | ------ | ------------------------------------- |
| `eslintWarnings`      | `down` | Počet varování ESLint se nesmí zvýšit |
| `coverage.statements` | `up`   | Pokrytí příkazů se nesmí snížit       |
| `coverage.lines`      | `up`   | Pokrytí řádků se nesmí snížit         |
| `coverage.functions`  | `up`   | Pokrytí funkcí se nesmí snížit        |
| `coverage.branches`   | `up`   | Pokrytí větví se nesmí snížit         |

Aktualizace výchozího stavu po skutečném zlepšení:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Příznak `--update` zapíše aktuálně naměřené hodnoty do souboru `quality-baseline.json`.
Tento soubor commitněte společně se změnou, která metriku zlepšila. PR, který zlepší
metriku bez aktualizace výchozího stavu, bude zachycen pomocí `--require-tighten` (Fáze 6A.5,
implementace se připravuje).

### Ráčna CodeQL: četnost aktualizace a ruční spuštění

`check:codeql-ratchet` načítá **stav repozitáře, který se aktualizuje podle plánu — nikoli pro každý PR.**
Příkaz `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` hlásí
`state: configured`, `schedule: weekly`: jedná se o kontrolu výchozího nastavení GitHubu, nikoli o analýzu
při každém pushi. Důsledek: po sloučení PR, který OPRAVUJE výstrahy, ráčna nadále načítá
starý, vyšší počet až do spuštění následující plánované kontroly — takže hlásí regresi
u každého otevřeného PR, včetně následných změn samotného opravného PR, dokud kontrola stav neaktualizuje.

**Ruční aktualizace**: `gh workflow run codeql.yml --ref release/vX.Y.Z` znovu spustí
analýzu a během několika minut znovu zveřejní výstrahy. Nejprve si přečtěte `.github/workflows/codeql.yml`
— jeho záhlaví vysvětluje, že používá pouze `workflow_dispatch`, **protože je v konfliktu s
„výchozím nastavením“ GitHubu** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Obnovení triggerů `push`/`pull_request`/
`schedule` vyžaduje nejprve **akci vlastníka**: Settings → Code security →
CodeQL: Default → Advanced. Bez tohoto přepnutí trigger `schedule:` nepřidávejte — pouze
způsobí neúspěšná spuštění.

**Po snížení počtu zpřísněte výchozí stav** — příkaz `node scripts/check/check-codeql-ratchet.mjs
--update` zapíše nový naměřený počet do `quality-baseline.json` →
`metrics.codeqlAlerts.value`, takže ráčna nebude tiše povolovat regresi zpět
ke starému limitu. Praktický příklad (2026-09-02/03): PR #12502 opravil 7 skutečných výstrah
(13 → 6 naměřených otevřených); PR #12530 zpřísnil zmrazený výchozí stav z 11 → 6, aby odpovídal skutečnosti;
zbývajících 6 výstrah bylo následně zamítnuto s individuálním odůvodněním pro každou z nich, čímž počet otevřených klesl na 0.

**O zamítnutí rozhoduje operátor (Pevné pravidlo č. 14)** — nikdy nezamítejte výstrahu CodeQL,
aniž byste do komentáře k zamítnutí zaznamenali technické odůvodnění: `won't fix` pro
požadavek nadřazeného protokolu, `used in tests` pro testovací přípravek, `false positive`
pro sanitizaci, kterou CodeQL nedokáže rozpoznat (precedent: `docs/security/ERROR_SANITIZATION.md`).

---

## Zásady opakování testů (WS5.4, v3.8.49)

Opakování se nastavuje pro jednotlivé runnery, nikdy plošně globálně — plošné opakování mění skutečné regrese
na neviditelné nahodilé chyby:

| Runner           | Zásady                                                                                                                                   | Proč                                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` pouze v CI, s `trace: on-first-retry`                                                                                       | Časování prohlížeče/sítě je skutečně nedeterministické; jedno opakování se záznamem mění nahodilou chybu na diagnostikovatelný artefakt |
| Vitest           | ŽÁDNÉ globální opakování. Prokazatelně nestabilní test dostane explicitní opakování pro daný test (viditelné v diffu, kontrolované v PR) | Udržuje seznam testů v karanténě v repozitáři, nikdy neprůhledný                                                                        |
| node:test (unit) | NIKDY neopakovat                                                                                                                         | Nestabilní jednotkový test je chyba v testu — opravte jej, nespouštějte jej pouze znovu                                                 |

Cílové SLO po nasazení telemetrie nahodilých chyb (WS5.2/5.3): <1% míra nahodilých chyb na test
(prahová hodnota „opravit ihned“), ≥95% úspěšnost na pipeline. Referenční hodnoty z oboru —
znovu je zkalibrujte podle našich vlastních měření.

## Posun západky na úrovni releasu (WS5.5, v3.8.49)

Když dojde k regresi západky (velikost souboru, složitost, varování eslint) na ČISTÉM vrcholu
releasu — tj. regresi způsobila KOMBINACE mergů a žádný jednotlivý PR ji nereprodukuje
ve své vlastní větvi — náprava náleží **kapitánovi releasu, jednorázově, ve větvi
releasu**: upřednostněte extrakci/refaktoring; novou základní hodnotu nastavte pouze se
zdokumentovaným odůvodněním. Nikdy nepřenášejte kombinovaný posun na PR přispěvatele
a nikdy nenastavujte novou základní hodnotu pro jednotlivé PR (tím by se skryly skutečné regrese).
Nejprve rozlište příčinu: před předpokladem, že ji způsobil váš PR, reprodukujte červený
stav proti čistému vrcholu v průzkumném worktree.

## Ukládání snížení západek — směr dolů (#8584)

Západka je automatická pouze napůl, a navíc jde o nesprávnou polovinu. **Zvýšení** limitu je
ruční úprava JSON, která trvá deset sekund a představuje nejrychlejší způsob, jak odblokovat
červený PR. **Snížení** vyžaduje, aby někdo spustil `--update` a výsledek commitnul — a dokud
nebyla nasazena úloha `bank-ratchet-shrinks`, žádný workflow ji nespouštěl. Naměřený důsledek
(2026-07-25): 18 zmrazených souborů již bylo na úrovni limitu 800 řádků pro nové soubory nebo pod ní,
přičemž nejhorší případ dosahoval 132× (`src/shared/validation/schemas.ts`, 19 řádků s limitem 2,523);
strop složitosti se v průběhu přibližně 37 poznámek o změně základní hodnoty posunul
z `1794 → 2169`, přičemž nastalo právě jedno snížení (−1); a text „zpřísnit pomocí `--update`
v příštím cyklu“ byl zapsán 31krát a dodržen jednou. Limit, který přetrvá kód, jenž byl
důvodem jeho vzniku, tiše mění každý dokončený rozklad na rezervu pro růst pro kohokoli,
kdo soubor upraví jako další.

`nightly-release-green.yml` → úloha **`bank-ratchet-shrinks`** tuto smyčku uzavírá:

|                |                                                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| Spouští se při | `schedule` (3×/den) + `workflow_dispatch` — záměrně **nikoli** při `push`                                        |
| Měří           | nejvyšší `release/vX.Y.Z`, se stejným rozlišením a ochranou proti vložení jako `release-green`                   |
| Zapisuje       | `check:file-size --update` a `check:complexity-ratchets --update` (obojí svou konstrukcí umožňuje pouze snížení) |
| Ověřuje        | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                         |
| Dodává         | jeden vždy aktuální PR proti větvi releasu — aktualizovaný vynuceně, nikdy nevytvářený opakovaně                 |

Ukládání se provádí dávkově, nikoli při každém pushi, protože nemá žádné požadavky na latenci
(uložení snížení do 8 hodin je v pořádku), zatímco spuštění při každém mergi by během slučovacích
kampaní opakovaně sestavovalo větev PR a pokaždé platilo za úplný průchod ESLintem. Detekce
zůstává navázána na push (`release-green`); dávkově probíhá pouze ukládání.

### Bezpečnostní ověřovač

Úloha zapisuje do základních hodnot bez dozoru, takže přijatelnost tohoto postupu zajišťuje
`verify-ratchet-bank.mjs`. Porovná strom po provedení `--update` se stavem `HEAD` a **ukončí úlohu
předtím, než existuje jakýkoli commit** — bez otevření PR — pokud každá změna není jednou z následujících:

- číselná položka `frozen` / `testFrozen` byla **snížena** nebo **odebrána**
- `complexity-baseline.json` → `count` bylo **sníženo**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` bylo **sníženo**

Cokoli jiného selže: zvýšení čísla, přidání položky, změna `cap`/`testCap` nebo
odstranění/přepsání poznámky `_rebaseline_*` (tyto poznámky tvoří auditní stopu vysvětlující,
proč každý strop existuje, a jsou uloženy uvnitř stejného objektu `frozen` jako položky souborů).
Bot, který by mohl zvýšit limit, by byl jednoznačně horší než současný stav. Ochrana proti regresi:
`tests/unit/verify-ratchet-bank.test.ts`.

Úloha nikdy neprovádí push do `release/*` — PR merguje člověk, takže nesprávné měření
nemůže být začleněno bez kontroly.

## Zásady seznamu povolených výjimek

Každá brána, která nemůže selhat kvůli již existujícím porušením, používá zmrazený seznam povolených výjimek
(např. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Platí následující zásada:

**Opravte základní příčinu; seznam povolených výjimek použijte pouze tehdy, když porušení již existovalo a
nelze je opravit ve stejném PR.**

Při přidávání položky do seznamu povolených výjimek:

1. Přidejte komentář se zdůvodněním.
2. Odkazujte na sledovací issue (např. `// #3498 — Phase 2 feature, not yet implemented`).
3. Položku odstraňte ve stejném PR, který porušení opravuje — zastaralá položka, která již
   nepotlačuje aktivní porušení, je sama o sobě vadou (kontrola zastaralého vynucování 6A.3
   po implementaci způsobí selhání brány kvůli osiřelé položce seznamu povolených výjimek).

**Nepřidávejte** položky do seznamu povolených výjimek jen proto, aby testy prošly rychleji. Zelená brána s rostoucím
seznamem povolených výjimek vytváří falešný pocit kvality.

### Když brána ve vašem PR selže

1. **Pečlivě si přečtěte výstup brány** — přesně uvádí, který soubor nebo symbol
   porušil pravidlo.
2. **Opravte porušení** — většina bran jsou deterministické kontroly souborového systému, které projdou, jakmile
   je kód správný.
3. **Pokud porušení již existovalo** (tj. nezavedli jste je vy, ale brána je nyní
   kontroluje): přidejte položku do seznamu povolených výjimek s komentářem obsahujícím zdůvodnění a odkazem na sledovací issue.
4. **Pokud je brána typu ratchet** (pokrytí, varování ESLint, duplicita, složitost):
   vaše změna metriku zhoršila. Opravte základní problém nebo (výjimečně) spusťte
   `npm run quality:ratchet -- --update`, pokud je změna záměrná a zhoršení metriky
   přijatelné — v popisu PR však zdokumentujte proč.
5. **Poradní brány** (`continue-on-error: true`) jsou pouze informativní — neblokují
   sloučení, ale zobrazují se v souhrnu CI. Přesto je opravte.

---

## Přidání nové kontroly

1. Vytvořte `scripts/check/check-<name>.mjs` (nebo `.ts`). Kontroly zásad končí s kódem 0/1.
   Západkové kontroly zapisují metriku do `quality-metrics.json` prostřednictvím `collect-metrics.mjs`.
2. Přidejte `"check:<name>": "node scripts/check/check-<name>.mjs"` do souboru `package.json` a
   synchronizujte alias a jeho přesný příkaz v souboru `config/quality/gate-manifest.json`.
   Stejnou synchronizaci proveďte při změně nebo odebrání existujícího validačního aliasu.
   Spusťte `npm run check:gate-manifest`; hook před commitem a klasifikace změn v CI
   vynucují dodržování této smlouvy.
3. Zapojte ji v `.github/workflows/ci.yml` do příslušné úlohy
   (zásady → `lint` nebo `docs-sync-strict`; západka → `quality-gate`).
4. Pokud používá seznam povolených výjimek, aplikujte `reportStaleEntries()` z
   `scripts/check/lib/allowlist.mjs`, aby byly zastaralé položky automaticky detekovány.
5. Napište test v `tests/unit/build/`, který pokryje detekční logiku kontroly.
6. Aktualizujte tento dokument (přidejte řádek do tabulky příslušné úlohy).

---

## Nástroje pro agenty: LSP-in-the-loop (volitelné)

Kromě kontrol CI obsahuje OmniRoute **volitelnou** kostru `agent-lsp`
(soubor `.mcp.json` na úrovni projektu, Fáze 7, Úloha 15). Vytvořením `.mcp.json`
zpřístupníte programovacím agentům jazykový server TypeScript, aby dokázali vyhledat symboly /
diagnostiku **před** zápisem kódu — jde o doplněk ke `typecheck:core` založený na principu „nejprve zkompilovat, potom tvrdit“,
který omezuje chyby způsobené „vymyšlenými symboly“ přímo u zdroje. Záměrně se
nenačítá automaticky (most MCP↔LSP si vybíráte a ověřujete sami); nefunkční položka pouze zaznamená
chybu připojení a nikdy nenaruší relace.

---

## Backlog racionalizace (revize ROI — Fáze 9 Vlna 3)

Tento soupis byl 2026-06-17 porovnán s `ci.yml` (předchozí verze vynechávala
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Revize ROI sjednocené sady
identifikovala následující kandidáty na racionalizaci. **Sloučení představují mechanické
změny CI; přepnutí či odstranění jsou rozhodnutí o zásadách vyhrazená provozovateli.** Nic
z níže uvedeného zatím nebylo aplikováno.

**Výše také nezdokumentováno** (informativní, nízká vypovídací hodnota): úloha `docs-lint`
(markdownlint + Vale, celá úloha používá `continue-on-error`) a samostatné pracovní postupy skenerů
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. Hodnota `semgrepFindings: 0` je uvedena v
`quality-baseline.json`, ale v `ci.yml` není napojena na blokující západku — metrika je
aktuálně osiřelá.

### Sloučení / odstranění duplicit (mechanické, nižší riziko)

Každý kandidát byl 2026-06-17 ověřen proti aktuálnímu stavu kontrol (důvěřuj, ale prověřuj);
ukázalo se, že několik „zjevných“ sloučení skrývá dluh a **nejsou** přímou čistou náhradou.

- **`check:docs-sync` se spouští dvakrát** — samostatně v úloze `lint` a znovu uvnitř `check:docs-all` (`docs-sync-strict`) a pre-commit hooku husky. ✅ **HOTOVO** — samostatné spuštění v úloze `lint` bylo odstraněno.
- **Skenování CVE** — ❌ **NEJDE o čisté sloučení.** `audit:deps` blokuje kritická upozornění a neúplné audity ve všech pěti lockfilech, zatímco upozornění s vysokou závažností podle aktuálních zásad hlásí jako varování; `check:vuln-ratchet` (osv) selže pouze při _regresi_ vůči baseline uložené v repozitáři a v případě potřeby odmítne chybějící měření. Odlišná sémantika — odstraněním `audit:deps` by se ztratila absolutní kontrola kritických nálezů a nezávislé doklady o auditu balíčků. Zachovejte obě.
- **Detekce cyklů** — ✅ **HOTOVO** (#15159 G-01/G-02). Původní text zde označoval `check:cycles` za „zelenou, spravovanou“ kontrolu a zdůvodňoval její zachování jako blokující tím, že `check:circular-deps` (dpdm) hlásil 91 cyklů. Tento zelený stav byl **falešně pozitivní**: `check:cycles` procházel 5 podadresářů (450 souborů), odpovídal pouze statickým konstrukcím `import|export … from` a zahazoval každý specifikátor `@/` a `@omniroute/open-sse/`, takže nemohl vidět cykly dynamických importů a aliasů, které v repozitáři převažovaly. Opraveno: kontrola nyní prochází `src` + `open-sse` (5023 souborů), získává specifikátory z AST TypeScriptu (takže `import("…")` se započítává, zatímco `typeof import("…")` v typové pozici nikoli) a překládá `paths` z tsconfigu. Nachází **14** cyklů, nikoli 0. Protože 14 již existujících cyklů nelze opravit v PR zavádějícím kontrolu, `check:cycles` je nyní **západka** (`--ratchet`, strop `metrics.cycles.value = 14` v `quality-baseline.json`, `direction: down`) — blokuje jakoukoli _regresi_ a počet může pouze klesat. CI spouští `npm run check:cycles:ratchet`. Postupné snižování probíhá v rámci **A-01**. `check:circular-deps` (dpdm) zůstává informativní jako širší druhý názor.
- **Složitost** — ✅ **HOTOVO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jeden průchod ESLintu, počítání podle ruleId, takže baseline pro cyklomatickou složitost + maximální počet řádků a baseline pro kognitivní složitost zůstávají nezávislé; jednotlivé kontroly `check:complexity` / `check:cognitive-complexity` zůstávají zachovány pro lokální použití s `--update`.
- **Ochrana proti halucinacím `/api`** — ✅ **HOTOVO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jeden soupis `src/app/api` ze souborového systému, openapi-routes + docs-symbols se nadále hlásí nezávisle; jednotlivé kontroly zůstávají zachovány pro lokální spuštění.
- **`check:node-runtime` se spouští v 11 úlohách** — ⚠️ **nízké ROI.** Každá používá samostatný runner a kontrola trvá <1 s; celková úspora činí přibližně 10 s za cenu ztráty levné ochrany pro každou úlohu. Nestojí to za související změny.
- **`typecheck:noimplicit:core` v lintování CI** — ✅ **odstraněno z úlohy lint** (bylo informativní s `continue-on-error`); blokující plochu typů tvoří `typecheck:core` + `check:type-coverage`. Lokální skript byl zachován.

### Přepnutí / rozhodnutí (zásady provozovatele)

- `check:openapi-security-tiers` (informativní) — ❌ **NELZE čistě přepnout.** Končí s kódem 0, ale varuje, že několika trasám `traffic-inspector` pod `LOCAL_ONLY_API_PREFIXES` chybí anotace `x-loopback-only: true`. Jeho vynucení nejprve vyžaduje přidání těchto anotací do `openapi.yaml`.
- `typecheck:noimplicit:core` (informativní) — je z velké části nahrazen blokující západkou `check:type-coverage`. Přepněte jej na západku, nebo odstraňte redundantní druhý průchod `tsc`.
- `test:vitest:ui` (nyní **blokující**) — již existující selhání jsou explicitně vyloučena v `vitest.config.ts` pomocí sledovacích komentářů `// #8618`; nová selhání způsobí selhání úlohy.
- `check:secrets` (gitleaks, blokující západka) — aktuálním stropem je `metrics.secretFindings` v `quality-baseline.json`. Každá výjimka vyžaduje odůvodněnou položku v `.gitleaks.toml`; nedostupné měření je INCOMPLETE. Sken doplňuje nativní skenování tajných údajů na GitHubu a `check:public-creds`.
- `check:pr-evidence` (blokující, prohledává prózu v těle PR pomocí grep) — vysoké riziko falešně pozitivních výsledků; odstranění oslabí vynucování Hard Rule #18, takže jde o skutečné rozhodnutí o zásadách.
- `semgrep` (samostatný informativní nástroj) — pro rodiny OWASP se překrývá s CodeQL; napojte jeho baseline na západku, nebo jej odstraňte.

---

## Související dokumentace

- Dodavatelský řetězec (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kontrola shody sad klíčů

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, úloha `i18n-ui-coverage`).
Porovnává sadu koncových klíčů každého souboru `src/i18n/messages/<locale>.json` se souborem `en.json` a selže
při jakémkoli chybějícím nebo nadbytečném koncovém klíči bez ohledu na to, kdy byl klíč přidán. Zástupné hodnoty
`__MISSING__:` se počítají jako přítomné (jejich obsah řeší kontrola poměru). Jde o absolutní doplněk
dvou kontrol založených na rozdílech či procentech: `check-ui-keys-coverage` vynucuje pro každé
národní prostředí minimální hranici 80 % (43 chybějících klíčů z přibližně 13 000 se stále vykazuje jako 99,7 %) a `check-new-key-coverage` posuzuje
pouze klíče, které PR přidává do `en.json`. Dávka pro národní prostředí se vygeneruje ze souboru `en.json` ve dni,
kdy se vytvoří její větev, a překlad probíhá několik dní, zatímco se do základu nadále přidávají klíče; dávkové PR samo
žádný klíč nepřidává, takže obě související kontroly mlčely, když byla dávka 1 (#13044) sloučena se 43 chybějícími klíči v devíti
národních prostředích a dávka 2 (#13660) s 10 chybějícími klíči v osmi prostředích (2026-09-15). Neúspěšnou kontrolu opravíte pomocí
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; koncový klíč `extra`
znamená, že jej zdroj odstranil — odstraňte jej i z národního prostředí. `--warn` vytvoří hlášení bez vyvolání selhání.
`--catalog=cli` spustí stejné porovnání nad `bin/cli/locales` (`npm run i18n:check-keys:cli`);
oba kroky jsou součástí úlohy `i18n-ui-coverage`.

#### `check-new-key-coverage` — kontrola i18n nových klíčů

Související kontrola ke `check-ui-value-drift`. Ta zachytí anglickou hodnotu, která byla **přeformulována**,
zatímco její překlady zůstaly nezměněné; tato kontrola zachytí anglický klíč, který byl **přidán**,
ale některá národní prostředí jej nikdy neobdržela.

`check-ui-keys-coverage` tuto třídu problémů nedokáže odhalit: vynucuje procentuální minimum pro každé národní prostředí a
jedenáct chybějících klíčů z přibližně 13 000 ponechá pokrytí na 99,9 %. Procento pro jednotlivé jazyky nedokáže
vyjádřit, že „tato funkce byla vydána bez překladu“ — celá funkce může přibýt do nového národního prostředí bez
jakéhokoli textu, aniž by se číslo vůbec změnilo.

Incident, který tato kontrola zachycuje: 3. fáze Orchestration Canvas přeložila svých jedenáct klíčů do
42 národních prostředí, která v té době existovala. O několik hodin později dávka jazyků EU (#13044) rozšířila repozitář
na 51 národních prostředí a devět nově přidaných (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) je nikdy
neobdrželo. `deepMergeFallback` nahradí chybějící klíč angličtinou, takže se problém projevil
nepřeloženým, nikoli prázdným uživatelským rozhraním — skutečným problémem, který ze své podstaty nevydával žádný signál.

Stejně jako související kontrola **zohledňuje rozdíly**: porovnává angličtinu ve společném předku sloučení s pracovním
stromem, takže již existující mezery zůstávají beze změny a zapnutí kontroly nevyžadovalo žádnou migraci.

**Značka `__MISSING__:<english>` tuto kontrolu nesplňuje (od 2026-09-17).** Dříve šlo o
zdokumentovaný způsob odložení — běhové prostředí použije jako náhradní hodnotu správnou angličtinu — dokud osm PR s funkcemi
dne 2026-09-16 nepřidalo 61 klíčů a nevložilo tuto značku do všech 65 národních prostředí namísto jejich přeložení: tato
kontrola přijala všechny, nic PR nezablokovalo a blokující kontrola poměru skutečných překladů
poté selhala na špičce vydání pro všechny (pt-BR 3,2 % > 2,5 % + 0,5). Značka se nyní posuzuje
jako chybějící překlad. Neúspěšnou kontrolu opravíte pomocí
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` nebo
pro všechna národní prostředí paralelně pomocí `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
funguje i po odpojení terminálu a odmítne se spustit bez proměnných prostředí `OMNIROUTE_TRANSLATION_*`). Klíč, který musí zůstat
v angličtině (pevně stanovený název produktu, enginu či příznaku), patří do `scripts/i18n/untranslatable-keys.json`,
nikdy za značku. `vi` značky zcela zakazuje (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kontrola odložených testů

Soubor v seznamu `exclude` v `vitest.config.ts` představuje test, který se nespouští, ale tomu, kdo prochází
strom, připadá jako pokrytí. Za komentářem se nahromadilo šedesát dva souborů
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Problém #8618 byl uzavřen
2026-08-11, zatímco seznam, který sledoval, se rozrostl ze 45 na 62 položek, přičemž každá nová položka zdědila komentář
odkazující na uzavřený problém. Když byl seznam konečně proměřen soubor po souboru (#13204), **51 z 62
testů prošlo nad aktuálním stromem bez jakékoli změny zdrojového kódu**.

Kontrola vyžaduje, aby každá výjimka odpovídající skutečnému souboru (a) uváděla sledovací problém a
(b) byla uvedena v `config/quality/vitest-exclusions.json` se svým naměřeným stavem, takže přidání výjimky představuje
zkontrolovatelný rozdíl ve vyhrazeném souboru, nikoli jen další řádek v poli s 60 položkami. Záměrně
vyloučené testy znovu nespouští — to trvá přibližně 10 minut a patří do periodické úlohy; inventář
zaznamenává, kdy byl každý z nich naposledy proměřen.
